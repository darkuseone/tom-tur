/* 034 — сцена `books`, 1864–1904. Ночь у прусской границы: речка, полосатый пограничный столб, будка жандармов с фонарём, лес,
   книгоноша с огромным мешком книг на спине переходит брод, хутор с одним светящимся окном, где мать учит детей по запрещённому букварю.
   Главный свет — луна (холодный синий) + тёплое окно хутора + фонарь жандарма. На «Сорок лет» — плашка-таймер «1864 → 1904 = 40 ЛЕТ»;
   на «латиницей» — буквы «ABC» перечёркиваются, «АБВ» навязаны; на «контрабандой» Том (тулуп) прячет связку книг под тулуп и
   приседает — луч фонаря проходит над головой. Плашка «1891–1901: ИЗЪЯТО 173 259 КНИГ». */
(() => {
  const L = LTC.ink, MOON = [900, 420];
  EV.bk_40 = wtk('s6', 'Сорок'); EV.bk_lat = wtk('s6', 'латиницей'); EV.bk_ban = wtk('s6', 'запрещалось'); EV.bk_smug = wtk('s6', 'контрабандой.');
  KEYW.push('запрещалось', 'контрабандой.');
  function sky(t) { vgrad(-900, 1100, ['#060a1a', '#14204a', '#2a3a6a'], 1); ell(MOON[0], MOON[1], 50, 50, { wash: '#f0f2e8', washA: 1, line: false }); glow(MOON[0], MOON[1], 160, 'rgba(200,220,255,1)', 0.3); const r = rng(7800); for (let i = 0; i < 60; i++) { ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(r() * 1600 - 300, r() * 700, 2.5, 2.5); } }
  function far(t) { hills(1020, 30, '#101a2a', 7.1); for (let i = 0; i < 16; i++) { const r = rng(7810 + i); polPineLT(-200 + i * 100 + r() * 40, 1040, 180 + r() * 80, t, i); } depthFog('#1a2a4a', 0.08); }
  function polPineLT(x, base, h, t, seed) { poly([[x - h * 0.02, base], [x, base - h], [x + h * 0.02, base]], { wash: '#2a1a14', washA: 1, w: 1.2, col: L }); for (let i = 0; i < 4; i++) { const y = base - h * (0.4 + i * 0.15), w = h * (0.22 - i * 0.04); poly([[x - w, y], [x, y - h * 0.22], [x + w, y]], { wash: i % 2 ? '#14241e' : '#0e1a16', washA: 1, w: 1.2, col: L }); } }
  function border(t) {                                              // река, столб, будка, жандармы, хутор
    rect(-600, 1180, 2400, 90, { wash: '#1a3050', washA: 1, line: false }); for (let i = 0; i < 14; i++) { const r = rng(7820 + i), x = ((r() * 1600 + t * 30) % 1800) - 300; pencil([[x, 1190 + r() * 70], [x + 50, 1190 + r() * 70]], { w: 2.4, col: '#8aa8d8', a: 0.6, pass2: false }); }
    push(820, 1180, 1); for (let i = 0; i < 6; i++) rect(-14, -60 - i * 50, 28, 50, { wash: i % 2 ? '#f4f4f0' : '#1a1a1a', washA: 1, w: 1.4, col: L }); rect(-30, -360, 60, 30, { wash: '#c8a040', washA: 1, w: 1.6, col: L }); pop();
    push(1040, 1170, 0.9); rect(-90, -200, 180, 200, { wash: '#4a3a2a', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.3, col: '#1a1008', ang: 0 } }); poly([[-110, -200], [0, -260], [110, -200]], { wash: '#2a2a30', washA: 1, w: 2, col: L }); rect(-50, -160, 50, 50, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 2; i++) { const gx = 960 + i * 110 + Math.sin(t * 0.8 + i) * 30; human(gx, 1170, 0.62, t, { body: '#2a3a5a', bodyD: '#10182a', hat: 'police', hatCol: '#2a3a5a', legs: '#1a1a2a', armR: 'hold', prop: i ? 'spear' : 'candle', flip: -1, seed: 7830 + i, face: 'angry' }); }
    const beam = -0.4 + Math.sin(t * 1.3) * 0.5; push(980, 1170 - 220, 1); poly([[0, 0], [-900 * Math.cos(beam), 900 * Math.sin(beam) - 120], [-900 * Math.cos(beam), 900 * Math.sin(beam) + 120]], { wash: '#ffe8a0', washA: 0.12, line: false }); glow(0, 0, 50, 'rgba(255,220,140,1)', 0.4); pop();
    khata(140, 1170, 240, 140, t, { log: 1, wall: '#5a4a3a', roof: '#3a3a2a', lit: 1, win: 1, trim: '#3a2a1a', smoke: 1 });
    push(40, 1080, 0.5); human(0, 0, 1, t, { body: '#7a3a3a', hat: 'scarf', hatCol: '#e8e0d0', legs: '#3a2a2a', long: 1, armR: 'hold', prop: 'scroll', seed: 7840, face: 'smile' }); human(90, 10, 0.6, t, { body: '#5a6a8a', legs: '#2a2a3a', armR: 'wave', seed: 7841, face: 'grin' }); pop();
    const sx = lerp(1300, 520, clamp((t - S0.books) / 4)); push(sx, 1230, 0.75); human(0, 0, 1, t, { body: '#5a4a32', hat: 'fur', hatCol: '#3a2a1a', legs: '#2a2a2a', armR: 'hold', flip: -1, seed: 7850, face: 'calm' }); blob([[-70, -330], [-90, -180], [30, -170], [40, -330]], { wash: '#8a6a4a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-70 + q * 30, -350, 26, 34, { wash: ['#a8281e', '#2a5aa8', '#3a7a3a'][q], washA: 1, w: 1.2, col: L }); pop();
  }
  function ground(t) {                                              // берег: снег пятнами, камыш, брод-камни, лодка, книги в сене
    rect(-500, 1300, 2200, 1000, { wash: '#1e2a3a', washA: 1, w: 2, col: L }); const r = rng(7860);
    for (let i = 0; i < 18; i++) blob([[r() * 1800 - 300, 1360 + r() * 600], [r() * 1800 - 300 + 120, 1360 + r() * 600], [r() * 1800 - 300 + 60, 1380 + r() * 600]], { wash: '#c8d0e8', washA: 0.5, line: false });
    for (let i = 0; i < 60; i++) { const x = r() * 1900 - 400, y = 1320 + r() * 700, h = 20 + r() * 30; pencil([[x, y], [x + 2, y - h]], { w: 2.4, col: '#3a4a3a', pass2: false }); }
    for (let i = 0; i < 6; i++) ell(600 + i * 90, 1340 + (i % 2) * 14, 36, 14, { wash: '#4a5060', washA: 1, w: 1.6, col: L });
    push(900, 1760, 1, -0.1); blob([[-170, 0], [-130, 40], [130, 40], [170, 0]], { wash: '#4a3a2a', washA: 1, w: 2.4, col: L }); pop();
    push(1080, 1640, 1); blob([[-90, 0], [-70, -70], [70, -80], [90, 0]], { wash: '#a8905a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#4a3a1a', ang: 0.6 } }); for (let q = 0; q < 3; q++) rect(-50 + q * 34, -60, 28, 36, { wash: ['#a8281e', '#2a5aa8', '#e8c040'][q], washA: 1, w: 1.2, col: L }); pop();
    lightPool(140, 1500, 500, 120, 'rgba(255,210,130,1)', 0.25); lightPool(640, 1700, 700, 160, 'rgba(180,200,255,1)', 0.18); castShadow(380, 1720, 110, 520, 2.8, 0.3); moodDark(540, 1200, 450, 1500, '#02040a', 0.4);
  }
  function front(t) { for (const x of [-170, 1250]) { poly([[x - 60, 2400], [x - 40, 300], [x + 40, 300], [x + 60, 2400]], { wash: '#0e0a08', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) poly([[x - 240 + i * 30, 500 + i * 150], [x, 360 + i * 150], [x + 240 - i * 30, 500 + i * 150]], { wash: '#08120e', washA: 1, line: false }); } }
  function hud(t) {
    if (t > EV.bk_40 && t < EV.bk_smug) { const k = popK(t, EV.bk_40, 0.3), f = sm(clamp((t - EV.bk_40) / 0.8)); push(640, 1000, 0.85 * k, -0.02); ctx.save(); ctx.fillStyle = 'rgba(16,14,12,0.92)'; ctx.fillRect(-270, -110, 540, 220); ctx.restore();
      txt('1864 → ' + Math.round(lerp(1864, 1904, f)), 0, -50, 60, { col: LTC.amberL, font: 'Osw' }); txt('= 40 ЛЕТ', 0, 26, 56, { col: '#ff8a6a', font: 'Osw' });
      if (t > EV.bk_lat) { txt('ABC', -130, 86, 40, { col: '#8affa0', font: 'Osw' }); pencil([[-190, 86], [-70, 70]], { w: 6, col: '#ff4a2a', pass2: false }); txt('→ АБВ', 90, 86, 40, { col: '#fff6e0', font: 'Osw' }); } pop(); }
    if (t > EV.bk_smug) ltBoard(640, 1000, 0.85, t, EV.bk_smug, [['1891–1901: ИЗЪЯТО', 44, LTC.amberL], ['173 259 КНИГ', 62]], { w: 520 });
  }
  function extras(t) {                                              // телега контрабандистов в лесу, пёс жандарма, указатель «PREUSSEN», кипа книг
    push(1180, 1480, 0.8, 0, -1); horse(0, 0, 1, t, { col: '#3a2a1e', seed: 3 }); rect(110, -150, 220, 90, { wash: '#4a3a2a', washA: 1, w: 2, col: LTC.ink }); ell(150, -40, 40, 40, { wash: false, w: 5, col: '#2a1a10' }); for (let q = 0; q < 4; q++) rect(130 + q * 44, -190, 40, 40, { wash: ['#a8281e', '#2a5aa8', '#3a7a3a', '#c8a040'][q], washA: 1, w: 1.2, col: LTC.ink }); human(260, -60, 0.9, t, { body: '#4a3a2a', hat: 'fur', hatCol: '#2a1a10', legs: '#2a2a2a', armR: 'hold', seed: 7890, face: 'calm' }); pop();
    push(980, 1520, 0.8); blob([[-50, -10], [-40, -50], [30, -54], [56, -36], [50, -10]], { wash: '#5a4a3a', washA: 1, w: 2, col: LTC.ink }); ell(66, -54, 20, 16, { wash: '#5a4a3a', washA: 1, w: 1.6, col: LTC.ink }); for (const lx of [-30, -14, 26, 40]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#3a2a1a', pass2: false }); pencil([[-50, -40], [-74, -60 + Math.sin(t * 8) * 8]], { w: 5, col: '#5a4a3a', pass2: false }); pop();
    push(-60, 1500, 0.9); pencil([[0, 0], [0, -260]], { w: 8, col: '#4a3a2a', pass2: false }); poly([[-10, -250], [200, -250], [230, -220], [200, -190], [-10, -190]], { wash: '#e8e0c8', washA: 1, w: 2, col: LTC.ink }); txt('PREUSSEN →', 100, -218, 28, { col: '#1a1a1a', font: 'Osw' }); pop();
    for (let i = 0; i < 5; i++) { const r = rng(7895 + i); push(1050 + i * 40, 1560 - i * 26, 1, (r() - 0.5) * 0.4); rect(-36, -20, 72, 22, { wash: ['#a8281e', '#2a5aa8', '#3a7a3a', '#c8a040', '#6a2a5a'][i], washA: 1, w: 1.4, col: LTC.ink }); pop(); }
    for (let i = 0; i < 6; i++) { const x = ((t * 40 + i * 260) % 1600) - 200; pencil([[x, 600 + i * 30], [x + 10, 596 + i * 30]], { w: 2, col: '#e8eeff', a: 0.4, pass2: false }); }
  }
  WORLD.books = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => border(t)); lay(1.5, () => extras(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(26, [-100, 500, 1200, 1800], '#e8eeff', t, 7870, { sp: 4, vx: -1, sz: 2.6, a: 0.6, wob: 10 }));
  };
  DIR.books = {
    outfit: 'tulup', light: { side: 1, rim: '#a8c0ff' }, grade: ['#0a1030', 0.08],
    act: () => [[S0.books, 'suspicious'], [EV.bk_40, 'awe'], [EV.bk_ban, 'annoyed'], [EV.bk_smug, 'wink']],
    pose: (t, u, b) => { const hide = t > EV.bk_smug - 0.1; return Object.assign(b, { x: 340, y: hide ? 1740 : 1710, s: 0.95, look: hide ? [0.8, -0.3] : [0.5, -0.4], hand: hide ? [40, -220] : [150, -300], squash: hide ? 0.08 : b.squash, prop: hide ? undefined : 'scroll' }); },
    afterCat: (t, u, P) => { if (t > EV.bk_smug - 0.1) { push(P.x + 20 * P.s, P.y - 200 * P.s, P.s); for (let q = 0; q < 3; q++) rect(-50, -20 - q * 26, 100, 24, { wash: ['#a8281e', '#2a5aa8', '#3a7a3a'][q], washA: 1, w: 1.6, col: L }); pop(); } },
    hud,
    cam: () => [[S0.books, 620, 980, -0.08], [EV.bk_40, 600, 1000, -0.06], [EV.bk_smug, 440, 1140, 0.1, 'x'], [S1.books, 420, 1160, 0.14]]
  };
  TRANS_IN.books = { a: 0.12, b: 0.32, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); for (let i = 0; i < 16; i++) { const r = rng(7880 + i); push(r() * W, (r() * H + e * 900) % H, 2, r() * 6); rect(-60, -80, 120, 160, { wash: '#f0e8d0', washA: a, w: 2, col: L, a }); for (let q = 0; q < 5; q++) pencil([[-44, -50 + q * 24], [44, -50 + q * 24]], { w: 2, col: '#6a5a4a', a: a * 0.6, pass2: false }); pop(); } }); } };
})();
