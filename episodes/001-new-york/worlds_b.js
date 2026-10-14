/* Миры 2: Манахатта, Новый Амстердам, стена → Уолл-стрит, Бруклинский мост, Статуя Свободы, стройка Эмпайр-Стейт, сегодня (разрез до сланца), финал. */

function hills(y, amp, col, seed, a = 1) { const pts = [[-1200, 2400]]; for (let x = -1200; x <= W + 1200; x += 40) pts.push([x, y - Math.abs(Math.sin(x * 0.004 + seed)) * amp - Math.sin(x * 0.011 + seed * 2) * amp * 0.25]); pts.push([W + 1200, 2400]); return sil(pts, col, a); }
function treeD(x, y, h, col, colD, t, seed) {                        // лиственное дерево: ствол + штрихованная крона
  line([[x, y], [x + 4, y - h * 0.55], [x - 6, y - h * 0.75]], { w: h * 0.05, col: '#3a2818' });
  const r = rng(seed); for (let k = 0; k < 5; k++) { const cx = x + (r() - 0.5) * h * 0.5, cy = y - h * (0.62 + r() * 0.3), rr = h * (0.16 + r() * 0.1), sw = Math.sin(t * 1.2 + seed + k) * 3;
    const p = ell(cx + sw, cy, rr * 1.2, rr, { wash: k % 2 ? col : colD, washA: 0.96, w: 2, col: '#1e1a0c' }); hatch(p.path, p.bb, { gap: 6, a: 0.3, col: '#1e1a0c', ang: 0.9, key: seed + k }); }
}
function conifer(x, y, h, col, a = 1) { const w = h * 0.3; const pts = [[x, y - h]]; for (let k = 1; k <= 6; k++) { const yy = y - h + h * k / 6.4, ww = w * k / 6; pts.push([x + ww, yy], [x + ww * 0.45, yy - h * 0.03]); } const L = pts.slice(1).map(([px, py]) => [2 * x - px, py]).reverse(); sil(pts.concat([[x, y]], L), col, a); }
function wLenape(t, u, cat) {
  lay(40, () => { vgrad(-800, 1400, ['#5f7fa6', '#d9a86a', '#f6c77a']); glow(760, 760, 600, 'rgba(255,214,140,1)', 0.8); ctx.fillStyle = '#fff1c8'; ctx.beginPath(); ctx.arc(760, 760, 60, 0, 6.3); ctx.fill(); });
  lay(12, () => { hills(900, 220, '#7d8fa8', 1); }); haze('#e8c08a', 0.18);
  lay(7, () => { hills(980, 260, '#5f7a6a', 2); for (let k = 0; k < 26; k++) conifer(-500 + k * 80, 980 - Math.abs(Math.sin((-500 + k * 80) * 0.004 + 2)) * 260 + 30, 90, '#3f5a4a', 0.9); }); haze('#e8c08a', 0.14);
  lay(3.6, () => { hills(1120, 240, '#4f6b3a', 3); for (let k = 0; k < 9; k++) treeD(-300 + k * 210, 1120 - Math.abs(Math.sin((-300 + k * 210) * 0.004 + 3)) * 240 + 40, 200, k % 3 ? '#a8742a' : '#7a8a32', '#5a5a20', t, k); });
  haze('#f0c890', 0.1);
  lay(2.2, () => { const rv = pathOf([[-900, 1200], [W + 900, 1180], [W + 900, 1330], [-900, 1350]]); wash(rv, '#5f86a0', 0.97); glow(760, 1250, 360, 'rgba(255,214,140,1)', 0.45);
    for (let k = 0; k < 12; k++) pencil([[-600 + k * 220 - (t * 26 % 220), 1220 + (k % 3) * 34], [-500 + k * 220 - (t * 26 % 220), 1218 + (k % 3) * 34]], { w: 2, col: '#ffe6b0', a: 0.7, pass2: false });
    const cx = lerp(-300, 1300, (t - S0.lenape) / (S1.lenape - S0.lenape)); push(cx, 1262, 0.8); blob([[-130, -6], [130, -10], [110, 14], [-110, 16]], { wash: '#3a2414', washA: 0.97, w: 2.6, col: '#120a04' });
    for (const px of [-50, 50]) { sil([[px - 12, -6], [px - 14, -56], [px, -70], [px + 14, -56], [px + 12, -6]], '#1a1008', 1); ctx.fillStyle = '#1a1008'; ctx.beginPath(); ctx.arc(px, -80, 12, 0, 6.3); ctx.fill(); line([[px + 10, -50], [px + 40, 10]], { w: 3, col: '#1a1008', pass2: false }); } pop(); });
  lay(1.4, () => { push(860, 1330, 1); blob([[-170, 0], [-160, -110], [-90, -170], [90, -170], [160, -110], [170, 0]], { wash: '#8a6a42', washA: 0.97, w: 3, col: '#1e140a', shade: { gap: 6, a: 0.35, col: '#3a2410', ang: 1.4 } });
    for (let k = 0; k < 9; k++) line([[-150 + k * 38, -6], [-130 + k * 32, -150]], { w: 2, col: '#4a321a', a: 0.7, pass2: false }); for (let k = 0; k < 4; k++) line([[-160, -30 - k * 34], [160, -30 - k * 34]], { w: 1.6, col: '#d8b880', a: 0.6, pass2: false });
    rect(-26, -80, 52, 80, { wash: '#1a0e06', washA: 0.95, w: 2 }); glow(0, -40, 60, 'rgba(255,150,60,1)', 0.5); pop();
    for (let k = 0; k < 6; k++) { const ph = (t * 0.25 + k / 6) % 1; glow(860 + Math.sin(ph * 5) * 40, 1150 - ph * 600, 40 + ph * 140, 'rgba(210,200,190,0.8)', 0.5 * (1 - ph), 'source-over'); }
    push(140, 1340, 0.9); blob([[-60, -100], [60, -110], [80, -70], [60, -40], [-50, -40]], { wash: '#9a6a3a', washA: 0.97, w: 2.6, col: '#1e140a' }); for (const lx of [-40, -20, 40, 56]) line([[lx, -44], [lx + 2, 0]], { w: 5, col: '#6a4422' }); blob([[60, -110], [96, -150], [116, -140], [100, -100]], { wash: '#9a6a3a', washA: 0.97, w: 2.4, col: '#1e140a' });
    for (const s of [-1, 1]) line([[104, -146], [104 + s * 20, -190], [104 + s * 34, -196]], { w: 3, col: '#4a3018', pass2: false }); pop(); });
  lay(1, () => { const g = pathOf([[-900, GY - 50], [W + 900, GY - 70], [W + 900, 2600], [-900, 2600]]); wash(g, '#6f7a32', 0.98); hatch(g, [-900, GY - 70, W + 900, 2600], { gap: 6, a: 0.4, ang: -1.45, col: '#3a4418', key: 13 });
    note('Манахатта — «остров многих холмов»', 560, 560, t, EV.mana, S1.lenape, '#3a2410', 52, -0.04, [[700, 610], [820, 720], [880, 880]]); cat(); });
  lay(0.6, () => { poly([[-200, 2400], [-160, 900], [-120, -300], [40, -300], [60, 900], [90, 2400]], { wash: '#2a1e14', washA: 1, w: 3, col: '#0e0804', shade: { gap: 6, a: 0.5, col: '#000', ang: 1.5 } }); for (let k = 0; k < 14; k++) pencil([[-140 + (k % 3) * 50, -200 + k * 170], [-120 + (k % 3) * 50, -60 + k * 170]], { w: 3, col: '#5a4030', a: 0.7, pass2: false }); for (let k = 0; k < 8; k++) { const r = rng(k + 5); ell(60 + r() * 200, -200 + r() * 600, 50 + r() * 40, 30 + r() * 20, { wash: k % 2 ? '#7a6a24' : '#9a7a2a', washA: 0.95, w: 1.6, col: '#2a1e08' }); }
    for (let k = 0; k < 40; k++) { const x = 600 + k * 14, sw = Math.sin(t * 1.6 + k) * 18; line([[x, 2100], [x + sw, 1700 + (k % 5) * 40]], { w: 4, col: k % 2 ? '#8a8a3a' : '#a89848', pass2: false }); } });
  rays(760, 760, 1.9, 1.2, 1600, 'rgba(255,220,160,0.5)', 0.35, 7, t);
  motes(50, [0, 300, W, 1600], '#ffe7a8', t, 14, { sp: 18, sz: 2.4, a: 0.7, tw: 1, add: 1, wob: 30 });
  for (let k = 0; k < 6; k++) { const ph = (t * 0.2 + k / 6) % 1, x = (k * 190 + t * 50) % W; push(x + Math.sin(ph * 9) * 40, -50 + ph * 2000, 1, ph * 12); blob([[-10, 0], [0, -14], [10, 0], [0, 6]], { wash: ['#c8742a', '#a8502a', '#d8a83a'][k % 3], washA: 0.95, w: 1.4, col: '#2a1408' }); pop(); }
}

function gable(x, base, w, h, col, seed) {                           // голландский ступенчатый фронтон
  const st = 5, sw = w / (st * 2); const pts = [[x, base], [x, base - h]]; for (let i = 0; i < st; i++) { const yy = base - h - i * 30; pts.push([x + sw * i, yy], [x + sw * i, yy - 30]); }
  pts.push([x + w / 2 - sw * 0.5, base - h - st * 30 - 10], [x + w / 2 + sw * 0.5, base - h - st * 30 - 10]); for (let i = st - 1; i >= 0; i--) { const yy = base - h - i * 30; pts.push([x + w - sw * i, yy - 30], [x + w - sw * i, yy]); } pts.push([x + w, base]);
  const p = poly(pts, { wash: col, washA: 0.98, w: 2.6, col: '#1a0e08', shade: { gap: 7, a: 0.25, col: '#3a1a10', ang: 1.2 } });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) rect(x + w * 0.2 + i * w * 0.38, base - h * 0.9 + j * h * 0.3, w * 0.2, h * 0.18, { wash: '#2a3a40', washA: 0.95, w: 1.6, col: '#1a0e08' });
  rect(x + w * 0.42, base - h * 0.28, w * 0.16, h * 0.28, { wash: '#3a2010', washA: 1, w: 1.6 });
}
function wDutch(t, u, cat) {
  lay(40, () => { vgrad(-800, 1400, ['#5a6f7c', '#a9b8bc', '#d8d6c8']); for (let k = 0; k < 6; k++) { const x = ((k * 330 + t * 14) % 1800) - 400; glow(x, 300 + (k % 3) * 120, 260, 'rgba(240,240,236,1)', 0.4, 'source-over'); } });
  lay(8, () => { hills(1050, 70, '#5a6a68', 5); });
  haze('#c8d0cc', 0.2);
  lay(3, () => {
    push(-120, 1100, 1); poly([[-260, 0], [-200, -140], [260, -140], [320, 0]], { wash: '#6a6a4a', washA: 0.97, w: 2.6, col: '#1a160a', shade: { gap: 6, a: 0.3, col: '#2a2610', ang: 0.3 } }); for (let k = 0; k < 12; k++) line([[-190 + k * 40, -140], [-186 + k * 40, -180]], { w: 6, col: '#4a3a24' }); pop();
    gable(260, 1100, 120, 120, '#9a4a32', 1); gable(390, 1100, 110, 150, '#c8b088', 2); gable(510, 1100, 130, 130, '#8a3a28', 3);
    push(820, 1100, 1); poly([[-50, 0], [-36, -230], [36, -230], [50, 0]], { wash: '#7a6a5a', washA: 0.97, w: 2.6, col: '#1a120a', shade: { gap: 6, a: 0.3 } }); poly([[-46, -230], [0, -290], [46, -230]], { wash: '#4a3a2a', washA: 0.97, w: 2.4 });
    for (let k = 0; k < 4; k++) { push(0, -250, 1, t * 1.2 + k * Math.PI / 2); rect(-10, -230, 20, 230, { wash: '#efe6d2', washA: 0.9, w: 2, col: '#1a120a' }); for (let q = 0; q < 6; q++) pencil([[-10, -30 - q * 36], [10, -30 - q * 36]], { w: 1.2, pass2: false }); pop(); } pop();
    for (let k = 0; k < 4; k++) { const ph = (t * 0.3 + k / 4) % 1; glow(330 + k * 80, 900 - ph * 300, 30 + ph * 70, 'rgba(200,200,196,0.9)', 0.5 * (1 - ph), 'source-over'); }
  });
  lay(2, () => { const sea = pathOf([[-900, 1110], [W + 900, 1110], [W + 900, 1500], [-900, 1500]]); wash(sea, '#4a6a72', 0.97); hatch(sea, [-900, 1110, W + 900, 1500], { gap: 9, a: 0.3, ang: 0.02, col: '#203a40', key: 15 });
    for (let k = 0; k < 14; k++) pencil([[-700 + k * 190 - (t * 40 % 190), 1150 + (k % 4) * 30], [-620 + k * 190 - (t * 40 % 190), 1148 + (k % 4) * 30]], { w: 2, col: '#e6eef0', a: 0.6, pass2: false });
    const bob = Math.sin(t * 1.6) * 8; push(700, 1210 + bob, 1, Math.sin(t * 1.2) * 0.02);
    blob([[-300, -40], [-260, -110], [300, -120], [330, -60], [260, 40], [-240, 40]], { wash: '#4a2c18', washA: 0.98, w: 3.2, col: '#120804', shade: { gap: 6, a: 0.35, col: '#1a0c04' } });
    line([[-280, -70], [310, -80]], { w: 6, col: '#c8a24a' }); for (let k = 0; k < 6; k++) ell(-180 + k * 80, -50, 10, 10, { wash: '#1a0e06', washA: 1, w: 1.6 });
    for (const [mx, mh] of [[-140, 520], [40, 600], [200, 420]]) { line([[mx, -110], [mx, -110 - mh]], { w: 9, col: '#5a3a1e' }); for (let s = 0; s < 3; s++) { const sy = -110 - mh + 60 + s * mh * 0.28, sw = 90 - s * 10; blob([[mx - sw, sy], [mx + sw, sy], [mx + sw + 8 + Math.sin(t * 2 + s) * 6, sy + mh * 0.22], [mx - sw + 4, sy + mh * 0.22]], { wash: '#e8e0cc', washA: 0.95, w: 2, col: '#2a1e10', shade: { gap: 7, a: 0.2, col: '#6a5a40' } }); } }
    for (const [a_, b_] of [[[-300, -60], [40, -710]], [[330, -70], [40, -710]], [[-300, -60], [-140, -630]], [[330, -70], [200, -530]]]) pencil([a_, b_], { w: 1.4, a: 0.6, pass2: false, gap: false });
    push(40, -710, 1); line([[0, 0], [0, -40]], { w: 3 }); const fw = Math.sin(t * 5) * 6; [['#e8822a', 0], ['#f4efe2', 1], ['#2a4a8a', 2]].forEach(([c, i]) => poly([[0, -40 + i * 16], [90, -38 + i * 16 + fw], [90, -22 + i * 16 + fw], [0, -24 + i * 16]], { wash: c, washA: 1, w: 1.2, col: '#1a0e06' })); pop();
    pop(); });
  lay(1, () => { const pier = pathOf([[-900, GY - 60], [W + 900, GY - 80], [W + 900, 2600], [-900, 2600]]); wash(pier, '#7a5a3a', 0.98);
    for (let k = 0; k < 16; k++) pencil([[-900, GY - 40 + k * 70], [W + 900, GY - 60 + k * 70]], { w: 2.4, col: '#2a1a0c', a: 0.8, pass2: false }); for (let k = 0; k < 20; k++) pencil([[-600 + k * 120, GY - 60], [-640 + k * 120, 2600]], { w: 1.4, col: '#2a1a0c', a: 0.3, pass2: false });
    push(860, GY - 70, 1); for (let k = 0; k < 2; k++) { rect(-80 + k * 120, -120, 110, 120, { wash: '#8a6a40', washA: 0.98, w: 2.6, col: '#1a0e06', shade: { gap: 6, a: 0.25 } }); txt('GWC', -25 + k * 120, -60, 30, { col: '#2a1a0c', font: 'Osw', a: 0.8 }); }
    blob([[-20, -120], [80, -120], [90, -200], [-30, -200]], { wash: '#6a4a2a', washA: 0.98, w: 2.4, col: '#1a0e06' }); for (const yy of [-140, -180]) line([[-26, yy], [86, yy]], { w: 3, col: '#3a2410' }); pop();
    if (t > EV.contract) { const k = popK(t, EV.contract, 0.4); push(760, 640, k, 0.05); poly([[-240, -190], [240, -200], [250, 190], [-230, 200]], { wash: '#e8d8b0', washA: 0.98, w: 3, col: '#3a2410', shade: { gap: 9, a: 0.15, col: '#8a6a3a' } });
      txt('ДОГОВОР', 0, -130, 60, { col: '#3a2410', font: 'Osw' }); txt('остров Манахатта', 0, -60, 42, { col: '#3a2410' }); txt('за товары на', 0, 0, 40, { col: '#3a2410' }); txt('60 гульденов', 0, 60, 58, { col: K.red });
      for (let q = 0; q < 4; q++) pencil([[-170, 110 + q * 16], [170, 108 + q * 16]], { w: 1.2, a: 0.4, pass2: false }); ell(170, 160, 34, 34, { wash: '#8a1a14', washA: 1, w: 2.4, col: '#3a0806' }); txt('W', 170, 162, 30, { col: '#e8b0a0', font: 'Osw' });
      if (t > EV.myth) { const k2 = clamp((t - EV.myth) / 0.3); txt('≈ $24? — миф', 20, 236, 50, { col: '#9fd8ff', rot: -0.06, reveal: k2 }); } pop(); }
    cat(); });
  lay(0.62, () => { push(60, 2100, 1); rect(-50, -900, 100, 1100, { wash: '#4a3420', washA: 1, w: 3, col: '#120804', shade: { gap: 6, a: 0.4 } }); for (let k = 0; k < 6; k++) pencil([[-54, -600 + k * 20], [54, -604 + k * 20]], { w: 4, col: '#c8b088', pass2: false }); pop();
    push(1040, 2060, 1); for (let k = 0; k < 5; k++) pencil(ellPts(0, -k * 26, 130 - k * 6, 40, 0, 0.05, 40), { w: 9, col: '#a88a5a' }); pop(); });
  for (let k = 0; k < 3; k++) { const x = ((t * (80 + k * 30) + k * 400) % 1600) - 200, y = 420 + k * 120 + Math.sin(t * 2 + k) * 20, fl = Math.sin(t * 9 + k) * 0.5; line([[x - 40, y + fl * 20], [x - 14, y - 6], [x, y + 4], [x + 14, y - 6], [x + 40, y + fl * 20]], { w: 3, col: '#2a2a2a' }); }
}

function nyse(t) {                                                   // современная Уолл-стрит: фасад биржи, вывески
  vgrad(-600, 1500, ['#7d93a8', '#c8d0d4']);
  push(540, 1200, 1); rect(-420, -760, 840, 760, { wash: '#d8d0c0', washA: 0.98, w: 2.6, col: '#2a2418' });
  poly([[-440, -760], [0, -940], [440, -760]], { wash: '#c8c0b0', washA: 0.98, w: 2.6, col: '#2a2418', shade: { gap: 6, a: 0.2 } });
  for (let k = 0; k < 6; k++) { const x = -330 + k * 132; rect(x - 26, -700, 52, 640, { wash: '#efe8da', washA: 0.98, w: 2.2, col: '#2a2418' }); for (let q = 0; q < 4; q++) pencil([[x - 14 + q * 9, -690], [x - 14 + q * 9, -70]], { w: 1.2, a: 0.4, pass2: false }); }
  rect(-430, -60, 860, 60, { wash: '#bcb4a4', washA: 1, w: 2.2 }); pop();
  for (let k = 0; k < 14; k++) { const x = -100 + k * 90, by = 1260; sil([[x - 18, by], [x - 22, by - 110], [x, by - 130], [x + 22, by - 110], [x + 18, by]], '#2a2a34', 0.9); ctx.fillStyle = '#2a2a34'; ctx.beginPath(); ctx.arc(x, by - 146, 15, 0, 6.3); ctx.fill(); }
}
function wWall(t, u, cat) {
  const scan = t < 47.0 ? -200 : lerp(-200, W + 300, sm((t - 47.0) / 0.9));
  const old = () => {
    lay(40, () => { vgrad(-800, 1400, ['#8aa0b0', '#e6d4b0']); });
    lay(4, () => { hills(1120, 90, '#7a8a6a', 7); gable(80, 1120, 100, 110, '#8a4a32', 4); gable(700, 1120, 110, 130, '#b8a07a', 5); gable(840, 1120, 100, 100, '#7a3a28', 6); });
    haze('#e6d8c0', 0.15);
    lay(1.6, () => { const bank = pathOf([[-900, 1270], [W + 900, 1260], [W + 900, 1500], [-900, 1500]]); wash(bank, '#7a6a3a', 0.97); hatch(bank, [-900, 1260, W + 900, 1500], { gap: 7, a: 0.35, ang: -1.3, col: '#3a2a10', key: 17 });
      for (let k = 0; k < 30; k++) { const x = -700 + k * 85; poly([[x - 32, 1290], [x - 32, 980 + (k % 3) * 14], [x, 940 + (k % 3) * 14], [x + 32, 980 + (k % 3) * 14], [x + 32, 1290]], { wash: k % 2 ? '#7a5a32' : '#8a6a3a', washA: 0.99, w: 2.4, col: '#1a0e04', shade: { gap: 6, a: 0.3, col: '#3a2410', ang: 1.45 } }); }
      line([[-900, 1060], [W + 900, 1050]], { w: 10, col: '#3a2410' }); line([[-900, 1180], [W + 900, 1170]], { w: 10, col: '#3a2410' });
      push(820, 1250, 0.8); rect(-90, -40, 180, 40, { wash: '#3a2a1a', washA: 1, w: 2 }); line([[-60, -40], [90, -90]], { w: 30, col: '#2a2a2e' }); ell(-60, 0, 30, 30, { wash: '#4a3420', washA: 1, w: 2 }); pop(); });
    lay(1, () => { const g = pathOf([[-900, GY - 60], [W + 900, GY - 70], [W + 900, 2600], [-900, 2600]]); wash(g, '#8a7a52', 0.98); hatch(g, [-900, GY - 70, W + 900, 2600], { gap: 7, a: 0.3, ang: 0.2, col: '#3a2a10', key: 18 }); note('1653: стена от англичан', 560, 640, t, 45.6, 47.0, '#2a1a0c', 52, -0.03); cat(); });
  };
  const neu = () => {
    lay(3, nyse); haze('#c8d0d8', 0.1);
    lay(1.5, () => { push(880, 1300, 1); rect(-8, -600, 16, 600, { wash: '#2a3a2e', washA: 1, w: 2 }); rect(-150, -620, 300, 80, { wash: '#1f6a3e', washA: 1, w: 2.6, col: '#0a1a0e' }); txt('WALL ST', 0, -578, 58, { col: '#f4f4ec', font: 'Osw' }); rect(-110, -520, 220, 60, { wash: '#1f6a3e', washA: 1, w: 2.2, col: '#0a1a0e' }); txt('BROAD ST', 0, -490, 40, { col: '#f4f4ec', font: 'Osw' }); pop(); });
    lay(1, () => { const g = pathOf([[-900, GY - 60], [W + 900, GY - 70], [W + 900, 2600], [-900, 2600]]); wash(g, '#5a5866', 0.98); for (let k = -3; k < 10; k++) rect(k * 200, GY + 60, 110, 12, { wash: '#e8e0c8', washA: 0.7, line: false }); note('стены давно нет — а улица осталась', 540, 640, t, 47.6, 49.85, '#1a2430', 50, -0.03); cat(); });
  };
  old();
  if (scan > -200) { ctx.save(); ctx.beginPath(); ctx.rect(-10, -10, scan + 10, H + 20); ctx.clip(); neu(); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(scan - 60, 0, scan + 60, 0); g.addColorStop(0, 'rgba(120,220,255,0)'); g.addColorStop(0.5, 'rgba(160,235,255,0.95)'); g.addColorStop(1, 'rgba(120,220,255,0)'); ctx.fillStyle = g; ctx.fillRect(scan - 60, 0, 120, H); ctx.restore();
    for (let i = 0; i < 16; i++) { const r = rng(hsh(FRAME, i)); glow(scan + (r() - 0.5) * 40, r() * H, 10 + r() * 20, 'rgba(200,245,255,1)', 0.8); } }
}

function wBridge(t, u, cat) {                                        // перспектива по пешеходному настилу, готическая башня, тросы, 21 слон
  const VX = 540, VY = 760;
  lay(40, () => { vgrad(-800, 1500, ['#3a3a6a', '#c86a4a', '#f4b06a']); glow(540, 700, 700, 'rgba(255,180,100,1)', 0.6); ctx.fillStyle = '#ffe2a8'; ctx.beginPath(); ctx.arc(540, 820, 70, 0, 6.3); ctx.fill(); });
  lay(8, () => { const r = rng(5); for (let k = 0; k < 18; k++) { const x = -300 + k * 100, h = 60 + r() * 140; sil([[x, 1020], [x, 1020 - h], [x + 70, 1020 - h], [x + 70, 1020]], '#5a3a4a', 0.8); } });
  haze('#f0a070', 0.18);
  lay(1, () => {
    push(VX, 900, 1); const tw = 330;                                // башня
    poly([[-tw, 140], [-tw + 20, -820], [tw - 20, -820], [tw, 140]], { wash: '#a8927a', washA: 0.99, w: 3.2, col: '#2a1a10', shade: { gap: 7, a: 0.28, col: '#4a3020', ang: 1.4 } });
    for (const ax of [-150, 150]) { poly([[ax - 80, 140], [ax - 80, -420], [ax - 40, -520], [ax, -560], [ax + 40, -520], [ax + 80, -420], [ax + 80, 140]], { wash: '#f0b070', washA: 0.95, w: 3, col: '#2a1a10' }); glow(ax, -100, 160, 'rgba(255,200,130,1)', 0.4); }
    for (let k = 0; k < 9; k++) pencil([[-tw + 24, -760 + k * 100], [tw - 24, -760 + k * 100]], { w: 1.4, col: '#4a3020', a: 0.6, pass2: false });
    rect(-tw - 10, -840, tw * 2 + 20, 40, { wash: '#8a7660', washA: 1, w: 2.6, col: '#2a1a10' }); pop();
    for (const s of [-1, 1]) { const top = [VX + s * 300, 60];                // главные тросы от башни к камере + подвески + ванты
      const C = spline([top, [VX + s * 560, 900], [VX + s * 900, 1400], [VX + s * 1200, 2000]], false, 10); pencil(C, { w: 7, col: '#2a1a14' }); pencil(C, { w: 2, col: '#ffd0a0', a: 0.5, pass2: false });
      for (let i = 2; i < C.length; i += 2) pencil([C[i], [C[i][0] + (VX - C[i][0]) * 0.12, VY + (C[i][1] - VY) * 0.02 + 560 * (i / C.length) + 200]], { w: 1.4, col: '#2a1a14', a: 0.7, pass2: false, gap: false });
      for (let k = 0; k < 5; k++) pencil([top, [VX + s * (300 + k * 220), 1600]], { w: 1.4, col: '#2a1a14', a: 0.6, pass2: false, gap: false }); }
    const deck = pathOf([[VX - 230, 1040], [VX + 230, 1040], [W + 900, 2600], [-900, 2600]]); wash(deck, '#7a5a3e', 0.98);
    for (let k = 1; k < 30; k++) { const z = 1 + k * 0.35, y = VY + (1950 - VY) / z * 1.4; if (y < 1040) continue; pencil([[VX - (VX + 900) / z * 1.4, y], [VX + (W + 900 - VX) / z * 1.4, y]], { w: 2.2 / Math.sqrt(z), col: '#2a1a0c', a: 0.7, pass2: false }); }
    for (const s of [-1, 1]) { pencil([[VX + s * 230, 1040], [VX + s * 1500, 2600]], { w: 4, col: '#2a1a0c' }); for (let k = 0; k < 8; k++) { const z = 1 + k * 0.8, x = VX + s * (980 / z), y = VY + (1900 - VY) / z; line([[x, y], [x, y - 260 / z]], { w: 6 / z + 1, col: '#2a2420' }); glow(x, y - 260 / z, 50 / z + 10, 'rgba(255,220,150,1)', 0.7); } }
    // слоны идут к камере
    const n = Math.min(21, Math.max(0, Math.floor((t - EV.eleph) * 21 / Math.max(1, EV.stoit - EV.eleph))));
    const el = []; for (let k = 0; k < 6; k++) { const z = 9 - ((t - S0.bridge) * 1.25 + k * 1.4) % 8.4; el.push(z); }
    el.sort((a, b) => b - a).forEach((z, k) => { if (z < 1.25) return; const s = 1.1 / z, x = VX + (720 - VX) / z * 1.2, y = VY + (1560 - VY) / z; elephant(x, y, s, t + k); });
    if (n > 0) { push(860, 560, popK(t, EV.eleph, 0.3), 0.04); ctx.save(); ctx.fillStyle = 'rgba(18,12,10,0.7)'; ctx.fillRect(-150, -60, 300, 120); ctx.restore(); txt('СЛОНОВ', 0, -26, 34, { col: K.amber, font: 'Osw' }); txt(n + ' / 21', 0, 22, 64, { col: '#f6e7c8', font: 'Osw' }); pop(); }
    cat(); });
  lay(0.55, () => { for (const s of [-1, 1]) { pencil([[VX + s * 700, -200], [VX + s * 1300, 2400]], { w: 30, col: '#1a120c' }); for (let k = 0; k < 6; k++) pencil([[VX + s * (700 + k * 70), -200 + k * 300], [VX + s * (1000), -100 + k * 300]], { w: 6, col: '#1a120c', pass2: false }); } });
  motes(30, [0, 400, W, 1600], '#ffd8a0', t, 16, { sp: 6, sz: 2.2, a: 0.6, tw: 1, add: 1 });
}
function elephant(x, y, s, t) {
  push(x, y, s); const ph = t * 3.4;
  blob([[-150, -150], [-100, -270], [90, -280], [160, -200], [150, -70], [-140, -70]], { wash: '#7d7a80', washA: 0.98, w: 3.2, col: '#1a1820', shade: { gap: 6, a: 0.35, col: '#3a3840', ang: 1.2 } });
  for (let k = 0; k < 4; k++) blob([[-120 + k * 80, -90], [-70 + k * 80, -90], [-70 + k * 80 + Math.sin(ph + k * 1.6) * 10, 0], [-124 + k * 80 + Math.sin(ph + k * 1.6) * 10, 0]], { wash: '#6a676e', washA: 0.98, w: 2.4, col: '#1a1820' });
  blob([[-60, -250], [0, -310], [60, -250], [40, -150], [-40, -150]], { wash: '#858288', washA: 0.99, w: 3, col: '#1a1820' });
  for (const sg of [-1, 1]) blob([[sg * 40, -280], [sg * 130, -300], [sg * 140, -170], [sg * 50, -170]], { wash: '#77747c', washA: 0.97, w: 2.6, col: '#1a1820', shade: { gap: 6, a: 0.3 } });
  line([[0, -170], [6, -90], [-10, -30], [12, -10]], { w: 34, col: '#858288' }); pencil([[0, -170], [6, -90], [-10, -30], [12, -10]], { w: 2.6 });
  for (const sg of [-1, 1]) line([[sg * 22, -170], [sg * 44, -130], [sg * 40, -110]], { w: 9, col: '#efe6cf' });
  for (const sg of [-1, 1]) ell(sg * 24, -232, 5, 5, { wash: '#120e0a', washA: 1, w: 1 });
  pop();
}

function wLiberty(t, u, cat) {
  const pat = clamp((t - EV.pat) / 1.0);
  lay(40, () => { vgrad(-800, 1500, ['#5f8fb0', '#c8dce0', '#f0e2c0']); glow(240, 380, 500, 'rgba(255,240,210,1)', 0.6); });
  lay(9, () => { const r = rng(9); for (let k = 0; k < 14; k++) { const x = 500 + k * 70, h = 40 + r() * 90; sil([[x, 1060], [x, 1060 - h], [x + 50, 1060 - h], [x + 50, 1060]], '#6a7a84', 0.85); if (k % 4 === 1) sil([[x + 10, 1060 - h], [x + 25, 1060 - h - 90], [x + 40, 1060 - h]], '#6a7a84', 0.85); } });
  haze('#d0dde0', 0.18);
  lay(3, () => statue(800, 1250, 0.78, t, pat));
  lay(1.8, () => { const sea = pathOf([[-900, 1080], [W + 900, 1080], [W + 900, 1700], [-900, 1700]]); wash(sea, '#3f6f7a', 0.97); for (let k = 0; k < 16; k++) pencil([[-700 + k * 170 - (t * 50 % 170), 1110 + (k % 4) * 40], [-610 + k * 170 - (t * 50 % 170), 1108 + (k % 4) * 40]], { w: 2, col: '#eaf4f0', a: 0.7, pass2: false }); glow(240, 1140, 300, 'rgba(255,245,220,1)', 0.35); });
  lay(1, () => { const deck = pathOf([[-900, GY - 40], [W + 900, GY - 50], [W + 900, 2600], [-900, 2600]]); wash(deck, '#8a6a4a', 0.98); for (let k = 0; k < 12; k++) pencil([[-900, GY - 30 + k * 80], [W + 900, GY - 40 + k * 80]], { w: 2, col: '#2a1a0c', a: 0.7, pass2: false });
    if (pat > 0) note('медь позеленела к 1920-м', 330, 700, t, EV.pat, S1.liberty, '#1a4a40', 50, -0.04, [[700, 600], [760, 700]]); cat(); });
  lay(0.68, () => { pencil([[-200, 1560], [W + 200, 1600]], { w: 16, col: '#e8e4dc' }); pencil([[-200, 1580], [W + 200, 1620]], { w: 3, col: '#2a2420' }); for (let k = 0; k < 12; k++) pencil([[-100 + k * 110, 1565 + k * 3], [-100 + k * 110, 2400]], { w: 8, col: '#e8e4dc' }); pencil([[-200, 1820], [W + 200, 1860]], { w: 10, col: '#e8e4dc' }); });
  for (let k = 0; k < 4; k++) { const x = ((t * (90 + k * 25) + k * 300) % 1600) - 200, y = 360 + k * 90 + Math.sin(t * 2 + k) * 24, fl = Math.sin(t * 8 + k) * 0.6; line([[x - 36, y + fl * 18], [x - 12, y - 6], [x, y + 4], [x + 12, y - 6], [x + 36, y + fl * 18]], { w: 3, col: '#3a3a3a' }); }
}
function statue(x, y, s, t, pat) {                                   // Статуя Свободы: пьедестал, складки, корона, факел; медь → патина пятнами сверху вниз
  push(x, y, s);
  poly([[-200, 0], [200, 0], [160, -90], [-160, -90]], { wash: '#9a8a70', washA: 0.98, w: 2.6, col: '#2a2010' });
  poly([[-140, -90], [140, -90], [110, -380], [-110, -380]], { wash: '#c8b898', washA: 0.98, w: 2.8, col: '#2a2010', shade: { gap: 7, a: 0.25, ang: 1.4 } });
  for (const wx of [-50, 0, 50]) rect(wx - 12, -330, 24, 70, { wash: '#6a5a44', washA: 0.95, w: 1.6 });
  push(0, -380, 1);
  const robe = [[-90, 0], [90, 0], [74, -200], [60, -380], [-60, -380], [-80, -200]];
  const rp = poly(robe, { wash: K.copper, washA: 0.99, w: 3, col: '#2a1408' });
  ctx.save(); ctx.clip(rp.path); const front = -560 + pat * 760; const pg = ctx.createLinearGradient(0, front - 120, 0, front + 40); pg.addColorStop(0, K.patina); pg.addColorStop(1, 'rgba(90,163,145,0)'); ctx.fillStyle = pg; ctx.fillRect(-120, -600, 240, front + 640); ctx.restore();
  for (let k = 0; k < 7; k++) line([[-70 + k * 24, -10], [-60 + k * 20 + Math.sin(k) * 10, -200], [-48 + k * 16, -370]], { w: 2.2, col: pat > 0.6 ? '#2f6a5a' : '#7a3a14', a: 0.85, pass2: false });
  const col = pat > 0.15 ? K.patina : K.copper, colD = pat > 0.15 ? '#2f6a5a' : '#7a3a14';
  poly([[-110, -300], [-56, -316], [-52, -200], [-104, -186]], { wash: col, washA: 0.99, w: 2.4, col: '#1a0e06' });
  line([[50, -370], [100, -520], [112, -640]], { w: 30, col }); pencil([[50, -370], [100, -520], [112, -640]], { w: 2.6 });
  ell(0, -430, 40, 46, { wash: col, washA: 0.99, w: 3, col: '#1a0e06' }); for (const s2 of [-1, 1]) ell(s2 * 13, -436, 5, 3, { wash: colD, washA: 1, w: 1 }); line([[0, -430], [-3, -412], [4, -410]], { w: 1.8, col: colD, smooth: false });
  rect(-42, -480, 84, 14, { wash: col, washA: 0.99, w: 2 }); for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.12 + k * 0.76 / 6), b0 = [Math.cos(a) * 38, -474 + Math.sin(a) * 14]; poly([[b0[0] - 7, b0[1]], [b0[0] + Math.cos(a) * 70, b0[1] + Math.sin(a) * 70], [b0[0] + 7, b0[1]]], { wash: col, washA: 0.99, w: 1.8 }); }
  rect(100, -690, 24, 52, { wash: col, washA: 0.99, w: 2 }); poly([[86, -690], [138, -690], [130, -722], [94, -722]], { wash: '#d8a830', washA: 1, w: 2.4 });
  const fl = Math.sin(t * 12) * 8; glow(112, -770, 140, 'rgba(255,200,90,1)', 0.7); blob([[94, -722], [106, -780], [114, -830 + fl], [126, -784], [132, -722]], { wash: '#ffb03a', washA: 1, w: 2.2, col: '#6a2a06' });
  if (pat > 0 && pat < 1) for (let i = 0; i < 16; i++) { const r = rng(hsh(FRAME, i)); glow((r() - 0.5) * 220, -200 - r() * 600, 8 + r() * 12, 'rgba(220,255,240,1)', 0.9); }
  pop(); pop();
}

function girder(x0, y0, x1, y1, w, col = '#4a3a30') {               // стальная балка с заклёпками
  const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0); push(x0, y0, 1, a);
  rect(0, -w / 2, L, w, { wash: col, washA: 0.99, w: 2.6, col: '#120a06', shade: { gap: 6, a: 0.3, col: '#1a0e08', ang: 0.2 } }); pencil([[0, -w / 2 + 6], [L, -w / 2 + 6]], { w: 1.4, col: '#c88a5a', a: 0.6, pass2: false });
  for (let k = 12; k < L; k += 26) for (const yy of [-w / 2 + 12, w / 2 - 12]) { ctx.fillStyle = '#1a0e08'; ctx.beginPath(); ctx.arc(k, yy, 3, 0, 6.3); ctx.fill(); }
  pop();
}
function wEmpire(t, u, cat) {
  const g = sm(u / Math.max(1, S1.empire - S0.empire - 0.3)), floors = Math.floor(g * 102), day = Math.max(1, Math.round(g * 410));
  lay(40, () => { vgrad(-800, 1500, ['#6a8aaa', '#d8c8a8', '#efe0c0']); for (let k = 0; k < 5; k++) glow(((k * 300 + t * 20) % 1600) - 200, 300 + k * 80, 240, 'rgba(250,246,236,1)', 0.35, 'source-over'); });
  lay(14, () => { const HZ = 760; vgrad(HZ, 2600, ['#9a968c', '#5a5850']);              // город далеко внизу: перспективная сетка кварталов
    for (let k = 1; k < 26; k++) { const z = k * 0.35, y = HZ + 900 / z; if (y > 2600) continue; pencil([[-1400, y], [W + 1400, y]], { w: 1 + 3 / z, col: '#3a3a36', a: 0.5, pass2: false }); }
    for (let k = -14; k <= 14; k++) pencil([[540 + k * 30, HZ], [540 + k * 420, 2600]], { w: 1.4, col: '#3a3a36', a: 0.4, pass2: false });
    const r = rng(41); for (let i = 0; i < 160; i++) { const z = 0.7 + r() * 7, xw = (r() - 0.5) * 3000, y = HZ + 900 / z, x = 540 + xw / z, w = 70 / z, h = (40 + r() * 160) / z; poly([[x - w, y], [x - w, y - h], [x + w, y - h], [x + w, y]], { wash: ['#8a8478', '#7a7468', '#a09888'][i % 3], washA: 0.95, w: 1, col: '#2a2a26', line: false }); wash(pathOf([[x + w, y], [x + w, y - h], [x + w * 1.4, y - h * 0.9], [x + w * 1.4, y]]), '#4a4640', 0.9); } });
  haze('#d8d0c0', 0.3);
  lay(6, () => { push(-60, 1080, 1); poly([[-50, 0], [-50, -600], [50, -600], [50, 0]], { wash: '#b8b4ac', washA: 0.97, w: 2.4, col: '#2a2a2a' }); for (let k = 0; k < 5; k++) { const r = 50 - k * 9, yy = -600 - k * 50; ell(0, yy, r, 30, { wash: '#d8d4cc', washA: 0.97, w: 2, col: '#2a2a2a', shade: { gap: 5, a: 0.3 } }); } poly([[-8, -850], [0, -980], [8, -850]], { wash: '#d8d4cc', washA: 1, w: 1.6 }); pop(); note('Крайслер: ещё вчера выше всех', 240, 300, t, S0.empire + 0.4, S1.empire, '#2a2418', 40, -0.03); });
  haze('#d8d0c0', 0.12);
  lay(1.6, () => { const top = 1700 - floors * 14; for (let k = 0; k < 4; k++) { const x = 600 + k * 130; girder(x, 2400, x, top, 34, '#5a3a2e'); }
    for (let y = 2300; y > top; y -= 140) girder(560, y, 1100, y - 8, 26, '#6a4636');
    line([[1000, top], [1000, top - 320], [700, top - 300]], { w: 10, col: '#8a2a1a', smooth: false }); line([[720, top - 300], [720, top - 200]], { w: 2, smooth: false }); rect(700, top - 200, 40, 30, { wash: '#3a3a3a', washA: 1, w: 2 });
    if (Math.sin(t * 7) > 0.4) for (let i = 0; i < 12; i++) { const r = rng(hsh(FRAME, i)); const a = -Math.PI / 2 + (r() - 0.5) * 2.4, d = r() * 90; pencil([[760, top + 60], [760 + Math.cos(a) * d, top + 60 + Math.sin(a) * d]], { w: 2, col: '#ffb040', a: 0.95, pass2: false, gap: false }); } glow(760, top + 60, 60, 'rgba(255,180,80,1)', 0.6 * (Math.sin(t * 7) > 0.4 ? 1 : 0)); });
  lay(1, () => { girder(-300, GY - 4, 1300, GY - 4, 52, '#6a4636'); girder(-200, 2000, 1300, 2000, 46, '#5a3a2e'); girder(160, GY + 20, 160, 2600, 40, '#5a3a2e');
    push(760, 760, 1, 0.03); rect(-170, -86, 340, 172, { wash: '#4a3a30', washA: 0.98, w: 3, col: '#120a06' }); for (const [rx, ry] of [[-150, -66], [150, -66], [-150, 66], [150, 66]]) ell(rx, ry, 6, 6, { wash: '#2a1a10', washA: 1, w: 1 });
    txt('ДЕНЬ ' + day + ' / 410', 0, -22, 54, { col: '#f6e7c8', font: 'Osw' }); txt('ЭТАЖ ' + floors + ' / 102', 0, 38, 40, { col: K.amber, font: 'Osw' }); pop(); cat(); });
  lay(0.6, () => { girder(-200, 400, 300, 2400, 70, '#3a2820'); });
  motes(20, [0, 200, W, 1600], '#fff6e0', t, 19, { sp: 4, sz: 2, a: 0.5, wob: 50 });
}

function wToday(t, u, cat) {
  const dive = sm((t - EV.dive) / 1.3);
  CAM.y = lerp(CAM.y, 2900, dive);
  lay(40, () => { vgrad(-1400, 1500, ['#0c0d22', '#2a1d4a', '#5a2a5a']); });
  lay(3.2, () => { const r = rng(21); for (let k = 0; k < 16; k++) { const x = -500 + k * 140 + r() * 40, top = 200 + r() * 360, w = 110 + r() * 70; sil([[x, top], [x + w, top], [x + w, 1500], [x, 1500]], '#1a1530', 1); windows(x + 4, top + 10, w - 8, 1200, Math.floor(w / 18), 40, k * 13, 0.5, '#ffcf7a', '#8fd8ff', 0.55); } });
  haze('#3b2150', 0.14);
  lay(2.0, () => { building(-420, 300, 300, 1500, '#2a2240', { tank: 1 }); building(760, 260, 260, 1500, '#2b2445', {}); billboard(-120, 520, 260, 300, '#36d6ff', 'МУР-КОЛА ZERO', '#10202a', t, 5, 40); billboard(800, 480, 220, 180, '#ff4f9a', 'NY ♥ ТОМ', '#fff6e8', t, 6, 46); billboard(780, 700, 220, 220, '#ffd34a', '8 000 000+', '#2a1a0a', t, 7, 50); });
  lay(1, () => {
    vgrad(GY - 20, GY + 60, ['#3a3344', '#2a2433']);
    const r = rng(4); for (let i = 0; i < 46; i++) { const x = -300 + i * 38 + r() * 20, h = 170 + r() * 60, by = GY - 4 + (i % 2) * 6; if (Math.abs(x - 560) < 120) continue; sil([[x - 20, by], [x - 24, by - h * 0.62], [x - 10, by - h * 0.72], [x + 10, by - h * 0.72], [x + 24, by - h * 0.62], [x + 20, by]], ['#2a2034', '#3a2440', '#1e1a2a'][i % 3], 0.95); ctx.fillStyle = '#2a2034'; ctx.beginPath(); ctx.arc(x, by - h * 0.82, 16, 0, 6.3); ctx.fill(); if (r() < 0.4) glow(x + 12, by - h * 0.62, 18, 'rgba(170,220,255,1)', 0.7); }
    // разрез под улицей: асфальт, трубы, метро, сланец
    const L1 = pathOf([[-900, GY + 60], [W + 900, GY + 60], [W + 900, GY + 160], [-900, GY + 160]]); wash(L1, '#3a3438', 1); hatch(L1, [-900, GY + 60, W + 900, GY + 160], { gap: 6, a: 0.4, col: '#0a0808', key: 20 });
    const L2 = pathOf([[-900, GY + 160], [W + 900, GY + 160], [W + 900, GY + 1000], [-900, GY + 1000]]); wash(L2, '#5a4636', 1); hatch(L2, [-900, GY + 160, W + 900, GY + 1000], { gap: 8, a: 0.4, ang: 0.9, col: '#2a1e14', key: 21 });
    for (const [y, c, w_] of [[GY + 230, '#8a8a90', 30], [GY + 290, '#6a3a2a', 22], [GY + 340, '#3a6a8a', 26]]) { pencil([[-900, y], [W + 900, y]], { w: w_, col: c }); pencil([[-900, y - w_ / 2 + 3], [W + 900, y - w_ / 2 + 3]], { w: 2, col: '#ffffff', a: 0.3, pass2: false }); }
    const tun = pathOf([[-900, GY + 460], [W + 900, GY + 460], [W + 900, GY + 860], [-900, GY + 860]]); wash(tun, '#1a1a1e', 1); for (let k = 0; k < 12; k++) { const x = -600 + k * 200; pencil([[x, GY + 460], [x, GY + 860]], { w: 6, col: '#2a2a30' }); glow(x + 100, GY + 500, 60, 'rgba(255,220,150,1)', 0.4); }
    const tx = ((t - S0.today) * 1600) % 3800 - 1400; push(tx, GY + 820, 1); for (let c = 0; c < 3; c++) { rect(c * 470, -300, 450, 280, { wash: '#a8b0b8', washA: 1, w: 3, col: '#1a1a1e' }); for (let w_ = 0; w_ < 5; w_++) { rect(c * 470 + 30 + w_ * 82, -250, 60, 90, { wash: '#ffe9a8', washA: 0.95, w: 1.6 }); } txt('7', c * 470 + 400, -200, 50, { col: '#d8342b', font: 'Osw' }); } pop();
    const L3 = pathOf([[-900, GY + 1000], [W + 900, GY + 1000], [W + 900, GY + 3000], [-900, GY + 3000]]); wash(L3, '#3b3a48', 1);
    for (let k = 0; k < 9; k++) { const y0 = GY + 1040 + k * 200, pts = []; for (let x = -900; x <= W + 900; x += 45) pts.push([x, y0 + Math.sin(x * 0.0045 + k * 0.9) * 90]); pencil(pts, { w: 3, col: '#0f0d14', key: k }); }
    const rr = rng(12); for (let i = 0; i < 50; i++) { const x = -100 + rr() * 1300, y = GY + 1100 + rr() * 1700, s = 8 + rr() * 10; shape([[x, y - s * 1.3], [x + s, y - s * 0.3], [x + s * 0.7, y + s], [x - s * 0.7, y + s], [x - s, y - s * 0.3], [x, y - s * 1.3]], { wash: K.garnet, washA: 1, w: 1.8, col: '#2a0610' }); if (dive > 0.6) glow(x, y, 26, 'rgba(255,90,110,1)', 0.5 * (dive - 0.6) * 2.5 * (0.6 + 0.4 * Math.sin(t * 5 + i))); }
    if (dive > 0.7) note('тот самый сланец · 450 млн лет', 540, GY + 1650, t, EV.slate, S1.today, '#ffd890', 56, -0.03);
    cat();
  });
  if (dive < 0.4) motes(40, [0, 0, W, H], '#ffe0f0', t, 22, { sp: 30, sz: 2, a: 0.5, tw: 1, add: 1 });
}

function poster(x, y, s, rot, title, c1, c2, kind, t) {              // винтажный трэвел-постер города
  push(x, y, s, rot); rect(-120, -170, 240, 340, { wash: c1, washA: 0.98, w: 3, col: '#1a0e06' });
  ctx.save(); ctx.beginPath(); ctx.rect(-120, -170, 240, 340); ctx.clip(); { const g = ctx.createLinearGradient(0, -170, 0, 110); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(-120, -170, 240, 340); }
  if (kind === 'eiffel') { poly([[-60, 100], [-8, -120], [8, -120], [60, 100], [30, 100], [0, 10], [-30, 100]], { wash: '#2a1a1a', washA: 1, w: 2 }); }
  if (kind === 'col') { ell(0, 40, 100, 70, { wash: '#c8a070', washA: 1, w: 2 }); for (let q = -3; q <= 3; q++) rect(q * 26 - 8, 0, 16, 40, { wash: '#2a1a10', washA: 0.8, line: false }); }
  if (kind === 'fuji') { poly([[-120, 110], [0, -60], [120, 110]], { wash: '#3a4a7a', washA: 1, w: 2 }); poly([[-34, -10], [0, -60], [34, -10], [12, 0], [0, -14], [-12, 0]], { wash: '#f4f4f4', washA: 1, w: 1.6 }); ctx.fillStyle = '#d83a3a'; ctx.beginPath(); ctx.arc(60, -100, 30, 0, 6.3); ctx.fill(); }
  if (kind === 'tower') { rect(-22, -40, 44, 150, { wash: '#a83a2a', washA: 1, w: 2 }); poly([[-28, -40], [0, -120], [28, -40]], { wash: '#2a6a3a', washA: 1, w: 2 }); ctx.fillStyle = '#ffd34a'; ctx.beginPath(); ctx.arc(0, -126, 6, 0, 6.3); ctx.fill(); }
  ctx.restore(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-120, 110, 240, 60); txt(title, 0, 141, 40, { col: '#f6e7c8', font: 'Osw' }); pop();
}
function wButton(t, u, cat) {
  lay(40, () => { vgrad(-800, 1500, ['#1a1838', '#6a3a6a', '#e8865a']); glow(540, 1100, 700, 'rgba(255,150,90,1)', 0.5); });
  lay(6, () => { const r = rng(31); for (let k = 0; k < 22; k++) { const x = -500 + k * 100 + r() * 40, top = 760 + r() * 300, w = 70 + r() * 50; sil([[x, top], [x + w, top], [x + w, 1500], [x, 1500]], '#241c38', 1); windows(x + 4, top + 10, w - 8, 600, Math.floor(w / 16), 24, k * 7, 0.5, '#ffcf7a', '#8fd8ff', 0.7); }
    push(820, 1100, 1); poly([[-40, 0], [-30, -380], [30, -380], [40, 0]], { wash: '#2a2240', washA: 1, w: 1.6 }); poly([[-22, -380], [0, -560], [22, -380]], { wash: '#2a2240', washA: 1, w: 1.6 }); line([[0, -560], [0, -640]], { w: 4, col: '#2a2240' }); glow(0, -640, 30, 'rgba(255,60,60,1)', 0.6 + 0.4 * Math.sin(t * 4)); pop(); });
  haze('#5a2a5a', 0.12);
  const open = sm((t - EV.portal) / 1.0);
  if (open > 0) lay(2, () => { const cx = 540, cy = 760, R = 420 * open;                                            // портал часов: вращающееся кольцо + постеры городов на орбите
    glow(cx, cy, R * 1.3, 'rgba(255,200,120,1)', 0.5 * open); ctx.save(); ctx.globalAlpha = 0.9 * open; for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.08), R * (1 - k * 0.08) * 0.9, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 8 - k * 2, col: ['#ffd890', '#f1d27a', '#c99636'][k], pass2: false }); ctx.restore();
    for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 + t * 0.6; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.08, cy + Math.sin(a) * R * 0.98, 30, { col: '#ffe9b8', font: 'Osw', a: open }); }
    [['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['МОСКВА', '#2a3a6a', '#d8a8a0', 'tower']].forEach(([s, c1, c2, kd], k) => { const a = t * 0.5 + k * Math.PI / 2; poster(cx + Math.cos(a) * R * 0.62, cy + Math.sin(a) * R * 0.5, 0.8 * open, Math.sin(a) * 0.12, s, c1, c2, kd, t); }); });
  lay(1, () => { const roof = pathOf([[-900, GY + 40], [W + 900, GY + 30], [W + 900, 2600], [-900, 2600]]); wash(roof, '#3a2a30', 0.99); hatch(roof, [-900, GY + 30, W + 900, 2600], { gap: 7, a: 0.4, ang: 0.15, col: '#140a0e', key: 30 }); pencil([[-900, GY + 40], [W + 900, GY + 30]], { w: 4, col: '#120a0e' });
    push(940, GY + 40, 1); rect(-70, -260, 140, 200, { wash: '#5a3a2a', washA: 1, w: 2.6, col: '#1a0e08' }); poly([[-80, -260], [0, -330], [80, -260]], { wash: '#4a2e20', washA: 1, w: 2.4 }); for (const lx of [-50, 50]) line([[lx, -60], [lx, 0]], { w: 6, col: '#2a1a10' }); for (let q = 0; q < 4; q++) pencil([[-70, -230 + q * 46], [70, -230 + q * 46]], { w: 3, col: '#2a1a10', pass2: false }); pop(); cat(); });
  motes(30, [0, 400, W, 1600], '#ffd8b0', t, 33, { sp: -12, sz: 2.4, a: 0.6, tw: 1, add: 1 });
}
