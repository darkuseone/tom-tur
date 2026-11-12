/* 024 — сцена `crates`: декабрь 1941, ночной перрон вокзала Цяньмэнь, снег. Вокзал с часовой башней, навес на чугунных колоннах,
   товарный вагон с открытой дверью, паровоз под парами, семафор. Морпехи в шинелях несут ящик № 1, офицер с планшетом, носильщик с тележкой,
   учёный провожает; чемоданы, мешки почты, бочки. Том толкает ящик № 2 по перрону — на «два ящика» тот едет к вагону, на «морпехам США»
   ящик влетает в вагон, дверь с грохотом задвигается. На «И тут» всё замирает, фонарь мигает; на «Пёрл-Харбор» свет становится красным,
   воет сирена, падает газета «7 ДЕКАБРЯ 1941», поезд трогается и уходит в темноту. Главный свет — перронный фонарь (тёплый → красный),
   второй — холодный прожектор паровоза. Переход В сцену — клуб пара. */
(() => {
  EV.cr_save = wtk('s6', 'спасти:');
  EV.cr_two = wtk('s6', 'два');
  EV.cr_usa = wtk('s6', 'морпехам');
  EV.cr_door = wtk('s6', 'США.');
  EV.cr_pause = wtk('s6', 'И');
  EV.cr_ph = wtk('s6', 'Пёрл-Харбор.');
  KEYW.push('ящика', 'США.', 'Пёрл-Харбор.');
  SHAKES.push([EV.cr_door + 0.12, 0.25, 10], [EV.cr_ph, 0.45, 14]);
  const L = BJ.ink, LX = 880, LY = 650;                              // перронный фонарь
  const red = t => sm((t - EV.cr_ph) / 0.25), go = t => t > EV.cr_ph + 0.35 ? Math.pow(t - EV.cr_ph - 0.35, 2) * 420 : 0, lampK = t => t > EV.cr_pause && t < EV.cr_ph ? (Math.sin(t * 46) > 0.2 ? 1 : 0.35) : 1;
  const doorK = t => clamp((t - EV.cr_door) / 0.14);
  const lc = t => red(t) > 0.5 ? 'rgba(255,70,50,1)' : 'rgba(255,214,140,1)';
  function sky(t) { vgrad(-900, 1400, ['#05081a', '#0e1634', '#1e2748', '#2e2e4a'], 1); cloudsBJ(t, 100, 5, '#1c2444', 2580, 0.8, 10); const r = red(t); if (r) { glow(540, 900, 1400, 'rgba(255,50,30,1)', 0.25 * r); for (const [x, ph] of [[200, 0], [900, 2]]) rays(x, 1300, -Math.PI / 2 + Math.sin(t * 1.4 + ph) * 0.5, 0.06, 1700, 'rgba(255,220,210,0.9)', 0.3 * r, 3, t); } }
  function city(t) {                                                // башня ворот Цяньмэнь и телеграфные столбы
    hallCN(240, 1000, 360, 200, { bays: 5, rh: 110, tiers: 1, wall: '#141830', roof: { sil: '#0c1026', ev: 44 } }); roofCN(240, 800, 400, 100, { sil: '#0c1026', ev: 44 }); roofCN(240, 700, 330, 120, { sil: '#0c1026', ev: 44 }); sil([[-100, 1200], [-100, 1000], [580, 1000], [580, 1200]], '#0e1228', 1);
    for (let i = 0; i < 5; i++) { const x = 640 + i * 190; pencil([[x, 1200], [x, 820]], { w: 5, col: '#0a0c1c', pass2: false }); pencil([[x - 40, 850], [x + 40, 850]], { w: 4, col: '#0a0c1c', pass2: false }); if (i) pencil(spline([[x - 190, 850], [x - 95, 880], [x, 850]], false, 6), { w: 1.2, col: '#0a0c1c', pass2: false }); }
    motes(50, [-300, 200, 1400, 1300], '#c8d4f0', t, 2581, { sp: -30, vx: -14, sz: 2, a: 0.6, wob: 20 }); depthFog('#1a2244', 0.25); }
  function station(t) {                                             // вокзал: кирпич, арочные окна, часовая башня, вывеска
    const r = red(t);
    rect(-400, 760, 1100, 640, { wash: '#6a3a30', washA: 1, w: 2.6, col: L, shade: { gap: 14, a: 0.25, col: '#1e0e0c', ang: 0.05 } }); for (let j = 0; j < 14; j++) pencil([[-400, 800 + j * 44], [700, 800 + j * 44]], { w: 1, col: '#2a1410', a: 0.5, pass2: false });
    rect(-400, 730, 1100, 40, { wash: '#b8b0a0', washA: 1, w: 2, col: L });
    for (let i = 0; i < 5; i++) { const x = -330 + i * 210; blob([[x - 60, 1180], [x - 60, 940], [x, 880], [x + 60, 940], [x + 60, 1180]], { wash: lerpC('#ffc060', '#c84030', r * 0.7), washA: 1, w: 2.4, col: L }); pencil([[x, 880], [x, 1180]], { w: 3, col: '#3a2018', pass2: false }); pencil([[x - 60, 1030], [x + 60, 1030]], { w: 3, col: '#3a2018', pass2: false }); glow(x, 1040, 190, lc(t), 0.3); }
    rect(560, 420, 190, 980, { wash: '#7a4438', washA: 1, w: 2.8, col: L, shade: { gap: 12, a: 0.25, col: '#1e0e0c', ang: 1.2 } }); blob([[548, 420], [600, 300], [655, 250], [710, 300], [762, 420]], { wash: '#3a4a48', washA: 1, w: 2.6, col: L }); pencil([[655, 250], [655, 190]], { w: 4, col: L, pass2: false });
    ell(655, 540, 66, 66, { wash: '#fff0c0', washA: 1, w: 4, col: L }); glow(655, 540, 170, 'rgba(255,230,160,1)', 0.5); for (let i = 0; i < 12; i++) pencil([[655 + Math.cos(i * 0.5236) * 54, 540 + Math.sin(i * 0.5236) * 54], [655 + Math.cos(i * 0.5236) * 62, 540 + Math.sin(i * 0.5236) * 62]], { w: 2, col: L, pass2: false });
    pencil([[655, 540], [655 + Math.cos(-0.6) * 36, 540 + Math.sin(-0.6) * 36]], { w: 4, col: L, pass2: false }); pencil([[655, 540], [655 + Math.cos(t * 3 - 1.57) * 50, 540 + Math.sin(t * 3 - 1.57) * 50]], { w: 2.4, col: '#a81a10', pass2: false });
    rect(-60, 640, 440, 84, { wash: '#16202a', washA: 1, w: 2.6, col: BJ.gold }); txt('ЦЯНЬМЭНЬ', 60, 684, 44, { col: BJ.goldL, font: 'Osw' }); hz('前門站', 280, 682, 50, BJ.goldL, 0.95);
    for (const x of [-380, -40, 300, 640]) pencil([[x, 730], [x + 30, 700], [x + 60, 730]], { w: 1, col: '#e8ecf4', a: 0, pass2: false });
    rect(-420, 716, 1140, 16, { wash: '#e8ecf4', washA: 0.9, line: false }); depthFog('#1a2244', 0.14); }
  function train(t) {                                               // состав: товарный вагон с дверью, тендер, паровоз (уходит вправо на «Пёрл-Харбор»)
    const dx = go(t), dk = doorK(t), r = red(t); push(dx, 0, 1);
    pencil([[-1200, 1418], [2600, 1418]], { w: 8, col: '#3a3e48', pass2: false });
    // вагон слева (уходит за край)
    rect(-560, 900, 520, 470, { wash: '#4a2a22', washA: 1, w: 3, col: L, shade: { gap: 14, a: 0.25, col: '#160a08', ang: 1.57 } }); rect(-580, 880, 560, 28, { wash: '#2a1c18', washA: 1, w: 2, col: L });
    // товарный вагон с дверью
    rect(0, 880, 640, 490, { wash: '#5a3026', washA: 1, w: 3.2, col: L, shade: { gap: 14, a: 0.25, col: '#1a0c0a', ang: 1.57 } }); for (let i = 1; i < 12; i++) pencil([[i * 53, 884], [i * 53, 1366]], { w: 1.4, col: '#22100c', a: 0.6, pass2: false }); rect(-20, 856, 680, 32, { wash: '#2a1c18', washA: 1, w: 2.4, col: L }); rect(-10, 850, 660, 12, { wash: '#e8ecf4', washA: 0.9, line: false });
    rect(200, 930, 260, 440, { wash: '#0c0808', washA: 1, w: 2.6, col: L }); if (dk < 1) { glow(330, 1150, 200, 'rgba(255,200,120,1)', 0.25); crateW(290, 1368, 100, 70, { label: '№1', ls: 30, col: '#a8844e' }); if (t > EV.cr_usa + 0.45) crateW(380, 1368, 100, 70, { label: '№2', ls: 30, col: '#a8844e' }); }
    const ddx = lerp(270, 0, dk); rect(200 + ddx, 924, 264, 450, { wash: '#6a3a2c', washA: 1, w: 3, col: L, shade: { gap: 12, a: 0.25, col: '#1a0c0a', ang: 1.57 } }); pencil([[200 + ddx, 924], [464 + ddx, 1374]], { w: 5, col: '#3a1c14', pass2: false }); pencil([[464 + ddx, 924], [200 + ddx, 1374]], { w: 5, col: '#3a1c14', pass2: false }); rect(210 + ddx, 1130, 24, 60, { wash: '#2a2a2e', washA: 1, w: 1.8, col: L });
    txt('U.S.M.C.', 560, 960, 28, { col: '#e8dcc0', font: 'Osw', a: 0.85 }); txt('→ ЦИНЬХУАНДАО', 110, 1300, 22, { col: '#e8dcc0', font: 'Osw', a: 0.7 });
    for (const x of [90, 550, -480, -120]) { ell(x, 1392, 34, 34, { wash: '#1a1a1e', washA: 1, w: 3, col: L }); ell(x, 1392, 10, 10, { wash: '#4a4a52', washA: 1, line: false }); }
    // тендер и паровоз
    rect(680, 960, 300, 400, { wash: '#1e2026', washA: 1, w: 3, col: L, shade: { gap: 12, a: 0.3, col: '#06060a', ang: 1.57 } }); for (let i = 0; i < 9; i++) ell(720 + i * 28, 956 - (i % 3) * 8, 20, 14, { wash: '#0a0a0c', washA: 1, w: 1.2, col: '#000' });
    rect(1010, 860, 220, 500, { wash: '#22242c', washA: 1, w: 3, col: L }); rect(1040, 920, 110, 120, { wash: lerpC('#ffb050', '#ff5038', r), washA: 1, w: 2.4, col: L }); glow(1095, 980, 200, lc(t), 0.5); rect(990, 836, 260, 30, { wash: '#16181e', washA: 1, w: 2.4, col: L });
    blob([[1230, 1000], [1700, 1000], [1700, 1340], [1230, 1340]], { wash: '#1a1c22', washA: 1, w: 3, col: L, shade: { gap: 10, a: 0.3, col: '#06060a', ang: 0.1 } }); rect(1420, 880, 60, 130, { wash: '#16181e', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 4; i++) pencil([[1260 + i * 110, 1006], [1260 + i * 110, 1336]], { w: 4, col: '#3a3e48', a: 0.8, pass2: false });
    for (const x of [760, 900, 1080, 1300, 1480]) { const R0 = x > 1200 ? 60 : 36; ell(x, 1418 - R0, R0, R0, { wash: '#14141a', washA: 1, w: 3.4, col: L }); for (let i = 0; i < 6; i++) pencil([[x, 1418 - R0], [x + Math.cos(i * 1.047 + dx * 0.02) * R0, 1418 - R0 + Math.sin(i * 1.047 + dx * 0.02) * R0]], { w: 2.4, col: '#5a5e68', pass2: false }); }
    pencil([[1300, 1358], [1480, 1358]], { w: 10, col: '#8a2a1a', pass2: false });
    for (let k = 0; k < 7; k++) { const ph = (t * 0.5 + k / 7) % 1; ell(1450 - ph * 340, 860 - ph * 420, 50 + ph * 150, 40 + ph * 110, { wash: lerpC('#d8dcec', '#ffb0a0', r * 0.6), washA: 0.4 * (1 - ph), line: false }); }
    for (let k = 0; k < 4; k++) { const ph = (t * 0.9 + k / 4) % 1; ell(1260 - ph * 260, 1380 - ph * 40, 40 + ph * 110, 24 + ph * 50, { wash: '#e8ecf4', washA: 0.35 * (1 - ph), line: false }); }
    pop(); depthFog('#141a38', 0.08); }
  function platform(t) {                                            // перрон: навес, фонарь, морпехи, офицер, носильщик, багаж
    const lk = lampK(t), r = red(t), carry = clamp((t - S0.crates) / (EV.cr_save - S0.crates + 0.3)), fr = t > EV.cr_pause;
    for (const x of [-60, 420, 1180]) { pencil([[x, 1470], [x, 600]], { w: 16, col: '#22262c', pass2: false }); pencil([[x - 70, 610], [x, 700], [x + 70, 610]], { w: 7, col: '#22262c', pass2: false }); rect(x - 22, 1440, 44, 34, { wash: '#16181c', washA: 1, w: 2, col: L }); }
    shape([[-600, 560], [1700, 520], [1700, 610], [-600, 650]], { wash: '#2a2e36', washA: 1, w: 2.8, col: L }); rect(-600, 520, 2300, 34, { wash: '#e8ecf4', washA: 0.92, line: false }); for (let i = 0; i < 24; i++) blob([[-560 + i * 94, 640], [-520 + i * 94, 640], [-540 + i * 94, 670 + (i % 3) * 14]], { wash: '#dfe8f4', washA: 0.9, w: 1, col: '#8a9ab8' });
    // фонарь — главный свет
    pencil([[LX, 600], [LX, LY - 40]], { w: 5, col: L, pass2: false }); blob([[LX - 60, LY], [LX - 30, LY - 46], [LX + 30, LY - 46], [LX + 60, LY]], { wash: '#2a2e36', washA: 1, w: 2.4, col: L }); ell(LX, LY + 4, 30, 12, { wash: r > 0.5 ? '#ff7a60' : '#fff0c0', washA: lk, w: 1.4, col: L });
    shaft(LX, LY, 90, 900, 0, lc(t), 0.5 * lk); shaft(LX, LY, 520, 900, 0, lc(t), 0.2 * lk); glow(LX, LY, 200, lc(t), 0.8 * lk); lightPool(LX - 40, 1490, 640, 110, lc(t), 0.55 * lk);
    const mar = (x, y, s, sd, o = {}) => human(x, y, s, t, Object.assign({ body: '#3e4a34', legs: '#2a3024', long: 1, hat: 'cap', hatCol: '#34402c', seed: sd, belt: 1 }, o));
    const cx = lerp(660, 330, sm(carry)), cy = 1468; if (carry < 1) { mar(cx - 70, cy, 0.66, 2582, { flip: 1 }); crateW(cx, cy - 70, 110, 76, { label: '№1', ls: 32, col: '#a8844e' }); mar(cx + 70, cy, 0.66, 2583, { flip: -1 }); } else { mar(250, cy, 0.66, 2582, { flip: 1, look: fr ? [0.8, -0.6] : [0.5, 0] }); mar(430, cy, 0.66, 2583, { flip: -1, look: fr ? [0.6, -0.7] : [-0.3, 0] }); }
    mar(1010, 1474, 0.74, 2584, { flip: -1, prop: 'scroll', armR: 'hold', beard: 0, look: fr ? [-0.4, -0.8] : [-0.6, 0.1] });
    human(60, 1470, 0.66, t, { body: '#3a3e4a', legs: '#2a2a30', hat: 'fur', hatCol: '#4a3828', long: 1, seed: 2585, look: [0.7, 0] }); human(-70, 1476, 0.6, t, { body: '#e8e8e0', legs: '#2a2a30', hat: 'scarf', hatCol: '#8a3a2a', long: 1, seed: 2586, look: [0.7, 0] });
    human(1150, 1476, 0.66, t, { body: '#4a5a7a', legs: '#2a2a30', hat: 'straw', hatCol: '#c8b070', seed: 2587, flip: -1 }); push(1220, 1474, 1); rect(-10, -70, 110, 60, { wash: BJ.wood, washA: 1, w: 2.2, col: L }); ell(20, -8, 16, 16, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); rect(4, -120, 50, 50, { wash: '#6a3a1a', washA: 1, w: 1.8, col: L }); rect(50, -108, 44, 38, { wash: '#2a4a6a', washA: 1, w: 1.8, col: L }); pop();
    for (const [x, c] of [[560, '#6a3a1a'], [610, '#3a2a1a']]) { rect(x - 30, 1420, 60, 50, { wash: c, washA: 1, w: 2, col: L }); pencil([[x - 14, 1420], [x - 14, 1408], [x + 14, 1408], [x + 14, 1420]], { w: 3, col: L, pass2: false }); }
    for (const x of [760, 800]) blob([[x - 26, 1470], [x - 30, 1420], [x, 1400], [x + 30, 1420], [x + 26, 1470]], { wash: '#b8a888', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#5a4a30', ang: 0.8 } });
    rect(-200, 1380, 160, 14, { wash: BJ.wood, washA: 1, w: 2, col: L }); for (const x of [-180, -60]) pencil([[x, 1394], [x, 1470]], { w: 6, col: BJ.woodD, pass2: false });
    for (const [x, len, a] of [[250, 300, -1.1], [430, 280, -1.0], [1010, 260, 0.5], [60, 320, -1.25], [1150, 280, 0.9]]) castShadow(x, 1472, 80, len, a, 0.34 * lk);
    moodDark(LX - 100, 1250, 520, 1500, '#03040e', 0.6);
  }
  function floor(t) {                                               // доски перрона со снегом, край и рельсы; ящик № 2
    const lk = lampK(t), r = red(t);
    shape([[-900, 1470], [2000, 1470], [2000, 2500], [-900, 2500]], { wash: '#4a4a56', washA: 1, line: false });
    for (let i = 0; i < 6; i++) pencil([[-900, 1490 + i * i * 12 + i * 30], [2000, 1490 + i * i * 12 + i * 30]], { w: 1.8, col: '#1e1e28', a: 0.55, pass2: false }); for (let i = -8; i < 14; i++) pencil([[620 + (i - 3) * 170, 1470], [620 + (i - 3) * 500, 2500]], { w: 1.4, col: '#1e1e28', a: 0.4, pass2: false });
    for (const [x, y, w] of [[100, 1520, 260], [760, 1660, 320], [-200, 1700, 300], [1100, 1560, 240], [420, 1800, 360]]) ell(x, y, w, w * 0.12, { wash: '#dfe6f4', washA: 0.5, line: false });
    rect(-900, 1880, 2900, 46, { wash: '#2a2a32', washA: 1, w: 2.4, col: L }); rect(-900, 1926, 2900, 600, { wash: '#16161e', washA: 1, line: false }); for (const y of [2010, 2100]) pencil([[-900, y], [2000, y]], { w: 9, col: '#5a5e68', pass2: false }); for (let i = 0; i < 16; i++) rect(-400 + i * 130, 1990, 44, 140, { wash: '#2a2018', washA: 1, w: 1.6, col: L });
    lightPool(700, 1640, 600, 130, lc(t), 0.4 * lk);
    // ящик № 2: стоит у Тома → едет к вагону → влетает в дверь
    const pu = sm(clamp((t - EV.cr_two) / (EV.cr_usa - EV.cr_two))), fl = clamp((t - EV.cr_usa) / 0.45);
    if (fl < 1) { const x = lerp(lerp(560, 740, pu), 560, sm(fl)), y = lerp(1578, 1420, sm(fl)) - Math.sin(fl * Math.PI) * 120, s = lerp(1.25, 0.7, fl); crateW(x, y, 150, 104, { s, rot: Math.sin(fl * Math.PI) * -0.2, label: '№2', ls: 40, col: '#b08a52', rope: 1 }); if (pu > 0 && fl === 0) for (let k = 0; k < 3; k++) pencil([[x - 110 - k * 30, 1560 - k * 26], [x - 150 - k * 30, 1560 - k * 26]], { w: 3, col: '#e8ecf4', a: 0.6, pass2: false }); }
    castShadow(350, 1580, 180, 340, -0.95, 0.42 * lk);
    if (r) screenFill('#ff2a18', 0.1 * r * (0.6 + 0.4 * Math.sin(t * 10)), 'lighter');
  }
  function front(t) {                                               // рама: семафор слева, груда багажа справа, крупный снег
    sil([[-470, 2500], [-460, 500], [-430, 500], [-420, 2500]], '#04050c', 1); sil([[-460, 540], [-220, 600], [-220, 660], [-460, 620]], '#04050c', 1); glow(-250, 630, 90, red(t) > 0.5 ? 'rgba(255,60,40,1)' : 'rgba(120,255,160,1)', 0.8);
    sil([[1200, 2500], [1210, 1960], [1420, 1940], [1430, 1800], [1640, 1790], [1650, 2500]], '#04050c', 1); pencil([[1270, 1960], [1270, 1900], [1360, 1900], [1360, 1950]], { w: 12, col: '#04050c', pass2: false });
  }
  function hud(t) {
    if (t > EV.cr_save && t < EV.cr_pause) note('в Нью-Йорк, подальше от войны', 560, 800, t, EV.cr_save, EV.cr_pause, '#fff0c8', 46, -0.04);
    if (t > EV.cr_ph - 0.02) { const q = popK(t, EV.cr_ph - 0.02, 0.28), z = 1 + (1 - clamp((t - EV.cr_ph) / 0.14)) * 1.2; push(600, 860, q * z, -0.06); rect(-290, -150, 580, 300, { wash: '#efe6cc', washA: 0.98, w: 3.4, col: L }); rect(-270, -134, 540, 46, { wash: '#1a1a1a', washA: 1, line: false }); txt('ЭКСТРЕННЫЙ ВЫПУСК', 0, -110, 34, { col: '#efe6cc', font: 'Osw' });
      txt('ПЁРЛ-ХАРБОР', 0, -30, 88, { col: '#a81a10', font: 'Osw' }); txt('7 ДЕКАБРЯ 1941', 0, 44, 50, { col: '#1a1a1a', font: 'Osw' }); for (let i = 0; i < 3; i++) pencil([[-250, 90 + i * 18], [250 - i * 60, 90 + i * 18]], { w: 3, col: '#5a5a5a', a: 0.6, pass2: false }); pop(); }
    if (t > EV.cr_door + 0.12 && t < EV.cr_door + 0.6) txt('ГРОХ', 520, 1040, 70, { col: '#e8ecf4', font: 'Osw', rot: -0.08, a: 1 - (t - EV.cr_door - 0.12) / 0.48 });
  }
  WORLD.crates = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => city(t));
    lay(10, () => station(t));
    lay(5, () => train(t));
    lay(2.6, () => platform(t));
    lay(1, () => { floor(t); cat(); });
    lay(0.62, () => front(t));
    lay(3.6, () => motes(60, [-200, 200, 1300, 1500], '#e8f0ff', t, 2588, { sp: -60, vx: -30, sz: 3, a: 0.8, wob: 24 }));
    lay(0.8, () => motes(22, [-300, 200, 1400, 2000], '#ffffff', t, 2589, { sp: -150, vx: -70, sz: 9, a: 0.4, wob: 40 }));
    haze('#1a2248', 0.05);
  };
  DIR.crates = {
    outfit: 'komissar', light: { side: 1, rim: '#ffd890' }, grade: ['#16224e', 0.14],
    act: () => [[S0.crates, 'talk'], [EV.cr_save, 'proud'], [EV.cr_two, 'grin'], [EV.cr_door, 'smug'], [EV.cr_pause, 'suspicious'], [EV.cr_ph, 'shock'], [EV.cr_ph + 0.7, 'scared']],
    pose: (t, u, b) => { const pu = sm(clamp((t - EV.cr_two) / (EV.cr_usa - EV.cr_two))), pushing = t > EV.cr_two - 0.3 && t < EV.cr_usa + 0.1, wave = t > EV.cr_door && t < EV.cr_pause;
      return Object.assign(b, { x: 350 + pu * 150 - (t > EV.cr_ph ? 50 * sm((t - EV.cr_ph) / 0.3) : 0), y: 1580, s: 1.02, look: t > EV.cr_ph ? [0.2, -0.9] : t > EV.cr_pause ? [Math.sin(t * 9) * 0.7, -0.3] : pushing ? [0.8, 0.2] : [0.6, -0.3],
        walk: pushing && pu < 1 ? t * 10 : undefined, hand: pushing ? [150, -200] : wave ? [130, -420 + Math.sin(t * 12) * 20] : t < EV.cr_two - 0.3 ? [150, -150] : undefined, handF: pushing ? [110, -160] : undefined, tilt: pushing ? 0.16 : 0,
        squash: t > EV.cr_ph && t < EV.cr_ph + 0.25 ? 0.16 : b.squash, cold: t < EV.cr_two - 0.3 ? 1 : 0, tailUp: t > EV.cr_ph, sweat: t > EV.cr_ph }); },
    cam: () => [[S0.crates, 600, 860, 0.0], [EV.cr_two, 580, 1080, 0.16], [EV.cr_usa, 640, 1060, 0.1], [EV.cr_door + 0.15, 600, 1040, 0.16, 'x'], [EV.cr_pause, 600, 1000, 0.1], [EV.cr_ph, 620, 980, 0.22, 'x'], [S1.crates, 700, 960, 0.12]],
    hud
  };
  TRANS_IN.crates = { a: 0.24, b: 0.34, fx(k, t, A, B) {            // клуб пара: белые клубы заволакивают кадр и рассеиваются на перроне
    drawBuf(k < 0.45 ? A : B); const d = k < 0.45 ? sm(k / 0.45) : 1 - sm((k - 0.45) / 0.55), r = rng(2590);
    scr(() => { for (let i = 0; i < 26; i++) { const x = r() * W, y = H * (1.1 - d * (0.3 + r() * 1.0)) + Math.sin(t * 3 + i) * 20, rr = (160 + r() * 240) * (0.4 + d); ell(x, y, rr, rr * 0.8, { wash: i % 3 ? '#eef0f6' : '#c8ccd8', washA: 0.9 * d, line: false }); } ctx.save(); ctx.globalAlpha = Math.pow(d, 3); ctx.fillStyle = '#f2f4f8'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
