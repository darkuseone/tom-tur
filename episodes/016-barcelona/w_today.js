/* 016 — сцена `today` (ОТВЕТ НА ХУК): 2026. Внутри и у Саграды: ящик для пожертвований и касса с билетами — монеты летят
   золотым потоком; реставраторы склеивают гипсовую модель из осколков (по старым фото на стене); на «обломков» модель целая.
   Вторая реплика: камера поднимается — центральная башня Иисуса растёт до 172,5 м с крестом, рядом сравнение с Ульмским
   собором (161,5 м). Том — худи BCN. Переход В сцену — склеенная модель вырастает в настоящую башню. */
(() => {
  EV.td_money = wtk('t1', 'пожертвования,');
  EV.td_glue = wtk('t1', 'обломков.');
  EV.td_top = wtk('t2', 'самая');
  EV.td_world = wtk('t2', 'мира.');
  KEYW.push('пожертвования,', 'обломков.', 'самая', 'мира.');
  const glue = t => sm((t - EV.td_money) / (EV.td_glue - EV.td_money + 0.4));
  const tower = t => sm((t - LS('t2') + 0.2) / 1.2);

  function sky(t) { vgrad(-900, 1000, ['#4a8ad8', '#a8d0f0', '#f6ecd4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); } }
  function plaza(t) {                                                  // Саграда, растущая башня, реставраторы, касса
    const tw = tower(t); sagrada(560, 1290, 0.46, t, { done: 0.7 + 0.3 * tw, cranes: true });
    rect(-600, 1140, 2300, 330, { wash: '#d8c8a8', washA: 1, w: 2, col: '#5a4a32' });
    push(0, 0, 1); rect(80, 1150, 520, 260, { wash: '#efe6d4', washA: 0.95, w: 3, col: '#5a4a32' }); for (let q = 0; q < 3; q++) rect(110 + q * 160, 1170, 120, 90, { wash: '#c8c0b0', washA: 1, w: 2, col: '#3a3a3a' }); txt('фото 1920-х', 340, 1290, 22, { font: 'Osw', col: '#5a4a32' }); pop();
    plaster(340, 1420, 0.7, t, { broken: 1 - glue(t) });
    for (let i = 0; i < 2; i++) human(170 + i * 360, 1440, 0.46, t, { body: '#f2f2f2', legs: '#3a4a6a', hair: ['#3a2210', '#c8a878'][i], hat: 'cap', hatCol: '#f2f2f2', face: 'calm', armR: 'point', armL: 'hold', seed: 16810 + i, flip: i ? -1 : 1 });
    donationBox(1020, 1430, 0.9, t);
    if (t > EV.td_money - 0.3) { const r = rng(16820); for (let i = 0; i < 18; i++) { const ph = (t * 0.9 + r()) % 1; ell(lerp(1400 + r() * 200, 1020, ph), lerp(900 + r() * 200, 1240, ph) - Math.sin(ph * Math.PI) * 120, 12, 12, { wash: BC.gold, washA: 1, w: 1.4, col: '#6a4a08' }); } }
  }

  WORLD.today = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => plaza(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#c8b898', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 80) for (let y = 1480; y < 2400; y += 80) rect(x, y, 78, 78, { wash: '#b8a888', washA: 0.6, w: 1, col: '#6a5a44', a: 0.4 }); ctx.restore(); cat(); });
    lay(0.7, () => motes(20, [0, 300, W, 1700], '#fff2c8', t, 16830, { sp: -10, sz: 2.2, a: 0.4, tw: 1, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieBCN', light: { side: 1, rim: '#ffe0c0' }, grade: ['#c0a080', 0.08],
    act: () => [[S0.today, 'talk'], [EV.td_money, 'smug'], [EV.td_glue, 'proud'], [EV.td_top - 0.03, 'awe'], [EV.td_world, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.0, look: t < LS('t2') ? [0.6, 0.1] : [0.4, -0.8], point: t > EV.td_money && t < EV.td_glue ? 1 : undefined, hand: t > EV.td_top ? [120, -430] : t > EV.td_money && t < EV.td_glue ? [220, -240] : [120, -270] }),
    cam: () => [[S0.today, 600, 1220, 0.12], [EV.td_money, 680, 1240, 0.12], [EV.td_glue, 500, 1260, 0.14], [LS('t2'), 560, 1000, 0.02], [EV.td_top, 560, 1060, 0.0], [S1.today, 560, 1060, 0.02]],
    hud: t => {
      if (t > EV.td_money && t < LS('t2')) { const k = popK(t, EV.td_money, 0.35); push(620, 740, k, 0.03); rect(-230, -60, 460, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ТОЛЬКО ПОЖЕРТВОВАНИЯ', 0, -10, 32, { font: 'Osw', col: '#a8501e' }); txt('и билеты туристов', 0, 34, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.td_world) { const k = popK(t, EV.td_world, 0.35); push(560, 1180, k, -0.02); rect(-240, -70, 480, 140, { wash: '#1a1a1e', washA: 0.92, w: 3, col: '#000' }); txt('172,5 м', 0, -14, 52, { font: 'Osw', col: '#ffd24a' }); txt('выше Ульмского собора (161,5)', 0, 40, 24, { col: '#f2ece0' }); pop(); }
    }
  };
  TRANS_IN.today = { a: 0.3, b: 0.45, fx(k, t, A, B) {               // солнечный свет сквозь витражи заливает кадр
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), cols = ['rgba(255,120,60,1)', 'rgba(80,140,255,1)', 'rgba(255,220,80,1)', 'rgba(80,220,140,1)']; for (let i = 0; i < 8; i++) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * f; ctx.fillStyle = cols[i % 4]; ctx.beginPath(); const x = i * 150 - 100 + k * 300; ctx.moveTo(x, 0); ctx.lineTo(x + 120, 0); ctx.lineTo(x + 420, H); ctx.lineTo(x + 300, H); ctx.closePath(); ctx.fill(); ctx.restore(); } });
  } };
})();
