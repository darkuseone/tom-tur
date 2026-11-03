/* 020 — сцена `hook`: 2026, вечер, набережная Сунжи. За рекой — башни Грозный-Сити с янтарной LED-подсветкой, слева — белая мечеть
   с четырьмя минаретами, за всем — синий Кавказский хребет в закате. С 0,0 с камера падает к башням (движение), на «Ивана» в небе
   проступает янтарный призрак царя в шапке с меховой опушкой и посохом, на «Грозного!» его перечёркивает красный росчерк, на «кого?!»
   над башнями вспыхивает знак вопроса. Последний кадр кнопки — эта же набережная (петля). Переход в туннель — капля нефти падает на объектив. */
(() => {
  EV.hk_city = wtk('h1', 'Грозный');
  EV.hk_ivan = wtk('h1', 'Ивана');
  EV.hk_cross = wtk('h1', 'Грозного!');
  EV.hk_who = wtk('h1', 'кого?!');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.02, 0.3, 9], [EV.hk_cross, 0.25, 7]);
  KEYW.push('Грозного!', 'кого?!');

  const GQ = window.GQ = {};                                      // хук отдаёт свои планы финалу и кнопке (петля)
  GQ.sky = (t, dusk = 1) => {
    vgrad(-900, 1300, dusk ? ['#141a3a', '#2e3a6a', '#8a5a6a', '#e89a5a', '#ffd08a'] : ['#3a7ac8', '#6aa4dc', '#a8cce8', '#e8eef0'], 1);
    if (dusk) { ell(880, 760, 70, 70, { wash: '#ffe0a0', washA: 1, w: 1.4, col: '#c88a4a', a: 0.6 }); glow(880, 760, 420, 'rgba(255,190,110,1)', 0.45); }
    else { ell(860, -150, 60, 60, { wash: '#fff6d0', washA: 1, line: false }); glow(860, -150, 400, 'rgba(255,250,220,1)', 0.5); }
    clouds(t, -500, 6, dusk ? '#c87a6a' : '#f4f6fa', 20011, dusk ? 0.5 : 0.75);
    birds(t, 9, [-100, -300, 1200, 300], 20012, dusk ? '#2a1a20' : '#2a3040');
  };
  GQ.mount = (t, dusk = 1) => { caucasus(1060, t, { col: dusk ? '#4a5a8a' : '#6a8ab8', colD: dusk ? '#1e2a50' : '#2e4a78', snow: dusk ? '#f8d8c0' : '#f4f8fc', h: 360, seed: 3, lit: dusk ? '#ffb070' : null, a: 0.95 });
    foothills(1150, t, dusk ? '#2e3a50' : '#4a6a5a', dusk ? '#141c2c' : '#24382c', 2, 90); };
  GQ.city = (t, dusk = 1) => {
    mosque(150, 1230, 0.52, t, { lit: dusk });
    gcity(640, 1235, 0.78, t, { led: dusk ? '#ffb84a' : null, on: dusk ? 0.55 : 0.15, col: dusk ? '#2a3a5a' : '#4a6a8a', colL: dusk ? '#e8a26a' : '#c8e0f4' });
    for (let k = 0; k < 9; k++) { const x = -260 + k * 160; if (x > 260 && x < 1000) continue; cityBlock(x, 1240, 130, 120 + (k % 3) * 40, k % 2 ? '#8a7a68' : '#a8988a', t, { on: dusk ? 0.6 : 0.1, seed: 300 + k }); }
    for (let k = 0; k < 14; k++) { const x = -200 + k * 110; blob([[x - 50, 1250], [x - 40, 1190 - (k % 3) * 14], [x, 1170 - (k % 2) * 20], [x + 44, 1196], [x + 52, 1250]], { wash: dusk ? '#1e2a26' : '#3a6a3a', washA: 1, w: 1.4, col: '#0a1410', a: 0.6 }); }   // деревья у воды
  };
  GQ.bridge = (t, dusk = 1) => {                                  // пешеходный мост с арками через Сунжу справа
    const L = '#14100c'; pencil([[760, 1270], [1500, 1250]], { w: 14, col: dusk ? '#3a3430' : '#8a8478', pass2: false });
    for (let q = 0; q < 5; q++) { const ax = 800 + q * 150; pencil(spline([[ax, 1270], [ax + 75, 1220], [ax + 150, 1268]], false, 8), { w: 6, col: dusk ? '#e8a23a' : '#c8c0b0', a: 0.9, pass2: false }); pencil([[ax, 1270], [ax, 1320]], { w: 10, col: L, pass2: false }); }
    if (dusk) for (let q = 0; q < 10; q++) glow(780 + q * 72, 1262, 26, 'rgba(255,200,120,1)', 0.7);
  };
  GQ.river = (t, dusk = 1) => sunzha(1260, 1400, t, { top: dusk ? '#4a4a6a' : '#5a7a8a', bot: dusk ? '#2a2638' : '#3a4a52', glint: dusk ? '#ffc890' : '#e8f4ff' });
  GQ.embank = (t, dusk = 1, crowdOn = 1) => {                     // набережная: гранитный парапет, плитка, фонари, клумбы, люди
    const L = '#14100c';
    const pv = rect(-600, 1400, 2400, 700, { wash: dusk ? '#8a7a70' : '#c8bca8', washA: 1, w: 0, line: false });
    for (let k = 0; k < 18; k++) { const y = 1420 + k * k * 3.2; pencil([[-600, y], [1800, y]], { w: 1.2, col: L, a: 0.2, pass2: false }); }
    for (let k = -12; k < 14; k++) pencil([[540 + k * 40, 1400], [540 + k * 160, 2000]], { w: 1.2, col: L, a: 0.16, pass2: false });   // плитка в перспективе
    const par = rect(-600, 1350, 2400, 56, { wash: dusk ? '#6a6058' : '#a89c8c', washA: 1, w: 2, col: L }); hatch(par.path, par.bb, { gap: 9, a: 0.2, col: L, ang: 0.2, w: 1 });
    for (let x = -560; x < 1700; x += 120) pencil([[x, 1352], [x, 1404]], { w: 1.6, col: L, a: 0.5, pass2: false });
    for (let x = -560; x < 1700; x += 60) pencil([[x, 1350], [x, 1320]], { w: 4, col: '#2a2a30', pass2: false }); pencil([[-600, 1318], [1800, 1318]], { w: 5, col: '#2a2a30', pass2: false });   // ограда
    for (const lx of [80, 560, 1010]) lamppost(lx, 1400, 300, t, { lamp: dusk ? 0.8 : 0 });
    for (const [fx, fy] of [[-40, 1480], [700, 1470]]) { ell(fx, fy, 130, 28, { wash: '#4a3a2a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 14; q++) ell(fx - 110 + q * 17, fy - 12 - (q % 3) * 6, 9, 9, { wash: ['#d83a4a', '#f2c84a', '#f2f2f2'][q % 3], washA: 1, w: 1, col: L, a: 0.5 }); }   // клумбы
    push(880, 1460, 1); rect(-90, -40, 180, 14, { wash: '#7a5a3a', washA: 1, w: 1.6, col: L }); rect(-90, -80, 180, 12, { wash: '#7a5a3a', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) pencil([[sd * 80, -26], [sd * 80, 0]], { w: 5, col: '#2a2a30', pass2: false }); pop();   // скамья
    push(990, 1470, 1); rect(-24, -70, 48, 70, { wash: '#3a5a3a', washA: 1, w: 1.6, col: L }); pop();   // урна
    if (!crowdOn) return;
    human(440, 1405, 0.42, t, { body: '#5a3a5a', legs: '#2a2028', hat: 'scarf', hatCol: '#c8a0b8', armR: 'hold', seed: 51, long: 1 });
    human(480, 1405, 0.34, t, { body: '#3a5a7a', legs: '#2a2a30', seed: 52, armL: 'hold' });   // мама с сыном
    human(640, 1410, 0.44, t, { body: '#2a2a30', legs: '#1a1a1e', seed: 53, prop: 'phone', armR: 'up', beard: 1 });
    human(760, 1412, 0.46, t, { body: '#6a4a2a', legs: '#2a2420', hat: 'cap', hatCol: '#1a1a1a', seed: 54, armL: 'wave', flip: -1 });
    human(800, 1414, 0.44, t, { body: '#3a6a5a', legs: '#2a2a2a', hat: 'scarf', hatCol: '#e8e0d0', seed: 55, long: 1, flip: -1 });
    human(940, 1420, 0.5, t, { body: '#3a3428', legs: '#2a2420', hat: 'fur', hatCol: '#d8d0c0', seed: 56, beard: 1, armR: 'hold', prop: 'stick', flip: -1 });   // старик в белой папахе
    human(1060, 1424, 0.5, t, { body: '#8a2a2a', legs: '#2a2a2a', seed: 57, prop: 'phone', armR: 'up', flip: -1 });
    human(180, 1408, 0.4, t, { body: '#4a4a6a', legs: '#2a2a2a', seed: 58, armR: 'swing' });
    human(-30, 1410, 0.42, t, { body: '#2a4a3a', legs: '#2a2a2a', hat: 'cap', hatCol: '#3a3a3a', seed: 59 });
    for (let k = 0; k < 7; k++) { const x = 300 + k * 40 + Math.sin(t * 3 + k) * 6, y = 1530 + (k % 3) * 14; ell(x, y, 12, 8, { wash: '#6a6a78', washA: 1, w: 1.2, col: L }); ell(x + 10, y - 8, 5, 5, { wash: '#5a5a68', washA: 1, w: 1, col: L }); }   // голуби
    push(260, 1440, 0.9); rect(-70, -90, 140, 80, { wash: '#e8e0c8', washA: 1, w: 1.6, col: L }); txt('МОРОЖЕНОЕ', 0, -50, 18, { col: '#b8322a', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 46, -6, 14, 14, { wash: '#2a2a2a', washA: 1, w: 1.4, col: L }); poly([[-80, -90], [0, -140], [80, -90]], { wash: '#d84a3a', washA: 1, w: 1.6, col: L }); pop();
    push(1180, 1470, 1); for (const wx of [-50, 50]) ell(wx, -30, 30, 30, { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#2a2a2a' }); pencil([[-50, -30], [0, -70], [50, -30], [10, -30], [-20, -80]], { w: 4, col: '#c8322a', pass2: false }); pop();   // велосипед
  };
  function tsar(t) {                                              // призрак царя-«Грозного»: шапка с опушкой, борода, посох; перечёркивается
    if (t < EV.hk_ivan - 0.1) return; const k = sm((t - EV.hk_ivan + 0.1) / 0.5) * (1 - sm((t - LS('h2') - 0.3) / 0.5)); if (k <= 0) return;
    const x = 760, y = 900, s = 1.1, sh = Math.sin(t * 2) * 6;
    push(x, y + sh, s);
    const body = [[-150, 280], [-120, 60], [-80, -20], [-40, -40], [40, -40], [80, -20], [120, 60], [150, 280]];
    sil(body, '#ffb060', 0.42 * k); sil([[-50, -40], [-56, -120], [0, -160], [56, -120], [50, -40], [0, 60]], '#ffb060', 0.42 * k);   // голова + борода
    sil([[-70, -130], [-60, -210], [0, -250], [60, -210], [70, -130]], '#ffc070', 0.5 * k);   // шапка
    pencil([[-74, -130], [74, -130]], { w: 16, col: '#ffd890', a: 0.7 * k, pass2: false });
    pencil([[0, -250], [0, -282]], { w: 5, col: '#ffd890', a: 0.7 * k, pass2: false });
    pencil(body.slice(0, 5), { w: 4, col: '#ffc070', a: 0.6 * k, pass2: false }); pencil([[150, 280], [180, -200]], { w: 7, col: '#ffc070', a: 0.6 * k, pass2: false });   // посох
    txt('ИВАН IV', 0, 330, 44, { col: '#ffe0a8', font: 'Osw', a: 0.8 * k });
    pop();
    if (t > EV.hk_cross) { const q = sm((t - EV.hk_cross) / 0.25); pencil([[x - 220, y - 300], [x - 220 + 440 * q, y - 300 + 640 * q]], { w: 26, col: '#d8262a', a: 0.92 * k, pass2: false, gap: false }); if (q > 0.6) { const q2 = sm((t - EV.hk_cross - 0.15) / 0.25); pencil([[x + 220, y - 300], [x + 220 - 440 * q2, y - 300 + 640 * q2]], { w: 26, col: '#d8262a', a: 0.92 * k, pass2: false, gap: false }); } }
    if (t > EV.hk_who) { const q = popK(t, EV.hk_who, 0.4); txt('?', 760, 760, 260 * q, { col: '#ffd27a', font: 'Osw', a: 0.95 * k }); glow(760, 760, 240, 'rgba(255,200,110,1)', 0.4 * q * k); }
  }
  function front(t) {                                              // передний план: ветка платана слева, край фонаря справа
    const L = '#0e0a06';
    pencil(spline([[-120, 300], [60, 380], [200, 360], [300, 420]], false, 10), { w: 22, col: '#2a1e14', pass2: false });
    for (let k = 0; k < 9; k++) { const x = -60 + k * 44, y = 330 + Math.sin(k) * 50 + Math.sin(t * 1.5 + k) * 6; blob([[x, y], [x + 30, y - 34], [x + 64, y - 6], [x + 50, y + 34], [x + 10, y + 30]], { wash: k % 2 ? '#2a3a1e' : '#3a4a24', washA: 0.95, w: 1.4, col: L, a: 0.6 }); }
    pencil([[1250, 2100], [1230, 760]], { w: 30, col: '#1e1e24', pass2: false }); ell(1190, 760, 34, 40, { wash: '#fff2c8', washA: 1, w: 2, col: '#3a3020' }); glow(1190, 760, 200, 'rgba(255,210,140,1)', 0.55);
  };

  WORLD.hook = (t, u, cat) => {
    lay(40, () => GQ.sky(t));
    lay(26, () => GQ.mount(t));
    lay(12, () => { GQ.city(t); });
    lay(6, () => { GQ.bridge(t); GQ.river(t); });
    lay(3, () => tsar(t));
    lay(1, () => { GQ.embank(t); cat(); });
    lay(0.62, () => front(t));
    motes(30, [-200, 200, 1300, 1500], '#ffd8a0', t, 20021, { sp: 20, vx: 12, sz: 2.6, a: 0.5, wob: 18 });
    haze('#e8a06a', 0.05);
  };
  DIR.hook = {
    outfit: 'hoodieG', light: { side: 1, rim: '#ffc88a' }, grade: ['#8a5030', 0.12],
    act: () => [[0, 'shock'], [EV.hk_ivan, 'suspicious'], [EV.hk_cross, 'annoyed'], [EV.hk_who - 0.05, 'shock'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.08, look: t < EV.hk_ivan ? [0.6, -0.4] : t < LS('h2') ? [0.7, -0.3] : [0.2, 0], tilt: t < 0.35 ? -0.07 : 0, squash: b.squash + (t < 0.2 ? 0.07 : 0),
      point: t > EV.hk_ivan && t < EV.hk_who ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_ivan && t < EV.hk_who ? [210, -300] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 680, 900, 0.34], [EV.hk_ivan, 620, 960, 0.14], [EV.hk_who, 600, 980, 0.2, 'x'], [LS('h2'), 520, 1080, 0.14], [S1.hook, 480, 1120, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {       // капля нефти падает на объектив и растекается чёрным кругом с янтарной кромкой
    drawBuf(A, 1 + k * 0.08);
    scr(() => {
      const fall = sm(clamp(k / 0.35)), dy = lerp(-120, 900, fall);
      if (k < 0.4) { blob([[540, dy - 70], [516, dy - 10], [520, dy + 30], [540, dy + 44], [560, dy + 30], [564, dy - 10]], { wash: GZ.oil, washA: 1, w: 2, col: '#000' }); glow(548, dy, 30, 'rgba(255,210,140,1)', 0.6); }
      const R = sm(clamp((k - 0.33) / 0.67)) * 1500;
      if (R > 0) { inCircle(540, 900, R, () => drawBuf(B)); const P = []; for (let q = 0; q <= 60; q++) { const a = q / 60 * 6.283, rr = R * (1 + 0.04 * Math.sin(a * 7 + t * 8)); P.push([540 + Math.cos(a) * rr, 900 + Math.sin(a) * rr]); }
        pencil(P, { w: 30, col: GZ.oil, a: 0.95, pass2: false, gap: false }); pencil(P, { w: 6, col: GZ.amber, a: 0.8, pass2: false, gap: false }); }
    });
  } };
})();
