/* 031 — сцена `goya`: 1808 → 1814, три бита. (1) 2 мая 1808, Пуэрта-дель-Соль: горожане восстали — толпа с кулаками и палками,
   перевёрнутая телега, вдали силуэты французской конницы и дым (без насилия в кадре). (2) На «Наполеона» — КАРТА: стрелки армий
   Наполеона из Франции через Пиренеи (Байонна → Бургос → Мадрид), подпись «1808 · ФРАНЦУЗЫ В МАДРИДЕ». (3) На «Казни» — зал Прадо:
   на стене картина Гойи «Третье мая 1808» в стилизованном виде (человек в белой рубахе с поднятыми руками, фонарь, тёмная шеренга,
   без крови), посетители, смотритель; Том (гусар) снимает кивер. Плашка «ГОЙЯ · «ТРЕТЬЕ МАЯ 1808» · 1814 · ПРАДО».
   Переход В: двери дворца → пороховой дым. Без шуток. */
(() => {
  EV.gy_up = wtk('s5', 'восстал');
  EV.gy_nap = wtk('s5', 'против') - 0.1;
  EV.gy_exec = wtk('s5', 'Казни') - 0.1;
  EV.gy_goya = wtk('s5', 'Гойя.');
  KEYW.push('восстал', 'Наполеона.', 'Гойя.');
  const L = MD.ink, beat = t => t < EV.gy_nap ? 0 : t < EV.gy_exec ? 1 : 2;
  // ---------- бит 1: восстание
  function skyU(t) { vgrad(-900, 1050, ['#4a4a5a', '#8a7a7a', '#d8b098', '#f0d0a8'], 1); for (let i = 0; i < 6; i++) { const ph = (t * 0.2 + i / 6) % 1; ell(200 + i * 160, 800 - ph * 400, 90 + ph * 80, 50 + ph * 40, { wash: '#4a4048', washA: 0.5 * (1 - ph), line: false }); } }
  function streetU(t) { for (let i = 0; i < 7; i++) habsburg(-420 + i * 230, 1060, 200, 200 + (i % 3) * 40, [MD.brick, MD.ochre, '#e8c8a0'][i % 3], t, {}); correos(560, 1080, 0.7, t);
    for (let i = 0; i < 6; i++) { const x = 900 + i * 90 - (t - S0.goya) * 60; push(x, 1080, 0.35, 0, -1); blob([[-110, -110], [-100, -170], [0, -185], [90, -175], [120, -120]], { wash: '#2a2420', washA: 1, line: false }); ell(10, -230, 20, 26, { wash: '#2a2420', washA: 1, line: false }); pencil([[-10, -260], [40, -330]], { w: 4, col: '#2a2420', pass2: false }); pop(); }
    depthFog('#c8b0a0', 0.06); }
  function crowdU(t) { const P = [[-260, '#8a3a2a'], [-140, '#4a5a3a'], [-20, '#c8a070'], [120, '#3a3a5a'], [260, '#a8603a'], [760, '#6a4a3a'], [880, '#e8dcc0'], [1000, '#5a3a2a'], [1140, '#8a2a3a']];
    P.forEach(([x, c], i) => human(x + Math.sin(t * 3 + i) * 8, 1300, 0.62, t, { body: c, hat: i % 3 === 0 ? 'brim' : i % 3 === 1 ? 'scarf' : undefined, hatCol: '#2a1a10', legs: '#3a2a1a', armR: t > EV.gy_up ? 'up' : 'hold', prop: i % 4 === 1 ? 'stick' : undefined, long: i % 3 === 1 ? 1 : undefined, seed: 7710 + i, face: 'angry', flip: x > 600 ? -1 : 1 }));
    push(520, 1300, 0.7, 0.4); rect(-160, -110, 320, 80, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); for (const q of [-120, 120]) ell(q, -10, 46, 46, { line: true, w: 6, col: '#3a2a1a' }); pop(); }
  // ---------- бит 3: зал Прадо
  function prado(t) { vgrad(-900, 1400, ['#5a4a3a', '#7a6248', '#8a6e50'], 1); for (let i = 0; i < 8; i++) pencil([[-400 + i * 260, -200], [-400 + i * 260, 1400]], { w: 14, col: '#6a5440', pass2: false });
    shaft(540, -100, 500, 1400, 0, 'rgba(255,240,200,1)', 0.1); rect(-500, 1260, 2200, 40, { wash: '#4a3a2a', washA: 1, line: false });
    push(560, 900, 1); rect(-380, -280, 760, 520, { wash: '#2a2420', washA: 1, w: 3, col: L }); rect(-400, -300, 800, 560, { line: true, w: 18, col: MD.gold });
    ctx.save(); ctx.beginPath(); ctx.rect(-380, -280, 760, 520); ctx.clip(); GLOBE.fill([[-380, -280], [380, -280], [380, -100], [-380, -40]], '#1a1a22'); GLOBE.fill([[-380, 240], [-380, -40], [-200, -120], [0, -80], [200, -160], [380, -60], [380, 240]], '#3a3428');
    rect(-40, 40, 110, 90, { wash: '#f0e0a0', washA: 1, w: 2, col: L }); glow(15, 80, 120, 'rgba(255,230,150,1)', 0.35);
    for (let q = 0; q < 6; q++) { const x = 120 + q * 40; blob([[x - 20, 220], [x - 26, 40], [x, 10], [x + 26, 40], [x + 20, 220]], { wash: '#2a2a24', washA: 1, line: false }); pencil([[x - 30, 60], [x - 110, 70]], { w: 6, col: '#1a1a14', pass2: false }); }
    blob([[-180, 220], [-200, 20], [-160, -20], [-120, 20], [-130, 220]], { wash: '#f8f4e0', washA: 1, w: 2, col: L }); pencil([[-190, 10], [-250, -100]], { w: 14, col: '#f8f4e0', pass2: false }); pencil([[-140, 10], [-90, -100]], { w: 14, col: '#f8f4e0', pass2: false }); ell(-165, -40, 22, 26, { wash: '#c8a070', washA: 1, w: 1.6, col: L });
    for (let q = 0; q < 4; q++) blob([[-340 + q * 40, 220], [-350 + q * 40, 60], [-320 + q * 40, 40], [-300 + q * 40, 60], [-310 + q * 40, 220]], { wash: '#5a4a3a', washA: 1, line: false });
    ctx.restore(); pop(); rect(470, 1220, 180, 40, { wash: '#f0e8d8', washA: 1, w: 1.4, col: L }); txt('GOYA · 1814', 560, 1240, 20, { col: L, font: 'Osw' });
    const P = [[-200, '#3a5a8a', null], [-80, '#c8a070', 'bun'], [1120, '#2a2a30', 'cap'], [1260, '#a8304a', 'bun']]; P.forEach(([x, c, h], i) => human(x, 1300, 0.64, t, { body: c, hat: h, hatCol: '#2a2a30', legs: '#2a2a36', armR: 'hold', long: h === 'bun' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 7720 + i, face: 'calm' }));
    push(960, 1300, 0.64); human(0, 0, 1, t, { body: '#1e2a3a', hat: 'cap', hatCol: '#1e2a3a', legs: '#1e2a3a', armR: 'hold', seed: 7730, face: 'calm', flip: -1 }); pop(); }
  function floorP(t) { rect(-500, 1300, 2200, 1000, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let i = 0; i < 26; i++) pencil([[-480 + i * 90, 1300], [-560 + i * 100, 1950]], { w: 2, col: '#4a3018', a: 0.6, pass2: false });
    push(560, 1700, 1); rect(-260, -60, 520, 40, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); for (const k of [-230, 230]) pencil([[k, -20], [k, 30]], { w: 10, col: '#3a2410', pass2: false }); pop(); for (let q = 0; q < 6; q++) { pencil([[-300 + q * 300, 1480], [-300 + q * 300, 1400]], { w: 4, col: MD.gold, pass2: false }); } pencil([[-400, 1400], [1500, 1400]], { w: 4, col: '#8a1a1a', pass2: false });
    lightPool(560, 1560, 700, 160, 'rgba(255,240,200,1)', 0.35); castShadow(330, 1650, 120, 480, 0.2, 0.3); moodDark(560, 900, 900, 1800, '#140a06', 0.35); }
  function groundU(t) { rect(-500, 1320, 2200, 1000, { wash: '#a89880', washA: 1, w: 2, col: L }); for (let j = 0; j < 10; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1340 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#b8a890' : '#988870', washA: 1, w: 1, col: '#5a4a38' });
    for (let q = 0; q < 6; q++) { push(-40 + q * 60, 1760 + (q % 2) * 30, 1, q); pencil([[-40, 0], [40, 0]], { w: 8, col: '#6a4a24', pass2: false }); pop(); } push(1100, 1780, 1); ell(0, -10, 50, 14, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop(); push(900, 1800, 1, 0.3); rect(-60, -40, 120, 50, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); pop();
    castShadow(330, 1650, 120, 480, 0.5, 0.35); moodDark(900, 900, 900, 1800, '#140a0a', 0.35); }
  function mapBeat(t) { MAPON = t; scr(() => { const P = GLOBE.map(560, 1050, 68, -2, 45, { landCol: { eurasia: '#e0cca0' } }); GLOBE.fill(IBERIA.map(P), '#ecd6a8'); pencil(IBERIA.concat([IBERIA[0]]).map(P), { w: 4, col: L, pass2: false, gap: false });
    txt('ФРАНЦИЯ', P([2, 46.5])[0], P([2, 46.5])[1], 44, { col: '#1e3a8a', font: 'Osw' }); txt('ИСПАНИЯ', P([-4.5, 39.2])[0], P([-4.5, 39.2])[1], 40, { col: '#7a2a1a', font: 'Osw' });
    GLOBE.city(P, -1.47, 43.49, 'БАЙОННА', { size: 30, left: true }); GLOBE.city(P, -3.7, 42.34, 'БУРГОС', { size: 30, left: true }); GLOBE.city(P, MAD.lon, MAD.lat, 'МАДРИД', { size: 40, col: MD.red });
    const k = clamp((t - EV.gy_nap) / 0.8); GLOBE.route(P, [[1, 47], [-1.47, 43.49], [-3.7, 42.34], [MAD.lon, MAD.lat + 0.15]], k, { col: '#1e3ae8', label: '1808 · АРМИЯ НАПОЛЕОНА', t, t0: EV.gy_nap + 0.4, lx: 190, ly: 0, w: 14 });
    GLOBE.route(P, [[3, 43.3], [1.5, 41.4], [-1.5, 40.8], [MAD.lon + 0.2, MAD.lat]], clamp(k * 1.1 - 0.15), { col: '#1e3ae8', w: 10 }); }); }
  WORLD.goya = (t, u, cat) => {
    const b = beat(t);
    if (b === 1) { lay(1, () => mapBeat(t)); return; }
    if (b === 0) { lay(40, () => skyU(t)); lay(10, () => streetU(t)); lay(2.8, () => crowdU(t)); lay(1, () => { groundU(t); cat(); }); lay(0.6, () => { for (const x of [-150, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#1a1010', 1); }); lay(1.6, () => motes(24, [-100, 600, 1200, 1500], '#a89890', t, 7740, { sp: 2, sz: 5, a: 0.3, wob: 30 })); return; }
    lay(20, () => prado(t)); lay(1, () => { floorP(t); cat(); }); lay(0.6, () => { for (const x of [-150, 1230]) sil([[x - 80, 2300], [x - 70, 1400], [x + 70, 1380], [x + 80, 2300]], '#2a1a10', 1); });
    if (t < EV.gy_exec + 0.25) scr(() => { ctx.save(); ctx.globalAlpha = 1 - (t - EV.gy_exec) / 0.25; ctx.fillStyle = '#1a1210'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.goya = {
    outfit: 'hussar', light: { side: 1, rim: '#ffe0b0' }, grade: ['#2a1a1a', 0.1],
    act: () => [[S0.goya, 'annoyed'], [EV.gy_up, 'angry'], [EV.gy_exec, 'cold'], [EV.gy_goya, 'cold']],
    pose: (t, u, b) => { if (beat(t) === 2) { const w = clamp((t - EV.gy_exec) / 0.8); return Object.assign(b, { x: lerp(200, 330, sm(w)), y: 1650, s: 0.92, walk: w < 1 ? t * 7 : 0, noHat: t > EV.gy_goya, look: [0.7, -0.7], hand: t > EV.gy_goya ? [120, -330] : [150, -300] }); }
      return Object.assign(b, { x: 330, y: 1650, s: 0.95, look: [0.8, -0.4], hand: t > EV.gy_up ? [140, -480] : [150, -300] }); },
    hud: t => { if (beat(t) === 2) infoPlate(560, 1340, [['ГОЙЯ · «ТРЕТЬЕ МАЯ 1808»', 40, MD.goldL], ['написана в 1814 · музей Прадо', 28]], t, EV.gy_goya - 0.1); },
    cam: () => [[S0.goya, 560, 960, -0.06], [EV.gy_up, 600, 1000, 0.04, 'x'], [EV.gy_nap - 0.01, 600, 1000, 0.04], [EV.gy_exec, 560, 900, -0.04], [EV.gy_goya, 560, 860, -0.02], [S1.goya, 560, 860, 0.02]]
  };
  TRANS_IN.goya = { a: 0.08, b: 0.36, fx(k, t, A, B) {              // пороховой дым: клубы закрывают кадр
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(7750); for (let i = 0; i < 26; i++) ell(r() * W, r() * H, 200 + r() * 260, 160 + r() * 200, { wash: i % 2 ? '#d8d4cc' : '#9a968e', washA: 0.95 * a, line: false }); }); } };
})();
