/* 011 — сцена `war`: 1941–1944. Август 1941: улица одесских домов перегорожена мешками с песком и противотанковыми ежами, защитники
   (без знаков различия), в море корабль; календарь обороны 1 → 73. На «оккупация» кадр сереет: колючая проволока поперёк переднего
   плана, пустые окна, силуэты патруля без символики; внизу разрез — в катакомбах партизаны со свечами (сквозная нить: тоннели
   укрывали). На «десятки» — поминальные свечи и табличка «22–24 октября 1941». Без натурализма и символики, музыка приглушена.
   Переход В сцену — вспышка взрыва гаснет в темноте. */
(() => {
  EV.wa_73 = wtk('s6', 'Семьдесят');
  EV.wa_occ = wtk('s6', 'оккупация');
  EV.wa_jews = wtk('s6', 'десятки');
  KEYW.push('обороны.', 'евреев.');
  SHAKES.push([S0.war + 0.05, 0.3, 7]);
  const occ = t => sm((t - EV.wa_occ) / 0.6);

  function sky(t) { const o = occ(t); vgrad(-900, 900, [lerpC('#7a8a9a', '#3a3e46', o), lerpC('#c8b8a0', '#6a6a6e', o), lerpC('#e8d8c0', '#8a8a8a', o)], 1);
    for (let k = 0; k < 4; k++) { const ph = (t * 0.2 + k / 4) % 1; ell(200 + k * 260 + ph * 80, 600 - ph * 300, 80 + ph * 100, 50 + ph * 60, { wash: '#4a4a4e', washA: 0.4 * (1 - ph), line: false }); } }
  function street(t) {                                                 // улица, баррикады, защитники / патруль
    const o = occ(t);
    [[-420, 300, 380], [-110, 260, 340], [160, 300, 420], [470, 280, 360], [760, 300, 400], [1070, 280, 360]].forEach(([x, w, h], i) => odHouse(x, 1100, w, h, lerpC(['#e2c88e', '#e8b89a', '#f0dcb0'][i % 3], '#8a8a8a', o * 0.6), t, { key: 11800 + i, night: o > 0.5 }));
    for (let i = 0; i < 6; i++) { const x = 120 + i * 60, y = 1090; for (let r = 0; r < 3; r++) ell(x + (r % 2) * 30, y - r * 26, 34, 16, { wash: '#b8a070', washA: 1, w: 1.6, col: '#4a3a1a' }); }
    for (const hx of [-120, 860, 1000]) { push(hx, 1100, 0.5); for (const a of [0.6, -0.6, 1.57]) { push(0, -60, 1, a); rect(-80, -8, 160, 16, { wash: '#3a3a3e', washA: 1, w: 2, col: '#000' }); pop(); } pop(); }
    if (o < 0.5) for (let i = 0; i < 4; i++) human(160 + i * 90, 1090, 0.42, t, { body: '#7a7646', legs: '#5e5c3c', boots: '#2a2010', hair: '#2a1a10', hat: 'cap', hatCol: '#7a7646', face: 'angry', armR: 'hold', prop: 'spear', seed: 1210 + i });
    else for (let i = 0; i < 3; i++) { const x = 900 - ((t - EV.wa_occ) * 50 + i * 90) % 700; sil([[x - 20, 1100], [x - 22, 1030], [x - 14, 1000], [x + 14, 1000], [x + 22, 1030], [x + 20, 1100]], '#2a2a2e', 0.85); sil(ellPts(x, 985, 14, 15, 0, 0, 16), '#2a2a2e', 0.85); }
  }
  function under(t) {                                                  // разрез: партизаны со свечами в катакомбах
    const o = occ(t); if (o <= 0) return;
    ctx.save(); ctx.globalAlpha = o; tunnels(1120, 1460, t, { rows: 2, lit: 1, seed: 11810, shafts: [520] }); ctx.restore();
    for (let i = 0; i < 4; i++) { const x = -60 + i * 140, y = 1300 + (i % 2) * 120; human(x, y, 0.32, t, { body: '#4a4a3a', legs: '#3a3a2a', hair: '#2a1a10', hat: 'cap', hatCol: '#3a3a2a', face: 'calm', armR: 'hold', prop: 'candle', seed: 1220 + i }); }
  }
  function wire(t) { const o = occ(t); if (o <= 0) return; for (let r = 0; r < 3; r++) { const y = 1320 + r * 40; pencil(Array.from({ length: 30 }, (_, i) => [-400 + i * 70, y + Math.sin(i * 1.3 + r) * 8]), { w: 3, col: '#2a2a2a', a: o, pass2: false }); for (let i = 0; i < 30; i++) { const x = -400 + i * 70 + 35, yy = y + Math.sin((i + 0.5) * 1.3 + r) * 8; pencil([[x - 8, yy - 8], [x + 8, yy + 8]], { w: 2, col: '#2a2a2a', a: o, pass2: false }); pencil([[x + 8, yy - 8], [x - 8, yy + 8]], { w: 2, col: '#2a2a2a', a: o, pass2: false }); } } for (const px of [-60, 520, 1100]) pencil([[px, 1440], [px, 1290]], { w: 10, col: '#4a3a2a', a: o }); }
  function memorial(t) { if (t < EV.wa_jews) return; const k = sm((t - EV.wa_jews) / 0.8); for (let i = 0; i < 9; i++) { const x = 560 + (i % 5) * 70 + (i > 4 ? 35 : 0), y = 1530 + (i > 4 ? 40 : 0); ctx.save(); ctx.globalAlpha = k; candle(x, y, 0.5, t, i, 1); ctx.restore(); glow(x, y - 30, 70, 'rgba(255,200,120,1)', 0.35 * k); } }

  WORLD.war = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => { street(t); under(t); });
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: lerpC('#a8987e', '#6a6a6a', occ(t)), washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2a2a', ang: 0.1, w: 1.2 }); wire(t); memorial(t); cat(); });
    lay(0.7, () => haze('#1a1a22', 0.25 * occ(t)));
  };
  DIR.war = {
    outfit: 'voen', light: { side: 1, rim: '#d8d0c0' }, grade: ['#6a6a6a', 0.16],
    act: () => [[S0.war, 'proud'], [EV.wa_occ, 'scared'], [EV.wa_jews - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1480, s: 1.04, look: t < EV.wa_jews ? [0.4, -0.2] : [0.3, 0.3], nod: t > EV.wa_jews ? 0.06 : 0 }),
    cam: () => [[S0.war, 560, 1000, 0.08], [EV.wa_occ, 540, 1100, 0.04], [EV.wa_jews, 560, 1200, 0.14], [S1.war, 560, 1220, 0.2]],
    hud: t => {
      if (t > EV.wa_73 - 0.1 && t < EV.wa_occ + 0.3) { const k = popK(t, EV.wa_73 - 0.1, 0.35), n = Math.min(73, 1 + Math.floor(72 * sm((t - EV.wa_73) / 1.0))); push(760, 700, k, 0.04);
        for (let q = 0; q < 3; q++) rect(-110 + q * 3, -110 - q * 3, 220, 220, { wash: '#f2ece0', washA: 1, w: 2, col: '#3a3a3a' }); rect(-110, -110, 220, 46, { wash: '#2a2a32', washA: 1, w: 1.6, col: '#000' }); txt('ОБОРОНА', 0, -86, 28, { font: 'Osw', col: '#f2ece0' }); txt(String(n), 0, 16, 96, { font: 'Osw', col: '#a8201e' }); txt('день', 0, 84, 26, { font: 'Osw', col: '#4a4a4a' }); pop(); }
      if (t > EV.wa_jews) { const k = popK(t, EV.wa_jews, 0.4); push(540, 700, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,14,14,0.86)'; ctx.fillRect(-330, -70, 660, 140); ctx.restore(); txt('22–24 ОКТЯБРЯ 1941', 0, -22, 40, { font: 'Osw', col: '#f2ece0', a: k }); txt('убиты десятки тысяч евреев Одессы', 0, 30, 30, { col: '#e8d8b0', a: k }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В war: вспышка взрыва гаснет в темноте
  TRANS_IN.war = { a: 0.25, b: 0.45, fx(k, t, A, B) {
    if (k < 0.35) drawBuf(A, 1 + k * 0.2); else drawBuf(B, 1.1 - 0.1 * sm((k - 0.35) / 0.65));
    scr(() => { const f = k < 0.35 ? sm(k / 0.35) : 1 - sm((k - 0.35) / 0.65); ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = k < 0.35 ? '#fff4e0' : '#0a0a0c'; ctx.fillRect(0, 0, W, H); ctx.restore(); if (k < 0.4) glow(540, 900, 900, 'rgba(255,220,160,1)', f); });
  } };
})();
