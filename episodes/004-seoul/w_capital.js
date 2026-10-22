/* 004 — сцена `capital`: 1394, долина Ханъяна у подножия Пугаксана, осень. Король Тэджо под красным зонтом указывает на гору,
   чиновники разворачивают карту, солдаты со стягами, рабочие вбивают колья — размечают дворец (пунктир-верёвки). Соломенные хижины,
   золотые рисовые поля, ручей Чхонгечхон, сосны. Том-чиновник с компасом геоманта. На «Сеул» — «서울 = СТОЛИЦА» крупно, на «Креативно!» —
   Том разводит лапами. Переход В сцену — стрелка компаса раскручивает кадр. */
(() => {
  EV.cap_king = wtk('s2', 'столицей.');
  EV.cap_name = wtk('s2', 'Сеул');
  EV.cap_eq = wtk('s2', 'столица».');
  EV.cap_lol = wtk('s2', 'Креативно!');
  KEYW.push('столицей.', '«столица».');

  function valley(t) {
    vgrad(-900, 900, ['#5a9ad0', '#9ac4e0', '#f0e2c0'], 1);
    for (let i = 0; i < 4; i++) { const x = ((i * 380 + t * 14) % 1800) - 400, y = 60 + i * 70; for (let k = 0; k < 5; k++) ell(x + k * 46, y + Math.sin(k) * 10, 60, 30, { wash: '#fbf6ec', washA: 0.85, line: false }); }
    for (let i = 0; i < 6; i++) { const bx = 200 + ((t * 40 + i * 140) % 900), by = 320 + Math.sin(t * 2 + i) * 20; pencil([[bx - 10, by], [bx, by + 5], [bx + 10, by]], { w: 2.4, col: '#2a2a2a', pass2: false }); }
  }
  function fields(t) {                                                 // долина: ручей, рисовые чеки, хижины, сосны
    const g = shape([[-500, 860], [1580, 860], [1580, 1700], [-500, 1700]], { wash: '#c8b06a', washA: 1, w: 1, col: '#000', a: 0.2 });
    for (let i = 0; i < 6; i++) { const y = 880 + i * 46, P = [[-500, y], [1580, y + 6]]; pencil(P, { w: 2, col: '#8a7a3a', a: 0.6, pass2: false }); }
    const r = rng(9400); for (let i = 0; i < 26; i++) { const x = -400 + r() * 1900, y = 880 + r() * 260; rect(x, y, 70 + r() * 80, 20 + r() * 16, { wash: r() < 0.5 ? '#d8b84a' : '#c8a83a', washA: 0.9, w: 1.2, col: '#7a6a2a', a: 0.4 }); }
    const C = spline([[-500, 1030], [100, 1000], [400, 1060], [800, 1010], [1580, 1050]], false, 10); shape(tubeP(C, 36, 50), { wash: '#6aaad0', washA: 1, w: 1.6, col: '#2a4a6a', a: 0.6 });
    pencil(C.map(([a, b]) => [a, b - 4]), { w: 3, col: '#e8f4ff', a: 0.6, pass2: false });
    for (const [x, y, s] of [[-140, 950, 1], [-40, 930, 0.8], [1100, 950, 1], [1240, 935, 0.85], [1000, 925, 0.7]]) choga(x, y, s);
    for (const [x, y, h, sd] of [[-200, 960, 260, 1], [1250, 970, 300, 2], [60, 930, 180, 3], [1060, 920, 200, 4]]) pine(x, y, h, t, sd);
  }
  function choga(x, y, s) {                                            // соломенная хижина чога: глиняные стены, круглая соломенная крыша
    push(x, y, s); rect(-60, -60, 120, 60, { wash: '#c8a07a', washA: 1, w: 1.8, col: '#3a2a1a' }); rect(-20, -46, 26, 46, { wash: '#5a3a1a', washA: 1, w: 1.4, col: '#2a1a0a' }); rect(24, -44, 22, 18, { wash: '#efe4c6', washA: 1, w: 1.2, col: '#3a2a1a' });
    const rf = blob([[-86, -50], [-60, -100], [0, -116], [60, -100], [86, -50], [0, -60]], { wash: '#c8a84a', washA: 1, w: 2, col: '#5a4a1a' }); hatch(rf.path, rf.bb, { gap: 5, a: 0.3, col: '#7a5a1a', ang: 1.4, w: 1 });
    for (let k = -3; k <= 3; k++) pencil([[k * 24, -112 + Math.abs(k) * 6], [k * 30, -54]], { w: 1.4, col: '#6a4a1a', a: 0.6, pass2: false });
    pencil([[50, -100], [56, -130]], { w: 5, col: '#6a5a4a' }); for (let q = 0; q < 3; q++) ell(56 + q * 10, -140 - q * 22, 10 + q * 4, 8 + q * 3, { wash: '#e8e4dc', washA: 0.5, line: false });
    pop();
  }
  function plan(t) {                                                   // разметка дворца: колья, верёвки, вешки с флажками
    const k = clamp((t - S0.capital - 0.2) / 1.6);
    const C = [[220, 1110], [860, 1110], [800, 980], [280, 980]];
    for (let i = 0; i < 4; i++) { const a = C[i], b = C[(i + 1) % 4]; const R = resample([a, b], 18); const n = Math.floor(R.length * clamp(k * 4 - i)); for (let j = 0; j < n - 1; j += 2) pencil([R[j], R[j + 1]], { w: 2.6, col: '#f6efe0', a: 0.9, pass2: false }); }
    C.forEach(([x, y], i) => { if (k * 4 > i) { pencil([[x, y], [x, y - 60]], { w: 5, col: '#7a5a34' }); poly([[x, y - 60], [x + 30, y - 52], [x, y - 44]], { wash: ['#c8302a', '#2a5aa8', '#e8b030', '#2a8a5a'][i], washA: 1, w: 1.2, col: '#1a1a1a' }); } });
    if (k > 0.3) { const P = [[540, 1050], [540, 990]]; pencil(P, { w: 3, col: '#f6efe0', a: 0.8, pass2: false }); txt('дворец', 540, 1030, 36, { col: '#fff6e0', a: 0.8 * clamp(k * 2 - 0.6) }); }
  }
  function court(t) {                                                  // Тэджо под зонтом, чиновники с картой, солдаты со стягами, рабочие
    // солдаты со стягами (дальше)
    for (const [x, c, fx] of [[620, '#e8b030', 1], [700, '#c8302a', 1], [960, '#2a5aa8', -1]]) { human(x, 1180, 0.62, t, { body: '#1f2c4e', legs: '#2a2a30', hat: 'jeonrip', armR: 'hold', prop: 'spear', seed: x });
      const wv = Math.sin(t * 4 + x) * 10; const fy = 1180 - 0.62 * 470; shape([[x + 18, fy], [x + 110 + wv, fy + 10], [x + 100 + wv * 0.6, fy + 70], [x + 18, fy + 60]], { wash: c, washA: 1, w: 1.6, col: '#1a1a1a', a: 0.7 });
      ell(x + 62 + wv * 0.4, fy + 34, 14, 14, { wash: '#f6efe0', washA: 0.85, line: false }); }
    // король Тэджо: красный халат с золотым драконом, шапка иксонгван, красный зонт
    const kx = 800, ky = 1300, kp = t > EV.cap_king - 0.1 ? 'point' : 'down';
    pencil([[kx - 50, ky - 30], [kx - 50, ky - 400]], { w: 5, col: '#5a3a1a' });
    const um = blob([[kx - 160, ky - 360], [kx - 120, ky - 420], [kx - 50, ky - 440], [kx + 20, ky - 420], [kx + 60, ky - 360]], { wash: '#c8201e', washA: 1, w: 2.4, col: '#3a0a0a' }); goldBand([[kx - 158, ky - 362], [kx + 58, ky - 362]], 10, 9410, {});
    for (let q = 0; q < 6; q++) pencil([[kx - 150 + q * 40, ky - 358], [kx - 150 + q * 40 + Math.sin(t * 3 + q) * 3, ky - 330]], { w: 3, col: '#d6a842', pass2: false });
    human(kx, ky, 0.95, t, { body: '#b81e1a', bodyD: '#5a0a08', legs: '#3a1a10', long: 1, hat: 'ikseon', hair: '#1a1614', beard: 'short', face: t > EV.cap_king ? 'smile' : 'calm', armR: kp, armL: 'hold', belt: '#d6a842', seed: 41, look: 0.6 });
    const dx = kx, dy = ky - 0.95 * 190; ell(dx, dy, 22, 22, { wash: '#d6a842', washA: 1, w: 1.6, col: '#6a4a08' }); pencil(spline([[dx - 12, dy + 8], [dx - 4, dy - 10], [dx + 8, dy + 4], [dx + 14, dy - 8]], false, 8), { w: 2.4, col: '#8a1a0a', pass2: false });
    // чиновник со свитком-картой
    human(1000, 1330, 0.92, t, { body: '#2a6a5a', legs: '#2a2a2e', long: 1, hat: 'samo', beard: 'long', hair: '#3a3a3a', face: t > EV.cap_name ? 'shock' : 'calm', armR: 'hold', armL: 'hold', belt: '#8a1e1a', seed: 42, flip: -1 });
    push(960, 1150, 1, 0.05); const mp = rect(-80, -60, 160, 110, { wash: '#efe0b8', washA: 1, w: 2, col: '#4a3a1a' }); pencil(spline([[-60, 30], [-30, -30], [0, -40], [30, -30], [60, 30]], false, 8), { w: 2.4, col: '#3a5a3a', pass2: false }); pencil([[-70, 30], [70, 34]], { w: 3, col: '#4a7ab8', pass2: false }); rect(-14, -6, 28, 22, { wash: '#c8302a', washA: 0.7, w: 1.2, col: '#3a0a0a' });
    for (const sx of [-84, 84]) rect(sx - 6, -66, 12, 122, { wash: '#7a4a24', washA: 1, w: 1.4, col: '#2a1a0a' }); pop();
    // рабочий вбивает кол (слева)
    const hm = Math.sin(t * 7); human(120, 1260, 0.8, t, { body: '#e8e0cc', legs: '#d6cdb6', hat: 'topknot', armR: hm > 0 ? 'up' : 'hold', armL: 'hold', face: 'calm', seed: 43, flip: 1 });
    pencil([[200, 1260], [200, 1180]], { w: 8, col: '#7a5a34' }); if (hm < -0.8) { pencil([[190, 1176], [170, 1160]], { w: 2, col: '#fff2c8', pass2: false }); pencil([[210, 1176], [230, 1160]], { w: 2, col: '#fff2c8', pass2: false }); }
    human(330, 1220, 0.7, t, { body: '#d8d0bc', legs: '#c6bda6', hat: 'straw', armR: 'hold', prop: 'stick', propAng: 0.3, seed: 44 });
  }
  function compass(x, y, s, t) {                                       // компас геоманта (пхэчхоль): кольца с делениями, стрелка
    push(x, y, s, 0.1); const cp = ell(0, 0, 70, 70, { wash: '#c8902a', washA: 1, w: 2.4, col: '#3a2408' }); metalG(cp.path, -20, -20, 80, '#f6d88a', '#c8902a', '#6a4a10');
    for (const r of [58, 46, 34]) pencil(ellPts(0, 0, r, r, 0, 0, 40), { w: 1.4, col: '#3a2408', a: 0.8, pass2: false });
    for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283; pencil([[Math.cos(a) * 46, Math.sin(a) * 46], [Math.cos(a) * 58, Math.sin(a) * 58]], { w: 1.2, col: '#3a2408', a: 0.7, pass2: false, gap: false }); }
    ell(0, 0, 22, 22, { wash: '#1a2a3a', washA: 1, w: 1.6, col: '#000' });
    const na = t < EV.cap_king ? t * 9 : -1.4 + Math.sin(t * 6) * 0.05; push(0, 0, 1, na); poly([[-3, 0], [3, 0], [0, -20]], { wash: '#c8302a', washA: 1, line: false }); poly([[-3, 0], [3, 0], [0, 20]], { wash: '#f6f2ea', washA: 1, line: false }); pop();
    pop();
  }

  WORLD.capital = (t, u, cat) => {
    lay(30, () => valley(t));
    lay(14, () => bugak(900, 1.15, { far: '#a8b8c8', mid: '#7a8a6a', near: '#6a7a4a', rock: '#e2dccc' }));
    lay(4, () => { fields(t); plan(t); });
    lay(1.8, () => court(t));
    lay(1, () => { const g = shape([[-400, 1380], [1480, 1380], [1480, 2400], [-400, 2400]], { wash: '#b89a5a', washA: 1, w: 1, col: '#000', a: 0.2 }); hatch(g.path, g.bb, { gap: 9, a: 0.12, col: '#5a4a2a', ang: 0.1, w: 1.2 });
      const r = rng(9420); for (let i = 0; i < 40; i++) { const x = -200 + r() * 1500, y = 1400 + r() * 500; pencil([[x, y], [x + 4, y - 18]], { w: 2, col: '#7a6a2a', a: 0.6, pass2: false }); pencil([[x + 6, y], [x + 12, y - 14]], { w: 2, col: '#8a7a3a', a: 0.6, pass2: false }); }
      cat(); });
    lay(0.66, () => { pine(-330, 2100, 900, t, 7, { leaf: '#24442a' }); for (let k = 0; k < 8; k++) { const x = 980 + k * 30, h = 120 + (k % 3) * 40; pencil([[x, 1960], [x + Math.sin(t * 2 + k) * 10, 1960 - h]], { w: 4, col: '#b89a3a', pass2: false }); ell(x + Math.sin(t * 2 + k) * 10, 1960 - h, 6, 16, { wash: '#d8b84a', washA: 1, line: false }); } });
  };
  DIR.capital = {
    outfit: 'gwanbok', light: { side: 1, rim: '#fff0c8' }, grade: ['#e0a040', 0.1],
    act: () => [[S0.capital, 'talk'], [EV.cap_king, 'proud'], [EV.cap_name - 0.05, 'sideeye'], [EV.cap_eq, 'smug'], [EV.cap_lol - 0.04, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 420, y: 1460, s: 1.12, look: t < EV.cap_name ? [0.6, -0.2] : [0, 0.05],
      hand: t > EV.cap_lol ? [150, -300] : [110, -250], handF: t > EV.cap_lol ? [-150, -300] : undefined, tilt: t > EV.cap_lol ? 0.06 : 0 }),
    afterCat: (t, u, P) => { if (t < EV.cap_lol) compass(P.x + 128 * P.s, P.y - 290 * P.s, 0.85, t); },
    cam: () => [[S0.capital, 560, 900, 0.22], [S0.capital + 0.8, 560, 1020, 0.1], [EV.cap_name, 520, 1080, 0.12], [EV.cap_lol, 500, 1120, 0.16], [S1.capital, 500, 1110, 0.2]],
    hud: t => { if (t > EV.cap_name && t < S1.capital) { const k = popK(t, EV.cap_name, 0.35), k2 = popK(t, EV.cap_eq, 0.35);
      push(540, 640, 0.7 + 0.3 * k, -0.03); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.82)'; ctx.fillRect(-420, -110, 840, 220); ctx.restore();
      txt('서울', -250, -6, 150, { font: 'KSign', col: '#f6e7c8', a: k, bold: false });
      if (t > EV.cap_eq) { txt('=', -95, -6, 110, { font: 'Osw', col: '#e8a33c', a: k2 }); txt('«СТОЛИЦА»', 170, -6, 86, { font: 'Osw', col: '#e8a33c', a: k2 }); }
      pop(); } }
  };

  // ---------------------------------------------------------------- переход В capital: стрелка компаса раскручивает кадр
  TRANS_IN.capital = { a: 0.3, b: 0.4, runA: 0.5, fx(k, t, A, B) {
    const q = sm(k), cx = 540, cy = 980;
    if (k < 0.5) drawBuf(A, 1 - q * 0.5, cx, cy, 1, null, 0, 0, q * 5); else drawBuf(B, 0.5 + q * 0.5, cx, cy, 1, null, 0, 0, -(1 - q) * 5);
    scr(() => { const R = 420 + 300 * Math.sin(k * Math.PI), a = Math.sin(k * Math.PI);
      for (const rr of [1, 0.82, 0.64]) pencil(ellPts(cx, cy, R * rr, R * rr, 0, 0, 80), { w: 10, col: '#d6a842', a: 0.9 * a, pass2: false, gap: false });
      for (let i = 0; i < 48; i++) { const an = i / 48 * 6.283 + k * 4; pencil([[cx + Math.cos(an) * R * 0.82, cy + Math.sin(an) * R * 0.82], [cx + Math.cos(an) * R, cy + Math.sin(an) * R]], { w: 3, col: '#f6dc8a', a: 0.8 * a, pass2: false, gap: false }); }
      push(cx, cy, 1, k * 14); poly([[-16, 0], [16, 0], [0, -R * 0.6]], { wash: '#c8302a', washA: a, w: 2, col: '#3a0a0a', a }); poly([[-16, 0], [16, 0], [0, R * 0.6]], { wash: '#f6f2ea', washA: a, w: 2, col: '#3a0a0a', a }); pop(); });
  } };
})();
