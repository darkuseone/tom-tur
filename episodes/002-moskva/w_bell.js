/* 002 — сцена `bell`: 1735, литейная яма на Ивановской площади. Моторины льют Царь-колокол (≈202 т): бронза по жёлобу,
   колокол раскалён → остывает; «двести тонн!» — гиря бахает, доска прогибается; «ни разу» — молоточек: «тук.»;
   «не звонил» — пожар 1737: горящая балка, ведро воды — трещина, кусок ≈11,5 т откалывается. Переход В сцену — литьё бронзы. */
(() => {
  // ---------------------------------------------------------------- события (от реплики k1)
  EV.bell_fill1 = LF('k1', 0.2);               // колокол залит
  EV.bell_cool = LF('k1', 0.36);               // остыл до бронзы
  EV.bell_ton = LF('k1', 0.5);                 // «тонн!» — гиря «200 т» приземляется на доску
  EV.bell_tap = WT('k1', 'разу') + 0.06;       // «разу» — молоточек: «тук.»
  EV.bell_crack = LF('k1', 0.84);             // «звонил.» — трещина
  EV.bell_beam = EV.bell_crack - 0.26;         // горящая балка начинает падать
  EV.bell_beamLand = EV.bell_crack - 0.12;
  EV.bell_water = EV.bell_crack - 0.15;        // ведро воды летит (удар в колокол ≈ crack − 0.04)
  EV.bell_chunk = EV.bell_crack + 0.08;        // кусок отваливается
  EV.bell_chunkLand = EV.bell_crack + 0.26;
  SHAKES.push([EV.bell_ton, 0.4, 22], [EV.bell_beamLand, 0.25, 10], [EV.bell_crack, 0.3, 16], [EV.bell_chunkLand, 0.32, 14]);
  KEYW.push('Царь-колокол', 'двести', 'тонн!', 'разу', 'звонил.');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const BX = 420, BT = 560, BH = 930;           // колокол: ось, верх, высота (низ = 1490, в яме ниже доски)
  const PROF = [[0, 150], [40, 200], [200, 214], [450, 238], [650, 288], [800, 360], [890, 404], [930, 420]];
  const bellPts = (() => { const R = PROF.map(([y, w]) => [BX + w, BT + y]), L = PROF.map(([y, w]) => [BX - w, BT + y]).reverse();
    return spline([[BX - 120, BT - 6], [BX, BT - 22], [BX + 120, BT - 6], ...R, [BX, BT + BH + 6], ...L], true, 6); })();
  const bellPath = pathOf(bellPts);
  const halfW = y => { const r = y - BT; for (let i = 1; i < PROF.length; i++) if (r <= PROF[i][0]) { const a = PROF[i - 1], b = PROF[i]; return lerp(a[1], b[1], (r - a[0]) / (b[0] - a[0])); } return 420; };
  const CHUNK = [[BX + 196, BT + 650], [BX + 270, BT + 628], [BX + 300, BT + 700], [BX + 352, BT + 790], [BX + 404, BT + 890], [BX + 420, BT + 930], [BX + 236, BT + 936], [BX + 256, BT + 836], [BX + 214, BT + 760]];
  const chunkPath = pathOf(CHUNK);
  const CRACK = [[BX + 150, BT + 300], [BX + 172, BT + 380], [BX + 154, BT + 452], [BX + 190, BT + 530], [BX + 176, BT + 590], [BX + 196, BT + 650]];
  const hotCol = T => T > 0.66 ? lerpC('#ff9a30', '#fff2b8', (T - 0.66) / 0.34) : T > 0.33 ? lerpC('#b8401a', '#ff9a30', (T - 0.33) / 0.33) : lerpC('#5e4426', '#b8401a', T / 0.33);
  const plankSag = (t, x) => { const u = t - EV.bell_ton; const a = u < 0 ? 0 : 30 * Math.exp(-u * 5) * Math.cos(u * 26) + (u > 0 ? 6 : 0); const cl = u < 0 ? 0 : -26 * Math.exp(-(t - EV.bell_chunkLand) * 6) * (t > EV.bell_chunkLand ? Math.cos((t - EV.bell_chunkLand) * 24) : 0); return (a + cl) * Math.sin(Math.PI * clamp((x - 560) / 640)); };

  // ---------------------------------------------------------------- колокол: форма, рельеф, раскал
  function bell(t) {
    const fillK = sm(fade(t, S0.bell + 0.3, EV.bell_fill1)), T = 1 - sm(fade(t, EV.bell_fill1, EV.bell_cool));
    const broken = t >= EV.bell_chunk, reheat = sm(fade(t, EV.bell_beamLand, EV.bell_beamLand + 0.15)) * (1 - sm(fade(t, EV.bell_crack - 0.04, EV.bell_crack + 0.4)));
    // форма-глина (до заливки) и бронза
    wash(bellPath, '#6e5a46', 1);
    ctx.save(); ctx.clip(bellPath);
    const g = ctx.createLinearGradient(BX - 430, 0, BX + 430, 0); g.addColorStop(0, '#2a1c10'); g.addColorStop(0.32, '#7a5a32'); g.addColorStop(0.45, '#b08a50'); g.addColorStop(0.62, '#6a4c2a'); g.addColorStop(1, '#22160c');
    const fy = lerp(BT + BH + 10, BT - 30, fillK);
    ctx.fillStyle = g; ctx.fillRect(BX - 440, fy, 880, BH + 60);
    hatch(bellPath, [BX - 430, BT - 30, BX + 430, BT + BH], { gap: 9, a: 0.22, col: '#1a1008', ang: 1.35, key: 51 });
    // патина и блики
    ctx.globalAlpha = 0.18; ctx.fillStyle = '#5aa391'; ctx.fillRect(BX - 430, BT + 480, 120, 400); ctx.fillRect(BX + 300, BT + 100, 130, 300); ctx.globalAlpha = 1;
    // рельеф: пояса, гирлянда, лики, картуши с фигурами
    const relief = (pts, a = 0.8) => { pencil(pts, { w: 3.4, col: '#1a1008', a, pass2: false }); pencil(pts.map(([x, y]) => [x - 3, y - 3]), { w: 2.2, col: '#f0d49a', a: a * 0.9, pass2: false, gap: false }); };
    for (const ry of [110, 150, 770, 812, 860]) { const y = BT + ry, w = halfW(y); relief([[BX - w + 4, y + 6], [BX, y + 16], [BX + w - 4, y + 6]]); }
    for (let k = -6; k <= 6; k++) { const x = BX + k * 30, y = BT + 132 + Math.abs(k) * 0.6; ell(x, y, 10, 7, { wash: '#8a6a3a', washA: 0.8, w: 1.4, col: '#1e140a' }); }
    for (let k = -3; k <= 3; k++) { const x = BX + k * 56, y = BT + 70; ell(x, y, 9, 10, { wash: '#9a7a44', washA: 0.9, w: 1.4, col: '#1e140a' }); relief([[x - 26, y + 2], [x - 10, y - 8], [x - 4, y]], 0.6); relief([[x + 26, y + 2], [x + 10, y - 8], [x + 4, y]], 0.6); }
    for (const [cx, sd] of [[BX - 110, -1], [BX + 100, 1]]) {
      relief(ellPts(cx, BT + 470, 64, 130, 0, 0.05, 40), 0.7);
      relief([[cx - 22, BT + 580], [cx - 16, BT + 450], [cx, BT + 420], [cx + 16, BT + 450], [cx + 22, BT + 580]], 0.75);
      ell(cx, BT + 398, 14, 16, { wash: '#8a6a3a', washA: 0.9, w: 1.6, col: '#1e140a' }); relief([[cx - 14, BT + 386], [cx - 8, BT + 370], [cx, BT + 378], [cx + 8, BT + 370], [cx + 14, BT + 386]], 0.7);
      relief([[cx + sd * 18, BT + 470], [cx + sd * 40, BT + 440], [cx + sd * 44, BT + 420]], 0.6);
    }
    for (let k = 0; k < 4; k++) relief([[BX - 70, BT + 680 + k * 20], [BX + 70, BT + 680 + k * 20]], 0.45);
    // жар: залитая часть светится и остывает
    if (T > 0 || fillK < 1) { const c = hotCol(T); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.25 + 0.75 * Math.min(1, T * 1.6); ctx.fillStyle = c; ctx.fillRect(BX - 440, fy, 880, BH + 60); ctx.globalAlpha = 1;
      if (fillK < 1) { glow(BX, fy, 300, 'rgba(255,230,150,1)', 0.9); ctx.globalAlpha = 0.9; ctx.fillStyle = '#fff4c4'; ctx.fillRect(BX - 440, fy - 4, 880, 10); ctx.globalAlpha = 1; } }
    if (reheat > 0) glow(BX - 160, BT + 220, 360, 'rgba(255,110,40,1)', 0.55 * reheat);
    // трещина от удара воды
    const ck = sm(fade(t, EV.bell_crack - 0.03, EV.bell_crack + 0.08));
    if (ck > 0) { const n = Math.max(2, Math.ceil(CRACK.length * ck)); const P = CRACK.slice(0, n).concat(ck > 0.95 ? CHUNK.slice(0, 3) : []);
      pencil(P, { w: 8, col: '#0e0804', pass2: false, gap: false }); if (t < EV.bell_chunk + 0.4) { pencil(P, { w: 3, col: '#ffe0a0', a: 0.9, pass2: false, gap: false }); glow(P[n - 1][0], P[n - 1][1], 90, 'rgba(255,200,120,1)', 0.6); }
      if (!broken) pencil(CHUNK.concat([CHUNK[0]]), { w: 3, col: '#0e0804', a: ck, pass2: false }); }
    if (broken) { wash(chunkPath, '#120a06', 1); ctx.save(); ctx.clip(chunkPath); vgrad(BT + 600, BT + 940, ['#2a1a10', '#0a0604']); glow(BX + 330, BT + 900, 160, 'rgba(255,150,60,1)', 0.3); ctx.restore(); pencil(CHUNK.concat([CHUNK[0]]), { w: 3, col: '#0a0604', pass2: false }); }
    ctx.restore();
    // контур, контровой от печи, ушки (корона)
    pencil(bellPts, { w: 3.6, col: '#120a04', key: 52 });
    pencil(bellPts.filter(([x, y]) => x < BX - 60 && y > BT + 20), { w: 4, col: '#ff9a40', a: 0.55, pass2: false, gap: false });
    for (const dx of [-70, 0, 70]) { const p = []; for (let a = 0; a <= 14; a++) { const q = Math.PI + a / 14 * Math.PI; p.push([BX + dx + Math.cos(q) * 30, BT - 18 + Math.sin(q) * 50]); } pencil(p, { w: 9, col: fillK > 0.98 ? hotCol(T * 0.9) : '#3a2a18', pass2: false }); pencil(p, { w: 3, col: '#120a04', a: 0.6, pass2: false }); }
  }
  function chunkPiece(t) {                        // отколотый кусок: падает на доску рядом с Томом
    if (t < EV.bell_chunk) return; const f = clamp((t - EV.bell_chunk) / (EV.bell_chunkLand - EV.bell_chunk));
    const cx = BX + 300, cy = BT + 800, tx = 640, ty = 1408 + plankSag(t, 640);
    const x = lerp(cx, tx, f), y = lerp(cy, ty, f * f), rot = -1.1 * sm(f);
    push(x, y, 1, rot); ctx.translate(-cx, -cy);
    const p = poly(CHUNK, { wash: '#6a4c2a', washA: 1, w: 3.4, col: '#120a04', shade: { gap: 7, a: 0.35, col: '#1a1008', ang: 1.3 } });
    ctx.save(); ctx.clip(p.path); glow(cx - 40, cy - 60, 120, 'rgba(200,160,100,1)', 0.35); ctx.restore();
    pencil([[BX + 230, BT + 780], [BX + 330, BT + 770]], { w: 2.4, col: '#1e140a', a: 0.7, pass2: false });
    pop();
    if (t > EV.bell_chunkLand && t < EV.bell_chunkLand + 0.5) { const q = (t - EV.bell_chunkLand) / 0.5; for (let i = 0; i < 9; i++) { const r = rng(i + 70), a = -Math.PI * r(); ell(tx + Math.cos(a) * 120 * q, ty - 20 + Math.sin(a) * 70 * q + 120 * q * q, 26 * (1 - q * 0.5), 18, { wash: '#7a6450', washA: 0.7 * (1 - q), w: 1.4, a: 0.4 * (1 - q) }); } }
  }
  function furnace(x, y, s, t, seed) {            // плавильная печь: кирпичный купол, жерло с огнём, дым
    push(x, y, s);
    const p = blob([[-150, 0], [-140, -150], [-80, -230], [0, -250], [80, -230], [140, -150], [150, 0]], { wash: '#6a3424', washA: 1, w: 3, col: '#1a0a06', shade: { gap: 7, a: 0.35, col: '#1a0804', ang: 1.2 } });
    ctx.save(); ctx.clip(p.path); ctx.strokeStyle = 'rgba(20,8,4,0.45)'; ctx.lineWidth = 1.6; ctx.beginPath(); for (let yy = -240; yy < 0; yy += 22) { ctx.moveTo(-160, yy); ctx.lineTo(160, yy); } ctx.stroke(); glow(60, -100, 160, 'rgba(255,120,40,1)', 0.35); ctx.restore();
    const fl = 0.8 + 0.2 * Math.sin(t * 23 + seed);
    const m = blob([[-56, 0], [-50, -70], [0, -96], [50, -70], [56, 0]], { wash: '#ffcf6a', washA: 1, w: 2.6, col: '#1a0a06' });
    ctx.save(); ctx.clip(m.path); glow(0, -20, 90, 'rgba(255,250,210,1)', fl); for (let k = 0; k < 5; k++) { const r = rng(hsh(FRAME, k, seed)); blob([[-30 + k * 14, 0], [-20 + k * 14 + (r() - 0.5) * 20, -50 - r() * 30], [-8 + k * 14, 0]], { wash: k % 2 ? '#ff7a2a' : '#ffe08a', washA: 0.9, line: false }); } ctx.restore();
    glow(0, -40, 260, 'rgba(255,140,50,1)', 0.45 * fl);
    rect(-26, -330, 52, 90, { wash: '#5a2a1c', washA: 1, w: 2.6, col: '#1a0a06' });
    for (let k = 0; k < 5; k++) { const ph = (t * 0.45 + k / 5 + seed * 0.13) % 1; glow(Math.sin(ph * 6 + seed) * 40, -340 - ph * 500, 50 + ph * 150, 'rgba(70,60,60,1)', 0.55 * (1 - ph), 'source-over'); }
    pop();
  }
  function worker(x, y, s, t, ph, pole) {         // рабочий-силуэт с шестом (мешает бронзу / шурует печь)
    push(x, y, s); const ink = '#1a0e08', sw = Math.sin(t * 3 + ph) * 0.2;
    for (const dx of [-12, 12]) line([[dx, -60], [dx * 1.4, 0]], { w: 12, col: ink, smooth: false });
    sil([[-26, -60], [-30, -140], [-16, -160], [16, -160], [30, -140], [26, -60]], ink, 1); ell(0, -176, 16, 18, { wash: ink, washA: 1, line: false }); ell(0, -190, 22, 8, { wash: ink, washA: 1, line: false });
    if (pole) { push(10, -130, 1, -0.9 + sw); line([[0, 0], [190, 0]], { w: 6, col: ink, smooth: false }); pop(); }
    pop();
  }
  function ivanTower(t) {                         // колокольня «Иван Великий» (1508, белёная) — ориентир Ивановской площади
    const x = 950; const tiers = [[740, 560, 92], [560, 420, 78], [420, 300, 64], [300, 250, 50]];
    for (const [y0, y1, w] of tiers) { const p = pathOf([[x - w, y0], [x - w, y1], [x + w, y1], [x + w, y0]]); wash(p, '#d8ccb8', 1); ctx.save(); ctx.clip(p); ctx.fillStyle = 'rgba(30,20,40,0.35)'; ctx.fillRect(x + w * 0.3, y1, w, y0 - y1); ctx.restore();
      for (const dx of [-w * 0.45, 0, w * 0.45]) { const ap = []; for (let a = 0; a <= 8; a++) ap.push([x + dx + Math.cos(Math.PI + a / 8 * Math.PI) * w * 0.14, y1 + 40 + Math.sin(Math.PI + a / 8 * Math.PI) * 16]); wash(pathOf([...ap, [x + dx + w * 0.14, y1 + 80], [x + dx - w * 0.14, y1 + 80]]), '#2a1e2a', 0.9); }
      pencil([[x - w, y0], [x - w, y1], [x + w, y1], [x + w, y0]], { w: 2, col: '#3a2a30', a: 0.7, pass2: false }); }
    const dp = []; for (let a = 0; a <= 16; a++) { const q = a / 16, ang = Math.PI * (1 + q); dp.push([x + Math.cos(ang) * 46, 250 + Math.sin(ang) * 66 - Math.pow(Math.sin(q * Math.PI), 10) * 26]); }
    const d = pathOf([[x - 46, 250], ...dp, [x + 46, 250]]); wash(d, '#d9a640', 1); ctx.save(); ctx.clip(d); glow(x - 18, 210, 30, 'rgba(255,240,180,1)', 0.8); ctx.restore(); pencil(dp, { w: 2, col: '#5a3a10', pass2: false });
    pencil([[x, 160], [x, 110]], { w: 3, col: '#c99636', pass2: false }); pencil([[x - 14, 128], [x + 14, 128]], { w: 2.4, col: '#c99636', pass2: false });
    glow(x, 700, 220, 'rgba(255,130,50,1)', 0.25);
  }
  function burningBeam(t) {                      // горящая балка: падает сверху, ложится на плечо колокола
    if (t < EV.bell_beam) return; const f = clamp((t - EV.bell_beam) / (EV.bell_beamLand - EV.bell_beam)), land = t >= EV.bell_beamLand;
    const bounce = land ? Math.exp(-(t - EV.bell_beamLand) * 8) * Math.sin((t - EV.bell_beamLand) * 30) * 0.05 : 0;
    const px = lerp(-200, 70, f), py = lerp(-450, 1150, f * f), rot = lerp(-0.5, 0.6, sm(f)) + bounce;
    push(px, py, 1, rot);
    const b = rect(-40, -420, 80, 520, { wash: '#3a2214', washA: 1, w: 3, col: '#0e0602', shade: { gap: 6, a: 0.45, col: '#0a0402', ang: 0.2 } });
    for (let k = 0; k < 6; k++) pencil([[-30, -380 + k * 80], [30, -360 + k * 80]], { w: 2, col: '#ff7a2a', a: 0.6, pass2: false });
    for (let k = 0; k < 8; k++) { const r = rng(hsh(FRAME, k, 3)), y = -400 + k * 62, h = 60 + r() * 70; const fp = [[-40, y + 20], [-30 - r() * 30, y - h * 0.5], [-8 + (r() - 0.5) * 20, y - h], [10, y - h * 0.4], [36 + r() * 20, y - h * 0.7], [40, y + 20]];
      blob(fp, { wash: k % 2 ? '#ff8a2a' : '#ffd060', washA: 0.92, w: 1.6, col: '#a8301a', a: 0.5 }); }
    glow(0, -160, 260, 'rgba(255,140,40,1)', 0.6);
    pop();
    if (land && t < EV.bell_beamLand + 0.6) { const q = (t - EV.bell_beamLand) / 0.6, r = rng(31); for (let i = 0; i < 24; i++) { const a = -Math.PI * r(), v = 200 + r() * 500; glow(290 + Math.cos(a) * v * q, 800 + Math.sin(a) * v * q + 900 * q * q, 10, 'rgba(255,220,120,1)', 1 - q); } }
  }
  function water(t) {                             // ведро воды по дуге из-за кадра справа → удар о раскалённый бок, пар
    const t0 = EV.bell_water, hit = EV.bell_crack - 0.04; if (t < t0) return;
    const hx = BX + 150, hy = BT + 300;
    if (t < hit + 0.12) { const f = clamp((t - t0) / (hit - t0)); const P = []; for (let i = 0; i <= 14; i++) { const q = i / 14 * f; P.push([lerp(1180, hx, q), lerp(380, hy, q) - Math.sin(q * Math.PI) * 220]); }
      for (let w = 0; w < 3; w++) pencil(P.map(([x, y], i) => [x, y + (w - 1) * 10 * (i / 14)]), { w: 16 - w * 4, col: w === 1 ? '#e8f4ff' : '#7fb8e0', a: 0.85, pass2: false, gap: false });
      for (let i = 0; i < 10; i++) { const r = rng(hsh(FRAME, i, 9)), p = P[Math.floor(r() * P.length)]; ell(p[0] + (r() - 0.5) * 40, p[1] + (r() - 0.5) * 30, 5, 7, { wash: '#cfe8ff', washA: 0.9, line: false }); } }
    if (t > hit) { const q = clamp((t - hit) / 0.9); for (let i = 0; i < 12; i++) { const r = rng(i + 400), a = -Math.PI * (0.1 + 0.8 * r()), d = (60 + r() * 220) * sm(q * 1.5), rr = (40 + r() * 60) * (0.6 + q);
        ell(hx + Math.cos(a) * d, hy + Math.sin(a) * d - q * 160, rr, rr * 0.8, { wash: '#f4f0ea', washA: 0.85 * (1 - q), w: 1.6, col: '#a8a098', a: 0.5 * (1 - q) }); }
      if (q < 0.3) glow(hx, hy, 200, 'rgba(255,255,255,1)', 0.8 * (1 - q / 0.3)); }
  }
  function weight(t) {                            // гиря «200 т»
    const t0 = EV.bell_ton - 0.28; if (t < t0) return; const f = clamp((t - t0) / 0.28), x = 1060, y = lerp(-200, 1450 + plankSag(t, x), f * f);
    push(x, y, 1, f < 1 ? 0.12 * (1 - f) : 0);
    const body = blob([[-110, 0], [-124, -90], [-90, -160], [90, -160], [124, -90], [110, 0]], { wash: '#2e2a28', washA: 1, w: 3.4, col: '#0a0806', shade: { gap: 6, a: 0.4, col: '#000', ang: 1.2 } });
    ctx.save(); ctx.clip(body.path); glow(-60, -110, 90, 'rgba(255,170,90,1)', 0.35); ctx.restore();
    const hp = []; for (let a = 0; a <= 16; a++) { const q = Math.PI + a / 16 * Math.PI; hp.push([Math.cos(q) * 70, -160 + Math.sin(q) * 80]); } pencil(hp, { w: 22, col: '#2e2a28', pass2: false }); pencil(hp, { w: 3, col: '#0a0806', pass2: false, a: 0.7 });
    txt('200 т', 0, -78, 64, { col: '#f6e7c8', font: 'Osw' });
    pop();
    if (f >= 1 && t < EV.bell_ton + 0.45) { const q = (t - EV.bell_ton) / 0.45; for (let k = 0; k < 9; k++) { const a = Math.PI + k / 8 * Math.PI; pencil([[x + Math.cos(a) * (130 + q * 60), 1440 + Math.sin(a) * (40 + q * 40)], [x + Math.cos(a) * (170 + q * 120), 1440 + Math.sin(a) * (60 + q * 70)]], { w: 4, col: '#f6e7c8', a: 1 - q, pass2: false }); }
      for (let i = 0; i < 8; i++) { const r = rng(i + 90); ell(x + (r() - 0.5) * 300 * (0.4 + q), 1430 - q * 80 * r(), 30 + q * 30, 20, { wash: '#8a7a68', washA: 0.6 * (1 - q), line: false }); } }
  }
  function plank(t) {                             // настил над ямой: доска с прогибом, стойки
    for (const x of [620, 1130]) { line([[x, 1480], [x + 6, 2000]], { w: 26, col: '#4a2c16', smooth: false }); line([[x - 10, 1480], [x - 6, 2000]], { w: 3, col: '#ffb060', a: 0.35, smooth: false, pass2: false }); }
    const top = [], bot = []; for (let x = 540; x <= 1220; x += 20) { const s = plankSag(t, x); top.push([x, 1450 + s]); bot.push([x, 1494 + s]); }
    const p = poly(top.concat(bot.reverse()), { wash: '#7a5230', washA: 1, w: 3, col: '#1a0c04', shade: { gap: 6, a: 0.35, col: '#2a1408', ang: 0.08 } });
    pencil(top, { w: 3, col: '#ffc070', a: 0.5, pass2: false, gap: false });
    for (const x of [700, 980]) { const s = plankSag(t, x); ell(x, 1472 + s, 4, 4, { wash: '#1a0c04', washA: 1, line: false }); }
  }

  // ---------------------------------------------------------------- мир
  WORLD.bell = (t, u, cat) => {
    const fire = fade(t, EV.bell_beam, EV.bell_beamLand);
    lay(40, () => { vgrad(-900, 1300, ['#140e24', '#3a2238', '#8a3a24']); for (let i = 0; i < 40; i++) { const r = rng(i + 7); ctx.fillStyle = '#f6e7c8'; ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 2 + i)); ctx.fillRect(r() * W, r() * 500 - 100, 2, 2); } ctx.globalAlpha = 1;
      glow(540, 800, 900, 'rgba(255,110,40,1)', 0.35 + fire * 0.25); });
    lay(9, () => { ivanTower(t); });
    haze('#5a2a24', 0.14);
    lay(4, () => { const e = pathOf([[-900, 580], [W + 900, 576], [W + 900, 700], [-900, 700]]); wash(e, '#2a1810', 1);
      furnace(1010, 590, 0.6, t, 2); worker(260, 584, 0.8, t, 0, true); worker(760, 584, 0.8, t, 2, true); worker(560, 584, 0.7, t, 4, false);
      for (let k = 0; k < 6; k++) { const ph = (t * 0.3 + k / 6) % 1; glow(100 + k * 180, 560 - ph * 500, 80 + ph * 200, 'rgba(60,40,40,1)', 0.45 * (1 - ph), 'source-over'); } });
    haze('#4a1a14', 0.08);
    lay(2.2, () => {                              // стенка ямы: земля + обшивка брёвнами, жар снизу
      const pw = pathOf([[-900, 600], [W + 900, 600], [W + 900, 2400], [-900, 2400]]); wash(pw, '#3a2416', 1);
      for (let y = 620; y < 1900; y += 64) { const r = rng(y); line([[-900, y + r() * 6], [W + 900, y + r() * 6]], { w: 4, col: '#1a0c06', smooth: false, a: 0.8 }); ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#6a4228'; ctx.fillRect(-900, y + 6, W + 1800, 22); ctx.restore(); }
      for (const x of [-60, 260, 580, 900, 1200]) line([[x, 600], [x + 6, 1900]], { w: 16, col: '#2a1608', smooth: false });
      vgrad(600, 1900, ['rgba(20,8,4,0.55)', 'rgba(255,110,40,0.0)', 'rgba(255,120,40,0.25)']);
      for (const [x0, x1] of [[60, 140], [700, 780]]) { line([[x0, 640], [x0, 1600]], { w: 12, col: '#4a2c16', smooth: false }); line([[x1, 640], [x1, 1600]], { w: 12, col: '#4a2c16', smooth: false }); for (let y = 700; y < 1600; y += 200) { line([[x0 - 30, y], [x1 + 30, y]], { w: 9, col: '#5a3820', smooth: false }); line([[x0, y + 10], [x1, y + 190]], { w: 5, col: '#3a2410', smooth: false, a: 0.8 }); } }
    });
    lay(1.3, () => {
      line([[-200, 470], [1300, 462]], { w: 30, col: '#4a2c16', smooth: false }); line([[-200, 456], [1300, 448]], { w: 4, col: '#ffb060', a: 0.3, smooth: false, pass2: false });   // перекладина-матица
      for (const dx of [-70, 70]) pencil([[BX + dx, 470], [BX + dx * 0.9, BT - 50]], { w: 5, col: '#2a2420', pass2: false, gap: false });
      furnace(30, 560, 0.85, t, 1);
      const pourK = 1 - fade(t, EV.bell_fill1 - 0.1, EV.bell_fill1 + 0.15);   // жёлоб с бронзой, струя в литник
      const tr = [[110, 470], [380, 520]]; line([[110, 488], [384, 538]], { w: 26, col: '#3a2416', smooth: false });
      if (pourK > 0) { pencil(tr, { w: 12, col: '#ffcf60', pass2: false, gap: false }); pencil(tr, { w: 5, col: '#fff8d8', pass2: false, gap: false }); glow(250, 495, 200, 'rgba(255,170,60,1)', 0.6 * pourK);
        const sx = 390 + Math.sin(t * 13) * 3; pencil([[384, 524], [sx, 548], [BX - 6, BT - 12]], { w: 14 * pourK, col: '#ffd070', pass2: false, gap: false }); pencil([[384, 524], [sx, 548], [BX - 6, BT - 12]], { w: 5 * pourK, col: '#fffbe6', pass2: false, gap: false });
        for (let i = 0; i < 14; i++) { const r = rng(hsh(FRAME, i, 77)), a = -Math.PI * r(), v = 60 + r() * 160; glow(BX + Math.cos(a) * v * r(), BT - 20 + Math.sin(a) * v * r(), 6, 'rgba(255,230,140,1)', 0.9); } }
      bell(t);
      burningBeam(t); water(t);
    });
    lay(1, () => {
      vgrad(1500, 1920, ['rgba(10,4,2,0)', 'rgba(10,4,2,0.6)']);
      plank(t);
      push(1160, 1450 + plankSag(t, 1160), 1); poly([[-36, -70], [36, -70], [30, 0], [-30, 0]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#1a0c04' }); for (const y of [-56, -16]) line([[-36, y], [36, y]], { w: 3, col: '#2a1a0c', smooth: false }); ell(0, -70, 34, 7, { wash: '#4a7aa0', washA: 1, w: 1.6 }); pop();
      weight(t); chunkPiece(t);
      cat();
      if (t > EV.bell_tap && t < EV.bell_beam + 0.15) { const k = popK(t, EV.bell_tap, 0.2), a = clamp((EV.bell_beam + 0.15 - t) / 0.15); push(640, 1110, 0.8 + 0.2 * k, -0.08); txt('тук.', 0, 0, 72, { col: '#f6e7c8', a: 0.97 * a }); for (let i = 0; i < 3; i++) pencil([[56 + i * 4, -36 + i * 20], [74 + i * 10, -44 + i * 24]], { w: 2.6, col: '#f6e7c8', a: 0.85 * a, pass2: false }); pop(); }
    });
    lay(0.6, () => {                              // передний план: искры, пепел, стойка лесов
      line([[-30, -200], [-20, 2200]], { w: 60, col: '#1a0c06', smooth: false }); line([[8, -200], [14, 2200]], { w: 4, col: '#ff9a50', a: 0.4, smooth: false, pass2: false });
      for (let y = 300; y < 2000; y += 360) line([[-60, y], [90, y + 30]], { w: 10, col: '#2a1608', smooth: false });
    });
    motes(60, [0, 200, W, 1900], '#ffc070', t, 33, { sp: -60, sz: 2.4, a: 0.85, add: 1, wob: 30, tw: 1 });
    if (t > EV.bell_beamLand) motes(40, [0, 0, W, 1900], '#ff9a40', t, 34, { sp: -120, sz: 3.2, a: 0.8, add: 1, wob: 50, tw: 1 });
  };

  // ---------------------------------------------------------------- режиссура
  DIR.bell = {
    outfit: 'founder', light: { side: -1, rim: '#ff9a40' }, grade: ['#8a3a10', 0.24],
    act: () => [[S0.bell, 'awe'], [LF('k1', 0.15), 'proud'], [WT('k1', 'двести'), 'grin'], [EV.bell_ton, 'shock'], [WT('k1', 'ни'), 'suspicious'],
      [EV.bell_tap + 0.12, 'sideeye'], [EV.bell_beam + 0.12, 'scared'], [EV.bell_crack, 'shock'], [EV.bell_chunkLand + 0.06, 'annoyed']],
    pose: (t, u, b) => {
      const o = { x: 860, y: 1450 + plankSag(t, 860), s: 1.1, flip: true, look: [0.5, -0.45] };
      if (t < WT('k1', 'двести')) { o.point = true; o.hand = [150, -310]; }
      else if (t < WT('k1', 'ни')) { const j = t > EV.bell_ton ? Math.max(0, Math.sin((t - EV.bell_ton) * 9)) * 70 * Math.exp(-(t - EV.bell_ton) * 3) : 0; o.y -= j;
        if (t > EV.bell_ton) { o.hand = [100, -300]; o.handF = [-100, -300]; o.tailUp = true; o.look = [-0.5, 0.2]; } else { o.hand = [120, -240]; o.look = [-0.6, -0.1]; } }
      else if (t < EV.bell_beam) {                // молоточек: замах — «тук» — взгляд в камеру
        const a = fade(t, EV.bell_tap - 0.3, EV.bell_tap - 0.08), hit = fade(t, EV.bell_tap - 0.08, EV.bell_tap);
        o.hand = [lerp(lerp(80, 110, a), 150, hit), lerp(lerp(-200, -330, a), -250, hit)]; o.look = [0.7, -0.1];
        if (t > EV.bell_tap + 0.12) { o.look = [-0.8, 0.05]; o.hand = [130, -246]; }
      } else if (t < EV.bell_chunkLand) { o.hand = [60, -320]; o.handF = [-120, -300]; o.rot = 0.08; o.x = 880; o.look = [0.4, -0.5]; o.tailUp = true; }
      else { const j = Math.max(0, Math.sin((t - EV.bell_chunkLand) * 10)) * 40 * Math.exp(-(t - EV.bell_chunkLand) * 4); o.y -= j; o.x = 880; o.look = [0.6, 0.35]; o.hand = [70, -200]; }
      return Object.assign(b, o);
    },
    afterCat: (t, u, P) => {                      // молоточек в лапе (с «тук»)
      if (t < WT('k1', 'ни') || t > EV.bell_beam + 0.1) return; const h = P.hand || [80, -150];
      const hit = fade(t, EV.bell_tap - 0.08, EV.bell_tap), wind = fade(t, EV.bell_tap - 0.3, EV.bell_tap - 0.08);
      push(P.x, P.y, P.s, 0, -1); push(h[0] + 4, h[1] - 6, 1, lerp(lerp(-0.4, -1.4, wind), 0.2, hit));
      line([[0, 10], [0, -70]], { w: 7, col: '#8a5a30', smooth: false }); rect(-22, -88, 44, 22, { wash: '#4a4a50', washA: 1, w: 2.2, col: '#0e0e10' }); pop(); pop();
    },
    cam: () => [[S0.bell, 540, 960, -0.22], [S0.bell + 0.9, 520, 960, -0.12], [WT('k1', 'двести') - 0.1, 580, 980, -0.1], [EV.bell_ton, 640, 1020, -0.02], [EV.bell_ton + 0.3, 600, 1000, -0.1],
      [EV.bell_tap - 0.35, 720, 1100, 0.1], [EV.bell_tap + 0.15, 740, 1100, 0.14], [EV.bell_beam + 0.12, 560, 980, -0.14, 'x'], [S1.bell, 560, 980, -0.12]],
    hud: t => {
      if (t < S0.bell || t > S1.bell + 0.4) return;
      if (t > EV.bell_tap && t < EV.bell_beam + 0.2) {   // «тук.» — от руки, в экранных координатах у точки удара
        note('(ожидалось: БО-О-ОМ)', 540, 470, t, EV.bell_tap + 0.1, EV.bell_beam + 0.15, '#f6e7c8', 46, -0.04);
      }
    }
  };

  // ---------------------------------------------------------------- переход В сцену: литьё — расплав заливает кадр, остывает, лопается плитами
  const TILES = (() => { const r = rng(1735), nx = 5, ny = 8, G = []; for (let j = 0; j <= ny; j++) { G.push([]); for (let i = 0; i <= nx; i++) { const ed = i === 0 || i === nx || j === 0 || j === ny; G[j].push([i * W / nx + (ed && (i === 0 || i === nx) ? 0 : (r() - 0.5) * 120), j * H / ny + (ed && (j === 0 || j === ny) ? 0 : (r() - 0.5) * 140)]); } }
    const T = []; for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const P = [G[j][i], G[j][i + 1], G[j + 1][i + 1], G[j + 1][i]].map(p => [p[0] + (i === 0 && p === G[j][i] ? -20 : 0), p[1]]);
      const cx = P.reduce((a, p) => a + p[0], 0) / 4, cy = P.reduce((a, p) => a + p[1], 0) / 4; T.push({ P, cx, cy, d: Math.hypot(cx - 540, cy - 960) / 1100, sp: r() - 0.5, sh: r() }); } return T; })();
  function metalFill(path, T, x0, y0, x1, y1) {   // металл: горячий (бело-оранжевый) → остывшая бронза
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, lerpC('#8a6a3a', '#fff2b8', T)); g.addColorStop(0.35, lerpC('#5e4426', '#ffae40', T)); g.addColorStop(1, lerpC('#3a2814', '#d8541a', T));
    ctx.save(); ctx.clip(path); ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.restore();
  }
  TRANS_IN.bell = { a: 0.35, b: 0.55, fx(k, t, A, B) {
    const flood = sm(clamp((k - 0.06) / 0.42)), T = 1 - sm(clamp((k - 0.5) / 0.18)), crackK = clamp((k - 0.64) / 0.06);
    if (k < 0.66) drawBuf(A); else drawBuf(B);
    scr(() => {
      if (k < 0.66) {
        const L = lerp(H + 60, -80, flood), surf = []; for (let x = -20; x <= W + 20; x += 20) surf.push([x, L + Math.sin(x * 0.02 + t * 9) * 16 * (1 - flood * 0.6) + Math.sin(x * 0.051 - t * 6) * 8]);
        const fp = pathOf([...surf, [W + 20, H + 40], [-20, H + 40]]); metalFill(fp, T, 0, Math.max(-100, L - 40), W, H + 40);
        if (T > 0.3) { pencil(surf, { w: 8, col: '#fff8d8', a: 0.8 * T, pass2: false, gap: false }); ctx.save(); ctx.clip(fp); for (let i = 0; i < 10; i++) { const r = rng(i + 3); glow(r() * W, L + 60 + r() * 900, 160 + r() * 200, 'rgba(255,240,170,1)', 0.35 * T); } ctx.restore(); }
        else { ctx.save(); ctx.clip(fp); const r = rng(9); for (let i = 0; i < 60; i++) { const x = r() * W, y = r() * H; ctx.globalAlpha = 0.25; ctx.fillStyle = r() < 0.5 ? '#c8a060' : '#1a1008'; ctx.beginPath(); ctx.ellipse(x, y, 20 + r() * 40, 10 + r() * 20, r() * 3, 0, 6.3); ctx.fill(); } ctx.restore(); }
        const sw = (60 + 90 * clamp(k / 0.3)) * clamp((0.5 - k) / 0.08);      // струя сверху
        if (sw > 1) { const P = []; for (let y = -40; y <= L + 20; y += 30) P.push([540 + Math.sin(y * 0.008 + t * 4) * 30, y]);
          const sp = pathOf([...P.map(([x, y]) => [x - sw / 2 - Math.sin(y * 0.03 + t * 10) * 6, y]), ...P.slice().reverse().map(([x, y]) => [x + sw / 2 + Math.sin(y * 0.027 - t * 9) * 6, y])]);
          const g = ctx.createLinearGradient(540 - sw, 0, 540 + sw, 0); g.addColorStop(0, '#d8541a'); g.addColorStop(0.35, '#ffcf60'); g.addColorStop(0.5, '#fffbe8'); g.addColorStop(0.65, '#ffcf60'); g.addColorStop(1, '#d8541a');
          ctx.save(); ctx.fillStyle = g; ctx.fill(sp); ctx.restore(); glow(540, L, 420, 'rgba(255,200,90,1)', 0.8); glow(540, 400, 300, 'rgba(255,200,90,1)', 0.4);
          for (let i = 0; i < 40; i++) { const r = rng(hsh(FRAME, i, 15)), a = -Math.PI * (0.1 + 0.8 * r()), v = 100 + r() * 600, q = r(); glow(540 + Math.cos(a) * v * q, L + Math.sin(a) * v * q + 300 * q * q, 6 + r() * 8, 'rgba(255,236,160,1)', 1 - q); } }
      } else {                                    // остывшая бронзовая корка лопается на плиты и осыпается, открывая яму
        TILES.forEach(tl => { const d0 = 0.7 + tl.d * 0.16, f = clamp((k - d0) / 0.22); if (f >= 1) return;
          const dy = 2600 * f * f, rot = tl.sp * 1.6 * f, sc = 1 - 0.1 * f;
          ctx.save(); ctx.translate(tl.cx + tl.sp * 200 * f, tl.cy + dy); ctx.rotate(rot); ctx.scale(sc, sc); ctx.translate(-tl.cx, -tl.cy);
          const p = pathOf(tl.P); metalFill(p, 0.12 * (1 - tl.sh), 0, tl.cy - 260, W, tl.cy + 260);
          ctx.save(); ctx.clip(p); glow(tl.cx - 60, tl.cy - 60, 200, 'rgba(220,180,110,1)', 0.25 + tl.sh * 0.2); ctx.restore();
          pencil(tl.P.concat([tl.P[0]]), { w: 4, col: '#120a04', pass2: false, gap: false });
          if (f < 0.4) pencil(tl.P.concat([tl.P[0]]), { w: 2, col: '#ff9a40', a: (1 - f / 0.4) * crackK, pass2: false, gap: false });
          ctx.restore(); });
      }
    });
  } };
})();
