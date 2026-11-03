/* 020 — сцена `war42`: октябрь 1942, ночь над грозненскими промыслами. Горят резервуары и вышки, столбы чёрного дыма в багровом зареве,
   прожектора шарят по небу, аэростаты заграждения, тёмные силуэты бомбардировщиков (без опознавательных знаков), трассы зениток.
   Внизу — пожарные с брандспойтами, солдаты, рабочие тащат шланг, зенитка с расчётом. На «Гитлер» — карта Кавказа: стрела наступления
   ползёт к Грозному; на «Не дошёл» — стрела упирается в красный барьер; на «в сто раз» — график суточной добычи 9456 т → 80 т.
   Переход В сцену — фонтан нефти вспыхивает, пламя поднимается снизу и сжигает кадр 1893-го. */
(() => {
  EV.w4_hit = wtk('s4', 'Гитлер');
  EV.w4_stop = wtk('s4', 'дошёл');
  EV.w4_bomb = wtk('s4', 'бомбёжки');
  EV.w4_100 = wtk('s4', 'сто');
  SHAKES.push([EV.w4_bomb, 0.4, 12], [EV.w4_bomb + 0.7, 0.3, 8]);
  KEYW.push('нефти.', 'дошёл', 'раз.');

  function sky(t) {
    vgrad(-900, 1300, ['#0a0810', '#1e1020', '#5a1a14', '#c84a1a', '#ff8a2a'], 1);
    for (const [x, a0, sp] of [[100, -1.2, 0.5], [600, -1.9, 0.7], [1000, -2.3, 0.4]]) beam(x, 1150, a0 + Math.sin(t * sp + x) * 0.3, 2000, 0.35, 'rgba(220,230,255,1)');
    for (let k = 0; k < 3; k++) { const x = 150 + k * 380, y = -300 + k * 80 + Math.sin(t + k) * 10; ell(x, y, 50, 22, { wash: '#4a4048', washA: 1, w: 1.6, col: '#0a0808' }); pencil([[x, y + 22], [x + 10, y + 700]], { w: 1, col: '#2a2020', a: 0.6, pass2: false }); }   // аэростаты
    for (let k = 0; k < 3; k++) { const x = ((t * 120 + k * 500) % 1900) - 400, y = -420 + k * 70; push(x, y, 0.5); sil([[-80, 0], [60, -6], [90, 0], [60, 6]], '#0a0608', 0.95); sil([[-10, 0], [10, -90], [30, -90], [20, 0], [30, 90], [10, 90]], '#0a0608', 0.95); sil([[-80, 0], [-96, -30], [-88, 0], [-96, 30]], '#0a0608', 0.95); pop(); }   // силуэты бомбардировщиков
    const r = rng(hsh(FRAME, 42)); for (let i = 0; i < 6; i++) { const x0 = 200 + r() * 700; pencil([[x0, 1100], [x0 + (r() - 0.5) * 400, 1100 - 900 - r() * 500]], { w: 2.4, col: '#ffd07a', a: 0.5 + r() * 0.4, pass2: false, gap: false }); }   // трассы зениток
    for (let k = 0; k < 5; k++) { const ph = (t * 1.3 + k * 0.29) % 1; if (ph < 0.15) { const x = 150 + k * 200, y = -200 + (k % 3) * 120; glow(x, y, 80, 'rgba(255,220,150,1)', 0.8 * (1 - ph / 0.15)); ell(x, y, 30, 30, { wash: '#3a2a2a', washA: 0.6 * (ph / 0.15), line: false }); } }   // разрывы
  }
  function far(t) {
    caucasus(1050, t, { col: '#3a1e30', colD: '#140810', snow: '#c86a4a', h: 300, seed: 11, a: 0.85 });
    foothills(1120, t, '#2a1414', '#0a0404', 9, 90);
    for (let k = 0; k < 6; k++) { const x = -150 + k * 260; smokeCol(x, 1110, t + k * 0.7, { n: 18, h: 1500, sz: 1.9, col: '#1a0e0a', a: 0.38, wind: 320, sp: 0.1 }); glow(x, 1100, 200, 'rgba(255,120,40,1)', 0.6); }
  }
  function mid(t) {                                                // горящий резервуарный парк, вышки-силуэты, НПЗ
    const L = '#0a0606';
    shape([[-600, 1180], [1700, 1170], [1700, 1400], [-600, 1400]], { wash: '#2a1410', washA: 1, w: 0, line: false });
    for (const [x, w, h] of [[-120, 200, 140], [200, 170, 120], [820, 220, 150], [1130, 180, 120]]) { tank(x, 1260, w, h, t, { col: '#4a3430' }); const r = rng(hsh(FRAME, x));
      for (let q = 0; q < 6; q++) { const fx = x - w / 2 + 20 + q * (w - 40) / 5, fh = 120 + r() * 120; blob([[fx - 26, 1260 - h], [fx - 20 - r() * 10, 1260 - h - fh * 0.6], [fx, 1260 - h - fh], [fx + 22, 1260 - h - fh * 0.5], [fx + 26, 1260 - h]], { wash: '#ff8a1a', washA: 0.95, w: 1.4, col: '#a82a0a', a: 0.6 }); blob([[fx - 10, 1260 - h], [fx - 6, 1260 - h - fh * 0.4], [fx + 8, 1260 - h - fh * 0.55], [fx + 10, 1260 - h]], { wash: '#ffe08a', washA: 0.9, line: false }); }
      glow(x, 1260 - h - 60, w * 1.6, 'rgba(255,140,40,1)', 0.6); }
    for (let k = 0; k < 4; k++) { push(420 + k * 110, 1270, 0.36); derrick(0, 0, 1, t, { wood: '#140a06' }); pop(); }
    flare(560, 1270, 320, t);
    for (let k = 0; k < 6; k++) { const x = 380 + k * 90; pencil([[x, 1300], [x + 20, 1260]], { w: 6, col: '#1a0e0a', pass2: false }); }
  }
  function crews(t) {                                              // пожарные, зенитный расчёт, рабочие со шлангом
    const L = '#0a0606', sp = Math.sin(t * 12);
    for (const [x, sd, fl] of [[700, 141, 1], [780, 142, 1], [860, 143, -1]]) human(x, 1410, 0.62, t, { body: '#3a2a1a', legs: '#1a120a', hat: 'helmet', seed: sd, armR: 'hold', armL: 'hold', flip: fl });
    pencil(spline([[640, 1390], [720, 1350], [800, 1360], [880, 1340]], false, 10), { w: 10, col: '#4a3a2a', pass2: false });
    for (let k = 0; k < 12; k++) { const f = k / 12; pencil([[880 + f * 260, 1330 - f * 260 - sp * 6], [890 + f * 260 + 20, 1325 - f * 260 - sp * 6]], { w: 6 - f * 3, col: '#c8e0f0', a: 0.7, pass2: false, gap: false }); }   // струя воды
    push(1060, 1430, 0.7); const L2 = '#0a0606'; rect(-80, -40, 160, 40, { wash: '#3a3a2a', washA: 1, w: 2, col: L2 }); pencil([[0, -40], [120, -220]], { w: 14, col: '#2a2a20', pass2: false }); for (const sd of [-1, 1]) ell(sd * 60, -4, 20, 20, { wash: '#1a1a14', washA: 1, w: 1.6, col: L2 }); if (Math.sin(t * 10) > 0.6) glow(124, -228, 60, 'rgba(255,220,140,1)', 0.9); pop();   // зенитка
    human(1000, 1440, 0.6, t, { body: '#5a5a3a', legs: '#3a3a2a', hat: 'helmet', seed: 144, armR: 'up' }); human(1130, 1450, 0.62, t, { body: '#5a5a3a', legs: '#3a3a2a', hat: 'helmet', seed: 145, armR: 'point', flip: -1 });
    human(520, 1420, 0.6, t, { body: '#4a3a2a', legs: '#1a120a', hat: 'cap', hatCol: '#1a1410', seed: 146, armL: 'hold', armR: 'hold' }); human(440, 1430, 0.6, t, { body: '#3a3028', legs: '#1a120a', hat: 'scarf', hatCol: '#8a6a5a', seed: 147, armR: 'hold', long: 1 });   // рабочая с ведром
    human(180, 1440, 0.62, t, { body: '#5a5a3a', legs: '#3a3a2a', hat: 'helmet', seed: 148, armR: 'wave', flip: -1 });
  }
  function ground(t) {
    const g = rect(-600, 1440, 2400, 700, { wash: '#2a1812', washA: 1, w: 0, line: false }); hatch(g.path, g.bb, { gap: 12, a: 0.15, col: '#000', ang: 0.2, w: 1 });
    for (let k = 0; k < 6; k++) { const x = 100 + k * 190, y = 1600 + (k % 2) * 60; ell(x, y, 90, 20, { wash: '#0a0604', washA: 0.9, w: 1.4, col: '#ff8a3a', a: 0.3 }); pencil([[x - 50, y - 4], [x + 30, y - 6]], { w: 3, col: '#ff9a4a', a: 0.6, pass2: false }); }   // лужи нефти с отблеском пожара
    for (let k = 0; k < 5; k++) { const x = 600 + k * 80; push(x, 1560 + (k % 2) * 20, 0.8); const b = blob([[-34, 0], [-40, -50], [-34, -100], [34, -100], [40, -50], [34, 0]], { wash: '#c83a2a', washA: 1, w: 2, col: '#1a0a0a' }); pop(); }   // красные пожарные бочки
    sack(1000, 1620, 1.0, '#a8906a'); sack(1060, 1640, 0.9, '#a8906a'); sack(1120, 1610, 1.0, '#a8906a'); crate(1160, 1700, 110, 70, { txt: 'ПЕСОК', col: '#6a4a2a' });   // мешки с песком
    for (let k = 0; k < 4; k++) { push(80 + k * 60, 1680, 0.9, -0.2 + k * 0.1); rect(-6, -100, 12, 100, { wash: '#6a4a2a', washA: 1, w: 1.4 }); poly([[-20, -100], [20, -100], [14, -130], [-14, -130]], { wash: '#c83a2a', washA: 1, w: 1.4 }); pop(); }   // пожарный щит: лопаты, конусные вёдра
    const r = rng(19421); for (let k = 0; k < 30; k++) { const x = -200 + r() * 1500, y = 1700 + r() * 300; ell(x, y, 8 + r() * 18, 5 + r() * 8, { wash: '#4a3028', washA: 1, w: 1.2, col: '#0a0606', a: 0.6 }); }
    pencil([[200, 1800], [1300, 1760]], { w: 18, col: '#3a3030', pass2: false }); pencil([[200, 1800], [1300, 1760]], { w: 3, col: '#ff8a3a', a: 0.4, pass2: false });   // труба
  }
  function front(t) { wire(-200, 160, 1900, 200, t, { step: 120, post: 10, col: '#0a0606', wood: '#1a0e0a' }); wire(1000, 1400, 1920, 220, t, { step: 120, post: 10, col: '#0a0606', wood: '#1a0e0a' }); pencil([[1260, 2100], [1200, 600]], { w: 34, col: '#0e0808', pass2: false }); }
  function hud(t) {
    const L = '#1a120a';
    if (t > EV.w4_hit - 0.1 && t < EV.w4_bomb + 0.2) { const k = popK(t, EV.w4_hit - 0.1, 0.4) * (1 - sm((t - EV.w4_bomb) / 0.2)); push(680, 900, 0.95 * k, 0.03);
      rect(-220, -170, 440, 340, { wash: '#efe0c0', washA: 0.97, w: 2.4, col: L }); txt('КАВКАЗ · 1942', 0, -136, 30, { col: '#3a1a0a', font: 'Osw' });
      pencil(spline([[-200, 60], [-120, 20], [-20, 40], [60, 0], [200, 30]], false, 10), { w: 3, col: '#4a6a9a', pass2: false }); ell(110, 40, 12, 12, { wash: '#1a1a1a', washA: 1, line: false }); txt('Грозный', 120, 76, 26, { font: 'Hand', col: L }); txt('Баку', 180, 140, 22, { font: 'Hand', col: L }); txt('Майкоп', -150, -40, 22, { font: 'Hand', col: L });
      const pr = sm(clamp((t - EV.w4_hit) / (EV.w4_stop - EV.w4_hit))); const ex = lerp(-190, 40, pr), ey = lerp(-90, 20, pr); pencil([[-190, -90], [ex, ey]], { w: 16, col: '#3a3a3a', a: 0.85, pass2: false }); poly([[ex, ey - 22], [ex + 34, ey + 8], [ex - 6, ey + 26]], { wash: '#3a3a3a', washA: 1, w: 1.4 });
      if (t > EV.w4_stop) { const q = popK(t, EV.w4_stop, 0.3); pencil([[60, -50], [70, 80]], { w: 16 * q, col: '#c8262a', pass2: false }); txt('СТОП', 70, -80, 34 * q, { col: '#c8262a', font: 'Osw' }); }
      pop(); }
    if (t > EV.w4_100 - 0.25) { const k = popK(t, EV.w4_100 - 0.25, 0.4); push(700, 940, 0.95 * k, -0.02);
      rect(-220, -170, 440, 340, { wash: '#efe0c0', washA: 0.97, w: 2.4, col: L }); txt('ДОБЫЧА НЕФТИ, т/сутки', 0, -136, 26, { col: '#3a1a0a', font: 'Osw' });
      rect(-160, -100, 120, 220, { wash: '#2a2420', washA: 1, w: 2, col: L }); txt('9 456', -100, 150, 30, { col: L, font: 'Osw' }); txt('1941', -100, -76, 22, { col: '#efe0c0', font: 'Osw' });
      const hh = lerp(220, 4, sm(clamp((t - EV.w4_100) / 0.5))); rect(60, 120 - hh, 120, hh, { wash: '#c8262a', washA: 1, w: 2, col: L }); txt('80', 120, 150, 30, { col: '#c8262a', font: 'Osw' }); txt('1942', 120, 96, 22, { col: L, font: 'Osw' });
      txt('÷100', 0, -20, 54, { col: '#c8262a', font: 'Osw', rot: -0.1 }); pop(); }
  }

  WORLD.war42 = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(8, () => mid(t));
    lay(3, () => crews(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    motes(90, [-200, -200, 1300, 2000], '#ff9a4a', t, 19422, { sp: -60, vx: 30, sz: 3, a: 0.8, add: 1, wob: 30 });   // искры вверх
    motes(50, [-200, -200, 1300, 2000], '#2a2020', t, 19423, { sp: 40, vx: 20, sz: 4, a: 0.6, wob: 20 });          // пепел
    haze('#ff6a2a', 0.07);
  };
  DIR.war42 = {
    outfit: 'voen', light: { side: 1, rim: '#ff8a3a' }, grade: ['#8a2a10', 0.16], hud,
    act: () => [[S0.war42, 'annoyed'], [EV.w4_hit, 'suspicious'], [EV.w4_stop, 'proud'], [EV.w4_bomb, 'scared'], [EV.w4_100, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1530, s: 1.0, look: t < EV.w4_bomb ? [0.6, -0.3] : [0.4, -0.8], squash: b.squash + (t > EV.w4_bomb && t < EV.w4_bomb + 0.2 ? 0.08 : 0), sweat: t > EV.w4_bomb }),
    cam: () => [[S0.war42, 600, 1000, 0.2, 'x'], [EV.w4_hit, 620, 1020, 0.08], [EV.w4_bomb, 600, 980, 0.04], [S1.war42, 580, 1000, 0.12]]
  };
  TRANS_IN.war42 = { a: 0.2, b: 0.3, fx(k, t, A, B) {             // нефть вспыхивает: огненная стена поднимается снизу, за ней — ночь 1942-го
    const lvl = lerp(2100, -300, sm(k));
    drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, W, Math.max(0, lvl)); ctx.clip(); drawBuf(A); ctx.restore();
    scr(() => { const r = rng(hsh(FRAME, 777)); for (let i = 0; i < 22; i++) { const x = i * 52 - 20, fh = 120 + r() * 260;
      blob([[x - 40, lvl + 80], [x - 30, lvl - fh * 0.5], [x, lvl - fh], [x + 34, lvl - fh * 0.4], [x + 44, lvl + 80]], { wash: i % 2 ? '#ff8a1a' : '#ffb03a', washA: 0.95, w: 1.4, col: '#a82a0a', a: 0.5 }); blob([[x - 14, lvl + 60], [x - 10, lvl - fh * 0.4], [x + 12, lvl - fh * 0.5], [x + 16, lvl + 60]], { wash: '#fff0a0', washA: 0.9, line: false }); }
      glow(540, lvl, 900, 'rgba(255,140,40,1)', 0.6); });
  } };
})();
