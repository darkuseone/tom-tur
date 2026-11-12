/* 024 — Пекин: общие детали города (после props.js). Палитра «имперский красный + нефрит + золото фонарей».
   hz (иероглифы, шрифт CHand), lantern (бумажный фонарь со светом), roofCN / hallCN (крыши с загнутыми углами, залы), lionSt (каменный лев),
   skullPM (череп пекинского человека: кость / гипс / призрак), dashO (пунктир), stampBJ, crateW, skylineBJ (современный Пекин), cloudsBJ, birdsBJ,
   starsBJ, bikeBJ, shovelBJ, meander, scrollHang, stanchion, bulb, moonGate (стена с круглым окном), pplBJ (пресеты людей). */
const BJ = { ink: '#160e0c', red: '#a8231c', redD: '#5a0f0c', redL: '#e0523a', lac: '#7a1712', gold: '#f0b840', goldD: '#a8741a', goldL: '#ffe49a',
  jade: '#3aa88a', jadeD: '#14574a', jadeL: '#9ae0c4', paper: '#efe2c0', bone: '#e6d6ae', boneD: '#9a8458', stone: '#b8b0a0', stoneD: '#6a6458',
  night: '#0c1230', wood: '#6a4426', woodD: '#3a2414', tile: '#d89a1c', tileD: '#8a5a10', grey: '#5a5e66', greyD: '#2c2e36' };
const hz = (s, x, y, size, col = BJ.gold, a = 1, rot = 0) => txt(s, x, y, size, { font: 'CHand', col, a, rot });
const hzV = (s, x, y, size, col, a = 1) => { [...s].forEach((c, i) => hz(c, x, y + i * size * 1.02, size, col, a)); };

function lantern(x, y, s, t, on = 1, sd = 0, o = {}) {              // красный бумажный фонарь: шнур, золотые крышки, рёбра, кисть; on — яркость света
  const sw = Math.sin(t * 1.6 + sd) * 0.05, c = o.col || BJ.red, L = BJ.ink;
  pencil([[x, y - (o.cord ?? 160) * s], [x, y - 62 * s]], { w: 2.4, col: L, pass2: false });
  push(x, y, s, sw);
  if (on > 0) glow(0, 0, 210, 'rgba(255,190,90,1)', 0.5 * on * flick(t, sd));
  rect(-26, -64, 52, 14, { wash: BJ.gold, washA: 1, w: 2, col: L });
  ell(0, 0, 62, 54, { wash: lerpC(lerpC(c, '#000000', 0.45), c, on), washA: 1, w: 2.6, col: L });
  if (on > 0) { ell(0, 4, 40, 34, { wash: '#ffd070', washA: 0.55 * on, line: false }); ell(0, 8, 20, 18, { wash: '#fff2c0', washA: 0.6 * on, line: false }); }
  for (const k of [-0.62, -0.3, 0, 0.3, 0.62]) pencil(ellPts(0, 0, 62 * Math.abs(k) + 1, 54, 0, 0, 14).slice(k < 0 ? 7 : 0, k < 0 ? 14 : 8), { w: 1.6, col: BJ.redD, a: 0.7, pass2: false });
  rect(-24, 50, 48, 13, { wash: BJ.gold, washA: 1, w: 2, col: L });
  if (o.ch) hz(o.ch, 0, 2, 52, on > 0.5 ? '#7a1408' : BJ.gold, 0.9);
  for (let k = -2; k <= 2; k++) pencil([[k * 6, 63], [k * 8 + Math.sin(t * 3 + sd + k) * 5, 122]], { w: 2.4, col: k % 2 ? BJ.gold : BJ.redL, pass2: false });
  pop();
}
function roofPts(x, y, w, h, ev = 46) {                            // профиль четырёхскатной крыши с загнутыми углами
  const l = spline([[x - w / 2 - ev, y - 26], [x - w / 2 + 6, y - 12 - h * 0.2], [x - w * 0.36, y - h * 0.62], [x - w * 0.3, y - h]], false, 8);
  const r = spline([[x + w * 0.3, y - h], [x + w * 0.36, y - h * 0.62], [x + w / 2 - 6, y - 12 - h * 0.2], [x + w / 2 + ev, y - 26]], false, 8);
  return [...l, ...r, [x + w / 2 + ev - 10, y - 6], [x + w / 2, y], [x - w / 2, y], [x - w / 2 - ev + 10, y - 6]];
}
function roofCN(x, y, w, h, o = {}) {                               // крыша: глазурованная черепица (жёлтая императорская / серая хутунов), конёк, фигурки
  const c = o.col || BJ.tile, cd = o.colD || BJ.tileD, L = o.ink || BJ.ink, ev = o.ev ?? 46, P = roofPts(x, y, w, h, ev);
  if (o.sil) return sil(P, o.sil, o.a ?? 1);
  shape(P, { wash: c, washA: 1, w: 2.6, col: L, shade: o.shade === false ? undefined : { gap: 9, a: 0.22, col: cd, ang: 1.25 } });
  const n = o.n || Math.max(6, Math.round(w / 26));
  for (let i = 0; i <= n; i++) { const u = i / n, xb = lerp(x - w / 2 - ev * 0.6, x + w / 2 + ev * 0.6, u), xt = lerp(x - w * 0.3, x + w * 0.3, u); pencil([[xt, y - h + 6], [lerp(xt, xb, 0.55), y - h * 0.42], [xb, y - 8]], { w: 1.6, col: cd, a: 0.75, pass2: false }); }
  rect(x - w * 0.3 - 8, y - h - 12, w * 0.6 + 16, 16, { wash: cd, washA: 1, w: 2, col: L });
  for (const k of [-1, 1]) { blob([[x + k * (w * 0.3 + 6), y - h - 12], [x + k * (w * 0.3 + 26), y - h - 34], [x + k * (w * 0.3 + 12), y - h + 2]], { wash: o.orn || BJ.jadeD, washA: 1, w: 1.8, col: L });
    for (let i = 0; i < 3; i++) ell(x + k * (w / 2 + ev - 22 - i * 20), y - 32 - i * 7, 5, 8, { wash: cd, washA: 1, w: 1.2, col: L }); }
  if (o.lit) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = o.lit; ctx.fillStyle = o.litC || '#ffb050'; ctx.fill(pathOf(P)); ctx.restore(); }
}
function hallCN(x, y, w, h, o = {}) {                               // зал: каменный цоколь, красные колонны, решётчатые двери, расписной фриз, крыша (2 яруса при o.tiers)
  const L = BJ.ink, bays = o.bays || 5, rh = o.rh || h * 0.5, wall = o.wall || BJ.red;
  if (o.base) { rect(x - w / 2 - 50, y - o.base, w + 100, o.base, { wash: o.baseC || '#d8d0c0', washA: 1, w: 2.2, col: L, shade: { gap: 10, a: 0.16, col: BJ.stoneD, ang: 0.3 } });
    for (let i = 0; i <= (o.bal || 12); i++) { const bx = x - w / 2 - 50 + (w + 100) * i / (o.bal || 12); rect(bx - 5, y - o.base - 26, 10, 26, { wash: '#e4dccc', washA: 1, w: 1.4, col: L }); } rect(x - w / 2 - 50, y - o.base - 16, w + 100, 6, { wash: '#e4dccc', washA: 1, w: 1.2, col: L }); y -= o.base; }
  rect(x - w / 2, y - h, w, h, { wash: wall, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: BJ.redD, ang: 1.57 } });
  for (let i = 0; i < bays; i++) { const bw = w / bays, bx = x - w / 2 + i * bw;
    rect(bx + 14, y - h + 36, bw - 28, h - 36, { wash: o.door || '#4a1410', washA: 1, w: 1.8, col: L });
    for (let k = 1; k < 4; k++) pencil([[bx + 14 + (bw - 28) * k / 4, y - h + 40], [bx + 14 + (bw - 28) * k / 4, y - h * 0.38]], { w: 1.3, col: BJ.gold, a: 0.55, pass2: false });
    for (let k = 1; k < 4; k++) pencil([[bx + 16, y - h + 36 + (h * 0.62 - 36) * k / 4], [bx + bw - 16, y - h + 36 + (h * 0.62 - 36) * k / 4]], { w: 1.3, col: BJ.gold, a: 0.55, pass2: false });
    if (o.glowIn) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = o.glowIn; ctx.fillStyle = '#ffb858'; ctx.fillRect(bx + 16, y - h + 40, bw - 32, h * 0.6 - 40); ctx.restore(); } }
  for (let i = 0; i <= bays; i++) rect(x - w / 2 + i * w / bays - 9, y - h, 18, h, { wash: BJ.lac, washA: 1, w: 1.8, col: L });
  rect(x - w / 2 - 10, y - h - 2, w + 20, 34, { wash: BJ.jadeD, washA: 1, w: 2, col: L });
  for (let i = 0; i < w / 22; i++) ell(x - w / 2 + 6 + i * 22, y - h + 15, 5, 5, { wash: i % 2 ? BJ.gold : '#3a6ac0', washA: 1, line: false });
  if (o.tiers) { rect(x - w * 0.4, y - h - rh * 0.55, w * 0.8, rh * 0.5, { wash: wall, washA: 1, w: 2, col: L }); roofCN(x, y - h + 4, w + 30, rh * 0.52, o.roof); roofCN(x, y - h - rh * 0.5, w * 0.84, rh * 0.75, o.roof); }
  else roofCN(x, y - h + 4, w + 30, rh, o.roof);
  if (o.plaque) { rect(x - 46, y - h - 44, 92, 50, { wash: '#1a2a6a', washA: 1, w: 2, col: BJ.gold }); hz(o.plaque, x, y - h - 18, 34, BJ.gold); }
}
function lionSt(x, y, s, fl = 1, o = {}) {                         // каменный лев-страж на постаменте
  const c = o.col || BJ.stone, d = BJ.stoneD, L = BJ.ink; push(x, y, s, 0, fl);
  rect(-70, -70, 140, 70, { wash: c, washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.22, col: d, ang: 0.5 } }); rect(-82, -84, 164, 16, { wash: '#cfc8b8', washA: 1, w: 2, col: L });
  blob([[-56, -84], [-60, -170], [-30, -230], [30, -236], [58, -180], [60, -84]], { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.25, col: d, ang: 1.0 } });
  for (const k of [-1, 1]) rect(k * 34 - 14, -130, 28, 46, { wash: c, washA: 1, w: 1.8, col: L });
  ell(8, -250, 58, 52, { wash: c, washA: 1, w: 2.4, col: L });
  for (let i = 0; i < 9; i++) { const a = Math.PI * 0.75 + i * 0.36; ell(8 + Math.cos(a) * 54, -252 + Math.sin(a) * 48, 13, 13, { wash: '#a8a090', washA: 1, w: 1.4, col: L }); }
  ell(-8, -262, 7, 8, { wash: L, washA: 1, line: false }); ell(30, -262, 7, 8, { wash: L, washA: 1, line: false }); blob([[-4, -236], [14, -224], [36, -236], [14, -246]], { wash: '#3a2a22', washA: 1, w: 1.4, col: L });
  ell(44, -130, 20, 20, { wash: '#a8a090', washA: 1, w: 1.6, col: L });
  pop();
}
function skullPM(x, y, s, o = {}) {                                 // череп пекинского человека (реконструкция): низкий свод, надбровный валик; o.kind bone|plaster|ghost, o.a
  const A = o.a ?? 1, g = o.kind === 'ghost', c = g ? '#bfe8ff' : o.kind === 'plaster' ? '#f2efe6' : BJ.bone, d = g ? '#6aa8d8' : o.kind === 'plaster' ? '#b8b4a8' : BJ.boneD, L = g ? '#8ad0ff' : '#3a2a16';
  if (A <= 0.01) return; push(x, y, s, o.rot || 0, o.flip || 1);
  if (g) glow(0, -40, 190, 'rgba(140,210,255,1)', 0.45 * A);
  blob([[-92, -8], [-98, -70], [-56, -122], [20, -130], [78, -100], [98, -52], [92, -6], [40, 8], [-40, 8]], { wash: c, washA: (g ? 0.4 : 1) * A, w: 2.8, col: L, a: A, shade: g ? undefined : { gap: 7, a: 0.3 * A, col: d, ang: 0.9 } });
  blob([[30, -8], [96, -8], [100, 50], [84, 92], [40, 96], [28, 50]], { wash: c, washA: (g ? 0.4 : 1) * A, w: 2.6, col: L, a: A });
  blob([[20, -44], [60, -60], [106, -44], [108, -22], [60, -30], [22, -18]], { wash: lerpC(c, d, 0.25), washA: (g ? 0.5 : 1) * A, w: 2.6, col: L, a: A });   // надбровный валик
  ell(50, 6, 17, 15, { wash: g ? '#1a3a5a' : '#2a1c10', washA: 0.92 * A, w: 2, col: L, a: A }); ell(90, 8, 10, 14, { wash: g ? '#1a3a5a' : '#2a1c10', washA: 0.92 * A, w: 2, col: L, a: A });
  blob([[70, 34], [80, 30], [84, 54], [70, 56]], { wash: g ? '#1a3a5a' : '#2a1c10', washA: 0.9 * A, w: 1.6, col: L, a: A });
  for (let i = 0; i < 5; i++) rect(42 + i * 11, 84, 9, 15, { wash: g ? '#dff4ff' : '#f4ead0', washA: A, w: 1.3, col: L, a: A });
  pencil(spline([[-80, -40], [-30, -74], [30, -62]], false, 8), { w: 1.6, col: d, a: 0.7 * A, pass2: false }); pencil(spline([[-60, -8], [-20, -30], [22, -8]], false, 8), { w: 1.6, col: d, a: 0.6 * A, pass2: false });
  if (o.kind === 'plaster') { pencil([[-40, -120], [-30, -60], [-52, -10]], { w: 1.4, col: '#8a8678', a: 0.8 * A, pass2: false }); for (const [px, py] of [[-70, -50], [0, -100], [60, -80], [-20, -20]]) ell(px, py, 3, 3, { wash: '#c8c4b6', washA: A, line: false }); }
  pop();
}
function dashO(pts, col, w = 5, a = 1, n = 5) { for (let i = 0; i < pts.length - 1; i += 2) pencil([pts[i], pts[i + 1]], { w, col, a, pass2: false }); }
function skullDash(x, y, s, col, a = 1) { dashO(ellPts(x, y - 20 * s, 104 * s, 112 * s, 0, 0, 36), col, 5, a); }
function stampBJ(x, y, s, rot, l1, l2, col, t, t0) {              // штамп с ударом
  if (t < t0) return; const k = popK(t, t0, 0.28), z = 1 + (1 - clamp((t - t0) / 0.14)) * 1.6;
  push(x, y, s * z * (0.6 + 0.4 * k), rot); const w = Math.max(l1.length, (l2 || '').length) * 30 + 60, h = l2 ? 150 : 96;
  rect(-w / 2, -h / 2, w, h, { wash: '#1a0806', washA: 0.5, w: 7, col }); rect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, { line: true, w: 2.4, col });
  txt(l1, 0, l2 ? -26 : 6, 62, { col, font: 'Osw' }); if (l2) txt(l2, 0, 40, 50, { col, font: 'Osw' }); pop();
}
function crateW(x, y, w, h, o = {}) {                               // деревянный ящик: доски, уголки, трафарет
  const c = o.col || '#b08a52', d = '#5a3c1a', L = BJ.ink; push(x, y, o.s || 1, o.rot || 0);
  rect(-w / 2, -h, w, h, { wash: c, washA: o.a ?? 1, w: 2.6, col: L, a: o.a ?? 1, shade: { gap: 9, a: 0.22 * (o.a ?? 1), col: d, ang: 0.1 } });
  for (let i = 1; i < 4; i++) pencil([[-w / 2 + 4, -h * i / 4], [w / 2 - 4, -h * i / 4]], { w: 1.6, col: d, a: 0.8 * (o.a ?? 1), pass2: false });
  for (const k of [-1, 1]) rect(k * (w / 2 - 12) - 10, -h, 20, h, { wash: lerpC(c, d, 0.35), washA: o.a ?? 1, w: 1.8, col: L, a: o.a ?? 1 });
  rect(-w / 2 - 4, -h - 10, w + 8, 14, { wash: lerpC(c, d, 0.2), washA: o.a ?? 1, w: 2, col: L, a: o.a ?? 1 });
  if (o.label) txt(o.label, 0, -h * 0.46, o.ls || h * 0.42, { col: o.lc || '#2a1a0c', font: 'Osw', a: 0.9 * (o.a ?? 1) });
  if (o.rope) for (const k of [-0.3, 0.3]) pencil([[w * k, -h - 10], [w * k, 0]], { w: 4, col: '#d8c08a', pass2: false });
  pop();
}
function starsBJ(t, n, box, seed, a = 1) { const r = rng(seed); ctx.save(); for (let i = 0; i < n; i++) { const x = box[0] + r() * (box[2] - box[0]), y = box[1] + r() * (box[3] - box[1]), tw = 0.5 + 0.5 * Math.sin(t * (1 + r() * 2) + i); ctx.globalAlpha = a * (0.35 + 0.65 * tw); ctx.fillStyle = r() < 0.2 ? '#ffe0a0' : '#e8f0ff'; const z = 2 + r() * 3; ctx.fillRect(x, y, z, z); } ctx.restore(); }
function cloudsBJ(t, y, n, col, seed, a = 0.7, sp = 8) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = ((r() * 2200 + t * sp * (0.5 + r())) % 2400) - 600, yy = y + r() * 260, w = 180 + r() * 220;
  for (let k = 0; k < 4; k++) ell(x + k * w * 0.24, yy - Math.sin(k * 1.3) * 16, w * 0.3, 30 + (k % 2) * 14, { wash: col, washA: a, line: false });
  pencil(spline([[x - w * 0.3, yy + 24], [x + w * 0.3, yy + 30], [x + w, yy + 22]], false, 6), { w: 1.4, col, a: a * 0.8, pass2: false }); } }
function birdsBJ(t, n, box, seed, col = '#1a1410') { const r = rng(seed); for (let i = 0; i < n; i++) { const x = box[0] + ((r() * (box[2] - box[0]) + t * (30 + r() * 30)) % (box[2] - box[0])), y = box[1] + r() * (box[3] - box[1]) + Math.sin(t + i) * 12, f = Math.sin(t * 9 + i * 2) * 9, s = 0.7 + r() * 0.7;
  pencil([[x - 16 * s, y - f * s], [x, y], [x + 16 * s, y - f * s]], { w: 2.4, col, pass2: false }); } }
function skylineBJ(t, o = {}) {                                     // современный Пекин вдали: башня «Чжунго цзунь», арка ЦТ, телебашня, коробки; o.night 0..1, o.base
  const B = o.base ?? 1180, n = o.night ?? 1, c = lerpC('#8a9ab0', '#141a3a', n), c2 = lerpC('#a8b4c4', '#1c2448', n), r = rng(2401);
  for (let i = 0; i < 16; i++) { const x = -420 + i * 124 + r() * 30, w = 70 + r() * 60, h = 150 + r() * 330; sil([[x, B], [x, B - h], [x + w, B - h], [x + w, B]], i % 2 ? c : c2, 1); if (n > 0.2) windows(x + 6, B - h + 10, w - 12, h - 20, Math.max(3, Math.round(w / 16)), Math.max(5, Math.round(h / 22)), 2410 + i, 0.5, '#ffd98a', '#9fd8ff', 0.85 * n); }
  const zx = o.zx ?? 760; sil(spline([[zx - 44, B], [zx - 30, B - 380], [zx - 40, B - 760], [zx + 40, B - 760], [zx + 30, B - 380], [zx + 44, B]], false, 10), c, 1);
  if (n > 0.2) { windows(zx - 28, B - 730, 56, 700, 4, 34, 2431, 0.6, '#ffd98a', '#bfe8ff', 0.8 * n); glow(zx, B - 770, 60, 'rgba(255,120,90,1)', 0.7 * n * (0.6 + 0.4 * Math.sin(t * 4))); }
  const ax = o.ax ?? 330; sil([[ax - 90, B], [ax - 70, B - 420], [ax + 10, B - 440], [ax + 100, B - 400], [ax + 110, B], [ax + 50, B], [ax + 44, B - 280], [ax - 24, B - 290], [ax - 30, B]], c2, 1);
  if (n > 0.2) { windows(ax - 76, B - 410, 60, 400, 4, 20, 2432, 0.55, '#ffd98a', '#9fd8ff', 0.8 * n); windows(ax + 50, B - 390, 52, 380, 3, 19, 2433, 0.55, '#ffd98a', '#9fd8ff', 0.8 * n); }
  const tx = o.tx ?? 30; pencil([[tx, B], [tx, B - 560]], { w: 12, col: c, pass2: false }); ell(tx, B - 430, 40, 30, { wash: c, washA: 1, line: false }); pencil([[tx, B - 560], [tx, B - 690]], { w: 4, col: c, pass2: false }); if (n > 0.2) { windows(tx - 34, B - 446, 68, 30, 7, 2, 2434, 0.9, '#ffd98a', '#ff9a8a', n); glow(tx, B - 690, 30, 'rgba(255,90,70,1)', 0.8 * n); }
}
function bikeBJ(x, y, s, o = {}) { const L = BJ.ink, c = o.col || '#22262c'; push(x, y, s, 0, o.flip || 1);
  for (const k of [-70, 70]) { ell(k, -44, 44, 44, { line: true, w: 4, col: L }); ell(k, -44, 5, 5, { wash: L, washA: 1, line: false }); for (let i = 0; i < 6; i++) pencil([[k, -44], [k + Math.cos(i * 1.05) * 42, -44 + Math.sin(i * 1.05) * 42]], { w: 1, col: L, a: 0.6, pass2: false }); }
  pencil([[-70, -44], [-22, -112], [44, -112], [70, -44]], { w: 5, col: c, pass2: false }); pencil([[-22, -112], [8, -44], [-70, -44]], { w: 5, col: c, pass2: false }); pencil([[8, -44], [44, -112]], { w: 5, col: c, pass2: false });
  pencil([[44, -112], [38, -140], [62, -146]], { w: 4, col: c, pass2: false }); rect(-40, -124, 34, 10, { wash: '#3a2414', washA: 1, w: 1.6, col: L });
  if (o.basket) rect(54, -150, 40, 30, { wash: '#b89a5a', washA: 1, w: 1.6, col: L, shade: { gap: 5, a: 0.4, col: '#5a4420', ang: 0.8 } }); pop(); }
function shovelBJ(x, y, ang, s = 1, o = {}) { push(x, y, s, ang); pencil([[0, 0], [0, -190]], { w: 8, col: o.col || '#8a6236', pass2: false }); rect(-16, -206, 32, 14, { wash: '#6a4a26', washA: 1, w: 1.8, col: BJ.ink });
  blob([[-26, 0], [26, 0], [28, 46], [0, 74], [-28, 46]], { wash: '#8a9098', washA: 1, w: 2.2, col: BJ.ink, shade: { gap: 6, a: 0.3, col: '#3a3e46', ang: 0.6 } }); pop(); }
function meander(x0, x1, y, h, col, a = 1) { for (let x = x0; x < x1; x += h * 1.5) pencil([[x, y + h], [x, y], [x + h, y], [x + h, y + h * 0.66], [x + h * 0.36, y + h * 0.66], [x + h * 0.36, y + h * 0.33]], { w: 2.4, col, a, pass2: false }); }
function scrollHang(x, y, w, h, s, t, o = {}) {                     // висячий свиток с каллиграфией
  const sw = Math.sin(t * 1.2 + x) * 0.012; push(x, y, 1, sw); rect(-w / 2 - 8, -8, w + 16, 14, { wash: BJ.woodD, washA: 1, w: 1.8, col: BJ.ink });
  rect(-w / 2, 0, w, h, { wash: o.bg || BJ.paper, washA: 1, w: 2, col: BJ.ink }); rect(-w / 2, 0, w, 26, { wash: o.band || BJ.jadeD, washA: 1, line: false }); rect(-w / 2, h - 26, w, 26, { wash: o.band || BJ.jadeD, washA: 1, line: false });
  hzV(s, 0, 60, Math.min(w * 0.74, (h - 80) / s.length / 1.04), o.col || BJ.ink, 0.92); rect(-w / 2 - 8, h, w + 16, 14, { wash: BJ.woodD, washA: 1, w: 1.8, col: BJ.ink });
  if (o.seal !== false) rect(w / 2 - 26, h - 62, 20, 20, { wash: BJ.red, washA: 0.9, line: false }); pop(); }
function stanchion(x, y, s, x2) { const L = BJ.ink; if (x2 !== undefined) pencil(spline([[x, y - 118 * s], [(x + x2) / 2, y - 80 * s], [x2, y - 118 * s]], false, 8), { w: 7 * s, col: BJ.red, pass2: false });
  pencil([[x, y], [x, y - 120 * s]], { w: 7 * s, col: BJ.gold, pass2: false }); ell(x, y - 126 * s, 11 * s, 11 * s, { wash: BJ.goldL, washA: 1, w: 1.6, col: L }); ell(x, y, 24 * s, 7 * s, { wash: BJ.goldD, washA: 1, w: 1.6, col: L }); }
function bulb(x, y, s, t, on, sd = 0, col = 'rgba(255,214,140,1)') { pencil([[x, y - 60 * s], [x, y - 22 * s]], { w: 2.4, col: BJ.ink, pass2: false }); rect(x - 8 * s, y - 24 * s, 16 * s, 12 * s, { wash: '#3a3a3a', washA: 1, w: 1.4, col: BJ.ink });
  ell(x, y, 14 * s, 17 * s, { wash: on > 0.05 ? '#fff0b8' : '#5a564a', washA: 1, w: 1.6, col: BJ.ink }); if (on > 0.05) { glow(x, y, 150 * s, col, 0.55 * on * flick(t, sd)); glow(x, y, 46 * s, 'rgba(255,250,220,1)', 0.8 * on); } }
function moonGate(cx, cy, R, o = {}) {                              // стена с круглым окном (заливка вокруг круга двумя половинами) + рама
  const x0 = o.x0 ?? -900, x1 = o.x1 ?? 1980, y0 = o.y0 ?? -400, y1 = o.y1 ?? 1500, c = o.col || BJ.lac, n = 28;
  const up = [], dn = []; for (let i = 0; i <= n; i++) { const a = Math.PI * i / n; up.push([cx + Math.cos(a) * R, cy - Math.sin(a) * R]); dn.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); }
  shape([[x0, y0], [x1, y0], [x1, cy], ...up, [x0, cy]], { wash: c, washA: 1, line: false }); shape([[x0, y1], [x1, y1], [x1, cy], ...dn, [x0, cy]], { wash: c, washA: 1, line: false });
  rect(x0, cy - 6, cx - R - x0 + 4, 12, { wash: c, washA: 1, line: false }); rect(cx + R - 4, cy - 6, x1 - cx - R + 4, 12, { wash: c, washA: 1, line: false });
  pencil(ellPts(cx, cy, R + 14, R + 14, 0, 0, 60), { w: 26, col: o.frame || BJ.woodD, pass2: false }); pencil(ellPts(cx, cy, R + 14, R + 14, 0, 0, 60), { w: 5, col: BJ.gold, a: 0.9, pass2: false }); pencil(ellPts(cx, cy, R - 2, R - 2, 0, 0, 60), { w: 3, col: BJ.ink, pass2: false });
}
function latticeBJ(x, y, w, h, col, a = 1, n = 4) { for (let i = 0; i <= n; i++) { pencil([[x + w * i / n, y], [x + w * i / n, y + h]], { w: 3, col, a, pass2: false }); pencil([[x, y + h * i / n], [x + w, y + h * i / n]], { w: 3, col, a, pass2: false }); }
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if ((i + j) % 2 === 0) rect(x + w * (i + 0.3) / n, y + h * (j + 0.3) / n, w * 0.4 / n, h * 0.4 / n, { line: true, w: 2, col, a }); }
const PPL = { ming: ['#a8231c', '#2a3f86', '#3a6a4a', '#6a3a7a', '#b87a1c'], mao: ['#3a5f9a', '#4a6a4a', '#5a5e66', '#2f4a78', '#6a7a8a'], rep: ['#3a3e4a', '#6a5a48', '#2a3a4a', '#7a6a58', '#4a4a52'], now: ['#d84a3a', '#3a8ac0', '#e8c040', '#2a2a36', '#3aa88a', '#e8e0d0'] };
function inkBlobs(seed, n = 9) { const r = rng(seed), B = []; for (let i = 0; i < n; i++) B.push([r() * W, r() * H, 0.6 + r() * 0.7, r() * 0.25]); return B; }
function inkT(k, t, A, B, seed) {                                   // переход «тушь»: кляксы растут и заливают кадр A, затем в чёрном растут окна в кадр B
  const Bs = inkBlobs(seed), R = q => Math.pow(clamp(q), 1.6) * 1150;
  if (k < 0.5) { drawBuf(A); scr(() => { ctx.fillStyle = '#0e0806'; for (const [x, y, s, d] of Bs) { const rr = R((k * 2 - d) / (1 - d)) * s * 1.25; ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.3); ctx.fill(); for (let j = 0; j < 7; j++) { const a = j * 0.9 + x; ctx.beginPath(); ctx.arc(x + Math.cos(a) * rr * 1.12, y + Math.sin(a) * rr * 1.12, rr * 0.16, 0, 6.3); ctx.fill(); } } }); }
  else { scr(() => { ctx.fillStyle = '#0e0806'; ctx.fillRect(0, 0, W, H); }); const p = new Path2D(); for (const [x, y, s, d] of Bs) { const rr = R(((k - 0.5) * 2 - d * 0.6) / (1 - d * 0.6)) * s * 1.3; p.moveTo(W - x + rr, H - y); p.arc(W - x, H - y, Math.max(0.1, rr), 0, 6.3); } inPath(p, () => drawBuf(B)); }
}
