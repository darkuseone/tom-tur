/* 023 — сцена `kalinin`: декабрь 1941, город Калинин (так Тверь звали с 1931 по 1990). Морозное утро после освобождения:
   замёрзшая Волга, на том берегу — выгоревшие дома и собор без креста в дыму; на набережной — руины, сугробы, разбитая телега.
   В город входят бойцы в белых маскхалатах, горожане выходят навстречу, дети, женщины с узлами, санки. Без знаков и символики.
   На «Калинин» указатель «ТВЕРЬ» переворачивается на «КАЛИНИН»; на «оккупацией» — календарь «14 ОКТ → 16 ДЕК» с серой тенью;
   на «Освобождена» встаёт солнце, тень уходит, люди поднимают руки; на «первых.» — бирка «16.12.1941».
   Переход В сцену — иней: от центра кадра расползаются ледяные кристаллы, за ними — зима 1941. */
(() => {
  EV.kl_name = wtk('s6', 'Калинин');
  EV.kl_occ = wtk('s6', 'оккупацией.');
  EV.kl_free = wtk('s6', 'Освобождена');
  EV.kl_first = wtk('s6', 'первых.');
  KEYW.push('Калинин', 'оккупацией.', 'Освобождена');
  SHAKES.push([EV.kl_occ, 0.2, 6]);
  const L = TV.ink;
  const free = t => sm((t - EV.kl_free) / 0.8);
  function sky(t) { const f = free(t); vgrad(-900, 1250, [lerpC('#2a2e3a', '#4a6a9a', f), lerpC('#3a4050', '#7a9ac0', f), lerpC('#5a5a64', '#c0c8d8', f), lerpC('#6a6668', '#f0d0b0', f), lerpC('#7a7470', '#ffd8a0', f)], 1);
    if (f > 0) { glow(900, 1060, 500, 'rgba(255,190,120,1)', 0.55 * f); ell(900, 1080 - 60 * f, 70, 70, { wash: '#ffe8c0', washA: f, w: 1, col: '#c8805a', a: 0.4 * f }); rays(900, 1060, -Math.PI / 2, 2.2, 1500, 'rgba(255,220,170,0.5)', 0.1 * f, 9, t); }
    clouds(t, -460, 6, '#4a4e5a', 23801, 0.6); birds(t, 6, [-100, -100, 1200, 600], 23802, '#14141a'); }
  function far(t) {                                                 // тот берег: выгоревшие дома, собор в дыму, лёд Волги
    hills(1080, 20, '#4a4e58', 23803, 1);
    for (let i = 0; i < 7; i++) ruinBlock(-60 + i * 190, 1110, 150, 120 + (i * 41) % 80, t, { seed: 23804 + i });
    push(820, 1110, 0.3); rect(-40, -380, 80, 380, { wash: '#c8c4b8', washA: 1, w: 2, col: L }); rect(-50, -440, 100, 60, { wash: '#c8c4b8', washA: 1, w: 2, col: L }); pop();   // колокольня без креста
    for (const x of [200, 640, 1040]) smokeCol(x, 1000, t, { col: 'rgba(70,70,80,0.45)', h: 500, sz: 0.5, n: 4 });
    shape([[-400, 1110], [1600, 1106], [1600, 1250], [-400, 1250]], { wash: '#c8d4e0', washA: 1, w: 1.6, col: L, a: 0.5 });   // лёд
    for (let k = 0; k < 10; k++) pencil([[-100 + k * 140, 1150 + (k % 3) * 25], [-20 + k * 140, 1160 + (k % 3) * 25]], { w: 2, col: '#8a9ab0', a: 0.6, pass2: false });
    for (let k = 0; k < 5; k++) { const x = 140 + k * 220; human(x + ((t * 20) % 40), 1210, 0.2, t, { body: '#3a3a40', legs: '#2a2a30', hat: 'fur', hatCol: '#2a2a2a', seed: 2450 + k, long: 1 }); }   // люди идут по льду
  }
  function town(t) {                                                // ближний берег: руины, сломанный фонарь, указатель, бойцы входят
    for (const [x, w, h] of [[-60, 260, 360], [1120, 280, 420]]) ruinBlock(x, 1330, w, h, t, { seed: 23810 + x });
    rubble(300, 1330, 200, 23812); rubble(900, 1330, 240, 23813);
    push(560, 1330, 0.8); pencil([[0, 0], [0, -300]], { w: 8, col: '#3a3a3a', pass2: false });   // указатель города
    const flip = sm((t - EV.kl_name) / 0.35), sc = Math.cos(flip * Math.PI); push(0, -300, 1); ctx.scale(1, Math.abs(sc) + 0.02);
    rect(-150, -60, 300, 100, { wash: '#f0f0e8', washA: 1, w: 3, col: L }); txt(flip < 0.5 ? 'ТВЕРЬ' : 'КАЛИНИН', 0, 6, 50, { col: '#1e2a5a', font: 'Osw' }); pop(); pop();
    const f = free(t);
    for (let k = 0; k < 6; k++) { const x = 1300 - k * 90 - f * 260; soldier(x, 1350 + (k % 2) * 10, 0.4, t, { body: '#e8ecf0', legs: '#d8dce4', hat: 'hood', hatCol: '#e8ecf0', seed: 2460 + k, prop: k % 2 ? 'stick' : undefined, armR: 'hold', flip: -1, walk: t * 6 }); }   // бойцы в маскхалатах
  }
  function people(t) {                                              // горожане выходят навстречу: женщины с узлами, дети, старик
    const f = free(t);
    const P = [[300, '#5a4a4a', 'scarf'], [380, '#3a4a5a', 'fur'], [460, '#6a3a3a', 'scarf'], [620, '#4a4a3a', 'fur'], [700, '#7a5a3a', 'scarf'], [780, '#3a3a4a', 'fur']];
    P.forEach(([x, c, h], i) => human(x, 1440 + (i % 2) * 10, 0.44, t, { body: c, legs: '#2a2a30', long: h === 'scarf' ? 1 : 0, hat: h, hatCol: h === 'scarf' ? '#c8c0b0' : '#2a2a2a', beard: h === 'fur' && i % 2, seed: 2470 + i, armR: f > 0.5 ? 'wave' : 'hold', armL: f > 0.5 && i % 2 ? 'up' : 'hold', look: [0.6, -0.3] }));
    for (const x of [540, 860]) human(x, 1460, 0.3, t, { body: x > 600 ? '#8a3a3a' : '#3a5a7a', legs: '#2a2a30', hat: 'fur', hatCol: '#3a3a3a', seed: 2480 + x, armR: f > 0.5 ? 'up' : 'hold' });   // дети
  }
  function ground(t) {                                              // снег с тропой, санки, узлы, бидон, разбитая телега, печка-буржуйка
    shape([[-600, 1470], [1800, 1460], [1800, 2400], [-600, 2400]], { wash: '#e4eaf2', washA: 1, line: false });
    hatch(pathOf([[-600, 1470], [1800, 1460], [1800, 2400], [-600, 2400]]), { x: -200, y: 1470, w: 1500, h: 700 }, { ang: 0.1, gap: 18, w: 1.2, col: '#8a98b0', a: 0.3 });
    shape([[520, 1470], [640, 1470], [900, 2400], [300, 2400]], { wash: '#c8d0dc', washA: 1, line: false });   // протоптанная тропа
    push(820, 1700, 0.7); blob([[-120, 0], [-130, -20], [120, -20], [150, -40], [140, 0]], { wash: '#8a6440', washA: 1, w: 2, col: L }); pencil([[-110, 10], [140, 10], [170, -20]], { w: 5, col: '#3a2410', pass2: false }); sack(-40, -20, 0.6, '#a8a090'); sack(40, -20, 0.5, '#8a7a6a'); pop();   // санки с узлами
    push(1040, 1760, 0.7, 0.3); for (const wx of [-80, 80]) pencil(ellPts(wx, 0, 50, 50, 0, 0.05, 20), { w: 6, col: '#4a3a2a', pass2: false }); pencil([[-140, -20], [140, -40]], { w: 10, col: '#5a4030', pass2: false }); pop();   // разбитая телега
    push(400, 1720, 0.6); rect(-50, -120, 100, 120, { wash: '#3a3a3a', washA: 1, w: 2, col: L }); pencil([[20, -120], [20, -260]], { w: 12, col: '#3a3a3a', pass2: false }); glow(0, -60, 70, 'rgba(255,150,70,1)', 0.5 * flick(t)); rect(-30, -70, 60, 30, { wash: '#f08a30', washA: 1, w: 1.4, col: L }); pop();   // буржуйка
    horse(980, 1620, 0.5, t, { col: '#4a3424', flip: -1, walk: 0.6 }); push(1180, 1640, 0.7); blob([[-120, 0], [-130, -20], [120, -20], [150, -40], [140, 0]], { wash: '#7a5a3a', washA: 1, w: 2, col: L }); sack(-30, -20, 0.6, '#b8a890'); sack(40, -20, 0.55, '#7a6a5a'); pop();   // лошадь с санями
    human(700, 1640, 0.6, t, { body: '#6a3a3a', legs: '#2a2a30', long: 1, hat: 'scarf', hatCol: '#d8d0c0', seed: 2491, armL: 'hold', armR: free(t) > 0.5 ? 'wave' : 'hold', look: [0.5, -0.4] }); sack(740, 1560, 0.45, '#a8a090');
    human(600, 1660, 0.4, t, { body: '#3a5a7a', legs: '#2a2a30', hat: 'fur', hatCol: '#3a3a3a', seed: 2492, armR: free(t) > 0.5 ? 'up' : 'hold' });
    for (let k = 0; k < 7; k++) { push(160 + k * 22, 1800 - (k % 2) * 16, 1, 0.2 * (k % 3 - 1)); rect(-60, -10, 120, 20, { wash: '#7a5a3a', washA: 1, w: 1.4, col: L }); pop(); }   // поленница
    rubble(1000, 1940, 260, 23816); rubble(140, 1960, 200, 23817);
    for (let i = 0; i < 26; i++) { const y = 1500 + i * 32, x = 560 + Math.sin(i * 1.7) * 30 + (y - 1500) * 0.25; ell(x, y, 6 + i * 0.3, 3 + i * 0.15, { wash: '#a8b4c8', washA: 1, line: false }); }   // следы
    jug(500, 1820, 0.42, '#5a6a7a'); crate(1160, 1840, 110, 60, { col: '#6a5a4a' }); barrel(260, 1850, 0.5, '#4a4a4a'); sack(680, 1860, 0.5, '#a8a090');
    human(1160, 1700, 0.56, t, { body: '#4a4a5a', legs: '#2a2a30', hat: 'fur', hatCol: '#2a2a2a', beard: 1, seed: 2490, prop: 'stick', armR: 'hold', flip: -1, look: [-0.5, -0.5] });   // старик
    dog(980, 1880, 0.32, t, { col: '#6a5a4a' });
  }
  function front(t) {                                               // передний план: обгорелый столб с проводами и заснеженный забор
    pencil([[1220, 2200], [1180, 900]], { w: 30, col: '#2a2420', pass2: false }); pencil([[1100, 960], [1260, 940]], { w: 12, col: '#2a2420', pass2: false });
    pencil(spline([[1120, 966], [800, 1100], [400, 1050]], false, 14), { w: 3, col: '#1a1a1a', pass2: false });
    for (let k = 0; k < 6; k++) { const x = -80 + k * 50; pencil([[x, 2200], [x + 4, 1820 - (k % 2) * 30]], { w: 22, col: '#4a3a2a', pass2: false }); ell(x + 4, 1820 - (k % 2) * 30, 18, 10, { wash: '#f6f8fc', washA: 1, w: 1.2, col: '#8a98b0' }); }
  }
  function hud(t) {
    if (t > EV.kl_occ - 0.1 && t < EV.kl_free + 0.6) { const q = popK(t, EV.kl_occ - 0.1, 0.35), fade = 1 - sm((t - EV.kl_free - 0.3) / 0.3); push(800, 1000, q, 0.03); ctx.globalAlpha = fade;
      rect(-170, -130, 340, 260, { wash: '#f0ece0', washA: 0.97, w: 3, col: L }); rect(-170, -130, 340, 60, { wash: '#8a2a2a', washA: 1, w: 3, col: L }); txt('1941', 0, -88, 40, { col: '#ffe8d8', font: 'Osw' });
      txt('14 ОКТ', 0, -20, 48, { col: '#2a2a2a', font: 'Osw' }); txt('↓', 0, 26, 40, { col: '#8a2a2a', font: 'Osw' }); txt('16 ДЕК', 0, 92, 48, { col: '#2a2a2a', font: 'Osw' }); ctx.globalAlpha = 1; pop(); }
    if (t > EV.kl_first - 0.05) { push(780, 1020, popK(t, EV.kl_first - 0.05, 0.3), -0.04); rect(-200, -40, 400, 80, { wash: '#16120c', washA: 0.86, w: 2.4, col: '#ffd8a0' }); txt('ОСВОБОЖДЁН 16.12.1941', 0, 12, 34, { col: '#ffe8c0', font: 'Osw' }); pop(); }
    scoreHud(t, 4, 1, { a: 0.0 });
  }
  WORLD.kalinin = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(15, () => far(t));
    lay(5, () => town(t));
    lay(2.4, () => people(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    snowfall(t, 0.6, 23814, 80);
    if (t < EV.kl_free + 0.8) screenFill('#202430', 0.25 * (1 - free(t)), 'multiply');
    haze('#b8c0d0', 0.06);
  };
  DIR.kalinin = {
    outfit: 'tulup', light: { side: 1, rim: '#ffd0a0' }, grade: ['#6a7a98', 0.14],
    act: () => [[S0.kalinin, 'talk'], [EV.kl_name, 'sideeye'], [EV.kl_occ, 'cold'], [EV.kl_free, 'proud'], [EV.kl_first, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1600, s: 1.0, look: t < EV.kl_free ? [0.6, -0.5] : [0.8, -0.3], frost: t < EV.kl_free ? 0.8 : 0.3, chatter: t > EV.kl_occ && t < EV.kl_free ? 1 : 0, tailUp: t > EV.kl_free,
      point: t > EV.kl_name && t < EV.kl_occ ? 1 : undefined, hand: t > EV.kl_name && t < EV.kl_occ ? [240, -300] : undefined }),
    cam: () => [[S0.kalinin, 600, 980, 0.14], [EV.kl_name, 600, 1000, 0.1, 'x'], [EV.kl_occ, 660, 960, 0.06], [EV.kl_free, 680, 940, 0.12, 'x'], [S1.kalinin, 660, 960, 0.14]],
    hud
  };
  TRANS_IN.kalinin = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // иней: ледяные кристаллы расползаются от центра, за ними — 1941
    const R = Math.pow(sm(k), 1.3) * 1500; drawBuf(A);
    scr(() => { inCircle(540, 960, R, () => drawBuf(B)); const r = rng(23815);
      for (let i = 0; i < 40; i++) { const a = r() * 6.283, d = R * (0.9 + r() * 0.25), x = 540 + Math.cos(a) * d, y = 960 + Math.sin(a) * d, len = 40 + r() * 60;
        for (let j = 0; j < 3; j++) { const b = a + (j - 1) * 0.9; pencil([[x, y], [x + Math.cos(b) * len, y + Math.sin(b) * len]], { w: 3, col: '#eaf4ff', a: Math.sin(Math.PI * k), pass2: false }); } }
      glow(540, 960, R, 'rgba(220,240,255,1)', 0.2 * Math.sin(Math.PI * k)); });
  } };
})();
