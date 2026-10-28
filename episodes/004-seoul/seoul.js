/* 004 Сеул — общие детали всех сцен («одно место сквозь века»: дворец Кёнбоккун и гора Пугаксан за ним).
   bugak — гора Пугаксан с хребтами Пукхансана; koRoof — корейская кровля с поднятыми углами; koHall — павильон на каменном цоколе;
   gwanghwamun — ворота Кванхвамун; haetae — каменный страж; pine — корейская красная сосна; silkLantern — шёлковый фонарь; taeguk — флаг Кореи (общие neon/cityBlock/crowd/wtk/puffK — в props.js). */

const KO = { roof: '#3b3e46', roofD: '#1c1e24', roofL: '#6a6e78', col: '#a8322a', colD: '#5a1410', green: '#2f7d6d', greenL: '#5fb09a', stone: '#b8b2a4', stoneD: '#6e685c', paper: '#efe4c6' };

function bugak(y, s, o = {}) {                                        // гора Пугаксан (по центру) + Инвансан слева + зубцы Пукхансана за ними
  const far = o.far || '#9aa6b8', mid = o.mid || '#6f7d72', near = o.near || '#556650', rock = o.rock || '#d8d2c4', a = o.a ?? 1;
  const X = x => 540 + (x - 540) * s, Y = v => y - v * s;
  // дальний Пукхансан: три гранитных зуба (Пэгундэ, Инсубон, Мангёндэ)
  const F = [[-900, 0], [-500, 120], [-200, 220], [80, 300], [200, 470], [250, 430], [300, 560], [350, 480], [420, 520], [470, 430], [600, 380], [800, 300], [1100, 200], [1500, 90], [2000, 0]];
  const fp = shape(F.map(([a_, b_]) => [X(a_), Y(b_)]).concat([[X(2000), Y(-400)], [X(-900), Y(-400)]]), { wash: far, washA: a, w: 2, col: '#3a4250', a: 0.35 * a, key: 9100 });
  hatch(fp.path, fp.bb, { gap: 9, a: 0.08 * a, col: '#2a3240', ang: 1.1, key: 9101, w: 1.2 });
  for (const [px, py] of [[200, 470], [300, 560], [420, 520]]) pencil([[X(px - 30), Y(py - 60)], [X(px), Y(py)], [X(px + 26), Y(py - 70)]], { w: 2.4, col: '#f0ece2', a: 0.45 * a, pass2: false });
  // Инвансан слева — скалистый, с гранитными «лбами»
  const I = [[-900, -10], [-600, 120], [-380, 250], [-260, 330], [-170, 300], [-90, 200], [20, 120], [160, 40], [300, -10]];
  const ip = shape(I.map(([a_, b_]) => [X(a_), Y(b_)]).concat([[X(300), Y(-400)], [X(-900), Y(-400)]]), { wash: mid, washA: a, w: 2.2, col: '#2a3428', a: 0.45 * a, key: 9102 });
  for (const [cx, cy, rx, ry] of [[-280, 290, 70, 40], [-180, 250, 50, 34], [-360, 220, 60, 30]]) { const r = ell(X(cx), Y(cy), rx * s, ry * s, { wash: rock, washA: 0.9 * a, w: 1.6, col: '#5a5448', a: 0.5 * a }); hatch(r.path, r.bb, { gap: 5, a: 0.18 * a, col: '#5a5448', ang: 1.4, w: 1 }); }
  // Пугаксан: округлый гранитный купол прямо за дворцом
  const B = [[100, -10], [250, 120], [360, 250], [450, 340], [540, 372], [630, 340], [720, 250], [830, 140], [980, 60], [1200, 0], [1500, -10]];
  const bp = shape(spline(B.map(([a_, b_]) => [X(a_), Y(b_)]), false, 6).concat([[X(1500), Y(-400)], [X(100), Y(-400)]]), { wash: near, washA: a, w: 2.6, col: '#1e2a1a', a: 0.55 * a, key: 9103 });
  hatch(bp.path, bp.bb, { gap: 7, a: 0.12 * a, col: '#1e2a1a', ang: 0.9, key: 9104, w: 1.2 });
  blob([[X(490), Y(330)], [X(540), Y(356)], [X(592), Y(330)], [X(580), Y(270)], [X(530), Y(250)], [X(486), Y(285)]], { wash: rock, washA: 0.45 * a, line: false });
  for (let k = 0; k < 7; k++) pencil([[X(485 + k * 16), Y(320 - (k % 2) * 8)], [X(480 + k * 17), Y(240 + k % 3 * 6)]], { w: 1.4, col: '#6a6458', a: 0.5 * a, pass2: false });
  // сосны точками по склонам
  const r = rng(9105 + (o.seed || 0));
  for (let k = 0; k < 70; k++) { const xx = 140 + r() * 1200, top = xx < 540 ? 372 - (540 - xx) * 0.9 : 372 - (xx - 540) * 0.62, yy = top - 30 - r() * 260; if (yy < -20 || xx > 1300) continue;
    ell(X(xx), Y(yy), (7 + r() * 8) * s, (5 + r() * 5) * s, { wash: r() < 0.5 ? '#2c4a2c' : '#3a5a32', washA: 0.85 * a, line: false }); }
}

function koRoof(x, y, w, h, o = {}) {                                 // кровля пхальджак: изогнутый свес с поднятыми углами, черепица, конёк, данчхон под свесом
  const c = o.col || KO.roof, cD = o.colD || KO.roofD, cL = o.colL || KO.roofL, lt = o.light ?? 1;
  const L = x - w / 2, R = x + w / 2, up = h * (o.up ?? 0.34);
  const eave = spline([[L - w * 0.04, y - up], [L + w * 0.1, y - h * 0.03], [x, y + h * 0.02], [R - w * 0.1, y - h * 0.03], [R + w * 0.04, y - up]], false, 8);
  const ridgeL = L + w * (o.ridge ?? 0.24), ridgeR = R - w * (o.ridge ?? 0.24);
  const P = eave.concat([[ridgeR + w * 0.02, y - h * 0.92], [ridgeR, y - h], [ridgeL, y - h], [ridgeL - w * 0.02, y - h * 0.92]]);
  if (o.dan !== false) { const D = eave.map(([a, b]) => [a, b]).concat(eave.slice().reverse().map(([a, b]) => [a + (a - x) * -0.02, b + h * 0.16])); const dp = shape(D, { wash: KO.green, washA: lt, w: 1.6, col: '#0e2a22', a: 0.6 });
    ctx.save(); ctx.clip(dp.path); for (let xx = L; xx < R; xx += Math.max(10, w * 0.035)) { ell(xx, y + h * 0.08, w * 0.008 + 2, h * 0.05, { wash: '#e8783a', washA: 0.85 * lt, line: false }); ell(xx + w * 0.017, y + h * 0.08, 2, h * 0.04, { wash: '#f4e8c8', washA: 0.8 * lt, line: false }); } ctx.restore(); }
  const rp = shape(P, { wash: c, washA: 1, w: 2.4, col: '#0e0e12', a: 0.85, key: o.key || 9110 });
  ctx.save(); ctx.clip(rp.path); const n = Math.max(8, Math.round(w / 22));
  for (let i = 0; i <= n; i++) { const f = i / n, bx = lerp(L - w * 0.03, R + w * 0.03, f), tx = lerp(ridgeL, ridgeR, f); pencil([[tx, y - h], [bx, y + h * 0.05]], { w: Math.max(1.2, w / 260), col: i % 2 ? cD : cL, a: 0.55, pass2: false, gap: false }); }
  const g = ctx.createLinearGradient(0, y - h, 0, y); g.addColorStop(0, 'rgba(255,255,255,0.12)'); g.addColorStop(1, 'rgba(0,0,0,0.3)'); ctx.fillStyle = g; ctx.fillRect(L - w, y - h * 1.1, w * 3, h * 1.3); ctx.restore();
  pencil(eave, { w: Math.max(2.4, w / 120), col: '#eae4d6', a: 0.75 * lt, pass2: false });                 // светлые торцы черепицы
  pencil([[ridgeL - w * 0.05, y - h * 1.04], [ridgeL, y - h - h * 0.02], [ridgeR, y - h - h * 0.02], [ridgeR + w * 0.05, y - h * 1.04]], { w: Math.max(4, w / 45), col: cD, pass2: false });
  pencil([[ridgeL, y - h - h * 0.02], [ridgeR, y - h - h * 0.02]], { w: Math.max(1.6, w / 200), col: '#eae4d6', a: 0.6 * lt, pass2: false });
  if (o.figures) for (const sd of [-1, 1]) for (let k = 0; k < 4; k++) { const fx = (sd < 0 ? L + w * 0.03 : R - w * 0.03) - sd * k * w * 0.025, fy = y - up * (1 - k * 0.12) - h * 0.06; ell(fx, fy, w * 0.006 + 1.5, h * 0.05, { wash: cD, washA: 1, line: false }); }
  return rp;
}

function koHall(x, base, w, h, t, o = {}) {                           // павильон: каменный цоколь, красные колонны, решётчатые двери, данчхон, кровля
  const ph = h * 0.16, colH = h * 0.42, top = base - ph - colH, lt = o.light ?? 1;
  const pl = rect(x - w / 2 - w * 0.03, base - ph, w * 1.06, ph, { wash: KO.stone, washA: 1, w: 1.8, col: '#3a362e', a: 0.7 });
  hatch(pl.path, pl.bb, { gap: 6, a: 0.12, col: '#3a362e', ang: 0.1, w: 1 }); for (let k = 1; k < 3; k++) pencil([[x - w / 2 - w * 0.03, base - ph * k / 3], [x + w / 2 + w * 0.03, base - ph * k / 3]], { w: 1.2, col: '#5a5448', a: 0.5, pass2: false });
  if (o.steps !== false) { const sw = w * 0.18; for (let k = 0; k < 4; k++) rect(x - sw / 2 - k * 4, base - ph + k * ph / 4, sw + k * 8, ph / 4, { wash: '#c8c2b4', washA: 1, w: 1.2, col: '#4a463e', a: 0.6 }); }
  const n = o.bays || 5, bw = w / n;
  rect(x - w / 2, top, w, colH, { wash: o.wall || '#c9b48a', washA: 1, w: 1.6, col: '#3a2a1a', a: 0.6 });
  for (let i = 0; i < n; i++) { const bx = x - w / 2 + i * bw;
    const dp = rect(bx + bw * 0.1, top + colH * 0.12, bw * 0.8, colH * 0.86, { wash: o.lit ? '#f6d48a' : KO.paper, washA: 1, w: 1.4, col: '#4a2a14', a: 0.7 });
    if (o.lit) glow(bx + bw / 2, top + colH * 0.55, bw * 0.9, 'rgba(255,200,110,1)', 0.35 * o.lit);
    ctx.save(); ctx.clip(dp.path); for (let gx = bx + bw * 0.1; gx < bx + bw * 0.9; gx += Math.max(4, bw * 0.08)) pencil([[gx, top], [gx, top + colH]], { w: 1, col: '#7a4a24', a: 0.55, pass2: false, gap: false });
    for (let gy = top + colH * 0.12; gy < top + colH; gy += Math.max(4, bw * 0.08)) pencil([[bx, gy], [bx + bw, gy]], { w: 1, col: '#7a4a24', a: 0.55, pass2: false, gap: false }); ctx.restore(); }
  for (let i = 0; i <= n; i++) { const cx = x - w / 2 + i * bw, cw = Math.max(4, bw * 0.1); const cp = rect(cx - cw / 2, top, cw, colH, { wash: KO.col, washA: 1, w: 1.4, col: '#2a0a06', a: 0.8 }); shadeG(cp.path, cx + cw, 0, cx - cw, 0, KO.colD, 0.6); }
  const bd = rect(x - w / 2 - w * 0.02, top - h * 0.08, w * 1.04, h * 0.08, { wash: KO.green, washA: lt, w: 1.4, col: '#0e2a22', a: 0.7 });
  for (let xx = x - w / 2; xx < x + w / 2; xx += Math.max(8, w * 0.04)) { ell(xx, top - h * 0.04, Math.max(2, w * 0.008), h * 0.025, { wash: '#e8783a', washA: 0.8 * lt, line: false }); ell(xx + w * 0.02, top - h * 0.04, Math.max(1.5, w * 0.005), h * 0.02, { wash: '#2a4aa8', washA: 0.7 * lt, line: false }); }
  if (o.two) { const t2 = top - h * 0.08; koRoof(x, t2 + h * 0.02, w * 1.28, h * 0.26, { up: 0.3, light: lt, key: (o.key || 9120) + 1 }); rect(x - w * 0.36, t2 - h * 0.34, w * 0.72, h * 0.2, { wash: '#c9b48a', washA: 1, w: 1.4, col: '#3a2a1a', a: 0.6 });
    for (let i = 0; i <= 6; i++) rect(x - w * 0.36 + i * w * 0.12 - 2, t2 - h * 0.34, 4, h * 0.2, { wash: KO.col, washA: 1, line: false });
    rect(x - w * 0.38, t2 - h * 0.38, w * 0.76, h * 0.05, { wash: KO.green, washA: lt, w: 1.2, col: '#0e2a22', a: 0.6 });
    koRoof(x, t2 - h * 0.37, w * 1.0, h * 0.34, { up: 0.34, light: lt, figures: 1, key: (o.key || 9120) + 2 }); }
  else koRoof(x, top - h * 0.07, w * 1.3, h * 0.42, { up: 0.34, light: lt, figures: o.figures, key: o.key || 9120 });
  if (o.sign) { rect(x - w * 0.09, top - h * 0.1 - (o.two ? h * 0.3 : 0), w * 0.18, h * 0.08, { wash: '#1a1a20', washA: 1, w: 1.4, col: '#d6a842' }); txt(o.sign, x, top - h * 0.06 - (o.two ? h * 0.3 : 0), Math.max(10, h * 0.055), { font: 'KSign', col: '#f2d27a', bold: false }); }
  return top;
}

function gwanghwamun(x, base, s, t, o = {}) {                          // ворота Кванхвамун: гранитный цоколь с тремя арками + двухъярусный павильон
  const w = 640 * s, h = 190 * s, lt = o.light ?? 1;
  const bp = shape([[x - w / 2, base], [x - w / 2 + 10 * s, base - h], [x + w / 2 - 10 * s, base - h], [x + w / 2, base]], { wash: o.stone || '#bdb6a6', washA: 1, w: 2, col: '#3a362e', a: 0.8, key: 9130 });
  ctx.save(); ctx.clip(bp.path); const r = rng(9131);
  for (let yy = base; yy > base - h; yy -= 24 * s) { const row = Math.round((base - yy) / (24 * s)); pencil([[x - w, yy], [x + w, yy]], { w: 1.2, col: '#6a6458', a: 0.55, pass2: false, gap: false });
    for (let xx = x - w / 2 + (row % 2) * 30 * s; xx < x + w / 2; xx += 60 * s) pencil([[xx, yy], [xx, yy - 24 * s]], { w: 1, col: '#6a6458', a: 0.45, pass2: false, gap: false });
    for (let k = 0; k < 6; k++) ell(x - w / 2 + r() * w, yy - r() * 24 * s, 6 * s, 3 * s, { wash: r() < 0.5 ? '#a8a294' : '#cfc8b8', washA: 0.5, line: false }); }
  ctx.restore();
  for (const [ax, aw] of [[-200, 70], [0, 92], [200, 70]]) { const cx = x + ax * s, ah = (aw + 46) * s, A = [[cx - aw * s, base]].concat(ellPts(cx, base - ah + aw * s, aw * s, aw * s, 0, 0, 24).filter(p => p[1] <= base - ah + aw * s + 1).sort((p, q) => p[0] - q[0])).concat([[cx + aw * s, base]]);
    const ap = shape(A, { wash: o.archLit ? '#f2c87a' : '#1a1410', washA: 1, w: 2.4, col: '#2a2620', key: 9132 + ax }); if (o.archLit) glow(cx, base - ah * 0.4, aw * 2 * s, 'rgba(255,200,120,1)', 0.45 * o.archLit);
    pencil(ellPts(cx, base - ah + aw * s, aw * s + 8 * s, aw * s + 8 * s, 0, 0, 30).filter(p => p[1] <= base - ah + aw * s + 1), { w: 2, col: '#5a5448', a: 0.7, pass2: false }); }
  rect(x - w / 2 + 6 * s, base - h - 8 * s, w - 12 * s, 10 * s, { wash: '#8a8478', washA: 1, w: 1.2, col: '#3a362e', a: 0.6 });
  for (let xx = x - w / 2 + 20 * s; xx < x + w / 2 - 10 * s; xx += 22 * s) rect(xx, base - h - 22 * s, 14 * s, 14 * s, { wash: '#9a9488', washA: 1, w: 1, col: '#3a362e', a: 0.5 });
  koHall(x, base - h - 4 * s, w * 0.56, 330 * s, t, { two: 1, bays: 3, steps: false, light: lt, lit: o.lit, sign: o.sign === false ? null : '광화문', key: 9140 });
}

function haetae(x, y, s, flip = 1, o = {}) {                           // хэтэ: каменный лев-страж с рогом на постаменте
  push(x, y, s, 0, flip); const c = o.col || '#b9b2a2', cD = '#5e584c';
  const ped = rect(-70, -60, 140, 60, { wash: '#a8a294', washA: 1, w: 2, col: '#2e2a24', a: 0.8 }); hatch(ped.path, ped.bb, { gap: 6, a: 0.18, col: cD, ang: 0.2, w: 1 });
  const body = blob([[-58, -60], [-62, -120], [-40, -170], [10, -186], [44, -150], [52, -100], [56, -60]], { wash: c, washA: 1, w: 2.4, col: '#2e2a24', key: 9150 }); shadeG(body.path, 60, 0, -40, 0, cD, 0.45);
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.42; ell(10 + Math.cos(a) * 52, -190 + Math.sin(a) * 44, 13, 11, { wash: '#aaa392', washA: 1, w: 1.4, col: '#2e2a24', a: 0.7 }); }
  const hd = blob([[-26, -186], [-20, -240], [20, -262], [56, -244], [66, -206], [44, -180], [0, -174]], { wash: c, washA: 1, w: 2.4, col: '#2e2a24', key: 9151 }); shadeG(hd.path, 70, 0, -10, 0, cD, 0.4);
  ell(28, -224, 9, 8, { wash: '#f2ece0', washA: 1, w: 1.6, col: '#2e2a24' }); ell(31, -223, 4, 4, { wash: '#1a1612', washA: 1, line: false }); ell(54, -222, 7, 7, { wash: '#f2ece0', washA: 1, w: 1.4, col: '#2e2a24' });
  pencil([[30, -200], [46, -192], [62, -198]], { w: 2.4, col: '#2e2a24', pass2: false }); for (const tx of [38, 52]) poly([[tx - 3, -196], [tx + 3, -196], [tx, -186]], { wash: '#f2ece0', washA: 1, w: 1, col: '#2e2a24' });
  poly([[8, -258], [18, -260], [12, -290]], { wash: '#a8a294', washA: 1, w: 1.6, col: '#2e2a24' });
  for (const lx of [-40, 30]) { rect(lx - 12, -100, 26, 40, { wash: c, washA: 1, w: 1.8, col: '#2e2a24', a: 0.8 }); for (let q = 0; q < 3; q++) pencil([[lx - 8 + q * 7, -62], [lx - 8 + q * 7, -70]], { w: 1.6, col: '#2e2a24', pass2: false }); }
  pencil(spline([[-56, -110], [-90, -150], [-80, -190], [-60, -180]], false, 8), { w: 9, col: c }); pencil(spline([[-56, -110], [-90, -150], [-80, -190], [-60, -180]], false, 8), { w: 2, col: '#2e2a24', a: 0.6, pass2: false });
  pop();
}

function pine(x, y, h, t, seed = 1, o = {}) {                          // красная корейская сосна: изогнутый ствол, плоские «облака» хвои
  const r = rng(9160 + seed), sw = Math.sin(t * 0.8 + seed) * h * 0.006;
  const T = spline([[x, y], [x + h * 0.08 * (r() - 0.3), y - h * 0.35], [x - h * 0.06, y - h * 0.62], [x + h * 0.1 + sw, y - h * 0.95]], false, 8);
  shape(tubeP(T, h * 0.07, h * 0.03), { wash: o.trunk || '#a8563a', washA: 1, w: 1.8, col: '#2a120a', a: 0.8 });
  pencil(T.map(([a, b]) => [a + h * 0.012, b]), { w: Math.max(1, h * 0.006), col: '#e89a6a', a: 0.5, pass2: false });
  for (let k = 0; k < 5; k++) { const i = Math.min(T.length - 1, Math.round((0.4 + k * 0.15) * (T.length - 1))), [bx, by] = T[i], dir = k % 2 ? 1 : -1, len = h * (0.22 + r() * 0.18);
    pencil([[bx, by], [bx + dir * len * 0.7 + sw, by - h * 0.05]], { w: Math.max(1.5, h * 0.012), col: '#6a3a24', pass2: false });
    const cx = bx + dir * len * 0.8 + sw, cy = by - h * 0.07, P = []; for (let q = 0; q <= 14; q++) { const a = Math.PI + q / 14 * Math.PI; P.push([cx + Math.cos(a) * len * 0.75, cy + Math.sin(a) * len * 0.28 + (q % 2 ? h * 0.012 : 0)]); }
    P.push([cx + len * 0.7, cy + h * 0.03], [cx - len * 0.7, cy + h * 0.03]);
    const fp = shape(P, { wash: o.leaf || '#2f5a34', washA: 1, w: 1.6, col: '#0e2410', a: 0.7 }); hatch(fp.path, fp.bb, { gap: 4, a: 0.25, col: '#0e2410', ang: 1.2, w: 1 });
    pencil(P.slice(2, 12).map(([a, b]) => [a, b + 3]), { w: 2, col: o.leafL || '#6a9a58', a: 0.5, pass2: false }); }
}

function silkLantern(x, y, s, t, k = 0, col = '#c8302a') {             // шёлковый фонарь чхонса-чхоронъ: красно-синий, со свечой
  const sw = Math.sin(t * 1.6 + k) * 0.05; push(x, y, s, sw);
  pencil([[0, -60], [0, -40]], { w: 2, col: '#3a2a1a', pass2: false });
  const top = rect(-22, -40, 44, 12, { wash: '#2a4aa8', washA: 1, w: 1.4, col: '#1a1a2a' });
  const b = blob([[-26, -28], [26, -28], [30, 10], [24, 34], [-24, 34], [-30, 10]], { wash: col, washA: 1, w: 1.8, col: '#3a0a0a' }); shadeG(b.path, -30, 0, 30, 0, '#5a0a0a', 0.45);
  rect(-22, 34, 44, 10, { wash: '#2a4aa8', washA: 1, w: 1.4, col: '#1a1a2a' });
  glow(0, 4, 70, 'rgba(255,170,90,1)', 0.45 * flick(t, k)); for (let q = -2; q <= 2; q++) pencil([[q * 6, 44], [q * 6 + Math.sin(t * 2 + q) * 2, 64]], { w: 2, col: '#c8302a', pass2: false });
  pop();
}

function taeguk(x, y, s) {                                            // флаг Кореи: красно-синий круг тхэгык + четыре триграммы
  push(x, y, s); rect(-24, -16, 48, 32, { wash: '#f6f4ee', washA: 1, w: 1.2, col: '#2a2a2a', a: 0.6 });
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 8, Math.PI, 0); ctx.fillStyle = '#cd2e3a'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI); ctx.fillStyle = '#0047a0'; ctx.fill();
  ctx.beginPath(); ctx.arc(-4, 0, 4, 0, Math.PI); ctx.fillStyle = '#cd2e3a'; ctx.fill(); ctx.beginPath(); ctx.arc(4, 0, 4, Math.PI, 0); ctx.fillStyle = '#0047a0'; ctx.fill();
  ctx.fillStyle = '#111'; for (const [tx, ty, r] of [[-16, -10, -0.6], [16, -10, 0.6], [-16, 10, 0.6], [16, 10, -0.6]]) { ctx.save(); ctx.translate(tx, ty); ctx.rotate(r); for (let k = -1; k <= 1; k++) ctx.fillRect(-4, k * 2.6 - 0.8, 8, 1.6); ctx.restore(); }
  ctx.restore(); pop();
}
