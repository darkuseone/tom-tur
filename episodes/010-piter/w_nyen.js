/* 010 — сцена `nyen`: май 1703, дельта Невы. Слева — взятый шведский Ниеншанц в дыму, на нём уже царский жёлтый штандарт;
   справа — Заячий остров: солдаты вбивают сваи, насыпают земляные бастионы, на воде парусники с Андреевским флагом. Пётр (2 м ростом)
   в зелёном кафтане указывает тростью на остров. На «две недели» — листки календаря 1 → 14, на «крепость!» встают бастионы.
   Переход В сцену — пушечный выстрел в камеру, дымовое кольцо. */
(() => {
  EV.ny_peter = LS('s2');
  EV.ny_take = wtk('s2', 'Ниеншанц');
  EV.ny_two = wtk('s2', 'две');
  EV.ny_fort = wtk('s2', 'крепость!');
  KEYW.push('Ниеншанц', 'крепость!');
  SHAKES.push([EV.ny_take, 0.25, 6]);
  const build = t => sm((t - EV.ny_two) / (EV.ny_fort - EV.ny_two + 0.6));

  function sky(t) { vgrad(-900, 1000, ['#6a98c8', '#b8d0e4', '#f2e6d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 430 + t * 20) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 110 + i * 85 + Math.sin(k) * 10, 70, 28, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function delta(t) {
    sil([[-400, 840], [-100, 800], [200, 820], [500, 790], [800, 815], [1100, 790], [1480, 820], [1480, 900], [-400, 900]], '#6a8a6a', 0.9);
    neva(880, 1280, t, { top: '#7a9ab8', bot: '#3a5a78' });
    // Ниеншанц слева: взят, дым, штандарт Петра
    push(-40, 0, 1); swedeFort(200, 900, 0.5, t, {}); pop();
    const fy = 900 - 0.5 * 490;
    push(160, fy - 10, 0.5); pencil([[0, 0], [0, -230]], { w: 6, col: '#4a3a2a' }); const wv = Math.sin(t * 5) * 6; const sh = shape([[0, -226], [150, -222 + wv], [140, -140 + wv], [0, -146]], { wash: '#e8c030', washA: 1, w: 1.6, col: '#5a4a08' }); ell(70, -184 + wv * 0.5, 26, 22, { wash: '#1a1a1a', washA: 1, line: false }); for (const sd of [-1, 1]) ell(70 + sd * 20, -204, 9, 9, { wash: '#1a1a1a', washA: 1, line: false }); pop();
    for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5) % 1; ell(120 + ph * 160 + k * 20, 640 - ph * 380, 50 + ph * 90, 34 + ph * 60, { wash: '#7a7470', washA: 0.5 * (1 - ph), line: false }); }
    // Заячий остров: сваи, бастионы растут
    const b = build(t); const isl = shape([[520, 900], [600, 860], [1100, 860], [1200, 900]], { wash: '#8a7a4a', washA: 1, w: 2, col: '#2a2010', a: 0.6 });
    for (let k = 0; k < 14; k++) { const x = 560 + k * 44, h = 30 + (k % 3) * 8; pencil([[x, 900], [x, 900 - h * (0.5 + 0.5 * b)]], { w: 6, col: '#6a4a2a' }); }
    if (b > 0) { const P = [[540, 900], [600, 900 - 90 * b], [700, 900 - 70 * b], [760, 900 - 120 * b], [880, 900 - 80 * b], [960, 900 - 120 * b], [1060, 900 - 80 * b], [1160, 900]]; const bp = shape(P, { wash: '#8a6a3a', washA: 1, w: 2.4, col: '#2a1a08' }); hatch(bp.path, bp.bb, { gap: 6, a: 0.25, col: '#3a2410', ang: 0.6, w: 1.2 });
      if (b > 0.8) { push(860, 900 - 120 * b, 0.4); pencil([[0, 0], [0, -200]], { w: 6, col: '#4a3a2a' }); shape([[0, -196], [130, -192], [124, -130], [0, -134]], { wash: '#f6f2ea', washA: 1, w: 1.4, col: '#2a2a2a' }); pencil([[0, -194], [124, -132]], { w: 10, col: '#2a5aa8', pass2: false }); pencil([[0, -134], [124, -192]], { w: 10, col: '#2a5aa8', pass2: false }); pop(); } }
    for (let k = 0; k < 6; k++) { const x = 600 + k * 90, hit = Math.sin(t * 8 + k) > 0.5; human(x, 905, 0.28, t, { body: '#2a5a3a', legs: '#b8302a', hat: 'cap', hatCol: '#1a1a1a', armR: hit ? 'up' : 'hold', armL: hit ? 'up' : 'hold', seed: 400 + k }); }
    sailship(1300, 1080, 0.5, t, 1); sailship(-150, 1120, 0.42, t, 2);
  }
  function peter(t) {                                                  // Пётр: высокий, зелёный кафтан, треуголка, трость указывает на остров
    const x = 900, y = 1470, pt = t > EV.ny_two - 0.3;
    human(x, y, 1.3, t, { body: '#2a5a3a', bodyD: '#12301c', legs: '#2a2a2e', boots: '#141010', trim: '#d6a842', hair: '#2a1a10', face: t > EV.ny_take ? 'smile' : 'calm', armR: pt ? 'point' : 'hold', armL: 'hold', belt: '#b8302a', seed: 410, flip: -1, look: -0.6 });
    const hy = y - 238 * 1.3 - 46 * 1.3; push(x, hy - 30, 1.3); blob([[-70, -10], [0, 14], [70, -10], [50, -24], [0, -16], [-50, -24]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); blob([[-40, -14], [-34, -46], [34, -46], [40, -14]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); pop();
    pencil([[x - 14, hy + 30], [x - 4, hy + 26], [x + 6, hy + 30]], { w: 3, col: '#1a1410', pass2: false });
    if (pt) pencil([[x - 150, y - 290], [x - 330, y - 360]], { w: 6, col: '#3a2412' });
  }
  function soldiers(t) { for (const [x, s, k] of [[1060, 0.86, 0], [1160, 0.8, 1]]) human(x, 1460, s, t, { body: '#2a5a3a', legs: '#b8302a', hat: 'cap', hatCol: '#18161a', armR: 'hold', prop: 'spear', face: 'calm', seed: 420 + k, flip: -1 }); }

  WORLD.nyen = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => delta(t));
    lay(1, () => { const g = shape([[-400, 1420], [1480, 1430], [1480, 2400], [-400, 2400]], { wash: '#8a8a5a', washA: 1, w: 2, col: '#2a2a10', a: 0.4 }); hatch(g.path, g.bb, { gap: 10, a: 0.12, col: '#3a3a1a', ang: 0.1, w: 1.2 });
      for (let i = 0; i < 4; i++) ell(-100 + i * 110, 1470 + (i % 2) * 20, 40, 26, { wash: '#6a4a2a', washA: 1, w: 1.6, col: '#2a1a08' });
      soldiers(t); peter(t); cat(); });
    lay(0.7, () => { const r = rng(9740); for (let i = 0; i < 5; i++) { const ph = (t * 0.3 + i / 5) % 1; ell(-200 + i * 300 + ph * 100, 1900 - ph * 300, 200, 90, { wash: '#8a8480', washA: 0.25 * (1 - ph), line: false }); } });
  };
  DIR.nyen = {
    outfit: 'preobr', light: { side: 1, rim: '#fff0d0' }, grade: ['#a0b070', 0.08],
    act: () => [[S0.nyen, 'proud'], [EV.ny_take, 'grin'], [EV.ny_two, 'awe'], [EV.ny_fort, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1470, s: 1.04, look: [0.4, -0.3], hand: t > EV.ny_fort ? [90, -390] : undefined }),
    cam: () => [[S0.nyen, 560, 900, 0.12], [EV.ny_take, 540, 940, 0.06], [EV.ny_two, 600, 960, 0.06], [EV.ny_fort, 620, 940, 0.1], [S1.nyen, 620, 960, 0.12]],
    hud: t => { if (t > EV.ny_two - 0.1) { const n = Math.min(14, 1 + Math.floor((t - EV.ny_two + 0.1) / 0.06)); push(860, 560, 0.9, 0.05); for (let q = 0; q < 3; q++) rect(-70 + q * 3, -80 - q * 3, 140, 160, { wash: '#f6f0e2', washA: 1, w: 1.6, col: '#4a3a1a' });
        rect(-70, -80, 140, 34, { wash: '#c8302a', washA: 1, w: 1.4, col: '#3a0a0a' }); txt('МАЙ 1703', 0, -62, 22, { font: 'Osw', col: '#fff6e0' }); txt(String(n), 0, 14, 80, { font: 'Osw', col: '#1a1410' }); txt('день', 0, 62, 24, { font: 'Osw', col: '#6a5a4a' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В nyen: пушечный выстрел в камеру, дымовое кольцо
  TRANS_IN.nyen = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.4); else drawBuf(B, 1.1 - 0.1 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); if (k > 0.35 && k < 0.6) { glow(540, 960, 900, 'rgba(255,220,150,1)', 0.9 * (1 - Math.abs(k - 0.47) * 8)); }
      const R = 100 + sm(k) * 1400; for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283; ell(540 + Math.cos(a) * R, 960 + Math.sin(a) * R, 220, 160, { wash: '#7a7470', washA: 0.85 * f, line: false }); }
      ctx.save(); ctx.globalAlpha = 0.5 * f; ctx.fillStyle = '#6a6460'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
