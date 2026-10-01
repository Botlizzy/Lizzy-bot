#!/data/data/com.termux/files/usr/bin/bash

# Start Lizzy-bot safely from any working directory.
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -f package.json ]; then
  printf '%s\n' "Error: package.json was not found in $SCRIPT_DIR" >&2
  exit 1
fi

if [ ! -d node_modules ] || ! node -e "require.resolve('pino')" >/dev/null 2>&1; then
  printf '%s\n' "Dependencies are missing; installing from package-lock.json..."
  npm ci
fi

exec node index.js
