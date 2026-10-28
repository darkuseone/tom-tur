/* ТОМ-ТУР — ядро движка (общее для всех выпусков): 2.5D-камера с глубиной, свет и воздух, частицы, HUD, буферы для переходов. */
const K = {
  ink: '#1d140e', amber: '#e8a33c', ember: '#ff8a3a', teal: '#3f8f95', cyan: '#7fd8ff', neonP: '#ff4f9a', neonC: '#36d6ff', neonY: '#ffd34a',
  slate: '#3b3a48', slateD: '#24232e', slateL: '#6d6a7e', garnet: '#a8243a', mica: '#e8e3f2', ice: '#cfe6f6', iceM: '#8ebede', iceD: '#3a6e9e',
  snow: '#eef2f4', fern: '#4f6b2e', fernD: '#2e4119', olive: '#6e6a3a', mud: '#6b5236', water: '#3d6f8e', waterL: '#8fbcd0',
  brick: '#8e4a35', stone: '#b9ab94', stoneD: '#7a6e5e', copper: '#c06a32', patina: '#5aa391', steel: '#59636e', steelD: '#30363d', paper: '#efe3c6', red: '#b8322a'
};
/* SC, S0/S1, LS/LE/LF, EV, SHAKES, YEARS, KEYW — объявляет выпуск в episodes/<NNN>/scenes.js */
const sceneAt = t => { let i = 0; while (i < SC.length - 1 && t >= SC[i + 1][1]) i++; return i; };
const talking = t => CAPS.some(c => t >= c.t0 && t < c.t1);
const GY = 1450;

// ------------------------------------------------------------------ camera with depth (мультиплан)
let CAM = { x: 540, y: 960, z: 0, r: 0 };
function lay(z, fn) {                                              // слой на глубине z (1 = плоскость героя)
  const d = z - CAM.z; if (d <= 0.04) return; const k = z / d;
  push(540 + (540 - CAM.x) / d, 960 + (960 - CAM.y) / d, k); ctx.translate(-540, -960); fn(); pop();
}
function screenFill(col, a, op) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; if (op) ctx.globalCompositeOperation = op; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function haze(col, a) { screenFill(col, a); }                      // воздушная перспектива между слоями
function vgrad(y0, y1, stops, a = 1) { const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(-1500, y0, W + 3000, y1 - y0); ctx.restore(); }
function glow(x, y, r, col, a = 1, op = 'lighter') { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = op; ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
function rays(x, y, ang, spread, len, col, a, n = 6, t = 0) {     // объёмные лучи
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const r = rng(i * 7 + 3), aa = ang + (i / (n - 1) - 0.5) * spread, w = 0.03 + r() * 0.05, fl = 0.6 + 0.4 * Math.sin(t * (0.8 + r()) + i * 2);
    const g = ctx.createLinearGradient(x, y, x + Math.cos(aa) * len, y + Math.sin(aa) * len); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a * fl; ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(aa - w) * len, y + Math.sin(aa - w) * len); ctx.lineTo(x + Math.cos(aa + w) * len, y + Math.sin(aa + w) * len); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
function motes(n, box, col, t, seed, o = {}) {                     // частицы воздуха: пыль, снег, пепел, светлячки
  const [x0, y0, x1, y1] = box; ctx.save(); if (o.add) ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const r = rng(seed * 1000 + i), sp = (o.sp || 30) * (0.5 + r()), ph = r() * 6.28, sz = (o.sz || 3) * (0.4 + r());
    const x = x0 + ((r() * (x1 - x0) + t * (o.vx || 0) * (0.5 + r()) + Math.sin(t * 0.7 + ph) * (o.wob ?? 18)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const y = y0 + ((r() * (y1 - y0) + t * sp) % (y1 - y0) + (y1 - y0)) % (y1 - y0);
    ctx.globalAlpha = (o.a || 0.8) * (o.tw ? 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + ph)) : 1); ctx.beginPath(); ctx.ellipse(x, y, sz, sz * (o.stretch || 1), o.rot || 0, 0, 6.3); ctx.fill(); }
  ctx.restore();
}
function poly(pts, o) { return shape(pts.concat([pts[0]]), o); }
function sil(pts, col, a = 1) { const p = pathOf(pts); wash(p, col, a); return p; }  // силуэт без линии (дальние планы)
function windows(x, y, w, h, cols, rows, seed, on = 0.55, cA = '#ffd98a', cB = '#9fd8ff', a = 0.9) {
  const r = rng(seed); const cw = w / cols, rh = h / rows; ctx.save();
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { if (r() > on) continue; ctx.globalAlpha = a * (0.55 + 0.45 * r()); ctx.fillStyle = r() < 0.75 ? cA : cB; ctx.fillRect(x + i * cw + cw * 0.22, y + j * rh + rh * 0.2, cw * 0.56, rh * 0.55); }
  ctx.restore();
}
function note(s, x, y, t, t0, t1, col = '#f3e6c8', size = 50, rot = -0.04, arr) {   // полевая заметка от руки
  if (t < t0 || t > t1) return; const rv = clamp((t - t0) / 0.45), fade = clamp((t1 - t) / 0.3);
  txt(s, x, y, size, { col, rot, reveal: rv, a: 0.95 * fade });
  if (arr && rv > 0.7) { line(arr, { w: 3.2, col, a: 0.9 * fade }); const n = arr.length, [x1, y1] = arr[n - 1], [x0, y0] = arr[n - 2], a = Math.atan2(y1 - y0, x1 - x0); line([[x1 - Math.cos(a - 0.5) * 22, y1 - Math.sin(a - 0.5) * 22], [x1, y1], [x1 - Math.cos(a + 0.5) * 22, y1 - Math.sin(a + 0.5) * 22]], { w: 3.2, col, a: 0.9 * fade, smooth: false }); }
}
function shakeAmt(t) { let s = 0; for (const [t0, d, a] of SHAKES) if (t >= t0 && t < t0 + d) s = Math.max(s, a * (1 - (t - t0) / d)); return s; }

// ------------------------------------------------------------------ buffers (для переходов)
const BUF = [0, 1].map(() => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; });
function renderTo(c, fn) { const prev = ctx, pS = S, pSS = SS.splice(0); ctx = c.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); S = 1; fn(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx = prev; S = pS; SS.push(...pSS); }

// ------------------------------------------------------------------ HUD: титр эпохи, таймлайн, субтитры, плашка
// Безопасные зоны (владелец, 23.10.2026): сверху 0–280 — статус-бар/чёлка/кнопки YouTube и поиск TikTok, снизу 1600–1920 — ник, описание, комментарии,
// справа x > 900 при y 900–1700 — лайки/комменты. Текст и важное — только внутри SAFE; там лишь фон.
const SAFE = { top: 280, bottom: 1600, left: 70, right: 900 };
function logPos(yr) { const ago = Math.max(1, 2026 - yr); return 1 - Math.log10(ago) / Math.log10(4.6e8); }   // 0 = 450 млн лет назад … 1 = сейчас
function titleCard(t) {
  const i = sceneAt(t), s = SC[i]; if (!s[3]) return; const u = t - s[1], roll = u < 0.5, k = popK(t, s[1], 0.3);
  push(540, 372, 0.9 + 0.1 * k);
  const g = ctx.createLinearGradient(-330, 0, 330, 0); g.addColorStop(0, 'rgba(18,12,10,0)'); g.addColorStop(0.2, 'rgba(18,12,10,0.62)'); g.addColorStop(0.8, 'rgba(18,12,10,0.62)'); g.addColorStop(1, 'rgba(18,12,10,0)');
  ctx.fillStyle = g; ctx.fillRect(-360, -88, 720, 170);
  let year = s[3]; if (roll) { const r = rng(hsh(FRAME, 5)); year = year.replace(/[0-9]/g, () => String(Math.floor(r() * 10))); }
  txt(year, 0, -18, 104, { col: roll ? '#9fd8ff' : '#f6e7c8', font: 'Osw', a: 0.97 });
  txt(s[4], 0, 54, 34, { col: K.amber, font: 'Osw', a: 0.95 });
  pop();
  if (typeof PROGRESS !== 'undefined' && PROGRESS) return progressDots(i, u);   // короткая история (≤ 200 лет): точки «эпоха n/N» вместо шкалы 450 млн лет
  // таймлайн: логарифмическая шкала 450 млн лет → сегодня, маркер едет к эпохе
  const y = 488, x0 = 140, x1 = 940; const prev = i > 0 ? SC.slice(0, i).reverse().find(q => YEARS[q[0]] !== undefined) : null;
  const p1 = logPos(YEARS[s[0]] ?? 2026), p0 = prev ? logPos(YEARS[prev[0]]) : p1, p = lerp(p0, p1, sm(u / 0.6));
  ctx.save(); ctx.globalAlpha = 0.75; ctx.fillStyle = 'rgba(18,12,10,0.45)'; ctx.fillRect(x0 - 20, y - 16, x1 - x0 + 40, 32); ctx.restore();
  pencil([[x0, y], [x1, y]], { w: 2, col: '#f6e7c8', a: 0.8, pass2: false, gap: false });
  [['−450 млн', -4.5e8], ['−1 млн', -1e6], ['−1000', 1026], ['2026', 2026]].forEach(([l, yr]) => { const x = lerp(x0, x1, logPos(yr)); pencil([[x, y - 8], [x, y + 8]], { w: 2, col: '#f6e7c8', a: 0.7, pass2: false }); txt(l, x, y + 26, 20, { col: '#f6e7c8', font: 'Osw', a: 0.7 }); });
  const mx = lerp(x0, x1, p); ell(mx, y, 9, 9, { wash: K.amber, washA: 1, w: 2, col: '#2a1a0c' }); glow(mx, y, 40, 'rgba(255,190,90,0.8)', 0.6);
}
function captions(t) {
  const c = CAPS.find(c => t >= c.t0 && t < c.t1 + 0.08); if (!c) return;
  const y = 1480, size = 82; ctx.save(); ctx.font = `600 ${size}px Osw`;
  const parts = c.words.map(w => ({ w, key: KEYW.includes(w) })); const sp = ctx.measureText(' ').width, widths = parts.map(p => ctx.measureText(p.w).width);
  const tw = widths.reduce((a, b) => a + b, 0) + sp * (parts.length - 1); ctx.restore();
  const k = popK(t, c.t0, 0.18); push(540, y, 0.92 + 0.08 * k);
  const rv = clamp(0.3 + (t - c.t0) / 0.16); let x = -tw / 2;
  parts.forEach((p, i) => { const wr = clamp(rv * parts.length - i); if (wr <= 0) { x += widths[i] + sp; return; }
    ctx.save(); ctx.font = `600 ${size}px Osw`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.globalAlpha = wr; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(16,10,8,0.92)'; ctx.strokeText(p.w, x, 0);
    ctx.fillStyle = p.key ? K.amber : '#f7ecd6'; ctx.fillText(p.w, x, 0); ctx.restore();
    if (p.key && wr >= 1) pencil([[x, 46], [x + widths[i], 42]], { w: 4, col: K.amber, a: 0.9, pass2: false, gap: false });
    x += widths[i] + sp; });
  pop();
}
function plate() { push(540, 540, 1); txt('ТОМ-ТУР · ' + (typeof SUBTITLE !== 'undefined' ? SUBTITLE : ''), 0, 0, 30, { col: '#f6e7c8', a: 0.75 }); pop(); }   // под таймлайном, не в зоне статус-бара
function endcard(t) { if (t < DUR - 1.0) return; const k = popK(t, DUR - 1.0, 0.3); push(540, 1180, k, -0.03);
  ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.82)'; ctx.fillRect(-330, -80, 660, 160); ctx.restore(); pencil([[-330, -80], [330, -80], [330, 80], [-330, 80], [-330, -80]], { w: 3, col: K.amber, pass2: false });
  txt('ПОДПИШИСЬ', -50, 4, 104, { col: '#f6e7c8', font: 'Osw' });
  push(282, -6, 1, Math.sin(t * 30) * 0.25); blob([[-26, 22], [-22, -16], [0, -30], [22, -16], [26, 22]], { wash: K.amber, washA: 1, w: 3, col: '#2a1a0c' }); ell(0, 28, 8, 6, { wash: K.amber, washA: 1, w: 2.4 }); pop(); pop(); }

/* ------------------------------------------------------------------ удержание (28.10.2026, разбор Gemini/YouTube Studio: «продолжили смотреть» 59–69 %, у Минска 76 %)
   progressDots — видимый прогресс «эпоха n/N» (мотив досмотреть). Включается в scenes.js: const PROGRESS = 'ДОСЬЕ' (подпись) или true.
   qchip — открытая петля: вопрос хука висит плашкой под «ТОМ-ТУР» от конца хука до ответа, на ответе плашка меняется на ответ и гаснет.
   scenes.js: const QUESTION = { q: 'ЧТО В ГОРЕ?', a: 'ПЛУТОНИЙ ДЛЯ БОМБ', at: () => EV.answer }. y ≈ 612 → HUD сцены — ниже 680. */
function progressDots(i, u) {
  const eps = SC.filter((s, j) => j > 0 && s[3] && YEARS[s[0]] !== undefined), N = eps.length, n = eps.findIndex(s => s[0] === SC[i][0]) + 1; if (!N || n < 1) return;
  const y = 488, gap = Math.min(64, 560 / N), x0 = 540 - gap * (N - 1) / 2 - 50;
  ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = 'rgba(18,12,10,0.5)'; ctx.fillRect(x0 - 34, y - 22, gap * (N - 1) + 180, 44); ctx.restore();
  pencil([[x0, y], [x0 + gap * (N - 1), y]], { w: 2, col: '#f6e7c8', a: 0.5, pass2: false, gap: false });
  for (let j = 1; j <= N; j++) { const x = x0 + gap * (j - 1), cur = j === n, k = cur ? popK(u, 0, 0.35) : 1, r = cur ? 9 + 5 * k : 7;
    ell(x, y, r, r, { wash: j < n ? '#f6e7c8' : cur ? K.amber : 'rgba(0,0,0,0)', washA: 1, w: 2, col: j > n ? '#f6e7c8' : '#2a1a0c' }); if (cur) glow(x, y, 42, 'rgba(255,190,90,0.8)', 0.5 * k); }
  txt(`${n}/${N}`, x0 + gap * (N - 1) + 70, y + 2, 32, { col: K.amber, font: 'Osw', a: 0.95 });
}
function qchip(t) {
  if (typeof QUESTION === 'undefined' || t < EV.hookEnd || t > DUR - 1.1) return;
  const at = QUESTION.at(), ans = t >= at; if (ans && t > at + 3.2) return;
  const i = sceneAt(t), k = ans ? popK(t, at, 0.4) : popK(t, Math.max(SC[i][1], EV.hookEnd), 0.35), fade = ans ? clamp((at + 3.2 - t) / 0.4) : 1;
  const s = ans ? '✓ ' + QUESTION.a : '? ' + QUESTION.q, size = ans ? 52 : 42;
  ctx.save(); ctx.font = `600 ${size}px Osw`; const w = ctx.measureText(s).width + 56; ctx.restore();
  push(540, 612, (0.9 + 0.1 * k) * (ans ? 1 + 0.12 * (1 - k) : 1), -0.015); ctx.save(); ctx.globalAlpha = fade;
  ctx.fillStyle = ans ? 'rgba(120,30,20,0.92)' : 'rgba(16,10,8,0.82)'; ctx.fillRect(-w / 2, -size * 0.75, w, size * 1.5); ctx.restore();
  pencil([[-w / 2, -size * 0.75], [w / 2, -size * 0.75], [w / 2, size * 0.75], [-w / 2, size * 0.75], [-w / 2, -size * 0.75]], { w: 3, col: K.amber, a: fade, pass2: false });
  txt(s, 0, 2, size, { col: ans ? '#fff2d6' : K.amber, font: 'Osw', a: fade }); pop();
}
