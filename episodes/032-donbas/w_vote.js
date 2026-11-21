/* 032 — сцена `vote` (s6, 1 декабря 1991). Избирательный участок в школьном спортзале Донецка: большие окна со снегом слева
   (главный свет — холодный дневной из окон, длинные полосы на полу), шведская стенка, баскетбольный щит, кабинки со шторками,
   стол комиссии со списками, деревянная урна с печатью, очередь в пальто и шапках-ушанках, бабушка с внуком, школьные часы.
   На «проголосовал» Том опускает бюллетень в урну; на «восемьдесят четыре» — табло: ДОНЕЦКАЯ 83,9 % · ЛУГАНСКАЯ 83,9 % ·
   ВСЯ УКРАИНА 92,3 % (столбики растут). Переход — бюллетень падает в щель урны и раскрывает зал. */
(() => {
  EV.vt_91 = wtk('s6', 'девяносто');
  EV.vt_vote = wtk('s6', 'проголосовал');
  EV.vt_84 = wtk('s6', 'восемьдесят') - 0.1;
  KEYW.push('Украину', 'процента.');
  const L = DB.ink;
  function hall(t) { vgrad(-900, 1300, ['#c8c0a8', '#d8d0b8', '#c0b8a0'], 1); rect(-400, 1000, 2000, 300, { wash: '#5a8a6a', washA: 1, w: 2, col: L });
    for (let i = 0; i < 3; i++) { const x = -260 + i * 330; rect(x, 380, 260, 520, { wash: '#e8f0f8', washA: 1, w: 4, col: '#6a5a4a' }); rect(x + 10, 390, 240, 500, { wash: '#c8d8ec', washA: 1, line: false });
      for (let q = 0; q < 3; q++) rect(x + 20 + q * 80, 700 - q * 30, 70, 190 + q * 30, { wash: '#8a8a9a', washA: 1, w: 1.2, col: L }); rect(x + 10, 820, 240, 70, { wash: '#f4f8fc', washA: 1, line: false });
      pencil([[x + 130, 380], [x + 130, 900]], { w: 5, col: '#6a5a4a', pass2: false }); pencil([[x, 640], [x + 260, 640]], { w: 5, col: '#6a5a4a', pass2: false });
      const r = rng(9000 + i); for (let q = 0; q < 14; q++) ell(x + 10 + r() * 240, 390 + ((r() * 500 + t * 50) % 500), 3, 3, { wash: '#ffffff', washA: 0.9, line: false }); }
    rays(100, 600, 0.6, 0.5, 1500, 'rgba(230,240,255,1)', 0.14, 7, t);
    push(1150, 520, 1); rect(-150, -100, 300, 200, { wash: '#f4f4f0', washA: 1, w: 3, col: L }); rect(-50, 60, 100, 70, { wash: false, w: 3, col: '#c8281e' }); pencil(ellPts(0, 160, 50, 10, 0, 0, 30), { w: 3, col: '#c8281e', pass2: false }); pop();
    push(1040, 300, 1); ell(0, 0, 60, 60, { wash: '#f8f8f4', washA: 1, w: 3, col: L }); pencil([[0, 0], [Math.sin(t) * 40, -Math.cos(t) * 40]], { w: 3, col: L, pass2: false }); pencil([[0, 0], [30, 10]], { w: 4, col: L, pass2: false }); pop();
    for (let i = 0; i < 6; i++) pencil([[1300, 700 + i * 60], [1500, 700 + i * 60]], { w: 4, col: '#8a6a3a', pass2: false }); for (const x of [1300, 1500]) pencil([[x, 680], [x, 1040]], { w: 6, col: '#8a6a3a', pass2: false });
    push(560, 950, 0.8); rect(-260, -50, 520, 100, { wash: '#f4ecd0', washA: 1, w: 2.4, col: L }); txt('РЕФЕРЕНДУМ · 1 ГРУДНЯ 1991', 0, 4, 40, { col: '#1e4a8a', font: 'Osw' }); pop();
  }
  function booths(t) {                                              // кабинки, стол комиссии, очередь
    for (let i = 0; i < 3; i++) { const x = 640 + i * 190; push(x, 1300, 0.8); rect(-90, -330, 180, 20, { wash: '#a8a8b0', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) pencil([[k, -310], [k, 0]], { w: 5, col: '#8a8a92', pass2: false });
      const sw = Math.sin(t * 1.5 + i) * 8; shape([[-86, -310], [86, -310], [86 + sw, -60], [-86 + sw, -60]], { wash: ['#c8a868', '#a8c0d8', '#d8a8a0'][i], washA: 1, w: 1.6, col: L, shade: { gap: 14, a: 0.2, col: '#3a3a3a', ang: 1.57 } }); pencil([[-30, -60], [-30, 0]], { w: 8, col: '#2a2a30', pass2: false }); pencil([[30, -60], [30, 0]], { w: 8, col: '#2a2a30', pass2: false }); pop(); }
    push(80, 1320, 0.8); rect(-300, -150, 600, 30, { wash: '#a88a5a', washA: 1, w: 2, col: L }); rect(-300, -120, 600, 120, { wash: '#c8282e', washA: 0.85, w: 2, col: L }); for (let q = 0; q < 5; q++) rect(-260 + q * 110, -180, 80, 30, { wash: '#f4f0e6', washA: 1, w: 1.2, col: L }); pop();
    [[-100, '#6a3a5a', 'bun'], [60, '#3a4a6a', 'scarf'], [220, '#5a5a3a', 'fur']].forEach(([x, c, h], i) => human(x, 1200, 0.6, t, { body: c, hat: h, hatCol: '#3a2a1a', legs: '#2a2a30', long: h !== 'fur' ? 1 : undefined, armR: 'hold', prop: 'scroll', seed: 9010 + i, face: 'calm' }));
    const Q = [[880, '#4a3a2a', 'fur'], [1000, '#2a3a4a', 'cap'], [1120, '#7a2a2a', 'scarf'], [1240, '#3a4a3a', 'fur'], [1360, '#5a4a6a', 'scarf']];
    Q.forEach(([x, c, h], i) => human(x, 1340, 0.66, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#e8a03a' : '#2a1a10', legs: '#2a2a30', long: h === 'scarf' ? 1 : undefined, armR: i === 2 ? 'wave' : 'hold', prop: i % 2 ? 'scroll' : undefined, flip: -1, seed: 9020 + i, face: t > EV.vt_84 ? 'grin' : 'calm' }));
  }
  function floor(t) {                                               // крашеный пол, разметка, урна, скамья, мячи, сумки
    rect(-500, 1300, 2200, 1000, { wash: '#b8864a', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.12, col: '#6a4a20', ang: 0.05 } }); for (let x = -500; x < 1700; x += 90) pencil([[x, 1300], [x - 60, 2300]], { w: 1.4, col: '#7a5a2a', a: 0.5, pass2: false });
    pencil(ellPts(700, 1700, 400, 120, 0, 0, 60), { w: 6, col: '#f4f0e6', a: 0.7, pass2: false }); pencil([[-500, 1500], [1700, 1460]], { w: 6, col: '#f4f0e6', a: 0.6, pass2: false });
    for (let i = 0; i < 3; i++) poly([[-100 + i * 330, 1300], [140 + i * 330, 1300], [500 + i * 330, 2000], [200 + i * 330, 2000]], { wash: '#fff8e8', washA: 0.14, line: false });
    push(620, 1620, 1); rect(-120, -200, 240, 200, { wash: '#a87a40', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#5a3a10', ang: 0.2 } }); rect(-60, -210, 120, 14, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); ell(60, -120, 34, 34, { wash: '#c8281e', washA: 0.85, w: 2, col: L });
      if (t > EV.vt_vote - 0.1) { const k = clamp((t - EV.vt_vote + 0.1) / 0.4); if (k < 1) { push(0, -300 + k * 100, 1, 0.1); rect(-60, -40, 120, 80, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); txt('ТАК', 0, 4, 30, { col: '#1e4a8a', font: 'Osw' }); pop(); } } pop();
    push(1180, 1760, 1); rect(-200, -60, 400, 20, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); for (const k of [-170, 170]) pencil([[k, -40], [k, 0]], { w: 8, col: '#6a4a2a', pass2: false }); ell(-100, -86, 40, 24, { wash: '#4a3a5a', washA: 1, w: 1.6, col: L }); pop();
    push(60, 1960, 1); poly([[-260, -60], [240, -80], [300, 40], [-220, 60]], { wash: '#3a5aa8', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.2, col: '#1a2a5a', ang: 0.1 } }); pencil([[-20, -70], [40, 50]], { w: 2, col: '#1a2a5a', pass2: false }); pop();
    push(-150, 1700, 1); pencil([[0, 0], [0, -330]], { w: 7, col: '#5a3a1a', pass2: false }); pencil([[-60, -300], [60, -300]], { w: 6, col: '#5a3a1a', pass2: false }); shape([[-60, -300], [-30, -300], [-20, -120], [-70, -130]], { wash: '#4a2a2a', washA: 1, w: 1.6, col: L }); shape([[30, -300], [60, -300], [70, -150], [20, -140]], { wash: '#2a3a4a', washA: 1, w: 1.6, col: L }); ell(-50, -320, 26, 14, { wash: '#5a4a3a', washA: 1, w: 1.4, col: L }); pop();
    for (let q = 0; q < 4; q++) { push(1120 + q * 40, 1950, 1, q * 0.3); rect(-40, -26, 80, 52, { wash: '#f4f0e6', washA: 1, w: 1.2, col: L }); pop(); }
    for (const [x, y, c] of [[-60, 1820, '#d8602a'], [40, 1880, '#3a6ad8']]) { ell(x, y, 40, 40, { wash: c, washA: 1, w: 2, col: L }); pencil([[x - 40, y], [x + 40, y]], { w: 2, col: L, pass2: false }); }
    human(960, 1760, 0.8, t, { body: '#6a4a3a', hat: 'scarf', hatCol: '#c8a0d0', legs: '#2a2a30', long: 1, armR: 'hold', seed: 9030, face: 'smile', flip: -1 }); human(1060, 1780, 0.55, t, { body: '#3a8ad0', hat: 'fur', hatCol: '#5a3a2a', legs: '#2a2a50', armR: 'wave', seed: 9031, face: 'grin', flip: -1 });
    push(1240, 1890, 0.9); ell(0, -16, 30, 18, { wash: '#7a6a5a', washA: 1, w: 1.4, col: L }); ell(26, -32, 12, 12, { wash: '#7a6a5a', washA: 1, w: 1.2, col: L }); pop();
    lightPool(300, 1650, 900, 180, 'rgba(230,240,255,1)', 0.3); castShadow(330, 1650, 120, 520, 0.8, 0.35); moodDark(1000, 900, 900, 1900, '#1a1a2a', 0.15);
  }
  function front(t) { sil([[1180, 2300], [1220, 1560], [1360, 1540], [1400, 2300]], '#2a2418', 1); pencil([[-200, 2000], [400, 1960]], { w: 10, col: '#3a3a40', pass2: false }); }
  WORLD.vote = (t, u, cat) => {
    lay(12, () => hall(t)); lay(3.2, () => { booths(t); depthFog('#e8e8f0', 0.03); }); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [-100, 500, 1200, 1500], '#ffffff', t, 9040, { sp: 1, sz: 2.2, a: 0.35, wob: 20, add: 1 }));
  };
  DIR.vote = {
    outfit: 'pufferG', light: { side: -1, rim: '#e8f0ff' }, grade: ['#1a2a3a', 0.04],
    act: () => [[S0.vote, 'talk'], [EV.vt_91, 'neutral'], [EV.vt_vote, 'proud'], [EV.vt_84, 'shock']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(100, 390, sm(w1)), drop = t > EV.vt_vote - 0.5 && t < EV.vt_vote + 0.2; return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: drop ? [1, 0.3] : [0.6, -0.3], hand: drop ? [240, -300] : [150, -300] }); },
    afterCat: (t, u, P) => { if (t < EV.vt_vote - 0.5 || t > EV.vt_vote - 0.05) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y - 30, 1, 0.1); rect(-60, -40, 120, 80, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); txt('ТАК', 0, 4, 30, { col: '#1e4a8a', font: 'Osw' }); pop(); },
    hud: t => { if (t < EV.vt_84) return; push(560, 860, popK(t, EV.vt_84, 0.3), -0.02); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.9)'; ctx.fillRect(-340, -190, 680, 380); ctx.restore(); pencil([[-340, -190], [340, -190], [340, 190], [-340, 190], [-340, -190]], { w: 4, col: DB.brassL, pass2: false });
      txt('ЗА НЕЗАВИСИМОСТЬ УКРАИНЫ', 0, -150, 36, { col: DB.brassL, font: 'Osw' });
      [['ДОНЕЦКАЯ', 83.9], ['ЛУГАНСКАЯ', 83.9], ['ВСЯ УКРАИНА', 92.3]].forEach(([n, v], i) => { const y = -80 + i * 100, k = clamp((t - EV.vt_84 - i * 0.2) / 0.6); txt(n, -200, y + 10, 32, { col: '#f0e8d8', font: 'Osw' }); rect(-80, y - 20, 300, 44, { wash: '#2a2a30', washA: 1, line: false });
        rect(-80, y - 20, 300 * v / 100 * k, 44, { wash: i === 2 ? '#f8c830' : '#3a8ad8', washA: 1, line: false }); txt((v * k).toFixed(1).replace('.', ',') + ' %', 290, y + 10, 34, { col: '#fff6e0', font: 'Osw' }); }); pop(); },
    cam: () => [[S0.vote, 560, 960, -0.06], [EV.vt_91, 520, 1000, 0.0], [EV.vt_vote, 620, 1120, 0.1, 'x'], [EV.vt_84, 560, 1040, 0.04], [S1.vote, 560, 1060, 0.06]]
  };
  TRANS_IN.vote = { a: 0.06, b: 0.4, fx(k, t, A, B) {             // бюллетень-лист падает на камеру, на нём уже новая сцена
    const e = sm(k); drawBuf(A); scr(() => { const y = -1800 + e * 1800, rot = (1 - e) * 0.3; ctx.save(); ctx.translate(540, 960 + y); ctx.rotate(rot); ctx.fillStyle = '#f4f0e6'; ctx.fillRect(-560, -980, 1120, 1960); ctx.globalAlpha = e; ctx.drawImage(B, -540, -960); ctx.restore(); }); } };
})();
