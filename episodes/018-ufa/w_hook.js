/* 018 — сцена `hook`: 2026, «Уфа-Арена»: лёд, трибуны в зелёном, табло, на борту висит свитер «САЛАВАТ», шайба летит в ворота.
   Первый кадр — свитер и шайба крупно (петля из кнопки). На «хоккейный» шайба влетает в сетку, сирена, трибуны ликуют;
   на «кто» над свитером встаёт силуэт-вопрос всадника. Переход в туннель — шайба раскручивает портал. */
(() => {
  EV.hk_hock = wtk('h1', 'хоккейный');
  EV.hk_who = wtk('h1', 'кто');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('хоккейный', 'кто');

  function arena(t) { vgrad(-900, 1000, ['#141a2a', '#2a3450', '#4a5a7a'], 1); for (let q = 0; q < 8; q++) glow(-300 + q * 260, 300, 120, 'rgba(255,250,230,1)', 0.35); rect(320, 640, 440, 140, { wash: '#0a0a12', washA: 1, w: 3, col: '#000' }); txt('САЛАВАТ  3 : 2', 540, 730, 54, { font: 'Osw', col: '#ffd24a' }); stands(t, { cheer: t > EV.hk_hock }); }
  function ice(t) {
    rink(t);
    const k = clamp((t - EV.hk_hock + 0.5) / 0.5); puck(lerp(300, 1240, k), lerp(1400, 1300, k) - Math.sin(k * Math.PI) * 60, 0.7);
    for (let i = 0; i < 2; i++) { const x = 760 + i * 220 + Math.sin(t * 2 + i) * 20; human(x, 1360, 0.5, t, { body: i ? '#f2f2f2' : UF.green, legs: '#1a1a1e', hair: '#3a2210', hat: 'cap', hatCol: i ? '#f2f2f2' : UF.green, face: t > EV.hk_hock && !i ? 'smile' : 'calm', armR: t > EV.hk_hock && !i ? 'up' : 'hold', armL: 'hold', prop: 'stick', seed: 18110 + i, flip: -1 }); }
    jersey(860, 1110, 0.62, t, { rot: 0.04, num: '1' });
    if (t > EV.hk_who) { const k2 = sm((t - EV.hk_who) / 0.6); ctx.save(); ctx.globalAlpha = 0.55 * k2; ctx.filter = 'brightness(0.25)'; salavatStatue(1010, 860, 0.34, t); ctx.filter = 'none'; ctx.restore(); txt('?', 860, 700, 200 * k2, { font: 'Osw', col: '#ffd24a', a: k2 }); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(20, () => arena(t));
    lay(3, () => ice(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#d8e6ee', washA: 1, w: 1, col: '#000', a: 0.2 }); hatch(g.path, g.bb, { gap: 14, a: 0.1, col: '#8aa8b8', ang: 0.2, w: 1 }); cat(); });
    lay(0.7, () => { if (t > EV.hk_hock && t < EV.hk_hock + 1.5) { const r = rng(18120); for (let i = 0; i < 40; i++) { const x = r() * 1300 - 100, y = ((t - EV.hk_hock) * (300 + r() * 200) + r() * 400) % 1600; rect(x, y, 12, 8, { wash: [UF.green, '#f2f2f2', UF.gold][i % 3], washA: 1, w: 0, col: '#000' }); } } });
  };
  DIR.hook = {
    outfit: 'hoodieUFA', light: { side: 1, rim: '#d8e8ff' }, grade: ['#6a7a9a', 0.08],
    act: () => [[0, 'shock'], [EV.hk_hock, 'laugh'], [EV.hk_who, 'suspicious'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 320, y: 1480, s: 1.06, look: t < EV.hk_who ? [0.6, -0.2] : t < LS('h2') ? [0.5, -0.5] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_who - 0.1 && t < LS('h2') ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_who - 0.1 && t < LS('h2') ? [200, -300] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 820, 1120, 0.2], [EV.hk_hock, 640, 1140, 0.06], [EV.hk_who, 680, 1040, 0.08], [LS('h2'), 520, 1140, 0.12], [S1.hook, 480, 1120, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {      // шайба крутится и раскручивает портал
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, q * 0.8);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#2a7a4a', '#fff1c8', '#e8b84a'], clamp(1.5 - k)); }
    scr(() => { push(cx, cy, 1 + q * 2, q * 9); puck(0, 0, 1.4); pop(); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
