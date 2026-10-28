// Лист костюмов Тома: до 6 костюмов на одном кадре, без мира (проверка нового костюма за секунды, без рендера сцен).
//   python3 tools/mkpage.py <эп> && node tools/tomsheet.cjs <эп> outfit1,outfit2,… [эмоция] [prop]
//   → build/<эп>/tomsheet.jpg (540×960). Эмоции: neutral talk shock awe smug sideeye annoyed grin laugh scared cold proud suspicious wink.
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  const [ep, list, expr = 'talk', prop] = process.argv.slice(2); if (!ep || !list) { console.log('node tools/tomsheet.cjs <эп> outfit1,outfit2 [эмоция] [prop]'); process.exit(1); }
  const film = path.resolve(`build/${ep}/film`), outs = list.split(',').slice(0, 6);
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + film + '/index.html'); await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 600));
  const r = await p.evaluate((outs, expr, prop) => { try {
    const bad = outs.filter(o => !OUTFIT[o]);
    window.frame = t => { screenFill('#d8cdb6', 1); outs.forEach((o, i) => { const x = 180 + (i % 3) * 360, y = 880 + Math.floor(i / 3) * 900;
      ell(x, y + 4, 150, 22, { wash: '#000000', washA: 0.15, line: false });
      if (OUTFIT[o]) tom({ t, x, y, s: 0.82, outfit: o, expr, expr2: expr, ek: 1, look: [0.2, 0], light: { side: 1, rim: '#ffe3a8' }, prop: prop || undefined, hand: prop ? [110, -250] : undefined });
      txt(o + (OUTFIT[o] ? '' : ' — НЕТ'), x, y + 60, 40, { font: 'Osw', col: OUTFIT[o] ? '#2a1a10' : '#c8201e' }); }); };
    window.hudFrame = () => {}; lastFr = -1; draw(1.0);
    return { url: document.getElementById('c').toDataURL('image/jpeg', 0.85), bad };
  } catch (e) { return { err: e.message + (e.stack || '').split('\n')[1] }; } }, outs, expr, prop);
  await b.close();
  if (r.err || errs.length) { console.log('ОШИБКА', r.err || '', errs.join(' | ')); process.exit(1); }
  const big = `build/${ep}/tomsheet_full.jpg`, out = `build/${ep}/tomsheet.jpg`; fs.writeFileSync(big, Buffer.from(r.url.split(',')[1], 'base64'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', big, '-vf', 'scale=540:-1', out]);
  console.log('→', out, r.bad.length ? '| нет в OUTFIT: ' + r.bad.join(', ') : '');
})();
