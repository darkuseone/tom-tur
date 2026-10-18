/* 003 — сцена `anna`: ≈1063, Франция, романский зал аббатства в Суассоне. Король и бароны ставят на грамоте крестики,
   а королева из Киева (Анна Ярославна) расписывается буквами: «АНА РЪИНА». Том — придворный в синей тунике с лилиями и обруче.
   Переход В сцену: капля воска падает со свечи и растекается сургучной печатью, печать раскрывается окном. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.anna_king = wt('s5', 'король');              // король ставит крест
  EV.anna_cross = wt('s5', 'крестиком.');         // ещё кресты баронов
  EV.anna_sign = wt('s5', 'Киева');               // Том выводит «АНА РЪИНА»
  EV.anna_gold = wt('s5', 'буквами!');            // подпись вспыхивает золотом
  KEYW.push('крестиком.', 'буквами!');

  const crossT = [EV.anna_king + 0.25, EV.anna_cross, EV.anna_cross + 0.28, EV.anna_cross + 0.55];
  function hall(t) {
    vgrad(-400, 2200, ['#3a3430', '#6a5a4a', '#2a2420']);
    for (let i = 0; i < 4; i++) { const x = -60 + i * 400, top = 420; // арки
      const a = blob([[x - 150, 1500], [x - 150, top + 200], [x, top], [x + 150, top + 200], [x + 150, 1500]], { wash: i === 1 ? '#c8a878' : '#2a221c', washA: 1, w: 3, col: '#140e0a', key: 7600 + i });
      if (i === 1) { ctx.save(); ctx.clip(a.path); const g = ctx.createLinearGradient(0, top, 0, 1500); g.addColorStop(0, '#f6e4b8'); g.addColorStop(1, '#8a6a48'); ctx.fillStyle = g; ctx.fillRect(x - 160, top, 320, 1100); ctx.restore();
        for (let k = 0; k < 4; k++) { const wx = x - 60 + k * 40; ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = ['#3a6ab0', '#b8302a', '#d6a842', '#3a8a5a'][k]; ctx.fillRect(wx, top + 90, 30, 140); ctx.restore(); pencil([[wx, top + 90], [wx, top + 230]], { w: 2, col: '#1a1410', pass2: false }); } }
      for (let y = top + 260; y < 1500; y += 70) pencil([[x - 150, y], [x - 140, y]], { w: 1, col: '#000', a: 0.2, pass2: false }); }
    for (let i = 0; i < 5; i++) { const x = 140 + i * 400 - 400 + 200; const c = rect(x - 40, 380, 80, 1120, { wash: '#a89478', washA: 1, w: 2.6, col: '#2a2016', key: 7610 + i }); shadeG(c.path, x + 40, 0, x - 40, 0, '#3a2e22', 0.55); hatch(c.path, c.bb, { gap: 8, a: 0.12, col: '#3a2e22', ang: 1.5, key: 7620 + i });
      rect(x - 56, 360, 112, 30, { wash: '#bca888', washA: 1, w: 2, col: '#2a2016' }); }
    // лучи из окна
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 4; k++) { const g = ctx.createLinearGradient(340, 600, 600, 1500); g.addColorStop(0, `rgba(255,230,170,${0.22 - k * 0.03})`); g.addColorStop(1, 'rgba(255,230,170,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(300 + k * 30, 520); ctx.lineTo(400 + k * 30, 520); ctx.lineTo(760 + k * 60, 1500); ctx.lineTo(560 + k * 60, 1500); ctx.fill(); } ctx.restore();
    motes(40, [300, 500, 900, 1500], 'rgba(255,240,200,1)', t, 7630, { sp: 10, sz: 2.4, a: 0.5 });
    // знамёна с лилиями
    for (const x of [140, 940]) { const b = poly([[x - 70, 520], [x + 70, 520], [x + 70, 860], [x, 820], [x - 70, 860]], { wash: '#24408a', washA: 1, w: 2.4, col: '#0e1a3a', key: 7640 + x }); shadeG(b.path, x - 70, 0, x + 70, 0, '#0e1a3a', 0.4);
      for (const [dx, dy] of [[-30, 600], [30, 600], [0, 700]]) txt('⚜', x + dx, dy, 44, { col: '#e6c060' }); pencil([[x - 90, 516], [x + 90, 516]], { w: 6, col: '#6a4a24', pass2: false }); }
  }
  function king(x, y, t) {                                           // король Генрих I: сидит, корона, борода, ставит крест
    push(x, y, 1); const cr = t > crossT[0] - 0.3 && t < crossT[0] + 0.3;
    blob([[-110, 0], [-120, -220], [-80, -300], [80, -300], [120, -220], [110, 0]], { wash: '#7a1a20', washA: 1, w: 2.6, col: '#2a0608', key: 7650 });
    poly([[-30, -300], [30, -300], [20, -120], [-20, -120]], { wash: '#e8e0cc', washA: 1, w: 1.6, col: '#5a4a3a' }); for (let k = 0; k < 6; k++) ell(-24 + k * 10, -290 + (k % 2) * 6, 4, 4, { wash: '#f4f0e6', washA: 1, w: 1, col: '#2a2a2a' });
    ell(0, -350, 52, 58, { wash: '#e4c09a', washA: 1, w: 2.4, col: '#4a2a1a' }); blob([[-46, -340], [-30, -280], [0, -260], [30, -280], [46, -340], [0, -320]], { wash: '#8a6a4a', washA: 1, w: 2, col: '#3a2a1a' });
    pencil([[-24, -362], [-10, -360]], { w: 3, pass2: false }); pencil([[10, -360], [24, -362]], { w: 3, pass2: false }); pencil([[-28, -378], [-8, -372]], { w: 2.6, pass2: false }); pencil([[8, -372], [28, -378]], { w: 2.6, pass2: false });
    poly([[-50, -396], [-50, -430], [-30, -410], [-10, -440], [10, -410], [30, -440], [50, -410], [50, -396]], { wash: '#d6a842', washA: 1, w: 2, col: '#6a4a08' });
    const ax = cr ? Math.sin((t - crossT[0]) * 30) * 16 : 0; pencil([[60, -200], [140 + ax, -110]], { w: 26, col: '#7a1a20' }); ell(146 + ax, -104, 18, 16, { wash: '#e4c09a', washA: 1, w: 2, col: '#4a2a1a' }); pencil([[150 + ax, -110], [190 + ax, -190]], { w: 3, col: '#f4f0e6', pass2: false });
    pop();
  }
  function baron(x, y, s, k) { push(x, y, s); const c = ['#3a4a2a', '#5a3a2a', '#2a3a5a'][k]; blob([[-70, 0], [-80, -200], [-50, -260], [50, -260], [80, -200], [70, 0]], { wash: c, washA: 1, w: 2.2, col: '#140e0a', key: 7660 + k });
    ell(0, -300, 40, 46, { wash: '#d8b090', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-42, -310], [0, -352], [42, -310], [30, -300], [-30, -300]], { wash: ['#3a2a1a', '#6a5a4a', '#1a1a1a'][k], washA: 1, w: 1.6 }); pencil([[-16, -300], [-6, -302]], { w: 3, pass2: false }); pencil([[6, -302], [16, -300]], { w: 3, pass2: false }); pop(); }
  function charter(t) {                                              // грамота: латынь, кресты, подпись Анны
    push(540, 1340, 1, -0.04);
    const p = poly([[-430, -190], [430, -200], [440, 180], [-440, 196]], { wash: '#efe0b8', washA: 1, w: 3, col: '#3a2a10', key: 7670 }); shadeG(p.path, -440, 0, -300, 0, '#a08858', 0.45); shadeG(p.path, 440, 0, 300, 0, '#a08858', 0.35);
    const r = rng(7671); for (let l = 0; l < 4; l++) { let x = -390; const y = -150 + l * 34; while (x < 380) { const w = 30 + r() * 60; pencil([[x, y], [x + w * 0.3, y - 6], [x + w * 0.6, y + 2], [x + w, y - 3]], { w: 2.2, col: '#3a2410', a: 0.7, pass2: false, gap: false }); x += w + 16; } }
    txt('SIGNUM', -330, -6, 26, { font: 'Hand', col: '#5a3a14' });
    const names = ['Henrici regis', 'Balduini', 'Walterii', 'Hugonis'];
    crossT.forEach((tc, i) => { if (t < tc) return; const k = popK(t, tc, 0.25), x = -330 + i * 150, y = 60; push(x, y, k); pencil([[-22, -22], [22, 22]], { w: 6, col: '#2a1a0a', pass2: false }); pencil([[22, -22], [-22, 22]], { w: 6, col: '#2a1a0a', pass2: false }); txt(names[i], 0, 44, 18, { font: 'Hand', col: '#5a3a14' }); pop(); });
    if (t > EV.anna_sign) { const rv = clamp((t - EV.anna_sign) / Math.max(0.3, EV.anna_gold - EV.anna_sign + 0.1)), gold = sm((t - EV.anna_gold) / 0.3);
      if (gold > 0) glow(270, 120, 260, 'rgba(255,214,120,1)', 0.6 * gold);
      txt('АНА РЪИНА', 260, 118, 64, { font: 'Hand', col: gold > 0.5 ? '#b07a10' : '#1e3a8a', reveal: rv, rot: -0.05 });
      if (gold > 0) pencil([[120, 160], [260, 168], [410, 150]], { w: 4, col: '#b07a10', a: gold, pass2: false }); }
    pop();
  }

  WORLD.anna = (t, u, cat) => {
    lay(4, () => { hall(t); });
    lay(1.6, () => { baron(860, 1260, 0.85, 0); baron(980, 1300, 0.9, 1); king(250, 1300, t); });
    lay(1, () => { rect(-200, 1180, 1500, 60, { wash: '#6a4428', washA: 1, w: 2.6, col: '#2a1408' }); cat(); charter(t); });
  };
  DIR.anna = {
    outfit: 'french', light: { side: -1, rim: '#ffe6b0' }, grade: ['#3a4a8a', 0.12],
    act: () => [[S0.anna, 'smug'], [EV.anna_king, 'sideeye'], [EV.anna_cross, 'smug'], [EV.anna_sign, 'proud'], [EV.anna_gold, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: 620, y: 1250, s: 1.0, look: t > EV.anna_sign ? [0.2, 0.7] : t > EV.anna_king ? [-0.7, 0.1] : [0.1, 0],
      prop: t > EV.anna_sign - 0.4 ? 'quill' : undefined, hand: t > EV.anna_sign - 0.4 ? [40 + Math.sin(t * 14) * 30 * (t < EV.anna_gold ? 1 : 0), -120] : undefined, tailUp: t > EV.anna_gold
    }),
    cam: () => [[S0.anna, 520, 1000, 0.1], [EV.anna_cross, 440, 1080, 0.08], [EV.anna_sign, 620, 1180, 0.14], [S1.anna, 600, 1160, 0.16]]
  };
  // ---------------------------------------------------------------- переход В сцену: капля воска → сургучная печать → окно
  function seal(cx, cy, R, t) { const P = []; for (let k = 0; k <= 40; k++) { const a = k / 40 * 6.283, rr = R * (1 + Math.sin(a * 7 + 1) * 0.05 + Math.sin(a * 3) * 0.04); P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    const s = shape(P, { wash: '#a8201e', washA: 1, w: 3, col: '#4a0a08', key: 7680 }); shadeG(s.path, cx + R, cy - R, cx - R * 0.3, cy + R * 0.3, '#5a0a08', 0.5); glow(cx - R * 0.35, cy - R * 0.35, R * 0.5, 'rgba(255,170,150,1)', 0.3); }
  TRANS_IN.anna = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 960;
    if (k < 0.5) { drawBuf(A); const q = k / 0.5; scr(() => { const dy = lerp(-200, cy, Math.min(1, q * 1.8)); if (q < 0.55) { ell(cx, dy, 18, 26, { wash: '#a8201e', washA: 1, w: 2, col: '#4a0a08' }); } else seal(cx, cy, Math.pow((q - 0.55) / 0.45, 0.7) * 1400 + 20, t); }); return; }
    const q = (k - 0.5) / 0.5; drawBuf(B, 1.15 - 0.15 * sm(q));
    scr(() => { const R = Math.pow(q, 1.3) * 1500; const p = new Path2D(); p.rect(0, 0, W, H); p.arc(cx, cy, R, 0, 6.283, true); ctx.save(); ctx.clip(p); seal(cx, cy, 1500, t); ctx.restore(); txt('⚜', cx, cy, 300 * (1 - q), { col: '#e6c060', a: 1 - q }); });
  } };
})();
