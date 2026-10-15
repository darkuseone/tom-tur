#!/usr/bin/env bash
# Полная сборка выпуска: data.js -> страница -> проверка ошибок -> рендер 24 fps -> микс -> final.mp4 (+ сжатая копия < 29 МиБ для чата).
#   tools/render.sh <эпизод>            # напр. 001-new-york
#   tools/render.sh <эпизод> snap 0,3.5,12   # только контрольные кадры в build/<эп>/snaps
set -euo pipefail
cd "$(dirname "$0")/.."
EP=$1; B=build/$EP; E=episodes/$EP
python3 tools/build_data.py "$EP"
python3 tools/mkpage.py "$EP"
if [ "${2:-}" = snap ]; then
  npx hyperframes snapshot "$B/film" --at "$3" --no-end -o "$B/snaps" --describe false --timeout 60000; exit 0
fi
node tools/dbg.cjs "$B/film"
[ -f "$E/w_cover.js" ] && node tools/cover.cjs "$EP"                     # обложка → $E/cover.png
npx hyperframes render "$B/film" -f 24 -q high -w 4 -o "$B/video.mp4"
python3 tools/mix.py "$EP"
VIN=(-i "$B/video.mp4" -i "$B/audio.m4a"); VMAP=(-map 0:v)                # обложка (если есть) = первые 2 кадра ролика
if [ -f "$E/cover.png" ]; then VIN+=(-i "$E/cover.png"); VMAP=(-filter_complex "[0:v][2:v]overlay=enable='lt(n,2)'[v]" -map "[v]"); fi
X264=(-c:v libx264 -preset slow -b:v 5000k -pix_fmt yuv420p -passlogfile "$B/pf")   # зерно бумаги раздувает -q high до ~500 МБ → 2-pass 5 Мбит/с ≈ 38 МБ
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" "${X264[@]}" -pass 1 -an -f mp4 /dev/null
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" -map 1:a "${X264[@]}" -pass 2 -c:a copy -shortest -movflags +faststart "$E/final.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$E/final.mp4")
VB=$(python3 -c "print(int(29*1024*1024*8/$DUR/1000 - 140))")
ffmpeg -y -v error -i "$E/final.mp4" -c:v libx264 -preset slow -b:v ${VB}k -pass 1 -passlogfile "$B/p" -an -f mp4 /dev/null
ffmpeg -y -v error -i "$E/final.mp4" -c:v libx264 -preset slow -b:v ${VB}k -pass 2 -passlogfile "$B/p" -c:a aac -b:a 128k -movflags +faststart "$B/chat.mp4"
ls -la "$E/final.mp4" "$B/chat.mp4"
