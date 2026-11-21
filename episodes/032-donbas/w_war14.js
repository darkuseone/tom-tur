/* 032 — сцена `war14` (s7, 2014). Ночной Донецк: стадион-«чаша» и пятиэтажки с редкими окнами, дальний оранжевый отсвет на горизонте
   (без взрывов и боёв в кадре), пустой проспект, баррикада из шин и мешков без флагов и символики, брошенный троллейбус,
   семьи с чемоданами и детьми уходят к автобусу «ЭВАКУАЦИЯ», собака, фонари (главный свет — холодный фонарь справа, тёплый отсвет слева).
   На «России» — КАРТА: заштрихована зона 2014–2022, плашка «ЕСПЧ (2025): эффективный контроль России с 11.05.2014»;
   на «четырнадцать тысяч» — счётчик 0 → 14 000 погибших (2014–2021, ООН), из них ≥ 3 400 мирных. Переход — фонарь гаснет. */
(() => {
  EV.w14_rus = wtk('s7', 'России') - 0.1;
  EV.w14_war = wtk('s7', 'война:');
  EV.w14_14k = wtk('s7', 'четырнадцать') - 0.1;
  const MAPOFF = EV.w14_war + 0.35;
  KEYW.push('России', 'война:', 'погибших.');
  const L = DB.ink, LMP = [980, 820];
  function sky(t) { vgrad(-900, 1100, ['#0a0e1c', '#141c34', '#2a2a44', '#4a3040'], 1); const r = rng(9100); for (let i = 0; i < 60; i++) ell(r() * 1600 - 200, r() * 700 - 300, 1.6, 1.6, { wash: '#ffffff', washA: 0.4 + r() * 0.5, line: false });
    glow(-100, 1060, 500, 'rgba(255,120,50,1)', 0.25 + Math.sin(t * 2) * 0.05); ell(840, 260, 40, 40, { wash: '#e8e8f0', washA: 0.9, line: false }); }
  function far(t) {                                                 // стадион-чаша, город, краны
    push(760, 1060, 0.9); ell(0, -80, 360, 110, { wash: '#2a3040', washA: 1, w: 2, col: '#0a0a14' }); pencil(ellPts(0, -150, 340, 60, 0, 0, 50), { w: 4, col: '#6a8ab8', a: 0.6, pass2: false }); for (let q = 0; q < 10; q++) pencil([[-300 + q * 66, -150], [-310 + q * 68, -20]], { w: 2, col: '#4a5a7a', pass2: false }); pop();
    for (let i = 0; i < 6; i++) khrush(-420 + i * 260, 1060, 230, 230 + (i % 3) * 50, '#3a3a48', t, { seed: 9110 + i, night: 1, lit: 0.12, noBalc: 1 });
    terricon(1240, 1060, 400, 200, t, { seed: 9115, col: '#1e1a24', grass: '#2a2a2a' }); depthFog('#1a1a2a', 0.15); }
  function street(t) {                                              // проспект: троллейбус, баррикада, деревья, фонари, беженцы, автобус
    for (let i = 0; i < 4; i++) { const x = -200 + i * 380; pencil([[x, 1260], [x + 6, 1050]], { w: 10, col: '#1a1410', pass2: false }); blob([[x - 90, 1060], [x - 60, 960], [x + 10, 920], [x + 80, 960], [x + 100, 1060]], { wash: '#1a2a24', washA: 1, w: 1.6, col: '#000' }); }
    push(160, 1270, 0.75); rect(-260, -200, 520, 160, { wash: '#4a5a6a', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.25, col: '#1a2028', ang: 1.4 } }); for (let q = 0; q < 6; q++) rect(-240 + q * 80, -180, 60, 60, { wash: '#141a22', washA: 1, w: 1.2, col: L }); pencil([[-100, -200], [-60, -320]], { w: 3, col: '#2a2a30', pass2: false }); pencil([[60, -200], [100, -320]], { w: 3, col: '#2a2a30', pass2: false }); for (const k of [-180, 160]) ell(k, -40, 34, 34, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); pop();
    push(1080, 1280, 0.75); rect(-240, -220, 480, 180, { wash: '#c8a838', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) rect(-220 + q * 90, -200, 70, 70, { wash: '#ffe0a0', washA: 1, w: 1.2, col: L }); rect(-200, -110, 400, 40, { wash: '#1a1a1e', washA: 1, line: false }); txt('ЭВАКУАЦИЯ', 0, -88, 32, { col: '#ffe08a', font: 'Osw' }); for (const k of [-160, 160]) ell(k, -36, 36, 36, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); pop();
    const P = [[480, '#5a4a6a', 'scarf', 1], [580, '#3a4a5a', 'cap', 0], [680, '#7a3a3a', null, 1], [760, '#4a5a3a', 'scarf', 0], [860, '#5a5a6a', 'fur', 1], [1300, '#3a3a4a', 'cap', 0]];
    P.forEach(([x, c, h, bag], i) => { const xx = x + (t - S0.war14) * 40; human(xx, 1300, 0.6, t, { body: c, hat: h, hatCol: '#2a2a30', legs: '#1a1a22', long: h === 'scarf' ? 1 : undefined, armR: 'hold', seed: 9120 + i, face: 'sad', flip: 1 });
      if (bag) { push(xx + 30, 1280, 0.6); rect(-30, -70, 60, 70, { wash: ['#8a3a2a', '#2a5a8a'][i % 2], washA: 1, w: 1.6, col: L }); pencil([[-12, -70], [-12, -86], [12, -86], [12, -70]], { w: 2.4, col: L, pass2: false }); pop(); } });
    human(620, 1300, 0.38, t, { body: '#e8a040', hat: 'cap', hatCol: '#c83a3a', legs: '#2a2a50', armR: 'hold', seed: 9130, face: 'calm' });
  }
  function ground(t) {                                              // асфальт, разметка, баррикада из шин и мешков, лужи с отражениями, мусор, кот, собака
    rect(-500, 1300, 2200, 1000, { wash: '#3a3a46', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.15, col: '#0a0a10', ang: 0.15 } });
    for (let i = 0; i < 8; i++) rect(-300 + i * 230, 1480, 120, 12, { wash: '#a8a8a0', washA: 0.5, line: false });
    const r = rng(9140); for (let i = 0; i < 30; i++) ell(r() * 2000 - 400, 1340 + r() * 560, 10 + r() * 20, 4 + r() * 8, { wash: '#1a1a22', washA: 1, w: 1, col: L, a: 0.5 });
    push(760, 1660, 1); for (let q = 0; q < 7; q++) { const x = -220 + q * 70, y = -(q % 2) * 40; ell(x, y - 30, 46, 30, { wash: '#24242a', washA: 1, w: 2, col: '#000' }); ell(x, y - 30, 20, 12, { wash: '#0a0a0e', washA: 1, line: false }); pencil([[x - 30, y - 50], [x + 20, y - 56]], { w: 3, col: '#8aa0d0', a: 0.6, pass2: false }); }
      for (let q = 0; q < 5; q++) ell(-160 + q * 80, -110, 50, 24, { wash: '#8a7a5a', washA: 1, w: 1.6, col: L, shade: { gap: 5, a: 0.2, col: '#4a3a2a', ang: 0.2 } }); pop();
    for (const [x, y] of [[380, 1760], [1100, 1820]]) { ell(x, y, 120, 22, { wash: '#2a3448', washA: 1, w: 1.4, col: L }); pencil([[x - 60, y - 4], [x + 50, y - 4]], { w: 3, col: '#8aa8d8', a: 0.5, pass2: false }); }
    push(1180, 1700, 0.9); ell(0, -30, 46, 24, { wash: '#6a5a4a', washA: 1, w: 1.6, col: L }); ell(44, -50, 16, 14, { wash: '#6a5a4a', washA: 1, w: 1.4, col: L }); pencil([[-40, -36], [-70, -50]], { w: 5, col: '#6a5a4a', pass2: false }); for (const lx of [-30, -10, 20, 34]) pencil([[lx, -10], [lx, 14]], { w: 5, col: '#5a4a3a', pass2: false }); pop();
    for (let i = 0; i < 4; i++) { push(-60 + i * 120, 1900 + (i % 2) * 30, 1, i * 0.5); rect(-30, -20, 60, 40, { wash: '#4a4a52', washA: 1, w: 1.2, col: L }); pop(); }
    push(LMP[0] + 200, 1300, 0.8); pencil([[0, 0], [0, -620]], { w: 10, col: '#2a2a30', pass2: false }); pencil([[0, -620], [-120, -640]], { w: 6, col: '#2a2a30', pass2: false }); rect(-150, -650, 60, 24, { wash: '#f0f4ff', washA: 1, w: 1.6, col: L }); pop();
    glow(LMP[0] + 80, 800, 260, 'rgba(210,225,255,1)', 0.3); lightPool(LMP[0], 1600, 800, 180, 'rgba(200,215,255,1)', 0.3); castShadow(330, 1650, 120, 520, -0.8, 0.35); moodDark(-400, 900, 900, 1900, '#000010', 0.2); for (let i = 0; i < 10; i++) pencil([[LMP[0] - 200 + i * 40, 1500], [LMP[0] - 220 + i * 44, 1900]], { w: 3, col: '#8aa0d8', a: 0.12, pass2: false });
  }
  function front(t) { sil([[-200, 2300], [-150, 1600], [20, 1580], [60, 2300]], '#08080e', 1); for (let q = 0; q < 3; q++) ell(1100 + q * 80, 2040, 80, 40, { wash: '#121216', washA: 1, w: 1.6, col: '#000' }); }
  function mapBeat(t) {                                             // карта 2014: зона 2014–2022, ЕСПЧ
    const k = sm(clamp((t - EV.w14_rus) / 0.25)) * (1 - sm(clamp((t - MAPOFF) / 0.25))); if (k <= 0) return; MAPON = t;
    scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(540, 980, 300, 38.6, 48.2, { landCol: { eurasia: '#c8bca0' } }); donMap(P, { oblCol: '#e8c878', oblA: 0.5 });
      GLOBE.zone(P, Z2014, '#3a3a44', 0.55, { w: 4, dash: true }); const [zx, zy] = P([38.9, 48.2]); txt('2014–2022', zx, zy, 44, { col: '#ffffff', font: 'Osw' });
      GLOBE.city(P, ...DON.donetsk, 'ДОНЕЦК', { size: 32, left: 1 }); GLOBE.city(P, ...DON.lugansk, 'ЛУГАНСК', { size: 32 }); GLOBE.city(P, ...DON.mariupol, 'МАРИУПОЛЬ', { size: 32, left: 1 }); GLOBE.city(P, ...DON.kram, 'КРАМАТОРСК', { size: 30, left: 1 });
      const [rx, ry] = P([40.4, 49.2]); txt('РОССИЯ', rx, ry, 50, { col: '#5a3a20', font: 'Osw' }); ctx.restore();
      infoPlate(540, 1390, [['ЕСПЧ, 2025: КОНТРОЛЬ РОССИИ', 40, '#ffb0a0'], ['над «ДНР»/«ЛНР» — не позднее 11.05.2014', 30]], t, EV.w14_rus + 0.15, { edge: '#c8281e' }); });
  }
  WORLD.war14 = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { street(t); depthFog('#141a2a', 0.06); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(30, [-100, 500, 1200, 1700], '#c8c0d0', t, 9150, { sp: 2, sz: 2.2, a: 0.4, wob: 20 }));
    mapBeat(t);
  };
  DIR.war14 = {
    outfit: 'pufferA', light: { side: 1, rim: '#c8d8ff' }, grade: ['#0a1020', 0.1],
    act: () => [[S0.war14, 'neutral'], [EV.w14_rus, 'suspicious'], [EV.w14_war, 'scared'], [EV.w14_14k, 'scared']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.0), x = lerp(80, 320, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 8 : 0, look: [0.8, -0.3], hand: [140, -300] }); },
    hud: t => { if (t < EV.w14_14k) return; const n = Math.round(14000 * clamp((t - EV.w14_14k) / 1.0) / 100) * 100;
      infoPlate(560, 800, [[(n >= 1000 ? Math.floor(n / 1000) + ' ' + String(n % 1000).padStart(3, '0') : n) + ' ПОГИБШИХ', 60, '#ffb0a0'], ['2014–2021 · УВКПЧ ООН (14 200–14 400)', 30], ['из них ≥ 3 400 мирных', 30]], t, EV.w14_14k, { edge: '#c8281e' }); },
    cam: () => [[S0.war14, 560, 960, -0.06], [EV.w14_rus, 540, 1000, -0.02], [MAPOFF, 520, 1060, 0.04], [EV.w14_14k, 480, 1100, 0.1], [S1.war14, 480, 1110, 0.12]]
  };
  TRANS_IN.war14 = { a: 0.06, b: 0.42, fx(k, t, A, B) {            // свет гаснет: старая сцена уходит в черноту, новая проступает из темноты
    const e = sm(k); if (e < 0.5) { drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = e * 2; ctx.fillStyle = '#04040a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); }
    else { drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = (1 - e) * 2; ctx.fillStyle = '#04040a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); } } };
})();
