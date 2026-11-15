/* 028 — сцена `univ`: 1887, зимний двор Казанского университета. Белый классический фасад с колоннадой, фонари, студенты в шинелях,
   извозчик, книги, газетчик. Главный свет — тёплые окна аудиторий (вечер), второй — синий снег. Том-студент (victorian) с книгами:
   на «Толстой» из дверей выходит студент с чемоданом (без портрета) — бирка «ТОЛСТОЙ · УШЁЛ САМ», на «Ленина» дверь захлопывается,
   красный штамп «ИСКЛЮЧЁН · 1887», Том роняет книги. Переход В — страница учебника перелистывается снежным ветром. */
(() => {
  EV.un_open = wtk('s6', 'университет.');
  EV.un_tol = wtk('s6', 'Толстой');
  EV.un_len = wtk('s6', 'Ленина');
  EV.un_out = wtk('s6', 'выгнали.');
  KEYW.push('университет.', 'бросил,', 'выгнали.');
  SHAKES.push([EV.un_out, 0.25, 8]);
  const L = KZ.ink;
  function sky(t) { vgrad(-900, 1200, ['#1a2040', '#3a4a7a', '#7a8ab0'], 1); }
  function facade(t) {                                               // фасад: колонны, фронтон, окна с тёплым светом, купол обсерватории
    rect(-500, 700, 2100, 560, { wash: '#efe8d8', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.1, col: KZ.stoneD, ang: 1.4 } });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) { const x = -420 + i * 150; rect(x, 740 + j * 160, 60, 100, { wash: '#ffd890', washA: 1, w: 1.6, col: L }); glow(x + 30, 790 + j * 160, 50, 'rgba(255,214,140,1)', 0.15); }
    poly([[250, 700], [560, 560], [870, 700]], { wash: '#e8dcc8', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 8; k++) { const c = rect(290 + k * 78, 700, 34, 560, { wash: '#f6f0e4', washA: 1, w: 1.8, col: L }); shadeG(c.path, 290 + k * 78, 0, 324 + k * 78, 0, '#a89a80', 0.35); }
    txt('ИМПЕРАТОРСКИЙ УНИВЕРСИТЕТ', 560, 680, 30, { col: '#5a4a2a', font: 'Osw' });
    for (let j = 0; j < 3; j++) pencil([[-500, 1260 - j * 4], [1600, 1260 - j * 4]], { w: 2, col: '#c8c8d0', pass2: false });
    depthFog('#3a4a7a', 0.06);
  }
  function yard(t) {                                                 // двор: студенты, извозчик, фонари, сугробы, дверь
    rect(-500, 1260, 2100, 60, { wash: '#d8dce4', washA: 1, w: 2, col: L });
    push(560, 1270, 1); rect(-80, -240, 160, 240, { wash: '#4a2e18', washA: 1, w: 2.4, col: L }); const sl = t > EV.un_out - 0.1 ? 1 : t > EV.un_len - 0.1 ? 0.6 : t > EV.un_tol - 0.2 ? 0.7 : 0; rect(-70, -230, 140 * (1 - sl), 230, { wash: '#ffd890', washA: 1, line: false }); pop();
    if (t > EV.un_tol - 0.2 && t < EV.un_len) { const k = clamp((t - EV.un_tol + 0.2) / 1.0); push(lerp(620, 860, k), 1290, 0.6); human(0, 0, 1, t, { body: '#2a3040', hat: 'cap', hatCol: '#2a3040', legs: '#1a1a20', armR: 'hold', seed: 3950, face: 'calm', flip: 1 }); rect(-120, -150, 70, 56, { wash: '#6a4424', washA: 1, w: 2, col: L }); rect(-180, -320, 240, 50, { wash: '#f2e6c8', washA: 1, w: 1.6, col: L }); txt('ТОЛСТОЙ · УШЁЛ САМ', -60, -294, 22, { col: '#3a2a1a', font: 'Osw' }); pop(); }
    if (t > EV.un_out - 0.05) { const q = popK(t, EV.un_out - 0.05, 0.3); push(560, 1140, q * 1.1, -0.12); rect(-170, -50, 340, 100, { line: true, w: 8, col: '#d8201e' }); txt('ИСКЛЮЧЁН · 1887', 0, 4, 40, { col: '#d8201e', font: 'Osw' }); pop(); }
    const P = [[-60, '#2a3040'], [100, '#3a3a52'], [920, '#2a3040'], [1060, '#3a2a2a'], [1200, '#2a3040']]; P.forEach(([x, c], i) => human(x, 1300, 0.55, t, { body: c, hat: 'cap', hatCol: '#1a1e2a', legs: '#1a1a20', armR: i % 2 ? 'hold' : 'swing', prop: i % 2 ? 'scroll' : undefined, flip: x > 600 ? -1 : 1, seed: 3955 + i, face: t > EV.un_out && x > 600 ? 'shock' : 'calm', hair: '#2a1a10' }));
    push(1360, 1300, 0.55); horse(0, 0, 1, t, 2, '#3a2a1e'); rect(-300, -130, 180, 80, { wash: '#2a2a30', washA: 1, w: 2, col: L }); pop();
    for (const x of [200, 940]) { pencil([[x, 1300], [x, 1000]], { w: 6, col: '#1a1a20', pass2: false }); ell(x, 990, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 990, 70, 'rgba(255,220,150,1)', 0.3); }
  }
  function snow(t) {                                                 // снег под Томом, книги, следы, сугроб, тумба с афишами
    rect(-500, 1420, 2100, 900, { wash: '#e8ecf4', washA: 1, w: 2, col: L }); for (let i = 0; i < 6; i++) ell(-200 + i * 260, 1480 + (i % 2) * 40, 160, 30, { wash: '#f6f8fc', washA: 1, w: 1.2, col: '#b8c0d0' });
    lightPool(560, 1600, 600, 140, 'rgba(255,214,140,1)', 0.4);
    push(1020, 1640, 1); rect(-60, -320, 120, 320, { wash: '#6a6a72', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-50, -300 + q * 90, 100, 80, { wash: ['#f2e6c8', '#e8c8c0', '#c8d8e8'][q], washA: 1, w: 1.4, col: L }); ell(0, -330, 70, 16, { wash: '#f6f8fc', washA: 1, w: 1.4, col: L }); pop();
    if (t > EV.un_out) { const k = clamp((t - EV.un_out) / 0.5); for (let q = 0; q < 3; q++) { push(420 + q * 50, lerp(1250, 1600, k), 1, k * (q - 1) * 2); rect(-40, -26, 80, 52, { wash: ['#8a2a2a', '#2a4a7a', '#3a6a3a'][q], washA: 1, w: 1.6, col: L }); pop(); } }
    push(860, 1700, 1); for (const k of [-70, 70]) pencil([[k - 60, 0], [k + 60, 0]], { w: 5, col: '#6a4424', pass2: false }); rect(-90, -50, 180, 40, { wash: '#8a5a32', washA: 1, w: 2, col: L }); pop();   // санки
    push(140, 1720, 0.62); human(0, 0, 1, t, { body: '#6a5a4a', hat: 'cap', hatCol: '#3a3a40', armR: 'up', seed: 4050, face: 'grin' }); rect(30, -330, 90, 70, { wash: '#efe8d8', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) pencil([[40, -320 + q * 14], [110, -320 + q * 14]], { w: 1.4, col: '#5a5a5a', pass2: false }); pop();   // газетчик
    push(1180, 1740, 1); ell(0, -40, 50, 46, { wash: '#f4f6fa', washA: 1, w: 2, col: L }); ell(0, -110, 36, 32, { wash: '#f4f6fa', washA: 1, w: 2, col: L }); ell(0, -160, 26, 24, { wash: '#f4f6fa', washA: 1, w: 2, col: L }); poly([[0, -160], [26, -154], [0, -150]], { wash: '#e8843a', washA: 1, line: false }); rect(-26, -200, 52, 22, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop();   // снеговик в фуражке
    push(-40, 1760, 0.9); blob([[-50, 0], [-40, -50], [20, -60], [50, -40], [50, 0]], { wash: '#3a2a20', washA: 1, w: 2, col: L }); blob([[40, -50], [70, -80], [90, -60], [70, -40]], { wash: '#3a2a20', washA: 1, w: 1.8, col: L }); pencil(spline([[-48, -30], [-80, -60], [-90, -80]], false, 6), { w: 6, col: '#3a2a20', pass2: false }); pop();   // пёс
    for (const x of [460, 680]) { pencil([[x, 1700], [x, 1460]], { w: 6, col: '#1a1a20', pass2: false }); ell(x, 1450, 16, 20, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1450, 60, 'rgba(255,220,150,1)', 0.3); }   // фонари двора
    castShadow(330, 1612, 120, 420, -0.2, 0.4); moodDark(560, 1000, 900, 1800, '#0a0e1a', 0.4);
  }
  function hud(t) { if (t > EV.un_open - 0.05 && t < EV.un_tol) { const q = popK(t, EV.un_open - 0.05, 0.3); push(560, 800, q, -0.02); rect(-230, -50, 460, 100, { wash: '#14100a', washA: 0.9, w: 3, col: KZ.goldL }); txt('С 1804 ГОДА', 0, 2, 50, { col: KZ.goldL, font: 'Osw' }); pop(); } }
  function front(t) { for (let i = 0; i < 50; i++) { const r = rng(hsh(3960, i)), x = ((r() * 1300 + t * 30 * (0.5 + r())) % 1400) - 150, y = ((r() * 2000 + t * 90 * (0.5 + r())) % 2100) - 100; ell(x, y, 4 + r() * 5, 4 + r() * 5, { wash: '#ffffff', washA: 0.85, line: false }); } for (const x of [-60, 1150]) sil([[x - 60, 2300], [x - 50, 1520], [x + 50, 1480], [x + 60, 2300]], '#0e1220', 1); }
  WORLD.univ = (t, u, cat) => {
    lay(40, () => sky(t)); lay(8, () => facade(t)); lay(2.6, () => { yard(t); depthFog('#2a3460', 0.05); }); lay(1, () => { snow(t); cat(); }); lay(0.6, () => front(t));
  };
  DIR.univ = {
    outfit: 'victorian', light: { side: 1, rim: '#ffd890' }, grade: ['#2a3460', 0.08],
    act: () => [[S0.univ, 'proud'], [EV.un_tol, 'sideeye'], [EV.un_len, 'suspicious'], [EV.un_out, 'shock']],
    pose: (t, u, b) => { const drop = t > EV.un_out; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.un_tol && t < EV.un_len ? [-0.6, -0.4] : [0.8, -0.4], hand: drop ? [120, -460] : [180, -330], handF: drop ? [-120, -460] : [60, -330], tailUp: drop, squash: drop && t < EV.un_out + 0.15 ? 0.1 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.un_out) return; push(P.x + 120 * P.s, P.y - 330 * P.s, 1); for (let q = 0; q < 3; q++) rect(-50, -q * 22 - 22, 100, 22, { wash: ['#8a2a2a', '#2a4a7a', '#3a6a3a'][q], washA: 1, w: 1.6, col: L }); pop(); },
    cam: () => [[S0.univ, 600, 960, -0.04], [EV.un_open, 600, 940, -0.04], [EV.un_tol, 560, 1040, 0.06], [EV.un_len, 600, 1020, 0.1], [EV.un_out, 560, 1060, 0.16, 'x'], [S1.univ, 560, 1060, 0.18]],
    hud
  };
  TRANS_IN.univ = { a: 0.12, b: 0.38, fx(k, t, A, B) {              // страница учебника переворачивается слева направо
    const e = sm(k), x = lerp(0, W, e); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W - x, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); const w = 120 * Math.sin(e * Math.PI); rect(x - w, 0, w, H, { wash: '#f2ead8', washA: 1, w: 2, col: KZ.ink }); for (let q = 0; q < 20; q++) pencil([[x - w + 10, 100 + q * 90], [x - 10, 100 + q * 90]], { w: 2, col: '#8a7a5a', pass2: false }); });
  } };
})();
