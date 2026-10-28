/* 018 — сцена `aksakov`: 1791, Голубиная слобода, деревянный дом с резными наличниками, сад, голуби над крышей; в окне —
   колыбель; ключница Пелагея (платок, фартук) держит младенца. На «Аксаков» — табличка «С. Т. АКСАКОВ · 1791», на
   «цветочка» в саду распускается аленький цветок, из него вылетает раскрытая книжка «Аленький цветочек». Том — камзол.
   Переход В сцену — лепестки летят через кадр. */
(() => {
  EV.ak_name = wtk('s3', 'Аксаков');
  EV.ak_fl = wtk('s3', 'цветочка');
  KEYW.push('Аксаков', 'цветочка');

  function sky(t) { vgrad(-900, 1000, ['#7aa8d8', '#c8dcec', '#f6ecd4'], 1); for (let i = 0; i < 6; i++) { const a = t * 0.8 + i, x = 600 + Math.cos(a) * 300, y = 520 + Math.sin(a * 1.3) * 80, f = Math.sin(t * 10 + i) * 10; pencil([[x - 20, y - f], [x, y], [x + 20, y - f]], { w: 4, col: '#f2f2f2', pass2: false }); } }
  function yard(t) {
    const g = shape([[-600, 1500], [-600, 1080], [1700, 1060], [1700, 1500]], { wash: '#9ab070', washA: 1, w: 2, col: '#4a5a2a' }); hatch(g.path, g.bb, { gap: 10, a: 0.14, col: '#5a6a3a', ang: -0.3, w: 1.1 });
    push(560, 1140); rect(-320, -320, 640, 320, { wash: '#a87a48', washA: 1, w: 2.6, col: '#3a2412' }); for (let q = 1; q < 12; q++) pencil([[-320, -320 + q * 27], [320, -320 + q * 27]], { w: 2, col: '#5a3a1e', a: 0.7, pass2: false });
    poly([[-360, -320], [360, -320], [0, -500]], { wash: '#6a7a8a', washA: 1, w: 2.4, col: '#2a3a4a' });
    for (const wx of [-200, 0, 200]) { rect(wx - 50, -240, 100, 120, { wash: wx === 0 ? '#ffe0a0' : '#4a6a8a', washA: 1, w: 2, col: '#2a1408' }); poly([[wx - 66, -240], [wx + 66, -240], [wx, -290]], { wash: '#f2ece0', washA: 1, w: 2, col: '#2a1408' }); rect(wx - 66, -120, 132, 16, { wash: '#f2ece0', washA: 1, w: 1.6, col: '#2a1408' }); }
    pop();
    human(860, 1300, 0.52, t, { body: '#a8302a', legs: '#5a3a2a', hair: '#5a3a1a', hat: 'scarf', hatCol: '#3a5a8a', face: 'smile', armR: 'hold', armL: 'hold', long: true, seed: 18410, flip: -1 }); ell(840, 1180, 26, 18, { wash: '#f2ece0', washA: 1, w: 1.6, col: '#5a4a3a' }); ell(828, 1176, 10, 10, { wash: '#f0d8c0', washA: 1, w: 1.2, col: '#5a3a2a' });
    for (let i = 0; i < 8; i++) { const x = 100 + i * 90; pencil([[x, 1300], [x, 1240]], { w: 3, col: '#3a6a2a', pass2: false }); ell(x, 1236, 10, 8, { wash: ['#f2f2f2', '#e8c030', '#c8a0d0'][i % 3], washA: 1, w: 1, col: '#5a4a3a' }); }
    if (t > EV.ak_fl - 0.3) { const k = sm((t - EV.ak_fl + 0.3) / 0.6); push(400, 1360, 0.5 + 0.8 * k); pencil([[0, 0], [0, -120]], { w: 5, col: '#2a6a2a', pass2: false }); for (let p = 0; p < 6; p++) { push(0, -140, 1, p * 1.047); blob([[0, 0], [24, -20], [10, -60], [-10, -60], [-24, -20]], { wash: '#d81e2a', washA: 1, w: 1.6, col: '#6a0a10' }); pop(); } ell(0, -140, 12, 12, { wash: UF.gold, washA: 1, w: 1, col: '#6a4a08' }); glow(0, -140, 80, 'rgba(255,120,120,1)', 0.4 * k); pop(); }
  }

  WORLD.aksakov = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => yard(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89868', washA: 1, w: 2, col: '#4a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a5a2a', ang: 0.1, w: 1.2 }); cat(); });
  };
  DIR.aksakov = {
    outfit: 'kamzol', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a870', 0.06],
    act: () => [[S0.aksakov, 'talk'], [EV.ak_name, 'proud'], [EV.ak_fl, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.ak_fl ? 1 : undefined, hand: t > EV.ak_fl ? [180, -200] : [120, -270] }),
    cam: () => [[S0.aksakov, 560, 1080, 0.04], [EV.ak_name, 600, 1060, 0.06], [EV.ak_fl, 480, 1180, 0.12], [S1.aksakov, 480, 1180, 0.14]],
    hud: t => { if (t > EV.ak_name) { const k = popK(t, EV.ak_name, 0.35); push(620, 740, k, -0.03); rect(-220, -60, 440, 120, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#5a3a1a' }); txt('С. Т. АКСАКОВ', 0, -8, 40, { font: 'Osw', col: '#2a1a10' }); txt('Уфа, 1791', 0, 36, 26, { col: '#5a4a3a' }); pop(); }
      if (t > EV.ak_fl) { const k = popK(t, EV.ak_fl, 0.35); push(760, 1020, k, 0.06); rect(-130, -90, 260, 180, { wash: '#a81e2a', washA: 1, w: 3, col: '#4a0a10' }); txt('АЛЕНЬКИЙ', 0, -18, 34, { font: 'Osw', col: '#ffd24a' }); txt('ЦВЕТОЧЕК', 0, 26, 34, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.aksakov = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // лепестки летят через кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(18420); for (let i = 0; i < 120; i++) { const x = lerp(-200, W + 200, (r() + k * 1.4) % 1.4 - 0.2), y = r() * H + Math.sin(t * 3 + i) * 40; push(x, y, 1, t * 2 + i); blob([[0, 0], [20, -16], [8, -44], [-8, -44], [-20, -16]], { wash: '#d81e2a', washA: f, w: 1, col: '#6a0a10', a: f }); pop(); } });
  } };
})();
