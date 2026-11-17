/* 029 — сцена `deport`: май 1944, ночь, станция у крымскотатарского селения. Главный свет — холодная луна, второй — жёлтый
   фонарь на столбе у вагонов. За станцией дома с черепицей, часть — обгоревшие после оккупации (без символики), минарет,
   кипарисы. На «оккупации» камера проходит по руинам; на «Сталин» на стене отрывной календарь листает 18 → 19 → 20 МАЯ;
   к вагонам идут семьи с узлами, рядом грузовики без опознавательных знаков и силуэты конвоя (оружие за спиной, без насилия).
   На «двести тысяч» — плашка «≈ 191 000 ЧЕЛОВЕК · 18–20 МАЯ 1944 (данные НКВД)», состав трогается, Том снимает шапку.
   Переход В: мимо камеры проходит тёмный товарный состав и открывает ночь. */
(() => {
  EV.dp_ruin = wtk('s6', 'оккупации');
  EV.dp_stalin = wtk('s6', 'Сталин');
  EV.dp_days = wtk('s6', 'дня');
  EV.dp_num = wtk('s6', 'двести');
  EV.dp_tat = wtk('s6', 'татар.');
  KEYW.push('оккупации', 'дня', 'татар.');
  const L = KR.ink, LAMP = [720, 1000], go = t => t > EV.dp_num ? (t - EV.dp_num) : 0;
  function sky(t) { vgrad(-900, 1100, ['#060a18', '#0e1a34', '#1e2e4a', '#2a3a52'], 1); glow(880, 380, 140, 'rgba(200,220,255,1)', 0.3); ell(880, 380, 50, 50, { wash: '#e8eef8', washA: 1, line: false });
    const r = rng(5500); for (let i = 0; i < 70; i++) { ctx.fillStyle = `rgba(255,250,235,${0.2 + r() * 0.5})`; ctx.fillRect(r() * 1400 - 150, r() * 800 - 300, 3, 3); } }
  function far(t) { ridgeKR(1050, 300, '#1a2236', 5501); }
  function village(t) {                                              // дома с черепицей, часть обгорела; минарет; кипарисы
    blob([[-500, 1150], [400, 1100], [1700, 1140], [1700, 1300], [-500, 1300]], { wash: '#2a3040', washA: 1, w: 2, col: L });
    for (let i = 0; i < 9; i++) { const x = -360 + i * 190, ruined = i % 3 === 1, h = 120 + (i % 2) * 30; rect(x, 1180 - h, 140, h, { wash: ruined ? '#3a3434' : '#5a5a6a', washA: 1, w: 1.6, col: L });
      if (!ruined) { poly([[x - 12, 1180 - h], [x + 70, 1180 - h - 40], [x + 152, 1180 - h]], { wash: '#5a3028', washA: 1, w: 1.6, col: L }); rect(x + 50, 1180 - h + 30, 34, 30, { wash: i % 2 ? '#e8c060' : '#2a2a3a', washA: 1, w: 1.2, col: L }); }
      else { for (let q = 0; q < 4; q++) pencil([[x + q * 40, 1180 - h], [x + q * 40 + 20, 1180 - h - 50 + q * 10]], { w: 6, col: '#1a1414', pass2: false }); poly([[x, 1180 - h], [x + 40, 1180 - h + 30], [x + 90, 1180 - h - 10], [x + 140, 1180 - h + 20], [x + 140, 1180 - h]], { wash: '#1a1414', washA: 1, line: false });
        for (let q = 0; q < 3; q++) { const ph = (t * 0.3 + q / 3) % 1; ell(x + 70 + ph * 40, 1180 - h - 40 - ph * 260, 30 + ph * 50, 22 + ph * 30, { wash: '#4a4a52', washA: 0.5 * (1 - ph), line: false }); } } }
    push(980, 1180, 0.8); rect(-20, -380, 40, 380, { wash: '#7a7a8a', washA: 1, w: 1.6, col: L }); poly([[-24, -380], [0, -470], [24, -380]], { wash: '#4a4a5a', washA: 1, w: 1.4, col: L }); pop();
    for (const [x, h] of [[-420, 200], [260, 240], [1180, 220]]) cypress(x, 1190, h, t, x);
  }
  function station(t) {                                              // товарный состав, паровоз, грузовики, семьи, конвой
    rect(-500, 1300, 2200, 40, { wash: '#4a4a52', washA: 1, w: 2, col: L }); const tx = -go(t) * 60;
    for (let i = 0; i < 6; i++) { const x = -400 + i * 300 + tx; rect(x, 1080, 280, 220, { wash: '#4a2e24', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: '#1a0e0a', ang: 1.57 } }); rect(x + 110, 1120, 60, 140, { wash: '#1a0e0a', washA: 1, w: 1.6, col: L }); rect(x + 20, 1100, 40, 22, { wash: '#14100c', washA: 1, w: 1.2, col: L });
      for (const k of [40, 240]) ell(x + k, 1310, 30, 30, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); }
    push(1500 + tx, 1300, 1); rect(-220, -200, 300, 160, { wash: '#1a1a1e', washA: 1, w: 2.4, col: L }); rect(60, -260, 140, 220, { wash: '#14141a', washA: 1, w: 2.4, col: L }); rect(-180, -280, 50, 80, { wash: '#14141a', washA: 1, w: 2, col: L }); for (const k of [-160, -40, 80]) ell(k, -20, 46, 46, { wash: '#2a2a30', washA: 1, w: 2, col: L });
    for (let q = 0; q < 8; q++) { const ph = (t * 0.6 + q / 8) % 1; ell(-155 - ph * 160, -300 - ph * 300, 40 + ph * 80, 30 + ph * 50, { wash: '#8a8e98', washA: 0.6 * (1 - ph), line: false }); } pop();
    if (t > EV.dp_stalin - 0.3) { push(1200, 1300, 0.62); rect(-160, -150, 260, 130, { wash: '#3a4434', washA: 1, w: 2, col: L }); rect(100, -110, 110, 90, { wash: '#3a4434', washA: 1, w: 2, col: L }); for (const k of [-110, 40, 160]) ell(k, -10, 34, 34, { wash: '#14141a', washA: 1, w: 1.6, col: L }); glow(215, -70, 60, 'rgba(255,230,160,1)', 0.5); pop(); }
    const fam = [[-120, '#7a3a3a', 'scarf'], [-30, '#3a4a6a', null], [60, '#6a5a3a', 'scarf'], [150, '#3a3a3a', 'fur'], [520, '#5a3a5a', 'scarf'], [610, '#4a5a4a', null], [690, '#6a4a3a', 'scarf'], [870, '#3a3a4a', 'fur']];
    const walkK = clamp((t - EV.dp_stalin) / 2.4);
    fam.forEach(([x, c, h], i) => human(x + walkK * 60 * (i % 2 ? 1 : 0.6), 1330, i % 4 === 3 ? 0.42 : 0.56, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#c8b8a0' : '#2a1a10', legs: '#2a2a30', armR: 'hold', armL: i % 2 ? 'hold' : 'down', prop: i === 3 ? 'stick' : undefined, beard: i === 3 ? '#d8d0c0' : undefined, long: h === 'scarf' ? 1 : undefined, seed: 5510 + i, face: 'calm', flip: 1 }));
    for (const x of [330, 1000]) { sil([[x - 22, 1330], [x - 26, 1220], [x - 14, 1196], [x + 14, 1196], [x + 26, 1220], [x + 22, 1330]], '#0e1018', 1); ell(x, 1180, 16, 18, { wash: '#0e1018', washA: 1, line: false }); pencil([[x + 10, 1210], [x + 30, 1150]], { w: 4, col: '#0e1018', pass2: false }); }
  }
  function ground(t) {                                               // перрон, узлы, чемоданы, чайник, люлька, свёрнутый ковёр, фонарь
    rect(-500, 1440, 2200, 900, { wash: '#3a3c44', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 22; i++) ell(-480 + i * 100 + (j % 2) * 50, 1460 + j * 60, 44, 24, { wash: (i + j) % 3 ? '#44464e' : '#34363e', washA: 1, w: 1, col: '#1a1a20' });
    push(LAMP[0], 1640, 1); pencil([[0, 0], [0, -640]], { w: 10, col: '#1a1a1e', pass2: false }); pencil([[0, -640], [60, -640]], { w: 6, col: '#1a1a1e', pass2: false }); ell(60, -620, 26, 20, { wash: '#ffe0a0', washA: 1, w: 2, col: L }); glow(60, -620, 70, 'rgba(255,220,150,1)', 0.45); pop();
    lightPool(LAMP[0] + 60, 1680, 520, 150, 'rgba(255,210,140,1)', 0.45); lightPool(880, 1600, 900, 220, 'rgba(170,190,240,1)', 0.18);
    for (const [x, y, c] of [[860, 1720, '#8a5a3a'], [940, 1750, '#6a3a2a'], [1040, 1700, '#7a6a4a']]) { push(x, y, 1); blob([[-50, 0], [-60, -60], [-30, -100], [30, -100], [60, -60], [50, 0]], { wash: c, washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#2a1a10', ang: 0.6 } }); pencil([[-20, -100], [0, -126], [20, -100]], { w: 4, col: L, pass2: false }); pop(); }
    push(1160, 1780, 1); rect(-80, -70, 160, 70, { wash: '#5a3a24', washA: 1, w: 2, col: L }); rect(-20, -84, 40, 14, { wash: '#2a1a10', washA: 1, w: 1.4, col: L }); pop();
    push(520, 1800, 1); ell(0, -30, 34, 30, { wash: '#8a8e98', washA: 1, w: 2, col: L }); pencil([[30, -40], [56, -60]], { w: 5, col: '#6a6e78', pass2: false }); pop();
    push(-40, 1760, 1); shape([[-120, 0], [120, 0], [120, -50], [-120, -50]], { wash: '#8a1a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-90 + q * 45, -25, 12, 16, { wash: KR.gold, washA: 1, w: 1, col: L }); pop();
    push(80, 1860, 1, 0.3); ell(0, 0, 20, 14, { wash: '#c8a868', washA: 1, w: 1.4, col: L }); ell(14, -12, 8, 8, { wash: '#c8a868', washA: 1, w: 1.2, col: L }); pop();
    castShadow(330, 1612, 120, 500, 0.6, 0.4); moodDark(LAMP[0] + 60, 1000, 600, 1500, '#04060c', 0.5);
  }
  function calendar(t) {                                             // отрывной календарь на столбе: 18 → 19 → 20 МАЯ
    if (t < EV.dp_stalin - 0.2) return; push(800, 1120, 1); rect(-70, -100, 140, 160, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); rect(-70, -100, 140, 34, { wash: KR.red, washA: 1, w: 1.6, col: L }); txt('МАЙ 1944', 0, -83, 20, { col: '#fff', font: 'Osw' });
    const d = t < EV.dp_days - 0.2 ? 18 : t < EV.dp_days + 0.25 ? 19 : 20; txt(String(d), 0, -10, 70, { col: L, font: 'Osw' });
    const fl = (t - EV.dp_days + 0.2) % 0.45; if (t > EV.dp_days - 0.2 && t < EV.dp_days + 0.7 && fl < 0.25) { const k = fl / 0.25; push(0, -66 + k * 200, 1, k * 1.5); rect(-70, 0, 140, 120 * (1 - k * 0.5), { wash: '#f4ecdc', washA: 1 - k, w: 1.4, col: L, a: 1 - k }); pop(); } pop();
  }
  function front(t) { for (let i = 0; i < 4; i++) { const x = -180 + i * 470; pencil([[x, 2300], [x, 1700]], { w: 22, col: '#0a0a10', pass2: false }); } pencil([[-300, 1760], [1500, 1740]], { w: 8, col: '#0a0a10', pass2: false }); }
  WORLD.deport = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(8, () => village(t)); lay(3, () => { station(t); depthFog('#1a2236', 0.05); }); lay(2.2, () => calendar(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(1.8, () => motes(16, [-100, 700, 1200, 1500], '#a8b8d8', t, 5530, { sp: 2, sz: 2.4, a: 0.3, wob: 20 }));
  };
  DIR.deport = {
    outfit: 'vatnik', light: { side: 1, rim: '#a8c0f0' }, grade: ['#0e1a34', 0.14],
    act: () => [[S0.deport, 'cold'], [EV.dp_stalin, 'annoyed'], [EV.dp_num, 'scared'], [EV.dp_tat, 'cold']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.4), x = lerp(130, 330, sm(w1)), capOff = t > EV.dp_num + 0.2;
      return Object.assign(b, { x, y: 1612, s: 0.95, walk: w1 < 1 ? t * 8 : 0, noHat: capOff, look: t > EV.dp_num ? [0.8, -0.2] : t > EV.dp_stalin ? [0.6, -0.5] : [0.8, -0.3], hand: capOff ? [130, -330] : [150, -300], nod: capOff ? 0.15 : 0 }); },
    afterCat: (t, u, P) => { if (t > EV.dp_num + 0.2) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x + 10, y + 10, 1, 0.4); blob([[-50, 0], [-46, -40], [0, -56], [46, -40], [50, 0]], { wash: '#2a2a30', washA: 1, w: 2, col: L }); pop(); } },
    hud: t => { if (t > EV.dp_num - 0.05) { const k = popK(t, EV.dp_num - 0.05, 0.3); push(560, 840, k, -0.03); ctx.save(); ctx.fillStyle = 'rgba(10,10,18,0.88)'; ctx.fillRect(-330, -95, 660, 190); ctx.restore(); pencil([[-330, -95], [330, -95], [330, 95], [-330, 95], [-330, -95]], { w: 4, col: '#a8c0f0', pass2: false });
      txt('≈ 191 000 ЧЕЛОВЕК', 0, -30, 64, { col: '#ffffff', font: 'Osw' }); txt('18–20 МАЯ 1944 · ВЫСЛАНЫ ЗА 3 ДНЯ', 0, 28, 30, { col: '#a8c0f0', font: 'Osw' }); txt('по данным НКВД', 0, 66, 22, { col: '#8a9ab8', font: 'Osw' }); pop(); } },
    cam: () => [[S0.deport, 300, 960, -0.06], [EV.dp_ruin, 380, 940, -0.02], [EV.dp_stalin - 0.1, 520, 1040, 0.02], [EV.dp_stalin + 0.25, 560, 1100, 0.1, 'x'], [EV.dp_num - 0.1, 560, 1080, 0.06], [EV.dp_num + 0.3, 480, 1160, 0.12], [S1.deport, 460, 1180, 0.16]]
  };
  TRANS_IN.deport = { a: 0.12, b: 0.4, fx(k, t, A, B) {             // мимо камеры проходит товарный состав: вагоны едут, за ними — ночь
    const e = sm(k), X = -1600 + e * 3200; drawBuf(e < 0.5 ? A : B);
    scr(() => { for (let i = 0; i < 4; i++) { const x = X + i * 420; if (x < -500 || x > 1500) continue; rect(x, -40, 400, 2000, { wash: '#2a1a14', washA: 1, w: 3, col: KR.ink, shade: { gap: 14, a: 0.3, col: '#0a0604', ang: 1.57 } }); rect(x + 150, 600, 100, 700, { wash: '#14100c', washA: 1, w: 2, col: KR.ink }); } }); } };
})();
