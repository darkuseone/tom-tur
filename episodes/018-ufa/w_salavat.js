/* 018 — сцена `salavat` (ОТВЕТ НА ХУК): 1967, тот же высокий холм над Белой (сквозная нить). Краны опускают статую — конный
   Салават встаёт на постамент, толпа, оркестр, флажки. На «Салават» статуя «вырастает», на «десять» — шкала «9,8 м» рядом с
   ростом человека. Вторая реплика (ответ): поверх кадра — свиток-портрет «Салават Юлаев: поэт · соратник Пугачёва · каторга
   в Рогервике, 1800» и в финале герб-силуэт «символ Башкирии». Том — худи «УФА». Переход В сцену — бронзовая пыль-искры. */
(() => {
  EV.sa_name = wtk('s7', 'Салават');
  EV.sa_10 = wtk('s7', 'десять');
  EV.sa_poet = wtk('a1', 'поэт');
  EV.sa_kat = wtk('a1', 'каторге,');
  EV.sa_sym = wtk('a1', 'символом');
  KEYW.push('Салават', 'десять', 'поэт', 'каторге,', 'символом');
  const rise = t => sm((t - S0.salavat + 0.2) / (EV.sa_10 - S0.salavat + 0.2));

  function sky(t) { vgrad(-900, 1000, ['#4a8ad0', '#a8d0ea', '#f6ead0'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function scene(t) {
    belaya(1240, t, { h: 200 });
    hillUfa(620, 1240, 0.8, t);
    salavatStatue(660, 1150, 0.62, t, { rise: rise(t) });
    if (rise(t) < 1) for (const cx of [260, 860]) { pencil([[cx, 1180 - 330], [cx, 380]], { w: 8, col: '#e8b830' }); pencil([[cx - 60, 400], [560, 420]], { w: 6, col: '#e8b830', pass2: false }); pencil([[560, 420], [560, 1180 - 330 - 450 * rise(t)]], { w: 2, col: '#3a3a3a', pass2: false }); }
    for (let i = 0; i < 6; i++) { const x = -260 + i * 120 + (i > 2 ? 700 : 0), y = 1390; human(x, y, 0.42, t, { body: ['#2a4a6a', '#e8e4dc', '#7a3a2a', '#2a2a32', '#3a6a4a', '#c8a040'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i % 2 ? 'cap' : 'scarf', hatCol: i % 2 ? '#2a2a2a' : '#c8302a', face: 'smile', armR: t > EV.sa_name ? 'up' : 'hold', armL: 'hold', long: i % 2 === 0, seed: 18810 + i }); }
  }

  WORLD.salavat = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => scene(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#9aa870', washA: 1, w: 2, col: '#4a5a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a6a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { if (rise(t) < 1) motes(30, [300, 500, 900, 1100], '#e8c88a', t, 18820, { sp: -30, sz: 4, a: 0.5, wob: 20 }); });
  };
  DIR.salavat = {
    outfit: 'hoodieUFA', light: { side: 1, rim: '#fff0c8' }, grade: ['#b0a070', 0.06],
    act: () => [[S0.salavat, 'awe'], [EV.sa_name, 'proud'], [EV.sa_poet, 'talk'], [EV.sa_kat, 'neutral'], [EV.sa_sym, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 260, y: 1480, s: 1.0, look: t < LS('a1') ? [0.5, -0.8] : [0.6, -0.1], point: t > EV.sa_name && t < LS('a1') ? 1 : undefined, hand: t > EV.sa_name && t < LS('a1') ? [180, -440] : t > EV.sa_sym ? [100, -420] : [120, -270] }),
    cam: () => [[S0.salavat, 580, 900, 0.0], [EV.sa_name, 600, 860, 0.0], [EV.sa_10, 600, 880, 0.02], [LS('a1'), 600, 980, 0.04], [S1.salavat, 600, 1000, 0.06]],
    hud: t => {
      if (t > EV.sa_10 && t < LS('a1')) { const k = popK(t, EV.sa_10, 0.35); push(860, 1000, k, 0.03); rect(-110, -60, 220, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('9,8 м', 0, -6, 48, { font: 'Osw', col: '#a8201e' }); txt('40 тонн', 0, 38, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.sa_poet) { const k = popK(t, EV.sa_poet, 0.4); push(600, 820, k, -0.02); rect(-280, -140, 560, 280, { wash: '#efe6d0', washA: 0.98, w: 3, col: '#5a3a1a' }); txt('САЛАВАТ ЮЛАЕВ', 0, -96, 40, { font: 'Osw', col: '#2a1a10' });
        txt('поэт · соратник Пугачёва', 0, -44, 28, { col: '#2a1a10', a: 1 }); if (t > EV.sa_kat) txt('каторга, Рогервик · 1800', 0, 4, 28, { col: '#a8201e', a: popK(t, EV.sa_kat, 0.3) });
        if (t > EV.sa_sym) { const q = popK(t, EV.sa_sym, 0.3); push(0, 80, q); rect(-200, -34, 400, 68, { wash: UF.green, washA: 1, w: 2, col: '#0a2a1a' }); txt('СИМВОЛ БАШКИРИИ', 0, 12, 34, { font: 'Osw', col: '#ffd24a' }); pop(); } pop(); }
    }
  };
  TRANS_IN.salavat = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // бронзовая пыль-искры раскрывают кадр
    drawBuf(A); const R = Math.pow(sm(k), 1.2) * 1500 + 1; inCircle(540, 900, R, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(18830); for (let i = 0; i < 90; i++) { const a = r() * 6.28, d = R + r() * 200; ell(540 + Math.cos(a) * d, 900 + Math.sin(a) * d, 5, 5, { wash: '#e8c88a', washA: f, w: 0, col: '#000' }); } });
  } };
})();
