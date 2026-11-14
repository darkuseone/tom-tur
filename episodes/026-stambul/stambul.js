/* 026 Стамбул — общие детали выпуска: палитра «изник» (кобальт, бирюза, гранат, золото), силуэты мечетей и Святой Софии,
   Галатская башня, паром, лодки, чайки, симиты, стакан чая, плитка изник, османская лампа, ковёр, галера, цепь, монета.
   Отмотка 026: Том становится дервишем и делает полный оборот, белый подол раскручивается в вихрь на весь экран. */
const IS = { ink: '#1c120a', cob: '#1f4f9a', cobD: '#0c2652', cobL: '#5a8ad8', turq: '#2aa6a0', turqL: '#8ae0d4', gold: '#e8b84a', goldL: '#ffe08a', goldD: '#8a6418',
  pom: '#b8283a', pomD: '#5a0e16', sand: '#e8d2a6', stone: '#cbb68e', stoneD: '#7a6a4a', sea: '#2a6a9a', seaD: '#0e3454', terra: '#c8643a', marble: '#efe8dc', white: '#f6f1e6', pink: '#d89a84' };

/* мечеть-силуэт: главный купол на барабане, полукупола ступенями, минареты с балконами. o.n — минаретов, o.lit — окна, o.line — с контуром (ближе) */
function domeM(x, base, s, col, o = {}) {
  push(x, base, s); const n = o.n ?? 4, L = o.line ? IS.ink : col, op = o.line ? { wash: col, washA: 1, w: 2.2, col: L } : null;
  const S = (pts) => op ? shape(pts, op) : sil(pts, col, 1);
  S([[-230, 0], [-230, -150], [230, -150], [230, 0]]);
  for (const sd of [-1, 1]) { S(ellPts(sd * 150, -150, 80, 70, 0, 0, 16).filter(p => p[1] <= -150)); S(ellPts(sd * 230, -150, 46, 40, 0, 0, 12).filter(p => p[1] <= -150)); }
  S([[-110, -150], [-110, -210], [110, -210], [110, -150]]);
  S(ellPts(0, -210, 120, 120, 0, 0, 24).filter(p => p[1] <= -210));
  pencil([[0, -330], [0, -372]], { w: 4, col: o.line ? IS.goldD : col, pass2: false }); ell(0, -372, 6, 6, { wash: o.line ? IS.gold : col, washA: 1, line: false });
  const mx = n === 6 ? [-330, -250, 250, 330, -180, 180] : n === 2 ? [-280, 280] : [-310, -250, 250, 310];
  for (let i = 0; i < n; i++) { const m = mx[i], h = 470 - (i > 3 ? 60 : 0) - Math.abs(m) * 0.1;
    S([[m - 13, 0], [m - 13, -h], [m + 13, -h], [m + 13, 0]]); S([[m - 22, -h * 0.62], [m + 22, -h * 0.62], [m + 20, -h * 0.62 + 12], [m - 20, -h * 0.62 + 12]]);
    S([[m - 22, -h * 0.82], [m + 22, -h * 0.82], [m + 20, -h * 0.82 + 12], [m - 20, -h * 0.82 + 12]]); S([[m - 13, -h], [m, -h - 90], [m + 13, -h]]); }
  if (o.lit) { const r = rng(o.seed || 7); ctx.save(); ctx.fillStyle = o.litCol || '#ffd98a'; ctx.globalAlpha = o.lit;
    for (let k = -8; k <= 8; k++) ctx.fillRect(k * 12 - 3, -230, 6, 12); for (let k = -16; k <= 16; k++) if (r() < 0.7) ctx.fillRect(k * 13 - 3, -110, 6, 16);
    for (let k = -14; k <= 14; k++) if (r() < 0.5) ctx.fillRect(k * 15 - 3, -60, 7, 18); ctx.restore(); }
  pop();
}
/* Святая София: купол на барабане с кольцом окон, контрфорсы, розово-терракотовые стены. o.minarets — после 1453; o.scaff — строительные леса (537) */
function sofiaB(x, base, s, t, o = {}) {
  push(x, base, s); const L = IS.ink, wc = o.col || IS.pink, wd = lerpC(wc, '#000000', 0.35);
  if (o.minarets) for (const m of [-330, -270, 270, 330]) { rect(m - 12, -440, 24, 440, { wash: IS.marble, washA: 1, w: 2, col: L }); poly([[m - 13, -440], [m, -530], [m + 13, -440]], { wash: IS.cob, washA: 1, w: 1.8, col: L }); rect(m - 20, -300, 40, 10, { wash: IS.marble, washA: 1, w: 1.6, col: L }); }
  rect(-260, -170, 520, 170, { wash: wc, washA: 1, w: 2.6, col: L, shade: { gap: 7, a: 0.18, col: wd, ang: 1.2 } });
  for (const sd of [-1, 1]) { blob([[sd * 260, 0], [sd * 260, -150], [sd * 200, -230], [sd * 150, -230], [sd * 150, 0]], { wash: lerpC(wc, '#ffffff', 0.1), washA: 1, w: 2.4, col: L }); shape(ellPts(sd * 150, -170, 70, 60, 0, 0, 16).filter(p => p[1] <= -170), { wash: IS.stoneD, washA: 1, w: 2, col: L }); }
  rect(-120, -260, 240, 90, { wash: wc, washA: 1, w: 2.4, col: L });
  for (let k = -5; k <= 5; k++) rect(k * 20 - 5, -240, 10, 26, { wash: o.lit ? IS.goldL : '#3a2a2a', washA: 1, line: false });
  const d = shape(ellPts(0, -260, 140, 120, 0, 0, 28).filter(p => p[1] <= -260), { wash: '#6a7a8a', washA: 1, w: 2.8, col: L, shade: { gap: 6, a: 0.25, col: '#2a3440', ang: 0.4 } });
  pencil([[0, -380], [0, -420]], { w: 4, col: IS.goldD, pass2: false });
  for (let k = -3; k <= 3; k++) { rect(k * 70 - 16, -120, 32, 60, { wash: o.lit ? IS.goldL : '#2a2028', washA: 1, w: 1.6, col: L }); }
  if (o.scaff) { for (let k = -6; k <= 6; k++) pencil([[k * 45, 10], [k * 45, -300 + Math.abs(k) * 20]], { w: 4, col: '#7a5432', pass2: false }); for (let j = 0; j < 6; j++) pencil([[-280, -j * 55], [280, -j * 55]], { w: 3.4, col: '#7a5432', pass2: false }); }
  pop();
}
function galataT(x, base, s, o = {}) {                           // Галатская башня: каменный цилиндр, кольцо окон, конус
  push(x, base, s); const L = IS.ink;
  const b = rect(-70, -420, 140, 420, { wash: o.col || IS.stone, washA: 1, w: 2.6, col: L }); shadeG(b.path, -70, 0, 70, 0, IS.stoneD, 0.45);
  for (let j = 0; j < 4; j++) for (const k of [-1, 0, 1]) rect(k * 38 - 8, -120 - j * 70, 16, 34, { wash: o.lit ? IS.goldL : '#2a2028', washA: 1, w: 1.2, col: L });
  rect(-86, -470, 172, 50, { wash: IS.stone, washA: 1, w: 2.2, col: L }); for (let k = -3; k <= 3; k++) rect(k * 24 - 7, -462, 14, 30, { wash: o.lit ? '#ffe8a0' : '#2a2028', washA: 1, line: false });
  poly([[-90, -470], [0, -640], [90, -470]], { wash: '#3a4a5a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#1a2430', ang: 0.6 } }); pencil([[0, -640], [0, -680]], { w: 3, col: L, pass2: false });
  pop();
}
function gull(x, y, s, t, seed = 1, col = '#f6f1e6') {             // чайка: машет крыльями
  const f = Math.sin(t * 9 + seed * 1.7); push(x, y, s);
  pencil(spline([[-40, -8 - f * 18], [-18, -2], [0, 4]], false, 6), { w: 4, col: '#2a2a30', pass2: false }); pencil(spline([[40, -8 - f * 18], [18, -2], [0, 4]], false, 6), { w: 4, col: '#2a2a30', pass2: false });
  ell(0, 4, 10, 6, { wash: col, washA: 1, w: 1.4, col: '#2a2a30' }); pop();
}
function gulls(n, x0, x1, y0, y1, t, seed, s = 1, sp = 40) { const r = rng(seed); for (let i = 0; i < n; i++) { const bx = x0 + r() * (x1 - x0), by = y0 + r() * (y1 - y0), v = (0.6 + r() * 0.8) * sp; gull(((bx + t * v) - x0) % (x1 - x0) + x0, by + Math.sin(t * 1.3 + i) * 14, s * (0.6 + r() * 0.6), t, i + seed); } }
function ferry(x, y, s, t, o = {}) {                             // стамбульский пароходик-вапур: белый корпус, ряд окон, труба с полосой
  push(x, y + Math.sin(t * 1.6 + x) * 4, s, Math.sin(t * 1.2) * 0.01, o.flip || 1); const L = IS.ink;
  shape([[-260, -40], [260, -40], [230, 30], [-220, 30]], { wash: IS.white, washA: 1, w: 2.6, col: L }); rect(-230, 10, 460, 14, { wash: o.stripe || IS.cob, washA: 1, line: false });
  rect(-170, -100, 330, 60, { wash: '#eaeef0', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 9; k++) rect(-155 + k * 35, -88, 22, 28, { wash: o.lit ? IS.goldL : '#3a5a7a', washA: 1, w: 1.2, col: L });
  rect(-110, -150, 200, 50, { wash: '#eaeef0', washA: 1, w: 2, col: L }); rect(20, -230, 40, 80, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); rect(20, -210, 40, 16, { wash: IS.white, washA: 1, line: false });
  if (o.smoke !== false) for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; ell(40 - ph * 160, -240 - ph * 160, 18 + ph * 40, 14 + ph * 30, { wash: '#9a9aa2', washA: 0.5 * (1 - ph), line: false }); }
  pop();
}
function boatF(x, y, s, t, seed = 1, col = IS.terra) {           // лодка рыбака
  push(x, y + Math.sin(t * 2 + seed) * 5, s, Math.sin(t * 1.5 + seed) * 0.04); const L = IS.ink;
  blob([[-90, -20], [90, -20], [70, 18], [-70, 18]], { wash: col, washA: 1, w: 2.2, col: L }); rect(-80, -26, 160, 10, { wash: IS.white, washA: 1, w: 1.4, col: L });
  pencil([[0, -24], [0, -110]], { w: 3, col: '#5a3a1a', pass2: false }); pop();
}
function simit(x, y, r, o = {}) {                                  // симит: бублик в кунжуте
  const outer = ell(x, y, r, r * (o.flat ?? 0.8), { wash: '#b8642a', washA: 1, w: 1.8, col: IS.ink }); shadeG(outer.path, x - r, y, x + r, y, '#6a2a0a', 0.35);
  ell(x, y, r * 0.42, r * 0.34 * (o.flat ?? 0.8) / 0.8, { wash: o.hole || '#3a2a1a', washA: 1, w: 1.4, col: IS.ink });
  const rr = rng(hsh(Math.round(x), Math.round(y))); ctx.save(); ctx.fillStyle = '#f8e8b8'; for (let i = 0; i < 18; i++) { const a = rr() * 6.283, d = r * (0.55 + rr() * 0.35); ctx.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d * (o.flat ?? 0.8), 3, 2); } ctx.restore();
}
function simitCart(x, y, s, t) {                                  // красная тележка симитчи со стеклянным коробом
  push(x, y, s); const L = IS.ink;
  for (const k of [-1, 1]) { ell(k * 70, -30, 30, 30, { wash: '#2a2a2e', washA: 1, w: 2.2, col: L }); ell(k * 70, -30, 8, 8, { wash: IS.gold, washA: 1, w: 1.4, col: L }); }
  rect(-120, -150, 240, 100, { wash: IS.pom, washA: 1, w: 2.6, col: L }); rect(-110, -260, 220, 110, { wash: 'rgba(200,230,240,0.35)', washA: 1, w: 2.4, col: L });
  for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) simit(-75 + k * 50 + (j % 2) * 24, -180 - j * 26, 22, { hole: '#c8dce0' });
  pencil([[120, -140], [190, -190]], { w: 6, col: '#5a3a1a', pass2: false }); txt('SİMİT', 0, -100, 34, { col: IS.goldL, font: 'Osw' }); pop();
}
function teaGlass(x, y, s) {                                       // турецкий стакан-тюльпан с красным чаем на блюдце
  push(x, y, s); const L = IS.ink; ell(0, 0, 40, 10, { wash: IS.cob, washA: 1, w: 1.6, col: L });
  shape([[-20, -6], [-26, -40], [-14, -56], [-22, -80], [22, -80], [14, -56], [26, -40], [20, -6]], { wash: '#b8341c', washA: 0.85, w: 1.8, col: L }); pencil([[-12, -70], [-16, -30]], { w: 3, col: '#ffe0c0', a: 0.6, pass2: false }); pop();
}
function iznik(x, y, sz, seed = 1, o = {}) {                       // плитка изник: белый фон, кобальтовая рамка, тюльпан и гвоздики
  push(x, y, sz / 100); const L = IS.ink, r = rng(seed);
  rect(-50, -50, 100, 100, { wash: o.bg || IS.white, washA: 1, w: 1.6, col: L }); rect(-46, -46, 92, 92, { line: true, w: 4, col: IS.cob });
  pencil(spline([[0, 40], [-4, 10], [0, -20]], false, 6), { w: 3, col: IS.turq, pass2: false });
  blob([[0, -22], [-16, -30], [-10, -46], [0, -36], [10, -46], [16, -30]], { wash: o.flower || IS.pom, washA: 1, w: 1.4, col: L });
  for (const sd of [-1, 1]) { blob([[0, 10], [sd * 24, -2], [sd * 34, 14], [sd * 14, 20]], { wash: IS.turq, washA: 1, w: 1.2, col: L }); ell(sd * 30, 30, 8, 8, { wash: r() < 0.5 ? IS.cob : IS.pom, washA: 1, w: 1.2, col: L }); }
  for (const [cx, cy] of [[-46, -46], [46, -46], [-46, 46], [46, 46]]) ell(cx, cy, 10, 10, { wash: IS.cob, washA: 1, line: false });
  pop();
}
function tileWall(x, y, cols, rows, sz, seed = 1, o = {}) { for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) iznik(x + i * sz, y + j * sz, sz, seed + i * 7 + j * 13, { flower: (i + j) % 3 ? IS.pom : IS.cob, ...o }); }
function lampO(x, y, s, t, lit = 1, seed = 1) {                     // османская мозаичная лампа: цепочка, шар из цветного стекла
  push(x, y + Math.sin(t * 1.2 + seed) * 3, s); const L = IS.ink;
  pencil([[0, -260], [0, -40]], { w: 2.4, col: '#3a2a1a', pass2: false });
  if (lit) glow(0, 10, 110, 'rgba(255,190,110,1)', 0.32 * lit);
  const g = ell(0, 10, 44, 50, { wash: IS.goldL, washA: lit ? 0.95 : 0.4, w: 2.2, col: L });
  const r = rng(seed); ctx.save(); for (let i = 0; i < 26; i++) { const a = r() * 6.283, d = r() * 40; ctx.fillStyle = [IS.pom, IS.turq, IS.cob, '#ffd04a'][i % 4]; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(Math.cos(a) * d, 10 + Math.sin(a) * d * 1.1, 5, 0, 6.283); ctx.fill(); } ctx.restore();
  rect(-18, -48, 36, 12, { wash: IS.gold, washA: 1, w: 1.6, col: L }); poly([[-10, 58], [0, 84], [10, 58]], { wash: IS.gold, washA: 1, w: 1.4, col: L }); pop();
}
function carpet(x, y, w, h, seed = 1, o = {}) {                    // килим: красное поле, ромбы, бахрома
  const L = IS.ink, c1 = o.c1 || IS.pom, c2 = o.c2 || IS.cob;
  rect(x, y, w, h, { wash: c1, washA: 1, w: 2, col: L }); rect(x + 10, y + 10, w - 20, h - 20, { line: true, w: 5, col: IS.goldL });
  const n = Math.max(2, Math.round(w / 90)); for (let i = 0; i < n; i++) { const cx = x + (i + 0.5) * w / n, cy = y + h / 2; poly([[cx, cy - h * 0.32], [cx + w / n * 0.35, cy], [cx, cy + h * 0.32], [cx - w / n * 0.35, cy]], { wash: c2, washA: 1, w: 1.4, col: L }); ell(cx, cy, 8, 8, { wash: IS.goldL, washA: 1, line: false }); }
  for (let i = 0; i < w; i += 12) pencil([[x + i, y + h], [x + i, y + h + 14]], { w: 2, col: '#e8dcc0', pass2: false });
}
function galley(x, y, s, t, o = {}) {                               // галера: корпус, вёсла, мачта с косым парусом, вымпел
  push(x, y, s, o.rot || 0, o.flip || 1); const L = IS.ink, hc = o.hull || '#6a3a1e';
  if (!o.noOars) for (let i = 0; i < 12; i++) { const ph = Math.sin(t * 3 + i * 0.3) * 10; pencil([[-180 + i * 32, -10], [-196 + i * 32 + ph, 60]], { w: 3, col: '#5a3a1a', pass2: false }); }
  const hb = shape([[-240, -40], [250, -40], [300, -90], [260, -10], [210, 30], [-200, 30], [-250, -10]], { wash: hc, washA: 1, w: 2.6, col: L }); shadeG(hb.path, 0, -40, 0, 30, '#2a1408', 0.4);
  rect(-220, -52, 440, 14, { wash: o.trim || IS.pom, washA: 1, w: 1.6, col: L }); for (let i = 0; i < 12; i++) ell(-190 + i * 34, -46, 4, 4, { wash: IS.gold, washA: 1, line: false });
  pencil([[0, -50], [0, -340]], { w: 6, col: '#4a2a12', pass2: false }); const sw = Math.sin(t * 1.4) * 8;
  shape([[-170, -110], [10, -330], [160 + sw, -140]], { wash: o.sail || '#f0e4c8', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.15, col: '#8a7a5a', ang: 0.8 } }); pencil([[-200, -90], [40, -360]], { w: 4, col: '#4a2a12', pass2: false });
  shape([[0, -340], [70 + sw, -330], [0, -318]], { wash: o.flag || IS.pom, washA: 1, w: 1.4, col: L }); pop();
}
function chainL(pts, t, o = {}) {                                  // цепь: звенья по ломаной, провисание задаёт o.sag
  const L = IS.ink, sz = o.sz || 22; let k = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], d = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(d / (sz * 1.5))), a = Math.atan2(y1 - y0, x1 - x0);
    for (let j = 0; j < n; j++, k++) { const q = j / n, x = lerp(x0, x1, q), y = lerp(y0, y1, q); push(x, y, 1, a); if (k % 2) ell(0, 0, sz, sz * 0.36, { line: true, w: 5, col: o.col || '#3a3a40' }); else ell(0, 0, sz, sz * 0.56, { line: true, w: 5, col: o.col || '#4a4a52' }); pop(); } }
}
function coinO(x, y, r, t, o = {}) {                                // золотая монета: гурт, надпись по кругу, вспышка-блик
  push(x, y, 1, o.rot || 0); const L = IS.ink, sq = o.sq ?? 1;
  const c = ell(0, 0, r * sq, r, { wash: IS.gold, washA: 1, w: 2.4, col: IS.goldD }); metalG(c.path, -r * 0.3, -r * 0.3, r * 1.4, IS.goldL, IS.gold, IS.goldD);
  ell(0, 0, r * 0.82 * sq, r * 0.82, { line: true, w: 2, col: IS.goldD });
  if (o.txt && sq > 0.4) txt(o.txt, 0, 0, r * (o.ts || 0.32), { col: '#6a4410', font: 'Osw', a: sq });
  if (o.sub && sq > 0.4) txt(o.sub, 0, r * 0.45, r * 0.16, { col: '#6a4410', font: 'Osw', a: sq }); pop();
}

/* отмотка-дервиш: голубой купол-«плитка» вращается, Том в одежде дервиша делает ПОЛНЫЙ оборот вокруг центра тела (≈1 с),
   белый подол раскручивается спиралью; на конце — белый вихрь на весь экран (доля секунды), дальше переход прошлой эпохи */
function wTunnelIS(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), sp = sm(clamp(p / 0.72)), whirl = sm(clamp((p - 0.62) / 0.28));
  screenFill(IS.cobD, 1);
  const cx = 540, cy = 980;
  for (let k = 0; k < 9; k++) { const ph = (p * 0.9 + k / 9) % 1, z = Math.pow(ph, 2), R = 60 + z * 1500, a = Math.min(1, ph * 2.4) * (1 - ph * 0.35), rot = t * (k % 2 ? 0.9 : -0.7) + k;
    const n = 8 + k % 3 * 4; for (let i = 0; i < n; i++) { const aa = i / n * 6.283 + rot; push(cx + Math.cos(aa) * R, cy + Math.sin(aa) * R, 0.6 + z * 2.6, aa); ctx.save(); ctx.globalAlpha = a; iznik(0, 0, 80, k * 31 + i, { flower: i % 2 ? IS.pom : IS.cob }); ctx.restore(); pop(); } }
  const yrs = ['2026', '1930', '1840', '1453', '537', '330', 'VII в. до н. э.'];
  yrs.forEach((y, k) => { const ph = (p * 1.0 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.9 + p * 2; txt(y, cx + Math.cos(a) * z * 640, cy + Math.sin(a) * z * 860, 22 + z * 110, { col: IS.goldL, font: 'Osw', a: (1 - ph) * 0.85 }); });
  lightPool(cx, 1420, 420, 90, 'rgba(255,230,170,1)', 0.35); glow(cx, 640, 140, 'rgba(255,236,190,1)', 0.25);
  // спираль белого подола: рукава раскручиваются от Тома, к концу заливают кадр
  const arms = 5; for (let i = 0; i < arms; i++) { const a0 = ph0(i), pts = [];
    for (let q = 0; q <= 26; q++) { const rr = 80 + q * (24 + whirl * 90), aa = a0 + q * 0.28 - sp * 6.283 * 1.2; pts.push([cx + Math.cos(aa) * rr, cy + 120 + Math.sin(aa) * rr * 0.55]); }
    pencil(pts, { w: 40 + whirl * 240, col: IS.white, a: 0.35 + whirl * 0.65, pass2: false, gap: false }); pencil(pts, { w: 6, col: IS.goldL, a: 0.5 * (1 - whirl), pass2: false, gap: false }); }
  function ph0(i) { return i / arms * 6.283; }
  cat();
  if (whirl > 0.85) screenFill(IS.white, clamp((whirl - 0.85) / 0.15), 'source-over');
}
WORLD.tunnel = wTunnelIS;
DIR.tunnel = { outfit: 'dervish', light: { side: 1, rim: '#ffe8b0' }, grade: ['#1f4f9a', 0.08], act: () => [[S0.tunnel, 'awe'], [S0.tunnel + 0.6, 'grin']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 1.0 + 0.06 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1240 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.3], hand: [110, -470], handF: [-150, -190], tailUp: true }); },   // дервиш: правая ладонь вверх, левая вниз
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 940, 0.1], [S1.tunnel, 540, 930, 0.16]] };
