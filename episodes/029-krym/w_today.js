/* 029 — сцена `today` (ответ на хук): зал Генеральной Ассамблеи ООН. Главный свет — тёплый прожектор на трибуну, второй — холодные
   экраны. Золотая стена, ряды делегатов с табличками стран, большое табло голосования (резолюция 68/262, 27.03.2014).
   Том (худи «КРЫМ») идёт к трибуне на «Так чей Крым?»; на «украинский» табло зажигается: ЗА 100 · ПРОТИВ 11 · ВОЗДЕРЖАЛИСЬ 58
   (полоски), на экране-карте Крым получает печать «УКРАИНА» (EV.answer — плашка-ответ); на «единицы» — строка
   «ПРИЗНАЛИ АННЕКСИЮ: ЕДИНИЦЫ СТРАН». Планы отдаются в window.TQ для кнопки. Переход В: табло-«перекидные таблички» (split-flap). */
(() => {
  EV.td_q = wtk('t1', 'Крым?');
  EV.answer = wtk('t1', 'украинский.');
  EV.td_un = wtk('t1', 'ООН');
  EV.td_few = wtk('t1', 'единицы.');
  KEYW.push('Крым?', 'украинский.', 'единицы.');
  const L = KR.ink, SPOT = [420, 300];
  const vote = t => clamp((t - EV.td_un) / 0.9);
  function wall(t) {                                                 // золотая стена зала, потолок со светильниками
    vgrad(-900, 1300, ['#2a2418', '#6a5228', '#b8903a', '#d8b050'], 1); for (let i = 0; i < 26; i++) pencil([[-500 + i * 80, -200], [-500 + i * 80, 1300]], { w: 3, col: '#8a6a28', a: 0.5, pass2: false });
    for (let i = 0; i < 9; i++) { const x = -300 + i * 200; ell(x, 160, 40, 12, { wash: '#fff4d8', washA: 1, line: false }); glow(x, 170, 60, 'rgba(255,240,200,1)', 0.25); }
    txt('ГЕНЕРАЛЬНАЯ АССАМБЛЕЯ ООН', 540, 440, 44, { col: '#3a2a10', font: 'Osw', a: 0.8 }); }
  function rows(t) {                                                 // дальние ряды делегатов
    for (let r = 0; r < 3; r++) { rect(-500, 1150 + r * 70, 2200, 30, { wash: '#2a5a4a', washA: 1, w: 1.4, col: L }); crowd(-480, 1600, 1150 + r * 70, 28, t, 5800 + r, { s: 0.42 + r * 0.06, cols: ['#2a2a36', '#3a2e3a', '#28343a', '#4a3a30', '#3a3a2a'] }); } }
  function board(t) {                                                // табло голосования + экран-карта
    push(560, 1070, 1); rect(-330, -400, 660, 420, { wash: '#0e1418', washA: 1, w: 4, col: '#8a8a8a' });
    txt('РЕЗОЛЮЦИЯ 68/262 · 27.03.2014', 0, -360, 30, { col: '#c8d8e8', font: 'Osw' }); txt('ТЕРРИТОРИАЛЬНАЯ ЦЕЛОСТНОСТЬ УКРАИНЫ', 0, -322, 26, { col: '#ffe08a', font: 'Osw' });
    const v = vote(t); [['ЗА', 100, '#3ac86a'], ['ПРОТИВ', 11, '#e84a3a'], ['ВОЗДЕРЖАЛИСЬ', 58, '#e8c040']].forEach(([n, c, col], i) => { const y = -240 + i * 80, k = clamp(v * 1.4 - i * 0.2);
      txt(n, -310, y, 30, { col: '#e8e8e8', font: 'Osw', align: 'left' }); rect(-110, y - 22, 170 * (c / 100) * k + 2, 44, { wash: col, washA: 1, line: false }); txt(String(Math.round(c * k)), 130, y, 44, { col, font: 'Osw', align: 'right' }); });
    pencil([[150, -280], [150, -60]], { w: 2, col: '#5a6a7a', pass2: false }); crimeaMap(240, -190, 62, { w: 2, land: '#e8d090', shade: false, noMount: true }); if (t > EV.answer - 0.05) stamp(240, -100, 0.32, 'УКРАИНА', KR.ua, -0.12, popK(t, EV.answer - 0.05, 0.25), { size: 60 });
    if (t > EV.td_few - 0.05) { const k = popK(t, EV.td_few - 0.05, 0.3); push(0, -20, k); rect(-310, -30, 620, 60, { wash: '#3a0e0e', washA: 1, w: 2, col: '#e84a3a' }); txt('ПРИЗНАЛИ АННЕКСИЮ: ЕДИНИЦЫ СТРАН', 0, 0, 30, { col: '#ffb0a0', font: 'Osw' }); pop(); }
    pop();
  }
  function desks(t) {                                                // ближние столы с табличками стран, делегаты
    rect(-500, 1360, 2200, 70, { wash: '#3a6a5a', washA: 1, w: 2, col: L });
    const N = ['ПОЛЬША', 'ГЕРМАНИЯ', 'ЯПОНИЯ', 'УКРАИНА', 'КАНАДА', 'ТУРЦИЯ', 'МОЛДОВА', 'БРАЗИЛИЯ'];
    N.forEach((n, i) => { const x = -280 + i * 230; human(x, 1370, 0.6, t, { body: ['#1e2a3a', '#2a2a30', '#3a3a40', '#1e3a5a', '#2a2a3a', '#4a2a2a', '#2a3a2a', '#3a2a40'][i], trim: '#c8c8d0', legs: '#1e1e24', hair: ['#c8c8c8', '#3a2a1a', '#1a1a1a', '#8a6a4a', '#d8b878', '#1a1a1a', '#6a4a2a', '#2a1a10'][i], armR: vote(t) > 0 && i % 2 ? 'up' : 'hold', seed: 5810 + i, face: 'calm', flip: x > 600 ? -1 : 1 });
      rect(x - 60, 1380, 120, 34, { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); txt(n, x, 1397, 18, { col: L, font: 'Osw' }); });
  }
  function podium(t) {                                               // трибуна, ковёр, микрофон, прожектор
    rect(-500, 1430, 2200, 900, { wash: '#1e3a6a', washA: 1, w: 2, col: L }); for (let i = 0; i < 20; i++) pencil([[-500 + i * 110, 1430], [-560 + i * 120, 1950]], { w: 1.4, col: '#14284a', a: 0.6, pass2: false });
    lightPool(SPOT[0] + 120, 1660, 520, 140, 'rgba(255,230,170,1)', 0.55); shaft(SPOT[0] + 120, -100, 260, 1800, 0.05, 'rgba(255,236,190,1)', 0.12);
    push(640, 1640, 1); shape([[-160, 0], [-130, -280], [130, -280], [160, 0]], { wash: '#2a6a5a', washA: 1, w: 2.6, col: L, shade: { gap: 6, a: 0.25, col: '#0e3a2a', ang: 1.3 } }); rect(-170, -300, 340, 30, { wash: '#3a8a6a', washA: 1, w: 2, col: L });
    pencil([[-40, -300], [-60, -400]], { w: 4, col: '#2a2a30', pass2: false }); ell(-62, -408, 10, 14, { wash: '#2a2a30', washA: 1, line: false }); ell(0, -150, 60, 60, { line: true, w: 4, col: KR.goldL }); pop();
    push(1100, 1760, 1); rect(-70, -60, 140, 60, { wash: '#6a4424', washA: 1, w: 2, col: L }); ell(-30, -76, 20, 20, { wash: '#c8e0f0', washA: 0.7, w: 1.4, col: L }); for (let q = 0; q < 3; q++) rect(10 + q * 12, -90, 10, 30, { wash: '#f4f0e8', washA: 1, w: 1, col: L }); pop();
    push(-40, 1780, 1); rect(-60, -100, 120, 100, { wash: '#2a2a30', washA: 1, w: 2, col: L }); glow(0, -60, 40, 'rgba(160,210,255,1)', 0.3); pop();
    castShadow(330, 1612, 120, 480, 0.5, 0.4); moodDark(SPOT[0], 900, 900, 1800, '#060a14', 0.35);
  }
  function mapScreen(t) {                                            // экран-карта Крыма: печать «УКРАИНА» на ответе
    push(960, 760, 1); rect(-200, -160, 400, 300, { wash: '#14202a', washA: 1, w: 3, col: '#8a8a8a' }); crimeaMap(0, -10, 180, { w: 2, land: '#e8d090', shade: false });
    if (t > EV.answer - 0.05) stamp(0, 0, 0.7, 'УКРАИНА', KR.ua, -0.12, popK(t, EV.answer - 0.05, 0.25), { size: 64 }); pop();
  }
  function press(t) {                                                // пресса: фотографы со вспышками, телекамера на штативе, кабины переводчиков над рядами
    for (const [x, f] of [[1180, -1], [1290, -1], [-120, 1]]) { human(x, 1430, 0.66, t, { body: '#2a2a30', legs: '#1e1e24', hat: 'cap', hatCol: '#14141a', armR: 'up', seed: 5850 + x, face: 'calm', flip: f }); if (Math.sin(t * 6 + x) > 0.93) glow(x + 40 * f, 1180, 70, 'rgba(255,255,255,1)', 0.75); }
    push(1060, 1430, 0.7); for (const k of [-40, 0, 40]) pencil([[0, -170], [k, 0]], { w: 5, col: '#1a1a1e', pass2: false }); rect(-60, -240, 120, 70, { wash: '#2a2a30', washA: 1, w: 2, col: L }); ell(-70, -205, 20, 24, { wash: '#4a6a8a', washA: 1, w: 1.6, col: L }); ell(40, -232, 6, 6, { wash: '#ff3a3a', washA: 1, line: false }); pop();
  }
  function front(t) { push(540, 2000, 1); rect(-700, -160, 1400, 160, { wash: '#2a1e14', washA: 1, w: 2, col: '#000' }); for (const x of [-500, 420]) { pencil([[x, -160], [x + 30, -300]], { w: 5, col: '#1a1a1e', pass2: false }); ell(x + 32, -306, 10, 14, { wash: '#1a1a1e', washA: 1, line: false }); } pop(); }
  window.TQ = { wall, rows, board, desks, podium, mapScreen, press, front };
  WORLD.today = (t, u, cat) => {
    lay(30, () => wall(t)); lay(10, () => rows(t)); lay(3.6, () => board(t)); lay(2.6, () => press(t)); lay(2.2, () => desks(t)); lay(1, () => { podium(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [-100, 600, 1200, 1500], '#fff4d8', t, 5830, { sp: 2, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieKR', light: { side: -1, rim: '#ffe8b0' }, grade: ['#1a2a4a', 0.06],
    act: () => [[S0.today, 'suspicious'], [EV.td_q, 'talk'], [EV.answer, 'proud'], [EV.td_few, 'sideeye']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.1), x = lerp(120, 380, sm(w1));
      return Object.assign(b, { x, y: 1612, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: t > EV.answer - 0.1 ? [0.7, -0.8] : [0.9, -0.2], hand: t > EV.answer && t < EV.td_few ? [190, -440] : [150, -300], point: t > EV.answer && t < EV.td_few, tailUp: t > EV.answer }); },
    cam: () => [[S0.today, 560, 900, -0.12], [EV.td_q, 520, 960, -0.06], [EV.td_un - 0.1, 560, 920, 0.0], [EV.answer, 600, 880, 0.08, 'x'], [EV.td_few - 0.1, 580, 940, 0.06], [EV.td_few + 0.2, 560, 960, 0.1, 'x'], [S1.today, 560, 980, 0.12]]
  };
  TRANS_IN.today = { a: 0.06, b: 0.42, fx(k, t, A, B) {             // перекидное табло: полосы-таблички переворачиваются по очереди
    const n = 16; scr(() => { for (let i = 0; i < n; i++) { const kk = clamp(k * 1.6 - i / n * 0.6), y0 = i * H / n, h = H / n, s = Math.abs(Math.cos(kk * Math.PI)), img = kk < 0.5 ? A : B;
      ctx.save(); ctx.beginPath(); ctx.rect(0, y0, W, h + 1); ctx.clip(); ctx.translate(0, y0 + h / 2); ctx.scale(1, Math.max(0.02, s)); ctx.drawImage(img, 0, -(y0 + h / 2)); ctx.restore(); if (s < 0.9) { ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, y0 + h / 2 - 2, W, 4); } } }); } };
})();
