/* 004 — сцена `golden`: 1859, палуба пароходо-корвета у входа в бухту. Нетронутые зелёные сопки, тайга, туман над водой, бухта-рог.
   Генерал-губернатор Муравьёв-Амурский у борта с подзорной трубой. На «Стамбул!» над сопками встаёт золотой мираж Константинополя
   (купола, минареты), на «Золотой Рог» бухта вспыхивает золотом и рукописная подпись со стрелкой. Переход В сцену — ирис подзорной трубы. */
(() => {
  EV.gd_ist = wt('s1', 'Стамбул!');             // мираж Стамбула
  EV.gd_name = wt('s1', 'Золотой');             // бухта золотится, подпись
  KEYW.push('Стамбул!', 'Золотой', 'Рог.');

  function sky(t) { vgrad(-900, 1300, ['#5a7aa8', '#9ab8d0', '#e8d8c0', '#f4c89a'], 1); glow(760, 760, 420, 'rgba(255,214,150,1)', 0.45);
    for (let i = 0; i < 4; i++) { const x = ((i * 380 - t * 10) % 1700) + 100, y = 260 + i * 90; blob([[x - 180, y], [x - 90, y - 40], [x + 20, y - 52], [x + 140, y - 30], [x + 200, y]], { wash: '#fff4e4', washA: 0.55, line: false }); }
    const r = rng(61); for (let i = 0; i < 9; i++) { const bx = ((r() * 1400 + t * (24 + i * 5)) % 1600) - 200, by = 420 + r() * 260; pencil([[bx - 14, by], [bx, by - 8 + Math.sin(t * 8 + i) * 4], [bx + 14, by]], { w: 2.4, col: '#3a3a4a', pass2: false }); } }
  function forest(x0, x1, base, seed, col, h) { const r = rng(seed); for (let x = x0; x < x1; x += 12 + r() * 10) { const y = base + Math.sin(x * 0.006 + seed) * 40 - Math.abs(Math.sin(x * 0.0035 + seed)) * 90, hh = h * (0.6 + r() * 0.6);
      poly([[x - hh * 0.3, y], [x, y - hh], [x + hh * 0.3, y]], { wash: col, washA: 1, line: false }); } }
  function hills(t, gold) {
    sopki(1000, '#6a8a8a', 0.4, 260, 1); forest(-400, 1500, 900, 11, '#4a6a5a', 30);
    sopki(1080, '#4a7a5a', 2.1, 200, 1); forest(-400, 1500, 1010, 13, '#2e5a3e', 40);
    // бухта-рог: вода уходит изгибом между сопок
    const bay = [[-300, 1150], [100, 1120], [420, 1100], [660, 1070], [860, 1030], [1000, 1010], [1030, 1035], [920, 1090], [720, 1150], [1500, 1190], [1500, 1400], [-300, 1400]];
    const bp = blob(bay, { wash: lerpC('#5a8aa8', '#e8b44a', gold), washA: 1, w: 2, col: '#2a4a5a', a: 0.6 });
    for (let i = 0; i < 18; i++) { const y = 1080 + i * 12, x = 300 + (i * 97) % 700; pencil([[x, y], [x + 60, y]], { w: 2, col: gold > 0.2 ? '#fff0b0' : '#cfe4f0', a: 0.6, pass2: false }); }
    if (gold > 0) glow(700, 1090, 420, 'rgba(255,200,90,1)', 0.5 * gold);
    sil([[-500, 1400], [-500, 1120], [-200, 1100], [120, 1170], [260, 1400]], '#2e5a3a', 1); sil([[1600, 1400], [1600, 1110], [1300, 1120], [1080, 1200], [980, 1400]], '#2e5a3a', 1); forest(-500, 200, 1180, 17, '#1e4a2e', 56); forest(1020, 1600, 1190, 19, '#1e4a2e', 56);
    haze('#f0e0c8', 0.12);
  }
  function mirage(t) {                                              // золотой мираж Стамбула над сопками
    const k = sm((t - EV.gd_ist + 0.2) / 0.4); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k * 0.85; const C = '#f2c66a', B = 900;
    glow(600, 760, 520, 'rgba(255,214,140,1)', 0.35);
    push(600, B, 1); ell(0, -170, 140, 120, { wash: C, washA: 0.9, w: 2, col: '#8a5a1a' }); rect(-180, -170, 360, 170, { wash: C, washA: 0.9, w: 2, col: '#8a5a1a' });
    for (const dx of [-120, 120]) { ell(dx, -180, 52, 46, { wash: C, washA: 0.9, w: 1.8, col: '#8a5a1a' }); }
    for (let w = 0; w < 6; w++) { const wx = -170 + w * 68; ell(wx, -170, 6, 10, { wash: '#8a5a1a', washA: 0.8, line: false }); }
    for (const mx of [-300, -230, 230, 300]) { rect(mx - 9, -400, 18, 400, { wash: C, washA: 0.9, w: 1.6, col: '#8a5a1a' }); poly([[mx - 12, -400], [mx, -470], [mx + 12, -400]], { wash: C, washA: 0.9, w: 1.4, col: '#8a5a1a' }); rect(mx - 14, -300, 28, 8, { wash: '#8a5a1a', washA: 0.8, line: false }); }
    pencil([[0, -292], [0, -330]], { w: 4, col: '#8a5a1a', pass2: false }); ell(0, -340, 10, 10, { wash: C, washA: 1, line: false });
    pop(); txt('Константинополь', 600, 470, 46, { font: 'Hand', col: '#7a4a10', a: 0.9 });
    ctx.restore();
  }
  function deck(t) {                                                // палуба: доски, фальшборт, мачта, ванты, труба с дымом
    const sw = Math.sin(t * 1.2) * 6;
    push(540, 0, 1, sw * 0.002);
    smokeCol(980, 900, t, 0.8, 0.6, 3, 1);
    rect(930, 900, 100, 430, { wash: '#2a2420', washA: 1, w: 2.4, col: '#0e0a08' }); rect(924, 900, 112, 22, { wash: '#a8341e', washA: 1, w: 2, col: '#3a0e08' });
    pencil([[-560, 1330], [-560, -100]], { w: 22, col: '#6a4424' }); for (let q = 0; q < 2; q++) pencil([[-620, 300 + q * 260], [-500, 300 + q * 260]], { w: 12, col: '#6a4424' });
    for (let i = 0; i < 6; i++) pencil([[-560, 200 + i * 40], [-200 + i * 70, 1360]], { w: 2.2, col: '#2a1a0a', a: 0.7, pass2: false });
    for (let i = 0; i < 6; i++) pencil([[-200 + i * 70, 1360 - 0], [-200 + i * 70 + 4, 1360 - 0]], { w: 1, col: '#000', pass2: false });
    for (let r = 0; r < 8; r++) pencil([[-470 + r * 6, 400 + r * 115], [-140 - r * 4, 400 + r * 115 + 60]], { w: 2, col: '#3a2a1a', a: 0.6, pass2: false });
    const rail = rect(-600, 1300, 1300, 90, { wash: '#7a4a28', washA: 1, w: 2.6, col: '#2a1608', key: 9610 }); hatch(rail.path, rail.bb, { gap: 9, a: 0.18, col: '#3a1e0a', ang: 0.05, key: 9611 });
    rect(-610, 1290, 1320, 18, { wash: '#a8743e', washA: 1, w: 2, col: '#2a1608' });
    for (let x = -560; x < 700; x += 110) rect(x, 1308, 14, 82, { wash: '#5a3418', washA: 1, line: false });
    ell(380, 1320, 30, 18, { wash: '#c89a3a', washA: 1, w: 2, col: '#4a3008' }); pencil([[380, 1302], [440, 1240], [500, 1236]], { w: 6, col: '#2a2a2a', pass2: false });   // кнехт и канат
    const d = poly([[-700, 1390], [800, 1390], [1200, 2600], [-1100, 2600]], { wash: '#c49a64', washA: 1, w: 2.4, col: '#3a2410', key: 9612 });
    for (let i = -12; i < 14; i++) pencil([[i * 60 + 40, 1390], [i * 120 + 60, 2600]], { w: 2, col: '#7a5430', a: 0.6, pass2: false });
    pop();
  }
  function general(t) {                                             // Муравьёв-Амурский у борта: мундир, эполеты, бакенбарды, подзорная труба
    const sc = t > EV.gd_ist - 0.1 && t < EV.gd_name + 0.5;
    human(220, GY - 10, 1.18, t, { body: '#2a4a32', bodyD: '#10201a', trim: '#d8b04a', belt: '#e8e2d0', legs: '#1e2a24', boots: '#140e0a', hair: '#b8b0a0', beard: 'short', hat: 'cap', hatCol: '#2a4a32', face: t > EV.gd_name ? 'smile' : sc ? 'shock' : 'calm', look: 0.8, armL: 'hold', armR: t > EV.gd_name ? 'point' : 'up', prop: t > EV.gd_name ? null : 'scroll', seed: 91 });
    push(220, GY - 10, 1.18); for (const sx of [-1, 1]) { const ex = sx * 48, ey = -232; ell(ex, ey, 26, 10, { wash: '#e0b448', washA: 1, w: 1.6, col: '#6a4a08' }); for (let f = -3; f <= 3; f++) pencil([[ex + f * 6, ey + 8], [ex + f * 6, ey + 24]], { w: 2, col: '#e0b448', pass2: false }); }
    rect(-44, -330, 88, 8, { wash: '#b8241e', washA: 1, line: false }); pop();
    if (!(t > EV.gd_name)) { push(220 + 82 * 1.18, GY - 10 - 330 * 1.18, 1.18, -0.6); rect(-8, -70, 16, 80, { wash: '#c89a3a', washA: 1, w: 1.6, col: '#4a3008' }); rect(-11, -84, 22, 18, { wash: '#8a6424', washA: 1, w: 1.6, col: '#3a2008' }); pop(); }
  }
  function sailor(x, s, t, seed, rope) { human(x, GY + 40, s, t, { body: '#f0ece0', bodyD: '#a8a49a', trim: '#2a3a6a', legs: '#2a3a6a', hat: 'cap', hatCol: '#f0ece0', hair: '#4a3020', face: 'calm', look: -0.4, armL: rope ? 'up' : 'down', armR: rope ? 'up' : 'hold', seed, flip: -1 }); }

  WORLD.golden = (t, u, cat) => {
    const gold = sm((t - EV.gd_name) / 0.5);
    lay(40, () => sky(t));
    lay(20, () => mirage(t));
    lay(9, () => hills(t, gold));
    lay(1.3, () => { motes(14, [-200, 1000, 1300, 1250], '#ffffff', t, 63, { sp: 0, vx: 20, sz: 26, a: 0.12, wob: 1 }); });
    lay(1, () => { deck(t); sailor(1020, 0.95, t, 92, 1); general(t); cat(); });
    lay(0.6, () => { pencil([[-100, 300], [200, 2200]], { w: 14, col: '#2a1a0a', pass2: false }); pencil([[1150, 200], [880, 2200]], { w: 10, col: '#2a1a0a', pass2: false }); });
    if (gold > 0 && t < EV.gd_name + 2) note('ЗОЛОТОЙ РОГ', 700, 980, t, EV.gd_name, S1.golden, '#ffe6a0', 64, -0.04, [[760, 1000], [740, 1060]]);
  };
  DIR.golden = {
    outfit: 'general', light: { side: 1, rim: '#ffe0a8' }, grade: ['#c8904a', 0.14],
    act: () => [[S0.golden, 'talk'], [EV.gd_ist - 0.03, 'awe'], [EV.gd_name - 0.03, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 600, y: GY + 60, s: 1.2, look: t < EV.gd_ist ? [0.6, -0.3] : t < EV.gd_name ? [0.1, -0.6] : [0.3, 0],
      prop: 'spyglass', propAng: t < EV.gd_ist ? -1.3 : -0.2, hand: t < EV.gd_ist ? [40, -360] : [110, -230], tilt: t > EV.gd_ist && t < EV.gd_name ? -0.06 : 0, tailUp: t > EV.gd_ist }),
    cam: () => [[S0.golden, 560, 1000, 0.18, 'x'], [EV.gd_ist, 560, 860, 0.0], [EV.gd_name, 600, 940, 0.06], [S1.golden, 620, 980, 0.12]]
  };
  // ---------------------------------------------------------------- переход В golden: ирис подзорной трубы
  TRANS_IN.golden = { a: 0.2, b: 0.42, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 540, cy = 900, R = 40 + Math.pow(q, 1.5) * 1250;
    drawBuf(A, 1 + q * 0.3, cx, cy); scr(() => screenFill('#0a0604', 0.5 * q));
    inCircle(cx, cy, R, () => drawBuf(B, 1.25 - 0.25 * q, cx, cy));
    scr(() => { for (let i = 0; i < 4; i++) pencil(ellPts(cx, cy, R + i * 18, R + i * 18, 0, 0.02, 90), { w: 16 - i * 3, col: ['#c89a3a', '#8a6424', '#e8c46a', '#5a3a14'][i], a: 0.95, pass2: false, gap: false });
      glow(cx - R * 0.6, cy - R * 0.6, R * 0.3, 'rgba(255,255,240,1)', 0.25 * (1 - q)); });
  } };
})();
