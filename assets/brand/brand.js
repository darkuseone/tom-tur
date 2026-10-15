/* ТОМ-ТУР — бренд-ассеты кодом (tools/brand.cjs): аватарка (морда Тома крупно на ярком градиенте) и баннер YouTube
   (панорама сквозь время слева направо: карбоновое море → динозавры → ледник → древность → Кремль → Париж → Нью-Йорк → небоскрёбы). */
const BRAND = {};
OUTFIT.brand = Object.assign({}, OUTFIT.puffer, { pin: null });
const ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

// ===================================================================== АВАТАРКА 1200×1200 → 800
BRAND.avatar = () => {
  const cx = 600, cy = 560;
  { const g = ctx.createRadialGradient(cx, cy - 40, 60, cx, cy, 900); [['#fff1b8', 0], ['#ffc24a', 0.18], ['#ff7a3d', 0.42], ['#e0306e', 0.68], ['#4a1f8a', 1]].forEach(([c, k]) => g.addColorStop(k, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  rays(cx, cy, 0, 6.283, 900, 'rgba(255,240,190,0.55)', 0.35, 18, 1.3);
  // кольцо-портал часов с римскими цифрами
  for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, 500 - k * 22, 500 - k * 22, 0.3 * k, 0.05, 120), { w: 9 - k * 2.5, col: ['#ffe39a', '#f1d27a', '#c99636'][k], a: 0.85, pass2: false, gap: false });
  ROMAN.forEach((s, n) => { const a = n / 12 * 6.283 - Math.PI / 2; push(cx + Math.cos(a) * 455, cy + Math.sin(a) * 455, 1, a + Math.PI / 2); txt(s, 0, 0, 44, { col: '#fff3d0', font: 'Osw', a: 0.9 }); pop(); });
  for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1), a = r() * 6.283, d = 380 + r() * 220; glow(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 6 + r() * 16, 'rgba(255,248,210,1)', 0.9); }
  glow(cx, cy, 420, 'rgba(255,230,160,1)', 0.35);
  // Том: рисуем в родном масштабе роликов (s≈1.7 на холсте 800) и увеличиваем ×1.5 — линия и пушистость как в выпусках, без «колючек»
  const T = document.createElement('canvas'); T.width = W; T.height = H;
  renderTo(T, () => tom({ t: 1.2, x: 420, y: 380 + 372 * 1.68, s: 1.68, expr: 'grin', expr2: 'grin', ek: 1, look: [0.1, 0.02], light: { side: 1, rim: '#fff0b0' }, outfit: 'brand', tilt: -0.07,
    watchInHand: true, glow: 0.9, spin: 0, hand: [128, -262], handF: [-70, -150] }));
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(T, 0, 0, 800, 800, 0, 0, 1200, 1200); ctx.restore();
};
BRAND.avatarPost = o => { const v = o.createRadialGradient(600, 600, 430, 600, 600, 850); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(40,10,40,0.45)'); o.fillStyle = v; o.fillRect(0, 0, W, H); };

// ===================================================================== БАННЕР 2560×1440 (безопасная зона 1546×423 по центру: y 508–931)
const HZ = 905;                                                      // линия горизонта — внутри безопасной зоны
function zoneSky() {                                                 // небо меняется слева направо: море → день → закат → ночь
  const g = ctx.createLinearGradient(0, 0, W, 0);
  [['#0c4f6e', 0], ['#2a8aa0', 0.12], ['#cfe6c8', 0.2], ['#f3d79a', 0.3], ['#dfe8ee', 0.36], ['#f2c27a', 0.48], ['#ef8a52', 0.6], ['#b4507a', 0.72], ['#4a2a6e', 0.84], ['#141634', 1]].forEach(([c, k]) => g.addColorStop(k, c));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const v = ctx.createLinearGradient(0, 0, 0, HZ); v.addColorStop(0, 'rgba(10,8,24,0.45)'); v.addColorStop(1, 'rgba(255,240,220,0.08)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, HZ);
  glow(1250, 760, 520, 'rgba(255,200,120,1)', 0.45);                 // закатное солнце за заголовком
  motes(160, [2000, 0, W, 700], '#fff6dc', 0, 9, { sp: 0, sz: 2.2, a: 0.8, tw: 1 });   // звёзды над небоскрёбами
}
function sea(x0, x1) {                                               // карбоновое море: толща воды, лучи, морские лилии, стетакант, гониатиты
  const p = pathOf([[x0, 0], [x1, 0], [x1 + 60, H], [x0, H]]); ctx.save(); ctx.clip(p);
  vgrad(0, H, ['#0a3550', '#0e5a74', '#1c7f8a', '#3a9a8a'], 0.9);
  for (let i = 0; i < 9; i++) { const x = x0 + 40 + i * 70; rays(x, -20, Math.PI / 2 + 0.15, 0.08, 1200, 'rgba(200,255,240,0.5)', 0.18, 2, i); }
  sil(spline([[x0, 1060], [x0 + 200, 1030], [x0 + 420, 1070], [x1 + 60, 1040], [x1 + 60, H], [x0, H]]), '#c9b07a', 0.95);
  for (let i = 0; i < 14; i++) { const r = rng(i * 13 + 5), x = x0 + 30 + i * 46 + r() * 20, h = 260 + r() * 260, sw = Math.sin(i) * 30;
    line([[x, 1060], [x + sw * 0.4, 1060 - h * 0.5], [x + sw, 1060 - h]], { w: 4, col: '#7a4a3a', a: 0.9 });
    push(x + sw, 1060 - h, 1, sw * 0.004); ell(0, 0, 14, 10, { wash: ['#e7a07a', '#d97a8a', '#f0c070'][i % 3], washA: 1, w: 2 });
    for (let a = -5; a <= 5; a++) line([[0, -4], [a * 9, -40 - Math.abs(a) * 4], [a * 14, -70 + Math.abs(a) * 2]], { w: 2.2, col: ['#e7a07a', '#d97a8a', '#f0c070'][i % 3], a: 0.95 }); pop(); }
  // стетакант (акула со «щёткой» на спине)
  push(x0 + 360, 620, 1.25, -0.06); blob([[-170, 0], [-90, -36], [40, -40], [150, -10], [190, 4], [150, 22], [30, 36], [-100, 28], [-170, 6]], { wash: '#46606e', washA: 1, w: 3, col: '#14202a', shade: { gap: 7, a: 0.25 } });
  blob([[-10, -36], [-30, -110], [30, -122], [60, -100], [40, -38]], { wash: '#2e3e48', washA: 1, w: 2.6, col: '#14202a' }); for (let k = 0; k < 9; k++) line([[-24 + k * 8, -112], [-28 + k * 9, -128]], { w: 2, col: '#14202a', smooth: false });
  poly([[-170, 2], [-240, -50], [-220, 4], [-240, 52]], { wash: '#3a505e', washA: 1, w: 2.4, col: '#14202a' }); ell(140, -6, 6, 6, { wash: '#f6f0e0', washA: 1, w: 1.6 }); pencil([[150, 12], [180, 8]], { w: 2.4, col: '#14202a', pass2: false }); pop();
  for (let i = 0; i < 4; i++) { const r = rng(i * 31), x = x0 + 80 + r() * 560, y = 400 + r() * 380, R = 26 + r() * 22; push(x, y, 1, r() * 3);   // гониатиты
    ell(0, 0, R, R, { wash: '#d9b27a', washA: 1, w: 2.4, col: '#3a2412' }); pencil(Array.from({ length: 40 }, (_, k) => { const a = k / 39 * 9, rr = R * (1 - k / 46); return [Math.cos(a) * rr, Math.sin(a) * rr]; }), { w: 1.8, col: '#5a3a1a', pass2: false }); pop(); }
  motes(90, [x0, 200, x1, 1050], 'rgba(230,255,255,0.8)', 0, 4, { sp: 0, sz: 4, a: 0.5 });
  ctx.restore();
  // волна-граница моря и суши
  line(Array.from({ length: 30 }, (_, k) => [x1 + 30 * Math.sin(k * 0.8), k * 50]), { w: 5, col: '#e8f6f4', a: 0.8 });
}
function fern(x, y, h, col) { for (let k = -3; k <= 3; k++) { const a = -Math.PI / 2 + k * 0.32, ex = x + Math.cos(a) * h, ey = y + Math.sin(a) * h * (1 - Math.abs(k) * 0.08);
  line([[x, y], [(x + ex) / 2 + k * 6, (y + ey) / 2 - 10], [ex, ey]], { w: 3, col }); for (let q = 1; q < 7; q++) { const px = lerp(x, ex, q / 7), py = lerp(y, ey, q / 7); pencil([[px, py], [px + 16, py + 10]], { w: 2, col, pass2: false }); pencil([[px, py], [px - 16, py + 10]], { w: 2, col, pass2: false }); } } }
function dinos(x0) {                                                 // юрский берег: вулкан, папоротники, зауропод и птерозавр
  sil([[x0 - 60, HZ], [x0 + 80, 760], [x0 + 120, 748], [x0 + 260, HZ]], '#7a5a4a', 0.95); for (let i = 0; i < 6; i++) glow(x0 + 100 + i * 8, 700 - i * 45, 60 + i * 14, 'rgba(120,110,110,1)', 0.35, 'source-over'); glow(x0 + 100, 752, 40, 'rgba(255,120,40,1)', 0.8);
  push(x0 + 150, HZ, 0.72); blob([[-140, -40], [-120, -120], [-40, -150], [60, -140], [120, -100], [150, -40], [100, -10], [-110, -10]], { wash: '#6e7a4a', washA: 1, w: 3, col: '#1c2010', shade: { gap: 7, a: 0.25 } });
  line([[100, -110], [170, -230], [210, -300], [250, -310]], { w: 30, col: '#6e7a4a' }); ell(258, -312, 26, 16, { wash: '#6e7a4a', washA: 1, w: 2.6, col: '#1c2010' }); ell(268, -318, 3, 3, { wash: '#111', washA: 1, w: 1 });
  line([[-130, -60], [-220, -40], [-300, -10]], { w: 18, col: '#6e7a4a' }); for (const lx of [-90, -40, 40, 90]) rect(lx - 14, -30, 28, 34, { wash: '#5e6a3e', washA: 1, w: 2.4, col: '#1c2010' }); pop();
  push(x0 + 60, 600, 1, -0.1); poly([[0, 0], [-90, -24], [-30, 4], [-90, 30]], { wash: '#8a5a3a', washA: 1, w: 2 }); poly([[0, 0], [90, -24], [30, 4], [90, 30]], { wash: '#8a5a3a', washA: 1, w: 2 }); pop();
  for (let i = 0; i < 7; i++) fern(x0 - 20 + i * 55, HZ + 10, 70 + (i % 3) * 30, i % 2 ? '#3e5a22' : '#56722e');
}
function glacier(x0, x1) {                                           // ледник: голубая стена, трещины, мамонт
  sil([[x0, HZ], [x0 + 20, 760], [x0 + 70, 730], [x0 + 120, 770], [x0 + 170, 720], [x0 + 230, 750], [x1, 735], [x1, HZ]], '#dceef6', 1);
  for (let i = 0; i < 9; i++) { const x = x0 + 25 + i * 30; pencil([[x, 760 + (i % 3) * 14], [x - 10, 820], [x + 6, 890]], { w: 2.6, col: '#6aa6cc', a: 0.8, pass2: false }); }
  hatch(pathOf([[x0, 780], [x1, 770], [x1, HZ], [x0, HZ]]), [x0, 770, x1, HZ], { gap: 9, a: 0.25, col: '#5a8fb8', ang: -0.4 });
  push(x0 + 150, HZ + 4, 0.7); blob([[-120, -20], [-120, -150], [-60, -200], [40, -210], [110, -170], [130, -90], [110, -20]], { wash: '#6a4a32', washA: 1, w: 3, col: '#20140c', shade: { gap: 6, a: 0.35 } });
  for (let k = 0; k < 30; k++) { const r = rng(k + 70); pencil([[-110 + r() * 230, -180 + r() * 150], [-114 + r() * 230, -150 + r() * 150]], { w: 2, col: '#3a2416', pass2: false }); }
  line([[110, -150], [150, -80], [140, -10]], { w: 22, col: '#5a3e2a' }); line([[100, -110], [170, -60], [200, -110]], { w: 7, col: '#f4ecd8' }); for (const lx of [-90, -40, 40, 85]) rect(lx - 16, -40, 32, 44, { wash: '#5a3e2a', washA: 1, w: 2.2 }); pop();
  motes(60, [x0, 300, x1 + 40, HZ], '#ffffff', 0, 6, { sp: 0, sz: 3, a: 0.8 });
}
function ancient(x0) {                                               // древность: пирамиды и Колизей
  poly([[x0, HZ], [x0 + 110, 720], [x0 + 220, HZ]], { wash: '#d8b070', washA: 1, w: 3, col: '#4a3010', shade: { gap: 6, a: 0.25, ang: 0.9 } });
  poly([[x0 + 150, HZ], [x0 + 230, 790], [x0 + 310, HZ]], { wash: '#c89e60', washA: 1, w: 3, col: '#4a3010', shade: { gap: 6, a: 0.3, ang: 0.9 } });
  push(x0 + 420, HZ, 1); const C = shape([[-130, 0], [-130, -150], [-110, -175], [110, -185], [130, -160], [130, 0], [-130, 0]], { wash: '#d8b890', washA: 1, w: 3, col: '#4a3010' });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { const x = -112 + c * 30, y = -38 - r * 48; blob([[x, y + 30], [x, y], [x + 10, y - 12], [x + 20, y], [x + 20, y + 30]], { wash: '#5a3e24', washA: 0.9, w: 1.6 }); } pop();
}
function kremlin(x0) {                                               // Москва: стена с «ласточкиными хвостами», Спасская, Василий Блаженный
  rect(x0 - 40, HZ - 110, 300, 110, { wash: '#a83a2a', washA: 1, w: 3, col: '#3a0e08', shade: { gap: 7, a: 0.2, ang: 0.1 } });
  for (let k = 0; k < 11; k++) poly([[x0 - 36 + k * 27, HZ - 110], [x0 - 36 + k * 27, HZ - 134], [x0 - 26 + k * 27, HZ - 124], [x0 - 16 + k * 27, HZ - 134], [x0 - 16 + k * 27, HZ - 110]], { wash: '#a83a2a', washA: 1, w: 1.6, col: '#3a0e08' });
  push(x0 + 90, HZ, 1); rect(-46, -330, 92, 330, { wash: '#b03e2c', washA: 1, w: 3, col: '#3a0e08', shade: { gap: 7, a: 0.2 } }); rect(-36, -420, 72, 90, { wash: '#b84a34', washA: 1, w: 2.6, col: '#3a0e08' });
  ell(0, -290, 26, 26, { wash: '#f4ecd8', washA: 1, w: 2.4, col: '#2a1a10' }); line([[0, -290], [0, -308]], { w: 3, col: '#111', smooth: false }); line([[0, -290], [12, -284]], { w: 3, col: '#111', smooth: false });
  poly([[-36, -420], [0, -560], [36, -420]], { wash: '#2e6a4a', washA: 1, w: 2.6, col: '#0e2a1a', shade: { gap: 5, a: 0.3 } });
  push(0, -590, 1); poly(Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 11 : 26; return [Math.cos(a) * rr, Math.sin(a) * rr]; }), { wash: '#e8203a', washA: 1, w: 2, col: '#6a0010' }); glow(0, 0, 60, 'rgba(255,60,60,1)', 0.8); pop(); pop();
  push(x0 + 230, HZ - 60, 1); rect(-70, -120, 140, 180, { wash: '#c8784a', washA: 1, w: 2.6, col: '#3a1a08' });
  [[-48, -150, 30, '#2a8a5a', '#f0d040'], [0, -220, 38, '#d8402a', '#f6e8c0'], [46, -160, 30, '#3a6ac8', '#f0d040'], [-20, -175, 22, '#f0b030', '#2a8a5a']].forEach(([x, y, r, c1, c2]) => {
    blob([[x - r, y + r * 0.6], [x - r * 1.05, y - r * 0.1], [x - r * 0.4, y - r * 0.9], [x, y - r * 1.8], [x + r * 0.4, y - r * 0.9], [x + r * 1.05, y - r * 0.1], [x + r, y + r * 0.6]], { wash: c1, washA: 1, w: 2.4, col: '#2a1a10' });
    for (let k = -1; k <= 1; k++) pencil([[x + k * r * 0.5, y + r * 0.5], [x + k * r * 0.2, y - r * 1.2]], { w: 3, col: c2, pass2: false }); line([[x, y - r * 1.8], [x, y - r * 2.4]], { w: 3, col: '#c99636', smooth: false }); }); pop();
}
function eiffel(x) {                                                 // Эйфелева башня: решётка
  push(x, HZ, 1); const L = [[-110, 0], [-40, -260], [-14, -520], [0, -640]], R = L.map(([a, b]) => [-a, b]);
  for (const P of [L, R]) line(P, { w: 6, col: '#3a2a26' }); for (let k = 0; k < 14; k++) { const y = -k * 40, w = lerp(110, 10, Math.pow(k / 14, 0.7)); pencil([[-w, y], [w, y - 40]], { w: 2, col: '#3a2a26', pass2: false }); pencil([[w, y], [-w, y - 40]], { w: 2, col: '#3a2a26', pass2: false }); }
  blob([[-80, -150], [-40, -200], [40, -200], [80, -150]], { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#3a2a26' }); rect(-56, -268, 112, 14, { wash: '#4a3a32', washA: 1, w: 2 }); rect(-28, -528, 56, 12, { wash: '#4a3a32', washA: 1, w: 2 }); pop();
}
function liberty(x) {                                                // Статуя Свободы + Бруклинский мост
  push(x + 150, HZ, 1); for (const tx of [-90, 90]) { rect(tx - 22, -300, 44, 300, { wash: '#8a6a5a', washA: 1, w: 2.6, col: '#2a1a14' }); for (const ay of [-250, -150]) blob([[tx - 12, ay + 50], [tx - 12, ay], [tx, ay - 16], [tx + 12, ay], [tx + 12, ay + 50]], { wash: '#3a2a26', washA: 1, w: 1.6 }); }
  line([[-260, -40], [-90, -290], [0, -120], [90, -290], [260, -40]], { w: 3, col: '#2a1a14' }); for (let k = -6; k <= 6; k++) pencil([[k * 30, -120 - Math.abs(Math.abs(k) - 3) * 18 - 60], [k * 30, -60]], { w: 1.4, col: '#2a1a14', a: 0.7, pass2: false }); rect(-280, -66, 560, 14, { wash: '#4a3a32', washA: 1, w: 2 }); pop();
  push(x - 60, HZ, 1); rect(-60, -110, 120, 110, { wash: '#8a7a6a', washA: 1, w: 2.6, col: '#2a2016' });
  blob([[-40, -110], [-46, -300], [-30, -360], [0, -380], [30, -360], [40, -300], [44, -110]], { wash: '#5aa391', washA: 1, w: 3, col: '#123a30', shade: { gap: 6, a: 0.3 } });
  ell(0, -400, 22, 26, { wash: '#5aa391', washA: 1, w: 2.4, col: '#123a30' }); for (let k = -3; k <= 3; k++) pencil([[k * 7, -420], [k * 14, -450]], { w: 3, col: '#5aa391', pass2: false });
  line([[30, -350], [60, -440], [70, -490]], { w: 14, col: '#5aa391' }); blob([[60, -495], [64, -530], [72, -545], [80, -530], [82, -495]], { wash: '#ffcf5a', washA: 1, w: 2, col: '#7a4a0a' }); glow(72, -530, 70, 'rgba(255,190,80,1)', 0.8); pop();
}
function skyline(x0, x1) {                                           // небоскрёбы: Эмпайр-Стейт, Москва-Сити, огни окон
  const r = rng(77); for (let x = x0; x < x1; x += 46 + r() * 30) { const w = 50 + r() * 50, top = 520 + r() * 220; sil([[x, top], [x + w, top], [x + w, HZ], [x, HZ]], '#20224a', 1); windows(x + 4, top + 8, w - 8, HZ - top - 10, Math.floor(w / 12), Math.floor((HZ - top) / 18), Math.floor(x), 0.5, '#ffd78a', '#8fd8ff', 0.85); }
  push(x0 + 120, HZ, 1); rect(-50, -400, 100, 400, { wash: '#3a3a5e', washA: 1, w: 3, col: '#0c0c20' }); rect(-34, -480, 68, 80, { wash: '#3a3a5e', washA: 1, w: 2.6, col: '#0c0c20' }); rect(-18, -540, 36, 60, { wash: '#4a4a6e', washA: 1, w: 2.4, col: '#0c0c20' }); line([[0, -540], [0, -640]], { w: 4, col: '#d8d8f0', smooth: false });
  windows(-44, -390, 88, 380, 6, 24, 5, 0.55, '#ffe0a0', '#ffe0a0', 0.9); glow(0, -560, 90, 'rgba(255,230,150,1)', 0.6); pop();
  push(x1 - 170, HZ, 1); poly([[-60, 0], [-50, -560], [-20, -640], [10, -560], [20, 0]], { wash: '#3a6a9a', washA: 1, w: 3, col: '#0a1a30' }); poly([[30, 0], [40, -470], [80, -520], [100, 0]], { wash: '#c8a050', washA: 1, w: 3, col: '#3a2a0a' });
  windows(-50, -540, 64, 530, 4, 40, 9, 0.6, '#bfe8ff', '#ffffff', 0.8); windows(42, -460, 50, 450, 3, 34, 11, 0.6, '#ffe8b0', '#ffffff', 0.8); glow(-20, -650, 30, 'rgba(255,60,60,1)', 0.9); pop();
}
BRAND.banner = () => {
  zoneSky();
  // земля по зонам: песок дна → джунгли → снег → пустыня → брусчатка → асфальт
  { const g = ctx.createLinearGradient(0, 0, W, 0); [['#c9b07a', 0.2], ['#4e6a2e', 0.3], ['#e2ecf0', 0.43], ['#c8a46a', 0.58], ['#6a4a44', 0.7], ['#2a2440', 0.82], ['#16162c', 1]].forEach(([c, k]) => g.addColorStop(k, c));
    ctx.fillStyle = g; ctx.fillRect(0, HZ, W, H - HZ); const v = ctx.createLinearGradient(0, HZ, 0, H); v.addColorStop(0, 'rgba(10,8,16,0)'); v.addColorStop(1, 'rgba(10,8,16,0.75)'); ctx.fillStyle = v; ctx.fillRect(0, HZ, W, H - HZ);
    hatch(pathOf([[640, HZ], [W, HZ], [W, H], [640, H]]), [640, HZ, W, H], { gap: 14, a: 0.16, ang: 0.08, col: '#000', seg: 120 });
    for (const [x, c] of [[1880, 'rgba(255,80,80,0.5)'], [2250, 'rgba(255,190,90,0.5)'], [2440, 'rgba(140,210,255,0.45)'], [2160, 'rgba(255,220,150,0.35)']]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const gg = ctx.createLinearGradient(0, HZ, 0, HZ + 380); gg.addColorStop(0, c); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.fillRect(x - 40, HZ, 80, 380); ctx.restore(); } }
  sea(0, 640); dinos(700); glacier(1010, 1290); ancient(1310); kremlin(1760); eiffel(2050); liberty(2250); skyline(2330, W);
  // отражения/туман у земли и линия горизонта
  vgrad(HZ, HZ + 220, ['rgba(255,240,220,0.18)', 'rgba(0,0,0,0)']); pencil([[640, HZ], [W, HZ]], { w: 4, col: '#1a120c', a: 0.8 });
  // шкала времени под горизонтом (в безопасной зоне ниже — подписи эпох)
  [['−310 млн', 330], ['−150 млн', 820], ['−20 тыс.', 1150], ['−2500', 1480], ['1495', 1860], ['1889', 2050], ['1886', 2190], ['2026', 2440]].forEach(([s, x]) => {
    ctx.save(); ctx.fillStyle = 'rgba(14,8,6,0.7)'; ctx.fillRect(x - 62, HZ - 46, 124, 34); ctx.restore(); txt(s, x, HZ - 29, 28, { col: '#f6e7c8', font: 'Osw', a: 0.95 }); });
  // заголовок по центру безопасной зоны
  { ctx.save(); ctx.translate(1280, 660); ctx.scale(1.6, 0.6); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 560); g.addColorStop(0, 'rgba(14,8,6,0.6)'); g.addColorStop(1, 'rgba(14,8,6,0)'); ctx.fillStyle = g; ctx.fillRect(-1200, -1200, 2400, 2400); ctx.restore(); }
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.font = '600 196px Osw';
  ctx.lineWidth = 34; ctx.strokeStyle = 'rgba(10,6,4,0.96)'; ctx.strokeText('ТОМ-ТУР', 1280, 650); ctx.fillStyle = '#f6ecd6'; ctx.fillText('ТОМ-ТУР', 1280, 650);
  ctx.font = '700 76px Hand'; ctx.lineWidth = 16; ctx.strokeText('история городов за минуту', 1280, 790); ctx.fillStyle = '#e8a33c'; ctx.fillText('история городов за минуту', 1280, 790); ctx.restore();
  // латунные часы — знак канала — слева от заголовка
  push(840, 660, 0.8); glow(0, 0, 160, 'rgba(255,214,120,1)', 0.55); ell(0, -104, 16, 12, { wash: '#c99636', washA: 1, w: 3, col: '#5a3a08' }); ell(0, 0, 90, 90, { wash: '#c99636', washA: 1, w: 4, col: '#5a3a08' }); ell(0, 0, 72, 72, { wash: '#f6ecd2', washA: 1, w: 2.4, col: '#7a5414' });
  ROMAN.forEach((s, n) => { const a = n / 12 * 6.283 - Math.PI / 2; txt(s, Math.cos(a) * 54, Math.sin(a) * 54, 16, { col: '#3a2a10', font: 'Osw' }); }); line([[0, 0], [0, -46]], { w: 4, col: '#20160f', smooth: false }); line([[0, 0], [-34, 18]], { w: 3, col: '#a83a2a', smooth: false }); pop();
  motes(40, [600, 450, 1960, 950], '#ffe6b0', 0, 3, { sp: 0, sz: 3, a: 0.7, add: 1 });
};
BRAND.bannerPost = o => { const v = o.createLinearGradient(0, 0, 0, H); v.addColorStop(0, 'rgba(10,8,20,0.35)'); v.addColorStop(0.3, 'rgba(0,0,0,0)'); v.addColorStop(0.7, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(10,8,20,0.4)'); o.fillStyle = v; o.fillRect(0, 0, W, H); };
