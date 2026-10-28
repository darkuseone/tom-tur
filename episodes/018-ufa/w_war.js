/* 018 — сцена `war`: 1941–1945, эвакуация. Слева прибывают эшелоны (вагоны со станками под брезентом, люди с узлами), справа —
   цех под открытым небом в первую зиму: станки, моторы на стапелях, работницы и подростки на ящиках у станков, плакат
   «ВСЁ ДЛЯ ФРОНТА!» (без символики). На «заводов» вагоны выгружаются, счётчик «40+ заводов · 100 тыс. человек», на «моторы» —
   мотор крупно, винт крутится. Том — клёпальщик. Переход В сцену — гудок эшелона, паровозный пар. */
(() => {
  EV.wa_fac = wtk('s5', 'заводов.');
  EV.wa_eng = wtk('s5', 'моторы');
  KEYW.push('заводов.', 'моторы', 'самолётов.');

  function sky(t) { vgrad(-900, 1000, ['#6a6e7a', '#a8acb4', '#d8d4cc'], 1); for (let k = 0; k < 5; k++) { const ph = (t * 0.2 + k / 5) % 1; ell(800 + k * 120 + ph * 80, 700 - ph * 300, 50 + ph * 90, 40 + ph * 60, { wash: '#5a5a62', washA: 0.4 * (1 - ph), line: false }); } }
  function yard(t) {
    const g = shape([[-600, 1500], [-600, 1080], [1700, 1060], [1700, 1500]], { wash: '#d8dce0', washA: 1, w: 2, col: '#7a848a' }); hatch(g.path, g.bb, { gap: 14, a: 0.08, col: '#7a848a', ang: 0.1, w: 1 });
    pencil([[-600, 1120], [1700, 1120]], { w: 5, col: '#3a3a3a', pass2: false }); const tx = t < EV.wa_fac ? -300 + (EV.wa_fac - t) * 0 : -300; train(tx - 800 + ((t - S0.war) * 60), 1120, 0.6, t, { n: 4 });
    for (let q = 0; q < 3; q++) { push(-300 + q * 260, 1080, 0.6); rect(-90, -110, 180, 110, { wash: '#5a6a4a', washA: 1, w: 2, col: '#1a2010' }); blob([[-100, -110], [-80, -140], [80, -140], [100, -110]], { wash: '#6a7a5a', washA: 1, w: 2, col: '#1a2010' }); pop(); }
    rect(600, 760, 700, 340, { wash: '#8a8a8e', washA: 1, w: 2.4, col: '#2a2a2e' }); for (let q = 0; q < 5; q++) rect(620 + q * 136, 790, 110, 110, { wash: '#a8c8d8', washA: 1, w: 1.6, col: '#2a2a2e' }); push(950, 720, 1, 0.02); rect(-230, -40, 460, 80, { wash: '#c8302a', washA: 1, w: 2.4, col: '#5a0a08' }); txt('ВСЁ ДЛЯ ФРОНТА!', 0, 14, 40, { font: 'Osw', col: '#f2ece0' }); pop();
    for (let q = 0; q < 3; q++) engine(700 + q * 230, 1200, 0.45, t, { spin: 0 });
    for (let i = 0; i < 3; i++) human(760 + i * 230, 1330, 0.46, t, { body: ['#3a4a6a', '#5a3a3a', '#3a3a3a'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i === 1 ? 'scarf' : 'cap', hatCol: i === 1 ? '#c8302a' : '#2a2a2a', face: 'calm', armR: Math.sin(t * 6 + i) > 0 ? 'up' : 'point', armL: 'hold', long: i === 1, seed: 18610 + i, flip: -1 });
    for (let i = 0; i < 4; i++) human(-200 + i * 120, 1300, 0.4, t, { body: ['#4a3a2a', '#2a3a4a', '#5a4a3a', '#3a3a3a'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i % 2 ? 'scarf' : 'cap', hatCol: '#5a4a3a', face: 'calm', armR: 'hold', armL: 'hold', long: i % 2 === 1, seed: 18620 + i });
  }

  WORLD.war = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => yard(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#c8ccd0', washA: 1, w: 2, col: '#5a5a5e', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.1, col: '#5a5a5e', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(60, [-200, -200, 1300, 2000], '#ffffff', t, 18630, { sp: 90, vx: -30, sz: 3, a: 0.6, wob: 20 }));
  };
  DIR.war = {
    outfit: 'iron', light: { side: 1, rim: '#e8ecf0' }, grade: ['#7a7e86', 0.12],
    act: () => [[S0.war, 'cold'], [EV.wa_fac, 'shock'], [EV.wa_eng, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.wa_eng ? 1 : undefined, hand: t > EV.wa_eng ? [220, -300] : [120, -270] }),
    cam: () => [[S0.war, 560, 1060, 0.04], [EV.wa_fac, 460, 1100, 0.06], [EV.wa_eng, 700, 1140, 0.1], [S1.war, 700, 1140, 0.12]],
    hud: t => { if (t > EV.wa_fac && t < EV.wa_eng) { const k = popK(t, EV.wa_fac, 0.35); push(560, 760, k, -0.03); rect(-230, -60, 460, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a3a3a' }); txt('40+ ЗАВОДОВ', 0, -8, 40, { font: 'Osw', col: '#a8201e' }); txt('≈ 100 000 эвакуированных', 0, 36, 26, { col: '#2a2a2a' }); pop(); }
      if (t > EV.wa_eng) { const k = popK(t, EV.wa_eng, 0.35); push(620, 820, k * 0.9, 0); rect(-260, -130, 520, 260, { wash: '#2a2a2e', washA: 0.92, w: 3, col: '#000' }); engine(-40, 40, 0.75, t, { spin: 20 }); txt('АВИАМОТОРЫ', 0, -96, 32, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.war = { a: 0.3, b: 0.45, fx(k, t, A, B) {                 // паровозный пар заволакивает и открывает
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(18640); for (let i = 0; i < 40; i++) { const x = r() * W, y = H - r() * H * sm(k) * 1.4, R = 120 + r() * 200; ell(x, y, R, R * 0.7, { wash: i % 3 ? '#f2f2f2' : '#d8d8dc', washA: 0.9 * f, line: false }); } });
  } };
})();
