// Q 版史老师：跟岛上的小人同一个画风（平涂颜色、粗黑线、大头）
window.SHIH_AVATAR = function (opts) {
  opts = opts || {};
  const INK = '#2B2B2B', SKIN = '#F4CDAE', HAIR = '#2E2838', HAIR2 = '#4A4058', TEE = '#9CCBEA', TEE2 = '#7DB2D6',
        JEANS = '#2F3E66', JEANS2 = '#26324F', SHOE = '#2E2838', CHEEK = '#F29BA6';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const wave = opts.wave !== false;
  let g = '';
  // hair, back part: shoulder length (ends at the shoulders)
  g += `<path d="M52 80 Q48 26 100 22 Q152 26 148 80 L152 128 Q140 136 128 128 L126 110 L74 110 L72 128 Q60 136 48 128 Z" fill="${HAIR}" ${sw()}/>`;
  // legs (jeans) and shoes
  g += `<path d="M76 182 L76 232 Q76 238 82 238 L94 238 Q99 238 99 232 L101 196 L103 232 Q103 238 108 238 L120 238 Q126 238 126 232 L126 182 Z" fill="${JEANS}" ${sw()}/>`;
  g += `<path d="M101 196 L101 186" stroke="${JEANS2}" stroke-width="2.5"/><path d="M84 200 L84 230 M118 200 L118 230" stroke="${JEANS2}" stroke-width="2" opacity=".7"/>`;
  g += `<path d="M72 240 Q72 230 86 230 Q100 230 100 240 L100 244 L72 244 Z" fill="${SHOE}" ${sw(3)}/><path d="M72 244 L100 244" stroke="#FFFFFF" stroke-width="3"/>`;
  g += `<path d="M102 240 Q102 230 116 230 Q130 230 130 240 L130 244 L102 244 Z" fill="${SHOE}" ${sw(3)}/><path d="M102 244 L130 244" stroke="#FFFFFF" stroke-width="3"/>`;
  g += `<path d="M76 245 L98 245 M104 245 L128 245" stroke="${INK}" stroke-width="3"/>`;
  // arms: drawn before the T-shirt, so the shirt covers the shoulders
  const arm = (sx, sy, hx, hy) =>
    `<path d="M${sx} ${sy} L${hx} ${hy}" stroke="${INK}" stroke-width="15" stroke-linecap="round"/>` +
    `<path d="M${sx} ${sy} L${hx} ${hy}" stroke="${SKIN}" stroke-width="9" stroke-linecap="round"/>` +
    `<circle cx="${hx}" cy="${hy}" r="8" fill="${SKIN}" ${sw(3)}/>`;
  g += arm(122, 142, 136, 170);
  if (wave) {
    g += arm(78, 144, 44, 118);
    g += `<path d="M28 104 Q23 112 27 120 M20 100 Q13 112 19 124" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>`;
  } else g += arm(78, 142, 64, 170);
  // neck, then T-shirt
  g += `<rect x="92" y="112" width="16" height="16" fill="${SKIN}" ${sw(3)}/>`;
  g += `<path d="M72 140 Q74 126 90 124 L110 124 Q126 126 128 140 L128 184 Q100 190 72 184 Z" fill="${TEE}" ${sw()}/>`;
  g += `<path d="M90 124 Q100 132 110 124" fill="none" stroke="${TEE2}" stroke-width="3"/>`;
  // neck and head: a round face
  g += `<circle cx="100" cy="80" r="42" fill="${SKIN}" ${sw()}/>`;
  // face: simple, like the island kids
  g += `<circle cx="85" cy="84" r="4.5" fill="${INK}"/><circle cx="115" cy="84" r="4.5" fill="${INK}"/>`;
  g += `<circle cx="74" cy="96" r="7" fill="${CHEEK}" opacity=".7"/><circle cx="126" cy="96" r="7" fill="${CHEEK}" opacity=".7"/>`;
  g += `<path d="M90 98 Q100 107 110 98" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
  // hair, front: side part, bangs swept to one side, locks down to the shoulders
  g += `<path d="M58 84 Q52 36 98 34 Q140 34 144 76 Q140 62 130 54 Q118 66 100 64 Q84 62 70 72 Q62 78 58 84 Z" fill="${HAIR}" ${sw()}/>`;
  g += `<path d="M58 82 Q54 106 60 126 Q66 130 70 124 Q66 104 66 92 Z" fill="${HAIR}" ${sw()}/>`;
  g += `<path d="M142 80 Q146 106 140 126 Q134 130 130 124 Q134 104 134 92 Z" fill="${HAIR}" ${sw()}/>`;
  const vb = opts.bust ? '10 10 180 160' : '0 0 200 260';
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ms. Shih">${g}</svg>`;
};
