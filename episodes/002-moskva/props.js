/* 002 — общие детали, туннель времени и реквизит, которые могут брать все миры выпуска. */
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
  const yrs = ['1938', '1812', '−150 000', '1147', '−310 млн', '1495', '1367', '1735', '2026'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

WORLD.tunnel = wTunnel;
DIR.tunnel = { outfit: 'puffer', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.2], act: () => [[S0.tunnel, 'awe']],
  pose: (t, u, b) => Object.assign(b, { x: 540, y: 1260, s: 1.0, rot: u * 3.2, look: [0, -0.2], watchInHand: true, glow: 1, spin: 1.5 }),
  cam: () => [[S0.tunnel, 540, 960, 0], [S1.tunnel, 540, 960, 0.1]] };
