/* 011 — сцена `portofranco`: 1819–1859, порто-франко. Шумный порт: лес мачт, флаги разных стран, мешки зерна, бочки, грузчики с тюками,
   купцы торгуются; за портом на обрыве — уже город из жёлтого камня. На «пошлин» таможенный шлагбаум взлетает и сыплются монеты,
   на «четвёртый» — пьедестал «1 Петербург · 2 Москва · 3 Варшава · 4 ОДЕССА», Одесса с медалью. Переход В сцену — шлагбаум таможни
   проносится поперёк кадра. */
(() => {
  EV.pf_duty = wtk('s3', 'пошлин');
  EV.pf_4 = wtk('s3', 'четвёртый');
  KEYW.push('пошлин', 'империи.');
  SHAKES.push([EV.pf_duty, 0.2, 5]);
  const open = t => sm((t - EV.pf_duty) / 0.35);

  function sky(t) { vgrad(-900, 900, ['#5a98d0', '#a8cce6', '#f0e8d6'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 430 + t * 20) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 120 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function town(t) { const c = shape([[-500, 760], [1600, 740], [1600, 900], [-500, 900]], { wash: OD.stone, washA: 1, w: 2, col: OD.rockD }); shadeG(c.path, 0, 740, 0, 900, OD.rockD, 0.4);
    for (let k = 0; k < 9; k++) odHouse(-420 + k * 220, 760, 200, 120 + (k % 3) * 30, ['#e8c88a', '#e8b89a', '#f0dcb0'][k % 3], t, { key: 11500 + k }); }
  function harbor(t) {                                                 // вода, лес мачт, корабли под пёстрыми флагами
    vgrad(900, 1250, ['#2a7a96', '#14465e'], 1); for (let k = 0; k < 12; k++) pencil([[-400, 920 + k * 28], [1480, 926 + k * 28]], { w: 1.2, col: '#bfe4f0', a: 0.3, pass2: false });
    [['#c8302a', 1300, 1020, 0.36], ['#2a5aa8', 980, 1000, 0.32], ['#e8c030', 700, 1010, 0.3], ['#2a8a4a', 1520, 1040, 0.4], ['#f2f2f2', 420, 1000, 0.28]].forEach(([f, x, y, s], i) => merchant(x, y, s, t, i, { flag: f }));
  }
  function quay(t) {                                                   // причал: мешки, бочки, грузчики, купцы, кран
    const q = rect(-500, 1240, 2100, 60, { wash: OD.stoneD, washA: 1, w: 2, col: '#2a1a08' }); for (let x = -480; x < 1600; x += 80) pencil([[x, 1240], [x, 1300]], { w: 1.4, col: '#2a1a08', a: 0.5, pass2: false });
    for (let i = 0; i < 10; i++) { const x = 560 + (i % 5) * 70, y = 1240 - Math.floor(i / 5) * 46; blob([[x - 34, y], [x - 30, y - 50], [x + 30, y - 50], [x + 34, y]], { wash: '#d8c08a', washA: 1, w: 1.6, col: '#5a4a2a' }); txt('ЗЕРНО', x, y - 22, 12, { font: 'Osw', col: '#5a4a2a' }); }
    for (let i = 0; i < 3; i++) { const x = 980 + i * 70; ell(x, 1210, 30, 34, { wash: '#8a5a2a', washA: 1, w: 2, col: '#2a1a08' }); for (const dy of [-18, 18]) pencil([[x - 30, 1210 + dy], [x + 30, 1210 + dy]], { w: 3, col: '#3a3a3a', pass2: false }); }
    pencil([[-80, 1240], [-80, 900], [140, 860]], { w: 9, col: '#5a3a1e' }); pencil([[140, 860], [140, 1000 + Math.sin(t * 2) * 30]], { w: 2, col: '#2a2a2a', pass2: false }); blob([[110, 1000 + Math.sin(t * 2) * 30], [170, 1000 + Math.sin(t * 2) * 30], [176, 1060 + Math.sin(t * 2) * 30], [104, 1060 + Math.sin(t * 2) * 30]], { wash: '#d8c08a', washA: 1, w: 1.6, col: '#5a4a2a' });
    for (let i = 0; i < 4; i++) { const x = 160 + ((t - S0.portofranco) * 70 + i * 140) % 560, bend = Math.sin(t * 6 + i) > 0; human(x, 1244, 0.5, t, { body: ['#e8e0cc', '#c8b090', '#a8b8c8', '#d8c8a8'][i], legs: '#4a3a2a', hair: '#2a1a10', hat: i % 2 ? 'cap' : null, hatCol: '#5a4a3a', armR: 'up', armL: 'up', seed: 1150 + i }); blob([[x - 30, 1244 - 168], [x + 30, 1244 - 168], [x + 34, 1244 - 210], [x - 34, 1244 - 210]], { wash: '#d8c08a', washA: 1, w: 1.6, col: '#5a4a2a' }); }
  }
  function customs(t) {                                                // таможня: будка, шлагбаум, монеты
    const o = open(t); rect(1010, 1300, 120, 190, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); for (let k = 0; k < 4; k++) { ctx.save(); ctx.fillStyle = k % 2 ? '#1a1a1a' : '#f2ece0'; ctx.fillRect(1010, 1300 + k * 48, 120, 24); ctx.restore(); } poly([[1000, 1300], [1140, 1300], [1070, 1250]], { wash: '#2a4a2a', washA: 1, w: 2, col: '#0a1a0a' }); txt('ТАМОЖНЯ', 1070, 1330, 20, { font: 'Osw', col: '#a8201e' });
    push(1000, 1420, 1, -0.05 - o * 1.35); const bar = rect(-520, -10, 520, 20, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); ctx.save(); ctx.clip(bar.path); for (let x = -520; x < 0; x += 60) { ctx.fillStyle = '#c8201e'; ctx.fillRect(x, -10, 30, 20); } ctx.restore(); pop();
    if (t > EV.pf_duty) { const R = rng(11520); for (let i = 0; i < 18; i++) { const ph = clamp((t - EV.pf_duty) * 1.3 - R() * 0.4), x = 700 + R() * 380, y = 1000 + ph * 480 + R() * 40; if (ph > 0 && ph < 1) { ell(x, y, 14, 14 * Math.abs(Math.cos(t * 9 + i)), { wash: '#e8c040', washA: 1, w: 1.6, col: '#6a4a08' }); } } }
  }

  WORLD.portofranco = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => town(t));
    lay(6, () => harbor(t));
    lay(3, () => quay(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89a86', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1470; y < 2400; y += 40) rect(x + (Math.floor(y / 40) % 2) * 35, y, 66, 36, { wash: '#b8aa94', washA: 0.6, w: 1, col: '#6a5e4e', a: 0.4 }); ctx.restore();
      customs(t);
      human(800, 1500, 1.0, t, { body: '#5a2a3a', bodyD: '#2a1018', legs: '#2a2a2e', boots: '#141010', hair: '#3a2210', beard: 'short', hat: 'merchant', hatCol: '#1a1a1a', face: t > EV.pf_duty ? 'grin' : 'calm', armR: t > EV.pf_duty ? 'up' : 'hold', armL: 'hold', seed: 1155, flip: -1 });
      cat(); });
  };
  DIR.portofranco = {
    outfit: 'sailor', light: { side: 1, rim: '#fff0d0' }, grade: ['#a8c0d0', 0.08],
    act: () => [[S0.portofranco, 'talk'], [EV.pf_duty, 'laugh'], [EV.pf_4 - 0.03, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1490, s: 1.04, look: [0.5, -0.2], hand: t > EV.pf_duty && t < EV.pf_4 ? [110, -400] : [120, -270], handF: t > EV.pf_duty && t < EV.pf_4 ? [-110, -400] : undefined }),
    cam: () => [[S0.portofranco, 600, 1000, 0.08], [EV.pf_duty, 640, 1080, 0.06], [EV.pf_4, 580, 1020, 0.1], [S1.portofranco, 580, 1020, 0.14]],
    hud: t => { if (t > EV.pf_4) { const k = popK(t, EV.pf_4, 0.35); push(540, 680, k, 0); [['1', 'ПЕТЕРБУРГ', -270, 120], ['2', 'МОСКВА', -90, 100], ['3', 'ВАРШАВА', 90, 80], ['4', 'ОДЕССА', 270, 70]].forEach(([n, s, x, h], i) => {
        const hi = i === 3; rect(x - 84, -h, 168, h, { wash: hi ? '#e8a33c' : '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt(n, x, -h / 2, 44, { font: 'Osw', col: hi ? '#1a1410' : '#6a5a4a' }); txt(s, x, 30, hi ? 32 : 26, { font: 'Osw', col: hi ? '#ffd24a' : '#f6e7c8' }); });
      ell(270, -110, 26, 26, { wash: '#e8c040', washA: 1, w: 2, col: '#6a4a08' }); txt('4', 270, -108, 26, { font: 'Osw', col: '#6a4a08' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В portofranco: таможенный шлагбаум проносится через кадр
  TRANS_IN.portofranco = { a: 0.3, b: 0.35, fx(k, t, A, B) {
    const ang = lerp(0.9, -0.9, sm(k)), px = -60, py = 1500;
    drawBuf(A); const P = new Path2D(); P.moveTo(px, py); P.lineTo(px + Math.cos(ang - 1.6) * 3000, py + Math.sin(ang - 1.6) * 3000); P.lineTo(px + Math.cos(ang) * 3000, py + Math.sin(ang) * 3000); P.lineTo(W + 2000, H + 2000); P.lineTo(-2000, H + 2000); P.closePath();
    inPath(P, () => drawBuf(B, 1.08 - 0.08 * sm(k)));
    scr(() => { push(px, py, 1, ang); const b = rect(0, -26, 2400, 52, { wash: '#f2ece0', washA: 1, w: 3, col: '#1a1a1a' }); ctx.save(); ctx.clip(b.path); for (let x = 0; x < 2400; x += 120) { ctx.fillStyle = '#c8201e'; ctx.fillRect(x, -26, 60, 52); } ctx.restore(); pop(); });
  } };
})();
