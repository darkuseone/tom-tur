/* 016 Барселона — общие детали города:
   BC — палитра; sagrada — Саграда Фамилия (o.done 0..1 — сколько построено: 0.15 — фасад Рождества с 4 башнями, 1 — со всеми
   башнями и центральной 172,5 м с крестом; o.cranes — краны; o.night); spire — башня-«сота» с навершием; crane — башенный кран;
   romanWall — стена Барцино с круглыми башнями и воротами; seu — готический собор (o.spire — шпиль 1913; o.scaff — леса);
   palm — пальма; tram — трамвай 1920-х; plane — силуэт бомбардировщика без опознавательных знаков; sea — Средиземное море;
   donationBox — ящик для пожертвований; plaster — гипсовая модель (o.broken — осколки). */

const BC = { stone: '#d8c4a0', stoneD: '#9a8462', sand: '#e8d4a8', sea: '#3a8ab8', seaD: '#1e5a80', terr: '#c8603a', gold: '#e8b84a', green: '#4a8a5a', night: '#1a1e40' };

function spire(x, base, h, w, t, o = {}) {                                // башня Саграды: конус-«сота» с отверстиями и навершием
  const c = o.col || BC.stone; blob([[x - w / 2, base], [x - w * 0.42, base - h * 0.6], [x - w * 0.18, base - h * 0.92], [x, base - h], [x + w * 0.18, base - h * 0.92], [x + w * 0.42, base - h * 0.6], [x + w / 2, base]], { wash: c, washA: 1, w: 2.4, col: '#4a3a24', shade: { gap: 6, a: 0.18, col: BC.stoneD, ang: 1.3 } });
  for (let q = 1; q < 7; q++) { const yy = base - h * q / 8, hw = w * (0.5 - q * 0.05); for (let k = -1; k <= 1; k += 2) ell(x + k * hw * 0.35, yy, 4, 6, { wash: '#3a2a1a', washA: 1, w: 0.8, col: '#000' }); }
  ell(x, base - h - 10, w * 0.16, w * 0.2, { wash: o.cap || '#c8302a', washA: 1, w: 2, col: '#4a0a08' }); for (let k = 0; k < 6; k++) { const a = k * 1.047; ell(x + Math.cos(a) * w * 0.14, base - h - 10 + Math.sin(a) * w * 0.14, 5, 5, { wash: '#f2ece0', washA: 1, w: 1, col: '#4a0a08' }); }
}
function crane(x, base, h, t, o = {}) {                                   // башенный кран: решётчатая мачта, стрела, груз
  pencil([[x, base], [x, base - h]], { w: 10, col: '#e8b830' }); for (let q = 0; q < h / 40; q++) pencil([[x - 5, base - q * 40], [x + 5, base - q * 40 - 40]], { w: 2, col: '#8a6a10', pass2: false });
  const a = Math.sin(t * 0.3 + x) * 0.15; push(x, base - h, 1, a); pencil([[-120, 0], [420, 0]], { w: 8, col: '#e8b830' }); pencil([[0, -60], [420, 0]], { w: 2, col: '#5a5a5a', pass2: false }); pencil([[0, -60], [-120, 0]], { w: 2, col: '#5a5a5a', pass2: false }); rect(-130, -10, 50, 40, { wash: '#8a8a8e', washA: 1, w: 1.6, col: '#2a2a2a' }); const L = 160 + Math.sin(t * 0.7 + x) * 40; pencil([[300, 0], [300, L]], { w: 1.6, col: '#3a3a3a', pass2: false }); rect(280, L, 40, 30, { wash: BC.stone, washA: 1, w: 1.6, col: '#4a3a24' }); pop();
}
function sagrada(x, base, s, t, o = {}) {                                 // Саграда: фасады, башни апостолов/евангелистов, центральная
  push(x, base, s); const d = o.done ?? 1;
  rect(-380, -300, 760, 300, { wash: BC.stone, washA: 1, w: 2.6, col: '#4a3a24', shade: { gap: 8, a: 0.14, col: BC.stoneD, ang: 1.4 } });
  for (let q = 0; q < 3; q++) { const px = -200 + q * 200; blob([[px - 60, 0], [px - 60, -150], [px - 30, -220], [px, -240], [px + 30, -220], [px + 60, -150], [px + 60, 0]], { wash: '#3a2a1a', washA: 1, w: 2.2, col: '#1a0a04' }); }
  for (let q = 0; q < 12; q++) blob([[-360 + q * 62, -300], [-340 + q * 62, -330], [-320 + q * 62, -300]], { wash: BC.green, washA: 0.9, w: 1.4, col: '#1a3a1a' });
  for (const [px, h] of [[-300, 560], [-190, 640], [190, 640], [300, 560]]) spire(px, -300, h, 90, t);              // фасад Рождества — построен при Гауди
  if (d > 0.3) for (const [px, h] of [[-90, 560], [90, 560]]) { ctx.save(); ctx.globalAlpha = clamp((d - 0.3) / 0.2); spire(px, -300, h, 80, t); ctx.restore(); }
  if (d > 0.5) for (const [px, h] of [[-160, 820], [160, 820]]) { ctx.save(); ctx.globalAlpha = clamp((d - 0.5) / 0.2); spire(px, -300, h, 110, t, { col: '#e8dcc4', cap: '#e8b84a' }); ctx.restore(); }
  if (d > 0.7) { const k = clamp((d - 0.7) / 0.3); ctx.save(); ctx.beginPath(); ctx.rect(-200, -300 - 1180 * k - 60, 400, 1180 * k + 60); ctx.clip(); spire(0, -300, 1180, 150, t, { col: '#ece4d4', cap: '#f2ece0' }); ctx.restore();
    if (k >= 1) { push(0, -300 - 1200); pencil([[0, 40], [0, -110]], { w: 18, col: '#f2ece0' }); pencil([[-55, -40], [55, -40]], { w: 18, col: '#f2ece0' }); pencil([[0, -40], [0, -40]], { w: 30, col: '#f2ece0' }); glow(0, -40, 120, 'rgba(255,250,220,1)', 0.5 + (o.night ? 0.3 : 0)); pop(); } }
  if (o.cranes) { crane(-480, 0, 1100, t); crane(460, 0, 1300, t); }
  if (o.scaff) for (let q = 0; q < 6; q++) { const lx = -360 + q * 140; pencil([[lx, 0], [lx, -300 - 200 * o.scaff]], { w: 4, col: '#8a6a3a', pass2: false }); }
  pop();
}
function romanWall(x0, x1, base, h, t, o = {}) {                          // стена Барцино: кладка, круглые башни, ворота-арка
  const g = rect(x0, base - h, x1 - x0, h, { wash: '#c8b08a', washA: 1, w: 2.4, col: '#4a3a24' }); ctx.save(); ctx.clip(g.path); for (let y = base - h; y < base; y += 26) for (let x = x0 + ((y / 26) % 2) * 24; x < x1; x += 48) rect(x, y, 46, 24, { wash: null, w: 1, col: '#8a7454', a: 0.4 }); ctx.restore();
  for (let x = x0; x < x1; x += 40) rect(x, base - h - 24, 22, 24, { wash: '#c8b08a', washA: 1, w: 1.6, col: '#4a3a24' });
  for (let x = x0 + 120; x < x1; x += 360) { rect(x - 60, base - h - 90, 120, h + 90, { wash: '#bca47e', washA: 1, w: 2.4, col: '#4a3a24', shade: { gap: 8, a: 0.15, col: '#7a6444', ang: 1.4 } }); for (let q = 0; q < 3; q++) rect(x - 50 + q * 40, base - h - 110, 22, 22, { wash: '#bca47e', washA: 1, w: 1.4, col: '#4a3a24' }); rect(x - 10, base - h - 50, 20, 34, { wash: '#2a1a10', washA: 1, w: 1, col: '#000' }); }
  if (o.gate) { const gx = o.gate; rect(gx - 70, base - 150, 140, 150, { wash: '#3a2a1a', washA: 1, w: 2, col: '#000' }); ell(gx, base - 150, 70, 50, { wash: '#3a2a1a', washA: 1, w: 2, col: '#000' }); }
}
function seu(x, base, s, t, o = {}) {                                     // готический собор: фасад, порталы, розетка, башни, шпиль
  push(x, base, s); const C = '#cfc0a2', D = '#8a7a5c';
  rect(-260, -520, 520, 520, { wash: C, washA: 1, w: 2.6, col: '#3a3020', shade: { gap: 8, a: 0.14, col: D, ang: 1.4 } });
  blob([[-90, 0], [-90, -200], [0, -300], [90, -200], [90, 0]], { wash: '#3a2a1a', washA: 1, w: 2.4, col: '#1a0a04' }); for (let q = 1; q < 4; q++) pencil(ellPts(0, -200, 90 - q * 14, 100 - q * 14, 0, 0, 30).filter(p => p[1] < -200), { w: 2, col: D, pass2: false });
  ell(0, -400, 70, 70, { wash: '#4a6a9a', washA: 1, w: 2.4, col: '#2a2a3a' }); for (let q = 0; q < 8; q++) { const a = q * 0.785; pencil([[0, -400], [Math.cos(a) * 66, -400 + Math.sin(a) * 66]], { w: 2, col: '#e8d8a0', pass2: false }); }
  for (const sx of [-1, 1]) { rect(sx * 260 - 60, -720, 120, 720, { wash: C, washA: 1, w: 2.4, col: '#3a3020' }); poly([[sx * 260 - 66, -720], [sx * 260 + 66, -720], [sx * 260, -900]], { wash: D, washA: 1, w: 2, col: '#3a3020' }); for (let q = 0; q < 6; q++) pencil([[sx * 260 - 60 + q * 2, -720 + q * 30], [sx * 260 + 60 - q * 2, -720 + q * 30]], { w: 1, col: D, a: 0.5, pass2: false }); }
  for (let q = 0; q < 9; q++) poly([[-240 + q * 60, -520], [-215 + q * 60, -580], [-190 + q * 60, -520]], { wash: C, washA: 1, w: 1.6, col: '#3a3020' });
  if (o.spire) { const k = o.spire; ctx.save(); ctx.globalAlpha = k; poly([[-60, -520], [60, -520], [0, -1050]], { wash: D, washA: 1, w: 2.4, col: '#3a3020' }); for (let q = 0; q < 8; q++) pencil([[-50 + q * 6, -560 - q * 55], [50 - q * 6, -560 - q * 55]], { w: 1.4, col: '#3a3020', a: 0.6, pass2: false }); ctx.restore(); }
  if (o.scaff) { for (let q = 0; q < 7; q++) pencil([[-300 + q * 100, 0], [-300 + q * 100, -760]], { w: 5, col: '#8a6a3a' }); for (let q = 0; q < 7; q++) pencil([[-320, -q * 110], [320, -q * 110]], { w: 4, col: '#8a6a3a', pass2: false }); }
  pop();
}
function palm(x, base, h, t, o = {}) {                                    // пальма
  const sw = Math.sin(t * 1.2 + x) * 6, tx = x + sw;
  pencil([[x, base], [x + sw * 0.4, base - h * 0.5], [tx, base - h]], { w: 12, col: '#7a5a3a' });
  for (let q = 0; q < 9; q++) { const a = -Math.PI / 2 + (q - 4) * 0.42 + Math.sin(t * 2 + q) * 0.05, L = 80 + (q % 3) * 16; line([[tx, base - h], [tx + Math.cos(a) * L * 0.6, base - h + Math.sin(a) * L * 0.5 - 6], [tx + Math.cos(a) * L, base - h + Math.sin(a) * L * 0.3 + 30]], { w: 7, col: '#3a7a3a' }); }
}
function sea(y0, t, o = {}) {                                             // Средиземное море: полоса, рябь, блики
  const h = o.h || 200; rect(-600, y0, 2300, h, { wash: o.col || BC.sea, washA: 1, w: 2, col: BC.seaD });
  const r = rng(o.seed || 16001); for (let i = 0; i < 24; i++) { const yy = y0 + 10 + r() * (h - 16), x = ((r() * 2200 + t * (20 + r() * 30)) % 2300) - 600, L = 40 + r() * 80; pencil([[x, yy], [x + L, yy]], { w: 2, col: '#f2f8fa', a: 0.5, pass2: false }); }
}
function tram(x, y, s, t, o = {}) {                                       // трамвай 1920-х: вагон, окна, пантограф, колёса
  push(x, y, s, 0, o.flip || 1);
  rect(-260, -230, 520, 200, { wash: o.col || '#3a7a4a', washA: 1, w: 3, col: '#0a1a0a' }); rect(-260, -120, 520, 60, { wash: '#e8dcc0', washA: 1, w: 2, col: '#0a1a0a' }); for (let q = 0; q < 6; q++) rect(-240 + q * 82, -210, 66, 80, { wash: '#a8c8d8', washA: 1, w: 1.6, col: '#0a1a0a' });
  rect(-280, -250, 560, 24, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); pencil([[0, -250], [-60, -330], [60, -400]], { w: 4, col: '#2a2a2a', pass2: false }); pencil([[-1200, -400], [1200, -400]], { w: 2, col: '#2a2a2a', pass2: false });
  for (const wx of [-170, -110, 110, 170]) ell(wx, -24, 26, 26, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); txt('30', 200, -150, 34, { font: 'Osw', col: '#2a1a10' });
  pop();
}
function plane(x, y, s, t, o = {}) {                                      // силуэт бомбардировщика 1930-х без опознавательных знаков
  push(x, y, s, o.rot || 0); sil([[-160, 0], [140, -10], [180, 0], [140, 12], [-150, 14]], o.col || '#2a2a32', 0.9); sil([[-20, -4], [40, -4], [10, -120], [-30, -120]], o.col || '#2a2a32', 0.9); sil([[-20, 8], [40, 8], [10, 120], [-30, 120]], o.col || '#2a2a32', 0.9); sil([[-160, 0], [-190, -40], [-170, 0]], o.col || '#2a2a32', 0.9);
  for (const py of [-60, 60]) { ell(30, py, 12, 30, { wash: '#3a3a42', washA: 0.9, line: false }); pencil([[44, py - 36], [44, py + 36]], { w: 2, col: '#8a8a92', a: 0.6 * Math.abs(Math.sin(t * 40)), pass2: false }); }
  pop();
}
function donationBox(x, base, s, t) {                                     // ящик для пожертвований: щель, монеты
  push(x, base, s); rect(-60, -160, 120, 160, { wash: '#7a4a2a', washA: 1, w: 2.6, col: '#2a1408' }); rect(-30, -150, 60, 10, { wash: '#1a0a04', washA: 1, w: 1, col: '#000' }); txt('DONATIVOS', 0, -80, 20, { font: 'Osw', col: '#e8c87a' });
  const ph = (t * 1.2) % 1; ell(0, -260 + ph * 110, 12, 12, { wash: BC.gold, washA: 1 - ph * 0.3, w: 1.6, col: '#6a4a08' }); pop();
}
function plaster(x, base, s, t, o = {}) {                                 // гипсовая модель фасада; o.broken — осколки, o.glue 0..1 — склеивают
  push(x, base, s); const br = o.broken || 0, r = rng(16010);
  for (let i = 0; i < 9; i++) { const ox = (r() - 0.5) * 300 * br, oy = r() * 100 * br, rot = (r() - 0.5) * br * 1.4, px = -120 + (i % 3) * 80, py = -60 - Math.floor(i / 3) * 80;
    push(px + ox, py + oy, 1, rot); rect(-40, -40, 80, 80, { wash: '#f2eee6', washA: 1, w: 2, col: '#8a8478' }); if (i > 5) poly([[-30, -40], [0, -100], [30, -40]], { wash: '#f2eee6', washA: 1, w: 2, col: '#8a8478' }); pop(); }
  pop();
}
