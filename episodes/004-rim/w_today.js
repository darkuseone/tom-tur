/* 004 — сцены `today` и `button`.
   today: 2026, снова Торре Арджентина на закате (петля к хуку). Призрак Цезаря растворяется, на «правят кошки» у всех кошек колонии
   появляются лавровые венки, на «Рим — наш!» Том поднимает лапу, кошки — хвосты. Переход В today: камера вылетает сквозь вентрешётку метро.
   button: ночной Рим с Яникула — купол Св. Петра, Колизей в подсветке, Тибр с мостами; портал часов с постерами городов.
   Переход В button: кошачья лапа накрывает объектив. */
(() => {
  EV.td_where = WT('t1', 'Цезаря,');
  EV.td_rule = WT('t1', 'правят');
  EV.td_rome = WT('t1', 'Рим');
  EV.td_ours = WT('t1', 'наш!');
  EV.bt_point = WT('x1', 'Пиши');
  EV.bt_wink = WT('x1', 'отмотаем!');
  KEYW.push('кошки.', 'наш!');

  WORLD.today = argentina({ dusk: 1, ghost: t => (1 - clamp((t - EV.td_where - 0.6) / 0.6)) * clamp((t - EV.td_where + 0.2) / 0.3) * 0.8, crowns: t => sm(clamp((t - EV.td_rule) / 0.4)), plaque: () => 1 });
  DIR.today = {
    outfit: 'hoodieR', light: { side: -1, rim: '#ffb880' }, grade: ['#c86a5a', 0.16],
    act: () => [[S0.today, 'smug'], [EV.td_where, 'sideeye'], [EV.td_rule, 'proud'], [EV.td_ours, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 700, y: 1520, s: 1.0, look: t < EV.td_rule ? [-0.6, -0.1] : [0, 0.05], hand: t > EV.td_ours - 0.05 ? [60, -360] : undefined, tailUp: t > EV.td_rule, tilt: t > EV.td_ours ? 0.06 : 0 }),
    cam: () => [[S0.today, 560, 1080, -0.04], [EV.td_where, 480, 1140, 0.04], [EV.td_rule, 560, 1260, 0.08], [EV.td_ours, 620, 1240, 0.16, 'x'], [S1.today, 620, 1240, 0.2]]
  };
  // ---------------------------------------------------------------- переход В today: вылет сквозь вентрешётку
  TRANS_IN.today = { a: 0.25, b: 0.45, runA: 1, fx(k, t, A, B) {
    if (k < 0.35) { drawBuf(A, 1 + k * 1.4, 540, 400); scr(() => screenFill('#0a0a0a', sm(k / 0.35) * 0.6)); }
    else drawBuf(B, 1.4 - 0.4 * sm((k - 0.35) / 0.65));
    const z = k < 0.35 ? 0.4 + k : 0.75 + Math.pow((k - 0.35) / 0.65, 2) * 6;
    scr(() => { push(540, 960, z); ctx.save(); ctx.globalAlpha = k < 0.35 ? sm(k / 0.35) : 1 - sm((k - 0.6) / 0.4);
      const fr = new Path2D(); fr.rect(-2000, -2000, 4000, 4000); fr.rect(-500, -700, 1000, 1400); ctx.fillStyle = '#2a2a2e'; ctx.fill(fr, 'evenodd');
      for (let x = -500; x <= 500; x += 100) pencil([[x, -700], [x, 700]], { w: 22, col: '#3e3e44', pass2: false }); for (let y = -700; y <= 700; y += 100) pencil([[-500, y], [500, y]], { w: 22, col: '#3e3e44', pass2: false });
      pencil([[-500, -700], [500, -700], [500, 700], [-500, 700], [-500, -700]], { w: 30, col: '#1a1a1e', pass2: false }); ctx.restore(); pop(); });
  } };

  // ---------------------------------------------------------------- button
  function nightRome(t) {
    vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#6a3a5a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(10300); for (let i = 0; i < 130; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore();
    ell(180, 260, 60, 60, { wash: '#f6ecd0', washA: 1, w: 1.6, col: '#a89a7a' }); glow(180, 260, 200, 'rgba(240,236,210,1)', 0.35);
  }
  function skyline(t) {
    sil([[-600, 1250], [-200, 1170], [300, 1190], [900, 1150], [1700, 1210], [1700, 1500], [-600, 1500]], '#141228', 1);
    push(850, 1170, 0.95); sil([[-160, 0], [-160, -90], [-130, -220], [-60, -290], [0, -305], [60, -290], [130, -220], [160, -90], [160, 0]], '#e8dcc0', 0.95); sil([[-16, -305], [-16, -360], [16, -360], [16, -305]], '#e8dcc0', 0.95); glow(0, -200, 260, 'rgba(255,220,150,1)', 0.45); for (let q = -3; q <= 3; q++) pencil([[q * 40, -10], [q * 34, -240]], { w: 2, col: '#b8a888', a: 0.7, pass2: false }); pop();
    push(260, 1190, 0.5); const c = blob([[-520, 0], [-520, -560], [-420, -640], [420, -640], [520, -560], [520, 0]], { wash: '#d8a860', washA: 1, w: 2, col: '#4a3010' }); for (let rr = 0; rr < 3; rr++) for (let q = 0; q < 11; q++) blob([[-480 + q * 92, -20 - rr * 150], [-480 + q * 92, -100 - rr * 150], [-450 + q * 92, -132 - rr * 150], [-420 + q * 92, -100 - rr * 150], [-420 + q * 92, -20 - rr * 150]], { wash: '#ffd890', washA: 1, w: 1.4, col: '#6a4a14' }); glow(0, -300, 600, 'rgba(255,200,120,1)', 0.4); pop();
    for (let k = 0; k < 40; k++) { const x = -500 + k * 50, h = 40 + (k * 37) % 80, y = 1250 - (k % 5) * 10; if (Math.abs(x - 850) < 180 || Math.abs(x - 260) < 280) continue; sil([[x, y], [x, y - h], [x + 38, y - h], [x + 38, y]], '#1a1834', 1); windows(x + 3, y - h + 4, 32, h - 8, 3, Math.floor(h / 14), k * 7, 0.5, '#ffcf7a', '#8fd8ff', 0.7); }
    const rp = poly([[-600, 1300], [1700, 1290], [1700, 1500], [-600, 1500]], { wash: '#1a2a4a', washA: 1, line: false }); for (let k = 0; k < 40; k++) { const x = -500 + k * 55; pencil([[x, 1310 + (k % 4) * 30], [x + 30, 1310 + (k % 4) * 30]], { w: 3, col: '#ffcf7a', a: 0.4, pass2: false }); }
    for (let q = 0; q < 5; q++) { const x = -300 + q * 120; pencil(spline([[x, 1300], [x + 60, 1250], [x + 120, 1300]], false, 6), { w: 6, col: '#c8b898', pass2: false }); } pencil([[-300, 1250], [300, 1250]], { w: 8, col: '#c8b898', pass2: false }); for (let q = 0; q < 6; q++) glow(-280 + q * 110, 1240, 16, 'rgba(255,214,140,1)', 0.8);
  }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => nightRome(t));
    lay(14, () => skyline(t));
    haze('#2a2050', 0.1);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(60,110,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['ПИТЕР', '#2a4a3a', '#c8e0a0', 'tower'], ['?', '#8a3a2a', '#f0c070', 'col']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1560], [1500, 1540], [1500, 2400], [-400, 2400]], { wash: '#1e1a2a', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1550], [x, 1440]], { w: 6, col: '#2a2638', pass2: false }); pencil([[-400, 1440], [1500, 1430]], { w: 8, col: '#2a2638', pass2: false });
      kitty(200, 1560, 1.0, t, { col: '#c8843a', stripe: '#8a4a1a', belly: '#f6ecd8', pose: 'sit', look: 0.7, crown: 1, seed: 21 }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 10310, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieR', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: кошачья лапа накрывает объектив
  TRANS_IN.button = { a: 0.25, b: 0.35, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B); const q = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5);
    scr(() => { const y = lerp(2600, 900, q), s = 1 + q * 1.4; push(560, y, s);
      const c = '#a8987a', L = '#2a1e12'; shape(tubeP([[0, 1400], [0, 400], [0, 60]], 520, 560), { wash: c, washA: 1, w: 4, col: L }); const p = blob([[-300, 140], [-320, -60], [-200, -220], [0, -260], [200, -220], [320, -60], [300, 140]], { wash: c, washA: 1, w: 5, col: L });
      fstr(p.path, p.bb, 80, 1.5, 22, '#6a5a44', 0.5, 10320, 3); for (const [x, y2, r] of [[-200, -150, 60], [-70, -210, 64], [70, -210, 64], [200, -150, 60]]) ell(x, y2, r, r * 0.9, { wash: '#e8a0a0', washA: 1, w: 3, col: L }); ell(0, 20, 150, 110, { wash: '#e8a0a0', washA: 1, w: 3, col: L });
      for (let i = 0; i < 6; i++) pencil([[-260 + i * 100, 200], [-250 + i * 100, 1300]], { w: 3, col: '#6a5a44', a: 0.6, pass2: false }); pop(); });
  } };
})();
