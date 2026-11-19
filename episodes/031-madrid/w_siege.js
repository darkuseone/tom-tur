/* 031 — сцена `siege`: ноябрь 1936 — март 1939. Ночь, главный свет — лучи прожекторов в небе, второй — тёплые окна и костёр у баррикады.
   Гран-Виа: высотное здание Телефоники (1929), дома с балконами, мешки с песком и баррикада из брусчатки, растяжка «¡NO PASARÁN!»,
   ополченцы (оружие за спиной, без стрельбы), женщины с вёдрами воды, дети, трамвай, плакаты. На «окружили» — КАРТА: Мадрид и кольцо
   фронта с запада и юга (Каса-де-Кампо, Университетский городок), стрелки наступления, подпись «НОЯБРЬ 1936 · ФРОНТ У ГОРОДА».
   На «два с половиной года» — счётчик-календарь «ноя 1936 → мар 1939 · ≈ 29 МЕСЯЦЕВ». Том (кожанка) у баррикады. Без шуток.
   Переход В: свет прожектора полосой проходит по кадру. Музыка приглушена. */
(() => {
  EV.sg_36 = wtk('s6', 'тридцать');
  EV.sg_ring = wtk('s6', 'окружили') - 0.1;
  EV.sg_hold = wtk('s6', 'держался') - 0.1;
  EV.sg_years = wtk('s6', 'половиной');
  KEYW.push('Франко.', 'года.');
  const L = MD.ink, MAPB = t => t >= EV.sg_ring && t < EV.sg_hold;
  function sky(t) { vgrad(-900, 1100, ['#04060e', '#0e1426', '#1e2438', '#2e2a3a'], 1); for (let i = 0; i < 3; i++) { const a = -1.2 + Math.sin(t * 0.7 + i * 2) * 0.5; shaft(200 + i * 340, 1100, 60, 1400, a + 3.14, 'rgba(230,240,255,1)', 0.14); }
    const r = rng(7800); for (let i = 0; i < 50; i++) { ctx.fillStyle = `rgba(255,250,235,${0.2 + r() * 0.4})`; ctx.fillRect(r() * 1400 - 150, r() * 700 - 300, 3, 3); } }
  function granvia(t) {                                              // Телефоника, дома, окна, плакаты, трамвай
    push(780, 1100, 0.8); rect(-90, -900, 180, 900, { wash: '#8a8478', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#3a3830', ang: 1.4 } }); rect(-60, -1000, 120, 100, { wash: '#8a8478', washA: 1, w: 2, col: L }); for (let f = 0; f < 18; f++) for (let q = 0; q < 3; q++) rect(-70 + q * 50, -880 + f * 48, 30, 28, { wash: (f + q) % 4 ? '#1a1a22' : '#e8c070', washA: 1, w: 0.8, col: L }); pencil([[0, -1000], [0, -1080]], { w: 4, col: L, pass2: false }); pop();
    for (let i = 0; i < 6; i++) { if (i === 4) continue; habsburg(-420 + i * 230, 1100, 210, 260 + (i % 2) * 60, ['#7a6a5a', '#6a5a4a', '#8a7a68'][i % 3], t, { lit: 1 }); }
    for (const [x, c] of [[-300, '#c8281e'], [140, '#f8c830']]) { rect(x, 1000, 90, 110, { wash: c, washA: 1, w: 1.4, col: L }); txt('¡NO!', x + 45, 1050, 26, { col: L, font: 'Osw' }); }
    depthFog('#1a1e2e', 0.08); }
  function street(t) {                                               // баррикада из брусчатки и мешков, растяжка, ополченцы, женщины с водой, дети, трамвай
    rect(-500, 1150, 2200, 230, { wash: '#3a3a40', washA: 1, w: 2, col: L }); pencil([[-500, 1260], [1700, 1250]], { w: 6, col: '#6a6a70', pass2: false });
    push(1000 - ((t - S0.siege) * 40) % 300, 1250, 0.55); rect(-200, -220, 400, 200, { wash: '#c8a040', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) rect(-180 + q * 74, -200, 56, 60, { wash: '#f0d890', washA: 1, w: 1.2, col: L }); pencil([[0, -220], [0, -330]], { w: 3, col: '#2a2a30', pass2: false }); pop();
    for (let i = 0; i < 9; i++) { push(-60 + i * 110, 1330, 1); blob([[-56, 0], [-60, -40], [-40, -60], [40, -60], [60, -40], [56, 0]], { wash: '#a89878', washA: 1, w: 1.6, col: L }); pop(); } for (let i = 0; i < 8; i++) { push(-10 + i * 110, 1272, 1); blob([[-56, 0], [-60, -40], [-40, -60], [40, -60], [60, -40], [56, 0]], { wash: '#988868', washA: 1, w: 1.6, col: L }); pop(); }
    pencil([[-200, 960], [1300, 940]], { w: 4, col: '#2a2a30', pass2: false }); shape([[-120, 960], [1220, 942], [1210, 1030], [-110, 1046]], { wash: '#c8281e', washA: 1, w: 2, col: L }); txt('¡NO PASARÁN!', 550, 996, 60, { col: '#fff6e0', font: 'Osw', rot: -0.012 });
    const P = [[-260, '#4a4a3a', 'cap', 'hold', 'spear'], [-140, '#3a3a4a', 'scarf', 'up', undefined], [980, '#5a4a3a', 'cap', 'hold', 'spear'], [1100, '#6a3a3a', 'scarf', 'up', undefined], [1220, '#3a4a3a', 'helmet', 'hold', undefined]];
    P.forEach(([x, c, h, a, pr], i) => { human(x, 1380, 0.62, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#c8b8a0' : '#2a2a30', legs: '#2a2a30', armR: a, prop: pr, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 7810 + i, face: 'calm' }); if (a === 'up') { push(x + 20, 1380 - 0.62 * 300, 0.62); ell(0, 0, 30, 34, { wash: '#8a8e94', washA: 1, w: 1.6, col: L }); pop(); } });
    human(860, 1380, 0.42, t, { body: '#8a6a4a', legs: '#4a3a2a', armR: 'wave', seed: 7820, face: 'calm' });
  }
  function ground(t) {                                               // мостовая, костёр в бочке, ящики, ведро, газеты, фонарь без света
    rect(-500, 1380, 2200, 1000, { wash: '#2e2e34', washA: 1, w: 2, col: L }); for (let j = 0; j < 10; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1400 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#38383e' : '#2a2a30', washA: 1, w: 1, col: '#16161a' });
    push(1060, 1760, 1); rect(-50, -120, 100, 120, { wash: '#4a4a52', washA: 1, w: 2, col: L }); const f = Math.sin(t * 13) * 0.2 + 1; blob([[-40, -120], [-20, -200 * f], [0, -150], [20, -220 * f], [40, -120]], { wash: '#ff8a2a', washA: 1, line: false }); glow(0, -160, 120, 'rgba(255,170,80,1)', 0.4); pop();
    lightPool(1060, 1720, 500, 140, 'rgba(255,170,80,1)', 0.45);
    for (let q = 0; q < 2; q++) { push(-60 + q * 90, 1780, 1); rect(-40, -60, 80, 60, { wash: '#6a5a3a', washA: 1, w: 1.6, col: L }); pop(); } push(560, 1820, 1); ell(0, -20, 30, 26, { wash: '#8a8e94', washA: 1, w: 1.6, col: L }); pop(); push(760, 1860, 1, 0.2); rect(-60, -20, 120, 30, { wash: '#d8d0c0', washA: 1, w: 1.2, col: L }); pop();
    lamp(-200, 1700, 0.9, 0);
    castShadow(330, 1650, 120, 480, -0.6, 0.4); moodDark(1060, 1000, 600, 1600, '#04040a', 0.5);
  }
  function mapBeat(t) { MAPON = t; scr(() => { const P = GLOBE.map(560, 1000, 2800, -3.7, 40.42, { sea: '#6a7a6a', seaD: '#4a5a4a', land: '#d8c8a0', grain: true });
    const city = [[-3.74, 40.45], [-3.69, 40.46], [-3.66, 40.44], [-3.66, 40.4], [-3.69, 40.38], [-3.73, 40.39], [-3.75, 40.42]]; GLOBE.fill(city.map(P), '#c8b080'); for (let i = 0; i < 60; i++) { const r = rng(7830 + i), [x, y] = P([-3.745 + r() * 0.08, 40.385 + r() * 0.07]); rect(x - 8, y - 6, 16, 12, { wash: '#a89068', washA: 1, w: 0.6, col: L }); }
    pencil([[-3.75, 40.47], [-3.73, 40.43], [-3.725, 40.4], [-3.71, 40.37]].map(P), { w: 10, col: '#4a7ab8', pass2: false }); txt('МАНСАНАРЕС', P([-3.735, 40.36])[0], P([-3.735, 40.36])[1], 26, { col: '#2a4a7a', font: 'Osw' });
    const k = clamp((t - EV.sg_ring) / 0.8), ring = [[-3.79, 40.48], [-3.76, 40.44], [-3.76, 40.39], [-3.71, 40.35], [-3.64, 40.36]], dash = ring.map(P);
    pencil(dash.slice(0, 1 + Math.ceil(k * 4)), { w: 14, col: '#c8281e', pass2: false, gap: true });
    GLOBE.route(P, [[-3.86, 40.42], [-3.77, 40.43]], k, { col: '#5a5a5a', w: 14 }); GLOBE.route(P, [[-3.73, 40.28], [-3.71, 40.37]], k, { col: '#5a5a5a', w: 14 }); GLOBE.route(P, [[-3.84, 40.5], [-3.77, 40.46]], k, { col: '#5a5a5a', w: 12 });
    GLOBE.city(P, -3.7, 40.42, 'МАДРИД', { size: 40, col: MD.red }); GLOBE.city(P, -3.77, 40.42, 'КАСА-ДЕ-КАМПО', { size: 26, left: true, k }); GLOBE.city(P, -3.73, 40.45, 'УНИВЕРСИТЕТ', { size: 26, left: true, k });
    infoPlate(560, 1340, [['НОЯБРЬ 1936 · ФРОНТ У ГОРОДА', 38, '#ffb0a0']], t, EV.sg_ring + 0.4, { edge: '#c8281e' }); }); }
  WORLD.siege = (t, u, cat) => {
    if (MAPB(t)) { lay(1, () => mapBeat(t)); return; }
    lay(40, () => sky(t)); lay(9, () => granvia(t)); lay(2.6, () => street(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-150, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#060608', 1); });
    lay(1.6, () => motes(20, [-100, 600, 1200, 1500], '#8a8aa0', t, 7840, { sp: 2, sz: 3, a: 0.3, wob: 24 }));
  };
  DIR.siege = {
    outfit: 'komissar', light: { side: 1, rim: '#ffb070' }, grade: ['#0e1426', 0.14],
    act: () => [[S0.siege, 'cold'], [EV.sg_ring, 'annoyed'], [EV.sg_hold, 'proud'], [EV.sg_years, 'cold']],
    pose: (t, u, b) => { const w1 = clamp((t - EV.sg_hold) / 0.8), x = lerp(200, 340, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 > 0 && w1 < 1 ? t * 8 : 0, look: [0.7, -0.6], hand: t > EV.sg_hold ? [140, -460] : [150, -300] }); },
    hud: t => { if (t > EV.sg_years - 0.1) { const k = clamp((t - EV.sg_years + 0.1) / 0.9), m = Math.round(29 * k), months = ['НОЯ 1936', 'МАЙ 1937', 'ДЕК 1937', 'ИЮН 1938', 'ДЕК 1938', 'МАР 1939']; infoPlate(560, 780, [[months[Math.min(5, Math.floor(k * 5.99))], 52, '#ffb0a0'], ['≈ ' + m + ' МЕСЯЦЕВ ОСАДЫ', 34]], t, EV.sg_years - 0.1, { edge: '#c8281e' }); } },
    cam: () => [[S0.siege, 600, 860, -0.12], [EV.sg_36, 620, 900, -0.08], [EV.sg_ring - 0.01, 600, 920, -0.06], [EV.sg_hold, 540, 1100, 0.06], [EV.sg_years, 520, 1140, 0.1, 'x'], [S1.siege, 520, 1150, 0.12]]
  };
  TRANS_IN.siege = { a: 0.08, b: 0.36, fx(k, t, A, B) {             // луч прожектора проходит полосой: за ним новая эпоха
    const e = sm(k), X = -400 + e * 1900; drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(X, 0, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => { ctx.save(); const g = ctx.createLinearGradient(X - 240, 0, X + 120, 0); g.addColorStop(0, 'rgba(230,240,255,0)'); g.addColorStop(0.6, 'rgba(230,240,255,0.9)'); g.addColorStop(1, 'rgba(230,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(X - 240, 0, 360, H); ctx.restore(); }); } };
})();
