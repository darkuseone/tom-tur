/* 029 — сцена `war`: 1854, осада Севастополя. Пасмурный день, главный свет — пробивающееся солнце справа, второй — вспышки
   выстрелов. На горизонте флот Англии и Франции (фрегаты и пароходы), в бухте торчат мачты затопленных кораблей, город на холме.
   Бастион: туры, пушки, артиллеристы, офицер с трубой, сестра милосердия, барабанщик. На «Франция» флот даёт залп;
   на «отбить» ядро бьёт в бруствер (одна короткая тряска — настоящий удар). На «Зато» камера к верёвке с сушащимися вязаными
   вещами; на «балаклаву» Том в «пуф» — в балаклаве и кардигане, бирки «БАЛАКЛАВА ← город у Севастополя», «КАРДИГАН ← граф
   Кардиган». Без крови и тел. Переход В: ядро пробивает кадр — рваная дыра с щепой. */
(() => {
  EV.wr_fleet = wtk('s5', 'Франция');
  EV.wr_hit = wtk('s5', 'отбить.');
  EV.wr_but = wtk('s5', 'Зато');
  EV.wr_bal = wtk('s5', 'балаклаву');
  EV.wr_card = wtk('s5', 'кардиган.');
  KEYW.push('Франция', 'балаклаву', 'кардиган.');
  SHAKES.push([EV.wr_hit + 0.05, 0.25, 8]);
  const L = KR.ink, SUN = [900, 420], HX = 820;
  const volley = t => t > EV.wr_fleet ? Math.max(0, 1 - (t - EV.wr_fleet) / 0.5) : 0, hit = t => t > EV.wr_hit ? clamp((t - EV.wr_hit) / 1.0) : 0;
  function sky(t) { vgrad(-900, 1000, ['#4a5a6a', '#8a98a0', '#d8d0b8', '#e8d8b0'], 1); shaft(SUN[0], SUN[1], 260, 900, 0.3, 'rgba(255,240,200,1)', 0.14); glow(SUN[0], SUN[1], 140, 'rgba(255,240,200,1)', 0.3);
    for (let i = 0; i < 6; i++) { const r = rng(5400 + i), y = 300 + i * 90, dx = (t * 8) % 200; blob([[-300 + r() * 200 + dx, y], [200 + dx, y - 34], [700 + dx, y - 14], [1300, y + 10], [200, y + 30]], { wash: '#6a7480', washA: 0.4, line: false }); } }
  function fleet(t) { seaKR(960, 1180, t, 5401, { cols: ['#4a6a80', '#2a4a60', '#1a3448'], n: 30 });
    const v = volley(t); [[60, 'frigate', 0.3], [330, 'steam', 0.32], [600, 'frigate', 0.26], [880, 'steam', 0.3], [1150, 'frigate', 0.28]].forEach(([x, k, s], i) => { shipKR(x, 1010, s, t, k, i + 3);
      if (v > 0 || (t > EV.wr_fleet && Math.sin(t * 5 + i * 2) > 0.92)) { const a = Math.max(v, 0.6); glow(x + 60, 990, 60, 'rgba(255,200,120,1)', 0.7 * a); ell(x + 90, 980, 50 + (1 - a) * 40, 30, { wash: '#e8e4dc', washA: 0.8 * a, line: false }); } });
    depthFog('#c8c8c0', 0.06); }
  function bay(t) {                                                  // бухта, затопленные корабли (мачты из воды), город на холме
    seaKR(1180, 1320, t, 5402, { cols: ['#3a6a88', '#2a5a78', '#1a4460'], n: 20 });
    for (const x of [200, 330, 470, 600]) { pencil([[x, 1260], [x + 6, 1120]], { w: 7, col: '#3a2a1e', pass2: false }); pencil([[x - 30, 1150], [x + 36, 1150]], { w: 4, col: '#3a2a1e', pass2: false }); }
    blob([[700, 1320], [800, 1150], [1000, 1100], [1300, 1120], [1600, 1320]], { wash: '#b8a888', washA: 1, w: 2, col: L });
    for (let i = 0; i < 7; i++) { const x = 820 + i * 100, h = 70 + (i % 3) * 30; rect(x, 1180 - h, 80, h, { wash: '#f0e8d8', washA: 1, w: 1.6, col: L }); poly([[x - 6, 1180 - h], [x + 40, 1180 - h - 30], [x + 86, 1180 - h]], { wash: '#8a6a4a', washA: 1, w: 1.4, col: L }); }
    push(1060, 1080, 0.6); rect(-60, -120, 120, 120, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); blob([[-40, -120], [-30, -170], [0, -200], [30, -170], [40, -120]], { wash: KR.gold, washA: 1, w: 1.6, col: L }); pop();
  }
  function bastion(t) {                                              // туры, пушки, артиллеристы, офицер, сестра милосердия, барабанщик
    rect(-500, 1300, 2200, 140, { wash: '#7a6448', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.25, col: '#3a2a1a', ang: 0.3 } });
    for (let i = 0; i < 14; i++) { const x = -420 + i * 130; push(x, 1320, 0.9); ell(0, -50, 52, 62, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) pencil([[-48, -90 + q * 24], [48, -90 + q * 24]], { w: 2, col: '#4a3418', a: 0.7, pass2: false }); pop(); }
    for (const x of [140, 560, 1000]) { push(x, 1320, 0.8); rect(-40, -60, 220, 40, { wash: '#2a2a30', washA: 1, w: 2, col: L, rot: -0.12 }); for (const k of [-20, 120]) ell(k, -10, 40, 40, { line: true, w: 7, col: '#4a2e14' }); if (Math.sin(t * 4 + x) > 0.85) { glow(200, -90, 70, 'rgba(255,200,120,1)', 0.6); ell(240, -110, 60, 40, { wash: '#e8e4dc', washA: 0.7, line: false }); } pop(); }
    const P = [[60, '#2a3a2a', 'cap', 'hold', 'stick'], [260, '#2a3a2a', 'cap', 'hold', undefined], [460, '#2a3a2a', 'cap', 'swing', 'stick'], [680, '#3a3a5a', 'helmet', 'point', undefined], [860, '#f4f0e8', 'scarf', 'hold', undefined], [1060, '#2a3a2a', 'cap', 'hold', undefined], [1240, '#8a1a1a', 'cap', 'up', undefined]];
    P.forEach(([x, c, h, a, pr], i) => human(x, 1330, 0.6, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#f4f0e8' : '#1a1a1e', legs: '#2a2a30', armR: a, prop: pr, long: i === 4 ? 1 : undefined, beard: i === 3 ? '#3a2410' : undefined, flip: x > 700 ? -1 : 1, seed: 5410 + i, face: t > EV.wr_hit && t < EV.wr_hit + 1 ? 'shock' : 'calm' }));
    const h = hit(t); if (h > 0) { const r = rng(5420); for (let q = 0; q < 12; q++) { const a = -Math.PI / 2 + (r() - 0.5) * 2, d = h * (200 + r() * 300); ell(HX + Math.cos(a) * d, 1300 + Math.sin(a) * d + h * h * 300, 16, 12, { wash: '#6a5034', washA: 1 - h, line: false }); }
      for (let q = 0; q < 6; q++) { const r2 = rng(5430 + q); ell(HX + (r2() - 0.5) * 200 * h, 1260 - h * (100 + r2() * 200), 80 + h * 120, 60 + h * 80, { wash: '#8a8478', washA: 0.85 * (1 - h * 0.6), line: false }); } if (h < 0.25) glow(HX, 1280, 300, 'rgba(255,210,140,1)', 0.8 * (1 - h / 0.25)); }
    if (t > EV.wr_fleet && t < EV.wr_hit) { const k = (t - EV.wr_fleet) / (EV.wr_hit - EV.wr_fleet); ell(lerp(1300, HX, k), lerp(980, 1290, k) - Math.sin(k * 3.14) * 300, 16, 16, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); }
  }
  function ground(t) {                                               // земля бастиона, ядра пирамидой, бочки, банники, верёвка с вязаными вещами
    rect(-500, 1440, 2200, 900, { wash: '#6a5640', washA: 1, w: 2, col: L }); const r = rng(5440); for (let i = 0; i < 60; i++) { ell(r() * 2000 - 400, 1450 + r() * 480, 14 + r() * 26, 6 + r() * 10, { wash: i % 2 ? '#7a6650' : '#5a4632', washA: 1, w: 1, col: L, a: 0.5 }); }
    lightPool(SUN[0] - 300, 1640, 700, 160, 'rgba(255,236,190,1)', 0.35);
    for (let q = 0; q < 10; q++) { const row = q < 4 ? 0 : q < 7 ? 1 : q < 9 ? 2 : 3, i = [0, 1, 2, 3, 0, 1, 2, 0, 1, 0][q]; ell(1060 + i * 40 + row * 20, 1760 - row * 34, 20, 20, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); }
    for (const [x, y] of [[-60, 1700], [10, 1730]]) { push(x, y, 1); ell(0, -50, 46, 56, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#2a2a30', pass2: false }); pop(); }
    for (let q = 0; q < 2; q++) { push(1220 + q * 40, 1760, 1, -0.3 - q * 0.1); pencil([[0, 0], [0, -260]], { w: 6, col: KR.woodD, pass2: false }); ell(0, -270, 18, 26, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop(); }
    if (t > EV.wr_but - 0.2) { const k = sm(clamp((t - EV.wr_but + 0.2) / 0.4)); push(650, 1300, 1); pencil([[-260, 0], [260, 20]], { w: 3, col: '#3a2a1a', pass2: false }); for (const x of [-260, 260]) pencil([[x, 0], [x, 400]], { w: 8, col: KR.woodD, pass2: false });
      [[-170, 'bal'], [-40, 'card'], [90, 'bal'], [200, 'card']].forEach(([x, kind], i) => { push(x, 6 + (x + 260) / 26, k, Math.sin(t * 2 + i) * 0.08);
        if (kind === 'bal') { const P = []; for (let q = 0; q <= 20; q++) { const a = Math.PI / 2 + q / 20 * 6.283; P.push([Math.cos(a) * 46, 70 + Math.sin(a) * 60]); } shape(P, { wash: '#4a4f3a', washA: 1, w: 2, col: L }); ell(0, 60, 30, 20, { wash: '#2a2a1e', washA: 1, line: false }); }
        else { shape([[-56, 0], [56, 0], [70, 160], [-70, 160]], { wash: '#cdb68a', washA: 1, w: 2, col: L }); pencil([[0, 0], [0, 160]], { w: 3, col: '#7a6440', pass2: false }); for (let q = 0; q < 4; q++) ell(-8, 30 + q * 30, 4, 4, { wash: '#6a4424', washA: 1, line: false }); }
        pencil([[-8, -6], [-8, 8]], { w: 4, col: '#c8a868', pass2: false }); pop(); }); pop(); }
    for (let i = 0; i < 9; i++) { push(-380 + i * 230, 1560, 1.1); ell(0, -50, 56, 64, { wash: '#8a6a3a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#3a2410', ang: 1.5 } }); for (let q = 0; q < 4; q++) pencil([[-52, -92 + q * 24], [52, -92 + q * 24]], { w: 2.4, col: '#4a3418', a: 0.7, pass2: false }); pop(); }
    push(880, 1780, 1.2); rect(-90, -110, 330, 56, { wash: '#2a2a30', washA: 1, w: 2.4, col: L, rot: -0.14, shade: { gap: 5, a: 0.3, col: '#000000', ang: 0 } }); for (const k of [-50, 150]) { ell(k, -20, 66, 66, { line: true, w: 9, col: '#4a2e14' }); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.28; pencil([[k, -20], [k + Math.cos(a) * 60, -20 + Math.sin(a) * 60]], { w: 4, col: '#4a2e14', pass2: false }); } } pop();
    human(1120, 1800, 1.0, t, { body: '#2a3a2a', hat: 'cap', hatCol: '#1a1a1e', legs: '#2a2a30', armR: 'swing', prop: 'stick', flip: -1, seed: 5480, face: t > EV.wr_hit && t < EV.wr_hit + 1 ? 'shock' : 'calm' });
    castShadow(330, 1612, 120, 480, -0.4, 0.35); moodDark(-100, 900, 900, 1800, '#141418', 0.3);
  }
  function front(t) { for (const x of [-160, 1240]) { push(x, 2000, 1.6); ell(0, -60, 70, 90, { wash: '#2a1e12', washA: 1, line: false }); pop(); } }
  WORLD.war = (t, u, cat) => {
    lay(40, () => sky(t)); lay(20, () => fleet(t)); lay(9, () => bay(t)); lay(3.2, () => { bastion(t); depthFog('#a8a498', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(24, [-100, 600, 1200, 1500], '#c8c4b8', t, 5450, { sp: 2, sz: 5, a: 0.3, wob: 30 }));
  };
  DIR.war = {
    outfit: 'hussar', light: { side: 1, rim: '#fff0c8' }, grade: ['#2a3040', 0.08],
    act: () => [[S0.war, 'suspicious'], [EV.wr_fleet, 'shock'], [EV.wr_hit, 'scared'], [EV.wr_but, 'smug'], [EV.wr_bal, 'grin'], [EV.wr_card, 'proud']],
    pose: (t, u, b) => { const duck = t > EV.wr_hit - 0.1 && t < EV.wr_hit + 0.6, w1 = clamp((t - EV.wr_but + 0.2) / 0.7), x = lerp(260, 360, sm(w1));
      return Object.assign(b, { x, y: 1612, s: 0.95, outfit: t > EV.wr_bal ? 'cardigan' : 'hussar', walk: w1 > 0 && w1 < 1 ? t * 9 : 0, squash: duck ? 0.14 : b.squash, look: t > EV.wr_bal ? [0, 0.1] : [0.9, -0.4],
        hand: duck ? [60, -400] : t > EV.wr_card ? [170, -320] : [150, -300], handF: duck ? [-50, -400] : undefined }); },
    afterCat: (t, u, P) => { puffK(P.x, P.y - 330 * P.s, 1, t, EV.wr_bal - 0.05, 0.5, 5460); },
    hud: t => { if (t > EV.wr_bal) { const k = popK(t, EV.wr_bal + 0.05, 0.3); push(640, 900, k, -0.04); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-250, -40, 500, 80); ctx.restore(); txt('БАЛАКЛАВА ← город у Севастополя', 0, 2, 32, { col: '#fff6e0', font: 'Osw' }); pop(); }
      if (t > EV.wr_card) { const k = popK(t, EV.wr_card, 0.3); push(640, 1000, k, 0.03); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-250, -40, 500, 80); ctx.restore(); txt('КАРДИГАН ← граф Кардиган', 0, 2, 32, { col: KR.goldL, font: 'Osw' }); pop(); } },
    cam: () => [[S0.war, 520, 900, -0.06], [EV.wr_fleet + 0.3, 540, 920, -0.02], [EV.wr_hit - 0.1, 600, 980, 0.04], [EV.wr_hit + 0.15, 580, 1000, 0.1, 'x'], [EV.wr_but, 520, 1060, 0.1], [EV.wr_bal, 430, 1140, 0.18, 'x'], [S1.war, 440, 1150, 0.22]]
  };
  TRANS_IN.war = { a: 0.08, b: 0.38, fx(k, t, A, B) {               // ядро пробивает кадр: рваная дыра растёт, щепа летит
    const e = sm(k), cx = 600, cy = 1000, R = Math.pow(e, 1.4) * 1700, r = rng(5470), P = []; for (let q = 0; q < 22; q++) { const a = q / 22 * 6.283; P.push([cx + Math.cos(a) * R * (0.75 + r() * 0.4), cy + Math.sin(a) * R * (0.75 + r() * 0.4)]); }
    drawBuf(A); inPath(pathOf(P), () => drawBuf(B)); if (e < 0.95) scr(() => { pencil(P.concat([P[0]]), { w: 10, col: '#3a2a1a', a: 0.9, pass2: false, gap: false }); const r2 = rng(5471); for (let q = 0; q < 16; q++) { const a = r2() * 6.283, d = R * 0.9 + r2() * 200; push(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1, a); rect(-26, -6, 52, 12, { wash: '#c8a878', washA: 1 - e, w: 1.2, col: KR.ink, a: 1 - e }); pop(); } }); } };
})();
