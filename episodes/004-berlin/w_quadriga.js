/* 004 — сцена `quadriga`: 1806. Французы снимают квадригу с Бранденбургских ворот: на аттике — деревянный кран, один конь висит на канате
   и опускается в огромный ящик «PARIS» на телеге. Слева Наполеон (двууголка, рука за бортом сюртука) указывает «à Paris!», гренадеры, барабанщик.
   На «Париж» крышка захлопывается, штамп PARIS; на «не распаковал» — ящик зарастает паутиной, счётчик 1806 → 1814. Переход сюда — облако пудры из парика. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.quad_lower = wt('s4', 'увёз');              // конь опускается в ящик
  EV.quad_slam = wt('s4', 'Париж');              // крышка — бах, штамп PARIS
  EV.quad_web = wt('s4', 'распаковал!');         // паутина, 1806 → 1814
  SHAKES.push([EV.quad_slam, 0.3, 12]);
  KEYW.push('Париж', 'распаковал!');

  const CX = 900, CY = 1470, GX = 430, GB = 1390, GS = 1.32;                                         // ящик
  const hangY = t => lerp(-120, 520, sm(clamp((t - EV.quad_lower + 0.4) / 1.4)));   // конь на канате (в координатах слоя ворот, от аттика)
  function sky(t) { vgrad(-700, 1400, ['#6a7a8e', '#9aa6b4', '#d8d0c0', '#e8d4b0'], 1); for (const [x, y, s, sd] of [[200, 300, 1.6, 41], [820, 420, 1.8, 42], [520, 140, 1.2, 43]]) cloudB(x + t * 14, y, s, '#d8d8dc', 0.85, sd); const r = rng(44); for (let k = 0; k < 4; k++) { const x = (k * 300 + t * 70) % 1300 - 100, y = 500 + k * 50; pencil([[x - 12, y], [x, y + 6], [x + 12, y]], { w: 2.4, col: '#2a2a2a', a: 0.6, pass2: false }); } }
  function far(t) { for (let k = 0; k < 12; k++) linden(-150 + k * 120, 1250, 300, t, 8600 + k, '#6a7a3a', 0.85); for (const [x, w, h] of [[-200, 360, 340], [1000, 400, 300]]) rect(x, 1260 - h, w, h, { wash: '#c8bca8', washA: 0.8, w: 1.4, col: '#5a4a3a', a: 0.4 }); haze('#e0d8c8', 0.25); }
  function gateTop(t) {                                              // ворота без квадриги + кран + оставшиеся кони
    gate(GX, GB, GS, t, { noQuad: true, through: '#b8a888' });
    push(GX, GB - 500 * GS, 0.52 * GS);
    horse(-135, 0, 0.62, t, { col: '#5f9a7e', colD: '#2a4e3e', colL: '#9ccab0', mane: '#2a4e3e', flip: -1, rear: 0.5, noShadow: 1 });
    const P = '#5f9a7e', L = '#1c120a'; for (const sd of [-1, 1]) blob([[sd * 10, -200], [sd * 70, -250], [sd * 96, -200], [sd * 70, -170], [sd * 30, -170]], { wash: P, washA: 1, w: 2.2, col: L });
    blob([[-26, -120], [-30, -200], [-14, -236], [14, -236], [30, -200], [26, -120]], { wash: P, washA: 1, w: 2.4, col: L }); ell(0, -254, 17, 19, { wash: P, washA: 1, w: 2.2, col: L }); pencil([[12, -226], [40, -270], [44, -420]], { w: 6, col: P, pass2: false }); pencil(ellPts(44, -430, 26, 26, 0, 0.05, 24), { w: 6, col: P, pass2: false });
    blob([[-60, -40], [-66, -120], [0, -132], [66, -120], [60, -40], [0, -30]], { wash: P, washA: 1, w: 2.6, col: L });
    horse(-70, 10, 0.68, t, { col: P, colD: '#2a4e3e', colL: '#9ccab0', mane: '#2a4e3e', flip: -1, rear: 0.7, noShadow: 1 });
    pop();
    const ax = GX + 300 * GS, ay = GB - 500 * GS;                           // кран: стойка и стрела над краем аттика
    for (const dx of [-30, 30]) pencil([[ax - 200 + dx, ay], [ax - 120, ay - 380]], { w: 14, col: '#6a4424', pass2: false });
    pencil([[ax - 160, ay - 360], [ax + 160, ay - 420]], { w: 14, col: '#7a5030', pass2: false }); ell(ax + 150, ay - 412, 18, 18, { wash: '#4a3a2a', washA: 1, w: 2, col: '#1a1008' });
    const hy = ay + hangY(t); pencil([[ax + 150, ay - 404], [ax + 150, hy - 120]], { w: 3, col: '#3a2a1a', pass2: false });
    if (t < EV.quad_slam - 0.05) { pencil([[ax + 150, hy - 120], [ax + 110, hy - 60]], { w: 3, col: '#3a2a1a', pass2: false }); pencil([[ax + 150, hy - 120], [ax + 190, hy - 60]], { w: 3, col: '#3a2a1a', pass2: false });
      horse(ax + 150, hy + 60, 0.6, t, { col: '#5f9a7e', colD: '#2a4e3e', colL: '#9ccab0', mane: '#2a4e3e', rot: Math.sin(t * 2.2) * 0.12, noShadow: 1, rear: 0.3 }); }
    for (let k = 0; k < 3; k++) human(GX - 200 + k * 200, ay - 2, 0.5, t, { body: '#2a3a7a', legs: '#f0ece2', hat: 'shako', hatCol: '#c8241e', face: 'calm', armR: 'up', armL: k === 1 ? 'up' : 'hold', seed: 120 + k });
  }
  function crate(t) {                                                // ящик на телеге: доски, трафарет PARIS, крышка, паутина
    const slam = t > EV.quad_slam, web = clamp((t - EV.quad_web) / 0.9), dx = slam ? 0 : 0;
    push(CX + dx, CY, 1);
    for (const wx of [-200, 200]) { const w = ell(wx, -30, 70, 70, { wash: '#6a4424', washA: 1, w: 3, col: '#1c0e04' }); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283 + (slam ? (t - EV.quad_slam) * 0 : 0); pencil([[wx, -30], [wx + Math.cos(a) * 64, -30 + Math.sin(a) * 64]], { w: 4, col: '#4a2a12', pass2: false }); } ell(wx, -30, 14, 14, { wash: '#3a3a3a', washA: 1, w: 2 }); }
    const bx = rect(-270, -470, 540, 400, { wash: '#c8a066', washA: 1, w: 3, col: '#2a1608', key: 8620 }); shadeG(bx.path, 270, 0, -100, 0, '#6a4a22', 0.4);
    for (let y = -460; y < -70; y += 66) pencil([[-268, y], [268, y]], { w: 2, col: '#7a5a2a', a: 0.7, pass2: false }); for (const sx of [-270, 0, 250]) rect(sx, -470, 20, 400, { wash: '#a87a40', washA: 1, w: 1.8, col: '#2a1608' });
    pencil([[-270, -470], [270, -70]], { w: 10, col: '#a87a40', pass2: false });
    txt('PARIS', 0, -300, 110, { font: 'Osw', col: '#2a2a3a', a: 0.85, rot: -0.04 }); txt('→ FRAGILE ←', 0, -200, 40, { font: 'Hand', col: '#8a2a1a', a: 0.9 });
    if (!slam) { const ly = -470; push(-270, ly, 1, -1.1); rect(0, -16, 560, 20, { wash: '#b89058', washA: 1, w: 2.4, col: '#2a1608' }); pop(); const hk = sm(clamp((t - EV.quad_lower) / 1.2)); if (hk > 0.6) { push(40, -470, 0.42); horse(0, 120, 1, t, { col: '#5f9a7e', colD: '#2a4e3e', colL: '#9ccab0', mane: '#2a4e3e', noShadow: 1 }); pop(); } }
    else { const k = popK(t, EV.quad_slam, 0.25); rect(-282, -500, 564, 36, { wash: '#b89058', washA: 1, w: 2.6, col: '#2a1608' }); push(140, -380, 1.6 - 0.6 * k, -0.2); pencil([[-120, -50], [120, -50], [120, 50], [-120, 50], [-120, -50]], { w: 8, col: '#b8241e', a: 0.85, pass2: false }); txt('PARIS', 0, 4, 70, { font: 'Osw', col: '#b8241e', a: 0.85 }); pop();
      if (t - EV.quad_slam < 0.6) { const q = (t - EV.quad_slam) / 0.6, r = rng(8621); for (let i = 0; i < 18; i++) { const a = r() * 3.14 + 3.14, v = 160 + r() * 200; ell(Math.cos(a) * v * q, -480 + Math.sin(a) * v * q * 0.6, 14, 10, { wash: '#d8c8a8', washA: 0.7 * (1 - q), line: false }); } } }
    if (web > 0) { ctx.save(); ctx.globalAlpha = web; for (const [wx, wy, sd] of [[-270, -500, 1], [270, -500, -1], [-270, -70, 1]]) { for (let q = 0; q < 6; q++) { const a = q / 5 * Math.PI / 2; pencil([[wx, wy], [wx + sd * Math.cos(a) * 190, wy + (wy < -200 ? 1 : -1) * Math.sin(a) * 190]], { w: 3, col: '#fbf8f2', a: 0.95, pass2: false }); }
      for (let rr = 40; rr <= 190; rr += 36) { const P = []; for (let q = 0; q <= 6; q++) { const a = q / 6 * Math.PI / 2; P.push([wx + sd * Math.cos(a) * rr, wy + (wy < -200 ? 1 : -1) * Math.sin(a) * rr]); } pencil(P, { w: 2.6, col: '#fbf8f2', a: 0.9, pass2: false }); } }
      ctx.fillStyle = 'rgba(200,190,170,0.35)'; ctx.fillRect(-270, -470, 540 * web, 16); ctx.restore(); }
    pop();
  }
  function french(t) {
    const nap = { body: '#2a3a7a', legs: '#f0ece2', hat: 'bicorne', trim: '#f4f0e6', belt: '#f4f0e6', face: t > EV.quad_slam ? 'grin' : 'calm', armR: t > EV.quad_lower && t < EV.quad_web ? 'point' : 'hold', armL: 'hold', seed: 130, boots: '#141010' };
    human(620, 1440, 0.82, t, Object.assign(nap, { flip: -1 }));
    if (t > EV.quad_lower && t < EV.quad_web) note('à Paris !', 640, 980, t, EV.quad_lower, EV.quad_web, '#2a1a10', 56, -0.06);
    human(70, 1470, 0.86, t, { body: '#2a3a7a', legs: '#f0ece2', hat: 'shako', hatCol: '#c8241e', belt: '#f4f0e6', face: 'calm', armR: 'hold', prop: 'spear', seed: 131 });
    human(1120, 1470, 0.86, t, { body: '#2a3a7a', legs: '#f0ece2', hat: 'shako', hatCol: '#c8241e', belt: '#f4f0e6', face: t > EV.quad_slam ? 'shock' : 'calm', armR: 'hold', prop: 'spear', seed: 132, flip: -1 });
    push(-60, 1475, 0.8); human(0, 0, 1, t, { body: '#2a3a7a', legs: '#f0ece2', hat: 'shako', hatCol: '#c8241e', face: 'calm', armR: 'swing', armL: 'swing', seed: 133 }); const dr = ell(0, -150, 52, 40, { wash: '#e8e0d0', washA: 1, w: 2, col: '#2a1a0a' }); rect(-52, -150, 104, 50, { wash: '#2a4a9a', washA: 1, w: 2, col: '#1a1a2a' }); for (let x = -46; x < 52; x += 18) pencil([[x, -150], [x + 9, -100]], { w: 2, col: '#e8d080', pass2: false }); pop();
  }
  function ground(t) { const p = rect(-300, 1300, 1700, 900, { wash: '#a09484', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1300, '#5a5044', 0.4); for (let y = 1310, row = 0; y < 2000; row++) { const hh = 16 + (y - 1310) * 0.05; pencil([[-300, y], [1400, y]], { w: 1.3, col: '#5a5044', a: 0.5, pass2: false, gap: false }); for (let x = -300 + (row % 2) * hh * 0.85; x < 1400; x += hh * 1.7) pencil([[x, y], [x, y + hh]], { w: 1.1, col: '#5a5044', a: 0.4, pass2: false, gap: false }); y += hh; } }

  WORLD.quadriga = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => far(t));
    lay(1.9, () => gateTop(t));
    lay(1, () => { ground(t); crate(t); french(t); cat(); });
    lay(0.66, () => { push(80, 1870, 1.1); for (const [bx, by, bw] of [[-40, 0, 220], [140, -30, 180]]) { rect(bx - bw / 2, by - 150, bw, 150, { wash: '#c8a066', washA: 1, w: 2.4, col: '#2a1608' }); for (let y = by - 150; y < by; y += 50) pencil([[bx - bw / 2, y], [bx + bw / 2, y]], { w: 2, col: '#7a5a2a', a: 0.6, pass2: false }); } txt('PARIS', -40, -70, 44, { font: 'Osw', col: '#2a2a3a', a: 0.8 }); pop(); const r = rng(8650); for (let k = 0; k < 40; k++) { const x = 300 + r() * 800, y = 1820 + r() * 60; pencil([[x, y], [x + 30 + r() * 30, y - 10 + r() * 20]], { w: 3, col: '#d8b860', a: 0.8, pass2: false }); } });
    lay(0.6, () => { motes(24, [-100, 200, 1200, 1900], '#e8e0d0', t, 8630, { sp: 30, vx: 40, sz: 4, a: 0.5 }); });
  };
  DIR.quadriga = {
    outfit: 'hussar', light: { side: -1, rim: '#f0e0c0' }, grade: ['#6a7a9a', 0.22],
    act: () => [[S0.quadriga, 'annoyed'], [EV.quad_lower, 'annoyed'], [EV.quad_slam, 'shock'], [EV.quad_web - 0.1, 'smug'], [EV.quad_web + 0.4, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 330, y: GY, s: 0.94, look: t < EV.quad_slam ? [0.6, -0.6] : t < EV.quad_web ? [0.7, 0] : [0, 0],
      hand: t < EV.quad_slam ? [150, -330] : undefined, point: t < EV.quad_slam ? 1 : undefined, squash: b.squash, tailUp: t > EV.quad_slam && t < EV.quad_web
    }),
    cam: () => [[S0.quadriga, 600, 880, 0.02], [EV.quad_lower + 0.3, 620, 920, 0.03], [EV.quad_slam, 640, 1000, 0.07], [EV.quad_web, 640, 1020, 0.09], [S1.quadriga, 620, 1020, 0.14]],
    hud: t => { if (t > EV.quad_web) { const k = clamp((t - EV.quad_web) / 0.6), y = Math.round(lerp(1806, 1814, k)); push(800, 640, 1, -0.04); ctx.save(); ctx.fillStyle = 'rgba(20,14,10,0.7)'; ctx.fillRect(-170, -70, 340, 170); ctx.restore(); txt(String(y), 0, 0, 104, { font: 'Osw', col: y === 1814 ? K.amber : '#f6ecd6' }); txt('в ящиках', 0, 72, 48, { font: 'Hand', col: '#f6ecd6' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В 1806: облако пудры из парика — белые клубы заполняют кадр и рассеиваются
  TRANS_IN.quadriga = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.1, 540, 960); else drawBuf(B, 1.08 - (k - 0.5) * 0.16, 540, 960);
    scr(() => { const r = rng(8640), g = Math.sin(k * Math.PI); for (let i = 0; i < 70; i++) { const a = r() * 6.283, d = (0.1 + r()) * 900 * sm(clamp(k * 1.6)), x = 640 + Math.cos(a) * d, y = 880 + Math.sin(a) * d * 1.2, rr = (80 + r() * 160) * (0.5 + g);
      ell(x, y, rr, rr * 0.8, { wash: i % 3 ? '#fbf8f2' : '#e8e2d8', washA: 0.85 * g, line: i % 4 === 0, w: 1.4, col: '#b8b0a4', a: 0.5 * g }); } });
    whiteOut(0.85 * Math.max(0, 1 - Math.abs(k - 0.5) * 4), '250,248,242');
  } };
})();
