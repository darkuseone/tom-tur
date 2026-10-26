/* 016 — сцена `civilwar`: 1936–1938. Июль 1936 — крипта и мастерская Саграды в огне: горят листы чертежей, падают гипсовые
   модели; затем март 1938 — над городом силуэты бомбардировщиков без опознавательных знаков, дымы над крышами, люди спешат
   в укрытие (вход в метро с надписью REFUGI). Без жертв и натурализма. На «чертежи» листы вспыхивают, на «бомбёжки» —
   самолёты и вой сирены, на «тысячи» — HUD «март 1938 · ≈ 1000 погибших». Том — в гимнастёрке. Музыка приглушена.
   Переход В сцену — пепел осыпается и затягивает кадр. */
(() => {
  EV.cw_plans = wtk('s6', 'чертежи');
  EV.cw_bomb = wtk('s6', 'бомбёжки');
  EV.cw_1000 = wtk('s6', 'тысячи');
  KEYW.push('чертежи', 'бомбёжки', 'тысячи');
  SHAKES.push([EV.cw_bomb + 0.3, 0.4, 7]);
  const raid = t => sm((t - EV.cw_bomb + 0.3) / 0.6);

  function sky(t) { const r = raid(t); vgrad(-900, 1000, [lerpC('#6a5a5a', '#3a3c48', r), lerpC('#b0806a', '#6a6a74', r), lerpC('#d8a880', '#8a8a8e', r)], 1);
    for (let k = 0; k < 6; k++) { const ph = (t * 0.25 + k / 6) % 1; ell(-100 + k * 260 + ph * 60, 900 - ph * 420, 80 + ph * 130, 60 + ph * 90, { wash: '#2a2a2e', washA: 0.5 * (1 - ph), line: false }); }
    if (r > 0) for (let i = 0; i < 3; i++) { const x = 1500 - ((t - EV.cw_bomb + 0.3) * 260 + i * 260) % 2200; plane(x, 380 + i * 70, 0.6, t, { col: '#1a1a20' }); } }
  function town(t) {                                                   // крыши, дым, укрытие
    for (let k = 0; k < 8; k++) { const x = -480 + k * 260, h = 220 + ((k * 59) % 140); rect(x, 1100 - h, 220, h, { wash: lerpC('#d8c4a4', '#8a8680', raid(t) * 0.6), washA: 1, w: 2, col: '#2a2420' }); for (let j = 0; j < 2; j++) for (let q = 0; q < 3; q++) rect(x + 20 + q * 66, 1100 - h + 40 + j * 90, 34, 50, { wash: '#2a3040', washA: 1, w: 1.2, col: '#1a1a1a' }); }
    if (raid(t) > 0) for (const [x, y] of [[100, 820], [900, 780]]) { for (let q = 0; q < 5; q++) { const ph = (t * 0.5 + q / 5) % 1; ell(x + ph * 60, y - ph * 300, 40 + ph * 80, 30 + ph * 60, { wash: '#2a2a2e', washA: 0.6 * (1 - ph) * raid(t), line: false }); } glow(x, y + 20, 80, 'rgba(255,140,60,1)', 0.5 * raid(t)); }
    push(980, 1300); rect(-140, -140, 280, 140, { wash: '#4a4a52', washA: 1, w: 2.4, col: '#1a1a1e' }); rect(-90, -110, 180, 110, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); rect(-110, -200, 220, 50, { wash: '#efe0b8', washA: 1, w: 2, col: '#3a2a14' }); txt('REFUGI', 0, -164, 32, { font: 'Osw', col: '#a8201e' }); pop();
    if (raid(t) > 0) for (let i = 0; i < 4; i++) { const x = lerp(400 + i * 90, 940, clamp(((t - EV.cw_bomb) * 0.6 + i * 0.15) % 1)); human(x, 1320, 0.44, t, { body: ['#3a3a42', '#6a4a3a', '#2a3a4a', '#e8e4dc'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i === 1 ? 'scarf' : 'cap', hatCol: '#3a3a3a', face: 'calm', armR: 'hold', armL: 'hold', long: i === 1, seed: 16710 + i }); }
  }
  function workshop(t) {                                               // мастерская: горящие чертежи, модели
    const f = clamp((t - EV.cw_plans + 0.2) / 0.5) * (1 - raid(t) * 0.8); if (f <= 0) return;
    ctx.save(); ctx.globalAlpha = f; rect(160, 1150, 700, 280, { wash: '#4a3420', washA: 0.95, w: 3, col: '#1a0a04' }); for (let q = 0; q < 4; q++) { push(240 + q * 160, 1300, 1, (q - 1.5) * 0.12); rect(-60, -80, 120, 100, { wash: '#e8dcc0', washA: 1, w: 2, col: '#3a5a8a' }); for (let z = 0; z < 4; z++) pencil([[-40, -60 + z * 20], [40, -60 + z * 20]], { w: 1.4, col: '#3a5a8a', pass2: false }); pop();
      for (let z = 0; z < 5; z++) { const ph = (t * 2 + z / 5 + q * 0.3) % 1; ell(240 + q * 160 + Math.sin(t * 6 + z) * 16, 1240 - ph * 140, 18 * (1 - ph) + 4, 26 * (1 - ph) + 6, { wash: z % 2 ? '#f0a030' : '#e85a2a', washA: 0.9 * (1 - ph), line: false }); } glow(240 + q * 160, 1230, 90, 'rgba(255,160,60,1)', 0.6); }
    plaster(780, 1420, 0.6, t, { broken: clamp((t - EV.cw_plans) / 0.8) }); ctx.restore();
  }

  WORLD.civilwar = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => town(t));
    lay(3, () => workshop(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: lerpC('#9a8a74', '#6a6a6a', raid(t)), washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { motes(40, [-200, 0, 1300, 1900], '#c8c0b4', t, 16720, { sp: 40, vx: -20, sz: 3, a: 0.45, wob: 20 }); haze('#14141a', 0.18 * raid(t)); });
  };
  DIR.civilwar = {
    outfit: 'voen', light: { side: 1, rim: '#ffc890' }, grade: ['#6a6060', 0.16],
    act: () => [[S0.civilwar, 'shock'], [EV.cw_plans, 'scared'], [EV.cw_bomb, 'shock'], [EV.cw_1000 - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: t < EV.cw_bomb ? [0.6, 0.0] : [0.4, -0.7], nod: t > EV.cw_1000 ? 0.06 : 0 }),
    cam: () => [[S0.civilwar, 560, 1160, 0.1], [EV.cw_plans, 560, 1200, 0.12], [EV.cw_bomb, 560, 960, 0.02], [EV.cw_1000, 580, 1000, 0.06], [S1.civilwar, 580, 1000, 0.08]],
    hud: t => {
      if (t > EV.cw_plans && t < EV.cw_bomb) { const k = popK(t, EV.cw_plans, 0.35); push(620, 760, k, 0.03); rect(-220, -56, 440, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ИЮЛЬ 1936', 0, -8, 36, { font: 'Osw', col: '#a8201e' }); txt('сгорели чертежи и фото', 0, 34, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.cw_1000) { const k = popK(t, EV.cw_1000, 0.4); push(540, 760, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,14,14,0.86)'; ctx.fillRect(-320, -70, 640, 140); ctx.restore(); txt('МАРТ 1938', 0, -22, 42, { font: 'Osw', col: '#f2ece0', a: k }); txt('≈ 1000 погибших за 3 дня', 0, 30, 30, { col: '#e8d8b0', a: k }); pop(); }
    }
  };
  TRANS_IN.civilwar = { a: 0.3, b: 0.45, fx(k, t, A, B) {            // пепел осыпается и затягивает кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(16730); ctx.save(); ctx.globalAlpha = 0.55 * f; ctx.fillStyle = '#2a2624'; ctx.fillRect(0, 0, W, H); ctx.restore(); for (let i = 0; i < 160; i++) { const x = r() * W + Math.sin(t * 2 + i) * 30, y = (r() * H + k * 900) % H; rect(x, y, 8 + r() * 10, 5 + r() * 6, { wash: i % 4 ? '#5a5450' : '#e85a2a', washA: f, w: 0, col: '#000' }); } });
  } };
})();
