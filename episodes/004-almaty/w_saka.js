/* 004 — сцена `saka`: IV в. до н. э., Иссык (50 км от Алматы). Закат над степью, цепочка курганов у гор.
   Ближний курган в разрезе: бревенчатая камера, в ней «Золотой человек» — высокий остроконечный убор со стрелами, кафтан из золотых бляшек, акинак.
   На «четырёх тысячах» бляшки разлетаются веером и пересчитываются счётчиком до 4000; на «Скромненько» Том (сам в золоте) сухо прищуривается.
   Переход В сцену: яблоко катится к камере и превращается в золотую бляшку с барсом. */
(() => {
  EV.sk_open = wtw('s2', 'кургана');
  EV.sk_4000 = wtw('s2', 'четырёх');
  EV.sk_modest = wtw('s2', 'Скромненько.');
  KEYW.push('тысячах', 'Скромненько.');
  SHAKES.push([EV.sk_open, 0.25, 6]);

  const GOLD = '#e0b03a', GOLDD = '#8a5a10', GOLDL = '#fff0a8';
  function plaque(x, y, r, rot, kind, t, a = 1) {                    // бляшка: треугольник / квадрат / барс-кружок
    ctx.save(); ctx.globalAlpha *= a; push(x, y, 1, rot);
    const p = kind === 0 ? poly([[-r, r * 0.8], [r, r * 0.8], [0, -r]], { wash: GOLD, washA: 1, w: Math.max(1, r * 0.12), col: GOLDD }) : kind === 1 ? rect(-r * 0.8, -r * 0.8, r * 1.6, r * 1.6, { wash: GOLD, washA: 1, w: Math.max(1, r * 0.12), col: GOLDD }) : ell(0, 0, r, r, { wash: GOLD, washA: 1, w: Math.max(1, r * 0.12), col: GOLDD });
    metalG(p.path, -r * 0.3, -r * 0.3, r * 1.2, GOLDL, GOLD, GOLDD);
    if (kind === 2) pencil([[-r * 0.5, r * 0.2], [-r * 0.1, -r * 0.3], [r * 0.4, -r * 0.2], [r * 0.5, r * 0.3]], { w: Math.max(1, r * 0.1), col: GOLDD, pass2: false });
    if (Math.sin(t * 6 + x * 0.1 + y * 0.07) > 0.93) glow(-r * 0.3, -r * 0.3, r * 1.6, 'rgba(255,250,210,1)', 0.9);
    pop(); ctx.restore();
  }
  function goldenMan(x, y, s, t) {                                    // реконструкция «Золотого человека» (стоит, мордой в зал)
    push(x, y, s); const L = '#2a1608';
    ell(0, 4, 90, 14, { wash: '#000000', washA: 0.25, line: false });
    for (const k of [-1, 1]) { shape([[k * 8, -150], [k * 42, -150], [k * 40, -12], [k * 12, -12]], { wash: '#8a3a1e', washA: 1, w: 2.2, col: L }); blob([[k * 8, -16], [k * 46, -18], [k * 54, 2], [k * 6, 2]], { wash: '#5a2a10', washA: 1, w: 2, col: L }); }
    const coat = blob([[-70, -120], [-64, -300], [-30, -340], [30, -340], [64, -300], [70, -120], [0, -100]], { wash: '#a8401e', washA: 1, w: 2.6, col: L, key: 9201 });
    ctx.save(); ctx.clip(coat.path); for (let yy = -330; yy < -110; yy += 18) for (let xx = -66; xx < 70; xx += 18) plaque(xx + ((yy / 18) % 2) * 9, yy, 6, 0, (Math.round(yy / 18) % 3 + 3) % 3, t); ctx.restore();
    rect(-72, -210, 144, 24, { wash: GOLD, washA: 1, w: 2, col: GOLDD }); for (let q = 0; q < 7; q++) plaque(-60 + q * 20, -198, 9, 0, 2, t);
    pencil([[50, -200], [80, -90]], { w: 10, col: GOLD }); rect(70, -110, 22, 22, { wash: GOLD, washA: 1, w: 1.6, col: GOLDD });
    for (const k of [-1, 1]) { shape(tubeP([[k * 60, -320], [k * 80, -240], [k * 70, -170]], 30, 24), { wash: '#a8401e', washA: 1, w: 2.2, col: L }); ell(k * 70, -166, 13, 14, { wash: '#d8a878', washA: 1, w: 1.8, col: L }); for (let q = 0; q < 3; q++) ell(k * 72, -300 + q * 40, 26, 6, { wash: GOLD, washA: 1, w: 1.2, col: GOLDD }); }
    rect(-16, -360, 32, 26, { wash: GOLD, washA: 1, w: 1.8, col: GOLDD });
    const hd = ell(0, -390, 32, 36, { wash: '#d8a878', washA: 1, w: 2.2, col: L }); pencil([[-14, -396], [-4, -396]], { w: 3, pass2: false }); pencil([[4, -396], [14, -396]], { w: 3, pass2: false }); pencil([[-8, -372], [8, -372]], { w: 2.4, pass2: false });
    const cap = poly([[-38, -404], [38, -404], [6, -700], [-6, -700]], { wash: '#2a1a14', washA: 1, w: 2.4, col: L, key: 9202 });
    for (let q = 0; q < 12; q++) { const yy = -420 - q * 22, w = lerp(36, 8, q / 12); plaque(-w * 0.5, yy, 7, 0, q % 2, t); plaque(w * 0.5, yy - 8, 7, 0, (q + 1) % 2, t); }
    for (const k of [-1, 1]) for (let q = 0; q < 2; q++) { pencil([[k * (12 + q * 10), -560 - q * 40], [k * (34 + q * 12), -660 - q * 40]], { w: 5, col: GOLD, pass2: false }); poly([[k * (30 + q * 12), -652 - q * 40], [k * (40 + q * 12), -652 - q * 40], [k * (36 + q * 12), -690 - q * 40]], { wash: GOLD, washA: 1, w: 1.2, col: GOLDD }); }
    for (const k of [-1, 1]) { blob([[k * 30, -470], [k * 60, -500], [k * 70, -460], [k * 50, -440]], { wash: GOLD, washA: 1, w: 1.6, col: GOLDD }); }   // крылатые кони по бокам
    glow(0, -400, 260, 'rgba(255,220,120,1)', 0.25 + 0.1 * Math.sin(t * 3));
    pop();
  }
  function kurganCut(t) {                                              // ближний курган в разрезе
    const k = sm((t - EV.sk_open + 0.2) / 0.5);
    const m = blob([[-200, 1500], [40, 1150], [380, 1050], [700, 1080], [1000, 1220], [1300, 1500]], { wash: '#8a7a4a', washA: 1, w: 2.6, col: '#3a2a10', key: 9210 }); hatch(m.path, m.bb, { gap: 9, a: 0.2, col: '#3a2a10', ang: 0.4, key: 9211 });
    for (let q = 0; q < 5; q++) pencil([[0 + q * 20, 1300 + q * 30], [1200 - q * 20, 1300 + q * 30]], { w: 2, col: '#5a4a2a', a: 0.4, pass2: false });
    if (k <= 0) return;
    ctx.save(); ctx.clip(m.path); const x0 = 520 - 340 * k, x1 = 520 + 340 * k;
    const ch = rect(x0, 1160, x1 - x0, 300, { wash: '#2a1a10', washA: 1, w: 3, col: '#1a0e06' });
    for (let yy = 1170; yy < 1460; yy += 34) { pencil([[x0, yy], [x1, yy]], { w: 18, col: '#6a4424', a: 0.85 }); pencil([[x0, yy - 8], [x1, yy - 8]], { w: 2, col: '#3a2410', a: 0.6, pass2: false }); }
    glow(520, 1300, 320 * k, 'rgba(255,200,90,1)', 0.55 * k); ctx.restore();
    goldenMan(520, 1450, 0.85 * k + 0.001, t);
  }
  function burst(t) {                                                  // бляшки веером + счётчик
    if (t < EV.sk_4000) return; const k = clamp((t - EV.sk_4000) / 0.9);
    for (let i = 0; i < 60; i++) { const r = rng(9220 + i), a = -Math.PI * (0.1 + r() * 0.8), d = sm(k) * (200 + r() * 520), x = 520 + Math.cos(a) * d, y = 1200 + Math.sin(a) * d * 0.9 + k * k * 60;
      plaque(x, y, 10 + r() * 8, r() * 6 + t * 3, i % 3, t, 1 - clamp((t - EV.sk_modest - 0.2) / 0.4)); }
  }
  function counter(t) { if (t < EV.sk_4000) return; const k = clamp((t - EV.sk_4000) / 0.9), n = Math.round(Math.pow(k, 0.7) * 4000); push(300, 540, popK(t, EV.sk_4000, 0.35), -0.04);
    rect(-200, -74, 400, 150, { wash: '#1a0e06', washA: 0.85, w: 3, col: GOLD }); txt(n.toLocaleString('ru-RU') + (k >= 1 ? '+' : ''), 0, 4, 96, { font: 'Osw', col: GOLDL }); txt('золотых бляшек', 0, 56, 32, { font: 'Hand', col: GOLD }); pop(); }
  function steppe(t) {
    vgrad(-600, 1500, ['#2a2a5a', '#8a5a7a', '#f0905a', '#f6c070']); glow(800, 980, 340, 'rgba(255,200,120,1)', 0.7); ell(800, 980, 90, 90, { wash: '#ffe0a0', washA: 1, line: false });
    for (let k = 0; k < 18; k++) { const r = rng(9230 + k); ell(r() * 1100, r() * 500, 2, 2, { wash: '#fff8e0', washA: 0.7 * (1 - r() * 0.5), line: false }); }
  }
  function riders(t) {                                                 // сакские всадники на гребне — силуэты
    for (let k = 0; k < 4; k++) { const x = ((t * 50 + k * 280) % 1500) - 200, y = 1170 + Math.sin(k) * 10, b = Math.sin(t * 9 + k) * 4; push(x, y, 0.5);
      sil([[-80, -40 + b], [-60, -80 + b], [70, -86 + b], [100, -120 + b], [120, -100 + b], [90, -60 + b], [70, -40 + b]], '#2a1a2a', 1);
      for (const lx of [-60, -40, 40, 60]) pencil([[lx, -44 + b], [lx + Math.sin(t * 9 + lx) * 14, 0]], { w: 6, col: '#2a1a2a', pass2: false });
      sil([[-10, -86 + b], [-14, -150 + b], [0, -230 + b], [14, -150 + b], [10, -86 + b]], '#2a1a2a', 1); pencil([[0, -170 + b], [50, -240 + b]], { w: 3, col: '#2a1a2a', pass2: false }); pop(); }
  }

  WORLD.saka = (t, u, cat) => {
    lay(30, () => steppe(t));
    lay(18, () => { alatau(t, 1060, { s: 0.9, col: '#7a5a8a', colD: '#3a2a4a', key: 9240 }); haze('#f0a070', 0.18); });
    lay(8, () => { for (const [x, w, h] of [[-100, 260, 90], [220, 200, 70], [560, 320, 110], [980, 220, 80]]) blob([[x - w, 1180], [x - w * 0.4, 1180 - h], [x + w * 0.4, 1180 - h], [x + w, 1180]], { wash: '#6a5a3a', washA: 1, w: 2, col: '#2a1a10' }); riders(t); haze('#f0a070', 0.12); });
    lay(1.4, () => { const g = poly([[-400, 1180], [1500, 1180], [1500, 2400], [-400, 2400]], { wash: '#a8884a', washA: 1, w: 2, col: '#4a3a1a', key: 9250 }); hatch(g.path, g.bb, { gap: 7, a: 0.18, col: '#5a4a1a', ang: -1.3, key: 9251 }); kurganCut(t); });
    lay(1, () => { cat(); burst(t); });
    lay(0.6, () => { const r = rng(9260); for (let k = 0; k < 16; k++) { const x = r() * 1200 - 60, y = 1820 + r() * 160, h = 120 + r() * 120, sw = Math.sin(t * 2 + k) * 10; pencil([[x, y], [x + sw, y - h]], { w: 4, col: '#c8a050', a: 0.8 }); ell(x + sw, y - h, 8, 22, { wash: '#e0c070', washA: 1, w: 1.2, col: '#6a5020', rot: 0.2 }); } });
  };
  DIR.saka = {
    outfit: 'sak', light: { side: 1, rim: '#ffc070' }, grade: ['#f08040', 0.12],
    act: () => [[S0.saka, 'awe'], [EV.sk_open, 'shock'], [EV.sk_4000, 'awe'], [EV.sk_modest, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 900, y: 1640, s: 0.92, look: t < EV.sk_modest ? [-0.7, 0.2] : [0, 0], squint: t > EV.sk_modest, tilt: t > EV.sk_modest ? 0.06 : 0, squash: b.squash }),
    cam: () => [[S0.saka, 560, 1100, 0.04], [EV.sk_open, 560, 1160, 0.08], [EV.sk_4000, 600, 1100, 0.06], [EV.sk_modest, 760, 1280, 0.2], [S1.saka, 780, 1290, 0.24]],
    hud: t => scr(() => counter(t))
  };
  // ---------------------------------------------------------------- переход В сцену: яблоко катится к камере → золотая бляшка с барсом
  TRANS_IN.saka = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const R = 30 + Math.pow(k, 2.2) * 1600, cx = lerp(300, 540, k), cy = lerp(1450, 960, k);
    drawBuf(k < 0.6 ? A : B); if (k > 0.6) { drawBuf(A, 1, 540, 960, 1 - (k - 0.6) / 0.4); }
    scr(() => { if (k < 0.45) apple(cx, cy, R, k * 14, { noLeaf: true }); else { const m = (k - 0.45) / 0.55; ctx.save(); ctx.globalAlpha = 1 - sm(clamp((m - 0.6) / 0.4)); push(cx, cy, 1, k * 3); const p = ell(0, 0, R, R, { wash: '#e0b03a', washA: 1, w: 4, col: '#8a5a10' }); metalG(p.path, -R * 0.3, -R * 0.3, R, '#fff0a8', '#e0b03a', '#8a5a10');
      pencil([[-R * 0.5, R * 0.2], [-R * 0.2, -R * 0.25], [R * 0.2, -R * 0.3], [R * 0.45, -R * 0.05], [R * 0.5, R * 0.3]], { w: 8, col: "#8a5a10", pass2: false }); pop(); ctx.restore(); glow(cx, cy, R * 1.2, 'rgba(255,230,150,1)', 0.5 * (1 - m)); } });
  } };
})();
