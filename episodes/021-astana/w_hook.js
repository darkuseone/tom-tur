/* 021 — сцена `hook`: 2026, золотой вечер, левый берег Астаны. В центре-справа — Байтерек с золотым шаром, за ним силуэты башен,
   Акорда с голубым куполом, слева вдали — Хан Шатыр; степной ветер гонит ковыль. С 0,0 с камера падает к шару (движение), на «Пять»
   из-за Байтерека вылетают пять табличек-имён (АКМОЛИНСК, ЦЕЛИНОГРАД, АКМОЛА, АСТАНА, НУР-СУЛТАН) и кружат вокруг шара, на «столицы!»
   они выстраиваются лесенкой, на «Астана»? в шаре вспыхивает «?». Переход в туннель — порыв степного ветра закручивает таблички в воронку.
   Петля: планы отдаются через window.AQ, кнопка заканчивается тем же ракурсом. */
(() => {
  EV.hk_five = wtk('h1', 'Пять');
  EV.hk_cap = wtk('h1', 'столицы!');
  EV.hk_what = wtk('h1', 'значит');
  EV.hk_q = wtk('h1', 'Астана');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.02, 0.3, 9], [EV.hk_q, 0.25, 6]);
  KEYW.push('Пять', '«Астана»?');
  const NAMES = ['АКМОЛИНСК', 'ЦЕЛИНОГРАД', 'АКМОЛА', 'АСТАНА', 'НУР-СУЛТАН'];
  const COLS = ['#6a4a2a', '#b8302a', '#3a5a3a', AZ.turq, '#2a3a6a'];

  const AQ = window.AQ = {};
  AQ.sky = t => {
    vgrad(-900, 1300, ['#0e2a4a', '#1e5a7a', '#5a8a9a', '#e8a85a', '#ffd88a'], 1);
    ell(160, 980, 80, 80, { wash: '#fff0b0', washA: 1, w: 1.4, col: '#c88a3a', a: 0.6 }); glow(160, 980, 520, 'rgba(255,200,110,1)', 0.5);
    clouds(t, -560, 7, '#e8a87a', 21011, 0.55); clouds(t, 200, 4, '#f2c08a', 21012, 0.4);
    birds(t, 7, [-100, -200, 1200, 500], 21013, '#1a1a2a');
  };
  AQ.far = t => { skylineA(1180, t, { col: '#2e4a66', colL: '#f0b070', on: 0.5, dome: '#3ab0d8' }); khanShatyr(-120, 1190, 0.55, t, { lit: 1, col: '#c8d8d8' }); };
  AQ.mid = (t, q = 1) => {                                        // бульвар Нуржол: Байтерек, фонтаны, ели, флаг
    baiterek(700, 1300, 0.7, t, { glow: 0.35 + 0.25 * q });
    for (const fx of [480, 920]) { ell(fx, 1300, 120, 18, { wash: '#4a8aa8', washA: 1, w: 1.6, col: AZ.ink }); for (let k = 0; k < 7; k++) { const h = 50 + Math.sin(t * 6 + k) * 10; pencil([[fx - 60 + k * 20, 1296], [fx - 60 + k * 20, 1296 - h]], { w: 3, col: '#e8f6ff', a: 0.7, pass2: false }); } }
    for (let k = 0; k < 10; k++) { const x = -80 + k * 130; if (x > 560 && x < 840) continue; const h = 90 + (k % 3) * 20; poly([[x - 30, 1300], [x, 1300 - h], [x + 30, 1300]], { wash: '#1e3a2a', washA: 1, w: 1.4, col: AZ.ink, a: 0.6 }); }
    pencil([[1010, 1300], [1010, 1000]], { w: 5, col: '#c8c4bc', pass2: false });
    const wv = t * 5; const F = []; for (let q2 = 0; q2 <= 10; q2++) F.push([1010 + q2 * 14, 1010 + Math.sin(wv + q2 * 0.6) * 8]); const F2 = F.map(([x, y]) => [x, y + 80]).reverse();
    shape(F.concat(F2), { wash: AZ.sky, washA: 1, w: 1.6, col: AZ.ink }); ell(1080, 1050 + Math.sin(wv + 3) * 6, 16, 16, { wash: AZ.gold, washA: 1, line: false });
  };
  AQ.ground = (t, crowdOn = 1) => {                               // гранитная площадь с плиткой, скамьи, люди
    const L = AZ.ink; rect(-700, 1300, 2500, 900, { wash: '#a8978a', washA: 1, line: false });
    for (let k = 0; k < 18; k++) { const y = 1316 + k * k * 3.4; pencil([[-700, y], [1800, y]], { w: 1.2, col: L, a: 0.2, pass2: false }); }
    for (let k = -12; k < 14; k++) pencil([[540 + k * 50, 1300], [540 + k * 190, 2000]], { w: 1.2, col: L, a: 0.15, pass2: false });
    for (let k = -6; k <= 6; k++) { const x = 540 + k * 120, d = (Math.abs(k) % 2); ell(x, 1420 + d * 10, 40, 10, { wash: '#8a7a6a', washA: 0.6, line: false }); }
    for (const lx of [40, 1060]) lamppost(lx, 1360, 340, t, { lamp: 0.75 });
    push(880, 1400, 0.9); rect(-90, -40, 180, 14, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); rect(-90, -80, 180, 12, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) pencil([[sd * 80, -26], [sd * 80, 0]], { w: 5, col: '#2a2a30', pass2: false }); pop();
    for (const [fx, fy] of [[-60, 1460], [760, 1470]]) { ell(fx, fy, 130, 28, { wash: '#4a3a2a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 14; q++) ell(fx - 110 + q * 17, fy - 12 - (q % 3) * 6, 9, 9, { wash: ['#e8a83a', '#f2f2f2', '#1e9aa0'][q % 3], washA: 1, w: 1, col: L, a: 0.5 }); }
    if (!crowdOn) return;
    kman(450, 1330, 0.4, t, { body: '#2a5a6a', hat: 'scarf', hatCol: '#e8c86a', seed: 61, armR: 'hold', prop: 'phone' });
    human(520, 1332, 0.34, t, { body: '#c8302a', legs: '#2a2a30', seed: 62, armL: 'wave' });
    human(600, 1336, 0.42, t, { body: '#2a2a30', legs: '#1a1a1e', seed: 63, prop: 'phone', armR: 'up' });
    kman(820, 1340, 0.44, t, { body: '#3a2a1a', hat: 'fur', hatCol: '#6a4a2a', beard: 1, seed: 64, prop: 'stick', armR: 'hold', flip: -1 });
    human(900, 1342, 0.42, t, { body: '#6a3a6a', legs: '#2a2a2a', hat: 'scarf', hatCol: '#f2ead8', seed: 65, long: 1, flip: -1 });
    human(1000, 1346, 0.46, t, { body: '#1e6a5a', legs: '#2a2a2a', hat: 'cap', hatCol: '#1a1a1a', seed: 66, armL: 'point', flip: -1 });
    human(160, 1336, 0.4, t, { body: '#4a4a6a', legs: '#2a2a2a', seed: 67, armR: 'swing' });
    human(260, 1338, 0.36, t, { body: '#e8a83a', legs: '#2a2a30', seed: 68, armL: 'hold' });
    for (let k = 0; k < 6; k++) { const x = 360 + k * 46 + Math.sin(t * 3 + k) * 6, y = 1540 + (k % 3) * 14; ell(x, y, 12, 8, { wash: '#6a6a78', washA: 1, w: 1.2, col: L }); ell(x + 10, y - 8, 5, 5, { wash: '#5a5a68', washA: 1, w: 1, col: L }); }   // голуби
    push(1150, 1450, 0.9); rect(-70, -90, 140, 80, { wash: '#f2ead8', washA: 1, w: 1.6, col: L }); txt('БАЛМҰЗДАҚ', 0, -50, 17, { col: '#1e6a8a', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 46, -6, 14, 14, { wash: '#2a2a2a', washA: 1, w: 1.4, col: L }); poly([[-80, -90], [0, -140], [80, -90]], { wash: AZ.turq, washA: 1, w: 1.6, col: L }); pop();   // тележка мороженого
  };
  AQ.front = t => {                                                // передний план: ветка карагача слева, край флагштока-фонаря справа
    const L = '#0e0a06';
    pencil(spline([[-140, 260], [40, 340], [180, 320], [290, 380]], false, 10), { w: 22, col: '#2a1e14', pass2: false });
    for (let k = 0; k < 9; k++) { const x = -70 + k * 44, y = 290 + Math.sin(k) * 50 + Math.sin(t * 2.4 + k) * 9; blob([[x, y], [x + 30, y - 34], [x + 64, y - 6], [x + 50, y + 34], [x + 10, y + 30]], { wash: k % 2 ? '#3a4a1e' : '#5a6a24', washA: 0.95, w: 1.4, col: L, a: 0.6 }); }
    pencil([[1260, 2100], [1240, 700]], { w: 30, col: '#1e1e24', pass2: false }); ell(1200, 700, 34, 40, { wash: '#fff2c8', washA: 1, w: 2, col: '#3a3020' }); glow(1200, 700, 200, 'rgba(255,210,140,1)', 0.55);
  };
  function cards(t) {                                              // пять табличек-имён кружат вокруг шара Байтерека
    if (t < EV.hk_five - 0.05) return; const out = sm((t - EV.hk_wind - 0.2) / 0.5);
    NAMES.forEach((n, i) => {
      const k = sm((t - EV.hk_five - i * 0.12) / 0.45); if (k <= 0) return;
      const a = t * 1.6 + i * 1.2566, orbit = [700 + Math.cos(a) * 300, 650 + Math.sin(a) * 110];
      const line = [560 + (i % 2) * 110, 700 + i * 92];       // лесенка после «столицы!»
      const q = sm((t - EV.hk_cap) / 0.4) * (1 - sm((t - EV.hk_wind) / 0.3));
      let x = lerp(lerp(700, orbit[0], k), line[0], q), y = lerp(lerp(650, orbit[1], k), line[1], q);
      x += out * (600 + i * 120); y -= out * 200;
      const rot = (1 - q) * Math.sin(a) * 0.3 + Math.sin(t * 4 + i) * 0.04, sc = 0.55 + 0.25 * q + 0.15 * Math.sin(a) * (1 - q);
      push(x, y, sc, rot); rect(-210, -46, 420, 92, { wash: COLS[i], washA: 1, w: 3, col: AZ.ink }); pencil([[-198, -34], [198, -34], [198, 34], [-198, 34], [-198, -34]], { w: 2, col: AZ.gold, a: 0.8, pass2: false });
      txt(n, 0, 4, 56, { col: '#f6ecd6', font: 'Osw' }); txt(String(i + 1), -180, -60, 34, { col: AZ.gold, font: 'Osw' }); pop();
    });
    if (t > EV.hk_q) { const q = popK(t, EV.hk_q, 0.4) * (1 - sm((t - EV.hk_wind) / 0.4)); push(700, 1300 - 930 * 0.7, 0.8); txt('?', 0, 30, 170 * q, { col: '#14100a', font: 'Osw', a: 0.9 }); pop(); glow(700, 1300 - 930 * 0.7, 220, 'rgba(255,220,120,1)', 0.5 * q); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(40, () => AQ.sky(t));
    lay(18, () => AQ.far(t));
    lay(7, () => AQ.mid(t));
    lay(4, () => cards(t));
    lay(1, () => { AQ.ground(t); cat(); });
    lay(0.62, () => AQ.front(t));
    windLines(t, 0.35 + 0.5 * sm((t - EV.hk_wind) / 0.5), [-100, 600, 1200, 1500], 21014);
    motes(34, [-200, 300, 1300, 1500], '#ffe0a0', t, 21015, { sp: 30, vx: 120, sz: 2.6, a: 0.5, wob: 18 });
    haze('#f0a860', 0.05);
  };
  DIR.hook = {
    outfit: 'hoodieA', light: { side: -1, rim: '#ffc88a' }, grade: ['#c08040', 0.12],
    act: () => [[0, 'shock'], [EV.hk_five, 'awe'], [EV.hk_cap, 'shock'], [EV.hk_what - 0.05, 'suspicious'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1490, s: 1.08, look: t < EV.hk_five ? [0.6, -0.5] : t < LS('h2') ? [0.7, -0.4] : [0.2, 0], tilt: t < 0.35 ? -0.07 : 0, squash: b.squash + (t < 0.2 ? 0.07 : 0),
      point: t > EV.hk_cap && t < LS('h2') ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_cap && t < LS('h2') ? [210, -300] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 700, 860, 0.34], [EV.hk_five, 640, 900, 0.12], [EV.hk_q, 640, 930, 0.18, 'x'], [LS('h2'), 540, 1060, 0.12], [S1.hook, 480, 1120, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {       // порыв степного ветра: кадр сдувает вправо, воронка ветра раскрывает туннель часов
    smear(A, 260 * sm(k), -30 * k, 5); const R = sm(clamp((k - 0.25) / 0.75)) * 1500;
    scr(() => {
      if (R > 0) { inCircle(540, 900, R, () => drawBuf(B)); }
      const r = rng(21016); for (let i = 0; i < 26; i++) { const a0 = r() * 6.283 + k * 8, rr = 120 + r() * 700 * (1 - k * 0.5), P = []; for (let q = 0; q <= 10; q++) { const aa = a0 + q * 0.12; P.push([540 + Math.cos(aa) * (rr + q * 12), 900 + Math.sin(aa) * (rr + q * 12) * 1.2]); }
        pencil(P, { w: 3 + r() * 4, col: i % 3 ? '#fff4d8' : AZ.gold, a: 0.8 * Math.sin(Math.PI * k), pass2: false, gap: false, taper: true }); }
    });
  } };
})();
