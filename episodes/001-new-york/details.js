/* v4: детальные версии существ и сооружений (переопределяют функции миров). */

function theropod(x, y, s, t, sniff, walk) {                        // дилофозавр в профиль (морда влево): мощное бедро, S-шея, вытянутый череп с двумя гребнями
  push(x, y, s);
  const ph = t * 5.2 * walk, lg = Math.sin(ph) * 30 * walk, bob = -Math.abs(Math.sin(ph)) * 10 * walk;
  const col = '#7a6f3e', colD = '#3e3618', colL = '#c9b77a', ln = '#1a1408';
  // хвост: длинный, сужается, приподнят
  const tail = spline([[110, -360 + bob], [260, -390 + bob], [420, -380 + bob + Math.sin(t * 1.8) * 12], [560, -340 + bob + Math.sin(t * 1.8 + 0.8) * 26], [660, -300 + bob + Math.sin(t * 1.8 + 1.6) * 36]], false, 8);
  const tp = shape(tubePts(tail, 120, 6), { wash: col, washA: 0.99, w: 3, col: ln, key: 1 });
  for (let i = 4; i < tail.length - 4; i += 4) { const p = tail[i]; line([[p[0] - 6, p[1] - 30 + i * 0.6], [p[0] + 8, p[1] + 10]], { w: 8 - i * 0.12, col: colD, a: 0.7, pass2: false }); }
  fstrokes(tp.path, tp.bb, 60, 0.15, 12, colD, 0.35, 2);
  // дальняя нога
  blob([[70, -330 + bob], [140, -330 + bob], [130 - lg, -190], [96 - lg * 1.2, -70], [118 - lg * 1.3, -14], [60 - lg * 1.3, -10], [70 - lg * 1.1, -80], [80 - lg, -200]], { wash: colD, washA: 0.97, w: 2.6, col: ln, key: 3 });
  // туловище
  const body = [[-90, -400 + bob], [0, -450 + bob], [120, -440 + bob], [190, -380 + bob], [170, -300 + bob], [60, -270 + bob], [-60, -290 + bob], [-120, -340 + bob]];
  const bp = blob(body, { wash: col, washA: 0.99, w: 3.4, col: ln, key: 4 });
  blob([[-100, -320 + bob], [0, -282 + bob], [110, -290 + bob], [20, -300 + bob], [-80, -330 + bob]], { wash: colL, washA: 0.85, line: false });
  softShade(bp.path, 0, -260 + bob, 0, -420 + bob, 'rgba(30,24,8,0.9)', 0.35);
  for (let k = 0; k < 9; k++) line([[-80 + k * 28, -430 + bob + Math.abs(k - 4) * 3], [-66 + k * 28, -350 + bob]], { w: 9, col: colD, a: 0.55, pass2: false });   // полосы
  for (let k = 0; k < 12; k++) shape([[-90 + k * 24, -440 + bob + Math.abs(k - 5) * 2.5], [-80 + k * 24, -458 + bob + Math.abs(k - 5) * 2.5], [-70 + k * 24, -440 + bob + Math.abs(k - 5) * 2.5]], { wash: colD, washA: 0.9, w: 1.2, col: ln });   // гребень спины
  fstrokes(bp.path, bp.bb, 120, 0.2, 10, colD, 0.35, 5);
  // ближняя нога: бедро-мускул, голень назад, плюсна, три пальца с когтями
  const hip = [110, -340 + bob];
  const thigh = ell(hip[0] - 10, hip[1] + 40, 70, 95, { wash: col, washA: 0.99, w: 3, col: ln, rot: 0.25, shade: { gap: 6, a: 0.3, col: colD, ang: 1.2 }, key: 6 });
  blob([[60, -300 + bob], [140, -290 + bob], [120 + lg, -170], [92 + lg * 1.2, -70], [112 + lg * 1.3, -16], [54 + lg * 1.3, -12], [66 + lg * 1.1, -84], [72 + lg, -200]], { wash: col, washA: 0.99, w: 3, col: ln, key: 7, shade: { gap: 6, a: 0.25, col: colD } });
  const fx = 84 + lg * 1.3; for (let q = -1; q <= 1; q++) { line([[fx, -14], [fx - 46 + q * 26, 0]], { w: 11, col }); shape([[fx - 46 + q * 26, -6], [fx - 64 + q * 26, 4], [fx - 46 + q * 26, 6]], { wash: '#efe6c8', washA: 1, w: 1.4, col: ln }); }
  // ручки с когтями
  line([[-80, -330 + bob], [-110, -300 + bob], [-128, -312 + bob]], { w: 14, col }); for (let q = 0; q < 3; q++) line([[-128, -312 + bob], [-142 - q * 4, -300 + bob + q * 6]], { w: 3, col: '#efe6c8', pass2: false });
  // шея → голова (опускается обнюхать)
  const hx = lerp(-190, -280, sniff), hy = lerp(-600, -320, sniff) + bob;
  const neck = spline([[-80, -390 + bob], [-140, -460 + bob + sniff * 40], [-170 - sniff * 40, -540 + sniff * 170], [hx + 40, hy + 12]], false, 8);
  const np = shape(tubePts(neck, 100, 62), { wash: col, washA: 0.99, w: 3, col: ln, key: 8 });
  fstrokes(np.path, np.bb, 40, 1.2, 10, colD, 0.4, 9);
  for (let i = 3; i < neck.length - 2; i += 4) { const p = neck[i]; line([[p[0] - 22, p[1] - 6], [p[0] + 12, p[1] + 16]], { w: 3, col: colL, a: 0.5, pass2: false }); }
  push(hx, hy, 1.15, lerp(0.02, 0.32, sniff));
  const jaw = 0.12 + Math.max(0, Math.sin(t * 3)) * 0.1 * (1 - sniff) + sniff * 0.18;
  const skull = [[-150, 0], [-120, -22], [-40, -44], [30, -46], [70, -26], [78, 6], [40, 22], [-60, 16], [-140, 10]];
  blob([[-140, 10], [-60, 18 + jaw * 60], [30, 26 + jaw * 40], [50, 14], [-60, 10]], { wash: colD, washA: 0.99, w: 2.6, col: ln });   // нижняя челюсть
  for (let q = 0; q < 8; q++) shape([[-136 + q * 18, 10 + jaw * 10 * q / 8], [-130 + q * 18, 22 + jaw * 14 * q / 8], [-124 + q * 18, 10 + jaw * 10 * q / 8]], { wash: '#f4ecd2', washA: 1, w: 1.2, col: ln });
  const sp = blob(skull, { wash: col, washA: 0.99, w: 3.2, col: ln, key: 10, shade: { gap: 6, a: 0.25, col: colD, ang: 0.4 } });
  for (let q = 0; q < 8; q++) shape([[-140 + q * 19, 8], [-134 + q * 19, -4], [-128 + q * 19, 8]], { wash: '#f4ecd2', washA: 1, w: 1.2, col: ln });
  for (const [c, ox] of [[0, -60], [1, -20]]) { poly([[ox - 20, -40 + c * 2], [ox - 6, -110 + c * 10], [ox + 18, -46 + c * 2]], { wash: '#b04a22', washA: 0.97, w: 2.4, col: '#2a0e06' }); for (let q = 0; q < 3; q++) line([[ox - 14 + q * 9, -48], [ox - 8 + q * 8, -90 + q * 8 + c * 8]], { w: 2, col: '#5a1a08', a: 0.8, pass2: false }); }
  ell(20, -22, 12, 10, { wash: '#e8c24a', washA: 1, w: 2.2, col: ln }); ctx.fillStyle = '#0a0604'; ctx.beginPath(); ctx.ellipse(18 - sniff * 4, -22, 3, 8, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,240,0.9)'; ctx.beginPath(); ctx.arc(15, -26, 2.4, 0, 6.3); ctx.fill();
  line([[0, -40], [36, -36]], { w: 5, col: ln }); ctx.fillStyle = ln; ctx.beginPath(); ctx.ellipse(-132, -6, 5, 3, 0.3, 0, 6.3); ctx.fill();
  fstrokes(sp.path, sp.bb, 30, 0.1, 8, colD, 0.4, 11);
  if (sniff > 0.5) { const ph2 = (t * 1.8) % 1; glow(-170 - ph2 * 80, -6, 30 + ph2 * 60, 'rgba(240,238,228,1)', 0.5 * (1 - ph2), 'source-over'); }
  pop(); pop();
}

function mastodon(x, y, s, t) {                                      // мастодонт: куполообразная голова, косматая шерсть, загнутые бивни, хобот
  push(x, y, s, 0, -1); const ph = t * 3.2, col = '#5a3a22', colD = '#2e1c0e', colL = '#8a6040';
  for (let k = 0; k < 4; k++) { const lx = -150 + k * 105, sw = Math.sin(ph + k * 1.6) * 14; blob([[lx - 30, -140], [lx + 30, -140], [lx + 28 + sw, -8], [lx - 30 + sw, -8]], { wash: k % 2 ? colD : col, washA: 0.99, w: 2.6, col: '#120804' }); ell(lx + sw, -6, 32, 10, { wash: '#3a2a1c', washA: 1, w: 1.8 }); }
  const body = [[-200, -260], [-120, -400], [20, -420], [160, -380], [230, -270], [220, -130], [-180, -110]];
  const bp = blob(body, { wash: col, washA: 0.99, w: 3.4, col: '#120804', key: 1 });
  fstrokes(bp.path, bp.bb, 260, 1.45, 30, colD, 0.55, 2, 3); fstrokes(bp.path, bp.bb, 90, 1.5, 24, colL, 0.4, 3, 2);
  for (let k = 0; k < 22; k++) { const xx = -190 + k * 19, yy = -120 + Math.sin(k) * 6; line([[xx, yy - 20], [xx + 2 + Math.sin(t * 2 + k) * 3, yy + 30]], { w: 4, col: colD, pass2: false }); }   // бахрома шерсти
  const head = [[-200, -250], [-250, -340], [-200, -420], [-120, -400], [-110, -280], [-160, -210]];
  const hp = blob(head, { wash: col, washA: 0.99, w: 3.2, col: '#120804', key: 4 }); fstrokes(hp.path, hp.bb, 80, 1.4, 20, colD, 0.5, 5, 3);
  blob([[-130, -380], [-90, -400], [-80, -320], [-120, -300]], { wash: colD, washA: 0.95, w: 2.2, col: '#120804' });   // ухо
  const tr = spline([[-230, -250], [-262, -170], [-252 + Math.sin(t * 1.5) * 10, -80], [-226 + Math.sin(t * 1.5) * 16, -40]], false, 8);
  const tpp = shape(tubePts(tr, 50, 22), { wash: col, washA: 0.99, w: 2.8, col: '#120804' }); for (let i = 2; i < tr.length; i += 3) { const p = tr[i]; line([[p[0] - 14, p[1]], [p[0] + 12, p[1] + 2]], { w: 1.6, col: colD, pass2: false }); }
  for (const dz of [0, 10]) { const tusk = spline([[-206 + dz, -232], [-262 + dz, -190], [-318 + dz, -220], [-326 + dz, -290]], false, 8); pencil(tusk, { w: 18 - dz * 0.6, col: '#e8dcbc' }); pencil(tusk, { w: 2.2, col: '#3a2a14', pass2: false }); }
  ell(-200, -330, 7, 6, { wash: '#0a0604', washA: 1, w: 1.2 }); line([[-214, -346], [-188, -344]], { w: 3, col: colD });
  pop();
}

function statue(x, y, s, t, pat) {                                   // Статуя Свободы v4: звёздный форт, пьедестал, тога с драпировкой, лицо, корона, скрижаль, факел
  push(x, y, s);
  const star = []; for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283, R = i % 2 ? 230 : 300; star.push([Math.cos(a) * R, Math.sin(a) * R * 0.22]); }
  poly(star, { wash: '#8a7e6a', washA: 0.99, w: 2.4, col: '#2a2010', shade: { gap: 6, a: 0.3, col: '#3a3020' } });
  poly([[-170, -10], [170, -10], [150, -80], [-150, -80]], { wash: '#a89a80', washA: 0.99, w: 2.6, col: '#2a2010' });
  poly([[-130, -80], [130, -80], [104, -390], [-104, -390]], { wash: '#c8b898', washA: 0.99, w: 2.8, col: '#2a2010', shade: { gap: 7, a: 0.25, ang: 1.4 } });
  for (let r = 0; r < 3; r++) for (const wx of [-50, 0, 50]) rect(wx - 10, -350 + r * 80, 20, 46, { wash: '#6a5a44', washA: 0.95, w: 1.4 });
  rect(-112, -400, 224, 22, { wash: '#b8a888', washA: 1, w: 2 });
  push(0, -400, 1);
  const robe = [[-90, 0], [90, 0], [78, -160], [70, -300], [60, -400], [-62, -400], [-72, -300], [-82, -160]];
  const rp = poly(robe, { wash: K.copper, washA: 0.99, w: 3, col: '#2a1408' });
  ctx.save(); ctx.clip(rp.path); const front = -560 + pat * 760; const pg = ctx.createLinearGradient(0, front - 120, 0, front + 40); pg.addColorStop(0, K.patina); pg.addColorStop(1, 'rgba(90,163,145,0)'); ctx.fillStyle = pg; ctx.fillRect(-120, -600, 240, front + 640); ctx.restore();
  const fD = pat > 0.6 ? '#2f6a5a' : '#7a3a14', fL = pat > 0.6 ? '#9ad8c4' : '#e8a070';
  for (let k = 0; k < 9; k++) { const x0 = -78 + k * 19; line([[x0, -6], [x0 + 6 + Math.sin(k * 1.3) * 8, -150], [x0 + 12 - k * 1.5, -300]], { w: 2.4, col: fD, a: 0.85, pass2: false }); line([[x0 + 4, -10], [x0 + 10, -140]], { w: 1.4, col: fL, a: 0.5, pass2: false }); }
  line([[-62, -380], [-10, -300], [70, -220]], { w: 14, col: pat > 0.15 ? '#4f9684' : '#b05e2a' }); line([[-62, -380], [-10, -300], [70, -220]], { w: 2, col: fD, pass2: false });   // перевязь тоги
  const col = pat > 0.15 ? K.patina : K.copper, colD = pat > 0.15 ? '#2f6a5a' : '#7a3a14';
  poly([[-118, -300], [-58, -320], [-52, -196], [-110, -180]], { wash: col, washA: 0.99, w: 2.4, col: '#1a0e06' }); txt('JULY IV', -84, -262, 13, { col: colD, font: 'Osw', rot: -0.2 }); txt('MDCCLXXVI', -82, -240, 11, { col: colD, font: 'Osw', rot: -0.2 });
  line([[-60, -380], [-100, -330], [-84, -260]], { w: 26, col }); pencil([[-60, -380], [-100, -330], [-84, -260]], { w: 2.2 });
  const arm = [[52, -388], [96, -520], [110, -650]]; line(arm, { w: 32, col }); pencil(arm, { w: 2.4 }); line([[56, -400], [80, -470], [70, -420]], { w: 3, col: colD, pass2: false });
  rect(-14, -430, 28, 34, { wash: col, washA: 0.99, w: 2 });
  ell(0, -464, 38, 44, { wash: col, washA: 0.99, w: 3, col: '#1a0e06', shade: { gap: 5, a: 0.25, col: colD, ang: -0.6 } });
  for (const s2 of [-1, 1]) { ell(s2 * 13, -470, 6, 3, { wash: colD, washA: 1, w: 1 }); line([[s2 * 20, -482], [s2 * 6, -484]], { w: 2, col: colD, pass2: false }); }
  line([[0, -468], [-4, -446], [5, -444]], { w: 2, col: colD, smooth: false }); line([[-9, -432], [9, -432]], { w: 2, col: colD, pass2: false });
  rect(-40, -512, 80, 14, { wash: col, washA: 0.99, w: 2 }); for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.12 + k * 0.76 / 6), b0 = [Math.cos(a) * 36, -506 + Math.sin(a) * 14]; poly([[b0[0] - 7, b0[1]], [b0[0] + Math.cos(a) * 72, b0[1] + Math.sin(a) * 72], [b0[0] + 7, b0[1]]], { wash: col, washA: 0.99, w: 1.8 }); }
  rect(98, -704, 26, 56, { wash: col, washA: 0.99, w: 2 }); poly([[84, -704], [138, -704], [130, -738], [92, -738]], { wash: '#d8a830', washA: 1, w: 2.4 }); for (let q = 0; q < 4; q++) line([[90 + q * 12, -706], [92 + q * 12, -736]], { w: 1.4, col: '#7a5410', pass2: false });
  const fl = Math.sin(t * 12) * 8; glow(112, -790, 150, 'rgba(255,200,90,1)', 0.75); blob([[94, -738], [106, -800], [114, -856 + fl], [126, -806], [132, -738]], { wash: '#ffb03a', washA: 1, w: 2.2, col: '#6a2a06' }); blob([[104, -740], [113, -790 + fl * 0.6], [122, -740]], { wash: '#fff0a0', washA: 1, w: 1.2 });
  if (pat > 0 && pat < 1) for (let i = 0; i < 16; i++) { const r = rng(hsh(FRAME, i)); glow((r() - 0.5) * 220, -200 - r() * 600, 8 + r() * 12, 'rgba(220,255,240,1)', 0.9); }
  pop(); pop();
}

function skeleton(t, floors, cx, base, fh) {                        // стальной каркас Эмпайр-Стейт в 3/4: две грани, колонны, балки, раскосы, рабочие
  const top = base - floors * fh, wF = 480, wS = 220, sk = 0.35;     // фронт и боковая грань (уходит вглубь с наклоном)
  const P = (u, v, side) => side ? [cx + wF / 2 + u * wS, base - v - u * wS * sk] : [cx - wF / 2 + u * wF, base - v];
  for (const side of [1, 0]) {
    const cols = side ? 3 : 6, colC = side ? '#4a2e22' : '#6a4030';
    for (let i = 0; i <= cols; i++) { const a = P(i / cols, 0, side), b = P(i / cols, base - top, side); girder(a[0], a[1], b[0], b[1], side ? 16 : 22, colC); }
    for (let f = 0; f <= floors; f += 4) { const v = f * fh, a = P(0, v, side), b = P(1, v, side); girder(a[0], a[1], b[0], b[1], side ? 10 : 13, colC); }
    for (let f = 0; f < floors - 6; f += 9) for (let i = 0; i < cols; i += 3) { const a = P(i / cols, f * fh, side), b = P((i + 1) / cols, (f + 3) * fh, side); pencil([a, b], { w: 3, col: '#2a1a12', a: 0.7, pass2: false, gap: false }); }
  }
  const r = rng(77); for (let k = 0; k < 6; k++) { const f = Math.floor(r() * Math.max(1, floors - 3)), u = 0.15 + r() * 0.7, p = P(u, f * fh, 0); if (p[1] < top + 10) continue;   // рабочие-силуэты на балках
    push(p[0], p[1] - 8, 0.8); sil([[-10, 0], [-12, -40], [0, -48], [12, -40], [10, 0]], '#1a120c', 1); ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.arc(0, -58, 9, 0, 6.3); ctx.fill(); rect(-11, -70, 22, 6, { wash: '#1a120c', washA: 1, line: false }); pop(); }
  const tp = P(0.5, base - top, 0); line([[tp[0] + 120, tp[1]], [tp[0] + 120, tp[1] - 300], [tp[0] - 200, tp[1] - 280]], { w: 9, col: '#8a2a1a', smooth: false }); line([[tp[0] - 180, tp[1] - 280], [tp[0] - 180, tp[1] - 160]], { w: 2, smooth: false });
  girder(tp[0] - 260, tp[1] - 160, tp[0] - 60, tp[1] - 150, 18, '#6a4030');
  if (Math.sin(t * 7) > 0.3) { const sx = tp[0] + 40, sy = tp[1] + 30; glow(sx, sy, 60, 'rgba(255,180,80,1)', 0.7); for (let i = 0; i < 12; i++) { const rr = rng(hsh(FRAME, i)); const a = -Math.PI / 2 + (rr() - 0.5) * 2.4, d = rr() * 90; pencil([[sx, sy], [sx + Math.cos(a) * d, sy + Math.sin(a) * d + d * d * 0.004]], { w: 2, col: '#ffb040', a: 0.95, pass2: false, gap: false }); } }
  return top;
}
function wEmpire(t, u, cat) {
  const g = sm(u / Math.max(1, S1.empire - S0.empire - 0.3)), floors = Math.floor(g * 102), day = Math.max(1, Math.round(g * 410));
  lay(40, () => { vgrad(-800, 1500, ['#5f84a8', '#d8c8a8', '#efe0c0']); for (let k = 0; k < 6; k++) glow(((k * 300 + t * 20) % 1600) - 200, 260 + k * 70, 240, 'rgba(250,246,236,1)', 0.35, 'source-over'); });
  lay(14, () => { const HZ = 760; vgrad(HZ, 2600, ['#9a968c', '#5a5850']);
    for (let k = 1; k < 26; k++) { const z = k * 0.35, y = HZ + 900 / z; if (y > 2600) continue; pencil([[-1400, y], [W + 1400, y]], { w: 1 + 3 / z, col: '#3a3a36', a: 0.5, pass2: false }); }
    for (let k = -14; k <= 14; k++) pencil([[540 + k * 30, HZ], [540 + k * 420, 2600]], { w: 1.4, col: '#3a3a36', a: 0.4, pass2: false });
    const r = rng(41); for (let i = 0; i < 160; i++) { const z = 0.7 + r() * 7, xw = (r() - 0.5) * 3000, y = HZ + 900 / z, x = 540 + xw / z, w = 70 / z, h = (40 + r() * 160) / z; poly([[x - w, y], [x - w, y - h], [x + w, y - h], [x + w, y]], { wash: ['#8a8478', '#7a7468', '#a09888'][i % 3], washA: 0.95, w: 1, col: '#2a2a26', line: false }); wash(pathOf([[x + w, y], [x + w, y - h], [x + w * 1.4, y - h * 0.9], [x + w * 1.4, y]]), '#4a4640', 0.9); }
    for (let k = 0; k < 6; k++) { const cx2 = ((t * 40 + k * 300) % 1800) - 300; glow(cx2, 820 + k * 40, 160, 'rgba(240,238,230,1)', 0.35, 'source-over'); } });
  haze('#d8d0c0', 0.3);
  lay(6, () => { push(150, 1080, 1); poly([[-50, 0], [-50, -600], [50, -600], [50, 0]], { wash: '#b8b4ac', washA: 0.97, w: 2.4, col: '#2a2a2a' }); for (let k = 0; k < 5; k++) { const r = 50 - k * 9, yy = -600 - k * 50; ell(0, yy, r, 30, { wash: '#d8d4cc', washA: 0.97, w: 2, col: '#2a2a2a', shade: { gap: 5, a: 0.3 } }); for (let q = 0; q < 5; q++) { const a = Math.PI + q / 4 * Math.PI; ctx.fillStyle = '#3a3a40'; ctx.beginPath(); ctx.ellipse(Math.cos(a) * r * 0.7, yy + Math.sin(a) * 18, 4, 7, 0, 0, 6.3); ctx.fill(); } } poly([[-8, -850], [0, -980], [8, -850]], { wash: '#d8d4cc', washA: 1, w: 1.6 }); pop();
    note('Крайслер: ещё вчера выше всех', 300, 480, t, S0.empire + 0.4, S1.empire, '#2a2418', 40, -0.03); });
  haze('#d8d0c0', 0.1);
  lay(1.8, () => skeleton(t, floors, 860, 2700, 22));
  lay(1, () => { girder(-300, GY - 4, 1300, GY - 4, 52, '#6a4636'); girder(-200, 2000, 1300, 2000, 46, '#5a3a2e'); girder(160, GY + 20, 160, 2600, 40, '#5a3a2e');
    for (let k = 0; k < 3; k++) { const bx = 700 + k * 40; rect(bx, GY - 60, 30, 56, { wash: '#2a2420', washA: 1, w: 1.6 }); }   // ведро с заклёпками
    push(250, 700, 1, -0.03); rect(-160, -80, 320, 160, { wash: '#4a3a30', washA: 0.98, w: 3, col: '#120a06' }); for (const [rx, ry] of [[-140, -62], [140, -62], [-140, 62], [140, 62]]) ell(rx, ry, 6, 6, { wash: '#2a1a10', washA: 1, w: 1 });
    txt('ДЕНЬ ' + day + ' / 410', 0, -20, 50, { col: '#f6e7c8', font: 'Osw' }); txt('ЭТАЖ ' + floors + ' / 102', 0, 36, 38, { col: K.amber, font: 'Osw' }); pop(); cat(); });
  lay(0.6, () => { girder(-200, 400, 300, 2400, 70, '#3a2820'); girder(900, 2400, 1400, 300, 60, '#3a2820'); });
  motes(24, [0, 200, W, 1600], '#fff6e0', t, 19, { sp: 4, sz: 2, a: 0.5, wob: 50 });
}

function timesExtra(t) {                                              // Таймс-сквер: пожарные лестницы, вывески, бегущая строка
  for (const [x, top, w] of [[-420, 420, 300], [760, 360, 260]]) for (let y = top + 140; y < 1300; y += 120) { pencil([[x + 30, y], [x + w - 30, y]], { w: 3, col: '#0e0a14' }); pencil([[x + 40, y], [x + w * 0.5, y - 120]], { w: 2, col: '#0e0a14', a: 0.8, pass2: false }); for (let q = 0; q < 6; q++) pencil([[x + 30 + q * (w - 60) / 5, y], [x + 30 + q * (w - 60) / 5, y - 26]], { w: 1.4, col: '#0e0a14', a: 0.7, pass2: false }); }
  billboard(150, 880, 70, 260, '#ff6a3a', 'HOTEL', '#fff6e8', t, 9, 30); billboard(560, 1040, 180, 80, '#2a2a3a', 'DELI 24/7', '#7fffb0', t, 10, 34); billboard(380, 360, 150, 90, '#ffd34a', '$1 ПИЦЦА', '#3a1a0a', t, 11, 30);
  push(540, 1150, 1); rect(-700, -30, 1400, 60, { wash: '#0c0a12', washA: 1, w: 2 }); ctx.save(); ctx.beginPath(); ctx.rect(-700, -30, 1400, 60); ctx.clip(); const s = '+++ ЛЕДНИК НАД ГОРОДОМ +++ МЭРИЯ: «ДЕРЖИТЕСЬ» +++ МУР-КОЛА СО ЛЬДОМ — БЕСПЛАТНО +++ ';
  ctx.font = '600 40px Osw'; ctx.fillStyle = '#ff5a4a'; ctx.textBaseline = 'middle'; const off = -((t * 220) % 1400); ctx.fillText(s + s, -700 + off, 2); ctx.restore(); glow(0, 0, 500, 'rgba(255,80,60,0.6)', 0.25); pop();
}
function iceExtra(t, melt) {                                          // после таяния: ели, кочки, талая вода
  if (melt <= 0) return;
  ctx.save(); ctx.globalAlpha = melt;
  for (let k = 0; k < 10; k++) conifer(-300 + k * 170 + (k % 3) * 30, 1250 + (k % 2) * 20, 120 + (k % 4) * 40 * melt, '#2f4a32', 0.95);
  const lake = pathOf(ellPts(300, 1330, 260, 30, 0, 0, 40)); wash(lake, '#8fc0e0', 0.9); pencil(ellPts(300, 1330, 260, 30, 0, 0.05, 40), { w: 2, col: '#e8f6ff', a: 0.7, pass2: false });
  for (let k = 0; k < 30; k++) { const r = rng(k + 90), x = -200 + r() * 1500, y = 1300 + r() * 120; for (let q = 0; q < 4; q++) line([[x + q * 4, y], [x + q * 4 + (q - 1.5) * 4, y - 16 - r() * 10]], { w: 2, col: '#5a6a2a', pass2: false }); }
  ctx.restore();
}
