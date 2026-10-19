"""Дубляж выпуска на другой язык тем же голосом (Дмитрий, eleven_v4): та же картинка, те же SFX и музыка, другая озвучка.
  python3 tools/dub.py <эп> [en] [ключи...]       # episodes/<эп>/lines_en.json → voice_en/*.mp3 (готовые пропускает, если ключи не названы)
Каждая реплика: чистка пауз → темп подгоняется под длину русской реплики (0.85–1.3, иначе тишина в конце) → build/<эп>/vf_en/<k>.wav,
микс tools/mix.py → build/<эп>/audio_en.m4a (дорожка для YouTube) + build/<эп>/preview_en.mp4 (картинка final.mp4 + англ. звук),
субтитры → episodes/<эп>/subs_en.srt (обычные) и subs_en.ytt (YouTube SRV3: цвета канала, меньше, над русскими)."""
import json, re, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import tts, mix

ROOT = Path(__file__).resolve().parent.parent
CFG = json.load(open(ROOT / 'tools/config.json'))['voice']
dur = lambda p: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)], capture_output=True, text=True).stdout)
clean = lambda s: re.sub(r'\s+', ' ', re.sub(r'\[[^\]]*\]', '', s)).strip()


def atempo(f):                                                    # atempo принимает 0.5–2; цепочка на всякий случай
    out = []
    while f > 2: out.append('atempo=2'); f /= 2
    while f < 0.5: out.append('atempo=0.5'); f /= 0.5
    return ','.join(out + [f'atempo={f:.4f}'])


WEAK = {'the', 'a', 'an', 'to', 'for', 'of', 'in', 'on', 'by', 'and', 'at', 'from', 'was', 'is', 'its', 'had', 'it'}
def chunks(text):                                                 # фрагменты субтитров: по знакам препинания, длинные фразы — на 2–3 части, служебное слово не висит в конце
    phr = [x.replace('—', '').strip() for x in re.findall(r'[^,.!?…—]+[,.!?…]*', text)]
    out = []
    for ph in [p for p in phr if p]:
        w = ph.split()
        if len(w) <= 4: out.append(' '.join(w)); continue
        g = 2 if len(w) <= 8 else 3; size = -(-len(w) // g); i = 0
        while i < len(w):
            j = min(len(w), i + size)
            while j < len(w) and j - i > 2 and w[j - 1].lower() in WEAK: j -= 1
            if len(w) - j == 1: j = len(w)
            out.append(' '.join(w[i:j])); i = j
    return out


def ts(t, sep=','): h, m, s = int(t // 3600), int(t % 3600 // 60), t % 60; return f'{h:02d}:{m:02d}:{int(s):02d}{sep}{int(round((s % 1) * 1000)):03d}'


def main(ep, lang='en', keys=()):
    d = ROOT / 'episodes' / ep; b = ROOT / 'build' / ep; vd = d / f'voice_{lang}'; vf = b / f'vf_{lang}'
    vd.mkdir(exist_ok=True); vf.mkdir(parents=True, exist_ok=True)
    L = json.load(open(d / f'lines_{lang}.json')); T = json.load(open(d / 'times.json')); VO, VD = T['start'], T['dur']
    v = CFG
    for k, text in L.items():                                     # озвучка (платно — только недостающие или названные)
        out = vd / f'{k}.mp3'
        if (keys and k not in keys) or (not keys and out.exists()): continue
        tts._post(f"{tts.API}/text-to-speech/{v['voice_id']}?output_format=mp3_44100_128", {'text': text, 'model_id': v['model_id'], 'voice_settings': v['voice_settings']}, out)
    s = v['silence']; th = s['threshold_db']; real = {}
    for k in L:                                                   # подгонка под длину русской реплики
        raw = b / f'_{k}_raw.wav'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(vd / f'{k}.mp3'), '-af',
                        f"silenceremove=start_periods=1:start_threshold={th}dB:stop_periods=-1:stop_duration={s['inner_pause']}:stop_threshold={th}dB:stop_silence={s['keep']},areverse,silenceremove=start_periods=1:start_threshold={th}dB,areverse",
                        '-ar', '44100', '-ac', '1', str(raw)], check=True)
        f = max(0.85, min(1.3, dur(raw) / VD[k]))
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-af', atempo(f), str(vf / f'{k}.wav')], check=True); raw.unlink()
        real[k] = dur(vf / f'{k}.wav'); print(f'{k}: темп ×{f:.2f}, {real[k]:.2f} с (слот {VD[k]:.2f})' + ('  ← длиннее слота' if real[k] > VD[k] + 0.25 else ''))
    mix.main(ep, f'vf_{lang}', f'audio_{lang}.m4a')
    fin = d / 'final.mp4'
    if fin.exists(): subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(fin), '-i', str(b / f'audio_{lang}.m4a'), '-map', '0:v', '-map', '1:a', '-c', 'copy', '-shortest', str(b / f'preview_{lang}.mp4')], check=True)
    # субтитры: фрагменты по словам, время пропорционально длине фрагмента в реплике
    cues = []
    for k, text in L.items():
        parts = chunks(clean(text)); tot = sum(len(p) for p in parts); t0 = VO[k]
        for p in parts: dt = real[k] * len(p) / tot; cues.append((t0, t0 + dt, p)); t0 += dt
    srt = '\n'.join(f'{i + 1}\n{ts(a)} --> {ts(min(e, a + 4))}\n{p}\n' for i, (a, e, p) in enumerate(cues))
    (d / f'subs_{lang}.srt').write_text(srt)
    esc = lambda x: x.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    head = ('<?xml version="1.0" encoding="utf-8"?><timedtext format="3"><head>'
            '<pen id="1" b="1" fc="#F6ECD6" fo="254" bo="0" et="3" ec="#120A06" sz="85" fs="4"/>'
            '<pen id="2" b="1" fc="#E8A33C" fo="254" bo="0" et="3" ec="#120A06" sz="85" fs="4"/>'
            '<wp id="1" ap="7" ah="50" av="74"/><ws id="1" ju="2"/></head><body>')
    body = ''.join(f'<p t="{int(a * 1000)}" d="{int((e - a) * 1000)}" wp="1" ws="1" p="{2 if p.rstrip().endswith("!") else 1}">{esc(p)}</p>' for a, e, p in cues)
    (d / f'subs_{lang}.ytt').write_text(head + body + '</body></timedtext>\n')
    print('→', (b / f'audio_{lang}.m4a').relative_to(ROOT), (d / f'subs_{lang}.srt').relative_to(ROOT), (d / f'subs_{lang}.ytt').relative_to(ROOT))


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'en', sys.argv[3:])
