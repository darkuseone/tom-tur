/* 022 — сцена `sarepta`: 1810, немецкая колония Сарепта (соседка Царицына), золотой вечер; на горизонте — тот же холм.
   Площадь с белой кирхой, фахверковые дома, вывеска «SENF · ГОРЧИЦА», мельница, жёлтое поле горчицы, колонисты в чепцах и треуголках,
   телега с мешками, столик с банками. На «Немцы» колонисты машут, мельница раскручивается; на «горчицу» над площадью всплывает банка
   «САРЕПТСКАЯ», из труб завода валит пар; на «жгучую» Том пробует — шок, из ушей пар, слёзы; на «русскую» на банку падает штамп «РУССКАЯ».
   Переход В сцену — земля: лемех плуга проходит по кадру бороздами, в бороздах открывается новая эпоха. */
(() => {
  EV.sr_ger = wtk('s4', 'Немцы');
  EV.sr_must = wtk('s4', 'горчицу.');
  EV.sr_hot = wtk('s4', 'жгучую');
  EV.sr_rus = wtk('s4', '«русскую»!');
  KEYW.push('горчицу.', 'жгучую', '«русскую»!');
  SHAKES.push([EV.sr_hot + 0.1, 0.3, 7]);
  const L = VG.ink;

  function sky(t) { sunsetSky(t, { sx: 860, sy: 1000, sr: 110, cols: ['#2a2a48', '#5a4a6a', '#b0604a', '#f0904a', '#ffc060', '#ffe8a0'], seed: 22500, nb: 8, cl1: '#8a4a5a', cl2: '#f0a060' }); }
  function far(t) {                                                 // холм на горизонте, Волга, далёкие колонистские фермы
    kurgan(980, 1000, 800, 130, { col: '#8a7a4a', rim: 'rgba(255,140,80,1)', grass: 30, seed: 22501 });
    volga(1010, 1080, t, { sx: 860, seed: 22502, top: '#e0905a', bot: '#4a4a6a', farBank: false });
    sareptaField(1080, 1180, t, { seed: 22503, n: 160 });
    for (const x of [60, 300]) fachwerk(x, 1150, 110, 70, t, { chim: false });
    windmill(1160, 1170, 0.42, t, { speed: t > EV.sr_ger ? 3 : 1 });
  }
  function square(t) {                                              // площадь: кирха, дома, завод-маслобойня
    hills(1260, 10, '#a89060', 22504, 1);
    kirche(640, 1260, 0.78, t);
    fachwerk(-60, 1270, 300, 220, t, { lit: 1, roof: '#a84a32' });
    fachwerk(900, 1270, 260, 200, t, { sign: 'SENF · ГОРЧИЦА', lit: 1, roof: '#8a3a2a' });
    push(1180, 1270, 1); rect(-40, -260, 200, 260, { wash: '#c8a080', washA: 1, w: 2.4, col: L }); rect(60, -460, 40, 200, { wash: '#8a4a3a', washA: 1, w: 2, col: L }); pop();   // маслобойня
    smokeCol(1260, 800, t, { col: t > EV.sr_must ? 'rgba(250,240,220,0.7)' : 'rgba(220,210,200,0.4)', h: 360, sz: t > EV.sr_must ? 0.7 : 0.4, n: 6, wind: 100 });
    for (const x of [300, 980]) lamppost(x, 1290, 220, t, { lit: 1, wood: 1 });
    const wv = t > EV.sr_ger ? 'wave' : 'hold';
    const P = [[240, '#3a3a5a', 'straw', wv], [380, '#6a2a2a', 'scarf', 'hold'], [480, '#2a4a3a', 'merchant', wv], [800, '#5a3a5a', 'scarf', 'hips'], [870, '#3a3a2a', 'merchant', wv], [1020, '#4a5a6a', 'scarf', 'hold'], [1100, '#2a2a3a', 'straw', 'point']];
    P.forEach(([x, c, h, a], i) => human(x, 1300 + (i % 2) * 10, 0.36, t, { body: c, legs: '#2a2420', hat: h, hatCol: h === 'scarf' ? '#f6f0e4' : '#2a2018', long: h === 'scarf' ? 1 : 0, seed: 500 + i, armR: a, flip: i % 2 ? -1 : 1 }));
    crowd(160, 1100, 1290, 12, t, 22520, { s: 0.3, cols: ['#3a3a5a', '#6a2a2a', '#2a4a3a', '#5a3a5a', '#4a5a6a'] });
    push(200, 1330, 0.7); rect(-120, -150, 240, 150, { wash: '#7a5432', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 6; k++) pencil([[-130 + k * 52, -200], [-104 + k * 52, -150]], { w: 26, col: k % 2 ? '#f6f0e4' : '#b0283a', pass2: false }); for (let k = 0; k < 5; k++) mustardJar(-90 + k * 45, -150, 0.45); pop();   // ярмарочный лоток
    human(460, 1500, 0.42, t, { body: '#c8a040', legs: '#2a2420', seed: 530, armR: 'wave' }); human(520, 1510, 0.38, t, { body: '#5a8aa0', legs: '#2a2420', hat: 'scarf', hatCol: '#f6f0e4', long: 1, seed: 531, armL: 'hold', flip: -1 });   // дети
    dog(620, 1520, 0.3, t, { col: '#8a5a32' });
    cart(560, 1330, 0.5, t, { load: 1 }); horse(700, 1330, 0.3, t, { col: '#8a5a32', flip: -1 });
  }
  function ground(t) {                                              // ближний план: булыжник, столик с банками, мешки, корзина семян, гуси
    rect(-900, 1360, 2900, 800, { wash: '#a89070', washA: 1, line: false });
    const r = rng(22505); for (let i = 0; i < 70; i++) { const x = -60 + r() * 1300, y = 1380 + r() * 500, s = 0.6 + (y - 1380) / 300; ell(x, y, 22 * s, 10 * s, { wash: i % 3 ? '#8a7a64' : '#9a8a70', washA: 1, w: 1.2, col: L, a: 0.6 }); }
    push(820, 1560, 1); rect(-170, -110, 340, 24, { wash: '#7a5432', washA: 1, w: 2.2, col: L }); for (const sd of [-1, 1]) pencil([[sd * 150, -86], [sd * 150, 0]], { w: 8, col: '#5a3a22', pass2: false });
    rect(-150, -86, 300, 8, { wash: '#f6f0e4', washA: 1, line: false }); for (let k = 0; k < 4; k++) mustardJar(-120 + k * 80, -110, 0.7); pop();
    for (const [x, y] of [[1060, 1640], [1140, 1690], [980, 1720]]) { sack(x, y, 0.7, '#d8c090'); }
    push(600, 1700, 0.8); ell(0, -40, 80, 30, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); for (let i = 0; i < 30; i++) { const r2 = rng(22506 + i); ctx.fillStyle = '#d8b030'; ctx.fillRect(-60 + r2() * 120, -60 + r2() * 20, 5, 5); } pop();   // корзина семян
    barrel(480, 1640, 0.6, '#7a5432'); crate(380, 1720, 120, 70); jug(1180, 1580, 0.6, '#c8702a');
    for (let k = 0; k < 3; k++) { const x = 1000 + k * 60 + Math.sin(t * 2 + k) * 8, y = 1500 + k * 14; ell(x, y, 22, 14, { wash: '#f2ece0', washA: 1, w: 1.6, col: L }); pencil([[x + 16, y - 6], [x + 30, y - 30]], { w: 6, col: '#f2ece0', pass2: false }); ell(x + 32, y - 32, 6, 5, { wash: '#f2ece0', washA: 1, w: 1, col: L }); }
    human(700, 1480, 0.52, t, { body: '#6a2a2a', legs: '#2a2420', hat: 'scarf', hatCol: '#f6f0e4', long: 1, seed: 520, armL: 'hold', armR: 'hold', flip: -1 });   // торговка
    human(1100, 1500, 0.5, t, { body: '#2a3a5a', legs: '#2a2420', hat: 'merchant', hatCol: '#1a1a1a', seed: 521, armR: 'point', flip: -1 });
  }
  function front(t) { sareptaField(1880, 2300, t, { seed: 22507, n: 120 }); for (const x of [-60, 1180]) { pencil([[x, 2200], [x, 1500]], { w: 30, col: '#5a3a22', pass2: false }); blob([[x - 160, 1560], [x, 1360], [x + 160, 1560], [x, 1640]], { wash: '#4a6a2a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.3, col: '#1a2a10' } }); } }
  function hud(t) {
    if (t > EV.sr_must - 0.05) { const q = popK(t, EV.sr_must - 0.05, 0.4); push(700, 820, q * 1.6, 0.06); mustardJar(0, 60, 1.4, { lab: 'САРЕПТА' }); pop();
      if (t > EV.sr_rus) { const s = popK(t, EV.sr_rus, 0.3); push(700, 800, 1.5 - 0.5 * s, -0.12); rect(-160, -40, 320, 80, { wash: '#b0283a', washA: 0.88 * s, w: 4, col: '#ffe0d0' }); txt('«РУССКАЯ»', 0, 12, 50, { col: '#fff0e8', font: 'Osw', a: s }); pop(); } }
  }

  WORLD.sarepta = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(5, () => square(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(36, [-200, 300, 1300, 1600], '#ffe080', t, 22508, { sp: 16, vx: 50, sz: 2.6, a: 0.5, wob: 18 });
    haze('#f0b060', 0.06);
  };
  DIR.sarepta = {
    outfit: 'dutch', light: { side: 1, rim: '#ffc078' }, grade: ['#c08a40', 0.12],
    act: () => [[S0.sarepta, 'talk'], [EV.sr_ger, 'grin'], [EV.sr_must, 'proud'], [EV.sr_hot, 'shock'], [EV.sr_hot + 0.5, 'laugh'], [EV.sr_rus, 'proud']],
    pose: (t, u, b) => { const hot = t > EV.sr_hot && t < EV.sr_rus + 0.3;
      return Object.assign(b, { x: 300, y: 1530, s: 1.04, look: t < EV.sr_must ? [0.6, -0.4] : [0.4, -0.7], tailUp: hot, sweat: hot ? 1 : 0, squash: hot ? Math.sin(t * 30) * 0.03 : 0,
        hand: t > EV.sr_hot - 0.3 && t < EV.sr_hot + 0.4 ? [40, -330] : [110, -220] }); },
    afterCat: (t, u, P) => { const hx = P.x + P.hand[0] * P.s, hy = P.y + P.hand[1] * P.s; mustardJar(hx + 10, hy + 40, 0.6);
      if (t > EV.sr_hot && t < EV.sr_rus + 0.6) { const hy2 = P.y - 400 * P.s; for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { const r = rng(hsh(FRAME, i, sd + 5)); ell(P.x + sd * (110 + r() * 40) * P.s, hy2 - r() * 80, 18 + r() * 14, 14 + r() * 10, { wash: '#f6f6f6', washA: 0.7, line: false }); } } },
    cam: () => [[S0.sarepta, 620, 980, 0.12], [EV.sr_ger, 640, 960, 0.06], [EV.sr_must, 640, 920, 0.02, 'x'], [EV.sr_hot, 420, 1100, 0.3], [EV.sr_rus, 560, 980, 0.12], [S1.sarepta, 560, 1000, 0.16]],
    hud
  };
  TRANS_IN.sarepta = { a: 0.2, b: 0.4, fx(k, t, A, B) {            // плуг: лемех прорезает борозды, в бороздах открывается новая эпоха
    drawBuf(A); const n = 8;
    scr(() => { for (let i = 0; i < n; i++) { const q = clamp(k * 1.6 - i * 0.08), y = i * H / n, x = (i % 2 ? W - q * W * 1.1 : -W * 0.1 + q * W * 1.1);
        ctx.save(); ctx.beginPath(); if (i % 2) ctx.rect(x, y, W - x, H / n + 2); else ctx.rect(0, y, x, H / n + 2); ctx.clip(); drawBuf(B); ctx.restore();
        if (q > 0 && q < 1) { push(x, y + H / n / 2, 1, i % 2 ? Math.PI : 0); poly([[0, -50], [70, 0], [0, 50]], { wash: VG.steelL, washA: 1, w: 2.4, col: L }); glow(40, 0, 70, 'rgba(255,240,220,1)', 0.6); pop();
          for (let j = 0; j < 8; j++) { const r = rng(hsh(FRAME, i, j)); ctx.fillStyle = '#5a3a1e'; ctx.fillRect(x - (i % 2 ? -1 : 1) * r() * 120, y + r() * H / n, 10 + r() * 14, 8 + r() * 8); } } } });
  } };
})();
