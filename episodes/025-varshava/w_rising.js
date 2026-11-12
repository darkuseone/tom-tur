/* 025 — сцена `rising`: август–октябрь 1944, Варшавское восстание. Ночь, улица Старого города: баррикада из брусчатки, перевёрнутого
   трамвая, мешков и мебели; повстанцы в куртках и касках-трофеях с бело-красными повязками, связная с сумкой, мальчик-почтальон,
   санитарка с ящиком (крест не рисуем — только белая сумка), бело-красный флаг на балконе, ящик с бутылками. Дальше — горящие крыши.
   Том в гимнастёрке с повязкой. На «восстал» он кладёт камень на баррикаду, флаг разворачивается, все поднимают руки;
   на «шестьдесят три» отрывной календарь листается 1 → 63; на «После» свет гаснет до серого, баррикада пустеет, по улице идут серые
   силуэты в касках (без знаков) с листом; на «дом за домом» дома в глубине по очереди оседают в пыль с глухим ударом;
   на «По списку» — лист с адресами, строки зачёркиваются. Главный свет — оранжевое зарево справа; после «После» — холодный серый.
   Переход В сцену — клуб дыма заволакивает кадр и рассеивается. */
(() => {
  EV.ri_up = wtk('s4', 'восстал');
  EV.ri_63 = wtk('s4', 'шестьдесят');
  EV.ri_after = wtk('s4', 'После');
  EV.ri_blow = wtk('s4', 'дом');
  EV.ri_list = wtk('s4', 'списку.');
  KEYW.push('восстал', 'дня.', 'взрывали', 'списку.');
  const BL = [0, 0.45, 0.9, 1.35].map(d => EV.ri_blow + d);
  BL.forEach((b, i) => SHAKES.push([b, 0.3, 7 + i]));
  const L = WA.ink, after = t => clamp((t - EV.ri_after) / 0.4), blowK = (t, i) => clamp((t - BL[i]) / 0.7);
  function sky(t) { const a = after(t); vgrad(-900, 1400, [lerpC('#140a1a', '#2a2a30', a), lerpC('#3a1a20', '#3a3a40', a), lerpC('#8a3a1a', '#5a5654', a), lerpC('#e06a2a', '#7a7470', a)], 1);
    for (let i = 0; i < 5; i++) { const x = -200 + i * 330 + Math.sin(t * 0.3 + i) * 50; blob([[x - 220, 900], [x - 140, 560], [x, 380 + Math.sin(t + i) * 20], [x + 160, 520], [x + 240, 900]], { wash: '#1a1414', washA: 0.4, line: false }); } }
  function far(t) {                                                  // дальние крыши; глубинный ряд, который «оседает» дом за домом
    const a = after(t); for (let i = 0; i < 4; i++) { const x = -260 + i * 380, k = blowK(t, i), h = 520 * (1 - 0.85 * sm(k));
      ctx.save(); ctx.beginPath(); ctx.rect(x - 200, 1100 - h - 300, 400, h + 300); ctx.clip(); kam(x, 1100, 330, 520, { col: ['#8a5a4a', '#6a6a7a', '#9a7a5a', '#7a4a3a'][i], floors: 5, cols: 3, seed: 2651 + i, lit: a < 0.5 ? 0.3 : 0, ruin: k > 0 ? 0.4 : 0 }); ctx.restore();
      if (k > 0 && k < 1) { glow(x, 1000, 260, 'rgba(255,200,140,1)', 0.5 * (1 - k)); for (let j = 0; j < 4; j++) { const r = 80 + k * 260 + j * 30; ell(x + (j - 1.5) * 70, 1060 - k * 120, r * 0.6, r * 0.45, { wash: '#8a8480', washA: 0.6 * (1 - k * 0.6), line: false }); } }
      if (k >= 1) rubble(x - 170, x + 170, 1100, 120, 2655 + i, { n: 14, beams: 1, col: '#5a5450' }); }
    if (a < 1) for (const x of [-100, 700, 1150]) { for (let j = 0; j < 4; j++) { const h = 60 + Math.sin(t * 10 + j + x) * 20; blob([[x - 40 + j * 22, 640], [x - 30 + j * 22, 640 - h], [x - 20 + j * 22, 640]], { wash: j % 2 ? '#ffb040' : '#ff5a20', washA: 1 - a, line: false }); } glow(x, 620, 180, 'rgba(255,120,40,1)', 0.3 * (1 - a)); }
    depthFog('#3a2a2a', 0.08); }
  function street(t) {                                               // фасады улицы по краям, балкон с флагом, баррикада и повстанцы
    const a = after(t);
    kam(-260, 1330, 300, 760, { col: '#9a6a4a', floors: 6, cols: 3, seed: 2661, ruin: 0.15, lit: a < 0.5 ? 0.2 : 0 }); kam(1280, 1330, 320, 740, { col: '#7a6a5a', floors: 6, cols: 3, seed: 2662, ruin: 0.2 });
    const fl = clamp((t - EV.ri_up) / 0.4); push(1180, 860, 1); pencil([[0, 0], [-160, -60]], { w: 5, col: '#3a2a1a', pass2: false }); const wv = t2 => Math.sin(t * 6 + t2) * 10 * fl;
    shape([[-160, -60], [-160 - 130 * fl, -60 + wv(0)], [-160 - 130 * fl, -10 + wv(1)], [-160, -10]], { wash: '#f4f0ec', washA: 1, w: 1.8, col: L }); shape([[-160, -10], [-160 - 130 * fl, -10 + wv(1)], [-160 - 130 * fl, 40 + wv(2)], [-160, 40]], { wash: '#d8202a', washA: 1, w: 1.8, col: L }); pop();
    rect(-1400, 1310, 3900, 1600, { wash: '#3a3236', washA: 1, line: false }); cobbles(-1400, 2500, 1320, 2700, '#4a4048', '#2a242a', 2663, 0.9);
    // баррикада: брусчатка, мешки, перевёрнутый трамвай, шкаф
    push(560, 1440, 1); shape([[-420, 0], [-380, -90], [-200, -130], [0, -150], [220, -120], [400, -80], [440, 0]], { wash: '#5a5458', washA: 1, w: 2.6, col: L, shade: { gap: 11, a: 0.25, col: '#1a1416', ang: 0.6 } });
      for (let i = 0; i < 26; i++) { const r = rng(2664 + i), x = -380 + r() * 780, y = -20 - r() * 110; rect(x, y, 30, 18, { wash: r() < 0.5 ? '#6a6268' : '#4a4448', washA: 1, w: 1.2, col: L }); }
      push(-60, -150, 1, -0.12); rect(-170, -90, 340, 90, { wash: '#c8a040', washA: 1, w: 2.6, col: L }); rect(-170, -30, 340, 14, { wash: '#a8231c', washA: 1, line: false }); for (let i = 0; i < 5; i++) rect(-150 + i * 64, -80, 46, 40, { wash: '#1a1a22', washA: 1, w: 1.4, col: L }); for (const k of [-110, 110]) ell(k, -96, 22, 12, { wash: '#2a2a2a', washA: 1, w: 1.4, col: L }); pop();
      for (let i = 0; i < 6; i++) ell(260 + (i % 3) * 50, -40 - Math.floor(i / 3) * 34, 30, 18, { wash: '#a8946a', washA: 1, w: 1.6, col: L }); rect(-360, -170, 90, 150, { wash: '#5a3a24', washA: 1, w: 2, col: L }); pop();
    const P = (x, y, s, sd, c, ex = {}) => { human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a2e', seed: sd }, ex)); if (!ex.noBand) { rect(x - 34 * s, y - 230 * s, 22 * s, 9 * s, { wash: '#f4f0ec', washA: 1, line: false }); rect(x - 34 * s, y - 221 * s, 22 * s, 9 * s, { wash: '#d8202a', washA: 1, line: false }); } };
    const up = t > EV.ri_up && t < EV.ri_after, gone = a;
    if (gone < 1) { ctx.save(); ctx.globalAlpha = 1 - gone;
      P(330, 1300, 0.62, 2665, '#4a4a3a', { hat: 'helmet', armR: up ? 'up' : 'hold', look: [0.4, -0.3] }); P(470, 1290, 0.6, 2666, '#5a4a3a', { hat: 'cap', hatCol: '#3a3a3a', armR: up ? 'up' : 'point' }); P(640, 1296, 0.6, 2667, '#3a3e4a', { flip: -1, hat: 'helmet', armR: up ? 'up' : 'hold' });
      P(790, 1300, 0.58, 2668, '#6a5040', { flip: -1, hair: '#5a3a1a', armR: 'hold', look: [-0.4, 0] }); P(180, 1330, 0.52, 2669, '#7a5a3a', { hat: 'cap', hatCol: '#5a3a2a', armR: 'hold', prop: 'scroll' }); P(930, 1330, 0.56, 2670, '#e8e4dc', { flip: -1, hat: 'scarf', hatCol: '#f4f0ec', armR: 'hold' });
      P(1040, 1340, 0.52, 2671, '#3a3a3a', { flip: -1, hat: 'helmet', armR: 'hold' }); P(60, 1340, 0.5, 2672, '#5a5a3a', { armR: up ? 'wave' : 'down' }); ctx.restore(); }
    if (a > 0) for (let i = 0; i < 6; i++) { const x = -60 + i * 120 + (t - EV.ri_after) * 120; helmetSil(x, 1330, 1.2, t, { walk: 1, ph: i, col: '#36383c', a: a }); }
    push(470, 1440, 0.8); rect(-40, -50, 80, 50, { wash: '#6a4a26', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 4; i++) { rect(-32 + i * 18, -84, 12, 40, { wash: '#3a5a3a', washA: 1, w: 1.2, col: L }); } pop(); }
  function plane(t) {                                                // Том у края баррикады: камень в лапах; тени от зарева
    const a = after(t); castShadow(360, 1650, 170, 420, Math.PI * 0.9, 0.45 * (1 - a) + 0.1); lightPool(700, 1640, 600, 120, a < 1 ? 'rgba(255,130,60,1)' : 'rgba(180,180,190,1)', 0.35 * (1 - a) + 0.08);
    for (let i = 0; i < 7; i++) { const r = rng(2673 + i); push(600 + i * 60, 1690 + r() * 30, 1, r()); rect(-22, -12, 44, 24, { wash: '#5a5458', washA: 1, w: 1.6, col: L }); pop(); }
    moodDark(540, 900, 600, 1500, '#08060a', 0.35 + 0.2 * a); }
  function hud(t) {
    if (t > EV.ri_63 - 0.1 && t < EV.ri_after + 0.2) { const q = popK(t, EV.ri_63 - 0.1, 0.3), d = Math.max(1, Math.round(63 * sm(clamp((t - EV.ri_63) / 1.0)))); push(740, 880, q, 0.04); rect(-120, -130, 240, 260, { wash: '#f4ecd8', washA: 1, w: 3, col: L }); rect(-120, -130, 240, 60, { wash: '#a8231c', washA: 1, w: 2, col: L }); txt('ДЕНЬ', 0, -90, 34, { col: '#fff4e0', font: 'Osw' }); txt(String(d), 0, 40, 120, { col: '#1a100c', font: 'Osw' }); for (let i = 0; i < 6; i++) ell(-90 + i * 36, -130, 6, 6, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }
    if (t > EV.ri_list - 0.4) { const q = popK(t, EV.ri_list - 0.4, 0.3); push(730, 880, q, -0.03); rect(-170, -150, 340, 300, { wash: '#d8d4cc', washA: 1, w: 3, col: '#2a2a2e' }); const rows = ['Zamek Królewski', 'Katedra św. Jana', 'Rynek 1–42', 'Kolumna Zygmunta', 'Biblioteka', 'Pałac Saski'];
      rows.forEach((s, i) => { const y = -110 + i * 46; txt(s, -150, y + 14, 26, { col: '#2a2a2e', font: 'Hand', align: 'left' }); const c = clamp((t - EV.ri_list + 0.1 - i * 0.12) / 0.15); if (c > 0) pencil([[-150, y + 6], [-150 + 300 * c, y + 6]], { w: 4, col: '#4a4a4e', pass2: false }); }); pop(); }
  }
  function front(t) { const a = after(t); sil([[-700, 2400], [-700, 900], [-470, 880], [-440, 2400]], '#08060a', 1); for (let j = 0; j < 5; j++) rect(-660, 980 + j * 220, 160, 100, { wash: '#0e0a0e', washA: 1, w: 2, col: '#000' });
    sil([[1300, 2400], [1320, 1500], [1500, 1460], [1520, 2400]], '#08060a', 1); if (a < 1) glow(1400, 1420, 120, 'rgba(255,140,60,1)', 0.3 * (1 - a)); }
  WORLD.rising = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(12, () => far(t));
    lay(4, () => street(t));
    lay(1, () => { plane(t); cat(); });
    lay(6, () => motes(30, [-200, 300, 1300, 1400], after(t) < 0.5 ? '#ffa050' : '#a8a4a0', t, 2674, { sp: -50, sz: 3, a: 0.6, wob: 20, add: after(t) < 0.5 ? 1 : 0 }));
    lay(1.4, () => ashSky(t, 2675, 0.6 + after(t) * 0.4));
    lay(0.62, () => front(t));
    rays(1300, 400, Math.PI * 0.75, 0.3, 1400, 'rgba(255,140,60,1)', 0.12 * (1 - after(t)), 4, t);
    BL.forEach(b => { if (t > b && t < b + 0.15) whiteOut(0.3 * (1 - (t - b) / 0.15), '255,230,200'); });
  };
  DIR.rising = {
    outfit: 'voen', light: { side: 1, rim: '#ff9a50' }, grade: ['#5a2a1a', 0.14],
    act: () => [[S0.rising, 'annoyed'], [EV.ri_up, 'proud'], [EV.ri_63, 'awe'], [EV.ri_after, 'scared'], [BL[1], 'shock'], [EV.ri_list, 'annoyed']],
    pose: (t, u, b) => { const put = t > EV.ri_up - 0.4 && t < EV.ri_up + 0.2, k = clamp((t - EV.ri_up + 0.4) / 0.4), duck = BL.some(x => t > x && t < x + 0.3);
      return Object.assign(b, { x: 360, y: 1650, s: 1.0, look: t < EV.ri_after ? [0.8, -0.4] : [0.7, -0.6], hand: put ? [lerp(160, 260, k), lerp(-260, -330, k)] : undefined, handF: put ? [lerp(140, 230, k), -250] : undefined,
        squash: duck ? 0.12 : b.squash, chatter: t > EV.ri_after ? 1 : 0, tilt: duck ? -0.08 : 0 }); },
    afterCat: (t, u, P) => { if (t > EV.ri_up - 0.4 && t < EV.ri_up + 0.2) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; rect(x - 26, y - 16, 52, 30, { wash: '#6a6268', washA: 1, w: 1.8, col: L }); } },
    cam: () => [[S0.rising, 540, 1000, 0.1], [EV.ri_up, 560, 960, 0.04], [EV.ri_63, 600, 980, 0.06], [EV.ri_after, 560, 900, -0.02], [EV.ri_blow, 520, 860, -0.06], [EV.ri_list, 600, 960, 0.06], [S1.rising, 600, 980, 0.1]],
    hud
  };
  TRANS_IN.rising = { a: 0.2, b: 0.3, fx(k, t, A, B) {             // клуб дыма заволакивает кадр и рассеивается
    drawBuf(k < 0.5 ? A : B); const e = Math.sin(k * Math.PI), r = rng(2676);
    scr(() => { for (let i = 0; i < 14; i++) { const x = r() * W, y = r() * H, R = (200 + r() * 300) * (0.3 + e * 1.4); ctx.save(); ctx.globalAlpha = 0.85 * e; ctx.fillStyle = i % 3 ? '#4a4446' : '#6a6260'; ctx.beginPath(); ctx.arc(x, y - k * 200, R, 0, 6.283); ctx.fill(); ctx.restore(); }
      if (k > 0.4 && k < 0.55) whiteOut(0.3, '255,170,90'); });
  } };
})();
