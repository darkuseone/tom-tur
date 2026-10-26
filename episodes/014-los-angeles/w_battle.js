/* 014 — сцена `battle`: ночь 25.02.1942, затемнённый город, на холме едва видна надпись HOLLYWOOD. Прожекторы шарят по небу,
   зенитки на крышах палят вверх, разрывы-«хлопья» в пустом небе; на «тысячу» — HUD-счётчик снарядов накручивается до 1440,
   на «пустое» прожекторы сходятся в одной точке — а там пусто, только метеозонд-кружок и надпись «ВРАГ: —». Без жертв в кадре.
   Том — в форме, в каске-пилотке, прикрывает уши. Переход В сцену — прожекторы прорезают темноту. */
(() => {
  EV.bt_pvo = wtk('s7', 'ПВО');
  EV.bt_n = wtk('s7', 'тысячу');
  EV.bt_empty = wtk('s7', 'пустое');
  KEYW.push('тысячу', 'четыреста', 'пустое');
  SHAKES.push([EV.bt_pvo, 0.4, 6], [EV.bt_n, 0.4, 7]);
  const fire = t => t > EV.bt_pvo && t < EV.bt_empty + 0.3;

  function sky(t) { vgrad(-900, 1000, ['#05081a', '#101a34', '#22264a'], 1); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(14801); for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(r() * 1600 - 260, r() * 800 - 300, 2, 2); } ctx.restore();
    const conv = t > EV.bt_empty ? sm((t - EV.bt_empty) / 0.6) : 0;
    [[-200, 1100], [300, 1100], [900, 1100], [1350, 1100]].forEach(([x, y], i) => { const free = -Math.PI / 2 + Math.sin(t * 0.9 + i * 1.7) * 0.5, aim = Math.atan2(380 - y, 560 - x); searchlight(x, y, lerp(free, aim, conv), t); });
    if (fire(t)) { const r = rng(14802 + Math.floor(t * 6)); for (let i = 0; i < 6; i++) { const x = r() * 1400 - 150, y = 120 + r() * 600, ph = (t * 6) % 1; ell(x, y, 30 + ph * 40, 26 + ph * 34, { wash: '#4a4450', washA: 0.7 * (1 - ph), line: false }); glow(x, y, 50, 'rgba(255,200,120,1)', 0.8 * (1 - ph)); } }
    if (conv > 0) { ell(560, 380, 26, 26, { wash: '#e8e4dc', washA: conv, w: 2, col: '#5a5a5a', a: conv }); pencil([[560, 406], [560, 470]], { w: 1.4, col: '#e8e4dc', a: conv, pass2: false }); }
  }
  function city(t) {                                                   // затемнённые крыши, зенитки
    for (let k = 0; k < 9; k++) { const x = -520 + k * 240, h = 160 + ((k * 47) % 140); rect(x, 1180 - h, 200, h, { wash: '#1a1c2a', washA: 1, w: 2, col: '#05060e' }); for (let q = 0; q < 3; q++) rect(x + 20 + q * 60, 1180 - h + 30, 30, 40, { wash: '#0a0a14', washA: 1, w: 1, col: '#000' }); }
    for (const [x, h] of [[-80, 380], [1100, 420]]) { ctx.save(); ctx.globalAlpha = 0.8; palm(x, 1190, h, t); ctx.restore(); }
    [[60, 1040], [500, 1000], [940, 1060]].forEach(([x, y], i) => aaGun(x, y, 0.7, t, { fire: fire(t), k: i * 1.3 }));
  }

  WORLD.battle = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(18, () => ridge(t, { col: '#1e2236', colD: '#0a0c18', chap: '#1a2a22', sign: 1, night: true }));
    lay(6, () => city(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#22242e', washA: 1, w: 2, col: '#05060e', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#000', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { if (fire(t)) motes(30, [-100, 0, 1200, 1500], '#ffd8a0', t, 14810, { sp: 120, sz: 3, a: 0.5, wob: 20 }); });
  };
  DIR.battle = {
    outfit: 'voen', light: { side: 1, rim: '#c8d8ff' }, grade: ['#2a3060', 0.24],
    act: () => [[S0.battle, 'suspicious'], [EV.bt_pvo, 'scared'], [EV.bt_n, 'shock'], [EV.bt_empty - 0.03, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.4, -0.8], hand: fire(t) ? [40, -380] : [120, -270], handF: fire(t) ? [-40, -380] : undefined, tilt: fire(t) ? Math.sin(t * 20) * 0.02 : 0 }),
    cam: () => [[S0.battle, 560, 1040, 0.04], [EV.bt_pvo, 560, 980, 0.02], [EV.bt_n, 560, 960, 0.0], [EV.bt_empty, 560, 860, 0.06], [S1.battle, 560, 860, 0.08]],
    hud: t => {
      if (t > EV.bt_n) { const k = popK(t, EV.bt_n, 0.3), n = Math.round(1440 * clamp((t - EV.bt_n) / 1.2)); push(620, 1040, k, 0.03); rect(-210, -60, 420, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#2a2a2a' }); txt(n + ' СНАРЯДОВ', 0, -6, 40, { font: 'Osw', col: '#a8201e' }); txt('25 февраля 1942', 0, 38, 24, { col: '#2a2a2a' }); pop(); }
      if (t > EV.bt_empty + 0.4) { const k = popK(t, EV.bt_empty + 0.4, 0.3); push(560, 700, k, -0.03); rect(-170, -46, 340, 92, { wash: '#1a1a1e', washA: 0.95, w: 3, col: '#000' }); txt('ВРАГ: —', 0, 14, 48, { font: 'Osw', col: '#ffd24a' }); pop(); }
    }
  };
  TRANS_IN.battle = { a: 0.3, b: 0.45, fx(k, t, A, B) {              // прожекторы прорезают темноту
    drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = sm(clamp(k / 0.4)); ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    if (k > 0.3) { const q = sm((k - 0.3) / 0.7), sp = 0.05 + q * 0.9; [[200, 1920], [540, 1920], [880, 1920]].forEach(([x, y], i) => { const a = -Math.PI / 2 + (i - 1) * 0.5 * (1 - q); const P = new Path2D(); P.moveTo(x, y); P.lineTo(x + Math.cos(a - sp) * 3000, y + Math.sin(a - sp) * 3000); P.lineTo(x + Math.cos(a + sp) * 3000, y + Math.sin(a + sp) * 3000); P.closePath(); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q)); }); }
  } };
})();
