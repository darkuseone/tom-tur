/* 021 — сцена `akmola`: декабрь 1997, Акмола. Серо-розовые сумерки, мороз, панельные пятиэтажки с крышными буквами «АКМОЛА»,
   дымят трубы ТЭЦ. Колонна грузовиков «ПЕРЕЕЗД» — грузчики тащат столы, сейфы, фикус, глобус, ящики «МИНФИН», «МИД», «АРХИВ»;
   чиновники в пальто с папками. На «столица» буквы на крыше загораются и подъезжает автобус; на «могила» всплывает карточка
   «АҚ = белая, МОЛА = могила» — Том бледнеет; на «полгода» отрывной календарь листается 10.12.1997 → 06.05.1998 и на табличку
   падает красный штамп «ПЕРЕИМЕНОВАТЬ». Переход В сцену — табличка «АСТАНА» сдувается ветром, обнажая под собой старую «АКМОЛА». */
(() => {
  EV.ak_cap = wtk('s3', 'столица');
  EV.ak_in = wtk('s3', 'Акмоле');
  EV.ak_grave = wtk('s3', 'могила');
  EV.ak_half = wtk('s3', 'полгода');
  EV.ak_stamp = wtk('s3', 'переименовали');
  KEYW.push('могила».', 'переименовали.');
  SHAKES.push([EV.ak_stamp + 0.1, 0.25, 7]);

  function sky(t) {
    vgrad(-900, 1300, ['#3a3a5a', '#6a6a88', '#b89aa8', '#e8b8a0', '#f2d8c0'], 1);
    clouds(t, -560, 6, '#8a7a90', 21041, 0.6); clouds(t, 100, 4, '#d8b8b0', 21042, 0.4); birds(t, 6, [0, -200, 1100, 300], 21043, '#2a2a3a');
  }
  function far(t) {
    hills(1150, 30, '#8a8aa0', 21044, 1);
    for (let k = 0; k < 3; k++) { rect(860 + k * 90, 820, 46, 330, { wash: '#7a7484', washA: 1, w: 1.6, col: AZ.ink, a: 0.6 }); for (let q = 0; q < 4; q++) pencil([[860 + k * 90, 860 + q * 70], [906 + k * 90, 860 + q * 70]], { w: 6, col: '#c8302a', a: 0.7, pass2: false }); smokeCol(883 + k * 90, 820, t, { col: 'rgba(230,226,236,0.75)', h: 600, sz: 0.6, n: 7, wind: 360, sp: 0.06 }); }
    for (let k = 0; k < 8; k++) panel(-300 + k * 150, 1160, 130, 120 + (k % 3) * 30, t, { col: '#9a9aa8', floors: 5, seed: 410 + k });
  }
  function town(t) {                                               // ближние пятиэтажки с крышными буквами, автобус, фонари
    const lit = sm((t - EV.ak_cap) / 0.4);
    panel(-260, 1240, 420, 560, t, { col: '#c8bca8', floors: 5, seed: 421 }); panel(600, 1240, 520, 470, t, { col: '#b8b0a4', floors: 5, seed: 422 });
    const letters = 'АКМОЛА'; for (let i = 0; i < 6; i++) { const x = 680 + i * 70, y = 720; pencil([[x, y + 40], [x, y + 50]], { w: 3, col: '#3a3a3a', pass2: false }); txt(letters[i], x, y, 84, { col: lit > 0.1 ? '#ff6a4a' : '#5a4a48', font: 'Osw' }); if (lit > 0.1) glow(x, y, 70, 'rgba(255,110,80,1)', 0.45 * lit * (0.85 + 0.15 * Math.sin(t * 20 + i))); }
    pencil([[640, 770], [1080, 770]], { w: 5, col: '#3a3a3a', pass2: false });
    for (const x of [330, 520]) pole(x, 1250, 360, t, { lamp: 0.6, wood: '#5a5a62', lampCol: 'rgba(255,190,120,1)' });
    const bx = lerp(1500, 860, sm((t - EV.ak_cap) / 1.4)); push(bx, 1260, 0.9); const L = AZ.ink;          // автобус ЛиАЗ
    rect(-260, -200, 520, 170, { wash: '#e8b83a', washA: 1, w: 2.4, col: L }); rect(-260, -92, 520, 20, { wash: '#c8302a', washA: 1, line: false });
    for (let k = 0; k < 6; k++) rect(-240 + k * 82, -186, 66, 70, { wash: '#ffe0a0', washA: 1, w: 1.6, col: L }); for (const wx of [-170, 170]) ell(wx, -26, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2, col: L });
    txt('№ 1', -200, -60, 26, { col: '#14100a', font: 'Osw' }); glow(-260, -60, 80, 'rgba(255,240,200,1)', 0.6); smokeCol(250, -40, t, { col: 'rgba(240,240,250,0.6)', h: 100, sz: 0.25, n: 4, wind: 160, sp: 0.5 }); pop();
  }
  function convoy(t) {                                             // грузовик «ПЕРЕЕЗД», грузчики, чиновники, мебель
    const L = AZ.ink;
    push(820, 1380, 0.9); rect(-300, -300, 420, 260, { wash: '#4a6a5a', washA: 1, w: 2.6, col: L }); txt('ПЕРЕЕЗД', -90, -220, 48, { col: '#f2ead8', font: 'Osw' }); txt('АЛМАТЫ → АКМОЛА', -90, -160, 30, { col: '#f2c84a', font: 'Osw' });
    rect(120, -250, 140, 210, { wash: '#3a5a4a', washA: 1, w: 2.4, col: L }); rect(140, -230, 100, 70, { wash: '#a8c0c8', washA: 1, w: 2, col: L }); for (const wx of [-220, -40, 190]) ell(wx, -36, 40, 40, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); pop();
    crate(470, 1420, 120, 80, { col: '#b8905a' }); txt('МИНФИН', 530, 1385, 22, { col: '#3a2a1a', font: 'Osw' });
    crate(600, 1440, 110, 70, { col: '#a8804a' }); txt('МИД', 655, 1410, 24, { col: '#3a2a1a', font: 'Osw' });
    crate(540, 1360, 100, 60, { col: '#c8a06a' }); txt('АРХИВ', 590, 1334, 20, { col: '#3a2a1a', font: 'Osw' });
    push(1040, 1470, 0.8); rect(-70, -170, 140, 170, { wash: '#5a5a62', washA: 1, w: 2.4, col: L }); ell(0, -110, 26, 26, { wash: '#c8c4bc', washA: 1, w: 2, col: L }); txt('СЕЙФ', 0, -40, 24, { col: '#f2ead8', font: 'Osw' }); pop();
    push(980, 1490, 0.8); rect(-50, -70, 100, 70, { wash: '#8a5a3a', washA: 1, w: 2, col: L }); blob([[-40, -70], [-60, -150], [-20, -210], [10, -170], [40, -230], [60, -150], [40, -70]], { wash: '#2a6a2a', washA: 1, w: 2, col: L }); pop();   // фикус
    push(380, 1470, 0.7); ell(0, -120, 60, 60, { wash: '#4a8ab8', washA: 1, w: 2.4, col: L }); blob([[-30, -150], [10, -170], [30, -120], [0, -90], [-20, -110]], { wash: '#6aa04a', washA: 1, line: false }); pencil([[0, -60], [0, 0]], { w: 6, col: '#6a4a2a', pass2: false }); pop();   // глобус
    push(700, 1500, 0.8); rect(-90, -80, 180, 20, { wash: '#7a4a2a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) pencil([[sd * 80, -60], [sd * 80, 0]], { w: 6, col: '#5a3a1a', pass2: false }); rect(-40, -120, 80, 40, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pop();   // стол с пишмашинкой
    human(880, 1410, 0.5, t, { body: '#3a4a6a', legs: '#2a2a30', hat: 'fur', hatCol: '#3a2a1a', seed: 91, armL: 'up', armR: 'up', flip: -1 });   // грузчики со шкафом
    human(1000, 1414, 0.5, t, { body: '#4a3a2a', legs: '#2a2a30', hat: 'fur', hatCol: '#5a4a3a', seed: 92, armL: 'up', armR: 'up' });
    rect(860, 1150, 170, 90, { wash: '#8a6a4a', washA: 1, w: 2.2, col: L });
    kman(480, 1330, 0.4, t, { body: '#2a2a30', hat: 'fur', hatCol: '#2a2420', seed: 93, prop: 'scroll', armR: 'hold' });      // чиновники
    kman(560, 1326, 0.38, t, { body: '#3a3440', hat: 'fur', hatCol: '#6a5a4a', seed: 94, armL: 'point', flip: -1 });
    human(640, 1330, 0.4, t, { body: '#5a3a3a', legs: '#2a2a30', hat: 'scarf', hatCol: '#c8a0a0', seed: 95, long: 1, armR: 'hold' });
    human(420, 1324, 0.36, t, { body: '#2a3a4a', legs: '#2a2a30', hat: 'fur', hatCol: '#d8d0c0', seed: 96, armR: 'swing' });
    // флаг Казахстана на флагштоке у подъезда
    pencil([[200, 1300], [200, 900]], { w: 6, col: '#c8c4bc', pass2: false }); const F = []; for (let q = 0; q <= 10; q++) F.push([200 + q * 16, 910 + Math.sin(t * 5 + q * 0.6) * 8]); shape(F.concat(F.map(([x, y]) => [x, y + 96]).reverse()), { wash: AZ.sky, washA: 1, w: 1.6, col: AZ.ink }); ell(280, 958 + Math.sin(t * 5 + 3) * 6, 18, 18, { wash: AZ.gold, washA: 1, line: false });
  }
  function ground(t) {
    steppeGround(1250, t, { snow: '#e8e8f0', snowA: 0.92, tufts: 6, wind: 1.2, seed: 21045 });
    for (let k = 0; k < 4; k++) pencil(spline([[-200, 1520 + k * 30], [500, 1480 + k * 24], [1300, 1500 + k * 30]], false, 10), { w: 10, col: '#9a9088', a: 0.35, pass2: false });   // колеи
    for (let k = 0; k < 6; k++) ell(100 + k * 190, 1600 + (k % 2) * 40, 60, 12, { wash: '#8a8a94', washA: 0.5, line: false });   // лужи-слякоть
  }
  function hud(t) {
    if (t > EV.ak_grave - 0.05 && t < EV.ak_half) { const q = popK(t, EV.ak_grave - 0.05, 0.35); push(640, 900, q, -0.04); rect(-260, -90, 520, 180, { wash: '#f2ead8', washA: 1, w: 3, col: AZ.ink }); txt('АҚ = «белая»', 0, -30, 54, { col: '#14100a', font: 'Hand' }); txt('МОЛА = «могила»', 0, 40, 54, { col: '#b8302a', font: 'Hand' }); pop(); }
    if (t > EV.ak_half - 0.05) { const f = clamp((t - EV.ak_half) / 0.9), d = f < 1 ? ['10.12.1997', '01.1998', '02.1998', '03.1998', '04.1998', '06.05.1998'][Math.floor(f * 5.99)] : '06.05.1998';
      push(260, 760, 1, -0.05); rect(-140, -80, 280, 160, { wash: '#f2ead8', washA: 1, w: 3, col: AZ.ink }); rect(-140, -80, 280, 44, { wash: '#c8302a', washA: 1, w: 3, col: AZ.ink }); txt(d, 0, 26, 50, { col: '#14100a', font: 'Osw' }); pop(); }
    if (t > EV.ak_stamp) { const q = popK(t, EV.ak_stamp, 0.3); push(760, 820, 1.6 - 0.6 * q, -0.15); rect(-260, -60, 520, 120, { wash: 'rgba(0,0,0,0)', washA: 0, w: 8, col: '#d8262a' }); txt('ПЕРЕИМЕНОВАТЬ', 0, 6, 64, { col: '#d8262a', font: 'Osw', a: 0.92 }); pop(); }
  }
  function front(t) {
    const L = '#0e0a06'; pencil([[-80, 2200], [-60, 400]], { w: 34, col: '#2a2a30', pass2: false }); pencil(spline([[-60, 420], [40, 380], [80, 420]], false, 6), { w: 8, col: '#2a2a30', pass2: false }); glow(80, 440, 160, 'rgba(255,190,120,1)', 0.5);
    blob([[1080, 2200], [1060, 1700], [1160, 1640], [1300, 1680], [1320, 2200]], { wash: '#e8e8f0', washA: 1, w: 2, col: '#6a6a7a' });
  }

  WORLD.akmola = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => town(t));
    lay(2.5, () => { ground(t); convoy(t); });
    lay(1, () => cat());
    lay(0.65, () => front(t));
    snowfall(t, 0.6, 21046, 200);
    haze('#d8b8c0', 0.07);
  };
  DIR.akmola = {
    outfit: 'suitK', light: { side: 1, rim: '#ffc8a0' }, grade: ['#a08aa0', 0.12],
    act: () => [[S0.akmola, 'talk'], [EV.ak_cap, 'proud'], [EV.ak_grave - 0.05, 'scared'], [EV.ak_half, 'sideeye'], [EV.ak_stamp, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1520, s: 1.04, chatter: t < EV.ak_cap, look: t < EV.ak_grave ? [0.7, -0.5] : t < EV.ak_half ? [0.5, -0.2] : [0.6, -0.5],
      prop: t < EV.ak_grave ? 'scroll' : undefined, hand: t > EV.ak_cap && t < EV.ak_grave ? [200, -330] : undefined, point: t > EV.ak_cap && t < EV.ak_grave ? 1 : undefined, sweat: t > EV.ak_grave && t < EV.ak_half }),
    cam: () => [[S0.akmola, 620, 900, 0.1], [EV.ak_cap, 640, 860, 0.16], [EV.ak_grave, 560, 980, 0.2, 'x'], [EV.ak_half, 600, 940, 0.08], [EV.ak_stamp, 660, 880, 0.16], [S1.akmola, 640, 900, 0.2]],
    hud
  };
  TRANS_IN.akmola = { a: 0.2, b: 0.45, fx(k, t, A, B) {             // табличка «АСТАНА» сдувается ветром — под ней старая «АКМОЛА»
    drawBuf(B); const q = sm(k);
    scr(() => { inPath(new Path2D(`M0,0 H1080 V${1920 * (1 - q)} H0 Z`), () => drawBuf(A, 1, 540, 960, 1, null, 900 * q * q, -200 * q, 0.3 * q));
      push(540 + 1300 * q * q, 900 - 500 * q, 1.6, 0.8 * q); rect(-260, -70, 520, 140, { wash: AZ.turq, washA: 1, w: 4, col: AZ.ink }); txt('АСТАНА', 0, 6, 90, { col: '#f6ecd6', font: 'Osw' }); pop();
      push(540, 900, 1.6 * (1 - 0.5 * q), -0.05); rect(-260, -70, 520, 140, { wash: '#3a5a3a', washA: 1 - q, w: 4, col: AZ.ink, a: 1 - q }); txt('АКМОЛА', 0, 6, 90, { col: '#f6ecd6', font: 'Osw', a: 1 - q }); pop();
      windLines(t, Math.sin(Math.PI * k), [-100, 200, 1200, 1700], 21047); });
  } };
})();
