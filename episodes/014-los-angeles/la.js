/* 014 Лос-Анджелес — общие детали города:
   LA — палитра; ridge — хребет Санта-Моника с горой Ли (сквозная нить: один и тот же холм в каждой эпохе; o.sign 0..1 — буквы
   встают, o.land 0..1 — «LAND» на месте (падает при уменьшении), o.bulbs — лампочки, o.night, o.col); letters — буквы на сваях;
   palm — высокая пальма-«вашингтония»; derrick — деревянная нефтяная вышка (o.gush — фонтан нефти); adobe — глинобитный дом;
   tarPit — асфальтовая яма с пузырями; mammoth — колумбийский мамонт (o.sink — увяз); smilodon — саблезубая кошка;
   camera1911 — кинокамера на треноге с ручкой; cascade — бетонный каскад акведука (o.flow 0..1); searchlight — прожектор;
   aaGun — зенитка (o.fire); billboard — рекламный щит; star — звезда «аллеи славы». */

const LA = { sky: '#f2b878', skyD: '#d86a4a', hill: '#b8a070', hillD: '#7a6a3a', chap: '#7a8a4a', chapD: '#4a5a2a', white: '#f6f2e8', tar: '#141012', adobe: '#d8b48a', adobeD: '#9a7448', palm: '#3a6a3a', trunk: '#7a5a3a', gold: '#e8b84a' };

const SIGN_W = 'HOLLYWOOD', SIGN_L = 'LAND';
function letters(x, y, s, t, o = {}) {                                     // буквы на сваях вдоль склона
  const word = SIGN_W + (o.land > 0 ? SIGN_L : ''), n = word.length, step = 64, w0 = -(n - 1) * step / 2;
  for (let i = 0; i < n; i++) { const isL = i >= SIGN_W.length, k = isL ? o.land : clamp(((o.sign ?? 1) * n - i) / 1);
    if (k <= 0) continue; const lx = x + (w0 + i * step) * s, ly = y + (i - n / 2) * 4 * s + (isL ? (1 - k) * 260 * s : 0), rot = isL ? (1 - k) * 0.8 * (i % 2 ? 1 : -1) : 0;
    push(lx, ly, s, rot); for (const px of [-14, 14]) pencil([[px, 0], [px, 40]], { w: 3, col: '#5a5a5a', pass2: false });
    ctx.save(); ctx.globalAlpha = isL ? Math.min(1, k * 1.5) : Math.min(1, k); txt(word[i], 0, -4, 92, { font: 'Osw', col: o.night ? '#e8e4dc' : LA.white }); ctx.restore();
    if (o.bulbs) for (let q = 0; q < 4; q++) glow(0, -40 + q * 14, 9, 'rgba(255,240,180,1)', 0.3 * (0.6 + 0.4 * Math.sin(t * 8 + i + q)));
    pop(); }
}

function ridge(t, o = {}) {                                                // хребет с горой Ли — в каждой эпохе на одном месте
  const c = o.col || LA.hill, cd = o.colD || LA.hillD, base = o.base || 900;
  const g = shape([[-700, base], [-700, base - 160], [-300, base - 230], [80, base - 190], [420, base - 300], [620, base - 380], [760, base - 410], [900, base - 360], [1150, base - 260], [1500, base - 300], [1800, base - 200], [1800, base]], { wash: c, washA: 1, w: 2.4, col: cd });
  hatch(g.path, g.bb, { gap: 9, a: 0.18, col: cd, ang: -0.7, w: 1.2 });
  const r = rng(14001); for (let i = 0; i < 70; i++) { const x = -600 + r() * 2300, y = base - 30 - r() * 200; ell(x, y, 14 + r() * 16, 9 + r() * 8, { wash: o.chap || LA.chap, washA: 0.8, w: 1, col: LA.chapD, a: 0.5 }); }
  if (o.tower) { pencil([[790, base - 410], [790, base - 520]], { w: 4, col: '#5a5a5a', pass2: false }); for (let q = 0; q < 4; q++) pencil([[780, base - 420 - q * 25], [800, base - 440 - q * 25]], { w: 2, col: '#5a5a5a', pass2: false }); glow(790, base - 520, 10, 'rgba(255,60,60,1)', 0.8 * (0.5 + 0.5 * Math.sin(t * 4))); }
  if ((o.sign ?? 0) > 0) letters(600, base - 300, o.signS || 0.9, t, o);
}

function palm(x, base, h, t, o = {}) {                                     // вашингтония: тонкий ствол, шапка листьев
  const sw = Math.sin(t * 1.2 + x) * 6, tx = x + sw;
  pencil([[x, base], [x + sw * 0.4, base - h * 0.5], [tx, base - h]], { w: 10 * (o.s || 1), col: LA.trunk });
  for (let q = 0; q < 9; q++) { const a = -Math.PI / 2 + (q - 4) * 0.42 + Math.sin(t * 2 + q) * 0.05, L = (70 + (q % 3) * 14) * (o.s || 1); line([[tx, base - h], [tx + Math.cos(a) * L * 0.6, base - h + Math.sin(a) * L * 0.5 - 6], [tx + Math.cos(a) * L, base - h + Math.sin(a) * L * 0.3 + 30]], { w: 6 * (o.s || 1), col: LA.palm }); }
  ell(tx, base - h + 10, 16 * (o.s || 1), 22 * (o.s || 1), { wash: '#9a7a4a', washA: 1, w: 1.4, col: '#4a3a1a' });
}

function derrick(x, base, h, t, o = {}) {                                  // деревянная вышка: пирамида-решётка, площадка
  const w = h * 0.32;
  for (const sd of [-1, 1]) pencil([[x + sd * w / 2, base], [x + sd * w * 0.08, base - h]], { w: 5, col: '#5a3a1e' });
  for (let q = 1; q < 7; q++) { const y = base - h * q / 7, hw = lerp(w / 2, w * 0.08, q / 7), y2 = base - h * (q - 1) / 7, hw2 = lerp(w / 2, w * 0.08, (q - 1) / 7); pencil([[x - hw, y], [x + hw, y]], { w: 3, col: '#6a4424', pass2: false }); pencil([[x - hw2, y2], [x + hw, y]], { w: 2, col: '#6a4424', a: 0.8, pass2: false }); pencil([[x + hw2, y2], [x - hw, y]], { w: 2, col: '#6a4424', a: 0.8, pass2: false }); }
  rect(x - w * 0.6, base - 30, w * 1.2, 30, { wash: '#7a5430', washA: 1, w: 2, col: '#2a1408' });
  if (o.gush) { const k = o.gush; for (let q = 0; q < 14; q++) { const ph = (t * 1.4 + q / 14) % 1, a = -Math.PI / 2 + (q % 2 ? 0.3 : -0.3) * ph; ell(x + Math.cos(a) * ph * 160, base - h - Math.sin(-a) * ph * 260 * k + ph * ph * 300 * k, 18 + ph * 26, 22 + ph * 30, { wash: '#141012', washA: 0.9 * (1 - ph * 0.5), line: false }); } }
}

function adobe(x, base, w, h, t, o = {}) {                                 // глинобитный дом: плоская крыша, балки-виги, дверь
  rect(x, base - h, w, h, { wash: o.col || LA.adobe, washA: 1, w: 2.4, col: '#5a3a1a', shade: { gap: 10, a: 0.12, col: LA.adobeD, ang: 0.3, w: 1 } });
  for (let q = 0; q < Math.floor(w / 40); q++) pencil([[x + 20 + q * 40, base - h + 14], [x + 20 + q * 40, base - h + 30]], { w: 7, col: '#6a4424', pass2: false });
  rect(x + w * 0.4, base - h * 0.62, w * 0.2, h * 0.62, { wash: '#5a3a1e', washA: 1, w: 2, col: '#2a1408' }); if (w > 160) rect(x + 20, base - h * 0.62, 34, 34, { wash: '#2a1a10', washA: 1, w: 1.6, col: '#1a0a04' });
  pencil([[x - 6, base - h], [x + w + 6, base - h]], { w: 6, col: LA.adobeD, pass2: false });
}

function tarPit(x, y, w, h, t, o = {}) {                                   // асфальтовая яма: глянец, пузыри, отражения
  const g = ell(x, y, w, h, { wash: LA.tar, washA: 1, w: 3, col: '#000' }); glow(x - w * 0.3, y - h * 0.3, w * 0.4, 'rgba(160,170,200,1)', 0.15);
  const r = rng(o.seed || 14010); for (let i = 0; i < 8; i++) { const bx = x + (r() - 0.5) * w * 1.4, by = y + (r() - 0.5) * h, ph = (t * (0.5 + r() * 0.6) + r()) % 1; ell(bx, by - ph * 10, 6 + ph * 16, 4 + ph * 12, { wash: '#2a2428', washA: 1 - ph, w: 1.4, col: '#000', a: 1 - ph }); }
  for (let i = 0; i < 4; i++) pencil([[x - w * 0.6 + i * w * 0.35, y + h * 0.2], [x - w * 0.4 + i * w * 0.35, y + h * 0.2]], { w: 2, col: '#6a7088', a: 0.5, pass2: false });
}

function mammoth(x, y, s, t, o = {}) {                                     // колумбийский мамонт: горб, бивни, хобот, шерсть
  push(x, y, s, 0, o.flip || 1); const sink = o.sink || 0, tr = Math.sin(t * 2) * 0.1;
  ctx.save(); ctx.beginPath(); ctx.rect(-500, -800, 1000, 800 - sink * 140); ctx.clip();
  for (const lx of [-110, -50, 70, 130]) rect(lx - 26, -150, 52, 150, { wash: '#6a4a32', washA: 1, w: 2.4, col: '#2a1408' });
  blob([[-180, -150], [-200, -260], [-120, -360], [20, -380], [140, -340], [200, -240], [190, -150]], { wash: '#7a5236', washA: 1, w: 3, col: '#2a1408', shade: { gap: 6, a: 0.25, col: '#3a2412', ang: 1.2 } });
  blob([[140, -330], [210, -360], [270, -300], [260, -220], [200, -200]], { wash: '#6a4a30', washA: 1, w: 2.6, col: '#2a1408' }); ell(236, -300, 8, 8, { wash: '#1a0a04', washA: 1, w: 1, col: '#000' });
  line([[260, -240], [300 + Math.sin(tr) * 20, -160], [290 + tr * 60, -60]], { w: 24, col: '#6a4a30' });
  line([[230, -220], [330, -230], [380, -300], [350, -360]], { w: 14, col: '#f2ead6' });
  ctx.restore();
  if (sink > 0) { ell(0, -sink * 140 + 6, 260, 34, { wash: LA.tar, washA: 1, w: 2, col: '#000' }); }
  pop();
}

function smilodon(x, y, s, t, o = {}) {                                    // саблезубая кошка: силуэт, клыки, короткий хвост
  push(x, y, s, 0, o.flip || 1); const c = '#b8864a', d = '#5a3a1a', roar = o.roar || 0;
  for (const lx of [-70, -40, 50, 80]) rect(lx - 12, -90, 24, 90, { wash: c, washA: 1, w: 2, col: d });
  blob([[-110, -80], [-120, -150], [-40, -190], [80, -180], [120, -120], [100, -80]], { wash: c, washA: 1, w: 2.6, col: d, shade: { gap: 7, a: 0.2, col: d, ang: 1.1 } });
  blob([[90, -170], [130, -220], [200, -210], [210, -160], [170, -130], [110, -130]], { wash: c, washA: 1, w: 2.4, col: d }); ell(180, -190, 6, 5, { wash: '#2a1a08', washA: 1, w: 1, col: '#000' });
  for (const kx of [170, 190]) pencil([[kx, -150], [kx + 4, -100 - roar * 10]], { w: 6, col: '#f6f0e0', pass2: false });
  pencil([[-118, -140], [-150, -150]], { w: 10, col: c, pass2: false }); for (const ex of [130, 150]) poly([[ex, -205], [ex + 10, -232], [ex + 18, -205]], { wash: c, washA: 1, w: 1.6, col: d });
  pop();
}

function camera1911(x, y, s, t, o = {}) {                                  // кинокамера: ящик, две бобины, ручка, тренога
  push(x, y, s, 0, o.flip || 1);
  for (const lx of [-60, 0, 60]) pencil([[0, -170], [lx, 0]], { w: 5, col: '#5a3a1e', pass2: false });
  rect(-60, -260, 120, 90, { wash: '#4a3020', washA: 1, w: 2.4, col: '#1a0a04' }); for (const bx of [-30, 30]) { ell(bx, -290, 34, 34, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); push(bx, -290, 1, t * (o.crank ? 6 : 0)); pencil([[-28, 0], [28, 0]], { w: 3, col: '#8a8a8a', pass2: false }); pop(); }
  rect(60, -235, 40, 40, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); ell(104, -215, 14, 18, { wash: '#6a8aa8', washA: 1, w: 1.6, col: '#000' });
  const a = o.crank ? t * 8 : 0; pencil([[-60, -215], [-60 + Math.cos(a) * 30, -215 + Math.sin(a) * 30]], { w: 4, col: '#c8a040', pass2: false });
  pop();
}

function cascade(x, base, s, t, o = {}) {                                  // каскад акведука: бетонные ступени, вода
  push(x, base, s); const f = o.flow ?? 1;
  for (let q = 0; q < 8; q++) { const yy = -q * 70, xx = q * 40; rect(-160 + xx, yy - 70, 320, 70, { wash: '#c8c2b4', washA: 1, w: 2, col: '#4a4438' }); }
  if (f > 0) { const g = ctx.createLinearGradient(0, -560, 0, 0); g.addColorStop(0, 'rgba(120,180,220,0.95)'); g.addColorStop(1, 'rgba(180,220,240,0.95)'); ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-60 + 280, -560); ctx.lineTo(60 + 280, -560); ctx.lineTo(60, 0); ctx.lineTo(-60, 0); ctx.closePath(); ctx.globalAlpha = f; ctx.fill(); ctx.restore();
    for (let q = 0; q < 14; q++) { const ph = (t * 1.6 + q / 14) % 1; pencil([[280 - ph * 280 - 40, -560 + ph * 560], [280 - ph * 280 - 10, -540 + ph * 560]], { w: 3, col: '#f2faff', a: f * 0.8, pass2: false }); }
    for (let q = 0; q < 6; q++) ell(-40 + q * 16, -10, 30 + q * 4, 14, { wash: '#f2faff', washA: 0.6 * f, line: false }); }
  pop();
}

function searchlight(x, y, ang, t, o = {}) {                               // прожектор: луч в небо
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const L = 2200, sp = 0.05; const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * L, y + Math.sin(ang) * L); g.addColorStop(0, 'rgba(255,250,220,0.55)'); g.addColorStop(1, 'rgba(255,250,220,0)'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - sp) * L, y + Math.sin(ang - sp) * L); ctx.lineTo(x + Math.cos(ang + sp) * L, y + Math.sin(ang + sp) * L); ctx.closePath(); ctx.fill(); ctx.restore();
  ell(x, y, 24, 18, { wash: '#4a4a4e', washA: 1, w: 2, col: '#000' });
}

function aaGun(x, y, s, t, o = {}) {                                       // зенитка: тумба, ствол вверх, вспышки
  push(x, y, s, 0, o.flip || 1); const rec = o.fire ? Math.max(0, Math.sin(t * 9 + (o.k || 0))) : 0;
  poly([[-90, 0], [90, 0], [50, -60], [-50, -60]], { wash: '#4a5a3a', washA: 1, w: 2.4, col: '#1a2010' }); ell(0, -70, 50, 30, { wash: '#5a6a4a', washA: 1, w: 2.4, col: '#1a2010' });
  push(0, -80, 1, -0.9); rect(-12, -220 + rec * 20, 24, 220, { wash: '#3a4a2e', washA: 1, w: 2, col: '#0a1004' }); if (rec > 0.85) { glow(0, -230, 90, 'rgba(255,200,90,1)', 0.9); ell(0, -250, 30, 50, { wash: '#ffe0a0', washA: 0.9, line: false }); } pop();
  pop();
}

function billboard(x, base, s, t, lines, o = {}) {                         // рекламный щит на двух ногах
  push(x, base, s); for (const px of [-160, 160]) pencil([[px, 0], [px, -200]], { w: 10, col: '#5a3a1e' });
  rect(-260, -380, 520, 200, { wash: o.col || '#f2e6c8', washA: 1, w: 3, col: '#3a2412' }); lines.forEach((L, i) => txt(L, 0, -330 + i * 56, i === 0 ? 50 : 34, { font: 'Osw', col: i === 0 ? '#a8201e' : '#2a1a10' }));
  pop();
}

function star(x, y, s, label) {                                            // звезда «аллеи славы» на тротуаре
  push(x, y, s); rect(-80, -50, 160, 100, { wash: '#3a2a2e', washA: 1, w: 2, col: '#1a0a0e' });
  const P = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 38; P.push([Math.cos(a) * r, Math.sin(a) * r * 0.55 - 4]); } poly(P, { wash: '#e89aa8', washA: 1, w: 2, col: '#8a4a5a' });
  if (label) txt(label, 0, 34, 14, { font: 'Osw', col: '#e8c87a' }); pop();
}
function cart(x, y, s, t, k = 0, o = {}) {                                 // повозка переселенцев: колёса, тент, сундуки, волы
  push(x, y, s, 0, o.flip || 1); const bob = Math.sin(t * 4 + k) * 3;
  for (const wx of [-120, 110]) { ell(wx, -60, 60, 60, { wash: '#7a5430', washA: 1, w: 3, col: '#2a1408' }); for (let q = 0; q < 6; q++) { const an = q * 1.047 + t * 1.5; pencil([[wx, -60], [wx + Math.cos(an) * 56, -60 + Math.sin(an) * 56]], { w: 3, col: '#4a2e14', pass2: false }); } }
  rect(-180, -150 + bob, 360, 60, { wash: '#8a6438', washA: 1, w: 2.4, col: '#2a1408' });
  blob([[-170, -150 + bob], [-160, -270 + bob], [0, -300 + bob], [160, -270 + bob], [170, -150 + bob]], { wash: o.tent || '#e8dcc0', washA: 1, w: 2, col: '#5a4a2a' }); for (let q = 1; q < 4; q++) pencil([[-170 + q * 85, -150 + bob], [-160 + q * 80, -285 + bob]], { w: 2, col: '#8a7a5a', pass2: false });
  push(290, 0); blob([[-80, -60], [-90, -140], [-40, -170], [80, -160], [110, -110], [100, -60]], { wash: '#8a6a4a', washA: 1, w: 2.4, col: '#2a1408' }); for (const lx of [-60, -20, 50, 90]) pencil([[lx, -70], [lx + Math.sin(t * 4 + lx) * 8, 0]], { w: 8, col: '#5a3a1a' }); ell(120, -140, 34, 26, { wash: '#8a6a4a', washA: 1, w: 2, col: '#2a1408' }); pencil([[110, -164], [96, -196]], { w: 4, col: '#e8dcc0', pass2: false }); pencil([[134, -164], [150, -196]], { w: 4, col: '#e8dcc0', pass2: false }); pop();
  pencil([[180, -120], [230, -110]], { w: 5, col: '#5a3a1a', pass2: false });
  pop();
}
