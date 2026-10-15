/* 002 — сцена `fire`: 1812, Поклонная гора. Наполеон ждёт ключей от Москвы, адъютант держит пустую подушечку, Том-гусар прячет
   за спиной огромный ключ. Вдали — Москва: Кремль (в 1812-м белёный), Иван Великий, купола, деревянные кварталы; на «горит» — пожар.
   Переход В сцену: кадр литейной ямы прогорает, как бумага (обугленная кромка, тлеющая кайма, языки пламени, пепел). */
(() => {
  /* время слова внутри фрагмента субтитра (по доле символов) — точнее, чем начало фрагмента */
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  const T = {};
  const tm = () => {
    if (T.ok) return T; T.ok = 1;
    T.nap = wt('n1', 'Наполеон'); T.key = wt('n1', 'ключей'); T.msk = wt('n1', 'Москвы.'); T.dozh = wt('n1', 'дождался'); T.city = wt('n1', 'город');
    T.empty = wt('n1', 'пустой'); T.fire = wt('n1', 'горит.'); return T;
  };
  EV.fire_key = wt('n1', 'ключей');          // Том показывает ключ зрителю
  EV.fire_tap = wt('n1', 'Москвы.');         // Наполеон нетерпеливо стучит сапогом
  EV.fire_no = wt('n1', 'дождался');         // адъютант пожимает плечами с пустой подушечкой
  EV.fire_empty = wt('n1', 'пустой');        // пустые улицы, первые дымки
  EV.fire_burst = wt('n1', 'горит.') - 0.04; // вспышка пожара над городом
  SHAKES.push([EV.fire_burst, 0.45, 14]);
  KEYW.push('Наполеон', 'ключей', 'Москвы.', 'дождался', 'пустой', 'горит.');

  const fireK = t => sm((t - EV.fire_burst) / 0.55);
  const smokeK = t => clamp((t - EV.fire_empty) / 1.2) * 0.35 + fireK(t) * 0.65;

  // ---------------------------------------------------------------- город: купола, Кремль, Иван Великий, дома
  function onion(x, y, w, h, col, o = {}) {                       // луковичная глава на барабане, с крестом
    const pts = [[x - w * 0.5, y], [x - w * 0.62, y - h * 0.3], [x - w * 0.45, y - h * 0.62], [x - w * 0.12, y - h * 0.86], [x, y - h], [x + w * 0.12, y - h * 0.86], [x + w * 0.45, y - h * 0.62], [x + w * 0.62, y - h * 0.3], [x + w * 0.5, y]];
    const p = o.line === false ? (sil(spline(pts, true, 4), col, 1), null) : blob(pts, { wash: col, washA: 1, w: o.w ?? 1.8, col: '#1a0e0a' });
    if (o.gl) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = o.gl; ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.ellipse(x + w * 0.2, y - h * 0.45, w * 0.1, h * 0.22, 0.3, 0, 6.3); ctx.fill(); ctx.restore(); }
    const cy = y - h; ctx.save(); ctx.strokeStyle = o.cross || '#e8c060'; ctx.lineWidth = Math.max(1, w * 0.06) / S; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy - h * 0.45); ctx.moveTo(x - w * 0.18, cy - h * 0.3); ctx.lineTo(x + w * 0.18, cy - h * 0.3); ctx.stroke(); ctx.restore();
    return p;
  }
  function church(x, base, s, wall, dome, five, seed, lit) {       // храм: четверик, барабаны, 1 или 5 глав
    push(x, base, s);
    rect(-60, -110, 120, 110, { wash: wall, washA: 1, w: 2, col: '#2a1a14' });
    ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#5a3a3a'; ctx.fillRect(-60, -110, 30, 110); ctx.restore();
    for (let i = 0; i < 3; i++) { ctx.fillStyle = 'rgba(40,24,20,0.8)'; ctx.fillRect(-40 + i * 32, -86, 12, 26); }
    poly([[-66, -110], [0, -140], [66, -110]], { wash: '#5a6a5a', washA: 1, w: 1.8, col: '#2a1a14' });
    const dr = (dx, dw, dh, sc) => { rect(dx - dw / 2, -140 - dh, dw, dh, { wash: wall, washA: 1, w: 1.6, col: '#2a1a14' }); onion(dx, -140 - dh, dw * 1.25, dw * 1.6 * sc, dome, { gl: lit }); };
    if (five) { dr(-42, 22, 30, 1); dr(42, 22, 30, 1); }
    dr(0, 34, 52, 1.1);
    pop();
  }
  function belfry(x, base, s, wall, roof) {                        // шатровая колокольня
    push(x, base, s);
    rect(-26, -170, 52, 170, { wash: wall, washA: 1, w: 2, col: '#2a1a14' }); rect(-22, -230, 44, 60, { wash: wall, washA: 1, w: 1.8, col: '#2a1a14' });
    for (const ax of [-12, 4]) { ctx.fillStyle = 'rgba(30,18,14,0.85)'; ctx.fillRect(ax, -222, 9, 34); }
    poly([[-24, -230], [0, -330], [24, -230]], { wash: roof, washA: 1, w: 1.8, col: '#2a1a14' }); onion(0, -330, 14, 22, '#e0b040');
    pop();
  }
  function kTower(x, base, h, w, roof, tall) {                    // кремлёвская башня (белёная в 1812-м), шатёр, орёл
    rect(x - w / 2, base - h, w, h, { wash: '#efe6d6', washA: 1, w: 2, col: '#2a1a14' });
    ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#7a6a8a'; ctx.fillRect(x - w / 2, base - h, w * 0.32, h); ctx.restore();
    for (let i = 0; i < 4; i++) { ctx.fillStyle = '#efe6d6'; ctx.fillRect(x - w / 2 + i * w / 3.5, base - h - 10, w / 7, 10); }
    if (tall) { rect(x - w * 0.36, base - h - 60, w * 0.72, 60, { wash: '#efe6d6', washA: 1, w: 1.8, col: '#2a1a14' }); ell(x, base - h - 34, 9, 9, { wash: '#f4f0e0', washA: 1, w: 1.4 }); }
    const top = tall ? base - h - 60 : base - h - 10;
    poly([[x - w * 0.42, top], [x, top - (tall ? 150 : 90)], [x + w * 0.42, top]], { wash: roof, washA: 1, w: 1.8, col: '#1a120c' });
    ctx.fillStyle = '#ffd060'; ctx.beginPath(); ctx.arc(x, top - (tall ? 156 : 95), tall ? 7 : 5, 0, 6.3); ctx.fill();
  }
  function izba(x, base, w, h, col, roof, seed) {                  // деревянный дом: сруб, двускатная крыша, окошки
    rect(x, base - h, w, h, { wash: col, washA: 1, line: false });
    poly([[x - 6, base - h], [x + w / 2, base - h - w * 0.42], [x + w + 6, base - h]], { wash: roof, washA: 1, line: false });
    ctx.save(); ctx.strokeStyle = 'rgba(30,16,8,0.6)'; ctx.lineWidth = 1.2 / S; ctx.beginPath(); for (let k = 1; k < 4; k++) { ctx.moveTo(x, base - h + k * h / 4); ctx.lineTo(x + w, base - h + k * h / 4); } ctx.stroke(); ctx.restore();
    ctx.fillStyle = 'rgba(30,18,10,0.85)'; ctx.fillRect(x + w * 0.25, base - h * 0.62, w * 0.16, h * 0.26); ctx.fillRect(x + w * 0.6, base - h * 0.62, w * 0.16, h * 0.26);
  }
  function flame(x, y, h, w, t, seed, a = 1) {                     // язык пламени: внешний оранжевый, внутренний жёлтый (lighter)
    if (h < 3) return; const r = rng(seed), ph = r() * 6.28, sw = Math.sin(t * 9 + ph) * w * 0.35, fl = 0.85 + 0.15 * Math.sin(t * 17 + ph * 2);
    const H_ = h * fl, P = [[x - w / 2, y], [x - w * 0.55 + sw * 0.2, y - H_ * 0.35], [x - w * 0.25 + sw * 0.6, y - H_ * 0.7], [x + sw, y - H_], [x + w * 0.2 + sw * 0.5, y - H_ * 0.62], [x + w * 0.5, y - H_ * 0.3], [x + w / 2, y]];
    ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.fillStyle = '#ff5a14'; ctx.fill(pathOf(spline(P, true, 4))); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.85 * a; ctx.fillStyle = '#ffc040';
    ctx.fill(pathOf(spline(P.map(([px, py]) => [x + (px - x) * 0.5, y + (py - y) * 0.62]), true, 4))); ctx.restore();
  }
  function smokeCol(x, y, t, s, a, seed, dark) {                   // столб дыма: клубы поднимаются и сносятся ветром вправо
    if (a < 0.01) return;
    for (let j = 0; j < 9; j++) { const r = rng(seed * 31 + j), ph = (t * 0.32 + j / 9 + r() * 0.05) % 1;
      glow(x + ph * 260 * s + Math.sin(t * 1.3 + j) * 18 * s, y - ph * 720 * s, (50 + ph * 190) * s, dark ? 'rgba(40,26,24,1)' : 'rgba(120,96,96,1)', a * (0.75 - ph * 0.55), 'source-over'); }
  }
  const CH = [ // x, база, масштаб, стена, глава, пятиглавие
    [-260, 1012, 0.62, '#e8dcc8', '#3a6a5a', 0], [-120, 1018, 0.8, '#f0e0c0', '#e0b040', 1], [40, 1010, 0.6, '#e6c8b0', '#2a4a8a', 0], [165, 1022, 0.74, '#efe2cc', '#3a7a5a', 1],
    [720, 1016, 0.7, '#f0dcc4', '#e0b040', 1], [835, 1010, 0.56, '#e8d4bc', '#2a4a8a', 0], [955, 1020, 0.78, '#f2e4cc', '#3a6a5a', 1], [1090, 1012, 0.6, '#e8d0b4', '#e0b040', 0],
    [1230, 1018, 0.74, '#efe0c8', '#5a3a7a', 1], [1360, 1012, 0.6, '#e8dcc8', '#e0b040', 0]];
  function city(t, f, sk) {
    // дальний город и холмы
    lay(17, () => {
      sil([[-1500, 1010], [-1500, 985], ...Array.from({ length: 50 }, (_, i) => [-1500 + i * 85, 985 - Math.abs(Math.sin(i * 1.7)) * 26]), [2800, 985], [2800, 1010]], '#8a6a8a', 1);
      for (let i = 0; i < 26; i++) { const r = rng(i * 3 + 7), x = -1300 + i * 160 + r() * 60, h = 30 + r() * 40; ctx.fillStyle = '#86668a'; ctx.fillRect(x - 6, 985 - h, 12, h); onion(x, 985 - h, 18, 24, '#86668a', { line: false, cross: '#a080a0' }); }
      if (f > 0) glow(500, 990, 1400, 'rgba(255,90,30,1)', 0.55 * f);
    });
    haze('#e8a088', 0.12 + 0.1 * f);
    lay(9, () => { push(540, 1000, 1.2); ctx.translate(-540, -1000);
      // земля города + река
      sil([[-1500, 1000], [2800, 1000], [2800, 1300], [-1500, 1300]], '#6a5a52', 1);
      const rv = pathOf([[-1500, 1060], [300, 1046], [900, 1052], [2800, 1040], [2800, 1080], [900, 1090], [300, 1084], [-1500, 1100]]); wash(rv, f > 0 ? lerpC('#8a9ab8', '#ff8a4a', f) : '#8a9ab8', 1);
      for (let k = 0; k < 16; k++) { const x = -800 + k * 170 - (t * 14 % 170); pencil([[x, 1066 + (k % 3) * 8], [x + 60, 1064 + (k % 3) * 8]], { w: 1.6, col: '#fff0d0', a: 0.6, pass2: false, gap: false }); }
      // храмы по всей панораме
      CH.forEach(([x, b, s, wl, dm, five], i) => church(x, b, s, wl, dm, five, i, 0.5));
      belfry(-30, 1015, 0.7, '#efe2cc', '#3a5a4a'); belfry(620, 1012, 0.6, '#e8d8c0', '#5a3a2a'); belfry(1160, 1015, 0.7, '#efe0c8', '#3a5a4a');
      // Кремль: белая стена с «ласточкиными хвостами», башни, соборы, Иван Великий
      const wy = 985; rect(250, wy - 46, 420, 52, { wash: '#efe6d6', washA: 1, w: 2, col: '#2a1a14' });
      ctx.save(); ctx.fillStyle = '#efe6d6'; for (let x = 252; x < 668; x += 14) { ctx.beginPath(); ctx.moveTo(x, wy - 46); ctx.lineTo(x, wy - 58); ctx.lineTo(x + 4, wy - 54); ctx.lineTo(x + 8, wy - 58); ctx.lineTo(x + 8, wy - 46); ctx.fill(); } ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#7a6a8a'; ctx.fillRect(250, wy - 20, 420, 26); ctx.restore();
      // соборы за стеной (золотые главы)
      push(400, wy - 46, 0.78); rect(-70, -90, 140, 90, { wash: '#f2ead8', washA: 1, w: 2, col: '#2a1a14' }); for (const [dx, dw] of [[-44, 18], [44, 18], [-16, 20], [16, 20]]) { rect(dx - dw / 2, -130, dw, 40, { wash: '#f2ead8', washA: 1, w: 1.4, col: '#2a1a14' }); onion(dx, -130, dw * 1.3, dw * 1.6, '#e8b840', { gl: 0.6 }); } rect(-12, -160, 24, 70, { wash: '#f2ead8', washA: 1, w: 1.4, col: '#2a1a14' }); onion(0, -160, 34, 46, '#e8b840', { gl: 0.7 }); pop();
      push(585, wy - 46, 0.7); rect(-60, -80, 120, 80, { wash: '#f0e6d4', washA: 1, w: 2, col: '#2a1a14' }); for (const dx of [-36, 0, 36]) { rect(dx - 9, -116, 18, 36, { wash: '#f0e6d4', washA: 1, w: 1.4, col: '#2a1a14' }); onion(dx, -116, 24, 32, '#e8b840', { gl: 0.6 }); } pop();
      // Иван Великий: белые ярусы-восьмерики, золотая глава
      push(492, wy - 46, 1);
      const tiers = [[0, 40, 120], [120, 34, 100], [220, 28, 80]]; tiers.forEach(([y0, hw, hh]) => { rect(-hw, -y0 - hh, hw * 2, hh, { wash: '#f4ecdc', washA: 1, w: 2, col: '#2a1a14' }); ctx.save(); ctx.globalAlpha = 0.32; ctx.fillStyle = '#7a6a8a'; ctx.fillRect(-hw, -y0 - hh, hw * 0.6, hh); ctx.restore();
        for (const ax of [-hw * 0.55, hw * 0.15]) { ctx.fillStyle = 'rgba(40,26,22,0.85)'; ctx.beginPath(); ctx.moveTo(ax, -y0 - 18); ctx.lineTo(ax, -y0 - hh + 30); ctx.arc(ax + hw * 0.2, -y0 - hh + 30, hw * 0.2, Math.PI, 0); ctx.lineTo(ax + hw * 0.4, -y0 - 18); ctx.fill(); }
        pencil([[-hw - 4, -y0 - hh], [hw + 4, -y0 - hh]], { w: 2.4, col: '#2a1a14', pass2: false, gap: false }); });
      rect(-20, -360, 40, 60, { wash: '#f4ecdc', washA: 1, w: 1.8, col: '#2a1a14' }); onion(0, -360, 56, 74, '#f0c040', { gl: 0.9, w: 2.2 });
      glow(10, -400, 70, 'rgba(255,230,140,1)', 0.5 * (1 - f * 0.5));
      pop();
      kTower(258, wy, 70, 40, '#3a6a52', false); kTower(366, wy, 92, 50, '#3a6a52', true); kTower(560, wy, 66, 36, '#3a6a52', false); kTower(664, wy, 80, 44, '#3a6a52', true);
      // деревянные кварталы — ряды изб перед Кремлём и по краям
      for (let row = 0; row < 3; row++) for (let i = 0; i < 26; i++) { const r = rng(row * 100 + i), x = -900 + i * 110 + r() * 40 + row * 30, b = 1012 + row * 26, w = 40 + r() * 26, h = 22 + r() * 12;
        if (row === 0 && x > 230 && x < 690) continue; izba(x, b, w, h, ['#8a6a4a', '#7a5a3a', '#9a7a52'][i % 3], ['#5a4a3a', '#6a4a30', '#4a3a2e'][(i + row) % 3], i); }
      // пустые улицы: дорога к заставе, на ней ни души
      const rd = pathOf([[440, 1300], [560, 1300], [520, 1060], [500, 1060]]); wash(rd, '#a08a70', 0.9);
      // пожар: зарево, языки, дым
      if (f > 0 || sk > 0) {
        for (let i = 0; i < 12; i++) { const r = rng(i * 11 + 5), x = -700 + i * 190 + r() * 80; smokeCol(x, 1000, t, 1, sk * (0.5 + r() * 0.5) * (i % 2 ? 1 : 0.7), i, i % 3 === 0); }
      }
      if (f > 0) {
        glow(500, 1010, 900, 'rgba(255,80,20,1)', 0.65 * f); glow(500, 1000, 420, 'rgba(255,200,90,1)', 0.45 * f);
        for (let i = 0; i < 46; i++) { const r = rng(i * 7 + 1), x = -900 + i * 62 + r() * 30, b = 1004 + (i % 3) * 22, h = (40 + r() * 120) * f * (0.6 + 0.4 * sm((t - EV.fire_burst - r() * 0.4) / 0.4));
          flame(x, b, h, 24 + r() * 26, t, i * 13); }
      }
    });
    haze(f > 0 ? '#ff7a40' : '#e8a088', 0.08 + 0.1 * f);
  }

  // ---------------------------------------------------------------- люди 1812: гренадеры, штандарт, адъютант, Наполеон
  function grenadier(x, y, s, t, i) {                               // силуэт гвардейца: медвежья шапка, ружьё со штыком
    push(x, y, s); const c = '#2a1e28';
    sil([[-22, 0], [-26, -120], [-34, -190], [-24, -260], [24, -260], [34, -190], [26, -120], [22, 0]], c, 1);
    ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, -290, 30, 52, 0, 0, 6.3); ctx.fill();                       // медвежья шапка
    ctx.fillStyle = '#e8e0d0'; ctx.fillRect(-4, -250, 8, 120); ctx.fillRect(-20, -246, 40, 6);                      // перевязь
    ctx.fillStyle = '#c03030'; ctx.fillRect(16, -330, 8, 26);                                                      // султан
    pencil([[28, -40], [40, -400]], { w: 4, col: c, pass2: false, gap: false }); pencil([[40, -400], [42, -460]], { w: 2, col: '#d8d0c0', pass2: false, gap: false });
    pop();
  }
  function standard(x, y, t, f) {                                   // орёл-штандарт: золотой орёл на древке, триколор (полотнище влево)
    pencil([[x, y], [x + 4, y - 600]], { w: 7, col: '#3a2414', pass2: false, gap: false });
    const fy = y - 560, W_ = 210, H_ = 160, cols = ['#2a3a8a', '#f2ece0', '#c0302a'], wv = u => Math.sin(t * 5 - u * 4) * 16 * u;
    for (let c = 0; c < 3; c++) {                                   // вертикальные полосы: синяя у древка
      const vp = []; for (let k = 0; k <= 6; k++) { const u = (c + k / 6) / 3; vp.push([x - W_ * u, fy + wv(u) + u * 10]); } for (let k = 6; k >= 0; k--) { const u = (c + k / 6) / 3; vp.push([x - W_ * u, fy + H_ + wv(u) + u * 18]); }
      shape(vp.concat([vp[0]]), { wash: cols[c], washA: 0.97, w: 2, col: '#1a0e08', key: 300 + c, shade: { gap: 8, a: 0.15, col: '#000', ang: 1.2 } }); }
    txt('N', x - W_ / 2, fy + H_ / 2 + wv(0.5) + 6, 74, { col: '#e8b840', font: 'Osw' });
    pencil(ellPts(x - W_ / 2, fy + H_ / 2 + wv(0.5) + 6, 46, 50, 0, 0, 30).slice(4, 40), { w: 3, col: '#e8b840', pass2: false, gap: false });
    // орёл: раскинутые приподнятые крылья, голова в профиль, на перекладине
    push(x + 4, y - 606, 1.15); const G = '#e8b840', GD = '#5a3a08';
    rect(-22, 0, 44, 12, { wash: '#c09030', washA: 1, w: 1.8, col: GD });
    blob([[-12, 2], [-18, -26], [-10, -50], [8, -54], [16, -36], [12, -2]], { wash: G, washA: 1, w: 2.2, col: GD });
    for (const s of [-1, 1]) blob([[s * 8, -42], [s * 26, -76], [s * 50, -96], [s * 62, -86], [s * 58, -60], [s * 66, -50], [s * 48, -34], [s * 54, -24], [s * 30, -20], [s * 12, -24]], { wash: '#e0ac34', washA: 1, w: 2.2, col: GD });
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) pencil([[s * (22 + k * 10), -34 - k * 8], [s * (36 + k * 10), -62 - k * 10]], { w: 1.6, col: GD, a: 0.7, pass2: false, gap: false });
    blob([[-2, -50], [-6, -66], [6, -74], [16, -66], [26, -62], [14, -56]], { wash: '#f0c050', washA: 1, w: 2, col: GD });
    ell(5, -66, 2, 2, { wash: '#1a0a00', washA: 1, line: false });
    glow(0, -50, 90, 'rgba(255,220,120,1)', 0.35 + 0.35 * f);
    pop();
  }
  function adjutant(x, y, s, t, shrug, f) {                         // адъютант лицом к Наполеону (вправо): синий мундир, пустая подушечка
    const sh = shrug ? Math.sin(clamp(shrug) * Math.PI) : 0;
    push(x, y, s, 0, -1);
    for (const lx of [-24, 22]) { rect(lx - 16, -160, 32, 160, { wash: '#14100e', washA: 1, w: 2, col: '#0a0605' }); rect(lx - 18, -280, 36, 124, { wash: '#efe8da', washA: 1, w: 2, col: '#2a1a14' }); }
    blob([[-58, -470], [58, -470], [70, -380], [64, -260], [40, -250], [-40, -250], [-64, -260], [-70, -380]], { wash: '#2a3a6a', washA: 1, w: 2.6, col: '#0e0a14', shade: { gap: 7, a: 0.3, col: '#0a0a20', ang: 1.2 } });
    pencil([[-50, -460], [44, -270]], { w: 9, col: '#efe8da', pass2: false, gap: false });
    for (let k = 0; k < 5; k++) ell(-6, -450 + k * 36, 4, 4, { wash: '#e8c050', washA: 1, w: 1 });
    for (const ex of [-56, 56]) { rect(ex - 16, -478, 32, 12, { wash: '#e8c050', washA: 1, w: 1.4, col: '#6a4a08' }); for (let q = 0; q < 4; q++) pencil([[ex - 12 + q * 8, -466], [ex - 12 + q * 8, -450]], { w: 1.6, col: '#e8c050', pass2: false, gap: false }); }
    push(-6, -522 - sh * 16, 1);                                     // голова в профиль, бакенбарды, усы
    blob([[-40, 30], [-46, -10], [-30, -46], [10, -52], [36, -26], [38, 20], [10, 46], [-26, 44]], { wash: '#e6bfa0', washA: 1, w: 2.2, col: '#3a1e14' });
    blob([[-44, 4], [-64, 14], [-44, 20]], { wash: '#e6bfa0', washA: 1, w: 1.8, col: '#3a1e14' });
    blob([[6, -10], [20, -12], [18, 30], [4, 36]], { wash: '#3a2418', washA: 1, w: 1.4, col: '#1a0e08' });
    blob([[-46, 22], [-30, 20], [-22, 26], [-40, 30]], { wash: '#3a2418', washA: 1, w: 1.2, col: '#1a0e08' });
    ell(-24, -4, 4, sh > 0.2 ? 6 : 4, { wash: '#1a0e08', washA: 1, w: 1 }); pencil([[-36, -18 - sh * 6], [-14, -20 - sh * 8]], { w: 2.6, pass2: false });
    if (shrug) { ctx.save(); ctx.globalAlpha = 0.9 * sm(shrug * 3); ctx.fillStyle = '#bfe0ff'; ctx.beginPath(); ctx.ellipse(28, -34, 6, 10, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
    blob([[-78, -30], [-40, -76], [40, -78], [80, -32], [30, -44], [-30, -44]], { wash: '#141018', washA: 1, w: 2.2, col: '#05030a' });
    pop();
    const py = -340 - sh * 26, px = -150;                            // руки вперёд с подушечкой
    shape(tubeP(spline([[-40, -446], [-96, -390], [px + 36, py + 14]], false, 6), 36, 28), { wash: '#2a3a6a', washA: 1, w: 2.2, col: '#0e0a14' });
    push(px, py, 1, Math.sin(t * 3) * 0.03 + (shrug ? Math.sin(t * 22) * 0.06 * sh : 0));
    blob([[-80, 0], [-70, -22], [0, -28], [72, -22], [82, 0], [70, 18], [0, 22], [-70, 18]], { wash: '#9a1a2a', washA: 1, w: 2.6, col: '#3a060c', shade: { gap: 6, a: 0.3, col: '#3a060c', ang: 0.3 } });
    for (const s_ of [-1, 1]) { line([[s_ * 80, 0], [s_ * 92, 26]], { w: 3, col: '#e8b840', pass2: false }); blob([[s_ * 86, 22], [s_ * 98, 22], [s_ * 100, 46], [s_ * 84, 46]], { wash: '#e8b840', washA: 1, w: 1.4, col: '#6a4a08' }); }
    pencil([[-70, -8], [70, -8]], { w: 2, col: '#e8b840', a: 0.8, pass2: false, gap: false });
    ell(28, 6, 13, 12, { wash: '#f0e8dc', washA: 1, w: 1.6 }); ell(-30, 6, 13, 12, { wash: '#f0e8dc', washA: 1, w: 1.6 });   // перчатки
    glow(0, -14, 100, 'rgba(255,170,120,1)', 0.2 + 0.25 * f);
    pop();
    pop();
  }
  function napoleon(x, y, s, t, st) {                               // фронтально, голова в 3/4 влево; st: scope, tap, fire, drop
    const br = Math.sin(t * 2.2) * 2, SK = '#e8c2a0', SKD = '#3a1e14', CO = '#7c7c84', COD = '#1a1416';
    push(x, y, s);
    const tap = st.tap ? Math.max(0, Math.sin(t * 22)) * 0.2 : 0;
    for (const [lx, k] of [[-36, 1], [32, 0]]) {                     // ботфорты (левый постукивает носком)
      push(lx, 0, 1, k ? -tap : 0);
      blob([[-26, -176], [26, -176], [27, -60], [24, -14], [k ? -56 : 44, -6], [k ? -60 : 48, 4], [-26, 4]], { wash: '#141010', washA: 1, w: 2.6, col: '#050303' });
      blob([[-30, -184], [30, -184], [28, -154], [-28, -154]], { wash: '#2a2420', washA: 1, w: 2, col: '#050303' });
      ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#fff'; ctx.fillRect(8, -150, 6, 120); ctx.restore();
      pop();
    }
    blob([[-66, -176], [-64, -280], [0, -306], [64, -280], [64, -176], [10, -176], [0, -236], [-10, -176]], { wash: '#f4eee2', washA: 1, w: 2.6, col: '#3a2a20', shade: { gap: 8, a: 0.16, col: '#6a5a50', ang: 1.3 } });
    // серый сюртук нараспашку
    blob([[-84, -478 + br], [84, -478 + br], [106, -360], [114, -200], [96, -150], [40, -164], [34, -300], [-34, -300], [-40, -164], [-98, -150], [-116, -200], [-106, -360]], { wash: CO, washA: 1, w: 3, col: COD, shade: { gap: 7, a: 0.26, col: '#2a2a30', ang: 1.1 } });
    blob([[-52, -470 + br], [52, -470 + br], [62, -330], [44, -292], [-44, -292], [-62, -330]], { wash: '#2e5a3a', washA: 1, w: 2.4, col: '#0e1a10' });       // мундир егеря
    const wv_ = blob([[-32, -460 + br], [32, -460 + br], [50, -360], [38, -298], [-38, -298], [-50, -360]], { wash: '#f4eee2', washA: 1, w: 2.2, col: '#3a2a20' }); // жилет, живот
    shadeG(wv_.path, 50, -380, -10, -380, '#a89a88', 0.5);
    for (let k = 0; k < 5; k++) ell(-2, -436 + k * 28, 4, 4, { wash: '#d8b040', washA: 1, w: 1 });
    pencil([[-50, -455 + br], [44, -302]], { w: 8, col: '#b02a2a', a: 0.85, pass2: false, gap: false });            // лента ордена
    push(-30, -420, 1); for (let q = 0; q < 5; q++) { const a = q / 5 * 6.283 - 1.57; poly([[0, 0], [Math.cos(a - 0.3) * 6, Math.sin(a - 0.3) * 6], [Math.cos(a) * 15, Math.sin(a) * 15], [Math.cos(a + 0.3) * 6, Math.sin(a + 0.3) * 6]], { wash: '#f4f0e8', washA: 1, w: 1, col: '#5a4a3a' }); } pop();
    // ближняя рука — за бортом жилета
    shape(tubeP(spline([[78, -458], [100, -390], [72, -362], [24, -378]], false, 6), 38, 30), { wash: '#74747c', washA: 1, w: 2.4, col: COD });
    blob([[16, -394], [34, -392], [34, -366], [16, -368]], { wash: SK, washA: 1, w: 1.8, col: SKD });
    // дальняя рука — подзорная труба у глаза / опущена / падает
    const up = st.scope, hand = up ? [-118, -548] : [-104, -330];
    shape(tubeP(spline(up ? [[-74, -460], [-130, -450], [-150, -500], hand] : [[-78, -460], [-110, -400], hand], false, 6), 38, 28), { wash: '#74747c', washA: 1, w: 2.4, col: COD });
    if (st.drop < 1) { const sx = hand[0] - 6, sy = hand[1] + st.drop * 380, ang = up ? -3.08 : -1.62 + st.drop * 4;
      push(sx, sy, 1, ang); rect(-24, -9, 120, 18, { wash: '#3a2a1e', washA: 1, w: 2, col: '#140a04' }); rect(50, -11, 80, 22, { wash: '#c99636', washA: 1, w: 2, col: '#5a3a08' }); rect(112, -14, 34, 28, { wash: '#f1d27a', washA: 1, w: 1.8, col: '#5a3a08' }); pop(); }
    ell(hand[0], hand[1], 15, 15, { wash: SK, washA: 1, w: 1.8, col: SKD });
    blob([[-48, -486 + br], [48, -486 + br], [40, -512], [-40, -512]], { wash: '#2e5a3a', washA: 1, w: 2, col: '#0e1a10' });  // ворот-стойка
    pencil([[-44, -490 + br], [44, -490 + br]], { w: 2.4, col: '#c8a040', pass2: false, gap: false });
    // голова 3/4 влево: щёки, двойной подбородок, чёлка
    push(0, -566 + br, 1, st.fire ? -0.07 : 0);
    const face = blob([[-50, 30], [-56, -8], [-46, -50], [0, -66], [44, -48], [54, -2], [46, 36], [16, 58], [-22, 56]], { wash: SK, washA: 1, w: 2.8, col: SKD });
    hatch(face.path, face.bb, { gap: 7, a: 0.14, col: '#8a5040', ang: 1.3, key: 401 });
    shadeG(face.path, 54, 0, 0, 0, '#b07a5a', 0.45);
    pencil([[-30, 50], [-4, 60], [24, 54]], { w: 2, col: SKD, a: 0.55, pass2: false });
    blob([[-56, -6], [-78, 14], [-60, 22], [-50, 18]], { wash: SK, washA: 1, w: 2.2, col: SKD });      // нос
    blob([[44, -12], [60, -8], [58, 16], [44, 18]], { wash: '#d8ac8c', washA: 1, w: 1.8, col: SKD });  // ухо
    const ey = -6, er = st.fire ? 8 : 5;
    if (!up) { ell(-34, ey, 9, 7, { wash: '#f8f2e8', washA: 1, w: 1.6, col: SKD }); ell(-36, ey, 4, er * 0.8, { wash: '#2a1a10', washA: 1, line: false }); }
    else pencil([[-44, ey], [-26, ey + 2]], { w: 2.6, pass2: false });
    ell(4, ey, 10, 7, { wash: '#f8f2e8', washA: 1, w: 1.6, col: SKD }); ell(0, ey, 4, er * 0.8, { wash: '#2a1a10', washA: 1, line: false });
    const brow = st.fire ? -9 : (st.tap ? 5 : 2);
    pencil([[-48, -20 - brow * 0.4], [-24, -18 + brow]], { w: 4, pass2: false }); pencil([[-12, -18 + brow], [16, -21 - brow * 0.4]], { w: 4, pass2: false });
    if (st.fire) blob([[-36, 30], [-26, 22], [-12, 26], [-12, 42], [-28, 46]], { wash: '#2a0a08', washA: 1, w: 2, col: SKD });
    else pencil([[-38, 34], [-24, 32 + (st.tap ? 3 : 0)], [-8, 36]], { w: 3, pass2: false });
    blob([[-44, -40], [-34, -64], [6, -72], [44, -52], [36, -34], [14, -48], [-4, -34], [-20, -44], [-30, -26]], { wash: '#2a1a12', washA: 1, w: 2, col: '#0a0604' });  // волосы
    blob([[-14, -40], [-24, -20], [-8, -30]], { wash: '#2a1a12', washA: 1, w: 1.6, col: '#0a0604' });                                                 // знаменитый локон
    push(0, -60, 1.08, -0.05);                                       // двууголка поперёк (en bataille)
    blob([[-134, 12], [-104, -32], [-42, -70], [0, -76], [42, -70], [104, -32], [134, 12], [72, -8], [0, -12], [-72, -8]], { wash: '#120e10', washA: 1, w: 2.8, col: '#000000', shade: { gap: 6, a: 0.25, col: '#3a3a44', ang: 0.2 } });
    pencil([[-126, 8], [-72, -12], [0, -16], [72, -12], [126, 8]], { w: 3, col: '#6a6070', a: 0.7, pass2: false, gap: false });
    ell(-66, -34, 13, 13, { wash: '#2a3a8a', washA: 1, w: 1.4 }); ell(-66, -34, 9, 9, { wash: '#f2ece0', washA: 1, line: false }); ell(-66, -34, 4, 4, { wash: '#c0302a', washA: 1, line: false });
    pencil([[-66, -46], [-66, -10]], { w: 2.4, col: '#e8b840', pass2: false, gap: false });
    pop();
    if (st.fire > 0) glow(-30, 0, 140, 'rgba(255,120,40,1)', 0.6 * st.fire);
    pop();
    if (st.fire > 0) glow(-60, -380, 300, 'rgba(255,110,40,1)', 0.4 * st.fire);
    pop();
  }
  function bigKey(x, y, s, rot, t, shine) {                         // огромный ключ: ушко-кольцо с узором, стержень, бородка
    push(x, y, s, rot);
    const g = '#d8a838', gD = '#6a4a0a';
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 22 / S; ctx.beginPath(); ctx.arc(0, -40, 35, 0, 6.3); ctx.stroke(); ctx.restore();
    pencil(ellPts(0, -40, 46, 46, 0, 0.08), { w: 3, col: gD, pass2: false }); pencil(ellPts(0, -40, 24, 24, 0, 0.08), { w: 2.6, col: gD, pass2: false });
    for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.78; ell(Math.cos(a) * 34, -40 + Math.sin(a) * 34, 7, 7, { wash: '#f4d070', washA: 1, w: 1.4, col: gD }); }
    rect(-11, 0, 22, 230, { wash: g, washA: 1, w: 3, col: gD }); rect(-16, 10, 32, 16, { wash: '#f0c860', washA: 1, w: 2, col: gD }); rect(-16, 70, 32, 12, { wash: '#f0c860', washA: 1, w: 2, col: gD });
    poly([[11, 170], [62, 170], [62, 196], [44, 196], [44, 212], [62, 212], [62, 232], [11, 232]], { wash: g, washA: 1, w: 3, col: gD });
    pencil([[-4, 6], [-4, 224]], { w: 3, col: '#fff2c0', a: 0.7, pass2: false, gap: false });
    if (shine > 0) { const ph = (t * 1.6) % 1; glow(0, lerp(-80, 230, ph), 60, 'rgba(255,245,200,1)', 0.8 * shine); glow(30, -70, 50, 'rgba(255,250,220,1)', shine * (0.6 + 0.4 * Math.sin(t * 14))); }
    pop();
  }

  // ---------------------------------------------------------------- мир
  WORLD.fire = (t, u, cat) => {
    const Tm = tm(), f = fireK(t), sk = smokeK(t);
    // небо: закат над Москвой (на востоке — сиреневое, подсвечено), при пожаре — кроваво-оранжевое
    lay(40, () => {
      vgrad(-1400, 1100, ['#241c44', '#4a3264', '#a05878', '#e8906c', '#ffcf8a']);
      if (f > 0) vgrad(-1400, 1100, ['#2a0808', '#5a1410', '#b8361a', '#ff7a2a', '#ffc060'], f * 0.9);
      for (let k = 0; k < 7; k++) { const r = rng(k * 9 + 2), x = ((r() * 1800 + t * 10) % 2200) - 500, y = 420 + r() * 380; push(x, y, 1); ctx.save(); ctx.scale(3.2, 1); glow(0, 0, 90 + r() * 60, f > 0 ? 'rgba(160,60,40,1)' : 'rgba(255,190,170,1)', 0.45, 'source-over'); ctx.restore(); pop(); }
      ctx.fillStyle = '#fff2d8'; for (let k = 0; k < 14; k++) { const r = rng(k + 40); ctx.globalAlpha = (0.3 + 0.4 * r()) * (1 - f); ctx.fillRect(r() * 1600 - 260, -500 + r() * 800, 3, 3); } ctx.globalAlpha = 1;
    });
    city(t, f, sk);
    // дым пожара над всем городом поднимается в небо
    lay(12, () => { if (sk > 0.02) for (let i = 0; i < 6; i++) { const r = rng(i * 17 + 3); smokeCol(-400 + i * 330 + r() * 80, 980, t + i, 1.6, sk * 0.55, 50 + i, true); } });
    // склон Поклонной горы с гвардией
    lay(4, () => {
      const hp = pathOf([[-1500, 1240], [-300, 1210], [300, 1190], [800, 1205], [1500, 1180], [2600, 1220], [2600, 3200], [-1500, 3200]]);
      wash(hp, f > 0 ? lerpC('#4a4a2a', '#5a3018', f) : '#4a4a2a', 1); hatch(hp, [-1500, 1180, 2600, 1500], { gap: 9, a: 0.3, col: '#1e1e0c', ang: -1.4, key: 21 });
      for (let i = 0; i < 9; i++) grenadier(-560 + i * 62, 1235, 0.42, t, i);
      for (let i = 0; i < 9; i++) grenadier(980 + i * 60, 1220, 0.4, t, i + 20);
      for (let k = 0; k < 3; k++) { const x = [-180, 1200, 1500][k]; glow(x, 1224, 30, 'rgba(255,160,60,1)', 0.8, 'lighter'); smokeCol(x, 1220, t + k * 2, 0.4, 0.35, 80 + k, false); }
      if (f > 0) glow(500, 1200, 900, 'rgba(255,90,30,1)', 0.25 * f);
    });
    haze('#e0a080', 0.06);
    lay(1.6, () => standard(150, 1420, t, f));
    lay(1.25, () => adjutant(1000, 1440, 0.92, t, t > EV.fire_no && t < EV.fire_no + 0.9 ? (t - EV.fire_no) / 0.9 : 0, f));
    lay(1, () => {
      // вершина холма
      const gp = pathOf([[-1600, 1360], [-200, 1338], [400, 1350], [900, 1330], [2700, 1345], [2700, 3400], [-1600, 3400]]);
      wash(gp, f > 0 ? lerpC('#5a5a2c', '#6a3a1a', f * 0.8) : '#5a5a2c', 1); hatch(gp, [-600, 1330, 1700, 1900], { gap: 8, a: 0.35, col: '#26240c', ang: -1.45, key: 23 });
      for (let k = 0; k < 40; k++) { const r = rng(k + 300), x = -500 + r() * 2200, y = 1345 + r() * 30, sw = Math.sin(t * 2 + k) * 5; pencil([[x, y], [x + sw + 4, y - 18 - r() * 18]], { w: 2.2, col: '#2a2a10', a: 0.7, pass2: false, gap: false }); }
      // Наполеон
      const scope = t < EV.fire_tap - 0.05, tap = t >= EV.fire_tap && t < EV.fire_burst, drop = clamp((t - EV.fire_burst - 0.1) / 0.45);
      napoleon(720, 1452, 0.95, t, { scope, tap, fire: f, drop: t > EV.fire_burst + 0.1 ? Math.pow(drop, 1.6) : 0 });
      // ключ за спиной Тома (рисуется до Тома — за телом)
      const P = catPose('fire', t, u), show = keyShow(t), fx = P.flip ? -1 : 1, hf = P.handF || [-82, -140];
      const kx = P.x + hf[0] * P.s * fx, ky = P.y + hf[1] * P.s;
      bigKey(kx, ky, 0.9 * P.s, lerp(0.35, 2.55, show), t, show);
      cat();
      note('ключи: 0 шт.', 900, 930, t, Tm.key + 0.15, EV.fire_burst, '#fff0d0', 46, -0.05, [[920, 960], [930, 1010], [935, 1060]]);
      note('ни души', 330, 820, t, EV.fire_empty, EV.fire_burst + 0.2, '#fff0d0', 50, 0.04, [[360, 850], [420, 900], [480, 960]]);
    });
    // передний план: трава, пепел и искры летят в камеру
    lay(0.6, () => {
      for (let k = 0; k < 22; k++) { const x = -300 + k * 80, sw = Math.sin(t * 1.8 + k) * 14; pencil([[x, 2300], [x + sw, 1880 + (k % 4) * 40]], { w: 7, col: k % 2 ? '#3a3a14' : '#4a4a1c', pass2: false, gap: false }); }
    });
    if (f > 0) scr(() => {
      for (let i = 0; i < 70; i++) { const r = rng(i * 13 + 7), ph = ((t - EV.fire_burst) * (0.55 + r() * 0.5) + r()) % 1, a0 = r() * 6.283, d = 80 + ph * ph * 1300;
        const x = 520 + Math.cos(a0) * d, y = 1000 + Math.sin(a0) * d * 0.8 - ph * 200, sz = 2 + ph * ph * 16;
        if (i % 3) glow(x, y, sz * 3, 'rgba(255,160,60,1)', f * (0.9 - ph * 0.3)); else { ctx.save(); ctx.globalAlpha = f * 0.8; ctx.fillStyle = '#3a2a26'; ctx.translate(x, y); ctx.rotate(t * 3 + i); ctx.fillRect(-sz, -sz * 0.4, sz * 2, sz * 0.8); ctx.restore(); } }
      screenFill('#ff5a1a', 0.1 * f, 'soft-light');
    });
    else scr(() => motes(26, [0, 600, W, 1800], '#ffe0b0', t, 31, { sp: 14, sz: 2.2, a: 0.5, tw: 1, add: 1, wob: 30 }));
  };
  const keyShow = t => { const Tm = tm(); return sm((t - Tm.key + 0.05) / 0.3) * (1 - sm((t - Tm.msk - 0.1) / 0.3)); };

  DIR.fire = {
    outfit: 'hussar', light: { side: 1, rim: '#ffc890' }, grade: ['#c0603a', 0.22],
    act: () => { const Tm = tm(); return [[S0.fire, 'sideeye'], [Tm.key - 0.04, 'smug'], [Tm.key + 0.32, 'wink'], [Tm.msk, 'sideeye'], [Tm.dozh, 'smug'], [Tm.city, 'talk'], [Tm.empty + 0.15, 'suspicious'], [EV.fire_burst, 'shock']]; },
    pose: (t, u, b) => {
      const Tm = tm(), show = keyShow(t), f = fireK(t), pt = t > Tm.city && t < EV.fire_burst;
      return Object.assign(b, {
        x: 300, y: 1458, s: 1.1,
        look: t >= EV.fire_burst ? [-0.2, -0.35] : show > 0.5 ? [0.05, 0.05] : pt ? [-0.4, -0.3] : [0.75, -0.05],
        handF: [lerp(-70, -130, show), lerp(-128, -230, show)],
        hand: pt ? [-150, -300] : t >= EV.fire_burst ? [40, -300] : [70, -150],
        point: pt, tilt: show * -0.08 + (t >= EV.fire_burst ? 0.04 : 0),
        squash: b.squash + (t > EV.fire_burst && t < EV.fire_burst + 0.25 ? 0.25 * (1 - (t - EV.fire_burst) / 0.25) : 0),
        sweat: t > EV.fire_burst + 0.15, tailUp: t > EV.fire_burst
      });
    },
    cam: () => { const Tm = tm(); return [[S0.fire, 600, 980, -1.25], [S0.fire + 0.55, 560, 1000, 0.06, 'x'], [Tm.key + 0.1, 470, 1050, 0.13], [Tm.msk + 0.1, 640, 1000, 0.1], [EV.fire_burst - 0.05, 560, 980, 0.12], [EV.fire_burst + 0.55, 540, 930, -0.32, 'x'], [S1.fire + 0.6, 540, 920, -0.38]]; }
  };

  // ---------------------------------------------------------------- переход В сцену: кадр прогорает, как бумага
  const burnC = document.createElement('canvas'); burnC.width = W; burnC.height = H; const bx = burnC.getContext('2d');
  const HOLES = (() => { const r = rng(1812), L = [];
    const seeds = [[0, 0, 0], [W, 0, 0.05], [0, H, 0.08], [W, H, 0.02], [W / 2, 0, 0.18], [0, H / 2, 0.12], [W, H * 0.45, 0.15], [W / 2, H, 0.2], [W * 0.62, H * 0.42, 0.3], [W * 0.3, H * 0.66, 0.36]];
    for (const [x, y, d] of seeds) L.push({ x: x + (r() - 0.5) * 120, y: y + (r() - 0.5) * 120, d, sp: 1900 + r() * 700, p1: r() * 6.28, p2: r() * 6.28, p3: r() * 6.28 });
    return L; })();
  const holeR = (h, k, a) => { const R = Math.max(0, (k - h.d)) * h.sp; return R * (1 + 0.16 * Math.sin(3 * a + h.p1) + 0.09 * Math.sin(7 * a + h.p2) + 0.05 * Math.sin(13 * a + h.p3)); };
  const holePath = (h, k, grow = 0) => { const p = new Path2D(); for (let i = 0; i <= 72; i++) { const a = i / 72 * 6.2832, R = holeR(h, k, a) + grow; const x = h.x + Math.cos(a) * R, y = h.y + Math.sin(a) * R; i ? p.lineTo(x, y) : p.moveTo(x, y); } p.closePath(); return p; };
  const inHole = (x, y, k, skip) => HOLES.some((h, j) => j !== skip && Math.hypot(x - h.x, y - h.y) < holeR(h, k, Math.atan2(y - h.y, x - h.x)) - 4);
  TRANS_IN.fire = { a: 0.42, b: 0.42, fx(k, t, A, B) {
    const kk = Math.pow(k, 1.15);
    drawBuf(B);
    bx.setTransform(1, 0, 0, 1, 0, 0); bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1; bx.clearRect(0, 0, W, H); bx.drawImage(A, 0, 0);
    // подпалина: бумага темнеет и желтеет к краю дыр
    bx.globalCompositeOperation = 'source-atop';
    for (const h of HOLES) { if (kk <= h.d) continue; const R = holeR(h, kk, 0); const g = bx.createRadialGradient(h.x, h.y, R * 0.8, h.x, h.y, R * 1.25 + 140); g.addColorStop(0, 'rgba(40,16,6,0.95)'); g.addColorStop(0.35, 'rgba(120,60,20,0.55)'); g.addColorStop(1, 'rgba(160,110,40,0)'); bx.fillStyle = g; bx.fillRect(0, 0, W, H); }
    bx.lineJoin = 'round';
    for (const h of HOLES) { if (kk <= h.d) continue; const p = holePath(h, kk); bx.strokeStyle = '#1a0a04'; bx.lineWidth = 46; bx.stroke(p); }
    for (const h of HOLES) { if (kk <= h.d) continue; const p = holePath(h, kk); bx.globalCompositeOperation = 'source-atop'; bx.strokeStyle = '#ff7a20'; bx.lineWidth = 16; bx.stroke(p); bx.strokeStyle = '#ffd890'; bx.lineWidth = 5; bx.stroke(p); }
    bx.globalCompositeOperation = 'destination-out'; bx.fillStyle = '#000'; for (const h of HOLES) { if (kk <= h.d) continue; bx.fill(holePath(h, kk)); }
    if (kk < 0.995) drawBuf(burnC);
    // тлеющее свечение и языки пламени по кромке, пепел летит
    scr(() => {
      for (let j = 0; j < HOLES.length; j++) { const h = HOLES[j]; if (kk <= h.d) continue;
        for (let i = 0; i < 26; i++) { const a = i / 26 * 6.2832 + h.p1, R = holeR(h, kk, a), x = h.x + Math.cos(a) * (R + 10), y = h.y + Math.sin(a) * (R + 10);
          if (x < -60 || x > W + 60 || y < -60 || y > H + 60 || inHole(x, y, kk, j)) continue;
          glow(x, y, 50, 'rgba(255,120,30,1)', 0.45); if (i % 2 === 0) flame(x, y + 10, 40 + 50 * rng(i + j * 40)(), 26, t, i + j * 50, 0.9); } }
      for (let i = 0; i < 60; i++) { const r = rng(i * 7 + 3), ph = (k * (1.2 + r()) + r()) % 1, x = r() * W + Math.sin(t * 3 + i) * 40, y = H * (1 - ph) - 100, sz = 3 + r() * 10;
        ctx.save(); ctx.globalAlpha = 0.85 * Math.sin(k * Math.PI); ctx.fillStyle = i % 3 ? '#2a1a14' : '#ff9a40'; if (i % 3 === 0) ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(t * 4 + i); ctx.fillRect(-sz, -sz * 0.5, sz * 2, sz); ctx.restore(); }
    });
  } };
})();
