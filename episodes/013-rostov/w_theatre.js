/* 013 — сцена `theatre`: 1935, Театральная площадь. Пустырь-межа: слева край Ростова (купеческие дома), справа край Нахичевани
   (низкие армянские дома, купол церкви). Посередине достраивают театр-«трактор»: леса, рабочие, прожекторы; к «трактора» здание
   готово, перед ним проезжает настоящий гусеничный трактор, сыплются листовки. На «городами» — пунктир межи и бирки «РОСТОВ» / «НАХИЧЕВАНЬ»;
   на «трактора» — газета «КАМЕННЫЙ ТРАКТОР». Том — в сером советском костюме с газетой. Переход В сцену — обломки руин летят
   назад и собираются в здание (перемотка взрыва). */
(() => {
  EV.th_two = wtk('s2', 'городами');
  EV.th_build = wtk('s2', 'строят');
  EV.th_trac = wtk('s2', 'трактора.');
  KEYW.push('городами', 'трактора.');
  const bld = t => 0.55 + 0.45 * sm((t - S0.theatre) / (EV.th_trac - S0.theatre + 0.2));

  function sky(t) { vgrad(-900, 1000, ['#5a9ad0', '#a8d0e8', '#f4ead4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 150 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#f8f6f0', washA: 0.85, line: false }); }
    for (let i = 0; i < 2; i++) { const x = ((t * 80 + i * 900) % 2000) - 400; push(x, 360 + i * 60, 0.5); ell(0, 0, 90, 22, { wash: '#c8c4bc', washA: 1, w: 2, col: '#2a2a2a' }); txt('СССР', 0, 6, 18, { font: 'Osw', col: '#2a2a2a' }); pop(); } }
  function edges(t) {                                                  // края двух городов
    for (let k = 0; k < 4; k++) { const x = -480 + k * 170; rect(x, 1080 - 230 - k * 10, 150, 230 + k * 10, { wash: ['#e8d0a8', '#d8b890', '#f0dcb8', '#c8a880'][k], washA: 1, w: 2, col: '#3a2a1a' }); for (let j = 0; j < 3; j++) for (let q = 0; q < 2; q++) rect(x + 24 + q * 60, 1080 - 200 - k * 10 + j * 64, 34, 44, { wash: '#3a4a5a', washA: 1, w: 1.2, col: '#1a1a1a' }); }
    for (let k = 0; k < 4; k++) { const x = 1060 + k * 160; rect(x, 1080 - 130, 140, 130, { wash: ['#e2d2b4', '#d8c8a4', '#ead8b8', '#cfbf9c'][k], washA: 1, w: 2, col: '#4a3a24' }); poly([[x - 10, 950], [x + 150, 950], [x + 70, 900]], { wash: '#8a5a3a', washA: 1, w: 2, col: '#3a2412' }); rect(x + 50, 1000, 40, 80, { wash: '#4a2e1a', washA: 1, w: 1.6, col: '#1a0a04' }); }
    armChurch(1420, 1080, 0.42, t);
  }
  function square(t) {                                                 // площадь: театр, леса, рабочие, трактор
    theatre(690, 1130, 0.7, t, { build: bld(t) });
    if (bld(t) < 1) for (let i = 0; i < 4; i++) { const x = 220 + i * 230, y = 1120 - 80 - (i % 2) * 120; human(x, y, 0.34, t, { body: '#4a5a7a', legs: '#2a2a3a', hair: '#3a2210', hat: 'cap', hatCol: '#2a2a2a', face: 'calm', armR: Math.sin(t * 6 + i) > 0 ? 'up' : 'hold', armL: 'hold', seed: 13310 + i }); }
    const tx = t < EV.th_trac ? -600 : -600 + (t - EV.th_trac) * 520; tractor(tx, 1290, 0.6, t, { v: 1.4 });
    for (let i = 0; i < 6; i++) human(-200 + i * 300 + Math.sin(t + i) * 10, 1300, 0.42, t, { body: ['#e8e4dc', '#3a4a6a', '#c8302a', '#4a5a3a', '#e8d8b0', '#2a2a32'][i], legs: '#2a2a3a', hair: '#3a2210', hat: i % 3 === 0 ? 'cap' : i % 3 === 1 ? 'scarf' : undefined, hatCol: i % 2 ? '#c8302a' : '#2a2a2a', face: t > EV.th_trac ? 'smile' : 'calm', armR: t > EV.th_trac && i % 2 ? 'up' : 'hold', armL: 'hold', seed: 13320 + i, flip: i % 2 ? 1 : -1 });
    if (t > EV.th_two - 0.2) { const k = sm((t - EV.th_two + 0.2) / 0.5); for (let y = 920; y < 1460; y += 40) pencil([[560 + Math.sin(y) * 4, y], [560 + Math.sin(y) * 4, y + 22]], { w: 5, col: '#c8302a', a: 0.8 * k * (t < EV.th_trac + 0.3 ? 1 : 0.35), pass2: false }); }
  }
  function leaflets(t) { if (t < EV.th_trac) return; const r = rng(13330); for (let i = 0; i < 26; i++) { const x = r() * 1300 - 100, y = -100 + ((t - EV.th_trac) * (180 + r() * 120) + r() * 300) % 1700, a = t * 3 + i; push(x + Math.sin(a) * 40, y, 1, a * 0.6); rect(-14, -10, 28, 20, { wash: ['#f2ece0', '#ffd24a', '#e8b0a0'][i % 3], washA: 1, w: 1, col: '#5a4a3a' }); pop(); } }

  WORLD.theatre = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => edges(t));
    lay(4, () => { const g = rect(-500, 1120, 2100, 200, { wash: '#c8b898', washA: 1, w: 2, col: '#4a3a24' }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a3a', ang: 0.1, w: 1.2 }); square(t); });
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#b8a888', washA: 1, w: 2, col: '#3a2a14', a: 0.4 }); for (let x = -480; x < 1600; x += 90) pencil([[x, 1480], [x - 60, 2400]], { w: 1.4, col: '#7a6a4a', a: 0.4, pass2: false }); cat(); });
    lay(0.7, () => leaflets(t));
  };
  DIR.theatre = {
    outfit: 'soviet', light: { side: 1, rim: '#fff4e0' }, grade: ['#c0a880', 0.08],
    act: () => [[S0.theatre, 'awe'], [EV.th_two, 'suspicious'], [EV.th_trac - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.6, -0.4], point: t > EV.th_trac ? 1 : undefined, hand: t > EV.th_trac ? [200, -300] : [120, -270] }),
    cam: () => [[S0.theatre, 560, 1020, 0.04], [EV.th_two, 560, 1040, 0.02], [EV.th_trac, 580, 1080, 0.08], [S1.theatre, 600, 1100, 0.12]],
    hud: t => {
      if (t > EV.th_two && t < EV.th_trac + 0.2) { const k = popK(t, EV.th_two, 0.35); for (const [x, s, rot] of [[250, 'РОСТОВ', -0.05], [830, 'НАХИЧЕВАНЬ', 0.05]]) { push(x, 860, k, rot); rect(-150, -40, 300, 80, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt(s, 0, 12, 36, { font: 'Osw', col: '#5a1a10' }); pop(); } push(540, 960, k); txt('← межа →', 0, 0, 30, { font: 'Osw', col: '#c8302a' }); pop(); }
      if (t > EV.th_trac) { const k = popK(t, EV.th_trac, 0.35); push(600, 720, k, -0.05); rect(-260, -120, 520, 240, { wash: '#efe6d0', washA: 0.98, w: 3, col: '#3a3020' }); txt('ГАЗЕТА · 1935', 0, -86, 24, { font: 'Osw', col: '#5a4a3a' }); txt('«КАМЕННЫЙ ТРАКТОР»', 0, -30, 40, { font: 'Osw', col: '#a8201e' });
        txt('со стеклянными гусеницами', 0, 22, 26, { col: '#2a1a10' }); for (let q = 0; q < 3; q++) pencil([[-220, 56 + q * 18], [220, 56 + q * 18]], { w: 2, col: '#8a7a6a', a: 0.6, pass2: false }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В theatre: обломки летят назад и собираются (перемотка взрыва)
  TRANS_IN.theatre = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 + k * 0.2 : 1.08 - 0.08 * sm((k - 0.5) / 0.5));
    scr(() => { const r = rng(13340), q = sm(k), f = Math.sin(clamp(k) * Math.PI); ctx.save(); ctx.globalAlpha = 0.5 * f; ctx.fillStyle = '#2a2420'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 60; i++) { const ex = r() * W, ey = r() * H, gx = 300 + (i % 10) * 50, gy = 800 + Math.floor(i / 10) * 40, x = lerp(ex, gx, q), y = lerp(ey, gy, q); push(x, y, 1, (1 - q) * (r() * 6)); rect(-30, -16, 60, 32, { wash: i % 3 ? '#a89e8c' : '#ece6da', washA: f, w: 2, col: '#3a3630' }); pop(); }
      for (const dx of [0, 70]) poly([[560 + dx, 900], [480 + dx, 960], [560 + dx, 1020]], { wash: '#ffd24a', washA: f, w: 3, col: '#6a4a08', a: f }); });
  } };
})();
