/* 020 — сцена `valerik`: июль 1840, Кавказская война. Отряд выходит из крепости Грозной (вал и ворота вдали) к лесу у речки Валерик:
   колонна пехоты в белых фуражках, казаки верхом, пушка на передке, обоз. На опушке — поручик в папахе с тетрадью (Лермонтов).
   Знойное утро, зелёный буковый лес, над лесом — дым дальнего боя. На «война» — залп в лесу (вспышки, дым); на «Валерик» — указатель
   «р. Валерикъ» качается; на «Лермонтов» — раскрывается тетрадь со строкой «Я к вам пишу случайно; право…».
   Переход В сцену — ветер сносит пороховой дым вбок, как занавес. */
(() => {
  EV.vl_war = wtk('s2', 'война.');
  EV.vl_river = wtk('s2', 'Валерик');
  EV.vl_poet = wtk('s2', 'Лермонтов.');
  SHAKES.push([EV.vl_war + 0.05, 0.22, 6]);
  KEYW.push('война.', 'Лермонтов.');

  function sky(t) { vgrad(-900, 1300, ['#5a8ac0', '#8ab4d4', '#e0dcc0', '#f0d098'], 1); ell(900, -40, 56, 56, { wash: '#fff4c8', washA: 1, line: false }); glow(900, -40, 400, 'rgba(255,240,190,1)', 0.45); clouds(t, -540, 6, '#f6f2e6', 18401, 0.7); birds(t, 6, [-100, -250, 1200, 150], 18402); }
  function far(t) {
    caucasus(980, t, { col: '#6a86b0', colD: '#34507a', snow: '#f8fafc', h: 460, seed: 7, a: 0.9 });
    foothills(1060, t, '#4a6e48', '#1e3a22', 5, 120);
    for (let k = 0; k < 3; k++) smokeCol(860 + k * 90, 1010, t + k, { n: 6, h: 420, sz: 0.6, col: '#b8b0a0', a: 0.55, wind: 120 });   // дым над лесом — бой у Валерика
    if (t > EV.vl_war) for (let k = 0; k < 6; k++) { const ph = ((t - EV.vl_war) * 3 + k * 0.37) % 1; if (ph < 0.25) glow(820 + k * 50, 1040 + (k % 2) * 16, 40, 'rgba(255,210,120,1)', 0.8 * (1 - ph * 4)); }
  }
  function mid(t) {                                                // далёкая крепость слева, поле, река Валерик с бродом, лес справа
    const L = '#140c06';
    shape([[-600, 1110], [1700, 1100], [1700, 1300], [-600, 1300]], { wash: '#a89a5a', washA: 1, w: 0, line: false });
    rampart(-300, 260, 1130, 40, t, { col: '#8a7a4a' }); palisade(-280, 240, 1092, 30, t, { seed: 5 }); rect(40, 1050, 70, 46, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); poly([[30, 1050], [75, 1022], [120, 1050]], { wash: '#5a3a1e', washA: 1, w: 1.4, col: L });
    txt('кр. Грозная', 80, 1000, 26, { font: 'Hand', col: '#2a1a0a', a: 0.8 });
    sunzha(1180, 1240, t, { top: '#6a8a7a', bot: '#3a5a4a', glint: '#f4f0d8' });
    for (let k = 0; k < 11; k++) { const x = 560 + k * 90, h = 220 + (k % 3) * 60; pencil([[x, 1180], [x + 4, 1180 - h * 0.5]], { w: 10, col: '#4a3a2a', pass2: false }); blob([[x - 80, 1180 - h * 0.4], [x - 70, 1180 - h * 0.85], [x, 1180 - h], [x + 80, 1180 - h * 0.8], [x + 90, 1180 - h * 0.4]], { wash: k % 2 ? '#3a6a2a' : '#2a5a24', washA: 1, w: 1.6, col: '#0e2a0a', a: 0.6, shade: { gap: 6, a: 0.2, col: '#0e2a0a', ang: 1 } }); }   // буковый лес
    for (let k = 0; k < 16; k++) { const x = 200 + k * 40, y = 1170 + Math.sin(k) * 6, b = Math.abs(Math.sin(t * 5 + k)) * 3; rect(x - 6, y - 40 - b, 12, 34, { wash: '#2a3a2a', washA: 1, w: 1, col: L }); ell(x, y - 46 - b, 6, 6, { wash: '#f0f0e8', washA: 1, w: 1, col: L }); pencil([[x + 4, y - 40 - b], [x + 10, y - 70 - b]], { w: 1.6, col: '#3a3a3a', pass2: false }); }   // колонна вдали
  }
  function column(t) {                                              // ближняя колонна: пехота, казаки, пушка на передке, обоз
    const st = t * 2.2;
    for (let k = 0; k < 6; k++) { const x = 420 + ((k * 120 + st * 40) % 500), y = 1300 + (k % 2) * 40; soldier1818(x, y, 0.62, t, { seed: 81 + k, walk: 1, armR: 'hold' }); pencil([[x + 22, y - 130 * 0.62 * 1.4], [x + 30, y - 330 * 0.62]], { w: 4, col: '#4a3a2a', pass2: false }); push(x, y, 0.62); ell(0, -300, 34, 12, { wash: '#f2f0e8', washA: 1, w: 1.4, col: '#1a120a' }); pop(); }
    gman(930, 1350, 0.66, t, { seed: 87, body: '#3a3a4a', gazyri: 1, flip: -1 }); horse(980, 1356, 0.66, t, { col: '#3a2412', saddle: 1, walk: 0.5 });
    gman(1060, 1370, 0.66, t, { seed: 88, body: '#4a3428', gazyri: 1 }); horse(1110, 1376, 0.66, t, { col: '#7a5a3a', saddle: 1, walk: 0.5 });
    cannon(260, 1360, 0.8, t, { balls: 1 }); horse(120, 1360, 0.66, t, { col: '#5a3a20', walk: 0.5 });
    cart(-80, 1370, 0.7, t, { load: 'barrels' });
  }
  function poet(t) {                                               // поручик на опушке: папаха, тетрадь, перо; тетрадь раскрывается на «Лермонтов»
    gman(860, 1420, 0.82, t, { seed: 89, body: '#2e3a2a', legs: '#2a2420', beard: 0, hatCol: '#3a2a1a', armR: 'hold', flip: -1 });
    push(860, 1420, 0.82, 0, -1); for (const sd of [-1, 1]) rect(sd * 50 - 14, -238, 28, 10, { wash: '#e8c050', washA: 1, w: 1, col: '#5a3a08' }); pop();
    if (t > EV.vl_poet - 0.15) { const k = popK(t, EV.vl_poet - 0.15, 0.4); push(760, 900, 0.9 * k, -0.04); const L = '#2a1a0a';
      rect(-190, -120, 380, 240, { wash: '#f2e8cc', washA: 1, w: 2.4, col: L }); pencil([[0, -120], [0, 120]], { w: 2, col: L, a: 0.5, pass2: false });
      txt('Я к вам пишу', -95, -60, 30, { font: 'Hand', col: '#1a1a4a' }); txt('случайно; право…', -95, -20, 26, { font: 'Hand', col: '#1a1a4a' }); txt('«Валерик», 1840', -95, 40, 22, { font: 'Hand', col: '#6a2a1a' });
      for (let q = 0; q < 5; q++) pencil([[20, -70 + q * 34], [170, -70 + q * 34]], { w: 1.6, col: '#3a3a6a', a: 0.4, pass2: false }); txt('М. Ю. ЛЕРМОНТОВ', 95, 92, 22, { col: '#3a1a0a', font: 'Osw' }); pop(); }
  }
  function ground(t) {
    earthBank(1420, t, { col: '#a88a50', grass: '#7a8a3a', seed: 4 });
    const sx = 620, sy = 1520, sw = t > EV.vl_river ? Math.sin((t - EV.vl_river) * 9) * 0.12 * Math.exp(-(t - EV.vl_river) * 2) : 0;   // указатель
    pencil([[sx, sy], [sx, sy - 230]], { w: 9, col: '#5a3a1e', pass2: false }); push(sx, sy - 210, 1, -0.06 + sw); rect(-10, -26, 200, 52, { wash: '#d8c8a0', washA: 1, w: 2, col: '#2a1a0a' }); poly([[190, -26], [226, 0], [190, 26]], { wash: '#d8c8a0', washA: 1, w: 2, col: '#2a1a0a' }); txt('р. Валерикъ', 100, 2, 28, { font: 'Hand', col: '#2a1a0a' }); pop();
    barrel(980, 1560, 0.8); sack(1060, 1580, 0.9); sack(1110, 1570, 0.8, '#b8a07a'); crate(1140, 1600, 100, 66, { txt: 'ОВЁС' }); jug(1000, 1620, 0.9);
    for (let k = 0; k < 4; k++) { const x = 1180 + k * 26; pencil([[x, 1620], [x + 40, 1440]], { w: 4, col: '#5a3a1e', pass2: false }); } ell(1240, 1620, 60, 12, { wash: '#3a2a1a', washA: 0.4, line: false });   // ружья в козлах
    const r = rng(18403); for (let k = 0; k < 30; k++) { const x = -200 + r() * 1500, y = 1640 + r() * 360; if (k % 2) ell(x, y, 10 + r() * 20, 5 + r() * 8, { wash: '#a8987a', washA: 1, w: 1.2, col: '#3a2a1a', a: 0.6 }); else { pencil([[x, y], [x - 10, y - 40]], { w: 3, col: '#5a7a2a', pass2: false }); pencil([[x + 6, y], [x + 16, y - 34]], { w: 3, col: '#6a8a3a', pass2: false }); pencil([[x + 3, y], [x + 2, y - 46]], { w: 3, col: '#4a6a24', pass2: false }); } }
    for (let k = 0; k < 6; k++) ell(700 + k * 50, 1700 + (k % 2) * 30, 16, 14, { wash: ['#e8d84a', '#f2f2f2', '#c84a3a'][k % 3], washA: 1, w: 1, col: '#3a2a1a', a: 0.5 });   // полевые цветы
  }
  function front(t) {                                              // передний план: стволы буков и листва по краям
    for (const [x, w] of [[90, 110], [1010, 100]]) { const tr = rect(x - w / 2, -400, w, 2600, { wash: '#5a4a3a', washA: 1, w: 3, col: '#1a120a' }); hatch(tr.path, tr.bb, { gap: 14, a: 0.25, col: '#1a120a', ang: 1.5, w: 1.4 }); }
    for (let k = 0; k < 10; k++) { const x = k < 5 ? 40 + k * 50 : 900 + (k - 5) * 50, y = 120 + (k % 5) * 70 + Math.sin(t * 1.4 + k) * 8; blob([[x - 70, y], [x - 30, y - 60], [x + 40, y - 50], [x + 70, y + 10], [x, y + 50]], { wash: k % 2 ? '#2a5a1e' : '#3a6a24', washA: 0.95, w: 1.4, col: '#0a1a06', a: 0.5 }); }
  }

  WORLD.valerik = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(22, () => far(t));
    lay(9, () => mid(t));
    lay(3.5, () => column(t));
    lay(2, () => poet(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    rays(900, -40, 1.9, 0.5, 2000, 'rgba(255,244,200,1)', 0.1, 6, t);
    motes(30, [-200, 600, 1300, 1700], '#f0e0b0', t, 18404, { sp: 10, vx: 14, sz: 2.4, a: 0.4, wob: 20 });
    haze('#f0d8a0', 0.06);
  };
  DIR.valerik = {
    outfit: 'cherkeska', light: { side: 1, rim: '#fff0c0' }, grade: ['#9a8a40', 0.1],
    act: () => [[S0.valerik, 'neutral'], [EV.vl_war, 'scared'], [EV.vl_river, 'talk'], [EV.vl_poet, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1520, s: 1.02, look: t < EV.vl_poet ? [0.7, -0.3] : [0.5, -0.6], point: t > EV.vl_river && t < EV.vl_poet ? 1 : undefined, hand: t > EV.vl_river && t < EV.vl_poet ? [200, -260] : undefined }),
    cam: () => [[S0.valerik, 560, 1040, 0.16], [EV.vl_war, 600, 1020, 0.1], [EV.vl_poet, 640, 1000, 0.16], [S1.valerik, 660, 990, 0.2]]
  };
  TRANS_IN.valerik = { a: 0.15, b: 0.3, fx(k, t, A, B) {            // ветер сносит пороховой дым вбок, как занавес
    const q = sm(k), edge = lerp(1400, -500, q);
    drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(-10, 0, Math.max(0, edge), H); ctx.clip(); drawBuf(A, 1, 540, 960, 1, null, -q * 200); ctx.restore();
    scr(() => { const r = rng(18405); for (let i = 0; i < 11; i++) { const y = r() * 2000, rr = 200 + r() * 220; blob([[edge - rr, y], [edge - rr * 0.3, y - rr * 0.8], [edge + rr * 0.6, y - rr * 0.5], [edge + rr, y + rr * 0.2], [edge, y + rr * 0.7]], { wash: i % 2 ? '#e8e2d4' : '#cfc6b4', washA: 0.95 * Math.sin(Math.PI * clamp(k)), w: 1.4, col: '#8a7e6a', a: 0.3 }); } });
  } };
})();
