#!/usr/bin/env bash

# Pterodactyl startup entrypoint.
# Configure PTERODACTYL_SESSION_ID in the panel Variables tab; never commit it.
set -euo pipefail

cd "$(dirname "$0")"
export PTERODACTYL=1
export DEPLOYMENT_TARGET=pterodactyl

session_check="$(node -e "const c=require('./config'); process.stdout.write(c.sessionID || '')")"
if [[ "$session_check" != KnightBot\!* ]]; then
  echo "ERROR: No valid KnightBot session was found in config.js or the Pterodactyl environment."
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Dependencies not found; installing from package-lock.json..."
  npm ci --omit=dev
fi

exec node index.js
