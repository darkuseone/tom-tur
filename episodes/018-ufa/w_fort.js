/* 018 — сцена `fort`: XVI век, высокий берег над Белой: лес, стрельцы в красных кафтанах с бердышами рубят частокол, ставят
   башни с шатрами и деревянную церковь; по реке — струги; на «стрельцы» частокол растёт, на «Уфу» над воротами вешают
   доску «УФА». Том — княжий кафтан. Переход В сцену — шайба-ледокол раскалывает кадр трещиной. */
(() => {
  EV.fo_str = wtk('s1', 'стрельцы');
  EV.fo_ufa = wtk('s1', 'Уфу.');
  KEYW.push('Белой', 'Уфу.');
  const build = t => 0.25 + 0.75 * sm((t - S0.fort) / (EV.fo_ufa - S0.fort + 0.3));

  function sky(t) { vgrad(-900, 1000, ['#5a8ad0', '#b0d0ea', '#f2e8d0'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function forest(t) { for (let i = 0; i < 20; i++) { const x = -560 + i * 120, h = 140 + (i % 4) * 30; pencil([[x, 900], [x, 900 - h]], { w: 6, col: '#4a3420' }); for (let q = 0; q < 4; q++) poly([[x - 50 + q * 10, 900 - h * 0.3 - q * h * 0.18], [x + 50 - q * 10, 900 - h * 0.3 - q * h * 0.18], [x, 900 - h * 0.6 - q * h * 0.18]], { wash: '#2a5a3a', washA: 1, w: 1.4, col: '#0e2a1a' }); } }
  function bank(t) {
    hillUfa(560, 1180, 0.9, t);
    stockade(560, 1180 - 0.9 * 330, 0.62, t, { build: build(t), church: build(t) > 0.9 });
    if (t > EV.fo_ufa) { const k = popK(t, EV.fo_ufa, 0.35); push(560, 1180 - 0.9 * 330 - 120, k); rect(-90, -30, 180, 60, { wash: '#c8a868', washA: 1, w: 2, col: '#3a2412' }); txt('УФА', 0, 14, 40, { font: 'Osw', col: '#5a1a10' }); pop(); }
    belaya(1180, t, { h: 160 });
    for (let k = 0; k < 2; k++) { const x = 1500 - ((t * 40 + k * 900) % 2200); push(x, 1260, 0.5); shape([[-200, 0], [200, 0], [240, -40], [-220, -40]], { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' }); pencil([[0, -40], [0, -260]], { w: 6, col: '#3a2412' }); blob([[6, -250], [120, -240], [110, -80], [6, -70]], { wash: '#efe6d0', washA: 1, w: 1.6, col: '#5a4a3a' }); pop(); }
    for (let i = 0; i < 4; i++) { const x = -200 + i * 220, y = 1380 + (i % 2) * 20; human(x, y, 0.46, t, { body: '#b8302a', bodyD: '#5a0e0a', legs: '#4a3a2a', hair: '#3a2210', beard: 'long', hat: 'fur', hatCol: '#b8302a', face: 'calm', armR: Math.sin(t * 6 + i) > 0 ? 'up' : 'point', armL: 'hold', prop: 'axe', seed: 18210 + i }); }
  }

  WORLD.fort = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(14, () => forest(t));
    lay(4, () => bank(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#9a9a68', washA: 1, w: 2, col: '#4a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a5a2a', ang: 0.1, w: 1.2 }); for (let i = 0; i < 6; i++) rect(700 + i * 70, 1450 - (i % 2) * 20, 80, 22, { wash: UF.wood, washA: 1, w: 1.4, col: UF.woodD }); cat(); });
    lay(0.7, () => motes(30, [-200, 900, 1300, 1900], '#e8dcb0', t, 18220, { sp: -10, vx: 20, sz: 3, a: 0.3, wob: 30 }));
  };
  DIR.fort = {
    outfit: 'knyaz', light: { side: 1, rim: '#fff0c8' }, grade: ['#a8a070', 0.08],
    act: () => [[S0.fort, 'proud'], [EV.fo_str, 'grin'], [EV.fo_ufa, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.6, -0.5], point: t > EV.fo_ufa ? 1 : undefined, hand: t > EV.fo_ufa ? [200, -380] : [120, -270] }),
    cam: () => [[S0.fort, 560, 1040, 0.04], [EV.fo_str, 560, 1080, 0.06], [EV.fo_ufa, 580, 1000, 0.08], [S1.fort, 580, 1000, 0.1]]
  };
  TRANS_IN.fort = { a: 0.3, b: 0.45, fx(k, t, A, B) {                // трещина-ледокол раскалывает кадр
    const q = sm(k), off = q * q * 1200; drawBuf(B, 1.06 - 0.06 * q);
    for (const sd of [-1, 1]) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(sd * off, 0); const P = new Path2D(); P.moveTo(540, 0); for (let y = 0; y <= H; y += 120) P.lineTo(540 + Math.sin(y * 0.02) * 60, y); P.lineTo(sd < 0 ? 0 : W, H); P.lineTo(sd < 0 ? 0 : W, 0); P.closePath(); ctx.clip(P); drawBuf(A); ctx.restore(); }
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); for (let y = 0; y < H; y += 120) pencil([[540 + Math.sin(y * 0.02) * 60, y], [540 + Math.sin((y + 120) * 0.02) * 60, y + 120]], { w: 8, col: '#e8f4fa', a: f, pass2: false }); });
  } };
})();
