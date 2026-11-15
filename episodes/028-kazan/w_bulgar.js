/* 028 — сцена `bulgar`: ≈1000 год, утро над слиянием Волги и Казанки. На холме — деревянная крепость булгар (частокол, башня),
   внизу торг: караван верблюдов, ладья с полосатым парусом у берега, тюки меха, весы, серебряные дирхемы. Главный свет — утреннее
   солнце справа. Том-купец (bashkir) с собольей шкуркой: на «раскопкам» под ногами проступает разрез земли с подписью «СЛОЙ ≈ X–XI ВВ.»,
   на «Багдада» слева выезжает караван со стрелкой «← БАГДАД», на «Скандинавии» справа ладья «СКАНДИНАВИЯ →». Переход В — пар раскручивается. */
(() => {
  EV.bg_1000 = wtk('s1', 'Тысячу');
  EV.bg_dig = wtk('s1', 'раскопкам,');
  EV.bg_fort = wtk('s1', 'крепость');
  EV.bg_fur = wtk('s1', 'Мех');
  EV.bg_bagh = wtk('s1', 'Багдада');
  EV.bg_scan = wtk('s1', 'Скандинавии.');
  KEYW.push('раскопкам,', 'булгар.', 'Скандинавии.');
  const L = KZ.ink, SUN = [920, 760];
  function sky(t) { vgrad(-900, 1200, ['#5a8ac8', '#a8c8e0', '#f0e0b8', '#fff0d0'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,240,200,1)', 0.4); ell(SUN[0], SUN[1], 56, 56, { wash: '#fff8e0', washA: 1, line: false }); rays(SUN[0], SUN[1], Math.PI * 0.85, 1.4, 1400, 'rgba(255,240,200,1)', 0.1, 8, t);
    for (let i = 0; i < 6; i++) { const r = rng(3740 + i), x = ((r() * 1300 + t * 30) % 1400) - 150, y = 480 + r() * 240; push(x, y, 0.6); pencil([[-20, -6 + Math.sin(t * 8 + i) * 6], [0, 0], [20, -6 + Math.sin(t * 8 + i) * 6]], { w: 3, col: '#2a2a30', pass2: false }); pop(); } }
  function hill(t) { hills(1000, 70, '#7a9a6a', 3741); blob([[-200, 1000], [100, 930], [600, 910], [900, 940], [1200, 1000]], { wash: '#8aa874', washA: 1, w: 2, col: L }); woodFort(420, 950, 0.7, t); for (let i = 0; i < 6; i++) { const x = 160 + i * 90; push(x, 960 - Math.abs(i - 3) * 6, 0.45); rect(-40, -60, 80, 60, { wash: '#9a6a3a', washA: 1, w: 1.4, col: L }); poly([[-50, -60], [0, -100], [50, -60]], { wash: '#6a4424', washA: 1, w: 1.4, col: L }); pop(); }
    for (let i = 0; i < 4; i++) { const ph = (t * 0.2 + i * 0.25) % 1; ell(400 + i * 40, 760 - ph * 200, 20 + ph * 30, 14 + ph * 20, { wash: '#e8e4dc', washA: 0.5 * (1 - ph), line: false }); }
    depthFog('#e8e8d8', 0.08); }
  function river(t) { volga(1000, 1300, t, 3742);
    const sc = t > EV.bg_scan - 0.4 ? sm(clamp((t - EV.bg_scan + 0.4) / 0.8)) : 0; push(lerp(1500, 940, sc), 1160, 0.6); const hb = shape([[-260, -20], [240, -20], [300, -100], [270, 0], [220, 40], [-200, 40], [-280, 0], [-300, -90]], { wash: '#7a4a24', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 8; k++) ell(-200 + k * 56, -24, 20, 20, { wash: k % 2 ? KZ.pom : '#e8c050', washA: 1, w: 1.4, col: L });
    pencil([[0, -20], [0, -320]], { w: 6, col: '#4a2a12', pass2: false }); shape([[-130, -300], [130, -300], [140, -100], [-140, -100]], { wash: '#f0e4c8', washA: 1, w: 2, col: L }); for (let k = 0; k < 4; k++) rect(-130 + k * 70, -300, 35, 200, { wash: KZ.pom, washA: 1, line: false }); pop();
    if (sc > 0.6) { const q = popK(t, EV.bg_scan + 0.1, 0.3); push(900, 960, q); rect(-180, -36, 360, 72, { wash: '#14100a', washA: 0.9, w: 2.4, col: KZ.goldL }); txt('СКАНДИНАВИЯ →', 0, 2, 38, { col: KZ.goldL, font: 'Osw' }); pop(); } }
  function market(t) {                                               // торг на берегу: караван, тюки, весы, торговцы
    blob([[-500, 1300], [0, 1270], [600, 1280], [1100, 1260], [1600, 1300], [1600, 1500], [-500, 1500]], { wash: '#c8a868', washA: 1, w: 2, col: L });
    const bg = t > EV.bg_bagh - 0.4 ? sm(clamp((t - EV.bg_bagh + 0.4) / 0.8)) : 0; for (let k = 0; k < 3; k++) camel(lerp(-500, 720, bg) - k * 210, 1300, 0.55, t, k); if (bg > 0.6) { const q = popK(t, EV.bg_bagh + 0.1, 0.3); push(220, 960, q); rect(-160, -36, 320, 72, { wash: '#14100a', washA: 0.9, w: 2.4, col: KZ.goldL }); txt('← БАГДАД', 0, 2, 40, { col: KZ.goldL, font: 'Osw' }); pop(); }
    furs(560, 1290, 0.9); furs(680, 1300, 0.8);
    const P = [[400, '#3a5a8a', 'fur', 'hold'], [800, '#8a3a2a', 'fur', 'wave'], [1060, '#5a4a6a', 'helmet', 'spear'], [1180, '#6a5a3a', 'fur', 'hold'], [-120, '#c8a070', 'turban', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1300, 0.55, t, { body: c, hat: h, hatCol: '#5a3a1a', legs: '#4a3a2a', beard: i % 2 ? 'long' : 'short', hair: '#3a2a1a', armR: a === 'spear' ? 'hold' : a, prop: a === 'spear' ? 'spear' : undefined, flip: x > 600 ? -1 : 1, seed: 3750 + i, face: 'calm' }));
  }
  function ground(t) {                                               // берег под Томом: песок, весы с дирхемами, бочонок мёда, разрез-«раскоп»
    rect(-500, 1420, 2100, 900, { wash: '#b89868', washA: 1, w: 2, col: L }); for (let i = 0; i < 30; i++) { const r = rng(3760 + i); ell(-300 + r() * 1600, 1450 + r() * 500, 12 + r() * 20, 4 + r() * 6, { wash: r() < 0.5 ? '#a88858' : '#c8a878', washA: 1, line: false }); }
    lightPool(SUN[0] - 300, 1640, 640, 140, 'rgba(255,240,200,1)', 0.45);
    if (t > EV.bg_dig - 0.1) { const q = sm(clamp((t - EV.bg_dig + 0.1) / 0.5)); push(820, 1520, 0.55); ctx.save(); ctx.beginPath(); ctx.rect(-500, -60, 1000 * q, 300); ctx.clip();
      for (const [y, h, c] of [[-40, 50, '#6a4a2a'], [10, 60, '#8a6a3a'], [70, 70, '#4a3a2a'], [140, 80, '#7a5a3a']]) rect(-500, y, 1000, h, { wash: c, washA: 1, w: 1.4, col: L }); pencil([[-480, 40], [480, 40]], { w: 4, col: KZ.goldL, pass2: false }); ctx.restore();
      if (q > 0.6) { rect(-210, 150, 420, 60, { wash: '#14100a', washA: 0.9, w: 2, col: KZ.goldL }); txt('СЛОЙ ≈ X–XI ВВ.', 0, 182, 32, { col: KZ.goldL, font: 'Osw' }); } pop(); }
    push(960, 1640, 1); pencil([[0, 0], [0, -180]], { w: 5, col: KZ.goldD, pass2: false }); pencil([[-90, -180], [90, -180]], { w: 4, col: KZ.goldD, pass2: false }); for (const k of [-90, 90]) ell(k, -110, 36, 9, { wash: KZ.gold, washA: 1, w: 1.4, col: KZ.goldD }); for (let q = 0; q < 6; q++) ell(-96 + q * 6, -118, 10, 4, { wash: '#d8d8dc', washA: 1, w: 0.8, col: '#6a6a72' }); pop();
    push(1140, 1680, 1); ell(0, -50, 46, 56, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#3a2a1a', pass2: false }); pop();
    castShadow(330, 1612, 120, 520, -0.2, 0.4); moodDark(SUN[0], 1100, 900, 1700, '#1a2030', 0.3);
  }
  function front(t) { for (let i = 0; i < 12; i++) { const x = -60 + i * 110; sil([[x - 24, 2200], [x - 6, 1860 - (i % 3) * 60], [x + 8, 1870], [x + 24, 2200]], '#3a4a1e', 1); } push(1150, 300, 1.4, 0.5); for (let i = 0; i < 10; i++) { const r = rng(3770 + i); push(-r() * 380, r() * 220, 1, r() * 2); blob([[0, 0], [50, -10], [100, 0], [50, 10]], { wash: '#3a5a2a', washA: 1, line: false }); pop(); } pop(); }
  WORLD.bulgar = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => hill(t)); lay(7, () => river(t)); lay(3, () => { market(t); depthFog('#f0e8d0', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(24, [-100, 800, 1200, 1500], '#fff8e0', t, 3775, { sp: 5, sz: 2.2, a: 0.45, wob: 18, add: 1 }));
  };
  DIR.bulgar = {
    outfit: 'bashkir', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8b890', 0.06],
    act: () => [[S0.bulgar, 'talk'], [EV.bg_dig, 'suspicious'], [EV.bg_fort, 'proud'], [EV.bg_fur, 'smug'], [EV.bg_bagh, 'awe'], [EV.bg_scan, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.bg_bagh && t < EV.bg_scan ? [-0.8, -0.3] : t > EV.bg_scan ? [0.9, -0.4] : t > EV.bg_dig && t < EV.bg_fort ? [0.3, 0.6] : [0.6, -0.5], hand: t > EV.bg_fur - 0.1 ? [170, -430] : [180, -300], handF: t > EV.bg_fort - 0.1 && t < EV.bg_fur ? [200, -520] : undefined, tailUp: t > EV.bg_fur }),
    afterCat: (t, u, P) => { if (t < EV.bg_fur - 0.1) return; const q = popK(t, EV.bg_fur - 0.1, 0.3), x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x + 20, y + 40, q, 0.3); blob([[-20, -60], [20, -60], [36, 40], [20, 120], [-20, 120], [-36, 40]], { wash: '#5a3a1e', washA: 1, w: 2, col: L, shade: { gap: 4, a: 0.3, col: '#2a1a0a', ang: 1.4 } }); pencil(spline([[0, 120], [10, 170], [-6, 210]], false, 6), { w: 10, col: '#4a2e14', pass2: false }); pop(); },
    cam: () => [[S0.bulgar, 600, 980, 0.0], [EV.bg_dig, 620, 1100, 0.08, 'x'], [EV.bg_fort, 560, 900, 0.0], [EV.bg_bagh, 440, 1000, 0.04, 'x'], [EV.bg_scan, 720, 1000, 0.04, 'x'], [S1.bulgar, 700, 1000, 0.06]]
  };
  TRANS_IN.bulgar = { a: 0, b: 0.4, fx(k, t, A, B) {                 // пар раскручивается и тает — за ним утро тысячного года
    const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.fillStyle = '#f6f4ee'; ctx.fillRect(0, 0, W, H); ctx.restore(); for (let i = 0; i < 6; i++) { const pts = []; for (let q = 0; q <= 20; q++) { const rr = q * (40 + e * 60), aa = i / 6 * 6.283 + q * 0.3 + e * 4; pts.push([540 + Math.cos(aa) * rr, 960 + Math.sin(aa) * rr]); } pencil(pts, { w: 120 * (1 - e), col: '#f6f4ee', a: 1 - e, pass2: false, gap: false }); } });
  } };
})();
