/* 017 — сцена `hook`: 2026, вид с Трокадеро: Эйфелева башня за Сеной, речной трамвайчик, османовские дома, туристы с
   багетами и селфи. Первый кадр — верхушка башни крупно (петля из кнопки). На «разобрать» на башню шлёпается красная бирка
   «НА СНОС · 1909», на «спасло» — вопросы. Переход в туннель — стрелка-флюгер на шпиле раскручивает портал. */
(() => {
  EV.hk_down = wtk('h1', 'разобрать.');
  EV.hk_save = wtk('h1', 'спасло?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('разобрать.', 'спасло?');

  function sky(t) { vgrad(-900, 1000, ['#5a8ad0', '#b0d0ea', '#f6e8d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function city(t) {
    for (const [x, w, h] of [[-560, 220, 300], [-320, 200, 280], [1000, 220, 300], [1240, 220, 280]]) facade(x, 1080, w, h, t);
    eiffel(560, 1080, 0.72, t, { antenna: true, tag: t > EV.hk_down ? 'НА СНОС · 1909' : '' });
    for (let i = 0; i < 6; i++) { const x = -400 + i * 260; pencil([[x, 1080], [x, 1000]], { w: 6, col: '#4a3a2a' }); ell(x, 980, 50, 40, { wash: '#4a8a4a', washA: 1, w: 1.6, col: '#1a3a1a' }); }
  }
  function river(t) { seine(1120, t, { h: 140 }); boatRiver(1500 - (t * 60) % 2400, 1210, 0.5, t); }
  function terrace(t) {
    rect(-600, 1290, 2300, 180, { wash: '#d8ccb4', washA: 1, w: 2, col: '#5a4a34' }); for (let x = -560; x < 1700; x += 50) pencil([[x, 1290], [x, 1240]], { w: 4, col: '#3a3a3a', pass2: false }); pencil([[-600, 1240], [1700, 1240]], { w: 4, col: '#3a3a3a', pass2: false });
    for (let i = 0; i < 6; i++) { const x = -160 + i * 260 + Math.sin(t + i) * 10; human(x, 1340, 0.44, t, { body: ['#2a2a2e', '#e8e4dc', '#c83a5a', '#3a5a8a', '#f0c030', '#7a5a3a'][i], legs: '#2a3a5a', hair: ['#3a2a1a', '#e8c070', '#1a1410'][i % 3], hat: i === 1 ? 'bun' : i === 4 ? 'cap' : undefined, hatCol: '#c83a3a', face: 'smile', prop: i % 2 ? 'phone' : undefined, armR: i === 2 ? 'up' : 'hold', seed: 17120 + i, flip: i % 2 ? 1 : -1 }); if (i === 3) pencil([[x + 20, 1240], [x + 50, 1200]], { w: 8, col: '#d8a860', pass2: false }); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => city(t));
    lay(6, () => river(t));
    lay(3, () => terrace(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#c8bca4', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 80) for (let y = 1480; y < 2400; y += 50) rect(x + (Math.floor(y / 50) % 2) * 40, y, 78, 48, { wash: '#b8ac94', washA: 0.6, w: 1, col: '#6a5a44', a: 0.4 }); ctx.restore(); cat(); });
    lay(0.7, () => { motes(20, [0, 300, W, 1700], '#fff2c8', t, 17130, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 });
      if (t > EV.hk_save) { const r = rng(17140); for (let i = 0; i < 4; i++) { const k = popK(t, EV.hk_save + i * 0.12, 0.3); txt('?', 200 + r() * 700, 900 + r() * 400, (90 + r() * 70) * k, { font: 'Osw', col: '#ffd24a', a: 0.9 }); } } });
  };
  DIR.hook = {
    outfit: 'hoodiePA', light: { side: 1, rim: '#ffe0c0' }, grade: ['#c0a090', 0.08],
    act: () => [[0, 'shock'], [EV.hk_down, 'scared'], [EV.hk_save, 'suspicious'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 320, y: 1480, s: 1.06, look: t < EV.hk_save ? [0.5, -0.7] : t < LS('h2') ? [-0.2, -0.3] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_down - 0.1 && t < LS('h2') ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_down - 0.1 && t < LS('h2') ? [170, -420] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 600, 700, 0.18], [EV.hk_down, 580, 860, 0.08], [EV.hk_save, 560, 980, 0.02], [LS('h2'), 520, 1140, 0.12], [S1.hook, 480, 1120, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {      // шпиль-стрелка раскручивает портал
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, -q * 0.6);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8b84a', '#fff1c8', '#3a5aa8'], clamp(1.5 - k)); }
    scr(() => { push(cx, cy, 1, -q * 8); for (const sd of [-1, 1]) line([[0, 0], [sd * 40, -200], [sd * 10, -520]], { w: 8, col: PA.iron }); pop(); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
