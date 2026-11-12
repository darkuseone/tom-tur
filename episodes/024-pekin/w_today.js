/* 024 — сцена `today`: 2026, тот же зал музея днём (планы window.BQ из хука): тёплый свет из круглого окна, посетители с телефонами,
   экскурсовод с флажком, ребёнок. В витрине — гипсовая копия черепа. На «никто не знает» Том разводит лапами, над залом всплывают
   таблички-версии «КИТАЙ? ЯПОНИЯ? США? ДНО МОРЯ?»; на «гипсовые» Том стучит по черепу — «тук-тук», сыплется гипсовая крошка, штамп «КОПИЯ»;
   на «ищут» день гаснет в вечер, по залу шарит луч прожектора, над витриной проступает призрак настоящего черепа и уплывает в окно.
   Главный свет — солнце из окна (лучи на полу) → прожектор витрины. Переход В сцену — поднимается бумажный фонарь. */
(() => {
  EV.td_shrug = wtk('t1', 'никто');
  EV.td_tags = wtk('t1', 'знает.');
  EV.td_museum = wtk('t1', 'музее');
  EV.td_knock = wtk('t1', 'гипсовые');
  EV.td_copy = wtk('t1', 'копии.');
  EV.td_search = wtk('t1', 'ищут');
  EV.td_ghost = wtk('t1', 'сих');
  KEYW.push('знает.', 'гипсовые', 'пор.');
  SHAKES.push([EV.td_copy, 0.2, 7]);
  const L = BJ.ink, Q = () => window.BQ, eve = t => sm((t - EV.td_search) / 0.9), day = t => 1 - eve(t) * 0.85;
  function people(t) {                                              // посетители у витрины
    const d = day(t), P = (x, y, s, c, sd, o = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a36', seed: sd }, o));
    P(560, 1500, 0.66, PPL.now[1], 2640, { prop: 'phone', armR: 'hold', look: [0.5, -0.1] }); P(930, 1505, 0.7, PPL.now[0], 2641, { flip: -1, hat: 'cap', hatCol: '#e8e0d0', look: [-0.6, -0.1] });
    P(1040, 1500, 0.62, PPL.now[4], 2642, { flip: -1, prop: 'phone', armR: 'hold', hat: 'bun' }); P(1150, 1508, 0.46, PPL.now[2], 2643, { flip: -1, hat: 'cap', hatCol: '#d84a3a' });
    P(120, 1500, 0.66, PPL.now[5], 2644, { hat: 'straw', hatCol: '#e8d8a0', look: [0.7, -0.2] }); P(20, 1508, 0.6, PPL.now[3], 2645, { long: 1, hat: 'bun' });
    P(1240, 1512, 0.72, '#b8281a', 2646, { flip: -1, prop: 'stick', armR: 'hold' }); blob([[1196, 1260], [1250, 1270], [1196, 1300]], { wash: BJ.gold, washA: 1, w: 1.6, col: L });
    crowd(380, 1000, 1470, 7, t, 2647, { s: 0.52, phones: 0.6, cols: PPL.now });
    for (const [x, len] of [[560, 300], [930, 320], [1040, 280], [120, 300]]) castShadow(x, 1502, 80, len, 0.5, 0.3 * d);
  }
  function board(t) {                                               // стенд «Где искали»: карта с булавками и нитками, вопросы; на «ищут» по нему бежит луч
    const e = eve(t); push(250, 1500, 1, -0.02); for (const k of [-90, 90]) pencil([[k, 0], [k * 0.8, -150]], { w: 8, col: BJ.woodD, pass2: false });
    rect(-150, -470, 300, 330, { wash: '#e8dcc0', washA: 1, w: 3, col: BJ.woodD, shade: { gap: 14, a: 0.12, col: '#8a7a50', ang: 0.4 } }); rect(-150, -470, 300, 50, { wash: BJ.lac, washA: 1, w: 2, col: L }); txt('ГДЕ ИСКАЛИ', 0, -444, 30, { col: BJ.goldL, font: 'Osw' });
    blob([[-120, -330], [-70, -390], [10, -380], [40, -320], [0, -250], [-80, -240]], { wash: '#c8b888', washA: 1, w: 1.8, col: '#6a5a3a' }); blob([[60, -370], [80, -400], [100, -340], [78, -300]], { wash: '#c8b888', washA: 1, w: 1.6, col: '#6a5a3a' }); blob([[-30, -210], [60, -230], [120, -200], [100, -160], [-10, -165]], { wash: '#c8b888', washA: 1, w: 1.8, col: '#6a5a3a' });
    const pins = [[-30, -320, 'Пекин'], [20, -290, 'порт'], [84, -350, 'Токио'], [60, -196, 'США']]; pins.forEach(([x, y, s], i) => { ell(x, y, 8, 8, { wash: '#c8281a', washA: 1, w: 1.4, col: L }); txt(s, x + 4, y - 20, 20, { col: '#3a1a10', font: 'Hand' }); if (i) pencil([[pins[i - 1][0], pins[i - 1][1]], [x, y]], { w: 2, col: '#c8281a', a: 0.8, pass2: false }); txt('?', x + 26, y + 6, 30 + 6 * Math.sin(t * 5 + i), { col: '#b8281a', font: 'Osw' }); });
    if (e > 0) glow(Math.sin(t * 4) * 100, -310, 150, 'rgba(255,240,190,1)', 0.5 * e); pop();
  }
  function cart(t) {                                                // сувенирная тележка: гипсовые черепки, магниты, ценник (у края кадра)
    push(1010, 1640, 1.1); for (const k of [-90, 90]) { ell(k, -22, 24, 24, { line: true, w: 5, col: L }); ell(k, -22, 6, 6, { wash: L, washA: 1, line: false }); }
    rect(-140, -150, 280, 110, { wash: BJ.red, washA: 1, w: 2.8, col: L, shade: { gap: 9, a: 0.22, col: BJ.redD, ang: 1.57 } }); rect(-152, -166, 304, 20, { wash: BJ.gold, washA: 1, w: 2, col: L }); hz('纪念品', 0, -96, 56, BJ.goldL, 0.95);
    for (let i = 0; i < 4; i++) skullPM(-104 + i * 68, -196, 0.2, { kind: 'plaster' }); for (const k of [-140, 140]) pencil([[k, -160], [k, -330]], { w: 5, col: BJ.woodD, pass2: false }); const wv = Math.sin(t * 2) * 4; blob([[-170, -330], [170, -330], [150, -286 + wv], [-150, -286 - wv]], { wash: BJ.jade, washA: 1, w: 2.2, col: L }); txt('СУВЕНИР · ГИПС', 0, -306, 26, { col: '#0c2a22', font: 'Osw' });
    push(96, -236, 1, 0.1); rect(-40, -24, 80, 48, { wash: '#fff6d8', washA: 1, w: 1.8, col: L }); txt('30 ¥', 0, 4, 30, { col: '#a81a10', font: 'Osw' }); pop(); pop();
  }
  function flashes(t) {                                             // вспышки камер посетителей
    for (let i = 0; i < 4; i++) { const ph = (t * 0.9 + i * 0.37) % 1; if (ph < 0.08) { const x = [560, 930, 1040, 700][i], y = [1330, 1320, 1340, 1380][i]; glow(x, y, 190, 'rgba(255,255,255,1)', 0.9 * (1 - ph / 0.08)); for (let k = 0; k < 6; k++) pencil([[x, y], [x + Math.cos(k * 1.05) * 60, y + Math.sin(k * 1.05) * 60]], { w: 2.4, col: '#ffffff', a: 0.8, pass2: false }); } }
  }
  function hud(t) {
    if (t > EV.td_tags - 0.05 && t < EV.td_museum + 0.3) [['КИТАЙ?', 300, 760, -0.06], ['ЯПОНИЯ?', 790, 720, 0.05], ['США?', 560, 860, -0.02], ['ДНО МОРЯ?', 760, 980, 0.04]].forEach(([s, x, y, r], i) => { const q = popK(t, EV.td_tags - 0.05 + i * 0.09, 0.28), a = clamp((EV.td_museum + 0.3 - t) / 0.25); if (q <= 0) return; push(x, y, q, r); rect(-s.length * 17 - 24, -36, s.length * 34 + 48, 72, { wash: '#14100c', washA: 0.9 * a, w: 3, col: '#ffd24a', a }); txt(s, 0, 4, 48, { col: '#ffe9a8', font: 'Osw', a }); pop(); });
    if (t > EV.td_knock && t < EV.td_copy + 0.3) for (let k = 0; k < 2; k++) txt('тук', 850 + k * 60, 1040 - k * 50, 46, { col: '#fff0c8', font: 'Hand', rot: 0.1, a: clamp((EV.td_copy + 0.3 - t) / 0.3) * (t > EV.td_knock + k * 0.2 ? 1 : 0) });
    stampBJ(790, 900, 0.9, 0.07, 'КОПИЯ', 'ГИПС', '#ffffff', t, EV.td_copy);
    if (t > EV.td_search + 0.3) note('оригиналы — где-то там…', 560, 700, t, EV.td_search + 0.3, S1.today + 1, '#eaf0ff', 50, -0.04);
  }
  WORLD.today = (t, u, cat) => {
    const B = Q(), d = day(t), e = eve(t), gh = t > EV.td_ghost ? sm((t - EV.td_ghost) / 0.5) : 0, sweep = e > 0 ? Math.sin((t - EV.td_search) * 4) * 0.34 : 0;
    lay(40, () => B.sky(t, d));
    lay(22, () => B.far(t, d));
    lay(11, () => { B.mid(t, d); depthFog(lerpC('#1a1440', '#f0e0c0', d), 0.14); });
    lay(6, () => { B.wall(t, d); for (let i = 0; i < 5; i++) shaft(420 + i * 70, 560, 120, 1300, -0.38 + i * 0.05, 'rgba(255,236,180,1)', 0.16 * d); });
    lay(3.2, () => { B.cols(t, d, { lan: 0.35 + 0.65 * e }); board(t); people(t); flashes(t); });
    lay(1.7, () => { B.showcase(t, { spot: 0.35 + 0.65 * e, ang: sweep, noGlass: 1, l2: 'копия · гипс', inside: () => {
        const kn = t > EV.td_knock && t < EV.td_copy + 0.2 ? Math.sin((t - EV.td_knock) * 30) * 0.04 : 0; skullPM(B.CX - 12, B.CY, 0.8, { kind: 'plaster', rot: kn });
        if (t > EV.td_knock) { const r = rng(2648); for (let i = 0; i < 9; i++) { const u = clamp((t - EV.td_knock - r() * 0.5) / 0.6); if (u > 0 && u < 1) ell(B.CX - 60 + r() * 120, B.CY + 20 + u * 90, 5, 4, { wash: '#f4f0e6', washA: 1 - u, line: false }); } }
        if (gh > 0) skullPM(B.CX - 12 - gh * 120, B.CY - 170 - gh * 260, 0.8 - gh * 0.25, { kind: 'ghost', a: 0.85 * (1 - gh * 0.5) }); } });
      moodDark(B.CX, 1100, 420 + 600 * d, 1500, '#0a0620', 0.2 + 0.4 * e); });
    lay(1, () => { B.floor(t, d * 0.8); lightPool(520, 1700, 620, 170, 'rgba(255,230,170,1)', 0.4 * d); castShadow(430, 1574, 190, 420, 0.6, 0.4); cart(t); castShadow(1010, 1640, 260, 300, 0.6, 0.35); cat(); });
    lay(0.62, () => B.front(t, d));
    lay(2.4, () => motes(30, [200, 430, 1100, 1450], '#fff4d0', t, 2649, { sp: 6, sz: 2.2, a: 0.6, wob: 14, add: 1 }));
    lay(0.8, () => motes(12, [-100, 500, 1200, 1900], '#ffe8b8', t, 2650, { sp: 10, sz: 7, a: 0.22, wob: 30, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieBJ', light: { side: -1, rim: '#fff0c0' }, grade: ['#c8a860', 0.08],
    act: () => [[S0.today, 'talk'], [EV.td_shrug, 'annoyed'], [EV.td_museum, 'sideeye'], [EV.td_knock, 'smug'], [EV.td_copy, 'laugh'], [EV.td_search, 'suspicious'], [EV.td_ghost, 'awe']],
    pose: (t, u, b) => { const sh = t > EV.td_shrug && t < EV.td_museum, kn = t > EV.td_knock - 0.15 && t < EV.td_copy + 0.25, kk = kn ? Math.abs(Math.sin((t - EV.td_knock) * 15)) * 26 : 0;
      return Object.assign(b, { x: 430, y: 1574, s: 1.04, look: sh ? [0, -0.2] : t > EV.td_ghost ? [0.3, -0.9] : t > EV.td_search ? [0.5 + Math.sin(t * 4) * 0.4, -0.5] : [0.85, -0.2],
        hand: sh ? [170, -300] : kn ? [262 - kk, -400 + kk * 0.5] : undefined, handF: sh ? [-170, -300] : undefined, tilt: sh ? 0.07 : 0, tailUp: t > EV.td_ghost }); },
    cam: () => [[S0.today, 520, 980, 0.04], [EV.td_tags, 560, 940, 0.0], [EV.td_museum, 640, 1060, 0.16], [EV.td_copy, 700, 1100, 0.28], [EV.td_copy + 0.2, 640, 1060, 0.16, 'x'], [EV.td_search, 600, 1000, 0.08], [S1.today, 600, 900, 0.14]],
    hud
  };
  TRANS_IN.today = { a: 0.22, b: 0.3, fx(k, t, A, B) {              // бумажный фонарь поднимается снизу вверх, под ним — музей
    const y = lerp(H + 600, -700, sm(k)); drawBuf(A);
    scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, H * 2); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore(); lantern(540 + Math.sin(k * 5) * 50, y, 8.5, t, 1, 4, { cord: 0, ch: '答' }); });
  } };
})();
