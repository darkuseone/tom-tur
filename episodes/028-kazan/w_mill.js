/* 028 — сцена `mill`: 2005, тысячелетие Казани. Ночной кремль в салюте «1000», только что открытая мечеть Кул-Шариф, толпа с флажками;
   на переднем плане — раскоп с сеткой из бечёвок, археолог с кисточкой. Главный свет — салют и прожекторы. Том (suitK):
   на «две тысячи пятом» — ответ на хук (плашка «2005: ТЫСЯЧА ЛЕТ!»), на «тысячу» в небе распускается «1000», на «раскопкам» Том
   кисточкой расчищает черепок в раскопе, на «спорят» над двумя историками вспыхивают облачка «1005!» и «XII ВЕК!». Переход В — салют. */
(() => {
  EV.answer = wtk('s7', 'пятом');
  EV.ml_1000 = wtk('s7', 'тысячу');
  EV.ml_dig = wtk('s7', 'раскопкам');
  EV.ml_spor = wtk('s7', 'спорят');
  KEYW.push('пятом', 'тысячу', 'спорят');
  SHAKES.push([EV.ml_1000, 0.25, 6]);
  const L = KZ.ink;
  function sky(t) { vgrad(-900, 1200, ['#060818', '#101a3a', '#2a2a5a'], 1);
    for (let i = 0; i < 5; i++) { const ph = ((t - S0.mill) * 0.5 + i * 0.21) % 1, x = 180 + i * 200, y = 560 - (i % 2) * 120, rr = ph * 240; if (ph < 0.75) { const c = ['#ff6a8a', '#ffe08a', '#8ae0ff', '#8aff9a', '#c88aff'][i]; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; pencil([[x + Math.cos(a) * rr * 0.6, y + Math.sin(a) * rr * 0.6], [x + Math.cos(a) * rr, y + Math.sin(a) * rr + ph * 50]], { w: 3, col: c, a: 1 - ph / 0.75, pass2: false }); } } }
    if (t > EV.ml_1000 - 0.05) { const q = clamp((t - EV.ml_1000 + 0.05) / 0.6), a = t < EV.ml_1000 + 2.2 ? 1 : clamp(1 - (t - EV.ml_1000 - 2.2) / 0.5); txt('1000', 560, 700, 120 + 60 * q, { col: KZ.goldL, font: 'Osw', a: a * q }); glow(560, 700, 260 * q, 'rgba(255,220,120,1)', 0.25 * q * a); } }
  function kremlinN(t) { hills(1040, 30, '#141a30', 3970); kWall(-300, 1400, 1050, 70, t, { col: '#d8d0c0' }); kTower(-40, 1050, 0.45, t); kTower(220, 1050, 0.5, t, { spire: true }); annunc(430, 1000, 0.5, t); suyum(660, 1020, 0.5, t, { lit: 1 }); kulsharif(940, 1010, 0.6, t, { lit: 1 }); glow(940, 830, 220, 'rgba(120,230,220,1)', 0.15); kTower(1240, 1050, 0.45, t); depthFog('#141a3a', 0.08); }
  function crowd(t) {                                                // толпа с флажками и баннер «КАЗАНЬ 1000»
    rect(-500, 1260, 2100, 60, { wash: '#2a2a3a', washA: 1, w: 2, col: L });
    push(560, 1150, 1); rect(-260, -60, 520, 120, { wash: KZ.green, washA: 1, w: 3, col: L }); for (let k = -2; k <= 2; k++) ornament(k * 100, 0, 30, t, { a: 0.9 }); txt('КАЗАНЬ · 1000', 0, 4, 56, { col: '#fff2d6', font: 'Osw' }); pop();
    for (let i = 0; i < 9; i++) { const x = -120 + i * 170, c = ['#2a8a4a', '#c83a5a', '#3a5a8a', '#e8c050'][i % 4]; human(x, 1300, 0.52, t + i * 0.2, { body: c, legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: 'up', seed: 3975 + i, flip: i % 2 ? -1 : 1, face: 'grin' }); const hx = x + (i % 2 ? -30 : 30), hy = 1300 - 0.52 * 400; pencil([[hx, hy + 30], [hx, hy - 50]], { w: 3, col: '#5a3a1a', pass2: false }); shape([[hx, hy - 50], [hx + 40, hy - 40], [hx, hy - 26]], { wash: i % 2 ? KZ.green : '#f4f0e8', washA: 1, w: 1, col: L }); }
  }
  function dig(t) {                                                  // раскоп под Томом: сетка из бечёвок, черепки, совок, историки спорят
    rect(-500, 1400, 2100, 900, { wash: '#4a3a30', washA: 1, w: 2, col: L });
    push(620, 1600, 1); rect(-300, -80, 600, 260, { wash: '#6a4a30', washA: 1, w: 2.4, col: L }); for (const [y, c] of [[-60, '#7a5a3a'], [10, '#5a4030'], [80, '#8a6a4a']]) rect(-290, y, 580, 60, { wash: c, washA: 1, line: false });
    for (let q = 0; q <= 6; q++) pencil([[-300 + q * 100, -80], [-300 + q * 100, 180]], { w: 1.6, col: '#f0e0c0', pass2: false }); for (let q = 0; q <= 2; q++) pencil([[-300, -80 + q * 130], [300, -80 + q * 130]], { w: 1.6, col: '#f0e0c0', pass2: false });
    const cl = t > EV.ml_dig ? clamp((t - EV.ml_dig) / 0.6) : 0; blob([[-40, 20], [-10, 0], [30, 6], [40, 30], [0, 40]], { wash: lerpC('#5a4030', '#c8743a', cl), washA: 1, w: 1.4, col: L }); if (cl > 0.5) glow(0, 20, 60, 'rgba(255,220,150,1)', 0.3); pop();
    lightPool(560, 1600, 560, 140, 'rgba(255,230,180,1)', 0.45);
    for (const [x, fl, txt1, d] of [[800, -1, '1005!', 0], [1010, -1, 'XII ВЕК!', 0.25]]) { push(x, 1640, 0.62); human(0, 0, 1, t, { body: fl < 0 && x > 1100 ? '#5a4a3a' : '#3a4a5a', legs: '#2a2a32', hair: '#c8c0b0', beard: 'short', armR: 'point', flip: x > 900 ? -1 : 1, seed: 3985 + x, face: t > EV.ml_spor ? 'angry' : 'calm' }); pop();
      if (t > EV.ml_spor + d - 0.05) { const q = popK(t, EV.ml_spor + d - 0.05, 0.3); push(x, 1300, q, (x > 900 ? 0.08 : -0.08)); blob([[-110, -46], [110, -46], [120, 36], [10, 40], [-10, 76], [-20, 40], [-120, 36]], { wash: '#ffffff', washA: 1, w: 2.4, col: L }); txt(txt1, 0, -4, 44, { col: '#b8201e', font: 'Osw' }); pop(); } }
    push(160, 1700, 1); rect(-50, -80, 100, 60, { wash: '#2a2a30', washA: 1, w: 2, col: L }); ell(60, -50, 26, 26, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); for (const k of [-40, 0, 40]) pencil([[0, -20], [k, 80]], { w: 4, col: '#3a3a42', pass2: false }); ell(-30, -86, 8, 8, { wash: '#ff3a2a', washA: 1, line: false }); pop();   // телекамера
    for (let q = 0; q < 7; q++) { const r = rng(4060 + q), x = -100 + r() * 1300, y = 1300 - ((t - S0.mill) * (40 + r() * 40) + r() * 300) % 900; pencil([[x, y + 40], [x + 4, y + 140]], { w: 1.4, col: '#e8e0d0', pass2: false }); ell(x, y, 26, 32, { wash: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#8aff9a', '#c88aff'][q % 5], washA: 1, w: 1.6, col: L }); }   // шарики
    push(1240, 1720, 1); rect(-90, -150, 180, 150, { wash: '#e8e0d0', washA: 1, w: 2, col: L }); rect(-100, -190, 200, 44, { wash: KZ.green, washA: 1, w: 1.6, col: L }); txt('ЭЧПОЧМАК', 0, -168, 24, { col: '#fff2d6', font: 'Osw' }); for (let q = 0; q < 3; q++) poly([[-60 + q * 50, -60], [-40 + q * 50, -100], [-20 + q * 50, -60]], { wash: '#e8a83a', washA: 1, w: 1.4, col: L }); pop();   // лоток эчпочмаков
    for (let q = 0; q < 3; q++) human(380 + q * 120, 1820, 0.5, t, { body: ['#2a8a4a', '#c83a5a', '#3a5a8a'][q], legs: '#2a2a32', hair: '#2a1a10', armR: 'up', armL: 'up', seed: 4070 + q, face: 'grin' });   // зрители
    push(980, 1580, 0.6); rect(-220, -40, 440, 40, { wash: '#3a3a48', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) { human(-140 + q * 140, -40, 0.9, t + q * 0.3, { body: ['#c83a5a', '#2a8a4a', '#e8c050'][q], long: 1, hat: 'fez', legs: '#2a2a32', armR: 'up', armL: 'up', seed: 4090 + q, face: 'grin' }); } for (const k of [-240, 240]) { pencil([[k, -40], [k, -420]], { w: 6, col: '#2a2a30', pass2: false }); glow(k, -420, 70, 'rgba(255,240,200,1)', 0.4); } pop();   // сцена с танцорами в калфаках
    for (let q = 0; q < 5; q++) { const x = -160 + q * 70; push(x, 1880, 1); pencil([[0, 0], [0, -80]], { w: 3, col: '#5a3a1a', pass2: false }); const f = Math.sin(t * 3 + q) * 10; shape([[0, -80], [40 + f, -74], [0, -58]], { wash: q % 2 ? KZ.green : '#f4f0e8', washA: 1, w: 1, col: L }); pop(); }   // флажки на переднем плане
    push(980, 1880, 1); rect(-90, -60, 180, 60, { wash: '#6a4424', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) poly([[-70 + q * 34, -60], [-56 + q * 34, -90], [-42 + q * 34, -60]], { wash: '#e8b04a', washA: 1, w: 1, col: L }); txt('ЧАК-ЧАК', 0, -24, 20, { col: KZ.goldL, font: 'Osw' }); pop();
    castShadow(330, 1612, 120, 400, 0.3, 0.4); moodDark(560, 1000, 900, 1800, '#04060e', 0.4);
  }
  function front(t) { const r = rng(3990); for (let i = 0; i < 24; i++) { const ph = ((t - S0.mill) * 0.3 + r()) % 1; push(r() * 1300 - 100, ph * 2000 - 100, 1, t * 3 + i); rect(-8, -4, 16, 8, { wash: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#8aff9a'][i % 4], washA: 0.95, line: false }); pop(); } rect(-200, 1900, 1500, 400, { wash: '#1a1418', washA: 1, line: false }); }
  WORLD.mill = (t, u, cat) => { lay(40, () => sky(t)); lay(14, () => kremlinN(t)); lay(2.8, () => { crowd(t); depthFog('#141a3a', 0.04); }); lay(1, () => { dig(t); cat(); }); lay(0.6, () => front(t)); };
  DIR.mill = {
    outfit: 'suitK', light: { side: 1, rim: '#c8e0ff' }, grade: ['#1a1a40', 0.06],
    act: () => [[S0.mill, 'grin'], [EV.answer, 'proud'], [EV.ml_dig, 'suspicious'], [EV.ml_spor, 'sideeye']],
    pose: (t, u, b) => { const br = t > EV.ml_dig - 0.1 && t < EV.ml_spor; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: br ? [0.9, 0.5] : t > EV.ml_spor ? [0.9, -0.3] : [0.4, -0.8], prop: br ? 'brush' : undefined, propAng: -1.2, hand: br ? [260 + Math.sin(t * 20) * 14, -200] : [180, -320], tailUp: t > EV.answer }); },
    cam: () => [[S0.mill, 600, 960, -0.04], [EV.answer, 600, 940, 0.0], [EV.ml_1000, 580, 880, -0.02], [EV.ml_dig, 560, 1100, 0.12, 'x'], [EV.ml_spor, 720, 1060, 0.08, 'x'], [S1.mill, 720, 1060, 0.1]]
  };
  TRANS_IN.mill = { a: 0.12, b: 0.4, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const R = 1600 * e, a = Math.sin(e * Math.PI); for (let i = 0; i < 36; i++) { const an = i / 36 * 6.283; pencil([[540 + Math.cos(an) * R * 0.3, 900 + Math.sin(an) * R * 0.3], [540 + Math.cos(an) * R, 900 + Math.sin(an) * R]], { w: 10, col: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#8aff9a'][i % 4], a, pass2: false }); } }); } };
})();
