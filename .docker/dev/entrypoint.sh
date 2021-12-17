#!/bin/sh
set -e

echo "[PNPM INSTALL]"
pnpm install

echo "[HUSKY STUFF]"


exec "$@"
