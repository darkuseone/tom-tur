/* 016 — сцена `seu`: 1298, Готический квартал. Собор в лесах (фасад только начат: нижний ярус и порталы), каменщики тешут
   блоки, лебёдка-«беличье колесо» поднимает камень, монахи, узкие улочки, арки. На «собор» звонит колокол, на «Шпиль» поверх
   кадра призраком проступает шпиль 1913 года, на «шестьсот» — HUD «1298 → 1913: 615 лет». Том — итальянский зодчий.
   Переход В сцену — витраж-розетка складывается из цветных стёкол. */
(() => {
  EV.se_cat = wtk('s2', 'собор.');
  EV.se_spire = wtk('s2', 'Шпиль');
  EV.se_600 = wtk('s2', 'шестьсот');
  KEYW.push('собор.', 'шестьсот');

  function sky(t) { vgrad(-900, 1000, ['#6a8ac0', '#b8cce0', '#f0e4cc'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#f8f4ec', washA: 0.85, line: false }); } }
  function quarter(t) {                                                // улочки, собор в лесах, лебёдка
    for (let k = 0; k < 6; k++) { const x = k < 3 ? -520 + k * 160 : 980 + (k - 3) * 160, h = 300 + (k % 2) * 60; rect(x, 1160 - h, 150, h, { wash: ['#c8b494', '#d8c4a4', '#bca888'][k % 3], washA: 1, w: 2, col: '#4a3a24' }); for (let j = 0; j < 3; j++) { rect(x + 50, 1160 - h + 40 + j * 90, 46, 60, { wash: '#3a2a1a', washA: 1, w: 1.4, col: '#1a0a04' }); ell(x + 73, 1160 - h + 40 + j * 90, 23, 16, { wash: '#3a2a1a', washA: 1, w: 1.4, col: '#1a0a04' }); } }
    const sp = t > EV.se_spire ? sm((t - EV.se_spire) / 0.6) : 0;
    ctx.save(); ctx.beginPath(); ctx.rect(-600, 1160 - 520 * 0.75 - 40, 2400, 2000); ctx.clip(); seu(560, 1160, 0.75, t, { scaff: 1 }); ctx.restore();
    if (sp > 0) { ctx.save(); ctx.globalAlpha = 0.45 * sp; seu(560, 1160, 0.75, t, { spire: 1 }); ctx.restore(); txt('1913', 560, 1160 - 0.75 * 1080, 40, { font: 'Osw', col: '#5a1a10', a: sp }); }
    push(940, 1160); const a = t * 1.4; ell(0, -200, 140, 140, { wash: null, w: 8, col: '#6a4424' }); for (let q = 0; q < 8; q++) { const an = a + q * 0.785; pencil([[0, -200], [Math.cos(an) * 136, -200 + Math.sin(an) * 136]], { w: 4, col: '#6a4424', pass2: false }); } pencil([[0, -200], [0, -560]], { w: 3, col: '#3a2a1a', pass2: false }); const ry = -380 - ((t * 40) % 160); rect(-30, ry, 60, 50, { wash: '#cfc0a2', washA: 1, w: 2, col: '#3a3020' });
    human(-30, 0, 0.42, t, { body: '#6a4a2a', legs: '#3a2a1a', hair: '#3a2210', face: 'calm', armR: 'up', armL: 'up', seed: 16310 }); pop();
    for (let i = 0; i < 3; i++) { const x = 160 + i * 220; human(x, 1300, 0.46, t, { body: ['#7a5a3a', '#3a2a1e', '#8a7a5a'][i], legs: '#3a2a1a', hair: '#3a2210', hat: i === 1 ? 'hood' : 'cap', hatCol: '#3a2a1e', face: 'calm', armR: i === 1 ? 'hold' : (Math.sin(t * 7 + i) > 0 ? 'up' : 'point'), armL: 'hold', long: i === 1, seed: 16320 + i }); if (i !== 1) rect(x + 30, 1250, 70, 50, { wash: '#cfc0a2', washA: 1, w: 2, col: '#3a3020' }); }
  }

  WORLD.seu = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => quarter(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89878', washA: 1, w: 2, col: '#4a3a24', a: 0.4 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1470; y < 2400; y += 46) rect(x + (Math.floor(y / 46) % 2) * 35, y, 68, 44, { wash: '#9a8a6a', washA: 0.6, w: 1, col: '#5a4a34', a: 0.4 }); ctx.restore(); cat(); });
    lay(0.7, () => motes(30, [-200, 600, 1300, 1700], '#e8dcc0', t, 16330, { sp: -8, sz: 3, a: 0.35, wob: 20 }));
  };
  DIR.seu = {
    outfit: 'master', light: { side: 1, rim: '#fff0d0' }, grade: ['#b0a080', 0.08],
    act: () => [[S0.seu, 'proud'], [EV.se_cat, 'grin'], [EV.se_spire, 'suspicious'], [EV.se_600 - 0.03, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.5, -0.7], point: t > EV.se_spire ? 1 : undefined, hand: t > EV.se_spire ? [160, -420] : [120, -270] }),
    cam: () => [[S0.seu, 560, 1060, 0.04], [EV.se_cat, 560, 1040, 0.06], [EV.se_spire, 560, 860, 0.0], [EV.se_600, 560, 900, 0.02], [S1.seu, 560, 920, 0.04]],
    hud: t => { if (t > EV.se_600) { const k = popK(t, EV.se_600, 0.35); push(640, 1060, k, 0.03); rect(-210, -60, 420, 120, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#5a4a2a' }); txt('1298 → 1913', 0, -10, 40, { font: 'Osw', col: '#2a1a10' }); txt('615 лет стройки', 0, 36, 28, { col: '#a8201e' }); pop(); } }
  };
  TRANS_IN.seu = { a: 0.3, b: 0.45, fx(k, t, A, B) {                 // витраж-розетка складывается из стёкол
    const q = sm(k), cx = 540, cy = 960; drawBuf(A); const R = q * 1500 + 1; inCircle(cx, cy, R, () => drawBuf(B, 1.06 - 0.06 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), cols = ['#c83a3a', '#3a5ac8', '#e8b830', '#3a8a4a']; for (let s = 0; s < 16; s++) { const a0 = s * 0.3927 + q * 2, a1 = a0 + 0.3927; ctx.save(); ctx.globalAlpha = 0.55 * f; ctx.fillStyle = cols[s % 4]; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R + 200, a0, a1); ctx.closePath(); ctx.fill(); ctx.restore(); pencil([[cx, cy], [cx + Math.cos(a0) * (R + 200), cy + Math.sin(a0) * (R + 200)]], { w: 6, col: '#1a1a1a', a: f, pass2: false }); } });
  } };
})();
