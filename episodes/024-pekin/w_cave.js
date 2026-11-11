/* 024 — сцена `cave`: 1929, ТАЙНА 3 — пещера Чжоукоудянь под Пекином, декабрь. Камера проваливается сверху (устье пещеры: снег, голые деревья,
   холодный свет) вниз, в раскоп: уступы с колышками и бечёвкой, землекопы в ватниках со свечами, кирками и корзинами, блок с верёвкой,
   сито, ящики, в стенах — рога, челюсти, каменные орудия. Том-шахтёр светит фонарём каски на каменную стенку и кистью смахивает пыль:
   на «нашли» пыль слетает, на «череп» из породы проступает череп и светится золотом — все оборачиваются; на «полмиллиона» шкала слоёв
   досчитывает до ≈ 500 000 лет. Главный свет — луч фонаря Тома (тёплый), второй — холодный день из устья.
   Переход В сцену — тушь стекает сверху вниз. */
(() => {
  EV.cv_brush = wtk('s4', 'глубже.');
  EV.cv_dust = wtk('s4', 'нашли');
  EV.cv_skull = wtk('s4', 'череп:');
  EV.cv_age = wtk('s4', 'полмиллиона');
  EV.cv_end = wtk('s4', 'лет.');
  KEYW.push('глубже.', 'череп:', 'полмиллиона');
  SHAKES.push([EV.cv_skull, 0.25, 8]);
  const L = BJ.ink, SX = 760, SY = 1230, HX = 372, HY = 1112;        // череп в стенке; фонарь каски
  const rev = t => sm((t - EV.cv_dust) / (EV.cv_skull - EV.cv_dust + 0.15)), gl = t => t > EV.cv_skull ? 0.7 + 0.3 * Math.sin((t - EV.cv_skull) * 5) : 0;
  function sky(t) { vgrad(-1200, 1200, ['#8aa8d0', '#c8d4e4', '#f0d8d0', '#f8e8d0'], 1); glow(200, 200, 500, 'rgba(255,250,235,1)', 0.6); cloudsBJ(t, -200, 4, '#ffffff', 2550, 0.7); birdsBJ(t, 4, [-200, -100, 700, 400], 2551, '#3a3a4a'); }
  function hillsF(t) {                                              // «Гора драконьих костей» в снегу, голые деревья, храм
    hills(560, 160, '#b8c4d8', 0.7, 1); hills(660, 90, '#e8ecf4', 2.9, 1);
    for (let i = 0; i < 9; i++) { const x = -260 + i * 120, y = 640 - Math.sin(i * 1.7) * 40; pencil([[x, y], [x + 6, y - 110]], { w: 5, col: '#3a3038', pass2: false }); for (let k = 0; k < 5; k++) pencil([[x + 6, y - 60 - k * 12], [x + 6 + (k % 2 ? 1 : -1) * (30 + k * 6), y - 100 - k * 16]], { w: 2, col: '#3a3038', pass2: false }); }
    hallCN(60, 620, 150, 60, { bays: 3, rh: 50, wall: '#8a4a44', roof: { col: '#e8ecf4', colD: '#9aa8c0', ev: 20, shade: false } });
    motes(40, [-400, -200, 900, 900], '#ffffff', t, 2552, { sp: -40, vx: 20, sz: 3, a: 0.8, wob: 26 }); depthFog('#dfe6f2', 0.2); }
  function mouth(t) {                                               // скальная масса с устьем слева вверху, наледь, леса
    shape([[-1200, 3000], [-1200, 980], [-330, 900], [80, 760], [300, 520], [470, 300], [760, 120], [1300, -80], [2200, -200], [2200, 3000]], { wash: '#3a2c2a', washA: 1, w: 3, col: L, shade: { gap: 16, a: 0.25, col: '#120c0c', ang: 0.9 } });
    for (const [x, y, n] of [[110, 752, 5], [330, 500, 4], [520, 280, 5]]) for (let i = 0; i < n; i++) blob([[x + i * 26, y - i * 16], [x + i * 26 + 12, y - i * 16 + 4], [x + i * 26 + 6, y - i * 16 + 60 + (i % 2) * 40]], { wash: '#dfeaf6', washA: 0.95, w: 1.4, col: '#7a90b0' });   // сосульки
    shaft(120, 420, 520, 1500, -0.5, 'rgba(200,225,255,1)', 0.34); shaft(260, 380, 200, 1300, -0.42, 'rgba(230,240,255,1)', 0.22);
    for (let i = 0; i < 3; i++) { pencil([[330 + i * 150, 1500], [300 + i * 150, 560 - i * 130]], { w: 9, col: BJ.woodD, pass2: false }); } for (let j = 0; j < 4; j++) pencil([[310, 1260 - j * 200], [640, 1220 - j * 200]], { w: 7, col: BJ.wood, pass2: false });
    for (const [x, y, k] of [[900, 500, 0], [1060, 760, 1], [860, 880, 2], [1130, 1010, 0]]) { if (k === 0) { pencil(spline([[x, y], [x + 40, y - 50], [x + 90, y - 40]], false, 8), { w: 7, col: BJ.bone, pass2: false }); pencil([[x + 40, y - 50], [x + 50, y - 90]], { w: 5, col: BJ.bone, pass2: false }); pencil([[x + 70, y - 46], [x + 96, y - 84]], { w: 5, col: BJ.bone, pass2: false }); }
      else if (k === 1) { blob([[x, y], [x + 90, y - 10], [x + 100, y + 20], [x + 10, y + 30]], { wash: BJ.bone, washA: 1, w: 1.8, col: BJ.boneD }); for (let i = 0; i < 6; i++) rect(x + 10 + i * 14, y + 24, 8, 12, { wash: '#f4ead0', washA: 1, w: 1, col: BJ.boneD }); }
      else blob([[x, y], [x + 30, y - 40], [x + 60, y - 6], [x + 34, y + 30]], { wash: '#5a5e66', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.4, col: '#1a1c24', ang: 0.5 } }); }
    depthFog('#2a2030', 0.2); }
  function terraces(t) {                                            // раскоп: уступы, колышки с бечёвкой, землекопы, блок с корзиной, сито, ящики
    const g = gl(t);
    for (const [y, x0, c] of [[1140, 520, '#5a4234'], [1260, 380, '#684c3a'], [1380, 200, '#765844']]) { shape([[x0, y], [2200, y - 30], [2200, 2600], [x0 - 80, 2600], [x0 - 60, y + 60]], { wash: c, washA: 1, w: 2.6, col: L, shade: { gap: 14, a: 0.22, col: '#22140e', ang: 0.15 } });
      for (let i = 0; i < 7; i++) { const px = x0 + 60 + i * 150; pencil([[px, y - 6], [px, y - 44]], { w: 4, col: '#c8a878', pass2: false }); if (i) pencil([[px - 150, y - 38], [px, y - 38]], { w: 1.4, col: '#e8e0c8', a: 0.8, pass2: false }); } }
    const wk = (x, y, s, c, sd, o = {}) => { human(x, y, s, t, Object.assign({ body: c, legs: '#3a3432', hat: 'fur', hatCol: '#4a3828', seed: sd, look: t > EV.cv_skull ? [o.flip === -1 ? 0.8 : -0.8, 0.3] : undefined }, o)); if (t > EV.cv_skull + 0.1 && t < EV.cv_skull + 1.2) txt('!', x, y - 190 * s, 60 * s * popK(t, EV.cv_skull + 0.1, 0.25), { col: '#ffd24a', font: 'Osw' }); };
    wk(640, 1140, 0.44, '#5a5e7a', 2553, { prop: 'stick', armR: 'hold' }); wk(860, 1132, 0.44, '#6a5a48', 2554, { prop: 'candle', armR: 'hold', flip: -1 }); wk(1090, 1128, 0.46, '#4a5a4a', 2555, { flip: -1 });
    wk(540, 1262, 0.54, '#6a4a3a', 2556, { prop: 'candle', armR: 'hold' }); wk(1150, 1250, 0.56, '#3a4a6a', 2557, { flip: -1, prop: 'stick', armR: 'hold' }); wk(980, 1380, 0.6, '#5a4a5a', 2558, { flip: -1, hat: 'cap', hatCol: '#2a2a30', long: 1 });
    for (const [x, y] of [[860, 1040], [540, 1150]]) glow(x, y, 120, 'rgba(255,190,100,1)', 0.45 * flick(t, x));
    // блок с верёвкой и корзиной
    pencil([[900, 300], [900, 520]], { w: 3, col: '#c8b888', pass2: false }); ell(900, 300, 22, 22, { wash: BJ.woodD, washA: 1, w: 2.4, col: L }); const by = 760 + Math.sin(t * 1.2) * 70; pencil([[914, 300], [914, by]], { w: 3, col: '#c8b888', pass2: false }); blob([[884, by], [944, by], [936, by + 50], [892, by + 50]], { wash: '#b89a5a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.4, col: '#5a4420', ang: 0.8 } });
    for (const [x, y, lab] of [[1180, 1380, '№ 1'], [1100, 1384, '骨']]) crateW(x, y, 76, 54, { label: lab, ls: 24 });
    push(700, 1380, 1); pencil([[-40, 0], [-30, -70]], { w: 5, col: BJ.woodD, pass2: false }); pencil([[40, 0], [30, -70]], { w: 5, col: BJ.woodD, pass2: false }); rect(-50, -84, 100, 16, { wash: BJ.wood, washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) pencil([[-44 + i * 12, -68], [-44 + i * 12, -84]], { w: 1, col: L, a: 0.6, pass2: false }); pop();   // сито
    for (const [x, y, s] of [[820, 1378, 1], [600, 1258, 0.8], [1040, 1138, 0.7]]) { blob([[x - 40 * s, y], [x - 20 * s, y - 34 * s], [x + 26 * s, y - 30 * s], [x + 44 * s, y]], { wash: '#4a3428', washA: 1, w: 1.8, col: L }); pencil([[x + 30 * s, y], [x + 70 * s, y - 60 * s]], { w: 4 * s, col: '#8a6236', pass2: false }); }
    if (g) lightPool(SX, 1500, 700, 300, 'rgba(255,210,120,1)', 0.25 * g);
  }
  function rockFace(t) {                                            // стенка с черепом (плоскость героя), пол раскопа
    const r = rev(t), g = gl(t);
    shape([[-1200, 1560], [2200, 1540], [2200, 2600], [-1200, 2600]], { wash: '#6a4e3c', washA: 1, line: false });
    for (let i = 0; i < 7; i++) pencil([[-400, 1600 + i * i * 14 + i * 26], [1600, 1590 + i * i * 14 + i * 26]], { w: 1.6, col: '#2a1a12', a: 0.4, pass2: false });
    ctx.save(); const rr = rng(2559); for (let i = 0; i < 140; i++) { ctx.fillStyle = rr() < 0.5 ? 'rgba(30,18,12,0.5)' : 'rgba(200,170,130,0.4)'; const z = 3 + rr() * 8; ctx.fillRect(-200 + rr() * 1500, 1580 + rr() * 400, z, z * 0.6); } ctx.restore();
    blob([[600, 1580], [580, 1320], [630, 1100], [770, 1030], [930, 1050], [1000, 1230], [1020, 1580]], { wash: '#8a6e56', washA: 1, w: 3.2, col: L, shade: { gap: 10, a: 0.28, col: '#2a1a12', ang: 0.35 } });
    for (const [y, c] of [[1110, '#b89470'], [1390, '#a8845e'], [1470, '#64482f'], [1530, '#9a7a5a']]) pencil(spline([[610, y + 20], [780, y - 6], [1000, y + 14]], false, 10), { w: 14, col: c, a: 0.75, pass2: false });
    if (g) glow(SX, SY - 20, 330, 'rgba(255,214,120,1)', 0.55 * g);
    ell(SX, SY - 10, 104, 112, { wash: '#4a3426', washA: 0.6 * clamp(rev(t) * 2), line: false });
    skullPM(SX - 14, SY, 0.82, { a: clamp(r * 1.4) });
    if (r < 1) { const c = 1 - r; for (const [dx, dy, s] of [[-60, -70, 1.2], [40, -80, 1.0], [-30, 10, 1.3], [60, 30, 1.1], [0, 70, 1.2], [-80, 50, 0.9]]) ell(SX + dx, SY + dy - 10, 62 * s * c + 6, 50 * s * c + 6, { wash: '#8a6e56', washA: c, w: 1.4, col: '#5a4030', a: c * 0.7 }); }
    if (t > EV.cv_dust && t < EV.cv_skull + 0.5) for (let k = 0; k < 3; k++) puffK(SX - 60 + k * 40, SY - 30, 0.8, t, EV.cv_dust + k * 0.18, 0.5, 2560 + k, '#d8c0a0');
    if (g) { for (let i = 0; i < 8; i++) { const a = i * 0.785 + t; pencil([[SX + Math.cos(a) * 130, SY - 20 + Math.sin(a) * 130], [SX + Math.cos(a) * 180, SY - 20 + Math.sin(a) * 180]], { w: 4, col: '#ffe49a', a: 0.8 * g, pass2: false }); } }
    for (const [x, y] of [[560, 1575], [1010, 1572], [930, 1590]]) blob([[x - 46, y], [x - 20, y - 30], [x + 30, y - 24], [x + 50, y]], { wash: '#5a4030', washA: 1, w: 2, col: L });
    push(1000, 1570, 1, 0.1); pencil([[0, 0], [70, -40]], { w: 6, col: '#8a6236', pass2: false }); blob([[60, -56], [96, -40], [80, -22]], { wash: '#8a9098', washA: 1, w: 1.8, col: L }); pop();   // кирка
    candle(520, 1578, 0.9, t, 3, 1); crateW(180, 1580, 110, 74, { label: 'ZKD', ls: 30 }); rect(120, 1486, 90, 20, { wash: '#e8e0c8', washA: 1, w: 1.6, col: L });
    // луч фонаря каски
    const a = Math.atan2(SY - 20 - HY, SX - HX), sa = a - Math.PI / 2 + Math.sin(t * 2) * 0.02; shaft(HX, HY, 30, 520, sa, 'rgba(255,236,170,1)', 0.75); shaft(HX, HY, 150, 560, sa, 'rgba(255,220,140,1)', 0.3); lightPool(SX, SY - 20, 190, 190, 'rgba(255,230,160,1)', 0.4);
    castShadow(340, 1578, 180, 300, -0.9, 0.4); moodDark(SX - 120, 1200, 420, 1300, '#0a0612', 0.6);
  }
  function front(t) {                                               // рама: сталактиты сверху, глыба слева внизу, висящая верёвка с фонарём
    for (let i = 0; i < 9; i++) { const x = -260 + i * 200, h = 200 + (i * 97 % 260); sil([[x - 90, 120], [x + 90, 120], [x + 10, 120 + h]], '#0a0608', 1); } sil([[-600, -300], [1700, -300], [1700, 140], [-600, 140]], '#0a0608', 1);
    sil([[-560, 2500], [-560, 1500], [-330, 1420], [-200, 1620], [-150, 2500]], '#0a0608', 1);
    const sw = Math.sin(t * 1.4) * 0.05; push(1310, 120, 1, sw); pencil([[0, 0], [0, 760]], { w: 6, col: '#1a120c', pass2: false }); rect(-34, 760, 68, 96, { wash: '#1a120c', washA: 1, w: 2, col: '#000' }); glow(0, 806, 200, 'rgba(255,180,90,1)', 0.5 * flick(t, 6)); ell(0, 806, 16, 24, { wash: '#ffd890', washA: 0.9, line: false }); pop();
  }
  function hud(t) {
    if (t > EV.cv_brush && t < EV.cv_dust + 0.4) for (let k = 0; k < 2; k++) txt('шурх', 600 + k * 70, 1010 - k * 44, 40, { col: '#f0e0c0', font: 'Hand', rot: -0.15, a: 0.9 * Math.abs(Math.sin(t * 7 + k)) });
    if (t > EV.cv_skull + 0.2 && t < EV.cv_age) note('2 декабря 1929', 730, 880, t, EV.cv_skull + 0.2, EV.cv_age + 0.2, '#fff0c8', 52, -0.05, [[760, 910], [790, 980], [770, 1040]]);
    if (t > EV.cv_age - 0.05) { const q = popK(t, EV.cv_age - 0.05, 0.3), n = Math.round(lerp(0, 500, sm(clamp((t - EV.cv_age) / 1.1))) / 10) * 10; push(700, 850, q, -0.03); rect(-230, -78, 460, 156, { wash: '#16100a', washA: 0.92, w: 3.2, col: BJ.gold }); txt('≈ ' + n + ' 000 ЛЕТ', 0, -14, 72, { col: BJ.goldL, font: 'Osw' }); txt('возраст черепа', 0, 46, 34, { col: '#f0e0c0', font: 'Hand' }); pop(); }
  }
  WORLD.cave = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => hillsF(t));
    lay(8, () => mouth(t));
    lay(3.4, () => { push(0, -230, 1); terraces(t); pop(); });
    lay(1, () => { rockFace(t); cat(); });
    lay(0.62, () => front(t));
    lay(4, () => motes(30, [100, 300, 1200, 1500], '#fff0d0', t, 2561, { sp: 8, sz: 2.2, a: 0.55, wob: 16, add: 1 }));
    lay(0.8, () => motes(12, [-200, 600, 1300, 1900], '#e8d0b0', t, 2562, { sp: 12, sz: 8, a: 0.2, wob: 30 }));
    haze('#3a2a4a', 0.05);
  };
  DIR.cave = {
    outfit: 'miner', light: { side: 1, rim: '#ffd890' }, grade: ['#5a3a20', 0.1],
    act: () => [[S0.cave, 'smug'], [EV.cv_brush, 'suspicious'], [EV.cv_dust, 'awe'], [EV.cv_skull, 'shock'], [EV.cv_age, 'awe'], [EV.cv_end, 'proud']],
    pose: (t, u, b) => { const br = t > EV.cv_brush && t < EV.cv_skull + 0.1, sw = br ? Math.sin((t - EV.cv_brush) * 13) : 0;
      return Object.assign(b, { x: 340, y: 1578, s: 1.02, look: t < EV.cv_brush ? [0.3, 0.5] : [0.85, 0.1], prop: t < EV.cv_age ? 'brush' : undefined, propAng: br ? 0.5 + sw * 0.4 : -0.3,
        hand: br ? [262 + sw * 34, -360 + sw * 14] : t > EV.cv_age ? [240, -330] : [120, -260], point: t > EV.cv_age ? 1 : undefined, squash: t > EV.cv_skull && t < EV.cv_skull + 0.2 ? 0.14 : b.squash, tailUp: t > EV.cv_skull, tilt: br ? 0.06 : 0 }); },
    cam: () => [[S0.cave, 380, 420, 0.0], [S0.cave + 0.75, 600, 1010, 0.06, 'x'], [EV.cv_brush, 620, 1040, 0.12], [EV.cv_skull, 700, 1100, 0.3], [EV.cv_skull + 0.25, 640, 1040, 0.14, 'x'], [EV.cv_age, 640, 1000, 0.1], [S1.cave, 680, 1040, 0.2]],
    hud
  };
  TRANS_IN.cave = { a: 0.22, b: 0.26, fx(k, t, A, B) {              // тушь стекает сверху вниз потёками: сначала закрывает кадр, потом утекает, открывая пещеру
    const r = rng(2563), cov = k < 0.5 ? sm(k * 2) : 1, off = k < 0.5 ? 0 : sm((k - 0.5) * 2); drawBuf(k < 0.5 ? A : B);
    scr(() => { ctx.fillStyle = '#0e0806'; for (let i = 0; i < 18; i++) { const x = i * 62 - 10, d = 0.75 + r() * 0.5, y1 = cov * (H + 300) * d, y0 = off * (H + 400) * (0.7 + r() * 0.6) - 60; if (y1 > y0) { ctx.fillRect(x, y0, 66, y1 - y0); ctx.beginPath(); ctx.arc(x + 33, y1, 33, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.arc(x + 33, y0, 30, 0, 6.3); ctx.fill(); } } });
  } };
})();
