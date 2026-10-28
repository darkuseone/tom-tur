/* 013 — сцена `war`: 1941–1943. Серый город над Доном: дымы, остовы домов, на заднем плане — взорванный театр-«трактор» (руина,
   подводка к следующей эпохе). На «оккупации» поперёк кадра натягивается колючая проволока, по улице идёт патруль-силуэт без
   символики, на столбе — календарь «2 раза: XI.1941 · VII.1942–II.1943». На «Змиёвская» — мемориал: скорбные бронзовые фигуры,
   ступени, свечи, табличка «ЗМИЁВСКАЯ БАЛКА · 1942» и «≈ 27 000 убитых». Без натурализма. Том в гимнастёрке. Музыка приглушена.
   Переход В сцену — дым затягивает кадр и расходится. */
(() => {
  EV.wr_occ = wtk('s1', 'оккупации.');
  EV.wr_zm = wtk('s1', 'Змиёвская');
  EV.wr_dead = wtk('s1', 'убитых.');
  KEYW.push('оккупации.', 'Змиёвская', 'убитых.');
  SHAKES.push([S0.war + 0.05, 0.3, 7]);
  const grey = t => sm((t - EV.wr_occ + 0.2) / 0.6);

  function sky(t) { const g = grey(t); vgrad(-900, 1000, [lerpC('#6a5a4a', '#3a3c44', g), lerpC('#a88a6a', '#6a6a70', g), lerpC('#c8b090', '#8a8a8e', g)], 1);
    for (let k = 0; k < 6; k++) { const ph = (t * 0.22 + k / 6) % 1; ell(-100 + k * 260 + ph * 80, 820 - ph * 420, 80 + ph * 130, 60 + ph * 90, { wash: '#2a2a2e', washA: 0.55 * (1 - ph), line: false }); }
    for (let k = 0; k < 3; k++) glow(100 + k * 480, 900, 140, 'rgba(255,140,60,1)', 0.25 * (1 - grey(t) * 0.5)); }
  function city(t) {                                                   // остовы домов, взорванный театр, Дон внизу
    const g = grey(t);
    for (let k = 0; k < 8; k++) { const x = -480 + k * 260, h = 200 + ((k * 61) % 160); poly([[x, 1060], [x, 1060 - h], [x + 50, 1060 - h - 30], [x + 110, 1060 - h + 26], [x + 170, 1060 - h - 40], [x + 220, 1060 - h + 10], [x + 220, 1060]], { wash: lerpC('#b8a890', '#8a8682', g), washA: 1, w: 2, col: '#2a2420' }); for (let j = 0; j < 2; j++) for (let q = 0; q < 3; q++) rect(x + 20 + q * 64, 1060 - h + 50 + j * 90, 34, 50, { wash: '#1a1816', washA: 1, w: 1, col: '#000' }); }
    theatre(560, 1060, 0.42, t, { ruin: 1 }); txt('театр — взорван, 1943', 560, 1100, 24, { col: '#e8e0d0', a: 0.7 });
    don(1100, t, { h: 160, col: lerpC('#4a6a7a', '#3a4a52', g) });
  }
  function street(t) {                                                 // улица: патруль-силуэты, проволока, столб с календарём
    const g = grey(t); if (g > 0) for (let i = 0; i < 3; i++) { const x = 1400 - ((t - EV.wr_occ) * 70 + i * 90) % 1700; sil([[x - 22, 1300], [x - 24, 1220], [x - 15, 1190], [x + 15, 1190], [x + 24, 1220], [x + 22, 1300]], '#2a2a2e', 0.85 * g); sil(ellPts(x, 1174, 15, 16, 0, 0, 16), '#2a2a2e', 0.85 * g); pencil([[x + 14, 1196], [x + 34, 1120]], { w: 4, col: '#2a2a2e', a: 0.85 * g, pass2: false }); }
    if (g > 0) { for (const px of [-200, 300, 800, 1300]) pencil([[px, 1340], [px, 1150]], { w: 10, col: '#3a2a1a', a: g });
      for (let r = 0; r < 3; r++) { const y = 1180 + r * 50, L = 1900 * g; pencil(Array.from({ length: 28 }, (_, i) => [-400 + i * 70 * g * 1.0, y + Math.sin(i * 1.3 + r) * 8]).filter(p => p[0] < -400 + L), { w: 3, col: '#1a1a1a', a: g, pass2: false });
        for (let i = 0; i < 28; i++) { const x = -400 + i * 70 + 35; if (x > -400 + L) break; const yy = y + Math.sin((i + 0.5) * 1.3 + r) * 8; pencil([[x - 8, yy - 8], [x + 8, yy + 8]], { w: 2, col: '#1a1a1a', a: g, pass2: false }); pencil([[x + 8, yy - 8], [x - 8, yy + 8]], { w: 2, col: '#1a1a1a', a: g, pass2: false }); } } }
  }
  function memorial(t) {                                               // мемориал Змиёвской балки: ступени, скорбные фигуры, свечи
    if (t < EV.wr_zm - 0.2) return; const k = sm((t - EV.wr_zm + 0.2) / 0.8);
    ctx.save(); ctx.globalAlpha = k;
    for (let s = 0; s < 5; s++) rect(520 + s * 40, 1430 + s * 18, 460 - s * 40, 20, { wash: '#9a948a', washA: 1, w: 1.6, col: '#2a2420' });
    rect(700, 1080, 90, 350, { wash: '#b8b0a4', washA: 1, w: 2.4, col: '#3a3630' }); pencil([[745, 1100], [745, 1410]], { w: 2, col: '#6a645a', a: 0.6, pass2: false });
    const fig = (x, y, h, lean, c) => { sil([[x - 18, y], [x - 22, y - h * 0.62], [x - 14 + lean, y - h * 0.86], [x + 12 + lean, y - h * 0.86], [x + 22, y - h * 0.6], [x + 18, y]], c, 0.95); sil(ellPts(x + lean * 1.4, y - h * 0.94, 12, 14, 0, 0, 12), c, 0.95); };
    fig(620, 1440, 200, 10, '#5a4a32'); fig(670, 1440, 170, 14, '#6a5638'); fig(850, 1440, 210, -12, '#5a4a32'); fig(900, 1440, 120, -8, '#6a5638');
    for (let i = 0; i < 7; i++) { candle(560 + i * 64, 1580, 0.4, t, i, 1); glow(560 + i * 64, 1560, 60, 'rgba(255,200,120,1)', 0.35); }
    for (let i = 0; i < 4; i++) { const fx = 600 + i * 110; pencil([[fx, 1540], [fx - 6, 1500]], { w: 3, col: '#3a5a2a', pass2: false }); ell(fx - 6, 1494, 12, 10, { wash: '#c8302a', washA: 1, w: 1.2, col: '#5a0a08' }); }
    ctx.restore();
  }

  WORLD.war = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => city(t));
    lay(3, () => street(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: lerpC('#a89a84', '#6a6a6a', grey(t)), washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2a2a', ang: 0.1, w: 1.2 }); memorial(t); cat(); });
    lay(0.7, () => { haze('#14141a', 0.2 * grey(t)); motes(30, [-200, 0, 1300, 1900], '#c8c0b4', t, 13210, { sp: 30, vx: -20, sz: 3, a: 0.4, wob: 20 }); });
  };
  DIR.war = {
    outfit: 'voen', light: { side: 1, rim: '#d8d0c0' }, grade: ['#6a6a6a', 0.16],
    act: () => [[S0.war, 'shock'], [EV.wr_occ, 'scared'], [EV.wr_zm - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: t < EV.wr_zm ? [0.5, -0.2] : [0.6, 0.2], nod: t > EV.wr_zm ? 0.06 : 0 }),
    cam: () => [[S0.war, 560, 1000, 0.06], [EV.wr_occ, 560, 1060, 0.06], [EV.wr_zm, 620, 1180, 0.12], [S1.war, 640, 1220, 0.16]],
    hud: t => {
      if (t > S0.war + 0.3 && t < EV.wr_zm) { const k = popK(t, S0.war + 0.3, 0.35); push(760, 720, k, 0.03); rect(-170, -100, 340, 200, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a3a3a' }); txt('ОККУПАЦИЯ ×2', 0, -56, 34, { font: 'Osw', col: '#a8201e' }); txt('XI.1941 — 8 дней', 0, 0, 28, { font: 'Osw', col: '#2a2a2a' }); txt('VII.1942 — II.1943', 0, 48, 28, { font: 'Osw', col: '#2a2a2a' }); pop(); }
      if (t > EV.wr_zm) { const k = popK(t, EV.wr_zm, 0.4); push(540, 720, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,14,14,0.86)'; ctx.fillRect(-330, -70, 660, 140); ctx.restore(); txt('ЗМИЁВСКАЯ БАЛКА · 1942', 0, -22, 42, { font: 'Osw', col: '#f2ece0', a: k }); txt('≈ 27 000 убитых', 0, 32, 32, { col: '#e8d8b0', a: k }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В war: дым затягивает кадр и расходится
  TRANS_IN.war = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.1); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(13220); for (let i = 0; i < 40; i++) { const x = r() * W, y = r() * H, R = (160 + r() * 200) * (0.4 + f); ell(x + (k - 0.5) * 300 * (r() - 0.5), y - k * 200, R, R * 0.7, { wash: i % 3 ? '#4a4a4e' : '#2a2a2e', washA: 0.85 * f, line: false }); } });
  } };
})();
