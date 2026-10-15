#!/usr/bin/env bash
# Быстрый контроль выпуска одной командой (экономно по выводу): сборка страницы, JS-ошибки, контакт-лист кадров.
#   tools/check.sh <эп> [t1 t2 …]        без времён — середины всех сцен; кадры → build/<эп>/shots/sheet.jpg
set -euo pipefail
cd "$(dirname "$0")/.."
EP=$1; shift; B=build/$EP
python3 tools/build_data.py "$EP" >/dev/null && python3 tools/mkpage.py "$EP" >/dev/null
TS="$*"; [ -z "$TS" ] && TS=$(python3 -c "import json;d=json.load(open('episodes/$EP/times.json'));print(' '.join(f'{(a+min(b,d[\"DUR\"]))/2:.2f}' for n,a,b in d['SCN']))")
node tools/dbg.cjs "$B/film" $TS | tail -2
rm -rf "$B/shots"; node tools/shot.cjs "$B/film" "$B/shots" $TS | awk '/мс\/кадр/{split($2,a," "); ms=$2+0; if(ms>max)max=ms; s+=ms; n++} !/мс\/кадр/{print} END{if(n) printf "мс/кадр: средн %d, макс %d\n", s/n, max}'
