/* 004 — сцена `ggb`: 1926 → 1995. Перед тронным залом Кёнбоккуна вырастает громада генерал-губернаторства (гранит, купол, крылья) —
   дворец почти не виден. Том-рабочий в кепке недоволен. На «девяносто пятом» — счётчик лет, площадь заполняет толпа с флагами,
   справа кран; на «снесли!» кран снимает купол, здание осыпается в пыль, за ним снова встаёт дворец, салют.
   Переход В сцену — серый купол опускается на кадр, как крышка. */
(() => {
  EV.gg_block = wtk('s8', 'загородили');
  EV.gg_95 = wtk('s8', 'девяносто');
  EV.gg_down = wtk('s8', 'снесли!');
  SHAKES.push([EV.gg_block + 0.3, 0.3, 6], [EV.gg_down + 0.1, 0.5, 12]);
  KEYW.push('зданием.', 'снесли!');
  const rise = t => sm((t - S0.ggb - 0.05) / (EV.gg_block - S0.ggb + 0.5));
  const lift = t => sm((t - EV.gg_down + 0.4) / 0.4);
  const fall = t => sm((t - EV.gg_down + 0.02) / 0.45);

  function sky(t) { vgrad(-900, 1100, ['#7aa6d0', '#b8d0e4', '#f2e8d8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 430 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 50, 100 + i * 80 + Math.sin(k) * 10, 66, 28, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function palace(t) {
    bugak(860, 1.1, { far: '#a8b8c8', mid: '#7a8a6a', near: '#5f7650', rock: '#e6e0d0' });
    for (const [x, w] of [[-60, 280], [1140, 280]]) koHall(x, 980, w, 190, t, { bays: 4, steps: false, key: 9900 + x });
    koHall(540, 960, 420, 420, t, { two: 1, bays: 5, figures: 1, key: 9910 });
    if (fall(t) > 0.5) glow(540, 760, 500, 'rgba(255,220,150,1)', 0.35 * (fall(t) - 0.5) * 2);
  }
  function ggb(t) {                                                    // здание генерал-губернаторства: растёт, потом рушится
    const r = rise(t), f = fall(t); if (r <= 0 || f >= 1) return;
    const base = 1180, H_ = 470 * r, a = 1 - f;
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.rect(-500, base - 1000 * r, 2100, 1000 * r + 10); ctx.clip();
    const dy = f * 260;
    push(0, dy, 1);
    const bp = rect(-200, base - 470, 1480, 470, { wash: '#bcb6aa', washA: 1, w: 3, col: '#2a2620', key: 9920 }); hatch(bp.path, bp.bb, { gap: 8, a: 0.12, col: '#4a463e', ang: 1.5, w: 1 });
    for (let y = base - 470; y < base; y += 40) pencil([[-200, y], [1280, y]], { w: 1.2, col: '#7a746a', a: 0.4, pass2: false, gap: false });
    for (let i = 0; i < 18; i++) for (let j = 0; j < 4; j++) { const wx = -170 + i * 82, wy = base - 430 + j * 105; rect(wx, wy, 44, 70, { wash: '#3a4250', washA: 1, w: 1.6, col: '#1a1a20' }); pencil([[wx + 22, wy], [wx + 22, wy + 70]], { w: 1.4, col: '#8a8a90', a: 0.6, pass2: false }); }
    const cx = 540; rect(cx - 220, base - 560, 440, 560, { wash: '#c8c2b6', washA: 1, w: 3, col: '#2a2620' });
    for (let i = 0; i < 6; i++) { const colx = cx - 190 + i * 76; const cp = rect(colx - 14, base - 470, 28, 330, { wash: '#e0dacc', washA: 1, w: 1.8, col: '#3a362e' }); shadeG(cp.path, colx + 14, 0, colx - 14, 0, '#9a9488', 0.5); }
    rect(cx - 230, base - 140, 460, 140, { wash: '#a8a294', washA: 1, w: 2, col: '#2a2620' }); for (let k = 0; k < 5; k++) rect(cx - 200 + k * 10, base - 40 + k * 8 - 40, 400 - k * 20, 8, { wash: '#d8d2c4', washA: 1, w: 1, col: '#3a362e', a: 0.6 });
    poly([[cx - 240, base - 560], [cx + 240, base - 560], [cx, base - 640]], { wash: '#b0aa9e', washA: 1, w: 2.4, col: '#2a2620' });
    pop();
    // купол на барабане (кран его поднимает)
    const L = lift(t), dx = L * 260, ddy = -L * 360 + dy * (1 - L);
    push(dx, ddy, 1); rect(cx - 120, base - 760, 240, 120, { wash: '#c8c2b6', washA: 1, w: 2.4, col: '#2a2620' }); for (let k = 0; k < 6; k++) rect(cx - 104 + k * 38, base - 740, 18, 70, { wash: '#3a4250', washA: 1, w: 1.2, col: '#1a1a20' });
    const dm = shape(ellPts(cx, base - 760, 140, 150, 0, 0, 40).filter(p => p[1] <= base - 760).sort((a_, b_) => a_[0] - b_[0]), { wash: '#6a8a84', washA: 1, w: 2.6, col: '#1a2a26' }); metalG(dm.path, cx - 40, base - 860, 180, '#a8c8c0', '#6a8a84', '#2a3a36');
    for (let k = -3; k <= 3; k++) pencil(spline([[cx + k * 40, base - 760], [cx + k * 26, base - 860], [cx, base - 910]], false, 8), { w: 1.6, col: '#2a3a36', a: 0.6, pass2: false });
    rect(cx - 16, base - 950, 32, 40, { wash: '#6a8a84', washA: 1, w: 1.6, col: '#1a2a26' });
    pop();
    ctx.restore();
    if (f > 0 && f < 1) for (let k = 0; k < 14; k++) { const r_ = rng(9930 + k), x = -100 + r_() * 1300, ph = f; ell(x, base - 100 - ph * 300 * r_(), 80 + ph * 120, 60 + ph * 80, { wash: '#d8d0c0', washA: 0.7 * (1 - ph), w: 1.4, col: '#7a7468', a: 0.3 * (1 - ph) }); }
  }
  function crane(t) {                                                  // кран справа: стрела, трос к куполу
    const k = sm((t - EV.gg_95) / 0.4); if (k <= 0) return; const L = lift(t);
    push(0, (1 - k) * 600, 1);
    const bx = 960, by = 1300; rect(bx - 60, by - 80, 160, 80, { wash: '#e8b030', washA: 1, w: 2, col: '#3a2a08' }); for (const wx of [bx - 30, bx + 70]) ell(wx, by, 26, 26, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' });
    const tipx = lerp(700, 880, L), tipy = lerp(120, 40, L);
    for (const o of [-14, 14]) pencil([[bx + o, by - 80], [tipx + o * 0.3, tipy]], { w: 9, col: '#e8b030' }); const P = resample([[bx, by - 80], [tipx, tipy]], 36); for (let i = 0; i < P.length - 1; i++) pencil([[P[i][0] - 14, P[i][1]], [P[i + 1][0] + 14, P[i + 1][1]]], { w: 4, col: '#c88a10', a: 0.9, pass2: false, gap: false }); rect(bx - 40, by - 170, 90, 90, { wash: '#e8b030', washA: 1, w: 2, col: '#3a2a08' }); rect(bx - 24, by - 156, 50, 40, { wash: '#3a4a5a', washA: 1, w: 1.4, col: '#000' });
    const hookx = 540 + L * 260, hooky = 1180 - 950 - L * 360; pencil([[tipx, tipy], [hookx, hooky]], { w: 3, col: '#2a2a2a', pass2: false }); poly([[hookx - 14, hooky], [hookx + 14, hooky], [hookx, hooky + 26]], { wash: '#3a3a3a', washA: 1, w: 1.4 });
    pop();
  }
  function crowd95(t) {                                                // толпа с флагами 1995
    const k = sm((t - EV.gg_95 + 0.1) / 0.5); if (k <= 0) return;
    push(0, (1 - k) * 200, 1); crowd(-120, 1200, 1350, 34, t, 9940, { s: 0.95, flags: 0.4, dy: 60, cols: ['#2a3a5a', '#e8e4dc', '#3a4a3a', '#8a3a2a', '#4a4a5a'] }); pop();
    if (t > EV.gg_down + 0.3) for (let q = 0; q < 4; q++) { const ph = ((t - EV.gg_down) * 0.7 + q * 0.25) % 1, x = 160 + q * 260, y = 600 - ph * 300; for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283; pencil([[x + Math.cos(a) * ph * 30, y + Math.sin(a) * ph * 30], [x + Math.cos(a) * ph * 110, y + Math.sin(a) * ph * 110]], { w: 4, col: ['#ff5a5a', '#ffd24a', '#5ad8ff', '#ffffff'][q], a: 1 - ph, pass2: false }); } }
  }

  WORLD.ggb = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(7, () => palace(t));
    lay(4.2, () => { ggb(t); crane(t); });
    lay(2.2, () => crowd95(t));
    lay(1, () => { const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#a8a294', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let k = -12; k <= 12; k++) pencil([[540 + k * 60, 1440], [540 + k * 200, 2400]], { w: 1.4, col: '#6a6458', a: 0.4, pass2: false, gap: false }); ctx.restore(); cat(); });
  };
  DIR.ggb = {
    outfit: 'iron', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a070', 0.1],
    act: () => [[S0.ggb, 'suspicious'], [EV.gg_block, 'annoyed'], [EV.gg_95, 'smug'], [EV.gg_down - 0.04, 'proud'], [EV.gg_down + 0.4, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.04, look: [0.5, -0.4], hand: t > EV.gg_down ? [90, -400] : undefined, handF: t < EV.gg_95 ? [-60, -140] : undefined, tilt: t > EV.gg_down ? -0.05 : 0 }),
    cam: () => [[S0.ggb, 560, 900, 0.1], [EV.gg_block + 0.4, 560, 940, 0.04], [EV.gg_95, 560, 980, 0.06], [EV.gg_down, 560, 940, 0.02], [S1.ggb, 560, 960, 0.08]],
    hud: t => { if (t > EV.gg_95 - 0.1 && t < EV.gg_down + 0.4) { const y = Math.round(lerp(1926, 1995, sm((t - EV.gg_95 + 0.1) / 0.7))); push(540, 520, 1); ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-150, -56, 300, 112); ctx.restore(); txt(String(y), 0, 0, 80, { font: 'Osw', col: '#f6e7c8' }); pop(); }
      if (t > EV.gg_block + 0.3 && t < EV.gg_95) note('здание генерал-губернатора, 1926', 560, 1700, t, EV.gg_block + 0.3, EV.gg_95, '#3a2a1a', 42, -0.02);
      if (t > EV.gg_down + 0.3) note('15 августа 1995', 560, 1700, t, EV.gg_down + 0.3, S1.ggb, '#3a2a1a', 46, -0.02); }
  };

  // ---------------------------------------------------------------- переход В ggb: купол опускается на кадр, как крышка
  TRANS_IN.ggb = { a: 0.3, b: 0.35, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const c = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5), R = 1300, cy = -R * 0.2 + c * (H + R * 0.2) - (k < 0.5 ? 0 : 0);
      const top = lerp(-2 * R, H - R * 0.15, c);
      const dm = shape(ellPts(540, top + R, R, R * 1.1, 0, 0, 60).filter(p => p[1] <= top + R).sort((a_, b_) => a_[0] - b_[0]).concat([[540 + R, top + R + H], [540 - R, top + R + H]]), { wash: '#6a8a84', washA: 1, w: 5, col: '#1a2a26' });
      metalG(dm.path, 300, top + 300, 1400, '#a8c8c0', '#6a8a84', '#2a3a36');
      for (let q = -5; q <= 5; q++) pencil(spline([[540 + q * 220, top + R], [540 + q * 140, top + R * 0.4], [540, top]], false, 10), { w: 3, col: '#2a3a36', a: 0.6, pass2: false }); });
  } };
})();
