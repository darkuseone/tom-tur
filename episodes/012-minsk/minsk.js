/* 012 Минск — общие детали города:
   MN — палитра; ratusha — Минская ратуша (белая, двухъярусная, башня с часами и шпилем; o.ruin — руины, o.ghost — контур);
   spirit — Свято-Духов собор (белый, две башни-барокко на холме); stalin — сталинский дом проспекта (лепнина, арки, башня со шпилем);
   library — Национальная библиотека-«алмаз» (ромбокубооктаэдр в стекле); izba — деревянный дом; snowField — снег/лёд;
   cake — праздничный торт со свечами и цифрами; detinets — деревянный детинец на холме (частокол, башни). */

const MN = { white: '#f2eee4', whiteD: '#b8b0a0', roof: '#6a7a8a', roofD: '#3a4652', gold: '#e2b84a', red: '#c8302a', green: '#3a7a4a', brick: '#a8603a', stalin: '#e8dcc4', stalinD: '#a89878' };

function ratusha(x, base, s, t, o = {}) {                                 // ратуша: два этажа арок, фронтон, башня с часами, шпиль
  push(x, base, s); const C = o.col || MN.white, CD = MN.whiteD, a = o.ghost ? 0.35 : 1;
  if (o.ruin) { for (let i = 0; i < 6; i++) { const rx = -260 + i * 100, rh = 60 + ((i * 37) % 90); poly([[rx, 0], [rx + 10, -rh], [rx + 50, -rh - 30], [rx + 90, -rh + 10], [rx + 100, 0]], { wash: '#8a8478', washA: 1, w: 2, col: '#2a2420' }); } pop(); return; }
  ctx.save(); ctx.globalAlpha = a;
  const b = rect(-280, -240, 560, 240, { wash: C, washA: 1, w: 2.4, col: '#3a3630' }); shadeG(b.path, 280, 0, -280, 0, CD, 0.35);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) { const ax = -240 + i * 80, ay = -20 - r * 120; shape([[ax, ay], [ax, ay - 60], ...spline([[ax, ay - 60], [ax + 25, ay - 90], [ax + 50, ay - 60]], false, 6), [ax + 50, ay]], { wash: r ? '#5a6a7a' : '#4a3a2a', washA: 1, w: 1.6, col: '#2a2420' }); }
  pencil([[-280, -120], [280, -120]], { w: 5, col: CD, pass2: false });
  poly([[-290, -240], [290, -240], [220, -300], [-220, -300]], { wash: MN.roof, washA: 1, w: 2, col: MN.roofD });
  const tw = rect(-60, -470, 120, 230, { wash: C, washA: 1, w: 2.2, col: '#3a3630' }); shadeG(tw.path, 60, 0, -60, 0, CD, 0.35);
  ell(0, -400, 40, 40, { wash: '#f6f2e6', washA: 1, w: 3, col: '#2a2420' }); const hh = t * 0.6; pencil([[0, -400], [Math.cos(hh) * 22, -400 + Math.sin(hh) * 22]], { w: 4, col: '#2a2420', pass2: false }); pencil([[0, -400], [Math.cos(hh * 12) * 32, -400 + Math.sin(hh * 12) * 32]], { w: 2.4, col: '#2a2420', pass2: false });
  blob([[-70, -470], [-50, -540], [0, -570], [50, -540], [70, -470]], { wash: MN.roof, washA: 1, w: 2, col: MN.roofD }); pencil([[0, -570], [0, -660]], { w: 5, col: MN.gold, pass2: false }); ell(0, -600, 10, 10, { wash: MN.gold, washA: 1, w: 1.2, col: '#6a4a08' });
  if (o.plaque) { rect(-90, -200, 180, 40, { wash: '#d8c8a0', washA: 1, w: 1.6, col: '#3a2a14' }); txt(o.plaque, 0, -180, 20, { font: 'Osw', col: '#3a2a14' }); }
  ctx.restore(); pop();
}

function spirit(x, base, s, t) {                                          // Свято-Духов собор на холме: белый, две башни барокко
  push(x, base, s);
  const b = rect(-200, -260, 400, 260, { wash: MN.white, washA: 1, w: 2.4, col: '#3a3630' }); shadeG(b.path, 200, 0, -200, 0, MN.whiteD, 0.35);
  poly([[-120, -260], [120, -260], [0, -340]], { wash: MN.white, washA: 1, w: 2, col: '#3a3630' });
  for (const sx of [-170, 170]) { const tw = rect(sx - 50, -460, 100, 460, { wash: MN.white, washA: 1, w: 2.2, col: '#3a3630' }); shadeG(tw.path, sx + 50, 0, sx - 50, 0, MN.whiteD, 0.35);
    blob([[sx - 56, -460], [sx - 40, -520], [sx, -560], [sx + 40, -520], [sx + 56, -460]], { wash: '#4a7a5a', washA: 1, w: 2, col: '#1a3a24' }); ell(sx, -590, 18, 26, { wash: '#4a7a5a', washA: 1, w: 1.6, col: '#1a3a24' }); pencil([[sx, -615], [sx, -660]], { w: 4, col: MN.gold, pass2: false }); pencil([[sx - 12, -648], [sx + 12, -648]], { w: 3, col: MN.gold, pass2: false });
    for (let q = 0; q < 3; q++) rect(sx - 16, -420 + q * 120, 32, 60, { wash: '#3a4a5a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
  for (let i = 0; i < 4; i++) rect(-150 + i * 80, -200, 40, 90, { wash: '#3a4a5a', washA: 1, w: 1.4, col: '#1a1a1a' });
  pop();
}

function stalin(x, base, w, h, t, o = {}) {                               // сталинский дом: русты, арки внизу, пилястры, карниз, башня со шпилем
  const C = o.col || MN.stalin, CD = MN.stalinD; const f = rect(x, base - h, w, h, { wash: C, washA: 1, w: 2.2, col: '#3a3020', key: o.key }); shadeG(f.path, x + w, 0, x, 0, CD, 0.3);
  const fl = Math.max(3, Math.round(h / 90)), cols = Math.max(3, Math.round(w / 60)), fh = h / fl, cw = w / cols;
  for (let i = 0; i < cols; i++) { const ax = x + i * cw + cw * 0.15; shape([[ax, base], [ax, base - fh * 0.6], ...spline([[ax, base - fh * 0.6], [ax + cw * 0.35, base - fh * 0.85], [ax + cw * 0.7, base - fh * 0.6]], false, 6), [ax + cw * 0.7, base]], { wash: '#4a4030', washA: 1, w: 1.4, col: '#2a2010' }); }
  for (let j = 1; j < fl; j++) { const y = base - h + (j - 1) * fh; for (let i = 0; i < cols; i++) { const on = o.lit && rng(hsh(i, j, x))() < 0.55; rect(x + i * cw + cw * 0.25, y + fh * 0.25, cw * 0.5, fh * 0.55, { wash: on ? '#f6d48a' : (o.night ? '#1e2a3a' : '#4a5a6a'), washA: 1, w: 1.2, col: '#2a2010' }); if (on) glow(x + i * cw + cw * 0.5, y + fh * 0.5, cw * 0.6, 'rgba(255,200,110,1)', 0.3); } }
  for (let i = 0; i <= cols; i += 2) pencil([[x + i * cw, base - h], [x + i * cw, base - fh]], { w: 4, col: '#f6f0e2', a: 0.7, pass2: false });
  rect(x - 10, base - h - 18, w + 20, 20, { wash: '#f6f0e2', washA: 1, w: 1.4, col: '#3a3020' }); pencil([[x, base - fh], [x + w, base - fh]], { w: 6, col: CD, pass2: false });
  if (o.tower) { const tx = x + w / 2, ty = base - h - 18; rect(tx - 40, ty - 160, 80, 160, { wash: C, washA: 1, w: 2, col: '#3a3020' }); rect(tx - 26, ty - 240, 52, 80, { wash: C, washA: 1, w: 2, col: '#3a3020' }); poly([[tx - 26, ty - 240], [tx + 26, ty - 240], [tx, ty - 360]], { wash: o.night ? '#8a7a4a' : MN.gold, washA: 1, w: 1.8, col: '#6a4a08' }); poly([[tx, ty - 392], [tx + 8, ty - 372], [tx + 24, ty - 372], [tx + 11, ty - 362], [tx + 16, ty - 344], [tx, ty - 355], [tx - 16, ty - 344], [tx - 11, ty - 362], [tx - 24, ty - 372], [tx - 8, ty - 372]], { wash: o.night ? '#d8c060' : MN.gold, washA: 1, w: 1.2, col: '#6a4a08' }); }
}

function library(x, base, s, t, o = {}) {                                // Национальная библиотека: «алмаз» на стилобате, светится ночью
  push(x, base, s); rect(-260, -80, 520, 80, { wash: '#8a9aaa', washA: 1, w: 2, col: '#2a3440' });
  const D = [[0, -560], [150, -500], [210, -330], [150, -160], [0, -100], [-150, -160], [-210, -330], [-150, -500]];
  const d = shape(D, { wash: o.night ? '#1a3a5a' : '#6aa0c0', washA: 1, w: 2.4, col: '#14283a' }); shadeG(d.path, 210, -330, -210, -330, '#14283a', 0.4);
  for (let q = 0; q < 8; q++) pencil([[0, -330], D[q]], { w: 1.6, col: '#a8d0e8', a: 0.6, pass2: false });
  pencil([[-210, -330], [210, -330]], { w: 1.6, col: '#a8d0e8', a: 0.6, pass2: false });
  if (o.night) { const hue = (t * 40) % 360; ctx.save(); ctx.clip(d.path); for (let q = 0; q < 6; q++) glow(-120 + q * 50, -330 + Math.sin(t * 2 + q) * 60, 90, `hsla(${(hue + q * 50) % 360},80%,60%,1)`, 0.5); ctx.restore(); }
  pop();
}

function izba(x, base, w, h, s, t, o = {}) {                               // деревянный дом: брёвна, двускатная крыша, окна с наличниками
  push(x, base, s); const r = rect(-w / 2, -h, w, h, { wash: o.col || '#8a6a44', washA: 1, w: 2, col: '#2a1a08' }); for (let y = -h + 14; y < 0; y += 18) pencil([[-w / 2, y], [w / 2, y]], { w: 2, col: '#4a3218', a: 0.7, pass2: false });
  poly([[-w / 2 - 20, -h], [w / 2 + 20, -h], [0, -h - h * 0.6]], { wash: o.roof || '#5a4a3a', washA: 1, w: 2, col: '#2a1a08' });
  for (const sd of [-1, 1]) { rect(sd * w * 0.22 - 22, -h * 0.7, 44, 50, { wash: o.lit ? '#f6d48a' : '#3a4a5a', washA: 1, w: 2, col: '#2a1a08' }); rect(sd * w * 0.22 - 28, -h * 0.7 - 10, 56, 10, { wash: '#e8e0cc', washA: 1, w: 1.4, col: '#2a1a08' }); if (o.lit) glow(sd * w * 0.22, -h * 0.7 + 25, 50, 'rgba(255,200,110,1)', 0.4); }
  pop();
}

function cake(x, y, s, t, label, col, o = {}) {                            // торт со свечами и цифрами-годом
  push(x, y, s);
  for (const [w, h, c, dy] of [[260, 90, col, 0], [200, 80, lerpC(col, '#ffffff', 0.3), -90]]) { const r = rect(-w / 2, dy - h, w, h, { wash: c, washA: 1, w: 2.4, col: '#3a1a1a' }); for (let q = 0; q < 8; q++) ell(-w / 2 + 10 + q * (w - 20) / 7, dy - h + 4, 12, 9, { wash: '#fff6ea', washA: 1, w: 1, col: '#3a1a1a', a: 0.6 }); }
  ell(0, 2, 160, 20, { wash: '#e8e4dc', washA: 1, w: 2, col: '#3a3a3a' });
  for (let q = 0; q < 4; q++) { const cx = -60 + q * 40; rect(cx - 6, -230, 12, 50, { wash: ['#e8a33c', '#5a9ad0', '#c8302a', '#6ac08a'][q], washA: 1, w: 1.2, col: '#2a1a1a' }); if (!o.out) { const fl = flick(t, q); blob([[cx - 7, -232], [cx, -258 * fl], [cx + 7, -232]], { wash: '#ffd24a', washA: 1, w: 1, col: '#c86a10' }); glow(cx, -244, 30, 'rgba(255,200,110,1)', 0.6); } }
  txt(label, 0, -60, 64, { font: 'Osw', col: '#fff6e0' }); pop();
}

function detinets(x, base, s, t) {                                        // деревянный детинец на холме: частокол, вежи, ворота
  push(x, base, s);
  const hl = shape([[-420, 0], [-300, -110], [300, -120], [420, 0]], { wash: '#d8dce4', washA: 1, w: 2, col: '#5a6a7a' });
  for (let k = 0; k < 26; k++) { const px = -300 + k * 24; poly([[px - 10, -110], [px + 10, -110], [px + 10, -200], [px, -220], [px - 10, -200]], { wash: '#7a5a34', washA: 1, w: 1.4, col: '#2a1a08' }); }
  for (const tx of [-300, 0, 300]) { rect(tx - 40, -300, 80, 190, { wash: '#7a5a34', washA: 1, w: 2, col: '#2a1a08' }); poly([[tx - 54, -300], [tx + 54, -300], [tx, -370]], { wash: '#5a4a3a', washA: 1, w: 2, col: '#2a1a08' }); }
  pop();
}
