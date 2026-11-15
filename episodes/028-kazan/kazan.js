/* 028 Казань — общие детали: палитра «белый камень + зелень + татарский орнамент» (бирюза, изумруд, гранат, золото),
   стена кремля с башнями (Спасская со шпилем), падающая башня Сююмбике, Благовещенский собор, мечеть Кул-Шариф,
   Покровский собор (Василия Блаженного), деревянная крепость булгар, Волга, конь, верблюд, тюки меха, котёл-казан.
   Отмотка 028: Том мешает гигантский казан, делает полный оборот на его краю — пар закручивается и заливает кадр. */
const KZ = { ink: '#1c120a', stone: '#efe8d8', stoneD: '#a89a80', green: '#2a8a4a', greenD: '#0e4a24', turq: '#2ab0a0', turqL: '#8ae8d8', pom: '#b8283a', gold: '#e8b84a', goldL: '#ffe08a', goldD: '#8a6418',
  brick: '#a8402a', brickD: '#5a1a0e', volga: '#2a6a9a', volgaD: '#0e3456', wood: '#8a5a32', woodD: '#4a2e14', sky: '#6aa8d8' };

function kWall(x0, x1, base, h, t, o = {}) {                         // белая стена кремля с зубцами и бойницами
  const L = KZ.ink; rect(x0, base - h, x1 - x0, h, { wash: o.col || KZ.stone, washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.12, col: KZ.stoneD, ang: 1.4 } });
  for (let x = x0; x < x1 - 10; x += 34) poly([[x, base - h], [x + 6, base - h - 26], [x + 22, base - h - 26], [x + 28, base - h]], { wash: o.col || KZ.stone, washA: 1, w: 1.4, col: L });
  for (let x = x0 + 30; x < x1 - 20; x += 90) rect(x, base - h * 0.55, 10, 22, { wash: '#3a3028', washA: 1, line: false });
}
function kTower(x, base, s, t, o = {}) {                             // башня: белый четверик, шатёр (зелёный) или шпиль со звездой-шаром (Спасская)
  push(x, base, s); const L = KZ.ink;
  rect(-60, -300, 120, 300, { wash: o.col || KZ.stone, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.15, col: KZ.stoneD, ang: 1.3 } }); rect(-30, -90, 60, 90, { wash: '#3a3028', washA: 1, w: 1.8, col: L });
  if (o.spire) { rect(-46, -400, 92, 100, { wash: KZ.stone, washA: 1, w: 2, col: L }); rect(-34, -480, 68, 80, { wash: KZ.stone, washA: 1, w: 2, col: L }); poly([[-34, -480], [0, -640], [34, -480]], { wash: KZ.green, washA: 1, w: 2, col: L }); ell(0, -650, 12, 12, { wash: KZ.gold, washA: 1, w: 1.4, col: KZ.goldD }); }
  else poly([[-70, -300], [0, -440], [70, -300]], { wash: o.roof || KZ.green, washA: 1, w: 2.2, col: L, shade: { gap: 6, a: 0.25, col: KZ.greenD, ang: 0.7 } });
  pop();
}
function suyum(x, base, s, t, o = {}) {                              // башня Сююмбике: красный кирпич, 7 ярусов, наклон (≈2 м), шпиль с полумесяцем-флюгером
  push(x, base, s, o.lean ?? 0.035); const L = KZ.ink; let y = 0;
  [[150, 150], [120, 110], [100, 90], [84, 80], [70, 70], [56, 60], [40, 50]].forEach(([w, h], i) => { rect(-w / 2, y - h, w, h, { wash: KZ.brick, washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.15, col: KZ.brickD, ang: 1.3 } }); for (let k = -1; k <= 1; k++) if (w > 60) rect(k * w * 0.28 - 7, y - h * 0.7, 14, h * 0.45, { wash: o.lit ? KZ.goldL : '#3a1a10', washA: 1, w: 1, col: L }); rect(-w / 2 - 6, y - h - 8, w + 12, 10, { wash: KZ.stone, washA: 1, w: 1.2, col: L }); y -= h + 8; });
  poly([[-20, y], [0, y - 120], [20, y]], { wash: KZ.green, washA: 1, w: 1.8, col: L }); pencil([[0, y - 120], [0, y - 160]], { w: 3, col: KZ.goldD, pass2: false }); pop();
}
function annunc(x, base, s, t) {                                     // Благовещенский собор: белый объём, синие купола со звёздами, золотой центральный
  push(x, base, s); const L = KZ.ink; rect(-200, -260, 400, 260, { wash: KZ.stone, washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.12, col: KZ.stoneD, ang: 1.4 } });
  for (let k = -2; k <= 2; k++) shape(ellPts(k * 80, -260, 40, 26, 0, 0, 12).filter(p => p[1] <= -260), { wash: KZ.stone, washA: 1, w: 1.6, col: L });
  for (const [dx, h, c] of [[-120, 90, '#2a4a9a'], [120, 90, '#2a4a9a'], [-60, 120, '#2a4a9a'], [60, 120, '#2a4a9a'], [0, 160, KZ.gold]]) { rect(dx - 22, -260 - h, 44, h, { wash: KZ.stone, washA: 1, w: 1.6, col: L }); blob([[dx - 34, -260 - h], [dx - 30, -260 - h - 40], [dx, -260 - h - 70], [dx + 30, -260 - h - 40], [dx + 34, -260 - h]], { wash: c, washA: 1, w: 1.8, col: L });
    if (c !== KZ.gold) for (let q = 0; q < 4; q++) ell(dx - 14 + (q % 2) * 26, -260 - h - 20 - Math.floor(q / 2) * 18, 3, 3, { wash: KZ.goldL, washA: 1, line: false }); pencil([[dx, -260 - h - 70], [dx, -260 - h - 100]], { w: 3, col: KZ.goldD, pass2: false }); }
  pop();
}
function kulsharif(x, base, s, t, o = {}) {                          // мечеть Кул-Шариф: белый объём, бирюзовый купол-«казанская шапка», 4 минарета
  push(x, base, s); const L = KZ.ink; rect(-170, -200, 340, 200, { wash: KZ.stone, washA: 1, w: 2.4, col: L }); for (let k = -2; k <= 2; k++) shape(ellPts(k * 64, -110, 22, 40, 0, 0, 12).filter(p => p[1] <= -110).concat([[k * 64 + 22, -40], [k * 64 - 22, -40]]), { wash: o.lit ? KZ.goldL : '#2a5a6a', washA: 1, w: 1.4, col: L });
  blob([[-130, -200], [-120, -300], [-60, -360], [0, -380], [60, -360], [120, -300], [130, -200]], { wash: KZ.turq, washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#0a5a50', ang: 0.6 } }); for (let k = -3; k <= 3; k++) pencil([[k * 30, -205], [k * 10, -370]], { w: 2, col: KZ.goldL, a: 0.7, pass2: false });
  for (const m of [-240, -190, 190, 240]) { rect(m - 12, -560, 24, 560, { wash: KZ.stone, washA: 1, w: 1.8, col: L }); rect(m - 20, -400, 40, 12, { wash: KZ.turq, washA: 1, w: 1.2, col: L }); poly([[m - 14, -560], [m, -660], [m + 14, -560]], { wash: KZ.turq, washA: 1, w: 1.6, col: L }); }
  pop();
}
function basilC(x, base, s, t) {                                     // Покровский собор: пёстрые луковичные главы, центральный шатёр
  push(x, base, s); const L = KZ.ink; rect(-260, -200, 520, 200, { wash: '#b8402a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.15, col: '#5a1a0e', ang: 1.3 } });
  rect(-40, -460, 80, 260, { wash: '#c8503a', washA: 1, w: 2, col: L }); poly([[-50, -460], [0, -640], [50, -460]], { wash: '#e8d0a0', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.2, col: '#8a6a3a', ang: 0.4 } }); ell(0, -650, 16, 18, { wash: KZ.gold, washA: 1, w: 1.4, col: KZ.goldD });
  const D = [[-200, 120, '#2a8a4a', '#e8c040'], [-120, 180, '#d83a2a', '#f4f0e8'], [120, 180, '#2a5ab8', '#f4f0e8'], [200, 120, '#e8c040', '#2a8a4a']];
  D.forEach(([dx, h, c1, c2], i) => { rect(dx - 28, -200 - h, 56, h, { wash: '#c8503a', washA: 1, w: 1.6, col: L }); const dom = blob([[dx - 46, -200 - h], [dx - 52, -200 - h - 40], [dx - 26, -200 - h - 86], [dx, -200 - h - 120], [dx + 26, -200 - h - 86], [dx + 52, -200 - h - 40], [dx + 46, -200 - h]], { wash: c1, washA: 1, w: 2, col: L });
    for (let q = 0; q < 4; q++) pencil(spline([[dx - 44 + q * 22, -200 - h], [dx - 30 + q * 20, -200 - h - 60], [dx, -200 - h - 118]], false, 8), { w: 6, col: c2, a: 0.85, pass2: false }); pencil([[dx, -200 - h - 120], [dx, -200 - h - 150]], { w: 3, col: KZ.goldD, pass2: false }); });
  pop();
}
function woodFort(x, base, s, t) {                                   // деревянная крепость булгар: частокол, бревенчатая башня
  push(x, base, s); const L = KZ.ink; for (let i = -10; i <= 10; i++) { const h = 180 + (i % 2) * 14; rect(i * 30 - 14, -h, 28, h, { wash: KZ.wood, washA: 1, w: 1.6, col: L }); poly([[i * 30 - 14, -h], [i * 30, -h - 24], [i * 30 + 14, -h]], { wash: KZ.wood, washA: 1, w: 1.2, col: L }); }
  rect(-70, -360, 140, 360, { wash: '#9a6a3a', washA: 1, w: 2.2, col: L }); for (let j = 0; j < 10; j++) pencil([[-70, -30 - j * 34], [70, -30 - j * 34]], { w: 2, col: KZ.woodD, pass2: false }); poly([[-90, -360], [0, -460], [90, -360]], { wash: '#6a4424', washA: 1, w: 2, col: L }); pop();
}
function carpet(x, y, w, h, seed = 1, o = {}) {                    // килим: красное поле, ромбы, бахрома
  const L = KZ.ink, c1 = o.c1 || KZ.pom, c2 = o.c2 || '#1e3f8a';
  rect(x, y, w, h, { wash: c1, washA: 1, w: 2, col: L }); rect(x + 10, y + 10, w - 20, h - 20, { line: true, w: 5, col: KZ.goldL });
  const n = Math.max(2, Math.round(w / 90)); for (let i = 0; i < n; i++) { const cx = x + (i + 0.5) * w / n, cy = y + h / 2; poly([[cx, cy - h * 0.32], [cx + w / n * 0.35, cy], [cx, cy + h * 0.32], [cx - w / n * 0.35, cy]], { wash: c2, washA: 1, w: 1.4, col: L }); ell(cx, cy, 8, 8, { wash: KZ.goldL, washA: 1, line: false }); }
  for (let i = 0; i < w; i += 12) pencil([[x + i, y + h], [x + i, y + h + 14]], { w: 2, col: '#e8dcc0', pass2: false });
}
function horse(x, y, s, t, seed = 1, col = '#7a4a2a') {
  push(x, y, s, 0, seed % 2 ? 1 : -1); const L = KZ.ink, g = Math.sin(t * 4 + seed) * 6; for (const k of [-60, -30, 40, 70]) pencil([[k, -110], [k + (k > 0 ? g : -g), 0]], { w: 9, col: col, pass2: false });
  ell(0, -140, 100, 46, { wash: col, washA: 1, w: 2.2, col: L }); blob([[70, -160], [120, -250], [150, -240], [110, -150]], { wash: col, washA: 1, w: 2, col: L }); pencil([[-96, -150], [-130, -90]], { w: 9, col: '#2a1a0e', pass2: false }); pop();
}
function camel(x, y, s, t, seed = 1) {
  push(x, y, s, 0, seed % 2 ? 1 : -1); const L = KZ.ink, C = '#c8a068'; for (const k of [-60, -30, 40, 70]) pencil([[k, -130], [k + Math.sin(t * 3 + k) * 6, 0]], { w: 8, col: C, pass2: false });
  blob([[-90, -130], [-60, -200], [-20, -170], [20, -210], [60, -140], [90, -130], [60, -110], [-80, -110]], { wash: C, washA: 1, w: 2, col: L }); pencil(spline([[80, -140], [110, -200], [130, -240], [160, -240]], false, 8), { w: 18, col: C, pass2: false });
  rect(-50, -230, 100, 40, { wash: '#8a3a2a', washA: 1, w: 1.6, col: L }); pop();
}
function furs(x, y, s) { push(x, y, s); const L = KZ.ink; for (let q = 0; q < 4; q++) { blob([[-60 + q * 10, -q * 26], [60 - q * 6, -q * 26 - 4], [70 - q * 6, -q * 26 - 30], [-56 + q * 10, -q * 26 - 32]], { wash: ['#6a4a2a', '#8a6a3a', '#3a2a1a', '#b88a5a'][q], washA: 1, w: 1.6, col: L, shade: { gap: 4, a: 0.3, col: '#2a1a0a', ang: 1.2 } }); } pop(); }
function volga(y0, y1, t, seed) { vgrad(y0, y1, ['#8ab8d8', '#2a6a9a', '#0e3456'], 1); const r = rng(hsh(FRAME, seed)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,255,240,${0.25 * r()})`; ctx.fillRect(r() * W, y0 + r() * (y1 - y0), 30 + r() * 60, 3); } ctx.restore(); }
function ornament(x, y, r, t, o = {}) {                              // татарский тюльпанный орнамент-розетка
  push(x, y, 1, o.rot || 0); const L = KZ.ink; for (let k = 0; k < 8; k++) { push(0, 0, 1, k / 8 * 6.283); blob([[0, -r * 0.2], [-r * 0.18, -r * 0.6], [0, -r], [r * 0.18, -r * 0.6]], { wash: [KZ.turq, KZ.pom, KZ.green, KZ.gold][k % 4], washA: o.a ?? 1, w: 1.4, col: L }); pop(); } ell(0, 0, r * 0.22, r * 0.22, { wash: KZ.gold, washA: o.a ?? 1, w: 1.4, col: L }); pop();
}
function kazanPot(x, y, s, t, o = {}) {                              // чугунный казан на огне
  push(x, y, s); const L = KZ.ink; for (let q = 0; q < 5; q++) { const f = Math.sin(t * 12 + q) * 0.15 + 1; blob([[-80 + q * 40, 20], [-70 + q * 40, -40 * f], [-60 + q * 40, 20]], { wash: q % 2 ? '#ffb44a' : '#ff7a2a', washA: 1, line: false }); }
  const pt = blob([[-220, -180], [220, -180], [200, -60], [120, 10], [-120, 10], [-200, -60]], { wash: '#2a2a2e', washA: 1, w: 3, col: L }); shadeG(pt.path, -220, 0, 220, 0, '#000000', 0.4); ell(0, -180, 220, 34, { wash: '#3a3a40', washA: 1, w: 2.4, col: L }); ell(0, -180, 200, 26, { wash: o.soup || '#c8843a', washA: 1, line: false });
  for (const k of [-1, 1]) ell(k * 230, -150, 26, 16, { line: true, w: 6, col: '#2a2a2e' }); pop();
}

/* отмотка-казан: тёмно-зелёный фон с вращающимися розетками-орнаментами, годы; Том делает полный оборот над котлом,
   пар закручивается спиралью и к концу заливает кадр (доля секунды) */
function wTunnelKZ(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), sp = sm(clamp(p / 0.72)), steam = sm(clamp((p - 0.6) / 0.3));
  vgrad(-200, 2200, ['#0a2a1a', '#0e3a24', '#1a2a1a'], 1);
  for (let k = 0; k < 6; k++) { const ph = (p * 0.9 + k / 6) % 1, z = Math.pow(ph, 2), R = 80 + z * 1300, a = Math.min(1, ph * 2.4) * (1 - ph * 0.35), n = 8;
    for (let i = 0; i < n; i++) { const aa = i / n * 6.283 + t * (k % 2 ? 0.8 : -0.6); ctx.save(); ctx.globalAlpha = a; ornament(540 + Math.cos(aa) * R, 960 + Math.sin(aa) * R, 30 + z * 110, t, { rot: aa }); ctx.restore(); } }
  const yrs = ['2026', '2005', '1887', '1556', '1552', '1438', '≈1000'];
  yrs.forEach((y, k) => { const ph = (p + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.9 + p * 2; txt(y, 540 + Math.cos(a) * z * 640, 960 + Math.sin(a) * z * 860, 22 + z * 110, { col: KZ.goldL, font: 'Osw', a: (1 - ph) * 0.85 }); });
  kazanPot(540, 1500, 1.1, t); lightPool(540, 1500, 380, 80, 'rgba(255,170,80,1)', 0.45);
  for (let i = 0; i < 6; i++) { const pts = []; for (let q = 0; q <= 22; q++) { const rr = 40 + q * (18 + steam * 70), aa = i / 6 * 6.283 + q * 0.3 - sp * 6.283 * 1.2; pts.push([540 + Math.cos(aa) * rr, 1250 - q * 14 + Math.sin(aa) * rr * 0.4]); } pencil(pts, { w: 30 + steam * 200, col: '#f2f0ea', a: 0.3 + steam * 0.6, pass2: false, gap: false }); }
  cat();
  if (steam > 0.85) screenFill('#f6f4ee', clamp((steam - 0.85) / 0.15), 'source-over');
}
WORLD.tunnel = wTunnelKZ;
DIR.tunnel = { outfit: 'hoodieKZN', light: { side: 1, rim: '#ffb46a' }, grade: ['#0e3a24', 0.08], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.9, 'shock']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 0.9 + 0.06 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 240 * sc, y: 1120 + Math.cos(r) * 240 * sc, s: sc, rot: r, look: [0, 0.5], hand: [160, -300], handF: [-140, -300], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 940, 0.1], [S1.tunnel, 540, 930, 0.16]] };
