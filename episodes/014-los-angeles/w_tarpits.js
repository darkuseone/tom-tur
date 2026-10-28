/* 014 — сцена `tarpits`: ледниковый период, будущий центр Л.-А. Степь с дубами, вдали тот же хребет с горой Ли (без надписи),
   асфальтовые ямы с глянцевой плёнкой и пузырями; мамонт увяз по колено и трубит, саблезубая кошка на краю шипит, над ямой —
   стервятники. На «мамонты» мамонт рвётся, на «коллеги» кошка разевает пасть с клыками (Том смущён «родством»), на «тонут» мамонт
   проседает в асфальт. Том — в шубе. Переход В сцену — пузырь битума раздувается на весь кадр и лопается. */
(() => {
  EV.tp_mam = wtk('s1', 'мамонты');
  EV.tp_col = wtk('s1', 'коллеги');
  EV.tp_sink = wtk('s1', 'тонут');
  KEYW.push('мамонты', 'коллеги', 'тонут');

  function sky(t) { vgrad(-900, 1000, ['#7aa0c8', '#c8d8e0', '#e8e0c8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 170 + i * 80 + Math.sin(k) * 10, 76, 26, { wash: '#f4f4f0', washA: 0.85, line: false }); }
    for (let i = 0; i < 3; i++) { const a = t * 0.6 + i * 2.1, x = 760 + Math.cos(a) * 200, y = 560 + Math.sin(a) * 60; pencil([[x - 34, y - 10], [x, y], [x + 34, y - 10]], { w: 4, col: '#2a2420', pass2: false }); } }
  function land(t) {                                                   // степь, дубы, ямы
    const g = shape([[-600, 1500], [-600, 960], [1700, 940], [1700, 1500]], { wash: '#b8a868', washA: 1, w: 2, col: '#6a5a2a' }); hatch(g.path, g.bb, { gap: 10, a: 0.16, col: '#7a6a3a', ang: -0.4, w: 1.2 });
    for (const [x, s] of [[-360, 1], [-140, 0.8], [1200, 1.1], [1420, 0.9]]) { pencil([[x, 990], [x, 990 - 120 * s]], { w: 14 * s, col: '#4a3420' }); for (let q = 0; q < 5; q++) ell(x - 60 * s + q * 30 * s, 990 - 140 * s - (q % 2) * 30 * s, 60 * s, 44 * s, { wash: '#4a6a32', washA: 1, w: 2, col: '#22341a' }); }
    tarPit(560, 1180, 420, 90, t, { seed: 14210 }); tarPit(-200, 1080, 200, 40, t, { seed: 14211 }); tarPit(1200, 1100, 240, 46, t, { seed: 14212 });
    const sink = t < EV.tp_sink ? 0.25 : 0.25 + 0.55 * sm((t - EV.tp_sink) / 1.4), jerk = t > EV.tp_mam && t < EV.tp_sink ? Math.sin(t * 14) * 8 : 0;
    mammoth(560 + jerk, 1190, 0.72, t, { sink, flip: -1 });
    smilodon(1000, 1250, 0.75, t, { flip: -1, roar: t > EV.tp_col ? 1 : 0 });
    for (let i = 0; i < 2; i++) { const x = 1300 + i * 70, y = 1000; blob([[x - 20, y], [x - 24, y - 50], [x, y - 66], [x + 22, y - 50], [x + 18, y]], { wash: '#2a2220', washA: 1, w: 1.6, col: '#000' }); ell(x + 4, y - 74, 9, 9, { wash: '#c8806a', washA: 1, w: 1, col: '#3a1a10' }); }
  }

  WORLD.tarpits = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => ridge(t, { col: '#a8a070', colD: '#6a6a3a' }));
    lay(4, () => land(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89058', washA: 1, w: 2, col: '#4a3a1a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a4a24', ang: 0.1, w: 1.2 }); tarPit(900, 1560, 260, 40, t, { seed: 14213 }); cat(); });
    lay(0.7, () => motes(20, [-100, 600, 1200, 1700], '#f2ead6', t, 14220, { sp: -6, sz: 3, a: 0.35, wob: 20 }));
  };
  DIR.tarpits = {
    outfit: 'fur', light: { side: 1, rim: '#fff4e0' }, grade: ['#b0a070', 0.08],
    act: () => [[S0.tarpits, 'shock'], [EV.tp_mam, 'awe'], [EV.tp_col, 'proud'], [EV.tp_sink, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.tp_col && t < EV.tp_sink ? 1 : undefined, hand: t > EV.tp_col && t < EV.tp_sink ? [220, -260] : [120, -270] }),
    cam: () => [[S0.tarpits, 560, 1080, 0.06], [EV.tp_mam, 600, 1120, 0.1], [EV.tp_col, 700, 1140, 0.12], [EV.tp_sink, 580, 1140, 0.1], [S1.tarpits, 580, 1140, 0.12]],
    hud: t => { if (t > EV.tp_sink) { const k = popK(t, EV.tp_sink, 0.35); push(600, 740, k, -0.03); rect(-230, -60, 460, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('РАНЧО ЛА-БРЕЯ', 0, -10, 40, { font: 'Osw', col: '#2a1a10' }); txt('сегодня — в центре города', 0, 34, 24, { col: '#5a4a3a' }); pop(); } }
  };
  TRANS_IN.tarpits = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // пузырь битума раздувается и лопается
    const q = sm(clamp(k / 0.6)), pop2 = sm(clamp((k - 0.6) / 0.4)); drawBuf(k < 0.6 ? A : B, k < 0.6 ? 1 : 1.08 - 0.08 * pop2);
    scr(() => { if (k < 0.6) { const R = 60 + q * 1300; ell(540, 1100, R, R * 0.9, { wash: '#141012', washA: 0.95, w: 6, col: '#000' }); glow(540 - R * 0.3, 1100 - R * 0.35, R * 0.35, 'rgba(180,190,220,1)', 0.3); }
      else { const r = rng(14230); for (let i = 0; i < 40; i++) { const a = r() * 6.28, d = 200 + pop2 * 1400 * r(); ell(540 + Math.cos(a) * d, 1100 + Math.sin(a) * d, 30 * (1 - pop2) + 4, 24 * (1 - pop2) + 3, { wash: '#141012', washA: 1 - pop2, line: false }); } } });
  } };
})();
