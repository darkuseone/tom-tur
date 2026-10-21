/* 004 — сцена `bog` (хук): 2026, Парижская площадь у Бранденбургских ворот, золотой час. С первого кадра брусчатка под Томом
   лопается и превращается в топь: камыш, ряска, пузыри, лягушка. На «Медведь» «Бадди-медведь» туристов уходит в трясину и подмигивает
   на «каламбур». Переход в туннель — кадр тонет: мутная вода поднимается снизу, из глубины раскрывается портал часов. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.bog_splash = 0.02;                          // брусчатка лопается — «чвяк»
  EV.bog_frog = wt('h1', '«Берлин».');           // лягушка выпрыгивает и квакает
  EV.bog_bear = wt('h1', 'Медведь');             // медведь проваливается в топь
  EV.bog_pun = wt('h1', 'каламбур.');            // медведь подмигивает, пузырь «буль»
  EV.bog_wind = wt('h2', 'Отматываем');          // часы
  SHAKES.push([EV.bog_splash, 0.35, 14], [EV.bog_bear + 0.1, 0.25, 6]);
  KEYW.push('«Берлин».', 'каламбур.');

  const TX = 380, BX = 850;                                          // Том и медведь
  const R = t => sm(clamp((t - EV.bog_splash) / 0.9)) * (0.85 + 0.15 * sm(clamp((t - EV.bog_bear) / 0.8)));   // разлив топи 0..1
  const sinkT = t => 34 * sm(clamp((t - 0.25) / 1.2)), sinkB = t => 230 * sm(clamp((t - EV.bog_bear) / 1.5));

  function sky(t) {
    vgrad(-700, 1500, ['#4e7cb8', '#8eb2d6', '#f2d4a4', '#f4b27a'], 1);
    glow(980, 860, 520, 'rgba(255,214,150,1)', 0.5);
    for (const [x, y, s, sd] of [[140, 380, 1.2, 1], [700, 250, 1.5, 2], [1040, 520, 1.0, 3], [380, 640, 0.8, 4]]) cloudB(x + Math.sin(t * 0.1 + sd) * 20 + t * 6, y, s, '#fff0dc', 0.75, sd);
    const r = rng(81); for (let k = 0; k < 5; k++) { const bx = (100 + k * 230 + t * 60 * (1 + r())) % 1300 - 100, by = 420 + r() * 220 + Math.sin(t * 3 + k) * 8; pencil([[bx - 14, by], [bx, by + 6 + Math.sin(t * 12 + k) * 5], [bx + 14, by]], { w: 2.6, col: '#3a2a2a', a: 0.6, pass2: false }); }
  }
  function skyline(t) {                                              // дальний план: телебашня, купол Рейхстага, крыши
    tvTower(1010, 1200, 0.62, t);
    for (const [x, w, h, c] of [[-120, 260, 300, '#c8b8a0'], [880, 300, 240, '#b8a890'], [1060, 240, 340, '#a8a0a0']]) rect(x, 1200 - h, w, h, { wash: c, washA: 0.55, line: false });
    push(70, 1000, 0.8); const dm = ell(0, 0, 110, 90, { wash: '#bcd0dc', washA: 0.7, w: 1.6, col: '#5a6a7a', a: 0.5 }); for (let q = -4; q <= 4; q++) pencil([[q * 24, -86 + Math.abs(q) * 6], [q * 27, 0]], { w: 1.2, col: '#5a6a7a', a: 0.45, pass2: false }); rect(-150, 0, 300, 160, { wash: '#d8ccb0', washA: 0.7, w: 1.4, col: '#6a5a4a', a: 0.4 }); pop();
    haze('#f4d8b4', 0.22);
  }
  function trees(t) { for (let k = 0; k < 8; k++) linden(120 + k * 125, 1270, 380 + (k % 3) * 40, t, 8200 + k, '#5a8a3e'); }
  function buildings(t) {                                            // Парижская площадь: отель слева, банк справа, флаги
    const b = (x, w, top, col, rows, seed) => { const p = rect(x, top, w, 1300 - top, { wash: col, washA: 1, w: 2.2, col: '#3a2a1a', key: seed }); shadeG(p.path, x + w, 0, x, 0, '#6a5a48', 0.3);
      for (let r = 0; r < rows; r++) for (let c = 0; c < Math.floor(w / 62); c++) { const wx = x + 20 + c * 62, wy = top + 40 + r * 86; rect(wx, wy, 34, 54, { wash: (r + c + seed) % 5 ? '#4a5a6e' : '#f6dca0', washA: 0.9, w: 1.2, col: '#2a1e12' }); pencil([[wx, wy + 27], [wx + 34, wy + 27]], { w: 1, col: '#e8dcc0', a: 0.6, pass2: false }); }
      rect(x - 8, top - 18, w + 16, 22, { wash: lerpC(col, '#ffffff', 0.25), washA: 1, w: 1.8, col: '#3a2a1a' }); };
    b(-220, 420, 700, '#e2cfaa', 6, 8210); b(860, 440, 660, '#cfc6ba', 7, 8211);
    rect(-220, 1180, 420, 120, { wash: '#7a2a2a', washA: 0.9, w: 1.6, col: '#2a1010' }); txt('HOTEL', -10, 1222, 30, { font: 'Osw', col: '#f6e2b0' });
    for (const [x, c] of [[40, [['#1a1a1a', 0], ['#c8241e', 20], ['#e8c020', 40]]], [150, [['#c8241e', 0], ['#f4f0e6', 30]]], [930, [['#2a4a9a', 0], ['#2a4a9a', 30]]], [1040, [['#1a1a1a', 0], ['#c8241e', 20], ['#e8c020', 40]]]]) {
      pencil([[x, 700], [x, 560]], { w: 3, col: '#6a6a6a', pass2: false }); const fw = Math.sin(t * 4 + x) * 6; c.forEach(([cc, dy]) => shape([[x, 560 + dy], [x + 70, 562 + dy + fw], [x + 72, 580 + dy + fw + (c.length === 2 ? 10 : 0)], [x, 580 + dy + (c.length === 2 ? 10 : 0)]], { wash: cc, washA: 1, w: 1.2, col: '#2a1e12' })); }
  }
  function plaza(t) {                                                // брусчатка Парижской площади
    const p = rect(-300, 1290, 1700, 900, { wash: '#b8aa96', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1290, '#6a5e50', 0.4);
    for (let y = 1300, row = 0; y < 2000; row++) { const hh = 16 + (y - 1300) * 0.05; pencil([[-300, y], [1400, y]], { w: 1.4, col: '#6a5e50', a: 0.55, pass2: false, gap: false });
      const ww = hh * 1.7; for (let x = -300 + (row % 2) * ww * 0.5; x < 1400; x += ww) pencil([[x, y], [x, y + hh]], { w: 1.2, col: '#6a5e50', a: 0.45, pass2: false, gap: false }); y += hh; }
    for (let k = 0; k < 4; k++) { const x = 160 + k * 260; ell(x, 1330, 20, 6, { wash: '#4a4038', washA: 0.5, line: false }); rect(x - 6, 1240, 12, 90, { wash: '#3a3a3a', washA: 1, w: 1.4, col: '#1a1a1a' }); ell(x, 1236, 14, 8, { wash: '#3a3a3a', washA: 1, w: 1.4 }); }
  }
  function bogShape(t) {                                             // контур топи вокруг Тома (волнистый эллипс)
    const k = R(t); if (k <= 0) return null; const P = [], cx = (TX + BX) / 2 - 40 + (1 - k) * (TX - 600), cy = 1520 + k * 120, rx = 120 + k * 800, ry = 40 + k * 400;
    for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; P.push([cx + Math.cos(a) * rx * (1 + Math.sin(a * 5 + 1) * 0.05), cy + Math.sin(a) * ry * (1 + Math.sin(a * 7) * 0.06)]); }
    return P;
  }
  function bog(t) {                                                  // топь: тёмная вода, ряска, кувшинки, пузыри, обломки брусчатки
    const P = bogShape(t); if (!P) return; const sp = spline(P, true, 4), pp = pathOf(sp);
    const r = rng(8230); for (let k = 0; k < 22; k++) { const i = Math.floor(r() * sp.length), [x, y] = sp[i]; push(x, y, 1, (r() - 0.5) * 0.8); rect(-16, -10, 32, 20, { wash: '#a89a86', washA: 1, w: 1.6, col: '#3a3028' }); pop(); }
    ctx.save(); ctx.clip(pp); const g = ctx.createLinearGradient(0, 1270, 0, 1760); g.addColorStop(0, '#5a6a3a'); g.addColorStop(0.5, '#3a4a24'); g.addColorStop(1, '#22301a'); ctx.fillStyle = g; ctx.fillRect(-400, 1200, 1900, 700);
    glow(980, 1380, 420, 'rgba(255,200,130,1)', 0.25);
    const rr = rng(8231); for (let k = 0; k < 90; k++) { const x = -100 + rr() * 1300, y = 1280 + rr() * 460; ell(x + Math.sin(t + k) * 4, y, 6 + rr() * 8, 3 + rr() * 3, { wash: '#7aa03a', washA: 0.85, line: false }); }
    for (const [x, y, s] of [[190, 1560, 1], [690, 1420, 0.8], [980, 1600, 1.1], [560, 1640, 0.9]]) { push(x, y, s); blob([[-36, 0], [-30, -14], [0, -18], [30, -14], [36, 0], [0, 10]], { wash: '#4a8a3a', washA: 1, w: 1.8, col: '#1c2a10' }); pencil([[0, 0], [24, -12]], { w: 2, col: '#1c2a10', pass2: false }); if (s > 1) { ell(-6, -12, 10, 8, { wash: '#f4d8e0', washA: 1, w: 1.4, col: '#6a3a4a' }); ell(-6, -14, 4, 4, { wash: '#f2c81e', washA: 1, line: false }); } pop(); }
    for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k * 0.25) % 1, x = [TX, BX, 620, 260][k], y = 1470 + k * 20; pencil(ellPts(x, y, 40 + ph * 160, 10 + ph * 40, 0, 0, 36), { w: 2, col: '#d8e8b0', a: 0.5 * (1 - ph), pass2: false, gap: false }); }
    for (let k = 0; k < 10; k++) { const ph = (t * 1.3 + k * 0.37) % 1, x = 120 + (k * 113) % 900, y = 1330 + (k * 71) % 380; ell(x, y - ph * 10, 4 + ph * 6, 4 + ph * 6, { wash: '#c8dca0', washA: 0.6 * (1 - ph), w: 1.2, col: '#2a3a1a', a: 0.6 * (1 - ph) }); }
    ctx.restore();
    pencil(sp, { w: 3, col: '#2a2414', a: 0.8, pass2: false });
    const kr = R(t); reeds(200, 1440, 190 * sm(clamp((t - 0.5) / 0.6)) * kr, t, 8240, 7); reeds(1000, 1460, 170 * sm(clamp((t - 0.8) / 0.6)) * kr, t, 8241, 6); reeds(640, 1380, 120 * sm(clamp((t - 1.2) / 0.6)) * kr, t, 8242, 5);
  }
  function tourists(t) {                                             // туристы у ворот: фото, селфи, после «чвяк» — шок
    const sh = t > EV.bog_splash + 0.2, sb = t > EV.bog_bear + 0.2;
    human(150, 1335, 0.5, t, { body: '#2a6a9a', legs: '#2a2a3a', hair: '#e8c070', face: sh ? 'shock' : 'smile', armR: 'hold', prop: 'camera', armL: sh ? 'up' : 'down', seed: 81 });
    human(260, 1330, 0.48, t, { body: '#c8402a', legs: '#3a3a4a', hat: 'cap', hatCol: '#f2f0e6', face: sh ? 'shock' : 'calm', armR: sh ? 'point' : 'hold', prop: sh ? undefined : 'phone', seed: 82 });
    human(700, 1330, 0.5, t, { body: '#e8c84a', legs: '#2a3a5a', hair: '#3a2010', face: sb ? 'shock' : 'smile', armR: 'up', prop: 'phone', seed: 83, flip: -1 });
    human(790, 1338, 0.52, t, { body: '#4a8a5a', legs: '#2a2a2a', hair: '#1a1a1a', beard: 'short', face: sb ? 'shock' : 'calm', armL: sb ? 'up' : 'hips', armR: 'hips', seed: 84, flip: -1 });
    human(980, 1340, 0.5, t, { body: '#8a4a8a', legs: '#2a2a3a', hat: 'beret', hatCol: '#2a2a2a', hair: '#8a4a2a', face: sb ? 'grin' : 'smile', armR: 'hold', prop: 'camera', seed: 85, flip: -1 });
  }
  function bear(t) {                                                 // медведь тонет: рисуем выше линии воды, у кромки — кольца
    const sk = sinkB(t), wl = 1478; ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 2000, wl + 400); ctx.clip();
    buddyBear(BX, 1490 + sk, 0.95, t, { wink: t > EV.bog_pun ? 1 : 0, rot: t > EV.bog_bear ? Math.sin(t * 3) * 0.05 + 0.06 : 0 }); ctx.restore();
    if (t > EV.bog_bear) { const ph = ((t - EV.bog_bear) * 1.4) % 1; pencil(ellPts(BX, wl, 110 + ph * 90, 18 + ph * 16, 0, 0, 36), { w: 2.6, col: '#e0ecc0', a: 0.7 * (1 - ph), pass2: false, gap: false }); }
    if (t > EV.bog_pun && t < EV.bog_pun + 0.8) { const k = (t - EV.bog_pun) / 0.8; ell(BX + 60, wl - 30 - k * 60, 20 + k * 20, 20 + k * 20, { wash: '#d8e8c0', washA: 0.5 * (1 - k), w: 2, col: '#3a4a2a', a: 1 - k }); txt('буль!', BX + 150, wl - 120 - k * 30, 44, { font: 'Hand', col: '#f6e7c8', a: 1 - k }); }
  }
  function frogFx(t) {
    const j = clamp((t - EV.bog_frog) / 0.55); frog(560, 1520, 1.1, t, { jump: j, dx: -120, flip: -1, croak: t > EV.bog_frog + 0.6 ? Math.max(0, Math.sin((t - EV.bog_frog) * 9)) : 0 });
    if (t > EV.bog_frog + 0.6 && t < EV.bog_frog + 1.6) txt('ква!', 440, 1400, 46, { font: 'Hand', col: '#f6e7c8', rot: -0.1, a: clamp((EV.bog_frog + 1.6 - t) / 0.3) });
  }
  function feetWater(t) {                                            // вода поверх лап Тома + кольца
    const y = GY + 4; ctx.save(); const g = ctx.createLinearGradient(0, y - 20, 0, y + 60); g.addColorStop(0, 'rgba(70,90,50,0.85)'); g.addColorStop(1, 'rgba(34,48,26,0.95)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(TX, y + 20, 170, 34, 0, 0, 6.3); ctx.fill(); ctx.restore();
    for (let k = 0; k < 2; k++) { const ph = (t * 1.1 + k * 0.5) % 1; pencil(ellPts(TX, y, 110 + ph * 120, 14 + ph * 16, 0, 0, 36), { w: 2.4, col: '#e0ecc0', a: 0.6 * (1 - ph), pass2: false, gap: false }); }
    if (t < EV.bog_splash + 0.7) { const k = (t - EV.bog_splash) / 0.7, r = rng(8250); for (let i = 0; i < 26; i++) { const a = -0.3 - r() * 2.5, v = 300 + r() * 500; ell(TX + Math.cos(a) * v * k, y - 20 + Math.sin(a) * v * k + 900 * k * k, 7, 9, { wash: '#4a5a2a', washA: 1 - k, w: 1.2, col: '#1c2410', a: 1 - k }); } }
  }
  function frontReeds(t) { reeds(-20, 1980, 420 * R(t), t, 8260, 8); reeds(1110, 1990, 380 * R(t), t, 8261, 8); const r = rng(8262); for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k * 0.33) % 1; ell(60 + k * 470, 1860 - ph * 60, 10, 6, { wash: '#2a3a1a', washA: 0.5 * (1 - ph), line: false }); } }

  WORLD.bog = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => skyline(t));
    lay(3.4, () => trees(t));
    lay(3.0, () => buildings(t));
    lay(2.3, () => gate(540, 1300, 1.02, t, { through: '#d8c090', shine: 0.6 }));
    lay(1.6, () => tourists(t));
    lay(1, () => { plaza(t); bog(t); frogFx(t); bear(t); cat(); feetWater(t); });
    lay(0.62, () => frontReeds(t));
  };
  DIR.bog = {
    outfit: 'hoodieB', light: { side: 1, rim: '#ffd29a' }, grade: ['#e88a40', 0.2],
    act: () => [[0, 'shock'], [WT('h1', 'значит'), 'awe'], [EV.bog_frog, 'smug'], [EV.bog_bear, 'sideeye'], [EV.bog_pun, 'laugh'], [LS('h2'), 'smug'], [EV.bog_wind + 0.15, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: TX, y: GY + sinkT(t), s: 1.04,
      look: t < WT('h1', 'значит') ? [-0.2, 0.7] : t > EV.bog_bear && t < LS('h2') ? [0.7, 0.2] : [0.15, 0],
      tilt: t < 0.6 ? -0.06 : t > EV.bog_pun && t < LS('h2') ? 0.07 : 0, squash: b.squash,
      hand: t > EV.bog_wind - 0.1 ? [70, -330] : t > EV.bog_bear + 0.1 && t < LS('h2') ? [150, -260] : t < 0.8 ? [-120, -300] : undefined,
      handF: t < 0.8 ? [120, -300] : undefined,
      point: t > EV.bog_bear + 0.15 && t < EV.bog_pun ? 1 : undefined,
      watchInHand: t > EV.bog_wind - 0.1, glow: clamp((t - EV.bog_wind) / 0.4), spin: t > EV.bog_wind + 0.3 ? 1 : 0, tailUp: t < 1.2, sweat: t > 0.3 && t < 1.6
    }),
    cam: () => [[0, 450, 1150, 0.12], [0.55, 520, 1080, 0.05], [EV.bog_bear - 0.1, 540, 1060, 0.08], [EV.bog_bear + 0.4, 690, 1130, 0.13], [LS('h2'), 470, 1110, 0.15], [S1.bog, 410, 1140, 0.26]],
    hud: t => { if (t > EV.bog_frog && t < EV.bog_bear + 0.3) note('berl- = «топь»', 640, 1170, t, EV.bog_frog, EV.bog_bear + 0.3, '#f6e7c8', 52, -0.05); }
  };

  // ---------------------------------------------------------------- переход В туннель: кадр тонет в топи, из глубины — портал часов
  TRANS_IN.tunnel = { a: 0.32, b: 0.42, runA: 1, fx(k, t, A, B) {
    const q = sm(clamp(k / 0.6)), wl = lerp(1960, -80, q);
    drawBuf(A, 1 + 0.05 * q, 540, 960, 1, null, 0, -q * 260);
    scr(() => { ctx.save(); const g = ctx.createLinearGradient(0, wl, 0, wl + 900); g.addColorStop(0, 'rgba(60,80,40,0.86)'); g.addColorStop(1, 'rgba(18,26,12,0.98)'); ctx.fillStyle = g; ctx.fillRect(0, wl, W, H - wl + 40); ctx.restore();
      const P = []; for (let x = -20; x <= W + 20; x += 30) P.push([x, wl + Math.sin(x * 0.02 + t * 9) * 12]); pencil(P, { w: 5, col: '#d8e8b0', a: 0.8, pass2: false, gap: false });
      const r = rng(hsh(FRAME, 31)); for (let i = 0; i < 30; i++) { const x = r() * W, y = wl + 40 + r() * (H - wl); ell(x, y, 5 + r() * 14, 5 + r() * 14, { wash: '#c8dca0', washA: 0.35, w: 1.4, col: '#e8f4d0', a: 0.6 }); } });
    const Rr = Math.pow(sm((k - 0.45) / 0.5), 1.3) * 1300; if (Rr > 1) { inCircle(540, 960, Rr, () => drawBuf(B, 1.3 - 0.3 * sm(k), 540, 960)); ringFX(540, 960, Rr, t, ['#e8a33c', '#fff1c8', '#9ac86a'], clamp(1.5 - k)); }
  } };
})();
