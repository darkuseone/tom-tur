/* 031 — сцена `hook`. 0–1,25 с: глобус по смыслу — красным горят владения Испанской империи XVI в. («ИСПАНСКАЯ ИМПЕРИЯ»), пин «МАДРИД?»,
   резкий наезд точно в центр полуострова: шесть радиальных дорог сходятся в «КМ 0» → облачная вспышка → 2026, Пуэрта-дель-Соль.
   Полдень, солнце справа (главный свет), холодные тени — второй. Каса-де-Корреос с часами, медведь с земляничным деревом, дома с балконами
   и геранями, толпа, уличный музыкант с гитарой, голуби, латунная плита «КМ 0» под ногами. Том входит шагом и встаёт на плиту.
   На «без моря» — карточка «МОРЕ ✗», на «без собора» — «СОБОР ✗», на «Почему» — «?»; на «Отматываем» Том берёт красную мулету. Планы — window.HQ. */
(() => {
  const G1 = 1.25;
  EV.hk_zoom = 0.38; EV.hk_land = G1;
  EV.hk_sea = wtk('h1', 'моря');
  EV.hk_cat = wtk('h1', 'собора!');
  EV.hk_why = wtk('h1', 'Почему');
  EV.hk_cape = wtk('h2', 'Отматываем');
  KEYW.push('Абсурд!', 'собора!', 'Мадрид?');
  const L = MD.ink, SUN = [930, 380];
  function sky(t) { vgrad(-900, 1050, ['#2a6ad0', '#6aaee8', '#c8e4f4', '#f8ecd0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 58, 58, { wash: '#fffbe0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(7200 + i), y = 320 + i * 90, dx = (t * 10) % 200; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#ffffff', washA: 0.55, line: false }); }
    for (let i = 0; i < 6; i++) { const x = 200 + i * 150 + Math.sin(t * 1.2 + i) * 30, y = 620 + (i % 2) * 40; pencil([[x - 16, y - Math.sin(t * 9 + i) * 8], [x, y], [x + 16, y - Math.sin(t * 9 + i) * 8]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { for (let i = 0; i < 7; i++) habsburg(-420 + i * 230, 1000, 200, 200 + (i % 3) * 50, [MD.brick, MD.ochre, '#e8c8a0', '#c87a5a'][i % 4], t, { spire: i === 1 || i === 5 }); depthFog('#e0eef8', 0.05); }
  function square(t) {                                               // площадь: Каса-де-Корреос, медведь, фонари, толпа, музыкант, туристы
    correos(560, 1180, 0.95, t); bearTree(1060, 1260, 0.7, t);
    for (const x of [-200, 300, 840, 1240]) lamp(x, 1260, 0.7, 0);
    const P = [[-300, '#f8c830', 'straw', 'phone'], [-170, '#3a5aa8', 'cap', 'hold'], [-40, '#c8281e', null, 'wave'], [160, '#7a4a8a', 'bun', 'hold'], [880, '#2a8a5a', 'cap', 'phone'], [1000, '#f4f0e6', 'straw', 'point'], [1180, '#e8603a', null, 'hold'], [1320, '#3a3a4a', 'brim', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1290, 0.6, t, { body: c, skin: ['#e2b48e', '#c88a5a', '#a8704a'][i % 3], hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a2a30', legs: '#2a2a36', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, long: h === 'bun' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 7210 + i, face: t > EV.hk_why ? 'shock' : 'smile' }));
    push(720, 1290, 0.6); rect(-90, -260, 180, 260, { wash: '#2a5a3a', washA: 1, w: 2, col: L }); poly([[-110, -260], [0, -320], [110, -260]], { wash: '#2a5a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) rect(-80 + (q % 3) * 54, -240 + Math.floor(q / 3) * 70, 46, 60, { wash: ['#f0e8d8', '#e8c0a0', '#d8e0e8'][q % 3], washA: 1, w: 1, col: L }); txt('PRENSA', 0, -280, 22, { col: '#f0e8d8', font: 'Osw' }); pop();
    push(240, 1300, 0.6); human(0, 0, 1, t, { body: '#f0a0c0', hat: 'scarf', hatCol: '#f8c830', legs: '#3a2a3a', long: 1, armR: 'hold', seed: 7225, face: 'smile' }); for (let q = 0; q < 7; q++) ell(60 + (q % 3) * 22, -200 - Math.floor(q / 3) * 22, 12, 12, { wash: ['#e8281e', '#f8c830', '#f070a0'][q % 3], washA: 1, w: 1, col: L }); pop();
    human(380, 1290, 0.62, t, { body: '#1a1a1e', hat: 'brim', hatCol: '#1a1a1e', legs: '#1a1a1e', armR: 'swing', seed: 7220, face: 'grin' }); push(400, 1180, 0.6, -0.4); ell(0, 0, 40, 30, { wash: '#a86a2a', washA: 1, w: 1.6, col: L }); pencil([[30, -10], [120, -50]], { w: 6, col: '#5a3a1a', pass2: false }); pop();
  }
  function ground(t) {                                               // брусчатка, плита «КМ 0», голуби, урна, газета, скамья, кашпо с геранями
    rect(-500, 1300, 2200, 1000, { wash: '#c8b8a0', washA: 1, w: 2, col: L }); for (let j = 0; j < 11; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1320 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#d4c4ac' : '#b8a890', washA: 1, w: 1, col: '#7a6a58' });
    lightPool(SUN[0] - 300, 1660, 800, 160, 'rgba(255,240,190,1)', 0.35);
    push(340, 1660, 1); poly([[-130, -10], [130, -10], [110, 40], [-110, 40]], { wash: '#c8a040', washA: 1, w: 2, col: L }); ell(0, 14, 80, 18, { wash: '#e8c868', washA: 1, w: 1.4, col: L }); txt('KM. 0', 0, 14, 26, { col: L, font: 'Osw' }); pop();
    for (let q = 0; q < 4; q++) { push(620 + q * 50, 1760 + (q % 2) * 24, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: L }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pop(); }
    push(1060, 1760, 1); rect(-110, -40, 220, 16, { wash: MD.wood, washA: 1, w: 1.6, col: L }); rect(-110, -90, 220, 14, { wash: MD.wood, washA: 1, w: 1.6, col: L }); for (const k of [-90, 90]) pencil([[k, -24], [k, 0]], { w: 5, col: '#2a2a30', pass2: false }); pop();
    push(-60, 1760, 1); rect(-60, -70, 120, 70, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) ell(-44 + q * 18, -80, 12, 12, { wash: q % 2 ? '#e8281e' : '#f070a0', washA: 1, line: false }); pop();
    push(880, 1820, 1, 0.1); rect(-50, -24, 100, 30, { wash: '#f0ece0', washA: 1, w: 1.4, col: L }); pop();
    castShadow(340, 1660, 120, 520, -0.5, 0.35); moodDark(-200, 900, 1000, 1900, '#10203a', 0.25);
  }
  function front(t) { for (const x of [-150, 1230]) sil([[x - 80, 2300], [x - 60, 1500], [x + 60, 1480], [x + 80, 2300]], '#2a1a10', 1); }
  window.HQ = { sky, far, square, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, MAD_GLOBE))); return; }
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { square(t); depthFog('#e8f0f8', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 7230, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieMAD', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a2a1a', 0.05],
    act: () => [[0, 'awe'], [EV.hk_land, 'annoyed'], [EV.hk_sea, 'sideeye'], [EV.hk_cat, 'shock'], [EV.hk_why, 'suspicious'], [EV.hk_cape, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.7), x = lerp(-40, 340, sm(w1)); return Object.assign(b, { x, y: 1650, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: [0.6, -0.4], hand: t > EV.hk_cape ? [170, -360] : [150, -300], tailUp: t > EV.hk_why }); },
    afterCat: (t, u, P) => { if (t < EV.hk_cape) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s, k = popK(t, EV.hk_cape, 0.3), sw = Math.sin(t * 6) * 20; push(x, y, k); pencil([[-20, 0], [140, -10]], { w: 6, col: MD.woodD, pass2: false });
      shape([[0, 0], [140, -10], [150 + sw, 160], [10 + sw * 0.5, 190]], { wash: '#c8181a', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.25, col: '#6a0a08', ang: 1.4 } }); pop(); },
    hud: t => { const card = (x, t0, draw, lbl) => { if (t < t0 || t > EV.hk_cape) return; push(x, 820, popK(t, t0, 0.3), -0.04); rect(-110, -100, 220, 200, { wash: '#f4f0e6', washA: 1, w: 3, col: L }); draw(); pencil([[-90, -80], [90, 80]], { w: 12, col: MD.red, pass2: false }); pencil([[90, -80], [-90, 80]], { w: 12, col: MD.red, pass2: false }); txt(lbl, 0, 70, 30, { col: L, font: 'Osw' }); pop(); };
      card(330, EV.hk_sea, () => { for (let r = 0; r < 3; r++) { const P = []; for (let x = -80; x <= 80; x += 10) P.push([x, -50 + r * 30 + Math.sin(x / 16 + r) * 8]); pencil(P, { w: 7, col: '#2a7ad0', pass2: false }); } }, 'МОРЕ');
      card(750, EV.hk_cat, () => { rect(-50, -40, 100, 70, { wash: '#d8c8a8', washA: 1, w: 2, col: L }); poly([[-60, -40], [0, -90], [60, -40]], { wash: '#a8988a', washA: 1, w: 2, col: L }); pencil([[0, -90], [0, -120]], { w: 4, col: L, pass2: false }); pencil([[-12, -110], [12, -110]], { w: 4, col: L, pass2: false }); }, 'СОБОР');
      if (t > EV.hk_why && t < EV.hk_cape) { push(560, 1050, popK(t, EV.hk_why, 0.3), 0.1); txt('?', 0, 0, 220, { col: MD.yellow, font: 'Osw' }); pop(); } },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 600, 920, -0.1], [G1 + 0.7, 560, 980, -0.04], [EV.hk_sea, 520, 1040, 0.06, 'x'], [EV.hk_cat, 600, 1000, 0.08], [EV.hk_why, 460, 1120, 0.14, 'x'], [EV.hk_cape, 420, 1200, 0.12], [S1.hook, 400, 1230, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.12, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 960); ctx.rotate(e * 2.8); ctx.scale(1 - e * 0.85, 1 - e * 0.85); ctx.drawImage(A, -540, -960); ctx.restore(); }); } };
})();
