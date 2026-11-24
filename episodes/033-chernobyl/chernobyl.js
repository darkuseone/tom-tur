/* 033 Чернобыль — общие детали: палитра «весеннее Полесье, речная бирюза Припяти, охра местечка, бетон 70-х, оранжевое зарево 1986,
   холодная сталь арки, ядовито-жёлтый дозиметр». Сквозная нить — дорожный указатель с именем города в каждой эпохе + кустик полыни
   (трава «чернобыль» — полынь обыкновенная с тёмным стеблем). Глобус по смыслу: Европа → Украина, две метки «ЧЕРНОБЫЛЬ · 1193» и
   «ЧАЭС · 1970» с пунктиром 15 км, наезд точно в город на Припяти. Карты: облако → Швеция (Форсмарк), зона 30 км и колонны автобусов.
   Отмотка 033 — стрелка дозиметра: полный оборот Тома, шкала закручивается в воронку-циферблат, треск счётчика → вспышка. */
const CH = { ink: '#14100c', grass: '#6a9a3a', grassL: '#a8c860', grassD: '#2e5a22', pine: '#2a4a2a', pineD: '#16281a', birch: '#f2ece0', water: '#3a8aa0', waterL: '#8ad0d8',
  ochre: '#d8a858', wood: '#8a5a32', woodD: '#4a2e18', woodL: '#c8925a', thatch: '#c8a058', tin: '#7a8a96', concrete: '#b8b4aa', concD: '#6a6860', concL: '#e2ded2',
  amber: '#f0a040', ember: '#ff6a1e', glowO: '#ffb040', red: '#c8281e', white: '#f6f2e8', steel: '#9aa8b4', steelD: '#4a5868', steelL: '#dce6ee', dos: '#f2c81e', dosD: '#8a6a08',
  night: '#101828', nightL: '#2a3a5a', sky: '#7ab0dc', mug: '#9aac90', mugD: '#3a1a22', mugL: '#d0dcc8', blue: '#2a5aa8', rust: '#a8582a' };
const CG = { town: [30.22, 51.27], npp: [30.10, 51.39], pripyat: [30.06, 51.405], kyiv: [30.52, 50.45], forsmark: [18.18, 60.40], moscow: [37.62, 55.75], stockholm: [18.07, 59.33], minsk: [27.56, 53.90] };
const CH_UA = [[22.1, 48.4], [22.8, 49.0], [24.0, 50.4], [23.6, 51.5], [25.5, 51.9], [27.8, 51.6], [30.5, 51.3], [31.8, 52.1], [33.8, 52.35], [35.4, 50.6], [36.6, 50.2], [38.2, 50.0], [40.1, 49.6],
  [40.0, 48.3], [39.7, 47.8], [38.3, 47.1], [37.3, 46.9], [35.3, 46.3], [34.8, 45.9], [33.5, 46.0], [32.0, 46.5], [30.8, 46.5], [29.6, 45.4], [28.2, 45.5], [28.8, 46.5], [30.0, 47.8], [28.2, 48.2],
  [26.6, 48.3], [24.9, 47.7], [22.9, 47.9]];
const RIV_PRIPYAT = [[29.2, 51.9], [29.6, 51.75], [29.9, 51.55], [30.03, 51.45], [30.08, 51.41], [30.13, 51.37], [30.19, 51.32], [30.25, 51.27], [30.33, 51.2], [30.45, 51.1]];
const RIV_DNIPRO = [[30.35, 52.0], [30.42, 51.6], [30.5, 51.3], [30.47, 51.1], [30.5, 50.85], [30.6, 50.6], [30.55, 50.45], [30.7, 50.2]];
const KYIV_SEA = [[30.3, 51.15], [30.5, 51.2], [30.62, 51.0], [30.55, 50.75], [30.42, 50.72], [30.32, 50.9]];
const ZONE30 = (() => { const p = []; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; p.push([CG.npp[0] + Math.cos(a) * 0.43, CG.npp[1] + Math.sin(a) * 0.27]); } return p; })();

function chLabel(x, y, s, size, o = {}) {                                // тёмная плашка с текстом (карта, глобус)
  ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.font = `600 ${size}px Osw`; const w = ctx.measureText(s).width + 30; ctx.fillStyle = o.bg || 'rgba(16,10,8,0.86)'; ctx.fillRect(x, y - size * 0.72, w, size * 1.34); ctx.restore();
  txt(s, x + w / 2, y, size, { col: o.col || '#ffe08a', font: 'Osw', a: o.a ?? 1 }); return w;
}
function trefoil(x, y, r, col, bg, a = 1) {                             // знак радиации: три лепестка + центр
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.fillStyle = bg || CH.dos; ctx.beginPath(); ctx.arc(0, 0, r * 1.18, 0, 6.283); ctx.fill(); ctx.fillStyle = col || '#16120c';
  for (let i = 0; i < 3; i++) { const a0 = -Math.PI / 2 + i * 2.094 - 0.52; ctx.beginPath(); ctx.arc(0, 0, r, a0, a0 + 1.047); ctx.arc(0, 0, r * 0.3, a0 + 1.047, a0, true); ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.18, 0, 6.283); ctx.fill(); ctx.restore();
}
function chDetail(pr, R, t) {                                          // финал наезда: Припять-река, Днепр, город, станция, 15 км
  GLOBE.fill(pr(CH_UA), '#cfe0a0'); pencil(pr(CH_UA.concat([CH_UA[0]])), { w: 4, col: CH.ink, a: 0.7, pass2: false, gap: false });
  GLOBE.fill(pr(KYIV_SEA), '#3a86b8'); pencil(pr(RIV_PRIPYAT), { w: 10, col: '#3a86b8', pass2: false, gap: false }); pencil(pr(RIV_DNIPRO), { w: 12, col: '#3a86b8', pass2: false, gap: false });
  const k = clamp((R - 8000) / 9000); if (k <= 0) return;
  const r = rng(4410); for (let i = 0; i < 70; i++) { const [x, y] = pr([[29.7 + r() * 1.1, 50.9 + r() * 0.8]])[0]; ell(x, y, 18 + r() * 30, 10 + r() * 16, { wash: i % 3 ? '#4a7a3a' : '#2e5a28', washA: 0.5 * k, line: false }); }
  const [tx, ty] = pr([CG.town])[0], [nx, ny] = pr([CG.npp])[0], [px, py] = pr([CG.pripyat])[0];
  pencil([[tx, ty], [nx, ny]], { w: 7, col: '#fff6e0', a: k, pass2: false, gap: true }); txt('15 КМ', (tx + nx) / 2 + 70, (ty + ny) / 2 + 10, 44, { col: '#fff6e0', font: 'Osw', a: k });
  ell(tx, ty, 26, 26, { wash: CH.red, washA: k, w: 3, col: CH.ink, a: k }); ell(px, py, 12, 12, { wash: '#6a6a6a', washA: k, w: 2, col: CH.ink, a: k });
  trefoil(nx, ny, 26, '#16120c', CH.dos, k);
  chLabel(tx + 36, ty + 6, 'ЧЕРНОБЫЛЬ · 1193', 50, { a: k }); chLabel(nx + 40, ny - 4, 'ЧАЭС · 1970', 44, { a: k, col: '#fff2a0' }); chLabel(px - 250, py - 40, 'ПРИПЯТЬ', 34, { a: k * 0.9, col: '#e8e8e8' });
}
function chExtra(pr, R, t) {                                           // глобус по смыслу: подсвечена Украина, две метки
  if (R > 2600) return; const a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200)); if (a <= 0) return;
  GLOBE.fill(pr(CH_UA), '#f0d070', 0.8 * a);
}
const CH_GLOBE = { lon: CG.town[0], lat: CG.town[1], label: 'ЧЕРНОБЫЛЬ', fromLon: -5, fromLat: 40, Rend: 30000, detail: chDetail, extra: chExtra };

// ---------- растения, природа Полесья
function mugwort(x, y, s, t, seed = 1, o = {}) {                        // полынь обыкновенная («чернобыль»): тёмно-бордовые стебли, перистые серебристые листья, метёлки
  push(x, y, s); const r = rng(4500 + seed), sw = Math.sin(t * 1.6 + seed) * 6;
  for (let i = 0; i < 5; i++) { const bx = (i - 2) * 16 + (r() - 0.5) * 10, h = 120 + r() * 80, tip = [bx + sw + (r() - 0.5) * 30, -h];
    pencil([[bx, 0], [bx + sw * 0.4, -h * 0.5], tip], { w: 4, col: o.stem || CH.mugD, pass2: false });
    for (let q = 0; q < 6; q++) { const f = 0.2 + q * 0.13, lx = lerp(bx, tip[0], f), ly = -h * f, d = (q % 2 ? 1 : -1);
      blob([[lx, ly], [lx + d * 24, ly - 10], [lx + d * 34, ly - 2], [lx + d * 20, ly + 6]], { wash: q % 3 ? (o.leaf || CH.mug) : CH.mugL, washA: 1, w: 1.2, col: '#2a3a2a' }); }
    for (let q = 0; q < 5; q++) ell(tip[0] + (r() - 0.5) * 16, tip[1] + q * 9, 4, 6, { wash: '#b89a6a', washA: 1, w: 0.8, col: '#4a3a20' }); }
  pop();
}
function polPine(x, base, h, t, seed = 1, o = {}) {                     // сосна Полесья: прямой рыжий ствол, ярусы хвои
  const r = rng(4600 + seed), sw = Math.sin(t * 0.8 + seed) * 4, L = CH.ink;
  poly([[x - h * 0.025, base], [x - h * 0.012, base - h], [x + h * 0.012, base - h], [x + h * 0.025, base]], { wash: o.trunk || '#b8643a', washA: 1, w: 1.6, col: L });
  for (let i = 0; i < 4; i++) { const y = base - h * (0.62 + i * 0.12), w = h * (0.22 - i * 0.04); blob([[x - w + sw, y], [x - w * 0.5 + sw, y - h * 0.1], [x + w * 0.3 + sw, y - h * 0.12], [x + w + sw, y - h * 0.02], [x + w * 0.2, y + h * 0.04]], { wash: i % 2 ? (o.col || CH.pine) : (o.colD || CH.pineD), washA: 1, w: 1.6, col: L }); }
}
function birch(x, base, h, t, seed = 1, o = {}) {                       // берёза: белый ствол с чёрными чёрточками, светлая крона
  const r = rng(4700 + seed), sw = Math.sin(t * 1.1 + seed) * 6, L = CH.ink;
  poly([[x - 10, base], [x - 4, base - h], [x + 4, base - h], [x + 10, base]], { wash: CH.birch, washA: 1, w: 1.6, col: L });
  for (let i = 0; i < 8; i++) { const yy = base - r() * h * 0.9; pencil([[x - 8, yy], [x + 2 + r() * 6, yy - 2]], { w: 3, col: '#2a2420', pass2: false }); }
  for (let i = 0; i < 6; i++) ell(x + (r() - 0.5) * h * 0.4 + sw, base - h * (0.7 + r() * 0.3), h * 0.12 + r() * h * 0.06, h * 0.09, { wash: i % 2 ? (o.col || CH.grassL) : (o.colD || CH.grass), washA: 0.95, w: 1.2, col: '#2a3a1a' });
}
function reeds(x0, x1, base, t, seed, col = '#8aa04a') { const r = rng(seed); for (let x = x0; x < x1; x += 14) { const h = 40 + r() * 60, s = Math.sin(t * 2 + x * 0.05) * 8; pencil([[x, base], [x + s, base - h]], { w: 3, col, pass2: false }); if (r() < 0.3) ell(x + s, base - h, 4, 12, { wash: '#6a4a2a', washA: 1, line: false }); } }
function river(y0, y1, t, o = {}) {                                     // река Припять: бирюза, блики, рябь
  rect(-600, y0, 2300, y1 - y0, { wash: o.col || CH.water, washA: 1, line: false }); vgrad(y0, y1, [o.colL || '#7ac0c8', o.col || CH.water, o.colD || '#1e5a70'], 0.7);
  for (let i = 0; i < 26; i++) { const r = rng(4800 + i), y = y0 + 10 + r() * (y1 - y0 - 20), x = ((r() * 1600 + t * (20 + r() * 30)) % 1800) - 400; pencil([[x, y], [x + 40 + r() * 60, y]], { w: 2.4, col: o.hl || '#e8fbff', a: 0.55, pass2: false }); }
}

// ---------- сквозная нить: указатель с именем города
function roadSign(x, base, s, t, kind, o = {}) {
  push(x, base, s, o.rot || 0); const L = CH.ink;
  if (kind === 'chron') { pencil([[0, 0], [0, -360]], { w: 14, col: CH.woodD, pass2: false }); rect(-150, -380, 300, 110, { wash: '#e8d8b0', washA: 1, w: 3, col: L, shade: { gap: 7, a: 0.15, col: '#8a6a3a', ang: 0.1 } });
    txt('ЧЕРНОБЫЛЬ', 0, -322, 44, { col: '#5a1a10', font: 'Hand' }); ell(-120, -360, 8, 8, { wash: CH.woodD, washA: 1, line: false }); ell(120, -360, 8, 8, { wash: CH.woodD, washA: 1, line: false }); }
  else if (kind === 'shtetl') { pencil([[0, 0], [0, -380]], { w: 12, col: '#5a4a3a', pass2: false }); poly([[-160, -400], [140, -400], [180, -350], [140, -300], [-160, -300]], { wash: '#2a3a5a', washA: 1, w: 3, col: L });
    txt('ЧЕРНОБЫЛЬ', -10, -346, 40, { col: '#f0e8d0', font: 'Osw' }); txt('Радомысльский уезд', -10, -312, 20, { col: '#c8c0a8', font: 'Hand' }); }
  else if (kind === 'build') { for (const k of [-90, 90]) pencil([[k, 0], [k, -300]], { w: 9, col: '#8a9096', pass2: false }); rect(-200, -440, 400, 170, { wash: '#1e5aa8', washA: 1, w: 3, col: L });
    pencil([[-188, -428], [188, -428], [188, -282], [-188, -282], [-188, -428]], { w: 3, col: '#ffffff', pass2: false }); txt('ЧЕРНОБЫЛЬ', 0, -390, 50, { col: '#ffffff', font: 'Osw' });
    txt('ЧАЭС  15 →', 0, -322, 42, { col: '#ffe86a', font: 'Osw' }); }
  else { rect(-180, -230, 360, 230, { wash: CH.concrete, washA: 1, w: 3, col: L, shade: { gap: 8, a: 0.14, col: CH.concD, ang: 1.2 } }); rect(-180, -250, 360, 24, { wash: CH.concD, washA: 1, w: 2, col: L });
    txt('ЧОРНОБИЛЬ', 0, -180, 50, { col: '#1a1a20', font: 'Osw' }); trefoil(0, -90, 44, '#16120c', CH.dos, 1); if (o.rust !== false) for (let i = 0; i < 5; i++) pencil([[-160 + i * 70, -226], [-156 + i * 70, -150]], { w: 3, col: CH.rust, a: 0.35, pass2: false }); }
  pop(); mugwort(x + 70 * s, base + 6, s * 0.75, t, Math.floor(x));
}

// ---------- архитектура
function khata(x, base, w, h, t, o = {}) {                               // полесская хата: сруб/побелка, наличники, крыша (солома/жесть), труба, плетень
  const L = CH.ink, wall = o.wall || '#ece4d0'; push(x, base, o.s || 1);
  rect(-w / 2, -h, w, h, { wash: wall, washA: 1, w: 2.2, col: L, shade: o.log ? { gap: 14, a: 0.25, col: CH.woodD, ang: 0 } : { gap: 10, a: 0.08, col: '#8a7a6a', ang: 1.3 } });
  const roof = o.roof || CH.thatch; poly([[-w / 2 - 26, -h], [0, -h - h * 0.75], [w / 2 + 26, -h]], { wash: roof, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.22, col: lerpC(roof, '#000000', 0.5), ang: o.roof ? 0.2 : 1.1 } });
  rect(w * 0.18, -h - h * 0.6, 26, h * 0.4, { wash: '#a8584a', washA: 1, w: 1.6, col: L }); if (o.smoke) for (let i = 0; i < 4; i++) { const k = (t * 0.25 + i / 4) % 1; ell(w * 0.18 + 13 + Math.sin(t + i) * 14, -h - h * 0.6 - k * 140, 14 + k * 36, 10 + k * 22, { wash: '#d8d4cc', washA: 0.4 * (1 - k), line: false }); }
  const nw = o.win ?? 2; for (let i = 0; i < nw; i++) { const wx = -w / 2 + (i + 0.5) * w / nw - 26; rect(wx, -h * 0.72, 52, 60, { wash: o.lit ? '#ffd890' : '#4a6a7a', washA: 1, w: 1.6, col: L });
    pencil([[wx + 26, -h * 0.72], [wx + 26, -h * 0.72 + 60]], { w: 2, col: L, pass2: false }); rect(wx - 8, -h * 0.72 - 16, 68, 14, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.4, col: L }); rect(wx - 8, -h * 0.72 + 60, 68, 10, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.4, col: L });
    for (const d of [-1, 1]) rect(wx + (d < 0 ? -22 : 52), -h * 0.72, 22, 60, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.2, col: L }); }
  if (o.door) rect(w / 2 - 70, -h * 0.66, 46, h * 0.66, { wash: CH.wood, washA: 1, w: 1.6, col: L });
  pop();
}
function wattle(x0, x1, base, h, t, seed = 1) { const L = CH.ink; for (let x = x0; x <= x1; x += 34) pencil([[x, base + 4], [x + 2, base - h - 8]], { w: 5, col: CH.woodD, pass2: false }); for (let i = 0; i < 4; i++) pencil([[x0, base - 10 - i * h / 4], [x1, base - 12 - i * h / 4 + (i % 2 ? 4 : -4)]], { w: 4, col: CH.woodL, pass2: false }); }
function panel16(x, base, w, h, t, o = {}) {                            // многоэтажка Припяти 70-х: балконы, окна, буквы на крыше
  const L = CH.ink, c = o.col || '#e6e2d6'; rect(x - w / 2, base - h, w, h, { wash: c, washA: 1, w: 2.2, col: L, shade: { gap: 12, a: 0.08, col: '#6a6a70', ang: 1.4 } });
  const fl = Math.floor(h / 46), col = Math.floor(w / 60); for (let i = 0; i < fl; i++) for (let j = 0; j < col; j++) { const wx = x - w / 2 + 14 + j * 60, wy = base - h + 16 + i * 46, r = rng(hsh(x, i, j)); const on = o.dark ? 0 : r() < (o.lit ?? 0.25);
    rect(wx, wy, 32, 26, { wash: on ? '#ffd890' : (o.winCol || '#5a7a8a'), washA: 1, w: 1, col: L, a: 0.7 }); if (j % 2 === 0) rect(wx - 6, wy + 22, 46, 8, { wash: o.bal || '#c84a2a', washA: 1, w: 1, col: L, a: 0.6 }); }
  if (o.roofTxt) { for (let i = 0; i < 3; i++) pencil([[x - w * 0.3 + i * w * 0.3, base - h], [x - w * 0.3 + i * w * 0.3, base - h - 40]], { w: 3, col: '#5a5a60', pass2: false }); txt(o.roofTxt, x, base - h - 56, o.rs || 40, { col: o.roofCol || '#c8281e', font: 'Osw' }); }
}
function ventStack(x, base, h, t, o = {}) {                             // вентиляционная труба ЧАЭС: красно-белые пояса, площадки, решётка
  const L = CH.ink, w0 = h * 0.06, w1 = h * 0.035;
  for (let i = 0; i < 8; i++) { const y0 = base - h * i / 8, y1 = base - h * (i + 1) / 8, a0 = lerp(w0, w1, i / 8), a1 = lerp(w0, w1, (i + 1) / 8);
    poly([[x - a0, y0], [x - a1, y1], [x + a1, y1], [x + a0, y0]], { wash: i % 2 ? CH.white : CH.red, washA: 1, w: 1.6, col: L }); }
  for (const k of [0.3, 0.6, 0.9]) pencil([[x - w0 * 1.4, base - h * k], [x + w0 * 1.4, base - h * k]], { w: 3, col: '#3a3a40', pass2: false });
  for (const d of [-1, 1]) { pencil([[x + d * w0 * 2.2, base], [x + d * w1 * 1.3, base - h * 0.92]], { w: 3, col: '#5a5a62', pass2: false }); for (let i = 1; i < 7; i++) pencil([[x + d * lerp(w0 * 2.2, w1 * 1.3, i / 7), base - h * i / 7], [x + d * lerp(w0 * 2.2, w1 * 1.3, (i + 1) / 7) * 0.5, base - h * (i + 1) / 7]], { w: 1.4, col: '#5a5a62', a: 0.7, pass2: false }); }
  if (o.lamp) glow(x, base - h, 14, 'rgba(255,60,40,1)', 0.6 * (0.5 + 0.5 * Math.sin(t * 4)));
}
function nppBlock(x, base, s, t, o = {}) {                              // энергоблок РБМК: реакторное здание, деаэраторная этажерка, машзал, труба
  push(x, base, s); const L = CH.ink, c = o.col || CH.concrete;
  rect(-520, -230, 640, 230, { wash: lerpC(c, '#ffffff', 0.1), washA: 1, w: 2.4, col: L, shade: { gap: 14, a: 0.1, col: CH.concD, ang: 1.5 } });          // машзал
  for (let i = 0; i < 10; i++) rect(-500 + i * 62, -200, 40, 140, { wash: o.lit ? '#ffe0a0' : '#7a9aaa', washA: 0.9, w: 1, col: L, a: 0.7 });
  rect(80, -400, 300, 400, { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.12, col: CH.concD, ang: 1.5 } });                                  // реакторное отделение
  for (let i = 0; i < 6; i++) pencil([[80, -380 + i * 64], [380, -380 + i * 64]], { w: 1.6, col: CH.concD, a: 0.5, pass2: false });
  rect(380, -320, 160, 320, { wash: lerpC(c, '#000000', 0.08), washA: 1, w: 2.2, col: L });
  if (o.num) txt(o.num, 230, -300, 60, { col: '#5a5a60', font: 'Osw' });
  if (o.stack !== false) ventStack(260, -400, 380, t, { lamp: o.lamp });
  pop();
}
function sarcophagus(x, base, s, t, o = {}) {                            // «Укрытие» 1986: ступенчатые бетонные стены, контрфорсы, балки
  push(x, base, s); const L = CH.ink;
  poly([[-340, 0], [-340, -260], [-200, -300], [-200, -420], [200, -420], [260, -380], [340, -380], [340, 0]], { wash: '#8a8a86', washA: 1, w: 2.6, col: L, shade: { gap: 12, a: 0.18, col: '#3a3a38', ang: 1.5 } });
  for (let i = 0; i < 5; i++) poly([[-340 + i * 60, 0], [-340 + i * 60, -240 + i * 6], [-310 + i * 60, -250], [-310 + i * 60, 0]], { wash: '#9a9a96', washA: 1, w: 1.4, col: L });
  for (let i = 0; i < 8; i++) pencil([[-200 + i * 50, -420], [-200 + i * 50, -360]], { w: 2, col: '#4a4a48', pass2: false });
  pop();
}
function archNSC(x, base, s, t, o = {}) {                               // Новый безопасный конфайнмент: стальная арка с решёткой и торцевой стеной
  push(x, base, s); const L = CH.ink, R = 520, H = 470;
  const outer = []; for (let i = 0; i <= 30; i++) { const a = Math.PI * i / 30; outer.push([-Math.cos(a) * R, -Math.sin(a) * H]); }
  const inner = outer.map(([px, py]) => [px * 0.9, py * 0.86]);
  shape(outer.concat([[R, 0], [-R, 0]]), { wash: o.col || '#c8d2da', washA: 1, w: 3, col: L });
  for (let i = 1; i < 12; i++) { const a = Math.PI * i / 12; pencil([[-Math.cos(a) * R, -Math.sin(a) * H], [-Math.cos(a) * R * 0.9, -Math.sin(a) * H * 0.86]], { w: 2, col: '#6a7884', pass2: false }); }
  for (let i = 0; i < 26; i += 2) pencil([outer[i], inner[i + 2] || inner[i]], { w: 1.4, col: '#6a7884', a: 0.6, pass2: false });
  for (let k = 0; k < 6; k++) { const pts = outer.map(([px, py]) => [px * (0.88 - k * 0.12), py * (0.84 - k * 0.12)]); pencil(pts, { w: 1.6, col: '#8a98a4', a: 0.7, pass2: false, gap: false }); }
  const g = ctx.createLinearGradient(-R, -H, R, 0); g.addColorStop(0, 'rgba(255,255,255,0.35)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(20,30,40,0.3)'); ctx.save(); ctx.fillStyle = g; ctx.beginPath(); outer.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); ctx.fill(); ctx.restore();
  if (o.hole) { const hx = o.hole[0], hy = o.hole[1]; blob([[hx - 40, hy], [hx - 20, hy - 30], [hx + 30, hy - 24], [hx + 44, hy + 6], [hx + 6, hy + 24]], { wash: '#1a1410', washA: 1, w: 3, col: L }); }
  pop();
}

// ---------- транспорт, люди, животные
function bus(x, y, s, t, o = {}) {                                      // автобус 80-х (ЛАЗ/Икарус): окна, дверь, номер, фары
  push(x, y, s, 0, o.flip || 1); const L = CH.ink, c = o.col || '#e8c040';
  rect(-260, -190, 520, 160, { wash: c, washA: 1, w: 2.6, col: L }); rect(-260, -80, 520, 30, { wash: o.stripe || '#c8281e', washA: 1, w: 1.4, col: L });
  for (let i = 0; i < 6; i++) rect(-240 + i * 74, -176, 62, 66, { wash: '#a8c8d8', washA: 1, w: 1.6, col: L }); rect(200, -176, 50, 140, { wash: '#7a9ab0', washA: 1, w: 1.6, col: L });
  if (o.faces) for (let i = 0; i < 5; i++) ell(-210 + i * 74, -134, 14, 16, { wash: '#e2b48e', washA: 1, w: 1.2, col: L });
  for (const k of [-160, 160]) { ell(k, -28, 36, 36, { wash: '#1e1e22', washA: 1, w: 2, col: L }); ell(k, -28, 14, 14, { wash: '#9a9aa0', washA: 1, w: 1.4, col: L }); }
  ell(254, -58, 9, 9, { wash: '#fff6d0', washA: 1, w: 1, col: L }); if (o.num) txt(o.num, 0, -44, 22, { col: '#1a1a1a', font: 'Osw' });
  pop();
}
function horse(x, y, s, t, o = {}) {                                   // лошадь Пржевальского: буланое тело, стоячая тёмная грива, светлая морда, тёмные ноги
  push(x, y, s, 0, o.flip || 1); const L = CH.ink, c = o.col || '#c89a5a', ph = t * (o.walk ? 6 : 0) + (o.seed || 0);
  for (const [lx, d] of [[-70, 0], [-46, 1], [60, 1], [84, 0]]) { const sw = Math.sin(ph + d * 3) * 10; pencil([[lx, -90], [lx + sw, -40], [lx + sw * 0.5, 0]], { w: 12, col: '#3a2a1e', pass2: false }); }
  blob([[-100, -110], [-80, -160], [40, -166], [110, -150], [116, -100], [80, -80], [-60, -78], [-100, -90]], { wash: c, washA: 1, w: 2.4, col: L });
  blob([[96, -150], [126, -210], [150, -232], [176, -214], [170, -190], [140, -160], [116, -120]], { wash: c, washA: 1, w: 2.2, col: L });
  ell(166, -206, 20, 16, { wash: '#efe0c0', washA: 1, w: 1.6, col: L }); ell(150, -226, 3, 3, { wash: L, washA: 1, line: false });
  for (let i = 0; i < 9; i++) pencil([[104 + i * 6, -156 - i * 9], [100 + i * 6, -174 - i * 9]], { w: 5, col: '#2a1e14', pass2: false });
  pencil([[-100, -120], [-124, -70 + Math.sin(t * 3 + (o.seed || 0)) * 10]], { w: 9, col: '#2a1e14', pass2: false }); pencil([[-60, -96], [80, -96]], { w: 3, col: '#5a3a1a', a: 0.6, pass2: false });
  pop();
}
function dosimeter(x, y, s, t, o = {}) {                                // дозиметр: жёлтый корпус, стрелочная шкала, ручка
  push(x, y, s, o.rot || 0); const L = CH.ink; rect(-46, -70, 92, 120, { wash: CH.dos, washA: 1, w: 2.4, col: L }); rect(-36, -60, 72, 50, { wash: '#f6f2e0', washA: 1, w: 1.6, col: L });
  const n = o.needle ?? (Math.sin(t * 7) * 0.15 - 0.4); pencil([[0, -14], [Math.sin(n) * 34, -14 - Math.cos(n) * 34]], { w: 2.4, col: CH.red, pass2: false });
  for (let i = 0; i < 7; i++) { const a = -0.9 + i * 0.3; pencil([[Math.sin(a) * 30, -14 - Math.cos(a) * 30], [Math.sin(a) * 36, -14 - Math.cos(a) * 36]], { w: 1.4, col: L, pass2: false }); }
  ell(-20, 26, 9, 9, { wash: '#3a3a40', washA: 1, w: 1.2, col: L }); ell(20, 26, 9, 9, { wash: o.blink && Math.sin(t * 20) > 0 ? '#ff4a2a' : '#5a1a10', washA: 1, w: 1.2, col: L }); pop();
}
function chBoard(x, y, s, t, t0, rows, o = {}) {                         // табло/плашка с цифрами (инфографика)
  const k = popK(t, t0, 0.3); if (k <= 0) return; push(x, y, s * k, o.rot ?? -0.02); const w = o.w || 520, h = 70 + rows.length * 70;
  ctx.save(); ctx.fillStyle = o.bg || 'rgba(16,14,12,0.9)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || CH.dos, pass2: false, gap: false });
  rows.forEach(([s1, size, col], i) => txt(s1, 0, -h / 2 + 70 + i * 70, size || 50, { col: col || '#fff6e0', font: 'Osw' })); pop();
}

// ---------- отмотка 033: стрелка дозиметра закручивает шкалу в воронку-циферблат
function wTunnelCH(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel);
  lay(30, () => scr(() => { ctx.fillStyle = '#16120a'; ctx.fillRect(0, 0, W, H); const cx = 540, cy = 980, rot = -sm(clamp(p)) * 9;
    for (let i = 14; i >= 0; i--) { const R = 90 + i * 110 * (1 + p * 0.6), c = i % 2 ? CH.dos : '#f6f0d8'; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot * (1 - i / 16)); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.fill();
      ctx.strokeStyle = '#2a2010'; ctx.lineWidth = 3; for (let q = 0; q < 24; q++) { const a = q / 24 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * 0.92, Math.sin(a) * R * 0.92); ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R); ctx.stroke(); }
      if (i % 3 === 0) { ctx.fillStyle = '#2a2010'; ctx.font = '600 34px Osw'; ctx.textAlign = 'center'; for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283 + i; ctx.fillText(String((i * 7 + q * 13) % 100), Math.cos(a) * R * 0.85, Math.sin(a) * R * 0.85); } } ctx.restore(); }
    trefoil(cx, cy, 70 + p * 40, '#16120c', CH.dos, 1);
    const na = p * 26; pencil([[cx, cy], [cx + Math.sin(na) * 900, cy - Math.cos(na) * 900]], { w: 16, col: CH.red, pass2: false, gap: false });
    const r = rng(hsh(FRAME, 4990)); for (let i = 0; i < 40; i++) { const a = r() * 6.283, d = 200 + r() * 700; ctx.fillStyle = `rgba(255,240,160,${0.5 * r()})`; ctx.fillRect(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 4, 4); }
  }));
  lay(1, () => cat());
  scr(() => { if (p > 0.82) { const k = (p - 0.82) / 0.18; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#fff8e0'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
}
WORLD.tunnel = wTunnelCH;
DIR.tunnel = { outfit: 'hoodieCH', light: { side: 1, rim: '#ffe86a' }, grade: ['#2a2008', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.7, 'awe']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.7)), sc = 0.95 + 0.06 * sm(clamp(p / 0.7));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [170, -340], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };
