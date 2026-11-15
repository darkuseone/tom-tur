/* 028 — сцена `basil`: 1561, Москва, Красная площадь у рва. Новый Покровский собор (Василия Блаженного) в пёстрых главах, леса ещё
   не разобраны, звонари на звоннице, торговые ряды, бояре, стрельцы, сани с колоколом, голуби. Главный свет — низкое солнце справа
   (золото на главах), второй — синие тени снега. Том-боярин (knyaz): на «Москве» — табличка «МОСКВА · 1561», на «собор» камера поднимается
   к главам, на «Да» над собором разворачивается лента «В ЧЕСТЬ ВЗЯТИЯ КАЗАНИ · 1552», Том тычет в неё. Переход В — колокол раскачивает кадр. */
(() => {
  EV.bs_msk = wtk('s4', 'Москве');
  EV.bs_win = wtk('s4', 'победы');
  EV.bs_sob = wtk('s4', 'собор');
  EV.bs_yes = wtk('s4', 'Да,');
  EV.bs_kzn = wtk('s4', 'Казань.');
  KEYW.push('победы', 'Блаженного!', 'Казань.');
  SHAKES.push([EV.bs_sob, 0.2, 6]);
  const L = KZ.ink, SUN = [980, 700];
  function sky(t) { vgrad(-900, 1200, ['#4a6aa8', '#9ab8d8', '#f0d8b0', '#ffe8c0'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,230,180,1)', 0.4);
    for (let i = 0; i < 12; i++) { const r = rng(3860 + i), x = ((r() * 1300 + t * 50) % 1400) - 150, y = 400 + r() * 300; push(x, y, 0.5); pencil([[-20, -6 + Math.sin(t * 9 + i) * 6], [0, 0], [20, -6 + Math.sin(t * 9 + i) * 6]], { w: 3, col: '#3a3a42', pass2: false }); pop(); } }
  function kremlinM(t) { rect(-500, 960, 2100, 80, { wash: '#a8402a', washA: 1, w: 2, col: L }); for (let x = -480; x < 1600; x += 46) poly([[x, 960], [x + 10, 920], [x + 30, 920], [x + 40, 960]], { wash: '#a8402a', washA: 1, w: 1.2, col: L });
    for (const x of [-100, 1300]) { rect(x - 60, 760, 120, 280, { wash: '#a8402a', washA: 1, w: 2, col: L }); poly([[x - 70, 760], [x, 660], [x + 70, 760]], { wash: '#3a6a4a', washA: 1, w: 2, col: L }); } depthFog('#e8d8c0', 0.07); }
  function cathedral(t) {                                            // Покровский собор + леса + звонница
    basilC(560, 1250, 1.3, t);
    for (let k = -3; k <= 3; k++) if (k !== 0) pencil([[560 + k * 70, 1240], [560 + k * 70, 1240 - 300 - Math.abs(k) * 10]], { w: 4, col: '#8a6a3a', a: 0.7, pass2: false }); for (let j = 1; j < 4; j++) pencil([[330, 1240 - j * 90], [790, 1240 - j * 90]], { w: 3, col: '#8a6a3a', a: 0.7, pass2: false });
    push(1040, 1240, 0.8); rect(-70, -300, 140, 300, { wash: '#e8dcc0', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) { const sw = Math.sin(t * 3 + q) * 0.3; push(-40 + q * 40, -240, 1, sw); blob([[-16, 0], [-14, -30], [0, -40], [14, -30], [16, 0]], { wash: KZ.gold, washA: 1, w: 1.4, col: KZ.goldD }); pop(); } poly([[-80, -300], [0, -400], [80, -300]], { wash: '#3a6a4a', washA: 1, w: 2, col: L }); pop();
    if (t > EV.bs_yes - 0.1) { const q = sm(clamp((t - EV.bs_yes + 0.1) / 0.5)), w = 760 * q; push(560, 790, 1, -0.03); shape([[-w / 2, -50], [w / 2, -50], [w / 2 + 40, 0], [w / 2, 50], [-w / 2, 50], [-w / 2 - 40, 0]], { wash: KZ.pom, washA: 1, w: 3, col: L }); if (q > 0.6) txt('В ЧЕСТЬ ВЗЯТИЯ КАЗАНИ · 1552', 0, 2, 36, { col: '#fff2d6', font: 'Osw', a: (q - 0.6) / 0.4 }); pop(); }
  }
  function square(t) {                                               // площадь: торговые ряды, бояре, стрельцы, сани с колоколом
    rect(-500, 1260, 2100, 60, { wash: '#d8d4cc', washA: 1, w: 2, col: L });
    for (let i = 0; i < 4; i++) { const x = -200 + i * 200; push(x, 1260, 0.7); rect(-80, -120, 160, 120, { wash: '#8a5a32', washA: 1, w: 2, col: L }); poly([[-90, -120], [0, -170], [90, -120]], { wash: '#5a3a1e', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) ell(-40 + q * 40, -40, 16, 16, { wash: ['#e8a83a', '#c83a2a', '#8a9a3a'][q], washA: 1, w: 1, col: L }); pop(); }
    const P = [[700, '#7a2a2a', 'fur', 'hold'], [820, '#2a4a7a', 'fur', 'wave'], [940, '#b8201e', 'helmet', 'spear'], [1180, '#b8201e', 'helmet', 'spear'], [1080, '#5a3a6a', 'scarf', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1290, 0.55, t, { body: c, hat: h, hatCol: '#3a2a1a', legs: '#3a2a1a', beard: i < 2 ? 'long' : 'short', hair: '#3a2a1a', armR: a === 'spear' ? 'hold' : a, prop: a === 'spear' ? 'axe' : undefined, flip: -1, seed: 3870 + i, face: 'calm', long: h === 'scarf' ? 1 : 0 }));
    push(1340, 1290, 0.6); horse(0, 0, 1, t, 2, '#8a6a4a'); rect(-260, -80, 160, 60, { wash: '#6a4424', washA: 1, w: 2, col: L }); blob([[-230, -80], [-226, -150], [-180, -170], [-134, -150], [-130, -80]], { wash: KZ.gold, washA: 1, w: 2, col: KZ.goldD }); pop();
  }
  function snow(t) {                                                 // снег под Томом, следы саней, шапки снега
    rect(-500, 1400, 2100, 900, { wash: '#e8ecf0', washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) pencil([[-500, 1460 + i * 90], [1600, 1480 + i * 90]], { w: 6, col: '#c8d0dc', pass2: false });
    lightPool(SUN[0] - 300, 1620, 640, 140, 'rgba(255,230,180,1)', 0.45);
    push(980, 1660, 1); rect(-60, -110, 120, 110, { wash: '#8a5a32', washA: 1, w: 2, col: L }); ell(0, -112, 64, 14, { wash: '#f4f6f8', washA: 1, w: 1.4, col: L }); pop();
    for (let q = 0; q < 5; q++) { const r = rng(3880 + q); push(-100 + r() * 300, 1700 + r() * 200, 1); ell(0, 0, 30, 10, { wash: '#d8dce4', washA: 1, w: 1.2, col: '#a8b0bc' }); pop(); }
    push(780, 1720, 0.8); horse(0, 0, 1, t, 1, '#5a3a24'); rect(-300, -90, 200, 50, { wash: '#8a2a2a', washA: 1, w: 2, col: L }); pencil(spline([[-310, -40], [-330, -20], [-300, 0], [-100, 0]], false, 8), { w: 5, col: '#3a2a1a', pass2: false }); pop();   // сани
    push(1180, 1700, 1); rect(-80, -140, 160, 140, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) ell(-50 + (q % 3) * 50, -110 + Math.floor(q / 3) * 40, 18, 18, { line: true, w: 6, col: '#c8843a' }); txt('БАРАНКИ', 0, -10, 22, { col: KZ.goldL, font: 'Osw' }); pop();   // лоток с баранками
    for (const [x, fl] of [[60, 1], [140, -1]]) human(x, 1760, 0.45, t, { body: fl > 0 ? '#3a5a8a' : '#8a3a2a', hat: 'fur', hatCol: '#5a3a1a', armR: 'up', seed: 4040 + x, flip: fl, face: 'grin' });   // дети со снежками
    push(420, 1680, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop(); push(470, 1700, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop();
    castShadow(330, 1612, 120, 520, -0.4, 0.4); moodDark(SUN[0], 1000, 900, 1700, '#1a2040', 0.3);
  }
  function hud(t) { if (t > EV.bs_msk - 0.05 && t < EV.bs_sob) { const q = popK(t, EV.bs_msk - 0.05, 0.3); push(560, 800, q, -0.02); rect(-200, -50, 400, 100, { wash: '#14100a', washA: 0.9, w: 3, col: KZ.goldL }); txt('МОСКВА · 1555–1561', 0, 2, 44, { col: KZ.goldL, font: 'Osw' }); pop(); } }
  function front(t) { for (let i = 0; i < 40; i++) { const r = rng(hsh(3890, i)), x = ((r() * 1300 + t * 20 * (0.5 + r())) % 1400) - 150, y = ((r() * 2000 + t * 80 * (0.5 + r())) % 2100) - 100; ell(x, y, 4 + r() * 4, 4 + r() * 4, { wash: '#ffffff', washA: 0.85, line: false }); } for (const x of [-60, 1150]) sil([[x - 60, 2300], [x - 50, 1540], [x + 50, 1500], [x + 60, 2300]], '#1a1a24', 1); }
  WORLD.basil = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => kremlinM(t)); lay(5, () => cathedral(t)); lay(2.4, () => { square(t); depthFog('#e8e0d8', 0.04); }); lay(1, () => { snow(t); cat(); }); lay(0.6, () => front(t));
  };
  DIR.basil = {
    outfit: 'knyaz', light: { side: 1, rim: '#ffe0b0' }, grade: ['#a8b8d0', 0.06],
    act: () => [[S0.basil, 'talk'], [EV.bs_win, 'proud'], [EV.bs_sob, 'awe'], [EV.bs_yes, 'smug'], [EV.bs_kzn, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.bs_sob && t < EV.bs_yes ? [0.4, -0.95] : [0.7, -0.5], hand: t > EV.bs_yes - 0.1 ? [240, -560] : [180, -300], tailUp: t > EV.bs_yes }),
    cam: () => [[S0.basil, 600, 1000, -0.02], [EV.bs_msk, 600, 1000, 0.0], [EV.bs_sob, 580, 760, 0.04, 'x'], [EV.bs_yes, 580, 900, 0.0], [EV.bs_kzn, 560, 960, 0.06, 'x'], [S1.basil, 560, 960, 0.08]],
    hud
  };
  TRANS_IN.basil = { a: 0.12, b: 0.38, fx(k, t, A, B) {              // колокольный удар: кадр раскачивается и сменяется, кольца звука
    const e = sm(k), a = Math.sin(e * Math.PI); drawBuf(e < 0.5 ? A : B, 1 + a * 0.08, 540, 300, 1, null, 0, 0, Math.sin(e * 12) * 0.08 * a); scr(() => { for (let q = 0; q < 4; q++) pencil(ellPts(540, 400, (q + 1) * 260 * e, (q + 1) * 180 * e, 0, 0, 40), { w: 8, col: KZ.goldL, a: a * (1 - q * 0.2), pass2: false }); });
  } };
})();
