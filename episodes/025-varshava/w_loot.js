/* 025 — сцена `loot`: 1939 → 1946, зал Каналетто в Королевском замке. Красные штофные стены, золочёные рамы с видами Варшавы
   (тёплые панорамы), паркет «ёлочкой», люстра, высокое окно — за ним горит крыша. Серые силуэты в касках (без знаков) снимают картины
   со стен и укладывают в ящики, грузовик у окна. Том-хранитель в жилете с бабочкой держится за раму.
   На «картины» — луч фонаря скользит по рамам; на «тридцать девятом» за окном вспыхивает пожар; на «вывезли» рама вырывается из лап Тома,
   стены пустеют до светлых прямоугольников-«теней»; на «Германию» на ящиках — трафарет «→ DEUTSCHLAND», грузовик уезжает; на «Вернули»
   свет становится дневным, ящики с трафаретом «WARSZAWA 1946» въезжают обратно, рамы возвращаются на стены, Том обнимает свою.
   Главный свет — зарево пожара в окне, после «Вернули» — дневной луч из того же окна. Переход В сцену — прожжённая дыра расползается
   огненным краем. */
(() => {
  EV.lo_pics = wtk('s5', 'картины');
  EV.lo_39 = wtk('s5', 'тридцать');
  EV.lo_take = wtk('s5', 'вывезли');
  EV.lo_de = wtk('s5', 'Германию.');
  EV.lo_back = wtk('s5', 'Вернули');
  KEYW.push('картины', 'Германию.', 'Вернули');
  SHAKES.push([EV.lo_39, 0.3, 6]);
  const L = WA.ink, gone = t => t < EV.lo_back ? clamp((t - EV.lo_take) / 0.6) : 1 - clamp((t - EV.lo_back - 0.3) / 0.7), day = t => clamp((t - EV.lo_back) / 0.5), fire = t => t > EV.lo_39 && t < EV.lo_back ? 1 : 0;
  const PIC = [[-60, 760, 300, 180], [330, 740, 260, 170], [690, 760, 300, 180], [1060, 740, 240, 170], [130, 1010, 220, 140], [880, 1010, 220, 140]];
  function view(w, h, sd) { vgrad(-h / 2, h / 2, ['#9ab8d0', '#e8d8b0', '#b89a6a'], 1); push(0, h * 0.28, w / 900); const r = rng(sd); let x = -500; for (let i = 0; i < 6; i++) { const ww = 170; kam(x + ww / 2, 120, ww, 360, { col: ['#d8a860', '#b86a4a', '#e8d098', '#8a7a5a'][i % 4], top: ['gable', 'attic', 'roof'][i % 3], floors: 3, cols: 2, seed: sd + i }); x += ww; } pop(); for (let i = 0; i < 5; i++) ell(-w * 0.3 + i * w * 0.15, h * 0.36, 3, 8, { wash: '#2a1a10', washA: 1, line: false }); }
  function outside(t) { const d = day(t); vgrad(-900, 1400, [lerpC('#1a0a0a', '#8ab0d8', d), lerpC('#6a1a10', '#c8d8e8', d), lerpC('#e85a1a', '#f0e8d0', d)], 1);
    if (fire(t)) { for (let i = 0; i < 8; i++) { const x = 300 + i * 60, h = 120 + Math.sin(t * 12 + i * 1.7) * 50; blob([[x - 30, 1000], [x - 10, 1000 - h], [x + 4, 1000 - h * 1.3], [x + 20, 1000 - h * 0.9], [x + 30, 1000]], { wash: i % 2 ? '#ffb040' : '#ff5a1a', washA: 1, line: false }); } }
    sil([[100, 1100], [100, 960], [240, 900], [380, 960], [520, 900], [700, 960], [900, 960], [900, 1100]], lerpC('#1a0a0a', '#7a8a9a', d), 1); }
  function truck(t) { const go = t > EV.lo_de ? (t - EV.lo_de) * 600 : 0, back = t > EV.lo_back ? Math.max(0, 900 - (t - EV.lo_back) * 1400) : null, x = back !== null ? 540 + back : 540 + go;
    push(x, 1150, 0.8); rect(-170, -150, 220, 120, { wash: '#4a4c48', washA: 1, w: 2.2, col: L }); rect(50, -110, 90, 80, { wash: '#3a3c38', washA: 1, w: 2, col: L }); rect(70, -100, 50, 36, { wash: '#8aa0b0', washA: 1, w: 1.4, col: L }); for (const k of [-110, 90]) ell(k, -26, 28, 28, { wash: '#1a1a1a', washA: 1, w: 2, col: L });
    txt(back !== null ? 'WARSZAWA 1946' : '→ DEUTSCHLAND', -60, -84, 22, { col: '#e8e4dc', font: 'Osw' }); pop(); }
  function hall(t) {                                                 // стена зала: штоф, окно, рамы, следы снятых картин, люстра
    const g = gone(t), d = day(t);
    for (const [x, y, w, h] of [[-900, -400, 1150, 2200], [830, -400, 1200, 2200], [250, -400, 580, 920], [250, 1180, 580, 700]]) rect(x, y, w, h, { wash: '#8a1e1a', washA: 1, line: false });
    ctx.save(); ctx.globalAlpha = 0.25; for (let i = -10; i < 30; i++) for (let j = 0; j < 22; j++) { ctx.fillStyle = (i + j) % 2 ? '#a8302a' : '#6a1210'; ctx.fillRect(-900 + i * 70 + (j % 2) * 35, -300 + j * 90, 20, 30); } ctx.restore();
    rect(250, 520, 580, 660, { line: true, w: 22, col: '#e8d8b0' }); pencil([[540, 520], [540, 1180]], { w: 12, col: '#e8d8b0', pass2: false }); pencil([[250, 850], [830, 850]], { w: 10, col: '#e8d8b0', pass2: false });
    rect(-900, 1240, 2900, 80, { wash: '#e8d8b0', washA: 1, w: 2, col: L }); pencil([[-900, 560], [2000, 560]], { w: 14, col: WA.goldD, pass2: false }); pencil([[-900, 1236], [2000, 1236]], { w: 8, col: WA.goldD, pass2: false });
    PIC.forEach(([x, y, w, h], i) => { if (x > 200 && x < 880 && y < 1180 && y > 500 && i !== 1) return;
      rect(x - w / 2 - 10, y - h / 2 - 10, w + 20, h + 20, { wash: '#b0362e', washA: 1, line: false });
      const shift = i % 2 ? -1 : 1, k = sm(clamp(g * 1.3 - i * 0.06)); if (k < 1) frameG(x + shift * k * 120, y + k * 200, w, h, { b: 18, rot: k * 0.2 * shift, inner: () => view(w, h, 2681 + i) }); });
    if (fire(t)) { glow(540, 860, 360, 'rgba(255,120,40,1)', 0.3 * flick(t, 5)); } else glow(540, 860, 300, 'rgba(255,240,210,1)', 0.25 * d);
    pencil([[540, -200], [540, 380]], { w: 4, col: L, pass2: false }); for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283; pencil([[540, 400], [540 + Math.cos(a) * 120, 430 + Math.sin(a) * 30]], { w: 3, col: WA.goldD, pass2: false }); ell(540 + Math.cos(a) * 120, 420 + Math.sin(a) * 30, 8, 14, { wash: '#f8f0d8', washA: 1, w: 1, col: L }); } ell(540, 400, 40, 20, { wash: WA.gold, washA: 1, w: 2, col: L });
    moodDark(540, 860, 500, 1400, '#1a0606', 0.35 * (1 - d)); }
  function men(t) {                                                  // силуэты снимают и несут рамы; после «Вернули» — музейщики вешают обратно
    const g = gone(t), d = day(t);
    if (d < 0.5) for (let i = 0; i < 5; i++) { const x = -160 + i * 300 + (t > EV.lo_take ? (t - EV.lo_take) * (i % 2 ? 60 : -40) : 0); helmetSil(x, 1360, 1.4, t, { walk: t > EV.lo_take ? 1 : 0, ph: i, col: '#2e3034', flip: i % 2 ? -1 : 1 }); if (i % 2 === 0 && t > EV.lo_take) frameG(x + 30, 1180, 150, 100, { b: 10, fill: '#c8b08a', rot: 0.1 }); }
    else { const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a30', seed: sd }, ex));
      P(-60, 1360, 0.78, 2690, '#3a3a40', { armR: 'up', look: [0.3, -0.6] }); P(160, 1360, 0.74, 2691, '#e8e4dc', { long: 1, armR: 'up', armL: 'up', hair: '#7a5a3a' }); P(900, 1360, 0.76, 2692, '#5a4a3a', { flip: -1, armR: 'up', hat: 'cap', hatCol: '#3a3a3a' }); P(1100, 1360, 0.74, 2693, '#3a4a5a', { flip: -1, armR: 'hold', prop: 'scroll' }); P(700, 1370, 0.7, 2694, '#6a5a4a', { flip: -1, armR: 'point' }); }
    for (let i = 0; i < 4; i++) { const x = 200 + i * 200 + (t > EV.lo_de && d < 0.5 ? (t - EV.lo_de) * 400 : 0); push(x, 1400, 1); rect(-80, -90, 160, 90, { wash: '#a8834a', washA: 1, w: 2.2, col: L }); for (let j = 0; j < 3; j++) pencil([[-80, -70 + j * 26], [80, -70 + j * 26]], { w: 1.4, col: '#6a4a24', a: 0.7, pass2: false }); if (t > EV.lo_de - 0.1) txt(d > 0.5 ? 'WARSZAWA 1946' : '→ DEUTSCHLAND', 0, -40, 20, { col: '#1a100c', font: 'Osw' }); pop(); } }
  function floor(t) {                                                // паркет «ёлочкой», пятно света, тени
    const d = day(t); rect(-1400, 1400, 3900, 1200, { wash: '#8a5a2a', washA: 1, line: false }); ctx.save(); ctx.globalAlpha = 0.45; ctx.strokeStyle = '#4a2a10'; ctx.lineWidth = 2; for (let j = 0; j < 14; j++) for (let i = -20; i < 40; i++) { const y = 1420 + j * j * 6 + j * 20, x = i * 60 + (j % 2) * 30; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 30, y + 14 + j * 2); ctx.lineTo(x + 60, y); ctx.stroke(); } ctx.restore();
    lightPool(560, 1560, 520, 140, d > 0.5 ? 'rgba(255,240,210,1)' : 'rgba(255,120,50,1)', 0.45); castShadow(380, 1640, 170, 420, Math.PI * 0.6, 0.45);
    push(980, 1620, 1); rect(-60, -110, 120, 110, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); rect(-50, -100, 100, 18, { wash: '#7a5a34', washA: 1, w: 1.4, col: L }); pop();   // табурет-лестница
    push(-120, 1640, 1); rect(-30, -150, 60, 150, { wash: '#e8d8b0', washA: 1, w: 2, col: L }); ell(0, -160, 50, 14, { wash: '#d8c8a0', washA: 1, w: 1.6, col: L }); blob([[-20, -170], [0, -260], [20, -170]], { wash: '#2a4a3a', washA: 1, w: 1.4, col: L }); pop(); }   // ваза-постамент
  function hud(t) { if (t > EV.lo_back + 0.2) { const q = popK(t, EV.lo_back + 0.2, 0.3); push(760, 900, q, 0.04); rect(-180, -50, 360, 100, { wash: '#16120e', washA: 0.9, w: 3, col: WA.gold }); txt('1939 → 1946', 0, 16, 52, { col: WA.goldL, font: 'Osw' }); pop(); } }
  function front(t) { sil([[-700, 2400], [-700, 300], [-440, 280], [-420, 2400]], '#1a0606', 1); for (let i = 0; i < 6; i++) pencil([[-640 + i * 40, 300], [-620 + i * 40, 2400]], { w: 6, col: '#3a0e0a', pass2: false });
    sil([[1300, 2400], [1320, 300], [1520, 280], [1520, 2400]], '#1a0606', 1); }
  WORLD.loot = (t, u, cat) => {
    lay(40, () => outside(t));
    lay(14, () => truck(t));
    lay(5, () => hall(t));
    lay(3.4, () => men(t));
    lay(1, () => { floor(t); cat(); });
    lay(2.4, () => motes(20, [100, 500, 1000, 1500], fire(t) ? '#ffb060' : '#fff4d8', t, 2695, { sp: fire(t) ? -40 : 6, sz: 2.4, a: 0.5, wob: 18, add: 1 }));
    lay(0.64, () => front(t));
    shaft(540, 760, 420, 1300, 0.0, fire(t) ? 'rgba(255,120,50,1)' : 'rgba(255,240,210,1)', 0.12);
    if (t > EV.lo_39 && t < EV.lo_39 + 0.15) whiteOut(0.35 * (1 - (t - EV.lo_39) / 0.15), '255,170,90');
  };
  DIR.loot = {
    outfit: 'director', light: { side: 1, rim: '#ff9a50' }, grade: ['#6a1a10', 0.1],
    act: () => [[S0.loot, 'talk'], [EV.lo_39, 'scared'], [EV.lo_take, 'shock'], [EV.lo_de, 'annoyed'], [EV.lo_back, 'awe'], [EV.lo_back + 0.6, 'laugh']],
    pose: (t, u, b) => { const hold = t < EV.lo_take + 0.2 || t > EV.lo_back + 0.4, tug = t > EV.lo_take - 0.2 && t < EV.lo_take + 0.25;
      return Object.assign(b, { x: 380, y: 1650, s: 1.0, look: t < EV.lo_back ? [0.7, -0.5] : [0.5, -0.3], hand: hold ? [230, -330] : undefined, handF: hold ? [140, -300] : undefined, tilt: tug ? 0.12 : 0, squash: tug ? 0.08 : b.squash }); },
    afterCat: (t, u, P) => { if (t < EV.lo_take + 0.2 || t > EV.lo_back + 0.4) { const x = P.x + 220 * P.s, y = P.y - 380 * P.s, dx = t > EV.lo_take - 0.2 && t < EV.lo_take + 0.2 ? (t - EV.lo_take + 0.2) * 500 : 0; frameG(x + dx, y, 180, 120, { b: 12, inner: () => view(180, 120, 2696) }); } },
    cam: () => [[S0.loot, 560, 940, 0.06], [EV.lo_39, 560, 900, 0.0], [EV.lo_take, 600, 1060, 0.12], [EV.lo_de, 620, 1000, 0.04], [EV.lo_back, 540, 960, 0.08], [S1.loot, 520, 960, 0.12]],
    hud
  };
  TRANS_IN.loot = { a: 0.15, b: 0.3, fx(k, t, A, B) {              // прожжённая дыра: огненный край расползается из центра, внутри — зал
    drawBuf(A); const R = Math.pow(k, 1.4) * 1500, r = rng(2697);
    const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283, rr = R * (0.8 + 0.25 * Math.sin(i * 2.7) + 0.1 * r()); pts.push([540 + Math.cos(a) * rr, 960 + Math.sin(a) * rr * 1.2]); }
    scr(() => { ctx.save(); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.clip(); drawBuf(B); ctx.restore();
      ctx.save(); ctx.lineWidth = 26; ctx.strokeStyle = '#2a1008'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#ff8a30'; ctx.stroke(); ctx.restore(); });
  } };
})();
