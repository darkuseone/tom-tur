/* 025 — сцена `castle`: 1984, Замковая площадь в день открытия залов. Королевский замок (лососевый фасад, часовая башня с медным шпилем),
   слева колонна Сигизмунда, леса снимают с правого крыла, очередь людей с цветами, туристы с плёночными «Зенитами», фотограф на треноге,
   красно-белая лента у входа, транспарант. Том в камзоле-экскурсоводе.
   На «средневековье» над туристами всплывает бирка «СРЕДНЕВЕКОВЬЕ?» и перечёркивается; на «открыли» часы на башне трогаются с 11:15
   (на этом времени они остановились 17.09.1939), лента рвётся, голуби взлетают; на «восемьдесят четвёртом» штамп «1971 → 1984»;
   на «пожертвования» Том бросает монету в ящик «НА ЗАМОК» — из щели вылетает горсть монет, на табло растёт сумма.
   Главный свет — солнце слева сверху (тёплое, тени вправо), второй — холодная тень под аркой. Переход В сцену — рама из отмотки
   пролетает сквозь кадр, внутри неё открывается площадь. */
(() => {
  EV.ca_mid = wtk('s1', 'средневековье.');
  EV.ca_open = wtk('s1', 'открыли');
  EV.ca_84 = wtk('s1', 'восемьдесят');
  EV.ca_coin = wtk('s1', 'пожертвования.');
  KEYW.push('средневековье.', 'открыли', 'пожертвования.');
  SHAKES.push([EV.ca_coin + 0.1, 0.2, 5]);
  const L = WA.ink, clockA = t => t < EV.ca_open ? 0.25 * 6.283 / 12 * 11 : 0.25 * 6.283 / 12 * 11 + (t - EV.ca_open) * 0.15;   // 11:15 → пошли
  const ribbon = t => clamp((t - EV.ca_open - 0.1) / 0.3), BX = 640, BY = 1620;
  function sky(t) { vgrad(-900, 1400, ['#5a8ac8', '#8ab8e0', '#d8e4e8', '#f0d8b0'], 1); cloudsWA(t, -200, 6, '#ffffff', 2541, 0.8, 7); birdsWA(t, 5, [-100, 100, 1200, 500], 2542); glow(-80, 140, 240, 'rgba(255,236,190,1)', 0.3); }
  function far(t) {                                                  // Висла и Прага за замком: крыши, мост, дальние шпили
    sil([[-700, 1100], [-700, 900], [-400, 880], [-200, 900], [0, 870], [200, 900], [520, 860], [900, 900], [1200, 870], [1600, 900], [1700, 1100]], '#8aa0b0', 1);
    for (const [x, h] of [[-300, 140], [1000, 180], [1300, 120]]) { sil([[x - 14, 900], [x - 10, 900 - h], [x, 900 - h - 50], [x + 10, 900 - h], [x + 14, 900]], '#7a90a4', 1); }
    depthFog('#d0dce4', 0.06); }
  function castle(t) {                                               // Королевский замок, леса на правом крыле, транспарант
    castleW(560, 1240, 1.06, { hands: clockA(t) });
    const sk = clamp((t - EV.ca_open) / 1.2); if (sk < 1) { push(0, -sk * 200, 1); for (let i = 0; i <= 4; i++) pencil([[820 + i * 70, 1240], [820 + i * 70, 960]], { w: 5, col: '#8a6a3a', pass2: false }); for (let j = 0; j < 5; j++) { pencil([[810, 1240 - j * 66], [1110, 1240 - j * 66]], { w: 6, col: '#8a6a3a', pass2: false }); rect(810, 1234 - j * 66, 300, 6, { wash: '#b89060', washA: 1, w: 1, col: L }); } pop(); }
    push(560, 1120, 1); rect(-170, -26, 340, 52, { wash: '#f4ecd8', washA: 1, w: 2.2, col: L }); txt('ZAMEK KRÓLEWSKI', 0, 8, 32, { col: '#a8231c', font: 'Osw' }); pop();
    for (const x of [460, 660]) { pencil([[x, 1240], [x, 1060]], { w: 4, col: L, pass2: false }); const wv = Math.sin(t * 5 + x) * 6; shape([[x, 1060], [x + 70, 1066 + wv], [x + 70, 1090 + wv], [x, 1084]], { wash: '#f4f4f0', washA: 1, w: 1.6, col: L }); shape([[x, 1084], [x + 70, 1090 + wv], [x + 70, 1114 + wv], [x, 1108]], { wash: '#d8282a', washA: 1, w: 1.6, col: L }); }
    castShadow(560, 1240, 900, 80, 0.2, 0.25); }
  function column(t) { columnZ(80, 1330, 0.9, {}); castShadow(80, 1330, 220, 460, 0.35, 0.35); }
  function square(t) {                                               // очередь у входа, фотограф, туристы, голуби, торговка цветами
    rect(-1400, 1240, 3900, 1600, { wash: '#a89478', washA: 1, line: false }); cobbles(-1400, 2500, 1250, 2700, '#9a8468', '#6a5a46', 2543, 1);
    lightPool(300, 1500, 900, 200, 'rgba(255,230,180,1)', 0.25);
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a30', seed: sd }, ex));
    for (let i = 0; i < 7; i++) P(500 + i * 62, 1330 + (i % 2) * 10, 0.58, 2544 + i, ['#6a5a48', '#3a4a6a', '#7a3a3a', '#4a5a3a', '#8a6a4a', '#3a3a4a', '#6a4a5a'][i], { flip: -1, hat: i % 3 === 0 ? 'fur' : i % 3 === 1 ? 'cap' : null, hatCol: '#3a2a20', look: [-0.3, -0.5], armR: i === 2 ? 'hold' : null, prop: i === 2 ? 'candle' : null });
    P(-100, 1380, 0.66, 2551, '#4a4a3a', { armR: 'up', look: [0.4, -0.6], hat: 'cap', hatCol: '#2a2a2a' }); rect(-150, 1210, 50, 30, { wash: '#1a1a1a', washA: 1, w: 1.4, col: L });   // турист с «Зенитом» над головой
    P(1180, 1390, 0.68, 2552, '#8a3a2a', { flip: -1, hair: '#c8a060', face: 'smile', armR: 'hold' }); for (let i = 0; i < 4; i++) ell(1150 + i * 14, 1250 - i * 6, 10, 10, { wash: ['#e84a3a', '#f8f0e0', '#e84a3a', '#f8f0e0'][i], washA: 1, w: 1, col: L });
    push(260, 1400, 0.9); for (const k of [-30, 0, 30]) pencil([[0, -170], [k, 0]], { w: 3, col: '#2a2a2a', pass2: false }); rect(-30, -220, 60, 50, { wash: '#2a2a2a', washA: 1, w: 1.6, col: L }); ell(0, -196, 14, 14, { wash: '#5a7aa8', washA: 1, w: 1.4, col: L }); pop();
    P(220, 1404, 0.62, 2553, '#5a5a6a', { armR: 'hold', look: [0.4, -0.1], hat: 'cap', hatCol: '#5a3a2a' });
    if (t > EV.ca_mid - 0.1) { const q = popK(t, EV.ca_mid - 0.1, 0.3); push(300, 1060, q, -0.05); rect(-150, -36, 300, 72, { wash: '#f8f0d8', washA: 0.95, w: 2.4, col: L }); txt('СРЕДНЕВЕКОВЬЕ?', 0, 10, 36, { col: WA.brickD, font: 'Osw' }); if (t > EV.ca_open) pencil([[-140, 18], [140, -14]], { w: 7, col: '#d8282a', pass2: false }); pop(); }
    for (let i = 0; i < 5; i++) { const fl = t > EV.ca_open ? (t - EV.ca_open) * 500 : 0; pigeon(720 + i * 50 + fl * (i % 2 ? 0.8 : -0.4), 1440 - fl * 0.9, 0.9, t, i + 3); }
    // лента у входа
    const rb = ribbon(t); pencil([[440, 1290], [lerp(560, 500, rb), 1300 + rb * 40]], { w: 7, col: '#d8282a', pass2: false }); pencil([[680, 1290], [lerp(560, 620, rb), 1300 + rb * 40]], { w: 7, col: '#d8282a', pass2: false }); for (const x of [440, 680]) { pencil([[x, 1340], [x, 1280]], { w: 5, col: WA.goldD, pass2: false }); ell(x, 1276, 8, 8, { wash: WA.gold, washA: 1, line: false }); }
    lampWA(-260, 1420, 0.9, t, 0); lampWA(1300, 1420, 0.9, t, 0); }
  function plane(t) {                                                // ящик пожертвований, табло суммы, монеты; тени
    lightPool(450, 1680, 520, 120, 'rgba(255,226,170,1)', 0.35); castShadow(360, 1640, 170, 380, 0.3, 0.4); castShadow(BX, 1640, 140, 260, 0.3, 0.35);
    rect(BX - 80, BY - 170, 160, 170, { wash: '#7a3a20', washA: 1, w: 3, col: L, shade: { gap: 10, a: 0.25, col: '#2a0e06', ang: 1.2 } }); rect(BX - 90, BY - 186, 180, 20, { wash: '#5a2a14', washA: 1, w: 2.4, col: L }); rect(BX - 34, BY - 184, 68, 8, { wash: '#0a0604', washA: 1, line: false });
    rect(BX - 66, BY - 130, 132, 60, { wash: '#f4ecd8', washA: 1, w: 1.8, col: L }); txt('NA ZAMEK', BX, BY - 92, 26, { col: WA.brickD, font: 'Osw' }); ell(BX, BY - 40, 16, 16, { wash: WA.gold, washA: 1, w: 1.4, col: L });
    if (t > EV.ca_coin) { const r = rng(2555); for (let i = 0; i < 9; i++) { const k = (t - EV.ca_coin - 0.15) * 1.3; if (k < 0) continue; const vx = (r() - 0.5) * 500, vy = -400 - r() * 300; const x = BX + vx * k, y = BY - 190 + vy * k + 900 * k * k; if (y > BY + 40) continue; ell(x, y, 12, 6 + 5 * Math.abs(Math.sin(t * 12 + i)), { wash: WA.gold, washA: 1, w: 1.4, col: WA.goldD }); } }
    if (t > EV.ca_coin - 0.2) { const q = popK(t, EV.ca_coin - 0.2, 0.3); push(900, 1130, q, 0.04); rect(-150, -60, 300, 120, { wash: '#16120e', washA: 0.92, w: 3, col: WA.gold }); txt('ВСЕЙ СТРАНОЙ', 0, -6, 40, { col: WA.goldL, font: 'Osw' }); txt('и эмиграцией', 0, 38, 26, { col: '#e8d8b8', font: 'Hand' }); pop(); }
    for (let i = 0; i < 5; i++) { const r = rng(2556 + i); rect(-200 + i * 40 + r() * 20, 1700 + r() * 60, 40, 8, { wash: '#d8282a', washA: 0.8, line: false }); }   // обрывки ленты/лепестки
  }
  function hud(t) {
    if (t > EV.ca_84 - 0.05 && t < EV.ca_coin) { const q = popK(t, EV.ca_84 - 0.05, 0.3), yr = Math.round(lerp(1971, 1984, sm(clamp((t - EV.ca_84) / 0.7)))); push(640, 900, q, -0.04); rect(-200, -70, 400, 140, { wash: '#16120e', washA: 0.9, w: 3, col: WA.gold }); txt('1971 → ' + yr, 0, -10, 58, { col: WA.goldL, font: 'Osw' }); txt('замок строили 13 лет', 0, 44, 30, { col: '#e8d8b8', font: 'Hand' }); pop(); }
    if (t > EV.ca_open && t < EV.ca_open + 1.4) { push(560, 760, 1, 0); txt('11:15 → пошли!', 0, 0, 34, { col: '#fff4d8', font: 'Hand', a: 1 - (t - EV.ca_open) / 1.4 }); pop(); }
  }
  function front(t) { sil([[-700, 2400], [-640, 1500], [-470, 1440], [-420, 2400]], '#1a120c', 1); for (let i = 0; i < 3; i++) ell(-560 + i * 40, 1480 - i * 20, 50, 40, { wash: '#2a3a1a', washA: 1, line: false });
    sil([[1350, 2400], [1380, 900], [1460, 880], [1520, 2400]], '#1a120c', 1); glow(1420, 900, 60, 'rgba(255,220,150,1)', 0.12); }
  WORLD.castle = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(8, () => castle(t));
    lay(6, () => square(t));
    lay(4, () => column(t));
    lay(1, () => { plane(t); cat(); });
    lay(2.4, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 2557, { sp: 5, sz: 2, a: 0.4, wob: 14, add: 1 }));
    lay(0.65, () => front(t));
    shaft(-80, 100, 300, 1700, -0.35, 'rgba(255,236,190,1)', 0.12);
  };
  DIR.castle = {
    outfit: 'kamzol', light: { side: -1, rim: '#ffe2a8' }, grade: ['#f0b070', 0.06],
    act: () => [[S0.castle, 'smug'], [EV.ca_mid, 'sideeye'], [EV.ca_open, 'awe'], [EV.ca_84, 'proud'], [EV.ca_coin, 'grin']],
    pose: (t, u, b) => { const drop = t > EV.ca_coin - 0.35 && t < EV.ca_coin + 0.3, k = clamp((t - EV.ca_coin + 0.35) / 0.35);
      return Object.assign(b, { x: 380, y: 1640, s: 1.0, look: t < EV.ca_open ? [-0.6, -0.3] : t < EV.ca_coin - 0.4 ? [0.3, -0.7] : [0.9, 0.1], point: t > EV.ca_open && t < EV.ca_84,
        hand: drop ? [lerp(200, 250, k), lerp(-380, -320, k)] : undefined, squash: drop && k > 0.95 ? 0.06 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.ca_coin - 0.35 && t < EV.ca_coin) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s + (t - EV.ca_coin + 0.35) * 200; ell(x, y, 14, 10, { wash: WA.gold, washA: 1, w: 1.4, col: WA.goldD }); } },
    cam: () => [[S0.castle, 540, 980, 0.1], [EV.ca_mid, 500, 1000, 0.04], [EV.ca_open, 560, 860, 0.0], [EV.ca_84, 600, 920, 0.06], [EV.ca_coin, 600, 1120, 0.08], [S1.castle, 600, 1140, 0.1]],
    hud
  };
  TRANS_IN.castle = { a: 0.1, b: 0.32, fx(k, t, A, B) {            // рама из отмотки пролетает сквозь кадр: внутри неё — площадь, рама растёт за края
    drawBuf(A); const s = 0.25 + Math.pow(k, 1.6) * 3.2, w = 520 * s, h = 680 * s, cx = 540, cy = 900;
    scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(cx - w / 2, cy - h / 2, w, h); ctx.clip(); drawBuf(B); ctx.restore(); frameG(cx, cy, w, h, { b: 46 * s }); if (k < 0.25) whiteOut(0.6 * (1 - k / 0.25), '255,242,200'); });
  } };
})();
