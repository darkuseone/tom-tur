/* 022 — сцена `black`: весна 1943, тишина после битвы. Стальное небо с бледно-багровой зарёй, тот же холм — выжженный и чёрный,
   баки пробиты; вдали коробки домов, дым редеет. На холме и у подножия — люди возвращаются: женщины разбирают кирпич, бойцы
   и сапёры с щупами, старик с тачкой, девочка с ведром, собака. На «чёрным» холм на глазах темнеет до угля; на «осколков» на земле
   рамка «1 м²» и в ней сыплются осколки, счётчик до «1 200»; на «Трава» у ног Тома пробивается росток и чернеет — бирка «НЕ РОСЛА».
   Переход В сцену — металл: дождь стальных осколков сыплется сверху, за ним проступает новая сцена. */
(() => {
  EV.bk_black = wtk('s7', 'чёрным:');
  EV.bk_shard = wtk('s7', 'осколков');
  EV.bk_grass = wtk('s7', 'Трава');
  EV.bk_no = wtk('s7', 'росла.');
  KEYW.push('чёрным:', 'осколков', 'росла.');
  const L = VG.ink;

  function sky(t) {
    vgrad(-900, 1300, ['#2a3040', '#4a5262', '#7a7a86', '#a8706a', '#d8a080'], 1);
    clouds(t, -500, 6, '#5a6070', 22800, 0.5); clouds(t, 200, 4, '#8a8a96', 22801, 0.4); birds(t, 5, [100, -200, 1100, 300], 22802, '#2a2a30');
    glow(900, 1080, 500, 'rgba(255,160,120,1)', 0.35);
  }
  function far(t) {                                                 // город-руины вдали, Волга серая
    volga(1060, 1120, t, { sx: 900, seed: 22803, top: '#8a8a96', bot: '#3a4050', farBank: true, bank: '#3a3a44' });
    for (let k = 0; k < 9; k++) ruinBlock(-100 + k * 150, 1080, 120, 120 + (k * 53) % 140, t, { seed: 22804 + k, fire: 0, col: '#5a5458' });
    for (const x of [200, 760]) smokeCol(x, 960, t, { col: 'rgba(120,120,130,0.35)', h: 400, sz: 0.5, n: 5, wind: 60 });
  }
  function hill(t) {                                                // выжженный холм: темнеет на «чёрным»
    const b = sm((t - EV.bk_black) / 0.8), col = lerpC('#6a5a40', '#1e1a1a', b);
    kurgan(700, 1250, 1300, 330, { col, rim: 'rgba(255,140,110,1)', seed: 22805 });
    for (let i = 0; i < 14; i++) { const r = rng(22806 + i), x = 200 + r() * 1000, y = 1150 - r() * 120; pencil([[x, y], [x + 4, y - 40 - r() * 60]], { w: 5, col: '#14100e', pass2: false }); pencil([[x + 2, y - 40], [x + 20, y - 60]], { w: 3, col: '#14100e', pass2: false }); }   // обгоревшие пни
    for (const x of [640, 780]) { push(x, 960, 0.75); for (const sd of [-1, 1]) pencil([[sd * 30, 0], [sd * 20, -120]], { w: 5, col: L, pass2: false }); blob([[-46, -120], [-40, -190], [40, -194], [50, -120]], { wash: '#4a4644', washA: 1, w: 2, col: L }); for (let i = 0; i < 9; i++) { const r = rng(22807 + i + x); ell(-30 + r() * 60, -170 + r() * 40, 5, 5, { wash: '#d8a080', washA: 1, line: false }); } pop(); }
    for (let k = 0; k < 6; k++) { const x = 300 + k * 150, y = 1130 - Math.sin(k) * 40; soldier(x, y, 0.2, t, { seed: 800 + k, prop: 'stick', armR: 'hold', flip: k % 2 ? 1 : -1, body: k % 2 ? '#5a5a3a' : '#4a4a40' }); }   // сапёры с щупами
    if (b > 0) for (let i = 0; i < 20; i++) { const r = rng(22808 + i); ctx.fillStyle = `rgba(200,210,220,${0.5 * b})`; ctx.fillRect(250 + r() * 900, 1000 + r() * 220, 4, 2); }   // блёстки железа
  }
  function people(t) {                                              // у подножия: женщины разбирают кирпич, тачка, ведро, собака
    hills(1310, 10, '#2a2420', 22809, 1);
    rubble(80, 1330, 360, 22810, { n: 14 }); rubble(860, 1330, 300, 22811, { n: 10 });
    const P = [[180, '#6a3a3a', 'scarf', 'up'], [300, '#4a4a5a', 'scarf', 'hold'], [420, '#5a4a3a', 'scarf', 'up'], [900, '#3a4a3a', null, 'hold'], [1000, '#6a5a4a', 'scarf', 'up'], [1120, '#4a3a4a', 'cap', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1340 + (i % 2) * 8, 0.36, t, { body: c, legs: '#2a2420', hat: h || undefined, hatCol: '#c8b8a8', long: h === 'scarf' ? 1 : 0, seed: 820 + i, armR: Math.sin(t * 3 + i) > 0 ? a : 'hold', armL: 'hold', flip: i % 2 ? -1 : 1 }));
    for (let k = 0; k < 5; k++) rect(470 + k * 26, 1300 - (k % 2) * 16, 24, 14, { wash: '#9a4a3a', washA: 1, w: 1.2, col: L });   // штабель кирпича
    push(620, 1340, 0.5); rect(-60, -50, 120, 40, { wash: '#5a4a3a', washA: 1, w: 2, col: L }); ell(-40, -6, 18, 18, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pencil([[60, -40], [130, -70]], { w: 4, col: L, pass2: false }); pop();
    human(700, 1342, 0.36, t, { body: '#3a3a3a', legs: '#2a2420', hat: 'cap', hatCol: '#2a2a2a', beard: 1, seed: 830, armR: 'hold', armL: 'hold' });   // старик с тачкой
    dog(780, 1346, 0.24, t, { col: '#8a7a6a' });
  }
  function ground(t) {                                              // ближний план: чёрная земля с осколками, лужи талой воды, рамка 1 м²
    blackGround(1380, t, { col: '#24201e', craters: 7, shards: 300, seed: 22812 });
    for (const [x, y, rx] of [[620, 1700, 120], [1040, 1600, 90]]) { ell(x, y, rx, rx * 0.22, { wash: '#8a8a96', washA: 0.8, w: 1.4, col: '#4a4a50' }); pencil([[x - rx * 0.6, y - 4], [x + rx * 0.3, y - 6]], { w: 2, col: '#e8d8d0', a: 0.6, pass2: false }); }
    const fr = sm((t - EV.bk_shard + 0.1) / 0.3); if (fr > 0) { const x0 = 560, y0 = 1470, w = 300, h = 110;
      pencil([[x0, y0], [x0 + w * fr, y0], [x0 + w * fr, y0 + h], [x0, y0 + h], [x0, y0]], { w: 5, col: '#ffd890', pass2: false });
      const n = Math.round(60 * sm((t - EV.bk_shard) / 1.2)); for (let i = 0; i < n; i++) { const r = rng(22813 + i), fy = Math.min(1, (t - EV.bk_shard - i * 0.015) * 3); if (fy <= 0) continue; ctx.save(); ctx.translate(x0 + 10 + r() * (w - 20), lerp(y0 - 300, y0 + 10 + r() * (h - 20), fy)); ctx.rotate(r() * 3); ctx.fillStyle = r() < 0.3 ? '#c8d2dc' : '#6a6460'; ctx.fillRect(-6, -2, 12, 4); ctx.restore(); }
      txt('1 м²', x0 + w + 50, y0 + 50, 36, { col: '#ffd890', font: 'Osw' }); }
    for (const [x, y] of [[860, 1660], [960, 1700]]) { push(x, y, 0.7); blob([[-44, 0], [-40, -40], [0, -60], [40, -40], [44, 0]], { wash: '#4a5040', washA: 1, w: 2, col: L }); pop(); }   // каски
    push(1140, 1720, 0.8); blob([[-40, 0], [-44, -70], [44, -70], [40, 0]], { wash: '#6a6a6a', washA: 1, w: 2, col: L }); pencil(ellPts(0, -80, 40, 30, 0, 3.14, 20), { w: 3, col: L, pass2: false }); pop();   // ведро
    crate(420, 1740, 120, 70, { col: '#4a4030' });
    human(1010, 1620, 0.56, t, { body: '#5a3a3a', legs: '#2a2420', hat: 'scarf', hatCol: '#c8b8a8', long: 1, seed: 840, prop: 'stick', armR: Math.sin(t * 3) > 0 ? 'up' : 'hold', flip: -1 });   // женщина с лопатой
    human(1160, 1660, 0.5, t, { body: '#3a3a4a', legs: '#2a2420', hat: 'scarf', hatCol: '#a89888', long: 1, seed: 841, armL: 'hold', armR: 'hold', flip: -1 });
    rubble(760, 1820, 260, 22817, { n: 8 }); for (let k = 0; k < 4; k++) rect(880 + k * 30, 1760 - (k % 2) * 14, 28, 14, { wash: '#9a4a3a', washA: 1, w: 1.2, col: L }); barrel(1200, 1600, 0.5, '#3a3a3a');
    if (t > EV.bk_grass - 0.1) { const g = sm((t - EV.bk_grass + 0.1) / 0.4), dead = sm((t - EV.bk_no) / 0.4), x = 640, y = 1640;   // росток
      const c = lerpC('#6ac04a', '#1a1414', dead); push(x, y, 2.2); ctx.translate(-x, -y); pencil([[x, y], [x + 2, y - 50 * g]], { w: 4, col: c, pass2: false }); blob([[x, y - 40 * g], [x - 24 * g, y - 56 * g], [x - 6, y - 36 * g]], { wash: c, washA: 1, w: 1.4, col: L }); blob([[x + 2, y - 46 * g], [x + 26 * g, y - 64 * g], [x + 8, y - 40 * g]], { wash: c, washA: 1, w: 1.4, col: L }); if (dead < 1) glow(x, y - 40, 60, 'rgba(140,255,120,1)', 0.3 * (1 - dead)); pop(); }
  }
  function front(t) { for (const [x, h] of [[-90, 900], [1190, 760]]) { pencil([[x, 2100], [x + 10, 2100 - h]], { w: 34, col: '#14100e', pass2: false }); pencil([[x + 10, 2100 - h * 0.7], [x + 120, 2100 - h * 0.85]], { w: 12, col: '#14100e', pass2: false }); pencil([[x + 6, 2100 - h * 0.5], [x - 90, 2100 - h * 0.62]], { w: 10, col: '#14100e', pass2: false }); }   // обгоревшие стволы
    for (let i = 0; i < 8; i++) { const r = rng(22814 + i); ctx.fillStyle = '#5a5458'; ctx.fillRect(1100 + r() * 200, 1900 + r() * 200, 14, 6); } }
  function hud(t) {
    if (t > EV.bk_shard) { const q = popK(t, EV.bk_shard, 0.3), n = Math.round(1200 * sm((t - EV.bk_shard) / 1.0)); push(580, 800, q, -0.03); rect(-220, -56, 440, 112, { wash: '#14100a', washA: 0.88, w: 3, col: VG.steelL }); txt('до ' + n.toLocaleString('ru-RU') + ' / м²', 0, 12, 56, { col: '#e8eef6', font: 'Osw' }); pop(); }
    if (t > EV.bk_no) { const q = popK(t, EV.bk_no, 0.3); push(560, 930, q, 0.05); rect(-170, -40, 340, 80, { wash: '#2a3a2a', washA: 0.9, w: 3, col: '#9ad08a' }); txt('ТРАВА НЕ РОСЛА', 0, 10, 40, { col: '#d8f0d0', font: 'Osw' }); pop(); }
  }

  WORLD.black = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(8, () => hill(t));
    lay(4, () => people(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 0, 1300, 1700], '#8a8a90', t, 22815, { sp: 16, vx: 30, sz: 2.6, a: 0.4, wob: 18 });
    haze('#8a8a9a', 0.08);
  };
  DIR.black = {
    outfit: 'vatnik', light: { side: 1, rim: '#ffb0a0' }, grade: ['#5a5a6a', 0.18],
    act: () => [[S0.black, 'neutral'], [EV.bk_black, 'awe'], [EV.bk_shard, 'shock'], [EV.bk_grass, 'neutral'], [EV.bk_no, 'cold']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1540, s: 1.02, look: t < EV.bk_shard ? [0.6, -0.5] : t < EV.bk_grass ? [0.8, 0.2] : [0.5, 0.4], nod: t > EV.bk_no ? 0.1 : 0,
      point: t > EV.bk_shard && t < EV.bk_grass ? 1 : undefined, hand: t > EV.bk_shard && t < EV.bk_grass ? [230, -150] : undefined }),
    cam: () => [[S0.black, 620, 960, 0.12], [EV.bk_black, 640, 920, 0.04, 'x'], [EV.bk_shard, 560, 1100, 0.14], [EV.bk_grass, 480, 1160, 0.22], [S1.black, 520, 1100, 0.18]],
    hud
  };
  TRANS_IN.black = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // дождь стальных осколков: сыплется сверху, за ним проступает новая сцена
    const y = lerp(-200, 2200, sm(k));
    drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, H); ctx.clip(); drawBuf(A); ctx.restore();
      const r = rng(22816); for (let i = 0; i < 260; i++) { const x = r() * W, yy = y - r() * 600 + (t * 900 + r() * 400) % 120, s = 6 + r() * 16; ctx.save(); ctx.translate(x, yy); ctx.rotate(r() * 3); ctx.fillStyle = i % 4 ? '#5a6068' : '#d8e0ea'; ctx.fillRect(-s, -s / 3, s * 2, s * 0.6); ctx.restore(); }
      pencil([[0, y], [W, y]], { w: 6, col: '#c8d2dc', a: 0.7, pass2: false, gap: false }); });
  } };
})();
