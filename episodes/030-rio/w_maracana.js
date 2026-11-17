/* 030 — сцена `maracana`: 16 июля 1950, стадион Маракана. Солнечный день (главный свет — солнце слева), огромная овальная чаша трибун,
   забитая людьми, флаги, шляпы, на поле — игроки в белом и голубом, ворота справа, табло «БРАЗИЛИЯ 1 : 1 УРУГВАЙ».
   Том в белой форме сборной 1950 года (jersey50) на трибуне. На «двести тысяч» по трибунам бежит счётчик зрителей → плашка
   «173 850 ОФИЦИАЛЬНО · ≈ 200 000 ПО ОЦЕНКАМ»; на «проиграла» мяч в сетку, табло 1 : 2, трибуны замолкают и сереют, шляпы падают,
   Том хватается за голову. Переход В: мяч влетает в сетку кадра. */
(() => {
  EV.mr_stad = wtk('s8', 'Маракане');
  EV.mr_200 = wtk('s8', 'двести');
  EV.mr_lose = wtk('s8', 'проиграла');
  EV.mr_fin = wtk('s8', 'финал.');
  KEYW.push('Маракане', 'тысяч', 'финал.');
  const L = RJ.ink, SUN = [160, 400], sad = t => sm(clamp((t - EV.mr_lose) / 0.6));
  function sky(t) { vgrad(-900, 1000, [lerpC('#3a8ae0', '#7a8a98', sad(t)), lerpC('#9ad0f0', '#b0b8c0', sad(t)), '#f0f0e0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4 * (1 - sad(t) * 0.5)); ell(SUN[0], SUN[1], 56, 56, { wash: '#fffbe0', washA: 1, line: false }); }
  function stands(t) {                                               // дальняя чаша: кольцо трибун, точки-зрители, флаги, крыша-козырёк
    const s = sad(t); shape([[-500, 1150], [-500, 700], [200, 620], [880, 620], [1600, 700], [1600, 1150]], { wash: '#8a8a90', washA: 1, w: 2, col: L });
    rect(-500, 600, 2200, 40, { wash: '#d8d8d0', washA: 1, w: 2, col: L }); for (let i = 0; i < 40; i++) pencil([[-480 + i * 55, 640], [-480 + i * 55, 700]], { w: 3, col: '#6a6a70', pass2: false });
    const r = rng(6900); ctx.save(); for (let i = 0; i < 1600; i++) { const x = -480 + r() * 2060, y = 700 + r() * 440, c = ['#f4f0e6', '#e8c8a0', '#2a2a30', '#f8d030', '#1e8a4a', '#c88a5a'][i % 6]; ctx.fillStyle = s > 0.5 && i % 6 === 3 ? '#8a8a80' : c; ctx.fillRect(x, y - (s < 0.1 ? Math.abs(Math.sin(t * 6 + i)) * 4 : 0), 7, 9); } ctx.restore();
    for (let i = 0; i < 8; i++) { const x = -300 + i * 220; pencil([[x, 760], [x, 680]], { w: 2, col: '#3a3a40', pass2: false }); if (s < 0.5) shape([[x, 680], [x + 50 + Math.sin(t * 6 + i) * 6, 690], [x, 704]], { wash: i % 2 ? '#f4f0e6' : RJ.green, washA: 1, w: 1, col: L }); }
    depthFog('#d8e0e8', 0.05 + s * 0.06); }
  function pitch(t) {                                                // поле: газон полосами, разметка, игроки, ворота справа с мячом
    for (let i = 0; i < 8; i++) rect(-500 + i * 280, 1150, 280, 200, { wash: i % 2 ? '#3a9a3a' : '#2a8a2a', washA: 1, line: false }); pencil([[-500, 1160], [1700, 1160]], { w: 4, col: '#f4f0e6', pass2: false }); pencil(ellPts(500, 1250, 160, 40, 0, 0.05, 30), { w: 3, col: '#f4f0e6', pass2: false });
    push(1060, 1260, 0.7); rect(-10, -160, 20, 160, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L }); rect(300, -160, 20, 160, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L }); rect(-10, -170, 330, 20, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L });
    for (let q = 0; q < 8; q++) pencil([[q * 40, -150], [q * 40 + 30, 0]], { w: 1, col: '#c8c8c8', a: 0.6, pass2: false }); const g = clamp((t - EV.mr_lose + 0.5) / 0.5); ball(lerp(-400, 160, g), -60 - Math.sin(g * 3.14) * 80, 0.6, t * 10); pop();
    const P = [[200, '#f4f0e6', 'wave'], [340, '#7ab8e8', 'up'], [460, '#f4f0e6', 'hold'], [620, '#7ab8e8', 'swing'], [760, '#f4f0e6', 'hold'], [880, '#7ab8e8', 'up']];
    P.forEach(([x, c, a], i) => human(x + Math.sin(t * 2 + i) * 20, 1300, 0.42, t, { body: c, legs: c === '#f4f0e6' ? '#1e3a8a' : '#1a1a1e', armR: c === '#7ab8e8' && t > EV.mr_lose ? 'up' : a, seed: 6910 + i, face: c === '#f4f0e6' && t > EV.mr_lose ? 'shock' : 'calm', flip: i % 2 ? -1 : 1 }));
    push(560, 1050, 0.9); rect(-260, -110, 520, 150, { wash: '#14181e', washA: 1, w: 3, col: '#8a8a8a' }); txt('БРАЗИЛИЯ', -150, -70, 30, { col: '#f4f0e6', font: 'Osw' }); txt('УРУГВАЙ', 150, -70, 30, { col: '#7ab8e8', font: 'Osw' });
    txt('1', -150, 0, 70, { col: RJ.yellow, font: 'Osw' }); txt(':', 0, 0, 70, { col: '#f4f0e6', font: 'Osw' }); txt(t > EV.mr_lose ? '2' : '1', 150, 0, 70 * (t > EV.mr_lose ? 1 + 0.3 * (1 - clamp((t - EV.mr_lose) / 0.3)) : 1), { col: t > EV.mr_lose ? '#ff6a5a' : RJ.yellow, font: 'Osw' }); pop();
  }
  function fans(t) {                                                 // ближняя трибуна: болельщики в шляпах, флаги, газеты, радио
    const s = sad(t); rect(-500, 1360, 2200, 90, { wash: '#a8a8a0', washA: 1, w: 2, col: L });
    const P = [[-200, '#f4f0e6', 'boater'], [-80, '#e8c8a0', 'brim'], [40, '#3a5a8a', 'boater'], [700, '#f4f0e6', 'brim'], [820, '#c8a070', 'boater'], [940, '#2a6a4a', 'brim'], [1060, '#f4f0e6', 'boater'], [1180, '#7a4a2a', 'brim']];
    P.forEach(([x, c, h], i) => { const down = s > 0.3; human(x, 1440, 0.64, t, { body: c, skin: ['#e2b48e', '#7a4a2a', '#c88a5a'][i % 3], hat: down && i % 3 === 0 ? undefined : h, hatCol: '#e8d8b0', legs: '#2a2a36', armR: down ? 'hold' : i % 2 ? 'up' : 'wave', flip: x > 600 ? -1 : 1, seed: 6920 + i, face: down ? 'shock' : 'grin' });
      if (down && i % 3 === 0) { push(x + 30, 1440 - 40 + clamp((t - EV.mr_lose) / 0.5) * 20, 0.6, 0.4); ell(0, 0, 50, 14, { wash: '#e8d8b0', washA: 1, w: 1.4, col: L }); pop(); } });
  }
  function ground(t) {                                               // бетонная ступень: газета, радиоприёмник, флажок, шляпа, бутылки, программка
    rect(-500, 1450, 2200, 900, { wash: '#b8b8b0', washA: 1, w: 2, col: L }); for (let j = 0; j < 4; j++) pencil([[-500, 1560 + j * 110], [1700, 1560 + j * 110]], { w: 3, col: '#7a7a74', pass2: false });
    lightPool(SUN[0] + 300, 1660, 800, 160, 'rgba(255,240,190,1)', 0.35 * (1 - sad(t) * 0.5));
    push(880, 1760, 1, -0.05); rect(-120, -70, 240, 140, { wash: '#f0ece0', washA: 1, w: 2, col: L }); txt('CAMPEÕES?', 0, -40, 30, { col: L, font: 'Osw' }); for (let q = 0; q < 4; q++) pencil([[-100, -10 + q * 18], [100, -10 + q * 18]], { w: 1.4, col: '#8a8a80', pass2: false }); pop();
    push(1100, 1780, 1); rect(-60, -80, 120, 80, { wash: '#8a5a32', washA: 1, w: 2, col: L }); ell(-24, -40, 22, 22, { wash: '#d8c8a0', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) pencil([[10, -60 + q * 14], [46, -60 + q * 14]], { w: 2, col: L, pass2: false }); pop();
    push(-40, 1760, 1); pencil([[0, 0], [0, -160]], { w: 4, col: '#5a3a1a', pass2: false }); shape([[0, -160], [90, -140], [0, -110]], { wash: RJ.green, washA: 1, w: 1.4, col: L }); pop();
    for (let q = 0; q < 2; q++) { push(560 + q * 40, 1840, 1); rect(-12, -60, 24, 60, { wash: '#6aa83a', washA: 0.8, w: 1.4, col: L }); pop(); }
    castShadow(330, 1640, 120, 480, 0.5, 0.35); moodDark(1200, 900, 900, 1800, '#14141a', 0.25 + sad(t) * 0.2);
  }
  WORLD.maracana = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => stands(t)); lay(5, () => pitch(t)); lay(2.4, () => fans(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const [x, h] of [[-60, '#e8d8b0'], [120, null], [980, '#e8d8b0'], [1160, null], [1300, '#e8d8b0']]) { sil([[x - 110, 2400], [x - 120, 2060], [x - 60, 1990], [x + 60, 1990], [x + 120, 2060], [x + 110, 2400]], '#1e1e24', 1); ell(x, 1940, 64, 74, { wash: '#2a1e18', washA: 1, line: false }); if (h) ell(x, 1890, 110, 30, { wash: h, washA: 1, w: 2, col: '#000' }); } });
    if (sad(t) > 0) scr(() => { ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = 0.45 * sad(t); ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.maracana = {
    outfit: 'jersey50', light: { side: -1, rim: '#fff0c0' }, grade: ['#2a3a2a', 0.05],
    act: () => [[S0.maracana, 'grin'], [EV.mr_200, 'awe'], [EV.mr_lose, 'shock'], [EV.mr_fin, 'scared']],
    pose: (t, u, b) => { const grab = t > EV.mr_lose + 0.1; return Object.assign(b, { x: 330, y: 1640, s: 0.95, look: [0.8, -0.4], hand: grab ? [60, -420] : [150, -330 - Math.abs(Math.sin(t * 6)) * 60], handF: grab ? [-50, -420] : undefined, squash: grab && t < EV.mr_lose + 0.35 ? 0.1 : b.squash }); },
    hud: t => { if (t > EV.mr_200 - 0.05 && t < EV.mr_lose) { const k = clamp((t - EV.mr_200 + 0.05) / 1.0); infoPlate(560, 760, [[(Math.round(173850 * k)).toLocaleString('ru-RU') + ' ЗРИТЕЛЕЙ', 50, RJ.goldL], ['официально · ≈ 200 000 по оценкам', 28]], t, EV.mr_200 - 0.05); }
      if (t > EV.mr_lose) infoPlate(560, 760, [['16.07.1950 · БРАЗИЛИЯ 1 : 2 УРУГВАЙ', 38, '#ff9a8a'], ['«МАРАКАНАСО» — национальная трагедия', 28]], t, EV.mr_lose + 0.2, { edge: '#c84a3a' }); },
    cam: () => [[S0.maracana, 560, 900, -0.1], [EV.mr_200, 760, 880, -0.06], [EV.mr_200 + 1.0, 360, 900, -0.06], [EV.mr_lose - 0.1, 700, 1000, 0.06], [EV.mr_lose + 0.2, 760, 980, 0.14, 'x'], [EV.mr_fin, 440, 1160, 0.12], [S1.maracana, 430, 1180, 0.14]]
  };
  TRANS_IN.maracana = { a: 0.08, b: 0.36, fx(k, t, A, B) {          // мяч влетает в «сетку» кадра: сетка прогибается и открывает новый кадр
    const e = sm(k); drawBuf(e < 0.5 ? A : B, e < 0.5 ? 1 + e * 0.2 : 1.1 - (e - 0.5) * 0.2); scr(() => { const a = Math.sin(e * Math.PI); for (let i = 0; i < 24; i++) { pencil([[i * 50 - 50, 0], [i * 50 - 50 + Math.sin(e * 3.14) * (i - 12) * 6, H]], { w: 3, col: '#f4f0e6', a: 0.7 * a, pass2: false, gap: false }); } for (let j = 0; j < 40; j++) pencil([[0, j * 50], [W, j * 50 + Math.sin(e * 3.14) * 40]], { w: 3, col: '#f4f0e6', a: 0.7 * a, pass2: false, gap: false }); ball(540, 960, 1 + e * 6, e * 6); }); } };
})();
