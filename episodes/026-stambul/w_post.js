/* 026 — сцена `post`: 1930, Большой почтамт. Атриум со стеклянной крышей — главный свет сверху, лучи падают в зал; галерея арок,
   часы, лампы; стена ячеек сортировки, телеграфист, мешки писем; очередь в шляпах 1930-х (фески уже запрещены). На стене — плакат
   закона о почте. Том-клерк (postal30) у латунной решётки: на «тридцатом» — ответ на хук (плашка «В 1930-м!»), на «Стамбул» бьёт
   штампом «İSTANBUL» по конверту, на «Старое имя» штампует конверт «CONSTANTINOPLE» красным «ОБРАТНО ОТПРАВИТЕЛЮ» — письмо улетает.
   Переход В сцену — клапан конверта открывается, внутри — новая эпоха. */
(() => {
  EV.ps_final = wtk('s7', 'Окончательно');
  EV.answer = wtk('s7', 'тридцатом');
  EV.ps_post = wtk('s7', 'почта');
  EV.ps_stamp = wtk('s7', '«Стамбул».');
  EV.ps_old = wtk('s7', 'Старое');
  EV.ps_back = wtk('s7', 'отправителю.');
  KEYW.push('тридцатом', '«Стамбул».', 'отправителю.');
  SHAKES.push([EV.ps_stamp + 0.08, 0.2, 8], [EV.ps_back, 0.2, 8]);
  const L = IS.ink, SKY = [560, 300];
  const sk = (t, t0) => t > t0 - 0.15 && t < t0 + 0.2 ? clamp((t - t0 + 0.15) / 0.15) : 0;
  function back(t) { vgrad(-900, 2600, ['#e8d8b8', '#c8a878', '#8a6a48'], 1);
    push(SKY[0], SKY[1], 1); rect(-560, -300, 1120, 500, { wash: '#bfd8e0', washA: 1, w: 3, col: L }); for (let i = 0; i < 10; i++) pencil([[-560 + i * 124, -300], [-560 + i * 124, 200]], { w: 6, col: '#3a3a40', pass2: false }); for (let j = 0; j < 4; j++) pencil([[-560, -300 + j * 125], [560, -300 + j * 125]], { w: 6, col: '#3a3a40', pass2: false });
    const r = rng(2980); for (let i = 0; i < 40; i++) rect(-550 + Math.floor(r() * 9) * 124 + 8, -290 + Math.floor(r() * 4) * 125 + 8, 108, 109, { wash: [IS.cob, IS.turq, '#e8c050', IS.pom][i % 4], washA: 0.25, line: false }); pop();
    for (let k = 0; k < 6; k++) shaft(120 + k * 170, 500, 120, 1500, 0.06 - k * 0.02, 'rgba(255,248,220,1)', 0.12); }
  function gallery(t) {                                              // галерея арок, часы 1930-х, лампы
    rect(-500, 700, 2100, 40, { wash: '#a88a64', washA: 1, w: 2, col: L });
    for (let i = 0; i < 10; i++) { const x = -360 + i * 170; rect(x - 18, 740, 36, 330, { wash: '#e8dcc0', washA: 1, w: 1.8, col: L }); shape(ellPts(x + 85, 760, 67, 70, 0, 0, 14).filter(p => p[1] <= 760).concat([[x + 152, 760], [x + 18, 760]]), { wash: '#4a3a2a', washA: 1, w: 1.6, col: L });
      for (let q = 0; q < 6; q++) rect(x + 30 + q * 18, 780, 10, 10, { wash: q % 2 ? IS.cob : IS.turq, washA: 1, line: false }); }
    push(560, 840, 1); ell(0, 0, 70, 70, { wash: '#f6efe0', washA: 1, w: 4, col: '#3a2a1a' }); for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; pencil([[Math.cos(a) * 56, Math.sin(a) * 56], [Math.cos(a) * 64, Math.sin(a) * 64]], { w: 3, col: L, pass2: false }); }
    const m = (t - S0.post) * 2; pencil([[0, 0], [Math.cos(m - 1.57) * 50, Math.sin(m - 1.57) * 50]], { w: 3, col: L, pass2: false }); pencil([[0, 0], [Math.cos(m / 12 + 1) * 34, Math.sin(m / 12 + 1) * 34]], { w: 5, col: L, pass2: false }); pop();
    for (const x of [200, 920]) { pencil([[x, 500], [x, 900]], { w: 2, col: '#2a1a0a', pass2: false }); ell(x, 910, 30, 18, { wash: '#f8e8b0', washA: 1, w: 1.8, col: L }); glow(x, 915, 80, 'rgba(255,230,160,1)', 0.25); }
    depthFog('#e8d8b8', 0.06);
  }
  function sorting(t) {                                              // стена ячеек, сортировщики, телеграф, мешки
    push(-60, 1260, 1); rect(-300, -400, 600, 400, { wash: '#7a5432', washA: 1, w: 2.4, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 12; i++) { rect(-290 + i * 49, -390 + j * 49, 45, 45, { wash: '#3a2412', washA: 1, w: 1, col: L }); const r = rng(i * 13 + j); if (r() < 0.6) rect(-284 + i * 49, -376 + j * 49 + r() * 10, 33, 18, { wash: r() < 0.5 ? '#f6efe0' : '#e8d0a0', washA: 1, line: false }); } pop();
    push(1080, 1260, 1); rect(-200, -400, 400, 400, { wash: '#7a5432', washA: 1, w: 2.4, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) rect(-190 + i * 48, -390 + j * 48, 44, 44, { wash: '#3a2412', washA: 1, w: 1, col: L }); pop();
    for (const [x, fl, a] of [[100, 1, 'up'], [260, -1, 'hold'], [960, 1, 'up']]) human(x, 1270, 0.55, t, { body: '#4a5a6a', legs: '#2a2a32', hat: 'boater', hatCol: '#5a4a3a', armR: a, armL: a, flip: fl, seed: 2990 + x, hair: '#2a1a10' });
    push(720, 1270, 1); rect(-80, -120, 160, 120, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); rect(-50, -170, 100, 50, { wash: '#2a2a30', washA: 1, w: 1.8, col: L }); ell(0, -146, 14, 14, { wash: IS.gold, washA: 1, w: 1.4, col: L });
    const tap = Math.abs(Math.sin(t * 18)) > 0.7; pencil([[30, -170], [tap ? 50 : 56, tap ? -184 : -196]], { w: 4, col: '#c8a050', pass2: false }); pop();
    human(800, 1270, 0.55, t, { body: '#6a5a4a', legs: '#2a2a32', hat: 'boater', hatCol: '#2a2a30', armR: 'hold', flip: -1, seed: 2995, face: 'calm', hair: '#2a1a10' });
    for (const [x, y] of [[420, 1270], [500, 1290], [1260, 1280]]) { push(x, y, 1); blob([[-50, 0], [-60, -90], [-30, -130], [30, -130], [60, -90], [50, 0]], { wash: '#a88a5a', washA: 1, w: 2, col: L }); pencil([[-30, -128], [0, -146], [30, -128]], { w: 3, col: '#5a3a1a', pass2: false }); txt('PTT', 0, -60, 26, { col: '#3a2a1a', font: 'Osw' }); pop(); }
  }
  function queue(t) {                                                // очередь: шляпы 1930-х, газетчик, плакат закона
    push(940, 1150, 1, 0.02); rect(-170, -260, 340, 300, { wash: '#f2e6c8', washA: 1, w: 2.6, col: L }); rect(-170, -260, 340, 60, { wash: IS.pom, washA: 1, w: 2, col: L }); txt('ЗАКОН О ПОЧТЕ', 0, -230, 34, { col: IS.white, font: 'Osw' });
    txt('1930', 0, -160, 60, { col: IS.pom, font: 'Osw' }); txt('пишите только:', 0, -100, 28, { col: '#3a2a1a', font: 'Osw' }); txt('İSTANBUL', 0, -50, 48, { col: IS.cobD, font: 'Osw' }); pop();
    const Q = [[60, '#5a4a6a', 'boater', '#2a2a30', 0], [180, '#8a3a3a', 'scarf', '#e8c0a0', 1], [1160, '#3a4a5a', 'boater', '#5a4a3a', 0], [1260, '#6a5a3a', 'boater', '#2a2a30', 0]];
    Q.forEach(([x, c, h, hc, lng], i) => { human(x, 1440, 0.62, t, { body: c, hat: h, hatCol: hc, legs: '#2a2a32', long: lng, armR: i === 1 ? 'hold' : 'down', prop: i === 2 ? 'scroll' : undefined, flip: i < 2 ? 1 : -1, seed: 3000 + i, hair: '#2a1a10' }); });
    human(1050, 1440, 0.5, t, { body: '#7a6a5a', hat: 'cap', hatCol: '#3a3a40', armR: 'up', flip: -1, seed: 3005, face: 'grin' }); push(1050 - 40, 1440 - 220, 1, 0.2); rect(-34, -40, 68, 56, { wash: '#efe8d8', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) pencil([[-26, -30 + q * 12], [26, -30 + q * 12]], { w: 1.4, col: '#5a5a5a', pass2: false }); pop();
  }
  function counter(t) {                                              // стойка с латунной решёткой, конверты, штемпельная подушка, весы
    rect(-500, 1450, 2100, 900, { wash: '#6a5a4a', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) rect(-500 + i * 130 + (j % 2) * 65, 1454 + j * 70, 128, 68, { wash: (i + j) % 2 ? '#e8dcc0' : '#3a3a40', washA: 1, w: 1, col: '#2a2a30' });
    lightPool(540, 1640, 560, 140, 'rgba(255,248,220,1)', 0.45);
    push(780, 1660, 1); rect(-280, -260, 560, 260, { wash: '#5a3a1e', washA: 1, w: 2.6, col: L }); rect(-290, -280, 580, 26, { wash: '#8a5a2a', washA: 1, w: 2, col: L });
    for (let i = 0; i < 14; i++) pencil([[-270 + i * 40, -280], [-270 + i * 40, -600]], { w: 4, col: IS.gold, pass2: false }); pencil([[-280, -600], [280, -600]], { w: 8, col: IS.goldD, pass2: false }); txt('PTT · ПОЧТА', 0, -630, 30, { col: IS.goldD, font: 'Osw' });
    for (let q = 0; q < 6; q++) { push(-200 + q * 30, -300 - q * 6, 1, -0.1 + q * 0.04); rect(-60, -30, 120, 70, { wash: '#f6efe0', washA: 1, w: 1.6, col: L }); pencil([[-60, -30], [0, 4], [60, -30]], { w: 1.4, col: '#8a7a5a', pass2: false }); pop(); }
    rect(120, -310, 90, 30, { wash: '#2a2a3a', washA: 1, w: 1.6, col: L }); pop();
    if (t > EV.ps_stamp) { const q = clamp((t - EV.ps_stamp) / 0.2); push(560, 1300, 1 + (1 - q) * 0.3, -0.06); rect(-220, -110, 440, 220, { wash: '#f6efe0', washA: 1, w: 2.4, col: L }); txt('Istanbul', -40, -40, 40, { col: '#3a3a6a', font: 'Hand' });
      push(110, 30, 1, -0.2); ell(0, 0, 90, 60, { line: true, w: 6, col: IS.cob, a: q }); txt('İSTANBUL', 0, 0, 34, { col: IS.cob, font: 'Osw', a: q }); pop(); pop(); }
    if (t > EV.ps_old) { const fly = t > EV.ps_back + 0.65 ? sm((t - EV.ps_back - 0.65) / 0.35) : 0; push(lerp(600, -500, fly), lerp(1080, 700, fly), 1, -0.1 - fly * 1.5); rect(-230, -120, 460, 240, { wash: '#efe2c4', washA: 1, w: 2.4, col: L });
      txt('CONSTANTINOPLE', 0, -40, 44, { col: '#3a3a6a', font: 'Hand' }); rect(150, -100, 60, 70, { wash: '#c8a050', washA: 1, w: 1.4, col: L });
      if (t > EV.ps_back - 0.05) { const q = popK(t, EV.ps_back - 0.05, 0.25); push(0, 40, q * 1.1, -0.12); rect(-200, -50, 400, 100, { line: true, w: 7, col: '#d8201e' }); txt('ОБРАТНО ОТПРАВИТЕЛЮ', 0, 2, 32, { col: '#d8201e', font: 'Osw' }); pop(); } pop(); }
    castShadow(330, 1612, 120, 420, 0.05, 0.4); moodDark(SKY[0], 900, 1000, 1900, '#1a120a', 0.35);
  }
  function front(t) { const r = rng(3010); for (let i = 0; i < 5; i++) { const ph = ((t - S0.post) * 0.25 + r()) % 1, x = r() < 0.5 ? r() * 150 - 120 : 900 + r() * 250, y = 300 + ph * 1800; push(x + Math.sin(t * 2 + i) * 40, y, 1.2, t * 2 + i); rect(-50, -30, 100, 60, { wash: '#f6efe0', washA: 0.95, w: 1.6, col: L }); pencil([[-50, -30], [0, 0], [50, -30]], { w: 1.4, col: '#8a7a5a', pass2: false }); pop(); }
    rect(-200, 1880, 1500, 400, { wash: '#3a2412', washA: 1, w: 2, col: '#0a0604' }); }
  WORLD.post = (t, u, cat) => {
    lay(40, () => back(t));
    lay(12, () => gallery(t));
    lay(5, () => sorting(t));
    lay(2.4, () => queue(t));
    lay(1, () => { counter(t); cat(); });
    lay(0.6, () => front(t));
    lay(3, () => motes(40, [100, 400, 1100, 1500], '#fff8e0', t, 3015, { sp: 3, sz: 2.2, a: 0.5, wob: 14, add: 1 }));
  };
  DIR.post = {
    outfit: 'postal30', light: { side: 1, rim: '#fff4d0' }, grade: ['#c8a878', 0.06],
    act: () => [[S0.post, 'proud'], [EV.answer, 'shock'], [EV.ps_post, 'smug'], [EV.ps_stamp, 'grin'], [EV.ps_old, 'sideeye'], [EV.ps_back, 'laugh']],
    pose: (t, u, b) => { const s1 = sk(t, EV.ps_stamp), s2 = sk(t, EV.ps_back);
      return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.ps_old ? [0.9, -0.7] : [0.7, -0.4], hand: s1 ? [lerp(260, 240, s1), lerp(-560, -320, s1)] : s2 ? [lerp(280, 270, s2), lerp(-620, -480, s2)] : [220, -420], squash: (s1 > 0.9 || s2 > 0.9) ? 0.08 : b.squash, tailUp: t > EV.ps_back }); },
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, 1, 0.1); rect(-16, -70, 32, 60, { wash: '#6a3a1e', washA: 1, w: 2, col: L }); ell(0, -74, 22, 14, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); rect(-36, -12, 72, 24, { wash: '#2a2a3a', washA: 1, w: 2, col: L }); pop(); },   // штемпель в лапе
    cam: () => [[S0.post, 600, 980, 0.02], [EV.answer, 560, 940, 0.14, 'x'], [EV.ps_post, 600, 1000, 0.06], [EV.ps_stamp, 560, 1120, 0.16, 'x'], [EV.ps_old, 600, 1020, 0.06], [S1.post, 600, 1000, 0.1]]
  };
  TRANS_IN.post = { a: 0.12, b: 0.4, fx(k, t, A, B) {               // конверт: клапан открывается, бумага уходит вниз — внутри 1930-й
    const e = sm(k); drawBuf(e < 0.45 ? A : B); scr(() => { const y = e < 0.45 ? 0 : lerp(0, 2000, (e - 0.45) / 0.55), fl = e < 0.45 ? 1 - e / 0.45 * 2 : -1;
      ctx.save(); ctx.translate(0, y); ctx.globalAlpha = e < 0.45 ? e / 0.45 : 1; ctx.fillStyle = '#efe2c4'; ctx.fillRect(-40, 600, W + 80, 1400); ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, 2000); ctx.lineTo(540, 1300); ctx.lineTo(W + 40, 2000); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-40, 600); ctx.lineTo(540, 600 + 700 * fl); ctx.lineTo(W + 40, 600); ctx.closePath(); ctx.fillStyle = '#e2d2b0'; ctx.fill(); ctx.stroke(); ell(540, 600 + 640 * fl, 70, 70, { wash: '#b8201e', washA: 1, w: 2, col: '#5a0a08' }); ctx.restore(); });
  } };
})();
