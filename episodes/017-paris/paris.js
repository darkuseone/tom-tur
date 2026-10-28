/* 017 Париж — общие детали города:
   PA — палитра; eiffel — Эйфелева башня (o.build 0..1 — растёт снизу; o.ghost — призрак «здесь будет»; o.antenna — антенна и
   волны; o.tag — бирка; o.night — огни); seine — Сена полосой с рябью и набережной; facade — османовский дом (5 этажей,
   балконы на 2-м и 5-м, мансарда цинк); oldHouse — средневековый фахверк; bastille — крепость с 8 башнями; hutGaul — хижина
   паризиев; skulls — стена из черепов и костей катакомб (стилизовано, без натурализма); truck — серый грузовик 1940 без
   символики; boatRiver — речной трамвайчик; morse — радиоволны. */

const PA = { stone: '#e2d6bc', stoneD: '#a8987a', zinc: '#7a8a9a', zincD: '#4a5868', iron: '#7a5a3a', ironD: '#3a2414', seine: '#5a8aa8', seineD: '#2e5670', gold: '#e8b84a' };

function eiffel(x, base, s, t, o = {}) {                                  // башня: 4 опоры, арки, 3 яруса, решётка, шпиль
  push(x, base, s); const b = o.build ?? 1, H = 1300, col = o.col || PA.iron, a = o.ghost ? 0.3 : 1;
  ctx.save(); ctx.globalAlpha = a; if (b < 1) { ctx.beginPath(); ctx.rect(-800, -H * b - 10, 1600, H * b + 20); ctx.clip(); }
  const L = y => { const k = -y / H; return 360 * Math.pow(1 - k, 2.2) + 14; };
  for (const sd of [-1, 1]) { const pts = []; for (let y = 0; y >= -H; y -= 40) pts.push([sd * L(y), y]); line(pts, { w: 7, col, smooth: true }); const pts2 = []; for (let y = 0; y >= -360; y -= 30) pts2.push([sd * L(y) * 0.62, y]); line(pts2, { w: 5, col, smooth: true }); }
  for (let y = -40; y > -H + 60; y -= 46) { const w = L(y), w2 = L(y - 46); pencil([[-w, y], [w2, y - 46]], { w: 1.4, col, a: 0.7, pass2: false }); pencil([[w, y], [-w2, y - 46]], { w: 1.4, col, a: 0.7, pass2: false }); }
  pencil(ellPts(0, -40, 150, 230, 0, 0, 40).filter(p => p[1] < -40), { w: 5, col, pass2: false });
  for (const [y, h] of [[-300, 30], [-640, 24], [-1080, 18]]) { const w = L(y) + 20; rect(-w, y - h, w * 2, h, { wash: o.night ? '#e8c070' : col, washA: 1, w: 2, col: PA.ironD }); }
  pencil([[0, -H], [0, -H - 70]], { w: 5, col, pass2: false });
  if (o.antenna) { pencil([[0, -H - 70], [0, -H - 180]], { w: 3, col: '#3a3a3a', pass2: false }); for (const sd of [-1, 1]) pencil([[0, -H - 170], [sd * 420, -40]], { w: 1.4, col: '#3a3a3a', a: 0.6, pass2: false }); }
  if (o.night) for (let i = 0; i < 40; i++) { const y = -60 - i * 30, w = L(y); glow((i % 2 ? -1 : 1) * w * 0.8, y, 14, 'rgba(255,220,140,1)', 0.6 * (0.6 + 0.4 * Math.sin(t * 6 + i))); }
  ctx.restore();
  if (o.tag) { push(L(-640) + 30, -660, 1, 0.1); pencil([[-30, 0], [0, 30]], { w: 2, col: '#3a3a3a', pass2: false }); rect(0, 20, 220, 80, { wash: '#f2ece0', washA: 1, w: 2.4, col: '#5a1a10' }); txt(o.tag, 110, 72, 40, { font: 'Osw', col: '#a8201e' }); pop(); }
  pop();
}
function seine(y0, t, o = {}) {                                           // Сена: вода, рябь, каменная набережная
  const h = o.h || 200; rect(-600, y0, 2300, h, { wash: o.col || PA.seine, washA: 1, w: 2, col: PA.seineD });
  const r = rng(o.seed || 17001); for (let i = 0; i < 24; i++) { const yy = y0 + 10 + r() * (h - 16), x = ((r() * 2200 + t * (20 + r() * 30)) % 2300) - 600, L = 40 + r() * 80; pencil([[x, yy], [x + L, yy]], { w: 2, col: '#f2f8fa', a: 0.5, pass2: false }); }
  if (o.quay !== false) { rect(-600, y0 - 30, 2300, 30, { wash: PA.stone, washA: 1, w: 2, col: '#5a4a34' }); rect(-600, y0 + h, 2300, 30, { wash: PA.stone, washA: 1, w: 2, col: '#5a4a34' }); }
}
function facade(x, base, w, h, t, o = {}) {                              // османовский дом: камень, балконы, мансарда
  const f = rect(x, base - h, w, h, { wash: o.col || PA.stone, washA: 1, w: 2.2, col: '#5a4a34', shade: { gap: 9, a: 0.1, col: PA.stoneD, ang: 1.5 } });
  const fl = 5, fh = h / fl, n = Math.max(2, Math.floor(w / 70));
  for (let j = 0; j < fl; j++) for (let q = 0; q < n; q++) { const wx = x + (q + 0.5) * w / n - 16, wy = base - h + j * fh + fh * 0.2; rect(wx, wy, 32, fh * 0.6, { wash: o.lit && (q + j) % 3 === 0 ? '#ffd890' : '#4a5a6a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
  for (const j of [1, 4]) pencil([[x, base - h + j * fh + fh * 0.8], [x + w, base - h + j * fh + fh * 0.8]], { w: 4, col: '#2a2a2a', pass2: false });
  poly([[x - 6, base - h], [x + w + 6, base - h], [x + w - 20, base - h - 70], [x + 20, base - h - 70]], { wash: PA.zinc, washA: 1, w: 2, col: PA.zincD }); for (let q = 0; q < n; q++) rect(x + (q + 0.5) * w / n - 12, base - h - 56, 24, 30, { wash: '#4a5a6a', washA: 1, w: 1.2, col: '#1a1a1a' });
  for (let q = 0; q < 3; q++) rect(x + 20 + q * (w - 60) / 2, base - h - 100, 20, 30, { wash: '#a8603a', washA: 1, w: 1.2, col: '#3a1a0a' });
}
function oldHouse(x, base, w, h, t, o = {}) {                            // средневековый фахверковый дом
  rect(x, base - h, w, h, { wash: o.col || '#e8dcc0', washA: 1, w: 2.2, col: '#3a2412' }); for (let q = 0; q <= 3; q++) pencil([[x + q * w / 3, base - h], [x + q * w / 3, base]], { w: 5, col: '#5a3a1e', pass2: false }); pencil([[x, base - h / 2], [x + w, base - h / 2]], { w: 5, col: '#5a3a1e', pass2: false });
  pencil([[x, base - h], [x + w / 3, base - h / 2]], { w: 3, col: '#5a3a1e', pass2: false }); poly([[x - 10, base - h], [x + w + 10, base - h], [x + w / 2, base - h - 90]], { wash: '#6a4a3a', washA: 1, w: 2, col: '#2a1408' });
}
function bastille(x, base, s, t, o = {}) {                               // Бастилия: массив стен, 8 круглых башен
  push(x, base, s); const C = '#9a9080', D = '#5a5448';
  rect(-420, -360, 840, 360, { wash: C, washA: 1, w: 2.6, col: '#2a2420', shade: { gap: 8, a: 0.18, col: D, ang: 1.4 } });
  for (const tx of [-420, -250, -80, 90, 260, 420]) { rect(tx - 50, -460, 100, 460, { wash: C, washA: 1, w: 2.4, col: '#2a2420', shade: { gap: 7, a: 0.2, col: D, ang: 1.4 } }); for (let q = 0; q < 4; q++) rect(tx - 46 + q * 26, -490, 16, 30, { wash: C, washA: 1, w: 1.4, col: '#2a2420' }); rect(tx - 8, -380, 16, 30, { wash: '#1a1a1a', washA: 1, w: 1, col: '#000' }); }
  rect(-60, -160, 120, 160, { wash: '#3a2a1a', washA: 1, w: 2, col: '#000' }); if (o.breach) { const k = o.breach; poly([[-140, -360], [-40, -360 + 200 * k], [60, -360 + 260 * k], [160, -360]], { wash: '#c8b8a0', washA: 1, w: 2, col: '#2a2420' }); }
  pop();
}
function hutGaul(x, base, s, t, o = {}) {                                // хижина паризиев: плетень, соломенная крыша, дым
  push(x, base, s); rect(-90, -90, 180, 90, { wash: '#a88458', washA: 1, w: 2, col: '#3a2412' }); for (let q = 0; q < 8; q++) pencil([[-90 + q * 25, -90], [-90 + q * 25, 0]], { w: 2, col: '#6a4424', a: 0.6, pass2: false });
  poly([[-120, -90], [120, -90], [0, -220]], { wash: '#c8a860', washA: 1, w: 2, col: '#5a4a1a' }); for (let q = 0; q < 6; q++) pencil([[-110 + q * 40, -90], [0, -210]], { w: 1.4, col: '#8a6a2a', a: 0.6, pass2: false });
  rect(-20, -60, 40, 60, { wash: '#2a1a10', washA: 1, w: 1.4, col: '#000' }); for (let q = 0; q < 4; q++) { const ph = (t * 0.4 + q / 4 + x * 0.001) % 1; ell(10 + ph * 40, -230 - ph * 160, 14 + ph * 30, 10 + ph * 24, { wash: '#c8c4bc', washA: 0.5 * (1 - ph), line: false }); }
  pop();
}
function skulls(x, y, w, h, t, o = {}) {                                 // стена катакомб: ряды костей и черепов (стилизовано)
  rect(x, y, w, h, { wash: '#4a4238', washA: 1, w: 2, col: '#1a1410' });
  for (let r = 0; r < Math.floor(h / 40); r++) { const yy = y + 20 + r * 40; if (r % 3 === 1) { for (let q = 0; q < Math.floor(w / 42); q++) { const cx = x + 21 + q * 42; ell(cx, yy, 16, 15, { wash: '#e8dcc0', washA: 1, w: 1.4, col: '#5a4a34' }); ell(cx - 6, yy - 2, 4, 5, { wash: '#3a3028', washA: 1, w: 0.6, col: '#000' }); ell(cx + 6, yy - 2, 4, 5, { wash: '#3a3028', washA: 1, w: 0.6, col: '#000' }); } }
    else for (let q = 0; q < Math.floor(w / 24); q++) ell(x + 12 + q * 24, yy, 12, 7, { wash: '#d8ccb0', washA: 1, w: 1, col: '#6a5a44' }); }
}
function truck(x, y, s, t, o = {}) {                                     // серый грузовик 1940 без символики
  push(x, y, s, 0, o.flip || 1); rect(-240, -200, 300, 150, { wash: '#6a6a62', washA: 1, w: 2.4, col: '#1a1a18' }); blob([[-250, -200], [-230, -250], [50, -250], [70, -200]], { wash: '#5a5a52', washA: 1, w: 2, col: '#1a1a18' });
  rect(60, -170, 130, 120, { wash: '#5a5a52', washA: 1, w: 2.4, col: '#1a1a18' }); rect(90, -160, 70, 50, { wash: '#8aa0b0', washA: 1, w: 1.6, col: '#1a1a18' }); for (const wx of [-170, 130]) { ell(wx, -40, 40, 40, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); ell(wx, -40, 14, 14, { wash: '#5a5a5a', washA: 1, w: 1, col: '#000' }); }
  pop();
}
function boatRiver(x, y, s, t, o = {}) {                                 // речной трамвайчик со стеклянной крышей
  push(x, y, s); shape([[-280, 0], [280, 0], [320, -50], [-300, -50]], { wash: '#f2f2f0', washA: 1, w: 2.4, col: '#2a2a32' }); rect(-220, -120, 400, 70, { wash: '#a8c8d8', washA: 0.9, w: 2, col: '#2a2a32' }); for (let q = 1; q < 8; q++) pencil([[-220 + q * 50, -120], [-220 + q * 50, -50]], { w: 2, col: '#2a2a32', pass2: false }); pop();
}
function morse(x, y, t, o = {}) {                                        // радиоволны дугами + точки-тире
  for (let q = 0; q < 4; q++) { const ph = (t * 1.2 + q / 4) % 1, R = 40 + ph * 360; for (const sd of [-1, 1]) pencil(ellPts(x, y, R, R, 0, 0, 40).filter(p => (p[0] - x) * sd > R * 0.5), { w: 4, col: o.col || '#ffd24a', a: 0.8 * (1 - ph), pass2: false }); }
}
