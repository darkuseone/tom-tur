/* 021 — сцена `alzhir`: зима 1938, степь под Акмолинском. Серо-синий рассвет, позёмка. Дощатые бараки, колючая проволока, вышки,
   ворота с доской «А.Л.Ж.И.Р.»; вдоль проволоки идёт колонна женщин в ватниках и платках. У ограды — казашки из аула с узелками
   (по воспоминаниям узниц, они бросали через проволоку курт). Без оружия, крови и символики. На «АЛЖИР» доска на воротах проявляется
   и всплывает расшифровка; на «народа» — штамп-кавычки «враги народа» гаснут; на «женщин» в степи один за другим проступают
   силуэты в платках, счётчик доходит до «18 000+». Том в тулупе, без шуток. Переход В сцену — тёмная позёмка закрывает золото. */
(() => {
  EV.al_name = wtk('s5', 'АЛЖИР');
  EV.al_wives = wtk('s5', 'жён');
  EV.al_enemy = wtk('s5', 'народа');
  EV.al_num = wtk('s5', 'восемнадцати');
  EV.al_women = wtk('s5', 'женщин');
  KEYW.push('«АЛЖИР»', 'женщин.');

  function sky(t) {
    vgrad(-900, 1300, ['#1a2230', '#2e3a4c', '#5a6478', '#8a8e9a', '#b8b4b0'], 1);
    clouds(t, -560, 8, '#4a5262', 21061, 0.7); clouds(t, 0, 5, '#6a7080', 21062, 0.5); birds(t, 4, [100, -100, 1000, 300], 21063, '#14161c');
  }
  function far(t) {
    hills(1120, 22, '#6a6e7a', 21064, 1);
    for (let k = 0; k < 6; k++) { const x = -120 + k * 260; push(x, 1130, 0.5); for (const sd of [-1, 1]) pencil([[sd * 40, 0], [sd * 24, -260]], { w: 6, col: '#2a2a30', pass2: false }); rect(-50, -320, 100, 60, { wash: '#3a3a42', washA: 1, w: 1.6, col: AZ.ink }); poly([[-60, -320], [0, -360], [60, -320]], { wash: '#2a2a30', washA: 1, w: 1.6, col: AZ.ink }); pop(); }   // вышки
    for (let k = 0; k < 7; k++) barrack(-200 + k * 200, 1150, 170, 70, t, { wood: '#5a5048', roof: '#3a3a40', snow: 1 });
  }
  function camp(t) {                                               // ближний барак, ворота, проволока
    const L = AZ.ink;
    barrack(520, 1250, 560, 210, t, { wood: '#6a5a48', roof: '#3a3a42', snow: 1 });
    smokeCol(800, 920, t, { col: 'rgba(200,200,210,0.6)', h: 420, sz: 0.4, n: 6, wind: 220, sp: 0.06 }); pencil([[800, 960], [800, 900]], { w: 14, col: '#3a3430', pass2: false });
    for (const gx of [80, 380]) { pencil([[gx, 1260], [gx, 820]], { w: 16, col: '#3a3028', pass2: false }); } pencil([[60, 830], [400, 830]], { w: 14, col: '#3a3028', pass2: false });
    const q = sm((t - EV.al_name + 0.1) / 0.4); push(230, 880, 1); rect(-150, -40, 300, 80, { wash: '#c8bca8', washA: 1, w: 2.4, col: L }); txt('А.Л.Ж.И.Р.', 0, 6, 54, { col: '#2a2420', font: 'Osw', a: 0.3 + 0.7 * q }); pop();
    wire(-300, 1500, 1300, 200, t, { step: 150, col: '#2a2622', wood: '#4a3e34' });
    pencil([[-300, 1300], [1500, 1300]], { w: 10, col: '#e8eaee', a: 0.8, pass2: false });   // снег у основания
  }
  function column(t) {                                             // колонна женщин в ватниках и платках вдоль проволоки (внутри)
    const cols = ['#4a4a52', '#5a5048', '#3e4450', '#544a44'], heads = ['#a8a4a0', '#7a6a6a', '#c8c0b0', '#6a6a7a'];
    for (let i = 0; i < 9; i++) { const x = 1300 - ((t * 26 + i * 120) % 1500), sc = 0.36;
      human(x, 1232, sc, t, { body: cols[i % 4], legs: '#2a2a2e', hat: 'scarf', hatCol: heads[i % 4], seed: 111 + i, long: 1, armL: 'down', armR: 'down', face: 'calm', flip: -1 }); }
  }
  function outside(t) {                                            // снаружи у проволоки: казашки из аула с узелками, сани, лошадь
    const L = AZ.ink;
    kman(980, 1420, 0.5, t, { body: '#5a2a3a', hat: 'scarf', hatCol: '#f2ead8', seed: 121, armR: 'up', face: 'calm', flip: -1 });
    kman(1060, 1430, 0.44, t, { body: '#3a2a4a', hat: 'scarf', hatCol: '#e8d8b8', seed: 122, armR: 'hold', face: 'calm', flip: -1 });
    human(1130, 1440, 0.3, t, { body: '#6a3a2a', legs: '#2a2a30', hat: 'fur', hatCol: '#5a4a3a', seed: 123, armL: 'hold', flip: -1 });
    if (t > EV.al_wives) { const q = clamp((t - EV.al_wives) / 1.1), x = lerp(950, 820, q), y = 1300 - Math.sin(q * Math.PI) * 220; ell(x, y, 12, 10, { wash: '#f2ead8', washA: 1, w: 1.4, col: L }); }   // курт через проволоку
    push(1180, 1480, 0.6); rect(-160, -40, 300, 30, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil(spline([[-170, -10], [-200, -40], [-190, -70]], false, 6), { w: 6, col: '#6a4a2a', pass2: false }); for (let k = 0; k < 3; k++) sack(-100 + k * 80, -40, 0.5, '#c8b08a'); pop();   // сани с мешками
    horse(1320, 1470, 0.5, t, { col: '#5a4a3a', flip: -1 });
    for (const [x, c] of [[880, '#8a6a4a'], [930, '#a8804a']]) { push(x, 1450, 0.5); blob([[-30, 0], [-36, -40], [0, -60], [36, -40], [30, 0]], { wash: c, washA: 1, w: 2, col: L }); pencil([[-10, -56], [0, -76], [10, -56]], { w: 3, col: L, pass2: false }); pop(); }   // узелки
  }
  function ghosts(t) {                                             // проступающие силуэты женщин в платках — по одному, рядами в степь
    if (t < EV.al_num - 0.2) return; const n = Math.floor(clamp((t - EV.al_num + 0.2) / 1.6) * 60);
    for (let i = 0; i < n; i++) { const row = Math.floor(i / 12), x = -120 + (i % 12) * 115 + (row % 2) * 55, y = 1330 + row * 26, s = 0.42 + row * 0.05, a = 0.32 * Math.min(1, (n - i) / 6 + 0.4);
      push(x, y, s); sil([[-26, 0], [-30, -80], [-20, -110], [-30, -120], [-18, -150], [0, -158], [18, -150], [30, -120], [20, -110], [30, -80], [26, 0]], '#2a2e3c', a * 1.5); pop(); }
  }
  function trail(t) {                                             // следы в снегу, брошенное ведро, обломок саней, жерди
    const L = AZ.ink;
    for (let k = 0; k < 14; k++) { const x = 420 + k * 60, y = 1560 + Math.sin(k * 0.8) * 30 + (k % 2) * 16; ell(x, y, 12, 6, { wash: '#a8acb8', washA: 0.8, line: false }); }
    push(640, 1640, 0.8, 0.3); poly([[-30, -60], [30, -60], [22, 0], [-22, 0]], { wash: '#6a6a74', washA: 1, w: 2, col: L }); pencil(spline([[-30, -60], [0, -100], [30, -60]], false, 6), { w: 3, col: L, pass2: false }); pop();
    for (let k = 0; k < 3; k++) pencil([[820 + k * 40, 1700], [980 + k * 30, 1600]], { w: 10, col: '#4a3e34', pass2: false });
    push(160, 1700, 0.9); rect(-100, -30, 200, 26, { wash: '#5a4a3a', washA: 1, w: 2, col: L }); pencil(spline([[-110, -10], [-140, -40], [-130, -70]], false, 6), { w: 6, col: '#5a4a3a', pass2: false }); pop();
    for (let i = 0; i < 6; i++) kovyl(80 + i * 190, 1780 + (i % 2) * 40, 1.2, t, { col: '#d8d4cc' });
  }
  function front(t) {
    const L = '#0e0a06'; pencil([[1180, 2200], [1150, 600]], { w: 26, col: '#2a2420', pass2: false }); for (let k = 0; k < 6; k++) { const y = 700 + k * 110; pencil([[1040, y], [1300, y + 10]], { w: 3, col: '#2a2420', pass2: false }); for (let q = 0; q < 4; q++) { const bx = 1060 + q * 60; pencil([[bx - 8, y - 8], [bx + 8, y + 8]], { w: 2.4, col: L, pass2: false }); pencil([[bx - 8, y + 8], [bx + 8, y - 8]], { w: 2.4, col: L, pass2: false }); } }
    blob([[-200, 2200], [-180, 1700], [-60, 1650], [80, 1700], [100, 2200]], { wash: '#e0e2e8', washA: 1, w: 2, col: '#5a5e6a' });
  }
  function hud(t) {
    if (t > EV.al_name && t < EV.al_num - 0.15) { const q = popK(t, EV.al_name, 0.35); push(600, 1000, q, -0.03); rect(-330, -80, 660, 160, { wash: '#efe8da', washA: 0.96, w: 3, col: AZ.ink }); txt('Акмолинский лагерь', 0, -28, 46, { col: '#14100a', font: 'Hand' }); txt('жён изменников Родины', 0, 34, 46, { col: '#14100a', font: 'Hand' }); pop(); }
    if (t > EV.al_num - 0.1) { const f = clamp((t - EV.al_num + 0.1) / 1.4), n = Math.round(18000 * sm(f)); push(640, 820, 1); rect(-210, -60, 420, 120, { wash: '#14100a', washA: 0.88, w: 3, col: '#c8c0b0' }); txt(n.toLocaleString('ru-RU').replace(/,/g, ' ') + (f >= 1 ? '+' : ''), 0, 6, 76, { col: '#f2ead8', font: 'Osw' }); pop(); }
  }

  WORLD.alzhir = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(5, () => { steppeGround(1250, t, { snow: '#d8dce4', snowA: 0.92, tufts: 10, wind: 1.6, seed: 21065 }); camp(t); column(t); });
    lay(3.5, () => ghosts(t));
    lay(2, () => outside(t));
    lay(1, () => { trail(t); cat(); });
    lay(0.62, () => front(t));
    snowfall(t, 0.7, 21066, 520); windLines(t, 0.45, [-100, 1000, 1200, 1700], 21067, '#e8eef6');
    haze('#8a92a4', 0.1);
  };
  DIR.alzhir = {
    outfit: 'tulup', light: { side: 1, rim: '#c8d0e0' }, grade: ['#5a6478', 0.25],
    act: () => [[S0.alzhir, 'neutral'], [EV.al_name, 'scared'], [EV.al_enemy, 'annoyed'], [EV.al_num, 'awe'], [EV.al_women, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1520, s: 1.04, chatter: false, frost: 0.4, look: t < EV.al_num ? [0.6, -0.4] : [0.4, -0.6], tailUp: false, nod: t > EV.al_women ? 0.1 : 0 }),
    cam: () => [[S0.alzhir, 640, 980, 0.14], [EV.al_name, 560, 940, 0.1], [EV.al_num, 600, 900, 0.0], [S1.alzhir, 600, 880, -0.04]],
    hud
  };
  TRANS_IN.alzhir = { a: 0.2, b: 0.45, fx(k, t, A, B) {             // тёмная позёмка закрывает золото и уходит, оставляя зимний лагерь
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const w = Math.sin(Math.PI * k); whiteOut(w * 0.85, '40,46,58'); motes(160, [-300, 0, 1400, 2000], '#d8e0ea', t, 21068, { sp: 300, vx: 1600, sz: 4, a: w, wob: 30, stretch: 5 }); windLines(t, w, [-100, 0, 1200, 1900], 21069, '#c8d0dc'); });
  } };
})();
