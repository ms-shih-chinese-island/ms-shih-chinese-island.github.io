/* =====================================================================
   中秋节的图：四格故事（后羿射日、嫦娥奔月）、故事里的人物
   ART.panel(1..4)  四格故事的图（宽 320、高 220）
   ART.who(name)    单独一个人物：'houyi' 'change' 'king' 'oldman' 'villager'
   ART.icon(name)   小知识答案的小图（宽高 100）
   ===================================================================== */
(function () {
  const INK = '#2B2B2B', SKIN = '#F6D9B5', CHEEK = '#F4A7B9';
  const sw = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  // a little chibi person standing at (0, 0) = feet. o: hair, hairColor, robe, robe2, face, front (extra things drawn on top)
  function chibi(o) {
    const hc = o.hairColor || '#2E2838', robe = o.robe || '#7FC4D8', robe2 = o.robe2 || robe;
    let g = '';
    // hair behind the head
    if (o.hair === 'long') g += `<path d="M-28 -84 Q-30 -110 0 -112 Q30 -110 28 -84 L30 -44 Q20 -38 14 -46 L-14 -46 Q-20 -38 -30 -44 Z" fill="${hc}" ${sw()}/>`;
    // body: a robe with wide sleeves
    g += `<path d="M-16 -52 Q0 -58 16 -52 L26 0 L-26 0 Z" fill="${robe}" ${sw()}/>`;
    g += `<path d="M-16 -50 L-30 -22 L-20 -18 L-12 -34 Z" fill="${robe2}" ${sw(2.5)}/><path d="M16 -50 L30 -22 L20 -18 L12 -34 Z" fill="${robe2}" ${sw(2.5)}/>`;
    g += `<path d="M0 -55 L0 -2" stroke="${INK}" stroke-width="2" opacity=".35"/>`;
    if (!o.noHands) g += `<circle cx="-25" cy="-18" r="5.5" fill="${SKIN}" ${sw(2.5)}/><circle cx="25" cy="-18" r="5.5" fill="${SKIN}" ${sw(2.5)}/>`;   // noHands: the hands are drawn somewhere else (e.g. holding a bow)
    // head
    g += `<circle cx="0" cy="-80" r="26" fill="${SKIN}" ${sw()}/>`;
    // face
    const f = o.face || 'smile';
    if (f === 'sweat') g += `<circle cx="-9" cy="-80" r="2.8" fill="${INK}"/><circle cx="9" cy="-80" r="2.8" fill="${INK}"/><ellipse cx="0" cy="-68" rx="4" ry="5" fill="#B23B3B" ${sw(2)}/>`;
    else if (f === 'focus') g += `<path d="M-13 -82 L-5 -80 M13 -82 L5 -80" ${sw(2.5)}/><path d="M-6 -68 L6 -68" ${sw(2.5)}/>`;
    else if (f === 'happy') g += `<path d="M-13 -80 Q-9 -85 -5 -80 M5 -80 Q9 -85 13 -80" fill="none" ${sw(2.5)}/><path d="M-7 -71 Q0 -63 7 -71 Z" fill="#B23B3B" ${sw(2)}/>`;
    else g += `<circle cx="-9" cy="-80" r="2.8" fill="${INK}"/><circle cx="9" cy="-80" r="2.8" fill="${INK}"/><path d="M-6 -70 Q0 -65 6 -70" fill="none" ${sw(2.5)}/>`;
    g += `<circle cx="-15" cy="-72" r="4" fill="${CHEEK}" opacity=".8"/><circle cx="15" cy="-72" r="4" fill="${CHEEK}" opacity=".8"/>`;
    // hair on top
    if (o.hair === 'short') g += `<path d="M-26 -84 Q-26 -108 0 -108 Q26 -108 26 -84 Q18 -96 0 -94 Q-18 -96 -26 -84 Z" fill="${hc}" ${sw()}/>`;
    if (o.hair === 'long' || o.hair === 'bun') g += `<path d="M-26 -82 Q-24 -108 0 -108 Q24 -108 26 -82 Q16 -98 4 -96 Q-12 -98 -26 -82 Z" fill="${hc}" ${sw()}/>`;
    if (o.hair === 'bun') g += `<circle cx="0" cy="-112" r="11" fill="${hc}" ${sw()}/><path d="M-14 -116 L14 -108" stroke="#F5C531" stroke-width="3" stroke-linecap="round"/>`;
    if (o.hair === 'bald') g += `<path d="M-26 -78 Q-30 -88 -22 -92 M26 -78 Q30 -88 22 -92" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/><path d="M-26 -78 Q-30 -88 -22 -92 M26 -78 Q30 -88 22 -92" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    return g + (o.front || '');
  }
  const at = (x, y, s, inner, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${inner}</g>`;

  // the people in the story
  const P = {
    houyi: o => chibi(Object.assign({ hair: 'short', robe: '#8A6B4E', robe2: '#6E5238',
      front: `<path d="M-24 -96 L24 -96" stroke="#D9603B" stroke-width="6" stroke-linecap="round"/><path d="M22 -96 L32 -88" stroke="#D9603B" stroke-width="4" stroke-linecap="round"/>` }, o)),
    king: o => chibi(Object.assign({ hair: 'short', robe: '#F5C531', robe2: '#E2A72E',
      front: o && o.crown === false ? '' : `<path d="M-18 -104 L-18 -118 L-9 -110 L0 -122 L9 -110 L18 -118 L18 -104 Z" fill="#F5C531" ${sw(2.5)}/><circle cx="0" cy="-114" r="2.5" fill="#D9603B"/>` }, o)),
    oldman: o => chibi(Object.assign({ hair: 'bald', robe: '#B7BCC4', robe2: '#9CA1AA',
      front: `<path d="M-14 -70 Q-16 -46 0 -40 Q16 -46 14 -70 Q8 -64 0 -66 Q-8 -64 -14 -70 Z" fill="#FFFFFF" ${sw(2.5)}/><path d="M-14 -88 L-5 -86 M14 -88 L5 -86" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>` }, o)),
    change: o => chibi(Object.assign({ hair: 'bun', robe: '#F7A8C4', robe2: '#EC8FB3', hairColor: '#2E2838',
      front: `<path d="M-30 -22 Q-50 -40 -40 -66 Q-34 -82 -46 -96" fill="none" stroke="#F5C531" stroke-width="5" stroke-linecap="round"/><path d="M30 -22 Q52 -6 46 18" fill="none" stroke="#F5C531" stroke-width="5" stroke-linecap="round"/>` }, o)),
    villager: o => chibi(Object.assign({ hair: 'short', robe: '#8CC7A0', robe2: '#6FAE85', hairColor: '#4A3424' }, o))
  };
  const sun = (x, y, r, face) => `<g transform="translate(${x} ${y})">` +
    [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 ${-r - 3} L0 ${-r - 9}" transform="rotate(${a})" stroke="#E9A23B" stroke-width="3" stroke-linecap="round"/>`).join('') +
    `<circle r="${r}" fill="#F5C531" ${sw(2.5)}/>` +
    (face === 'x' ? `<path d="M${-r * .45} ${-r * .25} l${r * .25} ${r * .25} m0 ${-r * .25} l${-r * .25} ${r * .25} M${r * .2} ${-r * .25} l${r * .25} ${r * .25} m0 ${-r * .25} l${-r * .25} ${r * .25}" stroke="${INK}" stroke-width="2"/>`
                  : `<circle cx="${-r * .35}" cy="${-r * .1}" r="1.8" fill="${INK}"/><circle cx="${r * .35}" cy="${-r * .1}" r="1.8" fill="${INK}"/><path d="M${-r * .3} ${r * .3} Q0 ${r * .55} ${r * .3} ${r * .3}" fill="none" stroke="${INK}" stroke-width="2"/>`) +
    `</g>`;
  const drop = (x, y) => `<path d="M${x} ${y - 6} Q${x + 5} ${y + 1} ${x + 4} ${y + 4} A4.5 4.5 0 0 1 ${x - 4} ${y + 4} Q${x - 5} ${y + 1} ${x} ${y - 6} Z" fill="#9FD3F2" stroke="${INK}" stroke-width="1.5"/>`;
  const bottle = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-6" y="-16" width="12" height="16" rx="4" fill="#E6F4F8" ${sw(2.5)}/><rect x="-3.5" y="-21" width="7" height="6" fill="#C98A4A" ${sw(2)}/><path d="M-4 -8 L4 -8" stroke="#8CC7A0" stroke-width="3"/></g>`;
  const crown = (x, y) => `<path transform="translate(${x} ${y})" d="M-10 0 L-10 -12 L-5 -6 L0 -14 L5 -6 L10 -12 L10 0 Z" fill="#F5C531" ${sw(2.5)}/>`;
  const frame = (bg, inner) => `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="pc"><rect x="3" y="3" width="314" height="214" rx="14"/></clipPath></defs>` +
    `<g clip-path="url(#pc)"><rect x="0" y="0" width="320" height="220" fill="${bg}"/>${inner}</g><rect x="3" y="3" width="314" height="214" rx="14" fill="none" ${sw(4)}/></svg>`;
  const ground = c => `<path d="M0 182 Q160 170 320 182 L320 220 L0 220 Z" fill="${c}" ${sw(3)}/>`;

  const PANELS = {
    // 1: ten suns, the villagers are hot and thirsty
    1: () => frame('#FFD8A8',
      [[28, 30], [80, 22], [132, 30], [184, 22], [236, 30], [288, 22], [54, 66], [110, 62], [214, 62], [270, 66]].map(([x, y]) => sun(x, y, 13)).join('') +
      ground('#E9C46A') +
      at(110, 196, .82, P.villager({ face: 'sweat' })) + drop(84, 112) + drop(136, 106) +
      at(205, 196, .82, P.villager({ face: 'sweat', robe: '#F2A65A', robe2: '#E08A3C', hairColor: '#2E2838' })) +
      `<g transform="translate(232 168)"><path d="M-8 -14 L8 -14 L6 8 L-6 8 Z" fill="#E6F4F8" ${sw(2.5)}/></g>` + drop(230, 104)),
    // 2: Hou Yi shoots the suns: 1, 2, 3, shoot!
    2: () => frame('#FFE3B8',
      // nine arrows fly toward nine suns (not hit yet); the tenth sun has no arrow
      [[140, 26], [184, 26], [228, 26], [272, 26], [162, 70], [206, 70], [250, 70], [294, 70], [190, 114]].map(([x, y]) => {
        const ux = .82, uy = -.57;                       // every arrow flies up and to the right
        const hx = x - ux * 18, hy = y - uy * 18, tx = hx - ux * 20, ty = hy - uy * 20;
        const px = -uy, py = ux;
        return sun(x, y, 9) +
          `<path d="M${tx} ${ty} L${hx} ${hy}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` +
          `<path d="M${hx + ux * 5} ${hy + uy * 5} L${hx - ux * 2 + px * 4} ${hy - uy * 2 + py * 4} L${hx - ux * 2 - px * 4} ${hy - uy * 2 - py * 4} Z" fill="${INK}"/>` +
          `<path d="M${tx} ${ty} l${-ux * 6 + px * 4} ${-uy * 6 + py * 4} M${tx} ${ty} l${-ux * 6 - px * 4} ${-uy * 6 - py * 4}" stroke="#E76F51" stroke-width="2.5" stroke-linecap="round"/>` +
          `<path d="M${tx - ux * 6} ${ty - uy * 6} l${-ux * 10} ${-uy * 10}" stroke="${INK}" stroke-width="1.5" stroke-dasharray="2 3" stroke-linecap="round"/>`;
      }).join('') +
      sun(278, 126, 14) +
      ground('#E9C46A') +
      `<path d="M100 136 Q126 170 100 204" fill="none" stroke="#8A5A2B" stroke-width="5" stroke-linecap="round"/><path d="M100 136 L100 204" stroke="${INK}" stroke-width="1.5"/>` +
      at(74, 196, .95, P.houyi({ face: "focus" }))),
    // 3: the king and the old man give gifts; Hou Yi says thank you
    3: () => frame('#E6F4F8',
      `<rect x="0" y="0" width="320" height="120" fill="#F6E7BE"/><path d="M40 0 L40 120 M280 0 L280 120" stroke="#C0533A" stroke-width="10"/>` +
      ground('#D9C27E') +
      at(70, 196, .8, P.king({ face: 'happy', crown: false })) + crown(91, 176) +
      at(250, 196, .8, P.oldman({})) + bottle(230, 178) +
      at(160, 198, .86, P.houyi({ face: 'happy' }))),
    // 4: Chang'e took the elixir and floats up to the moon: goodbye!
    4: () => frame('#2E3A66',
      [[30, 30], [80, 60], [140, 20], [210, 46], [300, 120], [24, 150], [180, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#FFF6D6"/>`).join('') +
      `<circle cx="252" cy="58" r="40" fill="#FFF6D6" ${sw(3)}/><circle cx="240" cy="46" r="6" fill="#F0E2B6"/><circle cx="264" cy="70" r="8" fill="#F0E2B6"/>` +
      `<path d="M0 196 Q160 186 320 196 L320 220 L0 220 Z" fill="#3E4E7A" ${sw(3)}/>` +
      `<path d="M120 196 Q130 160 150 150" fill="none" stroke="#FFF6D6" stroke-width="2" stroke-dasharray="3 6" opacity=".8"/>` +
      at(160, 150, .78, P.change({ face: 'happy' })) + bottle(186, 128))
  };

  // ---- small pictures for the quiz answers (100 × 100) ----
  const box = (bg, inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    (bg ? `<rect x="3" y="3" width="94" height="94" rx="16" fill="${bg}"/>` : '') + inner + `</svg>`;
  const mooncake = (x, y, r) => `<g transform="translate(${x} ${y}) scale(${r / 30})">` +
    Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(28 * Math.cos(a)).toFixed(1)}" cy="${(28 * Math.sin(a)).toFixed(1)}" r="7" fill="#D9963F" ${sw(2.5)}/>`; }).join('') +
    `<circle r="28" fill="#D9963F"/><circle r="18" fill="#E9B05A" ${sw(2)}/><path d="M-8 -8 L8 8 M8 -8 L-8 8 M0 -11 L0 11 M-11 0 L11 0" stroke="#B9782E" stroke-width="2.5" stroke-linecap="round"/></g>`;
  const lantern = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -40 L0 -26" ${sw(2.5)}/><rect x="-10" y="-28" width="20" height="6" rx="2" fill="#F5C531" ${sw(2.5)}/>` +
    `<ellipse cx="0" cy="-4" rx="24" ry="20" fill="#E63946" ${sw(3)}/><path d="M-12 -21 Q-20 -4 -12 13 M12 -21 Q20 -4 12 13 M0 -24 L0 16" fill="none" stroke="#B5222F" stroke-width="2"/>` +
    `<rect x="-10" y="14" width="20" height="6" rx="2" fill="#F5C531" ${sw(2.5)}/><path d="M-4 21 L-5 34 M0 21 L0 36 M4 21 L5 34" stroke="#F5C531" stroke-width="3" stroke-linecap="round"/></g>`;
  const head = (x, y, r, hair, look) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${SKIN}" ${sw(2.5)}/>` +
    `<path d="M${-r} ${-r * .15} Q${-r} ${-r * 1.05} 0 ${-r * 1.05} Q${r} ${-r * 1.05} ${r} ${-r * .15} Q${r * .6} ${-r * .6} 0 ${-r * .55} Q${-r * .6} ${-r * .6} ${-r} ${-r * .15} Z" fill="${hair}" ${sw(2.5)}/>` +
    `<circle cx="${-r * .35}" cy="${look ? -r * .1 : r * .1}" r="2.2" fill="${INK}"/><circle cx="${r * .35}" cy="${look ? -r * .1 : r * .1}" r="2.2" fill="${INK}"/>` +
    `<path d="M${-r * .25} ${r * .45} Q0 ${r * .65} ${r * .25} ${r * .45}" fill="none" ${sw(2)}/></g>`;
  const calendar = (top, big, extra) => box(null, `<rect x="16" y="18" width="68" height="70" rx="8" fill="#FFFFFF" ${sw(3)}/><path d="M16 38 L16 26 Q16 18 24 18 L76 18 Q84 18 84 26 L84 38 Z" fill="${top}" ${sw(3)}/>` +
    `<path d="M32 12 L32 24 M68 12 L68 24" ${sw(4)}/><text x="50" y="${extra ? 62 : 72}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="${extra ? 18 : 30}" fill="${INK}">${big}</text>` + (extra || ''));
  const miniSun = (x, y, r) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">` +
    [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 ${-r * 1.3} L0 ${-r * 1.65}" transform="rotate(${a})" stroke="#E9A23B" stroke-width="2" stroke-linecap="round"/>`).join('') +
    `<circle r="${r}" fill="#F5C531" ${sw(1.8)}/><circle cx="${-r * .35}" cy="${-r * .1}" r="1.1" fill="${INK}"/><circle cx="${r * .35}" cy="${-r * .1}" r="1.1" fill="${INK}"/></g>`;
  const suns = n => {
    if (n === 1) return box('#FFF1D6', sun(50, 50, 20));
    const rows = n === 3 ? [3] : n === 9 ? [3, 3, 3] : [4, 3, 3];
    const step = 24, r = 7;
    let g = '';
    rows.forEach((k, w) => { for (let c = 0; c < k; c++) g += miniSun(50 + (c - (k - 1) / 2) * step, 50 + (w - (rows.length - 1) / 2) * step, r); });
    return box('#FFF1D6', g);
  };
  const animal = (ears, color, nose) => box('#EEF7F1', ears +
    `<circle cx="50" cy="58" r="26" fill="${color}" ${sw(3)}/><circle cx="41" cy="55" r="3" fill="${INK}"/><circle cx="59" cy="55" r="3" fill="${INK}"/>` +
    `<circle cx="34" cy="64" r="4" fill="${CHEEK}" opacity=".8"/><circle cx="66" cy="64" r="4" fill="${CHEEK}" opacity=".8"/>` + nose);
  const ICONS = {
    mooncake: () => window.VOCAB_BOX ? VOCAB_BOX('月饼', '#FFF1D6') : box('#FFF1D6', mooncake(50, 52, 30)),
    turkey: () => box('#FFF1D6', ['#D9603B', '#F2A65A', '#F5C531', '#F2A65A', '#D9603B'].map((c, i) => `<ellipse cx="50" cy="34" rx="9" ry="24" fill="${c}" ${sw(2.5)} transform="rotate(${-60 + i * 30} 50 58)"/>`).join('') +
      `<ellipse cx="50" cy="64" rx="20" ry="18" fill="#8A5A2B" ${sw(3)}/><circle cx="50" cy="44" r="10" fill="#A0703F" ${sw(2.5)}/><path d="M48 46 L56 48 L48 51 Z" fill="#F5C531" ${sw(1.5)}/><path d="M47 50 Q45 58 49 58" fill="#E63946" ${sw(1.5)}/><circle cx="47" cy="42" r="1.8" fill="${INK}"/>`),
    candy: () => window.VOCAB_BOX ? VOCAB_BOX('糖果', '#FDEEF3') : box('#FDEEF3', `<path d="M30 50 L12 36 L14 64 Z M70 50 L88 36 L86 64 Z" fill="#7FC4D8" ${sw(3)}/><ellipse cx="50" cy="50" rx="22" ry="17" fill="#EC8FB3" ${sw(3)}/><path d="M38 40 Q50 50 40 62 M52 34 Q64 48 54 66" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`),
    lookmoon: () => box('#2E3A66', `<circle cx="66" cy="32" r="18" fill="#FFE27A" ${sw(3)}/><circle cx="24" cy="20" r="1.8" fill="#FFF6D6"/><circle cx="44" cy="12" r="1.8" fill="#FFF6D6"/><circle cx="88" cy="62" r="1.8" fill="#FFF6D6"/>` +
      `<path d="M14 100 Q16 78 34 78 Q52 78 54 100 Z" fill="#7FC4D8" ${sw(3)}/>` + head(34, 66, 14, '#2E2838', true) + `<path d="M40 52 L52 42" stroke="#FFF6D6" stroke-width="2" stroke-dasharray="2 4"/>`),
    lantern: () => box('#2E3A66', `<path d="M20 14 Q50 8 66 22" fill="none" stroke="#8A5A2B" stroke-width="4" stroke-linecap="round"/>` + `<circle cx="56" cy="60" r="30" fill="#F5C531" opacity=".25"/>` + lantern(56, 58, .95) +
      `<path d="M66 22 L56 18" stroke="#8A5A2B" stroke-width="3"/>`),
    reunion: () => box('#FFF1D6', head(24, 46, 12, '#2E2838') + head(42, 36, 12, '#8A5A2B') + head(60, 36, 11, '#2E2838') + head(78, 46, 12, '#B7BCC4') +
      `<ellipse cx="50" cy="72" rx="40" ry="16" fill="#C98A4A" ${sw(3)}/>` + mooncake(36, 70, 8) + mooncake(62, 70, 8)),
    carve: () => window.VOCAB_BOX ? VOCAB_BOX('南瓜灯', '#EFEAF8') : box('#EFEAF8', `<ellipse cx="50" cy="58" rx="32" ry="26" fill="#F28C3A" ${sw(3)}/><path d="M50 32 L53 20" ${sw(4)}/><path d="M36 50 l6 -8 l6 8 Z M52 50 l6 -8 l6 8 Z" fill="${INK}"/><path d="M34 62 Q50 76 66 62 Q50 68 34 62 Z" fill="${INK}"/>`),
    trickortreat: () => box('#EFEAF8', `<path d="M30 40 L70 40 L74 88 L26 88 Z" fill="#C98A4A" ${sw(3)}/><path d="M30 40 L34 46 L40 40 L46 46 L52 40 L58 46 L64 40 L70 46" fill="none" ${sw(2)}/>` +
      `<circle cx="40" cy="34" r="8" fill="#EC8FB3" ${sw(2.5)}/><circle cx="56" cy="30" r="8" fill="#7FC4D8" ${sw(2.5)}/><circle cx="64" cy="38" r="6" fill="#F5C531" ${sw(2.5)}/><text x="50" y="74" text-anchor="middle" font-family="Arial" font-weight="700" font-size="18" fill="${INK}">?</text>`),
    cal815: () => calendar('#E63946', '8 / 15', `<circle cx="50" cy="76" r="8" fill="#FFE27A" ${sw(2)}/>`),
    cal1031: () => calendar('#9B8BC4', '10 / 31', `<ellipse cx="50" cy="77" rx="10" ry="8" fill="#F28C3A" ${sw(2)}/>`),
    cal11: () => calendar('#7FC4D8', '1 / 1', `<path d="M50 70 l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1 Z" fill="#F5C531" ${sw(1.5)}/>`),
    moonRound: () => box('#2E3A66', `<circle cx="50" cy="50" r="30" fill="#FFE27A" ${sw(3)}/><circle cx="40" cy="42" r="5" fill="#F0D060"/><circle cx="60" cy="60" r="7" fill="#F0D060"/>`),
    moonCrescent: () => box('#2E3A66', `<circle cx="44" cy="52" r="28" fill="#FFE27A" ${sw(3)}/><circle cx="60" cy="42" r="24" fill="#2E3A66"/>`),
    moonSquare: () => box('#2E3A66', `<rect x="22" y="22" width="56" height="56" rx="4" fill="#FFE27A" ${sw(3)}/>`),
    elixir: () => box('#E6F4F8', `<g transform="translate(50 82) scale(2.6)"><rect x="-6" y="-16" width="12" height="16" rx="4" fill="#FFFFFF" ${sw(1.4)}/><rect x="-3.5" y="-21" width="7" height="6" fill="#C98A4A" ${sw(1.2)}/><path d="M-4 -8 L4 -8" stroke="#8CC7A0" stroke-width="2.5"/></g>` +
      `<path d="M78 22 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z M20 30 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z" fill="#F5C531" ${sw(1.5)}/>`),
    sun: () => box('#FFF1D6', sun(50, 50, 22)),
    moon: () => ICONS.moonRound(),
    star: () => box('#2E3A66', `<path d="M50 18 L59 40 L82 41 L64 56 L71 79 L50 66 L29 79 L36 56 L18 41 L41 40 Z" fill="#FFE27A" ${sw(3)}/>`),
    suns1: () => suns(1), suns3: () => suns(3), suns9: () => suns(9), suns10: () => suns(10),
    rabbit: () => animal(`<ellipse cx="38" cy="22" rx="8" ry="20" fill="#FFFFFF" ${sw(3)}/><ellipse cx="62" cy="22" rx="8" ry="20" fill="#FFFFFF" ${sw(3)}/><ellipse cx="38" cy="24" rx="3.5" ry="13" fill="#F7A8C4"/><ellipse cx="62" cy="24" rx="3.5" ry="13" fill="#F7A8C4"/>`, '#FFFFFF',
      `<path d="M47 62 L53 62 L50 66 Z" fill="#EC8FB3" ${sw(1.5)}/><path d="M50 66 L50 70 M50 70 Q46 73 43 70 M50 70 Q54 73 57 70" fill="none" ${sw(1.8)}/>`),
    cat: () => animal(`<path d="M28 46 L30 22 L46 36 Z M72 46 L70 22 L54 36 Z" fill="#F2A65A" ${sw(3)}/>`, '#F2A65A',
      `<path d="M47 62 L53 62 L50 66 Z" fill="#EC8FB3" ${sw(1.5)}/><path d="M30 64 L18 62 M30 68 L18 70 M70 64 L82 62 M70 68 L82 70" ${sw(1.5)}/>`),
    dog: () => animal(`<ellipse cx="26" cy="52" rx="9" ry="18" fill="#8A5A2B" ${sw(3)} transform="rotate(20 26 52)"/><ellipse cx="74" cy="52" rx="9" ry="18" fill="#8A5A2B" ${sw(3)} transform="rotate(-20 74 52)"/>`, '#E9C79A',
      `<ellipse cx="50" cy="66" rx="5" ry="4" fill="${INK}"/><path d="M45 72 Q50 76 55 72" fill="none" ${sw(1.8)}/>`)
  };

  window.ART = {
    panel: n => PANELS[n](),
    icon: name => ICONS[name](),
    who: (name, opts) => `<svg viewBox="-60 -140 120 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${P[name](opts || {})}</svg>`
  };
})();
