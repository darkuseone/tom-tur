/* 024 — сцена `bunker`: 1979, убежище готово. Сводчатый бетонный коридор уходит в глубину (одноточечная перспектива, 3 слоя глубины):
   рёбра свода, трубы, кабели, ниши с ящиками и нарами, в торце — гермодверь со штурвалом и красная лампа тревоги.
   Темно; Том дёргает рубильник на стойке — лампы зажигаются цепочкой вглубь; на «десять лет» листается календарь 1969 → 1979.
   На «Война не пришла» красная лампа гаснет, табличка «ТРЕВОГА» перечёркнута. На «открыли» по полу раскатывается красная дорожка,
   ниши становятся дверями с номерами; на «гостиницы» вспыхивает неон «ГОСТИНИЦА 旅馆», звенит звонок на стойке, идут постояльцы с чемоданами,
   Том ловит ключ от номера. Главный свет — гирлянда ламп (потом + розово-нефритовый неон). Переход В сцену — шёлковый занавес. */
(() => {
  EV.bk_switch = S0.bunker + 0.42;
  EV.bk_ten = wtk('s3', 'десять');
  EV.bk_nowar = wtk('s3', 'Война');
  EV.bk_shrug = wtk('s3', 'пришла');
  EV.bk_hotel = wtk('s3', 'открыли');
  EV.bk_neon = wtk('s3', 'гостиницы.');
  KEYW.push('лет.', 'пришла', 'гостиницы.');
  SHAKES.push([EV.bk_switch, 0.15, 6]);
  const L = BJ.ink, VX = 600, VY = 1010, S_ = [0.13, 0.2, 0.3, 0.44, 0.64, 0.92, 1.4, 2.4];
  const R = s => ({ l: VX - 600 * s, r: VX + 600 * s, t: VY - 640 * s, f: VY + 600 * s, s });
  const lit = t => clamp((t - EV.bk_switch) / 0.9), hot = t => sm((t - EV.bk_hotel) / 0.7), neo = t => t > EV.bk_neon ? (t - EV.bk_neon < 0.35 ? (Math.sin(t * 60) > 0 ? 1 : 0.2) : 1) : 0;
  function archP(q, ex = 0) { const w = q.r - q.l; return [[q.l - ex, q.f + ex], [q.l - ex, q.t + w * 0.3], ...spline([[q.l - ex, q.t + w * 0.3], [q.l + w * 0.14, q.t + w * 0.06 - ex], [VX, q.t - ex], [q.r - w * 0.14, q.t + w * 0.06 - ex], [q.r + ex, q.t + w * 0.3]], false, 14), [q.r + ex, q.f + ex]]; }
  function segs(t, i0, i1) {                                        // кусок коридора между кольцами i0..i1 (дальнее → ближнее)
    const k = lit(t), h = hot(t), a = R(S_[i0]), b = R(S_[i1]), wall = lerpC(lerpC('#15130f', '#6e6452', k), '#8a5a48', h * 0.6), dk = lerpC('#0a0908', '#3a342a', k);
    shape([...archP(b, 60), ...archP(R(S_[i0] * 0.93)).reverse()], { wash: wall, washA: 1, line: false });
    shape([[b.l - 60, b.f], [a.l + 4, a.f - 3], [a.r - 4, a.f - 3], [b.r + 60, b.f], [b.r + 60, b.f + 400], [b.l - 60, b.f + 400]], { wash: lerpC('#0e0c0a', '#4a4238', k), washA: 1, line: false });
    for (let i = i0; i < i1; i++) { const p = R(S_[i]), q = R(S_[i + 1]), on = clamp(k * 8 - (7 - i) * 0.9);
      // стены: панель, ниша/дверь
      for (const sd of [-1, 1]) { const px = sd < 0 ? p.l : p.r, qx = sd < 0 ? q.l : q.r, x0 = lerp(px, qx, 0.22), x1 = lerp(px, qx, 0.8), f0 = lerp(p.f, q.f, 0.22), f1 = lerp(p.f, q.f, 0.8), t0 = f0 - (f0 - VY) * 1.05, t1 = f1 - (f1 - VY) * 1.05;
        pencil([[px, lerp(p.f, p.t, 0.5)], [qx, lerp(q.f, q.t, 0.5)]], { w: 2 + q.s * 3, col: lerpC('#1a1a16', '#4a6a5a', k), a: 0.9, pass2: false });
        shape([[x0, f0], [x0, t0], [x1, t1], [x1, f1]], { wash: lerpC('#080706', lerpC('#2a241c', BJ.jadeD, h), k), washA: 1, w: 1.6 + q.s, col: L });
        if (h < 0.5 && q.s > 0.25) { for (let c = 0; c < 2; c++) { const cx = lerp(x0, x1, 0.3 + c * 0.4), cf = lerp(f0, f1, 0.3 + c * 0.4), cs = q.s * 0.8; rect(cx - 30 * cs, cf - 60 * cs - c * 60 * cs, 60 * cs, 56 * cs, { wash: lerpC('#1a140e', '#8a6a3e', k), washA: 1 - h * 2, w: 1.4, col: L, a: 1 - h * 2 }); } }
        if (h > 0.3 && q.s > 0.25) { const mx = (x0 + x1) / 2, my = (t0 + t1) / 2 + 40 * q.s; rect(mx - 26 * q.s, my, 52 * q.s, 30 * q.s, { wash: BJ.gold, washA: h, w: 1.4, col: L, a: h }); txt(String(10 + i * 2 + (sd > 0 ? 1 : 0)), mx, my + 16 * q.s, 24 * q.s, { col: '#2a1408', font: 'Osw', a: h }); ell(lerp(x0, x1, sd < 0 ? 0.82 : 0.18), lerp(f0, f1, 0.5) - 150 * q.s, 6 * q.s, 6 * q.s, { wash: BJ.goldL, washA: h, line: false }); glow(mx, my - 40 * q.s, 90 * q.s, 'rgba(255,200,120,1)', 0.4 * h); } }
      // пол: стык плит, дорожка
      pencil([[q.l, q.f], [q.r, q.f]], { w: 1.4 + q.s, col: dk, a: 0.8, pass2: false });
      if (h > 0) { const hh = clamp(h * 7 - (6 - i)); if (hh > 0) { const qq = R(lerp(S_[i + 1], S_[i], 1 - hh)); shape([[VX - 250 * p.s, p.f], [VX + 250 * p.s, p.f], [VX + 250 * q.s, q.f], [VX - 250 * q.s, q.f]], { wash: BJ.red, washA: hh, w: 1.6, col: L, a: hh }); for (const sd of [-1, 1]) pencil([[VX + sd * 220 * p.s, p.f], [VX + sd * 220 * q.s, q.f]], { w: 2 + q.s * 3, col: BJ.gold, a: hh, pass2: false }); } }
      // ребро свода, труба, лампа
      pencil(archP(q), { w: 6 + q.s * 16, col: lerpC('#0c0b0a', '#5a5244', k), pass2: false }); pencil(archP(q), { w: 1.6, col: L, a: 0.7, pass2: false });
      pencil([[p.l + 90 * p.s, p.t + 250 * p.s], [q.l + 90 * q.s, q.t + 250 * q.s]], { w: 3 + q.s * 9, col: lerpC('#101414', '#4a6a6a', k), pass2: false }); pencil([[p.r - 70 * p.s, p.t + 210 * p.s], [q.r - 70 * q.s, q.t + 210 * q.s]], { w: 1.5 + q.s * 3, col: '#0a0808', pass2: false });
      pencil([[VX, p.t + 20 * p.s], [VX + Math.sin(i) * 20 * q.s, lerp(p.t, q.t, 0.5) + 80 * q.s], [VX, q.t + 20 * q.s]], { w: 1.4, col: '#0a0808', pass2: false });
      bulb(VX, q.t + 130 * q.s, q.s * 1.5, t, on, i); if (on > 0.1) lightPool(VX, q.f + 10 * q.s, 420 * q.s, 70 * q.s, 'rgba(255,214,140,1)', 0.38 * on);
    }
  }
  function endWall(t) {                                             // торец: гермодверь со штурвалом, лампа тревоги, табличка
    const k = lit(t), q = R(S_[0]), al = t < EV.bk_nowar ? 0.6 + 0.4 * Math.sin(t * 9) : Math.max(0, 1 - (t - EV.bk_nowar) / 0.5);
    rect(q.l - 200, q.t - 200, 560, 560, { wash: lerpC('#0c0b0a', '#3a3a34', k), washA: 1, line: false });
    rect(VX - 46, VY - 52, 92, 130, { wash: lerpC('#14181a', '#5a6a70', k), washA: 1, w: 2, col: L }); ell(VX, VY + 10, 20, 20, { line: true, w: 3, col: lerpC('#2a2a2a', '#c8c0a0', k) }); for (let i = 0; i < 4; i++) pencil([[VX, VY + 10], [VX + Math.cos(i * 1.57 + t * 0.4) * 20, VY + 10 + Math.sin(i * 1.57 + t * 0.4) * 20]], { w: 2, col: lerpC('#2a2a2a', '#c8c0a0', k), pass2: false });
    ell(VX, VY - 70, 9, 8, { wash: al > 0.3 ? '#ff4a30' : '#4a1a16', washA: 1, w: 1.4, col: L }); if (al > 0.05) glow(VX, VY - 70, 150, 'rgba(255,60,40,1)', 0.7 * al);
  }
  function near(t) {                                                // у камеры: стойка с рубильником, календарь, табличка тревоги, стойка администратора, постояльцы
    const k = lit(t), h = hot(t), q = R(1), on = t > EV.bk_switch;
    pencil([[150, 1590], [150, 560]], { w: 26, col: lerpC('#101010', '#4a4e52', k), pass2: false }); pencil([[150, 1590], [150, 560]], { w: 2, col: L, pass2: false }); rect(120, 1560, 60, 30, { wash: '#2a2a2e', washA: 1, w: 2, col: L });
    rect(96, 1150, 110, 170, { wash: lerpC('#1a1c1e', '#6a7074', k), washA: 1, w: 2.6, col: L, shade: { gap: 7, a: 0.3, col: '#0a0a0c', ang: 0.8 } }); for (const [bx, by] of [[108, 1162], [194, 1162], [108, 1308], [194, 1308]]) ell(bx, by, 5, 5, { wash: '#2a2a2e', washA: 1, line: false });
    txt('СВЕТ', 151, 1296, 24, { col: lerpC('#5a5a5a', '#ffe0a0', k), font: 'Osw' }); const la = on ? -0.9 + 1.8 * clamp((t - EV.bk_switch) / 0.12) : -0.9; push(151, 1240, 1, la); pencil([[0, 0], [0, -74]], { w: 9, col: '#c8c0a8', pass2: false }); ell(0, -80, 13, 13, { wash: BJ.red, washA: 1, w: 2, col: L }); pop(); ell(151, 1240, 12, 12, { wash: '#3a3a3e', washA: 1, w: 2, col: L });
    if (on && t < EV.bk_switch + 0.35) { const r = rng(hsh(FRAME, 4)); for (let i = 0; i < 9; i++) { const a = r() * 6.28, d = 20 + r() * 70; pencil([[151 + Math.cos(a) * 14, 1240 + Math.sin(a) * 14], [151 + Math.cos(a) * d, 1240 + Math.sin(a) * d]], { w: 2.4, col: '#fff2b0', pass2: false }); } glow(151, 1240, 150, 'rgba(255,240,170,1)', 0.8); }
    for (let i = 0; i < 3; i++) pencil(spline([[150, 1150 - i * 12], [150 + (i - 1) * 30, 900], [150 - 40 + i * 40, 560]], false, 8), { w: 3, col: '#0a0808', pass2: false });
    // табличка тревоги на левой стене
    push(8, 960, 1, -0.02); rect(-10, -50, 200, 100, { wash: '#e8d8a0', washA: 0.25 + 0.75 * k, w: 2.4, col: L }); txt('ТРЕВОГА', 90, -8, 38, { col: '#a81a10', font: 'Osw', a: 0.3 + 0.7 * k }); hz('警报', 90, 30, 30, '#a81a10', 0.3 + 0.7 * k); if (t > EV.bk_nowar) { const c = clamp((t - EV.bk_nowar) / 0.2); pencil([[0, -40], [lerp(0, 180, c), lerp(-40, 40, c)]], { w: 10, col: '#1a1a1a', pass2: false }); } pop();
    // паутина в углу после «не пришла»
    if (t > EV.bk_shrug) { const c = clamp((t - EV.bk_shrug) / 0.4); for (let i = 0; i < 6; i++) pencil([[1090, 600], [1090 - Math.cos(i * 0.3) * 240 * c, 600 + Math.sin(i * 0.3) * 240 * c]], { w: 1.2, col: '#e8e8e0', a: 0.5, pass2: false }); for (let j = 1; j < 4; j++) pencil(Array.from({ length: 6 }, (_, i) => [1090 - Math.cos(i * 0.3) * 70 * j * c, 600 + Math.sin(i * 0.3) * 70 * j * c]), { w: 1, col: '#e8e8e0', a: 0.45, pass2: false }); }
    // стойка администратора (после «открыли»)
    if (h > 0.05) { const p = popK(t, EV.bk_hotel + 0.15, 0.35); push(960, 1590, p); rect(-150, -200, 300, 200, { wash: BJ.woodD, washA: 1, w: 2.8, col: L, shade: { gap: 8, a: 0.3, col: '#120804', ang: 1.57 } }); rect(-166, -218, 332, 24, { wash: BJ.wood, washA: 1, w: 2.2, col: L }); rect(-120, -170, 240, 110, { line: true, w: 2, col: BJ.gold }); hz('旅馆', 0, -112, 70, BJ.gold, 0.9);
      const dg = t > EV.bk_neon ? Math.sin((t - EV.bk_neon) * 40) * 5 * Math.max(0, 1 - (t - EV.bk_neon) / 0.5) : 0; push(-90, -220, 1, dg * 0.03); blob([[-26, 0], [-20, -24], [0, -32], [20, -24], [26, 0]], { wash: BJ.gold, washA: 1, w: 2, col: L }); ell(0, -36, 5, 5, { wash: BJ.goldL, washA: 1, w: 1, col: L }); pop();
      rect(40, -300, 110, 80, { wash: '#3a2414', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) { pencil([[56 + (i % 4) * 26, -288 + Math.floor(i / 4) * 34], [56 + (i % 4) * 26, -268 + Math.floor(i / 4) * 34]], { w: 3, col: BJ.gold, pass2: false }); }
      pop(); human(1040, 1570, 0.66 * p, t, { body: '#8a1a16', legs: '#2a2a30', hat: 'bun', seed: 2520, flip: -1, look: [-0.6, 0] }); }
    // люди: землекопы уходят вглубь → постояльцы идут навстречу
    const ppl = (x, y, s, c, sd, o = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a3048', seed: sd }, o));
    if (h < 0.6) { const a = 1; ppl(700 - (t - S0.bunker) * 6, R(0.5).f, 0.34, PPL.mao[0], 2521, { hat: 'cap', hatCol: '#3a5f9a', prop: 'stick', armR: 'hold' }); ppl(560, R(0.36).f, 0.24, PPL.mao[1], 2522, { hat: 'cap', hatCol: '#4a6a4a' }); ppl(660, R(0.27).f, 0.17, PPL.mao[3], 2523, { hat: 'straw', hatCol: '#c8b070' }); ppl(820, R(0.7).f, 0.46, PPL.mao[4], 2524, { hat: 'cap', hatCol: '#5a5e66', flip: -1, prop: 'candle', armR: 'hold' }); }
    else { const w = (t - EV.bk_hotel) * 14; [[520, 0.3, PPL.now[0], 'bun'], [680, 0.42, PPL.now[1], 'cap'], [760, 0.26, PPL.now[2], 'straw'], [600, 0.2, PPL.now[4], 'cap'], [830, 0.56, PPL.now[5], 'bun']].forEach(([x, s, c, hat], i) => { const ss = s + w * 0.004, y = R(ss / 0.72).f; ppl(x, y, ss, c, 2530 + i, { hat, hatCol: c, flip: i % 2 ? -1 : 1 }); rect(x + 26 * ss / 0.4, y - 44 * ss / 0.4, 30 * ss / 0.4, 40 * ss / 0.4, { wash: ['#6a3a1a', '#2a4a6a', '#8a1a16'][i % 3], washA: 1, w: 1.6, col: L }); }); }
    castShadow(400, 1575, 190, 380, 0.5, 0.42 * k);
    moodDark(VX, 1050, 300 + 700 * k, 1500, '#040306', 0.85 - 0.5 * k);
  }
  function sign(t) {                                                // неоновая вывеска под сводом
    const n = neo(t); if (t < EV.bk_hotel) return; const p = popK(t, EV.bk_hotel + 0.2, 0.3); push(VX, 760, p);
    pencil([[-150, -90], [-150, -40]], { w: 3, col: L, pass2: false }); pencil([[150, -90], [150, -40]], { w: 3, col: L, pass2: false });
    neon(0, 14, 470, 110, 'ГОСТИНИЦА', '#ff5a8a', t, n, { font: 'Osw' }); if (n > 0.1) { hz('旅 馆', 0, 112, 70, '#7affd0', n); glow(0, 110, 260, 'rgba(110,255,200,1)', 0.35 * n); lightPool(0, 820, 520, 90, 'rgba(255,110,160,1)', 0.3 * n); } pop();
  }
  function front(t) {                                               // рама: тёмный вентиль с трубой слева, ящик и чемодан справа
    sil([[-520, 300], [-260, 300], [-250, 2400], [-520, 2400]], '#050404', 1); pencil([[-250, 1200], [-90, 1200], [-90, 2400]], { w: 46, col: '#0a0908', pass2: false }); ell(-90, 1200, 70, 70, { line: true, w: 16, col: '#0a0908' }); for (let i = 0; i < 4; i++) pencil([[-90, 1200], [-90 + Math.cos(i * 1.57 + 0.4) * 68, 1200 + Math.sin(i * 1.57 + 0.4) * 68]], { w: 10, col: '#0a0908', pass2: false });
    sil([[1240, 2400], [1240, 1900], [1620, 1880], [1620, 2400]], '#070505', 1); sil([[1290, 1900], [1290, 1760], [1500, 1750], [1500, 1890]], '#0c0808', 1);
  }
  function hud(t) {
    if (t > EV.bk_ten - 0.1 && t < EV.bk_hotel) { const q = popK(t, EV.bk_ten - 0.1, 0.3), yr = Math.round(lerp(1969, 1979, sm(clamp((t - EV.bk_ten) / 0.9)))); push(770, 800, q, 0.04); rect(-120, -110, 240, 220, { wash: '#f2e8cc', washA: 0.97, w: 3, col: L }); rect(-120, -110, 240, 56, { wash: '#b8281a', washA: 1, w: 2, col: L }); txt('ГОД', 0, -80, 34, { col: '#fff0d8', font: 'Osw' }); txt(String(yr), 0, 20, 96, { col: '#1a120c', font: 'Osw' }); txt('копают: ' + (yr - 1969) + ' лет', 0, 86, 30, { col: '#5a2a10', font: 'Hand' }); pop(); }
    if (t > EV.bk_nowar && t < EV.bk_hotel + 0.1) { const q = popK(t, EV.bk_nowar, 0.3); push(430, 720, q, -0.05); rect(-190, -40, 380, 80, { wash: '#12100c', washA: 0.9, w: 3, col: '#c8c0a8' }); txt('ВОЙНЫ НЕ БЫЛО', 0, 4, 46, { col: '#e8e0c8', font: 'Osw' }); pop(); }
    if (t > EV.bk_neon && t < EV.bk_neon + 0.6) txt('дзынь!', 900, 1180, 52, { col: '#ffe8b0', font: 'Hand', rot: -0.1, a: 1 - (t - EV.bk_neon) / 0.6 });
  }
  WORLD.bunker = (t, u, cat) => {
    screenFill('#060504', 1);
    lay(30, () => endWall(t));
    lay(14, () => { segs(t, 0, 3); depthFog('#1a1410', 0.12); });
    lay(6, () => segs(t, 2, 5));
    lay(4, () => sign(t));
    lay(2.2, () => segs(t, 4, 6));
    lay(1, () => { segs(t, 5, 7); near(t); cat(); });
    lay(0.62, () => front(t));
    lay(5, () => motes(24, [250, 600, 950, 1300], '#ffe8c0', t, 2540, { sp: 5, sz: 1.8, a: 0.5 * lit(t), wob: 12, add: 1 }));
    lay(0.8, () => motes(12, [-200, 500, 1300, 1900], '#d8c8a8', t, 2541, { sp: 9, sz: 7, a: 0.2, wob: 30 }));
    if (t > EV.bk_switch && t < EV.bk_switch + 0.1) whiteOut(0.35, '255,240,200');
  };
  DIR.bunker = {
    outfit: 'suitK', light: { side: -1, rim: '#ffd890' }, grade: ['#6a4a20', 0.1],
    act: () => [[S0.bunker, 'suspicious'], [EV.bk_switch, 'awe'], [EV.bk_ten, 'talk'], [EV.bk_nowar, 'sideeye'], [EV.bk_shrug, 'smug'], [EV.bk_hotel, 'awe'], [EV.bk_neon, 'grin']],
    pose: (t, u, b) => { const pull = t < EV.bk_switch + 0.3, key = t > EV.bk_neon - 0.1;
      return Object.assign(b, { x: 400, y: 1575, s: 1.02, look: pull ? [-0.8, -0.3] : t < EV.bk_nowar ? [0.5, -0.5] : t < EV.bk_hotel ? [0.2, -0.1] : [0.6, -0.5],
        handF: pull ? [-232, lerp(-390, -300, clamp((t - EV.bk_switch) / 0.12))] : t > EV.bk_shrug && t < EV.bk_hotel ? [-150, -300] : undefined, hand: t > EV.bk_shrug && t < EV.bk_hotel ? [150, -300] : key ? [130, -330] : undefined,
        prop: key ? 'key' : undefined, propAng: Math.sin(t * 10) * 0.3, tilt: t > EV.bk_shrug && t < EV.bk_hotel ? 0.08 : 0, squash: t > EV.bk_switch && t < EV.bk_switch + 0.15 ? 0.1 : b.squash, tailUp: t > EV.bk_hotel }); },
    cam: () => [[S0.bunker, 520, 1040, 0.14], [EV.bk_switch, 500, 1060, 0.2], [EV.bk_switch + 0.4, 600, 1000, 0.02, 'x'], [EV.bk_nowar, 640, 980, 0.1], [EV.bk_hotel, 600, 1000, 0.06], [EV.bk_neon, 640, 940, 0.16, 'x'], [S1.bunker, 660, 960, 0.22]],
    hud
  };
  TRANS_IN.bunker = { a: 0.2, b: 0.3, fx(k, t, A, B) {              // красный шёлковый занавес задёргивается справа и падает вниз, открывая эпоху
    const silk = (x0, y0) => scr(() => { for (let i = 0; i < 12; i++) { const x = x0 + i * 100, wv = Math.sin(t * 8 + i) * 14; const g = ctx.createLinearGradient(x, 0, x + 100, 0); g.addColorStop(0, '#5a0c0a'); g.addColorStop(0.5, '#d8362a'); g.addColorStop(1, '#6a100c'); ctx.fillStyle = g; ctx.fillRect(x + wv, y0, 104, H + 200); } ctx.fillStyle = BJ.gold; ctx.fillRect(x0, y0 + H + 150, 1300, 30); for (let i = 0; i < 6; i++) hz('囍', x0 + 120 + i * 190, y0 + 500 + (i % 2) * 700, 150, BJ.goldD, 0.5); });
    if (k < 0.45) { drawBuf(A); silk(lerp(W + 40, -60, sm(k / 0.45)), -100); } else { drawBuf(B); silk(-60, -100 + Math.pow((k - 0.45) / 0.55, 2) * (H + 400)); }
  } };
})();
