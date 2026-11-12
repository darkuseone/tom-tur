/* 024 — сцена `occup`: 1937, оккупация. Ночная лаборатория медколледжа: высокое окно с жалюзи, за ним — надвратная башня, крыши и колонна
   солдат (силуэты в касках, без флагов и знаков), по небу шарят прожекторы. В комнате: стеллаж со слепками и банками, карта, часы,
   стол с зелёной лампой, микроскопом, циркулем и бумагами, учёные в халатах несут лотки с костями к большому сейфу.
   На «война» — вспышка за окном, с потолка сыплется пыль, лампа мигает; на «Япония» колонна идёт мимо окна, луч прожектора ложится полосами
   через жалюзи; на «восемь лет» — календарь 1937 → 1945; на «заперли» Том захлопывает дверь сейфа, на «сейф» крутит штурвал — щёлкает замок,
   настольная лампа гаснет. Главный свет — луч прожектора через жалюзи (холодный), второй — тёплая лампа. Переход В сцену — падают жалюзи. */
(() => {
  EV.oc_war = wtk('s5', 'война:');
  EV.oc_japan = wtk('s5', 'Япония');
  EV.oc_8 = wtk('s5', 'восемь');
  EV.oc_lock = wtk('s5', 'заперли');
  EV.oc_safe = wtk('s5', 'сейф.');
  KEYW.push('война:', 'восемь', 'сейф.');
  SHAKES.push([EV.oc_war, 0.4, 10], [EV.oc_lock + 0.14, 0.25, 10]);
  const L = BJ.ink, WX0 = 300, WX1 = 740, WY0 = 520, WY1 = 1180, FX = 800, FW = 300, FY0 = 950, FY1 = 1575;   // окно; сейф
  const beam = t => 0.35 + 0.65 * Math.max(0, Math.sin((t - EV.oc_japan) * 2.4 + 0.6)), lamp = t => t > EV.oc_safe + 0.15 ? 0 : (t > EV.oc_war && t < EV.oc_war + 0.5 ? (Math.sin(t * 50) > 0 ? 1 : 0.3) : 1);
  const doorK = t => clamp((t - EV.oc_lock) / 0.14);
  function sky(t) { vgrad(-900, 1400, ['#080a1e', '#1a1a3a', '#3a2a40', '#5a3038'], 1); starsBJ(t, 50, [0, 300, 1100, 900], 2570, 0.8);
    const fl = t > EV.oc_war && t < EV.oc_war + 0.5 ? 1 - (t - EV.oc_war) / 0.5 : 0; if (fl) glow(500, 1150, 900, 'rgba(255,170,90,1)', 0.8 * fl);
    for (const [x, ph] of [[380, 0], [700, 1.7]]) { const a = -Math.PI / 2 + Math.sin(t * 0.9 + ph) * 0.5; rays(x, 1200, a, 0.07, 1500, 'rgba(210,225,255,0.9)', 0.3, 3, t); } }
  function city(t) {                                                // надвратная башня и крыши за окном
    hallCN(560, 1010, 330, 150, { bays: 5, rh: 100, tiers: 1, wall: '#1a1024', roof: { sil: '#120a1c', ev: 40 } }); roofCN(560, 866, 360, 90, { sil: '#120a1c', ev: 40 }); roofCN(560, 780, 300, 100, { sil: '#120a1c', ev: 40 }); sil([[300, 1200], [300, 1010], [820, 1010], [820, 1200]], '#160c20', 1);
    for (const [x, w] of [[250, 200], [860, 220]]) { sil([[x - w / 2, 1200], [x - w / 2, 1060], [x + w / 2, 1060], [x + w / 2, 1200]], '#0e0a18', 1); roofCN(x, 1064, w + 20, 50, { sil: '#0e0a18', ev: 20 }); }
    depthFog('#3a2a4a', 0.25); }
  function column(t) {                                              // колонна солдат и грузовик — силуэты, без знаков
    const go = t > EV.oc_japan - 0.3 ? (t - EV.oc_japan + 0.3) * 90 : 0;
    for (let i = 0; i < 14; i++) { const x = 120 - i * 74 + go * 1.0 + 200, y = 1196, st = Math.sin(t * 9 + i * 1.3) * 5, c = '#0a0810';
      sil([[x - 14, y], [x - 16, y - 70], [x - 10, y - 96], [x + 10, y - 96], [x + 16, y - 70], [x + 14, y]], c, 1); sil(ellPts(x, y - 108 + st * 0.3, 13, 12, 0, 0, 12), c, 1); sil([[x - 17, y - 110 + st * 0.3], [x + 17, y - 110 + st * 0.3], [x + 12, y - 122 + st * 0.3], [x - 12, y - 122 + st * 0.3]], c, 1);
      pencil([[x + 12, y - 60], [x + 22, y - 160]], { w: 3, col: c, pass2: false }); pencil([[x - 8, y], [x - 8 + st, y + 30]], { w: 7, col: c, pass2: false }); pencil([[x + 8, y], [x + 8 - st, y + 30]], { w: 7, col: c, pass2: false }); }
    const tx = -700 + go * 1.0; sil([[tx, 1226], [tx, 1110], [tx + 150, 1110], [tx + 150, 1150], [tx + 210, 1150], [tx + 230, 1190], [tx + 230, 1226]], '#0a0810', 1); for (const k of [40, 180]) sil(ellPts(tx + k, 1226, 22, 22, 0, 0, 14), '#0a0810', 1); glow(tx + 236, 1180, 90, 'rgba(255,230,170,1)', 0.7);
    rect(-900, 1226, 2900, 300, { wash: '#1a1420', washA: 1, line: false }); }
  function wallB(t) {                                               // стена с окном: рама, жалюзи, карта, часы, стеллаж
    const c = '#3a4038', b = beam(t);
    for (const [x, y, w, h] of [[-900, -400, WX0 + 900, 2000], [WX1, -400, 1300, 2000], [WX0 - 2, -400, WX1 - WX0 + 4, WY0 + 400], [WX0 - 2, WY1, WX1 - WX0 + 4, 500]]) rect(x, y, w, h, { wash: c, washA: 1, line: false });
    rect(-900, 1330, 2900, 190, { wash: '#2a2a24', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.25, col: '#0e0e0a', ang: 1.57 } });
    rect(WX0 - 16, WY0 - 16, WX1 - WX0 + 32, WY1 - WY0 + 32, { line: true, w: 16, col: '#1e1a14' }); pencil([[(WX0 + WX1) / 2, WY0], [(WX0 + WX1) / 2, WY1]], { w: 9, col: '#1e1a14', pass2: false }); pencil([[WX0, 800], [WX1, 800]], { w: 7, col: '#1e1a14', pass2: false });
    for (let i = 0; i < 16; i++) { const y = WY0 + 14 + i * 22; if (y < WY0 + 250) rect(WX0, y, WX1 - WX0, 9, { wash: '#b8b098', washA: 0.95, w: 1, col: L }); } for (const x of [WX0 + 60, WX1 - 60]) pencil([[x, WY0], [x, WY0 + 370]], { w: 2, col: '#5a5648', pass2: false });
    ctx.save(); ctx.globalAlpha = 0.1 + 0.1 * b; ctx.fillStyle = '#cfe0ff'; ctx.fillRect(WX0, WY0, WX1 - WX0, WY1 - WY0); ctx.restore();
    // стеллаж слева: слепки, банки, папки
    rect(-140, 600, 360, 740, { wash: '#2a1e14', washA: 1, w: 2.6, col: L }); for (let j = 0; j < 4; j++) { const y = 780 + j * 180; rect(-140, y, 360, 12, { wash: '#4a3420', washA: 1, w: 1.6, col: L });
      for (let i = 0; i < 4; i++) { const x = -100 + i * 84, k = (i + j) % 4; if (k === 0) skullPM(x + 10, y - 44, 0.3, { kind: 'plaster' }); else if (k === 1) { rect(x - 20, y - 70, 40, 70, { wash: '#a8c8b8', washA: 0.6, w: 1.6, col: L }); rect(x - 22, y - 78, 44, 10, { wash: '#6a5a3a', washA: 1, w: 1.2, col: L }); } else if (k === 2) for (let n = 0; n < 3; n++) rect(x - 26 + n * 18, y - 86 + n * 4, 15, 86 - n * 4, { wash: ['#6a2a1a', '#2a4a3a', '#5a4a2a'][n], washA: 1, w: 1.2, col: L }); else { pencil([[x - 26, y - 12], [x + 26, y - 20]], { w: 8, col: BJ.bone, pass2: false }); ell(x - 28, y - 12, 8, 8, { wash: BJ.bone, washA: 1, line: false }); ell(x + 28, y - 20, 8, 8, { wash: BJ.bone, washA: 1, line: false }); } } }
    // карта и часы справа
    push(950, 720, 1, 0.02); rect(-150, -110, 300, 220, { wash: '#d8c8a0', washA: 0.9, w: 2.4, col: L }); blob([[-100, -40], [-40, -80], [50, -60], [110, -10], [70, 60], [-20, 80], [-90, 40]], { wash: '#b8a878', washA: 1, w: 1.8, col: '#5a4a2a' }); ell(60, -30, 9, 9, { wash: '#c8281a', washA: 1, line: false }); txt('Бэйпин', 60, -54, 26, { col: '#5a1a10', font: 'Hand' }); pencil([[90, -90], [64, -40]], { w: 4, col: '#1a1a1a', pass2: false }); pencil([[120, -60], [70, -30]], { w: 4, col: '#1a1a1a', pass2: false }); pop();
    ell(1130, 560, 54, 54, { wash: '#e8e0c8', washA: 1, w: 4, col: '#2a1e14' }); pencil([[1130, 560], [1130, 522]], { w: 3, col: L, pass2: false }); pencil([[1130, 560], [1130 + Math.cos(t * 0.8) * 34, 560 + Math.sin(t * 0.8) * 34]], { w: 2, col: L, pass2: false });
    pencil([[540, -200], [540, 330]], { w: 3, col: L, pass2: false }); blob([[480, 400], [500, 330], [580, 330], [600, 400]], { wash: '#2a4a3a', washA: 1, w: 2.2, col: L }); const lp = lamp(t); if (lp > 0.05) { glow(540, 420, 420, 'rgba(255,200,110,1)', 0.4 * lp); ell(540, 404, 26, 12, { wash: '#fff0b8', washA: lp, line: false }); }
    if (t > EV.oc_war && t < EV.oc_war + 1.2) motes(30, [100, 100, 1100, 100 + (t - EV.oc_war) * 900], '#d8d0c0', t, 2571, { sp: -260, sz: 3, a: 0.7, wob: 10 });
  }
  function lab(t) {                                                 // учёные с лотками, стол с лампой и приборами
    const lp = lamp(t), gone = doorK(t);
    const sc = (x, y, s, sd, o = {}) => human(x, y, s, t, Object.assign({ body: '#e8e8e0', legs: '#2a2a30', long: 1, seed: sd, hat: 'bun' }, o));
    const wkx = lerp(480, 730, sm(clamp((t - S0.occup) / (EV.oc_lock - S0.occup - 0.3))));
    if (gone < 1) { sc(wkx, 1500, 0.72, 2572, { flip: 1, look: [0.6, 0.1] }); rect(wkx + 22, 1392, 90, 14, { wash: BJ.woodD, washA: 1, w: 1.8, col: L }); skullPM(wkx + 66, 1372, 0.26, {}); pencil([[wkx + 30, 1388], [wkx + 60, 1380]], { w: 6, col: BJ.bone, pass2: false }); }
    sc(1180, 1510, 0.76, 2573, { flip: -1, beard: 1, hat: 'cap', hatCol: '#3a3a40', look: [-0.6, 0] }); sc(60, 1490, 0.62, 2574, { look: [0.7, -0.2], prop: 'scroll', armR: 'hold' });
    // стол
    rect(-260, 1390, 620, 30, { wash: BJ.wood, washA: 1, w: 2.4, col: L }); rect(-240, 1420, 580, 170, { wash: BJ.woodD, washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.3, col: '#120804', ang: 1.57 } }); for (const x of [-200, 100]) { rect(x, 1440, 200, 60, { line: true, w: 1.8, col: '#2a1808' }); ell(x + 100, 1470, 7, 7, { wash: BJ.goldD, washA: 1, line: false }); }
    pencil([[40, 1390], [40, 1300], [90, 1270]], { w: 6, col: '#8a7a3a', pass2: false }); blob([[60, 1290], [80, 1240], [150, 1250], [140, 1300]], { wash: '#2a6a4a', washA: 1, w: 2.2, col: L }); ell(20, 1390, 40, 8, { wash: '#8a7a3a', washA: 1, w: 1.6, col: L });
    if (lp > 0.05) { glow(108, 1300, 260, 'rgba(255,214,130,1)', 0.55 * lp * flick(t, 2)); lightPool(140, 1396, 240, 30, 'rgba(255,220,150,1)', 0.6 * lp); }
    push(240, 1390, 1); rect(-24, -14, 48, 14, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); pencil([[0, -14], [-6, -80], [22, -112]], { w: 8, col: '#2a2a30', pass2: false }); rect(8, -128, 26, 40, { wash: '#3a3a42', washA: 1, w: 1.6, col: L }); rect(-20, -40, 44, 8, { wash: '#5a5a62', washA: 1, w: 1.2, col: L }); pop();   // микроскоп
    for (const [x, r] of [[-120, -0.1], [-60, 0.15], [300, -0.05]]) { push(x, 1386, 1, r); rect(-40, -6, 80, 10, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); pencil([[-28, -3], [20, -3]], { w: 1, col: '#3a3a3a', a: 0.6, pass2: false }); pop(); }
    skullPM(-170, 1352, 0.3, { flip: -1 }); pencil([[160, 1384], [190, 1330], [220, 1384]], { w: 3, col: '#8a8a94', pass2: false }); ell(330, 1376, 20, 14, { wash: '#e8e0d0', washA: 1, w: 1.4, col: L });
  }
  function safe(t) {                                                // сейф (плоскость героя): корпус, полки с коробками, дверь, штурвал, пол
    const k = doorK(t), sp = t > EV.oc_safe ? (t - EV.oc_safe) * 9 : 0, b = beam(t);
    shape([[-900, 1500], [2000, 1500], [2000, 2500], [-900, 2500]], { wash: '#2e2a26', washA: 1, line: false });
    for (let i = 0; i < 8; i++) pencil([[-900, 1520 + i * i * 13 + i * 30], [2000, 1520 + i * i * 13 + i * 30]], { w: 1.6, col: '#0e0c0a', a: 0.5, pass2: false }); for (let i = -8; i < 14; i++) pencil([[540 + (i - 3) * 190, 1500], [540 + (i - 3) * 560, 2500]], { w: 1.4, col: '#0e0c0a', a: 0.4, pass2: false });
    // полосы света от жалюзи на полу и стене
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#bcd0ff'; const off = Math.sin((t - EV.oc_japan) * 2.4) * 120;
    for (let i = 0; i < 8; i++) { ctx.globalAlpha = 0.16 * b; const u0 = i / 8, u1 = (i + 0.55) / 8; ctx.beginPath(); ctx.moveTo(lerp(380, 1050, u0) + off, 1500); ctx.lineTo(lerp(380, 1050, u1) + off, 1500); ctx.lineTo(lerp(300, 1500, u1) + off * 2.4, 2400); ctx.lineTo(lerp(300, 1500, u0) + off * 2.4, 2400); ctx.fill(); } ctx.restore();
    rect(FX - 14, FY0 - 14, FW + 28, FY1 - FY0 + 14, { wash: '#3a4248', washA: 1, w: 3.4, col: L, shade: { gap: 9, a: 0.3, col: '#0e1216', ang: 1.2 } }); rect(FX - 30, FY1 - 6, FW + 60, 24, { wash: '#22282c', washA: 1, w: 2.4, col: L });
    rect(FX + 12, FY0 + 12, FW - 24, FY1 - FY0 - 30, { wash: '#0c0e10', washA: 1, w: 2, col: L });
    for (let j = 0; j < 3; j++) { const y = FY0 + 190 + j * 180; rect(FX + 12, y, FW - 24, 10, { wash: '#4a5258', washA: 1, w: 1.4, col: L }); for (let i = 0; i < 3; i++) { if (j === 2 && i === 1 && k < 0.2 && t < EV.oc_lock - 0.5) continue; const x = FX + 60 + i * 90; rect(x - 34, y - 60, 68, 60, { wash: '#b89a62', washA: 1, w: 1.6, col: L }); rect(x - 20, y - 40, 40, 22, { wash: '#f0e8d0', washA: 1, w: 1, col: L }); if ((i + j) % 2 === 0) skullPM(x + 4, y - 86, 0.2, {}); } }
    glow(FX + FW / 2, FY0 + 300, 260, 'rgba(255,220,150,1)', 0.25 * (1 - k) * lamp(t));
    // дверь: открыта (ребром слева) → захлопнута
    if (k < 1) { const w = lerp(120, FW, k), x0 = lerp(FX - 120, FX, k); shape([[x0, FY0 - 20 * (1 - k)], [x0 + w, FY0], [x0 + w, FY1 - 6], [x0, FY1 + 30 * (1 - k)]], { wash: '#5a666e', washA: 1, w: 3.2, col: L, shade: { gap: 8, a: 0.3, col: '#161c20', ang: 1.3 } }); }
    else { rect(FX, FY0, FW, FY1 - FY0 - 6, { wash: '#5a666e', washA: 1, w: 3.4, col: L, shade: { gap: 9, a: 0.28, col: '#161c20', ang: 1.3 } }); rect(FX + 22, FY0 + 22, FW - 44, FY1 - FY0 - 50, { line: true, w: 2.4, col: '#2a3238' });
      for (const y of [FY0 + 70, FY1 - 90]) rect(FX + FW - 16, y, 26, 60, { wash: '#2a3238', washA: 1, w: 2, col: L });
      push(FX + FW / 2, FY0 + 330, 1, sp < 6.3 ? sp : 6.3); ell(0, 0, 74, 74, { line: true, w: 10, col: '#c8c0a8' }); for (let i = 0; i < 6; i++) pencil([[0, 0], [Math.cos(i * 1.047) * 74, Math.sin(i * 1.047) * 74]], { w: 7, col: '#c8c0a8', pass2: false }); ell(0, 0, 18, 18, { wash: '#8a8474', washA: 1, w: 2, col: L }); pop();
      ell(FX + FW / 2, FY0 + 150, 34, 34, { wash: '#1a1e22', washA: 1, w: 2.6, col: '#c8c0a8' }); pencil([[FX + FW / 2, FY0 + 150], [FX + FW / 2 + Math.cos(sp * 2) * 26, FY0 + 150 + Math.sin(sp * 2) * 26]], { w: 3, col: '#e8e0c8', pass2: false });
      rect(FX + 80, FY0 + 470, FW - 160, 50, { wash: '#c8b070', washA: 1, w: 2, col: L }); txt('P.U.M.C.', FX + FW / 2, FY0 + 496, 28, { col: '#2a1a0a', font: 'Osw' });
      if (t < EV.oc_lock + 0.5) puffK(FX + 20, FY1 - 60, 1.2, t, EV.oc_lock + 0.14, 0.4, 2575, '#c8c8c0');
      if (t > EV.oc_safe + 0.55) { const q = popK(t, EV.oc_safe + 0.55, 0.25); push(FX + FW / 2, FY0 + 600, q, -0.06); rect(-110, -30, 220, 60, { wash: '#16080a', washA: 0.9, w: 3, col: '#ff6a4a' }); txt('ЗАПЕРТО', 0, 4, 40, { col: '#ffb8a0', font: 'Osw' }); pop(); } }
    castShadow(410, 1578, 180, 380, 0.75, 0.42); lightPool(700, 1640, 520, 110, 'rgba(190,210,255,1)', 0.3 * b); moodDark(560, 1000, 520, 1500, '#05040c', 0.55 + 0.2 * (1 - lamp(t)));
  }
  function front(t) {                                               // рама: спинка стула и абажур лампы — тёмные силуэты
    sil([[-560, 2500], [-540, 1500], [-250, 1470], [-230, 2500]], '#07060a', 1); for (let i = 0; i < 4; i++) sil([[-520 + i * 76, 1500], [-480 + i * 76, 1500], [-484 + i * 76, 2200], [-516 + i * 76, 2200]], '#0c0a10', 1);
    pencil([[1320, -200], [1320, 560]], { w: 6, col: '#07060a', pass2: false }); sil([[1150, 760], [1230, 560], [1410, 560], [1490, 760]], '#07060a', 1); glow(1320, 800, 300, 'rgba(255,200,110,1)', 0.3 * lamp(t));
  }
  function hud(t) {
    if (t > EV.oc_8 - 0.05 && t < EV.oc_lock + 0.2) { const q = popK(t, EV.oc_8 - 0.05, 0.3), yr = Math.round(lerp(1937, 1945, sm(clamp((t - EV.oc_8) / 0.8)))); push(610, 840, q, -0.03); rect(-230, -100, 460, 200, { wash: '#0e0c12', washA: 0.92, w: 3.2, col: '#c8d0e0' }); txt('1937 → ' + yr, 0, -40, 66, { col: '#e8ecf4', font: 'Osw' }); txt((yr - 1937) + ' ЛЕТ ОККУПАЦИИ', 0, 30, 46, { col: '#ff7a5a', font: 'Osw' }); txt('Пекин тогда — Бэйпин', 0, 76, 30, { col: '#c8c8d8', font: 'Hand' }); pop(); }
    if (t > EV.oc_lock + 0.14 && t < EV.oc_lock + 0.7) txt('БАМ', 760, 900, 90, { col: '#e8ecf4', font: 'Osw', rot: -0.1, a: 1 - (t - EV.oc_lock - 0.14) / 0.56 });
  }
  WORLD.occup = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => city(t));
    lay(10, () => { push(0, -130, 1); column(t); pop(); });
    lay(6, () => wallB(t));
    lay(2.6, () => lab(t));
    lay(1, () => { safe(t); cat(); });
    lay(0.62, () => front(t));
    lay(3, () => motes(26, [200, 500, 1000, 1500], '#d8e4ff', t, 2576, { sp: 6, sz: 2.2, a: 0.5 * beam(t), wob: 14, add: 1 }));
    lay(0.8, () => motes(10, [-200, 600, 1300, 1900], '#c8c8d8', t, 2577, { sp: 9, sz: 7, a: 0.18, wob: 30 }));
    if (t > EV.oc_war && t < EV.oc_war + 0.12) whiteOut(0.45 * (1 - (t - EV.oc_war) / 0.12), '255,200,150');
  };
  DIR.occup = {
    outfit: 'director', light: { side: -1, rim: '#cfe0ff' }, grade: ['#1a2a5a', 0.16],
    act: () => [[S0.occup, 'talk'], [EV.oc_war, 'scared'], [EV.oc_japan, 'annoyed'], [EV.oc_8, 'sideeye'], [EV.oc_lock, 'suspicious'], [EV.oc_safe + 0.4, 'proud']],
    pose: (t, u, b) => { const push_ = t > EV.oc_lock - 0.3 && t < EV.oc_safe, spin = t >= EV.oc_safe && t < EV.oc_safe + 0.75, k = doorK(t);
      return Object.assign(b, { x: 410 + (push_ ? 40 * k : spin ? 40 : 0), y: 1578, s: 1.02, look: t < EV.oc_japan ? [0.1, -0.5] : t < EV.oc_lock - 0.3 ? [-0.3, -0.6] : [0.9, -0.1],
        hand: push_ ? [lerp(250, 330, k), -330] : spin ? [420 + Math.cos(t * 9) * 60, -295 + Math.sin(t * 9) * 60] : undefined, handF: push_ ? [lerp(230, 320, k), -260] : undefined,
        tilt: push_ ? 0.1 * k : 0, squash: t > EV.oc_war && t < EV.oc_war + 0.25 ? 0.14 : t > EV.oc_lock + 0.14 && t < EV.oc_lock + 0.3 ? 0.1 : b.squash, chatter: t > EV.oc_war && t < EV.oc_japan ? 1 : 0 }); },
    cam: () => [[S0.occup, 480, 900, 0.0], [EV.oc_war, 500, 920, 0.06], [EV.oc_war + 0.2, 520, 880, 0.14, 'x'], [EV.oc_8, 560, 960, 0.06], [EV.oc_lock, 680, 1080, 0.14], [EV.oc_lock + 0.2, 720, 1100, 0.24, 'x'], [S1.occup, 740, 1100, 0.3]],
    hud
  };
  TRANS_IN.occup = { a: 0.2, b: 0.3, fx(k, t, A, B) {               // жалюзи падают сверху ламелями: закрывают кадр, затем поворачиваются и открывают лабораторию
    drawBuf(k < 0.5 ? A : B); const n = 14, hh = H / n;
    scr(() => { for (let i = 0; i < n; i++) { const d = k < 0.5 ? clamp(k * 2 * 1.8 - i / n * 0.8) : 1 - clamp((k - 0.5) * 2 * 1.8 - (n - i) / n * 0.8); if (d <= 0) continue; const g = ctx.createLinearGradient(0, i * hh, 0, i * hh + hh * d); g.addColorStop(0, '#d8d0b8'); g.addColorStop(1, '#6a6450'); ctx.fillStyle = g; ctx.fillRect(0, i * hh, W, hh * d + 1); ctx.fillStyle = '#1a1814'; ctx.fillRect(0, i * hh + hh * d - 3, W, 3); } ctx.fillStyle = '#5a5648'; for (const x of [220, 860]) ctx.fillRect(x, 0, 5, H); });
  } };
})();
