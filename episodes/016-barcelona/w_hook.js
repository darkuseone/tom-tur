/* 016 — сцена `hook`: 2026, площадь у Саграды Фамилии. Собор с кранами (центральная башня с крестом уже стоит, апостольские —
   ещё в лесах), пальмы, туристы с телефонами и селфи-палками, лоток с мороженым. Первый кадр — башни с кранами крупно (петля).
   На «Саграду» камера отъезжает, на «сорок» сверху падает табло-счётчик «144 ГОДА СТРОЙКИ», на «долго» Том зевает-сердится, краны
   скрипят. Переход в туннель — стрела крана поворачивается и заворачивает кадр в портал. */
(() => {
  EV.hk_sag = wtk('h1', 'Саграду');
  EV.hk_144 = wtk('h1', 'сорок');
  EV.hk_long = wtk('h1', 'долго?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('Саграду', 'сорок', 'долго?');

  function sky(t) { vgrad(-900, 1000, ['#4a8ad8', '#a8d0f0', '#f6e8d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (let i = 0; i < 5; i++) { const x = ((t * 50 + i * 300) % 1700) - 300, y = 300 + (i % 3) * 60, f = Math.sin(t * 9 + i) * 8; pencil([[x - 20, y - f], [x, y], [x + 20, y - f]], { w: 3, col: '#2a2a32', pass2: false }); } }
  function square(t) {                                                 // дома Эшампле, пальмы, туристы
    for (let k = 0; k < 4; k++) { const x = k < 2 ? -520 + k * 200 : 1100 + (k - 2) * 200; rect(x, 1140 - 340, 180, 340, { wash: ['#e8d0b0', '#f0dcc0', '#d8c4a8', '#ecd8bc'][k], washA: 1, w: 2, col: '#4a3a2a' }); for (let j = 0; j < 4; j++) for (let q = 0; q < 2; q++) { rect(x + 30 + q * 70, 830 + j * 76, 40, 54, { wash: '#4a6a8a', washA: 1, w: 1.4, col: '#1a1a1a' }); pencil([[x + 24 + q * 70, 886 + j * 76], [x + 76 + q * 70, 886 + j * 76]], { w: 3, col: '#2a2a2a', pass2: false }); } }
    for (const [x, h] of [[-160, 440], [1040, 480], [1300, 420]]) palm(x, 1160, h, t);
  }
  function tourists(t) {
    rect(-600, 1180, 2300, 290, { wash: '#d8c8a8', washA: 1, w: 2, col: '#5a4a32' }); for (let x = -560; x < 1700; x += 80) pencil([[x, 1180], [x - 40, 1470]], { w: 1.2, col: '#a8987a', a: 0.5, pass2: false });
    for (let i = 0; i < 7; i++) { const x = -200 + i * 230 + Math.sin(t + i) * 12; human(x, 1300 + (i % 2) * 30, 0.44, t, { body: ['#e83a5a', '#3a8ac8', '#f0c030', '#2a2a2a', '#e8e4dc', '#3a7a4a', '#c8603a'][i], legs: ['#2a3a5a', '#c8b088', '#2a2a2a'][i % 3], hair: ['#3a2a1a', '#e8c070', '#1a1410'][i % 3], hat: i === 3 ? 'cap' : i === 5 ? 'straw' : undefined, hatCol: '#e8e4dc', face: 'smile', prop: 'phone', armR: i % 2 ? 'up' : 'point', seed: 16120 + i, flip: i % 2 ? 1 : -1 }); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => sagrada(560, 1140, 0.62, t, { done: 0.95, cranes: true }));
    lay(6, () => square(t));
    lay(3, () => tourists(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#c8b898', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 80) for (let y = 1480; y < 2400; y += 80) { rect(x, y, 78, 78, { wash: '#b8a888', washA: 0.6, w: 1, col: '#6a5a44', a: 0.4 }); ell(x + 39, y + 39, 18, 18, { wash: '#a89878', washA: 0.5, w: 1, col: '#6a5a44', a: 0.3 }); } ctx.restore(); cat(); });
    lay(0.7, () => motes(20, [0, 300, W, 1700], '#fff2c8', t, 16130, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieBCN', light: { side: 1, rim: '#ffe0c0' }, grade: ['#c0a080', 0.08],
    act: () => [[0, 'shock'], [EV.hk_sag, 'awe'], [EV.hk_144, 'shock'], [EV.hk_long, 'annoyed'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 320, y: 1480, s: 1.06, look: t < EV.hk_long ? [0.5, -0.7] : t < LS('h2') ? [-0.2, -0.3] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > EV.hk_sag - 0.1 && t < EV.hk_long ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_sag - 0.1 && t < EV.hk_long ? [170, -420] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 600, 760, 0.16], [EV.hk_sag, 580, 900, 0.06], [EV.hk_144, 560, 980, 0.02], [EV.hk_long, 560, 1040, 0.04], [LS('h2'), 520, 1140, 0.12], [S1.hook, 480, 1120, 0.2]],
    hud: t => { if (t > EV.hk_144 && t < LS('h2') + 0.3) { const k = popK(t, EV.hk_144, 0.35), n = Math.round(1882 + 144 * clamp((t - EV.hk_144) / 0.9)); push(640, 820, k, -0.03); rect(-230, -80, 460, 160, { wash: '#1a1a1e', washA: 0.95, w: 3, col: '#000' }); txt('1882 → ' + n, 0, -24, 40, { font: 'Osw', col: '#f2ece0' }); txt('144 ГОДА СТРОЙКИ', 0, 36, 40, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {      // стрела крана разворачивается и заворачивает кадр в портал
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, q * 0.8);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8b830', '#fff1c8', '#2a8a8a'], clamp(1.5 - k)); }
    scr(() => { push(cx, cy, 1, q * 7); pencil([[-60, 0], [700, 0]], { w: 22, col: '#e8b830', pass2: false }); for (let i = 0; i < 14; i++) pencil([[i * 50, -10], [i * 50 + 25, 10]], { w: 3, col: '#8a6a10', pass2: false }); pencil([[600, 0], [600, 200]], { w: 3, col: '#2a2a2a', pass2: false }); pop(); glow(cx, cy, 160, 'rgba(255,220,140,1)', 0.8); });
  } };
})();
