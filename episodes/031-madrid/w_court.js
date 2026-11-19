/* 031 — сцена `court`: 1561, маленький Мадрид. Полдень, солнце слева (главный свет). Над городком старый Алькасар с башнями, глинобитные дома,
   колокольня, свиньи и куры на улице, горожане удивлены. На «Филипп» въезжает король в чёрном на коне, за ним кареты, телеги с гобеленами,
   сундуками, мебелью, гвардия с алебардами. Плашка «1561 · ≈ 20 000 ЖИТЕЛЕЙ». На «Столица мировой империи» — КАРТА МИРА: красным
   владения Испании XVI в. (Америка, Филиппины, Нидерланды, юг Италии), стрелка «ДВОР · 1561» Толедо → Мадрид, звезда Мадрида,
   подпись «НАД ИМПЕРИЕЙ НЕ ЗАХОДИТ СОЛНЦЕ». Переход В: кровь-красный шёлк знамени разворачивается. Том — придворный (master). */
(() => {
  EV.ct_cent = wtk('s3', 'шестнадцатом');
  EV.ct_king = wtk('s3', 'Филипп');
  EV.ct_court = wtk('s3', 'двор.');
  EV.ct_map = wtk('s3', 'Столица') - 0.15;
  KEYW.push('Филипп', 'двор.', 'империи!');
  const L = MD.ink, SUN = [180, 420];
  function sky(t) { vgrad(-900, 1050, ['#3a7ad0', '#8ac0e8', '#e8f0f0', '#fff0c8'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 56, 56, { wash: '#fffbe0', washA: 1, line: false }); }
  function alcazar(t) {                                              // старый Алькасар на холме, колокольня, крыши городка
    blob([[-500, 1100], [-200, 960], [300, 930], [800, 950], [1700, 1080]], { wash: '#b8986a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#6a5030', ang: 1.1 } });
    push(760, 960, 0.9); rect(-260, -200, 520, 200, { wash: '#d8c8a8', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.15, col: '#8a7a5a', ang: 1.4 } }); for (const x of [-260, 0, 260]) { rect(x - 50, -330, 100, 330, { wash: '#d0c0a0', washA: 1, w: 2.2, col: L }); poly([[x - 56, -330], [x, -420], [x + 56, -330]], { wash: MD.slate, washA: 1, w: 1.8, col: L }); for (let q = 0; q < 3; q++) rect(x - 14, -300 + q * 80, 28, 40, { wash: '#2a2a3a', washA: 1, line: false }); }
    for (let q = 0; q < 10; q++) rect(-250 + q * 52, -120, 26, 40, { wash: '#2a2a3a', washA: 1, line: false }); pop();
    push(200, 950, 0.7); rect(-40, -300, 80, 300, { wash: '#c88a5a', washA: 1, w: 2, col: L }); rect(-26, -260, 52, 60, { wash: '#2a2a3a', washA: 1, line: false }); poly([[-46, -300], [0, -380], [46, -300]], { wash: MD.slate, washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 12; i++) { const x = -420 + i * 110, h = 70 + (i % 3) * 20; rect(x, 1040 - h, 100, h, { wash: ['#d8b888', '#c8a070', '#e0c898'][i % 3], washA: 1, w: 1.4, col: L }); poly([[x - 6, 1040 - h], [x + 50, 1040 - h - 30], [x + 106, 1040 - h]], { wash: MD.brick, washA: 1, w: 1.4, col: L }); rect(x + 40, 1040 - 40, 22, 40, { wash: '#4a2a1a', washA: 1, line: false }); }
    depthFog('#e8e4d8', 0.05); }
  function convoy(t) {                                               // король в чёрном на коне, кареты, телеги, гвардия, горожане
    rect(-500, 1100, 2200, 220, { wash: '#c8a878', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.15, col: '#7a6040', ang: 0.2 } });
    const k = clamp((t - EV.ct_cent) / 3.6), X = lerp(1200, 150, k);
    const horse = (x, y, s, col, rider) => { push(x, y, s, 0, -1); const ph = t * 8; for (const [lx, q] of [[-70, 0], [-40, 1.6], [60, 3.1], [90, 4.7]]) pencil([[lx, -110], [lx + Math.sin(ph + q) * 20, -50], [lx + Math.sin(ph + q) * 14, 0]], { w: 13, col, pass2: false });
      blob([[-110, -110], [-100, -170], [0, -185], [90, -175], [120, -120], [60, -95], [-60, -95]], { wash: col, washA: 1, w: 2, col: L }); blob([[90, -170], [130, -250], [170, -260], [190, -230], [150, -200], [130, -150]], { wash: col, washA: 1, w: 2, col: L }); if (rider) human(0, -150, 0.62, t, rider); pop(); };
    horse(X, 1270, 0.85, '#2a1a10', { body: '#1a1a1e', trim: MD.gold, hat: 'brim', hatCol: '#1a1a1e', beard: '#c8a050', legs: '#1a1a1e', armR: 'hold', seed: 7510, face: 'calm' });
    push(X + 380, 1270, 0.8); rect(-150, -220, 300, 160, { wash: '#4a2a1a', washA: 1, w: 2, col: L }); rect(-120, -200, 90, 80, { wash: '#8ac0e0', washA: 1, w: 1.4, col: L }); poly([[-160, -220], [0, -260], [160, -220]], { wash: MD.gold, washA: 1, w: 1.6, col: L }); for (const q of [-100, 100]) ell(q, -40, 50, 50, { line: true, w: 6, col: '#2a1a10' }); pop();
    push(X + 760, 1270, 0.8); rect(-160, -150, 320, 90, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); rect(-140, -230, 120, 80, { wash: '#a8402a', washA: 1, w: 1.6, col: L }); rect(0, -220, 120, 70, { wash: '#6a4424', washA: 1, w: 1.6, col: L }); rect(-120, -230, 80, 10, { wash: MD.gold, washA: 1, line: false }); for (const q of [-110, 110]) ell(q, -40, 46, 46, { line: true, w: 6, col: '#2a1a10' }); pop();
    for (let i = 0; i < 3; i++) human(X + 220 + i * 190, 1290, 0.7, t, { body: '#c8281e', trim: MD.yellow, hat: 'helmet', hatCol: '#a8acb0', legs: MD.yellow, armR: 'hold', prop: 'spear', seed: 7520 + i, face: 'calm', flip: -1 });
    const P = [[-280, '#8a6a4a', 'brim', 'shock'], [-150, '#c8a070', 'scarf', 'shock'], [-30, '#6a4a3a', null, 'grin']]; P.forEach(([x, c, h, f], i) => human(x, 1290, 0.6, t, { body: c, hat: h, hatCol: '#e8d8b0', legs: '#4a3a2a', armR: i === 2 ? 'wave' : 'hold', long: h === 'scarf' ? 1 : undefined, seed: 7530 + i, face: t > EV.ct_king ? f : 'calm' }));
  }
  function ground(t) {                                               // пыльная улица, свинья, куры, корзины, колодец, тележка с дынями
    rect(-500, 1320, 2200, 1000, { wash: '#c8a878', washA: 1, w: 2, col: L }); const r = rng(7540); for (let i = 0; i < 50; i++) ell(r() * 2000 - 400, 1340 + r() * 520, 10 + r() * 24, 5 + r() * 8, { wash: i % 2 ? '#b89868' : '#d8b888', washA: 1, w: 1, col: L, a: 0.5 });
    lightPool(SUN[0] + 400, 1640, 800, 160, 'rgba(255,240,190,1)', 0.35);
    push(980, 1760, 1); blob([[-70, -20], [-70, -70], [40, -80], [80, -50], [70, -20]], { wash: '#e8a8a0', washA: 1, w: 2, col: L }); for (const lx of [-50, -30, 40, 60]) pencil([[lx, -20], [lx, 10]], { w: 6, col: '#c88880', pass2: false }); ell(90, -50, 14, 12, { wash: '#e8a8a0', washA: 1, w: 1.4, col: L }); pop();
    for (let q = 0; q < 3; q++) { const x = 600 + q * 70 + Math.sin(t * 3 + q) * 10; push(x, 1830, 0.8); ell(0, -20, 26, 18, { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); ell(20, -36, 10, 10, { wash: '#f4f0e6', washA: 1, w: 1.2, col: L }); poly([[28, -36], [38, -34], [28, -30]], { wash: '#e8a83a', washA: 1, line: false }); pop(); }
    push(-60, 1760, 1); ell(0, -60, 80, 30, { wash: '#8a8478', washA: 1, w: 2, col: L }); rect(-80, -60, 160, 60, { wash: '#9a9488', washA: 1, w: 2, col: L }); pencil([[-70, -60], [-70, -180], [70, -180], [70, -60]], { w: 6, col: MD.woodD, pass2: false }); pop();
    push(1200, 1800, 1); rect(-80, -60, 160, 50, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) ell(-50 + q * 34, -70, 20, 16, { wash: '#a8c858', washA: 1, w: 1.2, col: L }); pop();
    castShadow(330, 1650, 120, 500, 0.6, 0.35); moodDark(1200, 900, 900, 1800, '#2a1a10', 0.25);
  }
  function mapBeat(t) {                                              // карта мира: владения империи, двор Толедо → Мадрид
    const k = sm(clamp((t - EV.ct_map) / 0.3)); if (k <= 0) return; MAPON = t; scr(() => { ctx.save(); ctx.translate(0, (1 - k) * 1900);
      const P = GLOBE.map(520, 1000, 4.6, -40, 8, { landCol: { eurasia: '#d8c8a0', africa: '#e2cc98' } });
      EMPIRE.concat([IBERIA]).forEach(Z => GLOBE.zone(P, Z, '#d8201a', 0.75, { w: 3, dash: false }));
      txt('ФИЛИППИНЫ →', 860, 1120, 32, { col: '#ffb0a0', font: 'Osw' }); txt('АМЕРИКА', P([-80, 0])[0], P([-80, 0])[1], 34, { col: '#5a1a10', font: 'Osw' });
      const [mx, my] = P([MAD.lon, MAD.lat]); push(mx, my, 0.8); poly([[0, -40], [12, -12], [42, -12], [18, 6], [26, 36], [0, 18], [-26, 36], [-18, 6], [-42, -12], [-12, -12]], { wash: MD.goldL, washA: 1, w: 2.4, col: L }); pop();
      ctx.restore(); infoPlate(560, 1300, [['НАД ИМПЕРИЕЙ НЕ ЗАХОДИТ СОЛНЦЕ', 38, '#ffb0a0'], ['столица — Мадрид, с 1561', 30]], t, EV.ct_map + 0.4, { edge: '#d8201a' }); });
  }
  WORLD.court = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => alcazar(t)); lay(3, () => convoy(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#2a1a10', 1); });
    lay(1.8, () => motes(20, [-100, 700, 1200, 1500], '#e8d8b0', t, 7550, { sp: 2, sz: 3, a: 0.4, wob: 20 }));
    mapBeat(t);
  };
  DIR.court = {
    outfit: 'master', light: { side: -1, rim: '#fff0c0' }, grade: ['#3a2a1a', 0.05],
    act: () => [[S0.court, 'talk'], [EV.ct_king, 'shock'], [EV.ct_court, 'awe'], [EV.ct_map, 'proud']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(120, 300, sm(w1)), bow = t > EV.ct_king + 0.4 && t < EV.ct_court + 0.4; return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, nod: bow ? 0.3 : 0, look: [0.9, -0.3], hand: bow ? [60, -420] : [150, -300] }); },
    hud: t => { if (t < EV.ct_map) infoPlate(560, 780, [['1561', 60, MD.goldL], ['≈ 20 000 ЖИТЕЛЕЙ', 36]], t, EV.ct_court - 0.1); },
    cam: () => [[S0.court, 600, 920, -0.08], [EV.ct_king, 660, 1000, 0.0], [EV.ct_court, 560, 1060, 0.06, 'x'], [S1.court, 560, 1060, 0.06]]
  };
  TRANS_IN.court = { a: 0.08, b: 0.38, fx(k, t, A, B) {             // красное знамя разворачивается сверху и открывает новую эпоху
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), Y = e < 0.5 ? e * 2 * H : H - (e - 0.5) * 2 * H; if (a > 0.02) { const P = [[-40, -40], [W + 40, -40]]; for (let x = W + 40; x >= -40; x -= 60) P.push([x, Y + Math.sin(x / 80 + t * 8) * 30]); shape(P, { wash: '#b8181a', washA: 1, w: 4, col: MD.ink, shade: { gap: 14, a: 0.2, col: '#5a0a08', ang: 1.57 } }); pencil([[-40, Y - 40], [W + 40, Y - 40]], { w: 14, col: MD.gold, a: 0.9, pass2: false }); } }); } };
})();
