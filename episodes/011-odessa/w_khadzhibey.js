/* 011 — сцена `khadzhibey`: сентябрь 1789, рассвет. Турецкая крепость Хаджибей на жёлтом обрыве над морем, флаг с полумесяцем.
   С моря идут гребные лодки с десантом, на рейде — парусники с дымками выстрелов. Дерибас в треуголке и адмиральском мундире на
   переднем плане указывает шпагой; Том в зелёном кафтане рядом. На «Дерибасовской» выскакивает табличка улицы (как сегодня),
   на «берёт» — штурм: вспышки, дым, флаг на башне меняется на Андреевский. Переход В сцену — волна разбивается о кадр. */
(() => {
  EV.kh_street = wtk('s1', 'Дерибасовской');
  EV.kh_take = wtk('s1', 'берёт');
  EV.kh_name = wtk('s1', 'Хаджибей');
  KEYW.push('Дерибасовской,', 'Хаджибей.');
  SHAKES.push([EV.kh_take + 0.1, 0.3, 7]);
  const land = t => sm((t - S0.khadzhibey + 0.2) / (EV.kh_take - S0.khadzhibey + 0.4));

  function sky(t) { vgrad(-900, 900, ['#5a6a9a', '#d8a890', '#f6d8b0'], 1); glow(1200, 700, 600, 'rgba(255,200,140,1)', 0.45); for (let i = 0; i < 3; i++) { const x = ((i * 500 + t * 10) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 180 + i * 80 + Math.sin(k) * 10, 72, 22, { wash: '#f6c8b0', washA: 0.7, line: false }); } }
  function seaFar(t) { vgrad(820, 1200, ['#4a7a9a', '#1e4a66'], 1); for (let k = 0; k < 14; k++) pencil([[-400, 840 + k * 24], [1480, 846 + k * 24]], { w: 1.2, col: '#f6d8b0', a: 0.3, pass2: false });
    merchant(1150, 900, 0.3, t, 2, { flag: '#f6f2ea' }); merchant(900, 880, 0.24, t, 3, { flag: '#f6f2ea' });
    for (const [sx, sy] of [[1050, 820], [860, 810]]) if (t > EV.kh_take - 0.3) { const ph = ((t - EV.kh_take) * 1.2) % 1; ell(sx + ph * 60, sy - ph * 60, 20 + ph * 50, 14 + ph * 34, { wash: '#e8e4dc', washA: 0.7 * (1 - ph), line: false }); if (ph < 0.15) glow(sx, sy, 80, 'rgba(255,220,150,1)', 0.8); } }
  function cliff(t) {                                                  // жёлтый обрыв, крепость наверху
    const c = shape([[-500, 760], [-80, 700], [380, 690], [560, 760], [620, 1000], [520, 1120], [-500, 1140]], { wash: OD.stone, washA: 1, w: 2.6, col: OD.rockD }); shadeG(c.path, 600, 0, -200, 0, OD.rockD, 0.45); hatch(c.path, c.bb, { gap: 9, a: 0.18, col: OD.rockD, ang: 1.3, w: 1.2 });
    for (let k = 0; k < 7; k++) pencil([[-400 + k * 140, 760 + (k % 2) * 30], [-380 + k * 140, 1100]], { w: 2, col: OD.rockD, a: 0.4, pass2: false });
    turkFort(80, 700, 0.62, t, { taken: t > EV.kh_take + 0.5 });
    if (t > EV.kh_take) for (let q = 0; q < 5; q++) { const ph = ((t - EV.kh_take) * 0.7 + q / 5) % 1; ell(-100 + q * 80 + ph * 40, 560 - ph * 260, 40 + ph * 90, 30 + ph * 60, { wash: '#6a625a', washA: 0.5 * (1 - ph), line: false }); }
    if (t > EV.kh_take && t < EV.kh_take + 0.25) glow(80, 560, 300, 'rgba(255,200,120,1)', 0.8);
  }
  function boats(t) { const k = land(t); sailBoat(lerp(1400, 760, k), 1140, 0.85, t, 1); sailBoat(lerp(1700, 1040, k), 1200, 0.75, t, 2); sailBoat(lerp(1550, 900, k * 0.9), 1260, 0.95, t, 3); }
  function ribas(t) {                                                  // Дерибас: тёмно-зелёный мундир, эполеты, треуголка, шпага к крепости
    const x = 840, y = 1480, s = 1.15, pt = t > EV.kh_take - 0.4;
    human(x, y, s, t, { body: '#1e3a2a', bodyD: '#0e1e14', legs: '#e8e4dc', boots: '#141010', trim: '#d6a842', hair: '#6a4a2a', face: pt ? 'angry' : 'smile', armR: pt ? 'point' : 'hold', armL: 'hold', belt: '#d6a842', seed: 1130, flip: -1, look: -0.5 });
    tricorn(x, y - 284 * s - 34 * s, s * 0.95);
    if (pt) { const hx = x - 150 * s, hy = y - 300 * s; pencil([[hx, hy], [hx - 170, hy - 90]], { w: 5, col: '#d8dce0' }); glow(hx - 160, hy - 86, 30, 'rgba(255,255,255,1)', 0.6); }
  }

  WORLD.khadzhibey = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => seaFar(t));
    lay(5, () => cliff(t));
    lay(3, () => boats(t));
    lay(1, () => { const g = shape([[-500, 1400], [1600, 1430], [1600, 2400], [-500, 2400]], { wash: '#c8b07a', washA: 1, w: 2, col: '#3a2a10', a: 0.5 }); hatch(g.path, g.bb, { gap: 10, a: 0.14, col: '#5a4a2a', ang: 0.1, w: 1.2 });
      for (let i = 0; i < 5; i++) pencil([[-300 + i * 340, 1420], [-260 + i * 340 + Math.sin(t * 2 + i) * 8, 1360]], { w: 3, col: '#7a8a3a', pass2: false });
      ribas(t); cat(); });
    lay(0.7, () => { if (t > EV.kh_take) motes(30, [-200, 200, 1300, 1900], '#ffd8a0', t, 11300, { sp: -40, sz: 3, a: 0.6, add: 1, wob: 20 }); });
  };
  DIR.khadzhibey = {
    outfit: 'preobr', light: { side: 1, rim: '#ffd8b0' }, grade: ['#c08a6a', 0.1],
    act: () => [[S0.khadzhibey, 'grin'], [EV.kh_street - 0.03, 'wink'], [EV.kh_take, 'shock'], [EV.kh_name, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1480, s: 1.04, look: [-0.4, -0.3], handF: t > EV.kh_take - 0.2 ? [-150, -390] : undefined, hand: t > EV.kh_name ? [90, -400] : undefined }),
    cam: () => [[S0.khadzhibey, 560, 980, 0.12], [EV.kh_street, 600, 1000, 0.06], [EV.kh_take, 480, 900, 0.1], [EV.kh_name, 500, 940, 0.06], [S1.khadzhibey, 520, 960, 0.12]],
    hud: t => { if (t > EV.kh_street && t < EV.kh_take + 0.6) { const k = popK(t, EV.kh_street, 0.3); push(760, 700, k, 0.04); rect(-230, -56, 460, 112, { wash: '#1e4a7a', washA: 1, w: 4, col: '#f2ece0' }); txt('ул. ДЕРИБАСОВСКАЯ', 0, -6, 46, { font: 'Osw', col: '#f2ece0' }); txt('та самая', 0, 34, 26, { col: '#ffd890' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В khadzhibey: волна разбивается о кадр
  TRANS_IN.khadzhibey = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const L = lerp(-300, W + 400, sm(k)), crest = y => L - 180 + Math.sin(y / 70 + t * 6) * 50;
    drawBuf(B, 1.1 - 0.1 * sm(k));
    const P = new Path2D(); P.moveTo(W + 10, -10); for (let y = -10; y <= H + 10; y += 30) P.lineTo(Math.max(-10, crest(y)), y); P.lineTo(W + 10, H + 10); P.closePath();
    inPath(P, () => drawBuf(A));
    scr(() => { const pts = []; for (let y = -20; y <= H + 20; y += 30) pts.push([crest(y), y]); pencil(pts, { w: 40, col: '#2a7a96', a: 0.9, pass2: false }); pencil(pts.map(([x, y]) => [x - 22, y]), { w: 14, col: '#f2f6f4', a: 0.95, pass2: false });
      const r = rng(11310); for (let i = 0; i < 40; i++) { const y = r() * H, x = crest(y) - 30 - r() * 160 * Math.sin(k * Math.PI); ell(x, y, 8 + r() * 18, 8 + r() * 18, { wash: '#f2f6f4', washA: 0.85, line: false }); } });
  } };
})();
