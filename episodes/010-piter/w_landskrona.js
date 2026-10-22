/* 010 — сцена `landskrona`: 1300, мыс при впадении Охты в Неву. Шведы достраивают деревянную Ландскрону (леса, плотники, флаги),
   вокруг болото, сосны и берёзы, дальний берег в дымке. На «Новгородцы» по Неве подходят ладьи с алыми парусами и стягами,
   на «сносят» крепость горит. Том в кольчуге с новгородцами на переднем берегу. Переход В сцену — туман с залива наползает и тает. */
(() => {
  EV.ld_build = wtk('s1', 'ставят');
  EV.ld_nov = wtk('s1', 'Новгородцы');
  EV.ld_burn = wtk('s1', 'сносят');
  KEYW.push('Ландскрону.', 'год.');
  SHAKES.push([EV.ld_burn + 0.1, 0.3, 7]);
  const burn = t => sm((t - EV.ld_burn) / 0.6);
  const boats = t => sm((t - EV.ld_nov + 0.4) / 1.0);

  function sky(t) { const b = burn(t); vgrad(-900, 1000, [lerpC('#7aa0c8', '#5a4a5a', b), lerpC('#c0d4e0', '#c88a6a', b), lerpC('#eae4d8', '#f0b080', b)], 1);
    for (let i = 0; i < 4; i++) { const x = ((i * 440 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 50, 120 + i * 80 + Math.sin(k) * 10, 66, 26, { wash: '#f6f2ea', washA: 0.8, line: false }); } }
  function farShore(t) {                                               // дальний берег: лес, болотистые острова дельты
    sil([[-400, 820], [-200, 760], [0, 790], [200, 750], [420, 780], [640, 740], [880, 770], [1100, 740], [1480, 780], [1480, 900], [-400, 900]], '#5a7a6a', 0.9);
    const r = rng(9700); for (let i = 0; i < 70; i++) { const x = -350 + r() * 1800, y = 760 + r() * 60, h = 30 + r() * 50; poly([[x - 10, y], [x + 10, y], [x, y - h]], { wash: r() < 0.5 ? '#2f4a34' : '#3a5a3a', washA: 1, line: false }); }
  }
  function river(t) { neva(880, 1260, t, { top: '#6a8aa0', bot: '#3a5a6a' }); for (let k = 0; k < 10; k++) { const x = -200 + k * 160, y = 1240 + (k % 3) * 10; for (let q = -2; q <= 2; q++) pencil([[x + q * 6, y], [x + q * 8 + Math.sin(t * 2 + k) * 3, y - 40 - Math.abs(q) * 6]], { w: 3, col: '#6a8a3a', pass2: false }); } }
  function fort(t) {                                                   // Ландскрона на мысу + леса, плотники, лодки шведов
    const g = shape([[200, 900], [300, 860], [900, 850], [1100, 900]], { wash: '#6a7a4a', washA: 1, w: 2, col: '#1a2a10', a: 0.6 });
    swedeFort(650, 880, 0.62, t, { burn: burn(t) });
    if (t < EV.ld_burn) { for (const x of [430, 470, 510]) pencil([[x, 880], [x, 640]], { w: 4, col: '#8a6a3a', pass2: false }); for (const y of [700, 770, 830]) pencil([[420, y], [520, y]], { w: 4, col: '#8a6a3a', pass2: false });
      for (let k = 0; k < 3; k++) human(380 + k * 120, 900, 0.32, t, { body: '#2a5aa8', legs: '#3a3020', hat: 'helmet', armR: Math.sin(t * 8 + k) > 0 ? 'up' : 'hold', seed: 300 + k }); }
    else for (let k = 0; k < 4; k++) { const ph = clamp((t - EV.ld_burn) * 0.8 + k * 0.1); human(500 + k * 60 - ph * 300, 900, 0.32, t, { body: '#2a5aa8', legs: '#3a3020', hat: 'helmet', face: 'shock', armR: 'up', armL: 'up', seed: 310 + k, flip: -1 }); }
  }
  function lodya(x, y, s, t, k) {                                      // новгородская ладья: алый парус, щиты по борту, стяг
    push(x, y, s); const r = Math.sin(t * 1.6 + k) * 0.03; ctx.rotate(r);
    shape(spline([[-220, -40], [-160, 10], [160, 10], [230, -50], [250, -110], [210, -60], [-190, -60], [-240, -120]], true, 6), { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#1a0a04' });
    for (let q = 0; q < 8; q++) ell(-160 + q * 46, -36, 18, 18, { wash: q % 2 ? '#c8302a' : '#e8d8a8', washA: 1, w: 1.4, col: '#2a1a0a' });
    pencil([[0, -60], [0, -330]], { w: 7, col: '#3a2412' }); const sl = blob([[-90, -310], [90, -310], [100, -120], [0, -100], [-100, -120]], { wash: '#c8302a', washA: 1, w: 2, col: '#3a0a0a' }); hatch(sl.path, sl.bb, { gap: 10, a: 0.2, col: '#5a0a0a', ang: 1.57, w: 1.4 });
    for (let q = 0; q < 4; q++) { const hx = -130 + q * 80; ell(hx, -82, 12, 14, { wash: '#e2b48e', washA: 1, w: 1.2, col: '#1a0a04' }); blob([[hx - 13, -90], [hx, -112], [hx + 13, -90]], { wash: '#9aa0a6', washA: 1, w: 1.2, col: '#1a0a04' }); pencil([[hx + 10, -80], [hx + 16 + Math.sin(t * 3 + q) * 4, -60]], { w: 3, col: '#6a4424', pass2: false }); }
    pencil([[200, -110], [200, -240]], { w: 4, col: '#3a2412' }); const wv = Math.sin(t * 5 + k) * 6; shape([[200, -240], [270, -236 + wv], [262, -200 + wv], [200, -205]], { wash: '#c8302a', washA: 1, w: 1.4, col: '#3a0a0a' }); ell(232, -220 + wv * 0.5, 9, 9, { wash: '#d6a842', washA: 1, line: false });
    pop();
  }

  WORLD.landskrona = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => farShore(t));
    lay(6, () => { river(t); fort(t); });
    lay(3.5, () => { const k = boats(t); if (k > 0) { lodya(lerp(1500, 960, k), 1120, 0.7, t, 1); lodya(lerp(1700, 1260, k), 1180, 0.6, t, 2); lodya(lerp(-500, 120, k), 1150, 0.65, t, 3); } });
    lay(1, () => { const g = shape([[-400, 1400], [1480, 1430], [1480, 2400], [-400, 2400]], { wash: '#6a7a4a', washA: 1, w: 2, col: '#1a2a10', a: 0.5 }); hatch(g.path, g.bb, { gap: 9, a: 0.15, col: '#2a3a1a', ang: 0.2, w: 1.2 });
      const r = rng(9710); for (let i = 0; i < 40; i++) { const x = -200 + r() * 1500, y = 1420 + r() * 400; for (let q = -1; q <= 1; q++) pencil([[x + q * 6, y], [x + q * 9 + Math.sin(t * 2 + i) * 4, y - 26]], { w: 2.4, col: '#4a6a2a', pass2: false }); }
      for (const [x, fl] of [[780, -1], [930, -1]]) human(x, 1450, 0.92, t, { body: '#8a9094', legs: '#5a3a28', hat: 'helmet', beard: 'short', hair: '#6a4a2a', face: t > EV.ld_nov ? 'angry' : 'calm', armR: t > EV.ld_burn ? 'up' : 'hold', prop: 'spear', seed: 320 + x, flip: fl });
      cat(); });
    lay(0.7, () => { pine(-460, 2200, 1100, t, 31, { leaf: '#24402a' }); if (t > EV.ld_burn) motes(30, [-200, 0, 1300, 1900], '#ffb060', t, 9720, { sp: -60, sz: 3, a: 0.7, add: 1, wob: 20 }); });
  };
  DIR.landskrona = {
    outfit: 'kolchuga', light: { side: 1, rim: '#ffe0b0' }, grade: ['#c08a5a', 0.1],
    act: () => [[S0.landskrona, 'sideeye'], [EV.ld_build, 'suspicious'], [EV.ld_nov, 'grin'], [EV.ld_burn, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1470, s: 1.06, look: [0.6, -0.2], point: t > EV.ld_build && t < EV.ld_burn ? 1 : undefined, hand: t > EV.ld_build && t < EV.ld_burn ? [170, -330] : t > EV.ld_burn ? [90, -400] : undefined }),
    cam: () => [[S0.landskrona, 600, 880, 0.14], [EV.ld_build, 600, 920, 0.06], [EV.ld_nov, 640, 960, 0.04], [EV.ld_burn, 620, 940, 0.08], [S1.landskrona, 600, 960, 0.12]],
    hud: t => { if (t > EV.ld_burn) note('1301 — разрушена', 700, 520, t, EV.ld_burn + 0.1, S1.landskrona, '#fff2d8', 50, -0.03); }
  };

  // ---------------------------------------------------------------- переход В landskrona: туман с залива наползает и тает
  TRANS_IN.landskrona = { a: 0.25, b: 0.4, fx(k, t, A, B) {
    if (k < 0.45) drawBuf(A); else drawBuf(B, 1.1 - 0.1 * sm((k - 0.45) / 0.55));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(9730); ctx.save(); ctx.globalAlpha = 0.6 * f; ctx.fillStyle = '#eef0f2'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 26; i++) { const sx = r() < 0.5 ? -300 : W + 300, x = lerp(sx, r() * W, sm(clamp(k * 1.6))), y = r() * H; ell(x, y, 260 + r() * 200, 120 + r() * 80, { wash: '#f6f8fa', washA: 0.8 * f, line: false }); } });
  } };
})();
