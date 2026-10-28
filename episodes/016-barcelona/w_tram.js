/* 016 — сцена `tram`: июнь 1926, улица у недостроенной Саграды: стоит только фасад Рождества (≈ 15 %), в лесах; трамвай
   проезжает по улице (сам наезд НЕ показываем: трамвай закрывает кадр, звонок — и тишина, на мостовой — шляпа и трость).
   На «трамвай» — звонок и проезд, на «пятнадцать» — шкала готовности «15 %». Том — архитектор, снимает котелок.
   Переход В сцену — трамвай проносится через кадр слева направо. */
(() => {
  EV.tr_tram = wtk('s5', 'трамвай.');
  EV.tr_15 = wtk('s5', 'пятнадцать.');
  KEYW.push('трамвай.', 'пятнадцать.');

  function sky(t) { vgrad(-900, 1000, ['#7a9ac0', '#c0d0dc', '#ece2cc'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 180 + i * 80 + Math.sin(k) * 10, 76, 26, { wash: '#f4f2ec', washA: 0.85, line: false }); } }
  function street(t) {                                                 // дома, недостроенная Саграда, рельсы
    sagrada(560, 1100, 0.55, t, { done: 0.15, scaff: 1 });
    for (let k = 0; k < 4; k++) { const x = k < 2 ? -520 + k * 200 : 1100 + (k - 2) * 200; rect(x, 1100 - 300, 180, 300, { wash: ['#e0c8a8', '#ead4b4', '#d4bc9c', '#e4ccac'][k], washA: 1, w: 2, col: '#4a3a2a' }); for (let j = 0; j < 3; j++) for (let q = 0; q < 2; q++) rect(x + 30 + q * 70, 840 + j * 80, 40, 54, { wash: '#4a6a8a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
    rect(-600, 1100, 2300, 300, { wash: '#8a8070', washA: 1, w: 2, col: '#3a3428' }); for (const ry of [1250, 1300]) pencil([[-600, ry], [1700, ry]], { w: 5, col: '#5a5a5e', pass2: false });
    const tx = t < EV.tr_tram - 0.4 ? -900 : lerp(-900, 2200, clamp((t - EV.tr_tram + 0.4) / 1.6)); tram(tx, 1300, 0.9, t);
    if (t > EV.tr_tram + 0.6) { const k = sm((t - EV.tr_tram - 0.6) / 0.5); ctx.save(); ctx.globalAlpha = k; push(760, 1330, 0.7); ell(0, -10, 50, 14, { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); blob([[-30, -10], [-26, -44], [26, -44], [30, -10]], { wash: '#2a2a2e', washA: 1, w: 2, col: '#000' }); pencil([[80, 0], [200, -30]], { w: 6, col: '#5a3a1e', pass2: false }); pop(); ctx.restore(); }
    for (let i = 0; i < 3; i++) human(1000 + i * 140, 1380, 0.46, t, { body: ['#2a2a32', '#e8e4dc', '#6a4a3a'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i === 1 ? 'bun' : 'merchant', hatCol: '#2a2a2a', face: 'calm', armR: 'hold', armL: 'hold', long: i === 1, seed: 16610 + i, flip: -1 });
  }

  WORLD.tram = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => street(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89a84', washA: 1, w: 2, col: '#4a4030', a: 0.4 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1470; y < 2400; y += 46) rect(x + (Math.floor(y / 46) % 2) * 35, y, 68, 44, { wash: '#9a8c76', washA: 0.6, w: 1, col: '#5a4c38', a: 0.4 }); ctx.restore(); cat(); });
  };
  DIR.tram = {
    outfit: 'architect', light: { side: 1, rim: '#f0e8d8' }, grade: ['#8a8070', 0.12],
    act: () => [[S0.tram, 'talk'], [EV.tr_tram - 0.03, 'shock'], [EV.tr_tram + 0.8, 'neutral'], [EV.tr_15, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: t < EV.tr_15 ? [0.6, 0.1] : [0.5, -0.6], nod: t > EV.tr_tram + 0.8 && t < EV.tr_15 ? 0.06 : 0, point: t > EV.tr_15 ? 1 : undefined, hand: t > EV.tr_15 ? [180, -400] : [120, -270] }),
    cam: () => [[S0.tram, 560, 1100, 0.06], [EV.tr_tram, 560, 1160, 0.1], [EV.tr_15, 560, 960, 0.02], [S1.tram, 560, 960, 0.04]],
    hud: t => { if (t > EV.tr_15) { const k = popK(t, EV.tr_15, 0.35); push(620, 1060, k, 0.02); rect(-230, -60, 460, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ГОТОВО: 15 %', 0, -12, 38, { font: 'Osw', col: '#a8201e' }); rect(-190, 22, 380, 22, { wash: '#d8d0c0', washA: 1, w: 2, col: '#3a2a14' }); rect(-190, 22, 380 * 0.15 * clamp((t - EV.tr_15) / 0.5), 22, { wash: '#a8201e', washA: 1, w: 0, col: '#000' }); pop(); }
      if (t > EV.tr_tram + 0.5 && t < EV.tr_15) { const k = popK(t, EV.tr_tram + 0.5, 0.35); push(600, 1060, k, -0.02); rect(-160, -46, 320, 92, { wash: '#1a1a1e', washA: 0.92, w: 3, col: '#000' }); txt('10.06.1926', 0, 14, 40, { font: 'Osw', col: '#f2ece0' }); pop(); } }
  };
  TRANS_IN.tram = { a: 0.25, b: 0.4, fx(k, t, A, B) {                // трамвай проносится через кадр и меняет эпоху
    const q = sm(k), X = lerp(-1200, W + 200, q); drawBuf(A); const P = new Path2D(); P.rect(0, 0, Math.max(1, X), H); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => tram(X + 300, 1500, 2.4, t, { col: '#3a7a4a' }));
  } };
})();
