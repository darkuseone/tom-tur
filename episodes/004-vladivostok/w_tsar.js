/* 004 — сцена `tsar`: 1891, Куперовская падь. Начало Уссурийской линии Транссиба: насыпь, шпалы, рельсы штабелем, триумфальная арка,
   флаги, оркестр, чиновники и дамы с зонтиками. Цесаревич Николай (белый китель, фуражка, повязка над ухом) катит тачку земли.
   На «сабли» — призрачный росчерк японской сабли над его головой и заметка «Оцу, 20 дней назад». На «пошёл!» — рельсы сами
   укладываются к горизонту, по ним мчится призрак паровоза. Переход В сцену — удар топора раскалывает кадр, как полено. */
(() => {
  EV.ts_sabre = wt('s3', 'сабли');              // росчерк сабли
  EV.ts_cart = wt('s3', 'тачку.');              // тачка опрокидывается
  EV.ts_go = wt('s3', 'пошёл!');                // рельсы к горизонту + паровоз
  KEYW.push('сабли', 'тачку.', 'Транссиб', 'пошёл!');
  SHAKES.push([EV.ts_go + 0.05, 0.3, 8]);
  const SL = 0, X0 = 0, Y0 = 1560, ny = x => Y0 + (x - X0) * SL;   // насыпь: поднимается вправо

  function sky(t) { vgrad(-900, 1300, ['#5a88b8', '#a8c8e0', '#f0e8d8', '#f8e0c0'], 1);
    for (let i = 0; i < 5; i++) { const x = ((i * 340 + t * 16) % 1800) - 300, y = 200 + i * 70; blob([[x - 170, y], [x - 80, y - 40], [x + 30, y - 50], [x + 140, y - 28], [x + 190, y]], { wash: '#ffffff', washA: 0.65, line: false }); } }
  function town(t) {                                                // Владивосток 1891: деревянные дома, церковь, бухта с кораблями
    sopki(1000, '#7a9aa8', 1.7, 200, 1);
    rect(-400, 1000, 1900, 120, { wash: '#5a8aa8', washA: 1, line: false });
    for (const [x, s] of [[120, 0.4], [880, 0.5]]) { push(x, 1040, s); poly([[-200, 0], [-180, -40], [180, -40], [200, 0]], { wash: '#2a2a30', washA: 1, w: 2 }); for (const mx of [-80, 60]) { pencil([[mx, -40], [mx, -300]], { w: 6, col: '#4a3020', pass2: false }); pencil([[mx - 60, -240], [mx + 60, -240]], { w: 4, col: '#4a3020', pass2: false }); } rect(-10, -110, 20, 70, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }
    const r = rng(81); for (let x = -300; x < 1400; x += 50 + r() * 30) { const y = 960 + Math.sin(x * 0.01) * 20, w = 40 + r() * 30, h = 30 + r() * 26;
      rect(x, y - h, w, h, { wash: ['#c8a070', '#a87a4a', '#e0d0b0', '#b89a7a'][Math.floor(r() * 4)], washA: 1, w: 1.2, col: '#3a2a1a' }); poly([[x - 6, y - h], [x + w / 2, y - h - 22], [x + w + 6, y - h]], { wash: ['#6a2a1a', '#3a4a3a', '#5a5a5a'][Math.floor(r() * 3)], washA: 1, w: 1.2, col: '#2a1a0a' }); }
    push(700, 930, 0.6); rect(-60, -160, 120, 160, { wash: '#f0e8d8', washA: 1, w: 2, col: '#3a2a1a' }); ell(0, -190, 44, 50, { wash: '#2a6a5a', washA: 1, w: 2 }); pencil([[0, -240], [0, -290]], { w: 4, col: '#d8b04a', pass2: false }); pencil([[-14, -276], [14, -276]], { w: 4, col: '#d8b04a', pass2: false }); pop();
    haze('#f0e8e0', 0.15);
  }
  function arch(t) {                                                // триумфальная арка 1891: кирпич, шатровый верх, двуглавый орёл, флаги
    push(150, 1340, 0.95); const B = '#c87a5a', D = '#7a3a24';
    for (const sx of [-1, 1]) { const p = rect(sx * 150 - 60, -420, 120, 420, { wash: B, washA: 1, w: 2.4, col: D, key: 9800 + sx }); hatch(p.path, p.bb, { gap: 14, a: 0.25, col: D, ang: 0, key: 9802 + sx, w: 1 }); }
    blob([[-210, -420], [-210, -520], [0, -560], [210, -520], [210, -420], [90, -420], [90, -300], [0, -360], [-90, -300], [-90, -420]], { wash: B, washA: 1, w: 2.4, col: D });
    poly([[-150, -560], [0, -760], [150, -560]], { wash: '#2a6a4a', washA: 1, w: 2.4, col: '#0e2a1a' }); for (let q = -2; q <= 2; q++) pencil([[q * 50, -560], [q * 10, -740]], { w: 1.6, col: '#0e2a1a', a: 0.5, pass2: false });
    ell(0, -790, 26, 26, { wash: '#e0b448', washA: 1, w: 2, col: '#6a4a08' }); txt('1891', 0, -470, 40, { font: 'Osw', col: '#f8e8c8' });
    for (const sx of [-1, 1]) { pencil([[sx * 200, -520], [sx * 200, -700]], { w: 5, col: '#5a4a3a', pass2: false }); const wv = Math.sin(t * 6 + sx) * 10;
      for (const [c, k] of [['#ffffff', 0], ['#2a4ab0', 1], ['#c8241e', 2]]) poly([[sx * 200, -700 + k * 22], [sx * 200 + sx * 110, -700 + k * 22 + wv], [sx * 200 + sx * 110, -678 + k * 22 + wv], [sx * 200, -678 + k * 22]], { wash: c, washA: 1, w: 1.2, col: '#2a2a2a' }); }
    for (let q = 0; q < 9; q++) { const x = -200 + q * 50, y = -560 + Math.abs(q - 4) * 12; ell(x, y, 10, 10, { wash: ['#2a8a3a', '#c8241e', '#e8c040'][q % 3], washA: 1, w: 1 }); }   // гирлянда
    pop();
  }
  function crowd(t) {                                               // свита, дамы, оркестр
    const r = rng(83);
    for (let i = 0; i < 10; i++) { const x = 330 + i * 70 + r() * 20, s = 0.62 + r() * 0.06, lady = i % 3 === 1;
      human(x, 1300 + r() * 10, s, t, lady ? { body: ['#e8d0e0', '#d8e0f0', '#f0e0c0'][i % 3], bodyD: '#9a8a9a', long: 1, hair: '#5a3a1a', hat: 'cap', hatCol: '#f4eee0', face: 'smile', look: -0.6, armR: 'hold', seed: 120 + i }
        : { body: ['#1e2a4a', '#2a2a2a', '#3a4a3a'][i % 3], trim: i % 2 ? '#d8b04a' : null, legs: '#1a1a1a', hair: '#3a2a1a', beard: r() < 0.5 ? 'short' : null, hat: 'cap', hatCol: '#1e2a4a', face: t > EV.ts_go ? 'smile' : 'calm', look: -0.7, armL: t > EV.ts_go && i % 2 ? 'wave' : 'down', seed: 120 + i, flip: -1 }); }
    for (let i = 0; i < 10; i += 3) { push(330 + i * 70 + 60, 1110, 0.62); pencil([[0, 0], [0, -110]], { w: 3, col: '#3a2a1a', pass2: false }); blob([[-70, -100], [0, -150], [70, -100]], { wash: ['#f4e0e8', '#e8f0ff', '#fff0d8'][i % 3], washA: 1, w: 1.8, col: '#6a4a5a' }); pop(); }
    for (let i = 0; i < 4; i++) { const x = 1020 + i * 60; human(x, 1270, 0.58, t, { body: '#c8241e', trim: '#e8c040', legs: '#1a1a3a', hat: 'cap', hatCol: '#1a1a3a', hair: '#2a1a0a', face: 'calm', look: -0.4, armL: 'hold', armR: 'hold', seed: 140 + i, flip: -1 });
      push(x - 14, 1270 - 150 * 0.58, 0.58); const g = ell(0, 0, 28, 28, { wash: '#e8c040', washA: 1, w: 2, col: '#6a4a08' }); metalG(g.path, -8, -8, 28, '#fff8d0', '#e8c040', '#8a6a10'); pencil([[0, 0], [40, -60]], { w: 7, col: '#c8a030', pass2: false }); pop(); }
    if (t > EV.ts_go) for (let i = 0; i < 6; i++) { const r2 = rng(hsh(i, 7)), ph = ((t - EV.ts_go) * 1.3 + r2()) % 1; txt('♪', 1080 + r2() * 200, 1120 - ph * 260, 40, { font: 'Osw', col: '#2a1a0a', a: 1 - ph }); }
  }
  function embank(t, laid) {                                        // поле, насыпь в перспективу к горизонту, шпалы и рельсы укладываются сами
    const g = poly([[-600, 1250], [1700, 1250], [1700, 2600], [-600, 2600]], { wash: '#7a8a4a', washA: 1, w: 2, col: '#3a3a1a', key: 9819 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a3a10', ang: -0.3, key: 9818 });
    const V = [600, 1250], B0 = [300, 2300], pr = d => 1 / (1 + d * 0.22), at = d => { const k = pr(d); return [V[0] + (B0[0] - V[0]) * k, V[1] + (B0[1] - V[1]) * k, k]; };
    const e = poly([[V[0] - 30, V[1]], [V[0] + 30, V[1]], [B0[0] + 560, B0[1]], [B0[0] - 560, B0[1]]], { wash: '#8a6a44', washA: 1, w: 2.4, col: '#3a2410', key: 9820 }); hatch(e.path, e.bb, { gap: 9, a: 0.18, col: '#3a2410', ang: 0.6, key: 9821 });
    const n = Math.floor(5 + laid * 60);
    for (let d = 0; d < n; d++) { const [x, y, k] = at(d); rect(x - 330 * k, y - 22 * k, 660 * k, 44 * k, { wash: '#5a3a1a', washA: 1, w: Math.max(0.6, 2 * k), col: '#2a1608' }); }
    const [xe, ye, ke] = at(n - 1); for (const sd of [-1, 1]) pencil([[B0[0] + sd * 220, B0[1] - 30], [xe + sd * 220 * ke, ye - 30 * ke]], { w: 8, col: '#5a5a62', pass2: false });
    if (laid > 0) { const kk = clamp((t - EV.ts_go) / 1.1), [lx, ly, ls] = at(lerp(1.5, 26, Math.pow(kk, 0.7)));          // призрак паровоза уходит к горизонту
      push(lx, ly, ls * 1.6); ctx.save(); ctx.globalAlpha = 0.9 * (1 - sm((kk - 0.75) / 0.25));
      rect(-150, -330, 300, 300, { wash: '#2a2a30', washA: 1, w: 2.4, col: '#0a0a0e' }); ell(0, -190, 110, 110, { wash: '#3a3a40', washA: 1, w: 2.4 }); ell(0, -190, 80, 80, { wash: '#1a1a20', washA: 1, w: 2 });
      rect(-30, -450, 60, 130, { wash: '#2a2a30', washA: 1, w: 2 }); poly([[-60, -450], [-40, -490], [40, -490], [60, -450]], { wash: '#2a2a30', washA: 1 }); glow(0, -190, 90, 'rgba(255,230,160,1)', 0.8);
      poly([[-200, -30], [200, -30], [0, 60]], { wash: '#a8241e', washA: 1, w: 2 }); for (const sd of [-1, 1]) ell(sd * 120, -20, 40, 40, { wash: '#a8241e', washA: 1, w: 2 });
      smokeCol(0, -490, t, 1.2, 0.7, 21, 0); ctx.restore(); pop(); }
  }
  function prince(t) {                                              // цесаревич с тачкой
    const k = clamp((t - LS('s3')) / Math.max(0.1, EV.ts_cart - LS('s3'))), x = lerp(-80, 220, sm(k)), y = ny(x) - 6, tip = sm((t - EV.ts_cart) / 0.35);
    human(x, y, 1.08, t, { body: '#f4f0e6', bodyD: '#b8b0a0', trim: '#d8b04a', belt: '#d8b04a', legs: '#1e2a3a', boots: '#120e0a', hair: '#6a4a2a', beard: 'short', hat: 'cap', hatCol: '#f4f0e6', face: t > EV.ts_go ? 'smile' : 'calm', look: 0.6, armL: 'hold', armR: 'hold', walk: t * 7, seed: 151 });
    push(x, y, 1.08); rect(-44, -330, 88, 8, { wash: '#1a1a1a', washA: 1, line: false }); blob([[16, -320], [40, -310], [44, -290], [20, -296]], { wash: '#f8f4ec', washA: 1, w: 1.6, col: '#8a2a1a' }); pencil([[22, -310], [38, -300]], { w: 2, col: '#c83a2a', a: 0.7, pass2: false }); pop();
    push(x + 120, y - 30, 1, -0.12 - tip * 0.6); const b = poly([[-60, -60], [90, -70], [70, 10], [-40, 10]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#2a1608' }); hatch(b.path, b.bb, { gap: 10, a: 0.3, col: '#2a1608', ang: 0, key: 9830 });
    if (tip < 0.6) blob([[-50, -60], [-20, -96], [40, -100], [80, -70]], { wash: '#5a3a1a', washA: 1, w: 1.8, col: '#2a1608' });
    ell(100, 20, 26, 26, { wash: '#4a3020', washA: 1, w: 2.4 }); pencil([[-60, -40], [-150, -10]], { w: 7, col: '#6a4424', pass2: false }); pencil([[-60, -60], [-150, -40]], { w: 7, col: '#6a4424', pass2: false }); pop();
    if (tip > 0) for (let i = 0; i < 14; i++) { const r = rng(9840 + i), d = tip * (40 + r() * 140); ell(x + 230 + d, y - 40 + d * 0.3 + tip * 40, 10 + r() * 14, 8 + r() * 10, { wash: '#5a3a1a', washA: 1, w: 1.2, col: '#2a1608' }); }
    if (t > EV.ts_sabre && t < EV.ts_cart + 0.4) { const q = clamp((t - EV.ts_sabre) / 0.25), f = 1 - sm((t - EV.ts_sabre - 0.6) / 0.4); ctx.save(); ctx.globalAlpha = f;            // призрак сабли
      push(x + 10, y - 400, 1.1, -0.5); pencil([[-180, 0], [-180 + 360 * q, -40 * q]], { w: 10, col: '#e8f0f8', pass2: false }); pencil([[-200, 10], [-180, 0]], { w: 18, col: '#3a2a2a', pass2: false }); glow(-180 + 360 * q, -40 * q, 60, 'rgba(220,240,255,1)', 0.8); pop(); ctx.restore(); }
  }
  function rails(t) {                                               // передний план: штабель рельсов, костыли, кувалда, лопаты
    push(1040, 1860, 0.9); for (let i = 0; i < 5; i++) { const y = -i * 26; rect(-260 + i * 10, y - 20, 520 - i * 20, 20, { wash: '#6a6a72', washA: 1, w: 2, col: '#1a1a20' }); pencil([[-250 + i * 10, y - 18], [250 - i * 10, y - 18]], { w: 2, col: '#c8c8d0', a: 0.6, pass2: false }); } pop();
    push(180, 1900, 1, -0.3); pencil([[0, 0], [0, -220]], { w: 10, col: '#8a5a32', pass2: false }); rect(-50, -250, 100, 40, { wash: '#4a4a52', washA: 1, w: 2, col: '#1a1a1a' }); pop();
    for (let i = 0; i < 8; i++) { const r = rng(9850 + i); push(380 + r() * 300, 1920 + r() * 60, 1, r() * 3); rect(-20, -3, 40, 6, { wash: '#3a3a40', washA: 1, line: false }); pop(); }
  }

  WORLD.tsar = (t, u, cat) => {
    const laid = sm((t - EV.ts_go) / 0.8);
    lay(40, () => sky(t));
    lay(14, () => town(t));
    lay(3, () => { arch(t); crowd(t); });
    lay(1, () => { embank(t, laid); prince(t); cat(); });
    lay(0.7, () => rails(t));
  };
  DIR.tsar = {
    outfit: 'railman', light: { side: -1, rim: '#ffe6b8' }, grade: ['#c8a070', 0.1],
    act: () => [[S0.tsar, 'talk'], [EV.ts_sabre - 0.03, 'scared'], [EV.ts_cart, 'grin'], [EV.ts_go - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 900, y: 1610, s: 1.02, look: t < EV.ts_go ? [-0.6, -0.1] : [0.5, -0.2],
      hand: t > EV.ts_go ? [110, -330] : t > EV.ts_sabre && t < EV.ts_cart ? [-30, -360] : undefined, handF: t > EV.ts_go ? [-110, -320] : undefined,
      tilt: t > EV.ts_sabre && t < EV.ts_cart ? 0.06 : 0, tailUp: t > EV.ts_go, squash: b.squash + (t > EV.ts_go && t < EV.ts_go + 0.25 ? 0.05 : 0) }),
    cam: () => [[S0.tsar, 460, 1120, 0.08], [EV.ts_sabre, 360, 1100, 0.16], [EV.ts_cart, 480, 1120, 0.08], [EV.ts_go, 600, 1060, -0.02, 'x'], [S1.tsar, 620, 1040, 0.02]],
    hud: t => { if (t > EV.ts_sabre + 0.1 && t < EV.ts_cart + 0.5) note('Оцу, Япония — 20 дней назад', 540, 1790, t, EV.ts_sabre + 0.1, EV.ts_cart + 0.5, '#f6ecd6', 44, -0.03);
      if (t > EV.ts_go + 0.2 && t < S1.tsar) note('→ Москва: 9288 км', 600, 1790, t, EV.ts_go + 0.2, S1.tsar, '#ffd890', 52, -0.02); }
  };
  // ---------------------------------------------------------------- переход В tsar: удар топора раскалывает кадр, как полено
  TRANS_IN.tsar = { a: 0.16, b: 0.4, runA: 0, holdA: 1, fx(k, t, A, B) {
    const q = sm(clamp((k - 0.25) / 0.75)), gap = q * 760, cx = 540;
    drawBuf(B, 1.08 - 0.08 * q);
    const half = (sd) => scr(() => { ctx.save(); ctx.beginPath(); const r = rng(77); ctx.moveTo(sd < 0 ? -10 : W + 10, -10); for (let y = -10; y <= H + 10; y += 60) ctx.lineTo(cx + (r() - 0.5) * 40 + sd * gap / 2, y); ctx.lineTo(sd < 0 ? -10 : W + 10, H + 10); ctx.closePath(); ctx.clip(); ctx.translate(sd * gap / 2, 0); ctx.rotate(sd * q * 0.06); ctx.drawImage(A, 0, 0); ctx.restore(); });
    half(-1); half(1);
    scr(() => { if (k < 0.3) { const a = k / 0.3; pencil([[cx, -20], [cx, H * a]], { w: 8, col: '#fff4d8', pass2: false }); glow(cx, H * a, 120, 'rgba(255,240,200,1)', 0.8); }
      for (let i = 0; i < 18; i++) { const r = rng(hsh(i, 3)), y = r() * H, sd = r() < 0.5 ? -1 : 1; push(cx + sd * (gap / 2 + q * 200 * r()), y + q * 300 * r(), 1, q * 8 * r()); rect(-16, -4, 32, 8, { wash: '#e0c090', washA: 1 - q * 0.5, w: 1, col: '#6a4a1a' }); pop(); } });
  } };
})();
