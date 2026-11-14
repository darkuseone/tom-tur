/* 027 — сцена `gold`: 1851, золотая лихорадка. Улица Сиднея у гавани: лавка «GOLD BOUGHT HERE» с весами, старатели с лотками и
   кирками, повозка с волами, лошадь, в гавани корабли с новыми охотниками за золотом. Главный свет — низкое солнце слева (золотое).
   Том (colono) с лотком: на «золото» в лотке вспыхивает самородок, на «богатым» вдоль улицы поднимаются каменные фасады из песчаника
   вместо палаток (город растёт на глазах), на «городом» — часы на башне. Переход В сцену — золотой песок ссыпается сверху. */
(() => {
  EV.gd_but = wtk('s2', 'Но');
  EV.gd_gold = wtk('s2', 'золото');
  EV.gd_rich = wtk('s2', 'богатым');
  EV.gd_city = wtk('s2', 'городом.');
  KEYW.push('золото', 'богатым');
  SHAKES.push([EV.gd_gold, 0.2, 6]);
  const L = SY.ink, SUN = [140, 820];
  const grow = t => sm(clamp((t - EV.gd_rich + 0.1) / 0.8));
  function sky(t) { vgrad(-900, 1200, ['#4a6aa8', '#c8a8a0', '#f0c880', '#ffe0a0'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,220,140,1)', 0.45); ell(SUN[0], SUN[1], 60, 60, { wash: '#fff2c8', washA: 1, line: false }); gulls(5, -100, 1180, 420, 700, t, 3310, 0.4, 24); }
  function port(t) { rect(-600, 960, 2400, 120, { wash: '#4a7aa0', washA: 1, line: false }); hills(960, 50, '#7a8a6a', 3311); for (let i = 0; i < 3; i++) tallShip(200 + i * 380, 1010, 0.26, t, { flip: i % 2 ? -1 : 1 }); depthFog('#f0d8b0', 0.08); }
  function street(t) {                                               // улица: палатки → фасады песчаника, лавка скупки, часовая башня
    const g = grow(t);
    for (let i = 0; i < 8; i++) { const x = -260 + i * 220, h = 260 + (i % 3) * 70;
      if (g < 1) { push(x, 1240, 1 - g * 0.6); shape([[-90, 0], [0, -120], [90, 0]], { wash: '#efe4c8', washA: 1 - g, w: 2, col: L }); pop(); }
      if (g > 0) { const hh = h * g; const b = rect(x - 100, 1240 - hh, 200, hh, { wash: SY.sand, washA: 1, w: 2, col: L }); shadeG(b.path, x - 100, 0, x + 100, 0, SY.sandD, 0.35);
        for (let r = 0; r < Math.floor(hh / 90); r++) for (let c = 0; c < 3; c++) rect(x - 70 + c * 55, 1240 - hh + 30 + r * 90, 30, 50, { wash: '#3a2a2a', washA: 1, w: 1.2, col: L });
        rect(x - 110, 1240 - hh - 16, 220, 18, { wash: '#c89a5a', washA: 1, w: 1.6, col: L }); } }
    if (g > 0.5) { push(1150, 1240, 1); rect(-50, -560 * g, 100, 560 * g, { wash: SY.sand, washA: 1, w: 2, col: L }); ell(0, -500 * g, 36, 36, { wash: '#f6efe0', washA: 1, w: 2, col: L }); const m = t * 2; pencil([[0, -500 * g], [Math.cos(m) * 26, -500 * g + Math.sin(m) * 26]], { w: 3, col: L, pass2: false }); poly([[-60, -560 * g], [0, -640 * g], [60, -560 * g]], { wash: '#6a4a3a', washA: 1, w: 2, col: L }); pop(); }
    push(620, 1250, 1); rect(-160, -220, 320, 220, { wash: '#8a5a2a', washA: 1, w: 2.4, col: L }); rect(-180, -280, 360, 70, { wash: '#2a1a10', washA: 1, w: 2, col: L }); txt('GOLD BOUGHT HERE', 0, -244, 30, { col: SY.goldL, font: 'Osw' });
    rect(-120, -180, 100, 120, { wash: '#2a1a10', washA: 1, w: 1.6, col: L }); pencil([[60, -150], [60, -60]], { w: 4, col: SY.goldD, pass2: false }); pencil([[0, -150], [120, -150]], { w: 3, col: SY.goldD, pass2: false }); for (const k of [0, 120]) ell(k, -110, 30, 8, { wash: SY.gold, washA: 1, w: 1.4, col: SY.goldD }); pop();
    const P = [[-120, '#8a3a2a', 'brim', 'stick', 1], [80, '#3a4a6a', 'brim', 'axe', 1], [360, '#6a5a3a', 'cap', null, -1], [880, '#2a5a4a', 'brim', 'stick', -1], [1000, '#7a2a2a', null, 'axe', -1], [1260, '#5a5a6a', 'brim', null, -1]];
    P.forEach(([x, c, h, pr, fl], i) => human(x, 1262, 0.56, t, { body: c, hat: h, hatCol: '#6a4a2a', legs: '#4a4a52', prop: pr, armR: pr ? 'hold' : (i % 2 ? 'wave' : 'swing'), flip: fl, seed: 3320 + i, beard: i % 2 ? 'long' : 'short', hair: '#3a2a1a', face: t > EV.gd_gold ? 'grin' : 'calm' }));
    push(260, 1262, 0.6); for (const k of [-60, 60]) ell(k, -30, 34, 34, { line: true, w: 6, col: '#4a2a12' }); rect(-90, -110, 180, 70, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); pop();
    push(1340, 1262, 0.6, 0, -1); for (const k of [-60, -30, 40, 70]) pencil([[k, -110], [k + Math.sin(t * 3 + k) * 4, 0]], { w: 8, col: '#3a2a1e', pass2: false }); ell(0, -140, 100, 46, { wash: '#5a3a24', washA: 1, w: 2.2, col: L }); blob([[70, -160], [120, -250], [150, -240], [110, -150]], { wash: '#5a3a24', washA: 1, w: 2, col: L }); pop();
  }
  function ground(t) {                                               // пыльная улица под Томом: колеи, лотки, мешки, кирки, лужа с золотым песком
    rect(-500, 1300, 2100, 900, { wash: '#b8905a', washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) pencil([[-500, 1360 + i * 120], [1600, 1380 + i * 120]], { w: 6, col: '#8a6a3a', a: 0.5, pass2: false });
    lightPool(400, 1620, 640, 140, 'rgba(255,214,130,1)', 0.5);
    for (const [x, y] of [[860, 1640], [960, 1660]]) { push(x, y, 1); blob([[-50, 0], [-56, -80], [-20, -110], [20, -110], [56, -80], [50, 0]], { wash: '#c8a878', washA: 1, w: 2, col: L }); txt('$', 0, -50, 36, { col: '#5a3a1a', font: 'Osw' }); pop(); }
    push(1100, 1700, 1, 0.4); pencil([[0, -140], [0, 40]], { w: 8, col: '#6a4424', pass2: false }); blob([[-60, -150], [60, -150], [70, -130], [-70, -130]], { wash: '#8a8e94', washA: 1, w: 2, col: L }); pop();
    for (const [x, s1, c] of [[-80, 'HOTEL', '#7a2a2a'], [760, 'BANK', '#2a3a5a']]) { push(x, 1300, 1); rect(-80, -40, 160, 50, { wash: c, washA: 1, w: 2, col: L }); txt(s1, 0, -14, 28, { col: SY.goldL, font: 'Osw' }); pencil([[-60, 10], [-60, 120]], { w: 4, col: '#3a2a1a', pass2: false }); pencil([[60, 10], [60, 120]], { w: 4, col: '#3a2a1a', pass2: false }); pop(); }
    for (const [x, y] of [[180, 1720], [240, 1750]]) { push(x, y, 1); ell(0, 0, 40, 50, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (const yy of [-30, 30]) pencil([[-38, yy], [38, yy]], { w: 4, col: '#3a3a40', pass2: false }); pop(); }
    push(1240, 1720, 0.9); blob([[-50, 0], [-40, -50], [20, -60], [50, -40], [50, 0]], { wash: '#a8743a', washA: 1, w: 2, col: L }); blob([[40, -50], [70, -80], [90, -60], [70, -40]], { wash: '#a8743a', washA: 1, w: 1.8, col: L }); pencil(spline([[-48, -30], [-80, -60], [-90, -80]], false, 6), { w: 6, col: '#a8743a', pass2: false }); for (const k of [-30, 30]) pencil([[k, 0], [k, 30]], { w: 6, col: '#a8743a', pass2: false }); pop();   // пёс
    for (let q = 0; q < 6; q++) { const x = -200 + q * 90; pencil([[x, 1310], [x + 90, 1300]], { w: 2, col: '#3a2a1a', pass2: false }); shape([[x + 40, 1305], [x + 60, 1306], [x + 50, 1330]], { wash: q % 2 ? SY.red : '#2a3a8a', washA: 1, w: 1, col: L }); }
    castShadow(330, 1612, 120, 560, 0.25, 0.4); moodDark(SUN[0], 1100, 900, 1700, '#2a1a10', 0.3);
  }
  function front(t) { for (let i = 0; i < 6; i++) { const x = -80 + i * 260; sil([[x - 40, 2200], [x - 30, 1880], [x + 30, 1880], [x + 40, 2200]], '#3a2a1a', 1); } push(1160, 1700, 1.8); ell(0, 0, 90, 50, { wash: '#5a4030', washA: 1, w: 2, col: '#1a0e06' }); pop(); }
  WORLD.gold = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => port(t));
    lay(3.4, () => { street(t); depthFog('#f0d8a8', 0.05); });
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    lay(2.2, () => motes(36, [-100, 900, 1200, 1500], '#ffd870', t, 3330, { sp: 4, sz: 2.6, a: 0.5, wob: 18, add: 1 }));
    lay(6, () => motes(14, [-100, 800, 1300, 1200], '#e8d0a0', t, 3331, { sp: 2, sz: 5, a: 0.18, wob: 30 }));
  };
  DIR.gold = {
    outfit: 'colono', light: { side: -1, rim: '#ffd070' }, grade: ['#c8902a', 0.08],
    act: () => [[S0.gold, 'talk'], [EV.gd_gold, 'awe'], [EV.gd_rich, 'grin'], [EV.gd_city, 'proud']],
    pose: (t, u, b) => { const sh = t < EV.gd_gold ? Math.sin(t * 9) * 16 : 0; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.gd_gold && t < EV.gd_rich ? [0.4, 0.2] : [0.7, -0.4], hand: [200 + sh, -300], handF: [60 + sh, -300], tailUp: t > EV.gd_gold }); },
    afterCat: (t, u, P) => { const x = P.x + 130 * P.s, y = P.y - 300 * P.s, sh = t < EV.gd_gold ? Math.sin(t * 9) * 16 : 0; push(x + sh, y, 1, -0.05); ell(0, 0, 110, 26, { wash: '#4a4a52', washA: 1, w: 2.4, col: L }); ell(0, -6, 90, 16, { wash: '#7a6a5a', washA: 1, line: false });
      if (t > EV.gd_gold - 0.05) { const q = popK(t, EV.gd_gold - 0.05, 0.3); blob([[-26, -10], [-10, -34], [20, -30], [30, -8], [0, 0]], { wash: SY.gold, washA: 1, w: 1.6, col: SY.goldD }); glow(0, -16, 90 * q, 'rgba(255,220,100,1)', 0.45); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + t * 2; pencil([[Math.cos(a) * 40, -16 + Math.sin(a) * 30], [Math.cos(a) * (60 + 20 * q), -16 + Math.sin(a) * (44 + 16 * q)]], { w: 3, col: SY.goldL, a: q, pass2: false }); } } pop(); },
    cam: () => [[S0.gold, 600, 1000, 0.04], [EV.gd_gold, 420, 1120, 0.18, 'x'], [EV.gd_rich, 640, 960, -0.02, 'x'], [S1.gold, 640, 960, 0.0]]
  };
  TRANS_IN.gold = { a: 0.12, b: 0.38, fx(k, t, A, B) {               // золотой песок ссыпается сверху и открывает 1851-й
    const e = sm(k), y = lerp(-200, H + 300, e); drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, y); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
      const r = rng(hsh(FRAME, 3335)); ctx.save(); ctx.fillStyle = '#ffd060'; for (let i = 0; i < 700; i++) { const x = r() * W, yy = y - r() * 260; ctx.globalAlpha = 0.5 + r() * 0.5; ctx.fillRect(x, yy, 4, 4); } ctx.restore(); pencil([[0, y], [W, y + 20]], { w: 18, col: '#e8b030', pass2: false }); });
  } };
})();
