/* 004 — сцена `wall`: ночь 9 ноября 1989. Берлинская стена в граффити (западная сторона) под прожекторами, за ней — вышка.
   Люди лезут наверх, сидят на гребне, долбят бетон молотками (летит крошка). На ящике — телевизор с пресс-конференцией: человек за столом,
   бегущая строка «SOFORT, UNVERZÜGLICH». На «немедленно» — толпа ликует, фейерверк, по стене бежит трещина.
   Переход сюда — камера влетает в экран телевизора ГДР. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.wall_err = wt('s9', 'ошибке:');             // ТВ: помехи, крупно бумажка
  EV.wall_now = wt('s9', '«немедленно»!');       // ликование, фейерверк, трещина
  SHAKES.push([EV.wall_now + 0.05, 0.4, 12]);
  KEYW.push('ошибке:', '«немедленно»!');

  const WT0 = 920, WB = 1420;                                         // гребень и низ стены (слой 1.35)
  function sky(t) { vgrad(-700, 1500, ['#0a0e22', '#1a2244', '#2e3458', '#4a3e50'], 1); const r = rng(91); for (let k = 0; k < 60; k++) ell(r() * 1300 - 100, r() * 900 - 200, 1.6, 1.6, { wash: '#f4f0e0', washA: 0.4 + 0.4 * Math.sin(t * 3 + k), line: false });
    if (t > EV.wall_now) for (let k = 0; k < 4; k++) { const ph = ((t - EV.wall_now) * 0.9 + k * 0.27) % 1, cx = 200 + k * 230, cy = 300 + (k % 2) * 160; if (t - EV.wall_now < k * 0.27) continue; const rr = rng(92 + k); for (let q = 0; q < 22; q++) { const a = q / 22 * 6.283, d = ph * 220; pencil([[cx + Math.cos(a) * d * 0.7, cy + Math.sin(a) * d * 0.7 + ph * ph * 40], [cx + Math.cos(a) * d, cy + Math.sin(a) * d + ph * ph * 60]], { w: 4, col: ['#f2c81e', '#e84a6a', '#6ad0f0', '#f4f0e6'][k], a: (1 - ph), pass2: false }); } glow(cx, cy, 160 * ph, 'rgba(255,230,180,1)', 0.3 * (1 - ph)); } }
  function east(t) {                                                 // за стеной: вышка, прожекторы, панельки
    for (const [x, w, h] of [[-200, 380, 360], [860, 420, 420]]) { rect(x, 1100 - h, w, h, { wash: '#2a2c3a', washA: 1, line: false }); for (let f = 0; f < 8; f++) for (let k = 0; k < 10; k++) if ((f * 7 + k * 3) % 5 === 0) rect(x + 12 + k * 36, 1100 - h + 16 + f * 40, 16, 18, { wash: '#f6dca0', washA: 0.8, line: false }); }
    push(700, 1100, 1); rect(-26, -420, 52, 420, { wash: '#8a8a84', washA: 1, w: 2, col: '#1a1a1a' }); rect(-70, -500, 140, 90, { wash: '#9a9a94', washA: 1, w: 2, col: '#1a1a1a' }); rect(-56, -486, 112, 40, { wash: '#f6e8b0', washA: 0.85, line: false }); rect(-80, -510, 160, 16, { wash: '#5a5a54', washA: 1, w: 1.6 });
    const sw = Math.sin(t * 0.8) * 0.5; rays(0, -460, 1.6 + sw, 0.18, 1000, 'rgba(255,250,220,1)', 0.25, 3, t); pop();
  }
  function wall(t) {                                                 // сегменты L-образной стены с трубой на гребне и граффити
    const L = '#1a1a1e', crk = clamp((t - EV.wall_now) / 0.5);
    for (let k = 0; k < 10; k++) { const x = -300 + k * 170; const sg = rect(x, WT0, 168, WB - WT0, { wash: '#c8c4bc', washA: 1, w: 2.2, col: L, key: 9000 + k }); shadeG(sg.path, 0, WB, 0, WT0, '#6a6660', 0.35); }
    pencil([[-300, WT0 - 14], [1400, WT0 - 14]], { w: 34, col: '#d8d4cc', pass2: false }); pencil([[-300, WT0 - 24], [1400, WT0 - 24]], { w: 4, col: '#f4f0ea', a: 0.6, pass2: false });
    const G = [['TOM WAS HERE', 120, 1120, 50, '#e8402a', -0.06], ['1989', 640, 1060, 90, '#2a6ad8', 0.04], ['♥', 900, 1220, 120, '#e84a8a', 0], ['BERLIN', 330, 1300, 70, '#f2a81e', 0.03], ['FREIHEIT', 1080, 1080, 52, '#2aa86a', -0.05]];
    for (const [s, x, y, sz, c, r] of G) txt(s, x, y, sz, { font: s === '♥' ? 'Osw' : 'Hand', col: c, a: 0.9, rot: r });
    for (const [x, y, c] of [[-120, 1200, '#f2c81e'], [520, 1250, '#6ad0f0'], [780, 1000, '#a8e04a']]) { ell(x, y, 70, 46, { wash: c, washA: 0.75, line: false }); ell(x - 20, y - 8, 8, 10, { wash: '#1a1a1a', washA: 1, line: false }); ell(x + 20, y - 8, 8, 10, { wash: '#1a1a1a', washA: 1, line: false }); pencil(spline([[x - 30, y + 14], [x, y + 28], [x + 30, y + 14]], false, 6), { w: 4, col: '#1a1a1a', pass2: false }); }
    if (crk > 0) { const P = [[760, WT0]]; const r = rng(9010); for (let q = 1; q <= 8; q++) P.push([760 + (r() - 0.5) * 80, WT0 + q * (WB - WT0) / 8 * crk]); pencil(P, { w: 8, col: '#1a1a1e', pass2: false }); pencil(P.map(([x, y]) => [x + 6, y]), { w: 2, col: '#f4f0ea', a: 0.7, pass2: false }); }
  }
  function onTop(t) {                                                // люди на гребне стены
    const j = t > EV.wall_now;
    const P = [[60, '#c8402a', null, 'wave'], [210, '#3a6ab0', 'cap', 'up'], [400, '#e8c84a', null, 'up'], [760, '#4aa86a', 'headband', 'wave'], [930, '#8a4aa8', null, 'up'], [1090, '#d86a2a', 'cap', 'wave']];
    P.forEach(([x, c, h, arm], i) => { const hop = j ? Math.abs(Math.sin(t * 9 + i)) * 26 : 0; human(x, WT0 - 30 - hop, 0.6, t, { body: c, legs: '#2a3a5a', hat: h, hatCol: '#e84a6a', hair: ['#3a2010', '#e8c070', '#1a1a1a'][i % 3], face: j ? 'grin' : 'smile', armL: j ? 'up' : 'down', armR: j ? arm : i % 2 ? 'hold' : 'down', prop: i === 1 ? 'flag' : undefined, flagC: [['#1a1a1a', 0], ['#c8241e', 26], ['#e8c020', 52]], seed: 200 + i, flip: i % 2 ? -1 : 1 }); });
  }
  function crowd(t) {                                                // толпа у стены, молотки и крошка
    const j = t > EV.wall_now;
    const P = [[-40, '#6a4a8a'], [100, '#3a3a3a'], [780, '#a83a3a'], [900, '#2a6a8a'], [1040, '#8a8a3a']];
    P.forEach(([x, c], i) => human(x, 1470, 0.74, t, { body: c, legs: '#2a3a5a', hair: ['#3a2010', '#8a5a2a', '#1a1a1a'][i % 3], hat: i === 2 ? 'headband' : undefined, hatCol: '#f2c81e', face: j ? 'grin' : i === 1 ? 'shock' : 'calm', armR: i === 1 ? 'swing' : j ? 'up' : 'hold', armL: j ? 'up' : 'down', prop: i === 1 ? 'hammer' : i === 3 ? 'candle' : undefined, seed: 210 + i, flip: x > 540 ? -1 : 1 }));
    const hit = Math.sin(t * 9 + 210) > 0.85; if (hit) { const r = rng(hsh(FRAME, 9020)); for (let q = 0; q < 10; q++) ell(150 + r() * 60, 1220 - r() * 80, 4 + r() * 6, 4 + r() * 5, { wash: '#d8d4cc', washA: 1, w: 1, col: '#3a3a3a' }); }
  }
  function tv(t) {                                                   // телевизор на ящике: пресс-конференция, бегущая строка
    push(900, 1580, 1.05); rect(-150, -40, 300, 220, { wash: '#7a5a32', washA: 1, w: 2.4, col: '#1a1008' });
    const cab = rect(-170, -300, 340, 260, { wash: '#5a3a20', washA: 1, w: 3, col: '#1a1008', key: 9030 }); shadeG(cab.path, 170, 0, -170, 0, '#2a1608', 0.4);
    const scr_ = rect(-140, -276, 220, 200, { wash: '#2a3a4a', washA: 1, w: 2.4, col: '#0a0a0a' });
    ctx.save(); ctx.clip(scr_.path); const st = t > EV.wall_err && t < EV.wall_err + 0.35; if (st) { const r = rng(hsh(FRAME, 9031)); for (let i = 0; i < 300; i++) { ctx.fillStyle = r() > 0.5 ? '#f4f4f4' : '#2a2a2a'; ctx.fillRect(-140 + r() * 220, -276 + r() * 200, 6, 4); } }
      else { rect(-140, -276, 220, 200, { wash: '#4a6a8a', washA: 1, line: false }); rect(-140, -150, 220, 74, { wash: '#6a4a2a', washA: 1, line: false }); human(-30, -120, 0.42, t, { body: '#4a4a52', hair: '#9a9a9a', face: t > EV.wall_now ? 'shock' : 'calm', armR: 'hold', prop: 'scroll', seed: 220 });
        for (const mx of [-90, 30]) { pencil([[mx, -150], [mx, -186]], { w: 3, col: '#1a1a1a', pass2: false }); ell(mx, -190, 6, 8, { wash: '#1a1a1a', washA: 1, line: false }); }
        rect(-140, -100, 220, 24, { wash: '#c8241e', washA: 1, line: false }); txt('SOFORT, UNVERZÜGLICH… ', -30 + 140 - ((t * 120) % 440), -88, 20, { font: 'Osw', col: '#ffffff', align: 'left' }); }
      for (let y = -276; y < -76; y += 4) { ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(-140, y, 220, 2); } ctx.restore();
    glow(-30, -176, 200, 'rgba(160,200,255,1)', 0.25); for (let q = 0; q < 2; q++) ell(120, -230 + q * 60, 16, 16, { wash: '#c8b890', washA: 1, w: 1.6, col: '#1a1008' }); pencil([[-60, -300], [-110, -420]], { w: 3, col: '#c8ccd0', pass2: false }); pencil([[0, -300], [50, -420]], { w: 3, col: '#c8ccd0', pass2: false });
    pop();
  }

  WORLD.wall = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => east(t));
    lay(1.35, () => { wall(t); onTop(t); });
    lay(1, () => { const p = rect(-300, 1420, 1700, 900, { wash: '#3a3a44', washA: 1, line: false }); shadeG(p.path, 0, 1420, 0, 2000, '#14141a', 0.5); glow(540, 1500, 700, 'rgba(255,220,160,1)', 0.12); crowd(t); cat(); });
    lay(0.72, () => { tv(t); if (t > EV.wall_now) { const r = rng(9040); for (let k = 0; k < 40; k++) { const u2 = (t - EV.wall_now) * (0.5 + r() * 0.5), x = r() * 1200 - 60, y = -100 + u2 * (300 + r() * 300) + r() * 500; rect(x, y, 10, 16, { wash: ['#f2c81e', '#e84a6a', '#6ad0f0', '#f4f0e6'][k % 4], washA: 0.9, line: false }); } } });
  };
  DIR.wall = {
    outfit: 'denim', light: { side: 1, rim: '#ffe8b0' }, grade: ['#3a3a8a', 0.24],
    act: () => [[S0.wall, 'awe'], [EV.wall_err, 'smug'], [EV.wall_now - 0.1, 'shock'], [EV.wall_now + 0.35, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 470, y: GY - (t > EV.wall_now ? Math.abs(Math.sin((t - EV.wall_now) * 8)) * 40 : 0), s: 0.98, look: t > EV.wall_err && t < EV.wall_now ? [0.8, 0.5] : t > EV.wall_now ? [0, -0.4] : [0.2, -0.2],
      hand: t > EV.wall_now ? [-130, -350] : t > EV.wall_err ? [160, -200] : undefined, handF: t > EV.wall_now ? [140, -350] : undefined, point: t > EV.wall_err && t < EV.wall_now ? 1 : undefined, squash: b.squash, tailUp: t > EV.wall_now
    }),
    cam: () => [[S0.wall, 560, 980, 0.02], [EV.wall_err, 640, 1080, 0.08], [EV.wall_now, 560, 980, 0.04], [S1.wall, 540, 960, 0.1]],
    hud: t => { if (t > EV.wall_err && t < EV.wall_now) note('«немедленно» — а надо было «завтра»', 540, 600, t, EV.wall_err, EV.wall_now + 0.4, '#f6ecd6', 44, -0.04); }
  };

  // ---------------------------------------------------------------- переход В 1989: кадр уходит в экран лампового телевизора ГДР, помехи, камера влетает в экран
  TRANS_IN.wall = { a: 0.35, b: 0.4, fx(k, t, A, B) {
    const o = sm(clamp(k / 0.45)), i = sm(clamp((k - 0.55) / 0.45)), s = k < 0.5 ? lerp(1, 0.5, o) : lerp(0.5, 1.6, i);
    scr(() => { ctx.fillStyle = '#5a3a20'; ctx.fillRect(0, 0, W, H); const g = ctx.createRadialGradient(540, 900, 200, 540, 900, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
    const sw = W * s, sh = H * s * 0.62; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(540 - sw / 2, 900 - sh / 2, sw, sh, 60 * s) : ctx.rect(540 - sw / 2, 900 - sh / 2, sw, sh); ctx.clip();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const path = new Path2D(); path.rect(540 - sw / 2, 900 - sh / 2, sw, sh);
    inPath(path, () => { if (k < 0.45) drawBuf(A, s, 540, 900); else if (k < 0.58) { const r = rng(hsh(FRAME, 9050)); for (let q = 0; q < 900; q++) { ctx.fillStyle = r() > 0.5 ? '#e8e8e8' : '#2a2a2a'; ctx.fillRect(r() * W, r() * H, 10, 6); } } else drawBuf(B, s * 0.9, 540, 900);
      for (let y = 0; y < H; y += 6) { ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(0, y, W, 2); } });
    if (s < 1.4) scr(() => { for (let q = 0; q < 2; q++) ell(540 + sw / 2 + 60 * s, 900 - 60 * s + q * 140 * s, 26 * s, 26 * s, { wash: '#c8b890', washA: 1, w: 2, col: '#1a1008' }); txt('RFT', 540, 900 + sh / 2 + 50 * s, 40 * s, { font: 'Osw', col: '#d8c8a0' }); });
    if (k > 0.85) drawBuf(B, 1, 540, 960, sm((k - 0.85) / 0.15));
  } };
})();
