/* 029 — сцена `button`: тот же зал ООН (window.TQ). На «какой хозяин» над трибуной по одной вылетают печати всех хозяев Крыма
   (НЕАНДЕРТАЛЬЦЫ · ГРЕКИ · ХАНСТВО · ИМПЕРИЯ · УССР · УКРАИНА) — Том перебирает их лапой; на «Пиши город» Том подмигивает в камеру,
   «ПОДПИШИСЬ» выскакивает на этой фразе и висит до конца (одна концовка, хвост ≤ 0,8 с того же кадра). */
(() => {
  EV.bt_who = wtk('x1', 'хозяин');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('удивил?', 'отмотаем!');
  const ST = [['НЕАНДЕРТАЛЬЦЫ', '#5a3a1a'], ['ГРЕКИ', '#1a4a9a'], ['ХАНСТВО', '#1a7a4a'], ['ИМПЕРИЯ', '#8a1a1a'], ['УССР', '#a8201a'], ['УКРАИНА', KR.ua]];
  WORLD.button = (t, u, cat) => { const Q = window.TQ;
    lay(30, () => Q.wall(t)); lay(10, () => Q.rows(t)); lay(3.6, () => { push(560, 1070, 1); rect(-330, -400, 660, 420, { wash: '#0e1418', washA: 1, w: 4, col: '#8a8a8a' }); txt('ХОЗЯЕВА КРЫМА', 0, -360, 36, { col: '#ffe08a', font: 'Osw' }); pop(); }); lay(2.6, () => Q.press(t)); lay(2.2, () => Q.desks(t)); lay(1, () => { Q.podium(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(1.2, () => ST.forEach(([n, c], i) => { const t0 = S0.button + 0.15 + i * 0.3; if (t > t0) { const col = i % 2, row = Math.floor(i / 2); stamp(410 + col * 290, 800 + row * 95, 0.4, n, c, (i % 2 ? 0.06 : -0.08) + Math.sin(t * 2 + i) * 0.02, popK(t, t0, 0.25), { size: 56 }); } }));
    lay(2, () => motes(16, [-100, 600, 1200, 1500], '#fff4d8', t, 5840, { sp: 2, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.button = {
    outfit: 'hoodieKR', light: { side: -1, rim: '#ffe8b0' }, grade: ['#1a2a4a', 0.06],
    act: () => [[S0.button, 'suspicious'], [EV.bt_who, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1612, s: 0.95, look: t > EV.endcard ? [0, 0] : [0.7, -0.7], hand: t > EV.endcard ? [170, -360] : [180, -460], point: true, tailUp: true }),
    cam: () => [[S0.button, 560, 980, 0.12], [EV.bt_who, 580, 960, 0.08], [EV.endcard - 0.1, 540, 1000, 0.08], [EV.endcard + 0.2, 520, 850, 0.04, 'x'], [DUR, 520, 850, 0.05]]
  };
  // бейдж «ХОЗЯИН №n» во всех эпохах (повторный хук) — дописываем к hud сцен
  Object.keys(OWNERS).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); ownerBadge(t, n); }; });
})();
