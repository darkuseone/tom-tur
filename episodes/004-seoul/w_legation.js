/* 004 — сцена `legation`: февраль 1896, снег. Белое здание российской миссии с башней, триколор на флагштоке, ограда с воротами
   и золотым двуглавым орлом, русские матросы в карауле. К воротам несут закрытый паланкин — король бежит. На «год» в окне башни горит лампа,
   король за столом с бумагами, на «правил» гонцы со свитками бегут туда-сюда, на ограде — счётчик дней. Том-матрос отдаёт честь.
   Переход В сцену — искра бежит по проводу, створки ворот захлопываются и распахиваются уже в 1896-м. */
(() => {
  EV.lg_run = wtk('s7', 'сбежал');
  EV.lg_ru = wtk('s7', 'российское');
  EV.lg_year = wtk('s7', 'год');
  EV.lg_rule = wtk('s7', 'правил');
  KEYW.push('посольство', 'оттуда!');

  function sky(t) { vgrad(-900, 1100, ['#5a6a8a', '#a8b4c8', '#e8dcd0'], 1); glow(900, 300, 400, 'rgba(255,220,190,1)', 0.35); }
  function legation(t) {                                               // здание миссии: два этажа, арки, башня, флаг
    bugak(980, 1.0, { far: '#a8b0c0', mid: '#8a9098', near: '#7a8478', rock: '#f0eee8' });
    for (const [x, w] of [[-120, 260]]) koHall(x, 1000, w, 180, t, { bays: 3, light: 0.7, steps: false, key: 9800 });
    const x0 = 140, x1 = 980, base = 1060, top = 700;
    const bp = rect(x0, top, x1 - x0, base - top, { wash: '#f2eee4', washA: 1, w: 2.4, col: '#3a362e', key: 9801 }); shadeG(bp.path, x1, 0, x0, 0, '#b8b0a0', 0.35);
    rect(x0 - 10, top - 26, x1 - x0 + 20, 30, { wash: '#d8d2c4', washA: 1, w: 1.8, col: '#3a362e' }); rect(x0 - 6, (top + base) / 2 - 8, x1 - x0 + 12, 14, { wash: '#d8d2c4', washA: 1, w: 1.4, col: '#3a362e' });
    for (let i = 0; i < 7; i++) for (let j = 0; j < 2; j++) { const wx = x0 + 70 + i * 116, wy = top + 40 + j * 180, lit = j === 0 && i === 2 && t > EV.lg_year;
      const wp = shape([[wx - 30, wy + 110], [wx - 30, wy + 30]].concat(ellPts(wx, wy + 30, 30, 30, 0, 0, 16).filter(p => p[1] <= wy + 30).sort((a, b) => a[0] - b[0])).concat([[wx + 30, wy + 30], [wx + 30, wy + 110]]), { wash: lit ? '#f6d48a' : '#3a4a5a', washA: 1, w: 2, col: '#2a2620' });
      if (lit) glow(wx, wy + 60, 120, 'rgba(255,200,110,1)', 0.6); pencil([[wx, wy], [wx, wy + 110]], { w: 2, col: '#e8e4dc', a: 0.8, pass2: false }); pencil([[wx - 30, wy + 60], [wx + 30, wy + 60]], { w: 2, col: '#e8e4dc', a: 0.8, pass2: false }); }
    poly([[x0 - 20, top - 22], [x1 + 20, top - 22], [x1 - 40, top - 110], [x0 + 40, top - 110]], { wash: '#6a7a7e', washA: 1, w: 2.2, col: '#2a2a2a' }); for (let k = 0; k < 14; k++) pencil([[x0 + 40 + k * 60, top - 108], [x0 - 10 + k * 66, top - 24]], { w: 1.4, col: '#3a4a4e', a: 0.6, pass2: false });
    for (const cx of [260, 520, 700]) { rect(cx - 16, top - 160, 32, 60, { wash: '#a8564a', washA: 1, w: 1.6, col: '#2a0a04' }); const ph = (t * 0.6 + cx) % 1; ell(cx + ph * 40, top - 180 - ph * 120, 14 + ph * 30, 10 + ph * 20, { wash: '#e8e4e0', washA: 0.5 * (1 - ph), line: false }); }
    for (let k = 0; k < 10; k++) ell(x0 + 60 + k * 84, top - 106, 46, 9, { wash: '#ffffff', washA: 0.95, line: false });
    rect(470, 920, 180, 140, { wash: '#e8e4dc', washA: 1, w: 2, col: '#3a362e' }); for (const cx of [490, 560, 630]) rect(cx - 8, 920, 16, 140, { wash: '#f6f4ee', washA: 1, w: 1.4, col: '#3a362e' }); poly([[460, 920], [660, 920], [560, 870]], { wash: '#f0ece2', washA: 1, w: 2, col: '#3a362e' });
    for (const [bx, h] of [[60, 420], [1080, 460]]) { pencil([[bx, 1080], [bx + 6, 1080 - h]], { w: 14, col: '#3a2a20' }); for (let q = 0; q < 7; q++) { const yy = 1080 - h * (0.4 + q * 0.08), sd = q % 2 ? 1 : -1; pencil(spline([[bx + 4, yy], [bx + sd * 60, yy - 50], [bx + sd * 110, yy - 70 - q * 4]], false, 6), { w: 4, col: '#3a2a20', pass2: false }); ell(bx + sd * 90, yy - 66, 26, 7, { wash: '#ffffff', washA: 0.9, line: false }); } }
    // башня
    const tx = 860, tw = 150; const tp = rect(tx - tw / 2, top - 330, tw, 330, { wash: '#f6f2e8', washA: 1, w: 2.4, col: '#3a362e', key: 9802 }); shadeG(tp.path, tx + tw / 2, 0, tx - tw / 2, 0, '#b8b0a0', 0.35);
    for (let j = 0; j < 2; j++) { const wy = top - 290 + j * 140; shape([[tx - 26, wy + 90], [tx - 26, wy + 26]].concat(ellPts(tx, wy + 26, 26, 26, 0, 0, 14).filter(p => p[1] <= wy + 26).sort((a, b) => a[0] - b[0])).concat([[tx + 26, wy + 26], [tx + 26, wy + 90]]), { wash: j === 0 && t > EV.lg_rule ? '#f6d48a' : '#3a4a5a', washA: 1, w: 2, col: '#2a2620' }); }
    rect(tx - tw / 2 - 12, top - 350, tw + 24, 24, { wash: '#d8d2c4', washA: 1, w: 1.8, col: '#3a362e' }); poly([[tx - tw / 2 - 12, top - 350], [tx + tw / 2 + 12, top - 350], [tx, top - 420]], { wash: '#5a7a6a', washA: 1, w: 2, col: '#2a2620' });
    pencil([[tx, top - 420], [tx, top - 600]], { w: 5, col: '#3a3a3a' });
    const wv = t * 5; const F = (yy, c) => { const P = []; for (let q = 0; q <= 8; q++) P.push([tx + q * 22, top - 600 + yy + Math.sin(wv + q * 0.7) * 6 * q / 8]); for (let q = 8; q >= 0; q--) P.push([tx + q * 22, top - 600 + yy + 30 + Math.sin(wv + q * 0.7) * 6 * q / 8]); shape(P, { wash: c, washA: 1, w: 1.2, col: '#1a1a1a', a: 0.6 }); };
    F(0, '#f6f6f2'); F(30, '#2a4aa8'); F(60, '#c8201e');
    // король в окне на «год»
    if (t > EV.lg_year) { const wx = x0 + 70 + 2 * 116, wy = top + 40; ctx.save(); ctx.beginPath(); ctx.rect(wx - 30, wy, 60, 110); ctx.clip(); push(wx, wy + 190, 0.5); human(0, 0, 1, t, { body: '#c41e1a', legs: '#3a1a10', long: 1, hat: 'ikseon', beard: 'short', hair: '#1a1614', armR: 'hold', armL: 'hold', prop: 'scroll', face: 'calm', seed: 100 }); pop(); ctx.restore(); }
    for (let k = 0; k < 12; k++) { const sx = x0 + k * 72; ell(sx, top - 26, 40, 10, { wash: '#ffffff', washA: 0.95, line: false }); }
  }
  function fence(t) {                                                  // ограда, ворота с орлом, часовые-матросы, счётчик дней
    for (let x = -300; x < 1500; x += 40) pencil([[x, 1260], [x, 1120]], { w: 6, col: '#2a2a30' }); pencil([[-300, 1140], [1500, 1140]], { w: 6, col: '#2a2a30' }); pencil([[-300, 1230], [1500, 1230]], { w: 6, col: '#2a2a30' });
    for (const gx of [420, 680]) { rect(gx - 30, 1000, 60, 270, { wash: '#e8e4dc', washA: 1, w: 2, col: '#3a362e' }); rect(gx - 38, 990, 76, 20, { wash: '#d0cac0', washA: 1, w: 1.6, col: '#3a362e' }); }
    push(550, 970, 0.9); ell(0, 0, 40, 30, { wash: '#d6a842', washA: 1, w: 2, col: '#6a4a08' }); for (const sd of [-1, 1]) { blob([[0, -10], [sd * 70, -40], [sd * 80, 0], [sd * 40, 20]], { wash: '#d6a842', washA: 1, w: 1.8, col: '#6a4a08' }); ell(sd * 18, -42, 10, 10, { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' }); } rect(-14, -14, 28, 32, { wash: '#c8201e', washA: 1, w: 1.4, col: '#5a0a0a' }); ell(0, -66, 12, 8, { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' }); pop();
    const op = sm((t - EV.lg_run) / 0.5); for (const sd of [-1, 1]) { const gx = 550 + sd * (60 + op * 50); for (let k = 0; k < 4; k++) pencil([[gx + sd * k * 12, 1260], [gx + sd * k * 12, 1050]], { w: 5, col: '#1a1a20' }); }
    for (const [x, fl] of [[340, 1], [760, -1]]) { human(x, 1290, 0.75, t, { body: '#1e2a4a', legs: '#1e2a4a', hat: 'sailor', armR: 'hold', prop: 'spear', propAng: 0, face: 'calm', seed: x, flip: fl, skin: '#f0c8a8' }); }
  }
  function procession(t) {                                            // паланкин с королём, носильщики, гонцы
    const k = sm((t - S0.legation) / (EV.lg_ru - S0.legation + 0.4)), x = lerp(-300, 470, k), y = 1350, step = Math.sin(t * 9) * 4;
    for (const dx of [-110, 110]) human(x + dx, y, 0.72, t, { body: '#e8e0cc', legs: '#c6bda6', hat: 'straw', armR: 'up', armL: 'hold', seed: 101 + dx, flip: 1 });
    pencil([[x - 200, y - 220 + step], [x + 200, y - 220 + step]], { w: 9, col: '#6a3a1a' });
    const pb = rect(x - 80, y - 380 + step, 160, 170, { wash: '#7a2a1a', washA: 1, w: 2.4, col: '#2a0a04' }); hatch(pb.path, pb.bb, { gap: 6, a: 0.2, col: '#2a0a04', ang: 1.5, w: 1 });
    poly([[x - 100, y - 380 + step], [x + 100, y - 380 + step], [x + 60, y - 430 + step], [x - 60, y - 430 + step]], { wash: '#3a2a20', washA: 1, w: 2, col: '#1a0a04' });
    rect(x - 46, y - 350 + step, 92, 100, { wash: '#d8b84a', washA: 1, w: 1.6, col: '#5a3a08' }); for (let q = 0; q < 5; q++) pencil([[x - 46 + q * 23, y - 350 + step], [x - 46 + q * 23, y - 250 + step]], { w: 1.4, col: '#8a6a1a', a: 0.6, pass2: false });
    if (t > EV.lg_ru && t < EV.lg_year) { const ey = y - 320 + step; ell(x + 10, ey, 10, 6, { wash: '#f2ece0', washA: 1, w: 1, col: '#000' }); ell(x + 12, ey, 3, 3, { wash: '#000', washA: 1, line: false }); }
    if (t > EV.lg_rule) for (let q = 0; q < 3; q++) { const ph = ((t - EV.lg_rule) * 0.9 + q / 3) % 1, mx = q % 2 ? lerp(550, -100, ph) : lerp(-100, 550, ph); human(mx, 1380 + q * 20, 0.62, t, { body: ['#2a6a5a', '#4a6a8a', '#7a5a3a'][q], legs: '#2a2a30', hat: 'gat', armR: 'hold', prop: 'scroll', seed: 110 + q, flip: q % 2 ? -1 : 1 }); }
  }
  function snowfall(t) { motes(80, [-200, -200, 1300, 2000], '#ffffff', t, 9810, { sp: 70, vx: -30, sz: 3.6, a: 0.85, wob: 20 }); }

  WORLD.legation = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => legation(t));
    lay(2.6, () => fence(t));
    lay(1.5, () => procession(t));
    lay(1, () => { const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#eceae6', washA: 1, w: 1, col: '#000', a: 0.2 }); hatch(g.path, g.bb, { gap: 12, a: 0.08, col: '#6a6a72', ang: 0.1, w: 1 });
      for (let i = 0; i < 8; i++) ell(-120 + i * 170, 1530 + (i % 3) * 40, 26, 8, { wash: '#b8b4b0', washA: 0.6, line: false }); cat(); });
    lay(0.7, () => snowfall(t));
  };
  DIR.legation = {
    outfit: 'sailor', light: { side: -1, rim: '#ffe8d0' }, grade: ['#8a9ab8', 0.12],
    act: () => [[S0.legation, 'smug'], [EV.lg_ru, 'sideeye'], [EV.lg_year, 'awe'], [EV.lg_rule, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 760, y: 1480, s: 1.06, flip: -1, look: t < EV.lg_year ? [-0.6, 0] : [-0.4, -0.4], frost: 0.5,
      hand: t > EV.lg_rule ? [70, -380] : undefined, tilt: t > EV.lg_rule ? -0.04 : 0 }),
    cam: () => [[S0.legation, 560, 880, 0.14], [EV.lg_ru, 560, 920, 0.06], [EV.lg_year, 520, 960, 0.08], [S1.legation, 580, 1000, 0.14]],
    hud: t => { if (t > EV.lg_year) { const n = Math.min(365, Math.round(365 * clamp((t - EV.lg_year) / 1.6))); const k = popK(t, EV.lg_year, 0.3); push(300, 560, k, -0.05); ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-170, -60, 340, 120); ctx.restore(); txt(n + ' дн.', 0, -6, 72, { font: 'Osw', col: '#f6e7c8' }); pop(); }
      if (t > EV.lg_ru) note('Российская миссия, Сеул', 560, 1700, t, EV.lg_ru, S1.legation, '#3a2a1a', 44, -0.02); }
  };

  // ---------------------------------------------------------------- переход В legation: искра по проводу → створки ворот
  TRANS_IN.legation = { a: 0.35, b: 0.35, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const sp = clamp(k / 0.4), sx = lerp(-60, W + 60, sp), sy = 520 + Math.sin(sp * 9) * 20;
      if (k < 0.45) { pencil([[-60, 520], [W + 60, 520]], { w: 4, col: '#1a1a20', a: 0.8, pass2: false }); glow(sx, sy, 120, 'rgba(255,250,200,1)', 0.9); for (let q = 0; q < 6; q++) { const a = q + t * 30; pencil([[sx, sy], [sx + Math.cos(a) * 40, sy + Math.sin(a) * 40]], { w: 3, col: '#fff6c0', pass2: false }); } }
      const c = k < 0.5 ? sm(clamp((k - 0.2) / 0.3)) : 1 - sm((k - 0.5) / 0.5);
      if (c > 0) for (const sd of [-1, 1]) { const x = sd < 0 ? -W / 2 + c * W / 2 : W - c * W / 2; const dp = rect(x, 0, W / 2, H, { wash: '#5a2a14', washA: 1, w: 4, col: '#1a0a04' }); hatch(dp.path, dp.bb, { gap: 9, a: 0.25, col: '#2a1408', ang: 1.57, w: 1.4 });
        for (let j = 0; j < 6; j++) for (let i = 0; i < 4; i++) ell(x + 60 + i * 130, 160 + j * 320, 12, 12, { wash: '#c8a040', washA: 1, w: 1.4, col: '#5a3a08' });
        rect(x + (sd < 0 ? W / 2 - 60 : 20), 900, 40, 120, { wash: '#c8a040', washA: 1, w: 2, col: '#5a3a08' }); } });
  } };
})();
