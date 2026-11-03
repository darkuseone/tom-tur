/* 020 — сцена `deport`: 23 февраля 1944, снежное утро у станции под Грозным. Эшелон товарных вагонов-теплушек, паровоз в пару,
   конвой в шинелях и ушанках (без оружия в руках, без насилия), семьи с узлами идут к вагонам: старики в папахах, женщины в платках,
   дети. За ними — пустой аул без дыма из труб, собака у ворот. На «полмиллиона» — счётчик 496 460; на «в вагоны» — двери вагонов
   задвигаются; на «Казахстан» — карта со стрелой на восток; на «тринадцать лет» — календарь 1944 → 1957.
   Переход В сцену — пар паровоза в упор заливает огонь 1942-го белым и холодным. */
(() => {
  EV.dp_num = wtk('s5', 'полмиллиона');
  EV.dp_wag = wtk('s5', 'вагоны');
  EV.dp_kz = wtk('s5', 'Казахстан.');
  EV.dp_13 = wtk('s5', 'тринадцать');
  SHAKES.push([EV.dp_wag + 0.1, 0.2, 5]);
  KEYW.push('полмиллиона', 'Казахстан.', 'лет.');

  function sky(t) { vgrad(-900, 1300, ['#4a5468', '#7a8496', '#aab0b8', '#c8ccd0'], 1); clouds(t, -560, 8, '#9aa0aa', 19441, 0.7); birds(t, 4, [0, -300, 1100, 100], 19442, '#2a2a30'); }
  function far(t) {
    caucasus(1020, t, { col: '#7a88a0', colD: '#46546e', snow: '#f4f6f8', h: 380, seed: 13, a: 0.7 });
    foothills(1100, t, '#8a96a2', '#4a5662', 11, 100);
    for (let k = 0; k < 7; k++) { const x = -100 + k * 190, y = 1100 - (k % 2) * 16; rect(x, y - 60, 110, 60, { wash: '#a89a86', washA: 1, w: 1.6, col: '#2a2420', a: 0.7 }); poly([[x - 8, y - 60], [x + 55, y - 96], [x + 118, y - 60]], { wash: '#eef0f2', washA: 1, w: 1.4, col: '#3a3a40', a: 0.6 }); rect(x + 80, y - 110, 14, 30, { wash: '#6a5a4a', washA: 1, w: 1.2, a: 0.7 }); rect(x + 20, y - 44, 22, 22, { wash: '#2a2a30', washA: 1, w: 1, a: 0.7 }); }   // пустой аул: трубы без дыма
  }
  function train(t) {                                              // эшелон теплушек и паровоз в пару
    const L = '#0e0c0c';
    shape([[-600, 1210], [1700, 1200], [1700, 1320], [-600, 1320]], { wash: '#d8dce2', washA: 1, w: 0, line: false });
    pencil([[-600, 1262], [1700, 1256]], { w: 5, col: '#2a2a2e', pass2: false }); pencil([[-600, 1276], [1700, 1270]], { w: 5, col: '#2a2a2e', pass2: false });
    const door = sm(clamp((t - EV.dp_wag) / 0.6));
    for (let k = 0; k < 6; k++) { const x = -260 + k * 250; const b = rect(x, 1100, 230, 150, { wash: '#6a3a2a', washA: 1, w: 2.2, col: L }); hatch(b.path, b.bb, { gap: 9, a: 0.35, col: '#2a140a', ang: 1.57, w: 1.2 });
      pencil([[x, 1096], [x + 230, 1096]], { w: 10, col: '#eef2f6', a: 0.95, pass2: false }); rect(x + 30, 1114, 28, 18, { wash: '#1a1a1a', washA: 1, w: 1.2 }); pencil([[x + 30, 1123], [x + 58, 1123]], { w: 1.4, col: '#8a8a8a', pass2: false });   // окошко с решёткой
      const dw = 80, dx = x + 75 + (1 - door) * 70; rect(dx, 1118, dw, 128, { wash: '#5a2e20', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 0 } }); if (door < 1) rect(x + 75, 1118, (1 - door) * 70, 128, { wash: '#0a0808', washA: 1, w: 1, col: L });
      for (const wx of [40, 190]) ell(x + wx, 1256, 22, 22, { wash: '#1a1a1a', washA: 1, w: 1.6, col: L });
      txt(String(k + 12), x + 190, 1130, 20, { col: '#eef2f6', font: 'Osw', a: 0.8 }); }
    push(1300, 1250, 0.8); const lb = rect(-160, -150, 260, 120, { wash: '#1e1e22', washA: 1, w: 2, col: L }); rect(60, -230, 90, 200, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); rect(-130, -200, 40, 50, { wash: '#2a2a2e', washA: 1, w: 1.6 }); for (const wx of [-120, -40, 40]) ell(wx, -20, 34, 34, { wash: '#141416', washA: 1, w: 2, col: L }); pencil([[-180, -20], [-200, -20]], { w: 8, col: '#c83a2a', pass2: false }); pop();
    smokeCol(1200, 1080, t, { n: 12, h: 700, sz: 1.2, col: '#eef0f2', a: 0.7, wind: -400, sp: 0.2 });
  }
  function folks(t) {                                              // семьи с узлами, старики, дети, конвой; собака
    const go = (t - S0.deport) * 14;
    const F = [[180, 1340, 0.6, { body: '#3a3428', hat: 'fur', hatCol: '#d8d0c0', beard: 1, prop: 'stick', armR: 'hold', seed: 151 }], [270, 1350, 0.58, { body: '#4a2a2a', hat: 'scarf', hatCol: '#2a2a2a', long: 1, armL: 'hold', armR: 'hold', seed: 152 }],
      [330, 1356, 0.4, { body: '#5a4a6a', hat: 'cap', hatCol: '#3a3a3a', seed: 153, armL: 'up' }], [430, 1350, 0.6, { body: '#2a3a4a', hat: 'scarf', hatCol: '#8a2a2a', long: 1, armR: 'hold', seed: 154 }], [520, 1356, 0.62, { body: '#3a3a2a', hat: 'fur', hatCol: '#2a2420', beard: 1, armL: 'hold', armR: 'hold', seed: 155 }],
      [600, 1360, 0.42, { body: '#6a4a2a', hat: 'scarf', hatCol: '#c8a07a', long: 1, seed: 156 }], [700, 1350, 0.6, { body: '#3a2a2a', hat: 'scarf', hatCol: '#5a5a6a', long: 1, armR: 'hold', seed: 157 }], [780, 1352, 0.6, { body: '#4a4a3a', hat: 'fur', hatCol: '#1a1a1a', armR: 'hold', seed: 158 }]];
    for (const [x, y, s, o] of F) { human(x + go * (s * 0.8), y, s, t, Object.assign({ legs: '#2a2420', flip: 1 }, o)); if (o.armR === 'hold' || o.armL === 'hold') { push(x + go * (s * 0.8) + 40 * s, y - 120 * s, s); blob([[-30, 0], [-36, -40], [0, -56], [36, -40], [30, 0]], { wash: ['#c8a07a', '#8a6a9a', '#6a8a6a'][(x / 10 | 0) % 3], washA: 1, w: 1.6, col: '#1a120a' }); pop(); } }   // узлы
    for (const [x, sd] of [[100, 161], [880, 162], [1000, 163]]) { human(x, 1360, 0.62, t, { body: '#5a5a4a', legs: '#3a3a30', hat: 'fur', hatCol: '#4a4a3a', seed: sd, armR: 'hips', flip: x > 500 ? -1 : 1 }); push(x, 1360, 0.62, 0, x > 500 ? -1 : 1); blob([[-60, -112], [-56, -10], [56, -10], [60, -112]], { wash: '#5a5a4a', washA: 1, w: 1.8, col: '#1a1a14' }); pop(); }   // конвой в шинелях
    dog(1100, 1370, 0.7, t, { bark: 0.4, flip: -1 });
  }
  function ground(t) {
    const g = rect(-600, 1380, 2400, 700, { wash: '#e8ecf0', washA: 1, w: 0, line: false });
    for (let k = 0; k < 10; k++) pencil([[-200 + k * 160, 1400], [-260 + k * 200, 2000]], { w: 6, col: '#a8b2c0', a: 0.6, pass2: false });   // следы-колеи в снегу
    const r = rng(19443); for (let k = 0; k < 40; k++) { const x = -200 + r() * 1500, y = 1420 + r() * 600; ell(x, y, 8 + r() * 14, 4 + r() * 6, { wash: '#9aa6b6', washA: 0.7, line: false }); }
    sack(880, 1560, 1.0, '#8a7a60'); sack(940, 1580, 0.9, '#6a5a40'); jug(1000, 1580, 0.9, '#8a5a3a'); push(1060, 1580, 1); rect(-50, -60, 100, 60, { wash: '#5a3a2a', washA: 1, w: 2, col: '#1a0e06' }); pencil([[-50, -40], [50, -40]], { w: 3, col: '#c8a040', pass2: false }); pop();   // сундук
    push(700, 1600, 1); ell(0, -10, 60, 18, { wash: '#7a6a5a', washA: 1, w: 1.6 }); rect(-40, -60, 80, 50, { wash: '#8a5a3a', washA: 1, w: 1.6 }); pop();   // корзина
    for (let k = 0; k < 5; k++) { const x = 180 + k * 40; pencil([[x, 1700], [x + 6, 1560]], { w: 6, col: '#3a2a1a', pass2: false }); } pencil([[160, 1620], [400, 1620]], { w: 5, col: '#3a2a1a', pass2: false }); pencil([[160, 1660], [400, 1660]], { w: 5, col: '#3a2a1a', pass2: false });   // плетень
    for (let k = 0; k < 8; k++) ell(1100 + (k % 3) * 40, 1700 + k * 10, 26, 10, { wash: '#f8f8fa', washA: 1, w: 1, col: '#9aa6b6', a: 0.5 });
    pole(1180, 1400, 360, t, { wood: '#3a3028', lamp: 0.5, lampCol: 'rgba(255,214,150,1)' });
  }
  function front(t) { pencil([[-100, 2000], [-40, 500]], { w: 30, col: '#3a3028', pass2: false }); pencil([[-60, 900], [200, 760]], { w: 6, col: '#2a2420', pass2: false }); for (let k = 0; k < 3; k++) pencil([[1150 + k * 40, 2000], [1160 + k * 40, 1500]], { w: 18, col: '#3a3028', pass2: false }); pencil([[1100, 1600], [1400, 1580]], { w: 10, col: '#3a3028', pass2: false }); }
  function hud(t) {
    const L = '#1a120a';
    if (t > EV.dp_num - 0.1 && t < EV.dp_kz) { const k = popK(t, EV.dp_num - 0.1, 0.35) * (1 - sm((t - EV.dp_kz + 0.2) / 0.2)); const n = Math.round(lerp(0, 496460, sm(clamp((t - EV.dp_num) / 0.9))));
      push(700, 880, k); rect(-200, -70, 400, 140, { wash: '#efe6d4', washA: 0.97, w: 2.4, col: L }); txt(n.toLocaleString('ru-RU'), 0, -10, 64, { col: '#2a1a1a', font: 'Osw' }); txt('выселено, по докладу 1944 г.', 0, 46, 22, { col: '#5a3a2a', font: 'Hand' }); pop(); }
    if (t > EV.dp_kz - 0.15 && t < EV.dp_13) { const k = popK(t, EV.dp_kz - 0.15, 0.35) * (1 - sm((t - EV.dp_13 + 0.15) / 0.15)); push(690, 900, 0.95 * k);
      rect(-220, -150, 440, 300, { wash: '#efe6d4', washA: 0.97, w: 2.4, col: L }); pencil(spline([[-200, -20], [-60, -110], [100, -60], [200, -100]], false, 8), { w: 2, col: '#6a6a6a', a: 0.6, pass2: false });
      ell(-150, 80, 10, 10, { wash: '#1a1a1a', washA: 1, line: false }); txt('Грозный', -150, 112, 22, { font: 'Hand', col: L }); txt('КАЗАХСТАН', 110, -100, 26, { col: '#5a2a1a', font: 'Osw' });
      const pr = sm(clamp((t - EV.dp_kz) / 0.6)); const AP = spline([[-150, 80], [-40, 20], [80, -40], [140, -60]], false, 10); const nn = Math.max(2, Math.round(pr * AP.length)); pencil(AP.slice(0, nn), { w: 12, col: '#8a2a1a', pass2: false }); const [ax, ay] = AP[nn - 1]; poly([[ax, ay - 18], [ax + 30, ay + 4], [ax - 4, ay + 18]], { wash: '#8a2a1a', washA: 1, w: 1.4 }); pop(); }
    if (t > EV.dp_13 - 0.15) { const k = popK(t, EV.dp_13 - 0.15, 0.35); const yr = Math.round(lerp(1944, 1957, sm(clamp((t - EV.dp_13) / 0.9)))); push(700, 900, k);
      rect(-150, -130, 300, 260, { wash: '#f2ece0', washA: 0.98, w: 2.4, col: L }); rect(-150, -130, 300, 60, { wash: '#8a2a1a', washA: 1, w: 2, col: L }); txt('13 ЛЕТ', 0, -100, 34, { col: '#f2ece0', font: 'Osw' }); txt(String(yr), 0, 24, 90, { col: '#1a1a1a', font: 'Osw' }); txt('вернутся в 1957-м', 0, 100, 22, { col: '#5a3a2a', font: 'Hand' }); pop(); }
  }

  WORLD.deport = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(7, () => train(t));
    lay(3, () => folks(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    motes(110, [-200, -200, 1300, 2000], '#f8faff', t, 19444, { sp: 80, vx: -30, sz: 3.4, a: 0.85, wob: 30 });
    haze('#c8d0dc', 0.08);
  };
  DIR.deport = {
    outfit: 'vatnik', light: { side: -1, rim: '#d8e4f4' }, grade: ['#4a5a7a', 0.16], hud,
    act: () => [[S0.deport, 'neutral'], [EV.dp_num, 'shock'], [EV.dp_wag, 'scared'], [EV.dp_kz, 'cold'], [EV.dp_13, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1530, s: 1.0, frost: 0.6, chatter: t > EV.dp_kz ? 0.5 : 0, look: [0.6, -0.2] }),
    cam: () => [[S0.deport, 560, 1060, 0.08], [EV.dp_num, 600, 1020, 0.06], [EV.dp_13, 620, 1000, 0.1], [S1.deport, 620, 990, 0.14]]
  };
  TRANS_IN.deport = { a: 0.15, b: 0.35, fx(k, t, A, B) {           // пар паровоза в упор: огонь тонет в белом облаке, из него — снег 1944-го
    drawBuf(k < 0.5 ? A : B); scr(() => { const d = Math.sin(clamp(k) * Math.PI), r = rng(19445);
      for (let i = 0; i < 14; i++) { const x = r() * 1200 - 60, y = r() * 2000, rr = 220 + r() * 260; blob([[x - rr, y], [x - rr * 0.5, y - rr * 0.8], [x + rr * 0.4, y - rr * 0.7], [x + rr, y], [x + rr * 0.3, y + rr * 0.6], [x - rr * 0.6, y + rr * 0.5]], { wash: i % 2 ? '#f4f6f8' : '#dfe4ea', washA: 0.95 * d, w: 1.2, col: '#9aa6b6', a: 0.3 * d }); }
      whiteOut(0.5 * d, '240,244,248'); });
  } };
})();
