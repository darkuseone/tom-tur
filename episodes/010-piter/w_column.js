/* 010 — сцена `column`: 30 августа 1832, Дворцовая площадь. Бирюзовый Зимний дворец, толпа зрителей, высокие деревянные леса;
   солдаты крутят кабестаны, канаты натягиваются, розовый гранитный ствол поднимается с наклонного помоста в вертикаль. Монферран
   с чертежом. На «шестьсот» — бирка «600 т», на «Ничем» — разрез основания «0 болтов», Том тыкает колонну лапой, она чуть качается —
   Том пугается. Переход В сцену — гранитный ствол вырастает снизу через кадр, внутри — новая эпоха. */
(() => {
  EV.cl_600 = wtk('s6', 'шестьсот');
  EV.cl_none = wtk('s6', 'Ничем');
  KEYW.push('тонн.', 'закреплена!');
  SHAKES.push([EV.cl_600 - 0.15, 0.3, 7]);
  const raise = t => sm((t - S0.column + 0.1) / (EV.cl_600 - S0.column + 0.2));
  const CX = 720, CB = 1150, CH = 900;                                 // основание и высота ствола

  function sky(t) { vgrad(-900, 1100, ['#6a9ad0', '#a8c8e4', '#f2e2c8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 460 + t * 18) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 54, 120 + i * 80 + Math.sin(k) * 10, 74, 28, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (let i = 0; i < 5; i++) { const x = ((i * 300 + t * 50) % 1500) - 200, y = 360 + i * 60, f = Math.sin(t * 8 + i) * 8; pencil([[x - 16, y + f], [x, y], [x + 16, y + f]], { w: 2.4, col: '#2a2a2a', pass2: false }); } }
  function palace(t) {
    winterPalace(-360, 1080, 1800, 300, t, {});
    crowd(-300, 1400, 1110, 46, t, 10200, { s: 0.75, cols: ['#2a2a36', '#5a3a2a', '#1e3a2a', '#e8e0cc', '#3a2a3a'], skin: '#d8a888' });
  }
  function scaffold(t) {                                               // деревянные леса вокруг места колонны
    const x0 = CX - 150, x1 = CX + 150, y0 = 180;
    for (const x of [x0, x0 + 60, x1 - 60, x1]) pencil([[x, CB + 90], [x, y0]], { w: 10, col: '#9a7444' });
    for (let y = y0; y < CB + 80; y += 110) { pencil([[x0 - 10, y], [x1 + 10, y]], { w: 7, col: '#8a6a3a' }); pencil([[x0, y], [x0 + 60, y + 110]], { w: 4, col: '#7a5a2a', a: 0.8, pass2: false }); pencil([[x1, y], [x1 - 60, y + 110]], { w: 4, col: '#7a5a2a', a: 0.8, pass2: false }); }
    rect(x0 - 30, y0 - 30, x1 - x0 + 60, 30, { wash: '#7a5a2a', washA: 1, w: 2, col: '#2a1a08' });
    for (const bx of [x0 + 20, x1 - 20]) { ell(bx, y0 - 10, 24, 24, { wash: '#5a4020', washA: 1, w: 2, col: '#1a0a04' }); }
  }
  function shaft(t) {                                                  // гранитный ствол: поднимается, потом чуть качается от лапы Тома
    const r = raise(t), poke = t > EV.cl_none + 0.25 ? Math.sin((t - EV.cl_none) * 14) * 0.012 * Math.max(0, 1 - (t - EV.cl_none - 0.25) / 1.2) : 0;
    const a = 1.3 * (1 - r) + poke;
    // наклонный помост
    if (r < 0.95) { const ramp = poly([[CX, CB], [CX + 900, CB + 60], [CX + 900, CB + 110], [CX, CB + 60]], { wash: '#8a6a3a', washA: 1 - r, w: 2, col: '#2a1a08' }); }
    push(CX, CB, 1, a);
    const sh = shape([[-40, 0], [-34, -CH], [34, -CH], [40, 0]], { wash: '#c88a7a', washA: 1, w: 2.4, col: '#3a1a14' }); shadeG(sh.path, 40, 0, -40, 0, '#7a3a30', 0.45); hatch(sh.path, sh.bb, { gap: 7, a: 0.12, col: '#5a2a20', ang: 1.5, w: 1 });
    for (let q = 0; q < 14; q++) { const y = -60 - q * 60; ell(-10 + (q % 3) * 12, y, 3, 2, { wash: '#f2d8d0', washA: 0.7, line: false }); }
    rect(-56, -CH - 30, 112, 34, { wash: '#a86a5a', washA: 1, w: 2, col: '#3a1a14' }); rect(-48, -CH - 50, 96, 22, { wash: '#a86a5a', washA: 1, w: 2, col: '#3a1a14' });
    pop();
    // канаты: от верха лесов к верху ствола и к кабестанам
    const top = [CX + Math.sin(a) * CH, CB - Math.cos(a) * CH]; for (const bx of [CX - 130, CX + 130]) pencil([[bx, 170], top], { w: 3.4, col: '#5a4a2a', a: 0.9, pass2: false });
    for (const [gx, gy] of [[60, 1290], [-200, 1260], [1080, 1300], [1300, 1260]]) pencil([[gx < CX ? CX - 150 : CX + 150, 160], [gx, gy - 60]], { w: 3, col: '#5a4a2a', a: 0.8, pass2: false });
    // пьедестал
    const pd = rect(CX - 100, CB - 10, 200, 110, { wash: '#8a4a42', washA: 1, w: 2.4, col: '#2a0a08' }); shadeG(pd.path, CX + 100, 0, CX - 100, 0, '#4a1a14', 0.4);
  }
  function capstan(x, y, s, t, k) {                                    // ворот: барабан, вращающиеся рычаги, солдаты толкают
    const ph = t * 1.4 * (1 - raise(t) * 0.9) + k;
    push(x, y, s); ell(0, -10, 50, 22, { wash: '#6a4a24', washA: 1, w: 2, col: '#1a0a04' }); rect(-30, -90, 60, 80, { wash: '#7a5a2a', washA: 1, w: 2, col: '#1a0a04' });
    for (let q = 0; q < 4; q++) { const an = ph + q * Math.PI / 2, ex = Math.cos(an) * 190, ey = -60 + Math.sin(an) * 50; pencil([[0, -60], [ex, ey]], { w: 8, col: '#8a6a3a' });
      if (Math.sin(an) > -0.2) human(ex, ey + 70, 0.62, t, { body: '#1e3a2a', legs: '#e8e4dc', boots: '#141010', hair: '#2a1a10', hat: 'cap', hatCol: '#141414', belt: '#e8e4dc', face: 'angry', armR: 'point', armL: 'point', seed: 700 + q + k * 4, flip: Math.cos(an) > 0 ? -1 : 1 }); }
    pop();
  }
  function montferrand(t) {                                            // архитектор с чертежом
    const sh = t > S0.column + 0.3 && t < EV.cl_600; human(940, 1480, 0.98, t, { body: '#1a1a22', legs: '#3a3a40', boots: '#0a0a0a', hair: '#4a3020', beard: 'short', hat: 'merchant', hatCol: '#141414', face: sh ? 'shock' : 'smile', armR: 'up', armL: 'hold', prop: 'scroll', seed: 720, flip: -1, look: -0.4 });
  }

  WORLD.column = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => palace(t));
    lay(5, () => { scaffold(t); shaft(t); });
    lay(3, () => { capstan(60, 1330, 0.8, t, 0); capstan(1100, 1340, 0.8, t, 2); });
    lay(1, () => { const g = shape([[-400, 1420], [1480, 1430], [1480, 2400], [-400, 2400]], { wash: '#b8aa92', washA: 1, w: 2, col: '#2a2010', a: 0.4 });
      ctx.save(); ctx.clip(g.path); for (let y = 1440, d = 26; y < 2400; y += d, d *= 1.2) pencil([[-400, y], [1480, y]], { w: 1.6, col: '#7a6a52', a: 0.4, pass2: false, gap: false }); ctx.restore();
      montferrand(t); cat(); });
    lay(0.7, () => { const r = rng(10210); for (let i = 0; i < 6; i++) { const ph = (t * 0.25 + i / 6) % 1; ell(-200 + i * 280, 1960 - ph * 200, 180, 60, { wash: '#d8c8a8', washA: 0.3 * (1 - ph), line: false }); } });
  };
  DIR.column = {
    outfit: 'architect', light: { side: 1, rim: '#fff0d0' }, grade: ['#d0a070', 0.08],
    act: () => [[S0.column, 'awe'], [EV.cl_600 - 0.03, 'proud'], [EV.cl_none, 'smug'], [EV.cl_none + 0.7, 'scared']],
    pose: (t, u, b) => { const pk = t > EV.cl_none - 0.1 && t < EV.cl_none + 0.7;
      return Object.assign(b, { x: 300, y: 1470, s: 1.04, look: t < EV.cl_600 ? [0.5, -0.6] : [0.6, -0.2], point: pk ? 1 : undefined, hand: pk ? [190, -300] : t > EV.cl_none + 0.7 ? [80, -420] : undefined, handF: t > EV.cl_none + 0.7 ? [-80, -420] : undefined, squash: b.squash + (t > EV.cl_none + 0.7 && t < EV.cl_none + 0.85 ? 0.06 : 0) }); },
    cam: () => [[S0.column, 600, 1000, 0.1], [EV.cl_600 - 0.3, 640, 820, -0.02], [EV.cl_none, 560, 1080, 0.1], [S1.column, 560, 1100, 0.16]],
    hud: t => {
      if (t > EV.cl_600 && t < EV.cl_none + 0.2) { const k = popK(t, EV.cl_600, 0.35); push(300, 600, k, -0.08); pencil([[0, -150], [0, -80]], { w: 4, col: '#5a4a2a', pass2: false }); const tg = shape([[-130, -80], [130, -80], [150, 60], [-150, 60]], { wash: '#f2e6c4', washA: 1, w: 4, col: '#5a3a1a' }); ell(0, -60, 10, 10, { wash: '#5a3a1a', washA: 1, line: false });
        txt('600 т', 0, -6, 96, { font: 'Osw', col: '#8a2a1a' }); pop(); }
      if (t > EV.cl_none) { const k = popK(t, EV.cl_none, 0.35), cx = 830, cy = 820, R = 180 * k;   // разрез основания
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = '#efe4cc'; ctx.fill(); ctx.clip();
        rect(cx - 220, cy + 10, 440, 200, { wash: '#8a4a42', washA: 1, w: 3, col: '#2a0a08' }); rect(cx - 70, cy - 220, 140, 226, { wash: '#c88a7a', washA: 1, w: 3, col: '#3a1a14' });
        pencil([[cx - 90, cy + 8], [cx + 90, cy + 8]], { w: 3, col: '#1a0a08', pass2: false }); for (const sx of [-1, 1]) pencil([[cx + sx * 120, cy - 60], [cx + sx * 80, cy - 4]], { w: 4, col: '#c8201e', pass2: false });
        txt('0 болтов', cx, cy + 100, 52, { font: 'Osw', col: '#fff2d8' }); ctx.restore();
        pencil(ellPts(cx, cy, R, R, 0, 0, 60), { w: 8, col: '#d6a842', a: k, pass2: false });
        if (t > EV.cl_none + 0.3) note('стоит своим весом', 760, 1800, t, EV.cl_none + 0.3, S1.column, '#2a1a10', 40, -0.03); }
    }
  };

  // ---------------------------------------------------------------- переход В column: гранитный ствол вырастает снизу через кадр
  TRANS_IN.column = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const top = lerp(H + 40, -200, sm(clamp(k / 0.55))), w = lerp(150, W * 1.3, Math.pow(sm(clamp((k - 0.4) / 0.6)), 1.3));
    drawBuf(A, 1 + 0.05 * k);
    const P = new Path2D(); P.rect(540 - w / 2, top, w, H - top + 20);
    inPath(P, () => drawBuf(B, 1.12 - 0.12 * sm(k)));
    scr(() => { for (const sx of [-1, 1]) { const x = 540 + sx * w / 2; pencil([[x, top], [x, H]], { w: 26, col: '#c88a7a', pass2: false }); pencil([[x + sx * 10, top], [x + sx * 10, H]], { w: 6, col: '#5a2a20', pass2: false }); }
      if (k < 0.6) { rect(540 - w / 2 - 30, top - 40, w + 60, 46, { wash: '#a86a5a', washA: 1, w: 3, col: '#3a1a14' }); } });
  } };
})();
