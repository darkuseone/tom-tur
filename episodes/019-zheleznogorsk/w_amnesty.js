/* 019 — сцена `amnesty`: весна 1953. Ворота лагеря открыты, талый снег, лужи, серое небо с прорехой солнца. Из ворот по колее уходит
   колонна освобождённых с котомками; у столба громкоговоритель, на доске — газета в траурной рамке, красный флаг с чёрной лентой.
   На «Умер» флаг приспущен и музыка глохнет, на «Амнистия» створки распахиваются шире, на «семнадцать» HUD-счётчик 0 → 17 000,
   на «идёт» за спиной у ворот встаёт новая колонна (солдаты и зэки) и уходит к горе со строительными лесами у портала.
   Переход В сцену — пыль от бура заволакивает кадр и оседает, в ней проступают ворота. */
(() => {
  EV.am_died = wtk('s4', 'Умер');
  EV.am_amn = wtk('s4', 'Амнистия');
  EV.am_17 = wtk('s4', 'семнадцать');
  EV.am_go = wtk('s4', 'идёт.');
  SHAKES.push([EV.am_amn, 0.25, 5]);
  KEYW.push('Сталин.', 'семнадцать', 'тысяч', 'идёт.');
  const L = '#120c08';

  function sky(t) {
    vgrad(-900, 1200, ['#3a4250', '#6a7480', '#a8acb0', '#d8d0c0'], 1);
    for (let k = 0; k < 7; k++) { const x = ((k * 300 + t * 8) % 2100) - 500, y = 60 + k * 110; blob([[x, y], [x + 200, y - 70], [x + 460, y - 50], [x + 600, y + 20], [x + 300, y + 60]], { wash: k % 2 ? '#5a6270' : '#8a9098', washA: 0.7, w: 0, line: false }); }
    glow(860, 560, 360, 'rgba(255,236,190,1)', 0.45); rays(860, 560, 1.9, 1.1, 1400, 'rgba(255,232,180,0.6)', 0.22, 8, t);
    for (let k = 0; k < 7; k++) { const x = ((k * 170 - t * 40) % 1500) + 100, y = 420 + Math.sin(k) * 60; pencil([[x - 9, y - 4], [x, y], [x + 9, y - 4]], { w: 2.2, col: '#2a2a30', pass2: false }); }   // грачи прилетели
  }
  function far(t) {
    mountain(t, { x: 820, top: 760, base: 1080, w: 1000, col: '#5a6a72', colD: '#2a3438', colL: '#9aa8ae', tree: '#2a3a36', trees: 60, snow: 0.6, snowCol: '#dfe4e8', seed: 6 });
    push(900, 1070, 0.5); portal(0, 0, 1, t, { conc: '#9a9a90', lit: 0.2 }); for (let k = 0; k < 5; k++) pencil([[-360 + k * 180, 0], [-360 + k * 180, -560]], { w: 6, col: '#6a5034', pass2: false }); for (let k = 0; k < 4; k++) pencil([[-380, -k * 140 - 60], [380, -k * 140 - 60]], { w: 5, col: '#6a5034', pass2: false }); pop();   // леса у портала
    taigaRidge(1090, 60, '#3a4644', 13, 1, 18);
    haze('#c8c8c0', 0.1);
  }
  function campGate(t) {
    for (let k = 0; k < 3; k++) barrack(-300 + k * 240, 1170, 210, 120, t + k, { wood: '#5a4834', roof: '#3a3028', snow: 1 });
    wire(-500, 520, 1190, 140, t, { step: 115, post: 8, wood: '#4a3a28', snow: 1 }); wire(920, 1700, 1190, 140, t, { step: 115, post: 8, wood: '#4a3a28', snow: 1 });
    watchtower(470, 1200, 0.66, t, { snow: 1, guard: t < EV.am_go, beam: -0.5 }); watchtower(1000, 1200, 0.66, t, { snow: 1, guard: 1, beam: -2.4 });
    push(720, 1190, 1); const op = 0.35 + 0.65 * sm((t - EV.am_amn) / 0.8);
    for (const sd of [-1, 1]) { pencil([[sd * 170, 0], [sd * 170, -260]], { w: 14, col: '#4a3a28', pass2: false }); push(sd * 170, 0, 1); const w = 160 * (1 - op * 0.75); const g = rect(sd < 0 ? 0 : -w, -240, w, 230, { wash: '#4a5a4a', washA: 1, w: 2, col: L }); if (w > 20) { pencil([[sd < 0 ? 0 : -w, -240], [sd < 0 ? w : 0, -10]], { w: 4, col: '#2a3a2a', pass2: false }); pencil([[sd < 0 ? 0 : -w, -10], [sd < 0 ? w : 0, -240]], { w: 4, col: '#2a3a2a', pass2: false }); } pop(); }
    rect(-200, -320, 400, 60, { wash: '#7a1e18', washA: 1, w: 2, col: L }); txt('ПОЛЯНСКИЙ ИТЛ', 0, -288, 30, { col: '#f6ecd6', font: 'Osw' });
    pencil([[-200, -324], [200, -324]], { w: 8, col: '#e8ecee', a: 0.9, pass2: false }); pop();
    // флаг с чёрной лентой, приспущен на «Умер»
    const fy = lerp(780, 880, sm((t - EV.am_died) / 0.8)); pencil([[1240, 1190], [1240, 740]], { w: 6, col: '#6a6a6a', pass2: false });
    push(1240, fy, 1); const wv = []; for (let q = 0; q <= 10; q++) wv.push([q * 14, Math.sin(q * 0.8 - t * 4) * 8]); shape(wv.concat(wv.slice().reverse().map(([x, y]) => [x, y + 86])).concat([wv[0]]), { wash: '#b8221a', washA: 1, w: 1.8, col: L }); pencil([[0, 0], [24, 44], [10, 110]], { w: 10, col: '#0e0e0e', pass2: false }); pop();
  }
  function crowd2(t) {                                              // освобождённые идут к нам; новая колонна — к горе
    const n = 12;
    for (let i = 0; i < n; i++) { const ph = ((t - S0.amnesty) * 0.07 * (t > EV.am_amn ? 1.6 : 0.6) + i / n) % 1, x = lerp(720, 120 + (i % 3) * 60, ph) + (i % 2 ? 30 : -30) * ph, y = lerp(1200, 1560, ph), s = lerp(0.3, 0.8, ph);
      worker(x, y, s, t + i, { hat: i % 3 ? 'ushanka' : 'cap', hatCol: '#3a3a3a', body: ['#3c4148', '#4a4e56', '#3a3630'][i % 3], tool: 'bag', armR: 'hold', armL: i % 4 === 0 ? 'wave' : 'down', face: i % 4 === 0 ? 'smile' : 'calm', seed: 150 + i, flip: -1 }); }
    if (t > EV.am_go - 0.2) { const k = sm((t - EV.am_go + 0.2) / 0.8);
      for (let i = 0; i < 9; i++) { const ph = clamp((t - EV.am_go + 0.2) * 0.12 + i * 0.05), x = lerp(780 + i * 26, 900, ph), y = lerp(1240, 1090, ph), s = lerp(0.3, 0.12, ph);
        if (i % 3 === 0) human(x, y, s, t + i, { body: '#6a6a3e', legs: '#4a4a2e', hat: 'cap', hatCol: '#5a5a34', seed: 160 + i }); else worker(x, y, s, t + i, { hat: 'ushanka', body: '#3c4148', seed: 170 + i, tool: 'shovel' }); } }
  }
  function props2(t) {                                              // громкоговоритель, доска с газетой, лужи, колея
    pencil([[110, 1250], [118, 760]], { w: 10, col: '#4a3a28', pass2: false }); push(118, 790, 1, -0.3); poly([[0, -20], [70, -50], [70, 50], [0, 20]], { wash: '#5a5e60', washA: 1, w: 2, col: L }); ell(70, 0, 10, 50, { wash: '#2a2a2a', washA: 1, w: 1.6 }); pop();
    if (t > EV.am_died - 0.2 && t < EV.am_amn + 0.5) for (let q = 0; q < 3; q++) { const r = 30 + ((t * 120 + q * 40) % 120); pencil(ellPts(200, 770, r, r * 1.4, 0, 0, 12).slice(10, 15), { w: 3, col: '#f2ead2', a: 1 - r / 150, pass2: false }); }
    push(1040, 1330, 1); pencil([[-80, 0], [-80, -180]], { w: 8, col: '#4a3a28', pass2: false }); pencil([[80, 0], [80, -180]], { w: 8, col: '#4a3a28', pass2: false }); rect(-110, -320, 220, 160, { wash: '#5a4430', washA: 1, w: 2, col: L });
    rect(-96, -308, 192, 136, { wash: '#efe6cc', washA: 1, w: 1.6, col: L }); rect(-96, -308, 192, 136, { wash: 'rgba(0,0,0,0)', washA: 0, w: 8, col: '#0a0a0a' }); txt('ПРАВДА', 0, -284, 30, { col: '#1a1a1a', font: 'Osw' }); for (let q = 0; q < 5; q++) pencil([[-80, -256 + q * 16], [80, -256 + q * 16]], { w: 2, col: '#5a5a5a', a: 0.7, pass2: false }); rect(-40, -246, 80, 50, { wash: '#8a8a8a', washA: 0.6, line: false }); pop();
    for (let k = 0; k < 8; k++) { const y = 1300 + k * 80, x = 300 + (k % 2 ? 380 : -60) + k * 20; ell(x, y, 60 + k * 16, 12 + k * 3, { wash: '#8a98a8', washA: 0.7, w: 1.2, col: '#3a4450', a: 0.5 }); pencil([[x - 40 - k * 6, y - 2], [x + 30 + k * 6, y + 2]], { w: 2, col: '#e8eef4', a: 0.6, pass2: false }); }
  }
  function ground(t) {
    const g = rect(-1500, 1180, 4000, 1300, { wash: '#7a7064', washA: 1, w: 0, line: false }); shadeG(g.path, 0, 1180, 0, 2000, '#3a3028', 0.4); hatch(g.path, g.bb, { gap: 12, a: 0.2, col: '#3a3028', ang: 0.2, w: 1.2 });
    const r = rng(19400); for (let k = 0; k < 18; k++) { const x = -300 + r() * 1700, y = 1200 + r() * 700, w = 80 + r() * 260; blob([[x, y], [x + w * 0.4, y - 16 - r() * 20], [x + w, y], [x + w * 0.5, y + 10]], { wash: '#e8eef2', washA: 0.95, w: 1.2, col: '#8a96a2', a: 0.5 }); }   // остатки снега
    for (const sd of [-1, 1]) pencil([[720 + sd * 60, 1200], [300 + sd * 300, 2200]], { w: 14, col: '#4a3e30', a: 0.7, pass2: false });
  }
  function front(t) {
    for (let k = 0; k < 4; k++) pencil([[-120 + k * 40, 2000], [-80 + k * 40, 1300 + k * 40]], { w: 6, col: '#3a2a1a', pass2: false });
    blob([[880, 1900], [960, 1700], [1180, 1680], [1300, 1900]], { wash: '#e8eef2', washA: 1, w: 2, col: '#7a8692' });
    barrel(1060, 1760, 1.1, '#4a3a2a'); pencil([[1000, 1780], [1200, 1660]], { w: 10, col: '#5a4028', pass2: false });
  }
  function hud(t) {
    if (t < EV.am_17 - 0.1) return; const k = popK(t, EV.am_17 - 0.1, 0.35), n = Math.round(lerp(0, 17000, sm(clamp((t - EV.am_17) / 0.9))));
    push(620, 730, 0.8 + 0.2 * k, -0.03); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-250, -70, 500, 140); ctx.restore(); txt(n.toLocaleString('ru-RU').replace(/ /g, ' '), 0, -6, 80, { col: K.amber, font: 'Osw' }); txt('освобождены досрочно', 0, 48, 26, { col: '#f6e7c8', font: 'Osw' }); pop();
    if (t > EV.am_go) note('стройка идёт', 760, 1040, t, EV.am_go, S1.amnesty, '#f6e7c8', 44, -0.05, [[760, 1060], [850, 1080]]);
  }

  WORLD.amnesty = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(7, () => { ground(t); campGate(t); });
    lay(3, () => { props2(t); crowd2(t); });
    lay(1, () => cat());
    lay(0.62, () => front(t));
    motes(30, [0, 0, 1080, 1700], '#f2f4f6', t, 19401, { sp: 30, vx: -8, sz: 2, a: 0.45 });
    haze('#c8c4b8', 0.05);
  };
  DIR.amnesty = {
    outfit: 'vatnik', light: { side: 1, rim: '#ffe8c0' }, grade: ['#5a6070', 0.12],
    act: () => [[S0.amnesty, 'neutral'], [EV.am_died - 0.05, 'shock'], [EV.am_amn, 'awe'], [EV.am_17, 'grin'], [EV.am_go - 0.05, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.04, look: t < EV.am_17 ? [0.6, -0.3] : t < EV.am_go ? [0.2, 0] : [0.7, -0.4], point: t > EV.am_go ? 1 : undefined, hand: t > EV.am_go ? [200, -300] : undefined, frost: 0.2 }),
    cam: () => [[S0.amnesty, 640, 1040, 0.24], [EV.am_died, 600, 1000, 0.3], [EV.am_amn, 600, 1060, 0.14, 'x'], [EV.am_go, 700, 1000, 0.18], [S1.amnesty, 720, 1000, 0.2]],
    hud
  };
  TRANS_IN.amnesty = { a: 0.35, b: 0.28, runA: 1, fx(k, t, A, B) {     // пыль из забоя заволакивает кадр и оседает над воротами
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 + k * 0.2 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const d = Math.sin(clamp(k) * Math.PI), r = rng(19402); for (let i = 0; i < 40; i++) { const x = r() * 1300 - 100, y = r() * 2100 - 100 + k * 300 * (r() - 0.3), rr = 120 + r() * 260; ell(x, y, rr, rr * 0.7, { wash: i % 2 ? '#b8a890' : '#d8ccb4', washA: 0.85 * d, w: 0, line: false }); } });
  } };
})();
