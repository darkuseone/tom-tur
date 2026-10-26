/* 012 — сцены `today` и `button`.
   today (ответ на хук): 2026, площадь Свободы и проспект. Белая ратуша (табличка «восстановлена 2004»), сталинские дома, вдали
   «алмаз» Национальной библиотеки, люди, троллейбус. На «стёрли» поверх на миг проступают руины 1944-го, на «заново» — плашка
   «МИНСК 1067 · ДОМА 1950-х · РАТУША 2004». Переход В сцену — радиоволна кольцами раскрывает кадр.
   button: ночной проспект, библиотека переливается светом, портал часов с постерами; в конце камера наезжает на ратушу — первый кадр хука
   (петля). Переход В button: стрелка башенных часов ратуши обегает циферблат и открывает кадр. */
(() => {
  EV.td_young = wtk('t1', 'моложе:');
  EV.td_erase = wtk('t1', 'стёрли');
  EV.td_new = wtk('t1', 'заново.');
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  KEYW.push('моложе:', 'заново.');
  const ghost = t => t > EV.td_erase && t < EV.td_new ? Math.sin(clamp((t - EV.td_erase) / (EV.td_new - EV.td_erase)) * Math.PI) : 0;

  // ================================================================ TODAY
  function sky(t) { vgrad(-900, 1000, ['#4a90d0', '#a8d0ee', '#f4ecd8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 120 + i * 70 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function city(t) {
    library(1250, 900, 0.5, t); stalin(-470, 1080, 380, 380, t, { key: 12800 }); stalin(1050, 1080, 400, 360, t, { key: 12801, tower: true }); spirit(-80, 960, 0.4, t);
    ratusha(540, 1080, 0.82, t, { plaque: 'восстановлена · 2004' });
    const g = ghost(t); if (g > 0) { ctx.save(); ctx.globalAlpha = 0.75 * g; for (let k = 0; k < 6; k++) { const x = -420 + k * 330, h = 140 + ((k * 53) % 160); poly([[x, 1080], [x, 1080 - h], [x + 60, 1080 - h - 40], [x + 140, 1080 - h + 20], [x + 220, 1080 - h - 30], [x + 260, 1080]], { wash: '#6a645a', washA: 1, w: 2, col: '#1a1410' }); } ctx.restore(); }
    const r = rect(-500, 1080, 2100, 90, { wash: '#c8c0b0', washA: 1, w: 2, col: '#3a3630' });
    const tx = ((t - S0.today) * 90) % 2000 - 400; push(tx, 1150, 0.5); rect(-180, -150, 360, 130, { wash: '#2a7a9a', washA: 1, w: 2, col: '#0a1a24' }); for (let q = 0; q < 6; q++) rect(-160 + q * 56, -130, 44, 50, { wash: '#bfe0f0', washA: 1, w: 1, col: '#0a1a24' }); for (const wx of [-110, 110]) ell(wx, -20, 26, 26, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' }); pencil([[-60, -150], [-20, -260]], { w: 3, col: '#2a2a2a', pass2: false }); pencil([[20, -150], [60, -260]], { w: 3, col: '#2a2a2a', pass2: false }); pop();
    for (let i = 0; i < 7; i++) { const x = ((i * 240 + t * (25 + i * 5)) % 1700) - 200; human(x, 1200, 0.42, t, { body: ['#c83a3a', '#3a5a8a', '#e8d8b0', '#3a6a3a', '#8a3a6a', '#2a2a2a', '#e8a33c'][i], legs: '#2a2a3a', hair: '#3a2a1a', hat: i % 3 ? null : 'cap', hatCol: '#e8e0d0', face: 'smile', prop: i % 2 ? 'phone' : undefined, seed: 12810 + i, flip: i % 2 ? -1 : 1 }); }
  }
  function plaza(t) { const g = shape([[-500, 1250], [1600, 1250], [1600, 2400], [-500, 2400]], { wash: '#b8b0a2', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1260; y < 2400; y += 40) rect(x + (Math.floor(y / 40) % 2) * 35, y, 66, 36, { wash: '#c8c0b2', washA: 0.6, w: 1, col: '#6a645a', a: 0.4 }); ctx.restore(); }

  WORLD.today = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => city(t));
    lay(1, () => { plaza(t); cat(); });
    lay(0.7, () => { if (t > EV.td_new) motes(30, [0, 500, W, 1500], '#fff2c8', t, 12820, { sp: -30, sz: 3, a: 0.7, tw: 1, add: 1 }); });
  };
  DIR.today = {
    outfit: 'hoodieM', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a080', 0.08],
    act: () => [[S0.today, 'talk'], [EV.td_young, 'smug'], [EV.td_erase - 0.03, 'scared'], [EV.td_new, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1480, s: 1.06, look: t < EV.td_new ? [0.5, -0.3] : [0.1, 0.05], hand: t > EV.td_new ? [100, -390] : [110, -270], tailUp: true }),
    cam: () => [[S0.today, 600, 1000, 0.04], [EV.td_young, 580, 1020, 0.08], [EV.td_erase, 560, 1000, 0.04], [EV.td_new, 560, 1040, 0.08], [S1.today, 560, 1040, 0.12]],
    hud: t => { if (t > EV.td_new) { const k = popK(t, EV.td_new, 0.35); push(540, 700, k, 0); ctx.save(); ctx.globalAlpha = 0.92 * k; ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-330, -80, 660, 160); ctx.restore();
        [['МИНСК', '1067', -220], ['ДОМА', '1950-е', 0], ['РАТУША', '2004', 220]].forEach(([a, b, x]) => { txt(a, x, -30, 30, { font: 'Osw', col: '#f6e7c8', a: k }); txt(b, x, 24, 50, { font: 'Osw', col: '#ffd24a', a: k }); }); pop(); } }
  };
  TRANS_IN.today = { a: 0.3, b: 0.4, fx(k, t, A, B) {                // радиоволна кольцами раскрывает кадр
    drawBuf(A); const R = Math.pow(sm(k), 1.2) * 1500 + 1; inCircle(540, 1500, R, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { for (let q = 0; q < 4; q++) { const rr = R - q * 60; if (rr > 0) pencil(ellPts(540, 1500, rr, rr, 0, 0, 80), { w: 8 - q * 1.5, col: '#ffd890', a: 0.8 * (1 - sm(k)), pass2: false }); } });
  } };

  // ================================================================ BUTTON
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#0a1030', '#1a2450', '#3a3a70', '#7a5a8a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(23); for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1100 - 500, 2, 2); } ctx.restore(); });
    lay(12, () => { library(1150, 1180, 0.62, t, { night: true }); stalin(-470, 1200, 380, 380, t, { key: 12900, lit: true, night: true }); ratusha(450, 1200, 0.7, t, { col: '#e8e4f0' }); for (let k = 0; k < 20; k++) glow(-300 + k * 90, 1210, 14, 'rgba(255,214,140,1)', 0.7); });
    haze('#2a2050', 0.08);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(90,60,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ВИЛЬНЮС', '#8a3a2a', '#f0c070', 'tower'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['РИМ', '#5a3a2a', '#f0c070', 'col'], ['?', '#2a4a3a', '#c8e0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1540], [1500, 1530], [1500, 2400], [-400, 2400]], { wash: '#2a2632', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 70) pencil([[x, 1540], [x + 30, 2400]], { w: 1.4, col: '#4a4658', a: 0.5, pass2: false }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 37, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieM', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.24],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1600, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [DUR - 0.9, 560, 1000, 0.08], [DUR + 0.2, 450, 900, 0.5, 'x']],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {      // стрелка башенных часов обегает циферблат и открывает кадр
    const a = sm(k) * 6.283, cx = 540, cy = 960; drawBuf(A);
    const P = new Path2D(); P.moveTo(cx, cy); for (let q = 0; q <= 40; q++) { const an = -Math.PI / 2 + a * q / 40; P.lineTo(cx + Math.cos(an) * 2400, cy + Math.sin(an) * 2400); } P.closePath(); inPath(P, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { pencil(ellPts(cx, cy, 420, 420, 0, 0, 80), { w: 16, col: '#2a2420', a: 0.8 * Math.sin(k * Math.PI), pass2: false }); push(cx, cy, 1, -Math.PI / 2 + a); rect(0, -10, 900, 20, { wash: '#2a2420', washA: 1, w: 2, col: '#000' }); pop(); ell(cx, cy, 24, 24, { wash: MN.gold, washA: 1, w: 2, col: '#6a4a08' }); });
  } };
})();
