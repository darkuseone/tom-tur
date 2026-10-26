/* 018 — сцена `siege`: зима 1773–1774. Заснеженный холм с крепостью и дымами, на льду Белой — лагерь восставших: костры,
   палатки-юрты, конные башкиры с луками, пушка; на «осаждают» — стрелы и дым; на «башкир-поэт» к костру выезжает юный
   всадник с курайом — тёплый свет (подсказка к ответу). Том — башкирский кафтан и папаха. Переход — метель. */
(() => {
  EV.si_siege = wtk('s2', 'осаждают');
  EV.si_poet = wtk('s2', 'башкир-поэт.');
  KEYW.push('зиму', 'восставшие.', 'башкир-поэт.');
  SHAKES.push([EV.si_siege + 0.2, 0.3, 6]);

  function sky(t) { vgrad(-900, 1000, ['#5a6480', '#9aa4b8', '#d8dce4'], 1); }
  function camp(t) {
    hillUfa(800, 1060, 0.7, t, { snow: true });
    stockade(800, 1060 - 0.7 * 330, 0.45, t, { church: true });
    for (let q = 0; q < 4; q++) { const ph = (t * 0.3 + q / 4) % 1; ell(700 + q * 80 + ph * 40, 720 - ph * 300, 30 + ph * 60, 24 + ph * 40, { wash: '#5a5a62', washA: 0.5 * (1 - ph), line: false }); }
    belaya(1060, t, { h: 140, ice: true });
    for (let k = 0; k < 3; k++) { const x = -300 + k * 300; poly([[x - 90, 1240], [x + 90, 1240], [x + 60, 1170], [x, 1140], [x - 60, 1170]], { wash: '#d8c8a8', washA: 1, w: 2, col: '#5a4a3a' }); rect(x - 20, 1190, 40, 50, { wash: '#3a2a1a', washA: 1, w: 1.4, col: '#000' }); }
    for (const fx of [-160, 300]) { for (let q = 0; q < 6; q++) { const ph = (t * 2 + q / 6) % 1; ell(fx + Math.sin(t * 7 + q) * 8, 1250 - ph * 80, 16 * (1 - ph) + 4, 24 * (1 - ph) + 6, { wash: q % 2 ? '#f0a030' : '#e85a2a', washA: 0.9 * (1 - ph), line: false }); } glow(fx, 1240, 120, 'rgba(255,160,60,1)', 0.6); }
    if (t > EV.si_siege) { const r = rng(18310 + Math.floor(t * 3)); for (let i = 0; i < 6; i++) { const ph = (t * 1.5 + i / 6) % 1; const x0 = 200 + i * 60, y0 = 1200; const x = lerp(x0, 700, ph), y = lerp(y0, 860, ph) - Math.sin(ph * Math.PI) * 120; pencil([[x, y], [x - 24, y + 10]], { w: 2.4, col: '#2a1a10', pass2: false }); } }
    for (let i = 0; i < 2; i++) rider(-260 + i * 340 + Math.sin(t + i) * 20, 1340, 0.42, t, { run: true, body: ['#5a3a2a', '#3a4a5a'][i], hat: 'fur', hatCol: '#3a2a1a', prop: 'spear', seed: 18320 + i });
    if (t > EV.si_poet - 0.3) { const k = sm((t - EV.si_poet + 0.3) / 0.8); const x = lerp(1300, 1000, k); rider(x, 1400, 0.5, t, { body: '#2a4a6a', hat: 'fur', hatCol: '#5a3a1a', face: 'smile', armR: 'hold', seed: 18330, flip: -1 }); kurai(x - 30, 1400 - 0.5 * 230 - 60, 0.5, -0.4); glow(x, 1200, 200, 'rgba(255,210,140,1)', 0.35 * k); }
  }

  WORLD.siege = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => camp(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#eef2f4', washA: 1, w: 2, col: '#9aa8b0', a: 0.4 }); hatch(g.path, g.bb, { gap: 14, a: 0.08, col: '#9aa8b0', ang: 0.1, w: 1 }); cat(); });
    lay(0.7, () => motes(90, [-200, -200, 1300, 2000], '#ffffff', t, 18340, { sp: 140, vx: -60, sz: 3.5, a: 0.75, wob: 20 }));
  };
  DIR.siege = {
    outfit: 'bashkir', light: { side: 1, rim: '#ffd0a0' }, grade: ['#8a94a8', 0.12],
    act: () => [[S0.siege, 'cold'], [EV.si_siege, 'shock'], [EV.si_poet - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: t < EV.si_poet ? [0.6, -0.3] : [0.8, 0.0], point: t > EV.si_poet ? 1 : undefined, hand: t > EV.si_poet ? [220, -280] : [120, -270] }),
    cam: () => [[S0.siege, 560, 1060, 0.04], [EV.si_siege, 600, 1020, 0.06], [EV.si_poet, 760, 1180, 0.12], [S1.siege, 760, 1180, 0.14]],
    hud: t => { if (t > EV.si_siege && t < EV.si_poet) { const k = popK(t, EV.si_siege, 0.35); push(600, 760, k, 0.03); rect(-210, -56, 420, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ОСАДА УФЫ', 0, -8, 40, { font: 'Osw', col: '#a8201e' }); txt('зима 1773–1774', 0, 34, 26, { col: '#2a1a10' }); pop(); }
      if (t > EV.si_poet) { const k = popK(t, EV.si_poet, 0.35); push(620, 760, k, -0.03); rect(-180, -50, 360, 100, { wash: '#2a1a10', washA: 0.92, w: 3, col: '#000' }); txt('ПОЭТ С КУРАЕМ', 0, 10, 36, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.siege = { a: 0.3, b: 0.45, fx(k, t, A, B) {               // метель заметает кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); ctx.save(); ctx.globalAlpha = 0.7 * f; ctx.fillStyle = '#f2f6fa'; ctx.fillRect(0, 0, W, H); ctx.restore(); const r = rng(18350); for (let i = 0; i < 200; i++) { const x = (r() * W - k * 900 + W) % W, y = (r() * H + k * 600) % H; pencil([[x, y], [x + 30, y + 10]], { w: 3, col: '#ffffff', a: f, pass2: false }); } });
  } };
})();
