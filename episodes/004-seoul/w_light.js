/* 004 — сцена `light`: 1887, ночь у пруда Хянвонджи в Кёнбоккуне. Шестигранный двухъярусный павильон Хянвонджон на острове,
   горбатый деревянный мостик, отражения в воде. Вокруг пруда — железные столбы с дуговыми лампами, провода, справа кирпичная
   электростанция с трубой и паром. Придворные: дама в ханбоке, евнух, стражник. Том-инженер в цилиндре дёргает рубильник на «Лампы» —
   вспышка; на «Мигали» лампы мигают вразнобой и искрят; на «хулиганский» у ближней лампы прорезается хулиганская рожица.
   Переход В сцену — задутая свеча, темнота, вспышка дуги. */
(() => {
  EV.lt_on = LS('s6') + 0.12;
  EV.lt_blink = wtk('s6', 'Мигали');
  EV.lt_name = wtk('s6', 'хулиганский');
  KEYW.push('Эдисона', 'огонь».');
  SHAKES.push([EV.lt_on, 0.2, 6]);
  const LAMPS = [[-60, 820, 0.7], [190, 860, 0.85], [880, 860, 0.85], [1130, 820, 0.7]];
  function power(t, i) {                                               // яркость лампы i: 0 до включения, мигание после «Мигали»
    if (t < EV.lt_on + i * 0.05) return 0; let p = 1;
    if (t > EV.lt_blink) { const r = rng(hsh(Math.floor(t * 14), i * 7)); p = r() < 0.35 ? 0.08 : r() < 0.5 ? 0.5 : 1; }
    return p;
  }
  const lit = t => { let s = 0; for (let i = 0; i < LAMPS.length; i++) s += power(t, i); return s / LAMPS.length; };

  function night(t) {
    vgrad(-900, 1000, ['#070a1c', '#141a3a', '#2a2a4a'], 1);
    const r = rng(9700); for (let i = 0; i < 90; i++) ell(-300 + r() * 1700, -700 + r() * 1300, 1.4 + r() * 2, 1.4 + r() * 2, { wash: '#fff6e0', washA: 0.4 + 0.5 * r() * (0.6 + 0.4 * Math.sin(t * 2 + i)), line: false });
    ell(200, -260, 40, 40, { wash: '#f6eedc', washA: 0.9, line: false }); glow(200, -260, 200, 'rgba(255,240,210,1)', 0.25);
  }
  function pond(t) {                                                   // пруд с отражениями, остров, павильон, мостик, лотосы
    const L = lit(t);
    const wp = shape([[-400, 960], [1480, 960], [1480, 1500], [-400, 1500]], { wash: '#16243a', washA: 1, w: 1, col: '#000', a: 0.3 });
    ctx.save(); ctx.clip(wp.path);
    for (const [x, y, s] of LAMPS) { const p = power(t, LAMPS.findIndex(q => q[0] === x)); if (p > 0) { const g = ctx.createLinearGradient(0, 960, 0, 1500); g.addColorStop(0, `rgba(220,235,255,${0.5 * p})`); g.addColorStop(1, 'rgba(220,235,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - 30 * s, 960, 60 * s, 540); } }
    for (let k = 0; k < 30; k++) { const y = 980 + k * 18, ph = t * 1.5 + k; pencil([[-400, y + Math.sin(ph) * 3], [1480, y + Math.cos(ph) * 3]], { w: 1.4, col: '#4a6a8a', a: 0.35, pass2: false, gap: false }); }
    ctx.restore();
    // отражение павильона (перевёрнутое, приглушённое)
    ctx.save(); ctx.translate(0, 1920); ctx.scale(1, -1); ctx.globalAlpha = 0.28; pavilion(t, L, true); ctx.restore();
    const isl = blob([[300, 980], [360, 940], [720, 940], [790, 980], [700, 1010], [380, 1010]], { wash: '#3a4a2a', washA: 1, w: 2, col: '#0a1408' }); for (let k = 0; k < 8; k++) ell(330 + k * 55, 975, 20, 10, { wash: '#7a7a72', washA: 1, w: 1.2, col: '#2a2a2a' });
    pavilion(t, L, false);
    // мостик Чхвихянгё (с острова к ближнему берегу)
    for (const [x, y] of [[180, 1180], [260, 1260], [880, 1150], [960, 1240], [800, 1300]]) { ell(x, y, 34, 10, { wash: '#2a5a3a', washA: 1, w: 1.2, col: '#0a2010' }); if ((x + y) % 3 === 0) { ell(x + 6, y - 12, 8, 10, { wash: '#f0a0b8', washA: 1, w: 1, col: '#6a2a3a' }); } }
  }
  function pavilion(t, L, refl) {                                       // Хянвонджон: шестигранный, двухъярусный, с навершием
    const x = 540, base = 960, lt = 0.35 + 0.65 * L;
    rect(x - 140, base - 30, 280, 30, { wash: '#a8a294', washA: 1, w: 1.6, col: '#2a2620', a: 0.7 });
    for (let i = 0; i < 4; i++) { const cx = x - 120 + i * 80; rect(cx - 7, base - 170, 14, 140, { wash: KO.col, washA: 1, w: 1.2, col: '#2a0a06' }); }
    for (let i = 0; i < 3; i++) { const dp = rect(x - 113 + i * 80, base - 160, 66, 120, { wash: L > 0.2 && !refl ? '#f6dca0' : '#3a3022', washA: 1, w: 1.2, col: '#2a1408' }); }
    rect(x - 130, base - 196, 260, 18, { wash: '#a86a3a', washA: 1, w: 1.4, col: '#2a1408' }); for (let i = 0; i < 9; i++) pencil([[x - 126 + i * 32, base - 196], [x - 126 + i * 32, base - 178]], { w: 3, col: '#c8302a', pass2: false });
    koRoof(x, base - 190, 380, 90, { light: lt, up: 0.42, key: 9710 });
    for (let i = 0; i < 3; i++) rect(x - 70 + i * 55, base - 330, 10, 100, { wash: KO.col, washA: 1, w: 1, col: '#2a0a06' }); rect(x - 80, base - 330, 160, 100, { wash: L > 0.2 && !refl ? '#f6dca0' : '#3a3022', washA: 0.6, w: 1.2, col: '#2a1408' });
    koRoof(x, base - 320, 300, 120, { light: lt, up: 0.45, ridge: 0.5, key: 9711 });
    pencil([[x, base - 440], [x, base - 480]], { w: 6, col: '#c8a040', pass2: false }); ell(x, base - 486, 10, 12, { wash: '#d6a842', washA: 1, w: 1.2, col: '#5a3a08' });
  }
  function shore(t) {                                                  // фон: Пугаксан ночью, крыши дворца, электростанция с трубой
    bugak(860, 1.05, { far: '#1e2440', mid: '#1a2034', near: '#161e2a', rock: '#3a3e52' });
    for (const [x, w] of [[-150, 300], [1200, 300]]) koHall(x, 940, w, 200, t, { bays: 4, light: 0.5, steps: false, lit: 0.3 * lit(t), key: 9720 + x });
    // электростанция справа: кирпич, труба, пар, медные трубы
    const ex = 1040, ey = 960; const bp = rect(ex - 140, ey - 220, 280, 220, { wash: '#8a3a2a', washA: 1, w: 2, col: '#2a0a04' });
    ctx.save(); ctx.clip(bp.path); for (let y = ey - 220; y < ey; y += 16) { pencil([[ex - 140, y], [ex + 140, y]], { w: 1.2, col: '#4a1a0a', a: 0.6, pass2: false, gap: false }); for (let x = ex - 140 + ((y / 16) % 2) * 16; x < ex + 140; x += 32) pencil([[x, y], [x, y + 16]], { w: 1, col: '#4a1a0a', a: 0.5, pass2: false, gap: false }); } ctx.restore();
    poly([[ex - 160, ey - 220], [ex + 160, ey - 220], [ex + 100, ey - 290], [ex - 100, ey - 290]], { wash: '#3a3a40', washA: 1, w: 2, col: '#0a0a0a' });
    rect(ex + 40, ey - 520, 50, 300, { wash: '#7a3020', washA: 1, w: 2, col: '#2a0a04' }); for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5) % 1; ell(ex + 65 + ph * 120, ey - 540 - ph * 300, 30 + ph * 70, 24 + ph * 50, { wash: '#c8c4cc', washA: 0.45 * (1 - ph), line: false }); }
    rect(ex - 100, ey - 150, 60, 80, { wash: '#f6c86a', washA: 0.9, w: 1.4, col: '#2a0a04' }); glow(ex - 70, ey - 110, 90, 'rgba(255,170,80,1)', 0.6 * flick(t, 9));
    pencil([[ex - 140, ey - 60], [ex - 300, ey - 60], [ex - 300, ey + 10]], { w: 10, col: '#b8692e' });
    // провода между столбами
    for (let i = 0; i < LAMPS.length - 1; i++) { const [x0, y0] = LAMPS[i], [x1, y1] = LAMPS[i + 1]; pencil(spline([[x0, y0 - 380], [(x0 + x1) / 2, Math.max(y0, y1) - 330], [x1, y1 - 380]], false, 10), { w: 2, col: '#0a0a10', pass2: false }); }
  }
  function lamps(t) {
    LAMPS.forEach(([x, y, s], i) => { const p = power(t, i), top = y - 400 * s;
      pencil([[x, y], [x, top]], { w: 9 * s, col: '#1a1a20' }); rect(x - 18 * s, y - 20 * s, 36 * s, 20 * s, { wash: '#2a2a30', washA: 1, w: 1.4, col: '#000' });
      pencil([[x, top + 10 * s], [x + 40 * s, top + 10 * s]], { w: 5 * s, col: '#1a1a20' });
      const gx = x + 40 * s, gy = top + 40 * s; pencil([[gx, top + 10 * s], [gx, gy - 24 * s]], { w: 3 * s, col: '#1a1a20', pass2: false });
      if (p > 0) { glow(gx, gy, 340 * s * p, 'rgba(210,230,255,1)', 0.55 * p); glow(gx, gy, 90 * s, 'rgba(255,255,255,1)', 0.7 * p); }
      const gl = ell(gx, gy, 24 * s, 28 * s, { wash: p > 0.3 ? '#f4f8ff' : '#6a6e78', washA: 0.95, w: 2, col: '#1a1a20' }); poly([[gx - 20 * s, gy - 24 * s], [gx + 20 * s, gy - 24 * s], [gx, gy - 44 * s]], { wash: '#2a2a30', washA: 1, w: 1.4, col: '#000' });
      if (p > 0 && t > EV.lt_blink && Math.sin(t * 50 + i * 3) > 0.7) for (let q = 0; q < 5; q++) { const a = q * 1.3 + t * 9; pencil([[gx, gy], [gx + Math.cos(a) * 50 * s, gy + Math.sin(a) * 50 * s]], { w: 2.4, col: '#fff6c0', a: 0.9, pass2: false }); }
      if (false) { const k = popK(t, EV.lt_name, 0.3); push(gx, gy, k * s); pencil([[-14, -10], [-4, -4]], { w: 4, col: '#1a1a20', pass2: false }); pencil([[14, -10], [4, -4]], { w: 4, col: '#1a1a20', pass2: false }); ell(-8, 2, 3, 3, { wash: '#1a1a20', washA: 1, line: false }); ell(8, 2, 3, 3, { wash: '#1a1a20', washA: 1, line: false }); pencil([[-8, 14], [0, 10], [10, 16]], { w: 3, col: '#1a1a20', pass2: false }); pop(); }
    });
  }
  function court(t) {                                                  // придворные: дама в ханбоке, евнух, стражник
    const L = lit(t), sh = t > EV.lt_on;
    human(760, 1380, 0.85, t, { body: '#f2c8d8', bodyD: '#a86a80', legs: '#c8306a', long: 1, hat: 'bun', face: sh ? 'shock' : 'calm', armR: sh ? 'point' : 'hold', armL: 'hold', seed: 90, flip: -1, look: -0.5, skin: '#ecc8a8' });
    blob([[700, 1380], [690, 1240], [830, 1240], [820, 1380]], { wash: '#c8306a', washA: 1, w: 2, col: '#3a0a1a' });
    human(900, 1360, 0.8, t, { body: '#4a6a8a', legs: '#2a2a30', long: 1, hat: 'samo', face: sh ? 'shock' : 'calm', armR: 'hold', armL: sh ? 'up' : 'hold', seed: 91, flip: -1 });
    human(1010, 1350, 0.78, t, { body: '#1f2c4e', legs: '#2a2a30', hat: 'jeonrip', face: 'calm', armR: 'hold', prop: 'spear', seed: 92, flip: -1 });
    if (L > 0.1) for (const [x] of [[760], [900], [1010]]) glow(x, 1150, 120, 'rgba(210,230,255,1)', 0.18 * L);
  }
  function switchBox(t) {                                              // рубильник у Тома
    const x = 160, y = 1470; rect(x - 50, y - 260, 100, 140, { wash: '#4a3a2a', washA: 1, w: 2, col: '#1a0a04' }); rect(x - 36, y - 246, 72, 112, { wash: '#2a2a2e', washA: 1, w: 1.4, col: '#000' });
    pencil([[x, y - 120], [x, y]], { w: 10, col: '#3a2a1a' }); const a = t > EV.lt_on - 0.15 ? 0.7 : -0.7; pencil([[x, y - 190], [x + Math.sin(a) * 60, y - 190 - Math.cos(a) * 60]], { w: 8, col: '#b8692e', pass2: false }); ell(x + Math.sin(a) * 66, y - 190 - Math.cos(a) * 66, 12, 12, { wash: '#1a1a1a', washA: 1, w: 1.4, col: '#000' });
    if (t > EV.lt_on - 0.1 && t < EV.lt_on + 0.3) glow(x, y - 190, 140, 'rgba(255,240,180,1)', 0.8);
  }

  function bigLamp(t) {                                               // ближняя дуговая лампа — та самая «хулиганская»
    const x = 880, base = 1480, top = 760, p = power(t, 1);
    pencil([[x, base], [x, top]], { w: 14, col: '#1a1a20' }); rect(x - 26, base - 40, 52, 40, { wash: '#2a2a30', washA: 1, w: 1.6, col: '#000' }); for (let k = 0; k < 4; k++) pencil([[x - 9, base - 200 - k * 90], [x + 9, base - 200 - k * 90]], { w: 4, col: '#3a3a44', pass2: false });
    pencil(spline([[x, top + 20], [x - 60, top - 10], [x - 110, top + 10]], false, 6), { w: 8, col: '#1a1a20' });
    const gx = x - 110, gy = top + 80; pencil([[gx, top + 10], [gx, gy - 50]], { w: 4, col: '#1a1a20', pass2: false });
    if (p > 0) { glow(gx, gy, 520 * p, 'rgba(210,230,255,1)', 0.5 * p); glow(gx, gy, 140, 'rgba(255,255,255,1)', 0.75 * p); }
    poly([[gx - 44, gy - 46], [gx + 44, gy - 46], [gx, gy - 86]], { wash: '#2a2a30', washA: 1, w: 2, col: '#000' });
    const gl = ell(gx, gy, 52, 60, { wash: p > 0.3 ? '#f4f8ff' : '#6a6e78', washA: 0.96, w: 3, col: '#1a1a20' }); if (p <= 0.3) shadeG(gl.path, gx - 40, gy, gx + 40, gy, '#9aa0b0', 0.5);
    rect(gx - 20, gy + 56, 40, 14, { wash: '#2a2a30', washA: 1, w: 1.4, col: '#000' });
    if (p > 0 && t > EV.lt_blink && Math.sin(t * 40) > 0.5) for (let q = 0; q < 7; q++) { const a = q * 0.9 + t * 11; pencil([[gx + Math.cos(a) * 50, gy + Math.sin(a) * 56], [gx + Math.cos(a) * 110, gy + Math.sin(a) * 120]], { w: 3, col: '#fff6c0', a: 0.9, pass2: false }); }
    if (t > EV.lt_name) { const k = popK(t, EV.lt_name, 0.3); push(gx, gy + 4, k); const bob = Math.sin(t * 8) * 2;
      pencil([[-30, -24 + bob], [-8, -12]], { w: 7, col: '#1a1a20', pass2: false }); pencil([[30, -24 + bob], [8, -12]], { w: 7, col: '#1a1a20', pass2: false });
      ell(-16, 0, 7, 8, { wash: '#1a1a20', washA: 1, line: false }); ell(16, 0, 7, 8, { wash: '#1a1a20', washA: 1, line: false });
      pencil([[-20, 28], [-4, 20], [8, 24], [22, 18]], { w: 5, col: '#1a1a20', pass2: false }); poly([[8, 22], [16, 22], [12, 32]], { wash: '#f6f6f6', washA: 1, w: 1.4, col: '#1a1a20' }); pop(); }
  }

  WORLD.light = (t, u, cat) => {
    lay(30, () => night(t));
    lay(7, () => { shore(t); });
    lay(4, () => { pond(t); lamps(t); });
    lay(2, () => court(t));
    lay(1, () => { const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#2a2a2e', washA: 1, w: 1, col: '#000', a: 0.3 }); hatch(g.path, g.bb, { gap: 10, a: 0.15, col: '#000', ang: 0.1, w: 1 });
      for (let i = 0; i < 10; i++) ell(-100 + i * 140, 1460 + (i % 2) * 20, 50, 16, { wash: '#4a4a52', washA: 1, w: 1.4, col: '#141418' });
      switchBox(t); bigLamp(t); cat();
      if (t > EV.lt_on) glow(560, 1100, 400, 'rgba(210,230,255,1)', 0.18 * lit(t)); });
    lay(0.7, () => { for (const x of [-300, 1380]) pine(x, 2200, 1000, t, x, { leaf: '#142418', leafL: '#2a4a3a', trunk: '#4a2a1a' }); });
  };
  DIR.light = {
    outfit: 'victorian', light: { side: 1, rim: '#d8e8ff' }, grade: ['#3a4a8a', 0.16],
    act: () => [[S0.light, 'smug'], [EV.lt_on, 'awe'], [EV.lt_blink - 0.04, 'annoyed'], [EV.lt_name, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1470, s: 1.06, look: t < EV.lt_on ? [-0.6, 0] : [0.6, -0.4],
      handF: t < EV.lt_on + 0.3 ? [-150, -230] : undefined, hand: t > EV.lt_blink ? [110, -330] : undefined, tilt: t > EV.lt_name ? 0.06 : 0, squash: b.squash + (t > EV.lt_blink && t < EV.lt_name && Math.sin(t * 28) > 0.6 ? 0.03 : 0) }),
    cam: () => [[S0.light, 560, 900, 0.1], [EV.lt_on, 560, 960, 0.04], [EV.lt_blink, 540, 1000, 0.08], [EV.lt_name, 520, 1040, 0.12], [S1.light, 520, 1060, 0.16]],
    hud: t => { if (t > EV.lt_name) note('«хулиганский огонь»', 640, 600, t, EV.lt_name, S1.light, '#fff2d8', 56, -0.03); if (t > EV.lt_on + 0.3 && t < EV.lt_blink) note('Edison Co., 1887', 760, 1700, t, EV.lt_on + 0.3, EV.lt_blink + 0.2, '#e8f0ff', 44, -0.02);
      if (t > EV.lt_blink) { const off = power(t, 0) < 0.2; if (off) scr(() => { ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); } }
  };

  // ---------------------------------------------------------------- переход В light: задутая свеча → темнота → вспышка дуги
  TRANS_IN.light = { a: 0.35, b: 0.3, fx(k, t, A, B) {
    if (k < 0.55) { drawBuf(A); scr(() => { const dk = sm(k / 0.55); ctx.save(); ctx.globalAlpha = dk; ctx.fillStyle = '#07060a'; ctx.fillRect(0, 0, W, H); ctx.restore();
      const cx = 540, cy = 1000, f = 1 - sm((k - 0.3) / 0.2); rect(cx - 30, cy, 60, 220, { wash: '#f2e6c4', washA: 1, w: 2, col: '#4a3a1a' });
      if (f > 0) { glow(cx, cy - 60, 260, 'rgba(255,190,90,1)', 0.8 * f); blob([[cx - 22, cy - 10], [cx - 10, cy - 80], [cx, cy - 130 * f], [cx + 12, cy - 80], [cx + 22, cy - 10]], { wash: '#ffb040', washA: f, w: 1.4, col: '#8a3a08', a: f }); }
      else for (let q = 0; q < 4; q++) { const ph = (k - 0.5) * 6 + q * 0.2; pencil(spline([[cx, cy - 10], [cx + Math.sin(ph * 3) * 30, cy - 100 - q * 40], [cx - Math.sin(ph * 2) * 40, cy - 220 - q * 50]], false, 8), { w: 4, col: '#c8c4cc', a: 0.6, pass2: false }); } }); }
    else { drawBuf(B); scr(() => { const f = 1 - sm((k - 0.55) / 0.45); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.7 * f; ctx.fillStyle = '#d8e8ff'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); }
  } };
})();
