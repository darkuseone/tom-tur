/* 002 · сцена sea — −310 млн лет, средний карбон (московский век). Тёплое мелкое море на месте Москвы:
   лес морских лилий, ругозы-рожки и колониальные кораллы, мшанки-веера, брахиоподы, гониатиты, «снег» фузулин,
   стетакант с плавником-«наковальней»; таймлапс: ракушки → слои → белый известняк; музейная табличка «МОСКОВСКИЙ ВЕК».
   Переход В сцену: «плюх» из туннеля времени в море (поверхность налетает, всплеск, облако пузырей). */
(() => {
  // ---------------------------------------------------------------- время слова внутри субтитра-фрагмента (по доле букв)
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const WW = (k, w) => { const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const all = c.words.join(' ').length; let off = 0; for (const x of c.words) { if (nrm(x) === nrm(w)) break; off += x.length + 1; }
    return c.t0 + (c.t1 - c.t0) * off / all; };

  // ---------------------------------------------------------------- события (всё от реплик)
  EV.sea_splash = S0.sea + 0.04;                       // удар о воду (переход)
  EV.sea_land = S0.sea + 0.62;                          // Том оседает на дно, муть
  EV.sea_mln = WW('c1', 'миллионов');
  EV.sea_warm = WW('c1', 'тёплое');
  EV.sea_sharkTop = WW('c1', 'море.') + 0.05;          // стетакант проходит прямо над шлемом
  EV.sea_shark = EV.sea_sharkTop - 0.62;                // входит справа (пока Том блаженствует)
  EV.sea_shell = LS('c2') + 0.15;                       // Том подбирает ракушку
  EV.sea_lapse = EV.sea_shell + 0.15;                   // таймлапс: ракушки сыплются, слои растут
  EV.sea_white = WW('c2', 'белый') + 0.12;              // слои спрессовались в белый известняк
  EV.sea_stone = WW('c2', 'камень.');
  EV.sea_knock = WW('c2', 'век');                       // Том стучит по блоку
  EV.sea_stamp = WW('c2', 'московский!') + 0.06;        // табличка бахает на камень
  EV.sea_seal = EV.sea_stamp + 0.32;                    // красный штамп «Никитин, 1890»
  SHAKES.push([EV.sea_land, 0.25, 7], [EV.sea_sharkTop, 0.35, 7], [EV.sea_white, 0.35, 12], [EV.sea_stamp, 0.45, 20], [EV.sea_seal, 0.2, 7]);
  KEYW.push('миллионов', 'море.', 'ракушек', 'белый', 'камень.', 'московский!');

  // ---------------------------------------------------------------- дешёвые штрихи (ширина в экранных px)
  const ln = (P, w, col, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w / S; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); ctx.restore(); };
  const dot = (x, y, r, col, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, Math.max(0.2, r), 0, 6.3); ctx.fill(); ctx.restore(); };
  const BX = 660, BX1 = 1020, BTOP = 1176;                // белый блок известняка (фронт)
  const TX = 420;                                        // Том на дне

  // ---------------------------------------------------------------- фауна и флора карбона
  function crinoid(x, y, h, t, seed, o = {}) {           // морская лилия: стебель-«чётки», чашечка, перистые руки
    const r = rng(seed), ph = r() * 6.28, sw = Math.sin(t * 0.8 + ph) * 0.13 + Math.sin(t * 1.9 + ph) * 0.035 + (o.lean || 0);
    const col = o.col || '#b8573a', colL = o.colL || '#e39a62', cheap = o.cheap;
    const P = []; for (let i = 0; i <= 12; i++) { const k = i / 12; P.push([x + Math.sin(sw * k * 1.4) * h * k * 0.8 + Math.sin(k * 3 + seed) * 6, y - h * k * (1 - 0.1 * Math.abs(sw))]); }
    if (cheap) ln(P, o.w || 5, col, o.a ?? 1); else pencil(P, { w: o.w || 5.5, col: o.lineC || '#2a120c', a: 0.9 });
    if (!cheap) { ln(P, (o.w || 5.5) * 0.6, colL, 0.8); for (let i = 1; i < P.length - 1; i++) { const a = P[i - 1], b = P[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, n = [-dy / L * 5, dx / L * 5];
      ln([[P[i][0] - n[0], P[i][1] - n[1]], [P[i][0] + n[0], P[i][1] + n[1]]], 1.4, '#2a120c', 0.6); } }
    const [cx, cy] = P[12], [px, py] = P[10], ang = Math.atan2(cy - py, cx - px), sc = h / 420;
    const open = 0.75 + 0.25 * Math.sin(t * 0.9 + ph * 2);
    push(cx, cy, sc, ang + Math.PI / 2);
    const m = o.arms || 10;
    for (let j = 0; j < m; j++) {
      const base = (j / (m - 1) - 0.5) * 2.3 * open, L = 165 + (j % 3) * 24, pts = [];
      for (let s = 0; s <= 8; s++) { const k = s / 8, a = base * (0.6 + k * 0.7) - Math.PI / 2 + Math.sign(base) * Math.pow(k, 3) * -1.2 * open + Math.sin(t * 1.3 + j + k * 2) * 0.05; const prev = pts.length ? pts[pts.length - 1] : [0, -12]; pts.push(s ? [prev[0] + Math.cos(a) * L / 8, prev[1] + Math.sin(a) * L / 8] : [0, -12]); }
      if (cheap) ln(pts, 3, col, o.a ?? 1); else { pencil(pts, { w: 3.2, col: '#2a120c', a: 0.85, pass2: false, gap: false }); ln(pts, 2.2, colL, 0.9); }
      if (!cheap) for (let s = 1; s < pts.length; s++) { const a = pts[s - 1], b = pts[s], dx = b[0] - a[0], dy = b[1] - a[1], Ln = Math.hypot(dx, dy) || 1, nx = -dy / Ln, ny = dx / Ln, pl = 11 * (1 - s / 10);
        for (const sd of [-1, 1]) ln([b, [b[0] + (nx * sd + dx / Ln * 0.8) * pl, b[1] + (ny * sd + dy / Ln * 0.8) * pl]], 1.3, colL, 0.75); }
    }
    if (cheap) dot(0, -4, 9, col, o.a ?? 1); else blob([[-11, 6], [-15, -8], [0, -16], [15, -8], [11, 6], [0, 12]], { wash: col, washA: 0.98, w: 2.6, col: '#2a120c', shade: { gap: 5, a: 0.3, col: '#3a140a', ang: 0.9 } });
    pop();
  }
  function hornCoral(x, y, s, rot, col = '#d9b48a') {     // ругоза: одиночный коралл-рожок с септами
    push(x, y, s, rot);
    const P = [[0, 0], [-12, -20], [-26, -60], [-34, -100], [-30, -126], [10, -136], [44, -122], [34, -90], [20, -50], [10, -14], [0, 0]];
    const p = shape(P, { wash: col, washA: 0.98, w: 2.8, col: '#2a1a10', shade: { gap: 6, a: 0.3, col: '#5a3a20', ang: 1.1 } });
    for (let k = 1; k < 7; k++) { const yy = -k * 18, ww = 8 + k * 6; ln([[-ww * 0.9 + 4, yy], [-ww * 0.2, yy + 4], [ww * 0.8 + 6, yy - 2]], 1.6, '#6a4a2a', 0.7); }
    ell(7, -130, 38, 12, { wash: '#f0dcbc', washA: 1, w: 2.4, col: '#2a1a10', rot: -0.2 });
    for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283; ln([[7 + Math.cos(a) * 8, -130 + Math.sin(a) * 3], [7 + Math.cos(a) * 34, -130 + Math.sin(a) * 10]], 1.2, '#7a5a3a', 0.8); }
    pop(); return p;
  }
  function tubeCoral(x, y, s, seed, col = '#c98a5a') {   // колониальный коралл: пучок трубок (сирингопора)
    const r = rng(seed); push(x, y, s);
    blob([[-90, 0], [-80, -40], [-30, -70], [30, -74], [80, -44], [94, 0]], { wash: '#8a5a3a', washA: 0.95, w: 2.6, col: '#2a1a10', shade: { gap: 6, a: 0.35, col: '#3a2010' } });
    for (let i = 0; i < 13; i++) { const tx = -76 + i * 12.5 + (r() - 0.5) * 6, th = 60 + r() * 70 - Math.abs(i - 6) * 7, b = Math.sin(i * 1.7) * 10;
      ln([[tx, -30], [tx + b * 0.5, -30 - th * 0.5], [tx + b, -30 - th]], 9, '#2a1a10', 0.9); ln([[tx, -30], [tx + b * 0.5, -30 - th * 0.5], [tx + b, -30 - th]], 6, col, 1);
      ell(tx + b, -30 - th, 5.5, 2.6, { wash: '#4a2a18', washA: 1, w: 1.2, col: '#2a1a10' }); }
    pop();
  }
  function chaetetes(x, y, s, col = '#d8a070') {          // массивный коралл-«булыжник» с сотами
    push(x, y, s); const p = blob([[-80, 0], [-86, -50], [-40, -96], [30, -100], [84, -60], [90, 0]], { wash: col, washA: 0.98, w: 2.8, col: '#2a1a10', shade: { gap: 6, a: 0.3, col: '#6a3a1a', ang: 0.9 } });
    ctx.save(); ctx.clip(p.path); for (let j = 0; j < 7; j++) for (let i = 0; i < 12; i++) dot(-84 + i * 15 + (j % 2) * 7, -92 + j * 14, 2.6, '#6a3a1a', 0.55); ctx.restore(); pop();
  }
  function bryozoan(x, y, s, t, seed, col = '#e8a35a') {  // мшанка-веер (фенестелла): кружевная сетка
    const sw = Math.sin(t * 0.9 + seed) * 0.05; push(x, y, s, sw);
    const fan = []; for (let i = 0; i <= 12; i++) { const a = -Math.PI / 2 + (i / 12 - 0.5) * 1.6; fan.push([Math.cos(a) * 130, -20 + Math.sin(a) * 130]); }
    const P = [[0, 0]].concat(fan, [[0, 0]]); const p = pathOf(P); wash(p, col, 0.4);
    ctx.save(); ctx.clip(p); for (let i = 0; i <= 14; i++) { const a = -Math.PI / 2 + (i / 14 - 0.5) * 1.6; ln([[0, 0], [Math.cos(a) * 140, -20 + Math.sin(a) * 140]], 1.6, '#7a3a1a', 0.75); }
    for (let k = 1; k < 10; k++) { const rr = k * 14, arc = []; for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + (i / 10 - 0.5) * 1.6; arc.push([Math.cos(a) * rr, -20 + Math.sin(a) * rr + 20 * (1 - k / 10)]); } ln(arc, 1.1, '#7a3a1a', 0.55); }
    ctx.restore(); pencil(P, { w: 2.4, col: '#3a1a0c', a: 0.8, pass2: false }); pop();
  }
  function brachio(x, y, s, rot, col = '#cdb58e') {        // брахиопода-спирифер: крылатая ребристая створка
    push(x, y, s, rot);
    const P = [[-58, 0], [-40, -18], [-14, -30], [0, -36], [14, -30], [40, -18], [58, 0], [30, 8], [0, 12], [-30, 8], [-58, 0]];
    shape(P, { wash: col, washA: 0.98, w: 2.4, col: '#2a1a10' });
    for (let k = -5; k <= 5; k++) ln([[k * 2, 10], [k * 10, -22 + Math.abs(k) * 3]], 1.3, '#6a4a2a', 0.75);
    ln([[-6, -36], [0, -44], [6, -36]], 2, '#2a1a10', 0.9); pop();
  }
  function goniatite(x, y, s, t, seed, flip = 1) {        // гониатит: спиральная раковина с зигзагом шва, щупальца
    const bob = Math.sin(t * 3 + seed) * 6, jet = Math.max(0, Math.sin(t * 3 + seed)) * 0.25;
    push(x, y + bob, s, Math.sin(t * 1.5 + seed) * 0.06, flip);
    for (let k = 0; k < 9; k++) { const a = Math.PI * 0.85 + (k / 8 - 0.5) * 0.9, L = 50 + (k % 3) * 12 + jet * 30;
      ln([[-38, 6], [-38 + Math.cos(a) * L * 0.6, 6 + Math.sin(a) * L * 0.6 + Math.sin(t * 6 + k) * 4], [-38 + Math.cos(a) * L, 6 + Math.sin(a) * L + Math.sin(t * 6 + k + 1) * 7]], 3, '#c88a7a', 0.9); }
    ell(0, 0, 52, 50, { wash: '#d6b27c', washA: 0.99, w: 3, col: '#2a1a10' });
    for (let k = 0; k < 6; k++) { const a0 = k * 1.05 + 0.4, R = 50; const sut = []; for (let i = 0; i <= 6; i++) { const rr = lerp(R * 0.98, 16, i / 6), a = a0 + (i % 2 ? 0.16 : -0.05); sut.push([Math.cos(a) * rr, Math.sin(a) * rr]); } ln(sut, 1.8, '#6a3a1a', 0.85); }
    for (let k = 0; k < 4; k++) { const a = k * 1.6; ctx.save(); ctx.globalAlpha = 0.4; ctx.strokeStyle = '#7a4a24'; ctx.lineWidth = 7 / S; ctx.beginPath(); ctx.arc(0, 0, 40, a, a + 0.7); ctx.stroke(); ctx.restore(); }
    pencil(ellPts(4, 2, 22, 21, 0, 0.2, 30), { w: 2.2, col: '#3a2010', a: 0.8, pass2: false });
    dot(-30, -6, 5, '#1a0e08'); dot(-31.5, -7.5, 1.6, '#fff');
    pop();
  }
  function fishSchool(cx, cy, t, n, seed, s = 1, col = '#3a6a78') {   // палеонисциды: стайка ганоидных рыбок
    const r = rng(seed);
    for (let i = 0; i < n; i++) { const ox = (r() - 0.5) * 300, oy = (r() - 0.5) * 140, sp = 0.6 + r() * 0.3, x = cx + ox + Math.sin(t * sp + i) * 30, y = cy + oy + Math.sin(t * 1.3 * sp + i * 2) * 14;
      push(x, y, s * (0.7 + r() * 0.5)); const wg = Math.sin(t * 10 + i) * 0.25;
      sil([[-30, 0], [-12, -9], [14, -7], [26, 0], [14, 7], [-12, 8]], col, 0.9); sil([[24, 0], [40 + wg * 10, -14], [34, 0], [42 + wg * 10, 8]], col, 0.9); dot(-22, -2, 1.6, '#e8f4f0', 0.8); pop(); }
  }
  function stetha(x, y, s, t) {                          // стетакант: акула-«наковальня» (спинной плавник-щётка, щётка на голове)
    push(x, y, s); const wg = Math.sin(t * 9) * 0.16, wb = Math.sin(t * 9 - 1) * 10;
    // хвост (гетероцеркальный)
    push(205, 0, 1, wg); shape([[0, -12], [70, -50], [140, -96], [118, -40], [96, -4], [118, 40], [60, 22], [0, 14], [0, -12]], { wash: '#3f5866', washA: 0.99, w: 3, col: '#0e1418' }); pop();
    // длинный «хлыст» грудного плавника
    shape([[-120, 34], [-70, 60], [-10, 104 + wb], [-30, 70], [-80, 40], [-120, 34]], { wash: '#344a56', washA: 0.97, w: 2.6, col: '#0e1418' });
    const body = [[-270, 6], [-250, -26], [-190, -52], [-90, -62], [30, -56], [140, -34], [215, -14], [220, 12], [140, 30], [20, 50], [-110, 48], [-210, 34], [-262, 22], [-270, 6]];
    const bp = shape(body, { wash: '#4c6a78', washA: 0.99, w: 3.6, col: '#0e1418', shade: { gap: 7, a: 0.28, col: '#0e1a22', ang: -0.2 } });
    ctx.save(); ctx.clip(bp.path); const g = ctx.createLinearGradient(0, -60, 0, 50); g.addColorStop(0, 'rgba(20,34,44,0.6)'); g.addColorStop(0.55, 'rgba(0,0,0,0)'); g.addColorStop(0.75, 'rgba(230,236,226,0.75)'); g.addColorStop(1, 'rgba(240,244,236,0.9)'); ctx.fillStyle = g; ctx.fillRect(-280, -70, 520, 130); ctx.restore();
    // плавник-наковальня: стойка + плоская «щётка» с зубчиками
    shape([[-70, -58], [-80, -120], [-92, -168], [-40, -170], [-22, -120], [-6, -58]], { wash: '#3a5260', washA: 0.99, w: 3, col: '#0e1418' });
    const top = shape([[-126, -166], [-110, -192], [12, -196], [28, -170], [-126, -166]], { wash: '#2c3e4a', washA: 0.99, w: 3, col: '#0e1418' });
    for (let i = 0; i < 18; i++) { const bx = -118 + i * 8; ln([[bx, -192], [bx + 2, -204 - (i % 2) * 4]], 2.2, '#0e1418', 0.9); dot(bx + 3, -182, 1.8, '#a8c0c8', 0.8); }
    // щётка-«шипы» на голове, жабры, глаз, рот
    for (let i = 0; i < 9; i++) ln([[-215 + i * 8, -42 + i * 0.5], [-213 + i * 8, -52]], 2, '#0e1418', 0.85);
    for (let i = 0; i < 5; i++) ln([[-160 + i * 11, -16], [-166 + i * 11, 22]], 2, '#0e1418', 0.7);
    shape([[-60, 44], [-30, 76], [-4, 48]], { wash: '#3a5260', washA: 0.99, w: 2.4, col: '#0e1418' });
    ell(-222, -14, 9, 8, { wash: '#e8d890', washA: 1, w: 2, col: '#0e1418' }); dot(-224, -14, 4.5, '#0e1418'); dot(-226, -16, 1.6, '#fff');
    ln([[-268, 14], [-236, 22], [-206, 20]], 2.4, '#0e1418', 0.9); for (let i = 0; i < 6; i++) ln([[-262 + i * 9, 16], [-260 + i * 9, 22]], 1.6, '#f2f0e6', 0.9);
    pop();
  }
  function bubbles(x0, y0, t, n, seed, o = {}) {           // пузыри: всплывают, качаются, растут
    const rise = o.rise || 520, sp = o.sp || 0.8;
    for (let i = 0; i < n; i++) { const r = rng(seed * 31 + i), ph = ((t - (o.t0 || -99)) * sp * (0.7 + r() * 0.6) + r()) % 1; if (o.t0 !== undefined && t < o.t0) continue;
      const y = y0 - ph * rise, x = x0 + Math.sin(ph * 9 + i) * 14 * ph + (r() - 0.5) * (o.spread || 20), R = (o.r || 6) * (0.5 + r()) * (0.6 + ph * 0.7);
      ctx.save(); ctx.globalAlpha = (o.a || 0.85) * (1 - ph * 0.7); ctx.strokeStyle = '#e6fbff'; ctx.lineWidth = 2 / S; ctx.beginPath(); ctx.ellipse(x, y, R, R * 0.9, 0, 0, 6.3); ctx.stroke(); ctx.fillStyle = 'rgba(200,245,255,0.18)'; ctx.fill(); ctx.restore(); dot(x - R * 0.35, y - R * 0.35, R * 0.22, '#ffffff', 0.85 * (1 - ph * 0.7)); }
  }
  function fusulinaSnow(t, n, seed, box, speed = 1, a = 0.7) {   // «снег» фузулин: раковинки-рисинки фораминифер
    const [x0, y0, x1, y1] = box; ctx.save();
    for (let i = 0; i < n; i++) { const r = rng(seed * 100 + i), ph = r() * 6.28, sz = 3 + r() * 4;
      const x = x0 + ((r() * (x1 - x0) + Math.sin(t * 0.6 + ph) * 26) % (x1 - x0) + (x1 - x0)) % (x1 - x0), y = y0 + ((r() * (y1 - y0) + t * (16 + r() * 22) * speed) % (y1 - y0) + (y1 - y0)) % (y1 - y0);
      ctx.globalAlpha = a * (0.5 + 0.5 * r()); ctx.fillStyle = r() < 0.6 ? '#f2ead0' : '#d8e8e0'; ctx.beginPath(); ctx.ellipse(x, y, sz * 1.6, sz * 0.62, t * 0.5 + ph, 0, 6.3); ctx.fill();
      if (speed > 2) { ctx.globalAlpha *= 0.45; ctx.fillRect(x - 0.8, y - sz * speed * 2, 1.6, sz * speed * 2); } }
    ctx.restore();
  }
  function phylloid(x, y, h, t, seed, col = '#a8902e') {  // филлоидные водоросли: волнистые листы-«чипсы»
    const r = rng(seed);
    for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.45 + Math.sin(t * 1.1 + i + seed) * 0.08, L = h * (0.7 + r() * 0.4), w = L * 0.3, ex = x + Math.cos(a) * L, ey = y + Math.sin(a) * L, nx = -Math.sin(a), ny = Math.cos(a);
      const P = [[x, y]]; for (let k = 1; k <= 6; k++) { const q = k / 6, cx = lerp(x, ex, q), cy = lerp(y, ey, q), ww = w * Math.sin(q * Math.PI) * (1 + 0.25 * Math.sin(q * 14 + t * 2)); P.push([cx + nx * ww, cy + ny * ww]); }
      for (let k = 5; k >= 1; k--) { const q = k / 6, cx = lerp(x, ex, q), cy = lerp(y, ey, q), ww = w * Math.sin(q * Math.PI) * (1 + 0.25 * Math.sin(q * 14 + 1 + t * 2)); P.push([cx - nx * ww, cy - ny * ww]); }
      P.push([x, y]); shape(P, { wash: col, washA: 0.92, w: 2.4, col: '#2a2208' }); ln([[x, y], [ex, ey]], 1.4, '#3a3010', 0.6); }
  }
  function caustics(t, x0, x1, y0, y1, a = 0.16) {         // каустика: сеть бегущих световых жилок
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = '#d8fff4'; ctx.lineCap = 'round';
    for (let set = 0; set < 2; set++) for (let i = 0; i < 9; i++) { ctx.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 1.7 + i * 2 + set)); ctx.lineWidth = (2.5 + (i % 3)) / S; ctx.beginPath();
      for (let x = x0; x <= x1; x += 40) { const yy = y0 + (y1 - y0) * ((i + 0.5) / 9) + Math.sin(x * 0.013 + t * (1.1 + set * 0.4) + i * 1.9) * 26 + Math.sin(x * 0.031 - t * 1.7 + i) * 10 + (set ? Math.sin(x * 0.02 + i) * 30 : 0); x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
      ctx.stroke(); }
    ctx.restore();
  }
  // ---------------------------------------------------------------- известняк: слои ракушек → белый блок с окаменелостями
  function shellLayers(t) {                               // таймлапс: ракушки оседают, слои растут
    const k = clamp((t - EV.sea_lapse) / (EV.sea_white - EV.sea_lapse)), nL = Math.floor(k * 9) + 1, frac = (k * 9) % 1;
    const sq = t > EV.sea_white - 0.12 ? sm((t - EV.sea_white + 0.12) / 0.12) : 0;
    push(0, GY, 1); ctx.scale(1, 1 - sq * 0.35); ctx.translate(0, -GY);
    for (let j = 0; j < nL; j++) { const h = 30, yb = GY + 4 - j * h, grow = j === nL - 1 ? frac : 1, yt = yb - h * grow, r = rng(j * 13 + 3);
      const top = []; for (let x = BX - 30; x <= BX1 + 30; x += 30) top.push([x, yt + Math.sin(x * 0.03 + j) * 4]);
      const P = top.concat([[BX1 + 30, yb], [BX - 30, yb]]); const p = pathOf(P); wash(p, j % 2 ? '#d9cfb2' : '#bfb59a', 0.97); ln(top, 2, '#5a4a30', 0.7);
      ctx.save(); ctx.clip(p); for (let q = 0; q < 16; q++) { const sx = BX - 20 + r() * (BX1 - BX + 40), sy = yb - r() * h; ctx.save(); ctx.globalAlpha = 0.75; ctx.strokeStyle = '#6a5a3a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(sx, sy, 5 + r() * 6, Math.PI, 0); ctx.stroke(); ctx.restore(); } ctx.restore(); }
    pop();
    if (k < 1) for (let i = 0; i < 46; i++) { const r = rng(i * 7 + 2), ph = ((t - EV.sea_lapse) * (2.2 + r() * 1.6) + r()) % 1, x = BX - 20 + r() * (BX1 - BX + 40), y = lerp(500, GY - nL * 30, ph);
      push(x, y, 0.32 + r() * 0.2, t * 4 + i); if (i % 3 === 0) brachio(0, 0, 1, 0, '#e8dcc0'); else { ctx.save(); ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 6, 0, 0, 6.3); ctx.fill(); ctx.restore(); } pop(); }
  }
  function limeBlock(t) {                                  // белый камень: блок с отпечатками лилий, фузулин, брахиопод
    const k = popK(t, EV.sea_white, 0.45), sy = 0.6 + 0.4 * k;
    push(BX, GY, 1); ctx.scale(lerp(1.08, 1, k), sy); ctx.translate(-BX, -GY);
    const T = BTOP, d = [52, -58];
    const front = [[BX, T], [BX1, T - 6], [BX1 + 4, GY], [BX - 4, GY + 4], [BX, T]], topF = [[BX, T], [BX + d[0], T + d[1]], [BX1 + d[0], T - 6 + d[1]], [BX1, T - 6], [BX, T]], side = [[BX1, T - 6], [BX1 + d[0], T - 6 + d[1]], [BX1 + d[0] + 2, GY - 70], [BX1 + 4, GY], [BX1, T - 6]];
    shape(side, { wash: '#c4bca6', washA: 1, w: 3, col: '#3a2e20', shade: { gap: 6, a: 0.3, col: '#5a4a34', ang: 1.2 } });
    const fp = shape(front, { wash: '#efe9da', washA: 1, w: 3.4, col: '#3a2e20' });
    shape(topF, { wash: '#faf6ec', washA: 1, w: 3, col: '#3a2e20' });
    softShade(fp.path, BX1, GY, BX + 200, T + 100, 'rgba(120,110,90,0.7)', 0.35);
    ctx.save(); ctx.clip(fp.path); const r = rng(77);
    for (let i = 0; i < 120; i++) dot(BX + r() * (BX1 - BX), T + r() * (GY - T), 1 + r() * 1.6, r() < 0.5 ? '#b8ad94' : '#d8cfba', 0.7);
    // стебли морских лилий — «чётки»
    for (const [x0, y0, x1, y1, n] of [[BX + 30, T + 60, BX + 210, T + 30, 14], [BX + 120, GY - 40, BX + 330, T + 150, 16]]) for (let i = 0; i < n; i++) { const q = i / (n - 1), x = lerp(x0, x1, q), y = lerp(y0, y1, q) + Math.sin(q * 3) * 14;
      ctx.save(); ctx.strokeStyle = '#8a7a5c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 5, 8, Math.atan2(y1 - y0, x1 - x0) + 1.57, 0, 6.3); ctx.stroke(); ctx.restore(); }
    // членики-«звёздочки» (поперечный срез стебля)
    for (const [x, y] of [[BX + 260, T + 70], [BX + 300, T + 98], [BX + 60, T + 190]]) { ell(x, y, 13, 13, { wash: '#ddd3bc', washA: 1, w: 2, col: '#6a5a40' }); for (let q = 0; q < 5; q++) { const a = q / 5 * 6.283; ln([[x, y], [x + Math.cos(a) * 8, y + Math.sin(a) * 8]], 1.6, '#6a5a40', 0.9); } }
    // фузулины-рисинки
    for (let i = 0; i < 16; i++) { const x = BX + 30 + r() * 320, y = T + 110 + r() * 150, a = r() * 3; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = '#7a6a4c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, 0, 10, 4, 0, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.stroke(); ctx.restore(); }
    // брахиопода и рожок-коралл отпечатком
    ctx.save(); ctx.globalAlpha = 0.6; brachio(BX + 300, T + 220, 0.8, 0.3, '#d8cdb4'); hornCoral(BX + 40, T + 130, 0.5, -1.2, '#d8cdb4'); ctx.restore();
    ctx.restore();
    // трещина-срез
    ln([[BX + 170, T - 2], [BX + 182, T + 40], [BX + 166, T + 74], [BX + 190, T + 120]], 2.6, '#3a2e20', 0.8);
    pop();
    if (t - EV.sea_white < 0.7) { const q = (t - EV.sea_white) / 0.7; for (let i = 0; i < 18; i++) { const r = rng(i * 5 + 9), a = Math.PI + r() * Math.PI, dd = 60 + q * 260 * (0.5 + r()); dot(BX + 180 + Math.cos(a) * dd * 1.4, GY - 20 + Math.sin(a) * dd * 0.4, 18 + 30 * q * r(), '#e8ecdc', 0.5 * (1 - q)); } }
  }
  function plaque(t) {                                     // музейная табличка + красный штамп
    if (t < EV.sea_stamp - 0.05) return;
    const k = clamp((t - EV.sea_stamp + 0.05) / 0.1), s = lerp(2.4, 1, sm(k)), bump = popK(t, EV.sea_stamp + 0.05, 0.3);
    push(BX + 180, BTOP + 120, s * (0.96 + 0.04 * bump), -0.035);
    ctx.save(); ctx.globalAlpha = 0.35 * k; ctx.fillStyle = '#000'; ctx.fillRect(-166, -52, 344, 120); ctx.restore();
    rect(-172, -62, 344, 124, { wash: '#2b1c12', washA: 0.97 * k + 0.03, w: 3, col: '#120a06', a: k });
    pencil([[-160, -50], [160, -50], [160, 50], [-160, 50], [-160, -50]], { w: 3, col: TM.brassL, a: 0.9 * k, pass2: false, gap: false });
    txt('МОСКОВСКИЙ ВЕК', 0, -16, 46, { col: '#f1d27a', font: 'Osw', a: k });
    txt('315–307 млн лет', 0, 28, 40, { col: '#f3e6c8', a: k });
    for (const [x, y] of [[-150, -40], [150, -40], [-150, 40], [150, 40]]) dot(x, y, 4, TM.brass, k);
    pop();
    if (t > EV.sea_seal) { const q = clamp((t - EV.sea_seal) / 0.08), s2 = lerp(2, 1, q); push(BX + 318, BTOP + 214, s2, 0.22);
      ctx.save(); ctx.globalAlpha = 0.82 * q; ctx.strokeStyle = '#b8322a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 54, 0, 6.3); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 44, 0, 6.3); ctx.stroke(); ctx.restore();
      txt('НИКИТИН', 0, -10, 22, { col: '#b8322a', font: 'Osw', a: 0.85 * q }); txt('1890', 0, 16, 24, { col: '#b8322a', font: 'Osw', a: 0.85 * q }); pop(); }
  }

  // ---------------------------------------------------------------- мир
  const sharkX = t => lerp(1750, -1000, (t - EV.sea_shark) / 1.8);
  WORLD.sea = (t, u, cat) => {
    const lap = t > EV.sea_lapse && t < EV.sea_white ? 1 : 0, lapK = clamp((t - EV.sea_lapse) / (EV.sea_white - EV.sea_lapse));
    // 1. толща воды и поверхность снизу
    lay(40, () => {
      vgrad(-1800, 3800, ['#bff4ea', '#5fc4c8', '#1f8a9e', '#0e5a72', '#08384c', '#062a3a']);
      const sy = -40; ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 7; i++) { ctx.globalAlpha = 0.22; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = (4 - i * 0.4) / S; ctx.beginPath(); for (let x = -1400; x <= W + 1400; x += 30) { const y = sy + i * 34 + Math.sin(x * 0.012 + t * 1.6 + i) * 10 + Math.sin(x * 0.04 - t * 2.2) * 4; x === -1400 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
      ctx.restore(); glow(760, -60, 520, 'rgba(255,255,230,1)', 0.55);
      rays(760, -120, Math.PI / 2 + 0.12, 0.9, 2300, 'rgba(210,255,240,0.55)', 0.32, 8, t);
    });
    // 2. дальний риф — силуэты
    lay(14, () => {
      const p = []; for (let x = -1400; x <= W + 1400; x += 60) p.push([x, 1010 - Math.abs(Math.sin(x * 0.006)) * 110 - Math.sin(x * 0.019) * 30]); p.push([W + 1400, 3000], [-1400, 3000]); sil(p, '#14606c', 0.9);
      for (let i = 0; i < 9; i++) crinoid(-300 + i * 200, 1000 - (i % 3) * 30, 260 + (i % 4) * 50, t, 60 + i, { cheap: 1, col: '#1a6e78', w: 6, a: 0.9 });
      fishSchool(300, 640, t, 9, 3, 0.8, '#1d6e7c');
    });
    haze('#2a8c98', 0.22);
    // 3. средний план — лес морских лилий, кораллы
    lay(5, () => {
      const p = []; for (let x = -1400; x <= W + 1400; x += 50) p.push([x, 1180 - Math.sin(x * 0.01 + 1) * 40 - Math.abs(Math.sin(x * 0.004)) * 60]); p.push([W + 1400, 3000], [-1400, 3000]); sil(p, '#2f7a78', 0.95);
      for (let i = 0; i < 13; i++) crinoid(-260 + i * 125 + (i % 3) * 20, 1190 - (i % 2) * 25, 280 + (i * 37 % 5) * 50, t, 80 + i, { cheap: 1, col: ['#7a5a6a', '#8a6248', '#6a6a50', '#8a5050'][i % 4], w: 7, arms: 12 });
      for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = 0.7; tubeCoral(-100 + i * 380, 1190, 0.9, 12 + i, '#8a6a58'); ctx.restore(); }
      goniatite(lerp(1300, -300, ((t * 0.05) % 1)), 760, 0.7, t, 2, 1);
    });
    haze('#3a9aa0', 0.14);
    // 4. ближний риф за Томом
    lay(2.2, () => {
      const p = []; for (let x = -1400; x <= W + 1400; x += 40) p.push([x, 1330 - Math.sin(x * 0.012 + 2) * 30]); p.push([W + 1400, 3000], [-1400, 3000]); sil(p, '#5a8a78', 1);
      crinoid(-60, 1330, 470, t, 11, { col: '#a84a3a', colL: '#e8946a' }); crinoid(1160, 1330, 520, t, 12, { col: '#8a4a6a', colL: '#d88aa8' });
      crinoid(980, 1330, 380, t, 13, { col: '#c07a2a', colL: '#f0b860', arms: 8 });
      bryozoan(160, 1330, 0.9, t, 4); bryozoan(1300, 1336, 1.1, t, 6, '#f0b070');
      chaetetes(820, 1336, 0.8); hornCoral(260, 1336, 0.7, -0.2); tubeCoral(1050, 1340, 0.6, 9);
      goniatite(lerp(-250, 1400, ((t - S0.sea) * 0.09 + 0.25) % 1), 960, 0.9, t, 7, -1);
      fishSchool(820, 560, t, 7, 8, 0.9, '#2a5a68');
    });
    lay(1.55, () => {                                       // «лес» лилий прямо за Томом
      crinoid(250, 1400, 620, t, 31, { col: '#b0443a', colL: '#f08a5a', arms: 12 }); crinoid(620, 1405, 540, t, 32, { col: '#7a4a8a', colL: '#d898d8', arms: 10 });
      crinoid(880, 1400, 700, t, 33, { col: '#c8802a', colL: '#ffc66a', arms: 12 }); crinoid(40, 1410, 430, t, 34, { col: '#9a5a3a', colL: '#e8b080', arms: 9 });
      crinoid(1060, 1405, 480, t, 35, { col: '#a8384a', colL: '#ff8a98', arms: 10 });
      chaetetes(470, 1416, 0.7, '#c8905a'); tubeCoral(760, 1418, 0.55, 17, '#d0905e'); bryozoan(980, 1418, 0.7, t, 8, '#f4a860'); hornCoral(560, 1418, 0.55, 0.3, '#e8c08a');
    });
    haze('#4aaab0', 0.08 + 0.1 * lap * (0.5 + 0.5 * Math.sin(t * 40)));
    // 5. дно, Том, блок, стетакант
    lay(1, () => {
      const fl = []; for (let x = -1400; x <= W + 1400; x += 40) fl.push([x, GY - 54 + Math.sin(x * 0.008) * 16 + Math.sin(x * 0.03) * 5]); fl.push([W + 1400, 4200], [-1400, 4200]);
      const fp = pathOf(fl); { const g = ctx.createLinearGradient(0, GY - 70, 0, GY + 700); g.addColorStop(0, '#c6c19a'); g.addColorStop(0.3, '#a0a080'); g.addColorStop(1, '#4a6458'); ctx.save(); ctx.fillStyle = g; ctx.fill(fp); ctx.restore(); }
      ctx.save(); ctx.clip(fp); hatch(new Path2D('M-300 1380 H1400 V1800 H-300 Z'), [-300, 1380, 1400, 1800], { gap: 13, a: 0.18, ang: -0.15, col: '#4a5a40', seg: 80, key: 5 }); ctx.restore();
      pencil(fl.slice(0, fl.length - 2).filter((p, i) => p[0] > -300 && p[0] < 1400), { w: 3, col: '#2a3a2a', a: 0.7 });
      caustics(t, -300, 1400, GY - 40, GY + 360, 0.18);
      const r = rng(41); for (let i = 0; i < 22; i++) { const x = -200 + r() * 1500, y = GY - 20 + r() * 320; if (x > BX - 60 && x < BX1 + 80 && y < GY + 40) continue; i % 4 ? brachio(x, y, 0.35 + r() * 0.3, (r() - 0.5) * 0.8, r() < 0.5 ? '#d8c49a' : '#c8b088') : ell(x, y, 10, 4, { wash: '#efe6cc', washA: 1, w: 1.4, col: '#5a4a30' }); }
      hornCoral(140, GY - 10, 0.85, -0.25, '#e0b07a'); hornCoral(190, GY + 6, 0.6, 0.35, '#d49a6a'); hornCoral(1120, GY + 20, 0.9, 0.2);
      phylloid(1080, GY - 10, 200, t, 3); phylloid(-30, GY + 10, 240, t, 5, '#9a8a2a');
      // тень акулы на дне
      if (t > EV.sea_shark && t < EV.sea_shark + 1.8) { const sx = sharkX(t); ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#0a2228'; ctx.beginPath(); ctx.ellipse(sx + 80, GY + 30, 300, 26, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
      // муть от приземления
      if (t > EV.sea_land && t < EV.sea_land + 1.4) { const q = (t - EV.sea_land) / 1.4; for (let i = 0; i < 14; i++) { const rr = rng(i * 3 + 1), side = i % 2 ? 1 : -1; dot(TX + side * (30 + q * 260 * (0.4 + rr())), GY - 10 - q * 60 * rr(), 20 + 40 * q * rr(), '#d8d4b8', 0.5 * (1 - q)); } }
      if (t > EV.sea_lapse && t < EV.sea_white) shellLayers(t);
      if (t >= EV.sea_white) limeBlock(t);
      if (t > EV.sea_white - 0.1 && t < EV.sea_white + 0.05) shellLayers(t);
      cat();
      plaque(t);
      if (t > EV.sea_shark && t < EV.sea_shark + 1.8) stetha(sharkX(t), 800 + Math.sin((t - EV.sea_shark) * 3) * 20, 1.25, t);
    });
    // 6. передний план — тёмные стебли лилий, водоросли, фузулины, крупные пузыри
    lay(0.62, () => {
      crinoid(-140, 2150, 900, t, 21, { cheap: 1, col: '#0e3a40', w: 16, a: 0.95 }); crinoid(1240, 2200, 1000, t, 22, { cheap: 1, col: '#0c3238', w: 18, a: 0.95 });
      phylloid(120, 2050, 360, t, 9, '#2a4a30'); phylloid(980, 2080, 300, t, 10, '#24402a');
      bubbles(1000, 1700, t, 7, 4, { rise: 1500, sp: 0.25, r: 16, a: 0.5 });
    });
    fusulinaSnow(t, lap ? 90 : 60, 3, [-60, -60, W + 60, H + 60], lap ? 5 + lapK * 4 : 1, 0.75);
    if (lap) screenFill('#041820', 0.18 * (0.5 + 0.5 * Math.sin(t * 46)));
    if (t > EV.sea_white && t < EV.sea_white + 0.35) screenFill('#fffbe8', 0.65 * (1 - (t - EV.sea_white) / 0.35));
    if (t > EV.sea_stamp && t < EV.sea_stamp + 0.15) screenFill('#fff1c8', 0.4 * (1 - (t - EV.sea_stamp) / 0.15));
  };

  // ---------------------------------------------------------------- режиссура
  const shellUp = t => t > EV.sea_shell + 0.12 && t < EV.sea_knock - 0.1;
  DIR.sea = {
    outfit: 'diver', light: { side: 1, rim: '#9fe8ff' }, grade: ['#0a4a5a', 0.32],
    act: () => [[S0.sea, 'shock'], [EV.sea_land + 0.05, 'talk'], [EV.sea_mln, 'awe'], [WW('c1', 'лет') + 0.1, 'talk'], [EV.sea_warm, 'grin'],
      [EV.sea_sharkTop - 0.2, 'scared'], [EV.sea_sharkTop + 0.5, 'sideeye'], [EV.sea_shell - 0.05, 'talk'], [EV.sea_white - 0.05, 'awe'], [EV.sea_stone + 0.2, 'proud'],
      [EV.sea_knock - 0.25, 'smug'], [EV.sea_stamp, 'proud']],
    pose: (t, u, b) => {
      const fallK = clamp(u / 0.62), y = t < EV.sea_land ? lerp(GY - 900, GY, 1 - Math.pow(1 - fallK, 2.2)) : GY;
      const land = t > EV.sea_land && t < EV.sea_land + 0.3 ? 0.35 * (1 - (t - EV.sea_land) / 0.3) : 0;
      const walking = t > EV.sea_land + 0.35 && t < EV.sea_warm - 0.1, wx = lerp(TX - 70, TX, clamp((t - EV.sea_land - 0.35) / (EV.sea_warm - 0.1 - EV.sea_land - 0.35)));
      const o = { x: t < EV.sea_land + 0.35 ? TX - 70 : wx, y: y + Math.sin(t * 2) * 4, s: 1.18, squash: b.squash + land, rot: t < EV.sea_land ? Math.sin(u * 7) * 0.12 : 0,
        walk: walking ? t * 5 : undefined, look: [0.35, -0.1] };
      if (t < EV.sea_land) Object.assign(o, { hand: [120, -330], handF: [-120, -330], look: [0, -0.6] });
      const e = b.A.expr2;
      if (e === 'awe') Object.assign(o, { look: [0.2, -0.7] });
      if (e === 'grin' && t < EV.sea_sharkTop) Object.assign(o, { hand: [175, -225 + Math.sin(t * 3) * 12], handF: [-175, -225 + Math.sin(t * 3 + 1) * 12], look: [0, -0.4], tilt: Math.sin(t * 2) * 0.07, y: o.y - 18 - Math.sin(t * 2.5) * 10 });
      if (t > EV.sea_sharkTop - 0.25 && t < EV.sea_shell - 0.4) { const sx = sharkX(t); Object.assign(o, { look: [clamp((sx - o.x) / 500, -1, 1), -0.75], sweat: true, tailUp: true });
        if (t > EV.sea_sharkTop - 0.25 && t < EV.sea_sharkTop + 0.45) Object.assign(o, { hand: [60, -350], handF: [-60, -350], squash: 0.2, y: o.y + 14 }); }
      if (t > EV.sea_shell - 0.35 && t < EV.sea_shell + 0.12) Object.assign(o, { hand: [150, -50], look: [0.6, 0.6], tilt: 0.12, squash: 0.08 });
      if (shellUp(t)) Object.assign(o, { hand: [118, -300], look: t > EV.sea_lapse ? [0.9, 0.1] : [0.5, -0.5] });
      if (t > EV.sea_knock - 0.1 && t < EV.sea_stamp - 0.1) { const kn = Math.max(0, Math.sin((t - EV.sea_knock) * 18)); Object.assign(o, { hand: [196 + kn * 16, -200], look: [0.9, -0.1] }); }
      if (t > EV.sea_stamp - 0.1) Object.assign(o, { hand: [70, -150], handF: [-80, -150], look: [0.3, -0.1], tilt: -0.05 });
      return Object.assign(b, o);
    },
    afterCat: (t, u, P) => {                               // пузыри из шлема, ракушка в лапе
      const hx = P.x + 40 * P.s, hy = P.y - (372 + 120) * P.s;
      bubbles(hx, hy, t, t < EV.sea_land + 0.3 ? 16 : 9, 7, { rise: 620, sp: t < EV.sea_land ? 2.2 : 0.9, r: 7, spread: 16 });
      if (P.y < GY - 10) bubbles(P.x, P.y - 300 * P.s, t, 14, 9, { rise: 900, sp: 2.5, r: 10, spread: 140 });
      if (shellUp(t)) { const [hx2, hy2] = P.hand; push(P.x + hx2 * P.s, P.y + (hy2 - 40) * P.s, 0.9, -0.2); brachio(0, 0, 1, 0, '#e2d0a6'); pop(); glow(P.x + hx2 * P.s, P.y + (hy2 - 40) * P.s, 70, 'rgba(255,250,210,1)', 0.35); }
    },
    cam: () => [[S0.sea, 540, 540, -1.35], [S0.sea + 0.62, 540, 930, 0.04, 'x'], [EV.sea_warm - 0.2, 520, 950, 0.1], [EV.sea_sharkTop, 510, 900, 0.0], [EV.sea_shell, 560, 990, 0.12],
      [EV.sea_white, 650, 1030, 0.12], [EV.sea_stamp - 0.05, 670, 1040, 0.15], [EV.sea_stamp + 0.14, 690, 1060, 0.24, 'x'], [S1.sea, 692, 1060, 0.26]],
    hud: t => {                                            // перемотка таймлапса: +8 млн лет
      if (t < EV.sea_lapse || t > EV.sea_white + 0.6) return; const k = clamp((t - EV.sea_lapse) / (EV.sea_white - EV.sea_lapse)), a = clamp((EV.sea_white + 0.6 - t) / 0.3);
      push(540, 470, 1, -0.02); ctx.save(); ctx.globalAlpha = 0.75 * a; ctx.fillStyle = 'rgba(8,20,24,0.8)'; ctx.fillRect(-250, -44, 500, 88); ctx.restore();
      txt('+' + Math.round(k * 8e6).toLocaleString('ru-RU').replace(/,/g, ' ') + ' лет', 30, 0, 54, { col: '#ffe9b8', font: 'Osw', a });
      push(-200, 0, 1, t * 12); ell(0, 0, 26, 26, { wash: '#f6ecd2', washA: a, w: 3, col: TM.brassD, a }); line([[0, 0], [0, -18]], { w: 3, col: '#a83a2a', smooth: false, pass2: false, a }); pop(); pop();
    }
  };

  // ---------------------------------------------------------------- переход В sea: «плюх» из туннеля в море
  TRANS_IN.sea = { a: 0.24, b: 0.62, fx(k, t, A, B) {
    const kI = 0.24 / 0.86;                                 // момент удара о воду
    if (k < kI) {
      const q = k / kI, sY = lerp(H + 60, -80, Math.pow(q, 1.7));
      drawBuf(A, 1 + q * 0.5, 540, 900);
      scr(() => {                                           // налетающая поверхность воды (вид сверху, перспектива)
        const g = ctx.createLinearGradient(0, sY, 0, H); g.addColorStop(0, '#9fe6e0'); g.addColorStop(0.25, '#3fa6b8'); g.addColorStop(1, '#0e5a72');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, sY + 30); for (let x = 0; x <= W; x += 30) ctx.lineTo(x, sY + Math.sin(x * 0.02 + t * 8) * 18 * (1 - q)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
        for (let i = 0; i < 14; i++) { const yy = sY + Math.pow(i / 14, 1.6) * (H - sY + 40); ctx.globalAlpha = 0.55; ctx.strokeStyle = i % 2 ? '#e8fff8' : '#1f7a8a'; ctx.lineWidth = 2 + i * 0.5; ctx.beginPath(); for (let x = -20; x <= W + 20; x += 30) { const y = yy + Math.sin(x * (0.02 - i * 0.0008) + t * 6 + i) * (4 + i * 1.5); x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
        ctx.globalAlpha = 1; const r = rng(hsh(FRAME, 3)); ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 40; i++) { const x = r() * W, y = sY + r() * (H - sY); ctx.globalAlpha = 0.7 * r(); ctx.fillRect(x, y, 3 + r() * 10, 2); }
        ctx.globalAlpha = 1;
        if (q > 0.55) for (let j = 0; j < 3; j++) { const rr = (q - 0.55) / 0.45 * (300 + j * 160); ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 6 - j; ctx.beginPath(); ctx.ellipse(540, Math.max(sY + 200, 1100), rr, rr * 0.3, 0, 0, 6.3); ctx.stroke(); }
        glow(540, 1100, 400, 'rgba(255,230,170,1)', 0.4 * (1 - q));
      });
    } else {
      const q = (k - kI) / (1 - kI), wob = (1 - q) * 26;
      scr(() => { for (let i = 0; i < 24; i++) { const y0 = i * 80; ctx.save(); ctx.beginPath(); ctx.rect(0, y0, W, 81); ctx.clip(); ctx.drawImage(B, Math.sin(i * 0.9 + t * 14) * wob, 0); ctx.restore(); }
        const imp = clamp(1 - q * 3.2); if (imp > 0) { ctx.fillStyle = `rgba(255,255,250,${0.92 * imp})`; ctx.fillRect(0, 0, W, H); }
        // белая пена-корона по краям, брызги
        const r = rng(19); for (let i = 0; i < 46; i++) { const a = r() * 6.283, d0 = 520 + r() * 200, d = d0 + q * 700 * (0.5 + r()), R = (40 + r() * 90) * (1 - q * 0.6);
          ctx.globalAlpha = 0.85 * (1 - q); ctx.fillStyle = i % 3 ? '#ffffff' : '#d8f6ff'; ctx.beginPath(); ctx.arc(540 + Math.cos(a) * d * 0.75, 900 + Math.sin(a) * d * 1.15, R, 0, 6.3); ctx.fill(); }
        // облако пузырей рассеивается вверх и в стороны
        for (let i = 0; i < 130; i++) { const rr = rng(i * 11 + 5), a = rr() * 6.283, d = (rr() * 260 + 40) * (0.4 + q * 2.2), x = 540 + Math.cos(a) * d * 1.3, y = 980 + Math.sin(a) * d - q * 900 * (0.4 + rr()), R = (4 + rr() * 26) * (1 - q * 0.4);
          const al = 0.9 * (1 - Math.pow(q, 1.6)); if (al <= 0.02) continue; ctx.globalAlpha = al; ctx.strokeStyle = '#effcff'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(x, y, R, 0, 6.3); ctx.stroke(); ctx.fillStyle = 'rgba(210,248,255,0.25)'; ctx.fill();
          ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x - R * 0.35, y - R * 0.35, R * 0.22, 0, 6.3); ctx.fill(); }
        ctx.globalAlpha = 1;
      });
    }
  } };
})();
