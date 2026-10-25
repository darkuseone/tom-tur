#!/usr/bin/env bash
# Финальная проверка готового ролика одной командой (короткий вывод):
#   tools/finalcheck.sh <эп>   → длина (50–58 с), громкость (LUFS под master_lufs из tools/config.json, true peak ≤ −1 dBTP; без ключа — mean ≈ −20), размер chat.mp4 (< 29,5 МиБ),
#   кадры из final.mp4: обложка (0,02 с) + середины всех сцен → build/<эп>/fin/sheet.jpg (смотреть одним Read).
set -euo pipefail
cd "$(dirname "$0")/.."
EP=$1; F=episodes/$EP/final.mp4; C=build/$EP/chat.mp4; O=build/$EP/fin
[ -f "$F" ] || { echo "нет $F — сначала tools/render.sh $EP"; exit 1; }
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$F")
VOL=$(ffmpeg -i "$F" -af volumedetect -f null - 2>&1 | grep -oE "(mean|max)_volume: -?[0-9.]+ dB" | tr '\n' ' ')
LU=$(ffmpeg -nostats -i "$F" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):" | tr -s ' ' | tr '\n' ' ')
MIB=$([ -f "$C" ] && python3 -c "import os;print(f'{os.path.getsize(\"$C\")/2**20:.1f}')" || echo нет)
echo "длина ${DUR} с | ${VOL}|${LU}| chat.mp4 ${MIB} МиБ (лимит 29,5)"
python3 - "$DUR" "$VOL" "$MIB" "$LU" <<'PY'
import re, sys, json
d, v, m, lu = float(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]; tg = json.load(open('tools/config.json'))['mix'].get('master_lufs'); mean = float(re.search(r'mean_volume: (-?[\d.]+)', v).group(1)); mx = float(re.search(r'max_volume: (-?[\d.]+)', v).group(1))
w = []
if not 50 <= d <= 58.5: w.append(f'длина {d:.1f} вне 50–58 с')
I = float(re.search(r'I: (-?[\d.]+) LUFS', lu).group(1)); tp = float(re.search(r'Peak: (-?[\d.]+) dBFS', lu).group(1))
if tg is not None:
    if abs(I - tg) > 1: w.append(f'{I} LUFS (нужно ≈ {tg})')
    if tp > -1: w.append(f'true peak {tp} dBTP > −1')
else:
    if abs(mean + 20) > 1.5: w.append(f'mean {mean} дБ (нужно ≈ −20)')
    if mx > -1: w.append(f'пик {mx} дБ > −1')
if m != 'нет' and float(m) > 29.5: w.append(f'chat.mp4 {m} МиБ > 29,5')
print('ВНИМАНИЕ: ' + '; '.join(w) if w else 'ok: длина, громкость, размер в норме')
PY
rm -rf "$O"; mkdir -p "$O"
TS=$(python3 -c "import json;d=json.load(open('episodes/$EP/times.json'));print(' '.join(['0.02']+[f'{(a+min(b,d[\"DUR\"]))/2:.2f}' for n,a,b in d['SCN'] if n!='tunnel']))")
i=0; for t in $TS; do ffmpeg -v error -y -ss "$t" -i "$F" -frames:v 1 -vf "scale=270:-1,drawtext=text='$t':x=6:y=6:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6" "$O/$(printf %02d $i).jpg"; i=$((i+1)); done
N=$(ls "$O"/*.jpg | wc -l); COLS=$(( N < 8 ? N : 8 )); ROWS=$(( (N + COLS - 1) / COLS ))
ffmpeg -v error -y -framerate 1 -pattern_type glob -i "$O/*.jpg" -vf "tile=${COLS}x${ROWS}" -frames:v 1 "$O/sheet.jpg"
echo "кадры: $O/sheet.jpg ($N шт.)"
# петля (§6а): последний кадр ролика рядом с первым кадром после обложки — должны стыковаться
ffmpeg -v error -y -sseof -0.3 -i "$F" -frames:v 1 -vf scale=270:-1 "$O/loop_end.jpg"; ffmpeg -v error -y -ss 0.1 -i "$F" -frames:v 1 -vf scale=270:-1 "$O/loop_start.jpg"
ffmpeg -v error -y -i "$O/loop_end.jpg" -i "$O/loop_start.jpg" -filter_complex hstack -frames:v 1 "$O/loop.jpg" && echo "петля: $O/loop.jpg (конец | начало)"
