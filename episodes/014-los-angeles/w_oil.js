/* 014 — сцена `oil`: 1892–1900-е, жилой квартал Л.-А., утыканный деревянными нефтяными вышками: между домиками, во дворах,
   над огородами; качалки, бочки, трубы, нефтяники в чёрных пятнах; хребет вдали. На «нефть» из ближней вышки бьёт фонтан
   нефти (нефтяники пляшут), на «дворах» вышки вырастают из-за заборов, на «четверть» — HUD-круг «≈ ¼ мировой добычи».
   Том — литейщик в кожаном фартуке (весь в нефти). Переход В сцену — чёрный фонтан нефти заливает кадр сверху. */
(() => {
  EV.oi_oil = wtk('s3', 'нефть!');
  EV.oi_yard = wtk('s3', 'дворах');
  EV.oi_q = wtk('s3', 'четверть');
  KEYW.push('нефть!', 'дворах', 'четверть');

  function sky(t) { vgrad(-900, 1000, ['#8aa8c0', '#c8d0d0', '#ece0c4'], 1); for (let k = 0; k < 5; k++) { const ph = (t * 0.2 + k / 5) % 1; ell(-200 + k * 380 + ph * 60, 760 - ph * 300, 50 + ph * 80, 36 + ph * 60, { wash: '#6a6466', washA: 0.4 * (1 - ph), line: false }); } }
  function field(t) {                                                  // домики, заборы, вышки
    const g = shape([[-600, 1500], [-600, 1020], [1700, 1000], [1700, 1500]], { wash: '#a8946a', washA: 1, w: 2, col: '#5a4a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#6a5a3a', ang: -0.3, w: 1.1 });
    for (let k = 0; k < 14; k++) { const x = -560 + k * 170, h = 260 + ((k * 53) % 120); derrick(x, 1040, h * 0.8, t); }
    for (let k = 0; k < 6; k++) { const x = -480 + k * 380; rect(x, 1180 - 120, 180, 120, { wash: ['#f2e6d0', '#e8d0b0', '#d8dcc8'][k % 3], washA: 1, w: 2, col: '#3a2a1a' }); poly([[x - 14, 1060], [x + 194, 1060], [x + 90, 1000]], { wash: '#8a4a2a', washA: 1, w: 2, col: '#3a1a0a' }); rect(x + 70, 1110, 40, 70, { wash: '#5a3a1e', washA: 1, w: 1.6, col: '#1a0a04' }); rect(x + 20, 1090, 34, 30, { wash: '#4a5a6a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
    const up = t > EV.oi_yard ? sm((t - EV.oi_yard) / 0.6) : 0; for (let k = 0; k < 5; k++) { const x = -330 + k * 380; derrick(x, 1200, 380 * up, t); } for (let x = -560; x < 1700; x += 40) pencil([[x, 1220], [x, 1180]], { w: 6, col: '#8a6a42', pass2: false }); pencil([[-560, 1196], [1700, 1196]], { w: 4, col: '#6a4a2a', pass2: false });
    derrick(860, 1300, 520, t, { gush: t > EV.oi_oil ? sm((t - EV.oi_oil) / 0.5) : 0 });
    for (let q = 0; q < 4; q++) { push(1080 + q * 70, 1330, 0.5); rect(-40, -100, 80, 100, { wash: '#3a2a1a', washA: 1, w: 2, col: '#0a0604' }); for (const yy of [-80, -20]) pencil([[-40, yy], [40, yy]], { w: 4, col: '#6a6a6e', pass2: false }); pop(); }
    for (let i = 0; i < 3; i++) { const x = 640 + i * 130, jump = t > EV.oi_oil ? Math.abs(Math.sin(t * 8 + i)) * 26 : 0; human(x, 1340 - jump, 0.5, t, { body: '#3a3028', legs: '#2a2420', hair: '#2a1a10', hat: 'cap', hatCol: '#1a1410', face: t > EV.oi_oil ? 'smile' : 'calm', armR: t > EV.oi_oil ? 'up' : 'hold', armL: t > EV.oi_oil ? 'up' : 'hold', seed: 14410 + i }); }
  }

  WORLD.oil = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => ridge(t, { col: '#b0a070', colD: '#706438' }));
    lay(4, () => field(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#9a8460', washA: 1, w: 2, col: '#4a3a1a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a4a2a', ang: 0.1, w: 1.2 }); for (let i = 0; i < 5; i++) ell(700 + i * 150, 1560 + (i % 2) * 40, 70, 16, { wash: '#141012', washA: 0.85, line: false }); cat(); });
    lay(0.7, () => { if (t > EV.oi_oil) { const r = rng(14420); for (let i = 0; i < 26; i++) { const x = 400 + r() * 1000, y = 200 + ((t - EV.oi_oil) * (500 + r() * 300) + r() * 900) % 1600; ell(x, y, 6, 10, { wash: '#141012', washA: 0.8, line: false }); } } });
  };
  DIR.oil = {
    outfit: 'founder', light: { side: 1, rim: '#fff0d0' }, grade: ['#a89070', 0.1],
    act: () => [[S0.oil, 'talk'], [EV.oi_oil - 0.03, 'shock'], [EV.oi_yard, 'grin'], [EV.oi_q, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.6, -0.5], point: t > EV.oi_yard && t < EV.oi_q ? 1 : undefined, hand: t > EV.oi_oil && t < EV.oi_yard ? [90, -420] : t > EV.oi_yard && t < EV.oi_q ? [210, -300] : [120, -270] }),
    cam: () => [[S0.oil, 600, 1100, 0.08], [EV.oi_oil, 660, 1000, 0.04], [EV.oi_yard, 560, 1060, 0.02], [EV.oi_q, 580, 1080, 0.06], [S1.oil, 580, 1080, 0.1]],
    hud: t => { if (t > EV.oi_q) { const k = popK(t, EV.oi_q, 0.35); push(640, 760, k, 0.03); ell(-150, 0, 70, 70, { wash: '#e8e4dc', washA: 1, w: 3, col: '#2a2a2a' }); ctx.save(); ctx.beginPath(); ctx.moveTo(-150, 0); ctx.arc(-150, 0, 70, -Math.PI / 2, 0); ctx.closePath(); ctx.fillStyle = '#141012'; ctx.fill(); ctx.restore();
        rect(-60, -60, 300, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#2a2a2a' }); txt('≈ ¼ НЕФТИ МИРА', 90, -10, 34, { font: 'Osw', col: '#2a1a10' }); txt('Южная Калифорния, 1923', 90, 32, 20, { col: '#5a4a3a' }); pop(); } }
  };
  TRANS_IN.oil = { a: 0.3, b: 0.45, fx(k, t, A, B) {                 // фонтан нефти заливает кадр сверху и стекает
    const q = sm(k), y = lerp(-200, H + 400, q); drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = '#141012'; ctx.beginPath(); ctx.moveTo(0, y - 1400); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, y + Math.sin(x / 70 + t * 4) * 50 + ((x * 37) % 160)); ctx.lineTo(W, y - 1400); ctx.closePath(); ctx.fill(); ctx.restore(); glow(300, y - 300, 200, 'rgba(160,170,200,1)', 0.2 * f); });
  } };
})();
