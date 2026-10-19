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
  const yrs = ['1966', '1952', '1840', '1836', '1822', '1820', '1466', 'миоцен', '−12 млн', '2026'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

WORLD.tunnel = wTunnel;
DIR.tunnel = { outfit: 'hoodieKi', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.2], act: () => [[S0.tunnel, 'awe']],
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
  pop();
}

/* ---- 004 Кишинёв: общие детали (арка, собор, колокольня, колокол, дома, лоза, бочки) ---- */
const KI = { lime: '#efe2c4', limeD: '#b89e74', limeL: '#fbf3df', ink: '#3a2a1c', roofG: '#3e6a5e', gold: '#e2b44a', wine: '#6a1428', wineL: '#a8304a' };
/* Триумфальная арка Кишинёва (1840): нижний ярус с аркой и парными колоннами, антаблемент, верхний ярус с проёмом для колокола.
   o.build 0..1 — сколько построено (снизу вверх), o.scaff — леса, o.bell 0..1 — колокол в верхнем ярусе (качание o.swing), o.lit — вечерний свет */
function kArch(x, y, s, t, o = {}) {
  const L = KI.ink, bk = o.build ?? 1, top = -680 * bk;
  push(x, y, s);
  ctx.save(); ctx.beginPath(); ctx.rect(-400, top - 4, 800, 700 - top); ctx.clip();
  ell(0, 6, 330, 26, { wash: '#000000', washA: 0.16, line: false });
  // цоколь и ступени
  for (let k = 0; k < 3; k++) rect(-290 + k * 10, -14 - k * 14, 580 - k * 20, 16, { wash: k % 2 ? '#d8c8a4' : '#cdbb94', washA: 1, w: 1.8, col: L });
  // нижний ярус
  const lo = rect(-262, -430, 524, 388, { wash: KI.lime, washA: 1, w: 2.6, col: L, key: 9400 });
  shadeG(lo.path, 262, 0, -262, 0, KI.limeD, 0.45); hatch(lo.path, lo.bb, { gap: 9, a: 0.07, col: '#7a6040', ang: 1.25, key: 9401, w: 1.2 });
  for (let r = 0; r < 9; r++) pencil([[-258, -82 - r * 38], [258, -82 - r * 38]], { w: 1.2, col: '#a8906a', a: 0.35, pass2: false });   // руст кладки
  // арочный проём
  const AP = [[-92, -42], [-92, -250]]; for (let a = 0; a <= 16; a++) { const q = Math.PI + a / 16 * Math.PI; AP.push([Math.cos(q) * 92, -250 + Math.sin(q) * 92]); } AP.push([92, -42]);
  const ap = shape(AP, { wash: o.through || '#3a2e2a', washA: 1, w: 3, col: L, key: 9402 });
  ctx.save(); ctx.clip(ap.path); if (o.through) glow(0, -200, 160, 'rgba(255,240,200,1)', 0.35); else { vgrad(-340, -40, ['#4a3c34', '#2a201c']); glow(40, -120, 120, 'rgba(255,220,160,1)', 0.18); } ctx.restore();
  for (let a = 0; a <= 8; a++) { const q = Math.PI + a / 8 * Math.PI; pencil([[Math.cos(q) * 92, -250 + Math.sin(q) * 92], [Math.cos(q) * 118, -250 + Math.sin(q) * 118]], { w: 2, col: L, a: 0.7, pass2: false }); }   // клинчатые камни
  poly([[-14, -362], [14, -362], [10, -330], [-10, -330]], { wash: KI.limeL, washA: 1, w: 2, col: L });   // замковый камень
  // парные колонны (коринфский ордер, упрощённо)
  for (const cx of [-226, -172, 172, 226]) {
    const c = rect(cx - 17, -372, 34, 322, { wash: KI.limeL, washA: 1, w: 2.2, col: L });
    shadeG(c.path, cx + 17, 0, cx - 17, 0, '#c8b48c', 0.55); for (let f = -1; f <= 1; f++) pencil([[cx + f * 9, -366], [cx + f * 9, -56]], { w: 1.2, col: '#9a8460', a: 0.5, pass2: false });
    rect(cx - 22, -56, 44, 14, { wash: '#e0d2b2', washA: 1, w: 1.8, col: L }); blob([[cx - 26, -372], [cx - 20, -392], [cx, -398], [cx + 20, -392], [cx + 26, -372]], { wash: '#e8dcc0', washA: 1, w: 1.8, col: L });
    for (const sd of [-1, 1]) pencil([[cx + sd * 6, -376], [cx + sd * 18, -392], [cx + sd * 24, -386]], { w: 1.6, col: L, a: 0.7, pass2: false });
  }
  // антаблемент и карниз
  rect(-280, -470, 560, 44, { wash: '#e6d8b8', washA: 1, w: 2.4, col: L }); for (let k = -13; k <= 13; k++) rect(k * 20 - 5, -470, 10, 12, { wash: '#c8b48c', washA: 1, w: 1, col: L, a: 0.6 });
  poly([[-300, -470], [300, -470], [290, -490], [-290, -490]], { wash: '#f2e6cc', washA: 1, w: 2.2, col: L });
  txt('MDCCCXL', 0, -446, 26, { font: 'Osw', col: '#7a6040', a: 0.8 });
  // верхний ярус с проёмом для колокола
  const up = rect(-176, -640, 352, 150, { wash: KI.lime, washA: 1, w: 2.4, col: L, key: 9403 }); shadeG(up.path, 176, 0, -176, 0, KI.limeD, 0.45);
  const BP = [[-62, -500], [-62, -580]]; for (let a = 0; a <= 12; a++) { const q = Math.PI + a / 12 * Math.PI; BP.push([Math.cos(q) * 62, -580 + Math.sin(q) * 46]); } BP.push([62, -500]);
  const bpp = shape(BP, { wash: '#2a221e', washA: 1, w: 2.4, col: L });
  if ((o.bell ?? 0) > 0) { ctx.save(); ctx.clip(bpp.path); pencil([[-62, -612], [62, -612]], { w: 5, col: '#4a3020', pass2: false }); kBell(0, -506, 0.13, t, { swing: o.swing || 0, a: o.bell }); ctx.restore(); }
  for (const sd of [-1, 1]) { rect(sd * 120 - 16, -630, 32, 132, { wash: KI.limeL, washA: 1, w: 1.8, col: L }); }
  rect(-196, -664, 392, 26, { wash: '#f2e6cc', washA: 1, w: 2.2, col: L }); poly([[-206, -664], [206, -664], [196, -680], [-196, -680]], { wash: '#e6d8b8', washA: 1, w: 2, col: L });
  for (let k = -8; k <= 8; k++) rect(k * 22 - 4, -700, 8, 20, { wash: KI.limeL, washA: 1, w: 1.2, col: L, a: 0.8 });   // балюстрада
  pencil([[-196, -702], [196, -702]], { w: 3, col: L, pass2: false });
  if (o.lit) { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; glow(-200, -360, 420, 'rgba(255,190,110,1)', 0.5 * o.lit); ctx.restore(); }
  ctx.restore();
  // строительная кромка и леса
  if (bk < 1) { pencil([[-262, top], [262, top]], { w: 4, col: '#8a7050', pass2: false }); for (let k = 0; k < 6; k++) { const r = rng(9410 + k); rect(-240 + k * 82, top - 26 - r() * 10, 70, 26, { wash: '#e6d6b2', washA: 1, w: 1.6, col: L }); } }
  if (o.scaff) { const a = o.scaff; for (const sx of [-330, -300, 300, 330]) pencil([[sx, 0], [sx, -760]], { w: 7, col: '#7a5432', a, pass2: false });
    for (let k = 0; k < 6; k++) { const yy = -110 - k * 120; pencil([[-340, yy], [340, yy]], { w: 6, col: '#8a6038', a, pass2: false }); pencil([[-330, yy], [-300, yy - 120]], { w: 3, col: '#6a4428', a: a * 0.8, pass2: false }); pencil([[330, yy], [300, yy - 120]], { w: 3, col: '#6a4428', a: a * 0.8, pass2: false }); } }
  pop();
}
/* колокол: профиль с короной-ушками, поясами и рельефом; o.hot 0..1 — раскал, o.swing — угол качания, o.a — прозрачность */
function kBell(x, y, s, t, o = {}) {
  const L = '#1a1008', H = 900, PR = [[0, 140], [40, 190], [220, 210], [460, 236], [660, 290], [800, 360], [880, 404], [900, 420]];
  push(x, y, s, o.swing || 0); ctx.save(); ctx.globalAlpha *= o.a ?? 1;
  const R = PR.map(([yy, w]) => [w, yy - H]), Lf = PR.map(([yy, w]) => [-w, yy - H]).reverse();
  const pts = spline([[-110, -H - 4], [0, -H - 20], [110, -H - 4], ...R, [0, 6], ...Lf], true, 6), bp = pathOf(pts);
  const T = o.hot || 0, g = ctx.createLinearGradient(-430, 0, 430, 0);
  g.addColorStop(0, lerpC('#2a1c10', '#c04a1a', T)); g.addColorStop(0.32, lerpC('#7a5a32', '#ff9a30', T)); g.addColorStop(0.45, lerpC('#c8a060', '#fff2b8', T)); g.addColorStop(0.62, lerpC('#6a4c2a', '#ffae40', T)); g.addColorStop(1, lerpC('#22160c', '#b8401a', T));
  ctx.save(); ctx.clip(bp); ctx.fillStyle = g; ctx.fillRect(-440, -H - 30, 880, H + 40);
  hatch(bp, [-430, -H - 30, 430, 0], { gap: 10, a: 0.2 * (1 - T), col: '#1a1008', ang: 1.35, key: 9420 });
  if (T < 0.5) { ctx.globalAlpha = 0.16; ctx.fillStyle = '#5aa391'; ctx.fillRect(-430, -440, 110, 380); ctx.globalAlpha = 1; }
  const rel = (P, a = 0.8) => { pencil(P, { w: 4, col: L, a, pass2: false }); pencil(P.map(([a1, b1]) => [a1 - 3, b1 - 3]), { w: 2.4, col: T > 0.4 ? '#fff6d0' : '#f0d49a', a: a * 0.9, pass2: false, gap: false }); };
  for (const ry of [120, 160, 760, 810, 860]) { const w = PR.reduce((acc, [yy, ww], i) => i && ry <= yy && ry > PR[i - 1][0] ? lerp(PR[i - 1][1], ww, (ry - PR[i - 1][0]) / (yy - PR[i - 1][0])) : acc, 420); rel([[-w + 6, ry - H + 6], [0, ry - H + 16], [w - 6, ry - H + 6]]); }
  for (let k = -5; k <= 5; k++) ell(k * 34, 140 - H, 11, 8, { wash: '#8a6a3a', washA: 0.8, w: 1.4, col: L });
  rel(ellPts(0, 460 - H, 90, 120, 0, 0.05, 36), 0.7); rel([[-30, 560 - H], [0, 380 - H], [30, 560 - H]], 0.6); rel([[-50, 470 - H], [50, 470 - H]], 0.6);   // медальон с крестом
  if (T > 0) glow(0, -H * 0.5, 500, 'rgba(255,200,120,1)', 0.5 * T);
  ctx.restore();
  pencil(pts, { w: 4, col: L, key: 9421 }); rimL(pts, -1, '#ffd8a0', 0.5, 4);
  for (const dx of [-70, 0, 70]) { const p = []; for (let a = 0; a <= 14; a++) { const q = Math.PI + a / 14 * Math.PI; p.push([dx + Math.cos(q) * 30, -H - 18 + Math.sin(q) * 54]); } pencil(p, { w: 11, col: T > 0.3 ? '#ffb050' : '#4a3420', pass2: false }); pencil(p, { w: 3, col: L, a: 0.6, pass2: false }); }
  ell(0, -40, 34, 44, { wash: '#3a2a18', washA: 1, w: 2.4, col: L });   // язык
  ctx.restore(); pop();
}
/* собор Рождества Христова (1836): куб, портик 6 колонн с фронтоном, барабан-ротонда с колоннами, купол, крест */
function kCathedral(x, y, s, t, o = {}) {
  const L = KI.ink; push(x, y, s);
  ell(0, 6, 420, 30, { wash: '#000', washA: 0.14, line: false });
  const bd = rect(-360, -460, 720, 460, { wash: KI.lime, washA: 1, w: 2.4, col: L, key: 9430 }); shadeG(bd.path, 360, 0, -360, 0, KI.limeD, 0.5);
  for (const wx of [-300, -240, 240, 300]) { rect(wx - 18, -330, 36, 120, { wash: '#4a3e3a', washA: 1, w: 1.8, col: L }); pencil([[wx - 24, -340], [wx + 24, -340]], { w: 3, col: L, pass2: false }); }
  rect(-380, -500, 760, 42, { wash: '#e6d8b8', washA: 1, w: 2.2, col: L });
  // портик
  for (let k = 0; k < 3; k++) rect(-230 + k * 8, -14 - k * 12, 460 - k * 16, 14, { wash: '#d8c8a4', washA: 1, w: 1.6, col: L });
  rect(-170, -380, 340, 340, { wash: '#d8c6a2', washA: 1, w: 1.6, col: L }); rect(-50, -230, 100, 190, { wash: '#5a3a24', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: L, ang: 1.57 } });
  for (let k = 0; k < 6; k++) { const cx = -200 + k * 80, c = rect(cx - 15, -390, 30, 350, { wash: KI.limeL, washA: 1, w: 2, col: L }); shadeG(c.path, cx + 15, 0, cx - 15, 0, '#c8b48c', 0.55); blob([[cx - 22, -390], [cx - 14, -408], [cx + 14, -408], [cx + 22, -390]], { wash: '#e8dcc0', washA: 1, w: 1.6, col: L }); }
  rect(-240, -440, 480, 34, { wash: '#efe2c4', washA: 1, w: 2, col: L });
  const pd = poly([[-250, -440], [250, -440], [0, -560]], { wash: '#f2e6cc', washA: 1, w: 2.4, col: L }); poly([[-200, -450], [200, -450], [0, -538]], { wash: '#e0d0ae', washA: 1, w: 1.4, col: L, a: 0.8 });
  // барабан-ротонда
  const dr = rect(-170, -720, 340, 220, { wash: KI.lime, washA: 1, w: 2.2, col: L }); shadeG(dr.path, 170, 0, -170, 0, KI.limeD, 0.5);
  for (let k = 0; k < 8; k++) { const cx = -150 + k * 43; rect(cx - 9, -704, 18, 190, { wash: KI.limeL, washA: 1, w: 1.6, col: L }); if (k < 7) { rect(cx + 12, -660, 18, 80, { wash: '#4a3e3a', washA: 1, w: 1.2, col: L }); } }
  rect(-186, -740, 372, 24, { wash: '#e6d8b8', washA: 1, w: 2, col: L });
  const dp = []; for (let a = 0; a <= 20; a++) { const q = Math.PI + a / 20 * Math.PI; dp.push([Math.cos(q) * 176, -740 + Math.sin(q) * 190]); }
  const dm = shape([...dp, [176, -740]], { wash: o.dome || '#4a6a8a', washA: 1, w: 2.6, col: L, key: 9431 }); metalG(dm.path, -40, -860, 200, '#9ab8d0', o.dome || '#4a6a8a', '#1e2e44');
  for (let k = -3; k <= 3; k++) pencil(spline([[k * 50, -740], [k * 40, -840], [k * 12, -926]], false, 6), { w: 1.6, col: '#1e2e44', a: 0.6, pass2: false });
  rect(-26, -960, 52, 34, { wash: '#e6d8b8', washA: 1, w: 1.8, col: L }); ell(0, -980, 22, 26, { wash: KI.gold, washA: 1, w: 1.8, col: '#6a4a08' });
  pencil([[0, -1004], [0, -1090]], { w: 6, col: KI.gold, pass2: false }); pencil([[-24, -1066], [24, -1066]], { w: 5, col: KI.gold, pass2: false }); pencil([[-14, -1036], [14, -1042]], { w: 4, col: KI.gold, pass2: false });
  glow(0, -1040, 50, 'rgba(255,230,160,1)', 0.6);
  pop();
}
/* колокольня собора (1836): 4 яруса с арочными проёмами, шпиль; o.win — индекс яруса с подсвеченным окном (куда «не лезет» колокол) */
function kBelfry(x, y, s, t, o = {}) {
  const L = KI.ink; push(x, y, s);
  const T = [[0, -380, 150], [-380, -640, 124], [-640, -860, 100], [-860, -1030, 78]];
  T.forEach(([y0, y1, w], i) => {
    const b = rect(-w, y1, w * 2, y0 - y1, { wash: KI.lime, washA: 1, w: 2.4, col: L, key: 9440 + i }); shadeG(b.path, w, 0, -w, 0, KI.limeD, 0.5); hatch(b.path, b.bb, { gap: 10, a: 0.06, col: '#7a6040', ang: 1.2, key: 9445 + i, w: 1 });
    const ow = w * (o.win === i && o.winW ? o.winW : 0.42), oh = (y0 - y1) * 0.56, oy = y0 - (y0 - y1) * 0.18; const P = [[-ow, oy], [-ow, oy - oh + ow]]; for (let a = 0; a <= 12; a++) { const q = Math.PI + a / 12 * Math.PI; P.push([Math.cos(q) * ow, oy - oh + ow + Math.sin(q) * ow]); } P.push([ow, oy]);
    if (i > 0 || o.door) shape(P, { wash: o.win === i ? '#1a1410' : '#3a302c', washA: 1, w: 2.2, col: L });
    for (const sd of [-1, 1]) { rect(sd * (w - 18) - 10, y1 + 10, 20, y0 - y1 - 20, { wash: KI.limeL, washA: 1, w: 1.6, col: L }); }
    rect(-w - 12, y1 - 18, w * 2 + 24, 22, { wash: '#e6d8b8', washA: 1, w: 2, col: L });
  });
  const dp = []; for (let a = 0; a <= 16; a++) { const q = Math.PI + a / 16 * Math.PI; dp.push([Math.cos(q) * 70, -1048 + Math.sin(q) * 90]); }
  const dm = shape([...dp, [70, -1048]], { wash: o.dome || '#4a6a8a', washA: 1, w: 2.2, col: L }); metalG(dm.path, -20, -1110, 100, '#9ab8d0', o.dome || '#4a6a8a', '#1e2e44');
  pencil([[0, -1136], [0, -1300]], { w: 7, col: KI.gold, pass2: false }); ell(0, -1150, 14, 16, { wash: KI.gold, washA: 1, w: 1.6, col: '#6a4a08' }); pencil([[-22, -1260], [22, -1260]], { w: 5, col: KI.gold, pass2: false });
  glow(0, -1240, 40, 'rgba(255,230,160,1)', 0.5);
  pop();
}
/* бессарабский дом: беленые известняковые стены, галерея-прispa на столбиках, черепица/камыш, ставни; o.roof 'reed'|'tile', o.lit — свет в окнах */
function bHouse(x, y, w, h, o = {}) {
  const L = KI.ink, seed = o.seed || 1, r = rng(9450 + seed);
  push(x, y, o.s || 1);
  const wl = rect(-w / 2, -h, w, h, { wash: o.wall || '#f2ead6', washA: 1, w: 2.2, col: L, key: 9451 + seed }); shadeG(wl.path, w / 2, 0, -w / 2, 0, '#c8b894', 0.45);
  rect(-w / 2, -26, w, 26, { wash: '#8a7a64', washA: 1, w: 1.6, col: L });   // цоколь
  const nw = Math.max(1, Math.floor(w / 110));
  for (let i = 0; i < nw; i++) { const wx = -w / 2 + (i + 0.5) * w / nw; if (o.door && i === Math.floor(nw / 2)) { rect(wx - 26, -h * 0.82, 52, h * 0.82 - 26, { wash: '#6a4428', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: L, ang: 1.57 } }); continue; }
    rect(wx - 22, -h * 0.74, 44, 52, { wash: o.lit ? '#ffd890' : '#4a5a6a', washA: 1, w: 2, col: L }); if (o.lit) glow(wx, -h * 0.74 + 26, 60, 'rgba(255,210,130,1)', 0.55 * o.lit);
    pencil([[wx, -h * 0.74], [wx, -h * 0.74 + 52]], { w: 1.8, col: L, pass2: false }); pencil([[wx - 22, -h * 0.74 + 26], [wx + 22, -h * 0.74 + 26]], { w: 1.8, col: L, pass2: false });
    for (const sd of [-1, 1]) rect(wx + sd * 22 + (sd < 0 ? -18 : 0), -h * 0.74 - 2, 18, 56, { wash: o.shut || '#3a6a9a', washA: 1, w: 1.6, col: L }); }
  const rh = h * 0.7, RP = [[-w / 2 - 30, -h + 6], [-w / 2 + 40, -h - rh], [w / 2 - 40, -h - rh], [w / 2 + 30, -h + 6]];
  const rf = poly(RP, { wash: o.roof === 'tile' ? '#b0563a' : '#b8a070', washA: 1, w: 2.4, col: L, key: 9452 + seed });
  if (o.roof === 'tile') { for (let k = 0; k < 6; k++) { const yy = -h - rh + 6 + k * rh / 6; pencil([[lerp(-w / 2 + 40, -w / 2 - 30, k / 6), yy], [lerp(w / 2 - 40, w / 2 + 30, k / 6), yy]], { w: 1.6, col: '#6a2a1a', a: 0.7, pass2: false }); } }
  else hatch(rf.path, rf.bb, { gap: 5, a: 0.35, col: '#6a5430', ang: 1.45, key: 9453 + seed, w: 1.4 });
  if (o.chim !== false) { rect(w / 4 - 12, -h - rh * 0.9, 24, rh * 0.5, { wash: '#e8e0cc', washA: 1, w: 1.6, col: L }); if (o.smoke) for (let k = 0; k < 4; k++) { const ph = ((o.t || 0) * 0.4 + k / 4 + seed * 0.3) % 1; glow(w / 4 + Math.sin(ph * 5 + seed) * 20, -h - rh * 0.9 - ph * 200, 20 + ph * 50, 'rgba(200,196,190,1)', 0.4 * (1 - ph), 'source-over'); } }
  if (o.porch) { for (let k = 0; k < 4; k++) { const px = -w / 2 + 20 + k * (w - 40) / 3; pencil([[px, -10], [px, -h + 10]], { w: 8, col: '#7a5432', pass2: false }); } pencil([[-w / 2 + 10, -h + 14], [w / 2 - 10, -h + 14]], { w: 6, col: '#6a4428', pass2: false }); }
  pop();
}
function poplar(x, y, h, t, seed = 1, col = '#4a7a3a') {          // пирамидальный тополь
  const r = rng(9460 + seed), sw = Math.sin(t * 1.3 + seed) * 6; push(x, y, 1);
  pencil([[0, 0], [sw * 0.2, -h * 0.3]], { w: 10, col: '#5a4030', pass2: false });
  const P = [[0, -h * 0.12]]; for (let k = 0; k <= 10; k++) { const q = k / 10; P.push([h * 0.09 * Math.sin(q * Math.PI) * (1 + 0.15 * (r() - 0.5)) + sw * q, -h * 0.12 - q * h * 0.88]); } for (let k = 10; k >= 0; k--) { const q = k / 10; P.push([-h * 0.09 * Math.sin(q * Math.PI) * (1 + 0.15 * (r() - 0.5)) + sw * q, -h * 0.12 - q * h * 0.88]); }
  const b = blob(P, { wash: col, washA: 1, w: 2, col: '#1e2e18', key: 9461 + seed }); shadeG(b.path, h * 0.09, 0, -h * 0.09, 0, '#1e3a1a', 0.55); hatch(b.path, b.bb, { gap: 6, a: 0.2, col: '#1e3a1a', ang: 1.4, key: 9462 + seed, w: 1.2 });
  pop();
}
function acacia(x, y, h, t, seed = 1, col = '#6a8a3a') {           // раскидистая акация (кишинёвские улицы)
  const r = rng(9470 + seed), sw = Math.sin(t * 1.1 + seed) * 5; push(x, y, 1);
  shape(tubeP([[0, 0], [sw * 0.1 - 6, -h * 0.4], [sw * 0.3 + 10, -h * 0.62]], 22, 10), { wash: '#5a4232', washA: 1, w: 2, col: '#2a1a10' });
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.42, d = h * (0.28 + r() * 0.12); const cx = Math.cos(a) * d * 1.2 + sw, cy = -h * 0.66 + Math.sin(a) * d * 0.7;
    const b = ell(cx, cy, h * 0.17, h * 0.12, { wash: lerpC(col, '#2e4a1e', r() * 0.4), washA: 1, w: 1.8, col: '#1e2e18' }); hatch(b.path, b.bb, { gap: 6, a: 0.16, col: '#1e3a1a', ang: 1.2, key: 9471 + seed * 9 + k, w: 1 }); }
  pop();
}
function vine(x, y, h, t, seed = 1, ripe = 1) {                   // виноградная лоза на колу с гроздьями
  const r = rng(9480 + seed), sw = Math.sin(t * 1.6 + seed) * 4; push(x, y, 1);
  pencil([[0, 0], [0, -h]], { w: 5, col: '#8a6a44', pass2: false }); pencil([[-60, -h * 0.8], [60, -h * 0.8]], { w: 2, col: '#6a5a4a', a: 0.7, pass2: false });
  line([[0, 0], [-6, -h * 0.4], [8, -h * 0.7], [-30, -h * 0.82], [-60, -h * 0.8]], { w: 6, col: '#5a3a24' }); line([[8, -h * 0.7], [40, -h * 0.82], [60, -h * 0.8]], { w: 5, col: '#5a3a24' });
  for (let k = 0; k < 9; k++) { const lx = (r() - 0.5) * 140 + sw, ly = -h * 0.72 - r() * h * 0.3; const lf = blob([[lx - 22, ly], [lx - 14, ly - 18], [lx, ly - 24], [lx + 14, ly - 18], [lx + 22, ly], [lx, ly + 14]], { wash: lerpC('#5a8a2e', '#2e5a1e', r()), washA: 1, w: 1.4, col: '#1e3a14' }); pencil([[lx, ly + 10], [lx, ly - 16]], { w: 1, col: '#1e3a14', a: 0.6, pass2: false }); }
  for (let g = 0; g < 3; g++) { const gx = -40 + g * 40 + sw, gy = -h * 0.74; for (let q = 0; q < 10; q++) { const row = Math.floor(Math.sqrt(q * 2)), cx = gx + (q - row * (row + 1) / 2 - row / 2) * 9, cy = gy + row * 10; ell(cx, cy, 6, 6.5, { wash: lerpC('#8ab04a', '#4a1a3a', ripe), washA: 1, w: 1, col: '#1a0a14' }); } }
  pop();
}
function barrel(x, y, s, o = {}) {                                // дубовая бочка лёжа (торцом к зрителю) или стоя
  const L = '#1a0e06'; push(x, y, s);
  if (o.side) { const b = blob([[-120, -80], [-60, -96], [60, -96], [120, -80], [128, 0], [120, 80], [60, 96], [-60, 96], [-120, 80], [-128, 0]], { wash: '#8a5a32', washA: 1, w: 2.4, col: L }); shadeG(b.path, 0, -96, 0, 96, '#3a2010', 0.6);
    for (const bx of [-88, -40, 40, 88]) pencil([[bx, -92], [bx * 1.04, 0], [bx, 92]], { w: 6, col: '#3a3a3e', pass2: false }); for (let k = -2; k <= 2; k++) pencil([[-124, k * 34], [124, k * 34]], { w: 1.2, col: '#4a2a14', a: 0.5, pass2: false }); }
  else { const e = ell(0, 0, 100, 100, { wash: '#a06a3a', washA: 1, w: 2.6, col: L }); shadeG(e.path, -60, -60, 60, 60, '#4a2a14', 0.5); for (let k = 0; k < 5; k++) pencil([[-90 + k * 45, -40 + Math.abs(k - 2) * -10], [-90 + k * 45, 40 + Math.abs(k - 2) * 10]], { w: 1.2, col: '#5a3418', a: 0.55, pass2: false });
    pencil(ellPts(0, 0, 100, 100, 0, 0.02, 40), { w: 9, col: '#3a3a3e', pass2: false }); pencil(ellPts(0, 0, 84, 84, 0, 0.02, 40), { w: 2, col: '#2a1408', a: 0.6, pass2: false });
    ell(0, 30, 10, 10, { wash: '#3a2010', washA: 1, w: 1.6, col: L }); if (o.label) { rect(-48, -34, 96, 34, { wash: '#efe4c8', washA: 1, w: 1.4, col: L }); txt(o.label, 0, -16, 20, { font: 'Hand', col: '#4a1020' }); } }
  pop();
}
function bottle(x, y, s, rot = 0, col = '#2a3a1e', label) {        // винная бутылка
  push(x, y, s, rot); const b = blob([[-22, 0], [-24, -110], [-18, -132], [-8, -146], [-8, -190], [8, -190], [8, -146], [18, -132], [24, -110], [22, 0]], { wash: col, washA: 1, w: 2, col: '#0a0a08' });
  ctx.save(); ctx.clip(b.path); ctx.globalAlpha = 0.35; ctx.fillStyle = '#ffffff'; ctx.fillRect(-16, -140, 6, 130); ctx.restore(); rect(-9, -196, 18, 12, { wash: '#a8302a', washA: 1, w: 1.2 });
  if (label) { rect(-20, -84, 40, 44, { wash: '#efe4c8', washA: 1, w: 1.2, col: '#3a2a1a' }); txt(label, 0, -62, 11, { font: 'Osw', col: '#5a1020' }); }
  pop();
}
