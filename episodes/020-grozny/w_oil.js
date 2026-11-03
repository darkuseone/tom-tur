/* 020 — сцена `oil`: октябрь 1893, Старые промыслы под Грозным. Холмы в деревянных вышках, котельные с дымом, железная дорога
   (пришла в 1893-м) с цистернами, бараки рабочих, амбары. На «бьёт» из вышки на первом плане вырывается чёрный фонтан, нефть дождём
   летит на людей и Тома; рабочие бегут, кто-то подставляет ведро, купец в котелке ликует. На «Вторая» — карточка-пьедестал
   «1 БАКУ · 2 ГРОЗНЫЙ» (нефть империи). Переход В сцену — из земли поднимается чёрная нефть и заливает кадр снизу вверх. */
(() => {
  EV.ol_gush = wtk('s3', 'бьёт');
  EV.ol_oil = wtk('s3', 'нефти!');
  EV.ol_second = wtk('s3', 'Вторая');
  EV.ol_baku = wtk('s3', 'Баку!');
  SHAKES.push([EV.ol_gush, 0.5, 10]);
  KEYW.push('бьёт', 'нефти!', 'Баку!');
  const G = () => clamp((window.__t - EV.ol_gush) / 0.35);

  function sky(t) { vgrad(-900, 1300, ['#5a6a8a', '#9aa4b0', '#e0c89a', '#e8a868'], 1); ell(-40, 300, 60, 60, { wash: '#ffe8b0', washA: 1, line: false }); glow(-40, 300, 380, 'rgba(255,200,130,1)', 0.4); clouds(t, -500, 6, '#e8dccc', 18931, 0.6); birds(t, 5, [200, -250, 1200, 150], 18932); }
  function far(t) {
    caucasus(1000, t, { col: '#6a7aa0', colD: '#38466e', snow: '#f4ecdc', h: 320, seed: 9, a: 0.75 });
    foothills(1080, t, '#7a6a48', '#3a2a18', 7, 140);
    for (let k = 0; k < 14; k++) { const x = -150 + k * 100, y = 1040 - Math.abs(Math.sin(x * 0.003 + 7)) * 120 + 30; push(x, y, 0.22); derrick(0, 0, 1, t, {}); pop(); }   // лес дальних вышек
    for (let k = 0; k < 4; k++) smokeCol(-50 + k * 330, 1000, t + k, { n: 5, h: 360, sz: 0.5, col: '#4a3a30', a: 0.5, wind: 160 });
  }
  function mid(t) {                                                // ж/д с цистернами, бараки, амбары, котельные с трубами
    const L = '#140c06';
    shape([[-600, 1130], [1700, 1120], [1700, 1300], [-600, 1300]], { wash: '#8a7450', washA: 1, w: 0, line: false });
    for (let k = 0; k < 5; k++) barrack(-200 + k * 230, 1170, 190, 80, t, { wood: '#7a5a3a', roof: '#4a3428', lit: 0 });
    pencil([[-600, 1200], [1700, 1196]], { w: 4, col: '#2a2420', pass2: false }); pencil([[-600, 1212], [1700, 1208]], { w: 4, col: '#2a2420', pass2: false }); for (let x = -600; x < 1700; x += 30) pencil([[x, 1196], [x + 4, 1216]], { w: 3, col: '#4a3a2a', pass2: false });
    const tx = 200 + ((window.__t * 30) % 300); for (let k = 0; k < 4; k++) { const x = tx + k * 150 - 300; push(x, 1196, 0.6); ell(0, -50, 100, 40, { wash: '#2a2420', washA: 1, w: 2, col: L }); rect(-110, -16, 220, 12, { wash: '#3a3430', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) ell(sd * 70, -2, 14, 14, { wash: '#1a1410', washA: 1, w: 1.4, col: L }); pop(); }   // цистерны
    for (const [x, h] of [[820, 140], [1080, 160]]) { rect(x, 1180 - 80, 120, 80, { wash: '#9a6a4a', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.2, col: L, ang: 0 } }); rect(x + 80, 1180 - 80 - h, 24, h, { wash: '#6a4a3a', washA: 1, w: 1.6, col: L }); smokeCol(x + 92, 1180 - 80 - h, t, { n: 6, h: 500, sz: 0.6, col: '#2a2420', a: 0.7, wind: 200 }); }   // котельные
    tank(560, 1180, 140, 90, t, { col: '#7a7468', txt: 'НЕФТЬ' }); tank(700, 1176, 110, 70, t, { col: '#8a8478' });
  }
  function rigs(t) {                                               // вышки среднего плана, рабочие у них
    for (const [x, y, s] of [[640, 1270, 0.5], [900, 1260, 0.44], [1150, 1280, 0.52], [-40, 1280, 0.46]]) derrick(x, y, s, t, { soak: 0.6 });
    for (const [x, sd, ar] of [[560, 101, 'hold'], [720, 102, 'swing'], [980, 103, 'up'], [1100, 104, 'hold']]) human(x, 1290, 0.46, t, { body: '#4a3a2a', legs: '#2a2420', hat: 'cap', hatCol: '#2a2420', seed: sd, armR: ar, beard: 1 });
  }
  function main(t) {                                               // главная вышка, из неё бьёт фонтан; бегущие и ликующие люди
    const g = G(), L = '#140c06';
    derrick(760, 1430, 1.25, t, { soak: g, lw: 1.2 });
    gusher(760, 1400, 1000, t, g);
    const run = g > 0 ? sm(clamp((t - EV.ol_gush) / 1.2)) : 0;
    human(560 - run * 120, 1440, 0.68, t, { body: '#5a4a36', legs: '#2a2420', hat: 'cap', hatCol: '#1a1410', seed: 111, armL: g > 0 ? 'up' : 'hold', armR: g > 0 ? 'up' : 'down', face: g > 0 ? 'shock' : undefined, flip: -1, beard: 1 });
    human(930 + run * 80, 1450, 0.7, t, { body: '#3a3a3a', legs: '#2a2420', hat: 'merchant', hatCol: '#1a1a1a', seed: 112, armL: g > 0 ? 'wave' : 'hips', armR: g > 0 ? 'up' : 'hips' });   // купец-владелец
    human(1050, 1460, 0.66, t, { body: '#6a4a2a', legs: '#2a2420', hat: 'fur', hatCol: '#3a2a1a', seed: 113, armR: 'hold', beard: 1, flip: -1 }); if (g > 0) { push(1010, 1340, 0.8); const b = blob([[-30, 0], [-36, -60], [36, -60], [30, 0]], { wash: '#8a6a3a', washA: 1, w: 2, col: L }); ell(0, -60, 36, 8, { wash: GZ.oil, washA: 1, w: 1.6, col: L }); pop(); }   // ведро под нефть
    human(440, 1460, 0.64, t, { body: '#5a3a2a', legs: '#2a2420', hat: 'cap', hatCol: '#2a1a10', seed: 114, armR: 'swing', armL: 'swing' });
    if (g > 0) for (let k = 0; k < 4; k++) { const x = 520 + k * 160, y = 1500 + (k % 2) * 40; ell(x, y, 70 + run * 50, 14 + run * 8, { wash: GZ.oil, washA: 0.9, w: 1.4, col: '#000', a: 0.4 }); pencil([[x - 40, y - 4], [x + 20, y - 6]], { w: 3, col: '#c88a3a', a: 0.5, pass2: false }); }   // нефтяные лужи
  }
  function ground(t) {
    earthBank(1440, t, { col: '#7a6040', grass: '#6a6a2a', seed: 6 });
    for (let k = 0; k < 5; k++) barrel(80 + k * 70, 1560 + (k % 2) * 20, 0.8, k % 2 ? '#3a2a1a' : '#5a3a20'); sack(900, 1600, 0.9); crate(960, 1620, 110, 70, { txt: 'АХВЕРДОВЪ' });
    pencil([[600, 1640], [1300, 1600]], { w: 14, col: '#3a3430', pass2: false }); pencil([[600, 1640], [1300, 1600]], { w: 4, col: '#8a8478', a: 0.5, pass2: false });   // труба нефтепровода
    push(1180, 1560, 1); rect(-40, -30, 80, 30, { wash: '#5a4a3a', washA: 1, w: 1.6 }); ell(0, -40, 30, 18, { wash: '#3a3a3a', washA: 1, w: 1.6 }); pop();   // насос
    for (let k = 0; k < 4; k++) { const x = 400 + k * 46; pencil([[x, 1700], [x + 10, 1620]], { w: 6, col: '#4a3a2a', pass2: false }); } poly([[380, 1700], [600, 1700], [590, 1720], [390, 1720]], { wash: '#5a4a3a', washA: 1, w: 1.6 });   // ящик с инструментом
    const r = rng(18933); for (let k = 0; k < 30; k++) { const x = -200 + r() * 1500, y = 1700 + r() * 300; ell(x, y, 10 + r() * 20, 5 + r() * 8, { wash: k % 3 ? '#8a7a5a' : GZ.oil, washA: 0.9, w: 1.2, col: '#2a1a0a', a: 0.5 }); }
    for (let k = 0; k < 3; k++) { const x = 700 + k * 120; pencil([[x, 1780], [x + 90, 1770]], { w: 10, col: '#6a4a2a', pass2: false }); }   // доски-мостки
  }
  function front(t) {                                              // передний план: угол вышки и связка труб
    pencil([[-80, 2000], [120, 300]], { w: 40, col: '#3a2412', pass2: false }); pencil([[-60, 1600], [160, 1100]], { w: 16, col: '#3a2412', pass2: false });
    for (let k = 0; k < 4; k++) pencil([[1000, 1880 + k * 30], [1500, 1860 + k * 30]], { w: 26, col: k % 2 ? '#4a4038' : '#5a5048', pass2: false });
  }
  function hud(t) {                                                // пьедестал: нефть империи
    if (t < EV.ol_second - 0.1) return; const k = popK(t, EV.ol_second - 0.1, 0.4); push(700, 980, 0.95 * k); const L = '#1a120a';
    rect(-230, -160, 460, 300, { wash: '#f2e6c8', washA: 0.95, w: 2.4, col: L }); txt('НЕФТЬ ИМПЕРИИ', 0, -120, 34, { col: '#3a1a0a', font: 'Osw' });
    rect(-200, -40, 180, 140, { wash: '#c8a040', washA: 1, w: 2, col: L }); txt('1', -110, 0, 54, { col: '#2a1a0a', font: 'Osw' }); txt('БАКУ', -110, 66, 34, { col: '#2a1a0a', font: 'Osw' });
    const q = t > EV.ol_baku - 0.2 ? 1 : 0.6; rect(10, 0, 190, 100, { wash: '#a8a8a8', washA: 1, w: 2, col: L }); txt('2', 105, 30, 50, { col: '#2a1a0a', font: 'Osw' }); txt('ГРОЗНЫЙ', 105, 78, 32, { col: '#2a1a0a', font: 'Osw', a: q });
    pop();
  }

  WORLD.oil = (t, u, cat) => {
    window.__t = t;
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(9, () => mid(t));
    lay(4, () => rigs(t));
    lay(1.8, () => main(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    if (G() > 0) motes(80, [-200, 0, 1300, 1900], '#120a04', t, 18934, { sp: 380, vx: 40, sz: 6, a: 0.8, stretch: 3 });   // нефтяной дождь
    haze('#d0a060', 0.06);
  };
  DIR.oil = {
    outfit: 'neftyanik', light: { side: -1, rim: '#ffc880' }, grade: ['#6a4a20', 0.14], hud,
    act: () => [[S0.oil, 'talk'], [EV.ol_gush, 'shock'], [EV.ol_oil, 'laugh'], [EV.ol_second, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1520, s: 1.0, look: t < EV.ol_second ? [0.6, -0.6] : [0.3, -0.1], squash: b.squash + (t > EV.ol_gush && t < EV.ol_gush + 0.2 ? 0.08 : 0), tailUp: t > EV.ol_gush, hand: t > EV.ol_oil && t < EV.ol_second ? [60, -420] : undefined }),
    cam: () => [[S0.oil, 640, 1100, 0.16], [EV.ol_gush, 680, 900, -0.02], [EV.ol_second, 600, 1040, 0.08], [S1.oil, 580, 1060, 0.12]]
  };
  TRANS_IN.oil = { a: 0.15, b: 0.35, fx(k, t, A, B) {               // нефть поднимается из земли и заливает кадр, сверху сходит — 1893-й
    const q = sm(k); drawBuf(k < 0.5 ? A : B);
    scr(() => { const lvl = k < 0.5 ? lerp(2000, -100, sm(k * 2)) : lerp(-100, -2100, sm((k - 0.5) * 2)); const top = k < 0.5 ? lvl : -100, bot = k < 0.5 ? 2100 : 2100 + lvl + 100;
      const P = [[-50, top]]; for (let x = 0; x <= 1130; x += 40) P.push([x, top + Math.sin(x * 0.02 + t * 9) * 26]); P.push([1130, bot], [-50, bot]);
      shape(P, { wash: GZ.oil, washA: 1, w: 3, col: GZ.amber, a: 0.8 }); for (let i = 0; i < 6; i++) pencil([[100 + i * 160, top + 40], [180 + i * 160, top + 46]], { w: 5, col: GZ.amberL, a: 0.6, pass2: false, gap: false }); });
  } };
})();
