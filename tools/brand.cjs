// Бренд-ассеты кодом в стиле роликов: assets/brand/brand.js → assets/brand/avatar.png (800×800) и banner.jpg (2560×1440).
//   node tools/brand.cjs [avatar|banner]   (без аргумента — оба)
// Движок копируется с подменой размера холста (W, H), поверх — бумага и зерно как в роликах.
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process');
const JOBS = { avatar: [1200, 1200, 800], banner: [2560, 1440, 2560] };
(async () => {
  const want = process.argv[2] ? [process.argv[2]] : Object.keys(JOBS);
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const job of want) {
    const [w, h, outW] = JOBS[job], dir = path.resolve(`build/brand/${job}`); fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/engine.js`, fs.readFileSync('engine/engine.js', 'utf8').replace('const W = 1080, H = 1920', `const W = ${w}, H = ${h}`));
    for (const f of ['engine/core.js', 'engine/tom.js', 'assets/brand/brand.js']) fs.copyFileSync(f, `${dir}/${path.basename(f)}`);
    for (const f of fs.readdirSync('assets/fonts')) fs.copyFileSync(`assets/fonts/${f}`, `${dir}/${f}`);
    fs.writeFileSync(`${dir}/index.html`, `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:'Hand';src:url('Caveat.ttf');font-weight:100 900}@font-face{font-family:'Osw';src:url('Oswald600.ttf');font-weight:100 900}body{margin:0}.ff{font:20px Hand}.f2{font:600 20px Osw}</style></head><body><span class="ff">Т</span><span class="f2">Т</span>
<canvas id="c" width="${w}" height="${h}"></canvas><script src="engine.js"></script><script src="core.js"></script><script src="tom.js"></script><script src="brand.js"></script></body></html>`);
    const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('file://' + dir + '/index.html'); await p.evaluate(() => Promise.all([document.fonts.load('700 100px Hand'), document.fonts.load('600 100px Osw')]));
    const r = await p.evaluate(job => { try { FRAME = 3; S = 1; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); BRAND[job]();
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'destination-out'; ctx.globalAlpha = 0.3; for (let y = 0; y < H; y += 512) for (let x = 0; x < W; x += 512) ctx.drawImage(grain, x, y); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      out.drawImage(paper, 0, 0); out.drawImage(ink, 0, 0); if (BRAND[job + 'Post']) BRAND[job + 'Post'](out);
      return document.getElementById('c').toDataURL('image/png'); } catch (e) { return 'ERR ' + e.message + ' ' + (e.stack || '').split('\n')[1]; } }, job);
    if (r.startsWith('ERR')) { console.log(job, r); continue; }
    const raw = `${dir}/raw.png`, dst = `assets/brand/${job}.${job === 'banner' ? 'jpg' : 'png'}`;   // баннер — JPG (YouTube ≤ 6 МБ) fs.writeFileSync(raw, Buffer.from(r.split(',')[1], 'base64'));
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', `scale=${outW}:-1:flags=lanczos`, ...(job === 'banner' ? ['-q:v', '2'] : []), dst]);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', 'scale=900:-1', `build/brand/${job}_small.jpg`]); console.log(job, '→', dst);
  }
  await b.close();
})();
