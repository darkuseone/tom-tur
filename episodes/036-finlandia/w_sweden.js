/* 036 — сцена `sweden`, 1550. Устье реки Вантаа: шведский король Густав Ваза основывает Хельсинки — деревянные дома, пристань,
   корабли с жёлто-синими вымпелами, лесорубы, рыбаки, сани с брёвнами по первому снегу; на скалах — то самое место будущей Сенатской
   площади (только камни и сосны). Главный свет — холодное северное солнце слева, длинные синие тени. На «шесть веков» — плашка-счётчик
   «≈ 1150 → 1809 · БОЛЬШЕ 600 ЛЕТ ШВЕЦИИ»; на «Швеция» король разворачивает грамоту; Том (шуба) в лодке гребёт. */
(() => {
  const L = FIC.ink, SUN = [120, 600];
  EV.sw_600 = wtk('s1', 'шесть'); EV.sw_se = wtk('s1', 'Швеция.');
  KEYW.push('Швеция.');
  function seFlag(x, y, w, h, t) { const pts = []; for (let q = 0; q <= w; q += 20) pts.push([x + q, y + Math.sin(t * 5 + q * 0.05) * 6 * q / w]); for (let q = w; q >= 0; q -= 20) pts.push([x + q, y + h + Math.sin(t * 5 + q * 0.05) * 6 * q / w]);
    poly(pts, { wash: '#2a5aa8', washA: 1, w: 1.4, col: L }); rect(x + w * 0.3, y, w * 0.12, h, { wash: '#f2c81e', washA: 1, line: false }); rect(x, y + h * 0.42, w, h * 0.16, { wash: '#f2c81e', washA: 1, line: false }); }
  function sky(t) { vgrad(-900, 1100, ['#4a6aa8', '#a8c0dc', '#f0e0c8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,230,180,1)', 0.4); ell(SUN[0], SUN[1], 46, 46, { wash: '#fff4dc', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#f4f4f4', washA: 0.5, line: false }); } }
  function far(t) { hills(1020, 30, '#4a6a5a', 3.3); for (let i = 0; i < 16; i++) { const r = rng(11400 + i); pineF(-200 + i * 100 + r() * 40, 1040, 180 + r() * 80, t, { snow: 1 }); } depthFog('#e8ecf0', 0.07); }
  function harbor(t) {                                              // вода, корабли, деревянный городок, пристань
    rect(-600, 1080, 2400, 160, { wash: FIC.sea, washA: 1, line: false }); vgrad(1080, 1240, ['#8ab8d0', FIC.sea, '#1e3a58'], 0.7); for (let i = 0; i < 16; i++) { const r = rng(11410 + i), x = ((r() * 1600 + t * 16) % 1800) - 300; pencil([[x, 1100 + r() * 120], [x + 50, 1100 + r() * 120]], { w: 2.4, col: '#e8fbff', a: 0.5, pass2: false }); }
    for (let i = 0; i < 2; i++) { push(820 + i * 300, 1150, 0.7 - i * 0.15); blob([[-200, 0], [-170, 40], [170, 40], [220, -20]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[0, 0], [0, -320]], { w: 6, col: '#4a3a2a', pass2: false }); poly([[4, -310], [150, -150], [4, -110]], { wash: '#f0e8d0', washA: 1, w: 1.6, col: L }); seFlag(0, -340, 80, 50, t); pop(); }
    for (let i = 0; i < 6; i++) { const r = rng(11420 + i); push(-200 + i * 140, 1100, 0.7); rect(-60, -90, 120, 90, { wash: i % 2 ? '#8a5a32' : '#a86a3a', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.3, col: FIC.woodD, ang: 0 } }); poly([[-70, -90], [0, -140], [70, -90]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(0, -140, 40, 8, { wash: '#ffffff', washA: 0.9, line: false }); rect(-20, -60, 30, 30, { wash: '#ffd890', washA: 1, w: 1, col: L }); pop(); }
    push(360, 1180, 0.8); human(0, 0, 1, t, { body: '#2a4a8a', bodyD: '#10204a', hat: 'crown', hatCol: '#d8b040', legs: '#2a2a3a', long: 1, armR: t > EV.sw_se ? 'wave' : 'hold', prop: 'scroll', seed: 11430, face: 'smile', beard: 1 }); for (let i = 0; i < 2; i++) human(-90 + i * 180, 0, 0.9, t, { body: '#f2c81e', bodyD: '#8a6a10', hat: 'helmet', legs: '#2a3a6a', armR: 'hold', prop: 'spear', seed: 11431 + i, face: 'calm' }); pop();
  }
  function shore(t) {                                               // снежный берег: лесорубы, сани с брёвнами, рыбаки, скалы будущей площади
    rect(-500, 1260, 2200, 1000, { wash: '#eef2f6', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#8a9ab8', ang: 0.2 } });
    for (let i = 0; i < 4; i++) blob([[700 + i * 120, 1300], [740 + i * 120, 1260], [800 + i * 120, 1270], [820 + i * 120, 1300]], { wash: '#8a8478', washA: 1, w: 1.6, col: L, shade: { gap: 6, a: 0.25, col: '#4a4438', ang: 1 } });
    push(1000, 1320, 0.7); horse(0, 0, 1, t, { col: '#6a4a2a', walk: 1, seed: 3, flip: -1 }); for (let q = 0; q < 3; q++) rect(110, -40 - q * 26, 260, 24, { wash: '#8a5a32', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 3; i++) human(80 + i * 110, 1340, 0.64, t, { body: ['#6a4a3a', '#4a5a3a', '#8a3a2a'][i], hat: 'fur', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: i === 1 ? 'wave' : 'hold', prop: i === 0 ? 'axe' : undefined, seed: 11440 + i, face: 'smile' });
  }
  function ground(t) { sea(t); }
  function sea(t) {                                                 // ближний план — вода и лодка Тома
    rect(-500, 1500, 2200, 900, { wash: '#2a5a7a', washA: 1, line: false }); vgrad(1500, 2400, ['#5a90b0', '#1e3a58'], 0.7); for (let i = 0; i < 22; i++) { const r = rng(11450 + i), x = ((r() * 1600 + t * 30) % 1800) - 300, y = 1520 + r() * 600; pencil([[x, y], [x + 60, y]], { w: 3, col: '#e8fbff', a: 0.5, pass2: false }); }
    for (let i = 0; i < 3; i++) { push(-60 + i * 520, 1600 + (i % 2) * 120, 1); blob([[-60, 0], [-30, -20], [40, -16], [70, 0], [10, 16]], { wash: '#f4f8fc', washA: 1, w: 1.6, col: '#8aa0b8' }); pop(); }
    push(380, 1780, 1); blob([[-260, -40], [-220, 40], [220, 40], [280, -50]], { wash: '#6a4a2a', washA: 1, w: 2.6, col: L, shade: { gap: 8, a: 0.25, col: '#2a1a0a', ang: 0 } }); for (let i = 0; i < 4; i++) pencil([[-220 + i * 120, -40], [-210 + i * 120, 30]], { w: 3, col: '#3a2a1a', pass2: false }); pop();
    lightPool(500, 1700, 900, 160, 'rgba(255,230,180,1)', 0.25); castShadow(380, 1720, 110, 400, 0.4, 0.25); moodDark(1100, 1000, 800, 1900, '#08142a', 0.2);
  }
  function extras(t) { for (let i = 0; i < 3; i++) { const x = ((t * 70 + i * 400) % 1700) - 200, y = 640 + i * 40; push(x, y, 1); pencil([[-30, Math.sin(t * 6 + i) * 10], [0, 0], [30, Math.sin(t * 6 + i) * 10]], { w: 4, col: '#f4f4f0', pass2: false }); pop(); }
    push(1160, 1560, 0.8); blob([[-130, 0], [-100, 30], [100, 30], [140, -4]], { wash: '#8a5a32', washA: 1, w: 2, col: L }); human(0, 0, 0.9, t, { body: '#5a6a8a', hat: 'fur', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: 'hold', prop: 'oar', flip: -1, seed: 11460, face: 'grin' }); pop(); }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 2 : 1); }
  function extras2(t) {                                             // сохнущая рыба на вешалах, коптильня, собаки, дети
    push(-60, 1460, 0.8); for (const k of [-80, 80]) pencil([[k, 0], [k, -200]], { w: 5, col: '#5a3a1a', pass2: false }); pencil([[-90, -190], [90, -190]], { w: 4, col: '#5a3a1a', pass2: false }); for (let q = 0; q < 6; q++) blob([[-70 + q * 28, -186], [-62 + q * 28, -120], [-56 + q * 28, -186]], { wash: '#a8b4c0', washA: 1, w: 1, col: L }); pop();
    push(1180, 1460, 0.8); rect(-70, -120, 140, 120, { wash: '#5a3a24', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.3, col: FIC.woodD, ang: 0 } }); for (let i = 0; i < 4; i++) { const k = (t * 0.3 + i / 4) % 1; ell(Math.sin(t + i) * 14, -130 - k * 160, 14 + k * 30, 10 + k * 20, { wash: '#c8ccd0', washA: 0.4 * (1 - k), line: false }); } pop();
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
    for (let i = 0; i < 2; i++) { push(-100 + i * 1380, 1500, 0.8); pencil([[0, 0], [0, -420]], { w: 7, col: '#2a2a2e', pass2: false }); pencil([[0, -420], [50, -440]], { w: 5, col: '#2a2a2e', pass2: false }); rect(30, -470, 50, 56, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(55, -440, 50, 'rgba(255,210,130,1)', 0.3); ell(55, -476, 30, 8, { wash: '#ffffff', washA: 0.9, line: false }); pop(); }
  }
  WORLD.sweden = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.4, () => harbor(t)); lay(2.4, () => shore(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(30, [-100, 500, 1200, 1900], '#ffffff', t, 11470, { sp: 4, vx: -1, sz: 3, a: 0.7, wob: 10 }));
  };
  DIR.sweden = {
    outfit: 'fur', light: { side: -1, rim: '#ffe0b0' }, grade: ['#10203a', 0.05],
    act: () => [[S0.sweden, 'cold'], [EV.sw_600, 'awe'], [EV.sw_se, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1760, s: 0.9, look: [0.6, -0.4], hand: [160, -260], prop: 'oar' === 'x' ? undefined : undefined, handF: [120, -200], frost: 0.4, squash: Math.sin(t * 4) * 0.02 }),
    hud: t => fiBoard(640, 1000, 0.82, t, EV.sw_600, [['ШВЕЦИЯ: ДО 1809', 46, '#ffe08a'], ['БОЛЬШЕ 600 ЛЕТ', 54]], { w: 480 }),
    cam: () => [[S0.sweden, 600, 1000, -0.1], [EV.sw_600, 620, 980, -0.06], [S1.sweden, 600, 1000, -0.02]]
  };
  TRANS_IN.sweden = { a: 0, b: 0.35, fx(k, t, A, B) { drawBuf(B, 1.08 - 0.08 * sm(k)); whiteOut(1 - sm(k), '242,255,248'); } };
})();
