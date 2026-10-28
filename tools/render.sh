#!/usr/bin/env bash
# Полная сборка выпуска: data.js -> страница -> проверка ошибок -> рендер FPS (tools/config.json или episode.json "fps"; с 28.10.2026 — 60) -> микс -> final.mp4 (+ сжатая копия < 29 МиБ для чата).
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
[ -f "$E/w_cover.js" ] && node tools/cover.cjs "$EP"                     # обложка → $E/cover.png (первый кадр + отдельным файлом в чат)
FPS=$(python3 -c "import json;e=json.load(open('$E/episode.json'));print(e.get('fps') or json.load(open('tools/config.json'))['render'].get('fps',24))")
npx hyperframes render "$B/film" -f "$FPS" -q high -w 4 -o "$B/video.mp4"
python3 tools/mix.py "$EP"
VIN=(-i "$B/video.mp4" -i "$B/audio.m4a"); VMAP=(-map 0:v)                # обложка (если есть) = первый кадр ролика (владелец, 15.10.2026)
if [ -f "$E/cover.png" ]; then VIN+=(-i "$E/cover.png"); VMAP=(-filter_complex "[0:v][2:v]overlay=enable='lt(n,1)'[v]" -map "[v]"); fi
VB264=$([ "$FPS" -gt 30 ] && echo 8000k || echo 5000k)   # 60 fps — больше кадров, 8 Мбит/с ≈ 56 МБ на 56 с
X264=(-c:v libx264 -preset slow -b:v $VB264 -pix_fmt yuv420p -passlogfile "$B/pf")   # зерно бумаги раздувает -q high до ~500 МБ → 2-pass 5 Мбит/с ≈ 38 МБ
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" "${X264[@]}" -pass 1 -an -f mp4 /dev/null
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" -map 1:a "${X264[@]}" -pass 2 -c:a copy -shortest -movflags +faststart "$E/final.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$E/final.mp4")
VB=$(python3 -c "print(int(29.4*1024*1024*8/$DUR/1000 - 140))")
# в чат (и на выкладку): H.265 из мастера, а не из final.mp4 (без двойного сжатия); hvc1 — играет на iPhone, принимают TikTok и YouTube
X265=(-c:v libx265 -preset slow -b:v ${VB}k -pix_fmt yuv420p -tag:v hvc1)
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" "${X265[@]}" -x265-params pass=1:stats="$B/x265.log":log-level=error -an -f mp4 /dev/null
ffmpeg -y -v error "${VIN[@]}" "${VMAP[@]}" -map 1:a "${X265[@]}" -x265-params pass=2:stats="$B/x265.log":log-level=error -c:a aac -b:a 128k -movflags +faststart "$B/chat.mp4"
ls -la "$E/final.mp4" "$B/chat.mp4"
