/* ------------------------------------------------------------------ ОБЛОЖКА (cover.png и первые кадры ролика)
   Выпуск задаёт COVER = { scene, t, cam: {x,y,z}, pose: {...}, title: [[строка, цвет], ...], size, ty, badge, sub } (файл w_cover.js).
   tools/cover.cjs <эп> → episodes/<эп>/cover.png; render.sh кладёт её на первые 2 кадра ролика. */
var COVER_ON = false;
function drawCover() {
  const C = COVER, n = C.scene, t = C.t, u = t - S0[n]; CAM = Object.assign({ r: 0 }, C.cam);
  WORLD[n](t, u, () => { const P = Object.assign(catPose(n, t, u), C.pose || {}); tom(P); }, C.wopt || {});
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
/* Обложка 001: Таймс-сквер, сверху наползает ледяная стена, Том в шоке. */
const COVER = { scene: 'times', t: 1.6, cam: { x: 540, y: 470, z: 0.02 },
  pose: { x: 560, y: 1480, s: 1.2, expr: 'shock', expr2: 'shock', ek: 1, squash: 0, look: [0.1, -1], point: true, hand: [128, -330], watchInHand: false, glow: 0, tilt: -0.05 },
  wopt: { ice: 1.17 }, title: [['ЛЁД НАД', '#f6ecd6'], ['ТАЙМС-СКВЕР?!', '#e8a33c']], size: 160, ty: 440, badge: 'НЬЮ-ЙОРК', sub: 'история за 60 секунд' };
