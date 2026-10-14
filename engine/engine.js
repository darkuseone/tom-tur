
/* «Карандаш на крафте» — S01E01 «9 000 ЗА ТЕПЛО?!» по методичке «Мультики кодом».
   ДНК: рисунок на двойках (12 рисунков/с при 24 fps), линии кипят (зерно = номер рисунка), рваная линия-лента с нажимом,
   штриховка вместо заливки, потёртая крафт-бумага, строительные линии в начале сцен, цвет — только акценты по ролям.
   Всё считается от времени t; случайность только из генератора с зерном. Звук — готовый микс серии (ElevenLabs). */
const W = 1080, H = 1920, DFPS = 12;
const PAL = {                       // палитра «крафт»: бумага + роли цветов
  paper: '#c4a983', line: '#2b1d14', soft: 'rgba(43,29,20,0.45)', guide: 'rgba(43,29,20,0.18)',
  a1: '#f4efe3',   // акцент 1: снег, пар, блики (мел)
  a2: '#c4332a',   // акцент 2: «боль» — квитанция, нос, варежки, красный тёплый для развязки
  a3: '#3d6db0',   // акцент 3: холод — лёд, изолента
  warm: '#c8702a', // рыжая борода, тёплое в берлоге
  skin: '#e6b08a', label: '#e4cba0'
};
const cv = document.getElementById('c'), out = cv.getContext('2d');
const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
let ctx = ink.getContext('2d');
let FRAME = 0, S = 1; const SS = [];

// ------------------------------------------------------------------ random with seed
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hsh(...v) { let h = 2166136261; for (const x of v) { h ^= (x | 0); h = Math.imul(h, 16777619); } return h >>> 0; }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const sm = k => { k = clamp(k); return k * k * (3 - 2 * k); };
const q = t => Math.floor(t * DFPS + 1e-6) / DFPS;          // время рисунка (на двойках)

// ------------------------------------------------------------------ paper (one sheet for the whole film)
const paper = document.createElement('canvas'); paper.width = W; paper.height = H;
(function makePaper() {
  const g = paper.getContext('2d'), r = rng(11);
  g.fillStyle = PAL.paper; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) {                                // mottling
    const x = r() * W, y = r() * H, rad = 40 + r() * 220, d = r() < 0.5;
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, d ? 'rgba(120,80,40,0.035)' : 'rgba(255,240,210,0.035)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  for (let i = 0; i < 2600; i++) {                               // fibres
    const x = r() * W, y = r() * H, a = r() * 6.28, l = 6 + r() * 26;
    g.strokeStyle = r() < 0.5 ? 'rgba(90,60,30,0.10)' : 'rgba(255,235,200,0.12)'; g.lineWidth = 0.6 + r();
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + r() * 4, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  for (let i = 0; i < 3; i++) {                                  // stains
    const x = r() * W, y = r() * H, rad = 60 + r() * 120;
    g.strokeStyle = 'rgba(110,70,35,0.10)'; g.lineWidth = 3; g.beginPath(); g.ellipse(x, y, rad, rad * (0.7 + r() * 0.3), r() * 3, 0, 6.3); g.stroke();
    g.fillStyle = 'rgba(110,70,35,0.04)'; g.fill();
  }
  for (let i = 0; i < 9; i++) {                                  // eraser smudges + ghost lines
    const x = r() * W, y = r() * H;
    g.fillStyle = 'rgba(255,245,220,0.10)'; g.beginPath(); g.ellipse(x, y, 70 + r() * 90, 22 + r() * 30, r() * 3, 0, 6.3); g.fill();
    g.strokeStyle = 'rgba(43,29,20,0.07)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x - 80, y + 10); g.bezierCurveTo(x - 20, y - 40, x + 30, y + 40, x + 90, y - 5); g.stroke();
  }
  const id = g.getImageData(0, 0, W, H), d = id.data;            // grain
  for (let i = 0; i < d.length; i += 4) { const n = (r() - 0.5) * 22; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(id, 0, 0);
})();
const grain = document.createElement('canvas'); grain.width = 512; grain.height = 512;
(function makeGrain() {
  const g = grain.getContext('2d'), r = rng(5), id = g.createImageData(512, 512), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const v = r(); d[i] = d[i + 1] = d[i + 2] = 0; d[i + 3] = v < 0.42 ? 110 * r() : (v < 0.5 ? 200 : 0); }
  g.putImageData(id, 0, 0);
})();

// ------------------------------------------------------------------ transform stack (stroke widths stay in screen px)
function push(x, y, s = 1, r = 0, fx = 1) { ctx.save(); SS.push(S); ctx.translate(x, y); if (r) ctx.rotate(r); ctx.scale(s * fx, s); S *= s; }
function pop() { ctx.restore(); S = SS.pop(); }
function cam(cx, cy, z, wob = 0) {
  const r = rng(hsh(FRAME, 99)); const wx = wob ? (r() - 0.5) * wob : 0, wy = wob ? (r() - 0.5) * wob : 0;
  ctx.save(); SS.push(S); ctx.translate(540 + wx, 960 + wy); ctx.scale(z, z); ctx.translate(-cx, -cy); S *= z;
}

// ------------------------------------------------------------------ pencil
function resample(pts, step) {
  const o = [pts[0]]; let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], L = Math.hypot(x1 - x0, y1 - y0); let d = step - carry;
    while (d <= L) { o.push([x0 + (x1 - x0) * d / L, y0 + (y1 - y0) * d / L]); d += step; }
    carry = L - (d - step);
  }
  o.push(pts[pts.length - 1]); return o;
}
/* линия-лента с нажимом: сужается на концах, кипит, местами рвётся, поверх тонкий набросочный проход */
function pencil(pts, o = {}) {
  if (!pts || pts.length < 2) return;
  const w = (o.w ?? 3.4) / S, jit = (o.jit ?? 1.6) / S, col = o.col || PAL.line, A = o.a ?? 0.9;
  const r = rng(hsh(FRAME, pts[0][0] * 13, pts[0][1] * 7, (o.key || 0) + pts.length * 31));
  const P = resample(pts, 5 / S), n = P.length;
  const ph1 = r() * 6.28, ph2 = r() * 6.28, ph3 = r() * 6.28;
  let total = 0; const sArr = [0];
  for (let i = 1; i < n; i++) { total += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]) * S; sArr.push(total); }
  const off = (i, k) => {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const s = sArr[i], v = (0.7 * Math.sin(s * 0.012 + ph1 + k) + 0.3 * Math.sin(s * 0.05 + ph2 + k * 2)) * jit;
    return [P[i][0] - dy / L * v, P[i][1] + dx / L * v];
  };
  let g0 = -1, g1 = -1;
  if (o.gap !== false && total > 160 && r() < 0.6) { const c = 0.2 + r() * 0.6; g0 = c * total; g1 = g0 + 8 + r() * 18; }
  ctx.strokeStyle = col; ctx.lineCap = 'round';
  let prev = off(0, 0);
  for (let i = 1; i < n; i++) {
    const cur = off(i, 0), s = sArr[i], tt = s / (total || 1);
    if (!(s > g0 && s < g1)) {
      const taper = o.taper === false ? 1 : Math.pow(clamp(tt / 0.12), 0.6) * Math.pow(clamp((1 - tt) / 0.15), 0.6);
      ctx.globalAlpha = A * (0.72 + 0.28 * r());
      ctx.lineWidth = w * (0.4 + 0.6 * taper) * (0.85 + 0.3 * Math.sin(s * 0.02 + ph3));
      ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke();
    }
    prev = cur;
  }
  if (o.pass2 !== false) {                                        // второй тонкий проход
    ctx.globalAlpha = A * 0.32; ctx.lineWidth = w * 0.35; ctx.beginPath();
    let p = off(0, 2.1); ctx.moveTo(p[0], p[1]);
    for (let i = 1; i < n; i++) { p = off(i, 2.1); ctx.lineTo(p[0] + 1.2 / S, p[1] - 0.8 / S); }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
function hline(a, b, w, col, A, r) {                              // один штрих штриховки
  const mx = (a[0] + b[0]) / 2 + (r() - 0.5) * 3 / S, my = (a[1] + b[1]) / 2 + (r() - 0.5) * 3 / S;
  ctx.globalAlpha = A * (0.55 + 0.45 * r()); ctx.lineWidth = w * (0.7 + 0.5 * r()); ctx.strokeStyle = col;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(mx, my, b[0], b[1]); ctx.stroke();
}
/* штриховка вместо заливки: короткие штрихи с разбросом концов внутри формы */
function hatch(path, bb, o = {}) {
  const ang = o.ang ?? -0.95, gap = (o.gap ?? 10) / S, w = (o.w ?? 2.2) / S, col = o.col || PAL.line, A = o.a ?? 0.55;
  const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2, R = Math.hypot(bb[2] - bb[0], bb[3] - bb[1]) / 2 + 4 / S;
  const r = rng(hsh(FRAME, cx * 3, cy * 5, (o.key || 0) + 77));
  const dx = Math.cos(ang), dy = Math.sin(ang), nx = -dy, ny = dx, seg = (o.seg ?? 70) / S;
  ctx.save(); ctx.clip(path); ctx.lineCap = 'round';
  for (let k = -R; k <= R; k += gap) {
    const kk = k + (r() - 0.5) * gap * 0.5;
    for (let s = -R - r() * seg; s < R; s += seg * (0.75 + 0.5 * r())) {
      const L = seg * (0.55 + 0.6 * r());
      const a = [cx + nx * kk + dx * s, cy + ny * kk + dy * s], b = [a[0] + dx * L + (r() - 0.5) * 2 / S, a[1] + dy * L + (r() - 0.5) * 2 / S];
      hline(a, b, w, col, A, r);
    }
  }
  ctx.restore(); ctx.globalAlpha = 1;
}
function crayon(path, bb, col, o = {}) {                          // цветной карандаш: плотная штриховка + лёгкий второй слой
  hatch(path, bb, { ang: o.ang ?? -1.05, gap: o.gap ?? 6.5, w: o.w ?? 3.6, col, a: o.a ?? 0.75, key: (o.key || 0) + 1, seg: 60 });
  if (o.cross !== false) hatch(path, bb, { ang: (o.ang ?? -1.05) + 0.6, gap: (o.gap ?? 6.5) * 1.6, w: (o.w ?? 3.6) * 0.8, col, a: (o.a ?? 0.75) * 0.5, key: (o.key || 0) + 2, seg: 50 });
}

// ------------------------------------------------------------------ colour wash (растушёванный цветной карандаш под штриховкой)
function wash(path, col, a = 0.6) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fill(path); ctx.restore(); }
function popK(t, t0, d = 0.35) { const u = clamp((t - t0) / d); return u >= 1 ? 1 : 1 - Math.exp(-6 * u) * Math.cos(u * 11); }   // выскакивание с отскоком

// ------------------------------------------------------------------ shapes
function spline(cp, closed = true, n = 10) {                     // Catmull-Rom
  const P = []; const L = cp.length, m = closed ? L : L - 1;
  for (let i = 0; i < m; i++) {
    const p0 = cp[(i - 1 + L) % L], p1 = cp[i], p2 = cp[(i + 1) % L], p3 = cp[(i + 2) % L];
    const a0 = closed || i > 0 ? p0 : p1, a3 = closed || i < L - 2 ? p3 : p2;
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      P.push([0.5 * ((2 * p1[0]) + (-a0[0] + p2[0]) * t + (2 * a0[0] - 5 * p1[0] + 4 * p2[0] - a3[0]) * t2 + (-a0[0] + 3 * p1[0] - 3 * p2[0] + a3[0]) * t3),
              0.5 * ((2 * p1[1]) + (-a0[1] + p2[1]) * t + (2 * a0[1] - 5 * p1[1] + 4 * p2[1] - a3[1]) * t2 + (-a0[1] + 3 * p1[1] - 3 * p2[1] + a3[1]) * t3)]);
    }
  }
  P.push(closed ? P[0] : cp[L - 1]); return P;
}
function pathOf(pts) { const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (const v of pts) p.lineTo(v[0], v[1]); p.closePath(); return p; }
function bbOf(pts) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const [x, y] of pts) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a, b, c, d]; }
function ellPts(cx, cy, rx, ry, rot = 0, over = 0, n = 44) {
  const a0 = (hsh(cx * 11, cy * 7) % 628) / 100, P = [];
  for (let i = 0; i <= n * (1 + over); i++) { const a = a0 + i / n * 6.2832, x = Math.cos(a) * rx, y = Math.sin(a) * ry; P.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); }
  return P;
}
/* форма: контур (замкнутый с заходом за начало) + путь для штриховки */
function shape(pts, o = {}) {
  const path = pathOf(pts), bb = bbOf(pts);
  if (o.wash) wash(path, o.wash, o.washA ?? 0.6);
  if (o.fill) crayon(path, bb, o.fill, o.fillO || {});
  if (o.shade) hatch(path, bb, o.shade);
  if (o.line !== false) pencil(pts.concat(pts.slice(1, Math.max(3, Math.floor(pts.length * 0.06)))), { w: o.w ?? 3.4, col: o.col, a: o.a, key: o.key });
  return { path, bb };
}
function ell(cx, cy, rx, ry, o = {}) { return shape(ellPts(cx, cy, rx, ry, o.rot || 0), o); }
function blob(cp, o = {}) { return shape(spline(cp, true, 8), o); }
function line(cp, o = {}) { pencil(cp.length > 2 && o.smooth !== false ? spline(cp, false, 8) : cp, o); }
function rect(x, y, w, h, o = {}) { return shape([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], o); }
function txt(s, x, y, size, o = {}) {                           // рукопись: кипит, проявляется «пером» слева направо
  ctx.save(); ctx.font = `${o.bold === false ? '' : '700 '}${size / S}px ${o.font || 'Hand'}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle';
  const r = rng(hsh(FRAME, x * 3, y * 5, s.length));
  const wTot = ctx.measureText(s).width;
  if (o.reveal !== undefined && o.reveal < 1) {
    const x0 = (o.align === 'left' ? x : x - wTot / 2);
    ctx.beginPath(); ctx.rect(x0 - 20 / S, y - size / S, (wTot + 40 / S) * clamp(o.reveal), size * 2 / S); ctx.clip();
  }
  ctx.fillStyle = o.col || PAL.line; ctx.globalAlpha = o.a ?? 0.93;
  const dx = (r() - 0.5) * 2.4 / S, dy = (r() - 0.5) * 2.4 / S;
  if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot + (r() - 0.5) * 0.012); ctx.fillText(s, dx, dy); ctx.globalAlpha *= 0.35; ctx.fillText(s, dx + 1.5 / S, dy - 1 / S); }
  else { ctx.fillText(s, x + dx, y + dy); ctx.globalAlpha *= 0.35; ctx.fillText(s, x + dx + 1.5 / S, y + dy - 1 / S); }
  ctx.restore(); return wTot;
}
function guides(alpha, list) {                                   // строительные линии: круги, оси, дуги
  if (alpha <= 0.01) return;
  for (const g of list) {
    if (g[0] === 'c') pencil(ellPts(g[1], g[2], g[3], g[4] || g[3], 0, 0.2), { w: 1.6, col: PAL.line, a: 0.22 * alpha, pass2: false, jit: 2.5 });
    else pencil([[g[1], g[2]], [g[3], g[4]]], { w: 1.4, col: PAL.line, a: 0.2 * alpha, pass2: false, gap: false });
  }
}

