/* 013 — сцена `customs`: 1749, устье Темерника у Дона. Бревенчатая будка «ТАМОЖНЯ» со шлагбаумом, причал, турецкий парусник,
   купцы с бочками, коврами и мешками, таможенник в треуголке с печатью ставит штамп. Ни крепости, ни города — степь и река.
   На «таможни» опускается указ «1749 · Елизавета» с печатью; на «Ростов-папа» над будкой проявляется табличка «РОСТОВ-ПАПА»;
   на «таможенника» таможенник важно кивает, шлагбаум поднимается. Том — бордовый камзол с галуном. Переход В сцену —
   шлагбаум опускается поперёк кадра, за ним новая эпоха. */
(() => {
  EV.cu_cust = wtk('s7', 'таможни.');
  EV.cu_papa = wtk('s7', 'Ростов-папа');
  EV.cu_son = wtk('s7', 'таможенника!');
  KEYW.push('таможни.', 'Ростов-папа', 'таможенника!');

  function sky(t) { vgrad(-900, 1000, ['#6a9ac8', '#c8d8e0', '#f6e4c0'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 190 + i * 90 + Math.sin(k) * 10, 76, 26, { wash: '#fbf6ec', washA: 0.85, line: false }); } }
  function far(t) { don(900, t, { h: 220, seed: 13801 }); ship(1150, 1050, 0.5, t, 0, { flag: '#c8302a', hull: '#5a3a1e' }); const g = shape([[-600, 900], [-600, 840], [1700, 830], [1700, 900]], { wash: '#b8b070', washA: 1, w: 2, col: '#4a5a24' });
    pencil([[-600, 1000], [-100, 1060], [200, 1120]], { w: 30, col: RS.donL }); }
  function post(t) {                                                   // будка, шлагбаум, купцы, товары
    const g = shape([[-600, 1500], [-600, 1100], [200, 1080], [1700, 1110], [1700, 1500]], { wash: RS.steppe, washA: 1, w: 2, col: RS.steppeD }); hatch(g.path, g.bb, { gap: 10, a: 0.16, col: RS.steppeD, ang: -0.4, w: 1.2 });
    customsHut(380, 1200, 0.72, t, { up: t > EV.cu_son ? sm((t - EV.cu_son) / 0.6) : 0 });
    for (let q = 0; q < 3; q++) { push(780 + q * 90, 1260, 0.6); ell(0, -60, 50, 64, { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1408' }); for (const yy of [-100, -20]) pencil([[-50, yy], [50, yy]], { w: 4, col: '#4a4a4e', pass2: false }); pop(); }
    push(1100, 1250, 0.6); rect(-120, -60, 240, 60, { wash: '#a8302a', washA: 1, w: 2.4, col: '#3a0a08' }); for (let q = 0; q < 5; q++) pencil([[-110 + q * 50, -56], [-90 + q * 50, -4]], { w: 3, col: '#e8b030', pass2: false }); ell(-120, -30, 20, 30, { wash: '#c8402a', washA: 1, w: 2, col: '#3a0a08' }); pop();
    human(960, 1290, 0.52, t, { body: '#3a6a8a', legs: '#c8b088', hair: '#1a1410', beard: 'long', hat: 'fur', hatCol: '#e8e4dc', face: 'smile', armR: 'point', armL: 'hold', long: true, seed: 13810, flip: -1 });
    human(1230, 1300, 0.5, t, { body: '#8a3a2a', legs: '#3a2a1a', hair: '#1a1410', beard: 'short', hat: 'fur', hatCol: '#c8302a', face: 'calm', armR: 'hold', armL: 'hold', long: true, seed: 13811, flip: -1 });
    const ox = 640; human(ox, 1300, 0.56, t, { body: '#2e5a3a', trim: '#c8302a', legs: '#e8e0c8', boots: '#1a1a1a', hair: '#e8e4dc', face: t > EV.cu_son ? 'smile' : 'calm', armR: t > EV.cu_cust && t < EV.cu_cust + 0.5 ? 'up' : 'point', armL: 'hold', prop: 'scroll', seed: 13812 }); tricorn(ox, 1300 - 330 * 0.56 - 4 - (t > EV.cu_son ? Math.abs(Math.sin((t - EV.cu_son) * 8)) * 8 : 0), 0.56);
  }

  WORLD.customs = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => far(t));
    lay(4, () => post(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#c8b07a', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 900, 1300, 1900], '#f6e8c0', t, 13820, { sp: -10, vx: 20, sz: 3, a: 0.35, wob: 30 }));
  };
  DIR.customs = {
    outfit: 'kamzol', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a870', 0.08],
    act: () => [[S0.customs, 'talk'], [EV.cu_cust, 'smug'], [EV.cu_papa, 'wink'], [EV.cu_son - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.cu_papa ? 1 : undefined, hand: t > EV.cu_papa ? [200, -300] : [120, -270] }),
    cam: () => [[S0.customs, 560, 1060, 0.06], [EV.cu_cust, 560, 1100, 0.1], [EV.cu_papa, 600, 1060, 0.06], [EV.cu_son, 580, 1080, 0.1], [S1.customs, 560, 1060, 0.12]],
    hud: t => {
      if (t > EV.cu_cust && t < EV.cu_papa) { const k = popK(t, EV.cu_cust, 0.35); push(600, 760, k, -0.04); rect(-220, -110, 440, 220, { wash: '#efe0b8', washA: 0.98, w: 3, col: '#5a3a1a' }); txt('УКАЗЪ', 0, -66, 36, { font: 'Osw', col: '#5a1a10' }); txt('Темерницкая таможня', 0, -16, 30, { col: '#2a1a10' }); txt('15 декабря 1749', 0, 26, 30, { font: 'Osw', col: '#2a1a10' }); ell(140, 70, 40, 40, { wash: '#c8302a', washA: 1, w: 2, col: '#5a0a08' }); txt('Е', 140, 82, 34, { font: 'Osw', col: '#f6e0c0' }); pop(); }
      if (t > EV.cu_papa) { const k = popK(t, EV.cu_papa, 0.35); push(560, 760, k, 0.03); rect(-250, -80, 500, 160, { wash: '#2a1a10', washA: 0.92, w: 3, col: '#000' }); txt('РОСТОВ-ПАПА', 0, -6, 56, { font: 'Osw', col: '#ffd24a' }); txt('сын таможенника', 0, 50, 28, { col: '#f2ece0' }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В customs: шлагбаум опускается поперёк кадра
  TRANS_IN.customs = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const q = sm(k), ang = lerp(-1.4, 0, sm(clamp(k / 0.55))); drawBuf(k < 0.55 ? A : B, k < 0.55 ? 1 : 1.06 - 0.06 * sm((k - 0.55) / 0.45));
    scr(() => { const f = 1 - sm(clamp((k - 0.6) / 0.4)); push(60, 960, 1, ang); for (let q2 = 0; q2 < 12; q2++) rect(q2 * 90, -40, 90, 80, { wash: q2 % 2 ? '#1a1a1a' : '#f2ece0', washA: f, w: 2, col: '#000', a: f }); pop(); rect(30, 900, 60, 1020, { wash: '#6a4424', washA: f, w: 2, col: '#2a1408', a: f }); });
  } };
})();
