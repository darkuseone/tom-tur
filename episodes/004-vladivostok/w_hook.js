/* 004 — сцена `hook`: 2026, лёд Амурского залива. Сотни рыбаков у лунок, на горизонте Владивосток на сопках и Золотой мост.
   Том в гавайке и шарфе под пляжным зонтиком, шезлонг, пальма в кадке — «широта Сочи!». На «Сочи» — пунктир 43-й параллели
   с призраками пальм и солнца; на «льду» — лёд трескается у лап, иней, Том стучит зубами. Переход в туннель: нырок в лунку. */
(() => {
  EV.hk_sochi = wt('h1', 'Сочи!');              // пунктир параллели + призрак Сочи
  EV.hk_ice = wt('h1', 'льду!');                // треск льда, иней, озноб
  EV.hk_wind = wt('h2', 'Отматываем');          // часы в лапе над лункой
  SHAKES.push([EV.hk_ice + 0.02, 0.25, 8]);
  KEYW.push('Сочи!', 'льду!');
  const HX = 790, HY = GY + 70;                  // лунка-портал у ног Тома

  function sky(t) {
    vgrad(-900, 1300, ['#4a86c8', '#8ac0e6', '#d6e8f2', '#f6dcc8'], 1);
    glow(220, 330, 260, 'rgba(255,236,200,1)', 0.55); ell(220, 330, 62, 62, { wash: '#fff4dc', washA: 0.95, line: false });
    for (let i = 0; i < 5; i++) { const x = ((i * 310 + t * 12) % 1800) - 300, y = 160 + i * 70; blob([[x - 140, y], [x - 80, y - 30], [x, y - 40], [x + 90, y - 26], [x + 150, y]], { wash: '#ffffff', washA: 0.5, line: false }); }
    const r = rng(41); for (let i = 0; i < 6; i++) { const bx = ((r() * 1400 + t * (30 + i * 6)) % 1600) - 200, by = 420 + r() * 160; pencil([[bx - 12, by], [bx, by - 7 + Math.sin(t * 9 + i) * 4], [bx + 12, by]], { w: 2.2, col: '#2a3a4a', pass2: false }); }
  }
  function city(t) {                                                // берег: сопки, многоэтажки, телевышка, Золотой мост, сухогрузы во льду
    sopki(1020, '#9ab4c8', 1.2, 230, 1); cityBlocks(-300, 1400, 980, 77, ['#c8d4dc', '#e8e2d6', '#b8c8d4', '#d8c8b8'], t, 0, 200);
    push(860, 930, 0.7); pencil([[0, 0], [0, -220]], { w: 5, col: '#c84a3a', pass2: false }); for (let k = 0; k < 6; k++) pencil([[-8 + k, -k * 36], [8 - k, -k * 36 - 18]], { w: 2, col: '#e8e8e8', pass2: false }); pop();
    sopki(1110, '#7a9ab0', 3.4, 150, 1); cityBlocks(-300, 1400, 1080, 91, ['#a8b8c4', '#d8d0c4', '#c4b4a4', '#e0e4e8'], t, 0, 150);
    goldenBridge(700, 1160, 0.85, t, 0);
    for (const [x, c] of [[120, '#7a2a24'], [1000, '#2a4a6a']]) { push(x, 1162, 0.5); poly([[-160, 0], [-140, -50], [150, -50], [170, 0]], { wash: c, washA: 1, w: 2, col: '#1a1a1a' }); rect(60, -110, 60, 60, { wash: '#e8e8e8', washA: 1, w: 1.6, col: '#1a1a1a' }); for (let q = -2; q < 2; q++) pencil([[q * 40, -50], [q * 40 + 10, -130]], { w: 4, col: '#c8a040', pass2: false }); pop(); }
    haze('#e6eef4', 0.22);
  }
  function crowd(t) {                                               // поле рыбаков: от горизонта к нам — крупнее
    const r = rng(43); for (let i = 0; i < 90; i++) { const d = Math.pow(r(), 1.3), y = 1190 + d * 300, x = -200 + r() * 1500, s = 0.22 + d * 0.65;
      if (Math.abs(x - HX) < 260 && y > 1380) continue; smallFisher(x, y, s, t, i, i % 11 === 0); }
  }
  function sochiGhost(t) {                                          // пунктир 43-й параллели и призрак Сочи
    const k = sm((t - EV.hk_sochi) / 0.35) * (1 - sm((t - EV.hk_ice - 0.25) / 0.4)); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha = k; const y = 1238;
    for (let x = -100; x < 1200; x += 46) pencil([[x, y], [x + 26, y - 1]], { w: 10, col: '#e8a33c', pass2: false, gap: false }); txt('43° с. ш.', 980, y - 34, 40, { font: 'Osw', col: '#e8a33c' });
    glow(880, 660, 240, 'rgba(255,200,90,1)', 0.45); palm(300, y, 300, t, 1, 0.7); palm(150, y, 220, t, 2, 0.55); palm(960, y, 260, t, 3, 0.6);
    ctx.restore();
  }
  function beach(t, P) {                                            // пляжный набор на льду
    push(250, GY + 30, 1.15, -0.08);
    pencil([[0, 0], [30, -430]], { w: 7, col: '#d8d0c0', pass2: false });
    const cx = 30, cy = -440, cols = ['#e8423a', '#fff4e0'];
    for (let i = 0; i < 8; i++) { const a0 = Math.PI + i / 8 * Math.PI, a1 = Math.PI + (i + 1) / 8 * Math.PI;
      poly([[cx, cy - 60], [cx + Math.cos(a0) * 250, cy + Math.sin(a0) * 60 + 50], [cx + Math.cos(a1) * 250, cy + Math.sin(a1) * 60 + 50]], { wash: cols[i % 2], washA: 1, w: 2, col: '#3a1a14' }); }
    ell(cx, cy - 64, 8, 8, { wash: '#e8c040', washA: 1, w: 1.4 });
    for (let q = 0; q < 4; q++) { const x = -150 + q * 30; pencil([[x, cy + 60 + q * 2], [x + 3, cy + 90 + q * 8]], { w: 3, col: '#bfe4f4', pass2: false }); }   // сосульки на зонтике
    pop();
    push(170, GY + 30, 1); pencil([[-90, 0], [-40, -110], [80, -110], [110, 0]], { w: 6, col: '#c8a060', pass2: false });         // шезлонг
    poly([[-46, -104], [76, -106], [60, -40], [-70, -32]], { wash: '#2a8ac8', washA: 1, w: 2, col: '#1a2a3a' }); for (let q = 0; q < 4; q++) pencil([[-40 + q * 28, -100], [-56 + q * 28, -36]], { w: 6, col: '#fff4e0', a: 0.9, pass2: false });
    blob([[-50, -40], [-40, -60], [0, -64], [40, -60], [50, -44]], { wash: '#f4f8fa', washA: 1, w: 1.4, col: '#7a9aaa' });       // снег на шезлонге
    pop();
    push(80, GY - 40, 0.8); poly([[-46, 0], [-38, -70], [38, -70], [46, 0]], { wash: '#b8643a', washA: 1, w: 2, col: '#3a1a0a' });   // пальма в кадке, заиндевела
    palm(0, -70, 230, t * 0.3, 7, 1); motes(14, [-120, -320, 120, -60], '#ffffff', t, 9, { sp: 20, sz: 3, a: 0.8 }); pop();
  }
  function hole(t) {                                                // лунка у лап: тёмная вода, ледяная крошка, удочка
    ell(HX, HY, 74, 22, { wash: '#1a3a4a', washA: 1, w: 2.4, col: '#3a5a6a' }); ell(HX - 10, HY - 3, 46, 10, { wash: '#2a5a6e', washA: 1, line: false });
    if (t > EV.hk_wind) { const g = sm((t - EV.hk_wind) / 0.6); glow(HX, HY, 160, 'rgba(255,210,130,1)', 0.7 * g); ell(HX, HY, 60 * g, 16 * g, { wash: '#ffe6a8', washA: 0.8 * g, line: false }); }
    for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; ell(HX + Math.cos(a) * 88, HY + Math.sin(a) * 28, 9, 5, { wash: '#f4fafc', washA: 1, w: 1, col: '#7a9aaa' }); }
  }
  function crack(t) {                                               // трещина на «льду!»
    if (t < EV.hk_ice) return; const k = sm((t - EV.hk_ice) / 0.25), r = rng(47);
    for (let b = 0; b < 7; b++) { let x = HX - 40, y = GY + 30; const P = [[x, y]], a0 = -2.6 + b * 0.75; for (let q = 0; q < 6; q++) { x += Math.cos(a0 + (r() - 0.5) * 0.8) * 60 * k; y += Math.sin(a0 + (r() - 0.5) * 0.8) * 16 * k + 6; P.push([x, y]); }
      pencil(P, { w: 3, col: '#3a7a9a', pass2: false }); pencil(P.map(([a, c]) => [a + 2, c + 2]), { w: 1.4, col: '#ffffff', a: 0.8, pass2: false }); }
  }
  function fisher(t) {                                              // ближний рыбак на ящике: тулуп, ушанка, удочка, в шоке от Тома
    const sh = t > EV.hk_sochi - 0.1; human(1000, GY + 70, 1.1, t, { body: '#3a3a44', bodyD: '#16161c', legs: '#2a2a30', boots: '#1a1a1a', hat: 'fur', hatCol: '#5a4030', hair: '#5a3a1a', beard: 'short', face: t > EV.hk_ice ? 'grin' : sh ? 'shock' : 'calm', look: -0.8, armL: 'hold', armR: 'hold', seed: 81, flip: -1 });
    push(960, GY - 30, 1); pencil([[0, 0], [-120, 40]], { w: 3, col: '#1a1a1a', pass2: false }); pencil([[-120, 40], [-122, 110]], { w: 1, col: '#2a2a2a', pass2: false }); pop();
    rect(950, GY + 10, 90, 64, { wash: '#4a6a8a', washA: 1, w: 2, col: '#1a2a3a' }); txt('КОРЮШКА', 995, GY + 44, 18, { font: 'Osw', col: '#f4f0e0' });
    for (let q = 0; q < 3; q++) { push(880 + q * 26, GY + 92, 1, 0.2 * q); blob([[-16, 0], [-6, -6], [12, -4], [18, 0], [12, 4], [-6, 6]], { wash: '#b8d0d8', washA: 1, w: 1.2, col: '#3a5a6a' }); pop(); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(36, () => sky(t));
    lay(16, () => city(t));
    lay(4, () => { iceField(1180, t, 51); crowd(t); });
    lay(3, () => sochiGhost(t));
    lay(1, () => { beach(t); hole(t); crack(t); cat(); fisher(t); });
    lay(0.6, () => motes(36, [-200, 0, W + 200, H], '#ffffff', t, 52, { sp: 60, vx: -30, sz: 3.2, a: 0.75, wob: 1 }));
    if (t > EV.hk_ice) { const k = sm((t - EV.hk_ice) / 0.4); scr(() => { for (let i = 0; i < 30; i++) { const r = rng(900 + i), a = r() * 6.283, x = r() < 0.5 ? r() * 140 : W - r() * 140, y = r() * H; pencil([[x, y], [x + Math.cos(a) * 60 * k, y + Math.sin(a) * 60 * k]], { w: 3, col: '#ffffff', a: 0.55 * k, pass2: false }); } screenFill('#cfe8ff', 0.08 * k, 'screen'); }); }
  };
  DIR.hook = {
    outfit: 'hawaiiS', light: { side: -1, rim: '#fff0d8' }, grade: ['#4a7aa8', 0.12],
    act: () => [[0, 'talk'], [EV.hk_sochi - 0.03, 'proud'], [EV.hk_ice - 0.03, 'cold'], [LS('h2'), 'smug'], [EV.hk_wind + 0.15, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: 560, y: GY + 20, s: 1.16, look: t > EV.hk_ice && t < LS('h2') ? [0.1, 0.5] : t > LS('h2') ? [0.2, 0.3] : [0.3, 0],
      chatter: t > EV.hk_ice && t < LS('h2') + 0.3 ? 1 : 0, frost: sm((t - EV.hk_ice) / 0.5),
      hand: t > EV.hk_wind - 0.15 ? [60, -300] : t > EV.hk_sochi && t < EV.hk_ice ? [120, -340] : undefined,
      handF: t > EV.hk_ice && t < LS('h2') ? [40, -210] : undefined, point: t > EV.hk_sochi && t < EV.hk_ice ? 1 : undefined,
      watchInHand: t > EV.hk_wind - 0.15, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0, squash: b.squash + (t > EV.hk_ice && t < EV.hk_ice + 0.2 ? 0.06 : 0)
    }),
    cam: () => [[0, 560, 1060, 0.1], [EV.hk_sochi, 560, 1000, 0.04], [EV.hk_ice, 570, 1120, 0.16], [LS('h2'), 590, 1160, 0.18], [EV.hk_wind + 0.3, 610, 1260, 0.3], [S1.hook, 610, 1330, 0.42]],
    hud: t => { if (t > EV.hk_sochi + 0.1 && t < EV.hk_ice + 0.5) note('43° с. ш. — как Сочи', 640, 1790, t, EV.hk_sochi + 0.1, EV.hk_ice + 0.5, '#f6ecd6', 46, -0.03);
      if (t > EV.hk_ice + 0.1 && t < S1.hook) note('январь: −12 °C', 300, 1790, t, EV.hk_ice + 0.1, S1.hook, '#cfe8ff', 46, 0.03); }
  };

  // ---------------------------------------------------------------- переход В туннель: нырок в лунку
  TRANS_IN.tunnel = { a: 0.3, b: 0.36, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 700, cy = 1420 - 360 * q, Rx = 80 + Math.pow(q, 1.6) * 1500, Ry = Rx * (0.3 + 0.7 * q);
    drawBuf(A, 1 + q * 1.6, cx, cy + 360 * q);
    scr(() => { ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, Rx, Ry, 0, 0, 6.3); ctx.clip(); ctx.fillStyle = '#0e2a3a'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = sm((k - 0.25) / 0.5); ctx.drawImage(B, 0, 0); ctx.restore();
      pencil(ellPts(cx, cy, Rx, Ry, 0, 0.02, 80), { w: 18 + 30 * q, col: '#e8f4fa', a: 0.9, pass2: false, gap: false }); pencil(ellPts(cx, cy, Rx * 1.04, Ry * 1.04, 0, 0.02, 80), { w: 6, col: '#7fb4cc', a: 0.8, pass2: false, gap: false });
      const r = rng(hsh(FRAME, 31)); for (let i = 0; i < 26; i++) { const a = r() * 6.283, d = 0.3 + r() * 0.7; ell(cx + Math.cos(a) * Rx * d, cy + Math.sin(a) * Ry * d - q * 300 * r(), 6 + r() * 16, 6 + r() * 16, { wash: '#bfe8ff', washA: 0.4, w: 1.4, col: '#ffffff', a: 0.7 }); } });
  } };
})();
