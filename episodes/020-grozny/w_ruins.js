/* 020 — сцена `ruins`: весна 2000, после второй войны. Серый день, бесконечные остовы панельных домов, пустые окна, торчащая арматура,
   горы обломков, обгоревшие деревья, дым над промзоной. Жизнь среди руин: старушка с ведром воды, мужчины разбирают завал, мальчик
   с велосипедом, очередь к водовозке-бочке, кошка на плите. На «Вторая война» — дым поднимается; на «ООН» — газетная вырезка
   «ООН, 2003: самый разрушенный город на Земле»; на «разрушенным» — камера отъезжает и показывает масштаб.
   Переход В сцену — пыль обрушения 1994-го оседает и открывает руины 2000-го. */
(() => {
  EV.rn_war = wtk('s7', 'война.');
  EV.rn_un = wtk('s7', 'ООН');
  EV.rn_most = wtk('s7', 'разрушенным');
  EV.rn_earth = wtk('s7', 'Земле.');
  SHAKES.push([EV.rn_war, 0.25, 6]);
  KEYW.push('разрушенным', 'Земле.');

  function sky(t) { vgrad(-900, 1300, ['#5a5e66', '#8a8c90', '#b0aca4', '#c8bca8'], 1); ell(820, 0, 70, 70, { wash: '#efe6d0', washA: 0.7, line: false }); glow(820, 0, 300, 'rgba(255,240,210,1)', 0.25); clouds(t, -560, 8, '#8a8a90', 20001, 0.6); birds(t, 7, [-100, -300, 1200, 150], 20002, '#2a2a2a'); }
  function far(t) {                                               // дальние руины в дымке, промзона с дымом, хребет
    caucasus(980, t, { col: '#8a92a2', colD: '#5a6272', snow: '#eef0f2', h: 330, seed: 15, a: 0.6 });
    for (let k = 0; k < 14; k++) { const x = -300 + k * 120, h = 140 + (k * 37 % 5) * 40; panel(x, 1130, 100, h, t, { floors: 9, ruin: 1, col: '#8a8680', seed: 40 + k }); }
    for (let k = 0; k < 3; k++) smokeCol(200 + k * 400, 1060, t + k, { n: 12, h: 900, sz: 1.1, col: '#4a4644', a: 0.4, wind: 220, sp: 0.08 });
  }
  function mid(t) {                                                // ближние остовы: 9-этажка без стены, «сталинка» без крыши, обгоревшие деревья
    shape([[-600, 1200], [1700, 1190], [1700, 1400], [-600, 1400]], { wash: '#8a8070', washA: 1, w: 0, line: false });
    panel(-180, 1300, 420, 560, t, { floors: 9, ruin: 1, col: '#a09888', seed: 61 });
    panel(640, 1300, 520, 620, t, { floors: 9, ruin: 1, col: '#9a9282', seed: 62 });
    const st = rect(280, 980, 300, 320, { wash: '#8a7a68', washA: 1, w: 2, col: '#140c08' }); hatch(st.path, st.bb, { gap: 12, a: 0.14, col: '#2a2018', ang: 1.5, w: 1 });
    for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) rect(300 + c * 70, 1000 + f * 96, 42, 60, { wash: '#0e0a08', washA: 1, w: 1.4, col: '#140c08' });
    poly([[280, 980], [330, 940], [420, 970], [500, 930], [580, 980]], { wash: '#8a7a68', washA: 1, w: 2, col: '#140c08' });   // обломанный край
    for (const [x, h] of [[240, 260], [600, 300], [1160, 240]]) { pencil([[x, 1300], [x + 6, 1300 - h]], { w: 12, col: '#1e1612', pass2: false }); pencil([[x + 4, 1300 - h * 0.6], [x + 70, 1300 - h * 0.85]], { w: 5, col: '#1e1612', pass2: false }); pencil([[x + 4, 1300 - h * 0.75], [x - 60, 1300 - h * 0.95]], { w: 4, col: '#1e1612', pass2: false }); }   // обгоревшие деревья
    rubble(-200, 1300, 1290, t, { n: 50, dy: 60, seed: 5 });
  }
  function life(t) {                                               // люди: старушка с ведром, разбор завала, водовозка, мальчик с велосипедом
    const L = '#140c08', w = Math.sin(t * 4);
    human(520 + (t - S0.ruins) * 30, 1430, 0.62, t, { body: '#3a2a3a', legs: '#2a2420', hat: 'scarf', hatCol: '#6a5a6a', long: 1, armR: 'hold', seed: 181 }); push(560 + (t - S0.ruins) * 30, 1360, 0.6); blob([[-24, 0], [-28, -50], [28, -50], [24, 0]], { wash: '#5a7a9a', washA: 1, w: 1.6, col: L }); pop();   // ведро
    for (const [x, sd, a] of [[800, 182, 'up'], [880, 183, 'swing'], [960, 184, 'hold']]) human(x, 1420, 0.62, t, { body: '#4a4a3a', legs: '#2a2a2a', hat: 'cap', hatCol: '#2a2a2a', seed: sd, armR: a, armL: a, beard: 1 });
    pencil([[860, 1300 - w * 20], [900, 1380]], { w: 6, col: '#6a4a2a', pass2: false }); push(1060, 1430, 0.7); for (const q of [0, 1]) ell(-60 + q * 40, -20, 30, 14, { wash: '#8a8278', washA: 1, w: 1.4, col: L }); rect(-90, -40, 70, 40, { wash: '#6a4a2a', washA: 1, w: 1.6 }); ell(-50, 0, 20, 20, { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#2a2a2a' }); pop();   // тачка
    push(180, 1440, 0.8); ell(0, -80, 120, 70, { wash: '#4a6a4a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) ell(sd * 70, 0, 26, 26, { wash: '#1a1a1a', washA: 1, w: 1.6 }); txt('ВОДА', 0, -80, 30, { col: '#f2e8d0', font: 'Osw' }); pencil([[120, -60], [200, -40]], { w: 6, col: '#2a2a2a', pass2: false }); pop();   // бочка-водовозка
    for (const [x, sd] of [[60, 185], [100, 186], [330, 187]]) human(x, 1450, 0.58, t, { body: ['#5a3a3a', '#3a3a5a', '#4a4a3a'][sd % 3], legs: '#2a2420', hat: 'scarf', hatCol: '#7a6a6a', long: sd !== 187, armR: 'hold', seed: sd, flip: sd === 187 ? -1 : 1 });
    for (let q = 0; q < 4; q++) { push(80 + q * 50, 1470, 0.6); blob([[-16, 0], [-20, -60], [20, -60], [16, 0]], { wash: ['#8ab0d0', '#e8e0c0', '#c86a4a', '#6a9a6a'][q], washA: 1, w: 1.4, col: L }); pop(); }   // бидоны и канистры
    human(1180, 1460, 0.44, t, { body: '#c83a2a', legs: '#2a2a40', seed: 188, armR: 'hold', armL: 'hold', flip: -1 }); push(1180, 1460, 0.6); for (const wx of [-50, 50]) ell(wx, -30, 30, 30, { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#2a2a2a' }); pencil([[-50, -30], [0, -70], [50, -30]], { w: 4, col: '#3a6a9a', pass2: false }); pop();   // мальчик с велосипедом
    push(700, 1330, 0.5); blob([[-30, 0], [-26, -30], [20, -32], [30, 0]], { wash: '#3a3a3a', washA: 1, w: 1.6, col: L }); ell(28, -40, 14, 12, { wash: '#3a3a3a', washA: 1, w: 1.4 }); poly([[20, -48], [24, -60], [30, -48]], { wash: '#3a3a3a', washA: 1, w: 1 }); poly([[32, -48], [36, -60], [40, -48]], { wash: '#3a3a3a', washA: 1, w: 1 }); pencil(spline([[-30, -6], [-60, -20], [-56, -50]], false, 5), { w: 5, col: '#3a3a3a', pass2: false }); pop();   // кошка на плите
  }
  function ground(t) {
    rect(-600, 1450, 2400, 700, { wash: '#7a7062', washA: 1, w: 0, line: false });
    rubble(-200, 1300, 1480, t, { n: 40, dy: 400, seed: 9, col: '#9a9080' });
    const r = rng(20003); for (let k = 0; k < 14; k++) { const x = -100 + r() * 1300, y = 1550 + r() * 450; ell(x, y, 40 + r() * 50, 10 + r() * 10, { wash: '#4a5a6a', washA: 0.5, line: false }); }   // лужи
    for (let k = 0; k < 4; k++) { const x = 600 + k * 150, y = 1700 + (k % 2) * 60; push(x, y, 1, (k - 1.5) * 0.2); rect(-80, -20, 160, 24, { wash: '#8a8478', washA: 1, w: 1.6 }); for (let q = 0; q < 3; q++) pencil([[-60 + q * 50, -20], [-56 + q * 50, -60]], { w: 3, col: '#4a3a2a', pass2: false }); pop(); }   // плиты с арматурой
    push(1100, 1600, 1); rect(-60, -70, 120, 70, { wash: '#3a5a7a', washA: 1, w: 1.6 }); txt('ЛЮДИ', 0, -50, 22, { col: '#f2e8d0', font: 'Osw' }); txt('ЖИВУТ', 0, -24, 22, { col: '#f2e8d0', font: 'Osw' }); pop();   // табличка на воротах «люди живут»
  }
  function front(t) { panel(-560, 2100, 480, 1400, t, { floors: 12, ruin: 1, col: '#5a5450', seed: 77 }); pencil([[1260, 2100], [1220, 700]], { w: 26, col: '#2a2420', pass2: false }); pencil([[1220, 900], [1100, 860]], { w: 8, col: '#2a2420', pass2: false }); pencil(spline([[1100, 860], [900, 900], [700, 880]], false, 6), { w: 2, col: '#1a1a1a', pass2: false }); }
  function hud(t) { if (t < EV.rn_un - 0.1) return; const k = popK(t, EV.rn_un - 0.1, 0.4); push(690, 920, 0.95 * k, -0.04); const L = '#1a1a1a';
    rect(-230, -130, 460, 260, { wash: '#ece6d6', washA: 0.97, w: 2.4, col: L }); for (let q = 0; q < 6; q++) pencil([[-200, 50 + q * 14], [200, 50 + q * 14]], { w: 1.4, col: '#6a6a6a', a: 0.4, pass2: false });
    txt('ООН · 2003', 0, -94, 30, { col: '#3a5a8a', font: 'Osw' }); txt('САМЫЙ РАЗРУШЕННЫЙ', 0, -40, 40, { col: '#1a1a1a', font: 'Osw' }); txt('ГОРОД НА ЗЕМЛЕ', 0, 6, 40, { col: '#8a1a1a', font: 'Osw' }); pop(); }

  WORLD.ruins = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(6, () => mid(t));
    lay(2.6, () => life(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    motes(60, [-200, -200, 1300, 2000], '#b8b0a4', t, 20004, { sp: 16, vx: 18, sz: 3, a: 0.5, wob: 30 });   // пыль
    haze('#a8a090', 0.08);
  };
  DIR.ruins = {
    outfit: 'pufferG2', light: { side: -1, rim: '#e8e0d0' }, grade: ['#5a5a5a', 0.18], hud,
    act: () => [[S0.ruins, 'neutral'], [EV.rn_un, 'awe'], [EV.rn_most, 'scared'], [EV.rn_earth, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1540, s: 1.0, look: [0.6, -0.3] }),
    cam: () => [[S0.ruins, 600, 1060, 0.16], [EV.rn_un, 600, 1040, 0.1], [EV.rn_most, 580, 1000, -0.06], [S1.ruins, 580, 990, -0.1]]
  };
  TRANS_IN.ruins = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // пыль обрушения оседает вниз и открывает руины
    drawBuf(k < 0.4 ? A : B); scr(() => { const d = k < 0.4 ? sm(k / 0.4) : 1 - sm((k - 0.4) / 0.6), top = k < 0.4 ? 0 : lerp(0, 2000, sm((k - 0.4) / 0.6)), r = rng(20005);
      for (let i = 0; i < 14; i++) { const x = r() * 1200 - 60, y = top + r() * (2000 - top), rr = 200 + r() * 220; blob([[x - rr, y], [x - rr * 0.5, y - rr * 0.7], [x + rr * 0.5, y - rr * 0.6], [x + rr, y], [x + rr * 0.4, y + rr * 0.5], [x - rr * 0.5, y + rr * 0.5]], { wash: i % 2 ? '#a8a094' : '#c0b8aa', washA: 0.95 * d, w: 1.2, col: '#6a6458', a: 0.3 * d }); } });
  } };
})();
