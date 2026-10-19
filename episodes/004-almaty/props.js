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
  const yrs = ['−?', 'IV в. до н. э.', 'XIII в.', '1865', '1911', '1929', '1943', '1966', '2011', '2026'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

WORLD.tunnel = wTunnel;
DIR.tunnel = { outfit: 'hoodieA', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.2], act: () => [[S0.tunnel, 'awe']],
  pose: (t, u, b) => Object.assign(b, { x: 540, y: 1260, s: 1.0, rot: u * 3.2, look: [0, -0.2], watchInHand: true, glow: 1, spin: 1.5 }),
  cam: () => [[S0.tunnel, 540, 960, 0], [S1.tunnel, 540, 960, 0.1]] };

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

/* ---- 004 Алматы: общие детали ---- */
function apple(x, y, r, rot = 0, o = {}) {                          // яблоко: красно-зелёный бочок, блик, хвостик, листик
  const c1 = o.col || '#c8342a', c2 = o.col2 || '#8ab040', a = o.a ?? 1;
  push(x, y, 1, rot); ctx.save(); ctx.globalAlpha *= a;
  const p = blob([[0, -r * 0.78], [r * 0.62, -r * 0.98], [r * 1.02, -r * 0.4], [r * 0.9, r * 0.5], [r * 0.4, r * 0.98], [0, r * 0.86], [-r * 0.4, r * 0.98], [-r * 0.9, r * 0.5], [-r * 1.02, -r * 0.4], [-r * 0.62, -r * 0.98]], { wash: c2, washA: 1, w: Math.max(1.2, r * 0.06), col: '#3a1408' });
  ctx.save(); ctx.clip(p.path); const g = ctx.createRadialGradient(-r * 0.3, -r * 0.2, r * 0.1, -r * 0.1, 0, r * 1.2); g.addColorStop(0, c1); g.addColorStop(0.7, lerpC(c1, '#5a0e08', 0.35)); g.addColorStop(1, 'rgba(90,14,8,0)'); ctx.fillStyle = g; ctx.fillRect(-r * 2, -r * 2, r * 4, r * 4);
  for (let k = 0; k < 7; k++) pencil([[-r + k * r * 0.3, -r], [-r * 0.8 + k * r * 0.3, r]], { w: Math.max(1, r * 0.03), col: '#7a1a10', a: 0.2, pass2: false }); ctx.restore();
  ell(-r * 0.38, -r * 0.42, r * 0.18, r * 0.12, { wash: '#fff6e0', washA: 0.75, line: false, rot: -0.6 });
  pencil([[0, -r * 0.7], [r * 0.06, -r * 1.25]], { w: Math.max(1.4, r * 0.09), col: '#4a2c14', pass2: false });
  if (!o.noLeaf) blob([[r * 0.06, -r * 1.12], [r * 0.5, -r * 1.42], [r * 0.85, -r * 1.2], [r * 0.4, -r * 1.02]], { wash: '#5a8a2a', washA: 1, w: Math.max(1, r * 0.05), col: '#1e3a0a' });
  if (o.bite) ell(r * 0.85, -r * 0.1, r * 0.42, r * 0.5, { wash: '#f6ecc8', washA: 1, w: Math.max(1, r * 0.05), col: '#8a6a3a' });
  ctx.restore(); pop();
}
function alatau(t, base, o = {}) {                                   // Заилийский Алатау: зубчатые пики, снег, ледники, тени
  const sc = o.s || 1, snow = o.snow ?? 1, col = o.col || '#6a7a96', colD = o.colD || '#3a4664';
  const peaks = [[-300, 0], [-120, -380], [20, -260], [160, -520], [300, -360], [420, -470], [560, -300], [700, -560], [860, -380], [980, -440], [1140, -280], [1400, 0]];
  push(0, base, 1); const P = [[-400, 300]].concat(peaks.map(([x, y]) => [x, y * sc])).concat([[1500, 300]]);
  const m = poly(P, { wash: col, washA: 1, w: 2.2, col: colD, key: o.key || 9400 });
  shadeG(m.path, 0, -500 * sc, 0, 200, colD, 0.4);
  for (let i = 1; i < peaks.length - 1; i++) { const [x, y] = peaks[i], yy = y * sc;
    ctx.save(); ctx.clip(m.path); poly([[x - 10, yy - 4], [x + 10, yy - 4], [x + 120, yy + 160 * sc], [x + 60, yy + 140 * sc], [x + 20, yy + 230 * sc], [x - 30, yy + 150 * sc], [x - 90, yy + 190 * sc], [x - 120, yy + 150 * sc]], { wash: '#f4f6fa', washA: snow, w: 1.4, col: '#9aa6c0', a: 0.6 * snow });
    pencil([[x, yy], [x + 18, yy + 120 * sc], [x - 6, yy + 260 * sc]], { w: 2, col: colD, a: 0.5, pass2: false });
    poly([[x, yy], [x + 140, yy + 200 * sc], [x + 40, yy + 260 * sc]], { wash: colD, washA: 0.25, line: false }); ctx.restore(); }
  pop();
}
function appleTree(x, y, h, t, seed, o = {}) {                       // дикая яблоня Сиверса: кривой ствол, раскидистая крона, яблоки/цветы
  const r = rng(seed), sw = Math.sin(t * 1.4 + seed) * 4, a = o.a ?? 1;
  push(x, y, h / 400); ctx.save(); ctx.globalAlpha *= a;
  shape(tubeP([[0, 0], [-8, -90], [12, -170], [-6, -230]], 46, 22), { wash: o.bark || '#5a4030', washA: 1, w: 2.4, col: '#1e120a' });
  for (const [bx, by, ex, ey] of [[0, -170, -120, -260], [4, -190, 130, -280], [-4, -220, -40, -330], [6, -210, 60, -340]]) pencil([[bx, by], [(bx + ex) / 2 + sw, (by + ey) / 2], [ex + sw, ey]], { w: 12, col: o.bark || '#5a4030' });
  const cols = o.bloom ? ['#f4e2e6', '#f8eef0', '#e8c8d0'] : (o.leaf || ['#5e8a32', '#4a7428', '#76a040']);
  for (let k = 0; k < 9; k++) { const cx = (r() - 0.5) * 300 + sw, cy = -260 - r() * 130, rr = 70 + r() * 50;
    const c = blob(ellPts(cx, cy, rr, rr * 0.8, 0, 0.3, 9).map(([px, py]) => [px + (r() - 0.5) * 20, py + (r() - 0.5) * 20]), { wash: cols[k % 3], washA: 1, w: 1.8, col: o.bloom ? '#a88890' : '#2a4414', a: 0.8 });
    hatch(c.path, c.bb, { gap: 7, a: 0.16, col: o.bloom ? '#a88890' : '#1e3a0a', ang: 0.9, key: seed + k }); }
  if (!o.bloom) for (let k = 0; k < (o.n ?? 14); k++) apple((r() - 0.5) * 300 + sw, -230 - r() * 160, 11 + r() * 5, r() - 0.5, { noLeaf: true, col: r() > 0.3 ? '#c8342a' : '#d8b03a' });
  else for (let k = 0; k < 40; k++) ell((r() - 0.5) * 320 + sw, -230 - r() * 180, 5, 5, { wash: '#fff8fa', washA: 1, line: false });
  ctx.restore(); pop();
}
function spruce(x, y, h, col = '#2e4a3a', a = 1) {                   // тянь-шаньская ель: узкая тёмная пирамида
  ctx.save(); ctx.globalAlpha *= a; pencil([[x, y], [x, y - h]], { w: Math.max(2, h * 0.03), col: '#3a2a1a' });
  for (let k = 0; k < 6; k++) { const yy = y - h * 0.15 - k * h * 0.14, w = h * (0.2 - k * 0.028); poly([[x - w, yy], [x, yy - h * 0.22], [x + w, yy]], { wash: col, washA: 1, w: 1.4, col: '#0e1e14', a: 0.6 }); } ctx.restore();
}
const nrmW = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
function wtw(k, w) {                                                  // время слова внутри субтитра-фрагмента (пропорция по буквам)
  const c = CAPS.find(c => c.key === k && c.words.some(x => nrmW(x) === nrmW(w))) || CAPS.find(c => c.key === k && c.words.some(x => nrmW(x).startsWith(nrmW(w)))); if (!c) return WT(k, w);
  const i = c.words.findIndex(x => nrmW(x).startsWith(nrmW(w))); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
  return c.t0 + (c.t1 - c.t0) * pre / tot;
}
