/* 004 — сцена `hook`: 2026, центр Кишинёва, площадь у собора. Невозможная картинка: огромный колокол застрял в окне колокольни —
   торчит наполовину, балки трещат, сыплется известь, голуби врассыпную. «не влез» — колокол дёргается и заклинивает, тряска;
   «появилась арка!» — камера уходит вправо, Триумфальная арка «выскакивает» с золотым светом; «Отматываем время!» — Том крутит часы.
   Переход В tunnel: портал из часов (кадр закручивается в воронку, круг-окно в туннель). */
(() => {
  EV.hk_jam = WT('h1', 'влез') + 0.12;            // колокол дёргается и заклинивает
  EV.hk_arch = WT('h1', 'появилась');             // камера на арку
  EV.hk_pop = WT('h1', 'арка!');                  // арка «выскакивает»
  EV.hk_wind = LS('h2') + 0.25;                   // Том достаёт часы
  SHAKES.push([EV.hk_jam, 0.45, 18]);
  KEYW.push('Колокол', 'влез', 'арка!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const BFX = 380, BFY = 1420, BFS = 1.0;          // колокольня: ось, основание, масштаб (окно 2-го яруса ≈ y 820–1020)

  function sky(t) {
    vgrad(-900, 1500, ['#3a5a8e', '#7a9ac0', '#e8c08a', '#f4d8a0']);
    glow(880, 420, 520, 'rgba(255,214,150,1)', 0.45); glow(880, 420, 160, 'rgba(255,244,210,1)', 0.6);
    for (let k = 0; k < 6; k++) { const r = rng(9500 + k), cx = ((r() * 1800 + t * (10 + k * 3)) % 1900) - 400, cy = -120 + r() * 520;
      for (let q = 0; q < 5; q++) ell(cx + q * 60 - 120, cy + Math.sin(q * 1.7) * 14, 90 - Math.abs(q - 2) * 16, 34, { wash: q % 2 ? '#f6e4c8' : '#fff2dc', washA: 0.75, line: false });
      pencil([[cx - 170, cy + 26], [cx + 170, cy + 26]], { w: 2, col: '#c89a7a', a: 0.4, pass2: false }); }
  }
  function farCity(t) {                           // дальний план: советские многоэтажки, телевышка, тополя
    for (let k = 0; k < 22; k++) { const r = rng(9510 + k), x = -500 + k * 100 + r() * 30, h = 120 + r() * 160, y = 1180;
      sil([[x, y], [x, y - h], [x + 80, y - h], [x + 80, y]], k % 3 ? '#9a8ea0' : '#8a8096', 1); windows(x + 4, y - h + 6, 72, h - 12, 4, Math.floor(h / 22), 9520 + k, 0.35, '#f8e4b0', '#c8d8e8', 0.5); }
    pencil([[1180, 1180], [1180, 680]], { w: 8, col: '#8a7e94', pass2: false }); for (const [y, w] of [[760, 40], [880, 30], [1000, 24]]) pencil([[1180 - w, y], [1180 + w, y]], { w: 6, col: '#8a7e94', pass2: false }); glow(1180, 680, 20, 'rgba(255,90,70,1)', 0.8);
    for (let k = 0; k < 14; k++) { const r = rng(9530 + k); poplar(-300 + k * 110 + r() * 40, 1210, 200 + r() * 90, t, 9530 + k, '#6a8a5a'); }
    haze('#e8c8a0', 0.28);
  }
  function midGround(t) {                         // средний план: здание правительства (вдали), собор за аркой, каштаны парка
    push(760, 1250, 0.42); kCathedral(0, 0, 1, t, {}); pop();
    rect(-200, 960, 300, 290, { wash: '#d8cdb8', washA: 1, w: 2, col: '#5a4a3a' }); windows(-196, 980, 292, 250, 12, 8, 9540, 0.8, '#6a7a8a', '#8a9aaa', 0.8);
    for (let k = 0; k < 9; k++) { const r = rng(9550 + k); acacia(-120 + k * 150 + r() * 40, 1300 + r() * 20, 260 + r() * 80, t, 9550 + k, k % 2 ? '#5a8a3a' : '#6a9a44'); }
    haze('#f0d0a8', 0.12);
  }
  function square(t) {                            // брусчатка площади в перспективе, клумбы, фонари
    const g = poly([[-600, 1300], [1700, 1300], [1700, 2400], [-600, 2400]], { wash: '#c8b8a0', washA: 1, line: false });
    vgrad(1300, 2000, ['#bfae94', '#a89478', '#8a7860']);
    for (let k = 0; k < 18; k++) { const q = Math.pow(k / 17, 1.6), y = lerp(1300, 2100, q); pencil([[-600, y], [1700, y]], { w: 1 + q * 2, col: '#7a6850', a: 0.5, pass2: false }); }
    for (let k = -14; k <= 14; k++) pencil([[540 + k * 30, 1300], [540 + k * 210, 2200]], { w: 1.2, col: '#7a6850', a: 0.35, pass2: false });
    for (const [cx, cy, rx] of [[100, 1350, 120], [980, 1360, 140]]) { const b = ell(cx, cy, rx, 22, { wash: '#4a7a3a', washA: 1, w: 2, col: '#2a3a1a' }); const r = rng(cx); for (let i = 0; i < 18; i++) ell(cx + (r() - 0.5) * rx * 1.7, cy - 6 + (r() - 0.5) * 16, 6, 5, { wash: ['#e84a5a', '#f6d04a', '#f4f0e8'][i % 3], washA: 1, line: false }); }
    for (const lx of [40, 1040]) { pencil([[lx, 1340], [lx, 1040]], { w: 7, col: '#2a2a30', pass2: false }); pencil([[lx - 36, 1050], [lx + 36, 1050]], { w: 4, col: '#2a2a30', pass2: false }); for (const sd of [-1, 1]) { ell(lx + sd * 36, 1066, 12, 18, { wash: '#f8ecd0', washA: 1, w: 1.6, col: '#2a2a30' }); } }
  }
  function people(t) {                            // горожане: задрали головы, кто-то снимает на телефон
    const jam = t > EV.hk_jam;
    const P = [[150, 1440, 0.62, { body: '#3a5a7a', hair: '#3a2a1a', face: jam ? 'shock' : 'calm', armR: jam ? 'up' : 'hold', prop: 'phone', seed: 401, look: -0.6 }],
      [880, 1400, 0.5, { body: '#a84a3a', hat: 'scarf', hatCol: '#e8c040', face: jam ? 'shock' : 'smile', armL: jam ? 'point' : 'down', flip: -1, seed: 402, long: 1 }],
      [1000, 1420, 0.56, { body: '#4a4a4a', hair: '#1a1a1a', beard: 'short', face: 'calm', armR: 'hold', prop: 'phone', flip: -1, seed: 403 }],
      [-20, 1460, 0.66, { body: '#6a7a4a', hat: 'cap', hatCol: '#2a3a5a', face: jam ? 'shock' : 'calm', armL: jam ? 'up' : 'down', seed: 404 }]];
    for (const [x, y, s, o] of P) human(x + Math.sin(t * 0.7 + o.seed) * 6, y, s, t, o);
    const cols = ['#3a5a7a', '#a84a3a', '#6a7a4a', '#4a4a5a', '#c8a040', '#7a3a5a'];
    for (let i = 0; i < 12; i++) { const r = rng(9600 + i), x = 380 + i * 80 + r() * 30, wk = t * (0.6 + r()) * 30 * (r() < 0.5 ? 1 : -1);
      human(((x + wk) % 1200 + 1200) % 1200 - 60, 1345 + r() * 20, 0.26 + r() * 0.06, t, { body: cols[i % 6], hair: r() < 0.5 ? '#2a1a10' : '#6a4a2a', face: t > EV.hk_jam ? 'shock' : 'calm', armR: t > EV.hk_jam && i % 3 === 0 ? 'point' : 'down', seed: 610 + i, flip: i % 2 ? 1 : -1 }); }
  }
  function pigeons(t) {                           // голуби: сидят на карнизах → взлетают от удара
    const u = t - EV.hk_jam;
    for (let i = 0; i < 14; i++) { const r = rng(9560 + i), x0 = 180 + r() * 260, y0 = 620 + r() * 300;
      const fly = u > 0 ? u : 0, x = x0 + fly * (200 + r() * 400) * (r() < 0.5 ? -1 : 1), y = y0 - fly * (300 + r() * 200) + fly * fly * 30, fl = Math.sin(t * 30 + i) * (u > 0 ? 1 : 0.1);
      push(x, y, 0.8 + r() * 0.4, 0, x > x0 ? 1 : -1); ell(0, 0, 16, 9, { wash: '#8a8a96', washA: 1, w: 1.4, col: '#2a2a30' }); ell(14, -6, 7, 6, { wash: '#6a6a7a', washA: 1, w: 1.2, col: '#2a2a30' });
      if (u > 0) { pencil([[-4, -2], [-16, -22 * fl - 6], [-30, -18 * fl]], { w: 3, col: '#5a5a66', pass2: false }); pencil([[4, -2], [10, -26 * fl - 6], [22, -20 * fl]], { w: 3, col: '#5a5a66', pass2: false }); }
      pop(); }
  }
  // колокол застрял в окне 2-го яруса: верх ушёл внутрь проёма, раструб шире окна — торчит наружу; кладка трещит
  const WIN = (() => { const w = 124, y0 = -380, y1 = -640, ow = w * 0.7, oh = (y0 - y1) * 0.56, oy = y0 - (y0 - y1) * 0.18; const P = [[-ow, oy], [-ow, oy - oh + ow]];
    for (let a = 0; a <= 12; a++) { const q = Math.PI + a / 12 * Math.PI; P.push([Math.cos(q) * ow, oy - oh + ow + Math.sin(q) * ow]); } P.push([ow, oy]); return { P: P.map(([x, y]) => [BFX + x * BFS, BFY + y * BFS]), sill: BFY + oy * BFS, ow: ow * BFS }; })();
  function stuckBell(t) {
    const j = t > EV.hk_jam ? Math.exp(-(t - EV.hk_jam) * 6) * Math.sin((t - EV.hk_jam) * 40) : 0, push_ = sm(fade(t, 0, EV.hk_jam));
    // колокол «продавливают» в окно: до удара он чуть выезжает, на «влез» — заклинивает с дрожью
    const by = WIN.sill + 175 + (1 - push_) * 40 + j * 6;
    ctx.save(); const cp = pathOf(WIN.P); cp.rect(BFX - 400, WIN.sill - 2, 800, 700); ctx.clip(cp);
    vgrad(WIN.sill - 200, WIN.sill, ['#120c08', '#2a1e16']); kBell(BFX + j * 6, by, 0.42, t, { swing: j * 0.05 });
    ctx.restore();
    // подоконник и откосы поверх: колокол упёрся
    rect(BFX - WIN.ow - 24, WIN.sill - 6, (WIN.ow + 24) * 2, 18, { wash: '#e6d8b8', washA: 1, w: 2.4, col: KI.ink });
    const crk = sm(fade(t, EV.hk_jam - 0.04, EV.hk_jam + 0.18));
    for (const [x0, y0, dx, dy] of [[-WIN.ow - 10, -20, -70, -90], [WIN.ow + 10, -10, 80, -110], [-WIN.ow - 20, 20, -110, 40], [WIN.ow + 20, 16, 120, 60], [-20, -150, -30, -80]]) {
      const P = [[BFX + x0, WIN.sill + y0]]; for (let q = 1; q <= 5; q++) P.push([BFX + x0 + dx * q / 5 + (q % 2 ? 7 : -7), WIN.sill + y0 + dy * q / 5]); pencil(P.slice(0, 1 + Math.ceil(5 * crk)), { w: 3.6, col: '#1a120c', pass2: false, gap: false }); }
    // известковая пыль и куски кладки
    const u = t - EV.hk_jam;
    for (let i = 0; i < 28; i++) { const r = rng(9570 + i), q = ((t * (0.5 + r()) + r()) % 1.4), x = BFX - 170 + r() * 340, y = WIN.sill + 10 + q * 420 + q * q * 200;
      ell(x, y, 2 + r() * 4, 2 + r() * 3, { wash: '#efe6d2', washA: 0.8 * (1 - q / 1.4), line: false }); }
    if (u > 0 && u < 1) { const q = u; for (let i = 0; i < 7; i++) { const r = rng(9590 + i), x = BFX + (r() - 0.5) * 300 + (r() - 0.5) * 200 * q, y = WIN.sill + 20 + 600 * q * q;
      poly([[x - 12, y], [x + 10, y - 8], [x + 14, y + 10], [x - 6, y + 14]], { wash: '#e6d8b8', washA: 1, w: 1.6, col: KI.ink }); }
      for (let k = 0; k < 6; k++) glow(BFX - 140 + k * 56, WIN.sill + 40 + q * 140, 90 + q * 140, 'rgba(240,230,210,1)', 0.4 * (1 - q), 'source-over'); }
  }
  function trolley(t) {                           // троллейбус проезжает за площадью, провода
    pencil([[-600, 1050], [1700, 1030]], { w: 2, col: '#2a2a30', a: 0.7, pass2: false }); pencil([[-600, 1070], [1700, 1050]], { w: 2, col: '#2a2a30', a: 0.7, pass2: false });
    const x = 1500 - ((t * 140) % 2600); push(x, 1290, 0.62);
    const b = rect(-260, -200, 520, 190, { wash: '#e8d24a', washA: 1, w: 2.4, col: '#2a2a20' }); rect(-260, -60, 520, 50, { wash: '#3a6a9a', washA: 1, w: 1.8, col: '#2a2a20' });
    for (let k = 0; k < 6; k++) rect(-240 + k * 82, -180, 66, 90, { wash: '#a8c8e0', washA: 1, w: 1.6, col: '#2a2a20' });
    for (const wx of [-170, 170]) { ell(wx, -6, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2, col: '#0a0a0a' }); ell(wx, -6, 12, 12, { wash: '#8a8a90', washA: 1, line: false }); }
    pencil([[-120, -200], [-60, -360]], { w: 4, col: '#2a2a30', pass2: false }); pencil([[-80, -200], [-20, -350]], { w: 4, col: '#2a2a30', pass2: false }); txt('22', 200, -130, 40, { font: 'Osw', col: '#2a2a20' });
    pop();
  }

  WORLD.hook = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => farCity(t));
    lay(7, () => { midGround(t); trolley(t); });
    lay(2.2, () => { push(1040, 1450, 0.95); const pk = t > EV.hk_pop ? popK(t, EV.hk_pop, 0.4) : 0; push(0, 0, 1 + 0.06 * pk * Math.exp(-(t - EV.hk_pop) * 3)); kArch(0, 0, 1, t, { lit: 0.6, bell: 1 }); pop(); pop();
      if (t > EV.hk_pop) { const a = clamp(1 - (t - EV.hk_pop) / 1.4); rays(1000, 1100, -Math.PI / 2, 2.4, 700, 'rgba(255,214,140,0.8)', 0.45 * a, 9, t); glow(1000, 1150, 380, 'rgba(255,220,150,1)', 0.45 * a); } });
    lay(1.6, () => { kBelfry(BFX, BFY, BFS, t, { win: 1, winW: 0.7 }); stuckBell(t); pigeons(t); });
    lay(1, () => { square(t); people(t); cat(); });
    lay(0.62, () => {                              // передний план: ветка каштана, край скамейки
      const sw = Math.sin(t * 1.2) * 8; for (let k = 0; k < 7; k++) { const a = -0.4 + k * 0.22; push(1120 + sw, 260, 1, a); const lf = blob([[0, 0], [60, -30], [190, -10], [220, 20], [180, 40], [60, 30]], { wash: k % 2 ? '#3a5a2a' : '#4a6a30', washA: 0.96, w: 2, col: '#142410' }); pencil([[0, 0], [200, 12]], { w: 1.6, col: '#142410', a: 0.6, pass2: false }); pop(); }
      rect(-80, 1780, 360, 30, { wash: '#6a4428', washA: 1, w: 2.4, col: '#1a0e06' }); rect(-80, 1720, 360, 26, { wash: '#7a5232', washA: 1, w: 2.4, col: '#1a0e06' }); pencil([[230, 1810], [230, 1990]], { w: 10, col: '#2a2a30', pass2: false });
    });
    motes(30, [0, 300, W, 1700], '#fff2d0', t, 41, { sp: 8, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };

  DIR.hook = {
    outfit: 'hoodieKi', light: { side: 1, rim: '#ffd8a0' }, grade: ['#6a4a2a', 0.14],
    act: () => [[0, 'shock'], [EV.hk_jam, 'scared'], [WT('h1', 'и') + 0.1, 'awe'], [EV.hk_pop, 'grin'], [LS('h2'), 'smug']],
    pose: (t, u, b) => {
      const o = { x: 700, y: GY + 40, s: 1.08, look: [-0.7, -0.75], tailUp: t < EV.hk_arch };
      if (t < EV.hk_arch) { o.hand = [-140, -330]; o.point = 1; if (t > EV.hk_jam) { const j = Math.max(0, Math.sin((t - EV.hk_jam) * 12)) * 40 * Math.exp(-(t - EV.hk_jam) * 4); o.y -= j; o.hand = [-110, -330]; o.handF = [110, -330]; o.point = undefined; } }
      else if (t < LS('h2')) { o.x = lerp(700, 560, sm(fade(t, EV.hk_arch, EV.hk_pop))); o.walk = t < EV.hk_pop ? t * 9 : undefined; o.look = [0.8, -0.3]; o.hand = [150, -300]; o.point = 1; o.flip = false; }
      else if (t < LS('h2') + 0.35) { o.x = 560; o.look = [0.3, 0]; }
      else { o.x = 560; o.look = [0.1, 0.05]; o.hand = [70, -330]; o.watchInHand = t > EV.hk_wind - 0.1; o.glow = clamp((t - EV.hk_wind) / 0.4); o.spin = t > EV.hk_wind + 0.3 ? 1 : 0; o.tilt = 0.05; }
      return Object.assign(b, o);
    },
    cam: () => [[0, 480, 1060, 0.06], [EV.hk_jam, 460, 1040, 0.1], [EV.hk_arch, 480, 1060, 0.08], [EV.hk_pop + 0.15, 1000, 1100, 0.04], [LS('h2') + 0.05, 1000, 1100, 0.05], [LS('h2') + 0.35, 660, 1160, 0.12], [S1.hook, 660, 1180, 0.22]],
    hud: t => { if (t > EV.hk_pop && t < LS('h2') + 0.2) note('арка — для колокола?', 760, 1760, t, EV.hk_pop, LS('h2') + 0.2, '#f6ecd6', 50, -0.03); }
  };

  // ---------------------------------------------------------------- переход В туннель: портал из часов (кадр закручивается, круг-окно)
  TRANS_IN.tunnel = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const cx = 700, cy = 1000, q = sm(k);
    for (let i = 6; i >= 0; i--) { const kk = clamp(q * 1.3 - i * 0.06); drawBuf(A, 1 - 0.75 * kk + i * 0.03, cx, cy, i ? 0.22 : 1 - sm((k - 0.55) / 0.3), null, 0, 0, -kk * (3.2 + i * 0.4)); }
    const R = Math.pow(sm((k - 0.25) / 0.6), 1.4) * 1300; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.4 - 0.4 * sm(k), cx, cy)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.4 - k)); }
  } };
})();
