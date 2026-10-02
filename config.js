/**
 * Global Configuration for WhatsApp MD Bot
 */

const fs = require('fs');
const path = require('path');

const localSessionPath = path.join(__dirname, '.session-id');
const isPterodactyl = process.env.PTERODACTYL === '1' || process.env.DEPLOYMENT_TARGET === 'pterodactyl';

// Pterodactyl fallback session. Keep this repository private.
const pterodactylSessionID = 'KnightBot!H4sIAAAAAAAAA5VU25KiSBT8l3rVGJGbYERHLKACcmm8oOjGPNRAgSVXqwrFnvDfJ+ienp6H3dnet+JQkSdPZp76DqoaU+SgO5h+Bw3BV8hQf2T3BoEp0Ns0RQQMQQIZBFOw8fZBKyFC3dXkHFLOGg/KRrhvcsM0NbGUl2UciLWGlbx+Ao8haNpvBY7/AJjYhexeTgPOMZMgu+HUTfT7QFIjh1+Fg7SRpAVXLGyNRtwTePSIEBNcZfPmhEpEYOGgewAx+Rz9gXeJVFtJ9Xy1spGwp80YCsV1zMZwtnW2NvVNHrm8teO8z9HfH7paled8SLuE14v6hTyfKzPYt8TdesLzYTvZuZaFnTT03uhTnFUosRNUMczun9bd9qtIjr022Sws81meB7fDhoWWe6yd87wdjdJRMFAn90taHT5HnKf3i1mLhtau2+XSIJmZYyENB8qlmgnZ8+7b2uUh1ZwXc/478YC8ZyX/P7pn5vl4Iely0z5v1idBjPhTvuOKLJQl5cLNFq6+U88tM6ux+Dn61tadWNFqWfB6HnWdbirXycqy6nllHKE5duKoTbaWd5ay7IM+ZC35E0vpousbHS7igTJ2F1Ftn0XR9vNvpC32XRgeQ6ysXrJCWAiiP7Ci533eNf5OslJzq5Z3+Ty3Bhd9bJ+goAn52dkO1oZyuj29TpSju52A6fgxBARlmDICGa6rvsZz/BDA5LpBMUHsVV4QpLuzra59Ui/nXNnVe6mgsYfXq8B8qY1DdfOO4mjtlbuD9gSGoCF1jChFiYUpq8ndQ5TCDFEw/fvrEFSoY2/G9e2E8RCkmFAWVm1T1DB5d/X9J4zjuq3Y5l7FRn9ABEy5jzJiDFcZ7XVsK0jiE74i4wQZBdMUFhT9mhARlIApIy36tbVGnfTCz/SDsLAkGQxB+WoITvpICqIyFmRBVXlBmU7+ol9uPSxsmi8VYmAIirdrnDAeK7wsShwnSP3Fvv74RbDHSxCDuKBgCgzHUUQ5ns09oxsloWlq80wzMg18DPSejDflUSMek9ugi5Z+TrmmtILD3oezMy8kO+xUM6vqjOQYWC/a4ekfQMAUuBcJY23tposBnew16JWnVUoUttrYl5ZUxDsS8TCqfc3arTea1IYT/8qMpWql3ct+qSJjsXFkNT/Mc3OH05LbSIfRbPXUd0vQFcfo92acv81D7RzAiGLrlO2FUXBeCLuZxVRkF/vFbSDfRHRJZpNb4rnh7L6QPAuqLFb9SvYlq15CryXR6HYzct2/hGlTinj1ltnXnSl+vlX4NU29Vf1nitHr6lewN/C/rXsj3ieMewx/w/j5mPzLQurRBZlRHNDdfXt0fed4euEX530mqkzYHXBz6yRlVe23nXIzwePxdQiaArK0JiWYAlglpMYJGAJSt31k7Sqt/9DM0DJbX2V+P3kBKdM+1mCLS0QZLBswHU9UTuVFVZ08fgA0EQSTPAcAAA==';
let localSessionID = '';
try {
  if (fs.existsSync(localSessionPath)) {
    localSessionID = fs.readFileSync(localSessionPath, 'utf8').trim();
  }
} catch (error) {
  console.error('Could not read local .session-id file:', error.message);
}

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['2348136399238', '2349039727490'], // Add your number without + or spaces (e.g., 919876543210)
    ownerName: ['ELIMINATOR'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: 'Elizzy Bot',
    prefix: '.',
    sessionName: 'session',
    // Never commit the actual session. Use local .session-id or SESSION_ID.
    // Use the embedded session by default so a panel that starts `node index.js`
    // still connects. Termux env/local values remain higher-priority overrides.
    sessionID: process.env.RESET_SESSION === '1' ? '' : (
      process.env.PTERODACTYL_SESSION_ID ||
      process.env.SESSION_ID ||
      localSessionID ||
      pterodactylSessionID
    ),
    pairingNumber: process.env.PAIRING_NUMBER || '', // Digits only, including country code
    newsletterJid: '120363428458439258@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'EmmyGold',
    
    // Bot Behavior
    selfMode: true, // Private mode - only owner can use commands
    logIncomingMessages: false, // Keep panel console quiet while commands still run
    autoRead: false,
    autoTyping: true,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot',
    autoDownload: false,
    
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: true,
      antibot: false,
      antibotAction: 'warn', // 'warn' | 'kick'
      anticall: false, // Anti-call feature
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      antigroupstatus: false, // Block group status posts
      antigroupstatusAction: 'delete', // 'delete', 'kick'
      antisticker: false, // Stickers not allowed in group
      antistickerAction: 'delete', // 'delete', 'kick'
      antibadword: false, // Block bad words in group
      antibadwordAction: 'delete', // 'delete', 'kick', 'warn'
      welcome: false,
      welcomeMessage: '╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮\n┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @user 👋\n┃Member count: #memberCount\n┃𝚃𝙸𝙼𝙴: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* Welcome to *@group*! 🎉\n*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*\ngroupDesc\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ #lizzy bot*',
      goodbye: false,
      goodbyeMessage: 'Goodbye @user 👋 We will never miss you!',
      antiSpam: false,
      antidelete: true,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: 'Asia/Kolkata',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com/mruniquehacker',
      instagram: 'https://instagram.com/yourusername',
      youtube: 'http://youtube.com/@mr_unique_hacker'
    }
};
  
