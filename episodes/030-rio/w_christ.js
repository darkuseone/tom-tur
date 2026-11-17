/* 030 — сцена `christ`: 1931, вершина Корковаду. Утро, солнце сзади статуи (главный свет — контровой ореол только у солнца), внизу
   облака и панорама города: залив, Сахарная Голова, кварталы, пляжи. На вершине статуя Христа в лесах; на «встал» леса падают, статуя
   открывается; рядом мерная линейка «30 М + 8 М» растёт снизу вверх. Зубчатый поезд привёз ящики, рабочие, бетономешалка, кран.
   Том (рабочий) на «Голову» открывает ящик «PARIS → RIO» — в нём каменная голова. Плашка «1931 · 30 М + ПОСТАМЕНТ 8 М · РАЗМАХ РУК 28 М».
   Переход В: облако на вершине — кадр проходит сквозь облако. */
(() => {
  EV.ch_up = wtk('s7', 'встал');
  EV.ch_30 = wtk('s7', 'тридцать');
  EV.ch_head = wtk('s7', 'Голову');
  EV.ch_fr = wtk('s7', 'Франции.');
  KEYW.push('Христос', 'метров.', 'Франции.');
  const L = RJ.ink, SX = 720, SB = 1230, open = t => sm(clamp((t - EV.ch_up) / 0.6));
  function sky(t) { vgrad(-900, 1100, ['#3a7ad8', '#8ac0ec', '#f8e8c8', '#ffd890'], 1); glow(SX, 420, 260, 'rgba(255,240,190,1)', 0.45); ell(SX, 420, 70, 70, { wash: '#fffbe0', washA: 1, line: false }); shaft(SX, 420, 300, 1200, 0.25, 'rgba(255,240,200,1)', 0.1); }
  function panorama(t) {                                             // далеко внизу: залив, Сахарная Голова, кварталы, пляжи, облака
    seaKR(1040, 1260, t, 6801, { cols: ['#5ab0d8', '#2a8ab8', '#1a6a98'], n: 20 }); sugarloaf(1100, 1130, 0.45, t);
    for (let i = 0; i < 60; i++) { const r = rng(6810 + i), x = -400 + r() * 1300, y = 1180 + r() * 100, w = 14 + r() * 26, h = 10 + r() * 40; rect(x, y - h, w, h, { wash: ['#f0e8d8', '#e8d0b0', '#d8dce8', '#c87a5a'][i % 4], washA: 1, w: 0.8, col: L }); }
    rect(-500, 1255, 2200, 20, { wash: RJ.sand, washA: 1, line: false });
    for (let i = 0; i < 6; i++) { const x = ((i * 300 + t * 20) % 1900) - 400; blob([[x - 160, 1180], [x - 100, 1130], [x, 1120], [x + 120, 1140], [x + 170, 1180], [x, 1200]], { wash: '#ffffff', washA: 0.75, line: false }); }
    depthFog('#e8f0f4', 0.07); }
  function statue(t) {                                               // постамент, статуя, леса падают на «встал», мерная линейка
    const o = open(t); push(SX, SB, 0.82); rect(-90, -150, 180, 150, { wash: '#d8d4c8', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#8a8678', ang: 1.4 } }); rect(-110, -170, 220, 24, { wash: '#c8c4b8', washA: 1, w: 2, col: L });
    push(0, -170, 1); const ST = '#ece8de', SD = '#b8b4a8';
    shape([[-74, 0], [74, 0], [64, -200], [52, -330], [30, -372], [-30, -372], [-52, -330], [-64, -200]], { wash: ST, washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.15, col: SD, ang: 1.57 } });
    for (const q of [-40, -14, 14, 40]) pencil([[q * 1.2, -6], [q * 0.8, -320]], { w: 2, col: SD, a: 0.8, pass2: false }); pencil([[-58, -230], [58, -230]], { w: 4, col: SD, pass2: false });
    for (const sd of [-1, 1]) { poly([[sd * 36, -372], [sd * 292, -376], [sd * 298, -352], [sd * 160, -340], [sd * 44, -318]], { wash: ST, washA: 1, w: 2.2, col: L }); pencil([[sd * 60, -350], [sd * 280, -362]], { w: 1.6, col: SD, a: 0.7, pass2: false }); ell(sd * 304, -364, 12, 14, { wash: ST, washA: 1, w: 1.8, col: L }); }
    blob([[-30, -380], [-36, -430], [-20, -456], [20, -456], [36, -430], [30, -380], [16, -372], [-16, -372]], { wash: '#dcd8cc', washA: 1, w: 2, col: L });
    ell(0, -414, 22, 28, { wash: ST, washA: 1, w: 2, col: L }); blob([[-14, -398], [0, -372], [14, -398]], { wash: '#dcd8cc', washA: 1, w: 1.4, col: L }); pencil([[-8, -416], [-2, -414]], { w: 2, col: SD, pass2: false }); pencil([[2, -414], [8, -416]], { w: 2, col: SD, pass2: false });
    pop();
    if (o < 1) { ctx.save(); const dy = o * 700; for (let i = 0; i < 9; i++) { const x = -320 + i * 80; pencil([[x, 0 + dy], [x + Math.sin(i) * 20 * o, -640 + dy]], { w: 6, col: '#8a6a3a', a: 1 - o, pass2: false }); } for (let j = 0; j < 7; j++) pencil([[-340, -90 * j + dy], [340, -90 * j + dy]], { w: 5, col: '#8a6a3a', a: 1 - o, pass2: false }); ctx.restore(); }
    if (t > EV.ch_30 - 0.05) { const k = clamp((t - EV.ch_30 + 0.05) / 0.7); push(-380, 0, 1); pencil([[0, 0], [0, -650 * k]], { w: 16, col: RJ.yellow, pass2: false }); for (let q = 0; q <= Math.floor(k * 13); q++) pencil([[0, -q * 50], [q % 2 ? -18 : -30, -q * 50]], { w: 3, col: L, pass2: false });
      if (k > 0.2) txt('8 М', -80, -80, 32, { col: '#fff6e0', font: 'Osw' }); if (k > 0.9) txt('30 М', -86, -420, 40, { col: RJ.goldL, font: 'Osw' }); pop(); }
    pop();
  }
  function summit(t) {                                               // площадка: зубчатый поезд, ящики, рабочие, бетономешалка, кран
    rect(-500, 1180, 2200, 260, { wash: '#8a8478', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.15, col: '#4a4840', ang: 0.2 } });
    push(-120, 1260, 0.8); rect(-160, -120, 320, 110, { wash: '#2a6a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) rect(-140 + q * 74, -100, 54, 44, { wash: '#c8e0f0', washA: 1, w: 1.4, col: L }); for (const k of [-110, 110]) ell(k, -10, 26, 26, { wash: '#2a2a30', washA: 1, w: 1.6, col: L }); txt('CORCOVADO', 0, -20, 22, { col: '#f4f0e6', font: 'Osw' }); pop();
    pencil([[-500, 1270], [1700, 1270]], { w: 6, col: '#3a3a40', pass2: false }); for (let i = 0; i < 30; i++) pencil([[-480 + i * 76, 1266], [-480 + i * 76, 1280]], { w: 4, col: '#3a3a40', pass2: false });
    const P = [[180, '#6a6a5a', 'cap', 'up'], [300, '#7a5a3a', 'helmet', 'hold'], [1000, '#6a6a5a', 'cap', 'swing'], [1120, '#3a3a4a', 'brim', 'point'], [1240, '#7a5a3a', 'cap', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1320, 0.62, t, { body: c, hat: h, hatCol: h === 'helmet' ? '#e8e4dc' : '#2a2a30', legs: '#3a3a40', armR: a, prop: a === 'swing' ? 'axe' : undefined, flip: x > 600 ? -1 : 1, seed: 6820 + i, face: t > EV.ch_up ? 'grin' : 'calm' }));
    push(1080, 1300, 0.7); pencil([[0, 0], [0, -400]], { w: 10, col: '#a8401e', pass2: false }); pencil([[0, -400], [-260, -380]], { w: 8, col: '#a8401e', pass2: false }); pencil([[-250, -380], [-250, -260]], { w: 2, col: '#2a2a30', pass2: false }); rect(-280, -260, 60, 40, { wash: '#d8d4c8', washA: 1, w: 1.6, col: L }); pop();
  }
  function ground(t) {                                               // ящики «PARIS», мешки цемента, вёдра, инструменты, голова в ящике
    rect(-500, 1440, 2200, 900, { wash: '#9a9488', washA: 1, w: 2, col: L }); const r = rng(6830); for (let i = 0; i < 40; i++) ell(r() * 2000 - 400, 1460 + r() * 460, 10 + r() * 24, 5 + r() * 8, { wash: i % 2 ? '#a8a294' : '#88827a', washA: 1, w: 1, col: L, a: 0.5 });
    lightPool(SX, 1640, 700, 160, 'rgba(255,240,190,1)', 0.4);
    push(820, 1760, 1); const op = clamp((t - EV.ch_head) / 0.4); rect(-170, -200, 340, 200, { wash: '#b8905a', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 4; q++) pencil([[-170, -40 - q * 50], [170, -40 - q * 50]], { w: 2, col: '#7a5a2a', pass2: false }); txt('PARIS → RIO', 0, -100, 40, { col: '#3a1a08', font: 'Osw' });
    if (op > 0) { push(0, -200, 1); push(-170, 0, 1, -op * 1.6); rect(0, -20, 340, 20, { wash: '#b8905a', washA: 1, w: 2, col: L }); pop(); const hy = -80 * op; blob([[-120, hy + 40], [-130, hy - 80], [-80, hy - 150], [80, hy - 150], [130, hy - 80], [120, hy + 40]], { wash: '#dcd8cc', washA: 1, w: 2.4, col: L }); ell(0, hy - 30, 90, 110, { wash: '#ece8de', washA: 1, w: 2.4, col: L }); for (const sd of [-1, 1]) pencil([[sd * 18, hy - 40], [sd * 52, hy - 46]], { w: 4, col: '#a8a498', pass2: false }); pencil([[0, hy - 36], [-8, hy + 10], [6, hy + 14]], { w: 3, col: '#a8a498', pass2: false }); blob([[-50, hy + 30], [0, hy + 90], [50, hy + 30], [0, hy + 46]], { wash: '#dcd8cc', washA: 1, w: 2, col: L }); pop(); } pop();
    for (let q = 0; q < 3; q++) { push(-60 + q * 70, 1780, 1); rect(-34, -70, 68, 70, { wash: '#d8d0c0', washA: 1, w: 1.6, col: L }); txt('CIMENT', 0, -36, 14, { col: '#5a4a3a', font: 'Osw' }); pop(); }
    push(1180, 1820, 1); ell(0, -30, 40, 34, { wash: '#6a6a72', washA: 1, w: 2, col: L }); pop(); push(500, 1860, 1, 0.4); pencil([[0, 0], [0, -110]], { w: 6, col: RJ.woodD, pass2: false }); rect(-26, -130, 52, 26, { wash: '#6a6a72', washA: 1, w: 1.6, col: L }); pop();
    castShadow(330, 1640, 120, 480, 0.5, 0.35); moodDark(SX, 900, 900, 1900, '#1a1a2a', 0.25);
  }
  WORLD.christ = (t, u, cat) => {
    lay(40, () => sky(t)); lay(22, () => panorama(t)); lay(4, () => statue(t)); lay(2.4, () => summit(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#1e2a1a', 1); });
    lay(1.8, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 6840, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.christ = {
    outfit: 'iron', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a3a5a', 0.05],
    act: () => [[S0.christ, 'awe'], [EV.ch_up, 'shock'], [EV.ch_30, 'awe'], [EV.ch_head, 'grin'], [EV.ch_fr, 'smug']],
    pose: (t, u, b) => { const w1 = clamp((t - EV.ch_head + 0.6) / 0.6), x = lerp(260, 560, sm(w1)); return Object.assign(b, { x, y: 1640, s: 0.92, walk: w1 > 0 && w1 < 1 ? t * 9 : 0, look: t < EV.ch_head ? [0.5, -0.9] : [0.9, 0.2], hand: t > EV.ch_head ? [200, -300] : [150, -300] }); },
    hud: t => infoPlate(330, 770, [['1931 · 30 М + 8 М', 52, RJ.goldL], ['РАЗМАХ РУК — 28 М', 32]], t, EV.ch_30 + 0.6),
    cam: () => [[S0.christ, 600, 1100, 0.04], [EV.ch_up, 640, 960, -0.06, 'x'], [EV.ch_30, 620, 940, -0.08], [EV.ch_head - 0.1, 620, 1100, 0.04], [EV.ch_head + 0.3, 700, 1260, 0.14, 'x'], [S1.christ, 700, 1260, 0.16]]
  };
  TRANS_IN.christ = { a: 0.1, b: 0.4, fx(k, t, A, B) {               // кадр проходит сквозь облако
    const e = sm(k); drawBuf(e < 0.5 ? A : B, 1 + e * 0.3); scr(() => { const a = Math.sin(e * Math.PI), r = rng(6850); for (let i = 0; i < 30; i++) { const x = r() * W, y = r() * H; ell(x, y, (220 + r() * 200) * (0.6 + e), (160 + r() * 140) * (0.6 + e), { wash: '#ffffff', washA: 0.95 * a, line: false }); } }); } };
})();
