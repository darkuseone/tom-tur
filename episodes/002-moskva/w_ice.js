/* 002 · сцена ice — −150 000 лет, московское оледенение. Фронт ледника (голубые трещины, слоистость, сераки), пурга,
   морена с чужими северными гранитами; валун едет на льду и тормозит в сантиметре от Тома; флэш-вперёд в «протаявшем окне»:
   тот же валун сегодня в Коломенском (Голосов овраг, церковь Вознесения 1532), табличка «Девий камень».
   Переход В сцену: пузыри замерзают в снежинки, кадр промерзает инеем с краёв, из белизны — пурга. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const WW = (k, w) => { const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const all = c.words.join(' ').length; let off = 0; for (const x of c.words) { if (nrm(x) === nrm(w)) break; off += x.length + 1; }
    return c.t0 + (c.t1 - c.t0) * off / all; };

  EV.ice_wall = WW('i1', 'ледник');                    // ледяная стена рывком надвигается
  EV.ice_drag = WW('i1', 'приволок');                  // валун поехал на льду
  EV.ice_stop = WW('i1', 'валуны.') + 0.3;             // валун тормозит у самого носа Тома
  EV.ice_window = WW('i1', 'Один') + 0.05;             // иней протаивает окном в 2026
  EV.ice_kolo = WW('i1', 'Коломенском!');              // Том показывает лапой, подмигивает
  SHAKES.push([EV.ice_wall, 0.6, 16], [EV.ice_drag + 0.1, 0.9, 5], [EV.ice_stop, 0.45, 22]);
  KEYW.push('ледник', 'валуны.', 'Коломенском!');

  const ln = (P, w, col, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w / S; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); ctx.restore(); };
  const dot = (x, y, r, col, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, Math.max(0.2, r), 0, 6.3); ctx.fill(); ctx.restore(); };
  const TX = 330, BR = 205, BSTOP = TX + 150 + BR * 1.15;   // Том и точка остановки валуна

  // ---------------------------------------------------------------- гранитный валун (северный, «чужой»): розово-серый, крапчатый
  function granite(x, y, r, seed, o = {}) {
    const rr = rng(seed), pts = []; for (let i = 0; i <= 14; i++) { const a = Math.PI + i / 14 * Math.PI, R = r * (0.84 + rr() * 0.22); pts.push([x + Math.cos(a) * R * 1.12, y + Math.sin(a) * R * 1.02]); }
    pts.push([x + r * 1.1, y + 4], [x - r * 1.1, y + 4], pts[0]);
    const p = shape(pts, { wash: o.col || '#b49a90', washA: 1, w: 3.4, col: '#1e1618' });
    ctx.save(); ctx.clip(p.path);
    const g = ctx.createLinearGradient(x - r, y - r, x + r, y); g.addColorStop(0, 'rgba(255,240,235,0.35)'); g.addColorStop(1, 'rgba(40,30,40,0.45)'); ctx.fillStyle = g; ctx.fillRect(x - r * 1.3, y - r * 1.1, r * 2.6, r * 1.2);
    const q = rng(seed * 7); for (let i = 0; i < r * 5; i++) { const px = x + (q() - 0.5) * r * 2.3, py = y - q() * r * 1.05, c = q(); dot(px, py, 1 + q() * Math.min(3.2, r * 0.02), c < 0.4 ? '#2e262c' : c < 0.7 ? '#c99a94' : '#efe8e2', 0.7); }
    for (let i = 0; i < 3; i++) ln([[x - r * 0.9 + i * r * 0.5, y - r * 0.2 - i * 10], [x - r * 0.4 + i * r * 0.6, y - r * 0.6], [x + i * r * 0.4, y - r * 0.5 - i * 8]], 3, '#efe6e2', 0.35);   // кварцевые жилы
    ctx.restore();
    hatch(p.path, p.bb, { gap: 9, a: 0.25, col: '#2a2030', ang: 0.8, key: seed });
    ln([[x - r * 0.5, y - r * 0.75], [x - r * 0.1, y - r * 0.55], [x + r * 0.35, y - r * 0.8]], 2, '#ffffff', 0.45);
    if (o.snow !== false) blob([[x - r * 0.9, y - r * 0.62], [x - r * 0.5, y - r * 0.92], [x + r * 0.1, y - r * 0.98], [x + r * 0.7, y - r * 0.8], [x + r * 0.5, y - r * 0.66], [x - r * 0.2, y - r * 0.74]], { wash: '#f4f8fb', washA: 0.95, w: 2, col: '#7f9cb8' });
    if (o.moss) for (let i = 0; i < 9; i++) { const m = rng(seed + i * 3); dot(x + (m() - 0.5) * r * 1.6, y - m() * r * 0.4, 6 + m() * 10, '#6a8a3a', 0.6); }
    return p;
  }
  // ---------------------------------------------------------------- фронт ледника
  function glacierFront(t, lurch) {
    const r = rng(51), dy = 0;
    const top = []; for (let x = -900; x <= W + 900; x += 60) { const s = Math.floor((x + 900) / 120) % 2; top.push([x, 520 + Math.sin(x * 0.006) * 50 + (s ? -40 : 30) + (r() - 0.5) * 50]); }
    const wall = top.concat([[W + 900, 1320], [-900, 1320]]), wp = pathOf(wall);
    const g = ctx.createLinearGradient(0, 460, 0, 1320); g.addColorStop(0, '#f6fbfd'); g.addColorStop(0.35, '#cfe6f2'); g.addColorStop(0.65, '#7fb0d4'); g.addColorStop(1, '#3a6e9e');
    ctx.save(); ctx.fillStyle = g; ctx.fill(wp); ctx.restore();
    ctx.save(); ctx.clip(wp);
    for (let k = 0; k < 10; k++) { const y = 640 + k * 68, sp = []; for (let x = -900; x <= W + 900; x += 60) sp.push([x, y + Math.sin(x * 0.005 + k) * 16 + x * 0.03]); ln(sp, k % 3 === 0 ? 7 : 2.5, k % 3 === 0 ? '#6a6a70' : '#ffffff', k % 3 === 0 ? 0.35 : 0.5); }   // слоистость + полосы морены
    for (let k = 0; k < 9; k++) { const x = -700 + k * 300 + (r() - 0.5) * 120, w = 30 + r() * 50, y0 = 600 + r() * 380, y1 = 1320, P = [[x - w, y1]];
      for (let i = 1; i < 6; i++) { const q = i / 6; P.push([x - w * (1 - q) + (r() - 0.5) * 14, lerp(y1, y0, q)]); } P.push([x + 4, y0 - 10]);
      for (let i = 5; i >= 1; i--) { const q = i / 6; P.push([x + w * 0.8 * (1 - q) + (r() - 0.5) * 14, lerp(y1, y0, q) + 12]); } P.push([x + w * 0.8, y1], [x - w, y1]);
      const cp = shape(P, { wash: '#2a6aa0', washA: 0.85, w: 2.2, col: '#0e2a48' }); softShade(cp.path, x, y1, x, y0, 'rgba(10,30,70,0.9)', 0.6); ln([[x - w * 0.3, y1 - 40], [x - 2, y0 + 30]], 2.2, '#bfe8ff', 0.75); }
    { const ax = 760, aw = 170; const arch = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; arch.push([ax + Math.cos(a) * aw, 1320 + Math.sin(a) * 210]); } const ap = shape(arch.concat([arch[0]]), { wash: '#123a66', washA: 0.95, w: 3, col: '#08203a' });   // ледяной грот у подножия
      softShade(ap.path, ax, 1110, ax, 1320, 'rgba(120,200,255,0.8)', 0.35); for (let i = 0; i < 9; i++) { const x = ax - aw * 0.8 + i * aw * 0.2; poly([[x - 9, 1320 + Math.sin(Math.PI + (x - ax + aw) / (2 * aw) * Math.PI) * 210 + 6], [x + 9, 1320 + Math.sin(Math.PI + (x - ax + aw) / (2 * aw) * Math.PI) * 210 + 6], [x, 1320 + Math.sin(Math.PI + (x - ax + aw) / (2 * aw) * Math.PI) * 210 + 50 + (i % 3) * 20]], { wash: '#e6f6ff', washA: 1, w: 1.6, col: '#3a6a9a' }); } }
    hatch(wp, [-300, 460, 1400, 1320], { gap: 14, a: 0.18, ang: 1.35, col: '#2b5d8f', seg: 70, key: 8 });
    ctx.restore();
    // сераки — ледяные зубцы по кромке
    for (let i = 0; i < top.length - 1; i += 2) { const [x, y] = top[i], h = 60 + (i * 37 % 5) * 26; shape([[x - 40, y + 20], [x - 26, y - h], [x + 8, y - h - 18], [x + 34, y - h * 0.6], [x + 44, y + 20], [x - 40, y + 20]], { wash: i % 4 ? '#e8f4fa' : '#bcdcee', washA: 1, w: 2.6, col: '#2a4a6a' }); }
    pencil(top, { w: 4.5, col: '#2a4a6a', a: 0.8 });
    // ледяная крошка падает при рывке
    if (lurch > 0 && lurch < 1) for (let i = 0; i < 26; i++) { const q = rng(i * 9 + 2), x = -100 + q() * 1300, y = 500 + lurch * 900 * (0.5 + q()); dot(x, y, 4 + q() * 14, '#eaf6ff', 0.9 * (1 - lurch)); }
  }
  // ---------------------------------------------------------------- окно в 2026: Коломенское
  function ascension(x, y, s) {                           // церковь Вознесения в Коломенском (1532): белый шатёр
    push(x, y, s);
    const wc = '#f6f2e8', sh = '#cfc8b8', L = '#5a5248';
    rect(-90, -60, 180, 60, { wash: wc, washA: 1, w: 2.4, col: L });                         // гульбище
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.fillStyle = '#8a8070'; ctx.beginPath(); ctx.arc(-75 + i * 30, -24, 9, Math.PI, 0); ctx.lineTo(-66 + i * 30, -6); ctx.lineTo(-84 + i * 30, -6); ctx.fill(); ctx.restore(); }
    rect(-56, -140, 112, 80, { wash: wc, washA: 1, w: 2.4, col: L });                        // крестчатый объём
    for (let i = 0; i < 3; i++) { const cx = -36 + i * 36; poly([[cx - 18, -140], [cx - 18, -150], [cx, -172], [cx + 18, -150], [cx + 18, -140]], { wash: wc, washA: 1, w: 2, col: L }); }   // кокошники
    rect(-40, -210, 80, 60, { wash: wc, washA: 1, w: 2.4, col: L });                          // восьмерик
    for (let i = 0; i < 3; i++) rect(-28 + i * 22, -200, 10, 26, { wash: '#6a6258', washA: 1, w: 1.2, col: L });
    for (let i = 0; i < 4; i++) { const cx = -30 + i * 20; poly([[cx - 10, -210], [cx, -226], [cx + 10, -210]], { wash: wc, washA: 1, w: 1.6, col: L }); }
    poly([[-36, -224], [0, -420], [36, -224]], { wash: wc, washA: 1, w: 2.6, col: L });       // шатёр
    ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(0, -420); ctx.lineTo(36, -224); ctx.lineTo(10, -224); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let i = -2; i <= 2; i++) ln([[i * 15, -224], [0, -418]], 1.2, L, 0.6);
    for (let k = 1; k < 6; k++) { const yy = -224 - k * 34, ww = 36 * (1 - k * 34 / 196); for (let i = -2; i <= 2; i++) dot(i * ww * 0.4, yy, 1.6, L, 0.5); }
    rect(-8, -446, 16, 26, { wash: wc, washA: 1, w: 1.6, col: L }); ell(0, -456, 13, 14, { wash: '#c99636', washA: 1, w: 1.6, col: '#5a3a10' });
    ln([[0, -470], [0, -500]], 2.4, '#c99636'); ln([[-9, -490], [9, -490]], 2.2, '#c99636'); ln([[-6, -480], [6, -478]], 2, '#c99636');
    pop();
  }
  function kolomenskoe(cx, cy, R, t) {                     // флэш-вперёд: Голосов овраг сегодня
    vgrad(cy - R, cy + R, ['#9fd0f0', '#e8f2f0', '#f4ecd0']); glow(cx + R * 0.5, cy - R * 0.6, 200, 'rgba(255,250,220,1)', 0.6);
    for (let i = 0; i < 3; i++) { const x = cx - 200 + i * 170 + ((t * 8) % 60); blob([[x - 60, cy - 170], [x - 20, cy - 196], [x + 40, cy - 188], [x + 70, cy - 168], [x, cy - 160]], { wash: '#ffffff', washA: 0.85, line: false }); }
    hills(cy - 20, 40, '#8ab070', 1.2); // дальний склон
    ascension(cx - 120, cy - 6, 0.72);
    for (let i = 0; i < 7; i++) { const x = cx - 260 + i * 34; if (Math.abs(x - (cx - 120)) < 70) continue; ell(x, cy - 40 - (i % 2) * 10, 26, 34, { wash: i % 2 ? '#4f7a3a' : '#5f8a40', washA: 1, w: 1.8, col: '#24361a' }); }
    for (let i = 0; i < 6; i++) { const x = cx + 60 + i * 40; ell(x, cy - 30 - (i % 3) * 14, 30, 44, { wash: i % 2 ? '#3f6a30' : '#557f3a', washA: 1, w: 1.8, col: '#1e3014' }); }
    // склоны оврага
    shape([[cx - R, cy - 10], [cx - 120, cy + 10], [cx - 10, cy + 110], [cx - 30, cy + R], [cx - R, cy + R], [cx - R, cy - 10]], { wash: '#78a050', washA: 1, w: 2.4, col: '#2a3a1a' });
    shape([[cx + R, cy - 10], [cx + 120, cy + 0], [cx + 20, cy + 110], [cx + 40, cy + R], [cx + R, cy + R], [cx + R, cy - 10]], { wash: '#6a9a48', washA: 1, w: 2.4, col: '#2a3a1a' });
    ln([[cx - 6, cy + 108], [cx + 4, cy + 160], [cx - 10, cy + 220], [cx + 6, cy + R]], 8, '#8fc0e0', 0.9);   // ручей
    for (let i = 0; i < 40; i++) { const q = rng(i * 13 + 1), x = cx + (q() - 0.5) * R * 2, y = cy + 20 + q() * R; ln([[x, y], [x + 3, y - 10]], 1.6, '#3a5a22', 0.7); }
    // тот же валун — в траве, с мхом
    granite(cx + 80, cy + 210, 92, 2, { snow: false, moss: true, col: '#a8908a' });
    for (let i = 0; i < 3; i++) dot(cx + 50 + i * 26, cy + 118 - i * 4, 4.5, '#c99636', 0.95);       // монетки на камне
    rect(cx - 103, cy + 150, 6, 90, { wash: '#4a3420', washA: 1, w: 1.6 });
    push(cx - 100, cy + 140, 1, -0.04); rect(-82, -26, 164, 48, { wash: '#2a3a24', washA: 0.97, w: 2.4, col: '#101a0e' }); txt('ДЕВИЙ КАМЕНЬ', 0, -1, 26, { col: '#f3ead2', font: 'Osw' }); pop();
    txt('2026 · КОЛОМЕНСКОЕ', cx + 30, cy - R + 80, 28, { col: '#1d2a3a', font: 'Osw', a: 0.9 });
  }
  function frostRing(cx, cy, R, t, a) {                    // иней по краю окна: кристаллы растут внутрь
    ctx.save(); ctx.globalAlpha = a; ctx.lineCap = 'round';
    const g = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R * 1.12); g.addColorStop(0, 'rgba(240,250,255,0)'); g.addColorStop(0.6, 'rgba(240,250,255,0.85)'); g.addColorStop(1, 'rgba(225,242,252,1)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.14, 0, 6.3); ctx.fill();
    for (let i = 0; i < 64; i++) { const q = rng(i * 17 + 3), an = i / 64 * 6.283 + q() * 0.05, L = R * (0.08 + q() * 0.16), x0 = cx + Math.cos(an) * R * 1.02, y0 = cy + Math.sin(an) * R * 1.02, dx = -Math.cos(an), dy = -Math.sin(an);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + dx * L, y0 + dy * L);
      for (let b = 1; b < 4; b++) { const bx = x0 + dx * L * b / 4, by = y0 + dy * L * b / 4, bl = L * 0.35 * (1 - b / 4); for (const sd of [-1, 1]) { const ba = Math.atan2(dy, dx) + sd * 1.05; ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(ba) * bl, by + Math.sin(ba) * bl); } }
      ctx.stroke(); }
    ctx.strokeStyle = 'rgba(120,170,210,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.stroke();
    ctx.restore();
  }

  // ---------------------------------------------------------------- мир
  const bX = t => { if (t < EV.ice_drag) return 1700; const k = clamp((t - EV.ice_drag) / (EV.ice_stop - EV.ice_drag)); return lerp(1700, BSTOP, 1 - Math.pow(1 - k, 2.6)); };
  WORLD.ice = (t, u, cat) => {
    const lurch = clamp((t - EV.ice_wall) / 0.55), lz = 1 - Math.pow(1 - lurch, 3);
    lay(40, () => { vgrad(-1500, 3500, ['#5e6c7a', '#8e9cab', '#c3cdd5', '#dfe6ea']); for (let i = 0; i < 5; i++) { const x = ((i * 300 - t * 60) % 1800 + 1800) % 1800 - 400; blob([[x, 300], [x + 140, 250], [x + 320, 270], [x + 420, 320], [x + 200, 350]], { wash: '#6f7d8c', washA: 0.5, line: false }); } });
    lay(16, () => { const p = []; for (let x = -1400; x <= W + 1400; x += 60) p.push([x, 820 - Math.sin(x * 0.004 + 1) * 40]); p.push([W + 1400, 3000], [-1400, 3000]); sil(p, '#e6eef3', 1); });
    haze('#cdd8e0', 0.25);
    lay(lerp(7.5, 3.8, lz) + Math.sin(clamp((t - EV.ice_wall) / 0.3) * Math.PI) * -0.4, () => glacierFront(t, lurch));
    haze('#d8e2ea', 0.2);
    lay(2.4, () => {                                        // морена: гряда с валунами
      const p = []; for (let x = -1400; x <= W + 1400; x += 40) p.push([x, 1330 - Math.abs(Math.sin(x * 0.007)) * 70 - Math.sin(x * 0.02) * 12]); p.push([W + 1400, 3000], [-1400, 3000]);
      const mp = sil(p, '#9c968e', 1); hatch(mp, [-300, 1240, 1400, 1500], { gap: 10, a: 0.3, col: '#4a4440', ang: -0.6, key: 3 });
      wash(pathOf(p.map(([x, y]) => [x, y + 12]).slice(0, -2).concat([[W + 1400, 1290], [-1400, 1290]])), '#eef3f6', 0.0);
      [[-120, 1320, 90, 3], [180, 1300, 60, 4], [520, 1290, 110, 5], [860, 1310, 75, 6], [1150, 1320, 100, 8]].forEach(([x, y, r, sd]) => granite(x, y, r, sd));
    });
    lay(1, () => {
      const gp = pathOf([[-1400, GY - 50], [W + 1400, GY - 70], [W + 1400, 4200], [-1400, 4200]]); { const g = ctx.createLinearGradient(0, GY - 70, 0, GY + 600); g.addColorStop(0, '#e2ecf2'); g.addColorStop(0.5, '#b8cfdf'); g.addColorStop(1, '#8aa8c2'); ctx.save(); ctx.fillStyle = g; ctx.fill(gp); ctx.restore(); }
      hatch(new Path2D('M-300 1400 H1400 V1800 H-300 Z'), [-300, 1400, 1400, 1800], { gap: 12, a: 0.22, ang: 0.08, col: '#6f8fae', seg: 90, key: 7 });
      const r = rng(9); for (let i = 0; i < 26; i++) dot(-200 + r() * 1500, GY - 30 + r() * 300, 3 + r() * 9, r() < 0.5 ? '#6a6460' : '#a89a90', 0.8);   // щебень морены
      // борозды-штрихи от валуна (ледниковая штриховка)
      if (t > EV.ice_drag) { const bx = bX(t); for (let i = 0; i < 4; i++) ln([[bx + 60, GY - 4 + i * 12], [1500, GY - 10 + i * 14]], 3, '#6f8fae', 0.55); }
      cat();
      if (t > EV.ice_drag - 0.05) { const bx = bX(t), k = clamp((t - EV.ice_drag) / (EV.ice_stop - EV.ice_drag)), moving = k < 1, rot = moving ? (1 - k) * -0.08 * Math.sin(t * 20) : 0;
        push(bx, GY + 8, 1, rot); granite(0, 0, BR, 2); pop();
        if (moving) for (let i = 0; i < 16; i++) { const q = rng(hsh(FRAME, i)); dot(bx - BR * 1.1 + q() * 60, GY - q() * 120, 6 + q() * 22, '#ffffff', 0.7); }   // снежный бурун перед валуном
        if (t > EV.ice_stop && t < EV.ice_stop + 0.7) { const q = (t - EV.ice_stop) / 0.7; for (let i = 0; i < 20; i++) { const rr = rng(i * 7 + 1), a = Math.PI + rr() * Math.PI; dot(bx - BR + Math.cos(a) * q * 300 * rr(), GY - 20 + Math.sin(a) * q * 160 * rr(), 10 + 24 * q, '#f4f8fb', 0.75 * (1 - q)); } } }
    });
    lay(0.6, () => { granite(-80, 2140, 300, 41, { col: '#c8bcb8' }); blob([[700, 2400], [900, 1990], [1200, 1960], [1400, 2400]], { wash: '#f2f6f8', washA: 0.98, w: 3, col: '#7f9cb8' }); });
    // пурга
    motes(150, [0, 0, W, H], '#ffffff', t, 11, { sp: 380, sz: 3.2, vx: -460, a: 0.85, stretch: 0.55 });
    scr(() => { for (let k = 0; k < 22; k++) { const r = rng(hsh(FRAME, k)), x = r() * W, y = r() * H; ln([[x, y], [x - 220 - r() * 160, y + 40 + r() * 30]], 1.6, '#ffffff', 0.45); } });
    if (t > EV.ice_wall && t < EV.ice_wall + 0.25) screenFill('#eaf6ff', 0.35 * (1 - (t - EV.ice_wall) / 0.25));
    // окно-виньетка в 2026
    if (t > EV.ice_window) scr(() => {
      const k = sm((t - EV.ice_window) / 0.5), cx = 700, cy = 700, R = 270 * k + 1, wob = (1 - k) * 30;
      const P = new Path2D(); for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283, rr = R + Math.sin(a * 7 + t * 5) * wob; i ? P.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : P.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } P.closePath();
      ctx.save(); ctx.clip(P); push(cx, cy, 0.85 + 0.15 * k); ctx.translate(-cx, -cy); kolomenskoe(cx, cy, 270, t); pop(); ctx.restore();
      frostRing(cx, cy, R, t, 1);
      if (k > 0.8) note('желания — принимает', 780, 1090, t, EV.ice_window + 0.55, S1.ice + 1, '#16243a', 52, -0.05, [[820, 1058], [826, 990], [800, 950]]);
    });
  };

  DIR.ice = {
    outfit: 'tulup', light: { side: 1, rim: '#e8f6ff' }, grade: ['#3a5a7a', 0.3],
    act: () => [[S0.ice, 'cold'], [EV.ice_wall - 0.05, 'shock'], [EV.ice_wall + 0.7, 'cold'], [EV.ice_drag + 0.3, 'suspicious'], [EV.ice_stop - 0.25, 'scared'], [EV.ice_stop + 0.55, 'annoyed'], [EV.ice_window + 0.1, 'grin'], [EV.ice_kolo + 0.5, 'wink']],
    pose: (t, u, b) => {
      const cold = t < EV.ice_window, jump = t > EV.ice_stop - 0.22 && t < EV.ice_stop + 0.35 ? Math.sin(Math.PI * (t - EV.ice_stop + 0.22) / 0.57) : 0;
      const o = { x: TX - jump * 30, y: GY - jump * 140, s: 1.15, chatter: cold && jump === 0, frost: cold, look: [0.3, 0], hand: [30, -220], handF: [-30, -220], squash: b.squash + (jump > 0 ? -0.15 * jump : 0) };
      if (t > EV.ice_wall - 0.1 && t < EV.ice_wall + 0.7) Object.assign(o, { look: [0.4, -0.8], hand: [70, -300], handF: [-70, -300] });
      if (t > EV.ice_drag && t < EV.ice_stop - 0.22) Object.assign(o, { look: [1, -0.1], tilt: -0.06 });
      if (jump > 0) Object.assign(o, { hand: [90, -330], handF: [-90, -330], tailUp: true, look: [1, 0] });
      if (t > EV.ice_stop + 0.35 && t < EV.ice_window) Object.assign(o, { look: [0.9, -0.2], sweat: true });
      if (t > EV.ice_window) Object.assign(o, { look: [0.8, -0.8], point: t > EV.ice_kolo - 0.1, hand: t > EV.ice_kolo - 0.1 ? [150, -330] : [40, -210], handF: [-40, -210] });
      return Object.assign(b, o);
    },
    cam: () => [[S0.ice, 540, 920, 0.16], [EV.ice_wall - 0.1, 540, 940, 0.06], [EV.ice_wall + 0.2, 560, 880, -0.06, 'x'], [EV.ice_drag + 0.1, 600, 980, 0.04], [EV.ice_stop - 0.05, 560, 1030, 0.12],
      [EV.ice_stop + 0.12, 520, 1050, 0.24, 'x'], [EV.ice_window, 560, 940, 0.04], [S1.ice, 560, 930, 0.08]]
  };

  // ---------------------------------------------------------------- переход В ice: пузыри замерзают, кадр промерзает
  TRANS_IN.ice = { a: 0.38, b: 0.5, fx(k, t, A, B) {
    const f = sm(k / 0.55), q = clamp((k - 0.55) / 0.45);
    if (k < 0.55) drawBuf(A); else drawBuf(B, 1.06 - 0.06 * q);
    scr(() => {
      const wA = k < 0.55 ? f * 0.92 : (1 - q) * 0.92;
      // иней с краёв: белая кромка сжимается к центру
      const rIn = lerp(1100, 80, k < 0.55 ? f : 1 - q * 0.9);
      const g = ctx.createRadialGradient(540, 960, rIn * 0.6, 540, 960, rIn + 500); g.addColorStop(0, 'rgba(236,246,252,0)'); g.addColorStop(0.5, `rgba(236,246,252,${wA})`); g.addColorStop(1, `rgba(244,250,255,${Math.min(1, wA + 0.08)})`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (k < 0.55) { ctx.fillStyle = `rgba(220,238,250,${0.35 * f})`; ctx.fillRect(0, 0, W, H); }
      // дендриты инея растут с краёв
      const grow = k < 0.55 ? f : 1 - q; ctx.lineCap = 'round';
      for (let i = 0; i < 70; i++) { const r = rng(i * 13 + 1), side = i % 4; let x, y, a; if (side === 0) { x = r() * W; y = 0; a = Math.PI / 2; } else if (side === 1) { x = r() * W; y = H; a = -Math.PI / 2; } else if (side === 2) { x = 0; y = r() * H; a = 0; } else { x = W; y = r() * H; a = Math.PI; } a += (r() - 0.5) * 0.9;
        const L = (120 + r() * 420) * grow; if (L < 4) continue; ctx.globalAlpha = 0.85; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L);
        for (let b = 1; b < 6; b++) { const bx = x + Math.cos(a) * L * b / 6, by = y + Math.sin(a) * L * b / 6, bl = L * 0.22 * (1 - b / 7); for (const sd of [-1, 1]) { const ba = a + sd * 1.05; ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(ba) * bl, by + Math.sin(ba) * bl); } }
        ctx.stroke(); }
      // пузыри → снежинки → пурга
      for (let i = 0; i < 46; i++) { const r = rng(i * 7 + 3), x0 = r() * W, y0 = 300 + r() * 1400, rise = k < 0.55 ? (1 - f) * 120 * k : 0, blow = q * q * 1400 * (0.6 + r());
        const x = x0 - blow, y = y0 - rise + q * 200 * r(), R = 8 + r() * 18, fr = sm((k - 0.1 - r() * 0.15) / 0.3); ctx.globalAlpha = 0.95 * (1 - q * 0.6);
        if (fr < 1) { ctx.strokeStyle = '#e6fbff'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(x, y, R * (1 - fr * 0.4), 0, 6.3); ctx.stroke(); }
        if (fr > 0) { ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.6; ctx.beginPath(); const rot = t * 2 + i; for (let s = 0; s < 6; s++) { const aa = rot + s * 1.047, L = R * 1.3 * fr; ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(aa) * L, y + Math.sin(aa) * L); const mx = x + Math.cos(aa) * L * 0.6, my = y + Math.sin(aa) * L * 0.6; ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(aa + 0.7) * L * 0.3, my + Math.sin(aa + 0.7) * L * 0.3); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(aa - 0.7) * L * 0.3, my + Math.sin(aa - 0.7) * L * 0.3); } ctx.stroke(); } }
      ctx.globalAlpha = 1;
      if (q > 0) for (let kk = 0; kk < 30; kk++) { const r = rng(hsh(FRAME, kk + 50)), x = r() * W, y = r() * H; ctx.globalAlpha = 0.6 * (1 - q); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 300, y + 50); ctx.stroke(); }
      ctx.globalAlpha = 1;
    });
  } };
})();
