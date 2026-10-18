/* 003 — сцена `perun`: 988, круча над Днепром. Идол Перуна: деревянный, голова серебряная, усы золотые (ПВЛ, 980).
   При крещении Владимир велел привязать его к коню, бить палками (12 мужей) и сбросить в Днепр (ПВЛ, 988).
   Том в льняной рубахе с вышивкой и с палкой. Переход В сцену: грамота раскалывается на куски сургуча и осыпается. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.per_gold = wt('s6', 'золотыми');             // блеск усов
  EV.per_vlad = wt('s6', 'Владимир');             // князь указывает
  EV.per_beat = wt('s6', 'отлупить');             // удары палками
  EV.per_fall = wt('s6', 'Днепр!') - 0.15;        // идол валится и катится в реку
  const BEATS = [0, 0.22, 0.44, 0.62].map(d => EV.per_beat + d);
  EV.per_splash = Math.min(EV.per_fall + 0.75, S1.perun - 0.1);
  SHAKES.push(...BEATS.map(b => [b, 0.12, 6]), [EV.per_splash, 0.3, 12]);
  KEYW.push('палками', 'Днепр!');

  const IX = 380, IY = 1330;
  function idolSt(t) {                                               // положение идола: качание от ударов, падение, скольжение к воде
    let wob = 0; for (const b of BEATS) if (t > b && t < b + 0.3) wob += Math.sin((t - b) * 40) * 0.05 * (1 - (t - b) / 0.3);
    if (t < EV.per_fall) return { x: IX, y: IY, rot: wob, a: 1 };
    const q = clamp((t - EV.per_fall) / (EV.per_splash - EV.per_fall)), rot = Math.min(1.5, sm(q / 0.35) * 1.5);
    return { x: IX + Math.pow(q, 1.4) * 600, y: IY + Math.pow(q, 1.6) * 330, rot, a: 1 - sm((q - 0.85) / 0.15) };
  }
  function idol(t) {
    const S = idolSt(t); if (S.a <= 0) return;
    push(S.x, S.y, 1, S.rot); ctx.save(); ctx.globalAlpha = S.a;
    const b = shape([[-96, 0], [-100, -300], [-118, -400], [-90, -446], [90, -446], [118, -400], [100, -300], [96, 0]], { wash: '#8a5a32', washA: 1, w: 3, col: '#2a1608', key: 7700 });
    fstr(b.path, b.bb, 30, 1.57, 60, '#4a2c14', 0.5, 7701); shadeG(b.path, 70, 0, -40, 0, '#3a2010', 0.5);
    for (const y of [-120, -260]) { rect(-74, y - 12, 148, 24, { wash: '#6a4224', washA: 1, w: 2, col: '#2a1608' }); for (let k = 0; k < 7; k++) pencil([[-64 + k * 20, y - 10], [-54 + k * 20, y + 10]], { w: 2, col: '#2a1608', pass2: false }); }
    blob([[-60, -330], [-100, -250], [-90, -200], [-50, -280]], { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' }); blob([[60, -330], [110, -260], [96, -210], [50, -280]], { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' });
    // голова — серебро
    const hp = blob([[-96, -440], [-104, -540], [-84, -610], [84, -610], [104, -540], [96, -440]], { wash: '#b8bec4', washA: 1, w: 3, col: '#2a3036', key: 7702 }); metalG(hp.path, 30, -580, 160, '#ffffff', '#b8bec4', '#4a5058');
    for (const sd of [-1, 1]) { ell(sd * 34, -560, 18, 10, { wash: '#2a3036', washA: 1, w: 2 }); pencil([[sd * 14, -590], [sd * 56, -600]], { w: 4, col: '#2a3036', pass2: false }); }
    poly([[-8, -560], [8, -560], [12, -520], [-12, -520]], { wash: '#9aa0a6', washA: 1, w: 1.8, col: '#2a3036' });
    // золотые усы (с блеском)
    for (const sd of [-1, 1]) { const m = shape(tubeP([[0, -506], [sd * 40, -500], [sd * 80, -514], [sd * 100, -540], [sd * 92, -556]], 22, 8), { wash: '#d6a842', washA: 1, w: 2.2, col: '#6a4a08' }); metalG(m.path, sd * 50, -514, 70, '#fff2b0', '#d6a842', '#7a5414'); }
    const gl = t > EV.per_gold && t < EV.per_gold + 0.7 ? Math.sin(clamp((t - EV.per_gold) / 0.7) * Math.PI) : 0; if (gl > 0) { glow(70, -530, 120 * gl, 'rgba(255,240,170,1)', 0.95); for (let k = 0; k < 4; k++) { const a = k * 1.57 + t; pencil([[70, -530], [70 + Math.cos(a) * 90 * gl, -530 + Math.sin(a) * 90 * gl]], { w: 4, col: '#fff6c8', a: gl, pass2: false }); } }
    pencil([[-30, -480], [0, -470], [30, -480]], { w: 3, col: '#2a3036', pass2: false });
    const hm = blob([[-100, -600], [-80, -680], [0, -760], [80, -680], [100, -600]], { wash: '#b8bec4', washA: 1, w: 3, col: '#2a3036', key: 7703 }); metalG(hm.path, 30, -680, 140, '#ffffff', '#b8bec4', '#4a5058');
    rect(-104, -616, 208, 20, { wash: '#d6a842', washA: 1, w: 2, col: '#6a4a08' }); pencil([[0, -760], [0, -800]], { w: 6, col: '#d6a842', pass2: false });
    const bd = blob([[-60, -470], [-50, -400], [0, -370], [50, -400], [60, -470], [0, -456]], { wash: '#c8ccd0', washA: 1, w: 2.2, col: '#2a3036' }); metalG(bd.path, 20, -440, 80, '#ffffff', '#b8bec4', '#4a5058');
    ctx.restore(); pop();
    for (const b2 of BEATS) if (t > b2 && t < b2 + 0.28) { const q = (t - b2) / 0.28; push(IX + (b2 * 997 % 1 - 0.5) * 160, IY - 380 - (b2 * 613 % 1) * 200, 0.6 + q); ctx.save(); ctx.globalAlpha = 1 - q;
      poly([...Array(16)].map((_, i) => { const a = i / 16 * 6.283, r = i % 2 ? 26 : 60; return [Math.cos(a) * r, Math.sin(a) * r]; }), { wash: '#fff2c0', washA: 1, w: 2.4, col: '#6a3a08' }); txt('БУМ', 0, 2, 26, { font: 'Osw', col: '#6a1a08' }); ctx.restore(); pop(); }
  }
  function man(x, y, s, t, k, phase) {                               // дружинник с палкой, лупит идола
    const sw = t > EV.per_beat && t < EV.per_fall ? Math.sin((t - EV.per_beat) * 14 + phase) : -0.6;
    push(x, y, s, 0, k % 2 ? -1 : 1);
    blob([[-40, 0], [-46, -150], [-30, -200], [30, -200], [46, -150], [40, 0]], { wash: '#e8e0cc', washA: 1, w: 2.2, col: '#3a2a1a', key: 7710 + k });
    for (let q = 0; q < 5; q++) pencil([[-40 + q * 20, -30], [-30 + q * 20, -10]], { w: 2.4, col: '#a8241e', pass2: false }); rect(-44, -90, 88, 12, { wash: '#a8241e', washA: 1, w: 1.4 });
    ell(0, -228, 26, 30, { wash: '#d8b090', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-26, -228], [0, -262], [26, -228], [18, -214], [-18, -214]], { wash: '#6a4a2a', washA: 1, w: 1.6 }); blob([[-20, -214], [0, -186], [20, -214]], { wash: '#8a6a4a', washA: 1, w: 1.4 });
    push(30, -170, 1, -0.6 - sw * 0.9); pencil([[0, 0], [130, -10]], { w: 9, col: '#6a4424' }); ell(132, -10, 9, 8, { wash: '#5a3418', washA: 1, w: 1.4 }); pop();
    pop();
  }
  function prince(x, y, t) {                                         // князь Владимир на круче: указывает на реку
    const pt = t > EV.per_vlad ? sm((t - EV.per_vlad) / 0.3) : 0; push(x, y, 1.55);
    blob([[-60, 0], [-70, -200], [-46, -260], [46, -260], [70, -200], [60, 0]], { wash: '#8a1a22', washA: 1, w: 2.4, col: '#2a0608', key: 7720 }); for (let k = 0; k < 5; k++) ell(0, -240 + k * 40, 5, 5, { wash: '#d6a842', washA: 1, w: 1 });
    rect(-62, -120, 124, 14, { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' });
    ell(0, -296, 34, 38, { wash: '#e0b894', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-34, -290], [-20, -240], [0, -226], [20, -240], [34, -290], [0, -270]], { wash: '#6a4a2a', washA: 1, w: 1.8 });
    blob([[-40, -320], [-36, -366], [0, -380], [36, -366], [40, -320]], { wash: '#a8241e', washA: 1, w: 2, col: '#3a0808' }); rect(-44, -330, 88, 20, { wash: '#4a3020', washA: 1, w: 1.8 });
    pencil([[40, -220], [40 + 90 * pt, -230 - 40 * pt]], { w: 18, col: '#8a1a22' }); ell(44 + 96 * pt, -232 - 42 * pt, 12, 10, { wash: '#e0b894', washA: 1, w: 1.6 });
    pop();
  }
  function river(t) {
    const p = poly([[-300, 1520], [1500, 1440], [1500, 2400], [-300, 2400]], { wash: '#4a7a92', washA: 1, w: 2, col: '#1e3a4a', key: 7730 });
    for (let k = 0; k < 14; k++) { const y = 1540 + k * 30, x = ((t * 40 + k * 137) % 1500) - 200; pencil([[x, y], [x + 80, y - 4], [x + 160, y]], { w: 2.4, col: '#c8e0ea', a: 0.6, pass2: false }); }
    if (t > EV.per_splash - 0.02) { const q = clamp((t - EV.per_splash) / 0.6), sx = IX + 600, sy = IY + 330;
      for (let i = 0; i < 18; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 17), d = q * (300 + (i % 4) * 90); ell(sx + Math.cos(a) * d, sy + Math.sin(a) * d * 1.4 + q * q * 300, 14 * (1 - q) + 4, 18 * (1 - q) + 4, { wash: '#e8f4f8', washA: 1 - q, w: 1.4, col: '#3a6a82' }); }
      blob([[sx - 140 * (0.4 + q), sy], [sx - 60, sy - 220 * Math.sin(q * Math.PI)], [sx, sy - 300 * Math.sin(q * Math.PI)], [sx + 60, sy - 220 * Math.sin(q * Math.PI)], [sx + 140 * (0.4 + q), sy]], { wash: '#e8f4f8', washA: 0.9 * (1 - q), w: 2, col: '#3a6a82' }); }
  }

  function cloud(x, y, w, h, a, seed) { const r = rng(seed); for (let k = 0; k < 7; k++) { const cx = x + (k - 3) * w / 7 + (r() - 0.5) * 20, cy = y - Math.sin(k / 6 * Math.PI) * h * 0.6 + (r() - 0.5) * 10; ell(cx, cy, w * 0.16 + r() * 20, h * 0.4 + r() * 10, { wash: '#fbf6ea', washA: a, w: 1.4, col: '#a8a090', a: 0.35 }); } sil([[x - w / 2, y + 10], [x + w / 2, y + 10], [x + w / 2 - 30, y + 26], [x - w / 2 + 30, y + 26]], '#d8d0c0', a * 0.6); }
  function birds(t, x0, y0, n, seed) { const r = rng(seed); for (let k = 0; k < n; k++) { const x = x0 + r() * 300 + t * 30, y = y0 + r() * 120, f = Math.sin(t * 9 + k) * 8; pencil([[x - 12, y - f], [x, y], [x + 12, y - f]], { w: 2.4, col: '#3a3430', pass2: false }); } }
  function farBank(t) {                                              // левый берег, острова, ладьи с парусами
    sil([[-400, 1180], [1500, 1150], [1500, 1260], [-400, 1260]], '#8aa48a', 1);
    for (let k = 0; k < 26; k++) { const x = -300 + k * 70; sil([[x, 1180], [x + 18, 1140 - (k % 4) * 12], [x + 36, 1180]], k % 2 ? '#5f7f5f' : '#6f8f6a', 0.9); }
    sil([[-400, 1260], [1500, 1230], [1500, 1400], [-400, 1400]], '#7aa0b0', 1);
    for (let k = 0; k < 10; k++) { const y = 1270 + k * 12, x = ((t * 20 + k * 211) % 1700) - 300; pencil([[x, y], [x + 60, y]], { w: 2, col: '#e8f2f4', a: 0.5, pass2: false }); }
    sil([[300, 1300], [520, 1290], [600, 1310], [280, 1316]], '#9ab48a', 1);
    for (const [bx, bs] of [[150, 0.5], [760, 0.42], [1000, 0.36]]) { const x = bx + Math.sin(t * 0.3 + bx) * 20; push(x, 1300, bs); blob([[-90, 0], [90, 0], [110, -26], [-110, -26]], { wash: '#6a4424', washA: 1, w: 2, col: '#2a1608' }); pencil([[0, -26], [0, -200]], { w: 5, col: '#4a2c14' }); const sl = poly([[-70, -190], [70, -190], [76, -50], [-76, -50]], { wash: '#efe4cc', washA: 1, w: 2, col: '#3a2a14' }); ctx.save(); ctx.clip(sl.path); for (let q = -70; q < 76; q += 36) { ctx.fillStyle = 'rgba(168,36,30,0.85)'; ctx.fillRect(q, -200, 18, 160); } ctx.restore(); pop(); }
  }
  function cityHill(t) {                                             // город Владимира на горе: валы, тын, башни, недостроенная церковь в лесах
    const P = [[-400, 1400], [-400, 980], [-100, 900], [260, 870], [520, 900], [640, 980], [700, 1100], [760, 1300], [800, 1400]];
    const h = shape(P, { wash: '#8a9a5a', washA: 1, w: 2.2, col: '#2a3014', key: 7750 }); hatch(h.path, h.bb, { gap: 9, a: 0.16, col: '#2a3014', ang: -0.6, key: 7751 });
    for (let x = -380; x < 600; x += 18) { const y = 905 - Math.sin((x + 380) / 980 * Math.PI) * 40; pencil([[x, y], [x, y - 64]], { w: 9, col: x % 36 ? '#9a6e40' : '#8a5e34' }); poly([[x - 5, y - 64], [x, y - 76], [x + 5, y - 64]], { wash: '#8a5e34', washA: 1, w: 1 }); }
    for (const [x, y, hh] of [[-260, 900, 150], [80, 860, 170], [420, 870, 150]]) { rect(x - 40, y - hh, 80, hh, { wash: '#a87a48', washA: 1, w: 2.2, col: '#2a1a0a' }); for (let q = 0; q < 5; q++) pencil([[x - 40, y - hh + q * 30], [x + 40, y - hh + q * 30]], { w: 1.4, col: '#5a3a1a', a: 0.6, pass2: false }); poly([[x - 52, y - hh], [x, y - hh - 70], [x + 52, y - hh]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a0a' }); rect(x - 10, y - hh + 30, 20, 26, { wash: '#2a1a0a', washA: 1, w: 1 }); }
    // недостроенная каменная церковь (Десятинная, с 989) в лесах
    push(250, 830, 1); rect(-90, -170, 180, 170, { wash: '#e8d8b8', washA: 1, w: 2.2, col: '#4a3a2a' }); for (let q = 0; q < 6; q++) pencil([[-90, -170 + q * 28], [90, -170 + q * 28]], { w: 1.4, col: '#b88a5a', a: 0.7, pass2: false });
    for (const x of [-60, 0, 60]) blob([[x - 20, -80], [x - 20, -130], [x, -146], [x + 20, -130], [x + 20, -80]], { wash: '#4a3a2a', washA: 0.85, w: 1.4 });
    rect(-36, -250, 72, 80, { wash: '#e8d8b8', washA: 1, w: 2, col: '#4a3a2a' }); for (const x of [-110, -70, 70, 110]) pencil([[x, 0], [x, -280]], { w: 4, col: '#7a5a34' }); for (const y of [-60, -140, -220]) pencil([[-120, y], [120, y]], { w: 4, col: '#7a5a34' }); pencil([[-110, -140], [-70, -220]], { w: 3, col: '#7a5a34' }); pencil([[70, -60], [110, -140]], { w: 3, col: '#7a5a34' });
    for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; human(-40 + k * 50, -60 - k * 80, 0.22, t, { body: '#c8b090', armR: 'swing', seed: 40 + k }); }
    pop();
    for (let k = 0; k < 3; k++) { const u = (t * 0.25 + k / 3) % 1; glow(-200 + k * 300, 760 - u * 200, 30 + u * 50, 'rgba(170,160,150,1)', 0.3 * (1 - u), 'source-over'); }
  }
  function smallIdol(x, y, s, t, k, pulled) {                         // другие идолы пантеона: Хорс, Даждьбог, Стрибог… — их тоже валят
    const lean = pulled ? Math.sin(t * 1.6 + k) * 0.06 + 0.12 : 0; push(x, y, s, lean);
    const b = shape([[-40, 0], [-44, -220], [-30, -270], [30, -270], [44, -220], [40, 0]], { wash: ['#7a5232', '#8a6038', '#6e4a2c'][k % 3], washA: 1, w: 2.4, col: '#2a1608', key: 7760 + k }); fstr(b.path, b.bb, 16, 1.57, 50, '#3a2210', 0.5, 7761 + k);
    ell(0, -300, 34, 38, { wash: ['#9a7448', '#a88050', '#8a6a40'][k % 3], washA: 1, w: 2.2, col: '#2a1608' }); for (const sd of [-1, 1]) ell(sd * 12, -306, 5, 4, { wash: '#1a0e06', washA: 1, line: false }); pencil([[-12, -284], [12, -284]], { w: 2.4, col: '#1a0e06', pass2: false });
    rect(-44, -120, 88, 14, { wash: '#5a3a1a', washA: 1, w: 1.4 }); if (k === 1) { for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283; pencil([[Math.cos(a) * 40, -300 + Math.sin(a) * 44], [Math.cos(a) * 56, -300 + Math.sin(a) * 60]], { w: 3, col: '#d6a842', pass2: false }); } }
    pop();
    if (pulled) { pencil([[x + 20 * s, y - 240 * s], [x + 200 * s, y - 40 * s]], { w: 3, col: '#c8b080', pass2: false }); }
  }
  function horse(x, y, s, t, tug) {                                  // конь, к хвосту которого привязали Перуна (ПВЛ, 988)
    const ph = t * 6, st = tug ? Math.sin(ph) * 10 : 0; push(x, y, s);
    for (let k = 0; k < 4; k++) { const lx = [-90, -60, 60, 90][k], sw = tug ? Math.sin(ph + k * 1.6) * 16 : 0; pencil([[lx, -150], [lx + sw, -70], [lx + sw * 0.6, -6]], { w: 16, col: k % 2 ? '#5a3a20' : '#6a4426' }); ell(lx + sw * 0.6, -4, 12, 7, { wash: '#2a1a0c', washA: 1, w: 1.2 }); }
    const b = blob([[-130, -150], [-110, -220], [60, -230], [130, -200], [140, -140], [100, -110], [-110, -110]], { wash: '#7a4e2c', washA: 1, w: 2.8, col: '#1e1008', key: 7770 }); shadeG(b.path, 0, -110, 0, -230, '#3a2210', 0.5);
    const n = blob([[100, -200], [150, -300], [200, -320], [214, -290], [170, -260], [140, -160]], { wash: '#7a4e2c', washA: 1, w: 2.6, col: '#1e1008' });
    blob([[190, -320], [240, -300], [250, -270], [214, -270], [196, -290]], { wash: '#7a4e2c', washA: 1, w: 2.4, col: '#1e1008' }); ell(216, -306, 4, 4, { wash: '#0a0604', washA: 1, line: false });
    for (let q = 0; q < 8; q++) pencil([[110 + q * 10, -200 - q * 14], [96 + q * 10, -180 - q * 14]], { w: 6, col: '#2a1a0c', pass2: false });
    pencil(spline([[-130, -190], [-170, -170 + st], [-190, -120 + st], [-200, -80 + st]], false, 8), { w: 14, col: '#2a1a0c' });
    pencil([[150, -230], [130, -200], [80, -190]], { w: 3, col: '#a8241e', pass2: false });
    pop();
  }
  function crowd(t) {                                                // киевляне смотрят (позади, на склоне)
    const P = [[-120, 1330, 0.62, { body: '#c8b8a0', hat: 'scarf', hatCol: '#c83a2a', face: 'shock', seed: 21 }], [-30, 1320, 0.58, { body: '#8a6a4a', hair: '#3a2a1a', beard: 'short', face: 'smile', armR: 'wave', seed: 22 }],
      [70, 1315, 0.5, { body: '#d8c8a8', hat: 'scarf', hatCol: '#e8c040', face: 'grin', seed: 23 }], [470, 1325, 0.56, { body: '#6a7a8a', hair: '#5a3a1a', beard: 'long', face: 'shock', armL: 'up', seed: 24 }], [600, 1335, 0.5, { body: '#e8dcc8', hat: 'scarf', hatCol: '#3a6aa0', face: 'smile', seed: 25 }]];
    for (const [x, y, s, o] of P) human(x, y, s, t, Object.assign({ legs: '#4a3a2a', trim: '#a8241e' }, o));
  }
  function meadow(t) {
    const g = poly([[-400, 1300], [560, 1330], [900, 1420], [1100, 1560], [1100, 2400], [-400, 2400]], { wash: '#7a9a4a', washA: 1, w: 2.6, col: '#2a3014', key: 7740 }); hatch(g.path, g.bb, { gap: 8, a: 0.2, col: '#2a3014', ang: -0.4, key: 7741 });
    poly([[600, 1340], [900, 1430], [1100, 1580], [1100, 2400], [1000, 2400], [880, 1500]], { wash: '#b8946a', washA: 1, w: 2, col: '#3a2a14' });
    const r = rng(7742); for (let k = 0; k < 70; k++) { const x = -300 + r() * 1000, y = 1360 + r() * 700; if (x > 640 + (y - 1340) * 0.6) continue; pencil([[x, y], [x + 4, y - 18 - r() * 12]], { w: 2.4, col: '#4a6a2a', pass2: false }); if (r() < 0.3) ell(x + 4, y - 22, 5, 5, { wash: ['#e8e0f0', '#f0c040', '#d84a6a'][k % 3], washA: 1, line: false }); }
    for (const [x, y, rr] of [[-80, 1560, 30], [380, 1700, 24], [700, 1600, 20]]) ell(x, y, rr * 1.6, rr, { wash: '#a8a090', washA: 1, w: 2, col: '#3a3428' });
    // путь «по Боричеву» вниз: колея, следы волока
    if (t > EV.per_fall) { const q = clamp((t - EV.per_fall) / 0.6); pencil([[IX, IY], [lerp(IX, IX + 600, q), lerp(IY, IY + 330, q)]], { w: 10, col: '#6a4a2a', a: 0.5, pass2: false }); }
  }

  WORLD.perun = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1600, ['#8ab8d8', '#d8e6e4', '#f6dcaa']); glow(900, 700, 520, 'rgba(255,236,190,1)', 0.6); cloud(200, 420, 380, 120, 0.85, 7781); cloud(860, 560, 300, 90, 0.75, 7782); cloud(-60, 700, 260, 70, 0.6, 7783); birds(t, 300, 600, 6, 7784); });
    lay(18, () => { farBank(t); haze('#e0e8e0', 0.22); });
    lay(6, () => { cityHill(t); smallIdol(-200, 1150, 0.7, t, 0, true); smallIdol(-60, 1140, 0.66, t, 1, true); smallIdol(560, 1150, 0.62, t, 2, false); haze('#e8e2c8', 0.12); });
    lay(1.4, () => { river(t); });
    lay(1, () => { meadow(t); crowd(t);
      const tug = t > EV.per_beat, hx = tug ? lerp(960, 1010, sm((t - EV.per_beat) / 1.5)) : 960; horse(hx, 1400, 0.75, t, tug);
      if (t < EV.per_fall) pencil([[hx - 150, 1400 - 70], [IX + 60, IY - 120]], { w: 4, col: '#c8b080', pass2: false });
      human(30, 1340, 1.05, t, { body: '#9a1a24', trim: '#d6a842', belt: '#4a2c14', legs: '#3a2418', boots: '#5a3a1a', hair: '#5a3a1a', beard: 'short', hat: 'fur', hatCol: '#a8241e', face: t > EV.per_vlad ? 'angry' : 'calm', armR: t > EV.per_vlad ? 'point' : 'hips', armL: 'hips', look: 0.6, seed: 31 });
      const beat = t > EV.per_beat && t < EV.per_fall;
      human(200, 1350, 1.1, t, { body: '#e8e0cc', trim: '#a8241e', belt: '#a8241e', legs: '#5a4a3a', hair: '#7a5a2a', beard: 'short', face: beat ? 'grin' : 'calm', armR: beat ? 'swing' : 'down', prop: 'stick', propAng: beat ? -0.6 : 0.2, look: 0.7, seed: 32 });
      idol(t);
      human(570, 1360, 1.1, t, { body: '#d8ccb0', trim: '#2a4a8a', belt: '#2a4a8a', legs: '#4a3a2a', hair: '#3a2a1a', beard: 'long', face: beat ? 'angry' : 'calm', armR: beat ? 'swing' : 'down', prop: 'stick', propAng: beat ? -0.6 : 0.2, look: -0.7, flip: -1, seed: 33 });
      cat(); });
  };
  DIR.perun = {
    outfit: 'rubakha', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a060', 0.1],
    act: () => [[S0.perun, 'smug'], [EV.per_gold, 'awe'], [EV.per_vlad, 'sideeye'], [EV.per_beat, 'grin'], [EV.per_fall, 'laugh']],
    pose: (t, u, b) => { const hit = t > EV.per_beat && t < EV.per_fall; return Object.assign(b, {
      x: 780, y: 1440, s: 1.0, look: t > EV.per_fall ? [0.6, 0.4] : [-0.7, -0.4], prop: 'stick', propAng: hit ? -1.2 + Math.sin((t - EV.per_beat) * 14) * 0.9 : -0.3,
      hand: hit ? [-90, -330 + Math.sin((t - EV.per_beat) * 14) * 60] : undefined, tilt: hit ? Math.sin((t - EV.per_beat) * 14) * 0.05 : 0, tailUp: t > EV.per_fall }); },
    cam: () => [[S0.perun, 420, 880, 0.16], [EV.per_gold + 0.3, 440, 860, 0.2], [EV.per_vlad, 460, 1000, 0.06], [EV.per_beat, 520, 1060, 0.04], [EV.per_fall, 600, 1140, 0.04], [EV.per_splash, 760, 1260, 0.08], [S1.perun, 780, 1280, 0.1]]
  };
  // ---------------------------------------------------------------- переход В сцену: кадр-грамота раскалывается и осыпается кусками сургуча
  TRANS_IN.perun = { a: 0.24, b: 0.36, runA: 0, holdA: true, fx(k, t, A, B) {
    drawBuf(B, 1.05 - 0.05 * sm(k));
    const N = 6, M = 10, cw = W / N, ch = H / M;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const r = rng(i * 31 + j * 7 + 3), delay = (r() * 0.3 + (M - j) * 0.02), q = clamp((k - delay) / 0.6); if (q >= 1) continue;
      const x0 = i * cw, y0 = j * ch, dx = (r() - 0.5) * 200 * q, dy = q * q * 1600, rot = (r() - 0.5) * 2 * q;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x0 + cw / 2 + dx, y0 + ch / 2 + dy); ctx.rotate(rot); ctx.beginPath(); ctx.moveTo(-cw / 2 - r() * 10, -ch / 2); ctx.lineTo(cw / 2 + 6, -ch / 2 - r() * 12); ctx.lineTo(cw / 2, ch / 2 + 8); ctx.lineTo(-cw / 2 + r() * 12, ch / 2); ctx.closePath(); ctx.clip();
      ctx.drawImage(A, -(x0 + cw / 2), -(y0 + ch / 2)); ctx.strokeStyle = '#a8201e'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); }
  } };
})();
