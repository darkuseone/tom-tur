/* 019 — сцена `heat`: 1964, зима, квартира в Соцгороде. Ковёр на стене, сервант, радиоточка, телевизор с линзой, календарь 1964,
   бабушка с вязанием, мальчик с игрушечной ракетой, кот на подоконнике. За морозным окном — город и гора, от горы через город тянется
   теплотрасса. На «батареи» чугунная батарея раскаляется оранжевым, Том греет лапы; на «города» окна домов за стеклом загораются
   по очереди и теплотрасса светится; на «Первым в мире» — медаль «1-Й В МИРЕ». Переход В сцену — голубая вспышка → полёт по трубе → из батареи. */
(() => {
  EV.ht_bat = wtk('s7', 'батареи');
  EV.ht_city = wtk('s7', 'города.');
  EV.ht_first = wtk('s7', 'Первым');
  SHAKES.push([EV.ht_first, 0.2, 4]);
  KEYW.push('батареи', 'Первым', 'мире!');
  const L = '#140c08';
  const hot = t => sm((t - EV.ht_bat + 0.1) / 0.6);

  function outside(t) {                                             // вид из окна: ночной город, гора с паром, теплотрасса
    vgrad(-200, 1000, ['#0a1030', '#1e2a5a', '#3a4a7a'], 1);
    mountain(t, { x: 700, top: 300, base: 640, w: 1100, col: '#2a3458', colD: '#10142a', colL: '#5a6890', tree: '#141a32', trees: 40, snow: 0.8, snowCol: '#b8c4e4', seed: 10 });
    for (let k = 0; k < 6; k++) { const ph = (t * 0.2 + k / 6) % 1; ell(820 + ph * 120, 420 - ph * 300, 40 + ph * 90, 30 + ph * 60, { wash: '#d8dcee', washA: 0.4 * (1 - ph), line: false }); }   // пар над горой
    const lit = sm((t - EV.ht_city) / 1.2), r = rng(19701);
    for (let k = 0; k < 9; k++) { const x = -40 + k * 130, h = 140 + r() * 120, y = 820; rect(x, y - h, 110, h, { wash: '#4a3a4a', washA: 1, w: 1.6, col: L }); pencil([[x - 4, y - h - 4], [x + 114, y - h - 4]], { w: 8, col: '#e8eef8', a: 0.9, pass2: false });
      for (let j = 0; j < Math.floor(h / 40); j++) for (let i = 0; i < 3; i++) { const on = r() < 0.25 || lit > (k * 3 + j + i) / 40; rect(x + 10 + i * 34, y - h + 16 + j * 40, 20, 22, { wash: on ? '#ffcf7a' : '#2a2a3a', washA: 1, line: false }); } }
    const P = [[760, 640], [700, 700], [520, 760], [300, 800], [-40, 840]]; pencil(P, { w: 14, col: '#6a6a6a', pass2: false }); if (t > EV.ht_city) { pencil(P, { w: 10, col: '#ff8a3a', a: lit, pass2: false }); for (const [x, y] of P) glow(x, y, 70, 'rgba(255,140,60,1)', 0.5 * lit); }
    snowGround(830, t, { col: '#c8d0e8', colD: '#7a86a8', seed: 9 }); motes(30, [-100, -200, 1200, 900], '#eef2ff', t, 19702, { sp: 50, vx: -20, sz: 2.4, a: 0.8 });
  }
  function room(t) {
    const w = rect(-500, -400, 2100, 2400, { wash: '#c8b08a', washA: 1, w: 0, line: false }); for (let x = -500; x < 1600; x += 60) { pencil([[x, -400], [x, 2000]], { w: 2, col: '#a88a62', a: 0.5, pass2: false }); for (let y = -380; y < 2000; y += 90) ell(x + 30, y + ((x / 60) % 2) * 45, 6, 8, { wash: '#8a6a4a', washA: 0.5, line: false }); }   // обои в цветочек
    ctx.save(); ctx.beginPath(); ctx.rect(440, 300, 560, 760); ctx.clip(); push(440, 300, 0.56); outside(t); pop(); ctx.restore();          // окно
    const fr = 1 - 0.6 * hot(t); for (let k = 0; k < 9; k++) { const r = rng(19710 + k), x = 440 + r() * 560, y = 300 + r() * 760; pencil([[x, y], [x + 40 * (r() - 0.5), y + 50], [x + 20, y + 90]], { w: 2, col: '#eef6ff', a: 0.5 * fr, pass2: false }); }   // морозные узоры тают
    rect(440, 300, 560, 760, { wash: 'rgba(0,0,0,0)', washA: 0, w: 22, col: '#efe8da' }); pencil([[720, 300], [720, 1060]], { w: 16, col: '#efe8da', pass2: false }); pencil([[440, 560], [1000, 560]], { w: 14, col: '#efe8da', pass2: false });
    rect(400, 1060, 640, 40, { wash: '#efe8da', washA: 1, w: 2, col: L });                                                       // подоконник
    for (const sd of [-1, 1]) { const x0 = sd < 0 ? 440 : 1000; const c = shape([[x0, 250], [x0 + sd * 130, 250], [x0 + sd * 160, 1120], [x0 - sd * 20, 1120]].concat([[x0, 250]]), { wash: '#e8d8b0', washA: 0.9, w: 1.6, col: L }); for (let q = 0; q < 4; q++) pencil([[x0 + sd * (20 + q * 30), 260], [x0 + sd * (24 + q * 36), 1110]], { w: 2, col: '#b8a070', a: 0.6, pass2: false }); }   // тюль
    // ковёр на стене (слева)
    push(-140, 700, 1); const cp = rect(-300, -340, 600, 680, { wash: '#8a1e22', washA: 1, w: 3, col: L }); rect(-260, -300, 520, 600, { wash: 'rgba(0,0,0,0)', washA: 0, w: 14, col: '#d8a83a' });
    for (let j = -2; j <= 2; j++) for (let i = -1; i <= 1; i++) { poly([[i * 150, j * 110 - 50], [i * 150 + 50, j * 110], [i * 150, j * 110 + 50], [i * 150 - 50, j * 110]], { wash: (i + j) % 2 ? '#1a3a5a' : '#d8a83a', washA: 1, w: 1.6, col: L }); ell(i * 150, j * 110, 12, 12, { wash: '#f2e0b0', washA: 1, line: false }); } pop();
    // радиоточка и календарь
    push(1180, 640, 1); rect(-70, -60, 140, 120, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(0, -4, 46, 40, { wash: '#2a1a10', washA: 1, w: 1.6, col: L }); for (let q = -3; q <= 3; q++) pencil([[q * 12, -40], [q * 12, 30]], { w: 2, col: '#8a6a3a', pass2: false }); pencil([[0, -60], [0, -240]], { w: 2, col: '#1a1a1a', pass2: false }); pop();
    push(1180, 920, 1, 0.04); rect(-80, -100, 160, 200, { wash: '#f2ead2', washA: 1, w: 2, col: L }); rect(-80, -100, 160, 50, { wash: '#b8322a', washA: 1, w: 1.6, col: L }); txt('1964', 0, -74, 30, { col: '#f6ecd6', font: 'Osw' }); txt('ЯНВАРЬ', 0, -26, 24, { col: '#1a1a1a', font: 'Osw' }); for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) txt(String(j * 5 + i + 1), -56 + i * 28, 6 + j * 24, 16, { col: '#3a3a3a' }); pop();
  }
  function furniture(t) {
    // сервант справа
    push(1200, 1460, 1); const sb = rect(-200, -560, 400, 560, { wash: '#6a3a1e', washA: 1, w: 2.4, col: L }); hatch(sb.path, sb.bb, { gap: 7, a: 0.25, col: '#2a1408', ang: 1.5, w: 1 });
    rect(-170, -530, 340, 240, { wash: '#a8c0c8', washA: 0.6, w: 2, col: L }); for (let q = 0; q < 5; q++) { ell(-130 + q * 62, -340, 24, 30, { wash: '#e8f0f4', washA: 0.9, w: 1.4, col: '#6a7a80' }); glow(-130 + q * 62, -350, 30, 'rgba(255,255,255,1)', 0.3); } for (let q = 0; q < 4; q++) ell(-110 + q * 70, -450, 26, 12, { wash: '#f2f2f2', washA: 1, w: 1.4, col: '#6a6a6a' }); pop();
    // телевизор с линзой на тумбе
    push(160, 1180, 0.9); rect(-130, 0, 260, 140, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); const tv = rect(-110, -180, 220, 180, { wash: '#7a5a3a', washA: 1, w: 2.4, col: L }); rect(-80, -160, 120, 100, { wash: '#8ab0a0', washA: 1, w: 2, col: L }); glow(-20, -110, 100, 'rgba(180,230,210,1)', 0.4); ell(-20, -110, 90, 80, { wash: 'rgba(160,210,230,0.25)', washA: 1, w: 2, col: '#3a5a6a' }); for (let q = 0; q < 2; q++) ell(70, -140 + q * 50, 12, 12, { wash: '#c8a040', washA: 1, w: 1.4 }); pop();
    // стол со скатертью, чай, бабушка, мальчик с ракетой
    push(760, 1420, 1); const tb = shape([[-260, -200], [260, -200], [300, -120], [-300, -120]], { wash: '#f2ead2', washA: 1, w: 2, col: L }); for (let q = -5; q <= 5; q++) pencil([[q * 50, -200], [q * 56, -120]], { w: 2, col: '#c84a3a', a: 0.4, pass2: false }); rect(-300, -120, 600, 40, { wash: '#e8dcc0', washA: 1, w: 1.6, col: L });
    for (let q = 0; q < 2; q++) { rect(-140 + q * 90, -250, 36, 50, { wash: 'rgba(200,120,40,0.6)', washA: 1, w: 1.6, col: L }); rect(-144 + q * 90, -244, 44, 44, { wash: 'rgba(0,0,0,0)', washA: 0, w: 2.4, col: '#a8a8a8' }); for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3 + q * 0.3) % 1; ell(-122 + q * 90 + Math.sin(t * 3 + k) * 6, -262 - ph * 80, 6 + ph * 10, 5 + ph * 8, { wash: '#f2f2f2', washA: 0.4 * (1 - ph), line: false }); } }
    ell(120, -230, 60, 22, { wash: '#e8a040', washA: 1, w: 1.6, col: L }); pop();   // пирог
    human(860, 1420, 0.62, t, { body: '#5a4a6a', legs: '#3a3a3a', hat: 'scarf', hatCol: '#e8d8c0', armR: 'hold', armL: 'hold', face: 'smile', seed: 210, flip: -1 });
    pencil([[810, 1240], [840, 1270]], { w: 3, col: '#c8a040', pass2: false }); ell(828, 1268, 22, 14, { wash: '#c84a3a', washA: 1, w: 1.4, col: L });   // вязание
    human(690, 1440, 0.48, t, { body: '#2a5a8a', legs: '#2a2a3a', hair: '#6a4a2a', armR: 'up', face: 'smile', seed: 211 });
    push(730, 1150 + Math.sin(t * 3) * 10, 0.7, -0.5); blob([[0, -60], [14, -30], [14, 40], [-14, 40], [-14, -30]], { wash: '#e8e8e8', washA: 1, w: 2, col: L }); poly([[-14, 20], [-30, 50], [-14, 40]], { wash: '#c8302a', washA: 1, w: 1.4 }); poly([[14, 20], [30, 50], [14, 40]], { wash: '#c8302a', washA: 1, w: 1.4 }); txt('СССР', 0, 6, 12, { col: '#c8302a', font: 'Osw', rot: 1.57 }); pop();   // ракета (Гагарин, 1961)
  }
  function battery(t) {                                             // чугунная батарея у ног Тома
    const h = hot(t), col = lerpC('#8a8a8a', '#ff7a3a', h * 0.8);
    push(560, 1560, 1); for (let k = 0; k < 9; k++) { const x = -260 + k * 62; const s = blob([[x, 0], [x - 4, -200], [x + 6, -230], [x + 46, -230], [x + 56, -200], [x + 52, 0]], { wash: col, washA: 1, w: 2.4, col: L }); shadeG(s.path, x, 0, x + 52, 0, '#2a1a10', 0.35); pencil([[x + 14, -210], [x + 14, -20]], { w: 3, col: '#ffffff', a: 0.3, pass2: false }); }
    pencil([[-280, -24], [300, -24]], { w: 14, col: col, pass2: false }); pencil([[300, -24], [360, -24], [360, -900]], { w: 16, col: '#8a8a8a', pass2: false }); glow(0, -110, 400, 'rgba(255,140,60,1)', 0.45 * h);
    for (let k = 0; k < 7; k++) { const ph = (t * 0.7 + k / 7) % 1; pencil([[-220 + k * 70 + Math.sin(t * 4 + k) * 10, -240 - ph * 200], [-220 + k * 70 + Math.sin(t * 4 + k + 1) * 10, -280 - ph * 200]], { w: 3, col: '#ffd8b0', a: 0.4 * h * (1 - ph), pass2: false }); }   // марево тепла
    pop();
  }
  function cat2(t) { push(560, 1060, 0.55); blob([[-60, 0], [-70, -90], [-40, -140], [40, -140], [70, -90], [60, 0]], { wash: '#6a6a6a', washA: 1, w: 2, col: L }); ell(0, -170, 50, 44, { wash: '#7a7a7a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) poly([[sd * 20, -204], [sd * 40, -236], [sd * 46, -196]], { wash: '#7a7a7a', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) pencil([[sd * 20, -176], [sd * 10, -170]], { w: 3, col: L, pass2: false }); pencil(spline([[60, -10], [110, -30], [120, -80]], false, 6), { w: 10, col: '#6a6a6a', pass2: false }); pop(); }
  function hud(t) { if (t < EV.ht_first - 0.05) return; const k = popK(t, EV.ht_first - 0.05, 0.4); push(780, 820, 0.7 + 0.3 * k, 0.06);
    for (const sd of [-1, 1]) poly([[sd * 20, 40], [sd * 70, 200], [sd * 40, 180], [sd * 20, 220]], { wash: '#b8322a', washA: 1, w: 2, col: L }); ell(0, 0, 110, 110, { wash: '#d8a83a', washA: 1, w: 4, col: '#5a3a08' }); ell(0, 0, 86, 86, { wash: '#f2c85a', washA: 1, w: 2, col: '#8a6a1a' }); glow(0, 0, 180, 'rgba(255,214,120,1)', 0.5);
    txt('1-Й', 0, -26, 48, { col: '#5a2a08', font: 'Osw' }); txt('В МИРЕ', 0, 28, 30, { col: '#5a2a08', font: 'Osw' }); pop(); }

  WORLD.heat = (t, u, cat) => {
    lay(12, () => room(t));
    lay(7, () => cat2(t));
    lay(4, () => furniture(t));
    lay(1.6, () => { const f = rect(-600, 1460, 2400, 900, { wash: '#7a4a2a', washA: 1, w: 0, line: false }); for (let x = -600; x < 1800; x += 70) pencil([[x, 1460], [x - 120, 2300]], { w: 2, col: '#4a2a14', a: 0.5, pass2: false }); const rg = shape([[-100, 1520], [1100, 1520], [1300, 2300], [-300, 2300]], { wash: '#2a4a6a', washA: 1, w: 2, col: L }); hatch(rg.path, rg.bb, { gap: 10, a: 0.2, col: '#0a1a2a', ang: 0.5, w: 1 }); pencil([[-60, 1560], [1110, 1560]], { w: 10, col: '#c8a040', a: 0.6, pass2: false }); });
    lay(1, () => { battery(t); cat(); });
    lay(0.6, () => { push(1260, 2000, 1); rect(-100, -300, 200, 300, { wash: '#4a2a14', washA: 1, w: 2.4, col: L }); ell(0, -320, 130, 30, { wash: '#6a3a1e', washA: 1, w: 2, col: L }); pop(); blob([[-200, 1900], [-160, 1700], [40, 1690], [60, 1900]], { wash: '#b8322a', washA: 1, w: 2, col: L }); });   // табурет, валенки
    glow(560, 1300, 600, 'rgba(255,170,90,1)', 0.15 + 0.2 * hot(t));
    motes(20, [0, 300, 1080, 1500], '#ffe8c0', t, 19703, { sp: -8, vx: 4, sz: 2, a: 0.35, tw: 1, add: 1 });
  };
  DIR.heat = {
    outfit: 'sviter', light: { side: 1, rim: '#ffb070' }, grade: ['#8a5a2a', 0.12],
    act: () => [[S0.heat, 'cold'], [EV.ht_bat, 'grin'], [EV.ht_city, 'awe'], [EV.ht_first, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1510, s: 1.04, look: t < EV.ht_city ? [0.5, 0.3] : t < EV.ht_first ? [0.6, -0.5] : [0, 0], frost: t < EV.ht_bat ? 0.8 : 0, chatter: t < EV.ht_bat ? 1 : 0,
      hand: t > EV.ht_bat && t < EV.ht_first ? [150, -170] : undefined, handF: t > EV.ht_bat && t < EV.ht_first ? [180, -150] : undefined, tailUp: t > EV.ht_first }),
    cam: () => [[S0.heat, 520, 1160, 0.26], [EV.ht_bat, 500, 1200, 0.3], [EV.ht_city, 640, 1000, 0.14, 'x'], [EV.ht_first, 620, 1040, 0.16], [S1.heat, 600, 1060, 0.2]],
    hud
  };
  TRANS_IN.heat = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {        // голубая вспышка → полёт по трубе (кольца) → вылет из батареи
    if (k < 0.3) { drawBuf(A); scr(() => whiteOut(sm(k / 0.3), '170,215,255')); }
    else if (k < 0.7) { const f = (k - 0.3) / 0.4; scr(() => { screenFill('#1a0e08', 1); for (let q = 0; q < 12; q++) { const ph = (f * 2 + q / 12) % 1, R = 30 + Math.pow(ph, 2.2) * 1600; pencil(ellPts(540, 960, R, R, 0, 0, 30), { w: 2 + ph * 30, col: q % 2 ? '#8a8a8a' : '#ff8a3a', a: 0.9 * ph, pass2: false }); } glow(540, 960, 200, 'rgba(255,170,90,1)', 0.8); }); }
    else { const f = sm((k - 0.7) / 0.3); drawBuf(B, 1.3 - 0.3 * f, 560, 1450); scr(() => whiteOut((1 - f) * 0.4, '255,190,130')); }
  } };
})();
