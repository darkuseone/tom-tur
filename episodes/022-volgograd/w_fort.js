/* 022 — сцена `fort`: 1589, деревянный острог Царицын у впадения речки Царицы в Волгу; на горизонте — тот же холм с каменной бабой.
   Тёплый вечер, багровое небо, сталь Волги. Частокол, рубленые башни с шатрами, деревянная церковь, стрельцы с бердышами, струги,
   рыбаки с сетью, плотники. На «Царицын» на воротную башню прибивают доску «ЦАРИЦЫН»; на «речке» вспыхивает и течёт речка с биркой
   «р. ЦАРИЦА»; на «царицы» над острогом — призрак царицы в кокошнике, его перечёркивает красный крест.
   Переход В сцену — река: поток воды катится слева направо и смывает землю прошлой сцены. */
(() => {
  EV.ft_name = wtk('s2', 'Царицын.');
  EV.ft_river = wtk('s2', 'речке,');
  EV.ft_ghost = wtk('s2', 'царицы.');
  EV.ft_under = wtk('s2', 'холмом');
  KEYW.push('Царицын.', 'речке,', 'царицы.');
  SHAKES.push([EV.ft_name + 0.05, 0.15, 5]);
  const L = VG.ink;

  function tower(x, base, w, h, t, o = {}) {                       // рубленая башня: венцы брёвен, бойницы, шатёр с главкой
    const p = rect(x - w / 2, base - h, w, h, { wash: o.col || '#8a6440', washA: 1, w: 2.4, col: L });
    for (let k = 0; k < h / 22; k++) pencil([[x - w / 2, base - k * 22], [x + w / 2, base - k * 22]], { w: 1.6, col: '#3a2410', a: 0.6, pass2: false });
    for (const sd of [-1, 1]) for (let k = 0; k < h / 22; k++) ell(x + sd * w / 2, base - 11 - k * 22, 6, 9, { wash: '#c8a070', washA: 1, w: 1, col: L });
    rect(x - w / 2 - 14, base - h - 40, w + 28, 40, { wash: '#7a5434', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 3; k++) rect(x - w / 3 + k * w / 3 - 8, base - h - 30, 16, 20, { wash: '#1a1008', washA: 1, w: 1.2, col: L });
    poly([[x - w / 2 - 20, base - h - 40], [x, base - h - 40 - h * 0.6], [x + w / 2 + 20, base - h - 40]], { wash: '#5a3a22', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 1.3 } });
    pencil([[x, base - h - 40 - h * 0.6], [x, base - h - 70 - h * 0.6]], { w: 3, col: L, pass2: false });
    if (o.gate) { rect(x - w * 0.3, base - h * 0.45, w * 0.6, h * 0.45, { wash: '#2a1a10', washA: 1, w: 2, col: L }); ell(x, base - h * 0.45, w * 0.3, w * 0.2, { wash: '#2a1a10', washA: 1, w: 2, col: L }); }
    return p;
  }
  function church(x, base, s, t) {                                  // деревянная шатровая церковь с луковкой
    push(x, base, s); rect(-90, -200, 180, 200, { wash: '#9a7048', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 9; k++) pencil([[-90, -k * 22], [90, -k * 22]], { w: 1.4, col: '#3a2410', a: 0.5, pass2: false });
    poly([[-110, -200], [0, -280], [110, -200]], { wash: '#5a3a22', washA: 1, w: 2.2, col: L }); poly([[-40, -260], [0, -460], [40, -260]], { wash: '#6a4428', washA: 1, w: 2.2, col: L });
    blob([[-24, -460], [-26, -500], [0, -540], [26, -500], [24, -460]], { wash: '#3a6a8a', washA: 1, w: 2, col: L }); pencil([[0, -540], [0, -600]], { w: 3, col: VG.gold, pass2: false }); pencil([[-16, -580], [16, -580]], { w: 3, col: VG.gold, pass2: false });
    rect(-26, -90, 52, 90, { wash: '#2a1a10', washA: 1, w: 2, col: L }); pop();
  }
  function sky(t) { sunsetSky(t, { sx: 960, sy: 980, sr: 90, cols: ['#2a2440', '#4a3a5a', '#8a4a5a', '#d06a52', '#f8a060', '#ffd890'], seed: 22300, nb: 10 }); }
  function far(t) {                                                 // тот же холм с каменной бабой, Волга, острова
    kurgan(980, 1060, 900, 170, { col: '#7a6a4a', rim: 'rgba(255,120,80,1)', grass: 40, seed: 22301 });
    push(1000, 900, 0.36); blob([[-60, 10], [-50, -90], [-30, -150], [30, -150], [50, -90], [60, 10]], { wash: '#6a6458', washA: 1, w: 2.4, col: L }); ell(0, -175, 32, 36, { wash: '#6a6458', washA: 1, w: 2.4, col: L }); pop();
    volga(1070, 1170, t, { sx: 960, seed: 22302, top: '#c87a64', bot: '#2a3a5a', farBank: false });
    for (const [x, s] of [[140, 0.2], [420, 0.16]]) strug(x, 1130, s, t, { sailCol: '#efe0c0' });
  }
  function fort(t) {                                                // острог: частокол, башни, церковь, доска с именем
    hills(1240, 20, '#7a6038', 22303, 1);
    palisade(-120, 1300, 1300, 200, t, { col: '#8a6440', seed: 22304 });
    church(620, 1150, 0.7, t);
    for (const [x, w, h] of [[120, 120, 300], [980, 110, 260]]) tower(x, 1300, w, h, t);
    tower(420, 1310, 150, 340, t, { gate: 1, col: '#9a7048' });
    if (t > EV.ft_name - 0.1) { const q = popK(t, EV.ft_name - 0.1, 0.3); push(420, 1030, q); rect(-110, -28, 220, 56, { wash: '#e8d0a0', washA: 1, w: 2.4, col: L }); txt('ЦАРИЦЫН', 0, 4, 34, { col: '#3a2410', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 98, 0, 5, 5, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }
    for (const [x, c] of [[300, '#b0283a'], [540, '#2a5a8a'], [760, '#b0283a'], [880, '#3a6a3a']]) human(x, 1300, 0.34, t, { body: c, legs: '#2a2420', hat: 'fur', hatCol: '#3a2a1a', long: 1, beard: 1, seed: 300 + x, prop: 'spear', armR: 'hold', flip: x > 600 ? -1 : 1 });   // стрельцы на стене
    smokeCol(700, 1160, t, { col: 'rgba(220,200,190,0.4)', h: 260, sz: 0.3, n: 4 });
  }
  function river(t) {                                               // речка Царица: течёт по оврагу к Волге
    const lit = sm((t - EV.ft_river) / 0.4), P = [];
    for (let k = 0; k <= 20; k++) { const q = k / 20; P.push([lerp(1300, 560, q) + Math.sin(q * 9) * 40, lerp(1560, 1340, q)]); }
    const T = P.map(([x, y], i) => [x, y - 26 + i]), B = P.map(([x, y], i) => [x, y + 26 - i]).reverse();
    shape(T.concat(B), { wash: lerpC('#4a6a8a', '#9ad0ff', lit), washA: 1, w: 2.2, col: L });
    for (let i = 0; i < 12; i++) { const k = ((i / 12) + t * 0.15) % 1, j = Math.floor(k * 20); pencil([[P[j][0] - 14, P[j][1]], [P[j][0] + 14, P[j][1]]], { w: 3, col: '#e8f6ff', a: 0.6, pass2: false }); }
    if (lit > 0) { glow(900, 1460, 300, 'rgba(140,210,255,1)', 0.3 * lit * (1 - sm((t - EV.ft_river - 1.2) / 0.6))); const q = popK(t, EV.ft_river, 0.35); push(980, 1380, q, 0.05); rect(-130, -36, 260, 72, { wash: '#14100a', washA: 0.85, w: 2.6, col: '#9ad0ff' }); txt('р. ЦАРИЦА', 0, 8, 40, { col: '#cfeaff', font: 'Osw' }); pop(); }
  }
  function ground(t) {                                              // ближний берег: лодка, сети, бочки, плотники, рыбаки, гуси
    steppeGround(1340, t, { top: '#9a8a4a', bot: '#4a3a1e', tufts: 10, seed: 22305 });
    river(t);
    strug(860, 1650, 0.62, t, { sail: false, crew: false, col: '#7a5432' });
    for (let k = 0; k < 6; k++) pencil([[1080 + k * 18, 1500], [1060 + k * 22, 1640]], { w: 1.4, col: '#3a2a1a', a: 0.7, pass2: false });   // сети на кольях
    for (let k = 0; k < 4; k++) pencil([[1060, 1500 + k * 40], [1200, 1500 + k * 40]], { w: 1.4, col: '#3a2a1a', a: 0.7, pass2: false }); for (const x of [1060, 1200]) pencil([[x, 1480], [x, 1660]], { w: 7, col: '#5a3a22', pass2: false });
    barrel(560, 1640, 0.6); barrel(620, 1680, 0.55, '#6a4a2a'); sack(700, 1700, 0.6); crate(420, 1720, 110, 70); jug(760, 1720, 0.5);
    for (let k = 0; k < 3; k++) { pencil([[380 + k * 10, 1560 - k * 20], [700 + k * 10, 1540 - k * 20]], { w: 22, col: k % 2 ? '#8a6440' : '#7a5434', pass2: false }); ell(380 + k * 10, 1560 - k * 20, 11, 11, { wash: '#c8a070', washA: 1, w: 1.4, col: L }); }   // брёвна
    crowd(140, 1000, 1330, 10, t, 22320, { s: 0.3, cols: ['#6a3a2a', '#3a4a3a', '#5a4a3a', '#7a6a4a', '#4a3a3a'] });
    human(240, 1700, 0.6, t, { body: '#5a3a2a', legs: '#3a3020', hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 314, prop: 'stick', armR: 'hold' });   // купец
    horse(860, 1470, 0.36, t, { col: '#6a3a1e', flip: -1, load: 1 });
    human(560, 1520, 0.52, t, { body: '#e8dcc0', legs: '#4a3a2a', hat: 'cap', hatCol: '#6a4a2a', beard: 1, seed: 311, prop: 'axe', armR: Math.sin(t * 8) > 0 ? 'up' : 'hold' });
    human(980, 1560, 0.5, t, { body: '#6a5a4a', legs: '#3a3020', beard: 1, seed: 312, armL: 'hold', armR: 'hold', flip: -1 });   // рыбак
    human(1160, 1700, 0.56, t, { body: '#8a3a3a', legs: '#3a3020', hat: 'scarf', hatCol: '#e8d8c0', long: 1, seed: 313, armL: 'hold', flip: -1 });   // баба с коромыслом
    for (let k = 0; k < 4; k++) { const x = 700 + k * 50 + Math.sin(t * 2 + k) * 10, y = 1600 + (k % 2) * 16; ell(x, y, 22, 14, { wash: '#f2ece0', washA: 1, w: 1.6, col: L }); pencil([[x + 16, y - 6], [x + 30, y - 30]], { w: 6, col: '#f2ece0', pass2: false }); ell(x + 32, y - 32, 6, 5, { wash: '#f2ece0', washA: 1, w: 1, col: L }); }   // гуси
  }
  function front(t) { for (let k = 0; k < 4; k++) { const x = -70 + k * 46; pencil([[x, 2200], [x + 6, 1100 + k * 50]], { w: 28, col: '#5a3a22', pass2: false }); poly([[x - 14, 1100 + k * 50], [x + 6, 1040 + k * 50], [x + 26, 1100 + k * 50]], { wash: '#5a3a22', washA: 1, w: 2, col: L }); }
    for (let i = 0; i < 5; i++) kovyl(1130 + i * 40, 2050, 3, t, { col: '#d8b860' }); }
  function hud(t) {
    if (t < EV.ft_ghost - 0.05) return; const q = sm((t - EV.ft_ghost + 0.05) / 0.3), x = 760, y = 860;
    const G = [[x - 90, y + 220], [x - 70, y + 40], [x - 40, y - 10], [x - 50, y - 70], [x - 60, y - 130], [x - 30, y - 180], [x, y - 200], [x + 30, y - 180], [x + 60, y - 130], [x + 50, y - 70], [x + 40, y - 10], [x + 70, y + 40], [x + 90, y + 220]];
    sil(G, '#ffe8f0', 0.7 * q); ell(x, y - 60, 30, 34, { wash: '#f8d0d8', washA: 0.8 * q, line: false }); txt('ЦАРИЦА?', x, y + 270, 40, { col: '#fff0f4', font: 'Osw', a: q });
    const c = sm((t - EV.ft_ghost - 0.08) / 0.22); if (c > 0) { pencil([[x - 120, y - 200], [lerp(x - 120, x + 120, c), lerp(y - 200, y + 200, c)]], { w: 14, col: '#d8202a', pass2: false }); if (c > 0.5) pencil([[x + 120, y - 200], [lerp(x + 120, x - 120, (c - 0.5) * 2), lerp(y - 200, y + 200, (c - 0.5) * 2)]], { w: 14, col: '#d8202a', pass2: false }); }
  }

  WORLD.fort = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(5, () => fort(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(30, [-200, 400, 1300, 1600], '#ffd8a0', t, 22306, { sp: 14, vx: 60, sz: 2.4, a: 0.45, wob: 18 });
    haze('#d87a5a', 0.05);
  };
  DIR.fort = {
    outfit: 'kolchuga', light: { side: 1, rim: '#ffb080' }, grade: ['#a05a40', 0.12],
    act: () => [[S0.fort, 'talk'], [EV.ft_name, 'proud'], [EV.ft_river, 'smug'], [EV.ft_ghost, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1520, s: 1.02, look: t < EV.ft_river ? [0.5, -0.6] : t < EV.ft_ghost ? [0.8, 0.1] : [0.5, -0.5], tailUp: t > EV.ft_name,
      point: t > EV.ft_river && t < EV.ft_ghost + 0.4 ? 1 : undefined, hand: t > EV.ft_river && t < EV.ft_ghost ? [220, -200] : t > EV.ft_ghost && t < EV.ft_ghost + 0.4 ? [200, -360] : undefined }),
    cam: () => [[S0.fort, 620, 980, 0.12], [EV.ft_name, 600, 960, 0.06, 'x'], [EV.ft_river, 640, 1080, 0.1], [EV.ft_ghost, 640, 940, 0.06], [S1.fort, 620, 960, 0.12]],
    hud
  };
  TRANS_IN.fort = { a: 0.2, b: 0.35, fx(k, t, A, B) {              // река: поток катится слева направо, за ним — новая эпоха
    drawBuf(A); const x0 = lerp(-400, 1500, sm(k));
    scr(() => { ctx.save(); ctx.beginPath(); ctx.moveTo(-10, -10); for (let y = 0; y <= H; y += 40) ctx.lineTo(x0 + Math.sin(y * 0.01 + t * 10) * 60, y); ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.clip(); drawBuf(B); ctx.restore();
      const P = []; for (let y = -20; y <= H + 20; y += 40) P.push([x0 + Math.sin(y * 0.01 + t * 10) * 60, y]);
      ctx.save(); ctx.globalAlpha = 0.55 * Math.sin(Math.PI * k); ctx.fillStyle = '#3a6a9a'; ctx.fillRect(x0 - 260, 0, 260, H); ctx.restore();
      pencil(P, { w: 16, col: '#f2f8ff', a: 0.9, pass2: false, gap: false }); pencil(P.map(([x, y]) => [x - 40, y]), { w: 6, col: '#9ad0ff', a: 0.7, pass2: false, gap: false });
      motes(90, [x0 - 120, 0, x0 + 60, H], '#f2f8ff', t, 22307, { sp: 80, vx: 500, sz: 5, a: Math.sin(Math.PI * k), wob: 30 }); });
  } };
})();
