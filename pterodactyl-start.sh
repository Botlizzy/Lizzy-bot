#!/usr/bin/env bash

# Pterodactyl startup entrypoint.
# Configure PTERODACTYL_SESSION_ID in the panel Variables tab; never commit it.
set -euo pipefail

cd "$(dirname "$0")"
export PTERODACTYL=1
export DEPLOYMENT_TARGET=pterodactyl

if [[ -z "${PTERODACTYL_SESSION_ID:-}" && -z "${SESSION_ID:-}" ]]; then
  echo "ERROR: Set PTERODACTYL_SESSION_ID in the Pterodactyl panel Variables tab."
  exit 1
fi

if [[ "${PTERODACTYL_SESSION_ID:-}${SESSION_ID:-}" != KnightBot\!* ]]; then
  echo "ERROR: The Pterodactyl session variable must start with KnightBot!"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Dependencies not found; installing from package-lock.json..."
  npm ci --omit=dev
fi

exec node index.js
