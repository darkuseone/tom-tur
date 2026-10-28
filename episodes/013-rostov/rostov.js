/* 013 Ростов-на-Дону — общие детали города:
   RS — палитра; don — река Дон полосой (рябь, блики; o.col, o.dusk); bridge — Ворошиловский мост (опоры, ферма, фонари);
   cathedral — Ростовский собор Рождества Богородицы (белый, пять золотых глав, колокольня); stele — табличка с именем города
   (сквозная нить выпуска: o.kind 'modern' | 'wood' | 'stone' | 'board'); theatre — театр им. Горького «трактор» (o.build 0..1 —
   стройка с лесами, o.ruin — взорван); tractor — гусеничный трактор 1930-х; combine — комбайн (o.old — прицепной «Колхоз» 1930-х);
   warehouse — кирпичный склад Парамонова; loco — паровоз; barge — баржа с зерном; armChurch — армянская церковь (барабан, конус);
   cart — повозка переселенцев; fortStar — земляной бастион крепости с частоколом; cannon — пушка; customsHut — будка таможни со
   шлагбаумом; tricorn, ship — треуголка и парусник (из 011). */

const RS = { don: '#3a7a9a', donD: '#1e4a64', donL: '#8ac0d4', sand: '#e0c890', steppe: '#b8b06a', steppeD: '#7a7a3a', brick: '#a8502e', brickD: '#5a2412',
  white: '#f2ece0', whiteD: '#b8ae9c', gold: '#e2b84a', goldD: '#8a6418', red: '#c8302a', redD: '#6a1010', amber: '#c8902a', night: '#1a2040' };

function don(y0, t, o = {}) {                                              // Дон: полоса воды от y0 вниз, рябь и блики
  const h = o.h || 260, c = o.col || RS.don;
  const g = rect(-600, y0, 2300, h, { wash: c, washA: 1, w: 2, col: RS.donD });
  ctx.save(); ctx.clip(g.path); vgrad(y0, y0 + h, [o.dusk ? '#e8a060' : RS.donL, c, RS.donD], 0.7); ctx.restore();
  const r = rng(o.seed || 13001);
  for (let i = 0; i < 26; i++) { const yy = y0 + 14 + r() * (h - 20), x = ((r() * 2200 + t * (20 + r() * 30)) % 2300) - 600, L = 40 + r() * 90; pencil([[x, yy], [x + L, yy + 2]], { w: 2, col: '#f2f6f8', a: 0.5, pass2: false }); }
  for (let i = 0; i < 10; i++) { const x = r() * 1600 - 260, yy = y0 + 20 + r() * (h - 40); glow(x, yy, 18, 'rgba(255,250,230,1)', 0.35 * (0.5 + 0.5 * Math.sin(t * 3 + i))); }
}

function bridge(x, base, s, t, o = {}) {                                   // Ворошиловский мост: опоры, балка, фермы, фонари
  push(x, base, s);
  for (const px of [-700, -250, 250, 700]) { rect(px - 30, -10, 60, 230, { wash: '#a8a49a', washA: 1, w: 2, col: '#3a3630' }); }
  rect(-1100, -60, 2200, 50, { wash: '#d8d0c0', washA: 1, w: 2.4, col: '#3a3630' }); pencil([[-1100, -60], [1100, -60]], { w: 4, col: '#5a5650', pass2: false });
  for (let k = -11; k <= 11; k++) { pencil([[k * 100, -60], [k * 100, -100]], { w: 3, col: '#5a5650', pass2: false }); }
  pencil([[-1100, -100], [1100, -100]], { w: 3, col: '#5a5650', pass2: false });
  for (let k = -5; k <= 5; k++) { pencil([[k * 200, -100], [k * 200, -170]], { w: 3, col: '#3a3a3a', pass2: false }); ell(k * 200 + 14, -170, 12, 8, { wash: '#ffe6a0', washA: 1, w: 1.4, col: '#3a3a3a' }); if (o.night) glow(k * 200 + 14, -168, 50, 'rgba(255,220,140,1)', 0.6); }
  for (let k = 0; k < 4; k++) { const cx = ((t * 120 + k * 560) % 2400) - 1200; rect(cx - 40, -96, 80, 34, { wash: ['#c8302a', '#3a5a8a', '#e8e4dc', '#2a2a2a'][k], washA: 1, w: 1.6, col: '#1a1a1a' }); }
  pop();
}

function cathedral(x, base, s, t, o = {}) {                                // собор Рождества Богородицы: пятиглавие и шатровая колокольня
  push(x, base, s); const W = RS.white, D = RS.whiteD;
  rect(-200, -300, 400, 300, { wash: W, washA: 1, w: 2.4, col: '#3a3630' }); for (let k = 0; k < 4; k++) { rect(-160 + k * 90, -240, 46, 110, { wash: '#4a5a6a', washA: 1, w: 1.6, col: '#2a2a2a' }); ell(-137 + k * 90, -240, 23, 20, { wash: '#4a5a6a', washA: 1, w: 1.6, col: '#2a2a2a' }); }
  poly([[-220, -300], [220, -300], [0, -360]], { wash: D, washA: 1, w: 2, col: '#3a3630' });
  const dome = (dx, dy, r) => { rect(dx - r * 0.7, dy - r * 1.4, r * 1.4, r * 1.4, { wash: W, washA: 1, w: 2, col: '#3a3630' }); blob([[dx - r, dy - r * 1.4], [dx - r * 0.9, dy - r * 2.5], [dx, dy - r * 3.3], [dx + r * 0.9, dy - r * 2.5], [dx + r, dy - r * 1.4]], { wash: RS.gold, washA: 1, w: 2, col: RS.goldD }); pencil([[dx, dy - r * 3.3], [dx, dy - r * 4.1]], { w: 3, col: RS.goldD, pass2: false }); pencil([[dx - r * 0.3, dy - r * 3.8], [dx + r * 0.3, dy - r * 3.8]], { w: 3, col: RS.goldD, pass2: false }); glow(dx - r * 0.3, dy - r * 2.4, r * 0.8, 'rgba(255,240,180,1)', 0.35); };
  dome(0, -360, 60); dome(-140, -320, 36); dome(140, -320, 36);
  push(320, 0); rect(-70, -520, 140, 520, { wash: W, washA: 1, w: 2.4, col: '#3a3630' }); for (let q = 0; q < 3; q++) { rect(-30, -480 + q * 140, 60, 80, { wash: '#4a5a6a', washA: 1, w: 1.4, col: '#2a2a2a' }); } poly([[-70, -520], [70, -520], [0, -720]], { wash: '#3e6a5a', washA: 1, w: 2, col: '#1a2a24' }); dome(0, -700, 26); pop();
  pop();
}

function stele(x, base, s, t, lines, o = {}) {                             // табличка с именем — сквозная нить: modern / wood / stone / board
  push(x, base, s, o.rot || 0); const k = o.kind || 'modern', w = o.w || 520, h = o.h || 150;
  if (k === 'modern') { for (const px of [-w / 2 + 40, w / 2 - 40]) rect(px - 10, -40, 20, 200, { wash: '#5a5e66', washA: 1, w: 2, col: '#1a1a1e' }); rect(-w / 2, -h - 40, w, h, { wash: '#1e4a8a', washA: 1, w: 3, col: '#0a1a3a' }); rect(-w / 2 + 10, -h - 30, w - 20, h - 20, { wash: null, w: 2.4, col: '#f2f2f2', a: 0.9 }); }
  else if (k === 'wood') { for (const px of [-w / 2 + 30, w / 2 - 30]) rect(px - 12, -40, 24, 200, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' }); rect(-w / 2, -h - 40, w, h, { wash: '#b88a52', washA: 1, w: 3, col: '#3a2412' }); for (let q = 1; q < 4; q++) pencil([[-w / 2, -h - 40 + q * h / 4], [w / 2, -h - 40 + q * h / 4]], { w: 1.4, col: '#7a5430', a: 0.6, pass2: false }); }
  else if (k === 'stone') { rect(-w / 2 - 20, -20, w + 40, 40, { wash: '#a8a094', washA: 1, w: 2, col: '#3a3630' }); rect(-w / 2, -h - 20, w, h, { wash: '#d8d0c0', washA: 1, w: 3, col: '#3a3630' }); }
  else { rect(-w / 2, -h - 40, w, h, { wash: '#efe0b8', washA: 1, w: 3, col: '#5a3a1a' }); pencil([[0, -40], [0, 160]], { w: 14, col: '#6a4424' }); }
  const col = k === 'modern' ? '#f6f6f6' : k === 'wood' ? '#2a1408' : '#3a1a10', n = lines.length;
  lines.forEach((L, i) => { const size = (o.size || 54) * (i === 0 ? 1 : 0.62); txt(L, 0, -h - 40 + h * (i + 0.5) / n + size * 0.12, size, { font: 'Osw', col: i === 0 ? col : (k === 'modern' ? '#ffd24a' : '#7a2a10') }); });
  pop();
}

function theatre(x, base, s, t, o = {}) {                                  // театр-«трактор»: стеклянные «гусеницы» крыльев, «радиатор», башня сцены
  push(x, base, s); const b = o.build === undefined ? 1 : o.build, W = '#ece6da', D = '#a89e8c';
  const vis = q => clamp((b - q) / 0.25);
  if (o.ruin) { for (let i = 0; i < 9; i++) { const rx = -520 + i * 115, rh = 90 + ((i * 41) % 150); poly([[rx, 0], [rx + 6, -rh], [rx + 40, -rh - 24], [rx + 80, -rh + 14], [rx + 115, -rh - 10], [rx + 115, 0]], { wash: '#9a9488', washA: 1, w: 2, col: '#2a2420' }); for (let q = 0; q < 2; q++) rect(rx + 20 + q * 46, -rh + 30, 26, 40, { wash: '#2a2420', washA: 1, w: 1, col: '#000' }); } pop(); return; }
  ctx.save(); ctx.globalAlpha = vis(0.0);
  rect(-180, -470, 360, 470, { wash: D, washA: 1, w: 2.4, col: '#3a3630' }); for (let q = 0; q < 6; q++) pencil([[-180, -440 + q * 70], [180, -440 + q * 70]], { w: 1.2, col: '#6a6458', a: 0.5, pass2: false }); ctx.restore();
  ctx.save(); ctx.globalAlpha = vis(0.2);
  rect(-260, -290, 520, 290, { wash: W, washA: 1, w: 2.6, col: '#3a3630' });
  for (let q = 0; q < 8; q++) rect(-230 + q * 58, -270, 30, 250, { wash: '#f6f2ea', washA: 1, w: 1.6, col: '#5a5448' });
  rect(-150, -250, 300, 210, { wash: '#5a7a9a', washA: 0.9, w: 2.4, col: '#2a3440' }); for (let q = 1; q < 6; q++) pencil([[-150 + q * 50, -250], [-150 + q * 50, -40]], { w: 3, col: '#2a3440', pass2: false }); for (let q = 1; q < 4; q++) pencil([[-150, -250 + q * 52], [150, -250 + q * 52]], { w: 3, col: '#2a3440', pass2: false });
  txt('ТЕАТР', 0, -264, 26, { font: 'Osw', col: '#3a3630' }); ctx.restore();
  for (const sd of [-1, 1]) { ctx.save(); ctx.globalAlpha = vis(0.45); push(sd * 470, 0);                        // крыло-гусеница
    const P = [[-210, -10], [-230, -120], [-180, -200], [180, -200], [230, -120], [210, -10]]; blob(P, { wash: '#7aa6c4', washA: 0.95, w: 3, col: '#2a3440' });
    for (let q = -3; q <= 3; q++) pencil([[q * 56, -196], [q * 56, -14]], { w: 3, col: '#2a3440', a: 0.8, pass2: false }); pencil([[-220, -110], [220, -110]], { w: 3, col: '#2a3440', pass2: false });
    for (let q = -3; q <= 3; q++) { ell(q * 60, -16, 26, 26, { wash: '#4a4a4e', washA: 1, w: 2.4, col: '#1a1a1e' }); ell(q * 60, -16, 8, 8, { wash: '#8a8a8e', washA: 1, w: 1, col: '#1a1a1e' }); }
    glow(sd * -60, -150, 90, 'rgba(240,250,255,1)', 0.25); pop(); ctx.restore(); }
  if (b < 1) { const yTop = -480 * b; for (const lx of [-700, -400, -100, 200, 500, 700]) pencil([[lx, 0], [lx, yTop - 40]], { w: 5, col: '#8a6a3a' }); for (let q = 0; q < 5; q++) { const yy = -q * 110; if (yy > yTop - 40) pencil([[-720, yy], [720, yy]], { w: 4, col: '#8a6a3a', pass2: false }); } }
  pop();
}

function tractor(x, y, s, t, o = {}) {                                     // гусеничный трактор 1930-х: капот-радиатор, кабина, гусеница
  push(x, y, s, 0, o.flip || 1); const C = o.col || '#5a6a3a', run = (t * (o.v || 1) * 60) % 30;
  const tr = blob([[-200, 0], [-220, -50], [-190, -80], [190, -80], [220, -50], [200, 0]], { wash: '#3a3a3e', washA: 1, w: 3, col: '#0a0a0e' });
  for (let q = -6; q <= 6; q++) pencil([[q * 30 + run - 15, -4], [q * 30 + run - 15, -12]], { w: 4, col: '#1a1a1e', pass2: false });
  for (let q = -2; q <= 2; q++) ell(q * 80, -40, 30, 30, { wash: '#6a6a6e', washA: 1, w: 2, col: '#1a1a1e' });
  rect(-170, -200, 230, 120, { wash: C, washA: 1, w: 2.4, col: '#1a2010' }); rect(60, -170, 110, 90, { wash: C, washA: 1, w: 2.4, col: '#1a2010' });
  rect(150, -165, 24, 80, { wash: '#2a2a2a', washA: 1, w: 1.6, col: '#000' }); for (let q = 0; q < 5; q++) pencil([[154, -158 + q * 15], [170, -158 + q * 15]], { w: 1.6, col: '#8a8a8a', pass2: false });
  rect(-150, -300, 130, 100, { wash: null, w: 4, col: '#1a2010' }); pencil([[-160, -300], [-10, -300]], { w: 6, col: C, pass2: false });
  pencil([[100, -170], [100, -260]], { w: 10, col: '#2a2a2a' }); if (o.smoke !== false) for (let q = 0; q < 4; q++) { const ph = (t * 0.9 + q / 4) % 1; ell(100 + ph * 50, -280 - ph * 160, 18 + ph * 40, 14 + ph * 30, { wash: '#5a5a5e', washA: 0.5 * (1 - ph), line: false }); }
  pop();
}

function combine(x, y, s, t, o = {}) {                                     // комбайн: жатка с мотовилом, корпус, бункер, кабина, шнек
  push(x, y, s, 0, o.flip || 1); const C = o.col || RS.red, CD = o.colD || RS.redD;
  if (o.old) {                                                              // прицепной «Колхоз»: решётчатая рама, деревянная жатка
    rect(-260, -260, 360, 200, { wash: '#7a8a7a', washA: 1, w: 2.4, col: '#1a2a1a' }); for (let q = 0; q < 7; q++) pencil([[-250 + q * 50, -250], [-230 + q * 50, -70]], { w: 2, col: '#3a4a3a', pass2: false });
    rect(100, -150, 220, 50, { wash: '#a87a42', washA: 1, w: 2, col: '#3a2412' }); for (let q = 0; q < 10; q++) pencil([[110 + q * 21, -100], [116 + q * 21, -86]], { w: 3, col: '#5a5a5a', pass2: false });
    const a = t * 3; push(210, -190); for (let q = 0; q < 5; q++) { const an = a + q * 1.2566; pencil([[0, 0], [Math.cos(an) * 70, Math.sin(an) * 70]], { w: 4, col: '#6a4424', pass2: false }); } ell(0, 0, 70, 70, { wash: null, w: 2, col: '#6a4424', a: 0.6 }); pop();
    for (const wx of [-200, 40]) { ell(wx, -50, 50, 50, { wash: '#4a4a4e', washA: 1, w: 3, col: '#1a1a1e' }); for (let q = 0; q < 8; q++) { const an = q * 0.785 + t; pencil([[wx, -50], [wx + Math.cos(an) * 46, -50 + Math.sin(an) * 46]], { w: 2, col: '#2a2a2e', pass2: false }); } }
    pop(); return; }
  rect(-260, -330, 380, 260, { wash: C, washA: 1, w: 2.6, col: '#1a0a08', shade: { gap: 12, a: 0.12, col: CD, ang: 0.4, w: 1.2 } });
  rect(-230, -420, 200, 90, { wash: CD, washA: 1, w: 2, col: '#1a0a08' }); rect(40, -460, 140, 130, { wash: '#9ac4dc', washA: 0.9, w: 2.6, col: '#1a0a08' }); rect(30, -470, 160, 20, { wash: C, washA: 1, w: 2, col: '#1a0a08' });
  rect(120, -150, 280, 60, { wash: '#e8b030', washA: 1, w: 2.4, col: '#3a2a08' }); for (let q = 0; q < 12; q++) pencil([[128 + q * 22, -90], [134 + q * 22, -74]], { w: 3, col: '#5a5a5a', pass2: false });
  const a = t * 3.4; push(270, -200); for (let q = 0; q < 6; q++) { const an = a + q * 1.047; pencil([[0, 0], [Math.cos(an) * 80, Math.sin(an) * 80]], { w: 4, col: '#e8b030', pass2: false }); ell(Math.cos(an) * 80, Math.sin(an) * 80, 6, 6, { wash: '#e8b030', washA: 1, w: 1, col: '#3a2a08' }); } pop();
  pencil([[-220, -400], [-420, -470], [-470, -440]], { w: 14, col: CD });
  ell(-170, -60, 80, 80, { wash: '#2a2a2e', washA: 1, w: 3, col: '#0a0a0e' }); ell(-170, -60, 34, 34, { wash: '#e8b030', washA: 1, w: 2, col: '#3a2a08' }); ell(60, -50, 56, 56, { wash: '#2a2a2e', washA: 1, w: 3, col: '#0a0a0e' }); ell(60, -50, 24, 24, { wash: '#e8b030', washA: 1, w: 2, col: '#3a2a08' });
  if (o.label) txt(o.label, -70, -220, 40, { font: 'Osw', col: '#f6ecd6' });
  pop();
}

function warehouse(x, base, w, h, t, o = {}) {                             // кирпичный склад Парамонова: арочные проёмы, ворота, фронтоны
  rect(x, base - h, w, h, { wash: RS.brick, washA: 1, w: 2.4, col: RS.brickD });
  for (let yy = base - h + 22; yy < base; yy += 22) pencil([[x, yy], [x + w, yy]], { w: 1, col: RS.brickD, a: 0.4, pass2: false });
  const n = Math.max(2, Math.floor(w / 90)); for (let q = 0; q < n; q++) { const ax = x + (q + 0.5) * w / n; rect(ax - 24, base - h * 0.75, 48, h * 0.32, { wash: '#2a1a12', washA: 1, w: 1.6, col: '#1a0a04' }); ell(ax, base - h * 0.75, 24, 18, { wash: '#2a1a12', washA: 1, w: 1.6, col: '#1a0a04' }); }
  rect(x + w / 2 - 50, base - 120, 100, 120, { wash: '#4a2e1a', washA: 1, w: 2, col: '#1a0a04' }); poly([[x - 10, base - h], [x + w + 10, base - h], [x + w / 2, base - h - 70]], { wash: RS.brickD, washA: 1, w: 2, col: '#2a0a04' });
  if (o.label) txt(o.label, x + w / 2, base - h - 20, 26, { font: 'Osw', col: '#f6ecd6' });
}

function loco(x, y, s, t, o = {}) {                                        // паровоз: котёл, труба с дымом, кабина, колёса с дышлом
  push(x, y, s, 0, o.flip || 1);
  rect(-260, -200, 300, 130, { wash: '#2a2a2e', washA: 1, w: 2.4, col: '#000' }); ell(40, -135, 30, 65, { wash: '#3a3a3e', washA: 1, w: 2, col: '#000' }); rect(-330, -270, 120, 200, { wash: '#6a1e1a', washA: 1, w: 2.4, col: '#1a0404' }); rect(-310, -250, 70, 60, { wash: '#f6d48a', washA: 0.8, w: 1.6, col: '#1a0404' });
  rect(-40, -290, 40, 90, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); rect(-60, -310, 80, 24, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); rect(-150, -240, 40, 40, { wash: '#c8a040', washA: 1, w: 1.6, col: '#3a2a08' });
  for (let q = 0; q < 6; q++) { const ph = (t * 0.8 + q / 6) % 1; ell(-20 - ph * 260, -330 - ph * 220, 30 + ph * 70, 24 + ph * 50, { wash: '#e8e4dc', washA: 0.7 * (1 - ph), line: false }); }
  for (const wx of [-200, -110, -20]) { ell(wx, -60, 40, 40, { wash: '#a8201e', washA: 1, w: 2.4, col: '#1a0404' }); ell(wx, -60, 10, 10, { wash: '#1a1a1e', washA: 1, w: 1, col: '#000' }); }
  const a = t * 6; pencil([[-200 + Math.cos(a) * 24, -60 + Math.sin(a) * 24], [-20 + Math.cos(a) * 24, -60 + Math.sin(a) * 24]], { w: 6, col: '#c8ccd0', pass2: false });
  pencil([[-600, -16], [400, -16]], { w: 5, col: '#3a3a3a', pass2: false });
  pop();
}

function barge(x, y, s, t, k = 0, o = {}) {                                // баржа с мешками зерна
  push(x, y, s, Math.sin(t * 1.4 + k) * 0.02);
  shape([[-300, -60], [300, -60], [260, 10], [-260, 10]], { wash: '#6a4424', washA: 1, w: 2.4, col: '#2a1408' }); pencil([[-300, -40], [300, -40]], { w: 3, col: '#3a2412', pass2: false });
  for (let q = 0; q < 9; q++) { const sx = -240 + q * 58, sy = -70 - (q % 2) * 26; blob([[sx - 26, sy + 10], [sx - 30, sy - 22], [sx, sy - 34], [sx + 30, sy - 22], [sx + 26, sy + 10]], { wash: '#e8d4a0', washA: 1, w: 1.6, col: '#6a5428' }); }
  if (o.mast !== false) { pencil([[0, -60], [0, -340]], { w: 6, col: '#3a2412' }); blob([[6, -320], [150, -300], [140, -110], [6, -100]], { wash: '#efe6d0', washA: 1, w: 1.8, col: '#5a4a3a' }); }
  pop();
}

function armChurch(x, base, s, t, o = {}) {                                // армянская церковь: строгий объём, барабан, конусный купол
  push(x, base, s); const C = o.col || '#e2d2b4', D = '#a89474';
  rect(-170, -260, 340, 260, { wash: C, washA: 1, w: 2.4, col: '#4a3a24' }); poly([[-190, -260], [190, -260], [0, -330]], { wash: D, washA: 1, w: 2, col: '#4a3a24' });
  rect(-60, -420, 120, 130, { wash: C, washA: 1, w: 2.2, col: '#4a3a24' }); for (let q = 0; q < 3; q++) rect(-44 + q * 34, -400, 18, 60, { wash: '#3a2e20', washA: 1, w: 1.2, col: '#1a1208' });
  poly([[-74, -420], [74, -420], [0, -530]], { wash: '#8a6a4a', washA: 1, w: 2.2, col: '#3a2a14' }); pencil([[0, -530], [0, -590]], { w: 4, col: RS.goldD, pass2: false }); pencil([[-18, -566], [18, -566]], { w: 4, col: RS.goldD, pass2: false });
  rect(-40, -140, 80, 140, { wash: '#4a2e1a', washA: 1, w: 2, col: '#1a0a04' }); ell(0, -140, 40, 30, { wash: '#4a2e1a', washA: 1, w: 2, col: '#1a0a04' });
  for (const wx of [-120, 120]) { rect(wx - 14, -210, 28, 60, { wash: '#3a2e20', washA: 1, w: 1.4, col: '#1a1208' }); ell(wx, -210, 14, 12, { wash: '#3a2e20', washA: 1, w: 1.4, col: '#1a1208' }); }
  for (let q = 0; q < 8; q++) pencil([[-170, -240 + q * 30], [170, -240 + q * 30]], { w: 1, col: D, a: 0.5, pass2: false });
  pop();
}

function cart(x, y, s, t, k = 0, o = {}) {                                 // повозка переселенцев: колёса, тент, сундуки, волы
  push(x, y, s, 0, o.flip || 1); const bob = Math.sin(t * 4 + k) * 3;
  for (const wx of [-120, 110]) { ell(wx, -60, 60, 60, { wash: '#7a5430', washA: 1, w: 3, col: '#2a1408' }); for (let q = 0; q < 6; q++) { const an = q * 1.047 + t * 1.5; pencil([[wx, -60], [wx + Math.cos(an) * 56, -60 + Math.sin(an) * 56]], { w: 3, col: '#4a2e14', pass2: false }); } }
  rect(-180, -150 + bob, 360, 60, { wash: '#8a6438', washA: 1, w: 2.4, col: '#2a1408' });
  blob([[-170, -150 + bob], [-160, -270 + bob], [0, -300 + bob], [160, -270 + bob], [170, -150 + bob]], { wash: o.tent || '#e8dcc0', washA: 1, w: 2, col: '#5a4a2a' }); for (let q = 1; q < 4; q++) pencil([[-170 + q * 85, -150 + bob], [-160 + q * 80, -285 + bob]], { w: 2, col: '#8a7a5a', pass2: false });
  push(290, 0); blob([[-80, -60], [-90, -140], [-40, -170], [80, -160], [110, -110], [100, -60]], { wash: '#8a6a4a', washA: 1, w: 2.4, col: '#2a1408' }); for (const lx of [-60, -20, 50, 90]) pencil([[lx, -70], [lx + Math.sin(t * 4 + lx) * 8, 0]], { w: 8, col: '#5a3a1a' }); ell(120, -140, 34, 26, { wash: '#8a6a4a', washA: 1, w: 2, col: '#2a1408' }); pencil([[110, -164], [96, -196]], { w: 4, col: '#e8dcc0', pass2: false }); pencil([[134, -164], [150, -196]], { w: 4, col: '#e8dcc0', pass2: false }); pop();
  pencil([[180, -120], [230, -110]], { w: 5, col: '#5a3a1a', pass2: false });
  pop();
}

function fortStar(x, base, s, t, o = {}) {                                 // земляной бастион: скат вала, дёрн, частокол, амбразуры, флаг
  push(x, base, s); const G = '#7a8a3a', GD = '#4a5a1e';
  const v = shape([[-560, 0], [-480, -170], [-180, -190], [0, -260], [180, -190], [480, -170], [560, 0]], { wash: G, washA: 1, w: 3, col: '#2a3010' }); hatch(v.path, v.bb, { gap: 10, a: 0.18, col: GD, ang: -0.6, w: 1.4 });
  for (let px = -470; px <= 470; px += 22) { const yy = px < -180 ? -170 - (px + 470) * 0.07 : px > 180 ? -170 - (470 - px) * 0.07 : -190 - (180 - Math.abs(px)) * 0.39; pencil([[px, yy], [px, yy - 60]], { w: 7, col: '#6a4a26' }); ell(px, yy - 62, 4, 6, { wash: '#6a4a26', washA: 1, w: 1, col: '#2a1408' }); }
  for (const cx of [-300, 300]) cannon(cx, -175, 0.6, t, { flip: cx < 0 ? -1 : 1, fire: o.fire });
  pencil([[0, -260], [0, -520]], { w: 6, col: '#3a2412' }); const wv = Math.sin(t * 4) * 10; blob([[4, -515], [150, -505 + wv], [160, -440 + wv], [4, -450]], { wash: o.flag || '#f2ece0', washA: 1, w: 1.8, col: '#3a3630' }); pencil([[4, -515], [160, -440 + wv]], { w: 8, col: '#2a5aa8', pass2: false }); pencil([[4, -450], [150, -505 + wv]], { w: 8, col: '#2a5aa8', pass2: false });
  pop();
}

function cannon(x, y, s, t, o = {}) {                                      // пушка на лафете
  push(x, y, s, 0, o.flip || 1); ell(-30, -20, 34, 34, { wash: '#6a4424', washA: 1, w: 2.4, col: '#2a1408' }); poly([[-90, -10], [20, -40], [30, -10]], { wash: '#7a5430', washA: 1, w: 2, col: '#2a1408' });
  blob([[-60, -70], [140, -90], [150, -60], [-60, -40]], { wash: '#3a3a3e', washA: 1, w: 2.4, col: '#0a0a0e' }); ell(150, -75, 10, 16, { wash: '#0a0a0e', washA: 1, w: 1, col: '#000' });
  if (o.fire) { const k = o.fire; for (let q = 0; q < 5; q++) ell(180 + q * 50 * k, -80 - q * 10, 30 + q * 20 * k, 26 + q * 16 * k, { wash: '#e8e4dc', washA: 0.8 * (1 - k * 0.6), line: false }); glow(170, -75, 80, 'rgba(255,200,100,1)', 0.8 * (1 - k)); }
  pop();
}

function customsHut(x, base, s, t, o = {}) {                               // таможня: бревенчатая будка, тесовая крыша, вывеска, шлагбаум
  push(x, base, s);
  const f = rect(-200, -260, 400, 260, { wash: '#9a6e3e', washA: 1, w: 2.6, col: '#2a1408' }); for (let q = 1; q < 10; q++) pencil([[-200, -260 + q * 26], [200, -260 + q * 26]], { w: 2, col: '#5a3a1a', a: 0.7, pass2: false });
  for (let q = 0; q < 10; q++) { ell(-200, -248 + q * 26, 12, 12, { wash: '#b88a52', washA: 1, w: 1.4, col: '#3a2412' }); ell(200, -248 + q * 26, 12, 12, { wash: '#b88a52', washA: 1, w: 1.4, col: '#3a2412' }); }
  poly([[-250, -250], [250, -250], [0, -420]], { wash: '#6a4a2a', washA: 1, w: 2.6, col: '#2a1408' }); for (let q = 1; q < 8; q++) pencil([[-250 + q * 31, -250], [0, -420]], { w: 1.4, col: '#3a2412', a: 0.5, pass2: false });
  rect(-60, -200, 120, 90, { wash: '#f6d48a', washA: 0.85, w: 2.4, col: '#2a1408' }); pencil([[0, -200], [0, -110]], { w: 2, col: '#2a1408', pass2: false }); rect(-150, -200, 60, 200, { wash: '#5a3a1a', washA: 1, w: 2, col: '#1a0a04' });
  rect(-150, -330, 300, 64, { wash: '#efe0b8', washA: 1, w: 2.4, col: '#3a2412' }); txt('ТАМОЖНЯ', 0, -290, 40, { font: 'Osw', col: '#5a1a10' });
  const up = o.up || 0; push(260, -90, 1, -up * 1.3); rect(0, -10, 520, 20, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); for (let q = 0; q < 6; q++) rect(q * 90, -10, 45, 20, { wash: '#1a1a1a', washA: 1, w: 1, col: '#000' }); pop();
  rect(240, -100, 40, 100, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' });
  pop();
}

function tricorn(x, y, s) {                                               // треуголка поверх головы human(): y — макушка
  push(x, y, s); blob([[-70, -6], [0, 16], [70, -6], [50, -22], [0, -14], [-50, -22]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); blob([[-40, -12], [-34, -44], [34, -44], [40, -12]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); pencil([[-68, -6], [0, 14], [68, -6]], { w: 3, col: '#d6a842', pass2: false }); pop();
}

function ship(x, y, s, t, k = 0, o = {}) {                                // торговый парусник: корпус, две мачты, паруса, вымпел
  push(x, y, s, Math.sin(t * 1.3 + k) * 0.02);
  shape([[-260, -40], [240, -40], [300, -110], [-290, -100]], { wash: o.hull || '#4a2e1a', washA: 1, w: 2.4, col: '#1a0a04' }); pencil([[-280, -76], [270, -80]], { w: 4, col: '#c8a040', a: 0.8, pass2: false });
  for (const [mx, mh] of [[-90, 380], [110, 330]]) { pencil([[mx, -100], [mx, -100 - mh]], { w: 7, col: '#3a2412' }); for (let q = 0; q < 2; q++) { const sy = -140 - mh + 60 + q * (mh * 0.45); blob([[mx - 100, sy], [mx + 100, sy], [mx + 110 + Math.sin(t * 2 + k) * 6, sy + mh * 0.38], [mx - 110 + Math.sin(t * 2 + k) * 6, sy + mh * 0.38]], { wash: '#f2ead6', washA: 1, w: 1.8, col: '#4a3a2a' }); } }
  const wv = Math.sin(t * 5 + k) * 5; shape([[-90, -480], [10, -470 + wv], [-90, -456]], { wash: o.flag || '#c8302a', washA: 1, w: 1.2, col: '#3a0a0a' });
  pop();
}
