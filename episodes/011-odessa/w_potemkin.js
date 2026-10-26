/* 011 — сцена `potemkin`: июнь 1905 → съёмки 1925. Сначала порт: на рейде броненосец «Потёмкин» дымит тремя трубами, на причале
   толпа смотрит. На «бойню» — кадр превращается в съёмочную площадку на лестнице: перфорация плёнки, сепия, рельсы с кинокамерой,
   режиссёр с рупором, массовка в костюмах ждёт команды и пьёт чай, детская коляска медленно катится вниз — никакого насилия. На
   «Эйзенштейн» — хлопушка «БРОНЕНОСЕЦ ПОТЁМКИН · 1925 · дубль 7». Том в кожанке и кепке. Переход В сцену — дым из трубы заволакивает кадр. */
(() => {
  EV.po_was = wtk('s5', 'был.');
  EV.po_film = wtk('s5', 'бойню');
  EV.po_eis = wtk('s5', 'Эйзенштейн');
  KEYW.push('«Потёмкин»', 'Эйзенштейн.');
  const film = t => sm((t - EV.po_film + 0.1) / 0.4);

  function harbor(t) {                                                 // 1905: море, броненосец, город на обрыве
    vgrad(-900, 900, ['#7a8aa0', '#b8c4cc', '#e8e0d0'], 1);
    vgrad(820, 1260, ['#4a6a7a', '#22404e'], 1); for (let k = 0; k < 14; k++) pencil([[-400, 840 + k * 28], [1480, 846 + k * 28]], { w: 1.2, col: '#d8e0e4', a: 0.3, pass2: false });
    battleship(760, 1020, 0.62, t, { smoke: 1 }); if (t > EV.po_was && t < EV.po_was + 0.3) glow(1000, 940, 200, 'rgba(255,230,170,1)', 0.7);
    rect(-500, 1250, 2100, 70, { wash: OD.stoneD, washA: 1, w: 2, col: '#2a1a08' });
    crowd(-200, 1400, 1250, 26, t, 11700, { s: 0.85, cols: ['#2a2a2e', '#4a3a2a', '#e8e0cc', '#3a3a4a', '#5a4a3a'] });
  }
  function filmSet(t) {                                                // 1925: лестница-съёмочная площадка
    const f = film(t); if (f <= 0) return;
    push(0, (1 - f) * 600, 1);
    const st = shape([[540 - 200, 600], [540 + 200, 600], [540 + 800, 1480], [540 - 800, 1480]], { wash: '#e0d4b8', washA: 1, w: 2, col: '#6a5a3a' });
    for (let k = 0; k < 40; k++) { const fr = k / 40, y = 600 + fr * 880, w = lerp(200, 800, fr); pencil([[540 - w, y], [540 + w, y]], { w: 1 + fr * 2, col: '#7a6a4a', a: 0.6, pass2: false, gap: false }); }
    duke(540, 600, 0.5, t);
    for (let i = 0; i < 6; i++) { const x = 300 + i * 90, y = 860 + (i % 2) * 40; human(x, y, 0.4, t, { body: '#e8e4dc', legs: '#2a2a2e', hair: '#2a1a10', hat: 'cap', hatCol: '#e8e4dc', face: 'calm', armR: i % 2 ? 'hold' : 'up', seed: 1190 + i }); if (i % 2 === 0) { rect(x + 14, y - 136, 14, 16, { wash: '#f2ece0', washA: 1, w: 1, col: '#3a3a3a' }); } }
    const py = 900 + ((t - EV.po_film) * 70) % 400; push(820, py, 0.6); blob([[-60, -40], [60, -40], [70, 10], [-70, 10]], { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); blob([[-60, -40], [-50, -90], [10, -96], [20, -40]], { wash: '#3a3a3e', washA: 1, w: 2, col: '#000' }); for (const wx of [-44, 44]) ell(wx, 22, 22, 22, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' }); pop();
    for (const lx of [100, 980]) { pencil([[lx, 1480], [lx, 1180]], { w: 8, col: '#1a1a1e' }); push(lx, 1170, 1, lx < 540 ? -0.6 : 0.6); rect(-40, -30, 80, 60, { wash: '#2a2a30', washA: 1, w: 2, col: '#000' }); pop(); glow(lx, 1170, 70, 'rgba(255,250,230,1)', 0.8); rays(lx, 1170, lx < 540 ? -1.0 : -2.1, 0.22, 900, 'rgba(255,248,220,0.6)', 0.22, 2, t); }
    pop();
  }
  function crew(t) {                                                   // рельсы, кинокамера, режиссёр с рупором
    const f = film(t); if (f <= 0) return; push(0, (1 - f) * 600, 1);
    for (const y of [1470, 1500]) pencil([[580, y], [1300, y]], { w: 5, col: '#5a5a5e', pass2: false });
    const cx = 760 + Math.sin(t * 0.8) * 30; rect(cx - 60, 1380, 140, 90, { wash: '#3a3a3e', washA: 1, w: 2, col: '#000' }); for (const wx of [cx - 40, cx + 60]) ell(wx, 1480, 18, 18, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' });
    push(cx + 10, 1330, 1); rect(-60, -40, 120, 70, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); for (const rx of [-34, 34]) { ell(rx, -70, 32, 32, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); pencil([[rx, -70], [rx + Math.cos(t * 9) * 28, -70 + Math.sin(t * 9) * 28]], { w: 3, col: '#8a8a8a', pass2: false }); } rect(60, -16, 36, 26, { wash: '#4a4a4e', washA: 1, w: 2, col: '#000' }); pop();
    human(940, 1490, 0.92, t, { body: '#e8e0cc', legs: '#3a3a40', hair: '#2a1a10', face: t > EV.po_eis ? 'grin' : 'angry', armR: 'up', armL: 'point', seed: 1197, flip: -1 });
    push(940 - 66 * 0.92, 1490 - 320 * 0.92, 1, -0.4 + Math.PI); poly([[0, -14], [70, -34], [70, 34], [0, 14]], { wash: '#d8d0b8', washA: 1, w: 2, col: '#2a2a2a' }); pop();
    pop();
  }

  WORLD.potemkin = (t, u, cat) => {
    const f = film(t);
    if (f < 1) lay(6, () => harbor(t));
    if (f > 0) lay(6, () => { ctx.save(); ctx.globalAlpha = f; vgrad(-900, 1600, ['#c8b89a', '#e8dcc0'], 1); ctx.restore(); filmSet(t); });
    lay(1, () => { const g = shape([[-500, 1490], [1600, 1490], [1600, 2400], [-500, 2400]], { wash: f > 0.5 ? '#b8aa94' : '#9a8a72', washA: 1, w: 2, col: '#3a2a14', a: 0.4 }); crew(t); cat(); });
    lay(0.65, () => { if (f > 0) haze('#8a6a40', 0.22 * f); });
  };
  DIR.potemkin = {
    outfit: 'komissar', light: { side: 1, rim: '#ffe8c0' }, grade: ['#8a8a8a', 0.1],
    act: () => [[S0.potemkin, 'proud'], [EV.po_film, 'sideeye'], [EV.po_eis - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1490, s: 1.04, look: t < EV.po_film ? [0.6, -0.3] : [0.6, -0.1], hand: t > EV.po_eis ? [60, -250] : [110, -270], handF: t > EV.po_eis ? [-60, -250] : undefined, nod: t > EV.po_eis ? Math.sin(t * 14) * 0.04 : 0 }),
    cam: () => [[S0.potemkin, 600, 1000, 0.08], [EV.po_was, 640, 1000, 0.12], [EV.po_film, 560, 1000, 0.02, 'x'], [EV.po_eis, 600, 1040, 0.08], [S1.potemkin, 600, 1040, 0.12]],
    hud: t => { const f = film(t); if (f > 0) { ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, 70, H); ctx.fillRect(W - 70, 0, 70, H); ctx.fillStyle = '#e8dcc0'; const off = (t * 300) % 90; for (let y = -90 + off; y < H; y += 90) { ctx.fillRect(18, y, 34, 50); ctx.fillRect(W - 52, y, 34, 50); } ctx.restore(); }
      if (t > EV.po_eis) { const k = popK(t, EV.po_eis, 0.35); push(560, 700, k, 0.05); rect(-230, -70, 460, 160, { wash: '#1a1a1a', washA: 1, w: 3, col: '#000' }); for (let q = 0; q < 8; q++) poly([[-230 + q * 58, -70], [-196 + q * 58, -70], [-216 + q * 58, -110], [-250 + q * 58, -110]], { wash: q % 2 ? '#f2ece0' : '#1a1a1a', washA: 1, w: 1, col: '#000' });
        txt('«БРОНЕНОСЕЦ ПОТЁМКИН»', 0, -26, 34, { font: 'Osw', col: '#f2ece0' }); txt('1925 · реж. ЭЙЗЕНШТЕЙН · дубль 7', 0, 30, 28, { font: 'Osw', col: '#e8a33c' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В potemkin: дым из трубы заволакивает кадр
  TRANS_IN.potemkin = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.1); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(11720); for (let i = 0; i < 34; i++) { const x = W * 0.8 - r() * W * 1.4 * sm(k * 1.3), y = r() * H; ell(x, y, 200 + r() * 200, 120 + r() * 120, { wash: ['#3a3a3e', '#5a5a5e', '#2a2a2e'][i % 3], washA: 0.9 * f, line: false }); } ctx.save(); ctx.globalAlpha = 0.7 * f; ctx.fillStyle = '#2a2a2e'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
