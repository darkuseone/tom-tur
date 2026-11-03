/* 022 — сцена `horde`: XIV век, ордынская степь у Волги, тот же холм — ещё без памятника. Багровый закат, ковыль.
   На холме — древний курган с каменной бабой, внизу — стан Орды: юрты с дымом, табун, караван верблюдов, котёл, ковры, барабан.
   На «Мамаев» на гребень холма выезжает всадник-хан под бунчуком и над холмом всплывает бирка «МАМАЕВ»; на «Орды» трубят, табун
   срывается; на «хоронили» Том стучит палкой по кургану — «тук» — и на бирку падает штамп «НЕ ЗДЕСЬ».
   Переход В сцену — земля: из туннеля поднимается вал степной земли и осыпается комьями, открывая степь. */
(() => {
  EV.hd_mam = wtk('s1', '«Мамаев»,');
  EV.hd_orda = wtk('s1', 'Орды.');
  EV.hd_no = wtk('s1', 'хоронили.');
  EV.hd_but = wtk('s1', 'Но');
  KEYW.push('«Мамаев»,', 'хоронили.');
  SHAKES.push([EV.hd_orda, 0.25, 6], [EV.hd_no + 0.05, 0.18, 7]);
  const L = VG.ink;

  function sky(t) { sunsetSky(t, { sx: 900, sy: 1010, sr: 120, cols: ['#2a1a30', '#5a2a40', '#a83a42', '#e0603e', '#ff9a4a', '#ffd080'], seed: 22200, nb: 11, cl1: '#6a2a3a', cl2: '#e0704a' }); }
  function far(t) {                                                 // Волга и тот берег, струги купцов
    hills(1040, 26, '#5a3a4a', 22201, 1);
    volga(1050, 1150, t, { sx: 900, seed: 22202, top: '#d8704a', bot: '#3a2a48', farBank: false });
    for (const [x, s] of [[260, 0.16], [520, 0.12], [1060, 0.14]]) strug(x, 1110, s, t, { sailCol: '#e8c8a0', crew: false });
    birds(t, 6, [400, 700, 1100, 950], 22203, '#3a1a20');
  }
  function camp(t) {                                                // стан Орды: юрты, табун, караван
    hills(1200, 40, '#a8783a', 22204, 1);
    for (const [x, s, sm2, fc] of [[40, 0.42, 1, '#efe2c8'], [210, 0.36, 0, '#d8c8a8'], [960, 0.46, 1, '#f2e6d0'], [1120, 0.38, 1, '#e0cfb0'], [820, 0.32, 0, '#d8c8a8']]) yurt(x, 1230, s, t, { smoke: sm2, felt: fc, band: '#b0283a' });
    const run = t > EV.hd_orda ? (t - EV.hd_orda) * 260 : 0;
    for (let k = 0; k < 8; k++) horse(360 + k * 62 + run * (0.8 + (k % 3) * 0.2), 1232 + (k % 2) * 8, 0.18, t, { col: ['#6a3a1e', '#2a1a14', '#a8743a', '#c8b090'][k % 4], walk: t > EV.hd_orda ? 2 : 0.4 });
    for (let k = 0; k < 4; k++) camel(-60 + k * 120 + (t - S0.horde) * 30, 1250, 0.22, t, { walk: 1, load: k % 2 ? '#b0283a' : '#2a5a6a' });
    for (let k = 0; k < 3; k++) kman(720 + k * 40, 1240, 0.2, t, { body: ['#5a2a3a', '#2a4a5a', '#6a5a2a'][k], seed: 260 + k });
  }
  function hill(t) {                                                // холм: курган с каменной бабой, хан под бунчуком
    kurgan(860, 1330, 1000, 190, { col: '#9a7a3a', rim: 'rgba(255,110,70,1)', grass: 120, seed: 22205, gcol: '#e8c070' });
    push(860, 1150, 0.8); blob([[-60, 10], [-50, -90], [-30, -150], [30, -150], [50, -90], [60, 10]], { wash: '#8a8070', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.35, col: L, ang: 0.8 } });   // каменная баба
    ell(0, -175, 32, 36, { wash: '#8a8070', washA: 1, w: 2.4, col: L }); for (const sd of [-1, 1]) ell(sd * 12, -180, 5, 4, { wash: '#2a2420', washA: 1, line: false }); pencil([[-26, -70], [26, -70]], { w: 3, col: L, pass2: false }); ell(0, -60, 20, 12, { wash: '#7a7060', washA: 1, w: 2, col: L }); pop();
    for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283; ell(860 + Math.cos(a) * 110, 1166 + Math.sin(a) * 22, 18, 12, { wash: '#7a7064', washA: 1, w: 1.6, col: L }); }   // кольцо камней
    const q = sm((t - EV.hd_mam + 0.2) / 0.6), hx = lerp(1300, 1040, q);                          // хан Мамай с бунчуком
    horse(hx, 1150, 0.42, t, { col: '#2a1a14', walk: q < 1 ? 2 : 0, flip: -1, saddle: '#b0283a' });
    kman(hx + 10, 1080, 0.34, t, { body: '#8a1a2a', hat: 'fur', hatCol: '#e8b04a', trim: VG.gold, seed: 270, armL: 'point', flip: -1, beard: 1 });
    pencil([[hx + 70, 1090], [hx + 70, 800]], { w: 5, col: '#3a2410', pass2: false }); for (let i = 0; i < 6; i++) { const sw = Math.sin(t * 5 + i) * 10; pencil([[hx + 70, 830 + i * 6], [hx + 50 + sw, 930 + i * 8]], { w: 4, col: i % 2 ? '#2a1a14' : '#6a3a1e', pass2: false }); }
    ell(hx + 70, 800, 12, 12, { wash: VG.gold, washA: 1, w: 1.6, col: L });
    for (let k = 0; k < 3; k++) { horse(1150 + k * 90, 1190 + k * 10, 0.32, t, { col: ['#6a3a1e', '#a8743a', '#4a2a1a'][k], flip: -1 }); kman(1160 + k * 90, 1134 + k * 10, 0.26, t, { body: ['#3a4a5a', '#5a3a2a', '#2a3a2a'][k], seed: 271 + k, prop: 'spear', armR: 'hold', flip: -1 }); }
    if (t > EV.hd_orda) for (let i = 0; i < 6; i++) { const r = rng(hsh(FRAME, i, 51)); pencil([[980 + r() * 20, 1000], [940 - r() * 60, 960 - r() * 40]], { w: 2, col: '#ffe0a0', a: 0.7, pass2: false }); }   // звук рога
  }
  function ground(t) {                                              // ближний план: степь, котёл на огне, ковры, сёдла, колчан, барабан
    steppeGround(1370, t, { top: '#b8883a', bot: '#5a3a1a', tufts: 16, seed: 22206 });
    push(820, 1500, 0.9); for (let k = -1; k <= 1; k++) pencil([[k * 60, 0], [0, -150]], { w: 6, col: '#2a1a10', pass2: false });
    ell(0, -80, 70, 46, { wash: '#2a2a2a', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 6; i++) { const r = rng(hsh(FRAME, i, 52)); blob([[-40 + i * 16, 0], [-34 + i * 16 + r() * 10, -40 - r() * 34], [-26 + i * 16, 0]], { wash: i % 2 ? '#ff7a2a' : '#ffd04a', washA: 1, line: false }); }
    glow(0, -20, 160, 'rgba(255,140,60,1)', 0.6); smokeCol(0, -160, t, { col: 'rgba(220,200,190,0.45)', h: 260, sz: 0.3, n: 5, wind: 60 }); pop();
    push(1060, 1560, 1); shape([[-150, 0], [150, -10], [170, 40], [-130, 50]], { wash: '#8a1a2a', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 4; k++) pencil([[-130 + k * 80, 10], [-110 + k * 80, 40]], { w: 4, col: '#e8b04a', pass2: false }); pencil([[-140, 20], [160, 14]], { w: 3, col: '#2a5a6a', pass2: false }); pop();
    push(600, 1580, 0.8); blob([[-70, 0], [-80, -50], [-30, -70], [40, -60], [80, -20], [70, 0]], { wash: '#6a3a1e', washA: 1, w: 2.2, col: L }); pencil([[-60, -40], [60, -40]], { w: 3, col: '#e8b04a', pass2: false }); pop();   // седло
    push(1180, 1480, 0.8, 0.3); rect(-20, -140, 40, 140, { wash: '#7a3a1e', washA: 1, w: 2, col: L }); for (let k = 0; k < 4; k++) { pencil([[-12 + k * 8, -140], [-14 + k * 8, -200]], { w: 2, col: '#3a2410', pass2: false }); poly([[-18 + k * 8, -200], [-14 + k * 8, -214], [-10 + k * 8, -200]], { wash: '#e8e0d0', washA: 1, w: 1, col: L }); } pop();   // колчан
    push(940, 1640, 0.8); ell(0, -50, 60, 22, { wash: '#e8d8b0', washA: 1, w: 2, col: L }); rect(-60, -50, 120, 50, { wash: '#8a4a2a', washA: 1, w: 2, col: L }); for (let k = 0; k < 5; k++) pencil([[-60 + k * 30, -50], [-50 + k * 30, 0]], { w: 2, col: '#e8d8b0', pass2: false }); pop();   // барабан
    jug(720, 1600, 0.7, '#b8622a'); jug(500, 1640, 0.5, '#8a5a2a'); sack(1180, 1680, 0.7, '#c8a878'); barrel(420, 1700, 0.5, '#6a4a2a');
    human(1000, 1440, 0.5, t, { body: '#3a5a6a', legs: '#2a2420', hat: 'fur', hatCol: '#6a4a2a', long: 1, seed: 281, armL: 'hold', armR: 'hold', flip: -1, skin: '#d8a47e' });   // кашевар
    yurt(1230, 1720, 0.9, t, { smoke: 1, felt: '#efe2c8', band: '#b0283a' });
    for (const [x, y, sc, c, fl, arm] of [[560, 1760, 0.72, '#5a2a3a', 1, 'hold'], [740, 1790, 0.78, '#2a4a5a', -1, 'wave'], [900, 1770, 0.7, '#6a5a2a', -1, 'hold']]) human(x, y, sc, t, { body: c, legs: '#2a2420', hat: 'fur', hatCol: '#5a3a1e', long: 1, seed: 290 + x, armR: arm, flip: fl, skin: '#d8a47e', trim: VG.gold });
    horse(1020, 1880, 0.7, t, { col: '#6a3a1e', saddle: '#b0283a', flip: -1 }); cart(420, 1880, 0.8, t, { load: 1 });
    for (let i = 0; i < 30; i++) { const r = rng(22230 + i); ell(-50 + r() * 1300, 1500 + r() * 420, 8 + r() * 10, 4 + r() * 4, { wash: '#7a6a5a', washA: 1, w: 1, col: L, a: 0.7 }); }
    dog(560, 1470, 0.36, t, { col: '#a8743a', bark: t > EV.hd_orda && t < EV.hd_orda + 1 });
    if (t > EV.hd_no) for (let i = 0; i < 8; i++) { const r = rng(hsh(FRAME, i, 53)); ell(420 + r() * 50, 1320 - r() * 70, 6, 4, { wash: '#b8883a', washA: 1, w: 1, col: L }); }   // пыль от «тук»
  }
  function front(t) { for (let i = 0; i < 6; i++) kovyl(-80 + i * 60, 2000, 3.2, t, { col: '#f2c070', seed: 22207 + i }); for (let i = 0; i < 4; i++) kovyl(1120 + i * 50, 2040, 3, t, { col: '#e8b060', seed: 22217 + i }); }
  function hud(t) {
    if (t > EV.hd_mam - 0.05) { const q = popK(t, EV.hd_mam - 0.05, 0.35); push(600, 760, q, -0.04); rect(-190, -52, 380, 104, { wash: '#14100a', washA: 0.88, w: 3, col: VG.gold }); txt('«МАМАЕВ»', 0, 8, 62, { col: VG.gold, font: 'Osw' }); pop();
      if (t > EV.hd_no + 0.05) { const s = popK(t, EV.hd_no + 0.05, 0.3); push(640, 800, 1.4 - 0.4 * s, 0.18); rect(-170, -40, 340, 80, { wash: '#b0283a', washA: 0.85 * s, w: 4, col: '#ffd0c0' }); txt('НЕ ЗДЕСЬ', 0, 12, 52, { col: '#fff0e8', font: 'Osw', a: s }); pop(); } }
  }

  WORLD.horde = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(9, () => camp(t));
    lay(3, () => hill(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 400, 1300, 1600], '#ffc890', t, 22208, { sp: 18, vx: 120, sz: 2.6, a: 0.5, wob: 18 });
    windLines(t, 0.3, [-100, 1200, 1200, 1700], 22209);
    haze('#e8704a', 0.07);
  };
  DIR.horde = {
    outfit: 'shapan', light: { side: 1, rim: '#ffa070' }, grade: ['#b0503a', 0.14],
    act: () => [[S0.horde, 'talk'], [EV.hd_mam, 'smug'], [EV.hd_orda, 'awe'], [EV.hd_but, 'sideeye'], [EV.hd_no, 'annoyed']],
    pose: (t, u, b) => { const knock = t > EV.hd_no - 0.15 && t < EV.hd_no + 0.5;
      return Object.assign(b, { x: 300, y: 1510, s: 1.04, look: t < EV.hd_but ? [0.7, -0.5] : [0.3, 0.1], tailUp: t > EV.hd_orda,
        prop: 'stick', propAng: knock ? 0.9 + Math.sin(t * 30) * 0.2 : 0.2, hand: knock ? [120, -150] : [90, -230] }); },
    cam: () => [[S0.horde, 620, 980, 0.1], [EV.hd_mam, 640, 900, 0.06], [EV.hd_orda, 620, 920, 0.02, 'x'], [EV.hd_no, 560, 1020, 0.14], [S1.horde, 560, 1040, 0.18]],
    hud
  };
  TRANS_IN.horde = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // земля: снизу поднимается вал степной земли и осыпается комьями
    const up = sm(clamp(k / 0.5)), fall = sm(clamp((k - 0.5) / 0.5));
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const top = lerp(2000, -200, up) + fall * 2300;
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 2100); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, top + Math.sin(x * 0.02) * 50 + Math.sin(x * 0.07 + 2) * 20); ctx.lineTo(W, 2100); ctx.closePath();
      ctx.fillStyle = '#5a3a1e'; ctx.fill(); ctx.restore();
      const r = rng(22210); for (let i = 0; i < 60; i++) { const x = r() * W, y = top + r() * 300 - fall * r() * 400, s = 10 + r() * 30; ctx.fillStyle = i % 3 ? '#7a5a32' : '#3a2410'; ctx.fillRect(x, y, s, s * 0.7); }
      motes(80, [0, top - 200, W, top + 100], '#c8a070', t, 22211, { sp: 200, vx: 100, sz: 4, a: Math.sin(Math.PI * k), wob: 30 }); });
  } };
})();
