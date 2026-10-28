/* 019 — сцена `rails`: 1950, май–октябрь, тайга у Енисея. Лагерь «Гранитный»: вышки, колючка, бараки, ворота с лозунгом.
   Насыпь уходит к горе на горизонте; колонны заключённых несут шпалы и рельс, тачки с щебнем, конвой с овчаркой, паровоз с платформой рельсов.
   Тёплый осенний закат (лиственницы золотые). На «пять месяцев» листается календарь МАЙ → ОКТЯБРЬ, на «пятьдесят один» — счётчик км,
   на «рельсов» рельс падает на шпалы со звоном. Переход В сцену — росчерк пера превращается в рельсы, летящие на камеру. */
(() => {
  EV.rl_lager = wtk('s2', 'Лагерь');
  EV.rl_5 = wtk('s2', 'пять');
  EV.rl_51 = wtk('s2', 'пятьдесят');
  EV.rl_drop = wtk('s2', 'рельсов.');
  SHAKES.push([EV.rl_drop + 0.15, 0.3, 8]);
  KEYW.push('«Гранитный»:', 'пятьдесят', 'один');
  const L = '#1a0e06', VX = 640, VY = 1020;                        // точка схода насыпи — у горы

  function sky(t) {
    vgrad(-900, 1200, ['#2a2a5a', '#7a4a6a', '#e0805a', '#f6c070'], 1);
    glow(820, 940, 520, 'rgba(255,190,110,1)', 0.7); ell(820, 960, 70, 70, { wash: '#ffe0a0', washA: 1, w: 0, line: false });
    for (let k = 0; k < 6; k++) { const x = ((k * 330 + t * 10) % 2000) - 500, y = 180 + k * 90; blob([[x, y], [x + 160, y - 50], [x + 380, y - 30], [x + 520, y + 16], [x + 260, y + 40]], { wash: k % 2 ? '#c06a6a' : '#e89a7a', washA: 0.6, w: 0, line: false }); }
    for (let k = 0; k < 9; k++) { const x = ((k * 140 + t * 50) % 1600) - 200, y = 520 + Math.sin(k * 2.1) * 80 + Math.sin(t * 3 + k) * 6; pencil([[x - 10, y - 4], [x, y], [x + 10, y - 4]], { w: 2.4, col: '#2a1a24', pass2: false }); }
  }
  function far(t) {
    mountain(t, { x: 700, top: 820, base: 1060, w: 900, col: '#6a5a7a', colD: '#3a2a4a', colL: '#a88aa0', tree: '#4a3a5a', trees: 50, seed: 4 });
    taigaRidge(1060, 70, '#5a4a5a', 11, 1, 18);
    haze('#f0a070', 0.12);
  }
  function camp(t) {                                                // лагерь справа: забор, вышки, бараки, ворота; слева — золотые лиственницы
    for (let k = 0; k < 4; k++) barrack(720 + k * 230, 1150, 200, 110, t + k, { wood: '#6a4a30', roof: '#4a3424', lit: k % 2 });
    wire(700, 1700, 1170, 120, t, { step: 110, post: 7, wood: '#5a4028' });
    watchtower(780, 1180, 0.62, t, { guard: 1, beam: 0.3 }); watchtower(1300, 1180, 0.62, t, { guard: 1, beam: -0.6 });
    push(1040, 1170, 1); pencil([[-90, 0], [-90, -190]], { w: 10, col: '#5a4028', pass2: false }); pencil([[90, 0], [90, -190]], { w: 10, col: '#5a4028', pass2: false });
    rect(-120, -240, 240, 56, { wash: '#8a1e18', washA: 1, w: 2, col: L }); txt('ИТЛ «ГРАНИТНЫЙ»', 0, -210, 26, { col: '#f6ecd6', font: 'Osw' }); pop();
    for (let k = 0; k < 9; k++) { const x = -300 + k * 80; spruce(x, 1150, 120 + (k % 3) * 30, t, k + 40, { col: k % 2 ? '#c8962a' : '#2a4a30', colD: k % 2 ? '#7a5a10' : '#0e2210', colL: '#f0c050' }); }
    for (let k = 0; k < 5; k++) { const x = -200 + k * 120; ell(x, 1160, 26, 10, { wash: '#7a5a3a', washA: 1, w: 1.4, col: L }); }   // пни вырубки
  }
  function embank(t) {                                              // насыпь: щебень, шпалы, рельсы в перспективе к горе
    const cl = rect(-1200, VY, 3600, 1500, { wash: '#7a6440', washA: 1, w: 0, line: false }); shadeG(cl.path, 0, VY, 0, 2000, '#3a2a14', 0.4); hatch(cl.path, cl.bb, { gap: 9, a: 0.18, col: '#3a2a14', ang: 0.15, w: 1 });
    { const r2 = rng(19203); for (let k = 0; k < 30; k++) { const f = r2(), y = lerp(VY + 20, 2100, f * f), side = r2() < 0.5 ? -1 : 1, x = VX + side * (lerp(60, 700, f) + r2() * 600); ell(x, y, 10 + f * 40, 4 + f * 14, { wash: '#6a4a2a', washA: 1, w: 1.4, col: L }); ell(x, y - 2, 8 + f * 32, 3 + f * 10, { wash: '#c8a070', washA: 0.8, line: false }); if (k % 3 === 0) pencil([[x - 20 - f * 90, y + 6], [x + 30 + f * 120, y - 8]], { w: 4 + f * 14, col: '#5a3a1e', pass2: false }); } for (let k = 0; k < 8; k++) { const y = lerp(VY + 60, 1900, k / 8), x = VX + (k % 2 ? 1 : -1) * lerp(150, 620, k / 8); ell(x, y, 30 + k * 8, 8 + k * 2, { wash: '#8ab0c8', washA: 0.6, w: 1, col: '#3a4a5a', a: 0.4 }); } }   // вырубка: пни, брёвна, лужи
    const nb = shape([[VX - 40, VY], [VX + 40, VY], [VX + 560, 2400], [VX - 560, 2400]], { wash: '#8a7a64', washA: 1, w: 2, col: L, a: 0.5 }); hatch(nb.path, nb.bb, { gap: 6, a: 0.25, col: '#4a3a28', ang: 0.4, w: 1.2 });
    const r = rng(19201); for (let k = 0; k < 260; k++) { const f = Math.pow(r(), 0.7), x = lerp(VX, lerp(-300, 1500, r()), f), y = lerp(VY, 2400, f); ctx.fillStyle = r() < 0.5 ? '#5a4a3a' : '#b8a890'; ctx.fillRect(x, y, 3 + f * 6, 2 + f * 4); }
    const built = clamp((t - S0.rails + 0.3) / 4.5);                  // рельсы растут от камеры к горе по ходу сцены
    for (let k = 0; k < 26; k++) { const f = Math.pow(k / 26, 1.8), y = lerp(2300, VY + 6, f), hw = lerp(480, 30, f); pencil([[VX - hw, y], [VX + hw, y]], { w: lerp(16, 2, f), col: '#5a3a1e', pass2: false }); }
    for (const sd of [-1, 1]) { const end = lerp(2300, VY + 6, 0.35 + 0.65 * built); pencil([[VX + sd * 300, 2300], [VX + sd * lerp(300, 18, (2300 - end) / (2300 - VY)), end]], { w: 9, col: '#6a6a70', pass2: false }); pencil([[VX + sd * 300 - 4, 2296], [VX + sd * lerp(300, 18, (2300 - end) / (2300 - VY)) - 2, end - 2]], { w: 3, col: '#d8d8d8', a: 0.7, pass2: false }); }
    for (let k = 1; k <= 6; k++) { const f = k / 7, y = lerp(VY, 1400, f); pencil([[VX + 120 + f * 300, y], [VX + 124 + f * 300, y - 40 - f * 30]], { w: 3 + f * 3, col: '#efe4cc', pass2: false }); }   // столбики-вешки
    push(1020, 1360, 0.9); rect(-30, -150, 60, 150, { wash: '#efe4cc', washA: 1, w: 2, col: L }); rect(-30, -150, 60, 30, { wash: '#1a1a1a', washA: 1, line: false }); txt(String(Math.round(lerp(0, 51, sm(clamp((t - EV.rl_51) / 0.9))))), 0, -70, 44, { col: '#1a1a1a', font: 'Osw' }); pop();   // километровый столб
  }
  function gangs(t) {                                               // заключённые: несут рельс, шпалы, тачки; конвой с собакой
    const walk = (i) => Math.sin(t * 6 + i) * 4;
    for (let i = 0; i < 5; i++) worker(430 + i * 70 + (t - S0.rails) * 10, 1300 + walk(i) * 0.3, 0.42, t + i, { hat: 'cap', hatCol: '#3a3a3a', body: i % 2 ? '#4a4e56' : '#3a3e46', armR: 'up', armL: 'up', seed: 60 + i, face: 'calm' });
    push(0, 0, 1); pencil([[400 + (t - S0.rails) * 10, 1176], [750 + (t - S0.rails) * 10, 1176]], { w: 8, col: '#5a5a62', pass2: false }); pop();
    for (let i = 0; i < 4; i++) worker(760 + i * 110, 1250 + (i % 2) * 20, 0.5, t + i * 2, { hat: 'cap', hatCol: '#2a2a2a', tool: i % 2 ? 'shovel' : 'sleeper', body: '#3c4148', seed: 70 + i, flip: i % 2 ? -1 : 1, armR: 'hold', armL: 'up' });
    wheelbarrow(1180, 1330, 0.6, { rock: '#8a8478', flip: -1 }); worker(1270, 1330, 0.5, t, { hat: 'cap', hatCol: '#2a2a2a', armR: 'hold', armL: 'hold', seed: 75 });
    worker(1180, 1420, 0.72, t, { hat: 'ushanka', body: '#4a5a3a', legs: '#2a2a1a', armR: 'hips', face: 'angry', seed: 80, flip: -1 }); dog(1060, 1430, 0.7, t, { bark: t > EV.rl_lager && t < EV.rl_5 ? 1 : 0.2, flip: -1 });
    worker(120, 1330, 0.56, t, { hat: 'cap', hatCol: '#2a2a2a', tool: 'pick', armR: 'swing', seed: 81 }); worker(30, 1380, 0.6, t + 1, { hat: 'cap', hatCol: '#3a3a3a', tool: 'shovel', armR: 'hold', seed: 82, flip: -1 });
    loco(560, 1060, 0.26, t, { v: 0.4, cabLit: 1, headA: 0.5, smokeCol: '#e8c8b0' });
  }
  function near(t) {                                               // ближний план справа: забивают костыли, рядом конвой
    for (let i = 0; i < 2; i++) { const hit = Math.max(0, Math.sin(t * 5 + i * 2)); worker(880 + i * 170, 1600 + i * 30, 0.86, t + i, { hat: 'cap', hatCol: '#2a2a2a', body: i ? '#3c4148' : '#4a4e56', tool: 'pick', armR: hit > 0.6 ? 'up' : 'swing', face: 'angry', seed: 90 + i, flip: -1 }); }
    for (let k = 0; k < 6; k++) { push(980 + k * 22, 1640, 1, 0.3); pencil([[0, 0], [0, -40]], { w: 6, col: '#3a3a3a', pass2: false }); pop(); }
  }
  function drop(t) {                                               // рельс падает на шпалы на «рельсов»
    const k = clamp((t - EV.rl_drop) / 0.25), y = lerp(1200, 1470, k * k);
    if (t > EV.rl_drop - 0.4) { push(0, 0, 1); pencil([[600, y], [1250, y + 30]], { w: 14, col: '#5a5a62', pass2: false }); pencil([[600, y - 5], [1250, y + 25]], { w: 4, col: '#e0e0e0', a: 0.8, pass2: false }); pop();
      if (k >= 1) { const f = clamp((t - EV.rl_drop - 0.25) / 0.6); for (let q = 0; q < 10; q++) { const a = -Math.PI * (0.1 + q * 0.08); ell(900 + Math.cos(a) * 180 * f, 1480 + Math.sin(a) * 120 * f, 14 * (1 - f), 10 * (1 - f), { wash: '#b8a890', washA: 0.7, line: false }); } } }
  }
  function front(t) {
    for (let k = 0; k < 7; k++) { push(-60, 1800 - k * 34, 1, 0.04 * (k % 2 ? 1 : -1)); const b = rect(-250, -34, 500, 34, { wash: k % 2 ? '#6a4a2a' : '#5a3a1e', washA: 1, w: 2, col: L }); hatch(b.path, b.bb, { gap: 7, a: 0.35, col: '#2a1408', ang: 0, w: 1 }); pop(); }   // штабель шпал
    crate(1180, 1900, 220, 150, { col: '#7a5a34', txt: 'КОСТЫЛИ' }); barrel(1000, 1880, 1.1, '#4a3a2a');
    for (let k = 0; k < 8; k++) pencil([[1150 + k * 10, 1720], [1130 + k * 12, 1560 - k * 6]], { w: 5, col: '#c8962a', a: 0.8, pass2: false });   // трава у края
  }
  function hud(t) {                                                 // календарь месяцев и счётчик км
    if (t < EV.rl_5 - 0.1) return; const k = popK(t, EV.rl_5 - 0.1, 0.35), m = ['МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГ.', 'СЕНТ.', 'ОКТ.'], i = Math.min(5, Math.floor(clamp((t - EV.rl_5) / 1.2) * 6));
    push(760, 760, 0.8 + 0.2 * k, 0.05); rect(-90, -80, 180, 170, { wash: '#f2ead2', washA: 1, w: 3, col: L }); rect(-90, -80, 180, 44, { wash: '#b8322a', washA: 1, w: 2, col: L }); txt('1950', 0, -58, 30, { col: '#f6ecd6', font: 'Osw' }); txt(m[i], 0, 22, 54, { col: '#1a1a1a', font: 'Osw' }); pop();
    if (t > EV.rl_51 - 0.1) { const q = popK(t, EV.rl_51 - 0.1, 0.35), n = Math.round(lerp(0, 51, sm(clamp((t - EV.rl_51) / 0.9)))); push(560, 960, 0.8 + 0.2 * q, -0.04); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-170, -60, 340, 120); ctx.restore(); txt(n + ' КМ', 0, 4, 84, { col: K.amber, font: 'Osw' }); pop(); }
  }

  WORLD.rails = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(9, () => embank(t));
    lay(7, () => camp(t));
    lay(3.2, () => gangs(t));
    lay(1, () => { drop(t); near(t); cat(); });
    lay(0.62, () => front(t));
    rays(820, 940, -2.6, 0.9, 1600, 'rgba(255,200,130,0.6)', 0.2, 7, t);
    motes(40, [0, 600, 1080, 1700], '#f6d8a0', t, 19202, { sp: -10, vx: 14, sz: 2.6, a: 0.5, add: 1 });
  };
  DIR.rails = {
    outfit: 'vatnik', light: { side: 1, rim: '#ffc880' }, grade: ['#8a4a2a', 0.12],
    act: () => [[S0.rails, 'neutral'], [EV.rl_lager, 'annoyed'], [EV.rl_5, 'talk'], [EV.rl_51, 'scared'], [EV.rl_drop + 0.2, 'shock'], [EV.rl_drop + 0.7, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.04, noHat: false, look: t < EV.rl_51 ? [0.5, -0.2] : [0.6, 0.2], prop: 'mallet', hand: [92, -230], propAng: t > EV.rl_drop - 0.3 && t < EV.rl_drop + 0.3 ? -1.2 : 0.2, tilt: t > EV.rl_drop && t < EV.rl_drop + 0.3 ? 0.05 : 0 }),
    cam: () => [[S0.rails, 540, 1080, 0.24], [EV.rl_5, 600, 1020, 0.14], [EV.rl_51, 640, 980, 0.12], [EV.rl_drop, 640, 1100, 0.2, 'x'], [S1.rails, 600, 1080, 0.16]],
    hud
  };
  TRANS_IN.rails = { a: 0.35, b: 0.4, runA: 0, holdA: 1, fx(k, t, A, B) {   // росчерк пера → два рельса, летящие на камеру
    const q = sm(k);
    if (k < 0.45) { drawBuf(A); scr(() => { const f = sm(k / 0.45), P = []; for (let i = 0; i <= 30 * f; i++) { const x = -40 + i / 30 * 1160; P.push([x, 980 + Math.sin(i * 0.5) * 30 - i * 4]); } if (P.length > 1) pencil(P, { w: 24, col: '#12100e', pass2: false }); }); }
    else { const f = sm((k - 0.45) / 0.55); drawBuf(B, 1.25 - 0.25 * f); scr(() => { for (const sd of [-1, 1]) pencil([[540 + sd * 30 * (1 - f), 960], [540 + sd * (900 + 1400 * f), 2200]], { w: 26 + 30 * f, col: '#5a5a62', a: 1 - f, pass2: false }); whiteOut((1 - f) * 0.3, '255,230,190'); }); }
  } };
})();
