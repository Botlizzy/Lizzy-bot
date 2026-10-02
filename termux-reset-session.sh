#!/data/data/com.termux/files/usr/bin/bash

# Recover from Signal "Bad MAC" / "Failed to decrypt" errors without
# permanently deleting the old authentication files. Pairing code is used
# when PAIRING_NUMBER is set; otherwise Baileys falls back to QR.
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [ -d session ]; then
  backup="session-bad-mac-backup-$(date +%Y%m%d-%H%M%S)"
  mv session "$backup"
  printf '%s\n' "Backed up the old session to: $backup"
else
  printf '%s\n' "No session directory found; starting a fresh pairing."
fi

unset SESSION_ID
printf '%s\n' "Starting a fresh WhatsApp pairing."
exec bash "$SCRIPT_DIR/termux-start.sh"
