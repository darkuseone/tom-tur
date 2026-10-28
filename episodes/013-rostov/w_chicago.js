/* 013 — сцена `chicago`: 1890-е, порт на Дону. На берегу — краснокирпичные склады Парамонова с арками, трубы, мачты;
   у причала баржи с мешками зерна, грузчики носят мешки по сходням; по мосту-эстакаде идёт паровоз с вагонами; купцы в
   цилиндрах и картузах торгуются. На «зерно» мешки сыплются по жёлобу золотым потоком, на «порт» — гудок, дым парохода,
   на «железная» въезжает паровоз, на «Чикаго» — афиша «РУССКИЙ ЧИКАГО» и стрелка роста. Том — сюртук и цилиндр.
   Переход В сцену — поток зерна засыпает кадр сверху и уходит вниз. */
(() => {
  EV.ch_grain = wtk('s4', 'зерно,');
  EV.ch_port = wtk('s4', 'порт,');
  EV.ch_rail = wtk('s4', 'железная');
  EV.ch_chi = wtk('s4', 'Чикаго');
  KEYW.push('зерно,', 'порт,', 'Чикаго');

  function sky(t) { vgrad(-900, 1000, ['#7aa0c0', '#c8d4d8', '#f2e2c4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 170 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#f6f0e4', washA: 0.85, line: false }); }
    for (let k = 0; k < 4; k++) { const ph = (t * 0.2 + k / 4) % 1; ell(-200 + k * 120 + ph * 160, 640 - ph * 300, 40 + ph * 80, 30 + ph * 60, { wash: '#6a6a6e', washA: 0.4 * (1 - ph), line: false }); } }
  function town(t) {                                                   // склады Парамонова, трубы, собор вдали
    cathedral(1220, 880, 0.42, t);
    for (const [x, w, h] of [[-520, 300, 260], [-200, 340, 300], [180, 300, 250]]) warehouse(x, 980, w, h, t, { label: x === -200 ? 'ПАРАМОНОВЪ' : '' });
    for (const cx of [-420, 40]) { rect(cx - 20, 600, 40, 380, { wash: RS.brickD, washA: 1, w: 2, col: '#1a0a04' }); }
    pencil([[480, 940], [1700, 940]], { w: 6, col: '#3a3a3a', pass2: false }); for (let x = 500; x < 1700; x += 80) pencil([[x, 940], [x, 1000]], { w: 5, col: '#5a4a3a', pass2: false });
    if (t > EV.ch_rail - 0.6) { const lx = 1800 - (t - EV.ch_rail + 0.6) * 420; loco(lx, 940, 0.42, t, { flip: -1 }); for (let q = 1; q < 5; q++) { rect(lx + 60 + q * 150 - 70, 870, 140, 60, { wash: ['#6a3a2a', '#3a5a3a', '#6a5a3a', '#3a3a5a'][q - 1], washA: 1, w: 2, col: '#1a0a04' }); for (const wx of [-40, 40]) ell(lx + 60 + q * 150 + wx, 936, 14, 14, { wash: '#2a2a2e', washA: 1, w: 1.4, col: '#000' }); } }
  }
  function port(t) {                                                   // Дон, баржи, парусник, грузчики, жёлоб с зерном
    don(1000, t, { h: 240 });
    ship(1180, 1150, 0.5, t, 2, { flag: '#f2ece0' }); barge(300, 1170, 0.7, t, 0); barge(-300, 1190, 0.6, t, 1, { mast: false });
    if (t > EV.ch_port) { const k = (t - EV.ch_port); for (let q = 0; q < 4; q++) { const ph = (k * 0.8 + q / 4) % 1; ell(1180 + ph * 80, 900 - ph * 200, 30 + ph * 60, 24 + ph * 40, { wash: '#e8e4dc', washA: 0.7 * (1 - ph), line: false }); } }
    pencil([[560, 980], [700, 1120]], { w: 18, col: '#7a5430' }); if (t > EV.ch_grain) { const r = rng(13510); for (let i = 0; i < 40; i++) { const ph = (t * 1.6 + r()) % 1; ell(lerp(560, 700, ph) + (r() - 0.5) * 12, lerp(970, 1110, ph) - 10, 5, 4, { wash: RS.gold, washA: 1, w: 1, col: RS.goldD }); } glow(700, 1120, 70, 'rgba(255,220,120,1)', 0.4); }
  }
  function quay(t) {                                                   // причал: мешки, грузчики, купцы
    rect(-500, 1300, 2100, 60, { wash: '#8a6438', washA: 1, w: 2.4, col: '#2a1408' }); for (let x = -480; x < 1600; x += 70) pencil([[x, 1300], [x, 1360]], { w: 2, col: '#5a3a1a', a: 0.6, pass2: false });
    for (let q = 0; q < 8; q++) { const sx = 640 + (q % 4) * 60, sy = 1300 - Math.floor(q / 4) * 44; blob([[sx - 28, sy], [sx - 32, sy - 34], [sx, sy - 46], [sx + 32, sy - 34], [sx + 28, sy]], { wash: '#e8d4a0', washA: 1, w: 1.6, col: '#6a5428' }); }
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.3 + i / 3) % 1), x = lerp(-200, 520, ph); human(x, 1320, 0.48, t, { body: '#e8e0d0', legs: '#4a3a2a', hair: '#3a2210', hat: 'cap', hatCol: '#3a2a1a', face: 'calm', armR: 'up', armL: 'up', seed: 13520 + i }); blob([[x - 30, 1150], [x - 34, 1120], [x, 1110], [x + 34, 1120], [x + 30, 1150]], { wash: '#e8d4a0', washA: 1, w: 1.6, col: '#6a5428' }); }
    for (let i = 0; i < 2; i++) human(940 + i * 140, 1330, 0.52, t, { body: i ? '#2a2a32' : '#4a3a2a', legs: '#2a2a2e', hair: '#2a1a10', beard: 'long', hat: 'merchant', hatCol: '#141414', face: t > EV.ch_chi ? 'smile' : 'calm', armR: i ? 'point' : 'hold', armL: 'hold', long: true, seed: 13530 + i, flip: i ? -1 : 1 });
  }

  WORLD.chicago = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => town(t));
    lay(5, () => port(t));
    lay(2.5, () => quay(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89070', washA: 1, w: 2, col: '#3a2a14', a: 0.4 }); for (let x = -480; x < 1600; x += 80) for (let y = 1470; y < 2400; y += 50) ell(x + (Math.floor(y / 50) % 2) * 40, y, 36, 20, { wash: '#9a8262', washA: 0.6, w: 1, col: '#4a3a24', a: 0.4 }); cat(); });
    lay(0.7, () => motes(30, [-100, 400, 1200, 1700], '#ffe8a0', t, 13540, { sp: -14, sz: 3, a: 0.45, wob: 20 }));
  };
  DIR.chicago = {
    outfit: 'victorian', light: { side: -1, rim: '#fff0d0' }, grade: ['#c0a070', 0.1],
    act: () => [[S0.chicago, 'proud'], [EV.ch_port, 'grin'], [EV.ch_chi - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.0, look: [0.6, -0.3], hand: t > EV.ch_chi ? [120, -330] : [120, -270], point: t > EV.ch_grain && t < EV.ch_rail ? 1 : undefined }),
    cam: () => [[S0.chicago, 560, 1060, 0.06], [EV.ch_grain, 600, 1100, 0.1], [EV.ch_rail, 640, 1000, 0.06], [EV.ch_chi, 580, 1040, 0.06], [S1.chicago, 580, 1040, 0.1]],
    hud: t => { if (t > EV.ch_chi) { const k = popK(t, EV.ch_chi, 0.35); push(620, 760, k, 0.04); rect(-240, -110, 480, 220, { wash: '#efe0b8', washA: 0.98, w: 4, col: '#5a3a1a' }); rect(-224, -94, 448, 188, { wash: null, w: 2, col: '#a8201e' });
        txt('РУССКИЙ', 0, -36, 52, { font: 'Osw', col: '#2a1a10' }); txt('ЧИКАГО', 0, 34, 64, { font: 'Osw', col: '#a8201e' }); pencil([[150, 80], [200, 20], [210, -60]], { w: 6, col: '#3a7a3a', pass2: false }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В chicago: поток зерна засыпает кадр и уходит вниз
  TRANS_IN.chicago = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), y0 = lerp(-H, H, sm(k)); const g = ctx.createLinearGradient(0, y0, 0, y0 + H); g.addColorStop(0, 'rgba(226,184,74,0)'); g.addColorStop(0.2, 'rgba(226,184,74,0.95)'); g.addColorStop(0.8, 'rgba(200,150,50,0.95)'); g.addColorStop(1, 'rgba(226,184,74,0)'); ctx.fillStyle = g; ctx.fillRect(0, y0, W, H);
      const r = rng(13550); for (let i = 0; i < 160; i++) { const x = r() * W, y = y0 + r() * H; ell(x, y, 8, 5, { wash: '#f0cc6a', washA: f, w: 1, col: '#8a6418', a: f }); } });
  } };
})();
