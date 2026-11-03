/* 023 — сцена `answer` (ответ на хук): 1485, осада Твери войском Ивана III. Слева за рекой — тверской кремль с собором (зелёные стяги),
   справа — московский стан: шатры, красные стяги, пушки на лафетах, дым. Через реку переброшены мостки: по ним тянутся тверские
   бояре в шубах с сундуками — к Москве. На «Ответ» над рекой падает карточка-разгадка: печати Москвы и Орды связаны шнуром
   «ДРУЖБА», печать Твери — скрещённые мечи «ВОЙНА»; плашка-вопрос превращается в ответ; на «бояре» бояре оживают и идут,
   на «Москве.» на табло падает штамп «1485 — ИГРА ОКОНЧЕНА». Переход В сцену — сургуч: красные капли стекают сверху и затягивают кадр. */
(() => {
  EV.answer = wtk('a1', 'Ответ:');
  EV.an_horde = wtk('a1', 'Ордой,');
  EV.an_war = wtk('a1', 'воевала.');
  EV.an_boyars = wtk('a1', 'бояре');
  EV.an_end = wtk('a1', 'Москве.');
  KEYW.push('Ответ:', 'Ордой,', 'воевала.', 'бояре');
  SHAKES.push([EV.answer + 0.1, 0.2, 7], [EV.an_end + 0.1, 0.25, 9]);
  const L = TV.ink;
  function sky(t) { vgrad(-900, 1250, ['#3a4a6a', '#6a7a98', '#a8a8b0', '#d8c0a0', '#e8c890'], 1); glow(600, 1050, 600, 'rgba(255,200,140,1)', 0.35);
    clouds(t, -500, 6, '#5a6080', 23701, 0.6); clouds(t, 160, 4, '#b8a0a0', 23702, 0.5); birds(t, 10, [-100, -100, 1200, 700], 23703, '#16121a'); }
  function far(t) {                                                 // тверской кремль слева, московский стан справа, река между
    hills(1100, 26, '#4a5a4a', 23704, 1);
    palisade(-200, 520, 1110, 120, t, { col: '#7a5a3a', seed: 23705 });
    for (const [x, h] of [[-40, 200], [260, 240], [480, 190]]) woodTower(x, 1110, 90, h, t, { flag: TV.green, roof: '#3e6a4a' });
    sobor(180, 1060, 0.34, t);
    volga(1110, 1220, t, { sx: 600, seed: 23706, top: '#a8b8c8', bot: '#4a5a72', glint: '#ffe8c0', farBank: false });
    for (let i = 0; i < 6; i++) { const x = 700 + i * 100, y = 1100 + (i % 2) * 14; poly([[x - 60, y], [x, y - 120], [x + 60, y]], { wash: i % 2 ? '#c8302a' : '#f0e8d8', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.2, col: L, ang: 1.2 } }); pencil([[x, y - 120], [x, y - 160]], { w: 3, col: L, pass2: false }); const wv = Math.sin(t * 5 + i) * 6; shape([[x, y - 160], [x + 40, y - 150 + wv], [x, y - 138]], { wash: '#c8302a', washA: 1, w: 1.2, col: L }); }   // шатры стана
    smokeCol(1000, 1040, t, { col: 'rgba(200,200,210,0.45)', h: 400, sz: 0.5, n: 4 });
  }
  function bridge(t) {                                              // мостки через реку и бояре с сундуками идут к Москве
    for (let k = 0; k < 14; k++) { const x = 300 + k * 60; pencil([[x, 1250], [x, 1330]], { w: 6, col: '#4a3420', pass2: false }); }
    shape([[260, 1240], [1140, 1230], [1140, 1258], [260, 1268]], { wash: '#8a6440', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 30; k++) pencil([[270 + k * 29, 1242], [270 + k * 29, 1266]], { w: 1.4, col: '#3a2410', a: 0.6, pass2: false });
    const go = t > EV.an_boyars ? (t - EV.an_boyars) * 110 : 0;
    for (let k = 0; k < 6; k++) { const x = 320 + k * 110 + go; if (x > 1200) continue; human(x, 1246, 0.36, t, { body: ['#3a4a7a', '#5a3a5a', '#4a5a3a', '#7a5a2a', '#6a2a2a', '#3a5a6a'][k], legs: '#2a2020', long: 1, hat: 'fur', hatCol: '#2a1a10', beard: 1, seed: 2420 + k, walk: go > 0 ? t * 6 : 0, armR: 'hold' });
      rect(x + 14, 1150, 44, 32, { wash: '#7a4a2a', washA: 1, w: 1.6, col: L }); pencil([[x + 14, 1160], [x + 58, 1160]], { w: 2, col: TV.gold, pass2: false }); }
    if (t > EV.an_boyars) { const q = popK(t, EV.an_boyars, 0.3); push(560, 1150, q, -0.04); rect(-150, -30, 300, 60, { wash: '#16120c', washA: 0.86, w: 2.4, col: TV.gold }); txt('БОЯРЕ → МОСКВА', 0, 10, 32, { col: '#ffe8b8', font: 'Osw' }); pop(); }
  }
  function camp(t) {                                                // московские пушки и пушкари на ближнем правом берегу
    for (const [x, y] of [[900, 1400], [1100, 1420]]) cannon(x, y, 0.55, t, { flip: -1 });
    for (let k = 0; k < 5; k++) human(760 + k * 110, 1430 + (k % 2) * 8, 0.42, t, { body: '#8a2a2a', legs: '#2a2020', hat: k % 2 ? 'helmet' : 'fur', hatCol: '#6a6a6a', beard: 1, seed: 2430 + k, prop: k % 2 ? 'spear' : undefined, armR: 'hold', flip: -1 });
    for (const x of [1120, 1300]) { pencil([[x, 1440], [x, 1080]], { w: 6, col: '#2a1a10', pass2: false }); const wv = Math.sin(t * 4 + x) * 14; shape([[x, 1090], [x - 150, 1110 + wv], [x - 130, 1160 + wv], [x - 160, 1210 + wv], [x, 1200]], { wash: '#a8262a', washA: 1, w: 2, col: L }); }
    crowd(300, 700, 1420, 8, t, 23707, { s: 0.36, cols: ['#3a5a3a', '#e8dcb8', '#4a6a3a', '#a8c0d8', '#6a3a2a'] });   // тверичи на своём берегу
  }
  function ground(t) {                                              // берег: трава, пушечные ядра, бочки пороха, шатровые колья
    tvGround(1460, t, { seed: 23708, top: '#7a8a52', bot: '#3e4a2a', tufts: 50 });
    for (let k = 0; k < 6; k++) ell(900 + (k % 3) * 34, 1640 - Math.floor(k / 3) * 28, 16, 16, { wash: '#2a2a2a', washA: 1, w: 1.4, col: L });   // ядра
    barrel(1060, 1700, 0.5, '#4a3a2a'); barrel(1110, 1720, 0.46); txt('ЗЕЛЬЕ', 1080, 1650, 22, { col: '#f0d8a0', font: 'Osw' });
    sack(760, 1760, 0.55); crate(560, 1780, 120, 64); jug(480, 1800, 0.45); jug(1180, 1800, 0.4, '#5a6a8a');
    horse(640, 1660, 0.46, t, { col: '#e8e0d0', saddle: 1 });
    human(980, 1760, 0.58, t, { body: '#8a2a2a', legs: '#2a2020', hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 2440, prop: 'scroll', armR: 'hold', flip: -1, look: [-0.5, -0.4] });   // московский дьяк
    dog(420, 1860, 0.3, t, { col: '#8a6a4a' });
  }
  function front(t) {                                               // передний план: колёса лафета и камыш
    for (const x of [1180]) { pencil(ellPts(x, 1980, 150, 150, 0, 0.05, 40), { w: 18, col: '#4a3420', pass2: false }); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28 + 0.2; pencil([[x, 1980], [x + Math.cos(a) * 150, 1980 + Math.sin(a) * 150]], { w: 9, col: '#4a3420', pass2: false }); } }
    for (let i = 0; i < 10; i++) { const x = -40 + i * 24; pencil([[x, 2100], [x + Math.sin(t * 2 + i) * 14, 1760 - (i % 3) * 40]], { w: 5, col: '#5a6a3a', pass2: false }); ell(x + Math.sin(t * 2 + i) * 14, 1770 - (i % 3) * 40, 7, 24, { wash: '#6a4a2a', washA: 1, w: 1.2, col: L }); }
  }
  function hud(t) {
    if (t > EV.answer - 0.05 && t < EV.an_boyars + 0.2) { const q = popK(t, EV.answer - 0.05, 0.4), fade = 1 - sm((t - EV.an_boyars) / 0.2); push(700, 1000, q, 0.02); ctx.globalAlpha = fade;
      rect(-300, -150, 600, 300, { wash: '#efe0b8', washA: 0.97, w: 3, col: L, shade: { gap: 10, a: 0.1, col: '#a08a5a', ang: 0.2 } });
      seal(-200, -40, 56, t, { txt: 'М', col: '#a8262a' }); seal(-40, -40, 56, t, { txt: 'О', col: '#6a4a8a' }); pencil(spline([[-150, -30], [-120, 10], [-90, -30]], false, 8), { w: 5, col: TV.gold, pass2: false });
      txt('ДРУЖБА', -120, 70, 36, { col: '#7a1a12', font: 'Osw', a: fade }); txt('С ОРДОЙ', -120, 110, 26, { col: '#5a3a1e', font: 'Hand', a: fade });
      if (t > EV.an_war - 0.1) { const w = sm((t - EV.an_war + 0.1) / 0.3); seal(190, -40, 56, t, { txt: 'Т', col: '#2e6a3e' }); push(190, -40, w); pencil([[-60, -60], [60, 60]], { w: 7, col: '#c8c8c8', pass2: false }); pencil([[60, -60], [-60, 60]], { w: 7, col: '#c8c8c8', pass2: false }); pop();
        txt('ВОЙНА', 190, 70, 36, { col: '#1e4a2e', font: 'Osw', a: fade * w }); txt('с Ордой', 190, 110, 26, { col: '#5a3a1e', font: 'Hand', a: fade * w }); }
      ctx.globalAlpha = 1; pop(); }
    scoreHud(t, 4, 1);
    if (t > EV.an_end - 0.05) { const q = popK(t, EV.an_end - 0.05, 0.3); push(760, 770, 1.6 - 0.6 * q, -0.12); ctx.globalAlpha = q; rect(-230, -44, 460, 88, { wash: '#a8262a', washA: 0.92, w: 4, col: '#ffe8d8' }); txt('1485 — ИГРА ОКОНЧЕНА', 0, 12, 40, { col: '#ffe8d8', font: 'Osw' }); ctx.globalAlpha = 1; pop(); }
  }
  WORLD.answer = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(15, () => far(t));
    lay(6, () => bridge(t));
    lay(2.6, () => camp(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(36, [-200, 400, 1300, 1600], '#e8e0d0', t, 23709, { sp: -20, vx: 60, sz: 3, a: 0.4, wob: 24 });   // пороховой дым
    haze('#b8b0b8', 0.06);
  };
  DIR.answer = {
    outfit: 'armen', light: { side: 1, rim: '#ffd8a0' }, grade: ['#8a7a90', 0.12],
    act: () => [[S0.answer, 'talk'], [EV.answer, 'suspicious'], [EV.an_horde, 'sideeye'], [EV.an_war, 'proud'], [EV.an_boyars, 'annoyed'], [EV.an_end, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 260, y: 1600, s: 1.0, look: t < EV.an_boyars ? [0.7, -0.6] : [0.8, -0.4], tailUp: t > EV.an_war && t < EV.an_boyars,
      point: t > EV.answer && t < EV.an_war ? 1 : undefined, hand: t > EV.answer && t < EV.an_war ? [260, -420] : t > EV.an_boyars ? [240, -260] : undefined }),
    cam: () => [[S0.answer, 620, 940, 0.12], [EV.answer, 660, 960, 0.06, 'x'], [EV.an_boyars, 700, 1000, 0.1], [EV.an_end, 680, 940, 0.06, 'x'], [S1.answer, 660, 960, 0.1]],
    hud
  };
  TRANS_IN.answer = { a: 0.2, b: 0.4, fx(k, t, A, B) {             // сургуч: красные капли стекают сверху, сливаются и открывают 1485
    drawBuf(A); const r = rng(23710);
    scr(() => { ctx.save(); ctx.beginPath(); for (let i = 0; i < 14; i++) { const x = i * 80 + 10, sp = 0.7 + r() * 0.6, len = Math.pow(sm(k), 1.2) * H * 1.4 * sp, w = 46 + r() * 30; ctx.rect(x - w / 2, -10, w + 30, len); ctx.moveTo(x + w / 2, len); ctx.arc(x, len, w / 2 + 10, 0, 6.3); }
      if (k > 0.7) ctx.rect(0, 0, W, H * sm((k - 0.7) / 0.3)); ctx.clip(); drawBuf(B);
      ctx.globalAlpha = 0.35 * (1 - sm((k - 0.6) / 0.4)); ctx.fillStyle = '#a8262a'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
