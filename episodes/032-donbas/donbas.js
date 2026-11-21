/* 032 Донбасс — общие детали: палитра «угольный графит, охра степи, ковыль, медь жетона, закатный янтарь, ночной синий»,
   терриконы, копёр шахты с колёсами, панельные пятиэтажки, подсолнухи, курганы и каменные бабы, вагонетки, рельсы.
   Сквозная нить — латунный шахтёрский жетон-номерок «ХОЗЯИН: …» (табельная доска хозяев). Глобус по смыслу: Европа,
   подсвечена Украина, «?» над Донбассом, наезд точно в Донецкую и Луганскую области (Донецк, Луганск, Мариуполь, Азовское море,
   граница с Россией). Карты: заселение XVIII в., граница 1924, 2014 и «аннексия» 2022 — без линии фронта. Отмотка 032 — клеть в ствол шахты. */
const DB = { ink: '#14100c', coal: '#26262c', coalL: '#4a4a54', coalD: '#0e0e12', ochre: '#d8b070', ochreD: '#8a6a38', grass: '#b8a858', grassD: '#6a6a2a',
  brass: '#d8a848', brassL: '#ffe08a', brassD: '#7a5418', sky: '#6aa0d0', amber: '#f0a040', rust: '#a8482a', red: '#c8281e', brick: '#a8583a', panel: '#c8c0b0', panelD: '#8a8478',
  sun: '#f8c830', green: '#2a8a4a', blue: '#2a5aa8', night: '#141c30' };
const DON = { lon: 38.2, lat: 48.25, donetsk: [37.80, 48.00], lugansk: [39.31, 48.57], mariupol: [37.55, 47.10], kram: [37.56, 48.74], bakhmut: [38.00, 48.60],
  kadiivka: [38.67, 48.57], rostov: [39.72, 47.24], shakhty: [40.21, 47.71], taganrog: [38.90, 47.21], kharkiv: [36.23, 49.99], kyiv: [30.52, 50.45], moscow: [37.62, 55.75] };
const UA = [[22.1, 48.4], [22.8, 49.0], [24.0, 50.4], [23.6, 51.5], [25.5, 51.9], [27.8, 51.6], [30.5, 51.3], [31.8, 52.1], [33.8, 52.35], [35.4, 50.6], [36.6, 50.2], [38.2, 50.0], [40.1, 49.6],
  [40.0, 48.3], [39.7, 47.8], [38.3, 47.1], [37.3, 46.9], [35.3, 46.3], [34.8, 45.9], [33.5, 46.0], [32.0, 46.5], [30.8, 46.5], [29.6, 45.4], [28.2, 45.5], [28.8, 46.5], [30.0, 47.8], [28.2, 48.2],
  [26.6, 48.3], [24.9, 47.7], [22.9, 47.9]];
const CRIMEA = [[32.5, 45.4], [33.5, 46.1], [34.5, 46.0], [35.4, 45.3], [36.6, 45.4], [35.1, 44.8], [34.0, 44.4], [33.4, 44.6]];
const AZOV = [[34.9, 45.8], [35.0, 45.4], [35.5, 45.3], [36.6, 45.4], [37.6, 46.0], [38.3, 46.6], [39.2, 47.1], [38.8, 47.25], [37.6, 47.05], [36.9, 46.8], [35.9, 46.6], [35.2, 46.2]];
const DON_OBL = [[36.6, 47.6], [36.6, 48.4], [37.1, 48.9], [37.5, 49.25], [38.1, 49.1], [38.4, 48.75], [38.9, 48.2], [39.1, 47.9], [38.6, 47.3], [38.2, 47.1], [37.5, 47.0], [37.0, 46.95], [36.7, 47.2]];
const LUG_OBL = [[38.1, 49.1], [38.0, 49.6], [38.3, 50.1], [39.2, 50.3], [40.2, 49.6], [40.0, 49.0], [39.8, 48.6], [39.9, 48.3], [39.5, 47.85], [39.1, 47.9], [38.9, 48.2], [38.4, 48.75]];
const Z1924 = [[38.4, 47.15], [38.9, 47.6], [39.6, 47.9], [40.2, 48.3], [40.9, 48.1], [40.8, 47.4], [39.9, 47.05], [39.2, 47.12]];
const Z2014 = [[37.9, 47.1], [37.65, 47.7], [37.7, 48.1], [37.9, 48.35], [38.3, 48.5], [38.7, 48.6], [39.0, 48.78], [39.3, 48.85], [39.75, 48.75], [40.05, 48.85], [40.0, 48.3], [39.7, 47.85], [38.8, 47.55], [38.3, 47.15]];

function donMap(P, o = {}) {                                             // плоская карта региона: Украина, Крым, Азов, области, города
  GLOBE.fill(UA.map(P), o.ua || '#e8d6a8'); pencil(UA.concat([UA[0]]).map(P), { w: 4, col: '#3a2410', a: 0.9, pass2: false, gap: false });
  GLOBE.fill(CRIMEA.map(P), o.ua || '#e8d6a8'); pencil(CRIMEA.concat([CRIMEA[0]]).map(P), { w: 3, col: '#3a2410', a: 0.8, pass2: false, gap: false });
  GLOBE.fill(AZOV.map(P), o.sea || '#3a6a9a');
  if (o.obl !== false) for (const Z of [DON_OBL, LUG_OBL]) { GLOBE.fill(Z.map(P), o.oblCol || '#f0b84a', o.oblA ?? 0.55); pencil(Z.concat([Z[0]]).map(P), { w: 3, col: '#5a3a10', a: 0.8, pass2: false, gap: true }); }
}
function dbDetail(pr, R, t) {                                            // финал наезда: две области, Азов, города, граница
  GLOBE.fill(pr(UA), '#e8d6a8'); GLOBE.fill(pr(CRIMEA), '#e8d6a8'); GLOBE.fill(pr(AZOV), '#2a66aa');
  pencil(pr(UA.concat([UA[0]])), { w: 4, col: DB.ink, a: 0.8, pass2: false, gap: false });
  const k = clamp((R - 9000) / 9000);
  for (const Z of [DON_OBL, LUG_OBL]) { GLOBE.fill(pr(Z), '#f0a040', 0.35 + 0.35 * k); pencil(pr(Z.concat([Z[0]])), { w: 5, col: '#7a3a10', a: 0.9, pass2: false, gap: true }); }
  if (k > 0.3) { const a = (k - 0.3) / 0.7;
    [['ДОНЕЦК', DON.donetsk], ['ЛУГАНСК', DON.lugansk], ['МАРИУПОЛЬ', DON.mariupol]].forEach(([n, ll], i) => { const [x, y] = pr([ll])[0]; ell(x, y, 16, 16, { wash: DB.red, washA: a, w: 3, col: DB.ink, a });
      ctx.save(); ctx.globalAlpha = a * 0.85; ctx.fillStyle = 'rgba(16,10,8,1)'; ctx.font = '600 40px Osw'; const w = ctx.measureText(n).width + 30; ctx.fillRect(x + 24, y - 30, w, 54); ctx.restore(); txt(n, x + 24 + w / 2, y - 3, 40, { col: '#ffe08a', font: 'Osw', a }); });
    const [ax, ay] = pr([[37.2, 46.55]])[0]; txt('АЗОВСКОЕ МОРЕ', ax, ay, 40, { col: '#cfe8ff', font: 'Osw', a }); const [rx, ry] = pr([[41.2, 48.9]])[0]; txt('РОССИЯ', rx, ry, 46, { col: '#5a3a20', font: 'Osw', a });
    const [ux, uy] = pr([[36.2, 49.3]])[0]; txt('УКРАИНА', ux, uy, 46, { col: '#5a3a20', font: 'Osw', a }); }
}
function dbExtra(pr, R, t) {                                            // глобус по смыслу: подсвечена Украина, «?» над Донбассом
  if (R > 2600) return; const a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200)); if (a <= 0) return;
  GLOBE.fill(pr(UA), '#f0d070', 0.8 * a); GLOBE.fill(pr(CRIMEA), '#f0d070', 0.8 * a);
  const [x, y] = pr([[DON.lon, DON.lat]])[0]; txt('?', x + 40, y - 40, 120 + Math.sin(t * 8) * 6, { col: DB.red, font: 'Osw', a });
}
const DB_GLOBE = { lon: DON.lon, lat: DON.lat, label: 'ДОНБАСС?', fromLon: 8, fromLat: 44, Rend: 20000, detail: dbDetail, extra: dbExtra };

// ---------- пейзаж и постройки
function terricon(x, base, w, h, t, o = {}) {                           // террикон: конус пустой породы, рёбра-осыпи, редкая трава, тропа
  const L = DB.ink, c = o.col || '#4a4448'; poly([[x - w / 2, base], [x - w * 0.06, base - h], [x + w * 0.06, base - h], [x + w / 2, base]], { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.25, col: '#1a1418', ang: 1.1 } });
  const r = rng(o.seed || 8100); for (let i = 0; i < 9; i++) { const k = r(); pencil([[x - w * 0.05 + k * w * 0.1, base - h + 10], [x - w / 2 + k * w, base]], { w: 1.4, col: '#7a7078', a: 0.5, pass2: false }); }
  for (let i = 0; i < 14; i++) { const k = r(), yy = base - r() * h * 0.6, xx = x + (k - 0.5) * w * (1 - (base - yy) / h) * 0.9; pencil([[xx, yy], [xx - 4, yy - 12], [xx, yy], [xx + 5, yy - 10]], { w: 1.6, col: o.grass || '#7a8a3a', pass2: false }); }
  if (o.smoke) for (let i = 0; i < 4; i++) { const k = ((t * 0.2 + i / 4) % 1); ell(x + Math.sin(i + t) * 20, base - h - k * 160, 24 + k * 50, 16 + k * 30, { wash: '#a8a0a0', washA: 0.25 * (1 - k), line: false }); }
}
function headframe(x, base, s, t, o = {}) {                             // копёр: решётчатая башня, два колеса, канаты, машинное здание
  push(x, base, s); const L = DB.ink, c = o.col || '#5a3a2a', sp = t * (o.spin ?? 2);
  rect(-210, -150, 200, 150, { wash: o.brick || DB.brick, washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.15, col: '#4a1a10', ang: 1.4 } }); for (let i = 0; i < 3; i++) rect(-190 + i * 62, -120, 40, 50, { wash: o.lit ? '#ffd890' : '#2a3040', washA: 1, w: 1.2, col: L });
  poly([[-230, -150], [-110, -200], [10, -150]], { wash: '#5a5a62', washA: 1, w: 2, col: L });
  for (const k of [-1, 1]) pencil([[k * 90, 0], [k * 20, -420]], { w: 8, col: c, pass2: false }); pencil([[-90, 0], [20, -420]], { w: 4, col: c, pass2: false }); pencil([[90, 0], [-20, -420]], { w: 4, col: c, pass2: false });
  for (let i = 1; i < 6; i++) { const y = -i * 70, hw = 90 - i * 12; pencil([[-hw, y], [hw, y]], { w: 3, col: c, pass2: false }); pencil([[-hw, y], [hw - 12, y - 70]], { w: 2, col: c, a: 0.7, pass2: false }); }
  pencil([[100, 0], [10, -380]], { w: 6, col: c, pass2: false });
  rect(-50, -440, 100, 24, { wash: c, washA: 1, w: 2, col: L });
  for (const k of [-1, 1]) { const cx = k * 36, cy = -470; ell(cx, cy, 44, 44, { wash: false, w: 5, col: '#2a2024' }); for (let q = 0; q < 6; q++) { const a = sp * k + q * 1.047; pencil([[cx, cy], [cx + Math.cos(a) * 42, cy + Math.sin(a) * 42]], { w: 2.4, col: '#2a2024', pass2: false }); } }
  pencil([[36, -470], [-160, -150]], { w: 1.6, col: '#1a1a1e', pass2: false }); pencil([[-36, -470], [-180, -150]], { w: 1.6, col: '#1a1a1e', pass2: false });
  pop();
}
function khrush(x, base, w, h, col, t, o = {}) {                       // панельная пятиэтажка: швы панелей, балконы с бельём, окна, антенны
  const L = DB.ink; rect(x, base - h, w, h, { wash: col, washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.12, col: '#4a4a44', ang: 1.4 } });
  const fl = o.fl || 5, n = Math.max(3, Math.floor(w / 60)), fh = h / fl, r = rng(o.seed || 8200);
  for (let f = 0; f < fl; f++) { pencil([[x, base - h + f * fh], [x + w, base - h + f * fh]], { w: 1, col: '#6a6a62', a: 0.6, pass2: false });
    for (let i = 0; i < n; i++) { const wx = x + 12 + i * (w - 24) / n, ww = (w - 24) / n - 16, wy = base - h + f * fh + fh * 0.22, lit = o.lit && r() < o.lit;
      if (o.ruin && r() < o.ruin) { rect(wx, wy, ww, fh * 0.5, { wash: '#0e0e12', washA: 1, w: 1, col: L }); continue; }
      rect(wx, wy, ww, fh * 0.5, { wash: lit ? '#ffd078' : (o.night ? '#1a2234' : '#3a4a5a'), washA: 1, w: 1, col: L }); pencil([[wx + ww / 2, wy], [wx + ww / 2, wy + fh * 0.5]], { w: 1, col: L, a: 0.6, pass2: false });
      if ((i + f) % 3 === 1 && !o.noBalc) { rect(wx - 6, wy + fh * 0.5, ww + 12, fh * 0.28, { wash: lerpC(col, '#000000', 0.15), washA: 1, w: 1.2, col: L }); if (r() < 0.4) for (let q = 0; q < 3; q++) rect(wx + q * ww / 3, wy + fh * 0.38, ww / 4, fh * 0.16, { wash: ['#e86a5a', '#f4f0e6', '#5a8ad0'][q], washA: 1, line: false }); } } }
  if (!o.ruin) for (let i = 0; i < 2; i++) pencil([[x + w * (0.3 + i * 0.4), base - h], [x + w * (0.3 + i * 0.4), base - h - 40], [x + w * (0.3 + i * 0.4) - 20, base - h - 40]], { w: 2, col: '#2a2a30', pass2: false });
  if (o.ruin) { const r2 = rng((o.seed || 8200) + 1); const P = [[x, base - h]]; for (let i = 1; i < 8; i++) P.push([x + i * w / 8, base - h + r2() * h * 0.45]); P.push([x + w, base - h + r2() * 60]); P.push([x + w, base - h - 4]); P.push([x, base - h - 4]);
    ctx.save(); ctx.fillStyle = o.skyCol || '#8a8a90'; ctx.beginPath(); P.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.fill(); ctx.restore(); pencil(P.slice(0, 9), { w: 2.4, col: L, pass2: false });
    for (let i = 0; i < 6; i++) { const xx = x + r2() * w, yy = base - h * 0.5 + r2() * h * 0.4; ell(xx, yy, 18 + r2() * 30, 10 + r2() * 16, { wash: '#1a1414', washA: 0.5, line: false }); } }
}
function sunflower(x, y, h, t, seed = 1) { const sw = Math.sin(t * 1.4 + seed) * 4; pencil([[x, y], [x + sw, y - h]], { w: 4, col: '#4a6a2a', pass2: false }); ell(x - 14, y - h * 0.5, 16, 7, { wash: '#5a7a2a', washA: 1, w: 1, col: DB.ink, rot: 0.5 });
  push(x + sw, y - h, 1); for (let q = 0; q < 10; q++) { const a = q * 0.628; ell(Math.cos(a) * 20, Math.sin(a) * 20, 12, 5, { wash: DB.sun, washA: 1, w: 1, col: '#8a5a10', rot: a }); } ell(0, 0, 14, 14, { wash: '#4a2a10', washA: 1, w: 1.2, col: DB.ink }); pop(); }
function stoneBaba(x, y, s, o = {}) {                                   // половецкая каменная баба: известняк, руки с чашей
  push(x, y, s); const L = DB.ink, c = o.col || '#c8c0a8'; rect(-40, -40, 80, 40, { wash: '#a8a088', washA: 1, w: 2, col: L });
  blob([[-34, -40], [-40, -150], [-30, -200], [0, -214], [30, -200], [40, -150], [34, -40]], { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#6a6050', ang: 1.2 } });
  ell(0, -186, 26, 24, { wash: lerpC(c, '#ffffff', 0.1), washA: 1, w: 1.6, col: L }); pencil([[-10, -190], [-4, -190]], { w: 2, col: L, pass2: false }); pencil([[4, -190], [10, -190]], { w: 2, col: L, pass2: false });
  ell(0, -110, 22, 10, { wash: '#a89878', washA: 1, w: 1.6, col: L }); pencil([[-30, -140], [-18, -112]], { w: 3, col: L, pass2: false }); pencil([[30, -140], [18, -112]], { w: 3, col: L, pass2: false }); pop();
}
function kurgan(x, base, w, h, col) { blob([[x - w / 2, base], [x - w * 0.3, base - h * 0.7], [x, base - h], [x + w * 0.3, base - h * 0.7], [x + w / 2, base]], { wash: col || '#a8a060', washA: 1, w: 2, col: DB.ink, shade: { gap: 10, a: 0.15, col: '#5a5a2a', ang: 1.3 } }); }
function feather(x0, x1, y, n, t, seed, col = '#e8e0c0', hh = 60) {     // ковыль: серебристые метёлки, качаются ветром
  const r = rng(seed); for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), yy = y + r() * 40, h = hh * (0.6 + r() * 0.6), sw = Math.sin(t * 2.4 + x * 0.01) * h * 0.25;
    pencil([[x, yy], [x + sw * 0.5, yy - h * 0.6], [x + sw, yy - h]], { w: 1.6, col, a: 0.85, pass2: false, gap: false }); }
}
function cart(x, y, s, t, o = {}) {                                     // вагонетка с углём на рельсах
  push(x, y, s); const L = DB.ink; poly([[-90, -100], [90, -100], [74, -20], [-74, -20]], { wash: o.col || '#5a4a3a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: '#1a1410', ang: 1.4 } });
  if (o.coal !== false) for (let q = 0; q < 9; q++) ell(-70 + (q % 5) * 34 + (q > 4 ? 16 : 0), -104 - (q > 4 ? 18 : 0), 20, 14, { wash: q % 2 ? '#1a1a20' : '#2e2e36', washA: 1, w: 1, col: '#000' });
  for (const k of [-50, 50]) { ell(k, -12, 18, 18, { wash: '#3a3a40', washA: 1, w: 2, col: L }); ell(k, -12, 5, 5, { wash: '#8a8a90', washA: 1, line: false }); } pop();
}
function rails(x0, x1, y, col = '#5a4a3a') { pencil([[x0, y], [x1, y]], { w: 4, col: '#6a6a70', pass2: false }); pencil([[x0, y + 14], [x1, y + 14]], { w: 4, col: '#6a6a70', pass2: false }); for (let x = x0; x < x1; x += 50) rect(x, y - 4, 16, 26, { wash: col, washA: 1, w: 1, col: DB.ink }); }
function propPit(x, y, h, s = 1) { push(x, y, s); rect(-10, -h, 20, h, { wash: '#a87a40', washA: 1, w: 1.6, col: DB.ink, shade: { gap: 5, a: 0.2, col: '#5a3a10', ang: 0.1 } }); rect(-50, -h - 16, 100, 18, { wash: '#a87a40', washA: 1, w: 1.6, col: DB.ink }); pop(); }

// ---------- сквозная нить: латунный жетон-номерок «ХОЗЯИН: …»
const OWN = { fern: ['ПАПОРОТНИКИ', '#3a7a3a'], steppe: ['НИЧЕЙ', '#7a6a4a'], yuzovka: ['ИМПЕРИЯ', '#6a2a5a'], border: ['УССР', '#a8281e'], mine: ['УССР', '#a8281e'],
  vote: ['УКРАИНА', '#1e5aa8'], war14: ['УКРАИНА · ВОЙНА', '#5a5a5a'], war22: ['ОККУПАЦИЯ', '#3a3a3a'], today: ['ООН: УКРАИНА', '#1e5aa8'] };
const OWN2 = { steppe: () => [EV.st_emp, 'ИМПЕРИЯ', '#6a2a5a'], mine: () => [EV.mn_occ, 'ОККУПАЦИЯ 1941–43', '#3a3a3a'] };
let MAPON = -1;
function token(x, y, s, num, t) {                                       // латунный номерок: круг, дырка, выбитый номер
  push(x, y, s); ell(0, 0, 60, 60, { wash: DB.brass, washA: 1, w: 3, col: DB.brassD, shade: { gap: 6, a: 0.2, col: DB.brassD, ang: 0.8 } }); ell(0, -40, 9, 9, { wash: '#2a2020', washA: 1, w: 1.6, col: DB.brassD });
  pencil(ellPts(0, 0, 48, 48, 0, 0, 40), { w: 1.6, col: DB.brassD, a: 0.7, pass2: false }); txt(String(num), 0, 10, 44, { col: '#4a2a08', font: 'Osw' }); glow(-24, -24, 30, 'rgba(255,250,220,1)', 0.25); pop();
}
function dbBadge(t, name) {
  const O = OWN[name]; if (!O || t < S0[name] + 0.15 || MAPON === t) return; const ap = clamp((t - S0[name] - 0.15) / 0.2), idx = Object.keys(OWN).indexOf(name) + 1;
  let lbl = O[0], col = O[1]; const o2 = OWN2[name] && OWN2[name](); if (o2 && t > o2[0]) { lbl = o2[1]; col = o2[2]; }
  push(800, 1290, 1, -0.05); ctx.save(); ctx.globalAlpha = ap; rect(-130, -90, 260, 180, { wash: '#efe6cc', washA: 1, w: 3, col: DB.ink }); txt('ХОЗЯИН №' + idx, 0, -64, 24, { col: DB.ink, font: 'Osw' });
  token(-70, 10, 0.62, idx, t); ctx.restore();
  stampD(44, 14, lbl.length > 14 ? 0.18 : lbl.length > 9 ? 0.2 : 0.32, lbl, col, -0.12, popK(t, o2 && t > o2[0] ? o2[0] : S0[name] + 0.45, 0.3)); pop();
}
function stampD(x, y, s, text, col, rot, k = 1, o = {}) {
  if (k <= 0) return; const sc = s * (1 + (1 - Math.min(1, k)) * 1.4); ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.6) * 0.94; push(x, y, sc, rot);
  ctx.font = `600 ${o.size || 64}px Osw`; const w = ctx.measureText(text).width + 50, h = (o.size || 64) * 1.45;
  pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 7, col, pass2: false }); pencil([[-w / 2 + 12, -h / 2 + 12], [w / 2 - 12, -h / 2 + 12], [w / 2 - 12, h / 2 - 12], [-w / 2 + 12, h / 2 - 12], [-w / 2 + 12, -h / 2 + 12]], { w: 3, col, pass2: false });
  txt(text, 0, 2, o.size || 64, { col, font: 'Osw' }); pop(); ctx.restore();
}
function infoPlate(x, y, lines, t, t0, o = {}) {
  if (t < t0) return; const k = popK(t, t0, 0.3); push(x, y, k, o.rot ?? -0.03); ctx.save(); const w = Math.max(...lines.map(([s, sz]) => { ctx.font = `600 ${sz}px Osw`; return ctx.measureText(s).width; })) + 50, h = lines.reduce((a, [, sz]) => a + sz * 1.25, 0) + 30;
  ctx.fillStyle = o.bg || 'rgba(14,10,8,0.88)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || DB.brassL, pass2: false });
  let yy = -h / 2 + 15; lines.forEach(([s, sz, c]) => { yy += sz * 0.62; txt(s, 0, yy, sz, { col: c || '#fff6e0', font: 'Osw' }); yy += sz * 0.63; }); pop();
}

// ---------- отмотка: Том в каске крутит фонарь полным оборотом, клеть летит вниз по стволу — пласты угля проносятся вверх
function wTunnelDB(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), sp = Math.pow(p, 1.6) * 5200;
  lay(40, () => scr(() => { vgrad(0, 1920, ['#2a2420', '#14100e', '#060504'], 1);
    for (let i = -2; i < 14; i++) { const y = ((i * 190 + sp) % 2660) - 370, r = rng(8300 + i); const col = i % 3 === 0 ? '#0c0c10' : i % 3 === 1 ? '#5a4a3a' : '#7a6a50';
      rect(0, y, 1080, 120 + r() * 60, { wash: col, washA: 1, line: false }); pencil([[0, y], [1080, y + r() * 20]], { w: 2, col: '#1a1410', a: 0.6, pass2: false, gap: false });
      if (i % 3 === 0) for (let q = 0; q < 6; q++) ell(r() * 1080, y + 40 + r() * 60, 20, 8, { wash: '#3a3a48', washA: 0.8, line: false }); }
    for (const x of [150, 930]) { rect(x - 12, 0, 24, 1920, { wash: '#6a5a40', washA: 1, w: 2, col: '#1a1410' }); for (let y = -200 + (sp % 240); y < 1920; y += 240) rect(x - 40, y, 80, 18, { wash: '#7a6a48', washA: 1, w: 1.6, col: '#1a1410' }); }
    const rr = rng(hsh(FRAME, 8310)); for (let i = 0; i < 30; i++) { const x = rr() * 1080, y = rr() * 1920; pencil([[x, y], [x, y - 120 - p * 300]], { w: 3, col: '#f0d8a0', a: 0.35 * p, pass2: false, gap: false }); } }));
  lay(1, () => { cat();
    scr(() => { const r = 6.283 * sm(clamp(p / 0.7)), a = -1.57 + r; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(540, 1000, 20, 540, 1000, 900); g.addColorStop(0, 'rgba(255,230,160,0.55)'); g.addColorStop(1, 'rgba(255,230,160,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(540, 1000); ctx.arc(540, 1000, 900, a - 0.3, a + 0.3); ctx.closePath(); ctx.fill(); ctx.restore();
      if (p > 0.82) { const k = (p - 0.82) / 0.18; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#fff8e8'; ctx.fillRect(0, 0, W, H); ctx.restore(); } }); });
}
WORLD.tunnel = wTunnelDB;
DIR.tunnel = { outfit: 'miner', light: { side: 1, rim: '#ffe0a0' }, grade: ['#2a1a0a', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.7, 'awe']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.7)), sc = 0.95 + 0.06 * sm(clamp(p / 0.7));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [170, -340], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };
