/* 002 — сцена `red`: 1495, итальянцы строят красный Кремль (зубцы «ласточкин хвост», леса, ворот, мастер с чертежом «P. A. SOLARIVS»)
   → «А потом царь…» (1680, указ: выбелить) → гигантский мазок извести по стене. Переход В сцену — разворот чертежа. */
(() => {
  // ---------------------------------------------------------------- события (всё от реплики r1)
  EV.red_slap = LS('r1') + 0.1;                 // «Красный» — Том гордо хлопает по стене
  EV.red_brick = LF('r1', 0.2);                 // «построили» — кладёт кирпич мастерком
  EV.red_ital = WT('r1', 'итальянцы');          // «итальянцы.» — мастер с чертежом, щепотка
  EV.red_tsar = LF('r1', 0.63);                 // «царь» — штамп «1680 · ЦАРСКИЙ УКАЗ», леса исчезают, у башни вырастает шатёр
  EV.red_shock = WT('r1', 'велел') + 0.3;       // «его…» — Том в шоке
  EV.red_poof = LF('r1', 0.835);                // пауза — «пуф», переодевание в маляра
  EV.red_stroke = LF('r1', 0.88);               // «побелить!» — мазок извести слева направо
  const SD = 0.32;                              // длительность мазка
  SHAKES.push([EV.red_slap, 0.2, 7], [EV.red_brick, 0.16, 4], [EV.red_tsar, 0.28, 10], [EV.red_stroke + 0.04, 0.4, 13]);
  KEYW.push('Красный', 'итальянцы.', 'царь', 'побелить!');

  // ---------------------------------------------------------------- геометрия стены (общая для мира и перехода)
  const WY = 790, MT = 640, WB = 1345, X0 = -276, MP = 124, MW = 84;   // площадка боя, верх «рогов», низ стены, шаг зубцов
  const merl = mx => [[mx, WY], [mx, MT + 26], [mx - 6, MT], [mx + MW / 2, MT + 50], [mx + MW + 6, MT], [mx + MW, MT + 26], [mx + MW, WY]];
  const wallPts = (() => { const P = [[-420, WB], [-420, WY]]; for (let i = 0; i < 15; i++) P.push(...merl(X0 + i * MP)); P.push([1520, WY], [1520, WB]); return P; })();
  const wallPath = pathOf(wallPts);
  const BC = ['#9a4632', '#a8523a', '#86402c', '#b3604a', '#7a3826', '#a04a30'];
  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const strokeX = t => lerp(-180, 1300, sm(fade(t, EV.red_stroke, EV.red_stroke + SD)));

  function bricks(x0, y0, x1, y1, ch, bw, seed, cols, a = 0.55) {   // кладка: цвет кирпичей + швы одним путём (дёшево)
    const r = rng(seed); ctx.save();
    for (let y = y0, row = 0; y < y1; y += ch, row++) for (let x = x0 - (row % 2) * bw / 2; x < x1; x += bw) { ctx.globalAlpha = a * (0.4 + 0.6 * r()); ctx.fillStyle = cols[Math.floor(r() * cols.length)]; ctx.fillRect(x + 2, y + 2, bw - 4, ch - 4); }
    ctx.globalAlpha = 0.5; ctx.strokeStyle = '#3a1a10'; ctx.lineWidth = 1.6 / S; ctx.beginPath();
    for (let y = y0, row = 0; y < y1; y += ch, row++) { ctx.moveTo(x0, y); ctx.lineTo(x1, y + (row % 3 - 1) * 0.8); for (let x = x0 - (row % 2) * bw / 2; x < x1; x += bw) { ctx.moveTo(x, y); ctx.lineTo(x + 0.6, y + ch); } }
    ctx.stroke(); ctx.globalAlpha = 0.35; ctx.strokeStyle = '#e8b896'; ctx.lineWidth = 1 / S; ctx.beginPath();
    for (let y = y0 + 2, row = 0; y < y1; y += ch, row++) { ctx.moveTo(x0, y); ctx.lineTo(x1, y); } ctx.stroke(); ctx.restore();
  }
  function heroWall(t, white) {                  // красная стена с «ласточкиными хвостами», бойницы, кладка
    wash(wallPath, '#9c4a34', 1);
    ctx.save(); ctx.clip(wallPath); bricks(-420, MT - 10, 1520, WB, 24, 58, 31, BC);
    vgrad(WY, WB, ['rgba(40,14,8,0)', 'rgba(40,14,8,0.0)', 'rgba(40,14,8,0.45)']);
    vgrad(WY, WY + 70, ['rgba(30,10,6,0.5)', 'rgba(30,10,6,0)']);               // тень под площадкой боя
    for (let i = 0; i < 15; i++) { const mx = X0 + i * MP; ctx.fillStyle = 'rgba(255,214,160,0.18)'; ctx.fillRect(mx, MT, 10, WY - MT); ctx.fillStyle = 'rgba(30,10,6,0.28)'; ctx.fillRect(mx + MW - 14, MT, 14, WY - MT); }
    ctx.restore();
    pencil(wallPts.slice(1, -1), { w: 3.2, col: '#2a120a', key: 3 });
    pencil([[-420, WY + 8], [1520, WY + 12]], { w: 2.4, col: '#2a120a', a: 0.7, key: 4 });
    for (let i = 0; i < 15; i++) { const mx = X0 + i * MP; rect(mx + MW / 2 - 5, MT + 70, 10, 52, { wash: '#1c0c08', washA: 0.95, w: 1.6, col: '#1c0c08' }); }
    for (let i = 0; i < 6; i++) { const bx = -150 + i * 280; rect(bx, 950, 24, 70, { wash: '#1c0c08', washA: 0.95, w: 2, col: '#1c0c08' }); rect(bx - 10, 1020, 44, 10, { wash: '#6a2c1c', washA: 0.9, w: 1.4 }); }
    // белокаменный цоколь (остался от Дмитрия Донского — фундамент)
    const pl = pathOf([[-420, WB - 50], [1520, WB - 46], [1520, WB + 10], [-420, WB + 10]]); wash(pl, '#c9bba0', 1); hatch(pl, [-420, WB - 50, 1520, WB + 10], { gap: 8, a: 0.3, col: '#5a4a30', ang: -0.3, key: 7 });
    pencil([[-420, WB - 50], [1520, WB - 46]], { w: 2.4, col: '#3a2a18', a: 0.8 });
    if (white) whiteWall(t);
  }
  function whiteWall(t) {                        // известь: рваный фронт мазка, полосы кисти, подтёки, мокрый блеск
    const F = strokeX(t); if (F < -170) return;
    const top = MT - 30, bot = WB - 70, edge = []; for (let y = top; y <= bot; y += 20) edge.push([F + Math.sin(y * 0.031) * 18 + Math.sin(y * 0.11) * 8, y]);
    const reg = pathOf([[-430, top], ...edge, [-430, bot + 4]]);
    ctx.save(); ctx.clip(wallPath); ctx.clip(reg);
    ctx.globalAlpha = 0.93; ctx.fillStyle = '#f1ebdc'; ctx.fillRect(-430, top, F + 460, bot - top + 6);
    const r = rng(77); ctx.lineCap = 'round';
    for (let k = 0; k < 46; k++) { const y = top + r() * (bot - top); ctx.globalAlpha = 0.18 + r() * 0.2; ctx.strokeStyle = r() < 0.5 ? '#c9bfae' : '#ffffff'; ctx.lineWidth = 2 + r() * 7; ctx.beginPath(); ctx.moveTo(-430, y); ctx.bezierCurveTo(300, y + (r() - 0.5) * 14, 700, y + (r() - 0.5) * 14, F + 20, y + (r() - 0.5) * 10); ctx.stroke(); }
    const g = ctx.createLinearGradient(F - 320, 0, F, 0); g.addColorStop(0, 'rgba(160,150,140,0)'); g.addColorStop(1, 'rgba(150,140,128,0.35)'); ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(F - 320, top, 340, bot - top);
    ctx.restore();
    pencil(edge, { w: 2.2, col: '#b8ad98', a: 0.7, pass2: false, key: 9 });
    const dr = rng(91); for (let k = 0; k < 22; k++) { const x = -360 + k * 78 + dr() * 40; if (x > F - 30) continue;   // подтёки вниз на красный низ стены
      const len = (40 + dr() * 90) * sm(fade(t, EV.red_stroke + SD * (x + 180) / 1480, EV.red_stroke + SD * (x + 180) / 1480 + 0.5));
      ctx.save(); ctx.globalAlpha = 0.92; ctx.fillStyle = '#efe8d8'; ctx.beginPath(); ctx.moveTo(x - 7, bot); ctx.lineTo(x + 7, bot); ctx.lineTo(x + 4, bot + len); ctx.arc(x, bot + len, 5, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.restore(); }
  }
  function giantBrush(t) {                       // гигантская кисть-квач: мочало в извести на колодке, ручка уходит вверх-назад
    const u = fade(t, EV.red_stroke - 0.06, EV.red_stroke + SD + 0.08); if (u <= 0 || u >= 1) return;
    const F = strokeX(t) + 20, cy = 990;
    push(F, cy, 1, 0.05);
    poly([[-60, -40], [-520, -1300], [-380, -1330], [10, -20]], { wash: '#9a6a38', washA: 1, w: 3.4, col: '#2a160a', shade: { gap: 7, a: 0.35, col: '#3a200c', ang: 1.0 } });
    const fr = []; for (let i = 0; i <= 64; i++) { const y = -380 + i * 760 / 64; fr.push([150 + (i % 2) * 10 + Math.sin(i * 0.9) * 10 + Math.sin(i * 2.3) * 5, y]); }
    const head = [[-70, -390], [40, -400], ...fr, [40, 400], [-70, 390]];
    const br = poly(head, { wash: '#d4b878', washA: 1, w: 2.6, col: '#5a4018' });
    ctx.save(); ctx.clip(br.path); const r = rng(hsh(FRAME, 5)); ctx.lineCap = 'round';
    for (let k = 0; k < 64; k++) { const y = -400 + k * 12.6 + r() * 6; ctx.globalAlpha = 0.65; ctx.strokeStyle = k % 3 ? '#8a6a30' : '#f4e2b0'; ctx.lineWidth = 2 + r() * 2; ctx.beginPath(); ctx.moveTo(-60, y); ctx.quadraticCurveTo(30, y + (r() - 0.5) * 16, 150, y + (r() - 0.5) * 24); ctx.stroke(); }
    const lg = ctx.createLinearGradient(20, 0, 140, 0); lg.addColorStop(0, 'rgba(246,242,232,0)'); lg.addColorStop(0.5, 'rgba(246,242,232,0.95)'); lg.addColorStop(1, 'rgba(246,242,232,1)'); ctx.globalAlpha = 1; ctx.fillStyle = lg; ctx.fillRect(20, -410, 140, 820); ctx.restore();
    rect(-84, -350, 54, 700, { wash: '#5a3416', washA: 1, w: 3, col: '#1e0e04', shade: { gap: 6, a: 0.4, col: '#1a0a04', ang: 1.4 } });
    for (const y of [-270, -90, 90, 270]) line([[-92, y], [-22, y + 4]], { w: 6, col: '#c8a868', smooth: false });
    const dr = rng(hsh(FRAME, 8)); for (let k = 0; k < 8; k++) { const y = -360 + dr() * 720, l = 20 + dr() * 60; ctx.fillStyle = '#f6f2e8'; ctx.beginPath(); ctx.ellipse(130 + dr() * 30, y + l, 6, 9, 0, 0, 6.3); ctx.fill(); }
    pop();
  }
  // ---------------------------------------------------------------- дальние планы
  function cathedral(t) {                        // Успенский собор (Фиораванти, 1479): белый камень, закомары, пять золотых шлемов на барабанах
    const x0 = 380, x1 = 740, y0 = 600;
    const body = pathOf([[x0, 900], [x0, y0], [x1, y0], [x1, 900]]); wash(body, '#e9dfca', 1); hatch(body, [x0, y0 - 40, x1, 900], { gap: 9, a: 0.16, col: '#6a5a44', ang: 1.2, key: 21 });
    for (let i = 0; i < 4; i++) { const ax = x0 + 45 + i * 90; const p = []; for (let a = 0; a <= 12; a++) p.push([ax + Math.cos(Math.PI + a / 12 * Math.PI) * 45, y0 + Math.sin(Math.PI + a / 12 * Math.PI) * 34]); wash(pathOf([[ax - 45, y0 + 2], ...p, [ax + 45, y0 + 2]]), '#e9dfca', 1); pencil(p, { w: 2, col: '#5a4a34', a: 0.7, pass2: false }); pencil([[ax + 45, y0], [ax + 45, 900]], { w: 1.4, col: '#5a4a34', a: 0.35, pass2: false }); }
    pencil([[x0, 900], [x0, y0]], { w: 2, col: '#5a4a34', a: 0.6 }); pencil([[x1, y0], [x1, 900]], { w: 2, col: '#5a4a34', a: 0.6 });
    for (const [dx, base, s] of [[470, 596, 0.78], [650, 596, 0.78], [500, 580, 0.72], [620, 580, 0.72], [560, 566, 1]].sort((a, b) => a[2] - b[2])) {
      const dw = 26 * s, dt = base - 70 * s; const dr = pathOf([[dx - dw, base], [dx - dw, dt], [dx + dw, dt], [dx + dw, base]]); wash(dr, '#e2d7c0', 1);
      ctx.save(); ctx.clip(dr); ctx.fillStyle = 'rgba(90,70,50,0.25)'; ctx.fillRect(dx + dw * 0.3, dt, dw, 80 * s); for (let k = -1; k <= 1; k++) { ctx.fillStyle = '#4a3a2a'; ctx.fillRect(dx + k * dw * 0.6 - 2, dt + 18 * s, 4, 28 * s); } ctx.restore();
      pencil([[dx - dw, base], [dx - dw, dt], [dx + dw, dt], [dx + dw, base]], { w: 1.6, col: '#5a4a34', a: 0.7, pass2: false });
      const hp = []; for (let a = 0; a <= 16; a++) { const q = a / 16, ang = Math.PI * (1 + q); hp.push([dx + Math.cos(ang) * dw * 1.12, dt + Math.sin(ang) * 40 * s - Math.pow(Math.sin(q * Math.PI), 10) * 20 * s]); }
      const h = pathOf([[dx - dw * 1.12, dt], ...hp, [dx + dw * 1.12, dt]]); wash(h, '#d9a640', 1); ctx.save(); ctx.clip(h); glow(dx - dw * 0.45, dt - 26 * s, 26 * s, 'rgba(255,244,190,1)', 0.9); ctx.fillStyle = 'rgba(120,70,10,0.3)'; ctx.fillRect(dx + dw * 0.3, dt - 70 * s, dw, 70 * s); ctx.restore(); pencil(hp, { w: 2, col: '#5a3a10', a: 0.8, pass2: false });
      const tip = dt - 60 * s; pencil([[dx, tip], [dx, tip - 34 * s]], { w: 2.4, col: '#6a4a14', pass2: false }); pencil([[dx - 9 * s, tip - 22 * s], [dx + 9 * s, tip - 22 * s]], { w: 2, col: '#6a4a14', pass2: false });
    }
  }
  function midTower(t, tent, whiteK) {           // угловая башня: глухая четырёхгранная (1495, в лесах) → с шатром (1680)
    const x0 = 40, x1 = 270, top = 590;
    const b = pathOf([[x0, 1000], [x0, top], [x1, top], [x1, 1000]]); wash(b, '#94452f', 1);
    ctx.save(); ctx.clip(b); bricks(x0, top, x1, 1000, 16, 38, 5, BC, 0.5); ctx.fillStyle = 'rgba(30,10,6,0.35)'; ctx.fillRect(x1 - 60, top, 60, 600); ctx.restore();
    pencil([[x0, 1000], [x0, top], [x1, top], [x1, 1000]], { w: 2.6, col: '#2a120a', key: 41 });
    const mb = pathOf([[x0 - 14, top], [x0 - 14, top - 40], [x1 + 14, top - 40], [x1 + 14, top]]); wash(mb, '#a04e36', 1); pencil([[x0 - 14, top], [x0 - 14, top - 40], [x1 + 14, top - 40], [x1 + 14, top]], { w: 2.2, col: '#2a120a' });
    for (let i = 0; i < 6; i++) { const ax = x0 - 6 + i * 42; pencil([[ax, top], [ax + 10, top - 14], [ax + 20, top]], { w: 1.6, col: '#2a120a', a: 0.7, pass2: false }); }
    for (let i = 0; i < 4; i++) { const mx = x0 - 10 + i * 64; poly([[mx, top - 40], [mx, top - 74], [mx - 3, top - 86], [mx + 20, top - 66], [mx + 43, top - 86], [mx + 40, top - 74], [mx + 40, top - 40]], { wash: '#a04e36', washA: 1, w: 2, col: '#2a120a' }); }
    for (const y of [560, 680]) for (const x of [90, 200]) rect(x, y, 14, 40, { wash: '#1c0c08', washA: 0.95, w: 1.4 });
    if (tent > 0) {                              // шатёр с зелёной черепицей и смотровой вышкой
      const k = popK(tent, 0, 0.4); push((x0 + x1) / 2, top - 86, 0.8, 0); ctx.scale(1, k);
      const tp = [[-130, 0], [-26, -250], [26, -250], [130, 0]]; poly(tp, { wash: '#3f7a55', washA: 1, w: 2.6, col: '#12261a' });
      ctx.save(); ctx.clip(pathOf(tp)); ctx.strokeStyle = 'rgba(10,30,20,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let y = -240; y < 0; y += 18) { ctx.moveTo(-140, y); ctx.lineTo(140, y); } for (let x = -120; x <= 120; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x * 0.2, -250); } ctx.stroke(); ctx.fillStyle = 'rgba(255,255,220,0.18)'; ctx.fillRect(-130, -250, 70, 250); ctx.restore();
      rect(-24, -300, 48, 50, { wash: '#e8dcc2', washA: 1, w: 2, col: '#2a1a10' }); poly([[-30, -300], [0, -360], [30, -300]], { wash: '#3f7a55', washA: 1, w: 2, col: '#12261a' });
      line([[0, -360], [0, -400]], { w: 2.4, col: '#6a4a14', pass2: false }); poly([[0, -400], [26, -392], [0, -384]], { wash: '#d9a640', washA: 1, w: 1.4 });
      pop();
    }
    if (whiteK > 0) { ctx.save(); ctx.globalAlpha = 0.85 * whiteK; ctx.fillStyle = '#efe8d8'; ctx.fill(b); ctx.fill(mb); ctx.restore(); }
  }
  function scaffold(x0, x1, yTop, yBot, seed) {  // деревянные леса: стойки, ригели, раскосы, верёвочные вязки
    const r = rng(seed);
    for (let x = x0; x <= x1 + 1; x += (x1 - x0) / 2) line([[x + (r() - 0.5) * 6, yBot], [x + (r() - 0.5) * 6, yTop - 30]], { w: 7, col: '#5a3a1e', smooth: false, key: x });
    for (let y = yTop; y < yBot; y += 230) { line([[x0 - 20, y], [x1 + 20, y + 4]], { w: 6, col: '#6a4422', smooth: false }); line([[x0, y + 8], [x1, y + 222]], { w: 4, col: '#5a3a1e', smooth: false, a: 0.8 }); for (let x = x0; x <= x1 + 1; x += (x1 - x0) / 2) { pencil([[x - 7, y - 6], [x + 7, y + 6]], { w: 2, col: '#d8c08a', pass2: false }); pencil([[x - 7, y + 6], [x + 7, y - 6]], { w: 2, col: '#d8c08a', pass2: false }); } }
  }
  function master(t, x, y) {                     // итальянский мастер: берет, дублет, шоссы; чертёж «P. A. SOLARIVS»
    const up = sm(fade(t, EV.red_ital - 0.1, EV.red_ital + 0.2)), wag = up * Math.sin(t * 16) * 6;
    push(x, y, 1);
    const ink = '#2a1c16';
    for (const dx of [-14, 14]) line([[dx, -70], [dx + dx * 0.2, 0]], { w: 11, col: '#4a2a3a', smooth: false });
    for (const dx of [-14, 14]) ell(dx * 1.3, -2, 14, 6, { wash: ink, washA: 1, w: 1.4 });
    blob([[-34, -150], [34, -150], [44, -70], [0, -60], [-44, -70]], { wash: '#6a2a2a', washA: 1, w: 2.4, col: '#1a0e0a', shade: { gap: 6, a: 0.3, col: '#2a0a0a', ang: 1.2 } });
    line([[-30, -96], [30, -96]], { w: 4, col: '#c9a040', smooth: false });
    ell(0, -176, 22, 24, { wash: '#d8a888', washA: 1, w: 2, col: '#1a0e0a' }); blob([[-20, -170], [20, -170], [14, -146], [0, -138], [-14, -146]], { wash: '#3a2418', washA: 1, w: 1.6 });
    ell(4, -200, 36, 10, { wash: '#2a1a2a', washA: 1, w: 2, col: '#0a0608', rot: -0.12 }); ell(2, -206, 22, 9, { wash: '#2a1a2a', washA: 1, w: 1.6 });
    line([[-30, -140], [-56, -110 - up * 70], [-40, -170 * up - 110 * (1 - up)]], { w: 9, col: '#6a2a2a' });            // рука с щепоткой
    if (up > 0.5) { push(-40, -110 - up * 70 + wag, 1); ell(0, -8, 9, 12, { wash: '#d8a888', washA: 1, w: 1.6 }); pencil([[-4, -18], [0, -24], [5, -18]], { w: 1.6, pass2: false }); pop(); }
    line([[30, -140], [56, -120 - up * 40], [70, -140 - up * 60]], { w: 9, col: '#6a2a2a' });
    push(96, -150 - up * 70, 1, -0.08 + up * 0.1);    // чертёж
    rect(-34, -60, 120, 86, { wash: '#efe0b8', washA: 1, w: 2, col: '#5a3a18' });
    pencil([[-24, 0], [-24, -30], [-18, -40], [-6, -32], [6, -40], [12, -30], [12, 0]], { w: 1.4, col: '#7a4a1e', pass2: false });
    pencil([[16, 0], [16, -30], [22, -40], [34, -32], [46, -40], [52, -30], [52, 0], [76, 0]], { w: 1.4, col: '#7a4a1e', pass2: false });
    txt('P. A. SOLARIVS', 26, 14, 13, { col: '#5a2a10', font: 'Osw', bold: false }); pop();
    pop();
  }
  function windlass(t, x, y, basketY) {          // ворот-подъёмник: барабан со спицами, верёвка, корзина кирпичей
    for (const dx of [-40, 40]) line([[x + dx, y], [x, y - 110]], { w: 6, col: '#5a3a1e', smooth: false });
    const a = -t * 2.2; push(x, y - 100, 1, a); ell(0, 0, 18, 18, { wash: '#7a5028', washA: 1, w: 2.4 }); for (let k = 0; k < 4; k++) { const q = k * Math.PI / 4; line([[Math.cos(q) * -54, Math.sin(q) * -54], [Math.cos(q) * 54, Math.sin(q) * 54]], { w: 5, col: '#6a4422', smooth: false }); } pop();
    pencil([[x + 18, y - 100], [x + 18, basketY - 40]], { w: 2, col: '#d8c08a', pass2: false, gap: false });
    push(x + 18, basketY, 1); pencil([[-20, -40], [0, -70], [20, -40]], { w: 1.6, col: '#d8c08a', pass2: false });
    const bk = poly([[-34, -40], [34, -40], [26, 10], [-26, 10]], { wash: '#a8844a', washA: 1, w: 2, col: '#3a2410' }); hatch(bk.path, bk.bb, { gap: 6, a: 0.5, col: '#5a3a18', ang: 0.8, seg: 30 });
    for (let k = 0; k < 4; k++) rect(-30 + k * 15, -54 + (k % 2) * 4, 14, 14, { wash: BC[k], washA: 1, w: 1.4 }); pop();
  }
  // ---------------------------------------------------------------- спецэффекты у Тома
  function puff(x, y, s, t, t0, d = 0.5, seed = 1, col = '#f2ede2') {   // облачко «пуф»
    const u = (t - t0) / d; if (u < 0 || u > 1) return; const r = rng(seed);
    for (let i = 0; i < 11; i++) { const a = r() * 6.283, dd = (40 + r() * 90) * s * sm(u * 1.6), rr = (40 + r() * 50) * s * (0.5 + u);
      ell(x + Math.cos(a) * dd, y + Math.sin(a) * dd * 0.8 - u * 30 * s, rr, rr * 0.85, { wash: col, washA: 0.95 * (1 - u * u), w: 2.2, col: '#8a7a68', a: 0.6 * (1 - u) }); }
  }
  const SPL = [[38, -352, 24], [-58, -444, 17], [54, -196, 30], [-26, -150, 20], [96, -300, 13], [6, -486, 15], [-70, -230, 14]];
  function splats(P, t) {                         // брызги извести, прилипшие к Тому
    const tp = EV.red_stroke + SD * clamp((P.x + 180) / 1480);
    push(P.x, P.y, P.s, 0, P.flip ? -1 : 1);
    SPL.forEach(([x, y, rr], i) => { const k = popK(t, tp + i * 0.03, 0.25); if (t < tp + i * 0.03) return; const r = rng(i * 13 + 2), pts = [];
      for (let a = 0; a < 12; a++) { const q = a / 12 * 6.283, d = rr * k * (0.7 + 0.6 * r()) * (a % 3 ? 1 : 1.5); pts.push([x + Math.cos(q) * d, y + Math.sin(q) * d]); }
      blob(pts, { wash: '#f4efe4', washA: 0.97, w: 1.6, col: '#a89c88' });
      if (i % 2 === 0) { const dl = 30 * sm(fade(t, tp + 0.1, tp + 0.7)); ctx.fillStyle = '#f4efe4'; ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.lineTo(x + 2, y + rr * 0.6 + dl); ctx.arc(x, y + rr * 0.6 + dl, 3, 0, Math.PI); ctx.fill(); } });
    pop();
  }
  function flySplash(t) {                        // брызги летят в камеру (передний план)
    const u = fade(t, EV.red_stroke + 0.05, EV.red_stroke + SD + 0.5); if (u <= 0 || u >= 1) return; const r = rng(55);
    for (let i = 0; i < 26; i++) { const t0 = r() * 0.5, q = clamp((u - t0) / 0.5); if (q <= 0 || q >= 1) { r(); r(); r(); continue; }
      const x0 = -100 + (t0 / 0.5) * 1300, y0 = 700 + r() * 600, vx = (r() - 0.3) * 500, vy = -300 - r() * 500, sz = 6 + r() * 20;
      const x = x0 + vx * q, y = y0 + vy * q + 1400 * q * q, s = sz * (1 + q * 2.5);
      ell(x, y, s, s * 0.8, { wash: '#f6f1e6', washA: 0.95 * (1 - q * 0.6), w: 1.4, col: '#b0a490', a: 0.6 }); }
  }

  // ---------------------------------------------------------------- мир
  WORLD.red = (t, u, cat) => {
    const tsarK = t >= EV.red_tsar, white = t >= EV.red_stroke - 0.06;
    lay(40, () => { vgrad(-900, 1300, ['#6f8fb0', '#c8b49a', '#f2d7a8']); glow(170, 560, 520, 'rgba(255,220,150,1)', 0.75); ctx.fillStyle = '#fff3d0'; ctx.beginPath(); ctx.arc(170, 560, 46, 0, 6.3); ctx.fill();
      for (let k = 0; k < 6; k++) { const x = ((k * 360 + t * 12) % 2000) - 500; glow(x, 420 + (k % 3) * 90, 180, 'rgba(255,244,226,1)', 0.45, 'source-over'); glow(x + 120, 440 + (k % 3) * 90, 130, 'rgba(255,244,226,1)', 0.4, 'source-over'); } });
    lay(14, () => { cathedral(t); });
    haze('#f0d6b0', 0.16);
    lay(8, () => { for (let k = 0; k < 8; k++) { const x = -300 + k * 240; const r = rng(k + 3); sil([[x - 70, 760], [x - 60, 690], [x, 640 - r() * 40], [x + 60, 690], [x + 70, 760]], '#7a6a5e', 0.8); }
      for (let k = 0; k < 5; k++) { const ph = (t * 0.3 + k / 5) % 1, x = 900 - ph * 1400 + k * 60, y = 420 + Math.sin(ph * 9 + k) * 30 + k * 26; pencil([[x - 12, y - 4], [x, y + 2], [x + 12, y - 5]], { w: 2, col: '#3a2a20', a: 0.7, pass2: false }); } });
    haze('#f0d6b0', 0.1);
    lay(4, () => { midTower(t, tsarK ? t - EV.red_tsar : 0, sm(fade(t, EV.red_stroke + SD * 0.2, EV.red_stroke + SD + 0.25)));
      if (!tsarK) scaffold(20, 290, 520, 1000, 3); puff(155, 700, 1.4, t, EV.red_tsar, 0.55, 4, '#f0e6d4'); });
    haze('#f0d6b0', 0.06);
    lay(1.5, () => { heroWall(t, white); giantBrush(t); });
    lay(1.3, () => { if (!tsarK) { scaffold(850, 1070, 664, 1460, 7); line([[820, 650], [1110, 654]], { w: 12, col: '#7a5028', smooth: false }); master(t, 930, 646); windlass(t, 1050, 650, lerp(1250, 760, fade(t, S0.red, EV.red_tsar))); }
      puff(960, 900, 1.8, t, EV.red_tsar, 0.6, 9, '#f0e6d4'); });
    lay(1, () => {
      const g = pathOf([[-900, WB - 4], [W + 900, WB], [W + 900, 2600], [-900, 2600]]); wash(g, '#8a6a48', 1);
      ctx.save(); ctx.clip(g); vgrad(WB, 2000, ['rgba(60,36,20,0.1)', 'rgba(60,36,20,0.55)']); ctx.restore();
      hatch(pathOf([[-900, WB + 20], [W + 900, WB + 20], [W + 900, 1700], [-900, 1700]]), [-900, WB + 20, W + 900, 1700], { gap: 9, a: 0.28, ang: -0.12, col: '#3a2410', key: 17 });
      vgrad(WB - 4, WB + 30, ['rgba(30,14,8,0.6)', 'rgba(30,14,8,0)']);
      const r = rng(23); for (let k = 0; k < 14; k++) { const x = -100 + r() * 1300, y = 1380 + r() * 260; rect(x, y, 30 + r() * 14, 13, { wash: BC[k % BC.length], washA: 1, w: 1.6, col: '#2a120a' }); }
      for (let j = 0; j < 4; j++) for (let i = 0; i < 4 - j % 2; i++) rect(60 + i * 56 + (j % 2) * 28, 1336 - j * 22, 54, 20, { wash: BC[(i + j) % BC.length], washA: 1, w: 1.8, col: '#2a120a' });
      push(310, 1380, 1); poly([[-70, -30], [70, -30], [56, 10], [-56, 10]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#2a160a' }); ell(0, -30, 66, 10, { wash: '#cfc4ae', washA: 1, w: 1.6 }); pop();
      if (t > EV.red_brick - 0.05) { const k = popK(t, EV.red_brick, 0.25); push(800, 1146, k); rect(-38, -13, 76, 26, { wash: '#c06a4e', washA: 1, w: 2.6, col: '#2a120a' }); glow(0, 0, 60, 'rgba(255,220,170,1)', 0.35 * (1 - clamp((t - EV.red_brick) / 0.8))); for (const sx of [-1, 1]) for (let q = 0; q < 3; q++) ell(sx * (44 + q * 9), 6 - q * 7, 6, 4, { wash: '#ddd2bc', washA: 1, w: 1 }); line([[-40, 16], [40, 17]], { w: 4, col: '#ddd2bc', smooth: false }); pop(); }
      if (t > EV.red_slap - 0.02 && t < EV.red_slap + 0.35) { const q = (t - EV.red_slap) / 0.35; for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283; pencil([[790 + Math.cos(a) * (40 + q * 50), 1066 + Math.sin(a) * (40 + q * 50)], [790 + Math.cos(a) * (60 + q * 80), 1066 + Math.sin(a) * (60 + q * 80)]], { w: 3, col: '#3a1a0a', a: 1 - q, pass2: false }); } puff(790, 1066, 0.5, t, EV.red_slap, 0.4, 3, '#c89a78'); }
      cat();
    });
    lay(0.62, () => {
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) rect(-80 + i * 110 + (j % 2) * 50, 1820 - j * 40, 106, 38, { wash: BC[(i * 2 + j) % BC.length], washA: 1, w: 2.4, col: '#2a120a' });
      push(980, 1840, 1); poly([[-90, -80], [90, -80], [76, 60], [-76, 60]], { wash: '#7a5028', washA: 1, w: 3, col: '#2a160a', shade: { gap: 7, a: 0.35, col: '#2a1408', ang: 1.4 } }); for (const y of [-50, 30]) line([[-88, y], [88, y]], { w: 5, col: '#3a2a1a', smooth: false }); ell(0, -80, 90, 16, { wash: '#efe8d8', washA: 1, w: 2 }); pop();
      flySplash(t);
    });
    motes(36, [0, 500, W, 1500], white ? '#fffaf0' : '#ffe2b0', t, 22, { sp: -14, sz: 2.6, a: 0.6, add: 1, wob: 26, tw: 1 });
    rays(170, 560, 0.75, 0.9, 1700, 'rgba(255,226,170,0.5)', 0.22, 6, t);
  };

  // ---------------------------------------------------------------- режиссура
  DIR.red = {
    outfit: 'master', light: { side: -1, rim: '#ffdca0' }, grade: ['#c8702a', 0.16],
    act: () => [[S0.red, 'talk'], [EV.red_slap - 0.05, 'proud'], [EV.red_brick, 'grin'], [EV.red_ital, 'smug'], [EV.red_ital + 0.45, 'wink'],
      [WT('r1', 'потом'), 'sideeye'], [EV.red_tsar, 'suspicious'], [EV.red_shock, 'shock'], [EV.red_poof + 0.1, 'scared'], [EV.red_stroke, 'shock'], [EV.red_stroke + 0.22, 'annoyed']],
    pose: (t, u, b) => {
      const painter = t >= EV.red_poof + 0.08, o = { x: 600, s: 1.2, outfit: painter ? 'painter' : 'master', prop: painter ? 'brush' : 'trowel', look: [0.4, -0.1] };
      if (t < EV.red_brick - 0.25) {               // хлопок по стене
        const k = sm(fade(t, EV.red_slap - 0.2, EV.red_slap)) * (1 - sm(fade(t, EV.red_slap + 0.35, EV.red_slap + 0.6)));
        o.hand = [lerp(84, 160, k), lerp(-150, -320, k)]; o.look = [0.6, -0.3 * k]; if (Math.abs(t - EV.red_slap) < 0.12) o.squash = 0.12;
      } else if (t < EV.red_ital - 0.1) {          // кладёт кирпич, постукивает мастерком
        const tap = Math.max(0, Math.sin((t - EV.red_brick) * 22)) * 14 * (t > EV.red_brick ? 1 : 0);
        o.hand = [150, -262 - tap]; o.handF = [110, -250]; o.look = [0.8, -0.1];
      } else if (t < WT('r1', 'потом')) {         // «итальянцы»: щепотка у морды, трясёт
        const k = sm(fade(t, EV.red_ital - 0.1, EV.red_ital + 0.1)); o.hand = [lerp(150, 120, k), lerp(-262, -300, k) + Math.sin(t * 19) * 16 * k]; o.look = [0.05, 0]; o.tilt = -0.08;
      } else if (t < EV.red_shock) {              // подозрительно смотрит вверх на указ
        o.look = [0.5, -0.8]; o.hand = [40, -200]; o.handF = [-60, -170]; o.tilt = 0.06;
      } else if (t < EV.red_stroke - 0.05) {      // шок, лапы вверх; «пуф»
        o.hand = [110, -300]; o.handF = [-110, -300]; o.tailUp = true; o.look = [0, -0.1];
      } else {                                    // замах кистью: слева направо, вместе с гигантским мазком
        const k = sm(fade(t, EV.red_stroke - 0.05, EV.red_stroke + SD));
        o.hand = [lerp(-70, 170, k), lerp(-330, -250, k)]; o.rot = lerp(-0.06, 0.06, k); o.look = [lerp(-0.6, 0.7, k), -0.2];
        if (t > EV.red_stroke + 0.22) { o.look = [0.1, 0.05]; o.hand = [120, -220]; o.rot = 0; }
      }
      return Object.assign(b, o);
    },
    afterCat: (t, u, P) => { if (t > EV.red_stroke) splats(P, t); puff(P.x, P.y - 280 * P.s, 1.0 * P.s, t, EV.red_poof - 0.04, 0.3, 21); },
    cam: () => [[S0.red, 540, 960, 0], [S0.red + 0.7, 560, 980, 0.06], [EV.red_ital - 0.1, 600, 970, 0.08], [EV.red_ital + 0.3, 760, 900, 0.15],
      [EV.red_tsar + 0.1, 520, 860, 0.1], [EV.red_poof, 600, 1000, 0.22], [EV.red_stroke + 0.25, 540, 960, -0.03], [S1.red, 540, 960, -0.01]],
    hud: t => {
      if (t < S0.red || t > S1.red + 0.4) return;
      if (t > EV.red_ital + 0.05 && t < EV.red_tsar) { note('зубцы «ласточкин хвост»', 330, 450, t, EV.red_ital + 0.05, EV.red_tsar - 0.05, '#3a1a0c', 44, -0.05); note('— made in Italy', 380, 505, t, EV.red_ital + 0.25, EV.red_tsar - 0.05, '#8a1a10', 48, -0.05, [[300, 535], [270, 590], [262, 640]]); }
      if (t > EV.red_tsar) { const k = popK(t, EV.red_tsar, 0.22), s = lerp(2.4, 1, clamp((t - EV.red_tsar) / 0.12));
        push(790, 520, s * (0.95 + 0.05 * k), -0.16); ctx.save(); ctx.globalAlpha = clamp((t - EV.red_tsar) / 0.06);
        const red = '#b8322a'; pencil([[-210, -66], [210, -66], [210, 66], [-210, 66], [-210, -66]], { w: 5, col: red, pass2: false, gap: false }); pencil([[-196, -54], [196, -54], [196, 54], [-196, 54], [-196, -54]], { w: 2, col: red, pass2: false, gap: false });
        txt('1680', 0, -18, 64, { col: red, font: 'Osw' }); txt('ЦАРСКИЙ УКАЗ', 0, 34, 32, { col: red, font: 'Osw' }); ctx.restore();
        if (t > EV.red_stroke) txt('выбелить!', 20, 118, 78, { col: red, rot: 0.04, reveal: clamp((t - EV.red_stroke) / 0.25) });
        pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В сцену: разворот чертежа → линии встают в объём → кирпич
  const parch = document.createElement('canvas'); parch.width = W; parch.height = H; let parchOK = false;
  function makeParch() {                          // пергамент с чертежом стены (рисуется один раз)
    const pc = parch.getContext('2d'), prev = ctx, pS = S, pF = FRAME; ctx = pc; S = 1;
    const g = pc.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#ead8ac'); g.addColorStop(0.5, '#e2cc98'); g.addColorStop(1, '#d6bc86'); pc.fillStyle = g; pc.fillRect(0, 0, W, H);
    const r = rng(404); for (let i = 0; i < 40; i++) { const x = r() * W, y = r() * H, rr = 40 + r() * 200; const gg = pc.createRadialGradient(x, y, 0, x, y, rr); gg.addColorStop(0, 'rgba(140,90,40,0.10)'); gg.addColorStop(1, 'rgba(140,90,40,0)'); pc.fillStyle = gg; pc.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    const sep = '#6a3a18';
    pc.strokeStyle = 'rgba(106,58,24,0.14)'; pc.lineWidth = 1; pc.beginPath(); for (let x = 0; x < W; x += 40) { pc.moveTo(x, 0); pc.lineTo(x, H); } for (let y = 0; y < H; y += 40) { pc.moveTo(0, y); pc.lineTo(W, y); } pc.stroke();
    FRAME = 0;
    txt('MVRVS · CREMLINI · MOSCOVIAE', 540, 470, 46, { col: sep, font: 'Osw', bold: false }); txt('anno MCDXCV', 540, 528, 40, { col: sep });
    pencil(wallPts.slice(1, -1), { w: 2.6, col: sep, pass2: false });
    for (let y = MT; y < WB; y += 48) pencil([[-20, y + (y < WY ? 0 : 0)], [1100, y]], { w: 1, col: sep, a: 0.25, pass2: false, gap: false });
    pencil([[-20, WB], [1100, WB]], { w: 2.4, col: sep, pass2: false });
    pencil([[1030, MT], [1030, WB]], { w: 1.6, col: sep, pass2: false }); for (const y of [MT, WB]) pencil([[1015, y], [1045, y]], { w: 1.6, col: sep, pass2: false });
    push(1000, 1000, 1, -Math.PI / 2); txt('alt. XX bracc.', 0, 0, 30, { col: sep }); pop();
    pencil([[X0 + MP * 4, 600], [X0 + MP * 5, 600]], { w: 1.4, col: sep, pass2: false }); txt('I bracc. ½', X0 + MP * 4.5, 580, 26, { col: sep });
    note('coda di rondine', 300, 590, 1, 0, 2, sep, 40, -0.06, [[380, 600], [430, 630], [454, 660]]);
    pencil(ellPts(900, 1600, 70, 70), { w: 2, col: sep, pass2: false }); for (let a = 0; a < 8; a++) { const q = a / 8 * 6.283, L = a % 2 ? 50 : 100; pencil([[900, 1600], [900 + Math.cos(q) * L, 1600 + Math.sin(q) * L]], { w: a % 2 ? 1.2 : 2.2, col: sep, pass2: false }); } txt('N', 900, 1478, 34, { col: sep, font: 'Osw' });
    txt('PETRVS ANTONIVS SOLARIVS', 420, 1520, 50, { col: sep, font: 'Osw', bold: false }); txt('architectus · Mediolanensis', 420, 1580, 40, { col: sep });
    pencil([[160, 1630], [700, 1624]], { w: 2, col: sep, pass2: false });
    ctx = prev; S = pS; FRAME = pF; parchOK = true;
  }
  function wallExtrude(k, a) {                    // линии зубцов «встают» из плоскости: копия контура со сдвигом + рёбра
    const dx = 26 * k, dy = -22 * k, sep = '#6a3a18';
    const P = wallPts.slice(1, -1);
    pencil(P.map(([x, y]) => [x + dx, y + dy]), { w: 2.2, col: sep, a: a * 0.9, pass2: false, gap: false });
    for (const [x, y] of P) pencil([[x, y], [x + dx, y + dy]], { w: 1.6, col: sep, a: a * 0.8, pass2: false, gap: false });
  }
  TRANS_IN.red = { a: 0.45, b: 0.5, fx(k, t, A, B) {
    if (!parchOK) makeParch();
    const p1 = sm(clamp(k / 0.45)), p2 = sm(clamp((k - 0.4) / 0.3)), p3 = sm(clamp((k - 0.66) / 0.34));
    const ry = lerp(-80, H + 120, p1);
    if (p1 < 1) drawBuf(A); else drawBuf(B);
    scr(() => {
      ctx.save(); ctx.globalAlpha = 1 - p3; const lift = 1 + p3 * 0.18; ctx.translate(540, 960); ctx.scale(lift, lift); ctx.translate(-540, -960);
      ctx.beginPath(); ctx.rect(0, 0, W, ry); ctx.clip(); ctx.drawImage(parch, 0, 0);
      if (p2 > 0) { ctx.save(); ctx.clip(wallPath); ctx.globalAlpha = (1 - p3) * p2; ctx.drawImage(B, 0, 0); ctx.restore(); wallExtrude(p2, 1 - p3); }
      ctx.restore();
      if (p1 > 0 && p1 < 1) {                     // валик свитка + тень
        const g = ctx.createLinearGradient(0, ry, 0, ry + 70); g.addColorStop(0, 'rgba(40,20,8,0.5)'); g.addColorStop(1, 'rgba(40,20,8,0)'); ctx.fillStyle = g; ctx.fillRect(0, ry, W, 70);
        const rg = ctx.createLinearGradient(0, ry - 44, 0, ry + 44); rg.addColorStop(0, '#c8a868'); rg.addColorStop(0.45, '#f4e2b4'); rg.addColorStop(1, '#8a6a34'); ctx.fillStyle = rg; ctx.fillRect(-10, ry - 44, W + 20, 88);
        pencil([[-10, ry - 44], [W + 10, ry - 44]], { w: 3, col: '#4a2a10', pass2: false }); pencil([[-10, ry + 44], [W + 10, ry + 44]], { w: 3, col: '#4a2a10', pass2: false });
        for (let i = 0; i < 9; i++) { const yy = ry - 30 + i * 7.5; pencil([[-10, yy], [W + 10, yy + 1]], { w: 1, col: '#7a5424', a: 0.35, pass2: false, gap: false }); }
        for (const x of [0, W]) { ell(x, ry, 22, 56, { wash: '#5a3416', washA: 1, w: 3, col: '#1a0c04' }); }
        const tp = ctx.createLinearGradient(0, 0, 0, 60); tp.addColorStop(0, '#5a3416'); tp.addColorStop(1, 'rgba(90,52,22,0)'); ctx.fillStyle = tp; ctx.fillRect(0, 0, W, 40);
      }
    });
  } };
})();
