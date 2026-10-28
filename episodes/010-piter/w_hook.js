/* 010 — сцена `hook`: 2026, белая ночь, Нева у Смольного. Справа голубой Смольный собор, вдали золотой шпиль Петропавловки, мост, катер,
   чайки, туристы на граните. С 0,0 с из тумана над устьем Охты встаёт призрак шведской крепости с флагом (рог, порыв ветра), Том отшатывается.
   На «четыреста» — плашка-таймлайн «1300 ← 403 года → 1703»; на «Петра!» — портрет-медальон Петра с вопросом. Переход в туннель — золотой шпиль
   становится стрелкой часов и раскручивает портал. */
(() => {
  EV.hk_swede = LS('h1');
  EV.hk_400 = wtk('h1', 'четыреста');
  EV.hk_peter = wtk('h1', 'Петра!');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([EV.hk_swede + 0.05, 0.3, 8]);
  KEYW.push('Шведы!', 'Петра!');
  const fort = t => sm((t - EV.hk_swede) / 0.6);

  function sky(t) {
    vgrad(-900, 1100, ['#5a6a9a', '#b89ab8', '#f2c8b0', '#f6e2c8'], 1);
    for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 80 + i * 70 + Math.sin(k) * 10, 72, 24, { wash: '#f6dcd8', washA: 0.7, line: false }); }
    glow(300, 760, 500, 'rgba(255,220,180,1)', 0.35);
  }
  function far(t) {                                                    // дальний берег: город, шпиль, мост
    for (let k = 0; k < 30; k++) { const x = -300 + k * 60, h = 60 + (k * 41) % 90; rect(x, 900 - h, 56, h, { wash: ['#c8a890', '#d8c0a0', '#b8a0a8'][k % 3], washA: 1, w: 1, col: '#5a4a4a', a: 0.4 }); }
    spire(150, 900, 0.42, t, { glow: 0.6 });
    // Большеохтинский мост: две ажурные башни, пролёт
    for (const bx of [420, 700]) { rect(bx - 16, 790, 32, 120, { wash: '#4a6a8a', washA: 1, w: 1.6, col: '#1a2a3a' }); poly([[bx - 16, 790], [bx + 16, 790], [bx, 760]], { wash: '#4a6a8a', washA: 1, w: 1.4, col: '#1a2a3a' }); }
    pencil(spline([[300, 880], [420, 860], [560, 850], [700, 860], [820, 880]], false, 10), { w: 10, col: '#4a6a8a' }); for (let x = 320; x < 810; x += 22) pencil([[x, 880 - Math.sin((x - 300) / 520 * Math.PI) * 30], [x + 11, 900]], { w: 2, col: '#2a4a6a', a: 0.8, pass2: false });
  }
  function ghostFort(t) {                                              // призрак шведской крепости в тумане над устьем Охты
    const k = fort(t); if (k <= 0) return;
    for (let i = 0; i < 8; i++) ell(560 + (i - 3.5) * 150, 880 - i % 2 * 20, 230, 70, { wash: '#f2f0f4', washA: 0.55 * k, line: false });
    push(0, (1 - k) * 300, 1); swedeFort(560, 900, 0.82, t, { ghost: 1 }); pop();
    glow(560, 760, 340, 'rgba(180,210,255,1)', 0.35 * k);
    if (t < EV.hk_swede + 0.8) for (let q = 0; q < 3; q++) { const ph = clamp((t - EV.hk_swede) / 0.8 + q * 0.1); pencil(ellPts(560, 760, 80 + ph * 400, 40 + ph * 200, 0, 0, 40), { w: 4, col: '#e8f0ff', a: 0.6 * (1 - ph), pass2: false }); }
  }
  function river(t) {
    neva(910, 1340, t, { top: '#7a8aaa', bot: '#3a5272', lineCol: '#f2d8d0' });
    ctx.save(); ctx.globalAlpha = 0.25; ctx.translate(0, 1820); ctx.scale(1, -1); smolny(1010, 910, 0.55, t); ctx.restore();
    const bx = ((t * 60) % 1700) - 300; push(bx, 1120, 0.6); shape([[-120, 0], [130, 0], [150, -30], [-130, -30]], { wash: '#f2ece0', washA: 1, w: 2, col: '#2a2a2a' }); rect(-80, -70, 160, 40, { wash: '#2a6a8a', washA: 1, w: 1.6, col: '#1a1a1a' }); for (let k = 0; k < 5; k++) rect(-70 + k * 30, -62, 20, 18, { wash: '#bfe0f0', washA: 1, w: 1, col: '#1a1a1a' }); pop();
  }
  function gulls(t) { for (let i = 0; i < 5; i++) { const x = ((i * 280 + t * (60 + i * 15)) % 1500) - 200, y = 300 + i * 90 + Math.sin(t * 2 + i) * 30, f = Math.sin(t * 8 + i) * 14; pencil([[x - 30, y + f], [x - 8, y - 6], [x, y], [x + 8, y - 6], [x + 30, y + f]], { w: 3.4, col: '#f6f6f2' }); pencil([[x - 30, y + f], [x - 8, y - 6], [x, y], [x + 8, y - 6], [x + 30, y + f]], { w: 1.4, col: '#3a3a3a', a: 0.7, pass2: false }); } }
  function quay(t) {                                                   // ближняя набережная, туристы
    embank(1340, t);
    const g = shape([[-400, 1410], [1480, 1410], [1480, 2400], [-400, 2400]], { wash: '#9a9088', washA: 1, w: 1, col: '#000', a: 0.2 });
    ctx.save(); ctx.clip(g.path); for (let k = -10; k <= 10; k++) pencil([[540 + k * 80, 1410], [540 + k * 300, 2400]], { w: 1.6, col: '#6a625a', a: 0.4, pass2: false, gap: false }); for (let y = 1430, d = 20; y < 2400; y += d, d *= 1.3) pencil([[-400, y], [1480, y]], { w: 1.6, col: '#6a625a', a: 0.4, pass2: false, gap: false }); ctx.restore();
    const sh = t > EV.hk_swede + 0.2;
    human(-20, 1440, 0.9, t, { body: '#c83a3a', legs: '#2a2a3a', hair: '#5a3a1a', face: sh ? 'shock' : 'smile', armR: sh ? 'point' : 'hold', prop: sh ? undefined : 'phone', look: 0.6, seed: 201 });
    human(960, 1450, 0.95, t, { body: '#3a5a8a', legs: '#2a2a2a', hair: '#1a1410', hat: 'cap', hatCol: '#e8e0d0', face: sh ? 'shock' : 'calm', armR: sh ? 'up' : 'hold', prop: sh ? undefined : 'phone', look: -0.6, seed: 202, flip: -1 });
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => { far(t); ghostFort(t); });
    lay(5, () => { smolny(1010, 910, 0.55, t); river(t); });
    lay(3, () => gulls(t));
    lay(1, () => { quay(t); cat(); });
    lay(0.65, () => { for (const sx of [-260, 1340]) { pencil([[sx, 2000], [sx, 1100]], { w: 22, col: '#1a1a1e' }); for (const sd of [-1, 1]) ell(sx + sd * 70, 1080, 26, 34, { wash: '#f6f2e6', washA: 1, w: 2, col: '#1a1a1e' }); } });
  };
  DIR.hook = {
    outfit: 'hoodieP', light: { side: -1, rim: '#ffe0d0' }, grade: ['#c08aa0', 0.12],
    act: () => [[0, 'shock'], [EV.hk_400, 'awe'], [EV.hk_peter - 0.03, 'sideeye'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1460, s: 1.08, look: t < LS('h2') ? [0.1, -0.5] : [0.1, 0], tilt: t < 0.4 ? -0.08 : 0, squash: b.squash + (t < 0.2 ? 0.06 : 0),
      point: t > 0.2 && t < EV.hk_peter ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > 0.2 && t < EV.hk_peter ? [150, -340] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 560, 1000, 0.06], [EV.hk_400, 560, 1040, 0.1], [LS('h2'), 580, 1100, 0.16], [S1.hook, 620, 1060, 0.26]],
    hud: t => {
      if (t > EV.hk_400 && t < LS('h2') + 0.6) { const k = popK(t, EV.hk_400, 0.35); push(540, 1770, 0.7 + 0.3 * k); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-420, -70, 840, 140); ctx.restore();
        txt('1300', -300, -4, 70, { font: 'Osw', col: '#8ac0ff', a: k }); txt('1703', 300, -4, 70, { font: 'Osw', col: '#e8a33c', a: k }); pencil([[-200, 0], [200, 0]], { w: 5, col: '#f6e7c8', a: k, pass2: false }); txt('403 года', 0, -30, 40, { font: 'Osw', col: '#f6e7c8', a: k }); pop(); }
      if (t > EV.hk_peter && t < LS('h2') + 0.6) { const k = popK(t, EV.hk_peter, 0.35); push(900, 820, k, 0.06); ell(0, 0, 90, 110, { wash: '#f2e6c8', washA: 1, w: 5, col: '#c8a040' }); human(0, 150, 0.62, t, { body: '#2a5a3a', hair: '#2a1a10', face: 'angry', seed: 210 }); pencil([[-12, -52], [0, -46], [12, -52]], { w: 3, col: '#1a1410', pass2: false }); txt('?', 70, -80, 90, { font: 'Osw', col: '#d8342a' }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В туннель: золотой шпиль-стрелка раскручивает портал
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 980, q = sm(k);
    drawBuf(A, 1 + q * 0.3, cx, cy, 1, null, 0, 0, q * 0.6);
    const R = Math.pow(sm((k - 0.25) / 0.75), 1.4) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.5 - k)); }
    scr(() => { push(cx, cy, 1, -Math.PI / 2 + q * 7); const sp = shape([[-14, 0], [14, 0], [3, -700], [-3, -700]], { wash: '#e2b84a', washA: 1, w: 2, col: '#6a4a08' }); metalG(sp.path, 0, -300, 400, '#fff2b0', '#e2b84a', '#7a5414'); pop(); glow(cx, cy, 120, 'rgba(255,230,170,1)', 0.8); });
  } };
})();
