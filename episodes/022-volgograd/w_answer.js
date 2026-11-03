/* 022 — сцена `answer`: 15 октября 1967, открытие памятника. Багровый закат и сталь меча. «Родина-мать» только что без лесов
   (последние доски падают), у подножия — толпа с гвоздиками, ветераны, оркестр, флаги-ленты, фотограф. Земля холма — в разрезе:
   под ногами Тома в тёмной земле загораются тихие огоньки памяти, рядами. На «Под» камера опускается к разрезу; на «тридцать»
   огоньки вспыхивают по всему холму, счётчик «34 505» (плашка-вопрос превращается в ответ); на «Поэтому» меч вспыхивает,
   над холмом поднимаются гвоздики. Переход В сцену — река: кадр отражается в Волге, рябь стирает прошлую эпоху. */
(() => {
  EV.an_under = wtk('a1', 'Под');
  EV.answer = wtk('a1', 'тридцать');
  EV.an_def = wtk('a1', 'защитников.');
  EV.an_so = wtk('a1', 'Поэтому');
  KEYW.push('защитников.', 'здесь.');
  const L = VG.ink, MX = 760, MB = 1250, MS = 0.82;

  function sky(t) { sunsetSky(t, { sx: 240, sy: 1040, sr: 110, cols: ['#1a1830', '#3a2a4a', '#8a2a3e', '#d0483e', '#f88a4a', '#ffd080'], seed: 22900, nb: 10 }); }
  function far(t) { hills(1120, 20, '#3a2a3e', 22901, 1); for (let i = 0; i < 9; i++) cityBlock(-80 + i * 150, 1150, 110, 70 + (i * 41) % 100, '#4a3a4e', t, { lit: 0.6, seed: 22902 + i }); volga(1150, 1220, t, { sx: 240, seed: 22903, farBank: false }); }
  function statue(t) {                                              // памятник без лесов, падающие доски, свет на мече
    kurgan(MX - 60, MB + 20, 1500, 120, { col: '#5a5a3a', rim: 'rgba(255,120,80,1)', grass: 60, seed: 22904 });
    motherland(MX, MB, MS, t, { glint: 1 + sm((t - EV.an_so) / 0.3), rim: '#ff8a6a', col: '#b0a298', colD: '#766860' });
    const f = sm((t - S0.answer - 0.2) / 1.2); for (let k = 0; k < 8; k++) { const r = rng(22905 + k), x = MX - 300 + r() * 600, y0 = MB - 300 - r() * 600; push(x + f * (r() - 0.5) * 200, y0 + f * f * 900, 1, f * (r() * 4 - 2)); rect(-70, -6, 140, 12, { wash: '#a87a4a', washA: 1 - f * 0.6, w: 1.6, col: L }); pop(); }   // падающие доски лесов
    if (t > EV.an_so) { const q = sm((t - EV.an_so) / 0.4); glow(MX + 300 * MS, MB - 1600 * MS, 260, 'rgba(255,230,200,1)', 0.7 * q); rays(MX + 300 * MS, MB - 1600 * MS, -Math.PI / 2, 6.28, 500, 'rgba(255,220,180,0.5)', 0.2 * q, 10, t); }
  }
  function crowd2(t) {                                              // толпа на открытии: ветераны, гвоздики, оркестр, фотограф
    crowd(-100, 1300, 1290, 30, t, 22906, { s: 0.42, cols: ['#3a3a4a', '#5a2a2a', '#2a3a3a', '#4a4a3a', '#6a5a4a'] });
    const P = [[180, '#3a4a3a', 'cap', 'up'], [330, '#2a2a3a', null, 'hold'], [470, '#7a2a3a', 'scarf', 'up'], [900, '#3a3a2a', 'cap', 'hold'], [1020, '#5a3a4a', 'scarf', 'wave'], [1140, '#2a3a4a', null, 'hold']];
    P.forEach(([x, c, h, a], i) => { human(x, 1330 + (i % 2) * 10, 0.4, t, { body: c, legs: '#2a2a34', hat: h || undefined, hatCol: '#c8202a', seed: 900 + i, armR: a, flip: i % 2 ? -1 : 1, look: [0.3, -0.9] });
      if (a === 'up') { ell(x + 20, 1200, 10, 9, { wash: '#d8203a', washA: 1, w: 1, col: L }); } });
    for (let k = 0; k < 4; k++) { const x = 600 + k * 60; human(x, 1336, 0.34, t, { body: '#2a2a3a', legs: '#1a1a24', hat: 'police', hatCol: '#2a2a3a', seed: 910 + k, armR: 'hold', armL: 'hold' }); ell(x + 18, 1240, 16, 16, { wash: '#e8b04a', washA: 1, w: 1.4, col: L }); }   // оркестр с трубами
    for (let k = 0; k < 6; k++) { const x = 100 + k * 220, sw = Math.sin(t * 4 + k) * 10; pencil([[x, 1300], [x, 1120]], { w: 3, col: '#3a2a1a', pass2: false }); shape([[x, 1120], [x + 80 + sw, 1130], [x + 80 + sw, 1170], [x, 1160]], { wash: '#c8202a', washA: 1, w: 1.6, col: L }); }
  }
  function ground(t) {                                              // земля холма в разрезе: тихие огоньки памяти
    rect(-900, 1400, 2900, 60, { wash: '#6a5a3a', washA: 1, w: 2.2, col: L });
    for (let i = 0; i < 40; i++) { const r = rng(22907 + i); pencil([[-100 + r() * 1300, 1400], [-96 + r() * 1300, 1384 - r() * 16]], { w: 2, col: '#a8a050', pass2: false }); }
    rect(-900, 1460, 2900, 800, { wash: '#2a2018', washA: 1, line: false });
    for (let k = 0; k < 5; k++) pencil([[-200, 1500 + k * 90], [1300, 1520 + k * 90]], { w: 2, col: '#3a2c22', a: 0.8, pass2: false });   // слои земли
    const on = sm((t - EV.an_under + 0.1) / 0.5), all = sm((t - EV.answer) / 1.0);
    for (let i = 0; i < 260; i++) { const r = rng(22908 + i), x = -60 + r() * 1300, y = 1480 + r() * 420; const k = Math.max(on * (x > 380 && x < 900 ? 1 : 0), all); if (k <= 0 || r() > k) continue; const tw = 0.6 + 0.4 * Math.sin(t * 3 + i);
      glow(x, y, 16, 'rgba(255,200,120,1)', 0.5 * tw); ctx.fillStyle = '#ffe8b0'; ctx.fillRect(x - 2, y - 2, 4, 4); }
    for (let i = 0; i < 18; i++) { const r = rng(22909 + i); ell(-60 + r() * 1300, 1500 + r() * 400, 12 + r() * 12, 6, { wash: '#3a2e24', washA: 1, w: 1, col: '#4a3a2a' }); }
    for (const [x, y] of [[560, 1420], [640, 1430], [940, 1424], [1060, 1416]]) { pencil([[x, y], [x + 20, y - 60]], { w: 3, col: '#3a5a2a', pass2: false }); ell(x + 22, y - 66, 12, 10, { wash: '#d8203a', washA: 1, w: 1.2, col: L }); }   // гвоздики на краю
    push(1080, 1400, 0.7); pencil([[0, 0], [-20, -100]], { w: 3, col: L, pass2: false }); pencil([[0, 0], [20, -100]], { w: 3, col: L, pass2: false }); rect(-30, -150, 60, 50, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); ell(0, -125, 14, 14, { wash: '#8ab0c8', washA: 1, w: 1.4, col: L }); if (Math.floor(t * 2) % 5 === 0) glow(0, -125, 80, 'rgba(255,255,255,1)', 0.6); pop();   // фотограф на треноге
    human(520, 1420, 0.52, t, { body: '#3a3a3a', legs: '#1a1a24', hat: 'cap', hatCol: '#2a2a2a', beard: 1, seed: 921, armR: 'hold', look: [0.4, -0.9] });   // ветеран
    for (let k = 0; k < 3; k++) { const x = 600 + k * 34; ell(x, 1340, 6, 6, { wash: '#e8c050', washA: 1, w: 1, col: L }); }   // медали ветерана
    human(700, 1420, 0.46, t, { body: '#7a2a3a', legs: '#2a2a34', hat: 'scarf', hatCol: '#f2ece0', long: 1, seed: 922, armR: 'up', look: [0.5, -0.9] });
    human(820, 1424, 0.36, t, { body: '#c8a040', legs: '#2a2a34', seed: 923, armR: 'wave', look: [0.5, -0.9] });   // ребёнок с флажком
    push(960, 1420, 0.6); ell(0, -90, 90, 90, { wash: '#2a4a2a', washA: 1, w: 2.4, col: L }); ell(0, -90, 50, 50, { wash: '#6a5a3a', washA: 1, w: 2, col: L }); for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; ell(Math.cos(a) * 70, -90 + Math.sin(a) * 70, 14, 14, { wash: i % 2 ? '#d8203a' : '#a8102a', washA: 1, w: 1.2, col: L }); } pop();   // венок
    dog(1000, 1430, 0.3, t, { col: '#c89a5a' });
    human(1180, 1410, 0.5, t, { body: '#3a3a4a', legs: '#1a1a24', hat: 'cap', hatCol: '#2a2a2a', seed: 920, armR: 'hold', flip: -1 });
    if (t > EV.an_so) for (let i = 0; i < 14; i++) { const r = rng(22910 + i), ph = ((t - EV.an_so) * 0.6 + r()) % 1; ell(200 + r() * 900, lerp(1400, 600, ph), 12, 10, { wash: '#d8203a', washA: 1 - ph, w: 1, col: L, a: 1 - ph }); }   // гвоздики поднимаются
  }
  function front(t) { for (const [x, h] of [[-120, 1200], [1230, 1100]]) poplar(x, 2100, h, t, { col: '#2a3020' }); }
  function hud(t) {
    if (t > EV.answer - 0.05) { const q = popK(t, EV.answer - 0.05, 0.35), n = Math.round(34505 * sm((t - EV.answer) / 0.9)); push(580, 800, q, -0.02);
      rect(-210, -64, 420, 128, { wash: '#14100a', washA: 0.9, w: 3, col: '#ffd890' }); txt(n.toLocaleString('ru-RU'), 0, 4, 72, { col: '#ffe8b8', font: 'Osw' }); txt('ЗАЩИТНИКОВ ПОД КУРГАНОМ', 0, 46, 24, { col: '#ffd890', font: 'Osw' }); pop(); }
  }

  WORLD.answer = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => statue(t));
    lay(3, () => crowd2(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 300, 1300, 1500], '#ffd0a0', t, 22911, { sp: 14, vx: 40, sz: 2.6, a: 0.5, wob: 18 });
    haze('#d86a5a', 0.06);
  };
  DIR.answer = {
    outfit: 'founder', light: { side: -1, rim: '#ff9a6a' }, grade: ['#a04a40', 0.14],
    act: () => [[S0.answer, 'awe'], [EV.an_under, 'neutral'], [EV.answer, 'awe'], [EV.an_so, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1430, s: 0.98, look: t < EV.an_so ? [0.4, 0.6] : [0.6, -0.9], tailUp: t > EV.an_so, noBlink: t > EV.answer && t < EV.an_so,
      point: t > EV.an_so ? 1 : undefined, hand: t > EV.an_so ? [220, -400] : undefined }),
    cam: () => [[S0.answer, 640, 900, 0.06], [EV.an_under, 600, 1180, 0.08, 'x'], [EV.answer, 600, 1140, 0.02], [EV.an_so, 660, 880, 0.04, 'x'], [S1.answer, 680, 860, 0.1]],
    hud
  };
  TRANS_IN.answer = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // река: прошлая эпоха отражается в Волге и уходит рябью, из воды — новая
    const q = sm(k);
    scr(() => { drawBuf(B); ctx.save(); ctx.globalAlpha = 1 - q; for (let y = 0; y < H; y += 24) { const dx = Math.sin(y * 0.03 + t * 12) * 40 * q; ctx.drawImage(A, 0, y, W, 24, dx, y, W, 24); } ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.35 * Math.sin(Math.PI * k); ctx.fillStyle = '#3a6a9a'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 18; i++) { const y = (i * 120 + t * 300) % H; pencil([[0, y], [W, y + Math.sin(i) * 20]], { w: 3, col: '#e8f4ff', a: 0.5 * Math.sin(Math.PI * k), pass2: false, gap: false }); } });
  } };
})();
