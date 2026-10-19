/* 004 — сцена `arch`: 1840, площадь перед собором Рождества. Колокольню не трогают (на ней табличка «не трогать!»), а перед собором растёт
   Триумфальная арка — леса, каменщики с блоками, подвода с камнем-котельцом. «построили арку» — арка «вырастает» ярус за ярусом;
   «В честь победы…» — лавровый венок и барабанщик; «и для колокола» — колокол поднимают во второй ярус, он бьёт — кольца звука.
   Переход В сцену: звуковая волна «БУМ» кольцами расходится от колокола и открывает новую сцену. */
(() => {
  EV.ar_point = WT('s8', 'Колокольню') + 0.1;     // Том показывает на колокольню
  EV.ar_build = WT('s8', 'построили');           // арка растёт
  EV.ar_glory = WT('s8', 'честь');               // венок, барабан
  EV.ar_bell = WT('s8', 'для');                  // колокол в ярус
  EV.ar_ring = WT('s8', 'колокола.') + 0.15;      // удар
  SHAKES.push([EV.ar_ring, 0.25, 8]);
  KEYW.push('тронули', 'арку.', 'победы…', 'колокола.');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const AX = 760, AY = 1470, AS = 0.92;           // арка
  function sky(t) { vgrad(-900, 1300, ['#4a7ab8', '#9ac0e0', '#f6e2b8']); glow(820, 300, 480, 'rgba(255,240,200,1)', 0.45);
    for (let k = 0; k < 5; k++) { const r = rng(10300 + k), cx = ((r() * 1700 + t * 12) % 1900) - 400, cy = 80 + r() * 360; for (let q = 0; q < 5; q++) ell(cx + q * 66 - 132, cy - Math.sin(q / 4 * Math.PI) * 34, 72, 38, { wash: '#fffaf0', washA: 0.85, line: false }); }
    for (let i = 0; i < 6; i++) { const r = rng(10310 + i), x = ((r() * 1400 + t * 70) % 1600) - 200, y = 260 + r() * 200, f = Math.sin(t * 9 + i) * 10; pencil([[x - 20, y + f], [x, y], [x + 20, y + f]], { w: 3, col: '#2a2a3a', pass2: false }); } }
  function town(t) {
    for (let k = 0; k < 10; k++) { const r = rng(10320 + k); bHouse(-400 + k * 220, 1220, 200, 90, { seed: 80 + k, roof: k % 2 ? 'tile' : 'reed', s: 0.6, t, smoke: k % 3 === 0 }); }
    for (let k = 0; k < 9; k++) { const r = rng(10330 + k); poplar(-300 + k * 210 + r() * 50, 1220, 220 + r() * 90, t, 10330 + k, '#4a7a4a'); }
    haze('#efe2c8', 0.26);
  }
  function stoneCart(t) {                         // подвода с блоками котельца и лошадь
    push(1180, 1420, 0.62); const L = '#1e140a';
    rect(-150, -110, 300, 60, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) rect(-140 + (q % 3) * 92, -150 - Math.floor(q / 3) * 38, 86, 38, { wash: '#efe2c4', washA: 1, w: 1.8, col: '#7a6040' });
    for (const wx of [-90, 100]) { ell(wx, -40, 44, 44, { wash: '#5a3a20', washA: 0.2, w: 3, col: L }); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283; pencil([[wx, -40], [wx + Math.cos(a) * 42, -40 + Math.sin(a) * 42]], { w: 2, col: L, pass2: false }); } }
    push(260, 0, 1, 0, -1); blob([[-80, -100], [-50, -150], [60, -150], [80, -110], [70, -80], [-70, -80]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const lx of [-50, -30, 40, 60]) pencil([[lx, -84], [lx, 0]], { w: 8, col: '#4a3018', pass2: false });
    shape([[-60, -140], [-100, -230], [-70, -240], [-40, -150]], { wash: '#6a4a2a', washA: 1, w: 1.8, col: L }); ell(-96, -238, 26, 16, { wash: '#6a4a2a', washA: 1, w: 1.8, col: L }); pop();
    pop();
  }
  function masons(t) {                            // каменщики: несут блок, тешут камень, наверху лесов кладут
    const build = sm(fade(t, EV.ar_build - 0.6, EV.ar_build + 0.8));
    human(470, 1480, 0.62, t, { body: '#efe6d0', bodyD: '#a89a7a', belt: '#a8302a', hat: 'cap', hatCol: '#6a5a4a', hair: '#3a2a1a', beard: 'short', face: 'calm', armL: 'up', armR: 'up', seed: 1301 });
    push(470, 1480 - 0.62 * 340, 0.62); rect(-60, -40, 120, 50, { wash: '#efe2c4', washA: 1, w: 2, col: '#7a6040' }); pop();
    human(1070, 1490, 0.64, t, { body: '#8a6a4a', bodyD: '#4a3420', belt: '#2a1a10', hat: 'fur', hatCol: '#2a2420', hair: '#6a6a6a', beard: 'long', face: 'angry', armR: 'swing', prop: 'axe', seed: 1302, flip: -1 });
    rect(960, 1450, 90, 50, { wash: '#efe2c4', washA: 1, w: 2, col: '#7a6040' });
    if (build < 1) for (let i = 0; i < 3; i++) { const yy = AY - 680 * AS * build - 10; human(AX - 200 + i * 200, yy + 4, 0.42, t, { body: '#efe6d0', hat: 'cap', hatCol: '#5a4a3a', face: 'calm', armL: 'hold', armR: i % 2 ? 'up' : 'hold', seed: 1305 + i }); }
  }
  function hoistBell(t) {                         // колокол поднимают во второй ярус: канат, блок, колокол качается и бьёт
    const k = sm(fade(t, EV.ar_bell - 0.5, EV.ar_ring - 0.05)), yTop = AY - 506 * AS, y = lerp(AY - 20, yTop, k);
    const ring = t > EV.ar_ring ? Math.sin((t - EV.ar_ring) * 7) * 0.25 * Math.exp(-(t - EV.ar_ring) * 1.2) : 0;
    if (k < 0.999) { pencil([[AX, y - 300 * 0.12], [AX, AY - 760 * AS]], { w: 3, col: '#c8b088', pass2: false }); ell(AX, AY - 760 * AS, 14, 14, { wash: '#6a4428', washA: 1, w: 2, col: '#1a0e06' }); pencil([[AX - 360, AY - 770 * AS], [AX + 360, AY - 770 * AS]], { w: 10, col: '#7a5432', pass2: false });
      kBell(AX, y, 0.12, t, { swing: Math.sin(t * 3) * 0.06 }); }
    return { bellIn: k >= 0.999 ? 1 : 0, ring };
  }
  function wreath(t) {                            // лавровый венок «в честь победы» над аркой
    if (t < EV.ar_glory - 0.05) return; const k = popK(t, EV.ar_glory, 0.4), y = AY - 790 * AS;
    push(AX, y, 0.9 * k); for (const sd of [-1, 1]) for (let q = 0; q < 9; q++) { const a = Math.PI / 2 + sd * (0.3 + q * 0.28), x = Math.cos(a) * 90, yy = Math.sin(a) * 70; push(x, yy, 1, a + sd * 0.8); blob([[0, 0], [10, -10], [26, -6], [30, 0], [26, 6], [10, 10]], { wash: q % 2 ? '#4a7a2e' : '#5a8a3a', washA: 1, w: 1.4, col: '#1e3a14' }); pop(); }
    pencil([[-20, 76], [-40, 110]], { w: 6, col: '#a8302a', pass2: false }); pencil([[20, 76], [40, 110]], { w: 6, col: '#a8302a', pass2: false }); glow(0, 0, 160, 'rgba(255,230,150,1)', 0.4); txt('1828–1829', 0, 6, 30, { font: 'Osw', col: '#5a3a10' }); pop();
  }
  function drummer(t) {                           // барабанщик в мундире
    if (t < EV.ar_glory - 0.3) return; const hit = Math.abs(Math.sin(t * 14));
    human(300, 1470, 0.6, t, { body: '#24402e', bodyD: '#0e2016', trim: '#e6c050', belt: '#e8e0d0', hat: 'cap', hatCol: '#1a2a1e', hair: '#3a2a1a', face: 'smile', armL: 'hold', armR: 'hold', seed: 1311 });
    push(300, 1470 - 0.6 * 130, 0.6); const d = rect(-46, -40, 92, 70, { wash: '#efe2c4', washA: 1, w: 2, col: '#2a1a0e' }); for (let q = 0; q < 4; q++) pencil([[-46 + q * 30, -40], [-30 + q * 30, 30]], { w: 2, col: '#a8302a', pass2: false }); pencil([[-30, -60 - hit * 20], [0, -40]], { w: 4, col: '#6a4428', pass2: false }); pencil([[30, -60 - (1 - hit) * 20], [0, -40]], { w: 4, col: '#6a4428', pass2: false }); pop();
  }
  function plaza(t) {
    poly([[-600, 1330], [1700, 1310], [1700, 2400], [-600, 2400]], { wash: '#c4b090', washA: 1, line: false }); vgrad(1310, 2000, ['#c8b494', '#a89474', '#8a7858']);
    for (let k = 0; k < 14; k++) { const q = Math.pow(k / 13, 1.5); pencil([[-600, lerp(1330, 2100, q)], [1700, lerp(1310, 2080, q)]], { w: 1 + q * 2, col: '#8a7858', a: 0.4, pass2: false }); }
    for (let i = 0; i < 26; i++) { const r = rng(10340 + i); ell(-300 + r() * 1600, 1360 + Math.pow(r(), 1.4) * 500, 14, 6, { wash: '#efe6d2', washA: 0.8, w: 1, col: '#9a8a6a' }); }   // каменная крошка
  }

  WORLD.arch = (t, u, cat) => {
    const build = lerp(0.35, 1, sm(fade(t, EV.ar_build - 0.4, EV.ar_build + 0.9))), scaff = 1 - sm(fade(t, EV.ar_glory, EV.ar_glory + 0.6));
    lay(40, () => sky(t));
    lay(14, () => town(t));
    lay(4.5, () => { push(1000, 1330, 0.62); kCathedral(0, 0, 1, t, {}); pop(); haze('#efe2c8', 0.06); });
    lay(2.2, () => { plaza(t); kBelfry(170, 1400, 0.82, t, {}); if (t > EV.ar_point) { const k = popK(t, EV.ar_point, 0.35); push(170, 1140, k, -0.05); rect(-110, -32, 220, 64, { wash: '#efe2c4', washA: 1, w: 2.2, col: '#3a2a1a' }); txt('НЕ ТРОГАТЬ!', 0, 2, 34, { font: 'Osw', col: '#a8302a' }); pop(); }
      stoneCart(t); });
    lay(1.5, () => { const hb = hoistBell(t); kArch(AX, AY, AS, t, { build, scaff, bell: hb.bellIn, swing: hb.ring, lit: 0.3 }); wreath(t); masons(t); drummer(t);
      if (t > EV.ar_ring) { const q = (t - EV.ar_ring); for (let k = 0; k < 4; k++) { const ph = (q * 1.2 + k * 0.25) % 1, R = 60 + ph * 500; pencil(ellPts(AX, AY - 560 * AS, R, R * 0.8, 0, 0.05, 60), { w: 5 * (1 - ph), col: '#fff2c8', a: 0.8 * (1 - ph), pass2: false }); } } });
    lay(1, () => cat());
    lay(0.6, () => { const pl = rect(1085, -200, 50, 2400, { wash: '#6a4428', washA: 1, w: 2.4, col: '#2a1a0e' }); hatch(pl.path, pl.bb, { gap: 9, a: 0.3, col: '#2a1a0e', ang: 1.5, key: 10350 }); for (let y = 200; y < 2000; y += 330) rect(980, y, 210, 16, { wash: '#7a5432', washA: 1, w: 1.8, col: '#2a1a0e' }); for (let q = 0; q < 5; q++) rect(-40 + q * 50, 1900 - (q % 2) * 40, 120, 60, { wash: '#efe2c4', washA: 1, w: 2, col: '#7a6040' }); });
    motes(36, [0, 300, W, 1700], '#fff2d8', t, 77, { sp: 10, sz: 2.4, a: 0.5, tw: 1, add: 1 });
  };

  DIR.arch = {
    outfit: 'architect', light: { side: 1, rim: '#fff0c8' }, grade: ['#7a6a3a', 0.1],
    act: () => [[S0.arch, 'talk'], [EV.ar_point, 'sideeye'], [EV.ar_build, 'proud'], [EV.ar_glory, 'proud'], [EV.ar_bell, 'smug'], [EV.ar_ring, 'wink']],
    pose: (t, u, b) => {
      const o = { x: 470, y: GY + 80, s: 1.0, look: [0.3, -0.2] };
      if (t > EV.ar_point && t < EV.ar_build) { o.flip = true; o.hand = [150, -300]; o.point = 1; o.look = [0.7, -0.4]; }
      else if (t >= EV.ar_build && t < EV.ar_bell) { o.prop = 'blueprint'; o.hand = [90, -260]; o.handF = [-90, -260]; o.look = [0.6, -0.4]; }
      else if (t >= EV.ar_bell) { o.hand = [150, -330]; o.point = 1; o.look = [0.7, -0.6]; if (t > EV.ar_ring) { o.look = [0, 0]; o.hand = [80, -200]; o.point = undefined; } }
      return Object.assign(b, o);
    },
    cam: () => [[S0.arch, 420, 1060, 0.04], [EV.ar_point, 360, 1040, 0.06], [EV.ar_build, 620, 1020, 0.02], [EV.ar_glory, 660, 980, 0.0], [EV.ar_bell, 680, 980, 0.04], [EV.ar_ring, 680, 1000, 0.1, 'x'], [S1.arch, 660, 1000, 0.12]],
    hud: t => { if (t > EV.ar_glory && t < EV.ar_bell) note('победа над Турцией, 1828–29', 700, 1790, t, EV.ar_glory, EV.ar_bell, '#fff6dc', 44, -0.03); }
  };

  // ---------------------------------------------------------------- переход В сцену: звуковая волна «БУМ» кольцами расходится от колокола
  TRANS_IN.arch = { a: 0.15, b: 0.5, runA: 1, fx(k, t, A, B) {
    const cx = 760, cy = 760, q = sm(k), R = Math.pow(q, 1.4) * 1700;
    drawBuf(A, 1 + 0.02 * Math.sin(k * 60) * (1 - q));
    inCircle(cx, cy, R, () => drawBuf(B, 1.1 - 0.1 * q, cx, cy));
    scr(() => { for (let i = 0; i < 4; i++) { const rr = R - i * 70; if (rr > 0) pencil(ellPts(cx, cy, rr, rr, 0, 0.03, 80), { w: 12 - i * 3, col: i % 2 ? '#e8a33c' : '#fff2c8', a: (1 - q) * (1 - i * 0.2), pass2: false, gap: false }); }
      if (k < 0.4) { const kk = popK(t, t - k * 0.65, 0.3); push(cx, cy - 40, 1 + k); txt('БО-О-ОМ', 0, 0, 110, { font: 'Osw', col: '#fff6dc', a: 1 - k / 0.4 }); pop(); } });
  } };
})();
