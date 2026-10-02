/**
 * Global Configuration for WhatsApp MD Bot
 */

const fs = require('fs');
const path = require('path');

const localSessionPath = path.join(__dirname, '.session-id');
const isPterodactyl = process.env.PTERODACTYL === '1' || process.env.DEPLOYMENT_TARGET === 'pterodactyl';

// Pterodactyl fallback session. Keep this repository private.
const pterodactylSessionID = 'KnightBot!H4sIAAAAAAAAA5VV27KiOBT9l7xitdxEoepUDaIionhDRafmIUK4KAZIgoBd/vsUnj59+mGm58xb2EmtrL32WuE7wFlCkY0aoH0HOUnukKF2yZocAQ0MyzBEBHRAABkEGlAsbyY5lSkNAiPTq9l6t+ya9/C4ONUB6h6HbhVzRT3JnJ38Bp4dkJfnNPF/A1gEkn22bOGsCEic6NuJ07upTmGqGT7S8V5Rs6KU77dmdLHewLNFhAlJcDTOY3RDBKY2alYwIV+jb8zMworwI5TTeP0QFFty+/11PJmXc0mvx9c0Ss/9hdhM99bX6GOf3tTCwbIy9Pjd2AyW1MxWIe0dR2agzzjL3WwoEc2Vfn2nT5MIo8AKEGYJa76s+22ojtxmedidheshs+S0yXNGutmYY/c+TKeuask9tjaEafQ14o0yKbbedRYcsmFqTFmqWP71MENULU/djY7ohanzhFuI1eJX4ivy4ZXr/9G9shbuQYjGo2XFx2JDr2Q2xSKX7KIJL3hc44TmwyzL7DT+ou4+ZHihil7onQhh6QyGzaBVooe4wW62RYqYktpfKuXj+EkfspL8juXeLq/Q7xrzmTXUr16VLrmMxWe9Pg16ApUjs2HxcEx3uuT1/ItN4tTJ0P4yWagLYSXu1YqF/cDHxnWtKOIeoSFN8EV/e3V0RY0VAE14dgBBUUIZgSzJ8Kum9DsABvct8gliL3nBaLgZ3S+0ay3yPNts4+46HBsLyA34I38z5OMuc7tb5eJ1z4s30AE5yXxEKQqmCWUZaRaIUhghCrQ//+oAjGr2Prj2OknogDAhlO1wmacZDD6m+rEJfT8rMds22DfaBSJA4z/LiLEER7TVscSQ+HFyR0YMGQVaCFOKfnaICAqAxkiJfqbWyIJW+P1aHei6tAcdcHsNJAmABkRJHgiSIqmqKA005Q/6rWphYZ5/w4iBDkjfj/GSIAxERe7xvNRrD7b150+CLV6AGExS2ibeNgey4o/G87Dh1J1p6sdINyIdfDb04Yx35VEun4KKq72Zc6V8fpuujgcHji6iFOwTG4+muDaC02r60I9v/wACNFBO7bCn1wXdGMs7cz20XOZFQarCFRvuXtvRfW7drLtHpNKHrH+Rx6le9KezKxwmDfIfPbtr7I9OzF3GukHxhDtSaLQ26oAA3RMf/XqZpJjlJt53SXqa+icI83S1rCvXTeti7I168jxeFQFy+Ep9DEsut8++uXUfu2lMzypv8vdtrK8HrjOHWJ4rOe/G9WF+id49+8pM+uOtSl5uakfVfoYJekUfw3aA/z26d+Ktw/hn5xeMH4/JvwRy6BXI9PwV3Tfuae7Yp/ghTi6HSFaZtD8meVX3Bmt8cOtBZYLn868OyFPIwozcgAYgDkiWBKADSFa2lrVwmP3u36BH1nAdOW3nKaRM/4yBm9wQZfCWA03oq7zK8z1ZfP4NvI3IADwHAAA='
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
    sessionID: process.env.RESET_SESSION === '1' ? '' : (
      isPterodactyl
        ? (process.env.PTERODACTYL_SESSION_ID || process.env.SESSION_ID || pterodactylSessionID)
        : (process.env.SESSION_ID || localSessionID)
    ),
    pairingNumber: process.env.PAIRING_NUMBER || '', // Digits only, including country code
    newsletterJid: '120363428458439258@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'EmmyGold',
    
    // Bot Behavior
    selfMode: true, // Private mode - only owner can use commands
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
  
