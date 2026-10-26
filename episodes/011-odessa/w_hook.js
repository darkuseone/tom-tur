/* 011 — сцена `hook`: 2026, разрез Одессы. Сверху тонкая полоса города: Приморский бульвар, акации, Дюк, Оперный, море с краном и
   кораблём. Ниже — толща ракушняка, в ней галереи катакомб уходят вглубь до горизонта. Том в худи стоит в большой арочной галерее
   переднего плана со свечой. На «тысячи» — счётчик «≈ 2 500 км», на «Кто» галереи вспыхивают цепочкой свечей и на стене светится «?».
   Переход в туннель — дым свечи закручивается в портал часов. Последний кадр кнопки возвращается сюда же (петля). */
(() => {
  EV.hk_km = wtk('h1', 'тысячи');
  EV.hk_who = wtk('h1', 'Кто');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.05, 0.25, 6]);
  KEYW.push('тоннелей!', 'вырыл?');

  function sky(t) { vgrad(-900, 640, ['#5a8ac0', '#a8c8e4', '#f2dcc0'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 520 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 54, 220 + i * 70 + Math.sin(k) * 10, 70, 24, { wash: '#fbf4ea', washA: 0.8, line: false }); } }
  function surface(t) {                                                // полоса города над землёй
    vgrad(560, 700, ['#3a8aa8', '#1e5a74'], 1); for (let k = 0; k < 8; k++) pencil([[-400 + k * 40, 600 + k * 12], [1480, 600 + k * 12]], { w: 1.2, col: '#bfe4f0', a: 0.3, pass2: false });
    merchant(1040, 640, 0.22, t, 1, {}); for (const cx of [-120, 60]) { pencil([[cx, 700], [cx + 30, 560], [cx + 120, 540]], { w: 5, col: '#c8302a', pass2: false }); pencil([[cx + 120, 540], [cx + 120, 600]], { w: 1.4, col: '#2a2a2a', pass2: false }); }
    const g = rect(-500, 700, 2100, 90, { wash: '#b8a07a', washA: 1, w: 2, col: '#3a2a14' });
    odHouse(-380, 700, 230, 170, OD.stone, t, { key: 11200 }); odHouse(-140, 700, 200, 150, '#e8b89a', t, { key: 11201 });
    opera(880, 700, 0.36, t); duke(560, 700, 0.42, t);
    for (const [x, h, sd] of [[120, 160, 1], [300, 140, 2], [700, 170, 3], [1180, 150, 4], [1300, 160, 5]]) acacia(x, 700, h, t, 11210 + sd);
    for (let i = 0; i < 6; i++) { const x = ((i * 260 + t * (30 + i * 6)) % 1700) - 200; human(x, 704, 0.2, t, { body: ['#c83a3a', '#3a5a8a', '#e8d8b0', '#3a6a3a', '#8a3a6a', '#2a2a2a'][i], legs: '#2a2a3a', hair: '#3a2a1a', face: 'smile', seed: 11220 + i, flip: i % 2 ? -1 : 1 }); }
  }
  function underground(t) {                                            // толща ракушняка и катакомбы вглубь
    const k = sm((t - EV.hk_who) / 1.2);
    tunnels(990, 1560, t, { rows: 4, glowK: k, seed: 11230, shafts: [300, 980] });
    if (k > 0) { push(760, 1180, 0.6 + 0.4 * popK(t, EV.hk_who, 0.4)); txt('?', 0, 0, 220, { font: 'Osw', col: '#ffd890', a: k }); glow(0, 0, 200, 'rgba(255,200,110,1)', 0.4 * k); pop(); }
  }
  function gallery(t) {                                                // большая арка переднего плана: пилоны и свод, капель
    for (const [x0, x1] of [[-500, 90], [990, 1600]]) { const p = shape([[x0, 1040], [x1, 1070], [x1 + (x0 < 0 ? 40 : -40), 1520], [x0, 2400]], { wash: OD.rock, washA: 1, w: 3, col: OD.rockD }); shadeG(p.path, x0 < 0 ? x1 : x0, 0, x0 < 0 ? x0 : x1, 0, '#3a2a14', 0.6); hatch(p.path, p.bb, { gap: 10, a: 0.2, col: OD.rockD, ang: 0.5, w: 1.2 }); }
    const arch = shape([[-500, 960], [1600, 960], [1600, 1080], [990, 1080], ...spline([[990, 1080], [540, 990], [90, 1080]], false, 12), [-500, 1080]], { wash: OD.rock, washA: 1, w: 3, col: OD.rockD }); shadeG(arch.path, 0, 960, 0, 1080, '#3a2a14', 0.5);
    const fl = shape([[-500, 1480], [1600, 1480], [1600, 2400], [-500, 2400]], { wash: '#8a7046', washA: 1, w: 2, col: '#2a1a08', a: 0.5 }); hatch(fl.path, fl.bb, { gap: 12, a: 0.15, col: '#2a1a08', ang: 0.1, w: 1.2 });
    const R = rng(11240); for (let i = 0; i < 8; i++) { const x = 100 + R() * 880, ph = (t * 0.8 + R()) % 1; ell(x, 1060 + ph * 420, 3, 6, { wash: '#bfe4f0', washA: 0.8 * (1 - ph), line: false }); }
    for (let i = 0; i < 5; i++) stoneRock(-60 + i * 230, 1500 + (i % 2) * 40, -60 + i * 230 + 90, 1540 + (i % 2) * 40, 11250 + i, { n: 4 });
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => { push(0, 200, 1); surface(t); pop(); });
    lay(4, () => underground(t));
    lay(1, () => { gallery(t); cat(); });
    lay(0.7, () => motes(30, [-100, 900, 1200, 1900], '#ffd8a0', t, 11260, { sp: -12, sz: 2.2, a: 0.5, tw: 1, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieO', light: { side: 1, rim: '#ffd09a' }, grade: ['#c0884a', 0.12],
    act: () => [[0, 'shock'], [EV.hk_km, 'awe'], [EV.hk_who - 0.03, 'suspicious'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 420, y: 1480, s: 1.06, look: t < EV.hk_who ? [0.3, -0.6] : t < LS('h2') ? [0.6, -0.2] : [0.1, 0], tilt: t < 0.4 ? -0.06 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      hand: t > EV.hk_wind - 0.05 ? [70, -330] : [120, -300], handF: [-110, -250], tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    afterCat: (t, u, P) => { if (t < EV.hk_wind - 0.1) candleGlow(P.x + 126 * P.s, P.y - 300 * P.s, 0.9, t, 1); },
    cam: () => [[0, 540, 1000, 0.04], [EV.hk_km, 560, 1040, 0.08], [EV.hk_who, 540, 1100, 0.12], [LS('h2'), 500, 1160, 0.18], [S1.hook, 520, 1140, 0.26]],
    hud: t => {
      if (t > EV.hk_km && t < LS('h2') + 0.5) { const k = popK(t, EV.hk_km, 0.35), n = Math.min(2500, Math.round(2500 * sm((t - EV.hk_km) / 0.9))); push(700, 1280, 0.7 + 0.3 * k, -0.03);
        ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-190, -70, 380, 140); ctx.restore(); txt('≈ ' + n.toLocaleString('ru-RU') + ' км', 0, 4, 66, { font: 'Osw', col: '#ffd24a', a: k }); txt('под городом', 0, 50, 26, { font: 'Osw', col: '#f6e7c8', a: k }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В туннель: дым свечи закручивается в портал часов
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, q * 0.5);
    scr(() => { for (let i = 0; i < 5; i++) pencil(Array.from({ length: 40 }, (_, j) => { const a = j / 6 + q * 9 + i * 1.256, r = (40 - j) * 18 * q; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }), { w: 10 - i, col: '#d8d0c4', a: 0.7 * (1 - q * 0.5), pass2: false }); });
    const R = Math.pow(sm((k - 0.3) / 0.7), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.5 - k)); }
  } };
})();
