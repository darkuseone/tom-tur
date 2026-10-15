/* 002 — сцена `white`: 1366–1368, Дмитрий Донской ставит белокаменный Кремль на Боровицком холме.
   Стены и приземистые башни из местного известняка (каменноугольное море!), деревянные кровли-заборола, леса, каменотёсы,
   телега с блоком, лодьи с камнем по Москве-реке, печь для извести. Том в кольчуге тешет блок — на сколе морская лилия.
   Переход В сцену — удар молота: вспышка и облако известковой пыли, которое сдувает ветром. */
(() => {
  // ------------------------------------------------------------------ события (всё от реплики w1)
  EV.white_don = LS('w1');                                       // «Дмитрий Донской» — Том показывает на князя, конь встаёт на дыбы
  EV.white_rear = LS('w1') + 0.45;
  EV.white_build = WT('w1', 'строит');                           // «строит Кремль» — Том берёт зубило: тук-тук
  EV.white_hit1 = EV.white_build + 0.18;
  EV.white_hit2 = EV.white_build + 0.62;
  EV.white_stone = WT('w1', 'белого');                           // «белого камня» — восторг, солнце на стенах
  EV.white_sly = WT('w1', 'Того');                               // «Того самого» — хитрый прищур, третий удар
  EV.white_hit3 = EV.white_sly + 0.35;
  EV.white_chip = WT('w1', 'морского') + 0.04;                   // «морского!» — откол, в камне светится морская лилия
  SHAKES.push([EV.white_hit1, 0.14, 6], [EV.white_hit2, 0.14, 6], [EV.white_hit3, 0.14, 5], [EV.white_chip, 0.3, 12]);
  KEYW.push('Донской', 'Кремль', 'белого', 'камня.', 'морского!');

  const ST = '#efe8d6', STD = '#b8ab8e', STL = '#fffaf0', LN = '#3a3226', WOOD = '#7a5432', WOODD = '#3a2412';
  const hits = [EV.white_hit1, EV.white_hit2, EV.white_hit3, EV.white_chip];
  const lastHit = t => { let h = -9; for (const x of hits) if (t >= x) h = x; return h; };

  // ------------------------------------------------------------------ помощники
  function stoneCourses(x, y0, w, h, seed, lw = 1.4) {           // кладка белого камня: ряды с перевязкой
    const r = rng(seed); let row = 0;
    for (let y = y0 + 26; y < y0 + h - 4; y += 26, row++) {
      pencil([[x, y], [x + w, y + (r() - 0.5) * 2]], { w: lw, col: '#8a7e64', a: 0.55, pass2: false, gap: false });
      for (let xx = x + (row % 2 ? 20 : 46); xx < x + w - 6; xx += 52 + r() * 14) pencil([[xx, y - 26], [xx + 1, y]], { w: lw, col: '#8a7e64', a: 0.45, pass2: false, gap: false });
    }
  }
  function wall(x0, x1, top, base, seed) {                       // прясло: белая стена, зубцы, деревянная кровля-заборола
    const w = x1 - x0, p = rect(x0, top, w, base - top, { wash: ST, washA: 1, w: 2.4, col: LN });
    const g = ctx.createLinearGradient(0, top, 0, base); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(120,100,70,0.35)'); ctx.fillStyle = g; ctx.fillRect(x0, top, w, base - top);
    stoneCourses(x0, top, w, base - top, seed);
    for (let xx = x0 + 6; xx < x1 - 20; xx += 40) rect(xx, top - 26, 24, 26, { wash: ST, washA: 1, w: 1.8, col: LN });
    poly([[x0 - 10, top - 26], [x1 + 10, top - 26], [x1 + 4, top - 58], [x0 - 4, top - 58]], { wash: WOOD, washA: 1, w: 2, col: WOODD });          // заборола
    poly([[x0 - 14, top - 56], [x1 + 14, top - 56], [x1 - 6, top - 84], [x0 + 6, top - 84]], { wash: '#5a3a1e', washA: 1, w: 2, col: WOODD, shade: { gap: 5, a: 0.35, col: '#1a0e04', ang: 1.45 } });
    for (let xx = x0; xx < x1; xx += 22) pencil([[xx, top - 56], [xx + 4, top - 30]], { w: 1.2, col: WOODD, a: 0.6, pass2: false });
    return p;
  }
  function tower(x, base, w, h, o = {}) {                       // приземистая башня: бойницы, ворота, низкая деревянная кровля
    const top = base - h;
    rect(x - w / 2, top, w, h, { wash: ST, washA: 1, w: 2.8, col: LN });
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, 'rgba(255,250,235,0.3)'); g.addColorStop(0.6, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(110,90,60,0.4)'); ctx.fillStyle = g; ctx.fillRect(x - w / 2, top, w, h);
    stoneCourses(x - w / 2, top, w, h, x | 0, 1.3);
    for (let yy = top + 50; yy < base - 60; yy += 90) for (const dx of [-w * 0.22, w * 0.22]) rect(x + dx - 5, yy, 10, 30, { wash: '#3a3020', washA: 1, w: 1.4 });
    if (o.gate) { const gw = w * 0.42; shape([[x - gw / 2, base], [x - gw / 2, base - 90], [x, base - 126], [x + gw / 2, base - 90], [x + gw / 2, base]], { wash: '#4a3420', washA: 1, w: 2.4, col: LN }); for (let q = 1; q < 4; q++) pencil([[x - gw / 2 + q * gw / 4, base - 110], [x - gw / 2 + q * gw / 4, base]], { w: 1.6, col: '#1a0e04', pass2: false }); }
    for (let xx = x - w / 2 + 4; xx < x + w / 2 - 14; xx += 30) rect(xx, top - 22, 18, 22, { wash: ST, washA: 1, w: 1.6, col: LN });
    poly([[x - w / 2 - 12, top - 22], [x + w / 2 + 12, top - 22], [x + w / 2 + 6, top - 62], [x - w / 2 - 6, top - 62]], { wash: WOOD, washA: 1, w: 2, col: WOODD });
    poly([[x - w / 2 - 22, top - 60], [x + w / 2 + 22, top - 60], [x + 8, top - 60 - (o.roof || 80)], [x - 8, top - 60 - (o.roof || 80)]], { wash: '#5a3a1e', washA: 1, w: 2.4, col: WOODD, shade: { gap: 5, a: 0.4, col: '#1a0e04', ang: 1.2 } });
    for (let q = -3; q <= 3; q++) pencil([[x + q * (w / 7 + 3), top - 60], [x + q * 2, top - 56 - (o.roof || 80)]], { w: 1.2, col: WOODD, a: 0.5, pass2: false });
  }
  function church(x, base, s) {                                 // белокаменный собор с шлемовидной главой
    push(x, base, s);
    rect(-60, -130, 120, 130, { wash: '#f4eee0', washA: 1, w: 2, col: LN });
    for (const dx of [-40, 0, 40]) shape([[dx - 16, -130], [dx - 16, -150], [dx, -168], [dx + 16, -150], [dx + 16, -130]], { wash: '#f4eee0', washA: 1, w: 1.8, col: LN });
    rect(-24, -220, 48, 60, { wash: '#f4eee0', washA: 1, w: 2, col: LN }); for (const dx of [-12, 12]) rect(dx - 3, -210, 6, 22, { wash: '#3a3020', washA: 1, w: 1 });
    blob([[-30, -220], [-28, -250], [0, -276], [28, -250], [30, -220]], { wash: '#c8a040', washA: 1, w: 2, col: '#4a3008' }); glow(-8, -250, 22, 'rgba(255,240,180,1)', 0.6);
    line([[0, -276], [0, -306]], { w: 2.4, col: '#4a3008', smooth: false }); line([[-10, -294], [10, -294]], { w: 2.4, col: '#4a3008', smooth: false });
    pop();
  }
  function scaffold(x0, x1, y0, y1, t) {                         // леса из жердей + ворот, тянущий блок
    for (let x = x0; x <= x1; x += 60) pencil([[x, y1], [x + 4, y0]], { w: 3.4, col: '#6a4a26', pass2: false });
    for (let y = y1 - 70; y > y0; y -= 80) { pencil([[x0 - 10, y], [x1 + 10, y + 2]], { w: 3, col: '#6a4a26', pass2: false }); rect(x0, y - 8, x1 - x0, 8, { wash: '#a8804a', washA: 1, w: 1.2, col: WOODD }); }
    for (let x = x0; x < x1; x += 60) pencil([[x, y1 - 70], [x + 60, y1 - 150]], { w: 1.6, col: '#6a4a26', a: 0.7, pass2: false });
    pencil([[x1 - 20, y0 - 10], [x1 + 70, y0 - 10]], { w: 4, col: '#5a3a1e', pass2: false });
    const hy = lerp(y1 - 20, y0 + 20, (t * 0.18) % 1);
    pencil([[x1 + 60, y0 - 10], [x1 + 60, hy]], { w: 1.4, col: '#2a2010', pass2: false, gap: false });
    rect(x1 + 40, hy, 40, 26, { wash: ST, washA: 1, w: 1.6, col: LN });
    for (let i = 0; i < 2; i++) { const wx = x0 + 40 + i * 120, wy = y0 + 70 + i * 80; ell(wx, wy - 24, 6, 6, { wash: '#d8b090', washA: 1, w: 1 }); poly([[wx - 8, wy - 18], [wx + 8, wy - 18], [wx + 6, wy + 6], [wx - 6, wy + 6]], { wash: i ? '#8a3a2a' : '#4a5a7a', washA: 1, w: 1.2 }); line([[wx + 6, wy - 14], [wx + 18, wy - 24 + Math.sin(t * 8 + i) * 8]], { w: 2, smooth: false }); }
  }
  function boat(x, y, s, t, k) {                                 // лодья с белыми блоками и гребцом
    push(x, y + Math.sin(t * 2 + k) * 3, s);
    poly([[-110, -20], [110, -20], [86, 12], [-90, 12]], { wash: '#5a3a1e', washA: 1, w: 2.4, col: WOODD });
    pencil([[-106, -12], [104, -12]], { w: 1.6, col: '#a8804a', pass2: false });
    for (let q = 0; q < 3; q++) rect(-70 + q * 44, -48, 40, 28, { wash: ST, washA: 1, w: 1.6, col: LN });
    ell(70, -60, 8, 8, { wash: '#d8b090', washA: 1, w: 1.2 }); poly([[60, -52], [80, -52], [78, -20], [62, -20]], { wash: '#a8302a', washA: 1, w: 1.2 });
    const oa = Math.sin(t * 3 + k) * 0.4; line([[70, -40], [70 + Math.cos(0.8 + oa) * 90, -40 + Math.sin(0.8 + oa) * 70]], { w: 3, col: '#3a2410', smooth: false });
    pop();
  }
  function mason(x, y, t, k, ph) {                               // каменотёс на колене бьёт киянкой
    const sw = Math.max(0, Math.sin(t * 7 + ph)), hit = Math.sin(t * 7 + ph) < -0.85;
    push(x, y, 1, 0, k);
    rect(30, -60, 110, 60, { wash: ST, washA: 1, w: 2, col: LN }); stoneCourses(30, -60, 110, 60, k * 9 + 3);
    poly([[-40, 0], [-34, -60], [-50, -110], [-14, -150], [20, -140], [26, -60], [10, 0]], { wash: k > 0 ? '#e6dcc4' : '#c8b896', washA: 1, w: 2.4, col: '#2a2010', shade: { gap: 6, a: 0.25, col: '#6a5a3a', ang: 1.3 } });
    pencil([[-38, -80], [24, -84]], { w: 4, col: '#8a2a1e', pass2: false });
    ell(-14, -172, 22, 24, { wash: '#d8a882', washA: 1, w: 2, col: '#2a140a' }); blob([[-30, -176], [-28, -138], [-12, -128], [2, -146], [0, -166]], { wash: '#6a4a2a', washA: 1, w: 1.6 });
    blob([[-34, -186], [-14, -204], [8, -190], [4, -180], [-30, -180]], { wash: '#e8e0cc', washA: 1, w: 1.6 });
    const ax = 40 + sw * 10, ay = -110 - sw * 60;
    line([[14, -130], [ax, ay + 20], [ax + 20, ay]], { w: 14, col: k > 0 ? '#e6dcc4' : '#c8b896' });
    push(ax + 20, ay, 1, -0.6 - sw * 0.9); rect(-4, -40, 8, 44, { wash: WOOD, washA: 1, w: 1.4 }); rect(-16, -58, 32, 22, { wash: '#8a6a40', washA: 1, w: 1.8 }); pop();
    if (hit) for (let i = 0; i < 8; i++) { const r = rng(hsh(FRAME, i, k * 5)); glow(60 + r() * 40, -70 - r() * 50, 16 + r() * 18, 'rgba(255,252,240,1)', 0.6, 'source-over'); }
    pop();
  }
  function kiln(x, y, t) {                                       // печь для обжига извести: купол, жар в устье, столб дыма
    push(x, y, 1);
    blob([[-90, 0], [-84, -80], [-40, -130], [40, -130], [84, -80], [90, 0]], { wash: '#a8977a', washA: 1, w: 2.4, col: LN, shade: { gap: 6, a: 0.3, col: '#4a3a24', ang: 1.2 } });
    shape([[-28, 0], [-28, -40], [0, -60], [28, -40], [28, 0]], { wash: '#2a1408', washA: 1, w: 2 });
    glow(0, -24, 80, 'rgba(255,140,40,1)', 0.7 * (0.8 + 0.2 * Math.sin(t * 13))); blob([[-18, 0], [-10, -30], [4, -46], [14, -24], [20, 0]], { wash: '#ff9a2a', washA: 0.9, line: false });
    for (let i = 0; i < 9; i++) { const ph = (t * 0.22 + i / 9) % 1; ctx.save(); ctx.globalAlpha = 0.5 * (1 - ph); ctx.fillStyle = i % 2 ? '#8a8478' : '#a8a296'; ctx.beginPath(); ctx.ellipse(10 + ph * 260 + Math.sin(t + i) * 14, -140 - ph * 700, 30 + ph * 110, 24 + ph * 80, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
    pop();
  }
  function cart(x, y, t) {                                       // лошадка тянет телегу с белым блоком
    push(x, y, 1);
    const st = t * 5;
    rect(30, -70, 180, 22, { wash: WOOD, washA: 1, w: 2, col: WOODD }); rect(56, -138, 120, 68, { wash: ST, washA: 1, w: 2.2, col: LN }); stoneCourses(56, -138, 120, 68, 77);
    for (const wx of [70, 180]) { ell(wx, -36, 34, 34, { w: 3, col: WOODD }); for (let q = 0; q < 4; q++) { const a = q * 0.785 + st * 0.6; pencil([[wx - Math.cos(a) * 32, -36 - Math.sin(a) * 32], [wx + Math.cos(a) * 32, -36 + Math.sin(a) * 32]], { w: 2, col: WOODD, pass2: false }); } }
    pencil([[30, -60], [-60, -84]], { w: 3, col: WOODD, pass2: false });
    blob([[-200, -70], [-190, -120], [-70, -126], [-40, -100], [-50, -64], [-180, -60]], { wash: '#8a6a4a', washA: 1, w: 2.4, col: '#2a1a0c' });
    line([[-180, -114], [-220, -170], [-240, -170]], { w: 26, col: '#8a6a4a' }); ell(-250, -166, 22, 14, { wash: '#8a6a4a', washA: 1, w: 2, rot: 0.4 });
    for (let q = 0; q < 4; q++) { const lx = [-180, -160, -70, -52][q], ph = Math.sin(st + q * 1.6) * 12; line([[lx, -66], [lx + ph, -30], [lx + ph * 0.6, 0]], { w: 9, col: '#6a4a2a' }); }
    line([[-46, -96], [-20, -60 + Math.sin(t * 3) * 6]], { w: 10, col: '#3a2a1a' });
    pop();
  }
  function prince(x, y, t) {                                     // Дмитрий Иванович, 17 лет: конь, корзно, шишак, стяг со Спасом
    const rear = clamp((t - EV.white_rear) / 0.25) * (1 - clamp((t - EV.white_rear - 0.7) / 0.35)), ra = -0.22 * sm(rear);
    push(x, y, 1);
    push(-30, -120, 1, ra);
    const tl = Math.sin(t * 3) * 10, hb = Math.sin(t * 2.2) * 4;
    line([[130, -70], [176, -40 + tl], [186, 30 + tl]], { w: 22, col: '#b8b2a6' }); pencil([[130, -70], [176, -40 + tl], [186, 30 + tl]], { w: 2, col: '#2a2420' });
    for (let q = 0; q < 4; q++) { const fr = q < 2, lx = [-120, -88, 84, 112][q], dx = fr ? -rear * 60 : 0, dy = fr ? -rear * 70 : 0;
      line([[lx, -30], [lx + 2 + dx * 0.4, 40 + dy * 0.5], [lx + dx * 0.9, 74 + dy], [lx + dx, 116 + dy]], { w: q % 2 ? 20 : 24, col: q % 2 ? '#cfc9bc' : '#e6e1d6' }); pencil([[lx - 11, -20], [lx - 11 + dx * 0.4, 40 + dy * 0.5], [lx - 11 + dx, 110 + dy]], { w: 1.8, col: '#2a2420', a: 0.8 });
      rect(lx - 13 + dx, 108 + dy, 26, 14, { wash: '#3a3430', washA: 1, w: 1.6 }); }
    blob([[-150, -60], [-130, -126], [-20, -140], [110, -132], [160, -96], [160, -30], [110, 0], [-110, 0], [-150, -20]], { wash: '#ece8de', washA: 1, w: 3, col: '#2a2420', shade: { gap: 7, a: 0.2, col: '#7a7468', ang: 1.3 } });
    poly([[-70, -134], [70, -136], [80, -6], [-60, -4]], { wash: '#a8261e', washA: 0.92, w: 2, col: '#3a0a06' });                         // попона
    for (let q = 0; q < 5; q++) pencil([[-64 + q * 32, -4], [-58 + q * 32, 4]], { w: 3, col: '#e8c050', pass2: false });
    push(-130, -110 + hb, 1, -rear * 0.2);
    blob([[30, 10], [0, -50], [-40, -100], [-84, -128], [-112, -116], [-100, -76], [-64, -36], [-30, 34]], { wash: '#ece8de', washA: 1, w: 3, col: '#2a2420' });
    blob([[-76, -134], [-112, -142], [-162, -104], [-186, -72], [-176, -50], [-146, -56], [-104, -86]], { wash: '#e6e1d6', washA: 1, w: 2.8, col: '#2a2420', shade: { gap: 6, a: 0.18, col: '#7a7468', ang: 1.2 } });
    ell(-178, -62, 4, 3, { wash: '#1a1410', washA: 1, w: 1 }); ell(-122, -116, 6, 5, { wash: '#1a1410', washA: 1, w: 1.2 }); pencil([[-182, -52], [-160, -50]], { w: 2, col: '#2a2420', pass2: false });
    for (const ex of [-88, -100]) poly([[ex, -136], [ex + 2, -172], [ex + 14, -140]], { wash: '#dcd6ca', washA: 1, w: 2, col: '#2a2420' });
    for (let q = 0; q < 7; q++) line([[-84 + q * 16, -132 + q * 20], [-70 + q * 16 + Math.sin(t * 4 + q) * 6, -122 + q * 20]], { w: 8, col: '#9a948a' });   // грива
    line([[-150, -76], [-90, -60], [-10, -90]], { w: 2.4, col: '#5a2a10', smooth: false });                                                   // повод
    pop();
    // всадник
    poly([[-30, -120], [-40, -230], [-10, -270], [30, -270], [50, -230], [40, -120]], { wash: '#8a8e96', washA: 1, w: 2.6, col: '#1a1a20' });
    for (let yy = -250; yy < -130; yy += 12) pencil([[-34, yy], [40, yy + 2]], { w: 1, col: '#3a3e46', a: 0.6, pass2: false, gap: false });   // кольчуга
    blob([[24, -270], [70, -250], [96, -140], [60, -100], [40, -160]], { wash: '#b82a20', washA: 1, w: 2.4, col: '#3a0a06' });                // корзно
    ell(4, -300, 24, 28, { wash: '#e6b890', washA: 1, w: 2.2, col: '#2a140a' }); ell(-6, -304, 3, 3, { wash: '#1a0e06', washA: 1, w: 1 });
    poly([[-22, -310], [26, -310], [10, -350], [2, -370], [-8, -350]], { wash: '#9aa0a8', washA: 1, w: 2.2, col: '#1a1a20' }); glow(-4, -340, 14, 'rgba(255,255,255,1)', 0.6);   // шишак
    poly([[-22, -312], [-24, -282], [-10, -270], [-8, -310]], { wash: '#7a7e86', washA: 1, w: 1.4 });                                           // бармица
    pencil([[-20, -280], [-4, -278]], { w: 2, col: '#7a4a30', pass2: false });
    // стяг
    const px = -50, top = -560;
    line([[-30, -200], [px, -170]], { w: 12, col: '#8a8e96' });
    pencil([[px, -40], [px + 6, top]], { w: 6, col: '#4a2a12', pass2: false });
    poly([[px - 8, top - 10], [px + 6, top - 40], [px + 18, top - 10]], { wash: '#c8a040', washA: 1, w: 1.6 });
    const fp = []; for (let i = 0; i <= 12; i++) { const k = i / 12; fp.push([px + 6 - k * 220, top + 10 + Math.sin(t * 6 - k * 5) * 18 * k + k * 40]); }
    const bp = fp.concat(fp.slice().reverse().map(([bx, by], i) => [bx, by + lerp(150, 110, 1 - i / 12)]));
    shape(bp.concat([bp[0]]), { wash: '#b0201a', washA: 1, w: 2.6, col: '#3a0806', shade: { gap: 6, a: 0.2, col: '#3a0806', ang: 1.0 } });
    const cx = px - 90, cy = top + 82 + Math.sin(t * 6 - 2) * 9;
    ell(cx, cy, 34, 34, { wash: '#e8c050', washA: 1, w: 2, col: '#5a3a08' }); ell(cx, cy + 4, 18, 22, { wash: '#e6c098', washA: 1, w: 1.6, col: '#5a3a08' });
    for (const dx of [-6, 6]) ell(cx + dx, cy, 2, 2, { wash: '#3a2008', washA: 1, w: 1 }); blob([[cx - 16, cy + 6], [cx, cy + 30], [cx + 16, cy + 6]], { wash: '#7a5020', washA: 1, w: 1.2 });
    pop(); pop();
  }
  function bigBlock(x, y, t) {                                   // блок-известняк у Тома: зубило лежит, трещины по ударам, откол и окаменелость
    const ch = EV.white_chip, chipped = t >= ch, gl = chipped ? clamp((t - ch) / 0.25) : 0;
    push(x, y, 1);
    const w = 300, h = 190;
    poly([[-w / 2, 0], [-w / 2, -h], [-w / 2 + 50, -h - 40], [w / 2 + 50, -h - 40], [w / 2 + 50, -40], [w / 2, 0]], { wash: '#d8ceb6', washA: 1, w: 2.6, col: LN });
    poly([[-w / 2, -h], [-w / 2 + 50, -h - 40], [w / 2 + 50, -h - 40], [w / 2, -h]], { wash: STL, washA: 1, w: 2.2, col: LN });
    poly([[w / 2, 0], [w / 2, -h], [w / 2 + 50, -h - 40], [w / 2 + 50, -40]], { wash: '#b8ab8e', washA: 1, w: 2.2, col: LN, shade: { gap: 6, a: 0.3, col: '#6a5a3a', ang: 1.3 } });
    const fp = rect(-w / 2, -h, w, h, { wash: ST, washA: 1, w: 2.8, col: LN });
    hatch(fp.path, fp.bb, { gap: 9, a: 0.12, col: '#8a7a5a', ang: 0.6, key: 3 });
    // мелкие ракушки-включения (известняк!)
    for (let i = 0; i < 14; i++) { const r = rng(i * 13 + 2), sx = -w / 2 + 20 + r() * (w - 40), sy = -h + 20 + r() * (h - 40); if (sx > 40 && sy < -60) continue; pencil(ellPts(sx, sy, 5 + r() * 5, 3 + r() * 3, r() * 3, 0, 10), { w: 1.2, col: '#9a8a6a', a: 0.6, pass2: false, gap: false }); }
    // трещины от ударов
    const n = hits.filter(h0 => t >= h0).length;
    const cr = [[[-90, -h], [-70, -150], [-84, -120], [-60, -96]], [[-60, -96], [-20, -110], [10, -80]], [[10, -80], [50, -110], [86, -96]]];
    for (let i = 0; i < Math.min(3, n); i++) line(cr[i], { w: 2.4, col: '#4a3e2a', smooth: false });
    // откол: кусок улетает, под ним — морская лилия
    const cp = [[20, -h], [140, -h], [146, -60], [60, -40], [26, -110]];
    if (chipped) {
      shape(cp.concat([cp[0]]), { wash: '#9a8c6a', washA: 1, w: 3, col: LN, shade: { gap: 5, a: 0.35, col: '#4a3e26', ang: 1.1 } });
      glow(86, -110, 130, 'rgba(90,210,200,1)', 0.35 * gl * (0.8 + 0.2 * Math.sin(t * 6)));
      push(84, -100, 1.15, -0.2);
      for (let q = 0; q < 8; q++) ell(-4 + q * 1.5, 54 - q * 12, 9, 5, { wash: '#f2d27a', washA: 1, w: 2, col: '#3a2a08' });          // стебель-членики
      blob([[-14, -44], [-22, -60], [0, -70], [22, -60], [14, -44]], { wash: '#f2d27a', washA: 1, w: 2.4, col: '#3a2a08' });            // чашечка
      for (let q = -3; q <= 3; q++) { const a = -Math.PI / 2 + q * 0.28; const arm = [[Math.cos(a) * 14, -58 + Math.sin(a) * 8], [Math.cos(a) * 34 + q * 3, -62 + Math.sin(a) * 34], [Math.cos(a) * 42 + q * 7, -70 + Math.sin(a) * 50], [Math.cos(a) * 36 + q * 9, -78 + Math.sin(a) * 58]]; line(arm, { w: 7, col: '#3a2a08' }); line(arm, { w: 4, col: '#f2d27a', pass2: false }); for (let z = 1; z < 4; z++) pencil([[arm[z][0] - 5, arm[z][1]], [arm[z][0] + 5, arm[z][1] - 2]], { w: 1.2, col: '#3a2a08', pass2: false, gap: false }); }
      pop();
      ell(34, -60, 13, 10, { wash: '#f2d27a', washA: 1, w: 2, col: '#3a2a08' }); for (let q = -2; q <= 2; q++) pencil([[34, -54], [34 + q * 5, -68]], { w: 1, col: '#5a4a1a', pass2: false });   // брахиопода
      if (gl > 0) for (let i = 0; i < 10; i++) { const r = rng(hsh(FRAME, i, 7)); glow(30 + r() * 120, -180 + r() * 130, 6 + r() * 10, 'rgba(220,255,250,1)', 0.9 * gl); }
      // летящий кусок
      const fk = (t - ch) / 0.55; if (fk < 1) { push(80 + fk * 420, -120 - Math.sin(fk * Math.PI) * 140 + fk * fk * 260, 1, fk * 6); push(0, 0, 0.7); shape(cp.map(([a, b]) => [a - 80, b + 112]).concat([[cp[0][0] - 80, cp[0][1] + 112]]), { wash: '#d8ceb6', washA: 1, w: 2.4, col: LN, shade: { gap: 6, a: 0.3, col: '#6a5a3a', ang: 1.2 } }); pop(); pop(); }
    }
    // зубило и киянка лежат на блоке, пока Том их не взял
    if (t < EV.white_build) { push(-40, -h - 18, 1, -0.15); rect(-60, -6, 90, 12, { wash: '#7a7e86', washA: 1, w: 1.8, col: '#1a1a20' }); pop(); push(70, -h - 22, 1, 0.3); rect(-50, -5, 70, 10, { wash: WOOD, washA: 1, w: 1.6 }); rect(20, -16, 40, 32, { wash: '#8a6a40', washA: 1, w: 2 }); pop(); }
    pop();
  }
  function dustPuff(x, y, t0, t, n = 10, R = 120) {             // облачко каменной пыли и искры от удара
    const k = (t - t0) / 0.9; if (k < 0 || k > 1) return;
    for (let i = 0; i < n; i++) { const r = rng(i * 17 + (t0 * 100 | 0)), a = -Math.PI * r(), d = R * Math.sqrt(k) * (0.4 + r());
      ctx.save(); ctx.globalAlpha = 0.55 * (1 - k); ctx.fillStyle = '#f6f2e6'; ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7 - k * 40, 16 + k * 40 * r(), 0, 6.3); ctx.fill(); ctx.restore(); }
    if (k < 0.25) { for (let i = 0; i < 12; i++) { const r = rng(i * 7 + (t0 * 50 | 0)), a = -Math.PI * (0.1 + r() * 0.8), d = 30 + k * 4 * (60 + r() * 120); pencil([[x + Math.cos(a) * d * 0.6, y + Math.sin(a) * d * 0.6], [x + Math.cos(a) * d, y + Math.sin(a) * d]], { w: 2.4, col: '#ffd070', a: 1 - k * 4, pass2: false, gap: false }); } glow(x, y, 70, 'rgba(255,240,200,1)', 0.8 * (1 - k * 4)); }
  }

  // ------------------------------------------------------------------ мир
  WORLD.white = (t, u, cat) => {
    const sunK = clamp((t - EV.white_stone + 0.1) / 0.4) * (1 - clamp((t - EV.white_sly - 0.2) / 0.5));
    lay(40, () => {
      vgrad(-900, 1300, ['#7aa6c8', '#b8d2dc', '#f2e6c8']);
      glow(200, 520, 520, 'rgba(255,244,210,1)', 0.75); ctx.fillStyle = '#fff6dc'; ctx.beginPath(); ctx.arc(200, 520, 46, 0, 6.3); ctx.fill();
      for (let k = 0; k < 5; k++) { const x = ((k * 360 + t * 16) % 1800) - 300, y = 420 + (k % 3) * 90; for (let q = 0; q < 4; q++) glow(x + q * 60, y + Math.sin(q * 2) * 14, 90, 'rgba(255,252,244,1)', 0.45, 'source-over'); }
    });
    lay(16, () => { hills(900, 90, '#8a9a8a', 4, 0.9); const r = rng(12); for (let k = 0; k < 30; k++) { const x = -400 + k * 70 + r() * 30; sil([[x, 900], [x + 12, 870 - r() * 30], [x + 26, 900]], '#6a7a6a', 0.9); } });
    haze('#e8e2d0', 0.16);
    // Кремль на Боровицком холме
    lay(6, () => {
      sil([[-900, 1180], [-900, 960], [-200, 880], [300, 850], [800, 845], [1300, 880], [2000, 960], [2000, 1180]], '#7a8a52', 1);
      hatch(pathOf([[-600, 1180], [-600, 960], [300, 855], [1300, 880], [1700, 960], [1700, 1180]]), [-600, 840, 1700, 1180], { gap: 9, a: 0.25, col: '#3a4a20', ang: -0.4, key: 21 });
      line([[260, 1150], [280, 1000], [250, 900], [262, 860]], { w: 10, col: '#c8b890', a: 0.8 });                      // дорога к воротам
      church(480, 680, 1.15); church(700, 690, 0.95);
      wall(-500, -150, 700, 880, 1); wall(-150, 180, 680, 860, 2); wall(340, 740, 670, 850, 3); wall(900, 1180, 680, 860, 4);
      tower(-160, 900, 130, 360, { roof: 80 }); tower(260, 870, 170, 400, { gate: 1, roof: 100 }); tower(820, 865, 150, 370, { roof: 80 });
      // недостроенное прясло справа: уступы + леса
      poly([[1180, 860], [1180, 740], [1260, 740], [1260, 800], [1340, 800], [1340, 860]], { wash: ST, washA: 1, w: 2.2, col: LN }); stoneCourses(1180, 740, 160, 120, 9);
      scaffold(745, 895, 430, 865, t);
      for (const [lx, ly] of [[1190, 740], [1270, 800]]) dustPuff(lx + 20, ly, (Math.floor(t * 1.3 + lx) / 1.3) - lx / 1.3, t, 5, 50);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * sunK; ctx.fillStyle = '#fff4d0'; ctx.fillRect(-500, 470, 1900, 400); ctx.restore();
      if (sunK > 0) for (let i = 0; i < 7; i++) { const r = rng(i + 4); glow(-100 + r() * 1200, 560 + r() * 260, 30 + r() * 30, 'rgba(255,255,240,1)', 0.8 * sunK * Math.abs(Math.sin(t * 5 + i))); }
    });
    haze('#ece6d4', 0.1);
    // Москва-река с лодьями
    lay(3.6, () => {
      const rv = pathOf([[-900, 1150], [W + 900, 1140], [W + 900, 1250], [-900, 1260]]); wash(rv, '#5f8aa0', 1);
      { const g = ctx.createLinearGradient(0, 1140, 0, 1260); g.addColorStop(0, 'rgba(255,250,230,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-900, 1140, 2900, 120); }
      for (let k = 0; k < 18; k++) { const x = -600 + k * 140 + (t * 30 % 140), y = 1160 + (k % 4) * 24; pencil([[x, y], [x + 60, y - 1]], { w: 2, col: '#eaf4f4', a: 0.7, pass2: false }); }
      boat(((t - S0.white) * 40 + 120) % 1500 - 200, 1200, 0.85, t, 1); boat(980 - (t - S0.white) * 30, 1236, 0.95, t, 2);
    });
    // стройплощадка: известковая печь, каменотёсы, телега
    lay(2.2, () => {
      const gp = pathOf([[-900, 1250], [W + 900, 1236], [W + 900, 1500], [-900, 1500]]); wash(gp, '#d8ccae', 1);
      hatch(gp, [-900, 1236, W + 900, 1500], { gap: 10, a: 0.18, col: '#8a7a54', ang: 0.15, key: 22 });
      kiln(-40, 1300, t);
      for (let q = 0; q < 4; q++) rect(60 + q * 70, 1290 - (q % 2) * 40, 64, 40, { wash: ST, washA: 1, w: 1.8, col: LN });
      cart(520 - (t - S0.white) * 26, 1330, t);
      mason(330, 1330, t, 1, 0); mason(1010, 1320, t, -1, 2.1);
    });
    // Дмитрий Донской на коне
    lay(1.55, () => { push(885, 1300, 1.12); prince(0, 0, t); pop(); });
    // план Тома: известняковая крошка, блок
    lay(1, () => {
      const gp = pathOf([[-900, 1360], [W + 900, 1350], [W + 900, 2600], [-900, 2600]]); wash(gp, '#e6dcc2', 1);
      { const g = ctx.createLinearGradient(0, 1350, 0, 1700); g.addColorStop(0, 'rgba(120,100,70,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-900, 1350, 2880, 350); }
      const r = rng(55); for (let i = 0; i < 60; i++) { const x = r() * 1400 - 160, y = 1380 + r() * 520, s = 4 + r() * 12; poly([[x, y], [x + s, y - s * 0.6], [x + s * 1.6, y + 2], [x + s * 0.4, y + s * 0.5]], { wash: i % 3 ? '#f4eee0' : '#c8bc9e', washA: 1, w: 1.2, col: '#6a5e46' }); }
      bigBlock(660, 1460, t);
      cat();
      for (const h0 of hits) dustPuff(586, 1262, h0, t, 12, 140);
      note('морская лилия, −310 млн', 640, 1505, t, EV.white_chip + 0.05, S1.white + 0.3, '#0f4a42', 42, -0.03, [[790, 1478], [770, 1390]]);
    });
    // передний план: жердь лесов, верёвка, пыль на ветру
    lay(0.6, () => {
      pencil([[30, -300], [60, 2400]], { w: 34, col: '#5a3a1e' }); pencil([[30, -300], [60, 2400]], { w: 3, col: '#1a0e04' });
      line([[56, 700], [120, 900], [70, 1100]], { w: 4, col: '#c8b088' });
      for (const [bx, by, bw, bh] of [[760, 1800, 230, 150], [990, 1780, 200, 170], [860, 1660, 200, 140]]) { const p2 = rect(bx, by, bw, bh, { wash: '#d8ceb6', washA: 1, w: 3, col: LN }); hatch(p2.path, p2.bb, { gap: 8, a: 0.2, col: '#6a5a3a', ang: 1.2, key: bx }); poly([[bx, by], [bx + 30, by - 26], [bx + bw + 30, by - 26], [bx + bw, by]], { wash: STL, washA: 1, w: 2.4, col: LN }); }   // штабель блоков
    });
    motes(36, [-100, 300, W + 100, 1900], '#fbf8ee', t, 41, { sp: 12, vx: 60, sz: 3.2, a: 0.6, wob: 30 });
  };

  // ------------------------------------------------------------------ режиссура
  DIR.white = {
    outfit: 'kolchuga', light: { side: -1, rim: '#fff2d0' }, grade: ['#c8a870', 0.2],
    act: () => [[S0.white, 'talk'], [EV.white_don + 0.35, 'proud'], [EV.white_build, 'grin'], [EV.white_stone, 'awe'], [EV.white_sly, 'smug'], [EV.white_sly + 0.5, 'suspicious'], [EV.white_chip, 'wink']],
    pose: (t, u, b) => {
      const bld = EV.white_build, lh = lastHit(t), dh = t - lh, strike = dh >= 0 && dh < 0.3 ? 1 - dh / 0.3 : 0;
      let hand, look, point, prop, tilt = 0;
      if (t < bld - 0.12) { const k = sm((t - S0.white - 0.15) / 0.3); hand = [lerp(82, 128, k), lerp(-150, -318, k)]; point = k > 0.5; look = [0.9, -0.55]; tilt = -0.05; }
      else if (t < EV.white_stone) { const wind = Math.sin(clamp((t - bld) / 0.44) * Math.PI); hand = [180 - strike * 8, -208 - (1 - strike) * 30 * wind + strike * 22]; prop = 'chisel'; look = [0.8, 0.35]; }
      else if (t < EV.white_sly) { hand = [100, -160]; prop = 'chisel'; look = [0.35, -0.85]; tilt = -0.04; }
      else if (t < EV.white_chip) { hand = [178 - strike * 8, -200 + strike * 22]; prop = 'chisel'; look = [0.05, 0.05]; tilt = 0.08; }
      else { const k = sm((t - EV.white_chip) / 0.25); hand = [lerp(178, 150, k), lerp(-200, -270, k)]; prop = 'chisel'; look = [0, 0.05]; tilt = 0.1; }
      return Object.assign(b, { x: 380, s: 1.08, hand, look, point, prop, tilt, squash: strike > 0.6 ? 0.12 : b.squash, tailUp: t > EV.white_chip });
    },
    cam: () => [[S0.white, 520, 900, -0.3], [S0.white + 0.6, 560, 960, 0.0, 'x'], [EV.white_build, 600, 1040, 0.1], [EV.white_stone, 560, 900, 0.02], [EV.white_sly, 580, 1000, 0.08], [EV.white_chip - 0.04, 600, 1060, 0.1], [EV.white_chip + 0.14, 650, 1150, 0.3, 'x'], [S1.white, 650, 1140, 0.33]]
  };

  // ------------------------------------------------------------------ переход В белый Кремль: удар молота → облако известковой пыли → ветер
  TRANS_IN.white = { a: 0.3, b: 0.5, fx(k, t, A, B) {
    const kc = 0.3 / 0.8, ix = 560, iy = 1180, hit = 0.1;
    if (k < kc) drawBuf(A, 1 + k * 0.05, ix, iy); else drawBuf(B, 1.04 - 0.04 * clamp((k - kc) / (1 - kc)));
    scr(() => {
      if (k < hit + 0.04) { // молот входит в кадр
        const hk = clamp(k / hit); push(ix + 260 - hk * 220, iy - 520 + hk * 470, 2.2, -1.3 + hk * 1.1); rect(-10, 0, 20, 260, { wash: WOOD, washA: 1, w: 2.4, col: WOODD }); rect(-50, -40, 100, 60, { wash: '#6a6e76', washA: 1, w: 3, col: '#1a1a20', shade: { gap: 5, a: 0.4, col: '#000', ang: 0.3 } }); pop(); }
      if (k > hit && k < hit + 0.18) { const fk = (k - hit) / 0.18; whiteOut(1 - fk); glow(ix, iy, 500 * (1 + fk), 'rgba(255,240,200,1)', 1 - fk); for (let i = 0; i < 24; i++) { const r = rng(i * 5 + 3), a = r() * 6.283, d0 = 40 + fk * 200, d1 = d0 + 120 + r() * 400; pencil([[ix + Math.cos(a) * d0, iy + Math.sin(a) * d0], [ix + Math.cos(a) * d1, iy + Math.sin(a) * d1]], { w: 3 + r() * 4, col: i % 3 ? '#fff8e0' : '#ffc860', a: 1 - fk, pass2: false, gap: false }); } }
      if (k > hit) {
        const e = (k - hit) / (1 - hit), grow = 1 - Math.pow(1 - clamp(e / 0.45), 3), wind = clamp((k - kc) / (1 - kc)), wk = wind * wind;
        whiteOut(0.92 * clamp((e - 0.12) / 0.25) * (1 - clamp((wind - 0.05) / 0.6)), '244,238,224');
        for (let i = 0; i < 46; i++) { const r = rng(i * 31 + 9), a = r() * 6.283, d = grow * (200 + r() * 1100), R = (80 + r() * 260) * (0.4 + grow * 0.9) * (1 + wk * 0.6);
          const x = ix + Math.cos(a) * d + wk * (900 + r() * 1400), y = iy + Math.sin(a) * d * 1.3 - grow * 140 - wk * r() * 300, al = (0.75 + 0.25 * r()) * (1 - clamp((wind - 0.2) / 0.8));
          if (al <= 0.01) continue; const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, `rgba(250,246,236,${al})`); g.addColorStop(0.6, `rgba(232,224,206,${al * 0.7})`); g.addColorStop(1, 'rgba(232,224,206,0)'); ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2); }
        if (wind > 0) for (let i = 0; i < 20; i++) { const r = rng(i * 3 + 70), y = r() * H, x0 = -200 + ((wind * 2200 + r() * 1200) % 1600); pencil([[x0, y], [x0 + 200 + r() * 200, y + (r() - 0.5) * 30]], { w: 2, col: '#ffffff', a: 0.6 * (1 - wind), pass2: false, gap: false }); }
        for (let i = 0; i < 18; i++) { const r = rng(i * 13 + 5), a = -Math.PI * (0.05 + r() * 0.9), d = e * (300 + r() * 700); const x = ix + Math.cos(a) * d, y = iy + Math.sin(a) * d + e * e * 900; if (e < 0.7) poly([[x, y], [x + 10, y - 6], [x + 16, y + 4], [x + 4, y + 10]], { wash: '#c8bc9e', washA: 1, w: 1.2, col: '#5a4e36' }); }
      }
    });
  } };
})();
