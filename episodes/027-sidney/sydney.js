/* 027 Сидней — общие детали: палитра «гавань» (синева залива, песчаник, эвкалипт, закатный оранж, белые паруса оперы),
   опера (со стадиями стройки), мост-«вешалка» (со смыканием арки), парусник, эвкалипт, кенгуру, какаду, паром, автомобиль 1930-х.
   Отмотка 027: Том бросает бумеранг и делает полный оборот вслед за ним, бумеранг описывает круг и влетает в камеру — вспышка. */
const SY = { ink: '#1c120a', sea: '#1f6fa8', seaD: '#0c3456', seaL: '#6ab8e0', sand: '#d8a868', sandD: '#8a5a2a', euc: '#6a8a6a', eucD: '#2a4a3a', ora: '#f07a2a', oraL: '#ffc070',
  shell: '#f4efe4', shellD: '#b8b0a0', red: '#b8301e', gold: '#e8b84a', goldL: '#ffe08a', goldD: '#8a6418', steel: '#6a7480', steelD: '#2e343c', green: '#2a7a4a', yel: '#f0c83a' };

function operaH(x, base, s, t, o = {}) {                            // опера: подиум + паруса-оболочки; o.k — сколько построено (0..1), o.lit — подсветка, o.cranes
  push(x, base, s); const L = SY.ink, k = o.k ?? 1;
  rect(-420, -60, 840, 60, { wash: '#c89a6a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#6a4a2a', ang: 1.4 } }); for (let i = 0; i < 14; i++) pencil([[-400 + i * 60, -58], [-390 + i * 60, -2]], { w: 1.4, col: '#8a6a4a', a: 0.6, pass2: false });
  const S = [[-300, 230, 300, -0.25], [-130, 200, 330, -0.15], [60, 170, 290, -0.05], [230, 150, 240, 0.05], [-380, 120, 160, -0.35], [330, 110, 150, 0.15]];
  S.forEach(([sx, w, h, lean], i) => { const q = clamp(k * S.length - i); if (q <= 0) return; const hh = h * q;
    const pts = [[sx - w / 2, -60], [sx - w * 0.3 + lean * 80, -60 - hh * 0.7], [sx + lean * 200, -60 - hh], [sx + w * 0.2, -60 - hh * 0.6], [sx + w / 2, -60]];
    const sh = blob(pts, { wash: o.lit ? '#fff4dc' : SY.shell, washA: 1, w: 2.4, col: L, key: 3100 + i }); shadeG(sh.path, sx - w / 2, 0, sx + w / 2, 0, SY.shellD, 0.45);
    if (q > 0.5) for (let j = 1; j < 5; j++) pencil([[sx - w / 2 + j * w / 5, -62], [sx + lean * 200 * (j / 5) - w * 0.1 + j * w * 0.04, -60 - hh * (0.25 + j * 0.13)]], { w: 1.2, col: SY.shellD, a: 0.6, pass2: false });
    if (o.lit) glow(sx, -60 - hh * 0.5, w * 0.6, 'rgba(255,230,190,1)', 0.15);
    if (q < 1 && o.cranes !== false) { pencil([[sx + w / 2 + 30, 0], [sx + w / 2 + 30, -60 - h - 120]], { w: 6, col: SY.yel, pass2: false }); pencil([[sx + w / 2 - 160, -60 - h - 110], [sx + w / 2 + 120, -60 - h - 110]], { w: 5, col: SY.yel, pass2: false }); pencil([[sx + w / 2 - 100, -60 - h - 110], [sx + w / 2 - 100, -60 - hh - 20]], { w: 1.4, col: L, pass2: false }); } });
  pop();
}
function harbourB(x, base, s, t, o = {}) {                          // мост-«вешалка»: пилоны, стальная арка, полотно; o.k — смыкание арки (0..1), o.lit
  push(x, base, s); const L = SY.ink, k = o.k ?? 1, span = 900;
  for (const sd of [-1, 1]) { rect(sd * span / 2 - 50, -260, 100, 260, { wash: '#c8a878', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: '#6a4a2a', ang: 1.3 } }); rect(sd * span / 2 - 56, -280, 112, 22, { wash: '#b89868', washA: 1, w: 2, col: L }); }
  const arch = (q, r) => { const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; if (Math.abs(u - 0.5) * 2 > q) continue; pts.push([(u - 0.5) * span, -150 - Math.sin(u * Math.PI) * r]); } return pts; };
  const half = k >= 1 ? 1 : k;
  for (const sd of [-1, 1]) { const top = [], bot = []; for (let i = 0; i <= 15; i++) { const u = sd < 0 ? i / 30 : 1 - i / 30; if (i / 15 > half) break; top.push([(u - 0.5) * span, -150 - Math.sin(u * Math.PI) * 330]); bot.push([(u - 0.5) * span, -150 - Math.sin(u * Math.PI) * 250]); }
    if (top.length > 1) { pencil(top, { w: 10, col: o.col || SY.steel, pass2: false }); pencil(bot, { w: 7, col: o.col || SY.steel, pass2: false }); for (let i = 0; i < top.length; i++) pencil([top[i], bot[i]], { w: 3, col: o.col || SY.steelD, pass2: false }); for (let i = 0; i < top.length - 1; i++) pencil([top[i], bot[i + 1]], { w: 2, col: o.col || SY.steelD, a: 0.8, pass2: false }); } }
  rect(-span / 2 - 200, -160, span + 400, 22, { wash: o.col || SY.steelD, washA: 1, w: 1.6, col: L }); for (let i = 0; i < 18; i++) { const xx = -span / 2 + 25 + i * 50, yy = -150 - Math.sin((xx / span + 0.5) * Math.PI) * 250; if (k >= 1) pencil([[xx, yy], [xx, -160]], { w: 2, col: o.col || SY.steelD, a: 0.7, pass2: false }); }
  if (o.lit) for (let i = 0; i <= 30; i += 2) { const u = i / 30; ell((u - 0.5) * span, -150 - Math.sin(u * Math.PI) * 330, 5, 5, { wash: '#ffe8a8', washA: 1, line: false }); }
  pop();
}
function tallShip(x, y, s, t, o = {}) {                             // парусник Первого флота: корпус, три мачты, паруса, флажок
  push(x, y + Math.sin(t * 1.3 + x) * 5, s, Math.sin(t * 1.1) * 0.015, o.flip || 1); const L = SY.ink;
  const hb = shape([[-260, -40], [240, -40], [300, -90], [260, 0], [200, 40], [-220, 40], [-270, 0]], { wash: '#5a3a1e', washA: 1, w: 2.6, col: L }); shadeG(hb.path, 0, -40, 0, 40, '#1a0e04', 0.45);
  rect(-240, -52, 470, 14, { wash: '#c8a050', washA: 1, w: 1.4, col: L }); for (let i = 0; i < 8; i++) rect(-200 + i * 52, -24, 20, 16, { wash: '#1a1a1a', washA: 1, w: 1, col: L });
  for (const [mx, h] of [[-140, 380], [20, 440], [170, 340]]) { pencil([[mx, -40], [mx, -40 - h]], { w: 6, col: '#4a2a12', pass2: false });
    for (let j = 0; j < 3; j++) { const yy = -80 - j * h / 3.3, ww = 120 - j * 24, bl = Math.sin(t * 1.5 + j + mx) * 6; blob([[mx - ww, yy], [mx + ww, yy], [mx + ww + bl, yy - h / 4], [mx - ww + bl, yy - h / 4]], { wash: '#efe4c8', washA: 1, w: 1.8, col: L, shade: { gap: 7, a: 0.15, col: '#8a7a5a', ang: 1.5 } }); } }
  pencil([[240, -60], [380, -120]], { w: 4, col: '#4a2a12', pass2: false }); shape([[20, -480], [80, -470], [20, -460]], { wash: SY.red, washA: 1, w: 1.2, col: L }); pop();
}
function eucalypt(x, y, h, t, seed = 1) {                           // эвкалипт: светлый ствол, сизые кроны
  const r = rng(seed); push(x, y, h / 400); pencil(spline([[0, 0], [-14, -140], [12, -260], [-6, -380]], false, 10), { w: 22, col: '#d8d0c0', pass2: false }); pencil(spline([[0, -200], [70, -300], [90, -360]], false, 8), { w: 10, col: '#c8c0b0', pass2: false });
  for (let i = 0; i < 12; i++) { const a = r() * 6.283, d = 40 + r() * 90; ell(Math.cos(a) * d, -380 + Math.sin(a) * d * 0.6 - 40, 70 + r() * 30, 34 + r() * 14, { wash: r() < 0.5 ? SY.euc : '#5a7a6a', washA: 0.95, w: 1.4, col: SY.eucD }); } pop();
}
function kangaroo(x, y, s, t, seed = 1) {                           // кенгуру: прыжок по синусу
  const ph = (t * 1.6 + seed) % 1, hop = Math.sin(ph * Math.PI) * 60; push(x, y - hop, s, 0, seed % 2 ? 1 : -1); const L = SY.ink, C = '#b8784a';
  blob([[-60, -40], [-40, -130], [10, -170], [40, -150], [30, -60], [0, 0], [-50, 0]], { wash: C, washA: 1, w: 2, col: L }); blob([[20, -160], [50, -220], [80, -210], [70, -170]], { wash: C, washA: 1, w: 1.8, col: L });
  for (const k of [0, 1]) poly([[50 + k * 14, -214], [56 + k * 14, -250], [66 + k * 14, -214]], { wash: C, washA: 1, w: 1.4, col: L }); pencil(spline([[-56, -30], [-130, 0], [-170, 10]], false, 8), { w: 12, col: C, pass2: false });
  pencil([[0, 0], [40, 10]], { w: 9, col: C, pass2: false }); pop();
}
function cockatoo(x, y, s, t, seed = 1) {                           // какаду: белый, жёлтый хохолок
  const f = Math.sin(t * 8 + seed); push(x, y, s); const L = SY.ink; ell(0, 0, 26, 18, { wash: '#f6f4ee', washA: 1, w: 1.6, col: L }); ell(22, -12, 12, 11, { wash: '#f6f4ee', washA: 1, w: 1.4, col: L });
  for (let q = 0; q < 4; q++) pencil([[18, -20], [6 - q * 4, -42 - q * 3]], { w: 3, col: SY.yel, pass2: false }); pencil(spline([[-6, -6], [-30, -30 - f * 20], [-50, -10]], false, 6), { w: 5, col: '#e8e4dc', pass2: false }); pop();
}
function ferrySY(x, y, s, t, o = {}) {                              // сиднейский паром: зелёно-жёлтый двухпалубный
  push(x, y + Math.sin(t * 1.5 + x) * 4, s, 0, o.flip || 1); const L = SY.ink;
  shape([[-230, -40], [230, -40], [210, 24], [-210, 24]], { wash: SY.green, washA: 1, w: 2.4, col: L }); rect(-170, -100, 340, 60, { wash: '#f2e6c0', washA: 1, w: 2, col: L }); for (let k = 0; k < 8; k++) rect(-155 + k * 40, -88, 26, 26, { wash: o.lit ? '#ffe8a8' : '#3a5a6a', washA: 1, w: 1, col: L });
  rect(-110, -150, 220, 50, { wash: SY.yel, washA: 1, w: 2, col: L }); rect(-20, -200, 40, 50, { wash: SY.green, washA: 1, w: 1.6, col: L }); pop();
}
function car30(x, y, s, t, col = '#2a2a3a', flip = 1) {             // автомобиль 1930-х
  push(x, y, s, 0, flip); const L = SY.ink; shape([[-110, -30], [-90, -70], [-30, -74], [-10, -110], [60, -110], [80, -70], [120, -64], [124, -20], [-110, -20]], { wash: col, washA: 1, w: 2, col: L });
  rect(0, -104, 50, 32, { wash: '#bcd8e4', washA: 1, w: 1.4, col: L }); for (const k of [-70, 80]) { ell(k, -14, 24, 24, { wash: '#1a1a1e', washA: 1, w: 1.8, col: L }); ell(k, -14, 9, 9, { wash: '#c8c8cc', washA: 1, line: false }); } ell(120, -54, 8, 8, { wash: '#ffe8a8', washA: 1, w: 1, col: L }); pop();
}
function gull(x, y, s, t, seed = 1, col = '#f6f1e6') {             // чайка: машет крыльями
  const f = Math.sin(t * 9 + seed * 1.7); push(x, y, s);
  pencil(spline([[-40, -8 - f * 18], [-18, -2], [0, 4]], false, 6), { w: 4, col: '#2a2a30', pass2: false }); pencil(spline([[40, -8 - f * 18], [18, -2], [0, 4]], false, 6), { w: 4, col: '#2a2a30', pass2: false });
  ell(0, 4, 10, 6, { wash: col, washA: 1, w: 1.4, col: '#2a2a30' }); pop();
}
function gulls(n, x0, x1, y0, y1, t, seed, s = 1, sp = 40) { const r = rng(seed); for (let i = 0; i < n; i++) { const bx = x0 + r() * (x1 - x0), by = y0 + r() * (y1 - y0), v = (0.6 + r() * 0.8) * sp; gull(((bx + t * v) - x0) % (x1 - x0) + x0, by + Math.sin(t * 1.3 + i) * 14, s * (0.6 + r() * 0.6), t, i + seed); } }
function boomer(x, y, s, rot, o = {}) {                              // бумеранг: изогнутый, полированное дерево, без ритуальных узоров
  push(x, y, s, rot); const L = SY.ink; const b = blob([[-90, 20], [-40, -30], [0, -40], [40, -30], [90, 20], [70, 30], [30, -6], [0, -14], [-30, -6], [-70, 30]], { wash: o.col || '#b8743a', washA: 1, w: 2.4, col: L }); shadeG(b.path, 0, -40, 0, 30, '#5a2a0a', 0.4);
  pencil(spline([[-70, 14], [-30, -20], [0, -28], [30, -20], [70, 14]], false, 10), { w: 2, col: '#f0c890', a: 0.6, pass2: false }); pop();
}

/* отмотка-бумеранг: ночное небо с Южным Крестом и годами, Том делает полный оборот (≈1 с), бумеранг кружит по орбите вокруг,
   к концу влетает в камеру — тёплая вспышка на долю секунды */
function wTunnelSY(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), sp = sm(clamp(p / 0.72)), rush = sm(clamp((p - 0.66) / 0.24));
  vgrad(-200, 2200, ['#0a0e2a', '#1a2050', '#5a2a4a', '#c8622a'], 1);
  const cx = 540, cy = 980; const r0 = rng(3200); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 140; i++) { const a = r0() * 6.283 + t * 0.6, d = r0() * 1200; ctx.globalAlpha = 0.3 + 0.6 * r0(); ctx.fillRect(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.6, 2.6); } ctx.restore();
  for (const [sx, sy, sz] of [[0, -260, 16], [-60, -120, 13], [70, -150, 12], [10, -10, 15], [40, -90, 7]]) { push(cx + Math.cos(t * 0.6) * sx - Math.sin(t * 0.6) * sy, cy - 300 + Math.sin(t * 0.6) * sx + Math.cos(t * 0.6) * sy, 1); for (let q = 0; q < 4; q++) pencil([[0, 0], [Math.cos(q * 1.57) * sz * 2, Math.sin(q * 1.57) * sz * 2]], { w: 3, col: '#fff8e0', pass2: false }); glow(0, 0, sz * 3, 'rgba(255,248,220,1)', 0.35); pop(); }   // Южный Крест
  const yrs = ['2026', '1973', '1966', '1957', '1932', '1851', '1788'];
  yrs.forEach((y, k) => { const ph = (p * 1.0 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.9 + p * 2; txt(y, cx + Math.cos(a) * z * 640, cy + Math.sin(a) * z * 860, 22 + z * 110, { col: SY.oraL, font: 'Osw', a: (1 - ph) * 0.85 }); });
  for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy + 40, 360 + k * 26, 200 + k * 16, 0, 0, 60), { w: 3, col: SY.oraL, a: 0.25 - k * 0.07, pass2: false });
  lightPool(cx, 1420, 380, 80, 'rgba(255,200,140,1)', 0.35);
  const ang = sp * 6.283 * 1.2 + 2.2, bx = cx + Math.cos(ang) * 360 * (1 - rush), by = cy + 40 + Math.sin(ang) * 200 * (1 - rush) - rush * 80, bs = 1.2 + rush * 9;
  const behind = Math.sin(ang) < 0 && rush < 0.1;
  if (behind) boomer(bx, by, bs, t * 18);
  cat();
  if (!behind) { for (let q = 1; q < 5; q++) { ctx.save(); ctx.globalAlpha = 0.15; boomer(cx + Math.cos(ang - q * 0.12) * 360 * (1 - rush), cy + 40 + Math.sin(ang - q * 0.12) * 200 * (1 - rush), bs, t * 18 - q * 0.4); ctx.restore(); } boomer(bx, by, bs, t * 18); }
  if (rush > 0.82) screenFill('#ffd08a', clamp((rush - 0.82) / 0.18), 'source-over');
}
WORLD.tunnel = wTunnelSY;
DIR.tunnel = { outfit: 'hoodieSYD', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2a5a', 0.08], act: () => [[S0.tunnel, 'awe'], [S0.tunnel + 0.9, 'shock']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 1.0 + 0.06 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1240 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0.4, -0.3], hand: [180, -420], handF: [-150, -260], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 940, 0.1], [S1.tunnel, 540, 930, 0.16]] };
