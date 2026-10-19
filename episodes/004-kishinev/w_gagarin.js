/* 004 — сцена `gagarin`: 1966, дегустационный зал в галереях Криковы (по легенде). Длинный дубовый стол, канделябры, бутылки и бокалы,
   на стене плакат «Слава покорителям космоса!» с ракетой, табличка «ЛЕГЕНДА». Том — в скафандре с колпаком, с бокалом.
   «спустился сюда» — стрелка «↓ 80 м»; «через два дня» — часы крутятся, счётчик «48 ч», пустые бутылки множатся; «Космос был проще!» — Том икает.
   Переход В сцену: хлопок пробки — пена заливает кадр и стекает. */
(() => {
  EV.gg_name = WT('s10', 'Гагарин');             // плакат
  EV.gg_down = WT('s10', 'сюда');                // стрелка вниз
  EV.gg_days = WT('s10', 'два');                 // часы, 48 ч
  EV.gg_hic = WT('s10', 'Космос') + 0.35;        // ик
  KEYW.push('Говорят,', 'Гагарин', 'дня.', 'проще!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function hall(t) {                              // сводчатый зал: известняк, кирпичные арки, люстры
    vgrad(-300, 2200, ['#3a2a1c', '#a8845a', '#5a4430']);
    for (let k = 0; k < 4; k++) { const x0 = -200 + k * 480; const P = []; for (let a = 0; a <= 16; a++) { const q = Math.PI + a / 16 * Math.PI; P.push([x0 + Math.cos(q) * 240, 700 + Math.sin(q) * 420]); }
      pencil(P, { w: 30, col: '#8a4a30', pass2: false }); pencil(P, { w: 3, col: '#3a1a10', a: 0.7, pass2: false }); for (let q = 0; q < 16; q++) { const p = P[q]; pencil([[p[0], p[1]], [P[q + 1][0], P[q + 1][1]]], { w: 2, col: '#5a2a18', a: 0.5, pass2: false }); }
      pencil([[x0 - 240, 700], [x0 - 240, 1300]], { w: 30, col: '#8a4a30', pass2: false }); }
    for (let i = 0; i < 40; i++) { const r = rng(1500 + i); ell(-200 + r() * 1500, 200 + r() * 900, 30, 14, { wash: '#c8a878', washA: 0.25, line: false }); }
    for (const cx of [300, 800]) { pencil([[cx, -100], [cx, 330]], { w: 3, col: '#2a1a0a', pass2: false }); pencil(spline([[cx - 140, 380], [cx, 420], [cx + 140, 380]], false, 6), { w: 6, col: '#c8a040', pass2: false }); pencil([[cx - 140, 380], [cx, 330], [cx + 140, 380]], { w: 3, col: '#c8a040', pass2: false });
      for (let q = -2; q <= 2; q++) { const lx = cx + q * 70, ly = 386 + Math.abs(q) * -6; rect(lx - 5, ly - 30, 10, 30, { wash: '#f6efe0', washA: 1, w: 1, col: '#5a4a30' }); const fl = flick(t, q + cx); blob([[lx - 6, ly - 30], [lx, ly - 30 - 22 * fl], [lx + 6, ly - 30]], { wash: '#ffd060', washA: 1, line: false }); glow(lx, ly - 40, 70, 'rgba(255,210,130,1)', 0.6); } }
  }
  function poster(t) {                            // плакат «Слава покорителям космоса!» с ракетой и звёздами
    const k = t > EV.gg_name - 0.1 ? popK(t, EV.gg_name, 0.4) : 0.0; push(820, 760, 0.6 + 0.4 * k, 0.03);
    rect(-190, -260, 380, 480, { wash: '#c8302a', washA: 1, w: 3, col: '#2a0a08' }); for (let i = 0; i < 18; i++) { const r = rng(1510 + i); ell(-170 + r() * 340, -240 + r() * 200, 3, 3, { wash: '#fff6c8', washA: 1, line: false }); }
    push(-20, 60, 1, 0.5); const rk = blob([[0, -170], [26, -110], [30, 60], [0, 80], [-30, 60], [-26, -110]], { wash: '#f2ece0', washA: 1, w: 2.4, col: '#1a1a1a' }); poly([[-30, 40], [-60, 90], [-26, 70]], { wash: '#c8302a', washA: 1, w: 1.8, col: '#1a1a1a' }); poly([[30, 40], [60, 90], [26, 70]], { wash: '#c8302a', washA: 1, w: 1.8, col: '#1a1a1a' }); txt('СССР', 0, -40, 22, { font: 'Osw', col: '#c8302a', rot: -Math.PI / 2 });
    for (let q = 0; q < 6; q++) { const ph = (t * 2 + q / 6) % 1; glow(0, 90 + ph * 120, 30 * (1 - ph) + 10, 'rgba(255,200,90,1)', 0.8 * (1 - ph)); } pop();
    txt('СЛАВА', 0, 150, 46, { font: 'Osw', col: '#f6ecd6' }); txt('ПОКОРИТЕЛЯМ КОСМОСА!', 0, 196, 30, { font: 'Osw', col: '#f6ecd6' });
    pop();
  }
  function table(t) {                             // стол с бутылками и бокалами; к «двум дням» бутылок всё больше
    const L = '#1a0e06', days = sm(fade(t, EV.gg_days - 0.2, EV.gg_days + 0.8));
    rect(-200, 1330, 1500, 40, { wash: '#6a3a1e', washA: 1, w: 2.6, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 0.1 } }); for (const lx of [-100, 400, 1100]) rect(lx - 14, 1370, 28, 200, { wash: '#5a3018', washA: 1, w: 2, col: L });
    poly([[-200, 1330], [1300, 1330], [1260, 1300], [-160, 1300]], { wash: '#efe6d2', washA: 0.9, w: 1.6, col: L });
    const N = 6 + Math.floor(days * 16);
    for (let i = 0; i < N; i++) { const r = rng(1520 + i), x = 60 + (i * 83) % 1000 + r() * 20, empty = i >= 6; bottle(x, 1310, 0.62, empty ? (r() - 0.5) * 0.3 : 0, empty ? '#5a6a4a' : (i % 2 ? '#2a3a1e' : '#3a1418'), empty ? undefined : (i % 2 ? 'Крикова' : 'Негру')); }
    for (let i = 0; i < 5; i++) { const x = 120 + i * 200; push(x, 1312, 0.7); blob([[-22, -70], [22, -70], [16, -30], [0, -22], [-16, -30]], { wash: '#e8f0f0', washA: 0.35, w: 1.6, col: '#3a3a3a' }); ell(0, -40, 14, 8, { wash: '#8a1a2a', washA: 0.8, line: false }); pencil([[0, -22], [0, 0]], { w: 2, col: '#3a3a3a', pass2: false }); ell(0, 0, 14, 4, { wash: '#e8f0f0', washA: 0.4, w: 1.2, col: '#3a3a3a' }); pop(); }
    // сыр, виноград, хлеб
    push(820, 1300, 0.8); blob([[-60, 0], [-40, -40], [60, -30], [70, 0]], { wash: '#f0d070', washA: 1, w: 1.8, col: L }); for (let q = 0; q < 12; q++) ell(100 + (q % 4) * 14, -16 - Math.floor(q / 4) * 12, 8, 8, { wash: '#5a1a3a', washA: 1, w: 1, col: '#1a0a14' }); pop();
  }
  function clock(t) {                             // настенные часы: стрелки сходят с ума, счётчик часов
    const sp = t > EV.gg_days - 0.3 ? (t - EV.gg_days + 0.3) * 40 : 0; push(250, 640, 0.9);
    ell(0, 0, 110, 110, { wash: '#efe6d2', washA: 1, w: 4, col: '#3a2a10' }); pencil(ellPts(0, 0, 96, 96, 0, 0.05, 50), { w: 2, col: '#5a4a30', a: 0.6, pass2: false });
    for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; pencil([[Math.cos(a) * 82, Math.sin(a) * 82], [Math.cos(a) * 94, Math.sin(a) * 94]], { w: 3, col: '#3a2a10', pass2: false }); }
    const ah = -Math.PI / 2 + sp * 0.083 + 1, am = -Math.PI / 2 + sp + 2; pencil([[0, 0], [Math.cos(ah) * 52, Math.sin(ah) * 52]], { w: 8, col: '#1a1a1a', pass2: false }); pencil([[0, 0], [Math.cos(am) * 80, Math.sin(am) * 80]], { w: 5, col: '#1a1a1a', pass2: false }); ell(0, 0, 8, 8, { wash: '#c8a040', washA: 1, w: 1.4 });
    pop();
  }

  WORLD.gagarin = (t, u, cat) => {
    lay(6, () => { hall(t); poster(t); clock(t); haze('#3a2414', 0.08); });
    lay(2, () => { table(t); });
    lay(1, () => { cat(); });
    lay(0.6, () => { barrel(-40, 1820, 1.5, {}); barrel(1100, 1860, 1.6, { label: '1966' }); bottle(960, 2000, 2.4, 0.15, '#3a1418', 'КРИКОВА'); });
    motes(30, [0, 200, W, 1700], '#ffd8a0', t, 87, { sp: -8, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };

  DIR.gagarin = {
    outfit: 'astro', light: { side: 1, rim: '#ffd8a0' }, grade: ['#7a4a2a', 0.16],
    act: () => [[S0.gagarin, 'suspicious'], [EV.gg_name, 'awe'], [EV.gg_down, 'smug'], [EV.gg_days, 'shock'], [WT('s10', 'Космос'), 'sideeye'], [EV.gg_hic, 'grin']],
    pose: (t, u, b) => {
      const o = { x: 560, y: GY + 70, s: 1.0, look: [0.3, -0.1], prop: 'goblet', hand: [100, -320] };
      if (t > EV.gg_name && t < EV.gg_down) { o.look = [0.8, -0.5]; o.handF = [-60, -300]; }
      if (t > EV.gg_down && t < EV.gg_days) { o.handF = [-140, -150]; o.point = 1; o.look = [-0.3, 0.6]; }
      if (t > EV.gg_days) { o.look = [0, 0.05]; }
      if (t > EV.gg_hic) { const h = Math.max(0, Math.sin((t - EV.gg_hic) * 6)); o.y -= 18 * h * Math.exp(-(t - EV.gg_hic) * 2); o.tilt = 0.1 * Math.sin(t * 3); o.rot = 0.04 * Math.sin(t * 2.4); }
      return Object.assign(b, o);
    },
    cam: () => [[S0.gagarin, 560, 1080, 0.06], [EV.gg_name, 680, 980, 0.08], [EV.gg_down, 560, 1080, 0.1], [EV.gg_days, 520, 1060, 0.04], [WT('s10', 'Космос'), 560, 1120, 0.18, 'x'], [S1.gagarin, 560, 1120, 0.2]],
    hud: t => {
      if (t > S0.gagarin + 0.2) { const k = popK(t, S0.gagarin + 0.2, 0.35); push(230, 480, k, -0.08); ctx.save(); ctx.fillStyle = 'rgba(20,12,8,0.85)'; ctx.fillRect(-150, -40, 300, 80); ctx.restore(); pencil([[-150, -40], [150, -40], [150, 40], [-150, 40], [-150, -40]], { w: 3, col: K.amber, pass2: false }); txt('ЛЕГЕНДА', 0, 4, 48, { font: 'Osw', col: K.amber }); pop(); }
      if (t > EV.gg_down && t < EV.gg_days + 0.2) note('↓ до 80 м под землёй', 760, 1780, t, EV.gg_down, EV.gg_days + 0.2, '#fff0d8', 46, -0.03);
      if (t > EV.gg_days) { const h = Math.min(48, Math.floor(48 * sm(fade(t, EV.gg_days, EV.gg_days + 0.7)))), k = popK(t, EV.gg_days, 0.3); push(800, 470, k, 0.05); ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        ctx.font = '600 140px Osw'; ctx.lineWidth = 20; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText(h + ' ч', 0, 0); ctx.fillStyle = '#f6ecd6'; ctx.fillText(h + ' ч', 0, 0); ctx.restore(); pop(); }
      if (t > EV.gg_hic) note('ик!', 330, 820, t, EV.gg_hic, S1.gagarin + 0.2, '#fff6dc', 70, 0.08);
    }
  };

  // ---------------------------------------------------------------- переход В сцену: хлопок пробки — пена заливает кадр и стекает
  TRANS_IN.gagarin = { a: 0.25, b: 0.45, runA: 1, fx(k, t, A, B) {
    const q = sm(k), rise = Math.sin(Math.PI * clamp(k * 1.05));
    if (k < 0.5) drawBuf(A); else drawBuf(B, 1.05 - 0.05 * sm((k - 0.5) / 0.5));
    scr(() => {
      if (k < 0.2) { const a = k / 0.2; push(540, 1200 - a * 900, 1 + a * 2, a * 12); rect(-20, -30, 40, 60, { wash: '#c8a070', washA: 1, w: 2, col: '#3a2a10' }); pop(); }
      const L = H - rise * H * 1.25; const P = []; for (let x = -20; x <= W + 20; x += 30) P.push([x, L + Math.sin(x * 0.03 + t * 6) * 30]);
      const fp = pathOf([...P, [W + 20, H + 50], [-20, H + 50]]); ctx.save(); ctx.fillStyle = '#fbf6ea'; ctx.fill(fp); ctx.clip(fp);
      for (let i = 0; i < 80; i++) { const r = rng(i + 7), x = r() * W, y = L + r() * H * 1.3; ctx.strokeStyle = 'rgba(200,184,150,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6 + r() * 26, 0, 6.3); ctx.stroke(); } ctx.restore();
      pencil(P, { w: 5, col: '#c8b896', a: 0.8, pass2: false, gap: false });
    });
  } };
})();
