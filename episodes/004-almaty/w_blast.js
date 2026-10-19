/* 004 — сцена `blast`: урочище Медеу. 1966 — направленный взрыв: Том-взрывник жмёт рукоятку подрывной машинки, склон ущелья взлетает
   облаком и обрушивается поперёк долины — встаёт плотина. 1973 — сверху по ущелью несётся сель (грязь, валуны, брёвна), бьёт в плотину и встаёт.
   Плашка «≈ 4 млн м³». Табличка года переключается 1966 → 1973. Переход В сцену: хлопушка «Мотор!» щёлкает — кадр меняется по хлопку. */
(() => {
  EV.bl_boom = wtw('s8', 'взорвали');
  EV.bl_dam = wtw('s8', 'плотина');
  EV.bl_sel = wtw('s8', 'сель');
  EV.bl_4 = wtw('s8', 'четыре');
  KEYW.push('взорвали', 'миллиона', 'кубов!');
  SHAKES.push([EV.bl_boom, 0.8, 26], [EV.bl_sel + 0.35, 0.5, 14]);

  const damK = t => sm((t - EV.bl_boom - 0.3) / 0.9);
  function gorge(t) {                                                   // ущелье: два склона с елями, дальний пик
    for (const sd of [-1, 1]) { const P = sd < 0 ? [[-400, 400], [200, 700], [380, 1100], [460, 1400], [-400, 1400]] : [[1500, 360], [900, 680], [700, 1100], [620, 1400], [1500, 1400]];
      const s = poly(P, { wash: sd < 0 ? '#5a6a4a' : '#6a7a52', washA: 1, w: 2.4, col: '#2a3020', key: 9800 + sd }); hatch(s.path, s.bb, { gap: 9, a: 0.18, col: '#2a3020', ang: sd * 0.8, key: 9802 + sd });
      const r = rng(9804 + sd); for (let k = 0; k < 30; k++) { const u = r(), y = 520 + u * 820, xEdge = sd < 0 ? lerp(200, 440, u) : lerp(900, 640, u), x = sd < 0 ? xEdge - 40 - r() * 500 : xEdge + 40 + r() * 500; spruce(x, y, 60 + r() * 50, '#2a4434'); } }
  }
  function slideMass(t) {                                                // взрыв: облако + масса породы летит и ложится плотиной
    const b = EV.bl_boom, dt = t - b; if (dt < 0) return;
    if (dt < 1.6) { const k = clamp(dt / 1.6); for (let i = 0; i < 26; i++) { const r = rng(9810 + i), a = -Math.PI * (0.15 + r() * 0.7), d = 80 + k * (300 + r() * 500), x = 300 + Math.cos(a) * d * 0.9, y = 820 + Math.sin(a) * d * 0.7 + k * k * 300;
      ell(x, y, 120 + k * 260 * r(), 100 + k * 200 * r(), { wash: lerpC('#fff0c0', '#9a8a70', clamp(k * 3)), washA: (1 - k) * 0.9, w: 1.6, col: '#6a5a40', a: 0.4 * (1 - k) }); }
      for (let i = 0; i < 16; i++) { const r = rng(9870 + i), a = r() * 6.283, d = k * (200 + r() * 600); ell(320 + Math.cos(a) * d, 820 + Math.sin(a) * d * 0.8, 10 + r() * 14, 8 + r() * 10, { wash: '#5a4a3a', washA: 1 - k, w: 1, col: '#2a2018' }); }
      if (dt < 0.25) { glow(320, 820, 900 * (1 - dt * 3), 'rgba(255,240,180,1)', 1); whiteOut(0.5 * (1 - dt * 4)); } }
    for (let i = 0; i < 12; i++) { const r = rng(9830 + i), k = clamp((dt - r() * 0.3) / 0.8); if (k <= 0 || k >= 1) continue; const x = lerp(320, 420 + r() * 300, k), y = lerp(820, 1200, k) - Math.sin(k * Math.PI) * 300; blob(ellPts(x, y, 16 + r() * 20, 12 + r() * 16, r() * 3, 0.3, 7), { wash: '#7a6a5a', washA: 1, w: 1.6, col: '#2a2018' }); }
  }
  function dam(t) {                                                      // плотина Медеу: трапеция с бермами, водосброс
    const k = damK(t); if (k <= 0) return; const top = lerp(1300, 1060, k);
    const p = poly([[300, 1300], [440, top], [700, top - 6], [840, 1300]], { wash: '#8a7a62', washA: 1, w: 2.6, col: '#2a2018', key: 9840 }); hatch(p.path, p.bb, { gap: 7, a: 0.22, col: '#3a2a1a', ang: 0.3, key: 9841 });
    for (let q = 1; q < 4; q++) { const y = lerp(top, 1300, q / 4); pencil([[lerp(440, 300, q / 4), y], [lerp(700, 840, q / 4), y]], { w: 3, col: '#c8b898', a: 0.7, pass2: false }); }
    if (k > 0.9) { pencil([[440, top], [700, top - 6]], { w: 6, col: '#e8e0d0', pass2: false }); txt('МЕДЕУ', 570, top + 60, 34, { font: 'Osw', col: '#f6ecd6' }); }
  }
  function sel(t) {                                                      // сель 1973: язык грязи несётся по ущелью и поднимается за плотиной
    const dt = t - EV.bl_sel + 0.15; if (dt < 0) return; const k = clamp(dt / 0.5), lv = lerp(1250, 1075, sm(clamp((dt - 0.3) / 0.8)));
    const tip = lerp(640, 1060, sm(k)), tw = lerp(20, 130, sm(k));                // язык: от дальнего изгиба ущелья к плотине
    const TP = []; for (let q = 0; q <= 12; q++) { const u = q / 12, y = lerp(640, tip, u); TP.push([560 + u * tw + Math.sin(y * 0.05 + t * 9) * 14 * u, y]); } for (let q = 0; q <= 8; q++) { const a = q / 8 * Math.PI; TP.push([540 + Math.cos(a) * (tw + 30), tip + Math.sin(a) * 40 + Math.sin(q * 2 + t * 12) * 10]); } for (let q = 12; q >= 0; q--) { const u = q / 12, y = lerp(640, tip, u); TP.push([520 - u * tw - Math.sin(y * 0.05 + t * 8) * 14 * u, y]); }
    const tg = poly(TP, { wash: '#6a4a2a', washA: 1, w: 2.2, col: '#2a1608' }); hatch(tg.path, tg.bb, { gap: 6, a: 0.3, col: '#3a2410', ang: 1.4, key: 9850 });
    for (let i = 0; i < 10; i++) { const r = rng(9851 + i), u = (r() + dt * 1.5) % 1, y = lerp(660, tip, u), x = lerp(540, 540 + (r() - 0.5) * tw * 1.6, u); blob(ellPts(x, y, 6 + u * 22, 5 + u * 16, t * 3 + i, 0.3, 7), { wash: '#8a8070', washA: 1, w: 1.4, col: '#2a2018' }); }
    if (dt > 0.3) { const lake = poly([[lerp(440, 300, (lv - 1060) / 240), lv], [lerp(700, 840, (lv - 1060) / 240) , lv], [840, 1300], [300, 1300]], { wash: '#5a3a1e', washA: 0.0, line: false });
      const L = poly([[lerp(300, 440, (1300 - lv) / 240) - 160, lv], [lerp(840, 700, (1300 - lv) / 240) + 160, lv - 4], [700, 1062], [440, 1062]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#2a1608' });
      for (let q = 0; q < 5; q++) pencil([[400 + q * 50 + Math.sin(t * 4 + q) * 10, lv + 6], [440 + q * 50 + Math.sin(t * 4 + q) * 10, lv + 6]], { w: 3, col: '#a8885a', a: 0.6, pass2: false }); }
    if (dt > 0.45 && dt < 1.3) { const sp = dt - 0.45; for (let i = 0; i < 16; i++) { const r = rng(9880 + i), a = -Math.PI * (0.2 + r() * 0.6), d = clamp(sp / 0.5) * (80 + r() * 200); ell(570 + Math.cos(a) * d * 1.4, 1050 + Math.sin(a) * d + sp * sp * 500, 8 + r() * 12, 6 + r() * 8, { wash: '#6a4a2a', washA: 1, w: 1.2, col: '#2a1608' }); } }
  }
  function plunger(t) {                                                  // подрывная машинка у Тома
    push(560, 1600, 1); const p = rect(-70, -90, 140, 90, { wash: '#a8241e', washA: 1, w: 2.4, col: '#2a0a06' }); txt('ВВ', 0, -40, 34, { font: 'Osw', col: '#f6ecd6' });
    const down = t > EV.bl_boom - 0.1 ? 40 : 0; pencil([[0, -90], [0, -170 + down]], { w: 8, col: '#3a3a3a' }); rect(-50, -184 + down, 100, 20, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000000' });
    pencil([[70, -40], [200, -10], [400, 40], [700, 0]], { w: 2.4, col: '#2a2a2a', pass2: false }); pop();
  }
  function badge(t) {                                                    // плашка «≈ 4 млн м³»
    if (t < EV.bl_4) return; push(540, 600, popK(t, EV.bl_4, 0.35), -0.04); rect(-230, -70, 460, 140, { wash: '#2a1608', washA: 0.9, w: 3, col: '#e0b03a' }); txt('≈ 4 млн м³', 0, 4, 80, { font: 'Osw', col: '#f6ecd6' }); txt('камней и грязи', 0, 54, 30, { font: 'Hand', col: '#e0b03a' }); pop();
  }

  WORLD.blast = (t, u, cat) => {
    const late = t > EV.bl_dam;
    lay(30, () => { vgrad(-600, 1000, late ? ['#5a6a7a', '#9aa8b0', '#d8d0c0'] : ['#6aa8d8', '#bcd8ea', '#f2e8cc']); glow(820, 300, 300, 'rgba(255,240,200,1)', late ? 0.2 : 0.5); });
    lay(16, () => { alatau(t, 700, { s: 1.0, key: 9890 }); haze('#e8eef4', 0.14); });
    lay(4, () => { gorge(t); sel(t); dam(t); slideMass(t); haze('#eef0f0', 0.06); });
    lay(1.3, () => { const g = poly([[-400, 1420], [1500, 1420], [1500, 2400], [-400, 2400]], { wash: '#7a6a52', washA: 1, w: 2, col: '#2a2018', key: 9895 }); hatch(g.path, g.bb, { gap: 9, a: 0.16, col: '#2a2018', ang: -0.3, key: 9896 }); plunger(t);
      const r = rng(9897); for (let k = 0; k < 9; k++) blob(ellPts(-100 + r() * 1300, 1500 + r() * 400, 30 + r() * 50, 20 + r() * 30, r(), 0.3, 8), { wash: '#9a9488', washA: 1, w: 2, col: '#3a342a' }); });
    lay(1, () => { cat(); });
    lay(0.7, () => { if (t > EV.bl_boom && t < EV.bl_boom + 1.2) motes(40, [-100, 0, 1200, 1900], 'rgba(200,190,170,1)', t, 9898, { sp: 200, vx: 300, sz: 8, a: 0.6 }); });
  };
  DIR.blast = {
    outfit: 'miner', light: { side: 1, rim: '#fff0c8' }, grade: ['#c0a070', 0.08],
    act: () => [[S0.blast, 'smug'], [EV.bl_boom, 'shock'], [EV.bl_dam, 'proud'], [EV.bl_sel, 'scared'], [EV.bl_4, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1640, s: 0.95, look: [0.6, -0.6], hand: t < EV.bl_boom + 0.3 ? [150, -190 + (t > EV.bl_boom - 0.1 ? 40 : 0)] : undefined, tailUp: t > EV.bl_boom, sweat: t > EV.bl_sel && t < EV.bl_4 ? 1 : 0, tilt: t > EV.bl_boom && t < EV.bl_boom + 0.4 ? -0.15 : 0, squash: b.squash }),
    cam: () => [[S0.blast, 540, 1200, 0.06], [EV.bl_boom - 0.05, 520, 1180, 0.08], [EV.bl_boom + 0.3, 540, 1000, -0.04], [EV.bl_sel, 560, 900, -0.06], [EV.bl_4, 560, 960, -0.02], [S1.blast, 560, 980, 0]],
    hud: t => { scr(() => badge(t)); if (t > EV.bl_dam - 0.05) scr(() => { push(540, 228, 1); ctx.fillStyle = 'rgba(18,12,10,0.8)'; ctx.fillRect(-300, -80, 600, 160); txt('1973', 0, -18, 104, { col: '#f6e7c8', font: 'Osw' }); txt('СЕЛЬ ПРОТИВ ПЛОТИНЫ', 0, 54, 34, { col: K.amber, font: 'Osw' }); pop(); }); }
  };
  // ---------------------------------------------------------------- переход В сцену: хлопушка «Мотор!» — смена кадра по хлопку
  TRANS_IN.blast = { a: 0.3, b: 0.3, runA: 0.5, fx(k, t, A, B) {
    const ang = k < 0.5 ? lerp(-0.6, 0, sm(k / 0.5)) : 0; drawBuf(k < 0.5 ? A : B);
    if (k < 0.75) scr(() => { push(540, 980, 1.6); rect(-280, -10, 560, 300, { wash: '#1a1a1a', washA: 1, w: 3, col: '#000000' }); txt('ЦОКС · 1943', 0, 90, 44, { font: 'Hand', col: '#f4f4f4' }); txt('МОТОР!', 0, 190, 70, { font: 'Osw', col: '#f4f4f4' });
      push(-280, -10, 1, ang); rect(0, -50, 560, 50, { wash: '#f4f4f4', washA: 1, w: 2, col: '#000000' }); for (let q = 0; q < 7; q++) poly([[q * 80, -50], [q * 80 + 40, -50], [q * 80 + 10, 0], [q * 80 - 30, 0]], { wash: '#1a1a1a', washA: 1, line: false }); pop(); pop(); });
    if (k > 0.48 && k < 0.56) whiteOut(0.8);
  } };
})();
