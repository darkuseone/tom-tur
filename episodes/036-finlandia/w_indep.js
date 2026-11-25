/* 036 — сцена `indep`, 6.12.1917. Сенатская площадь в снегу, вечер: над Сенатом поднимают бело-синий флаг (сине-белый крест, без
   гербов), горожане с факелами и свечами в окнах, студенты поют, журналист у столба читает газету «ITSENÄINEN», трамвай. Памятник
   царю на месте. Главный свет — факелы и окна (тёплый) на синем снегу. На «ушла» — флаг взлетает, плашка «6.12.1917 НЕЗАВИСИМОСТЬ ·
   31.12 ПРИЗНАНА»; на «оставили» Том (пальто) смахивает снег с постамента и стучит по нему — «стоит». */
(() => {
  const L = FIC.ink;
  EV.in_go = wtk('s7', 'ушла'); EV.in_tsar = wtk('s7', 'царя'); EV.in_left = wtk('s7', 'оставили.');
  KEYW.push('ушла', 'оставили.');
  function sky(t) { vgrad(-900, 1100, ['#0a1430', '#1e2e5a', '#3a4a7a'], 1); const r = rng(12000); for (let i = 0; i < 50; i++) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(r() * 1600 - 300, r() * 600, 2.5, 2.5); }
    for (let k = 0; k < 2; k++) { const pts = []; for (let i = 0; i <= 20; i++) pts.push([-200 + i * 80, 380 + k * 60 + Math.sin(i * 0.6 + t + k) * 40]); pencil(pts, { w: 40, col: FIC.aur, a: 0.18, pass2: false, gap: false }); } }
  function far(t) { cathedral(560, 1060, 0.62, t, { col: '#d8dcec', dome: '#3a6a5a' }); engel(-80, 1060, 300, 220, t, { lit: 1, col: '#b8a878' }); engel(1160, 1060, 300, 240, t, { lit: 1, cols: 1, col: '#b8a878' });
    const up = sm(clamp((t - EV.in_go + 0.2) / 0.9)); pencil([[1160, 760], [1160, 560]], { w: 5, col: '#3a3a3a', pass2: false }); finFlag(1160, lerp(740, 560, up), 140, 90, t, { pole: 0 }); depthFog('#2a3a6a', 0.05); }
  function square(t) {                                              // памятник на месте, люди с факелами, трамвай
    statueA2(640, 1240, 0.72, t, { snow: 1 }); const tx = 1500 - ((t * 60) % 2200); push(tx, 1230, 0.6); rect(-280, -200, 560, 170, { wash: '#3a6a4a', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 7; q++) rect(-260 + q * 76, -186, 60, 70, { wash: '#ffe0a0', washA: 1, w: 1.4, col: L }); for (const k of [-200, 200]) ell(k, -20, 24, 24, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
    const P = [[160, '#1a1a1e', 'cap'], [250, '#3a2a2a', 'fur'], [340, '#2a2a3a', 'scarf'], [900, '#1a1a2a', 'cap'], [990, '#4a3a3a', 'fur'], [1080, '#2a3a2a', 'scarf']];
    P.forEach(([x, c, h], i) => { human(x, 1310, 0.64, t, { body: c, hat: h, hatCol: h === 'cap' ? '#f4f4f0' : '#3a2a1a', legs: '#2a2a2a', long: h === 'scarf' ? 1 : undefined, armR: t > EV.in_go ? 'wave' : 'hold', flip: x > 600 ? -1 : 1, seed: 12010 + i, face: t > EV.in_go ? 'grin' : 'calm' });
      if (i % 2) { push(x + 30 * (x > 600 ? -1 : 1), 1310 - 260 * 0.64, 0.64); pencil([[0, 0], [0, 80]], { w: 6, col: '#5a3a1a', pass2: false }); for (let q = 0; q < 3; q++) { const ph = (t * 2 + q / 3) % 1; blob([[-12, 0], [0, -30 - ph * 40], [12, 0]], { wash: q % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - ph, line: false }); } glow(0, -20, 50, 'rgba(255,170,80,1)', 0.35); pop(); } });
  }
  function ground(t) {                                              // снег, следы саней, сугробы, газеты, лампа
    rect(-500, 1330, 2200, 1000, { wash: '#d0d8ec', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#6a7a9a', ang: 0.2 } }); const r = rng(12020);
    for (let i = 0; i < 2; i++) pencil([[-400, 1600 + i * 40], [600, 1560 + i * 40], [1500, 1620 + i * 40]], { w: 8, col: '#a8b4cc', a: 0.6, pass2: false });
    for (let i = 0; i < 5; i++) blob([[-300 + i * 400, 1800], [-200 + i * 400, 1760], [-60 + i * 400, 1790], [-120 + i * 400, 1820]], { wash: '#ffffff', washA: 0.9, w: 1.2, col: '#a8b4c4' });
    push(1000, 1600, 1); pencil([[0, 0], [0, -380]], { w: 7, col: '#2a2a2e', pass2: false }); rect(-60, -300, 120, 160, { wash: '#f0e8d0', washA: 1, w: 2, col: L }); txt('ITSENÄINEN', 0, -250, 20, { col: L, font: 'Osw' }); txt('6.12.1917', 0, -210, 24, { col: FIC.blue, font: 'Osw' }); for (let q = 0; q < 3; q++) pencil([[-44, -180 + q * 14], [44, -180 + q * 14]], { w: 2, col: '#8a8270', pass2: false }); pop();
    lightPool(640, 1560, 900, 200, 'rgba(255,190,110,1)', 0.28); castShadow(400, 1720, 110, 440, 2.9, 0.3); moodDark(540, 1200, 450, 1500, '#04081a', 0.3);
  }
  function extras(t) { for (let i = 0; i < 3; i++) human(-60 + i * 70, 1540, 0.75, t, { body: '#1a1a1e', hat: 'cap', hatCol: '#f4f4f0', legs: '#1a1a1e', armR: 'wave', seed: 12030 + i, face: 'grin' });
    push(1180, 1560, 0.85); human(0, 0, 1, t, { body: '#5a4a3a', hat: 'fur', hatCol: '#3a2a1a', legs: '#2a2a2a', armR: 'wave', flip: -1, seed: 12035, face: 'grin' }); finFlag(-60, -380, 80, 50, t, { pole: 160 }); pop(); }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 10 : 9); }
  function extras2(t) {                                             // студенческий хор, конный извозчик, мальчик-газетчик, снеговик, ёлки
    for (let i = 0; i < 4; i++) human(860 + i * 55, 1500, 0.62, t, { body: '#1a1a1e', hat: 'cap', hatCol: '#f4f4f0', legs: '#1a1a1e', armR: 'hold', prop: 'scroll', flip: -1, seed: 12050 + i, face: 'grin' });
    push(120, 1460, 0.6, 0, 1); horse(0, 0, 1, t, { col: '#3a2a1a', seed: 6 }); rect(110, -150, 200, 70, { wash: '#2a2a3a', washA: 1, w: 2, col: L }); pencil([[110, -80], [320, -80]], { w: 6, col: '#3a2a1a', pass2: false }); human(220, -150, 0.6, t, { body: '#1a1a1e', hat: 'fur', hatCol: '#3a2a1a', legs: '#1a1a1e', armR: 'hold', seed: 12055, face: 'calm' }); pop();
    push(1080, 1620, 0.7); ell(0, -40, 50, 44, { wash: '#ffffff', washA: 1, w: 2, col: L }); ell(0, -110, 36, 32, { wash: '#ffffff', washA: 1, w: 2, col: L }); ell(0, -160, 24, 22, { wash: '#ffffff', washA: 1, w: 2, col: L }); poly([[0, -160], [30, -154], [0, -150]], { wash: '#e8741e', washA: 1, line: false }); for (const d of [-1, 1]) pencil([[d * 36, -110], [d * 90, -150]], { w: 4, col: '#5a3a1a', pass2: false }); rect(-26, -200, 52, 20, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); pop();
    push(560, 1560, 0.6); human(0, 0, 1, t, { body: '#5a4a3a', hat: 'cap', hatCol: '#2a2a2a', legs: '#3a2a2a', armR: 'wave', seed: 12056, face: 'grin' }); rect(-60, -190, 60, 40, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); pop();
    for (let i = 0; i < 2; i++) { push(-80 + i * 1360, 1300, 0.6); pineF(0, 0, 400, t, { snow: 1 }); pop(); }
    for (let i = 0; i < 8; i++) { const x = 300 + i * 70, y = 1900 - (i % 2) * 20; push(x, y, 1); rect(-8, -30, 16, 30, { wash: '#f4efe4', washA: 1, w: 1, col: L }); blob([[-4, -30], [0, -46 - Math.sin(t * 9 + i) * 3], [4, -30]], { wash: '#ffd060', washA: 1, line: false }); pop(); }
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
    for (let i = 0; i < 2; i++) { push(380 + i * 360, 1600 + i * 20, 0.8); rect(-110, -60, 220, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-110, -110, 220, 14, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) pencil([[k, -42], [k, 0]], { w: 6, col: '#2a2a2a', pass2: false }); human(-40, -40, 0.7, t, { body: ['#5a6a8a', '#8a5a4a'][i], hat: i ? 'scarf' : 'cap', hatCol: '#3a3a3a', legs: '#2a2a2a', long: i ? 1 : undefined, armR: 'hold', seed: 12300 + i + 30, face: 'smile' }); pop(); }
  }
  WORLD.indep = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => square(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(34, [-100, 500, 1200, 1900], '#ffffff', t, 12040, { sp: 3, vx: -1, sz: 3, a: 0.7, wob: 10 }));
  };
  DIR.indep = {
    outfit: 'director', light: { side: 1, rim: '#ffc890' }, grade: ['#0a1430', 0.08],
    act: () => [[S0.indep, 'proud'], [EV.in_go, 'grin'], [EV.in_tsar, 'suspicious'], [EV.in_left, 'smug']],
    pose: (t, u, b) => { const knock = t > EV.in_left - 0.1 && t < EV.in_left + 0.5; return Object.assign(b, { x: knock ? 470 : 380, y: 1720, s: 0.95, look: t < EV.in_tsar ? [0.6, -0.8] : [0.8, -0.4], hand: knock ? [180, -220] : [150, -300], squash: knock ? 0.04 : b.squash, frost: 0.3 }); },
    hud: t => fiBoard(640, 1000, 0.8, t, EV.in_go - 0.1, [['6.12.1917 · НЕЗАВИСИМОСТЬ', 40, '#ffe08a'], ['31.12 · ПРИЗНАНА', 46]], { w: 600 }),
    cam: () => [[S0.indep, 620, 960, -0.06], [EV.in_go, 700, 880, -0.04, 'x'], [EV.in_tsar, 600, 980, 0.02], [S1.indep, 580, 1000, 0.06]]
  };
  TRANS_IN.indep = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H * (1 - e)); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); rect(0, H * (1 - e) - 30, W, 30, { wash: FIC.blue, washA: 1, line: false }); rect(0, H * (1 - e), W, 20, { wash: '#ffffff', washA: 1, line: false }); }); } };
})();
