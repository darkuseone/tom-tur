/* 026 — сцена `fall`: апрель 1453, ночь перед рассветом, холм за Галатой. Вход в Золотой Рог перекрыт цепью на поплавках, за ней —
   стены и башни Константинополя, купол Святой Софии, вспышки пушек. По холму по смазанным брёвнам тянут галеры: толпы с канатами,
   волы, факелы. Главный свет — костры и факелы на холме (тёплый), второй — холодная луна. Том-янычар (yanychar) тянет канат большой
   галеры: на «цепью» цепь подсвечивается, на «Ладно» Том поплёвывает на ладони и рвёт канат — галера переваливает гребень;
   на «семидесяти» счётчик кораблей щёлкает до «≈ 70». Без крови и символики: вымпелы — гладкие красные. Переход В — цепь рвёт кадр. */
(() => {
  EV.fl_mehmed = wtk('s5', 'Мехмед.');
  EV.fl_chain = wtk('s5', 'цепью?');
  EV.fl_ok = wtk('s5', 'Ладно:');
  EV.fl_70 = wtk('s5', 'семидесяти');
  EV.fl_land = wtk('s5', 'суше!');
  KEYW.push('Мехмед.', 'цепью?', 'суше!');
  SHAKES.push([EV.fl_ok + 0.2, 0.3, 9], [EV.fl_land, 0.25, 7]);
  const L = IS.ink, FIRE = [880, 1500];
  const haul = t => sm(clamp((t - EV.fl_ok) / (EV.fl_land - EV.fl_ok + 0.4)));
  function sky(t) { vgrad(-900, 1250, ['#0a0e24', '#1a2244', '#3a3456', '#a85a3a', '#e8945a'], 1); ell(240, 420, 50, 50, { wash: '#f0ecd8', washA: 1, line: false }); glow(240, 420, 140, 'rgba(220,230,255,1)', 0.25);
    const r = rng(2850); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 80; i++) { ctx.globalAlpha = 0.3 + 0.5 * r(); ctx.fillRect(r() * 1300 - 100, r() * 700 - 100, 2.4, 2.4); } ctx.restore(); }
  function horn(t) {                                                 // Золотой Рог, цепь на поплавках, стены Константинополя, вспышки
    rect(-600, 990, 2400, 200, { wash: '#2a3050', washA: 1, line: false }); for (let i = 0; i < 20; i++) pencil([[-300 + i * 90, 1010 + (i % 4) * 30], [-250 + i * 90, 1010 + (i % 4) * 30]], { w: 2, col: '#e8b080', a: 0.3, pass2: false });
    push(0, 0, 1); sil([[-600, 990], [-600, 930], [1800, 920], [1800, 990]], '#2a2234', 1);
    for (let i = 0; i < 14; i++) { const x = -400 + i * 150; sil([[x - 30, 935], [x - 30, 860], [x + 30, 860], [x + 30, 935]], '#3a2e40', 1); for (let k = -1; k <= 1; k++) sil([[x + k * 20 - 7, 860], [x + k * 20 - 7, 842], [x + k * 20 + 7, 842], [x + k * 20 + 7, 860]], '#3a2e40', 1); }
    sofiaB(720, 930, 0.32, t, { col: '#4a3a4a' }); pop();
    const hl = t > EV.fl_chain - 0.05 && t < EV.fl_ok + 0.3 ? 1 : 0;
    const pts = []; for (let i = 0; i <= 10; i++) { const x = -500 + i * 260, y = 1060 + Math.sin(i * 1.3 + t) * 6; pts.push([x, y]); ell(x, y + 8, 40, 16, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); }
    chainL(pts, t, { sz: 22, col: hl ? IS.goldL : '#8a8a96' }); if (hl) for (const p of pts) glow(p[0], p[1], 50, 'rgba(255,220,120,1)', 0.35);
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.6) + i * 0.27) % 1, x = -200 + i * 420; if (ph < 0.25) { glow(x, 900, 120 * (1 - ph * 4), 'rgba(255,170,80,1)', 0.6 * (1 - ph * 4)); ell(x, 880 - ph * 160, 30 + ph * 200, 20 + ph * 120, { wash: '#4a4054', washA: 0.5 * (1 - ph * 4), line: false }); } }
    galley(980, 1130, 0.3, t, { sail: '#3a3040', hull: '#2a1a14', trim: '#4a2a1a', flag: '#6a2a2a' }); galley(380, 1150, 0.28, t, { sail: '#3a3040', hull: '#2a1a14', trim: '#4a2a1a', flag: '#6a2a2a', flip: -1 });
    depthFog('#4a3a5a', 0.1);
  }
  function hill(t) {                                                 // склон: брёвна-катки, галеры на подъёме, толпы с канатами, волы
    blob([[-600, 1400], [-300, 1240], [200, 1170], [700, 1190], [1200, 1260], [1700, 1400], [1700, 1600], [-600, 1600]], { wash: '#3a2e2a', washA: 1, w: 2, col: L });
    for (let i = 0; i < 22; i++) { const x = -400 + i * 90, y = 1250 - Math.sin((x + 400) / 2100 * Math.PI) * 80; pencil([[x - 26, y + 10], [x + 26, y - 6]], { w: 9, col: '#8a5a32', pass2: false }); }
    for (let i = 0; i < 3; i++) { const ph = ((t - S0.fall) * 0.06 + i * 0.33) % 1, x = -300 + ph * 1700, y = 1240 - Math.sin(ph * Math.PI) * 120; galley(x, y - 40, 0.32, t, { rot: (0.5 - ph) * 0.3, noOars: true, sail: '#d8c8a8', flag: IS.pom });
      for (let k = 0; k < 5; k++) { const hx = x + 160 + k * 40; human(hx, y + 20, 0.32, t + k, { body: k % 2 ? '#8a3a2a' : '#3a4a6a', hat: k % 2 ? 'turban' : 'fez', armR: 'point', armL: 'point', seed: 2860 + i * 10 + k }); }
      pencil([[x + 120, y - 30], [x + 340, y]], { w: 2.4, col: '#c8a878', pass2: false }); }
    for (const [x, y] of [[1240, 1300], [1400, 1330]]) { push(x, y, 0.55, 0, -1); ell(0, -80, 110, 52, { wash: '#6a5a4a', washA: 1, w: 2, col: L }); blob([[80, -100], [140, -150], [170, -120], [120, -80]], { wash: '#6a5a4a', washA: 1, w: 2, col: L }); for (const k of [-1, 1]) pencil(spline([[150, -146], [150 + k * 30, -190], [160 + k * 50, -180]], false, 6), { w: 5, col: '#e8dcc0', pass2: false }); for (const k of [-60, -20, 40, 80]) pencil([[k, -40], [k, 30]], { w: 10, col: '#3a2e24', pass2: false }); pop(); }
    for (const x of [-120, 520, 1120]) { pencil([[x, 1300], [x, 1080]], { w: 6, col: '#3a2a1a', pass2: false }); glow(x, 1070, 70, 'rgba(255,170,80,1)', 0.4); blob([[x - 14, 1080], [x, 1030 + Math.sin(t * 9 + x) * 6], [x + 14, 1080]], { wash: '#ffb44a', washA: 1, line: false }); }
  }
  function ship(t) {                                                 // большая галера: катится по каткам, через гребень переваливает на «Ладно»
    const k = haul(t), x = lerp(780, 420, k), y = 1390 - Math.sin(k * Math.PI) * 60, rot = lerp(-0.14, 0.12, k);
    for (let i = 0; i < 8; i++) { const lx = 300 + i * 120 - (k * 300) % 120; pencil([[lx - 50, 1480], [lx + 50, 1460]], { w: 18, col: '#7a4a2a', pass2: false }); ell(lx + 50, 1460, 10, 10, { wash: '#a8743a', washA: 1, w: 1.6, col: L }); }
    galley(x, y, 0.8, t, { rot, noOars: true, sail: '#e8d8b8', flag: IS.pom });
    const P = [[900, '#3a4a6a', 'fez'], [1020, '#8a3a2a', 'turban'], [1130, '#5a4a2a', 'turban']]; P.forEach(([px, c, h], i) => human(px, 1480, 0.55, t, { body: c, hat: h, legs: '#2a2a32', armR: 'point', armL: 'point', flip: -1, face: 'angry', seed: 2880 + i, beard: 'short', hair: '#2a1a10' }));
  }
  function ground(t) {                                               // склон под Томом: грязь, вёдра сала, бухты каната, канат к галере
    blob([[-600, 1500], [400, 1460], [1700, 1480], [1700, 2400], [-600, 2400]], { wash: '#4a3a2e', washA: 1, w: 2, col: L });
    for (let i = 0; i < 30; i++) { const r = rng(2890 + i); ell(-300 + r() * 1600, 1520 + r() * 500, 20 + r() * 40, 6 + r() * 10, { wash: r() < 0.5 ? '#3a2e24' : '#5a4636', washA: 1, w: 1, col: '#2a1e14' }); }
    lightPool(FIRE[0] - 300, 1620, 700, 160, 'rgba(255,170,90,1)', 0.45);
    for (const [x, y] of [[1000, 1720], [-40, 1700]]) { push(x, y, 1); shape([[-40, 0], [-46, -80], [46, -80], [40, 0]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(0, -80, 46, 12, { wash: '#e8dcc0', washA: 1, w: 1.6, col: L }); pop(); }
    push(150, 1760, 1); for (let q = 0; q < 4; q++) ell(0, -q * 14, 80 - q * 8, 22, { line: true, w: 7, col: '#c8a878' }); pop();
    const hx = 330 + 210, hy = 1612 - 380, pull = t > EV.fl_ok ? Math.sin((t - EV.fl_ok) * 10) * 6 : 0; pencil(spline([[hx - 120, hy + 30], [hx, hy + pull], [hx + 300, hy - 10 + pull], [1300, hy - 120]], false, 12), { w: 7, col: '#c8a878', pass2: false });   // канат: от Тома вверх по склону к галере
    castShadow(330, 1612, 120, 520, -0.25, 0.45); moodDark(FIRE[0], 1300, 800, 1700, '#0a0814', 0.45);
  }
  function hud(t) {
    if (t > EV.fl_70 - 0.1) { const q = popK(t, EV.fl_70 - 0.1, 0.3), n = Math.min(70, Math.round(sm(clamp((t - EV.fl_70 + 0.1) / 0.9)) * 70)); push(560, 800, q, -0.03); rect(-250, -80, 500, 160, { wash: '#14100a', washA: 0.92, w: 3.4, col: IS.goldL }); txt('≈ ' + n, -40, -10, 92, { col: IS.goldL, font: 'Osw' }); txt('кораблей по суше', 0, 52, 30, { col: '#f6e7c8', font: 'Osw' }); push(150, -10, 0.16); galley(0, 0, 1, t, { noOars: true, sail: IS.goldL, hull: IS.gold, flag: IS.goldL }); pop(); pop(); }
  }
  function front(t) { push(FIRE[0] + 140, 1880, 1.4); for (let i = 0; i < 6; i++) pencil([[-80 + i * 30, 40], [-60 + i * 26, -40]], { w: 12, col: '#2a1a0e', pass2: false });
      const f = Math.sin(t * 13) * 0.08 + 1; glow(0, -120, 260, 'rgba(255,150,60,1)', 0.45); blob([[-90, -30], [-50, -200 * f], [-10, -120], [20, -260 * f], [50, -110], [90, -180 * f], [100, -30]], { wash: '#ff8a2a', washA: 1, line: false }); blob([[-40, -30], [-10, -140 * f], [20, -60], [50, -120 * f], [60, -30]], { wash: '#ffe08a', washA: 1, line: false }); pop();
    for (let i = 0; i < 3; i++) { const x = -60 + i * 50; pencil([[x, 2300], [x + 20, 1700]], { w: 30, col: '#1a120c', pass2: false }); } }
  WORLD.fall = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => horn(t));
    lay(6, () => hill(t));
    lay(2, () => ship(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    lay(1.6, () => motes(30, [500, 900, 1300, 1900], '#ffb060', t, 2895, { sp: -14, sz: 3, a: 0.7, wob: 22, add: 1 }));
    lay(3, () => motes(20, [-100, 700, 1200, 1300], '#c8c0d0', t, 2896, { sp: 3, sz: 4, a: 0.25, wob: 30 }));
  };
  DIR.fall = {
    outfit: 'yanychar', light: { side: 1, rim: '#ffa860' }, grade: ['#2a1a3a', 0.1],
    act: () => [[S0.fall, 'suspicious'], [EV.fl_mehmed, 'shock'], [EV.fl_chain, 'annoyed'], [EV.fl_ok, 'smug'], [EV.fl_70, 'grin'], [EV.fl_land, 'laugh']],
    pose: (t, u, b) => { const spit = t > EV.fl_ok - 0.5 && t < EV.fl_ok, pull = t > EV.fl_ok, pk = pull ? Math.sin((t - EV.fl_ok) * 10) : 0;
      return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t < EV.fl_ok ? [0.9, -0.5] : [0.8, -0.2], hand: spit ? [40, -380] : [210 + pk * 14, -380], handF: spit ? [-30, -360] : [150 + pk * 14, -360],
        tilt: pull ? -0.12 + pk * 0.03 : 0, squash: pull && pk > 0.8 ? 0.06 : b.squash, sweat: pull, tailUp: t > EV.fl_70 }); },
    cam: () => [[S0.fall, 640, 980, 0.0], [EV.fl_mehmed, 600, 980, 0.06], [EV.fl_chain, 560, 900, 0.1, 'x'], [EV.fl_ok, 520, 1080, 0.14, 'x'], [EV.fl_70, 560, 1020, 0.04], [S1.fall, 600, 1000, 0.08]],
    hud
  };
  TRANS_IN.fall = { a: 0.1, b: 0.4, fx(k, t, A, B) {                // цепь лопается: кадр рвётся по диагонали, половины разлетаются
    const e = sm(k); drawBuf(B); scr(() => { const d = e * 900;
      for (const sd of [-1, 1]) { ctx.save(); ctx.beginPath(); if (sd < 0) { ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(0, H); } else { ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(0, H); } ctx.closePath(); ctx.clip(); ctx.translate(sd * d * 0.6, sd * d); ctx.rotate(sd * e * 0.15); ctx.drawImage(A, 0, 0); ctx.restore(); }
      if (e < 0.6) chainL([[W + 60, -60], [540, 960 + Math.sin(e * 20) * 40], [-60, H + 60]], t, { sz: 30, col: '#3a3a42' }); });
  } };
})();
