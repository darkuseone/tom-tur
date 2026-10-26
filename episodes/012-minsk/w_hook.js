/* 012 — сцена `hook`: 2026, площадь Свободы. Белая ратуша с часами, справа на холме Свято-Духов собор, вокруг сталинские дома.
   На столе перед Томом два торта: большой «МИНСК 1067» и поменьше «МОСКВА 1147». На «старше» торт Минска выезжает вперёд, на «моложе»
   на ратушу и дома шлёпаются ценники-наклейки «НОВОЕ», на «Почему?» над площадью светится «?». Переход в туннель — пламя свечи торта
   становится стрелкой часов и раскручивает портал. Последний кадр кнопки — ратуша крупно (петля). */
(() => {
  EV.hk_older = wtk('h1', 'старше');
  EV.hk_young = wtk('h1', 'моложе.');
  EV.hk_why = wtk('h1', 'Почему?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('Москвы', 'моложе.', 'Почему?');

  function sky(t) { vgrad(-900, 1000, ['#5a8ac8', '#a8c8e8', '#f2e4d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function square(t) {
    stalin(-460, 1060, 360, 300, t, { key: 12200 }); stalin(1140, 1060, 360, 320, t, { key: 12201 });
    spirit(1000, 980, 0.5, t); ratusha(520, 1060, 0.78, t);
    const g = rect(-500, 1060, 2100, 80, { wash: '#c8c0b0', washA: 1, w: 2, col: '#3a3630' });
    for (let i = 0; i < 6; i++) { const x = ((i * 250 + t * (30 + i * 6)) % 1700) - 200; human(x, 1100, 0.34, t, { body: ['#c83a3a', '#3a5a8a', '#e8d8b0', '#3a6a3a', '#8a3a6a', '#2a2a2a'][i], legs: '#2a2a3a', hair: '#3a2a1a', face: 'smile', prop: i % 2 ? 'phone' : undefined, seed: 12210 + i, flip: i % 2 ? -1 : 1 }); }
    if (t > EV.hk_young) { const R = rng(12220); [[520, 820], [-300, 900], [1300, 880], [1000, 640]].forEach(([x, y], i) => { const k = popK(t, EV.hk_young + i * 0.12, 0.3); push(x, y, k, (R() - 0.5) * 0.4); rect(-80, -30, 160, 60, { wash: '#ffd24a', washA: 1, w: 3, col: '#6a4a08' }); txt('НОВОЕ', 0, 2, 34, { font: 'Osw', col: '#a8201e' }); pop(); }); }
    if (t > EV.hk_why) { const k = popK(t, EV.hk_why, 0.35); push(760, 700, 0.6 + 0.4 * k); txt('?', 0, 0, 240, { font: 'Osw', col: '#ffd24a' }); glow(0, 0, 200, 'rgba(255,220,120,1)', 0.35 * k); pop(); }
  }
  function table(t) {                                                  // стол с двумя тортами
    const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8b0a2', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1470; y < 2400; y += 40) rect(x + (Math.floor(y / 40) % 2) * 35, y, 66, 36, { wash: '#c8c0b2', washA: 0.6, w: 1, col: '#6a645a', a: 0.4 }); ctx.restore();
    rect(560, 1320, 520, 30, { wash: '#8a5a3a', washA: 1, w: 2.4, col: '#2a1a08' }); for (const lx of [600, 1040]) rect(lx - 10, 1350, 20, 130, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1a08' });
    const big = 1 + 0.2 * popK(t, EV.hk_older, 0.35) * (t > EV.hk_older ? 1 : 0);
    cake(940, 1322, 0.62, t, '1147', '#a85a8a'); txt('МОСКВА', 940, 1380, 26, { font: 'Osw', col: '#f6e7c8' });
    cake(700, 1322, 0.78 * big, t, '1067', '#3a8a5a'); txt('МИНСК', 700, 1380, 30, { font: 'Osw', col: '#ffd24a' });
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => square(t));
    lay(1, () => { table(t); cat(); });
    lay(0.7, () => motes(20, [0, 300, W, 1700], '#fff2c8', t, 12230, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieM', light: { side: 1, rim: '#ffe0c0' }, grade: ['#c0a090', 0.1],
    act: () => [[0, 'shock'], [EV.hk_older, 'proud'], [EV.hk_young - 0.03, 'suspicious'], [EV.hk_why, 'sideeye'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1470, s: 1.06, look: t < EV.hk_young ? [0.6, 0.2] : t < LS('h2') ? [0.3, -0.5] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_older - 0.1 && t < EV.hk_young ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_older - 0.1 && t < EV.hk_young ? [190, -250] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 560, 1000, 0.06], [EV.hk_older, 600, 1060, 0.1], [EV.hk_young, 560, 980, 0.04], [LS('h2'), 540, 1100, 0.16], [S1.hook, 560, 1080, 0.24]]
  };

  // ---------------------------------------------------------------- переход В туннель: пламя свечи-стрелка раскручивает портал
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, q * 0.6);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.5 - k)); }
    scr(() => { push(cx, cy, 1, -Math.PI / 2 + q * 7); blob([[-18, 0], [0, -600], [18, 0], [0, 40]], { wash: '#ffd24a', washA: 1, w: 2, col: '#c86a10' }); pop(); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
