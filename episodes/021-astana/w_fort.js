/* 021 — сцена `fort`: лето 1830, брод Караоткель на Ишиме. Закатная степь, янтарное небо. На ближнем берегу казаки Шубина рубят
   и ставят частокол, растёт деревянная воротная башня с пушкой; по броду идёт караван верблюдов, на том берегу аул — юрты с дымом,
   табун коней. На «Казаки» топоры бьют по брёвнам (щепки), на «Ишиме» караван входит в воду (брызги), на «крепость» над воротами
   поднимается башня; на «Акмолинск» казак прибивает доску «АКМОЛИНСК» и всплывает бирка «ИМЯ № 1».
   Переход В сцену — пыльный вихрь степи: бурый смерч проносится через кадр. */
(() => {
  EV.ft_kaz = wtk('s6', 'Казаки');
  EV.ft_ish = wtk('s6', 'Ишиме');
  EV.ft_fort = wtk('s6', 'крепость.');
  EV.ft_one = wtk('s6', 'один');
  EV.ft_name = wtk('s6', 'Акмолинск.');
  KEYW.push('крепость.', 'Акмолинск.');
  SHAKES.push([EV.ft_kaz, 0.18, 5], [EV.ft_name + 0.05, 0.2, 6]);

  function sky(t) {
    vgrad(-900, 1300, ['#2a3a6a', '#5a6a9a', '#c88a6a', '#f2b060', '#ffe0a0'], 1);
    ell(820, 1000, 90, 90, { wash: '#fff0b0', washA: 1, w: 1.4, col: '#c88a3a', a: 0.6 }); glow(820, 1000, 560, 'rgba(255,190,100,1)', 0.55); rays(820, 1000, -Math.PI / 2, 2.4, 1400, 'rgba(255,210,140,0.6)', 0.1, 8, t);
    clouds(t, -560, 7, '#d88a7a', 21071, 0.6); clouds(t, 300, 4, '#f2b080', 21072, 0.45); birds(t, 9, [-100, -250, 1200, 450], 21073, '#2a1a20');
  }
  function farBank(t) {                                            // тот берег: аул, юрты, табун, дым
    hills(1080, 40, '#8a6a5a', 21074, 1);
    for (const [x, s, sm2] of [[60, 0.36, 1], [200, 0.3, 0], [880, 0.34, 1], [1010, 0.28, 0], [1140, 0.32, 1]]) yurt(x, 1110, s, t, { smoke: sm2, felt: '#efe2c8' });
    for (let k = 0; k < 7; k++) horse(320 + k * 60 + Math.sin(t + k) * 6, 1112, 0.16, t, { col: ['#5a3a2a', '#8a5a3a', '#2a1a14'][k % 3], flip: k % 2 ? -1 : 1 });
    for (let k = 0; k < 3; k++) kman(700 + k * 40, 1110, 0.18, t, { body: ['#5a2a3a', '#2a4a5a', '#6a5a2a'][k], seed: 131 + k });
  }
  function river(t) {                                              // Ишим и брод: караван верблюдов в воде, брызги
    ishim(1110, 1230, t, { top: '#c88a6a', bot: '#4a3a4a', glint: '#ffe0b0' });
    const q = clamp((t - EV.ft_ish + 0.3) / 3);
    for (let k = 0; k < 4; k++) { const x = lerp(1000, 360, q) + k * 130, y = 1210; camel(x, y, 0.34, t, { walk: 1, flip: -1, load: k % 2 ? '#b8302a' : '#2a6a8a' });
      for (let i = 0; i < 6; i++) { const r = rng(hsh(FRAME, k, i)); ell(x - 20 + r() * 60, y - 6 - r() * 20, 4, 4, { wash: '#f2e8d8', washA: 0.8, line: false }); } }
    kman(lerp(1000, 360, q) + 560, 1200, 0.34, t, { body: '#6a3a2a', hat: 'fur', hatCol: '#3a2a1a', seed: 135, prop: 'stick', armR: 'hold', flip: -1 });
  }
  function fort(t) {                                               // ближний берег: частокол, башня-ворота, пушка, казаки за работой
    const L = AZ.ink, up = sm((t - EV.ft_fort) / 0.6);
    steppeGround(1290, t, { top: '#c89848', bot: '#6a4a1e', tufts: 12, seed: 21075 });
    palisade(840, 1500, 1300, 280, t, { col: '#8a6a42', seed: 21076 });
    push(880, 1300, 1); const tw = 260 + 200 * up;                                  // воротная башня
    for (const sd of [-1, 1]) { const p = rect(sd * 120 - 30, -tw, 60, tw, { wash: '#7a5a3a', washA: 1, w: 2.4, col: L }); hatch(p.path, p.bb, { gap: 12, a: 0.3, col: '#3a2410', ang: 0, w: 1.2 }); }
    rect(-150, -tw - 80, 300, 90, { wash: '#8a6a42', washA: 1, w: 2.4, col: L }); poly([[-180, -tw - 80], [0, -tw - 200], [180, -tw - 80]], { wash: '#5a3a22', washA: 1, w: 2.4, col: L });
    rect(-90, -200, 180, 200, { wash: '#4a3020', washA: 1, w: 2.4, col: L }); pencil([[0, -200], [0, 0]], { w: 3, col: L, pass2: false });
    pencil([[150, -tw - 160], [150, -tw - 330]], { w: 5, col: '#4a3020', pass2: false }); const F = []; for (let k = 0; k <= 8; k++) F.push([150 + k * 14, -tw - 320 + Math.sin(t * 6 + k * 0.7) * 6]); shape(F.concat(F.map(([x, y]) => [x, y + 50]).reverse()), { wash: '#d8a83a', washA: 1, w: 1.6, col: L });
    if (t > EV.ft_name - 0.1) { const q = popK(t, EV.ft_name - 0.1, 0.3); push(0, -tw - 30, q); rect(-140, -32, 280, 64, { wash: '#e8d0a0', washA: 1, w: 2.4, col: L }); txt('АКМОЛИНСК', 0, 4, 40, { col: '#3a2410', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 124, 0, 5, 5, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }
    pop();
    cannon(740, 1340, 0.6, t, { flip: -1 });
    // казаки: рубят, несут бревно, забивают кол
    const chop = Math.sin(t * 9) > 0 ? 'up' : 'swing';
    human(500, 1330, 0.48, t, { body: '#2e4a3a', legs: '#2a2a30', hat: 'fur', hatCol: '#1e1a1a', beard: 1, seed: 141, prop: 'axe', armR: t > EV.ft_kaz ? chop : 'hold' });
    human(600, 1336, 0.46, t, { body: '#3a4a3a', legs: '#2a2a30', hat: 'fur', hatCol: '#1e1a1a', beard: 1, seed: 142, armL: 'up', armR: 'up' });
    human(690, 1336, 0.46, t, { body: '#2e4a3a', legs: '#2a2a30', hat: 'fur', hatCol: '#1e1a1a', seed: 143, armL: 'up', armR: 'up', flip: -1 }); pencil([[560, 1236], [740, 1230]], { w: 22, col: '#8a6a42', pass2: false });   // несут бревно
    human(930, 1344, 0.48, t, { body: '#3a2a1a', legs: '#2a2a30', hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 144, prop: 'axe', armR: t > EV.ft_kaz + 0.2 ? (Math.sin(t * 9 + 1) > 0 ? 'up' : 'swing') : 'hold', flip: -1 });
    kman(1110, 1350, 0.48, t, { body: '#5a2a3a', hat: 'fur', hatCol: '#7a4a2a', seed: 145, armL: 'point', flip: -1 });   // старейшина-проводник
    if (t > EV.ft_kaz) for (let i = 0; i < 8; i++) { const r = rng(hsh(FRAME, i, 7)); ell(520 + r() * 60, 1180 - r() * 80, 5, 3, { wash: '#e8c890', washA: 1, w: 1, col: L }); }   // щепки
  }
  function camp(t) {                                               // передний край лагеря: брёвна, телега, бочки, котёл на костре, конь
    const L = AZ.ink;
    for (let k = 0; k < 4; k++) { pencil([[420, 1520 - k * 26], [760, 1500 - k * 26]], { w: 26, col: k % 2 ? '#8a6a42' : '#7a5a3a', pass2: false }); ell(420, 1520 - k * 26, 13, 13, { wash: '#c8a070', washA: 1, w: 1.6, col: L }); }
    cart(940, 1560, 0.7, t, { flip: -1 }); barrel(1080, 1520, 0.6); barrel(1140, 1540, 0.55, '#6a4a2a'); sack(860, 1600, 0.6); crate(1000, 1640, 120, 70);
    push(560, 1640, 0.8); for (let k = -1; k <= 1; k++) pencil([[k * 50, 0], [0, -120]], { w: 5, col: '#3a2a1a', pass2: false }); ell(0, -70, 50, 36, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) { const r = rng(hsh(FRAME, i, 9)); blob([[-30 + i * 14, 0], [-24 + i * 14 + r() * 8, -30 - r() * 30], [-18 + i * 14, 0]], { wash: i % 2 ? '#ff8a2a' : '#ffd04a', washA: 1, line: false }); } glow(0, -10, 120, 'rgba(255,160,60,1)', 0.6); smokeCol(0, -140, t, { col: 'rgba(200,190,180,0.5)', h: 240, sz: 0.3, n: 5, wind: 80, sp: 0.3 }); pop();
    horse(170, 1570, 0.55, t, { col: '#6a3a1e' });
    for (let i = 0; i < 9; i++) kovyl(-40 + i * 150, 1740 + (i % 3) * 30, 1.4, t, { col: '#f2d078' });
  }
  function front(t) {
    for (let k = 0; k < 4; k++) { const x = -60 + k * 50; pencil([[x, 2200], [x + 6, 1000 + k * 60]], { w: 30, col: '#5a3a22', pass2: false }); poly([[x - 15, 1000 + k * 60], [x + 6, 940 + k * 60], [x + 27, 1000 + k * 60]], { wash: '#5a3a22', washA: 1, w: 2, col: '#1a120a' }); }
    for (let i = 0; i < 4; i++) kovyl(1150 + i * 40, 2050, 3, t, { col: '#f2d078' });
  }
  function hud(t) { if (t > EV.ft_one - 0.05) { const q = popK(t, EV.ft_one - 0.05, 0.35); push(560, 880, q, 0.05); rect(-170, -56, 340, 112, { wash: '#14100a', washA: 0.88, w: 3, col: AZ.gold }); txt('ИМЯ № 1', 0, 6, 64, { col: AZ.gold, font: 'Osw' }); pop(); } }

  WORLD.fort = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => farBank(t));
    lay(9, () => river(t));
    lay(3, () => fort(t));
    lay(1, () => { camp(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 400, 1300, 1600], '#ffd890', t, 21077, { sp: 18, vx: 90, sz: 2.6, a: 0.5, wob: 18 });
    windLines(t, 0.3, [-100, 1300, 1200, 1700], 21078);
    haze('#f0a060', 0.06);
  };
  DIR.fort = {
    outfit: 'kazakS', light: { side: 1, rim: '#ffc078' }, grade: ['#c07840', 0.12],
    act: () => [[S0.fort, 'talk'], [EV.ft_kaz, 'grin'], [EV.ft_fort, 'awe'], [EV.ft_one, 'proud'], [EV.ft_name, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1520, s: 1.04, look: t < EV.ft_fort ? [0.7, -0.3] : [0.6, -0.6], tailUp: t > EV.ft_one,
      point: t > EV.ft_fort && t < EV.ft_one ? 1 : undefined, hand: t > EV.ft_fort && t < EV.ft_one ? [210, -330] : t > EV.ft_one ? [90, -330] : undefined }),
    cam: () => [[S0.fort, 640, 1000, 0.12], [EV.ft_kaz, 620, 1000, 0.08], [EV.ft_fort, 600, 900, 0.04, 'x'], [EV.ft_name, 600, 920, 0.14], [S1.fort, 600, 940, 0.18]],
    hud
  };
  TRANS_IN.fort = { a: 0.25, b: 0.4, fx(k, t, A, B) {               // пыльный вихрь степи: бурый смерч проносится слева направо
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const cx = lerp(-400, 1500, k), w = Math.sin(Math.PI * k);
      for (let i = 0; i < 36; i++) { const y = 1900 - i * 54, rr = 120 + i * 14 + Math.sin(t * 9 + i) * 20, P = ellPts(cx + Math.sin(i * 0.4 + t * 6) * 40, y, rr, rr * 0.22, 0, 0, 30);
        pencil(P, { w: 10, col: i % 2 ? '#8a6a3a' : '#c89a5a', a: 0.7 * w, pass2: false, gap: false }); }
      whiteOut(w * 0.6, '160,120,70'); motes(140, [-300, 0, 1400, 2000], '#d8b07a', t, 21079, { sp: 200, vx: 1200, sz: 4, a: w, wob: 40, stretch: 3 }); });
  } };
})();
