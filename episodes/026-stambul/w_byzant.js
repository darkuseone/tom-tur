/* 026 — сцена `byzant`: VII в. до н. э., рассвет над Босфором. Европейский мыс: греки-мегарцы строят каменную стену и деревянные дома,
   кран-журавль поднимает блок, с вытащенной на берег пентеконтеры выгружают амфоры, козы, оливы. Через пролив — азиатский берег
   с хижинами Халкедона, из-за него встаёт солнце (главный свет справа: дорожка на воде, лучи, тени влево). В проливе дельфины.
   Том (greekC) с амфорой: на «напротив» показывает на Азию, на «слепыми» над Халкедоном рисуются очки «СЛЕПЫЕ?»,
   на «получше» топает по своему мысу — земля вспыхивает золотом, табличка «ЛУЧШЕЕ МЕСТО». Переход В сцену — белый вихрь раскручивается. */
(() => {
  EV.bz_first = wtk('s1', 'Сначала');
  EV.bz_greek = wtk('s1', 'греков.');
  EV.bz_across = wtk('s1', 'напротив');
  EV.bz_blind = wtk('s1', 'слепыми:');
  EV.bz_better = wtk('s1', 'получше.');
  KEYW.push('Византий', 'слепыми:', 'получше.');
  SHAKES.push([EV.bz_better, 0.25, 8]);
  const L = IS.ink, SUN = [880, 900];
  function sky(t) {
    vgrad(-900, 1200, ['#2a3a6a', '#6a6a9a', '#e89a8a', '#ffd6a0', '#fff0c8'], 1);
    glow(SUN[0], SUN[1], 300, 'rgba(255,214,150,1)', 0.4); ell(SUN[0], SUN[1], 80, 80, { wash: '#fff6d8', washA: 1, line: false });
    rays(SUN[0], SUN[1], Math.PI * 0.9, 1.6, 1400, 'rgba(255,230,180,1)', 0.12, 9, t);
    for (let i = 0; i < 4; i++) { const r = rng(2630 + i), y = 380 + i * 110; blob([[-300 + r() * 200, y], [300 + r() * 300, y - 26], [900 + r() * 200, y - 6], [1400, y + 12], [400, y + 24]], { wash: '#f8c8b0', washA: 0.4, line: false }); }
    gulls(5, -100, 1180, 500, 760, t, 2631, 0.45, 26);
  }
  function asia(t) {                                                 // азиатский берег: холмы, хижины Халкедона, крошечные люди; очки «слепые»
    hills(960, 70, '#8a7a9a', 2632); hills(990, 40, '#7a6a8a', 2633);
    for (let i = 0; i < 9; i++) { const x = 560 + i * 70, y = 980 - (i % 3) * 14; rect(x - 22, y - 34, 44, 34, { wash: '#b8a088', washA: 1, w: 1.4, col: '#4a3a3a' }); poly([[x - 28, y - 32], [x, y - 54], [x + 28, y - 32]], { wash: '#a86a4a', washA: 1, w: 1.2, col: '#4a3a3a' }); }
    for (let i = 0; i < 6; i++) { const x = 600 + i * 90 + Math.sin(t + i) * 6; pencil([[x, 990], [x, 970]], { w: 3, col: '#3a2a3a', pass2: false }); ell(x, 964, 4, 4, { wash: '#3a2a3a', washA: 1, line: false }); }
    if (t > EV.bz_blind - 0.05) { const q = popK(t, EV.bz_blind - 0.05, 0.35), fd = clamp((S1.byzant - t) / 0.3); push(800, 900, q, -0.05); ctx.save(); ctx.globalAlpha = fd;
      for (const k of [-1, 1]) { ell(k * 90, 0, 70, 56, { wash: '#1a1a20', washA: 0.85, w: 6, col: '#1a1a20' }); pencil([[k * 150, -6], [k * 210, -30]], { w: 6, col: '#1a1a20', pass2: false }); } pencil([[-22, -8], [22, -8]], { w: 6, col: '#1a1a20', pass2: false });
      rect(-150, -170, 300, 80, { wash: '#1a1a20', washA: 0.85, line: false }); txt('СЛЕПЫЕ?', 0, -128, 60, { col: IS.goldL, font: 'Osw' }); ctx.restore(); pop(); }
    depthFog('#f0c0a8', 0.08);
  }
  function strait(t) {                                               // Босфор: дорожка солнца, корабль, лодки, дельфины
    vgrad(990, 1340, ['#f0b890', '#6a8ab0', '#2a4a7a'], 1);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 2634)); for (let i = 0; i < 60; i++) { const y = 1000 + r() * 320, w = 20 + r() * 70; ctx.fillStyle = `rgba(255,220,160,${0.4 * r()})`; ctx.fillRect(SUN[0] - 120 + r() * 240 - (y - 1000) * 0.35 - w / 2, y, w, 3); } ctx.restore();
    galley(420 + (t * 14) % 120, 1150, 0.42, t, { sail: '#e8d0a0', trim: IS.cob, flag: IS.cob });
    for (let i = 0; i < 2; i++) { const ph = ((t - S0.byzant) * 0.7 + i * 0.5) % 1, x = 160 + i * 280 + ph * 160, y = 1240 - Math.sin(ph * Math.PI) * 90;
      if (ph < 0.95) { push(x, y, 0.8, -Math.cos(ph * Math.PI) * 0.9); blob([[-50, 0], [-20, -16], [30, -12], [56, 2], [30, 10], [-30, 10]], { wash: '#5a6a80', washA: 1, w: 2, col: L }); poly([[-4, -14], [6, -34], [14, -12]], { wash: '#5a6a80', washA: 1, w: 1.4, col: L }); poly([[-50, 0], [-70, -16], [-66, 14]], { wash: '#5a6a80', washA: 1, w: 1.4, col: L }); pop(); } }
    boatF(980, 1280, 0.5, t, 2635, '#8a5a3a');
  }
  function goat(x, y, s, t, seed = 1, col = '#e8e0d0') {
    push(x, y, s, 0, seed % 2 ? 1 : -1); const g = Math.sin(t * 3 + seed) * 4; for (const k of [-30, -14, 14, 30]) pencil([[k, -24], [k + 2, 0]], { w: 4, col: '#3a2a1a', pass2: false });
    ell(0, -40, 46, 24, { wash: col, washA: 1, w: 2, col: L }); blob([[36, -50], [64, -78 + g], [80, -62 + g], [60, -40]], { wash: col, washA: 1, w: 1.8, col: L });
    pencil(spline([[62, -76 + g], [52, -100 + g], [40, -96 + g]], false, 6), { w: 4, col: '#6a5a3a', pass2: false }); pencil([[78, -60 + g], [80, -46 + g]], { w: 3, col: '#8a8070', pass2: false }); pop();
  }
  function build(t) {                                                // средний план: стена, кран-журавль, дома, люди
    sil([[-500, 1300], [-500, 1172], [-100, 1150], [380, 1160], [640, 1200], [700, 1300]], '#9a8a5a', 1);
    for (let i = 0; i < 6; i++) { const x = -260 + i * 110, h = 120 + (i % 3) * 30; for (let j = 0; j < 4; j++) rect(x + (j % 2) * 30, 1180 - (j + 1) * h / 4, 110, h / 4, { wash: j % 2 ? '#cbb68e' : '#bba47a', washA: 1, w: 1.4, col: '#5a4a2a' }); }
    for (let i = 0; i < 4; i++) { const x = -140 + i * 150; rect(x - 46, 1120, 92, 70, { wash: '#a87a4a', washA: 1, w: 1.8, col: L }); poly([[x - 56, 1124], [x, 1080], [x + 56, 1124]], { wash: '#8a4a2a', washA: 1, w: 1.6, col: L }); rect(x - 10, 1150, 20, 40, { wash: '#2a1a10', washA: 1, w: 1.2, col: L }); }
    const sw = Math.sin((t - S0.byzant) * 0.8) * 0.2; push(520, 1190, 1); pencil([[0, 0], [0, -320]], { w: 7, col: '#6a4424', pass2: false }); push(0, -300, 1, -0.9 + sw); pencil([[-60, 0], [260, 0]], { w: 6, col: '#6a4424', pass2: false });
    pencil([[250, 0], [250, 120]], { w: 1.6, col: '#3a2a1a', pass2: false }); rect(222, 120, 56, 40, { wash: '#cbb68e', washA: 1, w: 1.6, col: L }); pop(); pop();
    const P = [[-120, '#f0e6d0', 'stick'], [40, '#c8a070', null], [190, '#e8dcc0', 'axe'], [430, '#d8c8a8', null], [600, '#b88a5a', 'oar'], [680, '#f0e6d0', 'spear']];
    P.forEach(([x, c, pr], i) => human(x, 1196, 0.55, t, { body: c, long: 1, legs: '#8a6a4a', beard: i % 2 ? 'short' : 'long', hair: '#3a2a1a', hat: i === 2 ? 'laurel' : null, prop: pr, armR: pr ? 'hold' : i % 2 ? 'swing' : 'wave', flip: i % 2 ? -1 : 1, seed: 2640 + i, face: i === 3 ? 'smile' : 'calm' }));
    for (let i = 0; i < 2; i++) { const ph = ((t - S0.byzant) * 0.25 + i * 0.5) % 1; human(-60 + ph * 300, 1196, 0.5, t, { body: '#c8a070', long: 1, armR: 'up', armL: 'up', seed: 2650 + i, flip: 1 }); rect(-60 + ph * 300 - 30, 1196 - 230, 60, 30, { wash: '#bba47a', washA: 1, w: 1.4, col: L }); }
  }
  function ground(t) {                                               // мыс под Томом: камень, трава, амфоры, олива, козы, жертвенник
    blob([[-400, 1500], [100, 1440], [560, 1450], [720, 1500], [880, 1620], [1060, 1720], [1500, 1780], [1500, 2400], [-400, 2400]], { wash: '#a8905a', washA: 1, w: 2.4, col: L });
    for (let i = 0; i < 40; i++) { const r = rng(2660 + i), x = -200 + r() * 1400, y = 1480 + r() * 500; ell(x, y, 10 + r() * 30, 6 + r() * 14, { wash: r() < 0.5 ? '#8a7448' : '#c8b07a', washA: 1, w: 1.2, col: '#5a4a2a' }); }
    for (let i = 0; i < 30; i++) { const r = rng(2700 + i), x = -200 + r() * 1400, y = 1470 + r() * 400; pencil([[x, y], [x - 6, y - 26 - r() * 20]], { w: 2, col: '#6a8a3a', pass2: false }); pencil([[x, y], [x + 8, y - 22 - r() * 16]], { w: 2, col: '#7a9a4a', pass2: false }); }
    lightPool(560, 1560, 620, 130, 'rgba(255,214,150,1)', 0.45);
    if (t > EV.bz_better) { const q = clamp((t - EV.bz_better) / 0.5); lightPool(380, 1600, 300 + q * 300, 60 + q * 50, 'rgba(255,220,120,1)', 0.6 * (1 - q * 0.4));
      const k = popK(t, EV.bz_better, 0.35); push(700, 1250, k, -0.04); rect(-180, -50, 360, 90, { wash: IS.gold, washA: 1, w: 3, col: IS.goldD }); txt('ЛУЧШЕЕ МЕСТО', 0, -4, 46, { col: '#3a2a08', font: 'Osw' }); pop(); }
    push(980, 1690, 0.9); pencil(spline([[0, 0], [-10, -120], [10, -220], [-20, -320]], false, 10), { w: 22, col: '#5a4a3a', pass2: false });
    for (let i = 0; i < 16; i++) { const r = rng(2730 + i); ell(-120 + r() * 240, -300 - r() * 160, 60, 34, { wash: i % 2 ? '#7a8a4a' : '#5a7a3a', washA: 0.95, w: 1.4, col: '#2a3a1a' }); } pop();
    for (const [x, y, s] of [[640, 1560, 1], [700, 1580, 0.85], [590, 1600, 0.9]]) { push(x, y, s); blob([[-24, 0], [-34, -50], [-20, -100], [-12, -120], [12, -120], [20, -100], [34, -50], [24, 0]], { wash: '#c86a3a', washA: 1, w: 2, col: L }); pencil([[-30, -60], [30, -60]], { w: 3, col: '#1a1010', pass2: false }); for (const k of [-1, 1]) pencil(spline([[k * 12, -116], [k * 36, -110], [k * 28, -86]], false, 6), { w: 4, col: '#a8542a', pass2: false }); pop(); }
    goat(820, 1610, 0.9, t, 1); goat(-20, 1620, 0.8, t, 2, '#8a6a4a');
    castShadow(390, 1612, 120, 520, -0.1, 0.4); castShadow(980, 1690, 140, 480, -0.1, 0.35); moodDark(SUN[0], 1000, 900, 1700, '#1a1030', 0.35);
  }
  function front(t) { push(1100, 300, 1.4, 0.4); for (let i = 0; i < 14; i++) { const r = rng(2740 + i); push(-r() * 400, r() * 200, 1, r() * 2); blob([[0, 0], [40, -12], [80, 0], [40, 12]], { wash: '#2a3a1a', washA: 1, line: false }); pop(); } pop();
    for (let i = 0; i < 12; i++) { const x = -60 + i * 110; sil([[x - 30, 2100], [x - 10, 1830 - (i % 3) * 60], [x + 10, 1840], [x + 30, 2100]], '#2a2a14', 1); } }
  WORLD.byzant = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => asia(t));
    lay(9, () => strait(t));
    lay(3.6, () => { build(t); depthFog('#e8c0a0', 0.05); });
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    lay(2.4, () => motes(26, [-100, 900, 1200, 1500], '#fff0c8', t, 2750, { sp: 5, sz: 2.2, a: 0.5, wob: 18, add: 1 }));
    lay(0.85, () => motes(8, [-200, 500, 1300, 1700], '#ffe8c0', t, 2751, { sp: 8, sz: 6, a: 0.16, wob: 30, add: 1 }));
  };
  DIR.byzant = {
    outfit: 'greekC', light: { side: 1, rim: '#ffd890' }, grade: ['#e8a070', 0.08],
    act: () => [[S0.byzant, 'talk'], [EV.bz_greek, 'proud'], [EV.bz_across, 'sideeye'], [EV.bz_blind, 'laugh'], [EV.bz_better, 'smug']],
    pose: (t, u, b) => { const pt = t > EV.bz_across - 0.1 && t < EV.bz_better - 0.1, st = t > EV.bz_better - 0.12 && t < EV.bz_better + 0.25;
      return Object.assign(b, { x: 390, y: 1612, s: 1.0, look: pt ? [0.9, -0.5] : [0.3, -0.2], hand: t > EV.bz_blind && t < EV.bz_better - 0.12 ? [90, -390] : [120, -300], handF: pt ? [260, -440] : undefined,
        squash: st && t > EV.bz_better ? 0.14 : b.squash, nod: st ? 0.1 : 0, tailUp: t > EV.bz_blind }); },
    cam: () => [[S0.byzant, 600, 980, 0.0], [EV.bz_greek, 580, 980, -0.04], [EV.bz_across, 680, 960, -0.02], [EV.bz_blind, 720, 940, 0.06, 'x'], [EV.bz_better, 500, 1080, 0.06, 'x'], [S1.byzant, 520, 1060, 0.0]]
  };
  TRANS_IN.byzant = { a: 0, b: 0.38, fx(k, t, A, B) {               // белый подол-вихрь раскручивается: из спирали проступает рассвет
    drawBuf(B); const e = sm(k); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); const pts = []; for (let q = 0; q <= 120; q++) { const a = q * 0.16 + e * 3, r = q * (4 + e * 22); pts.push([540 + Math.cos(a) * r, 960 + Math.sin(a) * r]); }
      ctx.moveTo(pts[0][0], pts[0][1]); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = IS.white; ctx.globalAlpha = 1 - e * 0.85; ctx.fill('evenodd'); ctx.restore(); });
  } };
})();
