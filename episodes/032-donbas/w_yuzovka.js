/* 032 — сцена `yuzovka` (s3, 1869–1870-е). Завод Новороссийского общества: домны с огненным зевом (главный свет — оранжевый,
   из домны справа), кирпичные трубы с дымом, цеха, паровоз с вагонами угля, бараки «Английской колонии», грязная дорога.
   Валлийские рабочие в кепках, местные крестьяне, возчик с конём и углём, мальчишка-газетчик, собака, куры.
   На «валлийца» — из кареты выходит Джон Хьюз (цилиндр, борода), плашка «ДЖОН ХЬЮЗ · УЭЛЬС»; на «Юзовка» — над воротами
   вывеска «ЮЗОВКА · 1869»; на «Донецк» — табличка переворачивается: ЮЗОВКА → СТАЛИНО (1924) → ДОНЕЦК (1961).
   Переход — пар из трубы заволакивает кадр и рассеивается. */
(() => {
  EV.yz_coal = wtk('s3', 'Уголь');
  EV.yz_hughes = wtk('s3', 'валлийца');
  EV.yz_yuz = wtk('s3', 'Юзовка');
  EV.yz_now = wtk('s3', 'Донецк.') - 0.15;
  KEYW.push('валлийца', 'Юзовка', 'Донецк.');
  const L = DB.ink, FUR = [900, 1000];
  function sky(t) { vgrad(-900, 1100, ['#4a4a5a', '#8a7a7a', '#d8a878', '#e8b880'], 1);
    for (let i = 0; i < 5; i++) { const r = rng(8700 + i), y = 260 + i * 90, dx = (t * 20) % 300; blob([[-300 + dx, y], [300 + dx + r() * 100, y - 30], [900 + dx, y - 10], [1400, y + 20], [200, y + 30]], { wash: '#6a5a5a', washA: 0.35, line: false }); } }
  function far(t) {                                                 // дальние трубы, терриконы, водонапорная башня
    terricon(1100, 1040, 420, 220, t, { seed: 8710, col: '#4a4048' }); terricon(-60, 1040, 360, 180, t, { seed: 8711, col: '#504650' });
    for (let i = 0; i < 6; i++) { const x = 120 + i * 170, h = 260 + (i % 3) * 70; rect(x - 16, 1040 - h, 32, h, { wash: '#7a4a3a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) { const k = ((t * 0.25 + q / 4 + i * 0.13) % 1); ell(x + k * 80, 1040 - h - k * 220, 30 + k * 60, 20 + k * 40, { wash: '#5a5050', washA: 0.4 * (1 - k), line: false }); } }
    push(640, 1040, 0.6); rect(-40, -260, 80, 260, { wash: '#9a6a4a', washA: 1, w: 2, col: L }); ell(0, -280, 80, 40, { wash: '#7a5a4a', washA: 1, w: 2, col: L }); pop(); depthFog('#c8a088', 0.12); }
  function mill(t) {                                                // домна с зевом, цех, ворота с вывеской, бараки, паровоз
    push(900, 1240, 0.8); rect(-130, -520, 260, 520, { wash: '#6a3a2a', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#2a1008', ang: 1.4 } }); for (let q = 0; q < 5; q++) pencil([[-130, -100 * q - 60], [130, -100 * q - 60]], { w: 5, col: '#2a2024', pass2: false });
      poly([[-100, -520], [-60, -640], [60, -640], [100, -520]], { wash: '#4a3a34', washA: 1, w: 2, col: L }); rect(-60, -180, 120, 120, { wash: '#ff9a2a', washA: 1, w: 3, col: L }); glow(0, -120, 160, 'rgba(255,150,40,1)', 0.6 + Math.sin(t * 7) * 0.08);
      for (let q = 0; q < 6; q++) { const k = ((t * 1.4 + q / 6) % 1); ell(-40 + q * 16, -120 - k * 80, 5, 5, { wash: '#ffe080', washA: 1 - k, line: false }); } pop();
    push(300, 1240, 0.8); rect(-260, -300, 520, 300, { wash: '#8a4a32', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.15, col: '#3a1a10', ang: 1.4 } }); poly([[-280, -300], [0, -420], [280, -300]], { wash: '#4a4a52', washA: 1, w: 2, col: L });
      for (let q = 0; q < 5; q++) rect(-220 + q * 92, -240, 54, 90, { wash: (q + Math.floor(t)) % 3 ? '#ffb860' : '#3a2a20', washA: 1, w: 1.4, col: L }); rect(-70, -140, 140, 140, { wash: '#3a2018', washA: 1, w: 2, col: L });
      const k = popK(t, EV.yz_yuz, 0.3), flip = t > EV.yz_now; push(0, -470, Math.max(0.6, k)); rect(-200, -50, 400, 100, { wash: flip ? '#1e3a6a' : '#2a1a10', washA: 1, w: 3, col: '#c8a050' });
      txt(flip ? 'ДОНЕЦК' : k > 0 ? 'ЮЗОВКА · 1869' : 'NEW RUSSIA Co.', 0, 4, flip ? 64 : 46, { col: DB.brassL, font: 'Osw' }); pop(); pop();
    for (let i = 0; i < 3; i++) { push(-200 + i * 160, 1260, 0.55); rect(-130, -150, 260, 150, { wash: '#c8a890', washA: 1, w: 2, col: L }); poly([[-150, -150], [0, -230], [150, -150]], { wash: '#6a4a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-100 + q * 76, -110, 40, 50, { wash: '#ffd890', washA: 1, w: 1.2, col: L }); pop(); }
    const lx = ((t - S0.yuzovka) * 140) % 1600 - 300; push(lx, 1280, 0.6); rect(-200, -160, 200, 110, { wash: '#1a1a20', washA: 1, w: 2, col: L }); ell(-10, -110, 60, 60, { wash: '#2a2a30', washA: 1, w: 2, col: L }); rect(-60, -260, 40, 100, { wash: '#1a1a20', washA: 1, w: 2, col: L });
      for (let q = 0; q < 3; q++) { const k = ((t * 1.5 + q / 3) % 1); ell(-40 - k * 140, -280 - k * 120, 30 + k * 50, 24 + k * 30, { wash: '#f0ece8', washA: 0.6 * (1 - k), line: false }); }
      for (const k of [-150, -60, 20]) ell(k, -40, 30, 30, { wash: '#3a3a40', washA: 1, w: 2, col: L }); for (let c = 1; c < 3; c++) { rect(-200 - c * 230, -130, 210, 90, { wash: '#5a4030', washA: 1, w: 2, col: L }); for (let q = 0; q < 7; q++) ell(-190 - c * 230 + q * 30, -136, 18, 12, { wash: '#18181c', washA: 1, line: false }); for (const k of [-180, -40]) ell(k - c * 230, -36, 24, 24, { wash: '#3a3a40', washA: 1, w: 2, col: L }); } pop();
    rails(-500, 1600, 1290);
    const P = [[-120, '#4a4a5a', 'cap', 'hold'], [40, '#6a3a2a', 'cap', 'swing'], [560, '#3a4a3a', 'cap', 'hold'], [700, '#8a6a4a', 'fur', 'hold'], [1180, '#5a5a6a', 'cap', 'wave']];
    P.forEach(([x, c, h, a], i) => human(x, 1320, 0.58, t, { body: c, hat: h, hatCol: '#2a2a30', legs: '#2a2a30', armR: a, prop: i === 2 ? 'axe' : undefined, flip: x > 600 ? -1 : 1, seed: 8720 + i, face: t > EV.yz_hughes ? 'shock' : 'calm', beard: i === 3 ? 1 : undefined }));
  }
  function ground(t) {                                              // грязная дорога, лужи, конь с телегой угля, Хьюз с каретой, бочки, ящики, куры
    rect(-500, 1300, 2200, 1000, { wash: '#6a5a44', washA: 1, w: 2, col: L, shade: { gap: 11, a: 0.15, col: '#2a2014', ang: 0.25 } });
    const r = rng(8730); for (let i = 0; i < 40; i++) ell(r() * 2000 - 400, 1340 + r() * 560, 10 + r() * 26, 4 + r() * 8, { wash: i % 3 ? '#5a4a34' : '#3a3a40', washA: 1, w: 1, col: L, a: 0.5 });
    for (const [x, y] of [[560, 1620], [180, 1840], [1100, 1880]]) { ell(x, y, 90, 18, { wash: '#4a4a52', washA: 1, w: 1.4, col: L }); pencil([[x - 50, y - 4], [x + 20, y - 4]], { w: 2, col: '#ffb860', a: 0.6, pass2: false }); }
    const hk = clamp((t - EV.yz_hughes + 0.4) / 0.6); push(1060, 1680, 0.9); rect(-120, -220, 240, 160, { wash: '#2a1a1a', washA: 1, w: 2.4, col: L }); rect(-90, -200, 70, 70, { wash: '#6a8aa8', washA: 1, w: 1.6, col: L }); for (const k of [-80, 80]) ell(k, -40, 44, 44, { wash: false, w: 5, col: '#2a1a10' });
      push(-240, -70, 0.8); ell(0, -60, 80, 36, { wash: '#3a2a20', washA: 1, w: 2, col: L }); ell(-80, -100, 22, 32, { wash: '#3a2a20', washA: 1, w: 1.6, col: L, rot: -0.6 }); for (const lx of [-50, -20, 30, 60]) pencil([[lx, -30], [lx, 20]], { w: 6, col: '#2a1a10', pass2: false }); pop(); pop();
    if (hk > 0) human(lerp(900, 720, sm(hk)), 1700, 0.86, t, { body: '#1a1a22', hat: 'merchant', hatCol: '#141418', legs: '#1a1a22', armR: t > EV.yz_yuz ? 'point' : 'wave', beard: 'long', seed: 8740, face: 'smile', flip: -1 });
    push(-20, 1760, 1); cart(0, 0, 0.9, t); pop(); for (const [x, y] of [[700, 1820], [760, 1800]]) { push(x, y, 0.9); rect(-30, -70, 60, 70, { wash: '#7a5a32', washA: 1, w: 2, col: L }); pencil([[-30, -50], [30, -50]], { w: 3, col: '#3a3a40', pass2: false }); pencil([[-30, -20], [30, -20]], { w: 3, col: '#3a3a40', pass2: false }); pop(); }
    push(1220, 1880, 1); rect(-60, -50, 120, 50, { wash: '#a8844a', washA: 1, w: 2, col: L }); pop();
    for (let q = 0; q < 3; q++) { const x = 380 + q * 60 + Math.sin(t * 3 + q) * 12; push(x, 1900, 0.8); ell(0, -20, 24, 16, { wash: '#c89a5a', washA: 1, w: 1.4, col: L }); ell(18, -36, 9, 9, { wash: '#c89a5a', washA: 1, w: 1.2, col: L }); poly([[25, -36], [34, -34], [25, -31]], { wash: '#e8a83a', washA: 1, line: false }); pop(); }
    human(620, 1720, 0.62, t, { body: '#7a6a5a', hat: 'cap', hatCol: '#3a3a40', legs: '#2a2a30', armR: 'wave', prop: 'scroll', seed: 8745, face: 'grin' });
    lightPool(FUR[0], 1660, 800, 180, 'rgba(255,160,70,1)', 0.35); castShadow(330, 1650, 120, 520, -0.7, 0.4); moodDark(-300, 900, 900, 1900, '#1a0a08', 0.28);
  }
  function front(t) { for (const x of [1250]) sil([[x - 90, 2300], [x - 70, 1460], [x + 70, 1440], [x + 90, 2300]], '#1a1010', 1); push(-120, 1980, 1.1); for (let q = 0; q < 5; q++) ell(q * 40, -q * 14, 70, 40, { wash: '#1a1a1e', washA: 1, w: 1.6, col: '#000' }); pop(); }
  WORLD.yuzovka = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { mill(t); depthFog('#d8a888', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(30, [200, 700, 1300, 1500], '#ffb060', t, 8750, { sp: -5, sz: 2.6, a: 0.6, wob: 14, add: 1 }));
  };
  DIR.yuzovka = {
    outfit: 'victorian', light: { side: 1, rim: '#ffa860' }, grade: ['#3a1a0a', 0.06],
    act: () => [[S0.yuzovka, 'talk'], [EV.yz_hughes, 'awe'], [EV.yz_yuz, 'grin'], [EV.yz_now, 'smug']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.9), x = lerp(60, 320, sm(w1)), tip = t > EV.yz_hughes && t < EV.yz_yuz + 0.2; return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: [0.9, -0.3], hand: tip ? [80, -560] : [150, -300], nod: tip ? 0.2 : 0 }); },
    hud: t => { if (t < EV.yz_yuz) infoPlate(560, 790, [['ДЖОН ХЬЮЗ · УЭЛЬС', 50, DB.brassL], ['завод и посёлок · 1869', 30]], t, EV.yz_hughes + 0.1);
      if (t > EV.yz_now) { const n = [['ЮЗОВКА', 1869], ['СТАЛИНО', 1924], ['ДОНЕЦК', 1961]]; push(560, 790, popK(t, EV.yz_now, 0.3), 0.02); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.88)'; ctx.fillRect(-330, -60, 660, 120); ctx.restore();
        n.forEach(([s, y], i) => { const a = clamp((t - EV.yz_now - i * 0.22) / 0.2); txt(s, -220 + i * 220, -6, 40, { col: i === 2 ? DB.brassL : '#f0e8d8', font: 'Osw', a }); txt(String(y), -220 + i * 220, 36, 26, { col: '#c8b8a0', font: 'Osw', a }); if (i) txt('→', -110 + (i - 1) * 220, -4, 36, { col: DB.red, font: 'Osw', a }); }); pop(); } },
    cam: () => [[S0.yuzovka, 640, 900, -0.08], [EV.yz_hughes, 760, 1000, 0.02, 'x'], [EV.yz_yuz, 520, 940, 0.0], [EV.yz_now, 520, 1060, 0.08, 'x'], [S1.yuzovka, 520, 1080, 0.1]]
  };
  TRANS_IN.yuzovka = { a: 0.06, b: 0.42, fx(k, t, A, B) {          // пар из трубы: белые клубы заволакивают и расходятся
    const e = sm(k); if (e < 0.5) drawBuf(A); else drawBuf(B); scr(() => { const a = Math.sin(e * Math.PI), rr = rng(8760); for (let i = 0; i < 30; i++) { const x = rr() * W, y = rr() * H, s = (180 + rr() * 260) * (0.5 + e); ell(x + (e - 0.5) * 300, y - e * 300, s, s * 0.7, { wash: '#f2eee8', washA: a * 0.95, line: false }); } }); } };
})();
