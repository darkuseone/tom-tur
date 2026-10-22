/* 010 — сцена `aurora`: ночь 25 октября 1917. Слева на Неве крейсер «Аврора», справа за рекой — Зимний в редких огнях, морось,
   прожектора. На «дала» — вспышка из баковой пушки и жалкий дымок, штамп «ХОЛОСТОЙ». На «кино» — кадр превращается в съёмочную
   площадку «Октября» (1927): перфорация плёнки по краям, сепия, юпитеры, кинокамера на треноге с оператором, режиссёр с рупором,
   массовка с флагами штурмует, в окнах Зимнего бьются стёкла и полыхает. Том-комиссар хохочет. Переход В сцену — луч прожектора
   прорезает кадр и раскрывает новую эпоху. */
(() => {
  EV.au_shot = wtk('s7', 'дала');
  EV.au_blank = wtk('s7', 'холостой');
  EV.au_film = wtk('s7', 'кино');
  EV.au_storm = wtk('s7', 'сильнее');
  KEYW.push('холостой.', 'штурме!');
  SHAKES.push([EV.au_shot, 0.2, 5], [EV.au_storm, 0.35, 9]);
  const film = t => sm((t - EV.au_film + 0.1) / 0.4);
  const smash = t => sm((t - EV.au_storm) / 0.5);

  function sky(t) { vgrad(-900, 1100, ['#0a1020', '#18223a', '#2a3450', '#4a4a5a'], 1); const r = rng(10300); ctx.save(); ctx.fillStyle = '#e8ecf6'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.3 + 0.4 * Math.abs(Math.sin(t + i)); ctx.fillRect(r() * 1600 - 260, r() * 700 - 300, 2, 2); } ctx.restore();
    for (const [x, a0, sp] of [[1100, -2.2, 0.5], [-100, -1.0, -0.4]]) rays(x, 1100, a0 + Math.sin(t * sp) * 0.3, 0.06, 1600, 'rgba(220,230,255,0.5)', 0.18, 2, t); }
  function farBank(t) {                                                // Зимний за Невой, огни, люди-точки
    const f = film(t), sm2 = smash(t);
    winterPalace(380, 1020, 1100, 240, t, { lit: true, col: lerpC('#3a6a64', '#6a8a7a', f) });
    if (f > 0) { for (let q = 0; q < 9; q++) { const x = 420 + q * 115, y = 900 + (q % 2) * 90; if (sm2 > 0) { glow(x, y, 120, 'rgba(255,140,60,1)', 0.6 * sm2 * (0.8 + 0.2 * Math.sin(t * 13 + q))); for (let s = 0; s < 4; s++) { const r = rng(10310 + q * 4 + s), d = sm2 * (60 + r() * 140); poly([[x + r() * 30 - 15 + (r() - 0.5) * d, y - r() * d], [x + 10 + (r() - 0.5) * d, y + 8 - r() * d * 0.5], [x - 8 + (r() - 0.5) * d, y + 12]], { wash: '#d8ecf6', washA: 0.8 * (1 - sm2 * 0.5), w: 1, col: '#4a6a7a' }); } } } }
    if (f > 0) crowd(380, 1480, 1040, 50, t, 10325, { s: 0.42 * f, cols: ['#2a2a2e', '#3a3028', '#1e2a22', '#4a3a2a', '#2a2a3a'], flags: 0.35, flag: (x, y, s) => shape([[x - 20 * s, y - 14 * s], [x + 26 * s, y - 12 * s], [x + 24 * s, y + 14 * s], [x - 20 * s, y + 12 * s]], { wash: '#c8201e', washA: 1, w: 1, col: '#3a0a0a' }) });
    const r = rng(10320); for (let i = 0; i < 20; i++) { const x = 400 + r() * 1000, y = 1030; rect(x, y - 10, 4, 10, { wash: '#1a1a20', washA: 1, line: false }); }
  }
  function river(t) { neva(1030, 1360, t, { top: '#1a2a3a', bot: '#0a1420', lineCol: '#f6d48a' }); for (let i = 0; i < 12; i++) { const x = 420 + i * 90; pencil([[x, 1060 + (i % 3) * 30], [x + 30, 1060 + (i % 3) * 30]], { w: 3, col: '#f6d48a', a: 0.4, pass2: false }); } }
  function cruiser(t) {
    const fl = t > EV.au_shot && t < EV.au_shot + 0.25 ? 1 - (t - EV.au_shot) / 0.25 : 0;
    aurora(640, 1160, 0.85, t, { smoke: 1, flash: fl, col: '#8a9098' }); for (let q = 0; q < 14; q++) ell(640 + (-360 + q * 52) * 0.85, 1160 - 72 * 0.85, 5, 5, { wash: '#f6d48a', washA: 0.9, line: false }); glow(640, 1100, 500, 'rgba(255,210,130,1)', 0.08);
    if (t > EV.au_shot) { const k = sm((t - EV.au_shot) / 1.2); for (let q = 0; q < 3; q++) ell(640 + 450 * 0.85 + 30 + q * 24 + k * 60, 1160 - 154 * 0.85 - q * 10 - k * 50, 24 + k * 30, 18 + k * 20, { wash: '#c8c8c8', washA: 0.7 * (1 - k), line: false }); }
    if (fl > 0) glow(640 + 450 * 0.85, 1160 - 130 * 0.85, 220, 'rgba(255,230,170,1)', fl);
  }
  function filmSet(t) {                                                // съёмочная площадка: юпитеры, камера, режиссёр, массовка
    const f = film(t); if (f <= 0) return;
    push(0, (1 - f) * 400, 1);
    if (0) crowd(-100, 1500, 1405, 34, t, 10330, { s: 1.05, cols: ['#2a2a2e', '#3a3028', '#1e2a22', '#4a3a2a', '#2a2a3a'], flags: 0.3, flag: (x, y, s) => { const wv = Math.sin(x) * 5; shape([[x - 20 * s, y - 14 * s], [x + 26 * s, y - 12 * s + wv], [x + 24 * s, y + 14 * s + wv], [x - 20 * s, y + 12 * s]], { wash: '#c8201e', washA: 1, w: 1, col: '#3a0a0a' }); } });
    for (const [x, ang] of [[1020, -2.4], [520, -1.9]]) { pencil([[x, 1460], [x, 1300]], { w: 8, col: '#1a1a1e' }); push(x, 1290, 1, ang + Math.PI / 2); rect(-40, -30, 80, 60, { wash: '#2a2a30', washA: 1, w: 2, col: '#000' }); pop(); rays(x, 1290, ang, 0.25, 1200, 'rgba(255,248,220,0.6)', 0.25, 2, t); glow(x, 1290, 80, 'rgba(255,250,230,1)', 0.8); }
    pop();
  }
  function crew(t) {                                                   // оператор у кинокамеры и режиссёр с рупором — передний план справа
    const f = film(t); if (f <= 0) return; push(0, (1 - f) * 500, 1);
    const cx = 760, cy = 1460; for (const lx of [-60, 0, 60]) pencil([[cx, cy - 250], [cx + lx, cy]], { w: 6, col: '#3a2a1a' });
    push(cx, cy - 290, 1); rect(-70, -50, 140, 90, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); for (const rx of [-40, 40]) { ell(rx, -90, 40, 40, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); pencil([[rx, -90], [rx + Math.cos(t * 9) * 36, -90 + Math.sin(t * 9) * 36]], { w: 3, col: '#8a8a8a', pass2: false }); }
    rect(70, -20, 40, 30, { wash: '#4a4a4e', washA: 1, w: 2, col: '#000' }); pop();
    human(900, 1470, 0.92, t, { body: '#3a3a40', legs: '#2a2a2e', hair: '#2a1a10', hat: 'cap', hatCol: '#3a3a3a', face: 'calm', armR: 'hold', armL: 'hold', seed: 800, flip: -1 }); pencil([[870, 1470 - 260 * 0.92], [840 + Math.sin(t * 9) * 14, 1470 - 230 * 0.92]], { w: 8, col: '#3a3a40' });
    human(560, 1480, 0.9, t, { body: '#e8e0cc', legs: '#3a3a40', hair: '#3a2210', face: t > EV.au_storm ? 'grin' : 'angry', armR: 'up', armL: 'point', seed: 801, flip: -1 });
    push(560 - 70 * 0.9, 1480 - 320 * 0.9, 1, -0.4 + Math.PI); poly([[0, -14], [70, -34], [70, 34], [0, 14]], { wash: '#d8d0b8', washA: 1, w: 2, col: '#2a2a2a' }); pop();
    pop();
  }

  WORLD.aurora = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => farBank(t));
    lay(6, () => { river(t); cruiser(t); });
    lay(3, () => filmSet(t));
    lay(1, () => { embank(1420, t, { lit: 1, lamps: 1 }); const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#4a4a52', washA: 1, w: 1, col: '#000', a: 0.3 }); crew(t); cat(); });
    lay(0.65, () => { const r = rng(10340); for (let i = 0; i < 60; i++) { const x = r() * 1500 - 200, y = ((r() * 2200 + t * 500) % 2200) - 200; pencil([[x, y], [x - 6, y + 30]], { w: 1.6, col: '#c8d0e0', a: 0.35, pass2: false, gap: false }); }
      if (film(t) > 0) haze('#8a6a40', 0.22 * film(t)); });
  };
  DIR.aurora = {
    outfit: 'komissar', light: { side: -1, rim: '#ffe0b0' }, grade: ['#3a4a6a', 0.14],
    act: () => [[S0.aurora, 'proud'], [EV.au_shot + 0.1, 'sideeye'], [EV.au_film, 'smug'], [EV.au_storm, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1470, s: 1.04, look: t < EV.au_film ? [0.6, -0.3] : [0.5, -0.1], hand: t > EV.au_storm ? [60, -250] : [110, -260], handF: t > EV.au_storm ? [-60, -250] : undefined, nod: t > EV.au_storm ? Math.sin(t * 14) * 0.04 : 0 }),
    cam: () => [[S0.aurora, 560, 1000, 0.08], [EV.au_shot, 560, 1060, 0.14], [EV.au_film, 540, 1000, 0.02, 'x'], [EV.au_storm, 520, 980, 0.06], [S1.aurora, 540, 1000, 0.12]],
    hud: t => {
      if (t > EV.au_blank && t < EV.au_film + 0.3) { const k = popK(t, EV.au_blank, 0.3); push(560, 620, 1.6 - 0.6 * k, -0.12); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = '#c8201e'; ctx.lineWidth = 10; ctx.strokeRect(-260, -70, 520, 140); ctx.restore(); txt('ХОЛОСТОЙ', 0, 6, 100, { font: 'Osw', col: '#c8201e', a: k }); pop(); }
      const f = film(t); if (f > 0) { ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, 70, H); ctx.fillRect(W - 70, 0, 70, H); ctx.fillStyle = '#e8dcc0'; const off = (t * 300) % 90; for (let y = -90 + off; y < H; y += 90) { ctx.fillRect(18, y, 34, 50); ctx.fillRect(W - 52, y, 34, 50); } ctx.restore();
        const r = rng(Math.floor(t * 12)); for (let q = 0; q < 3; q++) { const x = 100 + r() * 880; pencil([[x, 0], [x + (r() - 0.5) * 20, H]], { w: 1.4, col: '#f6ecd6', a: 0.25, pass2: false, gap: false }); }
        push(860, 440, popK(t, EV.au_film, 0.35), 0.06); rect(-130, -60, 260, 120, { wash: '#1a1a1a', washA: 1, w: 3, col: '#000' }); for (let q = 0; q < 6; q++) poly([[-130 + q * 46, -60], [-100 + q * 46, -60], [-120 + q * 46, -90], [-150 + q * 46, -90]], { wash: q % 2 ? '#f2ece0' : '#1a1a1a', washA: 1, w: 1, col: '#000' }); txt('ОКТЯБРЬ', 0, -16, 40, { font: 'Osw', col: '#f2ece0' }); txt('1927', 0, 30, 36, { font: 'Osw', col: '#e8a33c' }); pop(); }
      if (t > EV.au_storm) note('≈ 11 000 статистов', 540, 1790, t, EV.au_storm + 0.1, S1.aurora, '#f6ecd6', 42, -0.02);
    }
  };

  // ---------------------------------------------------------------- переход В aurora: луч прожектора прорезает кадр
  TRANS_IN.aurora = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const ox = -120, oy = H + 120, ang = lerp(-0.25, -1.3, sm(k)), spr = lerp(0.04, 1.8, Math.pow(sm(clamp((k - 0.25) / 0.75)), 1.5)), L = 3200;
    drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = 0.5 * sm(k / 0.4); ctx.fillStyle = '#05070e'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    const P = new Path2D(); P.moveTo(ox, oy); P.lineTo(ox + Math.cos(ang - spr) * L, oy + Math.sin(ang - spr) * L); P.lineTo(ox + Math.cos(ang + spr) * L, oy + Math.sin(ang + spr) * L); P.closePath();
    inPath(P, () => drawBuf(B, 1.08 - 0.08 * sm(k)));
    scr(() => { for (const sd of [-1, 1]) pencil([[ox, oy], [ox + Math.cos(ang + sd * spr) * L, oy + Math.sin(ang + sd * spr) * L]], { w: 10, col: '#fff8dc', a: 0.8 * (1 - sm(k)), pass2: false }); glow(ox + 120, oy - 120, 300, 'rgba(255,250,220,1)', 0.9 * (1 - sm(k))); });
  } };
})();
