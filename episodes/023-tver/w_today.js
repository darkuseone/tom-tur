/* 023 — сцена `today`: 2026, Москва, Тверская улица вечером. Перспектива улицы: сталинские фасады с башенками и вывесками по
   обе стороны, поток машин и троллейбус, люди с телефонами, в конце улицы — дорога уходит к горизонту. На «трасса» по улице
   проносится призрак фуры с биркой «МИФ»; на «Тверская» на углу дома вспыхивает табличка «ТВЕРСКАЯ УЛ.»; на «Тверь!» разметка
   улицы загорается стрелой к горизонту, там — указатель «ТВЕРЬ →», табло 5 : 1. Переход В сцену — указатель трассы: синий щит
   опускается сверху, как шлагбаум, и поднимается уже над Тверской. */
(() => {
  EV.td_myth = wtk('t1', 'трасса');
  EV.td_street = wtk('t1', 'Тверская.');
  EV.td_road = wtk('t1', 'Дорога');
  EV.td_tver = wtk('t1', 'Тверь!');
  KEYW.push('трасса', 'Тверская.', 'Тверь!');
  SHAKES.push([EV.td_tver, 0.15, 5]);
  const L = TV.ink, VX = 600, VY = 1020;
  function sky(t) { vgrad(-900, 1250, ['#1e2440', '#3a3a6a', '#7a4a6a', '#d0705a', '#f0a868'], 1); glow(VX, VY, 500, 'rgba(255,170,110,1)', 0.5); clouds(t, -460, 5, '#4a3a5a', 23901, 0.5); birds(t, 6, [-100, -100, 1200, 600], 23902, '#14101a'); }
  function facade(side, t) {                                        // ряд сталинских домов вдоль улицы в перспективе
    for (let i = 0; i < 6; i++) { const k0 = i / 6, k1 = (i + 0.92) / 6, f = q => Math.pow(q, 1.6);
      const x0 = side < 0 ? lerp(-260, VX - 90, f(k0)) : lerp(1340, VX + 90, f(k0)), x1 = side < 0 ? lerp(-260, VX - 90, f(k1)) : lerp(1340, VX + 90, f(k1));
      const yb0 = lerp(1500, VY + 40, f(k0)), yb1 = lerp(1500, VY + 40, f(k1)), h0 = lerp(980, 160, f(k0)), h1 = lerp(980, 160, f(k1));
      const col = ['#c8a888', '#d8b890', '#b89a7a', '#e0c8a0', '#c09878', '#d0b088'][(i + (side > 0 ? 3 : 0)) % 6];
      shape([[x0, yb0], [x1, yb1], [x1, yb1 - h1], [x0, yb0 - h0]], { wash: col, washA: 1, w: 2.2, col: L, shade: { gap: 9, a: 0.18, col: '#3a2a2a', ang: side < 0 ? 0.6 : -0.6 } });
      const rows = 7, cols = 4; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const u = (c + 0.5) / cols, v = (r + 0.6) / rows, x = lerp(x0, x1, u), yb = lerp(yb0, yb1, u), h = lerp(h0, h1, u), w = Math.abs(x1 - x0) / cols * 0.45, y = yb - h * v;
        const lit = rng(hsh(i, r, c, side))() < 0.6; rect(x - w / 2, y - h * 0.05, w, h * 0.07, { wash: lit ? '#ffd890' : '#3a3a4a', washA: 1, w: 1, col: L, a: 0.6 }); }
      pencil([[x0, yb0 - h0], [x1, yb1 - h1]], { w: 4, col: '#f0e0c0', pass2: false });   // карниз
      if (i === 0) { const x = (x0 + x1) / 2, y = (yb0 + yb1) / 2 - 300; rect(x - 120, y - 40, 240, 70, { wash: ['#2a6a4a', '#8a2a3a'][side < 0 ? 0 : 1], washA: 1, w: 2, col: L }); glow(x, y, 120, 'rgba(255,220,160,1)', 0.3); txt(side < 0 ? 'КАФЕ' : 'КНИГИ', x, y + 10, 40, { col: '#ffe8c0', font: 'Osw' }); }
      if (i === 1) { const x = x1, y = yb1 - h1; rect(x - 20, y - 80, 40, 80, { wash: col, washA: 1, w: 2, col: L }); poly([[x - 26, y - 80], [x, y - 140], [x + 26, y - 80]], { wash: '#6a8a7a', washA: 1, w: 2, col: L }); }   // башенка
    }
  }
  function street(t) {                                              // мостовая, разметка-стрела, машины, троллейбус, указатель у горизонта
    shape([[-260, 1500], [1340, 1500], [VX + 90, VY + 40], [VX - 90, VY + 40]], { wash: '#3a3a44', washA: 1, w: 1.6, col: L });
    const glowA = sm((t - EV.td_tver + 0.1) / 0.4);
    for (let k = 0; k < 10; k++) { const q0 = Math.pow(k / 10, 1.6), q1 = Math.pow((k + 0.5) / 10, 1.6); pencil([[lerp(VX, VX, q0), lerp(1500, VY + 40, q0)], [VX, lerp(1500, VY + 40, q1)]], { w: lerp(12, 2, q0), col: glowA > 0 ? lerpC('#f0f0e0', '#ffd040', glowA) : '#f0f0e0', pass2: false }); }
    if (glowA > 0) { glow(VX, VY, 220, 'rgba(255,220,100,1)', 0.6 * glowA); poly([[VX - 60, VY + 120], [VX, VY + 20], [VX + 60, VY + 120]], { wash: '#ffd040', washA: glowA, w: 2, col: L, a: glowA }); }
    push(VX + 60, VY + 30, 0.7); pencil([[0, 0], [0, -200]], { w: 6, col: '#7a8a94', pass2: false }); rect(-10, -270, 260, 80, { wash: '#1e4aa0', washA: 1, w: 3, col: '#f6f6f6' }); txt('ТВЕРЬ →', 120, -216, 44, { col: '#f6f6f6', font: 'Osw' }); pop();
    for (let i = 0; i < 6; i++) { const q = ((i / 6 + t * 0.12) % 1), f = Math.pow(1 - q, 1.6), x = lerp(VX + 20 + (i % 2) * 40, 900 + (i % 2) * 200, f), y = lerp(VY + 60, 1460, f), s = lerp(0.06, 0.55, f);   // машины к нам
      push(x, y, s); blob([[-120, 0], [-110, -50], [-50, -90], [60, -90], [110, -50], [130, 0]], { wash: ['#e8b020', '#f0f0f0', '#2a4a8a', '#a8262a', '#3a3a3a', '#5a8a6a'][i], washA: 1, w: 2, col: L }); glow(-100, -30, 40, 'rgba(255,240,200,1)', 0.7); glow(110, -30, 40, 'rgba(255,240,200,1)', 0.7); for (const wx of [-70, 70]) ell(wx, 0, 24, 24, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); pop(); }
    for (let i = 0; i < 4; i++) { const q = ((i / 4 + t * 0.1) % 1), f = Math.pow(q, 1.6), x = lerp(500 - (i % 2) * 140, VX - 30, f), y = lerp(1460, VY + 60, f), s = lerp(0.55, 0.06, f);   // красные стопы от нас
      push(x, y, s); blob([[-120, 0], [-110, -50], [-50, -90], [60, -90], [110, -50], [130, 0]], { wash: ['#6a6a7a', '#c8c0b0', '#3a5a3a', '#8a6a4a'][i], washA: 1, w: 2, col: L }); glow(-100, -30, 36, 'rgba(255,60,40,1)', 0.7); glow(110, -30, 36, 'rgba(255,60,40,1)', 0.7); pop(); }
    push(980, 1420, 0.5); rect(-260, -200, 520, 200, { wash: '#2a7a6a', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 6; k++) rect(-230 + k * 80, -170, 60, 70, { wash: '#ffe0a0', washA: 1, w: 1.4, col: L }); for (const wx of [-170, 170]) ell(wx, 0, 34, 34, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); pencil([[-120, -200], [-60, -330]], { w: 4, col: '#2a2a2a', pass2: false }); pencil([[-40, -200], [20, -330]], { w: 4, col: '#2a2a2a', pass2: false }); pop();   // троллейбус
    for (let k = 0; k < 5; k++) { const f = Math.pow((k + 1) / 7, 1.4), sd = k % 2 ? 1 : -1; human(sd < 0 ? lerp(-60, VX - 110, f) : lerp(1240, VX + 110, f), lerp(1480, VY + 50, f), lerp(0.36, 0.08, f), t, { body: ['#3a5a8a', '#b0322a', '#e8dcb8', '#4a6a3a', '#5a4a6a'][k], legs: '#2a2a34', seed: 2520 + k, flip: sd, walk: t * 5, prop: k % 2 ? 'phone' : undefined, armR: k % 2 ? 'hold' : 'down' }); }   // прохожие вдоль домов
    pencil([[-200, 960], [VX, VY - 60], [1300, 940]], { w: 2, col: '#1a1a1a', a: 0.7, pass2: false });   // провода
    if (t > EV.td_myth - 0.05 && t < EV.td_street) { const q = clamp((t - EV.td_myth + 0.05) / 0.9), x = lerp(-500, 1600, q); ctx.globalAlpha = 0.55; push(x, 1400, 0.7); rect(-300, -150, 380, 150, { wash: '#e8e4dc', washA: 1, w: 2.2, col: L }); txt('МИФ', -110, -60, 60, { col: '#a8262a', font: 'Osw' }); rect(90, -120, 110, 120, { wash: '#2a3a5a', washA: 1, w: 2.2, col: L }); for (const wx of [-240, -160, 30, 150]) ell(wx, 0, 26, 26, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); pop(); ctx.globalAlpha = 1; }
  }
  function ground(t) {                                              // тротуар: плитка, люди, фонари, урна, самокаты, голуби
    rect(-900, 1500, 2900, 700, { wash: '#8a8478', washA: 1, line: false });
    for (let k = 0; k < 8; k++) { const y = 1510 + k * k * 8 + k * 28; pencil([[-200, y], [1300, y]], { w: 1.8, col: '#4a443a', a: 0.6, pass2: false }); for (let i = 0; i < 10; i++) { const x = -100 + i * 150 + (k % 2) * 75; pencil([[x, y], [x + (x - 540) * 0.06, y + 28 + k * 16]], { w: 1.4, col: '#4a443a', a: 0.45, pass2: false }); } }
    crowd(-100, 1300, 1500, 18, t, 23904, { s: 0.34, phones: 0.5 });
    rect(-200, 1496, 1600, 20, { wash: '#c8c0b0', washA: 1, w: 2, col: L });
    lamppost(130, 1510, 420, t, { lit: 1 }); lamppost(1150, 1520, 420, t, { lit: 1 });
    const P = [[480, 1560, '#3a5a8a', 'cap', 'phone'], [600, 1566, '#b0322a', null, 'phone'], [760, 1560, '#e8dcb8', 'scarf', null], [880, 1568, '#4a6a3a', 'cap', 'phone'], [1000, 1564, '#5a4a6a', null, null], [380, 1570, '#8a6a2a', null, 'phone']];
    P.forEach(([x, y, c, h, p], i) => human(x, y, 0.42, t, { body: c, legs: '#2a2a34', hat: h || undefined, hatCol: '#2a2a2a', prop: p || undefined, armR: p ? 'hold' : 'down', seed: 2500 + i, flip: i % 2 ? -1 : 1, walk: t * (i % 3 ? 5 : 0) }));
    human(1060, 1760, 0.62, t, { body: '#2a4a6a', legs: '#1a1a24', hat: 'cap', hatCol: '#1a1a1a', prop: 'phone', armR: 'hold', seed: 2510, flip: -1, look: [0.2, -0.9] });
    human(700, 1780, 0.6, t, { body: '#7a3a5a', legs: '#2a2a34', seed: 2511, armR: 'point', look: [0.3, -0.8] });
    push(860, 1800, 0.6); pencil([[-60, 0], [60, 0]], { w: 6, col: '#2a2a2a', pass2: false }); pencil([[50, 0], [40, -160]], { w: 6, col: '#2a2a2a', pass2: false }); pencil([[20, -160], [60, -160]], { w: 5, col: '#2a2a2a', pass2: false }); for (const wx of [-60, 60]) ell(wx, 0, 14, 14, { wash: '#1a1a1a', washA: 1, w: 1.4, col: L }); pop();   // самокат
    push(460, 1780, 0.6); blob([[-30, 0], [-36, -90], [36, -90], [30, 0]], { wash: '#3a4a3a', washA: 1, w: 2, col: L }); pop();
    for (let k = 0; k < 4; k++) { const x = 560 + k * 50 + Math.sin(t * 3 + k) * 8; ell(x, 1880 + (k % 2) * 14, 16, 11, { wash: '#8a8a94', washA: 1, w: 1.4, col: L }); ell(x + 14, 1870 + (k % 2) * 14, 7, 7, { wash: '#6a6a74', washA: 1, w: 1, col: L }); }
    jug(1180, 1860, 0.42, '#6a8a4a'); crate(300, 1880, 100, 56, { col: '#8a6a4a' }); sack(1000, 1900, 0.45);
  }
  function front(t) {                                               // передний план: угол дома с табличкой улицы и ветка липы
    rect(-260, 300, 330, 1900, { wash: '#c8a080', washA: 1, w: 2.6, col: L, shade: { gap: 10, a: 0.2, col: '#3a2a2a', ang: 0.6 } }); for (let k = 0; k < 10; k++) pencil([[-260, 420 + k * 180], [70, 420 + k * 180]], { w: 3, col: '#8a6a50', a: 0.6, pass2: false });
    blob([[1060, 120], [1220, 60], [1360, 140], [1380, 420], [1200, 460], [1080, 320]], { wash: '#2e5a3a', washA: 0.95, w: 2, col: L, shade: { gap: 9, a: 0.3, col: TV.greenD, ang: 0.7 } });
  }
  function hud(t) {
    const q = t > EV.td_street - 0.05 ? popK(t, EV.td_street - 0.05, 0.35) : 0; if (q > 0) { push(250, 880, 0.6 + 0.4 * q, 0.02); glow(0, 0, 220, 'rgba(255,240,200,1)', 0.5 * q); rect(-150, -60, 300, 120, { wash: '#1e3a7a', washA: 1, w: 3, col: '#f6f6f6' }); txt('ТВЕРСКАЯ', 0, -6, 48, { col: '#f6f6f6', font: 'Osw' }); txt('улица', 0, 40, 28, { col: '#f6f6f6', font: 'Hand' }); pop(); }
    const s = t > EV.td_tver - 0.05; scoreHud(t, s ? 5 : 4, 1, s ? { t0: EV.td_tver - 0.05, side: -1 } : {}); }
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(12, () => { facade(-1, t); facade(1, t); });
    lay(4, () => street(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(30, [-200, 600, 1300, 1600], '#ffe0b0', t, 23903, { sp: 6, vx: 30, sz: 2.4, a: 0.45, wob: 18, add: 1 });
    haze('#c87a6a', 0.05);
  };
  DIR.today = {
    outfit: 'hoodieT', light: { side: 1, rim: '#ffb890' }, grade: ['#b06a60', 0.1],
    act: () => [[S0.today, 'sideeye'], [EV.td_myth, 'suspicious'], [EV.td_street, 'smug'], [EV.td_tver, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1640, s: 1.0, look: t < EV.td_street ? [0.4, -0.3] : t < EV.td_road ? [-0.7, -0.6] : [0.6, -0.5], tailUp: t > EV.td_street,
      point: t > EV.td_street && t < EV.td_road ? 1 : t > EV.td_tver ? 1 : undefined, hand: t > EV.td_street && t < EV.td_road ? [-200, -400] : t > EV.td_tver ? [240, -380] : undefined }),
    cam: () => [[S0.today, 620, 1000, 0.12], [EV.td_myth, 640, 1020, 0.08], [EV.td_street, 520, 1000, 0.1, 'x'], [EV.td_tver, 600, 980, 0.06, 'x'], [S1.today, 620, 960, 0.12]],
    hud
  };
  TRANS_IN.today = { a: 0.25, b: 0.35, fx(k, t, A, B) {             // синий щит трассы опускается сверху и поднимается уже над Тверской
    const dn = sm(clamp(k / 0.5)), up = sm(clamp((k - 0.5) / 0.5)), y = k < 0.5 ? lerp(-H, 0, dn) : lerp(0, -H, up);
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { rect(30, y + 60, W - 60, H - 120, { wash: '#1e4aa0', washA: 1, w: 8, col: '#f6f6f6' }); rect(60, y + 90, W - 120, H - 180, { line: true, w: 6, col: '#f6f6f6' });
      txt('МОСКВА', 540, y + 820, 140, { col: '#f6f6f6', font: 'Osw' }); txt('ул. ТВЕРСКАЯ', 540, y + 1050, 90, { col: '#f6f6f6', font: 'Osw' }); pencil([[300, y + 1260], [780, y + 1260], [700, y + 1200], [780, y + 1260], [700, y + 1320]], { w: 14, col: '#f6f6f6', pass2: false }); });
  } };
})();
