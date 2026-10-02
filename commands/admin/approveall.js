/**
 * Approve All Pending Requests Command
 *
 * Approves every currently pending join request in the current group.
 * The handler enforces group-admin and bot-admin permissions from the metadata.
 */

const MAX_REQUESTS = 1_000_000;
const BATCH_SIZE = 100;
const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error) => {
  const status = error?.output?.statusCode || error?.statusCode || error?.status;
  const message = String(error?.message || error || '').toLowerCase();
  return [408, 425, 429, 500, 502, 503, 504].includes(Number(status)) ||
    message.includes('rate-overlimit') ||
    message.includes('rate limit') ||
    message.includes('timeout') ||
    message.includes('temporarily') ||
    message.includes('connection closed');
};

const getPendingJid = (request) => {
  if (!request || typeof request !== 'object') return null;
  const jid = request.jid || request.pn || request.phone_number || request.lid;
  return typeof jid === 'string' && jid.includes('@') ? jid : null;
};

const chunk = (items, size) => {
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
};

module.exports = {
  name: 'approveall',
  aliases: ['acceptall', 'approvepending', 'acceptpending'],
  category: 'admin',
  description: 'Approve all pending join requests in the current group',
  usage: '.approveall',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    const from = extra.from;

    try {
      const pending = await sock.groupRequestParticipantsList(from);
      const pendingJids = [...new Set((Array.isArray(pending) ? pending : [])
        .map(getPendingJid)
        .filter(Boolean))];

      if (pendingJids.length === 0) {
        return extra.reply('✅ There are no pending join requests to approve.');
      }

      if (pendingJids.length > MAX_REQUESTS) {
        return extra.reply(`❌ Refusing to process ${pendingJids.length.toLocaleString()} requests. The safety limit is ${MAX_REQUESTS.toLocaleString()}.`);
      }

      const batches = chunk(pendingJids, BATCH_SIZE);
      await extra.reply(`⏳ Approving ${pendingJids.length.toLocaleString()} pending request(s) in ${batches.length.toLocaleString()} batch(es)...`);

      let approved = 0;
      let failed = 0;
      const failures = [];

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
        const batch = batches[batchIndex];
        let result = null;
        let lastError = null;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
          try {
            result = await sock.groupRequestParticipantsUpdate(from, batch, 'approve');
            lastError = null;
            break;
          } catch (error) {
            lastError = error;
            if (attempt >= MAX_RETRIES || !isRetryableError(error)) break;
            await sleep(1000 * (attempt + 1));
          }
        }

        if (lastError) {
          failed += batch.length;
          failures.push({ batch: batchIndex + 1, count: batch.length, error: String(lastError.message || lastError) });
        } else {
          const results = Array.isArray(result) ? result : [];
          const failedResults = results.filter((entry) => String(entry?.status || '200') !== '200');
          approved += batch.length - failedResults.length;
          failed += failedResults.length;
          if (failedResults.length) {
            failures.push({
              batch: batchIndex + 1,
              count: failedResults.length,
              error: failedResults.slice(0, 3).map((entry) => `${entry.jid || 'unknown'}: ${entry.status}`).join(', ')
            });
          }
        }

        if ((batchIndex + 1) % 10 === 0 || batchIndex === batches.length - 1) {
          await extra.reply(`📊 Progress: ${Math.min((batchIndex + 1) * BATCH_SIZE, pendingJids.length).toLocaleString()}/${pendingJids.length.toLocaleString()} processed | ✅ ${approved.toLocaleString()} approved | ❌ ${failed.toLocaleString()} failed`);
        }
      }

      let summary = `✅ *Pending request approval complete.*\n\n✅ Approved: ${approved.toLocaleString()}\n❌ Failed: ${failed.toLocaleString()}`;
      if (failures.length) {
        summary += `\n\nSome failures: ${failures.slice(0, 3).map((item) => `batch ${item.batch} (${item.count}): ${item.error}`).join(' | ')}`;
      }
      return extra.reply(summary);
    } catch (error) {
      console.error('Approve-all command error:', error);
      return extra.reply(`❌ Could not approve pending requests: ${error.message || 'Unknown error'}`);
    }
  },
};
