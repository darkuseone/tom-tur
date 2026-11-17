/* 030 — сцена `river`: январь 1502, вход в залив Гуанабара. Утро, солнце слева (главный свет), бирюза залива — второй.
   Слева холмы Нитероя, справа Сахарная Голова, вдали Корковаду и джунгли. В залив входит португальская каравелла (паруса без символики),
   на берегу деревня тамойо: хижины-малоки, гамаки, каноэ, рыбаки с сетями, попугаи и тукан. Том (explorer) на песке с картой-пергаментом.
   На «январе» — листок «ЯНВАРЬ 1502»; на «залив за реку» на карте от залива вглубь суши рисуется пунктир «РЕКА?»; на «Реки тут нет» пунктир
   перечёркивается красным, Том смотрит в подзорную трубу; плашка «RIO DE JANEIRO = ЯНВАРСКАЯ РЕКА». Переход В: парус проносится через кадр. */
(() => {
  EV.rv_jan = wtk('s2', 'январе');
  EV.rv_port = wtk('s2', 'португальцы');
  EV.rv_bay = wtk('s2', 'залив');
  EV.rv_no = wtk('s2', 'нет');
  KEYW.push('легенде,', 'реку.', 'пор.');
  const L = RJ.ink, SUN = [180, 420];
  function sky(t) { vgrad(-900, 1050, ['#3a8ad8', '#8ac8ec', '#e8f4f0', '#fff0c8'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 58, 58, { wash: '#fffbe0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(6300 + i), y = 330 + i * 90, dx = (t * 10) % 200; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#ffffff', washA: 0.55, line: false }); }
    for (let i = 0; i < 5; i++) gull(300 + i * 160 + Math.sin(t + i) * 30, 600 + (i % 2) * 40, 0.6, t, i + 3); }
  function hills(t) {                                                // Нитерой слева, Корковаду вдали, Сахарная Голова справа — без города
    blob([[-500, 1020], [-360, 760], [-220, 700], [-60, 780], [80, 900], [200, 1020]], { wash: '#2a7a3a', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.25, col: RJ.greenD, ang: 1.2 } });
    corcovado(420, 1010, 0.5, t, { statue: false, col: '#3a7a4a' }); sugarloaf(960, 1020, 0.66, t, { cable: false });
    for (let i = 0; i < 30; i++) { const r = rng(6310 + i), x = -480 + r() * 650, y = 1000 - r() * 230 * (1 - Math.abs(x + 200) / 450); ell(x, y, 18 + r() * 14, 12 + r() * 8, { wash: i % 2 ? RJ.green : RJ.greenL, washA: 0.8, line: false }); }
    depthFog('#d8eef4', 0.05); }
  function bay(t) {                                                  // залив и каравелла
    seaKR(1010, 1240, t, 6320, { cols: ['#3ac0c8', '#1e9ab8', '#0e6a8a'], glint: '#fff6d0', gx: 240, n: 26 });
    const k = clamp((t - EV.rv_port + 0.4) / 3.0); shipRJ(lerp(1400, 640, sm(k)), 1150, 0.5, t, 'caravel', 1, { stripe: '#c8281e' });
    for (let i = 0; i < 2; i++) { const x = 200 + i * 300 + Math.sin(t * 0.8 + i) * 30; push(x, 1180, 0.6); shape([[-110, -10], [110, -10], [80, 14], [-80, 14]], { wash: '#8a5a32', washA: 1, w: 1.6, col: L }); for (const q of [-40, 40]) human(q, -10, 0.5, t, { body: '#a8704a', skin: '#a8704a', legs: '#a8704a', armR: 'swing', prop: 'oar', seed: 6330 + i * 2 + q, face: 'calm' }); pop(); }
  }
  function village(t) {                                              // деревня тамойо: малоки, гамаки, люди, попугаи, тукан
    rect(-500, 1240, 2200, 160, { wash: RJ.sand, washA: 1, w: 2, col: L });
    for (const [x, s] of [[-260, 1], [60, 0.8], [1120, 0.9]]) { push(x, 1260, s); blob([[-180, 0], [-160, -120], [-60, -200], [60, -200], [160, -120], [180, 0]], { wash: '#c8a058', washA: 1, w: 2, col: L, shade: { gap: 4, a: 0.35, col: '#7a5a2a', ang: 1.4 } }); for (let q = 0; q < 8; q++) pencil([[-170 + q * 48, -10], [-140 + q * 40, -160]], { w: 2, col: '#7a5a2a', a: 0.7, pass2: false }); rect(-30, -90, 60, 90, { wash: '#2a1a10', washA: 1, w: 1.4, col: L }); pop(); }
    pencil([[860, 1180], [880, 1260]], { w: 6, col: RJ.woodD, pass2: false }); pencil([[1000, 1180], [990, 1260]], { w: 6, col: RJ.woodD, pass2: false }); const hs = Math.sin(t * 2) * 8; blob([[870, 1190], [930, 1220 + hs], [990, 1190], [930, 1206 + hs]], { wash: '#e8603a', washA: 1, w: 1.6, col: L });
    const P = [[-140, 'up', 'spear'], [170, 'hold', null], [300, 'point', null], [520, 'swing', 'stick'], [700, 'wave', null], [1240, 'hold', null]];
    P.forEach(([x, a, pr], i) => human(x, 1300, 0.62, t, { body: i % 2 ? '#c8783a' : '#a8603a', skin: '#a8704a', legs: '#a8704a', hair: '#1a1008', armR: a, prop: pr, hat: i === 2 ? 'crown' : undefined, hatCol: '#f8d030', flip: x > 600 ? -1 : 1, seed: 6340 + i, face: t > EV.rv_port ? 'shock' : 'smile' }));
    for (let i = 0; i < 3; i++) { const x = 820 + i * 60 + Math.sin(t * 3 + i) * 40, y = 860 + Math.cos(t * 2 + i) * 30; push(x, y, 0.8); blob([[-20, 0], [0, -14], [24, 0], [0, 12]], { wash: ['#e8281e', '#2a8ae8', '#f8d030'][i], washA: 1, w: 1.4, col: L }); pencil([[-20, 0], [-40, -10 + Math.sin(t * 12 + i) * 12]], { w: 6, col: ['#e8281e', '#2a8ae8', '#f8d030'][i], pass2: false }); pop(); }
  }
  function ground(t) {                                               // песок, ракушки, краб, сеть, корзина фруктов, пальма, каноэ
    rect(-500, 1420, 2200, 900, { wash: '#f0dcae', washA: 1, w: 2, col: L }); const r = rng(6350); for (let i = 0; i < 60; i++) ell(r() * 2000 - 400, 1440 + r() * 480, 4 + r() * 6, 3 + r() * 3, { wash: i % 3 ? '#d8bc8a' : '#f4e8d0', washA: 1, line: false });
    lightPool(SUN[0] + 300, 1660, 800, 160, 'rgba(255,240,190,1)', 0.35);
    push(860, 1700, 1); shape([[-220, -30], [220, -30], [180, 10], [-180, 10]], { wash: '#7a4a24', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#3a2010', ang: 0 } }); pop();
    push(1100, 1800, 1); ell(0, -30, 70, 40, { wash: '#a8783a', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-40 + q * 20, -60, 16, 16, { wash: ['#f8d030', '#e86a2a', '#7ac868', '#c8281e', '#f8d030'][q], washA: 1, w: 1.2, col: L }); pop();
    for (let q = 0; q < 6; q++) pencil([[520 + q * 30, 1760], [600 + q * 22, 1880]], { w: 2, col: '#6a5a3a', a: 0.6, pass2: false }); for (let q = 0; q < 4; q++) pencil([[520, 1770 + q * 30], [700, 1760 + q * 30]], { w: 2, col: '#6a5a3a', a: 0.6, pass2: false });
    push(-60, 1860, 0.8); ell(0, 0, 26, 16, { wash: '#e8603a', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) pencil([[sd * 20, -6], [sd * 40, -26 + Math.sin(t * 8) * 6]], { w: 4, col: '#e8603a', pass2: false }); pop();
    palm(1250, 1640, 620, t, 4);
    castShadow(330, 1640, 120, 480, 0.4, 0.35); moodDark(1100, 900, 900, 1800, '#0e2a3a', 0.25);
  }
  function front(t) { for (const [x, f] of [[-120, 1], [1220, -1]]) for (let q = 0; q < 4; q++) { push(x, 2000 - q * 120, 1.2, f * (0.3 + q * 0.2)); blob([[0, 0], [f * 120, -200], [f * 240, -260], [f * 160, -100]], { wash: q % 2 ? '#0e3a18' : '#1a5a24', washA: 1, w: 1.6, col: '#06140a' }); pop(); } }
  function chart(t, P) {                                             // карта-пергамент в лапах: залив, пунктир «реки», перечёркивание
    const x = P.x + 360 * P.s, y = P.y - 470 * P.s, k = popK(t, EV.rv_bay - 0.2, 0.3); if (t < EV.rv_bay - 0.2) return; push(x, y, k * 0.82, -0.06);
    rect(-210, -150, 420, 300, { wash: '#f0e2c0', washA: 1, w: 3, col: L }); ell(-210, 0, 18, 150, { wash: '#d8c8a0', washA: 1, w: 2, col: L }); ell(210, 0, 18, 150, { wash: '#d8c8a0', washA: 1, w: 2, col: L });
    shape([[-190, 120], [190, 120], [190, 40], [60, 50], [20, 0], [-10, -40], [-60, -50], [-50, 0], [-80, 40], [-190, 40]], { wash: '#8ac0d8', washA: 1, w: 2, col: L });
    const rk = clamp((t - EV.rv_bay) / 0.6); if (rk > 0) { const pts = [[-30, -45], [-20, -80], [10, -100], [40, -120], [80, -130]].slice(0, 1 + Math.ceil(rk * 4)); pencil(pts, { w: 5, col: '#1e6aa8', pass2: false, gap: true }); txt('РЕКА?', 110, -110, 26, { col: '#1e6aa8', font: 'Osw', a: rk }); }
    if (t > EV.rv_no) { const q = clamp((t - EV.rv_no) / 0.3); pencil([[-60, -140 + 0], [-60 + 200 * q, -140 + 80 * q]], { w: 8, col: RJ.red, pass2: false }); pencil([[140, -140], [140 - 200 * q, -140 + 80 * q]], { w: 8, col: RJ.red, pass2: false }); }
    txt('ЯНВАРЬ', -130, 80, 26, { col: L, font: 'Osw' }); pop();
  }
  WORLD.river = (t, u, cat) => {
    lay(40, () => sky(t)); lay(20, () => hills(t)); lay(8, () => bay(t)); lay(3.2, () => { village(t); depthFog('#e8f4f0', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 6360, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.river = {
    outfit: 'explorer', light: { side: -1, rim: '#fff0c0' }, grade: ['#1a4a5a', 0.05],
    act: () => [[S0.river, 'suspicious'], [EV.rv_port, 'awe'], [EV.rv_bay, 'smug'], [EV.rv_no, 'sideeye']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(120, 300, sm(w1)); return Object.assign(b, { x, y: 1640, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: t > EV.rv_no ? [0.9, -0.5] : [0.6, -0.4],
      hand: t > EV.rv_bay - 0.2 ? [190, -380] : [150, -300], prop: t > EV.rv_no ? 'spyglass' : undefined }); },
    afterCat: (t, u, P) => chart(t, P),
    hud: t => { if (t > EV.rv_jan - 0.05 && t < EV.rv_bay) { push(780, 860, popK(t, EV.rv_jan - 0.05, 0.3), 0.06); rect(-90, -100, 180, 200, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); rect(-90, -100, 180, 44, { wash: RJ.red, washA: 1, w: 1.6, col: L }); txt('ЯНВАРЬ', 0, -77, 26, { col: '#fff', font: 'Osw' }); txt('1502', 0, 10, 64, { col: L, font: 'Osw' }); pop(); }
      infoPlate(560, 760, [['RIO DE JANEIRO', 52, RJ.goldL], ['= «ЯНВАРСКАЯ РЕКА»', 40]], t, EV.rv_no + 0.15); },
    cam: () => [[S0.river, 600, 920, -0.1], [EV.rv_port, 700, 960, -0.04], [EV.rv_bay - 0.2, 520, 1040, 0.06], [EV.rv_bay + 0.3, 460, 1060, 0.14, 'x'], [EV.rv_no, 520, 1000, 0.08], [S1.river, 540, 980, 0.12]]
  };
  TRANS_IN.river = { a: 0.08, b: 0.36, fx(k, t, A, B) {             // парус проносится через кадр
    const e = sm(k), X = -1300 + e * 2700; drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(X + 600, 0, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => { const bw = Math.sin(t * 8) * 40; shape([[X, -60], [X + 700, -60], [X + 640 + bw, 1980], [X - 60 + bw, 1980]], { wash: '#f4ecd8', washA: 1, w: 4, col: RJ.ink, shade: { gap: 14, a: 0.15, col: '#a89878', ang: 1.57 } }); pencil([[X + 330, -60], [X + 300 + bw, 1980]], { w: 26, col: RJ.red, pass2: false }); }); } };
})();
