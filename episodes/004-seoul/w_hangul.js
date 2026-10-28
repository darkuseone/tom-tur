/* 004 — сцена `hangul`: 1446, зал учёных во дворце. За троном — ширма «Солнце, луна и пять вершин», король Седжон в красном халате
   с золотыми драконами, учёные за низкими столиками, тушечницы, книги, утренние лучи сквозь бумажные двери, расписные балки.
   Большой свиток «훈민정음»: на «алфавит» буквы загораются по одной. На «умный… за утро» — учёный-отличник тянет руку, солнце в окне;
   на «глупый… за десять дней» — второй чешет голову, листки календаря 1→10. Том-сонби пишет кистью «ㄱ» на столике.
   Переход В сцену — буквы хангыля слетаются и заливают кадр тушью. */
(() => {
  EV.hg_abc = wtk('s4', 'алфавит:');
  EV.hg_smart = wtk('s4', 'умный');
  EV.hg_morning = wtk('s4', 'утро,');
  EV.hg_dumb = wtk('s4', 'глупый');
  EV.hg_ten = wtk('s4', 'десять');
  KEYW.push('алфавит:', 'утро,', 'дней!');
  const JAMO = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'];

  function hall(t) {                                                   // зал: пол, колонны, балки с данчхоном, бумажные двери, лучи
    screenFill('#3a2418', 1);
    const fl = shape([[-400, 1180], [1480, 1180], [1480, 2400], [-400, 2400]], { wash: '#b88a52', washA: 1, w: 1, col: '#000', a: 0.3 });
    ctx.save(); ctx.clip(fl.path); for (let k = -10; k <= 10; k++) pencil([[540 + k * 70, 1180], [540 + k * 240, 2400]], { w: 2, col: '#8a5a2a', a: 0.5, pass2: false, gap: false }); ctx.restore();
    rect(-400, 300, 1880, 880, { wash: '#d8c49a', washA: 1, w: 1, col: '#000', a: 0.2 });
    for (const [x0, x1] of [[-400, 120], [960, 1480]]) { const dp = rect(x0, 380, x1 - x0, 800, { wash: '#f6ecd0', washA: 1, w: 2, col: '#4a2a14' }); ctx.save(); ctx.clip(dp.path);
      for (let x = x0; x < x1; x += 34) pencil([[x, 380], [x, 1180]], { w: 3, col: '#7a4a24', a: 0.7, pass2: false, gap: false }); for (let y = 380; y < 1180; y += 34) pencil([[x0, y], [x1, y]], { w: 3, col: '#7a4a24', a: 0.7, pass2: false, gap: false });
      glow((x0 + x1) / 2, 700, 400, 'rgba(255,236,190,1)', 0.5 + 0.3 * sm((t - EV.hg_morning) / 0.6)); ctx.restore(); }
    rays(1000, 500, 2.5, 0.5, 1400, 'rgba(255,230,170,0.5)', 0.35 + 0.35 * sm((t - EV.hg_morning) / 0.6), 6, t); rays(80, 500, 0.7, 0.5, 1200, 'rgba(255,230,170,0.5)', 0.3, 5, t + 3);
    for (const x of [120, 960]) { const cp = rect(x - 26, 260, 52, 920, { wash: KO.col, washA: 1, w: 2, col: '#2a0a06' }); shadeG(cp.path, x + 26, 0, x - 26, 0, KO.colD, 0.6); }
    const bm = rect(-400, 220, 1880, 90, { wash: KO.green, washA: 1, w: 2, col: '#0e2a22' });
    for (let x = -380; x < 1480; x += 90) { ell(x, 265, 30, 26, { wash: '#e8783a', washA: 1, w: 1.4, col: '#3a1a0a' }); ell(x, 265, 18, 15, { wash: '#f4e8c8', washA: 1, w: 1, col: '#3a1a0a' }); ell(x, 265, 8, 7, { wash: '#2a4aa8', washA: 1, line: false }); for (const sd of [-1, 1]) pencil([[x + sd * 32, 240], [x + sd * 44, 290]], { w: 3, col: '#c8302a', pass2: false }); }
    rect(-400, -200, 1880, 420, { wash: '#2a1a10', washA: 1, w: 1, col: '#000', a: 0.3 }); for (let x = -380; x < 1480; x += 60) pencil([[x, -200], [x + 20, 220]], { w: 10, col: '#4a2a18', pass2: false });
  }
  function screenIrwo(t) {                                             // ширма «Солнце, луна и пять вершин» за троном
    const x0 = 300, x1 = 780, y0 = 360, y1 = 860;
    const sp = rect(x0, y0, x1 - x0, y1 - y0, { wash: '#2a5a8a', washA: 1, w: 4, col: '#2a1a0a' });
    ctx.save(); ctx.clip(sp.path);
    const peaks = [[340, 760, 70], [430, 700, 110], [540, 640, 150], [650, 700, 110], [740, 760, 70]];
    for (const [px, py, h] of peaks) { const P = [[px - h * 0.9, 860], [px - h * 0.4, py + h * 0.3], [px, py], [px + h * 0.4, py + h * 0.3], [px + h * 0.9, 860]]; const pp = shape(P, { wash: '#2a7a5a', washA: 1, w: 2, col: '#0e2a1a' }); hatch(pp.path, pp.bb, { gap: 6, a: 0.3, col: '#0e2a1a', ang: 1, w: 1 }); pencil([[px - h * 0.2, py + h * 0.2], [px, py], [px + h * 0.2, py + h * 0.2]], { w: 3, col: '#a8d8b8', a: 0.8, pass2: false }); }
    ell(380, 470, 36, 36, { wash: '#d8301e', washA: 1, w: 2, col: '#5a0a0a' }); ell(700, 470, 32, 32, { wash: '#f6f0e0', washA: 1, w: 2, col: '#6a6a6a' });
    for (let k = 0; k < 6; k++) pencil(spline([[300 + k * 90, 860], [320 + k * 90, 820 + Math.sin(t * 2 + k) * 6], [340 + k * 90, 860]], false, 6), { w: 4, col: '#e8f4ff', a: 0.8, pass2: false });
    for (const px of [330, 750]) { pencil([[px, 860], [px, 600]], { w: 10, col: '#a8563a' }); ell(px, 590, 40, 30, { wash: '#2f5a34', washA: 1, w: 1.6, col: '#0e2410' }); }
    ctx.restore();
    for (let k = 1; k < 4; k++) pencil([[x0 + k * (x1 - x0) / 4, y0], [x0 + k * (x1 - x0) / 4, y1]], { w: 3, col: '#c8a040', a: 0.8, pass2: false });
    rect(x0 - 14, y0 - 14, x1 - x0 + 28, 18, { wash: '#c8a040', washA: 1, w: 1.6, col: '#5a3a08' });
  }
  function king(t) {                                                   // Седжон на троне
    const x = 540, y = 1010;
    rect(x - 200, y, 400, 60, { wash: '#8a2a1a', washA: 1, w: 2, col: '#2a0a04' }); for (let k = 0; k < 4; k++) rect(x - 180 + k * 10, y + 60 + k * 18, 360 - k * 20, 18, { wash: '#a8a294', washA: 1, w: 1.4, col: '#3a362e' });
    const th = rect(x - 110, y - 200, 220, 210, { wash: '#a8301e', washA: 1, w: 2.4, col: '#2a0a04' }); goldBand([[x - 110, y - 200], [x + 110, y - 200]], 12, 9600, {});
    human(x, y + 20, 0.92, t, { body: '#c41e1a', bodyD: '#5a0a08', legs: '#3a1a10', long: 1, hat: 'ikseon', hair: '#1a1614', beard: 'short', face: t > EV.hg_dumb ? 'grin' : 'smile', armR: t > EV.hg_abc && t < EV.hg_smart ? 'point' : 'hold', armL: 'hold', belt: '#d6a842', seed: 80 });
    const dy = y + 20 - 0.92 * 190; ell(x, dy, 22, 22, { wash: '#d6a842', washA: 1, w: 1.6, col: '#6a4a08' }); pencil(spline([[x - 12, dy + 8], [x - 4, dy - 10], [x + 8, dy + 4], [x + 14, dy - 8]], false, 8), { w: 2.4, col: '#8a1a0a', pass2: false });
    for (const sd of [-1, 1]) ell(x + sd * 46, dy - 20, 14, 14, { wash: '#d6a842', washA: 1, w: 1.2, col: '#6a4a08' });
  }
  function scroll(t) {                                                 // свиток «훈민정음» с буквами — загораются по одной
    const x = 960, y = 440, w = 300, h = 560;
    pencil([[x - w / 2 - 20, y - 12], [x + w / 2 + 20, y - 12]], { w: 14, col: '#6a3a1a' }); for (const sd of [-1, 1]) ell(x + sd * (w / 2 + 24), y - 12, 12, 12, { wash: '#c8a040', washA: 1, w: 1.4, col: '#5a3a08' });
    const sp = rect(x - w / 2, y, w, h, { wash: '#f2e6c4', washA: 1, w: 2.4, col: '#4a3a1a' }); hatch(sp.path, sp.bb, { gap: 9, a: 0.06, col: '#8a6a3a', ang: 1.5, w: 1 });
    txt('훈민정음', x, y + 50, 50, { font: 'KSign', col: '#2a1a10', bold: false });
    JAMO.forEach((j, i) => { const c = i % 4, r = Math.floor(i / 4), jx = x - 105 + c * 70, jy = y + 130 + r * 80, ti = EV.hg_abc + i * 0.08, k = popK(t, ti, 0.3);
      if (t < ti) { txt(j, jx, jy, 46, { font: 'KHand', col: '#b8a888', a: 0.5, bold: false }); return; }
      if (t - ti < 0.4) glow(jx, jy, 50, 'rgba(255,200,90,1)', 0.8 * (1 - (t - ti) / 0.4));
      push(jx, jy, 0.7 + 0.3 * k); txt(j, 0, 0, 50, { font: 'KHand', col: i < 14 ? '#1a1410' : '#a8201a', bold: false }); pop(); });
    rect(x + 90, y + h - 70, 44, 44, { wash: '#c8302a', washA: 0.85, w: 1.4, col: '#5a0a0a' }); txt('印', x + 112, y + h - 48, 28, { font: 'KSign', col: '#f6e8d0', bold: false });
  }
  function scholars(t) {                                               // учёные за столиками: отличник тянет руку, второй чешет затылок
    const desk = (x, y, s) => { push(x, y, s); rect(-110, -70, 220, 26, { wash: '#6a3a1a', washA: 1, w: 2, col: '#1a0a04' }); for (const sx of [-96, 86]) rect(sx, -44, 10, 44, { wash: '#4a2a10', washA: 1, w: 1.4, col: '#1a0a04' });
      rect(-80, -96, 90, 26, { wash: '#efe4c4', washA: 1, w: 1.4, col: '#4a3a1a' }); ell(50, -80, 24, 10, { wash: '#1a1a1e', washA: 1, w: 1.4, col: '#000' }); pencil([[20, -84], [40, -120]], { w: 4, col: '#6a4a2a', pass2: false }); pop(); };
    // отличник слева-центр
    const sm1 = t > EV.hg_smart; human(640, 1250, 0.82, t, { body: '#dfe8e0', legs: '#c8d0c8', long: 1, hat: 'gat', face: sm1 ? 'smile' : 'calm', armR: sm1 ? 'up' : 'hold', armL: 'hold', belt: '#3a5a8a', seed: 81, look: 0.4 }); desk(640, 1290, 0.8);
    if (t > EV.hg_morning) { const k = popK(t, EV.hg_morning, 0.3); push(700, 880, k); ell(0, 0, 44, 44, { wash: '#ffd24a', washA: 1, w: 2, col: '#8a5a08' }); for (let q = 0; q < 10; q++) { const a = q / 10 * 6.283 + t; pencil([[Math.cos(a) * 54, Math.sin(a) * 54], [Math.cos(a) * 76, Math.sin(a) * 76]], { w: 5, col: '#ffb030', pass2: false }); } pencil([[-18, 2], [-4, 18], [22, -16]], { w: 8, col: '#2a5a1a', pass2: false }); pop(); }
    // «глупый» справа
    const dm = t > EV.hg_dumb, scr_ = Math.sin(t * 14) * 6; human(900, 1270, 0.84, t, { body: '#e8dcc0', legs: '#c8bc9c', long: 1, hat: 'gat', face: dm ? 'shock' : 'calm', armR: dm ? 'up' : 'hold', armL: 'hold', belt: '#7a2a2a', seed: 82, flip: -1, look: -0.3 }); desk(900, 1310, 0.8);
    if (dm) { for (let q = 0; q < 3; q++) txt('?', 930 + q * 34, 880 - q * 30 + scr_, 50 + q * 6, { font: 'Osw', col: '#c8302a', a: clamp((t - EV.hg_dumb - q * 0.15) / 0.2) }); }
    if (t > EV.hg_ten - 0.1) { const n = Math.min(10, 1 + Math.floor((t - EV.hg_ten + 0.1) / 0.09)); push(1000, 1060, 0.9, 0.05); for (let q = 0; q < 3; q++) rect(-60 + q * 3, -70 - q * 3, 120, 140, { wash: '#f6f0e2', washA: 1, w: 1.6, col: '#4a3a1a' });
      rect(-60, -70, 120, 30, { wash: '#c8302a', washA: 1, w: 1.4, col: '#3a0a0a' }); txt('ДЕНЬ', 0, -55, 22, { font: 'Osw', col: '#fff6e0' }); txt(String(n), 0, 14, 72, { font: 'Osw', col: '#1a1410' }); pop(); }
    // ещё учёные на заднем плане
    for (const [x, c] of [[240, '#e8e2d2'], [770, '#dfe8e0']]) human(x, 1150, 0.62, t, { body: c, legs: '#c8c0b0', long: 1, hat: 'gat', armR: 'hold', armL: 'hold', prop: 'scroll', seed: x });
  }
  function tomDesk(t) {                                                // столик Тома: бумага, тушь, буква «ㄱ» проявляется
    rect(80, 1500, 520, 40, { wash: '#7a4224', washA: 1, w: 2.4, col: '#1a0a04' }); for (const sx of [100, 560]) rect(sx, 1540, 22, 120, { wash: '#5a2a10', washA: 1, w: 1.6, col: '#1a0a04' });
    rect(180, 1440, 260, 70, { wash: '#f6ecd0', washA: 1, w: 1.8, col: '#4a3a1a' });
    const k = clamp((t - EV.hg_abc) / 0.8); if (k > 0) { ctx.save(); ctx.beginPath(); ctx.rect(180, 1440, 260 * k + 10, 70); ctx.clip(); txt('ㄱㄴㄷ', 310, 1478, 56, { font: 'KHand', col: '#1a1410', bold: false }); ctx.restore(); }
    ell(500, 1476, 36, 14, { wash: '#1a1a20', washA: 1, w: 1.6, col: '#000' });
  }

  WORLD.hangul = (t, u, cat) => {
    lay(6, () => { hall(t); screenIrwo(t); scroll(t); });
    lay(3.4, () => king(t));
    lay(1.6, () => scholars(t));
    lay(1, () => { motes(30, [-100, 200, 1180, 1400], '#fff2c8', t, 9610, { sp: 8, sz: 2.4, a: 0.6, tw: 1, wob: 30 }); cat(); tomDesk(t); });
  };
  DIR.hangul = {
    outfit: 'seonbi', light: { side: 1, rim: '#fff0c8' }, grade: ['#d8a050', 0.12],
    act: () => [[S0.hangul, 'proud'], [EV.hg_abc, 'talk'], [EV.hg_smart, 'smug'], [EV.hg_dumb - 0.04, 'laugh'], [EV.hg_ten + 0.3, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1470, s: 1.0, look: t < EV.hg_smart ? [0.2, 0.4] : t < EV.hg_dumb ? [0.6, -0.1] : [0.7, 0],
      hand: t < EV.hg_dumb ? [150, -160 + Math.sin(t * 6) * 8] : [120, -300], tilt: t > EV.hg_dumb ? 0.07 : 0 }),
    afterCat: (t, u, P) => { const h = P.hand || [0, 0], x = P.x + h[0] * P.s, y = P.y + h[1] * P.s; push(x, y, 1, -0.5 + Math.sin(t * 5) * 0.12); pencil([[0, 20], [0, -110]], { w: 7, col: '#c8a060' }); pencil([[0, -40], [0, -44]], { w: 9, col: '#5a3a1a', pass2: false }); blob([[-6, 20], [6, 20], [3, 54], [0, 62], [-3, 54]], { wash: '#141414', washA: 1, w: 1.4, col: '#000' }); pop(); },
    cam: () => [[S0.hangul, 560, 880, 0.18], [S0.hangul + 0.6, 560, 960, 0.06], [EV.hg_smart, 520, 1020, 0.08], [EV.hg_dumb, 600, 1040, 0.1], [S1.hangul, 620, 1060, 0.14]],
    hud: t => { if (t > EV.hg_morning && t < S1.hangul) note('утро', 700, 760, t, EV.hg_morning, S1.hangul, '#fff2d8', 52, -0.04); if (t > EV.hg_ten) note('10 дней', 880, 520, t, EV.hg_ten, S1.hangul, '#fff2d8', 52, 0.03); }
  };

  // ---------------------------------------------------------------- переход В hangul: буквы слетаются и заливают кадр тушью
  TRANS_IN.hangul = { a: 0.35, b: 0.35, fx(k, t, A, B) {
    if (k < 0.55) drawBuf(A); else drawBuf(B);
    scr(() => { const r = rng(9620); const ink = k < 0.55 ? sm(k / 0.55) : 1 - sm((k - 0.55) / 0.45);
      ctx.save(); ctx.globalAlpha = ink * 0.92; ctx.fillStyle = '#16100c'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 40; i++) { const sx = r() < 0.5 ? -200 : W + 200, sy = r() * H, tx = r() * W, ty = r() * H, d = r() * 0.25, kk = clamp((k - d) / 0.4), x = lerp(sx, tx, sm(kk)), y = lerp(sy, ty, sm(kk));
        if (kk <= 0) continue; const fade = k > 0.55 ? 1 - sm((k - 0.55) / 0.45) : 1; txt(JAMO[i % JAMO.length], x, y, 120 + r() * 180, { font: 'KSign', col: i % 3 ? '#f2e6c4' : '#e8a33c', a: 0.95 * fade, bold: false, rot: (r() - 0.5) * 0.6 }); } });
  } };
})();
