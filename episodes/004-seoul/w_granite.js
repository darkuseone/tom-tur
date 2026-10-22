/* 004 — сцена `granite`: −170 млн лет, разрез. Наверху юрский берег: хвощи, саговники, араукарии, бредёт зауропод, летит птерозавр.
   Под землёй — складчатый древний гнейс, в нём огромный купол магмы (будущий гранит Пугаксана). Том-шахтёр на уступе светит фонарём в магму.
   На «застывшая» магма остывает от краёв к центру в крапчатый гранит, в лупе — кварц, полевой шпат, слюда. На «динозаврах» зауропод топает
   прямо над головой — с потолка сыплется пыль. Пунктиром — силуэт будущей горы и дворца. Переход В сцену — провал в раскалённую магму. */
(() => {
  EV.gr_cool = wtk('s1', 'застывшая');
  EV.gr_dino = wtk('s1', 'динозаврах!');
  SHAKES.push([EV.gr_dino + 0.05, 0.4, 12]);
  KEYW.push('магма,', 'динозаврах!');
  const GY0 = 640;                                                   // поверхность юрской земли
  const cool = t => sm((t - EV.gr_cool) / 1.1);

  function jurassic(t) {
    vgrad(-900, GY0, ['#2a5a6a', '#5a8a8a', '#e8b878', '#f0905a'], 1);
    glow(860, 420, 300, 'rgba(255,220,150,1)', 0.6); ell(860, 420, 70, 70, { wash: '#fff0c8', washA: 0.9, line: false });
    sil([[-400, GY0], [-200, 470], [60, 500], [300, 430], [560, 520], [800, 450], [1100, 490], [1480, 430], [1480, GY0]], '#4a6a5a', 0.7);
    for (const [x, h, sd] of [[-60, 330, 1], [140, 260, 2], [1000, 360, 3], [1180, 300, 4]]) { pencil([[x, GY0], [x + 6, GY0 - h]], { w: 7, col: '#3a2a1a' }); for (let k = 0; k < 6; k++) { const y = GY0 - h + k * 18, w = 50 - k * 4; pencil(spline([[x - w, y + 20], [x, y], [x + w, y + 20]], false, 6), { w: 4, col: '#2a4a2a', pass2: false }); } }
    for (const [x, s] of [[300, 1], [760, 0.8], [880, 1.1]]) { pencil([[x, GY0], [x, GY0 - 60 * s]], { w: 14 * s, col: '#6a4a2a' }); for (let k = 0; k < 9; k++) { const a = -Math.PI + k / 8 * Math.PI; pencil(spline([[x, GY0 - 60 * s], [x + Math.cos(a) * 60 * s, GY0 - 60 * s + Math.sin(a) * 50 * s - 10], [x + Math.cos(a) * 100 * s, GY0 - 40 * s + Math.sin(a) * 40 * s]], false, 6), { w: 5, col: '#3a6a2a', pass2: false }); } }
    for (let k = 0; k < 14; k++) { const x = -100 + k * 95, h = 40 + (k * 37 % 50); for (let q = -2; q <= 2; q++) pencil([[x, GY0], [x + q * 10 + Math.sin(t * 2 + k) * 3, GY0 - h + Math.abs(q) * 8]], { w: 3, col: q % 2 ? '#4a7a3a' : '#5a8a3a', pass2: false }); }
    sauropod(t); ptero(t);
  }
  function sauropod(t) {                                              // зауропод бредёт слева направо, на «динозаврах» опускает ногу над Томом
    const x = lerp(-120, 520, sm((t - S0.granite) / (EV.gr_dino - S0.granite + 0.2))), y = GY0, step = Math.sin(t * 4);
    push(x, y, 0.72); const c = '#5a6a5a', cD = '#2a3428';
    for (const [lx, ph] of [[-70, 0], [80, 1.6], [-40, 3.1], [110, 4.7]]) { const sw = Math.sin(t * 4 + ph) * 16; shape(tubeP([[lx, -170], [lx + sw * 0.5, -90], [lx + sw, -4]], 40, 34), { wash: ph > 2 ? cD : c, washA: 1, w: 2, col: '#141a12' }); }
    const b = blob([[-150, -150], [-120, -230], [0, -260], [120, -230], [160, -160], [100, -120], [-100, -120]], { wash: c, washA: 1, w: 2.4, col: '#141a12' }); shadeG(b.path, 0, -120, 0, -260, cD, 0.5);
    const N = spline([[120, -220], [210, -330], [270, -470], [300, -520 + step * 4]], false, 10); shape(tubeP(N, 50, 20), { wash: c, washA: 1, w: 2.2, col: '#141a12' });
    blob([[280, -540], [330, -548], [348, -526], [300, -510]], { wash: c, washA: 1, w: 2, col: '#141a12' }); ell(318, -534, 3.5, 3.5, { wash: '#000', washA: 1, line: false });
    const T = spline([[-140, -180], [-260, -170], [-360, -130], [-430, -110]], false, 10); shape(tubeP(T, 46, 6), { wash: c, washA: 1, w: 2, col: '#141a12' });
    for (let k = 0; k < 8; k++) pencil([[-100 + k * 28, -236], [-96 + k * 28, -150]], { w: 2, col: cD, a: 0.35, pass2: false });
    pop();
  }
  function ptero(t) { const x = 1300 - ((t - S0.granite) * 260), y = 160 + Math.sin(t * 2) * 30, fl = Math.sin(t * 9) * 30;
    pencil([[x - 90, y + fl], [x - 30, y - 10], [x, y], [x + 30, y - 10], [x + 90, y + fl]], { w: 6, col: '#2a2228' }); ell(x, y + 4, 16, 8, { wash: '#2a2228', washA: 1, line: false }); pencil([[x - 14, y], [x - 50, y - 8]], { w: 5, col: '#2a2228', pass2: false }); }

  function gneiss(t) {                                                // древний гнейс: складки полосами
    const C = ['#7a6a6a', '#a4928a', '#5e5254', '#c2ae9e', '#8a7a7c', '#6a5a5a'];
    for (let i = 0; i < 16; i++) { const y0 = GY0 + 40 + i * 100, P = [[-400, y0]]; for (let x = -400; x <= 1500; x += 50) P.push([x, y0 + Math.sin(x * 0.007 + i * 0.6) * 60 + Math.sin(x * 0.019 + i) * 14]); P.push([1500, y0 + 160], [-400, y0 + 160]);
      const p = shape(P, { wash: C[i % C.length], washA: 1, w: 1.8, col: '#2a2020', a: 0.5, key: 9300 + i }); hatch(p.path, p.bb, { gap: 7, a: 0.12, col: '#1a1414', ang: 0.3 + (i % 3) * 0.4, key: 9320 + i, w: 1.1 }); }
    shape([[-400, GY0 - 10], [1500, GY0 - 10], [1500, GY0 + 50], [-400, GY0 + 50]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a0a', a: 0.6 });
    const r = rng(9340); for (let k = 0; k < 40; k++) ell(-300 + r() * 1700, GY0 + 5 + r() * 40, 4 + r() * 8, 3 + r() * 5, { wash: '#9a8060', washA: 0.8, line: false });
  }
  function pluton(t) {                                                // купол магмы → гранит
    const cx = 720, top = 780, P = []; for (let q = 0; q <= 40; q++) { const a = Math.PI + q / 40 * Math.PI; P.push([cx + Math.cos(a) * 440 + Math.sin(q * 1.7) * 14, top + 460 + Math.sin(a) * 460 + Math.cos(q * 2.3) * 12]); } P.push([cx + 520, 2200], [cx - 520, 2200]);
    const pp = shape(P, { wash: '#d8501a', washA: 1, w: 3, col: '#2a0a04', a: 0.8, key: 9350 });
    const k = cool(t);
    ctx.save(); ctx.clip(pp.path);
    const g = ctx.createRadialGradient(cx, top + 600, 50, cx, top + 600, 700); g.addColorStop(0, '#fff2a0'); g.addColorStop(0.35, '#ffb040'); g.addColorStop(0.75, '#e0501a'); g.addColorStop(1, '#8a1a0a'); ctx.fillStyle = g; ctx.fillRect(-200, top - 50, 1800, 1700);
    for (let i = 0; i < 9; i++) { const ph = t * 0.6 + i; pencil(spline([[cx - 500 + i * 120, top + 1300], [cx - 460 + i * 120 + Math.sin(ph) * 60, top + 800], [cx - 420 + i * 120 + Math.cos(ph) * 80, top + 300]], false, 8), { w: 6, col: '#fff0a0', a: 0.3, pass2: false }); }
    // остывание: гранит наступает от краёв (кольцо растёт внутрь)
    if (k > 0) { const R = 700 * (1 - k); ctx.beginPath(); ctx.rect(-400, top - 100, 2000, 1800); ctx.arc(cx, top + 640, Math.max(1, R), 0, 6.283, true); ctx.save(); ctx.clip('evenodd');
      ctx.fillStyle = '#bdb4ac'; ctx.fillRect(-400, top - 100, 2000, 1800); const r = rng(9351);
      for (let n = 0; n < 2200; n++) { const x = cx - 560 + r() * 1120, y = top - 20 + r() * 1300, c = r(); ctx.fillStyle = c < 0.18 ? '#26242a' : c < 0.42 ? '#d8aaa0' : c < 0.7 ? '#8e8c96' : '#e8e4de'; ctx.globalAlpha = 0.85; ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3); ctx.fillRect(-2, -2, 3 + r() * 6, 2 + r() * 4); ctx.restore(); } ctx.globalAlpha = 1;
      ctx.restore(); if (R > 6) { pencil(ellPts(cx, top + 640, R, R, 0, 0, 60), { w: 10, col: '#ff7a2a', a: 0.6, pass2: false }); glow(cx, top + 640, R + 60, 'rgba(255,140,60,1)', 0.25); } }
    ctx.restore();
    if (k < 0.8) glow(cx, top + 500, 600, 'rgba(255,120,40,1)', 0.4 * (1 - k));
    for (let i = 0; i < 6; i++) { const ph = ((t * 0.7 + i / 6) % 1); if (k < 0.7) ell(cx - 300 + i * 110, top + 900 - ph * 500, 10 + ph * 8, 10 + ph * 8, { wash: '#fff6c0', washA: 0.6 * (1 - ph) * (1 - k), line: false }); }
  }
  function ledge(t) {                                                 // гнейсовый уступ, на котором стоит Том; крепь и фонарь
    const lp = shape([[-400, 1450], [520, 1440], [600, 1470], [640, 1560], [560, 1700], [-400, 1760]], { wash: '#5e5052', washA: 1, w: 3, col: '#1a1212', key: 9360 });
    hatch(lp.path, lp.bb, { gap: 6, a: 0.2, col: '#1a1212', ang: 0.4, key: 9361, w: 1.2 });
    for (let k = 0; k < 5; k++) pencil([[-300 + k * 140, 1460 + k * 4], [-240 + k * 140, 1600]], { w: 2, col: '#8a7a7a', a: 0.5, pass2: false });
    // деревянная крепь и ящик с инструментом слева
    for (const x of [40, 230]) { rect(x - 10, 1080, 20, 370, { wash: '#7a5a34', washA: 1, w: 2, col: '#2a1a0a' }); } rect(20, 1070, 230, 22, { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a0a' });
    pencil([[135, 1092], [135, 1150]], { w: 2, col: '#2a2a2a', pass2: false }); ell(135, 1162, 12, 14, { wash: '#fff2b8', washA: 1, w: 1.6, col: '#3a2a1a' }); glow(135, 1162, 160, 'rgba(255,220,140,1)', 0.45 * flick(t, 3));
    rect(-20, 1380, 140, 70, { wash: '#8a6a3a', washA: 1, w: 2, col: '#2a1a0a' }); pencil([[60, 1380], [120, 1300]], { w: 6, col: '#6a4a2a' }); poly([[110, 1290], [150, 1300], [130, 1320]], { wash: '#8a8a90', washA: 1, w: 1.6 });
    // пыль с потолка после топота
    if (t > EV.gr_dino) motes(40, [200, GY0 + 40, 900, 1460], '#c8b8a0', t - EV.gr_dino, 9362, { sp: 420, sz: 4, a: 0.7 * clamp(1 - (t - EV.gr_dino) / 1.6), wob: 6 });
  }
  function future(t) {                                                // пунктир будущей горы и дворца + подпись
    const a = clamp((t - EV.gr_cool) / 0.5) * 0.85;
    if (a <= 0) return; const P = spline([[260, GY0], [420, 560], [560, 420], [700, 360], [840, 420], [980, 560], [1140, GY0]], false, 8);
    for (let i = 0; i < P.length - 1; i += 2) pencil([P[i], P[i + 1]], { w: 4, col: '#fff6e0', a, pass2: false });
    for (const [x, w] of [[700, 160]]) { const R = [[x - w, GY0 - 10], [x - w * 0.8, GY0 - 60], [x + w * 0.8, GY0 - 60], [x + w, GY0 - 10]]; for (let i = 0; i < 3; i++) pencil([R[i], R[i + 1]], { w: 3, col: '#fff6e0', a: a * 0.9, pass2: false }); }
  }

  WORLD.granite = (t, u, cat) => {
    lay(12, () => jurassic(t));
    lay(1.5, () => { gneiss(t); pluton(t); future(t); });
    lay(1, () => { ledge(t); cat(); });
    lay(0.7, () => { const r = rng(9370); for (let i = 0; i < 6; i++) { const x = r() * 1080, y = 1700 + r() * 300; ell(x, y, 120, 50, { wash: '#2a2022', washA: 0.95, w: 2, col: '#000' }); } });
  };
  DIR.granite = {
    outfit: 'miner', light: { side: 1, rim: '#ffb070' }, grade: ['#a8501a', 0.12],
    act: () => [[S0.granite, 'awe'], [EV.gr_cool - 0.05, 'talk'], [EV.gr_cool + 0.3, 'smug'], [EV.gr_dino - 0.03, 'shock'], [EV.gr_dino + 0.6, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1450, s: 1.08, look: t > EV.gr_dino ? [0.1, -0.9] : [0.7, 0.1], point: t < EV.gr_dino ? 1 : undefined,
      hand: t < EV.gr_dino ? [150, -240] : [90, -360], handF: t > EV.gr_dino ? [-80, -380] : undefined, tilt: t > EV.gr_dino ? -0.08 : 0, tailUp: t > EV.gr_dino, sweat: t > EV.gr_dino ? 1 : 0 }),
    cam: () => [[S0.granite, 660, 1320, 0.32], [S0.granite + 0.6, 600, 1220, 0.18, 'x'], [EV.gr_cool + 0.4, 560, 1120, 0.08], [EV.gr_dino - 0.2, 520, 900, 0.03], [S1.granite, 520, 940, 0.06]],
    hud: t => { if (t > EV.gr_cool + 0.5) { const k = popK(t, EV.gr_cool + 0.5, 0.35); const x = 850, y = 1260, R = 130 * k;
        if (R > 2) { scr(() => { inCircle(x, y, R, () => { ctx.fillStyle = '#e4dcd2'; ctx.fillRect(x - R, y - R, 2 * R, 2 * R); const r = rng(9380); for (let n = 0; n < 60; n++) { const c = r(), px = x - R + r() * 2 * R, py = y - R + r() * 2 * R; ctx.fillStyle = c < 0.25 ? '#141418' : c < 0.55 ? '#ec9c8a' : c < 0.75 ? '#a0a2ac' : '#ffffff'; ctx.save(); ctx.translate(px, py); ctx.rotate(r() * 3); ctx.fillRect(-14, -9, 20 + r() * 26, 16 + r() * 10); ctx.restore(); } });
          pencil(ellPts(x, y, R, R, 0, 0, 48), { w: 9, col: '#3a2a1a', pass2: false }); pencil([[x + R * 0.7, y + R * 0.7], [x + R * 1.25, y + R * 1.25]], { w: 16, col: '#3a2a1a', pass2: false }); }); }
        note('гранит', x, y - 170, t, EV.gr_cool + 0.6, S1.granite, '#fff2d8', 48, -0.03); }
      if (t > EV.gr_cool + 0.2) note('будущий Пугаксан', 760, 470, t, EV.gr_cool + 0.2, S1.granite, '#fff6e0', 44, 0.02); }
  };

  // ---------------------------------------------------------------- переход В granite: провал в раскалённую магму
  TRANS_IN.granite = { a: 0.15, b: 0.45, fx(k, t, A, B) {
    const q = sm(k);
    if (k < 0.35) { drawBuf(A, 1 + k * 3, 540, 960); scr(() => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.6 * k / 0.35; ctx.fillStyle = '#ff5a1a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); }
    else { drawBuf(B, 1.7 - 0.7 * q, 640, 1100); scr(() => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.6 * (1 - sm((k - 0.35) / 0.65)); ctx.fillStyle = '#ff5a1a'; ctx.fillRect(0, 0, W, H); ctx.restore();
      const r = rng(hsh(FRAME, 31)); for (let i = 0; i < 30; i++) ell(r() * W, H - ((k - 0.35) * 2600 * (0.5 + r())) % H, 8 + r() * 20, 8 + r() * 20, { wash: '#fff2a0', washA: 0.7 * (1 - k), line: false }); }); }
  } };
})();
