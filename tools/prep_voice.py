"""Подготовка реплик: чистка пауз + темп -> build/<эп>/vf/<k>.wav, липсинк Rhubarb -> episodes/<эп>/lips/<k>.json, длительности -> episodes/<эп>/durs.json.
  python3 tools/prep_voice.py <эпизод> [ключи...]"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.load(open(ROOT / 'tools/config.json'))['voice']
RHUBARB = ROOT / 'tools/bin/rhubarb/rhubarb'


def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)], capture_output=True, text=True).stdout)


def main(ep, keys):
    d = ROOT / 'episodes' / ep; vf = ROOT / 'build' / ep / 'vf'; lips = d / 'lips'
    vf.mkdir(parents=True, exist_ok=True); lips.mkdir(exist_ok=True)
    s = CFG['silence']; th = s['threshold_db']
    af = (f"silenceremove=start_periods=1:start_threshold={th}dB:stop_periods=-1:stop_duration={s['inner_pause']}:stop_threshold={th}dB:stop_silence={s['keep']},"
          f"areverse,silenceremove=start_periods=1:start_threshold={th}dB,areverse,atempo={CFG['tempo']}")
    L = json.load(open(d / 'lines.json')); dp = d / 'durs.json'
    D = json.load(open(dp)) if dp.exists() else {}
    for k in L:
        if keys and k not in keys: continue
        src = d / 'voice' / f'{k}.mp3'
        if not src.exists(): sys.exit(f'нет {src}: сначала tools/tts.py lines {ep}')
        w = vf / f'{k}.wav'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(src), '-af', af, '-ar', '44100', '-ac', '1', str(w)], check=True)
        D[k] = round(dur(w), 6)
        if RHUBARB.exists():
            subprocess.run([str(RHUBARB), '-q', '-r', 'phonetic', '-f', 'json', '-o', str(lips / f'{k}.json'), str(w)], check=True)
        else:
            print('нет Rhubarb (tools/setup.sh) — липсинк пропущен')
        print(k, D[k])
    json.dump({k: D[k] for k in L if k in D}, open(dp, 'w'))


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2:])
