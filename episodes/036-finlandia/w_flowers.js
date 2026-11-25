/* 036 — сцена `flowers`, 1899. Февраль, Сенатская площадь в снегу, вечер: после Февральского манифеста Николая II (русификация)
   горожане молча идут к памятнику «доброму царю» и засыпают постамент цветами — горы букетов, венки с бело-синими лентами, свечи,
   студенты, дамы в муфтах, рабочие, жандарм растерянно смотрит. Главный свет — свечи и фонари (тёплый) на синем снегу.
   На «Николае Втором» — газетный лист «МАНИФЕСТЪ 1899» падает на снег; на «русификации» — плашка «ФЕВРАЛЬСКИЙ МАНИФЕСТ · РУСИФИКАЦИЯ»;
   на «цветами» — цветы растут горой, Том (пальто) кладёт свой букет. */
(() => {
  const L = FIC.ink;
  EV.fl_nik = wtk('s6', 'Николае'); EV.fl_rus = wtk('s6', 'русификации,'); EV.fl_put = wtk('s6', 'засыпали'); EV.fl_fl = wtk('s6', 'цветами.');
  KEYW.push('русификации,', 'цветами.');
  const F = t => sm(clamp((t - EV.fl_put) / 1.2));
  function sky(t) { vgrad(-900, 1100, ['#0e1a3a', '#2a3a6a', '#5a6a9a'], 1); const r = rng(11900); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(r() * 1600 - 300, r() * 600, 2.5, 2.5); } }
  function far(t) { cathedral(560, 1060, 0.62, t, { col: '#d8dcec', dome: '#3a6a5a' }); engel(-80, 1060, 300, 220, t, { lit: 1, col: '#b8a878' }); engel(1160, 1060, 300, 240, t, { lit: 1, cols: 1, col: '#b8a878' }); for (let i = 0; i < 10; i++) ell(-100 + i * 150, 1060, 80, 16, { wash: '#e8ecf8', washA: 1, line: false }); depthFog('#3a4a7a', 0.06); }
  function square(t) {                                              // памятник в цветах, люди со свечами и букетами
    const f = F(t); statueA2(640, 1240, 0.72, t, { flowers: f > 0.5 ? 2 : f > 0 ? 1 : 0 });
    for (let i = 0; i < 4; i++) { push(560 + i * 50, 1230, 0.7); pencil(ellPts(0, -30, 30, 30, 0, 0, 24), { w: 8, col: '#2a5a3a', pass2: false, gap: false }); pencil([[0, 0], [0, 30]], { w: 4, col: i % 2 ? FIC.blue : '#ffffff', pass2: false }); pop(); }
    const P = [[180, '#1a1a1e', 'cap'], [270, '#3a2a3a', 'scarf'], [360, '#4a3a2a', 'fur'], [900, '#1a2a3a', 'cap'], [990, '#5a3a4a', 'scarf'], [1080, '#3a3a44', 'fur'], [60, '#2a2a3a', 'scarf']];
    P.forEach(([x, c, h], i) => { human(x, 1310, 0.64, t, { body: c, hat: h, hatCol: h === 'cap' ? '#1a1a1e' : '#e8e4d8', legs: '#2a2a2a', long: h === 'scarf' ? 1 : undefined, armR: 'hold', prop: i % 2 ? 'candle' : undefined, flip: x > 600 ? -1 : 1, seed: 11910 + i, face: 'calm' });
      if (i % 2 === 0) { push(x + 30 * (x > 600 ? -1 : 1), 1310 - 160 * 0.64, 0.64); for (let q = 0; q < 5; q++) ell(-10 + q * 6, -20 - (q % 2) * 10, 10, 10, { wash: ['#e8283a', '#f8f0f0', '#f8d030'][q % 3], washA: 1, w: 1, col: L }); pop(); } });
    push(1180, 1300, 0.6); human(0, 0, 1, t, { body: '#2a3a2a', hat: 'police', hatCol: '#2a3a2a', legs: '#1a1a1a', armR: 'hold', flip: -1, seed: 11920, face: t > EV.fl_fl ? 'shock' : 'calm' }); pop();
  }
  function ground(t) {                                              // снег, следы, свечи в снегу, газета манифеста, фонарь
    rect(-500, 1330, 2200, 1000, { wash: '#d8e0f0', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#6a7a9a', ang: 0.2 } }); const r = rng(11930);
    for (let i = 0; i < 26; i++) ell(r() * 1700 - 300, 1380 + r() * 600, 10, 6, { wash: '#a8b4cc', washA: 1, line: false });
    for (let i = 0; i < 8; i++) { const x = 600 + i * 60, y = 1680 + (i % 2) * 30; push(x, y, 1); rect(-8, -30, 16, 30, { wash: '#f4efe4', washA: 1, w: 1, col: L }); blob([[-4, -30], [0, -46 - Math.sin(t * 9 + i) * 3], [4, -30]], { wash: '#ffd060', washA: 1, line: false }); glow(0, -40, 26, 'rgba(255,200,110,1)', 0.4); pop(); }
    if (t > EV.fl_nik) { const k = sm(clamp((t - EV.fl_nik) / 0.8)); push(lerp(300, 960, k), lerp(1300, 1820, k), 1, k * 3 - 0.4); rect(-90, -60, 180, 120, { wash: '#f0e8d0', washA: 1, w: 2, col: L }); txt('МАНИФЕСТЪ', 0, -30, 24, { col: L, font: 'Osw' }); txt('1899', 0, 10, 28, { col: FIC.red, font: 'Osw' }); pop(); }
    push(-60, 1700, 1); pencil([[0, 0], [0, -380]], { w: 7, col: '#2a2a2e', pass2: false }); rect(-30, -440, 60, 64, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(0, -408, 70, 'rgba(255,210,130,1)', 0.4); pop();
    lightPool(640, 1560, 900, 200, 'rgba(255,200,120,1)', 0.3); castShadow(400, 1720, 110, 460, 2.9, 0.3); moodDark(540, 1200, 450, 1500, '#04081a', 0.3);
  }
  function extras(t) { for (let i = 0; i < 3; i++) human(-60 + i * 70, 1540, 0.75, t, { body: ['#1a1a1e', '#1a1a2a', '#2a2a2a'][i], hat: 'cap', hatCol: '#f4f4f0', legs: '#1a1a1e', armR: 'hold', prop: 'candle', seed: 11940 + i, face: 'calm' });
    push(1180, 1540, 0.85); human(0, 0, 1, t, { body: '#5a3a4a', hat: 'fur', hatCol: '#3a2a1a', legs: '#2a2a2a', long: 1, armR: 'hold', flip: -1, seed: 11945, face: 'calm' }); push(-50, -200, 1); pencil(ellPts(0, 0, 40, 40, 0, 0, 24), { w: 10, col: '#2a5a3a', pass2: false, gap: false }); pop(); pop(); }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 8 : 7); }
  function extras2(t) {                                             // студенты с плакатом без текста-лозунга, санки с венками, фонарщик
    push(940, 1500, 0.8); for (const k of [-110, 110]) pencil([[k, 0], [k, -260]], { w: 5, col: '#6a4a2a', pass2: false }); rect(-120, -260, 240, 70, { wash: '#f4f4f0', washA: 1, w: 2, col: L }); rect(-30, -260, 30, 70, { wash: FIC.blue, washA: 1, line: false }); rect(-120, -236, 240, 22, { wash: FIC.blue, washA: 1, line: false }); for (let i = 0; i < 2; i++) human(-60 + i * 120, 0, 0.9, t, { body: '#1a1a1e', hat: 'cap', hatCol: '#f4f4f0', legs: '#1a1a1e', armR: 'hold', seed: 11970 + i, face: 'calm' }); pop();
    push(260, 1560, 0.8); rect(-100, -40, 200, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-80, 80]) pencil([[k, -20], [k - 10, 0], [k + 20, 0]], { w: 4, col: '#3a3a3a', pass2: false }); for (let q = 0; q < 2; q++) pencil(ellPts(-40 + q * 80, -80, 40, 40, 0, 0, 24), { w: 10, col: '#2a5a3a', pass2: false, gap: false }); pop();
    push(1240, 1460, 0.8); human(0, 0, 1, t, { body: '#3a3a2a', hat: 'cap', hatCol: '#2a2a2a', legs: '#2a2a2a', armR: 'wave', flip: -1, seed: 11975, face: 'calm' }); pencil([[-40, -260], [-80, -460]], { w: 4, col: '#4a3a2a', pass2: false }); glow(-80, -460, 30, 'rgba(255,210,130,1)', 0.5); pop();
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
    for (let i = 0; i < 2; i++) { push(-100 + i * 1380, 1500, 0.8); pencil([[0, 0], [0, -420]], { w: 7, col: '#2a2a2e', pass2: false }); pencil([[0, -420], [50, -440]], { w: 5, col: '#2a2a2e', pass2: false }); rect(30, -470, 50, 56, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(55, -440, 50, 'rgba(255,210,130,1)', 0.3); ell(55, -476, 30, 8, { wash: '#ffffff', washA: 0.9, line: false }); pop(); }
  }
  WORLD.flowers = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => square(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(36, [-100, 500, 1200, 1900], '#ffffff', t, 11950, { sp: 3, vx: -1, sz: 3, a: 0.7, wob: 10 }));
  };
  DIR.flowers = {
    outfit: 'director', light: { side: 1, rim: '#ffc890' }, grade: ['#0a1430', 0.08],
    act: () => [[S0.flowers, 'neutral'], [EV.fl_nik, 'suspicious'], [EV.fl_rus, 'annoyed'], [EV.fl_put, 'smug'], [EV.fl_fl, 'wink']],
    pose: (t, u, b) => { const lay_ = t > EV.fl_fl - 0.1 && t < EV.fl_fl + 0.5; return Object.assign(b, { x: lay_ ? 460 : 360, y: 1720, s: 0.95, look: [0.6, -0.6], hand: lay_ ? [180, -150] : [150, -280], squash: lay_ ? 0.05 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.fl_fl + 0.5) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, P.s); for (let q = 0; q < 6; q++) ell(-10 + q * 6, -24 - (q % 2) * 12, 12, 12, { wash: ['#e8283a', '#f8f0f0', '#f8d030'][q % 3], washA: 1, w: 1, col: L }); pencil([[0, 0], [10, 40]], { w: 4, col: '#3a6a2a', pass2: false }); pop(); },
    hud: t => { if (t > EV.fl_rus - 0.2) fiBoard(640, 1000, 0.8, t, EV.fl_rus - 0.2, [['1899 · ФЕВРАЛЬСКИЙ МАНИФЕСТ', 38, '#ffe08a'], ['ПРОТЕСТ — ЦВЕТАМИ', 48, '#ff8aa0']], { w: 620 }); },
    cam: () => [[S0.flowers, 600, 980, -0.06], [EV.fl_nik, 620, 1000, -0.02], [EV.fl_put, 620, 960, 0.06, 'x'], [S1.flowers, 620, 980, 0.08]]
  };
  TRANS_IN.flowers = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(11960); for (let i = 0; i < 40; i++) ell(r() * W, (r() * H + e * 900) % H, 16, 16, { wash: ['#e8283a', '#f8f0f0', '#f8d030', '#e86aa0'][i % 4], washA: a, line: false }); }); } };
})();
