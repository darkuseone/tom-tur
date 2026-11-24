/* 033 — сцена `build`, 1970. Зимняя стройка ЧАЭС (февраль 1970 — основана Припять): снег, башенные краны, недостроенный
   реакторный корпус в лесах, бетоновозы, бытовки, костёр-бочка, рабочие в ватниках, синий указатель «ЧЕРНОБЫЛЬ / ЧАЭС 15 →».
   Главный свет — низкое зимнее солнце справа (розовато-золотое), холодные синие тени влево, тёплый прожектор на кране.
   На «семидесятом» — Том (в ватнике) разворачивает чертёж; на «станцию» кран опускает бетонный блок на корпус (глухой удар), плашка
   «1970 · СТРОЙКА ЧАЭС + ГОРОД ПРИПЯТЬ». Переход в сцену — бетон из ковша заливает кадр сверху. */
(() => {
  const L = CH.ink, SUN = [930, 560];
  EV.bd_70 = wtk('s3', 'семидесятом'); EV.bd_npp = wtk('s3', 'станцию.'); EV.bd_land = EV.bd_npp + 0.45;
  KEYW.push('станцию.');
  function sky(t) { vgrad(-900, 1100, ['#5a7ab8', '#a8b8d8', '#f0d0c0', '#f8c8a0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,220,180,1)', 0.4); ell(SUN[0], SUN[1], 46, 46, { wash: '#fff2dc', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(5500 + i), y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx + r() * 100, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#f4f0f4', washA: 0.5, line: false }); } }
  function far(t) { hills(1020, 20, '#c8d0dc', 1.3); for (let i = 0; i < 16; i++) { const r = rng(5510 + i); polPine(-200 + i * 90 + r() * 40, 1040, 160 + r() * 70, t, 50 + i, { col: '#3a4a4a', colD: '#2a3434' }); push(-200 + i * 90 + r() * 40, 1040 - 120, 1); ell(0, 0, 40, 10, { wash: '#f4f6fa', washA: 0.9, line: false }); pop(); }
    panel16(1040, 1050, 200, 220, t, { col: '#d8d4cc', lit: 0.1 }); for (let i = 0; i < 2; i++) { push(860 + i * 70, 1050, 1); pencil([[0, 0], [0, -380]], { w: 5, col: '#c8281e', pass2: false }); pencil([[-120, -360], [80, -360]], { w: 4, col: '#c8281e', pass2: false }); pop(); }
    txt('ПРИПЯТЬ · СТРОИТСЯ', 1000, 790, 26, { col: '#5a5a70', font: 'Osw' }); depthFog('#e8e4f0', 0.08); }
  function crane(x, base, h, t, o = {}) {                            // башенный кран: решётчатая мачта, стрела, противовес, крюк, прожектор
    const c = o.col || '#e8b030', boom = h * 0.9, sw = o.sw || 0; push(x, base, 1);
    for (const d of [-1, 1]) pencil([[d * 22, 0], [d * 22, -h]], { w: 5, col: c, pass2: false }); for (let i = 0; i < h / 50; i++) pencil([[-22, -i * 50], [22, -i * 50 - 50]], { w: 2.4, col: c, pass2: false });
    rect(-40, -h - 50, 80, 50, { wash: '#4a6a8a', washA: 1, w: 2, col: L }); push(0, -h - 20, 1, sw); pencil([[-boom * 0.35, 0], [boom, 0]], { w: 8, col: c, pass2: false }); pencil([[0, -90], [boom * 0.9, 0]], { w: 2, col: '#3a3a3a', pass2: false }); pencil([[0, -90], [-boom * 0.35, 0]], { w: 2, col: '#3a3a3a', pass2: false });
    rect(-boom * 0.35, 0, 90, 50, { wash: '#6a6a70', washA: 1, w: 2, col: L }); pop();
    if (o.light) glow(0, -h - 30, 30, 'rgba(255,230,160,1)', 0.35);
    pop();
  }
  function site(t) {                                                // недостроенный корпус в лесах, краны, бетонный блок, люди, машины
    const L1 = EV.bd_land, drop = sm(clamp((t - EV.bd_npp + 0.4) / 0.85)), by = lerp(700, 860, drop);
    push(640, 1220, 1); rect(-300, -420, 600, 420, { wash: CH.concrete, washA: 1, w: 2.6, col: L, shade: { gap: 13, a: 0.12, col: CH.concD, ang: 1.5 } });
    for (let i = 0; i < 7; i++) pencil([[-300, -i * 60], [300, -i * 60]], { w: 1.6, col: CH.concD, a: 0.5, pass2: false }); for (let i = 0; i < 6; i++) rect(-260 + i * 90, -380, 50, 70, { wash: '#2a3a4a', washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 8; i++) pencil([[-330 + i * 90, 0], [-330 + i * 90, -460]], { w: 3, col: '#8a6a3a', pass2: false }); for (let i = 0; i < 6; i++) pencil([[-330, -i * 80], [300, -i * 80]], { w: 2.4, col: '#8a6a3a', pass2: false });
    for (let i = 0; i < 10; i++) pencil([[-300 + i * 64, -420], [-300 + i * 64, -470]], { w: 2, col: '#5a5a5a', pass2: false }); for (let i = 0; i < 5; i++) ell(-240 + i * 120, -424, 50, 8, { wash: '#f4f6fa', washA: 1, line: false });
    pop(); crane(260, 1220, 500, t, { col: '#e8b030', sw: 0.02, light: 1 }); crane(1060, 1230, 440, t, { col: '#c8281e', sw: -0.04 });
    pencil([[600, 720], [600, by - 40]], { w: 3, col: '#2a2a2a', pass2: false }); rect(530, by - 40, 140, 80, { wash: '#a8a49a', washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.2, col: '#5a5a52', ang: 1.3 } });
    if (t > L1 && t < L1 + 0.6) { const a = 1 - (t - L1) / 0.6; for (let i = 0; i < 8; i++) ell(540 + i * 20, 840, 30 * (1 + (1 - a) * 2), 14, { wash: '#e8e8ec', washA: 0.6 * a, line: false }); }
    push(1000, 1280, 0.8); rect(-220, -150, 300, 120, { wash: '#4a6a3a', washA: 1, w: 2.4, col: L }); poly([[80, -150], [200, -150], [220, -80], [220, -30], [80, -30]], { wash: '#5a7a4a', washA: 1, w: 2.2, col: L }); rect(110, -136, 70, 50, { wash: '#a8c8d8', washA: 1, w: 1.4, col: L });
    push(-80, -150, 1, t * 1.2); ell(0, 0, 90, 70, { wash: '#c8c0b0', washA: 1, w: 2.2, col: L }); for (let q = 0; q < 4; q++) pencil([[-80 + q * 50, -50], [-60 + q * 50, 50]], { w: 3, col: '#8a8478', pass2: false }); pop();
    for (const k of [-150, 0, 150]) ell(k, -26, 32, 32, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
    push(-20, 1290, 0.75); rect(-120, -150, 240, 150, { wash: '#2a5a8a', washA: 1, w: 2.2, col: L }); rect(-90, -120, 70, 60, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); rect(30, -120, 60, 120, { wash: '#6a4a2a', washA: 1, w: 1.4, col: L }); poly([[-130, -150], [130, -150], [110, -170], [-110, -170]], { wash: '#f4f6fa', washA: 1, w: 1.6, col: L }); pop();
    rect(80, 1080, 360, 60, { wash: '#c8281e', washA: 1, w: 2, col: L }); txt('ДАЁШЬ ЧАЭС!', 260, 1112, 36, { col: '#fff6e0', font: 'Osw' });
    const P = [[320, 'hold', 'shovel'], [420, 'wave'], [760, 'swing'], [840, 'hold'], [930, 'wave'], [180, 'hold'], [1160, 'swing']];
    P.forEach(([x, a], i) => human(x, 1320, 0.62, t, { body: ['#3a3a44', '#4a4a3a', '#2a3a5a'][i % 3], hat: i % 2 ? 'fur' : 'helmet', hatCol: '#4a3a2a', legs: '#2a2a30', armR: a, prop: i === 0 ? 'stick' : undefined, flip: x > 640 ? -1 : 1, seed: 5530 + i, face: t > EV.bd_land ? 'grin' : 'smile' }));
  }
  function ground(t) {                                              // снег с колеёй, плиты, арматура, бочка-костёр, катушка кабеля
    rect(-500, 1340, 2200, 1000, { wash: '#eef2f8', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#8a9ab8', ang: 0.2 } });
    poly([[-500, 1500], [1600, 1440], [1600, 1520], [-500, 1600]], { wash: '#c8ccd8', washA: 1, w: 1.6, col: L }); const r = rng(5540); for (let i = 0; i < 30; i++) { const x = r() * 1900 - 400; pencil([[x, 1505 + r() * 60], [x + 40, 1500 + r() * 60]], { w: 3, col: '#8a8ea0', a: 0.5, pass2: false }); }
    for (let i = 0; i < 3; i++) rect(700 + i * 30, 1720 - i * 34, 300, 34, { wash: '#a8a49a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#5a5a52', ang: 1.3 } });
    for (let i = 0; i < 8; i++) pencil([[680 + i * 40, 1630], [720 + i * 40, 1520]], { w: 4, col: '#7a4a2a', pass2: false });
    push(1060, 1820, 1); rect(-50, -110, 100, 110, { wash: '#3a4a5a', washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) { const k = (t * 1.3 + i / 4) % 1; blob([[-20, -110 - k * 80], [0, -150 - k * 120], [24, -110 - k * 70]], { wash: i % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - k, line: false }); } glow(0, -140, 80, 'rgba(255,150,60,1)', 0.3); pop();
    human(1180, 1840, 0.95, t, { body: '#3a3a44', hat: 'fur', hatCol: '#4a3a2a', legs: '#2a2a30', armR: 'hold', flip: -1, seed: 5550, face: 'smile' });
    push(-60, 1780, 1); ell(0, 0, 70, 70, { wash: '#8a5a32', washA: 1, w: 2.4, col: L }); ell(0, 0, 26, 26, { wash: '#4a2e18', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) pencil(ellPts(0, 0, 40 + q * 8, 40 + q * 8, 0, 0, 30), { w: 3, col: '#2a2a2a', a: 0.6, pass2: false }); pop();
    roadSign(150, 1470, 0.85, t, 'build');
    for (let i = 0; i < 26; i++) { const x = 300 + i * 34, y = 1900 - i * 6 + Math.sin(i) * 10; ell(x, y, 10, 6, { wash: '#c8d0e0', washA: 1, w: 1, col: '#8a96b0' }); }
    push(520, 1880, 1); rect(-90, -70, 150, 60, { wash: '#4a6a3a', washA: 1, w: 2, col: L }); pencil([[60, -60], [150, -110]], { w: 6, col: '#3a3a3a', pass2: false }); ell(-50, -6, 24, 24, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) ell(-60 + q * 40, -76, 26, 12, { wash: '#a8a49a', washA: 1, w: 1, col: L }); pop();
    for (let i = 0; i < 4; i++) { push(-140 + i * 70, 1640 + (i % 2) * 20, 1); rect(-30, -50, 60, 50, { wash: '#a87a4a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#5a3a1a', ang: 0.7 } }); ell(0, -50, 30, 6, { wash: '#f4f6fa', washA: 1, line: false }); pop(); }
    human(940, 1900, 1.0, t, { body: '#4a4a3a', hat: 'fur', hatCol: '#5a3a2a', legs: '#2a2a30', armR: 'hold', prop: 'stick', flip: -1, seed: 5551, face: 'grin' });
    lightPool(700, 1640, 900, 180, 'rgba(255,214,170,1)', 0.25); castShadow(420, 1700, 110, 520, -2.7, 0.3); castShadow(1180, 1840, 70, 300, -2.7, 0.28); moodDark(100, 1000, 900, 1900, '#1a2440', 0.16);
  }
  function front(t) { for (const x of [-160, 1250]) { sil([[x - 70, 2300], [x - 50, 1200], [x + 50, 1200], [x + 70, 2300]], '#2a3044', 1); for (let i = 0; i < 5; i++) pencil([[x - 60, 1300 + i * 120], [x + 60, 1340 + i * 120]], { w: 6, col: '#4a5068', pass2: false }); } }
  WORLD.build = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.4, () => { site(t); depthFog('#eef0f8', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.2, () => motes(30, [-100, 600, 1200, 1800], '#ffffff', t, 5560, { sp: 5, vx: -1, sz: 3, a: 0.7, wob: 10 }));
  };
  DIR.build = {
    outfit: 'vatnik', light: { side: 1, rim: '#ffd0b0' }, grade: ['#1a2440', 0.05],
    act: () => [[S0.build, 'cold'], [EV.bd_70, 'proud'], [EV.bd_npp, 'awe'], [EV.bd_land, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1690, s: 0.95, look: t < EV.bd_npp ? [0.2, -0.2] : [0.6, -0.8], hand: t > EV.bd_70 ? [140, -330] : [140, -300], prop: t > EV.bd_70 ? 'scroll' : undefined, point: t > EV.bd_npp + 0.2, squash: t > EV.bd_land && t < EV.bd_land + 0.2 ? 0.05 : b.squash, frost: 0.5 }),
    hud: t => chBoard(640, 1060, 0.85, t, EV.bd_npp + 0.2, [['1970 · СТРОЙКА ЧАЭС', 46, '#ffe08a'], ['+ ГОРОД ПРИПЯТЬ', 46]], { w: 520 }),
    cam: () => [[S0.build, 600, 980, -0.12], [EV.bd_70, 580, 1000, -0.08], [EV.bd_npp, 640, 900, -0.04, 'x'], [S1.build, 600, 940, 0.02]]
  };
  SHAKES.push([EV.bd_land, 0.2, 5]);
  TRANS_IN.build = { a: 0.12, b: 0.32, fx(k, t, A, B) { const e = sm(k); drawBuf(A); scr(() => { const y = e * 2200 - 200; ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); for (let x = W; x >= 0; x -= 60) ctx.lineTo(x, y + Math.sin(x * 0.02 + t * 6) * 60); ctx.closePath(); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    for (let x = 0; x <= W; x += 40) ell(x, y + Math.sin(x * 0.02 + t * 6) * 60, 40, 20, { wash: '#a8a49a', washA: 0.9 * (1 - e), line: false }); }); } };
})();
