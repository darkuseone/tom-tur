/* 031 — сцена `mayrit`: IX век, крепость Майрит над рекой Мансанарес (эмират Кордовы). Утро, солнце справа (главный свет), голубая
   вода ручьёв — второй. Стены из кремня и известняка с зубцами, подковообразные ворота, башни, минарет, белые дома с плоскими крышами,
   внизу река, водоводы-«виахес», сады с оливами, каменщики, водоносы с кувшинами, ослик, стража. Том в чалме (moro).
   На «построили» поднимается участок стены; на «ручьёв» по сцене бегут голубые водотоки, плашка «MAYRIT = МЕСТО РУЧЬЁВ»;
   на «имя» — буквы превращаются: MAYRIT → MAGERIT → MADRID. Переход В: песок осыпается со стены, открывая крепость. */
(() => {
  EV.my_build = wtk('s2', 'построили');
  EV.my_name = wtk('s2', 'Майрит');
  EV.my_water = wtk('s2', 'ручьёв».');
  EV.my_madrid = wtk('s2', 'имя');
  KEYW.push('Майрит', 'ручьёв».', 'Мадрид.');
  const L = MD.ink, SUN = [920, 400], water = t => clamp((t - EV.my_water + 0.2) / 0.8);
  function sky(t) { vgrad(-900, 1050, ['#3a8ad0', '#8ac4ec', '#e8f0e8', '#fff0c8'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 56, 56, { wash: '#fffbe0', washA: 1, line: false });
    for (let i = 0; i < 3; i++) { const r = rng(7400 + i), y = 360 + i * 90, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + r() * 300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function sierra(t) { blob([[-500, 960], [-300, 780], [-100, 740], [200, 800], [500, 720], [800, 780], [1100, 740], [1700, 900], [1700, 980], [-500, 980]], { wash: '#8a9ab8', washA: 1, w: 2, col: L, a: 0.5 }); for (const [x, y] of [[-100, 740], [500, 720], [1100, 740]]) blob([[x - 80, y + 30], [x, y], [x + 80, y + 30]], { wash: '#f4f8fc', washA: 0.9, line: false }); depthFog('#dceaf4', 0.06); }
  function fortress(t) {                                             // крепость на холме: стены, башни, ворота, минарет, дома
    blob([[-500, 1180], [-200, 1060], [200, 1000], [700, 990], [1100, 1040], [1700, 1180]], { wash: '#b8986a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#6a5030', ang: 1.1 } });
    for (let i = 0; i < 10; i++) { const x = -60 + i * 90, h = 70 + (i % 3) * 20; rect(x, 1000 - h, 80, h, { wash: '#f4ecdc', washA: 1, w: 1.4, col: L }); rect(x + 30, 1000 - h + 20, 20, 24, { wash: '#2a2a3a', washA: 1, line: false }); }
    push(560, 900, 0.8); rect(-26, -300, 52, 300, { wash: '#e8dcc0', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.15, col: '#a89070', ang: 1.57 } }); rect(-34, -330, 68, 30, { wash: '#e8dcc0', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 3; q++) shape([[-14 + q * 14, -200], [-14 + q * 14, -170], [-7 + q * 14, -180], [0 + q * 14, -170], [0 + q * 14, -200]], { wash: '#2a2a3a', washA: 1, w: 1, col: L }); blob([[-20, -330], [0, -380], [20, -330]], { wash: '#2a8a5a', washA: 1, w: 1.4, col: L }); pop();
    const up = sm(clamp((t - EV.my_build) / 0.9));
    for (let i = 0; i < 14; i++) { const x = -360 + i * 110, h = i > 3 && i < 8 ? 160 * up : 160; if (h < 4) continue; rect(x, 1080 - h, 110, h, { wash: '#c8b088', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.25, col: '#6a5a3a', ang: 0.9 } }); for (let q = 0; q < Math.floor(h / 30); q++) for (let s2 = 0; s2 < 3; s2++) ell(x + 18 + s2 * 36 + (q % 2) * 16, 1070 - q * 30, 14, 9, { wash: q % 2 ? '#9a8a74' : '#7a6c5c', washA: 1, w: 1, col: L, a: 0.6 });
      if (h > 150) for (let q = 0; q < 3; q++) rect(x + 8 + q * 36, 1080 - h - 26, 26, 26, { wash: '#c8b088', washA: 1, w: 1.4, col: L }); }
    for (const x of [-250, 380, 1000]) { rect(x - 60, 1080 - 280, 120, 280, { wash: '#b8a078', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#5a4a2a', ang: 1.2 } }); for (let q = 0; q < 4; q++) rect(x - 56 + q * 30, 1080 - 306, 22, 26, { wash: '#b8a078', washA: 1, w: 1.4, col: L }); }
    push(700, 1080, 1); shape([[-80, 0], [-80, -120], [-60, -180], [0, -210], [60, -180], [80, -120], [80, 0]], { wash: '#3a2414', washA: 1, w: 2.4, col: L }); pencil([[-80, -120], [-60, -180], [0, -210], [60, -180], [80, -120]], { w: 10, col: '#e8dcc0', pass2: false }); for (let q = 0; q < 6; q++) pencil([[-84 + q * 6, -120 - q * 14], [-72 + q * 6, -126 - q * 14]], { w: 6, col: q % 2 ? '#c8281e' : '#e8dcc0', pass2: false }); pop();
  }
  function river(t) {                                                // река Мансанарес, водоводы, оливы, водоносы, ослик, стража, каменщики
    seaKR(1180, 1290, t, 7410, { cols: ['#5ab0d8', '#3a90c0', '#2a70a0'], n: 16 });
    for (const x of [-300, -60, 1000, 1240]) { pencil([[x, 1300], [x + 6, 1230]], { w: 10, col: '#6a5a3a', pass2: false }); blob([[x - 70, 1240], [x - 40, 1180], [x + 40, 1170], [x + 80, 1230]], { wash: '#7a8a4a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 6; q++) ell(x - 40 + q * 18, 1200 + (q % 2) * 12, 5, 4, { wash: '#3a4a2a', washA: 1, line: false }); }
    const P = [[60, '#e8dcc0', 'turban', 'up'], [180, '#8a5a3a', 'turban', 'hold'], [480, '#2a6a8a', 'turban', 'hold'], [620, '#a8402a', 'helmet', 'hold'], [860, '#e8dcc0', 'scarf', 'up'], [1120, '#5a7a3a', 'turban', 'swing']];
    P.forEach(([x, c, h, a], i) => { human(x, 1330, 0.6, t, { body: c, skin: '#c8906a', hat: h, hatCol: h === 'helmet' ? '#a8acb0' : '#f4f0e6', legs: '#5a4a3a', beard: i % 2 ? '#2a1a10' : undefined, armR: a, prop: h === 'helmet' ? 'spear' : a === 'swing' ? 'axe' : undefined, long: 1, flip: x > 600 ? -1 : 1, seed: 7420 + i, face: 'calm' });
      if (a === 'up') { push(x, 1330 - 0.6 * 340, 0.6); blob([[-24, 0], [-34, -50], [-14, -84], [14, -84], [34, -50], [24, 0]], { wash: '#c86a3a', washA: 1, w: 1.6, col: L }); pop(); } });
    push(340, 1330, 0.5); for (const lx of [-50, -26, 30, 54]) pencil([[lx, -50], [lx, 0]], { w: 8, col: '#7a7068', pass2: false }); blob([[-70, -50], [-60, -110], [50, -110], [70, -60]], { wash: '#8a8078', washA: 1, w: 1.6, col: L }); blob([[60, -100], [100, -150], [120, -120], [80, -80]], { wash: '#8a8078', washA: 1, w: 1.4, col: L }); pencil([[96, -150], [90, -190]], { w: 6, col: '#8a8078', pass2: false }); pop();
  }
  function ground(t) {                                               // террасы, водовод-канавка с бегущей водой, кувшины, корзины, тесаный камень
    rect(-500, 1340, 2200, 1000, { wash: '#c8a878', washA: 1, w: 2, col: L }); const r = rng(7430); for (let i = 0; i < 40; i++) ell(r() * 2000 - 400, 1360 + r() * 520, 12 + r() * 24, 6 + r() * 9, { wash: i % 2 ? '#b89868' : '#d8b888', washA: 1, w: 1, col: L, a: 0.5 });
    lightPool(SUN[0] - 300, 1640, 800, 160, 'rgba(255,240,190,1)', 0.35);
    const w = water(t); for (const P of [[[-500, 1700], [100, 1690], [500, 1720], [900, 1700], [1700, 1720]], [[600, 1340], [640, 1500], [620, 1690]]]) { pencil(P, { w: 40, col: '#8a7458', pass2: false }); if (w > 0) { pencil(P, { w: 26 * w, col: '#5ab8e8', pass2: false }); for (let q = 0; q < 8; q++) { const u = ((t * 0.6 + q / 8) % 1); const i = Math.floor(u * (P.length - 1)), f = u * (P.length - 1) - i; const [ax, ay] = P[i], [bx, by] = P[Math.min(i + 1, P.length - 1)]; ell(lerp(ax, bx, f), lerp(ay, by, f), 10, 4, { wash: '#e8f8ff', washA: w, line: false }); } } }
    for (const [x, c] of [[960, '#c86a3a'], [1020, '#b85a2a']]) { push(x, 1820, 1); blob([[-24, 0], [-36, -60], [-16, -100], [16, -100], [36, -60], [24, 0]], { wash: c, washA: 1, w: 1.6, col: L }); pop(); }
    for (let q = 0; q < 3; q++) { push(-60 + q * 90, 1800, 1); rect(-40, -50, 80, 50, { wash: '#d8ccb0', washA: 1, w: 1.6, col: L }); pop(); }
    push(1180, 1760, 1); ell(0, -30, 60, 34, { wash: '#a8783a', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-30 + q * 15, -50, 10, 10, { wash: '#6a8a3a', washA: 1, w: 1, col: L }); pop();
    castShadow(330, 1650, 120, 480, -0.5, 0.35); moodDark(-100, 900, 900, 1800, '#1a2a3a', 0.2);
  }
  WORLD.mayrit = (t, u, cat) => {
    lay(40, () => sky(t)); lay(20, () => sierra(t)); lay(8, () => fortress(t)); lay(3, () => river(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) { pencil([[x, 2300], [x + 10, 1600]], { w: 26, col: '#3a2a1a', pass2: false }); blob([[x - 160, 1640], [x - 60, 1520], [x + 80, 1520], [x + 160, 1620]], { wash: '#3a4a2a', washA: 1, line: false }); } });
    lay(1.8, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 7440, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.mayrit = {
    outfit: 'moro', light: { side: 1, rim: '#fff0c0' }, grade: ['#2a4a5a', 0.05],
    act: () => [[S0.mayrit, 'talk'], [EV.my_build, 'proud'], [EV.my_water, 'awe'], [EV.my_madrid, 'grin']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(140, 330, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: t > EV.my_water ? [0.6, 0.4] : [0.6, -0.6], hand: t > EV.my_water ? [190, -260] : [150, -300] }); },
    hud: t => { infoPlate(560, 780, [['MAYRIT', 64, MD.goldL], ['= «МЕСТО РУЧЬЁВ / ВОДОТОКОВ»', 30]], t, EV.my_water);
      if (t > EV.my_madrid - 0.05) { const names = ['MAYRIT', 'MAGERIT', 'MADRID'], i = Math.min(2, Math.floor((t - EV.my_madrid + 0.05) / 0.35)); push(560, 940, popK(t, EV.my_madrid - 0.05 + i * 0.35, 0.25), 0.03); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.88)'; ctx.fillRect(-230, -50, 460, 100); ctx.restore(); txt(names[i], 0, 4, 70, { col: i === 2 ? '#ff8a6a' : '#fff6e0', font: 'Osw' }); pop(); } },
    cam: () => [[S0.mayrit, 600, 880, -0.12], [EV.my_build, 640, 900, -0.06], [EV.my_water - 0.1, 560, 1180, 0.06], [EV.my_water + 0.3, 540, 1240, 0.12, 'x'], [EV.my_madrid, 520, 1060, 0.04], [S1.mayrit, 520, 1080, 0.06]]
  };
  TRANS_IN.mayrit = { a: 0.08, b: 0.38, fx(k, t, A, B) {            // песок/пыль осыпается сверху вниз и открывает крепость
    const e = sm(k), Y = e * 2100; drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, Y, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => { const r = rng(hsh(FRAME, 7450)); for (let i = 0; i < 260; i++) { ctx.fillStyle = i % 3 ? 'rgba(216,184,128,0.9)' : 'rgba(120,90,50,0.8)'; ctx.fillRect(r() * W, Y - 60 + r() * 120, 5, 10); } }); } };
})();
