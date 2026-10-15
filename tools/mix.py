"""Микс выпуска: голос (build/<эп>/vf) + SFX/атмосферы/музыка из episodes/<эп>/sound.py -> build/<эп>/audio.m4a.
  python3 tools/mix.py <эпизод>
Громкость каждого клипа выравнивается по активному RMS (голос −17, SFX −25+поправка, атмосферы −33, музыка −29 дБ),
SFX: highpass 35 / lowpass 8.5k / −4 дБ на 4.5k / лимитер — ничего не бьёт по ушам; атмосферы и музыка проседают под голосом (sidechain).
Цель: mean ≈ −20 дБ, пик ≤ −1 дБ."""
import importlib.util, json, subprocess, sys
from pathlib import Path
from types import SimpleNamespace
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
M = json.load(open(ROOT / 'tools/config.json'))['mix']
SF = ROOT / 'assets/sfx'


def act_rms(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-ac', '1', '-ar', '22050', '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32); fr = 1024; n = len(x) // fr
    e = np.sqrt((x[:n * fr].reshape(n, fr) ** 2).mean(1) + 1e-12); db = 20 * np.log10(e); act = db[db > db.max() - 30]
    return float(20 * np.log10(np.sqrt(np.mean((10 ** (act / 20)) ** 2))))


gain = lambda p, tg: max(-24, min(24, tg - act_rms(p)))


def main(ep):
    d = ROOT / 'episodes' / ep; b = ROOT / 'build' / ep; b.mkdir(parents=True, exist_ok=True)
    T = json.load(open(d / 'times.json')); VO, VD, DUR = T['start'], T['dur'], T['DUR']
    tl = SimpleNamespace(LS=lambda k: VO[k], LE=lambda k: VO[k] + VD[k], LF=lambda k, f: VO[k] + VD[k] * f, DUR=DUR,
                         S0={n: a for n, a, _ in T['SCN']}, S1={n: min(e, DUR) for n, _, e in T['SCN']})
    import re
    caps = json.loads(re.search(r'const CAPS=(.*);', (d / 'data.js').read_text()).group(1))
    norm = lambda x: re.sub(r'[^а-яёa-z0-9-]', '', x.lower())
    def WT(k, w):                                                  # начало субтитра-фрагмента со словом (как WT в scenes.js)
        for c in caps:
            if c['key'] == k and any(norm(x) == norm(w) for x in c['words']): return c['t0']
        for c in caps:
            if c['key'] == k and any(norm(x).startswith(norm(w)) for x in c['words']): return c['t0']
        return VO[k]
    tl.WT = WT
    evp = d / 'ev.json'; tl.EV = json.load(open(evp))['EV'] if evp.exists() else {}   # события картинки (tools/evdump.cjs)
    spec = importlib.util.spec_from_file_location('sound', d / 'sound.py'); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    S = mod.sound(tl)
    inp, fl, vl, bl, sl = [], [], [], [], []
    def add(f): inp.extend(['-i', str(f)]); return len(inp) // 2 - 1
    for k, t in VO.items():
        f = b / 'vf' / f'{k}.wav'; g = gain(f, M['voice_db']); i = add(f); ms = int(t * 1000)
        fl.append(f'[{i}]volume={g:.2f}dB,acompressor=threshold=-22dB:ratio=2.5:attack=6:release=90:makeup=1,adelay={ms}|{ms}[v{i}]'); vl.append(f'[v{i}]')
    for n, t, rel in S['sfx']:
        f = SF / f'{n}.mp3'; g = gain(f, M['sfx_db'] + rel); i = add(f); ms = max(0, int(t * 1000))
        fl.append(f'[{i}]highpass=f=35,lowpass=f=8500,equalizer=f=4500:t=q:w=1.2:g=-4,volume={g:.2f}dB,alimiter=limit=0.45:level=0,afade=t=in:d=0.01,adelay={ms}|{ms}[s{i}]'); sl.append(f'[s{i}]')
    for n, a, e in S['beds']:
        f = SF / f'{n}.mp3'; g = gain(f, M['bed_db']); i = add(f); du = e - a; ms = int(a * 1000)
        fl.append(f'[{i}]aloop=loop=-1:size=2e9,atrim=0:{du:.3f},lowpass=f=9000,volume={g:.2f}dB,afade=t=in:d=0.35,afade=t=out:st={du - 0.45:.3f}:d=0.45,adelay={ms}|{ms}[b{i}]'); bl.append(f'[b{i}]')
    f = SF / f"{S['music']}.mp3"; g = gain(f, M['music_db']); i = add(f)
    fl.append(f'[{i}]aloop=loop=-1:size=2e9,atrim=0:{DUR},volume={g:.2f}dB,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.4}:d=1.4[mus]'); bl.append('[mus]')
    fl.append(''.join(vl) + f'amix=inputs={len(vl)}:normalize=0,asplit=2[vo][vsc]')
    fl.append(''.join(bl) + f'amix=inputs={len(bl)}:normalize=0[bed]')
    fl.append('[bed][vsc]sidechaincompress=threshold=0.04:ratio=5:attack=25:release=350[bedd]')
    fl.append('[vo][bedd]' + ''.join(sl) + f'amix=inputs={2 + len(sl)}:normalize=0,apad=whole_dur={DUR},atrim=0:{DUR},'
              'acompressor=threshold=-14dB:ratio=2:attack=10:release=150,volume=2dB,alimiter=limit=0.89[out]')
    (b / 'mix.txt').write_text(';\n'.join(fl))
    out = b / 'audio.m4a'
    subprocess.run(['ffmpeg', '-y', '-v', 'error'] + inp + ['-filter_complex_script', str(b / 'mix.txt'), '-map', '[out]', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', str(out)], check=True)
    r = subprocess.run(['ffmpeg', '-i', str(out), '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    print(out.relative_to(ROOT), *[l.split('] ')[-1] for l in r.splitlines() if 'mean_volume' in l or 'max_volume' in l])


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1])
