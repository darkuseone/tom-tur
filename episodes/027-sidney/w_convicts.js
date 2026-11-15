/* 027 — сцена `convicts`: январь 1788, Сиднейская бухта утром. На якоре парусники Первого флота, шлюпки везут к берегу каторжников
   в серых робах, морпехи в красных мундирах и треуголках, ставят палатки, рубят эвкалипты, на холме флагшток; кенгуру и какаду
   косятся на гостей. Главный свет — утреннее солнце справа над водой. Том-матрос (sailor): на «восемьсот» — счётчик «≈ 775»,
   на «Билет» достаёт билет «ONE WAY · В ОДИН КОНЕЦ», на «конец» рвёт корешок. Переход В сцену — парус проносится через кадр. */
(() => {
  EV.cv_prison = wtk('s1', 'тюрьма:');
  EV.cv_800 = wtk('s1', 'восемьсот');
  EV.cv_ticket = wtk('s1', 'Билет');
  EV.cv_end = wtk('s1', 'конец.');
  KEYW.push('тюрьма:', 'восемьсот', 'конец.');
  const L = SY.ink, SUN = [920, 760];
  function sky(t) { vgrad(-900, 1200, ['#5a8ac8', '#a8c8e0', '#f0d8b0', '#ffe8c0'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,236,190,1)', 0.4); ell(SUN[0], SUN[1], 60, 60, { wash: '#fff8e0', washA: 1, line: false });
    rays(SUN[0], SUN[1], Math.PI * 0.85, 1.4, 1400, 'rgba(255,240,200,1)', 0.1, 8, t); gulls(5, -100, 1180, 420, 700, t, 3250, 0.4, 24); }
  function headland(t) { hills(980, 90, '#6a8a6a', 3251); hills(1000, 50, '#5a7a5a', 3252); for (let i = 0; i < 12; i++) eucalypt(-200 + i * 130, 990 - (i % 3) * 20, 140, t, 3253 + i); depthFog('#d8e0d0', 0.08); }
  function cove(t) {                                                 // бухта: корабли на якоре, шлюпки с каторжниками
    vgrad(990, 1340, ['#a8c8d8', '#4a8ab0', '#1f5a8a'], 1);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 3260)); for (let i = 0; i < 50; i++) { const y = 1000 + r() * 320, w = 20 + r() * 70; ctx.fillStyle = `rgba(255,240,200,${0.35 * r()})`; ctx.fillRect(SUN[0] - 140 + r() * 280 - (y - 1000) * 0.3 - w / 2, y, w, 3); } ctx.restore();
    tallShip(300, 1070, 0.42, t); tallShip(760, 1050, 0.36, t, { flip: -1 }); tallShip(1100, 1090, 0.3, t);
    for (let i = 0; i < 3; i++) { const ph = ((t - S0.convicts) * 0.08 + i * 0.33) % 1, x = 200 + i * 300, y = 1160 + ph * 140; push(x, y, 0.6); shape([[-120, 0], [120, 0], [100, 30], [-100, 30]], { wash: '#7a5a3a', washA: 1, w: 2, col: L });
      for (let k = 0; k < 5; k++) { ell(-80 + k * 40, -30, 14, 16, { wash: k === 0 ? SY.red : '#7a7a80', washA: 1, w: 1.4, col: L }); ell(-80 + k * 40, -56, 11, 12, { wash: '#e2b48e', washA: 1, w: 1.2, col: L }); } pencil([[100, -10], [150, 30 + Math.sin(t * 3) * 10]], { w: 4, col: '#5a3a1a', pass2: false }); pop(); }
  }
  function camp(t) {                                                 // берег: палатки, флагшток, рубка эвкалипта, морпехи, каторжники, кенгуру
    blob([[-500, 1320], [0, 1270], [600, 1280], [1100, 1250], [1600, 1300], [1600, 1500], [-500, 1500]], { wash: '#c8a868', washA: 1, w: 2, col: L });
    for (const [x, s] of [[-60, 1], [160, 0.9], [980, 0.85]]) { push(x, 1300, s); shape([[-90, 0], [0, -110], [90, 0]], { wash: '#efe4c8', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.2, col: '#8a7a5a', ang: 1 } }); shape([[-10, 0], [0, -110], [10, 0]], { wash: '#5a4a3a', washA: 1, line: false }); pop(); }
    pencil([[1200, 1290], [1200, 940]], { w: 5, col: '#5a3a1a', pass2: false }); const fw = Math.sin(t * 3) * 10; shape([[1200, 950], [1300 + fw, 960], [1290 + fw, 1020], [1200, 1010]], { wash: '#2a3a8a', washA: 1, w: 1.6, col: L }); pencil([[1200, 980], [1296 + fw, 990]], { w: 6, col: '#f4f0e8', pass2: false }); pencil([[1200, 980], [1296 + fw, 990]], { w: 3, col: SY.red, pass2: false });
    const M = [[360, 'tricorn', SY.red, 'spear', 1], [560, 'tricorn', SY.red, null, -1], [840, 'tricorn', SY.red, 'spear', -1]]; M.forEach(([x, h, c, pr, fl], i) => human(x, 1310, 0.56, t, { body: c, hat: h, legs: '#f0ece0', trim: '#f0ece0', prop: pr, armR: pr ? 'hold' : 'point', flip: fl, seed: 3270 + i, face: 'calm', hair: '#d8d0c0' }));
    const C = [[460, 'axe', 'swing'], [660, null, 'up'], [720, 'stick', 'hold'], [-180, null, 'down'], [1060, 'oar', 'hold']]; C.forEach(([x, pr, a], i) => human(x, 1312, 0.54, t, { body: '#7a7a80', legs: '#6a6a70', hat: i % 2 ? 'cap' : null, hatCol: '#5a5a60', prop: pr, armR: a, flip: i % 2 ? -1 : 1, seed: 3280 + i, beard: 'short', hair: '#3a2a1a', face: i === 1 ? 'shock' : 'calm' }));
    push(470, 1310, 0.6); pencil(spline([[0, 0], [10, -150], [-10, -260]], false, 8), { w: 26, col: '#d8d0c0', pass2: false }); ell(-10, -300, 80, 50, { wash: SY.euc, washA: 1, w: 1.6, col: SY.eucD }); pop();
    kangaroo(1290, 1320, 0.55, t, 3); cockatoo(1190, 1260, 0.8, t, 4); cockatoo(1240, 1240, 0.7, t, 5);
  }
  function beach(t) {                                                // песок под Томом: бочки, ящики, якорь, следы
    rect(-500, 1420, 2100, 900, { wash: '#d8b878', washA: 1, w: 2, col: L }); for (let i = 0; i < 40; i++) { const r = rng(3290 + i); ell(-300 + r() * 1600, 1450 + r() * 500, 12 + r() * 20, 4 + r() * 6, { wash: r() < 0.5 ? '#c8a868' : '#e8c888', washA: 1, line: false }); }
    lightPool(SUN[0] - 300, 1640, 640, 140, 'rgba(255,236,190,1)', 0.45);
    for (const [x, y] of [[760, 1620], [880, 1640]]) { push(x, y, 1); shape([[-50, 0], [-58, -110], [58, -110], [50, 0]], { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (const yy of [-20, -90]) pencil([[-54, yy], [54, yy]], { w: 5, col: '#3a3a40', pass2: false }); pop(); }
    push(1050, 1660, 1); rect(-80, -90, 160, 90, { wash: '#a87a4a', washA: 1, w: 2, col: L }); txt('H.M.', 0, -44, 30, { col: '#3a2a1a', font: 'Osw' }); pop();
    push(80, 1700, 1, 0.3); pencil([[0, -120], [0, 40]], { w: 10, col: '#3a3a42', pass2: false }); pencil(spline([[-60, 10], [0, 50], [60, 10]], false, 8), { w: 10, col: '#3a3a42', pass2: false }); ell(0, -130, 16, 16, { line: true, w: 6, col: '#3a3a42' }); pop();
    castShadow(330, 1612, 120, 520, -0.2, 0.4); moodDark(SUN[0], 1100, 900, 1700, '#1a2030', 0.3);
  }
  function hud(t) {
    if (t > EV.cv_800 - 0.05 && t < EV.cv_ticket) { const q = popK(t, EV.cv_800 - 0.05, 0.3), n = Math.round(sm(clamp((t - EV.cv_800 + 0.05) / 0.8)) * 775); push(560, 790, q, -0.03); rect(-240, -70, 480, 140, { wash: '#1a1410', washA: 0.92, w: 3, col: SY.oraL }); txt('≈ ' + n, 0, -10, 76, { col: SY.oraL, font: 'Osw' }); txt('каторжников', 0, 46, 28, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (let i = 0; i < 10; i++) { const x = -60 + i * 130; sil([[x - 30, 2200], [x - 10, 1840 - (i % 3) * 60], [x + 10, 1850], [x + 30, 2200]], '#3a3a1e', 1); } push(1150, 300, 1.4, 0.5); for (let i = 0; i < 12; i++) { const r = rng(3300 + i); push(-r() * 380, r() * 220, 1, r() * 2); blob([[0, 0], [50, -10], [100, 0], [50, 10]], { wash: SY.eucD, washA: 1, line: false }); pop(); } pop(); }
  WORLD.convicts = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => headland(t));
    lay(8, () => cove(t));
    lay(3.4, () => { camp(t); depthFog('#e8e0c8', 0.05); });
    lay(1, () => { beach(t); cat(); });
    lay(0.6, () => front(t));
    lay(2.2, () => motes(24, [-100, 800, 1200, 1500], '#fff8e0', t, 3305, { sp: 5, sz: 2.2, a: 0.45, wob: 18, add: 1 }));
  };
  DIR.convicts = {
    outfit: 'sailor', light: { side: 1, rim: '#fff0c8' }, grade: ['#a8b8c8', 0.06],
    act: () => [[S0.convicts, 'suspicious'], [EV.cv_prison, 'cold'], [EV.cv_800, 'shock'], [EV.cv_ticket, 'smug'], [EV.cv_end, 'sideeye']],
    pose: (t, u, b) => { const tk = t > EV.cv_ticket - 0.1; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: tk ? [0.6, -0.6] : [0.8, -0.3], hand: tk ? [160, -440] : [170, -300], handF: t > EV.cv_end - 0.1 ? [80, -420] : undefined, tailUp: t > EV.cv_end }); },
    afterCat: (t, u, P) => { if (t < EV.cv_ticket - 0.1) return; const q = popK(t, EV.cv_ticket - 0.1, 0.3), x = P.x + P.hand[0] * P.s + 60, y = P.y + P.hand[1] * P.s - 70, rip = t > EV.cv_end ? clamp((t - EV.cv_end) / 0.3) : 0;
      push(x, y, 2.0 * q, -0.12); rect(-110, -50, 220, 100, { wash: '#f2e6c8', washA: 1, w: 2.4, col: L }); txt('ONE WAY', -16, -16, 34, { col: SY.red, font: 'Osw' }); txt('В ОДИН КОНЕЦ', -16, 22, 20, { col: '#3a2a1a', font: 'Osw' }); for (let q2 = 0; q2 < 6; q2++) ell(70, -40 + q2 * 16, 3, 3, { wash: '#8a7a5a', washA: 1, line: false });
      push(rip * 60, rip * 40, 1, rip * 0.8); rect(74, -50, 36, 100, { wash: '#e8d8b0', washA: 1, w: 2, col: L }); pop(); pop(); },
    cam: () => [[S0.convicts, 600, 980, 0.0], [EV.cv_prison, 620, 960, 0.06], [EV.cv_800, 640, 940, 0.1, 'x'], [EV.cv_ticket, 520, 1080, 0.16, 'x'], [S1.convicts, 520, 1060, 0.1]],
    hud
  };
  TRANS_IN.convicts = { a: 0, b: 0.4, fx(k, t, A, B) {               // парус проносится через кадр: из тёплой вспышки — утро 1788
    const e = sm(k), x = lerp(-700, 1800, e); drawBuf(B); scr(() => { if (e < 0.35) screenFill('#ffd08a', 1 - e / 0.35, 'source-over'); ctx.save(); ctx.translate(x, 960); ctx.rotate(-0.08); blob([[-600, -1100], [500, -1000], [620, 0], [520, 1100], [-560, 1000], [-460, 0]], { wash: '#efe4c8', washA: 1, w: 4, col: SY.ink, shade: { gap: 12, a: 0.18, col: '#8a7a5a', ang: 1.5 } }); ctx.restore(); });
  } };
})();
