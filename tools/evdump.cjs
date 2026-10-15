// Выгружает события миров (EV, S0, S1, DUR) из собранной страницы в episodes/<эп>/ev.json — для sound.py (звук точно по событиям картинки).
//   node tools/evdump.cjs <эпизод>        (сначала python3 tools/mkpage.py <эп>)
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs');
(async () => {
  const ep = process.argv[2], film = path.resolve(`build/${ep}/film`);
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + film + '/index.html'); await new Promise(r => setTimeout(r, 800));
  const ev = await p.evaluate(() => { const o = {}; for (const [k, v] of Object.entries(EV)) if (typeof v === 'number' && isFinite(v)) o[k] = +v.toFixed(3); return { EV: o, S0, S1, DUR }; });
  fs.writeFileSync(`episodes/${ep}/ev.json`, JSON.stringify(ev, null, 0)); console.log(Object.keys(ev.EV).length, 'событий →', `episodes/${ep}/ev.json`); await b.close();
})();
