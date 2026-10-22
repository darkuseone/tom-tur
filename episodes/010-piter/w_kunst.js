/* 010 — сцена `kunst`: 1719, зал Кунсткамеры. Стеллажи с банками (рыбы, змеи, двуглавый ягнёнок — без натурализма), подвешенный чучел
   крокодил, Готторпский глобус, скелет, раковины, высокие окна. На двери табличка «ВХОДЪ БЕЗПЛАТНО» (на «бесплатный»), служитель в ливрее
   наливает гостю-купцу рюмку из штофа (на «рюмка» — звон), на «царя!» портрет Петра на стене подмигивает. Том в кафтане с рюмкой.
   Переход В сцену — кадр сквозь стеклянную банку-линзу. */
(() => {
  EV.ku_free = wtk('s4', 'бесплатный');
  EV.ku_vodka = wtk('s4', 'рюмка');
  EV.ku_tsar = wtk('s4', 'царя!');
  KEYW.push('бесплатный', 'царя!');

  function hall(t) {
    screenFill('#3a2c22', 1);
    rect(-400, 300, 1880, 900, { wash: '#d8c8a8', washA: 1, w: 1, col: '#000', a: 0.2 });
    for (const x of [100, 980]) { const wp = rect(x - 90, 340, 180, 520, { wash: '#c8dce8', washA: 1, w: 3, col: '#4a3a2a' }); glow(x, 560, 300, 'rgba(255,248,230,1)', 0.45); for (let k = 1; k < 4; k++) pencil([[x - 90, 340 + k * 130], [x + 90, 340 + k * 130]], { w: 3, col: '#4a3a2a', pass2: false }); pencil([[x, 340], [x, 860]], { w: 3, col: '#4a3a2a', pass2: false }); }
    rays(980, 400, 2.4, 0.5, 1200, 'rgba(255,240,200,0.5)', 0.3, 5, t);
    rect(-400, 250, 1880, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a08' }); for (let x = -380; x < 1480; x += 120) { ell(x, 280, 24, 18, { wash: '#d6a842', washA: 1, w: 1.4, col: '#5a3a08' }); }
    const fl = shape([[-400, 1180], [1480, 1180], [1480, 2400], [-400, 2400]], { wash: '#8a5a32', washA: 1, w: 1, col: '#000', a: 0.3 }); ctx.save(); ctx.clip(fl.path); for (let i = -12; i <= 12; i++) for (let j = 0; j < 12; j++) { const y = 1180 + j * 70; ctx.fillStyle = (i + j) % 2 ? 'rgba(60,30,10,0.35)' : 'rgba(255,230,190,0.12)'; ctx.beginPath(); ctx.moveTo(540 + i * 60 * (1 + j * 0.35), y); ctx.lineTo(540 + (i + 1) * 60 * (1 + j * 0.35), y); ctx.lineTo(540 + (i + 1) * 60 * (1 + (j + 1) * 0.35), y + 70); ctx.lineTo(540 + i * 60 * (1 + (j + 1) * 0.35), y + 70); ctx.fill(); } ctx.restore();
  }
  function jar(x, y, s, kind, t, k) {                                   // банка с экспонатом: стекло, жидкость, крышка
    push(x, y, s); const j = rect(-36, -100, 72, 100, { wash: '#d8e8c8', washA: 0.55, w: 2, col: '#3a4a3a' });
    ctx.save(); ctx.clip(j.path); ctx.globalAlpha = 0.35; ctx.fillStyle = '#c8d88a'; ctx.fillRect(-36, -90, 72, 90); ctx.restore();
    if (kind === 0) { blob([[-22, -50], [0, -64], [24, -50], [0, -36]], { wash: '#c8a07a', washA: 0.9, w: 1.2, col: '#5a3a2a' }); poly([[24, -50], [34, -60], [34, -40]], { wash: '#c8a07a', washA: 0.9, w: 1, col: '#5a3a2a' }); ell(-12, -52, 2.4, 2.4, { wash: '#000', washA: 1, line: false }); }
    if (kind === 1) pencil(spline([[-20, -20], [10, -40], [-10, -60], [16, -80]], false, 10), { w: 7, col: '#7a8a4a' });
    if (kind === 2) { ell(0, -46, 20, 16, { wash: '#e8d8c0', washA: 0.9, w: 1.2, col: '#5a4a3a' }); for (const sd of [-1, 1]) ell(sd * 12, -70, 10, 9, { wash: '#e8d8c0', washA: 0.9, w: 1.2, col: '#5a4a3a' }); }
    if (kind === 3) for (let q = 0; q < 3; q++) ell(-12 + q * 12, -30 - q * 18, 10, 8, { wash: '#e89a7a', washA: 0.8, w: 1, col: '#5a2a1a' });
    rect(-40, -112, 80, 16, { wash: '#6a4a2a', washA: 1, w: 1.6, col: '#2a1a08' }); pencil([[-26, -94], [-26, -12]], { w: 4, col: '#ffffff', a: 0.5, pass2: false });
    pop();
  }
  function shelves(t) {
    for (const [x0, x1] of [[200, 520], [600, 880]]) { for (let r = 0; r < 4; r++) { const y = 520 + r * 160; rect(x0, y, x1 - x0, 14, { wash: '#6a4a2a', washA: 1, w: 1.6, col: '#2a1a08' }); for (let q = 0; q < 5; q++) jar(x0 + 30 + q * ((x1 - x0 - 60) / 4), y, 0.7, (q + r) % 4, t, q); }
      rect(x0 - 10, 400, 12, 720, { wash: '#5a3a1a', washA: 1, w: 1.4, col: '#2a1a08' }); rect(x1 - 2, 400, 12, 720, { wash: '#5a3a1a', washA: 1, w: 1.4, col: '#2a1a08' }); }
    // крокодил под потолком
    const sw = Math.sin(t * 1.2) * 4; push(540, 380 + sw, 1); pencil([[-120, -60], [-120, -20]], { w: 2, col: '#3a2a1a', pass2: false }); pencil([[120, -60], [120, -20]], { w: 2, col: '#3a2a1a', pass2: false });
    const cr = blob([[-260, 0], [-160, -20], [100, -24], [200, -12], [280, 0], [200, 14], [-160, 16]], { wash: '#6a7a4a', washA: 1, w: 2.2, col: '#1a2410' }); hatch(cr.path, cr.bb, { gap: 7, a: 0.3, col: '#2a3a1a', ang: 1.4, w: 1.2 });
    for (let q = 0; q < 8; q++) poly([[-120 + q * 34, -18], [-108 + q * 34, -32], [-96 + q * 34, -18]], { wash: '#5a6a3a', washA: 1, w: 1, col: '#1a2410' }); for (let q = 0; q < 5; q++) poly([[220 + q * 10, 0], [226 + q * 10, 10], [232 + q * 10, 0]], { wash: '#f2ece0', washA: 1, w: 0.8, col: '#1a1a1a' }); pop();
    // глобус Готторпский
    push(1080, 1180, 1); for (const sx of [-80, 80]) pencil([[sx, 0], [sx * 0.6, -160]], { w: 8, col: '#5a3a1a' }); const g = ell(0, -260, 130, 130, { wash: '#3a6a8a', washA: 1, w: 2.4, col: '#1a2a3a' });
    ctx.save(); ctx.clip(g.path); for (const [cx, cy, rx, ry] of [[-40, -290, 50, 40], [50, -220, 40, 60], [-60, -200, 30, 20]]) ell(cx + Math.sin(t * 0.4) * 30, cy, rx, ry, { wash: '#c8b07a', washA: 1, line: false }); ctx.restore();
    pencil(ellPts(0, -260, 140, 140, 0, 0, 40), { w: 6, col: '#d6a842', pass2: false }); pop();
    // портрет Петра — подмигивает на «царя!»
    push(540, 560, 1); rect(-90, -110, 180, 220, { wash: '#d6a842', washA: 1, w: 3, col: '#5a3a08' }); rect(-74, -94, 148, 188, { wash: '#3a3a2a', washA: 1, w: 1.4, col: '#1a1a1a' });
    ell(0, -20, 40, 48, { wash: '#e2b48e', washA: 1, w: 1.6, col: '#2a1a10' }); blob([[-44, -40], [-40, -76], [0, -84], [40, -76], [44, -40], [32, -60], [-32, -60]], { wash: '#2a1a10', washA: 1, w: 1.4, col: '#1a0a04' });
    const wink = t > EV.ku_tsar && t < EV.ku_tsar + 0.5; ell(-14, -24, 5, wink ? 1 : 5, { wash: '#1a1410', washA: 1, line: false }); ell(14, -24, 5, 5, { wash: '#1a1410', washA: 1, line: false }); pencil([[-12, 0], [0, -4], [12, 0]], { w: 3, col: '#1a1410', pass2: false }); pencil([[-10, 10], [0, 14], [10, 10]], { w: 2, col: '#5a1a10', pass2: false });
    blob([[-70, 94], [-50, 30], [0, 22], [50, 30], [70, 94]], { wash: '#2a5a3a', washA: 1, w: 1.4, col: '#0a1a0a' }); pop();
  }
  function guests(t) {
    // служитель в ливрее с подносом и штофом, гость-купец с бородой
    const pour = t > EV.ku_vodka - 0.3;
    human(820, 1420, 0.95, t, { body: '#7a1e2a', legs: '#f2ece0', hair: '#e8e4dc', face: 'smile', armR: pour ? 'point' : 'hold', armL: 'hold', trim: '#d6a842', seed: 600, flip: -1, look: -0.4 });
    if (pour) { push(700, 1060, 1, -0.5); const sh = rect(-20, -60, 40, 70, { wash: '#bcd8c8', washA: 0.8, w: 2, col: '#2a3a2a' }); rect(-8, -80, 16, 22, { wash: '#bcd8c8', washA: 0.8, w: 1.6, col: '#2a3a2a' }); pop();
      const fl = clamp((t - EV.ku_vodka + 0.3) / 0.4); if (fl < 1) pencil([[680, 1080], [660, 1080 + 60 * fl]], { w: 3, col: '#e8f4ff', a: 0.8, pass2: false }); }
    human(620, 1430, 0.95, t, { body: '#4a3a2a', legs: '#2a2a2e', hair: '#6a4a2a', beard: 'long', hat: 'fur', hatCol: '#3a2a1a', face: t > EV.ku_vodka ? 'grin' : 'shock', armR: t > EV.ku_vodka ? 'hold' : 'down', armL: 'hold', seed: 601, look: 0.4 });
    if (t > EV.ku_vodka) { rect(650, 1140, 18, 24, { wash: '#e8f4ff', washA: 0.85, w: 1.4, col: '#2a3a4a' }); if (t < EV.ku_vodka + 0.3) for (let q = 0; q < 5; q++) { const a = -2 + q * 0.4; pencil([[660 + Math.cos(a) * 20, 1130 + Math.sin(a) * 20], [660 + Math.cos(a) * 40, 1130 + Math.sin(a) * 40]], { w: 2.4, col: '#fff6c0', pass2: false }); } }
    // табличка у двери
    push(980, 900, 1, 0.04); const sg = rect(-110, -50, 220, 100, { wash: '#f2e6c4', washA: 1, w: 3, col: '#5a3a1a' }); txt('ВХОДЪ', 0, -20, 34, { font: 'Osw', col: '#2a1a10' }); txt('БЕЗПЛАТНО', 0, 22, 34, { font: 'Osw', col: t > EV.ku_free ? '#a8201a' : '#2a1a10' });
    if (t > EV.ku_free && t < EV.ku_free + 0.6) glow(0, 0, 200, 'rgba(255,220,140,1)', 0.6 * (1 - (t - EV.ku_free) / 0.6)); pop();
  }

  WORLD.kunst = (t, u, cat) => {
    lay(5, () => { hall(t); shelves(t); });
    lay(1.6, () => guests(t));
    lay(1, () => { cat(); });
    lay(0.7, () => { jar(-60, 1900, 3.2, 1, t, 9); });
  };
  DIR.kunst = {
    outfit: 'kamzol', light: { side: 1, rim: '#fff0d0' }, grade: ['#c09060', 0.12],
    act: () => [[S0.kunst, 'smug'], [EV.ku_free, 'awe'], [EV.ku_vodka, 'grin'], [EV.ku_tsar, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1470, s: 1.04, look: [0.5, -0.2], hand: t > EV.ku_vodka ? [110, -330] : [120, -250], tilt: t > EV.ku_tsar ? 0.06 : 0 }),
    afterCat: (t, u, P) => { if (t > EV.ku_vodka - 0.2) { const x = P.x + P.hand[0] * P.s, y = P.y + (P.hand[1] - 30) * P.s; poly([[x - 14, y - 26], [x + 14, y - 26], [x + 8, y + 10], [x - 8, y + 10]], { wash: '#e8f4ff', washA: 0.85, w: 2, col: '#2a3a4a' }); pencil([[x - 10, y - 20], [x + 10, y - 20]], { w: 2, col: '#ffffff', a: 0.8, pass2: false }); } },
    cam: () => [[S0.kunst, 560, 880, 0.14], [EV.ku_free, 620, 940, 0.06], [EV.ku_vodka, 560, 980, 0.1], [S1.kunst, 520, 980, 0.14]],
    hud: t => { if (t > EV.ku_vodka + 0.2) note('приказ Петра: угощать за казённый счёт', 560, 1720, t, EV.ku_vodka + 0.2, S1.kunst, '#fff2d8', 40, -0.02); }
  };

  // ---------------------------------------------------------------- переход В kunst: кадр сквозь стеклянную банку-линзу
  TRANS_IN.kunst = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    drawBuf(A); const R = Math.pow(sm(k), 1.3) * 1400 + 1;
    inCircle(540, 960, R, () => { drawBuf(B, 1.6 - 0.6 * sm(k), 540, 960); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 0.3 * (1 - k); ctx.fillStyle = '#c8e8a0'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    scr(() => { if (R < 1300) { pencil(ellPts(540, 960, R, R, 0, 0, 80), { w: 14, col: '#d8f0e0', a: 0.8, pass2: false, gap: false }); pencil(ellPts(540 - R * 0.4, 960 - R * 0.3, R * 0.3, R * 0.5, 0.3, 0, 30).slice(0, 12), { w: 10, col: '#ffffff', a: 0.6, pass2: false }); } });
  } };
})();
