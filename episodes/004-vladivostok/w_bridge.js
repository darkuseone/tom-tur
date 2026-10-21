/* 004 — сцена `bridge`: 2012, Русский мост в утреннем тумане. Λ-пилон 324 м уходит в облака, вантовые веера, на вантах монтажники.
   Две половины пролёта тянутся навстречу — на «рекорд» смыкаются «золотым швом» (искры). На «километра» — рулетка «1104 м» над пролётом.
   На «двухтысячной» Том достаёт купюру 2000 ₽ — на ней этот же мост. Переход В сцену — дворники «японки» смахивают кадр. */
(() => {
  EV.bg_rec = wt('s9', 'рекорд');               // золотой шов
  EV.bg_km = wt('s9', 'километра.');            // рулетка 1104 м
  EV.bg_note = wt('s9', 'двухтысячной!');       // купюра
  KEYW.push('рекорд', 'километра.', 'двухтысячной!');
  SHAKES.push([EV.bg_rec + 0.1, 0.25, 8]);
  
  const H0 = 1000, BY = 2250, pr = d => 1 / (1 + d * 0.35), at = d => { const k = pr(d); return [H0 + (BY - H0) * k, 1100 * k, k]; };   // перспектива настила
  function sky(t) { vgrad(-900, 1400, ['#4a6a98', '#8ab0d0', '#e0e8ec', '#f4dcc0'], 1); glow(760, 900, 420, 'rgba(255,230,190,1)', 0.5);
    for (let i = 0; i < 6; i++) { const x = ((i * 300 + t * 20) % 1800) - 300, y = 300 + i * 100; blob([[x - 220, y], [x - 100, y - 40], [x + 40, y - 50], [x + 200, y - 26], [x + 260, y]], { wash: '#ffffff', washA: 0.55, line: false }); } }
  function sea(t) { rect(-800, H0, 2700, 1600, { wash: '#3a6a8a', washA: 1, line: false }); for (let i = 0; i < 40; i++) { const y = H0 + 10 + (i % 12) * 50 * (1 + (i % 12) * 0.2), x = ((i * 137 + t * 25) % 2000) - 400; pencil([[x, y], [x + 50 + (y - H0) * 0.1, y]], { w: 2, col: '#cfe4f0', a: 0.6, pass2: false }); }
    sil([[-800, H0 + 4], [-500, H0 - 60], [-200, H0 - 30], [100, H0 - 80], [300, H0 + 4]], '#4a6a7a', 1); sil([[700, H0 + 4], [900, H0 - 70], [1200, H0 - 40], [1600, H0 - 90], [1900, H0 + 4]], '#4a6a7a', 1);
    push(160, H0 + 120, 0.4); poly([[-160, 0], [-140, -40], [160, -40], [180, 0]], { wash: '#a8241e', washA: 1, w: 2 }); rect(60, -110, 70, 70, { wash: '#f0f0f0', washA: 1, w: 1.6 }); pop(); haze('#e8eef2', 0.15); }
  function segment(d0, d1) { const [y0, w0] = at(d0), [y1, w1] = at(d1); const p = poly([[540 - w0, y0], [540 + w0, y0], [540 + w1, y1], [540 - w1, y1]], { wash: '#7a8088', washA: 1, w: 2, col: '#2a3038' });
    for (const sd of [-1, 1]) { pencil([[540 + sd * w0, y0], [540 + sd * w1, y1]], { w: 4 + 10 * pr(d0), col: '#e8a030', pass2: false }); poly([[540 + sd * w0, y0], [540 + sd * w1, y1], [540 + sd * w1, y1 + 40 * pr(d1)], [540 + sd * w0, y0 + 60 * pr(d0)]], { wash: '#5a6068', washA: 1, w: 1.4, col: '#2a3038' }); }
    for (let d = Math.ceil(d0 * 2) / 2; d < d1; d += 0.5) { const [y, w] = at(d), [y2] = at(d + 0.22); pencil([[540, y], [540, y2]], { w: 2 + 10 * pr(d), col: '#f4f0e0', pass2: false });
      for (const sd of [-1, 1]) { pencil([[540 + sd * w * 0.96, y], [540 + sd * w * 0.96, y - 110 * pr(d)]], { w: 1 + 5 * pr(d), col: '#c8ccd0', pass2: false }); } }
    for (const sd of [-1, 1]) pencil([[540 + sd * w0 * 0.96, y0 - 110 * pr(d0)], [540 + sd * w1 * 0.96, y1 - 110 * pr(d1)]], { w: 2 + 6 * pr(d0), col: '#c8ccd0', pass2: false }); }
  function pylon(d, hgt) { const [y, w, k] = at(d), top = y - hgt * k;
    for (const half of [[0.4, d - 0.2], [d + 0.2, d * 2 + 0.4]]) for (let i = 0; i < 14; i++) for (const sd of [-1, 1]) { const dd = lerp(half[0], half[1], i / 13), [cy, cw] = at(dd); pencil([[540 + sd * 8 * k, top + 60 * k + i * 22 * k], [540 + sd * cw, cy]], { w: 0.8 + 2.4 * pr(dd), col: '#f8f8f4', a: 0.85, pass2: false, gap: false }); }
    const leg = sd => [[540 + sd * w * 1.12, y + 30 * k], [540 + sd * 14 * k, top], [540 + sd * 40 * k, top], [540 + sd * w * 0.92, y + 30 * k]];
    for (const sd of [-1, 1]) { const p = poly(leg(sd), { wash: '#ecebe6', washA: 1, w: 2.2, col: '#6a7078' }); shadeG(p.path, 540 + sd * w, 0, 540, 0, '#9aa0a8', 0.4); }
    rect(540 - w * 0.55, y - hgt * k * 0.42, w * 1.1, 26 * k, { wash: '#ecebe6', washA: 1, w: 1.6, col: '#6a7078' }); glow(540, top, 50 * k + 10, 'rgba(255,80,60,1)', 0.9); }
  function deck(t, join) {
    const g0 = 6.2 + (1 - join) * 1.6 * 0, gw = (1 - join) * 1.4, gs = 7.2 - gw / 2, ge = 7.2 + gw / 2;
    pylon(14, 3000); segment(ge, 40); segment(0, gs);
    if (gw > 0.05) for (const dd of [gs, ge]) { const [y, w, k] = at(dd); pencil([[540 - w * 0.5, y], [540 - w * 0.5, y - 200 * k], [540 + w * 0.2, y - 200 * k]], { w: 3 + 8 * k, col: '#e8a030', pass2: false }); pencil([[540 + w * 0.2, y - 200 * k], [540 + w * 0.2, y - 120 * k]], { w: 1.6, col: '#2a2a2a', pass2: false }); }
    if (join > 0.95 && t < EV.bg_rec + 1.2) { const [y, w] = at(7.2), k = 1 - (t - EV.bg_rec - 0.3) / 0.9; pencil([[540 - w, y], [540 + w, y]], { w: 8, col: '#e8c040', pass2: false }); glow(540, y, 220, 'rgba(255,210,90,1)', 0.9 * k);
      for (let i = 0; i < 30; i++) { const r = rng(hsh(FRAME, i)), x = 540 + (r() - 0.5) * 2 * w, a = -Math.PI / 2 + (r() - 0.5) * 2, d = 20 + r() * 140 * (1 - k); pencil([[x, y], [x + Math.cos(a) * d, y + Math.sin(a) * d + d * d * 0.004]], { w: 3, col: '#fff0a0', a: k, pass2: false }); } }
    pylon(3.2, 2900);
    for (const [dd, sd, f, k_] of [[1.6, -1, 0.55, 0], [4.6, 1, 0.5, 1], [2.4, 1, 0.4, 2]]) { const [y, w, kk] = at(3.2), [cy, cw] = at(dd), top = y - 2900 * kk; const x = lerp(540 + sd * 8 * kk, 540 + sd * cw, f), yy = lerp(top + 140 * kk, cy, f);   // монтажники на вантах
      human(x, yy + 30, 0.42 * (0.6 + pr(dd)), t, { body: '#e87a1a', bodyD: '#9a4a0a', legs: '#2a3a5a', hat: 'helmet', face: 'calm', look: 0.4, armL: 'up', armR: 'up', seed: 700 + k_, flip: sd }); }
    if (t > EV.bg_km - 0.05) { const k = sm((t - EV.bg_km) / 0.4), [y1, , k1] = at(3.2), [y2, , k2] = at(14), ya = y1 - 900 * k1, yb = y2 - 900 * k2, xa = 540, ym = lerp(ya, yb, k);
      pencil([[xa, ya], [xa, ym]], { w: 6, col: '#f0d040', pass2: false }); for (const yy of [ya, ym]) pencil([[xa - 40, yy], [xa + 40, yy]], { w: 6, col: '#f0d040', pass2: false });
      if (k > 0.7) { push(xa + 20, (ya + yb) / 2, 1); ctx.save(); ctx.font = '600 110px Osw'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 18; ctx.strokeStyle = 'rgba(12,8,6,0.9)'; ctx.strokeText('1104 м', 20, 0); ctx.fillStyle = '#f8e8a0'; ctx.fillText('1104 м', 20, 0); ctx.restore(); pop(); } }
  }
  function near(t) { push(150, 1960, 1); rect(-70, -130, 140, 130, { wash: '#e8a030', washA: 1, w: 2, col: '#3a2a0a' }); for (let q = 0; q < 3; q++) pencil([[-70, -120 + q * 40], [70, -96 + q * 40]], { w: 7, col: '#2a2a2a', pass2: false }); pop();
    push(980, 2000, 1); for (let i = 0; i < 4; i++) { ell(0, -i * 30, 90, 26, { wash: '#3a3a42', washA: 1, w: 2 }); } pop(); }

  WORLD.bridge = (t, u, cat) => {
    const join = sm((t - EV.bg_rec + 0.5) / 0.55);
    lay(40, () => sky(t));
    lay(10, () => sea(t));
    lay(1.2, () => deck(t, join));
    lay(1, () => { cat(); near(t); });
  };
  DIR.bridge = {
    outfit: 'hardhat', light: { side: -1, rim: '#fff0d8' }, grade: ['#8aa0b8', 0.1],
    act: () => [[S0.bridge, 'talk'], [EV.bg_rec - 0.03, 'proud'], [EV.bg_km, 'awe'], [EV.bg_note - 0.03, 'smug'], [EV.bg_note + 0.5, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 760, y: 1880, s: 1.0, look: t < EV.bg_note ? [-0.5, -0.6] : [0.1, 0], hand: t > EV.bg_note - 0.1 ? [90, -280] : t > EV.bg_rec && t < EV.bg_km ? [110, -380] : undefined, tailUp: t > EV.bg_rec }),
    cam: () => [[S0.bridge, 560, 1100, 0.02], [EV.bg_rec, 540, 1060, -0.04, 'x'], [EV.bg_km, 540, 980, -0.08], [EV.bg_note, 680, 1300, 0.08, 'x'], [S1.bridge, 680, 1320, 0.12]],
    hud: t => { if (t < EV.bg_note - 0.05 || t > S1.bridge) return; const k = popK(t, EV.bg_note, 0.4); push(540, 760, k, -0.06);         // купюра 2000
      const b = rect(-380, -170, 760, 340, { wash: '#4a8ad0', washA: 1, w: 4, col: '#1a2a5a' }); shadeG(b.path, -380, 0, 380, 0, '#bfe0ff', 0.35);
      for (let q = 0; q < 12; q++) pencil([[-360, -150 + q * 26], [360, -150 + q * 26 + Math.sin(q) * 8]], { w: 1, col: '#2a4a8a', a: 0.3, pass2: false });
      push(60, 60, 0.42); for (let i = 0; i < 10; i++) for (const sd of [-1, 1]) pencil([[sd * 4, -300 + i * 24], [sd * (80 + i * 70), 0]], { w: 1.6, col: '#1a2a5a', a: 0.8, pass2: false }); poly([[-60, 0], [-10, -340], [10, -340], [60, 0], [40, 0], [0, -280], [-40, 0]], { wash: '#bfd8f0', washA: 1, w: 2, col: '#1a2a5a' }); pencil([[-700, 0], [700, 0]], { w: 8, col: '#1a2a5a', pass2: false }); pop();
      txt('2000', -230, -100, 84, { font: 'Osw', col: '#f8f8ff' }); txt('БАНК РОССИИ', 170, -120, 34, { font: 'Osw', col: '#1a2a5a' }); txt('2000', 270, 120, 56, { font: 'Osw', col: '#1a2a5a' }); txt('Владивосток', -220, 120, 34, { font: 'Hand', col: '#1a2a5a' }); pop(); }
  };
  // ---------------------------------------------------------------- переход В bridge: дворники смахивают кадр
  TRANS_IN.bridge = { a: 0.2, b: 0.4, runA: 1, fx(k, t, A, B) {
    const q = sm(k), ang = -Math.PI + q * Math.PI, piv = [[200, H + 60], [760, H + 60]];
    drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); for (const [px, py] of piv) { ctx.moveTo(px, py); ctx.arc(px, py, 1500, -Math.PI, ang); ctx.lineTo(px, py); } ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
      for (const [px, py] of piv) { push(px, py, 1, ang + Math.PI / 2); pencil([[0, 0], [0, -1400]], { w: 14, col: '#1a1a1a', pass2: false }); pencil([[-10, -200], [-10, -1400]], { w: 24, col: '#2a2a2a', pass2: false }); pop(); }
      const r = rng(hsh(FRAME, 5)); for (let i = 0; i < 40; i++) ell(r() * W, r() * H, 6 + r() * 10, 8 + r() * 14, { wash: '#cfe4f0', washA: 0.4 * (1 - q), w: 1, col: '#ffffff', a: 0.5 * (1 - q) }); });
  } };
})();
