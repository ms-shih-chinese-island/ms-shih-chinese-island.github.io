/* =====================================================================
   水果的图（宽高 100）：快手摆一摆、图书馆都用这一份
   ART.fruit('苹果', '绿色')  → 一个水果的图（<g>，没有外面的 <svg>）；不写颜色就用本来的颜色
   ART.fruit('蓝莓', '蓝色', true) → 只画一颗（我想买的袋子里要一颗一颗数）
   ART.svg('苹果', '绿色')    → 包好 <svg> 的图
   ART.items['苹果']          → 图书馆用（本来的颜色）
   画风：Q 版、平涂、粗黑线
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  // 颜色：[主色, 深一点的颜色（纹路、阴影）]
  const HEX = {
    '红色': ['#E5483B', '#B8322A'], '绿色': ['#8CC63F', '#5E9B2C'], '黄色': ['#F5C531', '#D99A1E'],
    '紫色': ['#8E5CC2', '#5F3A8C'], '橙色': ['#F28C28', '#C96A12'], '蓝色': ['#4A6FD0', '#2F4C9E']
  };
  const LEAF = '#5FAE3E';
  const shine = (d, w = 5) => `<path d="${d}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="${w}" stroke-linecap="round"/>`;
  const leaf = (x, y, flip) => `<path d="M${x} ${y} C${x + (flip ? -7 : 7)} ${y - 10} ${x + (flip ? -19 : 19)} ${y - 10} ${x + (flip ? -23 : 23)} ${y - 6} C${x + (flip ? -17 : 17)} ${y + 2} ${x + (flip ? -7 : 7)} ${y + 4} ${x} ${y} Z" fill="${LEAF}" ${sw(3)}/>`;

  const DRAW = {
    // 苹果：圆圆的、上面凹一点，梗和一片叶子
    '苹果': (c, d) =>
      `<path d="M50 30 C40 22 16 24 15 49 C14 73 32 91 44 89 C48 88 52 88 56 89 C68 91 86 73 85 49 C84 24 60 22 50 30 Z" fill="${c}" ${sw()}/>` +
      shine('M27 50 C27 41 32 36 39 35') +
      `<path d="M50 31 C50 23 52 16 56 11" fill="none" ${sw(4)}/>` + leaf(53, 20),
    // 梨子：上小下大
    '梨子': (c, d) =>
      `<path d="M50 18 C43 18 41 27 41 35 C41 44 25 51 25 69 C25 85 38 93 50 93 C62 93 75 85 75 69 C75 51 59 44 59 35 C59 27 57 18 50 18 Z" fill="${c}" ${sw()}/>` +
      shine('M35 66 C35 58 39 53 43 51') +
      `<path d="M50 19 C50 14 51 10 54 6" fill="none" ${sw(4)}/>` + leaf(52, 13),
    // 橘子：圆的，上面一片叶子，几个小点
    '橘子': (c, d) =>
      `<circle cx="50" cy="57" r="33" fill="${c}" ${sw()}/>` +
      `<g fill="${d}"><circle cx="38" cy="66" r="1.8"/><circle cx="60" cy="72" r="1.8"/><circle cx="66" cy="54" r="1.8"/><circle cx="46" cy="78" r="1.8"/><circle cx="56" cy="44" r="1.8"/></g>` +
      shine('M28 52 C29 43 35 37 42 35') +
      `<circle cx="50" cy="25" r="3.5" fill="${LEAF}" ${sw(2.5)}/>` + leaf(51, 24),
    // 香蕉：一根弯弯的（梗在右上）
    '香蕉': (c, d) =>
      `<g transform="translate(100 0) scale(-1 1)"><path d="M20 22 C18 56 42 84 82 80 C88 79 90 72 85 70 C54 70 34 50 32 22 C32 16 20 15 20 22 Z" fill="${c}" ${sw()}/>` +
      `<path d="M27 28 C29 52 48 70 78 74" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M22 20 L23 11 L30 12 L31 21" fill="#7A5A32" ${sw(3)}/>` +
      `<circle cx="86" cy="75" r="3.5" fill="#5A4026" ${sw(2)}/></g>`,
    // 葡萄：一串
    '葡萄': (c, d) => {
      return `<path d="M50 27 C50 20 52 15 55 10" fill="none" ${sw(4)}/>` + leaf(53, 18) +
        [[31, 38], [50, 36], [69, 38], [31, 62], [69, 62], [40, 54], [60, 54], [50, 70], [41, 84], [59, 84]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}" ${sw(3)}/><circle cx="${x - 4}" cy="${y - 4}" r="2.6" fill="rgba(255,255,255,.6)"/>`).join('');
    },
    // 西瓜：一片（三角形），红色的果肉、黑色的籽、绿色的皮
    '西瓜': () =>
      `<path d="M50 18 L90 80 Q50 98 10 80 Z" fill="#4FA43A" ${sw()}/>` +
      `<path d="M50 18 L84 72 Q50 88 16 72 Z" fill="#F4F1D0"/>` +
      `<path d="M50 18 L80 66 Q50 81 20 66 Z" fill="#EF4B4B"/>` +
      `<path d="M50 18 L90 80 Q50 98 10 80 Z" fill="none" ${sw()}/>` +
      `<g fill="#2B2B2B">${[[50, 40], [40, 56], [60, 56], [30, 66], [50, 68], [70, 66]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" transform="rotate(${(x - 50) * .6} ${x} ${y})"/>`).join('')}</g>`,
    // 草莓：上面绿色的叶子、身上黄色的小籽
    '草莓': (c, d) =>
      `<path d="M50 92 C29 80 15 57 21 41 C25 31 39 30 50 34 C61 30 75 31 79 41 C85 57 71 80 50 92 Z" fill="${c}" ${sw()}/>` +
      `<g fill="#FFE38A">${[[36, 48], [50, 46], [64, 48], [30, 60], [43, 60], [57, 60], [70, 60], [37, 72], [50, 72], [63, 72], [44, 82], [56, 82]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="3"/>`).join('')}</g>` +
      `<path d="M30 37 L38 26 L45 33 L50 21 L55 33 L62 26 L70 37 C60 42 40 42 30 37 Z" fill="${LEAF}" ${sw(3)}/>`,
    // 菠萝：椭圆的身体、格子纹，头上一把叶子
    '菠萝': (c, d) =>
      `<path d="M50 37 L36 11 L46 26 L50 5 L54 26 L64 11 Z" fill="${LEAF}" ${sw(3)}/>` +
      `<ellipse cx="50" cy="65" rx="27" ry="29" fill="${c}" ${sw()}/>` +
      [[42, 48], [58, 48], [34, 62], [50, 62], [66, 62], [42, 76], [58, 76], [50, 88]].map(([x, y]) => `<path d="M${x - 5} ${y - 4} L${x} ${y + 2} L${x + 5} ${y - 4}" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('') +
      `<ellipse cx="50" cy="65" rx="27" ry="29" fill="none" ${sw()}/>`,
    // 桃子：粉粉橘橘的，中间一条线
    '桃子': () =>
      `<path d="M50 30 C34 24 16 36 18 58 C20 80 38 92 50 90 C62 92 80 80 82 58 C84 36 66 24 50 30 Z" fill="#F9B48A" ${sw()}/>` +
      `<path d="M50 30 C34 24 18 36 20 56 C40 60 48 46 50 30 Z" fill="#F4846E"/>` +
      `<path d="M50 30 C34 24 16 36 18 58 C20 80 38 92 50 90 C62 92 80 80 82 58 C84 36 66 24 50 30 Z" fill="none" ${sw()}/>` +
      `<path d="M50 32 C44 50 46 72 52 88" fill="none" stroke="#D9654E" stroke-width="3" stroke-linecap="round"/>` +
      leaf(51, 28),
    // 蓝莓：三颗，头上有小小的星星口
    '蓝莓': (c, d) =>
      [[50, 38], [33, 64], [67, 64]].map(([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="18" fill="${c}" ${sw()}/>` +
        `<path d="M${x - 5} ${y - 9} L${x} ${y - 5} L${x + 5} ${y - 9} M${x} ${y - 5} L${x} ${y - 11}" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="${x - 7}" cy="${y + 2}" r="3" fill="rgba(255,255,255,.5)"/>`).join('')
  };
  // 本来的颜色（Level 1 和图书馆用）
  const BASE = { '苹果': '红色', '梨子': '黄色', '橘子': '橙色', '香蕉': '黄色', '葡萄': '紫色', '西瓜': '绿色', '草莓': '红色', '菠萝': '黄色', '蓝莓': '蓝色' };

  // 一颗蓝莓（数数用）
  const ONE = {
    '蓝莓': (c, d) => `<circle cx="50" cy="56" r="34" fill="${c}" ${sw()}/>` +
      `<path d="M40 34 L50 42 L60 34 M50 42 L50 30" fill="none" stroke="${d}" stroke-width="4" stroke-linecap="round"/>` +
      `<circle cx="36" cy="62" r="6" fill="rgba(255,255,255,.5)"/>`
  };
  function fruit(zh, color, one) {
    const f = (one && ONE[zh]) || DRAW[zh];
    if (!f) return '';
    const key = color || BASE[zh];
    const [c, d] = HEX[key] || ['#CCCCCC', '#999999'];
    return `<g>${f(c, d)}</g>`;
  }
  const svg = (zh, color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fruit(zh, color)}</svg>`;

  const items = {};
  Object.keys(DRAW).forEach(z => { items[z] = svg(z); });
  // 水果：一小堆（苹果、橘子、香蕉）
  items['水果'] = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<g transform="translate(36 2) scale(.6)">${fruit('橘子')}</g><g transform="translate(2 8) scale(.62)">${fruit('苹果')}</g><g transform="translate(18 40) scale(.62)">${fruit('香蕉')}</g></svg>`;

  // 市场算一算用：一个一个数的图（蓝莓画一颗）
  const pic = zh => DRAW[zh] ? svg(zh, undefined, true) : '';

  window.ART = { fruit, svg, items, HEX, pic };
})();
