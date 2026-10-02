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

if [ -f .session-id ]; then
  backup_id="session-id-bad-mac-backup-$(date +%Y%m%d-%H%M%S)"
  mv .session-id "$backup_id"
  chmod 600 "$backup_id"
  printf '%s\n' "Backed up the local session ID to: $backup_id"
fi

# config.js skips SESSION_ID/local .session-id while this flag is set.
export RESET_SESSION=1
unset SESSION_ID
printf '%s\n' "Starting a fresh WhatsApp pairing."
exec bash "$SCRIPT_DIR/termux-start.sh"
