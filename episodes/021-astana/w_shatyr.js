/* 021 — сцена `shatyr`: 2010, внутри Хан Шатыра. Сверху и по бокам — прозрачная оболочка шатра с сеткой тросов, за ней ночная
   метель и уличный термометр «−40°». Внутри — тёплый пляж: пальмы, бирюзовый бассейн, шезлонги, зонтики, горка, спасатель, бар.
   На «минус сорок» термометр выскакивает и снаружи бьёт порыв, Том в пуховике дрожит; на «шатра» — «пуф», Том в пляжной рубахе
   и очках; на «пляж» — мяч летит над бассейном; на «Мальдив!» рабочий высыпает мешок «MALDIVES SAND», крупный песок искрится.
   Переход В сцену — буран: снег заметает кадр добела, из белого проступает тёплый пляж. */
(() => {
  EV.sh_m40 = wtk('s2', 'минус');
  EV.sh_in = wtk('s2', 'шатра');
  EV.sh_beach = wtk('s2', 'пляж');
  EV.sh_sand = wtk('s2', 'Мальдив!');
  KEYW.push('сорок,', 'Мальдив!');
  SHAKES.push([EV.sh_m40, 0.25, 6]);

  function outside(t) {                                            // за оболочкой: ночь, метель, огни города
    vgrad(-900, 1300, ['#0a1a30', '#1a3050', '#2a4a6a', '#4a6a88'], 1);
    for (let k = 0; k < 9; k++) { const x = -200 + k * 170, h = 200 + (k * 73) % 240; rect(x, 1150 - h, 120, h, { wash: '#1a2a3e', washA: 1, w: 1.4, col: '#0a1018', a: 0.6 }); windows(x + 6, 1160 - h, 108, h - 20, 4, Math.round(h / 30), 300 + k, 0.5, '#ffd98a', '#9fd8ff', 0.6); }
    motes(90, [-300, -200, 1400, 800], '#ffffff', t, 21031, { sp: 160, vx: 520 + 400 * sm((t - EV.sh_m40) / 0.3), sz: 3, a: 0.8, wob: 30, stretch: 3 });
  }
  function shell(t) {                                              // оболочка шатра: тросы сходятся к вершине, блики ETFE
    const top = [560, -700]; const L = '#c8e0e8';
    const wall = ctx.createLinearGradient(0, 780, 0, 1260); wall.addColorStop(0, 'rgba(255,200,130,0)'); wall.addColorStop(0.35, 'rgba(255,196,120,0.85)'); wall.addColorStop(1, 'rgba(240,170,90,1)'); ctx.save(); ctx.fillStyle = wall; ctx.fillRect(-900, 780, 2900, 520); ctx.restore();
    for (let k = 0; k < 12; k++) { const x = -260 + k * 140; rect(x, 1080, 110, 170, { wash: k % 2 ? '#c8783a' : '#a8603a', washA: 1, w: 1.6, col: AZ.ink, a: 0.5 }); rect(x + 14, 1110, 82, 60, { wash: '#ffe0a0', washA: 1, w: 1.2, col: AZ.ink, a: 0.5 }); glow(x + 55, 1140, 70, 'rgba(255,220,150,1)', 0.4); pencil([[x, 1080], [x + 110, 1080]], { w: 6, col: ['#2aa0a0', '#e8582a', '#f2c84a'][k % 3], pass2: false }); }   // галерея магазинов
    for (let k = 0; k <= 22; k++) { const bx = -700 + k * 110; pencil(spline([[bx, 1300], [lerp(bx, top[0], 0.45) + (bx < 560 ? -80 : 80), 300], top], false, 12), { w: 3, col: L, a: 0.5, pass2: false, gap: false }); }
    for (let k = 1; k < 9; k++) { const y = 1200 - k * 210, w2 = 1500 * (1 - k / 9.5); pencil(ellPts(560, y, w2, 40, 0, 0, 50).slice(25, 51), { w: 2.4, col: L, a: 0.45, pass2: false, gap: false }); }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, -800, 0, 1300); g.addColorStop(0, 'rgba(120,200,220,0.16)'); g.addColorStop(1, 'rgba(255,190,120,0.12)'); ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 2200); ctx.restore();
    // уличный термометр за стеклом
    const q = popK(t, EV.sh_m40, 0.4); if (t > EV.sh_m40 - 0.05) { push(840, 720, 0.8 + 0.3 * q, 0.06); rect(-70, -170, 140, 340, { wash: '#f2ead8', washA: 1, w: 3, col: AZ.ink }); ell(0, 120, 34, 34, { wash: '#2a7ad8', washA: 1, w: 2.4, col: AZ.ink }); rect(-10, -130, 20, 250, { wash: '#2a7ad8', washA: 1, w: 2, col: AZ.ink }); txt('−40°', -150, 40, 90, { col: '#9fd8ff', font: 'Osw' }); pop(); }
  }
  function decor(t) {                                              // пальмы, горка, бар, вышка спасателя, люди на дальнем берегу
    const L = AZ.ink;
    for (const [px, ph, lean] of [[-60, 640, -0.15], [140, 560, 0.1], [960, 620, 0.12], [1150, 540, -0.1]]) {
      const top = [px + lean * ph, 1240 - ph]; pencil(spline([[px, 1240], [px + lean * ph * 0.4, 1240 - ph * 0.5], top], false, 10), { w: 26, col: '#8a6a3a', pass2: false });
      for (let y = 1220; y > top[1]; y -= 26) pencil([[px + lean * (1240 - y) - 13, y], [px + lean * (1240 - y) + 13, y - 6]], { w: 2, col: '#4a3418', a: 0.6, pass2: false });
      for (let k = 0; k < 7; k++) { const a = -Math.PI + k * 0.52 + Math.sin(t * 1.5 + k) * 0.05, l = 190; const P = [top, [top[0] + Math.cos(a) * l * 0.6, top[1] + Math.sin(a) * l * 0.5 - 30], [top[0] + Math.cos(a) * l, top[1] + Math.sin(a) * l * 0.4 + 40]];
        pencil(spline(P, false, 8), { w: 18, col: k % 2 ? '#2a8a3a' : '#3aa04a', pass2: false }); }
      for (let k = 0; k < 3; k++) ell(top[0] - 14 + k * 14, top[1] + 18, 12, 12, { wash: '#6a4a1a', washA: 1, w: 1.4, col: L }); }
    // аквагорка
    pencil(spline([[700, 820], [820, 900], [700, 1000], [840, 1100], [760, 1230]], false, 16), { w: 34, col: '#e8582a', pass2: false }); pencil(spline([[700, 820], [820, 900], [700, 1000], [840, 1100], [760, 1230]], false, 16), { w: 14, col: '#ffb07a', pass2: false });
    rect(670, 800, 60, 440, { wash: '#c8c4bc', washA: 1, w: 2, col: L }); for (let y = 820; y < 1230; y += 40) pencil([[670, y], [730, y]], { w: 2, col: L, a: 0.5, pass2: false });
    // бар с соломенной крышей
    push(330, 1240, 1); rect(-120, -120, 240, 120, { wash: '#a8702a', washA: 1, w: 2.2, col: L }); poly([[-160, -120], [0, -210], [160, -120]], { wash: '#e8c870', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 12; k++) pencil([[-150 + k * 26, -124], [-146 + k * 26, -104]], { w: 2, col: '#8a6a2a', pass2: false });
    txt('SKY BEACH', 0, -80, 30, { col: '#f6ecd6', font: 'Osw' }); for (let k = 0; k < 5; k++) { rect(-90 + k * 40, -40, 16, 30, { wash: ['#e8582a', '#f2c84a', '#2aa0a0'][k % 3], washA: 1, w: 1.2, col: L }); } pop();
    human(250, 1240, 0.38, t, { body: '#f2f2ea', legs: '#2a2a30', seed: 81, armR: 'hold' });   // бармен
    // вышка спасателя
    push(1030, 1250, 1); for (const sd of [-1, 1]) pencil([[sd * 50, 0], [sd * 30, -220]], { w: 8, col: '#f2f2ea', pass2: false }); rect(-50, -250, 100, 40, { wash: '#c8302a', washA: 1, w: 2, col: L }); pop();
    human(1030, 1010, 0.34, t, { body: '#c8302a', legs: '#c8302a', hat: 'cap', hatCol: '#f2f2ea', seed: 82, armR: 'up' });
    // люди на дальнем краю
    human(470, 1250, 0.34, t, { body: '#2a8aa0', legs: '#2a2a30', seed: 83, armL: 'wave' });
    human(560, 1252, 0.3, t, { body: '#e8a83a', legs: '#2a2a30', seed: 84, armR: 'up' });
    human(880, 1254, 0.34, t, { body: '#6a3a8a', legs: '#2a2a30', hat: 'scarf', hatCol: '#f2c84a', seed: 85, long: 1 });
  }
  function pool(t) {                                               // бассейн с волнами и плавающими
    const L = AZ.ink; const p = blob([[-400, 1270], [300, 1250], [1000, 1262], [1500, 1280], [1500, 1380], [600, 1395], [-400, 1385]], { wash: '#2ab4c0', washA: 1, w: 3, col: '#f2ead8' });
    ctx.save(); ctx.clip(p.path); for (let i = 0; i < 30; i++) { const r = rng(i + 21032), x = -300 + ((r() * 1700 + t * 40) % 1700), y = 1260 + r() * 130; pencil([[x, y], [x + 40, y + Math.sin(t * 4 + i) * 4]], { w: 3, col: '#e8ffff', a: 0.6, pass2: false, gap: false }); } ctx.restore();
    for (const [x, c] of [[120, '#f2c84a'], [560, '#e8582a'], [900, '#f2f2f2']]) { ell(x, 1320 + Math.sin(t * 3 + x) * 4, 50, 18, { wash: c, washA: 1, w: 2, col: L }); ell(x, 1300 + Math.sin(t * 3 + x) * 4, 18, 20, { wash: '#d8a47e', washA: 1, w: 1.6, col: L }); }
    if (t > EV.sh_beach - 0.1) { const q = clamp((t - EV.sh_beach + 0.1) / 1.4), x = lerp(200, 980, q), y = 1200 - Math.sin(q * Math.PI) * 360; ell(x, y, 34, 34, { wash: '#f2f2ea', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 3; k++) pencil(ellPts(x, y, 34, 34, t * 6 + k * 2.1, 0, 12).slice(0, 7), { w: 7, col: ['#c8302a', '#2a6ad8', '#f2c84a'][k], pass2: false }); }
  }
  function sand(t) {                                               // песок, шезлонги, зонты, полотенца, мешок «MALDIVES SAND»
    const L = AZ.ink; const g = rect(-700, 1390, 2500, 900, { wash: '#f2d8a0', washA: 1, line: false });
    ctx.save(); const r = rng(21033); for (let i = 0; i < 300; i++) { const d = r(), x = -200 + r() * 1500, y = 1395 + d * d * 600; ctx.fillStyle = r() < 0.5 ? 'rgba(170,120,60,0.4)' : 'rgba(255,250,220,0.6)'; ctx.fillRect(x, y, 2 + d * 3, 2 + d * 2); } ctx.restore();
    for (const [x, c] of [[620, '#e8582a'], [960, AZ.turq]]) { pencil([[x, 1470], [x - 10, 1190]], { w: 5, col: '#f2f2ea', pass2: false }); blob([[x - 170, 1240], [x - 90, 1170], [x - 10, 1150], [x + 70, 1170], [x + 150, 1240]], { wash: c, washA: 1, w: 2.4, col: L }); for (let k = -2; k <= 2; k++) pencil([[x - 10, 1150], [x + k * 75, 1240]], { w: 1.6, col: L, a: 0.4, pass2: false });
      push(x + 40, 1480, 0.8); poly([[-120, 0], [-100, -40], [60, -40], [100, -110], [120, -100], [90, -30], [120, 0]], { wash: '#f2f2ea', washA: 1, w: 2, col: L }); pop(); }
    human(1000, 1450, 0.5, t, { body: '#3a8a5a', legs: '#2a2a30', hat: 'cap', hatCol: '#e8582a', seed: 86, prop: 'phone', armR: 'up', flip: -1 });
    human(700, 1442, 0.44, t, { body: '#e85a8a', legs: '#f2f2ea', hat: 'scarf', hatCol: '#f2ead8', seed: 87, long: 1, armL: 'wave' });
    human(800, 1446, 0.32, t, { body: '#f2c84a', legs: '#2a6ad8', seed: 88, armR: 'up' });
    for (const [x, c] of [[480, '#c8302a'], [860, '#2a6ad8']]) { rect(x - 60, 1500, 120, 40, { wash: c, washA: 1, w: 1.6, col: L, rot: 0.1 }); for (let k = 0; k < 4; k++) pencil([[x - 60, 1506 + k * 10], [x + 60, 1506 + k * 10]], { w: 3, col: '#f2f2ea', a: 0.6, pass2: false }); }
    for (const [x, y, c] of [[160, 1600, '#e8582a'], [700, 1640, '#2a6ad8'], [380, 1700, '#f2c84a']]) { ell(x, y, 26, 10, { wash: c, washA: 1, w: 1.6, col: L }); ell(x + 50, y + 4, 26, 10, { wash: c, washA: 1, w: 1.6, col: L }); }   // шлёпанцы
    for (let k = 0; k < 5; k++) ell(80 + k * 230, 1660 + (k % 2) * 60, 18, 12, { wash: '#f2ead8', washA: 1, w: 1.4, col: L, a: 0.6 });   // ракушки
    push(900, 1620, 0.7); ell(0, 0, 60, 40, { wash: '#f2c84a', washA: 1, w: 2, col: L }); ell(0, -50, 30, 30, { wash: '#f2c84a', washA: 1, w: 2, col: L }); pop();   // песочный замок
    push(540, 1560, 0.5); ell(0, 0, 40, 14, { wash: '#2a6ad8', washA: 1, w: 2, col: L }); pencil([[-30, -4], [-10, -60], [10, -56]], { w: 5, col: '#c8302a', pass2: false }); pop();   // ведёрко и совок
    if (t > EV.sh_sand - 0.4) { const q = sm((t - EV.sh_sand + 0.4) / 0.5); push(1080, 1460, 1, -0.5 * q); blob([[-80, 0], [-90, -110], [-60, -160], [60, -160], [90, -110], [80, 0]], { wash: '#d8c8a0', washA: 1, w: 2.4, col: L }); txt('MALDIVES', 0, -90, 26, { col: '#2a6ad8', font: 'Osw' }); txt('SAND', 0, -56, 26, { col: '#2a6ad8', font: 'Osw' }); pop();
      human(1180, 1470, 0.56, t, { body: '#e8a83a', legs: '#2a2a30', hat: 'cap', hatCol: '#2a6ad8', seed: 89, armL: 'up', armR: 'up', flip: -1 });
      if (q > 0.5) { for (let i = 0; i < 60; i++) { const r = rng(hsh(FRAME, i + 300)), ph = r(); ell(1000 - ph * 160 + r() * 30, 1360 + ph * 160, 3, 3, { wash: '#fff6d8', washA: 1, line: false }); } glow(940, 1480, 140, 'rgba(255,250,220,1)', 0.5 * q); } }
  }
  function front(t) {
    const L = '#0e0a06';
    for (let k = 0; k < 5; k++) { const a = -0.4 + k * 0.32 + Math.sin(t * 1.4 + k) * 0.04; pencil(spline([[-120, 380], [-120 + Math.cos(a) * 160, 380 + Math.sin(a) * 120 - 40], [-120 + Math.cos(a) * 320, 380 + Math.sin(a) * 260]], false, 8), { w: 26, col: k % 2 ? '#1e5a2a' : '#2a6a30', pass2: false }); }
    push(1180, 1760, 1.2); poly([[-160, 0], [-140, -60], [100, -60], [150, -180], [180, -170], [140, -50], [170, 0]], { wash: '#f2f2ea', washA: 1, w: 3, col: L }); pop();
  }

  WORLD.shatyr = (t, u, cat) => {
    lay(40, () => outside(t));
    lay(14, () => shell(t));
    lay(6, () => decor(t));
    lay(3, () => pool(t));
    lay(1, () => { sand(t); cat(); puffK(300, 1250, 1, t, EV.sh_in - 0.05, 0.5, 21034); });
    lay(0.62, () => front(t));
    rays(560, -200, Math.PI / 2, 0.9, 1800, 'rgba(255,220,160,0.6)', 0.12, 7, t);
    motes(26, [-200, 600, 1300, 1500], '#fff2c8', t, 21035, { sp: 10, vx: 8, sz: 2.4, a: 0.45, wob: 14 });
    haze('#ffc890', 0.07);
  };
  DIR.shatyr = {
    outfit: 'pufferA', light: { side: 1, rim: '#ffd8a0' }, grade: ['#e0a060', 0.1],
    act: () => [[S0.shatyr, 'cold'], [EV.sh_m40, 'cold'], [EV.sh_in, 'awe'], [EV.sh_beach, 'grin'], [EV.sh_sand, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.04, outfit: t > EV.sh_in ? 'beachA' : 'pufferA', chatter: t < EV.sh_in, frost: t < EV.sh_in ? 0.7 : 0,
      look: t < EV.sh_in ? [0.6, -0.6] : t < EV.sh_sand ? [0.6, -0.2] : [0.8, 0], hand: t > EV.sh_beach && t < EV.sh_sand ? [150, -300] : undefined, tailUp: t > EV.sh_in }),
    cam: () => [[S0.shatyr, 600, 760, 0.12], [EV.sh_m40, 640, 760, 0.18], [EV.sh_in, 560, 960, 0.06, 'x'], [EV.sh_sand, 640, 1040, 0.14], [S1.shatyr, 660, 1060, 0.2]]
  };
  TRANS_IN.shatyr = { a: 0.25, b: 0.35, fx(k, t, A, B) {           // буран: снег заметает кадр добела, из белого проступает тёплый пляж
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const w = Math.sin(Math.PI * k); motes(220, [-300, -100, 1400, 2000], '#ffffff', t, 21036, { sp: 400, vx: 1400, sz: 5, a: w, wob: 40, stretch: 4 }); whiteOut(w * 0.92, '240,246,252'); });
  } };
})();
