"""Озвучка ТОМ-ТУР через ElevenLabs. Ключ берётся из ELEVENLABS_API_KEY и никогда не печатается.
  python3 tools/tts.py lines <эпизод> [ключи...]          # episodes/<эп>/lines.json -> episodes/<эп>/voice/<ключ>.mp3 (готовые пропускает, если ключи не названы)
  python3 tools/tts.py sfx <out.mp3> <секунды> "<промпт>" [loop]
  python3 tools/tts.py music <out.mp3> <секунды> "<промпт>"
Ударения: U+0301 после ударной гласной («ка́мень»), «ё» пишем. Теги эмоций в начале: [smug], [shocked, loud] ...
Голоса владельца NIKITA, NIKITA2, Cartman не трогать никогда."""
import json, os, sys, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.load(open(ROOT / 'tools/config.json'))
API = 'https://api.elevenlabs.io/v1'


def _post(url, body, out):
    out = Path(out)
    if not out.parent.is_dir():                                   # проверка ДО платного вызова
        sys.exit(f'нет папки для {out}')
    if 'ELEVENLABS_API_KEY' not in os.environ:
        sys.exit('нет ELEVENLABS_API_KEY в окружении')
    req = urllib.request.Request(url, json.dumps(body).encode(), {'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = r.read(); cost = r.headers.get('character-cost') or r.headers.get('x-character-count')
    except urllib.error.HTTPError as e:
        sys.exit(f'HTTP {e.code}: {e.read()[:400]!r}')
    out.write_bytes(data)
    print(out.relative_to(ROOT) if out.is_relative_to(ROOT) else out, len(data), 'bytes, cost', cost)


def lines(ep, keys):
    d = ROOT / 'episodes' / ep; v = CFG['voice']
    L = json.load(open(d / 'lines.json')); (d / 'voice').mkdir(exist_ok=True)
    for k, text in L.items():
        out = d / 'voice' / f'{k}.mp3'
        if (keys and k not in keys) or (not keys and out.exists()):
            continue
        _post(f"{API}/text-to-speech/{v['voice_id']}?output_format=mp3_44100_128",
              {'text': text, 'model_id': v['model_id'], 'voice_settings': v['voice_settings']}, out)


if __name__ == '__main__':
    a = sys.argv
    if len(a) < 3: sys.exit(__doc__)
    if a[1] == 'lines':
        lines(a[2], a[3:])
    elif a[1] == 'sfx':
        body = {'text': a[4], 'duration_seconds': float(a[3])}
        if len(a) > 5 and a[5] == 'loop': body.update(loop=True, model_id='eleven_text_to_sound_v2')
        _post(f'{API}/sound-generation', body, a[2])
    elif a[1] == 'music':
        _post(f'{API}/music?output_format=mp3_44100_128', {'prompt': a[4], 'music_length_ms': int(float(a[3]) * 1000),
                                                            'model_id': 'music_v2_5', 'force_instrumental': True}, a[2])
