/* 028 — сцена `kremlin`: 1556–1562, стройка белокаменного кремля. Спасская башня в лесах, стена растёт, каменотёсы тешут блоки,
   ворот поднимает камень, мастер с чертежом, телеги с известью. Главный свет — яркое солнце слева, белая пыль в лучах.
   Том-маляр (painter) с кистью у серой стены: на «псковские» — табличка «ПСКОВСКИЕ МАСТЕРА · ПОСТНИК ЯКОВЛЕВ И ИВАН ШИРЯЙ»,
   на «Белые» Том одним взмахом белит стену — белая полоса бежит по всей стене. Переход В — известковая пыль. */
(() => {
  EV.kr_so = wtk('s5', 'Поэтому');
  EV.kr_kr = wtk('s5', 'кремль');
  EV.kr_psk = wtk('s5', 'псковские');
  EV.kr_white = wtk('s5', 'Белые');
  KEYW.push('псковские', 'Белые');
  const L = KZ.ink, SUN = [160, 520];
  const wash = t => t > EV.kr_white - 0.1 ? sm(clamp((t - EV.kr_white + 0.1) / 0.9)) : 0;
  function sky(t) { vgrad(-900, 1200, ['#4a8ac8', '#9ac8e8', '#e8f0e8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,250,220,1)', 0.4); for (let i = 0; i < 4; i++) { const r = rng(3900 + i), x = (r() * 1400 + t * 12) % 1500 - 200, y = 400 + r() * 240; for (let k = 0; k < 4; k++) ell(x + k * 46, y - (k % 2) * 20, 60, 28, { wash: '#ffffff', washA: 0.6, line: false }); } }
  function far(t) { hills(1000, 40, '#7a9a6a', 3901); volga(1000, 1080, t, 3902); depthFog('#e0ecf0', 0.08); }
  function site(t) {                                                 // Спасская в лесах, стена, ворот, каменотёсы
    const w = wash(t); kWall(-300, 1500, 1240, 220, t, { col: lerpC('#b8b0a0', KZ.stone, w) });
    kTower(560, 1240, 1.0, t, { spire: true, col: lerpC('#b8b0a0', KZ.stone, w) }); for (let k = -3; k <= 3; k++) pencil([[560 + k * 40, 1240], [560 + k * 40, 600]], { w: 4, col: '#8a6a3a', a: 0.8, pass2: false }); for (let j = 1; j < 7; j++) pencil([[420, 1240 - j * 100], [700, 1240 - j * 100]], { w: 3, col: '#8a6a3a', a: 0.8, pass2: false });
    if (w > 0 && w < 1) { const x = lerp(-300, 1500, w); rect(x - 30, 1020, 60, 220, { wash: '#ffffff', washA: 0.8, line: false }); for (let q = 0; q < 10; q++) ell(x + (rng(q)() - 0.5) * 80, 1000 + q * 22, 14, 10, { wash: '#ffffff', washA: 0.7, line: false }); }
    push(940, 1240, 1); pencil([[-60, 0], [0, -320], [60, 0]], { w: 8, col: '#6a4424', pass2: false }); ell(0, -320, 30, 30, { line: true, w: 6, col: '#6a4424' }); const up = ((t - S0.kremlin) * 0.2) % 1; pencil([[0, -320], [40, -320], [40, -100 - up * 200]], { w: 2, col: L, pass2: false }); rect(10, -100 - up * 200, 60, 40, { wash: KZ.stone, washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 4; i++) human(160 + i * 110, 1012, 0.36, t, { body: '#6a5a4a', hat: i % 2 ? 'cap' : null, hatCol: '#5a4a3a', armR: 'swing', seed: 3905 + i, flip: i % 2 ? -1 : 1 });
  }
  function yard(t) {                                                 // двор стройки: блоки, каменотёсы, мастер с чертежом, телега извести
    rect(-500, 1300, 2100, 60, { wash: '#c8b898', washA: 1, w: 2, col: L });
    for (let q = 0; q < 8; q++) { const x = -150 + (q % 4) * 110, y = 1300 - Math.floor(q / 4) * 50; rect(x - 50, y - 50, 100, 50, { wash: KZ.stone, washA: 1, w: 1.6, col: L, shade: { gap: 6, a: 0.15, col: KZ.stoneD, ang: 1.3 } }); }
    const P = [[700, '#8a5a3a', 'cap', 'axe'], [820, '#6a5a4a', null, 'swing'], [1180, '#5a4a6a', 'fur', 'scroll'], [1300, '#7a6a4a', 'cap', 'stick']];
    P.forEach(([x, c, h, a], i) => human(x, 1320, 0.55, t, { body: c, hat: h, hatCol: '#5a4a3a', legs: '#4a3a2a', beard: i === 2 ? 'long' : 'short', hair: '#3a2a1a', armR: ['axe', 'scroll', 'stick'].includes(a) ? 'hold' : a, prop: ['axe', 'scroll', 'stick'].includes(a) ? a : undefined, flip: -1, seed: 3910 + i, face: 'calm' }));
    push(1000, 1320, 0.6); horse(0, 0, 1, t, 1, '#8a7a6a'); rect(-280, -110, 180, 70, { wash: '#8a5a32', washA: 1, w: 2, col: L }); ell(-190, -116, 80, 20, { wash: '#f4f4f0', washA: 1, w: 1.4, col: L }); for (const k of [-250, -130]) ell(k, -30, 30, 30, { line: true, w: 5, col: '#4a2e14' }); pop();
  }
  function ground(t) {                                               // земля под Томом: ведро извести, корыто, кирки, щебень
    rect(-500, 1420, 2100, 900, { wash: '#b8a888', washA: 1, w: 2, col: L }); for (let i = 0; i < 40; i++) { const r = rng(3920 + i); ell(-300 + r() * 1600, 1450 + r() * 500, 8 + r() * 14, 5 + r() * 8, { wash: r() < 0.5 ? '#d8d0c0' : '#9a8a70', washA: 1, w: 1, col: '#6a5a4a' }); }
    lightPool(SUN[0] + 300, 1620, 640, 140, 'rgba(255,252,236,1)', 0.45);
    push(760, 1640, 1); shape([[-50, 0], [-60, -100], [60, -100], [50, 0]], { wash: '#8a8e94', washA: 1, w: 2, col: L }); ell(0, -100, 60, 14, { wash: '#ffffff', washA: 1, w: 1.6, col: L }); pop();
    push(1000, 1680, 1); rect(-120, -60, 240, 60, { wash: '#6a4424', washA: 1, w: 2, col: L }); ell(0, -60, 110, 12, { wash: '#f0f0ec', washA: 1, line: false }); pop();
    for (const x of [-120, 1180]) { pencil([[x - 30, 1680], [x - 10, 1300]], { w: 6, col: '#8a6a3a', pass2: false }); pencil([[x + 30, 1680], [x + 50, 1300]], { w: 6, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 8; q++) pencil([[x - 28 + q * 2.5, 1650 - q * 46], [x + 32 + q * 2.5, 1650 - q * 46]], { w: 4, col: '#8a6a3a', pass2: false }); }   // лестницы
    for (const [x, fl] of [[140, 1], [1100, -1]]) { push(x, 1700, 0.62); human(0, 0, 1, t, { body: '#7a6a5a', hat: 'cap', hatCol: '#5a4a3a', armR: 'up', armL: 'up', seed: 4030 + x, beard: 'short', face: 'calm', flip: fl }); pencil([[-120, -360], [120, -360]], { w: 8, col: '#6a4424', pass2: false }); for (const k of [-110, 110]) rect(k - 30, -350, 60, 50, { wash: KZ.stone, washA: 1, w: 1.6, col: L }); pop(); }   // коромысла с блоками
    push(900, 1760, 1); ell(0, -50, 46, 56, { wash: '#6a4424', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#2a2a30', pass2: false }); ell(0, -104, 40, 8, { wash: '#6ab0d8', washA: 1, line: false }); pop();   // бочка с водой
    push(-20, 1820, 0.9); blob([[-50, 0], [-40, -50], [20, -60], [50, -40], [50, 0]], { wash: '#c8a068', washA: 1, w: 2, col: L }); blob([[40, -50], [70, -80], [90, -60], [70, -40]], { wash: '#c8a068', washA: 1, w: 1.8, col: L }); pencil(spline([[-48, -30], [-80, -60], [-90, -80]], false, 6), { w: 6, col: '#c8a068', pass2: false }); pop();   // пёс
    for (let q = 0; q < 4; q++) { const x = 420 + q * 90, y = 1700 + (q % 2) * 30; push(x, y, 1); rect(-40, -40, 80, 40, { wash: KZ.stone, washA: 1, w: 1.6, col: L, shade: { gap: 5, a: 0.2, col: KZ.stoneD, ang: 1.2 } }); pop(); }   // тёсаные блоки
    if (Math.sin(t * 9) > 0.5) for (let q = 0; q < 5; q++) { const a = -1.2 + q * 0.3; pencil([[470, 1650], [470 + Math.cos(a) * 40, 1650 + Math.sin(a) * 40]], { w: 2, col: '#ffe8a0', pass2: false }); }   // искры от долота
    push(240, 1760, 1); for (let q = 0; q < 4; q++) ell(0, -q * 12, 60 - q * 6, 16, { line: true, w: 6, col: '#c8a878' }); pop();   // бухта каната
    for (const [x, y] of [[600, 1080], [760, 1060]]) { push(x, y, 1); ell(0, 0, 16, 10, { wash: '#1a1a1e', washA: 1, w: 1, col: L }); ell(12, -8, 8, 7, { wash: '#1a1a1e', washA: 1, line: false }); pop(); }   // вороны на лесах
    castShadow(330, 1612, 120, 460, 0.35, 0.4); moodDark(SUN[0], 1000, 1000, 1800, '#1a1a20', 0.25);
  }
  function hud(t) { if (t > EV.kr_psk - 0.05 && t < EV.kr_white + 0.3) { const q = popK(t, EV.kr_psk - 0.05, 0.3); push(560, 800, q, -0.02); rect(-300, -70, 600, 140, { wash: '#14100a', washA: 0.92, w: 3, col: KZ.goldL }); txt('ПСКОВСКИЕ МАСТЕРА', 0, -16, 50, { col: KZ.goldL, font: 'Osw' }); txt('Постник Яковлев и Иван Ширяй', 0, 38, 28, { col: '#f6e7c8', font: 'Osw' }); pop(); } }
  function front(t) { const r = rng(hsh(FRAME, 3930)); for (let i = 0; i < 30; i++) ell(r() * 1300 - 100, r() * 1900, 3, 3, { wash: '#ffffff', washA: 0.6, line: false }); for (const x of [-40, 1130]) rect(x - 22, -200, 44, 2600, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' }); }
  WORLD.kremlin = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(5, () => site(t)); lay(2.4, () => { yard(t); depthFog('#e8ecec', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.6, () => motes(40, [-100, 600, 1200, 1500], '#ffffff', t, 3935, { sp: 3, sz: 2.4, a: 0.55, wob: 18, add: 1 }));
  };
  DIR.kremlin = {
    outfit: 'painter', light: { side: -1, rim: '#fffaf0' }, grade: ['#c8d0d8', 0.04],
    act: () => [[S0.kremlin, 'talk'], [EV.kr_kr, 'proud'], [EV.kr_psk, 'awe'], [EV.kr_white, 'grin']],
    pose: (t, u, b) => { const sw = wash(t); return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.kr_white ? [0.9, -0.4] : [0.6, -0.5], prop: 'brush', propAng: sw > 0 && sw < 1 ? -1.4 + sw * 1.6 : -0.4, hand: sw > 0 && sw < 1 ? [lerp(120, 300, sw), -460] : [180, -320], tailUp: sw > 0.5 }); },
    cam: () => [[S0.kremlin, 600, 980, 0.0], [EV.kr_kr, 600, 900, -0.04], [EV.kr_psk, 600, 960, 0.04], [EV.kr_white, 620, 980, 0.0, 'x'], [S1.kremlin, 640, 960, -0.04]],
    hud
  };
  TRANS_IN.kremlin = { a: 0.12, b: 0.38, fx(k, t, A, B) {            // известковая пыль: кадр белеет и проступает стройка
    const e = sm(k), a = Math.sin(e * Math.PI); drawBuf(e < 0.5 ? A : B); scr(() => { screenFill('#f4f2ec', a * 0.9, 'source-over'); const r = rng(3940); for (let i = 0; i < 40; i++) ell(r() * W, r() * H, 40 + r() * 80, 30 + r() * 60, { wash: '#ffffff', washA: a * 0.8, line: false }); });
  } };
})();
