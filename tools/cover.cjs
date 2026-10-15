// Обложка выпуска: рисует COVER (w_cover.js) → episodes/<эп>/cover.png (1080×1920) и превью build/<эп>/cover_small.jpg.
//   python3 tools/mkpage.py <эп> && node tools/cover.cjs <эп>
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  const ep = process.argv[2], film = path.resolve(`build/${ep}/film`);
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + film + '/index.html'); await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 800));
  const r = await p.evaluate(() => { try { COVER_ON = true; lastFr = -1; draw(COVER.t); return document.getElementById('c').toDataURL('image/png'); } catch (e) { return 'ERR ' + e.message + (e.stack || '').split('\n')[1]; } });
  await b.close(); if (r.startsWith('ERR')) { console.log(r); process.exit(1); }
  const out = `episodes/${ep}/cover.png`; fs.writeFileSync(out, Buffer.from(r.split(',')[1], 'base64'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', out, '-vf', 'scale=540:-1', `build/${ep}/cover_small.jpg`]); console.log('→', out);
})();
