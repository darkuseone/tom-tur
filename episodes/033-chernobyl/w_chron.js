/* 033 — сцена `chron`, 1193. Утро над Припятью: высокий берег, деревянный детинец с частоколом и вежей, хаты под соломой с дымом,
   лодки-долблёнки, туман над рекой. Главный свет — низкое солнце слева сквозь туман (тёплые лучи, тени вправо).
   На «Тысяча…» разворачивается свиток летописи «ЧЕРНОБЫЛЬ · 1193»; на «князь» въезжает князь на коне с ловчими, гончими и сокольником,
   трубит рог; на «полынь» Том (в княжьем кафтане) срывает кустик полыни у указателя и нюхает — морщится. Указатель — берестяная доска. */
(() => {
  const L = CH.ink, SUN = [120, 640];
  EV.ch_year = wtk('s1', 'Тысяча'); EV.ch_prince = wtk('s1', 'князь.'); EV.ch_weed = wtk('s1', 'сорняк-полынь.');
  KEYW.push('князь.', 'сорняк-полынь.');
  function dog(x, y, s, t, col, seed) { push(x, y, s); const ph = t * 10 + seed; for (const [lx, d] of [[-30, 0], [-18, 1], [26, 1], [38, 0]]) pencil([[lx, -40], [lx + Math.sin(ph + d * 3) * 10, 0]], { w: 6, col: '#3a2a1e', pass2: false });
    blob([[-44, -46], [-30, -66], [30, -68], [50, -54], [40, -38], [-36, -36]], { wash: col, washA: 1, w: 2, col: L }); blob([[40, -60], [62, -80], [84, -72], [78, -58], [52, -52]], { wash: col, washA: 1, w: 1.8, col: L });
    blob([[56, -78], [60, -96], [68, -78]], { wash: '#4a2a1a', washA: 1, w: 1.4, col: L }); pencil([[-44, -56], [-66, -76 + Math.sin(ph) * 8]], { w: 5, col, pass2: false }); pop(); }
  function rider(x, y, s, t, o) { horse(x, y, s, t, { col: o.horse || '#6a3a22', walk: o.walk, seed: o.seed, flip: o.flip }); human(x - 10 * s * (o.flip || 1), y - 96 * s, s * 0.82, t, o.man); }
  function sky(t) { vgrad(-900, 1100, ['#6a9ad0', '#b8d4e8', '#f8e6c0', '#f8d098'], 1); glow(SUN[0], SUN[1], 230, 'rgba(255,226,160,1)', 0.45); ell(SUN[0], SUN[1], 54, 54, { wash: '#fff8dc', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(5300 + i), y = 300 + i * 80, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + dx + r() * 100, y - 26], [900 + dx, y - 8], [1300, y + 10], [400, y + 20]], { wash: '#fff4e2', washA: 0.5, line: false }); }
    for (let i = 0; i < 6; i++) { const x = 600 + i * 70 + Math.sin(t + i) * 20, y = 430 + (i % 3) * 24; pencil([[x - 10, y - Math.sin(t * 10 + i) * 5], [x, y], [x + 10, y - Math.sin(t * 10 + i) * 5]], { w: 2.6, col: '#2a2a30', pass2: false }); } }
  function farBank(t) { hills(1000, 40, '#5a7a5a', 1.7); for (let i = 0; i < 18; i++) { const r = rng(5310 + i); polPine(-200 + i * 80 + r() * 40, 1010, 150 + r() * 80, t, 30 + i, { col: '#3a5a42', colD: '#2a4434' }); }
    river(1010, 1120, t, { col: '#5aa0b0', colD: '#2a6a80' }); for (let i = 0; i < 5; i++) { const x = ((t * 14 + i * 300) % 1700) - 300; ell(x, 1060 + (i % 2) * 20, 220, 20, { wash: '#f8f4ea', washA: 0.4, line: false }); }
    push(300 + (t * 12) % 300, 1080, 0.6); blob([[-90, 0], [-70, 16], [70, 16], [90, 0]], { wash: CH.woodD, washA: 1, w: 2, col: L }); human(0, 4, 0.6, t, { body: '#8a6a4a', hat: 'fur', hatCol: '#4a3020', legs: '#3a2a1a', armR: 'hold', prop: 'oar', seed: 5320 }); pop();
    push(820, 1100, 0.5); blob([[-80, 0], [-60, 14], [60, 14], [80, 0]], { wash: CH.woodD, washA: 1, w: 2, col: L }); human(-20, 4, 0.6, t, { body: '#a87a4a', legs: '#3a2a1a', armR: 'hold', prop: 'oar', flip: -1, seed: 5321 }); pencil([[40, 0], [80, -30]], { w: 2, col: '#5a4a3a', pass2: false }); pop();
    depthFog('#f8ecd8', 0.07); }
  function fort(t) {                                                // детинец: частокол, вежа, ворота, хаты, дым
    for (let x = 380; x < 1300; x += 26) poly([[x, 1150], [x, 940 - (x % 52 ? 0 : 10)], [x + 12, 920], [x + 24, 940], [x + 24, 1150]], { wash: x % 52 ? CH.woodL : CH.wood, washA: 1, w: 1.4, col: L });
    push(700, 1150, 1); rect(-70, -340, 140, 340, { wash: CH.wood, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.3, col: CH.woodD, ang: 0 } }); poly([[-100, -340], [0, -440], [100, -340]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: '#2a1a0a', ang: 1 } });
    rect(-40, -300, 80, 50, { wash: '#2a1a10', washA: 1, w: 1.6, col: L }); human(0, -250, 0.45, t, { body: '#7a3a2a', hat: 'helmet', legs: '#3a2a1a', armR: 'hold', prop: 'spear', seed: 5330 }); rect(-50, -120, 100, 120, { wash: '#3a2412', washA: 1, w: 2, col: L }); pop();
    push(1080, 1150, 1); poly([[-60, -280], [0, -380], [60, -280]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-50, -280, 100, 280, { wash: CH.woodL, washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.25, col: CH.woodD, ang: 0 } }); pop();
    khata(160, 1150, 230, 140, t, { log: 1, wall: CH.woodL, roof: CH.thatch, smoke: 1, win: 1, trim: '#7a3a2a' }); khata(-120, 1160, 200, 120, t, { log: 1, wall: '#b8824a', roof: '#b89048', win: 1, trim: '#5a2a1a', smoke: 1 });
    for (let i = 0; i < 3; i++) human(40 + i * 90, 1170, 0.5, t, { body: ['#c8b89a', '#a83a2a', '#e8e0c8'][i], hat: ['scarf', 'fur', null][i], hatCol: '#c83a2a', legs: '#5a4a3a', armR: i === 1 ? 'wave' : 'hold', long: i !== 1 ? 1 : undefined, seed: 5340 + i, face: t > EV.ch_prince ? 'shock' : 'smile' });
    depthFog('#f8ecd8', 0.04); }
  function hunt(t) {                                                // княжья охота: князь на коне, ловчие, гончие, сокольник
    rect(-600, 1160, 2400, 1200, { wash: '#86a848', washA: 1, w: 2, col: L, shade: { gap: 13, a: 0.1, col: '#3a5a1a', ang: 0.3 } }); const rr = rng(5372); for (let i = 0; i < 40; i++) { const x = rr() * 1900 - 400, y = 1180 + rr() * 300; pencil([[x, y], [x + 3, y - 16]], { w: 2, col: '#4a7a2a', pass2: false }); }
    const k = sm(clamp((t - EV.ch_prince + 0.4) / 1.4)), px = lerp(1350, 780, k), walk = k > 0 && k < 1;
    rider(px, 1330, 0.95, t, { horse: '#f0ece2', walk, seed: 1, flip: -1, man: { body: '#a8281e', bodyD: '#5a0a08', hat: 'crown', hatCol: '#d8a838', legs: '#3a2a4a', armR: 'wave', flip: -1, seed: 5350, face: 'grin', boots: 1 } });
    rider(px + 300, 1320, 0.85, t, { horse: '#6a3a22', walk, seed: 2, flip: -1, man: { body: '#3a5a8a', hat: 'fur', hatCol: '#5a3a1a', legs: '#3a2a1a', armR: 'hold', prop: 'spear', flip: -1, seed: 5351 } });
    for (let i = 0; i < 4; i++) dog(px - 220 - i * 90 + Math.sin(t * 3 + i) * 20, 1350 + (i % 2) * 20, 0.9, t, ['#c89a5a', '#f0e8d8', '#6a4a2a', '#c89a5a'][i], i);
    human(560, 1340, 0.75, t, { body: '#5a6a3a', hat: 'fur', hatCol: '#4a3020', legs: '#3a2a1a', armR: 'wave', flip: -1, seed: 5360, face: 'grin' }); push(560 - 40, 1340 - 330 * 0.75, 0.75); blob([[-20, 0], [-10, -26], [12, -30], [24, -10], [6, 6]], { wash: '#7a5a3a', washA: 1, w: 1.6, col: L }); ell(14, -26, 5, 5, { wash: '#f8d030', washA: 1, line: false }); pop();
    if (t > EV.ch_prince) { const a = clamp((t - EV.ch_prince) / 0.8); push(px - 40, 1330 - 290 * 0.95, 1, -0.4); poly([[0, 0], [70, -20], [90, -6], [70, 10]], { wash: '#e8d8a8', washA: 1, w: 2, col: L }); pop();
      for (let i = 0; i < 3; i++) pencil(ellPts(px - 120, 1330 - 300, 30 + i * 30 + a * 40, 20 + i * 20, 0, 0.4, 20).slice(8, 18), { w: 3, col: '#fff6e0', a: 1 - a, pass2: false }); }
    human(1180, 1360, 0.75, t, { body: '#8a5a3a', hat: 'fur', hatCol: '#3a2010', legs: '#3a2a1a', armR: 'hold', prop: 'axe', flip: -1, seed: 5361 });
  }
  function ground(t) {                                              // луг на высоком берегу: трава, полынь, кочки, тропа, корзина, указатель
    rect(-500, 1540, 2200, 900, { wash: '#7aa040', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.1, col: '#3a5a1a', ang: 0.3 } });
    poly([[200, 2300], [380, 1600], [520, 1540], [620, 1540], [560, 1600], [520, 2300]], { wash: '#b8925a', washA: 1, w: 1.6, col: L }); const r = rng(5370);
    for (let i = 0; i < 90; i++) { const x = r() * 1900 - 400, y = 1560 + r() * 600, h = 14 + r() * 30, c = i % 3 ? '#3e6a22' : '#9ac050'; pencil([[x - 6, y], [x - 3, y - h]], { w: 2.4, col: c, pass2: false }); pencil([[x + 4, y], [x + 7, y - h * 1.1]], { w: 2.4, col: c, pass2: false }); if (i % 9 === 0) ell(x, y - h, 6, 6, { wash: i % 2 ? '#e8e0f0' : '#f0c030', washA: 1, w: 1, col: L }); }
    for (let i = 0; i < 6; i++) mugwort(-120 + i * 70 + (i > 2 ? 820 : 0), 1700 + (i % 3) * 60, 0.9 + (i % 2) * 0.2, t, 60 + i);
    roadSign(150, 1460, 0.95, t, 'chron');
    push(860, 1720, 1); blob([[-60, 0], [-56, -50], [56, -50], [60, 0]], { wash: '#c89a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#6a4a1a', ang: 0.8 } }); pencil([[-50, -50], [0, -110], [50, -50]], { w: 5, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 4; q++) ell(-30 + q * 20, -56, 12, 9, { wash: '#a8281e', washA: 1, w: 1, col: L }); pop();
    push(1010, 1640, 1); ell(0, 0, 60, 18, { wash: '#7a6a5a', washA: 1, w: 2, col: L }); pencil([[-40, -6], [40, -6]], { w: 6, col: '#4a3a2a', pass2: false }); pop();
    lightPool(SUN[0] + 400, 1600, 900, 200, 'rgba(255,224,150,1)', 0.32); castShadow(420, 1680, 110, 540, 0.25, 0.3); moodDark(1000, 900, 900, 1900, '#1a2a10', 0.16);
  }
  function front(t) { for (const x of [-150, 1240]) { poly([[x - 26, 2400], [x - 16, 100], [x + 16, 100], [x + 26, 2400]], { wash: CH.birch, washA: 1, w: 2, col: L }); const r = rng(5385 + x); for (let i = 0; i < 16; i++) { const yy = 200 + r() * 2000; pencil([[x - 22, yy], [x + 4 + r() * 14, yy - 4]], { w: 4, col: '#2a2420', pass2: false }); }
    for (let i = 0; i < 5; i++) ell(x + (r() - 0.5) * 160, 120 + r() * 160, 90, 60, { wash: i % 2 ? '#88b048' : '#4a7a2a', washA: 1, w: 1.4, col: '#2a3a1a' }); } reeds(-200, 120, 2000, t, 5380); reeds(980, 1300, 2000, t, 5381); }
  function scroll(t) { if (t < EV.ch_year || t > EV.ch_prince + 0.6) return; const k = popK(t, EV.ch_year, 0.35), op = sm(clamp((t - EV.ch_year) / 0.6));
    push(720, 1080, k * 0.8, -0.03); rect(-260 * op, -110, 520 * op, 220, { wash: '#f0e0b8', washA: 1, w: 3, col: L, shade: { gap: 9, a: 0.12, col: '#8a6a3a', ang: 0.2 } }); for (const d of [-1, 1]) ell(d * 260 * op, 0, 22, 120, { wash: '#c8a868', washA: 1, w: 2.4, col: L });
    if (op > 0.6) { txt('ЛЕТОПИСЬ · 1193', 0, -56, 40, { col: '#5a2a10', font: 'Osw' }); txt('…въ Чернобыли…', 0, 6, 46, { col: '#7a1a10', font: 'Hand' }); txt('княжеская охота', 0, 62, 34, { col: '#5a3a20', font: 'Hand' }); } pop(); }
  WORLD.chron = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => farBank(t)); lay(6.5, () => fort(t)); lay(2.6, () => hunt(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(3, () => { rays(SUN[0], SUN[1], 0.5, 0.5, 1400, 'rgba(255,230,170,1)', 0.14, 6, t); motes(20, [-100, 800, 1200, 1700], '#fff2c0', t, 5390, { sp: 2, sz: 2.4, a: 0.45, wob: 14, add: 1 }); });
    lay(1, () => scroll(t));
  };
  DIR.chron = {
    outfit: 'knyaz', light: { side: -1, rim: '#ffd890' }, grade: ['#3a2a10', 0.05],
    act: () => [[S0.chron, 'awe'], [EV.ch_year, 'proud'], [EV.ch_prince, 'grin'], [EV.ch_weed - 0.2, 'smug'], [EV.ch_weed + 0.3, 'annoyed'], [EV.ch_weed + 0.9, 'sideeye']],
    pose: (t, u, b) => { const pick = t > EV.ch_weed - 0.2, sniff = t > EV.ch_weed + 0.2;
      return Object.assign(b, { x: 300, y: 1700, s: 1.0, look: t < EV.ch_prince ? [0.3, -0.5] : t < EV.ch_weed ? [0.8, -0.2] : [-0.2, -0.3], hand: sniff ? [60, -330] : pick ? [-130, -150] : [140, -300], point: t > EV.ch_prince && t < EV.ch_weed - 0.3, squash: pick && !sniff ? 0.05 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.ch_weed + 0.05) mugwort(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s + 20, 0.4, t, 77, {}); },
    cam: () => [[S0.chron, 560, 1020, -0.04], [EV.ch_year, 580, 1000, 0], [EV.ch_prince, 640, 1040, -0.02, 'x'], [EV.ch_weed, 420, 1160, 0.14, 'x'], [S1.chron, 400, 1180, 0.18]]
  };
  TRANS_IN.chron = { a: 0, b: 0.35, fx(k, t, A, B) { drawBuf(B, 1.08 - 0.08 * sm(k)); whiteOut(1 - sm(k), '255,248,224'); } };
})();
