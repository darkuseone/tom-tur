/* 032 — сцена `war22` (s8, 2022). Мариуполь после осады: серое небо в дыму, вдали — трубы Азовстали и море, разрушенные пятиэтажки
   с выбитыми окнами, руины драмтеатра с колоннами и надписью «ДЕТИ» на земле перед ним; люди без оружия — несут канистры с водой,
   катят велосипед с сумками, бабушка с тележкой, собака, кот на обломках; сгоревшие легковушки, обломки, бельё на уцелевшем балконе.
   Главный свет — бледное солнце сквозь дым справа. Без боёв, тел, техники и символики.
   На «вторжение» — плашка «24.02.2022 · ВТОРЖЕНИЕ», затем «МАРИУПОЛЬ: ДО 90 % ЖИЛЬЯ ПОВРЕЖДЕНО (ООН)»;
   на «объявила» — КАРТА: обе области под штриховкой, печать «„АННЕКСИЯ“ · 30.09.2022». Переход — серая пыль от удара (без взрыва в кадре). */
(() => {
  EV.w22_inv = wtk('s8', 'вторжение.') - 0.1;
  EV.w22_ann = wtk('s8', 'объявила') - 0.1;
  KEYW.push('вторжение.', 'своим.');
  const L = DB.ink, SUN = [920, 420];
  function sky(t) { vgrad(-900, 1100, ['#4a4a52', '#7a7a80', '#a8a4a0', '#c8c0b0'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,245,220,1)', 0.35);
    for (let i = 0; i < 6; i++) { const r = rng(9200 + i), y = 200 + i * 110, dx = (t * 16) % 300; blob([[-300 + dx, y], [300 + r() * 200 + dx, y - 40], [900 + dx, y - 10], [1500, y + 30], [200, y + 40]], { wash: '#3a3a40', washA: 0.25, line: false }); } }
  function far(t) {                                                 // море, Азовсталь с трубами, дым
    rect(-500, 940, 2200, 100, { wash: '#5a7088', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 10; i++) pencil([[-300 + i * 180, 970 + (i % 3) * 18], [-240 + i * 180, 970 + (i % 3) * 18]], { w: 2, col: '#a8c0d8', a: 0.5, pass2: false });
    for (let i = 0; i < 5; i++) { const x = 880 + i * 70, h = 220 + (i % 2) * 60; rect(x - 12, 960 - h, 24, h, { wash: '#4a4044', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) { const k = ((t * 0.2 + q / 3 + i * 0.2) % 1); ell(x + k * 60, 960 - h - k * 200, 30 + k * 60, 20 + k * 40, { wash: '#2a2a2e', washA: 0.35 * (1 - k), line: false }); } }
    rect(760, 860, 480, 100, { wash: '#3a3438', washA: 1, w: 1.6, col: L }); depthFog('#b0aca8', 0.2); }
  function ruins(t) {                                               // пятиэтажки-руины, драмтеатр, «ДЕТИ», люди
    khrush(-460, 1240, 300, 380, '#a8a49a', t, { seed: 9210, ruin: 0.5, skyCol: '#8a8a8e' }); khrush(-140, 1240, 260, 300, '#b8b0a0', t, { seed: 9211, ruin: 0.35, skyCol: '#8e8e92' }); khrush(1040, 1240, 320, 400, '#a8a090', t, { seed: 9212, ruin: 0.55, skyCol: '#8a8a8e' });
    push(1150, 1000, 0.8); for (let q = 0; q < 3; q++) rect(-60 + q * 40, -10, 30, 40, { wash: ['#e86a5a', '#f4f0e6', '#5a8ad0'][q], washA: 1, line: false }); pop();
    push(520, 1240, 0.8); rect(-380, -40, 760, 40, { wash: '#c8c0b0', washA: 1, w: 2, col: L }); rect(-340, -380, 680, 60, { wash: '#b8b0a0', washA: 1, w: 2, col: L });
      for (let q = 0; q < 8; q++) { const x = -300 + q * 86, hh = q === 2 || q === 5 ? 180 : 340; rect(x - 18, -40 - hh, 36, hh, { wash: '#d8d0c0', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.2, col: '#6a6050', ang: 1.57 } }); }
      poly([[-360, -380], [-80, -470], [60, -420], [120, -380]], { wash: '#a8a090', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) ell(-280 + q * 110, -10, 50, 20, { wash: '#8a8478', washA: 1, w: 1.4, col: L }); ell(200, -420, 80, 40, { wash: '#2a2a2e', washA: 0.4, line: false }); pop();
    const P = [[60, '#5a4a3a', 'scarf', 'can'], [200, '#3a4a5a', 'cap', 'can'], [760, '#6a3a3a', null, 'bag'], [880, '#4a5a4a', 'fur', 'can'], [1320, '#5a5a6a', 'scarf', 'bag']];
    P.forEach(([x, c, h, it], i) => { const xx = x + Math.sin(t * 0.3 + i) * 20; human(xx, 1320, 0.6, t, { body: c, hat: h, hatCol: '#3a3a40', legs: '#2a2a30', long: h === 'scarf' ? 1 : undefined, armR: 'hold', seed: 9220 + i, face: 'calm', flip: i % 2 ? -1 : 1 });
      push(xx + 34, 1300, 0.6); if (it === 'can') { rect(-24, -60, 48, 60, { wash: '#e8e0c8', washA: 1, w: 1.6, col: L }); rect(-8, -72, 16, 12, { wash: '#2a5aa8', washA: 1, w: 1, col: L }); } else rect(-30, -50, 60, 50, { wash: '#8a6a4a', washA: 1, w: 1.6, col: L }); pop(); });
    push(620, 1310, 0.6); ell(-50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); ell(60, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-50, -30], [0, -80], [60, -30]], { w: 4, col: '#3a6a3a', pass2: false }); rect(-20, -110, 60, 40, { wash: '#a87a4a', washA: 1, w: 1.4, col: L }); pop();
  }
  function ground(t) {                                              // битый асфальт, обломки плит, арматура, сгоревшие легковушки, кот, собака, бумаги
    rect(-500, 1300, 2200, 1000, { wash: '#7a746c', washA: 1, w: 2, col: L, shade: { gap: 11, a: 0.15, col: '#3a3630', ang: 0.2 } });
    const r = rng(9230); for (let i = 0; i < 40; i++) { const x = r() * 2000 - 400, y = 1340 + r() * 560; poly([[x, y], [x + 20 + r() * 40, y - 10 - r() * 20], [x + 50 + r() * 40, y + 4]], { wash: i % 3 ? '#a8a49c' : '#8a847a', washA: 1, w: 1.2, col: L }); }
    txt('Д Е Т И', 600, 1390, 110, { col: '#f4f0e6', font: 'Osw', a: 0.92 });
    for (let i = 0; i < 6; i++) { const x = -200 + r() * 1600, y = 1500 + r() * 400; pencil([[x, y], [x + 30, y - 60], [x + 40, y - 90]], { w: 3, col: '#5a3a2a', pass2: false }); }
    for (const [x, y] of [[1100, 1640], [-120, 1720]]) { push(x, y, 1); poly([[-150, -20], [-120, -80], [-50, -110], [80, -110], [140, -70], [160, -20]], { wash: '#3a3030', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#1a1010', ang: 1 } }); rect(-40, -100, 90, 40, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); for (const k of [-90, 100]) ell(k, -14, 30, 30, { wash: '#2a2424', washA: 1, w: 1.6, col: L }); pop(); }
    push(840, 1600, 1); poly([[-200, 0], [-160, -80], [140, -100], [220, -10]], { wash: '#b8b0a4', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#5a5448', ang: 0.3 } }); push(60, -110, 0.9); ell(0, -16, 28, 18, { wash: '#e8a060', washA: 1, w: 1.4, col: L }); ell(24, -34, 13, 12, { wash: '#e8a060', washA: 1, w: 1.2, col: L }); poly([[18, -44], [22, -56], [28, -44]], { wash: '#e8a060', washA: 1, w: 1, col: L }); pencil([[-26, -12], [-50, -30]], { w: 4, col: '#e8a060', pass2: false }); pop(); pop();
    push(380, 1800, 0.9); ell(0, -30, 46, 24, { wash: '#8a7a6a', washA: 1, w: 1.6, col: L }); ell(44, -50, 16, 14, { wash: '#8a7a6a', washA: 1, w: 1.4, col: L }); for (const lx of [-30, -10, 20, 34]) pencil([[lx, -10], [lx, 14]], { w: 5, col: '#6a5a4a', pass2: false }); pop();
    for (let i = 0; i < 5; i++) { push(560 + i * 90, 1900 + (i % 2) * 30, 1, i * 0.7); rect(-26, -18, 52, 36, { wash: '#f0ece0', washA: 1, w: 1.2, col: L }); pop(); }
    lightPool(SUN[0] - 200, 1660, 800, 160, 'rgba(255,245,220,1)', 0.25); castShadow(330, 1650, 120, 480, -0.7, 0.3); moodDark(-400, 900, 900, 1900, '#1a1a20', 0.2);
  }
  function front(t) { push(-60, 2060, 1.3); poly([[-200, 0], [-120, -200], [80, -240], [200, -60], [180, 0]], { wash: '#5a564e', washA: 1, w: 2.4, col: L }); pencil([[-60, -200], [-90, -320]], { w: 4, col: '#4a2a1a', pass2: false }); pop();
    sil([[1180, 2300], [1220, 1580], [1360, 1560], [1400, 2300]], '#2a2824', 1); }
  function mapBeat(t) {                                             // карта: «аннексия» объявлена 30.09.2022
    const k = sm(clamp((t - EV.w22_ann) / 0.25)); if (k <= 0) return; MAPON = t;
    scr(() => { ctx.save(); ctx.translate((1 - k) * 1200, 0); const P = GLOBE.map(540, 980, 300, 38.6, 48.4, { landCol: { eurasia: '#c8bca0' } }); donMap(P, { oblCol: '#c8281e', oblA: 0.45 });
      for (const Z of [DON_OBL, LUG_OBL]) { const pts = Z.map(P); const bb = bbOf(pts); ctx.save(); ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.clip(); for (let x = bb[0] - 400; x < bb[2] + 400; x += 30) pencil([[x, bb[3]], [x + (bb[3] - bb[1]), bb[1]]], { w: 3, col: '#5a0a08', a: 0.5, pass2: false, gap: false }); ctx.restore(); }
      GLOBE.city(P, ...DON.donetsk, 'ДОНЕЦК', { size: 32, left: 1 }); GLOBE.city(P, ...DON.lugansk, 'ЛУГАНСК', { size: 32 }); GLOBE.city(P, ...DON.mariupol, 'МАРИУПОЛЬ', { size: 32, left: 1 });
      ctx.restore(); stampD(540, 760, 0.8, '«АННЕКСИЯ» · 30.09.2022', '#c8281e', -0.08, popK(t, EV.w22_ann + 0.2, 0.3)); infoPlate(540, 1290, [['ОБЪЯВИЛА РОССИЯ', 40, '#ffb0a0'], ['Донецкая, Луганская, Запорожская, Херсонская обл.', 28]], t, EV.w22_ann + 0.4, { edge: '#c8281e' }); });
  }
  WORLD.war22 = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { ruins(t); depthFog('#b8b4ac', 0.06); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(40, [-100, 500, 1200, 1700], '#d8d4cc', t, 9240, { sp: 1.5, vx: 20, sz: 2.6, a: 0.45, wob: 24 }));
    mapBeat(t);
  };
  DIR.war22 = {
    outfit: 'pufferG', light: { side: 1, rim: '#f4f0e0' }, grade: ['#2a2a2a', 0.1],
    act: () => [[S0.war22, 'neutral'], [EV.w22_inv, 'annoyed'], [EV.w22_ann, 'suspicious']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(80, 320, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 8 : 0, look: [0.8, -0.2], hand: [140, -300] }); },
    hud: t => { if (t > EV.w22_ann) return; infoPlate(560, 790, [['24.02.2022 · ВТОРЖЕНИЕ', 52, '#ffb0a0']], t, EV.w22_inv, { edge: '#c8281e' });
      infoPlate(560, 920, [['МАРИУПОЛЬ: ДО 90 % ЖИЛЬЯ', 40, '#fff6e0'], ['повреждено или разрушено (ООН)', 28]], t, EV.w22_inv + 0.6); },
    cam: () => [[S0.war22, 580, 940, -0.08], [EV.w22_inv, 540, 1000, -0.02, 'x'], [EV.w22_ann, 500, 1080, 0.06], [S1.war22, 500, 1090, 0.08]]
  };
  TRANS_IN.war22 = { a: 0.06, b: 0.42, fx(k, t, A, B) {           // серая пыль бетона накрывает кадр и оседает
    const e = sm(k); if (e < 0.45) drawBuf(A); else drawBuf(B); scr(() => { const a = Math.sin(e * Math.PI), rr = rng(9250); for (let i = 0; i < 34; i++) { const x = rr() * W, y = rr() * H, s = (160 + rr() * 260) * (0.6 + e); ell(x, y + e * 200, s, s * 0.6, { wash: '#9a968e', washA: a * 0.95, line: false }); } }); } };
})();
