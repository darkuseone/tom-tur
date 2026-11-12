/* 025 — сцена `painter`: 1770, Краковское предместье у Замковой площади. Тёплый полдень: в глубине — колонна Сигизмунда и барочный замок
   с часовой башней, вдоль улицы — каменицы, костёльная колокольня. Кареты, всадник, торговка с корзиной, шляхтичи в кунтушах, дамы
   в кринолинах, водонос, собака, голуби. Том — художник в берете у мольберта: холст повторяет вид за его спиной.
   На «Бернардо» — к Тому выезжает бирка-имя, на «Беллотто» плашка-вопрос превращается в ответ (EV.answer), холст вспыхивает золотом;
   на «племянник» над Томом всплывает портрет дяди в раме «Каналетто · Венеция», на «великого» — фанфарный блеск рамы;
   на «подписывался» Том выводит кистью подпись «Canaletto», на «дяди» — подмигивает. Главный свет — солнце слева сверху, золотое.
   Переход В сцену — краска стекает потёками сверху вниз, под ней 1770. */
(() => {
  EV.pa_bern = wtk('s6', 'Бернардо');
  EV.answer = wtk('s6', 'Беллотто');
  EV.pa_neph = wtk('s6', 'племянник');
  EV.pa_great = wtk('s6', 'великого');
  EV.pa_sign = wtk('s6', 'подписывался');
  EV.pa_uncle = wtk('s6', 'дяди.');
  KEYW.push('Беллотто', 'Каналетто.', 'дяди.');
  const L = WA.ink, EX = 730, EB = 1640, sig = t => clamp((t - EV.pa_sign) / 0.9);
  function sky(t) { vgrad(-900, 1400, ['#5a90c8', '#9ac0e0', '#f0e0c0', '#f8d0a0'], 1); cloudsWA(t, -220, 5, '#fff8ec', 2701, 0.8, 6); birdsWA(t, 5, [-100, 100, 1200, 500], 2702); glow(-60, 220, 220, 'rgba(255,236,190,1)', 0.3); }
  function far(t) {                                                  // замок XVIII в. и колонна в конце улицы
    castleW(700, 1120, 0.62, { col: '#e0b088', hands: t * 0.05 }); columnZ(330, 1150, 0.66, {}); for (const x of [-200, 1250]) { sil([[x - 30, 1150], [x - 30, 700], [x, 600], [x + 30, 700], [x + 30, 1150]], '#9a8a8a', 1); }
    depthFog('#f0e0c8', 0.08); }
  function street(t) {                                               // каменицы вдоль улицы (перспектива в два ряда)
    let x = -480; const r = rng(2703); for (let i = 0; i < 4; i++) { const w = 200 * (0.8 + r() * 0.3); kam(x + w / 2, 1300, w, 560 + r() * 80, { col: ['#e8c090', '#d89a6a', '#f0d8a8', '#c87a5a'][i], top: ['attic', 'roof', 'gable', 'attic'][i], floors: 5, cols: 3, seed: 2703 + i, frieze: i % 2 }); x += w - 2; }
    x = 1000; for (let i = 0; i < 3; i++) { const w = 200; kam(x + w / 2, 1300, w, 600, { col: ['#e0b878', '#c8a07a', '#e8cfa0'][i], top: ['roof', 'attic', 'gable'][i], floors: 5, cols: 3, seed: 2710 + i, sign: i === 0 ? 'VINUM' : null }); x += w - 2; }
    castShadow(-480, 1300, 900, 120, 0.2, 0.2); }
  function people(t) {                                               // улица 1770: кареты, всадник, шляхта, торговка, водонос, собака
    rect(-1400, 1290, 3900, 1600, { wash: '#b8a07a', washA: 1, line: false }); cobbles(-1400, 2500, 1300, 2700, '#aa9070', '#7a664c', 2713, 0.9);
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#3a2a20', seed: sd }, ex));
    const cx = ((t - S0.painter) * 80) % 1800 - 400; carriage(cx, 1400, 0.7, t, '#5a2a1a'); carriage(1300 - ((t - S0.painter) * 50) % 1600, 1360, 0.55, t, '#2a3a5a', -1);
    P(160, 1410, 0.62, 2714, '#a8231c', { long: 1, hat: 'fur', hatCol: '#3a2a1a', beard: 1, armR: 'hips' }); P(250, 1404, 0.6, 2715, '#2a5a8a', { long: 1, hat: 'fur', hatCol: '#5a3a2a', armR: 'point', flip: -1 });
    P(470, 1400, 0.58, 2716, '#e8b8c8', { long: 1, hair: '#f0e8e0', face: 'smile', armR: 'hold' }); P(560, 1404, 0.56, 2717, '#7a8a5a', { hat: 'merchant', hatCol: '#2a2a2a', armR: 'hold', prop: 'stick' });
    P(900, 1410, 0.6, 2718, '#8a6a4a', { flip: -1, hat: 'scarf', hatCol: '#f4ecd8', armR: 'hold', armL: 'hold' }); for (let i = 0; i < 4; i++) ell(940 + i * 12, 1260 - (i % 2) * 6, 10, 8, { wash: ['#e84a3a', '#8ac04a', '#f0c040', '#e84a3a'][i], washA: 1, w: 1, col: L });
    P(1080, 1404, 0.6, 2719, '#5a4a3a', { flip: -1, armR: 'hold', armL: 'hold' }); for (const k of [-1, 1]) { pencil([[1080 + k * 50, 1180], [1080 + k * 50, 1250]], { w: 2, col: '#3a2a1a', pass2: false }); rect(1080 + k * 50 - 16, 1250, 32, 34, { wash: '#7a5a34', washA: 1, w: 1.4, col: L }); }   // водонос с вёдрами
    P(-120, 1410, 0.6, 2720, '#3a6a4a', { long: 1, hat: 'fur', hatCol: '#2a2a1a', armR: 'wave' }); P(-280, 1400, 0.58, 2721, '#c8a060', { long: 1, hair: '#e8e0d8', armR: 'hold' });
    push(380, 1420, 0.6); blob([[-40, -30], [-30, -60], [30, -62], [44, -40], [60, -70], [72, -60], [60, -30], [40, -10], [-30, -10]], { wash: '#a87a4a', washA: 1, w: 1.8, col: L }); for (const k of [-24, 30]) pencil([[k, -12], [k, 6]], { w: 5, col: '#6a4a2a', pass2: false }); pencil([[-40, -40], [-60, -60]], { w: 4, col: '#a87a4a', pass2: false }); pop();   // собака
    for (let i = 0; i < 3; i++) pigeon(640 + i * 40, 1430, 0.7, t, i + 11);
    lightPool(400, 1460, 900, 140, 'rgba(255,230,170,1)', 0.25); }
  function easel(t) {                                                // мольберт с холстом-видом, палитра, кисти, ящик с красками
    castShadow(EX, EB, 200, 380, 0.45, 0.4); castShadow(370, 1650, 170, 400, 0.45, 0.4); lightPool(560, 1690, 520, 110, 'rgba(255,230,170,1)', 0.35);
    easelW(EX, EB, 1.0); const glowA = t > EV.answer && t < EV.answer + 0.6 ? 1 - (t - EV.answer) / 0.6 : 0;
    push(EX, EB - 400, 1, -0.02); rect(-170, -230, 340, 250, { wash: '#f4ecd8', washA: 1, w: 2.6, col: '#6a4a24' }); ctx.save(); ctx.beginPath(); ctx.rect(-165, -225, 330, 240); ctx.clip();
      vgrad(-225, 15, ['#9ac0e0', '#f0e0c0', '#c8b08a'], 1); push(-10, -10, 0.34); castleW(80, 0, 0.62, { col: '#e0b088' }); columnZ(-280, 30, 0.66, {}); pop();
      push(0, 20, 0.34); let x = -560; for (let i = 0; i < 3; i++) { kam(x + 100, 0, 200, 600, { col: ['#e8c090', '#d89a6a', '#f0d8a8'][i], top: 'attic', floors: 5, cols: 3, seed: 2722 + i }); x += 200; } pop();
      if (glowA) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,220,140,' + 0.5 * glowA + ')'; ctx.fillRect(-170, -230, 340, 250); ctx.restore(); }
      const s = sig(t); if (s > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-40, -40, 220 * s, 60); ctx.clip(); txt('Canaletto', 70, -2, 46, { col: '#a8231c', font: 'Hand' }); ctx.restore(); }
      ctx.restore(); pop();
    rect(EX - 240, EB - 70, 120, 70, { wash: '#6a4426', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) rect(EX - 232 + i * 22, EB - 92, 14, 26, { wash: [WA.brick, WA.gold, '#3a6aa8', '#f4ecd8', '#3a8a5a'][i], washA: 1, w: 1, col: L });
    paletteW(EX + 150, EB - 210, 0.8, -0.3); brushW(EX + 210, EB - 60, 0.7, 0.4, { paint: '#3a6aa8' }); brushW(EX + 230, EB - 50, 0.7, 0.6, { paint: WA.brick }); }
  function hud(t) {
    if (t > EV.pa_bern - 0.1 && t < EV.pa_neph + 0.2) { const q = popK(t, EV.pa_bern - 0.1, 0.3); push(560, 1340, q, -0.03); rect(-230, -46, 460, 92, { wash: '#16120e', washA: 0.92, w: 3, col: WA.gold }); txt('BERNARDO BELLOTTO', 0, 14, 44, { col: WA.goldL, font: 'Osw' }); pop(); }
    if (t > EV.pa_neph - 0.1 && t < EV.pa_sign + 0.1) { const q = popK(t, EV.pa_neph - 0.1, 0.35), sh = t > EV.pa_great && t < EV.pa_great + 0.5 ? 1 - (t - EV.pa_great) / 0.5 : 0;
      push(740, 900, q, 0.04); frameG(0, 0, 230, 280, { b: 22, inner: () => { vgrad(-140, 140, ['#3a2a1a', '#6a4a2a'], 1); human(0, 170, 0.62, t, { body: '#3a3a5a', legs: '#2a2a30', seed: 2730, hair: '#f0ece4', face: 'calm', look: [-0.3, 0] }); } });
      txt('дядя: CANALETTO', 0, 190, 34, { col: '#fff4d8', font: 'Osw' }); txt('Венеция', 0, 226, 28, { col: '#e8d8b8', font: 'Hand' }); if (sh) glow(0, 0, 220, 'rgba(255,230,150,1)', 0.35 * sh); pop(); }
    if (t > EV.pa_uncle && t < S1.painter) { const q = popK(t, EV.pa_uncle, 0.3); push(740, 820, q, 0.06); rect(-200, -50, 400, 100, { wash: '#16120e', washA: 0.9, w: 3, col: WA.gold }); txt('имя дяди — удобнее', 0, 14, 38, { col: WA.goldL, font: 'Hand' }); pop(); }
  }
  function front(t) { sil([[-700, 2400], [-680, 1200], [-460, 1180], [-440, 2400]], '#1e140c', 1); blob([[-640, 1200], [-560, 1080], [-460, 1120], [-480, 1200]], { wash: '#2a3a1a', washA: 1, line: false });
    sil([[1320, 2400], [1330, 600], [1400, 560], [1480, 600], [1500, 2400]], '#1e140c', 1); }
  WORLD.painter = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => street(t));
    lay(3.2, () => people(t));
    lay(1, () => { easel(t); cat(); });
    lay(2.2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 2731, { sp: 4, sz: 2, a: 0.4, wob: 14, add: 1 }));
    lay(0.64, () => front(t));
    shaft(-60, 200, 300, 1700, -0.4, 'rgba(255,236,190,1)', 0.12);
  };
  DIR.painter = {
    outfit: 'master', light: { side: -1, rim: '#ffe2a0' }, grade: ['#f0b060', 0.06],
    act: () => [[S0.painter, 'proud'], [EV.answer, 'grin'], [EV.pa_neph, 'awe'], [EV.pa_sign, 'smug'], [EV.pa_uncle, 'wink']],
    pose: (t, u, b) => { const pnt = t > EV.pa_sign - 0.1 && t < EV.pa_sign + 1.0;
      return Object.assign(b, { x: 370, y: 1650, s: 1.0, look: t < EV.pa_neph ? [0.8, -0.3] : t < EV.pa_sign ? [0.6, -0.8] : t < EV.pa_uncle ? [0.9, -0.4] : [-0.1, -0.1], prop: 'brush',
        propAng: pnt ? -1.0 + Math.sin(t * 14) * 0.2 : -0.5, hand: pnt ? [lerp(330, 400, sig(t)) + Math.sin(t * 14) * 10, -460] : [150, -320] }); },
    cam: () => [[S0.painter, 540, 960, 0.04], [EV.answer, 580, 1000, 0.1], [EV.pa_neph, 600, 940, 0.04], [EV.pa_sign, 640, 1180, 0.18], [EV.pa_uncle, 600, 1100, 0.14], [S1.painter, 580, 1060, 0.1]],
    hud
  };
  TRANS_IN.painter = { a: 0.12, b: 0.35, fx(k, t, A, B) {          // краска стекает потёками: золотые и кирпичные струи, под ними — 1770
    drawBuf(A); const n = 18, r = rng(2732);
    scr(() => { ctx.save(); ctx.beginPath(); for (let i = 0; i < n; i++) { const x = i * W / n, d = (sm(k) * 1.4 - r() * 0.4) * H; ctx.rect(x, -10, W / n + 1, Math.max(0, d)); } ctx.clip(); drawBuf(B); ctx.restore();
      const r2 = rng(2732); for (let i = 0; i < n; i++) { const x = i * W / n, d = (sm(k) * 1.4 - r2() * 0.4) * H; if (d <= 0 || d >= H) continue; ctx.fillStyle = i % 2 ? WA.gold : WA.brick; ctx.beginPath(); ctx.arc(x + W / n / 2, d, W / n / 2, 0, 6.283); ctx.fill(); ctx.fillRect(x, d - 40, W / n, 40); } });
  } };
})();
