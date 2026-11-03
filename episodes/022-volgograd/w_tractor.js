/* 022 — сцена `tractor`: 1930, Сталинград, стальной рассвет с багровой полосой. На горизонте — тот же холм с двумя водонапорными
   баками. Тракторный завод: цеха с пилообразной крышей, трубы, кран, ж/д ветка с вагонами «ЧАСТИ», пароход на Волге, рабочие в кепках.
   На «Сталинград!» над воротами загораются буквы «СТЗ · СТАЛИНГРАД»; на «Америке» прилетает ящик со штампом «USA» и открытка
   со Статуей Свободы; на «разобрали» схема цеха в HUD разлетается на детали; на «сюда» ящик падает, из ворот выкатывается
   первый трактор с флажком. Переход В сцену — металл: клёпаные стальные створки съезжаются с искрами и раскрываются. */
(() => {
  EV.tr_city = wtk('s5', 'Сталинград!');
  EV.tr_usa = wtk('s5', 'Америке,');
  EV.tr_apart = wtk('s5', 'разобрали');
  EV.tr_here = wtk('s5', 'сюда.');
  KEYW.push('Сталинград!', 'Америке,', 'сюда.');
  SHAKES.push([EV.tr_here + 0.05, 0.25, 8]);
  const L = VG.ink;

  function sky(t) { sunsetSky(t, { sx: 200, sy: 1000, sr: 90, cols: ['#2a3448', '#4a5a72', '#8a8a96', '#c87a62', '#f0a070', '#ffd8a0'], seed: 22600, nb: 7, cl1: '#5a6a80', cl2: '#c88070' }); }
  function far(t) {                                                 // холм с водонапорными баками, Волга, пароход
    kurgan(900, 1000, 900, 150, { col: '#6a6a54', rim: 'rgba(255,140,100,1)', grass: 30, seed: 22601 });
    for (const x of [860, 960]) { push(x, 880, 0.5); for (const sd of [-1, 1]) pencil([[sd * 30, 0], [sd * 20, -120]], { w: 4, col: L, pass2: false }); rect(-40, -180, 80, 60, { wash: '#7a7a80', washA: 1, w: 2, col: L }); pop(); }
    volga(1010, 1090, t, { sx: 200, seed: 22602, top: '#a88a8a', bot: '#3a4a5a', farBank: false });
    push(380 + (t - S0.tractor) * 20, 1060, 0.4); rect(-160, -30, 320, 40, { wash: '#2a2a34', washA: 1, w: 2, col: L }); rect(-90, -80, 180, 50, { wash: '#efe6d4', washA: 1, w: 2, col: L }); rect(-10, -150, 30, 70, { wash: '#b0283a', washA: 1, w: 2, col: L }); smokeCol(5, -160, t, { col: 'rgba(60,60,70,0.5)', h: 200, sz: 0.4, n: 5, wind: -60 }); pop();
  }
  function plant(t) {                                               // завод: цеха, трубы, кран, вагоны, ворота с буквами
    hills(1240, 10, '#6a6460', 22603, 1);
    factoryHall(-120, 1240, 520, 220, t, { lit: 1, chim: [40, 260] });
    factoryHall(720, 1240, 560, 260, t, { lit: 1, chim: [880, 1120] });
    push(560, 1240, 1); rect(-150, -200, 30, 200, { wash: '#5a5a5a', washA: 1, w: 2, col: L }); rect(120, -200, 30, 200, { wash: '#5a5a5a', washA: 1, w: 2, col: L });   // ворота
    const on = sm((t - EV.tr_city) / 0.4); rect(-170, -270, 340, 70, { wash: '#2a1a1a', washA: 1, w: 2.4, col: L }); txt('СТЗ · СТАЛИНГРАД', 0, -224, 36, { col: lerpC('#5a4a40', '#ffd890', on), font: 'Osw' }); if (on > 0) glow(0, -236, 220, 'rgba(255,210,140,1)', 0.4 * on);
    pop();
    push(520, 1000, 1); pencil([[0, 0], [0, -420]], { w: 10, col: '#c83a2a', pass2: false }); for (let k = 0; k < 10; k++) pencil([[-14, -k * 42], [14, -k * 42 - 42]], { w: 2, col: '#c83a2a', pass2: false });   // кран
    pencil([[-80, -420], [360, -420]], { w: 10, col: '#c83a2a', pass2: false }); const hx = 300 - sm((t - EV.tr_usa) / 1.2) * 200; pencil([[hx, -420], [hx, -240]], { w: 2, col: L, pass2: false }); rect(hx - 40, -240, 80, 50, { wash: '#a87a4a', washA: 1, w: 2, col: L }); pop();
    for (let k = 0; k < 4; k++) { const x = -200 + k * 230 + Math.max(0, t - EV.tr_city) * 30; push(x, 1290, 0.6); rect(-160, -130, 320, 110, { wash: k % 2 ? '#7a3a2a' : '#5a4a3a', washA: 1, w: 2.2, col: L }); txt('ЧАСТИ', 0, -64, 34, { col: '#f6ecd6', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 100, -14, 22, 22, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pop(); }
    pencil([[-200, 1296], [1300, 1296]], { w: 4, col: '#3a3a3a', pass2: false });
    const P = [[180, '#4a5a7a'], [300, '#3a3a3a'], [420, '#5a4a3a'], [700, '#4a5a7a'], [820, '#6a3a2a'], [960, '#3a4a5a'], [1080, '#4a4a3a'], [1180, '#5a3a4a']];
    crowd(100, 1200, 1300, 12, t, 22620, { s: 0.32, cols: ['#4a5a7a', '#3a3a3a', '#5a4a3a', '#6a3a2a', '#3a4a5a'] });
    horse(1000, 1340, 0.3, t, { col: '#5a3a1e', load: 1, flip: -1 });
    P.forEach(([x, c], i) => human(x, 1320 + (i % 2) * 10, 0.34, t, { body: c, legs: '#2a2a34', hat: 'cap', hatCol: '#2a2a2a', seed: 600 + i, armR: t > EV.tr_here && i % 2 ? 'wave' : 'hold', armL: i % 3 ? 'down' : 'up', flip: i % 2 ? -1 : 1 }));
  }
  function ground(t) {                                              // заводской двор: брусчатка, рельсы, ящики USA, детали, первый трактор
    rect(-900, 1350, 2900, 800, { wash: '#7a7068', washA: 1, line: false });
    for (let k = 0; k < 3; k++) { const y = 1420 + k * 140; pencil([[-200, y], [1300, y + 20]], { w: 6, col: '#4a4440', pass2: false }); pencil([[-200, y + 30], [1300, y + 50]], { w: 6, col: '#4a4440', pass2: false }); for (let i = 0; i < 16; i++) pencil([[-160 + i * 90, y - 6 + i * 1.3], [-150 + i * 90, y + 40 + i * 1.3]], { w: 8, col: '#5a3a2a', a: 0.8, pass2: false }); }
    for (const [x, y, w, h] of [[440, 1560, 160, 100], [620, 1600, 130, 90], [520, 1700, 180, 110]]) { crate(x, y, w, h, { col: '#b08850' }); txt('USA', x + w / 2, y - h / 2 + 10, 30, { col: '#3a2410', font: 'Osw' }); }
    for (let k = 0; k < 5; k++) { const r = rng(22604 + k); push(760 + k * 70, 1740 + r() * 40, 0.5 + r() * 0.3, r() * 3); ell(0, 0, 40, 40, { wash: '#6a6a70', washA: 1, w: 2, col: L }); ell(0, 0, 14, 14, { wash: '#3a3a40', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 8; q++) rect(Math.cos(q * 0.785) * 40 - 6, Math.sin(q * 0.785) * 40 - 6, 12, 12, { wash: '#6a6a70', washA: 1, w: 1, col: L }); pop(); }   // шестерни
    const out = sm((t - EV.tr_here) / 1.0); stz(lerp(1400, 900, out), 1560, 0.85, t, { speed: out < 1 ? 1 : 0, driver: 1 });
    if (out > 0) { push(lerp(1400, 900, out) - 120, 1300, 1); pencil([[0, 0], [0, -120]], { w: 3, col: L, pass2: false }); shape([[0, -120], [70, -110 + Math.sin(t * 8) * 6], [70, -70], [0, -80]], { wash: '#c8202a', washA: 1, w: 1.6, col: L }); pop(); }
    if (t > EV.tr_here && t < EV.tr_here + 0.6) for (let i = 0; i < 12; i++) { const r = rng(hsh(FRAME, i, 61)); ell(520 + r() * 260, 1560 - r() * 120, 30, 16, { wash: '#a89a8a', washA: 0.6, line: false }); }
    human(1180, 1720, 0.6, t, { body: '#2a3a5a', legs: '#2a2a34', hat: 'cap', hatCol: '#1a1a1a', seed: 620, armR: 'point', flip: -1 });   // мастер
    human(380, 1760, 0.6, t, { body: '#6a6a5a', legs: '#2a2a34', hat: 'scarf', hatCol: '#c8202a', seed: 621, armL: 'hold', armR: 'hold' });   // работница в красной косынке
    barrel(1060, 1500, 0.5, '#3a3a3a'); barrel(1120, 1520, 0.5, '#3a3a3a');
  }
  function front(t) { for (const x of [-80, 1200]) { rect(x - 40, 1000, 80, 1200, { wash: '#4a4a52', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 12; k++) ell(x, 1040 + k * 90, 7, 7, { wash: '#8a8a92', washA: 1, w: 1, col: L }); }   // стальные колонны цеха
    for (let i = 0; i < 6; i++) { const r = rng(22607 + i); push(1100 + r() * 160, 2000 - r() * 200, 1.2, r() * 3); ell(0, 0, 40, 40, { wash: '#5a5a62', washA: 1, w: 2, col: L }); ell(0, 0, 14, 14, { wash: '#2a2a30', washA: 1, w: 1.6, col: L }); pop(); } }
  function hud(t) {
    if (t > EV.tr_usa - 0.05) { const q = popK(t, EV.tr_usa - 0.05, 0.35), gone = sm((t - EV.tr_apart) / 0.3); if (gone < 1) { push(760, 780, q * (1 - gone * 0.5), 0.08);
        rect(-120, -150, 240, 300, { wash: '#f6ecd6', washA: 1, w: 3, col: L }); rect(-100, -130, 200, 210, { wash: '#8ac0d8', washA: 1, w: 1.6, col: L }); liberty(0, 80, 200, t); txt('USA', 0, 120, 36, { col: '#b0283a', font: 'Osw' }); pop(); } }
    if (t > EV.tr_apart - 0.05 && t < EV.tr_here + 0.3) { const k = sm((t - EV.tr_apart + 0.05) / 0.6), back = sm((t - EV.tr_here + 0.2) / 0.4);
      push(620, 860, 0.9); const parts = [[-120, -60, 120, 70, -1, -1], [0, -60, 120, 70, 1, -1], [-120, 10, 80, 60, -1, 1], [-40, 10, 80, 60, 0, 1], [40, 10, 80, 60, 1, 1], [-60, -110, 120, 50, 0, -1.5]];
      parts.forEach(([x, y, w, h, dx, dy], i) => { const d = k * (1 - back) * 120; rect(x + dx * d, y + dy * d, w, h, { wash: ['#c8d2dc', '#8a96a6', '#b0283a'][i % 3], washA: 0.95, w: 2.4, col: L }); });
      txt('ЗАВОД', 0, 130, 40, { col: '#fff2d8', font: 'Osw' }); pop(); }
  }

  WORLD.tractor = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(5, () => plant(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(30, [-200, 300, 1300, 1600], '#e8e0d0', t, 22605, { sp: 20, vx: 60, sz: 2.4, a: 0.4, wob: 18 });
    haze('#a0a0b0', 0.06);
  };
  DIR.tractor = {
    outfit: 'iron', light: { side: -1, rim: '#ffb890' }, grade: ['#7a8090', 0.12],
    act: () => [[S0.tractor, 'proud'], [EV.tr_usa, 'shock'], [EV.tr_apart, 'sideeye'], [EV.tr_here, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1530, s: 1.04, look: t < EV.tr_here ? [0.6, -0.6] : [0.9, 0.1], tailUp: t > EV.tr_here,
      point: t > EV.tr_here ? 1 : undefined, hand: t > EV.tr_here ? [240, -200] : undefined }),
    cam: () => [[S0.tractor, 600, 960, 0.1], [EV.tr_city, 600, 920, 0.04, 'x'], [EV.tr_usa, 640, 960, 0.1], [EV.tr_here, 640, 1060, 0.12, 'x'], [S1.tractor, 620, 1060, 0.16]],
    hud
  };
  TRANS_IN.tractor = { a: 0.2, b: 0.4, fx(k, t, A, B) {            // клёпаные створки: съезжаются с искрами, раскрываются в новую эпоху
    const close = sm(clamp(k / 0.45)), open = sm(clamp((k - 0.55) / 0.45)), w = (close - open) * W / 2;
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { for (const sd of [0, 1]) { const x = sd ? W - w : 0; rect(x, 0, w, H, { wash: '#5a6474', washA: 1, w: 3, col: L, line: w > 4 });
        for (let r = 0; r < 24; r++) for (let c = 0; c < 2; c++) ell(sd ? W - w + 30 + c * 60 : w - 30 - c * 60, 40 + r * 80, 7, 7, { wash: '#a8b2c0', washA: 1, w: 1, col: L, a: w > 120 ? 1 : 0 }); }
      if (k > 0.35 && k < 0.65) { glow(W / 2, H / 2, 400, 'rgba(255,200,120,1)', 0.7); motes(80, [W / 2 - 40, 0, W / 2 + 40, H], '#ffd080', t, 22606, { sp: 300, vx: 400, sz: 4, a: 1, wob: 40 }); } });
  } };
})();
