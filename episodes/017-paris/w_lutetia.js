/* 017 — сцена `lutetia`: 52 г. до н. э., остров на Сене (будущий Сите): хижины паризиев за частоколом, лодки-долблёнки,
   рыбаки; на левом берегу высаживаются римские легионеры со щитами (без орлов/символов — только красные щиты). Справа за
   рекой — луг Гренель, где проступает призрак башни «здесь будет». На «римляне» легионеры маршируют, на «Лютецию» —
   табличка LUTETIA PARISIORUM, на «Париж» буквы «PARISII» перетекают в «PARIS». Том — римская туника. Переход — брызги Сены. */
(() => {
  EV.lu_rom = wtk('s1', 'римляне');
  EV.lu_lut = wtk('s1', 'Лютецию.');
  EV.lu_par = wtk('s1', 'Париж');
  KEYW.push('Лютецию.', 'Париж');

  function sky(t) { vgrad(-900, 1000, ['#6a9ad0', '#b8d4e8', '#f2e8d0'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function far(t) { const g = shape([[-600, 980], [-600, 860], [1700, 840], [1700, 980]], { wash: '#8aa86a', washA: 1, w: 2, col: '#3a5a2a' }); ctx.save(); ctx.globalAlpha = 0.25; eiffel(1200, 960, 0.38, t, { ghost: 1 }); ctx.restore(); txt('здесь будет…', 1200, 990, 22, { font: 'Osw', col: '#2a3a1a', a: 0.6 });
    for (const x of [-400, -200, 900, 1100, 1400]) { pencil([[x, 900], [x, 840]], { w: 8, col: '#4a3420' }); ell(x, 820, 50, 40, { wash: '#4a7a3a', washA: 1, w: 1.6, col: '#1a3a1a' }); } }
  function island(t) {
    seine(980, t, { h: 260, quay: false, col: '#6a9ab0' });
    blob([[60, 1100], [180, 1040], [700, 1030], [980, 1080], [900, 1140], [200, 1150]], { wash: '#9ab070', washA: 1, w: 2.4, col: '#3a5a2a' });
    for (let q = 0; q < 26; q++) pencil([[180 + q * 28, 1080], [180 + q * 28, 1030]], { w: 5, col: '#6a4424', pass2: false });
    for (const [x, s] of [[300, 0.6], [470, 0.7], [640, 0.6], [790, 0.55]]) hutGaul(x, 1060, s, t);
    for (let k = 0; k < 2; k++) { const bx = 100 + k * 900 + Math.sin(t + k) * 20; push(bx, 1190, 0.5); shape([[-120, 0], [120, 0], [100, 24], [-100, 24]], { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' }); human(0, 0, 0.8, t, { body: '#7a6a3a', legs: '#5a4a2a', hair: '#c8903a', beard: 'long', face: 'calm', armR: 'hold', armL: 'hold', seed: 17210 + k }); pop(); }
  }
  function legion(t) {                                                 // легионеры: красные щиты, шлемы, марш
    const go = t > EV.lu_rom ? (t - EV.lu_rom) * 60 : 0;
    for (let i = 0; i < 5; i++) { const x = -260 + i * 120 + go, y = 1330 + (i % 2) * 14; human(x, y, 0.5, t, { body: '#a8302a', legs: '#c8a878', hair: '#3a2210', hat: 'helmet', hatCol: '#c8963a', face: 'angry', armR: 'hold', armL: 'hold', prop: 'spear', seed: 17220 + i }); rect(x + 10, y - 150, 50, 90, { wash: '#a8201e', washA: 1, w: 2, col: '#5a0a08' }); ell(x + 35, y - 105, 8, 8, { wash: PA.gold, washA: 1, w: 1, col: '#6a4a08' }); }
  }

  WORLD.lutetia = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(14, () => far(t));
    lay(5, () => island(t));
    lay(2.5, () => legion(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a8a070', washA: 1, w: 2, col: '#4a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a5a2a', ang: 0.1, w: 1.2 }); cat(); });
  };
  DIR.lutetia = {
    outfit: 'roman', light: { side: 1, rim: '#fff0c8' }, grade: ['#b0a878', 0.08],
    act: () => [[S0.lutetia, 'proud'], [EV.lu_rom, 'grin'], [EV.lu_lut, 'awe'], [EV.lu_par, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.3], point: t > EV.lu_lut ? 1 : undefined, hand: t > EV.lu_lut ? [220, -330] : [120, -270] }),
    cam: () => [[S0.lutetia, 560, 1080, 0.06], [EV.lu_rom, 520, 1140, 0.1], [EV.lu_lut, 560, 1060, 0.06], [EV.lu_par, 580, 1060, 0.08], [S1.lutetia, 580, 1060, 0.1]],
    hud: t => { if (t > EV.lu_lut) { const k = popK(t, EV.lu_lut, 0.35), m = t > EV.lu_par ? sm((t - EV.lu_par) / 0.6) : 0; push(620, 760, k, -0.03); rect(-230, -70, 460, 140, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#5a4a2a' }); txt('LUTETIA', 0, -16, 40, { font: 'Osw', col: '#5a1a10' });
        txt('PARISII', 0, 36, 34, { font: 'Osw', col: '#2a1a10', a: 1 - m }); txt('→ PARIS', 0, 36, 40, { font: 'Osw', col: '#a8201e', a: m }); pop(); } }
  };
  TRANS_IN.lutetia = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // брызги Сены смывают кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(17230); for (let i = 0; i < 70; i++) { const x = r() * W, y = H - sm(k) * (H + 600) * (0.5 + r() * 0.8) + 400; ell(x, y, 30 + r() * 60, 40 + r() * 80, { wash: i % 3 ? '#8ac0e0' : '#f2faff', washA: 0.85 * f, line: false }); } });
  } };
})();
