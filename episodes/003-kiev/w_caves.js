/* 003 — сцена `caves`: XII век, Ближние пещеры Киево-Печерской лавры. Узкий подземный ход в лёссе, побелённые стены, свечи в нишах,
   лампада над ракой под расшитым покровом (мощи прп. Илии Муромца). На стене — былина: Илья на печи и 33 зарубки «сидел сиднем».
   «Экспертиза мощей» — лист заключения 1988 г. со схемой позвоночника и штампом (без показа самих мощей — уважительно).
   Переход В сцену: пасть химеры заглатывает кадр → в темноте вспыхивает свеча. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.cave_tally = wt('s4', 'тридцать');           // зарубки 1…33
  EV.cave_sit = wt('s4', 'сиднем?');              // былинная картинка: Илья на печи
  EV.cave_exp = wt('s4', 'Экспертиза');           // лист экспертизы
  EV.cave_true = wt('s4', 'правда!');             // штамп
  SHAKES.push([EV.cave_true + 0.05, 0.22, 8]);
  KEYW.push('сиднем?', 'правда!');

  const VX = 540, VY = 900;
  const ring = (d, k = 1) => { const s = 1 / d, w = 520 * s * k, h = 760 * s * k, y0 = VY + 560 * s; return { s, w, h, y0 }; };
  function tunnel(t) {
    vgrad(-200, 2200, ['#120c08', '#2a1e14', '#120c08']);
    for (let i = 9; i >= 0; i--) { const d = 0.75 + i * 0.6, R = ring(d), sh = clamp(1 - i / 10), col = lerpC('#1a1008', '#c4aa82', Math.pow(sh, 1.6) * 0.95);
      const P = [[VX - R.w, R.y0 + 400 * R.s], [VX - R.w, R.y0 - R.h * 0.55], [VX - R.w * 0.6, R.y0 - R.h * 0.92], [VX, R.y0 - R.h], [VX + R.w * 0.6, R.y0 - R.h * 0.92], [VX + R.w, R.y0 - R.h * 0.55], [VX + R.w, R.y0 + 400 * R.s]];
      const p = blob(P, { wash: col, washA: 1, w: 2 + sh * 1.5, col: '#3a2a1a', a: 0.6, key: 7500 + i }); if (i < 4) hatch(p.path, p.bb, { gap: 9, a: 0.1, col: '#5a4428', ang: 0.6 + i, key: 7510 + i, w: 1.2 }); }
    // пол-тропа
    const fp = poly([[VX - 560, 2000], [VX + 560, 2000], [VX + 70, VY + 120], [VX - 70, VY + 120]], { wash: '#8a7458', washA: 1, w: 2, col: '#3a2a1a', a: 0.5, key: 7520 }); shadeG(fp.path, 0, VY + 120, 0, 1600, '#1a120a', 0.6);
    for (let k = 0; k < 8; k++) { const y = VY + 140 + Math.pow(k / 8, 2) * 900; pencil([[VX - 60 - k * 60, y], [VX + 60 + k * 60, y]], { w: 1.4, col: '#5a4428', a: 0.4, pass2: false }); }
  }
  function niche(x, y, s, t, k) { push(x, y, s); const n = blob([[-50, 40], [-50, -40], [0, -80], [50, -40], [50, 40]], { wash: '#3a2a1a', washA: 1, w: 2, col: '#1e140a', key: 7530 + k }); candle(0, 36, 0.9, t, k); pop(); }
  function reliquary(t) {                                            // рака под покровом, лампада
    push(230, 1330, 1); glow(0, -240, 260, 'rgba(255,170,90,1)', 0.35);
    const lp = flick(t, 3); pencil([[0, -500], [0, -330]], { w: 2, col: '#3a2a1a', pass2: false }); const lam = blob([[-26, -330], [26, -330], [18, -290], [-18, -290]], { wash: '#b8302a', washA: 0.9, w: 2, col: '#4a0e0a' }); glow(0, -316, 60 * lp, 'rgba(255,120,80,1)', 0.8);
    const b = shape([[-200, 0], [-210, -120], [-170, -170], [170, -170], [210, -120], [200, 0]], { wash: '#7a4a2a', washA: 1, w: 2.6, col: '#2a140a', key: 7540 });
    const cl = blob([[-214, -110], [-180, -176], [180, -176], [214, -110], [190, -60], [-190, -60]], { wash: '#d8c8a0', washA: 1, w: 2.2, col: '#5a4a2a', key: 7541 }); shadeG(cl.path, 0, -60, 0, -176, '#8a7450', 0.5);
    for (let k = 0; k < 9; k++) { const x = -170 + k * 42; pencil([[x, -70], [x + 12, -80], [x + 24, -70]], { w: 3, col: '#a8302a', pass2: false }); }
    push(0, -126, 1); for (const [dx, dy] of [[0, -18], [0, 18], [-18, 0], [18, 0]]) ell(dx, dy, 7, 7, { wash: '#c99636', washA: 1, w: 1.4, col: '#5a3a08' }); pop();
    pop();
  }
  function tally(t) {                                                // 33 зарубки на правой стене
    if (t < EV.cave_tally) return; const n = Math.min(33, Math.floor((t - EV.cave_tally) / 0.035)), x0 = 700, y0 = 640;
    for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5, row = Math.floor(g / 4), gx = x0 + (g % 4) * 78, gy = y0 + row * 92;
      if (j < 4) pencil([[gx + j * 14, gy], [gx + j * 14 + 3, gy + 60]], { w: 4, col: '#2a1a0c', a: 0.85, pass2: false, key: 7550 + i }); else pencil([[gx - 8, gy + 44], [gx + 58, gy + 12]], { w: 4, col: '#2a1a0c', a: 0.85, pass2: false, key: 7550 + i }); }
    if (n >= 33) { const k = popK(t, EV.cave_tally + 33 * 0.035, 0.3); push(850, 600, k); txt('33 года', 0, 0, 52, { font: 'Hand', col: '#7a1a10' }); pop(); }
  }
  function bylina(t) {                                               // фреска-лубок: Илья на печи
    const k = sm((t - EV.cave_sit) / 0.4) * (1 - sm((t - EV.cave_exp - 0.3) / 0.3)); if (k <= 0) return;
    push(330, 760, 1); ctx.save(); ctx.globalAlpha = k;
    const fr = rect(-170, -200, 340, 300, { wash: '#efe2c0', washA: 0.95, w: 3, col: '#5a3a1a', key: 7560 }); hatch(fr.path, fr.bb, { gap: 10, a: 0.08, col: '#8a6a3a', ang: 0.2, key: 7561 });
    const p = shape([[-120, 80], [-120, -60], [40, -60], [40, -120], [90, -120], [90, 80]], { wash: '#f4ecdc', washA: 1, w: 2.4, col: '#5a3a1a' }); rect(-90, -10, 60, 50, { wash: '#2a1a10', washA: 1, w: 2 });
    blob([[-110, -60], [-70, -110], [-20, -110], [10, -60]], { wash: '#b8302a', washA: 1, w: 2, col: '#5a1a10' }); ell(-50, -138, 26, 28, { wash: '#e8c8a0', washA: 1, w: 2, col: '#5a3a1a' });
    blob([[-70, -128], [-50, -100], [-30, -128], [-50, -112]], { wash: '#c89a5a', washA: 1, w: 1.4 }); pencil([[-60, -142], [-55, -142]], { w: 2, pass2: false }); pencil([[-45, -142], [-40, -142]], { w: 2, pass2: false });
    const z = (t * 1.2) % 1; txt('z', 10 + z * 40, -170 - z * 40, 30 + z * 10, { font: 'Hand', col: '#5a3a1a', a: 1 - z });
    txt('ИЛЬЯ НА ПЕЧИ', 0, 72 + 0, 26, { font: 'Osw', col: '#7a1a10' });
    ctx.restore(); pop();
  }
  function report(t) {                                               // лист экспертизы + штамп
    if (t < EV.cave_exp - 0.05) return; const k = popK(t, EV.cave_exp, 0.4);
    push(330, 800, k, -0.05); const pp = rect(-170, -230, 340, 420, { wash: '#f6f0e2', washA: 1, w: 2.6, col: '#3a3020', key: 7570 }); shadeG(pp.path, -170, 0, -60, 0, '#c8bca0', 0.4);
    txt('ЭКСПЕРТИЗА', 0, -196, 34, { font: 'Osw', col: '#2a2420' }); txt('Киев · 1988', 0, -160, 24, { font: 'Hand', col: '#3a3020' });
    for (let i = 0; i < 12; i++) { const y = -120 + i * 22, w = 20 - Math.abs(i - 6) * 0.8; rect(-w - 70, y, w * 2, 16, { wash: '#d8dce4', washA: 1, w: 1.6, col: '#3a4a6a' }); }
    pencil([[-70, -124], [-70, 140]], { w: 1.4, col: '#3a4a6a', a: 0.6, pass2: false });
    for (const [s_, y] of [['паралич', -100], ['конечностей', -70], ['в юности —', -40], ['был.', -10]]) txt(s_, 50, y, 26, { font: 'Hand', col: '#2a2420' });
    pencil([[-20, 30], [140, 30]], { w: 1.4, col: '#8a7a5a', pass2: false }); pencil([[-20, 60], [120, 60]], { w: 1.4, col: '#8a7a5a', pass2: false });
    if (t > EV.cave_true) { const q = popK(t, EV.cave_true, 0.25); push(40, 110, 1.6 - 0.6 * q, -0.25); ctx.save(); ctx.globalAlpha = Math.min(1, q * 1.4) * 0.92;
      pencil(ellPts(0, 0, 110, 52, 0, 0.05, 50), { w: 6, col: '#b8241e', pass2: false }); txt('ПРАВДА', 0, 4, 54, { font: 'Osw', col: '#b8241e' }); ctx.restore(); pop(); }
    pop();
  }

  function icon(x, y, s, k) {                                        // икона в нише: доска, золотой фон, нимб, лик, киноварь
    push(x, y, s); rect(-44, -60, 88, 120, { wash: '#6a3a1a', washA: 1, w: 2, col: '#1a0a04' }); const g = rect(-36, -52, 72, 104, { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' }); shadeG(g.path, -36, -52, 36, 52, '#8a5a14', 0.4);
    ell(0, -18, 22, 22, { wash: '#f0d070', washA: 1, w: 1.4, col: '#8a5a14' }); ell(0, -16, 12, 15, { wash: '#c89a70', washA: 1, w: 1.2, col: '#3a1a0a' }); blob([[-24, 52], [-20, 4], [0, -2], [20, 4], [24, 52]], { wash: k % 2 ? '#a8241e' : '#2a4a7a', washA: 1, w: 1.4, col: '#1a0a04' });
    pencil([[-5, -18], [-2, -18]], { w: 1.6, pass2: false }); pencil([[2, -18], [5, -18]], { w: 1.6, pass2: false }); pop();
  }
  function lampadas(t) { for (let k = 0; k < 5; k++) { const d = 1.2 + k * 0.7, sc = 1 / d, x = 540 + (k % 2 ? 1 : -1) * 120 * sc * 2.2, y = 900 - 520 * sc; pencil([[x, y - 200 * sc], [x, y]], { w: 1.4, col: '#3a2a1a', pass2: false }); blob([[x - 14 * sc, y], [x + 14 * sc, y], [x + 9 * sc, y + 20 * sc], [x - 9 * sc, y + 20 * sc]], { wash: k % 2 ? '#a8241e' : '#2a6a3a', washA: 0.9, w: 1.2 }); glow(x, y + 10 * sc, 70 * sc * flick(t, k), 'rgba(255,150,90,1)', 0.7); } }
  function monk(t) {                                                 // монах со свечой проходит в глубине
    const q = ((t - S0.caves) * 0.12) % 1, d = lerp(5.5, 3.5, q), sc = 1 / d, x = 540 + 80 * sc, y = 900 + 560 * sc;
    human(x, y, 2.4 * sc, t, { body: '#1e1a18', bodyD: '#0a0806', hat: 'hood2', hatCol: '#141210', long: 1, face: 'calm', beard: 'long', hair: '#d8d0c0', armR: 'hold', prop: 'candle', seed: 91 });
    glow(x + 30 * sc, y - 300 * sc, 260 * sc, 'rgba(255,190,110,1)', 0.5); }
  function wallMarks(t) {                                            // следы кирки, надписи-граффити, корни из свода
    const r = rng(7580); for (let k = 0; k < 40; k++) { const side = k % 2 ? 1 : -1, d = 0.8 + r() * 2.2, sc = 1 / d, x = 540 + side * (380 + r() * 120) * sc * 1.3, y = 900 + (r() - 0.6) * 900 * sc; pencil([[x, y], [x + 18 * sc * side, y + 8 * sc]], { w: 2, col: '#6a5034', a: 0.45, pass2: false }); }
    for (const [x, y, s_, rr] of [[110, 1040, 'Г(оспод)и помози', -0.1], [880, 980, 'Илия', 0.08], [960, 1180, '✝', 0]]) txt(s_, x, y, 30, { font: 'Hand', col: '#4a2a14', a: 0.6, rot: rr });
    for (let k = 0; k < 6; k++) { const x = 380 + k * 70, y = 260 + (k % 2) * 30; pencil([[x, y], [x + 6, y + 40], [x - 4, y + 80], [x + 3, y + 110]], { w: 2.2, col: '#3a2a14', a: 0.6, pass2: false }); }
  }
  WORLD.caves = (t, u, cat) => {
    lay(3, () => { tunnel(t); wallMarks(t); lampadas(t); monk(t); for (const [x, y, k] of [[150, 700, 1], [930, 760, 2], [300, 640, 3], [800, 640, 4]]) niche(x, y, 0.8, t, k); icon(60, 900, 0.9, 1); icon(1010, 930, 0.9, 2); icon(330, 820, 0.55, 3); icon(760, 820, 0.55, 4); });
    lay(1.3, () => { reliquary(t); tally(t); });
    lay(1, () => { cat(); });
    lay(0.8, () => { bylina(t); report(t); });
    lay(1, () => { glow(780, 1100, 700, 'rgba(255,170,80,1)', 0.18); scr(() => { const g = ctx.createRadialGradient(540, 1000, 300, 540, 1000, 1100); g.addColorStop(0, 'rgba(10,6,4,0)'); g.addColorStop(1, 'rgba(10,6,4,0.75)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }); });
  };
  DIR.caves = {
    outfit: 'bogatyr', light: { side: -1, rim: '#ffc078' }, grade: ['#8a4a1a', 0.2],
    act: () => [[S0.caves, 'neutral'], [EV.cave_tally, 'suspicious'], [EV.cave_sit, 'sideeye'], [EV.cave_exp, 'awe'], [EV.cave_true, 'shock']],
    pose: (t, u, b) => Object.assign(b, {
      x: 760, y: 1480, s: 1.0, look: t < EV.cave_exp ? [0.4, -0.3] : [-0.6, -0.2], tilt: t > EV.cave_true ? 0.05 : 0,
      hand: t > EV.cave_tally && t < EV.cave_exp ? [130, -360] : undefined, point: t > EV.cave_tally && t < EV.cave_exp ? 1 : undefined, tailUp: t > EV.cave_true
    }),
    cam: () => [[S0.caves, 600, 1000, 0.12], [EV.cave_tally, 600, 940, 0.04], [EV.cave_exp, 500, 960, 0.02], [EV.cave_true, 480, 980, 0.08], [S1.caves, 480, 990, 0.12]]
  };
  // ---------------------------------------------------------------- переход В сцену: пасть химеры заглатывает кадр → свеча в темноте
  TRANS_IN.caves = { a: 0.28, b: 0.42, runA: 0.6, fx(k, t, A, B) {
    if (k < 0.45) { const q = sm(k / 0.45), cx = 300, cy = 760; drawBuf(A, 1 + q * 1.4, cx, cy);
      scr(() => { const R = 1500 * (1 - q) + 30; const p = new Path2D(); p.rect(0, 0, W, H); p.ellipse(cx, cy, R, R * 0.6, 0, 0, 6.283, true); ctx.fillStyle = '#0a0604'; ctx.fill(p, 'evenodd');
        for (let i = 0; i < 9; i++) { const a = Math.PI * (0.1 + 0.8 * i / 8); poly([[cx + Math.cos(a) * R * 1.02 - 22, cy - Math.sin(a) * R * 0.6], [cx + Math.cos(a) * R * 1.02 + 22, cy - Math.sin(a) * R * 0.6], [cx + Math.cos(a) * R * 0.86, cy - Math.sin(a) * R * 0.5]], { wash: '#d8d4c8', washA: 1, w: 1.6, col: '#3a3a3a' }); poly([[cx + Math.cos(a) * R * 1.02 - 22, cy + Math.sin(a) * R * 0.6], [cx + Math.cos(a) * R * 1.02 + 22, cy + Math.sin(a) * R * 0.6], [cx + Math.cos(a) * R * 0.86, cy + Math.sin(a) * R * 0.5]], { wash: '#d8d4c8', washA: 1, w: 1.6, col: '#3a3a3a' }); } });
      return; }
    const q = (k - 0.45) / 0.55; scr(() => { screenFill('#0a0604', 1); });
    inCircle(780, 1000, Math.pow(q, 1.6) * 1500, () => drawBuf(B));
    scr(() => { glow(780, 1000, 120 + q * 300, 'rgba(255,190,90,1)', 0.9 * (1 - q * 0.6)); });
  } };
})();
