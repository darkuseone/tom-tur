/* 002 — СЕГОДНЯ и КНОПКА. today: Парящий мост Зарядья, Кремль, вдали Москва-Сити, толпа, табло 13 000 000+, «М»; в конце сквозь город
   проступает призрак древнего моря (петля к хуку). button: ночная московская крыша, звезда Спасской вдали, портал часов с постерами городов.
   Переходы: в today — эскалатор метро вверх; в button — вихрь-воронка. */
(() => {
  const wt = (k, w) => {                                            // время слова внутри субтитра-фрагмента (пропорция по буквам)
    const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
    const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w))));
    if (!c) return LS(k); const i = c.words.findIndex(x => n(x).startsWith(n(w))), all = c.words.join(' ').length, pre = c.words.slice(0, i).join(' ').length + (i ? 1 : 0);
    return c.t0 + (c.t1 - c.t0) * pre / all;
  };
  EV.td_count = wt('t1', 'тринадцать');                               // табло начинает считать
  EV.td_full = wt('t1', 'человек');                                    // 13 000 000+ — щелчок, вспышка
  EV.td_walk = WT('t1', 'все');                                        // толпа течёт мимо
  EV.td_sea = WT('t1', 'по');                                          // проступает древнее море
  EV.td_wink = WT('t1', 'моря');                                       // подмигивание в камеру
  EV.bt_point = WT('x1', 'Пиши');
  EV.bt_wink = WT('x1', 'отмотаем');
  SHAKES.push([EV.td_full, 0.2, 5]);
  for (const w of ['тринадцать', 'миллионов', 'древнего', 'моря!', 'дальше?']) if (!KEYW.includes(w)) KEYW.push(w);

  const LN = '#140c14';
  function caust(map, nu, nv, t, col, a, w) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu * 3; i++) { const u = i / (nu * 3), v = (j + 0.32 * Math.sin(u * 19 + t * 1.7 + j) + 0.18 * Math.sin(u * 7 - t * 1.1 + j * 2)) / nv, p = map(u, v); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv * 3; j++) { const v = j / (nv * 3), u = (i + 0.32 * Math.sin(v * 17 + t * 1.5 + i) + 0.18 * Math.sin(v * 6 + t * 0.9 + i * 3)) / nu, p = map(u, v); j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.globalAlpha = a * 0.35; ctx.lineWidth = w * 3.2 / S; ctx.stroke(); ctx.globalAlpha = a * 0.6; ctx.lineWidth = w * 0.8 / S; ctx.stroke(); ctx.restore();
  }
  // ---------------------------------------------------------------- призраки моря (полупрозрачные, светящиеся контуры)
  const GC = '#9ff4ff';
  function gFish(x, y, s, t, fl, a) { push(x, y, s, Math.sin(t * 4) * 0.06, fl); const tw = Math.sin(t * 8) * 10;
    blob([[-60, 0], [-40, -22], [10, -24], [50, -10], [66, -26 + tw], [62, 0], [68, 24 + tw], [48, 8], [10, 20], [-40, 18]], { wash: GC, washA: 0.18 * a, w: 2.4, col: GC, a: 0.85 * a });
    line([[-30, -20], [-26, 16]], { w: 2, col: GC, a: 0.7 * a, pass2: false }); ctx.fillStyle = GC; ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(-44, -6, 4, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1; pop(); }
  function gShark(x, y, s, t, fl, a) { push(x, y, s, 0, fl); const tw = Math.sin(t * 6) * 16;
    blob([[-150, 0], [-110, -28], [-30, -40], [40, -34], [110, -18], [150, -6], [205, -38 + tw], [196, tw * 0.6], [214, 34 + tw], [150, 10], [100, 22], [20, 32], [-80, 30], [-140, 14]], { wash: GC, washA: 0.14 * a, w: 3, col: GC, a: 0.8 * a });
    shape([[-46, -38], [-60, -96], [-20, -112], [40, -110], [30, -96], [-6, -92], [-14, -38]], { wash: GC, washA: 0.2 * a, w: 2.4, col: GC, a: 0.8 * a });
    for (let i = 0; i < 9; i++) line([[-50 + i * 10, -108], [-52 + i * 10, -122 - (i % 2) * 6]], { w: 2, col: GC, a: 0.7 * a, pass2: false }); pop(); }
  function gLily(x, y, h, t, a, seed) {                              // морская лилия растёт из брусчатки
    if (h < 4) return; const sw = Math.sin(t * 1.4 + seed) * h * 0.12, pts = []; for (let i = 0; i <= 8; i++) { const v = i / 8; pts.push([x + Math.sin(v * 2.5) * sw, y - v * h]); }
    pencil(pts, { w: 4, col: GC, a: 0.8 * a, pass2: false, gap: false }); for (let i = 1; i < 8; i++) line([[pts[i][0] - 5, pts[i][1]], [pts[i][0] + 5, pts[i][1]]], { w: 1.6, col: GC, a: 0.6 * a, pass2: false, smooth: false });
    const [cx, cy] = pts[8]; ell(cx, cy, 10, 8, { wash: GC, washA: 0.3 * a, w: 2, col: GC, a: 0.8 * a });
    for (let k = 0; k < 8; k++) { const an = -Math.PI / 2 + (k - 3.5) * 0.28 + Math.sin(t * 2 + k + seed) * 0.12, L = h * 0.35; const P = [[cx, cy], [cx + Math.cos(an) * L * 0.5 - (k - 3.5) * 2, cy + Math.sin(an) * L * 0.6], [cx + Math.cos(an) * L, cy + Math.sin(an) * L * 0.8 + L * 0.25]];
      line(P, { w: 2.2, col: GC, a: 0.75 * a, pass2: false }); for (let f = 1; f < 5; f++) { const q = f / 5, px = lerp(P[0][0], P[2][0], q), py = lerp(P[0][1], P[2][1], q) - L * 0.15 * Math.sin(q * 3); line([[px, py], [px + 7, py + 6]], { w: 1.2, col: GC, a: 0.5 * a, pass2: false, smooth: false }); } }
    glow(cx, cy, h * 0.4, 'rgba(150,240,255,1)', 0.25 * a);
  }
  // ---------------------------------------------------------------- Москва-Сити и Кремль
  function tower(pts, col, wins, seed, top) { const p = poly(pts, { wash: col, washA: 1, w: 2, col: LN }); const bb = bbOf(pts); ctx.save(); ctx.clip(p.path); windows(bb[0], bb[1], bb[2] - bb[0], bb[3] - bb[1], Math.max(3, Math.floor((bb[2] - bb[0]) / 9)), Math.floor((bb[3] - bb[1]) / 12), seed, 0.5, wins, '#bfe6ff', 0.75);
    const g = ctx.createLinearGradient(bb[0], 0, bb[2], 0); g.addColorStop(0, 'rgba(255,255,255,0.18)'); g.addColorStop(0.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,20,0.4)'); ctx.fillStyle = g; ctx.fillRect(bb[0], bb[1], bb[2] - bb[0], bb[3] - bb[1]); ctx.restore(); return top; }
  function mcity(t, B) {
    const tops = [];
    tower([[150, B], [150, B - 300], [190, B - 330], [190, B]], '#3a4a6a', '#ffd890', 1); tops.push([190, B - 330]);                   // Город столиц (ступени)
    poly([[120, B], [120, B - 240], [160, B - 250], [160, B]], { wash: '#344262', washA: 1, w: 2, col: LN });
    { const p = []; for (let i = 0; i <= 12; i++) { const v = i / 12; p.push([232 + Math.sin(v * 3.2) * 10, B - v * 380]); } for (let i = 12; i >= 0; i--) { const v = i / 12; p.push([282 + Math.sin(v * 3.2 + 0.6) * 10, B - v * 380]); }   // Эволюция — скрученная
      const ep = poly(p, { wash: '#4a6a8a', washA: 1, w: 2, col: LN }); ctx.save(); ctx.clip(ep.path); for (let y = B - 380; y < B; y += 14) { ctx.strokeStyle = 'rgba(200,230,255,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(220, y + 8); ctx.quadraticCurveTo(257, y - 4, 295, y + 2); ctx.stroke(); } ctx.restore(); tops.push([257, B - 382]); }
    tower([[300, B], [300, B - 400], [338, B - 470], [338, B]], '#5a7090', '#ffe0a0', 3);                                // Федерация: «паруса»
    tower([[338, B], [338, B - 560], [384, B - 470], [384, B]], '#6a84a8', '#ffe0a0', 4); line([[338, B - 560], [338, B - 640]], { w: 3, col: '#c8d8e8', pass2: false }); tops.push([338, B - 640]);
    tower([[400, B], [400, B - 420], [418, B - 455], [446, B - 470], [462, B - 440], [462, B]], '#a8783a', '#ffe0a0', 5); tops.push([446, B - 470]);   // Меркурий — золотистый
    { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(400, 0, 462, 0); g.addColorStop(0, 'rgba(255,200,110,0.35)'); g.addColorStop(1, 'rgba(255,170,80,0)'); ctx.fillStyle = g; ctx.fillRect(400, B - 470, 62, 470); ctx.restore(); }
    tower([[478, B], [478, B - 520], [492, B - 545], [530, B - 545], [544, B - 520], [544, B]], '#2e3e5e', '#ffd890', 6); tops.push([511, B - 545]);   // ОКО
    tower([[552, B], [552, B - 380], [568, B - 400], [596, B - 400], [608, B - 380], [608, B]], '#34466a', '#ffd890', 7);
    tower([[612, B], [612, B - 260], [660, B - 260], [660, B]], '#2a3858', '#ffcf7a', 8);
    tops.forEach(([x, y], i) => glow(x, y, 16, 'rgba(255,40,40,1)', 0.5 + 0.5 * Math.sin(t * 4 + i * 1.7)));
  }
  function ktower(x, base, w, h, tent, s, t) { push(x, base, s); const p = rect(-w / 2, -h, w, h, { wash: '#a2352a', washA: 1, w: 2, col: LN }); hatch(p.path, p.bb, { gap: 8, a: 0.2, col: '#5e1a14', key: x });
    poly([[-w / 2 - 4, -h], [w / 2 + 4, -h], [3, -h - tent], [-3, -h - tent]], { wash: '#2f5a42', washA: 1, w: 2, col: LN }); glow(0, -h - tent - 14, 40, 'rgba(255,40,40,1)', 0.5); ctx.fillStyle = '#ff4a4a'; ctx.beginPath(); ctx.arc(0, -h - tent - 14, 6, 0, 6.3); ctx.fill(); pop(); }
  function kremlin(t, B) {                                            // Кремль с набережной: стена, башни, Большой дворец, соборы, Иван Великий
    push(0, 0, 1);
    { const pal = rect(720, B - 150, 280, 110, { wash: '#e8d8b0', washA: 1, w: 2, col: LN }); poly([[714, B - 150], [1006, B - 150], [990, B - 180], [730, B - 180]], { wash: '#4a7a5a', washA: 1, w: 1.8, col: LN }); windows(728, B - 140, 264, 90, 22, 4, 9, 0.85, '#ffe6a8', '#ffe6a8', 0.9); }
    for (const [x, w, h, c] of [[1030, 30, 60, '#f1cd5a'], [1070, 36, 70, '#f1cd5a'], [1110, 26, 50, '#f1cd5a']]) { rect(x - w / 2, B - 150 - h * 0.6, w, h * 0.6, { wash: '#f0e6d0', washA: 1, w: 1.6, col: LN }); blob([[x - w / 2, B - 150 - h * 0.6], [x - w * 0.6, B - 150 - h * 0.8], [x, B - 150 - h * 1.2], [x + w * 0.6, B - 150 - h * 0.8], [x + w / 2, B - 150 - h * 0.6]], { wash: c, washA: 1, w: 1.8, col: '#6a4a10' }); glow(x, B - 150 - h, 50, 'rgba(255,210,120,1)', 0.4); }
    { const x = 1180; rect(x - 22, B - 420, 44, 300, { wash: '#f4ecd8', washA: 1, w: 2, col: LN }); for (const y of [B - 320, B - 220]) rect(x - 26, y, 52, 8, { wash: '#d8ccb0', washA: 1, w: 1.2 }); rect(x - 16, B - 480, 32, 60, { wash: '#f4ecd8', washA: 1, w: 1.8, col: LN });   // Иван Великий
      blob([[x - 16, B - 480], [x - 22, B - 505], [x, B - 545], [x + 22, B - 505], [x + 16, B - 480]], { wash: '#f1cd5a', washA: 1, w: 2, col: '#6a4a10' }); line([[x, B - 545], [x, B - 575]], { w: 2.4, col: '#f1cd5a', pass2: false }); glow(x, B - 400, 160, 'rgba(255,220,150,1)', 0.35); }
    const wl = pathOf([[620, B], [620, B - 70], [1400, B - 70], [1400, B]]); wash(wl, '#a2352a', 1); hatch(wl, [620, B - 70, 1400, B], { gap: 8, a: 0.2, col: '#5e1a14', key: 2 });
    { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, B, 0, B - 70); g.addColorStop(0, 'rgba(255,180,110,0.45)'); g.addColorStop(1, 'rgba(255,180,110,0)'); ctx.fillStyle = g; ctx.fill(wl); ctx.restore(); }
    for (let x = 620; x < 1400; x += 18) poly([[x, B - 70], [x, B - 84], [x + 6, B - 78], [x + 12, B - 84], [x + 12, B - 70]], { wash: '#a2352a', washA: 1, line: false });
    ktower(640, B, 50, 120, 90, 1, t); ktower(860, B, 40, 90, 70, 1, t); ktower(1000, B, 36, 80, 60, 1, t); ktower(1300, B, 54, 130, 110, 1, t);
    pop();
  }
  function person(x, y, h, col, ph, t, seed, walk) {
    const sw = walk ? Math.sin(t * 9 + seed) * h * 0.08 : 0;
    sil([[x - h * 0.13 - sw, y], [x - h * 0.15, y - h * 0.6], [x - h * 0.08, y - h * 0.74], [x + h * 0.08, y - h * 0.74], [x + h * 0.15, y - h * 0.6], [x + h * 0.13 + sw, y]], col, 0.97);
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - h * 0.84 + Math.abs(sw) * 0.2, h * 0.1, 0, 6.3); ctx.fill();
    if (ph) { const hx = x + h * 0.1, hy = y - h * 0.7; ctx.fillStyle = '#d8f4ff'; ctx.fillRect(hx - h * 0.03, hy - h * 0.05, h * 0.06, h * 0.09); glow(hx, hy - h * 0.05, h * 0.28, 'rgba(170,220,255,1)', 0.6); }
  }
  function scooter(x, y, s, t, fl) { push(x, y, s, 0, fl); person(0, -18, 160, '#16121e', false, t, 3, false); line([[-40, -6], [40, -6]], { w: 6, col: '#2a2a30', pass2: false }); line([[36, -6], [30, -130]], { w: 4, col: '#2a2a30', pass2: false }); line([[20, -130], [42, -130]], { w: 4, col: '#2a2a30', pass2: false });
    for (const wx of [-36, 36]) ell(wx, 0, 9, 9, { wash: '#101014', washA: 1, w: 2 }); glow(40, -120, 60, 'rgba(255,250,220,1)', 0.6); ctx.fillStyle = '#3ad86a'; ctx.fillRect(-30, -12, 50, 5); pop(); }
  const fmt = n => String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  // ---------------------------------------------------------------- СЕГОДНЯ
  WORLD.today = (t, u, cat) => {
    const sea = sm((t - EV.td_sea) / 0.7), cnt = sm((t - EV.td_count) / (EV.td_full - EV.td_count)), full = t > EV.td_full;
    lay(40, () => { vgrad(-600, 1200, ['#0a1030', '#1e2050', '#4a2e66', '#b8606a', '#f0a070']); ctx.save(); ctx.fillStyle = '#fff6e0'; const r = rng(9); for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.3 + 0.4 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(r() * W * 1.4 - 200, r() * 700 - 200, 2, 2); } ctx.restore(); glow(400, 1100, 600, 'rgba(255,160,100,1)', 0.35); });
    lay(16, () => { mcity(t, 1110); sil([[-400, 1110], [-400, 1060], [100, 1050], [700, 1070], [1500, 1060], [1500, 1110]], '#2a2240', 1); });
    haze('#3a2a5a', 0.12);
    lay(8, () => kremlin(t, 1150));
    lay(6, () => {                                                    // Москва-река: отражения огней, речной трамвай
      const rv = pathOf([[-1000, 1150], [W + 1000, 1150], [W + 1000, 1420], [-1000, 1420]]); { const g = ctx.createLinearGradient(0, 1150, 0, 1420); g.addColorStop(0, '#2a2648'); g.addColorStop(1, '#141228'); ctx.save(); ctx.fillStyle = g; ctx.fill(rv); ctx.restore(); }
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(4); for (let i = 0; i < 70; i++) { const x = -300 + r() * 1700, y = 1160 + r() * 240, c = x > 600 ? 'rgba(255,200,120,0.5)' : r() < 0.5 ? 'rgba(255,220,150,0.45)' : 'rgba(150,200,255,0.45)'; ctx.fillStyle = c; ctx.fillRect(x + Math.sin(t * 3 + i) * 6, y, 16 + r() * 40, 2.5); } ctx.restore();
      const bx = ((-(t - S0.today) * 70 + 1300) % 1800) - 300; push(bx, 1250, 0.8); blob([[-170, 0], [-150, -36], [160, -36], [190, -10], [160, 14], [-150, 14]], { wash: '#e8e2d6', washA: 1, w: 2.4, col: LN }); rect(-120, -76, 230, 40, { wash: '#3a4a5a', washA: 1, w: 2, col: LN }); windows(-116, -72, 222, 32, 10, 1, 2, 0.95, '#ffe6a8', '#ffe6a8', 1); glow(0, -50, 180, 'rgba(255,220,150,1)', 0.3); pop();
    });
    lay(3, () => {                                                    // слева — дом с медиафасадом-табло; знак метро «М»
      const b = rect(-200, 440, 640, 1100, { wash: '#2a2438', washA: 1, w: 2.4, col: LN }); hatch(b.path, b.bb, { gap: 9, a: 0.2, col: '#0a0614', key: 31 }); windows(-190, 830, 620, 480, 20, 14, 5, 0.5, '#ffcf7a', '#8fd8ff', 0.7);
      const pk = popK(t, EV.td_count - 0.15, 0.3); push(250, 620, 0.85 + 0.1 * pk);
      rect(-240, -140, 480, 270, { wash: '#060812', washA: 1, w: 3, col: '#1a1a2a' }); glow(0, 0, 360, full ? 'rgba(255,190,90,1)' : 'rgba(90,200,255,1)', 0.3 + (full ? 0.25 * Math.max(0, 1 - (t - EV.td_full) / 0.5) : 0));
      ctx.save(); ctx.globalAlpha = 0.25; for (let y = -136; y < 130; y += 6) { ctx.fillStyle = '#000'; ctx.fillRect(-238, y, 476, 2); } ctx.restore();
      txt('НАСЕЛЕНИЕ МОСКВЫ', 0, -90, 34, { col: '#8fd8ff', font: 'Osw' });
      const v = t < EV.td_count ? 0 : full ? 13000000 : cnt * 13000000 + (rng(hsh(FRAME, 3))() * 900);
      txt(fmt(v) + (full ? '+' : ''), 0, -4, full ? 88 : 80, { col: full ? '#ffd34a' : '#e8f6ff', font: 'Osw' });
      txt(full ? 'и все — по дну моря' : 'человек', 0, 80, 32, { col: full ? '#ffb070' : '#8fd8ff', font: 'Osw', a: 0.9 });
      pop();
    });
    lay(2.2, () => { push(980, 1360, 1); rect(-6, -330, 12, 330, { wash: '#2a2a30', washA: 1, w: 2 }); ell(0, -370, 52, 52, { wash: '#f4f0e6', washA: 1, w: 3, col: '#1a1a20' }); glow(0, -370, 140, 'rgba(255,90,80,1)', 0.45); txt('М', 0, -366, 76, { col: '#d8302a', font: 'Osw' }); pop(); });
    haze('#2a1a3a', 0.05);
    lay(1.6, () => {                                                  // Парящий мост: стеклянный парапет, толпа течёт мимо
      const dk = pathOf([[-1000, 1330], [W + 1000, 1330], [W + 1000, 2400], [-1000, 2400]]); wash(dk, '#4a4656', 1);
      pencil([[-1000, 1330], [W + 1000, 1330]], { w: 3, col: '#1a1620' }); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,190,0.6)'; ctx.fillRect(-1000, 1326, W + 2000, 3); ctx.restore();
      const flow = t > EV.td_walk - 0.3 ? 1 : 0.35, r = rng(55);
      for (let k = 0; k < 30; k++) { const dir = k % 2 ? 1 : -1, sp = (60 + r() * 50) * dir * (0.4 + flow), x = (((r() * 2200 + (t - S0.today) * sp) % 2200) + 2200) % 2200 - 560, h = 150 + r() * 40, y = 1342 + (k % 3) * 8;
        if (Math.abs(x - 560) < 60) continue; person(x, y, h, ['#1e1828', '#2a1e34', '#18141e'][k % 3], r() < 0.45, t, k, true); }
      const sx = (((t - S0.today) * 420) % 2600) - 700; scooter(sx, 1356, 0.95, t, 1);
      pencil([[-1000, 1240], [W + 1000, 1240]], { w: 2.4, col: '#cfe0ef', a: 0.6, pass2: false }); ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#bfe0ff'; ctx.fillRect(-1000, 1240, W + 2000, 90); ctx.restore();
    });
    lay(1, () => {
      vgrad(1430, 2400, ['#3a3644', '#24202c']); pencil([[-800, 1432], [W + 800, 1432]], { w: 2, col: '#14101a', a: 0.6, pass2: false });
      for (let k = -6; k < 14; k++) pencil([[k * 120, 1432], [k * 120 - 120, 2400]], { w: 1.4, a: 0.35, pass2: false, col: '#14101a' });
      if (sea > 0) for (let i = 0; i < 6; i++) { const x = [120, 300, 760, 900, 1000, 40][i], gr = sm((t - EV.td_sea - i * 0.07) / 0.9); gLily(x, 1450 + (i % 2) * 20, gr * (260 + i * 30), t, sea, i); }
      cat();
      if (sea > 0) { gFish(lerp(1200, -300, clamp((t - EV.td_sea) / 1.4)), 1060, 0.9, t, 1, sea); gFish(lerp(-300, 1200, clamp((t - EV.td_sea - 0.2) / 1.6)), 1250, 0.7, t + 1, -1, sea); gFish(lerp(1300, -200, clamp((t - EV.td_sea - 0.4) / 1.5)), 820, 1.1, t + 2, 1, sea); }
    });
    lay(0.72, () => {                                                // передний план: прохожие в расфокусе
      for (let k = 0; k < 2; k++) { const ph = ((t - S0.today) * 0.55 + k * 0.5) % 1, x = k ? lerp(1500, -500, ph) : lerp(-500, 1500, ph); person(x, 2100, 820, '#0c0a10', k === 0, t, 9 + k, true); }
    });
    if (sea > 0) scr(() => {                                          // ПРИЗРАК ДРЕВНЕГО МОРЯ над городом
      ctx.save(); ctx.globalAlpha = 0.22 * sea; ctx.fillStyle = '#0a5a7a'; ctx.globalCompositeOperation = 'soft-light'; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.18 * sea; const g = ctx.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#2a9ab8'); g.addColorStop(1, 'rgba(20,90,120,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 900); ctx.restore();
      rays(540, -200, Math.PI / 2, 1.2, 2000, 'rgba(160,240,255,0.5)', 0.25 * sea, 9, t);
      caust((a, b) => [lerp(-100, W + 100, a), lerp(380, H, b)], 7, 10, t, '#9ff4ff', 0.22 * sea, 2.2);
      const sy = []; for (let x = -40; x <= W + 40; x += 30) sy.push([x, 420 + Math.sin(x * 0.012 + t * 2) * 12]); pencil(sy, { w: 3, col: '#bff6ff', a: 0.6 * sea, pass2: false, gap: false });
      gShark(lerp(-400, 1500, clamp((t - EV.td_sea) / 1.9)), 640, 1.3, t, -1, sea);
      for (let i = 0; i < 30; i++) { const r = rng(i * 7 + 2), x = r() * W, ph = (t * (0.3 + r() * 0.3) + r()) % 1, y = 1500 - ph * 1100; ctx.strokeStyle = 'rgba(200,250,255,0.7)'; ctx.globalAlpha = sea; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x, y, 3 + r() * 6, 0, 6.3); ctx.stroke(); ctx.globalAlpha = 1; }
    });
    motes(30, [0, 300, W, 1500], '#ffe0f0', t, 22, { sp: 20, sz: 2, a: 0.45, tw: 1, add: 1 });
  };
  DIR.today = {
    outfit: 'hoodieM', light: { side: -1, rim: '#ff9fd0' }, grade: ['#3a1a5a', 0.3],
    act: () => [[S0.today, 'proud'], [EV.td_count - 0.05, 'awe'], [EV.td_full, 'shock'], [EV.td_walk, 'suspicious'], [EV.td_sea, 'awe'], [EV.td_wink - 0.08, 'wink']],
    pose: (t, u, b) => {
      const ph = t < EV.td_count ? 0 : t < EV.td_walk ? 1 : t < EV.td_sea ? 2 : t < EV.td_wink - 0.08 ? 3 : 4;
      return Object.assign(b, { x: 560, y: 1490, s: 1.2,
        look: [[0.1, -0.1], [-0.8, -0.7], [0.85, 0.05], [0.1, -1], [0, 0.05]][ph],
        hand: [[70, -150], [60, -220], [140, -270], [96, -170], [100, -280]][ph], point: ph === 2,
        handF: [[-60, -140], [-90, -270], undefined, [-110, -190], undefined][ph],
        tilt: ph === 0 ? -0.05 : ph === 4 ? 0.08 : 0, tailUp: ph === 1 || ph === 3, squash: t > EV.td_full && t < EV.td_full + 0.25 ? 0.3 * (1 - (t - EV.td_full) / 0.25) : b.squash, walk: u < 0.45 ? t * 8 : undefined });
    },
    cam: () => [[S0.today, 560, 900, -0.55], [S0.today + 0.5, 560, 960, 0.06, 'x'], [EV.td_count, 500, 920, 0.08], [EV.td_count + 0.35, 400, 860, 0.16, 'x'], [EV.td_full + 0.2, 400, 860, 0.2],
      [EV.td_walk + 0.25, 600, 1000, 0.1, 'x'], [EV.td_sea, 580, 980, 0.04], [EV.td_sea + 0.6, 560, 900, -0.14], [EV.td_wink, 560, 940, -0.1], [EV.td_wink + 0.25, 560, 1030, 0.24, 'x'], [S1.today, 560, 1035, 0.27]]
  };

  // ---------------------------------------------------------------- переход в today: эскалатор метро вверх → вылет в город
  function escalator(k, t) {
    scr(() => {
      const VX = 540, VY = 560, off = 3 * k + 26 * k * k * k, F = 420, P = (x, z) => [VX + x * F / z, VY + F / z];
      { const g = ctx.createRadialGradient(VX, VY, 10, VX, VY, 1300); g.addColorStop(0, '#ffe8b8'); g.addColorStop(0.06, '#a8743a'); g.addColorStop(0.3, '#4a2e1a'); g.addColorStop(1, '#140a06'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
      const zn = 0.3, lane = (x0, x1, col) => { const a = P(x0, zn), b = P(x1, zn); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(VX, VY); ctx.closePath(); ctx.fill(); };
      lane(-2.2, -0.95, '#2a2a30'); lane(0.95, 2.2, '#2a2a30'); lane(-0.95, -0.55, '#7a4a22'); lane(0.55, 0.95, '#7a4a22'); lane(-0.55, 0.55, '#5a5a62');   // эскалаторы, деревянные балюстрады
      const N = 30;
      for (let i = N; i >= 0; i--) { const z = ((i - off) % N + N) % N + zn, p = F / z, a = clamp(1.5 - z / N * 1.5);
        ctx.strokeStyle = `rgba(240,215,170,${0.55 * a})`; ctx.lineWidth = Math.max(1, 30 / z); ctx.beginPath(); ctx.arc(VX, VY + p * 0.3, p * 2.4, Math.PI * 1.04, Math.PI * 1.96); ctx.stroke();   // кессоны свода
        for (let st = 0; st < 3; st++) { const zz = z + st / 3, A = P(-0.55, zz), B_ = P(0.55, zz); ctx.strokeStyle = `rgba(20,20,26,${0.8 * a})`; ctx.lineWidth = Math.max(1, 9 / zz); ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B_); ctx.stroke(); ctx.strokeStyle = `rgba(220,220,230,${0.6 * a})`; ctx.lineWidth = Math.max(1, 3 / zz); ctx.beginPath(); ctx.moveTo(A[0], A[1] - 6 / zz); ctx.lineTo(B_[0], B_[1] - 6 / zz); ctx.stroke(); }
        if (i % 2 === 0) for (const lx of [-0.75, 0.75]) { const [x, y0] = P(lx, z), y1 = y0 - p * 0.9; ctx.strokeStyle = `rgba(50,30,14,${a})`; ctx.lineWidth = Math.max(1.5, 12 / z); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();   // «торшеры»
          ctx.fillStyle = `rgba(255,244,210,${a})`; ctx.beginPath(); ctx.ellipse(x, y1 - p * 0.1, p * 0.07, p * 0.13, 0, 0, 6.3); ctx.fill(); glow(x, y1 - p * 0.1, p * 0.5, 'rgba(255,220,150,1)', 0.5 * a); }
      }
      ctx.strokeStyle = 'rgba(10,8,6,0.95)'; ctx.lineWidth = 10; ctx.beginPath(); for (const lx of [-0.58, 0.58, -0.92, 0.92]) { const a = P(lx, zn); ctx.moveTo(a[0], a[1] - 40); ctx.lineTo(VX, VY); } ctx.stroke();   // поручни
      const r = rng(hsh(FRAME, 71)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 50 * k; i++) { const an = r() * 6.283, d0 = 160 + r() * 300, d1 = d0 + 300 + r() * 800; ctx.strokeStyle = 'rgba(255,240,210,0.35)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(VX + Math.cos(an) * d0, VY + Math.sin(an) * d0); ctx.lineTo(VX + Math.cos(an) * d1, VY + Math.sin(an) * d1); ctx.stroke(); } ctx.restore();
      glow(VX, VY, 120 + k * k * 1300, 'rgba(255,248,225,1)', 0.35 + k * k * 0.65);
      if (k < 0.75) txt('ВЫХОД В ГОРОД ↑', VX, VY + 130 / (1 + k * 2), 40 / (1 + k * 2), { col: '#ffe9b8', font: 'Osw', a: 0.8 * (1 - k) });
    });
  }
  TRANS_IN.today = { a: 0.3, b: 0.55, fx(k, t, A, B) {
    if (k < 0.72) { escalator(k / 0.72, t); if (k < 0.28) { const q = k / 0.28; drawBuf(A, 1 + q * 0.15, 540, 960, 1 - sm(q), null, 0, q * 900); } whiteOut(clamp((k - 0.55) / 0.17)); }
    else { const q = (k - 0.72) / 0.28; drawBuf(B, 1.4 - 0.4 * sm(q)); whiteOut(1 - sm(q)); }
  } };

  // ---------------------------------------------------------------- КНОПКА: ночная крыша, портал с постерами
  function posterM(x, y, s, rot, title, c1, c2, kind, t) {
    push(x, y, s, rot); rect(-120, -170, 240, 340, { wash: c1, washA: 0.98, w: 3, col: '#1a0e06' });
    ctx.save(); ctx.beginPath(); ctx.rect(-120, -170, 240, 340); ctx.clip(); { const g = ctx.createLinearGradient(0, -170, 0, 110); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(-120, -170, 240, 340); }
    if (kind === 'eiffel') { poly([[-60, 110], [-8, -130], [8, -130], [60, 110], [30, 110], [0, 20], [-30, 110]], { wash: '#2a1a1a', washA: 1, w: 2 }); line([[-36, 40], [36, 40]], { w: 3, col: '#2a1a1a', pass2: false }); }
    if (kind === 'col') { ell(0, 50, 104, 74, { wash: '#c8a070', washA: 1, w: 2 }); for (let q = -3; q <= 3; q++) rect(q * 26 - 8, 10, 16, 40, { wash: '#2a1a10', washA: 0.8, line: false }); for (let q = -3; q <= 3; q++) rect(q * 26 - 6, 70, 12, 26, { wash: '#2a1a10', washA: 0.7, line: false }); }
    if (kind === 'piter') { poly([[-120, 110], [-120, 60], [-20, 60], [-60, -10], [-50, -16], [-10, 56], [-10, 110]], { wash: '#2a3a5a', washA: 1, w: 2 }); poly([[120, 110], [120, 60], [20, 60], [60, -10], [50, -16], [10, 56], [10, 110]], { wash: '#2a3a5a', washA: 1, w: 2 });   // разведённый мост + шпиль
      line([[0, 56], [0, -150]], { w: 4, col: '#f1cd5a', pass2: false }); rect(-12, 0, 24, 56, { wash: '#e8d8a8', washA: 1, w: 1.6 }); glow(0, -150, 40, 'rgba(255,220,120,1)', 0.6); }
    if (kind === 'fuji') { poly([[-120, 110], [0, -60], [120, 110]], { wash: '#3a4a7a', washA: 1, w: 2 }); poly([[-34, -10], [0, -60], [34, -10], [12, 0], [0, -14], [-12, 0]], { wash: '#f4f4f4', washA: 1, w: 1.6 }); ctx.fillStyle = '#d83a3a'; ctx.beginPath(); ctx.arc(60, -100, 30, 0, 6.3); ctx.fill(); }
    ctx.restore(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-120, 110, 240, 60); txt(title, 0, 141, 40, { col: '#f6e7c8', font: 'Osw' }); txt('?', 92, -140, 44, { col: '#ffd34a', font: 'Osw' }); pop();
  }
  function roof(t) {                                                   // жестяная московская крыша: фальцы, конёк, труба, слуховое окно, антенна
    const rp = pathOf([[-900, 1600], [-200, 1440], [1300, 1400], [W + 900, 1460], [W + 900, 2600], [-900, 2600]]); wash(rp, '#3a4a4a', 1);
    { const g = ctx.createLinearGradient(0, 1400, 0, 2000); g.addColorStop(0, 'rgba(140,170,200,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0.4)'); ctx.save(); ctx.fillStyle = g; ctx.fill(rp); ctx.restore(); }
    ctx.save(); ctx.clip(rp); ctx.strokeStyle = 'rgba(10,16,18,0.6)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = -900; x < W + 900; x += 70) { ctx.moveTo(x, 1300); ctx.lineTo(x + (x - 540) * 0.6, 2600); } ctx.stroke();
    ctx.strokeStyle = 'rgba(200,220,240,0.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = -900; x < W + 900; x += 70) { ctx.moveTo(x + 4, 1300); ctx.lineTo(x + 4 + (x - 540) * 0.6, 2600); } ctx.stroke(); ctx.restore();
    pencil([[-900, 1600], [-200, 1440], [1300, 1400], [W + 900, 1460]], { w: 4, col: '#0a1012' });
    push(110, 1450, 1); const ch = rect(-50, -230, 100, 240, { wash: '#7a3a2a', washA: 1, w: 2.6, col: '#140806' }); hatch(ch.path, ch.bb, { gap: 7, a: 0.3, col: '#2a0c06', key: 5 }); rect(-60, -244, 120, 18, { wash: '#5a2a1a', washA: 1, w: 2 });
    for (let k = 0; k < 4; k++) { const ph = (t * 0.3 + k / 4) % 1; glow(Math.sin(ph * 5 + k) * 30 * ph, -260 - ph * 400, 40 + ph * 90, 'rgba(180,170,200,1)', 0.25 * Math.sin(ph * Math.PI), 'source-over'); } pop();
    push(900, 1440, 1); poly([[-90, 0], [-90, -110], [0, -190], [90, -110], [90, 0]], { wash: '#3a4a4a', washA: 1, w: 2.6, col: '#0a1012' }); blob([[-46, -10], [-46, -90], [0, -126], [46, -90], [46, -10]], { wash: '#ffd890', washA: 1, w: 2.4, col: '#2a1a0a' }); line([[0, -126], [0, -10]], { w: 3, col: '#2a1a0a', pass2: false }); line([[-46, -60], [46, -60]], { w: 3, col: '#2a1a0a', pass2: false }); glow(0, -60, 200, 'rgba(255,200,120,1)', 0.45); pop();
    push(1010, 1300, 1); line([[0, 120], [0, -260]], { w: 4, col: '#1a1a1a', pass2: false }); for (const [y, w] of [[-240, 90], [-200, 70], [-160, 50]]) line([[-w, y], [w, y + 6]], { w: 3, col: '#1a1a1a', pass2: false }); pop();
  }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#6a3a5a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(17); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); const s_ = r() < 0.1 ? 3 : 2; ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, s_, s_); } ctx.restore();
      ctx.fillStyle = '#fff4d8'; ctx.beginPath(); ctx.arc(880, 260, 46, 0, 6.3); ctx.fill(); ctx.fillStyle = '#141838'; ctx.beginPath(); ctx.arc(900, 248, 42, 0, 6.3); ctx.fill(); glow(880, 260, 160, 'rgba(255,240,200,1)', 0.25); });
    lay(14, () => {                                                    // ночная Москва: огни, Кремль со звездой
      const r = rng(31); for (let k = 0; k < 30; k++) { const x = -600 + k * 80 + r() * 30, top = 1120 + r() * 120, w = 60 + r() * 50; sil([[x, top], [x + w, top], [x + w, 1400], [x, 1400]], '#1a1834', 1); windows(x + 3, top + 6, w - 6, 260, Math.floor(w / 12), 16, k * 7, 0.45, '#ffcf7a', '#8fd8ff', 0.75); }
      push(-300, 0, 1); sil([[380, 1250], [380, 1200], [1000, 1200], [1000, 1250]], '#7a2a24', 1);
      for (const [x, h] of [[420, 120], [560, 90], [700, 220], [880, 100]]) { sil([[x - 18, 1200], [x - 18, 1200 - h], [x + 18, 1200 - h], [x + 18, 1200]], '#8a3028', 1); sil([[x - 20, 1200 - h], [x, 1200 - h - h * 0.55], [x + 20, 1200 - h]], '#1e3a2a', 1); glow(x, 1200 - h - h * 0.6, 50, 'rgba(255,40,40,1)', 0.7); ctx.fillStyle = '#ff4a4a'; ctx.beginPath(); ctx.arc(x, 1200 - h - h * 0.6, 6, 0, 6.3); ctx.fill(); }
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, 1100, 0, 1260); g.addColorStop(0, 'rgba(255,170,110,0)'); g.addColorStop(1, 'rgba(255,170,110,0.4)'); ctx.fillStyle = g; ctx.fillRect(360, 1100, 660, 160); ctx.restore();
      for (const [x, c1, c2] of [[1060, '#2a8a4a', '#e8c040'], [1095, '#c8302a', '#e8e2d0'], [1125, '#2a5aa8', '#f0ece0']]) { ctx.fillStyle = c1; ctx.beginPath(); ctx.ellipse(x, 1196, 14, 18, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = c2; ctx.fillRect(x - 3, 1180, 6, 34); }
      pop();
    });
    haze('#2a2050', 0.1);
    lay(5, () => { const r = rng(8); for (let k = 0; k < 9; k++) { const x = -400 + k * 220 + r() * 60, y = 1330 + r() * 50; sil([[x, 1700], [x, y], [x + 90, y - 60], [x + 180, y], [x + 180, 1700]], '#141224', 1); rect(x + 40, y - 80, 24, 60, { wash: '#1a1424', washA: 1, line: false }); if (r() < 0.6) { ctx.fillStyle = '#ffcf7a'; ctx.fillRect(x + 70, y + 30, 20, 26); } } });
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;                       // портал часов + постеры городов на орбите
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(120,60,160,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      for (let k = 0; k < 10; k++) { const ph = (u * 0.6 + k / 10) % 1; pencil(ellPts(cx, cy, R * 0.9 * (1 - ph), R * 0.82 * (1 - ph), t + k, 0.05, 50), { w: 2, col: '#ffe0b0', a: 0.4 * ph, pass2: false, gap: false }); } ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ПИТЕР', '#5a6a9a', '#e8c0a0', 'piter'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); posterM(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
      for (let i = 0; i < 24; i++) { const r = rng(hsh(FRAME, i)), aa = r() * 6.283, dd = R * (0.95 + r() * 0.2); glow(cx + Math.cos(aa) * dd, cy + Math.sin(aa) * dd * 0.92, 8 + r() * 16, 'rgba(255,236,180,1)', 0.8 * open); }
    });
    lay(1, () => { roof(t); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 33, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'pufferM', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.28],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => {
      const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal });
    },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход в button: вихрь-воронка
  TRANS_IN.button = { a: 0.25, b: 0.5, fx(k, t, A, B) {
    const cx = 540, cy = 860;
    scr(() => { ctx.fillStyle = '#0a0614'; ctx.fillRect(0, 0, W, H); });
    if (k < 0.7) { const q = sm(k / 0.7), N = 12, Rm = 1500;
      for (let i = N - 1; i >= 0; i--) { const r0 = i * Rm / N, r1 = (i + 1) * Rm / N + 2, f = 1 - i / N, ang = q * q * 7 * f + q * 1.2, sc = 1 - q * (0.55 + 0.4 * f);
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.arc(cx, cy, r1 * sc, 0, 6.3); if (r0 > 0) ctx.arc(cx, cy, r0 * sc, 0, 6.3, true); ctx.clip();
        ctx.translate(cx, cy); ctx.rotate(ang); ctx.scale(sc, sc); ctx.translate(-cx, -cy); ctx.drawImage(A, 0, 0); ctx.restore(); }
      scr(() => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let s_ = 0; s_ < 5; s_++) { ctx.strokeStyle = ['#c8a0ff', '#7fe0ff', '#ffd890'][s_ % 3]; ctx.globalAlpha = 0.5 * q; ctx.lineWidth = 4; ctx.beginPath(); for (let a = 0; a < 12; a += 0.1) { const rr = 1200 * Math.exp(-a * 0.3) * (1 - q * 0.3); ctx.lineTo(cx + Math.cos(a + s_ * 1.26 + t * 6) * rr, cy + Math.sin(a + s_ * 1.26 + t * 6) * rr); } ctx.stroke(); } ctx.restore(); }); }
    if (k > 0.45) { const q = (k - 0.45) / 0.55, R = Math.pow(sm(q), 1.5) * 1600; inCircle(cx, cy, R, () => drawBuf(B, 1.4 - 0.4 * q, cx, cy, 1, null, 0, 0, (1 - q) * -0.8)); ringFX(cx, cy, R, t, ['#c8a0ff', '#7fe0ff', '#ffd890'], clamp(1.4 - q)); }
  } };
})();
