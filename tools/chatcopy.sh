#!/usr/bin/env bash
# Копия выпуска для чата (< 29,4 МиБ, H.265 hvc1) прямо из final.mp4 — когда build/ нет (например, выпуск сделан в другой сессии /week).
#   tools/chatcopy.sh <эп>   → build/<эп>/chat.mp4
set -euo pipefail; cd "$(dirname "$0")/.."
EP=$1; B=build/$EP; mkdir -p "$B"; F=episodes/$EP/final.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$F"); VB=$(python3 -c "print(int(29.4*1024*1024*8/$DUR/1000 - 140))")
ffmpeg -y -v error -i "$F" -c:v libx265 -preset slow -b:v ${VB}k -pix_fmt yuv420p -tag:v hvc1 -x265-params pass=1:stats="$B/x265.log":log-level=error -an -f mp4 /dev/null
ffmpeg -y -v error -i "$F" -c:v libx265 -preset slow -b:v ${VB}k -pix_fmt yuv420p -tag:v hvc1 -x265-params pass=2:stats="$B/x265.log":log-level=error -c:a aac -b:a 128k -movflags +faststart "$B/chat.mp4"
ls -la "$B/chat.mp4"
