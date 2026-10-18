/* 003 — сцена `metro` (хук): 2026, эскалатор «Арсенальной» в разрезе. Наклонный тоннель-тюбинг с лампами-торшерами,
   вокруг — слои киевского берега (лёсс, глина, пески, голубой киевский мергель). В мергеле под ногами Тома — призрак акулы Otodus
   и позвонки (их нашли при стройке «Золотых ворот» с глубины ≈110 м). Справа шкала глубины. Переход в туннель — ступени закручиваются в воронку. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.metro_shark = wt('h1', 'акулу!');            // акула открывает глаз и щёлкает пастью
  EV.metro_depth = wt('h1', 'метров!');           // шкала глубины вспыхивает на −110
  EV.metro_dont = wt('h2', 'веришь?');            // Том ехидно щурится
  EV.metro_wind = wt('h2', 'Отматываем');         // часы в лапе
  SHAKES.push([EV.metro_shark + 0.05, 0.3, 10]);
  KEYW.push('метров!');

  const SL = 0.55, X0 = 560, Y0 = GY;                                // склон эскалатора: y = Y0 + (x − X0)·SL
  const Ly = x => Y0 + (x - X0) * SL, TOPO = 640;                    // высота тоннеля
  const STRATA = [[-400, '#b9a478', 'лёсс'], [560, '#9a7652', 'глина'], [930, '#b0a688', 'пески'], [1240, '#7d8f97', 'киевский мергель']];

  function earth(t) {                                                // слои берега Днепра
    for (let i = 0; i < STRATA.length; i++) {
      const [y0, c] = STRATA[i], y1 = i < STRATA.length - 1 ? STRATA[i + 1][0] : 2600;
      const P = [[-300, y0 + Math.sin(i * 3) * 20]]; for (let x = -300; x <= 1400; x += 60) P.push([x, y0 + Math.sin(x * 0.006 + i * 2) * 26 + Math.sin(x * 0.021 + i) * 8]);
      P.push([1400, y1 + 40], [-300, y1 + 40]);
      const p = shape(P, { wash: c, washA: 1, w: 2.2, col: '#3a2c1e', a: 0.55, key: 7200 + i });
      hatch(p.path, p.bb, { gap: 11 + i * 2, a: 0.12, col: '#2a1e12', ang: 0.15 + i * 0.3, key: 7210 + i, w: 1.3 });
    }
    const r = rng(7220);                                             // камешки, ракушки и зубы в мергеле
    for (let k = 0; k < 70; k++) { const x = -80 + r() * 1240, y = 330 + r() * 1700, big = r() < 0.15; if (y < 1240 && r() < 0.6) continue;
      const deep = y > 1240; ell(x, y, big ? 7 : 3.5, big ? 5 : 2.6, { wash: deep ? '#c9d2d0' : '#6a5a40', washA: 0.8, line: false, rot: r() * 3 });
      if (deep && r() < 0.25) poly([[x - 6, y + 4], [x + 6, y + 4], [x, y - 10]], { wash: '#efe8d6', washA: 0.9, w: 1, col: '#4a4a40', a: 0.6 }); }
    // корни и подземные трубы наверху (город над нами)
    for (let k = 0; k < 6; k++) { const x = 120 + k * 170 + Math.sin(k * 4) * 40; pencil([[x, 340], [x + 14, 420], [x - 10, 500], [x + 6, 560]], { w: 2, col: '#4a3420', a: 0.5, pass2: false }); }
    rect(-100, 430, 1300, 34, { wash: '#6a6a6e', washA: 0.9, w: 2, col: '#2a2a2e' }); for (let x = -60; x < 1200; x += 140) rect(x, 424, 18, 46, { wash: '#5a5a5e', washA: 1, w: 1.6, col: '#2a2a2e' });
    for (const [s_, x, y] of STRATA.map(q => [q[2], 860, q[0] + 70])) if (y > 500) txt(s_, x, y, 34, { font: 'Hand', col: '#2a1e14', a: 0.75, rot: -0.03 });
  }
  function tunnelBand(t) {                                           // наклонный тоннель: тюбинги, свод, лампы
    const xs = [-300, 1400], band = [[xs[0], Ly(xs[0]) + 46], [xs[1], Ly(xs[1]) + 46], [xs[1], Ly(xs[1]) - TOPO - 40], [xs[0], Ly(xs[0]) - TOPO - 40]];
    shape(band, { wash: '#2a2420', washA: 1, w: 3, col: '#140e0a', key: 7230 });
    const inner = [[xs[0], Ly(xs[0]) + 20], [xs[1], Ly(xs[1]) + 20], [xs[1], Ly(xs[1]) - TOPO], [xs[0], Ly(xs[0]) - TOPO]], ip = pathOf(inner);
    ctx.save(); ctx.clip(ip); const g = ctx.createLinearGradient(0, Ly(540) - TOPO, 0, Ly(540)); g.addColorStop(0, '#4a3c32'); g.addColorStop(0.55, '#7a6450'); g.addColorStop(1, '#3a2e26'); ctx.fillStyle = g; ctx.fillRect(-400, -200, 1900, 2600);
    for (let x = -300; x < 1400; x += 96) { const dx = -SL * 0.6; pencil([[x, Ly(x) + 20], [x + dx * TOPO * 0.0, Ly(x) - TOPO]], { w: 3, col: '#2a2018', a: 0.7, pass2: false }); for (let j = 1; j < 6; j++) ell(x + 6, Ly(x) - j * TOPO / 6, 3, 3, { wash: '#c8a868', washA: 0.8, line: false }); }
    pencil([[-300, Ly(-300) - TOPO * 0.55], [1400, Ly(1400) - TOPO * 0.55]], { w: 2, col: '#2a2018', a: 0.4, pass2: false });
    ctx.restore();
    // лампы-торшеры на средней балюстраде (дальний план тоннеля)
    for (let x = -260; x < 1400; x += 190) { const by = Ly(x) - 230; pencil([[x, by], [x, by - 150]], { w: 5, col: '#c49a5a', pass2: false }); ell(x, by - 150, 9, 6, { wash: '#a07a40', washA: 1, w: 1.4 });
      const f = flick(t, x) * 0.02 + 0.98; glow(x, by - 180, 150, 'rgba(255,214,150,1)', 0.55 * f); const gl = ell(x, by - 180, 26, 34, { wash: '#fff2d2', washA: 0.95, w: 2, col: '#8a6a3a' }); shadeG(gl.path, x + 20, 0, x - 10, 0, '#e8c088', 0.6);
      ell(x, by - 214, 14, 6, { wash: '#a07a40', washA: 1, w: 1.4 }); }
    // дальний эскалатор (вверх): тёмная лента и поручень
    pencil([[-300, Ly(-300) - 240], [1400, Ly(1400) - 240]], { w: 12, col: '#16100c', pass2: false }); pencil([[-300, Ly(-300) - 300], [1400, Ly(1400) - 300]], { w: 8, col: '#0e0a08', pass2: false });
  }
  function stepsNear(t) {                                            // ближний эскалатор: ступени едут вниз, балюстрада, поручень
    const off = (t * 70) % 60;
    const P = []; for (let x = -340 + off; x < 1420; x += 60) { const y = Ly(x); P.push([x, y], [x + 60, y]); }
    ctx.save(); ctx.fillStyle = '#2a2622'; ctx.beginPath(); ctx.moveTo(-340, Ly(-340)); for (let x = -340 + off; x < 1420; x += 60) { ctx.lineTo(x, Ly(x)); ctx.lineTo(x, Ly(x + 60)); } ctx.lineTo(1420, Ly(1420) + 200); ctx.lineTo(-340, Ly(-340) + 200); ctx.fill(); ctx.restore();
    for (let x = -340 + off; x < 1420; x += 60) { pencil([[x, Ly(x)], [x + 60, Ly(x)], [x + 60, Ly(x + 60)]], { w: 2.4, col: '#b8b0a0', a: 0.75, pass2: false, gap: false }); pencil([[x + 4, Ly(x) + 3], [x + 56, Ly(x) + 3]], { w: 6, col: '#e8b030', a: 0.5, pass2: false, gap: false }); }
    // ближняя балюстрада (ниже ступеней: мы видим только край и поручень спереди)
    const bp = shape([[-340, Ly(-340) + 30], [1420, Ly(1420) + 30], [1420, Ly(1420) + 90], [-340, Ly(-340) + 90]], { wash: '#8a6440', washA: 1, w: 2.6, col: '#2a1a0c', key: 7240 });
    hatch(bp.path, bp.bb, { gap: 6, a: 0.2, col: '#3a2410', ang: Math.atan(SL), key: 7241, w: 1.2 });
    pencil([[-340, Ly(-340) + 28], [1420, Ly(1420) + 28]], { w: 14, col: '#141010', pass2: false }); pencil([[-340, Ly(-340) + 22], [1420, Ly(1420) + 22]], { w: 3, col: 'rgba(255,230,190,0.6)', pass2: false });
  }
  function rider(x, s, t, k) {                                       // пассажир на ступени (силуэт), смотрит в телефон / вниз
    const y = Ly(x); push(x, y, s);
    const c = ['#3a3440', '#4a3a30', '#2e3a44'][k % 3];
    blob([[-26, 0], [-30, -90], [-40, -170], [-20, -200], [20, -200], [40, -170], [30, -90], [26, 0]], { wash: c, washA: 1, w: 2.4, col: '#140e0a', key: 7250 + k });
    ell(0, -230, 26, 30, { wash: '#c8a080', washA: 1, w: 2.2, col: '#140e0a' }); blob([[-28, -238], [0, -266], [28, -240], [24, -226], [-24, -226]], { wash: ['#2a1a10', '#6a4a2a', '#1a1a1a'][k % 3], washA: 1, w: 1.8 });
    rect(14, -170, 16, 26, { wash: '#1a1a20', washA: 1, w: 1.4 }); glow(22, -164, 40, 'rgba(160,210,255,1)', 0.5);
    pop();
  }
  function ruler(t) {                                                // шкала глубины слева
    const x = 990, y0 = 560, y1 = 1480, d2y = d => y0 + (y1 - y0) * d / 120;
    pencil([[x, y0], [x, y1]], { w: 4, col: '#f3e6c8', a: 0.85, pass2: false });
    for (let d = 0; d <= 120; d += 10) { pencil([[x - (d % 50 ? 10 : 18), d2y(d)], [x + (d % 50 ? 10 : 18), d2y(d)]], { w: 3, col: '#f3e6c8', a: 0.85, pass2: false, gap: false }); if (d % 50 === 0) txt(`−${d}`, x - 50, d2y(d), 28, { font: 'Osw', col: '#f3e6c8' }); }
    txt('глубина, м', x - 40, y0 - 44, 28, { font: 'Osw', col: '#f3e6c8' });
    const k = popK(t, EV.metro_depth, 0.4); if (t > EV.metro_depth) { const y = d2y(110); glow(x, y, 90, 'rgba(255,190,90,1)', 0.7 * k); ell(x, y, 14 * k, 14 * k, { wash: K.amber, washA: 1, w: 2.4, col: '#2a1a0a' }); push(x - 30, y + 50, k); txt('−110 м', -40, 0, 46, { font: 'Osw', col: K.amber }); pop(); }
  }
  function fossilSpot(t) {                                           // акула и позвонки в мергеле
    const k = sm((t - EV.metro_shark + 0.6) / 0.6), jaw = t > EV.metro_shark ? Math.max(0, Math.sin(clamp((t - EV.metro_shark) / 0.45) * Math.PI)) : 0;
    glow(330, 1560, 420, 'rgba(120,200,220,1)', 0.18 + 0.3 * k);
    shark(320, 1580 + Math.sin(t * 1.4) * 8, COVER_ON ? 0.75 : 0.62, t, { a: COVER_ON ? 1 : 0.55 + 0.4 * k, ghost: COVER_ON ? 0 : 1, jaw, glowEye: k, sp: 2, col: '#6d8794', colD: '#1e3440', colL: '#c8dad8' });
    for (const [x, y, r, rot] of [[560, 1720, 26, 0.3], [620, 1700, 22, 0.1], [680, 1716, 20, -0.2], [110, 1420, 18, 0.5]]) vertebra(x, y, r, rot);
  }

  WORLD.metro = (t, u, cat) => {
    lay(1.25, () => { earth(t); fossilSpot(t); });
    lay(1.08, () => { tunnelBand(t); });
    lay(1, () => { rider(170, 1.0, t, 0); rider(330, 1.02, t, 1); cat(); rider(930, 1.08, t, 2); stepsNear(t); });
  };
  DIR.metro = {
    outfit: 'hoodieK', light: { side: 1, rim: '#ffd8a0' }, grade: ['#3a4a6a', 0.14],
    act: () => [[0, 'talk'], [EV.metro_shark - 0.04, 'shock'], [EV.metro_depth, 'awe'], [LS('h2'), 'smug'], [EV.metro_dont + 0.1, 'sideeye'], [EV.metro_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: X0, y: Y0, s: 1.12, look: t > EV.metro_shark && t < LS('h2') ? [-0.55, 0.65] : t > LS('h2') ? [0.1, 0] : [0.2, 0.1],
      tilt: t > EV.metro_shark && t < LS('h2') ? 0.08 : 0, squash: b.squash,
      hand: t > EV.metro_wind ? [70, -330] : t > EV.metro_shark && t < LS('h2') ? [-150, -120] : undefined,
      point: t > EV.metro_shark + 0.1 && t < LS('h2') ? 1 : undefined,
      watchInHand: t > EV.metro_wind - 0.1, glow: clamp((t - EV.metro_wind) / 0.4), spin: t > EV.metro_wind + 0.3 ? 1 : 0, tailUp: t > EV.metro_shark && t < EV.metro_depth + 0.4
    }),
    cam: () => [[0, 560, 1140, 0.08], [EV.metro_shark, 520, 1240, 0.1], [EV.metro_depth + 0.2, 470, 1360, 0.12], [LS('h2'), 560, 1180, 0.14], [S1.metro, 600, 1120, 0.26]],
    hud: t => { scr(() => ruler(t)); if (t > EV.metro_depth + 0.2 && t < S1.metro) note('позвонки акулы · 41 млн лет', 470, 1790, t, EV.metro_depth + 0.2, S1.metro, '#f3e6c8', 44, -0.03); }
  };

  // ---------------------------------------------------------------- переход В туннель: ступени закручиваются в воронку
  TRANS_IN.tunnel = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const cx = 620, cy = 1020, q = sm(k);
    for (let i = 6; i >= 0; i--) { const kk = clamp(q * 1.3 - i * 0.06); drawBuf(A, 1 - 0.75 * kk + i * 0.03, cx, cy, i ? 0.22 : 1 - sm((k - 0.55) / 0.3), null, 0, 0, kk * (3.2 + i * 0.4)); }
    const R = Math.pow(sm((k - 0.25) / 0.6), 1.4) * 1300; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.4 - 0.4 * sm(k), cx, cy)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.4 - k)); }
  } };
})();
