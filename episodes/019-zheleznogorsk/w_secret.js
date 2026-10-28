/* 019 — сцена `secret`: 1954–1957, зимний вечер в Соцгороде (будущий Железногорск). Новые кирпичные «сталинки» с балконами,
   кинотеатр «Спартак» с афишей, почта с синим ящиком, фонари, дети с санками, почтальон; в конце улицы — КПП со шлагбаумом и солдатом.
   На «картах» всплывает карта СССР с пустым пятном на месте города, на «письмах» — конверт «Красноярск-26» со штампом «строительство
   железных рудников», на «Ага, железные!» Том косится, на штампе появляется красный «?». Переход В сцену — газета летит в лицо и становится конвертом. */
(() => {
  EV.sc_city = wtk('s5', 'Город');
  EV.sc_map = wtk('s5', 'картах');
  EV.sc_mail = wtk('s5', 'письмах');
  EV.sc_iron = wtk('s5', 'рудники».');
  EV.sc_aga = wtk('s5', 'Ага,');
  SHAKES.push([EV.sc_aga, 0.2, 4]);
  KEYW.push('нет.', '«железные', 'рудники».');
  const L = '#140c08';

  function sky(t) { vgrad(-900, 1200, ['#0e1430', '#26305a', '#4a4a7a', '#8a6a7a'], 1); const r = rng(19501); for (let i = 0; i < 60; i++) { ctx.fillStyle = '#eef0ff'; ctx.globalAlpha = 0.6; ctx.fillRect(r() * 1400 - 150, r() * 700 - 400, 2, 2); } ctx.globalAlpha = 1; glow(200, 600, 500, 'rgba(255,170,120,1)', 0.18); }
  function far(t) { mountain(t, { x: 620, top: 820, base: 1080, w: 1300, col: '#2a3048', colD: '#10142a', colL: '#4a5070', tree: '#141a30', trees: 50, snow: 0.7, snowCol: '#aab4d0', seed: 8 });
    for (let k = 0; k < 5; k++) { const x = 300 + k * 160; pencil([[x, 1090], [x + 4, 900 - k * 10]], { w: 8, col: '#3a3a4a', pass2: false }); for (let q = 0; q < 4; q++) { const ph = (t * 0.25 + q / 4 + k * 0.2) % 1; ell(x + ph * 60, 890 - k * 10 - ph * 200, 20 + ph * 50, 16 + ph * 30, { wash: '#8a8aa0', washA: 0.35 * (1 - ph), line: false }); } } }   // трубы котельной
  function house(x, base, w, h, t, o = {}) {                       // кирпичная «сталинка»: карниз, пилястры, балконы, окна с наличниками
    const b = rect(x, base - h, w, h, { wash: o.col || '#b0684a', washA: 1, w: 2.2, col: L }); hatch(b.path, b.bb, { gap: 7, a: 0.18, col: '#5a2a1a', ang: 0, w: 1 }); shadeG(b.path, x, 0, x + w, 0, '#2a0e06', 0.35);
    rect(x - 12, base - h - 26, w + 24, 26, { wash: '#e0d4bc', washA: 1, w: 2, col: L }); pencil([[x - 12, base - h - 30], [x + w + 12, base - h - 30]], { w: 10, col: '#eef2fa', a: 0.9, pass2: false });
    const cols = Math.floor(w / 90), rows = Math.floor((h - 60) / 120), r = rng(19510 + x);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const wx = x + 24 + i * (w - 48) / cols, wy = base - h + 40 + j * 120, ww = (w - 48) / cols - 26, lit = r() < 0.7;
      rect(wx - 6, wy - 8, ww + 12, 86, { wash: '#e8dcc4', washA: 1, w: 1.4, col: L }); rect(wx, wy, ww, 70, { wash: lit ? '#ffcf7a' : '#2a2a3a', washA: 1, w: 1.4, col: L }); pencil([[wx + ww / 2, wy], [wx + ww / 2, wy + 70]], { w: 2, col: L, pass2: false }); pencil([[wx, wy + 26], [wx + ww, wy + 26]], { w: 2, col: L, pass2: false });
      if (lit) { glow(wx + ww / 2, wy + 35, 70, 'rgba(255,200,120,1)', 0.35); if (r() < 0.3) ell(wx + ww * 0.7, wy + 56, 8, 10, { wash: '#c8402a', washA: 1, line: false }); }   // герань на окне
      if (j === 1 && i % 2 === 0) { rect(wx - 14, wy + 74, ww + 28, 12, { wash: '#d8ccb0', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 6; q++) pencil([[wx - 10 + q * (ww + 20) / 5, wy + 74], [wx - 10 + q * (ww + 20) / 5, wy + 48]], { w: 2, col: '#3a3a3a', pass2: false }); pencil([[wx - 14, wy + 48], [wx + ww + 14, wy + 48]], { w: 2.4, col: '#3a3a3a', pass2: false }); } }
    for (let k = 0; k < 2; k++) rect(x + w * (0.25 + k * 0.5) - 10, base - h - 70, 20, 50, { wash: '#7a4a3a', washA: 1, w: 1.6, col: L });
  }
  function street(t) {
    house(-420, 1240, 520, 520, t, { col: '#a8604a' }); house(130, 1220, 300, 380, t, { col: '#b8784a' });
    // кинотеатр «Спартак»: портик с колоннами, афиша, огни
    push(640, 1240, 1); rect(-210, -400, 420, 400, { wash: '#d8c8a8', washA: 1, w: 2.4, col: L }); poly([[-240, -400], [0, -500], [240, -400]], { wash: '#e8dcc4', washA: 1, w: 2.4, col: L }); pencil([[-236, -404], [0, -502], [236, -404]], { w: 10, col: '#eef2fa', a: 0.9, pass2: false });
    for (let k = 0; k < 5; k++) { const x = -170 + k * 85; rect(x - 14, -330, 28, 330, { wash: '#efe6d2', washA: 1, w: 1.8, col: L }); }
    rect(-180, -390, 360, 54, { wash: '#7a1a14', washA: 1, w: 2, col: L }); for (let q = 0; q < 7; q++) { const on = Math.sin(t * 6 + q) > -0.3; txt('СПАРТАК'[q], -138 + q * 46, -362, 40, { col: on ? '#ffe08a' : '#8a5a3a', font: 'Osw' }); if (on) glow(-138 + q * 46, -362, 30, 'rgba(255,220,120,1)', 0.4); }
    rect(-90, -260, 180, 230, { wash: '#2a3a6a', washA: 1, w: 2, col: L }); txt('КАРНАВАЛЬНАЯ', 0, -220, 20, { col: '#ffe08a', font: 'Osw' }); txt('НОЧЬ', 0, -190, 40, { col: '#ffe08a', font: 'Osw' }); ell(0, -110, 50, 50, { wash: '#e8b0a0', washA: 1, w: 1.6 }); pop();
    house(900, 1220, 320, 420, t, { col: '#a85a44' });
    // КПП в конце улицы
    push(980, 1250, 0.8); rect(-60, -140, 120, 140, { wash: '#d8dce4', washA: 1, w: 2, col: L }); rect(-40, -110, 80, 50, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); glow(0, -85, 80, 'rgba(255,214,140,1)', 0.5); for (let k = 0; k < 8; k++) rect(60 + k * 34, -60, 34, 14, { wash: k % 2 ? '#c8302a' : '#f2f2f2', washA: 1, w: 1.2, col: L }); pop();
    human(1060, 1250, 0.34, t, { body: '#4a5a3a', legs: '#2a2a1a', hat: 'cap', hatCol: '#4a5a3a', armR: 'hold', prop: 'stick', propAng: 0.1, seed: 181, face: 'angry' });
  }
  function folks(t) {                                               // жители: почтальон, дети с санками, мама с коляской, пара у кино
    const bob = Math.sin(t * 6) * 3;
    human(560, 1330, 0.5, t, { body: '#2a3a5a', legs: '#1a1a2a', hat: 'cap', hatCol: '#2a3a5a', armR: 'hold', prop: 'scroll', face: 'smile', seed: 182 }); blob([[580, 1250], [620, 1252], [626, 1300], [578, 1302]], { wash: '#6a4a2a', washA: 1, w: 1.6, col: L });   // почтальон и сумка
    for (let i = 0; i < 2; i++) { const x = 820 + i * 60 + Math.sin(t * 2 + i) * 20; human(x, 1360 + bob * (i ? 1 : -1), 0.34, t + i, { body: i ? '#b8322a' : '#2a6a9a', legs: '#2a2a2a', hat: 'fur', hatCol: i ? '#f2f2f2' : '#3a3a3a', armL: 'wave', face: 'smile', seed: 183 + i }); }
    push(760, 1380, 0.6); rect(-50, -16, 100, 12, { wash: '#8a5a2a', washA: 1, w: 1.6, col: L }); for (const sd of [-1, 1]) pencil([[sd * 44, -4], [sd * 50, 8], [sd * 66, 2]], { w: 3, col: '#3a3a3a', pass2: false }); pop();   // санки
    human(420, 1320, 0.48, t, { body: '#6a3a5a', legs: '#2a2a2a', hat: 'scarf', hatCol: '#c8a040', armR: 'hold', face: 'calm', seed: 185 }); push(500, 1320, 0.5); blob([[-50, -40], [-40, -100], [40, -110], [50, -40]], { wash: '#3a5a4a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) ell(sd * 34, -20, 18, 18, { wash: '#2a2a2a', washA: 1, w: 1.6 }); pop();   // коляска
    human(640, 1300, 0.4, t, { body: '#3a3a3a', legs: '#1a1a1a', hat: 'cap', hatCol: '#2a2a2a', armR: 'hold', face: 'smile', seed: 186 }); human(680, 1300, 0.38, t, { body: '#8a2a3a', legs: '#2a2a2a', hat: 'scarf', hatCol: '#e8e0d0', armL: 'hold', face: 'smile', seed: 187, flip: -1 });
    for (let k = 0; k < 3; k++) { const x = -60 + k * 150; pole(x, 1340, 330, t, { lamp: 0.7 }); }
  }
  function ground(t) {
    snowGround(1240, t, { col: '#d8dcec', colD: '#8a90b0', seed: 5 });
    for (let k = 0; k < 5; k++) { const x = -100 + k * 260; glow(x + 90, 1360, 160, 'rgba(255,200,120,1)', 0.25); }
    push(250, 1420, 1); rect(-40, -150, 80, 150, { wash: '#2a5aa8', washA: 1, w: 2.4, col: L }); rect(-46, -160, 92, 24, { wash: '#1e4a90', washA: 1, w: 2, col: L }); rect(-26, -110, 52, 8, { wash: '#0a0a0a', washA: 1, line: false }); txt('ПОЧТА', 0, -60, 20, { col: '#f6ecd6', font: 'Osw' }); pencil([[-46, -164], [46, -164]], { w: 8, col: '#eef2fa', a: 0.9, pass2: false }); pop();   // почтовый ящик
  }
  function pobeda(x, y, s, t) {                                     // «Победа» ГАЗ-М20 у тротуара, в снегу
    push(x, y, s); const c = '#3a4a5a';
    const b = blob([[-300, -40], [-300, -120], [-200, -150], [-120, -250], [100, -260], [220, -170], [300, -140], [310, -40]], { wash: c, washA: 1, w: 2.6, col: L }); shadeG(b.path, 0, -260, 0, -40, '#0a1018', 0.45); metalG(b.path, -40, -200, 200, '#8aa0b8', c, '#0a1018');
    shape([[-110, -236], [-20, -244], [-20, -160], [-160, -160]], { wash: '#1a2030', washA: 1, w: 1.8, col: L }); shape([[0, -244], [90, -240], [190, -166], [0, -160]], { wash: '#1a2030', washA: 1, w: 1.8, col: L }); glow(60, -200, 60, 'rgba(255,214,140,1)', 0.2);
    for (const sd of [-1, 1]) { ell(sd * 180, -36, 54, 54, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); ell(sd * 180, -36, 26, 26, { wash: '#c8ccd0', washA: 1, w: 1.6, col: L }); }
    ell(300, -110, 18, 14, { wash: '#fff2c8', washA: 1, w: 1.4, col: L }); glow(330, -110, 160, 'rgba(255,240,200,1)', 0.5); pencil([[-300, -90], [310, -90]], { w: 4, col: '#c8ccd0', a: 0.8, pass2: false });
    pencil([[-150, -258], [130, -262]], { w: 12, col: '#eef2fa', a: 0.95, pass2: false }); pencil([[-300, -44], [-160, -150]], { w: 8, col: '#eef2fa', a: 0.8, pass2: false }); pop();
  }
  function front(t) { for (let k = 0; k < 2; k++) spruce(k ? 1250 : -180, 2000, 900, t, 30 + k, { snow: 1, col: '#1a2a2a', colD: '#060c0c', snowCol: '#c8d0e4', w: 0.32 }); blob([[900, 1920], [980, 1760], [1150, 1730], [1260, 1920]], { wash: '#e4e8f4', washA: 1, w: 2, col: '#7a8098' }); }
  function hud(t) {
    if (t > EV.sc_map - 0.1 && t < EV.sc_mail) { const k = popK(t, EV.sc_map - 0.1, 0.35); push(600, 820, 0.8 + 0.2 * k, 0.03);
      rect(-260, -150, 520, 300, { wash: '#efe4c4', washA: 1, w: 3, col: L }); txt('КАРТА СССР', 0, -124, 26, { col: '#3a2a10', font: 'Osw' });
      blob([[-240, -40], [-160, -100], [0, -110], [180, -90], [240, -20], [200, 90], [40, 110], [-140, 100], [-230, 60]], { wash: '#d8e4c0', washA: 1, w: 1.6, col: '#5a6a3a' }); pencil([[60, -100], [50, -30], [64, 40], [52, 100]], { w: 4, col: '#2a5a9a', pass2: false }); ell(46, 10, 6, 6, { wash: '#1a1a1a', washA: 1, line: false }); txt('Красноярск', 0, 34, 18, { col: '#1a1a1a' });
      pencil(ellPts(96, -10, 30, 22, 0, 0, 24), { w: 3, col: '#b8322a', pass2: false }); txt('???', 96, -8, 26, { col: '#b8322a', font: 'Osw' }); pop(); }
    if (t > EV.sc_mail - 0.1) { const k = popK(t, EV.sc_mail - 0.1, 0.35); push(600, 820, 0.8 + 0.2 * k, -0.04);
      rect(-270, -150, 540, 300, { wash: '#f2ead2', washA: 1, w: 3, col: L }); pencil([[-270, -150], [0, 10], [270, -150]], { w: 2, col: '#a89a70', pass2: false });
      txt('Красноярск-26', -40, 40, 44, { col: '#1a2a6a', font: 'Hand' }); txt('п/я 9', -110, 90, 32, { col: '#1a2a6a', font: 'Hand' }); rect(170, -130, 80, 90, { wash: '#c8402a', washA: 1, w: 1.6, col: L }); txt('СССР', 210, -84, 20, { col: '#f6ecd6', font: 'Osw' });
      if (t > EV.sc_iron - 0.2) { const q = popK(t, EV.sc_iron - 0.2, 0.3); push(80, -60, 0.6 + 0.4 * q, -0.15); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = '#2a5aa8'; ctx.strokeRect(-200, -40, 400, 80); ctx.restore(); txt('СТРОИТЕЛЬСТВО', 0, -12, 26, { col: '#2a5aa8', font: 'Osw' }); txt('ЖЕЛЕЗНЫХ РУДНИКОВ', 0, 20, 26, { col: '#2a5aa8', font: 'Osw' }); pop(); }
      if (t > EV.sc_aga) { const q = sm((t - EV.sc_aga) / 0.3); txt('?', 250, -10, 120 * q, { col: '#c81e16', font: 'Hand', rot: 0.2 }); }
      pop(); }
  }

  WORLD.secret = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => street(t));
    lay(3.5, () => { ground(t); folks(t); });
    lay(1.5, () => { pobeda(1010, 1640, 0.95, t); for (let k = 0; k < 10; k++) { const x = 560 + k * 28, y = 1560 + k * 34; ell(x, y, 9, 4, { wash: '#8a90b0', washA: 0.6, line: false }); } });
    lay(1, () => cat());
    lay(0.6, () => front(t));
    motes(60, [-200, -200, 1300, 2000], '#eef2ff', t, 19502, { sp: 50, vx: -14, sz: 2.8, a: 0.75, wob: 22 });
    haze('#4a4a7a', 0.05);
  };
  DIR.secret = {
    outfit: 'suitK', light: { side: -1, rim: '#ffd090' }, grade: ['#4a3a6a', 0.12],
    act: () => [[S0.secret, 'smug'], [EV.sc_map, 'suspicious'], [EV.sc_mail, 'talk'], [EV.sc_iron, 'smug'], [EV.sc_aga - 0.05, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1500, s: 1.04, look: t < EV.sc_aga ? [0.6, -0.4] : [-0.2, 0.05], tilt: t > EV.sc_aga ? -0.06 : 0, point: t > EV.sc_mail && t < EV.sc_aga ? 1 : undefined, hand: t > EV.sc_mail && t < EV.sc_aga ? [200, -320] : undefined, frost: 0.2 }),
    cam: () => [[S0.secret, 660, 1080, 0.2], [EV.sc_map, 620, 1040, 0.14], [EV.sc_mail, 600, 1040, 0.16], [EV.sc_aga, 420, 1080, 0.3, 'x'], [S1.secret, 440, 1080, 0.28]],
    hud
  };
  TRANS_IN.secret = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {      // газета в траурной рамке летит в лицо, переворачивается — и это конверт
    const q = sm(k); drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.05 - 0.05 * q);
    scr(() => { const s = k < 0.5 ? lerp(0.2, 3.2, sm(k / 0.5)) : lerp(3.2, 0.1, sm((k - 0.5) / 0.5)), r = k * 7, fl = Math.cos(k * Math.PI); push(lerp(560, 900, k), lerp(1000, 700, k), s, r * 0.2); ctx.scale(1, Math.max(0.05, Math.abs(fl)));
      if (fl > 0) { rect(-200, -140, 400, 280, { wash: '#efe6cc', washA: 1, w: 2, col: L }); rect(-200, -140, 400, 280, { wash: 'rgba(0,0,0,0)', washA: 0, w: 14, col: '#0a0a0a' }); txt('ПРАВДА', 0, -96, 50, { col: '#1a1a1a', font: 'Osw' }); }
      else { rect(-200, -140, 400, 280, { wash: '#f2ead2', washA: 1, w: 2, col: L }); pencil([[-200, -140], [0, 20], [200, -140]], { w: 2, col: '#a89a70', pass2: false }); txt('Красноярск-26', 0, 70, 40, { col: '#1a2a6a', font: 'Hand' }); }
      pop(); });
  } };
})();
