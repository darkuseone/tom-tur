/* 030 — сцена `gold`: 1763, порт Рио. Главный свет — тёплое закатное солнце слева, второй — блеск золота. С гор по серпантину спускается
   караван мулов с мешками, в порту грузят сундуки на фрегат, на весах взвешивают золото, чиновники с книгой, рабочие, бочки.
   На «золото» Том поднимает самородок — блеск; на «столицей колонии» въезжает КАРТА Бразилии (инфографика): золотая стрелка
   «ЗОЛОТО» Минас-Жерайс → Рио и красная «СТОЛИЦА 1763» Салвадор → Рио. Переход В: золотой песок сыплется сверху и заливает кадр. */
(() => {
  EV.gd_mount = wtk('s4', 'горах');
  EV.gd_gold = wtk('s4', 'золото');
  EV.gd_cap = wtk('s4', 'столицей');
  KEYW.push('золото', 'колонии.');
  const L = RJ.ink, SUN = [160, 520], MAP0 = EV.gd_cap - 0.35;
  function sky(t) { vgrad(-900, 1050, ['#3a4a8a', '#c87a6a', '#f8b060', '#ffe0a0'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,220,150,1)', 0.4); ell(SUN[0], SUN[1], 60, 60, { wash: '#fff2c8', washA: 1, line: false }); }
  function mountains(t) {                                            // горы Серра-ду-Мар, серпантин, караван мулов с золотом
    blob([[-500, 1000], [-300, 700], [-100, 620], [100, 700], [300, 600], [520, 680], [760, 560], [1000, 680], [1200, 640], [1700, 1000]], { wash: '#4a6a4a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.25, col: '#1e3a24', ang: 1.1 } });
    pencil([[760, 600], [640, 680], [800, 760], [600, 860], [760, 940], [560, 1000]], { w: 10, col: '#c8a878', pass2: false });
    const k = (t * 0.06) % 1; for (let i = 0; i < 6; i++) { const u = (k + i * 0.08) % 1, pts = [[760, 600], [640, 680], [800, 760], [600, 860], [760, 940], [560, 1000]], seg = Math.min(4, Math.floor(u * 5)), f = u * 5 - seg, [ax, ay] = pts[seg], [bx, by] = pts[seg + 1];
      push(lerp(ax, bx, f), lerp(ay, by, f), 0.3); blob([[-60, -40], [-50, -90], [50, -90], [60, -40]], { wash: '#7a5a3a', washA: 1, w: 1.6, col: L }); for (const lx of [-40, 40]) pencil([[lx, -40], [lx, 0]], { w: 8, col: '#5a3a2a', pass2: false }); ell(-10, -110, 28, 22, { wash: RJ.gold, washA: 1, w: 1.6, col: L }); pop(); }
    for (let i = 0; i < 20; i++) { const r = rng(6500 + i); ell(-400 + r() * 1900, 900 - r() * 250, 20, 14, { wash: i % 2 ? RJ.green : '#2a5a2a', washA: 0.8, line: false }); }
    depthFog('#e8b880', 0.05); }
  function port(t) {                                                 // гавань: фрегат, колониальные дома, церковь, причал
    seaKR(1050, 1240, t, 6510, { cols: ['#3a8ab0', '#1e6a90', '#0e4a6a'], glint: '#ffd890', gx: 260, n: 22 });
    shipRJ(820, 1170, 0.5, t, 'frigate', 2); for (let i = 0; i < 6; i++) colonial(-380 + i * 150, 1080, 130, 150 + (i % 2) * 60, ['#f0e2c8', '#e8c8a0', '#d8e0e8', '#f0d8a8'][i % 4], { shut: ['#2a6a4a', '#1e4a8a'][i % 2] });
    push(560, 1060, 0.7); rect(-70, -220, 140, 220, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); poly([[-80, -220], [0, -280], [80, -220]], { wash: RJ.terra, washA: 1, w: 2, col: L }); rect(-30, -340, 60, 120, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); blob([[-36, -340], [0, -400], [36, -340]], { wash: '#2a8ac8', washA: 1, w: 1.6, col: L }); pop();
  }
  function quay(t) {                                                 // причал: грузчики с сундуками, весы, чиновник с книгой, бочки, мул
    rect(-500, 1240, 2200, 180, { wash: '#a8907a', washA: 1, w: 2, col: L }); for (let i = 0; i < 22; i++) pencil([[-480 + i * 100, 1240], [-480 + i * 100, 1420]], { w: 1.4, col: '#6a5a4a', a: 0.6, pass2: false });
    const P = [[-180, '#e8d8b8', 'brim', 'up'], [-40, '#a8603a', null, 'up'], [600, '#e8d8b8', 'straw', 'hold'], [740, '#2a2a5a', 'tricorn', 'point'], [880, '#7a4a2a', null, 'up'], [1040, '#e8d8b8', 'straw', 'hold'], [1200, '#3a5a3a', 'tricorn', 'hold']];
    P.forEach(([x, c, h, a], i) => { human(x, 1430, 0.64, t, { body: c, skin: i % 3 === 1 ? '#7a4a2a' : '#e2b48e', hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a1a10', legs: '#3a2a1a', armR: a, prop: i === 3 ? 'scroll' : undefined, flip: x > 600 ? -1 : 1, seed: 6520 + i, face: t > EV.gd_gold ? 'grin' : 'calm' });
      if (a === 'up') { push(x, 1430 - 0.64 * 330, 0.64); rect(-60, -40, 120, 70, { wash: '#6a4424', washA: 1, w: 2, col: L }); rect(-60, -40, 120, 16, { wash: RJ.gold, washA: 1, w: 1.4, col: L }); pop(); } });
    push(420, 1420, 0.8); pencil([[0, 0], [0, -220]], { w: 8, col: '#3a2a1a', pass2: false }); const tl = Math.sin(t * 2) * 0.1; pencil([[-120, -220 + tl * 100], [120, -220 - tl * 100]], { w: 6, col: '#3a2a1a', pass2: false }); for (const sd of [-1, 1]) { pencil([[sd * 120, -220 - sd * tl * 100], [sd * 120, -140 - sd * tl * 100]], { w: 2, col: '#3a2a1a', pass2: false }); ell(sd * 120, -140 - sd * tl * 100, 50, 14, { wash: sd < 0 ? RJ.gold : '#8a8e94', washA: 1, w: 1.6, col: L }); } pop();
  }
  function ground(t) {                                               // мостовая, сундук с золотом, слитки, мешки, канат, фонарь
    rect(-500, 1420, 2200, 900, { wash: '#8a7a6a', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1450 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#9a8a78' : '#7a6a5a', washA: 1, w: 1, col: '#4a3a2a' });
    lightPool(SUN[0] + 300, 1660, 800, 160, 'rgba(255,210,140,1)', 0.4);
    push(860, 1740, 1); rect(-110, -100, 220, 100, { wash: '#6a4424', washA: 1, w: 2.4, col: L }); shape([[-110, -100], [110, -100], [90, -170], [-90, -170]], { wash: '#7a5434', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) ell(-70 + q * 28, -100, 16, 12, { wash: RJ.goldL, washA: 1, w: 1, col: '#8a6418' }); glow(0, -110, 90, 'rgba(255,220,120,1)', 0.35); pop();
    for (let q = 0; q < 4; q++) { push(1100 + (q % 2) * 50, 1800 - Math.floor(q / 2) * 30, 1); poly([[-36, 0], [36, 0], [26, -24], [-26, -24]], { wash: RJ.gold, washA: 1, w: 1.6, col: '#6a4a10' }); pop(); }
    for (let q = 0; q < 3; q++) { push(-60 + q * 60, 1760, 1); blob([[-34, 0], [-40, -60], [-14, -84], [14, -84], [40, -60], [34, 0]], { wash: '#c8b088', washA: 1, w: 1.6, col: L }); pop(); }
    castShadow(330, 1640, 120, 520, 0.6, 0.35); moodDark(1200, 900, 900, 1800, '#1a0e1e', 0.3);
  }
  function mapBeat(t) {                                              // карта: золото Минас-Жерайс → Рио, столица Салвадор → Рио
    const k = sm(clamp((t - MAP0) / 0.3)); if (k <= 0) return; MAPON = t; scr(() => { ctx.save(); ctx.translate(0, (1 - k) * 1900);
      const P = GLOBE.map(560, 1000, 60, -42, -17.5, { landCol: { samerica: '#d8c890' } });
      GLOBE.zone(P, [[-51, -14.5], [-41, -14.5], [-40, -21.5], [-44.5, -23], [-51, -20]], '#e8b84a', 0.35, { w: 3 }); txt('МИНАС-ЖЕРАЙС', P([-45.5, -18])[0], P([-45.5, -18])[1], 34, { col: '#5a3a08', font: 'Osw' });
      GLOBE.city(P, ...RIO.salv, 'САЛВАДОР', { size: 34 }); GLOBE.city(P, -43.2, -22.9, 'РИО', { size: 44, col: RJ.gold }); GLOBE.city(P, ...RIO.ouro, '', {});
      GLOBE.route(P, [RIO.ouro, [-43.2, -22.9]], clamp((t - MAP0 - 0.1) / 0.5), { col: '#e8b84a', bend: 0.3, label: 'ЗОЛОТО', t, t0: MAP0 + 0.35, lx: -110, ly: 0, w: 10 });
      GLOBE.route(P, [RIO.salv, [-43.0, -22.7]], clamp((t - EV.gd_cap) / 0.6), { col: '#e8281e', bend: -0.25, label: 'СТОЛИЦА · 1763', t, t0: EV.gd_cap + 0.35, lx: 130, ly: -10, size: 40 });
      ctx.restore(); });
  }
  WORLD.gold = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => mountains(t)); lay(6, () => port(t)); lay(2.6, () => { quay(t); depthFog('#f0c890', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#2a1408', 1); });
    lay(2, () => motes(18, [-100, 700, 1200, 1500], '#ffe08a', t, 6530, { sp: 2, sz: 2.4, a: 0.5, wob: 16, add: 1 }));
    mapBeat(t);
  };
  DIR.gold = {
    outfit: 'kamzol', light: { side: -1, rim: '#ffd090' }, grade: ['#4a2a10', 0.08],
    act: () => [[S0.gold, 'talk'], [EV.gd_mount, 'suspicious'], [EV.gd_gold, 'shock'], [EV.gd_gold + 0.4, 'grin'], [EV.gd_cap, 'proud']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.9), x = lerp(160, 330, sm(w1)), up = t > EV.gd_gold - 0.1; return Object.assign(b, { x, y: 1640, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: up ? [0.5, -0.9] : [-0.5, -0.6], hand: up ? [120, -470] : [150, -300] }); },
    afterCat: (t, u, P) => { if (t > EV.gd_gold - 0.1) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; blob([[x - 26, y - 4], [x - 18, y - 30], [x + 6, y - 38], [x + 28, y - 20], [x + 22, y + 6]], { wash: RJ.goldL, washA: 1, w: 2, col: '#6a4a10' }); glow(x, y - 16, 70, 'rgba(255,230,140,1)', 0.45 * (0.6 + 0.4 * Math.sin(t * 12))); } },
    hud: t => infoPlate(560, 780, [['1763', 60, RJ.goldL], ['СТОЛИЦА КОЛОНИИ — РИО', 34]], t, EV.gd_cap + 0.5),
    cam: () => [[S0.gold, 600, 860, -0.1], [EV.gd_mount, 640, 820, -0.06], [EV.gd_gold - 0.1, 460, 1120, 0.1, 'x'], [MAP0, 480, 1100, 0.12], [S1.gold, 480, 1100, 0.12]]
  };
  TRANS_IN.gold = { a: 0.08, b: 0.38, fx(k, t, A, B) {              // золотой песок сыплется сверху и заливает кадр, потом осыпается
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), Y = e < 0.5 ? e * 2 * H : H, r = rng(hsh(FRAME, 6540)); ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.fillStyle = '#e8b84a'; ctx.fillRect(0, 0, W, Y); ctx.restore();
      for (let i = 0; i < 300; i++) { const x = r() * W, y = r() * Y; ctx.fillStyle = i % 3 ? 'rgba(255,230,140,0.9)' : 'rgba(140,90,20,0.8)'; ctx.fillRect(x, y, 4, 8); } }); } };
})();
