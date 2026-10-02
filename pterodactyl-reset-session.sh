#!/usr/bin/env bash

# Recover from Signal Bad MAC / Failed to decrypt errors on Pterodactyl.
# Set PAIRING_NUMBER in the panel, run this once, complete pairing, then
# change the startup command back to: bash pterodactyl-start.sh
set -euo pipefail

cd "$(dirname "$0")"

if [[ -d session ]]; then
  backup="session-bad-mac-backup-$(date +%Y%m%d-%H%M%S)"
  mv session "$backup"
  echo "Backed up stale auth to $backup"
fi

if [[ -z "${PAIRING_NUMBER:-}" ]]; then
  echo "ERROR: Set PAIRING_NUMBER in the Pterodactyl panel first."
  echo "Use digits only, including country code, for example 2348012345678."
  exit 1
fi

export RESET_SESSION=1
export PTERODACTYL=1
export DEPLOYMENT_TARGET=pterodactyl

echo "Starting fresh WhatsApp pairing. A pairing code will appear below."
exec node index.js
