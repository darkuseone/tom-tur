/* 011 Одесса — общие детали города (поверх piter.js: neva/facade/embank/aurora переиспользуются):
   OD — палитра (ракушняк, море, акация); stoneRock — порода-ракушняк с ракушками; tunnels — разрез катакомб (галереи, своды, свечи);
   odHouse — одесский дом из ракушняка: пилястры, балконы с ковкой, ставни; acacia — белая акация; duke — памятник Дюку на постаменте;
   opera — Оперный театр (подкова, купол, колоннада); turkFort — турецкая крепость Хаджибей; tricorn — треуголка на голову human();
   sailBoat — гребная лодка с десантом; merchant — торговый парусник; battleship — броненосец с тремя трубами; candleGlow — свеча с ореолом. */

const OD = { stone: '#e2c88e', stoneD: '#a8884e', stoneL: '#f6e6bc', sea: '#2a7a96', seaD: '#14465e', acacia: '#5a8a3a', acaciaD: '#2e5420', rock: '#c8a868', rockD: '#6a5028', dark: '#1a120a' };

function stoneRock(x0, y0, x1, y1, seed, o = {}) {                       // порода-ракушняк: охристая масса, слоистость, ракушки-точки
  const r = rect(x0, y0, x1 - x0, y1 - y0, { wash: o.col || OD.rock, washA: 1, w: 0, col: OD.rockD, a: 0 }); shadeG(r.path, 0, y0, 0, y1, o.colD || OD.rockD, 0.5);
  for (let y = y0 + 30; y < y1; y += 46) pencil([[x0, y + Math.sin(y) * 6], [x1, y + Math.cos(y) * 8]], { w: 1.6, col: OD.rockD, a: 0.35, pass2: false, gap: false });
  const R = rng(seed); for (let i = 0; i < (o.n || 90); i++) { const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), s = 3 + R() * 5; ell(x, y, s, s * 0.7, { wash: OD.stoneL, washA: 0.6, w: 1, col: OD.rockD, a: 0.5 }); }
}

function tunnels(y0, y1, t, o = {}) {                                    // разрез катакомб: порода + чёрные галереи со сводами, уходящие вглубь; o.lit — свечи, o.glowK — подсветка цепочкой
  stoneRock(-500, y0, 1600, y1, 11100, { n: o.n || 140 });
  const R = rng(o.seed || 11110), G = [];
  for (let row = 0; row < (o.rows || 3); row++) { const gy = y0 + 90 + row * ((y1 - y0 - 140) / Math.max(1, (o.rows || 3) - 1)); let x = -460 + R() * 120;
    while (x < 1560) { const w = 140 + R() * 260, h = 70 + R() * 50; G.push([x, gy, w, h, row]); x += w + 60 + R() * 140; } }
  G.forEach(([x, gy, w, h, row], i) => {
    const P = [[x, gy + h], [x, gy + h * 0.35], ...spline([[x, gy + h * 0.35], [x + w * 0.5, gy - h * 0.45], [x + w, gy + h * 0.35]], false, 10), [x + w, gy + h]];
    const g = shape(P, { wash: '#4a3418', washA: 1, w: 2.4, col: OD.rockD, a: 0.9 }); shadeG(g.path, 0, gy - h * 0.4, 0, gy + h, '#2a1a0a', 0.4);
    const iw = w * 0.62, ix = x + (w - iw) / 2, ih = h * 0.8; shape([[ix, gy + h], [ix, gy + h * 0.45], ...spline([[ix, gy + h * 0.45], [ix + iw * 0.5, gy - h * 0.05], [ix + iw, gy + h * 0.45]], false, 8), [ix + iw, gy + h]], { wash: '#120a04', washA: 1, w: 1.4, col: '#2a1a0a', a: 0.7 });
    const lk = o.glowK !== undefined ? clamp(o.glowK * G.length - i) : (o.lit ? 1 : 0);
    if (lk > 0) { const cx = x + w * (0.3 + 0.4 * ((i * 37) % 10) / 10); glow(cx, gy + h - 30, 90 + 30 * Math.sin(t * 9 + i), 'rgba(255,190,90,1)', 0.55 * lk); ell(cx, gy + h - 22, 4, 9, { wash: '#fff2c0', washA: lk, line: false }); }
    pencil([[x + 10, gy + h - 4], [x + w - 10, gy + h - 4]], { w: 3, col: '#3a2a14', a: 0.6, pass2: false });
  });
  // вертикальные шахты-колодцы к поверхности
  for (const sx of (o.shafts || [180, 760])) { rect(sx - 26, y0, 52, 120, { wash: '#140c06', washA: 1, w: 2, col: OD.rockD }); }
  return G;
}

function acacia(x, base, h, t, seed = 1, o = {}) {                       // белая акация: тёмный ствол, ажурная крона, гроздья цветов
  pencil(spline([[x, base], [x - 10, base - h * 0.4], [x + 6, base - h * 0.75]], false, 8), { w: 14 * h / 300, col: '#4a3a2a' });
  const R = rng(seed); for (let i = 0; i < 16; i++) { const a = R() * 6.283, d = R() * h * 0.32, cx = x + Math.cos(a) * d * 1.3, cy = base - h * 0.78 + Math.sin(a) * d * 0.7, sw = Math.sin(t * 1.4 + i + seed) * 4;
    ell(cx + sw, cy, h * 0.13, h * 0.09, { wash: R() < 0.5 ? (o.leaf || OD.acacia) : OD.acaciaD, washA: 0.95, w: 1.2, col: '#1e3214', a: 0.6 }); if (o.bloom !== false && R() < 0.45) ell(cx + sw + 8, cy + 8, 7, 11, { wash: '#f6f2e6', washA: 0.95, line: false }); }
}

function odHouse(x, base, w, h, col, t, o = {}) {                        // одесский дом: ракушняк, пилястры, балконы с ковкой, ставни, карниз
  const fp = rect(x, base - h, w, h, { wash: col || OD.stone, washA: 1, w: 2, col: '#3a2a14', a: 0.85, key: o.key }); shadeG(fp.path, x + w, 0, x, 0, lerpC(col || OD.stone, '#000000', 0.35), 0.3);
  const fl = Math.max(2, Math.round(h / 120)), cols = Math.max(2, Math.round(w / 80)), fh = h / fl, cw = w / cols;
  for (let j = 0; j < fl; j++) { const y = base - h + j * fh; pencil([[x, y], [x + w, y]], { w: j ? 3 : 8, col: OD.stoneL, a: 0.9, pass2: false });
    for (let i = 0; i < cols; i++) { const wx = x + i * cw + cw * 0.28, wy = y + fh * 0.22, ww = cw * 0.44, wh = fh * 0.55, on = o.lit && rng(hsh(i, j, x))() < 0.5;
      rect(wx, wy, ww, wh, { wash: on ? '#f6d48a' : (o.night ? '#1e2a3a' : '#3a4a5a'), washA: 1, w: 1.4, col: '#1a1410' });
      for (const sd of [-1, 1]) rect(sd < 0 ? wx - ww * 0.32 : wx + ww, wy, ww * 0.32, wh, { wash: o.shutter || '#5a8a6a', washA: 1, w: 1, col: '#1a1410' });
      if (on) glow(wx + ww / 2, wy + wh / 2, ww, 'rgba(255,200,110,1)', 0.3);
      if (j > 0 && (i + j) % 2 === 0) { const by = wy + wh; rect(wx - 12, by, ww + 24, 8, { wash: OD.stoneD, washA: 1, w: 1, col: '#1a1410' }); for (let q = 0; q <= 6; q++) pencil([[wx - 10 + q * (ww + 20) / 6, by], [wx - 10 + q * (ww + 20) / 6, by - 26]], { w: 1.6, col: '#1a1410', pass2: false }); pencil([[wx - 12, by - 26], [wx + ww + 12, by - 26]], { w: 2.4, col: '#1a1410', pass2: false }); } } }
  for (let i = 0; i <= cols; i += 2) pencil([[x + i * cw, base - h], [x + i * cw, base]], { w: 5, col: OD.stoneL, a: 0.7, pass2: false });
  rect(x - 8, base - h - 16, w + 16, 18, { wash: OD.stoneL, washA: 1, w: 1.4, col: '#3a2a14', a: 0.8 });
}

function duke(x, base, s, t) {                                            // памятник Дюку: гранитный постамент, бронзовая фигура в тоге, рука к морю
  push(x, base, s);
  const pd = rect(-60, -200, 120, 200, { wash: '#8a7a6a', washA: 1, w: 2, col: '#2a2018' }); shadeG(pd.path, 60, 0, -60, 0, '#3a3028', 0.4); rect(-74, -214, 148, 18, { wash: '#9a8a7a', washA: 1, w: 1.6, col: '#2a2018' });
  const B = '#4a6a5a', BD = '#22342a';
  blob([[-30, -214], [-36, -330], [-18, -380], [18, -380], [32, -330], [30, -214]], { wash: B, washA: 1, w: 2, col: BD }); ell(0, -398, 18, 20, { wash: B, washA: 1, w: 2, col: BD });
  blob([[18, -370], [74, -350], [96, -330], [88, -320], [62, -336], [16, -346]], { wash: B, washA: 1, w: 1.8, col: BD });
  pencil([[-24, -360], [24, -250]], { w: 3, col: '#6a9a7a', a: 0.7, pass2: false }); glow(-10, -380, 40, 'rgba(180,230,200,1)', 0.15);
  pop();
}

function opera(x, base, s, t, o = {}) {                                   // Одесский оперный: подкова фасада, колоннада, купол, скульптуры на крыше
  push(x, base, s); const C = o.col || '#ece0c4', CD = '#8a7a5a';
  const b = blob([[-300, 0], [-300, -220], [-240, -280], [0, -300], [240, -280], [300, -220], [300, 0]], { wash: C, washA: 1, w: 2.4, col: '#3a2a14' }); shadeG(b.path, 300, 0, -300, 0, CD, 0.35);
  for (let k = -5; k <= 5; k++) { const cx = k * 50; pencil([[cx, -20], [cx, -200]], { w: 9, col: '#fffaf0' }); pencil([[cx + 4, -20], [cx + 4, -200]], { w: 2, col: CD, a: 0.6, pass2: false }); }
  rect(-290, -210, 580, 22, { wash: '#f6eedc', washA: 1, w: 1.6, col: '#3a2a14' });
  const d = blob([[-150, -290], [-120, -380], [0, -420], [120, -380], [150, -290]], { wash: '#6a9a8a', washA: 1, w: 2.2, col: '#1a2a24' }); metalG(d.path, -40, -380, 160, '#a8d0c0', '#6a9a8a', '#2a4a40');
  for (const sx of [-250, 250]) { blob([[sx - 18, -290], [sx - 10, -340], [sx + 10, -340], [sx + 18, -290]], { wash: '#4a6a5a', washA: 1, w: 1.6, col: '#1a2a24' }); ell(sx, -352, 10, 12, { wash: '#4a6a5a', washA: 1, w: 1.4, col: '#1a2a24' }); }
  if (o.lit) for (let k = -4; k <= 4; k++) glow(k * 55 + 25, -110, 50, 'rgba(255,210,140,1)', 0.35);
  pop();
}

function turkFort(x, base, s, t, o = {}) {                                // крепость Хаджибей: стены из камня, круглые башни, полумесячный флаг; o.taken — флаг сменён
  push(x, base, s);
  const W = '#c8b490', WD = '#6a5a3a';
  const wl = rect(-320, -160, 640, 160, { wash: W, washA: 1, w: 2.4, col: '#2a2010' }); shadeG(wl.path, 320, 0, -320, 0, WD, 0.4);
  for (let k = 0; k < 16; k++) rect(-320 + k * 40, -186, 24, 28, { wash: W, washA: 1, w: 1.6, col: '#2a2010' });
  for (const tx of [-320, 320, 0]) { const tw = tx === 0 ? 120 : 90, th = tx === 0 ? 300 : 230; const tr = rect(tx - tw / 2, -th, tw, th, { wash: W, washA: 1, w: 2.4, col: '#2a2010' }); shadeG(tr.path, tx + tw / 2, 0, tx - tw / 2, 0, WD, 0.4);
    poly([[tx - tw / 2 - 10, -th], [tx + tw / 2 + 10, -th], [tx, -th - 60]], { wash: '#8a4a2a', washA: 1, w: 2, col: '#2a1008' }); for (let q = 0; q < 2; q++) rect(tx - 8, -th + 50 + q * 70, 16, 30, { wash: '#1a120a', washA: 1, w: 1, col: '#000' }); }
  rect(-40, -100, 80, 100, { wash: '#2a1a0a', washA: 1, w: 2, col: '#000' });
  const fy = -360, wv = Math.sin(t * 5) * 6; pencil([[0, -300], [0, fy - 120]], { w: 5, col: '#3a2a1a' });
  if (!o.taken) { shape([[0, fy - 116], [120, fy - 110 + wv], [114, fy - 40 + wv], [0, fy - 46]], { wash: '#c8201e', washA: 1, w: 1.6, col: '#3a0a0a' }); ell(48, fy - 78 + wv * 0.5, 18, 18, { wash: '#f6f2ea', washA: 1, line: false }); ell(56, fy - 80 + wv * 0.5, 15, 15, { wash: '#c8201e', washA: 1, line: false }); }
  else { shape([[0, fy - 116], [120, fy - 110 + wv], [114, fy - 40 + wv], [0, fy - 46]], { wash: '#f6f2ea', washA: 1, w: 1.6, col: '#2a2a2a' }); pencil([[0, fy - 114], [116, fy - 42 + wv]], { w: 9, col: '#2a5aa8', pass2: false }); pencil([[0, fy - 48], [118, fy - 108 + wv]], { w: 9, col: '#2a5aa8', pass2: false }); }
  pop();
}

function tricorn(x, y, s) {                                               // треуголка поверх головы human(): y — макушка
  push(x, y, s); blob([[-70, -6], [0, 16], [70, -6], [50, -22], [0, -14], [-50, -22]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); blob([[-40, -12], [-34, -44], [34, -44], [40, -12]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); pencil([[-68, -6], [0, 14], [68, -6]], { w: 3, col: '#d6a842', pass2: false }); pop();
}

function sailBoat(x, y, s, t, k = 0, o = {}) {                            // гребная лодка-десант: гребцы с вёслами, мушкеты
  push(x, y, s, Math.sin(t * 2 + k) * 0.04); shape([[-200, -30], [200, -30], [160, 20], [-160, 20]], { wash: '#5a3a1e', washA: 1, w: 2, col: '#1a0a04' });
  for (let q = 0; q < 4; q++) { const ox = -130 + q * 86, row = Math.sin(t * 5 + q + k) * 0.5; human(ox, -24, 0.42, t, { body: o.body || '#2a5a3a', legs: '#e8e4dc', hair: '#2a1a10', hat: 'cap', hatCol: '#18161a', face: 'angry', armR: 'hold', armL: 'hold', seed: 1100 + q + k * 5, flip: -1 }); pencil([[ox - 10, -80], [ox + Math.cos(row) * 110, 26 + Math.sin(row) * 20]], { w: 5, col: '#8a6a3a', pass2: false }); }
  pop();
}

function merchant(x, y, s, t, k = 0, o = {}) {                            // торговый парусник: корпус, две мачты, паруса, флаг-вымпел
  push(x, y, s, Math.sin(t * 1.3 + k) * 0.02);
  const h = shape([[-260, -40], [240, -40], [300, -110], [-290, -100]], { wash: o.hull || '#4a2e1a', washA: 1, w: 2.4, col: '#1a0a04' }); pencil([[-280, -76], [270, -80]], { w: 4, col: '#c8a040', a: 0.8, pass2: false });
  for (const [mx, mh] of [[-90, 380], [110, 330]]) { pencil([[mx, -100], [mx, -100 - mh]], { w: 7, col: '#3a2412' }); for (let q = 0; q < 2; q++) { const sy = -140 - mh + 60 + q * (mh * 0.45); blob([[mx - 100, sy], [mx + 100, sy], [mx + 110 + Math.sin(t * 2 + k) * 6, sy + mh * 0.38], [mx - 110 + Math.sin(t * 2 + k) * 6, sy + mh * 0.38]], { wash: '#f2ead6', washA: 1, w: 1.8, col: '#4a3a2a' }); } }
  const wv = Math.sin(t * 5 + k) * 5; shape([[-90, -480], [10, -470 + wv], [-90, -456]], { wash: o.flag || '#c8302a', washA: 1, w: 1.2, col: '#3a0a0a' });
  pop();
}

function battleship(x, y, s, t, o = {}) {                                // броненосец «Потёмкин»: низкий корпус, три трубы, мачты, башни
  push(x, y, s); const G = '#5a6068';
  const h = shape([[-460, -40], [460, -40], [500, -120], [-480, -110], [-500, -60]], { wash: G, washA: 1, w: 2.6, col: '#141618' }); shadeG(h.path, 0, -40, 0, -120, '#22262c', 0.45);
  rect(-260, -170, 480, 60, { wash: '#6a7078', washA: 1, w: 2, col: '#141618' });
  for (const fx of [-120, 0, 120]) { rect(fx - 24, -340, 48, 180, { wash: '#4a4e54', washA: 1, w: 2, col: '#141618' }); if (o.smoke) for (let k = 0; k < 4; k++) { const ph = (t * 0.5 + k / 4) % 1; ell(fx - 20 - ph * 260, -360 - ph * 200, 30 + ph * 80, 20 + ph * 50, { wash: '#4a4a4e', washA: 0.6 * (1 - ph), line: false }); } }
  for (const mx of [-330, 260]) pencil([[mx, -170], [mx, -560]], { w: 6, col: '#2a2a2e' });
  for (const tx of [-380, 360]) { ell(tx, -130, 60, 30, { wash: '#4a4e54', washA: 1, w: 2, col: '#141618' }); pencil([[tx, -140], [tx + (tx > 0 ? 130 : -130), -150]], { w: 10, col: '#2a2e34' }); }
  pop();
}

function candleGlow(x, y, s, t, k = 0) { candle(x, y, s, t, k, 1); glow(x, y - 60 * s, 180 * s, 'rgba(255,190,100,1)', 0.35); }
