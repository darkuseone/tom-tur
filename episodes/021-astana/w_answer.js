/* 021 — сцена `answer`: 2026, тот же золотой вечер у Байтерека, что в хуке (планы window.AQ), камера ниже и ближе к шару.
   На «по-казахски» раскрывается словарная карточка «астана (каз.) — …», на «столица» в ней дописывается «СТОЛИЦА»
   и плашка-вопрос превращается в ответ (EV.answer); на «Столица!» над площадью опускается табличка «СТОЛИЦА», Том хохочет,
   пять старых табличек-имён разлетаются ветром. Переход В сцену — табличка разворачивается на столбе (ось Y): Бозок → сегодня. */
(() => {
  EV.an_kaz = wtk('a1', 'по-казахски');
  EV.answer = wtk('a1', 'столица');
  EV.an_city = wtk('a1', 'зовут');
  { const c = CAPS.find(c => c.key === 'a1' && c.words.some(w => w.startsWith('зовут'))); EV.an_cap = c ? c.t0 + (c.t1 - c.t0) * (c.words.slice(0, -1).join(' ').length + 1) / (c.words.join(' ').length + 1) : LF('a1', 0.85); }   // второе «Столица!»
  KEYW.push('«столица».', 'Столица!');
  SHAKES.push([EV.an_cap, 0.25, 7]);
  const NAMES = ['АКМОЛИНСК', 'ЦЕЛИНОГРАД', 'АКМОЛА', 'НУР-СУЛТАН'], COLS = ['#6a4a2a', '#b8302a', '#3a5a3a', '#2a3a6a'];

  function dict(t) {                                               // словарная карточка (HUD)
    if (t < EV.an_kaz - 0.05) return; const q = popK(t, EV.an_kaz - 0.05, 0.35), out = sm((t - EV.an_cap + 0.1) / 0.3); if (out >= 1) return;
    push(620, 900 - out * 200, q * (1 - out), -0.03); rect(-300, -130, 600, 260, { wash: '#f6eedc', washA: 1, w: 3, col: AZ.ink }); pencil([[-260, -40], [260, -40]], { w: 2, col: '#b8302a', a: 0.6, pass2: false });
    txt('астана́ (каз.)', -60, -80, 50, { col: '#14100a', font: 'Hand' }); txt('— сущ.', 190, -80, 36, { col: '#6a5a4a', font: 'Hand' });
    if (t > EV.answer - 0.05) { const r = clamp((t - EV.answer + 0.05) / 0.45); txt('СТОЛИЦА', 0, 40, 96, { col: '#b8302a', font: 'Osw', reveal: r }); }
    pop();
  }
  function bigSign(t) {                                            // табличка «СТОЛИЦА» опускается над площадью
    if (t < EV.an_cap - 0.15) return; const q = sm((t - EV.an_cap + 0.15) / 0.35), sw = Math.sin((t - EV.an_cap) * 8) * 0.04 * Math.exp(-(t - EV.an_cap) * 2);
    push(640, lerp(200, 780, q), 1, sw); for (const sd of [-1, 1]) pencil([[sd * 240, -60], [sd * 200, -700]], { w: 4, col: '#3a3430', pass2: false });
    rect(-320, -80, 640, 160, { wash: AZ.turq, washA: 1, w: 4, col: AZ.ink }); pencil([[-304, -64], [304, -64], [304, 64], [-304, 64], [-304, -64]], { w: 3, col: AZ.gold, pass2: false }); txt('СТОЛИЦА', 0, 8, 110, { col: '#f6ecd6', font: 'Osw' }); pop();
    if (t < EV.an_cap + 0.8) for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283, d = (t - EV.an_cap) * 700; ell(640 + Math.cos(a) * d, 780 + Math.sin(a) * d * 0.5, 9, 9, { wash: i % 2 ? AZ.gold : '#ffffff', washA: clamp(1 - (t - EV.an_cap) / 0.8), line: false }); }
  }
  function blown(t) {                                              // старые таблички улетают ветром
    if (t < EV.an_city - 0.1) return;
    NAMES.forEach((n, i) => { const k = clamp((t - EV.an_city + 0.1 - i * 0.1) / 1.2); if (k <= 0 || k >= 1) return;
      push(260 + i * 120 + k * 1300, 1100 - i * 70 - k * 500, 0.5, k * 3 + i); rect(-210, -46, 420, 92, { wash: COLS[i], washA: 1, w: 3, col: AZ.ink }); txt(n, 0, 4, 56, { col: '#f6ecd6', font: 'Osw' }); pop(); });
  }

  function plaza(t) {                                             // своё для ответа: экскурсия у Байтерека, домбрист, шары, фотограф, лоток
    const L = AZ.ink;
    crowd(560, 900, 1290, 14, t, 21093, { s: 0.36, phones: 0.5, cols: ['#2a5a6a', '#6a3a5a', '#3a3a4a', '#c8302a', '#1e8a92'] });
    human(940, 1300, 0.4, t, { body: '#e8a83a', legs: '#2a2a30', hat: 'cap', hatCol: AZ.turq, seed: 161, armR: 'up', prop: 'stick', flip: -1 });      // гид с флажком
    const F = []; for (let q = 0; q <= 6; q++) F.push([948 + q * 8, 1150 + Math.sin(t * 6 + q) * 3]); shape(F.concat(F.map(([x, y]) => [x, y + 30]).reverse()), { wash: AZ.turq, washA: 1, w: 1.2, col: L });
    kman(1110, 1380, 0.48, t, { body: '#5a2a3a', hat: 'fur', hatCol: '#3a2410', seed: 162, armL: 'hold', armR: 'swing', flip: -1 });     // домбрист
    push(1060, 1330, 0.48); blob([[-20, 0], [-36, -30], [-20, -60], [20, -60], [36, -30], [20, 0]], { wash: '#a8602a', washA: 1, w: 2, col: L }); pencil([[0, -60], [-10, -260]], { w: 8, col: '#6a3a1a', pass2: false }); pencil([[-4, -60], [-12, -250]], { w: 1.2, col: '#f2ead8', pass2: false }); pop();
    for (let k = 0; k < 3; k++) { const n = 0.5 + 0.5 * Math.sin(t * 6 + k); txt('♪', 1100 + k * 30, 1180 - k * 30 - n * 20, 34, { col: AZ.gold, font: 'Osw', a: 0.8 }); }
    human(180, 1380, 0.42, t, { body: '#6a3a8a', legs: '#2a2a30', seed: 163, armL: 'up' });     // девочка с шарами
    for (let k = 0; k < 3; k++) { const bx = 150 + k * 30 + Math.sin(t * 2 + k) * 8, by = 1140 - k * 30; pencil([[176, 1310], [bx, by]], { w: 1.2, col: L, pass2: false }); ell(bx, by - 30, 26, 32, { wash: [AZ.turq, AZ.gold, '#c8302a'][k], washA: 1, w: 1.6, col: L }); }
    human(780, 1400, 0.46, t, { body: '#2a2a30', legs: '#1a1a1e', hat: 'cap', hatCol: '#c8302a', seed: 164, armL: 'up', armR: 'up', flip: -1 });   // фотограф
    push(800, 1215, 0.46); rect(-34, -22, 68, 44, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); ell(0, 0, 14, 14, { wash: '#4a6a8a', washA: 1, w: 1.4, col: L }); pop();
    if (t > EV.answer && t < EV.answer + 0.15) glow(800, 1215, 200, 'rgba(255,255,255,1)', 0.8);   // вспышка
    push(1000, 1500, 0.9); rect(-80, -100, 160, 90, { wash: AZ.turq, washA: 1, w: 2, col: L }); txt('ШҰБАТ · ҚЫМЫЗ', 0, -56, 18, { col: '#f6ecd6', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 50, -6, 14, 14, { wash: '#2a2a2a', washA: 1, w: 1.4, col: L }); pop();   // лоток кумыса
  }
  function rim(t) {                                               // средний план ответа: аллея — орнаментальные фонари, вазоны, велопрокат, самокаты, голуби
    const L = AZ.ink;
    for (const x of [380, 1000]) { pencil([[x, 1300], [x, 1050]], { w: 6, col: '#2a2a30', pass2: false }); for (const sd of [-1, 1]) { pencil(spline([[x, 1070], [x + sd * 30, 1050], [x + sd * 46, 1066]], false, 6), { w: 4, col: AZ.gold, pass2: false }); ell(x + sd * 48, 1078, 12, 16, { wash: '#fff2c8', washA: 1, w: 1.2, col: '#3a3020' }); glow(x + sd * 48, 1078, 60, 'rgba(255,214,150,1)', 0.6); } }
    for (const x of [470, 900]) { push(x, 1300, 0.6); blob([[-40, 0], [-50, -60], [50, -60], [40, 0]], { wash: '#d8d0c0', washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) ell(-40 + q * 11, -70 - (q % 3) * 8, 9, 9, { wash: ['#e8582a', '#f2c84a', AZ.turq][q % 3], washA: 1, w: 1, col: L }); pop(); }
    push(230, 1305, 0.5); rect(-120, -20, 240, 20, { wash: '#5a5a62', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 3; k++) { const bx = -80 + k * 80; for (const sd of [-1, 1]) ell(bx + sd * 22, -40, 18, 18, { wash: 'rgba(0,0,0,0)', washA: 0, w: 3, col: '#2a2a2a' }); pencil([[bx - 22, -40], [bx, -70], [bx + 22, -40]], { w: 3, col: AZ.turq, pass2: false }); } pop();   // велопрокат
    for (let k = 0; k < 2; k++) { push(1150 + k * 40, 1310, 0.5); pencil([[-20, 0], [20, 0], [14, -110]], { w: 4, col: '#2a2a2a', pass2: false }); ell(-20, 0, 8, 8, { wash: '#2a2a2a', washA: 1, line: false }); ell(20, 0, 8, 8, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }   // самокаты
  }
  WORLD.answer = (t, u, cat) => {
    lay(40, () => AQ.sky(t));
    lay(18, () => AQ.far(t));
    lay(7, () => AQ.mid(t, 1 + sm((t - EV.answer) / 0.5)));
    lay(5, () => rim(t));
    lay(1, () => { AQ.ground(t); plaza(t); cat(); });
    lay(0.62, () => AQ.front(t));
    lay(0.9, () => blown(t));
    windLines(t, 0.4 + 0.5 * sm((t - EV.an_city) / 0.4), [-100, 600, 1200, 1500], 21091);
    motes(34, [-200, 300, 1300, 1500], '#ffe0a0', t, 21015, { sp: 30, vx: 120, sz: 2.6, a: 0.5, wob: 18 });
    haze('#f0a860', 0.05);
  };
  DIR.answer = {
    outfit: 'hoodieA', light: { side: -1, rim: '#ffc88a' }, grade: ['#c08040', 0.12],
    act: () => [[S0.answer, 'smug'], [EV.an_kaz, 'talk'], [EV.answer, 'proud'], [EV.an_cap - 0.05, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1490, s: 1.08, look: t < EV.an_cap ? [0.7, -0.3] : [0.2, 0], tailUp: t > EV.answer,
      hand: t > EV.an_kaz && t < EV.an_cap ? [200, -330] : t > EV.an_cap ? [80, -230 + Math.abs(Math.sin(t * 10)) * 20] : undefined, point: t > EV.an_kaz && t < EV.an_cap ? 1 : undefined, squash: b.squash + (t > EV.an_cap ? Math.abs(Math.sin(t * 12)) * 0.03 : 0) }),
    cam: () => [[S0.answer, 620, 960, 0.2], [EV.an_kaz, 600, 940, 0.12], [EV.answer, 620, 920, 0.16, 'x'], [EV.an_cap, 600, 980, 0.1], [S1.answer, 580, 1000, 0.14]],
    hud: t => { dict(t); bigSign(t); }
  };
  TRANS_IN.answer = { a: 0.25, b: 0.35, fx(k, t, A, B) {            // табличка разворачивается на столбе: была древность — стала сегодня
    const sx = Math.abs(Math.cos(Math.PI * k)), C = k < 0.5 ? A : B;
    scr(() => { ctx.fillStyle = '#14100a'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 960); ctx.scale(Math.max(0.02, sx), 1); ctx.drawImage(C, -540, -960); ctx.restore();
      pencil([[540, 0], [540, 1920]], { w: 10 * (1 - sx), col: AZ.gold, a: 1 - sx, pass2: false }); windLines(t, 1 - sx, [-100, 200, 1200, 1700], 21092); });
  } };
})();
