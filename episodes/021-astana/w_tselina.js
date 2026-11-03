/* 021 — сцена `tselina`: лето 1961. Бирюзовое небо, бескрайнее золотое поле до горизонта, вдали элеватор и палаточный городок
   целинников с юртами; через поле ползут гусеничные трактора ДТ-54 и красные комбайны, грузовики с зерном. На «Целина!» над полем
   разворачивается транспарант «ДАЁШЬ ЦЕЛИНУ!» и по пшенице бежит волна; на «гектаров» счётчик «25 000 000 га» щёлкает цифрами,
   за трактором ложится чёрная пашня; на «Целиноградом!» сверху падает вокзальная вывеска «ЦЕЛИНОГРАД» поверх старой «АКМОЛИНСК».
   Переход В сцену — волна золотого ковыля поднимается снизу и смывает слякоть 1997-го. */
(() => {
  EV.ts_go = wtk('s4', 'Целина!');
  EV.ts_ha = wtk('s4', 'гектаров');
  EV.ts_mil = wtk('s4', 'миллионов');
  EV.ts_city = wtk('s4', 'Целиноградом!');
  KEYW.push('Целина!', 'Целиноградом!');
  SHAKES.push([EV.ts_city + 0.15, 0.25, 7]);

  function sky(t) {
    vgrad(-900, 1300, ['#1e7ab0', '#3aa0c8', '#7ac8d8', '#c8e8e0', '#fff0c8'], 1);
    ell(880, -80, 70, 70, { wash: '#fff8d8', washA: 1, line: false }); glow(880, -80, 520, 'rgba(255,250,210,1)', 0.55); rays(880, -80, Math.PI * 0.6, 1.4, 1600, 'rgba(255,250,210,0.6)', 0.1, 7, t);
    clouds(t, -540, 7, '#ffffff', 21051, 0.75); clouds(t, 250, 4, '#f6f8f8', 21052, 0.5); birds(t, 8, [-100, -250, 1200, 400], 21053, '#2a3040');
  }
  function far(t) {                                                // горизонт: элеватор, палатки, юрты, водонапорная башня, ж/д
    const L = AZ.ink; hills(1090, 18, '#b8a868', 21054, 1);
    push(980, 1100, 1); for (let k = 0; k < 5; k++) rect(-120 + k * 44, -300, 40, 300, { wash: '#e8e2d4', washA: 1, w: 1.8, col: L, a: 0.7 }); rect(-150, -380, 120, 80, { wash: '#d8d2c4', washA: 1, w: 1.8, col: L, a: 0.7 }); txt('ЭЛЕВАТОР', -90, -340, 22, { col: '#5a4a3a', font: 'Osw' }); pop();
    for (let k = 0; k < 6; k++) { const x = -160 + k * 90; poly([[x - 40, 1100], [x, 1050], [x + 40, 1100]], { wash: k % 2 ? '#e8e0c8' : '#d8ccb0', washA: 1, w: 1.6, col: L, a: 0.6 }); }   // палатки
    yurt(460, 1102, 0.3, t, { smoke: 1 }); yurt(560, 1104, 0.26, t);
    push(700, 1100, 1); for (const sd of [-1, 1]) pencil([[sd * 20, 0], [sd * 10, -140]], { w: 5, col: '#5a4a3a', pass2: false }); rect(-30, -190, 60, 50, { wash: '#8a6a4a', washA: 1, w: 1.6, col: L }); pop();   // водокачка
    pencil([[-300, 1104], [1400, 1104]], { w: 3, col: '#5a4a3a', a: 0.6, pass2: false });
  }
  function field(t) {                                              // пшеница полосами, волна по полю, пашня за трактором
    const L = AZ.ink; const wave = (x, y) => Math.max(0, 1 - Math.abs((x - (t - EV.ts_go) * 900)) / 260) * (t > EV.ts_go ? 1 : 0);
    rect(-700, 1100, 2500, 1100, { wash: '#e8b840', washA: 1, line: false });
    for (let row = 0; row < 16; row++) { const y = 1108 + row * row * 2.4, s = 0.25 + row * 0.08, r = rng(21055 + row);
      for (let x = -300; x < 1400; x += 46 * s + 10) { const w2 = wave(x, y), sway = Math.sin(t * 2 + x * 0.02 + row) * 4 * s + w2 * 20 * s;
        pencil([[x, y], [x + sway, y - 40 * s - w2 * 14 * s]], { w: 1.6, col: row % 2 ? '#c88a2a' : '#f2d070', a: 0.9, pass2: false, gap: false }); ell(x + sway, y - 44 * s - w2 * 14 * s, 3 * s + 1, 7 * s + 2, { wash: '#f6d878', washA: 1, w: 0.8, col: '#8a5a1a', a: 0.6 }); } }
    const pl = clamp((t - EV.ts_mil) / 2.2); if (pl > 0) { const x1 = lerp(1300, -100, pl); const P = shape([[x1, 1170], [1400, 1170], [1400, 1240], [x1, 1240]], { wash: '#3a2a1a', washA: 1, line: false }); for (let k = 0; k < 6; k++) pencil([[x1, 1176 + k * 11], [1400, 1176 + k * 11]], { w: 2, col: '#6a4a2a', a: 0.6, pass2: false }); }
  }
  function machines(t) {                                           // трактора, комбайны, грузовик, люди
    const pl = clamp((t - EV.ts_mil) / 2.2); tractor(lerp(1400, -60, pl), 1240, 0.5, t, { col: '#c8302a', speed: 1 });
    combine(330 + Math.sin(t * 0.4) * 20, 1170, 0.36, t, { label: 'СК-3' }); combine(820, 1150, 0.28, t, { flip: -1 });
    tractor(-40, 1140, 0.3, t, { col: '#3a6a8a', star: false });
    const L = AZ.ink; push(620, 1270, 0.5); rect(-180, -150, 260, 110, { wash: '#6a7a4a', washA: 1, w: 2.4, col: L }); blob([[-176, -150], [-150, -200], [60, -210], [76, -150]], { wash: '#f2c84a', washA: 1, w: 2, col: L }); rect(80, -170, 120, 130, { wash: '#5a6a3a', washA: 1, w: 2.4, col: L }); rect(100, -150, 80, 50, { wash: '#a8c8c8', washA: 1, w: 2, col: L }); for (const wx of [-120, 0, 150]) ell(wx, -36, 36, 36, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); txt('ЗИЛ', 140, -60, 24, { col: '#f2ead8', font: 'Osw' }); pop();
    human(520, 1290, 0.42, t, { body: '#3a5a8a', legs: '#2a2a30', hat: 'cap', hatCol: '#2a2a2a', seed: 101, armR: 'wave' });
    human(760, 1300, 0.42, t, { body: '#f2ead8', legs: '#2a3a5a', hat: 'scarf', hatCol: '#c8302a', seed: 102, long: 1, armL: 'up' });
    human(840, 1304, 0.4, t, { body: '#e8e0c8', legs: '#2a2a30', hat: 'scarf', hatCol: '#2a8aa0', seed: 103, long: 1, prop: 'stick', armR: 'hold' });
    kman(950, 1310, 0.46, t, { body: '#3a2a1a', hat: 'fur', hatCol: '#6a4a2a', beard: 1, seed: 104, prop: 'stick', armR: 'hold', flip: -1 });
    horse(1080, 1320, 0.42, t, { col: '#7a4a2a', flip: -1 });
    human(440, 1296, 0.4, t, { body: '#5a4a3a', legs: '#2a2a30', hat: 'cap', hatCol: '#5a4a3a', seed: 105, prop: 'axe', armR: 'swing' });
    human(1000, 1180, 0.28, t, { body: '#c8302a', legs: '#2a2a30', seed: 106, armL: 'wave' });
    human(200, 1180, 0.28, t, { body: '#2a5a4a', legs: '#2a2a30', hat: 'cap', hatCol: '#3a3a3a', seed: 107, armR: 'up' });
  }
  function camp(t) {                                               // лагерь на переднем плане: бочка с водой, мешки зерна, вёдра, гитара, полевая кухня
    const L = AZ.ink;
    for (let k = 0; k < 4; k++) sack(560 + k * 70, 1520 + (k % 2) * 10, 0.55, k % 2 ? '#d8c08a' : '#c8b07a');
    barrel(470, 1500, 0.6, '#5a6a7a'); barrel(980, 1520, 0.55, '#5a4030');
    push(820, 1460, 0.8); rect(-120, -120, 240, 120, { wash: '#5a6a4a', washA: 1, w: 2.2, col: L }); ell(-60, 0, 30, 30, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); ell(60, 0, 30, 30, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pencil([[60, -120], [60, -190]], { w: 12, col: '#3a3a3a', pass2: false }); smokeCol(60, -200, t, { col: 'rgba(240,240,240,0.6)', h: 200, sz: 0.3, n: 5, wind: 120, sp: 0.3 }); txt('КУХНЯ', 0, -60, 30, { col: '#f2ead8', font: 'Osw' }); pop();
    for (const [x, c] of [[400, '#8a8a94'], [1070, '#6a7a8a']]) { push(x, 1560, 0.5); poly([[-30, -60], [30, -60], [22, 0], [-22, 0]], { wash: c, washA: 1, w: 2, col: L }); pop(); }
    push(1110, 1560, 0.6, -0.5); ell(0, 0, 40, 50, { wash: '#a8602a', washA: 1, w: 2, col: L }); ell(0, 0, 12, 12, { wash: '#2a1a0e', washA: 1, line: false }); pencil([[0, -40], [0, -170]], { w: 10, col: '#5a3a1a', pass2: false }); pop();   // гитара
    for (let k = 0; k < 4; k++) { const x = 160 + k * 80 + Math.sin(t * 4 + k) * 6; ell(x, 1600 + (k % 2) * 20, 14, 10, { wash: '#f2f2ea', washA: 1, w: 1.2, col: L }); ell(x + 12, 1590 + (k % 2) * 20, 6, 6, { wash: '#c8302a', washA: 1, line: false }); }   // куры
    for (const [x, y, sc] of [[150, 1400, 0.7], [1050, 1390, 0.6], [700, 1330, 0.45]]) { push(x, y, sc); blob([[-120, 0], [-110, -120], [-50, -200], [40, -200], [110, -120], [120, 0]], { wash: '#e8c060', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.25, col: '#8a5a1a', ang: 1.2 } }); pencil([[-100, -60], [100, -60]], { w: 3, col: '#8a5a1a', pass2: false }); pop(); }   // стога
    for (let k = 0; k < 7; k++) { const x = 120 + k * 150, y = 1640 + (k % 2) * 50; push(x, y, 0.8); for (let q = -4; q <= 4; q++) pencil([[q * 4, 0], [q * 9, -110]], { w: 3, col: '#d8a440', pass2: false }); for (let q = -4; q <= 4; q++) ell(q * 9, -116, 6, 14, { wash: '#f2d070', washA: 1, w: 1, col: '#6a4a1a' }); pencil([[-22, -50], [22, -50]], { w: 5, col: '#8a5a1a', pass2: false }); pop(); }   // снопы
    push(980, 1720, 1); ell(0, 0, 90, 20, { wash: '#6a8aa0', washA: 1, w: 2, col: L }); txt('ВОДА', 0, -50, 26, { col: '#2a3a4a', font: 'Osw' }); pop();
    for (let i = 0; i < 10; i++) kovyl(-60 + i * 130, 1700 + (i % 3) * 30, 1.3, t, { col: '#f2d078' });
  }
  function hud(t) {
    if (t > EV.ts_go - 0.05) { const q = sm((t - EV.ts_go + 0.05) / 0.5); push(560, 700, 1, -0.03); pencil([[-380 * q, -70], [-380 * q, 80]], { w: 6, col: '#6a4a2a', pass2: false }); pencil([[380 * q, -70], [380 * q, 80]], { w: 6, col: '#6a4a2a', pass2: false });
      const F = []; for (let k = 0; k <= 12; k++) F.push([-370 * q + k * 740 * q / 12, -60 + Math.sin(t * 5 + k * 0.7) * 6]); shape(F.concat(F.map(([x, y]) => [x, y + 100]).reverse()), { wash: '#c8302a', washA: 1, w: 2, col: AZ.ink }); if (q > 0.7) txt('ДАЁШЬ ЦЕЛИНУ!', 0, -6, 64, { col: '#fff2c8', font: 'Osw', a: (q - 0.7) / 0.3 }); pop(); }
    if (t > EV.ts_mil - 0.1 && t < EV.ts_city + 0.1) { const f = clamp((t - EV.ts_mil + 0.1) / 1.2), n = Math.round(25000000 * sm(f)), s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      push(680, 900, 1); rect(-250, -60, 500, 120, { wash: '#14100a', washA: 0.85, w: 3, col: AZ.gold }); txt(s + ' га', 0, 6, 70, { col: AZ.gold, font: 'Osw' }); pop(); }
  }
  function sign(t) {                                               // вокзальная вывеска: АКМОЛИНСК → ЦЕЛИНОГРАД
    const L = AZ.ink, q = sm((t - EV.ts_city + 0.05) / 0.3); push(640, 1010, 1); for (const sd of [-1, 1]) pencil([[sd * 220, 0], [sd * 220, 380]], { w: 8, col: '#4a3a2a', pass2: false });
    rect(-260, -60, 520, 110, { wash: '#2a4a6a', washA: 1, w: 3, col: L }); txt('АКМОЛИНСК', 0, 0, 64, { col: '#f2ead8', font: 'Osw' });
    if (t > EV.ts_city - 0.05) { push(0, -400 * (1 - q), 1); rect(-270, -66, 540, 122, { wash: '#c8302a', washA: 1, w: 3, col: L }); txt('ЦЕЛИНОГРАД', 0, 0, 66, { col: '#fff2c8', font: 'Osw' }); pop(); if (q > 0.95 && t < EV.ts_city + 0.6) for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283, d = (t - EV.ts_city) * 400; ell(Math.cos(a) * (260 + d * 0.4), Math.sin(a) * 40 + 40, 10, 6, { wash: '#e8c870', washA: 1 - (t - EV.ts_city) / 0.6, line: false }); } }
    pop();
  }
  function front(t) {
    for (let k = 0; k < 14; k++) { const x = -150 + k * 22, h = 300 + (k % 4) * 60, sw = Math.sin(t * 2 + k) * 14; pencil([[x, 2100], [x + sw, 2100 - h]], { w: 4, col: '#c88a2a', pass2: false }); ell(x + sw, 2100 - h - 20, 9, 26, { wash: '#f2c860', washA: 1, w: 1.4, col: '#6a4a1a' }); }
    for (let k = 0; k < 10; k++) { const x = 1120 + k * 24, h = 260 + (k % 3) * 70, sw = Math.sin(t * 2 + k) * 14; pencil([[x, 2100], [x + sw, 2100 - h]], { w: 4, col: '#c88a2a', pass2: false }); ell(x + sw, 2100 - h - 20, 9, 26, { wash: '#f2c860', washA: 1, w: 1.4, col: '#6a4a1a' }); }
  }

  WORLD.tselina = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(5, () => { field(t); machines(t); });
    lay(2.2, () => { sign(t); });
    lay(1, () => { camp(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 500, 1300, 1700], '#fff2b0', t, 21056, { sp: 14, vx: 60, sz: 2.4, a: 0.5, wob: 16 });
    haze('#f8d890', 0.06);
  };
  DIR.tselina = {
    outfit: 'iron', light: { side: 1, rim: '#fff0c0' }, grade: ['#d8a840', 0.1],
    act: () => [[S0.tselina, 'proud'], [EV.ts_go, 'laugh'], [EV.ts_mil, 'awe'], [EV.ts_city - 0.05, 'shock'], [EV.ts_city + 0.5, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1520, s: 1.04, look: t < EV.ts_mil ? [0.5, -0.6] : t < EV.ts_city ? [0.8, -0.1] : [0.6, -0.4],
      hand: t > EV.ts_go && t < EV.ts_mil ? [120, -380] : t > EV.ts_city ? [200, -320] : undefined, point: t > EV.ts_city ? 1 : undefined, tailUp: t > EV.ts_go }),
    cam: () => [[S0.tselina, 560, 1000, 0.08], [EV.ts_go, 560, 880, 0.0, 'x'], [EV.ts_mil, 620, 960, 0.06], [EV.ts_city, 620, 1000, 0.16, 'x'], [S1.tselina, 600, 1020, 0.2]],
    hud
  };
  TRANS_IN.tselina = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // волна золотого ковыля поднимается снизу и уносит прошлую эпоху
    drawBuf(A); const q = sm(k), y = 1920 - q * 2400;
    scr(() => { inPath(new Path2D(`M0,${Math.max(-50, y + 120)} H1080 V1920 H0 Z`), () => drawBuf(B));
      for (let i = 0; i < 40; i++) { const x = i * 28, h = 160 + (i * 37) % 120, yy = y + 120 + Math.sin(i + t * 8) * 20; pencil([[x, yy + h], [x + 30, yy]], { w: 5, col: i % 2 ? '#f2d070' : '#c88a2a', pass2: false, gap: false }); ell(x + 30, yy - 10, 8, 22, { wash: '#f6d878', washA: 1, w: 1, col: '#6a4a1a' }); } });
  } };
})();
