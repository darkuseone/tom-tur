/* 004 — сцена `cathedral`: январь 1911, Верный. Зима, рассвет. Вознесенский собор Зенкова — деревянный, 54 м с крестом.
   На «пятьдесят четыре метра» вдоль колокольни растёт мерная рейка «54 м». На «десять баллов» — землетрясение: кирпичные дома вокруг
   трескаются и осыпаются, пыль; собор раскачивается как пружина и стоит. Сейсмограф-лента «10 БАЛЛОВ». Том — инженер-архитектор с чертежом.
   Переход В сцену: по кадру бежит разлом, половины разъезжаются и открывают новую эпоху. */
(() => {
  EV.ct_54 = wtw('s5', 'пятьдесят');
  EV.ct_quake = wtw('s5', 'Пережил');
  EV.ct_10 = wtw('s5', 'десять');
  KEYW.push('метра.', 'баллов!');
  SHAKES.push([EV.ct_quake, 0.9, 22], [EV.ct_10 + 0.2, 0.5, 12]);

  const qk = t => t > EV.ct_quake && t < EV.ct_quake + 1.4 ? Math.sin((t - EV.ct_quake) * 18) * Math.exp(-(t - EV.ct_quake) * 2.2) : 0;
  function onion(x, y, w, h, col, colD, gold) {                         // луковичная глава с крестом
    const p = blob([[x - w * 0.5, y], [x - w * 0.62, y - h * 0.45], [x - w * 0.3, y - h * 0.85], [x, y - h], [x + w * 0.3, y - h * 0.85], [x + w * 0.62, y - h * 0.45], [x + w * 0.5, y]], { wash: col, washA: 1, w: 2, col: '#2a1a10' });
    metalG(p.path, x - w * 0.2, y - h * 0.6, w * 0.8, gold ? '#fff0a8' : lerpC(col, '#ffffff', 0.5), col, colD);
    pencil([[x, y - h], [x, y - h - 40]], { w: 3, col: '#d6a842', pass2: false }); pencil([[x - 12, y - h - 28], [x + 12, y - h - 28]], { w: 3, col: '#d6a842', pass2: false }); pencil([[x - 8, y - h - 14], [x + 8, y - h - 20]], { w: 2, col: '#d6a842', pass2: false });
  }
  function cathedral(t) {                                               // собор: основной объём, барабаны, колокольня-шатёр
    const sway = qk(t) * 0.035; push(560, 1330, 1, sway);
    const wallC = '#f2e2b0', trim = '#ffffff', roofC = '#3a7a6a', L = '#3a2a1a';
    const body = rect(-300, -320, 600, 320, { wash: wallC, washA: 1, w: 2.4, col: L, key: 9501 });
    for (let yy = -310; yy < 0; yy += 16) pencil([[-300, yy], [300, yy]], { w: 1, col: '#c8a870', a: 0.5, pass2: false });   // доски обшивки
    shadeG(body.path, 300, 0, 0, 0, '#a8885a', 0.4);
    for (const xx of [-240, -120, 80, 200]) { blob([[xx, -60], [xx, -220], [xx + 20, -250], [xx + 40, -220], [xx + 40, -60]], { wash: '#2a3a5a', washA: 1, w: 2, col: L }); pencil([[xx - 6, -256], [xx + 20, -284], [xx + 46, -256]], { w: 4, col: trim, pass2: false }); }
    blob([[-50, 0], [-50, -180], [0, -230], [50, -180], [50, 0]], { wash: '#6a3a1a', washA: 1, w: 2.2, col: L }); pencil([[0, -230], [0, 0]], { w: 2, col: '#3a1a0a', pass2: false });
    poly([[-320, -320], [0, -420], [320, -320]], { wash: roofC, washA: 1, w: 2.4, col: L });
    for (const [dx, dy, s] of [[-210, -330, 0.6], [210, -330, 0.6], [0, -420, 1]]) { rect(dx - 50 * s, dy - 120 * s, 100 * s, 120 * s, { wash: wallC, washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) blob([[dx - 30 * s + q * 22 * s, dy - 20 * s], [dx - 30 * s + q * 22 * s, dy - 90 * s], [dx - 20 * s + q * 22 * s, dy - 100 * s], [dx - 10 * s + q * 22 * s, dy - 90 * s], [dx - 10 * s + q * 22 * s, dy - 20 * s]], { wash: '#2a3a5a', washA: 1, w: 1.4, col: L });
      onion(dx, dy - 120 * s, 120 * s, 150 * s, dx === 0 ? '#d6a842' : '#3a8a7a', dx === 0 ? '#8a5a10' : '#1a4a3a', dx === 0); }
    pop();
    // колокольня (отдельно, ближе к камере) — качается сильнее
    const sw2 = qk(t) * 0.05; push(860, 1330, 1, sw2);
    rect(-90, -440, 180, 440, { wash: wallC, washA: 1, w: 2.4, col: L, key: 9502 }); for (let yy = -430; yy < 0; yy += 16) pencil([[-90, yy], [90, yy]], { w: 1, col: '#c8a870', a: 0.5, pass2: false });
    rect(-70, -620, 140, 180, { wash: wallC, washA: 1, w: 2.2, col: L }); for (const xx of [-50, 10]) blob([[xx, -460], [xx, -580], [xx + 20, -600], [xx + 40, -580], [xx + 40, -460]], { wash: '#1a1a2a', washA: 1, w: 1.6, col: L });
    const bell = Math.sin(t * 6) * (qk(t) ? 0.5 : 0.05); push(-30, -560, 1, bell); blob([[-14, 0], [-16, 40], [16, 40], [14, 0], [0, -6]], { wash: '#c89a3a', washA: 1, w: 1.6, col: '#5a3a08' }); pop();
    poly([[-80, -620], [0, -900], [80, -620]], { wash: roofC, washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#1a3a2a', ang: 0.5 } });
    onion(0, -890, 60, 80, '#d6a842', '#8a5a10', true);
    pop();
  }
  function rubble(t, x, base, w, h, seed) {                              // кирпичный дом → трещина → обвал
    const d = clamp((t - EV.ct_quake - 0.1 - (seed % 3) * 0.12) / 0.6), r = rng(seed);
    const top = base - h * (1 - d * 0.65);
    const p = rect(x, top, w, base - top, { wash: '#b0583a', washA: 1, w: 2.2, col: '#3a1a0a' });
    bricksL(x, top, w, base - top, seed); for (let q = 0; q < 2; q++) rect(x + 16 + q * (w / 2), top + 24, 28, 36, { wash: '#2a2a3a', washA: 1, w: 1.4, col: '#1a0a06' });
    if (d > 0) { pencil([[x + w * 0.4, top], [x + w * 0.5, top + (base - top) * 0.4], [x + w * 0.35, top + (base - top) * 0.7]], { w: 3, col: '#1a0a06', pass2: false });
      for (let i = 0; i < 10; i++) { const fx = x + r() * w, dt = d * 0.6, fy = top - 20 + dt * dt * 900 * r(); if (fy < base) rect(fx, fy, 16, 9, { wash: '#a8482a', washA: 1, w: 1, col: '#3a1a0a', rot: dt * 4 }); }
      glow(x + w / 2, base - 40, w * 0.9, 'rgba(200,180,160,1)', 0.6 * Math.sin(d * Math.PI), 'source-over'); }
    else poly([[x - 6, top], [x + w / 2, top - 40], [x + w + 6, top]], { wash: '#6a4a3a', washA: 1, w: 1.8, col: '#2a1a0a' });
  }
  function bricksL(x, y, w, h, seed) { for (let yy = y + 12; yy < y + h; yy += 12) { pencil([[x, yy], [x + w, yy]], { w: 1, col: '#6a2a14', a: 0.5, pass2: false }); } }
  function ruler(t) {                                                   // мерная рейка «54 м» вдоль колокольни
    if (t < EV.ct_54 - 0.1) return; const k = sm((t - EV.ct_54 + 0.1) / 0.6), x = 1000, y0 = 1330, y1 = 1330 - 940 * k;
    pencil([[x, y0], [x, y1]], { w: 12, col: '#f2d27a' }); for (let q = 0; q <= 18; q++) { const yy = y0 - q * 52; if (yy < y1) break; pencil([[x - 8, yy], [x + (q % 5 ? 10 : 22), yy]], { w: 2.4, col: '#3a2a10', pass2: false }); }
    if (k > 0.9) { push(x - 110, y1 + 60, popK(t, EV.ct_54 + 0.5, 0.35)); rect(-60, -34, 120, 68, { wash: '#1a120a', washA: 0.9, w: 2, col: '#f2d27a' }); txt('54 м', 0, 4, 48, { font: 'Osw', col: '#f6ecd6' }); pop(); }
  }
  function seismo(t) {                                                  // сейсмограф-лента (экран, внизу над субтитрами)
    if (t < EV.ct_quake - 0.05) return; const a = clamp((t - EV.ct_quake) / 0.2); ctx.save(); ctx.globalAlpha = a;
    rect(80, 1380, 920, 130, { wash: '#f4ecd8', washA: 0.95, w: 3, col: '#3a2a14' }); const pts = []; for (let x = 0; x <= 900; x += 6) { const tt = t - (900 - x) / 600; const e = tt > EV.ct_quake ? Math.exp(-(tt - EV.ct_quake) * 1.5) : 0; pts.push([90 + x, 1445 + Math.sin(tt * 60 + x) * 55 * e + Math.sin(x * 0.7) * 2]); }
    pencil(pts, { w: 2.4, col: '#2a1a10', pass2: false, gap: false });
    if (t > EV.ct_10) { push(800, 1410, popK(t, EV.ct_10, 0.3), -0.08); rect(-130, -36, 260, 72, { wash: '#c81e24', washA: 1, w: 2, col: '#5a0a0a' }); txt('10 БАЛЛОВ', 0, 4, 42, { font: 'Osw', col: '#fff4e0' }); pop(); }
    ctx.restore();
  }

  WORLD.cathedral = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1300, ['#4a5a8a', '#c890a0', '#f6d2a0']); glow(300, 1000, 300, 'rgba(255,210,150,1)', 0.5); });
    lay(18, () => { alatau(t, 1060, { s: 1.0, col: '#8a8ab0', colD: '#4a4a70', key: 9510 }); haze('#f0c8b0', 0.14); });
    lay(6, () => { for (const [x, w, h, s] of [[-200, 220, 200, 9520], [60, 160, 240, 9521], [1180, 180, 220, 9522]]) rubble(t, x, 1340, w, h, s); haze('#f4dcc0', 0.1); });
    lay(2.2, () => { const g = poly([[-400, 1330], [1500, 1330], [1500, 2400], [-400, 2400]], { wash: '#f2f0ec', washA: 1, w: 2, col: '#8a8aa0', key: 9530 }); hatch(g.path, g.bb, { gap: 12, a: 0.1, col: '#8a8aa0', ang: -0.2, key: 9531 }); cathedral(t); ruler(t);
      for (let k = 0; k < 8; k++) { const x = -150 + k * 200, y = 1330; pencil([[x, y], [x, y - 220]], { w: 5, col: '#3a2a1a' }); for (let q = 0; q < 6; q++) pencil([[x, y - 80 - q * 24], [x + (q % 2 ? 40 : -40), y - 110 - q * 24]], { w: 2, col: '#3a2a1a', pass2: false }); } });
    lay(1, () => { cat(); });
    lay(0.7, () => motes(40, [-100, 0, 1200, 1900], 'rgba(255,255,255,1)', t, 9540, { sp: 80, vx: 20, sz: 5, a: 0.7 }));
  };
  DIR.cathedral = {
    outfit: 'architect', light: { side: -1, rim: '#ffd8b0' }, grade: ['#c890a0', 0.1],
    act: () => [[S0.cathedral, 'proud'], [EV.ct_54, 'smug'], [EV.ct_quake, 'scared'], [EV.ct_10 + 0.15, 'shock'], [EV.ct_10 + 0.7, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1640, s: 0.95, look: [0.7, -0.5], prop: 'blueprint', tilt: qk(t) * 0.15, sweat: t > EV.ct_quake && t < EV.ct_10 + 0.6 ? 1 : 0, tailUp: t > EV.ct_quake, squash: b.squash }),
    cam: () => [[S0.cathedral, 600, 1020, -0.02], [EV.ct_54, 680, 960, -0.06], [EV.ct_quake, 560, 1060, 0.02], [S1.cathedral, 540, 1080, 0.06]],
    hud: t => scr(() => seismo(t))
  };
  // ---------------------------------------------------------------- переход В сцену: разлом земли раскрывает новую эпоху
  TRANS_IN.cathedral = { a: 0.25, b: 0.4, runA: 0.5, fx(k, t, A, B) {
    const crack = []; for (let y = -20; y <= H + 20; y += 60) crack.push([540 + Math.sin(y * 0.02) * 60 + ((y / 60) % 2 ? 30 : -30), y]);
    if (k < 0.35) { drawBuf(A, 1, 540, 960, 1, null, (rng(hsh(FRAME, 3))() - 0.5) * 20 * k / 0.35, 0); const n = Math.floor(crack.length * k / 0.35); scr(() => pencil(crack.slice(0, Math.max(2, n)), { w: 10, col: '#1a0e06', pass2: false, gap: false })); return; }
    const m = sm((k - 0.35) / 0.65), dx = m * 700; drawBuf(B);
    for (const sd of [-1, 1]) { const p = new Path2D(); if (sd < 0) { p.moveTo(-10, -20); crack.forEach(([x, y]) => p.lineTo(x, y)); p.lineTo(-10, H + 20); } else { p.moveTo(W + 10, -20); crack.forEach(([x, y]) => p.lineTo(x, y)); p.lineTo(W + 10, H + 20); } p.closePath();
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(sd * dx, 0); ctx.clip(p); drawBuf(A, 1, 540, 960, 1, null, sd * dx, 0); ctx.restore(); }
  } };
})();
