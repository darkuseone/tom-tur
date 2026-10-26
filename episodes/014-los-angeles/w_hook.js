/* 014 — сцена `hook`: 2026, закат над Голливудскими холмами. На хребте — надпись HOLLYWOOD и мачта на горе Ли; ниже — пальмы,
   крыши, бульвар со «звёздами» на тротуаре, жёлтое такси, туристы с телефонами. Первый кадр — надпись крупно (петля из кнопки).
   На «Голливуд» надпись подсвечивается, на «кино» — кинолента с кадрами перечёркивается красным, на «чего?» — вопросы.
   Переход в туннель — киноплёнка закручивается спиралью в портал. */
(() => {
  EV.hk_sign = wtk('h1', 'Голливуд');
  EV.hk_film = wtk('h1', 'кино.');
  EV.hk_what = wtk('h1', 'чего?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('Голливуд', 'кино.', 'чего?');

  function sky(t) { vgrad(-900, 1000, ['#5a4a8a', '#e87a5a', '#f6c890'], 1); ell(1300, 760, 120, 120, { wash: '#ffe0a0', washA: 1, line: false }); glow(1300, 760, 420, 'rgba(255,190,120,1)', 0.5);
    for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 22, { wash: '#f8c8b0', washA: 0.8, line: false }); } }
  function town(t) {                                                   // крыши, пальмы
    for (let k = 0; k < 9; k++) { const x = -520 + k * 240, h = 80 + (k % 3) * 40; rect(x, 1080 - h, 200, h, { wash: ['#f2e2c8', '#e8c8b0', '#d8d0c0'][k % 3], washA: 1, w: 2, col: '#4a3a2a' }); poly([[x - 10, 1080 - h], [x + 210, 1080 - h], [x + 100, 1080 - h - 40]], { wash: '#c8603a', washA: 1, w: 2, col: '#4a2a1a' }); }
    for (const [x, h] of [[-300, 420], [-60, 380], [180, 460], [980, 440], [1220, 400], [1440, 470]]) palm(x, 1090, h, t);
  }
  function boulevard(t) {                                              // бульвар: тротуар со звёздами, такси, туристы
    rect(-600, 1180, 2300, 120, { wash: '#4a4a52', washA: 1, w: 2, col: '#1a1a1e' }); for (let x = -560; x < 1700; x += 140) rect(x, 1236, 70, 8, { wash: '#f2f2e8', washA: 1, w: 0, col: '#000' });
    const cx = ((t * 260) % 2400) - 600; push(cx, 1270, 0.6); rect(-150, -90, 300, 70, { wash: '#f0c030', washA: 1, w: 2.4, col: '#3a2a08' }); rect(-90, -140, 170, 54, { wash: '#f0c030', washA: 1, w: 2.4, col: '#3a2a08' }); rect(-70, -130, 60, 36, { wash: '#8ab0c8', washA: 1, w: 1.4, col: '#1a1a1a' }); rect(0, -130, 60, 36, { wash: '#8ab0c8', washA: 1, w: 1.4, col: '#1a1a1a' }); for (const wx of [-90, 90]) ell(wx, -20, 30, 30, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); pop();
    rect(-600, 1300, 2300, 170, { wash: '#b8a8a0', washA: 1, w: 2, col: '#3a3030' });
    for (let i = 0; i < 6; i++) { const x = ((i * 330 + t * (20 + i * 4)) % 2000) - 300; human(x, 1340, 0.42, t, { body: ['#3a8ac8', '#e8e4dc', '#c83a6a', '#2a2a2a', '#f0c030', '#3a6a3a'][i], legs: ['#2a3a5a', '#c8b088', '#2a2a2a'][i % 3], hair: ['#3a2a1a', '#e8c070', '#1a1410'][i % 3], hat: i === 2 ? 'cap' : undefined, hatCol: '#e8e4dc', face: 'smile', prop: i % 2 ? 'phone' : undefined, seed: 14120 + i, flip: i % 2 ? 1 : -1 }); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => ridge(t, { base: 1100, sign: 1, tower: 1, bulbs: t > EV.hk_sign && t < EV.hk_film }));
    lay(8, () => town(t));
    lay(3, () => boulevard(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#a89890', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 90) for (let y = 1480; y < 2400; y += 90) rect(x, y, 88, 88, { wash: '#b8a8a0', washA: 0.6, w: 1, col: '#5a4a48', a: 0.4 }); ctx.restore(); star(760, 1560, 1.2); star(1040, 1560, 1.2); cat(); });
    lay(0.7, () => motes(20, [0, 300, W, 1700], '#fff2c8', t, 14130, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieLA', light: { side: 1, rim: '#ffc8a0' }, grade: ['#c08070', 0.1],
    act: () => [[0, 'shock'], [EV.hk_sign, 'awe'], [EV.hk_film, 'suspicious'], [EV.hk_what, 'sideeye'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1480, s: 1.06, look: t < EV.hk_film ? [0.5, -0.7] : t < LS('h2') ? [-0.2, -0.3] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_sign - 0.1 && t < EV.hk_what ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_sign - 0.1 && t < EV.hk_what ? [170, -400] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 620, 640, 0.22], [EV.hk_sign, 600, 960, 0.12], [EV.hk_film, 560, 1040, 0.04], [EV.hk_what, 560, 1060, 0.04], [LS('h2'), 520, 1140, 0.12], [S1.hook, 480, 1120, 0.2]],
    hud: t => { if (t > EV.hk_film && t < EV.hk_what + 0.6) { const k = popK(t, EV.hk_film, 0.3); push(600, 760, k, -0.04); rect(-260, -70, 520, 140, { wash: '#1a1a1e', washA: 0.95, w: 3, col: '#000' }); for (let q = 0; q < 8; q++) { rect(-240 + q * 62, -62, 30, 18, { wash: '#f2f2e8', washA: 1, w: 0, col: '#000' }); rect(-240 + q * 62, 44, 30, 18, { wash: '#f2f2e8', washA: 1, w: 0, col: '#000' }); }
        txt('КИНО', 0, 14, 60, { font: 'Osw', col: '#f2f2e8' }); const c = sm((t - EV.hk_film - 0.15) / 0.3); if (c > 0) { pencil([[-220, -50], [-220 + 440 * c, 50]], { w: 14, col: '#d8201e', pass2: false }); pencil([[220, -50], [220 - 440 * c, 50]], { w: 14, col: '#d8201e', pass2: false }); } pop(); }
      if (t > EV.hk_what) { const r = rng(14140); for (let i = 0; i < 4; i++) { const k = popK(t, EV.hk_what + i * 0.12, 0.3); txt('?', 220 + r() * 640, 960 + r() * 300, (90 + r() * 70) * k, { font: 'Osw', col: '#ffd24a', a: 0.9 }); } } }
  };

  // ---------------------------------------------------------------- переход В туннель: киноплёнка закручивается спиралью в портал
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, -q * 0.6);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#e2683a'], clamp(1.5 - k)); }
    scr(() => { const f = 1 - q * 0.6; const P = Array.from({ length: 90 }, (_, i) => { const a = i * 0.16 + q * 8, r = 30 + i * 9 * (0.4 + q); return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });
      pencil(P, { w: 46, col: '#1a1a1e', a: f, pass2: false }); for (let i = 0; i < 90; i += 3) ell(P[i][0], P[i][1], 6, 6, { wash: '#f2f2e8', washA: f, w: 0, col: '#000' }); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
