/* 023 — сцена `nikitin`: 1468–1474, Индия, город Бидар. Жаркое бирюзово-оранжевое небо, крепость с куполами и минаретами, пальмы;
   базар: слон с паланкином, верблюд, торговцы под навесами, корзины специй, ткани. Афанасий Никитин (борода, шапка, тетрадь)
   ведёт своего жеребца — его он вёз продавать. На «Никитин» — бирка «АФАНАСИЙ НИКИТИН, ТВЕРЬ»; на «Индии» по небу бежит пунктир
   маршрута Тверь → три моря → Индия; на «Гамы!» справа вплывает призрачная каравелла с биркой «1498 — ОПОЗДАЛ» и табло 4 : 1.
   Переход В сцену — карта: кадр становится пергаментной картой, маленькая ладья проходит пунктиром, в конце открывается Индия. */
(() => {
  EV.nk_name = wtk('s5', 'Никитин');
  EV.nk_india = wtk('s5', 'Индии');
  EV.nk_gama = wtk('s5', 'Гамы!');
  EV.nk_vasko = wtk('s5', 'Васко');
  KEYW.push('Никитин', 'Индии', 'Гамы!');
  SHAKES.push([EV.nk_gama, 0.15, 5]);
  const L = TV.ink;
  function elephant(x, y, s, t, o = {}) {                           // слон сбоку с попоной и паланкином, хобот качается
    push(x, y, s, 0, o.flip || 1); const c = '#8a8890', sw = Math.sin(t * 2) * 0.2;
    for (const [lx, ph] of [[-90, 0], [-50, 1.4], [60, 0.7], [100, 2.1]]) rect(lx - 22, -150 + Math.sin(t * 3 + ph) * 3, 44, 150, { wash: c, washA: 1, w: 2, col: L });
    blob([[-140, -150], [-150, -260], [-60, -320], [80, -320], [150, -260], [150, -150]], { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.25, col: '#3a3a44', ang: 0.6 } });
    blob([[110, -300], [200, -330], [240, -260], [220, -180], [170, -170]], { wash: c, washA: 1, w: 2.2, col: L }); ell(150, -260, 40, 60, { wash: '#a8a4ac', washA: 1, w: 2, col: L });   // голова, ухо
    pencil(spline([[230, -230], [260, -150 + sw * 40], [250, -60], [270 + sw * 30, -30]], false, 10), { w: 22, col: c, pass2: false }); ell(206, -284, 5, 5, { wash: L, washA: 1, line: false });
    pencil([[220, -200], [270, -190]], { w: 6, col: '#f6f0e0', pass2: false });   // бивень
    shape([[-120, -300], [100, -300], [110, -180], [-130, -180]], { wash: TV.red, washA: 1, w: 2, col: L }); for (let k = 0; k < 8; k++) ell(-110 + k * 30, -186, 8, 8, { wash: TV.gold, washA: 1, w: 1, col: L });
    rect(-80, -420, 150, 110, { wash: '#e8b040', washA: 1, w: 2, col: L }); blob([[-96, -420], [-4, -500], [86, -420]], { wash: TV.red, washA: 1, w: 2, col: L });
    human(0, -320, 0.3, t, { body: '#f0e8d8', legs: '#f0e8d8', hat: 'scarf', hatCol: '#f6f0e4', seed: 2400 });
    pop();
  }
  function sky(t) { vgrad(-900, 1250, ['#2a8aa0', '#5ab0b8', '#a8d0c0', '#f0d098', '#f8b060'], 1); glow(880, 300, 500, 'rgba(255,240,180,1)', 0.55); ell(880, 300, 70, 70, { wash: '#fff8d8', washA: 1, w: 1, col: '#e0a050', a: 0.4 });
    rays(880, 300, Math.PI / 2 + 0.3, 1.8, 1600, 'rgba(255,240,190,0.5)', 0.08, 8, t); clouds(t, -460, 3, '#f8f0e0', 23601, 0.4); birds(t, 6, [-100, -200, 1200, 600], 23602, '#2a2018'); }
  function far(t) {                                                 // Бидар: крепость, купола, минареты
    hills(1080, 24, '#c89a6a', 23603, 1);
    rect(-200, 960, 1600, 140, { wash: '#b87a4a', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.2, col: '#5a3a1a', ang: 0.9 } }); for (let k = 0; k < 22; k++) rect(-200 + k * 74, 930, 40, 30, { wash: '#b87a4a', washA: 1, w: 1.6, col: L });
    for (const [x, r] of [[300, 90], [620, 130], [980, 80]]) { rect(x - r, 960 - r * 0.8, r * 2, r * 0.8, { wash: '#e8d4b0', washA: 1, w: 2, col: L }); blob([[x - r, 960 - r * 0.8], [x - r * 0.9, 960 - r * 1.5], [x, 960 - r * 2.1], [x + r * 0.9, 960 - r * 1.5], [x + r, 960 - r * 0.8]], { wash: '#f0e4c8', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.2, col: '#8a6a4a', ang: 1.1 } }); pencil([[x, 960 - r * 2.1], [x, 960 - r * 2.4]], { w: 4, col: TV.gold, pass2: false }); }
    for (const x of [460, 800]) { rect(x - 18, 600, 36, 360, { wash: '#e8d4b0', washA: 1, w: 2, col: L }); blob([[x - 26, 600], [x, 540], [x + 26, 600]], { wash: '#2a8a8a', washA: 1, w: 1.8, col: L }); }
  }
  function palm(x, y, h, t) { pencil(spline([[x, y], [x + 20, y - h * 0.5], [x + 10, y - h]], false, 10), { w: 22, col: '#7a5a3a', pass2: false });
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.5 + Math.sin(t * 2 + k) * 0.06; pencil(spline([[x + 10, y - h], [x + 10 + Math.cos(a) * 110, y - h + Math.sin(a) * 50 - 20], [x + 10 + Math.cos(a) * 200, y - h + 60]], false, 10), { w: 14, col: '#2e7a3a', pass2: false }); } }
  function market(t) {                                              // базар: навесы, слон, верблюд, торговцы, специи
    for (const [x, h] of [[60, 520], [1180, 600], [880, 420]]) palm(x, 1300, h, t);
    for (const [x, c] of [[420, TV.red], [700, '#e8b040'], [980, '#2a8a8a']]) { pencil([[x - 110, 1320], [x - 110, 1170]], { w: 5, col: '#5a3a1e', pass2: false }); pencil([[x + 110, 1320], [x + 110, 1170]], { w: 5, col: '#5a3a1e', pass2: false });
      shape([[x - 130, 1170], [x + 130, 1170], [x + 110, 1130], [x - 110, 1130]], { wash: c, washA: 1, w: 2, col: L }); for (let k = 0; k < 5; k++) ell(x - 80 + k * 40, 1300, 18, 12, { wash: ['#d8602a', '#e8c040', '#8a3a2a', '#c8a050', '#5a8a3a'][k], washA: 1, w: 1.2, col: L }); }
    elephant(780, 1330, 0.6, t, { flip: -1 }); camel(1100, 1330, 0.4, t, { flip: -1 });
    crowd(100, 1200, 1330, 14, t, 23604, { s: 0.34, skin: '#a8724a', cols: ['#f0e8d8', '#d8602a', '#2a8a8a', '#e8b040', '#8a3a5a'] });
  }
  function ground(t) {                                              // площадь: пыль, ковры, кувшины, Никитин с жеребцом
    shape([[-600, 1400], [1800, 1390], [1800, 2400], [-600, 2400]], { wash: '#d8a870', washA: 1, line: false });
    hatch(pathOf([[-600, 1400], [1800, 1390], [1800, 2400], [-600, 2400]]), { x: -200, y: 1400, w: 1500, h: 700 }, { ang: 0.2, gap: 16, w: 1.2, col: '#8a5a2a', a: 0.25 });
    for (const [x, y, c] of [[560, 1760, TV.red], [900, 1800, '#2a6a8a']]) { push(x, y, 1, -0.05); rect(-150, -40, 300, 80, { wash: c, washA: 1, w: 2, col: L }); rect(-120, -24, 240, 48, { line: true, w: 2, col: TV.gold }); for (let k = 0; k < 5; k++) ell(-80 + k * 40, 0, 10, 10, { wash: TV.gold, washA: 1, line: false }); pop(); }   // ковры
    for (const [x, c] of [[400, '#b8622a'], [450, '#8a3a2a'], [1080, '#c88a3a'], [1130, '#b8622a']]) jug(x, 1700, 0.5, c);
    sack(1000, 1690, 0.5, '#e8c070'); crate(300, 1820, 110, 60, { col: '#a8783a' }); barrel(1180, 1820, 0.5);
    human(880, 1560, 0.6, t, { body: '#a8c0d8', legs: '#4a3a2a', hat: 'fur', hatCol: '#5a3a1e', beard: 1, seed: 2410, prop: 'scroll', armR: 'hold', flip: -1, look: [-0.5, -0.3] });   // Никитин
    horse(1080, 1580, 0.5, t, { col: '#3a2416', flip: -1, saddle: 1 });   // жеребец, которого он вёз продавать
    human(520, 1580, 0.52, t, { body: '#f0e8d8', legs: '#f0e8d8', skin: '#a8724a', hat: 'scarf', hatCol: '#e8b040', seed: 2411, armR: 'point', look: [0.4, -0.3] });
    human(640, 1620, 0.5, t, { body: '#d8602a', legs: '#f0e8d8', skin: '#8a5a3a', hat: 'scarf', hatCol: '#f6f0e4', long: 1, seed: 2412, armL: 'hold' });
    for (let k = 0; k < 3; k++) { const x = 700 + k * 60, y = 1880 + Math.sin(t * 3 + k) * 3; ell(x, y, 22, 14, { wash: '#c8a8a0', washA: 1, w: 1.4, col: L }); ell(x + 18, y - 12, 9, 8, { wash: '#c8a8a0', washA: 1, w: 1, col: L }); }   // павлины-курицы
    if (t > EV.nk_name) { const q = popK(t, EV.nk_name, 0.3); push(880, 1250, q, -0.04); rect(-190, -46, 380, 92, { wash: '#16120c', washA: 0.86, w: 2.4, col: TV.gold }); txt('АФАНАСИЙ НИКИТИН', 0, -8, 32, { col: '#ffe8b8', font: 'Osw' }); txt('купец из Твери', 0, 30, 28, { col: '#f0d8a8', font: 'Hand' }); pop(); }
  }
  function front(t) {                                               // передний план: листья пальмы и цветы
    for (let k = 0; k < 4; k++) { const a = 0.4 + k * 0.35 + Math.sin(t * 1.5 + k) * 0.04; pencil(spline([[1300, 2000], [1300 - Math.cos(a) * 220, 2000 - Math.sin(a) * 420], [1300 - Math.cos(a) * 420, 2000 - Math.sin(a) * 600]], false, 12), { w: 34, col: '#1e5a2a', pass2: false }); }
    for (let i = 0; i < 6; i++) ell(-20 + i * 40, 1980 - (i % 2) * 30, 22, 18, { wash: i % 2 ? '#e84a6a' : '#f0a040', washA: 1, w: 1.6, col: L });
  }
  function hud(t) {
    if (t > EV.nk_india - 0.05) { const q = sm((t - EV.nk_india + 0.05) / 0.6), P = [[200, 930], [340, 890], [450, 990], [600, 950], [740, 1030], [880, 990]];   // маршрут
      const n = Math.max(2, Math.ceil(P.length * q)); const S2 = P.slice(0, n); for (let i = 0; i < S2.length - 1; i++) for (let k = 0; k < 6; k++) { const a = S2[i], b = S2[i + 1], u = k / 6; pencil([[lerp(a[0], b[0], u), lerp(a[1], b[1], u)], [lerp(a[0], b[0], u + 0.08), lerp(a[1], b[1], u + 0.08)]], { w: 6, col: '#7a1a12', pass2: false }); }
      txt('ТВЕРЬ', 200, 900, 34, { col: '#16120c', font: 'Osw' }); if (q > 0.95) { txt('ИНДИЯ', 880, 960, 38, { col: '#7a1a12', font: 'Osw' }); glow(880, 990, 50, 'rgba(255,220,120,1)', 0.7); } }
    if (t > EV.nk_vasko - 0.05) { const q = sm((t - EV.nk_vasko + 0.05) / 0.5); push(lerp(1200, 900, q), 1180, 0.7); ctx.globalAlpha = 0.6 * q; pencil([[-80, 0], [80, 0]], { w: 4, col: '#e8e0d0', pass2: false });
      blob([[-110, 0], [110, 0], [80, 50], [-90, 50]], { wash: '#e8e0d0', washA: 0.6, w: 2, col: '#5a6a7a' }); for (const mx of [-40, 30]) { pencil([[mx, 0], [mx, -150]], { w: 3, col: '#5a6a7a', pass2: false }); blob([[mx, -140], [mx + 60, -120], [mx + 60, -40], [mx, -30]], { wash: '#f6f0e4', washA: 0.6, w: 1.6, col: '#5a6a7a' }); } ctx.globalAlpha = 1;
      if (t > EV.nk_gama) { push(0, -220, popK(t, EV.nk_gama, 0.3), 0.08); rect(-150, -34, 300, 68, { wash: '#7a1a1a', washA: 0.95, w: 2.4, col: '#ffd8c8' }); txt('1498 — ОПОЗДАЛ', 0, 10, 34, { col: '#ffe8d8', font: 'Osw' }); pop(); } pop(); }
    const s = t > EV.nk_gama - 0.05; scoreHud(t, s ? 4 : 3, 1, s ? { t0: EV.nk_gama - 0.05, side: -1 } : {});
  }
  WORLD.nikitin = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(4, () => market(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    lay(0.55, () => motes(30, [-200, 1700, 1300, 2100], '#e8c090', t, 23605, { sp: -10, vx: 80, sz: 3, a: 0.5, wob: 20 }));
    motes(40, [-200, 300, 1300, 1600], '#fff0c8', t, 23606, { sp: 8, vx: 60, sz: 2.4, a: 0.5, wob: 20 });   // жаркая пыль
    haze('#f0c080', 0.06);
  };
  DIR.nikitin = {
    outfit: 'colono', light: { side: 1, rim: '#fff0b0' }, grade: ['#e0a050', 0.12],
    act: () => [[S0.nikitin, 'talk'], [EV.nk_name, 'proud'], [EV.nk_india, 'awe'], [EV.nk_gama, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1590, s: 1.0, look: t < EV.nk_india ? [0.8, -0.2] : [0.5, -0.8], tailUp: t > EV.nk_name, sweat: 1,
      point: t > EV.nk_name && t < EV.nk_india ? 1 : undefined, hand: t > EV.nk_name && t < EV.nk_india ? [260, -260] : undefined }),
    cam: () => [[S0.nikitin, 600, 1000, 0.14], [EV.nk_name, 680, 1040, 0.08, 'x'], [EV.nk_india, 620, 920, 0.06], [EV.nk_gama, 660, 960, 0.1, 'x'], [S1.nikitin, 640, 960, 0.12]],
    hud
  };
  TRANS_IN.nikitin = { a: 0.15, b: 0.45, fx(k, t, A, B) {           // карта: кадр — пергамент, ладья идёт пунктиром Тверь → Индия, там открывается окно
    const P = [[220, 520], [380, 760], [300, 1000], [560, 1180], [760, 1380], [820, 1500]], q = sm(clamp(k / 0.7)), op = sm(clamp((k - 0.6) / 0.4));
    drawBuf(A, 1, 540, 960, 1 - sm(clamp(k / 0.2)));
    scr(() => { ctx.save(); ctx.globalAlpha = 1 - op; ctx.fillStyle = '#efe0b8'; ctx.fillRect(0, 0, W, H); ctx.restore();
      if (op < 1) { ctx.save(); ctx.globalAlpha = 1 - op; ell(380, 1100, 300, 220, { wash: '#a8c8d8', washA: 1, w: 2, col: '#5a4a2a' }); ell(820, 1600, 260, 160, { wash: '#a8c8d8', washA: 1, w: 2, col: '#5a4a2a' }); txt('ХВАЛЫНСКОЕ', 380, 1100, 34, { col: '#3a4a5a', font: 'Hand' }); txt('ИНДИЙСКОЕ', 820, 1600, 34, { col: '#3a4a5a', font: 'Hand' });
        const n = Math.floor(q * (P.length - 1) * 8); for (let i = 0; i < n; i += 2) { const j = Math.floor(i / 8), u = (i % 8) / 8, a = P[j], b = P[j + 1]; pencil([[lerp(a[0], b[0], u), lerp(a[1], b[1], u)], [lerp(a[0], b[0], u + 0.1), lerp(a[1], b[1], u + 0.1)]], { w: 7, col: '#7a1a12', pass2: false }); }
        const j = Math.min(P.length - 2, Math.floor(q * (P.length - 1))), u = q * (P.length - 1) - j; ladya(lerp(P[j][0], P[j + 1][0], u), lerp(P[j][1], P[j + 1][1], u), 0.3, t, { crew: false });
        txt('ТВЕРЬ', 220, 480, 44, { col: '#16120c', font: 'Osw' }); ctx.restore(); }
      if (op > 0) inCircle(820, 1500, op * 2400, () => drawBuf(B)); });
  } };
})();
