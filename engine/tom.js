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
  hoodie: { top: '#5a5e66', topD: '#2a2e36', topL: '#8a8e96', pants: '#2a3442', detail: 'hoodie', hat: 'cap' },
  // ---- 002 Москва
  pufferM: { top: '#26282e', topD: '#121318', topL: '#4a4e58', pants: null, collar: 'hood', detail: 'quilt', pin: 'M' },
  diver: { top: '#9c8c68', topD: '#544630', topL: '#c8b890', pants: '#9c8c68', detail: 'diver', hat: 'diver', boots: 'diver', cuff: '#2a2420', canvas: 1 },
  tulup: { top: '#b47c44', topD: '#5e3a1a', topL: '#e0b070', pants: '#4a3a2c', detail: 'tulup', hat: 'ushanka', boots: 'valenki', cuff: '#efe4cc', cuffFur: 1, long: 1 },
  knyaz: { top: '#24357a', topD: '#0e1640', topL: '#5a6cc0', pants: '#3a2418', detail: 'knyaz', hat: 'knyaz', boots: 'knyaz', cuff: '#c99636', cuffGold: 1, long: 1 },
  kolchuga: { top: '#8c9094', topD: '#3e4246', topL: '#d0d4d8', pants: '#5a3a28', detail: 'mail', hat: 'shishak', boots: 'leather', mail: 1, cuff: '#7a2a22', long: 1 },
  master: { top: '#2f5a3e', topD: '#14301e', topL: '#62926a', pants: '#8a3424', shirt: '#f2ece0', detail: 'master', hat: 'berretto', boots: 'shoe', slash: '#e8dcc0' },
  painter: { top: '#ece4d2', topD: '#a49a84', topL: '#fffaf0', pants: '#5c6070', detail: 'painter', hat: 'paintcap', boots: 'lapti', cuff: '#b8302a', splash: 1 },
  founder: { top: '#cbb894', topD: '#7e6a4a', topL: '#ece0c4', pants: '#4a3a2c', detail: 'founder', hat: 'leathercap', boots: 'leather', mitt: '#7a5232', rolled: 1, soot: 1 },
  hussar: { top: '#ac262a', topD: '#560e12', topL: '#e05a4a', pants: '#1e2a5e', detail: 'hussar', hat: 'kiver', boots: 'hussar', cord: '#ecc554', cuffKnot: 1 },
  metro: { top: '#6e6c50', topD: '#363624', topL: '#a6a07c', pants: '#5e5c44', detail: 'metro', hat: 'metro', boots: 'rubber', canvas: 1 },
  hoodieM: { top: '#5a5e66', topD: '#2a2e36', topL: '#8a8e96', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'МОСКВА', capTxt: 'M' },
  // ---- 003 Киев
  hoodieK: { top: '#2e3f5c', topD: '#172238', topL: '#5a6e90', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'КИЕВ', capTxt: 'К' },
  aviator: { top: '#6a4426', topD: '#2e1a0a', topL: '#a87a4a', pants: '#8a7a58', detail: 'aviator', hat: 'aviator', boots: 'aviator', cuff: '#2e1a0a', furC: '#e8dcc0' },
  architect: { top: '#1f4a34', topD: '#0e2a1c', topL: '#4a7a5e', pants: '#2a2a2e', detail: 'architect', hat: 'bowler', boots: 'oxford', shirt: '#f2ece0', tie: 'bow' },
  bogatyr: { top: '#7d868e', topD: '#2e353c', topL: '#c4ccd4', pants: '#4a2c1a', detail: 'bogatyr', hat: 'bogatyr', boots: 'bogatyr', mail: 2, sleeve: '#a8302a', bracer: '#9ca2a8', long: 1 },
  french: { top: '#2a4a9a', topD: '#12245a', topL: '#5a7ad0', pants: '#9a2a2a', detail: 'french', hat: 'circlet', boots: 'shoe', cuff: '#d6a842', long: 1 },
  rubakha: { top: '#efe8d6', topD: '#a89c84', topL: '#fffaf0', pants: '#3a3228', detail: 'rubakha', hat: null, boots: 'lapti', stitch: '#b8302a', long: 1 },
  varyag: { top: '#6a7260', topD: '#2e342a', topL: '#9aa48c', pants: '#4a4234', detail: 'varyag', hat: 'spangen', boots: 'varyag', cuff: '#7a5a2a', long: 1 },
  soviet: { top: '#6a6e74', topD: '#33363c', topL: '#9a9ea6', pants: '#55585e', detail: 'soviet', hat: null, boots: 'oxford', shirt: '#f2f0ea' },
  caveman: { top: '#8f7b63', topD: '#3b2d21', topL: '#c9b79a', pants: null, detail: 'caveman', hat: null, bare: 1 },
  scuba: { top: '#14232e', topD: '#070d12', topL: '#2a4658', pants: '#14232e', detail: 'scuba', hat: 'mask', boots: 'fin' },
  // ---- 004 Сеул
  hoodieS: { top: '#3a2f5c', topD: '#1c1634', topL: '#6a5a96', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'SEOUL', capTxt: 'S' },
  gwanbok: { top: '#2a3f86', topD: '#111c4a', topL: '#5a76c4', pants: '#2a2a2e', detail: 'gwanbok', hat: 'samo', boots: 'leather', long: 1 },
  gunsa: { top: '#1f2c4e', topD: '#0c1428', topL: '#4a5c8a', pants: '#2a2a30', detail: 'gunsa', hat: 'jeonrip', boots: 'leather', sleeve: '#b8302a', long: 1 },
  seonbi: { top: '#f1ede2', topD: '#aaa28c', topL: '#ffffff', pants: '#e6e0d0', detail: 'seonbi', hat: 'gat', boots: 'shoe', long: 1 },
  nongbu: { top: '#e9e1cc', topD: '#a99c7e', topL: '#fffaf0', pants: '#d6cdb6', detail: 'nongbu', hat: 'straw', boots: 'lapti', rolled: 0 },
  suitK: { top: '#6a6e74', topD: '#33363c', topL: '#9a9ea6', pants: '#55585e', detail: 'soviet', hat: null, boots: 'oxford', shirt: '#f2f0ea', noPin: 1 },
  tux: { top: '#6cb4e2', topD: '#2a6a98', topL: '#b8e4ff', pants: '#1a1a1e', detail: 'tux', hat: 'shades', boots: 'oxford', shirt: '#f6f4ee', tie: 'bow' },
  // ---- добавлено tools/add_costume.py
  hoodieP: { top: '#1f4a5e', topD: '#0e2634', topL: '#4a7a90', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'ПИТЕР', capTxt: 'П' },
  preobr: { top: '#2a5a3a', topD: '#12301c', topL: '#5a8a62', pants: '#b8302a', detail: 'preobr', hat: 'tricorn', boots: 'leather', cuff: '#b8302a', vest: '#b8302a', lace: null, long: 1 },
  kamzol: { top: '#7a1e2a', topD: '#3a0a10', topL: '#b8505a', pants: '#2a2a2e', detail: 'preobr', hat: 'tricorn', boots: 'shoe', cuff: '#d6a842', vest: '#e8d8a8', lace: '#d6a842', long: 1 },
  komissar: { top: '#2a2220', topD: '#0e0a08', topL: '#5a4a44', pants: '#3a3a40', detail: 'aviator', hat: 'flatcap', boots: 'leather', cuff: '#1a1412', furC: '#3a302c' },
  // ---- добавлено tools/add_costume.py
  hoodieO: { top: '#1e6e86', topD: '#0c3646', topL: '#5aa6be', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'ОДЕССА', capTxt: 'О' },
  hoodieMn: { top: '#2e6a3a', topD: '#14341c', topL: '#64a070', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'МИНСК', capTxt: 'М' },
  voen: { top: '#7a7646', topD: '#3e3c20', topL: '#aaa676', pants: '#5e5c3c', detail: 'metro', hat: 'pilotka', boots: 'leather', canvas: 1 },
  // ---- добавлено tools/add_costume.py
  hoodieR: { top: '#c8902a', topD: '#6a4410', topL: '#f0c060', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'РОСТОВ', capTxt: 'Р' },
  armen: { top: '#6a2420', topD: '#2e0c0a', topL: '#a85a4a', pants: '#2a2420', detail: 'knyaz', hat: 'papakha', boots: 'leather', cuff: '#c89a4a', long: 1 },
  // ---- добавлено tools/add_costume.py
  hoodieLA: { top: '#e2683a', topD: '#7a2a10', topL: '#ffa070', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'L.A.', capTxt: 'LA' },
  colono: { top: '#e2d2a8', topD: '#9a8a62', topL: '#fff4d8', pants: '#5a4a32', detail: 'rubakha', hat: 'sombrero', boots: 'leather', stitch: '#c8302a', long: 1 },
  director: { top: '#8a6a48', topD: '#4a3420', topL: '#b89a74', pants: '#6a5236', detail: 'waistcoat', shirt: '#f0ece2', tie: 'bow', hat: 'flatcap' },
  // ---- добавлено tools/add_costume.py
  hoodieBCN: { top: '#2a8a8a', topD: '#0e3e3e', topL: '#6ac0c0', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'BCN', capTxt: 'B' },
  roman: { top: '#a8302a', topD: '#4a0e0a', topL: '#d86a5a', pants: '#a8302a', detail: 'rubakha', hat: 'galea', boots: 'leather', stitch: '#e8b84a', long: 1 },
  // ---- добавлено tools/add_costume.py
  hoodiePA: { top: '#3a5aa8', topD: '#14244a', topL: '#7a9ae0', pants: '#2a3442', detail: 'hoodie', hat: 'cap', print: 'PARIS', capTxt: 'P' }
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
  if (o.prop === 'chisel') prop5('mallet', hf, t, o.propAngF ?? -0.5);
  arm5(shF, hf, OF, 'far', t);

  // ---------------------------------------------------------------- ноги (короткие, пушистые) + штаны
  for (const [k, dx] of [[0, -28], [1, 28]]) {
    const s_ = (k ? sw : -sw) * 22, lift = Math.max(0, k ? sw : -sw) * 14;
    const leg = fluff([[dx - 24, -112 + bob * 0.6], [dx + 24, -112 + bob * 0.6], [dx + 22 + s_ * 0.8, -22 - lift], [dx - 22 + s_ * 0.8, -20 - lift]], 5, 10 + k);
    const lp = shape(leg.concat([leg[0]]), { wash: OF.pants || (k ? TM.fur : TM.furM), washA: 0.98, w: 3, col: TM.line, key: 10 + k });
    if (!OF.pants) fstr(lp.path, lp.bb, 30, 1.5, 12, TM.furD, 0.5, 12 + k); else hatch(lp.path, lp.bb, { gap: 7, a: 0.25, col: '#000', ang: 1.3, key: 13 + k });
    const fx = dx + 4 + s_, fy = -10 - lift;
    if (OF.boots) { boot5(fx, fy, dx + s_ * 0.8, bob, OF, k); continue; }
    const fp = shape(fluff(ellPts(fx, fy, 30, 15, 0, 0, 18), 4, 20 + k), { wash: TM.furL, washA: 0.99, w: 2.8, col: TM.line, key: 22 + k });
    for (let q = -1; q <= 1; q++) line([[fx + q * 10, fy - 8], [fx + q * 11, fy + 8]], { w: 2, a: 0.7, pass2: false, smooth: false });
  }

  // ---------------------------------------------------------------- туловище + костюм
  const BD = fluff([[-60, -240 + bob], [60, -240 + bob], [84, -190 + bob], [92, -130 + bob], [76, -96 + bob], [0, -84 + bob], [-76, -96 + bob], [-92, -130 + bob], [-84, -190 + bob]], 4, 30);
  const bp = shape(BD.concat([BD[0]]), { wash: OF.top, washA: 0.98, w: 3.6, col: TM.line, key: 31 });
  shadeG(bp.path, -L.side * 100, -160, L.side * 60, -160, OF.topD, 0.7);
  costume5(OF, bob, t, bp, L, o);
  rimL(OF.long ? BD.filter(p => p[1] < -112 + bob) : BD, L.side, L.rim, 0.75, 3);
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
  if (OF.detail === 'diver' && !o.noHat) { ctx.save(); const cr = new Path2D(), cl = new Path2D(); cr.rect(20, -300 + bob, 140, 140); ctx.clip(cr); cl.rect(-400, -800, 800, 900); cl.moveTo(hx + 178, hy - 2); cl.arc(hx, hy - 2, 178, 0, 6.2832); ctx.clip(cl, 'evenodd'); diverPlate(bob, L); ctx.restore(); }
  if (o.watchInHand) { line([[30, -176 + bob], [hn[0] - 10, hn[1] + 8], [hn[0] + 4, hn[1] - 20]], { w: 2.4, col: TM.brass, pass2: false }); watch5(hn[0] + 6, hn[1] - 34, 28, t, o.spin || 0, o.glow || 0); }
  if (o.prop === 'coin') { push(hn[0] + 4, hn[1] - 30, 1, 0, Math.cos(t * 9)); ell(0, 0, 20, 20, { wash: TM.brassL, washA: 1, w: 2.4, col: TM.brassD }); txt('60', 0, 1, 17, { col: TM.brassD, font: 'Osw' }); pop(); }
  if (o.prop === 'binoc') { push(hn[0] - 10, hn[1] - 30, 1, -0.2); for (const bx of [-14, 14]) rect(bx - 11, -30, 22, 50, { wash: '#2a2a2a', washA: 1, w: 2 }); pop(); }
  if (o.prop && PROPS[o.prop]) prop5(o.prop, hn, t, o.propAng || 0);
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
  if (!['bubble', 'furhood', 'diver', 'ushanka', 'aviator'].includes(OF.hat) || o.noHat) for (const s of [-1, 1]) {
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
  if (HATBACK[OF.hat] && !o.noHat) HATBACK[OF.hat](t, o);
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
  hat5(OF.hat, t, o, fx, L, OF);
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
  arm6(C, p, OF, k, t, sh, hand);
  if (k === 'far') paw5(hand[0], hand[1] + 6, OF, true);
}
function shadeC(c) { const p = [1, 3, 5].map(i => Math.round(parseInt(c.substr(i, 2), 16) * 0.72)); return '#' + p.map(v => v.toString(16).padStart(2, '0')).join(''); }
function paw5(x, y, OF, far, point) {
  push(x, y, 1);
  if (OF.mitt) { mitt5(OF, far); pop(); return; }
  if (OF.gloves) { const g = blob([[-22, -18], [0, -26], [22, -18], [26, 6], [14, 22], [-14, 22], [-26, 6]], { wash: '#8a6a44', washA: 0.99, w: 2.8, col: TM.line }); pop(); return; }
  const p = shape(fluff(ellPts(0, 0, 24, 21, 0, 0, 18), 4, far ? 90 : 91), { wash: far ? TM.furM : TM.furL, washA: 0.99, w: 2.8, col: TM.line, key: far ? 92 : 93 });
  for (let k = -1; k <= 1; k++) line([[k * 9, 8], [k * 10, 20]], { w: 1.8, a: 0.7, pass2: false, smooth: false });
  if (point) blob([[6, -12], [16, -16], [40, -40], [34, -46], [8, -26]], { wash: TM.furL, washA: 0.99, w: 2.4, col: TM.line });
  fstr(p.path, p.bb, 14, 1.4, 6, TM.furD, 0.4, 94);
  pop();
}
function costume5(OF, bob, t, bp, L, o) {                            // детали костюма поверх туловища
  const b = bob, D = OF.detail;
  if (COST6[D]) COST6[D](OF, b, t, bp, L || { side: 1, rim: '#ffe3a8' }, o || {});
  // манишка (белая грудка) видна в вырезе
  const showBib = ['puffer', 'quilt', 'overalls', 'pockets', 'waistcoat', 'hoodie', 'doublet'].includes(D) || D === 'quilt';
  if (D === 'quilt') { ctx.save(); ctx.clip(bp.path); for (let y = -230; y < -80; y += 26) pencil([[-100, y + b], [100, y + 4 + b]], { w: 2, col: OF.topL, a: 0.7, pass2: false }); ctx.restore(); poly([[-6, -244 + b], [6, -244 + b], [4, -86 + b], [-4, -86 + b]], { wash: '#9a9a9a', washA: 1, w: 1.4 });
    if (OF.pin === 'M') metroM(-46, -200 + b, 17); else if (OF.pin !== null) { ell(-46, -200 + b, 14, 14, { wash: '#f4f0e6', washA: 1, w: 1.8 }); txt('NY', -46, -199 + b, 15, { col: '#c8302a', font: 'Osw' }); }
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
    rect(-46, -136 + b, 92, 40, { wash: OF.topD, washA: 0.7, w: 2 }); if (OF.print) { txt(OF.print, 0, -188 + b, 27, { col: '#e8e4dc', font: 'Osw' }); pencil([[-40, -170 + b], [40, -170 + b]], { w: 2.4, col: '#c8302a', a: 0.9, pass2: false }); } else txt('NYC', 0, -186 + b, 30, { col: '#e8e4dc', font: 'Osw' }); }
  // воротники
  if (OF.collar === 'ruff') { for (let k = 0; k < 14; k++) { const a = Math.PI + k / 13 * Math.PI; ell(Math.cos(a) * 64, -238 + b + Math.sin(a) * -10, 14, 10, { wash: '#f4f0e6', washA: 1, w: 1.4 }); } }
  if (OF.collar === 'band') { poly([[-80, -246 + b], [80, -246 + b], [64, -206 + b], [0, -214 + b], [-64, -206 + b]], { wash: '#f4f0e6', washA: 1, w: 2.4, col: TM.line, shade: { gap: 6, a: 0.12 } }); }
  if (OF.collar === 'sailor') { poly([[-80, -246 + b], [80, -246 + b], [60, -196 + b], [0, -170 + b], [-60, -196 + b]], { wash: '#1e2a4a', washA: 1, w: 2.4, col: TM.line }); for (const s of [-1, 1]) pencil([[s * 70, -238 + b], [s * 52, -200 + b], [0, -180 + b]], { w: 2, col: '#f4f0e6', pass2: false }); poly([[-8, -184 + b], [8, -184 + b], [16, -150 + b], [-16, -150 + b]], { wash: '#c8302a', washA: 1, w: 1.6 }); }
  if (OF.tie === 'bow') { poly([[0, -238 + b], [-26, -250 + b], [-26, -226 + b]], { wash: '#1a1a1a', washA: 1, w: 1.6 }); poly([[0, -238 + b], [26, -250 + b], [26, -226 + b]], { wash: '#1a1a1a', washA: 1, w: 1.6 }); ell(0, -238 + b, 6, 6, { wash: '#1a1a1a', washA: 1, w: 1 }); }
  if (OF.strap) pencil([[50, -236 + b], [-40, -110 + b]], { w: 6, col: '#3a2a1a' });
  if (!['ruff', 'band', 'sailor'].includes(OF.collar) && !['preobr', 'hoodie', 'quilt', 'furcoat', 'diver', 'tulup', 'knyaz', 'mail', 'master', 'painter', 'hussar', 'metro', 'aviator', 'architect', 'bogatyr', 'french', 'rubakha', 'varyag', 'soviet', 'caveman', 'scuba', 'gwanbok', 'gunsa', 'seonbi', 'nongbu', 'tux'].includes(D)) { const bib = fluff(ellPts(0, -236 + b, 52, 20, 0, 0, 20), 5, 9); shape(bib.concat([bib[0]]), { wash: TM.bib, washA: 0.97, w: 2, col: TM.line, a: 0.5 }); }
}
function hat5(h, t, o, fx = 0, L = { side: 1, rim: '#ffe3a8' }, OF = {}) {   // головные уборы (на макушке, y≈−90 при голове r≈100)
  if (OF.splash || OF.soot) face6(OF, t, fx);
  if (!h || o.noHat) return;
  if (HAT6[h]) { HAT6[h](t, o, fx, L, OF); return; }
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
  if (h === 'cap') { blob([[-100, -66], [-84, -128], [0, -146], [84, -128], [100, -66]], { wash: '#1e2632', washA: 0.98, w: 3, col: TM.line }); ell(84, -64, 70, 14, { wash: '#1e2632', washA: 0.98, w: 2.8, col: TM.line, rot: 0.08 }); if (OF.capTxt === 'M') metroM(0, -104, 24); else { push(0, -102, 1); txt(OF.capTxt || 'NY', 0, 0, 38, { col: '#e9e2d0', font: 'Osw' }); pop(); } }
}
function watch5(x, y, r, t, spin, glow_) {
  if (glow_ > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 6); g.addColorStop(0, `rgba(255,214,120,${0.7 * glow_})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12); }
  ell(x, y - r - 6, 6, 5, { wash: TM.brass, washA: 1, w: 2, col: TM.brassD }); ell(x, y, r, r, { wash: TM.brass, washA: 1, w: 3, col: TM.brassD });
  ell(x, y, r * 0.8, r * 0.8, { wash: '#f6ecd2', washA: 1, w: 1.8, col: TM.brassD });
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; line([[x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62], [x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72]], { w: k % 3 ? 1.2 : 2.2, col: TM.line, smooth: false, pass2: false }); }
  const a1 = -Math.PI / 2 + t * (0.4 + spin * 30), a2 = -Math.PI / 2 + t * (0.04 + spin * 3);
  line([[x, y], [x + Math.cos(a1) * r * 0.6, y + Math.sin(a1) * r * 0.6]], { w: 1.6, col: '#a83a2a', smooth: false, pass2: false }); line([[x, y], [x + Math.cos(a2) * r * 0.42, y + Math.sin(a2) * r * 0.42]], { w: 2.6, col: TM.line, smooth: false, pass2: false });
}
/* ================================================================== 002 Москва: костюмы, головные уборы, обувь, реквизит
   Всё — в координатах рига (туловище: ноги в 0,0; голова: центр 0,0, r≈126×98). Свет: L.side (+1 — справа), L.rim — контровой. */
const CU = { gold: '#d6a842', goldD: '#7a5414', goldL: '#f6dc8a', pearl: '#f6f0e2', copper: '#b8692e', copperD: '#4e220a', copperL: '#f2b06a',
  steel: '#9ca2a8', steelD: '#41464c', steelL: '#eef2f6', lead: '#5c6066', wood: '#8e5c30', woodD: '#4a2c14', woodL: '#c08a52', lime: '#f6f3ea', red: '#b8302a', ruby: '#c0182a' };
function wobP(P, amp, seed) { return P.map(([x, y], i) => [x + Math.sin(i * 1.9 + seed) * amp, y + Math.cos(i * 2.3 + seed * 1.7) * amp]); }
function softShape(cp, o, amp = 2.2, seed = 1) { return shape(wobP(spline(cp, true, 8), amp, seed), o); }
function edgeOff(C, off) { return C.map((p, i) => { const a = C[Math.max(0, i - 1)], b2 = C[Math.min(C.length - 1, i + 1)], dx = b2[0] - a[0], dy = b2[1] - a[1], l = Math.hypot(dx, dy) || 1; return [p[0] - dy / l * off, p[1] + dx / l * off]; }); }
function metalG(path, x, y, r, cL, c, cD, a = 1) { const g = ctx.createRadialGradient(x, y, r * 0.05, x, y, r); g.addColorStop(0, cL); g.addColorStop(0.45, c); g.addColorStop(1, cD); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fill(path); ctx.restore(); }
function curls(path, bb, n, col, a, key, rr = 4) {                  // овчина / каракуль: мелкие завитки
  const r = rng(hsh(FRAME, key * 17)); ctx.save(); ctx.clip(path); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 1.5 / S; ctx.globalAlpha = a; ctx.beginPath();
  for (let i = 0; i < n; i++) { const x = lerp(bb[0], bb[2], r()), y = lerp(bb[1], bb[3], r()), a0 = r() * 6.3, R = rr * (0.6 + r() * 0.7); ctx.moveTo(x + Math.cos(a0) * R, y + Math.sin(a0) * R); ctx.arc(x, y, R, a0, a0 + 3.9); }
  ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1;
}
function furBand(P, w, col, colD, colL, key, o = {}) {              // мягкая меховая опушка вдоль линии (без колючек)
  const C = spline(P, false, 6), T = wobP(tubeP(C, w, o.w1 ?? w), o.amp ?? 2, key);
  const sp = shape(T, { wash: col, washA: 0.99, w: o.lw ?? 2.2, col: o.lc || '#5a4a38', a: 0.55, key });
  shadeG(sp.path, 0, sp.bb[3], 0, sp.bb[1], colD, o.sh ?? 0.4);
  if (o.curl) curls(sp.path, sp.bb, o.n ?? Math.round(w * C.length * 0.08), colD, 0.55, key + 1, o.cr ?? 3.6);
  fstr(sp.path, sp.bb, o.n ?? 40, o.ang ?? 1.4, o.len ?? 8, colL, 0.65, key + 2, 2);
  return sp;
}
const MAILPAT = {};
function mailTex(path, bb, key, r0 = 3.4) {                          // кольчуга: ряды колец со светом сверху (плитка-паттерн, кэш)
  const k = r0.toFixed(1); let pt = MAILPAT[k];
  if (!pt) { const Q = 4, st = r0 * 2.05, rs = r0 * 1.62, c = document.createElement('canvas'); c.width = Math.round(st * Q); c.height = Math.round(rs * 2 * Q); const g = c.getContext('2d'); g.scale(c.width / st, c.height / (rs * 2));
    for (const [x0, y0] of [[0, 0], [st, 0], [st / 2, rs], [0, rs * 2], [st, rs * 2]]) for (const dx of [-st, 0, st]) { const x = x0 + dx, y = y0; g.beginPath(); g.ellipse(x, y, r0, r0 * 0.78, 0, 0, 6.283); g.lineWidth = 1.25; g.strokeStyle = 'rgba(26,28,32,0.75)'; g.stroke(); g.beginPath(); g.ellipse(x, y, r0, r0 * 0.78, 0, 3.5, 5.5); g.lineWidth = 0.9; g.strokeStyle = 'rgba(244,248,252,0.78)'; g.stroke(); }
    pt = MAILPAT[k] = { c, sx: st / c.width, sy: rs * 2 / c.height }; }
  const pat = ctx.createPattern(pt.c, 'repeat'); pat.setTransform(new DOMMatrix([pt.sx, 0, 0, pt.sy, bb[0], bb[1]]));
  ctx.save(); ctx.fillStyle = pat; ctx.fill(path); ctx.restore();
}
function brocade(path, bb, col, step = 30) {                          // парча: золотые «цветки» в шахматку
  ctx.save(); ctx.clip(path); ctx.fillStyle = col; let row = 0;
  for (let y = bb[1] + 8; y < bb[3]; y += step * 0.8, row++) for (let x = bb[0] + (row % 2) * step / 2; x < bb[2]; x += step) {
    ctx.globalAlpha = 0.75; for (let k = 0; k < 4; k++) { const a = k * 1.5708 + 0.785; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 4.2, y + Math.sin(a) * 4.2, 3.6, 1.8, a, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.globalAlpha = 1;
}
function pearlDot(x, y, r = 3.2) { ctx.fillStyle = 'rgba(40,24,10,0.45)'; ctx.beginPath(); ctx.arc(x + 0.8, y + 1, r, 0, 6.283); ctx.fill(); ctx.fillStyle = CU.pearl; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.35, 0, 6.283); ctx.fill(); }
function gem(x, y, r, col = CU.ruby) { ell(x, y, r + 3, r + 3, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD }); ell(x, y, r, r, { wash: col, washA: 1, w: 1.2, col: '#3a0a0a', a: 0.7 }); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.4, r * 0.3, 0, 6.283); ctx.fill(); }
function goldBand(P, w, key, o = {}) {                                // золотое шитьё: кайма, ромбы, жемчуг, камни
  const C = spline(P, false, 6), sp = shape(tubeP(C, w, w), { wash: CU.gold, washA: 1, w: 2, col: CU.goldD, a: 0.85, key });
  shadeG(sp.path, 0, sp.bb[3], 0, sp.bb[1], CU.goldD, 0.35);
  for (const sd of [-1, 1]) pencil(edgeOff(C, sd * w * 0.3), { w: 1.3, col: CU.goldD, a: 0.75, pass2: false, gap: false });
  const R = resample(C, w * 0.85); ctx.fillStyle = CU.goldD;
  R.forEach(([x, y], i) => { if (i % 2) { ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.moveTo(x, y - w * 0.22); ctx.lineTo(x + w * 0.2, y); ctx.lineTo(x, y + w * 0.22); ctx.lineTo(x - w * 0.2, y); ctx.closePath(); ctx.fill(); } else { ctx.globalAlpha = 0.9; ctx.fillStyle = CU.goldL; ctx.beginPath(); ctx.arc(x, y, w * 0.1, 0, 6.283); ctx.fill(); ctx.fillStyle = CU.goldD; } });
  ctx.globalAlpha = 1;
  if (o.pearls) for (const sd of [-1, 1]) resample(edgeOff(C, sd * w * 0.5), w * 0.55).forEach(([x, y], i) => i % 2 || pearlDot(x, y, w * 0.12));
  if (o.gems) R.forEach(([x, y], i) => { if (i % 6 === 3) gem(x, y, w * 0.18, (i / 6) % 2 < 1 ? CU.ruby : '#1a7a4a'); });
  return sp;
}
function dashL(pts, col, a = 0.7, w = 1.4, on = 2) { const R = resample(pts, 4); for (let i = 0; i < R.length - 1; i += on + 1) pencil([R[i], R[Math.min(R.length - 1, i + on)]], { w, col, a, pass2: false, gap: false, taper: false, jit: 0.4 }); }   // строчка
function limeSplash(path, bb, n, seed, col = CU.lime) {              // брызги извести: клякса + капли + потёк
  const r = rng(seed); ctx.save(); if (path) ctx.clip(path); ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const x = lerp(bb[0], bb[2], r()), y = lerp(bb[1], bb[3], r()), R = 4 + r() * 7; ctx.globalAlpha = 0.92; ctx.beginPath();
    for (let k = 0; k <= 10; k++) { const a = k / 10 * 6.283, rr = R * (0.65 + 0.5 * Math.abs(Math.sin(k * 2.7 + i))); k ? ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + rr, y); } ctx.fill();
    for (let k = 0; k < 3; k++) { const a = r() * 6.283, d = R * (1.4 + r()); ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 1 + r() * 1.8, 0, 6.283); ctx.fill(); }
    if (r() < 0.5) { const L = 8 + r() * 14; ctx.beginPath(); ctx.moveTo(x - 1.6, y); ctx.lineTo(x + 1.6, y); ctx.lineTo(x + 1, y + L); ctx.arc(x, y + L, 1.8, 0, 3.14); ctx.closePath(); ctx.fill(); } }
  ctx.restore(); ctx.globalAlpha = 1;
}
function metroM(x, y, r, badge = true) {                              // красная «М» метро (на белом кружке-значке)
  if (badge) { ell(x, y, r, r, { wash: '#f4f0e6', washA: 1, w: 1.8, col: TM.line, a: 0.8 }); }
  const u = badge ? r * 0.62 : r, M = [[-1, 0.85], [-0.56, -0.85], [-0.36, -0.85], [0, 0.2], [0.36, -0.85], [0.56, -0.85], [1, 0.85], [0.7, 0.85], [0.44, -0.12], [0.1, 0.78], [-0.1, 0.78], [-0.44, -0.12], [-0.7, 0.85]];
  poly(M.map(([a, b2]) => [x + a * u, y + b2 * u]), { wash: '#d4232a', washA: 1, w: badge ? 1.2 : 2, col: '#6a0a0e', a: 0.7 });
  pencil([[x - u * 1.12, y + u * 0.92], [x - u * 0.58, y + u * 0.92]], { w: badge ? 1.6 : 2.6, col: '#d4232a', pass2: false, gap: false, taper: false }); pencil([[x + u * 0.58, y + u * 0.92], [x + u * 1.12, y + u * 0.92]], { w: badge ? 1.6 : 2.6, col: '#d4232a', pass2: false, gap: false, taper: false });
}
function skirt6(OF, b, L, y0, y1, w0, w1, key, col) {               // подол длинной одежды (поверх ног)
  const P = [[-w0, y0 + b], [w0, y0 + b], [w1 * 0.97, (y0 + y1) / 2 + b], [w1, y1 + b], [w1 * 0.5, y1 + 4 + b], [0, y1 + 2 + b], [-w1 * 0.5, y1 + 4 + b], [-w1, y1 + b], [-w1 * 0.97, (y0 + y1) / 2 + b]];
  const sp = spline(P, true, 6), s = shape(sp, { wash: col || OF.top, washA: 0.99, w: 3.2, col: TM.line, key });
  shadeG(s.path, -L.side * 110, 0, L.side * 60, 0, OF.topD, 0.7); shadeG(s.path, 0, y1 + b, 0, y0 + b, OF.topD, 0.25);
  for (const f of [-0.6, -0.2, 0.25, 0.65]) pencil([[f * w0, y0 + 14 + b], [f * w1 * 1.04, y1 - 4 + b]], { w: 1.8, col: OF.topD, a: 0.5, pass2: false });
  rimL(sp.filter(p => p[1] > y0 + b + 4), L.side, L.rim, 0.6, 3);
  s.pts = sp; return s;
}
function nb(x, y, r = 4.5, col = CU.gold) { ell(x, y, r, r, { wash: col, washA: 1, w: 1.2, col: CU.goldD, a: 0.8 }); ctx.fillStyle = 'rgba(255,250,220,0.8)'; ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.35, r * 0.3, 0, 6.283); ctx.fill(); }   // пуговица/заклёпка

function diverPlate(b, L) {                                      // медный корселет водолаза (рисуется и поверх ближнего рукава)
    const CP = [[-108, -246 + b], [-64, -268 + b], [64, -268 + b], [108, -246 + b], [104, -214 + b], [64, -192 + b], [0, -182 + b], [-64, -192 + b], [-104, -214 + b]];
    pencil(spline([[-108, -214 + b], [-64, -188 + b], [0, -176 + b], [64, -188 + b], [108, -214 + b]], false, 8), { w: 8, col: '#24201c', a: 0.85, pass2: false });   // резиновый фланец
    const cs = blob(CP, { wash: CU.copper, washA: 1, w: 3, col: TM.line, key: 304 });
    metalG(cs.path, L.side * 50, -236 + b, 150, CU.copperL, CU.copper, CU.copperD); hatch(cs.path, cs.bb, { gap: 5, a: 0.16, col: CU.copperD, ang: -1.1, key: 305 });
    pencil(spline([[-96, -222 + b], [-60, -202 + b], [0, -194 + b], [60, -202 + b], [96, -222 + b]], false, 8), { w: 1.6, col: CU.copperD, a: 0.6, pass2: false });
    for (const [x, y] of [[-92, -218], [-56, -200], [-18, -192], [18, -192], [56, -200], [92, -218]]) { ell(x, y + b, 6, 5, { wash: CU.goldL, washA: 1, w: 1.4, col: CU.goldD }); line([[x - 7, y - 3 + b], [x + 7, y + 3 + b]], { w: 3, col: CU.gold, pass2: false, smooth: false }); }
    rimL(spline(CP, true, 8), L.side, L.rim, 0.8, 3);
  
}
/* ---- 003 Киев: помощники */
function lis(x, y, s, col = CU.gold, colD = CU.goldD) {                   // геральдическая лилия
  push(x, y, s);
  for (const sd of [-1, 1]) blob([[sd * 4, 2], [sd * 14, -10], [sd * 24, -6], [sd * 22, 6], [sd * 12, 12], [sd * 5, 10]], { wash: col, washA: 1, w: 1.5, col: colD });
  blob([[0, -26], [8, -12], [6, 6], [0, 14], [-6, 6], [-8, -12]], { wash: col, washA: 1, w: 1.5, col: colD });
  rect(-12, 8, 24, 6, { wash: col, washA: 1, w: 1.3, col: colD });
  blob([[-5, 14], [5, 14], [8, 26], [0, 21], [-8, 26]], { wash: col, washA: 1, w: 1.4, col: colD });
  pop();
}
function embroid(P, w, key, col = '#b8302a', base = '#efe8d6') {          // вышивка: полоса с ромбами
  const C = spline(P, false, 6), sp = shape(tubeP(C, w, w), { wash: base, washA: 1, w: 1.6, col: '#7a2a22', a: 0.6, key });
  for (const sd of [-1, 1]) pencil(edgeOff(C, sd * w * 0.38), { w: 1.8, col, a: 0.95, pass2: false, gap: false });
  const R = resample(C, w * 1.05), r = w * 0.27;
  R.forEach(([x, y]) => { ctx.globalAlpha = 0.95; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath(); ctx.fill(); ctx.fillStyle = base; ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, 6.283); ctx.fill(); });
  ctx.globalAlpha = 1; return sp;
}
/* ---- детали туловища новых костюмов (вызываются из costume5 по OF.detail) */
const COST6 = {
  diver(OF, b, t, bp, L) {                                             // водолаз: брезент, пояс с ножом, груз, медная манишка (корселет)
    hatch(bp.path, bp.bb, { gap: 5, a: 0.18, col: OF.topD, ang: 0.8, key: 301, w: 1.6 }); hatch(bp.path, bp.bb, { gap: 7, a: 0.14, col: OF.topL, ang: -0.8, key: 302, w: 1.4 });
    for (const sx of [-44, 46]) { pencil([[sx, -196 + b], [sx * 1.08, -90 + b]], { w: 2, col: OF.topD, a: 0.6, pass2: false }); dashL([[sx + 5, -196 + b], [sx * 1.08 + 5, -92 + b]], OF.topD, 0.6); }
    rect(-90, -124 + b, 180, 18, { wash: '#4a3420', washA: 0.98, w: 2.2, col: TM.line, key: 303 }); rect(-12, -127 + b, 24, 24, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); rect(-6, -121 + b, 12, 12, { wash: '#4a3420', washA: 1, w: 1.2, col: CU.goldD });
    push(64, -112 + b, 1, -0.3); blob([[-9, 0], [9, 0], [8, 54], [0, 66], [-8, 54]], { wash: CU.copper, washA: 1, w: 2.2, col: TM.line }); shadeG(pathOf([[-10, 0], [10, 0], [10, 66], [-10, 66]]), 10, 0, -10, 0, CU.copperD, 0.5); rect(-8, -26, 16, 26, { wash: CU.wood, washA: 1, w: 2, col: TM.line }); rect(-11, -4, 22, 6, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD }); pop();
    for (const sx of [-24, 24]) line([[sx, -190 + b], [sx * 1.1, -168 + b]], { w: 3, col: '#2a2a2a', pass2: false });
    const wt = blob([[-36, -172 + b], [36, -172 + b], [40, -150 + b], [24, -130 + b], [0, -124 + b], [-24, -130 + b], [-40, -150 + b]], { wash: CU.lead, washA: 1, w: 2.6, col: TM.line, key: 306 });
    metalG(wt.path, L.side * 14, -160 + b, 46, '#a8acb2', CU.lead, '#2a2c30', 0.9); pencil(spline([[-28, -166 + b], [28, -166 + b], [30, -150 + b], [0, -132 + b], [-30, -150 + b]], true, 6), { w: 1.4, col: '#2a2c30', a: 0.6, pass2: false });
    diverPlate(b, L);
  },
  tulup(OF, b, t, bp, L) {                                            // овчинный тулуп: мех наружу по краям, отворот, кушак
    const sk = skirt6(OF, b, L, -118, -34, 90, 106, 330);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 7, a: 0.14, col: OF.topD, ang: 1.2, key: 331 });
    for (const sx of [-58, 62]) dashL([[sx, -200 + b], [sx * 1.12, -44 + b]], OF.topD, 0.55);
    for (let k = 0; k < 3; k++) { const y = -80 + k * 12; pencil([[-96 + k * 2, y + b], [-30, y + 6 + b]], { w: 1.6, col: '#7a2a1a', a: 0.45, pass2: false }); }   // тиснение у подола
    const CR = '#efe4cc', CRD = '#b8a888', CRL = '#ffffff';
    furBand([[-104, -40 + b], [-50, -32 + b], [0, -30 + b], [50, -32 + b], [106, -40 + b]], 20, CR, CRD, CRL, 332, { curl: 1, n: 70 });
    furBand([[-2, -232 + b], [8, -170 + b], [14, -100 + b], [20, -36 + b]], 22, CR, CRD, CRL, 333, { curl: 1, n: 70, ang: 1.5 });
    const col = softShape([[-96, -250 + b], [-40, -264 + b], [40, -264 + b], [96, -250 + b], [88, -222 + b], [46, -198 + b], [10, -176 + b], [-26, -200 + b], [-82, -222 + b]], { wash: CR, washA: 1, w: 2.4, col: '#6a5a44', a: 0.6, key: 334 }, 2.4, 3);
    shadeG(col.path, -L.side * 100, 0, L.side * 60, 0, CRD, 0.6); curls(col.path, col.bb, 120, CRD, 0.6, 335, 4); fstr(col.path, col.bb, 50, 1.2, 8, CRL, 0.7, 336, 2);
    const sh = poly([[-96, -132 + b], [96, -132 + b], [98, -110 + b], [-98, -110 + b]], { wash: CU.red, washA: 1, w: 2.4, col: TM.line, key: 337 });
    shadeG(sh.path, 0, -110 + b, 0, -132 + b, '#5a0e0a', 0.4); for (const yy of [-126, -116]) pencil([[-96, yy + b], [96, yy + b]], { w: 1.6, col: '#e8c050', a: 0.7, pass2: false });
    for (const [x0, a] of [[56, 0.1], [68, -0.2]]) { const E = spline([[x0, -116 + b], [x0 + 6 + a * 20, -90 + b], [x0 + 4 + a * 30, -64 + b]], false, 6); shape(tubeP(E, 13, 11), { wash: CU.red, washA: 1, w: 2, col: TM.line }); const e = E[E.length - 1]; for (let k = -2; k <= 2; k++) line([[e[0] + k * 2.4, e[1]], [e[0] + k * 2.8, e[1] + 12]], { w: 1.6, col: '#e8c050', pass2: false, smooth: false }); }
    ell(60, -120 + b, 12, 10, { wash: CU.red, washA: 1, w: 2.2, col: TM.line });
  },
  knyaz(OF, b, t, bp, L) {                                            // княжий кафтан: парча, ожерелье с жемчугом, шитая кайма, пояс
    brocade(bp.path, bp.bb, CU.gold, 28);
    const sk = skirt6(OF, b, L, -116, -32, 90, 102, 341); brocade(sk.path, sk.bb, CU.gold, 28); shadeG(sk.path, -L.side * 110, 0, L.side * 60, 0, OF.topD, 0.35);
    shadeG(bp.path, -L.side * 100, -160, L.side * 60, -160, OF.topD, 0.35);
    goldBand([[-102, -42 + b], [-50, -36 + b], [0, -34 + b], [50, -36 + b], [102, -42 + b]], 18, 344, { pearls: 1 });
    goldBand([[2, -226 + b], [3, -160 + b], [5, -44 + b]], 20, 343, { gems: 1 });
    const bl = rect(-92, -128 + b, 184, 16, { wash: '#3a1e10', washA: 1, w: 2.2, col: TM.line, key: 345 });
    for (let x = -80; x <= 80; x += 20) { rect(x - 6, -127 + b, 12, 14, { wash: CU.gold, washA: 1, w: 1.2, col: CU.goldD }); }
    line([[-60, -112 + b], [-62, -86 + b]], { w: 2.4, col: CU.gold, pass2: false }); nb(-62, -84 + b, 5);
    const O = [], I = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI; O.push([Math.cos(a) * 98, -244 + b + Math.sin(a) * 46]); I.unshift([Math.cos(a) * 60, -252 + b + Math.sin(a) * 22]); }
    const cl = shape(O.concat(I, [O[0]]), { wash: CU.gold, washA: 1, w: 2.4, col: CU.goldD, key: 346 }); metalG(cl.path, L.side * 40, -240 + b, 110, CU.goldL, CU.gold, '#8a6018');
    pencil(spline(O.map(([x, y]) => [x * 0.82, -248 + b + (y + 248 - b) * 0.74]), false, 4), { w: 1.4, col: CU.goldD, a: 0.7, pass2: false });
    O.forEach(([x, y], i) => i % 2 || pearlDot(x * 0.96, -244 + b + (y + 244 - b) * 0.94, 3.6));
    for (const i of [3, 6, 8, 10, 13]) { const a = i / 16 * Math.PI; gem(Math.cos(a) * 80, -248 + b + Math.sin(a) * 34, 4.4, i % 2 ? '#1a7a4a' : CU.ruby); }
  },
  mail(OF, b, t, bp, L) {                                             // кольчуга до бёдер, красная рубаха под ней, пояс, меч
    poly([[-96, -86 + b], [96, -86 + b], [100, -40 + b], [0, -36 + b], [-100, -40 + b]], { wash: '#8a2a22', washA: 1, w: 2.6, col: TM.line, key: 350, shade: { gap: 6, a: 0.18, col: '#2a0806' } });
    const sk = skirt6(OF, b, L, -116, -54, 90, 100, 351);
    mailTex(bp.path, bp.bb, 352); mailTex(sk.path, sk.bb, 353);
    shadeG(bp.path, -L.side * 100, -160, L.side * 60, -160, OF.topD, 0.55); shadeG(sk.path, -L.side * 110, 0, L.side * 60, 0, OF.topD, 0.55);
    for (let x = -96; x <= 96; x += 8) { ctx.strokeStyle = 'rgba(30,32,36,0.8)'; ctx.lineWidth = 1.6 / S; ctx.beginPath(); ctx.arc(x, -54 + b + Math.abs(x) * 0.04, 4, 0.2, 2.94); ctx.stroke(); }
    rect(-92, -130 + b, 184, 16, { wash: '#4a2c16', washA: 1, w: 2.2, col: TM.line, key: 354 }); for (let x = -76; x <= 76; x += 19) if (Math.abs(x) > 14) nb(x, -122 + b, 3.6);
    rect(-13, -134 + b, 26, 24, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); rect(-7, -128 + b, 14, 12, { wash: '#4a2c16', washA: 1, w: 1.2, col: CU.goldD });
    push(-74, -118 + b, 1, -0.55); rect(-5, -46, 10, 40, { wash: '#4a2c16', washA: 1, w: 2, col: TM.line }); for (let y = -42; y < -8; y += 6) pencil([[-5, y], [5, y + 3]], { w: 1.4, col: CU.gold, a: 0.8, pass2: false, gap: false });
    blob([[-30, -6], [30, -6], [34, 2], [-34, 2]], { wash: CU.steel, washA: 1, w: 2, col: TM.line }); ell(0, -54, 9, 8, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); pop();
  },
  master(OF, b, t, bp, L) {                                           // зодчий-итальянец: дублет с прорезями, рубаха, баски, циркуль
    const sk = skirt6(OF, b, L, -114, -68, 88, 100, 370);
    for (const x of [-62, -32, 0, 32, 64]) pencil([[x, -108 + b], [x * 1.1, -70 + b]], { w: 2, col: TM.line, a: 0.6, pass2: false });
    hatch(bp.path, bp.bb, { gap: 6, a: 0.12, col: OF.topL, ang: -1.3, key: 371, w: 1.6 });
    const sh = blob([[-58, -250 + b], [58, -250 + b], [46, -226 + b], [0, -214 + b], [-46, -226 + b]], { wash: OF.shirt, washA: 1, w: 2.2, col: TM.line, key: 372 });
    for (let x = -44; x <= 44; x += 8) pencil([[x, -246 + b], [x * 0.9, -228 + b + Math.abs(x) * 0.0]], { w: 1.2, col: '#a89c84', a: 0.7, pass2: false, gap: false });
    pencil(spline([[-52, -240 + b], [0, -224 + b], [52, -240 + b]], false, 8), { w: 3, col: '#c8a868', a: 0.9, pass2: false });
    pencil([[0, -216 + b], [2, -112 + b]], { w: 2.4, col: TM.line, a: 0.8, pass2: false }); for (let k = 0; k < 7; k++) nb(2, -206 + k * 14 + b, 3.4);
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const x = s * (34 + k * 15), y = -184 + b; ell(x, y, 3.6, 16, { wash: OF.slash, washA: 1, w: 1.4, col: TM.line, a: 0.7 }); ell(x, y + 40, 3.4, 13, { wash: OF.slash, washA: 1, w: 1.4, col: TM.line, a: 0.7 }); }
    rect(-90, -120 + b, 180, 10, { wash: '#3a2414', washA: 1, w: 2, col: TM.line, key: 373 }); rect(-8, -123 + b, 16, 16, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD });
    push(-64, -110 + b, 1, 0.05); blob([[-16, 0], [16, 0], [18, 26], [0, 32], [-18, 26]], { wash: '#5a3420', washA: 1, w: 2.2, col: TM.line, shade: { gap: 5, a: 0.2 } }); line([[-14, 6], [0, 12], [14, 6]], { w: 1.6, pass2: false }); pop();
    push(62, -112 + b, 1, -0.12 + Math.sin(t * 1.3) * 0.05); line([[0, 0], [0, 10]], { w: 2, col: '#3a2414', pass2: false }); for (const sd of [-1, 1]) poly([[0, 12], [sd * 3, 12], [sd * 16, 74], [sd * 13, 76]], { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD });
    pencil(spline([[-9, 44], [0, 48], [9, 44]], false, 6), { w: 1.8, col: CU.goldD, pass2: false }); ell(0, 14, 6, 6, { wash: CU.goldL, washA: 1, w: 1.6, col: CU.goldD }); pop();
  },
  painter(OF, b, t, bp, L) {                                          // маляр: косоворотка навыпуск, пояс-верёвка, холщовый фартук в извести
    const sk = skirt6(OF, b, L, -114, -62, 88, 98, 380);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 6, a: 0.12, col: OF.topD, ang: 1.3, key: 381, w: 1.4 });
    const hem = resample([[-96, -70 + b], [96, -70 + b]], 8); for (let i = 0; i < hem.length - 1; i++) pencil([hem[i], [hem[i][0] + 4, hem[i][1] + (i % 2 ? -5 : 5)]], { w: 2, col: CU.red, a: 0.85, pass2: false, gap: false, taper: false });
    poly([[-48, -250 + b], [48, -250 + b], [44, -236 + b], [-44, -236 + b]], { wash: CU.red, washA: 1, w: 2, col: TM.line }); for (let x = -40; x <= 40; x += 8) ell(x, -243 + b, 2, 2, { wash: '#f0e0b0', washA: 1, line: false });
    const pk = poly([[18, -238 + b], [32, -238 + b], [34, -190 + b], [20, -190 + b]], { wash: CU.red, washA: 1, w: 1.8, col: TM.line }); for (let k = 0; k < 3; k++) nb(26, -228 + k * 14 + b, 3, '#f0e6d0');
    const AP = [[-60, -198 + b], [60, -198 + b], [64, -130 + b], [74, -46 + b], [0, -42 + b], [-74, -46 + b], [-64, -130 + b]];
    const ap = blob(AP, { wash: '#a8926a', washA: 1, w: 2.8, col: TM.line, key: 382 }); shadeG(ap.path, -L.side * 80, 0, L.side * 60, 0, '#4a3c24', 0.6); hatch(ap.path, ap.bb, { gap: 4, a: 0.16, col: '#5a5038', ang: 0.05, key: 383, w: 1.2 });
    for (const sd of [-1, 1]) pencil([[sd * 56, -196 + b], [sd * 40, -252 + b]], { w: 3, col: '#a89c7c', pass2: false });
    pencil([[-64, -130 + b], [-90, -126 + b]], { w: 2.4, col: '#a89c7c', pass2: false }); pencil([[64, -130 + b], [90, -126 + b]], { w: 2.4, col: '#a89c7c', pass2: false });
    limeSplash(ap.path, ap.bb, 9, 384); limeSplash(bp.path, [-90, -230 + b, 90, -100 + b], 3, 385);
    pencil(spline([[-92, -118 + b], [0, -114 + b], [92, -118 + b]], false, 8), { w: 5, col: '#c8a868', pass2: false }); for (const x0 of [-62, -54]) { line([[x0, -116 + b], [x0 - 4, -88 + b]], { w: 3, col: '#c8a868', pass2: false }); for (let k = -1; k <= 1; k++) line([[x0 - 4, -88 + b], [x0 - 4 + k * 3, -76 + b]], { w: 1.4, col: '#a88848', pass2: false, smooth: false }); }
  },
  founder(OF, b, t, bp, L) {                                          // литейщик: рубаха с разрезом, кожаный фартук с прожогами
    pencil([[0, -250 + b], [2, -214 + b]], { w: 2.2, col: TM.line, a: 0.7, pass2: false }); line([[2, -232 + b], [12, -222 + b], [8, -206 + b]], { w: 1.6, col: '#8a6a44', pass2: false });
    hatch(bp.path, bp.bb, { gap: 6, a: 0.12, col: OF.topD, ang: 1.3, key: 391, w: 1.4 });
    const AP = [[-62, -214 + b], [62, -214 + b], [68, -150 + b], [86, -80 + b], [92, -32 + b], [0, -26 + b], [-92, -32 + b], [-86, -80 + b], [-68, -150 + b]];
    const ap = blob(AP, { wash: '#5c3a20', washA: 1, w: 3, col: TM.line, key: 390 });
    shadeG(ap.path, -L.side * 100, 0, L.side * 70, 0, '#24140a', 0.7); hatch(ap.path, ap.bb, { gap: 6, a: 0.14, col: '#1e1008', ang: -1.2, key: 392 });
    for (const [x0, y0, x1, y1] of [[L.side * 30, -200, L.side * 40, -120], [L.side * 44, -110, L.side * 56, -50]]) pencil([[x0, y0 + b], [x1, y1 + b]], { w: 6, col: '#a87a52', a: 0.35, pass2: false });
    const R = rng(393); for (let k = 0; k < 5; k++) { const x = (R() - 0.5) * 120, y = -196 + R() * 150, rr = 4 + R() * 7; const g = ctx.createRadialGradient(x, y + b, rr * 0.3, x, y + b, rr * 2.4); g.addColorStop(0, 'rgba(14,8,4,0.95)'); g.addColorStop(0.35, 'rgba(40,20,8,0.7)'); g.addColorStop(0.7, 'rgba(140,90,50,0.35)'); g.addColorStop(1, 'rgba(140,90,50,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y + b, rr * 2.4, rr * 1.8, R() * 3, 0, 6.283); ctx.fill();
      if (k % 3 === 0) { ctx.fillStyle = '#000'; ctx.beginPath(); for (let q = 0; q <= 7; q++) { const a = q / 7 * 6.283, r2 = rr * (0.3 + 0.25 * Math.abs(Math.sin(q * 2.1 + k))); q ? ctx.lineTo(x + Math.cos(a) * r2, y + b + Math.sin(a) * r2) : ctx.moveTo(x + r2, y + b); } ctx.fill(); } }
    dashL(edgeOff(spline(AP.slice(1, 5), false, 6), -8), '#c8a070', 0.55); dashL(edgeOff(spline([AP[0], AP[8], AP[7], AP[6]], false, 6), 8), '#c8a070', 0.55);
    for (const sd of [-1, 1]) pencil([[sd * 54, -212 + b], [sd * 34, -254 + b]], { w: 5, col: '#4a2c16', pass2: false });
    rect(14, -160 + b, 40, 32, { wash: '#4a2c16', washA: 1, w: 2, col: TM.line }); dashL([[18, -156 + b], [50, -156 + b]], '#c8a070', 0.6);
  },
  hussar(OF, b, t, bp, L) {                                           // гусар 1812: доломан с бранденбурами, кушак, ментик на плече, ташка
    const C = OF.cord;
    for (let i = 0; i < 6; i++) { const y = -222 + i * 19 + b, w = 54 - i * 2;
      for (const [w_, c_, a_] of [[5.5, '#3a1a08', 0.55], [3.2, C, 1]]) pencil(spline([[-w, y], [-w * 0.5, y + 2], [0, y], [w * 0.5, y + 2], [w, y]], false, 4), { w: w_, col: c_, a: a_, pass2: false, gap: false });
      for (const sd of [-1, 1]) { ctx.strokeStyle = C; ctx.lineWidth = 2.4 / S; ctx.beginPath(); ctx.ellipse(sd * (w + 5), y, 6, 4, 0, 0, 6.283); ctx.stroke(); }
      for (const x of [-30, 0, 30]) nb(x * (w / 54), y, 3.8); }
    poly([[-50, -254 + b], [50, -254 + b], [48, -238 + b], [-48, -238 + b]], { wash: OF.top, washA: 1, w: 2, col: TM.line }); pencil([[-48, -240 + b], [48, -240 + b]], { w: 2.4, col: C, pass2: false });
    const sh = poly([[-92, -112 + b], [92, -112 + b], [94, -92 + b], [-94, -92 + b]], { wash: '#b02030', washA: 1, w: 2.2, col: TM.line, key: 400 });
    for (let x = -84; x <= 84; x += 14) rect(x - 4, -111 + b, 8, 18, { wash: C, washA: 1, w: 1, col: CU.goldD, a: 0.7 });
    for (const x0 of [66, 74]) { line([[x0, -96 + b], [x0 + 2, -66 + b]], { w: 2.4, col: C, pass2: false }); blob([[x0 - 4, -68 + b], [x0 + 6, -68 + b], [x0 + 8, -50 + b], [x0 - 6, -50 + b]], { wash: C, washA: 1, w: 1.4, col: CU.goldD }); }
    for (const sd of [-1, 1]) line([[sd * 20 - 70, -96 + b], [sd * 10 - 72, -54 + b]], { w: 2.4, col: '#e8e0d0', pass2: false });
    const tk = rect(-96, -58 + b, 42, 46, { wash: '#b02030', washA: 1, w: 2.2, col: TM.line, key: 401 }); pencil([[-92, -54 + b], [-58, -54 + b], [-58, -16 + b], [-92, -16 + b], [-92, -54 + b]], { w: 2.6, col: C, pass2: false, gap: false }); line([[-84, -28 + b], [-75, -44 + b], [-66, -28 + b]], { w: 2.2, col: C, pass2: false }); nb(-75, -48 + b, 3, C);
    const MP = [[-102, -256 + b], [-34, -264 + b], [-30, -232 + b], [-46, -166 + b], [-72, -112 + b], [-104, -106 + b], [-110, -180 + b]];
    const mt = blob(MP, { wash: '#1e2a5e', washA: 1, w: 2.6, col: TM.line, key: 402 }); shadeG(mt.path, -110, 0, -40, 0, '#0a1030', 0.6);
    for (let i = 0; i < 5; i++) pencil([[-98 + i * 2, -222 + i * 20 + b], [-48 - i * 5, -222 + i * 20 + b]], { w: 2.4, col: C, a: 0.9, pass2: false, gap: false });
    furBand([[-36, -262 + b], [-30, -232 + b], [-46, -166 + b], [-72, -112 + b], [-106, -106 + b]], 15, '#ece6d8', '#9a948a', '#ffffff', 403, { n: 60, len: 7 });
    pencil(spline([[-36, -246 + b], [10, -258 + b], [62, -246 + b]], false, 8), { w: 3, col: C, pass2: false });
  },
  metro(OF, b, t, bp, L) {                                            // метростроевец: брезентовая роба, карманы, ремень
    hatch(bp.path, bp.bb, { gap: 4, a: 0.16, col: OF.topD, ang: 0.8, key: 420, w: 1.4 }); hatch(bp.path, bp.bb, { gap: 6, a: 0.1, col: OF.topL, ang: -0.8, key: 421, w: 1.2 });
    for (const sd of [-1, 1]) poly([[sd * 60, -232 + b], [sd * 86, -196 + b], [sd * 70, -190 + b], [sd * 48, -226 + b]], { wash: OF.topD, washA: 0.5, w: 1.6, col: TM.line, a: 0.5 });
    for (const sd of [-1, 1]) { const P = [[sd * 6, -252 + b], [sd * 58, -256 + b], [sd * 64, -230 + b], [sd * 30, -206 + b], [sd * 4, -208 + b]]; poly(P, { wash: OF.top, washA: 1, w: 2.4, col: TM.line }); shadeG(pathOf(P), 0, -206 + b, 0, -256 + b, OF.topD, 0.45); dashL([[sd * 10, -248 + b], [sd * 52, -250 + b]], OF.topD, 0.6); }
    pencil([[0, -208 + b], [2, -88 + b]], { w: 2.2, col: OF.topD, a: 0.9, pass2: false }); for (let k = 0; k < 4; k++) ell(-6, -190 + k * 22 + b, 4, 4, { wash: '#2a2a20', washA: 1, w: 1.2 });
    for (const sd of [-1, 1]) { rect(sd * 44 - 20, -196 + b, 40, 34, { wash: OF.top, washA: 1, w: 2, col: TM.line }); dashL([[sd * 44 - 16, -192 + b], [sd * 44 - 16, -166 + b], [sd * 44 + 16, -166 + b], [sd * 44 + 16, -192 + b]], OF.topD, 0.6); poly([[sd * 44 - 22, -198 + b], [sd * 44 + 22, -198 + b], [sd * 44 + 20, -184 + b], [sd * 44 - 20, -184 + b]], { wash: OF.topL, washA: 0.6, w: 2, col: TM.line }); ell(sd * 44, -188 + b, 3, 3, { wash: '#2a2a20', washA: 1, w: 1 }); }
    metroM(-44, -210 + b, 8);
    rect(-92, -124 + b, 184, 18, { wash: '#3a2616', washA: 1, w: 2.2, col: TM.line, key: 422 }); rect(-14, -127 + b, 28, 24, { wash: 'rgba(0,0,0,0)', washA: 0, w: 3.6, col: '#8a8e92' }); pencil([[0, -126 + b], [0, -104 + b]], { w: 3, col: '#8a8e92', pass2: false });
  },
  aviator(OF, b, t, bp, L) {                                           // 1909: кожаная лётная куртка, меховой воротник, шарф, ремни
    const sk = skirt6(OF, b, L, -118, -76, 90, 98, 500);
    for (const P of [bp, sk]) { hatch(P.path, P.bb, { gap: 7, a: 0.16, col: OF.topD, ang: 1.15, key: 501, w: 1.5 }); hatch(P.path, P.bb, { gap: 9, a: 0.1, col: OF.topL, ang: -0.9, key: 502, w: 1.3 }); }
    for (const sd of [-1, 1]) pencil([[sd * 36, -238 + b], [sd * 70, -194 + b]], { w: 7, col: OF.topL, a: 0.32, pass2: false });
    pencil([[0, -224 + b], [3, -92 + b]], { w: 2.6, col: OF.topD, a: 0.95, pass2: false }); dashL([[8, -222 + b], [11, -94 + b]], '#d2a870', 0.75);
    for (let k = 0; k < 4; k++) nb(16, -200 + k * 26 + b, 3.6, CU.copperL);
    for (const sd of [-1, 1]) { poly([[sd * 28, -156 + b], [sd * 76, -152 + b], [sd * 78, -126 + b], [sd * 30, -130 + b]], { wash: OF.top, washA: 1, w: 2, col: TM.line }); dashL([[sd * 30, -149 + b], [sd * 74, -145 + b]], '#d2a870', 0.6); nb(sd * 54, -136 + b, 3, CU.copperL); }
    pencil([[-74, -238 + b], [58, -112 + b]], { w: 6, col: '#2a1608' }); dashL([[-72, -236 + b], [56, -112 + b]], '#c8964e', 0.5);
    rect(-92, -102 + b, 184, 20, { wash: OF.topD, washA: 1, w: 2.2, col: TM.line, key: 503 }); for (let x = -86; x <= 86; x += 8) pencil([[x, -100 + b], [x, -84 + b]], { w: 1.4, col: '#000', a: 0.35, pass2: false, gap: false });
    rect(-92, -128 + b, 184, 13, { wash: '#3a2410', washA: 1, w: 2, col: TM.line, key: 504 }); rect(-12, -131 + b, 24, 19, { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); rect(-6, -126 + b, 12, 9, { wash: '#3a2410', washA: 1, w: 1.2, col: CU.goldD });
    const fl = Math.sin(t * 3) * 5;
    blob([[-40, -248 + b], [-12, -244 + b], [-14, -196 + b + fl * 0.5], [-26, -160 + b + fl], [-46, -168 + b + fl], [-46, -206 + b]], { wash: '#f2ede0', washA: 1, w: 2.2, col: TM.line, key: 505, shade: { gap: 6, a: 0.1 } });
    furBand([[-96, -246 + b], [-52, -262 + b], [0, -268 + b], [52, -262 + b], [96, -246 + b]], 24, OF.furC, '#a8946e', '#fffaf0', 506, { curl: 1, n: 80 });
  },
  architect(OF, b, t, bp, L) {                                         // 1901: сюртук до бёдер, жилет, рубашка, цепочка часов
    const sk = skirt6(OF, b, L, -118, -50, 90, 104, 510);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 6, a: 0.14, col: OF.topD, ang: 1.25, key: 511, w: 1.4 });
    poly([[-34, -254 + b], [34, -254 + b], [30, -220 + b], [0, -196 + b], [-30, -220 + b]], { wash: OF.shirt, washA: 1, w: 2, col: TM.line, key: 512 });
    const vs = poly([[-46, -224 + b], [-14, -226 + b], [0, -198 + b], [14, -226 + b], [46, -224 + b], [50, -118 + b], [0, -100 + b], [-50, -118 + b]], { wash: '#bfa064', washA: 1, w: 2.2, col: TM.line, key: 513 });
    hatch(vs.path, vs.bb, { gap: 5, a: 0.16, col: '#5a4220', ang: 0.9, key: 514, w: 1.2 }); shadeG(vs.path, -L.side * 60, 0, L.side * 50, 0, '#5a4220', 0.35);
    for (const sd of [-1, 1]) poly([[sd * 4, -250 + b], [sd * 34, -256 + b], [sd * 26, -232 + b]], { wash: OF.shirt, washA: 1, w: 1.8, col: TM.line });
    for (const sd of [-1, 1]) { const lp = poly([[sd * 32, -254 + b], [sd * 74, -246 + b], [sd * 64, -196 + b], [sd * 30, -166 + b], [sd * 46, -222 + b]], { wash: OF.topL, washA: 1, w: 2.4, col: TM.line }); shadeG(lp.path, 0, -166 + b, 0, -254 + b, OF.topD, 0.4); }
    pencil([[-48, -222 + b], [-52, -120 + b]], { w: 2, col: OF.topD, a: 0.8, pass2: false }); pencil([[48, -222 + b], [52, -120 + b]], { w: 2, col: OF.topD, a: 0.8, pass2: false });
    for (let k = 0; k < 4; k++) nb(0, -184 + k * 21 + b, 3.2, CU.gold);
    line([[-50, -136 + b], [-24, -134 + b]], { w: 2, col: TM.line, pass2: false });
    pencil(spline([[-2, -190 + b], [-16, -158 + b], [-30, -146 + b], [-38, -136 + b]], false, 6), { w: 2.4, col: CU.gold, pass2: false }); ell(-40, -130 + b, 5, 6, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD });
    poly([[-64, -200 + b], [-44, -202 + b], [-48, -190 + b], [-56, -194 + b], [-62, -188 + b]], { wash: '#f4f0e6', washA: 1, w: 1.4, col: TM.line });
    for (const sd of [-1, 1]) { rect(sd * 62 - 16, -112 + b, 32, 12, { wash: OF.topD, washA: 0.9, w: 1.8, col: TM.line }); nb(sd * 62, -106 + b, 2.6); }
  },
  bogatyr(OF, b, t, bp, L) {                                           // богатырь: кольчуга с зубцами по подолу, красная рубаха, зерцало, пояс с бляхами
    const sk = skirt6(OF, b, L, -118, -44, 90, 104, 520, '#a8302a');
    hatch(sk.path, sk.bb, { gap: 6, a: 0.14, col: '#3a0806', ang: 1.3, key: 521, w: 1.4 });
    goldBand([[-102, -52 + b], [-50, -46 + b], [0, -44 + b], [50, -46 + b], [102, -52 + b]], 13, 522, {});
    mailTex(bp.path, bp.bb, 523, 3.4); shadeG(bp.path, -L.side * 100, -160, L.side * 60, -160, OF.topD, 0.55);
    const zp = [[-96, -124 + b], [96, -124 + b]]; for (let x = 104; x >= -104; x -= 26) zp.push([x, -84 + b + (Math.round(x / 26) % 2 ? 0 : 14)]);
    const mk = poly(zp, { wash: OF.top, washA: 1, w: 2.6, col: TM.line, key: 524 }); mailTex(mk.path, mk.bb, 525, 3.4); shadeG(mk.path, -L.side * 110, 0, L.side * 60, 0, OF.topD, 0.5); shadeG(mk.path, 0, -70 + b, 0, -124 + b, '#14181c', 0.3);
    const zc = ell(0, -184 + b, 31, 31, { wash: CU.steel, washA: 1, w: 2.4, col: TM.line, key: 526 }); metalG(zc.path, -8, -194 + b, 44, CU.steelL, CU.steel, CU.steelD);
    pencil(ellPts(0, -184 + b, 31, 31, 0, 0.05, 40), { w: 4.4, col: CU.gold, pass2: false }); pencil(ellPts(0, -184 + b, 22, 22, 0, 0.05, 36), { w: 1.2, col: CU.steelD, a: 0.7, pass2: false });
    pencil([[0, -204 + b], [0, -164 + b]], { w: 2.2, col: CU.goldD, a: 0.9, pass2: false }); pencil([[-18, -188 + b], [18, -188 + b]], { w: 2.2, col: CU.goldD, a: 0.9, pass2: false });
    blob([[-52, -254 + b], [52, -254 + b], [42, -234 + b], [0, -224 + b], [-42, -234 + b]], { wash: '#a8302a', washA: 1, w: 2.2, col: TM.line, key: 527 }); pencil(spline([[-48, -246 + b], [0, -230 + b], [48, -246 + b]], false, 6), { w: 3, col: CU.gold, pass2: false });
    rect(-95, -136 + b, 190, 20, { wash: '#4a2a14', washA: 1, w: 2.4, col: TM.line, key: 528 });
    for (let x = -80; x <= 80; x += 22) if (Math.abs(x) > 18) { ell(x, -126 + b, 8.6, 8.6, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD }); ell(x, -126 + b, 3.4, 3.4, { wash: CU.goldL, washA: 1, w: 1, col: CU.goldD }); }
    rect(-16, -142 + b, 32, 32, { wash: CU.gold, washA: 1, w: 2.2, col: CU.goldD }); rect(-9, -135 + b, 18, 18, { wash: '#4a2a14', washA: 1, w: 1.4, col: CU.goldD });
    line([[70, -118 + b], [76, -88 + b]], { w: 6, col: '#4a2a14', pass2: false }); nb(76, -86 + b, 5);
  },
  french(OF, b, t, bp, L) {                                            // 1063: блио до колен, золотая кайма, лилии
    const sk = skirt6(OF, b, L, -118, -34, 90, 106, 530);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 7, a: 0.12, col: OF.topD, ang: 1.2, key: 531, w: 1.4 });
    shadeG(sk.path, 0, -34 + b, 0, -118 + b, OF.topD, 0.2);
    goldBand([[-104, -42 + b], [-52, -36 + b], [0, -34 + b], [52, -36 + b], [104, -42 + b]], 15, 532, { pearls: 1 });
    goldBand([[-64, -254 + b], [-32, -238 + b], [0, -232 + b], [32, -238 + b], [64, -254 + b]], 13, 533, {});
    rect(-92, -134 + b, 184, 15, { wash: '#6a1e18', washA: 1, w: 2.2, col: TM.line, key: 534 }); for (let x = -78; x <= 78; x += 26) if (Math.abs(x) > 14) nb(x, -126 + b, 3.6);
    rect(-12, -138 + b, 24, 23, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); rect(-6, -132 + b, 12, 11, { wash: '#6a1e18', washA: 1, w: 1.2, col: CU.goldD });
    line([[-30, -122 + b], [-34, -78 + b]], { w: 5, col: '#6a1e18', pass2: false }); ell(-34, -74 + b, 5, 7, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD });
    lis(-40, -192 + b, 0.9); lis(40, -192 + b, 0.9); lis(-52, -84 + b, 0.95); lis(0, -76 + b, 1.0); lis(52, -84 + b, 0.95);
  },
  rubakha(OF, b, t, bp, L) {                                           // 988: льняная рубаха навыпуск, красная вышивка, кушак
    const sk = skirt6(OF, b, L, -118, -44, 90, 104, 540);
    for (const P of [bp, sk]) { hatch(P.path, P.bb, { gap: 4, a: 0.1, col: OF.topD, ang: 0.05, key: 541, w: 1.1 }); hatch(P.path, P.bb, { gap: 5, a: 0.08, col: OF.topD, ang: 1.57, key: 542, w: 1.1 }); }
    embroid([[-54, -254 + b], [-30, -238 + b], [0, -232 + b], [30, -238 + b], [54, -254 + b]], 14, 543);
    pencil([[0, -230 + b], [2, -194 + b]], { w: 2.4, col: '#b8302a', pass2: false }); dashL([[6, -228 + b], [8, -196 + b]], '#8a2018', 0.8);
    embroid([[-102, -54 + b], [-50, -48 + b], [0, -46 + b], [50, -48 + b], [102, -54 + b]], 18, 544);
    for (const sd of [-1, 1]) embroid([[sd * 88, -226 + b], [sd * 92, -190 + b], [sd * 90, -150 + b]], 12, 545);
    const ks = rect(-95, -134 + b, 190, 24, { wash: '#b8302a', washA: 1, w: 2.4, col: TM.line, key: 546 }); shadeG(ks.path, 0, -110 + b, 0, -134 + b, '#5a0e0a', 0.35);
    for (let x = -88; x <= 88; x += 16) pencil([[x, -132 + b], [x + 10, -112 + b]], { w: 2, col: '#e8c8a0', a: 0.55, pass2: false, gap: false });
    ell(58, -122 + b, 13, 11, { wash: '#b8302a', washA: 1, w: 2.2, col: TM.line });
    for (const [x0, a] of [[56, 0.1], [68, -0.2]]) { const E = spline([[x0, -116 + b], [x0 + 6 + a * 20, -90 + b], [x0 + 4 + a * 30, -62 + b]], false, 6); shape(tubeP(E, 13, 11), { wash: '#b8302a', washA: 1, w: 2, col: TM.line }); const e = E[E.length - 1]; for (let k = -2; k <= 2; k++) line([[e[0] + k * 2.4, e[1]], [e[0] + k * 2.8, e[1] + 12]], { w: 1.6, col: '#e8c8a0', pass2: false, smooth: false }); }
  },
  varyag(OF, b, t, bp, L) {                                            // 882: шерстяная туника, меховой ворот, фибулы с цепочкой, пояс с ножом
    const sk = skirt6(OF, b, L, -118, -52, 90, 100, 550);
    for (const P of [bp, sk]) { hatch(P.path, P.bb, { gap: 5, a: 0.16, col: OF.topD, ang: 0.9, key: 551, w: 1.4 }); hatch(P.path, P.bb, { gap: 5, a: 0.12, col: OF.topD, ang: -0.9, key: 552, w: 1.3 }); }
    const hb = rect(-100, -64 + b, 200, 14, { wash: '#7a2a22', washA: 1, w: 1.8, col: TM.line, key: 553 }); for (let x = -92; x <= 92; x += 12) ell(x, -57 + b, 2.2, 2.2, { wash: '#e8d8a8', washA: 1, line: false });
    rect(-6, -250 + b, 12, 150, { wash: '#7a2a22', washA: 0.95, w: 1.6, col: TM.line, key: 554 }); for (let y = -240; y < -110; y += 12) ell(0, y + b, 2.2, 2.2, { wash: '#e8d8a8', washA: 1, line: false });
    pencil(spline([[-52, -204 + b], [-26, -184 + b], [26, -184 + b], [52, -204 + b]], false, 8), { w: 1.8, col: CU.copperL, a: 0.9, pass2: false });
    for (let k = 0; k < 6; k++) { const a = k / 5, x = lerp(-48, 48, a), y = -196 + Math.sin(a * Math.PI) * 12 + b; ell(x, y, 2.8, 2.8, { wash: k % 2 ? '#2a6a8a' : '#c8a040', washA: 1, w: 1, col: TM.line }); }
    for (const sd of [-1, 1]) { const br = ell(sd * 54, -206 + b, 14, 10, { wash: CU.copper, washA: 1, w: 2.2, col: CU.copperD, key: 555 + sd }); metalG(br.path, sd * 50, -210 + b, 20, CU.copperL, CU.copper, CU.copperD); ell(sd * 54, -206 + b, 5, 3.4, { wash: CU.copperD, washA: 0.8, line: false }); }
    rect(-93, -130 + b, 186, 16, { wash: '#4a2a14', washA: 1, w: 2.2, col: TM.line, key: 557 }); const rg = ell(0, -122 + b, 13, 13, { wash: CU.copper, washA: 1, w: 2.6, col: CU.copperD }); ell(0, -122 + b, 6, 6, { wash: '#4a2a14', washA: 1, w: 1.4, col: CU.copperD });
    for (let x = -80; x <= 80; x += 20) if (Math.abs(x) > 20) nb(x, -122 + b, 3, CU.copper);
    push(-66, -114 + b, 1, 0.12); blob([[-8, 0], [8, 0], [9, 40], [0, 48], [-9, 40]], { wash: '#3a2412', washA: 1, w: 2.2, col: TM.line }); rect(-4, -22, 8, 22, { wash: CU.wood, washA: 1, w: 1.8, col: TM.line }); rect(-9, -2, 18, 5, { wash: CU.copper, washA: 1, w: 1.4, col: CU.copperD }); pop();
    furBand([[-98, -246 + b], [-56, -262 + b], [0, -268 + b], [56, -262 + b], [98, -246 + b]], 22, '#a8987a', '#5a4a38', '#e0d4b8', 558, { curl: 1, n: 70 });
  },
  soviet(OF, b, t, bp, L) {                                            // 1982: серый двубортный костюм, белая рубашка, бордовый галстук, значок
    const sk = skirt6(OF, b, L, -118, -62, 90, 98, 560);
    ctx.save(); ctx.clip(bp.path); for (let x = -90; x <= 90; x += 13) pencil([[x, -250 + b], [x * 1.04, -90 + b]], { w: 1.2, col: OF.topL, a: 0.28, pass2: false, gap: false }); ctx.restore();
    poly([[-32, -254 + b], [32, -254 + b], [20, -196 + b], [0, -170 + b], [-20, -196 + b]], { wash: OF.shirt, washA: 1, w: 2, col: TM.line, key: 561 });
    poly([[-8, -250 + b], [8, -250 + b], [7, -230 + b], [-7, -230 + b]], { wash: '#7a1a2c', washA: 1, w: 1.8, col: TM.line });
    const tb = poly([[-7, -230 + b], [7, -230 + b], [23, -142 + b], [0, -124 + b], [-23, -142 + b]], { wash: '#7a1a2c', washA: 1, w: 2, col: TM.line, key: 562 }); shadeG(tb.path, -20, 0, 20, 0, '#3a0610', 0.5);
    for (let k = 0; k < 4; k++) pencil([[-14 + k * 2, -206 + k * 18 + b], [14 + k * 2, -192 + k * 18 + b]], { w: 2, col: '#b8506a', a: 0.45, pass2: false, gap: false });
    for (const sd of [-1, 1]) { const lp = poly([[sd * 30, -256 + b], [sd * 80, -246 + b], [sd * 62, -190 + b], [sd * 22, -150 + b], [sd * 16, -176 + b]], { wash: OF.topL, washA: 1, w: 2.4, col: TM.line, key: 563 + sd }); shadeG(lp.path, 0, -150 + b, 0, -256 + b, OF.topD, 0.35); }
    for (const sd of [-1, 1]) { pencil([[sd * 20, -150 + b], [sd * 26, -96 + b]], { w: 2, col: OF.topD, a: 0.8, pass2: false }); }
    poly([[-22, -150 + b], [60, -150 + b], [64, -96 + b], [-22, -96 + b]], { wash: OF.top, washA: 0.5, w: 1.6, col: TM.line, a: 0.45 });
    for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) nb(sd * 32, -160 + k * 24 + b, 4, '#4a4e54');
    rect(34, -204 + b, 36, 28, { wash: OF.top, washA: 0.35, w: 1.6, col: TM.line, a: 0.5 });
    if (!OF.noPin) { line([[-56, -208 + b], [-56, -192 + b]], { w: 1.6, col: CU.steelD, pass2: false }); poly([[-56, -208 + b], [-38, -204 + b], [-38, -194 + b], [-56, -198 + b]], { wash: '#c8201e', washA: 1, w: 1.4, col: TM.line }); ell(-48, -201 + b, 2, 2, { wash: CU.goldL, washA: 1, line: false }); }
    for (const sd of [-1, 1]) { rect(sd * 56 - 18, -112 + b, 36, 12, { wash: OF.topD, washA: 0.7, w: 1.6, col: TM.line, a: 0.7 }); }
  },
  caveman(OF, b, t, bp, L) {                                           // палеолит: пятнистая шкура через плечо, ремешки, клыки на шее
    const bi = fluff(ellPts(34, -212 + b, 38, 34, 0, 0, 20), 5, 41); shape(bi.concat([bi[0]]), { wash: TM.bib, washA: 0.97, w: 2, col: TM.line, a: 0.5 });
    const HP = [[-90, -238 + b], [-44, -262 + b], [-6, -250 + b], [34, -186 + b], [88, -134 + b], [96, -86 + b], [66, -58 + b], [22, -72 + b], [-26, -56 + b], [-78, -70 + b], [-98, -128 + b], [-96, -190 + b]];
    const hd = softShape(HP, { wash: '#b8864a', washA: 1, w: 2.8, col: TM.line, key: 570 }, 2.2, 5);
    shadeG(hd.path, -L.side * 100, 0, L.side * 80, 0, '#4a2a10', 0.55);
    ctx.save(); ctx.clip(hd.path); const R = rng(571);
    for (let k = 0; k < 15; k++) { const x = -86 + R() * 170, y = -240 + R() * 190 + b, rr = 5 + R() * 6; ell(x, y, rr * 1.2, rr, { wash: '#5a3414', washA: 0.9, line: false, rot: R() * 3 }); ell(x, y, rr * 0.5, rr * 0.4, { wash: '#b8864a', washA: 1, line: false }); }
    hatch(hd.path, hd.bb, { gap: 7, a: 0.12, col: '#3a2210', ang: 1.1, key: 572, w: 1.3 }); fstr(hd.path, hd.bb, 120, 1.5, 12, '#e0b878', 0.6, 573, 2.4); fstr(hd.path, hd.bb, 70, 1.4, 10, '#4a2a10', 0.45, 574, 2.4); ctx.restore();
    for (let x = -72; x <= 60; x += 13) { const y = -64 + b + (x > 4 ? -6 : 0); pencil([[x, y], [x + 2, y + 14 + (x % 3) * 4]], { w: 5, col: '#a47638', pass2: false, gap: false }); }
    pencil([[-86, -238 + b], [-44, -264 + b]], { w: 8, col: '#e0b878', a: 0.8, pass2: false });
    pencil(spline([[-94, -118 + b], [0, -108 + b], [96, -118 + b]], false, 8), { w: 6, col: '#5a4028' }); pencil(spline([[-94, -122 + b], [0, -112 + b], [96, -122 + b]], false, 8), { w: 2, col: '#8a6a44', a: 0.8, pass2: false });
    line([[66, -112 + b], [72, -80 + b]], { w: 4, col: '#5a4028', pass2: false }); line([[56, -112 + b], [50, -84 + b]], { w: 4, col: '#5a4028', pass2: false }); poly([[44, -84 + b], [56, -84 + b], [50, -62 + b]], { wash: '#8a8478', washA: 1, w: 1.8, col: TM.line });
    pencil(spline([[-48, -246 + b], [-30, -222 + b], [0, -212 + b], [30, -222 + b], [48, -246 + b]], false, 8), { w: 2.2, col: '#5a4028', pass2: false });
    for (const x of [-30, -14, 0, 14, 30]) { const y = -212 + b - Math.abs(x) * 0.33; poly([[x - 4, y], [x + 4, y], [x, y + 16]], { wash: '#f4efe0', washA: 1, w: 1.3, col: '#6a5a40' }); }
  },
  scuba(OF, b, t, bp, L) {                                             // гидрокостюм: бирюзовые вставки, молния, баллон за спиной
    ctx.save(); const out = new Path2D(); out.rect(-420, -820, 840, 1000); out.addPath(bp.path); ctx.clip(out, 'evenodd');
    const tk = rect(-136, -286 + b, 42, 190, { wash: '#c8ccd0', washA: 1, w: 3, col: TM.line, key: 580 }); metalG(tk.path, -124, -200 + b, 90, '#ffffff', '#b8bcc2', '#5a5e64');
    for (const y of [-264, -122]) rect(-138, y + b, 46, 12, { wash: '#1a1c20', washA: 1, w: 1.6, col: TM.line });
    ell(-115, -286 + b, 21, 8, { wash: '#c8ccd0', washA: 1, w: 2.4, col: TM.line }); rect(-122, -306 + b, 14, 22, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); ell(-115, -310 + b, 10, 5, { wash: CU.goldL, washA: 1, w: 1.6, col: CU.goldD });
    rect(-142, -240 + b, 12, 40, { wash: '#14a8a0', washA: 1, w: 1.8, col: TM.line }); ctx.restore();
    pencil(spline([[-114, -310 + b], [-110, -340 + b], [-70, -330 + b], [-52, -270 + b]], false, 8), { w: 6, col: '#14181c', a: 0.95, pass2: false }); pencil(spline([[-114, -310 + b], [-110, -340 + b], [-70, -330 + b], [-52, -270 + b]], false, 8), { w: 1.6, col: '#5a6a72', a: 0.8, pass2: false });
    const sk = skirt6(OF, b, L, -118, -86, 88, 92, 581);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 6, a: 0.2, col: '#000', ang: 1.2, key: 582, w: 1.3 });
    ctx.save(); ctx.clip(bp.path); for (const sd of [-1, 1]) { ctx.fillStyle = '#16b0a6'; ctx.globalAlpha = 0.95; ctx.beginPath(); ctx.moveTo(sd * 62, -250 + b); ctx.lineTo(sd * 110, -250 + b); ctx.lineTo(sd * 110, -86 + b); ctx.lineTo(sd * 72, -86 + b); ctx.lineTo(sd * 80, -170 + b); ctx.closePath(); ctx.fill(); } ctx.globalAlpha = 1; ctx.restore();
    for (const sd of [-1, 1]) { pencil([[sd * 62, -250 + b], [sd * 80, -170 + b], [sd * 72, -86 + b]], { w: 2, col: TM.line, a: 0.8, pass2: false }); dashL([[sd * 66, -246 + b], [sd * 84, -170 + b], [sd * 76, -88 + b]], '#bff4ee', 0.6); }
    pencil([[0, -250 + b], [2, -96 + b]], { w: 3, col: '#050a0c', a: 0.95, pass2: false }); for (let y = -244; y < -100; y += 8) pencil([[-3, y + b], [3, y + b]], { w: 1.2, col: '#7a8a90', a: 0.8, pass2: false, gap: false }); poly([[-5, -250 + b], [5, -250 + b], [5, -234 + b], [-5, -234 + b]], { wash: CU.steel, washA: 1, w: 1.4, col: TM.line });
    pencil([[-72, -200 + b], [72, -200 + b]], { w: 1.6, col: '#050a0c', a: 0.5, pass2: false });
    rect(-90, -134 + b, 180, 16, { wash: '#1a1c20', washA: 1, w: 2.2, col: TM.line, key: 583 }); rect(-14, -137 + b, 28, 22, { wash: CU.steel, washA: 1, w: 2, col: CU.steelD }); for (const x of [-70, -50, 50, 70]) { rect(x - 8, -132 + b, 16, 26, { wash: '#4a4e54', washA: 1, w: 1.6, col: TM.line }); }
    pencil(spline([[-70, -250 + b], [-40, -262 + b], [40, -262 + b], [70, -250 + b]], false, 8), { w: 9, col: '#0a1014', a: 0.95 }); pencil(spline([[-70, -250 + b], [-40, -262 + b], [40, -262 + b], [70, -250 + b]], false, 8), { w: 2, col: '#16b0a6', a: 0.9, pass2: false });
  }
  ,
  /* ---- 004 Сеул */
  gwanbok(OF, b, t, bp, L) {                                           // 1394: чиновник Чосон — синий халат с круглым воротом, нагрудная вышивка с журавлём, жёсткий пояс
    const sk = skirt6(OF, b, L, -118, -30, 90, 108, 700);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 6, a: 0.12, col: OF.topD, ang: 1.3, key: 701, w: 1.3 });
    const ring = ellPts(0, -246 + b, 40, 22, 0, 0, 30); shape(ring, { wash: OF.topD, washA: 1, w: 2.4, col: TM.line, key: 702 });
    shape(ellPts(0, -250 + b, 28, 13, 0, 0, 24), { wash: '#f4f0e6', washA: 1, w: 1.8, col: TM.line, key: 703 });
    pencil(spline([[-30, -236 + b], [-6, -226 + b], [36, -212 + b], [62, -150 + b]], false, 6), { w: 2.4, col: OF.topD, a: 0.8, pass2: false });
    const hb = rect(-40, -214 + b, 80, 74, { wash: '#1a2560', washA: 1, w: 2.2, col: TM.line, key: 704 }); goldBand([[-40, -214 + b], [40, -214 + b]], 6, 705, {}); goldBand([[-40, -140 + b], [40, -140 + b]], 6, 706, {});
    push(0, -178 + b, 1);                                             // журавль в облаках
    for (const [x, y] of [[-24, 18], [22, 22], [-20, -22]]) blob([[x - 10, y], [x - 4, y - 7], [x + 6, y - 6], [x + 12, y], [x, y + 4]], { wash: '#9ab8d8', washA: 0.9, w: 1, col: '#4a6a9a' });
    blob([[-18, 6], [-6, -4], [14, -2], [22, 8], [6, 12]], { wash: '#f6f2ea', washA: 1, w: 1.4, col: TM.line });
    pencil([[14, -2], [22, -22], [28, -26]], { w: 2.2, col: '#f6f2ea', pass2: false }); ell(26, -27, 3, 3, { wash: '#c8201e', washA: 1, line: false });
    blob([[-6, -2], [-30, -18], [-36, -8], [-14, 4]], { wash: '#2a2a2a', washA: 1, w: 1.2, col: TM.line }); pop();
    const bt = poly([[-104, -126 + b], [104, -126 + b], [100, -108 + b], [-100, -108 + b]], { wash: '#8a1e1a', washA: 1, w: 2.4, col: TM.line, key: 707 }); shadeG(bt.path, 0, -108 + b, 0, -126 + b, '#3a0606', 0.4);
    for (let x = -86; x <= 86; x += 24) { const pl = rect(x - 8, -124 + b, 16, 14, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD }); metalG(pl.path, x, -120 + b, 12, CU.goldL, CU.gold, CU.goldD); }
    for (const sd of [-1, 1]) pencil([[sd * 92, -100 + b], [sd * 100, -40 + b]], { w: 2, col: OF.topD, a: 0.7, pass2: false });
  },
  gunsa(OF, b, t, bp, L) {                                             // 1396: воин-надсмотрщик — тёмный жилет-чонбок поверх красных рукавов, сине-красный кушак-чондэ
    const sk = skirt6(OF, b, L, -118, -40, 90, 104, 710);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 5, a: 0.14, col: OF.topD, ang: 0.9, key: 711, w: 1.3 });
    poly([[-30, -254 + b], [30, -254 + b], [0, -190 + b]], { wash: '#b8302a', washA: 1, w: 2, col: TM.line, key: 712 });
    for (const sd of [-1, 1]) pencil([[sd * 30, -254 + b], [sd * 4, -192 + b], [sd * 6, -120 + b]], { w: 3, col: '#0a0e1c', a: 0.9, pass2: false });
    const sh = rect(-96, -136 + b, 192, 22, { wash: '#2a5aa8', washA: 1, w: 2.4, col: TM.line, key: 713 }); pencil([[-94, -125 + b], [94, -125 + b]], { w: 3, col: '#c8302a', a: 0.9, pass2: false });
    blob([[-12, -138 + b], [14, -136 + b], [18, -112 + b], [-14, -114 + b]], { wash: '#2a5aa8', washA: 1, w: 2, col: TM.line });
    for (const [x0, a] of [[-6, -0.15], [10, 0.12]]) { const E = spline([[x0, -114 + b], [x0 + a * 60, -80 + b], [x0 + a * 90, -46 + b]], false, 6); shape(tubeP(E, 14, 10), { wash: '#2a5aa8', washA: 1, w: 2, col: TM.line }); pencil(E, { w: 2, col: '#c8302a', a: 0.8, pass2: false }); }
    push(-70, -104 + b, 1, 0.35); rect(-6, -10, 12, 70, { wash: '#2a1a10', washA: 1, w: 2, col: TM.line }); rect(-10, -16, 20, 8, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD }); pencil([[0, -16], [0, -48]], { w: 7, col: '#4a2a14' }); pop();
    rect(30, -214 + b, 44, 54, { wash: '#efe4c4', washA: 1, w: 1.8, col: TM.line, key: 714 }); for (let q = 0; q < 4; q++) pencil([[38, -204 + q * 12 + b], [66, -204 + q * 12 + b]], { w: 1.4, col: '#3a2a14', a: 0.7, pass2: false });
  },
  seonbi(OF, b, t, bp, L) {                                            // 1446: учёный-сонби — белый халат-допхо с запа́хом, белая полоска ворота, синие шнуры-седжодэ с кистями
    const sk = skirt6(OF, b, L, -118, -24, 92, 112, 720);
    for (const P of [bp, sk]) { hatch(P.path, P.bb, { gap: 6, a: 0.08, col: OF.topD, ang: 1.5, key: 721, w: 1.1 }); }
    pencil(spline([[-34, -256 + b], [-4, -232 + b], [40, -204 + b], [70, -150 + b]], false, 6), { w: 2.6, col: OF.topD, a: 0.85, pass2: false });
    const col = shape(tubeP(spline([[34, -256 + b], [10, -240 + b], [-14, -226 + b], [-40, -200 + b]], false, 6), 18, 18), { wash: '#e2dccc', washA: 1, w: 2, col: TM.line, key: 722 });
    pencil(spline([[34, -262 + b], [10, -246 + b], [-14, -232 + b], [-38, -208 + b]], false, 6), { w: 4, col: '#ffffff', a: 0.95, pass2: false });
    pencil([[-98, -122 + b], [-40, -118 + b], [40, -118 + b], [98, -122 + b]], { w: 7, col: '#3a5a8a', pass2: false }); pencil([[-98, -128 + b], [98, -128 + b]], { w: 3, col: '#7a2a2a', a: 0.8, pass2: false });
    ell(30, -120 + b, 9, 7, { wash: '#3a5a8a', washA: 1, w: 1.6, col: TM.line });
    for (const [x0, a] of [[24, 0.05], [36, 0.2]]) { const sw = Math.sin(t * 2.2 + x0) * 4, E = spline([[x0, -114 + b], [x0 + a * 30 + sw * 0.5, -70 + b], [x0 + a * 40 + sw, -34 + b]], false, 6); pencil(E, { w: 4, col: '#3a5a8a', pass2: false }); const e = E[E.length - 1];
      blob([[e[0] - 7, e[1]], [e[0] + 7, e[1]], [e[0] + 9, e[1] + 26], [e[0] - 9, e[1] + 26]], { wash: '#3a5a8a', washA: 1, w: 1.4, col: TM.line }); for (let k = -2; k <= 2; k++) pencil([[e[0] + k * 3, e[1] + 6], [e[0] + k * 3.4, e[1] + 26]], { w: 1.2, col: '#9ab8e0', a: 0.7, pass2: false, gap: false }); }
  },
  nongbu(OF, b, t, bp, L) {                                            // 1960-е: крестьянин — хлопковая куртка-чогори с лентой-отком, полотенце на шее
    hatch(bp.path, bp.bb, { gap: 4, a: 0.1, col: OF.topD, ang: 0.1, key: 730, w: 1.1 }); hatch(bp.path, bp.bb, { gap: 6, a: 0.08, col: OF.topD, ang: 1.6, key: 731, w: 1.1 });
    pencil(spline([[-30, -254 + b], [-2, -232 + b], [36, -206 + b], [54, -150 + b]], false, 6), { w: 2.4, col: OF.topD, a: 0.85, pass2: false });
    for (const [x0, a] of [[40, 0.1], [44, 0.4]]) { const E = spline([[x0, -196 + b], [x0 + a * 30, -170 + b], [x0 + a * 34 + 4, -136 + b]], false, 6); shape(tubeP(E, 12, 9), { wash: '#e8e2d2', washA: 1, w: 1.6, col: TM.line }); }
    ell(40, -198 + b, 8, 6, { wash: '#e8e2d2', washA: 1, w: 1.4, col: TM.line });
    pencil([[-96, -116 + b], [96, -116 + b]], { w: 5, col: '#8a7a5a', a: 0.7, pass2: false });
    const tw = shape(tubeP(spline([[-80, -258 + b], [-30, -246 + b], [30, -248 + b], [76, -262 + b]], false, 6), 24, 24), { wash: '#f6f4ec', washA: 1, w: 2, col: TM.line, key: 732 });
    pencil([[-70, -254 + b], [70, -258 + b]], { w: 2, col: '#4a7ab8', a: 0.6, pass2: false });
    const E = spline([[-70, -252 + b], [-76, -220 + b], [-72, -186 + b]], false, 6); shape(tubeP(E, 22, 20), { wash: '#f6f4ec', washA: 1, w: 2, col: TM.line });
    for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) pencil([[sd * 60, -150 + k * 10 + b], [sd * 84, -146 + k * 10 + b]], { w: 1.4, col: OF.topD, a: 0.45, pass2: false });
  },
  tux(OF, b, t, bp, L) {                                               // 2012: голубой смокинг с чёрными атласными лацканами, белая рубашка, бабочка
    ctx.save(); ctx.clip(bp.path); const g = ctx.createLinearGradient(-100, -250 + b, 100, -90 + b); g.addColorStop(0, 'rgba(255,255,255,0.25)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,30,60,0.25)'); ctx.fillStyle = g; ctx.fillRect(-120, -270 + b, 240, 200); ctx.restore();
    poly([[-30, -254 + b], [30, -254 + b], [18, -170 + b], [0, -150 + b], [-18, -170 + b]], { wash: OF.shirt, washA: 1, w: 2, col: TM.line, key: 740 });
    for (const sd of [-1, 1]) { const lp = poly([[sd * 28, -256 + b], [sd * 64, -244 + b], [sd * 50, -196 + b], [sd * 10, -146 + b], [sd * 14, -172 + b]], { wash: '#141418', washA: 1, w: 2.4, col: TM.line, key: 741 + sd });
      ctx.save(); ctx.clip(lp.path); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 4 / S; ctx.beginPath(); ctx.moveTo(sd * 30, -248 + b); ctx.lineTo(sd * 16, -170 + b); ctx.stroke(); ctx.restore(); }
    for (let k = 0; k < 2; k++) nb(0, -132 + k * 22 + b, 5, '#141418');
    rect(34, -204 + b, 30, 8, { wash: '#f6f4ee', washA: 1, w: 1.2, col: TM.line }); poly([[38, -204 + b], [46, -216 + b], [52, -204 + b]], { wash: '#e8306a', washA: 1, w: 1.2, col: TM.line });
    for (const sd of [-1, 1]) rect(sd * 56 - 18, -112 + b, 36, 10, { wash: OF.topD, washA: 0.8, w: 1.6, col: TM.line, a: 0.7 });
  },
  // ---- добавлено tools/add_costume.py
  preobr(OF, b, t, bp, L) {                                            // петровский кафтан до колен: камзол, борта с пуговицами, галстук, портупея; lace — золотой позумент
    const sk = skirt6(OF, b, L, -118, -36, 90, 110, 800);
    for (const P of [bp, sk]) hatch(P.path, P.bb, { gap: 6, a: 0.12, col: OF.topD, ang: 1.2, key: 801, w: 1.3 });
    const vs = poly([[-30, -250 + b], [30, -250 + b], [34, -60 + b], [-34, -60 + b]], { wash: OF.vest, washA: 1, w: 2, col: TM.line, key: 802 }); shadeG(vs.path, 30, 0, -30, 0, '#000000', 0.15);
    for (let k = 0; k < 7; k++) nb(0, -226 + k * 26 + b, 3.6, CU.gold);
    for (const sd of [-1, 1]) { pencil([[sd * 32, -252 + b], [sd * 38, -40 + b]], { w: 3, col: OF.topD, a: 0.9, pass2: false }); for (let k = 0; k < 6; k++) { nb(sd * 46, -224 + k * 28 + b, 4.6, CU.gold); if (OF.lace) pencil([[sd * 48, -224 + k * 28 + b], [sd * 74, -222 + k * 28 + b]], { w: 4, col: OF.lace, pass2: false }); } }
    if (OF.lace) for (const P of [[[-104, -40 + b], [104, -40 + b]], [[-36, -254 + b], [-38, -40 + b]], [[36, -254 + b], [38, -40 + b]]]) pencil(P, { w: 6, col: OF.lace, a: 0.95, pass2: false });
    poly([[-16, -262 + b], [16, -262 + b], [12, -232 + b], [0, -222 + b], [-12, -232 + b]], { wash: '#f6f2ea', washA: 1, w: 1.6, col: TM.line });
    for (const sd of [-1, 1]) { rect(sd * 64 - 18, -126 + b, 36, 26, { wash: OF.topD, washA: 0.7, w: 1.6, col: TM.line, a: 0.7 }); }
    pencil([[60, -240 + b], [-70, -96 + b]], { w: 9, col: '#3a2412' }); rect(-84, -110 + b, 20, 26, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD });
    push(-86, -96 + b, 1, 0.3); pencil([[0, 0], [0, 70]], { w: 7, col: '#2a1a10' }); rect(-8, -8, 16, 10, { wash: CU.gold, washA: 1, w: 1.2, col: CU.goldD }); pop();
  }
};
/* ---- голова: брызги извести / сажа на шерсти */
function face6(OF, t, fx) {
  if (OF.splash) limeSplash(null, [0, 0, 0, 0], 0, 1) || [[-96, 26, 5], [-86, 40, 3], [104, -40, 6], [64, -74, 4], [-52, -78, 3.5], [116, 34, 4], [-112, -20, 3]].forEach(([x, y, r], i) => { ctx.fillStyle = CU.lime; ctx.globalAlpha = 0.95; ctx.beginPath(); for (let k = 0; k <= 9; k++) { const a = k / 9 * 6.283, rr = r * (0.7 + 0.45 * Math.abs(Math.sin(k * 2.3 + i))); k ? ctx.lineTo(x + fx * 0.3 + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + fx * 0.3 + rr, y); } ctx.fill(); ctx.beginPath(); ctx.arc(x + fx * 0.3 + r * 1.8, y - r, 1.4, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1; });
  if (OF.soot) for (const [x, y, r, a] of [[-84, 34, 34, 0.62], [90, 28, 30, 0.55], [40, -68, 18, 0.42], [-22, 66, 14, 0.35]]) { const g = ctx.createRadialGradient(x + fx * 0.3, y, 2, x + fx * 0.3, y, r); g.addColorStop(0, `rgba(30,24,20,${a})`); g.addColorStop(1, 'rgba(30,24,20,0)'); ctx.fillStyle = g; ctx.fillRect(x + fx * 0.3 - r, y - r, r * 2, r * 2); pencil([[x - r * 0.5 + fx * 0.3, y - 4], [x + r * 0.4 + fx * 0.3, y + 3]], { w: 2.4, col: '#2a221c', a: a * 0.9, pass2: false, gap: false }); }
}
/* ---- задний слой головного убора (до головы) */
const HATBACK = {
  shishak() { const P = wobP(spline([[-116, -70], [-150, 0], [-164, 80], [-136, 142], [-60, 154], [0, 156], [60, 154], [136, 142], [164, 80], [150, 0], [116, -70]], true, 6), 1.2, 7);
    const sp = shape(P, { wash: '#7c8086', washA: 1, w: 2.6, col: TM.line, key: 360 }); mailTex(sp.path, sp.bb, 361, 3.2); shadeG(sp.path, 0, 156, 0, 0, '#2a2e34', 0.5);
    for (let x = -132; x <= 132; x += 8) { ctx.strokeStyle = 'rgba(30,32,36,0.8)'; ctx.lineWidth = 1.5 / S; ctx.beginPath(); ctx.arc(x, 150 - Math.abs(x) * 0.06, 3.6, 0.2, 2.94); ctx.stroke(); } },
  ushanka(t) { for (const s of [-1, 1]) line([[s * 128, 60], [s * 124 + Math.sin(t * 2 + s) * 4, 100], [s * 118 + Math.sin(t * 2 + s) * 8, 134]], { w: 2.4, col: '#3a2a1a', pass2: false }); },
  bogatyr() { const P = wobP(spline([[-110, -72], [-140, -10], [-166, 70], [-182, 150], [-176, 190], [-90, 204], [0, 210], [90, 204], [176, 190], [182, 150], [166, 70], [140, -10], [110, -72]], true, 6), 1.2, 9);   // бармица: ниже и шире шишака
    const sp = shape(P, { wash: '#6e7880', washA: 1, w: 2.6, col: TM.line, key: 540 }); mailTex(sp.path, sp.bb, 541, 3.4); shadeG(sp.path, 0, 210, 0, 0, '#22262a', 0.55);
    for (let x = -170; x <= 170; x += 9) { ctx.strokeStyle = 'rgba(30,32,36,0.8)'; ctx.lineWidth = 1.5 / S; ctx.beginPath(); ctx.arc(x, 200 + Math.abs(x) * 0.02 - (x / 170) * (x / 170) * -6, 3.8, 0.2, 2.94); ctx.stroke(); } }
};
/* ---- головные уборы 002 */
const HAT6 = {
  diver(t, o, fx, L) {                                                 // медный шлем-сфера: окно с бликом, болты, боковые иллюминаторы, шланг
    const R = 168, cx = fx * 0.12, cy = -2, wx = fx * 0.85, wy = 12, wr = 98, sd = L.side;
    const H = spline([[-146, -92], [-196, -140], [-236, -230], [-238, -360], [-210, -520]], false, 8);
    const hs = shape(tubeP(H, 36, 32), { wash: '#3a342e', washA: 1, w: 2.6, col: TM.line, key: 320 }); shadeG(hs.path, -260, 0, -180, 0, '#000', 0.4);
    for (let i = 2; i < H.length - 1; i += 3) { const a = H[i - 1], c = H[i + 1], an = Math.atan2(c[1] - a[1], c[0] - a[0]) + 1.5708, [x, y] = H[i]; pencil([[x - Math.cos(an) * 16, y - Math.sin(an) * 16], [x + Math.cos(an) * 16, y + Math.sin(an) * 16]], { w: 1.8, col: '#6a625a', a: 0.8, pass2: false, gap: false }); }
    const ring = new Path2D(); ring.arc(cx, cy, R, 0, 6.2832); ring.moveTo(wx + wr, wy); ring.arc(wx, wy, wr, 0, 6.2832, true);
    metalG(ring, cx + sd * 64, cy - 70, R * 1.25, CU.copperL, CU.copper, CU.copperD);
    hatch(ring, [cx - R, cy - R, cx + R, cy + R], { gap: 6, a: 0.2, col: CU.copperD, ang: -1.05, key: 321 });
    shadeG(ring, cx - sd * R, 0, cx + sd * 30, 0, CU.copperD, 0.55);
    for (const [x, y, r] of [[-70, -120, 10], [96, 96, 8], [-118, 70, 7]]) { ctx.fillStyle = 'rgba(70,150,120,0.35)'; ctx.beginPath(); ctx.ellipse(cx + x, cy + y, r * 1.5, r, 0.4, 0, 6.283); ctx.fill(); }   // патина
    ctx.save(); ctx.strokeStyle = 'rgba(255,236,200,0.75)'; ctx.lineCap = 'round'; ctx.lineWidth = 7 / S; ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, sd > 0 ? -1.25 : -1.9 - 0.65, sd > 0 ? -0.6 : -1.9); ctx.stroke(); ctx.lineWidth = 3 / S; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, sd > 0 ? -0.45 : -2.75, sd > 0 ? -0.3 : -2.6); ctx.stroke(); ctx.restore();
    pencil(ellPts(cx, cy, R, R, 0, 0.06, 90), { w: 3.6, col: TM.line, key: 322 }); rimL(ellPts(cx, cy, R, R, 0, 0, 60), sd, L.rim, 0.85, 3.4);
    for (const s of [-1, 1]) { const px = cx + s * R * 0.88, py = cy - 14; ell(px, py, 18, 42, { wash: CU.gold, washA: 1, w: 2.2, col: CU.goldD, key: 323 + s }); ell(px, py, 10, 32, { wash: '#2a3a44', washA: 1, w: 1.6, col: TM.line }); pencil([[px - 3, py - 22], [px - 4, py - 4]], { w: 3, col: 'rgba(220,240,255,0.7)', pass2: false, gap: false }); }
    ell(cx - 6, cy - R + 8, 16, 9, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); rect(cx - 7, cy - R - 6, 14, 12, { wash: CU.goldL, washA: 1, w: 1.6, col: CU.goldD });
    const g = ctx.createRadialGradient(wx, wy, wr * 0.55, wx, wy, wr); g.addColorStop(0, 'rgba(150,210,225,0.10)'); g.addColorStop(0.75, 'rgba(60,90,100,0.18)'); g.addColorStop(1, 'rgba(18,10,4,0.62)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(wx, wy, wr, 0, 6.283); ctx.fill();
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 9 / S; ctx.beginPath(); ctx.arc(wx, wy, wr * 0.8, 3.55, 4.25); ctx.stroke(); ctx.lineWidth = 4 / S; ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(wx, wy, wr * 0.8, 4.42, 4.6); ctx.stroke(); ctx.beginPath(); ctx.arc(wx, wy, wr * 0.84, 0.35, 0.75); ctx.stroke(); ctx.restore();
    const fr = new Path2D(); fr.arc(wx, wy, wr + 17, 0, 6.2832); fr.moveTo(wx + wr, wy); fr.arc(wx, wy, wr, 0, 6.2832, true);
    metalG(fr, wx + sd * 50, wy - 60, wr * 1.6, CU.goldL, CU.gold, CU.goldD); pencil(ellPts(wx, wy, wr + 17, wr + 17, 0, 0.05, 70), { w: 2.8, col: TM.line, key: 325 }); pencil(ellPts(wx, wy, wr, wr, 0, 0.05, 70), { w: 2.4, col: TM.line, key: 326 });
    for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + 0.52, x = wx + Math.cos(a) * (wr + 8.5), y = wy + Math.sin(a) * (wr + 8.5); poly([0, 1, 2, 3, 4, 5].map(j => [x + Math.cos(j * 1.047 + a) * 6, y + Math.sin(j * 1.047 + a) * 6]), { wash: CU.goldL, washA: 1, w: 1.4, col: CU.goldD }); }
    ell(cx - R * 0.83, cy - R * 0.5, 17, 15, { wash: CU.gold, washA: 1, w: 2.2, col: CU.goldD }); ell(cx - R * 0.83, cy - R * 0.5, 7, 6, { wash: CU.goldD, washA: 1, line: false });
    const nr = blob([[-134, 124], [0, 140], [134, 124], [128, 158], [0, 174], [-128, 158]], { wash: CU.gold, washA: 1, w: 2.6, col: TM.line, key: 327 }); metalG(nr.path, sd * 60, 130, 160, CU.goldL, CU.gold, CU.goldD);
    for (const x of [-96, -32, 32, 96]) { ell(x, 150 - Math.abs(x) * 0.08, 6, 5, { wash: CU.goldL, washA: 1, w: 1.4, col: CU.goldD }); }
  },
  ushanka(t, o, fx, L) {                                               // ушанка: опущенные «уши», отворот спереди, мех
    const F = '#7a6046', FD = '#3a2818', FL = '#b8a080';
    for (const s of [-1, 1]) { const fl = softShape([[s * 92, -74], [s * 142, -78], [s * 158, -20], [s * 152, 38], [s * 128, 68], [s * 104, 52], [s * 96, 0]], { wash: F, washA: 1, w: 2.6, col: '#2a1c10', a: 0.7, key: 340 + s }, 2.2, s + 3);
      shadeG(fl.path, s * 160, 0, s * 96, 0, FD, 0.5); fstr(fl.path, fl.bb, 60, 1.5, 11, FD, 0.5, 342 + s, 2.2); fstr(fl.path, fl.bb, 50, 1.5, 10, FL, 0.6, 344 + s, 2); }
    const cr = softShape([[-106, -72], [-102, -140], [-52, -178], [0, -184], [52, -178], [102, -140], [106, -72]], { wash: '#5a4a3a', washA: 1, w: 3, col: TM.line, key: 346 }, 1.4, 5);
    shadeG(cr.path, -L.side * 110, 0, L.side * 60, 0, '#2a2018', 0.6); fstr(cr.path, cr.bb, 90, 1.6, 12, FD, 0.45, 347, 2.2); fstr(cr.path, cr.bb, 60, 1.6, 10, FL, 0.45, 348, 2);
    pencil(spline([[-60, -168], [-10, -150], [40, -164]], false, 6), { w: 1.6, col: '#2a2018', a: 0.5, pass2: false });
    const fb = softShape([[-120, -56], [-116, -104], [-60, -124], [0, -128], [60, -124], [116, -104], [120, -56], [60, -52], [0, -50], [-60, -52]], { wash: F, washA: 1, w: 2.8, col: '#2a1c10', a: 0.75, key: 349 }, 2.6, 9);
    shadeG(fb.path, 0, -50, 0, -128, FD, 0.5); shadeG(fb.path, -L.side * 120, 0, L.side * 40, 0, FD, 0.4); fstr(fb.path, fb.bb, 120, -1.5, 12, FL, 0.6, 350, 2.2); fstr(fb.path, fb.bb, 80, -1.4, 10, FD, 0.45, 351, 2.2);
    rimL(spline([[-120, -56], [-116, -104], [-60, -124], [0, -128], [60, -124], [116, -104], [120, -56]], false, 6), L.side, L.rim, 0.7, 3);
  },
  knyaz(t, o, fx, L) {                                                 // княжья шапка: бархатный верх, соболий околыш, самоцвет, жемчуг
    const V = '#8e1a2c', VD = '#3a0610';
    const cr = blob([[-92, -96], [-88, -150], [-48, -188], [0, -198], [48, -188], [88, -150], [92, -96]], { wash: V, washA: 1, w: 3, col: TM.line, key: 352 });
    metalG(cr.path, L.side * 40, -170, 150, '#c84a5a', V, VD); hatch(cr.path, cr.bb, { gap: 5, a: 0.14, col: VD, ang: -1.2, key: 353 });
    for (const x0 of [-62, -22, 22, 62]) { const P = spline([[x0, -104], [x0 * 0.8, -150], [x0 * 0.3, -186], [0, -196]], false, 6); pencil(P, { w: 3.4, col: CU.gold, pass2: false, gap: false }); resample(P, 16).forEach(([x, y], i) => i && pearlDot(x, y, 2.8)); }
    ell(0, -204, 9, 8, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD }); pearlDot(0, -218, 7);
    gem(0, -148, 9, CU.ruby); for (const s of [-1, 1]) pearlDot(s * 16, -150, 3.4);
    const fb = softShape([[-122, -58], [-118, -106], [-60, -126], [0, -130], [60, -126], [118, -106], [122, -58], [60, -48], [0, -46], [-60, -48]], { wash: '#4a3020', washA: 1, w: 2.8, col: '#1a0e06', a: 0.8, key: 354 }, 2.6, 11);
    shadeG(fb.path, 0, -46, 0, -130, '#1a0e06', 0.5); shadeG(fb.path, -L.side * 120, 0, L.side * 40, 0, '#1a0e06', 0.45);
    fstr(fb.path, fb.bb, 150, -1.45, 13, '#a88660', 0.55, 355, 2.2); fstr(fb.path, fb.bb, 90, -1.6, 11, '#1a0e06', 0.5, 356, 2.2); fstr(fb.path, fb.bb, 40, -1.5, 8, '#e0d0b0', 0.4, 357, 1.6);
    rimL(spline([[-122, -58], [-118, -106], [-60, -126], [0, -130], [60, -126], [118, -106], [122, -58]], false, 6), L.side, L.rim, 0.7, 3);
  },
  shishak(t, o, fx, L) {                                               // шишак: высокий конический шлем, золочёный венец, навершие, яловец
    const P = [[-104, -64], [-100, -112], [-78, -164], [-38, -210], [0, -236], [38, -210], [78, -164], [100, -112], [104, -64], [0, -56]];
    const hp = blob(P, { wash: CU.steel, washA: 1, w: 3.2, col: TM.line, key: 362 }); metalG(hp.path, L.side * 40, -150, 170, CU.steelL, CU.steel, CU.steelD);
    hatch(hp.path, hp.bb, { gap: 6, a: 0.16, col: CU.steelD, ang: -1.3, key: 363 });
    ctx.save(); ctx.clip(hp.path); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineCap = 'round'; ctx.lineWidth = 8 / S; ctx.beginPath(); ctx.moveTo(L.side * 34, -200); ctx.quadraticCurveTo(L.side * 64, -150, L.side * 70, -90); ctx.stroke(); ctx.restore();
    pencil(spline([[0, -232], [2, -150], [0, -80]], false, 6), { w: 6, col: CU.gold, a: 0.9, pass2: false }); for (let y = -210; y < -86; y += 22) nb(1, y, 3.4, CU.goldL);
    goldBand([[-104, -78], [-52, -68], [0, -66], [52, -68], [104, -78]], 20, 364, {}); for (let x = -90; x <= 90; x += 30) nb(x, -70 - Math.abs(x) * 0.1, 3.4, CU.steelL);
    rect(-5, -262, 10, 30, { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); ell(0, -264, 9, 9, { wash: CU.goldL, washA: 1, w: 1.8, col: CU.goldD }); line([[0, -272], [0, -300]], { w: 3.2, col: CU.steelD, pass2: false });
    const fl = Math.sin(t * 5) * 6; blob([[2, -296], [40 + fl, -290], [64 + fl * 1.4, -282], [40 + fl, -278], [2, -280]], { wash: '#c82a2a', washA: 1, w: 1.8, col: TM.line });
    rimL(spline(P.slice(0, 9), false, 6), L.side, L.rim, 0.8, 3);
  },
  berretto(t, o, fx, L) {                                              // мягкий берет мастера: складки, тулья, наклон
    const C = '#5a1a26', CD = '#26060c';
    push(0, 22, 1, -0.06); rect(-114, -96, 228, 30, { wash: '#3a0e16', washA: 1, w: 2.6, col: TM.line, key: 372, shade: { gap: 5, a: 0.2, col: '#000' } });
    const P = [[-168, -96], [-156, -146], [-84, -186], [10, -192], [104, -170], [142, -128], [128, -92], [40, -86], [-60, -84], [-146, -82]];
    const bp = softShape(P, { wash: C, washA: 1, w: 3, col: TM.line, key: 373 }, 1.2, 2); metalG(bp.path, L.side * 30, -170, 190, '#a84a5a', C, CD);
    for (const [x0, x1] of [[-120, -60], [-60, -20], [10, 30], [70, 70]]) pencil(spline([[x0, -98], [(x0 + x1) / 2 - 6, -130], [x1, -178]], false, 6), { w: 1.8, col: CD, a: 0.6, pass2: false });
    pencil(spline([[-140, -94], [-40, -86], [60, -88], [124, -96]], false, 8), { w: 2.2, col: CD, a: 0.7, pass2: false });
    pencil(spline([[-120, -150], [-40, -178], [40, -180]], false, 6), { w: 4, col: 'rgba(255,200,200,0.35)', pass2: false });
    rimL(spline(P, true, 8), L.side, L.rim, 0.7, 3); pop();
  },
  paintcap(t, o, fx, L) {                                              // холщовый колпак маляра: мягкий, макушка завалилась набок, в извести
    const CV = '#e2d6ba', CVD = '#8e8266';
    const P = [[-106, -84], [-96, -146], [-36, -182], [34, -188], [92, -170], [130, -142], [154, -108], [146, -88], [120, -96], [106, -84]];
    const cp = softShape(P, { wash: CV, washA: 1, w: 2.8, col: TM.line, key: 382 }, 1.2, 4); shadeG(cp.path, -L.side * 120, 0, L.side * 50, 0, CVD, 0.6); hatch(cp.path, cp.bb, { gap: 4, a: 0.14, col: CVD, ang: 0.1, key: 383, w: 1.2 });
    for (const P2 of [[[-40, -96], [-20, -150], [20, -182]], [[30, -100], [70, -140], [110, -150]], [[96, -110], [126, -128], [146, -100]]]) pencil(spline(P2, false, 6), { w: 1.8, col: CVD, a: 0.65, pass2: false });
    const bd = softShape([[-122, -54], [-118, -96], [0, -106], [118, -96], [122, -54], [0, -46]], { wash: '#d4c6a6', washA: 1, w: 2.6, col: TM.line, key: 384 }, 1, 6); shadeG(bd.path, 0, -46, 0, -106, CVD, 0.5); dashL([[-112, -62], [0, -54], [112, -62]], CVD, 0.6);
    limeSplash(cp.path, cp.bb, 4, 385); limeSplash(bd.path, bd.bb, 2, 386);
    rimL(spline(P, false, 6), L.side, L.rim, 0.7, 3);
  },
  leathercap(t, o, fx, L) {                                            // кожаный колпак литейщика: швы, отворот
    const C = '#6a4628', CD = '#2a180a';
    const P = [[-112, -64], [-108, -120], [-62, -170], [0, -180], [62, -170], [108, -120], [112, -64]];
    const cp = blob(P, { wash: C, washA: 1, w: 3, col: TM.line, key: 392 }); metalG(cp.path, L.side * 40, -150, 170, '#a87a50', C, CD);
    for (const x0 of [-56, 0, 56]) { pencil(spline([[x0, -78], [x0 * 0.7, -140], [0, -178]], false, 6), { w: 2, col: CD, a: 0.7, pass2: false }); dashL(spline([[x0 + 5, -80], [x0 * 0.7 + 4, -140], [4, -174]], false, 6), '#c8a070', 0.5); }
    const bd = blob([[-122, -54], [-118, -88], [0, -98], [118, -88], [122, -54], [0, -48]], { wash: '#5a3a20', washA: 1, w: 2.8, col: TM.line, key: 393 }); shadeG(bd.path, 0, -48, 0, -98, CD, 0.5); dashL([[-110, -64], [-40, -58], [40, -58], [110, -64]], '#c8a070', 0.5);
    ell(-60, -130, 9, 7, { wash: '#1a0e06', washA: 0.85, line: false }); ell(-60, -130, 15, 12, { wash: '#4a2c14', washA: 0.4, line: false });
    rimL(spline(P, false, 6), L.side, L.rim, 0.7, 3);
  },
  kiver(t, o, fx, L) {                                                 // кивер 1812: козырёк, шнуры-этишкет, кокарда, белый султан
    const B = '#18161a', C = '#ecc554', sw = Math.sin(t * 2.6) * 6;
    const pl = spline([[-6, -200], [-20, -256], [-16 + sw * 0.5, -316], [0 + sw, -348], [16 + sw * 0.5, -316], [20, -256], [6, -200]], true, 6);
    const pp = shape(wobP(pl, 1.6, 4), { wash: '#f4f0e6', washA: 1, w: 2.4, col: '#6a645a', a: 0.7, key: 410 }); fstr(pp.path, pp.bb, 60, -1.5, 14, '#c8c2b4', 0.6, 411, 2); shadeG(pp.path, -L.side * 24, 0, L.side * 16, 0, '#9a948a', 0.5);
    blob([[-76, -78], [76, -78], [70, -60], [0, -50], [-70, -60]], { wash: B, washA: 1, w: 3, col: TM.line, key: 412 }); pencil(spline([[10, -56], [40, -58], [64, -64]], false, 6), { w: 3, col: 'rgba(255,255,255,0.4)', pass2: false });
    const BP = [[-74, -76], [-86, -208], [86, -208], [74, -76]]; const bd = poly(BP, { wash: B, washA: 1, w: 3.2, col: TM.line, key: 413 });
    metalG(bd.path, L.side * 40, -150, 150, '#4a4650', B, '#000'); hatch(bd.path, bd.bb, { gap: 5, a: 0.25, col: '#000', ang: -1.3, key: 414 });
    ell(0, -208, 86, 12, { wash: '#2a282e', washA: 1, w: 2.4, col: TM.line }); pencil(spline([[-85, -204], [0, -194], [85, -204]], false, 6), { w: 5, col: C, pass2: false });
    pencil(spline([[-73, -86], [0, -80], [73, -86]], false, 6), { w: 4, col: C, pass2: false });
    for (const [y0, sag] of [[-178, 46], [-162, 60]]) { const P = spline([[-80, y0], [-40, y0 + sag * 0.75], [0, y0 + sag], [40, y0 + sag * 0.75], [78, y0 - 4]], false, 8); pencil(P, { w: 5, col: '#5a4010', a: 0.5, pass2: false, gap: false }); pencil(P, { w: 3.2, col: C, pass2: false, gap: false }); resample(P, 7).forEach(([x, y], i) => i % 2 || (ctx.fillStyle = '#8a6818', ctx.fillRect(x - 1, y - 1, 2 / S, 2 / S))); }
    line([[78, -182], [92, -140], [96, -104]], { w: 3, col: C, pass2: false }); blob([[90, -108], [104, -108], [108, -78], [86, -78]], { wash: C, washA: 1, w: 1.6, col: CU.goldD }); for (let k = -2; k <= 2; k++) line([[97 + k * 4, -80], [97 + k * 5, -64]], { w: 1.6, col: C, pass2: false, smooth: false });
    ell(0, -186, 14, 16, { wash: '#e07a1a', washA: 1, w: 2, col: TM.line }); ell(0, -186, 8, 10, { wash: '#141414', washA: 1, w: 1.2 }); ell(0, -186, 3, 4, { wash: '#e07a1a', washA: 1, line: false });
    rimL(BP, L.side, L.rim, 0.75, 3);
  },
  metro(t, o, fx, L) {                                                 // каска метростроевца: поля, гребень, «М», фонарь
    const C = '#ebe2c8', CD = '#9a8e6e';
    const br = ell(0, -68, 138, 24, { wash: C, washA: 1, w: 3, col: TM.line, key: 430 }); shadeG(br.path, 0, -44, 0, -80, CD, 0.7);
    const P = [[-104, -74], [-98, -132], [-56, -172], [0, -182], [56, -172], [98, -132], [104, -74], [0, -66]];
    const dp = blob(P, { wash: C, washA: 1, w: 3.2, col: TM.line, key: 431 }); metalG(dp.path, L.side * 40, -150, 170, '#ffffff', C, CD);
    pencil(spline([[-8, -82], [-6, -150], [0, -180]], false, 6), { w: 7, col: '#d8ceb0', pass2: false }); pencil(spline([[-12, -84], [-10, -150], [-4, -178]], false, 6), { w: 1.4, col: CD, a: 0.8, pass2: false });
    metroM(0, -110, 22, false);
    line([[-60, -158], [-96, -150], [-130, -120]], { w: 4, col: '#2a2420', pass2: false });
    rect(-14, -170, 28, 16, { wash: '#4a4a46', washA: 1, w: 2, col: TM.line }); ell(0, -174, 15, 13, { wash: '#7a7a74', washA: 1, w: 2.4, col: TM.line }); ell(0, -174, 10, 8.5, { wash: '#fff4c0', washA: 1, w: 1.4, col: '#8a7a40' });
    rimL(spline(P.slice(0, 7), false, 6), L.side, L.rim, 0.75, 3);
  },
  aviator(t, o, fx, L) {                                               // лётный шлем: купол, ушные клапаны с мехом, очки-консервы на лбу
    const LC = '#6a4426', LD = '#2a160a', LL = '#a87a4a', FU = '#e8dcc0';
    const P = [[-118, -44], [-124, -96], [-86, -146], [0, -162], [86, -146], [124, -96], [118, -44], [112, 30], [114, 78], [98, 94], [86, 58], [80, 6], [56, -52], [0, -62], [-56, -52], [-80, 6], [-86, 58], [-98, 94], [-114, 78], [-112, 30]];
    const hp = blob(P, { wash: LC, washA: 1, w: 3.2, col: TM.line, key: 600 }); metalG(hp.path, L.side * 40, -120, 190, LL, LC, LD, 0.9);
    hatch(hp.path, hp.bb, { gap: 6, a: 0.16, col: LD, ang: 1.2, key: 601, w: 1.4 });
    ctx.save(); ctx.clip(hp.path); ctx.strokeStyle = 'rgba(255,224,170,0.5)'; ctx.lineCap = 'round'; ctx.lineWidth = 9 / S; ctx.beginPath(); ctx.moveTo(L.side * 40, -150); ctx.quadraticCurveTo(L.side * 84, -120, L.side * 92, -70); ctx.stroke(); ctx.restore();
    pencil(spline([[0, -162], [-2, -110], [0, -62]], false, 6), { w: 2.2, col: LD, a: 0.9, pass2: false }); dashL([[6, -158], [4, -110], [6, -66]], '#d2a870', 0.7);
    for (const sd of [-1, 1]) { pencil(spline([[sd * 40, -154], [sd * 66, -112], [sd * 78, -60]], false, 6), { w: 1.8, col: LD, a: 0.8, pass2: false }); dashL([[sd * 44, -152], [sd * 70, -112], [sd * 82, -62]], '#d2a870', 0.55);
      furBand([[sd * 80, 4], [sd * 85, 48], [sd * 96, 90]], 13, FU, '#a8946e', '#fffaf0', 602 + sd, { curl: 1, n: 24, len: 6 });
      line([[sd * 103, 90], [sd * 100, 124]], { w: 4, col: LD, pass2: false }); rect(sd * 100 - 5, 118, 10, 12, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD }); }
    furBand([[-58, -52], [-28, -60], [0, -63], [28, -60], [58, -52]], 10, FU, '#a8946e', '#fffaf0', 605, { n: 40, len: 5 });
    pencil(spline([[-122, -76], [-60, -82], [0, -84], [60, -82], [122, -76]], false, 8), { w: 12, col: '#14100c', a: 0.95 });
    for (const sd of [-1, 1]) { const x = sd * 42, y = -80;
      const rg = ell(x, y, 29, 26, { wash: CU.gold, washA: 1, w: 2.4, col: CU.goldD, key: 606 + sd }); metalG(rg.path, x - 8, y - 8, 40, CU.goldL, CU.gold, CU.goldD);
      const gl = ell(x, y, 21, 18, { wash: '#8fc7d6', washA: 1, w: 1.6, col: '#3a2a10' }); const g = ctx.createRadialGradient(x - 6, y - 6, 2, x, y, 22); g.addColorStop(0, 'rgba(230,250,255,0.75)'); g.addColorStop(1, 'rgba(40,90,110,0.45)'); ctx.fillStyle = g; ctx.fill(gl.path);
      pencil([[x - 12, y - 8], [x - 2, y - 14]], { w: 3.4, col: 'rgba(255,255,255,0.9)', pass2: false, gap: false }); for (const a of [0.6, 2.4, 4.0, 5.4]) nb(x + Math.cos(a) * 25, y + Math.sin(a) * 22, 2, CU.goldL); }
    rect(-14, -86, 28, 11, { wash: CU.gold, washA: 1, w: 2, col: CU.goldD });
    rimL(spline(P.slice(0, 8), false, 6), L.side, L.rim, 0.75, 3);
  },
  bowler(t, o, fx, L) {                                                // котелок: загнутые поля, лента, блик
    const C = '#18181c', CD = '#000', CL = '#3a3a42';
    const br = ell(0, -76, 112, 19, { wash: C, washA: 1, w: 3, col: TM.line, key: 610 }); shadeG(br.path, 0, -60, 0, -92, CL, 0.6);
    const P = [[-86, -72], [-86, -118], [-58, -158], [0, -172], [58, -158], [86, -118], [86, -72], [0, -64]];
    const dp = blob(P, { wash: C, washA: 1, w: 3.2, col: TM.line, key: 611 }); metalG(dp.path, L.side * 36, -140, 150, CL, C, CD);
    rect(-86, -102, 172, 17, { wash: '#0a0a0c', washA: 1, w: 1.8, col: TM.line, key: 612 }); pencil([[-84, -100], [84, -100]], { w: 1.2, col: CL, a: 0.8, pass2: false });
    ctx.save(); ctx.clip(dp.path); ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineCap = 'round'; ctx.lineWidth = 8 / S; ctx.beginPath(); ctx.moveTo(L.side * 30, -160); ctx.quadraticCurveTo(L.side * 58, -140, L.side * 66, -112); ctx.stroke(); ctx.restore();
    pencil(spline([[-34, -166], [0, -170], [34, -166]], false, 6), { w: 1.4, col: CL, a: 0.7, pass2: false });
    rimL(spline(P.slice(0, 7), false, 6), L.side, L.rim, 0.7, 3);
  },
  bogatyr(t, o, fx, L) {                                               // шелом: высокий островерхий (стрельчатый), золочёный обод, наносник
    const P = [[-104, -64], [-102, -110], [-84, -158], [-56, -204], [-26, -248], [0, -282], [26, -248], [56, -204], [84, -158], [102, -110], [104, -64], [0, -56]];
    const hp = blob(P, { wash: CU.steel, washA: 1, w: 3.2, col: TM.line, key: 620 }); metalG(hp.path, L.side * 36, -170, 190, CU.steelL, CU.steel, CU.steelD);
    hatch(hp.path, hp.bb, { gap: 6, a: 0.16, col: CU.steelD, ang: -1.3, key: 621 });
    ctx.save(); ctx.clip(hp.path); ctx.strokeStyle = 'rgba(255,255,255,0.65)'; ctx.lineCap = 'round'; ctx.lineWidth = 8 / S; ctx.beginPath(); ctx.moveTo(L.side * 22, -250); ctx.quadraticCurveTo(L.side * 60, -180, L.side * 76, -100); ctx.stroke(); ctx.restore();
    for (const sd of [-1, 1]) { pencil(spline([[0, -280], [sd * 40, -190], [sd * 70, -76]], false, 6), { w: 5, col: CU.gold, a: 0.95, pass2: false }); for (const [x, y] of [[0.3, -226], [0.55, -170], [0.75, -118]]) nb(sd * 100 * x * 0.62, y, 3, CU.goldL); }
    pencil([[0, -280], [0, -80]], { w: 3, col: CU.goldD, a: 0.7, pass2: false });
    goldBand([[-104, -76], [-52, -68], [0, -66], [52, -68], [104, -76]], 22, 622, { pearls: 1 }); gem(0, -68, 6.5, CU.ruby);
    for (const sd of [-1, 1]) gem(sd * 56, -70, 4.4, '#1a7a4a');
    const ns = poly([[-7, -70], [7, -70], [8, 6], [0, 20], [-8, 6]], { wash: CU.steel, washA: 1, w: 2.2, col: TM.line, key: 623 }); metalG(ns.path, -2, -30, 60, CU.steelL, CU.steel, CU.steelD); pencil([[0, -62], [0, 8]], { w: 2.2, col: CU.gold, a: 0.9, pass2: false });
    ell(0, -286, 8, 8, { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); ell(-2, -288, 3, 3, { wash: CU.goldL, washA: 1, line: false }); rect(-3, -280, 6, 12, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD });
    rimL(spline(P.slice(0, 11), false, 6), L.side, L.rim, 0.8, 3);
  },
  circlet(t, o, fx, L) {                                               // тонкий золотой обруч с зубцами и камнями
    const yb = x => -98 + (x / 104) * (x / 104) * 40;
    const C = spline([[-106, -56], [-66, yb(66)], [0, -98], [66, yb(66)], [106, -56]], false, 8);
    for (const [x, h] of [[-74, 22], [-38, 30], [0, 38], [38, 30], [74, 22]]) { const y = yb(x); const tp = poly([[x - 10, y + 6], [x + 10, y + 6], [x, y - h]], { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); metalG(tp.path, x - 2, y - h * 0.5, 30, CU.goldL, CU.gold, CU.goldD); ell(x, y - h - 2, 4.4, 4.4, { wash: CU.pearl, washA: 1, w: 1.2, col: CU.goldD }); }
    const band = shape(tubeP(C, 13, 13), { wash: CU.gold, washA: 1, w: 2.2, col: CU.goldD, key: 630 }); metalG(band.path, L.side * 40, -92, 130, CU.goldL, CU.gold, CU.goldD);
    pencil(edgeOff(C, -4), { w: 1.2, col: CU.goldD, a: 0.7, pass2: false, gap: false });
    gem(0, -96, 5.6, CU.ruby); gem(-40, yb(40), 4, '#1a7a4a'); gem(40, yb(40), 4, '#1a7a4a'); gem(-76, yb(76), 3.4, '#2a4aaa'); gem(76, yb(76), 3.4, '#2a4aaa');
  },
  spangen(t, o, fx, L) {                                               // спангенхельм: купол из полос с «очками» — кольцами вокруг глаз
    const ST = '#8a8e94', BR = CU.copper;
    const P = [[-102, -64], [-98, -118], [-60, -170], [0, -190], [60, -170], [98, -118], [102, -64], [0, -58]];
    const hp = blob(P, { wash: ST, washA: 1, w: 3.2, col: TM.line, key: 640 }); metalG(hp.path, L.side * 40, -140, 180, CU.steelL, ST, CU.steelD);
    hatch(hp.path, hp.bb, { gap: 6, a: 0.18, col: CU.steelD, ang: -1.1, key: 641 });
    for (const [x1, c1] of [[-86, -150], [-48, -176], [0, 0], [48, -176], [86, -150]]) { if (x1 === 0) { pencil([[0, -190], [0, -66]], { w: 9, col: BR, pass2: false }); pencil([[-3, -188], [-3, -68]], { w: 2, col: CU.copperL, a: 0.8, pass2: false }); } else pencil(spline([[0, -192], [x1 * 0.62, c1 - 8], [x1 * 1.05, -70]], false, 6), { w: 8, col: BR, pass2: false }); }
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 20; nb(0, yy, 3, CU.copperL); }
    pencil([[-103, -70], [-52, -60], [0, -58], [52, -60], [103, -70]], { w: 14, col: BR, pass2: false }); pencil([[-100, -74], [-50, -64], [0, -62], [50, -64], [100, -74]], { w: 2, col: CU.copperL, a: 0.8, pass2: false });
    for (let x = -90; x <= 90; x += 20) nb(x, -64 - Math.abs(x) * 0.1, 3.4, CU.copperL);
    poly([[-5, -206], [5, -206], [2, -190], [-2, -190]], { wash: BR, washA: 1, w: 1.6, col: CU.copperD }); line([[0, -206], [0, -222]], { w: 3.4, col: CU.steelD, pass2: false });
    for (const sd of [-1, 1]) { const ex = sd * 42 + fx, ey = -10;
      pencil([[ex, ey - 36], [ex, -60]], { w: 7, col: BR, pass2: false });
      pencil(ellPts(ex, ey, 37, 35, 0, 0.04, 40), { w: 8, col: ST, pass2: false }); pencil(ellPts(ex, ey, 37, 35, 0, 0.04, 40), { w: 4.4, col: CU.steelL, a: 0.7, pass2: false }); pencil(ellPts(ex, ey, 40.5, 38.5, 0, 0.04, 40), { w: 1.8, col: TM.line, a: 0.9, pass2: false }); pencil(ellPts(ex, ey, 33.5, 31.5, 0, 0.04, 40), { w: 1.4, col: TM.line, a: 0.7, pass2: false }); }
    pencil(spline([[-6 + fx, -10], [0 + fx, -16], [6 + fx, -10]], false, 4), { w: 8, col: ST, pass2: false }); pencil(spline([[-6 + fx, -10], [0 + fx, -16], [6 + fx, -10]], false, 4), { w: 2, col: TM.line, a: 0.8, pass2: false });
    rimL(spline(P.slice(0, 7), false, 6), L.side, L.rim, 0.8, 3);
  },
  mask(t, o, fx, L) {                                                  // маска для ныряния: прозрачное стекло, глаза видны; трубка сбоку
    const cx = fx * 0.9, cy = -6;
    const sn = spline([[-96 + cx, 40], [-122 + cx, 10], [-138 + cx, -60], [-132 + cx, -150], [-122 + cx, -200]], false, 8), snp = shape(tubeP(sn, 14, 14), { wash: '#10161a', washA: 1, w: 2.4, col: TM.line, key: 650 });
    pencil(edgeOff(sn, -3), { w: 2, col: '#6a7a82', a: 0.7, pass2: false, gap: false }); rect(-142 + cx, -214, 22, 18, { wash: '#14a8a0', washA: 1, w: 2, col: TM.line, rot: 0 }); ell(-100 + cx, 44, 9, 7, { wash: '#f08a2a', washA: 1, w: 2, col: TM.line });
    for (const sd of [-1, 1]) pencil([[sd * 100 + cx, cy - 4], [sd * 128, cy - 26]], { w: 12, col: '#14181c', pass2: false });
    rect(-137, -40, 18, 14, { wash: '#0a0e10', washA: 1, w: 1.6, col: TM.line });
    const LP = [[-92, -38], [-62, -52], [-10, -48], [10, -48], [62, -52], [92, -38], [96, 4], [74, 30], [28, 28], [14, 50], [-14, 50], [-28, 28], [-74, 30], [-96, 4]];
    const gp = { path: pathOf(spline(LP.map(([x, y]) => [x + cx, y + cy]), true, 8)) };
    const g = ctx.createLinearGradient(cx - 90, cy - 50, cx + 90, cy + 40); g.addColorStop(0, 'rgba(190,240,250,0.30)'); g.addColorStop(0.5, 'rgba(120,200,220,0.14)'); g.addColorStop(1, 'rgba(60,130,160,0.26)'); ctx.fillStyle = g; ctx.fill(gp.path);
    const outer = new Path2D(), inner = new Path2D(), OP = spline(LP.map(([x, y]) => [(x * 1.1) + cx, (y * 1.18) + cy]), true, 8), IP = spline(LP.map(([x, y]) => [x + cx, y + cy]), true, 8);
    outer.moveTo(OP[0][0], OP[0][1]); OP.forEach(p => outer.lineTo(p[0], p[1])); outer.closePath(); outer.moveTo(IP[0][0], IP[0][1]); IP.slice().reverse().forEach(p => outer.lineTo(p[0], p[1])); outer.closePath();
    ctx.save(); ctx.fillStyle = '#10161a'; ctx.fill(outer, 'evenodd'); ctx.restore(); pencil(OP.concat([OP[0]]), { w: 3, col: TM.line, a: 0.9, pass2: false }); pencil(IP.concat([IP[0]]), { w: 3.4, col: '#14a8a0', a: 0.95, pass2: false });
    ctx.save(); ctx.clip(gp.path); ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineCap = 'round'; ctx.lineWidth = 6 / S; ctx.beginPath(); ctx.moveTo(cx - 74, cy - 24); ctx.lineTo(cx - 40, cy - 40); ctx.stroke(); ctx.lineWidth = 3 / S; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.moveTo(cx - 30, cy - 40); ctx.lineTo(cx - 16, cy - 44); ctx.stroke(); ctx.restore();
    pencil([[cx + 56, cy + 14], [cx + 74, cy + 8]], { w: 2.4, col: 'rgba(255,255,255,0.6)', pass2: false, gap: false });
  }
  ,
  /* ---- 004 Сеул */
  samo(t, o, fx, L) {                                                  // само: чёрная чиновничья шапка с высоким задком и двумя «крылышками»
    const C = '#141418', CL = '#3a3a46';
    for (const sd of [-1, 1]) { push(sd * 112 + fx * 0.3, -108, 1, sd * 0.06); const wg = ell(0, 0, 48, 20, { wash: C, washA: 0.92, w: 2.4, col: TM.line, key: 760 + sd });
      ctx.save(); ctx.clip(wg.path); for (let x = -50; x < 50; x += 9) pencil([[x, -22], [x + 14, 22]], { w: 1.2, col: CL, a: 0.6, pass2: false, gap: false }); ctx.restore(); pop(); }
    const back = blob([[-58, -86], [-56, -150], [-30, -178], [30, -178], [56, -150], [58, -86]], { wash: C, washA: 1, w: 2.8, col: TM.line, key: 762 }); metalG(back.path, L.side * 24, -158, 70, CL, C, '#000');
    const fr = blob([[-96, -60], [-92, -100], [-50, -118], [50, -118], [92, -100], [96, -60], [0, -70]], { wash: C, washA: 1, w: 3, col: TM.line, key: 763 }); metalG(fr.path, L.side * 40, -100, 110, CL, C, '#000');
    pencil(spline([[-90, -96], [0, -112], [90, -96]], false, 6), { w: 1.4, col: CL, a: 0.8, pass2: false });
    rimL(spline([[-58, -150], [-30, -178], [30, -178], [58, -150]], false, 6), L.side, L.rim, 0.6, 3);
  },
  jeonrip(t, o, fx, L) {                                               // чонрип: чёрная войлочная шляпа воина, красная кисть-сангмо, перо, бусы на ремешке
    const C = '#1a1a1e', CL = '#44444e';
    const br = ell(fx * 0.2, -88, 158, 30, { wash: C, washA: 1, w: 3, col: TM.line, key: 770 }); shadeG(br.path, 0, -60, 0, -118, CL, 0.5);
    const cr = blob([[-64, -96], [-58, -150], [-30, -176], [30, -176], [58, -150], [64, -96]], { wash: C, washA: 1, w: 3, col: TM.line, key: 771 }); metalG(cr.path, L.side * 26, -150, 80, CL, C, '#000');
    rect(-64, -110, 128, 12, { wash: '#2a5aa8', washA: 1, w: 1.6, col: TM.line });
    const sw = Math.sin(t * 3) * 6;
    for (let k = 0; k < 14; k++) { const a = -0.9 + k / 13 * 1.8; pencil([[0, -178], [Math.sin(a) * 40 + sw, -170 + Math.cos(a) * 30]], { w: 3.4, col: k % 2 ? '#d43a2a' : '#a8201a', pass2: false, gap: false }); }
    ell(0, -180, 9, 7, { wash: CU.gold, washA: 1, w: 1.4, col: CU.goldD });
    const F = spline([[30, -170], [70, -230], [92, -300]], false, 6); pencil(F, { w: 3, col: '#5a4a2a', pass2: false }); for (let i = 1; i < F.length; i += 2) { const [x, y] = F[i]; pencil([[x, y], [x + 18, y - 4]], { w: 2, col: '#2a6a5a', a: 0.8, pass2: false }); pencil([[x, y], [x - 12, y - 10]], { w: 2, col: '#2a6a5a', a: 0.8, pass2: false }); }
    ell(92, -304, 10, 12, { wash: '#1a5a8a', washA: 1, w: 1.4, col: TM.line }); ell(92, -304, 4, 5, { wash: '#e8b030', washA: 1, line: false });
    for (const sd of [-1, 1]) { const P = spline([[sd * 132, -84], [sd * 146, -20], [sd * 142, 40]], false, 8); P.forEach(([x, y], i) => i % 2 || ell(x, y, 4.4, 4.4, { wash: i % 4 ? '#e8d8a8' : '#a8302a', washA: 1, w: 1, col: TM.line })); }
  },
  gat(t, o, fx, L) {                                                   // кат: чёрная шляпа из конского волоса — прозрачные широкие поля, высокая тулья, бусы-завязки
    const C = '#141418';
    const br = ellPts(fx * 0.2, -84, 172, 30, 0, 0, 40); const bp = shape(br, { wash: C, washA: 0.5, w: 2.6, col: TM.line, key: 780 });
    ctx.save(); ctx.clip(bp.path); for (let k = 0; k < 40; k++) { const a = k / 40 * 6.283; pencil([[fx * 0.2, -84], [fx * 0.2 + Math.cos(a) * 176, -84 + Math.sin(a) * 32]], { w: 0.8, col: '#000', a: 0.5, pass2: false, gap: false }); } ctx.restore();
    pencil(ellPts(fx * 0.2, -84, 70, 13, 0, 0, 24), { w: 1.4, col: '#000', a: 0.7, pass2: false });
    const cr = shape([[-60, -88], [-54, -192], [54, -192], [60, -88]], { wash: C, washA: 0.72, w: 2.8, col: TM.line, key: 781 });
    ctx.save(); ctx.clip(cr.path); for (let y = -186; y < -90; y += 8) pencil([[-62, y], [62, y]], { w: 0.8, col: '#000', a: 0.5, pass2: false, gap: false }); ctx.restore();
    ell(0, -192, 54, 10, { wash: '#000', washA: 0.85, w: 2, col: TM.line });
    rect(-58, -108, 116, 12, { wash: '#000', washA: 0.9, w: 1.4, col: TM.line });
    rimL([[-54, -190], [-58, -140], [-60, -90]], L.side, L.rim, 0.5, 2.4); rimL([[54, -190], [58, -140], [60, -90]], L.side, L.rim, 0.5, 2.4);
    for (const sd of [-1, 1]) { const P = spline([[sd * 66, -90], [sd * 124, 0], [sd * 104, 100], [sd * 40, 150]], false, 14); P.forEach(([x, y], i) => i % 2 || ell(x, y, 3.8, 3.8, { wash: i % 3 ? '#2a2a2a' : '#d6a842', washA: 1, w: 0.8, col: '#000' })); }
  },
  straw(t, o, fx, L) {                                                 // соломенная шляпа крестьянина
    const C = '#d8b866', CD = '#8a6a2a';
    const br = blob([[-170, -70], [-110, -104], [0, -118], [110, -104], [170, -70], [100, -60], [0, -56], [-100, -60]], { wash: C, washA: 1, w: 3, col: TM.line, key: 790 });
    hatch(br.path, br.bb, { gap: 6, a: 0.35, col: CD, ang: 0.25, key: 791, w: 1.2 }); hatch(br.path, br.bb, { gap: 6, a: 0.3, col: CD, ang: -0.25, key: 792, w: 1.2 }); shadeG(br.path, 0, -56, 0, -118, CD, 0.35);
    const cr = blob([[-62, -100], [-52, -150], [0, -168], [52, -150], [62, -100]], { wash: C, washA: 1, w: 3, col: TM.line, key: 793 });
    hatch(cr.path, cr.bb, { gap: 7, a: 0.35, col: CD, ang: 1.4, key: 794, w: 1.2 }); shadeG(cr.path, L.side * 40, -130, -L.side * 40, -130, '#fff2c0', 0.3);
    rect(-62, -116, 124, 12, { wash: '#2a4a3a', washA: 1, w: 1.6, col: TM.line });
    for (let k = 0; k < 7; k++) { const x = -150 + k * 50, r = rng(795 + k); pencil([[x, -70], [x + (r() - 0.5) * 14, -52]], { w: 1.2, col: CD, a: 0.6, pass2: false }); }
  },
  shades(t, o, fx, L) {                                                // тёмные очки (2012)
    for (const sd of [-1, 1]) { const ex = sd * 42 + fx, g = blob([[ex - 38, -34], [ex + 38, -34], [ex + 34, 6], [ex, 18], [ex - 34, 6]], { wash: '#0e0e14', washA: 0.97, w: 3, col: TM.line, key: 796 + sd });
      ctx.save(); ctx.clip(g.path); ctx.strokeStyle = 'rgba(180,220,255,0.55)'; ctx.lineWidth = 6 / S; ctx.beginPath(); ctx.moveTo(ex - 20, -28); ctx.lineTo(ex - 32, -6); ctx.stroke(); ctx.restore(); }
    pencil([[-4 + fx, -26], [4 + fx, -26]], { w: 5, col: '#0e0e14', pass2: false }); for (const sd of [-1, 1]) pencil([[sd * 80 + fx, -28], [sd * 104, -36]], { w: 5, col: '#0e0e14', pass2: false });
  },
  // ---- добавлено tools/add_costume.py
  tricorn(t, o, fx, L, OF) {                                           // треуголка: чёрный войлок, поля загнуты в три угла, позумент, кокарда
    const C = '#18161a', CL = '#3a3640', ed = (OF && OF.lace) || '#e8e0cc';
    const back = blob([[-70, -92], [-60, -150], [0, -168], [60, -150], [70, -92]], { wash: C, washA: 1, w: 2.6, col: TM.line, key: 820 }); metalG(back.path, L.side * 30, -140, 90, CL, C, '#000');
    const P = [[-150, -112], [-90, -84], [0, -60 + 0], [90, -84], [150, -112], [110, -122], [40, -98], [0, -110], [-40, -98], [-110, -122]];
    const br = shape(spline(P, true, 6), { wash: C, washA: 1, w: 3, col: TM.line, key: 821 }); shadeG(br.path, 0, -60, 0, -120, CL, 0.5);
    pencil(spline([[-150, -112], [-90, -84], [0, -60], [90, -84], [150, -112]], false, 8), { w: 5, col: ed, a: 0.95, pass2: false });
    ell(fx * 0.3 - 46, -96, 12, 12, { wash: '#f6f2ea', washA: 1, w: 1.4, col: TM.line }); ell(fx * 0.3 - 46, -96, 5, 5, { wash: '#c8201e', washA: 1, line: false });
    rimL(spline([[-70, -92], [-60, -150], [0, -168], [60, -150], [70, -92]], false, 6), L.side, L.rim, 0.6, 3);
  },
  // ---- добавлено tools/add_costume.py
  pilotka(t, o, fx, L) {                                                 // пилотка 1940-х: хаки, набок, складка, без кокарды
    const p = blob([[-104, -78 + fx * 0.1], [-88, -116], [-10, -130], [80, -120], [108, -86], [0, -96]], { wash: '#7a7646', washA: 1, w: 3, col: TM.line, key: 391, shade: { gap: 5, a: 0.3, col: '#3e3c20' } });
    pencil([[-96, -90], [-6, -102], [100, -92]], { w: 2.4, col: '#3e3c20', a: 0.8, pass2: false });
    pencil([[-80, -112], [-8, -124], [72, -116]], { w: 1.6, col: '#aaa676', a: 0.7, pass2: false });
  },
  // ---- добавлено tools/add_costume.py
  papakha(t, o, fx, L) {                                                 // папаха из чёрного каракуля: высокая, чуть расширяется кверху, завитки
    blob([[-96, -70 + fx * 0.1], [-104, -150], [-90, -196], [0, -206], [92, -198], [104, -150], [96, -70], [0, -86]], { wash: '#1e1a1a', washA: 1, w: 3, col: TM.line, key: 392, shade: { gap: 5, a: 0.3, col: '#000' } });
    const r = rng(393); for (let i = 0; i < 26; i++) { const x = -84 + r() * 168, y = -186 + r() * 104; ell(x, y, 7, 5, { wash: '#3a3434', washA: 0.9, w: 1.2, col: '#0a0808', key: 394 + i }); }
    pencil([[-98, -82], [0, -96], [98, -82]], { w: 2.4, col: '#0a0808', a: 0.8, pass2: false });
  },
  // ---- добавлено tools/add_costume.py
  sombrero(t, o, fx, L) {                                                // сомбреро: широкие поля, высокая тулья, цветная лента
    blob([[-190, -70 + fx * 0.1], [-120, -98], [0, -104], [120, -98], [190, -70], [120, -54], [0, -50], [-120, -54]], { wash: '#d8b870', washA: 1, w: 3, col: TM.line, key: 395, shade: { gap: 6, a: 0.25, col: '#8a6a2a' } });
    blob([[-62, -90], [-56, -170], [0, -196], [56, -170], [62, -90]], { wash: '#e2c47c', washA: 1, w: 3, col: TM.line, key: 396 });
    pencil([[-62, -104], [0, -110], [62, -104]], { w: 10, col: '#c8302a', a: 0.95, pass2: false }); pencil([[-60, -116], [60, -116]], { w: 3, col: '#2a7a4a', pass2: false });
  },
  // ---- добавлено tools/add_costume.py
  galea(t, o, fx, L) {                                                   // римский шлем: бронзовый колпак, нащёчники, красный гребень
    blob([[-100, -70 + fx * 0.1], [-104, -130], [-60, -176], [0, -186], [60, -176], [104, -130], [100, -70], [0, -84]], { wash: '#c8963a', washA: 1, w: 3, col: TM.line, key: 397, shade: { gap: 5, a: 0.25, col: '#6a4a10' } });
    pencil([[-104, -84], [0, -98], [104, -84]], { w: 6, col: '#8a6418', pass2: false });
    blob([[-60, -186], [-50, -236], [0, -256], [50, -236], [60, -186], [0, -196]], { wash: '#c8201e', washA: 1, w: 2.4, col: '#5a0a08', key: 398 }); for (let q = -4; q <= 4; q++) pencil([[q * 12, -196], [q * 13, -246]], { w: 2, col: '#8a1010', a: 0.7, pass2: false });
  }
};
/* ---- рукава: кольчуга, прорези, закатанные рукава, манжеты, «венгерские узлы», известь */
function arm6(C, p, OF, k, t, sh, hand) {
  const near = k === 'near';
  if (OF.mail === 1) { mailTex(p.path, p.bb, near ? 440 : 441, 3.1); if (!near) wash(p.path, '#000', 0.18); }
  if (OF.mail === 2) { const hh = C.slice(0, Math.max(4, Math.floor(C.length * 0.55))), mp = shape(tubeP(hh, 48, 45), { wash: near ? '#7d868e' : '#5e666e', washA: 1, w: 2.4, col: TM.line, key: near ? 453 : 454 }); mailTex(mp.path, mp.bb, near ? 440 : 441, 3.1); shadeG(mp.path, 30, 0, -30, 0, '#14181c', 0.4); }
  if (OF.bracer) { const Cb = C.slice(-8, -1), bc = Cb[Math.floor(Cb.length / 2)], br = shape(tubeP(Cb, 50, 48), { wash: near ? OF.bracer : shadeC(OF.bracer), washA: 1, w: 2.4, col: TM.line, key: near ? 458 : 459 }); metalG(br.path, bc[0] - 8, bc[1] - 6, 44, CU.steelL, CU.steel, CU.steelD, near ? 1 : 0.8); for (const sd of [-1, 1]) pencil(edgeOff(Cb, sd * 20), { w: 1.6, col: CU.gold, a: 0.9, pass2: false, gap: false }); nb(bc[0], bc[1], 3.6); }
  if (OF.stitch) embroid(C.slice(-6, -1), 46, 455, OF.stitch);
  if (OF.bare) { fstr(p.path, p.bb, 26, 1.4, 8, TM.furD, 0.5, 456); fstr(p.path, p.bb, 16, 1.3, 7, TM.furL, 0.5, 457); }
  if (OF.canvas) hatch(p.path, p.bb, { gap: 5, a: 0.15, col: OF.topD, ang: -0.8, key: 442, w: 1.4 });
  if (OF.slash) for (let i = 4; i < C.length - 5; i += 4) { const [x, y] = C[i]; for (const d of [-10, 10]) ell(x + d, y + 1, 3, 9, { wash: OF.slash, washA: 1, w: 1.2, col: TM.line, a: 0.6 }); }
  if (OF.rolled) { const m = Math.floor(C.length * 0.5), Cf = C.slice(m);
    const fp = shape(fluff(tubeP(Cf, 38, 34), 3, near ? 443 : 444), { wash: near ? TM.fur : TM.furM, washA: 0.99, w: 2.6, col: TM.line, key: 445 }); fstr(fp.path, fp.bb, 24, 1.4, 9, TM.furD, 0.5, 446); fstr(fp.path, fp.bb, 14, 1.3, 8, TM.furL, 0.5, 447);
    const rp = shape(tubeP(C.slice(m - 3, m + 2), 54, 52), { wash: near ? OF.top : shadeC(OF.top), washA: 1, w: 2.4, col: TM.line, key: 448 }); pencil(edgeOff(C.slice(m - 3, m + 2), 4), { w: 1.6, col: OF.topD, a: 0.7, pass2: false, gap: false }); }
  if (OF.cuff) { const Cc = C.slice(-6, -1), cp = shape(tubeP(Cc, 52, 50), { wash: near ? OF.cuff : shadeC(OF.cuff), washA: 1, w: 2.4, col: TM.line, a: 0.8, key: 449 });
    if (OF.cuffFur) { curls(cp.path, cp.bb, 26, '#b8a888', 0.6, 450, 3.4); fstr(cp.path, cp.bb, 16, 1.4, 7, '#ffffff', 0.6, 451); }
    if (OF.cuffGold) { const R = resample(edgeOff(Cc, 0), 10); R.forEach(([x, y], i) => (i % 2 ? pearlDot(x, y, 2.6) : gem(x, y, 2.4, CU.ruby))); for (const sd of [-1, 1]) pencil(edgeOff(Cc, sd * 22), { w: 1.4, col: CU.goldD, pass2: false, gap: false }); } }
  if (OF.cuffKnot) { const i = C.length - 10, [x, y] = C[i]; pencil(spline([[x - 16, y + 18], [x - 6, y - 8], [x, y - 24], [x + 6, y - 8], [x + 16, y + 18]], false, 6), { w: 2.8, col: OF.cord, pass2: false }); ctx.strokeStyle = OF.cord; ctx.lineWidth = 2.4 / S; ctx.beginPath(); ctx.ellipse(x, y - 28, 6, 5, 0, 0, 6.283); ctx.stroke(); pencil(edgeOff(C.slice(-6, -2), 0).map(([a, b2]) => [a, b2]), { w: 4, col: OF.cord, a: 0.8, pass2: false }); }
  if (OF.splash && near) limeSplash(p.path, p.bb, 3, 452);
}
/* ---- обувь (рисуется вместо лапы-ступни) */
const BOOTS = {
  leather: { c: '#4a3020', d: '#1e1208', h: 54 }, diver: { c: '#3a3632', d: '#121010', h: 50, toe: 1 }, valenki: { c: '#6a6660', d: '#34322e', h: 70, felt: 1 },
  knyaz: { c: '#9a2a1e', d: '#3a0a06', h: 62, trim: CU.gold, tip: 1 }, hussar: { c: '#161416', d: '#000', h: 66, trim: '#ecc554', tassel: 1 }, lapti: { c: '#c8a868', d: '#7a6034', h: 20, lapti: 1 },
  shoe: { c: '#3a2a1e', d: '#120a06', h: 18 }, rubber: { c: '#26282c', d: '#08090a', h: 62, shine: 1 },
  aviator: { c: '#4a2c16', d: '#1a0e06', h: 62, trim: '#8a5a2a' }, oxford: { c: '#1c1a1c', d: '#000', h: 18, shine: 1 }, bogatyr: { c: '#3a2414', d: '#120a04', h: 56, trim: '#a8302a' },
  varyag: { c: '#5a3c22', d: '#22160a', h: 58, wrap: '#b8a070' }, fin: { c: '#14232e', d: '#050a0e', h: 34, fin: 1 }
};
function boot5(fx, fy, lx, bob, OF, k) {
  const B = BOOTS[OF.boots] || BOOTS.leather, top = fy - B.h;
  if (B.fin) { const fn = blob([[fx - 18, fy - 6], [fx + 40, fy - 12], [fx + 98, fy - 4], [fx + 116, fy + 10], [fx + 100, fy + 18], [fx + 40, fy + 15], [fx - 18, fy + 15]], { wash: '#14b4aa', washA: 1, w: 2.8, col: TM.line, key: 472 + k }); shadeG(fn.path, fx, fy + 20, fx, fy - 14, '#06504c', 0.5); for (let x = fx + 24; x < fx + 108; x += 12) pencil([[x, fy - 8], [x + 6, fy + 13]], { w: 1.6, col: '#06504c', a: 0.7, pass2: false, gap: false }); pencil([[fx + 30, fy - 8], [fx + 100, fy - 1]], { w: 2.6, col: 'rgba(220,255,250,0.55)', pass2: false }); }
  if (B.lapti) { const on = rect(lx - 24, fy - 66, 48, 54, { wash: '#ece4d0', washA: 1, w: 2.2, col: TM.line, key: 460 + k }); for (let y = -60; y < -12; y += 12) pencil([[lx - 24, fy + y], [lx + 24, fy + y + 8]], { w: 2, col: '#7a5a34', a: 0.85, pass2: false, gap: false }); }
  const P = [[lx - 23, top], [lx + 23, top], [lx + 25, fy - 8], [fx + 34, fy - 2], [fx + 33, fy + 11], [fx, fy + 16], [fx - 33, fy + 11], [fx - 34, fy - 2], [lx - 25, fy - 8]];
  const bp = blob(P, { wash: B.c, washA: 1, w: 3, col: TM.line, key: 462 + k });
  shadeG(bp.path, fx - 40, 0, fx + 30, 0, B.d, 0.6);
  if (B.felt) fstr(bp.path, bp.bb, 30, 1.5, 8, '#9a968e', 0.5, 464 + k, 2);
  if (B.lapti) hatch(bp.path, bp.bb, { gap: 5, a: 0.55, col: B.d, ang: 0.7, key: 466 + k, w: 1.6 }), hatch(bp.path, bp.bb, { gap: 5, a: 0.45, col: B.d, ang: -0.7, key: 468 + k, w: 1.6 });
  if (B.wrap) { ctx.save(); ctx.clip(bp.path); for (let y = top + 8; y < fy - 4; y += 10) { pencil([[lx - 28, y + 9], [lx + 28, y - 7]], { w: 5, col: B.wrap, a: 0.95, pass2: false, gap: false }); pencil([[lx - 28, y + 12], [lx + 28, y - 4]], { w: 1.6, col: B.d, a: 0.6, pass2: false, gap: false }); } ctx.restore(); }
  if (B.shine) pencil([[lx + 12, top + 10], [lx + 14, fy - 12]], { w: 4, col: 'rgba(255,255,255,0.35)', pass2: false });
  if (B.trim) { pencil([[lx - 23, top + 4], [lx + 23, top + 4]], { w: 4, col: B.trim, pass2: false, gap: false }); if (B.tassel) { line([[lx, top + 4], [lx, top + 16]], { w: 2, col: B.trim, pass2: false }); ell(lx, top + 20, 4, 5, { wash: B.trim, washA: 1, w: 1 }); } }
  if (B.tip) blob([[fx - 6, fy - 4], [fx + 6, fy - 4], [fx, fy - 16]], { wash: B.c, washA: 1, w: 2, col: TM.line });
  if (B.toe) { const tp = blob([[fx - 30, fy + 2], [fx, fy - 8], [fx + 30, fy + 2], [fx + 28, fy + 12], [fx, fy + 15], [fx - 28, fy + 12]], { wash: CU.copper, washA: 1, w: 2.2, col: TM.line }); metalG(tp.path, fx + 10, fy, 40, CU.copperL, CU.copper, CU.copperD); rect(fx - 36, fy + 12, 72, 9, { wash: CU.lead, washA: 1, w: 2, col: TM.line }); for (let y = top + 10; y < fy - 10; y += 10) line([[lx - 10, y], [lx + 10, y + 4]], { w: 1.6, col: '#c8b890', pass2: false, smooth: false }); }
  else pencil([[fx - 32, fy + 10], [fx + 32, fy + 10]], { w: 2.4, col: B.d, a: 0.7, pass2: false });
}
/* ---- рукавицы литейщика */
function mitt5(OF, far) {
  const c = far ? shadeC(OF.mitt) : OF.mitt;
  const cf = blob([[-30, -22], [30, -22], [34, -48], [-34, -48]], { wash: c, washA: 1, w: 2.6, col: TM.line }); dashL([[-30, -30], [30, -30]], '#c8a070', 0.6);
  const m = blob([[-26, -24], [0, -30], [26, -22], [32, 4], [22, 28], [-16, 30], [-30, 8]], { wash: c, washA: 1, w: 3, col: TM.line, key: far ? 470 : 471 }); shadeG(m.path, -30, 0, 30, 0, '#2a1808', 0.5);
  blob([[22, -10], [36, -18], [42, -4], [32, 10]], { wash: c, washA: 1, w: 2.4, col: TM.line }); ell(-6, 8, 6, 5, { wash: '#1a0e06', washA: 0.7, line: false }); dashL([[-20, 18], [0, 22], [18, 18]], '#c8a070', 0.5);
}
/* ---- реквизит в ближней лапе: рисуется до лапы (лапа «держит»), локальные координаты от центра лапы */
const PROPS = {
  trowel() { const bl = blob([[-26, -38], [8, -46], [36, -44], [20, -96], [8, -138], [-6, -90]], { wash: '#7e888e', washA: 1, w: 2.6, col: TM.line, key: 480 }); metalG(bl.path, 14, -96, 80, '#dfe6ea', '#7e888e', '#30363a'); pencil([[4, -42], [8, -130]], { w: 1.4, col: '#5a6268', a: 0.7, pass2: false });
    blob([[-12, -50], [16, -56], [20, -70], [4, -80], [-10, -70]], { wash: '#d8d2c4', washA: 1, w: 1.8, col: '#6a6458', a: 0.7 });
    line([[0, -12], [2, -26], [6, -40]], { w: 5, col: '#5a6268', pass2: false }); rect(-7, -18, 14, 8, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD });
    const h = blob([[-9, -10], [9, -10], [10, 34], [0, 40], [-10, 34]], { wash: CU.wood, washA: 1, w: 2.4, col: TM.line }); fstr(h.path, h.bb, 10, 1.57, 14, CU.woodD, 0.5, 481); },
  brush(t) { const h = rect(-6, -76, 12, 120, { wash: CU.wood, washA: 1, w: 2.4, col: TM.line, key: 482 }); fstr(h.path, h.bb, 10, 1.57, 20, CU.woodD, 0.5, 483);
    const tu = softShape([[-15, -80], [15, -80], [30, -118], [26, -152], [0, -166], [-26, -152], [-30, -118]], { wash: '#d8c08a', washA: 1, w: 2.4, col: '#5a4420', a: 0.75, key: 484 }, 1.6, 2);
    fstr(tu.path, tu.bb, 50, -1.57, 22, '#8a6a34', 0.6, 485, 2); fstr(tu.path, tu.bb, 30, -1.57, 18, '#f4e8c0', 0.6, 486, 2);
    ctx.save(); ctx.clip(tu.path); ctx.fillStyle = CU.lime; ctx.globalAlpha = 0.92; ctx.beginPath(); ctx.moveTo(-34, -140); for (let x = -34; x <= 34; x += 8) ctx.lineTo(x, -140 + Math.sin(x * 0.5) * 5 + (x % 16 ? 12 : 0)); ctx.lineTo(34, -170); ctx.lineTo(-34, -170); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
    pencil([[-16, -82], [16, -82]], { w: 4, col: '#6a4a24', pass2: false }); pencil([[-15, -90], [15, -90]], { w: 3, col: '#6a4a24', pass2: false });
    for (let k = 0; k < 3; k++) { const u = (t * 1.3 + k * 0.33) % 1, y = -110 + u * 190, x = -14 + k * 14; ctx.globalAlpha = 1 - u * 0.6; ell(x, y, 3, 4.5 + u * 2, { wash: CU.lime, washA: 1, w: 1, col: '#9a948a', a: 0.6 }); } ctx.globalAlpha = 1; },
  spyglass() { push(0, 0, 1, -0.6); const sec = [[-66, -56, 9, CU.gold], [-56, 50, 16, '#5a3a20'], [50, 96, 12.5, CU.gold], [96, 134, 10, CU.gold]];
    for (const [x0, x1, r, c] of sec) { const p = rect(x0, -r, x1 - x0, r * 2, { wash: c, washA: 1, w: 2.4, col: TM.line, key: 487 + x0 }); if (c === CU.gold) metalG(p.path, (x0 + x1) / 2, -r * 0.6, (x1 - x0), CU.goldL, CU.gold, CU.goldD); else { hatch(p.path, p.bb, { gap: 4, a: 0.3, col: '#1e1008', ang: 1.2, key: 488 }); shadeG(p.path, 0, r, 0, -r, '#1e1008', 0.6); } }
    for (const x of [-56, -14, 50]) rect(x - 4, -18, 8, 36, { wash: CU.goldL, washA: 1, w: 1.8, col: CU.goldD }); rect(130, -13, 8, 26, { wash: CU.goldL, washA: 1, w: 1.8, col: CU.goldD });
    ell(138, 0, 4, 10, { wash: '#9ad0e8', washA: 1, w: 1.4, col: TM.line }); pencil([[60, -9], [126, -6]], { w: 2.4, col: 'rgba(255,255,240,0.7)', pass2: false }); pop(); },
  goblet(t) { const Cn = spline([[-44, 38], [-40, 6], [-22, -30], [4, -56], [30, -74]], false, 8), hp = shape(tubeP(Cn, 9, 42), { wash: '#dcc8a0', washA: 1, w: 2.6, col: TM.line, key: 489 });
    shadeG(hp.path, -50, 40, 10, -40, '#5a3a1e', 0.7); for (let i = 4; i < Cn.length - 4; i += 3) { const w = lerp(9, 42, i / (Cn.length - 1)) * 0.5, a = Math.atan2(Cn[i + 1][1] - Cn[i - 1][1], Cn[i + 1][0] - Cn[i - 1][0]) + 1.5708, [x, y] = Cn[i]; pencil([[x - Math.cos(a) * w, y - Math.sin(a) * w], [x + Math.cos(a) * w, y + Math.sin(a) * w]], { w: 1.2, col: '#8a6a44', a: 0.6, pass2: false, gap: false }); }
    for (const [i, w] of [[2, 14], [Math.floor(Cn.length * 0.55), 34], [Cn.length - 3, 46]]) { const a = Math.atan2(Cn[Math.min(Cn.length - 1, i + 1)][1] - Cn[i - 1][1], Cn[Math.min(Cn.length - 1, i + 1)][0] - Cn[i - 1][0]); push(Cn[i][0], Cn[i][1], 1, a); const bb = rect(-5, -w / 2 - 2, 10, w + 4, { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); metalG(bb.path, 0, -w * 0.3, w, CU.goldL, CU.gold, CU.goldD); pop(); }
    const e = Cn[Cn.length - 1], a = Math.atan2(e[1] - Cn[Cn.length - 3][1], e[0] - Cn[Cn.length - 3][0]); push(e[0], e[1], 1, a + 1.5708); ell(0, 0, 22, 7, { wash: '#c8862a', washA: 1, w: 2, col: CU.goldD }); for (let k = 0; k < 7; k++) ell(-15 + k * 5, -2 + Math.sin(k * 2 + t * 4) * 1.5, 3.4, 3, { wash: '#f6e6b8', washA: 1, line: false }); pop();
    const u = (t * 0.8) % 1; ell(e[0] + 10, e[1] + 6 + u * 30, 3, 4, { wash: '#d8962a', washA: 1 - u, line: false }); },
  scroll() { const pp = poly([[-54, 6], [54, 6], [52, 136], [28, 142], [0, 138], [-28, 144], [-52, 136]], { wash: '#efe0b8', washA: 1, w: 2.4, col: TM.line, key: 490 }); shadeG(pp.path, -54, 0, -10, 0, '#a08858', 0.5); shadeG(pp.path, 0, 140, 0, 100, '#a08858', 0.4);
    for (const [s_, y] of [['Приди ко мне,', 42], ['брате,', 66], ['в Москов!', 90]]) txt(s_, 0, y, 19, { col: '#3a2010', font: 'Hand' }); txt('~ Юрий ~', 10, 116, 14, { col: '#7a2a1a', font: 'Hand' });
    ell(0, 142, 56, 8, { wash: '#e4d0a0', washA: 1, w: 2, col: TM.line }); line([[20, 146], [24, 162]], { w: 1.8, col: '#7a2a1a', pass2: false }); ell(26, 170, 11, 10, { wash: '#a8201e', washA: 1, w: 2, col: '#4a0a08' }); ell(26, 170, 5, 5, { wash: '#7a1210', washA: 1, line: false });
    const rd = rect(-64, -6, 128, 12, { wash: CU.wood, washA: 1, w: 2.2, col: TM.line }); for (const sx of [-1, 1]) ell(sx * 68, 0, 7, 9, { wash: CU.gold, washA: 1, w: 1.8, col: CU.goldD }); },
  chisel() { const sh = poly([[-4, 10], [4, 10], [5, 70], [9, 84], [-9, 84], [-5, 70]], { wash: CU.steel, washA: 1, w: 2.2, col: TM.line, key: 491 }); metalG(sh.path, 2, 40, 60, CU.steelL, CU.steel, CU.steelD);
    rect(-7, 4, 14, 8, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD }); const h = blob([[-9, -52], [9, -52], [10, 6], [-10, 6]], { wash: CU.wood, washA: 1, w: 2.4, col: TM.line }); fstr(h.path, h.bb, 8, 1.57, 14, CU.woodD, 0.5, 492); ell(0, -52, 9, 4, { wash: CU.woodL, washA: 1, w: 1.6 }); },
  mallet() { const h = rect(-6, -86, 12, 116, { wash: CU.wood, washA: 1, w: 2.2, col: TM.line, key: 493 }); fstr(h.path, h.bb, 8, 1.57, 16, CU.woodD, 0.5, 494);
    const hd = blob([[-40, -122], [40, -122], [42, -80], [-42, -80]], { wash: '#a87240', washA: 1, w: 2.6, col: TM.line, key: 495 }); shadeG(hd.path, 0, -80, 0, -122, '#4a2c14', 0.5); for (const sx of [-1, 1]) ell(sx * 41, -101, 6, 21, { wash: CU.woodL, washA: 1, w: 2, col: TM.line }); for (const x of [-26, 26]) pencil([[x, -122], [x, -80]], { w: 3.4, col: '#3a3a3a', pass2: false }); },
  key(t) { const sw = Math.sin(t * 2) * 0.1; line([[0, 38], [4 + sw * 30, 70], [8 + sw * 50, 92]], { w: 2.4, col: CU.red, pass2: false }); blob([[2 + sw * 50, 88], [14 + sw * 50, 88], [18 + sw * 50, 118], [-2 + sw * 50, 118]], { wash: CU.red, washA: 1, w: 1.6, col: '#4a0a08' });
    const bw = new Path2D(); for (const [x, y, r] of [[0, 34, 20], [-18, 20, 13], [18, 20, 13]]) { bw.moveTo(x + r, y); bw.arc(x, y, r, 0, 6.283); } for (const [x, y, r] of [[0, 34, 10], [-18, 20, 5], [18, 20, 5]]) { bw.moveTo(x + r, y); bw.arc(x, y, r, 0, 6.283, true); }
    metalG(bw, 6, 20, 40, CU.goldL, CU.gold, CU.goldD); ctx.save(); ctx.strokeStyle = TM.line; ctx.lineWidth = 2.2 / S; ctx.stroke(bw); ctx.restore();
    const sf = rect(-5, -150, 10, 160, { wash: CU.gold, washA: 1, w: 2.2, col: TM.line, key: 496 }); metalG(sf.path, 2, -70, 90, CU.goldL, CU.gold, CU.goldD); for (const y of [-6, -20]) rect(-9, y, 18, 6, { wash: CU.goldL, washA: 1, w: 1.6, col: CU.goldD });
    poly([[5, -150], [36, -150], [36, -138], [28, -138], [28, -130], [36, -130], [36, -114], [5, -114]], { wash: CU.gold, washA: 1, w: 2, col: TM.line }); ell(0, -154, 7, 5, { wash: CU.goldL, washA: 1, w: 1.6, col: CU.goldD }); pencil([[-1, -140], [-1, -10]], { w: 2, col: 'rgba(255,250,220,0.8)', pass2: false }); },
  medal(t) { push(0, 4, 1, Math.sin(t * 2.2) * 0.12); const rb = poly([[-15, 0], [15, 0], [13, 56], [-13, 56]], { wash: CU.red, washA: 1, w: 2, col: TM.line }); for (const x of [-5, 5]) pencil([[x, 2], [x * 0.9, 54]], { w: 2.4, col: CU.gold, pass2: false, gap: false }); rect(-16, 52, 32, 8, { wash: CU.gold, washA: 1, w: 1.6, col: CU.goldD });
    const m = ell(0, 96, 38, 38, { wash: CU.gold, washA: 1, w: 2.6, col: CU.goldD, key: 497 }); metalG(m.path, -10, 84, 50, CU.goldL, CU.gold, CU.goldD); pencil(ellPts(0, 96, 30, 30, 0, 0.05, 40), { w: 1.6, col: CU.goldD, a: 0.8, pass2: false });
    for (let k = 0; k < 10; k++) { const a = 2.2 + k / 9 * 5.0; ell(Math.cos(a) * 34, 96 + Math.sin(a) * 34, 3.4, 1.6, { wash: CU.goldD, washA: 0.7, line: false, rot: a + 1.57 }); }
    txt('GRAND', 0, 88, 15, { col: '#5a3a08', font: 'Osw' }); txt('PRIX', 0, 106, 17, { col: '#5a3a08', font: 'Osw' }); ctx.fillStyle = 'rgba(255,255,240,0.8)'; ctx.beginPath(); ctx.ellipse(-14, 76, 8, 4, -0.6, 0, 6.283); ctx.fill(); pop(); },
  lantern(t) { const fl = 1 + Math.sin(t * 17) * 0.08 + Math.sin(t * 7.3) * 0.06; push(0, 6, 1, Math.sin(t * 1.8) * 0.06);
    const g = ctx.createRadialGradient(0, 62, 6, 0, 62, 150); g.addColorStop(0, 'rgba(255,214,130,0.55)'); g.addColorStop(1, 'rgba(255,190,90,0)'); ctx.fillStyle = g; ctx.fillRect(-150, -90, 300, 300);
    line([[-20, 14], [-10, -4], [10, -4], [20, 14]], { w: 2.6, col: '#2a2a2a', pass2: false });
    const tp = poly([[-20, 12], [20, 12], [28, 32], [-28, 32]], { wash: CU.gold, washA: 1, w: 2.2, col: TM.line }); metalG(tp.path, 6, 18, 30, CU.goldL, CU.gold, CU.goldD);
    rect(-22, 32, 44, 60, { wash: 'rgba(255,240,200,0.5)', washA: 1, w: 2, col: TM.line, a: 0.7 });
    ctx.fillStyle = '#ffdf8a'; ctx.beginPath(); ctx.ellipse(0, 66, 8 * fl, 15 * fl, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff8e0'; ctx.beginPath(); ctx.ellipse(0, 70, 4, 8 * fl, 0, 0, 6.283); ctx.fill();
    for (const x of [-22, -8, 8, 22]) pencil([[x, 32], [x, 92]], { w: 2.2, col: '#3a3020', pass2: false, gap: false });
    const bs = poly([[-28, 92], [28, 92], [24, 112], [-24, 112]], { wash: CU.gold, washA: 1, w: 2.2, col: TM.line }); metalG(bs.path, 6, 98, 30, CU.goldL, CU.gold, CU.goldD); pop(); },
  blueprint() { push(0, 0, 1, 0.42);                                   // свёрнутый чертёж: голубая трубка с белыми линиями, край развёрнут
    const BL = '#4f86c2', BD = '#1e4478', BH = '#8cb8e4';
    const sh = poly([[16, -92], [64, -74], [70, -14], [16, -2]], { wash: BL, washA: 1, w: 2.2, col: TM.line, key: 660 }); shadeG(sh.path, 70, 0, 16, 0, BD, 0.5);
    ctx.save(); ctx.clip(sh.path); ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 1.4 / S; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(22 + k * 12, -96 + k * 4); ctx.lineTo(24 + k * 12, 0); ctx.stroke(); } for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(14, -82 + k * 22); ctx.lineTo(72, -66 + k * 22); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(46, -44, 11, 0, 6.283); ctx.stroke(); ctx.restore();
    const tb = rect(-20, -130, 40, 176, { wash: BL, washA: 1, w: 2.6, col: TM.line, key: 661 }); shadeG(tb.path, 20, 0, -20, 0, BD, 0.6); shadeG(tb.path, -20, 0, -6, 0, BH, 0.5);
    ctx.save(); ctx.clip(tb.path); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.4 / S; for (const y of [-110, -84, -58, -30, 0, 24]) { ctx.beginPath(); ctx.moveTo(-18, y); ctx.lineTo(18, y + 4); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-8, -126); ctx.lineTo(-6, 44); ctx.moveTo(6, -126); ctx.lineTo(8, 44); ctx.stroke(); ctx.restore();
    const te = ell(0, -130, 20, 7, { wash: '#cfe2f4', washA: 1, w: 2, col: TM.line, key: 662 }); ell(0, -130, 12, 4, { wash: BL, washA: 1, w: 1.4, col: TM.line }); ell(0, -130, 5, 2, { wash: '#cfe2f4', washA: 1, line: false });
    ell(0, 46, 20, 7, { wash: BD, washA: 1, w: 2, col: TM.line }); rect(-21, -30, 42, 9, { wash: '#6a4426', washA: 1, w: 1.8, col: TM.line }); nb(0, -25.5, 2.6);
    pop(); },
  quill(t) { const sw = Math.sin(t * 1.7) * 0.03; push(0, 0, 1, sw);   // гусиное перо: очиненный кончик у лапы, веер сверху
    const S_ = spline([[0, 40], [6, -30], [14, -110], [24, -196]], false, 8);
    const L_ = [], R_ = []; S_.forEach((p, i) => { const u = i / (S_.length - 1), a = S_[Math.max(0, i - 1)], c = S_[Math.min(S_.length - 1, i + 1)], an = Math.atan2(c[1] - a[1], c[0] - a[0]) + 1.5708, w = u < 0.25 ? 0 : 27 * Math.sin(Math.PI * Math.pow((u - 0.25) / 0.75, 0.72)) + 2;
      L_.push([p[0] - Math.cos(an) * w * 0.8, p[1] - Math.sin(an) * w * 0.8]); R_.push([p[0] + Math.cos(an) * w * 1.1, p[1] + Math.sin(an) * w * 1.1]); });
    const vn = shape(L_.concat(R_.reverse()), { wash: '#f6f2ea', washA: 1, w: 2.2, col: '#6a6458', a: 0.85, key: 670 }); shadeG(vn.path, -30, 0, 30, 0, '#a8a090', 0.45);
    ctx.save(); ctx.clip(vn.path); ctx.lineCap = 'round'; for (let i = 7; i < S_.length - 1; i++) for (const sd of [-1, 1]) { const p = S_[i]; ctx.strokeStyle = i % 2 ? 'rgba(150,140,124,0.55)' : 'rgba(255,255,255,0.8)'; ctx.lineWidth = 1.2 / S; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + sd * 30, p[1] - 12); ctx.stroke(); } ctx.restore();
    const sh = shape(tubeP(S_.slice(0, 5), 5, 4), { wash: '#e6d8b0', washA: 1, w: 1.8, col: TM.line, key: 671 }); pencil(S_.slice(4), { w: 2.6, col: '#d8c898', a: 0.95, pass2: false });
    blob([[-2, 40], [4, 40], [3, 66], [-1, 58]], { wash: '#16120e', washA: 1, w: 1.6, col: TM.line }); ell(2, 74, 2.4, 3.4, { wash: '#16120e', washA: 0.85, line: false });
    pop(); },
  stick() { const S_ = spline([[-4, 78], [3, 14], [-3, -66], [6, -150], [0, -232]], false, 8);   // сучковатая палка-жезл
    const sp = shape(tubeP(S_, 17, 12), { wash: '#7a5230', washA: 1, w: 2.8, col: TM.line, key: 680 }); shadeG(sp.path, 14, 0, -14, 0, '#2a160a', 0.6); hatch(sp.path, sp.bb, { gap: 5, a: 0.3, col: '#2a160a', ang: 1.4, key: 681, w: 1.5 }); fstr(sp.path, sp.bb, 18, 1.57, 7, '#c08a52', 0.5, 682, 1.8);
    for (const [x, y, rx, ry] of [[2, 30, 11, 6], [-2, -40, 10, 5], [6, -112, 11, 6]]) { ell(x, y, rx, ry, { wash: '#4a2c14', washA: 1, w: 1.8, col: TM.line }); ell(x, y, rx * 0.5, ry * 0.5, { wash: '#2a160a', washA: 1, line: false }); }
    const br = shape(tubeP(spline([[3, -90], [20, -118], [34, -150]], false, 6), 8, 4), { wash: '#7a5230', washA: 1, w: 2.2, col: TM.line }); const br2 = shape(tubeP(spline([[3, -200], [-18, -226], [-30, -256]], false, 6), 8, 4), { wash: '#7a5230', washA: 1, w: 2.2, col: TM.line });
    ell(0, -232, 8, 6, { wash: '#a87240', washA: 1, w: 2, col: TM.line }); },
  folder() { push(0, 0, 1, -0.1);                                       // картонная папка «ДЕЛО» с завязками
    const fd = rect(-60, -156, 120, 150, { wash: '#c9ab7a', washA: 1, w: 2.8, col: TM.line, key: 690 }); shadeG(fd.path, 60, 0, -60, 0, '#7a5a30', 0.4); hatch(fd.path, fd.bb, { gap: 4, a: 0.1, col: '#6a4a24', ang: 0.04, key: 691, w: 1.2 });
    poly([[60, -156], [68, -150], [68, -2], [60, -6]], { wash: '#a88a5a', washA: 1, w: 1.8, col: TM.line }); for (let y = -150; y < -8; y += 6) pencil([[60, y], [67, y + 2]], { w: 1, col: '#5a4020', a: 0.6, pass2: false, gap: false });
    const lb = rect(-40, -126, 80, 46, { wash: '#f2ede0', washA: 1, w: 2, col: TM.line, key: 692 }); txt('ДЕЛО', 0, -102, 31, { col: '#1a1410', font: 'Osw' }); pencil([[-34, -86], [34, -86]], { w: 1.6, col: '#7a1a1a', a: 0.9, pass2: false }); txt('№ 1982', 0, -66, 17, { col: '#5a1a1a', font: 'Hand' });
    for (const x of [-22, 22]) { ell(x, -14, 4, 4, { wash: '#8a8478', washA: 1, w: 1.4, col: TM.line }); }
    pencil(spline([[-22, -14], [-10, -34], [10, -30], [22, -14]], false, 6), { w: 2.2, col: '#f4f0e6', pass2: false }); pencil(spline([[-22, -14], [-6, -4], [6, -4], [22, -14]], false, 6), { w: 2.2, col: '#f4f0e6', pass2: false });
    ell(-8, -30, 7, 5, { wash: '#f4f0e6', washA: 1, w: 1.4, col: '#8a8478' }); ell(8, -28, 7, 5, { wash: '#f4f0e6', washA: 1, w: 1.4, col: '#8a8478' });
    pop(); },
  spear() { const S_ = spline([[0, 110], [-2, -80], [2, -250], [0, -310]], false, 8);   // копьё с кремнёвым наконечником
    const sp = shape(tubeP(S_, 11, 9), { wash: '#8e5c30', washA: 1, w: 2.6, col: TM.line, key: 700 }); shadeG(sp.path, 10, 0, -10, 0, '#3a1e0a', 0.55); fstr(sp.path, sp.bb, 24, 1.57, 6, '#4a2c14', 0.5, 701, 1.6);
    const fl = blob([[0, -440], [13, -400], [17, -350], [10, -312], [0, -296], [-10, -312], [-17, -350], [-13, -400]], { wash: '#8f8678', washA: 1, w: 2.8, col: TM.line, key: 702 }); shadeG(fl.path, 18, 0, -18, 0, '#3a342c', 0.5);
    ctx.save(); ctx.clip(fl.path); pencil([[0, -436], [1, -300]], { w: 2.2, col: '#2e2a24', a: 0.75, pass2: false }); for (let y = -420; y < -310; y += 20) { pencil([[0, y], [-12, y + 12]], { w: 1.4, col: '#d8d0bc', a: 0.7, pass2: false, gap: false }); pencil([[0, y + 6], [12, y + 18]], { w: 1.4, col: '#2e2a24', a: 0.6, pass2: false, gap: false }); } pencil([[-9, -380], [-12, -330]], { w: 3, col: 'rgba(255,255,240,0.55)', pass2: false }); ctx.restore();
    for (let y = -312; y < -278; y += 6) pencil([[-9, y], [9, y + 7]], { w: 3, col: '#c8a878', pass2: false, gap: false }); pencil([[-9, -312], [9, -312]], { w: 1.4, col: TM.line, a: 0.8, pass2: false }); pencil([[-9, -278], [9, -278]], { w: 1.4, col: TM.line, a: 0.8, pass2: false });
    line([[3, -276], [10, -250], [8, -230]], { w: 2, col: '#c8a878', pass2: false }); }
};
function prop5(name, hn, t, ang) { push(hn[0], hn[1], 1, ang); PROPS[name](t); pop(); }

// совместимость с мирами v3/v4
const tubePts = tubeP, fstrokes = fstr, softShade = shadeG, rim = rimL;
