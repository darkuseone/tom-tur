/* ТОМ — британско-шотландский вислоухий табби (по фото хозяина канала). Круглая пушистая голова с «воротником»,
   маленькие сложенные вперёд уши с кисточками, огромные круглые янтарно-оливковые глаза, классические вертикальные полосы на лбу,
   розово-коричневый нос, белая манишка и подбородок, длинные белые усы, пушистый полосатый хвост, большие лапы.
   Костюм меняется по эпохе (o.outfit). Липсинк — формы рта Rhubarb (A–H, X). Ноги в (0,0), y вниз, рост ≈ 540. */
const TM = {
  fur: '#8f7b63', furD: '#3b2d21', furM: '#6e5c48', furL: '#c9b79a', cream: '#efe6d4', creamD: '#cbbfa6', bib: '#e4d9c4',
  iris: '#c6a443', irisL: '#e9cf6c', irisG: '#8a8a3a', irisD: '#5a4a1c', nose: '#b07c72', noseD: '#6a3e38', mouth: '#2c120e', tongue: '#c8707a',
  line: '#20160f', whisk: '#f8f3e8', brass: '#c99636', brassD: '#7a5414', brassL: '#f1d27a'
};
/* эмоции: lid — верхнее веко (0…1), low — нижнее веко (прищур), pupil — размер зрачка, bL/bR — брови (+вверх), knit — свод бровей,
   ears — уши (+1 насторожены, −1 прижаты), mouth — 'smirk' | 'frown' | 'grin' | 'o' | 'flat' | 'smile', look — взгляд, sq — сжатие */
const TE = {
  neutral: { lid: 0.18, low: 0, pupil: 0.55, bL: 0, bR: 0, knit: 0, ears: 0, mouth: 'flat' },
  talk: { lid: 0.12, low: 0, pupil: 0.55, bL: 0.15, bR: 0.15, knit: 0, ears: 0.2, mouth: 'flat' },
  shock: { lid: -0.1, low: 0, pupil: 0.3, bL: 1, bR: 1, knit: -0.2, ears: 1, mouth: 'o' },
  awe: { lid: -0.05, low: 0, pupil: 0.95, bL: 0.7, bR: 0.7, knit: -0.2, ears: 0.6, mouth: 'o', sparkle: 1 },
  smug: { lid: 0.55, low: 0.25, pupil: 0.45, bL: -0.1, bR: 0.5, knit: 0, ears: 0.2, mouth: 'smirk' },
  sideeye: { lid: 0.5, low: 0.15, pupil: 0.4, bL: -0.2, bR: 0.1, knit: 0.1, ears: -0.2, mouth: 'flat', side: 1 },
  annoyed: { lid: 0.48, low: 0.2, pupil: 0.4, bL: -0.4, bR: -0.4, knit: 0.9, ears: -0.8, mouth: 'frown' },
  grin: { lid: 0.3, low: 0.3, pupil: 0.6, bL: 0.4, bR: 0.4, knit: 0, ears: 0.5, mouth: 'grin' },
  laugh: { lid: 1, low: 0.5, pupil: 0.6, bL: 0.6, bR: 0.6, knit: 0, ears: 0.6, mouth: 'grin', closed: 1 },
  scared: { lid: -0.12, low: 0, pupil: 1, bL: 0.9, bR: 0.9, knit: 0.6, ears: -1, mouth: 'frown' },
  cold: { lid: 0.35, low: 0.2, pupil: 0.7, bL: 0.4, bR: 0.4, knit: 0.7, ears: -0.6, mouth: 'frown' },
  proud: { lid: 0.62, low: 0.3, pupil: 0.45, bL: 0.35, bR: 0.35, knit: 0, ears: 0.3, mouth: 'smile', chin: 1 },
  suspicious: { lid: 0.3, low: 0.1, pupil: 0.35, bL: 0.5, bR: -0.4, knit: 0.3, ears: 0, mouth: 'flat', squintR: 0.45 },
  wink: { lid: 0.2, low: 0.1, pupil: 0.5, bL: 0.3, bR: -0.1, knit: 0, ears: 0.4, mouth: 'smirk', winkR: 1 }
};
const VZ = {
  X: { open: 0, wid: 0.9, round: 0 }, A: { open: 0, wid: 0.8, round: 0, press: 1 }, B: { open: 0.22, wid: 0.95, round: 0, teeth: 1 },
  C: { open: 0.5, wid: 0.9, round: 0.1, teeth: 1 }, D: { open: 0.95, wid: 1.05, round: 0.15, teeth: 1, tongue: 1 },
  E: { open: 0.55, wid: 0.62, round: 0.7 }, F: { open: 0.3, wid: 0.42, round: 1 }, G: { open: 0.2, wid: 0.85, round: 0, teeth: 1, lip: 1 },
  H: { open: 0.6, wid: 0.8, round: 0.2, teeth: 1, tongue: 2 }
};
function vzAt(t) {
  if (typeof VIS === 'undefined') return VZ.X;
  let lo = 0, hi = VIS.length - 1, i = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (VIS[m][0] <= t) { i = m; lo = m + 1; } else hi = m - 1; }
  if (i < 0) return VZ.X; const cur = VZ[VIS[i][1]] || VZ.X, prev = i > 0 ? (VZ[VIS[i - 1][1]] || VZ.X) : VZ.X, k = clamp((t - VIS[i][0]) / 0.06);
  const o = {}; for (const key of ['open', 'wid', 'round']) o[key] = lerp(prev[key] || 0, cur[key] || 0, k); for (const key of ['teeth', 'tongue', 'lip', 'press']) o[key] = cur[key] || 0; return o;
}
function mixE(a, b, k) { const A = TE[a] || TE.neutral, B = TE[b] || TE.neutral, o = {}; for (const key of new Set([...Object.keys(A), ...Object.keys(B)])) { const va = A[key] ?? 0, vb = B[key] ?? 0; o[key] = typeof va === 'number' && typeof vb === 'number' ? lerp(va, vb, k) : (k < 0.5 ? va : vb); } return o; }
function fstr(path, bb, n, ang, len, col, a, key, w = 2.2) {
  const r = rng(hsh(FRAME, key * 31, bb[0] * 3)); ctx.save(); ctx.clip(path); ctx.lineCap = 'round'; ctx.strokeStyle = col;
  for (let i = 0; i < n; i++) { const x = lerp(bb[0], bb[2], r()), y = lerp(bb[1], bb[3], r()), aa = ang + (r() - 0.5) * 0.6, L = len * (0.6 + r() * 0.7);
    ctx.globalAlpha = a * (0.5 + 0.5 * r()); ctx.lineWidth = (w * (0.6 + r() * 0.6)) / S; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(aa) * L * 0.5 + (r() - 0.5) * 3, y + Math.sin(aa) * L * 0.5, x + Math.cos(aa) * L, y + Math.sin(aa) * L); ctx.stroke(); }
  ctx.restore(); ctx.globalAlpha = 1;
}
function fluff(pts, amp, seed, every = 1) {                         // пушистый контур: пучки шерсти наружу
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length, r = rng(seed), out = [];
  for (let i = 0; i < pts.length; i++) { const [x, y] = pts[i]; out.push([x, y]); if (i % every) continue; const [x2, y2] = pts[(i + 1) % pts.length], mx = (x + x2) / 2, my = (y + y2) / 2, dx = mx - cx, dy = my - cy, L = Math.hypot(dx, dy) || 1, a = amp * (0.5 + r());
    out.push([mx + dx / L * a, my + dy / L * a]); }
  return out;
}
function furRad(path, bb, n, cx, len, col, a, key, w = 2) {           // шерсть растёт от носа наружу
  const r = rng(hsh(FRAME, key * 31)); ctx.save(); ctx.clip(path); ctx.lineCap = 'round'; ctx.strokeStyle = col;
  for (let i = 0; i < n; i++) { const x = lerp(bb[0], bb[2], r()), y = lerp(bb[1], bb[3], r()), aa = Math.atan2(y - 24, x - cx) + 0.25 * Math.sign(x - cx) + (r() - 0.5) * 0.4, L = len * (0.6 + r() * 0.7);
    ctx.globalAlpha = a * (0.5 + 0.5 * r()); ctx.lineWidth = (w * (0.6 + r() * 0.6)) / S; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(aa) * L * 0.5, y + Math.sin(aa) * L * 0.5 + 1, x + Math.cos(aa) * L, y + Math.sin(aa) * L); ctx.stroke(); }
  ctx.restore(); ctx.globalAlpha = 1;
}
function shadeG(path, x0, y0, x1, y1, col, a) { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.clip(path); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(-2000, -2000, 4000, 4000); ctx.restore(); }
function rimL(pts, side, col, a = 0.8, w = 3) { const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, out = []; let seg = []; for (const p of pts) { if ((p[0] - cx) * side > 0) seg.push(p); else if (seg.length) out.push(seg.splice(0)); } if (seg.length) out.push(seg); for (const s of out) if (s.length > 3) pencil(s.map(([x, y]) => [x - side * 2.5, y]), { w, col, a, pass2: false, gap: false, jit: 1 }); }
function tubeP(P, w0, w1) { const Lp = [], Rp = []; for (let i = 0; i < P.length; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, w = lerp(w0, w1, i / (P.length - 1)) / 2; Lp.push([P[i][0] - dy / l * w, P[i][1] + dx / l * w]); Rp.push([P[i][0] + dy / l * w, P[i][1] - dx / l * w]); } const pts = Lp.concat(Rp.reverse()); pts.push(pts[0]); return pts; }

/* ------------------------------------------------------------------ костюмы эпох: цвета и детали */
const OUTFIT = {
  puffer: { top: '#26282e', topD: '#121318', topL: '#4a4e58', pants: null, collar: 'hood', detail: 'quilt', pin: 'NY' },
  miner: { top: '#3d5a8a', topD: '#1f3256', topL: '#6f8fc0', pants: '#3d5a8a', detail: 'overalls', shirt: '#b8a888', hat: 'miner' },
  astro: { top: '#e8e6e0', topD: '#9a9890', topL: '#ffffff', pants: '#e8e6e0', detail: 'astro', hat: 'bubble' },
  safari: { top: '#c8b07a', topD: '#7a6a42', topL: '#e6d4a6', pants: '#a8905a', detail: 'pockets', hat: 'pith', strap: 1 },
  fur: { top: '#7a5a3a', topD: '#3a2a18', topL: '#c8a878', pants: '#5a4028', detail: 'furcoat', hat: 'furhood' },
  explorer: { top: '#7a2a2a', topD: '#3a1010', topL: '#b85a4a', pants: '#3a3020', detail: 'doublet', collar: 'ruff', hat: 'beret' },
  dutch: { top: '#1e1c1e', topD: '#0a0a0a', topL: '#4a464a', pants: '#1e1c1e', detail: 'doublet', collar: 'band', hat: 'capotain' },
  victorian: { top: '#3a2e44', topD: '#1a1422', topL: '#6a5a7a', pants: '#2a2a2e', detail: 'waistcoat', shirt: '#f0ece2', tie: 'bow', hat: 'top' },
  sailor: { top: '#f0ece2', topD: '#9a968c', topL: '#ffffff', pants: '#1e2a4a', detail: 'breton', collar: 'sailor', hat: 'sailor' },
  iron: { top: '#4a6a8e', topD: '#22344e', topL: '#7a9abe', pants: '#4a6a8e', detail: 'overalls', shirt: '#a87a5a', hat: 'flatcap', gloves: 1 },
  hoodie: { top: '#5a5e66', topD: '#2a2e36', topL: '#8a8e96', pants: '#2a3442', detail: 'hoodie', hat: 'cap' }
};

function tom(o = {}) {
  const t = o.t || 0, E = o.E || mixE(o.expr || 'neutral', o.expr2 || o.expr || 'neutral', o.ek ?? 0), V = o.vis || vzAt(t), OF = OUTFIT[o.outfit] || OUTFIT.puffer;
  const L = o.light || { side: 1, rim: '#ffe3a8' };
  const wk = o.walk, sw = wk !== undefined ? Math.sin(wk) : 0, step = wk !== undefined ? Math.abs(Math.sin(wk)) : 0;
  const breathe = Math.sin(t * 2.4) * 2.4, bob = -step * 10 + breathe * 0.4, sway = Math.sin(t * 0.9) * 3 * (wk === undefined ? 1 : 0);
  const [lx0, ly] = o.look || [0.15, 0], lx = E.side ? lx0 + 0.8 : lx0;
  push(o.x || 0, o.y || 0, o.s || 1, o.rot || 0, o.flip ? -1 : 1);
  if (o.squash) ctx.scale(1 + o.squash * 0.16, 1 - o.squash * 0.16);
  { ctx.save(); const sg = ctx.createRadialGradient(0, 2, 4, 0, 2, 130); sg.addColorStop(0, 'rgba(20,12,10,0.5)'); sg.addColorStop(1, 'rgba(20,12,10,0)'); ctx.fillStyle = sg; ctx.scale(1, 0.18); ctx.beginPath(); ctx.arc(0, 10, 140, 0, 6.3); ctx.fill(); ctx.restore(); }

  // ---------------------------------------------------------------- хвост: пушистый, кольца, тёмный кончик
  const tw = Math.sin(t * 1.6 + 0.5) * 28 + (o.tailUp ? -60 : 0), tw2 = Math.sin(t * 1.6 + 1.7) * 20;
  const TL = spline([[-44, -120 + bob], [-110, -130 + bob], [-160 + tw * 0.2, -190 + bob], [-170 + tw * 0.6, -270 + bob], [-140 + tw + tw2 * 0.3, -330 + bob], [-104 + tw + tw2, -344 + bob]], false, 8);
  const tp = shape(tubeP(TL, 54, 26), { wash: TM.fur, washA: 0.98, w: 3, col: TM.line, key: 70 });
  ctx.save(); ctx.clip(tp.path); for (let k = 1; k < 7; k++) { const j = Math.floor(k * (TL.length - 1) / 7.2), p = TL[j]; const g = ctx.createRadialGradient(p[0], p[1], 2, p[0], p[1], 26); g.addColorStop(0, 'rgba(59,45,33,0.7)'); g.addColorStop(1, 'rgba(59,45,33,0)'); ctx.fillStyle = g; ctx.fillRect(p[0] - 30, p[1] - 30, 60, 60); } ctx.restore();
  fstr(tp.path, tp.bb, 120, -1.3, 16, TM.furL, 0.5, 71); fstr(tp.path, tp.bb, 70, -1.1, 14, TM.furD, 0.35, 72);
  for (let j = 3; j < TL.length - 1; j += 3) { const a = TL[j - 1], b = TL[j + 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), w = lerp(27, 13, j / TL.length); for (const sd of [-1, 1]) lock(TL[j][0] - Math.sin(ang) * w * 0.7 * sd, TL[j][1] + Math.cos(ang) * w * 0.7 * sd, ang + sd * 2.0, 10 + (j % 2) * 4, 16, TM.fur, TM.line); }
  { const tip = TL[TL.length - 1], pr = TL[TL.length - 4], ang = Math.atan2(tip[1] - pr[1], tip[0] - pr[0]); lock(tip[0], tip[1], ang, 24, 18, TM.furD, TM.line); }

  // ---------------------------------------------------------------- дальняя рука
  const shF = [-64, -232 + bob], hf = o.handF || [-82 - sw * 16, -140 + bob];
  arm5(shF, hf, OF, 'far', t);

  // ---------------------------------------------------------------- ноги (короткие, пушистые) + штаны
  for (const [k, dx] of [[0, -28], [1, 28]]) {
    const s_ = (k ? sw : -sw) * 22, lift = Math.max(0, k ? sw : -sw) * 14;
    const leg = fluff([[dx - 24, -112 + bob * 0.6], [dx + 24, -112 + bob * 0.6], [dx + 22 + s_ * 0.8, -22 - lift], [dx - 22 + s_ * 0.8, -20 - lift]], 5, 10 + k);
    const lp = shape(leg.concat([leg[0]]), { wash: OF.pants || (k ? TM.fur : TM.furM), washA: 0.98, w: 3, col: TM.line, key: 10 + k });
    if (!OF.pants) fstr(lp.path, lp.bb, 30, 1.5, 12, TM.furD, 0.5, 12 + k); else hatch(lp.path, lp.bb, { gap: 7, a: 0.25, col: '#000', ang: 1.3, key: 13 + k });
    const fx = dx + 4 + s_, fy = -10 - lift;
    const fp = shape(fluff(ellPts(fx, fy, 30, 15, 0, 0, 18), 4, 20 + k), { wash: TM.furL, washA: 0.99, w: 2.8, col: TM.line, key: 22 + k });
    for (let q = -1; q <= 1; q++) line([[fx + q * 10, fy - 8], [fx + q * 11, fy + 8]], { w: 2, a: 0.7, pass2: false, smooth: false });
  }

  // ---------------------------------------------------------------- туловище + костюм
  const BD = fluff([[-60, -240 + bob], [60, -240 + bob], [84, -190 + bob], [92, -130 + bob], [76, -96 + bob], [0, -84 + bob], [-76, -96 + bob], [-92, -130 + bob], [-84, -190 + bob]], 4, 30);
  const bp = shape(BD.concat([BD[0]]), { wash: OF.top, washA: 0.98, w: 3.6, col: TM.line, key: 31 });
  shadeG(bp.path, -L.side * 100, -160, L.side * 60, -160, OF.topD, 0.7);
  costume5(OF, bob, t, bp);
  rimL(BD, L.side, L.rim, 0.75, 3);
  // часы-машина времени на цепочке
  if (!o.watchInHand) { line([[-30, -176 + bob], [-10, -150 + bob], [14, -158 + bob]], { w: 2.4, col: TM.brass, pass2: false }); ell(16, -156 + bob, 10, 10, { wash: TM.brass, washA: 1, w: 2, col: TM.brassD }); }

  // ---------------------------------------------------------------- голова
  const chin = E.chin ? -8 : 0, hx = (o.chatter ? Math.sin(t * 50) * 2.4 : 0) + sway * 0.4, hy = -372 + bob + chin + (o.nod ? Math.sin(t * 8) * 4 : 0);
  // тень головы на воротник
  { const g = ctx.createRadialGradient(0, -258 + bob, 10, 0, -258 + bob, 110); g.addColorStop(0, 'rgba(30,14,10,0.45)'); g.addColorStop(1, 'rgba(30,14,10,0)'); ctx.fillStyle = g; ctx.save(); ctx.scale(1, 0.45); ctx.beginPath(); ctx.arc(0, (-252 + bob) / 0.45, 110, 0, 6.3); ctx.fill(); ctx.restore(); }
  push(hx, hy, 1, (o.tilt || 0) + Math.sin(t * 0.7) * 0.02 + (E.tilt || 0));
  head5(o, E, V, L, t, lx, ly);
  pop();

  // ---------------------------------------------------------------- ближняя рука + реквизит
  const shN = [64, -232 + bob], hn = o.hand || [82 + sw * 16, -138 + bob];
  arm5(shN, hn, OF, 'near', t);
  if (o.watchInHand) { line([[30, -176 + bob], [hn[0] - 10, hn[1] + 8], [hn[0] + 4, hn[1] - 20]], { w: 2.4, col: TM.brass, pass2: false }); watch5(hn[0] + 6, hn[1] - 34, 28, t, o.spin || 0, o.glow || 0); }
  if (o.prop === 'coin') { push(hn[0] + 4, hn[1] - 30, 1, 0, Math.cos(t * 9)); ell(0, 0, 20, 20, { wash: TM.brassL, washA: 1, w: 2.4, col: TM.brassD }); txt('60', 0, 1, 17, { col: TM.brassD, font: 'Osw' }); pop(); }
  if (o.prop === 'binoc') { push(hn[0] - 10, hn[1] - 30, 1, -0.2); for (const bx of [-14, 14]) rect(bx - 11, -30, 22, 50, { wash: '#2a2a2a', washA: 1, w: 2 }); pop(); }
  paw5(hn[0], hn[1], OF, false, o.point);
  pop();
}

function lock(x, y, ang, len, wid, col, lc) {                    // прядь шерсти: капля наружу
  const c = Math.cos(ang), s_ = Math.sin(ang), nx = -s_, ny = c;
  const pts = [[x + nx * wid / 2, y + ny * wid / 2], [x + c * len * 0.6 + nx * wid * 0.32, y + s_ * len * 0.6 + ny * wid * 0.32], [x + c * len, y + s_ * len], [x + c * len * 0.55 - nx * wid * 0.3, y + s_ * len * 0.55 - ny * wid * 0.3], [x - nx * wid / 2, y - ny * wid / 2]];
  const sp = spline(pts, false, 5); const p = pathOf(sp); wash(p, col, 1); pencil(sp.slice(1, -1), { w: 1.8, col: lc, a: 0.35, pass2: false, gap: false }); pencil([[x + c * len * 0.15, y + s_ * len * 0.15], [x + c * len * 0.8, y + s_ * len * 0.8]], { w: 1.4, col: lc, a: 0.25, pass2: false, gap: false });
}
function hoodBack(t) { const hp = blob([[-170, 120], [-176, -40], [-120, -150], [0, -178], [120, -150], [176, -40], [170, 120], [90, 150], [-90, 150]], { wash: '#6a4a30', washA: 0.99, w: 3, col: TM.line, key: 62 }); fstr(hp.path, hp.bb, 80, 1.3, 14, '#3a2818', 0.4, 63); }
function head5(o, E, V, L, t, lx, ly) {
  const fx = lx * 14, fy = ly * 6, ear = E.ears || 0, OF = OUTFIT[o.outfit] || OUTFIT.puffer;
  // ---- уши: маленькие, сложенные вперёд, с кисточками (прижимаются/поднимаются)
  if (!['bubble', 'furhood'].includes(OF.hat) || o.noHat) for (const s of [-1, 1]) {
    const up = ear * 10, bx = s * 62 - fx * 0.3, by = -86 - up;
    const pts = [[bx - s * 36, by + 14], [bx - s * 6, by - 16 - up * 0.5], [bx + s * 34, by - 8 - up * 0.6], [bx + s * 48, by + 18 + ear * -6], [bx + s * 10, by + 26]];
    const ep = shape(spline(pts, true, 6), { wash: TM.fur, washA: 0.99, w: 3, col: TM.line, key: 40 + s }); shape(spline([[bx - s * 18, by + 14], [bx + s * 6, by], [bx + s * 30, by + 6], [bx + s * 36, by + 18], [bx + s * 6, by + 20]], true, 6), { wash: '#b88a7a', washA: 0.55, line: false });
    fstr(ep.path, ep.bb, 16, 1.3, 9, TM.furD, 0.5, 41 + s);
    for (let k = 0; k < 4; k++) line([[bx + s * (6 + k * 8), by + 2], [bx + s * (4 + k * 9), by - 14 - k * 3 - up * 0.3]], { w: 1.8, col: TM.furL, a: 0.85, pass2: false });   // кисточки
    line([[bx - s * 10, by + 12], [bx + s * 30, by + 16]], { w: 2.4, col: TM.furD, a: 0.8, pass2: false });   // складка
  }
  // ---- круглая голова с пушистыми щеками («воротник»)
  const HDc = []; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283, rx = 126 + Math.max(0, Math.sin(a)) * 12 * Math.abs(Math.cos(a)) * 2, ry = 98 + Math.max(0, Math.sin(a)) * 6; HDc.push([Math.cos(a) * rx + (Math.sin(a) < 0 ? fx * 0.15 : fx * 0.3), Math.sin(a) * ry + 6]); }
  const HDf = HDc;
  const HD = spline(HDf, true, 3), hp = pathOf(HD), hbb = bbOf(HD);
  if (OF.hat === 'furhood' && !o.noHat) hoodBack(t);
  wash(hp, TM.fur, 0.99);
  shadeG(hp, -L.side * 120, 0, L.side * 40, 0, TM.furM, 0.55);
  { const g = ctx.createRadialGradient(fx, 20, 20, fx, 0, 150); g.addColorStop(0, 'rgba(225,212,190,0.55)'); g.addColorStop(0.6, 'rgba(225,212,190,0)'); g.addColorStop(1, 'rgba(40,28,18,0.35)'); ctx.save(); ctx.clip(hp); ctx.fillStyle = g; ctx.fillRect(-200, -200, 400, 400); ctx.restore(); }
  furRad(hp, hbb, 260, fx, 14, TM.furD, 0.4, 45); furRad(hp, hbb, 140, fx, 12, TM.furL, 0.5, 46);
  // табби: вертикальные полосы на лбу, «тушь» от глаз, полосы на щеках
  for (const [x0, y0, x1, y1, w] of [[0, -40, 2, -96, 6], [-14, -44, -18, -94, 5], [14, -44, 18, -94, 5], [-30, -50, -40, -88, 4], [30, -50, 40, -88, 4]]) line([[x0 + fx, y0], [x0 * 0.5 + x1 * 0.5 + fx, (y0 + y1) / 2], [x1 + fx * 0.8, y1]], { w, col: TM.furD, a: 0.85 });
  for (const s of [-1, 1]) { line([[s * 66 + fx, -8], [s * 92 + fx * 0.6, -4], [s * 116 + fx * 0.4, 8]], { w: 4.4, col: TM.furD }); line([[s * 60 + fx, 16], [s * 96 + fx * 0.6, 26], [s * 118 + fx * 0.4, 40]], { w: 3.6, col: TM.furD, a: 0.85 }); }
  pencil(HD, { w: 3.6, col: TM.line, key: 47 });
  for (let k = 0; k < 14; k++) { const a = 0.18 + k / 13 * (Math.PI - 0.36), sd = Math.cos(a), rx = 126 + Math.max(0, Math.sin(a)) * 12 * Math.abs(sd) * 2, ry = 98 + Math.max(0, Math.sin(a)) * 6, x = sd * rx * 0.97 + fx * 0.3, y = Math.sin(a) * ry * 0.97 + 6; lock(x, y, Math.atan2(y - 6, x) + sd * 0.25, 14 + (k % 3) * 5, 20, k % 2 ? TM.fur : TM.furM, TM.line); }
  for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const a = Math.PI + (s > 0 ? 0.25 : -0.25) + s * k * 0.12; lock(Math.cos(Math.PI / 2 - s * (1.2 + k * 0.12)) * 120 + fx * 0.2, -Math.sin(Math.PI / 2 - s * (1.2 + k * 0.12)) * 96, -Math.PI / 2 + s * (1.15 + k * 0.12), 12, 12, TM.fur, TM.line); }
  rimL(HD, L.side, L.rim, 0.8, 3);
  // ---- морда: белые подушечки, подбородок, манишка
  const jaw = V.open * 30;
  blob([[-20 + fx, 50], [20 + fx, 50], [16 + fx, 64 + jaw], [0 + fx, 70 + jaw], [-16 + fx, 64 + jaw]], { wash: TM.cream, washA: 0.97, w: 2, col: TM.line, a: 0.35, key: 48 });
  for (const s of [-1, 1]) { const pd = ell(fx + s * 17, 38, 22, 15, { wash: TM.cream, washA: 0.98, w: 1.8, col: TM.line, a: 0.3, key: 49 + s, rot: s * 0.15 }); fstr(pd.path, pd.bb, 16, 1.5 + s * 0.4, 7, TM.creamD, 0.55, 50 + s);
    for (const [dx, dy] of [[s * 10, 34], [s * 18, 40], [s * 26, 36], [s * 14, 46]]) { ctx.fillStyle = TM.furD; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(dx + fx, dy, 1.8, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1; }
  // ---- нос
  const nx = fx * 1.1, ny = 20 + fy;
  ell(nx, ny - 14, 12, 18, { wash: TM.furL, washA: 0.5, line: false });
  poly([[nx - 13, ny - 6], [nx + 13, ny - 6], [nx + 4, ny + 8], [nx - 4, ny + 8]], { wash: TM.nose, washA: 1, w: 2.4, col: TM.noseD });
  ctx.fillStyle = TM.noseD; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(nx + s * 5.5, ny + 1, 2.6, 1.6, s * 0.4, 0, 6.3); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,240,235,0.75)'; ctx.beginPath(); ctx.ellipse(nx - 4, ny - 3, 3.4, 1.5, 0, 0, 6.3); ctx.fill();
  mouth5(nx, ny + 10, V, E, t);
  // ---- усы: длинные, белые
  for (const s of [-1, 1]) for (let k = 0; k < 5; k++) line([[s * 30 + fx, 36 + k * 4], [s * (90 + k * 8) + fx * 0.5, 34 + k * 12 + Math.sin(t * 3 + k) * 2], [s * (170 + k * 6) + fx * 0.3, 44 + k * 22]], { w: 1.3, col: TM.whisk, a: 0.92, pass2: false });
  // ---- глаза: огромные, круглые, янтарно-оливковые
  const blink = !o.noBlink && (((t + 0.4) % 3.9) < 0.1 || ((t + 2.1) % 8.3) < 0.1);
  for (const [k, s] of [[0, -1], [1, 1]]) {
    const ex = s * 42 + fx, ey = -10 + fy, R = 29;
    let lid = blink || (E.winkR && s > 0) || E.closed ? 1 : clamp(E.lid + (s > 0 ? (E.squintR || 0) : 0) + (o.squint || 0), -0.2, 1);
    const low = E.low || 0;
    const eye = ellPts(ex, ey, R, R * (1 + Math.max(0, -lid) * 0.25), 0, 0, 40), ep = pathOf(eye);
    // глазница: тёмная обводка
    ell(ex, ey + 2, R + 7, R + 6, { wash: TM.furD, washA: 0.35, line: false });
    wash(ep, TM.irisD, 1);
    ctx.save(); ctx.clip(ep);
    const px = ex + lx * 8, py = ey + ly * 6;
    const g = ctx.createRadialGradient(px - 4, py - 4, 3, px, py, R * 1.05); g.addColorStop(0, TM.irisL); g.addColorStop(0.45, TM.iris); g.addColorStop(0.82, TM.irisG); g.addColorStop(1, TM.irisD);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, R * 1.05, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(80,60,10,0.5)'; ctx.lineWidth = 0.9 / S; for (let q = 0; q < 18; q++) { const a = q / 18 * 6.283; ctx.beginPath(); ctx.moveTo(px + Math.cos(a) * 9, py + Math.sin(a) * 9); ctx.lineTo(px + Math.cos(a) * 25, py + Math.sin(a) * 25); ctx.stroke(); }
    const pr = 6 + 15 * E.pupil; ctx.fillStyle = '#0d0805'; ctx.beginPath(); ctx.ellipse(px, py, pr, Math.max(pr, 10 + 8 * E.pupil), 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,250,0.95)'; ctx.beginPath(); ctx.ellipse(px - R * 0.32, py - R * 0.34, 6, 4.5, -0.5, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,250,0.55)'; ctx.beginPath(); ctx.arc(px + R * 0.3, py + R * 0.3, 2.6, 0, 6.3); ctx.fill();
    if (E.sparkle) { ctx.fillStyle = 'rgba(255,255,250,0.9)'; ctx.beginPath(); ctx.arc(px + R * 0.1, py - R * 0.5, 2.6, 0, 6.3); ctx.fill(); }
    if (lid > 0) { const ly0 = ey - R - 2 + (R * 2 + 4) * lid; const lp = pathOf([[ex - R - 8, ey - R - 40], [ex + R + 8, ey - R - 40], [ex + R + 8, ly0 + s * (E.knit || 0) * 6], [ex - R - 8, ly0 - s * (E.knit || 0) * 6]]); wash(lp, TM.fur, 1); fstr(lp, [ex - R, ey - R - 20, ex + R, ly0], 18, 1.3, 7, TM.furD, 0.5, 52 + k); }
    if (low > 0) { const ly1 = ey + R + 2 - (R * 1.2) * low; const lp = pathOf([[ex - R - 8, ey + R + 30], [ex + R + 8, ey + R + 30], [ex + R + 8, ly1], [ex - R - 8, ly1]]); wash(lp, TM.fur, 1); }
    ctx.fillStyle = 'rgba(60,30,10,0.3)'; ctx.fillRect(ex - R, ey - R - 2 + (R * 2) * Math.max(0, lid), R * 2, 7);
    ctx.restore();
    const lidY = ey - R + (R * 2) * Math.max(0, lid);
    if (lid >= 0.98) { const up = E.closed ? -1 : 1; line([[ex - R, ey + 2], [ex, ey + 2 + 7 * up], [ex + R, ey + 2]], { w: 4, col: TM.line }); }
    else { pencil(eye, { w: 2.6, col: TM.line, a: 0.9, pass2: false, gap: false }); if (lid > 0.02) line([[ex - R - 3, lidY + 2], [ex, lidY - 2 - s * (E.knit || 0) * 3], [ex + R + 3, lidY + 2]], { w: 4.2, col: TM.line }); }
    // брови-полосы табби
    const br = s < 0 ? E.bL : E.bR, by = ey - R - 14 - br * 14, kn = (E.knit || 0) * 10;
    line([[ex - s * 24 + s * kn * 0.4, by + 6 - (E.knit || 0) * 6], [ex - s * 4, by - 4], [ex + s * 22, by + 4]], { w: 5, col: TM.furD });
  }
  if (o.sweat) { const yy = -60 + ((t * 60) % 36); ell(96, yy, 6, 9, { wash: '#bfe3ff', washA: 0.95, w: 1.8 }); }
  if (o.frost) for (let k = 0; k < 12; k++) { const r = rng(k + 3); const x = (r() - 0.5) * 200, y = -70 + r() * 150; line([[x, y], [x + 4, y + 6]], { w: 2, col: '#ffffff', a: 0.9, pass2: false }); }
  if (E.blush) for (const s of [-1, 1]) { ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#d87a6a'; ctx.beginPath(); ctx.ellipse(s * 70, 22, 18, 9, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
  hat5(OF.hat, t, o);
}
function mouth5(x, y, V, E, t) {
  const op = Math.max(V.open, E.mouth === 'o' ? 0.45 : 0, E.mouth === 'grin' && V.open < 0.1 ? 0.25 : 0), wd = 22 * V.wid * (1 - V.round * 0.35) * (E.mouth === 'grin' ? 1.25 : 1), sm_ = E.mouth === 'smirk' ? 1 : E.mouth === 'smile' ? 0.6 : 0, fr = E.mouth === 'frown' ? 1 : 0;
  line([[x, y - 4], [x, y + 2]], { w: 2.2, col: TM.line, pass2: false });
  if (op < 0.06) {
    const l = [[x - wd - 6, y + 6 - sm_ * (E.mouth === 'smile' ? 6 : 0) + fr * 6], [x - wd * 0.5, y + 9], [x, y + 3]], r = [[x, y + 3], [x + wd * 0.5, y + 9], [x + wd + 6, y + 6 - sm_ * 9 + fr * 6]];
    line(l, { w: V.press ? 3.6 : 2.8, col: TM.line }); line(r, { w: V.press ? 3.6 : 2.8, col: TM.line }); return;
  }
  const top = y + 4, bot = y + 6 + op * 42, rw = wd + 6;
  const M = [[x - rw, top + 2 + fr * 6], [x - rw * 0.5, top + 6], [x, top + 2], [x + rw * 0.5, top + 6], [x + rw, top + 2 - sm_ * 8 + fr * 6], [x + rw * (0.8 - V.round * 0.2), (top + bot) / 2 + 4], [x + rw * 0.4, bot], [x - rw * 0.4, bot], [x - rw * (0.8 - V.round * 0.2), (top + bot) / 2 + 4]];
  const sp = spline(M, true, 6), mp = pathOf(sp); wash(mp, TM.mouth, 0.98);
  ctx.save(); ctx.clip(mp);
  if (V.tongue || E.mouth === 'grin') { ctx.fillStyle = TM.tongue; ctx.beginPath(); ctx.ellipse(x, V.tongue === 2 ? top + 12 : bot - 2, rw * 0.62, 8 + op * 5, 0, 0, 6.3); ctx.fill(); }
  if (V.teeth || V.lip || E.mouth === 'grin') { ctx.fillStyle = '#f2ead6'; ctx.fillRect(x - rw, top, rw * 2, 4 + (V.lip ? 3 : 0)); }
  ctx.fillStyle = '#f7f0de'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * rw * 0.62, top + 2); ctx.lineTo(x + s * rw * 0.42, top + 3); ctx.lineTo(x + s * rw * 0.54, top + 11 + op * 3); ctx.closePath(); ctx.fill(); }
  ctx.restore(); pencil(sp, { w: 2.6, col: TM.line, a: 0.95, pass2: false });
}
function arm5(sh, hand, OF, k, t) {
  const el = [(sh[0] + hand[0]) / 2 + (k === 'near' ? 18 : -18), (sh[1] + hand[1]) / 2 + 12];
  const C = spline([sh, el, [hand[0], hand[1] - 14]], false, 8);
  const sleeveCol = OF.sleeve || (OF.detail === 'overalls' ? OF.shirt : OF.top);
  const p = shape(fluff(tubeP(C, 46, 38), 3, k === 'near' ? 81 : 82), { wash: k === 'near' ? sleeveCol : shadeC(sleeveCol), washA: 0.98, w: 3, col: TM.line, key: k === 'near' ? 80 : 83 });
  hatch(p.path, p.bb, { gap: 7, a: 0.22, col: '#000', ang: 1.0, key: 84 });
  if (OF.detail === 'breton') { ctx.save(); ctx.clip(p.path); for (let y = sh[1] - 60; y < hand[1] + 20; y += 16) { ctx.fillStyle = '#1e2a4a'; ctx.globalAlpha = 0.9; ctx.fillRect(Math.min(sh[0], hand[0]) - 60, y, 160, 7); } ctx.restore(); }
  if (OF.detail === 'quilt' || OF.detail === 'astro') for (let i = 2; i < C.length - 2; i += 3) { const [x, y] = C[i]; pencil([[x - 20, y - 2], [x + 20, y + 4]], { w: 1.8, col: OF.topD, a: 0.8, pass2: false }); }
  if (k === 'far') paw5(hand[0], hand[1] + 6, OF, true);
}
function shadeC(c) { const p = [1, 3, 5].map(i => Math.round(parseInt(c.substr(i, 2), 16) * 0.72)); return '#' + p.map(v => v.toString(16).padStart(2, '0')).join(''); }
function paw5(x, y, OF, far, point) {
  push(x, y, 1);
  if (OF.gloves) { const g = blob([[-22, -18], [0, -26], [22, -18], [26, 6], [14, 22], [-14, 22], [-26, 6]], { wash: '#8a6a44', washA: 0.99, w: 2.8, col: TM.line }); pop(); return; }
  const p = shape(fluff(ellPts(0, 0, 24, 21, 0, 0, 18), 4, far ? 90 : 91), { wash: far ? TM.furM : TM.furL, washA: 0.99, w: 2.8, col: TM.line, key: far ? 92 : 93 });
  for (let k = -1; k <= 1; k++) line([[k * 9, 8], [k * 10, 20]], { w: 1.8, a: 0.7, pass2: false, smooth: false });
  if (point) blob([[6, -12], [16, -16], [40, -40], [34, -46], [8, -26]], { wash: TM.furL, washA: 0.99, w: 2.4, col: TM.line });
  fstr(p.path, p.bb, 14, 1.4, 6, TM.furD, 0.4, 94);
  pop();
}
function costume5(OF, bob, t, bp) {                                  // детали костюма поверх туловища
  const b = bob, D = OF.detail;
  // манишка (белая грудка) видна в вырезе
  const showBib = ['puffer', 'quilt', 'overalls', 'pockets', 'waistcoat', 'hoodie', 'doublet'].includes(D) || D === 'quilt';
  if (D === 'quilt') { ctx.save(); ctx.clip(bp.path); for (let y = -230; y < -80; y += 26) pencil([[-100, y + b], [100, y + 4 + b]], { w: 2, col: OF.topL, a: 0.7, pass2: false }); ctx.restore(); poly([[-6, -244 + b], [6, -244 + b], [4, -86 + b], [-4, -86 + b]], { wash: '#9a9a9a', washA: 1, w: 1.4 });
    ell(-46, -200 + b, 14, 14, { wash: '#f4f0e6', washA: 1, w: 1.8 }); txt('NY', -46, -199 + b, 15, { col: '#c8302a', font: 'Osw' });
    blob([[-70, -250 + b], [-30, -270 + b], [30, -270 + b], [70, -250 + b], [64, -226 + b], [0, -236 + b], [-64, -226 + b]], { wash: '#5a4a38', washA: 0.97, w: 2.6, col: TM.line }); fstr(pathOf([[-70, -250 + b], [70, -250 + b], [64, -226 + b], [-64, -226 + b]]), [-70, -270 + b, 70, -226 + b], 40, 1.5, 9, '#d8c8a8', 0.6, 5); }
  if (D === 'overalls') { const sh = poly([[-58, -236 + b], [58, -236 + b], [62, -200 + b], [-62, -200 + b]], { wash: OF.shirt, washA: 0.98, w: 2.4, col: TM.line });
    poly([[-50, -170 + b], [50, -170 + b], [56, -86 + b], [-56, -86 + b]], { wash: OF.top, washA: 0.99, w: 2.6, col: TM.line, shade: { gap: 6, a: 0.25, col: '#000' } });
    for (const s of [-1, 1]) { pencil([[s * 44, -170 + b], [s * 40, -236 + b]], { w: 10, col: OF.top }); ell(s * 42, -172 + b, 6, 6, { wash: TM.brass, washA: 1, w: 1.6 }); }
    rect(-22, -150 + b, 44, 30, { wash: OF.topD, washA: 0.9, w: 2 }); }
  if (D === 'astro') { ctx.save(); ctx.clip(bp.path); for (let y = -220; y < -80; y += 40) pencil([[-100, y + b], [100, y + 4 + b]], { w: 2.4, col: OF.topD, a: 0.7, pass2: false }); ctx.restore();
    rect(-34, -200 + b, 68, 44, { wash: '#c8c4bc', washA: 1, w: 2.2 }); for (let k = 0; k < 3; k++) ell(-18 + k * 18, -178 + b, 6, 6, { wash: ['#d83a2a', '#3ad84a', '#3a8ad8'][k], washA: 1, w: 1.4 }); poly([[-10, -246 + b], [10, -246 + b], [14, -232 + b], [-14, -232 + b]], { wash: '#e6e2da', washA: 1, w: 1.6 }); }
  if (D === 'pockets') { for (const s of [-1, 1]) { rect(s * 40 - 18, -210 + b, 36, 30, { wash: OF.topL, washA: 0.9, w: 2 }); pencil([[s * 40 - 18, -200 + b], [s * 40 + 18, -200 + b]], { w: 2, pass2: false }); } for (let y = -230; y < -90; y += 30) ell(0, y + b, 4, 4, { wash: '#4a3a24', washA: 1, w: 1 }); pencil([[-60, -240 + b], [56, -100 + b]], { w: 7, col: '#5a3a1a' }); poly([[-12, -246 + b], [12, -246 + b], [0, -226 + b]], { wash: OF.topL, washA: 1, w: 1.6 }); }
  if (D === 'furcoat') { ctx.save(); ctx.clip(bp.path); fstr(bp.path, bp.bb, 160, 1.5, 22, OF.topL, 0.6, 7, 3); fstr(bp.path, bp.bb, 100, 1.4, 20, OF.topD, 0.5, 8, 3); ctx.restore(); pencil([[0, -240 + b], [0, -90 + b]], { w: 3, col: OF.topD }); for (let k = 0; k < 3; k++) rect(-6, -210 + k * 40 + b, 12, 18, { wash: '#d8c8a0', washA: 1, w: 1.4 }); }
  if (D === 'doublet') { for (let k = 0; k < 6; k++) ell(0, -226 + k * 24 + b, 5, 5, { wash: TM.brass, washA: 1, w: 1.2 }); for (let k = 0; k < 5; k++) { pencil([[-60 + k * 10, -200 + b], [-56 + k * 10, -130 + b]], { w: 3, col: OF.topL, a: 0.7, pass2: false }); pencil([[20 + k * 10, -200 + b], [24 + k * 10, -130 + b]], { w: 3, col: OF.topL, a: 0.7, pass2: false }); }
    pencil([[-84, -112 + b], [84, -112 + b]], { w: 8, col: '#3a2a18' }); }
  if (D === 'waistcoat') { poly([[-30, -240 + b], [30, -240 + b], [40, -96 + b], [-40, -96 + b]], { wash: OF.shirt, washA: 0.99, w: 2 }); poly([[-60, -236 + b], [-22, -236 + b], [-8, -90 + b], [-60, -96 + b]], { wash: '#7a2a2a', washA: 0.99, w: 2.4, shade: { gap: 6, a: 0.2 } }); poly([[60, -236 + b], [22, -236 + b], [8, -90 + b], [60, -96 + b]], { wash: '#7a2a2a', washA: 0.99, w: 2.4, shade: { gap: 6, a: 0.2 } });
    for (let k = 0; k < 4; k++) ell(-12, -190 + k * 26 + b, 4, 4, { wash: TM.brass, washA: 1, w: 1 }); }
  if (D === 'breton') { ctx.save(); ctx.clip(bp.path); for (let y = -236; y < -80; y += 18) { ctx.fillStyle = '#1e2a4a'; ctx.globalAlpha = 0.92; ctx.fillRect(-110, y + b, 220, 8); } ctx.restore(); }
  if (D === 'hoodie') { blob([[-74, -246 + b], [-30, -280 + b], [30, -280 + b], [74, -246 + b], [60, -224 + b], [0, -236 + b], [-60, -224 + b]], { wash: OF.topD, washA: 0.97, w: 2.6, col: TM.line }); for (const s of [-1, 1]) pencil([[s * 14, -236 + b], [s * 16, -190 + b]], { w: 2.4, col: '#e8e4dc', pass2: false });
    rect(-46, -136 + b, 92, 40, { wash: OF.topD, washA: 0.7, w: 2 }); txt('NYC', 0, -186 + b, 30, { col: '#e8e4dc', font: 'Osw' }); }
  // воротники
  if (OF.collar === 'ruff') { for (let k = 0; k < 14; k++) { const a = Math.PI + k / 13 * Math.PI; ell(Math.cos(a) * 64, -238 + b + Math.sin(a) * -10, 14, 10, { wash: '#f4f0e6', washA: 1, w: 1.4 }); } }
  if (OF.collar === 'band') { poly([[-80, -246 + b], [80, -246 + b], [64, -206 + b], [0, -214 + b], [-64, -206 + b]], { wash: '#f4f0e6', washA: 1, w: 2.4, col: TM.line, shade: { gap: 6, a: 0.12 } }); }
  if (OF.collar === 'sailor') { poly([[-80, -246 + b], [80, -246 + b], [60, -196 + b], [0, -170 + b], [-60, -196 + b]], { wash: '#1e2a4a', washA: 1, w: 2.4, col: TM.line }); for (const s of [-1, 1]) pencil([[s * 70, -238 + b], [s * 52, -200 + b], [0, -180 + b]], { w: 2, col: '#f4f0e6', pass2: false }); poly([[-8, -184 + b], [8, -184 + b], [16, -150 + b], [-16, -150 + b]], { wash: '#c8302a', washA: 1, w: 1.6 }); }
  if (OF.tie === 'bow') { poly([[0, -238 + b], [-26, -250 + b], [-26, -226 + b]], { wash: '#1a1a1a', washA: 1, w: 1.6 }); poly([[0, -238 + b], [26, -250 + b], [26, -226 + b]], { wash: '#1a1a1a', washA: 1, w: 1.6 }); ell(0, -238 + b, 6, 6, { wash: '#1a1a1a', washA: 1, w: 1 }); }
  if (OF.strap) pencil([[50, -236 + b], [-40, -110 + b]], { w: 6, col: '#3a2a1a' });
  if (!['ruff', 'band', 'sailor'].includes(OF.collar) && !['hoodie', 'quilt', 'furcoat'].includes(D)) { const bib = fluff(ellPts(0, -236 + b, 52, 20, 0, 0, 20), 5, 9); shape(bib.concat([bib[0]]), { wash: TM.bib, washA: 0.97, w: 2, col: TM.line, a: 0.5 }); }
}
function hat5(h, t, o) {                                             // головные уборы (на макушке, y≈−90 при голове r≈100)
  if (!h || o.noHat) return;
  if (h === 'miner') { blob([[-96, -60], [-80, -128], [0, -150], [80, -128], [96, -60]], { wash: '#c8a02a', washA: 0.98, w: 3.2, col: TM.line, shade: { gap: 6, a: 0.28, ang: 1 } }); line([[-112, -60], [112, -60]], { w: 8, col: '#6e5214' }); ell(0, -120, 17, 14, { wash: '#fff6c8', washA: 1, w: 2.6, col: TM.line }); }
  if (h === 'bubble') { const g = ctx.createRadialGradient(-40, -60, 10, 0, 0, 160); g.addColorStop(0, 'rgba(220,240,255,0.25)'); g.addColorStop(1, 'rgba(160,200,240,0.12)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, -6, 152, 142, 0, 0, 6.3); ctx.fill();
    pencil(ellPts(0, -6, 152, 142, 0, 0.05, 80), { w: 4, col: '#e8f4ff', a: 0.9 }); pencil(ellPts(0, -6, 152, 142, 0, 0.05, 80).slice(48, 70), { w: 8, col: '#ffffff', a: 0.6, pass2: false }); rect(-120, 120, 240, 26, { wash: '#c8c4bc', washA: 1, w: 2.4 }); }
  if (h === 'pith') { blob([[-130, -62], [-80, -86], [-62, -136], [0, -152], [62, -136], [80, -86], [130, -62], [0, -72]], { wash: '#e6d6aa', washA: 0.98, w: 3, col: TM.line, shade: { gap: 6, a: 0.2 } }); line([[-74, -90], [74, -90]], { w: 7, col: '#7a5a34' }); }
  if (h === 'furhood') { const ring = new Path2D(), outer = ellPts(0, 0, 150, 132, 0, 0, 60), inner = ellPts(0, 6, 116, 98, 0, 0, 60), r = rng(65);
    const wob = (P, amp) => P.map(([x, y], i) => { const L = Math.hypot(x, y) || 1; const k = amp * Math.sin(i * 1.7) * (0.6 + r() * 0.4); return [x + x / L * k, y + y / L * k]; });
    const O = wob(outer, 7), I = wob(inner, 5); ring.moveTo(O[0][0], O[0][1]); O.forEach(p => ring.lineTo(p[0], p[1])); ring.closePath(); ring.moveTo(I[0][0], I[0][1]); I.slice().reverse().forEach(p => ring.lineTo(p[0], p[1])); ring.closePath();
    ctx.save(); ctx.fillStyle = '#e4d8c2'; ctx.fill(ring, 'evenodd'); ctx.clip(ring, 'evenodd'); const g = ctx.createRadialGradient(0, 0, 100, 0, 0, 150); g.addColorStop(0, 'rgba(120,100,80,0.35)'); g.addColorStop(1, 'rgba(120,100,80,0)'); ctx.fillStyle = g; ctx.fillRect(-160, -160, 320, 320);
    ctx.lineCap = 'round'; for (let k = 0; k < 220; k++) { const an = r() * 6.283, rr = 108 + r() * 46, x = Math.cos(an) * rr * 1.12, y = Math.sin(an) * rr; ctx.strokeStyle = k % 3 ? 'rgba(255,250,240,0.7)' : 'rgba(110,90,70,0.45)'; ctx.lineWidth = 2 / S; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * 12, y + Math.sin(an) * 12); ctx.stroke(); } ctx.restore();
    pencil(O.concat([O[0]]), { w: 2.4, col: '#6a5a48', a: 0.6, pass2: false }); pencil(I.concat([I[0]]), { w: 2, col: '#6a5a48', a: 0.5, pass2: false }); }
  if (h === 'beret') { blob([[-110, -70], [-90, -120], [0, -140], [100, -118], [124, -80], [0, -84]], { wash: '#2a2a3a', washA: 0.98, w: 3, col: TM.line }); const fw = Math.sin(t * 3) * 6; line([[60, -120], [120 + fw, -200], [150 + fw, -220]], { w: 8, col: '#f0ece2' }); for (let k = 0; k < 8; k++) line([[70 + k * 9 + fw * k / 8, -130 - k * 11], [90 + k * 9 + fw * k / 8, -126 - k * 11]], { w: 2, col: '#d8d4ca', pass2: false }); }
  if (h === 'capotain') { ell(0, -80, 130, 20, { wash: '#121012', washA: 0.98, w: 3, col: TM.line }); blob([[-62, -84], [-56, -196], [0, -206], [56, -196], [62, -84]], { wash: '#121012', washA: 0.98, w: 3.2, col: TM.line, shade: { gap: 6, a: 0.4, col: '#000' } }); rect(-62, -116, 124, 18, { wash: '#4a3a2a', washA: 0.95, w: 2, col: TM.line }); rect(-14, -120, 28, 26, { wash: TM.brass, washA: 1, w: 2.2, col: TM.brassD }); }
  if (h === 'top') { ell(0, -84, 104, 16, { wash: '#18161c', washA: 0.98, w: 3, col: TM.line }); rect(-58, -224, 116, 140, { wash: '#18161c', washA: 0.98, w: 3.2, col: TM.line, shade: { gap: 6, a: 0.4, col: '#000' } }); rect(-58, -112, 116, 18, { wash: '#7a2a2a', washA: 0.95, w: 2 }); line([[-36, -214], [-34, -126]], { w: 3, col: 'rgba(255,255,255,0.35)', pass2: false }); }
  if (h === 'sailor') { ell(0, -86, 110, 20, { wash: '#f4f0e6', washA: 1, w: 2.6, col: TM.line }); blob([[-80, -88], [-64, -130], [0, -138], [64, -130], [80, -88]], { wash: '#f4f0e6', washA: 1, w: 2.6, col: TM.line }); rect(-80, -106, 160, 14, { wash: '#1e2a4a', washA: 1, w: 1.6 }); }
  if (h === 'flatcap') { blob([[-112, -70], [-96, -122], [0, -142], [96, -122], [112, -78], [140, -64], [0, -66]], { wash: '#5a4a3a', washA: 0.98, w: 3, col: TM.line, shade: { gap: 5, a: 0.3, col: '#2a2018' } }); for (let k = 0; k < 6; k++) pencil([[-90 + k * 34, -120], [-80 + k * 34, -76]], { w: 1.4, col: '#3a2a1a', a: 0.6, pass2: false }); }
  if (h === 'cap') { blob([[-100, -66], [-84, -128], [0, -146], [84, -128], [100, -66]], { wash: '#1e2632', washA: 0.98, w: 3, col: TM.line }); ell(84, -64, 70, 14, { wash: '#1e2632', washA: 0.98, w: 2.8, col: TM.line, rot: 0.08 }); push(0, -102, 1); txt('NY', 0, 0, 38, { col: '#e9e2d0', font: 'Osw' }); pop(); }
}
function watch5(x, y, r, t, spin, glow_) {
  if (glow_ > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 6); g.addColorStop(0, `rgba(255,214,120,${0.7 * glow_})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12); }
  ell(x, y - r - 6, 6, 5, { wash: TM.brass, washA: 1, w: 2, col: TM.brassD }); ell(x, y, r, r, { wash: TM.brass, washA: 1, w: 3, col: TM.brassD });
  ell(x, y, r * 0.8, r * 0.8, { wash: '#f6ecd2', washA: 1, w: 1.8, col: TM.brassD });
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; line([[x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62], [x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72]], { w: k % 3 ? 1.2 : 2.2, col: TM.line, smooth: false, pass2: false }); }
  const a1 = -Math.PI / 2 + t * (0.4 + spin * 30), a2 = -Math.PI / 2 + t * (0.04 + spin * 3);
  line([[x, y], [x + Math.cos(a1) * r * 0.6, y + Math.sin(a1) * r * 0.6]], { w: 1.6, col: '#a83a2a', smooth: false, pass2: false }); line([[x, y], [x + Math.cos(a2) * r * 0.42, y + Math.sin(a2) * r * 0.42]], { w: 2.6, col: TM.line, smooth: false, pass2: false });
}
// совместимость с мирами v3/v4
const tubePts = tubeP, fstrokes = fstr, softShade = shadeG, rim = rimL;
