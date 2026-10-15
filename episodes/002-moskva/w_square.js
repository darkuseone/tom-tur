/* 002 — ХУК: Красная площадь 2026, синий час, а над ней висит древнее море (каустики, стетакант, гониатиты, медузы).
   Том в пуховике: шок → смотрит вверх → рыба в пузыре пролетает у головы → показывает на звезду → «Не веришь?» → часы → портал в туннель. */
(() => {
  const VPX = 560, VPY = 1190;                                       // точка схода площади (в координатах слоя 4)
  const wt = (k, w) => {                                            // время слова внутри субтитра-фрагмента (пропорция по буквам)
    const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
    const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w))));
    if (!c) return LS(k); const i = c.words.findIndex(x => n(x).startsWith(n(w))), all = c.words.join(' ').length, pre = c.words.slice(0, i).join(' ').length + (i ? 1 : 0);
    return c.t0 + (c.t1 - c.t0) * pre / all;
  };
  const env = (t, a, b, f = 0.15) => clamp((t - a) / f) * clamp((b - t) / f);

  EV.sq_more = WT('h1', 'море');
  EV.sq_fish = EV.sq_more + 0.32;                                     // рыба в пузыре пролетает у головы
  EV.sq_point = WT('h1', 'Прямо') + 0.12;                             // лапа на звезду
  EV.sq_touch = wt('h1', 'Кремлём');                                   // звезда касается воды: рябь
  EV.sq_watch = WT('h2', 'Отматываем');                                // достаёт часы
  EV.sq_glow = wt('h2', 'время');                                      // часы разгораются, куранты крутятся назад
  SHAKES.push([EV.sq_touch, 0.25, 7], [EV.sq_glow, 0.3, 6]);
  for (const w of ['площадью', 'тринадцать', 'миллионов', 'древнего', 'моря!', 'дальше?']) if (!KEYW.includes(w)) KEYW.push(w);

  const ceilBase = t => lerp(608, 692, sm((t - EV.sq_more + 0.1) / 1.1)) + 22 * sm((t - EV.sq_touch) / 2.6) + Math.sin(t * 1.3) * 5;   // вода «давит» сверху
  const sagK = t => sm((t - EV.sq_point) / 0.6) * (1 - 0.6 * sm((t - EV.sq_touch - 0.4) / 1.2));
  const ceilY = (x, t) => ceilBase(t) + Math.sin(x * 0.011 + t * 1.7) * 13 + Math.sin(x * 0.029 - t * 2.4) * 6 - 26 * sagK(t) * Math.exp(-Math.pow((x - 778) / 60, 2));

  // ---------------------------------------------------------------- морские существа карбона
  function stetha(x, y, s, t, fl = 1) {                               // стетакант: акула с «гладильной доской» на спине
    push(x, y, s, Math.sin(t * 2.2) * 0.04, fl);
    const tw = Math.sin(t * 6) * 16;
    const body = [[-150, 0], [-110, -28], [-30, -40], [40, -34], [110, -18], [150, -6 + tw * 0.3], [205, -38 + tw], [196, 0 + tw * 0.6], [214, 34 + tw], [150, 10 + tw * 0.3], [100, 22], [20, 32], [-80, 30], [-140, 14]];
    blob(body, { wash: '#3a5560', washA: 0.95, w: 2.8, col: '#06141a', shade: { gap: 7, a: 0.3, col: '#041016', ang: 0.2 } });
    blob([[-140, 10], [-60, 26], [40, 28], [100, 18], [20, 14], [-80, 12]], { wash: '#b8d0cc', washA: 0.55, line: false });
    shape([[-46, -38], [-60, -96], [-20, -112], [40, -110], [30, -96], [-6, -92], [-14, -38]], { wash: '#2a3e48', washA: 0.97, w: 2.4, col: '#06141a' });   // «наковальня»
    for (let i = 0; i < 9; i++) line([[-50 + i * 10, -108], [-52 + i * 10, -122 - (i % 2) * 6]], { w: 2, col: '#06141a', a: 0.8, pass2: false });
    shape([[-40, 26], [-10, 70], [10, 30]], { wash: '#2a3e48', washA: 0.95, w: 2, col: '#06141a' });
    ell(-112, -8, 8, 7, { wash: '#e8f4f0', washA: 1, w: 1.6, col: '#06141a' }); ctx.fillStyle = '#05080a'; ctx.beginPath(); ctx.arc(-114, -8, 3.6, 0, 6.3); ctx.fill();
    line([[-146, 10], [-120, 14], [-96, 10]], { w: 2.2, col: '#06141a' }); for (let g = 0; g < 4; g++) line([[-82 + g * 9, -10], [-84 + g * 9, 10]], { w: 1.6, col: '#06141a', a: 0.7, pass2: false });
    pop();
  }
  function gonia(x, y, s, t, seed) {                                 // гониатит: спиральная раковина со щупальцами
    push(x, y, s, Math.sin(t * 1.5 + seed) * 0.15);
    for (let i = 0; i < 6; i++) line([[-30, 6 + i * 3], [-56 - i * 4, 10 + i * 5 + Math.sin(t * 5 + i + seed) * 6], [-74 - i * 3, 18 + i * 6]], { w: 2.4, col: '#e8b8a0', a: 0.85, pass2: false });
    ell(0, 0, 36, 34, { wash: '#d8a06a', washA: 0.97, w: 2.6, col: '#2a1408' });
    const sp = []; for (let a = 0; a < 12; a += 0.25) { const r = 32 * Math.exp(-a * 0.22); sp.push([Math.cos(a) * r, Math.sin(a) * r]); } pencil(sp, { w: 2.2, col: '#5a2a10', pass2: false });
    for (let k = 0; k < 7; k++) { const a = k * 0.9; line([[Math.cos(a) * 14, Math.sin(a) * 14], [Math.cos(a + 0.3) * 32, Math.sin(a + 0.3) * 32]], { w: 1.8, col: '#7a3a14', a: 0.7, pass2: false }); }
    pop();
  }
  function jelly(x, y, s, t, seed) {                                 // медуза: полупрозрачный купол, бьющийся ритм
    const p = 1 + Math.sin(t * 3 + seed) * 0.1; push(x, y, s);
    glow(0, 0, 110, 'rgba(255,170,230,0.9)', 0.35);
    blob([[-50 * p, 10], [-46 * p, -22], [0, -46 / p], [46 * p, -22], [50 * p, 10], [0, 2]], { wash: '#f0c0f0', washA: 0.45, w: 2.4, col: '#ffe0ff', a: 0.8 });
    for (let i = -3; i <= 3; i++) line([[i * 14, 6], [i * 14 + Math.sin(t * 2 + i + seed) * 12, 60], [i * 12 + Math.sin(t * 2.4 + i) * 16, 120 + Math.abs(i) * -8]], { w: 1.4, col: '#d8f4ff', a: 0.6, pass2: false });
    pop();
  }
  function oldFish(x, y, s, t, fl, col = '#7a8a5a') {               // древняя панцирная рыба
    push(x, y, s, Math.sin(t * 5) * 0.05, fl); const tw = Math.sin(t * 9) * 10;
    blob([[-60, 0], [-40, -22], [10, -24], [50, -10], [64, -24 + tw], [62, 0], [66, 22 + tw], [48, 8], [10, 20], [-40, 18]], { wash: col, washA: 0.97, w: 2.4, col: '#121a10', shade: { gap: 6, a: 0.25, col: '#101808' } });
    shape([[-60, 0], [-40, -22], [-14, -22], [-10, 16], [-40, 18]], { wash: '#a8a070', washA: 0.9, w: 2, col: '#121a10' });   // панцирь головы
    for (const yy of [-12, 0, 10]) line([[-36, yy], [-16, yy + 2]], { w: 1.4, col: '#121a10', a: 0.6, pass2: false });
    ell(-42, -6, 6, 6, { wash: '#f4f0d8', washA: 1, w: 1.4 }); ctx.fillStyle = '#0a0a06'; ctx.beginPath(); ctx.arc(-43, -6, 2.8, 0, 6.3); ctx.fill();
    shape([[0, 16], [12, 36], [20, 14]], { wash: col, washA: 0.9, w: 1.8, col: '#121a10' });
    pop();
  }
  function caust(map, nu, nv, t, col, a, w) {                        // сетка каустик в произвольной проекции map(u,v) → [x,y]
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu * 3; i++) { const u = i / (nu * 3), v = (j + 0.32 * Math.sin(u * 19 + t * 1.7 + j) + 0.18 * Math.sin(u * 7 - t * 1.1 + j * 2)) / nv, p = map(u, v); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv * 3; j++) { const v = j / (nv * 3), u = (i + 0.32 * Math.sin(v * 17 + t * 1.5 + i) + 0.18 * Math.sin(v * 6 + t * 0.9 + i * 3)) / nu, p = map(u, v); j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.globalAlpha = a * 0.35; ctx.lineWidth = w * 3.2 / S; ctx.stroke(); ctx.globalAlpha = a * 0.6; ctx.lineWidth = w * 0.8 / S; ctx.stroke(); ctx.restore();
  }

  // ---------------------------------------------------------------- архитектура
  const RB = '#a2352a', RBD = '#5e1a14', WS = '#efe2c6', LN = '#24100a';
  function ruby(x, y, r, t) {                                        // рубиновая звезда: два тона граней + золотая рамка + свечение
    glow(x, y, r * 7, 'rgba(255,40,40,1)', 0.28 + 0.05 * Math.sin(t * 3)); glow(x, y, r * 2.6, 'rgba(255,90,80,1)', 0.6);
    const P = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; P.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    poly(P, { wash: '#e0202a', washA: 1, w: 3, col: '#f4c84a' });
    for (let i = 0; i < 10; i += 2) { const a = -Math.PI / 2 + i * Math.PI / 5, a2 = a + Math.PI / 5; shape([[x, y], [x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a2) * r * 0.42, y + Math.sin(a2) * r * 0.42]], { wash: '#8a0a14', washA: 0.6, line: false }); }
    glow(x - r * 0.2, y - r * 0.2, r * 0.6, 'rgba(255,220,200,1)', 0.7);
  }
  function spass(x, y, s, t, clock) {                                // Спасская башня: четверик с воротами, готический ярус с пинаклями, куранты, звонница, шатёр, звезда
    push(x, y, s);
    const b = rect(-80, -240, 160, 240, { wash: RB, washA: 1, w: 3, col: LN }); hatch(b.path, b.bb, { gap: 9, a: 0.22, col: RBD, ang: 1.25, key: 3 });
    ctx.save(); ctx.clip(b.path); ctx.strokeStyle = 'rgba(60,14,8,0.35)'; ctx.lineWidth = 1 / S; ctx.beginPath(); for (let yy = -236; yy < 0; yy += 9) { ctx.moveTo(-80, yy); ctx.lineTo(80, yy); } ctx.stroke(); ctx.restore();
    for (const xx of [-80, 80]) rect(xx - (xx < 0 ? 0 : 12), -240, 12, 240, { wash: WS, washA: 0.5, line: false });
    for (const yy of [-150, -238]) rect(-84, yy, 168, 10, { wash: WS, washA: 0.95, w: 1.6, col: LN });
    blob([[-30, 0], [-30, -70], [-16, -96], [0, -104], [16, -96], [30, -70], [30, 0]], { wash: '#1c0e0a', washA: 1, w: 2.6, col: LN });     // ворота
    glow(0, -30, 60, 'rgba(255,190,110,1)', 0.35); rect(-16, -136, 32, 28, { wash: '#2a1a14', washA: 1, w: 1.8, col: '#d8b060' });
    for (let k = -3; k <= 3; k++) blob([[k * 22 - 9, -240], [k * 22 - 8, -252], [k * 22, -258], [k * 22 + 8, -252], [k * 22 + 9, -240]], { wash: WS, washA: 0.95, w: 1.4, col: LN });   // машикули
    const g2 = rect(-70, -335, 140, 85, { wash: RB, washA: 1, w: 2.6, col: LN }); hatch(g2.path, g2.bb, { gap: 8, a: 0.2, col: RBD, ang: 1.25, key: 4 });   // готический ярус Головея
    for (let k = -1; k <= 1; k++) blob([[k * 40 - 13, -260], [k * 40 - 13, -300], [k * 40, -318], [k * 40 + 13, -300], [k * 40 + 13, -260]], { wash: WS, washA: 0.95, w: 1.8, col: LN });
    for (let k = -1; k <= 1; k++) blob([[k * 40 - 7, -262], [k * 40 - 7, -294], [k * 40, -304], [k * 40 + 7, -294], [k * 40 + 7, -262]], { wash: '#3a1a12', washA: 1, line: false });
    for (const xx of [-70, -24, 24, 70]) { poly([[xx - 7, -335], [xx, -386], [xx + 7, -335]], { wash: WS, washA: 1, w: 1.6, col: LN }); ell(xx, -388, 3.5, 3.5, { wash: '#f1c850', washA: 1, w: 1 }); }
    rect(-74, -340, 148, 9, { wash: WS, washA: 1, w: 1.4, col: LN });
    const g3 = rect(-58, -420, 116, 82, { wash: RB, washA: 1, w: 2.6, col: LN }); hatch(g3.path, g3.bb, { gap: 8, a: 0.2, col: RBD, ang: 1.25, key: 5 });   // ярус курантов
    ell(0, -380, 38, 38, { wash: '#14182a', washA: 1, w: 3.6, col: '#e6b84a' }); pencil(ellPts(0, -380, 31, 31, 0, 0.05, 40), { w: 1.4, col: '#e6b84a', pass2: false, gap: false });
    ctx.save(); ctx.fillStyle = '#f1cd5a'; for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283; ctx.fillRect(Math.cos(a) * 33 - 2, -380 + Math.sin(a) * 33 - 2, 4, 4); } ctx.restore();
    const a1 = -Math.PI / 2 + clock * 0.9 + t * 0.02, a2 = -Math.PI / 2 + clock * 0.075 + 1.6;
    line([[0, -380], [Math.cos(a2) * 18, -380 + Math.sin(a2) * 18]], { w: 4.4, col: '#f1cd5a', pass2: false, smooth: false }); line([[0, -380], [Math.cos(a1) * 28, -380 + Math.sin(a1) * 28]], { w: 2.8, col: '#f1cd5a', pass2: false, smooth: false });
    if (clock > 1) glow(0, -380, 70, 'rgba(255,214,120,1)', clamp(clock / 30) * 0.6);
    rect(-62, -424, 124, 8, { wash: WS, washA: 1, w: 1.4, col: LN });
    rect(-46, -468, 92, 46, { wash: WS, washA: 0.98, w: 2.2, col: LN });                                             // звонница с арками
    for (let k = -1; k <= 1; k++) blob([[k * 28 - 9, -426], [k * 28 - 9, -452], [k * 28, -462], [k * 28 + 9, -452], [k * 28 + 9, -426]], { wash: '#2a1a14', washA: 1, w: 1.4, col: LN });
    glow(0, -444, 50, 'rgba(255,200,130,1)', 0.3);
    const tent = poly([[-44, -468], [44, -468], [7, -588], [-7, -588]], { wash: '#2f5a42', washA: 1, w: 2.6, col: LN }); hatch(tent.path, tent.bb, { gap: 6, a: 0.35, col: '#0e2418', ang: 1.0, key: 6 });   // шатёр
    for (const f of [-0.5, 0, 0.5]) line([[f * 88, -468], [f * 14, -588]], { w: 2, col: WS, a: 0.9, pass2: false, smooth: false });
    for (const [yy, w] of [[-500, 30], [-540, 20]]) for (const sd of [-1, 1]) blob([[sd * w - 6, yy], [sd * w - 6, yy - 12], [sd * w, yy - 18], [sd * w + 6, yy - 12], [sd * w + 6, yy]], { wash: WS, washA: 1, w: 1.2, col: LN });
    line([[0, -588], [0, -614]], { w: 4, col: '#e6b84a', pass2: false }); ell(0, -606, 6, 6, { wash: '#f1cd5a', washA: 1, w: 1.4 });
    ruby(0, -640, 28, t);
    pop();
  }
  function onion(x, y, w, h, c1, c2, kind, t) {                      // луковичная глава собора Покрова на барабане
    const P = spline([[-w * 0.5, 0], [-w * 0.72, -h * 0.34], [-w * 0.42, -h * 0.72], [0, -h], [w * 0.42, -h * 0.72], [w * 0.72, -h * 0.34], [w * 0.5, 0]], false, 6); P.push([w * 0.5, 0]);
    push(x, y, 1); const p = pathOf(P); wash(p, c1, 1);
    ctx.save(); ctx.clip(p); ctx.fillStyle = c2;
    if (kind === 'spiral') for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(k * w * 0.3, 4); ctx.lineTo(k * w * 0.3 + w * 0.15, 4); ctx.lineTo(k * w * 0.3 + w * 0.15 + w * 0.9, -h - 4); ctx.lineTo(k * w * 0.3 + w * 0.9, -h - 4); ctx.fill(); }
    if (kind === 'zig') for (let yy = -h; yy < 0; yy += h * 0.16) { ctx.beginPath(); for (let xx = -w; xx <= w; xx += w * 0.2) ctx.lineTo(xx, yy + ((xx / (w * 0.2)) % 2 ? h * 0.07 : 0)); ctx.lineTo(w, yy + h * 0.05); ctx.lineTo(-w, yy + h * 0.05); ctx.fill(); }
    if (kind === 'facet') for (let yy = -h; yy < 0; yy += h * 0.14) for (let xx = -w; xx < w; xx += w * 0.22) { if ((Math.round(yy / (h * 0.14)) + Math.round(xx / (w * 0.22))) % 2) continue; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + w * 0.11, yy - h * 0.07); ctx.lineTo(xx + w * 0.22, yy); ctx.lineTo(xx + w * 0.11, yy + h * 0.07); ctx.fill(); }
    if (kind === 'stripe') for (let k = -5; k <= 5; k += 2) { ctx.beginPath(); ctx.moveTo(k * w * 0.12, 0); ctx.quadraticCurveTo(k * w * 0.3, -h * 0.4, 0, -h); ctx.quadraticCurveTo((k + 1) * w * 0.3, -h * 0.4, (k + 1) * w * 0.12, 0); ctx.fill(); }
    const g = ctx.createLinearGradient(-w, 0, w, 0); g.addColorStop(0, 'rgba(0,0,0,0.35)'); g.addColorStop(0.55, 'rgba(255,255,255,0.12)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(-w, -h, w * 2, h);
    ctx.restore(); pencil(P, { w: 2.2, col: LN, pass2: false });
    line([[0, -h], [0, -h - h * 0.45]], { w: 2.6, col: '#f1cd5a', pass2: false, smooth: false }); line([[-h * 0.1, -h - h * 0.3], [h * 0.1, -h - h * 0.3]], { w: 2.2, col: '#f1cd5a', pass2: false, smooth: false });
    pop();
  }
  function drum(x, y, w, h, col) { rect(x - w / 2, y - h, w, h, { wash: col, washA: 1, w: 2, col: LN }); for (let k = 0; k < 4; k++) blob([[x - w / 2 + k * w / 4, y - h], [x - w / 2 + k * w / 4 + w / 8, y - h - 10], [x - w / 2 + (k + 1) * w / 4, y - h]], { wash: WS, washA: 0.9, w: 1, col: LN }); }
  function basil(x, y, s, t) {                                       // собор Василия Блаженного: центральный шатёр + главы-узоры
    push(x, y, s);
    const base = rect(-170, -120, 340, 120, { wash: '#a8402e', washA: 1, w: 2.6, col: LN }); hatch(base.path, base.bb, { gap: 8, a: 0.2, col: RBD, key: 9 });
    for (let k = -4; k <= 4; k++) blob([[k * 38 - 12, -40], [k * 38 - 12, -76], [k * 38, -90], [k * 38 + 12, -76], [k * 38 + 12, -40]], { wash: WS, washA: 0.9, w: 1.4, col: LN });
    for (let k = -4; k <= 4; k++) { ctx.fillStyle = 'rgba(255,200,120,0.85)'; ctx.fillRect(k * 38 - 5, -72, 10, 26); }
    const ct = rect(-34, -300, 68, 180, { wash: '#b84a32', washA: 1, w: 2.4, col: LN });                       // центральный столп
    for (let yy = -280; yy < -130; yy += 34) for (let k = -1; k <= 1; k++) poly([[k * 20 - 8, yy + 12], [k * 20, yy], [k * 20 + 8, yy + 12]], { wash: WS, washA: 0.9, w: 1, col: LN });
    const tp = poly([[-34, -300], [34, -300], [6, -440], [-6, -440]], { wash: '#c8603a', washA: 1, w: 2.4, col: LN });
    ctx.save(); ctx.clip(tp.path); ctx.fillStyle = '#f0d8a0'; for (let yy = -440; yy < -300; yy += 16) for (let xx = -40; xx < 40; xx += 16) { ctx.beginPath(); ctx.moveTo(xx + ((yy / 16) % 2 ? 8 : 0), yy); ctx.lineTo(xx + 5 + ((yy / 16) % 2 ? 8 : 0), yy + 7); ctx.lineTo(xx + ((yy / 16) % 2 ? 8 : 0), yy + 14); ctx.lineTo(xx - 5 + ((yy / 16) % 2 ? 8 : 0), yy + 7); ctx.fill(); } ctx.restore();
    onion(0, -440, 22, 34, '#e8b840', '#c88a20', 'facet', t);
    drum(-118, -120, 40, 70, '#c8b48a'); onion(-118, -190, 58, 70, '#2a8a4a', '#e8c040', 'spiral', t);         // зелёно-жёлтая спираль
    drum(118, -120, 40, 80, '#c8b48a'); onion(118, -200, 60, 74, '#e8e2d0', '#c8302a', 'spiral', t);          // красно-белая спираль
    drum(-62, -150, 34, 80, '#b84a32'); onion(-62, -230, 50, 62, '#2a5aa8', '#f0ece0', 'zig', t);              // сине-белые зигзаги
    drum(64, -150, 34, 86, '#b84a32'); onion(64, -236, 52, 64, '#d8a030', '#2a7a4a', 'facet', t);              // «ананас»
    drum(-160, -110, 26, 40, '#c8b48a'); onion(-160, -150, 36, 44, '#c8302a', '#2a8a4a', 'stripe', t);
    drum(160, -110, 26, 44, '#c8b48a'); onion(160, -154, 36, 44, '#3a8aa8', '#e8c040', 'stripe', t);
    pop();
  }
  const gumP = (s, v) => { const z = 1 + s * 2.6, X = VPX + (-300 - VPX) / z, T = VPY + (600 - VPY) / z, B = VPY + (1500 - VPY) / z; return [X, lerp(T, B, v)]; };
  function gum(t) {                                                   // ГУМ: фасад в перспективе, арки, башенки, гирлянды огней
    const N = 26, top = [], bot = []; for (let i = 0; i <= N; i++) { top.push(gumP(i / N, 0)); bot.push(gumP(i / N, 1)); }
    const fac = pathOf(top.concat(bot.slice().reverse())); wash(fac, '#c8b092', 1);
    { const [x0] = gumP(0, 0), [x1] = gumP(1, 0); const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, 'rgba(40,30,50,0.55)'); g.addColorStop(1, 'rgba(40,30,60,0.15)'); ctx.save(); ctx.fillStyle = g; ctx.fill(fac); ctx.restore(); }
    hatch(fac, bbOf(top.concat(bot)), { gap: 10, a: 0.16, col: '#3a2a20', ang: 1.3, key: 11 });
    for (let i = 0; i < N; i++) {                                   // окна-арки трёх этажей
      for (const [v0, v1] of [[0.18, 0.36], [0.44, 0.62], [0.7, 0.94]]) { const a = gumP((i + 0.22) / N, v0), b = gumP((i + 0.78) / N, v0), c = gumP((i + 0.78) / N, v1), d = gumP((i + 0.22) / N, v1);
        const on = (i * 7 + v0 * 10) % 5 > 1.4; ctx.save(); ctx.globalAlpha = on ? 0.95 : 0.7; ctx.fillStyle = on ? '#ffd890' : '#3a2e3a'; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo((a[0] + b[0]) / 2, a[1] - (c[1] - b[1]) * 0.25, ...b); ctx.lineTo(...c); ctx.lineTo(...d); ctx.closePath(); ctx.fill(); ctx.restore(); }
      if (i % 5 === 2) { const p = gumP((i + 0.5) / N, 0), q = gumP((i + 0.5) / N, -0.12), w = (gumP((i + 1) / N, 0)[0] - gumP(i / N, 0)[0]) * 0.5;  // башенки на крыше
        poly([[p[0] - w, p[1]], [q[0], q[1] - w * 1.6], [p[0] + w, p[1]]], { wash: '#5a7a6a', washA: 1, w: 1.8, col: LN }); }
    }
    { const p = gumP(0.12, 1), q = gumP(0.12, 0.3), w = 46; blob([[p[0] - w, p[1]], [p[0] - w, q[1] + 20], [q[0], q[1] - 30], [p[0] + w, q[1] + 20], [p[0] + w, p[1]]], { wash: '#2a1a1a', washA: 1, w: 2.4, col: LN }); glow(p[0], p[1] - 60, 120, 'rgba(255,200,120,1)', 0.5); }   // главный вход
    pencil(top, { w: 3, col: LN }); pencil(bot, { w: 3, col: LN });
    ctx.save(); ctx.globalCompositeOperation = 'lighter';                // гирлянды: точки-лампы по карнизам
    for (const v of [0, 0.4, 0.66]) for (let i = 0; i < 90; i++) { const [x, y] = gumP(i / 90, v - 0.01), z = 1 + (i / 90) * 2.6, r = 4.4 / z + 1; const on = 0.7 + 0.3 * Math.sin(t * 6 + i * 0.7); ctx.globalAlpha = on; ctx.fillStyle = '#fff2c0'; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill(); ctx.globalAlpha = on * 0.25; ctx.beginPath(); ctx.arc(x, y, r * 4, 0, 6.3); ctx.fill(); }
    ctx.restore();
    { const [x, y] = gumP(0.12, 0.2); rect(x - 70, y - 30, 140, 56, { wash: '#1a1414', washA: 0.95, w: 2, col: '#f1cd5a' }); txt('ГУМ', x, y - 6, 34, { col: '#ffd890', font: 'Osw' }); txt('−90%', x, y + 17, 18, { col: '#ff6a5a', font: 'Osw' }); }
  }
  const wallP = (s, v) => { const z = 1.6 + s * 1.8, X = VPX + (1500 - VPX) / z, T = VPY + (960 - VPY) / z, B = VPY + (1500 - VPY) / z; return [X, lerp(T, B, v)]; };
  function kwall(t) {                                                 // кремлёвская стена в перспективе с «ласточкиными хвостами»
    const N = 40, top = [], bot = []; for (let i = 0; i <= N; i++) { top.push(wallP(i / N, 0)); bot.push(wallP(i / N, 1)); }
    const p = pathOf(top.concat(bot.slice().reverse())); wash(p, RB, 1); hatch(p, bbOf(top.concat(bot)), { gap: 8, a: 0.22, col: RBD, ang: 1.2, key: 12 });
    { const g = ctx.createLinearGradient(0, top[N][1], 0, bot[0][1]); g.addColorStop(0, 'rgba(255,170,120,0.0)'); g.addColorStop(1, 'rgba(255,180,110,0.35)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fill(p); ctx.restore(); }   // подсветка снизу
    ctx.save(); ctx.clip(p); ctx.strokeStyle = 'rgba(50,10,6,0.3)'; ctx.lineWidth = 1 / S; ctx.beginPath(); for (let v = 0.06; v < 1; v += 0.06) { const a = wallP(0, v), b = wallP(1, v); ctx.moveTo(...a); ctx.lineTo(...b); } ctx.stroke(); ctx.restore();
    const M = 30; for (let i = 0; i < M; i++) { const s0 = i / M, s1 = (i + 0.72) / M, a = wallP(s0, 0), b = wallP(s1, 0), h = (bot[0][1] - top[0][1]) * 0.22 * (wallP(s0, 1)[1] - a[1]) / (bot[0][1] - top[0][1]);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; poly([[a[0], a[1]], [a[0], a[1] - h], [mx, my - h * 0.55], [b[0], b[1] - h], [b[0], b[1]]], { wash: RB, washA: 1, w: 1.8, col: LN }); }
    pencil(bot, { w: 3, col: LN });
    { const [x, y] = wallP(0.32, 1), [, yt] = wallP(0.32, 0), h = y - yt; push(x, y, h / 300);                // Сенатская башня
      const st = rect(-70, -400, 140, 400, { wash: RB, washA: 1, w: 3, col: LN }); hatch(st.path, st.bb, { gap: 8, a: 0.22, col: RBD, key: 13 }); rect(-76, -410, 152, 14, { wash: WS, washA: 1, w: 1.6, col: LN });
      poly([[-60, -410], [60, -410], [8, -560], [-8, -560]], { wash: '#2f5a42', washA: 1, w: 2.4, col: LN }); line([[0, -560], [0, -600]], { w: 4, col: '#e6b84a', pass2: false }); pop(); }
  }
  function lamp(x, y, s, t) {                                         // фонарь Красной площади
    push(x, y, s); rect(-6, -320, 12, 320, { wash: '#1a1a20', washA: 1, w: 2, col: '#050508' }); rect(-18, -20, 36, 20, { wash: '#1a1a20', washA: 1, w: 1.6 });
    for (const sd of [-1, 1]) { line([[0, -280], [sd * 40, -300], [sd * 50, -320]], { w: 4, col: '#1a1a20', pass2: false }); ell(sd * 50, -336, 13, 18, { wash: '#fff0c0', washA: 1, w: 2, col: '#1a1a20' }); glow(sd * 50, -336, 90, 'rgba(255,220,150,1)', 0.55); }
    ell(0, -350, 14, 20, { wash: '#fff0c0', washA: 1, w: 2, col: '#1a1a20' }); glow(0, -350, 100, 'rgba(255,220,150,1)', 0.6); pop();
  }
  function person(x, y, h, col, ph, t, seed) {                         // прохожий-силуэт; ph — снимает море на телефон
    const r = rng(seed); sil([[x - h * 0.13, y], [x - h * 0.15, y - h * 0.6], [x - h * 0.08, y - h * 0.74], [x + h * 0.08, y - h * 0.74], [x + h * 0.15, y - h * 0.6], [x + h * 0.13, y]], col, 0.96);
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - h * 0.84, h * 0.1, 0, 6.3); ctx.fill();
    if (ph) { const hx = x + h * 0.12, hy = y - h * 1.02 + Math.sin(t * 2 + seed) * 2; pencil([[x + h * 0.1, y - h * 0.66], [hx, hy]], { w: Math.max(2, h * 0.05), col, pass2: false, gap: false }); ctx.fillStyle = '#d8f4ff'; ctx.fillRect(hx - h * 0.04, hy - h * 0.08, h * 0.08, h * 0.12); glow(hx, hy, h * 0.3, 'rgba(180,230,255,1)', 0.55); }
  }

  // ---------------------------------------------------------------- мир
  WORLD.square = (t, u, cat) => {
    const cb = ceilBase(t);
    lay(30, () => {                                                  // небо синего часа под толщей воды
      vgrad(400, 1400, ['#0b1c3a', '#1c2f5e', '#3c3f78', '#8a5a7a', '#e09a72']);
      glow(560, 1220, 600, 'rgba(255,170,110,1)', 0.35);
      ctx.save(); ctx.fillStyle = '#fff6e0'; const r = rng(5); for (let i = 0; i < 40; i++) { ctx.globalAlpha = 0.4 + 0.4 * Math.sin(t * 2 + i); ctx.fillRect(r() * W, 640 + r() * 300, 2, 2); } ctx.restore();
    });
    lay(9, () => {                                                   // дальние башни Кремля и город
      const r = rng(41); for (let k = 0; k < 9; k++) { const x = 640 + k * 70 + r() * 30, top = 1080 + r() * 60; sil([[x, 1260], [x, top], [x + 30, top], [x + 30, 1260]], '#2a2440', 1); sil([[x - 4, top], [x + 15, top - 70 - r() * 30], [x + 34, top]], '#22203a', 1); }
      for (let k = 0; k < 14; k++) { const x = 340 + k * 26, top = 1150 + r() * 50; sil([[x, 1260], [x, top], [x + 22, top], [x + 22, 1260]], '#2e2848', 0.9); windows(x + 2, top + 6, 18, 80, 2, 6, k, 0.5, '#ffcf7a', '#ffcf7a', 0.6); }
    });
    haze('#2a3a6a', 0.12);
    lay(4.2, () => {                                                 // ВОДА: толща моря, висящая над Кремлём
      const edge = []; for (let x = -1400; x <= W + 1400; x += 24) edge.push([x, ceilY(x, t)]);
      const body = pathOf([[-1400, -2600], [W + 1400, -2600]].concat(edge.slice().reverse()));
      ctx.save(); const g = ctx.createLinearGradient(0, -1400, 0, cb + 30); g.addColorStop(0, '#3a9aa8'); g.addColorStop(0.35, '#165068'); g.addColorStop(0.62, '#0a2a40'); g.addColorStop(0.86, '#0e3a54'); g.addColorStop(1, '#2a7a8e'); ctx.fillStyle = g; ctx.fill(body); ctx.restore();
      ctx.save(); ctx.clip(body);
      rays(560, -900, Math.PI / 2, 1.1, 1700, 'rgba(170,240,255,0.55)', 0.22, 9, t);
      const r = rng(7); ctx.fillStyle = '#06182a'; for (let i = 0; i < 26; i++) { const x = ((r() * 1800 + t * (30 + r() * 40)) % 1800) - 360, y = -200 + r() * 600; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.ellipse(x, y, 14, 5, 0, 0, 6.3); ctx.moveTo(x - 14, y); ctx.lineTo(x - 22, y - 5); ctx.lineTo(x - 22, y + 5); ctx.fill(); }   // косяк рыбок
      ctx.globalAlpha = 1;
      jelly(150 + Math.sin(t * 0.5) * 30, 300 - u * 12, 0.9, t, 1); jelly(930, 230 - u * 8, 0.7, t, 2); jelly(420, 80 - u * 10, 0.55, t, 3);
      gonia(-80 + u * 70, cb - 150 + Math.sin(t * 1.2) * 10, 0.85, t, 1); gonia(1150 - u * 60, cb - 230, 0.6, t, 2);
      stetha(-520 + u * 300, cb - 170 + Math.sin(u * 1.4) * 18, 1.55, t, -1);                 // акула идёт слева направо над стеной
      stetha(820 - u * 210, cb - 330 + Math.sin(u * 2) * 10, 0.8, t + 2, 1); oldFish(1180 - u * 150, cb - 60, 0.7, t, 1); oldFish(1320 - u * 170, cb - 110, 0.55, t + 1, 1, '#6a7a8a');
      for (let i = 0; i < 40; i++) { const rr = rng(i * 13 + 5), x = rr() * W, ph = (t * (0.15 + rr() * 0.2) + rr()) % 1, y = cb - 10 - ph * 900; ctx.strokeStyle = 'rgba(220,250,255,0.7)'; ctx.lineWidth = 1.6 / S; ctx.beginPath(); ctx.arc(x + Math.sin(t * 3 + i) * 6, y, 2 + rr() * 6, 0, 6.3); ctx.stroke(); }   // пузыри
      caust((uu, vv) => [lerp(-500, W + 500, uu), cb - 260 + vv * 290], 14, 3, t, '#9fefff', 0.2, 3);
      { const g2 = ctx.createLinearGradient(0, cb - 60, 0, cb + 30); g2.addColorStop(0, 'rgba(120,230,255,0)'); g2.addColorStop(1, 'rgba(170,250,255,0.55)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g2; ctx.fillRect(-1400, cb - 60, W + 2800, 120); }
      { const tx = 778, gr = ctx.createRadialGradient(tx, cb + 20, 10, tx, cb + 20, 260); gr.addColorStop(0, 'rgba(255,60,60,0.55)'); gr.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = gr; ctx.fillRect(tx - 260, cb - 240, 520, 300); }   // звезда подсвечивает воду
      ctx.restore();
      pencil(edge, { w: 4, col: '#c8f6ff', a: 0.8, pass2: false, gap: false }); pencil(edge.map(([x, y]) => [x, y - 10]), { w: 2, col: '#5fc8e0', a: 0.6, pass2: false, gap: false }); glow(560, cb, 700, 'rgba(120,220,255,1)', 0.12);
      for (let i = 0; i < 18; i++) { const x = -200 + i * 90 + (i * 37 % 40), ph = (t * 0.9 + i * 0.29) % 1, y0 = ceilY(x, t);    // капли отрываются от «потолка»
        ell(x, y0 + 6, 6, 9 + ph * 6, { wash: '#bff0ff', washA: 0.9, w: 1.4, col: '#e8fcff' }); if (ph > 0.3) { const yy = y0 + (ph - 0.3) * 900; ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = '#d8f8ff'; ctx.beginPath(); ctx.ellipse(x, yy, 3, 9, 0, 0, 6.3); ctx.fill(); ctx.restore(); } }
      const rip = clamp((t - EV.sq_touch) / 1.4); if (rip > 0 && rip < 1) for (let k = 0; k < 3; k++) { const q = clamp(rip - k * 0.15); if (q > 0) pencil(ellPts(778, ceilY(778, t) + 4, 30 + q * 380, 6 + q * 40, 0, 0, 60), { w: 3, col: '#e8fcff', a: 0.8 * (1 - q), pass2: false, gap: false }); }
    });
    lay(4, () => {                                                   // Кремль, собор, ГУМ, брусчатка
      const pv = pathOf([[-1400, 1240], [W + 1400, 1240], [W + 1400, 2700], [-1400, 2700]]);
      { const g = ctx.createLinearGradient(0, 1240, 0, 2100); g.addColorStop(0, '#4a4658'); g.addColorStop(0.3, '#34323e'); g.addColorStop(1, '#22202a'); ctx.save(); ctx.fillStyle = g; ctx.fill(pv); ctx.restore(); }
      ctx.save(); ctx.strokeStyle = 'rgba(10,8,14,0.55)'; ctx.lineWidth = 1.4 / S; ctx.beginPath();          // брусчатка: ряды + швы в перспективе
      let zp = 9; for (let z = 9; z > 0.3; z *= 0.9) { const y = VPY + 310 / z, y2 = VPY + 310 / zp; ctx.moveTo(-1400, y); ctx.lineTo(W + 1400, y); const off = (Math.round(Math.log(z) / Math.log(0.9)) % 2) * 0.5; for (let wx = -14 + off * 0.35; wx < 14; wx += 0.35) { const x = VPX + wx * 310 / z, x2 = VPX + wx * 310 / zp; if (x < -1400 || x > W + 1400) continue; ctx.moveTo(x, y); ctx.lineTo(x2, y2); } zp = z; }
      ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'lighter';         // мокрая брусчатка: отражения звезды и гирлянд
      for (const [x, c, w_] of [[778, 'rgba(255,60,60,0.5)', 60], [200, 'rgba(255,220,150,0.35)', 160], [960, 'rgba(255,200,140,0.35)', 120]]) { const g = ctx.createLinearGradient(0, 1250, 0, 1700); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - w_ / 2, 1250, w_, 450); }
      ctx.restore();
      caust((uu, vv) => { const z = lerp(0.5, 6, Math.pow(vv, 1.6)), wx = lerp(-7, 7, uu); return [VPX + wx * 310 / z, VPY + 310 / z]; }, 18, 9, t, '#7fe8ff', 0.28, 2.6);
      basil(470, 1272, 0.86, t);
      kwall(t);
      spass(778, 1281, 1, t, t > EV.sq_glow - 0.6 ? -Math.pow(t - EV.sq_glow + 0.6, 2) * 14 : 0);
      { const edge = []; for (let x = 560; x <= 1000; x += 20) edge.push([x, ceilY(x, t) + 4]); const sub = pathOf([[560, 300], [1000, 300]].concat(edge.slice().reverse()));   // верх Спасской уходит под воду
        ctx.save(); ctx.clip(sub); ctx.fillStyle = 'rgba(16,80,110,0.55)'; ctx.fillRect(560, 300, 440, 500); caust((uu, vv) => [lerp(600, 960, uu), lerp(520, 760, vv)], 5, 3, t, '#bff6ff', 0.35, 2); glow(778, 641, 120, 'rgba(255,60,60,1)', 0.5); ctx.restore(); }
      gum(t);
      lamp(gumP(0.25, 1)[0] + 120, gumP(0.25, 1)[1] + 60, 0.9 / 1.65, t); lamp(gumP(0.6, 1)[0] + 90, gumP(0.6, 1)[1] + 30, 0.9 / 2.56, t);
      caust((uu, vv) => wallP(uu, vv), 14, 3, t + 3, '#7fe8ff', 0.22, 2);
      caust((uu, vv) => gumP(uu, vv), 14, 4, t + 5, '#7fe8ff', 0.18, 2);
    });
    haze('#1a3050', 0.06);
    lay(2.4, () => {                                                 // туристы снимают море на телефоны; капли
      const r = rng(19); for (let k = 0; k < 18; k++) { const x = 120 + k * 52 + r() * 30, y = 1300 + r() * 40, h = 70 + r() * 22; if (x > 380 && x < 520) continue; person(x, y, h, ['#1a1828', '#241e30', '#16141e'][k % 3], r() < 0.55, t, k); }
      for (let i = 0; i < 26; i++) { const rr = rng(i * 7 + 1), x = rr() * W, ph = (t * (0.8 + rr() * 0.5) + rr()) % 1, y = 600 + ph * 760; ctx.save(); ctx.globalAlpha = 0.6 * (1 - ph * 0.5); ctx.strokeStyle = '#d8f8ff'; ctx.lineWidth = 2 / S; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26); ctx.stroke(); ctx.restore();
        if (ph > 0.9) pencil(ellPts(x, 1360 + rr() * 60, 10 + (ph - 0.9) * 200, 3 + (ph - 0.9) * 40, 0, 0, 20), { w: 1.6, col: '#d8f8ff', a: 0.7, pass2: false, gap: false }); }
    });
    lay(1, () => {
      { const g = ctx.createRadialGradient(330, 1480, 30, 330, 1480, 420); g.addColorStop(0, 'rgba(120,230,255,0.22)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(-100, 1100, 900, 800); ctx.restore(); }
      cat();
      const fb = clamp((t - EV.sq_fish + 0.8) / 1.5);                // пузырь-капля моря с рыбой проплывает у головы Тома
      if (fb > 0 && fb < 1) { const x = lerp(980, -260, fb), y = 1020 + Math.sin(fb * 7) * 26 - Math.sin(fb * Math.PI) * 40, R = 115;
        push(x, y, 1, Math.sin(t * 2) * 0.1); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R * (1 + Math.sin(t * 9) * 0.04), R * (1 - Math.sin(t * 9) * 0.04), 0, 0, 6.3); ctx.fillStyle = 'rgba(60,170,200,0.35)'; ctx.fill(); ctx.clip();
        caust((uu, vv) => [lerp(-R, R, uu), lerp(-R, R, vv)], 4, 4, t, '#c8f8ff', 0.5, 2); ctx.restore();
        oldFish(0, 6, 1.3, t, 1, '#c8a050'); pencil(ellPts(0, 0, R, R, 0, 0.05, 50), { w: 3.4, col: '#e8fcff', a: 0.9, pass2: false, gap: false });
        ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 5 / S; ctx.beginPath(); ctx.arc(-R * 0.1, -R * 0.1, R * 0.72, -2.6, -1.8); ctx.stroke(); ctx.restore();
        for (let i = 0; i < 6; i++) { const ph = (t * 1.5 + i / 6) % 1; ctx.strokeStyle = 'rgba(220,250,255,0.8)'; ctx.lineWidth = 1.6 / S; ctx.beginPath(); ctx.arc(R + 20 + ph * 140, Math.sin(i * 2) * 30 - ph * 40, 3 + i, 0, 6.3); ctx.stroke(); }
        pop(); }
    });
    lay(0.85, () => {                                                // передний план: ограждение с табличкой, фонарь, капли
      push(1240, 1600, 1, -0.03);
      for (const x of [-240, 0, 240]) rect(x - 8, -250, 16, 270, { wash: '#8a8e96', washA: 1, w: 2.2, col: '#1a1c22' });
      for (const y of [-240, -40]) rect(-260, y, 520, 14, { wash: '#9a9ea6', washA: 1, w: 2, col: '#1a1c22' });
      for (let x = -240; x < 240; x += 28) line([[x, -226], [x, -40]], { w: 3, col: '#5a5e66', pass2: false, smooth: false });
      push(-150, -300, 1, 0.05 + Math.sin(t * 2) * 0.03); rect(-150, -60, 300, 120, { wash: '#f4f0e6', washA: 1, w: 3, col: '#1a1c22' }); rect(-140, -50, 280, 100, { wash: '#f4f0e6', washA: 1, w: 2, col: '#c8302a' });
      txt('КУПАНИЕ', 0, -16, 44, { col: '#c8302a', font: 'Osw' }); txt('ЗАПРЕЩЕНО', 0, 28, 40, { col: '#c8302a', font: 'Osw' }); pop();
      pop();
      motes(30, [0, 500, W, 1800], '#d8f8ff', t, 3, { sp: 260, sz: 2.2, a: 0.55, stretch: 4 });
    });
  };

  // ---------------------------------------------------------------- режиссура
  const TS = 1.1, TX = 270, TY = 1482;
  DIR.square = {
    outfit: 'pufferM', light: { side: 1, rim: '#8fe8ff' }, grade: ['#0a3050', 0.22],
    act: () => [[0, 'shock'], [EV.sq_more, 'awe'], [EV.sq_fish - 0.12, 'scared'], [EV.sq_point - 0.05, 'shock'], [EV.sq_touch, 'awe'], [LS('h2') - 0.05, 'smug'], [wt('h2', 'веришь') + 0.2, 'sideeye'], [EV.sq_watch, 'grin'], [EV.sq_glow + 0.15, 'awe']],
    pose: (t, u, b) => {
      const jump = u < 0.5 ? Math.sin(u / 0.5 * Math.PI) * 70 : 0, rec = env(t, EV.sq_fish - 0.12, EV.sq_fish + 0.5, 0.12);
      const pt = t > EV.sq_point && t < LS('h2') - 0.1, w = t > EV.sq_watch;
      return Object.assign(b, { x: TX - rec * 26, y: TY - jump, s: TS, rot: -rec * 0.14 + (pt ? 0.03 : 0), squash: u < 0.28 ? 0.45 * (1 - u / 0.28) : b.squash,
        look: t < EV.sq_more ? [0.1, -0.15] : t < EV.sq_fish + 0.4 ? (rec > 0.1 ? [0.8, -0.2] : [0.35, -1]) : pt ? [0.6, -1] : t < LS('h2') ? [0.4, -0.8] : w ? [0.35, 0.25] : [-0.1, 0.05],
        point: pt, hand: pt ? [128, -330] : w ? [96, -246] : rec > 0.1 ? [70, -270] : t < EV.sq_more ? [86, -206] : undefined,
        handF: t < EV.sq_more ? [-90, -230 - jump * 0.6] : rec > 0.1 ? [-70, -280] : undefined,
        watchInHand: w, glow: clamp((t - EV.sq_watch - 0.3) / 0.9), spin: t > EV.sq_glow - 0.3 ? (t - EV.sq_glow + 0.3) * 2.2 : 0, tilt: t > LS('h2') && !w ? 0.08 : 0, tailUp: rec > 0.1 || u < 0.6 });
    },
    cam: () => [[0, 310, 985, 0.54], [0.45, 305, 1000, 0.44, 'x'], [EV.sq_more, 330, 1000, 0.36], [EV.sq_more + 0.45, 560, 830, -0.3, 'x'], [EV.sq_point + 0.5, 640, 860, -0.2], [EV.sq_touch + 0.4, 700, 840, -0.1],
      [LS('h2') - 0.05, 660, 870, -0.14], [LS('h2') + 0.4, 330, 1060, 0.3, 'x'], [EV.sq_watch, 340, 1080, 0.33], [EV.sq_glow, 360, 1100, 0.4], [S1.square, 375, 1110, 0.48]],
    afterCat: (t, u, P) => { if (P.watchInHand && P.glow > 0.05) { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 420 + P.glow * 300, 'rgba(255,214,140,0.7)', 0.35 * P.glow, 12, t * 3); glow(wx, wy, 160, 'rgba(255,220,150,1)', 0.6 * P.glow); } }
  };

  // ---------------------------------------------------------------- переход в туннель: портал распахивается из циферблата в лапе
  const watchScreen = tA => { const P = catPose('square', tA, tA - S0.square), c = camFor('square', tA), d = 1 - c.z;
    const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; return [540 + (wx - c.x) / d, 960 + (wy - c.y) / d, P.s * 28 / d]; };
  TRANS_IN.tunnel = { a: 0.5, b: 0.3, fx(k, t, A, B) {
    const [cx, cy, r0] = watchScreen(Math.min(t, S0.tunnel - 0.001)), q = sm(k), R = r0 * 0.9 + Math.pow(q, 1.7) * 1650;
    drawBuf(A, 1 + q * 0.12, cx, cy, 1, null, 0, 0, -q * 0.15);
    inCircle(cx, cy, R, () => drawBuf(B, 1.6 - 0.6 * q, cx, cy, 1, null, 0, 0, (1 - q) * 1.2));
    ringFX(cx, cy, R, t, ['#ffd890', '#f1d27a', '#c99636'], clamp(1.5 - k));
    scr(() => { const r = rng(hsh(FRAME, 17)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { const a = r() * 6.283, d0 = R * (0.9 + r() * 0.2), d1 = d0 + 80 + r() * 260; ctx.strokeStyle = 'rgba(255,220,150,0.6)'; ctx.globalAlpha = clamp(1.3 - k); ctx.lineWidth = 2 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - t * 2; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.12, cy + Math.sin(a) * R * 1.12, 26 + R * 0.04, { col: '#ffe9b8', font: 'Osw', a: clamp(1.2 - k) }); } });
  } };
})();
