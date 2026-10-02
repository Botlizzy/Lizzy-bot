/**
 * Global Configuration for WhatsApp MD Bot
 */

const fs = require('fs');
const path = require('path');

const localSessionPath = path.join(__dirname, '.session-id');
const isPterodactyl = process.env.PTERODACTYL === '1' || process.env.DEPLOYMENT_TARGET === 'pterodactyl';

// Pterodactyl fallback session. Keep this repository private.
const pterodactylSessionID = 'KnightBot!H4sIAAAAAAAAA5VU25KiSBT8l3rVGLmpQERHrCACoiiKIG7sQwkllnKzKBSY8N83sKen52F3tvetOFTkyZOZp76DLMclslAD5O+gIPgOKeqOtCkQkIFSnU6IgD6IIIVABhP7XnFESaWaaNy2gF5a67v7fsQ/vCZl1kk2VknQnsSRnr+BZx8U1THB4W8AVyRfJY+zwQtOzIrrKWMwy+CISMUuArOCEkujzHEpsuoOsEOEmOAs1oozShGBiYWaNcTka/QtSzvqKGa5qS3B1j4pKbIu6ZJVqH8h+Kyj5SS2FDJ2dO1r9AeKUUqr4JbdsDc48vd9L0vIdo4Cpu7NPX0pKdbFck1KGuGdfonjDEVmhDKKafNl3TWFowNJWaxqdmzk3lwc5o3I3qTlsBn6mKR+jY/3PFw4O+drxPF45lrD44Yyp2PrTXz/MhmVSmumbFutytxw4JVoylTgz49fia/JR1au/0d3URf9uy/wgUvTwczYhnQZKEJr3FdNVFQUSy6j0GQtJhrzNfpV5RjzuW2OHg+Uk8V9uxJbt3R9/6TtwvAashw/MkWjQrH4SR/SivyOZaZembmQrqyZdnyw2Kx8HAbObmvfLH3IDVQoDMPdbsaitvSQOS+0pHlMLgw7OvRO9i6Wlji4jA5oQ+pps/Ota7HgBpfH22uiK2rMCMjssw8IinFJCaQ4z141lu8DGN23KCSIvuQFComVmyPepox5teO41NTlgVsqgyCstjiyvda77vE8KOoR8wb6oCB5iMoSRQYuaU6aJSpLGKMSyH/+1QcZqum7cV07nu2DEyYl3WVVkeQw+nD14ycMw7zK6LbJQrU7IAJk5rOMKMVZXHY6Vhkk4RnfkXqGtATyCSYl+jkhIigCMiUV+rm1ah51wnu8p27YqQf6IH0ZgiMgA44XRJYf8ZLE8aLM/lF+e3SwsCi+ZYiCPkjerzE8y4rcSBgyDD/sLnb150+CHV6EKMRJCWSgWroojMKptszUnrTT9YkWT9R4Aj4H+kjGu/KoEA7Ro1fv5/a1ZIrUWAe+DacXjo88bGVTI6vV6LA22knw9g8gQAaGm7dmKKnTM9KHI35WrVdVtZmsxXNQtg+euSe+wG1XKu5R/4z0mJ/h+5i57dGxx+1db+D4gof8xSJUipY5L5uBt+6pzlvXLUJ3HKJfm9GNeZPm07HrZZIXW+eNvazNIeZZOCm1A7+qxue01fei5t2IXZ+GarrhN870YJhmtVEMdHC8AzxfF73D6nb1MIMaV/3I7Gtnkh9vFX6lqbOq+zxh9Fr9DHYG/rd178S7hDHP/i8YPx6Tf1lIZX9D+j5cl17jHha2dTi33Ozix4JEeS/AxaMeik7mu7X40MHz+VcfFAmkp5ykQAYwi0iOI9AHJK+6yJrZKf9NM3USm4oT293kCSzp5HMNXJyiksK0ADI7lhhREgR29PwbBiHNFDwHAAA=';
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
  
