/* 036 — сцена `capital`, 1812. Крошечный деревянный Хельсинки после пожара: пустырь на скале, где архитектор Энгель с чертежами
   размечает будущую Сенатскую площадь, рабочие тянут камни, леса первых каменных зданий, коровы и козы на выгоне, рыбный рынок у
   воды. Главный свет — весеннее солнце справа. На «Александр Первый» — указ со звездой; на «крошечный» — табличка «ХЕЛЬСИНКИ ·
   ≈ 4 000 ЖИТЕЛЕЙ» и Том (камзол) держит городок «на ладони» — макет; переход — колонна выезжает снизу. */
(() => {
  const L = FIC.ink, SUN = [960, 520];
  EV.cp_a1 = wtk('s3', 'Александр'); EV.cp_tiny = wtk('s3', 'крошечный'); EV.cp_hel = wtk('s3', 'Хельсинки.');
  KEYW.push('крошечный', 'Хельсинки.');
  function sky(t) { vgrad(-900, 1100, ['#5a8ad0', '#a8cce8', '#f4ecd8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,240,200,1)', 0.4); ell(SUN[0], SUN[1], 48, 48, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function far(t) { rect(-600, 1000, 2400, 60, { wash: FIC.sea, washA: 1, line: false }); hills(1010, 24, '#5a7a5a', 7.7); for (let i = 0; i < 6; i++) { push(-140 + i * 270, 1040, 0.5); rect(-80, -90, 160, 90, { wash: i % 2 ? '#a8582a' : '#c8a058', washA: 1, w: 2, col: L }); poly([[-90, -90], [0, -140], [90, -90]], { wash: '#5a4a3a', washA: 1, w: 2, col: L }); pop(); } depthFog('#eef0e8', 0.07); }
  function site(t) {                                                // стройка площади: леса, камни, Энгель с чертежом, рабочие
    push(560, 1200, 1); rect(-300, -260, 600, 260, { wash: '#e8dcc0', washA: 0.7, w: 2, col: L }); for (let i = 0; i < 8; i++) pencil([[-320 + i * 90, 0], [-320 + i * 90, -320]], { w: 4, col: '#8a5a32', pass2: false }); for (let i = 0; i < 5; i++) pencil([[-330, -i * 70], [330, -i * 70]], { w: 3, col: '#8a5a32', pass2: false });
    for (let i = 0; i < 6; i++) rect(-260 + i * 90, -240, 50, 70, { wash: '#4a5a6a', washA: 0.5, w: 1.2, col: L }); pop();
    push(1000, 1230, 0.8); rect(-200, -200, 400, 200, { wash: FIC.yel, washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) rect(-170 + i * 90, -160, 40, 60, { wash: '#4a5a6a', washA: 1, w: 1.2, col: L }); for (let i = 0; i < 5; i++) pencil([[-220 + i * 110, 0], [-220 + i * 110, -260]], { w: 3, col: '#8a5a32', pass2: false }); pop();
    push(300, 1290, 0.72); human(0, 0, 1, t, { body: '#1a2a4a', hat: 'brim', hatCol: '#1a1a1e', legs: '#e8e0d0', armR: 'hold', prop: 'scroll', seed: 11600, face: 'smile' }); pop();
    for (let i = 0; i < 4; i++) { const x = 680 + i * 90; human(x, 1300, 0.62, t, { body: ['#6a4a3a', '#4a5a3a', '#8a5a3a', '#5a5a6a'][i], hat: 'cap', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: 'hold', flip: -1, seed: 11610 + i, face: 'smile' }); }
    pencil([[640, 1300 - 150 * 0.62], [960, 1250]], { w: 3, col: '#a89070', pass2: false }); blob([[930, 1260], [960, 1230], [1010, 1240], [1000, 1280]], { wash: '#8a8478', washA: 1, w: 1.6, col: L });
  }
  function ground(t) {                                              // скальный пустырь: камни, тачка, бочки, коровы и козы
    rect(-500, 1330, 2200, 1000, { wash: '#9a9a7a', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.1, col: '#5a5a3a', ang: 0.3 } }); const r = rng(11620);
    for (let i = 0; i < 24; i++) blob([[r() * 1900 - 400, 1360 + r() * 600], [r() * 1900 - 380, 1340 + r() * 600], [r() * 1900 - 350, 1360 + r() * 600]], { wash: '#8a8478', washA: 1, w: 1.2, col: L });
    for (let i = 0; i < 50; i++) { const x = r() * 1900 - 400, y = 1360 + r() * 700; pencil([[x, y], [x + 3, y - 16]], { w: 2, col: '#5a7a3a', pass2: false }); }
    push(900, 1700, 1); rect(-70, -60, 140, 50, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) ell(-40 + q * 40, -70, 22, 14, { wash: '#a8a49a', washA: 1, w: 1.2, col: L }); ell(80, -20, 24, 24, { wash: false, w: 4, col: '#3a2a1a' }); pop();
    for (let i = 0; i < 2; i++) { push(1100 + i * 120, 1800 + i * 30, 1, 0, -1); blob([[-60, -10], [-56, -60], [40, -66], [66, -40], [60, -10]], { wash: i ? '#f4f0e8' : '#8a5a3a', washA: 1, w: 2, col: L }); ell(80, -60, 26, 20, { wash: i ? '#f4f0e8' : '#8a5a3a', washA: 1, w: 1.6, col: L }); for (const lx of [-40, -20, 30, 46]) pencil([[lx, -14], [lx, 18]], { w: 6, col: '#4a3a2a', pass2: false }); pop(); }
    lightPool(SUN[0] - 300, 1620, 900, 180, 'rgba(255,240,200,1)', 0.3); castShadow(400, 1720, 110, 560, -2.6, 0.3); moodDark(100, 1000, 800, 1900, '#10182a', 0.14);
  }
  function extras(t) { push(-60, 1540, 0.9); human(0, 0, 1, t, { body: '#7a4a5a', hat: 'scarf', hatCol: '#e8e0d0', legs: '#3a2a3a', long: 1, armR: 'hold', seed: 11630, face: 'smile' }); blob([[30, -160], [24, -220], [60, -220], [54, -160]], { wash: '#c8a868', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 3; i++) { const gx = 560 + i * 50 + Math.sin(t * 2 + i) * 14; push(gx, 1560, 0.5); blob([[-30, 0], [-26, -40], [26, -44], [34, -20], [30, 0]], { wash: '#e8e4d8', washA: 1, w: 1.4, col: L }); ell(40, -44, 14, 12, { wash: '#e8e4d8', washA: 1, w: 1.2, col: L }); pencil([[44, -56], [36, -70]], { w: 3, col: '#5a4a3a', pass2: false }); pop(); } }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 4 : 3); }
  function decree(t) { if (t > EV.cp_a1 - 0.1 && t < EV.cp_tiny) { const k = popK(t, EV.cp_a1 - 0.1, 0.3); push(640, 1000, 0.85 * k, 0.03); ctx.save(); ctx.fillStyle = 'rgba(244,236,214,0.98)'; ctx.fillRect(-240, -140, 480, 280); ctx.restore(); txt('УКАЗ · 1812', 0, -80, 44, { col: '#5a2a10', font: 'Osw' }); txt('Гельсингфорсъ — столица', 0, -10, 40, { col: '#3a2a10', font: 'Hand' }); ell(0, 80, 34, 34, { wash: FIC.red, washA: 1, w: 2, col: L }); pop(); }
    if (t > EV.cp_tiny) fiBoard(640, 1000, 0.82, t, EV.cp_tiny, [['ХЕЛЬСИНКИ', 52, '#ffe08a'], ['≈ 4 000 ЖИТЕЛЕЙ', 50]], { w: 460 }); }
  function extras2(t) {                                             // рыбный рынок у воды: лодки, торговки, бочки с салакой, чайки
    push(1180, 1500, 0.8); blob([[-130, 0], [-100, 34], [100, 34], [140, -4]], { wash: '#8a5a32', washA: 1, w: 2, col: L }); human(-20, 0, 0.9, t, { body: '#5a6a8a', hat: 'cap', hatCol: '#2a2a2a', legs: '#3a2a1a', armR: 'hold', flip: -1, seed: 11650, face: 'smile' }); pop();
    for (let i = 0; i < 3; i++) { push(980 + i * 60, 1560, 0.8); rect(-26, -60, 52, 60, { wash: '#7a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) ell(-14 + q * 14, -64, 10, 5, { wash: '#a8b8c8', washA: 1, w: 1, col: L }); pop(); }
    for (let i = 0; i < 3; i++) { const x = ((t * 60 + i * 400) % 1700) - 200, y = 640 + i * 40; push(x, y, 1); pencil([[-30, Math.sin(t * 6 + i) * 10], [0, 0], [30, Math.sin(t * 6 + i) * 10]], { w: 4, col: '#f4f4f0', pass2: false }); pop(); }
    for (let i = 0; i < 2; i++) { push(380 + i * 360, 1600 + i * 20, 0.8); rect(-110, -60, 220, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-110, -110, 220, 14, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) pencil([[k, -42], [k, 0]], { w: 6, col: '#2a2a2a', pass2: false }); human(-40, -40, 0.7, t, { body: ['#5a6a8a', '#8a5a4a'][i], hat: i ? 'scarf' : 'cap', hatCol: '#3a3a3a', legs: '#2a2a2a', long: i ? 1 : undefined, armR: 'hold', seed: 12300 + i + 0, face: 'smile' }); pop(); }
  }
  WORLD.capital = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => site(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1600], '#fff8e0', t, 11640, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.capital = {
    outfit: 'kamzol', light: { side: 1, rim: '#fff0c8' }, grade: ['#1a2030', 0.04],
    act: () => [[S0.capital, 'smug'], [EV.cp_a1, 'proud'], [EV.cp_tiny, 'laugh'], [EV.cp_hel, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1720, s: 0.95, look: [0.5, -0.4], hand: t > EV.cp_tiny ? [150, -260] : [150, -300] }),
    afterCat: (t, u, P) => { if (t < EV.cp_tiny) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s, k = popK(t, EV.cp_tiny, 0.3); push(x, y - 20, 0.5 * k); for (let i = 0; i < 5; i++) { rect(-80 + i * 34, -40, 28, 30, { wash: i % 2 ? '#a8582a' : '#c8a058', washA: 1, w: 1.2, col: L }); poly([[-84 + i * 34, -40], [-66 + i * 34, -56], [-48 + i * 34, -40]], { wash: '#5a4a3a', washA: 1, w: 1, col: L }); } pop(); },
    hud: t => decree(t),
    cam: () => [[S0.capital, 600, 980, -0.08], [EV.cp_a1, 620, 960, -0.06], [EV.cp_tiny, 460, 1120, 0.08, 'x'], [S1.capital, 440, 1140, 0.12]]
  };
  TRANS_IN.capital = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, H * (1 - e), W, H); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore(); for (let i = 0; i < 6; i++) rect(i * 190 + 20, H * (1 - e) - 40, 60, 80, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); }); } };
})();
