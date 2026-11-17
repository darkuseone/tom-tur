/* 029 — сцена `ekat`: 1783, дворцовый зал. Главный свет — высокие окна слева (тёплое утро), второй — свечи. За окнами море
   и фрегаты нового Черноморского флота. В центре — шахматный стол: доска-карта Крыма, на ней зелёная фигура (Османы) и золотая
   «КРЫМ». Екатерина II у стола, вокруг гвардейцы, фрейлины, секретарь с пером, борзая. Том (камзол) входит шагом.
   На «отыгралась» белый конь Екатерины сбивает зелёную фигуру; на «независимым» золотую фигуру ставят отдельно с биркой
   «НЕЗАВИСИМ · 1774»; на «забрала» Екатерина забирает её в ладонь, разворачивается свиток «МАНИФЕСТ 1783» и падает
   печать «ИМПЕРИЯ». Переход В: свиток-манифест разматывается сверху вниз и открывает зал. */
(() => {
  EV.ek_play = wtk('s4', 'отыгралась:');
  EV.ek_ind = wtk('s4', 'независимым');
  EV.ek_nine = wtk('s4', 'девять');
  EV.ek_take = wtk('s4', 'забрала');
  KEYW.push('отыгралась:', '«независимым»', 'себе.');
  const L = KR.ink, TX = 640, TY = 1560;
  function view(t) {                                                 // за окнами: море, фрегаты, утро
    vgrad(-600, 1400, ['#6aa8d8', '#c8e0f0', '#f4e4c0'], 1); seaKR(1040, 1500, t, 5301, { glint: '#fff4d0', gx: 300, n: 30 });
    shipKR(200 - (t * 10) % 200, 1120, 0.32, t, 'frigate', 1); shipKR(700, 1100, 0.24, t, 'frigate', 2); shipKR(1050, 1130, 0.28, t, 'frigate', 3);
    ridgeKR(1050, 200, '#8aa0b8', 5302); }
  function hall(t) {                                                 // стена с арочными окнами (куски вокруг проёмов), пилястры, портреты, люстра
    const WX = [-260, 140, 940, 1340], wt = 560, wb = 1200;
    rect(-700, -400, 2500, wt + 400, { wash: '#e8d8b8', washA: 1, w: 2, col: L }); rect(-700, wb, 2500, 500, { wash: '#e8d8b8', washA: 1, w: 2, col: L });
    for (let i = 0; i <= WX.length; i++) { const x0 = i ? WX[i - 1] + 220 : -700, x1 = i < WX.length ? WX[i] : 1800; rect(x0, wt, x1 - x0, wb - wt, { wash: '#e8d8b8', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.1, col: '#a89070', ang: 1.4 } }); }
    WX.forEach(x => { pencil([[x, wb], [x, wt + 110], [x + 110, wt], [x + 220, wt + 110], [x + 220, wb]], { w: 8, col: KR.gold, pass2: false }); pencil([[x + 110, wt + 10], [x + 110, wb]], { w: 5, col: '#f4ecdc', pass2: false }); pencil([[x, wt + 420], [x + 220, wt + 420]], { w: 5, col: '#f4ecdc', pass2: false });
      shape([[x - 60, wt - 30], [x + 10, wt - 30], [x + 30, wb + 40], [x - 50, wb + 60]], { wash: '#8a1a2a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#3a0a10', ang: 1.57 } });
      shaft(x + 110, wt + 200, 200, 900, -0.5, 'rgba(255,240,200,1)', 0.12); });
    for (const x of [440, 740]) { rect(x - 90, 640, 180, 230, { wash: '#6a4a2a', washA: 1, w: 3, col: KR.gold }); blob([[x - 70, 720], [x - 60, 650], [x, 630], [x + 60, 650], [x + 70, 720], [x + 50, 780], [x - 50, 780]], { wash: '#e8e4dc', washA: 1, w: 1.6, col: L }); ell(x, 735, 46, 56, { wash: '#e2b48e', washA: 1, w: 1.6, col: L }); for (const k of [-16, 16]) ell(x + k, 725, 5, 6, { wash: '#2a1a10', washA: 1, line: false }); pencil([[x - 12, 760], [x + 12, 762]], { w: 2.4, col: '#8a3a2a', pass2: false }); rect(x - 60, 790, 120, 70, { wash: x < 600 ? '#2a3a6a' : '#6a1a2a', washA: 1, w: 1.4, col: L }); }
    push(600, 380, 1); pencil([[0, -500], [0, 0]], { w: 4, col: KR.goldD || '#8a6418', pass2: false }); for (let k = -3; k <= 3; k++) { pencil([[0, 0], [k * 60, 60]], { w: 4, col: KR.gold, pass2: false }); ell(k * 60, 50, 8, 14, { wash: '#fff4d8', washA: 1, line: false }); glow(k * 60, 30, 30, 'rgba(255,220,150,1)', 0.25); } pop();
  }
  function court(t) {                                                // придворные: гвардейцы, фрейлины, секретарь, Потёмкин
    const P = [[60, '#1e5a2a', 'tricorn', 'spear', 'calm'], [180, '#1e5a2a', 'tricorn', 'spear', 'calm'], [470, '#c87a9a', 'bun', 'hold', 'smile'], [570, '#7ab0d8', 'bun', 'wave', 'smile'], [1000, '#2a2a5a', 'tricorn', 'point', 'grin'], [1120, '#5a3a2a', null, 'hold', 'calm'], [1240, '#1e5a2a', 'tricorn', 'spear', 'calm']];
    P.forEach(([x, c, h, a, f], i) => human(x, 1420, 0.66, t, { body: c, hat: h, hatCol: '#14100a', legs: '#f0e8d8', boots: '#14100a', armR: a === 'spear' ? 'hold' : a, prop: a === 'spear' ? 'spear' : i === 5 ? 'scroll' : undefined, long: h === 'bun' ? 1 : undefined, trim: KR.gold, hair: h === 'bun' ? '#e8dcc8' : '#d8d0c0', flip: x > 700 ? -1 : 1, seed: 5310 + i, face: t > EV.ek_take && i === 4 ? 'grin' : f }));
  }
  function floor(t) {                                                // паркет, шахматный стол-карта, Екатерина, свечи, глобус, борзая
    rect(-500, 1430, 2200, 900, { wash: '#a8743a', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 18; i++) { const x = -480 + i * 120, y = 1440 + j * 60; pencil([[x, y + 30], [x + 60, y], [x + 120, y + 30], [x + 60, y + 60], [x, y + 30]], { w: 1.2, col: '#6a4420', a: 0.5, pass2: false }); }
    lightPool(TX - 200, 1640, 800, 180, 'rgba(255,236,190,1)', 0.45);
    push(TX, TY, 1); rect(-230, -40, 460, 40, { wash: '#6a3a1a', washA: 1, w: 2.4, col: L }); for (const k of [-200, 200]) pencil([[k, 0], [k * 0.9, 120]], { w: 12, col: '#4a2410', pass2: false });
    push(0, -40, 1); shape([[-200, 0], [200, 0], [160, -90], [-160, -90]], { wash: '#d8c08a', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) pencil([[-200 + i * 50, 0], [-160 + i * 40, -90]], { w: 1, col: '#8a6a3a', a: 0.5, pass2: false });
    push(0, -46, 1, 0); ctx.save(); ctx.transform(1, 0, 0, 0.42, 0, 0); crimeaMap(0, 0, 150, { w: 2, shade: false }); ctx.restore(); pop();
    const knock = clamp((t - EV.ek_play) / 0.4); push(110 + knock * 40, -60, 1, knock * 1.4); blob([[-16, 0], [-12, -50], [-20, -70], [0, -84], [20, -70], [12, -50], [16, 0]], { wash: '#2a8a4a', washA: 1, w: 1.8, col: L }); pop();
    if (t > EV.ek_play - 0.3) { const k = sm(clamp((t - EV.ek_play + 0.3) / 0.3)); push(lerp(-150, 80, k), -60 - Math.sin(k * 3.14) * 60, 1); blob([[-18, 0], [-14, -40], [-24, -70], [0, -100], [20, -80], [14, -40], [18, 0]], { wash: '#f4f0e8', washA: 1, w: 1.8, col: L }); pop(); }
    const ind = t > EV.ek_ind - 0.1, take = clamp((t - EV.ek_take) / 0.4); if (take < 1) { const x = ind ? lerp(-20, -170, sm(clamp((t - EV.ek_ind + 0.1) / 0.4))) : -20, y = ind ? lerp(-60, -40, 1) : -60; push(x + take * 260, y - take * 160, 1 - take * 0.5);
      blob([[-22, 0], [-18, -50], [-26, -70], [0, -96], [26, -70], [18, -50], [22, 0]], { wash: KR.gold, washA: 1, w: 2, col: L }); txt('КРЫМ', 0, 20, 22, { col: L, font: 'Osw' });
      if (ind && t < EV.ek_take) { const q = popK(t, EV.ek_ind, 0.3); push(0, -150, q, -0.08); rect(-110, -32, 220, 64, { wash: '#fff6e0', washA: 1, w: 2, col: L }); txt('НЕЗАВИСИМ · 1774', 0, 2, 24, { col: KR.red, font: 'Osw' }); pop(); } pop(); }
    if (t > EV.ek_nine - 0.05 && t < EV.ek_take + 0.2) { const q = popK(t, EV.ek_nine - 0.05, 0.3); push(-150, -320, q, 0.06); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-150, -40, 300, 80); ctx.restore(); txt('+ 9 ЛЕТ', 0, 4, 52, { col: KR.goldL, font: 'Osw' }); pop(); }
    pop(); pop();
    human(TX + 230, TY + 10, 1.15, t, { body: '#e8e0f0', trim: KR.gold, hat: 'crown', hatCol: KR.gold, hair: '#d8d0c8', legs: '#e8e0f0', long: 1, armR: t > EV.ek_take - 0.1 ? 'point' : t > EV.ek_play - 0.3 && t < EV.ek_play + 0.4 ? 'point' : 'hold', armL: 'hold', flip: -1, seed: 5320, face: t > EV.ek_take ? 'grin' : 'smile' });
    if (t > EV.ek_take) { const k = sm(clamp((t - EV.ek_take) / 0.5)); push(TX - 80, TY - 380, 1, -0.05); rect(-170, -(200 * k), 340, 200 * k, { wash: KR.paper, washA: 1, w: 2.4, col: L }); ell(0, 0, 175, 22, { wash: '#d8c8a0', washA: 1, w: 2, col: L });
      if (k > 0.6) { txt('МАНИФЕСТ', 0, -165, 36, { col: L, font: 'Osw' }); txt('1783', 0, -125, 30, { col: L, font: 'Osw' }); for (let q = 0; q < 3; q++) pencil([[-120, -90 + q * 20], [120, -90 + q * 20]], { w: 1.4, col: KR.paperD, pass2: false }); }
      stamp(80, -60, 0.6, 'ИМПЕРИЯ', '#8a1a1a', -0.15, popK(t, EV.ek_take + 0.45, 0.25), { size: 56 }); pop(); }
    for (const x of [-60, 1200]) { push(x, 1700, 1); rect(-20, -260, 40, 260, { wash: KR.gold, washA: 1, w: 2, col: L }); for (const k of [-40, 0, 40]) { pencil([[k, -260], [k, -300]], { w: 8, col: '#fff4e0', pass2: false }); const f = Math.sin(t * 12 + k) * 0.2 + 1; blob([[k - 6, -300], [k, -330 * f], [k + 6, -300]], { wash: '#ffb44a', washA: 1, line: false }); glow(k, -315, 26, 'rgba(255,200,120,1)', 0.35); } pop(); }
    push(1080, 1820, 1); ell(0, -80, 70, 70, { wash: '#5a8ab8', washA: 1, w: 2, col: L }); pencil(ellPts(0, -80, 70, 24, 0, 0.05, 20), { w: 1.6, col: L, a: 0.6, pass2: false }); pencil([[0, -10], [0, 40]], { w: 8, col: KR.woodD, pass2: false }); pop();
    push(260, 1780, 0.9); blob([[-120, -40], [-110, -80], [40, -90], [110, -70], [120, -40], [0, -30]], { wash: '#f0e8dc', washA: 1, w: 2, col: L }); for (const lx of [-100, -70, 80, 100]) pencil([[lx, -40], [lx, 10]], { w: 7, col: '#f0e8dc', pass2: false }); blob([[110, -70], [180, -110], [210, -90], [160, -60]], { wash: '#f0e8dc', washA: 1, w: 2, col: L }); pop();
    castShadow(330, 1612, 120, 520, 0.6, 0.4); castShadow(TX + 230, TY, 120, 420, 0.6, 0.35); moodDark(-200, 900, 1100, 1900, '#1a0e14', 0.3);
  }
  function front(t) { for (const x of [-150, 1240]) { sil([[x - 80, 2300], [x - 70, 1400], [x + 70, 1400], [x + 80, 2300]], '#2a0a10', 1); } }
  WORLD.ekat = (t, u, cat) => {
    lay(20, () => view(t)); lay(6, () => hall(t)); lay(2.4, () => court(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(1.8, () => motes(20, [-100, 600, 1200, 1500], '#fff4d8', t, 5330, { sp: 2, sz: 2.4, a: 0.45, wob: 16, add: 1 }));
  };
  DIR.ekat = {
    outfit: 'kamzol', light: { side: -1, rim: '#ffe8b0' }, grade: ['#3a2a1a', 0.06],
    act: () => [[S0.ekat, 'smug'], [EV.ek_play, 'grin'], [EV.ek_ind, 'suspicious'], [EV.ek_nine, 'sideeye'], [EV.ek_take, 'shock']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.2), x = lerp(150, 360, sm(w1));
      return Object.assign(b, { x, y: 1612, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: t > EV.ek_take ? [0.9, -0.6] : [0.9, -0.1], hand: t > EV.ek_ind && t < EV.ek_take ? [190, -380] : [150, -300], point: t > EV.ek_ind && t < EV.ek_take }); },
    cam: () => [[S0.ekat, 560, 940, -0.14], [EV.ek_play, 600, 1040, -0.02], [EV.ek_ind - 0.1, 600, 1160, 0.06], [EV.ek_ind + 0.25, 560, 1260, 0.16, 'x'], [EV.ek_take - 0.1, 580, 1200, 0.12], [EV.ek_take + 0.3, 600, 1140, 0.14, 'x'], [S1.ekat, 600, 1140, 0.16]]
  };
  TRANS_IN.ekat = { a: 0.1, b: 0.4, fx(k, t, A, B) {                // свиток-манифест разматывается сверху вниз
    const e = sm(k), Y = e * 2000; drawBuf(A); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, W, Y); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    scr(() => { if (Y < 1990) { rect(-40, Y - 40, 1160, 80, { wash: '#e8d8b0', washA: 1, w: 3, col: KR.ink }); pencil([[-40, Y], [1120, Y]], { w: 3, col: KR.paperD, pass2: false }); ell(-30, Y, 30, 40, { wash: '#c8a868', washA: 1, w: 2, col: KR.ink }); ell(1110, Y, 30, 40, { wash: '#c8a868', washA: 1, w: 2, col: KR.ink }); } }); } };
})();
