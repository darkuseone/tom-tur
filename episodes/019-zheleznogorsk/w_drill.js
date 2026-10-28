/* 019 — сцена `drill`: 1950-е, забой внутри горы. Тоннель в перспективе: гнейс с бурками, деревянная крепь, лампы на проводе,
   рельсы, вагонетки с породой. Заключённые в ватниках и солдаты стройбата в гимнастёрках: бурят перфораторами, толкают вагонетки,
   грузят породу; капель, пыль в лучах. На «стройбат» из пыли выходит отделение солдат, на «грызут» бурильщики врубаются в камень
   (тряска, искры), на «двести» — HUD-разрез горы: крошечный тоннель и стрелка «200 м скалы». Переход В сцену — фара паровоза → темнота → луч лампы. */
(() => {
  EV.dr_zek = wtk('s3', 'Зэки');
  EV.dr_stroy = wtk('s3', 'стройбат');
  EV.dr_gryz = wtk('s3', 'грызут');
  EV.dr_200 = wtk('s3', 'двести');
  SHAKES.push([EV.dr_gryz, 0.5, 6], [EV.dr_200 + 0.3, 0.3, 4]);
  KEYW.push('стройбат', 'двести');
  const L = '#0e0a06', VX = 640, VY = 880;

  function tunnel(t) {                                              // свод, стены, торец забоя
    screenFill('#0c0a08', 1);
    const face = shape([[VX - 140, VY - 160], [VX + 140, VY - 160], [VX + 150, VY + 120], [VX - 150, VY + 120]], { wash: '#8a7a68', washA: 1, w: 2, col: L }); hatch(face.path, face.bb, { gap: 5, a: 0.35, col: '#3a2a1a', ang: 0.5, w: 1 });
    for (let k = 0; k < 14; k++) { const r = rng(19300 + k); ell(VX - 110 + r() * 220, VY - 130 + r() * 230, 5, 5, { wash: '#1a1208', washA: 1, line: false }); }   // шпуры
    glow(VX, VY, 360, 'rgba(255,190,110,1)', 0.55);
    for (const sd of [-1, 1]) { const w = shape([[VX + sd * 140, VY - 160], [VX + sd * 1300, -300], [VX + sd * 1300, 2400], [VX + sd * 150, VY + 120]], { wash: '#5a4c40', washA: 1, w: 2, col: L }); shadeG(w.path, VX + sd * 150, 0, VX + sd * 900, 0, '#1a120a', 0.6);
      hatch(w.path, w.bb, { gap: 14, a: 0.35, col: '#2a1e14', ang: sd * 0.6, w: 1.4 });
      const r = rng(19310 + sd); for (let k = 0; k < 26; k++) { const f = Math.pow(r(), 0.8), x = VX + sd * lerp(170, 1100, f), y = lerp(VY - 120, -100, r()) + f * r() * 900; poly([[x, y], [x + sd * 30 * f + 10, y - 20 * f - 6], [x + sd * 60 * f + 16, y + 6], [x + sd * 20, y + 26 * f + 6]], { wash: r() < 0.5 ? '#7a6a58' : '#3a3026', washA: 0.85, w: 1.2, col: L, a: 0.5 }); } }
    const roof = shape([[VX - 140, VY - 160], [VX + 140, VY - 160], [VX + 1300, -300], [VX - 1300, -300]], { wash: '#3a3028', washA: 1, w: 2, col: L }); hatch(roof.path, roof.bb, { gap: 14, a: 0.35, col: '#1a120a', ang: 1.4, w: 1.4 });
    const fl = shape([[VX - 150, VY + 120], [VX + 150, VY + 120], [VX + 1300, 2400], [VX - 1300, 2400]], { wash: '#4a3e30', washA: 1, w: 2, col: L }); hatch(fl.path, fl.bb, { gap: 14, a: 0.3, col: '#1a120a', ang: 0.1, w: 1.4 });
    for (let k = 0; k < 20; k++) { const f = Math.pow(k / 20, 1.7), y = lerp(2300, VY + 124, f), hw = lerp(520, 40, f); pencil([[VX - hw, y], [VX + hw, y]], { w: lerp(14, 2, f), col: '#3a2412', pass2: false }); }
    for (const sd of [-1, 1]) pencil([[VX + sd * 330, 2300], [VX + sd * 28, VY + 124]], { w: 8, col: '#6a6a70', pass2: false });
    for (let k = 0; k < 30; k++) { const r = rng(19320 + k), f = r(), x = VX + (r() - 0.5) * lerp(260, 1800, f), y = lerp(VY + 140, 2200, f); ell(x, y, 8 + f * 26, 4 + f * 10, { wash: '#6a5a48', washA: 1, w: 1, col: L }); }   // куски породы
    for (let k = 0; k < 7; k++) { const f = 0.12 + k * 0.12, y = lerp(VY + 124, 2300, f * f); ell(VX + (k % 2 ? 260 : -300) * (0.3 + f), y, 40 + f * 140, 8 + f * 30, { wash: '#2a3a48', washA: 0.7, w: 1, col: '#5a7a90', a: 0.4 }); }   // лужи
  }
  function frames(t) {                                              // крепь: стойки и верхняки, лампы на проводе
    for (let k = 5; k >= 0; k--) { const f = Math.pow(k / 6, 1.2), sx = lerp(1.0, 0.18, f), cx = VX, top = lerp(-120, VY - 150, f), bot = lerp(2300, VY + 120, f), hw = lerp(1000, 160, f);
      for (const sd of [-1, 1]) { const P = [[cx + sd * hw, bot], [cx + sd * hw * 0.94, top]]; pencil(P, { w: 60 * sx, col: '#6a4a26', pass2: false }); pencil(P.map(([x, y]) => [x - sd * 14 * sx, y]), { w: 10 * sx, col: '#9a7a44', a: 0.6, pass2: false }); }
      pencil([[cx - hw * 1.02, top], [cx + hw * 1.02, top]], { w: 64 * sx, col: '#5a3e20', pass2: false }); pencil([[cx - hw, top - 18 * sx], [cx + hw, top - 18 * sx]], { w: 8 * sx, col: '#9a7a44', a: 0.6, pass2: false });
      const lx = cx + hw * 0.3, ly = top + 40 * sx; pencil([[lx, top], [lx, ly]], { w: 3 * sx + 1, col: '#1a1a1a', pass2: false }); ell(lx, ly + 10 * sx, 14 * sx, 16 * sx, { wash: '#fff0c0', washA: 1, w: 1.4, col: L }); glow(lx, ly + 10 * sx, 260 * sx + 40, 'rgba(255,214,140,1)', 0.65 * flick(t, k));
      pencil([[cx - hw * 0.9, top + 30 * sx], [cx + hw * 0.9, top + 50 * sx]], { w: 3 * sx + 1, col: '#1a1a1a', a: 0.8, pass2: false }); }
  }
  function gear(t) {                                                // вентиляционная труба под сводом, кабели, табличка, трубы вдоль стены
    const P = []; for (let k = 0; k <= 12; k++) { const f = k / 12; P.push([lerp(VX + 90, 1300, f * f), lerp(VY - 140, -200, f * f)]); }
    shape(tubeP(P, 70, 10), { wash: '#6a6a5a', washA: 1, w: 2, col: L }); for (let k = 1; k < 12; k += 2) { const [x, y] = P[k], w2 = lerp(10, 70, (k / 12) ** 2); pencil([[x - w2 * 0.5, y - w2], [x + w2 * 0.5, y + w2]], { w: 2, col: '#2a2a20', a: 0.6, pass2: false }); }
    for (let q = 0; q < 3; q++) pencil([[VX - 150, VY + 60 - q * 14], [-200, 1300 - q * 70]], { w: 4 + q, col: ['#1a1a1a', '#3a2a1a', '#2a3a2a'][q], pass2: false });
    pencil([[VX - 150, VY + 100], [-200, 1700]], { w: 22, col: '#4a4e56', pass2: false });
    push(930, 1000, 0.9, 0.05); rect(-100, -60, 200, 120, { wash: '#f2d84a', washA: 1, w: 3, col: L }); txt('ОСТОРОЖНО!', 0, -24, 28, { col: '#1a1a1a', font: 'Osw' }); txt('ВЗРЫВНЫЕ', 0, 10, 26, { col: '#b8322a', font: 'Osw' }); txt('РАБОТЫ', 0, 40, 26, { col: '#b8322a', font: 'Osw' }); pop();
  }
  function soldier(x, y, s, t, o = {}) { human(x, y, s, t, Object.assign({ body: '#6a6a3e', legs: '#4a4a2e', boots: '#1a1a1a', hat: 'cap', hatCol: '#5a5a34', belt: '#3a2610', face: 'calm' }, o)); }
  function crews(t) {
    const g = t > EV.dr_gryz ? 1 : 0;
    for (let i = 0; i < 3; i++) worker(VX - 100 + i * 100, VY + 120, 0.3, t + i, { hat: 'kaska', body: '#3c4148', tool: 'drill', armR: 'hold', armL: 'hold', seed: 100 + i, flip: i === 2 ? -1 : 1 });
    if (g) for (let q = 0; q < 14; q++) { const r = rng(hsh(FRAME, q)); ell(VX - 120 + r() * 240, VY - 60 + r() * 160, 3, 3, { wash: '#ffe0a0', washA: 1, line: false }); }
    for (let i = 0; i < 2; i++) { const ph = ((t - S0.drill) * 0.08 + i * 0.5) % 1, f = 0.3 + ph * 0.5, x = VX + 220 * (0.4 + f), y = lerp(VY + 140, 1500, f * f), s = lerp(0.3, 0.75, f);   // вагонетка выкатывается к нам
      push(x, y, s); const c = rect(-110, -150, 220, 110, { wash: '#4a4a52', washA: 1, w: 2.4, col: L }); hatch(c.path, c.bb, { gap: 8, a: 0.3, col: '#1a1a1a', ang: 1.57, w: 1.2 }); for (let q = 0; q < 7; q++) ell(-80 + q * 26, -156 - (q % 2) * 12, 22, 16, { wash: '#7a6a58', washA: 1, w: 1.4, col: L }); for (const sd of [-1, 1]) ell(sd * 70, -30, 26, 26, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); pop();
      worker(x - 150 * s, y, s * 0.95, t + i, { hat: 'ushanka', body: '#3c4148', armR: 'point', armL: 'point', seed: 110 + i }); }
    const sk = sm((t - EV.dr_stroy + 0.1) / 0.6);
    for (let i = 0; i < 4; i++) soldier(VX - 420 + i * 70 + (1 - sk) * 120, lerp(VY + 300, 1180, 0.5) + i * 10, 0.42 + i * 0.02, t + i, { seed: 120 + i, armR: i === 0 ? 'point' : 'hold', prop: i % 2 ? 'stick' : undefined, face: i === 0 ? 'angry' : 'calm' });
    for (let i = 0; i < 3; i++) worker(VX + 340 + i * 60, 1150 + i * 12, 0.45, t + i, { hat: 'ushanka', body: '#4a4e56', tool: 'shovel', armR: 'hold', seed: 130 + i, flip: -1 });
  }
  function near(t) {                                                 // ближние: бурильщик справа, компрессорный шланг, ящик с инструментом
    worker(1010, 1660, 1.0, t, { hat: 'kaska', body: '#3c4148', tool: 'drill', armR: 'hold', armL: 'hold', face: 'angry', seed: 140, flip: -1 });
    pencil(spline([[1300, 1700], [1140, 1560], [1120, 1420], [1060, 1480]], false, 10), { w: 14, col: '#1a1a1a', pass2: false });
    crate(-80, 1880, 260, 160, { col: '#6a4a2a', txt: 'АММОНИТ' }); wheelbarrow(120, 1820, 0.9, { rock: '#7a6a58' });
    for (let k = 0; k < 3; k++) { const ph = ((t * 1.3 + k * 0.37) % 1); ell(860 + k * 60, lerp(-80, 1600, ph), 4, 9, { wash: '#a8c8e0', washA: 0.8, line: false }); }   // капель
  }
  function hud(t) {                                                  // разрез горы: крошечный тоннель и 200 м скалы над ним
    if (t < EV.dr_200 - 0.1) return; const k = popK(t, EV.dr_200 - 0.1, 0.4);
    push(580, 900, 0.75 + 0.25 * k); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.82)'; ctx.fillRect(-300, -220, 600, 380); ctx.restore(); pencil([[-300, -220], [300, -220], [300, 160], [-300, 160], [-300, -220]], { w: 3, col: K.amber, pass2: false });
    const m = []; for (let q = 0; q <= 30; q++) { const f = q / 30; m.push([-280 + f * 560, 120 - Math.sin(f * Math.PI) ** 0.7 * 300]); } m.push([280, 140], [-280, 140]); const mp = shape(m.concat([m[0]]), { wash: '#4a5a4a', washA: 1, w: 2, col: '#0e140e' }); hatch(mp.path, mp.bb, { gap: 6, a: 0.3, col: '#1a2a1a', ang: 0.8, w: 1 });
    for (let q = 0; q < 12; q++) spruce(-240 + q * 44, 110 - Math.sin((q / 11) * Math.PI) ** 0.7 * 290 + 6, 26, t, q + 900, { far: 1 });
    rect(-120, 100, 240, 26, { wash: '#ffcf7a', washA: 1, w: 1.6, col: '#3a1a0a' }); glow(0, 112, 80, 'rgba(255,200,120,1)', 0.7);
    const a = sm(clamp((t - EV.dr_200) / 0.6)); pencil([[200, 96], [200, lerp(96, -170, a)]], { w: 5, col: K.amber, pass2: false }); pencil([[188, -154], [200, -176], [212, -154]], { w: 5, col: K.amber, a, pass2: false });
    txt('200 м', 110, -40, 48, { col: K.amber, font: 'Osw', a }); txt('скалы', 110, 4, 30, { col: '#f6e7c8', font: 'Osw', a }); pop();
  }

  WORLD.drill = (t, u, cat) => {
    lay(14, () => tunnel(t));
    lay(9, () => { gear(t); frames(t); });
    lay(4, () => crews(t));
    rays(VX, VY - 40, Math.PI / 2, 1.6, 1500, 'rgba(255,214,150,0.5)', 0.16, 8, t);
    motes(70, [0, 300, 1080, 1700], '#e8d4b0', t, 19330, { sp: 6, vx: 10, sz: 2.4, a: 0.55, wob: 30 });
    lay(1, () => { near(t); cat(); });
    lay(0.6, () => { for (const sd of [-1, 1]) { const x = sd < 0 ? -160 : 1240; pencil([[x, 2400], [x - sd * 40, -200]], { w: 120, col: '#4a3418', pass2: false }); pencil([[x + sd * 30, 2400], [x - sd * 10, -200]], { w: 16, col: '#8a6a34', a: 0.6, pass2: false }); } pencil([[-300, -60], [1400, -40]], { w: 120, col: '#3a2a12', pass2: false }); });
    haze('#2a1a0a', 0.08);
  };
  DIR.drill = {
    outfit: 'miner', light: { side: -1, rim: '#ffcf8a' }, grade: ['#6a4010', 0.14],
    act: () => [[S0.drill, 'neutral'], [EV.dr_zek, 'annoyed'], [EV.dr_gryz, 'scared'], [EV.dr_200, 'awe'], [EV.dr_200 + 0.8, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.04, look: t < EV.dr_200 ? [0.6, -0.1] : [0.3, -0.7], prop: 'lantern', hand: [92, -250], tilt: t > EV.dr_gryz && t < EV.dr_gryz + 0.5 ? Math.sin(t * 40) * 0.02 : 0, frost: 0 }),
    cam: () => [[S0.drill, 640, 1000, 0.3], [EV.dr_stroy, 560, 980, 0.16], [EV.dr_gryz, 600, 960, 0.2, 'x'], [EV.dr_200, 620, 1000, 0.1], [S1.drill, 600, 1000, 0.14]],
    hud
  };
  TRANS_IN.drill = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {      // фара паровоза → темнота → луч лампы раскрывает забой
    if (k < 0.45) { drawBuf(A, 1 + k * 0.4, 540, 900); scr(() => { const f = sm(k / 0.45); glow(560, 880, 200 + f * 1600, 'rgba(255,246,220,1)', f); screenFill('#000', f * 0.9); }); }
    else { const f = sm((k - 0.45) / 0.55); screenFill('#000', 1); inCircle(380, 980, Math.pow(f, 1.4) * 2000 + 20, () => drawBuf(B)); scr(() => glow(380, 980, 300, 'rgba(255,220,150,1)', 0.6 * (1 - f))); }
  } };
})();
