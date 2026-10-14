#!/usr/bin/env bash
# Окружение ТОМ-ТУР: npm-зависимости (HyperFrames, puppeteer-core) + Rhubarb Lip Sync 1.13.0 в tools/bin (в git не идёт).
set -euo pipefail
cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null || { echo "нужен ffmpeg"; exit 1; }
python3 -c "import numpy" || pip install numpy
[ -d node_modules/hyperframes ] || npm install --no-fund --no-audit
if [ ! -x tools/bin/rhubarb/rhubarb ]; then
  mkdir -p tools/bin && tmp=$(mktemp -d)
  curl -sSL -o "$tmp/rh.zip" https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.13.0/Rhubarb-Lip-Sync-1.13.0-Linux.zip
  (cd "$tmp" && unzip -q rh.zip) && rm -rf tools/bin/rhubarb && mv "$tmp"/Rhubarb-Lip-Sync-1.13.0-Linux tools/bin/rhubarb && rm -rf "$tmp"
fi
CHROME=${CHROME:-/opt/pw-browsers/chromium}
[ -e "$CHROME" ] || echo "внимание: нет Chromium по пути $CHROME (задай CHROME=...)"
[ -n "${ELEVENLABS_API_KEY:-}" ] && echo "ELEVENLABS_API_KEY: есть" || echo "ELEVENLABS_API_KEY: НЕТ (нужен для озвучки)"
echo "готово"
