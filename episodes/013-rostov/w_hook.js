/* 013 — сцена `hook`: 2026, золотой час, набережная Дона. За рекой — высокий правый берег: собор с золотыми главами, дома,
   Ворошиловский мост; по Дону идёт теплоход; чайки. На набережной — фонари, гуляющие, табличка-стела «РОСТОВ-НА-ДОНУ» (сквозная нить).
   На «имя» слово «РОСТОВ» на стеле подсвечивается и обводится; на «другого» над рекой проступает призрачная вторая табличка
   «РОСТОВ … ?» (далеко, туманом); на «Угадаешь» — вопросительные знаки. Переход в туннель — часы на столбе-фонаре раскручивают портал.
   Последний кадр кнопки — эта же стела крупно (петля). */
(() => {
  EV.hk_name = wtk('h1', 'имя');
  EV.hk_other = wtk('h1', 'другого');
  EV.hk_guess = wtk('h1', 'Угадаешь,');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('имя', 'другого', 'Угадаешь,');

  function sky(t) { vgrad(-900, 1000, ['#4a7ab8', '#e8a868', '#f6d8a8'], 1); ell(-120, 760, 110, 110, { wash: '#ffe2a0', washA: 1, line: false }); glow(-120, 760, 380, 'rgba(255,200,120,1)', 0.45);
    for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#fbe8d0', washA: 0.85, line: false }); }
    for (let i = 0; i < 6; i++) { const x = ((t * 60 + i * 260) % 1700) - 300, y = 330 + (i % 3) * 70 + Math.sin(t * 2 + i) * 14, f = Math.sin(t * 9 + i) * 10; pencil([[x - 24, y - f], [x, y], [x + 24, y - f]], { w: 3, col: '#2a2a32', pass2: false }); } }
  function bank(t) {                                                   // правый берег: склон, дома, собор
    const g = shape([[-600, 980], [-600, 780], [-200, 740], [300, 760], [800, 720], [1700, 760], [1700, 980]], { wash: '#8a9a5a', washA: 1, w: 2, col: '#2a3418' }); hatch(g.path, g.bb, { gap: 10, a: 0.15, col: '#4a5a2a', ang: -0.5, w: 1.2 });
    [[-560, 140, 200, '#e8d8c0'], [-400, 120, 260, '#d8c0a0'], [-260, 160, 180, '#f0e0c8'], [560, 150, 230, '#e0c8a8'], [720, 130, 280, '#c8b8a0'], [860, 170, 200, '#ecdcc4'], [1040, 140, 300, '#d8c4a8'], [1190, 170, 220, '#e8d4b8']].forEach(([x, w, h, c], i) => cityBlock(x, 800, w, h, c, t, { seed: 13100 + i, on: 0.3, wa: 0.5 }));
    cathedral(200, 790, 0.7, t);
  }
  function river(t) {                                                  // Дон, мост, теплоход
    don(980, t, { h: 340, dusk: 1 });
    bridge(900, 1000, 0.62, t);
    const bx = 1500 - ((t * 40) % 2200); push(bx, 1180, 0.5); shape([[-300, 0], [300, 0], [340, -60], [-320, -60]], { wash: '#f2f2f0', washA: 1, w: 2.4, col: '#2a2a32' }); rect(-220, -140, 380, 80, { wash: '#f2f2f0', washA: 1, w: 2, col: '#2a2a32' }); for (let q = 0; q < 8; q++) rect(-200 + q * 44, -124, 26, 30, { wash: '#4a6a8a', washA: 1, w: 1.2, col: '#2a2a32' }); rect(-40, -190, 60, 50, { wash: RS.red, washA: 1, w: 2, col: '#3a0a0a' }); pencil([[-300, -30], [340, -30]], { w: 4, col: '#1e4a8a', pass2: false }); pop();
  }
  function embank(t) {                                                 // набережная: парапет, фонари, гуляющие
    rect(-600, 1310, 2300, 60, { wash: '#c8beac', washA: 1, w: 2.4, col: '#3a3630' }); for (let x = -560; x < 1700; x += 60) rect(x, 1286, 30, 24, { wash: '#b8ae9c', washA: 1, w: 1.4, col: '#3a3630' });
    for (const lx of [-300, 140, 1180, 1600]) { pencil([[lx, 1310], [lx, 1010]], { w: 8, col: '#2a2a32' }); ell(lx, 1000, 26, 18, { wash: '#ffe6a0', washA: 1, w: 2, col: '#2a2a32' }); glow(lx, 1000, 70, 'rgba(255,220,140,1)', 0.4); }
    for (let i = 0; i < 6; i++) { const x = ((i * 300 + t * (24 + i * 5)) % 2000) - 400; human(x, 1380, 0.4, t, { body: ['#c83a3a', '#3a5a8a', '#e8d8b0', '#3a6a3a', '#c8902a', '#2a2a2a'][i], legs: '#2a2a3a', hair: ['#3a2a1a', '#8a5a2a', '#1a1410'][i % 3], face: 'smile', prop: i % 2 ? 'phone' : undefined, seed: 13120 + i, flip: i % 2 ? 1 : -1 }); }
  }
  function sign(t) {                                                   // стела «РОСТОВ-НА-ДОНУ»: подсветка «РОСТОВ», призрак второго
    stele(760, 1440, 0.95, t, ['РОСТОВ-НА-ДОНУ', 'ОСНОВАН · 1749'], { kind: 'modern', w: 560, h: 170, size: 56 });
    if (t > EV.hk_name) { const k = popK(t, EV.hk_name, 0.3); push(760, 1440, 0.95); ctx.save(); ctx.globalAlpha = k; pencil(ellPts(-142, -152, 124, 50, -0.04, 0.08, 40), { w: 6, col: '#ffd24a', pass2: false }); glow(-142, -152, 124, 'rgba(255,220,120,1)', 0.35); ctx.restore(); pop(); }
  }
  function ghost(t) {                                                  // призрак второй таблички — «а где второй Ростов?»
    if (t < EV.hk_other) return; const k = sm((t - EV.hk_other) / 0.6);
    ctx.save(); ctx.globalAlpha = 0.55 * k; stele(260, 900, 0.62, t, ['РОСТОВ …', '???'], { kind: 'wood', w: 460, h: 150, rot: 0.05 }); ctx.restore(); glow(260, 780, 260, 'rgba(255,240,210,1)', 0.25 * k);
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => bank(t));
    lay(7, () => { river(t); ghost(t); });
    lay(3, () => embank(t));
    lay(1, () => { const g = shape([[-500, 1370], [1600, 1370], [1600, 2400], [-500, 2400]], { wash: '#b8ac98', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 80) for (let y = 1380; y < 2400; y += 46) rect(x + (Math.floor(y / 46) % 2) * 40, y, 78, 44, { wash: (x + y) % 3 ? '#c8bca8' : '#b0a490', washA: 0.7, w: 1, col: '#5a5448', a: 0.4 }); ctx.restore(); sign(t); cat(); });
    lay(0.7, () => { motes(20, [0, 300, W, 1700], '#fff2c8', t, 13130, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 });
      if (t > EV.hk_guess) { const r = rng(13140); for (let i = 0; i < 4; i++) { const k = popK(t, EV.hk_guess + i * 0.12, 0.3); txt('?', 180 + r() * 720, 700 + r() * 500, (90 + r() * 80) * k, { font: 'Osw', col: '#ffd24a', a: 0.9 }); } } });
  };
  DIR.hook = {
    outfit: 'hoodieR', light: { side: -1, rim: '#ffd0a0' }, grade: ['#c09070', 0.1],
    act: () => [[0, 'shock'], [EV.hk_name, 'suspicious'], [EV.hk_other, 'sideeye'], [EV.hk_guess, 'grin'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1480, s: 1.06, look: t < EV.hk_other ? [0.7, -0.1] : t < LS('h2') ? [-0.2, -0.4] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_name - 0.1 && t < EV.hk_guess ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_name - 0.1 && t < EV.hk_guess ? [200, -250] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 640, 1200, 0.16], [EV.hk_name, 620, 1180, 0.12], [EV.hk_other, 540, 1060, 0.02], [EV.hk_guess, 560, 1080, 0.04], [LS('h2'), 520, 1160, 0.12], [S1.hook, 480, 1120, 0.2]]
  };

  // ---------------------------------------------------------------- переход В туннель: стрелки часов крутятся НАЗАД, спираль лет
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, -q * 0.6);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#c8902a', '#fff1c8', '#3a7a9a'], clamp(1.5 - k)); }
    scr(() => { for (const [L, w, sp] of [[520, 18, -9], [380, 26, -3]]) { push(cx, cy, 1, -Math.PI / 2 + q * sp); rect(-w / 2, -L, w, L, { wash: '#2a2420', washA: 1, w: 2, col: '#000' }); pop(); }
      pencil(Array.from({ length: 60 }, (_, i) => { const a = -i * 0.22 - q * 6, r = 40 + i * 14 * q; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }), { w: 5, col: '#ffd24a', a: 0.8 * (1 - q * 0.5), pass2: false });
      ell(cx, cy, 26, 26, { wash: RS.gold, washA: 1, w: 2, col: '#6a4a08' }); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
