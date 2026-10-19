/* 003 — сцена `chimera`: 1901–1903, Дом с химерами архитектора Городецкого на обрыве Банковой. Боковой разрез склона:
   с улицы сверху видно 3 этажа, снизу, с площади, — все 6. Бетонные химеры: слоны, носорог, лягушки, сомы, орлы.
   Гэг: табличка «УЧАСТОК НЕГОДЕН» на склоне. Камера: сверху (3 этажа) → ныряет вдоль фасада вниз (6). Переход В сцену: вихрь от винта. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.chim_cliff = wt('s2', 'обрыве:');            // табличка «негоден»
  EV.chim_top = wt('s2', 'сверху');               // счёт 1-2-3 сверху
  EV.chim_down = wt('s2', 'снизу');               // камера ныряет вниз
  EV.chim_six = wt('s2', 'шесть!');               // счёт до 6, слон трубит
  SHAKES.push([EV.chim_six, 0.25, 7]);
  KEYW.push('обрыве:', 'шесть!');

  const HX0 = 120, HX1 = 760, FT = 160, GB = 1450, NF = 6, GT = GB - 3 * FT;   // дом: 6 этажей по FT, верхняя улица на GT
  const fy = i => GB - i * FT;                                       // низ этажа i (0 — первый снизу)
  const CON = '#9ea2a0', COND = '#545a5a', CONL = '#d8dad4';

  function elephant(x, y, s, flip, t, blow) {                       // голова слона (бетон): уши, хобот, бивни
    push(x, y, s, 0, flip);
    for (const sd of [-1]) blob([[-10, -30], [-70, -60], [-90, 10], [-60, 60], [-14, 30]], { wash: CON, washA: 1, w: 2.2, col: COND, key: 7400 });
    const h = blob([[-30, -50], [20, -60], [50, -20], [44, 30], [10, 50], [-30, 30]], { wash: CON, washA: 1, w: 2.6, col: COND, key: 7401 }); shadeG(h.path, 50, 0, -30, 0, COND, 0.5);
    const tr = blob([[30, 20], [56, 60], [60, 110 - blow * 30], [80 + blow * 30, 140 - blow * 60], [70, 150 - blow * 50], [44, 116], [20, 40]], { wash: CON, washA: 1, w: 2.4, col: COND });
    for (let k = 0; k < 6; k++) pencil([[34 + k * 4, 50 + k * 14], [52 + k * 4, 46 + k * 14]], { w: 1.4, col: COND, a: 0.7, pass2: false });
    poly([[20, 36], [44, 70], [30, 40]], { wash: '#f0ece0', washA: 1, w: 1.6, col: COND }); ell(26, -16, 5, 4, { wash: '#2a2e2e', washA: 1, line: false });
    if (blow > 0.05) for (let k = 0; k < 5; k++) { const u = (t * 2 + k / 5) % 1; glow(80 + blow * 40 + u * 120, 150 - blow * 60 - u * 80, 18 + u * 30, 'rgba(240,244,250,1)', 0.6 * blow * (1 - u), 'source-over'); }
    pop();
  }
  function frog(x, y, s, t, k) { push(x, y, s); const b = blob([[-30, 0], [-26, -26], [0, -34], [26, -26], [30, 0]], { wash: CON, washA: 1, w: 2.2, col: COND, key: 7410 + k });
    for (const sd of [-1, 1]) { ell(sd * 14, -32, 9, 9, { wash: CONL, washA: 1, w: 1.8, col: COND }); ell(sd * 14, -32, 3, 3 * (Math.sin(t * 3 + k) > 0.95 ? 0.2 : 1), { wash: '#2a2e2e', washA: 1, line: false }); }
    pencil([[-16, -14], [0, -10], [16, -14]], { w: 1.8, col: COND, pass2: false }); for (const sd of [-1, 1]) blob([[sd * 26, 0], [sd * 44, -4], [sd * 46, 6], [sd * 24, 6]], { wash: CON, washA: 1, w: 1.6, col: COND }); pop(); }
  function catfish(x, y, s, flip) { push(x, y, s, 0, flip); blob([[-80, 0], [-30, -24], [40, -20], [70, 0], [40, 20], [-30, 20]], { wash: CON, washA: 1, w: 2.2, col: COND, key: 7420 });
    for (const sd of [-1, 1]) pencil([[60, sd * 6], [96, sd * 26], [110, sd * 22]], { w: 2.4, col: COND, pass2: false }); poly([[-80, 0], [-110, -26], [-104, 0], [-110, 24]], { wash: CON, washA: 1, w: 1.8, col: COND }); ell(48, -6, 3, 3, { wash: '#2a2e2e', washA: 1, line: false }); pop(); }
  function eagle(x, y, s) { push(x, y, s); blob([[-60, 0], [-40, -50], [-10, -30], [0, -60], [10, -30], [40, -50], [60, 0], [0, 20]], { wash: CON, washA: 1, w: 2, col: COND, key: 7430 }); poly([[0, -60], [12, -54], [0, -48]], { wash: '#c8a040', washA: 1, w: 1.2 }); pop(); }
  function house(t) {
    // стена
    const wall = shape([[HX0, GB], [HX0, fy(NF) - 20], [HX1, fy(NF) - 20], [HX1, GB]], { wash: '#b8b8b0', washA: 1, w: 3.2, col: '#3a3e3e', key: 7440 });
    hatch(wall.path, wall.bb, { gap: 8, a: 0.14, col: COND, ang: 1.45, key: 7441, w: 1.3 }); shadeG(wall.path, HX0, 0, HX0 + 200, 0, '#4a4e50', 0.35);
    // эркер-башня справа
    const ex = HX1 - 160; shape([[ex, GB], [ex, fy(NF) - 70], [HX1 + 30, fy(NF) - 70], [HX1 + 30, GB]], { wash: '#c4c4bc', washA: 1, w: 2.8, col: '#3a3e3e', key: 7442 });
    blob([[ex - 10, fy(NF) - 70], [ex + 95, fy(NF) - 190], [HX1 + 40, fy(NF) - 70]], { wash: '#4e5e5a', washA: 1, w: 2.6, col: '#1e2a28' });
    // крыша
    shape([[HX0 - 20, fy(NF) - 20], [HX0 + 60, fy(NF) - 110], [ex, fy(NF) - 110], [ex, fy(NF) - 20]], { wash: '#566a64', washA: 1, w: 2.6, col: '#1e2a28', key: 7443 });
    // этажи, окна
    for (let i = 0; i < NF; i++) { const y0 = fy(i + 1), y1 = fy(i); pencil([[HX0, y1 - 4], [HX1 + 30, y1 - 4]], { w: 4, col: '#7a7e7a', pass2: false });
      for (let j = 0; j < 4; j++) { const x = HX0 + 50 + j * 100, w = 60, h = FT * 0.58, y = y0 + 34; const wp = blob([[x, y + h], [x, y + 16], [x + w / 2, y - 6], [x + w, y + 16], [x + w, y + h]], { wash: '#3a4652', washA: 1, w: 2.2, col: '#1e2428' });
        ctx.save(); ctx.clip(wp.path); const lit = (i * 3 + j) % 5 === 0; ctx.fillStyle = lit ? 'rgba(255,214,140,0.7)' : 'rgba(200,220,235,0.25)'; ctx.fillRect(x, y - 10, w, h + 20); ctx.restore(); pencil([[x + w / 2, y - 4], [x + w / 2, y + h]], { w: 2, col: '#e8e4dc', pass2: false }); }
      for (let j = 0; j < 2; j++) rect(ex + 26 + j * 60, y0 + 40, 40, FT * 0.5, { wash: '#3a4652', washA: 1, w: 2, col: '#1e2428' });
      if (i === 3 || i === 5) { rect(HX0 + 30, y1 - 22, 420, 14, { wash: CONL, washA: 1, w: 2, col: COND }); for (let q = 0; q < 14; q++) pencil([[HX0 + 40 + q * 30, y1 - 22], [HX0 + 40 + q * 30, y1 - 58]], { w: 3, col: '#4a4e4e', pass2: false }); pencil([[HX0 + 30, y1 - 60], [HX0 + 450, y1 - 60]], { w: 4, col: '#4a4e4e', pass2: false }); }
    }
    // химеры
    const blow = t > EV.chim_six ? Math.sin(clamp((t - EV.chim_six) / 0.8) * Math.PI) : 0;
    elephant(HX0 + 10, fy(NF) - 40, 0.9, -1, t, 0); elephant(ex - 6, fy(NF) - 40, 0.9, 1, t, blow);
    for (let k = 0; k < 4; k++) frog(HX0 + 120 + k * 110, fy(NF) - 112, 0.7, t, k);
    catfish(HX0 + 240, fy(4) + 10, 0.7, 1); catfish(HX0 + 320, fy(2) + 10, 0.7, -1); eagle(HX1 - 40, fy(3) - 10, 0.7);
    // нос��рог над входом снизу
    push(HX0 + 300, fy(1) - 10, 0.8); blob([[-60, 0], [-40, -40], [40, -44], [70, -20], [80, 10], [-40, 14]], { wash: CON, washA: 1, w: 2.2, col: COND, key: 7450 }); poly([[70, -20], [100, -60], [84, -14]], { wash: CONL, washA: 1, w: 1.8, col: COND }); ell(40, -24, 3, 3, { wash: '#2a2e2e', washA: 1, line: false }); pop();
    // дверь внизу
    blob([[HX0 + 270, GB], [HX0 + 270, GB - 110], [HX0 + 305, GB - 140], [HX0 + 340, GB - 110], [HX0 + 340, GB]], { wash: '#4a3020', washA: 1, w: 2.4, col: '#1e140c' });
  }
  function slope(t) {                                                // склон: земля перекрывает нижние этажи слева, верхняя улица
    const P = [[-400, GT], [HX0 + 30, GT], [HX0 + 140, GT + 60], [HX1 - 60, GB - 40], [HX1 + 200, GB], [1500, GB], [1500, 2600], [-400, 2600]];
    const p = shape(P, { wash: '#8a7a56', washA: 1, w: 3, col: '#2a2214', key: 7460 }); hatch(p.path, p.bb, { gap: 9, a: 0.2, col: '#3a2e1a', ang: -0.6, key: 7461 });
    const r = rng(7462); for (let k = 0; k < 26; k++) { const u = r(), x = lerp(HX0 + 160, HX1 - 40, u), y = lerp(GT + 80, GB - 30, u) + 20 + r() * 80; pencil([[x, y], [x + 8, y - 26 - r() * 20]], { w: 2.4, col: '#5a6a34', a: 0.9, pass2: false }); }
    // мостовая верхней улицы (Банковая) и фонарь
    rect(-400, GT - 14, HX0 + 400, 18, { wash: '#6a6258', washA: 1, w: 2, col: '#2a2214' }); for (let x = -380; x < HX0; x += 30) pencil([[x, GT - 12], [x + 12, GT + 2]], { w: 1.4, col: '#3a342c', a: 0.6, pass2: false });
    pencil([[40, GT - 14], [40, GT - 260]], { w: 6, col: '#2a2a2a' }); poly([[24, GT - 300], [56, GT - 300], [50, GT - 260], [30, GT - 260]], { wash: '#fff0c0', washA: 0.9, w: 2, col: '#2a2a2a' });
    // площадь внизу
    rect(HX1 - 60, GB - 4, 1000, 20, { wash: '#7a7066', washA: 1, w: 2, col: '#2a2214' });
    // табличка «негоден»
    if (t > EV.chim_cliff - 0.05) { const k = popK(t, EV.chim_cliff, 0.4), sx = HX1 - 220, sy = GB - 210;
      pencil([[sx, sy + 120], [sx + 4, sy - 10]], { w: 6, col: '#5a3a1a' }); push(sx, sy - 40, k, -0.12);
      rect(-120, -50, 240, 100, { wash: '#efe2c0', washA: 1, w: 2.6, col: '#3a2410' }); txt('УЧАСТОК', 0, -18, 30, { font: 'Osw', col: '#2a1a0a' }); txt('НЕГОДЕН!', 0, 22, 36, { font: 'Osw', col: '#a8241e' }); pop(); }
  }
  function counter(t, side) {                                        // крупные цифры этажей рядом с фасадом
    const top = side < 0, t0 = top ? EV.chim_top : EV.chim_down, n = top ? 3 : 6, dt = top ? 0.22 : 0.12;
    for (let i = 0; i < n; i++) { const ti = t0 + i * dt; if (t < ti) continue; const k = popK(t, ti, 0.3), y = top ? fy(NF - 1 - i) + FT / 2 : fy(i) + FT / 2 - 10, x = top ? HX0 - 70 : HX1 - 70;
      push(x, y, k); ell(0, 0, 40, 40, { wash: top ? '#f6ecd6' : K.amber, washA: 0.95, w: 3, col: '#1a120c' }); txt(String(i + 1), 0, 2, 50, { font: 'Osw', col: '#1a120c' }); pop(); }
  }

  function cloudC(x, y, w, h, seed) { const r = rng(seed); for (let k = 0; k < 6; k++) ell(x + (k - 2.5) * w / 6 + (r() - 0.5) * 20, y - Math.sin(k / 5 * Math.PI) * h * 0.5, w * 0.17 + r() * 16, h * 0.42, { wash: '#fbf8f0', washA: 0.8, w: 1.2, col: '#a8a8a0', a: 0.3 }); }
  function townhouse(x, base, w, h, c, seed, t) {                    // доходный дом 1900-х: карниз, окна с наличниками, балкон, крыша с трубами
    const r = rng(seed); rect(x, base - h, w, h, { wash: c, washA: 1, w: 2, col: '#3a3830', key: 7480 + seed }); rect(x - 8, base - h - 16, w + 16, 16, { wash: lerpC(c, '#ffffff', 0.3), washA: 1, w: 1.6, col: '#3a3830' });
    poly([[x - 4, base - h - 16], [x + w / 2, base - h - 60], [x + w + 4, base - h - 16]], { wash: '#6a6e6a', washA: 1, w: 1.8, col: '#2a2a2a' }); rect(x + w * 0.7, base - h - 70, 14, 40, { wash: '#8a5a4a', washA: 1, w: 1.4 });
    const nf = Math.floor(h / 90), nw = Math.max(2, Math.floor(w / 60)); for (let i = 0; i < nf; i++) for (let j = 0; j < nw; j++) { const wx = x + 16 + j * (w - 32) / nw, wy = base - h + 24 + i * 90, ww = (w - 32) / nw - 18;
      rect(wx, wy, ww, 54, { wash: (i + j + seed) % 4 ? '#5a6a7a' : '#ffd890', washA: 1, w: 1.4, col: '#2a2a2a' }); pencil([[wx - 4, wy - 4], [wx + ww + 4, wy - 4]], { w: 3, col: lerpC(c, '#ffffff', 0.4), pass2: false }); }
    if (h > 200) { rect(x + w * 0.3, base - h + 108, w * 0.4, 8, { wash: '#4a4a4a', washA: 1, w: 1 }); for (let q = 0; q < 6; q++) pencil([[x + w * 0.3 + q * w * 0.08, base - h + 108], [x + w * 0.3 + q * w * 0.08, base - h + 90]], { w: 1.6, col: '#4a4a4a', pass2: false }); }
  }
  function cab(x, y, t) {                                            // извозчик на Банковой
    push(x, y, 0.8); const ph = t * 7; for (let k = 0; k < 4; k++) { const lx = 60 + k * 26, sw = Math.sin(ph + k * 1.5) * 12; pencil([[lx, -80], [lx + sw, -10]], { w: 8, col: '#3a2a1a' }); }
    blob([[40, -130], [160, -130], [170, -80], [40, -80]], { wash: '#4a3020', washA: 1, w: 2, col: '#1a0e06' }); blob([[160, -130], [200, -180], [220, -160], [180, -110]], { wash: '#4a3020', washA: 1, w: 2, col: '#1a0e06' });
    blob([[-120, -60], [20, -60], [30, -130], [-100, -150]], { wash: '#1e2a3a', washA: 1, w: 2, col: '#0a0e14' }); pencil(ellPts(-60, -30, 30, 30, 0, 0.05, 24), { w: 4, col: '#2a2a2a', pass2: false }); pencil(ellPts(10, -30, 26, 26, 0, 0.05, 24), { w: 4, col: '#2a2a2a', pass2: false });
    human(-10, -140, 0.4, t, { body: '#2a2a3a', hat: 'cap', hatCol: '#2a2a2a', beard: 'long', hair: '#3a2a1a', armR: 'hold', seed: 81 }); pop();
  }
  function slopeTrees(t) { for (const [x, y, s_] of [[620, 1300, 0.9], [700, 1380, 0.7], [520, 1200, 0.8]]) { push(x, y, s_); pencil([[0, 0], [4, -120]], { w: 12, col: '#4a3222' }); for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.1 + 0.8 * k / 6); blob(ellPts(Math.cos(a) * 60, -150 + Math.sin(a) * 50, 46, 38, k, 0, 10), { wash: ['#5a7a3a', '#6a8a42', '#4a6a30'][k % 3], washA: 0.96, w: 1.4, col: '#1e3414' }); } pop(); } }

  WORLD.chimera = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1500, ['#b8c8d8', '#e6e2d8', '#e8dcc4']); glow(800, 300, 500, 'rgba(255,246,220,1)', 0.4); cloudC(300, 360, 420, 110, 7491); cloudC(900, 480, 300, 80, 7492);
      for (let k = 0; k < 4; k++) { const x = 200 + k * 130 + t * 25, y = 520 + Math.sin(t * 2 + k) * 20, f = Math.sin(t * 8 + k) * 8; pencil([[x - 14, y - f], [x, y], [x + 14, y - f]], { w: 2.4, col: '#3a3a3a', pass2: false }); } });
    lay(10, () => { for (let k = 0; k < 9; k++) { const x = 820 + k * 90, h = 160 + (k * 53) % 130; rect(x, 1260 - h, 80, h + 200, { wash: '#b0aca0', washA: 1, w: 1.4, col: '#4a4840', a: 0.5 }); for (let q = 0; q < 3; q++) rect(x + 14 + q * 20, 1280 - h, 12, 18, { wash: '#7a8a9a', washA: 0.8, line: false }); }
      sil([[900, 1100], [905, 900], [915, 900], [920, 1100]], '#9a9a90', 1); haze('#e0dccc', 0.28); });
    lay(2.2, () => { townhouse(-380, GT, 220, 340, '#d8c8a8', 1, t); townhouse(-150, GT, 200, 300, '#c8b0a0', 2, t); townhouse(860, GB, 240, 520, '#d0c0a0', 3, t); townhouse(1100, GB, 200, 440, '#bca890', 4, t); });
    lay(1, () => { house(t); slope(t);
      { const sx0 = HX0 + 170, sy0 = GT + 80, sx1 = HX1 - 30, sy1 = GB - 30, n = 16; for (let i = 0; i < n; i++) { const u0 = i / n, x = lerp(sx0, sx1, u0), y = lerp(sy0, sy1, u0), dx = (sx1 - sx0) / n, dy = (sy1 - sy0) / n;
        poly([[x - 40, y], [x + dx - 40, y], [x + dx - 40, y + dy], [x + dx + 40, y + dy], [x + 40, y], [x - 40, y]], { wash: '#b8b0a0', washA: 1, w: 1.4, col: '#4a4438' }); }
        pencil([[sx0 + 40, sy0 - 50], [sx1 + 40, sy1 - 50]], { w: 3, col: '#3a3a3a', pass2: false }); for (let i = 0; i <= 8; i++) { const x = lerp(sx0 + 40, sx1 + 40, i / 8), y = lerp(sy0 - 50, sy1 - 50, i / 8); pencil([[x, y], [x, y + 50]], { w: 2.4, col: '#3a3a3a', pass2: false }); } }
      { const r = rng(7495); for (let k = 0; k < 14; k++) { const u = r(), x = lerp(HX0 + 200, HX1 - 80, u) + (r() - 0.5) * 120, y = lerp(GT + 120, GB - 40, u) + 40 + r() * 60; blob(ellPts(x, y, 26 + r() * 18, 16 + r() * 8, 0, 0, 10), { wash: ['#5a7a3a', '#6a8a42'][k % 2], washA: 1, w: 1.4, col: '#1e3414' }); if (k % 3 === 0) ell(x + 6, y - 8, 4, 4, { wash: '#f0d040', washA: 1, line: false }); } }
      slopeTrees(t); cab(Math.min(-60, -260 + (t - S0.chimera) * 70), GT - 14, t);
      human(-40, GT - 10, 0.55, t, { body: '#4a3a5a', hat: 'merchant', hatCol: '#2a2a2a', face: 'shock', look: 0.8, armR: 'point', seed: 82 }); human(20, GT - 10, 0.52, t, { body: '#c8a8a0', hat: 'scarf', hatCol: '#8a2a3a', face: 'smile', seed: 83, long: 1 });
      human(820, GB, 0.62, t, { body: '#3a4a3a', hat: 'cap', hatCol: '#3a3a3a', face: t > EV.chim_down ? 'shock' : 'calm', look: -0.8, armL: t > EV.chim_down ? 'up' : 'down', seed: 84 });
      if (t > EV.chim_top) counter(t, -1); if (t > EV.chim_down) counter(t, 1); cat(); });
  };
  DIR.chimera = {
    outfit: 'architect', light: { side: -1, rim: '#fff4dc' }, grade: ['#6a7a8a', 0.12],
    act: () => [[S0.chimera, 'proud'], [EV.chim_cliff + 0.05, 'laugh'], [EV.chim_top, 'smug'], [EV.chim_down, 'awe'], [EV.chim_six, 'shock']],
    pose: (t, u, b) => Object.assign(b, {
      x: 985, y: GB + 10, s: 0.95, look: t > EV.chim_down ? [-0.5, -0.7] : [-0.5, -0.2], prop: 'blueprint', propAng: -0.4,
      hand: t > EV.chim_top && t < EV.chim_down ? [-140, -380] : undefined, point: t > EV.chim_top && t < EV.chim_down ? 1 : undefined, tilt: t > EV.chim_down ? -0.08 : 0, tailUp: t > EV.chim_six
    }),
    cam: () => [[S0.chimera, 360, 1000, 0.12], [EV.chim_top, 380, 900, 0.14], [EV.chim_down - 0.05, 400, 930, 0.12], [EV.chim_down + 0.5, 600, 1080, 0.02, 'x'], [EV.chim_six + 0.2, 560, 1040, 0.0], [S1.chimera, 560, 1030, 0.04]],
    hud: t => { if (t > EV.chim_six && t < S1.chimera) { const k = popK(t, EV.chim_six, 0.35); push(540, 560, k, -0.05); ctx.save(); ctx.font = '600 70px Osw'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(16,10,8,0.9)'; ctx.strokeText('3 СВЕРХУ = 6 СНИЗУ', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('3 СВЕРХУ = 6 СНИЗУ', 0, 0); ctx.restore(); pop(); } }
  };
  // ---------------------------------------------------------------- переход В сцену: вихрь от винта сдувает кадр
  TRANS_IN.chimera = { a: 0.2, b: 0.34, runA: 1, fx(k, t, A, B) {
    const q = sm(k); drawBuf(B, 1.06 - 0.06 * q);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(q * W * 1.15 - 120, 0, W * 1.3, H); ctx.clip(); smear(A, 140 * q, -40 * q, 5, q * W * 0.2); ctx.restore();
    scr(() => { const r = rng(hsh(FRAME, 31)); for (let i = 0; i < 40; i++) { const y = r() * H, x = q * W * 1.15 - 120 + r() * 200, L = 200 + r() * 500; pencil([[x - L, y + Math.sin(i) * 20], [x - L * 0.5, y - 10], [x, y + 6]], { w: 2 + r() * 3, col: i % 4 ? '#f4efe2' : '#c8b896', a: 0.7, pass2: false }); }
      for (let i = 0; i < 18; i++) { const r2 = rng(i * 7 + 2), x = q * W * 1.15 - 160 + r2() * 260, y = r2() * H; push(x, y, 1, t * 9 + i); pencil([[-12, 0], [0, -5], [12, 2]], { w: 4, col: '#e8cf98', a: 0.9, pass2: false }); pop(); } });
  } };
})();
