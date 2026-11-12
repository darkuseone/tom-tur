/* 025 — сцена `build`: 1950, стройка Старого города. Утро, пыль в косых лучах. Каменицы в лесах: одни уже цветные, другие — голая
   кирпичная кладка и пустые проёмы. Цепочка добровольцев передаёт кирпичи из рук в руки, кран-«журавль» поднимает поддон, телега
   с лошадью, бетономешалка, каменщики на лесах, лозунг-растяжка. Том-маляр в извести держит репродукцию картины в золочёной раме.
   На «картин» Том поднимает раму — от картины к фасаду тянутся золотые лучи-пунктиры, фасад «заливается» цветом сверху вниз;
   на «Подпись» камера наезжает на угол картины, на «Каналетто» подпись вспыхивает золотом; на «Тот самый?» над Томом — облачко-мысль
   с Венецией (гондола, кампанила) и знак вопроса. Главный свет — низкое утреннее солнце справа сквозь пыль. Переход В сцену — холст
   сдёргивают вниз, под ним стройка. */
(() => {
  EV.bu_copy = wtk('s2', 'картин.');
  EV.bu_sign = wtk('s2', 'Подпись');
  EV.bu_can = wtk('s2', '«Каналетто».');
  EV.bu_same = wtk('s2', 'Тот');
  KEYW.push('картин.', '«Каналетто».', 'самый?');
  const L = WA.ink, fill = t => sm(clamp((t - EV.bu_copy) / 1.2)), PX = 700, PY = 1180;
  function sky(t) { vgrad(-900, 1400, ['#7aa0c8', '#b8cce0', '#f0dcb8', '#f4c890'], 1); glow(1180, 600, 200, 'rgba(255,230,170,1)', 0.35); ell(1180, 600, 60, 60, { wash: '#fff4d0', washA: 1, line: false }); cloudsWA(t, -260, 4, '#ffffff', 2581, 0.7, 6); birdsWA(t, 4, [-100, 100, 1100, 500], 2582); }
  function far(t) {                                                  // руины вдалеке, трубы, кран
    for (let i = 0; i < 9; i++) { const r = rng(2583 + i), x = -500 + i * 230, h = 120 + r() * 160; const pts = [[x, 980]]; for (let k = 0; k <= 5; k++) pts.push([x + k * 40, 980 - h * (0.6 + 0.4 * r())]); pts.push([x + 200, 980]); sil(pts, '#9a8a8a', 1); }
    pencil([[1020, 980], [1020, 520]], { w: 8, col: '#5a5a5a', pass2: false }); pencil([[900, 540], [1260, 540]], { w: 7, col: '#5a5a5a', pass2: false }); pencil([[1020, 520], [1220, 540]], { w: 2, col: '#5a5a5a', pass2: false }); pencil([[1180, 540], [1180, 700]], { w: 1.6, col: '#5a5a5a', pass2: false });
    depthFog('#e8d8c0', 0.1); }
  function row(t) {                                                  // каменицы в лесах: часть цветная, часть — голый кирпич; центральная «заливается» по картине
    kam(-300, 1300, 200, 520, { col: '#c8763a', top: 'attic', floors: 5, cols: 3, seed: 2584, frieze: 1 });
    kam(-90, 1300, 190, 470, { col: WA.brick, top: 'roof', floors: 4, cols: 2, seed: 2585, scaff: 1 });
    const bx = 160, bw = 240, bh = 560;                               // фасад, который «копируют»: кирпич → цвет сверху вниз
    kam(bx, 1300, bw, bh, { col: '#a85a3a', top: 'gable', floors: 5, cols: 3, seed: 2586 });
    const f = fill(t); if (f > 0) { ctx.save(); ctx.beginPath(); ctx.rect(bx - bw / 2 - 20, 1300 - bh - 220, bw + 40, (bh + 220) * f); ctx.clip(); kam(bx, 1300, bw, bh, { col: '#e8b85a', top: 'gable', floors: 5, cols: 3, seed: 2586, frieze: 1 }); ctx.restore(); }
    for (let i = 0; i <= 3; i++) pencil([[bx - bw / 2 - 14 + i * (bw + 28) / 3, 1300], [bx - bw / 2 - 14 + i * (bw + 28) / 3, 1300 - bh]], { w: 4, col: '#8a6a3a', pass2: false }); for (let j = 1; j <= 4; j++) { const y = 1300 - j * bh / 5; rect(bx - bw / 2 - 20, y - 6, bw + 40, 7, { wash: '#b89060', washA: 1, w: 1, col: L }); }
    kam(430, 1300, 220, 500, { col: '#7a9a6a', top: 'attic', floors: 4, cols: 3, seed: 2587, ruin: 0.35, scaff: 1 });
    kam(660, 1300, 200, 540, { col: '#d8c070', top: 'gable', floors: 5, cols: 2, seed: 2588 });
    kam(870, 1300, 210, 480, { col: WA.brick, top: 'roof', floors: 4, cols: 3, seed: 2589, ruin: 0.5 });
    kam(1090, 1300, 220, 520, { col: '#6a8aa8', top: 'attic', floors: 5, cols: 3, seed: 2590, scaff: 1 });
    push(420, 900, 1, 0.02); rect(-260, -30, 520, 60, { wash: '#a8231c', washA: 1, w: 2.2, col: L }); txt('CAŁY NARÓD BUDUJE SWOJĄ STOLICĘ', 0, 10, 26, { col: '#f8f0e0', font: 'Osw' }); pop();
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#3a3a40', seed: sd }, ex));
    P(-60, 1040, 0.42, 2591, '#6a5a48', { armR: 'up', hat: 'cap', hatCol: '#3a2a1a' }); P(470, 1120, 0.42, 2592, '#4a5a6a', { armR: 'swing', flip: -1 }); P(1060, 1040, 0.42, 2593, '#7a6a50', { armR: 'hold', hat: 'cap', hatCol: '#2a2a2a' });
    if (f > 0) { for (let i = 0; i < 6; i++) { const yy = lerp(1300 - bh - 100, 1300, f); ell(bx - bw / 2 + i * bw / 5, yy, 6, 6, { wash: WA.goldL, washA: 0.9, line: false }); } } }
  function site(t) {                                                 // цепочка с кирпичами, кран-подъёмник, телега, бетономешалка
    rect(-1400, 1300, 3900, 1600, { wash: '#a8927a', washA: 1, line: false }); cobbles(-1400, 2500, 1310, 2700, '#9a8670', '#6e5e4c', 2594, 0.8);
    rubble(-500, -150, 1420, 90, 2595, { n: 22, beams: 1 }); rubble(980, 1400, 1420, 110, 2596, { n: 26 });
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#3a3a40', seed: sd }, ex));
    const ph = t * 2.6; for (let i = 0; i < 7; i++) { const x = -140 + i * 120, sw = Math.sin(ph + i * 1.1); P(x, 1430 + (i % 2) * 8, 0.6, 2597 + i, PPLW.fifty[i % 5], { armR: sw > 0 ? 'up' : 'hold', armL: 'hold', flip: i % 2 ? -1 : 1, hat: i % 3 === 0 ? 'scarf' : i % 3 === 1 ? 'cap' : null, hatCol: ['#c8402a', '#3a3a3a', '#6a5a3a'][i % 3] });
      const bxp = x + 30 + sw * 40, byp = 1300 - 40 - Math.abs(sw) * 30; rect(bxp - 14, byp - 7, 28, 14, { wash: WA.brick, washA: 1, w: 1.2, col: L }); }
    push(1180, 1440, 0.85, 0, -1); rect(-120, -110, 220, 70, { wash: '#7a5a34', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) rect(-110 + i * 40, -140, 30, 30, { wash: WA.brick, washA: 1, w: 1, col: L }); for (const k of [-80, 60]) { ell(k, -30, 34, 34, { line: true, w: 6, col: '#4a3420' }); }
      blob([[110, -40], [130, -140], [170, -200], [240, -210], [250, -160], [200, -130], [210, -40]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [130, 200]) pencil([[k, -40], [k + 6, 10]], { w: 9, col: '#5a3a1a', pass2: false }); pencil([[-120, -80], [130, -110]], { w: 3, col: '#3a2a1a', pass2: false }); pop();   // телега с лошадью
    push(-330, 1460, 0.9); ell(0, -80, 70, 60, { wash: '#8a9a7a', washA: 1, w: 2.2, col: L, rot: -0.4 }); ell(40, -110, 26, 20, { wash: '#2a2a2a', washA: 1, w: 1.6, col: L, rot: -0.4 }); pencil([[-50, -20], [-60, 0]], { w: 6, col: '#3a3a3a', pass2: false }); pencil([[50, -20], [60, 0]], { w: 6, col: '#3a3a3a', pass2: false }); pop();   // бетономешалка
    for (let i = 0; i < 5; i++) rect(500 + i * 32, 1440 - (i % 2) * 14, 30, 14, { wash: WA.brick, washA: 1, w: 1.2, col: L }); rect(820, 1400, 60, 40, { wash: '#c8c0b0', washA: 1, w: 1.6, col: L }); txt('CEMENT', 850, 1424, 14, { col: L, font: 'Osw' });
    for (let i = 0; i < 3; i++) { pencil([[600 + i * 30, 1450], [620 + i * 30, 1340]], { w: 5, col: '#7a5a34', pass2: false }); }   // лопаты/доски
    lightPool(700, 1460, 900, 160, 'rgba(255,224,170,1)', 0.25); }
  function plane(t) {                                                // Том с картиной: рама в лапах, лучи-пунктиры к фасаду
    castShadow(360, 1640, 170, 420, Math.PI * 0.85, 0.42); lightPool(420, 1680, 420, 100, 'rgba(255,224,170,1)', 0.3);
    push(PX, PY, 1, -0.05); frameG(0, 0, 260, 200, { b: 22, inner: () => { vgrad(-100, 100, ['#c8b48a', '#e0c898', '#9a7a4a'], 1); push(0, 60, 0.2); const r = rng(2599); let x = -620; for (let i = 0; i < 7; i++) { const w = 180; kam(x + w / 2, 200, w, 520, { col: ['#e8b85a', '#a86a4a', '#d8b878', '#8a7a5a'][i % 4], top: ['gable', 'attic', 'roof'][i % 3], floors: 4, cols: 2, seed: 2599 + i }); x += w; } pop();
      for (let i = 0; i < 4; i++) ell(-80 + i * 50, 70, 4, 10, { wash: '#3a2a1a', washA: 1, line: false });
      if (t > EV.bu_sign) { const g = t > EV.bu_can ? 1 : 0.5; signature(30, 84, 0.42, t, { txt: 'Canaletto', col: g > 0.8 ? '#a86a10' : '#3a1a0a' }); if (g > 0.8) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,214,120,0.25)'; ctx.fillRect(-40, 60, 150, 40); ctx.restore(); } } } }); pop();
    const f = fill(t); if (t > EV.bu_copy - 0.1 && f < 1) { for (let i = 0; i < 5; i++) { const sx = PX - 110 + i * 55, sy = PY - 90; dashLine([[sx, sy], [lerp(40, 280, i / 4), 760 + i * 30]], WA.goldL, 4, 0.8 * (1 - f * 0.6)); } }
  }
  function hud(t) {
    if (t > EV.bu_same && t < S1.build) { const q = popK(t, EV.bu_same, 0.3); push(300, 860, q); ell(0, 0, 170, 110, { wash: '#f8f2e4', washA: 0.95, w: 3, col: L }); ell(-140, 130, 22, 16, { wash: '#f8f2e4', washA: 0.95, w: 2, col: L }); ell(-170, 170, 12, 9, { wash: '#f8f2e4', washA: 0.95, w: 2, col: L });
      rect(-120, 10, 240, 30, { wash: '#4a7aa8', washA: 1, line: false }); rect(40, -80, 26, 90, { wash: '#c86a4a', washA: 1, w: 1.6, col: L }); shape([[36, -80], [53, -110], [70, -80]], { wash: '#5aa88a', washA: 1, w: 1.4, col: L });
      for (let i = 0; i < 3; i++) rect(-110 + i * 40, -30, 34, 40, { wash: ['#e8b85a', '#d88a5a', '#f0d8a0'][i], washA: 1, w: 1.2, col: L }); blob([[-80, 18], [-40, 30], [20, 30], [50, 16], [10, 24], [-50, 24]], { wash: '#1a1a1a', washA: 1, line: false }); pencil([[30, 18], [60, -20]], { w: 2, col: '#1a1a1a', pass2: false });
      txt('ВЕНЕЦИЯ?', 0, 84, 30, { col: '#1a3a7a', font: 'Osw' }); pop(); }
  }
  function front(t) { sil([[-700, 2400], [-700, 1200], [-520, 1160], [-480, 2400]], '#1a120c', 1); for (let j = 0; j < 4; j++) pencil([[-640, 1260 + j * 200], [-470, 1240 + j * 200]], { w: 12, col: '#2a1a10', pass2: false });
    pencil([[1320, 2400], [1300, 500]], { w: 18, col: '#2a1a10', pass2: false }); pencil([[1420, 2400], [1400, 500]], { w: 18, col: '#2a1a10', pass2: false }); for (let j = 0; j < 6; j++) pencil([[1300, 600 + j * 260], [1420, 640 + j * 260]], { w: 9, col: '#2a1a10', pass2: false }); }
  WORLD.build = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => row(t));
    lay(3.2, () => site(t));
    lay(1, () => { plane(t); cat(); });
    lay(2.2, () => motes(40, [-100, 600, 1200, 1600], '#f0dcb8', t, 2600, { sp: 8, sz: 3, a: 0.45, wob: 20 }));
    lay(0.64, () => front(t));
    shaft(1180, 560, 300, 1800, 0.55, 'rgba(255,230,180,1)', 0.15);
  };
  DIR.build = {
    outfit: 'painter', light: { side: 1, rim: '#ffe0a8' }, grade: ['#e8b070', 0.06],
    act: () => [[S0.build, 'talk'], [EV.bu_copy, 'proud'], [EV.bu_sign, 'smug'], [EV.bu_can, 'awe'], [EV.bu_same, 'suspicious']],
    pose: (t, u, b) => { const up = t > EV.bu_copy - 0.3;
      return Object.assign(b, { x: 370, y: 1640, s: 1.0, look: t < EV.bu_copy ? [-0.5, -0.6] : t < EV.bu_same ? [0.9, -0.3] : [0.1, -0.7], hand: up ? [270, -420] : undefined, handF: up ? [250, -360] : undefined, tilt: t > EV.bu_same ? -0.06 : 0 }); },
    cam: () => [[S0.build, 540, 960, 0.06], [EV.bu_copy, 520, 900, 0.0], [EV.bu_sign, 640, 1120, 0.2], [EV.bu_can, 700, 1150, 0.32, 'x'], [EV.bu_same, 520, 1000, 0.08], [S1.build, 500, 980, 0.1]],
    hud
  };
  TRANS_IN.build = { a: 0.12, b: 0.3, fx(k, t, A, B) {             // холст сдёргивают вниз: под тканью — стройка
    drawBuf(B); const d = sm(k) * 2200; scr(() => { ctx.save(); ctx.beginPath(); ctx.moveTo(0, d); for (let i = 0; i <= 12; i++) ctx.lineTo(i * 90, d + Math.sin(i * 1.4 + k * 6) * 40 * (1 - k)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip(); drawBuf(A, 1, 540, 960, 1, null, 0, d * 0.9); ctx.fillStyle = 'rgba(240,226,192,0.55)'; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.save(); ctx.strokeStyle = '#7a5a34'; ctx.lineWidth = 14; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const y = d + Math.sin(i * 1.4 + k * 6) * 40 * (1 - k); i ? ctx.lineTo(i * 90, y) : ctx.moveTo(0, y); } ctx.stroke(); ctx.restore(); });
  } };
})();
