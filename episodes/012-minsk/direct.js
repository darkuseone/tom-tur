/* Режиссура 002 — общий каркас. Конкретику каждой сцены задают миры через DIR[name] (см. scenes.js):
   outfit — костюм Тома (OUTFIT в tom.js), light {side, rim}, grade [цвет, сила], act() → [[t, эмоция], ...],
   pose(t, u, base) → объект для tom(), cam() → ключи камеры [[t, x, y, z, ease]] ('x' — экспо-провал), hud(t) — доп. надписи. */
const D_ = name => DIR[name] || {};
const ACTK = {}, CAMK = {};
function initDir() { SC.forEach(s => { const d = D_(s[0]); ACTK[s[0]] = d.act ? d.act() : [[s[1], 'talk']]; CAMK[s[0]] = d.cam ? d.cam() : [[s[1], 540, 960, 0]]; }); }
function actAt(name, t) {
  const K_ = ACTK[name] || [[0, 'neutral']]; let i = 0; while (i < K_.length - 1 && t >= K_[i + 1][0]) i++;
  const cur = K_[i], prev = i > 0 ? K_[i - 1] : cur, k = clamp((t - cur[0]) / 0.16), pop = i > 0 && t - cur[0] < 0.22 ? 0.09 * (1 - (t - cur[0]) / 0.22) : 0;
  return { expr: prev[1], expr2: cur[1], ek: i > 0 ? sm(k) : 1, pop };
}
function catPose(name, t, u) {
  const d = D_(name), A = actAt(name, t);
  const base = { t, x: 560, y: GY, s: 1.25, expr: A.expr, expr2: A.expr2, ek: A.ek, squash: A.pop, look: [0.2, 0], light: d.light || { side: 1, rim: '#ffe3a8' }, outfit: d.outfit || 'puffer', A };
  return d.pose ? d.pose(t, u, base) || base : base;
}
function catFor(name, t, u) { return () => { const P = catPose(name, t, u); tom(P); if (D_(name).afterCat) D_(name).afterCat(t, u, P); }; }
function camKeys(keys, t) {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], z: keys[0][3] };
  for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = clamp((t - a[0]) / Math.max(1e-3, b[0] - a[0])), k = b[4] === 'x' ? 1 - Math.pow(2, -10 * u) : sm(u); return { x: lerp(a[1], b[1], k), y: lerp(a[2], b[2], k), z: lerp(a[3], b[3], k) }; } }
  const l = keys[keys.length - 1]; return { x: l[1], y: l[2], z: l[3] };
}
function camFor(name, t) {
  const c = camKeys(CAMK[name] || [[0, 540, 960, 0]], t);
  const punch = CAPS.some(cc => t >= cc.t0 && t < cc.t0 + 0.22 && cc.words.some(w => KEYW.includes(w))) ? 0.035 : 0;
  c.z += punch; return c;
}
function placeholderWorld(name) { return (t, u, cat) => { lay(40, () => vgrad(-800, 2600, ['#2a2a3a', '#5a4a3a'])); lay(1, () => { txt(name, 540, 700, 120, { col: '#f6e7c8', font: 'Osw' }); cat(); }); }; }
let CAMV = 0;
function drawScene(i, t) {
  const name = SC[i][0], u = t - SC[i][1];
  CAM = camFor(name, t); const prev = camFor(name, t - 1 / 24); CAMV = Math.max(CAMV, Math.abs(CAM.z - prev.z) * 24 + Math.hypot(CAM.x - prev.x, CAM.y - prev.y) * 24 / 2500);
  const sh = shakeAmt(t), r = rng(hsh(FRAME, 99));
  push((r() - 0.5) * sh, (r() - 0.5) * sh, 1);
  (WORLD[name] || placeholderWorld(name))(t, u, catFor(name, t, u));
  pop();
}
initDir();
const TRANS = SC.filter(s => TRANS_IN[s[0]]).map(s => Object.assign({ t: s[1] }, TRANS_IN[s[0]]));
function frame(t) {
  CAMV = 0;
  if (typeof COVER_ON !== 'undefined' && COVER_ON) return drawCover();
  const tr = TRANS.find(q => t >= q.t - q.a && t < q.t + q.b);
  if (tr) {
    const iB = sceneAt(tr.t + 0.001), iA = iB - 1;
    renderTo(BUF[0], () => drawScene(iA, tr.holdA ? Math.min(t, tr.t - 0.001) : t < tr.t ? t : tr.t - 0.001 + (t - tr.t) * (tr.runA ?? 0)));
    renderTo(BUF[1], () => drawScene(iB, Math.max(t, tr.t)));
    const k = clamp((t - (tr.t - tr.a)) / (tr.a + tr.b));
    tr.fx(k, t, BUF[0], BUF[1]);
  } else drawScene(sceneAt(t), t);
  if (CAMV > 0.9) {                                                   // линии скорости при «провале» камеры
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; const a = clamp((CAMV - 0.9) / 3), r = rng(hsh(FRAME, 61));
    for (let i = 0; i < 46; i++) { const ang = r() * 6.283, d0 = 300 + r() * 300, d1 = d0 + 300 + r() * 700; pencil([[540 + Math.cos(ang) * d0, 900 + Math.sin(ang) * d0 * 1.3], [540 + Math.cos(ang) * d1, 900 + Math.sin(ang) * d1 * 1.3]], { w: 2 + r() * 3, col: i % 3 ? '#fff6e0' : '#1a120c', a: 0.55 * a, pass2: false, gap: false }); }
    ctx.restore(); }
}
function hudFrame(t) {
  if (typeof COVER_ON !== 'undefined' && COVER_ON) return coverHud();
  const name = SC[sceneAt(t)][0];
  if (name === SC[0][0] && t < EV.hookEnd) hook(t); else titleCard(t);
  if (D_(name).hud) D_(name).hud(t);
  plate(); captions(t); endcard(t);
}
function hook(t) {
  const k = popK(t, 0.0, 0.35); push(540, 470, 0.85 + 0.15 * k, -0.02);
  ctx.save(); ctx.font = '600 150px Osw'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const fit = Math.min(1, 900 / Math.max(...HOOK_LINES.map(s => ctx.measureText(s).width + 22))); ctx.scale(fit, fit);   // длинный хук ужимаем: края ≥ 70 px
  for (const [s, y, c] of [[HOOK_LINES[0], -86, '#f6ecd6'], [HOOK_LINES[1], 80, K.amber]]) { ctx.lineWidth = 22; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText(s, 0, y); ctx.fillStyle = c; ctx.fillText(s, 0, y); }
  ctx.restore(); pop();
}
function grade(name, o2) {                                         // цветокор на итоговом кадре: насыщенность (SAT из scenes.js, с 004 — 1.1) + тон + виньетка
  if (typeof SAT !== 'undefined' && SAT !== 1) { o2.save(); o2.globalCompositeOperation = 'copy'; o2.filter = `saturate(${SAT})`; o2.drawImage(o2.canvas, 0, 0); o2.restore(); }
  const [c, a] = D_(name).grade || ['#000000', 0];
  o2.save(); o2.globalCompositeOperation = 'soft-light'; o2.globalAlpha = a; o2.fillStyle = c; o2.fillRect(0, 0, W, H);
  o2.globalCompositeOperation = 'multiply'; o2.globalAlpha = 1; const v = o2.createRadialGradient(540, 900, 380, 540, 960, 1250); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(120,100,90,1)'); o2.fillStyle = v; o2.fillRect(0, 0, W, H);
  o2.restore();
}

/* ------------------------------------------------------------------ ОБЛОЖКА (cover.png и первые кадры ролика)
   Выпуск задаёт COVER = { scene, t, cam: {x,y,z}, pose: {...}, title: [[строка, цвет], ...], size, ty, badge, sub } (файл w_cover.js).
   tools/cover.cjs <эп> → episodes/<эп>/cover.png; render.sh кладёт её на первые 2 кадра ролика. */
let COVER_ON = false;
function drawCover() {
  const C = COVER, n = C.scene, t = C.t, u = t - S0[n]; CAM = Object.assign({ r: 0 }, C.cam);
  (WORLD[n] || placeholderWorld(n))(t, u, () => { const P = Object.assign(catPose(n, t, u), C.pose || {}); tom(P); if (D_(n).afterCat) D_(n).afterCat(t, u, P); });
}
function coverHud() {                                             // раскладка под сетку профиля: всё важное в центральной полосе 3:4 (y 240–1680)
  const C = COVER, size = C.size || 170, ty = C.ty || 440;
  ctx.save(); const g = ctx.createLinearGradient(0, 160, 0, 980); g.addColorStop(0, 'rgba(8,6,12,0.6)'); g.addColorStop(1, 'rgba(8,6,12,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 980); ctx.restore();
  push(540, ty, 1, -0.03);
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  C.title.forEach(([s, c], i) => { const fs = s.length > 9 ? size * 9.5 / s.length : size; ctx.font = `600 ${fs}px Osw`; const y = (i - (C.title.length - 1) / 2) * size * 1.08;
    ctx.lineWidth = 30; ctx.strokeStyle = 'rgba(10,6,4,0.96)'; ctx.strokeText(s, 0, y); ctx.fillStyle = c; ctx.fillText(s, 0, y); });
  ctx.restore(); pop();
  const by = ty + size * 0.54 * C.title.length + 80;                // плашка города сразу под заголовком
  push(540, by, 1, 0.02); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.9)'; ctx.fillRect(-400, -78, 800, 156); ctx.restore();
  pencil([[-400, -78], [400, -78], [400, 78], [-400, 78], [-400, -78]], { w: 5, col: K.amber, pass2: false });
  txt(C.badge || '', 0, -16, 104, { col: '#f6e7c8', font: 'Osw' }); txt('ТОМ-ТУР · ' + (C.sub || 'история за 60 секунд'), 0, 50, 42, { col: K.amber }); pop();
}
