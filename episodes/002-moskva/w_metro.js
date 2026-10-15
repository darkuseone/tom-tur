/* 002 — сцена `metro`: 1938, станция «Маяковская» (арх. А. Душкин). Центральный зал в перспективе: арки в гофрированной нержавейке
   (сталь для дирижаблей), розовый родонит, овальные ниши-купола с мозаикой Дейнеки «Сутки советского неба», пол шахматкой,
   за арками — вагон типа А. Том-метростроевец получает Гран-при Нью-Йорка-1939. Переход В сцену: поезд вылетает из дыма пожара. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.metro_train = S0.metro;                       // поезд вылетает из дыма на камеру
  EV.metro_may = wt('m1', '«Маяковская»');         // Том задирает голову к мозаикам
  EV.metro_medal = wt('m1', 'наградили');          // сверху опускается медаль
  EV.metro_gp = wt('m1', 'Гран-при');              // Том ловит и надевает медаль
  EV.metro_ny = wt('m1', 'Нью-Йорке!');            // на медали вырастает статуя Свободы
  SHAKES.push([EV.metro_train, 0.35, 12], [EV.metro_gp + 0.15, 0.2, 6]);
  KEYW.push('«Маяковская»', 'Гран-при', 'Нью-Йорке!');

  // ---------------------------------------------------------------- перспектива зала
  const VX = 540, VY = 860, F = 620;
  const P3 = (X, Y, d) => [VX + X * F / d, VY + Y * F / d];
  const CX = 0.95, SPR = -0.36, TOP = -0.86, STEP = 0.55, D0 = 0.88, N = 15;
  const DS = Array.from({ length: N }, (_, i) => D0 + i * STEP);
  const STEEL = '#a7b0b8', STL = '#eef3f6', STD = '#4c545c', ROD = '#c98584', RODD = '#8a4a50';
  const arcPts = (d, inset = 0, n = 18) => { const P = []; for (let k = 0; k <= n; k++) { const a = Math.PI * k / n; P.push(P3(-(CX - inset) * Math.cos(a), SPR + (TOP - SPR + inset * 0.6) * Math.sin(a) - inset * 0.2, d)); } return P; };

  function floor(t) {
    const fp = pathOf([P3(-2.8, 1, 0.5), P3(2.8, 1, 0.5), P3(2.8, 1, 11), P3(-2.8, 1, 11)]); wash(fp, '#9c948c', 1);
    for (let j = 0; ; j++) { const d0 = 0.55 + j * 0.275, d1 = d0 + 0.275; if (d0 > 10) break;
      for (let i = 0; i < 8; i++) { const x0 = -CX + i * (2 * CX / 8), x1 = x0 + 2 * CX / 8; if ((i + j) % 2) continue;
        ctx.fillStyle = '#c98a84'; ctx.globalAlpha = 0.9; ctx.beginPath(); for (const p of [P3(x0, 1, d0), P3(x1, 1, d0), P3(x1, 1, d1), P3(x0, 1, d1)]) ctx.lineTo(p[0], p[1]); ctx.fill(); } }
    ctx.globalAlpha = 1;
    for (let i = 0; i <= 8; i++) { const x = -CX + i * 2 * CX / 8; pencil([P3(x, 1, 0.6), P3(x, 1, 9.5)], { w: 1.4, col: '#5a4a48', a: 0.4, pass2: false, gap: false }); }
    // отражения светильников в полированном полу
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const d of DS) { const [x, y] = P3(0, 1, d + STEP / 2); const g = ctx.createLinearGradient(0, y - 60 / d, 0, y + 260 / d); g.addColorStop(0, 'rgba(255,220,160,0)'); g.addColorStop(0.3, 'rgba(255,220,160,0.22)'); g.addColorStop(1, 'rgba(255,220,160,0)'); ctx.fillStyle = g; ctx.fillRect(x - 70 / d, y - 60 / d, 140 / d, 320 / d); }
    ctx.restore();
  }
  function farEnd(t) {                                              // торец зала: светящийся проём, часы
    const d = DS[N - 1] + 0.5, a = P3(-CX, TOP - 0.1, d), b = P3(CX, 1, d);
    vgrad(a[1] - 80, b[1], ['#3a2a2a', '#8a6a5a']);
    const pp = pathOf(arcPts(d, 0.1, 16).concat([P3(CX - 0.1, 1, d), P3(-CX + 0.1, 1, d)])); wash(pp, '#fff0c8', 1);
    glow(VX, VY + 20, 260, 'rgba(255,236,190,1)', 0.8);
    const [cx, cy] = P3(0, -0.55, d); ell(cx, cy, 18, 18, { wash: '#f8f4ea', washA: 1, w: 1.8, col: '#2a2420' });
    const hh = t * 0.8, mm = t * 6; pencil([[cx, cy], [cx + Math.sin(hh) * 9, cy - Math.cos(hh) * 9]], { w: 2, pass2: false, gap: false }); pencil([[cx, cy], [cx + Math.sin(mm) * 14, cy - Math.cos(mm) * 14]], { w: 1.4, pass2: false, gap: false });
  }
  function sideZones(t) {                                           // за колоннами: путевые стены, справа — вагон типа А
    // левая путевая стена (мрамор) и тьма тоннеля
    const lw = pathOf([P3(-2.7, -0.7, 0.6), P3(-2.7, -0.7, 10), P3(-2.7, 1.2, 10), P3(-2.7, 1.2, 0.6)]); wash(lw, '#5a4848', 1);
    for (let k = 0; k < 14; k++) { const d = 1 + k * 0.7; pencil([P3(-2.7, -0.7, d), P3(-2.7, 1.2, d)], { w: 1.4, col: '#2a1e1e', a: 0.5, pass2: false, gap: false }); }
    const lp = pathOf([P3(-1.6, 1, 0.6), P3(-1.6, 1, 10), P3(-2.7, 1.25, 10), P3(-2.7, 1.25, 0.6)]); wash(lp, '#1e1614', 1);
    const rw = pathOf([P3(2.9, -0.7, 0.6), P3(2.9, -0.7, 10), P3(2.9, 1.2, 10), P3(2.9, 1.2, 0.6)]); wash(rw, '#4a3a3a', 1);
    // вагон: тёмно-красный низ, кремовый верх, светлые окна, двери
    const tx = 1.85, roof = -0.32, belt = 0.22, bot = 0.92;
    const q = (y0, y1, c, a = 1) => wash(pathOf([P3(tx, y0, 0.6), P3(tx, y0, 10), P3(tx, y1, 10), P3(tx, y1, 0.6)]), c, a);
    q(roof - 0.08, roof, '#6a5a50'); q(roof, belt, '#e8d8b0'); q(belt, bot, '#8a1e22'); q(belt - 0.02, belt + 0.03, '#d8b060');
    for (let k = 0; k < 12; k++) { const d0 = 0.9 + k * 0.62, d1 = d0 + 0.42; const isDoor = k % 3 === 1;
      const pts = isDoor ? [P3(tx, -0.2, d0), P3(tx, -0.2, d1), P3(tx, bot - 0.04, d1), P3(tx, bot - 0.04, d0)] : [P3(tx, -0.2, d0), P3(tx, -0.2, d1), P3(tx, 0.12, d1), P3(tx, 0.12, d0)];
      wash(pathOf(pts), isDoor ? '#7a1a1e' : '#ffe6a8', 1);
      if (isDoor) wash(pathOf([P3(tx, -0.18, d0 + 0.05), P3(tx, -0.18, d1 - 0.05), P3(tx, 0.1, d1 - 0.05), P3(tx, 0.1, d0 + 0.05)]), '#ffe6a8', 1);
      else { const [x, y] = P3(tx, -0.04, (d0 + d1) / 2); ctx.fillStyle = 'rgba(40,30,30,0.75)'; ctx.beginPath(); ctx.arc(x, y + 4 / d0 * 6, 22 / ((d0 + d1) / 2), Math.PI, 0); ctx.fill(); ctx.fillRect(x - 22 / ((d0 + d1) / 2), y + 4 / d0 * 6, 44 / ((d0 + d1) / 2), 40 / ((d0 + d1) / 2)); } }
    const [lx, ly] = P3(tx, -0.04, 3); glow(lx, ly, 260, 'rgba(255,220,150,1)', 0.25);
    const rp = pathOf([P3(1.55, 1, 0.6), P3(1.55, 1, 10), P3(tx, 1, 10), P3(tx, 1, 0.6)]); wash(rp, '#2a2020', 0.6);
  }
  function niche(dm, t, i) {                                       // овальная ниша-купол с мозаикой неба + кольцо светильников
    const [cx, yA] = P3(0, TOP - 0.06, dm - 0.2), [, yB] = P3(0, TOP - 0.06, dm + 0.2), cy = (yA + yB) / 2, rx = 0.34 * F / dm, ry = Math.abs(yA - yB) / 2 + 4;
    const p = ell(cx, cy, rx * 1.12, ry * 1.25, { wash: '#7a6a5e', washA: 1, w: 1.6, col: '#2a2420' });
    const sky = new Path2D(); sky.ellipse(cx, cy, rx, ry, 0, 0, 6.3);
    ctx.save(); ctx.clip(sky); const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx); g.addColorStop(0, ['#bfe0f4', '#ffd8b0', '#cfe8f8', '#f4c8b8'][i % 4]); g.addColorStop(0.7, '#6aa6d4'); g.addColorStop(1, '#e8c070');
    ctx.fillStyle = g; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
    // мозаика: смальта-точки + сюжет (самолёт, парашютисты, дирижабль, стратостат)
    const r = rng(i * 41 + 5); ctx.globalAlpha = 0.35; for (let k = 0; k < 30; k++) { ctx.fillStyle = r() < 0.5 ? '#ffffff' : '#3a6aa0'; const s = Math.max(1.2, 6 / dm); ctx.fillRect(cx + (r() - 0.5) * rx * 2, cy + (r() - 0.5) * ry * 2, s, s); } ctx.globalAlpha = 1;
    const kind = i % 4, sc = rx / 90;
    push(cx, cy, sc, Math.sin(t + i) * 0.04);
    if (kind === 0) { blob([[-46, 0], [40, -4], [50, 0], [40, 6], [-40, 6]], { wash: '#2a3a5a', washA: 1, w: 1.6, col: '#101820' }); poly([[-6, -2], [10, -36], [20, -36], [12, 2]], { wash: '#c03030', washA: 1, w: 1.4, col: '#101820' }); poly([[-6, 4], [10, 34], [20, 34], [12, 2]], { wash: '#c03030', washA: 1, w: 1.4, col: '#101820' }); poly([[-40, 0], [-50, -14], [-44, 0]], { wash: '#2a3a5a', washA: 1, w: 1.2 }); }
    if (kind === 1) for (const [px, py] of [[-30, -10], [20, -26], [36, 20]]) { blob([[px - 18, py - 4], [px, py - 18], [px + 18, py - 4], [px, py - 8]], { wash: '#f4f0e0', washA: 1, w: 1.2, col: '#2a2a30' }); pencil([[px - 16, py - 4], [px, py + 14], [px + 16, py - 4]], { w: 1, pass2: false, gap: false, a: 0.7 }); ell(px, py + 16, 3, 4, { wash: '#2a2a30', washA: 1, line: false }); }
    if (kind === 2) { ell(0, 0, 58, 18, { wash: '#d8dcdc', washA: 1, w: 1.6, col: '#3a3a40' }); rect(-14, 16, 28, 8, { wash: '#3a3a40', washA: 1, w: 1 }); poly([[-58, 0], [-74, -14], [-72, 14]], { wash: '#c0c4c4', washA: 1, w: 1.2 }); txt('СССР', 4, 1, 14, { col: '#c03030', font: 'Osw' }); }
    if (kind === 3) { ell(0, -10, 26, 30, { wash: '#f0e8d0', washA: 1, w: 1.4, col: '#3a3a40' }); pencil([[-18, 12], [0, 34], [18, 12]], { w: 1, pass2: false, gap: false }); ell(0, 36, 5, 4, { wash: '#3a3a40', washA: 1, line: false }); ctx.fillStyle = '#ffe080'; ctx.beginPath(); ctx.arc(46, -26, 12, 0, 6.3); ctx.fill(); }
    pop();
    ctx.restore();
    pencil(ellPts(cx, cy, rx, ry, 0, 0.06, 40), { w: Math.max(1.6, 4 / dm), col: '#e8c070', pass2: false, gap: false });
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283, lx = cx + Math.cos(a) * rx * 1.06, ly = cy + Math.sin(a) * ry * 1.12; ctx.globalAlpha = 0.9; ctx.fillStyle = '#fff4d0'; ctx.beginPath(); ctx.arc(lx, ly, Math.max(1.4, 5 / dm), 0, 6.3); ctx.fill(); }
    ctx.restore(); glow(cx, cy, rx * 1.5, 'rgba(255,226,170,1)', 0.35);
  }
  function sideArch(d, t, side) {                                   // боковой проём между колоннами (арка к платформе)
    const a = d + 0.1, b = d + STEP - 0.04, P = [];
    for (let k = 0; k <= 12; k++) { const s = k / 12; P.push(P3(side * CX, SPR - 0.12 * Math.sin(Math.PI * s), lerp(a, b, s))); }
    const top = P.slice(), up = P3(side * CX, TOP + 0.02, b), up2 = P3(side * CX, TOP + 0.02, a);
    wash(pathOf(top.concat([up, up2])), '#8a8f96', 1);                // стальная пазуха над проёмом
    pencil(top, { w: Math.max(2, 7 / d), col: STL, a: 0.8, pass2: false, gap: false });
    pencil(top.map(([x, y]) => [x, y - 10 / d]), { w: Math.max(1, 3 / d), col: STD, a: 0.7, pass2: false, gap: false });
  }
  function column(d, t, side, i) {                                  // колонна: стальная гофрированная грань + розовый родонит
    const w = 0.09, X0 = side * CX - w, X1 = side * CX + w, dd = 0.14;
    const inner = side < 0 ? X1 : X0;
    // внутренняя (к центру зала) грань — родонит
    const ip = pathOf([P3(inner, SPR, d), P3(inner, SPR, d + dd), P3(inner, 1, d + dd), P3(inner, 1, d)]); wash(ip, ROD, 1);
    const r = rng(i * 7 + (side > 0 ? 3 : 0)); for (let k = 0; k < 4; k++) { const y0 = SPR + r() * 1.2; pencil([P3(inner, y0, d + 0.01), P3(inner, y0 + 0.1 + r() * 0.1, d + dd - 0.01)], { w: 1.4, col: RODD, a: 0.6, pass2: false, gap: false }); }
    pencil([P3(inner, SPR, d + dd), P3(inner, 1, d + dd)], { w: Math.max(1.2, 3 / d), col: '#3a2224', a: 0.6, pass2: false, gap: false });
    // фронтальная грань — гофрированная нержавейка
    const [x0, y0] = P3(X0, SPR, d), [x1, y1] = P3(X1, 1, d);
    wash(pathOf([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]), STEEL, 1);
    const n = 7; for (let k = 0; k <= n; k++) { const x = lerp(x0, x1, k / n); ctx.fillStyle = k % 2 ? 'rgba(255,255,255,0.45)' : 'rgba(40,46,52,0.35)'; ctx.fillRect(x - (x1 - x0) / n * 0.25, y0, (x1 - x0) / n * 0.5, y1 - y0); }
    const sh = (t * 0.55 + i * 0.09 + (side > 0 ? 0.4 : 0)) % 1.3; if (sh < 1) glow(lerp(x0, x1, 0.4), lerp(y1, y0, sh), (x1 - x0) * 1.1, 'rgba(255,250,235,1)', 0.55);
    pencil([[x0, y0], [x0, y1]], { w: Math.max(1.4, 4 / d), col: '#2a2e34', pass2: false, gap: false }); pencil([[x1, y0], [x1, y1]], { w: Math.max(1.4, 4 / d), col: '#2a2e34', pass2: false, gap: false });
    // цоколь из тёмного камня
    const [, yb] = P3(X0, 0.82, d); wash(pathOf([[x0 - 2, yb], [x1 + 2, yb], [x1 + 2, y1], [x0 - 2, y1]]), '#5a3a3c', 1);
    pencil([[x0 - 2, yb], [x1 + 2, yb]], { w: Math.max(1.4, 3 / d), col: STL, a: 0.7, pass2: false, gap: false });
  }
  function archAt(d, t, i) {                                       // поперечная арка: стальная лента с рифлением и бегущим бликом
    const outer = arcPts(d, 0), innerP = arcPts(d, 0.08);
    const band = pathOf(outer.concat(innerP.slice().reverse())); wash(band, STEEL, 1);
    for (let k = 1; k < 5; k++) { const P = arcPts(d, 0.016 * k, 18); pencil(P, { w: Math.max(1.2, 5 / d), col: k % 2 ? STL : STD, a: k % 2 ? 0.75 : 0.5, pass2: false, gap: false }); }
    pencil(outer, { w: Math.max(1.6, 5 / d), col: '#262a30', pass2: false, gap: false }); pencil(innerP, { w: Math.max(1.4, 4 / d), col: '#262a30', pass2: false, gap: false });
    const ph = (t * 0.7 - i * 0.07) % 1.6; if (ph < 1 && ph > 0) { const P = arcPts(d, 0.04, 40), q = P[Math.floor(ph * 40)]; glow(q[0], q[1], 70 / d + 20, 'rgba(255,252,240,1)', 0.8); }
    // свод между этой аркой и следующей — тёплая штукатурка
  }
  function vault(t) {                                              // свод над зоной ниш (тёплый, освещён)
    const pts = arcPts(DS[0], 0.08).concat(arcPts(DS[N - 1] + 0.5, 0.08).reverse());
    wash(pathOf(pts), '#cdb8a0', 1);
    const [cx, cy] = P3(0, TOP, 3); glow(cx, cy, 500, 'rgba(255,230,190,1)', 0.25);
  }
  function person(X, d, t, k) {                                    // пассажир 1938: пальто, шляпа / кепка / берет
    const [x, y] = P3(X, 1, d), s = F / d / 560, r = rng(k * 13 + 1), walk = Math.sin(t * 6 + k) * (k % 3 === 0 ? 1 : 0);
    push(x, y, s);
    const coat = ['#2a2a32', '#3a2e26', '#4a3a2a', '#26303a', '#5a2a2a'][k % 5], hat = k % 4;
    for (const lx of [-16, 14]) rect(lx - 9 + (lx > 0 ? walk * 6 : -walk * 6), -150, 18, 150, { wash: '#1a1614', washA: 1, line: false });
    blob([[-44, -150], [-50, -330], [-30, -390], [30, -390], [50, -330], [46, -150]], { wash: coat, washA: 1, w: 2.4, col: '#0e0a0a' });
    ell(0, -420, 28, 32, { wash: '#e0b898', washA: 1, w: 2, col: '#3a2418' });
    if (hat === 0) { ell(0, -444, 46, 9, { wash: '#2a2420', washA: 1, w: 1.6 }); rect(-26, -478, 52, 34, { wash: '#2a2420', washA: 1, w: 1.6 }); }
    if (hat === 1) { blob([[-30, -440], [-24, -462], [24, -462], [44, -444], [30, -436]], { wash: '#4a4a4a', washA: 1, w: 1.6 }); }
    if (hat === 2) { blob([[-34, -440], [-20, -466], [24, -466], [36, -440]], { wash: '#b02a2a', washA: 1, w: 1.6 }); }
    if (hat === 3) { blob([[-30, -436], [-28, -464], [28, -464], [30, -436]], { wash: '#3a3a3a', washA: 1, w: 1.6 }); pencil([[-30, -440], [44, -438]], { w: 3, pass2: false }); }
    if (k % 5 === 1) rect(30, -300, 34, 46, { wash: '#6a4a2a', washA: 1, w: 1.6 });             // портфель
    if (k % 5 === 3) { push(-20, -330, 1, -0.2); rect(-30, -24, 60, 44, { wash: '#efe8d8', washA: 1, w: 1.4 }); for (let q = 0; q < 4; q++) pencil([[-24, -14 + q * 10], [24, -14 + q * 10]], { w: 1, a: 0.5, pass2: false }); pop(); }
    pop();
  }
  function sign(t) {                                               // табличка станции, подвешена к арке
    const d = DS[2] + 0.05, [x, y] = P3(0, -0.47, d), w = 1.18 * F / d, h = 0.17 * F / d;
    pencil([[x - w * 0.35, P3(0, TOP + 0.04, d)[1]], [x - w * 0.35, y - h / 2]], { w: 2, col: '#2a2a2a', pass2: false, gap: false }); pencil([[x + w * 0.35, P3(0, TOP + 0.04, d)[1]], [x + w * 0.35, y - h / 2]], { w: 2, col: '#2a2a2a', pass2: false, gap: false });
    rect(x - w / 2, y - h / 2, w, h, { wash: '#1e2a3a', washA: 1, w: 2.6, col: '#c8a050' });
    txt('МАЯКОВСКАЯ', x, y + 2, h * 0.62, { col: '#f4e8c8', font: 'Osw' });
    ell(x - w / 2 - h * 0.5, y, h * 0.42, h * 0.42, { wash: '#c03030', washA: 1, w: 2, col: '#5a1010' }); txt('М', x - w / 2 - h * 0.5, y + 1, h * 0.5, { col: '#fff', font: 'Osw' });
  }
  function medal(x, y, s, t, spin, sol) {                          // золотая медаль Гран-при; sol — статуя Свободы на медали
    push(x, y, s);
    const fx = Math.max(0.15, Math.abs(Math.cos(spin)));
    push(0, 0, 1, 0, fx);
    const g = ctx.createRadialGradient(-20, -24, 6, 0, 0, 84); g.addColorStop(0, '#fff2b0'); g.addColorStop(0.5, '#e8b840'); g.addColorStop(1, '#9a6a14');
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 6.3); ctx.fill(); ctx.restore();
    pencil(ellPts(0, 0, 80, 80, 0, 0.06), { w: 3.4, col: '#6a4a08', pass2: false }); pencil(ellPts(0, 0, 66, 66, 0, 0.04), { w: 2, col: '#8a6a18', pass2: false, gap: false });
    for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283; pencil([[Math.cos(a) * 70, Math.sin(a) * 70], [Math.cos(a) * 76, Math.sin(a) * 76]], { w: 1.6, col: '#8a6a18', pass2: false, gap: false }); }
    if (fx > 0.5) {
      txt('GRAND PRIX', 0, -36, 22, { col: '#5a3a06', font: 'Osw' });
      push(0, 14, 0.55 + 0.25 * sol); ctx.fillStyle = sol > 0 ? '#3a7a6a' : '#8a6a18';             // статуя Свободы (рельеф)
      ctx.beginPath(); ctx.moveTo(-10, 40); ctx.lineTo(-8, -10); ctx.lineTo(-14, -20); ctx.lineTo(-6, -34); ctx.lineTo(0, -40); ctx.lineTo(6, -34); ctx.lineTo(10, -24); ctx.lineTo(12, -60); ctx.lineTo(18, -60); ctx.lineTo(16, -20); ctx.lineTo(10, -10); ctx.lineTo(12, 40); ctx.fill();
      for (let k = 0; k < 5; k++) { const a = -2.4 + k * 0.4; ctx.fillRect(Math.cos(a) * 9 - 1, -38 + Math.sin(a) * 9 - 1, 3, 3); }
      ctx.fillStyle = '#fff4b0'; ctx.beginPath(); ctx.arc(15, -64, 4, 0, 6.3); ctx.fill(); pop();
      txt('NEW YORK · 1939', 0, 52, 16, { col: '#5a3a06', font: 'Osw' });
    }
    pop();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.6; ctx.fillStyle = '#fffbe0'; ctx.beginPath(); ctx.ellipse(-30 * fx, -30, 10 * fx, 22, 0.6, 0, 6.3); ctx.fill(); ctx.restore();
    pop();
  }
  function ribbonTo(ax, ay, bx, by, w) {                           // лента медали: красно-белая полоса
    const a = Math.atan2(by - ay, bx - ax), nx = -Math.sin(a) * w / 2, ny = Math.cos(a) * w / 2;
    poly([[ax + nx, ay + ny], [bx + nx, by + ny], [bx - nx, by - ny], [ax - nx, ay - ny]], { wash: '#b82a2a', washA: 1, w: 2, col: '#4a0a0a' });
    pencil([[ax, ay], [bx, by]], { w: w * 0.28, col: '#f4ece0', pass2: false, gap: false });
  }
  const medalSt = t => {                                           // 0 — нет, 1 — падает сверху, 2 — на груди
    if (t < EV.metro_medal) return { m: 0 };
    if (t < EV.metro_gp + 0.12) return { m: 1, k: sm((t - EV.metro_medal) / (EV.metro_gp + 0.12 - EV.metro_medal)) };
    return { m: 2, k: popK(t, EV.metro_gp + 0.12, 0.4) };
  };

  WORLD.metro = (t, u, cat) => {
    lay(12, () => { vgrad(-900, 2900, ['#2a2220', '#4a3a34']); farEnd(t); });
    lay(10, () => { vault(t); floor(t); sideZones(t); });
    for (let i = N - 1; i >= 0; i--) {
      const d = DS[i];
      lay(Math.max(1.08, d + 0.2), () => { niche(d + STEP / 2, t, i); sideArch(d, t, -1); sideArch(d, t, 1); });
      if (i === 2) lay(d + 0.05, () => sign(t));
      if (i >= 1) {
        lay(d, () => { archAt(d, t, i); column(d, t, -1, i); column(d, t, 1, i); });
        if (i === 3) lay(d + 0.3, () => { person(-0.55, d + 0.3, t, 1); person(0.62, d + 0.5, t, 2); person(0.2, d + 1.4, t, 3); person(-0.3, d + 2.3, t, 4); person(0.5, d + 3.2, t, 5); });
        if (i === 2) lay(d + 0.25, () => { person(0.78, d + 0.25, t, 6); person(-0.78, d + 0.4, t, 0); });
      }
    }
    lay(1, () => {
      const [x, y] = P3(0, 1, 1.05); glow(470, 1420, 240, 'rgba(255,230,190,1)', 0.15);
      cat();
    });
    lay(DS[0], () => { archAt(DS[0], t, 0); column(DS[0], t, -1, 0); column(DS[0], t, 1, 0); });
    // пыль в лучах светильников
    scr(() => motes(36, [0, 300, W, 1500], '#fff0d0', t, 23, { sp: 10, sz: 2.2, a: 0.5, tw: 1, add: 1, wob: 26 }));
    if (t < S0.metro + 0.9) scr(() => { const k = 1 - clamp((t - S0.metro) / 0.9); for (let i = 0; i < 10; i++) { const r = rng(i * 9 + 4); glow(r() < 0.5 ? r() * 200 : W - r() * 200, r() * H, 300 + r() * 300, 'rgba(70,60,60,1)', 0.7 * k, 'source-over'); } });
  };

  DIR.metro = {
    outfit: 'metro', light: { side: -1, rim: '#ffe8c0' }, grade: ['#c08a5a', 0.18],
    act: () => [[S0.metro, 'proud'], [EV.metro_may - 0.05, 'awe'], [EV.metro_medal + 0.1, 'shock'], [EV.metro_gp + 0.12, 'laugh'], [EV.metro_ny, 'grin'], [EV.metro_ny + 0.35, 'wink']],
    pose: (t, u, b) => {
      const M = medalSt(t), up = t > EV.metro_may && t < EV.metro_medal, catch_ = M.m === 1;
      return Object.assign(b, {
        x: 470, y: 1462, s: 1.14,
        look: catch_ ? [0.05, -0.9] : up ? [0.1, -1] : t > EV.metro_ny + 0.3 ? [0, 0.05] : [0.3, -0.1],
        hand: t < EV.metro_may ? [170, -300] : catch_ ? [60, -340 + (1 - M.k) * 40] : M.m === 2 && t < EV.metro_ny ? [60, -200] : t >= EV.metro_ny ? [130, -320] : [70, -150],
        handF: catch_ ? [-60, -340 + (1 - M.k) * 40] : M.m === 2 && t < EV.metro_ny ? [-40, -190] : undefined,
        point: t >= EV.metro_ny, tilt: up ? -0.1 : catch_ ? -0.06 : 0, tailUp: M.m === 2,
        walk: u < 0.5 ? t * 8 : undefined,
        squash: b.squash + (M.m === 2 && t < EV.metro_gp + 0.4 ? 0.3 * (1 - clamp((t - EV.metro_gp - 0.12) / 0.28)) : 0)
      });
    },
    afterCat: (t, u, P) => {
      const M = medalSt(t); if (!M.m) return;
      const neck = [P.x, P.y - 262 * P.s], chest = [P.x + 6, P.y - 180 * P.s];
      if (M.m === 1) { const y = lerp(P.y - 1500, P.y - 420 * P.s, M.k), x = P.x + Math.sin(M.k * 7) * 40 * (1 - M.k), s = lerp(1.6, 1.1, M.k) * P.s;
        ribbonTo(x - 30 * s, y - 70 * s, x - 6 * s, y - 70 * s - 400, 30 * s); ribbonTo(x + 30 * s, y - 70 * s, x + 6 * s, y - 70 * s - 400, 30 * s);
        medal(x, y, s, t, t * 9, 0); glow(x, y, 200 * s, 'rgba(255,230,140,1)', 0.5);
      } else {
        const s = P.s * (0.9 + 0.1 * M.k), sol = sm((t - EV.metro_ny) / 0.3);
        ribbonTo(chest[0] - 22 * s, chest[1] - 70 * s, neck[0] - 46 * s, neck[1] + 4, 26 * s); ribbonTo(chest[0] + 22 * s, chest[1] - 70 * s, neck[0] + 46 * s, neck[1] + 4, 26 * s);
        medal(chest[0], chest[1], s, t, Math.sin(t * 3) * 0.2, sol);
        glow(chest[0], chest[1], 160 * s, 'rgba(255,230,140,1)', 0.35 + 0.25 * Math.sin(t * 6));
        if (sol > 0) {                                              // мини-статуя Свободы вырастает над медалью
          const k = popK(t, EV.metro_ny, 0.4), sx = chest[0] + 150 * s, sy = chest[1] - 40 * s;
          push(sx, sy, k * s * 1.1); const C = '#4aa08a', CD = '#1e4a40';
          poly([[-40, 40], [40, 40], [30, 0], [-30, 0]], { wash: '#8a8070', washA: 1, w: 2, col: '#2a2420' });
          blob([[-18, 0], [-22, -90], [-14, -140], [14, -140], [22, -90], [20, 0]], { wash: C, washA: 1, w: 2.2, col: CD });
          ell(0, -156, 14, 16, { wash: C, washA: 1, w: 2, col: CD }); for (let q = 0; q < 7; q++) { const a = -2.6 + q * 0.35; pencil([[Math.cos(a) * 14, -160 + Math.sin(a) * 14], [Math.cos(a) * 30, -160 + Math.sin(a) * 30]], { w: 3, col: C, pass2: false, gap: false }); }
          shape(tubeP([[12, -130], [24, -170], [26, -210]], 14, 10), { wash: C, washA: 1, w: 2, col: CD });
          blob([[18, -212], [34, -212], [30, -226], [22, -226]], { wash: '#e8b840', washA: 1, w: 1.6, col: '#6a4a08' });
          glow(26, -236, 40, 'rgba(255,200,90,1)', 0.9); flameT(26, -232, t);
          rect(-30, -110, 22, 30, { wash: C, washA: 1, w: 1.6, col: CD });
          pop();
          note('снова Нью-Йорк!', chest[0] + 230 * s, chest[1] - 330 * s, t, EV.metro_ny + 0.2, S1.metro + 1, '#fff2d0', 48, -0.06);
        }
      }
    },
    cam: () => [[S0.metro, 540, 920, 0.2], [S0.metro + 0.7, 540, 960, 0.0], [EV.metro_may, 540, 940, 0.02], [EV.metro_may + 0.5, 540, 820, 0.08], [EV.metro_medal + 0.2, 520, 900, 0.06], [EV.metro_gp + 0.15, 500, 1020, 0.14], [EV.metro_ny + 0.2, 560, 1040, 0.2], [S1.metro + 0.6, 560, 1040, 0.24]],
    hud: t => {
      if (t < EV.metro_gp + 0.1 || t > S1.metro) return;
      const k = popK(t, EV.metro_gp + 0.1, 0.35), fade = clamp((S1.metro - t) / 0.25);
      push(540, 500, 0.6 + 0.4 * k, -0.04);
      ctx.save(); ctx.globalAlpha = fade; ctx.font = '600 76px Osw'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(16,10,8,0.92)'; ctx.strokeText('GRAND PRIX', 0, -10); ctx.fillStyle = K.amber; ctx.fillText('GRAND PRIX', 0, -10);
      ctx.font = '600 40px Osw'; ctx.lineWidth = 10; ctx.strokeText('NEW YORK · 1939', 0, 54); ctx.fillStyle = '#f6ecd6'; ctx.fillText('NEW YORK · 1939', 0, 54); ctx.restore();
      pop();
    }
  };
  function flameT(x, y, t) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#ffb040'; ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.quadraticCurveTo(x - 10, y - 14, x + Math.sin(t * 12) * 4, y - 26); ctx.quadraticCurveTo(x + 10, y - 14, x + 8, y); ctx.fill(); ctx.restore(); }

  // ---------------------------------------------------------------- переход В сцену: поезд из дыма пожара
  function trainFront(cx, cy, s, t) {                              // лоб вагона типа А: кремовый верх, красный низ, три окна, фары
    push(cx, cy, s);
    blob([[-300, 420], [-310, -260], [-260, -380], [0, -410], [260, -380], [310, -260], [300, 420]], { wash: '#8a1e22', washA: 1, w: 4, col: '#2a0606', shade: { gap: 9, a: 0.25, col: '#2a0606', ang: 1.3 } });
    blob([[-306, -40], [-310, -260], [-260, -380], [0, -410], [260, -380], [310, -260], [306, -40]], { wash: '#e8d8b0', washA: 1, w: 3.4, col: '#3a2a1a' });
    rect(-306, -50, 612, 22, { wash: '#d8b060', washA: 1, w: 2, col: '#5a3a08' });
    for (const [x0, w] of [[-260, 150], [-70, 140], [110, 150]]) { rect(x0, -320, w, 200, { wash: '#2a3038', washA: 1, w: 3, col: '#1a1010' }); ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#ffe0a0'; ctx.beginPath(); ctx.moveTo(x0 + 10, -310); ctx.lineTo(x0 + 50, -310); ctx.lineTo(x0 + 10, -200); ctx.fill(); ctx.restore(); }
    rect(-60, -110, 120, 480, { wash: '#7a1a1e', washA: 1, w: 3, col: '#2a0606' });
    ell(0, 60, 46, 46, { wash: '#c03030', washA: 1, w: 3, col: '#f4e0b0' }); txt('М', 0, 62, 60, { col: '#fff2d0', font: 'Osw' });
    for (const hx of [-200, 200]) { ell(hx, 250, 46, 46, { wash: '#fff8e0', washA: 1, w: 4, col: '#2a2a2a' }); glow(hx, 250, 220, 'rgba(255,246,210,1)', 0.9); }
    rect(-240, 380, 480, 40, { wash: '#2a2424', washA: 1, w: 3, col: '#0a0606' });
    pop();
  }
  TRANS_IN.metro = { a: 0.5, b: 0.45, runA: 1, fx(k, t, A, B) {
    const sk = sm(k / 0.4);
    if (k < 0.74) {
      drawBuf(A, 1 + 0.06 * k);
      scr(() => {
        for (let i = 0; i < 26; i++) { const r = rng(i * 11 + 3), x = r() * W + Math.sin(t * 1.5 + i) * 60, y = r() * H - k * 300 * r(), R = 260 + r() * 500;
          glow(x, y, R * (0.4 + sk), i % 3 ? 'rgba(58,44,42,1)' : 'rgba(96,74,66,1)', 0.95 * sk, 'source-over'); }
        screenFill('#2a201e', 0.85 * sm((k - 0.15) / 0.3));
        if (k > 0.28) { const q = (k - 0.28) / 0.46, s = 0.06 + Math.pow(q, 3.2) * 4.2, a = sm(q * 3);
          ctx.save(); ctx.globalAlpha = a; trainFront(540, 960 - 60 * s, s, t); ctx.restore();
          for (let i = 0; i < 14; i++) { const r = rng(i * 5 + 1); glow(r() * W, r() * H, 300 + r() * 300, 'rgba(60,46,44,1)', 0.6 * (1 - q), 'source-over'); }
          for (const hx of [-200, 200]) glow(540 + hx * s, 960 - 60 * s + 250 * s, 120 + 600 * q, 'rgba(255,246,210,1)', 0.7 * a);
          if (q > 0.6) { const rr = rng(hsh(FRAME, 9)); for (let i = 0; i < 40; i++) { const an = rr() * 6.283, d0 = 200 + rr() * 200, d1 = d0 + 400 + rr() * 600; pencil([[540 + Math.cos(an) * d0, 960 + Math.sin(an) * d0], [540 + Math.cos(an) * d1, 960 + Math.sin(an) * d1]], { w: 3, col: '#fff6e0', a: 0.6 * (q - 0.6) / 0.4, pass2: false, gap: false }); } }
        }
      });
      if (k > 0.66) whiteOut((k - 0.66) / 0.08 * 0.9, '255,244,214');
    } else {
      const q = (k - 0.74) / 0.26;
      for (let i = 4; i >= 0; i--) drawBuf(B, 1.12 - 0.12 * sm(q) + i * 0.02 * (1 - q), 540, 960, i ? 0.18 * (1 - q) : 1);
      whiteOut((1 - q) * 0.9, '255,244,214');
    }
  } };
})();
