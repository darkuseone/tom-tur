/* 004 — сцена `boyar`: 1466, село Кишинэу у родника в долине Быка. Мазанки под соломой, деревянная церковь с высокой гонтовой кровлей,
   колодец-журавль, волы с каруцей, овцы, виноградник на склоне, дубравы Кодр. На переднем плане — стол под ореховым деревом:
   грамота с висячей печатью, местные владельцы в кушмах и пыркэлаб Влайку в парчовом кафтане высыпает татарские серебряные монеты.
   «сто двадцать» — счётчик монет; «монет.» — горка; «Недорого!» — Том сухо в камеру. Переход В сцену: бивень крутится и становится монетой. */
(() => {
  EV.by_sell = WT('s3', 'продают');              // пыркэлаб развязывает кошель
  EV.by_count = WT('s3', 'сто');                 // монеты сыплются, счётчик
  EV.by_pile = WT('s3', 'монет.');               // горка, печать — хлоп
  EV.by_cheap = WT('s3', 'Недорого!');           // Том в камеру
  KEYW.push('продают', 'двадцать', 'монет.', 'Недорого!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function sky(t) {
    vgrad(-900, 1300, ['#6a98c8', '#a8c8e0', '#f0dcb0']);
    glow(900, 260, 380, 'rgba(255,240,200,1)', 0.45);
    for (let k = 0; k < 4; k++) { const r = rng(9900 + k), cx = ((r() * 1700 + t * 10) % 1900) - 400, cy = 100 + r() * 300;
      for (let q = 0; q < 5; q++) ell(cx + q * 64 - 128, cy - Math.sin(q / 4 * Math.PI) * 34, 74, 40, { wash: '#fffaf0', washA: 0.85, line: false }); }
  }
  function codri(t) {                             // холмы Кодр: дубравы, виноградник на склоне
    sil([[-600, 1000], [-300, 860], [100, 920], [500, 800], [900, 900], [1300, 820], [1700, 900], [1700, 1250], [-600, 1250]], '#6a8a5a', 1);
    for (let i = 0; i < 60; i++) { const r = rng(9910 + i), x = -500 + i * 38, y = 900 + Math.sin(x * 0.006) * 60 + r() * 40; ell(x, y, 30 + r() * 14, 26 + r() * 10, { wash: lerpC('#4a6a3a', '#2e4a26', r()), washA: 1, line: false }); }
    sil([[-600, 1100], [0, 1000], [400, 1060], [800, 990], [1700, 1080], [1700, 1250], [-600, 1250]], '#8aa068', 1);
    for (let row = 0; row < 7; row++) for (let i = 0; i < 18; i++) { const x = 700 + i * 34 + row * 10, y = 1020 + row * 18 - i * 2; pencil([[x, y], [x, y - 16]], { w: 2, col: '#5a4a2a', pass2: false }); ell(x, y - 18, 12, 8, { wash: '#4a7a2e', washA: 1, line: false }); }
    haze('#e8e0c0', 0.22);
  }
  function church(x, y, s, t) {                   // деревянная молдавская церковь: сруб, высокая гонтовая крыша, маковка
    push(x, y, s); const L = '#2a1a0e';
    const w = rect(-120, -150, 240, 150, { wash: '#8a5a32', washA: 1, w: 2.4, col: L }); for (let k = 1; k < 7; k++) pencil([[-120, -k * 22], [120, -k * 22]], { w: 1.6, col: '#4a2a14', a: 0.7, pass2: false });
    const rf = poly([[-160, -140], [0, -380], [160, -140]], { wash: '#5a4030', washA: 1, w: 2.6, col: L }); hatch(rf.path, rf.bb, { gap: 6, a: 0.4, col: '#2a1a0e', ang: 0.3, key: 9920, w: 1.3 });
    rect(-26, -470, 52, 100, { wash: '#7a4e2c', washA: 1, w: 2, col: L }); poly([[-44, -460], [0, -560], [44, -460]], { wash: '#5a4030', washA: 1, w: 2, col: L });
    pencil([[0, -560], [0, -620]], { w: 4, col: L, pass2: false }); pencil([[-16, -600], [16, -600]], { w: 3, col: L, pass2: false }); rect(-22, -90, 44, 90, { wash: '#3a2410', washA: 1, w: 2, col: L });
    pop();
  }
  function hut(x, y, w, h, t, seed, smoke) {      // мазанка: белёная глина, соломенная крыша, плетень
    push(x, y, 1); const L = '#3a2a1a', r = rng(seed);
    const wl = blob([[-w / 2, 0], [-w / 2 + 4, -h], [w / 2 - 4, -h], [w / 2, 0]], { wash: '#efe6d0', washA: 1, w: 2.2, col: L }); shadeG(wl.path, w / 2, 0, -w / 2, 0, '#b8a888', 0.45);
    for (let i = 0; i < 8; i++) ell(-w / 2 + r() * w, -r() * h, 10, 5, { wash: '#c8b898', washA: 0.5, line: false });
    rect(-w * 0.12, -h * 0.7, w * 0.24, h * 0.7, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); rect(w * 0.2, -h * 0.66, 30, 26, { wash: '#3a4a5a', washA: 1, w: 1.6, col: L });
    const rf = blob([[-w / 2 - 34, -h + 10], [-w * 0.2, -h - h * 0.9], [w * 0.2, -h - h * 0.9], [w / 2 + 34, -h + 10]], { wash: '#c8a868', washA: 1, w: 2.4, col: L }); hatch(rf.path, rf.bb, { gap: 4, a: 0.45, col: '#7a5a2a', ang: 1.45, key: seed, w: 1.3 });
    pencil(spline([[-w / 2 - 34, -h + 10], [0, -h + 20], [w / 2 + 34, -h + 10]], false, 6), { w: 4, col: '#8a6a3a', pass2: false });
    if (smoke) for (let k = 0; k < 4; k++) { const ph = (t * 0.4 + k / 4 + seed * 0.3) % 1; glow(w * 0.1 + Math.sin(ph * 5) * 20, -h * 1.8 - ph * 180, 20 + ph * 40, 'rgba(210,206,200,1)', 0.4 * (1 - ph), 'source-over'); }
    pop();
  }
  function wattle(x0, x1, y) { for (let x = x0; x < x1; x += 26) pencil([[x, y], [x, y - 70]], { w: 4, col: '#6a4a2a', pass2: false }); for (let k = 0; k < 4; k++) pencil(spline(Array.from({ length: Math.ceil((x1 - x0) / 26) + 1 }, (_, i) => [x0 + i * 26, y - 14 - k * 14 + (i % 2 ? 4 : -4)]), false, 2), { w: 3, col: '#8a6a3a', pass2: false }); }
  function wellCrane(x, y, t) {                   // колодец-журавль у родника
    push(x, y, 1); const L = '#2a1a0e', sw = Math.sin(t * 0.8) * 0.06;
    rect(-60, -70, 120, 70, { wash: '#b8a888', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 3; k++) pencil([[-60, -22 - k * 22], [60, -22 - k * 22]], { w: 1.4, col: '#6a5a40', a: 0.7, pass2: false });
    pencil([[90, 0], [90, -260]], { w: 10, col: '#6a4428', pass2: false }); pencil([[78, -270], [90, -250], [102, -270]], { w: 6, col: '#6a4428', pass2: false });
    push(90, -258, 1, -0.35 + sw); pencil([[-260, 0], [160, 0]], { w: 8, col: '#7a5432', pass2: false }); rect(140, -16, 40, 40, { wash: '#8a8a80', washA: 1, w: 2, col: L }); pop();
    const ex = 90 - 260 * Math.cos(-0.35 + sw), ey = -258 - 260 * Math.sin(-0.35 + sw); pencil([[ex, ey], [ex, -40]], { w: 2, col: '#4a3a2a', pass2: false }); rect(ex - 14, -60, 28, 26, { wash: '#7a5432', washA: 1, w: 1.6, col: L });
    for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; ell(-80 - ph * 60, 4 + ph * 10, 10 + ph * 30, 3 + ph * 4, { wash: '#a8d0e0', washA: 0.6 * (1 - ph), line: false }); }   // ручей родника
    pop();
  }
  function oxCart(x, y, t) {
    push(x - ((t * 30) % 100), y, 0.7); const L = '#2a1a0e';
    for (const [ox, k] of [[-260, 0], [-180, 1]]) { const g = Math.sin(t * 3 + k) * 0.15; blob([[ox - 70, -70], [ox - 40, -110], [ox + 50, -110], [ox + 70, -70], [ox + 60, -40], [ox - 60, -40]], { wash: k ? '#d8ccb8' : '#c8bca8', washA: 1, w: 2, col: L }); for (const lx of [-50, 40]) { push(ox + lx, -46, 1, g * (lx > 0 ? 1 : -1)); pencil([[0, 0], [0, 46]], { w: 9, col: '#a89a84', pass2: false }); pop(); }
      ell(ox - 86, -84, 22, 18, { wash: '#c8bca8', washA: 1, w: 1.8, col: L }); pencil([[ox - 86, -100], [ox - 120, -130]], { w: 4, col: '#e8e0d0', pass2: false }); pencil([[ox - 86, -100], [ox - 60, -136]], { w: 4, col: '#e8e0d0', pass2: false }); }
    rect(-90, -110, 200, 60, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let k = 0; k < 6; k++) ell(-70 + k * 34, -116, 16, 12, { wash: '#6a8a3a', washA: 1, w: 1.4, col: L });   // бочки/кочаны
    for (const wx of [-60, 80]) { ell(wx, -40, 40, 40, { wash: '#6a4428', washA: 0.3, w: 3, col: L }); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI + t * 2; pencil([[wx, -40], [wx + Math.cos(a) * 38, -40 + Math.sin(a) * 38]], { w: 2, col: L, pass2: false }); } }
    pop();
  }
  function sheep(x, y, s, t, seed) { push(x, y, s); const b = Math.sin(t * 3 + seed) * 2; for (let i = 0; i < 6; i++) { const r = rng(seed + i); ell(-30 + r() * 60, -40 - r() * 20 + b, 22, 18, { wash: '#f2ece0', washA: 1, w: 1.4, col: '#4a3a2a' }); } ell(40, -46 + b, 12, 14, { wash: '#2a2a2a', washA: 1, line: false }); for (const lx of [-20, 20]) pencil([[lx, -24], [lx, 0]], { w: 5, col: '#2a2a2a', pass2: false }); pop(); }
  function walnut(t) {                            // ореховое дерево над столом
    shape(tubeP([[60, 1500], [40, 1100], [90, 800], [160, 620]], 70, 30), { wash: '#5a4232', washA: 1, w: 2.4, col: '#2a1a10' }); hatch(pathOf([[20, 1500], [100, 1500], [190, 620], [130, 620]]), [20, 620, 190, 1500], { gap: 8, a: 0.2, col: '#2a1a10', ang: 0.2, key: 9930 });
    shape(tubeP([[90, 820], [300, 700], [480, 640]], 28, 10), { wash: '#5a4232', washA: 1, w: 2, col: '#2a1a10' });
    for (let k = 0; k < 16; k++) { const r = rng(9931 + k), cx = -100 + r() * 700, cy = 380 + r() * 330; const b = ell(cx, cy, 120, 80, { wash: lerpC('#5a8a3a', '#2e5a22', r()), washA: 0.97, w: 1.8, col: '#1e3014' }); shadeG(b.path, cx, cy - 80, cx, cy + 80, '#1e3a14', 0.5);
      for (let q = 0; q < 6; q++) { const lx = cx + (r() - 0.5) * 180, ly = cy + (r() - 0.5) * 100; pencil([[lx - 10, ly + 4], [lx, ly - 6], [lx + 10, ly + 4]], { w: 2, col: '#a8c870', a: 0.6, pass2: false }); } }
  }
  function deal(t) {                              // стол сделки: грамота с печатью, кошель, монеты; продавцы и пыркэлаб
    const L = '#2a1a0e';
    const sell0 = t > EV.by_sell;
    human(660, 1330, 0.62, t, { body: '#efe6d0', bodyD: '#a89a7a', belt: '#a8302a', hat: 'fur', hatCol: '#2a2420', hair: '#3a2a1a', beard: 'short', face: t > EV.by_count ? 'grin' : 'calm', armL: t > EV.by_count ? 'up' : 'down', armR: 'hold', seed: 932, look: 0.6 });
    human(770, 1320, 0.58, t, { body: '#8a6a4a', bodyD: '#4a3420', belt: '#2a1a10', hat: 'fur', hatCol: '#5a4030', hair: '#6a6a6a', beard: 'long', face: t > EV.by_count ? 'shock' : 'calm', armR: t > EV.by_count ? 'point' : 'down', seed: 933, look: 0.8 });
    // стол
    rect(480, 1290, 520, 24, { wash: '#8a5a32', washA: 1, w: 2.4, col: L }); for (const lx of [510, 970]) pencil([[lx, 1314], [lx, 1440]], { w: 12, col: '#6a4428', pass2: false });
    poly([[470, 1290], [1010, 1290], [990, 1270], [490, 1270]], { wash: '#efe2c4', washA: 0.9, w: 1.6, col: L });   // скатерть
    // грамота
    push(600, 1268, 1, -0.06); rect(-80, -20, 160, 24, { wash: '#efe0b8', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) pencil([[-66, -14 + q * 5], [60, -14 + q * 5]], { w: 1.2, col: '#5a3a14', a: 0.7, pass2: false });
    pencil([[40, 4], [44, 60]], { w: 2, col: '#a8302a', pass2: false }); const sk = popK(t, EV.by_pile, 0.3); push(44, 72, 0.8 + 0.4 * sk); ell(0, 0, 22, 22, { wash: '#a8302a', washA: 1, w: 2, col: '#4a0a08' }); pencil(ellPts(0, 0, 13, 13, 0, 0.05, 20), { w: 2, col: '#5a0a08', a: 0.7, pass2: false }); txt('Ш', 0, 2, 16, { font: 'Osw', col: '#5a0a08' }); pop(); pop();
    // монеты: сыплются из кошеля, горка растёт; счётчик над столом
    const n = Math.floor(120 * sm(fade(t, EV.by_count - 0.1, EV.by_pile + 0.1)));
    for (let i = 0; i < Math.min(n, 60); i++) { const r = rng(9940 + i), x = 850 + (r() - 0.5) * 90 * (1 - i / 80), y = 1266 - Math.floor(i / 8) * 7 - r() * 4; ell(x, y, 14, 5, { wash: '#d8dce0', washA: 1, w: 1.2, col: '#4a4a50' }); pencil([[x - 8, y - 1], [x + 6, y - 1]], { w: 1, col: '#fff', a: 0.7, pass2: false }); }
    if (t > EV.by_count - 0.1 && t < EV.by_pile + 0.3) for (let i = 0; i < 8; i++) { const ph = (t * 3 + i / 8) % 1, r = rng(9960 + i); push(880 + (r() - 0.5) * 40, 1120 + ph * 140, 1, ph * 8); ell(0, 0, 14, 14 * Math.abs(Math.cos(ph * 9)), { wash: '#e8ecf0', washA: 1, w: 1.2, col: '#4a4a50' }); pop(); }
    // люди
    const sell = t > EV.by_sell;
    human(1010, 1420, 0.86, t, { body: '#6a1a2a', bodyD: '#3a0a14', trim: '#d6a842', belt: '#d6a842', hat: 'fur', hatCol: '#4a3020', hair: '#2a1a10', beard: 'long', face: t > EV.by_cheap ? 'smile' : 'calm', armR: sell ? 'hold' : 'hips', armL: 'hips', long: 1, seed: 931, flip: -1, look: -0.5 });
    // кошель в руке пыркэлаба
    push(960, 1215, 1, sell ? -0.6 : 0); blob([[-26, 0], [-20, -40], [0, -50], [20, -40], [26, 0], [0, 10]], { wash: '#7a4a28', washA: 1, w: 2, col: L }); pencil([[-14, -40], [14, -40]], { w: 3, col: '#d6a842', pass2: false }); pop();
  }

  WORLD.boyar = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => codri(t));
    lay(6, () => { church(840, 1220, 0.8, t); hut(140, 1230, 260, 130, t, 9971, 1); hut(520, 1210, 220, 110, t, 9972, 0); hut(1120, 1240, 260, 130, t, 9973, 1); wattle(-100, 420, 1250); wattle(640, 1000, 1240);
      sheep(380, 1260, 0.6, t, 9975); sheep(440, 1270, 0.55, t, 9976); sheep(300, 1268, 0.5, t, 9977); oxCart(1000, 1290, t); haze('#e8e0c0', 0.08); });
    lay(2.6, () => { poly([[-600, 1250], [1700, 1230], [1700, 2400], [-600, 2400]], { wash: '#a8a060', washA: 1, line: false }); vgrad(1230, 1900, ['#a8a868', '#8a8a4a', '#6a6a38']);
      for (let i = 0; i < 40; i++) { const r = rng(9980 + i), x = -300 + r() * 1700, y = 1260 + r() * 400; pencil([[x, y], [x + 4, y - 20 - r() * 20]], { w: 2, col: '#5a6a2a', pass2: false }); }
      wellCrane(160, 1330, t); });
    lay(1.3, () => { walnut(t); deal(t); });
    lay(1, () => cat());
    lay(0.6, () => { for (let i = 0; i < 18; i++) { const r = rng(9990 + i), x = -60 + i * 70; pencil([[x, 2000], [x + Math.sin(t * 2 + i) * 12, 1820 - r() * 80]], { w: 4, col: '#4a5a2a', pass2: false }); } ell(1000, 1900, 90, 40, { wash: '#8a8a7a', washA: 1, w: 2.4, col: '#2a2a20' });
      push(120, 1880, 1.4); const bk = blob([[-80, 0], [-90, -70], [90, -70], [80, 0]], { wash: '#b88a4a', washA: 1, w: 2.4, col: '#3a2410' }); hatch(bk.path, bk.bb, { gap: 7, a: 0.4, col: '#6a4420', ang: 0.8, key: 9995 }); hatch(bk.path, bk.bb, { gap: 7, a: 0.3, col: '#6a4420', ang: -0.8, key: 9996 });
      for (let q = 0; q < 24; q++) { const r = rng(9997 + q); ell(-70 + r() * 140, -76 - r() * 40, 11, 12, { wash: r() < 0.5 ? '#5a1a3a' : '#7a2a4a', washA: 1, w: 1.2, col: '#1a0a14' }); } blob([[-30, -110], [0, -140], [30, -120], [0, -100]], { wash: '#5a8a2e', washA: 1, w: 1.6, col: '#1e3a14' }); pop();
      push(900, 1830, 1.2); const jg = blob([[-40, 0], [-50, -60], [-30, -110], [-20, -140], [20, -140], [30, -110], [50, -60], [40, 0]], { wash: '#b0583a', washA: 1, w: 2.4, col: '#3a1a0a' }); shadeG(jg.path, 40, 0, -40, 0, '#5a2a14', 0.5); pencil(spline([[30, -120], [70, -100], [44, -50]], false, 6), { w: 7, col: '#b0583a', pass2: false }); pencil([[-46, -70], [46, -70]], { w: 2, col: '#efe2c4', a: 0.7, pass2: false }); pop(); });
    motes(24, [0, 300, W, 1600], '#fff6d8', t, 57, { sp: 6, sz: 2, a: 0.45, tw: 1, add: 1 });
  };

  DIR.boyar = {
    outfit: 'knyaz', light: { side: 1, rim: '#ffe8b8' }, grade: ['#7a5a2a', 0.12],
    act: () => [[S0.boyar, 'talk'], [EV.by_sell, 'sideeye'], [EV.by_count, 'awe'], [EV.by_pile, 'suspicious'], [EV.by_cheap, 'smug']],
    pose: (t, u, b) => {
      const o = { x: 300, y: GY + 80, s: 1.02, look: [0.6, -0.1] };
      if (t > EV.by_count && t < EV.by_cheap) { o.look = [0.8, -0.2]; o.hand = [120, -300]; o.prop = 'coin'; }
      if (t >= EV.by_cheap) { o.look = [0, 0.05]; o.hand = [100, -320]; o.prop = 'coin'; o.tilt = 0.06; }
      return Object.assign(b, o);
    },
    cam: () => [[S0.boyar, 560, 1060, 0.02], [EV.by_sell, 600, 1080, 0.06], [EV.by_count, 700, 1120, 0.1], [EV.by_pile, 680, 1120, 0.1], [EV.by_cheap, 520, 1140, 0.16, 'x'], [S1.boyar, 520, 1140, 0.18]],
    hud: t => {
      if (t > EV.by_count && t < S1.boyar + 0.2) { const n = Math.floor(120 * sm(fade(t, EV.by_count - 0.1, EV.by_pile + 0.1))), k = popK(t, EV.by_count, 0.3); push(820, 760, k, 0.04); ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        ctx.font = '600 120px Osw'; ctx.lineWidth = 20; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText(String(n), 0, 0); ctx.fillStyle = '#e8ecf0'; ctx.fillText(String(n), 0, 0);
        ctx.font = '600 38px Osw'; ctx.lineWidth = 9; ctx.strokeText('ТАТАРСКИХ МОНЕТ', 0, 80); ctx.fillStyle = '#f6ecd6'; ctx.fillText('ТАТАРСКИХ МОНЕТ', 0, 80); ctx.restore(); pop(); }
      if (t > EV.by_cheap) note('= целый Кишинёв', 820, 930, t, EV.by_cheap, S1.boyar + 0.2, '#fff6dc', 50, -0.04);
    }
  };

  // ---------------------------------------------------------------- переход В сцену: бивень вращается и превращается в монету, монета-вспышка открывает сцену
  TRANS_IN.boyar = { a: 0.25, b: 0.45, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 600, cy = 980;
    if (k < 0.55) drawBuf(A, 1 + q * 0.1); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.55) / 0.45));
    scr(() => {
      if (k < 0.35) { const a = k / 0.35; push(cx, cy, 1 + a, a * 9); const T = [[-60, -120], [-70, -20], [-30, 80], [40, 120]]; shape(tubeP(spline(T, false, 6), 40 * (1 - a * 0.5), 12), { wash: '#f4ead4', washA: 1, w: 3, col: '#3a2a1a' }); pop(); }
      else if (k < 0.75) { const a = (k - 0.35) / 0.4, R = lerp(90, 1300, Math.pow(a, 2.2)), sq = Math.abs(Math.cos(a * 14)); push(cx, cy, 1);
        const c = ell(0, 0, R * Math.max(0.08, sq), R, { wash: '#d8dce0', washA: 1, w: 4, col: '#3a3a40' }); if (sq > 0.3) { pencil(ellPts(0, 0, R * sq * 0.8, R * 0.8, 0, 0.05, 40), { w: 3, col: '#6a6a70', a: 0.6, pass2: false }); txt('◈', 0, 10, R * 0.5 * sq + 10, { col: '#7a7a80', a: 0.7 }); }
        glow(0, 0, R * 0.6, 'rgba(255,255,255,1)', 0.3); pop(); }
      else whiteOut((1 - (k - 0.75) / 0.25) * 0.85, '230,234,240');
    });
  } };
})();
