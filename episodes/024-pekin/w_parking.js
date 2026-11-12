/* 024 — сцена `parking`: порт Циньхуандао. Ночь, луна над морем: краны, мачты, маяк, склады, палатки лагеря морпехов, джип, бочки, колючка.
   Сначала два ящика на песке превращаются в пунктир с «?» («Ящики исчезли»). 1947: морпех-силуэт светит фонариком, Том копает окоп —
   на «откопал» лопата бьёт в крышку («тук»), из ямы светятся кости; на «зарыл обратно» Том закидывает яму. На «Теперь там парковка»
   по земле раскатывается асфальт, ложится разметка, сверху падают машины, загорается синяя «P», склады становятся контейнерами — ответ на хук.
   Главный свет — луч фонарика (тёплый) под холодной луной, потом — синий неон «P» и натриевый фонарь. Переход В сцену — луч фонарика. */
(() => {
  EV.pk_gone = S0.parking + 0.4;
  EV.pk_marine = wtk('s7', 'морпех');
  EV.pk_dig = wtk('s7', 'уверял:');
  EV.pk_hit = wtk('s7', 'откопал');
  EV.pk_bury = wtk('s7', 'зарыл');
  EV.pk_now = wtk('s7', 'Теперь');
  EV.pk_park = wtk('s7', 'парковка.');
  EV.answer = EV.pk_park;
  KEYW.push('исчезли.', 'кости', 'парковка.');
  SHAKES.push([EV.pk_hit, 0.2, 9], [EV.pk_park, 0.4, 12]);
  const L = BJ.ink, HX = 720, HY = 1600, MX = 960;                   // яма; морпех
  const now = t => sm((t - EV.pk_now) / 0.5), digK = t => sm(clamp((t - EV.pk_dig) / (EV.pk_hit - EV.pk_dig))), fillK = t => sm(clamp((t - EV.pk_bury - 0.15) / 0.9)), boxG = t => t > EV.pk_hit ? (1 - fillK(t)) * (0.7 + 0.3 * Math.sin(t * 6)) : 0;
  function sky(t) { const n = now(t); vgrad(-900, 1300, [lerpC('#050a1e', '#1a2a5a', n), lerpC('#0e1a40', '#3a4a8a', n), lerpC('#243860', '#8a6a9a', n), lerpC('#3a5070', '#f0a070', n)], 1); starsBJ(t, 90, [-300, -200, 1400, 800], 2600, 1 - n * 0.8);
    glow(300, 700, 420, 'rgba(210,225,255,1)', 0.55 * (1 - n * 0.5)); ell(300, 700, 74, 74, { wash: '#f0f0e4', washA: 1, w: 1.4, col: '#a8a8a0', a: 0.5 }); ell(280, 684, 17, 14, { wash: '#d0d0c4', washA: 0.7, line: false }); cloudsBJ(t, 440, 4, lerpC('#2a3a68', '#c890a0', n), 2601, 0.6, 6); }
  function sea(t) {                                                 // море, лунная дорожка, корабли, краны, маяк
    const n = now(t); rect(-900, 1010, 2900, 400, { wash: lerpC('#0e1c3a', '#2a4a7a', n), washA: 1, line: false }); for (let i = 0; i < 14; i++) { const y = 1024 + i * 14; pencil([[300 - 20 - i * 9 + Math.sin(t * 2 + i) * 14, y], [300 + 20 + i * 9 + Math.sin(t * 2 + i) * 14, y]], { w: 3, col: '#dfe8ff', a: 0.5 - i * 0.03, pass2: false }); }
    for (const [x, s] of [[620, 1], [-60, 0.7]]) { push(x, 1040, s); sil([[-150, 0], [-120, 40], [130, 40], [170, 0]], '#0a1024', 1); sil([[-60, 0], [-60, -50], [60, -50], [60, 0]], '#0a1024', 1); sil([[-10, -50], [-10, -110], [24, -110], [24, -50]], '#0a1024', 1); pencil([[-110, 0], [-110, -130]], { w: 3, col: '#0a1024', pass2: false }); glow(0, -30, 40, 'rgba(255,220,150,1)', 0.8); for (let k = 0; k < 3; k++) { const ph = (t * 0.2 + k / 3) % 1; ell(8 + ph * 60, -120 - ph * 90, 14 + ph * 26, 10 + ph * 18, { wash: '#5a6a90', washA: 0.3 * (1 - ph), line: false }); } pop(); }
    for (const x of [900, 1090]) { sil([[x - 14, 1060], [x - 8, 700], [x + 8, 700], [x + 14, 1060]], '#0a1024', 1); pencil([[x - 120, 720], [x + 190, 660]], { w: 9, col: '#0a1024', pass2: false }); pencil([[x + 150, 668], [x + 150, 860]], { w: 2, col: '#0a1024', pass2: false }); pencil([[x, 640], [x - 120, 720]], { w: 3, col: '#0a1024', pass2: false }); pencil([[x, 640], [x + 190, 660]], { w: 3, col: '#0a1024', pass2: false }); }
    sil([[-330, 1060], [-320, 800], [-290, 800], [-280, 1060]], '#0a1024', 1); glow(-305, 790, 60, 'rgba(255,240,180,1)', 0.9); rays(-305, 790, t * 0.9, 0.12, 1300, 'rgba(255,240,190,0.9)', 0.25, 3, t);
    depthFog(lerpC('#16244a', '#c8a0b0', n), 0.22); }
  function sheds(t) {                                               // склады 1947 → контейнеры сегодня
    const n = now(t);
    for (let i = 0; i < 4; i++) { const x = -260 + i * 430, c = ['#5a3a30', '#4a4038', '#5a4636', '#3e3a40'][i]; rect(x, 1010, 380, 300, { wash: c, washA: 1, w: 2.6, col: L, shade: { gap: 14, a: 0.25, col: '#140c0a', ang: 1.57 } }); shape([[x - 20, 1016], [x + 190, 920], [x + 400, 1016]], { wash: '#2a2a30', washA: 1, w: 2.4, col: L }); rect(x + 130, 1130, 120, 180, { wash: '#1a1410', washA: 1, w: 2, col: L }); windows(x + 30, 1060, 320, 50, 6, 1, 2610 + i, 0.5, '#ffc870', '#ffc870', 0.8); txt(['ПОРТ', 'СКЛАД 4', 'CAMP HOLCOMB', 'УГОЛЬ'][i], x + 190, 990, 26, { col: '#d8c8a0', font: 'Osw', a: 0.7 * (1 - n) }); }
    if (n > 0) for (let i = 0; i < 9; i++) { const x = -300 + i * 190, yy = 1310 - popK(t, EV.pk_now + i * 0.04, 0.3) * 0; const h = popK(t, EV.pk_now + 0.1 + i * 0.05, 0.3); for (let j = 0; j < 2 + (i % 2); j++) rect(x, 1310 - (j + 1) * 86 * h, 180, 84 * h, { wash: [BJ.red, '#2a6a9a', '#e8a030', '#2a8a6a', '#5a5e66'][(i + j) % 5], washA: n, w: 2, col: L, a: n, shade: { gap: 12, a: 0.2 * n, col: '#0a0a14', ang: 1.57 } }); }
    depthFog(lerpC('#101a3a', '#a888a0', n), 0.16); }
  function camp(t) {                                                // лагерь: палатки, джип, бочки, колючка, морпех с фонариком; сегодня — ряды машин и фонари
    const n = now(t), a = 1 - n;
    if (a > 0.02) { for (const [x, s] of [[120, 1], [330, 0.8], [1180, 0.9]]) { push(x, 1420, s); shape([[-130, 0], [0, -130], [130, 0]], { wash: '#5a5e44', washA: a, w: 2.4, col: L, a, shade: { gap: 9, a: 0.25 * a, col: '#1a1c10', ang: 1.0 } }); shape([[-26, 0], [0, -100], [26, 0]], { wash: '#16180e', washA: a, w: 1.6, col: L, a }); glow(0, -30, 80, 'rgba(255,190,100,1)', 0.4 * a); pop(); }
      push(560, 1424, 0.9); rect(-110, -70, 220, 50, { wash: '#4a5236', washA: a, w: 2.4, col: L, a }); rect(-60, -110, 90, 44, { wash: '#3a422a', washA: a, w: 2, col: L, a }); for (const k of [-70, 70]) ell(k, -14, 26, 26, { wash: '#14140e', washA: a, w: 2.4, col: L, a }); pop();
      for (const x of [760, 800, 780]) { rect(x - 18, 1420 - (x === 780 ? 100 : 54), 36, 54, { wash: '#3a4a52', washA: a, w: 1.8, col: L, a }); }
      for (let i = 0; i < 9; i++) { const x = -200 + i * 190; pencil([[x, 1424], [x + 6, 1330]], { w: 5, col: BJ.woodD, a, pass2: false }); if (i) for (const k of [0, 30]) pencil(spline([[x - 190, 1340 + k], [x - 95, 1352 + k], [x, 1340 + k]], false, 6), { w: 1.4, col: '#8a8a94', a: 0.8 * a, pass2: false }); } }
    if (t > EV.pk_marine - 0.2 && a > 0.02) { const q = popK(t, EV.pk_marine - 0.2, 0.3) * a; human(MX, 1490, 0.86 * q, t, { body: '#3e4a34', legs: '#2a3024', hat: 'helmet', hatCol: '#3a442e', seed: 2620, flip: -1, armR: 'point', look: [-0.6, 0.5] });
      const fx = MX - 70, fy = 1350, an = Math.atan2(HY - fy, HX - fx) - Math.PI / 2; shaft(fx, fy, 30, 440, an, 'rgba(255,236,170,1)', 0.7 * q); shaft(fx, fy, 180, 480, an, 'rgba(255,220,140,1)', 0.28 * q); glow(fx, fy, 60, 'rgba(255,240,190,1)', 0.9 * q); }
    if (n > 0) { for (const x of [60, 620, 1180]) { pencil([[x, 1430], [x, 900]], { w: 9, col: '#2a2e36', a: n, pass2: false }); pencil([[x, 900], [x + 80, 890]], { w: 7, col: '#2a2e36', a: n, pass2: false }); glow(x + 84, 900, 220, 'rgba(255,190,100,1)', 0.6 * n * flick(t, x)); shaft(x + 84, 900, 300, 560, 0, 'rgba(255,190,110,1)', 0.16 * n); }
      for (let i = 0; i < 8; i++) carT(-160 + i * 190, 1428, 0.62, i + 3, t, EV.pk_now + 0.25 + i * 0.05); crowd(-100, 1300, 1430, 6, t, 2621, { s: 0.5, phones: 0.5 }); }
  }
  function carT(x, y, s, k, t, t0) {                                 // машина падает сверху и пружинит
    if (t < t0) return; const d = clamp((t - t0) / 0.22), b = d < 1 ? 0 : Math.sin((t - t0 - 0.22) * 22) * 10 * Math.max(0, 1 - (t - t0 - 0.22) / 0.4), yy = lerp(y - 900, y, d * d) + b, c = ['#d84a3a', '#e8e0d0', '#2a2a36', '#3a8ac0', '#e8c040', '#3aa88a', '#8a8a94', '#a8231c', '#f0f0f0', '#2a5a8a', '#1a1a1e'][k % 11];
    push(x, yy, s, 0, k % 2 ? 1 : -1); ell(0, 4, 150, 16, { wash: '#000000', washA: 0.3, line: false });
    blob([[-140, -20], [-136, -70], [-80, -80], [-50, -128], [50, -128], [90, -80], [140, -66], [144, -20]], { wash: c, washA: 1, w: 2.8, col: L, shade: { gap: 8, a: 0.2, col: '#0a0a14', ang: 1.2 } });
    blob([[-70, -82], [-44, -118], [-4, -118], [-4, -82]], { wash: '#bfe0f0', washA: 0.9, w: 1.8, col: L }); blob([[6, -82], [6, -118], [44, -118], [76, -82]], { wash: '#bfe0f0', washA: 0.9, w: 1.8, col: L });
    for (const wx of [-84, 88]) { ell(wx, -20, 30, 30, { wash: '#14141a', washA: 1, w: 2.6, col: L }); ell(wx, -20, 12, 12, { wash: '#a8a8b0', washA: 1, line: false }); } ell(138, -50, 8, 10, { wash: '#fff0b0', washA: 1, w: 1.2, col: L }); ell(-136, -50, 6, 9, { wash: '#ff5a40', washA: 1, w: 1.2, col: L }); pop(); }
  function ground(t) {                                              // песок с ямой и ящиком → асфальт с разметкой, знак «P»
    const n = now(t), d = digK(t), f = fillK(t), g = boxG(t), open = d * (1 - f);
    shape([[-900, 1430], [2000, 1430], [2000, 2500], [-900, 2500]], { wash: '#6a5a44', washA: 1, line: false });
    ctx.save(); const r = rng(2622); for (let i = 0; i < 200; i++) { ctx.fillStyle = r() < 0.5 ? 'rgba(30,22,14,0.45)' : 'rgba(210,190,150,0.4)'; const z = 3 + r() * 7; ctx.fillRect(-300 + r() * 1700, 1440 + r() * 800, z, z * 0.6); } ctx.restore();
    for (let i = 0; i < 7; i++) pencil(spline([[-400, 1470 + i * i * 12 + i * 26], [500, 1460 + i * i * 12 + i * 26 + Math.sin(i) * 8], [1600, 1474 + i * i * 12 + i * 26]], false, 10), { w: 1.6, col: '#3a2e20', a: 0.4, pass2: false });
    for (const [x, y] of [[80, 1500], [1120, 1700], [300, 1820]]) for (let k = 0; k < 5; k++) pencil([[x + k * 8, y], [x + k * 8 + (k - 2) * 9, y - 46 - (k % 2) * 16]], { w: 2.4, col: '#4a5a34', pass2: false });
    // исчезнувшие ящики
    for (const [x, y, i] of [[900, 1560, 0], [1060, 1590, 1]]) { if (t < EV.pk_gone) crateW(x, y, 130, 90, { label: '№' + (i + 1), ls: 36 }); else if (t < EV.pk_dig + 0.3) { const a = clamp((EV.pk_dig + 0.3 - t) / 0.3); dashO([[x - 65, y], [x - 65, y - 45], [x - 65, y - 90], [x, y - 90], [x + 65, y - 90], [x + 65, y - 45], [x + 65, y], [x, y], [x - 65, y]].flatMap((p, j, A) => j < A.length - 1 ? [p, [(p[0] + A[j + 1][0]) / 2, (p[1] + A[j + 1][1]) / 2]] : []), '#ffe9a8', 5, a); txt('?', x, y - 40, 76, { col: '#ffd24a', font: 'Osw', a }); puffK(x, y - 40, 1, t, EV.pk_gone, 0.45, 2623 + i, '#e8dcc0'); } }
    // яма
    if (open > 0.02) { ell(HX, HY, 210 * open, 64 * open, { wash: '#1a120c', washA: 1, w: 2.6, col: L }); if (t > EV.pk_hit - 0.05) { ctx.save(); ctx.beginPath(); ctx.ellipse(HX, HY, 204 * open, 60 * open, 0, 0, 6.3); ctx.clip(); crateW(HX, HY + 60, 220, 100, { label: '', col: '#8a6a3a' }); rect(HX - 110, HY - 44, 220, 16, { wash: '#6a4e28', washA: 1, w: 2, col: L });
        if (g > 0) { skullPM(HX - 40, HY - 20, 0.3, {}); pencil([[HX + 10, HY - 26], [HX + 80, HY - 14]], { w: 8, col: BJ.bone, pass2: false }); ell(HX + 8, HY - 26, 8, 8, { wash: BJ.bone, washA: 1, line: false }); ell(HX + 82, HY - 14, 8, 8, { wash: BJ.bone, washA: 1, line: false }); } ctx.restore(); if (g > 0) { glow(HX, HY - 20, 280, 'rgba(255,220,130,1)', 0.6 * g); rays(HX, HY, -Math.PI / 2, 1.4, 500, 'rgba(255,230,150,0.8)', 0.16 * g, 7, t); } } }
    const mh = (d - f * 0.9) * 1; if (mh > 0.02 && n < 1) blob([[HX + 170, 1640], [HX + 220, 1640 - 90 * mh], [HX + 320, 1640 - 110 * mh], [HX + 400, 1640 - 40 * mh], [HX + 430, 1640]], { wash: '#7a6648', washA: 1 - n, w: 2.4, col: L, a: 1 - n, shade: { gap: 8, a: 0.25, col: '#2a2014', ang: 0.5 } });
    if (f > 0.9 && n < 1) { ell(HX, HY, 170, 30, { wash: '#7a6648', washA: (1 - n) * 0.9, w: 1.6, col: '#3a2e20', a: 1 - n }); }
    if (t > EV.pk_dig && t < EV.pk_bury + 1.1) { const ph = (t * 3.2) % 1, dir = t > EV.pk_bury ? -1 : 1; for (let k = 0; k < 5; k++) { const u = (ph + k * 0.08) % 1, sx = dir > 0 ? lerp(HX, HX + 300, u) : lerp(HX + 300, HX, u); ell(sx, 1600 - Math.sin(u * Math.PI) * 190, 12 - k, 9 - k, { wash: '#6a5638', washA: 0.9, w: 1.2, col: L }); } }
    castShadow(410, 1582, 180, 400, -1.0, 0.4 * (1 - n)); lightPool(HX, HY, 300, 80, 'rgba(255,225,150,1)', 0.45 * (1 - n) * (t > EV.pk_marine ? 1 : 0));
    // асфальт раскатывается справа налево
    if (n > 0) { const q = sm(clamp((t - EV.pk_now) / 0.45)), xe = lerp(2000, -900, q);
      ctx.save(); ctx.beginPath(); ctx.rect(xe, 1300, 3000, 1300); ctx.clip(); shape([[-900, 1430], [2000, 1430], [2000, 2500], [-900, 2500]], { wash: '#34363e', washA: 1, line: false });
      const r2 = rng(2624); ctx.save(); for (let i = 0; i < 160; i++) { ctx.fillStyle = r2() < 0.5 ? 'rgba(10,10,14,0.4)' : 'rgba(150,150,160,0.25)'; const z = 2 + r2() * 5; ctx.fillRect(-300 + r2() * 1700, 1440 + r2() * 800, z, z * 0.6); } ctx.restore();
      for (let i = -3; i < 9; i++) { const x0 = 560 + (i - 2.5) * 250, x1 = 560 + (i - 2.5) * 430; pencil([[x0, 1470], [x1, 2100]], { w: 9, col: '#e8e8e0', a: 0.9, pass2: false }); } pencil([[-900, 1470], [2000, 1470]], { w: 7, col: '#e8e8e0', a: 0.85, pass2: false });
      txt('P', HX + 30, 1700, 150, { col: '#e8e8e0', font: 'Osw', a: 0.5 }); for (const [x, y] of [[250, 1760], [1040, 1820]]) ell(x, y, 90, 16, { wash: '#1a1c24', washA: 0.5, line: false }); ctx.restore();
      if (q < 1) { rect(xe - 30, 1425, 60, 1100, { wash: '#1a1a1e', washA: 1, w: 3, col: L }); glow(xe, 1700, 200, 'rgba(255,170,90,1)', 0.4); }
      if (t > EV.pk_park - 0.3) { carT(1010, 1640, 1.0, 1, t, EV.pk_park - 0.3); carT(60, 1600, 0.9, 4, t, EV.pk_park - 0.15); }
      // знак P
      if (t > EV.pk_park - 0.05) { const p = popK(t, EV.pk_park - 0.05, 0.3), fl = t - EV.pk_park < 0.3 ? (Math.sin(t * 60) > 0 ? 1 : 0.3) : 1; pencil([[HX + 60, 1560], [HX + 60, 1560 - 420 * p]], { w: 12, col: '#2a2e36', pass2: false }); push(HX + 60, 1140, p); rect(-90, -90, 180, 180, { wash: '#1a4ac0', washA: 1, w: 4, col: '#e8f0ff' }); txt('P', 0, 8, 150, { col: '#ffffff', font: 'Osw' }); pop(); glow(HX + 60, 1140, 420, 'rgba(90,150,255,1)', 0.6 * fl * p); lightPool(HX + 60, 1600, 480, 110, 'rgba(110,160,255,1)', 0.5 * fl * p); castShadow(410, 1582, 180, 360, -0.6, 0.4 * p); }
    }
    moodDark(HX, 1450, 520, 1500, '#03050e', 0.6 - 0.25 * n);
  }
  function front(t) {                                               // рама: крюк крана на цепи, трава дюн, колючая проволока
    pencil([[1330, -300], [1330, 620]], { w: 10, col: '#04060c', pass2: false }); for (let i = 0; i < 12; i++) ell(1330, -200 + i * 70, 12, 22, { line: true, w: 5, col: '#04060c' }); pencil(spline([[1330, 620], [1330, 760], [1250, 800], [1230, 720]], false, 10), { w: 20, col: '#04060c', pass2: false });
    for (let k = 0; k < 12; k++) pencil(spline([[-420 + k * 26, 2400], [-430 + k * 30 + Math.sin(t * 1.5 + k) * 14, 1900 - (k % 4) * 80], [-380 + k * 34, 1700 - (k % 3) * 60]], false, 8), { w: 9, col: '#04060c', pass2: false });
  }
  function hud(t) {
    if (t > EV.pk_marine - 0.05 && t < EV.pk_now) { const q = popK(t, EV.pk_marine - 0.05, 0.3); push(600, 780, q, -0.03); rect(-250, -70, 500, 140, { wash: '#0c1020', washA: 0.92, w: 3, col: '#c8d0e0' }); txt('РАССКАЗ МОРПЕХА · 1947', 0, -24, 44, { col: '#e8ecf4', font: 'Osw' }); txt('Ричард Боуэн рыл окоп в порту', 0, 30, 34, { col: '#f0e0b8', font: 'Hand' }); pop(); }
    if (t > EV.pk_hit && t < EV.pk_hit + 0.6) txt('ТУК', 720, 1260, 100, { col: '#ffe8b0', font: 'Osw', rot: -0.08, a: 1 - (t - EV.pk_hit) / 0.6 });
    if (t > EV.pk_park + 0.5) note('место нашли в 2012-м — не раскопано', 590, 820, t, EV.pk_park + 0.5, S1.parking + 1, '#eaf0ff', 44, -0.03);
  }
  WORLD.parking = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => sea(t));
    lay(9, () => sheds(t));
    lay(3.4, () => camp(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    lay(4, () => motes(26, [-100, 500, 1250, 1450], '#dfe8ff', t, 2625, { sp: 6, vx: 30, sz: 2, a: 0.5, wob: 16, add: 1 }));
    lay(0.8, () => motes(10, [-200, 700, 1300, 1900], '#c8d0e8', t, 2626, { sp: 9, vx: 50, sz: 7, a: 0.2, wob: 30 }));
    if (t > EV.pk_park && t < EV.pk_park + 0.12) whiteOut(0.4 * (1 - (t - EV.pk_park) / 0.12), '200,220,255');
  };
  DIR.parking = {
    outfit: 'iron', light: { side: 1, rim: '#ffe0a0' }, grade: ['#14244e', 0.14],
    act: () => [[S0.parking, 'suspicious'], [EV.pk_gone, 'shock'], [EV.pk_marine, 'sideeye'], [EV.pk_dig, 'talk'], [EV.pk_hit, 'awe'], [EV.pk_bury, 'smug'], [EV.pk_now, 'annoyed'], [EV.pk_park, 'laugh']],
    pose: (t, u, b) => { const dg = t > EV.pk_dig && t < EV.pk_hit, br = t > EV.pk_bury && t < EV.pk_now, sw = Math.sin(t * 20), st = t > EV.pk_park && t < EV.pk_park + 0.8;
      return Object.assign(b, { x: 410, y: 1582, s: 1.02, look: t < EV.pk_marine ? [0.9, 0.2] : t < EV.pk_now ? [0.7, 0.5] : t < EV.pk_park ? [0.6, 0.3] : [0.2, 0.1],
        hand: dg || br ? [200 + sw * 26, -250 + Math.abs(sw) * 70] : t > EV.pk_hit && t < EV.pk_bury ? [210, -330] : t < EV.pk_now ? [150, -230] : undefined, handF: t > EV.pk_now && t < EV.pk_park ? [-140, -300] : undefined,
        tilt: dg || br ? 0.12 : 0, squash: t > EV.pk_hit && t < EV.pk_hit + 0.2 ? 0.14 : st ? Math.abs(Math.sin((t - EV.pk_park) * 14)) * 0.12 : b.squash, tailUp: t > EV.pk_hit && t < EV.pk_bury, sweat: dg || br }); },
    afterCat: (t, u, P) => { if (t > EV.pk_now - 0.1 || !P.hand) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; shovelBJ(x + 20, y + 150, t > EV.pk_dig && t < EV.pk_hit || (t > EV.pk_bury) ? -0.5 + Math.sin(t * 20) * 0.3 : -0.2, 0.9); },
    cam: () => [[S0.parking, 700, 1060, 0.12], [EV.pk_gone + 0.2, 720, 1080, 0.18, 'x'], [EV.pk_marine, 600, 960, 0.0], [EV.pk_hit, 660, 1120, 0.2], [EV.pk_hit + 0.2, 640, 1100, 0.26, 'x'], [EV.pk_bury + 0.6, 620, 1040, 0.12], [EV.pk_now, 600, 980, 0.04], [EV.pk_park, 620, 960, 0.06], [EV.pk_park + 0.15, 640, 940, 0.16, 'x'], [S1.parking, 660, 940, 0.2]],
    hud
  };
  TRANS_IN.parking = { a: 0.2, b: 0.3, fx(k, t, A, B) {             // луч фонарика: кадр гаснет, круг света пробегает и раскрывает порт
    if (k < 0.4) { drawBuf(A); whiteOut(sm(k / 0.4), '4,6,14'); } else { const q = sm((k - 0.4) / 0.6); scr(() => { ctx.fillStyle = '#04060e'; ctx.fillRect(0, 0, W, H); }); const cx = lerp(-100, 600, q), cy = lerp(1500, 1000, q), R = 120 + Math.pow(q, 2) * 2200; inCircle(cx, cy, R, () => drawBuf(B)); scr(() => { pencil(ellPts(cx, cy, R, R, 0, 0, 60), { w: 14, col: '#ffe9a8', a: 0.7 * (1 - q), pass2: false }); glow(cx, cy, R * 1.2, 'rgba(255,230,160,1)', 0.25 * (1 - q)); }); }
  } };
})();
