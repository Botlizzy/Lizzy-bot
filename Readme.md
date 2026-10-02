<div align="center">

## Knight Bot Mini

[![Made with Baileys](https://img.shields.io/badge/Made%20with-Baileys-00bcd4?style=for-the-badge)](https://github.com/WhiskeySockets/Baileys)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<img src="utils/bot_image.jpg" alt="Knight Bot" width="260">

</div>

Knight Bot Mini is a WhatsApp MD bot built on top of the **Baileys** library.  
It’s designed to be fast, lightweight, and easy to customize without touching the core code.  
This project is **fully open source** — you can modify it, rebrand it, and make your **own bot** from this codebase **free of cost**, without needing any permission from our side.  
All commands and the overall structure are written in a way that makes customization (bot image, prefix, name, features, etc.) as easy as possible.

---


## ✨ Features

- **Fully Open Source** – entire codebase is editable; host it anywhere (Heroku, panel, VPS, etc.).  
- **Easy Customization via Commands** – change **bot image**, **prefix**, **channel/newsletter**, **bot name**, etc. with simple commands.  
- **Modular Command System** – commands are organized in the `commands` folder for easy editing.  
- **Optimized for Stability** – RAM‑optimized media handling (streaming, temp cleanup), better session handling via `sessionID` in `config.js`.  
- **Owner Utilities** – restart, update from ZIP, and more owner‑only tools.

---

### 1. Fork the Repository

<div align="center">

<a href="https://github.com/mruniquehacker/Knightbot-MD/fork" target="_blank">
  <img src="https://img.shields.io/badge/Fork%20Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Fork on GitHub">
</a>

</div>

> This creates your own copy of `Knightbot-MD` under your GitHub account.

---

### 2. Get Pair Code

Deploy a small helper to generate a **pair code** and obtain your session string.

<div align="center">

<a href="https://knight-bot-paircode.onrender.com/" target="_blank">
  <img src="https://img.shields.io/badge/Generate-Pair%20Code-blueviolet?style=for-the-badge" alt="Generate Pair Code">
</a>

</div>

After scanning, you will receive a **session string** starting with:

```text
KnightBot!H4....
```

Copy that full string and paste it into `config.js`:

```js
sessionID: 'KnightBot!H4.....'
```

Or set it via the `SESSION_ID` environment variable when hosting.

---

### 3. Deploy on Panel (Katabump, etc.)

<div align="center">

<a href="https://dashboard.katabump.com/auth/login#d6b7d6" target="_blank">
  <img src="https://img.shields.io/badge/Deploy%20on-Katabump-orange?style=for-the-badge" alt="Deploy on Katabump">
</a>

</div>

For a full step‑by‑step deployment tutorial (panels / VPS / Heroku), add or update your YouTube guide here:

- **YouTube Tutorial:** *(coming soon)*

---

## 🛠 Local Setup

### Termux: fix `npm ERR! ENOENT package.json`

This error means `npm` was run from Termux's home directory (`/data/data/com.termux/files/home`) instead of the bot directory. `package.json` is in the repository root, so change into the repository before running npm:

```bash
cd ~/Lizzy-bot
test -d node_modules || npm ci
npm start
```

If you have not cloned the repository yet, run:

```bash
cd ~
git clone https://github.com/Botlizzy/Lizzy-bot.git
cd Lizzy-bot
test -d node_modules || npm ci
npm start
```

You can also run the included setup script from any directory:

```bash
bash ~/Lizzy-bot/termux-setup.sh
```

To start safely from any directory, use the launcher. It checks for `pino` and installs the locked dependencies if they are missing:

```bash
bash ~/Lizzy-bot/termux-start.sh
```

Do not run `npm install` from `~` unless `package.json` is located there.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Botlizzy/Lizzy-bot.git
cd Lizzy-bot
```

### 2️⃣ Install dependencies

```bash
npm ci
```

If `node index.js` reports `Cannot find module 'pino'`, run `npm ci` from inside `~/Lizzy-bot` before starting the bot. The `pino` dependency is already declared in `package.json` and `package-lock.json`.

### Termux native prerequisites

Install the system tools used by media commands:

```bash
pkg update
pkg install nodejs git ffmpeg
```

This project uses Termux's system `ffmpeg`; it no longer downloads the incompatible `ffmpeg-static` binary. Sharp and the optional sticker formatter are loaded only when their platform binaries are available, so they cannot prevent the bot from starting.

If npm reports `npm WARN cleanup ENOTEMPTY` after an interrupted install, reset only the local dependency directory and retry:

```bash
cd ~/Lizzy-bot
rm -rf node_modules
npm cache verify
npm ci
```

### WhatsApp `Bad MAC` / `Failed to decrypt` recovery

These messages mean the local Signal session is stale or corrupted, often after the same WhatsApp account was linked from another installation. Reset the session once and use a fresh pairing code:

```bash
cd ~/Lizzy-bot
git pull origin main
unset SESSION_ID
export PAIRING_NUMBER=2348012345678
bash termux-reset-session.sh
```

Replace `2348012345678` with the bot phone number including country code, digits only. The script backs up the old `session` directory and prints a pairing code. In WhatsApp open **Linked devices → Link a device → Link with phone number instead**, then enter that code. After pairing, use the comma prefix (for example, `,menu`). Commands are restricted to the owner numbers in `config.js` while `selfMode` is enabled.

For normal starts, export the pairing number once per Termux session:

```bash
cd ~/Lizzy-bot
export PAIRING_NUMBER=2348012345678
bash termux-start.sh
```

If `PAIRING_NUMBER` is empty, the bot falls back to printing a QR code.

### 3️⃣ Configure session

Set the session through an environment variable; do not commit session strings to GitHub:

- **Option A: Use session string**

  ```bash
  export SESSION_ID='KnightBot!H4.....'
  ```

- **Option B: Scan QR**

  ```bash
  unset SESSION_ID
  ```

  Run the bot and scan the QR from the terminal.

### 4️⃣ Run the bot

```bash
node index.js
```

When the bot starts:

- If `sessionID` is empty, a **QR code** will appear in the terminal – scan it using **Linked Devices** in WhatsApp.  
- If `sessionID` is set, it will log in using that session string.

---

## 🌐 Community

<div align="center">

<a href="https://t.me/+3QhFUZHx-nhhZmY1" target="_blank">
  <img src="https://img.shields.io/badge/Join-Telegram-0088cc?style=for-the-badge&logo=telegram&logoColor=white" alt="Join Telegram">
</a>

<a href="https://whatsapp.com/channel/0029Va90zAnIHphOuO8Msp3A" target="_blank">
  <img src="https://img.shields.io/badge/Join-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Join WhatsApp Channel">
</a>

</div>

---

## 🙏 Credits

- **Mr Unique Hacker** – Main developer & maintainer  
- **Baileys** – WhatsApp Web API library (`@whiskeysockets/baileys`)  
- Other open‑source libraries listed in `package.json`

---

## ⚠️ Important Warning

- This bot is created **for educational purposes only**.  
- This is **NOT** an official WhatsApp bot.  
- Using third‑party bots **may violate WhatsApp’s Terms of Service** and can lead to your account being **banned**.

> You use this bot **at your own risk**.  
> The developers are **not responsible** for any bans, issues, or damages resulting from its use.

---

## 📝 Legal

- This project is **not affiliated with, authorized, maintained, sponsored, or endorsed** by WhatsApp Inc. or any of its affiliates or subsidiaries.  
- This is **independent and unofficial software**.  
- **Do not spam** people using this bot.  
- **Do not** use this bot for bulk messaging, harassment, or any **illegal activities**.  
- The developers assume **no liability** and are **not responsible** for any misuse or damage caused by this program.

---

## 📄 License (MIT)

This project is licensed under the **MIT License**.

You must:

- Use this software in compliance with **all applicable laws and regulations**.  
- Keep the **original license and copyright** notices.  
- **Credit the original authors**.  
- **Not** use this for spam, abuse, or malicious purposes.

---

## 📜 Copyright Notice

Copyright (c) **2026 Professor**.  
All rights reserved.

This project contains code from various open‑source projects and AI tools, including but not limited to:

- **Baileys** – MIT License  
- Other libraries as listed in `package.json`
