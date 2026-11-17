/* 029 — сцена `hook`. 0–1,25 с: глобус Земли из космоса — разворот к Чёрному морю и резкий наезд на Крым (пин «КРЫМ»,
   города), облачная вспышка → 2026, смотровая площадка над морем у Ласточкина гнезда. Утро, солнце слева (главный свет),
   второй — холодное море. Том входит слева шагом, встаёт у большой карты Крыма на мольберте: на «Исконно» на карту падает
   красная печать «ИСКОННО?», на «Проверим» — серия печатей хозяев (ГРЕКИ, ХАНСТВО, ИМПЕРИЯ, УССР, УКРАИНА…), Том тычет.
   На «Отматываем» Том идёт к штурвалу-аттракциону у перил и берётся за него — дальше отмотка. Планы — window.HQ (today/button). */
(() => {
  const G1 = 1.25;
  EV.hk_globe = 0.05; EV.hk_zoom = 0.38; EV.hk_land = G1;
  EV.hk_isk = wtk('h1', 'Исконно');
  EV.hk_check = wtk('h1', 'Проверим');
  EV.hk_45 = wtk('h1', 'сорок');
  EV.hk_wheel = wtk('h2', 'Отматываем');
  KEYW.push('Крым?', 'русский»?', 'лет!');
  const STAMPS = [['ГРЕКИ', '#1a4a9a'], ['ХАНСТВО', '#1a7a4a'], ['ИМПЕРИЯ', '#8a1a1a'], ['УССР', '#a8201a'], ['УКРАИНА', KR.ua], ['НЕАНДЕРТАЛЬЦЫ', '#5a3a1a']];
  STAMPS.forEach((s, i) => { EV['hk_st' + i] = EV.hk_check + 0.12 + i * 0.27; });
  const L = KR.ink, SUN = [120, 380];
  function space(t) {                                                // космос + глобус: разворот 0–0,5 с, наезд 0,38–1,2 с (экспо)
    scr(() => { ctx.fillStyle = '#04060e'; ctx.fillRect(0, 0, W, H); const r = rng(4960); for (let i = 0; i < 160; i++) { const x = r() * W, y = r() * H, b = r(); ctx.fillStyle = `rgba(255,250,235,${0.3 + b * 0.6})`; ctx.fillRect(x, y, 1.5 + b * 2.5, 1.5 + b * 2.5); }
      const rk = sm(clamp(t / 0.55)), lon0 = lerp(-25, 34.2, rk), lat0 = lerp(8, 45.2, rk);
      const zk = clamp((t - EV.hk_zoom) / (G1 - 0.08 - EV.hk_zoom)), ze = zk < 1 ? (Math.pow(2, 8 * zk) - 1) / 255 : 1, R = 380 * Math.pow(20000 / 380, ze) * (0.92 + 0.08 * sm(clamp(t / 0.25)));
      globe(540, 980, R, lon0, lat0, t, { pin: R > 15000 ? 0 : sm(clamp((t - 0.2) / 0.2)), label: R < 2500 });
      if (zk > 0.3 && zk < 1) { const a = Math.sin((zk - 0.3) / 0.7 * Math.PI) * 0.8, rr = rng(hsh(FRAME, 4961)); for (let i = 0; i < 40; i++) { const ang = rr() * 6.283, d0 = 200 + rr() * 300; pencil([[540 + Math.cos(ang) * d0, 980 + Math.sin(ang) * d0], [540 + Math.cos(ang) * (d0 + 500), 980 + Math.sin(ang) * (d0 + 500)]], { w: 3, col: '#e8f4ff', a: a * 0.6, pass2: false, gap: false }); } }
      if (t > G1 - 0.14) { const k = (t - G1 + 0.14) / 0.14, rr = rng(4962); for (let i = 0; i < 22; i++) ell(rr() * W, rr() * H, (160 + rr() * 220) * (0.4 + k), (110 + rr() * 140) * (0.4 + k), { wash: '#ffffff', washA: 0.95 * k, line: false }); } });
  }
  function sky(t) { vgrad(-900, 1100, ['#3a7ac8', '#8ac0e8', '#f8e0b0', '#ffd890'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,230,170,1)', 0.4); ell(SUN[0], SUN[1], 70, 70, { wash: '#fff6d8', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(4970 + i), y = 300 + i * 90, dx = (t * 10 * (1 + i * 0.2)) % 300; blob([[-300 + r() * 200 + dx, y], [200 + r() * 300 + dx, y - 30], [700 + r() * 300 + dx, y - 10], [1300 + dx, y + 14], [200 + dx, y + 26]], { wash: '#fff8ec', washA: 0.5, line: false }); }
    for (let i = 0; i < 5; i++) gull(300 + i * 170 + Math.sin(t + i) * 40, 600 + (i % 2) * 60 + Math.cos(t * 1.3 + i) * 20, 0.8, t, i); }
  function far(t) { ridgeKR(1000, 380, '#7a90a8', 4971, { crownX: 120 }); depthFog('#c8e0f0', 0.07); }
  function sea(t) { seaKR(990, 1500, t, 4972, { glint: '#fff0c8', gx: 260 });
    push(420 - (t * 14) % 300, 1140, 0.32); shape([[-160, -20], [160, -20], [130, 10], [-130, 10]], { wash: '#f4f0e8', washA: 1, w: 2, col: L }); pencil([[0, -20], [0, -230]], { w: 4, col: '#4a4a52', pass2: false }); shape([[4, -220], [110, -40], [4, -40]], { wash: '#f8f4ec', washA: 1, w: 1.8, col: L }); shape([[-4, -200], [-80, -40], [-4, -40]], { wash: '#e8f0f8', washA: 1, w: 1.6, col: L }); pop();
    push(80 + (t * 20) % 200, 1080, 0.22); shape([[-200, -30], [200, -30], [170, 10], [-170, 10]], { wash: '#f4f4f0', washA: 1, w: 2, col: L }); rect(-120, -90, 220, 60, { wash: '#e8e4dc', washA: 1, w: 1.6, col: L }); pop(); }
  function cliff(t) {                                                // Аврорина скала и Ласточкино гнездо
    blob([[560, 1500], [600, 1180], [680, 1060], [760, 1010], [900, 1000], [1020, 1020], [1100, 1100], [1200, 1300], [1250, 1500]], { wash: KR.rock, washA: 1, w: 2.6, col: L, shade: { gap: 7, a: 0.3, col: KR.rockD, ang: 1.1 } });
    for (let i = 0; i < 9; i++) pencil([[620 + i * 60, 1100 + (i % 3) * 40], [600 + i * 64, 1400]], { w: 2, col: KR.rockD, a: 0.5, pass2: false });
    push(880, 1000, 1.05); rect(-130, -150, 260, 150, { wash: '#efe8dc', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.15, col: '#a89a80', ang: 1.4 } });
    for (let k = 0; k < 7; k++) rect(-130 + k * 40, -170, 22, 20, { wash: '#efe8dc', washA: 1, w: 1.4, col: L });
    rect(-60, -300, 120, 150, { wash: '#f4ece0', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 4; k++) rect(-60 + k * 34, -322, 18, 22, { wash: '#f4ece0', washA: 1, w: 1.4, col: L });
    for (const [dx, dy] of [[-40, -270], [20, -270], [-40, -220], [20, -220]]) shape([[dx, dy + 30], [dx, dy + 8], [dx + 10, dy], [dx + 20, dy + 8], [dx + 20, dy + 30]], { wash: '#3a4a6a', washA: 1, w: 1.4, col: L });
    for (const dx of [-100, -40, 30, 90]) shape([[dx, -40], [dx, -90], [dx + 12, -104], [dx + 24, -90], [dx + 24, -40]], { wash: '#3a4a6a', washA: 1, w: 1.4, col: L });
    for (const dx of [-90, 90]) { rect(dx - 14, -230, 28, 80, { wash: '#efe8dc', washA: 1, w: 1.6, col: L }); poly([[dx - 18, -230], [dx, -280], [dx + 18, -230]], { wash: '#b84a2a', washA: 1, w: 1.6, col: L }); } pop();
    for (const [x, h] of [[640, 160], [700, 200], [1060, 180]]) cypress(x, 1080, h, t, x);
  }
  function deck(t) {                                                 // смотровая площадка: балюстрада, туристы, бинокль, лоток с магнитами, мороженое
    rect(-500, 1380, 2100, 30, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); for (let i = 0; i < 30; i++) { const x = -480 + i * 70; blob([[x - 12, 1380], [x - 18, 1340], [x - 10, 1310], [x + 10, 1310], [x + 18, 1340], [x + 12, 1380]], { wash: '#f0e6d4', washA: 1, w: 1.6, col: L }); }
    rect(-500, 1296, 2100, 18, { wash: '#e8dcc8', washA: 1, w: 2, col: L });
    const P = [[-200, '#e8603a', 'straw', 'phone'], [-60, '#3a8ac8', 'cap', 'point'], [940, '#f0c040', 'scarf', 'wave'], [1060, '#7a3a8a', null, 'hold'], [1180, '#2a8a5a', 'cap', 'phone'], [1300, '#c83a5a', 'straw', 'point'], [1420, '#3a5a8a', null, 'hips']];
    P.forEach(([x, c, h, a], i) => human(x, 1386, 0.6, t, { body: c, hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a2a30', legs: '#2a2a36', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 4975 + i, face: 'smile' }));
    push(80, 1386, 0.6); pencil([[0, 0], [0, -150]], { w: 10, col: '#3a3a42', pass2: false }); rect(-50, -200, 100, 60, { wash: '#5a8a6a', washA: 1, w: 2, col: L }); for (const k of [-24, 24]) ell(k, -170, 16, 16, { wash: '#1a2a2a', washA: 1, w: 1.6, col: L }); pop();
  }
  function ground(t) {                                               // плитка, мольберт с картой, штурвал-аттракцион, лоток
    rect(-500, 1410, 2100, 900, { wash: '#d8c8aa', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 22; i++) rect(-500 + i * 100 + (j % 2) * 50, 1414 + j * 56, 98, 54, { wash: (i + j) % 3 ? '#e4d4b4' : '#c8b494', washA: 1, w: 1, col: '#8a7a5a' });
    lightPool(SUN[0] + 400, 1620, 700, 160, 'rgba(255,230,170,1)', 0.4);
    push(790, 1600, 0.74); for (const k of [-200, 200]) pencil([[k, 0], [k * 0.8, -520]], { w: 10, col: KR.woodD, pass2: false }); pencil([[0, 0], [0, -470]], { w: 8, col: KR.woodD, pass2: false });
    rect(-250, -630, 500, 380, { wash: KR.paper, washA: 1, w: 3, col: L, shade: { gap: 9, a: 0.1, col: KR.paperD, ang: 0.6 } }); for (let k = 0; k < 4; k++) pencil([[-250 + k * 160, -630], [-240 + k * 160, -250]], { w: 1, col: KR.paperD, a: 0.4, pass2: false });
    ctx.save(); ctx.globalAlpha = 0.35; rect(-240, -620, 480, 360, { wash: '#7ab0d8', washA: 1, line: false }); ctx.restore();
    crimeaMap(-6, -430, 310, { cities: true }); txt('КРЫМ', -150, -590, 34, { col: L, font: 'Osw' });
    if (t > EV.hk_isk - 0.05) stamp(40, -500, 0.95, 'ИСКОННО?', KR.red, -0.12, popK(t, EV.hk_isk - 0.05, 0.25), { size: 60 });
    STAMPS.forEach(([n, c], i) => { const t0 = EV['hk_st' + i]; if (t > t0) { const r = rng(4980 + i); stamp(-150 + r() * 300, -560 + r() * 240, 0.62, n, c, (r() - 0.5) * 0.6, popK(t, t0, 0.2), { size: 56 }); } });
    pop();
    push(170, 1600, 1); pencil([[0, 0], [0, -250]], { w: 26, col: KR.woodD, pass2: false }); rect(-50, -40, 100, 40, { wash: KR.wood, washA: 1, w: 2, col: L }); const wr = t > EV.hk_wheel + 0.2 ? (t - EV.hk_wheel - 0.2) * 3 : 0; wheelKR(0, -330, 0.75, wr); pop();
    push(1120, 1700, 1); rect(-110, -150, 220, 150, { wash: '#2a6a9a', washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) rect(-96 + (q % 4) * 48, -136 + Math.floor(q / 4) * 50, 40, 40, { wash: ['#f0c040', '#e8603a', '#7ab8e8', '#4a9a5a'][q % 4], washA: 1, w: 1.2, col: L }); txt('МАГНИТЫ', 0, -170, 24, { col: L, font: 'Osw' }); pop();
    push(-20, 1720, 1); rect(-80, -110, 160, 110, { wash: '#f4f0e8', washA: 1, w: 2, col: L }); for (const k of [-50, 50]) ell(k, 0, 24, 24, { wash: '#3a3a42', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 3; q++) ell(-40 + q * 40, -130, 18, 18, { wash: ['#ffb0c0', '#fff0c8', '#a8e0a0'][q], washA: 1, w: 1.4, col: L }); pop();
    for (let q = 0; q < 3; q++) { const x = 480 + q * 46; push(x, 1760 + (q % 2) * 20, 0.9); ell(0, -16, 22, 14, { wash: '#e8e8e8', washA: 1, w: 1.4, col: L }); ell(18, -28, 10, 9, { wash: '#f4f4f4', washA: 1, w: 1.2, col: L }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pop(); }   // чайки на плитке
    castShadow(330, 1612, 120, 520, 0.35, 0.38); castShadow(790, 1600, 150, 300, 0.35, 0.3); moodDark(SUN[0], 900, 1100, 1900, '#10203a', 0.3);
  }
  function front(t) { for (const x of [-120, 1200]) { sil([[x - 70, 2300], [x - 40, 1700], [x, 1420], [x + 40, 1700], [x + 70, 2300]], '#0e2016', 1); } sil([[1020, 2300], [1060, 1880], [1120, 1840], [1180, 1900], [1200, 2300]], '#1a1410', 1); }
  window.HQ = { sky, far, sea, cliff, deck, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => space(t)); return; }
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(9, () => sea(t)); lay(5, () => cliff(t)); lay(2.6, () => { deck(t); depthFog('#c8e0f0', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(18, [-100, 700, 1200, 1500], '#fff4d8', t, 4990, { sp: 4, sz: 2.2, a: 0.45, wob: 16, add: 1 }));
    if (t < G1 + 0.3) scr(() => { const k = 1 - (t - G1) / 0.3, rr = rng(4962); for (let i = 0; i < 22; i++) ell(rr() * W, rr() * H, (160 + rr() * 220) * (1.4 + (1 - k) * 2), (110 + rr() * 140) * (1.4 + (1 - k) * 2), { wash: '#ffffff', washA: 0.95 * k, line: false }); });
  };
  DIR.hook = {
    outfit: 'hoodieKR', light: { side: -1, rim: '#ffe0a0' }, grade: ['#1a3a5a', 0.06],
    act: () => [[0, 'awe'], [EV.hk_land, 'talk'], [EV.hk_isk, 'suspicious'], [EV.hk_check, 'smug'], [EV.hk_45, 'grin'], [EV.hk_wheel, 'grin']],
    pose: (t, u, b) => {
      const wIn = clamp((t - G1) / 1.0), toW = clamp((t - EV.hk_wheel + 0.1) / 0.55);
      const x = toW > 0 ? lerp(330, 300, sm(toW)) : lerp(-90, 330, sm(wIn)), walking = (wIn > 0 && wIn < 1) || (toW > 0 && toW < 1);
      const atWheel = toW >= 0.9, poke = t > EV.hk_check - 0.1 && t < EV.hk_wheel;
      return Object.assign(b, { x, y: 1612, s: 1.0, flip: toW > 0 && toW < 0.9 ? -1 : 1, walk: walking ? t * 9 : 0, look: atWheel ? [-0.8, -0.4] : [0.8, -0.4],
        hand: atWheel ? [-120, -330] : poke ? [200, -420] : [150, -300], handF: atWheel ? [-200, -300] : undefined, point: poke && !atWheel, tailUp: t > EV.hk_check }); },
    hud: t => { if (t > EV.hk_45 && t < EV.hk_wheel) { push(560, 820, popK(t, EV.hk_45, 0.3), -0.04); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-230, -60, 460, 120); ctx.restore(); txt('45 000 ЛЕТ', 0, 4, 76, { col: KR.goldL, font: 'Osw' }); pop(); } },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 600, 900, -0.08], [G1 + 1.0, 600, 960, -0.02], [EV.hk_isk, 660, 1080, 0.14, 'x'], [EV.hk_check, 640, 1060, 0.1], [EV.hk_45, 600, 1100, 0.06], [EV.hk_wheel, 360, 1240, 0.14], [S1.hook, 300, 1260, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 980); ctx.rotate(-e * 3.2); ctx.scale(1 - e * 0.85, 1 - e * 0.85); ctx.drawImage(A, -540, -980); ctx.restore(); }); } };
})();
