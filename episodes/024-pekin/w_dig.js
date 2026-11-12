/* 024 — сцена `dig`: 1969, ТАЙНА 2 — под городом. Ночной двор хутуна: серые черепичные крыши, красная дверь с парными надписями,
   велосипеды, гора капусты, угольные брикеты, репродуктор, кумач «深挖洞» («рой тоннели глубже»), соседи с лопатами и корзинами.
   Вдали под луной — угловая башня дворца (тот самый «не только дворец»). Посреди двора — шурф с воротом, из него бьёт тёплый свет.
   Том с лопатой подходит к краю, втыкает лопату — край обваливается, он падает в шурф (камера проваливается следом) и приземляется
   в сводчатом тоннеле: на «вырыли город» по цепочке зажигаются лампы; на «войны» — красный проблесковый фонарь и сирена; на «СССР» — карточка.
   Главный свет: наверху — свет из шурфа (холодная луна вторым), внизу — гирлянда ламп. Переход В сцену — пролетающий бумажный фонарь. */
(() => {
  EV.dg_point = wtk('s2', 'дворец');
  EV.dg_dig = wtk('s2', 'верхушка');
  EV.dg_fall = wtk('s2', 'Пекином');
  EV.dg_land = EV.dg_fall + 0.5;
  EV.dg_lights = wtk('s2', 'вырыли');
  EV.dg_siren = wtk('s2', 'войны');
  EV.dg_ussr = wtk('s2', 'СССР.');
  KEYW.push('дворец.', 'город.', 'СССР.');
  SHAKES.push([EV.dg_dig, 0.2, 7], [EV.dg_land, 0.3, 13]);
  const L = BJ.ink, PX = 720, TY = 2010, FY = 2400;                 // шурф по x; свод и пол тоннеля
  function sky(t) { vgrad(-900, 1400, ['#060a20', '#101a48', '#2a3a6a', '#4a4a6a'], 1); starsBJ(t, 110, [-300, -200, 1400, 900], 2480);
    glow(260, 330, 360, 'rgba(200,220,255,1)', 0.55); ell(260, 330, 70, 70, { wash: '#f0f0e0', washA: 1, w: 1.4, col: '#a8a8a0', a: 0.5 }); ell(240, 316, 16, 13, { wash: '#d0d0c0', washA: 0.7, line: false });
    cloudsBJ(t, 380, 4, '#3a4a7a', 2481, 0.6, 6); }
  function far(t) {                                                 // дворец вдали: стена, угловая башня, пагода на холме
    hills(900, 120, '#141c40', 1.3, 1); for (let i = 0; i < 4; i++) roofCN(900, 690 - i * 40, 130 - i * 22, 28, { sil: '#0e1434', ev: 18 }); sil([[876, 820], [876, 560], [924, 560], [924, 820]], '#0e1434', 1);
    rect(-300, 880, 1700, 120, { wash: '#2a1430', washA: 1, w: 1.6, col: '#0a0818' }); hallCN(420, 890, 230, 90, { bays: 3, rh: 80, tiers: 1, wall: '#3a1a34', roof: { col: '#4a4460', colD: '#1a1830', ev: 30, shade: false }, glowIn: 0.25 });
    if (t > EV.dg_point && t < EV.dg_dig + 0.4) { const q = popK(t, EV.dg_point, 0.3); pencil(ellPts(420, 800, 190 * q, 150 * q, 0, 0, 30), { w: 5, col: '#ffd24a', a: 0.9, pass2: false }); txt('лишь верхушка', 660, 660, 46, { col: '#ffe8a8', font: 'Hand', rot: -0.06, a: q }); }
    depthFog('#1a2458', 0.25); }
  function house(x, y, w, h, t, o = {}) {                           // дом хутуна: серый кирпич, серая черепица, окна-решётки, красная дверь
    rect(x - w / 2, y - h, w, h, { wash: '#5a5c66', washA: 1, w: 2.4, col: L, shade: { gap: 18, a: 0.2, col: '#1a1c24', ang: 0.05 } });
    for (let j = 1; j < 6; j++) pencil([[x - w / 2, y - h * j / 6], [x + w / 2, y - h * j / 6]], { w: 1, col: '#2a2c34', a: 0.5, pass2: false });
    const n = o.win || 2; for (let i = 0; i < n; i++) { const wx = x - w / 2 + w * (i + 0.5) / n - 50; rect(wx, y - h * 0.72, 100, h * 0.4, { wash: o.dark ? '#1a1c28' : '#e8a84a', washA: 1, w: 2, col: L }); if (!o.dark) glow(wx + 50, y - h * 0.52, 130, 'rgba(255,180,90,1)', 0.4 * flick(t, i)); latticeBJ(wx, y - h * 0.72, 100, h * 0.4, '#3a2014', 0.9, 3); }
    roofCN(x, y - h + 6, w + 30, o.rh || 90, { col: '#4a4c58', colD: '#1e2028', ev: 30, orn: '#2a2c34' });
    if (o.door) { const dx = x + o.door; rect(dx - 44, y - 190, 88, 190, { wash: BJ.red, washA: 1, w: 2.4, col: L }); pencil([[dx, y - 190], [dx, y]], { w: 2, col: BJ.redD, pass2: false }); for (const k of [-1, 1]) { rect(dx + k * 62 - 14, y - 180, 28, 150, { wash: '#c82a1a', washA: 1, w: 1.4, col: L }); hzV(k < 0 ? '备战' : '备荒', dx + k * 62, y - 150, 26, '#ffe0a0', 0.9); } ell(dx - 12, y - 96, 5, 5, { wash: BJ.gold, washA: 1, line: false }); ell(dx + 12, y - 96, 5, 5, { wash: BJ.gold, washA: 1, line: false }); }
    if (o.chim) { rect(x + o.chim, y - h - (o.rh || 90) - 30, 26, 60, { wash: '#3a3c44', washA: 1, w: 1.8, col: L }); for (let k = 0; k < 4; k++) { const ph = (t * 0.2 + k / 4) % 1; ell(x + o.chim + 13 + ph * 60, y - h - (o.rh || 90) - 40 - ph * 200, 16 + ph * 40, 12 + ph * 26, { wash: '#8a90a8', washA: 0.3 * (1 - ph), line: false }); } }
  }
  function back(t) {                                                // дальний ряд домов, провода, репродуктор
    house(120, 1260, 420, 230, t, { win: 2, chim: 90, dark: 0 }); house(640, 1240, 460, 250, t, { win: 3, chim: -120, rh: 100 }); house(1140, 1270, 400, 220, t, { win: 2, dark: 1, chim: 60 });
    pencil([[-100, 1010], [400, 1050], [900, 1000], [1300, 1040]], { w: 1.6, col: '#0a0a14', pass2: false });
    depthFog('#1c2452', 0.2); }
  function yard(t) {                                                // двор: дом с красной дверью, кумач, велосипеды, капуста, уголь, соседи с лопатами
    house(230, 1420, 560, 300, t, { win: 2, door: 150, chim: -150, rh: 110 });
    rect(700, 1110, 420, 310, { wash: '#4e5058', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: '#1a1c24', ang: 0.05 } }); roofCN(910, 1116, 450, 70, { col: '#4a4c58', colD: '#1e2028', ev: 26 });
    const wv = Math.sin(t * 2) * 5; blob([[640, 1150 + wv], [1140, 1140 - wv], [1140, 1226 - wv], [640, 1236 + wv]], { wash: '#c8281a', washA: 1, w: 2.2, col: L }); hz('深挖洞  广积粮', 890, 1188, 58, '#ffe8a0', 0.95);
    pencil([[1180, 1420], [1180, 900]], { w: 8, col: '#2a2420', pass2: false }); blob([[1180, 900], [1130, 880], [1100, 930], [1130, 960], [1180, 940]], { wash: '#6a7078', washA: 1, w: 2.2, col: L });   // репродуктор
    const sr = t > EV.dg_siren - 0.4 ? 1 : 0; for (let k = 0; k < 3; k++) pencil(ellPts(1090, 920, 30 + k * 26, 40 + k * 30, 0, 0, 20).slice(6, 15), { w: 3, col: sr ? '#ff6a4a' : '#c8d0e0', a: (0.3 + 0.5 * Math.abs(Math.sin(t * 8 + k))), pass2: false });
    bikeBJ(120, 1425, 0.9, { basket: 1 }); bikeBJ(1040, 1425, 0.8, { flip: -1 });
    for (let i = 0; i < 14; i++) { const cx = 330 + (i % 5) * 44 + (Math.floor(i / 5) % 2) * 22, cy = 1410 - Math.floor(i / 5) * 34; ell(cx, cy, 26, 20, { wash: i % 3 ? '#a8c878' : '#d8e8a8', washA: 1, w: 1.6, col: '#2a3a1a' }); pencil([[cx - 12, cy - 6], [cx + 4, cy + 8]], { w: 1.2, col: '#4a6a2a', a: 0.7, pass2: false }); }
    for (let i = 0; i < 12; i++) ell(930 + (i % 4) * 30, 1412 - Math.floor(i / 4) * 22, 15, 10, { wash: '#1a1a1e', washA: 1, w: 1.4, col: '#000' });
    // ворот над шурфом
    for (const k of [-1, 1]) { pencil([[PX + k * 120, 1430], [PX + k * 90, 1210]], { w: 10, col: BJ.woodD, pass2: false }); } pencil([[PX - 110, 1230], [PX + 110, 1230]], { w: 14, col: BJ.wood, pass2: false }); pencil([[PX + 110, 1230], [PX + 150, 1230], [PX + 150, 1280]], { w: 6, col: '#3a3a40', pass2: false });
    const by = 1330 + Math.sin(t * 1.5) * 26; pencil([[PX, 1236], [PX, by]], { w: 3, col: '#c8b888', pass2: false }); blob([[PX - 30, by], [PX + 30, by], [PX + 24, by + 46], [PX - 24, by + 46]], { wash: '#6a5a3a', washA: 1, w: 2, col: L });
    shaft(PX, 1440, 150, 900, Math.PI, 'rgba(255,200,110,1)', 0.5); glow(PX, 1430, 300, 'rgba(255,190,100,1)', 0.6 * flick(t, 3));
    const dg = (x, y, s, c, sd, o = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a3048', hat: 'cap', hatCol: c, seed: sd }, o));
    dg(520, 1440, 0.62, PPL.mao[0], 2482, { prop: 'stick', armR: 'hold', look: [0.5, 0.4] }); dg(900, 1446, 0.62, PPL.mao[1], 2483, { flip: -1, prop: 'stick', armR: 'hold', look: [-0.5, 0.5] });
    dg(980, 1436, 0.55, PPL.mao[3], 2484, { flip: -1 }); dg(60, 1440, 0.55, PPL.mao[2], 2485, { hat: 'scarf', hatCol: '#a84a3a', long: 1 }); dg(420, 1432, 0.4, '#c84a3a', 2486, { hat: 'bun' });
    dg(1230, 1450, 0.66, PPL.mao[4], 2487, { flip: -1, hat: 'straw', hatCol: '#c8b070' });
    for (const [x, y] of [[560, 1420], [860, 1424]]) { blob([[x - 34, y], [x - 26, y - 34], [x + 26, y - 34], [x + 34, y]], { wash: '#b89a5a', washA: 1, w: 1.8, col: L, shade: { gap: 5, a: 0.4, col: '#5a4420', ang: 0.8 } }); ell(x, y - 36, 26, 8, { wash: '#5a3a22', washA: 1, w: 1.2, col: L }); }   // корзины с землёй
    for (const [x, len, a] of [[520, 320, -1.0], [900, 320, 1.0], [980, 260, 1.1], [120, 300, -1.15], [1230, 300, 1.2], [420, 200, -1.05]]) castShadow(x, 1440, 70, len, a, 0.36);
    moodDark(PX, 1380, 520, 1500, '#060818', 0.32); lightPool(PX, 1440, 560, 90, 'rgba(255,200,120,1)', 0.5);
  }
  function under(t) {                                               // плоскость героя: земля двора, разрез грунта, шурф, тоннель-убежище
    const lit = t > EV.dg_lights ? clamp((t - EV.dg_lights) / 0.9) : 0, sr = t > EV.dg_siren ? 0.5 + 0.5 * Math.sin((t - EV.dg_siren) * 12) : 0, col = t < EV.dg_dig + 0.25 ? 0 : 1;
    rect(-900, 1420, 2900, 2200, { wash: '#4a2e20', washA: 1, line: false });
    for (const [y, h, c] of [[1420, 70, '#3a3a40'], [1490, 130, '#5a3a26'], [1700, 90, '#6a4a2e'], [1880, 60, '#3e2a1e'], [2440, 200, '#3a2418']]) rect(-900, y, 2900, h, { wash: c, washA: 0.9, line: false });
    ctx.save(); const r = rng(2488); for (let i = 0; i < 260; i++) { ctx.fillStyle = r() < 0.5 ? 'rgba(20,10,6,0.5)' : 'rgba(170,130,90,0.35)'; const z = 3 + r() * 9; ctx.fillRect(-300 + r() * 1700, 1500 + r() * 1500, z, z * 0.7); } ctx.restore();
    for (let i = 0; i < 9; i++) pencil([[-300, 1470 + i * 10 + (i % 3) * 4], [1500, 1464 + i * 11]], { w: 1.2, col: '#1a1410', a: 0.35, pass2: false });
    for (const [x, y, k] of [[240, 1640, 0], [1010, 1760, 1], [420, 1900, 2], [1120, 1580, 3]]) { if (k === 0) { blob([[x - 34, y], [x - 20, y - 30], [x + 26, y - 26], [x + 34, y + 6], [x, y + 16]], { wash: '#c8a070', washA: 1, w: 1.8, col: L }); pencil([[x - 14, y - 10], [x + 16, y - 4]], { w: 2, col: '#2a4a8a', pass2: false }); }
      else if (k === 1) { ell(x, y, 22, 22, { wash: '#7a8a5a', washA: 1, w: 2, col: L }); rect(x - 6, y - 6, 12, 12, { wash: '#4a2e20', washA: 1, w: 1.2, col: L }); }
      else if (k === 2) { pencil([[x - 40, y], [x + 40, y + 6]], { w: 8, col: BJ.bone, pass2: false }); ell(x - 42, y, 8, 8, { wash: BJ.bone, washA: 1, line: false }); ell(x + 42, y + 6, 8, 8, { wash: BJ.bone, washA: 1, line: false }); }
      else pencil(spline([[x, y - 160], [x + 20, y - 60], [x - 30, y], [x + 10, y + 80]], false, 10), { w: 4, col: '#2a1a10', pass2: false }); }
    // шурф
    rect(PX - 78, 1416, 156, TY - 1400, { wash: '#1a0e0a', washA: 1, w: 3, col: L }); for (let i = 0; i < 12; i++) pencil([[PX - 50, 1470 + i * 46], [PX + 50, 1470 + i * 46]], { w: 4, col: BJ.wood, a: 0.9, pass2: false }); for (const k of [-1, 1]) pencil([[PX + k * 50, 1430], [PX + k * 50, TY + 10]], { w: 5, col: BJ.woodD, pass2: false });
    shaft(PX, TY, 150, 640, Math.PI, 'rgba(255,200,110,1)', 0.3);
    if (!col) shape([[PX - 78, 1416], [PX - 250, 1416], [PX - 250, 1440], [PX - 78, 1440]], { wash: '#3a3a40', washA: 1, line: false });
    else { shape([[PX - 78, 1416], [PX - 250, 1416], [PX - 200, 1520], [PX - 78, 1600]], { wash: '#1a0e0a', washA: 1, w: 2.4, col: L }); const q = clamp((t - EV.dg_dig - 0.25) / 0.6); const rr = rng(2489); for (let i = 0; i < 10; i++) ell(PX - 220 + rr() * 150, 1440 + q * (300 + rr() * 500), 16 + rr() * 14, 12 + rr() * 10, { wash: '#5a3a26', washA: 1 - q, w: 1.6, col: L, a: 1 - q }); }
    // малые ходы в разрезе
    for (const [x, y, s] of [[200, 1830, 1], [1120, 1900, 0.9], [-80, 1960, 0.8]]) { blob([[x - 90 * s, y], [x - 90 * s, y - 60 * s], [x, y - 104 * s], [x + 90 * s, y - 60 * s], [x + 90 * s, y]], { wash: '#160c0a', washA: 1, w: 2.4, col: L }); bulb(x, y - 76 * s, 0.6 * s, t, lit, x, 'rgba(255,200,120,1)'); if (lit > 0.3) human(x - 30 * s, y - 2, 0.22 * s, t, { body: PPL.mao[0], hat: 'cap', hatCol: '#3a5f9a', seed: 2490 + x }); }
    // главный тоннель: кирпичный свод, боковые проёмы, пол
    const base = 0.25 + 0.75 * lit;
    blob([[-500, FY + 10], [-500, TY + 110], [-300, TY], [1400, TY], [1600, TY + 110], [1600, FY + 10]], { wash: lerpC('#1a100c', '#6a4a34', base), washA: 1, w: 3, col: L });
    for (let j = 0; j < 8; j++) pencil([[-460, TY + 34 + j * 44], [1560, TY + 34 + j * 44]], { w: 1.4, col: '#1a0e08', a: 0.55, pass2: false }); for (let i = 0; i < 40; i++) pencil([[-440 + i * 50 + ((i % 2) * 25), TY + 34 + (i % 8) * 44], [-440 + i * 50 + ((i % 2) * 25), TY + 78 + (i % 8) * 44]], { w: 1.2, col: '#1a0e08', a: 0.5, pass2: false });
    for (const [x, lab] of [[130, '粮'], [1050, '水']]) { blob([[x - 80, FY - 6], [x - 80, FY - 220], [x, FY - 290], [x + 80, FY - 220], [x + 80, FY - 6]], { wash: '#0c0606', washA: 1, w: 2.6, col: L }); glow(x, FY - 120, 150, 'rgba(255,170,90,1)', 0.25 * lit); hz(lab, x, FY - 320, 44, '#ffe0a0', 0.5 + 0.5 * lit); for (let k = 0; k < 2; k++) crateW(x - 30 + k * 60, FY - 8, 56, 44, { col: '#7a5a34' }); }
    rect(-500, FY - 4, 2100, 40, { wash: '#3a2a20', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 20; i++) pencil([[-460 + i * 100, FY - 2], [-470 + i * 100, FY + 34]], { w: 1.6, col: '#140c08', a: 0.7, pass2: false });
    pencil(spline([[-460, TY + 30], [200, TY + 56], [900, TY + 40], [1560, TY + 60]], false, 16), { w: 2.4, col: '#0a0606', pass2: false });
    for (let i = 0; i < 9; i++) { const x = -330 + i * 210, on = clamp(lit * 9 - Math.abs(i - 5) * 1.2); bulb(x, TY + 104, 1, t, on, i); if (on > 0.1) lightPool(x, FY + 6, 150, 34, 'rgba(255,214,140,1)', 0.4 * on); }
    rect(470, TY + 170, 150, 60, { wash: '#e8e0c8', washA: 1, w: 2, col: L }); hz('防空洞', 545, TY + 202, 40, '#b8281a', 1);   // «бомбоубежище»
    rect(880, TY + 180, 120, 44, { wash: '#2a6a4a', washA: 1, w: 2, col: L }); txt('ВЫХОД →', 940, TY + 204, 24, { col: '#e8ffe8', font: 'Osw' });
    human(360, FY, 0.62, t, { body: PPL.mao[0], legs: '#2a3048', hat: 'cap', hatCol: '#3a5f9a', prop: 'stick', armR: 'hold', seed: 2495 }); human(1010, FY, 0.6, t, { body: PPL.mao[1], legs: '#2a3048', hat: 'cap', hatCol: '#4a6a4a', flip: -1, seed: 2496, look: [-0.6, -0.2] });
    human(1160, FY, 0.56, t, { body: PPL.mao[3], legs: '#2a3048', hat: 'straw', hatCol: '#c8b070', flip: -1, seed: 2497 }); human(-60, FY, 0.6, t, { body: PPL.mao[4], legs: '#2a3048', hat: 'cap', hatCol: '#5a5e66', seed: 2498, prop: 'candle', armR: 'hold' });
    push(250, FY, 1); ell(0, -22, 22, 22, { line: true, w: 4, col: L }); blob([[-10, -40], [70, -40], [90, -84], [-30, -84]], { wash: '#5a6068', washA: 1, w: 2.2, col: L }); ell(30, -86, 50, 18, { wash: '#5a3a26', washA: 1, w: 1.6, col: L }); pencil([[70, -44], [130, -64]], { w: 5, col: BJ.woodD, pass2: false }); pop();   // тачка
    blob([[PX - 90, FY], [PX - 40, FY - 50], [PX + 50, FY - 44], [PX + 100, FY]], { wash: '#5a3a26', washA: 1, w: 2.2, col: L });   // куча земли под шурфом
    if (sr) { glow(850, TY + 70, 420, 'rgba(255,60,40,1)', 0.5 * sr); screenFill('#ff2010', 0.08 * sr, 'lighter'); } rect(832, TY + 40, 36, 20, { wash: '#2a2a2e', washA: 1, w: 1.6, col: L }); ell(850, TY + 74, 22, 20, { wash: sr > 0.4 ? '#ff5a3a' : '#7a1a14', washA: 1, w: 2, col: L });
    // нижний ярус: узкая галерея с вагонеткой, труба, кабель
    rect(-500, 2560, 2100, 130, { wash: lerpC('#120a08', '#4a3424', base), washA: 1, w: 2.6, col: L }); pencil([[-500, 2684], [1600, 2684]], { w: 4, col: '#2a2a30', pass2: false });
    for (let i = 0; i < 8; i++) { bulb(-300 + i * 230, 2600, 0.55, t, lit, i + 20); if (i % 2 === 0 && lit > 0.2) human(-240 + i * 230, 2686, 0.26, t, { body: PPL.mao[i % 5], hat: 'cap', hatCol: '#3a5f9a', seed: 2510 + i, flip: i % 4 ? 1 : -1 }); }
    const cx2 = 200 + ((t * 60) % 900); rect(cx2 - 40, 2640, 80, 36, { wash: '#5a6068', washA: 1, w: 2, col: L }); for (const k of [-1, 1]) ell(cx2 + k * 24, 2680, 9, 9, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); ell(cx2, 2638, 36, 10, { wash: '#5a3a26', washA: 1, w: 1.2, col: L });
    pencil([[-500, 2490], [1600, 2496]], { w: 12, col: '#3a4a4a', pass2: false }); for (let i = 0; i < 7; i++) rect(-420 + i * 300, 2480, 16, 30, { wash: '#2a3636', washA: 1, w: 1.4, col: L });
    for (const [x, y] of [[80, 2790], [760, 2840], [1150, 2770], [460, 2900]]) ell(x, y, 40, 22, { wash: '#6a5a4a', washA: 1, w: 1.8, col: L, shade: { gap: 6, a: 0.3, col: '#2a1e16', ang: 0.6 } });
    moodDark(PX, FY - 200, 500 + 500 * lit, 1500, '#060308', 0.7 - 0.3 * lit);
  }
  function front(t) {                                               // рама: наверху — карниз и голая ветка; внизу — корни и комья (по краям)
    roofCN(-200, 560, 760, 220, { sil: '#05060e', ev: 90 }); sil([[-560, 540], [-120, 540], [-160, 640], [-560, 640]], '#05060e', 1);
    for (let k = 0; k < 5; k++) pencil(spline([[1500, 300 + k * 30], [1250, 420 + k * 60], [1080 - k * 30, 380 + k * 90]], false, 10), { w: 9 - k, col: '#05060e', pass2: false });
    for (const k of [-1, 1]) { const x = 540 + k * (k > 0 ? 600 : 400); sil([[x - 200, 2600], [x - 120 * k, 2800], [x - 60 * k, 3300], [x - 160 * k, 3900], [x + 300 * k, 3900], [x + 300 * k, 2600]], '#070304', 1); for (let i = 0; i < 4; i++) pencil(spline([[x, 2700 + i * 250], [x - k * 120, 2800 + i * 250], [x - k * 150, 2980 + i * 240]], false, 8), { w: 12 - i * 2, col: '#070304', pass2: false }); }
  }
  function hud(t) {
    if (t > EV.dg_lights + 0.3 && t < EV.dg_ussr) { const q = popK(t, EV.dg_lights + 0.3, 0.3); push(600, 760, q, -0.03); rect(-250, -66, 500, 132, { wash: '#120a08', washA: 0.9, w: 3, col: BJ.gold }); txt('ПОДЗЕМНЫЙ ГОРОД', 0, -22, 50, { col: BJ.goldL, font: 'Osw' }); txt('≈ 85 км² тоннелей под Пекином', 0, 32, 34, { col: '#fff0c8', font: 'Hand' }); pop(); }
    if (t > EV.dg_ussr - 0.05) { const q = popK(t, EV.dg_ussr - 0.05, 0.3); push(610, 770, q, 0.03); rect(-240, -90, 480, 180, { wash: '#16080a', washA: 0.92, w: 3.4, col: '#ff6a4a' }); txt('1969 · ЖДАЛИ УДАРА', 0, -40, 44, { col: '#ffe8d8', font: 'Osw' }); txt('С СЕВЕРА — ИЗ СССР', 0, 14, 44, { col: '#ff7a5a', font: 'Osw' }); txt('после боёв на Даманском', 0, 60, 32, { col: '#f0d8b8', font: 'Hand' }); pop(); }
    if (t > EV.dg_dig && t < EV.dg_fall + 0.2) txt('хрусь!', 640, 1120, 60, { col: '#ffe8b0', font: 'Hand', rot: -0.12, a: clamp((EV.dg_fall + 0.2 - t) / 0.3) });
  }
  const fallK = t => clamp((t - EV.dg_fall) / (EV.dg_land - EV.dg_fall));
  WORLD.dig = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => far(t));
    lay(9, () => back(t));
    lay(3.2, () => yard(t));
    lay(1, () => { under(t); const k = fallK(t); if (k <= 0) castShadow(560, 1445, 180, 400, -1.0, 0.45); cat(); });
    lay(0.62, () => front(t));
    lay(2, () => motes(26, [100, 900, 1300, 1450], '#ffd8a0', t, 2499, { sp: 12, sz: 2.4, a: 0.5, wob: 16, add: 1 }));
    lay(1, () => motes(26, [-300, TY, 1400, FY], '#ffe0b0', t, 2500, { sp: 5, sz: 2.2, a: 0.5 * clamp((t - EV.dg_land) / 0.4), wob: 14, add: 1 }));
    lay(0.8, () => motes(10, [-200, 2500, 1300, 3300], '#c8a070', t, 2501, { sp: 14, sz: 8, a: 0.2, wob: 30 }));
  };
  DIR.dig = {
    outfit: 'vatnikBJ', light: { side: 1, rim: '#ffc880' }, grade: ['#1a2a6a', 0.12],
    act: () => [[S0.dig, 'talk'], [EV.dg_point, 'sideeye'], [EV.dg_dig, 'smug'], [EV.dg_fall, 'scared'], [EV.dg_land + 0.1, 'awe'], [EV.dg_siren, 'shock'], [EV.dg_ussr, 'suspicious']],
    pose: (t, u, b) => { const k = fallK(t), wk = clamp((t - S0.dig) / 1.2), dig = t > EV.dg_dig - 0.25 && t < EV.dg_fall, land = t > EV.dg_land && t < EV.dg_land + 0.25;
      return Object.assign(b, { x: lerp(lerp(330, 560, sm(wk)), PX, sm(k)), y: lerp(1448, FY, k * k), s: 0.98, rot: k > 0 && k < 1 ? Math.sin(k * Math.PI) * 0.5 : 0, walk: wk < 1 ? t * 9 : undefined,
        look: k > 0 && k < 1 ? [0, 1] : t < EV.dg_dig ? [0.6, -0.5] : k < 1 ? [0.6, 0.6] : t > EV.dg_siren ? [0.6, -0.7] : [0.4 + Math.sin(t * 3) * 0.4, -0.5],
        hand: dig ? [120, -200 + Math.abs(Math.sin((t - EV.dg_dig) * 9)) * 60] : k > 0 && k < 1 ? [130, -420] : [110, -250], handF: k > 0 && k < 1 ? [-130, -420] : t > EV.dg_point && t < EV.dg_dig ? [-150, -330] : undefined,
        squash: land ? 0.2 : b.squash, tailUp: k > 0, sweat: t > EV.dg_siren }); },
    afterCat: (t, u, P) => { const k = fallK(t); if (k > 0 && k < 1) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; shovelBJ(x + 6, y + 150, k >= 1 ? 0.12 : t > EV.dg_dig - 0.25 ? 0.25 : 0.1, 0.85); },
    cam: () => [[S0.dig, 500, 860, 0.0], [EV.dg_dig, 620, 1040, 0.12], [EV.dg_fall, 660, 1120, 0.16], [EV.dg_land, 660, 2030, 0.08, 'x'], [EV.dg_siren, 620, 2050, 0.1], [EV.dg_ussr, 640, 2030, 0.14, 'x'], [S1.dig, 660, 2040, 0.18]],
    hud
  };
  TRANS_IN.dig = { a: 0.22, b: 0.3, fx(k, t, A, B) {                // огромный бумажный фонарь пролетает справа налево, за ним — новая эпоха
    const x = lerp(W + 520, -520, sm(k)); drawBuf(A);
    scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W * 2, H); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore(); lantern(x, 900 + Math.sin(k * 6) * 60, 7.5, t, 1 - k * 0.8, 3, { cord: 200, ch: '京' }); });
  } };
})();
