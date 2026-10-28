/* 004 — сцена `wall`: 1396, зима (первый этап стройки — январь–февраль). Стена ползёт по хребту Пугаксана таймлапсом,
   счётчик «ДЕНЬ 1 → 98», сотни рабочих-точек с камнями, ворота в лесах. На переднем плане — кусок стены из гранитных блоков с зубцами,
   каменщик тешет блок, подъёмник с корзиной. На «именами» на блоке загорается высеченная надпись (участок, округ, мастер), Том-надсмотрщик
   тычет в неё кистью. Переход В сцену — гранитные блоки закладывают кадр и осыпаются. */
(() => {
  EV.wall_18 = wtk('s3', 'Восемнадцать');
  EV.wall_98 = wtk('s3', 'девяносто');
  EV.wall_names = wtk('s3', 'именами');
  KEYW.push('дней.', 'прорабов!');
  SHAKES.push([EV.wall_names, 0.2, 5]);
  const grow = t => sm((t - EV.wall_18 + 0.2) / (EV.wall_98 - EV.wall_18 + 1.0));
  const day = t => Math.max(1, Math.min(98, Math.round(1 + 97 * grow(t))));
  const PATH = spline([[-300, 1300], [60, 1200], [330, 1080], [520, 900], [620, 760], [700, 690], [800, 740], [940, 820], [1100, 760], [1300, 800], [1600, 760]], false, 12);

  function sky(t) { vgrad(-900, 1000, ['#7a9ac0', '#b8cadc', '#ece6dc'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 520 + t * 10) % 1900) - 400; for (let k = 0; k < 6; k++) ell(x + k * 50, 120 + i * 90 + Math.sin(k) * 12, 70, 30, { wash: '#f6f4f0', washA: 0.85, line: false }); } }
  function ridge(t) {                                                  // хребет со снегом + стена по гребню (растёт)
    push(130, 0, 1); bugak(1000, 1.25, { far: '#b4c0d0', mid: '#8a9488', near: '#7a8670', rock: '#ece8e0' }); pop();
    const r = rng(9500); for (let i = 0; i < 40; i++) { const x = 100 + r() * 1000, y = 700 + r() * 300; ell(x, y, 20 + r() * 40, 6 + r() * 6, { wash: '#f6f6f2', washA: 0.8, line: false }); }
    const n = Math.max(2, Math.floor(PATH.length * grow(t)));
    const P = PATH.slice(0, n);
    shape(tubeP(P, 60, 26), { wash: '#e2dccc', washA: 1, w: 3, col: '#2a2620', a: 0.9 }); pencil(edgeOff(P, 14), { w: 3, col: '#8a8478', a: 0.7, pass2: false });
    for (let i = 0; i < P.length - 1; i += 2) { const [x, y] = P[i], w = lerp(26, 12, i / PATH.length); rect(x - w * 0.4, y - 26 - w * 0.6, w * 0.8, w * 0.8, { wash: '#c8c2b4', washA: 1, w: 1, col: '#3a362e', a: 0.6 }); }
    if (n < PATH.length) { const [x, y] = P[P.length - 1]; glow(x, y, 80, 'rgba(255,240,200,1)', 0.6); for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + t * 2; ell(x + Math.cos(a) * 30, y + Math.sin(a) * 14, 2.6, 2.6, { wash: '#2a2420', washA: 1, line: false }); } }
    // муравьи-рабочие вдоль готовой стены
    for (let k = 0; k < 60; k++) { const f = ((k * 0.137 + t * 0.06) % 1) * (n / PATH.length), i = Math.min(PATH.length - 1, Math.floor(f * PATH.length)), [x, y] = PATH[i]; ell(x + Math.sin(k * 7) * 30, y + 26 + Math.cos(k * 3) * 10, 3, 4, { wash: k % 3 ? '#e8e0cc' : '#1f2c4e', washA: 1, line: false }); }
    // ворота в лесах вдали (на седловине)
    push(980, 770, 0.38); rect(-160, -130, 320, 130, { wash: '#c8c2b4', washA: 1, w: 2, col: '#3a362e' }); ell(0, -40, 50, 60, { wash: '#2a2420', washA: 1, w: 1.6, col: '#000' }); koRoof(0, -170, 360, 110, { key: 9501 });
    for (const x of [-180, -90, 0, 90, 180]) pencil([[x, 0], [x, -260]], { w: 4, col: '#8a6a3a', pass2: false }); for (const y of [-80, -170, -250]) pencil([[-190, y], [190, y]], { w: 4, col: '#8a6a3a', pass2: false }); pop();
  }
  function camp(t) {                                                   // средний план: волы с телегой камней, носильщики с рамами-чиге, костёр, флаги отрядов
    for (const [x, c] of [[-120, '#c8302a'], [260, '#2a5aa8'], [760, '#e8b030'], [1150, '#2a8a5a']]) { pencil([[x, 1240], [x, 1040]], { w: 4, col: '#5a3a1a' }); const wv = Math.sin(t * 4 + x) * 8; shape([[x, 1040], [x + 70 + wv, 1050], [x + 64 + wv, 1100], [x, 1094]], { wash: c, washA: 1, w: 1.4, col: '#1a1a1a', a: 0.7 }); }
    push(900, 1240, 0.75); ell(-150, -60, 90, 50, { wash: '#6a4a2a', washA: 1, w: 2, col: '#1a0a04' }); ell(-230, -90, 34, 30, { wash: '#6a4a2a', washA: 1, w: 2, col: '#1a0a04' }); for (const s_ of [-1, 1]) pencil([[-240 + s_ * 16, -116], [-250 + s_ * 34, -140]], { w: 5, col: '#e8e0cc', pass2: false });
    for (const lx of [-200, -120, -170, -90]) pencil([[lx, -30], [lx + Math.sin(t * 5 + lx) * 8, 10]], { w: 12, col: '#5a3a1a' });
    rect(-40, -80, 200, 50, { wash: '#8a6a3a', washA: 1, w: 2, col: '#2a1a0a' }); for (const wx of [0, 130]) ell(wx, -26, 34, 34, { wash: '#6a4a24', washA: 1, w: 2, col: '#2a1a0a' }); for (let k = 0; k < 5; k++) ell(-20 + k * 40, -100, 26, 20, { wash: '#bdb6a6', washA: 1, w: 1.6, col: '#3a362e' }); pop();
    for (let k = 0; k < 4; k++) { const x = 40 + ((t * 40 + k * 160) % 640), y = 1230; human(x, y, 0.5, t, { body: '#e8e0cc', legs: '#d6cdb6', hat: 'topknot', armR: 'hold', armL: 'hold', seed: 60 + k, flip: 1 });
      pencil([[x - 14, y - 60], [x - 20, y - 150]], { w: 4, col: '#7a5a34', pass2: false }); pencil([[x + 4, y - 60], [x - 2, y - 150]], { w: 4, col: '#7a5a34', pass2: false }); ell(x - 12, y - 160, 26, 20, { wash: '#bdb6a6', washA: 1, w: 1.4, col: '#3a362e' }); }
    const fx = 560, fy = 1230; for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; ell(fx + Math.sin(t + k) * 10, fy - 40 - ph * 160, 20 + ph * 30, 16 + ph * 20, { wash: '#d8d4cc', washA: 0.4 * (1 - ph), line: false }); } glow(fx, fy - 10, 70, 'rgba(255,170,80,1)', 0.6 * flick(t, 2)); poly([[fx - 18, fy], [fx + 18, fy], [fx, fy - 40]], { wash: '#ffb040', washA: 0.9, line: false });
  }
  function bigWall(t) {                                                // передний план справа: кусок стены из гранитных блоков
    const x0 = 600, x1 = 1400, top = 980, base = 1480;
    const wp = shape([[x0, base], [x0 + 20, top], [x1, top - 20], [x1, base]], { wash: '#c9c2b2', washA: 1, w: 3, col: '#2a2620', key: 9520 });
    ctx.save(); ctx.clip(wp.path); const r = rng(9521);
    for (let y = base, row = 0; y > top - 30; row++) { const h = 64 + r() * 20; let x = x0 - 40 + (row % 2) * 40;
      while (x < x1) { const w = 110 + r() * 70, c = ['#cfc8b8', '#bdb6a6', '#d8d2c4', '#b2ab9b'][Math.floor(r() * 4)];
        const st = blob([[x + 6, y - 4], [x + w - 6, y - 6], [x + w - 2, y - h + 8], [x + 8, y - h + 4]], { wash: c, washA: 1, w: 2, col: '#3a362e', a: 0.8 });
        hatch(st.path, st.bb, { gap: 6, a: 0.14, col: '#4a463e', ang: 0.3 + r(), w: 1 }); for (let q = 0; q < 6; q++) ell(x + r() * w, y - r() * h, 3, 2, { wash: '#2a2828', washA: 0.5, line: false });
        x += w; }
      y -= h; }
    ctx.restore();
    for (let x = x0 + 20; x < x1; x += 120) { const cr = rect(x, top - 90, 90, 90, { wash: '#bdb6a6', washA: 1, w: 2.4, col: '#2a2620' }); hatch(cr.path, cr.bb, { gap: 6, a: 0.15, col: '#4a463e', ang: 0.4, w: 1 }); rect(x + 36, top - 60, 18, 26, { wash: '#2a2420', washA: 1, w: 1.4, col: '#000' }); }
    rect(x0 + 10, top - 100, x1 - x0, 14, { wash: '#8a8478', washA: 1, w: 1.6, col: '#2a2620' });
    // высеченная надпись на блоке
    const ix = 760, iy = 1230, gl = clamp((t - EV.wall_names) / 0.4);
    const ip = rect(ix - 80, iy - 110, 160, 210, { wash: '#d8d2c4', washA: 1, w: 2.4, col: '#2a2620', key: 9522 });
    const rr = rng(9523); for (let c = 0; c < 2; c++) for (let rw = 0; rw < 5; rw++) { const cx = ix + 30 - c * 60, cy = iy - 80 + rw * 40; for (let q = 0; q < 4; q++) { const a = rr() * 3.14, L = 8 + rr() * 10; pencil([[cx + (rr() - 0.5) * 14, cy + (rr() - 0.5) * 14], [cx + Math.cos(a) * L, cy + Math.sin(a) * L]], { w: 3, col: gl > 0 ? '#7a3a10' : '#5a544a', a: 0.9, pass2: false }); } }
    if (gl > 0) { glow(ix, iy, 200, 'rgba(255,190,90,1)', 0.55 * gl); pencil([[ix - 84, iy - 114], [ix + 84, iy - 114], [ix + 84, iy + 104], [ix - 84, iy + 104], [ix - 84, iy - 114]], { w: 5, col: '#e8a33c', a: gl, pass2: false }); }
    // каменщик тешет блок на земле
    const hit = Math.sin(t * 9) > 0.6; human(1060, 1520, 0.95, t, { body: '#e8e0cc', legs: '#c6bda6', hat: 'topknot', armR: hit ? 'hold' : 'up', armL: 'hold', face: 'calm', seed: 70, flip: -1, look: -0.4 });
    const bl = rect(860, 1420, 150, 90, { wash: '#cfc8b8', washA: 1, w: 2.2, col: '#2a2620' }); hatch(bl.path, bl.bb, { gap: 6, a: 0.2, col: '#4a463e', ang: 0.5, w: 1 });
    if (hit) { for (let k = 0; k < 6; k++) { const a = -2.4 + k * 0.3; pencil([[1000, 1420], [1000 + Math.cos(a) * 40, 1420 + Math.sin(a) * 40]], { w: 2, col: '#fff2c8', a: 0.9, pass2: false }); } }
    // подъёмник наверху стены: тренога, корзина с камнем на верёвке
    pencil([[1180, top - 100], [1260, top - 360], [1340, top - 100]], { w: 7, col: '#7a5a34' }); const by = top - 140 - Math.abs(Math.sin(t * 1.5)) * 160; pencil([[1260, top - 360], [1260, by]], { w: 2, col: '#3a2a1a', pass2: false }); ell(1260, by + 20, 34, 26, { wash: '#bdb6a6', washA: 1, w: 1.6, col: '#3a362e' });
    human(1120, top - 92, 0.7, t, { body: '#1f2c4e', legs: '#2a2a30', hat: 'jeonrip', armR: 'point', face: 'angry', seed: 71, flip: -1 });
  }
  function snow(t) { motes(60, [-200, -200, 1300, 2000], '#ffffff', t, 9530, { sp: 60, vx: -20, sz: 3.4, a: 0.8, wob: 20 }); }

  WORLD.wall = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => ridge(t));
    lay(3, () => camp(t));
    lay(1.25, () => bigWall(t));
    lay(1, () => { const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#d8d0c0', washA: 1, w: 1, col: '#000', a: 0.2 }); hatch(g.path, g.bb, { gap: 10, a: 0.1, col: '#6a6458', ang: 0.1, w: 1 });
      const r = rng(9540); for (let i = 0; i < 18; i++) ell(-200 + r() * 1400, 1480 + r() * 400, 30 + r() * 50, 12 + r() * 10, { wash: '#f6f6f2', washA: 0.9, w: 1, col: '#9a9aa0', a: 0.3 });
      for (let i = 0; i < 6; i++) { const x = -60 + i * 70, y = 1470 + (i % 2) * 20; ell(x, y, 30, 18, { wash: '#bdb6a6', washA: 1, w: 1.6, col: '#3a362e' }); }
      cat(); });
    lay(0.7, () => snow(t));
  };
  DIR.wall = {
    outfit: 'gunsa', light: { side: 1, rim: '#fff4dc' }, grade: ['#8aa0c0', 0.12],
    act: () => [[S0.wall, 'talk'], [EV.wall_18, 'awe'], [EV.wall_98, 'proud'], [EV.wall_names - 0.04, 'smug'], [EV.wall_names + 0.5, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 340, y: 1470, s: 1.02, look: t < EV.wall_names ? [0.3, -0.5] : [0.7, 0.1], frost: 0.4,
      hand: t > EV.wall_names - 0.1 ? [260, -250] : [90, -330], point: t > EV.wall_names - 0.1 ? 1 : undefined, handF: t < EV.wall_names ? [-70, -200] : undefined }),
    cam: () => [[S0.wall, 600, 860, 0.12], [EV.wall_18, 560, 900, 0.04], [EV.wall_98 + 0.6, 560, 960, 0.06], [EV.wall_names, 600, 1120, 0.14], [S1.wall, 620, 1140, 0.18]],
    hud: t => { if (t > EV.wall_18 - 0.1) { const a = clamp((t - EV.wall_18 + 0.1) / 0.3); push(540, 470, 1); ctx.save(); ctx.globalAlpha = 0.85 * a; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-230, -56, 460, 112); ctx.restore();
        txt('ДЕНЬ ' + day(t), -60, 0, 72, { font: 'Osw', col: '#f6e7c8', a }); txt('18 км', 150, 0, 54, { font: 'Osw', col: '#e8a33c', a }); pop(); }
      if (t > EV.wall_names + 0.2) note('участок · округ · мастер', 770, 1700, t, EV.wall_names + 0.2, S1.wall, '#fff2d8', 44, -0.02); }
  };

  // ---------------------------------------------------------------- переход В wall: гранитные блоки закладывают кадр и осыпаются
  TRANS_IN.wall = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const cols = 6, rows = 11, bw = W / cols, bh = H / rows;
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const r = rng(9550 + j * 13 + i), d = r() * 0.35, kin = clamp((k - d * 0.9) / 0.15), kout = clamp((k - 0.5 - d * 0.8) / 0.2);
      if (kin <= 0 || kout >= 1) continue; const x = i * bw + ((j % 2) ? -bw / 2 : 0), y = j * bh - (1 - sm(kin)) * 300 + kout * kout * 900;
      const st = rect(x + 2, y + 2, bw - 4, bh - 4, { wash: ['#cfc8b8', '#bdb6a6', '#d8d2c4', '#b2ab9b'][(i + j) % 4], washA: 1 - kout * 0.5, w: 3, col: '#2a2620' }); hatch(st.path, st.bb, { gap: 7, a: 0.15, col: '#4a463e', ang: 0.4, w: 1 });
      if (j % 2) { const x2 = x + W; rect(x2 + 2, y + 2, bw - 4, bh - 4, { wash: '#c4bdac', washA: 1 - kout * 0.5, w: 3, col: '#2a2620' }); } } });
  } };
})();
