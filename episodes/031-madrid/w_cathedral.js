/* 031 — сцена `cathedral`: стройка собора Альмудена ускоренной съёмкой — 1883 → 1993. Главный свет — солнце справа, небо меняется
   день-ночь-день (таймлапс), второй — тёплые окна дворца напротив. Слева край Королевского дворца, площадь Армерия, леса и краны вокруг
   собора; собор растёт от фундамента до купола; строители стареют — у них отрастают бороды (гэг). Календарь у Тома листает годы.
   На «девяносто третьем» — собор готов: белый фасад, купол, колокола, голуби взлетают, толпа; на «сто десять лет» — шкала
   «1883 ━━━ 1993 = 110 ЛЕТ». Том (костюм) сидит на ящике, «стареет» (седая борода — пуф). Переход В: прожектор → облако известковой пыли. */
(() => {
  EV.ct_cap = wtk('s7', 'столицы');
  EV.ct_93 = wtk('s7', 'третьем.');
  EV.ct_110 = wtk('s7', 'Строили');
  KEYW.push('третьем.', 'лет.');
  const L = MD.ink, prog = t => sm(clamp((t - S0.cathedral) / (EV.ct_93 - S0.cathedral))), year = t => Math.round(lerp(1883, 1993, prog(t)));
  function sky(t) { const ph = prog(t) < 1 ? (Math.sin((t - S0.cathedral) * 9) * 0.5 + 0.5) : 1; vgrad(-900, 1050, [lerpC('#0e1430', '#3a7ad0', ph), lerpC('#2a2a5a', '#8ac0ea', ph), lerpC('#4a3a5a', '#e8f0f4', ph)], 1);
    if (ph > 0.4) { glow(920, 400, 180, 'rgba(255,240,190,1)', 0.35 * ph); ell(920, 400, 54, 54, { wash: '#fffbe0', washA: ph, line: false }); } }
  function cathedral(t) {                                            // собор растёт; леса и краны пропадают к 1993
    const p = prog(t); push(640, 1160, 0.95);
    const h = 120 + 560 * p; rect(-300, -Math.min(h, 420), 600, Math.min(h, 420), { wash: '#ece6da', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.12, col: '#a8a090', ang: 1.4 } });
    if (h > 200) for (let q = 0; q < 4; q++) { const x = -240 + q * 160; shape([[x - 30, -60], [x - 30, -Math.min(h, 420) + 60], [x, -Math.min(h, 420) + 30], [x + 30, -Math.min(h, 420) + 60], [x + 30, -60]], { wash: '#3a4a5a', washA: 1, w: 1.4, col: L }); }
    if (h > 420) { const dh = h - 420; rect(-110, -420 - Math.min(dh, 130), 220, Math.min(dh, 130), { wash: '#e6dece', washA: 1, w: 2, col: L }); if (dh > 130) { const k = clamp((dh - 130) / 130); blob([[-130, -550], [-110, -550 - 120 * k], [0, -550 - 170 * k], [110, -550 - 120 * k], [130, -550]], { wash: '#5a6a7a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.25, col: '#2a3a4a', ang: 1.3 } }); if (k > 0.9) { pencil([[0, -720], [0, -790]], { w: 5, col: MD.gold, pass2: false }); pencil([[-18, -770], [18, -770]], { w: 5, col: MD.gold, pass2: false }); } } }
    for (const sd of [-1, 1]) if (h > 300) { rect(sd * 300 - 50, -Math.min(h, 520), 100, Math.min(h, 520), { wash: '#e8e0d0', washA: 1, w: 2, col: L }); if (h > 520) poly([[sd * 300 - 56, -520], [sd * 300, -590], [sd * 300 + 56, -520]], { wash: '#5a6a7a', washA: 1, w: 1.6, col: L }); }
    if (p < 0.98) { const a = 1 - clamp((p - 0.85) / 0.13); for (let i = 0; i < 10; i++) pencil([[-360 + i * 80, 0], [-360 + i * 80, -h - 40]], { w: 5, col: '#8a6a3a', a, pass2: false }); for (let j = 0; j < Math.floor((h + 40) / 80); j++) pencil([[-380, -j * 80], [380, -j * 80]], { w: 4, col: '#8a6a3a', a, pass2: false });
      pencil([[420, 0], [420, -h - 200]], { w: 12, col: '#c8a030', a, pass2: false }); pencil([[420, -h - 200], [120, -h - 180]], { w: 10, col: '#c8a030', a, pass2: false }); pencil([[130, -h - 180], [130, -h - 60]], { w: 2, col: '#2a2a30', a, pass2: false }); rect(100, -h - 60, 60, 40, { wash: '#d8d0c0', washA: a, w: 1.4, col: L, a }); }
    pop();
    push(-220, 1160, 0.95); rect(-300, -420, 400, 420, { wash: '#f0e8da', washA: 1, w: 2, col: L }); for (let f = 0; f < 3; f++) for (let i = 0; i < 4; i++) rect(-280 + i * 96, -390 + f * 120, 50, 80, { wash: (i + f) % 2 ? '#ffd890' : '#3a4a5a', washA: 1, w: 1.2, col: L }); pop();
    if (t > EV.ct_93) for (let i = 0; i < 10; i++) { const r = rng(7900 + i), k = clamp((t - EV.ct_93) / 2); push(640 + (r() - 0.5) * 300 + k * (r() - 0.3) * 800, 700 - k * 500 * (0.5 + r()), 0.8); const f = Math.sin(t * 14 + i) * 10; pencil([[-20, -f], [0, 0], [20, -f]], { w: 5, col: '#f8f8f8', pass2: false }); pop(); }
    depthFog('#e8eef4', 0.04); }
  function workers(t) {                                              // строители «стареют» (бороды), толпа на открытии
    const p = prog(t), done = t > EV.ct_93; rect(-500, 1160, 2200, 220, { wash: '#d8ccb4', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.12, col: '#8a7a60', ang: 0.2 } });
    const P = [[-200, '#6a6a5a', 'cap'], [-80, '#7a5a3a', 'helmet'], [880, '#5a5a6a', 'cap'], [1000, '#6a4a3a', 'helmet'], [1120, '#7a6a5a', 'cap']];
    P.forEach(([x, c, h], i) => human(x, 1380, 0.62, t, { body: done ? ['#c8281e', '#f8c830', '#3a5aa8', '#f4f0e6', '#2a8a5a'][i] : c, hat: done ? undefined : h, hatCol: h === 'helmet' ? '#e8e4dc' : '#2a2a30', hair: p > 0.6 ? '#e8e8e8' : '#3a2a1a', beard: p > 0.3 ? (p > 0.6 ? '#f0f0f0' : '#7a6a5a') : undefined, legs: '#3a3a40', armR: done ? 'up' : i % 2 ? 'swing' : 'hold', prop: done ? undefined : i % 2 ? 'axe' : undefined, flip: x > 600 ? -1 : 1, seed: 7910 + i, face: done ? 'grin' : 'calm' }));
  }
  function ground(t) {                                               // площадь Армерия: плиты, ящики, тачка, ведро с раствором, календарь на штативе
    rect(-500, 1380, 2200, 1000, { wash: '#c8bca4', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) rect(-480 + i * 140 + (j % 2) * 70, 1390 + j * 60, 136, 56, { wash: (i + j) % 3 ? '#d4c8b0' : '#b8ac94', washA: 1, w: 1, col: '#7a6e58' });
    lightPool(700, 1640, 800, 160, 'rgba(255,240,190,1)', 0.35);
    push(520, 1740, 1); rect(-60, -80, 120, 80, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); pop(); push(1080, 1780, 1); ell(0, -30, 60, 30, { wash: '#6a6a72', washA: 1, w: 2, col: L }); ell(-80, -20, 26, 26, { line: true, w: 5, col: '#2a2a30' }); pencil([[40, -40], [110, -90]], { w: 6, col: MD.woodD, pass2: false }); pop();
    push(-60, 1800, 1); ell(0, -24, 34, 26, { wash: '#8a8e94', washA: 1, w: 1.6, col: L }); ell(0, -40, 28, 8, { wash: '#d8d0c0', washA: 1, line: false }); pop();
    push(760, 1700, 1); for (const k of [-40, 40]) pencil([[k, 0], [k * 0.5, -200]], { w: 6, col: MD.woodD, pass2: false }); rect(-90, -330, 180, 150, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); rect(-90, -330, 180, 34, { wash: MD.red, washA: 1, w: 1.6, col: L }); txt(String(year(t)), 0, -240, 64, { col: L, font: 'Osw' }); pop();
    castShadow(330, 1650, 120, 480, -0.5, 0.35); moodDark(-200, 900, 900, 1800, '#14182a', 0.25);
  }
  WORLD.cathedral = (t, u, cat) => {
    lay(40, () => sky(t)); lay(7, () => cathedral(t)); lay(2.6, () => workers(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-150, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#1a1410', 1); });
    lay(1.8, () => motes(24, [-100, 600, 1200, 1500], '#f0ece0', t, 7920, { sp: 2, sz: 3, a: 0.4, wob: 20 }));
  };
  DIR.cathedral = {
    outfit: 'suitK', light: { side: 1, rim: '#fff0c0' }, grade: ['#2a2a3a', 0.05],
    act: () => [[S0.cathedral, 'smug'], [EV.ct_cap, 'suspicious'], [EV.ct_93, 'shock'], [EV.ct_110, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1650, s: 0.95, squash: t < EV.ct_93 ? 0.06 : b.squash, look: t > EV.ct_93 ? [0.6, -0.8] : [0.9, -0.1], hand: [150, -300] }),
    afterCat: (t, u, P) => { const p = prog(t); if (p > 0.4) { const x = P.x + 10 * P.s, y = P.y - 300 * P.s; blob([[x - 50, y], [x - 40, y + 60 + p * 60], [x, y + 90 + p * 90], [x + 40, y + 60 + p * 60], [x + 50, y]], { wash: '#f0f0f0', washA: 1, w: 2, col: L }); } puffK(P.x, P.y - 300 * P.s, 1, t, S0.cathedral + 2.2, 0.4, 7930); },
    hud: t => { if (t > EV.ct_110 - 0.05) { const k = sm(clamp((t - EV.ct_110 + 0.05) / 0.9)); push(560, 800, 1); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.88)'; ctx.fillRect(-440, -100, 880, 210); ctx.restore(); pencil([[-440, -100], [440, -100], [440, 110], [-440, 110], [-440, -100]], { w: 4, col: MD.goldL, pass2: false });
      rect(-380, -10, 760, 26, { wash: '#3a3a40', washA: 1, w: 2, col: '#000' }); rect(-380, -10, 760 * k, 26, { wash: MD.gold, washA: 1, line: false }); txt('1883', -380, -50, 40, { col: '#fff6e0', font: 'Osw' }); txt('1993', 380, -50, 40, { col: '#fff6e0', font: 'Osw' }); txt(Math.round(110 * k) + ' ЛЕТ СТРОЙКИ', 0, 66, 50, { col: MD.goldL, font: 'Osw' }); pop(); } },
    cam: () => [[S0.cathedral, 600, 900, -0.12], [EV.ct_cap, 620, 880, -0.08], [EV.ct_93 - 0.1, 640, 860, -0.04], [EV.ct_93 + 0.2, 640, 820, 0.04, 'x'], [EV.ct_110, 520, 1080, 0.06], [S1.cathedral, 520, 1100, 0.08]]
  };
  TRANS_IN.cathedral = { a: 0.08, b: 0.38, fx(k, t, A, B) {         // облако известковой пыли
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(7940); for (let i = 0; i < 28; i++) ell(r() * W, r() * H, 200 + r() * 240, 150 + r() * 200, { wash: i % 2 ? '#f0ece4' : '#d8d2c6', washA: 0.95 * a, line: false }); }); } };
})();
