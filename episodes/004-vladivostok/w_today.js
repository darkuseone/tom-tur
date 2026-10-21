/* 004 — сцены `today` и `button`.
   today: 2026, закат над Амурским заливом (петля к хуку): лёд, рыбаки, Золотой мост в огнях. Том перечисляет двойников — над городом по словам
   встают призраки: минареты Стамбула, красные Золотые Ворота, пальмы Сочи. На «тигры» по льду за Томом проходит амурский тигр,
   Том подпрыгивает, потом хохочет. Переход В сцену — купюра 2000 на просвет: водяной знак-мост становится настоящим.
   button: ночной Владивосток, Золотой мост в огнях, портал часов с постерами городов. Переход В button — тигриные полосы. */
(() => {
  EV.td_ist = wt('t1', 'Стамбул,');
  EV.td_sf = wt('t1', 'Сан-Франциско,');
  EV.td_sochi = wt('t1', 'Сочи.');
  EV.td_tiger = wt('t1', 'тигры');
  EV.td_own = wt('t1', 'свои!');
  EV.bt_point = wt('x1', 'Пиши');
  EV.bt_wink = wt('x1', 'отмотаем!');
  KEYW.push('Стамбул,', 'Сан-Франциско,', 'Сочи.', 'тигры', 'свои!');
  SHAKES.push([EV.td_tiger, 0.2, 6]);

  function sky(t) { vgrad(-900, 1300, ['#2a3a7a', '#7a5a9a', '#f0907a', '#f8c890'], 1); glow(760, 1040, 380, 'rgba(255,170,100,1)', 0.65); ell(760, 1060, 90, 90, { wash: '#ffd8a0', washA: 0.95, line: false }); }
  function city(t) { sopki(1020, '#5a4a7a', 1.2, 230, 1); cityBlocks(-300, 1400, 980, 77, ['#6a5a8a', '#7a6a9a', '#5a4a7a'], t, 1, 200);
    sopki(1110, '#4a3a6a', 3.4, 150, 1); cityBlocks(-300, 1400, 1080, 91, ['#5a4a7a', '#4a3a6a', '#6a5a8a'], t, 1, 150); goldenBridge(700, 1160, 0.85, t, 1); haze('#f0a080', 0.12); }
  function ghosts(t) {                                              // призраки двойников по словам
    const g = (t0, d = 0.35) => sm((t - t0 + 0.1) / d) * (1 - sm((t - EV.td_tiger - 0.3) / 0.4));
    let k = g(EV.td_ist); if (k > 0) { ctx.save(); ctx.globalAlpha = 0.75 * k; const C = '#f2c66a'; push(240, 1000, 0.7); ell(0, -170, 140, 120, { wash: C, washA: 0.9, w: 2, col: '#8a5a1a' }); rect(-180, -170, 360, 170, { wash: C, washA: 0.9, w: 2, col: '#8a5a1a' });
      for (const mx of [-300, -230, 230, 300]) { rect(mx - 9, -400, 18, 400, { wash: C, washA: 0.9, w: 1.6, col: '#8a5a1a' }); poly([[mx - 12, -400], [mx, -470], [mx + 12, -400]], { wash: C, washA: 0.9, w: 1.4, col: '#8a5a1a' }); } pop(); ctx.restore(); }
    k = g(EV.td_sf); if (k > 0) { ctx.save(); ctx.globalAlpha = 0.7 * k; push(700, 1160, 0.85); for (const px of [-330, 330]) { rect(px - 20, -560, 40, 560, { wash: '#e0402a', washA: 0.9, w: 2, col: '#5a1a0a' }); rect(px - 34, -400, 68, 14, { wash: '#e0402a', washA: 1, line: false }); } pencil([[-900, -150], [-330, -540], [0, -200], [330, -540], [900, -150]], { w: 6, col: '#e0402a', pass2: false }); pop(); ctx.restore(); }
    k = g(EV.td_sochi); if (k > 0) { ctx.save(); ctx.globalAlpha = k; palm(1000, 1240, 300, t, 4, 0.8); palm(880, 1240, 220, t, 5, 0.7); glow(980, 1000, 220, 'rgba(255,220,120,1)', 0.4); ctx.restore(); }
  }
  function ice(t) { iceField(1180, t, 53, '#e8d8e8'); const r = rng(55); for (let i = 0; i < 60; i++) { const d = Math.pow(r(), 1.3), y = 1190 + d * 280, x = -200 + r() * 1500, s = 0.22 + d * 0.6; if (Math.abs(x - 560) < 260 && y > 1360) continue; smallFisher(x, y, s, t, i + 3, i % 9 === 0); }
    for (let i = 0; i < 20; i++) glow(-200 + i * 80, 1200 + (i % 4) * 60, 50, 'rgba(255,170,120,1)', 0.12); }
  function tigerWalk(t) {                                           // тигр проходит по льду за Томом
    if (t < EV.td_tiger - 0.5) return; const k = clamp((t - EV.td_tiger + 0.5) / 2.2), x = lerp(1300, 120, k);
    tiger(x, 1430, 0.85, t, { walk: t * 6, look: t > EV.td_own - 0.1 ? 1 : 0, yawn: t > EV.td_own ? sm((t - EV.td_own) / 0.3) : 0 });
  }

  WORLD.today = (t, u, cat) => {
    lay(36, () => sky(t));
    lay(16, () => { city(t); ghosts(t); });
    lay(4, () => ice(t));
    lay(1.6, () => tigerWalk(t));
    lay(1, () => { push(560, GY + 60, 1); ell(0, 40, 260, 40, { wash: '#000000', washA: 0.12, line: false }); pop(); cat(); });
    lay(0.6, () => motes(26, [-200, 0, W + 200, H], '#ffe8d8', t, 57, { sp: 50, vx: -20, sz: 3, a: 0.6, wob: 1 }));
  };
  DIR.today = {
    outfit: 'hawaiiS', light: { side: 1, rim: '#ffb890' }, grade: ['#c87a6a', 0.14],
    act: () => [[S0.today, 'proud'], [EV.td_sf, 'grin'], [EV.td_sochi, 'smug'], [EV.td_tiger - 0.03, 'scared'], [EV.td_own, 'laugh']],
    pose: (t, u, b) => { const jump = t > EV.td_tiger && t < EV.td_tiger + 0.45 ? Math.sin((t - EV.td_tiger) / 0.45 * Math.PI) * 90 : 0, n = t < EV.td_sf ? 1 : t < EV.td_sochi ? 2 : 3;
      return Object.assign(b, { x: 560, y: GY + 40 - jump, s: 1.12, look: t > EV.td_tiger && t < EV.td_own ? [0.8, -0.1] : [0.1, 0], hand: t < EV.td_tiger ? [60, -250 - n * 20] : t < EV.td_own ? [-60, -380] : [60, -230], handF: t < EV.td_tiger ? [-120, -230] : t < EV.td_own ? [80, -380] : undefined,
        tailUp: t > EV.td_tiger, squash: b.squash + (jump > 0 ? -0.06 : 0) }); },
    cam: () => [[S0.today, 560, 1180, 0.12], [EV.td_ist, 520, 1080, 0.04], [EV.td_sochi, 600, 1100, 0.04], [EV.td_tiger, 560, 1220, 0.1, 'x'], [EV.td_own, 520, 1200, 0.14], [S1.today, 520, 1220, 0.18]]
  };
  // ---------------------------------------------------------------- переход В today: купюра на просвет → водяной знак становится мостом
  TRANS_IN.today = { a: 0.24, b: 0.46, runA: 1, fx(k, t, A, B) {
    const q = sm(k);
    if (k < 0.4) { drawBuf(A); const z = 1 + sm(k / 0.4) * 1.6; scr(() => { push(540, 760, z); const b = rect(-380, -170, 760, 340, { wash: '#4a8ad0', washA: 1, w: 4, col: '#1a2a5a' }); glow(0, 0, 400, 'rgba(255,240,210,1)', sm(k / 0.4) * 0.7); pop(); }); return; }
    const p = sm((k - 0.4) / 0.6); drawBuf(B, 1.15 - 0.15 * p); scr(() => { ctx.save(); ctx.globalAlpha = 1 - p; ctx.fillStyle = '#bfd8f0'; ctx.fillRect(0, 0, W, H); ctx.restore(); glow(540, 900, 900, 'rgba(255,248,230,1)', 0.6 * (1 - p)); });
  } };

  // ================================================================ BUTTON
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#5a3a6a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(19); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(14, () => { sopki(1150, '#141230', 2.2, 200, 1); cityBlocks(-400, 1500, 1120, 31, ['#1a1834', '#221e40', '#16142c'], t, 1, 220); goldenBridge(600, 1260, 1.0, t, 1);
      const rp = rect(-600, 1260, 2300, 300, { wash: '#1a2a4a', washA: 1, line: false }); for (let k = 0; k < 40; k++) { const x = -500 + k * 55; pencil([[x, 1290 + (k % 4) * 30], [x + 30, 1290 + (k % 4) * 30]], { w: 3, col: '#ffcf7a', a: 0.4, pass2: false }); } });
    haze('#2a2050', 0.1);
    if (open > 0) lay(2, () => { const cx = 540, cy = 640, R = 380 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(60,110,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['?', '#2a4a3a', '#c8e0a0', 'tower']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { iceField(1560, t, 59, '#3a4a6a'); for (let i = 0; i < 6; i++) { const r = rng(60 + i); push(-100 + r() * 1300, 1600 + r() * 80, 0.5); poly([[-60, 0], [-10, -90], [40, 0]], { wash: ['#c83a2a', '#2a6ac8', '#e8a020'][i % 3], washA: 1, w: 1.6, col: '#0a0a14' }); glow(-10, -40, 80, 'rgba(255,200,120,1)', 0.5); pop(); } cat(); });
    motes(40, [0, 300, W, 1700], '#ffffff', t, 34, { sp: 30, sz: 2.6, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hawaiiS', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1770, s: 1.0, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1030, 0.1, 'x'], [DUR + 0.2, 600, 1020, 0.06]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: тигриные полосы заливают кадр
  TRANS_IN.button = { a: 0.24, b: 0.36, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B); const q = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5);
    scr(() => { ctx.save(); ctx.globalAlpha = 0.95 * q; ctx.fillStyle = '#e0802a'; ctx.fillRect(0, 0, W, H * q * 1.1 > H ? H : H * q * 1.1); ctx.restore();
      for (let i = 0; i < 9; i++) { const y = -200 + i * 260, w_ = 60 + (i % 3) * 30; ctx.save(); ctx.globalAlpha = q; push(0, y, 1, 0.35); poly([[-200, -w_], [W * 0.6 * q + 200, -w_ * 0.3], [W * q + 400, 0], [W * 0.6 * q + 200, w_ * 0.3], [-200, w_]], { wash: '#1a0e06', washA: 1, line: false }); pop(); ctx.restore(); } });
  } };
})();
