/* 022 — сцена `razin`: 1670, грозовой багровый закат, Волга под холмом забита казачьими стругами под алыми парусами; на носу
   переднего — атаман Разин с поднятой саблей. За рекой — острог Царицын с распахнутыми воротами, над башней — казачий флаг.
   На «Семь» всплывает счётчик «7 000 КАЗАКОВ» и струги валом идут к берегу; на «берут» над воротами меняется флаг, гремит залп
   холостых пушек (дым); на «стрельцов» слева по берегу бежит колонна стрельцов в красных кафтанах; на «разбили» их знамёна падают,
   шапки летят, бердыши брошены — бирка «1 000 СТРЕЛЬЦОВ» перечёркивается. Без крови и тел.
   Переход В сцену — металл: блеск сабли рассекает кадр по диагонали, прошлая эпоха съезжает по разрезу. */
(() => {
  EV.rz_seven = wtk('s3', 'Семь');
  EV.rz_take = wtk('s3', 'берут');
  EV.rz_str = wtk('s3', 'стрельцов');
  EV.rz_beat = wtk('s3', 'разбили.');
  KEYW.push('Разина', 'разбили.');
  SHAKES.push([EV.rz_take + 0.1, 0.25, 8], [EV.rz_beat, 0.2, 6]);
  const L = VG.ink;

  function sky(t) {
    sunsetSky(t, { sx: 260, sy: 1000, sr: 80, cols: ['#1a1424', '#3a1a2a', '#7a2030', '#c03a34', '#f07a40', '#ffb860'], seed: 22400, nb: 6, cl1: '#3a1420', cl2: '#a83a30', rays: 0.05 });
    for (let k = 0; k < 3; k++) blob([[-100 + k * 500, -200], [200 + k * 500, -340], [520 + k * 500, -220], [440 + k * 500, -60], [0 + k * 500, -40]], { wash: '#2a1420', washA: 0.6, line: false });   // грозовые тучи
    if (Math.floor(t * 3) % 7 === 0) glow(900, -100, 500, 'rgba(255,220,200,1)', 0.25);
  }
  function far(t) {                                                 // тот берег: острог с распахнутыми воротами, холм
    kurgan(260, 1080, 900, 180, { col: '#5a4a3a', rim: 'rgba(255,100,70,1)', grass: 40, seed: 22401 });
    palisade(500, 1300, 1110, 110, t, { col: '#6a4a30', seed: 22402 });
    push(820, 1110, 0.55); rect(-75, -340, 150, 340, { wash: '#7a5434', washA: 1, w: 2.4, col: L }); poly([[-95, -340], [0, -540], [95, -340]], { wash: '#4a3020', washA: 1, w: 2.4, col: L });
    const open = sm((t - EV.rz_take) / 0.5); rect(-45, -150, 90 * (1 - open) / 2, 150, { wash: '#3a2410', washA: 1, w: 2, col: L }); rect(45 - 90 * (1 - open) / 2, -150, 90 * (1 - open) / 2, 150, { wash: '#3a2410', washA: 1, w: 2, col: L }); if (open > 0) glow(0, -70, 120, 'rgba(255,170,90,1)', 0.5 * open);
    pencil([[0, -540], [0, -760]], { w: 6, col: '#3a2410', pass2: false }); const F = []; for (let k = 0; k <= 8; k++) F.push([k * 18, -750 + Math.sin(t * 6 + k * 0.7) * 8]);
    shape(F.concat(F.map(([x, y]) => [x, y + 70]).reverse()), { wash: t > EV.rz_take ? '#b0283a' : '#e8e0c8', washA: 1, w: 1.8, col: L }); pop();
    for (const x of [600, 1040, 1200]) { push(x, 1110, 0.4); rect(-60, -260, 120, 260, { wash: '#6a4a30', washA: 1, w: 2.4, col: L }); poly([[-80, -260], [0, -400], [80, -260]], { wash: '#4a3020', washA: 1, w: 2.2, col: L }); pop(); }
    if (t > EV.rz_take && t < EV.rz_take + 1.6) for (const x of [640, 1000]) smokeCol(x, 1000, t, { col: 'rgba(230,220,210,0.6)', h: 300, sz: 0.6, n: 6, wind: 140 });
  }
  function river(t) {                                               // Волга со стругами: идут валом к берегу
    volga(1130, 1360, t, { sx: 260, seed: 22403, top: '#9a4a4a', bot: '#1a1a30', farBank: false });
    const q = sm((t - EV.rz_seven) / 2.5), r = rng(22404);
    for (let k = 0; k < 9; k++) { const row = k % 3, x = 1350 - k * 140 - q * 160 + r() * 40, y = 1170 + row * 50, s = 0.18 + row * 0.07; strug(x, y, s, t + k, { sailCol: k % 2 ? '#c8283a' : '#e8483a', flip: -1 }); }
  }
  function boat(t) {                                                // передний струг атамана, у берега
    const q = sm((t - S0.razin) / 1.2); push(lerp(1400, 980, q), 1560, 1); strug(0, 0, 0.95, t, { sailCol: '#c8202a', flip: -1, crew: true }); pop();
    const bx = lerp(1400, 980, q) - 90; human(bx - 40, 1500, 0.62, t, { body: '#b0283a', legs: '#2a2a40', hat: 'fur', hatCol: '#1a1414', beard: 1, seed: 401, prop: 'sword', armR: t > EV.rz_seven ? 'up' : 'hold', trim: VG.gold, flip: -1 });   // Разин
  }
  function streltsy(t) {                                            // стрельцы бегут по берегу; на «разбили» знамёна падают, шапки летят
    if (t < EV.rz_str - 0.2) return; const q = sm((t - EV.rz_str + 0.2) / 0.6), beat = sm((t - EV.rz_beat) / 0.5);
    for (let k = 0; k < 7; k++) { const x = lerp(-300, 120, q) + k * 70 - beat * 240 * (1 + k % 3 * 0.3), y = 1340 + (k % 2) * 14;
      human(x, y, 0.36, t, { body: '#c8202a', legs: '#2a3a2a', boots: '#d8b040', hat: 'fur', hatCol: '#2a5a3a', long: 1, seed: 410 + k, prop: beat > 0.3 ? undefined : 'spear', armR: beat > 0.3 ? 'up' : 'hold', flip: beat > 0.3 ? -1 : 1 }); }
    for (let k = 0; k < 2; k++) { const fx = lerp(-200, 220, q) + k * 260, ang = beat * 1.3; push(fx, 1280, 1, -ang); pencil([[0, 0], [0, -240]], { w: 5, col: '#5a3a22', pass2: false }); shape([[0, -240], [110, -220 + Math.sin(t * 6) * 6], [110, -160], [0, -170]], { wash: '#2a5a3a', washA: 1, w: 2, col: L }); pop(); }
    if (beat > 0) for (let k = 0; k < 6; k++) { const r = rng(420 + k), x = 60 + k * 50 + beat * r() * 100, y = 1220 - Math.sin(beat * Math.PI) * 140 * r(); push(x, y, 0.4, beat * 8 * r()); blob([[-30, 0], [-26, -26], [26, -26], [30, 0]], { wash: '#2a5a3a', washA: 1, w: 1.6, col: L }); rect(-32, -4, 64, 10, { wash: '#6a4a2a', washA: 1, w: 1, col: L }); pop(); }
  }
  function ground(t) {                                              // ближний берег: песок, бердыши, пушка, бочки пороха, канаты, якорь
    rect(-900, 1430, 2900, 800, { wash: '#8a6a44', washA: 1, line: false });
    const r = rng(22405); for (let i = 0; i < 160; i++) { ctx.fillStyle = i % 2 ? 'rgba(60,40,20,0.35)' : 'rgba(255,220,170,0.25)'; ctx.fillRect(-100 + r() * 1300, 1440 + r() * 500, 3 + r() * 5, 2); }
    for (let i = 0; i < 18; i++) { const r2 = rng(22406 + i); ell(-50 + r2() * 1300, 1480 + r2() * 420, 10 + r2() * 14, 5 + r2() * 5, { wash: '#6a5a4a', washA: 1, w: 1, col: L, a: 0.7 }); }
    ctx.save(); ctx.beginPath(); ctx.ellipse(1100, 1600, 420, 70, 0, 0, 6.3); ctx.fillStyle = 'rgba(70,90,120,0.6)'; ctx.fill(); ctx.restore();   // заводь у берега
    boat(t);
    cannon(560, 1600, 0.7, t, { flip: -1 }); if (t > EV.rz_take && t < EV.rz_take + 0.8) { glow(470, 1530, 180, 'rgba(255,200,120,1)', 0.8 * (1 - (t - EV.rz_take) / 0.8)); smokeCol(450, 1520, t, { col: 'rgba(230,220,210,0.7)', h: 260, sz: 0.7, n: 6, wind: -120 }); }
    barrel(760, 1660, 0.6, '#5a3a20'); barrel(830, 1700, 0.55); sack(700, 1720, 0.6); crate(940, 1720, 120, 76); jug(1040, 1700, 0.5);
    push(1150, 1640, 0.8); pencil([[0, 0], [0, -160]], { w: 10, col: '#3a3a3a', pass2: false }); pencil([[-60, -20], [0, 0], [60, -20]], { w: 10, col: '#3a3a3a', pass2: false }); ell(0, -170, 18, 18, { wash: 'rgba(0,0,0,0)', washA: 0, w: 6, col: '#3a3a3a' }); pop();   // якорь
    for (let k = 0; k < 3; k++) pencil(ellPts(600, 1780, 80 - k * 18, 24 - k * 5, 0, 0, 30), { w: 5, col: '#c8a070', pass2: false });   // канат бухтой
    crowd(560, 1300, 1420, 12, t, 22420, { s: 0.36, cols: ['#b0283a', '#3a4a6a', '#5a3a2a', '#2a4a3a', '#6a2a2a'] });   // казаки на берегу
    horse(260, 1420, 0.4, t, { col: '#2a1a14', saddle: '#b0283a' });
    for (const [x, y, c, fl] of [[700, 1520, '#3a4a6a', -1], [980, 1540, '#6a2a2a', -1], [1120, 1500, '#2a4a3a', 1]]) human(x, y, 0.56, t, { body: c, legs: '#2a2a40', hat: 'fur', hatCol: '#1a1414', beard: 1, seed: 430 + x, prop: 'oar', armR: 'up', flip: fl });
  }
  function front(t) { for (let i = 0; i < 6; i++) { const x = -90 + i * 50; pencil([[x, 2100], [x + 30 * Math.sin(t + i), 1600 + i * 30]], { w: 6, col: '#3a4a2a', pass2: false }); }   // камыш
    for (let i = 0; i < 5; i++) { const x = 1160 + i * 40; pencil([[x, 2100], [x - 20 + 20 * Math.sin(t + i), 1650 + i * 20]], { w: 6, col: '#3a4a2a', pass2: false }); ell(x - 20, 1660 + i * 20, 8, 26, { wash: '#5a3a22', washA: 1, w: 1.4, col: L }); } }
  function hud(t) {
    if (t > EV.rz_seven - 0.05) { const q = popK(t, EV.rz_seven - 0.05, 0.35), n = Math.round(7000 * sm((t - EV.rz_seven) / 0.8)); push(600, 780, q, -0.03); rect(-210, -54, 420, 108, { wash: '#14100a', washA: 0.88, w: 3, col: '#e8483a' }); txt(n.toLocaleString('ru-RU') + ' КАЗАКОВ', 0, 8, 54, { col: '#ffd0c0', font: 'Osw' }); pop(); }
    if (t > EV.rz_str) { const q = popK(t, EV.rz_str, 0.35); push(560, 920, q, 0.03); rect(-220, -46, 440, 92, { wash: '#14100a', washA: 0.85, w: 3, col: '#2a8a5a' }); txt('1 000 СТРЕЛЬЦОВ', 0, 8, 46, { col: '#d0f0d8', font: 'Osw' });
      const c = sm((t - EV.rz_beat) / 0.25); if (c > 0) pencil([[-230, 0], [lerp(-230, 230, c), 0]], { w: 10, col: '#e8202a', pass2: false }); pop(); }
  }

  WORLD.razin = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(8, () => river(t));
    lay(3, () => streltsy(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(30, [-200, 300, 1300, 1600], '#ffb080', t, 22407, { sp: 30, vx: 160, sz: 3, a: 0.5, wob: 20 });
    windLines(t, 0.25, [-100, 1100, 1200, 1500], 22408);
    haze('#c04a3a', 0.07);
  };
  DIR.razin = {
    outfit: 'kazakS', light: { side: -1, rim: '#ff8a6a' }, grade: ['#a03a34', 0.14],
    act: () => [[S0.razin, 'talk'], [EV.rz_seven, 'shock'], [EV.rz_take, 'grin'], [EV.rz_str, 'suspicious'], [EV.rz_beat, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1530, s: 1.04, look: t < EV.rz_str ? [0.7, -0.4] : [-0.5, -0.2], tailUp: t > EV.rz_take,
      point: t > EV.rz_seven && t < EV.rz_take ? 1 : undefined, hand: t > EV.rz_seven && t < EV.rz_take ? [220, -330] : undefined }),
    cam: () => [[S0.razin, 640, 1000, 0.14], [EV.rz_seven, 660, 960, 0.04, 'x'], [EV.rz_take, 660, 960, 0.1], [EV.rz_str, 500, 1000, 0.06], [EV.rz_beat, 520, 1000, 0.14], [S1.razin, 540, 1000, 0.18]],
    hud
  };
  TRANS_IN.razin = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // металл: сабельный блеск рассекает кадр, прошлая эпоха съезжает по диагонали
    drawBuf(B); const cut = sm(clamp(k / 0.35)), slide = sm(clamp((k - 0.3) / 0.7));
    scr(() => {
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H * 0.25); ctx.lineTo(0, H * 0.85); ctx.closePath(); ctx.clip(); drawBuf(A, 1, 540, 960, 1, null, -slide * 900, -slide * 700); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, H * 0.85); ctx.lineTo(W, H * 0.25); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip(); drawBuf(A, 1, 540, 960, 1, null, slide * 900, slide * 700); ctx.restore();
      const a = Math.sin(Math.PI * clamp(k / 0.6)); pencil([[lerp(-100, 0, cut), lerp(H * 0.9, H * 0.85, cut)], [lerp(0, W + 100, cut), lerp(H * 0.85, H * 0.22, cut)]], { w: 14, col: '#ffffff', a, pass2: false, gap: false }); glow(lerp(0, W, cut), lerp(H * 0.85, H * 0.25, cut), 200, 'rgba(255,240,220,1)', a);
    });
  } };
})();
