/* 003 — сцена `heli`: 1909, двор под Киевом. Студент Игорь Сикорский строит вертолёт № 1: деревянная рама, мотор «Анзани»
   25 л. с., два соосных винта. Вертолёт пробует взлететь — подпрыгивает и плюхается (тяга ≈162 кг < вес ≈207 кг).
   «Окно во времени»: VS-300, 1939, Коннектикут — уже летает. Фон: каштаны в цвету, забор, сарай, на горе — Андреевская церковь.
   Переход В сцену: Spider-Verse-провал из туннеля, взрыв стружки. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.heli_land = S0.heli + 0.05;                  // приземление, стружка
  EV.heli_spin = wt('s1', 'строит');              // мотор чихает, винты раскручиваются
  EV.heli_hop = wt('s1', 'вертолёт.') + 0.2;      // попытка взлёта: дрожь, подскок
  EV.heli_fail = wt('s1', 'взлетел!');            // плюх
  EV.heli_us = (CAPS.find(c => c.key === 's1' && c.words[0] === 'Взлетел') || { t0: LF('s1', 0.5) }).t0;               // окно в 1939
  EV.heli_am = wt('s1', 'Америке.');
  SHAKES.push([EV.heli_land, 0.25, 9], [EV.heli_fail, 0.3, 12]);
  KEYW.push('взлетел!', 'Америке.');

  const HX = 400, HY = 1452;
  const spinAt = t => t < EV.heli_spin ? 0 : t < EV.heli_fail ? clamp((t - EV.heli_spin) / 0.6) : Math.max(0, 1 - (t - EV.heli_fail) / 1.4);
  const liftAt = t => t < EV.heli_hop ? 0 : t < EV.heli_fail ? Math.sin(clamp((t - EV.heli_hop) / (EV.heli_fail - EV.heli_hop)) * Math.PI * 0.5) * 22 + Math.sin(t * 60) * 3 : Math.max(0, 1 - (t - EV.heli_fail) / 0.12) * 22;

  function andrew(x, y, s) {                                         // Андреевская церковь (Растрелли): зелёный купол, 4 башенки, золото
    push(x, y, s); const G = '#5f9a86', GD = '#2a4e44', Wl = '#efe6d2', Au = '#d6a842';
    rect(-120, -40, 240, 70, { wash: '#a89678', washA: 1, w: 1.8, col: '#4a3e2e' });
    rect(-90, -170, 180, 130, { wash: Wl, washA: 1, w: 2, col: '#4a3e2e' }); for (const xx of [-60, 0, 60]) rect(xx - 10, -150, 20, 40, { wash: '#7a8c90', washA: 1, w: 1.2 });
    for (const sx of [-1, 1]) { rect(sx * 112 - 22, -230, 44, 190, { wash: Wl, washA: 1, w: 1.8, col: '#4a3e2e' }); blob([[sx * 112 - 24, -230], [sx * 112, -290], [sx * 112 + 24, -230]], { wash: G, washA: 1, w: 1.6, col: GD }); line([[sx * 112, -290], [sx * 112, -330]], { w: 3, col: Au }); }
    rect(-46, -260, 92, 90, { wash: Wl, washA: 1, w: 1.8, col: '#4a3e2e' }); const d = blob([[-58, -258], [-50, -330], [0, -372], [50, -330], [58, -258]], { wash: G, washA: 1, w: 2, col: GD }); shadeG(d.path, 50, 0, -40, 0, GD, 0.5);
    rect(-12, -400, 24, 30, { wash: G, washA: 1, w: 1.4, col: GD }); ell(0, -408, 12, 10, { wash: Au, washA: 1, w: 1.4 }); line([[0, -416], [0, -470]], { w: 3.4, col: Au }); line([[-12, -452], [12, -452]], { w: 3, col: Au });
    pop();
  }
  function chestnut(x, y, h, t, seed) {                              // каштан в цвету: ствол с ветками, много гроздьев листвы, белые «свечи» соцветий
    const r = rng(seed); const tr = shape(tubeP([[x, y], [x - 8, y - h * 0.3], [x + 6, y - h * 0.55]], 46, 24), { wash: '#5a3e2a', washA: 1, w: 2.4, col: '#1e120a' }); fstr(tr.path, tr.bb, 20, 1.57, 60, '#2a1a0e', 0.5, seed + 90);
    for (const [dx, dy] of [[-140, -0.7], [150, -0.72], [-60, -0.85], [80, -0.9]]) pencil([[x, y - h * 0.5], [x + dx * 0.6, y + h * dy * 0.95], [x + dx, y + h * dy]], { w: 10, col: '#4a3222' });
    for (let k = 0; k < 22; k++) { const a = -Math.PI * (0.05 + 0.9 * r()), rr = h * (0.15 + 0.32 * r()); const cx = x + Math.cos(a) * rr * 1.35, cy = y - h * 0.62 + Math.sin(a) * rr * 0.75, R = h * (0.09 + 0.06 * r());
      const c = ['#3e6a30', '#4f7a3a', '#5e8a42', '#355e2a'][k % 4]; const b = blob(ellPts(cx, cy, R, R * 0.8, r(), 0, 12).map(([px, py], i) => [px + Math.sin(i * 2.1 + k) * R * 0.18, py + Math.cos(i * 1.7 + k) * R * 0.18]), { wash: c, washA: 0.97, w: 1.6, col: '#1e3414', key: seed + k });
      for (let q = 0; q < 5; q++) { const la = -1.4 + q * 0.7; pencil([[cx, cy + R * 0.2], [cx + Math.cos(la) * R * 0.7, cy + Math.sin(la) * R * 0.6]], { w: 1.4, col: '#2a4a1e', a: 0.6, pass2: false }); }
      shadeG(b.path, cx, cy - R, cx, cy + R, '#9ac06a', 0.25); }
    for (let k = 0; k < 26; k++) { const cx = x + (r() - 0.5) * h * 1.05, cy = y - h * (0.42 + r() * 0.5), sw = Math.sin(t * 1.6 + k) * 2;
      for (let q = 0; q < 6; q++) { const yy = cy - q * 5, ww = 7 - q; ell(cx + sw * q / 6, yy, ww, 3.4, { wash: q % 2 ? '#fdf8ee' : '#f4ecdc', washA: 1, line: false }); } ell(cx, cy - 12, 1.8, 1.8, { wash: '#e0607a', washA: 0.9, line: false }); }
  }
  function shed(t) {                                                 // сарай-мастерская с открытыми воротами
    const b = shape([[-140, 1330], [-140, 900], [80, 780], [300, 900], [300, 1330]], { wash: '#9a7650', washA: 1, w: 3, col: '#2a1a0c', key: 7300 });
    for (let x = -130; x < 300; x += 26) pencil([[x, 1330], [x, x < 80 ? 900 - (x + 140) * 0.55 : 780 + (x - 80) * 0.55]], { w: 1.6, col: '#4a3218', a: 0.6, pass2: false });
    rect(-60, 1000, 200, 330, { wash: '#1e140c', washA: 1, w: 2.6, col: '#140c06' }); glow(40, 1200, 160, 'rgba(255,190,110,1)', 0.25);
    poly([[-150, 905], [80, 770], [310, 905], [300, 925], [80, 800], [-140, 925]], { wash: '#5a4430', washA: 1, w: 2.4, col: '#2a1a0c' });
    for (const [x, y] of [[-20, 1180], [70, 1210], [10, 1260]]) rect(x, y, 40, 14, { wash: '#c8a070', washA: 0.8, w: 1 });
  }
  function fence() { for (let x = 300; x < 1300; x += 34) { const h = 210 + Math.sin(x * 0.7) * 10; const p = poly([[x, 1340], [x, 1340 - h], [x + 14, 1340 - h - 14], [x + 28, 1340 - h], [x + 28, 1340]], { wash: '#a88458', washA: 1, w: 1.8, col: '#3a2410' }); }
    pencil([[300, 1180], [1300, 1180]], { w: 10, col: '#6a4a2a' }); pencil([[300, 1290], [1300, 1290]], { w: 10, col: '#6a4a2a' }); }
  function ground(t) {
    const g = shape([[-300, 1320], [1400, 1320], [1400, 2400], [-300, 2400]], { wash: '#a88a62', washA: 1, w: 2, col: '#3a2a18', key: 7310 }); hatch(g.path, g.bb, { gap: 9, a: 0.15, col: '#3a2a18', ang: 0.05, key: 7311 });
    const r = rng(7312); for (let k = 0; k < 60; k++) { const x = -100 + r() * 1300, y = 1350 + r() * 600; pencil([[x, y], [x + 10 + r() * 14, y - 6 + r() * 12]], { w: 3, col: '#e8cf98', a: 0.8, pass2: false }); }
    // верстак справа
    rect(880, 1260, 300, 26, { wash: '#7a5432', washA: 1, w: 2.4, col: '#2a1a0c' }); for (const x of [900, 1140]) rect(x, 1286, 18, 140, { wash: '#6a4426', washA: 1, w: 2, col: '#2a1a0c' });
    poly([[930, 1260], [990, 1260], [980, 1232], [940, 1232]], { wash: '#8a8e92', washA: 1, w: 1.6 }); pencil([[1020, 1250], [1100, 1236]], { w: 6, col: '#5a5e62', pass2: false });
  }
  function rotor(cx, cy, R, ang, spin, droop, col) {                 // винт: две лопасти, при вращении — диск-размытие
    if (spin > 0.25) { ctx.save(); ctx.globalAlpha = 0.22 * spin; ctx.fillStyle = '#d8c8a8'; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.09, 0, 0, 6.283); ctx.fill(); ctx.restore(); pencil(ellPts(cx, cy, R, R * 0.09, 0, 0.05, 50), { w: 1.4, col: '#5a4428', a: 0.4 * spin, pass2: false }); }
    for (const sd of [0, Math.PI]) { const a = ang + sd, ex = cx + Math.cos(a) * R, ey = cy + Math.sin(a) * R * 0.09 + droop * Math.abs(Math.cos(a)) * 30;
      const bl = shape(tubeP([[cx, cy], [lerp(cx, ex, 0.5), lerp(cy, ey, 0.5) + droop * 6], [ex, ey]], 26, 16), { wash: col, washA: 1 - spin * 0.45, w: 2.2, col: '#3a2410', a: 1 - spin * 0.4 }); }
    ell(cx, cy, 12, 8, { wash: '#8a8e92', washA: 1, w: 2 });
  }
  function heli(x, y, s, t) {                                        // вертолёт Сикорского № 1
    const sp = spinAt(t), lift = liftAt(t), droop = t > EV.heli_fail ? sm((t - EV.heli_fail) / 0.4) * 0.6 : 0, sh = sp * Math.sin(t * 70) * 2.5;
    push(x + sh, y - lift, s);
    ell(0, lift / s + 4, 210, 18, { wash: '#2a1a0c', washA: 0.25, line: false });
    for (const [x0, x1] of [[-170, -120], [170, 120]]) { pencil([[x0, 0], [x1, -150]], { w: 12, col: '#8a6238' }); pencil([[x0 * 0.6, 0], [x1 * 0.4, -150]], { w: 9, col: '#7a5430' }); }
    pencil([[-150, -60], [150, -60]], { w: 9, col: '#8a6238' }); pencil([[-150, -60], [0, -150], [150, -60]], { w: 5, col: '#6a4a26', a: 0.8 });
    rect(-150, -170, 300, 22, { wash: '#9a6e40', washA: 1, w: 2.4, col: '#2a1a0c' }); txt('И. СИКОРСКИЙ · № 1', 0, -158, 18, { font: 'Osw', col: '#2a1a0c' });
    // мотор «Анзани»: веер из трёх цилиндров
    for (const a of [-0.7, 0, 0.7]) { push(-60, -196, 1, a); const c = rect(-13, -78, 26, 70, { wash: '#6a6e72', washA: 1, w: 2, col: '#1e2226' }); for (let k = 0; k < 7; k++) pencil([[-17, -72 + k * 9], [17, -72 + k * 9]], { w: 2, col: '#3a3e42', pass2: false, gap: false }); pop(); }
    ell(-60, -196, 32, 32, { wash: '#8a8e92', washA: 1, w: 2.6, col: '#1e2226', key: 7320 }); ell(-60, -196, 10, 10, { wash: '#3a3e42', washA: 1, w: 1.4 });
    if (sp > 0) for (let k = 0; k < 4; k++) { const u = (t * 1.6 + k / 4) % 1; glow(-110 - u * 80, -230 - u * 160, 30 + u * 60, 'rgba(90,86,80,1)', 0.45 * (1 - u) * sp, 'source-over'); }
    pencil([[-40, -190], [0, -260]], { w: 3, col: '#3a2a1a' }); pencil([[-80, -190], [0, -250]], { w: 3, col: '#3a2a1a' });
    // вал и винты
    rect(-7, -560, 14, 400, { wash: '#7a7e82', washA: 1, w: 2, col: '#1e2226' }); pencil([[-90, -150], [-6, -470]], { w: 3, col: '#5a5e62', a: 0.8 }); pencil([[90, -150], [6, -470]], { w: 3, col: '#5a5e62', a: 0.8 });
    const A = t * (sp * 26) + 0.4;
    rotor(0, -450, 330, A, sp, droop, '#b88a50'); rotor(0, -556, 300, -A * 1.05 + 1.2, sp, droop * 0.8, '#c89a5a');
    pop();
    if (t > EV.heli_fail && t < EV.heli_fail + 0.8) { const q = (t - EV.heli_fail) / 0.8; for (let k = 0; k < 9; k++) { const r = rng(k * 7 + 1); glow(x + (r() - 0.5) * 460 * (0.4 + q), y - 10 - r() * 60 * q, 60 + q * 90, 'rgba(200,170,120,1)', 0.55 * (1 - q), 'source-over'); } }
  }
  function window39(t) {                                             // окно во времени: VS-300, 1939
    const k = sm((t - EV.heli_us) / 0.35) * (1 - sm((t - S1.heli + 0.25) / 0.25)); if (k <= 0) return;
    const cx = 820, cy = 760, R = 190 * k;
    inCircle(cx, cy, R, () => { scr(() => { vgrad(cy - R, cy + R, ['#7ab8e0', '#e8f2f4']); const fx = cx + Math.sin(t * 1.3) * 40, fy = cy - 10 + Math.sin(t * 2.1) * 12;
      push(fx, fy, 0.9); pencil([[-110, 10], [100, 10]], { w: 6, col: '#3a3a3a' }); poly([[-100, -20], [-30, -24], [-20, 20], [-100, 18]], { wash: '#e8e2d2', washA: 1, w: 2 }); pencil([[-30, 0], [150, -10]], { w: 7, col: '#c8a040' });
      ell(150, -10, 4, 34, { wash: '#888', washA: 0.5, line: false }); pencil([[-60, -24], [-60, -70]], { w: 5, col: '#3a3a3a' }); ell(-60, -72, 160, 9, { wash: '#888', washA: 0.4, line: false }); pencil([[-90, 22], [-110, 46], [-40, 46], [-60, 22]], { w: 3, col: '#3a3a3a' }); pop(); }); });
    scr(() => { ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8'], k * 0.7); push(cx, cy + R + 44, k); txt('США · 1939', 0, 0, 46, { font: 'Osw', col: '#fff4d8' }); pop(); });
  }

  function cloudH(x, y, w, h, seed) { const r = rng(seed); for (let k = 0; k < 6; k++) ell(x + (k - 2.5) * w / 6 + (r() - 0.5) * 20, y - Math.sin(k / 5 * Math.PI) * h * 0.5, w * 0.17 + r() * 16, h * 0.42, { wash: '#fff8ea', washA: 0.85, w: 1.2, col: '#b8a888', a: 0.3 }); }
  function shedInside(t) {                                           // в воротах сарая: верстак, инструменты на стене, чертежи, лампа
    push(40, 1000, 1); ctx.save(); ctx.beginPath(); ctx.rect(-100, 0, 200, 330); ctx.clip();
    for (let k = 0; k < 6; k++) { const x = -80 + k * 30; pencil([[x, 40], [x, 60 + (k % 3) * 20]], { w: 3, col: '#a8a8a8', pass2: false }); }
    pencil([[-70, 40], [-50, 90]], { w: 6, col: '#7a5a34' }); ell(-48, 96, 12, 8, { wash: '#8a8e92', washA: 1, w: 1.4 });
    rect(10, 30, 70, 50, { wash: '#e8e0cc', washA: 1, w: 1.4, col: '#3a2a14' }); pencil([[20, 70], [40, 44], [60, 70]], { w: 1.6, col: '#2a4a8a', pass2: false }); ell(40, 44, 14, 3, { wash: 'rgba(0,0,0,0)', washA: 0, w: 1.4, col: '#2a4a8a' });
    rect(-90, 200, 180, 16, { wash: '#7a5432', washA: 1, w: 1.6 }); for (const bx of [-60, 40]) rect(bx, 216, 10, 110, { wash: '#6a4426', washA: 1, w: 1.2 });
    pencil([[0, 0], [0, 120]], { w: 1.4, col: '#2a2a2a', pass2: false }); ell(0, 128, 14, 10, { wash: '#ffe6a8', washA: 1, w: 1.4 }); glow(0, 140, 120, 'rgba(255,214,140,1)', 0.45 + Math.sin(t * 9) * 0.03);
    ctx.restore(); pop();
  }
  function yardProps(t) {                                            // ящик «ANZANI», бочка с бензином, велосипед, куры, бельё, ребята за забором
    push(640, 1440, 1); const cr = rect(-90, -110, 180, 110, { wash: '#b8905a', washA: 1, w: 2.4, col: '#2a1a0a', key: 7350 }); fstr(cr.path, cr.bb, 14, 0.02, 160, '#6a4a24', 0.35, 7351); for (const y of [-80, -40]) pencil([[-90, y], [90, y]], { w: 2, col: '#5a3a1a', pass2: false });
    txt('ANZANI', 0, -70, 30, { font: 'Osw', col: '#2a1a0a' }); txt('PARIS · 25 HP', 0, -32, 20, { font: 'Osw', col: '#5a2a1a' }); pop();
    push(-180, 1450, 1); const br = blob([[-40, 0], [-44, -90], [-30, -110], [30, -110], [44, -90], [40, 0]], { wash: '#3a5a3a', washA: 1, w: 2.2, col: '#1a2a1a' }); for (const y of [-20, -88]) pencil([[-42, y], [42, y]], { w: 4, col: '#2a2a2a', pass2: false }); txt('БЕНЗИНЪ', 0, -56, 18, { font: 'Osw', col: '#e8e0c0' }); pop();
    push(1000, 1420, 0.9); for (const wx of [-60, 60]) { pencil(ellPts(wx, 0, 44, 44, 0, 0.05, 30), { w: 3, col: '#2a2a2a', pass2: false }); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283; pencil([[wx, 0], [wx + Math.cos(a) * 44, Math.sin(a) * 44]], { w: 1, col: '#6a6a6a', pass2: false }); } }
      pencil([[-60, 0], [0, -50], [60, 0], [-10, -6], [-60, 0]], { w: 4, col: '#2a2a2a', pass2: false }); pencil([[0, -50], [10, -80], [40, -84]], { w: 4, col: '#2a2a2a', pass2: false }); ell(-14, -54, 14, 4, { wash: '#4a2a1a', washA: 1, w: 1 }); pop();
    for (let k = 0; k < 3; k++) { const x = 200 + k * 110 + Math.sin(t * 1.3 + k) * 20, y = 1520 + k * 30, pk = Math.max(0, Math.sin(t * 5 + k * 2)) * 10; push(x, y, 0.7, 0, k % 2 ? -1 : 1);
      blob([[-30, 0], [-36, -30], [-10, -46], [20, -40], [34, -20], [24, 0]], { wash: k === 1 ? '#c87a3a' : '#f4ece0', washA: 1, w: 2, col: '#3a2a1a' }); ell(26, -48 + pk, 12, 12, { wash: k === 1 ? '#c87a3a' : '#f4ece0', washA: 1, w: 1.8, col: '#3a2a1a' });
      poly([[36, -48 + pk], [48, -44 + pk], [36, -40 + pk]], { wash: '#e8a030', washA: 1, w: 1 }); blob([[22, -60 + pk], [26, -70 + pk], [32, -60 + pk]], { wash: '#c8241e', washA: 1, w: 1 }); ell(30, -50 + pk, 2, 2, { wash: '#1a0e06', washA: 1, line: false }); pencil([[-4, 0], [-4, 14]], { w: 2, col: '#c8901a', pass2: false }); pencil([[8, 0], [8, 14]], { w: 2, col: '#c8901a', pass2: false }); pop(); }
    pencil([[320, 1060], [1180, 1020]], { w: 2, col: '#3a3a3a', pass2: false }); for (const [x, c, w] of [[420, '#f4f0e6', 60], [520, '#c8d8e8', 50], [620, '#e8c8c0', 70], [1040, '#f4f0e6', 56]]) { const y = 1056 - (x - 320) * 0.046, sw = Math.sin(t * 2 + x) * 4; poly([[x, y], [x + w, y - 2], [x + w + sw, y + 70], [x + sw, y + 74]], { wash: c, washA: 1, w: 1.6, col: '#5a5a5a' }); }
  }
  WORLD.heli = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1500, ['#e9d2a0', '#f4e3be', '#cfe0dc']); glow(900, 360, 420, 'rgba(255,236,190,1)', 0.5); cloudH(200, 380, 420, 120, 7361); cloudH(860, 520, 320, 90, 7362); });
    lay(14, () => { const P = [[-400, 1000]]; for (let x = -400; x <= 1500; x += 50) P.push([x, 1000 - Math.sin(x * 0.004 + 1) * 120 - (x < 400 ? 100 : 0)]); P.push([1500, 1500], [-400, 1500]); shape(P, { wash: '#a8a07a', washA: 1, w: 1.6, col: '#4a4430', a: 0.5 });
      for (let k = 0; k < 14; k++) { const x = -200 + k * 120, y = 960 - Math.sin(x * 0.004 + 1) * 120 - (x < 400 ? 100 : 0); rect(x, y - 50, 70, 54, { wash: k % 3 ? '#e4d8c0' : '#d8c4a4', washA: 1, w: 1.2, col: '#5a4a38', a: 0.6 }); poly([[x - 6, y - 50], [x + 35, y - 84], [x + 76, y - 50]], { wash: k % 2 ? '#8a4a3a' : '#5a6a5a', washA: 1, w: 1.2, col: '#3a2a20', a: 0.6 }); }
      andrew(250, 830, 0.85); haze('#efe0c0', 0.28); });
    lay(4, () => { chestnut(-40, 1340, 760, t, 7330); chestnut(1160, 1340, 700, t, 7340); });
    lay(1.6, () => { fence(); shed(t); shedInside(t); for (const [x, o] of [[560, { body: '#4a5a7a', hat: 'cap', hatCol: '#3a3a3a', face: 'shock', seed: 71 }], [650, { body: '#c8a878', hat: 'scarf', hatCol: '#d8504a', face: 'smile', armL: 'wave', seed: 72 }]]) { ctx.save(); ctx.beginPath(); ctx.rect(x - 90, 880, 180, 225); ctx.clip(); human(x, 1300, 0.78, t, o); ctx.restore(); } });
    lay(1, () => { ground(t); yardProps(t); heli(HX, HY, 1.3, t); cat(); });
  };
  DIR.heli = {
    outfit: 'aviator', light: { side: 1, rim: '#ffe6b0' }, grade: ['#c08a4a', 0.14],
    act: () => [[S0.heli, 'awe'], [EV.heli_spin, 'proud'], [EV.heli_hop, 'suspicious'], [EV.heli_fail + 0.05, 'annoyed'], [EV.heli_us, 'smug'], [EV.heli_am, 'wink']],
    pose: (t, u, b) => Object.assign(b, {
      x: 860, y: 1470, s: 1.0, look: t < EV.heli_us ? [-0.6, -0.25] : [0.3, -0.5],
      hand: t > EV.heli_us ? [90, -380] : t > EV.heli_spin && t < EV.heli_fail ? [-120, -300] : undefined, point: t > EV.heli_us ? 1 : undefined,
      tilt: t > EV.heli_fail && t < EV.heli_us ? -0.06 : 0, squash: b.squash + (t > EV.heli_fail && t < EV.heli_fail + 0.25 ? 0.12 : 0), tailUp: t > EV.heli_us
    }),
    cam: () => [[S0.heli, 520, 1000, -1.35], [S0.heli + 0.55, 560, 1040, 0.0, 'x'], [EV.heli_hop, 480, 1080, 0.06], [EV.heli_fail, 460, 1120, 0.1], [EV.heli_us, 620, 980, 0.06], [S1.heli, 660, 960, 0.1]],
    hud: t => { if (t > EV.heli_fail && t < EV.heli_us + 0.1) note('тяга 162 кг < вес 207 кг', 420, 1360, t, EV.heli_fail, EV.heli_us + 0.1, '#2a1a0c', 50, -0.04); window39(t); }
  };
  // ---------------------------------------------------------------- переход В сцену: провал с ускорением + взрыв стружки
  TRANS_IN.heli = { a: 0.12, b: 0.42, fx(k, t, A, B) {
    if (k < 0.22) { drawBuf(A, 1 + k * 3, 540, 960, 1); whiteOut(k / 0.22 * 0.9, '255,240,210'); return; }
    const q = (k - 0.22) / 0.78; drawBuf(B); whiteOut((1 - q) * 0.9 * (1 - q), '255,240,210');
    scr(() => { for (let i = 0; i < 70; i++) { const r = rng(i * 13 + 5), a = r() * 6.283, d = (120 + r() * 700) * sm(q) * 1.6, x = 560 + Math.cos(a) * d, y = 1300 + Math.sin(a) * d * 0.8 - q * 260 * r();
      push(x, y, 1, a + q * 8 * (r() - 0.5)); const c = ['#e8cf98', '#d8b878', '#f4e2b4'][i % 3]; pencil([[-14, 0], [-4, -6], [8, -4], [14, 4]], { w: 5, col: c, a: 1 - q * 0.8, pass2: false }); pop(); } });
  } };
})();
