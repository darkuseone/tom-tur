/* 029 Крым — общие детали: палитра «Чёрное море + охра скал + кипарисы + южное солнце», контур полуострова (lon/lat),
   глобус Земли с резким наездом на Крым (правило владельца 17.11.2026: в начале — где это на планете), печать хозяина,
   бейдж «ХОЗЯИН №n» (повторный хук каждой эпохи), море с волнами, горы (Ай-Петри), кипарис, колонна, амфора, корабли,
   штурвал. Отмотка 029: Том крутит корабельный штурвал — полный оборот, Чёрное море закручивается в воронку и глотает кадр. */
const KR = { ink: '#160f0a', sea: '#1f5f9a', seaD: '#0c2a4a', seaL: '#7ab8e8', foam: '#e8f4f8', rock: '#c89a62', rockD: '#6a4a2a', rockL: '#ecd2a0',
  cyp: '#1e4a2a', cypL: '#4a8a4a', sand: '#e8d0a0', red: '#c8281e', redL: '#ff6a4a', gold: '#e8b84a', goldL: '#ffe08a', wood: '#8a5a32', woodD: '#4a2e14',
  ua: '#2a6ad0', uaY: '#ffd23a', paper: '#f0e2c0', paperD: '#b89a68' };

// ---------- контур Крыма и морей (lon, lat), грубо по побережью
const CRIMEA = [[33.70, 46.18], [34.0, 46.05], [34.45, 45.95], [34.6, 45.75], [34.9, 45.6], [35.05, 45.4], [35.35, 45.35], [35.6, 45.45], [35.9, 45.46], [36.25, 45.47], [36.6, 45.42], [36.5, 45.25], [36.62, 45.1], [36.4, 45.05],
  [36.1, 45.02], [35.6, 45.0], [35.4, 45.04], [35.2, 44.86], [34.98, 44.82], [34.7, 44.78], [34.42, 44.67], [34.2, 44.5], [33.95, 44.42], [33.75, 44.39], [33.55, 44.5], [33.45, 44.58], [33.55, 44.85], [33.6, 45.0],
  [33.37, 45.2], [33.1, 45.25], [32.75, 45.35], [32.48, 45.38], [32.6, 45.5], [33.0, 45.75], [33.35, 45.9], [33.6, 46.05], [33.70, 46.18]];
const BLACKSEA = [[27.5, 42.0], [27.9, 43.2], [28.6, 44.2], [29.6, 45.3], [30.2, 45.85], [30.75, 46.5], [31.5, 46.6], [32.3, 46.45], [33.0, 46.15], [33.6, 46.12], [34.5, 45.6], [35.5, 45.4], [36.6, 45.3], [37.0, 45.2], [37.6, 44.8],
  [38.3, 44.3], [39.2, 43.8], [40.1, 43.3], [41.0, 42.6], [41.6, 41.6], [40.5, 41.0], [39.0, 41.0], [37.5, 41.1], [36.0, 41.7], [35.0, 42.1], [33.5, 42.0], [32.0, 41.8], [30.5, 41.3], [29.2, 41.2], [28.2, 41.5]];
const AZOV = [[35.0, 45.6], [35.3, 45.95], [36.0, 46.3], [36.8, 46.65], [37.7, 46.75], [38.4, 47.1], [39.3, 47.2], [38.7, 46.8], [38.2, 46.4], [38.0, 46.0], [37.7, 45.6], [37.3, 45.35], [36.7, 45.45], [35.9, 45.5], [35.4, 45.45]];
const EURASIA = [[-10, 36], [-10, 44], [-2, 48], [-5, 48.5], [2, 51], [8, 54], [8, 57], [5, 62], [14, 68], [25, 71], [40, 68], [60, 70], [80, 73], [110, 77], [140, 72], [170, 69], [180, 66], [160, 60], [143, 52], [140, 45], [122, 40], [121, 31], [110, 20],
  [105, 10], [100, 13], [98, 8], [92, 20], [80, 15], [77, 8], [72, 20], [66, 25], [57, 25], [56, 27], [50, 30], [48, 30], [43, 13], [35, 28], [34, 31], [36, 36], [30, 36.5], [26, 38], [23, 36.5], [20, 40], [15, 40], [16, 38], [10, 44], [3, 43], [-1, 37], [-5, 36]];
const AFRICA = [[-17, 15], [-17, 21], [-10, 30], [-6, 35.8], [10, 37.2], [11, 33], [20, 31], [30, 31.3], [33, 31], [43, 12], [51, 12], [40, -2], [40, -15], [35, -24], [20, -35], [18, -30], [12, -17], [13, -5], [9, 4], [-8, 4.5], [-13, 8]];
const CASPIAN = [[47, 45], [53, 47], [54, 42], [53, 37], [49, 37.5], [49, 41], [47, 43]];
const CITIES = [['Севастополь', 33.52, 44.6], ['Симферополь', 34.1, 44.95], ['Ялта', 34.17, 44.5], ['Керчь', 36.47, 45.35], ['Евпатория', 33.37, 45.19], ['Феодосия', 35.38, 45.03]];

const D2R = Math.PI / 180;
function orth(lon, lat, lon0, lat0) {                                  // ортографическая проекция: [x, y] в долях радиуса (y вниз), обратная сторона — на лимб
  const l = (lon - lon0) * D2R, p = lat * D2R, p0 = lat0 * D2R;
  const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  const x = Math.cos(p) * Math.sin(l), y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
  if (cosc < 0) { const n = Math.hypot(x, y) || 1; return [x / n, -y / n]; } return [x, -y];
}
function fillPts(P, col, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); ctx.restore(); }

function globe(cx, cy, R, lon0, lat0, t, o = {}) {                    // Земля: океан, материки, моря; Крым выделен охрой, пин «КРЫМ». Рисовать в scr()
  const pr = (ll) => ll.map(([lo, la]) => { const [x, y] = orth(lo, la, lon0, lat0); return [cx + x * R, cy + y * R]; });
  if (R < 3000) { glow(cx, cy, R * 1.12, 'rgba(120,190,255,1)', 0.22); }
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
  const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R); g.addColorStop(0, '#3a8ad8'); g.addColorStop(0.7, '#1a4a8a'); g.addColorStop(1, '#0a1e40');
  ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  fillPts(pr(EURASIA), '#7a9a4a'); fillPts(pr(AFRICA), '#c8a65a'); fillPts(pr(CASPIAN), '#2a6aaa'); fillPts(pr(BLACKSEA), '#2266aa'); fillPts(pr(AZOV), '#2a74b4');
  if (R < 3000) { const r = rng(4900); for (let i = 0; i < 9; i++) { const lo = lon0 - 70 + r() * 140, la = -40 + r() * 100, [x, y] = orth(lo, la, lon0, lat0); ell(cx + x * R, cy + y * R, R * (0.12 + r() * 0.1), R * 0.035, { wash: '#ffffff', washA: 0.5, line: false, rot: r() - 0.5 }); } }
  const C = pr(CRIMEA); fillPts(C, R > 3000 ? '#d8b070' : '#f0b84a');
  if (R > 3000) {                                                      // крупно: горы южного берега, линия контура, города
    const M = pr([[33.6, 44.55], [34.2, 44.62], [34.8, 44.85], [35.3, 44.98], [35.1, 44.9], [34.4, 44.72], [33.8, 44.5]]); fillPts(M, '#7a8a4a', 0.9);
    pencil(C, { w: 5, col: KR.ink, a: 0.9, pass2: false, gap: false });
    pencil(pr(BLACKSEA.slice(0, 10)), { w: 3, col: KR.ink, a: 0.5, pass2: false, gap: false });
    const k = clamp((R - 6000) / 8000); if (k > 0) CITIES.forEach(([n, lo, la], i) => { const [x, y] = pr([[lo, la]])[0]; ell(x, y, 9, 9, { wash: KR.red, washA: k, w: 2, col: KR.ink, a: k }); txt(n, x + (lo > 35 ? -14 : 16), y - 22, 30, { col: '#fff6e0', font: 'Osw', a: k, align: lo > 35 ? 'right' : 'left' }); });
  }
  const sh = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.2, cx, cy, R * 1.02); sh.addColorStop(0, 'rgba(255,255,255,0.12)'); sh.addColorStop(0.75, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,20,0.5)');
  ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); ctx.restore();
  if (R < 3000) pencil(ellPts(cx, cy, R, R, 0, 0.02, 90), { w: 3, col: '#bfe4ff', a: 0.6, pass2: false, gap: false });
  const [px, py] = pr([[34.2, 45.2]])[0], pin = o.pin ?? 1;            // пин над Крымом с пульсом
  if (pin > 0) { const ph = (t * 1.6) % 1; pencil(ellPts(px, py, 20 + ph * 90, (20 + ph * 90) * 0.6, 0, 0, 40), { w: 5, col: KR.redL, a: (1 - ph) * pin, pass2: false, gap: false });
    push(px, py - 6, 1.1 * pin); blob([[0, 0], [-34, -60], [-30, -98], [0, -116], [30, -98], [34, -60]], { wash: KR.red, washA: 1, w: 3, col: KR.ink }); ell(0, -80, 14, 14, { wash: '#fff6e0', washA: 1, line: false }); pop();
    if (o.label !== false) { push(px + 56, py - 120, pin); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-6, -40, 190, 70); ctx.restore(); txt('КРЫМ', 88, -6, 52, { col: KR.goldL, font: 'Osw' }); pop(); } }
}

function crimeaPts(cx, cy, k) { return CRIMEA.map(([lo, la]) => [cx + (lo - 34.55) * k * 0.71, cy - (la - 45.28) * k]); }   // плоская карта: k px на градус широты
function crimeaMap(cx, cy, k, o = {}) {                                 // пергаментная карта полуострова: суша, горы, кромка, точки городов
  const P = crimeaPts(cx, cy, k); shape(P, { wash: o.land || '#d8b878', washA: 1, w: o.w || 3, col: KR.ink, shade: o.shade === false ? undefined : { gap: 7, a: 0.18, col: KR.rockD, ang: 0.8 } });
  const M = [[33.6, 44.55], [34.2, 44.62], [34.8, 44.85], [35.3, 44.98], [35.1, 44.9], [34.4, 44.72], [33.8, 44.5]].map(([lo, la]) => [cx + (lo - 34.55) * k * 0.71, cy - (la - 45.28) * k]);
  if (!o.noMount) blob(M, { wash: o.mount || '#8a9a5a', washA: 0.85, line: false });
  if (o.cities) CITIES.forEach(([n, lo, la]) => ell(cx + (lo - 34.55) * k * 0.71, cy - (la - 45.28) * k, k * 0.05, k * 0.05, { wash: KR.red, washA: 1, w: 1.4, col: KR.ink }));
  return P;
}

function stamp(x, y, s, text, col, rot, k = 1, o = {}) {               // печать хозяина: двойная рамка, буквы; k — «удар» (popK) 0→1
  if (k <= 0) return; const sc = s * (1 + (1 - Math.min(1, k)) * 1.4), a = Math.min(1, k * 1.6);
  ctx.save(); ctx.globalAlpha = a * (o.a ?? 0.92); push(x, y, sc, rot);
  ctx.font = `600 ${o.size || 64}px Osw`; const w = ctx.measureText(text).width + 50, h = (o.size || 64) * 1.45;
  pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 7, col, pass2: false });
  pencil([[-w / 2 + 12, -h / 2 + 12], [w / 2 - 12, -h / 2 + 12], [w / 2 - 12, h / 2 - 12], [-w / 2 + 12, h / 2 - 12], [-w / 2 + 12, -h / 2 + 12]], { w: 3, col, pass2: false });
  txt(text, 0, 2, o.size || 64, { col, font: 'Osw' }); if (o.cross) pencil([[-w / 2, h / 2], [w / 2, -h / 2]], { w: 9, col: o.cross, pass2: false });
  pop(); ctx.restore();
}
// бейдж «ХОЗЯИН №n» — повторный хук каждой эпохи (HUD, экранные координаты, правый край безопасной зоны)
const OWNERS = { cave: [1, 'НЕАНДЕРТАЛЬЦЫ', '#5a3a1a'], herson: [2, 'ГРЕКИ', '#1a4a9a'], khan: [3, 'ХАНСТВО', '#1a7a4a'], ekat: [4, 'ИМПЕРИЯ', '#8a1a1a'], war: [4, 'ИМПЕРИЯ', '#8a1a1a'],
  deport: [5, 'СССР', '#a8201a'], ussr: [6, 'УКРАИНА', KR.ua], annex: [7, 'АННЕКСИЯ', '#3a3a3a'], today: [6, 'УКРАИНА', KR.ua] };
function ownerBadge(t, name) {
  const O = OWNERS[name]; if (!O) return; const t0 = name === 'annex' ? EV.an_take : S0[name] + 0.45, k = popK(t, t0, 0.3); if (t < S0[name] + 0.15) return;
  const ap = clamp((t - S0[name] - 0.15) / 0.2);
  push(780, 1300, 1, -0.04); ctx.save(); ctx.globalAlpha = ap;
  rect(-118, -82, 236, 164, { wash: KR.paper, washA: 1, w: 3, col: KR.ink }); crimeaMap(-4, 4, 58, { w: 2, shade: false, noMount: true, land: '#e8c88a' });
  txt('ХОЗЯИН №' + O[0], 0, -60, 24, { col: KR.ink, font: 'Osw' }); ctx.restore();
  if (name === 'ussr' && t < WT('s7', 'девяносто')) stamp(0, 20, 0.42, 'УССР', '#a8201a', -0.18, k, { size: 58 });
  else if (name === 'annex' && t < EV.an_take) stamp(0, 20, 0.42, 'УКРАИНА', KR.ua, -0.18, popK(t, S0.annex + 0.45, 0.3), { size: 58 });
  else stamp(0, 20, 0.42, O[1], O[2], -0.18, name === 'ussr' ? popK(t, WT('s7', 'девяносто'), 0.3) : k, { size: 58 });
  pop();
}

// ---------- природа и предметы
function seaKR(y0, y1, t, seed, o = {}) {                               // море: градиент, волны-штрихи, блики, пена
  const c = o.cols || ['#2a7ab8', '#1a4a80', '#0c2a4a']; vgrad(y0, y1, c, 1);
  const r = rng(seed); for (let i = 0; i < (o.n || 46); i++) { const yy = y0 + Math.pow(r(), 1.6) * (y1 - y0), x = r() * 1700 - 300 + Math.sin(t * 0.8 + i) * 14, w = 30 + (yy - y0) / (y1 - y0) * 120;
    pencil([[x - w, yy], [x - w * 0.3, yy - 5], [x + w * 0.3, yy - 5], [x + w, yy]], { w: 1.5 + (yy - y0) / (y1 - y0) * 3, col: i % 3 ? (o.wave || '#8ac8f0') : '#e8f4f8', a: 0.55, pass2: false, gap: false }); }
  if (o.glint) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35; for (let i = 0; i < 18; i++) { ctx.fillStyle = o.glint; ctx.fillRect(o.gx - 90 + Math.sin(i * 7 + t * 2) * 110, y0 + 10 + i * (y1 - y0) / 22, 50 - i * 2, 4); } ctx.restore(); }
}
function ridgeKR(base, h, col, seed, o = {}) {                          // Крымские горы: зубчатая «корона» Ай-Петри, обрывы, леса у подножия
  const r = rng(seed), P = [[-500, base]]; for (let x = -500; x <= 1600; x += 60) { const crown = o.crownX !== undefined && Math.abs(x - o.crownX) < 160; P.push([x, base - h * (0.55 + r() * 0.35) - (crown ? (x / 60 % 2 ? 90 : 40) : 0)]); } P.push([1600, base]);
  shape(P, { wash: col, washA: 1, w: 2, col: KR.ink, a: 0.7, shade: { gap: 9, a: 0.18, col: lerpC(col, '#000000', 0.5), ang: 1.2 } });
  for (let i = 0; i < 14; i++) { const x = -400 + i * 150 + r() * 60; pencil([[x, base - h * 0.5], [x + 30, base - h * 0.15]], { w: 2, col: lerpC(col, '#000000', 0.4), a: 0.5, pass2: false }); }
}
function cypress(x, y, h, t, seed = 1) {                                // кипарис: тёмное «веретено», мазки хвои, качается
  const sw = Math.sin(t * 1.1 + seed) * h * 0.012;
  blob([[x - h * 0.05, y], [x - h * 0.11, y - h * 0.4], [x - h * 0.06, y - h * 0.8], [x + sw, y - h], [x + h * 0.06 + sw, y - h * 0.8], [x + h * 0.11, y - h * 0.4], [x + h * 0.05, y]], { wash: KR.cyp, washA: 1, w: 2, col: KR.ink, a: 0.7, shade: { gap: 5, a: 0.3, col: '#0a2010', ang: 1.4 } });
  for (let k = 0; k < 5; k++) pencil([[x - h * 0.04, y - h * (0.2 + k * 0.15)], [x + h * 0.03 + sw * k / 5, y - h * (0.28 + k * 0.15)]], { w: 2, col: KR.cypL, a: 0.6, pass2: false });
}
function columnKR(x, y, h, o = {}) {                                    // колонна: база, каннелюры, капитель; o.broken — обломана
  const w = h * 0.1, top = o.broken ? y - h * o.broken : y - h; rect(x - w * 0.8, y - 24, w * 1.6, 24, { wash: o.col || '#f0e8d8', washA: 1, w: 2, col: KR.ink });
  shape([[x - w / 2, y - 24], [x - w * 0.45, top], [x + w * 0.45, top], [x + w / 2, y - 24]], { wash: o.col || '#f4ecdc', washA: 1, w: 2, col: KR.ink, shade: { gap: 6, a: 0.2, col: '#a89878', ang: 1.57 } });
  for (let k = -1; k <= 1; k++) pencil([[x + k * w * 0.22, y - 30], [x + k * w * 0.2, top + 6]], { w: 1.5, col: '#a89878', a: 0.6, pass2: false });
  if (!o.broken) { rect(x - w * 0.9, top - 18, w * 1.8, 18, { wash: o.col || '#f0e8d8', washA: 1, w: 2, col: KR.ink }); for (const s of [-1, 1]) ell(x + s * w * 0.8, top - 8, 12, 12, { wash: '#f0e8d8', washA: 1, w: 1.6, col: KR.ink }); }
  else poly([[x - w * 0.45, top], [x - w * 0.1, top - 22], [x + w * 0.2, top - 6], [x + w * 0.45, top - 16], [x + w * 0.45, top]], { wash: '#f4ecdc', washA: 1, w: 1.6, col: KR.ink });
}
function amphora(x, y, s, col = '#c86a3a') { push(x, y, s); blob([[-14, -150], [-30, -120], [-46, -60], [-26, -10], [0, 0], [26, -10], [46, -60], [30, -120], [14, -150]], { wash: col, washA: 1, w: 2, col: KR.ink, shade: { gap: 5, a: 0.25, col: '#5a2a10', ang: 1.2 } });
  pencil([[-14, -140], [-34, -130], [-30, -100]], { w: 5, col: KR.ink, a: 0.8, pass2: false }); pencil([[14, -140], [34, -130], [30, -100]], { w: 5, col: KR.ink, a: 0.8, pass2: false }); pencil([[-36, -80], [36, -80]], { w: 3, col: '#1a0a04', a: 0.6, pass2: false }); pop(); }
function shipKR(x, y, s, t, kind = 'greek', seed = 1) {                 // корабли: греческий (парус, вёсла), фрегат (3 мачты), пароход 1854 (труба + колёса)
  push(x, y + Math.sin(t * 1.4 + seed) * 4, s, Math.sin(t * 1.1 + seed) * 0.03); const L = KR.ink;
  if (kind === 'greek') { shape([[-220, -40], [220, -40], [260, -90], [180, 0], [-170, 0], [-260, -80]], { wash: '#6a3a1e', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 9; k++) pencil([[-150 + k * 36, -10], [-170 + k * 36 + Math.sin(t * 5 + k) * 10, 50]], { w: 4, col: '#4a2a10', pass2: false });
    pencil([[0, -40], [0, -330]], { w: 7, col: '#4a2a10', pass2: false }); shape([[-130, -320], [130, -320], [120 + Math.sin(t * 2) * 8, -110], [-120 + Math.sin(t * 2) * 8, -110]], { wash: '#f0e2c0', washA: 1, w: 2, col: L }); ell(0, -215, 50, 50, { wash: '#c8401e', washA: 0.8, line: false }); ell(-200, -50, 14, 10, { wash: '#f0e8d8', washA: 1, w: 1.4, col: L }); }
  else if (kind === 'frigate') { shape([[-300, -70], [300, -70], [270, 0], [-260, 0]], { wash: '#3a2a1e', washA: 1, w: 2.4, col: L }); rect(-280, -70, 560, 18, { wash: '#e8d8b0', washA: 1, w: 1.4, col: L }); for (let k = 0; k < 10; k++) rect(-250 + k * 52, -60, 16, 12, { wash: '#14100a', washA: 1, line: false });
    for (const mx of [-160, 0, 160]) { pencil([[mx, -70], [mx, -480]], { w: 7, col: '#3a2410', pass2: false }); for (let q = 0; q < 3; q++) { const w = 110 - q * 22, yy = -120 - q * 110; shape([[mx - w, yy - 90], [mx + w, yy - 90], [mx + w * 0.9 + Math.sin(t * 2 + q) * 6, yy], [mx - w * 0.9 + Math.sin(t * 2 + q) * 6, yy]], { wash: '#f4ecd8', washA: 1, w: 1.8, col: L }); } } }
  else { shape([[-300, -60], [300, -60], [270, 0], [-260, 0]], { wash: '#2a2a30', washA: 1, w: 2.4, col: L }); rect(-60, -230, 50, 170, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); ell(80, -60, 70, 70, { wash: '#4a3a2a', washA: 1, w: 2, col: L });
    for (let k = 0; k < 6; k++) { const ph = (t * 0.5 + k / 6) % 1; ell(-35 - ph * 160, -250 - ph * 200, 30 + ph * 60, 24 + ph * 40, { wash: '#3a3a40', washA: 0.7 * (1 - ph), line: false }); }
    for (const mx of [-200, 200]) { pencil([[mx, -60], [mx, -360]], { w: 6, col: '#3a2410', pass2: false }); shape([[mx - 70, -340], [mx + 70, -340], [mx + 60, -160], [mx - 60, -160]], { wash: '#d8d0c0', washA: 1, w: 1.6, col: L }); } }
  pop();
}
function wheelKR(x, y, s, rot) {                                        // корабельный штурвал: обод, 8 спиц с рукоятками, латунная ступица
  push(x, y, s, rot); const L = KR.ink;
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a); pencil([[c * 30, sn * 30], [c * 150, sn * 150]], { w: 12, col: KR.woodD, pass2: false }); shape(tubeP([[c * 150, sn * 150], [c * 200, sn * 200]], 18, 12), { wash: KR.wood, washA: 1, w: 2, col: L }); }
  pencil(ellPts(0, 0, 120, 120, 0, 0.02, 60), { w: 26, col: KR.woodD, pass2: false, gap: false }); pencil(ellPts(0, 0, 120, 120, 0, 0.02, 60), { w: 14, col: KR.wood, pass2: false, gap: false });
  ell(0, 0, 40, 40, { wash: KR.gold, washA: 1, w: 2.4, col: L }); ell(-10, -10, 12, 12, { wash: KR.goldL, washA: 1, line: false }); pop();
}
function gull(x, y, s, t, seed = 1) { const f = Math.sin(t * 9 + seed) * 18; pencil([[x - 40 * s, y - f * s], [x - 14 * s, y - 8 * s], [x, y], [x + 14 * s, y - 8 * s], [x + 40 * s, y - f * s]], { w: 4 * s, col: '#f4f0e8', pass2: false }); pencil([[x - 40 * s, y - f * s], [x - 14 * s, y - 8 * s], [x, y], [x + 14 * s, y - 8 * s], [x + 40 * s, y - f * s]], { w: 1.4, col: KR.ink, a: 0.7, pass2: false }); }

// ---------- отмотка: штурвал → водоворот Чёрного моря
function wTunnelKR(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), sp = sm(clamp(p / 0.72)), ph = sp * 6.283 + u * (2 + p * 10);
  lay(40, () => { scr(() => { vgrad(0, 1920, ['#04101e', '#0c2a4a', '#1f5f9a'], 1);
    for (let arm = 0; arm < 7; arm++) { const P = []; for (let q = 0; q < 60; q++) { const th = q * 0.16, rr = 20 + q * q * 0.42 * (1 + p * 0.5); P.push([540 + Math.cos(th + ph + arm * 0.9) * rr, 980 + Math.sin(th + ph + arm * 0.9) * rr * 0.9]); }
      pencil(P, { w: 10 + (arm % 3) * 6, col: arm % 2 ? '#7ab8e8' : '#e8f4f8', a: 0.55, pass2: false, gap: false }); }
    const r = rng(hsh(FRAME, 4950)); for (let i = 0; i < 60; i++) { const th = r() * 6.28 + ph * 1.4, rr = 60 + r() * 900 * (1 - p * 0.4); ell(540 + Math.cos(th) * rr, 980 + Math.sin(th) * rr, 6 + r() * 10, 3 + r() * 4, { wash: '#e8f4f8', washA: 0.7, line: false, rot: th + 1.57 }); }
    ctx.save(); const g = ctx.createRadialGradient(540, 980, 0, 540, 980, 260 + p * 300); g.addColorStop(0, 'rgba(0,0,0,0.95)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }); });
  lay(1, () => cat());
}
WORLD.tunnel = wTunnelKR;
DIR.tunnel = { outfit: 'hoodieKR', light: { side: 1, rim: '#9ad8ff' }, grade: ['#0c2a4a', 0.12], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.9, 'shock']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 0.95 + 0.08 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.2], hand: [150, -300], handF: [-150, -300], tailUp: true }); },
  afterCat: (t, u, P) => { const c = Math.cos(P.rot), s = Math.sin(P.rot), hx = 0, hy = -300 * P.s; wheelKR(P.x + hx * c - hy * s, P.y + hx * s + hy * c, 0.9 * P.s, P.rot * 2.2 + u * 4); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.12], [S1.tunnel, 540, 900, 0.22]] };
function horseKR(x, y, s, t, col = '#6a3a1e', gal = 1, seed = 1, rider = null) {   // конь (галоп при gal) + всадник human(o)
  push(x, y, s); const ph = t * 12 * gal + seed, L = KR.ink;
  for (const [lx, o] of [[-70, 0], [-40, 1.6], [60, 3.1], [90, 4.7]]) { const a = Math.sin(ph + o) * 0.6 * gal; pencil([[lx, -110], [lx + Math.sin(a) * 50, -50], [lx + Math.sin(a) * 30, 0]], { w: 13, col, pass2: false }); }
  const b = Math.sin(ph * 2) * 6 * gal; blob([[-110, -110 + b], [-100, -170 + b], [0, -185 + b], [90, -175 + b], [120, -120 + b], [60, -95 + b], [-60, -95 + b]], { wash: col, washA: 1, w: 2.2, col: L, shade: { gap: 6, a: 0.25, col: '#1a0a04', ang: 1.2 } });
  blob([[90, -170 + b], [130, -250 + b], [170, -260 + b], [190, -230 + b], [150, -200 + b], [130, -150 + b]], { wash: col, washA: 1, w: 2, col: L });
  pencil([[100, -190 + b], [140, -255 + b]], { w: 8, col: '#1a0e08', pass2: false }); pencil([[-110, -150 + b], [-150 - Math.sin(ph) * 10, -100 + b]], { w: 9, col: '#1a0e08', pass2: false });
  if (rider) human(0, -150 + b, 0.62, t, rider); pop();
}
