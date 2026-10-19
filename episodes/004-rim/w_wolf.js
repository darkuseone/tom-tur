/* 004 — сцена `wolf`: 753 до н. э. → XII в. → XV в. Сначала легенда: ночь у Тибра, смоковница, живая волчица кормит Ромула и Рема,
   пастух Фаустул подглядывает из камыша. На «Отлита» — клуб дыма, средневековая литейня: из тигля льют бронзу, на постаменте свежая
   бронзовая волчица БЕЗ близнецов, бирка «XII век». На «приделали» мастер в берете (Поллайоло) прилаживает бронзовых близнецов — «XV век».
   Том — литейщик (из 002). Переход В сцену: лунный ирис — пепел расходится, в луне силуэт воющей волчицы. */
(() => {
  EV.wolf_cast = WT('s2', 'Отлита');
  EV.wolf_twins = WT('s2', 'приделали');
  EV.wolf_late = WT('s2', 'позднее!');
  SHAKES.push([EV.wolf_cast, 0.2, 7]);
  KEYW.push('Средневековье.', 'позднее!');
  const PH = t => t < EV.wolf_cast ? 0 : 1;

  function wolf(x, y, s, t, o = {}) {                                // волчица в профиль мордой влево. o.bronze — статуя, o.twins — близнецы, o.sil — силуэт
    const br = o.bronze, c = o.sil ? '#141020' : br ? '#8a5a2a' : '#8a827a', d = o.sil ? '#141020' : br ? '#3a2008' : '#3e3832', L = o.sil ? '#141020' : '#140c08', bt = br ? 0 : Math.sin(t * 2) * 3;
    const MG = (p, x0, y0, r) => { if (br && !o.sil) metalG(p, x0, y0, r, '#f6cc80', c, d); };
    push(x, y, s, 0, o.flip || 1);
    // хвост — пушистый, опущен
    const tl = shape(tubeP(spline([[150, -205], [196, -170], [214, -110], [204, -50]], false, 8), 44, 22), { wash: c, washA: 1, w: 2.4, col: L, key: 9603 }); MG(tl.path, 190, -150, 80); if (!br && !o.sil) fstr(tl.path, tl.bb, 30, 1.3, 16, d, 0.5, 9604, 2);
    // ноги: дальние темнее
    for (const [P, w0, far] of [[[[-70, -150], [-74, -70], [-70, 0]], 30, 1], [[[120, -170], [150, -90], [128, -40], [134, 0]], 40, 1], [[[-112, -150], [-110, -70], [-116, 0]], 34, 0], [[[96, -170], [122, -90], [100, -40], [104, 0]], 44, 0]]) {
      const lg = shape(tubeP(P, w0, 18), { wash: far ? d : c, washA: 1, w: 2.2, col: L }); MG(lg.path, P[0][0], -100, 80); const e = P[P.length - 1]; ell(e[0] - 10, 0, 20, 9, { wash: d, washA: 1, w: 1.6, col: L }); }
    // туловище: глубокая грудь, поджарое брюхо, рёбра
    const B = [[-140, -150], [-132, -206], [-96, -244 + bt], [10, -238 + bt], [112, -232], [160, -204], [166, -156], [124, -128], [40, -118], [-40, -112], [-110, -118]];
    const bp = blob(B, { wash: c, washA: 1, w: 2.8, col: L, key: 9600 }); MG(bp.path, -40, -210, 240);
    if (!br && !o.sil) { shadeG(bp.path, 0, -112, 0, -240, d, 0.5); fstr(bp.path, bp.bb, 80, 0.15, 18, d, 0.45, 9601, 2); }
    if (!o.sil) for (let k = 0; k < 4; k++) pencil(spline([[-60 + k * 22, -210], [-54 + k * 22, -170], [-60 + k * 22, -130]], false, 5), { w: 1.8, col: d, a: 0.5, pass2: false });
    if (!o.sil) for (let k = 0; k < 4; k++) ell(-30 + k * 26, -116, 9, 11, { wash: br ? '#a8723a' : '#d8b0a8', washA: 1, w: 1.4, col: L });     // соски
    // шея и голова
    const hy = o.howl ? -340 : -300, hx = o.howl ? -200 : -214;
    const nk = blob([[-136, -204], [-150, -262], [hx + 20, hy - 26], [hx + 34, hy + 30], [-150, -170], [-138, -150]], { wash: c, washA: 1, w: 2.4, col: L, key: 9605 }); MG(nk.path, -170, -260, 90);
    if (br && !o.sil) for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) { const xx = -140 - r * 14 + k * 30, yy = -248 + r * 26 - k * 6; pencil(spline([[xx, yy], [xx + 8, yy - 14], [xx + 18, yy]], false, 5), { w: 3, col: d, a: 0.85, pass2: false }); }
    else if (!o.sil) fstr(nk.path, nk.bb, 40, 1.0, 16, d, 0.5, 9606, 2);
    const HD = o.howl ? [[hx + 30, hy - 30], [hx - 10, hy - 50], [hx - 50, hy - 90], [hx - 70, hy - 100], [hx - 64, hy - 70], [hx - 30, hy + 4], [hx + 20, hy + 26], [hx + 36, hy + 6]]
      : [[hx + 30, hy - 30], [hx - 14, hy - 40], [hx - 54, hy - 20], [hx - 104, hy - 8], [hx - 108, hy + 10], [hx - 60, hy + 24], [hx - 10, hy + 30], [hx + 34, hy + 10]];
    const hd = blob(HD, { wash: c, washA: 1, w: 2.6, col: L, key: 9602 }); MG(hd.path, hx - 30, hy - 20, 90); if (!br && !o.sil) shadeG(hd.path, hx, hy + 30, hx, hy - 40, d, 0.35);
    for (const ex of [hx + 4, hx + 26]) poly([[ex - 14, hy - 30], [ex + 2, hy - 80], [ex + 14, hy - 30]], { wash: c, washA: 1, w: 2.2, col: L });
    if (!o.sil && !o.howl) { ell(hx - 30, hy - 14, 8, 5, { wash: br ? '#3a2008' : '#e8c040', washA: 1, w: 1.4, col: L }); ell(hx - 30, hy - 14, 2.4, 4, { wash: L, washA: 1, line: false }); ell(hx - 104, hy + 0, 9, 7, { wash: L, washA: 1, line: false });
      pencil([[hx - 100, hy + 16], [hx - 40, hy + 20]], { w: 2.4, col: L, pass2: false }); if (br) { for (let q = 0; q < 4; q++) poly([[hx - 92 + q * 14, hy + 16], [hx - 88 + q * 14, hy + 28], [hx - 84 + q * 14, hy + 16]], { wash: '#f6dca0', washA: 1, w: 1 }); } }
    if (o.twins) { const tk = o.twins, ty = 40 * (1 - tk); ctx.save(); ctx.globalAlpha *= tk; for (const [tx, fl] of [[-50, -1], [50, 1]]) twin(tx, -4 + ty, br, t, fl); ctx.restore(); }
    pop();
  }
  function twin(x, y, br, t, fl) {                                    // младенец сидит, запрокинув голову, тянет руки к волчице
    push(x, y, 1.0, 0, fl); const c = br ? '#9a6a30' : '#eab898', d = br ? '#4a2a08' : '#a8764e', L = '#1c120a', MG = (p, x0, y0, r) => { if (br) metalG(p, x0, y0, r, '#f6cc80', c, d); };
    for (const k of [-1, 1]) { const lg = shape(tubeP([[k * 10, -20], [k * 30, -6], [k * 46, 0]], 22, 16), { wash: c, washA: 1, w: 2, col: L }); MG(lg.path, k * 30, -10, 30); }
    const b = blob([[-26, -10], [-30, -50], [-16, -74], [16, -74], [30, -50], [26, -10]], { wash: c, washA: 1, w: 2.2, col: L }); MG(b.path, -6, -50, 50); if (!br) shadeG(b.path, 30, 0, -10, 0, d, 0.35);
    for (const k of [-1, 1]) { const ar = shape(tubeP([[k * 18, -66], [k * 26 - 6, -96], [k * 14 - 8, -124]], 16, 12), { wash: c, washA: 1, w: 2, col: L }); MG(ar.path, 0, -100, 30); ell(k * 14 - 8, -128, 8, 8, { wash: c, washA: 1, w: 1.6, col: L }); }
    const h = ell(-6, -100, 26, 25, { wash: c, washA: 1, w: 2.2, col: L }); MG(h.path, -12, -108, 30);
    if (!br) { blob([[-30, -108], [-20, -128], [6, -128], [20, -114], [0, -118]], { wash: '#6a3a1a', washA: 1, w: 1.4, col: L }); pencil([[-14, -100], [-8, -102]], { w: 2.4, col: L, pass2: false }); pencil([[4, -100], [10, -102]], { w: 2.4, col: L, pass2: false }); ell(-4, -86, 4, 3, { wash: '#a84a3a', washA: 1, line: false }); ell(-26, -92, 6, 4, { wash: '#f0a0a0', washA: 0.5, line: false }); }
    else for (let q = 0; q < 5; q++) pencil(spline([[-26 + q * 10, -118], [-22 + q * 10, -128], [-16 + q * 10, -120]], false, 4), { w: 2.4, col: d, pass2: false });
    pop();
  }
  // ---- легенда
  function legend(t, u, cat) {
    lay(40, () => { vgrad(-900, 1300, ['#0a1030', '#1a2a5a', '#3a4a7a', '#6a6a8a']); const r = rng(9610); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 140; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); ctx.fillRect(r() * 1700 - 300, r() * 1300 - 600, 2.4, 2.4); } ctx.restore();
      ell(820, 260, 150, 150, { wash: '#f6ecd0', washA: 1, w: 2, col: '#a89a7a' }); for (const [x, y, rr] of [[780, 220, 26], [860, 300, 18], [840, 230, 12]]) ell(x, y, rr, rr, { wash: '#d8ccb0', washA: 0.8, line: false }); glow(820, 260, 420, 'rgba(240,236,210,1)', 0.35); });
    lay(10, () => { hills(1150, 120, '#1a2440', 3.1); push(300, 1080, 0.5); for (let k = 0; k < 6; k++) { const x = -200 + k * 80; sil([[x, 0], [x, -60], [x + 30, -110], [x + 60, -60], [x + 60, 0]], '#141a30', 1); } pop(); haze('#3a4a7a', 0.18); });
    lay(4, () => { // Тибр с отблеском луны, камыши
      const w = poly([[-400, 1240], [1500, 1220], [1500, 1380], [-400, 1400]], { wash: '#1e3a5a', washA: 1, w: 2, col: '#0a1424' }); for (let k = 0; k < 14; k++) { const y = 1250 + k * 10, x = 820 + Math.sin(t * 2 + k) * 30; pencil([[x - 60 + k * 2, y], [x + 60 - k * 2, y]], { w: 3, col: '#f6ecd0', a: 0.6 - k * 0.04, pass2: false }); }
      for (let k = 0; k < 30; k++) { const x = -300 + k * 60, sw = Math.sin(t * 1.4 + k) * 8; pencil([[x, 1400], [x + sw, 1260 - (k % 3) * 30]], { w: 3, col: '#2a3a2a', pass2: false }); ell(x + sw, 1250 - (k % 3) * 30, 6, 18, { wash: '#4a3a24', washA: 1, w: 1.2 }); }
      // пастух Фаустул в камышах
      human(1080, 1360, 0.75, t, { body: '#6a5a3a', legs: '#4a3a2a', hair: '#3a2a1a', beard: 'long', face: 'shock', armL: 'up', armR: 'hold', prop: 'stick', look: -0.8, flip: -1, seed: 601 }); });
    lay(1.6, () => { // смоковница-фикус Руминалис и грот
      const tr = shape(tubeP([[160, 1460], [140, 1200], [180, 900], [140, 760]], 70, 30), { wash: '#3a2a1e', washA: 1, w: 2.4, col: '#0a0606' }); hatch(tr.path, tr.bb, { gap: 6, a: 0.3, col: '#000', ang: 1.4 });
      for (const [x, y, r] of [[60, 760, 170], [260, 700, 190], [140, 600, 160], [-40, 660, 140], [340, 840, 130]]) { const f = ell(x, y, r, r * 0.7, { wash: '#1e3a2a', washA: 1, w: 2, col: '#06140a' }); hatch(f.path, f.bb, { gap: 8, a: 0.25, col: '#000', ang: 0.6 }); }
      for (let k = 0; k < 24; k++) { const r = rng(9620 + k), x = -100 + r() * 480, y = 560 + r() * 320; poly([[x, y], [x + 16, y - 10], [x + 26, y + 6], [x + 10, y + 16]], { wash: '#2e5a3a', washA: 1, w: 1, col: '#06140a' }); if (k % 4 === 0) ell(x + 8, y + 18, 7, 8, { wash: '#6a3a5a', washA: 1, w: 1 }); }
      const g = poly([[-400, 1400], [1500, 1380], [1500, 2400], [-400, 2400]], { wash: '#3a4a3a', washA: 1, w: 2, col: '#0a140a' }); hatch(g.path, g.bb, { gap: 9, a: 0.2, col: '#000', ang: 0.4 }); });
    lay(1, () => { wolf(520, 1520, 1.1, t, { twins: 1 }); cat(); });
    motes(20, [0, 300, W, 1700], '#d8f0a0', t, 9630, { sp: -8, sz: 3, a: 0.7, tw: 1, add: 1, wob: 30 });   // светлячки
  }
  // ---- литейня XII–XV вв.
  function foundry(t, u, cat) {
    const late = t > EV.wolf_twins;
    lay(40, () => { vgrad(-900, 1400, ['#1a0e0a', '#3a1e12', '#6a3a1e', '#8a4a24']); glow(900, 900, 700, 'rgba(255,140,60,1)', 0.45); });
    lay(8, () => { // стены из кирпича, свод, окно с решёткой, инструменты
      const w = rect(-400, 300, 1900, 1100, { wash: '#5a3a28', washA: 1, w: 2, col: '#1a0e08' }); for (let y = 320; y < 1400; y += 34) pencil([[-400, y], [1500, y]], { w: 1.4, col: '#2a1608', a: 0.5, pass2: false }); for (let k = 0; k < 260; k++) { const r = rng(9640 + k), x = -400 + r() * 1900, y = 320 + Math.floor(r() * 32) * 34; pencil([[x, y], [x, y + 34]], { w: 1.2, col: '#2a1608', a: 0.5, pass2: false }); }
      pencil(spline([[-400, 300], [540, 120], [1500, 300]], false, 12), { w: 8, col: '#2a1608', pass2: false });
      rect(160, 460, 180, 240, { wash: '#2a3a5a', washA: 1, w: 2.4, col: '#0a0606' }); for (let x = 180; x < 340; x += 30) pencil([[x, 460], [x, 700]], { w: 4, col: '#0a0606', pass2: false }); rays(250, 560, 0.9, 0.3, 900, 'rgba(160,190,255,0.5)', 0.18, 6, t);
      for (let k = 0; k < 6; k++) { const x = 520 + k * 60; pencil([[x, 520], [x, 640 + (k % 3) * 30]], { w: 6, col: '#2a2a2a', pass2: false }); ell(x, 650 + (k % 3) * 30, 18, 8, { wash: '#4a4a4a', washA: 1, w: 1.6 }); }
      txt(late ? 'XV век' : 'XII век', 1060, 520, 64, { font: 'Hand', col: '#f6d890', rot: -0.06 }); haze('#3a1e12', 0.12); });
    lay(3, () => { // горн: печь с огнём, мехи, тигель на цепи льёт бронзу в форму
      const f = blob([[700, 1380], [720, 980], [860, 900], [1000, 980], [1020, 1380]], { wash: '#6a4a3a', washA: 1, w: 2.6, col: '#1a0e08' }); hatch(f.path, f.bb, { gap: 10, a: 0.25, col: '#000', ang: 0 });
      const fl = 0.8 + 0.2 * Math.sin(t * 13); blob([[780, 1300], [800, 1180], [860, 1140], [920, 1180], [940, 1300]], { wash: '#ffb44a', washA: 1, w: 2, col: '#6a1a08' }); glow(860, 1220, 260 * fl, 'rgba(255,150,50,1)', 0.7);
      for (let k = 0; k < 8; k++) { const ph = (t * 1.2 + k / 8) % 1; glow(860 + Math.sin(k * 5 + t) * 40, 1160 - ph * 400, 8, 'rgba(255,200,90,1)', 1 - ph); }
      push(600, 1300, 1); const bw = blob([[-100, 0], [-80, -60], [40, -50], [80, -20], [40, 10]], { wash: '#7a4a24', washA: 1, w: 2.2, col: '#1a0e08' }); pencil([[80, -20], [150, -40]], { w: 10, col: '#4a4a4a', pass2: false }); pop(); });
    lay(1, () => { // постамент со статуей
      const g = poly([[-400, 1420], [1500, 1420], [1500, 2400], [-400, 2400]], { wash: '#4a3024', washA: 1, w: 2, col: '#1a0e08' }); hatch(g.path, g.bb, { gap: 10, a: 0.2, col: '#000', ang: 0.3 });
      rect(160, 1300, 520, 140, { wash: '#8a7a68', washA: 1, w: 2.6, col: '#1a0e08', shade: { gap: 6, a: 0.2, col: '#000' } });
      const tw = late ? sm(clamp((t - EV.wolf_twins - 0.2) / 0.5)) : 0;
      wolf(430, 1300, 0.8, t, { bronze: 1, twins: tw });
      glow(430, 1150, 260, 'rgba(255,170,80,1)', 0.25);
      if (late) human(140, 1440, 0.95, t, { body: '#7a2a3a', legs: '#2a2a3a', trim: '#d6a842', hair: '#5a3a1a', hat: 'merchant', hatCol: '#3a1a24', face: 'smile', armR: 'point', prop: 'stick', look: 0.6, seed: 611 });
      if (!late) human(80, 1440, 0.9, t, { body: '#4a3a2a', legs: '#2a2420', hair: '#2a1a10', hat: 'hood', hatCol: '#3a2a1a', face: 'calm', armL: 'hold', armR: 'hold', look: 0.5, seed: 612 });
      cat(); // бирка
      push(720, 1300, 1, 0.1); pencil([[-60, -60], [0, 0]], { w: 2, col: '#d8c8a0', pass2: false }); rect(-10, 0, 150, 70, { wash: '#efe2c0', washA: 1, w: 2, col: '#3a2410' }); txt(late ? '+ близнецы' : 'волчица', 65, 22, 26, { font: 'Hand', col: '#3a2410' }); txt(late ? '1471' : '≈1100', 65, 52, 26, { font: 'Osw', col: '#8a1a14' }); pop(); });
    motes(40, [0, 600, W, 1600], '#ffc070', t, 9650, { sp: -60, sz: 3, a: 0.7, tw: 1, add: 1 });
  }
  WORLD.wolf = (t, u, cat) => {
    if (PH(t) === 0) legend(t, u, cat); else foundry(t, u, cat);
    const p = clamp((t - EV.wolf_cast + 0.15) / 0.5); if (p > 0 && p < 1) scr(() => { for (let i = 0; i < 22; i++) { const r = rng(9660 + i), a = r() * 6.283, d = 100 + p * 700 * r(); ell(540 + Math.cos(a) * d, 1100 + Math.sin(a) * d * 0.8, 160 + r() * 140, 120 + r() * 100, { wash: '#d8ccbc', washA: (1 - p) * 0.95, line: false }); } });
  };
  DIR.wolf = {
    outfit: 'founder', light: { side: 1, rim: '#ffb070' }, grade: ['#6a4a8a', 0.12],
    act: () => [[S0.wolf, 'awe'], [EV.wolf_cast, 'sideeye'], [EV.wolf_cast + 0.5, 'smug'], [EV.wolf_twins, 'laugh'], [EV.wolf_late + 0.2, 'grin']],
    pose: (t, u, b) => Object.assign(b, PH(t) === 0 ? { x: 930, y: 1600, s: 0.92, look: [-0.7, 0.1], light: { side: -1, rim: '#d8e0ff' } }
      : { x: 900, y: 1600, s: 1.0, look: t > EV.wolf_twins ? [-0.7, 0.2] : [-0.5, 0], prop: 'mallet', hand: [-120, -180], point: t > EV.wolf_twins ? 1 : undefined, tailUp: t > EV.wolf_twins }),
    cam: () => [[S0.wolf, 560, 1100, 0.08], [EV.wolf_cast - 0.01, 600, 1140, 0.14], [EV.wolf_cast, 560, 1080, 0.02], [EV.wolf_twins, 520, 1160, 0.12, 'x'], [S1.wolf, 540, 1160, 0.16]],
    hud: t => { stamp(t, EV.wolf_cast + 0.25, 'myth', 760, 1310, -0.12, 0.85); }
  };
  // ---------------------------------------------------------------- переход В сцену: лунный ирис с воющей волчицей
  TRANS_IN.wolf = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {
    drawBuf(A); const q = sm(k), R = 40 + q * 1500, cx = 700, cy = 560;
    scr(() => { screenFill('#0a1030', clamp(k * 2) * 0.8); });
    inCircle(cx, cy, R, () => drawBuf(B, 1.25 - 0.25 * q, cx, cy));
    if (k < 0.75) scr(() => { ctx.save(); ctx.globalAlpha = 1 - clamp((k - 0.4) / 0.35); const rr = Math.max(60, R * 0.9); ell(cx, cy, rr, rr, { wash: '#f6ecd0', washA: 0.85, w: 3, col: '#a89a7a' }); glow(cx, cy, rr * 1.8, 'rgba(240,236,210,1)', 0.5);
      ctx.globalAlpha *= 0.95; wolf(cx + rr * 0.15, cy + rr * 0.62, rr / 380, t, { sil: 1, howl: 1 }); ctx.restore(); });
  } };
})();
