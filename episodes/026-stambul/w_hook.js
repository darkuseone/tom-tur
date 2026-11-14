/* 026 — сцена `hook`: 2026, Галатский мост в золотой час. За Золотым Рогом — Святая София и Голубая мечеть против низкого солнца,
   на воде паром и лодки, вдоль перил — рыбаки с удочками, чайки, тележка симитчи, уличный кот на ведре. Главный свет — закатное солнце
   слева за силуэтами (тёплое): пятно на мостовой, длинные тени вправо, края кадра темнее; второй — холодное небо.
   На «Ошибка!» Том бьёт лапой по туристическому щиту «1453 · КОНСТАНТИНОПОЛЬ → СТАМБУЛ» — стрелка перечёркивается красным,
   на «Стамбулом?» над щитом вырастает «?». На «Отматываем» — «пуф», Том уже дервиш (высокая сикке) и поднимает ладонь: отмотка. Планы — window.IQ. */
(() => {
  EV.hk_slap = 0.25;
  EV.hk_sultan = wtk('h1', 'Султан');
  EV.hk_konst = wtk('h1', 'Константинополь.');
  EV.hk_q = wtk('h1', 'Стамбулом?');
  EV.hk_puff = EV.h2 + 0.15;
  KEYW.push('Ошибка!', 'Константинополь.', 'Стамбулом?');
  SHAKES.push([EV.hk_slap + 0.05, 0.25, 9]);
  const L = IS.ink, SUN = [300, 860];
  function sky(t) {
    vgrad(-900, 1300, ['#1e1a44', '#5a2e5a', '#c4565a', '#f29a5a', '#ffd08a'], 1);
    glow(SUN[0], SUN[1], 260, 'rgba(255,200,120,1)', 0.45); ell(SUN[0], SUN[1], 70, 70, { wash: '#fff0c0', washA: 1, line: false });
    for (let i = 0; i < 6; i++) { const y = 420 + i * 70, r = rng(260 + i); blob([[-200 + r() * 300, y], [200 + r() * 500, y - 30], [700 + r() * 400, y - 10], [1300, y + 16], [300, y + 30]], { wash: i < 3 ? '#8a4a6a' : '#e8865a', washA: 0.35, line: false }); }
    gulls(7, -100, 1180, 420, 760, t, 2601, 0.5, 30);
  }
  function far(t) {                                                  // силуэты Султанахмета против солнца
    hills(930, 40, '#5a3a5a', 2602);
    sofiaB(250, 930, 0.62, t, { minarets: true, col: '#7a4a5a' }); domeM(770, 930, 0.6, '#4a2e4e', { n: 6, lit: 0.8, seed: 2603 });
    for (const [x, h] of [[-120, 120], [470, 90], [1000, 140], [1150, 100]]) sil([[x - 60, 930], [x - 60, 930 - h], [x + 60, 930 - h], [x + 60, 930]], '#4a2e4e', 1);
    depthFog('#d07a6a', 0.08);
  }
  function water(t) {                                                // Золотой Рог: дорожка солнца, паром, лодки
    vgrad(930, 1400, ['#c8705a', '#7a4a6a', '#2e3a6a'], 1);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 2604)); for (let i = 0; i < 70; i++) { const y = 940 + r() * 380, w = 20 + r() * 80 * (1 - (y - 940) / 500); ctx.fillStyle = `rgba(255,200,120,${0.35 * (1 - Math.abs(r() * 2 - 1))})`; ctx.fillRect(SUN[0] - 160 + r() * 320 + (y - 940) * 0.1 - w / 2, y, w, 3); } ctx.restore();
    ferry(820 - (t * 18) % 200, 1060, 0.55, t, { lit: 1 }); boatF(140, 1120, 0.6, t, 2605, IS.cob); boatF(560, 1170, 0.55, t, 2606, IS.terra);
    for (let i = 0; i < 8; i++) pencil([[-100 + i * 170, 1200 + (i % 3) * 30], [-40 + i * 170, 1200 + (i % 3) * 30]], { w: 2, col: '#ffb880', a: 0.35, pass2: false });
  }
  function rail(t) {                                                 // дальние перила моста: рыбаки, фонари
    rect(-400, 1290, 1900, 24, { wash: '#4a4a52', washA: 1, w: 2, col: L }); for (let i = 0; i < 26; i++) pencil([[-380 + i * 74, 1292], [-380 + i * 74, 1380]], { w: 4, col: '#3a3a42', pass2: false });
    rect(-400, 1376, 1900, 16, { wash: '#4a4a52', washA: 1, w: 2, col: L });
    for (const x of [-150, 420, 990]) { pencil([[x, 1380], [x, 1060]], { w: 7, col: '#2a2a30', pass2: false }); ell(x, 1050, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1050, 60, 'rgba(255,220,150,1)', 0.25); }
    const F = [[60, IS.cob, 'cap', 1], [230, '#6a4a3a', null, 1], [520, '#3a5a3a', 'cap', -1], [700, '#8a3a2a', 'scarf', 1], [880, '#3a3a52', 'cap', 1], [1080, '#5a4a2a', null, -1]];
    F.forEach(([x, c, h, fl], i) => { human(x, 1384, 0.55, t, { body: c, hat: h, hatCol: '#2a2a30', legs: '#2a2a32', prop: 'stick', propAng: -0.9 * fl, armR: 'hold', flip: fl, seed: 2610 + i, beard: i % 2 ? 'short' : null, hair: '#2a1a10' });
      const sx = x + fl * 100, sy = 1384 - 230; pencil([[sx, sy], [sx + fl * 40, sy + 260 + Math.sin(t * 2 + i) * 10]], { w: 1.2, col: '#f0e8d8', a: 0.6, pass2: false }); });
  }
  function bridge(t, o = {}) {                                       // мостовая под Томом, тележка симитчи, щит, кот на ведре
    rect(-400, 1392, 1900, 700, { wash: '#6a5a5a', washA: 1, w: 2, col: L });
    for (let j = 0; j < 8; j++) for (let i = 0; i < 20; i++) rect(-400 + i * 100 + (j % 2) * 50, 1400 + j * 60, 96, 56, { wash: (i + j) % 3 ? '#7a6a64' : '#6a5a58', washA: 1, w: 1.2, col: '#3a2e2e' });
    lightPool(420, 1620, 620, 140, 'rgba(255,190,120,1)', 0.45);
    castShadow(350, 1612, 120, 480, 0.12, 0.4); castShadow(900, 1600, 140, 420, 0.12, 0.35);
    simitCart(930, 1600, 0.82, t);
    push(150, 1600, 1); ell(0, -10, 60, 16, { wash: '#2a2a30', washA: 0.5, line: false }); rect(-40, -90, 80, 80, { wash: '#3a6a9a', washA: 1, w: 2, col: L }); for (let i = 0; i < 3; i++) { push(-10 + i * 12, -96, 1, -0.3 + i * 0.2); blob([[-30, 0], [0, -10], [30, 0], [0, 8]], { wash: '#b8c8d0', washA: 1, w: 1.4, col: L }); pop(); }
    blob([[-40, -100], [-30, -150], [10, -160], [40, -130], [36, -100]], { wash: '#c8843a', washA: 1, w: 2, col: L }); for (const k of [-1, 1]) poly([[k * 8 - 6, -152], [k * 14, -176], [k * 18 + 6, -150]], { wash: '#c8843a', washA: 1, w: 1.6, col: L });
    pencil([[-6, -132], [2, -132]], { w: 2, col: L, pass2: false }); pencil([[14, -132], [22, -132]], { w: 2, col: L, pass2: false }); pencil(spline([[36, -110], [70, -120], [80, -150]], false, 6), { w: 6, col: '#c8843a', pass2: false }); pop();   // кот спит на ведре с рыбой
    if (o.board !== false) board(t);
  }
  function board(t) {                                                // туристический щит: «1453 · КОНСТАНТИНОПОЛЬ → СТАМБУЛ», удар, красный крест, «?»
    const hit = t > EV.hk_slap ? Math.exp(-(t - EV.hk_slap) * 8) * Math.sin((t - EV.hk_slap) * 40) * 0.05 : 0;
    push(690, 1600, 1, hit); pencil([[-120, 0], [-120, -420]], { w: 9, col: '#2a2a30', pass2: false }); pencil([[120, 0], [120, -420]], { w: 9, col: '#2a2a30', pass2: false });
    rect(-190, -640, 380, 250, { wash: IS.cob, washA: 1, w: 3, col: L }); rect(-176, -626, 352, 222, { line: true, w: 3, col: IS.goldL });
    txt('1453', 0, -580, 64, { col: IS.goldL, font: 'Osw' }); txt('КОНСТАНТИНОПОЛЬ', 0, -520, 34, { col: IS.white, font: 'Osw' }); txt('↓', 0, -483, 36, { col: IS.goldL, font: 'Osw' }); txt('СТАМБУЛ', 0, -440, 44, { col: IS.white, font: 'Osw' });
    if (t > EV.hk_slap) { const q = clamp((t - EV.hk_slap) / 0.12), q2 = clamp((t - EV.hk_slap - 0.12) / 0.12); pencil([[-170, -620], [lerp(-170, 170, q), lerp(-620, -410, q)]], { w: 13, col: '#e8201e', pass2: false }); if (q2 > 0) pencil([[170, -620], [lerp(170, -170, q2), lerp(-620, -410, q2)]], { w: 13, col: '#e8201e', pass2: false }); }
    if (t > EV.hk_konst - 0.05 && t < EV.hk_q) pencil(ellPts(0, -520, 180, 34, 0, 0, 30), { w: 4, col: IS.goldL, a: 0.9, pass2: false });
    pop();
    if (t > EV.hk_q - 0.05) { const q = popK(t, EV.hk_q - 0.05, 0.35); push(860, 940, q, 0.1); txt('?', 0, 0, 200, { col: IS.goldL, font: 'Osw' }); pop(); }
  }
  function front(t) {                                                // рама: перила и леска на переднем плане, чайка совсем близко
    for (const x of [-60, 1140]) { sil([[x - 40, 2200], [x - 40, 1500], [x + 40, 1500], [x + 40, 2200]], '#1a1418', 1); ell(x, 1500, 50, 20, { wash: '#1a1418', washA: 1, line: false }); }
    pencil([[-100, 1520], [1180, 1560]], { w: 12, col: '#1a1418', pass2: false });
    gull(940 + Math.sin(t * 0.8) * 60, 560 + Math.sin(t * 1.3) * 20, 2.2, t, 2620, '#e8e2d8');
  }
  window.IQ = { sky, far, water, rail, bridge, front };
  WORLD.hook = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => far(t));
    lay(10, () => water(t));
    lay(4, () => { rail(t); depthFog('#c87a6a', 0.06); });
    lay(1, () => { bridge(t); cat(); if (t > EV.hk_puff - 0.05 && t < EV.hk_puff + 0.6) puffK(360, 1300, 1.3, t, EV.hk_puff - 0.05, 0.5, 2621, IS.white); moodDark(SUN[0], 1100, 700, 1500, '#1a1030', 0.4); });
    lay(0.6, () => front(t));
    lay(2.2, () => motes(30, [-100, 900, 1200, 1500], '#ffd8a0', t, 2622, { sp: 6, sz: 2.4, a: 0.5, wob: 18, add: 1 }));
    lay(0.8, () => motes(8, [-200, 400, 1300, 1700], '#ffe8c0', t, 2623, { sp: 9, sz: 7, a: 0.18, wob: 30, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieIST', light: { side: -1, rim: '#ffb46a' }, grade: ['#3a1a40', 0.1],
    act: () => [[0, 'shock'], [EV.hk_slap + 0.1, 'annoyed'], [EV.hk_konst, 'sideeye'], [EV.hk_q, 'suspicious'], [EV.h2, 'grin']],
    pose: (t, u, b) => { const sl = t < EV.hk_slap + 0.3, k = clamp(t / EV.hk_slap), dv = t > EV.hk_puff;
      return Object.assign(b, { x: 360, y: 1610, s: 1.0, outfit: dv ? 'dervish' : 'hoodieIST', look: t < EV.hk_q ? [0.8, -0.3] : t < EV.h2 ? [0.3, -0.6] : [0, -0.2],
        handF: undefined, hand: sl ? [lerp(160, 290, k), lerp(-320, -420, k)] : t > EV.hk_q && t < EV.h2 ? [230, -470] : dv ? [110, -470] : [150, -300],
        squash: t > EV.hk_slap && t < EV.hk_slap + 0.15 ? 0.1 : b.squash, tailUp: t > EV.h2, rot: dv ? Math.sin((t - EV.hk_puff) * 6) * 0.05 : 0 }); },
    cam: () => [[0, 560, 1040, 0.08], [EV.hk_slap, 600, 1040, 0.16, 'x'], [EV.hk_slap + 0.3, 560, 1000, 0.06], [EV.hk_q, 620, 980, 0.1], [EV.h2, 480, 1080, 0.12], [S1.hook, 460, 1120, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // вихрь: кадр моста закручивается в воронку подола и уходит в отмотку
    const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 980); ctx.rotate(e * 2.4); ctx.scale(1 - e * 0.7, 1 - e * 0.7); ctx.drawImage(A, -540, -980); ctx.restore(); });
  } };
})();
