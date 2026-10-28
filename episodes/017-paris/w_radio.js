/* 017 — сцена `radio` (ОТВЕТ НА ХУК): 1909 → 1914. Башня целиком, на шпиле — антенна, тросы-растяжки к земле, у подножия
   деревянный барак радиостанции; телеграфист в наушниках стучит ключом, от шпиля идут золотые волны. На «радио» волны,
   на «антенной» тросы натягиваются, на «семьдесят» бирка «НА СНОС» срывается и улетает, вместо неё — «+70 ЛЕТ».
   Вторая реплика (1914): небо темнеет, волны перехватывают «чужие» радиограммы — точки-тире складываются в лист перехвата.
   Том — телеграфист (твидовый жилет, кепка). Переход В сцену — радиоволны кольцами. */
(() => {
  EV.ra_radio = wtk('s6', 'радио:');
  EV.ra_ant = wtk('s6', 'антенной');
  EV.ra_70 = wtk('s6', 'семьдесят');
  EV.ra_war = LS('a1');
  EV.ra_int = wtk('a1', 'перехватывает');
  KEYW.push('радио:', 'антенной', 'семьдесят', 'перехватывает');
  const dusk = t => sm((t - EV.ra_war + 0.2) / 0.8);

  function sky(t) { const d = dusk(t); vgrad(-900, 1000, [lerpC('#5a8ad0', '#2a2a4a', d), lerpC('#b0d0ea', '#5a5a7a', d), lerpC('#f6ead4', '#a89070', d)], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: lerpC('#fbf8f0', '#6a6a7a', d), washA: 0.85, line: false }); } }
  function field(t) {
    const tag = t < EV.ra_70 ? 'НА СНОС · 1909' : '';
    eiffel(560, 1120, 0.7, t, { antenna: t > EV.ra_ant - 0.3, tag });
    if (t > EV.ra_70) { const k = clamp((t - EV.ra_70) / 1.2); push(560 + 300 + k * 600, 650 - k * 500, 1, k * 4); rect(0, 0, 160, 60, { wash: '#f2ece0', washA: 1 - k, w: 2, col: '#5a1a10', a: 1 - k }); txt('НА СНОС', 80, 40, 30, { font: 'Osw', col: '#a8201e', a: 1 - k }); pop(); }
    if (t > EV.ra_radio) morse(560, 1120 - 1300 * 0.7 - 80, t, { col: dusk(t) > 0.5 ? '#ff8a6a' : '#ffd24a' });
    rect(820, 1020, 260, 100, { wash: '#a87a4a', washA: 1, w: 2.4, col: '#3a2412' }); poly([[800, 1020], [1100, 1020], [950, 960]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1408' }); rect(860, 1050, 50, 40, { wash: '#ffd890', washA: 0.9, w: 1.4, col: '#2a1408' }); txt('T.S.F.', 1000, 1080, 26, { font: 'Osw', col: '#2a1408' });
    for (let q = 0; q < 3; q++) human(-300 + q * 160, 1130, 0.36, t, { body: ['#2a2a32', '#e8e4dc', '#5a3a4a'][q], legs: '#2a2a2e', hair: '#3a2210', hat: q === 1 ? 'bun' : 'merchant', hatCol: '#1a1a1e', face: 'smile', armR: 'hold', armL: 'hold', long: q === 1, seed: 17710 + q });
  }
  function desk(t) {                                                   // стол телеграфиста, ключ, лента
    rect(760, 1300, 360, 26, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1408' }); for (const lx of [790, 1090]) rect(lx - 8, 1326, 16, 130, { wash: '#4a2e14', washA: 1, w: 1.6, col: '#1a0a04' });
    rect(820, 1250, 120, 50, { wash: '#3a3a3e', washA: 1, w: 2, col: '#000' }); for (let q = 0; q < 3; q++) ell(840 + q * 40, 1270, 8, 8, { wash: q === 1 && Math.sin(t * 20) > 0 ? '#ff6a4a' : '#5a5a5e', washA: 1, w: 1, col: '#000' });
    const tap = Math.sin(t * 22) > 0.3 ? 6 : 0; rect(980, 1284 + tap, 60, 10, { wash: '#c8a040', washA: 1, w: 1.4, col: '#3a2a08' });
    if (t > EV.ra_int) { const k = popK(t, EV.ra_int, 0.4); push(940, 1180, k, -0.05); rect(-110, -80, 220, 140, { wash: '#f2ece0', washA: 1, w: 2, col: '#3a3a3a' }); txt('ПЕРЕХВАТ', 0, -52, 22, { font: 'Osw', col: '#a8201e' }); const r = rng(17720); for (let l = 0; l < 4; l++) { let x = -90; for (let q = 0; q < 10; q++) { const dash = r() > 0.5; if (dash) rect(x, -30 + l * 22, 14, 5, { wash: '#1a1a1a', washA: 1, w: 0, col: '#000' }); else ell(x + 3, -27 + l * 22, 3, 3, { wash: '#1a1a1a', washA: 1, w: 0, col: '#000' }); x += dash ? 20 : 10; } } pop(); }
  }

  WORLD.radio = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => field(t));
    lay(2.5, () => { rect(-600, 1130, 2300, 340, { wash: lerpC('#c8b890', '#8a8070', dusk(t)), washA: 1, w: 2, col: '#5a4a34' }); desk(t); });
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: lerpC('#b8a880', '#7a7060', dusk(t)), washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
  };
  DIR.radio = {
    outfit: 'director', light: { side: 1, rim: '#fff0d0' }, grade: ['#b0a080', 0.08],
    act: () => [[S0.radio, 'proud'], [EV.ra_radio, 'grin'], [EV.ra_ant, 'awe'], [EV.ra_70, 'laugh'], [EV.ra_war, 'suspicious'], [EV.ra_int, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: t < EV.ra_war ? [0.4, -0.8] : [0.6, 0.0], point: t > EV.ra_radio && t < EV.ra_70 ? 1 : undefined, hand: t > EV.ra_radio && t < EV.ra_70 ? [150, -430] : [120, -270] }),
    cam: () => [[S0.radio, 560, 960, -0.02], [EV.ra_ant, 560, 900, -0.02], [EV.ra_70, 580, 940, 0.0], [EV.ra_war, 620, 1120, 0.08], [EV.ra_int, 700, 1160, 0.12], [S1.radio, 700, 1160, 0.14]],
    hud: t => { if (t > EV.ra_70 && t < EV.ra_war) { const k = popK(t, EV.ra_70, 0.35); push(600, 1060, k, -0.03); rect(-210, -60, 420, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('+70 ЛЕТ', 0, -8, 52, { font: 'Osw', col: '#2a7a3a' }); txt('концессия с 1910', 0, 38, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.ra_war) { const k = popK(t, EV.ra_war, 0.35); push(560, 720, k, 0.02); rect(-140, -46, 280, 92, { wash: '#1a1a1e', washA: 0.92, w: 3, col: '#000' }); txt('1914', 0, 14, 48, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.radio = { a: 0.3, b: 0.45, fx(k, t, A, B) {               // радиоволны кольцами раскрывают кадр
    drawBuf(A); const R = Math.pow(sm(k), 1.2) * 1600 + 1; inCircle(540, 420, R, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { for (let q = 0; q < 5; q++) { const rr = R - q * 70; if (rr > 0) pencil(ellPts(540, 420, rr, rr, 0, 0, 80), { w: 8 - q * 1.4, col: '#ffd24a', a: 0.8 * (1 - sm(k)), pass2: false }); } });
  } };
})();
