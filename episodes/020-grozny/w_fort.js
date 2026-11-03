/* 020 — сцена `fort`: июнь 1818, левый берег Сунжи. Солдаты роют ров и насыпают вал, ставят частокол, на бастионе — пушки.
   Генерал (силуэт в эполетах, со зрительной трубой) на холме у палатки показывает план крепости. За рекой — лесистые предгорья
   и синий хребет, летнее утро, тёплый янтарный свет. На «Ермолов» — раскрывается чертёж-план (шестиугольник с бастионами),
   на «крепость» — пушка салютует, дым; на «Как назвал» — табличка на воротах закрыта холстом с вопросом (имя — в конце).
   Переход В сцену — дым пушечного выстрела в упор: из чёрно-янтарного туннеля выходит клуб дыма, в нём проступает 1818-й. */
(() => {
  EV.ft_gen = wtk('s1', 'Ермолов');
  EV.ft_fort = wtk('s1', 'крепость.');
  EV.ft_name = wtk('s1', 'назвал');
  EV.ft_end = wtk('s1', 'конце!');
  SHAKES.push([EV.ft_fort + 0.05, 0.25, 8]);
  KEYW.push('Ермолов', 'крепость.', 'конце!');

  function sky(t) {
    vgrad(-900, 1300, ['#4a7ab8', '#7aa8d0', '#d8d0b0', '#f2c88a'], 1);
    ell(160, -60, 60, 60, { wash: '#fff2c0', washA: 1, line: false }); glow(160, -60, 420, 'rgba(255,230,170,1)', 0.45);
    clouds(t, -560, 7, '#f6f0e2', 18181, 0.7); birds(t, 8, [-100, -300, 1200, 200], 18182);
    rays(160, -60, 0.9, 0.6, 1600, 'rgba(255,240,200,1)', 0.12, 7, t);
  }
  function far(t) {
    caucasus(1000, t, { col: '#5a78a8', colD: '#2a3e68', snow: '#f6f8fc', h: 420, seed: 5, a: 0.9 });
    foothills(1090, t, '#4a6a4a', '#1e3a24', 3, 110);
    for (let k = 0; k < 4; k++) { const x = 60 + k * 300; for (let q = 0; q < 3; q++) rect(x + q * 34, 1080 - (q % 2) * 8, 28, 22, { wash: '#c8b08a', washA: 1, w: 1.2, col: '#3a2a1a', a: 0.6 }); smokeCol(x + 50, 1070, t, { n: 4, h: 200, sz: 0.3, col: '#d8d0c8', a: 0.5, wind: 60 }); }   // далёкие аулы за рекой
  }
  function river(t) { sunzha(1130, 1220, t, { top: '#7a8a7a', bot: '#4a5a4a', glint: '#fff0d0' });
    for (let k = 0; k < 6; k++) { const x = -100 + k * 240; blob([[x - 80, 1140], [x - 60, 1080 - (k % 2) * 20], [x, 1060], [x + 70, 1090], [x + 90, 1140]], { wash: '#3a5a2a', washA: 1, w: 1.4, col: '#122a10', a: 0.6 }); } }   // прибрежный лес
  function plan(t) {                                               // чертёж крепости (раскрывается на «Ермолов»)
    if (t < EV.ft_gen) return; const k = sm((t - EV.ft_gen) / 0.4) * (1 - sm((t - EV.ft_name) / 0.4)); if (k <= 0) return;
    push(700, 860, 0.9 * k, -0.05); const L = '#2a1a0a';
    const pp = rect(-200, -150, 400, 300, { wash: '#efe2c0', washA: 1, w: 2.4, col: L }); hatch(pp.path, pp.bb, { gap: 14, a: 0.06, col: L, ang: 0.3, w: 1 });
    const P = []; for (let q = 0; q <= 6; q++) { const a = q / 6 * 6.283 - Math.PI / 2; P.push([Math.cos(a) * 100, Math.sin(a) * 90]); } pencil(P, { w: 3, col: '#3a2a8a', pass2: false });
    for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283 - Math.PI / 2, x = Math.cos(a) * 100, y = Math.sin(a) * 90; poly([[x - 18, y], [x, y - 24], [x + 18, y], [x, y + 24]].map(([a2, b]) => [a2 + Math.cos(a) * 12, b + Math.sin(a) * 12]), { wash: '#b8c8e8', washA: 1, w: 2, col: '#3a2a8a' }); }
    pencil(spline([[-200, 120], [-60, 100], [80, 128], [200, 110]], false, 8), { w: 5, col: '#4a7ab8', a: 0.8, pass2: false }); txt('р. Сунжа', 120, 140, 22, { font: 'Hand', col: '#2a4a7a' });
    txt('1818', -150, -120, 26, { font: 'Hand', col: L }); pop();
  }
  function fort(t) {                                               // вал, ров, частокол, бастион с пушками, ворота
    const L = '#140c06';
    rampart(380, 1500, 1270, 110, t, {});
    palisade(400, 1480, 1166, 90, t, { seed: 2 });
    const bx = 900; poly([[bx - 160, 1170], [bx - 60, 1060], [bx + 140, 1060], [bx + 220, 1170]], { wash: '#8a7448', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.25, col: '#3a2a12', ang: 0.5 } });   // бастион
    cannon(bx - 20, 1064, 0.62, t, { tilt: t > EV.ft_fort ? -0.06 : 0 }); cannon(bx + 110, 1064, 0.58, t, { balls: 1 });
    if (t > EV.ft_fort) { const q = (t - EV.ft_fort) / 1.6; if (q < 1) { glow(bx + 50, 1020, 140 * (1 - q), 'rgba(255,200,110,1)', 0.8 * (1 - q * 2)); smokeCol(bx + 60, 1030, t - EV.ft_fort, { n: 6, h: 400, sz: 0.9, col: '#e8e0d4', a: 0.8 * (1 - q), sp: 0.5, wind: 300 }); } }
    pencil([[bx + 40, 1060], [bx + 44, 860]], { w: 6, col: '#3a2a1a', pass2: false }); const wv = Math.sin(t * 5) * 10; blob([[bx + 44, 860], [bx + 160, 868 + wv], [bx + 150, 920 + wv], [bx + 44, 914]], { wash: '#e8e2d0', washA: 1, w: 1.6, col: L });   // вымпел без символов
    const gx = 520; rect(gx, 1060, 150, 120, { wash: '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.3, col: L, ang: 0 } }); poly([[gx - 20, 1060], [gx + 75, 1000], [gx + 170, 1060]], { wash: '#5a3a1e', washA: 1, w: 2, col: L });   // ворота
    pencil([[gx + 75, 1070], [gx + 75, 1180]], { w: 3, col: L, pass2: false });
    push(gx + 75, 1032, 1, 0.02); rect(-80, -18, 160, 36, { wash: '#d8c8a0', washA: 1, w: 2, col: L }); if (t > EV.ft_name - 0.1) txt('???', 0, 2, 30, { col: '#8a2a1a', font: 'Osw', a: popK(t, EV.ft_name - 0.1, 0.3) }); pop();   // доска с именем закрыта
    for (const [x, h] of [[1100, 1240], [1220, 1260]]) { rect(x, h - 80, 90, 80, { wash: '#e8dcc0', washA: 1, w: 1.8, col: L }); poly([[x - 10, h - 80], [x + 45, h - 130], [x + 100, h - 80]], { wash: '#d8c8a8', washA: 1, w: 1.8, col: L }); }   // палатки
  }
  function work(t) {                                               // солдаты: копают, носят брёвна, тачка; офицер с планом; казак на коне
    const sw = Math.sin(t * 6);
    soldier1818(420, 1400, 0.74, t, { seed: 61, armR: 'swing', armL: 'swing' }); pencil([[460, 1270 + sw * 20], [520, 1400]], { w: 5, col: '#6a4a2a', pass2: false });   // копает
    soldier1818(560, 1405, 0.76, t, { seed: 62, armR: 'up', armL: 'up', flip: -1 }); pencil([[480, 1230], [680, 1210]], { w: 16, col: '#8a6a42', pass2: false });   // бревно над головами
    soldier1818(640, 1408, 0.76, t, { seed: 63, armR: 'up', armL: 'up' });
    soldier1818(760, 1370, 0.68, t, { seed: 64, armR: 'swing', armL: 'swing' }); pencil([[800, 1260 - sw * 20], [850, 1370]], { w: 5, col: '#6a4a2a', pass2: false });
    soldier1818(1180, 1390, 0.68, t, { seed: 65, armR: 'hold', flip: -1 });
    soldier1818(1290, 1395, 0.70, t, { seed: 66, armR: 'swing' });
    gman(980, 1382, 0.68, t, { seed: 67, body: '#2e3446', gazyri: 1, hatCol: '#1a1a1a', flip: -1 }); horse(1040, 1390, 0.68, t, { col: '#5a3a1e', saddle: 1, flip: -1 });   // казак с конём
    human(840, 1390, 0.76, t, { body: '#1e2a3a', legs: '#e8e0d0', hat: 'merchant', hatCol: '#1a1a1a', belt: '#c8a040', armR: 'point', seed: 68, flip: -1 });   // офицер
    push(840, 1390, 0.76, 0, -1); for (const sd of [-1, 1]) rect(sd * 50 - 14, -238, 28, 10, { wash: '#e8c050', washA: 1, w: 1, col: '#5a3a08' }); pop();   // эполеты
    cart(260, 1410, 0.81, t, { load: 'logs' }); horse(120, 1408, 0.81, t, { col: '#7a5a3a' });
  }
  function ground(t) {                                             // берег: свежая земля, лопаты, корзины-туры, бочки, мешки
    earthBank(1330, t, { col: '#9a7a4a', seed: 2 });
    for (let k = 0; k < 5; k++) { const x = 80 + k * 54, y = 1460 + (k % 2) * 10; push(x, y, 0.7); const b = blob([[-24, 0], [-28, -70], [28, -70], [24, 0]], { wash: '#9a7a42', washA: 1, w: 1.8, col: '#2a1a0a' }); hatch(b.path, b.bb, { gap: 6, a: 0.4, col: '#3a2410', ang: 1.5, w: 1.2 }); pop(); }   // туры (плетёные корзины)
    barrel(760, 1480, 0.7, '#5a3a20'); barrel(820, 1470, 0.6, '#4a3020'); sack(900, 1490, 0.8); sack(950, 1480, 0.7, '#b8a07a'); crate(980, 1500, 90, 60, { txt: 'ПОРОХЪ' });
    for (let k = 0; k < 3; k++) { const x = 1050 + k * 40; pencil([[x, 1500], [x + 20, 1380]], { w: 5, col: '#6a4a2a', pass2: false }); poly([[x + 16, 1390], [x + 34, 1370], [x + 32, 1404]], { wash: '#8a8a8a', washA: 1, w: 1.4 }); }   // воткнутые лопаты
    for (let k = 0; k < 8; k++) ell(300 + k * 90, 1560 + (k % 3) * 30, 40, 10, { wash: '#6a4a2a', washA: 0.4, line: false });   // следы колёс
    jug(700, 1520, 0.8); ell(640, 1540, 50, 14, { wash: '#3a2a1a', washA: 0.4, line: false });
    for (let k = 0; k < 3; k++) ell(560 + k * 60, 1600, 30, 8, { wash: '#8a6a3a', washA: 0.6, line: false }); push(600, 1600, 1); rect(-20, -30, 40, 30, { wash: '#4a3a2a', washA: 1, w: 1.4 }); for (let k = 0; k < 4; k++) smokeCol(0, -34, t, { n: 3, h: 120, sz: 0.2, col: '#d8d0c8', a: 0.4, wind: 30 }); pop();   // котелок на костре
  }
  function ground2(t) {                                           // ближняя земля: камни, трава, брёвна, инструмент, ведро, следы сапог
    const r = rng(18185);
    for (let k = 0; k < 40; k++) { const x = -200 + r() * 1500, y = 1600 + r() * 400; if (k % 3) ell(x, y, 10 + r() * 22, 6 + r() * 10, { wash: '#a8987a', washA: 1, w: 1.4, col: '#3a2a1a', a: 0.6 }); else { pencil([[x, y], [x - 8, y - 30]], { w: 3, col: '#6a7a2a', pass2: false }); pencil([[x + 6, y], [x + 14, y - 26]], { w: 3, col: '#7a8a3a', pass2: false }); } }
    for (let k = 0; k < 3; k++) ell(820 + k * 30, 1720 - k * 26, 230, 30, { wash: '#8a6a3e', washA: 1, w: 2, col: '#2a1808', shade: { gap: 6, a: 0.3, col: '#2a1808', ang: 0 } });   // штабель брёвен
    push(520, 1760, 1, 0.3); pencil([[0, 0], [160, -20]], { w: 8, col: '#6a4a2a', pass2: false }); poly([[150, -40], [200, -30], [196, 4], [150, 0]], { wash: '#8a8a8a', washA: 1, w: 1.6 }); pop();   // кирка
    push(640, 1700, 1); const bk = blob([[-30, 0], [-36, -60], [36, -60], [30, 0]], { wash: '#7a5a36', washA: 1, w: 2, col: '#2a1808' }); hatch(bk.path, bk.bb, { gap: 8, a: 0.4, col: '#2a1808', ang: 0, w: 1 }); pencil(spline([[-34, -60], [0, -100], [34, -60]], false, 6), { w: 3, col: '#3a2a1a', pass2: false }); pop();   // ведро
    for (let k = 0; k < 10; k++) ell(200 + k * 70, 1840 - (k % 2) * 20, 14, 8, { wash: '#5a3a20', washA: 0.5, line: false });   // следы сапог
    barrel(1000, 1800, 1.0, '#5a3a20'); sack(1100, 1820, 1.1); crate(1140, 1760, 120, 80, { txt: 'ЯДРА' });
  }
  function front(t) {                                              // передний план: колесо телеги и связки фашин по краям
    ell(-60, 1700, 200, 200, { wash: 'rgba(0,0,0,0)', washA: 0, w: 14, col: '#3a2410' }); for (let q = 0; q < 10; q++) pencil([[-60, 1700], [-60 + Math.cos(q * 0.63) * 190, 1700 + Math.sin(q * 0.63) * 190]], { w: 9, col: '#3a2410', pass2: false });
    for (let k = 0; k < 4; k++) ell(1220, 1640 + k * 50, 160, 28, { wash: '#7a5a30', washA: 1, w: 2, col: '#2a1808', shade: { gap: 5, a: 0.35, col: '#2a1808', ang: 0 } });
  }

  WORLD.fort = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => far(t));
    lay(12, () => river(t));
    lay(5, () => { fort(t); });
    lay(3, () => { work(t); plan(t); });
    lay(1, () => { ground(t); ground2(t); cat(); });
    lay(0.62, () => front(t));
    motes(40, [-200, 600, 1300, 1700], '#e8d0a0', t, 18183, { sp: 14, vx: 20, sz: 2.4, a: 0.5, wob: 20 });   // пыль от земляных работ
    haze('#f0c080', 0.05);
  };
  DIR.fort = {
    outfit: 'hussar', light: { side: -1, rim: '#ffe0a0' }, grade: ['#b88040', 0.12],
    act: () => [[S0.fort, 'awe'], [EV.ft_gen, 'proud'], [EV.ft_fort, 'shock'], [EV.ft_name, 'smug'], [EV.ft_end, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.02, look: t < EV.ft_name ? [0.7, -0.2] : [0.1, 0.05], point: t > EV.ft_gen && t < EV.ft_name ? 1 : undefined, hand: t > EV.ft_gen && t < EV.ft_name ? [200, -300] : undefined, tailUp: t > EV.ft_end }),
    cam: () => [[S0.fort, 640, 1060, 0.3, 'x'], [S0.fort + 0.6, 600, 1040, 0.12], [EV.ft_fort, 640, 1020, 0.1], [EV.ft_name, 480, 1100, 0.2], [S1.fort, 460, 1120, 0.24]]
  };
  TRANS_IN.fort = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // клуб порохового дыма в упор: туннель тонет в дыму, дым редеет — 1818-й
    drawBuf(k < 0.45 ? A : B, k < 0.45 ? 1 + k * 0.4 : 1.1 - (k - 0.45) * 0.18);
    scr(() => { const d = Math.sin(clamp(k) * Math.PI), r = rng(18184);
      for (let i = 0; i < 26; i++) { const a = r() * 6.283, dd = (r() * 500) * (0.3 + k), x = 540 + Math.cos(a) * dd, y = 900 + Math.sin(a) * dd * 1.3, rr = 200 + r() * 260;
        blob([[x - rr, y], [x - rr * 0.6, y - rr * 0.7], [x + rr * 0.2, y - rr * 0.9], [x + rr, y - rr * 0.2], [x + rr * 0.6, y + rr * 0.6], [x - rr * 0.4, y + rr * 0.5]].map(([a2, b2]) => [x + (a2 - x) * (0.6 + k), y + (b2 - y) * (0.6 + k)]), { wash: i % 3 ? '#e8e0d2' : '#c8bca8', washA: 0.85 * d, w: 1.4, col: '#8a7a68', a: 0.3 * d }); }
      glow(540, 900, 300, 'rgba(255,200,110,1)', 0.7 * clamp(1 - k * 3)); });
  } };
})();
