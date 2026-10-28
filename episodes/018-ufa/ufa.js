/* 018 Уфа — общие детали города:
   UF — палитра; belaya — река Белая (o.ice — зимний лёд); hillUfa — высокий берег-холм (сквозная нить: на нём крепость, город,
   в финале — Салават); rink — хоккейная площадка (лёд, борта, разметка, ворота); jersey — свитер «САЛАВАТ» с номером; puck —
   шайба; stockade — деревянная крепость с башнями; horse — конь (o.rear — на дыбах); rider — всадник-башкир (лук, колчан);
   salavatStatue — конный памятник (тёмная бронза, всадник с плетью, конь на дыбах, гранитный постамент); stage — сцена театра
   с занавесом и рампой; engine — авиамотор V12; train — вагоны поезда; kurai — курай (флейта). */

const UF = { river: '#4a8aa8', riverD: '#245a74', ice: '#dceaf2', iceD: '#9ab8c8', hill: '#7a9a5a', hillD: '#3a5a2a', wood: '#8a6438', woodD: '#3a2412', bronze: '#6a6048', bronzeL: '#9a8e70', granite: '#8a7a74', green: '#2a7a4a', gold: '#e8b84a' };

function belaya(y0, t, o = {}) {                                          // река Белая полосой; зимой — лёд со снегом
  const h = o.h || 200; rect(-600, y0, 2300, h, { wash: o.ice ? UF.ice : UF.river, washA: 1, w: 2, col: o.ice ? UF.iceD : UF.riverD });
  const r = rng(o.seed || 18001); if (!o.ice) for (let i = 0; i < 22; i++) { const yy = y0 + 10 + r() * (h - 16), x = ((r() * 2200 + t * (20 + r() * 30)) % 2300) - 600, L = 40 + r() * 80; pencil([[x, yy], [x + L, yy]], { w: 2, col: '#f2f8fa', a: 0.5, pass2: false }); }
  else for (let i = 0; i < 14; i++) pencil([[r() * 2200 - 600, y0 + r() * h], [r() * 2200 - 600, y0 + r() * h]], { w: 1.4, col: '#ffffff', a: 0.6, pass2: false });
}
function hillUfa(x, base, s, t, o = {}) {                                 // высокий берег над Белой
  push(x, base, s); const g = shape([[-900, 0], [-700, -180], [-300, -330], [100, -380], [500, -320], [900, -150], [1100, 0]], { wash: o.snow ? '#eef2f4' : UF.hill, washA: 1, w: 2.4, col: o.snow ? '#9aa8b0' : UF.hillD }); hatch(g.path, g.bb, { gap: 9, a: 0.16, col: o.snow ? '#9aa8b0' : UF.hillD, ang: -0.6, w: 1.2 });
  if (!o.snow) { const r = rng(18010); for (let i = 0; i < 26; i++) { const tx = -700 + r() * 1700, ty = -40 - r() * 260 * (1 - Math.abs(tx - 100) / 1200); ell(tx, ty, 26, 20, { wash: '#4a7a3a', washA: 1, w: 1.2, col: '#1a3a1a' }); } }
  pop();
}
function rink(t, o = {}) {                                                // хоккейная площадка
  rect(-600, 1180, 2300, 300, { wash: '#eaf4fa', washA: 1, w: 2, col: '#8aa8b8' }); pencil([[-600, 1330], [1700, 1330]], { w: 8, col: '#c8302a', a: 0.7, pass2: false }); for (const bx of [-100, 1200]) pencil([[bx, 1180], [bx, 1480]], { w: 6, col: '#2a5aa8', a: 0.6, pass2: false });
  ell(560, 1330, 120, 40, { wash: null, w: 4, col: '#2a5aa8', a: 0.6 }); rect(-600, 1130, 2300, 50, { wash: '#f2f2f2', washA: 1, w: 2, col: '#3a3a3a' }); pencil([[-600, 1150], [1700, 1150]], { w: 6, col: '#e8b830', pass2: false });
  push(1260, 1330, 0.7); rect(-90, -110, 180, 110, { wash: null, w: 8, col: '#c8302a' }); for (let q = 1; q < 6; q++) pencil([[-90 + q * 30, -110], [-90 + q * 30, 0]], { w: 1.4, col: '#e8e8e8', pass2: false }); pop();
}
function stands(t, o = {}) {                                              // трибуны с болельщиками
  for (let r = 0; r < 4; r++) { rect(-600, 820 + r * 80, 2300, 80, { wash: ['#3a4a6a', '#2a3a5a', '#3a4a6a', '#2a3a5a'][r], washA: 1, w: 1.4, col: '#1a1a2a' }); const rr = rng(18020 + r); for (let i = 0; i < 40; i++) { const x = -560 + i * 58 + rr() * 20, y = 860 + r * 80, j = o.cheer ? Math.abs(Math.sin(t * 6 + i + r)) * 10 : 0; ell(x, y - 18 - j, 12, 13, { wash: ['#e8c8a8', '#c89878', '#f0d8c0'][i % 3], washA: 1, w: 1, col: '#3a2a1a' }); rect(x - 14, y - 6 - j, 28, 30, { wash: i % 3 ? UF.green : '#f2f2f2', washA: 1, w: 1, col: '#1a1a1a' }); } }
}
function jersey(x, y, s, t, o = {}) {                                     // свитер «САЛАВАТ» с номером
  push(x, y, s, o.rot || 0); blob([[-120, -160], [-60, -190], [60, -190], [120, -160], [200, -80], [150, -40], [100, -90], [100, 120], [-100, 120], [-100, -90], [-150, -40], [-200, -80]], { wash: UF.green, washA: 1, w: 3, col: '#0a2a1a' });
  pencil([[-100, 70], [100, 70]], { w: 10, col: '#f2f2f2', pass2: false }); pencil([[-100, 90], [100, 90]], { w: 6, col: UF.gold, pass2: false }); txt(o.name || 'САЛАВАТ', 0, -100, 30, { font: 'Osw', col: '#f2f2f2' }); txt(o.num || '1', 0, 10, 110, { font: 'Osw', col: '#f2f2f2' }); pop();
}
function puck(x, y, s) { push(x, y, s); ell(0, 0, 40, 14, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); rect(-40, -20, 80, 20, { wash: '#1a1a1e', washA: 1, w: 0, col: '#000' }); ell(0, -20, 40, 14, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); pop(); }
function stockade(x, base, s, t, o = {}) {                                // деревянная крепость: частокол, башни с шатрами
  push(x, base, s); const b = o.build ?? 1;
  for (let px = -420; px <= 420; px += 24) { const h = 160 * clamp((b * 900 - (px + 420)) / 60); if (h <= 0) continue; rect(px - 11, -h, 22, h, { wash: UF.wood, washA: 1, w: 1.4, col: UF.woodD }); poly([[px - 11, -h], [px + 11, -h], [px, -h - 16]], { wash: UF.wood, washA: 1, w: 1.2, col: UF.woodD }); }
  for (const tx of [-420, 0, 420]) { if (b < (tx + 420) / 900) continue; rect(tx - 50, -260, 100, 260, { wash: '#9a7040', washA: 1, w: 2.2, col: UF.woodD }); for (let q = 1; q < 8; q++) pencil([[tx - 50, -260 + q * 32], [tx + 50, -260 + q * 32]], { w: 1.4, col: UF.woodD, a: 0.6, pass2: false }); poly([[tx - 66, -260], [tx + 66, -260], [tx, -380]], { wash: '#5a7a4a', washA: 1, w: 2, col: '#1a2a14' }); rect(tx - 10, -210, 20, 26, { wash: '#1a1208', washA: 1, w: 1, col: '#000' }); }
  if (o.church) { push(200, -160); rect(-40, -120, 80, 120, { wash: '#9a7040', washA: 1, w: 2, col: UF.woodD }); poly([[-50, -120], [50, -120], [0, -230]], { wash: '#5a6a7a', washA: 1, w: 2, col: '#1a2a3a' }); pencil([[0, -230], [0, -270]], { w: 3, col: UF.gold, pass2: false }); pencil([[-12, -256], [12, -256]], { w: 3, col: UF.gold, pass2: false }); pop(); }
  pop();
}
function horse(x, y, s, t, o = {}) {                                      // конь: корпус, шея, голова, грива, ноги (o.rear — на дыбах)
  push(x, y, s, o.rear ? -0.45 : 0, o.flip || 1); const c = o.col || '#6a4424', d = o.colD || '#2a1408', gait = Math.sin(t * (o.run ? 9 : 0));
  blob([[-150, -150], [-160, -220], [-60, -250], [90, -240], [150, -200], [140, -150], [40, -130], [-80, -130]], { wash: c, washA: 1, w: 2.6, col: d });
  blob([[110, -220], [150, -320], [190, -360], [240, -350], [250, -310], [200, -290], [170, -210]], { wash: c, washA: 1, w: 2.4, col: d }); for (let q = 0; q < 5; q++) pencil([[150 + q * 8, -330 + q * 20], [130 + q * 6, -310 + q * 22]], { w: 4, col: o.mane || '#1a0e08', pass2: false });
  pencil([[-150, -200], [-210, -150 + gait * 10]], { w: 12, col: o.mane || '#1a0e08' });
  const legs = o.rear ? [[-120, -140, -140, 0], [-80, -140, -60, 0], [90, -160, 170, -260], [130, -160, 210, -240]] : [[-120, -140, -130 + gait * 20, 0], [-80, -140, -70 - gait * 20, 0], [90, -150, 100 - gait * 20, 0], [130, -150, 140 + gait * 20, 0]];
  for (const [x0, y0, x1, y1] of legs) pencil([[x0, y0], [x1, y1]], { w: 14, col: c });
  pop();
}
function rider(x, y, s, t, o = {}) {                                      // всадник: конь + человек сверху (лук/плеть)
  horse(x, y, s, t, o); human(x + (o.flip === -1 ? 10 : -10) * s, y - 230 * s, s * 0.85, t, { body: o.body || '#2a4a6a', legs: '#3a2a1a', hair: '#1a1410', hat: o.hat || 'fur', hatCol: o.hatCol || '#3a2a1a', face: o.face || 'calm', armR: o.armR || 'up', armL: 'hold', prop: o.prop, seed: o.seed || 18030, flip: o.flip || 1 });
}
function salavatStatue(x, base, s, t, o = {}) {                           // конный памятник: гранитный постамент, всадник с плетью
  push(x, base, s); const k = o.rise ?? 1;
  rect(-260, -260, 520, 260, { wash: UF.granite, washA: 1, w: 3, col: '#3a3030', shade: { gap: 8, a: 0.2, col: '#5a4a44', ang: 1.3 } }); rect(-290, -40, 580, 40, { wash: '#7a6a64', washA: 1, w: 2, col: '#3a3030' }); txt('САЛАВАТ ЮЛАЕВ', 0, -130, 40, { font: 'Osw', col: '#e8dcc0' });
  ctx.save(); ctx.beginPath(); ctx.rect(-600, -260 - 640 * k, 1200, 640 * k + 4); ctx.clip();
  push(0, -260, 1.0); const B = UF.bronze, D = '#2a2618', L = (pts, w) => line(pts, { w, col: B }), O = (pts, w) => line(pts, { w: w + 6, col: D });
  const hindA = [[-120, -200], [-100, -80], [-130, 0]], hindB = [[-70, -190], [-40, -90], [-60, 0]], foreA = [[90, -340], [180, -310], [175, -230]], foreB = [[60, -320], [150, -265], [140, -200]], tail = [[-175, -235], [-250, -160], [-235, -70]];
  for (const p of [hindA, hindB, foreA, foreB]) O(p, 26); O(tail, 18); for (const p of [hindA, hindB, foreA, foreB]) L(p, 26); L(tail, 18);
  ell(-30, -270, 175, 82, { rot: -0.55, wash: B, washA: 1, w: 3, col: D, shade: { gap: 6, a: 0.25, col: D, ang: 1.2 } });
  O([[90, -350], [140, -470]], 62); L([[90, -350], [140, -470]], 62); ell(178, -488, 54, 28, { rot: 0.45, wash: B, washA: 1, w: 3, col: D }); for (let q = 0; q < 5; q++) pencil([[100 + q * 9, -360 - q * 22], [80 + q * 8, -350 - q * 22]], { w: 5, col: D, pass2: false });
  O([[10, -340], [65, -300], [70, -240]], 22); L([[10, -340], [65, -300], [70, -240]], 22);
  blob([[-40, -330], [-60, -420], [-20, -470], [40, -470], [50, -400], [40, -330]], { wash: B, washA: 1, w: 3, col: D }); blob([[-40, -440], [-110, -380], [-140, -300], [-60, -330]], { wash: '#5a5240', washA: 1, w: 2.4, col: D });
  ell(12, -500, 28, 30, { wash: B, washA: 1, w: 3, col: D }); blob([[-20, -520], [-14, -556], [38, -556], [44, -520]], { wash: '#5a5240', washA: 1, w: 2.4, col: D });
  O([[30, -455], [95, -530], [145, -600]], 18); L([[30, -455], [95, -530], [145, -600]], 18); line([[145, -600], [215, -575], [255, -505]], { w: 4, col: D });
  glow(60, -420, 180, 'rgba(255,240,200,1)', 0.12); pop();
  ctx.restore(); glow(-60, -900 * k, 160, 'rgba(255,230,180,1)', 0.15 * k);
  pop();
}
function stage(x, base, s, t, o = {}) {                                   // сцена театра: портал, занавес, рампа, кулисы
  push(x, base, s); rect(-520, -620, 1040, 620, { wash: '#5a1e1a', washA: 1, w: 3, col: '#1a0604' }); rect(-440, -540, 880, 540, { wash: o.lit ? '#e8c890' : '#3a2a20', washA: 1, w: 2, col: '#1a0604' });
  const op = o.open ?? 1; for (const sd of [-1, 1]) { const w = 440 * (1 - op * 0.75); blob([[sd * 440, -540], [sd * (440 - w), -540], [sd * (440 - w * 0.9), 0], [sd * 440, 0]], { wash: '#a81e1e', washA: 1, w: 2, col: '#4a0604' }); for (let q = 1; q < 6; q++) pencil([[sd * (440 - w * q / 6), -540], [sd * (440 - w * q / 6 * 0.9), 0]], { w: 2, col: '#6a0a08', a: 0.6, pass2: false }); }
  rect(-520, -680, 1040, 60, { wash: '#c8963a', washA: 1, w: 2, col: '#4a3008' }); for (let q = 0; q < 10; q++) glow(-450 + q * 100, -10, 40, 'rgba(255,220,140,1)', 0.6);
  pop();
}
function engine(x, y, s, t, o = {}) {                                     // авиамотор V12: блок, цилиндры, винт
  push(x, y, s); rect(-200, -90, 400, 90, { wash: '#7a7a80', washA: 1, w: 2.4, col: '#1a1a1e' }); for (let q = 0; q < 6; q++) { for (const sd of [-1, 1]) { push(-160 + q * 64, -90, 1, sd * 0.4); rect(-22, -80, 44, 80, { wash: '#9a9aa0', washA: 1, w: 1.6, col: '#1a1a1e' }); for (let z = 0; z < 5; z++) pencil([[-22, -70 + z * 14], [22, -70 + z * 14]], { w: 1.2, col: '#3a3a3e', pass2: false }); pop(); } }
  ell(240, -45, 30, 30, { wash: '#4a4a4e', washA: 1, w: 2, col: '#000' }); if (o.prop !== false) { const a = t * (o.spin || 0); push(270, -45, 1, a); for (let q = 0; q < 3; q++) { push(0, 0, 1, q * 2.094); blob([[0, -8], [10, -120], [0, -150], [-10, -120]], { wash: '#5a3a1e', washA: 1, w: 1.6, col: '#1a0a04' }); pop(); } pop(); }
  pop();
}
function train(x, y, s, t, o = {}) {                                      // зелёные вагоны поезда
  push(x, y, s); for (let q = 0; q < (o.n || 3); q++) { const vx = q * 420; rect(vx, -200, 400, 170, { wash: '#3a6a4a', washA: 1, w: 2.4, col: '#0a1a0e' }); for (let w = 0; w < 6; w++) rect(vx + 20 + w * 64, -170, 44, 54, { wash: o.lit ? '#ffe0a0' : '#a8c8d8', washA: 1, w: 1.4, col: '#0a1a0e' }); for (const wx of [60, 340]) { ell(vx + wx, -20, 24, 24, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); } } pop();
}
function kurai(x, y, s, rot = 0.6) { push(x, y, s, rot); pencil([[0, 0], [0, -180]], { w: 10, col: '#c8a868' }); for (let q = 0; q < 4; q++) ell(0, -40 - q * 30, 3, 4, { wash: '#3a2a10', washA: 1, w: 0.5, col: '#000' }); pop(); }
