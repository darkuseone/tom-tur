/* 004 — сцена `duel`: 1822, утро за городом, виноградники на склоне, тополя, коляска секундантов. Офицер Зубов целится из пистолета,
   Пушкин в сюртуке держит фуражку с черешней и ест, сплёвывая косточки. Том оказался ровно на линии огня — на «целятся» шарахается в сторону.
   «черешню!» — Пушкин закидывает ягоду; «промазал» — вспышка, пуля пробивает цилиндр Тома (цилиндр крутится), Пушкин жуёт дальше, Том хохочет.
   Переход В сцену: ягода черешни летит в камеру — сцена открывается в блестящем красном круге. */
(() => {
  EV.du_aim = WT('s6', 'целятся');               // Зубов поднимает пистолет
  EV.du_eat = WT('s6', 'черешню!');              // ягода в рот
  EV.du_shot = WT('s6', 'Зубов') + 0.45;         // выстрел (на «промазал»)
  EV.du_spit = EV.du_eat + 0.55;                 // косточка
  SHAKES.push([EV.du_shot, 0.3, 14]);
  KEYW.push('целятся', 'черешню!', 'промазал.');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function sky(t) {
    vgrad(-900, 1300, ['#8ab8e0', '#c8dcec', '#f6e8c8', '#f8dca8']);
    glow(1000, 700, 520, 'rgba(255,236,190,1)', 0.5);
    for (let k = 0; k < 5; k++) { const r = rng(10100 + k), cx = ((r() * 1700 + t * 8) % 1900) - 400, cy = 120 + r() * 360; for (let q = 0; q < 5; q++) ell(cx + q * 66 - 132, cy - Math.sin(q / 4 * Math.PI) * 30, 70, 34, { wash: '#fffaf0', washA: 0.8, line: false }); }
    for (let k = 0; k < 6; k++) glow(-200 + k * 300, 1150, 300, 'rgba(255,250,240,1)', 0.25, 'source-over');   // утренний туман
  }
  function vineyard(t) {                          // виноградник на склоне: ряды шпалер
    sil([[-600, 1050], [-100, 930], [400, 990], [900, 900], [1700, 980], [1700, 1300], [-600, 1300]], '#8aa86a', 1);
    for (let row = 0; row < 9; row++) { const y0 = 990 + row * 24 - Math.max(0, 6 - row) * 4; for (let i = 0; i < 26; i++) { const x = -400 + i * 70 + row * 14, y = y0 + Math.sin(x * 0.004) * 30 - (x > 600 ? (x - 600) * 0.05 : 0);
      pencil([[x, y], [x, y - 22 - row * 2]], { w: 2, col: '#5a4a2a', pass2: false }); ell(x + 6, y - 24 - row * 2, 16 + row, 10 + row * 0.6, { wash: lerpC('#5a8a2e', '#3a6a22', (i % 3) / 3), washA: 1, line: false }); } }
    for (let k = 0; k < 8; k++) { const r = rng(10110 + k); poplar(-300 + k * 220 + r() * 60, 1040 - r() * 40, 260 + r() * 100, t, 10110 + k, '#5a7a4a'); }
    haze('#f6eedc', 0.28);
  }
  function carriage(x, y, s, t) {                 // коляска секундантов + лошадь
    push(x, y, s); const L = '#1e140a';
    const b = blob([[-120, -60], [-130, -150], [-60, -170], [80, -150], [110, -60]], { wash: '#2a3a2a', washA: 1, w: 2, col: L }); pencil(spline([[-130, -150], [-40, -230], [60, -170]], false, 8), { w: 5, col: '#1a1a1a', pass2: false });
    for (const wx of [-80, 70]) { ell(wx, -30, 44, 44, { wash: '#4a3020', washA: 0.2, w: 3, col: L }); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283; pencil([[wx, -30], [wx + Math.cos(a) * 42, -30 + Math.sin(a) * 42]], { w: 2, col: L, pass2: false }); } }
    push(-240, 0, 1); const g = Math.sin(t * 2) * 0.05; blob([[-80, -100], [-50, -150], [60, -150], [80, -110], [70, -80], [-70, -80]], { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (const lx of [-50, -30, 40, 60]) pencil([[lx, -84], [lx, 0]], { w: 8, col: '#6a4428', pass2: false });
    push(-70, -130, 1, -0.5 + g); shape([[0, 0], [-30, -90], [0, -100], [20, -10]], { wash: '#8a5a32', washA: 1, w: 1.8, col: L }); ell(-24, -100, 26, 16, { wash: '#8a5a32', washA: 1, w: 1.8, col: L }); pop(); pop();
    pop();
  }
  function ground(t) {
    poly([[-600, 1280], [1700, 1260], [1700, 2400], [-600, 2400]], { wash: '#9aac68', washA: 1, line: false }); vgrad(1260, 2000, ['#a8b874', '#8a9a54', '#6a7a3e']);
    for (let i = 0; i < 70; i++) { const r = rng(10120 + i), x = -300 + r() * 1700, y = 1290 + Math.pow(r(), 1.3) * 600, h = 10 + (y - 1290) / 18; for (let q = 0; q < 3; q++) pencil([[x + q * 5, y], [x + q * 5 + Math.sin(t * 2 + i) * 4 + (q - 1) * 4, y - h]], { w: 1.8 + (y - 1290) / 400, col: '#5a6a2a', pass2: false }); }
    for (let i = 0; i < 14; i++) { const r = rng(10140 + i); ell(-200 + r() * 1400, 1320 + r() * 500, 5, 5, { wash: ['#f6f0e0', '#f0d040', '#c8a8e0'][i % 3], washA: 1, line: false }); }
    // барьер дуэли: два плаща на траве
    for (const bx of [380, 700]) { push(bx, 1380, 1); blob([[-50, 0], [-40, -14], [40, -16], [54, 0], [30, 8], [-30, 8]], { wash: '#3a3a4a', washA: 1, w: 1.8, col: '#1a1a1a' }); pop(); }
  }
  function zubov(t) {                             // офицер в тёмно-зелёном мундире, кивер, целится вправо
    const aim = sm(fade(t, EV.du_aim - 0.2, EV.du_aim + 0.25)), x = 250, y = 1430, s = 1.0;
    human(x, y, s, t, { body: '#24402e', bodyD: '#0e2016', trim: '#e6c050', belt: '#e8e0d0', hat: 'cap', hatCol: '#1a2a1e', hair: '#3a2a1a', face: t > EV.du_shot + 0.2 ? 'shock' : 'angry', armR: aim > 0.5 ? 'point' : 'down', armL: 'hips', seed: 1121, look: 0.8 });
    push(x, y, s); for (const sd of [-1, 1]) { rect(sd * 50 - 18, -228, 36, 10, { wash: '#e6c050', washA: 1, w: 1.2, col: '#5a4a10' }); } ell(0, -330, 30, 10, { wash: '#1a2a1e', washA: 1, line: false });
    if (aim > 0.5) { push(150, -222, 1, -0.02); rect(-6, -10, 70, 14, { wash: '#3a3a40', washA: 1, w: 1.8, col: '#0a0a0a' }); shape([[-6, -6], [-20, 30], [-4, 34], [8, 4]], { wash: '#6a4428', washA: 1, w: 1.6, col: '#0a0a0a' });
      if (t > EV.du_shot && t < EV.du_shot + 0.25) { const q = (t - EV.du_shot) / 0.25; glow(80, -4, 120 * (1 - q) + 30, 'rgba(255,220,120,1)', 1 - q); poly([[64, -4], [140 + 60 * q, -40], [120, -2], [150 + 60 * q, 30]], { wash: '#fff2b0', washA: 1 - q, line: false }); }
      if (t > EV.du_shot) for (let k = 0; k < 6; k++) { const q = clamp((t - EV.du_shot) / 1.6), r = rng(10150 + k); glow(80 + q * (60 + r() * 120), -10 - q * (40 + r() * 80), 30 + q * 90, 'rgba(220,214,206,1)', 0.6 * (1 - q), 'source-over'); }
      pop(); }
    pop();
  }
  function pushkinDuel(t) {                       // Пушкин: сюртук, кудри, фуражка с черешней, жуёт
    const x = 880, y = 1420, s = 1.0, eat = t > EV.du_eat - 0.3;
    human(x, y, s, t, { body: '#2a2a3a', bodyD: '#12121a', hair: '#1a1008', face: t > EV.du_eat && t < EV.du_eat + 0.4 ? 'shock' : 'grin', armR: 'hold', armL: eat && t < EV.du_eat + 0.2 ? 'up' : 'down', seed: 1799, flip: -1, look: -0.4 });
    push(x, y, s, 0, -1); const hy = -284;
    for (let k = 0; k < 11; k++) { const a = Math.PI * (1.05 + k / 10 * 0.9), cx = Math.cos(a) * 44, cy = hy - 6 + Math.sin(a) * 50; ell(cx, cy, 13, 12, { wash: '#1a1008', washA: 1, w: 1.4, col: '#000' }); }
    for (const sd of [-1, 1]) blob([[sd * 40, hy - 10], [sd * 44, hy + 30], [sd * 30, hy + 40], [sd * 32, hy - 2]], { wash: '#1a1008', washA: 1, w: 1.2, col: '#000' });
    // фуражка-кулёк с черешней в руке
    push(30, -132, 1); const c = blob([[-50, -10], [-40, 20], [40, 20], [50, -10], [0, -20]], { wash: '#2a2a3a', washA: 1, w: 2, col: '#0a0a10' });
    for (let q = 0; q < 14; q++) { const r = rng(10160 + q), cx = -36 + r() * 72, cy = -18 - r() * 18; ell(cx, cy, 12, 12, { wash: r() < 0.5 ? '#a8102a' : '#c8203a', washA: 1, w: 1.2, col: '#3a0008' }); ell(cx - 3, cy - 3, 2.4, 2, { wash: '#fff', washA: 0.8, line: false }); pencil([[cx, cy - 8], [cx + 4, cy - 20]], { w: 1.4, col: '#3a5a1a', pass2: false }); }
    pop();
    // ягода летит в рот
    if (t > EV.du_eat - 0.3 && t < EV.du_eat) { const q = (t - EV.du_eat + 0.3) / 0.3, cx = lerp(-82, 0, q), cy = lerp(-320, hy + 26, q) - Math.sin(q * Math.PI) * 60; ell(cx, cy, 10, 10, { wash: '#c8203a', washA: 1, w: 1.4, col: '#3a0008' }); }
    pop();
    // косточки летят дугой
    for (const t0 of [EV.du_spit, EV.du_spit + 1.1, EV.du_spit + 1.9]) if (t > t0 && t < t0 + 0.6) { const q = (t - t0) / 0.6; ell(x - 30 - q * 260, y - 260 * s + q * q * 300 - Math.sin(q * Math.PI) * 80, 5, 4, { wash: '#e8d8b0', washA: 1, w: 1.2, col: '#5a4020' }); }
  }
  function seconds(t) {
    human(380, 1330, 0.6, t, { body: '#3a3a4a', hat: 'cap', hatCol: '#1a1a2a', hair: '#3a2a1a', beard: 'short', face: t > EV.du_shot ? 'shock' : 'calm', armR: 'hold', seed: 1131, look: 0.6 });
    human(640, 1320, 0.58, t, { body: '#5a3a2a', hair: '#6a4a2a', face: t > EV.du_shot ? 'shock' : 'calm', armL: t > EV.du_shot ? 'up' : 'down', armR: 'hold', prop: 'scroll', seed: 1132, flip: -1, look: -0.4 });
  }
  function bullet(t) {                            // пуля: свист через цилиндр Тома
    if (t < EV.du_shot || t > EV.du_shot + 0.4) return; const q = (t - EV.du_shot) / 0.4, x = lerp(400, 1300, q), y = lerp(1205, 1150, q);
    for (let k = 0; k < 6; k++) pencil([[x - 40 - k * 40, y + k * 1.5], [x - 10 - k * 40, y + k * 1.5]], { w: 3 - k * 0.4, col: '#fff6d0', a: 0.9 - k * 0.14, pass2: false }); ell(x, y, 7, 5, { wash: '#4a4a50', washA: 1, w: 1.2 });
  }

  WORLD.duel = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(14, () => vineyard(t));
    lay(5, () => { carriage(1150, 1260, 0.6, t); acacia(-60, 1270, 420, t, 1141); haze('#f6eedc', 0.1); });
    lay(1.5, () => { ground(t); seconds(t); zubov(t); pushkinDuel(t); });
    lay(1, () => { cat(); bullet(t); });
    lay(0.6, () => { vine(-30, 2000, 520, t, 1151, 1); vine(1120, 2000, 480, t, 1152, 1); });
    motes(28, [0, 300, W, 1600], '#fff6e0', t, 67, { sp: 5, sz: 2.2, a: 0.45, tw: 1, add: 1 });
  };

  DIR.duel = {
    outfit: 'victorian', light: { side: 1, rim: '#fff0c8' }, grade: ['#8a7a3a', 0.1],
    act: () => [[S0.duel, 'talk'], [EV.du_aim, 'scared'], [EV.du_eat, 'shock'], [WT('s6', 'Зубов'), 'suspicious'], [EV.du_shot, 'shock'], [EV.du_shot + 0.25, 'laugh']],
    pose: (t, u, b) => {
      const dodge = sm(fade(t, EV.du_aim, EV.du_aim + 0.3)), o = { x: lerp(600, 640, dodge), y: GY + 80 + dodge * 0, s: 1.0, look: [-0.6, -0.1], squash: b.squash };
      if (t > EV.du_aim && t < EV.du_shot) { o.rot = -0.1 * dodge; o.hand = [80, -340]; o.handF = [-60, -340]; o.y += 20 * dodge; o.look = [-0.8, -0.2]; o.tailUp = true; }
      if (t > EV.du_eat && t < WT('s6', 'Зубов')) o.look = [0.8, -0.2];
      if (t >= EV.du_shot) { o.noHat = true; o.hand = [60, -170]; o.handF = [-60, -170]; o.tilt = 0.08 * Math.sin(t * 11); o.squash = 0.05 * Math.sin(t * 22); o.look = [0, 0]; }
      return Object.assign(b, o);
    },
    afterCat: (t, u, P) => { if (t < EV.du_shot) return; const q = clamp((t - EV.du_shot) / 0.7), hx = P.x + 40 + q * 260, hy = P.y - 520 * P.s - Math.sin(q * Math.PI) * 220 + q * q * 260;
      push(hx, hy, 0.95, q * 9); rect(-50, -110, 100, 110, { wash: '#1a1a1e', washA: 1, w: 2.4, col: '#000' }); ell(0, 0, 80, 16, { wash: '#1a1a1e', washA: 1, w: 2.2, col: '#000' }); rect(-50, -30, 100, 16, { wash: '#a8302a', washA: 1, w: 1.4 });
      ell(-20, -70, 9, 9, { wash: '#f6ecd6', washA: 1, w: 1.4, col: '#000' }); ell(30, -66, 9, 9, { wash: '#f6ecd6', washA: 1, w: 1.4, col: '#000' }); pop(); },
    cam: () => [[S0.duel, 560, 1060, -0.04], [EV.du_aim, 520, 1060, -0.02], [EV.du_eat, 760, 1040, 0.08, 'x'], [WT('s6', 'Зубов'), 560, 1060, -0.04], [EV.du_shot + 0.1, 560, 1080, 0.02], [S1.duel, 580, 1080, 0.06]],
    hud: t => { if (t > EV.du_shot + 0.3) note('мимо!', 820, 760, t, EV.du_shot + 0.3, S1.duel + 0.2, '#fff6dc', 70, 0.05); if (t > EV.du_eat && t < EV.du_shot) note('ням', 860, 900, t, EV.du_eat, EV.du_shot, '#fff6dc', 52, -0.06); }
  };

  // ---------------------------------------------------------------- переход В сцену: ягода черешни летит в камеру, сцена — в красном блестящем круге
  TRANS_IN.duel = { a: 0.2, b: 0.45, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 560, cy = 960 - 120 * (1 - q), R = lerp(20, 1500, Math.pow(q, 2.3));
    drawBuf(A, 1 + q * 0.2);
    scr(() => { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.fillStyle = '#a8102a'; ctx.fill(); ctx.restore(); });
    inCircle(cx, cy, R * 0.86, () => drawBuf(B, 1.25 - 0.25 * q, cx, cy));
    scr(() => { ctx.save(); ctx.globalAlpha = 0.25 * (1 - q); ctx.fillStyle = '#c8203a'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, 0, 6.3); ctx.fill(); ctx.restore();
      glow(cx - R * 0.35, cy - R * 0.4, R * 0.3, 'rgba(255,255,255,1)', 0.6 * (1 - q)); pencil([[cx, cy - R], [cx + R * 0.15, cy - R * 1.5]], { w: Math.max(3, R * 0.06), col: '#3a5a1a', a: 1 - q, pass2: false }); });
  } };
})();
