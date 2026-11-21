/* 032 — сцена `mine` (s5, 1935 → 1941). Угольная лава шахты «Центральная-Ирмино»: низкая кровля на деревянных стойках,
   блестящий пласт угля, отбойный молоток. Главный свет — подвесная лампа и фонари касок, вокруг темнота.
   Стаханов рубит уголь, вокруг — фотограф с магниевой вспышкой, парторг с блокнотом, вагонетка на рельсах, пони-коногон, канарейка в клетке, крыса.
   На «сто две тонны» — счётчик 0 → 102 Т · 14 НОРМ; на «с бригадой» — свет расходится и открывает двух крепильщиков и двух откатчиков
   (стрелки-подписи); на «оккупация» — лампы гаснут, красноватая тьма, плашка «1941–1943 · ОККУПАЦИЯ ≈ 2 ГОДА». Переход — вагонетка через кадр. */
(() => {
  EV.mn_stak = wtk('s5', 'Стаханов');
  EV.mn_102 = wtk('s5', 'сто');
  EV.mn_team = wtk('s5', 'бригадой.') - 0.1;
  EV.mn_occ = wtk('s5', 'оккупация.') - 0.15;
  KEYW.push('тонны', 'бригадой.', 'оккупация.');
  const L = DB.ink, LMP = [600, 760];
  const dark = t => clamp((t - EV.mn_occ) / 0.4);
  function rock(t) { vgrad(-900, 1300, ['#14100e', '#2a221c', '#1a1612'], 1);
    for (let i = 0; i < 8; i++) { const y = 600 + i * 90, r = rng(8900 + i); pencil([[-300, y + r() * 30], [500, y - 20 + r() * 40], [1400, y + r() * 30]], { w: 3, col: '#3a3028', a: 0.6, pass2: false }); }
    poly([[-400, 820], [1500, 780], [1500, 1160], [-400, 1200]], { wash: '#0e0e12', washA: 1, w: 2, col: '#000' }); const r = rng(8910); for (let i = 0; i < 60; i++) ell(r() * 1900 - 400, 820 + r() * 360, 6 + r() * 12, 3 + r() * 6, { wash: '#7a7a9a', washA: 0.5 + r() * 0.4, line: false });
    rect(-400, 500, 1900, 120, { wash: '#4a3a2c', washA: 1, w: 2, col: L }); for (let x = -400; x < 1500; x += 70) rect(x, 520, 60, 30, { wash: '#6a4a2a', washA: 1, w: 1.2, col: L });
    pencil([[-400, 640], [1500, 620]], { w: 14, col: '#5a5a62', pass2: false }); for (let x = -300; x < 1500; x += 300) rect(x, 610, 16, 40, { wash: '#3a3a40', washA: 1, w: 1, col: L }); }
  function props_(t) {                                              // стойки крепи, лампа, канарейка, бригада (видна на «с бригадой»)
    for (let i = 0; i < 7; i++) propPit(-260 + i * 260, 1300, 680, 1);
    const lk = 1 - dark(t); glow(LMP[0], LMP[1] + 100, 620, 'rgba(255,210,130,1)', 0.32 * lk); rays(LMP[0], LMP[1], 1.57, 0.9, 900, 'rgba(255,230,170,1)', 0.12 * lk, 7, t);
    for (const [x, y] of [[200, 900], [1000, 880]]) { glow(x, y, 260, 'rgba(255,200,120,1)', 0.2 * lk); push(x, y, 0.8); rect(-20, -30, 40, 46, { wash: '#3a3a40', washA: 1, w: 1.6, col: L }); ell(0, 0, 14, 16, { wash: lk > 0.5 ? '#fff0b0' : '#3a2a20', washA: 1, w: 1.2, col: L }); pop(); }
    push(LMP[0], LMP[1], 1); pencil([[0, -140], [0, -40]], { w: 3, col: '#2a2a30', pass2: false }); rect(-26, -40, 52, 60, { wash: '#3a3a40', washA: 1, w: 2, col: L }); ell(0, 0, 20, 24, { wash: dark(t) > 0.5 ? '#3a2a20' : '#fff0b0', washA: 1, w: 1.6, col: L }); pop();
    push(980, 860, 1); rect(-40, -60, 80, 80, { wash: false, w: 2, col: '#c8a860' }); for (let q = -30; q <= 30; q += 12) pencil([[q, -60], [q, 20]], { w: 1.2, col: '#c8a860', pass2: false }); ell(0, -10, 16, 12, { wash: '#f8e040', washA: 1, w: 1.2, col: L }); ell(12, -18, 7, 7, { wash: '#f8e040', washA: 1, w: 1, col: L }); pop();
    const tk = clamp((t - EV.mn_team) / 0.4);
    const team = [[-120, 'КРЕПИЛЬЩИК', 'axe'], [140, 'КРЕПИЛЬЩИК', 'axe'], [1060, 'ОТКАТЧИК', null], [1220, 'ОТКАТЧИК', null]];
    team.forEach(([x, lb, pr], i) => { human(x, 1320, 0.68, t, { body: '#2a2a34', hat: 'cap', hatCol: '#e8c030', legs: '#1a1a20', armR: pr ? 'hold' : 'swing', prop: pr || undefined, propAng: Math.sin(t * 6 + i) * 0.5, flip: x > 600 ? -1 : 1, seed: 8920 + i, face: 'calm' });
      if (tk > 0 && dark(t) < 0.5) { push(x, 1040, tk); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.85)'; ctx.font = '600 30px Osw'; const w = ctx.measureText(lb).width + 24; ctx.fillRect(-w / 2, -24, w, 44); ctx.restore(); txt(lb, 0, 0, 30, { col: DB.brassL, font: 'Osw' }); pencil([[0, 22], [0, 70]], { w: 3, col: DB.brassL, pass2: false }); pop(); } });
    if (tk < 1 && dark(t) < 0.5) scr(() => { ctx.save(); ctx.globalAlpha = 0.4 * (1 - tk); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 330, H); ctx.fillRect(820, 0, 400, H); ctx.restore(); });
  }
  function floor(t) {                                               // почва лавы: рельсы, вагонетка, пони, Стаханов с молотком, фотограф, парторг, крыса, обломки
    rect(-500, 1300, 2200, 1000, { wash: '#2a241e', washA: 1, w: 2, col: L, shade: { gap: 11, a: 0.2, col: '#0a0806', ang: 0.2 } }); rails(-500, 1600, 1560, '#3a2a1a');
    const r = rng(8930); for (let i = 0; i < 50; i++) ell(r() * 2000 - 400, 1320 + r() * 560, 6 + r() * 18, 4 + r() * 8, { wash: '#121216', washA: 1, w: 1, col: '#000', a: 0.8 });
    push(1040, 1560, 1); cart(0, 0, 1, t); pop(); push(1260, 1560, 0.9); ell(0, -70, 70, 36, { wash: '#6a5a4a', washA: 1, w: 2, col: L }); ell(66, -100, 20, 30, { wash: '#6a5a4a', washA: 1, w: 1.6, col: L, rot: 0.6 }); for (const lx of [-40, -20, 20, 40]) pencil([[lx, -40], [lx, 0]], { w: 7, col: '#4a3a2a', pass2: false }); pop();
    const hm = t > EV.mn_stak - 0.2 && dark(t) < 0.5; human(700, 1500, 0.9, t, { body: '#2a2a34', hat: 'cap', hatCol: '#e8c030', legs: '#1a1a20', armR: 'hold', flip: -1, seed: 8940, face: hm ? 'grin' : 'calm' });
    push(650, 1300 + (hm ? Math.sin(t * 40) * 4 : 0), 1, -0.3); rect(-12, -10, 24, 160, { wash: '#4a4a52', washA: 1, w: 2, col: L }); rect(-26, -30, 52, 30, { wash: '#2a2a30', washA: 1, w: 2, col: L }); pencil([[0, 150], [0, 200]], { w: 6, col: '#8a8a90', pass2: false }); pop();
    if (hm) { rays(690, 1380, -2.6, 0.25, 700, 'rgba(255,240,190,1)', 0.18, 4, t); glow(560, 1150, 200, 'rgba(255,230,170,1)', 0.25); }
    if (hm) for (let q = 0; q < 8; q++) { const k = ((t * 3 + q / 8) % 1); ell(560 - k * 120 + q * 6, 1240 + k * 240, 10, 8, { wash: '#141418', washA: 1, line: false }); }
    if (t > EV.mn_102 - 0.3 && dark(t) < 0.5) { human(380, 1540, 0.75, t, { body: '#4a4a52', hat: 'brim', hatCol: '#2a2a30', legs: '#2a2a30', armR: 'hold', seed: 8945, face: 'grin' }); push(420, 1400, 0.75); rect(-30, -24, 60, 44, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); ell(0, -2, 12, 12, { wash: '#6a8aa8', washA: 1, w: 1.4, col: L }); pop();
      const fl = (t - EV.mn_102 + 0.3) % 0.8; if (fl < 0.12) glow(420, 1380, 300, 'rgba(255,255,255,1)', 0.7 * (1 - fl / 0.12)); }
    human(160, 1580, 0.78, t, { body: '#3a3a3a', hat: 'cap', hatCol: '#2a2a30', legs: '#2a2a30', armR: 'hold', prop: 'scroll', seed: 8950, face: t > EV.mn_102 ? 'shock' : 'calm' });
    push(-60, 1880, 0.7); ell(0, -14, 26, 14, { wash: '#5a4a44', washA: 1, w: 1.4, col: L }); pencil([[-26, -10], [-60, -16]], { w: 2, col: '#8a6a6a', pass2: false }); pop();
    for (let i = 0; i < 5; i++) ell(r() * 1600 - 200, 1800 + r() * 200, 40, 18, { wash: '#1a1a20', washA: 1, w: 1.4, col: '#000' });
    const lk = 1 - dark(t); lightPool(LMP[0], 1600, 900, 200, 'rgba(255,230,160,1)', 0.45 * lk); castShadow(330, 1650, 120, 520, 0.3, 0.4); moodDark(-500, 600, 2200, 1900, '#000000', 0.12 + 0.4 * dark(t));
  }
  function front(t) { propPit(-120, 2200, 900, 1.4); propPit(1220, 2200, 900, 1.4); for (let q = 0; q < 6; q++) ell(300 + q * 90, 2000 + (q % 2) * 30, 60, 30, { wash: '#0e0e12', washA: 1, w: 1.6, col: '#000' }); }
  WORLD.mine = (t, u, cat) => {
    lay(12, () => rock(t)); lay(3.2, () => props_(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(40, [-100, 600, 1200, 1700], '#d8d0c0', t, 8960, { sp: 1, sz: 2.4, a: 0.5, wob: 24 }));
    if (dark(t) > 0) scr(() => { ctx.save(); ctx.globalAlpha = 0.55 * dark(t); ctx.fillStyle = '#2a0806'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.mine = {
    outfit: 'miner', light: { side: 1, rim: '#ffe0a0' }, grade: ['#1a1008', 0.08],
    act: () => [[S0.mine, 'talk'], [EV.mn_stak, 'awe'], [EV.mn_102, 'shock'], [EV.mn_team, 'sideeye'], [EV.mn_occ, 'scared']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.8), x = lerp(120, 300, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.92, walk: w1 < 1 ? t * 9 : 0, look: t > EV.mn_team && t < EV.mn_occ ? [-0.6, -0.2] : [0.8, -0.3], hand: t > EV.mn_team && t < EV.mn_occ ? [180, -440] : [150, -300], point: t > EV.mn_team && t < EV.mn_occ }); },
    hud: t => { if (t > EV.mn_102 - 0.1 && t < EV.mn_occ) { const n = Math.round(102 * clamp((t - EV.mn_102) / 0.9)); infoPlate(560, 790, [[n + ' Т ЗА СМЕНУ', 60, DB.brassL], ['14 норм · ночь на 31.08.1935', 30]], t, EV.mn_102 - 0.1); }
      if (t > EV.mn_occ) infoPlate(560, 820, [['1941–1943 · ОККУПАЦИЯ', 54, '#ffb0a0'], ['Донбасс под немецкой оккупацией ≈ 2 года', 30]], t, EV.mn_occ + 0.1, { edge: '#c8281e' }); },
    cam: () => [[S0.mine, 560, 960, -0.04], [EV.mn_stak, 620, 1040, 0.04], [EV.mn_102, 560, 1000, 0.06, 'x'], [EV.mn_team, 600, 960, -0.06], [EV.mn_occ, 520, 1080, 0.08, 'x'], [S1.mine, 520, 1100, 0.1]]
  };
  TRANS_IN.mine = { a: 0.08, b: 0.36, fx(k, t, A, B) {            // вагонетка с углём проносится через кадр и утаскивает старую сцену
    const e = sm(k), x = -700 + e * 2400; drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W + 800, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); push(x - 40, 1500, 3.2); cart(0, 0, 1, t); pop(); }); } };
})();
