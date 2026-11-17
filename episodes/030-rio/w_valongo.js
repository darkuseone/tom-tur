/* 030 — сцена `valongo` (драма, без шуток): пристань Валонго, 1811–1843. Сумерки, главный свет — фонарь на причале, второй — холодное
   небо. Каменная лестница-причал, тёмный корабль на рейде, склады с решётками («рынок» на улице Валонго), тумба с цепями (людей в цепях
   в кадре нет), докеры, чайки. Том (матрос) снимает шапку. На «девятьсот тысяч» — КАРТА Южной Атлантики (инфографика): тёмно-красные
   стрелки из Луанды, Бенгелы и из-за мыса Доброй Надежды в Рио, крупно «≈ 900 000 ЧЕЛОВЕК · ВАЛОНГО 1811–1843 · ЮНЕСКО».
   Переход В: волна захлёстывает кадр. Музыка приглушена. */
(() => {
  EV.vl_port = wtk('s6', 'порт');
  EV.vl_num = wtk('s6', 'девятьсот') - 0.1;
  EV.vl_afr = wtk('s6', 'Африки.');
  KEYW.push('девятьсот', 'Африки.');
  const L = RJ.ink, LAMP = [760, 1060];
  function sky(t) { vgrad(-900, 1050, ['#141a2e', '#3a3a5a', '#7a5a6a', '#c88a6a'], 1); for (let i = 0; i < 4; i++) { const r = rng(6700 + i), y = 420 + i * 90, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + r() * 300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#2a2438', washA: 0.6, line: false }); } }
  function gulls(t) { for (let i = 0; i < 5; i++) gull(120 + i * 210 + Math.sin(t * 0.7 + i) * 40, 760 + (i % 2) * 60 + Math.cos(t + i) * 16, 0.6, t, i + 11); }   // чайки над рейдом
  function bay(t) { seaKR(980, 1200, t, 6701, { cols: ['#3a4a6a', '#24304a', '#141c30'], wave: '#6a7a9a', n: 20 }); blob([[-500, 1000], [-300, 860], [-60, 880], [200, 1000]], { wash: '#2a3a3a', washA: 1, w: 2, col: L, a: 0.6 });
    shipRJ(560, 1110, 0.55, t, 'frigate', 4, { sail: '#8a8070' }); depthFog('#5a5a7a', 0.06); }
  function wharf(t) {                                                // склады, лестница-причал, тумба с цепями, докеры
    for (let i = 0; i < 5; i++) { const x = -380 + i * 170; rect(x, 1060, 150, 200, { wash: '#7a6a5a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#3a2a20', ang: 1.4 } }); poly([[x - 10, 1060], [x + 75, 1020], [x + 160, 1060]], { wash: '#6a3a24', washA: 1, w: 1.6, col: L });
      rect(x + 40, 1130, 70, 90, { wash: '#14100c', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) pencil([[x + 48 + q * 18, 1130], [x + 48 + q * 18, 1220]], { w: 3, col: '#3a3a40', pass2: false }); }
    for (let s = 0; s < 6; s++) rect(860 + s * 30, 1240 - s * 26, 500 - s * 60, 26, { wash: '#8a8478', washA: 1, w: 1.6, col: L });
    for (const [x, c] of [[940, '#4a4a52'], [1080, '#5a4a3a'], [1220, '#3a3a42']]) human(x, 1270, 0.6, t, { body: c, skin: '#7a4a2a', legs: '#2a2a30', hat: 'cap', hatCol: '#1a1a1e', armR: 'hold', prop: x === 1080 ? 'stick' : undefined, seed: 6710 + x, face: 'calm', flip: -1 });
  }
  function street(t) {                                               // улица Валонго: телега, церковная башня, фонари, ящики, грузчики, сторожевая будка
    push(1180, 1060, 0.7); rect(-50, -300, 100, 300, { wash: '#d8d0c0', washA: 1, w: 2, col: L }); poly([[-60, -300], [0, -380], [60, -300]], { wash: '#6a3a24', washA: 1, w: 1.6, col: L }); rect(-20, -260, 40, 50, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop();
    push(200, 1280, 0.8); rect(-120, -90, 240, 70, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); for (const k of [-80, 80]) ell(k, -10, 40, 40, { line: true, w: 6, col: '#3a2a1a' }); for (let q = 0; q < 3; q++) rect(-100 + q * 70, -150, 60, 60, { wash: '#8a6a4a', washA: 1, w: 1.4, col: L }); pencil([[120, -60], [220, -40]], { w: 5, col: '#3a2a1a', pass2: false }); pop();
    push(320, 1280, 0.55); blob([[-80, -40], [-70, -110], [60, -120], [90, -60], [80, -40]], { wash: '#5a4a3a', washA: 1, w: 1.6, col: L }); for (const lx of [-60, -30, 50, 70]) pencil([[lx, -40], [lx, 0]], { w: 8, col: '#4a3a2a', pass2: false }); ell(100, -110, 26, 20, { wash: '#5a4a3a', washA: 1, w: 1.4, col: L }); pop();
    for (const x of [-420, 600]) { pencil([[x, 1270], [x, 1080]], { w: 6, col: '#1a1a1e', pass2: false }); rect(x - 14, 1060, 28, 30, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); glow(x, 1075, 50, 'rgba(255,210,140,1)', 0.35); }
    for (const [x, c] of [[-280, '#4a3a2a'], [-160, '#3a3a40'], [460, '#5a4a3a']]) human(x, 1280, 0.55, t, { body: c, skin: '#7a4a2a', legs: '#2a2a30', hat: 'brim', hatCol: '#1a1a1e', armR: 'up', seed: 6730 + x, face: 'calm', flip: x > 0 ? -1 : 1 });
    push(720, 1270, 0.6); rect(-50, -160, 100, 160, { wash: '#6a5a4a', washA: 1, w: 2, col: L }); poly([[-60, -160], [0, -210], [60, -160]], { wash: '#4a3020', washA: 1, w: 1.6, col: L }); rect(-24, -110, 48, 50, { wash: '#ffd890', washA: 0.8, w: 1.2, col: L }); pop();
  }
  function ground(t) {                                               // мокрые камни причала, тумба с цепью, бочки, фонарь, канат, ящики
    rect(-500, 1300, 2200, 1000, { wash: '#5a564e', washA: 1, w: 2, col: L }); for (let j = 0; j < 10; j++) for (let i = 0; i < 16; i++) rect(-480 + i * 140 + (j % 2) * 70, 1310 + j * 64, 136, 60, { wash: (i + j) % 3 ? '#625e56' : '#4e4a44', washA: 1, w: 1, col: '#2a2824' });
    push(LAMP[0], 1640, 1); pencil([[0, 0], [0, -560]], { w: 10, col: '#1a1a1e', pass2: false }); rect(-26, -620, 52, 60, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(0, -590, 80, 'rgba(255,210,140,1)', 0.5); pop();
    lightPool(LAMP[0], 1680, 520, 150, 'rgba(255,200,130,1)', 0.45);
    push(560, 1760, 1); rect(-40, -100, 80, 100, { wash: '#3a3a40', washA: 1, w: 2, col: L }); ell(0, -100, 46, 16, { wash: '#4a4a52', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 8; q++) ell(30 + q * 18, -60 + Math.sin(q) * 10 + q * 10, 9, 6, { line: true, w: 4, col: '#2a2a30' }); pop();
    for (const [x, y] of [[1040, 1760], [1120, 1790]]) { push(x, y, 1); ell(0, -50, 46, 56, { wash: '#4a2e14', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#2a2a30', pass2: false }); pop(); }
    push(-40, 1800, 1); for (let q = 0; q < 4; q++) pencil(ellPts(0, -10 - q * 6, 60 - q * 6, 20, 0, 0.1, 20), { w: 6, col: '#8a7a5a', pass2: false }); pop();
    castShadow(330, 1640, 120, 480, -0.6, 0.4); moodDark(LAMP[0], 1000, 600, 1600, '#06060c', 0.55);
  }
  function mapBeat(t) {                                              // Южная Атлантика: стрелки из Африки в Рио
    const k = sm(clamp((t - EV.vl_num) / 0.25)); if (k <= 0) return; MAPON = t; scr(() => { ctx.save(); ctx.globalAlpha = k;
      const P = GLOBE.map(560, 960, 13, -10, -15, { sea: '#2a3a5a', seaD: '#141c30', landCol: { samerica: '#c8b890', africa: '#b8a080' } });
      GLOBE.city(P, -43.2, -22.9, 'РИО · ВАЛОНГО', { size: 34, col: '#e8281e' }); GLOBE.city(P, ...RIO.luanda, 'ЛУАНДА', { size: 30, left: true }); GLOBE.city(P, 13.4, -12.6, 'БЕНГЕЛА', { size: 28, left: true });
      const rk = clamp((t - EV.vl_num - 0.1) / 0.9);
      GLOBE.route(P, [RIO.luanda, [-43.0, -22.6]], rk, { col: '#a8201e', bend: 0.12, w: 12 }); GLOBE.route(P, [[13.4, -12.6], [-42.8, -23.0]], clamp(rk * 1.1 - 0.1), { col: '#a8201e', bend: 0.08, w: 10 });
      GLOBE.route(P, [[45, -20], [20, -36], [-42.6, -23.3]], clamp(rk * 1.2 - 0.2), { col: '#a8201e', w: 8 });
      ctx.restore(); infoPlate(560, 1250, [['≈ 900 000 ЧЕЛОВЕК', 64, '#ff9a8a'], ['ПРИСТАНЬ ВАЛОНГО · 1811–1843', 32], ['объект ЮНЕСКО с 2017', 26, '#d8d0c0']], t, EV.vl_num + 0.3, { edge: '#c84a3a' }); });
  }
  WORLD.valongo = (t, u, cat) => {
    lay(40, () => sky(t)); lay(24, () => gulls(t)); lay(14, () => bay(t)); lay(4, () => street(t)); lay(3, () => wharf(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#08080c', 1); });
    lay(1.6, () => motes(16, [-100, 700, 1200, 1500], '#a8b0c8', t, 6720, { sp: 2, sz: 2.2, a: 0.3, wob: 20 }));
    mapBeat(t);
  };
  DIR.valongo = {
    outfit: 'sailor', light: { side: 1, rim: '#ffc890' }, grade: ['#141c30', 0.14],
    act: () => [[S0.valongo, 'cold'], [EV.vl_port, 'annoyed'], [EV.vl_num, 'cold']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.1), x = lerp(140, 330, sm(w1)), cap = t > EV.vl_port + 0.3; return Object.assign(b, { x, y: 1640, s: 0.95, walk: w1 < 1 ? t * 7 : 0, noHat: cap, nod: cap ? 0.15 : 0, look: [0.8, -0.2], hand: cap ? [120, -330] : [150, -300] }); },
    cam: () => [[S0.valongo, 560, 940, -0.08], [EV.vl_port, 600, 980, 0.0], [EV.vl_num - 0.05, 500, 1080, 0.1], [S1.valongo, 500, 1080, 0.1]]
  };
  TRANS_IN.valongo = { a: 0.08, b: 0.38, fx(k, t, A, B) {           // тёмная волна захлёстывает кадр снизу вверх
    const e = sm(k), Y = H - e * (H + 400); drawBuf(e < 0.55 ? A : B); scr(() => { const P = [[-50, H + 50]]; for (let x = -50; x <= W + 50; x += 40) P.push([x, Y + Math.sin(x / 90 + t * 6) * 60]); P.push([W + 50, H + 50]);
      if (e < 0.9) { shape(P, { wash: '#1e3a5a', washA: 0.95, w: 4, col: '#e8f4f8' }); pencil(P.slice(1, -1), { w: 14, col: '#e8f4f8', a: 0.8, pass2: false, gap: false }); } }); } };
})();
