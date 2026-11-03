/* 022 — сцена `battle`: 1942, Сталинград в руинах, багровое зарево и сталь дыма. В центре — тот же холм (высота 102,0) с двумя
   водонапорными баками; по склону короткими перебежками поднимаются наши бойцы (со спины, без знаков), по холму рвутся разрывы.
   Слева — выгоревшие дома, остов трамвая, фонтан «Бармалей» (дети вокруг крокодила); позади — Волга, переправа на лодках
   под осветительными ракетами, прожекторы. На «Двести» листается календарь до «200 ДНЕЙ»; на «миллионов» — счётчик «≈ 2 000 000»;
   на «холм» стрелка указывает на вершину и бирка «135 ДНЕЙ». Без крови, тел и чужой символики. Музыка приглушена.
   Переход В сцену — земля: взрыв — из-под кадра поднимается столб тёмной земли и осыпается. */
(() => {
  EV.bt_200 = wtk('s6', 'Двести');
  EV.bt_mil = wtk('s6', 'миллионов');
  EV.bt_hill = wtk('s6', 'холм');
  EV.bt_135 = wtk('s6', 'сто');
  KEYW.push('Двести', 'миллионов', 'холм');
  SHAKES.push([S0.battle + 0.05, 0.4, 10], [EV.bt_hill, 0.3, 8]);
  const L = VG.ink;

  function sky(t) {
    vgrad(-900, 1300, ['#120c14', '#2a1418', '#5a1a1e', '#a0302a', '#d8603a'], 1);
    for (let k = 0; k < 5; k++) { const x = (k * 300 + t * 20) % 1500 - 200; blob([[x - 300, 300 + k * 60], [x, 120 + k * 50], [x + 320, 260 + k * 60], [x + 200, 420 + k * 50], [x - 200, 440 + k * 60]], { wash: '#1a1012', washA: 0.55, line: false }); }
    for (const [x, a0] of [[200, -0.4], [980, 0.5]]) { const a = a0 + Math.sin(t * 0.8 + x) * 0.25; beam(x, 1200, -Math.PI / 2 + a, 1500, 0.12, 'rgba(220,230,255,1)'); }   // прожекторы
    for (let k = 0; k < 3; k++) { const ft = (t * 0.4 + k * 0.33) % 1, fx = 200 + k * 380, fy = lerp(300, 700, ft); glow(fx, fy, 140, 'rgba(255,240,200,1)', 0.5 * (1 - ft)); ell(fx, fy, 6, 6, { wash: '#fff8e0', washA: 1, line: false }); }   // осветительные ракеты
  }
  function far(t) {                                                 // Волга с переправой, дальний берег в дыму
    volga(1000, 1080, t, { sx: 600, seed: 22701, top: '#7a3a3a', bot: '#1a1420', farBank: true, bank: '#1e1418' });
    for (let k = 0; k < 4; k++) { const x = (k * 330 + t * 26) % 1400 - 150; strug(x, 1050, 0.12, t + k, { sail: false, col: '#2a2a2a' }); }
    for (let k = 0; k < 6; k++) { const r = rng(22702 + k); if (Math.floor(t * 2 + k) % 4 === 0) { pencil([[100 + k * 200, 1060], [100 + k * 200 + r() * 20, 1000]], { w: 6, col: '#e8eef6', a: 0.6, pass2: false }); } }   // всплески
  }
  function hill(t) {                                                // высота 102,0: баки, разрывы, бойцы на склоне
    kurgan(760, 1220, 1200, 300, { col: '#4a3a30', rim: 'rgba(255,90,50,1)', seed: 22703, shade: true });
    for (const x of [700, 840]) { push(x, 930, 0.7); for (const sd of [-1, 1]) pencil([[sd * 30, 0], [sd * 20, -120]], { w: 5, col: L, pass2: false }); const tk = blob([[-46, -120], [-40, -190], [40, -194], [50, -120]], { wash: '#5a5250', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) { const r = rng(22704 + i + x); ell(-30 + r() * 60, -170 + r() * 40, 5, 5, { wash: '#1a1010', washA: 1, line: false }); } pop(); }
    for (let k = 0; k < 5; k++) { const ph = (t * 0.9 + k * 0.37) % 1, x = 420 + k * 170, y = 1000 + (k % 2) * 60; if (ph < 0.35) { const q = ph / 0.35; glow(x, y, 160 * q + 40, 'rgba(255,170,80,1)', 0.8 * (1 - q)); for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * 0.25; pencil([[x, y], [x + Math.cos(a) * 140 * q, y + Math.sin(a) * 160 * q]], { w: 6, col: '#2a1a14', a: 1 - q, pass2: false }); } }
      smokeCol(x, y - 20, t + k, { col: 'rgba(40,30,30,0.5)', h: 300, sz: 0.5, n: 4, wind: 40 }); }
    for (let k = 0; k < 9; k++) { const ph = (t * 0.25 + k * 0.13) % 1, x = 320 + k * 90 + ph * 40, y = 1200 - ph * 140 - (k % 3) * 20;   // перебежки вверх по склону
      soldier(x, y, 0.2, t + k, { seed: 700 + k, flip: k % 2 ? 1 : -1, armR: 'up', armL: 'hold', look: [0, -1] }); }
  }
  function ruins(t) {                                               // выгоревшие дома, трамвай, фонтан «Бармалей»
    hills(1290, 10, '#3a2a28', 22705, 1);
    for (const [x, w, h, s] of [[-140, 300, 460, 22706], [140, 200, 340, 22707], [880, 260, 520, 22708], [1110, 220, 380, 22709]]) ruinBlock(x, 1300, w, h, t, { seed: s, fire: 0.45, col: '#5a4440' });
    for (const x of [200, 1000]) smokeCol(x, 900, t, { col: 'rgba(30,24,24,0.6)', h: 600, sz: 0.9, n: 7, wind: 80 });
    push(520, 1320, 0.6); rect(-200, -160, 400, 140, { wash: '#4a3a34', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 6; k++) rect(-180 + k * 62, -140, 44, 60, { wash: '#1a1010', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) ell(sd * 130, -14, 24, 24, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pencil([[-60, -160], [-30, -240], [40, -240]], { w: 3, col: L, pass2: false }); pop();   // остов трамвая
    push(720, 1330, 0.55); ell(0, 0, 200, 40, { wash: '#6a6058', washA: 1, w: 2.4, col: L }); blob([[-80, -30], [-60, -70], [60, -70], [90, -40], [100, -30]], { wash: '#5a6a4a', washA: 1, w: 2, col: L });   // крокодил
    for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283, x = Math.cos(a) * 150, y = -20 + Math.sin(a) * 26; ell(x, y - 70, 14, 16, { wash: '#a8a094', washA: 1, w: 1.6, col: L }); blob([[x - 12, y], [x - 10, y - 56], [x + 10, y - 56], [x + 12, y]], { wash: '#a8a094', washA: 1, w: 1.6, col: L }); pencil([[x - 10, y - 50], [x - 30, y - 70]], { w: 3, col: '#a8a094', pass2: false }); } pop();
  }
  function ground(t) {                                              // ближний план: траншея, мешки с песком, ящики, каски, катушка связи
    rect(-900, 1380, 2900, 800, { wash: '#3a2e28', washA: 1, line: false });
    blackGround(1380, t, { col: '#3a2e28', craters: 6, shards: 120, seed: 22710 });
    for (let k = 0; k < 9; k++) { const x = 380 + k * 90, y = 1460 + (k % 2) * 10; blob([[x - 50, y], [x - 46, y - 40], [x + 46, y - 40], [x + 50, y]], { wash: '#8a7a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: L } }); }   // бруствер
    for (let k = 0; k < 8; k++) { const x = 420 + k * 90, y = 1420; blob([[x - 46, y], [x - 42, y - 36], [x + 42, y - 36], [x + 46, y]], { wash: '#7a6a4e', washA: 1, w: 2, col: L }); }
    for (const [x, y, s, fl, ar] of [[640, 1400, 0.5, -1, 'point'], [820, 1410, 0.48, 1, 'hold'], [1000, 1400, 0.5, -1, 'up'], [1160, 1420, 0.46, -1, 'hold']]) soldier(x, y, s, t, { seed: 720 + x, flip: fl, armR: ar, look: [0, -0.8] });
    soldier(520, 1690, 0.6, t, { seed: 740, armR: 'hold', armL: 'hold', look: [0.3, -0.9] });   // связист у катушки
    soldier(1220, 1700, 0.62, t, { seed: 741, flip: -1, armR: 'point', look: [-0.2, -0.9] });
    soldier(760, 1420, 0.46, t, { seed: 742, armR: 'up', look: [0, -1] });
    dog(980, 1760, 0.4, t, { col: '#6a5a4a' });
    crate(500, 1640, 140, 80, { col: '#5a5a3a' }); crate(660, 1680, 120, 70, { col: '#4a4a30' }); for (const x of [880, 960]) { push(x, 1700, 0.7); blob([[-44, 0], [-40, -40], [0, -60], [40, -40], [44, 0]], { wash: '#5a6a4a', washA: 1, w: 2, col: L }); pop(); }   // каски
    push(1100, 1660, 0.8); ell(0, -40, 50, 50, { wash: '#4a3a2a', washA: 1, w: 2, col: L }); ell(0, -40, 20, 20, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pencil([[0, -40], [140, 60]], { w: 2, col: '#2a2a2a', pass2: false }); pop();   // катушка связиста
    jug(780, 1760, 0.5, '#5a5a4a'); barrel(1200, 1760, 0.5, '#3a3a30');
  }
  function front(t) { rubble(-260, 2000, 460, 22711, { n: 14 }); rubble(1060, 2020, 420, 22712, { n: 12 }); for (const x of [-40, 1150]) { pencil([[x, 2100], [x + 30, 1300]], { w: 18, col: '#2a1a14', pass2: false }); pencil([[x + 30, 1300], [x + 120, 1240]], { w: 10, col: '#2a1a14', pass2: false }); } sparks(t, [-200, 1200, 1300, 2000], 22713); }
  function hud(t) {
    if (t > EV.bt_200 - 0.05) { const q = popK(t, EV.bt_200 - 0.05, 0.3), n = Math.min(200, Math.round(200 * sm((t - EV.bt_200) / 0.7))); push(560, 760, q, -0.03);
      rect(-170, -70, 340, 140, { wash: '#f2ece0', washA: 0.95, w: 3, col: L }); rect(-170, -70, 340, 36, { wash: '#b0283a', washA: 1, w: 3, col: L }); txt(n + ' ДНЕЙ', 0, 34, 66, { col: '#2a1414', font: 'Osw' }); pop(); }
    if (t > EV.bt_mil - 0.05) { const q = popK(t, EV.bt_mil - 0.05, 0.3), n = Math.round(2000000 * sm((t - EV.bt_mil) / 0.6)); push(580, 920, q, 0.02); rect(-230, -46, 460, 92, { wash: '#14100a', washA: 0.88, w: 3, col: VG.steelL }); txt('≈ ' + n.toLocaleString('ru-RU'), 0, 10, 54, { col: '#e8eef6', font: 'Osw' }); pop(); }
  }
  function hud2(t) {
    if (t > EV.bt_hill - 0.05) { const q = sm((t - EV.bt_hill + 0.05) / 0.3); pencil([[560, 1060], [lerp(560, 760, q), lerp(1060, 940, q)]], { w: 8, col: '#ffd890', pass2: false });
      if (t > EV.bt_135 - 0.05) { const p = popK(t, EV.bt_135 - 0.05, 0.3); push(560, 1080, p, -0.04); rect(-180, -44, 360, 88, { wash: '#b0283a', washA: 0.92, w: 3, col: '#ffe0d0' }); txt('135 ДНЕЙ', 0, 12, 56, { col: '#fff0e8', font: 'Osw' }); pop(); } }
  }

  WORLD.battle = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(9, () => hill(t));
    lay(5, () => ruins(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    lay(1, () => hud2(t));
    motes(60, [-200, 0, 1300, 1700], '#ff9a5a', t, 22714, { sp: -40, vx: 40, sz: 3, a: 0.6, wob: 30 });
    motes(50, [-200, 0, 1300, 1700], '#6a6060', t, 22715, { sp: 30, vx: 80, sz: 3, a: 0.5, wob: 20 });
    haze('#7a2a2a', 0.1);
  };
  DIR.battle = {
    outfit: 'voen', light: { side: 1, rim: '#ff7a4a' }, grade: ['#7a2a2a', 0.18],
    act: () => [[S0.battle, 'scared'], [EV.bt_200, 'neutral'], [EV.bt_mil, 'awe'], [EV.bt_hill, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1540, s: 1.02, look: t < EV.bt_hill ? [0.5, -0.3] : [0.7, -0.7], noHat: false,
      point: t > EV.bt_hill ? 1 : undefined, hand: t > EV.bt_hill ? [230, -380] : undefined }),
    cam: () => [[S0.battle, 640, 960, 0.18], [EV.bt_200, 620, 960, 0.08], [EV.bt_mil, 600, 940, 0.02, 'x'], [EV.bt_hill, 660, 900, 0.1], [S1.battle, 680, 900, 0.16]],
    hud
  };
  TRANS_IN.battle = { a: 0.15, b: 0.4, fx(k, t, A, B) {            // взрыв: столб тёмной земли из-под кадра, осыпается — открывая 1942
    const up = sm(clamp(k / 0.45)), down = sm(clamp((k - 0.45) / 0.55));
    if (k < 0.45) drawBuf(A, 1 + up * 0.04); else drawBuf(B);
    scr(() => { const r = rng(22716); glow(540, 1900, 900 * up, 'rgba(255,150,70,1)', 0.8 * (1 - down));
      for (let i = 0; i < 70; i++) { const a = -Math.PI / 2 + (r() - 0.5) * 1.6, d = (400 + r() * 1800) * up, x = 540 + Math.cos(a) * d * 0.8, y = 1950 + Math.sin(a) * d + down * down * 2600 * (0.5 + r()), s = 40 + r() * 120;
        ctx.globalAlpha = 1 - down * 0.6; ctx.fillStyle = i % 3 ? '#2a1e18' : '#4a3426'; ctx.beginPath(); ctx.ellipse(x, y, s, s * 0.7, r() * 3, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1; });
  } };
})();
