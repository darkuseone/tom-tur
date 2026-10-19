/* 003 — сцена `sea`: ≈41 млн лет назад (средний эоцен), тёплое мелкое «киевское море». Голубые глины на дне, раковины, морская трава,
   орляки-скаты, стайки рыб, наутилусы (атурия). Вдали проплывает Otodus — родня мегалодона, потом бросается на камеру с открытой пастью.
   Над поверхностью — призрак будущего Киева (Лавра, Андреевская). Том — с аквалангом. Переход В сцену: провал сквозь пол — камера падает сквозь слои земли. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.sea_sea = wt('s10', 'море');                 // призрак Киева над водой
  EV.sea_kin = wt('s10', 'роднёй') - 0.1;         // акула разворачивается
  EV.sea_bite = wt('s10', 'мегалодона!');         // бросок на камеру
  SHAKES.push([EV.sea_bite + 0.25, 0.35, 14]);
  KEYW.push('море', 'мегалодона!');

  function aturia(x, y, s, t, k) { push(x + Math.sin(t + k) * 20, y + Math.sin(t * 1.4 + k) * 10, s); const sh = ell(0, 0, 40, 40, { wash: '#e8d4b0', washA: 1, w: 2.2, col: '#5a3a1a', key: 8000 + k });
    for (let i = 0; i < 7; i++) { const a = i * 0.8; pencil([[0, 0], [Math.cos(a) * 38, Math.sin(a) * 38]], { w: 4, col: '#a8642a', a: 0.7, pass2: false }); } for (let i = 0; i < 6; i++) pencil([[-40, 6 + i * 4], [-70 - Math.sin(t * 3 + i) * 8, 14 + i * 6]], { w: 2.4, col: '#c89a7a', pass2: false }); ell(-28, -4, 4, 4, { wash: '#1a0e06', washA: 1, line: false }); pop(); }
  function ray(x, y, s, t, k) { const f = Math.sin(t * 3 + k) * 30; push(x, y, s); blob([[-160, f], [-60, -30], [0, -40], [60, -30], [160, f], [40, 20], [0, 60], [-40, 20]], { wash: '#5a6a72', washA: 1, w: 2.2, col: '#1e2a30', key: 8010 + k });
    pencil([[0, 50], [10, 140], [30, 200]], { w: 3, col: '#1e2a30', pass2: false }); for (let i = 0; i < 6; i++) ell(-80 + i * 32, -6 + (i % 2) * 10, 6, 6, { wash: '#e8eef0', washA: 0.7, line: false }); pop(); }
  function school(cx, cy, t, n, seed, s) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = cx + (r() - 0.5) * 300 + Math.sin(t * 1.5 + i) * 30, y = cy + (r() - 0.5) * 160 + Math.cos(t * 2 + i) * 14; push(x, y, s * (0.7 + r() * 0.5));
    blob([[-24, 0], [0, -10], [24, 0], [0, 10]], { wash: '#c8d8d8', washA: 1, w: 1.4, col: '#2a3a40' }); poly([[-24, 0], [-38, -10], [-38, 10]], { wash: '#a8b8b8', washA: 1, w: 1.2, col: '#2a3a40' }); pop(); } }
  function seabed(t) {
    const P = [[-400, 1460]]; for (let x = -400; x <= 1500; x += 60) P.push([x, 1440 + Math.sin(x * 0.01) * 20]); P.push([1500, 2400], [-400, 2400]);
    const b = shape(P, { wash: '#7a8e96', washA: 1, w: 2.4, col: '#2a3a40', key: 8020 }); hatch(b.path, b.bb, { gap: 8, a: 0.15, col: '#2a3a40', ang: 0.1, key: 8021 });
    const r = rng(8022); for (let k = 0; k < 30; k++) { const x = -200 + r() * 1400, y = 1470 + r() * 400; ell(x, y, 10 + r() * 10, 6, { wash: '#efe2c8', washA: 0.9, w: 1.2, col: '#5a5040', a: 0.7 }); }
    for (let k = 0; k < 14; k++) { const x = -150 + k * 100, h = 120 + (k * 37) % 90; for (let j = 0; j < 4; j++) pencil([[x + j * 8, 1460], [x + j * 8 + Math.sin(t * 2 + k + j) * 20, 1460 - h * 0.6], [x + j * 8 + Math.sin(t * 2 + k + j) * 34, 1460 - h]], { w: 4, col: j % 2 ? '#5a8a4a' : '#3e6a3a', pass2: false }); }
  }
  function surface(t) {                                              // поверхность воды и призрак Киева над ней
    const y0 = 700; ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 6; k++) { const x = 100 + k * 180 + Math.sin(t + k) * 40; const g = ctx.createLinearGradient(x, y0, x + 200, 1500); g.addColorStop(0, 'rgba(200,240,255,0.18)'); g.addColorStop(1, 'rgba(200,240,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + 70, y0); ctx.lineTo(x + 340, 1500); ctx.lineTo(x + 180, 1500); ctx.fill(); } ctx.restore();
    pencil([[-300, y0], ...Array.from({ length: 30 }, (_, i) => [-300 + i * 60, y0 + Math.sin(i + t * 3) * 8])], { w: 4, col: '#e8f8ff', a: 0.8, pass2: false });
    const g = sm((t - EV.sea_sea) / 0.5) * (1 - sm((t - EV.sea_bite) / 0.3)); if (g <= 0) return; ctx.save(); ctx.globalAlpha = 0.55 * g;
    for (let k = 0; k < 12; k++) { const x = -100 + k * 110, h = 60 + (k * 41) % 80; rect(x, y0 - h, 80, h, { wash: '#e8f0f4', washA: 1, w: 1.4, col: '#5a7a8a' }); }
    rect(740, y0 - 240, 50, 240, { wash: '#f4f4ee', washA: 1, w: 1.6, col: '#5a7a8a' }); poly([[730, y0 - 240], [765, y0 - 300], [800, y0 - 240]], { wash: '#d6a842', washA: 1, w: 1.4 }); ell(765, y0 - 312, 14, 16, { wash: '#d6a842', washA: 1, w: 1.4 });
    for (const x of [300, 360, 420]) { ell(x, y0 - 140, 20, 26, { wash: '#d6a842', washA: 1, w: 1.4 }); } rect(290, y0 - 120, 140, 120, { wash: '#f4f4ee', washA: 1, w: 1.4, col: '#5a7a8a' });
    txt('здесь будет Киев', 560, y0 + 70, 46, { font: 'Hand', col: '#f6ecd6' }); ctx.restore();
  }

  function reef(x, y, s, t, seed) {                                  // риф: камень с губками, кораллами, ежами, анемонами
    const r = rng(seed); push(x, y, s); const rk = blob([[-200, 0], [-180, -120], [-90, -200], [40, -190], [160, -130], [210, 0]], { wash: '#6a7a6a', washA: 1, w: 2.4, col: '#1e2a24', key: seed }); hatch(rk.path, rk.bb, { gap: 8, a: 0.2, col: '#1e2a24', ang: 0.8, key: seed + 1 });
    for (let k = 0; k < 6; k++) { const bx = -150 + k * 60, by = -140 - Math.sin(k) * 40, c = ['#e8805a', '#d8b040', '#c85a8a', '#6ab0a0', '#e8a060', '#a86ad8'][k]; for (let q = 0; q < 4; q++) { const a = -Math.PI / 2 + (q - 1.5) * 0.4 + Math.sin(t * 1.5 + k + q) * 0.08; pencil([[bx, by], [bx + Math.cos(a) * 50, by + Math.sin(a) * 50]], { w: 8, col: c, pass2: false }); ell(bx + Math.cos(a) * 52, by + Math.sin(a) * 52, 7, 7, { wash: c, washA: 1, line: false }); } }
    for (let k = 0; k < 4; k++) { const ux = -120 + k * 80, uy = -40 - (k % 2) * 40; ell(ux, uy, 18, 14, { wash: '#3a2a4a', washA: 1, w: 1.4, col: '#1a0e1a' }); for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; pencil([[ux + Math.cos(a) * 14, uy + Math.sin(a) * 10], [ux + Math.cos(a) * 30, uy + Math.sin(a) * 24]], { w: 1.6, col: '#3a2a4a', pass2: false }); } }
    for (let k = 0; k < 3; k++) { const ax = 120 + k * 40, ay = -120 + k * 30; for (let q = 0; q < 9; q++) { const a = -Math.PI * (q / 8) ; pencil([[ax, ay], [ax + Math.cos(a) * 28 + Math.sin(t * 2 + q) * 4, ay + Math.sin(a) * 28]], { w: 3, col: '#f0a0b0', pass2: false }); } }
    pop();
  }
  function turtle(t) { const q = ((t - S0.sea) * 0.15) % 1, x = lerp(1100, -200, q), y = 820 + Math.sin(t) * 20; push(x, y, 0.55, -0.1); const f = Math.sin(t * 3) * 0.4;
    for (const [dx, dy, sd] of [[-60, 20, -1], [60, 24, 1]]) { push(dx, dy, 1, sd * f); blob([[0, 0], [-sd * -10, 40], [-sd * -40, 70], [-sd * -10, 30]], { wash: '#6a8a5a', washA: 1, w: 1.6, col: '#2a3a1e' }); pop(); }
    const sh = ell(0, 0, 100, 60, { wash: '#7a6a3a', washA: 1, w: 2.2, col: '#2a2010' }); for (let k = 0; k < 5; k++) pencil(ellPts(-50 + k * 25, -6, 16, 14, 0, 0.1, 10), { w: 1.6, col: '#3a3018', pass2: false });
    ell(-118, -6, 28, 22, { wash: '#6a8a5a', washA: 1, w: 1.8, col: '#2a3a1e' }); ell(-126, -12, 3, 3, { wash: '#0a0a0a', washA: 1, line: false }); pop(); }
  function starfish(x, y, s, c) { push(x, y, s); const P = []; for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 12 : 34; P.push([Math.cos(a) * r, Math.sin(a) * r]); } poly(P, { wash: c, washA: 1, w: 1.6, col: '#5a2a1a' }); pop(); }
  function colorFish(t) { for (let k = 0; k < 7; k++) { const dir = k % 2 ? 1 : -1, x = ((t * 60 * (0.6 + k * 0.1) * dir + k * 233) % 1500 + 1500) % 1500 - 200, y = 700 + k * 110; push(x, y, 0.6 + (k % 3) * 0.2, 0, dir); const c = ['#e8a030', '#3ab0c8', '#e86a5a', '#f0d040', '#8a6ad8'][k % 5];
    blob([[-40, 0], [-10, -20], [30, -14], [44, 0], [30, 14], [-10, 20]], { wash: c, washA: 1, w: 1.6, col: '#1e2a2a' }); poly([[-40, 0], [-62, -18], [-58, 0], [-62, 18]], { wash: c, washA: 1, w: 1.4, col: '#1e2a2a' }); for (const xx of [-10, 10]) pencil([[xx, -18], [xx, 18]], { w: 3, col: '#ffffff', a: 0.6, pass2: false }); ell(30, -4, 3, 3, { wash: '#0a0a0a', washA: 1, line: false }); pop(); } }
  WORLD.sea = (t, u, cat) => {
    lay(30, () => { vgrad(-200, 2200, ['#7fc8d8', '#2e7a92', '#14405a']); });
    lay(10, () => { surface(t); const kx = 1300 - clamp((t - S0.sea) / (EV.sea_kin - S0.sea)) * 1700; if (t < EV.sea_bite) shark(kx, 900, 0.45, t, { flip: -1, a: 0.7, col: '#4e6e7e', colD: '#1e3440', colL: '#a8c8d0' }); haze('#2e7a92', 0.25); });
    lay(4, () => { turtle(t); school(300, 760, t, 14, 8030, 1); ray(840, 1060, 0.9, t, 1); aturia(180, 1150, 0.8, t, 2); reef(120, 1430, 0.9, t, 8040); reef(1000, 1440, 0.8, t, 8050); colorFish(t); });
    lay(1.3, () => { seabed(t); starfish(240, 1600, 1, '#e8803a'); starfish(900, 1680, 0.8, '#d8504a'); starfish(560, 1760, 0.9, '#f0b040'); school(820, 1300, t, 8, 8031, 1.3); });
    lay(1, () => { cat(); motes(30, [0, 400, W, 1800], 'rgba(230,250,255,1)', t, 8032, { sp: -40, sz: 3, a: 0.5, wob: 10 }); });
    if (t > EV.sea_bite - 0.05) lay(0.7, () => { const q = clamp((t - EV.sea_bite) / (S1.sea - EV.sea_bite + 0.1)), s = lerp(0.6, 2.6, Math.pow(q, 1.8));
      shark(lerp(-200, 380, sm(q)), lerp(1000, 900, q), s, t, { jaw: Math.min(1, q * 2.5), glowEye: 0, sp: 6 }); });
  };
  DIR.sea = {
    outfit: 'scuba', light: { side: 1, rim: '#bff0ff' }, grade: ['#2a6a8a', 0.18],
    act: () => [[S0.sea, 'awe'], [EV.sea_sea, 'proud'], [EV.sea_kin, 'suspicious'], [EV.sea_bite, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 720 + (t > EV.sea_bite ? (t - EV.sea_bite) * 300 : 0), y: 1340 + Math.sin(t * 2) * 16, s: 0.95, rot: 0.05 + Math.sin(t * 1.3) * 0.04, look: t > EV.sea_kin ? [-0.8, 0] : [0, -0.6], tailUp: true, walk: t * 3,
      hand: t > EV.sea_bite ? [-120, -420] : undefined, handF: t > EV.sea_bite ? [120, -420] : undefined }),
    cam: () => [[S0.sea, 560, 960, -1.0], [S0.sea + 0.5, 560, 980, 0.0, 'x'], [EV.sea_sea, 560, 900, 0.02], [EV.sea_kin, 520, 1000, 0.06], [EV.sea_bite, 500, 1000, 0.1], [S1.sea, 480, 980, 0.22]],
    afterCat: (t, u, P) => { for (let k = 0; k < 4; k++) { const q = (t * 1.2 + k / 4) % 1; ell(P.x + 60 * P.s, P.y - 470 * P.s - q * 300, 8 + q * 10, 8 + q * 10, { wash: '#e8f8ff', washA: 0.4, w: 1.4, col: '#e8f8ff', a: 0.8 * (1 - q) }); } }
  };
  // ---------------------------------------------------------------- переход В сцену: провал сквозь пол (A уходит вверх, мимо пролетают слои земли)
  TRANS_IN.sea = { a: 0.28, b: 0.36, runA: 1, fx(k, t, A, B) {
    const q = sm(k), Hs = H * 1.3, off = q * (H + Hs);
    drawBuf(B, 1, 540, 960, 1, null, 0, H + Hs - off);
    scr(() => { const cols = ['#8a7a5a', '#9a7652', '#b0a688', '#7d8f97', '#5e7480']; for (let i = 0; i < cols.length; i++) { const y = H - off + i * Hs / cols.length; ctx.fillStyle = cols[i]; ctx.fillRect(0, y, W, Hs / cols.length + 2);
      const r = rng(i * 9 + 1); for (let j = 0; j < 20; j++) { ctx.fillStyle = 'rgba(30,20,10,0.25)'; ctx.fillRect(r() * W, y + r() * Hs / cols.length, 6 + r() * 20, 4); } pencil([[0, y], [W, y + 10]], { w: 3, col: '#2a1e12', a: 0.6, pass2: false }); }
      if (k > 0.3 && k < 0.8) { const r = rng(hsh(FRAME, 4)); for (let i = 0; i < 30; i++) { const x = r() * W, y = r() * H; pencil([[x, y], [x, y - 200 - r() * 300]], { w: 3, col: '#fff6e0', a: 0.5, pass2: false }); } } });
    drawBuf(A, 1, 540, 960, 1, null, 0, -off);
  } };
})();
