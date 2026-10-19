/* 004 — сцена `forum`: 1650, «Кампо Ваччино». Римский форум засыпан: колонны храма Сатурна и Кастора торчат по пояс, арка Септимия Севера
   ушла в землю до половины, на Палатине руины в зелени, вдали колокольня. Пасутся коровы, пастухи с длинными палками, телега с сеном.
   На «по пояс» — срез земли: пунктиром видна закопанная часть колонн и подпись «до 9 м наносов». На «коров» корова мычит прямо в кадр,
   на «Коровье поле» — указатель «CAMPO VACCINO». Том — голландский художник XVII в. у мольберта (костюм dutch из 001).
   Переход В сцену: краска с потолка стекает акварельными подтёками и открывает пейзаж. */
(() => {
  EV.fr_waist = WT('s8', 'пояс');
  EV.fr_cows = WT('s8', 'коров.');
  EV.fr_field = WT('s8', '«Коровье');
  SHAKES.push([EV.fr_cows, 0.18, 5]);
  KEYW.push('пояс', 'коров.', 'поле»!');
  const XR = t => clamp((t - EV.fr_waist) / 0.4) * (1 - clamp((t - EV.fr_field) / 0.4));

  function cow(x, y, s, t, o = {}) {                                 // корова в профиль (мордой влево), пятнистая или рыжая
    const c = o.col || '#f2ece0', sp = o.spot || '#2a2420', L = '#1c140c', ch = Math.sin(t * 3 + (o.seed || 0)) * 4, moo = o.moo || 0;
    push(x, y, s, 0, o.flip || 1);
    ell(0, 4, 150, 14, { wash: '#000000', washA: 0.18, line: false });
    for (const [lx, far] of [[-90, 1], [80, 1], [-70, 0], [100, 0]]) { shape(tubeP([[lx, -100], [lx + 2, -40], [lx, 0]], 30, 22), { wash: far ? lerpC(c, '#000000', 0.25) : c, washA: 1, w: 2.2, col: L }); rect(lx - 14, -10, 28, 12, { wash: '#2a2018', washA: 1, w: 1.4, col: L }); }
    const b = blob([[-120, -110], [-110, -190], [0, -200], [120, -196], [150, -150], [140, -96], [40, -86], [-90, -90]], { wash: c, washA: 1, w: 2.6, col: L, key: 10100 + (o.seed || 0) });
    if (o.spot) { ctx.save(); ctx.clip(b.path); const r = rng(10110 + (o.seed || 0)); for (let k = 0; k < 5; k++) ell(-90 + r() * 200, -180 + r() * 80, 30 + r() * 26, 20 + r() * 20, { wash: sp, washA: 1, line: false, rot: r() * 3 }); ctx.restore(); }
    shadeG(b.path, 0, -86, 0, -200, lerpC(c, '#000000', 0.5), 0.35);
    ell(10, -84, 26, 16, { wash: '#f0b0a8', washA: 1, w: 1.6, col: L });
    pencil(spline([[146, -170], [170, -130], [166, -60]], false, 6), { w: 6, col: c }); ell(166, -56, 8, 12, { wash: sp, washA: 1, w: 1 });
    push(-140, -170 + ch, 1, moo * -0.3);
    const h = blob([[0, -30], [-40, -40], [-90, -10], [-100, 30], [-70, 50], [-20, 30], [10, 10]], { wash: c, washA: 1, w: 2.4, col: L }); ell(-88, 30, 22, 18, { wash: '#e8a0a0', washA: 1, w: 1.8, col: L }); ell(-94, 24, 3, 3, { wash: L, washA: 1, line: false });
    for (const sd of [-1, 1]) pencil(spline([[-20, -36], [-10 + sd * 6, -70], [16 + sd * 10, -78]], false, 5), { w: 6, col: '#e8dcc0' });
    ell(10, -20, 22, 9, { wash: c, washA: 1, w: 1.8, col: L, rot: -0.4 }); ell(-46, -14, 6, 5, { wash: L, washA: 1, line: false });
    if (moo) { ell(-96, 46, 10 * moo, 12 * moo, { wash: '#4a1a1a', washA: 1, w: 1.4 }); txt('МУУ!', -200, -40, 60 * moo, { font: 'Osw', col: '#2a1a0a', rot: -0.2 }); }
    pop(); pop();
  }
  function ruins(t) {                                                // храм Сатурна, Кастор и Поллукс, арка Септимия Севера — по пояс в земле
    const xr = XR(t);
    // арка
    push(140, 1250, 0.9); const a = rect(-220, -300, 440, 300, { wash: '#e0d4b8', washA: 1, w: 2.6, col: '#4a3a24', key: 10120 }); hatch(a.path, a.bb, { gap: 12, a: 0.12, col: '#6a5a3a', ang: 0 });
    blob([[-70, 0], [-70, -140], [0, -200], [70, -140], [70, 0]], { wash: '#3a2a1a', washA: 1, w: 2, col: '#2a1a0a' }); rect(-240, -360, 480, 70, { wash: '#d8ccb0', washA: 1, w: 2.4, col: '#4a3a24' }); for (let q = 0; q < 3; q++) pencil([[-200, -340 + q * 18], [200, -340 + q * 18]], { w: 1.6, col: '#6a5a3a', a: 0.6, pass2: false });
    for (let q = 0; q < 6; q++) { const r = rng(10121 + q); pencil([[-220 + r() * 440, -300 + r() * 200], [-200 + r() * 440, -300 + r() * 220]], { w: 1.4, col: '#2a3a1a', a: 0.5, pass2: false }); ell(-200 + r() * 400, -310, 16, 10, { wash: '#4a6a2a', washA: 1, line: false }); }
    if (xr) { ctx.save(); ctx.globalAlpha = xr; ctx.setLineDash([16, 12]); ctx.strokeStyle = '#2a1a0a'; ctx.lineWidth = 4; ctx.strokeRect(-220, 0, 440, 300); ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-70, 300); ctx.moveTo(70, 0); ctx.lineTo(70, 300); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    pop();
    // храм Сатурна: 6 колонн с антаблементом
    for (let q = 0; q < 6; q++) { column(560 + q * 64, 1260, 260, 22, { cap: 'ion', col: '#d8ccb0', key: 10130 + q }); if (xr) { ctx.save(); ctx.globalAlpha = xr; ctx.setLineDash([12, 10]); ctx.strokeStyle = '#2a1a0a'; ctx.lineWidth = 3; ctx.strokeRect(560 + q * 64 - 22, 1260, 44, 250); ctx.setLineDash([]); ctx.restore(); } }
    rect(520, 980, 400, 40, { wash: '#e0d4b8', washA: 1, w: 2.4, col: '#4a3a24' }); rect(520, 950, 400, 30, { wash: '#d8ccb0', washA: 1, w: 2, col: '#4a3a24' });
    // три колонны Кастора
    for (let q = 0; q < 3; q++) column(1060 + q * 56, 1250, 420, 20, { cap: 'cor', col: '#e6dac0', key: 10140 + q }); rect(1030, 812, 180, 30, { wash: '#e0d4b8', washA: 1, w: 2, col: '#4a3a24' });
    if (xr) { ctx.save(); ctx.globalAlpha = xr; txt('до 9 м наносов', 700, 1440, 46, { font: 'Hand', col: '#2a1a0a', rot: -0.03 }); pencil([[400, 1400], [400, 1300]], { w: 3, col: '#2a1a0a', pass2: false }); ctx.restore(); }
  }
  function hillsBack(t) {                                            // Палатин с руинами и деревьями, колокольня Санта-Франческа-Романа
    const p = shape(spline([[-300, 1000], [0, 820], [300, 760], [600, 800], [900, 740], [1300, 860]], false, 8).concat([[1300, 1200], [-300, 1200]]), { wash: '#8a9a5a', washA: 1, w: 2.2, col: '#2a3a14', key: 10150 }); hatch(p.path, p.bb, { gap: 9, a: 0.15, col: '#2a3a14', ang: 0.6 });
    for (let k = 0; k < 6; k++) { const x = -150 + k * 230; rect(x, 780 - (k % 2) * 40, 120, 120, { wash: '#b8865a', washA: 1, w: 2, col: '#4a2a14' }); for (let q = 0; q < 2; q++) blob([[x + 10 + q * 56, 900 - (k % 2) * 40], [x + 10 + q * 56, 840 - (k % 2) * 40], [x + 34 + q * 56, 820 - (k % 2) * 40], [x + 56 + q * 56, 840 - (k % 2) * 40], [x + 56 + q * 56, 900 - (k % 2) * 40]], { wash: '#3a2a1a', washA: 1, w: 1.4 }); }
    umbrellaPine(250, 800, 0.55, 10151); umbrellaPine(980, 760, 0.5, 10152); cypress(680, 780, 0.5, 10153); cypress(720, 790, 0.42, 10154);
    push(-40, 860, 0.8); rect(-50, -380, 100, 380, { wash: '#c88a5a', washA: 1, w: 2.2, col: '#3a2010' }); for (let q = 0; q < 4; q++) { for (const sd of [-1, 1]) blob([[sd * 30 - 12, -70 - q * 80], [sd * 30 - 12, -110 - q * 80], [sd * 30, -122 - q * 80], [sd * 30 + 12, -110 - q * 80], [sd * 30 + 12, -70 - q * 80]], { wash: '#2a1a10', washA: 1, w: 1.2 }); } poly([[-56, -380], [0, -460], [56, -380]], { wash: '#8a4a2a', washA: 1, w: 2 }); pop();
  }
  function field(t) {                                                // луг: трава, кочки, коровы, пастухи, телега
    const g = poly([[-500, 1250], [1600, 1250], [1600, 1500], [-500, 1500]], { wash: '#a8a85a', washA: 1, w: 2, col: '#3a3a14', key: 10160 });
    for (let k = 0; k < 80; k++) { const r = rng(10161 + k), x = -400 + r() * 1900, y = 1260 + r() * 230; pencil([[x, y], [x - 3, y - 14]], { w: 2, col: '#5a6a2a', a: 0.7, pass2: false }); }
    const moo = t > EV.fr_cows ? popK(t, EV.fr_cows, 0.4) * (1 - clamp((t - EV.fr_field - 0.4) / 0.4)) : 0;
    cow(300, 1330, 0.6, t, { col: '#f2ece0', spot: '#2a2420', seed: 1 }); cow(780, 1300, 0.48, t, { col: '#b8743a', seed: 2, flip: -1 }); cow(1100, 1360, 0.66, t, { col: '#e8dcc8', spot: '#7a4a24', seed: 3 }); cow(-160, 1350, 0.62, t, { col: '#4a3a2a', seed: 4, flip: -1 });
    human(560, 1380, 0.62, t, { body: '#7a5a3a', legs: '#4a3a2a', hair: '#3a2a1a', beard: 'short', hat: 'hood', hatCol: '#5a4a2a', face: 'calm', armR: 'hold', prop: 'stick', look: 0.4, seed: 1020 });
    human(1000, 1300, 0.5, t, { body: '#a84a2a', legs: '#4a3a2a', hair: '#2a1a10', hat: 'cap', hatCol: '#3a3a3a', face: 'smile', armR: 'hold', prop: 'stick', look: -0.4, flip: -1, seed: 1021 });
    push(-60, 1300, 0.6); rect(-120, -110, 240, 80, { wash: '#8a6a3a', washA: 1, w: 2.2, col: '#2a1608' }); for (let q = 0; q < 8; q++) pencil([[-110 + q * 28, -110], [-100 + q * 28, -170]], { w: 6, col: '#d8c060', pass2: false }); for (const wx of [-80, 80]) { ell(wx, -20, 34, 34, { wash: '#6a4a24', washA: 1, w: 2.2 }); for (let q = 0; q < 4; q++) pencil([[wx, -20], [wx + Math.cos(q * 0.8) * 32, -20 + Math.sin(q * 0.8) * 32]], { w: 2, col: '#2a1608', pass2: false }); } pop();
    return moo;
  }
  function easel(t) {                                                // мольберт Тома: на холсте — тот же пейзаж с коровами
    push(260, 1640, 1); pencil([[-80, 0], [0, -420]], { w: 9, col: '#6a4424', pass2: false }); pencil([[80, 0], [0, -420]], { w: 9, col: '#6a4424', pass2: false }); pencil([[0, -420], [10, 0]], { w: 7, col: '#5a3418', pass2: false });
    const c = rect(-120, -380, 240, 190, { wash: '#f2ecd8', washA: 1, w: 3, col: '#3a2410' }); ctx.save(); ctx.clip(c.path); vgrad(-380, -190, ['#a8c8e0', '#f0e0b0']); poly([[-120, -230], [120, -250], [120, -190], [-120, -190]], { wash: '#a8a85a', washA: 1, line: false }); for (let q = 0; q < 4; q++) rect(-60 + q * 16, -300, 8, 70, { wash: '#e0d4b8', washA: 1, line: false }); ell(50, -214, 22, 10, { wash: '#f2ece0', washA: 1, w: 1 }); ctx.restore();
    pencil([[-130, -186], [130, -186]], { w: 8, col: '#6a4424', pass2: false });
    if (t > EV.fr_field) txt('Campo Vaccino', 0, -400, 34, { font: 'Hand', col: '#3a2410', reveal: clamp((t - EV.fr_field) / 0.6) });
    pop();
  }
  function sign(t) { if (t < EV.fr_field) return; const k = popK(t, EV.fr_field, 0.4); push(820, 1580, k, 0.06); pencil([[0, 0], [0, -260]], { w: 12, col: '#6a4424' }); const b = poly([[-170, -300], [150, -300], [190, -250], [150, -200], [-170, -200]], { wash: '#efe2c0', washA: 1, w: 3, col: '#3a2410' }); txt('CAMPO VACCINO', -10, -250, 40, { font: 'Osw', col: '#3a2410' }); pop(); }
  WORLD.forum = (t, u, cat) => {
    lay(40, () => { vgrad(-900, 1100, ['#7aa0c0', '#c8d4d0', '#f2dcb0', '#f6c890']); glow(1000, 700, 600, 'rgba(255,220,150,1)', 0.5); for (let k = 0; k < 4; k++) { const x = (k * 440 + t * 10) % 1800 - 300; for (let q = 0; q < 6; q++) ell(x + q * 52, 300 + k * 90 - Math.sin(q / 5 * Math.PI) * 30, 50, 28, { wash: '#fbecd4', washA: 0.85, w: 1, col: '#b8a888', a: 0.25 }); } });
    lay(12, () => { hillsBack(t); haze('#f2dcb0', 0.18); });
    lay(4, () => { ruins(t); haze('#f2dcb0', 0.05); });
    let moo = 0; lay(2.2, () => { moo = field(t); });
    lay(1, () => { const g = poly([[-400, 1480], [1500, 1480], [1500, 2400], [-400, 2400]], { wash: '#98984a', washA: 1, w: 2, col: '#3a3a14', key: 10170 });
      for (let k = 0; k < 80; k++) { const r = rng(10171 + k), x = -400 + r() * 1900, y = 1500 + r() * 500; pencil([[x, y], [x - 5, y - 24]], { w: 2.4, col: '#4a5a1a', a: 0.7, pass2: false }); pencil([[x + 4, y], [x + 9, y - 20]], { w: 2.4, col: '#6a7a2a', a: 0.7, pass2: false }); }
      for (const [x, y] of [[-80, 1720], [1100, 1600]]) { push(x, y, 1); const d = poly([[-90, 0], [-80, -50], [70, -60], [94, -10], [80, 0]], { wash: '#e0d4b8', washA: 1, w: 2.2, col: '#4a3a24' }); for (let q = -3; q <= 3; q++) pencil([[q * 22, -4], [q * 22, -50]], { w: 1.4, col: '#8a7a5a', a: 0.6, pass2: false }); pop(); }
      easel(t); cat(); sign(t);
      if (moo > 0) cow(1240 - moo * 260, 1800, 1.5, t, { col: '#f2ece0', spot: '#2a2420', seed: 5, moo }); });
    motes(30, [0, 600, W, 1700], '#fff0c0', t, 10180, { sp: -8, sz: 3, a: 0.6, tw: 1, add: 1, wob: 30 });
  };
  DIR.forum = {
    outfit: 'dutch', light: { side: 1, rim: '#ffd890' }, grade: ['#e0a060', 0.14],
    act: () => [[S0.forum, 'neutral'], [EV.fr_waist, 'awe'], [EV.fr_cows, 'shock'], [EV.fr_field, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 540, y: 1660, s: 0.9, prop: 'brush', hand: t < EV.fr_cows ? [-110, -260] : [70, -300], look: t < EV.fr_cows ? [-0.7, 0] : [0.7, 0.2], tilt: t > EV.fr_field ? 0.07 : 0, tailUp: t > EV.fr_cows }),
    cam: () => [[S0.forum, 540, 1120, -0.04], [EV.fr_waist, 600, 1180, 0.0], [EV.fr_cows, 640, 1300, 0.06, 'x'], [EV.fr_field, 600, 1260, 0.02], [S1.forum, 600, 1260, 0.06]],
    hud: t => { stamp(t, EV.fr_field + 0.1, 'truth', 330, 900, -0.1, 0.8); }
  };
  // ---------------------------------------------------------------- переход В сцену: краска стекает подтёками
  TRANS_IN.forum = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {
    drawBuf(A); const q = sm(k), cols = ['#3a6ab0', '#c8504a', '#e8c04a', '#5a8a5a', '#d8a070'];
    const p = new Path2D(); p.moveTo(0, 0); for (let x = 0; x <= W; x += 30) { const r = rng(10190 + x), y = (q * 1.6 - 0.3 + r() * 0.3 * Math.sin(x * 0.02)) * H + Math.sin(x * 0.05 + r()) * 60; p.lineTo(x, Math.max(0, y)); } p.lineTo(W, 0); p.closePath();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clip(p); ctx.drawImage(B, 0, 0); ctx.restore();
    scr(() => { for (let x = 0; x <= W; x += 30) { const r = rng(10190 + x), y = (q * 1.6 - 0.3 + r() * 0.3 * Math.sin(x * 0.02)) * H + Math.sin(x * 0.05 + r()) * 60; if (y > 0 && y < H) { ell(x, y, 22, 30, { wash: cols[(x / 30) % 5], washA: 0.85, line: false }); pencil([[x, y - 120], [x, y]], { w: 16, col: cols[(x / 30) % 5], a: 0.5, pass2: false }); } } });
  } };
})();
