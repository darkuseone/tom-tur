/* 014 — сцена `sign` (ОТВЕТ НА ХУК): 1923 → 1949. Склон горы Ли: рабочие с мулами втаскивают и ставят буквы на сваи —
   HOLLYWOODLAND, лампочки мигают «HOLLY» · «WOOD» · «LAND»; внизу — новые виллы посёлка, щит «HOLLYWOODLAND · участки
   у холмов · без лишних затрат», риелтор раздаёт буклеты. На «реклама» буквы встают, на «Голливудленд» — вспыхивают лампы,
   на «полтора» — HUD «срок: 18 месяцев». Во второй реплике: на «Ленд» буквы LAND падают с холма (1949), на «временная» —
   HUD «1923 → 2026: 103 года». Том — риелтор в сером костюме. Переход В сцену — лампочки букв вспыхивают по очереди. */
(() => {
  EV.sg_ad = wtk('s6', 'реклама');
  EV.sg_name = wtk('s6', 'Голливудленд');
  EV.sg_18 = wtk('s6', 'полтора');
  EV.sg_land = wtk('a1', 'Ленд');
  EV.sg_tmp = wtk('a1', 'временная');
  KEYW.push('реклама', 'Голливудленд', 'Ленд', 'сто');
  SHAKES.push([EV.sg_land + 0.5, 0.3, 6]);
  const build = t => clamp((t - S0.sign + 0.2) / (EV.sg_name - S0.sign));
  const land = t => t < EV.sg_land + 0.2 ? 1 : 1 - sm((t - EV.sg_land - 0.2) / 0.9);

  function sky(t) { vgrad(-900, 1000, ['#5a8ad0', '#b0d0e8', '#f4e8cc'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 170 + i * 80 + Math.sin(k) * 10, 76, 26, { wash: '#f6f4f0', washA: 0.85, line: false }); } }
  function slope(t) {                                                  // виллы посёлка, щит, риелтор
    const g = shape([[-600, 1500], [-600, 1060], [1700, 1040], [1700, 1500]], { wash: '#b8a874', washA: 1, w: 2, col: '#6a5a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#7a6a3a', ang: -0.3, w: 1.1 });
    for (let k = 0; k < 6; k++) { const x = -480 + k * 340, y = 1100 - (k % 2) * 30; rect(x, y - 110, 200, 110, { wash: ['#f2e6d0', '#f0dcc8', '#e8e4d8'][k % 3], washA: 1, w: 2, col: '#4a3a2a' }); poly([[x - 14, y - 110], [x + 214, y - 110], [x + 100, y - 160]], { wash: '#c8603a', washA: 1, w: 2, col: '#4a2a1a' }); rect(x + 30, y - 80, 40, 40, { wash: '#4a6a8a', washA: 1, w: 1.4, col: '#1a1a1a' }); rect(x + 120, y - 70, 40, 70, { wash: '#6a4424', washA: 1, w: 1.4, col: '#1a0a04' }); }
    for (const [x, h] of [[-260, 340], [1300, 380]]) palm(x, 1120, h, t);
    billboard(860, 1300, 0.8, t, ['HOLLYWOODLAND', 'участки у холмов', 'без лишних затрат']);
    human(600, 1340, 0.5, t, { body: '#5a5a62', legs: '#3a3a40', hair: '#3a2210', hat: 'merchant', hatCol: '#2a2a2e', face: 'smile', armR: 'point', armL: 'hold', prop: 'scroll', seed: 14710 });
    for (let i = 0; i < 2; i++) human(1120 + i * 130, 1350, 0.48, t, { body: i ? '#c8603a' : '#e8e4dc', legs: '#3a3a40', hair: '#e8c070', hat: i ? 'bun' : 'straw', hatCol: '#e8d090', face: 'smile', armR: 'hold', armL: 'hold', long: i === 1, seed: 14711 + i, flip: -1 });
  }
  function workers(t) {                                                // рабочие с мулом тащат букву на склоне
    if (build(t) >= 1) return; const k = build(t); for (let i = 0; i < 2; i++) { const x = 420 + i * 200 + k * 60, y = 640 - k * 40 - i * 20; human(x, y, 0.2, t, { body: '#4a5a7a', legs: '#2a2a3a', hair: '#3a2210', hat: 'cap', hatCol: '#2a2a2a', face: 'calm', armR: 'up', armL: 'up', seed: 14720 + i }); }
  }

  WORLD.sign = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(14, () => { ridge(t, { base: 1000, sign: build(t), land: land(t), bulbs: t > EV.sg_name && t < EV.sg_land, signS: 1.05 }); workers(t); });
    lay(4, () => slope(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89868', washA: 1, w: 2, col: '#4a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { if (t > EV.sg_land + 0.4 && t < EV.sg_land + 2) motes(30, [700, 400, 1300, 900], '#e8dcc0', t, 14730, { sp: 40, sz: 6, a: 0.5, wob: 20 }); });
  };
  DIR.sign = {
    outfit: 'suitK', light: { side: 1, rim: '#fff4e0' }, grade: ['#c0a878', 0.06],
    act: () => [[S0.sign, 'shock'], [EV.sg_ad, 'awe'], [EV.sg_name, 'grin'], [EV.sg_18, 'wink'], [EV.sg_land - 0.03, 'shock'], [EV.sg_tmp, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.5, -0.8], point: (t > EV.sg_ad && t < EV.sg_18) || (t > EV.sg_land && t < EV.sg_tmp) ? 1 : undefined, hand: (t > EV.sg_ad && t < EV.sg_18) || (t > EV.sg_land && t < EV.sg_tmp) ? [150, -420] : [120, -270] }),
    cam: () => [[S0.sign, 600, 880, 0.04], [EV.sg_name, 640, 880, 0.08], [EV.sg_18, 600, 1000, 0.02], [EV.sg_land, 660, 880, 0.08], [EV.sg_tmp, 600, 1000, 0.02], [S1.sign, 600, 1020, 0.04]],
    hud: t => {
      if (t > EV.sg_18 && t < EV.sg_land) { const k = popK(t, EV.sg_18, 0.35); push(620, 1060, k, -0.03); rect(-210, -60, 420, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('СРОК: 18 МЕСЯЦЕВ', 0, -8, 38, { font: 'Osw', col: '#a8201e' }); txt('реклама · 1923', 0, 36, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.sg_land && t < EV.sg_tmp) { const k = popK(t, EV.sg_land, 0.3); push(860, 1060, k, 0.04); rect(-110, -46, 220, 92, { wash: '#2a1a10', washA: 0.95, w: 3, col: '#000' }); txt('1949', 0, 14, 52, { font: 'Osw', col: '#ffd24a' }); pop(); }
      if (t > EV.sg_tmp) { const k = popK(t, EV.sg_tmp, 0.35); push(600, 1060, k, -0.03); rect(-240, -66, 480, 132, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('1923 → 2026', 0, -12, 44, { font: 'Osw', col: '#2a1a10' }); txt('«временная» — 103 года', 0, 38, 28, { col: '#a8201e' }); pop(); }
    }
  };
  TRANS_IN.sign = { a: 0.3, b: 0.45, fx(k, t, A, B) {                // лампочки вспыхивают по очереди и открывают кадр
    drawBuf(k < 0.55 ? A : B, k < 0.55 ? 1 : 1.06 - 0.06 * sm((k - 0.55) / 0.45));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), n = Math.floor(sm(k) * 60); ctx.save(); ctx.globalAlpha = 0.5 * f; ctx.fillStyle = '#0e0c10'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < n; i++) { const x = 90 + (i % 10) * 100, y = 300 + Math.floor(i / 10) * 230; glow(x, y, 70, 'rgba(255,240,180,1)', f); ell(x, y, 14, 18, { wash: '#fff6d0', washA: f, w: 1.4, col: '#5a4a2a', a: f }); } });
  } };
})();
