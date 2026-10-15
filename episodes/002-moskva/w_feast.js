/* 002 — сцена `feast`: 1147, княжий пир в Москве. Юрий Долгорукий зовёт Святослава Ольговича «Приди ко мнѣ, брате, в Московъ»
   и устраивает «обед силен» (Ипатьевская летопись). Бревенчатая гридница, длинный стол, гусляр, летописец со свитком, вепрь.
   Переход В сцену — клякса железо-галловых чернил с пера летописца. */
(() => {
  // ------------------------------------------------------------------ события (всё от реплики p1)
  EV.feast_scroll = LS('p1');                                   // «Первое упоминание» — Том показывает на свиток
  EV.feast_moskva = WT('p1', 'Москвы');                         // гордость
  EV.feast_inv = WT('p1', 'приглашение');                       // Юрий зовёт к столу, Том поднимает кубок
  EV.feast_sil = WT('p1', 'Сильный');
  EV.feast_toast = lerp(EV.feast_inv, EV.feast_sil, 0.5);       // «обед.» — князья чокаются рогами, Том смеётся
  EV.feast_write = EV.feast_inv + 0.15;                         // перо летописца дописывает «и обѣдъ силенъ»
  EV.feast_boar = EV.feast_sil + 0.12;                          // «Сильный» — вепрь падает на стол, стол прогибается и трещит
  EV.feast_pile = EV.feast_boar + 0.32;                         // «обед!» — следом выносят гору еды
  SHAKES.push([EV.feast_boar, 0.42, 18], [EV.feast_pile + 0.25, 0.2, 6]);
  KEYW.push('упоминание', 'Москвы', 'обед.', 'Сильный', 'обед!');

  const WD = '#7a4a24', WDD = '#2e1a0c', WDL = '#b07a44', INK = '#24120a';
  const fl = (t, k) => 0.82 + 0.18 * Math.sin(t * 17 + k * 2.1) * Math.sin(t * 6.3 + k);   // мерцание огня

  // ------------------------------------------------------------------ помощники
  function logWall(x0, x1, y0, y1) {                            // сруб: брёвна с градиентом, пазы со мхом, сучки, волокна
    const h = 66; let k = 0;
    for (let y = y0; y < y1; y += h, k++) {
      const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#6e4322'); g.addColorStop(0.3, '#a06c3c'); g.addColorStop(0.62, '#8a5a30'); g.addColorStop(1, '#3a2010');
      ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, h);
      ctx.fillStyle = 'rgba(70,74,30,0.55)'; ctx.fillRect(x0, y + h - 5, x1 - x0, 5);            // мох в пазу
      pencil([[x0, y + h - 3], [x1, y + h - 5]], { w: 3.2, col: WDD, a: 0.85, pass2: false, key: k });
      const r = rng(700 + k * 13);
      for (let i = 0; i < 12; i++) { const xx = x0 + r() * (x1 - x0), L = 70 + r() * 200, yy = y + 12 + r() * (h - 26); pencil([[xx, yy], [xx + L * 0.5, yy + (r() - 0.5) * 5], [xx + L, yy + (r() - 0.5) * 3]], { w: 1.5, col: '#3a200e', a: 0.4, pass2: false, gap: false, key: i }); }
      for (let i = 0; i < 2; i++) { const xx = x0 + r() * (x1 - x0); ell(xx, y + h * 0.45, 10, 7, { wash: '#4a2a14', washA: 0.85, w: 1.6, col: WDD }); }
    }
  }
  function pillar(x, y0, y1, w, t, seed) {                     // резной столб: кольца, «ёлочка», ромбы
    const p = rect(x - w / 2, y0, w, y1 - y0, { wash: '#7a4a26', washA: 1, w: 3, col: WDD });
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, 'rgba(255,190,110,0.35)'); g.addColorStop(0.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,8,0,0.55)');
    ctx.fillStyle = g; ctx.fillRect(x - w / 2, y0, w, y1 - y0);
    for (let y = y0 + 60; y < y1 - 40; y += 150) {
      pencil([[x - w / 2, y], [x + w / 2, y]], { w: 2.6, col: WDD, pass2: false });
      pencil([[x - w / 2, y + 10], [x + w / 2, y + 10]], { w: 1.6, col: WDD, a: 0.7, pass2: false });
      for (let q = 0; q < 3; q++) { const yy = y + 34 + q * 34; pencil([[x - w * 0.35, yy], [x, yy - 16], [x + w * 0.35, yy]], { w: 2, col: '#3a2010', a: 0.75, pass2: false, gap: false }); }
      poly([[x, y + 128], [x + w * 0.22, y + 140], [x, y + 152], [x - w * 0.22, y + 140]], { wash: '#c8902a', washA: 0.5, w: 1.6, col: WDD });
    }
    return p;
  }
  function flame(x, y, s, t, k) {                              // язык пламени: два слоя, кипит
    const f = Math.sin(t * 13 + k) * 6, f2 = Math.cos(t * 9 + k * 3) * 5;
    blob([[x - 16 * s, y], [x - 12 * s, y - 30 * s], [x + f * s * 0.5, y - (64 + f2) * s], [x + 12 * s, y - 28 * s], [x + 16 * s, y]], { wash: '#ff9a2a', washA: 0.95, w: 2, col: '#7a2a06' });
    blob([[x - 7 * s, y - 2 * s], [x - 5 * s, y - 20 * s], [x + f * s * 0.3, y - (38 + f2) * s], [x + 6 * s, y - 18 * s], [x + 7 * s, y - 2 * s]], { wash: '#fff0a0', washA: 0.95, line: false });
  }
  function torch(x, y, t, k) {                                 // факел на кованом кронштейне + дым
    line([[x - 40, y + 60], [x - 10, y + 40], [x, y + 10]], { w: 5, col: '#1a1410', smooth: false });
    poly([[x - 10, y + 30], [x + 10, y + 30], [x + 14, y - 6], [x - 14, y - 6]], { wash: '#4a3020', washA: 1, w: 2.4, col: '#140a04' });
    for (let q = 0; q < 3; q++) pencil([[x - 14, y + q * 10], [x + 14, y + q * 10 - 3]], { w: 2, col: '#2a1a0c', pass2: false });
    glow(x, y - 40, 330, 'rgba(255,150,60,1)', 0.42 * fl(t, k)); glow(x, y - 30, 90, 'rgba(255,230,160,1)', 0.7 * fl(t, k));
    flame(x, y - 6, 1.25, t, k);
    for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 0.25 * (1 - ph); ctx.fillStyle = '#3a2a22'; ctx.beginPath(); ctx.ellipse(x + Math.sin(t * 2 + i) * 20 + ph * 40, y - 90 - ph * 260, 18 + ph * 40, 14 + ph * 30, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
  }
  function shield(x, y, s, col) {                              // каплевидный щит XII в.: кайма, умбон, заклёпки
    push(x, y, s);
    const pts = spline([[0, -110], [56, -94], [62, -30], [36, 60], [0, 130], [-36, 60], [-62, -30], [-56, -94]], true, 8);
    shape(pts, { wash: col, washA: 0.97, w: 3, col: '#1a0a06', shade: { gap: 7, a: 0.25, ang: 1.2, col: '#2a0806' } });
    pencil(spline([[0, -96], [46, -82], [50, -28], [28, 52], [0, 112], [-28, 52], [-50, -28], [-46, -82]], true, 8), { w: 3.4, col: '#e8d8b0', a: 0.8, pass2: false });
    ell(0, -10, 16, 16, { wash: '#c8a040', washA: 1, w: 2, col: '#4a3008' }); glow(-4, -14, 12, 'rgba(255,240,190,1)', 0.6);
    line([[0, -80], [0, 90]], { w: 2.4, col: '#e8d8b0', a: 0.6, pass2: false });
    pop();
  }
  function goose(x, y, s, j) {                                 // жареная дичь на блюде
    push(x, y - j, s);
    ell(0, 6, 72, 16, { wash: '#8a5a2a', washA: 1, w: 2.2, col: WDD });
    blob([[-54, 0], [-50, -36], [-10, -56], [40, -44], [58, -10], [40, 4]], { wash: '#b0652a', washA: 1, w: 2.6, col: '#3a1a08', shade: { gap: 6, a: 0.3, col: '#5a2a0a', ang: 1.1 } });
    blob([[-30, -40], [-6, -52], [24, -44], [8, -34]], { wash: '#e8a060', washA: 0.7, line: false });
    for (const lx of [44, 60]) line([[lx - 6, -14], [lx + 14, -30], [lx + 22, -26]], { w: 9, col: '#a85a24' });
    for (let q = 0; q < 5; q++) ell(-56 + q * 26, 8, 8, 5, { wash: q % 2 ? '#5a7a2a' : '#c83a2a', washA: 1, w: 1.2, col: '#1a1004' });
    pop();
  }
  function loaf(x, y, s, j) {                                  // каравай с надрезами
    push(x, y - j, s);
    ell(0, -24, 54, 32, { wash: '#c88a3a', washA: 1, w: 2.6, col: '#3a1a06', shade: { gap: 6, a: 0.28, col: '#6a3a0a', ang: 1.3 } });
    blob([[-32, -40], [0, -54], [30, -42], [0, -36]], { wash: '#f0c070', washA: 0.6, line: false });
    for (let q = -1; q <= 1; q++) pencil([[q * 18 - 8, -40], [q * 18 + 8, -16]], { w: 2.2, col: '#5a2a08', pass2: false });
    pop();
  }
  function horn(x, y, s, rot, j) {                             // турий рог в серебряной оправе
    push(x, y - j, s, rot);
    const P = spline([[0, 0], [22, -30], [30, -76], [20, -118]], false, 8), pts = [];
    P.forEach((p, i) => { const w = lerp(4, 22, i / (P.length - 1)); pts.push([p[0] - w, p[1]]); }); P.slice().reverse().forEach((p, i) => { const w = lerp(22, 4, i / (P.length - 1)); pts.push([p[0] + w, p[1]]); });
    shape(pts.concat([pts[0]]), { wash: '#d8c49a', washA: 1, w: 2.4, col: '#2a1a08', shade: { gap: 5, a: 0.3, col: '#6a5030', ang: 0.3 } });
    for (const k of [0.35, 0.95]) { const p = P[Math.floor(k * (P.length - 1))], w = lerp(4, 22, k) + 3; rect(p[0] - w, p[1] - 5, w * 2, 10, { wash: '#c8c8d0', washA: 1, w: 1.6, col: '#3a3a44' }); }
    pop();
  }
  function kovsh(x, y, s, j) {                                 // ковш-утица: лодочка с утиной головой
    push(x, y - j, s);
    blob([[-60, -10], [-40, -40], [30, -42], [56, -30], [50, -4], [0, 4]], { wash: '#9a4a1e', washA: 1, w: 2.6, col: '#2a0e04', shade: { gap: 6, a: 0.3, col: '#4a1a08' } });
    line([[50, -34], [74, -66], [92, -70], [100, -60]], { w: 12, col: '#9a4a1e' }); pencil([[50, -34], [74, -66], [92, -70], [100, -60]], { w: 2.2, col: '#2a0e04' });
    ell(88, -68, 3, 3, { wash: '#1a0a04', washA: 1, w: 1 });
    for (let q = 0; q < 4; q++) pencil([[-40 + q * 22, -34], [-34 + q * 22, -12]], { w: 2, col: '#e8b040', a: 0.8, pass2: false });   // роспись
    ell(-4, -38, 40, 6, { wash: '#e8a030', washA: 0.95, w: 1.4, col: '#6a3a08' });                                               // мёд
    pop();
  }
  function jug(x, y, s, j) {
    push(x, y - j, s);
    blob([[-30, 0], [-40, -50], [-22, -86], [-14, -110], [14, -110], [22, -86], [40, -50], [30, 0]], { wash: '#8a5038', washA: 1, w: 2.6, col: '#2a1008', shade: { gap: 6, a: 0.3, col: '#3a1408', ang: 1.3 } });
    for (const yy of [-40, -60]) pencil([[-38, yy], [38, yy]], { w: 2, col: '#e8c890', a: 0.7, pass2: false });
    line([[30, -90], [56, -70], [34, -40]], { w: 3, col: '#2a1008' });
    pop();
  }
  function bowl(x, y, s, j, col) { push(x, y - j, s); ell(0, -10, 44, 12, { wash: col, washA: 1, w: 1.6, col: '#2a1008' }); poly([[-46, -10], [46, -10], [30, 14], [-30, 14]], { wash: '#7a4422', washA: 1, w: 2.4, col: WDD }); pop(); }
  function pie(x, y, s, j) { push(x, y - j, s); ell(0, -16, 46, 22, { wash: '#d89a4a', washA: 1, w: 2.4, col: '#4a2008' }); for (let q = -2; q <= 2; q++) pencil([[q * 14, -32], [q * 14 + 6, -2]], { w: 1.6, col: '#7a4010', pass2: false }); pop(); }

  function boar(x, y, s, t, steam) {                           // жареный вепрь на дубовом блюде: глянец, клыки, яблоко, зелень, пар
    push(x, y, s);
    ell(0, 4, 230, 40, { wash: '#6a3e1c', washA: 1, w: 3, col: WDD, shade: { gap: 6, a: 0.3, col: '#2a1408', ang: 0.15 } });
    ell(0, -4, 206, 28, { wash: '#8a5428', washA: 1, w: 2, col: WDD });
    for (let q = 0; q < 9; q++) ell(-190 + q * 48, -6, 14, 9, { wash: q % 3 ? '#4f7a2a' : '#c8402a', washA: 1, w: 1.4, col: '#122004' });
    for (const lx of [-110, 70]) blob([[lx - 30, -10], [lx - 20, -44], [lx + 10, -40], [lx + 22, -10]], { wash: '#6a3412', washA: 1, w: 2.4, col: '#1a0802' });
    const body = [[-180, -14], [-190, -70], [-150, -136], [-60, -170], [50, -164], [130, -130], [170, -80], [176, -26], [120, -10]];
    blob(body, { wash: '#8a4518', washA: 1, w: 3.6, col: '#1a0802', shade: { gap: 6, a: 0.38, col: '#3a1404', ang: 1.2 } });
    blob([[-140, -120], [-60, -156], [40, -152], [-20, -128]], { wash: '#d07a34', washA: 0.75, line: false });          // глазурь
    for (let q = 0; q < 6; q++) pencil([[-120 + q * 40, -150 + Math.abs(q - 2.5) * 6], [-110 + q * 40, -112 + Math.abs(q - 2.5) * 6]], { w: 2.4, col: '#4a1804', a: 0.65, pass2: false });   // надрезы
    for (let q = 0; q < 4; q++) pencil([[-90 + q * 34, -150], [-78 + q * 34, -154]], { w: 3, col: '#fff3d0', a: 0.75, pass2: false, gap: false });  // блики жира
    const hd = [[130, -128], [190, -136], [236, -110], [262, -76], [256, -44], [206, -26], [160, -30]];
    blob(hd, { wash: '#7a3c14', washA: 1, w: 3.4, col: '#1a0802', shade: { gap: 6, a: 0.35, col: '#2a0c02', ang: 1.0 } });
    poly([[150, -128], [168, -186], [196, -136]], { wash: '#6a3010', washA: 1, w: 2.6, col: '#1a0802' });             // ухо
    pencil([[200, -104], [216, -100]], { w: 3, col: '#1a0802' });                                                        // прикрытый глаз
    ell(258, -60, 13, 18, { wash: '#5a2a10', washA: 1, w: 2.4, col: '#1a0802' }); for (const ny of [-66, -54]) ell(262, ny, 2.4, 3, { wash: '#1a0802', washA: 1, w: 1 });
    for (const [tx, ty] of [[236, -44], [222, -40]]) poly([[tx, ty], [tx + 18, ty - 34], [tx + 8, ty - 2]], { wash: '#f4ead0', washA: 1, w: 2, col: '#2a1a08' });   // клыки
    ell(270, -24, 26, 24, { wash: '#c8302a', washA: 1, w: 2.6, col: '#3a0806' }); glow(262, -32, 14, 'rgba(255,230,200,1)', 0.7); line([[272, -48], [276, -58]], { w: 3, col: '#3a2a08' });
    for (const lx of [-150, 110]) blob([[lx - 26, -26], [lx - 30, -2], [lx + 16, 2], [lx + 22, -20]], { wash: '#6a3010', washA: 1, w: 2.4, col: '#1a0802' });
    if (steam > 0) for (let i = 0; i < 5; i++) { const ph = (t * 0.7 + i / 5) % 1, xx = -120 + i * 60 + Math.sin(t * 2 + i) * 14; line([[xx, -170 - ph * 40], [xx + 14, -210 - ph * 80], [xx - 6, -250 - ph * 120], [xx + 10, -290 - ph * 150]], { w: 4, col: '#fff6e8', a: 0.55 * steam * Math.sin(ph * Math.PI) }); }
    pop();
  }
  function prince(x, y, o) {                                   // князь: шапка с меховым околышем, борода, корзно с фибулой
    push(x, y, o.s || 1, o.rot || 0);
    const bc = o.body, bcD = o.bodyD;
    poly([[-74, 210], [-66, 40], [-40, 0], [40, 0], [66, 40], [74, 210]], { wash: bc, washA: 1, w: 3, col: '#140a06', shade: { gap: 7, a: 0.28, col: bcD, ang: 1.3 } });
    for (let q = 0; q < 4; q++) pencil([[-8, 30 + q * 44], [8, 30 + q * 44]], { w: 4, col: '#e8c050', pass2: false });   // шитьё по борту
    line([[0, 8], [0, 210]], { w: 3, col: '#e8c050', a: 0.8, pass2: false });
    if (o.cloak) { poly([[-80, 214], [-72, 30], [-44, -2], [-10, 6], [-40, 80], [-60, 214]], { wash: o.cloak, washA: 1, w: 2.6, col: '#140a06', shade: { gap: 6, a: 0.3, col: '#2a0606', ang: 1.4 } }); ell(-34, 14, 10, 10, { wash: '#e8c050', washA: 1, w: 2, col: '#5a3a08' }); }
    ell(0, -48, 40, 46, { wash: '#e6b890', washA: 1, w: 2.6, col: '#2a140a' });
    const by = o.beard; blob([[-36, -40], [-30, o.beardL || 30], [0, (o.beardL || 30) + 18], [30, o.beardL || 30], [36, -40], [20, -24], [0, -18], [-20, -24]], { wash: by, washA: 1, w: 2.4, col: '#1a0e06', shade: { gap: 5, a: 0.3, col: '#1a0e06', ang: 1.5 } });
    line([[-20, -22], [-6, -14], [6, -14], [20, -22]], { w: 6, col: by });
    const ex = o.look || 0;
    for (const sx of [-14, 14]) { ell(sx + ex * 4, -56, 4, o.laugh ? 1.5 : 4, { wash: '#1a0e06', washA: 1, w: 1.2 }); pencil([[sx - 9, -68], [sx + 9, -70]], { w: 3, col: '#2a1a0c', pass2: false }); }
    line([[ex * 3, -54], [ex * 3 - 4, -38], [ex * 3 + 4, -36]], { w: 2, col: '#7a4a30', smooth: false });
    if (o.laugh) blob([[-12, -26], [12, -26], [0, -14]], { wash: '#5a1a10', washA: 1, w: 1.6 });
    rect(-44, -100, 88, 26, { wash: '#4a2e1a', washA: 1, w: 2.6, col: '#140a06', shade: { gap: 4, a: 0.5, col: '#1a0e06', ang: 1.5 } });   // соболь
    blob([[-36, -98], [-30, -136], [0, -150], [30, -136], [36, -98]], { wash: o.hat, washA: 1, w: 2.6, col: '#140a06' });
    ell(0, -150, 7, 7, { wash: '#e8c050', washA: 1, w: 1.6, col: '#5a3a08' });
    pop();
  }
  function gusliar(x, y, t) {                                  // старый гусляр с крыловидными гуслями
    push(x, y, 1);
    poly([[-60, 0], [-56, -150], [-30, -190], [30, -190], [56, -150], [60, 0]], { wash: '#d8ccb0', washA: 1, w: 2.8, col: '#1a120a', shade: { gap: 7, a: 0.3, col: '#6a5a3a', ang: 1.3 } });
    pencil([[-58, -96], [58, -96]], { w: 5, col: '#a8302a', pass2: false });
    ell(0, -232, 34, 40, { wash: '#e0b08a', washA: 1, w: 2.4, col: '#2a140a' });
    blob([[-32, -228], [-26, -150], [0, -128], [26, -150], [32, -228], [0, -206]], { wash: '#eeeae0', washA: 1, w: 2.2, col: '#4a4a44' });
    for (const sx of [-12, 12]) pencil([[sx - 6, -244], [sx + 6, -244]], { w: 2.6, col: '#2a1a0c', pass2: false });
    blob([[-30, -262], [0, -276], [30, -262], [24, -250], [-24, -250]], { wash: '#f0ece2', washA: 1, w: 1.8, col: '#6a6a60' });
    push(10, -110, 1, -0.25);
    poly([[-90, 20], [80, -6], [96, -40], [-60, -60]], { wash: '#a86a30', washA: 1, w: 2.8, col: '#2a1408', shade: { gap: 6, a: 0.3, col: '#4a2a10', ang: 0.2 } });
    for (let q = 0; q < 7; q++) { const vib = Math.sin(t * 40 + q * 1.7) * (Math.sin(t * 5 + q) > 0.3 ? 2.5 : 0.3); pencil([[-70, -46 + q * 8 + vib], [84, -30 + q * 6 - vib]], { w: 1.2, col: '#f4e8c0', a: 0.85, pass2: false, gap: false }); }
    pop();
    const pl = Math.sin(t * 9) * 10;
    line([[44, -170], [60, -120], [34 + pl, -112]], { w: 18, col: '#d8ccb0' }); ell(34 + pl, -112, 11, 9, { wash: '#e0b08a', washA: 1, w: 2 });
    line([[-44, -170], [-50, -120], [-20 - pl * 0.6, -100]], { w: 18, col: '#d8ccb0' }); ell(-20 - pl * 0.6, -100, 11, 9, { wash: '#e0b08a', washA: 1, w: 2 });
    pop();
  }
  function chronicler(x, y, t) {                               // монах-летописец за аналоем: клобук, перо, свиток с текстом
    const wr = clamp((t - EV.feast_write) / (EV.feast_boar - EV.feast_write)), writing = t > S0.feast + 0.4;
    push(x, y, 1);
    // монах (за аналоем)
    poly([[30, 40], [36, -230], [70, -280], [160, -280], [196, -230], [204, 40]], { wash: '#1e1a1c', washA: 1, w: 3, col: '#06040a', shade: { gap: 7, a: 0.35, col: '#000', ang: 1.3 } });
    ell(116, -322, 36, 42, { wash: '#e2b894', washA: 1, w: 2.4, col: '#2a140a' });
    blob([[84, -316], [90, -256], [116, -236], [142, -256], [148, -316], [116, -296]], { wash: '#5a4232', washA: 1, w: 2.2, col: '#1a0e06' });
    for (const sx of [102, 128]) pencil([[sx - 6, -330], [sx + 6, -326]], { w: 2.6, col: '#1a0e06', pass2: false });            // смотрит вниз, в свиток
    blob([[72, -330], [76, -380], [116, -404], [156, -380], [160, -330], [150, -300], [150, -336], [82, -336], [82, -300]], { wash: '#141016', washA: 1, w: 2.6, col: '#000' });
    // аналой
    poly([[-150, -150], [150, -190], [160, -170], [-140, -128]], { wash: '#6a3e1c', washA: 1, w: 2.6, col: WDD });
    rect(-14, -130, 28, 170, { wash: '#5a3418', washA: 1, w: 2.4, col: WDD, shade: { gap: 6, a: 0.35, col: '#1a0a04', ang: 1.5 } });
    poly([[-80, 40], [80, 40], [40, 20], [-40, 20]], { wash: '#4a2a12', washA: 1, w: 2.4, col: WDD });
    // свиток свисает к зрителю
    const sp = [[-136, -146], [140, -184], [150, 150], [-120, 176]];
    poly(sp, { wash: '#efdcb0', washA: 1, w: 2.6, col: '#5a3a18', shade: { gap: 8, a: 0.12, col: '#8a6a3a', ang: 0.2 } });
    ell(15, 166, 140, 18, { wash: '#e0c898', washA: 1, w: 2.4, col: '#5a3a18', rot: -0.1 });
    ell(-122, 176, 12, 18, { wash: '#c8a870', washA: 1, w: 2, col: '#5a3a18' });
    push(6, -12, 1, -0.135);
    txt('В лѣто 6655', -6, -132, 30, { col: '#7a1a0e', a: 0.85 });
    txt('П', -100, -78, 64, { col: '#b8261a' });
    txt('риди ко мнѣ,', 10, -74, 44, { col: INK });
    txt('брате,', -30, -20, 44, { col: INK });
    txt('в Московъ', 4, 34, 50, { col: INK });
    if (wr > 0) txt('и обѣдъ силенъ', 4, 92, 40, { col: '#6a1c0c', reveal: wr });
    pop();
    // перо: пишет (колышется по строке)
    const px = writing ? lerp(-70, 120, wr > 0 && wr < 1 ? wr : (Math.sin(t * 7) * 0.5 + 0.5)) : -40, py = wr > 0 ? 64 : 22 + Math.sin(t * 11) * 4;
    line([[90, -150], [px + 50, py - 40], [px + 8, py - 4]], { w: 16, col: '#1e1a1c' });
    ell(px + 10, py - 6, 10, 8, { wash: '#e2b894', washA: 1, w: 2 });
    push(px, py, 1, -0.9 + Math.sin(t * 12) * 0.08); blob([[0, 0], [10, -40], [24, -110], [14, -150], [2, -100], [-6, -40]], { wash: '#f4f0e6', washA: 1, w: 2, col: '#3a3a3a' }); for (let q = 0; q < 6; q++) pencil([[12, -40 - q * 18], [22, -50 - q * 18]], { w: 1.2, col: '#6a6a6a', pass2: false }); pop();
    ell(-110, -170, 16, 8, { wash: '#1a1410', washA: 1, w: 2 }); rect(-124, -192, 28, 22, { wash: '#2a1a14', washA: 1, w: 2 });        // чернильница
    // свеча на аналое
    rect(146, -260, 16, 70, { wash: '#efe2c0', washA: 1, w: 2, col: '#5a4a2a' }); glow(154, -290, 160, 'rgba(255,200,110,1)', 0.45 * fl(t, 9)); flame(154, -258, 0.6, t, 9);
    pop();
  }
  function hound(x, y, t) {                                    // борзая грызёт кость под столом
    const ch = Math.sin(t * 9) * 4, tw = Math.sin(t * 4) * 0.4;
    push(x, y, 1);
    line([[150, -30], [210, -50 + tw * 30], [250, -90 + tw * 50]], { w: 14, col: '#c8b8a0' }); pencil([[150, -30], [210, -50 + tw * 30], [250, -90 + tw * 50]], { w: 2.2, col: '#2a1a0c' });
    blob([[-120, 0], [-110, -60], [-30, -90], [90, -84], [170, -50], [170, 0]], { wash: '#d8c8ae', washA: 1, w: 3, col: '#2a1a0c', shade: { gap: 7, a: 0.3, col: '#6a5a40', ang: 1.3 } });
    for (const [px, pw] of [[-150, 1], [-120, 0.9]]) blob([[px - 70, 4], [px - 70, -16], [px + 40, -20], [px + 40, 4]], { wash: '#e4d6bc', washA: 1, w: 2.4, col: '#2a1a0c' });
    push(-150, -70 + ch * 0.5, 1, 0.12);
    blob([[0, 0], [10, -40], [-30, -60], [-110, -40], [-160, -18], [-150, 4], [-60, 10]], { wash: '#e0d2b8', washA: 1, w: 2.8, col: '#2a1a0c' });
    blob([[-10, -46], [30, -64], [46, -40], [14, -26]], { wash: '#9a7a5a', washA: 1, w: 2.2, col: '#2a1a0c' });
    ell(-74, -36, 5, 4, { wash: '#1a0e06', washA: 1, w: 1 }); ell(-158, -10, 7, 6, { wash: '#1a0e06', washA: 1, w: 1 });
    pop();
    push(-260, -40 + ch, 1, -0.2); rect(-50, -9, 100, 18, { wash: '#f2ead6', washA: 1, w: 2.2, col: '#3a2a1a' }); for (const bx of [-50, 50]) for (const by of [-10, 10]) ell(bx, by, 12, 11, { wash: '#f2ead6', washA: 1, w: 2.2, col: '#3a2a1a' }); pop();
    pop();
  }
  function tablePath(sag, y) { const P = []; for (let x = -320; x <= 1400; x += 40) P.push([x, y + sag * Math.exp(-Math.pow((x - 640) / 240, 2))]); return P; }

  // ------------------------------------------------------------------ мир
  WORLD.feast = (t, u, cat) => {
    const bo = EV.feast_boar, fallK = clamp((t - (bo - 0.24)) / 0.24), landed = t >= bo;
    const sag = landed ? 26 * (1 - Math.exp(-(t - bo) * 14)) + 4 * Math.sin((t - bo) * 30) * Math.exp(-(t - bo) * 6) : 0;
    const jump = k => landed ? Math.max(0, Math.sin((t - bo) * 13 + k) * 30 * Math.exp(-(t - bo) * 5)) : 0;
    const toast = clamp((t - EV.feast_toast + 0.25) / 0.3) * (1 - clamp((t - EV.feast_toast - 0.7) / 0.3));
    // 1. потолок, задняя стена-сруб, волоковые оконца
    lay(9, () => {
      vgrad(-900, 600, ['#120a06', '#2a180c', '#3a2414']);
      logWall(-700, 1780, 330, 1220);
      for (const [wx, wy] of [[640, 560], [900, 540]]) {
        rect(wx - 50, wy - 30, 100, 60, { wash: '#fff2c8', washA: 1, w: 3.4, col: WDD });
        glow(wx, wy, 160, 'rgba(255,236,180,1)', 0.55);
        rect(wx - 60, wy - 40, 120, 80, { line: true, w: 4, col: '#4a2a12' });
        pencil([[wx - 50, wy - 4], [wx + 50, wy - 2]], { w: 2, col: '#5a3a1a', a: 0.6, pass2: false });
      }
      // доска-береста «МЕНЮ»
      push(270, 620, 1, -0.04);
      rect(-140, -110, 280, 220, { wash: '#eadcbc', washA: 1, w: 3, col: '#3a2a14' });
      { const r = rng(40); for (let q = 0; q < 16; q++) { const xx = (q % 2 ? 1 : -1) * (112 + r() * 18), yy = -96 + r() * 196; pencil([[xx - 8, yy], [xx + 8, yy + 1]], { w: 2.6, col: '#5a4a34', a: 0.6, pass2: false, gap: false }); } }
      for (const [nx, ny] of [[-124, -94], [124, -94]]) ell(nx, ny, 5, 5, { wash: '#2a2a2a', washA: 1, w: 1 });
      txt('МЕНЮ', 0, -70, 46, { col: '#7a1a0e' });
      txt('обѣдъ силенъ', 0, -22, 36, { col: INK });
      txt('вепрь — цѣлый', 0, 22, 32, { col: INK, a: 0.85 });
      txt('мёдъ — рекой', 0, 62, 32, { col: INK, a: 0.85 });
      pop();
      shield(775, 720, 0.8, '#a8282a'); shield(1010, 800, 0.74, '#2a4a7a');
      line([[705, 600], [845, 860]], { w: 5, col: '#3a2410' }); line([[845, 600], [705, 860]], { w: 5, col: '#3a2410' }); for (const [sx, sy, a] of [[705, 600, -2.06], [845, 600, -1.08]]) { push(sx, sy, 1, a); poly([[0, -8], [30, 0], [0, 8]], { wash: '#c8c8d0', washA: 1, w: 1.6, col: '#2a2a30' }); pop(); }
      // матица и стропила (тёмный верх под табличкой года)
      rect(-700, 300, 2500, 46, { wash: '#3a2210', washA: 1, w: 3, col: '#120a04', shade: { gap: 6, a: 0.4, col: '#0a0402', ang: 0.1 } });
      for (let x = -600; x < 1800; x += 60) pencil([[x, 312], [x + 20, 300], [x + 40, 312]], { w: 2, col: '#c8902a', a: 0.6, pass2: false, gap: false });
      for (let k = -4; k < 10; k++) pencil([[k * 200, 300], [k * 200 + 60, -400]], { w: 14, col: '#1e1208', pass2: false });
    });
    haze('#3a2010', 0.12);
    // свет из оконцев: столбы с пылью
    lay(7, () => { rays(640, 560, 2.15, 0.3, 1500, 'rgba(255,226,160,0.6)', 0.28, 5, t); rays(900, 540, 2.1, 0.3, 1600, 'rgba(255,226,160,0.6)', 0.3, 5, t + 1); });
    // 2. столбы с факелами + хорос
    lay(4.5, () => {
      pillar(40, 300, 1400, 86, t, 1); pillar(1050, 300, 1400, 86, t, 2);
      torch(90, 760, t, 1); push(990, 0, 1, 0, -1); torch(0, 760, t, 2); pop();
    });
    // 3. князья за столом + гусляр
    lay(2.4, () => {
      const lg = t > EV.feast_toast - 0.2 && t < EV.feast_boar - 0.1, sw = Math.sin(t * 2.2) * 0.02, shk = landed && t < bo + 0.6;
      prince(545, 935 + (lg ? Math.sin(t * 14) * 3 : 0), { s: 1.2, body: '#2a4a7a', bodyD: '#0a1a3a', hat: '#2a5a8a', beard: '#2a1a0e', beardL: 14, rot: -0.04 + sw, look: shk ? 1 : 0.6, laugh: lg });
      prince(700, 912 + (lg ? Math.sin(t * 14 + 1) * 3 : 0), { s: 1.22, body: '#9a2a22', bodyD: '#4a0a08', hat: '#a8282a', cloak: '#6a1418', beard: '#7a6a5a', beardL: 46, rot: 0.03 - sw, look: shk ? 1 : -0.6, laugh: lg });
      // Юрий обнимает гостя: рука на плече
      line([[656, 950], [600, 940], [508, 952]], { w: 30, col: '#9a2a22' }); pencil([[656, 962], [600, 954], [508, 966]], { w: 2.4, col: '#140a06' }); ell(500, 956, 17, 14, { wash: '#e6b890', washA: 1, w: 2 });
      // рога в руках — чокаются на «обед.»
      horn(470 + toast * 60, 1090 - toast * 90, 1.05, -0.3 + toast * 0.55, 0); horn(800 - toast * 70, 1080 - toast * 100, 1.05, 0.35 - toast * 0.65, 0);
      if (toast > 0.8) for (let i = 0; i < 8; i++) { const r = rng(hsh(FRAME, i, 3)); ell(620 + (r() - 0.5) * 60, 950 - r() * 60, 5, 7, { wash: '#e8a030', washA: 0.9, w: 1 }); }
    });
    // 4. стол: скатерть с вышивкой, яства, прогиб и трещина
    lay(2.0, () => {
      const top = tablePath(sag, 1150), front = tablePath(sag, 1196);
      poly([[-320, 1110], [1400, 1110]].concat(top.slice().reverse()), { wash: '#efe6d2', washA: 1, w: 2, col: '#3a2a1a' });
      const cloth = front.concat([[1400, 1264 + sag * 0.3], [-320, 1264]]);
      shape(top.concat(front.slice().reverse()).concat([top[0]]), { wash: '#e6dcc4', washA: 1, w: 2.2, col: '#3a2a1a' });
      poly(front.concat([[1400, 1290], [-320, 1290]]).map(p => p), { wash: '#e8dec6', washA: 1, w: 2.6, col: '#2a1a0e', shade: { gap: 8, a: 0.14, col: '#6a5a40', ang: 1.45 } });
      for (let x = -300; x < 1400; x += 34) { const yy = 1220 + sag * Math.exp(-Math.pow((x - 640) / 240, 2)); poly([[x, yy], [x + 12, yy - 12], [x + 24, yy], [x + 12, yy + 12]], { wash: '#b0281e', washA: 0.95, line: false }); }
      pencil(front.map(([x, y]) => [x, y + 6]), { w: 3, col: '#b0281e', pass2: false });
      pencil(front.map(([x, y]) => [x, y + 40]), { w: 3, col: '#b0281e', pass2: false });
      for (const lx of [80, 1260]) rect(lx - 18, 1290, 36, 70, { wash: '#4a2a12', washA: 1, w: 2.6, col: WDD });
      { const bend = sag * 0.9; line([[622, 1290 + sag * 0.5], [640 + bend * 0.6, 1325], [626, 1362]], { w: 30, col: '#4a2a12' }); pencil([[622, 1290], [640 + bend * 0.6, 1325], [626, 1362]], { w: 2.6, col: WDD }); }
      ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = '#120804'; ctx.fillRect(-320, 1290, 1720, 90); ctx.restore();
      if (landed) { const ck = clamp((t - bo) / 0.12); for (const s2 of [-1, 1]) line([[640, 1200 + sag], [640 + s2 * 30 * ck, 1220 + sag], [640 + s2 * 18 * ck, 1244 + sag], [640 + s2 * 52 * ck, 1268 + sag]], { w: 3.4, col: '#2a1408', smooth: false }); }
      // яства (до вепря + гора после)
      loaf(90, 1166, 1, jump(0)); goose(250, 1170, 0.9, jump(1)); kovsh(420, 1168, 0.95, jump(2)); jug(860, 1170, 0.8, jump(3)); bowl(160, 1176, 0.9, jump(4), '#7a1a3a');
      bowl(980, 1178, 0.9, jump(5), '#3a5a1a'); loaf(1100, 1168, 0.9, jump(6)); horn(1200, 1176, 0.8, 1.2, jump(7));
      if (t > EV.feast_pile) { const pk = i => popK(t, EV.feast_pile + i * 0.12, 0.3);
        push(830, 1176, pk(0)); pie(0, 0, 1, 0); pop(); push(440, 1150, pk(1)); loaf(0, 0, 0.8, 0); pop(); push(380, 1176, pk(2)); goose(0, 0, 0.75, 0); pop();
        push(1150, 1150, pk(3)); pie(0, 0, 0.9, 0); pop(); push(40, 1150, pk(4)); pie(0, 0, 0.8, 0); pop(); push(890, 1110, pk(5)); loaf(0, 0, 0.7, 0); pop(); }
      // вепрь падает сверху и шлёпается на стол
      if (fallK > 0) { const yb = landed ? 1176 + sag : lerp(-500, 1176, fallK * fallK), sq = landed ? 1 - 0.14 * Math.exp(-(t - bo) * 9) * Math.cos((t - bo) * 30) : 1;
        push(640, yb, 1); ctx.scale(2 - sq, sq); boar(0, 0, 0.9, t, landed ? clamp((t - bo - 0.2) / 0.5) : 0); pop();
        if (landed && t < bo + 0.5) { const k = (t - bo) / 0.5; for (let i = 0; i < 14; i++) { const r = rng(i * 11 + 3), a = -Math.PI * (0.1 + r() * 0.8), d = k * (120 + r() * 220); ell(640 + Math.cos(a) * d, 1160 + Math.sin(a) * d + k * k * 240, 6 + r() * 6, 5, { wash: i % 3 ? '#e8a030' : '#c8402a', washA: 1 - k, w: 1 }); } }
      }
      note('«обѣдъ силенъ»', 610, 610, t, EV.feast_boar + 0.15, S1.feast + 0.2, '#fff0c8', 58, -0.05);
    });
    // 5. гусляр, летописец
    lay(1.7, () => { gusliar(96, 1370, t); });
    lay(1.35, () => { push(910, 1330, 1.1); chronicler(0, 0, t); pop(); });
    // 6. пол + Том
    lay(1, () => {
      const fp = pathOf([[-900, 1330], [W + 900, 1330], [W + 900, 2600], [-900, 2600]]); wash(fp, '#5a3a1e', 1);
      { const g = ctx.createLinearGradient(0, 1330, 0, 1800); g.addColorStop(0, 'rgba(20,10,4,0.6)'); g.addColorStop(1, 'rgba(20,10,4,0)'); ctx.fillStyle = g; ctx.fillRect(-900, 1330, 2880, 470); }
      for (let k = 0; k < 9; k++) { const y = 1350 + k * k * 9 + k * 28; pencil([[-900, y], [W + 900, y + 4]], { w: 2.2, col: '#2a1608', a: 0.7, pass2: false, key: k }); }
      for (let k = -12; k <= 12; k++) pencil([[540 + k * 90, 1330], [540 + k * 260, 2400]], { w: 1.4, col: '#2a1608', a: 0.35, pass2: false });
      const r = rng(77); for (let i = 0; i < 40; i++) { const x = r() * 1300 - 100, y = 1360 + r() * 500, a = r() * 3; pencil([[x, y], [x + Math.cos(a) * 30, y + Math.sin(a) * 6]], { w: 2, col: '#d8b860', a: 0.7, pass2: false, gap: false }); }   // солома
      glow(560, 1420, 420, 'rgba(255,170,80,1)', 0.18);
      cat();
    });
    lay(0.85, () => { hound(620, 1800, t); });
    // 7. передний план: искры факелов, дымка, край лавки
    lay(0.62, () => {
      poly([[-300, 1880], [420, 1860], [440, 2400], [-300, 2400]], { wash: '#2a160a', washA: 1, w: 3, col: '#0a0402', shade: { gap: 6, a: 0.4, col: '#000', ang: 0.2 } });
      push(330, 1850, 1); ell(0, 0, 70, 18, { wash: '#3a200e', washA: 1, w: 2.4, col: '#0a0402' }); pop();
    });
    motes(26, [-100, 300, W + 100, 1500], '#ffd890', t, 31, { sp: -40, sz: 2.6, a: 0.7, wob: 30, add: 1, tw: 1 });
    motes(30, [500, 400, 1100, 1300], '#fff2d0', t, 32, { sp: 8, sz: 1.8, a: 0.45, wob: 40, vx: -10 });
  };

  // ------------------------------------------------------------------ режиссура
  DIR.feast = {
    outfit: 'knyaz', light: { side: 1, rim: '#ffcf8a' }, grade: ['#7a4410', 0.3],
    act: () => [[S0.feast, 'talk'], [EV.feast_moskva, 'proud'], [EV.feast_inv, 'grin'], [EV.feast_toast, 'laugh'], [EV.feast_boar - 0.02, 'shock'], [EV.feast_boar + 0.38, 'grin'], [EV.feast_pile + 0.55, 'smug']],
    pose: (t, u, b) => {
      const m = EV.feast_moskva, inv = EV.feast_inv, bo = EV.feast_boar; let hand, look, tilt = 0, nod = false;
      if (t < m - 0.08) { const k = sm((t - S0.feast - 0.1) / 0.35); hand = [lerp(82, 150, k), lerp(-150, -268, k)]; look = [0.95, -0.12]; tilt = 0.07; }
      else if (t < inv) { const k = sm((t - m + 0.08) / 0.25); hand = [lerp(150, 40, k), lerp(-268, -212, k)]; look = [0.05, 0.02]; }
      else if (t < bo - 0.05) { const k = sm((t - inv) / 0.35); hand = [lerp(40, 88, k), lerp(-212, -336, k)]; look = [0.3, -0.45]; tilt = -0.05 * k; }
      else { const k = sm((t - bo) / 0.3); hand = [lerp(88, 112, k), lerp(-336, -236, k)]; look = [0.8, -0.1]; nod = t > bo + 0.5; tilt = 0.06; }
      const sq = t > bo && t < bo + 0.3 ? 0.35 * (1 - (t - bo) / 0.3) : b.squash;
      return Object.assign(b, { x: 300, s: 1.1, prop: 'goblet', hand, look, tilt, nod, tailUp: t > bo, squash: sq });
    },
    cam: () => [[S0.feast, 600, 960, -0.08], [S0.feast + 0.55, 610, 990, 0.1, 'x'], [EV.feast_moskva, 560, 970, 0.05], [EV.feast_sil, 550, 965, 0.03], [EV.feast_boar + 0.12, 570, 1080, 0.18, 'x'], [S1.feast, 565, 1075, 0.22]]
  };

  // ------------------------------------------------------------------ переход В пир: клякса чернил с пера летописца
  function blotPath(cx, cy, R, seed) {
    const p = new Path2D(), n = 90;
    for (let i = 0; i <= n; i++) {
      const a = i / n * 6.2832, r = rng(seed * 100 + i);
      const k = 1 + 0.12 * Math.sin(a * 3 + seed) + 0.08 * Math.sin(a * 7 + seed * 2) + 0.05 * Math.sin(a * 13 + 1) + (i % 9 === 0 ? 0.22 * r() : 0) + 0.03 * r();
      const x = cx + Math.cos(a) * R * k, y = cy + Math.sin(a) * R * k * 1.08; i ? p.lineTo(x, y) : p.moveTo(x, y);
    }
    p.closePath(); return p;
  }
  TRANS_IN.feast = { a: 0.34, b: 0.5, fx(k, t, A, B) {
    const cx = 560, cy = 980, kd = 0.24, kb = 0.4;
    drawBuf(A, 1 + k * 0.04);
    scr(() => {
      // перо сверху и капля
      if (k < kd + 0.08) { const nk = sm(k / 0.12), ny = lerp(-260, 60, nk) - clamp((k - kd) / 0.08) * 300;
        push(cx + 30, ny, 1, 0.5); blob([[0, 0], [16, -60], [40, -220], [20, -330], [-6, -200], [-10, -60]], { wash: '#f4f0e6', washA: 1, w: 2.4, col: '#2a2a2a' }); poly([[-6, 0], [8, 0], [2, 40]], { wash: '#3a2a1a', washA: 1, w: 2 }); pop();
        if (k > 0.1 && k < kd) { const dk = (k - 0.1) / (kd - 0.1), dy = lerp(110, cy, dk * dk); ell(cx + 22, dy, 16, 22 + dk * 30, { wash: '#2a1408', washA: 1, w: 2, col: '#120804' }); } }
      if (k >= kd) {
        const e = (k - kd) / (1 - kd), R = 30 + 1700 * (1 - Math.pow(1 - e, 2.4)), path = blotPath(cx, cy, R, 3);
        // брызги вокруг
        for (let i = 0; i < 26; i++) { const r = rng(i * 7 + 1), a = r() * 6.283, d = R * (1.05 + r() * 0.6) * clamp(e * 4), s = (6 + r() * 26) * (1 - e * 0.3);
          ell(cx + Math.cos(a) * d, cy + Math.sin(a) * d, s, s * (0.7 + r() * 0.5), { wash: '#2a1408', washA: 0.95 * (1 - clamp((e - 0.6) / 0.4)), w: 1.6, col: '#120804', rot: a }); }
        const inner = clamp((k - kb) / 0.35);       // внутри кляксы проступает пир
        inPath(path, () => { ctx.globalAlpha = 1; ctx.fillStyle = '#2a1408'; ctx.fillRect(0, 0, W, H);
          if (inner > 0) { drawBuf(B, 1.08 - 0.08 * inner, cx, cy, inner); ctx.save(); ctx.globalAlpha = 0.5 * (1 - inner); ctx.fillStyle = '#3a1c0a'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
        // край кляксы: потемневший ободок железо-галловых чернил
        ctx.save(); ctx.lineWidth = 34 * (1 - e * 0.5); ctx.strokeStyle = 'rgba(30,12,4,' + (0.85 * (1 - clamp((e - 0.55) / 0.45))) + ')'; ctx.stroke(path); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(120,70,30,' + (0.6 * (1 - e)) + ')'; ctx.stroke(path); ctx.restore();
      }
    });
  } };
})();
