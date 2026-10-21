/* 004 — сцена `khrush`: 1959, сопка над Золотым Рогом. Внизу порт: краны, суда, сталинки, «Победы». Хрущёв (лысина, светлый костюм,
   шляпа в руке) широким жестом рисует мечту: в облаке-мечте — Сан-Франциско (Золотые Ворота, трамвай на канате, домики на холмах).
   На «Сделали…» облако лопается — по склону ползёт один крошечный вагончик фуникулёра. Переход В сцену — штурвал раскручивает кадр. */
(() => {
  EV.kh_sf = wt('s7', 'Сан-Франциско!');        // облако-мечта
  EV.kh_did = wt('s7', 'Сделали…');             // облако лопается
  EV.kh_fun = wt('s7', 'фуникулёр.');           // вагончик
  KEYW.push('Сан-Франциско!', 'фуникулёр.');

  function sky(t) { vgrad(-900, 1300, ['#4a8ac8', '#8ac0e0', '#d8ecf0', '#f8e8c8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 400 + t * 12) % 1800) - 300, y = 200 + i * 80; blob([[x - 170, y], [x - 80, y - 40], [x + 30, y - 50], [x + 140, y - 28], [x + 190, y]], { wash: '#ffffff', washA: 0.7, line: false }); } }
  function harbor(t) {                                              // бухта 1959: сталинки, краны, суда
    sopki(980, '#7a9ab0', 0.9, 160, 1); cityBlocks(-300, 1400, 960, 59, ['#d8c8b0', '#e8dcc8', '#c8b8a0'], t, 0, 120);
    rect(-400, 1000, 1900, 140, { wash: '#3a7aa8', washA: 1, line: false }); for (let i = 0; i < 24; i++) pencil([[((i * 137 + t * 15) % 1700) - 200, 1010 + (i % 6) * 20], [((i * 137 + t * 15) % 1700) - 150, 1010 + (i % 6) * 20]], { w: 2, col: '#cfe4f0', a: 0.6, pass2: false });
    for (const [x, c] of [[80, '#2a2a30'], [500, '#e8e4dc'], [900, '#3a2a2a']]) { push(x, 1050, 0.5); poly([[-200, 0], [-180, -50], [180, -50], [200, 0]], { wash: c, washA: 1, w: 2 }); rect(-40, -140, 120, 90, { wash: '#f0ece0', washA: 1, w: 1.6 }); rect(10, -190, 30, 50, { wash: '#a8241e', washA: 1, w: 1.4 }); pop(); }
    for (const x of [250, 700, 1050]) { push(x, 1000, 0.6); pencil([[0, 0], [0, -260]], { w: 8, col: '#c8a030', pass2: false }); pencil([[0, -260], [-180, -200]], { w: 6, col: '#c8a030', pass2: false }); pencil([[-180, -200], [-180, -100]], { w: 1.4, col: '#2a2a2a', pass2: false }); rect(-200, -110, 40, 30, { wash: '#3a5a7a', washA: 1, w: 1 }); pop(); }
    haze('#e8f0f4', 0.12);
  }
  function slope(t, car) {                                          // склон с рельсами фуникулёра и вагончиком
    const g = poly([[-600, 1200], [200, 1120], [700, 1180], [1700, 1260], [1700, 2600], [-600, 2600]], { wash: '#8aa05a', washA: 1, w: 2, col: '#3a4a1a', key: 9995 }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#2a3a10', ang: -0.4, key: 9996 });
    for (let i = 0; i < 14; i++) { const r = rng(9997 + i), x = -400 + r() * 1800, y = 1200 + r() * 300; ell(x, y, 40 + r() * 30, 26, { wash: '#5a7a3a', washA: 1, w: 1.4, col: '#2a3a10' }); }
    const A = [20, 1540], B = [470, 1000]; for (const d of [-14, 14]) pencil([[A[0] + d, A[1]], [B[0] + d * 0.5, B[1]]], { w: 5, col: '#4a4a52', pass2: false });
    for (let q = 0; q < 12; q++) { const k = q / 12, x = lerp(A[0], B[0], k), y = lerp(A[1], B[1], k); pencil([[x - 22 * (1 - k * 0.5), y], [x + 22 * (1 - k * 0.5), y]], { w: 4, col: '#5a3a1a', pass2: false }); }
    if (car > 0) { const k = 0.12 + car * 0.3, x = lerp(A[0], B[0], k), y = lerp(A[1], B[1], k); push(x, y, 1.5 - k * 0.5, -0.5, -1);
      const c = poly([[-70, 0], [70, -40], [70, -130], [-70, -90]], { wash: '#e8c040', washA: 1, w: 2.4, col: '#2a1a0a' }); rect(-56, -80, 40, 30, { wash: '#bfe0f0', washA: 1, w: 1.4 }); rect(6, -100, 40, 30, { wash: '#bfe0f0', washA: 1, w: 1.4 }); pencil([[-70, -20], [70, -60]], { w: 6, col: '#a8241e', pass2: false }); pop();
      if (t > EV.kh_fun) note('единственный на Дальнем Востоке', 360, 1760, t, EV.kh_fun, S1.khrush, '#2a1a0a', 34, -0.04); }
  }
  function dream(t) {                                               // облако-мечта с Сан-Франциско
    const k = sm((t - EV.kh_sf + 0.15) / 0.4) * (1 - sm((t - EV.kh_did) / 0.18)); if (k <= 0.01) { if (t > EV.kh_did && t < EV.kh_did + 0.5) { const q = (t - EV.kh_did) / 0.5; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; ell(560 + Math.cos(a) * 300 * (0.6 + q), 800 + Math.sin(a) * 200 * (0.6 + q), 30 * (1 - q), 30 * (1 - q), { wash: '#ffffff', washA: 1 - q, line: false }); } txt('ПУФ!', 560, 800, 120 * (0.6 + q * 0.4), { font: 'Osw', col: '#2a1a0a', a: 1 - q }); } return; }
    push(560, 800, 0.32 + 0.5 * k); const cl = blob([[-400, 120], [-430, -40], [-330, -200], [-120, -270], [120, -280], [330, -200], [430, -40], [400, 120], [200, 220], [-200, 220]], { wash: '#ffffff', washA: 0.97, w: 3, col: '#6a7a8a' });
    ctx.save(); ctx.clip(cl.path); vgrad(-300, 240, ['#7ab8e8', '#f8d8a8'], 1);
    sil([[-400, 220], [-400, 40], [-200, -40], [0, 20], [200, -60], [400, 30], [400, 220]], '#7a9a6a', 1);
    for (let i = 0; i < 12; i++) { const x = -360 + i * 62, y = 30 - Math.abs(Math.sin(i * 0.8)) * 60; rect(x, y - 50, 44, 50, { wash: ['#f0c8d8', '#c8e0f0', '#f8e8b0', '#d8f0c8'][i % 4], washA: 1, w: 1.2, col: '#3a2a2a' }); poly([[x - 4, y - 50], [x + 22, y - 70], [x + 48, y - 50]], { wash: '#8a3a3a', washA: 1, w: 1 }); }
    rect(-400, 110, 800, 120, { wash: '#3a7ab0', washA: 1, line: false });
    for (const px of [-260, 120]) { rect(px - 12, -140, 24, 260, { wash: '#c8402a', washA: 1, w: 1.6, col: '#5a1a0a' }); rect(px - 22, -60, 44, 10, { wash: '#c8402a', washA: 1, line: false }); }
    pencil([[-400, 60], [-260, -130], [-60, 40], [120, -130], [400, 60]], { w: 4, col: '#c8402a', pass2: false }); pencil([[-400, 80], [400, 80]], { w: 10, col: '#c8402a', pass2: false });
    push(240, 150, 1); rect(-70, -70, 140, 70, { wash: '#a8241e', washA: 1, w: 2 }); rect(-60, -60, 120, 30, { wash: '#f8e8b0', washA: 1, w: 1.2 }); for (const wx of [-40, 40]) ell(wx, 4, 12, 12, { wash: '#2a2a2a', washA: 1 }); pop();
    ctx.restore(); txt('Сан-Франциско', 0, -220, 54, { font: 'Hand', col: '#3a4a6a' }); pop();
    for (let i = 0; i < 3; i++) ell(760 + i * 50, 1000 + i * 50, 30 - i * 8, 24 - i * 6, { wash: '#ffffff', washA: 0.95 * k, w: 2, col: '#6a7a8a' });
  }
  function nikita(t) {                                              // Хрущёв: светлый костюм, лысина, шляпа в руке, широкий жест
    const g = t > EV.kh_sf - 0.2 && t < EV.kh_did;
    human(920, 1420, 1.15, t, { body: '#d8d4c8', bodyD: '#8a8678', legs: '#c8c4b8', boots: '#3a2a1a', skin: '#e8b898', face: t > EV.kh_did ? 'shock' : g ? 'grin' : 'smile', look: 0.6, armL: g ? 'up' : 'hold', armR: g ? 'wave' : 'down', seed: 501, flip: -1 });
    push(920, 1420, 1.15, 0, -1); glow(0, -320, 40, 'rgba(255,255,255,1)', 0.5); ell(-26, -296, 12, 8, { wash: '#a8241e', washA: 0.25, line: false }); ell(26, -296, 12, 8, { wash: '#a8241e', washA: 0.25, line: false });
    rect(-40, -224, 80, 70, { wash: '#f4f0e8', washA: 1, line: false }); poly([[-6, -224], [6, -224], [8, -150], [0, -140], [-8, -150]], { wash: '#5a2a3a', washA: 1, line: false }); ell(-30, -200, 7, 7, { wash: '#e8c040', washA: 1, line: false });
    push(-86, -150, 1); ell(0, 0, 40, 14, { wash: '#e8e0c8', washA: 1, w: 1.6 }); blob([[-26, 0], [-22, -34], [22, -34], [26, 0]], { wash: '#e8e0c8', washA: 1, w: 1.6 }); rect(-24, -12, 48, 8, { wash: '#3a3a3a', washA: 1, line: false }); pop();
    pop();
  }
  function fore(t) {                                                // парапет смотровой и скамейка, «Победа»
    rect(560, 1600, 1200, 60, { wash: '#c8c0b0', washA: 1, w: 2, col: '#3a3a3a' }); for (let x = 580; x < 1700; x += 120) rect(x, 1660, 30, 200, { wash: '#b8b0a0', washA: 1, w: 1.6, col: '#3a3a3a' });
    push(960, 1590, 0.9); blob([[-180, 0], [-170, -60], [-100, -110], [60, -110], [140, -60], [190, -40], [190, 0]], { wash: '#6a8a7a', washA: 1, w: 2.4, col: '#1a2a20' }); for (const wx of [-110, 120]) ell(wx, 0, 34, 34, { wash: '#2a2a2a', washA: 1, w: 2 }); rect(-90, -100, 70, 36, { wash: '#bfe0f0', washA: 1, w: 1.4 }); rect(-10, -100, 70, 36, { wash: '#bfe0f0', washA: 1, w: 1.4 }); pop();
  }

  WORLD.khrush = (t, u, cat) => {
    const car = clamp((t - EV.kh_fun + 0.2) / 1.2);
    lay(40, () => sky(t));
    lay(14, () => harbor(t));
    lay(1.4, () => slope(t, t > EV.kh_did ? car : 0));
    lay(1, () => { nikita(t); cat(); });
    lay(0.85, () => fore(t));
    lay(0.95, () => dream(t));
  };
  DIR.khrush = {
    outfit: 'soviet', light: { side: 1, rim: '#ffe8c0' }, grade: ['#8ab0c8', 0.1],
    act: () => [[S0.khrush, 'talk'], [EV.kh_sf - 0.03, 'awe'], [EV.kh_did - 0.03, 'annoyed'], [EV.kh_fun, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 600, y: 1540, s: 1.0, look: t < EV.kh_did ? [0.3, -0.6] : t < EV.kh_fun ? [-0.6, 0.3] : [0, 0.05], handF: t > EV.kh_fun ? [-140, -240] : undefined, point: t > EV.kh_fun ? 1 : undefined, squash: b.squash - (t > EV.kh_did && t < EV.kh_did + 0.25 ? 0.04 : 0) }),
    cam: () => [[S0.khrush, 540, 1060, 0.08], [EV.kh_sf, 560, 980, 0.0], [EV.kh_did, 600, 1120, 0.12, 'x'], [EV.kh_fun, 380, 1320, 0.18], [S1.khrush, 380, 1340, 0.22]]
  };
  // ---------------------------------------------------------------- переход В khrush: штурвал раскручивает кадр
  TRANS_IN.khrush = { a: 0.26, b: 0.36, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 540, cy = 960, rot = k < 0.5 ? Math.pow(k / 0.5, 2) * 4 : -Math.pow(1 - (k - 0.5) / 0.5, 2) * 4;
    drawBuf(k < 0.5 ? A : B, 1 + Math.sin(k * Math.PI) * 0.3, cx, cy, 1, null, 0, 0, rot);
    scr(() => { const a = Math.sin(k * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, cy); ctx.rotate(rot * 1.4);
      for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); pencil([[0, 0], [0, -900]], { w: 46, col: '#6a3a1a', pass2: false }); ell(0, -980, 50, 50, { wash: '#8a5a2a', washA: 1, w: 3 }); }
      pencil(ellPts(0, 0, 820, 820, 0, 0, 80), { w: 60, col: '#7a4a24', pass2: false }); ell(0, 0, 120, 120, { wash: '#c89a3a', washA: 1, w: 4 }); ctx.restore(); });
  } };
})();
