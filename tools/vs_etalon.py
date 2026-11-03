"""Сравнение выпуска с эталоном детальности одним кадром (владелец, 03.11.2026: «визуал не должен проседать от ролика к ролику»).
  python3 tools/vs_etalon.py <эп> [t1 t2 …]
Без времён — середины всех сцен (кроме туннеля). Рисует кадры (tools/shot.cjs) и кладёт их ПОД лист эталона 001 Нью-Йорк + 002 Москва
(assets/ref/etalon_001_002.jpg) в том же масштабе → build/<эп>/vs_etalon.jpg. Смотреть одним Read и честно ответить по каждой сцене:
кадр до краёв? своё цветное освещение? ≥ 5 планов и передний план? ≥ 8 людей, ≥ 12 предметов быта? земля с фактурой? Хуже эталона — дорисовать."""
import json, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
ep = sys.argv[1]; B = ROOT / 'build' / ep; T = json.load(open(ROOT / 'episodes' / ep / 'times.json'))
ts = sys.argv[2:] or [f'{(a + min(b, T["DUR"])) / 2:.2f}' for n, a, b in T['SCN'] if n != 'tunnel']
subprocess.run(['python3', 'tools/build_data.py', ep], cwd=ROOT, check=True, capture_output=True)
subprocess.run(['python3', 'tools/mkpage.py', ep], cwd=ROOT, check=True, capture_output=True)
out = B / 'vs'; r = subprocess.run(['node', 'tools/shot.cjs', str(B / 'film'), str(out), *ts], cwd=ROOT, capture_output=True, text=True)
print(r.stdout.strip().split('\n')[-1])
ref = Image.open(ROOT / 'assets/ref/etalon_001_002.jpg'); tw = 250                      # эталон: 8 кадров в ряд по 270 px → приводим к 250
ref = ref.resize((tw * 8, int(ref.height * tw * 8 / ref.width)))
frames = [Image.open(out / f't{float(t):.2f}.png').convert('RGB').resize((tw, int(tw * 1920 / 1080))) for t in ts if (out / f't{float(t):.2f}.png').exists()]
rows = [frames[i:i + 8] for i in range(0, len(frames), 8)]; fh = int(tw * 1920 / 1080)
sheet = Image.new('RGB', (tw * 8, ref.height + 40 + len(rows) * fh), (20, 16, 12)); sheet.paste(ref, (0, 0))
d = ImageDraw.Draw(sheet); fnt = ImageFont.truetype(str(ROOT / 'assets/fonts/Oswald600.ttf'), 24)
d.text((10, ref.height + 6), f'ЭТАЛОН ВЫШЕ (001 Нью-Йорк, 002 Москва)  ·  НИЖЕ — {ep}', fill=(255, 210, 90), font=fnt)
for j, row in enumerate(rows):
    for i, f in enumerate(row): sheet.paste(f, (i * tw, ref.height + 40 + j * fh))
dst = B / 'vs_etalon.jpg'; sheet.save(dst, quality=85); print('→', dst.relative_to(ROOT), f'({len(frames)} кадров под эталоном)')
