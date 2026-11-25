/* 034 — сцена `chain`, 1989–1990. Балтийский путь: живая цепь людей, взявшихся за руки, по обочине шоссе через поля до горизонта,
   трёхцветные флаги (1989 — уже разрешены), свечи, машины остановились, дети на плечах. Главный свет — закатное солнце впереди
   (контровой, длинные тени к камере). На «девяностом» — карта-врезка: цепь Вильнюс — Рига — Таллин «≈ 2 МЛН · ≈ 675 КМ»;
   на «первой» — плашка «11.03.1990 · ПЕРВОЙ ИЗ СССР»; Том (худи) держит за руки соседей в цепи и вскидывает их вверх на «уходим». */
(() => {
  const L = LTC.ink, SUN = [560, 700];
  EV.ch_90 = wtk('s8', 'девяностом'); EV.ch_first = wtk('s8', 'первой'); EV.ch_go = wtk('s8', 'уходим');
  KEYW.push('первой', 'СССР.');
  function sky(t) { vgrad(-900, 1100, ['#3a4a8a', '#c87a6a', '#f8b060', '#f8d890'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,210,140,1)', 0.5); ell(SUN[0], SUN[1], 70, 70, { wash: '#fff0c8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 300 + i * 70, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + dx, y - 18], [900 + dx, y - 6], [1300, y + 10], [300, y + 16]], { wash: '#f8c8a0', washA: 0.5, line: false }); } }
  function far(t) { hills(1000, 20, '#5a6a3a', 9.1); const r = rng(8000); for (let i = 0; i < 40; i++) { const x = 200 + i * 14, s = 0.12 + i * 0.002; sil([[x - 6, 1010], [x - 4, 990], [x, 984], [x + 4, 990], [x + 6, 1010]], '#2a1a14', 0.8); } depthFog('#f8d0a0', 0.08); }
  function road(t) {                                                // шоссе к горизонту, цепь по обочине, флаги, машины, свечи
    poly([[480, 1010], [620, 1010], [1500, 1700], [-400, 1700]], { wash: '#5a5a60', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) { const k = i / 8, k2 = (i + 0.5) / 8; pencil([[550 + 0 * k, 1010 + k * 690], [550, 1010 + k2 * 690]], { w: 4 + k * 10, col: '#f0ece0', pass2: false }); }
    for (let i = 0; i < 26; i++) { const k = Math.pow(i / 26, 1.6), x = lerp(470, -250, k), y = lerp(1015, 1420, k), s = lerp(0.12, 0.72, k); human(x, y, s, t, { body: ['#c84a3a', '#3a6aa8', '#e8b030', '#2a8a5a', '#7a4a8a', '#e8e0d0'][i % 6], hat: i % 5 === 0 ? 'scarf' : null, hatCol: '#c8281e', legs: '#2a2a36', armR: 'wave', armL: 'wave', seed: 8010 + i, face: 'grin', long: i % 5 === 0 ? 1 : undefined }); }
    for (let i = 0; i < 16; i++) { const k = Math.pow(i / 16, 1.6), x = lerp(640, 1250, k), y = lerp(1015, 1400, k), s = lerp(0.12, 0.7, k); human(x, y, s, t, { body: ['#3a6aa8', '#e86a8a', '#5a6a3a', '#e8b030'][i % 4], legs: '#2a2a36', armR: 'wave', armL: 'wave', flip: -1, seed: 8040 + i, face: 'grin' }); }
    for (let i = 0; i < 4; i++) { const k = 0.3 + i * 0.18; ltFlag(lerp(470, -200, k) + 20, lerp(1015, 1400, k) - 380 * lerp(0.2, 0.7, k), 120 * lerp(0.3, 1, k), 70 * lerp(0.3, 1, k), t, { pole: 300 * lerp(0.3, 1, k) }); }
    push(820, 1180, 0.5); rect(-160, -110, 300, 80, { wash: '#e8e4d8', washA: 1, w: 2, col: L }); rect(-60, -160, 160, 60, { wash: '#e8e4d8', washA: 1, w: 2, col: L }); for (const k of [-100, 90]) ell(k, -26, 28, 28, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
  }
  function ground(t) {                                              // обочина: трава, полевые цветы, свечи в банках, термос, плакат
    rect(-500, 1420, 2200, 1000, { wash: '#7a8a3a', washA: 1, w: 2, col: L }); const r = rng(8060); for (let i = 0; i < 80; i++) { const x = r() * 1900 - 400, y = 1440 + r() * 600, h = 16 + r() * 26; pencil([[x, y], [x + 3, y - h]], { w: 2.4, col: i % 3 ? '#4a6a22' : '#a8b050', pass2: false }); if (i % 9 === 0) ell(x, y - h, 6, 6, { wash: ['#f2c02a', '#c8281e', '#8a6ad8'][i % 3], washA: 1, w: 1, col: L }); }
    for (let i = 0; i < 6; i++) { const x = 700 + i * 80; push(x, 1760 + (i % 2) * 30, 1); rect(-14, -34, 28, 34, { wash: '#c8d8e0', washA: 0.6, w: 1.4, col: L }); blob([[-4, -34], [0, -54 - Math.sin(t * 9 + i) * 4], [4, -34]], { wash: '#ffd060', washA: 1, line: false }); glow(0, -44, 24, 'rgba(255,210,120,1)', 0.4); pop(); }
    push(-40, 1760, 1, -0.1); rect(-90, -140, 180, 120, { wash: '#f0e8d0', washA: 1, w: 2, col: L }); txt('LAISVĖ', 0, -80, 40, { col: LTC.red, font: 'Osw' }); pencil([[0, -20], [0, 60]], { w: 6, col: '#6a4a2a', pass2: false }); pop();
    lightPool(SUN[0], 1600, 1200, 200, 'rgba(255,200,130,1)', 0.3); castShadow(400, 1760, 110, 520, Math.PI, 0.32); moodDark(540, 1300, 700, 1600, '#1a1008', 0.14);
  }
  function front(t) { for (const x of [-140, 1230]) { human(x, 2000, 1.4, t, { body: x < 0 ? '#2a8a5a' : '#c84a3a', legs: '#2a2a36', armR: 'wave', flip: x < 0 ? 1 : -1, seed: 8070 + (x > 0 ? 1 : 0), face: 'grin' }); } }
  function hud(t) {
    if (t > EV.ch_90 - 0.2 && t < EV.ch_first) { const k = popK(t, EV.ch_90 - 0.2, 0.3); push(720, 1130, 0.62 * k, -0.02); ctx.save(); ctx.fillStyle = 'rgba(226,214,176,0.98)'; ctx.fillRect(-240, -300, 480, 600); ctx.restore(); pencil([[-240, -300], [240, -300], [240, 300], [-240, 300], [-240, -300]], { w: 4, col: L, pass2: false, gap: false });
      ctx.save(); ctx.beginPath(); ctx.rect(-240, -300, 480, 600); ctx.clip(); const P = ([lo, la]) => [(lo - 24.5) * 60, -(la - 57) * 100]; GLOBE.fill(BALTIC_L.map(P), '#3a86b8'); GLOBE.fill(LT_NOW.map(P), LTC.yel);
      const pts = [LTG.vilnius, [24.6, 55.9], LTG.riga, [25.0, 58.0], LTG.tallinn].map(P), f = sm(clamp((t - EV.ch_90 + 0.2) / 0.9)); pencil(pts.slice(0, 1 + Math.ceil(f * 4)), { w: 8, col: LTC.red, pass2: false, gap: false });
      for (const [n, ll] of [['ВИЛЬНЮС', LTG.vilnius], ['РИГА', LTG.riga], ['ТАЛЛИН', LTG.tallinn]]) { const [x, y] = P(ll); ell(x, y, 10, 10, { wash: LTC.red, washA: 1, w: 2, col: L }); txt(n, x + 80, y, 34, { col: L, font: 'Osw' }); } ctx.restore();
      txt('≈ 2 МЛН · ≈ 675 КМ', 0, 250, 40, { col: LTC.red, font: 'Osw' }); pop(); }
    if (t > EV.ch_first) ltBoard(640, 1000, 0.85, t, EV.ch_first, [['11.03.1990', 54, LTC.amberL], ['ПЕРВОЙ ИЗ СССР', 52]], { w: 480 });
  }
  function extras(t) {                                              // остановленные машины, люди на крышах, дети на плечах, транспарант «SĄJŪDIS», аисты
    for (let i = 0; i < 3; i++) { push(1060 + i * 140, 1500 + i * 40, 0.7 + i * 0.08, 0, -1); rect(-120, -90, 240, 60, { wash: ['#c8281e', '#e8e4d8', '#3a6aa8'][i], washA: 1, w: 2, col: LTC.ink }); rect(-70, -140, 150, 54, { wash: ['#c8281e', '#e8e4d8', '#3a6aa8'][i], washA: 1, w: 2, col: LTC.ink }); rect(-56, -130, 60, 36, { wash: '#a8c8d8', washA: 1, w: 1.2, col: LTC.ink }); for (const k of [-80, 80]) ell(k, -26, 24, 24, { wash: '#1e1e22', washA: 1, w: 2, col: LTC.ink });
      human(10, -140, 0.6, t, { body: ['#2a8a5a', '#f2c02a', '#e86a8a'][i], legs: '#2a2a36', armR: 'wave', seed: 8090 + i, face: 'grin' }); pop(); }
    push(-80, 1560, 0.9); human(0, 0, 1, t, { body: '#5a6a8a', legs: '#2a2a36', armR: 'wave', armL: 'wave', seed: 8094, face: 'grin' }); human(0, -300, 0.55, t, { body: '#f2c02a', legs: '#c8281e', armR: 'wave', seed: 8095, face: 'grin' }); pop();
    push(180, 1220, 0.7); for (const k of [-140, 140]) pencil([[k, 0], [k, -260]], { w: 6, col: '#6a4a2a', pass2: false }); rect(-150, -260, 300, 80, { wash: '#f4efe4', washA: 1, w: 2, col: LTC.ink }); txt('SĄJŪDIS', 0, -220, 40, { col: LTC.grn, font: 'Osw' }); pop();
    for (let i = 0; i < 3; i++) { const x = 300 + i * 160 + Math.sin(t + i) * 40, y = 620 + i * 30; push(x, y, 0.8); pencil([[-40, Math.sin(t * 5 + i) * 10], [0, 0], [40, Math.sin(t * 5 + i) * 10]], { w: 4, col: '#f4f4f0', pass2: false }); ell(0, 0, 10, 6, { wash: '#f4f4f0', washA: 1, line: false }); pencil([[6, 0], [20, 4]], { w: 3, col: '#e85a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(560 + i * 60, 1300, 0.4); pencil([[0, 0], [0, -60]], { w: 3, col: '#6a4a2a', pass2: false }); ellFlag(t, i); pop(); }
  }
  function ellFlag(t, i) { for (let q = 0; q < 3; q++) rect(0, -60 + q * 12, 50, 12, { wash: [LTC.yel, LTC.grn, LTC.red][q], washA: 1, w: 1, col: LTC.ink }); }
  WORLD.chain = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.0, () => road(t)); lay(1.5, () => extras(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(14, [-100, 800, 1200, 1700], '#fff0c8', t, 8080, { sp: 2, sz: 2.4, a: 0.45, wob: 14, add: 1 }));
  };
  DIR.chain = {
    outfit: 'hoodieLT', light: { side: 1, rim: '#ffc890' }, grade: ['#3a1a10', 0.05],
    act: () => [[S0.chain, 'proud'], [EV.ch_90, 'smug'], [EV.ch_first, 'proud'], [EV.ch_go, 'laugh']],
    pose: (t, u, b) => { const up = t > EV.ch_go; return Object.assign(b, { x: 380, y: 1760, s: 0.95, look: [0.3, -0.4], hand: up ? [170, -470] : [200, -230], handF: up ? [-170, -470] : [-200, -230], squash: up && t < EV.ch_go + 0.25 ? 0.05 : b.squash }); },
    hud,
    cam: () => [[S0.chain, 600, 1040, -0.08], [EV.ch_90, 580, 1060, -0.04], [EV.ch_go, 460, 1160, 0.08, 'x'], [S1.chain, 440, 1180, 0.12]]
  };
  TRANS_IN.chain = { a: 0.12, b: 0.32, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H * (1 - e)); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); for (let i = 0; i < 3; i++) pencil([[0, H * (1 - e) + i * 8], [W, H * (1 - e) + i * 8]], { w: 6, col: [LTC.yel, LTC.grn, LTC.red][i], pass2: false, gap: false }); }); } };
})();
