/* 004 — сцена `yard`: 1862, план Хобрехта. Двор-колодец берлинского доходного дома: пять этажей окон с трёх сторон, бельё на верёвках,
   жильцы в окнах, колонка, арка во второй двор («HOF II»). Пожарная повозка с конём разворачивается впритирку по кругу — следы колёс.
   На «пять тридцать четыре» поперёк двора — размерная линия «5,34 м». В конце с подоконника падает горшок. Переход сюда — нырок в отражение чаши. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.yard_enter = S0.yard + 0.2;                 // повозка въезжает, колокол
  EV.yard_cart = wt('s6', 'телеге:');            // разворот
  EV.yard_dim = wt('s6', 'пять');                // размерная линия
  EV.yard_pot = wt('s6', 'четыре!');             // горшок падает — дзынь
  SHAKES.push([EV.yard_pot + 0.35, 0.2, 6]);
  KEYW.push('телеге:', 'четыре!');

  const VX0 = 300, VX1 = 780, VT = 420, VB = 1280;                    // задняя стена (в слое 1.6)
  function walls(t) {
    const L = '#2a1a10';
    const lw = shape([[-400, -200], [VX0, VT], [VX0, VB], [-400, 1900]], { wash: '#c8a888', washA: 1, w: 2.4, col: L, key: 8800 }); shadeG(lw.path, VX0, 0, -400, 0, '#6a4a34', 0.45);
    const rw = shape([[1480, -200], [VX1, VT], [VX1, VB], [1480, 1900]], { wash: '#b89878', washA: 1, w: 2.4, col: L, key: 8801 }); shadeG(rw.path, VX1, 0, 1480, 0, '#5a3a26', 0.55);
    const bw = rect(VX0, VT, VX1 - VX0, VB - VT, { wash: '#d4b896', washA: 1, w: 2.4, col: L, key: 8802 }); shadeG(bw.path, 0, VT, 0, VB, '#7a5a40', 0.35);
    for (const [P, side] of [[lw, -1], [rw, 1]]) { ctx.save(); ctx.clip(P.path); for (let r = 0; r < 60; r++) { const y = -200 + r * 36; pencil([[side < 0 ? -400 : 1480, y + (side < 0 ? 0 : 0)], [side < 0 ? VX0 : VX1, VT + (y + 200) / 2100 * (VB - VT)]], { w: 1, col: '#7a5a40', a: 0.25, pass2: false, gap: false }); } ctx.restore(); }
    const winSide = (side, f, c) => { const u0 = 0.15 + c * 0.25, u1 = u0 + 0.12, ex = side < 0 ? -400 : 1480, vx = side < 0 ? VX0 : VX1;
      const lerpP = (u, v) => { const x = lerp(ex, vx, u), top = lerp(-200, VT, u), bot = lerp(1900, VB, u); return [x, lerp(top, bot, v)]; };
      const v0 = 0.12 + f * 0.17, v1 = v0 + 0.1, Q = [lerpP(u0, v0), lerpP(u1, v0), lerpP(u1, v1), lerpP(u0, v1)];
      const lit = (f + c + (side > 0 ? 1 : 0)) % 4 === 0; poly(Q, { wash: lit ? '#f6dca0' : '#3a4a5a', washA: 0.95, w: 1.8, col: L }); pencil([lerpP(u0, v1 + 0.01), lerpP(u1, v1 + 0.01)], { w: 5, col: '#e8dcc0', pass2: false }); return Q; };
    for (let f = 0; f < 5; f++) for (let c = 0; c < 3; c++) { winSide(-1, f, c); winSide(1, f, c); }
    for (let f = 0; f < 5; f++) for (let c = 0; c < 4; c++) { if (f === 4 && (c === 1 || c === 2)) continue; const wx = VX0 + 30 + c * 112, wy = VT + 40 + f * 150; rect(wx, wy, 70, 100, { wash: (f * 3 + c) % 5 === 1 ? '#f6dca0' : '#3a4a5a', washA: 0.95, w: 1.8, col: L }); pencil([[wx - 6, wy + 104], [wx + 76, wy + 104]], { w: 5, col: '#e8dcc0', pass2: false }); }
    const ar = blob([[VX0 + 170, VB], [VX0 + 170, VB - 150], [VX0 + 240, VB - 220], [VX0 + 310, VB - 150], [VX0 + 310, VB]], { wash: '#5a4a3a', washA: 1, w: 2.4, col: L });
    ctx.save(); ctx.clip(ar.path); rect(VX0 + 150, VB - 240, 180, 240, { wash: '#c8b090', washA: 1, line: false }); for (let k = 0; k < 4; k++) rect(VX0 + 190 + k * 26, VB - 200, 14, 22, { wash: '#3a4a5a', washA: 1, line: false }); rect(VX0 + 210, VB - 90, 60, 90, { wash: '#2a1e14', washA: 1, line: false }); ctx.restore();
    txt('HOF II', VX0 + 240, VB - 250, 30, { font: 'Osw', col: '#2a1a10' });
    for (const [a, b, y] of [[[-200, 500], [1280, 540], 0], [[-100, 760], [1200, 790], 1]]) { pencil(spline([a, [540, Math.max(a[1], b[1]) + 60], b], false, 10), { w: 2, col: '#4a3a2a', pass2: false });
      for (let k = 0; k < 8; k++) { const x = -40 + k * 150 + y * 60, yy = lerp(a[1], b[1], (x + 200) / 1480) + 40 * Math.sin(Math.PI * (x + 200) / 1480), sw = Math.sin(t * 2 + k) * 4; shape([[x, yy], [x + 60, yy], [x + 56 + sw, yy + 70 + (k % 2) * 30], [x + 4 + sw, yy + 70 + (k % 2) * 30]], { wash: ['#f4f0e6', '#c8d8e8', '#e8b0a0', '#f4e8c0'][(k + y) % 4], washA: 1, w: 1.6, col: L }); } }
    for (const [x, y, s, f, sd] of [[VX0 + 65, VT + 236, 0.42, 'shock', 150], [VX0 + 400, VT + 386, 0.42, 'grin', 151], [VX0 + 177, VT + 536, 0.4, 'smile', 152]]) { ctx.save(); ctx.beginPath(); ctx.rect(x - 35, y - 160, 70, 108); ctx.clip(); human(x, y + 40, s, t, { body: '#6a5a8a', hair: '#4a2a14', hat: sd === 152 ? 'bonnet' : undefined, face: t > EV.yard_dim ? f : 'calm', armL: 'up', seed: sd }); ctx.restore(); }
    const pk = clamp((t - EV.yard_pot) / 0.45), px = VX0 + 400 + 35, py = lerp(VT + 492, 1300, pk * pk); if (pk < 1) { push(px, py, 1, pk * 4); poly([[-16, -20], [16, -20], [12, 10], [-12, 10]], { wash: '#b8643e', washA: 1, w: 1.6, col: L }); ell(0, -26, 22, 12, { wash: '#4a8a3a', washA: 1, w: 1.4, col: L }); pop(); } else if (t < EV.yard_pot + 1.2) { for (let i = 0; i < 6; i++) poly([[px - 40 + i * 14, 1300], [px - 30 + i * 14, 1290], [px - 24 + i * 14, 1302]], { wash: '#b8643e', washA: 1, w: 1.2, col: L }); }
  }
  function ground(t) {
    const g = shape([[VX0, VB], [VX1, VB], [1480, 1900], [1480, 2200], [-400, 2200], [-400, 1900]], { wash: '#8a7e70', washA: 1, w: 2, col: '#2a1a10', key: 8810 }); shadeG(g.path, 0, 2100, 0, VB, '#4a4038', 0.45);
    for (let k = 0; k < 14; k++) { const v = k / 14, y = lerp(VB, 2100, Math.pow(v, 1.4)); const xl = lerp(VX0, -400, (y - VB) / 620), xr = lerp(VX1, 1480, (y - VB) / 620); pencil([[xl, y], [xr, y]], { w: 1.2, col: '#4a4038', a: 0.5, pass2: false, gap: false }); }
    for (let k = -6; k <= 6; k++) pencil([[540 + k * 40, VB], [540 + k * 160, 2100]], { w: 1.2, col: '#4a4038', a: 0.4, pass2: false, gap: false });
    push(VX0 + 40, VB + 60, 1); rect(-14, -140, 28, 140, { wash: '#2a4a3a', washA: 1, w: 2, col: '#0a1a10' }); pencil([[14, -110], [60, -96], [66, -60]], { w: 8, col: '#2a4a3a', pass2: false }); ell(0, 4, 40, 10, { wash: '#7aa0b8', washA: 0.6, line: false }); pop();
    const tr = clamp((t - EV.yard_cart) / 1.6); if (tr > 0) pencil(ellPts(540, 1520, 300, 120, 0, 0, 60).slice(0, Math.floor(60 * tr) + 1), { w: 6, col: '#4a3a2a', a: 0.6, pass2: false });
  }
  function cart(t) {                                                 // пожарная повозка: конь, красная бочка-насос, медный цилиндр, катушка рукава, пожарный
    const k0 = clamp((t - EV.yard_enter) / (EV.yard_cart - EV.yard_enter)), k1 = clamp((t - EV.yard_cart) / (EV.yard_pot - EV.yard_cart + 0.6));
    let x, y, dir, sc;
    if (t < EV.yard_cart) { x = 540 + 60 * (1 - k0); y = lerp(1330, 1460, k0); dir = 1; sc = lerp(0.5, 0.82, k0); }
    else { const a = -Math.PI / 2 + k1 * Math.PI * 2 * 0.95; x = 540 + Math.cos(a) * 300; y = 1560 + Math.sin(a) * 110; dir = Math.sin(a) > 0 ? -1 : 1; sc = 0.84 + Math.sin(a) * 0.1; }
    push(x, y, sc, 0, dir);
    for (const wx of [-260, -110]) { ell(wx, -40, 56, 56, { wash: '#5a2a1a', washA: 1, w: 3, col: '#1a0a04' }); for (let q = 0; q < 10; q++) { const a = q / 10 * 6.283 + t * 5; pencil([[wx, -40], [wx + Math.cos(a) * 52, -40 + Math.sin(a) * 52]], { w: 3, col: '#c8a040', pass2: false }); } }
    const bx = rect(-330, -200, 300, 130, { wash: '#b8241e', washA: 1, w: 3, col: '#2a0a06', key: 8820 }); shadeG(bx.path, -30, 0, -300, 0, '#5a0a06', 0.4); push(-180, -136, 1, 0, dir); txt('FEUERWEHR', 0, 0, 30, { font: 'Osw', col: '#f6dc8a' }); pop();
    const cy = rect(-250, -330, 70, 130, { wash: '#d6a842', washA: 1, w: 2.4, col: '#5a3a08' }); metalG(cy.path, -230, -300, 70, '#f6dc8a', '#d6a842', '#7a5414'); pencil([[-280, -340], [-130, -360]], { w: 8, col: '#3a2a1a', pass2: false });
    ell(-100, -240, 40, 40, { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' }); for (let q = 0; q < 4; q++) pencil(ellPts(-100, -240, 34 - q * 7, 34 - q * 7, 0, 0, 20), { w: 3, col: '#c8b890', pass2: false });
    pencil([[-30, -120], [40, -150]], { w: 7, col: '#5a3a1e', pass2: false });
    human(-180, -330, 0.6, t, { body: '#22305a', legs: '#22305a', hat: 'firehelm', beard: 'short', hair: '#4a2a14', face: t > EV.yard_dim ? 'shock' : 'angry', armR: 'up', armL: 'hold', seed: 160 });
    if (Math.sin(t * 14) > 0) glow(-215, -420, 30, 'rgba(255,230,160,1)', 0.6);
    horse(160, 0, 0.62, t, { col: '#6a3a20', colD: '#2a1608', mane: '#1a0a04', gallop: t * 10, harness: '#2a1a0a', noShadow: 0 });
    pop();
  }
  function dims(t) {                                                 // размерная линия 5,34 м поперёк двора
    if (t < EV.yard_dim) return; const k = sm(clamp((t - EV.yard_dim) / 0.5)), y = 1300, x0 = 250, x1 = lerp(x0, 830, k);
    pencil([[x0, y], [x1, y]], { w: 6, col: '#f2c81e', pass2: false }); for (const xx of [x0, x1]) pencil([[xx, y - 26], [xx, y + 26]], { w: 6, col: '#f2c81e', pass2: false });
    if (k > 0.9) { push(540, y - 80, popK(t, EV.yard_dim + 0.45, 0.3)); ctx.save(); ctx.fillStyle = 'rgba(20,14,10,0.8)'; ctx.fillRect(-150, -48, 300, 90); ctx.restore(); txt('5,34 м', 0, 0, 70, { font: 'Osw', col: K.amber }); pop(); }
  }

  WORLD.yard = (t, u, cat) => {
    lay(30, () => { vgrad(-700, 1400, ['#6a8ab0', '#b8c8d8', '#e8e0d0'], 1); cloudB(540 + t * 10, 260, 1.4, '#ffffff', 0.8, 61); });
    lay(1.6, () => walls(t));
    lay(1, () => { ground(t); cart(t); dims(t); cat(); });
    lay(0.6, () => { motes(16, [-100, 300, 1200, 1900], '#e8e0d0', t, 8830, { sp: 20, vx: 10, sz: 3, a: 0.4 }); });
  };
  DIR.yard = {
    outfit: 'fireman', light: { side: 1, rim: '#f0e0c0' }, grade: ['#a87040', 0.24],
    act: () => [[S0.yard, 'neutral'], [EV.yard_cart, 'suspicious'], [EV.yard_dim, 'proud'], [EV.yard_pot + 0.35, 'shock']],
    pose: (t, u, b) => Object.assign(b, {
      x: 880, y: GY + 60, s: 0.98, look: t > EV.yard_pot ? [-0.7, -0.6] : [-0.6, 0.1], hand: t > EV.yard_dim && t < EV.yard_pot ? [-170, -240] : undefined, point: t > EV.yard_dim && t < EV.yard_pot ? 1 : undefined, squash: b.squash, tailUp: t > EV.yard_pot + 0.35
    }),
    cam: () => [[S0.yard, 540, 860, -0.05], [EV.yard_cart, 560, 940, 0.02], [EV.yard_dim, 600, 1000, 0.06], [S1.yard, 620, 1000, 0.12]],
    hud: t => { if (t > S0.yard + 0.3 && t < EV.yard_dim) note('план Хобрехта', 300, 1100, t, S0.yard + 0.3, EV.yard_dim, '#f6ecd6', 48, -0.04); }
  };

  // ---------------------------------------------------------------- переход В 1862: нырок в отражение полированной чаши (рябь)
  TRANS_IN.yard = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const cx = 700, cy = 1350, z = sm(clamp(k / 0.55));
    drawBuf(A, 1 + z * 2.5, cx, cy, 1);
    const R = Math.pow(sm(clamp((k - 0.35) / 0.6)), 1.2) * 1600;
    if (R > 1) { inCircle(cx, cy, R, () => { for (let i = 0; i < 6; i++) drawBuf(B, 1.06 + i * 0.01 * (1 - k), 540, 960, i ? 0.18 : 1, null, Math.sin(t * 30 + i) * 14 * (1 - k), 0); });
      scr(() => { for (let q = 0; q < 4; q++) { const rr = R * (0.6 + q * 0.14); pencil(ellPts(cx, cy, rr, rr * 0.9, 0, 0, 60), { w: 6 - q, col: '#e8f6ff', a: 0.6 * (1 - k), pass2: false, gap: false }); } }); }
  } };
})();
