/**
 * Anti-delete command
 * Recover recently deleted group messages that were cached by the bot.
 */

const database = require('../../database');

module.exports = {
  name: 'antidelete',
  aliases: ['antidel', 'ad'],
  description: 'Enable or disable deleted-message recovery in a group',
  usage: '.antidelete <on/off>',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    const current = database.getGroupSettings(extra.from);
    const option = args[0]?.toLowerCase();

    if (!option) {
      return extra.reply(
        `🛡️ Anti-delete is *${current.antidelete ? 'ON' : 'OFF'}*.\n` +
        'Usage: .antidelete on | off\n\n' +
        'The bot can only recover messages received after this feature is enabled and while they remain in its message cache.'
      );
    }

    if (!['on', 'off'].includes(option)) {
      return extra.reply('Usage: .antidelete on | off');
    }

    const enabled = option === 'on';
    database.updateGroupSettings(extra.from, { antidelete: enabled });
    return extra.reply(`✅ Anti-delete is now *${enabled ? 'ON' : 'OFF'}* for this group.`);
  }
};

