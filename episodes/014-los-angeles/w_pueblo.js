/* 014 — сцена `pueblo`: 1781, река Лос-Анджелес, пуэбло: площадь, глинобитные дома с балками, деревянный крест, колодец,
   поселенцы с волами и повозкой, курицы, кактусы-опунции; за деревней — тот же хребет. На «сорок» над людьми щёлкает счётчик
   «44», на «Мексики» — стрелка с севера Мексики, на «Ангелов» — табличка «EL PUEBLO DE LA REINA DE LOS ÁNGELES» и перевод.
   Том — колонист в пончо и сомбреро. Переход В сцену — солнце вспыхивает и выбеливает кадр. */
(() => {
  EV.pu_44 = wtk('s2', 'сорок');
  EV.pu_mex = wtk('s2', 'Мексики');
  EV.pu_ang = wtk('s2', 'Ангелов.');
  KEYW.push('сорок', 'Ангелов.');

  function sky(t) { vgrad(-900, 1000, ['#5a9ad8', '#a8d0e8', '#f6e8c8'], 1); ell(1250, 260, 90, 90, { wash: '#fff2c0', washA: 1, line: false }); glow(1250, 260, 300, 'rgba(255,240,180,1)', 0.5);
    for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function village(t) {                                                // площадь, дома, крест, колодец, река
    const g = shape([[-600, 1500], [-600, 1000], [1700, 980], [1700, 1500]], { wash: '#d8c08a', washA: 1, w: 2, col: '#7a5a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#9a7a4a', ang: -0.3, w: 1.1 });
    pencil([[-600, 1040], [0, 1060], [600, 1030], [1700, 1050]], { w: 26, col: '#6aa0c8' });
    [[-420, 220, 150], [-170, 180, 130], [60, 260, 170], [780, 240, 160], [1040, 200, 140], [1260, 220, 150]].forEach(([x, w, h]) => adobe(x, 1120, w, h, t));
    push(560, 1120); pencil([[0, 0], [0, -260]], { w: 14, col: '#5a3a1e' }); pencil([[-60, -200], [60, -200]], { w: 12, col: '#5a3a1e' }); pop();
    push(420, 1180); ell(0, 0, 60, 20, { wash: '#a89070', washA: 1, w: 2, col: '#3a2a14' }); rect(-60, -50, 120, 50, { wash: '#b8a080', washA: 1, w: 2, col: '#3a2a14' }); pencil([[-50, -50], [-50, -130], [50, -130], [50, -50]], { w: 5, col: '#5a3a1e', pass2: false }); pop();
    for (const [x, s] of [[-300, 0.8], [1350, 1]]) { for (let q = 0; q < 4; q++) ell(x + (q - 1.5) * 40 * s, 1180 - 40 * s - (q % 2) * 50 * s, 28 * s, 40 * s, { wash: '#6a9a4a', washA: 1, w: 2, col: '#2a4a1a' }); }
    cart(-100, 1320, 0.55, t, 0, { tent: '#e8dcc0' });
    for (let i = 0; i < 6; i++) { const x = 120 + i * 150, y = 1300 + (i % 2) * 20; human(x, y, 0.46, t, { body: ['#e8dcc0', '#c8603a', '#3a5a8a', '#e8c070', '#8a4a3a', '#d8d0c0'][i], legs: '#5a4a32', hair: '#2a1a10', beard: i % 3 === 0 ? 'short' : null, hat: i % 2 ? 'scarf' : 'straw', hatCol: ['#c8302a', '#e8d090'][i % 2], face: 'smile', armR: i === 2 && t > EV.pu_ang ? 'up' : 'hold', armL: 'hold', long: i % 2 === 1, seed: 14310 + i, flip: i % 2 ? -1 : 1 }); }
    for (let i = 0; i < 3; i++) { const x = 900 + i * 50 + Math.sin(t * 3 + i) * 10, y = 1360; ell(x, y - 14, 16, 12, { wash: '#f2ece0', washA: 1, w: 1.4, col: '#3a2a14' }); ell(x + 12, y - 26, 7, 7, { wash: '#f2ece0', washA: 1, w: 1.2, col: '#3a2a14' }); pencil([[x + 12, y - 33], [x + 12, y - 38]], { w: 3, col: '#c8302a', pass2: false }); }
  }

  WORLD.pueblo = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => ridge(t, { col: '#b8a878', colD: '#7a6a3a' }));
    lay(4, () => village(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#c8a874', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 900, 1300, 1900], '#f6e8c0', t, 14320, { sp: -10, vx: 20, sz: 3, a: 0.35, wob: 30 }));
  };
  DIR.pueblo = {
    outfit: 'colono', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a870', 0.08],
    act: () => [[S0.pueblo, 'proud'], [EV.pu_44, 'talk'], [EV.pu_mex, 'grin'], [EV.pu_ang, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.pu_44 && t < EV.pu_ang ? 1 : undefined, hand: t > EV.pu_44 && t < EV.pu_ang ? [210, -300] : [120, -270] }),
    cam: () => [[S0.pueblo, 560, 1080, 0.04], [EV.pu_44, 580, 1120, 0.08], [EV.pu_ang, 560, 1060, 0.04], [S1.pueblo, 560, 1060, 0.08]],
    hud: t => {
      if (t > EV.pu_44 && t < EV.pu_ang) { const k = popK(t, EV.pu_44, 0.35); push(620, 760, k, 0.03); rect(-200, -70, 400, 140, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('44 ПОСЕЛЕНЦА', 0, -12, 40, { font: 'Osw', col: '#5a1a10' }); txt('11 семей · из Мексики', 0, 36, 26, { col: '#2a1a10' }); pop(); }
      if (t > EV.pu_ang) { const k = popK(t, EV.pu_ang, 0.35); push(560, 740, k, -0.03); rect(-320, -80, 640, 160, { wash: '#efe0b8', washA: 0.98, w: 3, col: '#5a3a1a' }); txt('EL PUEBLO DE LA REINA', 0, -34, 36, { font: 'Osw', col: '#2a1a10' }); txt('DE LOS ÁNGELES', 0, 12, 40, { font: 'Osw', col: '#a8201e' }); txt('«деревня Королевы Ангелов»', 0, 56, 24, { col: '#5a4a3a' }); pop(); }
    }
  };
  TRANS_IN.pueblo = { a: 0.3, b: 0.4, fx(k, t, A, B) {               // солнце вспыхивает и выбеливает кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 + k * 0.1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); glow(900, 300, 400 + f * 1400, 'rgba(255,240,190,1)', f); ctx.save(); ctx.globalAlpha = 0.7 * f * f; ctx.fillStyle = '#fff8e8'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
