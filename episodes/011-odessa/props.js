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
  const yrs = ['1941', '1917', '1832', '1824', '1719', '1714', '1703', '1300', '2026'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

WORLD.tunnel = wTunnel;
DIR.tunnel = { outfit: 'hoodieP', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.2], act: () => [[S0.tunnel, 'awe']],
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
  // ---- 004 Сеул: корейские головные уборы
  if (o.hat === 'topknot' || o.hat === 'gat' || o.hat === 'samo' || o.hat === 'ikseon' || o.hat === 'jeonrip') { blob([[-42, hy - 4], [-38, hy - 42], [0, hy - 50], [38, hy - 42], [42, hy - 4], [32, hy - 30], [-32, hy - 30]], { wash: '#1a1614', washA: 1, w: 1.8, col: L }); pencil([[-40, hy - 26], [40, hy - 26]], { w: 4, col: '#2a2420', pass2: false }); }
  if (o.hat === 'topknot') ell(0, hy - 58, 11, 14, { wash: '#1a1614', washA: 1, w: 1.6, col: L });
  if (o.hat === 'gat') { const bpp = shape(ellPts(0, hy - 40, 80, 13, 0, 0, 30), { wash: '#16161a', washA: 0.55, w: 1.6, col: L }); hatch(bpp.path, bpp.bb, { gap: 4, a: 0.3, col: '#000', ang: 0.2, w: 0.8 }); shape([[-26, hy - 40], [-23, hy - 90], [23, hy - 90], [26, hy - 40]], { wash: '#16161a', washA: 0.7, w: 1.8, col: L }); ell(0, hy - 90, 23, 5, { wash: '#000', washA: 0.85, w: 1.2, col: L }); for (const k of [-1, 1]) pencil([[k * 30, hy - 38], [k * 46, hy + 10], [k * 20, hy + 52]], { w: 1.6, col: '#3a2a1a', a: 0.8, pass2: false }); }
  if (o.hat === 'samo') { for (const k of [-1, 1]) ell(k * 52, hy - 52, 22, 9, { wash: '#16161a', washA: 0.95, w: 1.4, col: L }); blob([[-34, hy - 32], [-30, hy - 78], [0, hy - 92], [30, hy - 78], [34, hy - 32]], { wash: '#16161a', washA: 1, w: 2, col: L }); }
  if (o.hat === 'ikseon') { for (const k of [-1, 1]) ell(k * 22, hy - 96, 10, 20, { wash: '#16161a', washA: 0.95, w: 1.4, col: L, rot: k * 0.3 }); blob([[-36, hy - 32], [-32, hy - 76], [0, hy - 84], [32, hy - 76], [36, hy - 32]], { wash: '#16161a', washA: 1, w: 2, col: L }); pencil([[-34, hy - 40], [34, hy - 40]], { w: 3, col: '#d6a842', pass2: false }); }
  if (o.hat === 'jeonrip') { ell(0, hy - 40, 76, 12, { wash: '#1a1a1e', washA: 1, w: 1.8, col: L }); blob([[-30, hy - 42], [-26, hy - 80], [0, hy - 90], [26, hy - 80], [30, hy - 42]], { wash: '#1a1a1e', washA: 1, w: 1.8, col: L }); for (let q = -3; q <= 3; q++) pencil([[0, hy - 90], [q * 7, hy - 72]], { w: 2.4, col: '#c8302a', pass2: false }); }
  if (o.hat === 'straw') { blob([[-80, hy - 30], [-40, hy - 52], [0, hy - 58], [40, hy - 52], [80, hy - 30], [0, hy - 36]], { wash: '#d8b866', washA: 1, w: 1.8, col: L }); blob([[-30, hy - 46], [-24, hy - 76], [0, hy - 84], [24, hy - 76], [30, hy - 46]], { wash: '#d0ae5a', washA: 1, w: 1.8, col: L }); pencil([[-30, hy - 50], [30, hy - 50]], { w: 4, col: '#2a4a3a', pass2: false }); }
  if (o.hat === 'police') { blob([[-44, hy - 26], [-42, hy - 62], [0, hy - 74], [42, hy - 62], [44, hy - 26]], { wash: hc, washA: 1, w: 2, col: L }); ell(14, hy - 26, 40, 8, { wash: '#101010', washA: 1, w: 1.6, col: L }); ell(0, hy - 52, 9, 9, { wash: '#d6a842', washA: 1, w: 1.2, col: '#5a3a08' }); pencil([[-42, hy - 32], [42, hy - 32]], { w: 4, col: '#d6a842', a: 0.7, pass2: false }); }
  if (o.hat === 'sailor') { ell(0, hy - 46, 46, 14, { wash: '#f2efe6', washA: 1, w: 1.8, col: L }); rect(-40, hy - 46, 80, 14, { wash: '#14141a', washA: 1, w: 1.4, col: L }); for (const k of [0, 1]) pencil([[30, hy - 34], [40 + k * 10, hy + 10 + Math.sin(t * 3 + k) * 6]], { w: 4, col: '#14141a', pass2: false }); }
  if (o.hat === 'bun') { ell(0, hy - 30, 44, 26, { wash: '#1a1614', washA: 1, w: 1.8, col: L }); ell(-34, hy - 6, 18, 16, { wash: '#1a1614', washA: 1, w: 1.6, col: L }); pencil([[-58, hy - 8], [-10, hy - 4]], { w: 3, col: '#d6a842', pass2: false }); }
  if (o.hat === 'jangot') blob([[-54, hy + 70], [-56, hy - 30], [0, hy - 66], [56, hy - 30], [54, hy + 70], [36, hy - 6], [-36, hy - 6]], { wash: hc, washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: L, ang: 1.2 } });
  pop();
}

/* ---- 004: общие хелперы любого выпуска (время слова, «пуф», неон, дом, толпа) ---- */
function neon(x, y, w, h, s1, col, t, on = 1, o = {}) {                 // неоновая вывеска: тёмная плашка, трубки текста, ореол; on 0 → мёртвая
  const f = on * (o.flick ? (Math.sin(t * 40 + x) > -0.6 ? 1 : 0.2) : 1);
  rect(x - w / 2, y - h / 2, w, h, { wash: o.bg || '#16121c', washA: 0.95, w: 1.8, col: '#000', a: 0.8 });
  if (f > 0.05) { glow(x, y, w * 0.8, col, 0.35 * f); }
  txt(s1, x, y + h * 0.04, h * (o.size || 0.62), { font: o.font || 'KSign', col: f > 0.05 ? col : '#4a4450', bold: false, a: f > 0.05 ? 1 : 0.8 });
  if (f > 0.05) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; txt(s1, x, y + h * 0.04, h * (o.size || 0.62), { font: o.font || 'KSign', col: '#ffffff', bold: false, a: 0.35 * f }); ctx.restore(); }
}

function cityBlock(x, base, w, h, col, t, o = {}) {                   // современный дом: фасад, окна, вывески на торце
  const fp = rect(x, base - h, w, h, { wash: col, washA: 1, w: 2, col: '#0e0c12', a: 0.7, key: o.key });
  hatch(fp.path, fp.bb, { gap: 8, a: 0.1, col: '#000', ang: 1.4, w: 1 });
  windows(x + 6, base - h + 10, w - 12, h - 20, Math.max(2, Math.round(w / 34)), Math.max(3, Math.round(h / 40)), o.seed || 1, (o.on ?? 0.6), o.cA || '#ffd98a', o.cB || '#9fd8ff', (o.wa ?? 0.85));
  pencil([[x, base - h], [x + w, base - h]], { w: 3, col: '#000', a: 0.5, pass2: false });
}

function crowd(x0, x1, base, n, t, seed, o = {}) {                     // толпа силуэтов (дальний план): головы, плечи, телефоны
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), s = (o.s || 1) * (0.8 + r() * 0.3), y = base + r() * (o.dy || 20), c = (o.cols || ['#2a2a36', '#3a2e3a', '#28343a', '#4a3a30', '#3a3a2a'])[i % 5], bob = Math.sin(t * 3 + i) * 2;
    blob([[x - 22 * s, y], [x - 24 * s, y - 70 * s], [x - 14 * s, y - 92 * s], [x + 14 * s, y - 92 * s], [x + 24 * s, y - 70 * s], [x + 22 * s, y]], { wash: c, washA: 1, w: 1.4, col: '#0a0810', a: 0.6 });
    ell(x, y - 108 * s + bob, 13 * s, 15 * s, { wash: o.skin || '#c89a78', washA: 1, w: 1.2, col: '#0a0810', a: 0.6 });
    blob([[x - 14 * s, y - 110 * s + bob], [x - 10 * s, y - 126 * s + bob], [x + 10 * s, y - 126 * s + bob], [x + 14 * s, y - 110 * s + bob], [x, y - 116 * s + bob]], { wash: '#141010', washA: 1, line: false });
    if (o.phones && r() < o.phones) { const px = x + 16 * s, py = y - 128 * s; rect(px - 5 * s, py - 9 * s, 10 * s, 16 * s, { wash: '#0a0a10', washA: 1, w: 1, col: '#000' }); glow(px, py, 26 * s, 'rgba(170,220,255,1)', 0.6); pencil([[x + 10 * s, y - 80 * s], [px, py + 6 * s]], { w: 5 * s, col: c, pass2: false }); }
    if (o.flags && r() < o.flags) { const fx = x - 10 * s, fy = y - 150 * s; pencil([[fx, y - 70 * s], [fx, fy]], { w: 2, col: '#5a4a3a', pass2: false }); const wv = Math.sin(t * 6 + i) * 4; const F = o.flag || (typeof taeguk === 'function' ? taeguk : null); if (F) F(fx + 22 * s, fy + 14 * s, s * (1 + wv * 0.01)); }
  }
}

function wtk(k, w) {                                                   // время слова внутри субтитра-фрагмента (пропорция по буквам)
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
  const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
  return c.t0 + (c.t1 - c.t0) * pre / tot;
}

function puffK(x, y, s, t, t0, d = 0.5, seed = 1, col = '#f6efe0') {   // облачко «пуф» (переодевание)
  if (t < t0 || t > t0 + d) return; const k = (t - t0) / d, r = rng(seed);
  for (let i = 0; i < 12; i++) { const a = r() * 6.283, dd = (40 + r() * 90) * sm(k) * s; ell(x + Math.cos(a) * dd, y + Math.sin(a) * dd * 0.8, (40 + r() * 30) * s * (1 - k * 0.5), (34 + r() * 24) * s * (1 - k * 0.5), { wash: col, washA: 0.9 * (1 - k), w: 2, col: '#6a5a4a', a: 0.4 * (1 - k) }); }
}
function pine(x, y, h, t, seed = 1, o = {}) {                          // сосна (красная/корейская): изогнутый ствол: изогнутый ствол, плоские «облака» хвои
  const r = rng(9160 + seed), sw = Math.sin(t * 0.8 + seed) * h * 0.006;
  const T = spline([[x, y], [x + h * 0.08 * (r() - 0.3), y - h * 0.35], [x - h * 0.06, y - h * 0.62], [x + h * 0.1 + sw, y - h * 0.95]], false, 8);
  shape(tubeP(T, h * 0.07, h * 0.03), { wash: o.trunk || '#a8563a', washA: 1, w: 1.8, col: '#2a120a', a: 0.8 });
  pencil(T.map(([a, b]) => [a + h * 0.012, b]), { w: Math.max(1, h * 0.006), col: '#e89a6a', a: 0.5, pass2: false });
  for (let k = 0; k < 5; k++) { const i = Math.min(T.length - 1, Math.round((0.4 + k * 0.15) * (T.length - 1))), [bx, by] = T[i], dir = k % 2 ? 1 : -1, len = h * (0.22 + r() * 0.18);
    pencil([[bx, by], [bx + dir * len * 0.7 + sw, by - h * 0.05]], { w: Math.max(1.5, h * 0.012), col: '#6a3a24', pass2: false });
    const cx = bx + dir * len * 0.8 + sw, cy = by - h * 0.07, P = []; for (let q = 0; q <= 14; q++) { const a = Math.PI + q / 14 * Math.PI; P.push([cx + Math.cos(a) * len * 0.75, cy + Math.sin(a) * len * 0.28 + (q % 2 ? h * 0.012 : 0)]); }
    P.push([cx + len * 0.7, cy + h * 0.03], [cx - len * 0.7, cy + h * 0.03]);
    const fp = shape(P, { wash: o.leaf || '#2f5a34', washA: 1, w: 1.6, col: '#0e2410', a: 0.7 }); hatch(fp.path, fp.bb, { gap: 4, a: 0.25, col: '#0e2410', ang: 1.2, w: 1 });
    pencil(P.slice(2, 12).map(([a, b]) => [a, b + 3]), { w: 2, col: o.leafL || '#6a9a58', a: 0.5, pass2: false }); }
}
