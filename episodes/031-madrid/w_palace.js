/* 031 — сцена `palace`: 1764, Королевский дворец. Тёплый вечер, солнце слева (главный свет), холодная тень двора — второй.
   Огромный белый фасад: колонны, пилястры, балюстрада со статуями королей, ряды окон, герб без символики (просто картуш), ворота с решёткой;
   на плацу кареты, гвардия в синем, дамы с веерами, слуги с подносами, собаки. Том (камзол) идёт вдоль фасада.
   На «три тысячи четыреста комнат» окна зажигаются одно за другим, счётчик «0 → 3 418 КОМНАТ · 135 000 М²»;
   на «Нынешний король» Том дёргает колокольчик у ворот — выскакивает указатель «КОРОЛЬ ЖИВЁТ: САРСУЭЛА →», Том косится.
   Переход В: двери дворца распахиваются створками. */
(() => {
  EV.pl_built = wtk('s4', 'построили');
  EV.pl_rooms = wtk('s4', 'тысячи');
  EV.pl_king = wtk('s4', 'Нынешний');
  EV.pl_other = wtk('s4', 'другом.');
  KEYW.push('комнат.', 'другом.');
  const L = MD.ink, SUN = [160, 520], lit = t => clamp((t - EV.pl_rooms + 0.2) / 1.4);
  function sky(t) { vgrad(-900, 1050, ['#2a4a8a', '#c88a7a', '#f8c080', '#ffe8b8'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,220,150,1)', 0.4); ell(SUN[0], SUN[1], 58, 58, { wash: '#fff0c8', washA: 1, line: false }); }
  function facade(t) {                                               // фасад дворца: 3 этажа окон, колонны, балюстрада со статуями, купол часовни
    push(600, 1180, 1); const L2 = L, n = 15, k = lit(t);
    rect(-760, -560, 1520, 560, { wash: '#f0e8da', washA: 1, w: 2.4, col: L2, shade: { gap: 9, a: 0.1, col: '#a89878', ang: 1.4 } }); rect(-760, -180, 1520, 180, { wash: '#c8beb0', washA: 1, w: 2, col: L2, shade: { gap: 6, a: 0.2, col: '#7a7060', ang: 0.2 } });
    for (let i = 0; i < n; i++) { const x = -720 + i * 100; pencil([[x - 12, -560], [x - 12, -180]], { w: 10, col: '#e0d6c4', pass2: false });
      for (let f = 0; f < 3; f++) { const y = -520 + f * 120, on = (i * 3 + f) / (n * 3) < k; rect(x + 14, y, 52, 80, { wash: on ? '#ffd890' : '#3a4a5a', washA: 1, w: 1.4, col: L2 }); poly([[x + 8, y], [x + 40, y - 18], [x + 72, y]], { wash: '#e8dcc8', washA: 1, w: 1.2, col: L2 }); if (on) glow(x + 40, y + 40, 40, 'rgba(255,220,150,1)', 0.18); } }
    rect(-780, -600, 1560, 40, { wash: '#e8dcc8', washA: 1, w: 2, col: L2 }); for (let i = 0; i < 16; i++) { const x = -740 + i * 98; rect(x - 10, -680, 20, 80, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L2 }); ell(x, -690, 14, 16, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L2 }); }
    blob([[-140, -600], [-120, -720], [0, -780], [120, -720], [140, -600]], { wash: '#8a9aa8', washA: 1, w: 2, col: L2, shade: { gap: 6, a: 0.25, col: '#4a5a6a', ang: 1.4 } }); pencil([[0, -780], [0, -840]], { w: 5, col: MD.gold, pass2: false });
    rect(-90, -170, 180, 170, { wash: '#2a2a30', washA: 1, w: 2, col: L2 }); for (let q = 0; q < 8; q++) pencil([[-80 + q * 22, -170], [-80 + q * 22, 0]], { w: 3, col: MD.gold, pass2: false }); ell(0, -250, 60, 50, { wash: MD.gold, washA: 1, w: 2, col: L2 }); pop();
    depthFog('#f0e0d0', 0.04); }
  function plaza(t) {                                                // плац: кареты, гвардия, дамы, слуги, собаки
    rect(-500, 1180, 2200, 200, { wash: '#d8ccb4', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.12, col: '#8a7a60', ang: 0.2 } });
    push(1120, 1290, 0.6); rect(-150, -220, 300, 160, { wash: '#1e3a6a', washA: 1, w: 2, col: L }); rect(-120, -200, 90, 80, { wash: '#8ac0e0', washA: 1, w: 1.4, col: L }); poly([[-160, -220], [0, -260], [160, -220]], { wash: MD.gold, washA: 1, w: 1.6, col: L }); for (const q of [-100, 100]) ell(q, -40, 50, 50, { line: true, w: 6, col: '#2a1a10' }); pop();
    const P = [[-280, '#1e3a8a', 'tricorn', 'spear'], [-160, '#1e3a8a', 'tricorn', 'spear'], [80, '#f0a0c0', 'bun', 'wave'], [200, '#a8e0d0', 'bun', 'hold'], [760, '#1e3a8a', 'tricorn', 'spear'], [880, '#6a4a2a', null, 'up'], [1300, '#1e3a8a', 'tricorn', 'spear']];
    P.forEach(([x, c, h, a], i) => { human(x, 1360, 0.66, t, { body: c, trim: MD.gold, hat: h, hatCol: '#14100a', legs: '#f0e8d8', armR: a === 'spear' ? 'hold' : a, prop: a === 'spear' ? 'spear' : undefined, long: h === 'bun' ? 1 : undefined, hair: h === 'bun' ? '#e8dcc8' : '#d8d0c0', flip: x > 600 ? -1 : 1, seed: 7610 + i, face: 'calm' });
      if (a === 'up') { push(x + 30, 1360 - 0.66 * 330, 0.66); ell(0, 0, 50, 10, { wash: '#c8c8d0', washA: 1, w: 1.4, col: L }); ell(-14, -16, 12, 14, { wash: '#f0e8d8', washA: 1, w: 1, col: L }); ell(14, -16, 12, 14, { wash: '#f0e8d8', washA: 1, w: 1, col: L }); pop(); } });
    for (const x of [400, 470]) { push(x, 1370, 0.5); blob([[-60, -30], [-50, -70], [40, -74], [60, -40]], { wash: '#f0e8dc', washA: 1, w: 1.6, col: L }); for (const lx of [-40, -20, 30, 46]) pencil([[lx, -30], [lx, 0]], { w: 6, col: '#f0e8dc', pass2: false }); blob([[50, -70], [90, -100], [104, -80], [70, -60]], { wash: '#f0e8dc', washA: 1, w: 1.4, col: L }); pop(); }
  }
  function ground(t) {                                               // брусчатка плаца, фонари, кадка с апельсином, ступени, колокольчик у ворот, указатель
    rect(-500, 1380, 2200, 1000, { wash: '#b8a890', washA: 1, w: 2, col: L }); for (let j = 0; j < 10; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1400 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#c8b8a0' : '#a89880', washA: 1, w: 1, col: '#6a5a48' });
    lightPool(SUN[0] + 300, 1660, 800, 160, 'rgba(255,220,150,1)', 0.4);
    for (const x of [-80, 1180]) { push(x, 1780, 1); rect(-60, -80, 120, 80, { wash: '#8a5a32', washA: 1, w: 2, col: L }); pencil([[0, -80], [0, -180]], { w: 8, col: '#5a3a1a', pass2: false }); ell(0, -230, 80, 70, { wash: '#3a6a2a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 5; q++) ell(-40 + q * 20, -230 + (q % 2) * 20, 10, 10, { wash: '#f8a030', washA: 1, line: false }); pop(); }
    lamp(980, 1700, 0.9, 0);
    push(600, 1680, 1); pencil([[0, 0], [0, -300]], { w: 8, col: '#2a2a30', pass2: false }); const ring = t > EV.pl_king - 0.1 && t < EV.pl_king + 0.6 ? Math.sin(t * 40) * 0.4 : 0; push(0, -300, 1, ring); poly([[-30, 0], [30, 0], [20, -40], [-20, -40]], { wash: MD.gold, washA: 1, w: 2, col: L }); pop(); pop();
    if (t > EV.pl_other - 0.15) { const k = sm(clamp((t - EV.pl_other + 0.15) / 0.3)); push(820, 1700 + (1 - k) * 300, 1, Math.sin(t * 6) * 0.03 * (1 - k)); pencil([[0, 0], [0, -320]], { w: 12, col: MD.woodD, pass2: false });
      shape([[-170, -380], [150, -380], [200, -330], [150, -280], [-170, -280]], { wash: '#f0e6cc', washA: 1, w: 2.4, col: L }); txt('КОРОЛЬ ЖИВЁТ:', 0, -350, 28, { col: L, font: 'Osw' }); txt('САРСУЭЛА →', 0, -306, 36, { col: MD.red, font: 'Osw' }); pop(); }
    castShadow(330, 1650, 120, 480, 0.6, 0.35); moodDark(1200, 900, 900, 1800, '#1a1020', 0.3);
  }
  WORLD.palace = (t, u, cat) => {
    lay(40, () => sky(t)); lay(9, () => facade(t)); lay(3, () => plaza(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-150, 1230]) { rect(x - 90, 1300, 180, 1100, { wash: '#2a2420', washA: 1, line: false }); rect(x - 110, 1260, 220, 50, { wash: '#3a322a', washA: 1, line: false }); } });
    lay(1.8, () => motes(14, [-100, 700, 1200, 1500], '#ffe8c0', t, 7630, { sp: 2, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.palace = {
    outfit: 'kamzol', light: { side: -1, rim: '#ffd8a0' }, grade: ['#3a2a3a', 0.05],
    act: () => [[S0.palace, 'proud'], [EV.pl_rooms, 'awe'], [EV.pl_king, 'suspicious'], [EV.pl_other, 'sideeye']],
    pose: (t, u, b) => { const w1 = clamp((t - EV.pl_king + 0.8) / 0.7), x = lerp(260, 480, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 > 0 && w1 < 1 ? t * 9 : 0, look: t > EV.pl_other ? [0.9, 0.1] : [0.6, -0.8], hand: t > EV.pl_king - 0.1 && t < EV.pl_other ? [180, -460] : [150, -300] }); },
    hud: t => { if (t > EV.pl_rooms - 0.1) { const k = clamp((t - EV.pl_rooms + 0.1) / 1.2); infoPlate(560, 780, [[Math.round(3418 * k).toLocaleString('ru-RU') + ' КОМНАТ', 60, MD.goldL], ['135 000 М² · крупнейший в Западной Европе', 26]], t, EV.pl_rooms - 0.1); } },
    cam: () => [[S0.palace, 600, 860, -0.16], [EV.pl_rooms, 620, 820, -0.12], [EV.pl_king - 0.1, 560, 1100, 0.06, 'x'], [EV.pl_other, 640, 1140, 0.1], [S1.palace, 640, 1150, 0.12]]
  };
  TRANS_IN.palace = { a: 0.08, b: 0.38, fx(k, t, A, B) {            // створки дворцовых дверей распахиваются
    const e = sm(k); drawBuf(B); scr(() => { const w = (1 - e) * 540; for (const sd of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.rect(sd < 0 ? 0 : W - w, 0, w, H); ctx.clip(); ctx.translate(sd < 0 ? -(540 - w) : (540 - w), 0); ctx.drawImage(A, 0, 0); ctx.restore(); }
      if (e < 0.95) { pencil([[w, 0], [w, H]], { w: 18, col: MD.gold, pass2: false, gap: false }); pencil([[W - w, 0], [W - w, H]], { w: 18, col: MD.gold, pass2: false, gap: false }); } }); } };
})();
