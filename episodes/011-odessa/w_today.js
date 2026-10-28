/* 011 — сцены `today` и `button`.
   today: 2026, Приморский бульвар летом: Дюк на верху лестницы, Оперный, акации, дома из ракушняка, порт и море, туристы с телефонами.
   На «ЮНЕСКО» — табличка «ЮНЕСКО · 2023 · всемирное наследие» (без логотипа), на «стоит» земля под бульваром становится прозрачной —
   под городом галереи катакомб; Том хохочет. Переход В сцену — луч шахтёрского фонаря проходит снизу вверх и раскрывает кадр.
   button: ночной бульвар, Оперный в огнях, портал часов с постерами городов; в конце плита мостовой проваливается и камера уходит
   в тоннель со свечой — это первый кадр хука (петля). Переход В button: занавес Оперного театра закрывается и открывается. */
(() => {
  EV.td_un = wtk('t1', 'ЮНЕСКО');
  EV.td_stands = wtk('t1', 'стоит');
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  KEYW.push('охрану.', 'подвале.');
  const xray = t => sm((t - EV.td_stands) / 0.6);

  // ================================================================ TODAY
  function sky(t) { vgrad(-900, 760, ['#4a90d0', '#a8d0ee', '#f4ecd8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 120 + i * 70 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (let i = 0; i < 5; i++) { const x = ((i * 280 + t * (60 + i * 15)) % 1500) - 200, y = 300 + i * 70 + Math.sin(t * 2 + i) * 20, f = Math.sin(t * 8 + i) * 12; pencil([[x - 26, y + f], [x - 6, y - 4], [x, y], [x + 6, y - 4], [x + 26, y + f]], { w: 3, col: '#f6f6f2' }); pencil([[x - 26, y + f], [x - 6, y - 4], [x, y], [x + 6, y - 4], [x + 26, y + f]], { w: 1.2, col: '#3a3a3a', a: 0.7, pass2: false }); } }
  function sea(t) { vgrad(700, 860, ['#2a8ab0', '#1a5a7a'], 1); for (let k = 0; k < 8; k++) pencil([[-400, 716 + k * 18], [1480, 720 + k * 18]], { w: 1.2, col: '#d0eef8', a: 0.3, pass2: false }); merchant(1150, 800, 0.24, t, 1, { flag: '#2a5aa8' }); for (const cx of [-200, -40, 120]) { pencil([[cx, 860], [cx + 30, 700], [cx + 140, 680]], { w: 6, col: '#2a5a8a', pass2: false }); } }
  function boulevard(t) {
    const g = rect(-500, 1000, 2100, 160, { wash: '#c8b48a', washA: 1, w: 2, col: '#3a2a14' });
    odHouse(-440, 1040, 340, 360, OD.stone, t, { key: 12000 }); odHouse(-90, 1040, 280, 320, '#e8b89a', t, { key: 12001 }); opera(860, 1040, 0.7, t); duke(450, 1040, 0.85, t);
    for (const [x, h, sd] of [[190, 300, 1], [650, 320, 2], [1210, 300, 3], [1360, 320, 4]]) acacia(x, 1045, h, t, 12010 + sd);
    for (let i = 0; i < 8; i++) { const x = ((i * 220 + t * (25 + i * 5)) % 1700) - 200; human(x, 1110, 0.42, t, { body: ['#c83a3a', '#3a5a8a', '#e8d8b0', '#3a6a3a', '#8a3a6a', '#2a2a2a', '#e8a33c', '#5a8ab0'][i], legs: '#2a2a3a', hair: '#3a2a1a', hat: i % 3 ? null : 'cap', hatCol: '#e8e0d0', face: 'smile', prop: i % 2 ? 'phone' : undefined, seed: 12020 + i, flip: i % 2 ? -1 : 1 }); }
  }
  function plaza(t) {                                                  // мостовая переднего плана; на «стоит» — прозрачная, под ней катакомбы
    const x = xray(t);
    const g = shape([[-500, 1160], [1600, 1160], [1600, 2400], [-500, 2400]], { wash: '#b8aa94', washA: 1, w: 1, col: '#000', a: 0.2 });
    ctx.save(); ctx.clip(g.path); for (let xx = -480; xx < 1600; xx += 70) for (let y = 1170; y < 2400; y += 40) rect(xx + (Math.floor(y / 40) % 2) * 35, y, 66, 36, { wash: '#c8baa4', washA: 0.6, w: 1, col: '#6a5e4e', a: 0.4 }); ctx.restore();
    if (x > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-500, 1500 - 340 * x, 2100, 1000); ctx.clip(); ctx.globalAlpha = 0.92; tunnels(1160, 1520, t, { rows: 3, lit: 1, seed: 12030, shafts: [] }); ctx.restore(); pencil([[-500, 1500 - 340 * x], [1600, 1500 - 340 * x]], { w: 4, col: '#ffd890', a: 0.8 * (1 - x * 0.5), pass2: false }); }
  }

  WORLD.today = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => { push(0, 150, 1); sea(t); pop(); });
    lay(6, () => boulevard(t));
    lay(1, () => { plaza(t); cat(); });
  };
  DIR.today = {
    outfit: 'hoodieO', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a080', 0.08],
    act: () => [[S0.today, 'proud'], [EV.td_un, 'awe'], [EV.td_stands - 0.03, 'smug'], [EV.td_stands + 0.6, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1480, s: 1.06, look: t < EV.td_stands ? [0.4, -0.3] : [0.1, 0.5], hand: t > EV.td_stands + 0.5 ? [80, -380] : [110, -270], tailUp: true }),
    cam: () => [[S0.today, 600, 1000, 0.04], [EV.td_un, 600, 1000, 0.06], [EV.td_stands, 560, 1080, 0.02], [S1.today, 560, 1100, 0.06]],
    hud: t => { if (t > EV.td_un && t < EV.td_stands + 0.8) { const k = popK(t, EV.td_un, 0.35); push(600, 680, k, -0.02); rect(-260, -80, 520, 160, { wash: '#f2ece0', washA: 0.97, w: 4, col: '#1e4a7a' }); txt('ЮНЕСКО · 2023', 0, -26, 46, { font: 'Osw', col: '#1e4a7a' }); txt('исторический центр — всемирное наследие', 0, 30, 24, { col: '#2a2a2a' }); pop(); }
      if (t > EV.td_stands + 0.3) note('а под ним — катакомбы', 600, 1420, t, EV.td_stands + 0.3, S1.today, '#ffe8b0', 40, -0.02); }
  };
  TRANS_IN.today = { a: 0.3, b: 0.4, fx(k, t, A, B) {                // луч шахтёрского фонаря проходит снизу вверх и раскрывает кадр
    const y = lerp(H + 200, -400, sm(k)); drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = 0.5 * sm(k / 0.3); ctx.fillStyle = '#0a0604'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    const P = new Path2D(); P.rect(0, y, W, H - y + 10); inPath(P, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { glow(540, y, 700, 'rgba(255,230,160,1)', 0.8 * (1 - sm(k) * 0.6)); pencil([[0, y], [W, y]], { w: 10, col: '#fff2c8', a: 0.9 * (1 - sm(k)), pass2: false }); });
  } };

  // ================================================================ BUTTON
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9), dive = sm((t - (DUR - 0.9)) / 0.8);
    lay(40, () => { vgrad(-800, 1400, ['#0a1030', '#1a2450', '#3a3a70', '#8a5a7a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(21); for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1100 - 500, 2, 2); } ctx.restore(); });
    lay(12, () => { vgrad(980, 1200, ['#14244a', '#0a1428'], 1); for (let k = 0; k < 30; k++) glow(-300 + k * 60, 1000 + (k % 3) * 40, 14, k % 2 ? 'rgba(255,214,140,1)' : 'rgba(140,220,255,1)', 0.7);
      odHouse(-420, 1120, 300, 260, '#5a5a7a', t, { key: 12100, lit: true, night: true }); opera(760, 1120, 0.6, t, { lit: true, col: '#d8d0e0' }); duke(300, 1120, 0.6, t); for (const sx of [120, 1260]) acacia(sx, 1120, 230, t, 12110 + sx, { leaf: '#2a4a3a', bloom: false }); });
    haze('#2a2050', 0.08);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(90,60,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['МИНСК', '#2e6a3a', '#e8d8a0', 'tower'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['РИМ', '#8a3a2a', '#f0c070', 'col'], ['?', '#2a4a3a', '#c8e0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1540], [1500, 1530], [1500, 2400], [-400, 2400]], { wash: '#2a2632', washA: 1, w: 2, col: '#0a0810' });
      for (let x = -300; x < 1400; x += 70) pencil([[x, 1540], [x + 30, 2400]], { w: 1.4, col: '#4a4658', a: 0.5, pass2: false });
      if (dive > 0) { const hw = 120 + 600 * dive; const hole = shape([[540 - hw, 1640], [540 + hw, 1640], [540 + hw * 1.1, 1640 + hw * 0.6], [540 - hw * 1.1, 1640 + hw * 0.6]], { wash: '#140c06', washA: 1, w: 3, col: OD.rockD }); glow(540, 1640 + hw * 0.3, hw, 'rgba(255,190,90,1)', 0.5 * dive); }
      cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 36, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieO', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.24],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 600, y: 1600, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [DUR - 0.9, 560, 1200, 0.1], [DUR + 0.2, 540, 1700, 0.7, 'x']],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: занавес Оперного закрывается и открывается
  TRANS_IN.button = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const c = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5); drawBuf(k < 0.5 ? A : B);
    scr(() => { for (const sd of [-1, 1]) { const w = (W / 2 + 40) * c, x0 = sd < 0 ? 0 : W - w; const cu = rect(x0, 0, w, H, { wash: '#8a1a24', washA: 1, w: 3, col: '#3a0a0e' }); shadeG(cu.path, x0, 0, x0 + w, 0, '#4a0a12', 0.5); for (let q = 0; q < 8; q++) { const fx = x0 + (q + 0.5) * w / 8; pencil([[fx, 0], [fx + Math.sin(q + t * 3) * 6, H]], { w: 5, col: '#5a0a14', a: 0.6, pass2: false }); } }
      rect(0, 0, W, 90, { wash: '#8a1a24', washA: 1, w: 3, col: '#3a0a0e' }); for (let q = 0; q < 12; q++) ell(45 + q * 90, 90, 45, 26, { wash: '#a82a34', washA: 1, w: 2, col: '#3a0a0e' }); pencil([[0, 70], [W, 70]], { w: 6, col: '#d6a842', pass2: false }); });
  } };
})();
