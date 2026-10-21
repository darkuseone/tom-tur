/* 003 (из 002) — общие детали, туннель времени и реквизит, которые могут брать все миры выпуска. */
function lerpC(a, b, k) { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join(''); }
function hills(y, amp, col, seed, a = 1) { const pts = [[-1200, 2400]]; for (let x = -1200; x <= W + 1200; x += 40) pts.push([x, y - Math.abs(Math.sin(x * 0.004 + seed)) * amp - Math.sin(x * 0.011 + seed * 2) * amp * 0.25]); pts.push([W + 1200, 2400]); return sil(pts, col, a); }
function poster(x, y, s, rot, title, c1, c2, kind, t) {              // винтажный трэвел-постер города
  push(x, y, s, rot); rect(-120, -170, 240, 340, { wash: c1, washA: 0.98, w: 3, col: '#1a0e06' });
  ctx.save(); ctx.beginPath(); ctx.rect(-120, -170, 240, 340); ctx.clip(); { const g = ctx.createLinearGradient(0, -170, 0, 110); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(-120, -170, 240, 340); }
  if (kind === 'eiffel') { poly([[-60, 100], [-8, -120], [8, -120], [60, 100], [30, 100], [0, 10], [-30, 100]], { wash: '#2a1a1a', washA: 1, w: 2 }); }
  if (kind === 'col') { ell(0, 40, 100, 70, { wash: '#c8a070', washA: 1, w: 2 }); for (let q = -3; q <= 3; q++) rect(q * 26 - 8, 0, 16, 40, { wash: '#2a1a10', washA: 0.8, line: false }); }
  if (kind === 'fuji') { poly([[-120, 110], [0, -60], [120, 110]], { wash: '#3a4a7a', washA: 1, w: 2 }); poly([[-34, -10], [0, -60], [34, -10], [12, 0], [0, -14], [-12, 0]], { wash: '#f4f4f4', washA: 1, w: 1.6 }); ctx.fillStyle = '#d83a3a'; ctx.beginPath(); ctx.arc(60, -100, 30, 0, 6.3); ctx.fill(); }
  if (kind === 'tower') { rect(-22, -40, 44, 150, { wash: '#a83a2a', washA: 1, w: 2 }); poly([[-28, -40], [0, -120], [28, -40]], { wash: '#2a6a3a', washA: 1, w: 2 }); ctx.fillStyle = '#ffd34a'; ctx.beginPath(); ctx.arc(0, -126, 6, 0, 6.3); ctx.fill(); }
  ctx.restore(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-120, 110, 240, 60); txt(title, 0, 141, 40, { col: '#f6e7c8', font: 'Osw' }); pop();
}
function wTunnel(t, u, cat) {                                      // внутри часов: шестерни, римские цифры, светящаяся линия времени
  screenFill('#120c08', 1);
  const cx = 540, cy = 900;
  for (let k = 0; k < 14; k++) { const ph = (u * 1.6 + k / 14) % 1, z = Math.pow(ph, 2.2), r = 30 + z * 1500, a = Math.min(1, ph * 2) * (1 - ph * 0.3), rot = t * (k % 2 ? 1.5 : -1.1) + k;
    push(cx, cy, 1, rot); const teeth = 24 + k % 3 * 8; const pts = []; for (let i = 0; i <= teeth * 2; i++) { const aa = i / (teeth * 2) * 6.283, rr = r * (i % 2 ? 1 : 1.06); pts.push([Math.cos(aa) * rr, Math.sin(aa) * rr]); }
    pencil(pts, { w: 2 + z * 8, col: k % 3 ? '#c99636' : '#f1d27a', a: 0.85 * a, pass2: false, gap: false });
    if (k % 2 === 0) for (let n = 0; n < 12; n++) { const aa = n / 12 * 6.283; push(Math.cos(aa) * r * 0.86, Math.sin(aa) * r * 0.86, 1, aa + Math.PI / 2); txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], 0, 0, 10 + z * 70, { col: '#f6e2b0', font: 'Osw', a: 0.8 * a }); pop(); }
    pop(); }
  glow(cx, cy, 500, 'rgba(255,200,110,0.9)', 0.5);
  const yrs = ['1989', '1969', '1948', '1862', '1831', '1806', '1700', '1237', '−20 000', '2026'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

WORLD.tunnel = wTunnel;
DIR.tunnel = { outfit: 'hoodieB', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.2], act: () => [[S0.tunnel, 'awe']],
  pose: (t, u, b) => Object.assign(b, { x: 540, y: 1260, s: 1.0, rot: u * 3.2, look: [0, -0.2], watchInHand: true, glow: 1, spin: 1.5 }),
  cam: () => [[S0.tunnel, 540, 960, 0], [S1.tunnel, 540, 960, 0.1]] };

/* ---- 003 Киев: общие детали ---- */
/* Otodus (родня мегалодона), профиль мордой вправо. jaw 0..1 — открыта пасть, ghost — призрак (полупрозрачный, без штриховки), glowEye 0..1 */
function shark(x, y, s, t, o = {}) {
  const jaw = o.jaw || 0, a = o.a ?? 1, ghost = o.ghost || 0, sw = Math.sin(t * (o.sp || 3)) * 0.08, fl = o.flip || 1;
  const C = o.col || '#6c7f8c', CD = o.colD || '#26343e', CL = o.colL || '#d8e0e2';
  push(x, y, s, o.rot || 0, fl); ctx.save(); ctx.globalAlpha = a;
  const tw = sw * 120;                                                    // изгиб хвоста
  // хвостовой плавник (полумесяц)
  const tail = blob([[-400, -10], [-470, -110 + tw], [-560, -210 + tw], [-520, -60 + tw], [-500, 10 + tw], [-540, 130 + tw], [-450, 60 + tw], [-400, 20]], { wash: C, washA: 0.96, w: 3, col: CD, key: 7101 });
  if (!ghost) shadeG(tail.path, -560, 0, -400, 0, CD, 0.4);
  // грудной (дальний) плавник
  blob([[140, 40], [90, 120], [20, 190], [60, 120], [70, 50]], { wash: lerpC(C, '#000000', 0.25), washA: 0.9, w: 2.4, col: CD });
  // тело
  const top = [[-400, -10], [-300, -50 + tw * 0.2], [-160, -96], [40, -128], [200, -118], [320, -76], [400, -30], [430, 0]];
  const bot = [[430, 0], [400, 30], [330, 50 - jaw * 6], [200, 80], [40, 96], [-160, 70], [-300, 36 + tw * 0.2], [-400, 20]];
  const body = blob(top.concat(bot), { wash: C, washA: 0.97, w: 3.4, col: CD, key: 7102 });
  // светлое брюхо (противотень)
  ctx.save(); ctx.clip(body.path); ctx.fillStyle = CL; ctx.globalAlpha = a * 0.85; ctx.beginPath(); ctx.moveTo(-420, 30); for (let k = 0; k <= 20; k++) { const xx = -420 + k * 44; ctx.lineTo(xx, 24 + Math.sin(k * 1.3) * 4 - Math.max(0, xx - 200) * 0.12); } ctx.lineTo(460, 140); ctx.lineTo(-420, 140); ctx.fill(); ctx.restore();
  if (!ghost) { hatch(body.path, body.bb, { gap: 7, a: 0.22, col: CD, ang: -0.35, key: 7103, w: 1.4 }); shadeG(body.path, 0, -130, 0, 20, '#0e1820', 0.35); }
  // спинной и второй спинной, брюшной плавники
  blob([[-10, -122], [60, -250], [120, -268], [110, -210], [150, -118]], { wash: C, washA: 0.97, w: 3, col: CD, key: 7104 });
  blob([[-300, -46], [-320, -96], [-280, -60]], { wash: C, washA: 0.97, w: 2, col: CD });
  blob([[-200, 66], [-250, 120], [-170, 76]], { wash: C, washA: 0.97, w: 2, col: CD });
  // ближний грудной
  blob([[180, 60], [140, 150], [60, 240], [130, 220], [230, 80]], { wash: C, washA: 0.98, w: 3, col: CD, key: 7105 });
  // жабры
  for (let k = 0; k < 5; k++) pencil([[250 - k * 20, -60], [244 - k * 20, -10], [252 - k * 20, 40]], { w: 2.2, col: CD, a: 0.8, pass2: false });
  // пасть: нижняя челюсть открывается
  const jx = 360, jy = 26, ja = jaw * 0.5;
  ctx.save(); ctx.fillStyle = '#3a0e12'; ctx.beginPath(); ctx.moveTo(250, 30); ctx.lineTo(420, 6); ctx.lineTo(250 + 170 * Math.cos(ja), 30 + 170 * Math.sin(ja) + 10); ctx.closePath(); ctx.globalAlpha = a * clamp(jaw * 3); ctx.fill(); ctx.restore();
  pencil([[250, 30], [330, 22], [420, 6]], { w: 3, col: CD, pass2: false });
  pencil([[250, 32], [250 + 85 * Math.cos(ja), 34 + 85 * Math.sin(ja) + 6], [250 + 165 * Math.cos(ja), 34 + 165 * Math.sin(ja) + 8]], { w: 3, col: CD, pass2: false });
  for (let k = 0; k < 7; k++) { const u = 0.15 + k * 0.12, ux = lerp(250, 418, u), uy = lerp(30, 8, u); poly([[ux - 7, uy], [ux + 7, uy], [ux, uy + 16 + jaw * 6]], { wash: '#f4efe2', washA: 1, w: 1.2, col: '#5a5048' });
    const lx = 250 + 165 * u * Math.cos(ja), ly = 36 + 165 * u * Math.sin(ja) + 8 * u; if (jaw > 0.1) poly([[lx - 6, ly], [lx + 6, ly], [lx, ly - 14]], { wash: '#f4efe2', washA: 1, w: 1.2, col: '#5a5048' }); }
  // глаз
  ell(330, -36, 11, 9, { wash: '#101418', washA: 1, w: 2, col: CD }); ell(327, -39, 3, 3, { wash: '#ffffff', washA: 0.9, line: false });
  if (o.glowEye) glow(330, -36, 70, 'rgba(255,220,120,1)', 0.8 * o.glowEye);
  ctx.restore(); pop();
}
/* позвонок акулы — «таблетка» с кольцами роста (находка из метро) */
function vertebra(x, y, r, rot, o = {}) {
  push(x, y, 1, rot); const c = ell(0, 0, r, r * 0.92, { wash: o.col || '#cdbb96', washA: 1, w: 2.4, col: '#4a3a24', key: 7120 + Math.round(r) });
  shadeG(c.path, -r, -r, r, r, '#5a4628', 0.45); for (let k = 1; k < 5; k++) pencil(ellPts(0, 0, r * k / 5, r * 0.92 * k / 5, 0, 0.05, 30), { w: 1.3, col: '#6a5434', a: 0.7, pass2: false, gap: false });
  ell(0, 0, r * 0.14, r * 0.13, { wash: '#4a3a24', washA: 0.9, line: false }); pop();
}
/* мерцание огня (свеча, факел, костёр) */
const flick = (t, k = 0) => 1 + Math.sin(t * 17 + k) * 0.07 + Math.sin(t * 7.3 + k * 2) * 0.05;
function candle(x, y, s, t, k = 0, lit = 1) {
  push(x, y, s); const b = rect(-9, -64, 18, 64, { wash: '#efe2bf', washA: 1, w: 1.8, col: '#6a5a3a', key: 7130 + k }); shadeG(b.path, -9, 0, 9, 0, '#a08a5a', 0.4);
  blob([[-9, -64], [-4, -58], [0, -66], [5, -60], [9, -64]], { wash: '#f8eed0', washA: 1, w: 1.2, col: '#8a7a5a' }); pencil([[0, -64], [0, -72]], { w: 1.6, col: '#2a1a0a', pass2: false });
  if (lit) { const f = flick(t, k); glow(0, -84, 110, 'rgba(255,190,90,1)', 0.55 * lit); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#ffb44a'; ctx.beginPath(); ctx.ellipse(0, -84, 7 * f, 16 * f, Math.sin(t * 5 + k) * 0.1, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff4cc'; ctx.beginPath(); ctx.ellipse(0, -80, 3.4, 8 * f, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  pop();
}

/* ---- 003: персонаж-человек (вместо «сосисок»): ноги, туловище с одеждой, руки с ладонями, лицо с мимикой, волосы/борода, шапки, реквизит.
   human(x, y, s, t, o): ноги в (x,y), рост ≈ 330·s. o: body, bodyD, trim, belt, legs, boots, skin, hair, beard ('short'|'long'|null), hat
   ('fur'|'merchant'|'helmet'|'cap'|'scarf'|'crown'|'hood'|'hood2'|null), hatCol, face ('smile'|'shock'|'grin'|'angry'|'calm'), look (−1…1),
   armL/armR ('down'|'up'|'point'|'hips'|'hold'|'wave'|'swing'), prop ('stick'|'spear'|'sword'|'candle'|'phone'|'scroll'|'axe'|'oar'), flip, long (до пят), seed */
function human(x, y, s, t, o = {}) {
  const sk = o.skin || '#e2b48e', skD = '#a8764e', L = '#1c120a', bc = o.body || '#6a4a3a', bd = o.bodyD || lerpC(bc, '#000000', 0.45), sd = o.seed || 1;
  const br = Math.sin(t * 2 + sd) * 2, fl = o.flip || 1;
  push(x, y, s, 0, fl);
  ell(0, 2, 70, 12, { wash: '#000000', washA: 0.18, line: false });
  // ноги
  if (!o.long) for (const k of [-1, 1]) { const lg = shape([[k * 8, -120], [k * 34, -120], [k * 30, -16], [k * 12, -16]], { wash: o.legs || '#3a3028', washA: 1, w: 2.2, col: L, key: 7900 + sd * 3 + k });
    blob([[k * 6, -20], [k * 34, -22], [k * 42 + k * 8, -4], [k * 40, 4], [k * 4, 4]], { wash: o.boots || '#2a1a10', washA: 1, w: 2.2, col: L }); }
  // туловище
  const top = -238 + br, hem = o.long ? -6 : -112;
  const B = [[-56, hem], [-50, top + 60], [-44, top + 14], [-16, top], [16, top], [44, top + 14], [50, top + 60], [56, hem]];
  const bp = blob(B, { wash: bc, washA: 1, w: 2.6, col: L, key: 7910 + sd });
  shadeG(bp.path, 56, 0, -20, 0, bd, 0.55); hatch(bp.path, bp.bb, { gap: 7, a: 0.12, col: bd, ang: 1.2, key: 7911 + sd, w: 1.2 });
  if (o.trim) { pencil([[0, top + 4], [0, hem]], { w: 5, col: o.trim, a: 0.9, pass2: false }); pencil([[-56, hem + 2], [56, hem + 2]], { w: 7, col: o.trim, pass2: false }); for (let q = 0; q < 5; q++) ell(0, top + 30 + q * 26, 3, 3, { wash: o.trim, washA: 1, line: false }); }
  if (o.belt) { rect(-54, top + 92, 108, 13, { wash: o.belt, washA: 1, w: 1.8, col: L }); rect(-8, top + 90, 16, 17, { wash: '#c8a040', washA: 1, w: 1.4, col: '#5a3a08' }); }
  // руки
  const arm = (side, mode) => { const sx = side * 46, sy = top + 22; let ex, ey, hx, hy;
    const sw = Math.sin(t * 9 + sd) ;
    if (mode === 'up') { ex = side * 74; ey = sy - 40; hx = side * 82; hy = sy - 104; }
    else if (mode === 'point') { ex = side * 96; ey = sy + 6; hx = side * 150; hy = sy - 6; }
    else if (mode === 'hips') { ex = side * 84; ey = sy + 54; hx = side * 52; hy = sy + 92; }
    else if (mode === 'hold') { ex = side * 62; ey = sy + 66; hx = side * 30; hy = sy + 84; }
    else if (mode === 'wave') { ex = side * 84; ey = sy - 30; hx = side * 96 + Math.sin(t * 10 + sd) * 14; hy = sy - 92; }
    else if (mode === 'swing') { ex = side * (70 + sw * 10); ey = sy - 20 - sw * 30; hx = side * (80 + sw * 30); hy = sy - 90 - sw * 50; }
    else { ex = side * 60; ey = sy + 64; hx = side * 62; hy = sy + 120; }
    shape(tubeP([[sx, sy], [ex, ey], [hx, hy]], 30, 22), { wash: bc, washA: 1, w: 2.2, col: L });
    ell(hx, hy, 13, 14, { wash: sk, washA: 1, w: 2, col: L }); return [hx, hy]; };
  const hL = arm(-1, o.armL || 'down'), hR = arm(1, o.armR || 'down');
  if (o.prop) { const [hx, hy] = hR; push(hx, hy, 1, o.propAng || 0);
    if (o.prop === 'stick' || o.prop === 'oar') { pencil([[0, 60], [0, -150]], { w: o.prop === 'oar' ? 10 : 9, col: '#6a4424' }); if (o.prop === 'oar') ell(0, 80, 18, 46, { wash: '#8a5a32', washA: 1, w: 2 }); }
    if (o.prop === 'spear') { pencil([[0, 80], [0, -230]], { w: 7, col: '#6a4424' }); poly([[-9, -226], [9, -226], [0, -280]], { wash: '#a8acb0', washA: 1, w: 1.8, col: L }); }
    if (o.prop === 'sword') { pencil([[0, 14], [0, -150]], { w: 9, col: '#c8ccd0' }); pencil([[-22, 8], [22, 8]], { w: 7, col: '#8a6a3a' }); }
    if (o.prop === 'axe') { pencil([[0, 60], [0, -110]], { w: 8, col: '#6a4424' }); blob([[0, -110], [40, -130], [46, -80], [0, -84]], { wash: '#9aa0a6', washA: 1, w: 2, col: L }); }
    if (o.prop === 'candle') candle(0, 0, 0.8, t, sd);
    if (o.prop === 'phone') { rect(-10, -34, 20, 34, { wash: '#1a1a20', washA: 1, w: 1.4 }); glow(0, -18, 40, 'rgba(160,210,255,1)', 0.6); }
    if (o.prop === 'scroll') { rect(-30, -50, 60, 70, { wash: '#efe0b8', washA: 1, w: 1.8, col: L }); for (let q = 0; q < 4; q++) pencil([[-20, -36 + q * 14], [20, -36 + q * 14]], { w: 1.4, col: '#5a3a14', pass2: false }); }
    if (o.prop === 'hammer') { pencil([[0, 40], [0, -100]], { w: 8, col: '#6a4424' }); rect(-24, -118, 48, 24, { wash: '#6a6e74', washA: 1, w: 2, col: L }); }
    if (o.prop === 'flag') { pencil([[0, 60], [0, -200]], { w: 6, col: '#6a4424' }); const fw = Math.sin(t * 6 + sd) * 8; for (const [c, dy] of (o.flagC || [['#1a1a1a', 0], ['#c8241e', 26], ['#e8c020', 52]])) shape([[0, -200 + dy], [90, -196 + dy + fw], [94, -170 + dy + fw], [0, -174 + dy]], { wash: c, washA: 1, w: 1.6, col: L }); }
    if (o.prop === 'bucket') { poly([[-26, -10], [26, -10], [20, 40], [-20, 40]], { wash: '#8a8e94', washA: 1, w: 2, col: L }); pencil(spline([[-26, -10], [0, -40], [26, -10]], false, 6), { w: 2, col: L, pass2: false }); }
    if (o.prop === 'baguette') { push(0, 0, 1, -0.9); ell(0, -40, 13, 70, { wash: '#d89a4a', washA: 1, w: 2, col: '#6a3a14' }); for (let q = 0; q < 4; q++) pencil([[-6, -80 + q * 26], [6, -70 + q * 26]], { w: 2, col: '#8a5a24', pass2: false }); pop(); }
    if (o.prop === 'camera') { rect(-24, -30, 48, 34, { wash: '#2a2a2e', washA: 1, w: 1.8, col: L }); ell(0, -13, 11, 11, { wash: '#4a5a6a', washA: 1, w: 1.6, col: L }); ell(-3, -16, 3, 3, { wash: '#ffffff', washA: 0.8, line: false }); }
    if (o.prop === 'pan') { pencil([[0, 0], [70, -10]], { w: 7, col: '#2a2a2a' }); ell(110, -14, 46, 14, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); for (const bx of [92, 112, 130]) ell(bx, -22, 11, 8, { wash: '#8a4a24', washA: 1, w: 1.4, col: L }); }
    if (o.prop === 'chisel') { pencil([[0, 30], [0, -60]], { w: 7, col: '#8a8e94' }); }
    pop(); }
  // голова
  const hy = top - 46, lk = (o.look || 0) * 6;
  ell(0, top - 6, 16, 14, { wash: sk, washA: 1, w: 1.6, col: L });
  const hp = ell(0, hy, 40, 46, { wash: sk, washA: 1, w: 2.4, col: L, key: 7920 + sd }); shadeG(hp.path, 40, 0, -10, 0, skD, 0.4);
  for (const ex of [-42, 42]) ell(ex, hy + 2, 7, 11, { wash: sk, washA: 1, w: 1.6, col: L });
  if (o.hair) blob([[-42, hy - 4], [-36, hy - 40], [0, hy - 52], [36, hy - 40], [42, hy - 4], [30, hy - 26], [-30, hy - 26]], { wash: o.hair, washA: 1, w: 1.8, col: L });
  const f = o.face || 'calm', blink = Math.sin(t * 2.3 + sd * 3) > 0.97;
  for (const ex of [-15, 15]) { if (blink || f === 'grin') pencil([[ex - 6 + lk, hy - 6], [ex + 6 + lk, hy - 6]], { w: 2.6, col: L, pass2: false }); else { ell(ex + lk, hy - 6, f === 'shock' ? 6 : 4.5, f === 'shock' ? 7 : 5, { wash: '#f8f4ea', washA: 1, w: 1.2, col: L }); ell(ex + lk * 1.3, hy - 5, 2.6, 2.8, { wash: L, washA: 1, line: false }); } }
  const bry = f === 'angry' ? [[-22, hy - 22], [-8, hy - 16]] : f === 'shock' ? [[-22, hy - 26], [-8, hy - 28]] : [[-22, hy - 20], [-8, hy - 22]];
  pencil(bry, { w: 3, col: o.hair || L, pass2: false }); pencil(bry.map(([a, b]) => [-a, b]).reverse(), { w: 3, col: o.hair || L, pass2: false });
  pencil([[lk, hy - 2], [lk - 5, hy + 12], [lk + 3, hy + 14]], { w: 2, col: skD, pass2: false });
  if (f === 'shock') ell(0, hy + 26, 9, 11, { wash: '#4a1a10', washA: 1, w: 1.6, col: L }); else if (f === 'smile' || f === 'grin') blob([[-14, hy + 22], [14, hy + 22], [0, hy + 32]], { wash: '#5a1a10', washA: 1, w: 1.6, col: L }); else if (f === 'angry') pencil([[-12, hy + 28], [0, hy + 24], [12, hy + 28]], { w: 2.6, col: L, pass2: false }); else pencil([[-10, hy + 26], [10, hy + 26]], { w: 2.2, col: L, pass2: false });
  if (o.beard) blob([[-38, hy + 6], [-30, hy + (o.beard === 'long' ? 70 : 44)], [0, hy + (o.beard === 'long' ? 88 : 56)], [30, hy + (o.beard === 'long' ? 70 : 44)], [38, hy + 6], [18, hy + 20], [0, hy + 34], [-18, hy + 20]], { wash: o.hair || '#5a3a1a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.25, col: L, ang: 1.5 } });
  const hc = o.hatCol || '#a8241e';
  if (o.hat === 'fur') { blob([[-38, hy - 30], [-30, hy - 76], [0, hy - 88], [30, hy - 76], [38, hy - 30]], { wash: hc, washA: 1, w: 2.2, col: L }); rect(-44, hy - 42, 88, 22, { wash: '#4a3020', washA: 1, w: 2, col: L, shade: { gap: 4, a: 0.4, col: L, ang: 1.5 } }); }
  if (o.hat === 'merchant') { blob([[-44, hy - 30], [-26, hy - 84], [26, hy - 84], [44, hy - 30]], { wash: hc, washA: 1, w: 2.2, col: L }); rect(-48, hy - 40, 96, 16, { wash: '#d6a842', washA: 1, w: 1.6, col: L }); }
  if (o.hat === 'helmet') { const h = blob([[-44, hy - 18], [-40, hy - 58], [0, hy - 96], [40, hy - 58], [44, hy - 18]], { wash: '#9aa0a6', washA: 1, w: 2.4, col: L }); metalG(h.path, 14, hy - 60, 60, '#ffffff', '#9aa0a6', '#3a4048'); rect(-4, hy - 22, 8, 30, { wash: '#8a9096', washA: 1, w: 1.4 }); }
  if (o.hat === 'cap') { blob([[-42, hy - 26], [-36, hy - 60], [36, hy - 60], [42, hy - 26]], { wash: hc, washA: 1, w: 2.2, col: L }); ell(28, hy - 26, 34, 8, { wash: lerpC(hc, '#000000', 0.3), washA: 1, w: 1.8, col: L }); }
  if (o.hat === 'scarf') blob([[-48, hy + 20], [-46, hy - 36], [0, hy - 58], [46, hy - 36], [48, hy + 20], [34, hy - 20], [-34, hy - 20]], { wash: hc, washA: 1, w: 2.2, col: L });
  if (o.hat === 'crown') { rect(-40, hy - 50, 80, 18, { wash: '#d6a842', washA: 1, w: 1.8, col: '#6a4a08' }); for (let q = 0; q < 5; q++) poly([[-40 + q * 20, hy - 50], [-30 + q * 20, hy - 74], [-20 + q * 20, hy - 50]], { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' }); }
  if (o.hat === 'hood' || o.hat === 'hood2') blob([[-50, hy + 30], [-52, hy - 30], [0, hy - (o.hat === 'hood2' ? 100 : 70)], [52, hy - 30], [50, hy + 30], [38, hy - 10], [-38, hy - 10]], { wash: hc, washA: 1, w: 2.2, col: L, shade: { gap: 5, a: 0.3, col: L, ang: 1.2 } });
  if (o.hat === 'tricorn') { const h = blob([[-62, hy - 30], [-44, hy - 66], [0, hy - 80], [44, hy - 66], [62, hy - 30], [24, hy - 46], [0, hy - 40], [-24, hy - 46]], { wash: hc, washA: 1, w: 2.2, col: L }); pencil([[-60, hy - 32], [-24, hy - 48], [0, hy - 42], [24, hy - 48], [60, hy - 32]], { w: 2.4, col: '#d6a842', pass2: false }); }
  if (o.hat === 'bicorne') { blob([[-78, hy - 32], [-40, hy - 86], [0, hy - 92], [40, hy - 86], [78, hy - 32], [30, hy - 52], [-30, hy - 52]], { wash: '#141216', washA: 1, w: 2.2, col: L }); ell(22, hy - 64, 9, 9, { wash: '#2a4a9a', washA: 1, w: 1.2 }); ell(22, hy - 64, 6, 6, { wash: '#f4f0e6', washA: 1, line: false }); ell(22, hy - 64, 3, 3, { wash: '#b8241e', washA: 1, line: false }); }
  if (o.hat === 'top') { rect(-30, hy - 116, 60, 76, { wash: hc, washA: 1, w: 2.2, col: L }); rect(-30, hy - 54, 60, 10, { wash: '#000000', washA: 0.5, line: false }); ell(0, hy - 42, 54, 9, { wash: hc, washA: 1, w: 2, col: L }); pencil([[-20, hy - 108], [-20, hy - 60]], { w: 3, col: 'rgba(255,255,255,0.3)', pass2: false }); }
  if (o.hat === 'shako') { rect(-32, hy - 108, 64, 66, { wash: '#141216', washA: 1, w: 2.2, col: L }); ell(0, hy - 44, 40, 8, { wash: '#0a0a0a', washA: 1, w: 1.6 }); rect(-34, hy - 112, 68, 10, { wash: '#d6a842', washA: 1, w: 1.4, col: L }); blob([[-6, hy - 112], [0, hy - 150], [6, hy - 112]], { wash: hc, washA: 1, w: 1.6, col: L }); ell(0, hy - 80, 10, 12, { wash: '#d6a842', washA: 1, w: 1.4, col: L }); }
  if (o.hat === 'firehelm') { const h = blob([[-42, hy - 22], [-40, hy - 64], [0, hy - 92], [40, hy - 64], [42, hy - 22]], { wash: '#d6a842', washA: 1, w: 2.2, col: L }); metalG(h.path, 10, hy - 70, 60, '#f6dc8a', '#d6a842', '#7a5414'); blob([[-30, hy - 80], [0, hy - 110], [30, hy - 80], [0, hy - 92]], { wash: '#f6dc8a', washA: 1, w: 1.6, col: '#7a5414' }); ell(0, hy - 22, 50, 7, { wash: '#2a1c10', washA: 1, w: 1.6 }); }
  if (o.hat === 'wig') { for (const sx of [-1, 1]) for (let q = 0; q < 3; q++) ell(sx * 40, hy - 10 + q * 20, 14, 11, { wash: '#efeae0', washA: 1, w: 1.6, col: L }); blob([[-42, hy - 10], [-40, hy - 44], [0, hy - 56], [40, hy - 44], [42, hy - 10], [26, hy - 34], [-26, hy - 34]], { wash: '#efeae0', washA: 1, w: 1.8, col: L }); }
  if (o.hat === 'beret') { ell(6, hy - 44, 46, 14, { wash: hc, washA: 1, w: 2, col: L, rot: -0.12 }); ell(8, hy - 58, 5, 5, { wash: hc, washA: 1, w: 1.2, col: L }); }
  if (o.hat === 'hardhat') { const h = blob([[-44, hy - 28], [-40, hy - 66], [0, hy - 86], [40, hy - 66], [44, hy - 28]], { wash: hc, washA: 1, w: 2.2, col: L }); ell(0, hy - 28, 54, 8, { wash: hc, washA: 1, w: 1.8, col: L }); pencil([[0, hy - 84], [0, hy - 32]], { w: 3, col: 'rgba(0,0,0,0.25)', pass2: false }); }
  if (o.hat === 'headband') { rect(-42, hy - 34, 84, 12, { wash: hc, washA: 1, w: 1.6, col: L }); }
  if (o.hat === 'bonnet') blob([[-46, hy + 6], [-48, hy - 40], [0, hy - 64], [48, hy - 40], [46, hy + 6], [34, hy - 28], [-34, hy - 28]], { wash: '#f4f0e6', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.15, col: L, ang: 1.2 } });
  if (o.hat === 'chaperon') { blob([[-50, hy + 30], [-52, hy - 30], [0, hy - 72], [52, hy - 30], [50, hy + 30], [38, hy - 10], [-38, hy - 10]], { wash: hc, washA: 1, w: 2.2, col: L }); pencil([[20, hy - 64], [70, hy - 70], [96, hy - 30], [100, hy + 20]], { w: 12, col: hc, pass2: false }); }
  pop();
}

/* ---- 004 Берлин: общие детали (ворота, квадрига, лошадь, медведь, камыш, лягушка, облака, телебашня, липа, брусчатка) ---- */
function horse(x, y, s, t, o = {}) {                                  // лошадь в профиль мордой вправо (flip −1 — влево); rear 0..1 — встаёт на дыбы, gallop — фаза бега
  const c = o.col || '#7a4a2a', cD = o.colD || lerpC(c, '#000000', 0.5), cL = o.colL || lerpC(c, '#ffffff', 0.3), L = '#1c120a', rr = o.rear || 0, g = o.gallop;
  push(x, y, s, o.rot || 0, o.flip || 1);
  if (!o.noShadow) ell(0, 4, 150, 16, { wash: '#000000', washA: 0.18, line: false });
  const leg = (hx, hy, kx, ky, fx, fy, w, key) => { shape(tubeP([[hx, hy], [kx, ky], [fx, fy]], w, w * 0.55), { wash: c, washA: 1, w: 2.2, col: L, key }); ell(fx + 4, fy - 4, w * 0.42, w * 0.32, { wash: '#2a1e14', washA: 1, w: 1.6, col: L }); };
  const gp = g === undefined ? 0 : Math.sin(g), gq = g === undefined ? 0 : Math.cos(g);
  leg(-88, -120, -100 - gp * 14, -62, -88 - gp * 26, -6 + Math.max(0, gp) * -10, 30, 8101);               // задние
  leg(60, -120, 70 + gq * 10 + rr * 40, -66 - rr * 70, 64 + gq * 20 + rr * 80, -6 - rr * 120, 28, 8102);  // передняя дальняя
  const bd = blob([[-140, -150], [-118, -192], [-40, -206], [40, -204], [104, -196], [132, -160], [118, -112], [60, -100], [-40, -104], [-120, -110]], { wash: c, washA: 1, w: 2.8, col: L, key: 8103 });
  shadeG(bd.path, 0, -100, 0, -210, cD, 0.55); hatch(bd.path, bd.bb, { gap: 7, a: 0.12, col: cD, ang: 1.1, key: 8104, w: 1.2 });
  pencil(spline([[-90, -196], [0, -206], [90, -198]], false, 6), { w: 3, col: cL, a: 0.6, pass2: false });
  const nk = shape(tubeP([[96, -170], [130, -230], [150, -280]], 86, 52), { wash: c, washA: 1, w: 2.6, col: L, key: 8105 }); shadeG(nk.path, 170, 0, 90, 0, cD, 0.4);
  const hd = blob([[128, -296], [162, -312], [214, -270], [226, -238], [212, -222], [182, -228], [140, -262]], { wash: c, washA: 1, w: 2.6, col: L, key: 8106 }); shadeG(hd.path, 220, -230, 150, -290, cD, 0.35);
  poly([[146, -300], [154, -336], [164, -304]], { wash: c, washA: 1, w: 2, col: L }); ell(178, -280, 5, 4, { wash: '#1a0e06', washA: 1, w: 1.2 }); ell(214, -236, 4, 3, { wash: '#1a0e06', washA: 1, line: false });
  pencil([[196, -226], [212, -226]], { w: 2, col: L, pass2: false });
  for (let k = 0; k < 9; k++) { const a = k / 8, mx = lerp(96, 150, a), my = lerp(-196, -300, a); pencil([[mx, my], [mx - 26 - Math.sin(t * 5 + k) * 6, my + 20]], { w: 6, col: o.mane || cD, a: 0.9, pass2: false }); }
  const tl = spline([[-136, -176], [-172, -150 + Math.sin(t * 4) * 6], [-186, -90 + Math.sin(t * 4 + 1) * 10], [-176, -40]], false, 8); shape(tubeP(tl, 26, 12), { wash: o.mane || cD, washA: 1, w: 2, col: L, key: 8107 });
  leg(-60, -116, -62 + gp * 14, -60, -50 + gp * 22, -6 - Math.max(0, -gp) * 10, 32, 8108);               // задняя ближняя
  leg(88, -118, 100 - gq * 10 + rr * 50, -60 - rr * 76, 92 - gq * 18 + rr * 96, -4 - rr * 140, 30, 8109); // передняя ближняя
  if (o.harness) { pencil(spline([[100, -200], [60, -150], [100, -110]], false, 6), { w: 6, col: o.harness, pass2: false }); pencil([[160, -290], [200, -244]], { w: 4, col: o.harness, pass2: false }); }
  pop();
}
function quadriga(x, y, s, t, o = {}) {                               // квадрига: колесница, Виктория с жезлом, четыре коня (патина); cross — Железный крест (после 1814)
  const P = o.col || '#5f9a7e', PD = '#2a4e3e', PL = '#9ccab0', L = '#1c120a';
  push(x, y, s);
  for (const [hx, fl, rr, k] of [[-150, -1, 0.5, 0], [150, 1, 0.5, 1]]) horse(hx * 0.9, 0, 0.62, t, { col: P, colD: PD, colL: PL, mane: PD, flip: fl, rear: rr, noShadow: 1 });
  const wh = ell(0, -50, 52, 52, { wash: PD, washA: 1, w: 2.4, col: L }); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283 + t * 0; pencil([[0, -50], [Math.cos(a) * 48, -50 + Math.sin(a) * 48]], { w: 2.4, col: PL, a: 0.7, pass2: false }); }
  const cb = blob([[-60, -40], [-66, -120], [0, -132], [66, -120], [60, -40], [0, -30]], { wash: P, washA: 1, w: 2.6, col: L, key: 8120 }); shadeG(cb.path, 60, 0, -40, 0, PD, 0.5); pencil(spline([[-50, -100], [0, -112], [50, -100]], false, 6), { w: 2, col: PL, a: 0.7, pass2: false });
  for (const sd of [-1, 1]) blob([[sd * 10, -200], [sd * 70, -250], [sd * 96, -200], [sd * 70, -170], [sd * 30, -170]], { wash: P, washA: 1, w: 2.2, col: L, key: 8121 + sd, shade: { gap: 5, a: 0.3, col: PD, ang: sd } });
  const vb = blob([[-26, -120], [-30, -200], [-14, -236], [14, -236], [30, -200], [26, -120]], { wash: P, washA: 1, w: 2.4, col: L, key: 8124 }); shadeG(vb.path, 26, 0, -20, 0, PD, 0.5);
  ell(0, -254, 17, 19, { wash: P, washA: 1, w: 2.2, col: L }); pencil([[12, -226], [40, -270], [44, -320]], { w: 7, col: P, pass2: false });
  pencil([[44, -300], [44, -420]], { w: 5, col: PD, pass2: false });
  pencil(ellPts(44, -430, 26, 26, 0, 0.05, 24), { w: 6, col: P, pass2: false });
  if (o.cross) { for (const [a, b] of [[[44, -446], [44, -414]], [[28, -430], [60, -430]]]) pencil([a, b], { w: 7, col: PD, pass2: false }); }
  push(44, -470, 1); blob([[-30, 0], [-10, -16], [0, -30], [10, -16], [30, 0], [10, 6], [0, 14], [-10, 6]], { wash: P, washA: 1, w: 2, col: L }); pop();
  for (const [hx, fl, rr] of [[-70, -1, 0.7], [70, 1, 0.7]]) horse(hx, 10, 0.68, t, { col: P, colD: PD, colL: PL, mane: PD, flip: fl, rear: rr, noShadow: 1 });
  if (o.shine) glow(30, -300, 260, 'rgba(255,236,190,1)', 0.25 * o.shine);
  pop();
}
function gate(x, base, s, t, o = {}) {                                // Бранденбургские ворота: 6 дорических колонн, антаблемент с триглифами, аттик с рельефом, квадрига
  const ST = o.stone || '#e6d8b8', SD = o.stoneD || '#9a8662', SL = o.stoneL || '#fff4dc', L = '#2a1e12', sky = o.through || '#c8a878';
  push(x, base, s);
  for (const sd of [-1, 1]) { const wx = sd * 360; rect(wx - 60, -230, 120, 230, { wash: ST, washA: 1, w: 2.2, col: L, key: 8130 + sd }); for (const cx of [-30, 30]) { rect(wx + cx - 12, -210, 24, 210, { wash: SL, washA: 0.9, w: 1.6, col: L }); } rect(wx - 70, -262, 140, 34, { wash: ST, washA: 1, w: 2, col: L }); }
  rect(-300, -6, 600, 16, { wash: SD, washA: 1, w: 2, col: L });
  const pass = rect(-290, -330, 580, 330, { wash: sky, washA: 1, w: 1.6, col: L, key: 8133 }); shadeG(pass.path, 0, -330, 0, -100, '#3a2a1a', 0.55);
  if (o.passFn) o.passFn();
  const CX = [-250, -150, -50, 50, 150, 250];
  for (const cx of CX) { const cp = rect(cx - 24, -318, 48, 312, { wash: ST, washA: 1, w: 2.4, col: L, key: 8140 + cx }); shadeG(cp.path, cx + 24, 0, cx - 10, 0, SD, 0.6);
    for (let q = -2; q <= 2; q++) pencil([[cx + q * 8, -314], [cx + q * 8, -10]], { w: 1.4, col: SD, a: 0.55, pass2: false, gap: false });
    rect(cx - 34, -336, 68, 18, { wash: SL, washA: 1, w: 2, col: L }); ell(cx, -318, 30, 7, { wash: ST, washA: 1, w: 1.6, col: L }); rect(cx - 30, -12, 60, 12, { wash: SL, washA: 1, w: 1.6, col: L }); }
  const en = rect(-306, -400, 612, 64, { wash: ST, washA: 1, w: 2.6, col: L, key: 8150 }); shadeG(en.path, 0, -336, 0, -400, SD, 0.35);
  for (let tx = -294; tx < 300; tx += 38) { rect(tx, -388, 14, 40, { wash: SD, washA: 0.6, w: 1.2, col: L }); pencil([[tx + 5, -386], [tx + 5, -350]], { w: 1.2, col: L, a: 0.5, pass2: false }); }
  rect(-316, -410, 632, 14, { wash: SL, washA: 1, w: 2, col: L });
  const at = rect(-230, -486, 460, 78, { wash: ST, washA: 1, w: 2.4, col: L, key: 8151 }); shadeG(at.path, 0, -410, 0, -486, SD, 0.3);
  rect(-190, -476, 380, 56, { wash: SD, washA: 0.35, w: 1.6, col: L }); const rr = rng(8152); for (let q = 0; q < 14; q++) { const fx = -176 + q * 26; pencil([[fx, -424], [fx + 4, -452], [fx + rr() * 10 - 5, -466]], { w: 3, col: SD, a: 0.7, pass2: false }); ell(fx + 2, -468, 5, 5, { wash: SD, washA: 0.6, line: false }); }
  for (let sx = -200; sx <= 200; sx += 100) poly([[sx - 40, -486], [sx + 40, -486], [sx + 30, -500], [sx - 30, -500]], { wash: SL, washA: 1, w: 1.6, col: L });
  if (!o.noQuad) quadriga(0, -500, 0.52, t, { cross: o.cross !== false, shine: o.shine });
  pop();
}
function buddyBear(x, y, s, t, o = {}) {                              // «Бадди-медведь»: стоит, лапы вверх, расписан; wink 0..1
  const C = o.col || '#c8302a', CD = lerpC(C, '#000000', 0.45), L = '#1c120a';
  push(x, y, s, o.rot || 0);
  ell(0, 4, 90, 14, { wash: '#000000', washA: 0.2, line: false });
  for (const sd of [-1, 1]) shape(tubeP([[sd * 30, -90], [sd * 34, -40], [sd * 40, 0]], 46, 40), { wash: C, washA: 1, w: 2.4, col: L });
  const bp = blob([[-56, -70], [-70, -170], [-50, -250], [0, -270], [50, -250], [70, -170], [56, -70], [0, -56]], { wash: C, washA: 1, w: 2.8, col: L, key: 8160 }); shadeG(bp.path, 60, 0, -30, 0, CD, 0.5);
  for (const sd of [-1, 1]) { const arm = shape(tubeP([[sd * 50, -230], [sd * 88, -280], [sd * 104, -340]], 40, 32), { wash: C, washA: 1, w: 2.4, col: L }); ell(sd * 106, -346, 20, 18, { wash: C, washA: 1, w: 2, col: L }); }
  const hp = ell(0, -318, 58, 54, { wash: C, washA: 1, w: 2.6, col: L, key: 8161 }); shadeG(hp.path, 50, 0, -20, 0, CD, 0.45);
  for (const sd of [-1, 1]) ell(sd * 46, -364, 18, 16, { wash: C, washA: 1, w: 2, col: L });
  ell(0, -298, 28, 20, { wash: '#f2e2c8', washA: 1, w: 2, col: L }); ell(0, -308, 10, 7, { wash: '#1a1010', washA: 1, w: 1.4 });
  pencil([[0, -301], [0, -288], [-10, -284]], { w: 2, col: L, pass2: false }); pencil([[0, -288], [10, -284]], { w: 2, col: L, pass2: false });
  const wk = o.wink || 0; ell(-22, -334, 6, 7, { wash: '#1a1010', washA: 1, line: false }); if (wk > 0.5) pencil([[14, -334], [30, -332]], { w: 3, col: L, pass2: false }); else ell(22, -334, 6, 7, { wash: '#1a1010', washA: 1, line: false });
  ctx.save(); ctx.clip(bp.path); const pr = rng(8162);
  for (let k = 0; k < 9; k++) { const hx = -50 + pr() * 100, hy = -240 + pr() * 170, col = ['#f2c81e', '#2a6ab0', '#f6f0e6', '#2a8a4a'][k % 4]; ell(hx, hy, 12, 12, { wash: col, washA: 0.95, w: 1.4, col: L }); ell(hx, hy, 4, 4, { wash: '#1c120a', washA: 0.6, line: false }); }
  pencil([[-70, -150], [70, -170]], { w: 9, col: '#f6f0e6', a: 0.9, pass2: false }); txt('BERLIN', 0, -158, 22, { font: 'Osw', col: '#1c120a', rot: -0.14 });
  ctx.restore();
  pop();
}
function reeds(x, y, h, t, seed, n = 6, a = 1) {                       // камыш/рогоз: стебли качаются, коричневые «сосиски»
  const r = rng(seed);
  for (let k = 0; k < n; k++) { const dx = (r() - 0.5) * 90, hh = h * (0.6 + r() * 0.5), sw = Math.sin(t * 1.6 + k + seed) * 10 * hh / h, tip = [x + dx + sw, y - hh];
    pencil([[x + dx, y], [x + dx + sw * 0.4, y - hh * 0.5], tip], { w: 3, col: '#5a7a2a', a, pass2: false });
    if (r() < 0.55) ell(tip[0], tip[1] + 30, 8, 26, { wash: '#6a4224', washA: a, w: 1.6, col: '#2a180a', a, rot: sw * 0.01 });
    else pencil([[x + dx, y - hh * 0.3], [x + dx + 30 + sw, y - hh * 0.9]], { w: 4, col: '#7a9a3a', a, pass2: false }); }
}
function frog(x, y, s, t, o = {}) {                                   // лягушка: jump 0..1 — фаза прыжка по дуге
  const j = o.jump || 0, jy = -Math.sin(j * Math.PI) * 120, jx = j * (o.dx || 90), L = '#1c2a0a';
  push(x + jx, y + jy, s, j > 0 && j < 1 ? -0.4 * (o.flip || 1) : 0, o.flip || 1);
  const ext = j > 0 && j < 1 ? 1 : 0;
  for (const sd of [-1, 1]) shape(tubeP([[sd * 18, -10], [sd * (30 + ext * 10), ext ? 20 : -2], [sd * (40 + ext * 20), ext ? 36 : 4]], 14, 8), { wash: '#4a8a2a', washA: 1, w: 1.8, col: L });
  const b = blob([[-28, 0], [-30, -24], [-14, -40], [14, -40], [30, -24], [28, 0]], { wash: '#5a9a32', washA: 1, w: 2.2, col: L }); shadeG(b.path, 0, 0, 0, -40, '#2a5a14', 0.5);
  ell(0, -8, 18, 9, { wash: '#d8e8a0', washA: 0.9, line: false });
  for (const sd of [-1, 1]) { ell(sd * 13, -42, 9, 9, { wash: '#5a9a32', washA: 1, w: 1.8, col: L }); ell(sd * 13, -43, 5, 6, { wash: '#f2f0d0', washA: 1, line: false }); ell(sd * 13, -42, 2.6, 4, { wash: '#101808', washA: 1, line: false }); }
  pencil([[-12, -24], [0, -20], [12, -24]], { w: 1.8, col: L, pass2: false });
  if (o.croak) ell(0, -12, 14 * o.croak, 12 * o.croak, { wash: '#e8f0b0', washA: 0.9, w: 1.4, col: L });
  pop();
}
function cloudB(x, y, s, col = '#fff4e4', a = 0.9, seed = 1) {        // облако акварелью: 5–7 перекрытых клякс
  const r = rng(seed); push(x, y, s);
  for (let k = 0; k < 7; k++) { const cx = (k - 3) * 46 + (r() - 0.5) * 30, cy = -Math.abs(k - 3) * -8 - r() * 30, rx = 60 + r() * 40; ell(cx, cy, rx, rx * 0.62, { wash: col, washA: a, line: k % 2 === 0, w: 1.4, col: '#a89a8a', a: 0.4 }); }
  ell(0, 18, 190, 26, { wash: lerpC(col, '#7a6a7a', 0.3), washA: a * 0.4, line: false }); pop();
}
function tvTower(x, base, s, t, o = {}) {                             // Берлинская телебашня: бетонный ствол, стальной шар с гранями, красно-белая антенна; cross 0..1 — блик-крест
  const L = '#1c1a1e'; push(x, base, s);
  const sh = shape([[-34, 0], [34, 0], [16, -720], [-16, -720]], { wash: '#d8d4cc', washA: 1, w: 2.4, col: L, key: 8170 }); shadeG(sh.path, 34, 0, -10, 0, '#8a8680', 0.55);
  for (let y = -100; y > -700; y -= 70) pencil([[-30 + (-y) * 0.02, y], [30 - (-y) * 0.02, y]], { w: 1.2, col: '#9a968e', a: 0.5, pass2: false });
  const R = 92, cy = -800, sp = ell(0, cy, R, R, { wash: '#a8b0b8', washA: 1, w: 2.8, col: L, key: 8171 }); metalG(sp.path, -30, cy - 36, R * 1.2, '#f4f6f8', '#a8b0b8', '#4a525a');
  ctx.save(); ctx.clip(sp.path); for (let k = -4; k <= 4; k++) { pencil(ellPts(0, cy, Math.abs(k) * 22 + 1, R, 0, 0, 30).filter(p => k < 0 ? p[0] <= 0 : p[0] >= 0), { w: 1.2, col: '#5a626a', a: 0.4, pass2: false, gap: false }); pencil([[-R, cy + k * 20], [R, cy + k * 20]], { w: 1.2, col: '#5a626a', a: 0.4, pass2: false, gap: false }); } ctx.restore();
  rect(-R * 0.9, cy - 6, R * 1.8, 24, { wash: '#3a3e46', washA: 0.9, w: 1.8, col: L }); for (let q = -6; q <= 6; q++) rect(q * 13 - 4, cy - 2, 8, 14, { wash: o.night ? '#ffe2a0' : '#8ab0d0', washA: 0.9, line: false });
  rect(-14, cy - R - 60, 28, 60, { wash: '#d8d4cc', washA: 1, w: 2, col: L });
  for (let k = 0; k < 8; k++) rect(-8 + k * 0.5, cy - R - 60 - (k + 1) * 26, 16 - k, 26, { wash: k % 2 ? '#f4f0e6' : '#c8302a', washA: 1, w: 1.4, col: L });
  if (Math.sin(t * 3) > 0) glow(0, cy - R - 270, 22, 'rgba(255,60,40,1)', 0.8);
  if (o.cross) { const cx = R * 0.36, cyy = cy - R * 0.3, k = o.cross; glow(cx, cyy, 120 * k, 'rgba(255,250,220,1)', 0.8 * k);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = k; ctx.fillStyle = 'rgba(255,250,230,1)'; ctx.fillRect(cx - 9, cyy - 120 * k, 18, 240 * k); ctx.fillRect(cx - 80 * k, cyy - 40, 160 * k, 18); ctx.globalAlpha = 0.5 * k; ctx.fillRect(cx - 3, cyy - 260 * k, 6, 520 * k); ctx.fillRect(cx - 200 * k, cyy - 34, 400 * k, 6); ctx.restore(); glow(cx, cyy, 60, 'rgba(255,255,255,1)', k); }
  pop();
}
function linden(x, y, h, t, seed, col = '#4a7a3a', a = 1) {           // липа: ствол + круглая крона из клякс со штриховкой
  const r = rng(seed); push(x, y, h / 400);
  shape([[-12, 0], [12, 0], [8, -200], [-8, -200]], { wash: '#4a3424', washA: a, w: 2, col: '#1c120a', a });
  for (let k = 0; k < 8; k++) { const cx = (r() - 0.5) * 220, cy = -230 - r() * 170, rx = 60 + r() * 50; const b = ell(cx + Math.sin(t * 1.2 + k) * 3, cy, rx, rx * 0.85, { wash: lerpC(col, k % 3 ? '#203a14' : '#9aba5a', 0.25), washA: a, w: 1.6, col: '#1c2a10', a: a * 0.6 }); if (k % 2) hatch(b.path, b.bb, { gap: 8, a: 0.15 * a, col: '#1c2a10', ang: 0.8, key: seed * 10 + k, w: 1.2 }); }
  pop();
}
function cobbles(x0, x1, y0, y1, col = '#9a8e80', seed = 1, a = 1) {    // брусчатка рядами с перспективой
  const r = rng(seed);
  for (let y = y0, row = 0; y < y1; row++) { const hh = 14 + (y - y0) / (y1 - y0) * 26, ww = hh * 1.6; for (let x = x0 + (row % 2) * ww * 0.5; x < x1; x += ww) rect(x + 2, y + 2, ww - 4, hh - 4, { wash: lerpC(col, r() < 0.5 ? '#5a5048' : '#c8bca8', r() * 0.4), washA: a, w: 1.2, col: '#3a3028', a: 0.5 * a }); y += hh; }
}
function dog(x, y, s, t, o = {}) {                                    // дворняга в профиль (морда вправо): jump 0..1, wag — хвост
  const C = o.col || '#a8743e', CD = '#4a2a10', L = '#1c120a', j = o.jump || 0, jy = -Math.sin(j * Math.PI) * 90;
  push(x, y + jy, s, j > 0 && j < 1 ? -0.25 : 0, o.flip || 1); ell(0, 6 - jy / s, 80, 10, { wash: '#000000', washA: 0.2, line: false });
  for (const [lx, ph] of [[-46, 0], [-30, 1], [36, 2], [52, 3]]) { const sw = j > 0 && j < 1 ? 14 : Math.sin(t * 6 + ph) * 3; shape(tubeP([[lx, -50], [lx + sw, -24], [lx + sw * 1.4, 0]], 15, 11), { wash: ph % 2 ? CD : C, washA: 1, w: 1.8, col: L }); }
  const b = blob([[-70, -50], [-60, -80], [0, -88], [50, -84], [74, -60], [60, -40], [-50, -38]], { wash: C, washA: 1, w: 2.4, col: L }); shadeG(b.path, 0, -38, 0, -88, CD, 0.45);
  const w = Math.sin(t * 14) * 0.5; pencil([[-68, -70], [-100, -104 + w * 20], [-112, -120 + w * 30]], { w: 9, col: C, pass2: false });
  const h = blob([[50, -86], [70, -112], [100, -116], [124, -96], [128, -80], [100, -74], [72, -68]], { wash: C, washA: 1, w: 2.2, col: L }); ell(126, -90, 6, 5, { wash: '#1a1010', washA: 1, line: false }); ell(98, -100, 4, 4, { wash: '#1a1010', washA: 1, line: false });
  blob([[74, -110], [64, -132], [86, -118]], { wash: CD, washA: 1, w: 1.6, col: L }); if (o.tongue) blob([[110, -76], [118, -60], [124, -76]], { wash: '#e86a7a', washA: 1, w: 1.2, col: L });
  pop();
}
