/* 036 — сцена `reforms`, 1860–1863. Зал сейма в Хельсинки (Рыцарский дом): сословия на скамьях, Александр II в мундире открывает
   сейм, на столе — свежие финские марки (монеты и банкноты), учитель у доски с финским букварём, газетчик с финской газетой.
   Главный свет — большие окна справа + люстра. На «сейм» — двери зала распахиваются, депутаты встают; на «марку» в лапу Тома
   (мундир) падает монета «1 MARKKA» (звон), плашка «1860 МАРКА · 1863 СЕЙМ · 1863 ФИНСКИЙ ЯЗЫК»; на «языку» на доске пишется
   «SUOMI · ФИНСКИЙ». */
(() => {
  const L = FIC.ink, WIN = [1000, 620];
  EV.rf_sejm = wtk('s4', 'сейм,'); EV.rf_mark = wtk('s4', 'марку'); EV.rf_lang = wtk('s4', 'языку.');
  KEYW.push('сейм,', 'языку.');
  function hall(t) {                                                // стены, окна, люстра, портрет, доска
    rect(-600, 200, 2400, 1300, { wash: '#d8c8a8', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#8a7a5a', ang: 1.4 } }); vgrad(200, 1400, ['#8a7a5a', '#d8c8a8', '#c8b898'], 0.5);
    for (let i = 0; i < 2; i++) { push(900 + i * 260, 680, 1); rect(-90, -320, 180, 460, { wash: '#c8dcf0', washA: 1, w: 3, col: L }); for (let q = 0; q < 3; q++) pencil([[-90, -320 + q * 150], [90, -320 + q * 150]], { w: 3, col: L, pass2: false }); pencil([[0, -320], [0, 140]], { w: 3, col: L, pass2: false }); pop(); }
    push(540, 330, 1); pencil([[0, -130], [0, 0]], { w: 3, col: '#d8b040', pass2: false }); ell(0, 0, 130, 30, { wash: false, w: 5, col: '#d8b040' }); for (let i = 0; i < 8; i++) { const cx = -110 + i * 31; pencil([[cx, -4], [cx, -32]], { w: 6, col: '#f4efe4', pass2: false }); blob([[cx - 4, -32], [cx, -46 - Math.sin(t * 9 + i) * 3], [cx + 4, -32]], { wash: '#ffd060', washA: 1, line: false }); } glow(0, -30, 130, 'rgba(255,214,140,1)', 0.25); pop();
    push(280, 760, 1); rect(-190, -170, 380, 300, { wash: '#2a3a2a', washA: 1, w: 5, col: '#6a4a2a' }); const f = clamp((t - EV.rf_lang) / 0.8); txt('SUOMI', 0, -70, 70, { col: '#f4f4f0', font: 'Hand', reveal: f }); txt('финский язык', 0, 20, 44, { col: '#e8e8c8', font: 'Hand', reveal: f }); pop();
    push(620, 640, 1); rect(-90, -120, 180, 240, { wash: '#6a4a2a', washA: 1, w: 4, col: '#d8b040' }); ell(0, -30, 40, 50, { wash: '#c8a888', washA: 1, w: 1.6, col: L }); rect(-50, 20, 100, 90, { wash: '#1a3a2a', washA: 1, w: 1.4, col: L }); pop();
  }
  function people(t) {                                              // скамьи сословий, император, учитель
    const up = t > EV.rf_sejm; for (let r = 0; r < 2; r++) { rect(-200, 1140 + r * 60, 1500, 24, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); }
    const P = [[-60, '#1a1a1e', 'brim'], [40, '#3a2a2a', null], [140, '#1a1a1e', 'hood'], [760, '#5a4a3a', 'fur'], [860, '#1a1a1e', null], [960, '#3a3a44', 'brim'], [1060, '#6a5a3a', 'fur']];
    P.forEach(([x, c, h], i) => human(x, 1170 - (up ? 16 : 0), 0.66, t, { body: c, hat: h, hatCol: '#2a2a2a', legs: '#2a2a2a', long: h === 'hood' ? 1 : undefined, armR: up && i % 2 ? 'wave' : 'hold', flip: x > 540 ? -1 : 1, seed: 11700 + i, face: up ? 'grin' : 'calm', beard: i % 3 === 0 ? 1 : undefined }));
    push(520, 1200, 0.75); human(0, 0, 1, t, { body: '#1a3a2a', bodyD: '#0a1a10', legs: '#f4f4f0', armR: up ? 'wave' : 'hold', seed: 11710, face: 'smile', beard: 1 }); rect(-40, -210, 80, 14, { wash: '#d8b040', washA: 1, line: false }); pop();
    push(360, 1200, 0.7); human(0, 0, 1, t, { body: '#4a3a2a', hat: null, legs: '#2a2a2a', armR: 'wave', seed: 11711, face: 'smile' }); pencil([[40, -230], [120, -320]], { w: 4, col: '#d8c8a0', pass2: false }); pop();
  }
  function floor_(t) { rect(-500, 1330, 2200, 1000, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) for (let j = 0; j < 8; j++) pencil([[-400 + i * 80 + (j % 2) * 40, 1350 + j * 80], [-360 + i * 80 + (j % 2) * 40, 1390 + j * 80]], { w: 2, col: '#5a3a1a', a: 0.5, pass2: false });
    push(840, 1640, 1); rect(-170, -100, 340, 100, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-180, -116, 360, 18, { wash: '#2a5a3a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 6; q++) ell(-130 + q * 46, -126, 18, 7, { wash: '#d8b040', washA: 1, w: 1.2, col: L }); for (let q = 0; q < 3; q++) rect(-150 + q * 60, -150 - q * 6, 90, 40, { wash: '#c8a878', washA: 1, w: 1.2, col: L }); pop();
    push(-40, 1700, 1); rect(-60, -80, 120, 80, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-50, -96 - q * 16, 100, 14, { wash: ['#e8dcc0', '#c8b490', '#f0e8d0'][q], washA: 1, w: 1, col: L }); pop();
    lightPool(WIN[0] - 300, 1600, 900, 200, 'rgba(255,240,210,1)', 0.28); castShadow(400, 1700, 110, 460, 2.5, 0.3); moodDark(100, 1000, 800, 1900, '#1a1008', 0.18); }
  function extras(t) { push(1180, 1520, 0.9); human(0, 0, 1, t, { body: '#5a4a3a', hat: 'cap', hatCol: '#3a3a3a', legs: '#2a2a2a', armR: 'wave', flip: -1, seed: 11720, face: 'grin' }); rect(-80, -190, 70, 50, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); txt('Suometar', -45, -170, 14, { col: L, font: 'Osw' }); pop();
    for (let i = 0; i < 2; i++) human(-60 + i * 70, 1540, 0.55, t, { body: ['#3a6aa8', '#c84a3a'][i], legs: '#2a2a36', armR: 'hold', prop: 'scroll', seed: 11721 + i, face: 'smile' }); }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 70, 300, 140, 2100, { wash: '#c8b898', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.15, col: '#8a7a60', ang: 0 } }); rect(x - 90, 280, 180, 40, { wash: '#d8b040', washA: 1, w: 2, col: L }); } }
  function extras2(t) {                                             // напольные часы, глобус, кресло, кипы законов
    push(1180, 1500, 0.85); rect(-50, -380, 100, 380, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); ell(0, -320, 36, 36, { wash: '#f4efe4', washA: 1, w: 2, col: L }); pencil([[0, -320], [Math.sin(t * 0.5) * 26, -320 - Math.cos(t * 0.5) * 26]], { w: 3, col: L, pass2: false }); pencil([[0, -200], [Math.sin(t * 3) * 20, -110]], { w: 3, col: '#d8b040', pass2: false }); pop();
    push(-60, 1540, 0.85); pencil([[0, 0], [0, -120]], { w: 6, col: '#5a3a1a', pass2: false }); ell(0, -170, 60, 60, { wash: '#c8b890', washA: 1, w: 2, col: L }); pencil(ellPts(0, -170, 30, 60, 0, 0, 20), { w: 2, col: L, pass2: false }); pop();
    for (let i = 0; i < 3; i++) { push(1020 + i * 60, 1580, 0.8); for (let q = 0; q < 4; q++) rect(-30, -16 - q * 16, 60, 14, { wash: ['#e8dcc0', '#8a2a2a', '#c8b490', '#2a4a7a'][q], washA: 1, w: 1, col: L }); pop(); }
    for (let i = 0; i < 3; i++) { push(-60 + i * 620, 560, 0.9); rect(-90, -120, 180, 240, { wash: '#6a4a2a', washA: 1, w: 4, col: '#d8b040' }); ell(0, -30, 40, 50, { wash: '#c8a888', washA: 1, w: 1.6, col: L }); rect(-50, 20, 100, 90, { wash: ['#1a3a2a', '#3a2a4a', '#2a2a3a'][i], washA: 1, w: 1.4, col: L }); pop(); }
    for (let i = 0; i < 4; i++) { push(300 + i * 150, 1600, 0.8); rect(-40, -100, 80, 16, { wash: '#8a2a1a', washA: 1, w: 1.6, col: L }); rect(-40, -170, 12, 170, { wash: '#5a3a1a', washA: 1, w: 1.4, col: L }); for (const k of [-34, 34]) pencil([[k, -84], [k, 0]], { w: 5, col: '#5a3a1a', pass2: false }); pop(); }
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 2; i++) { push(-100 + i * 1380, 1500, 0.8); pencil([[0, 0], [0, -420]], { w: 7, col: '#2a2a2e', pass2: false }); pencil([[0, -420], [50, -440]], { w: 5, col: '#2a2a2e', pass2: false }); rect(30, -470, 50, 56, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(55, -440, 50, 'rgba(255,210,130,1)', 0.3); ell(55, -476, 30, 8, { wash: '#ffffff', washA: 0.9, line: false }); pop(); }
  }
  WORLD.reforms = (t, u, cat) => {
    lay(40, () => hall(t)); lay(3, () => people(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { floor_(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => { rays(WIN[0], WIN[1], 2.5, 0.3, 1400, 'rgba(255,240,210,1)', 0.12, 5, t); motes(14, [-100, 500, 1200, 1500], '#fff0c8', t, 11730, { sp: 1, sz: 2.4, a: 0.4, wob: 12, add: 1 }); });
  };
  DIR.reforms = {
    outfit: 'hussar', light: { side: 1, rim: '#fff0d0' }, grade: ['#2a1a10', 0.04],
    act: () => [[S0.reforms, 'smug'], [EV.rf_sejm, 'awe'], [EV.rf_mark, 'grin'], [EV.rf_lang, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1720, s: 0.95, look: [0.5, -0.4], hand: t > EV.rf_mark ? [170, -280] : [150, -300], prop: t > EV.rf_mark ? 'coin' : undefined, squash: t > EV.rf_mark && t < EV.rf_mark + 0.2 ? 0.05 : b.squash }),
    hud: t => fiBoard(640, 1000, 0.8, t, EV.rf_mark, [['1860 · МАРКА', 46, '#ffe08a'], ['1863 · СЕЙМ', 46], ['1863 · ФИНСКИЙ ЯЗЫК', 46]], { w: 520 }),
    cam: () => [[S0.reforms, 600, 980, -0.08], [EV.rf_sejm, 560, 960, -0.04], [EV.rf_mark, 460, 1120, 0.06, 'x'], [S1.reforms, 480, 1100, 0.06]]
  };
  TRANS_IN.reforms = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); const r = rng(11740); for (let i = 0; i < 14; i++) { push(r() * W, (r() * H - (1 - e) * 600 + H) % H, 1.6, r() * 6); ell(0, 0, 26, 26, { wash: '#d8b040', washA: Math.sin(e * Math.PI), w: 2, col: L, a: Math.sin(e * Math.PI) }); pop(); } }); } };
})();
