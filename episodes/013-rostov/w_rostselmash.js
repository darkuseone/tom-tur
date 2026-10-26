/* 013 — сцена `rostselmash`: 1929–1930-е, цех «Ростсельмаша». Высокий цех с фермами под крышей и окнами, над пролётом —
   лозунг «РОСТСЕЛЬМАШ»; по конвейеру едут прицепные комбайны «Колхоз» (решётчатая рама, деревянная жатка, мотовило крутится),
   рабочие с гаечными ключами, искры сварки; в окнах — степь и трактор с комбайном. На «миллионами» в окнах вырастают ряды красных
   комбайнов до горизонта, HUD-счётчик «×1 000 000». Том — клёпальщик (роба, кепка). Переход В сцену — мотовило комбайна
   прокручивает кадр лопастями. */
(() => {
  EV.rs_name = wtk('s3', 'Ростсельмаш');
  EV.rs_comb = wtk('s3', 'Комбайны');
  EV.rs_mil = wtk('s3', 'миллионами.');
  KEYW.push('Ростсельмаш', 'миллионами.');

  function hall(t) {                                                   // цех: стены, окна со степью, фермы, лозунг
    vgrad(-900, 1600, ['#9aa0a6', '#c8c4bc'], 1);
    for (let k = 0; k < 5; k++) { const x = -380 + k * 380; const w = rect(x, 520, 300, 400, { wash: '#d8e8f0', washA: 1, w: 3, col: '#3a3a3a' }); ctx.save(); ctx.clip(w.path); vgrad(520, 920, ['#8ac0e8', '#e8f0e0'], 1); rect(x - 10, 800, 320, 130, { wash: '#d8c070', washA: 1, w: 1, col: '#8a7a3a', a: 0.4 });
      if (t > EV.rs_mil - 0.2) { const n = Math.floor(clamp((t - EV.rs_mil + 0.2) / 1.2) * 12); for (let q = 0; q < n; q++) combine(x + 20 + (q % 4) * 80, 820 + Math.floor(q / 4) * 30, 0.1 + Math.floor(q / 4) * 0.03, t, {}); }
      else { const tx = x + ((t * 30 + k * 90) % 360) - 40; tractor(tx, 830, 0.16, t, { smoke: false }); combine(tx - 80, 834, 0.14, t, { old: 1 }); }
      ctx.restore(); for (let q = 1; q < 3; q++) pencil([[x + q * 100, 520], [x + q * 100, 920]], { w: 3, col: '#3a3a3a', pass2: false }); for (let q = 1; q < 4; q++) pencil([[x, 520 + q * 100], [x + 300, 520 + q * 100]], { w: 3, col: '#3a3a3a', pass2: false }); glow(x + 150, 720, 220, 'rgba(255,250,230,1)', 0.25); }
    for (let x = -500; x < 1700; x += 120) { pencil([[x, 300], [x + 60, 460], [x + 120, 300]], { w: 4, col: '#4a4a4e', pass2: false }); } pencil([[-500, 300], [1700, 300]], { w: 6, col: '#3a3a3e', pass2: false }); pencil([[-500, 460], [1700, 460]], { w: 6, col: '#3a3a3e', pass2: false });
    push(560, 1000); rect(-330, -40, 660, 80, { wash: '#c8302a', washA: 1, w: 3, col: '#5a0a08' }); txt('РОСТСЕЛЬМАШ · 1929', 0, 14, 46, { font: 'Osw', col: '#f6ecd6' }); pop();
    if (t > EV.rs_name) glow(560, 1000, 340, 'rgba(255,220,140,1)', 0.25 * sm((t - EV.rs_name) / 0.4));
  }
  function line(t) {                                                   // конвейер с комбайнами, рабочие, искры
    rect(-500, 1220, 2100, 40, { wash: '#5a5a5e', washA: 1, w: 2, col: '#1a1a1a' }); for (let x = -480; x < 1600; x += 60) ell(x + ((t * 60) % 60), 1260, 14, 14, { wash: '#3a3a3e', washA: 1, w: 1.4, col: '#0a0a0a' });
    const off = ((t - S0.rostselmash) * 70) % 640; for (let k = 0; k < 4; k++) combine(-560 + k * 640 + off, 1220, 0.62, t, { old: 1 });
    for (let i = 0; i < 4; i++) { const x = -60 + i * 300; human(x, 1240, 0.5, t, { body: '#4a6a8e', legs: '#2a3442', hair: '#3a2210', hat: 'cap', hatCol: '#2a2a2a', face: Math.sin(t + i) > 0 ? 'smile' : 'calm', armR: Math.sin(t * 6 + i) > 0 ? 'up' : 'point', armL: 'hold', seed: 13410 + i, flip: i % 2 ? 1 : -1 });
      if (i % 2 === 0) { const r = rng(13420 + Math.floor(t * 12)); for (let q = 0; q < 8; q++) { const a = r() * 6.28, L = 10 + r() * 40; pencil([[x + 60, 1100], [x + 60 + Math.cos(a) * L, 1100 + Math.sin(a) * L]], { w: 2.4, col: '#ffd24a', pass2: false }); } glow(x + 60, 1100, 60, 'rgba(255,220,120,1)', 0.6); } }
  }

  WORLD.rostselmash = (t, u, cat) => {
    lay(8, () => hall(t));
    lay(3, () => line(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#7a7a74', washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 14, a: 0.14, col: '#2a2a2a', ang: 0.2, w: 1.2 });
      for (let i = 0; i < 3; i++) rect(860 + i * 70, 1450 - i * 24, 60, 24, { wash: '#8a8a8e', washA: 1, w: 1.6, col: '#2a2a2a' }); cat(); });
    lay(0.7, () => motes(30, [-100, 300, 1200, 1700], '#ffe8b0', t, 13430, { sp: -12, sz: 3, a: 0.4, wob: 20 }));
  };
  DIR.rostselmash = {
    outfit: 'iron', light: { side: 1, rim: '#fff0d0' }, grade: ['#a8a8a0', 0.08],
    act: () => [[S0.rostselmash, 'proud'], [EV.rs_comb, 'grin'], [EV.rs_mil - 0.03, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.0, look: t < EV.rs_mil ? [0.6, -0.3] : [0.4, -0.7], hand: t > EV.rs_mil ? [100, -420] : [120, -270] }),
    cam: () => [[S0.rostselmash, 560, 1040, 0.06], [EV.rs_comb, 600, 1100, 0.1], [EV.rs_mil, 560, 960, 0.02], [S1.rostselmash, 560, 940, 0.04]],
    hud: t => { if (t > EV.rs_mil) { const k = popK(t, EV.rs_mil, 0.35); push(620, 1000, k, -0.03); rect(-230, -70, 460, 140, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a3020' }); txt('КОМБАЙН ×1 000 000', 0, -10, 42, { font: 'Osw', col: '#a8201e' }); txt('2-миллионный — 1984', 0, 40, 26, { col: '#2a1a10' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В rostselmash: лопасти мотовила прокручивают кадр
  TRANS_IN.rostselmash = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    const q = sm(k), a = q * Math.PI * 2.02, cx = 540, cy = 960; drawBuf(A);
    const P = new Path2D(); P.moveTo(cx, cy); for (let i = 0; i <= 40; i++) { const an = -Math.PI / 2 - a * i / 40; P.lineTo(cx + Math.cos(an) * 2400, cy + Math.sin(an) * 2400); } P.closePath(); inPath(P, () => drawBuf(B, 1.06 - 0.06 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 - a + i * 1.2566; pencil([[cx, cy], [cx + Math.cos(an) * 1500, cy + Math.sin(an) * 1500]], { w: 22, col: '#e8b030', a: f, pass2: false }); } ell(cx, cy, 50, 50, { wash: '#c8302a', washA: f, w: 3, col: '#3a0a08', a: f }); });
  } };
})();
