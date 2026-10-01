#!/data/data/com.termux/files/usr/bin/bash

# Install Lizzy-bot from the directory containing this script, regardless of
# the directory from which the script is launched.
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -f package.json ]; then
  printf '%s\n' "Error: package.json was not found in $SCRIPT_DIR" >&2
  exit 1
fi

printf '%s\n' "Installing Lizzy-bot dependencies in $SCRIPT_DIR..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
printf '%s\n' "Installation complete. Start the bot with: cd '$SCRIPT_DIR' && npm start"
