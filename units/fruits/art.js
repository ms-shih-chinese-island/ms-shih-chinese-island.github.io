/* =====================================================================
   水果、青菜的图（宽高 100）：快手摆一摆、超市买一买、超市算一算、图书馆都用这一份
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

  // 一颗象牙芒（台湾常见）：长长的、弯弯的，像象牙；梗那头比较粗，另一头弯成尖尖的；黄色，靠梗的地方带一点绿，背上一点橘红
  const mangoWhole = (c, d) =>
    `<path d="M18 26 C28 8 58 10 74 28 C90 46 94 70 87 88 C84 94 77 93 73 87 C62 76 40 76 26 64 C12 52 10 38 18 26 Z" fill="${c}" ${sw()}/>` +
    `<path d="M40 14 C56 16 70 26 78 40 C86 54 90 68 88 80 C82 62 72 46 58 32 C52 24 46 18 40 14 Z" fill="rgba(242,140,40,.45)"/>` +
    `<path d="M22 22 C26 16 32 14 38 14 C32 18 28 24 26 32 Z" fill="rgba(110,170,60,.6)"/>` +
    `<path d="M24 52 C36 64 54 70 68 78" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" opacity=".55"/>` +
    shine('M22 36 C22 28 26 22 32 19') +
    `<path d="M26 16 C24 12 24 8 27 4" fill="none" ${sw(4)}/>` + `<path d="M27 8 C34 0 48 0 54 3 C46 8 36 10 27 8 Z" fill="${LEAF}" ${sw(2.5)}/>`;

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
        `<circle cx="${x - 7}" cy="${y + 2}" r="3" fill="rgba(255,255,255,.5)"/>`).join(''),

    // ===== 新的水果 =====
    // 芒果：象牙芒（长长弯弯的）
    '芒果': (c, d) => mangoWhole(c, d),
    // 李子：圆圆的，中间一条凹线，上面短短的梗
    '李子': (c, d) =>
      `<path d="M50 28 C30 24 16 40 18 60 C20 80 36 92 50 90 C64 92 80 80 82 60 C84 40 70 24 50 28 Z" fill="${c}" ${sw()}/>` +
      `<path d="M50 30 C42 48 43 70 49 88" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/>` +
      shine('M28 56 C28 46 33 40 40 38') +
      `<path d="M50 29 C50 22 52 16 55 12" fill="none" ${sw(4)}/>` + leaf(53, 20),

    // ===== 青菜 =====
    // 番茄：扁扁的圆，上面一颗绿色的星星（蒂）
    '番茄': (c, d) =>
      `<path d="M50 30 C30 26 14 38 15 58 C16 78 32 90 50 90 C68 90 84 78 85 58 C86 38 70 26 50 30 Z" fill="${c}" ${sw()}/>` +
      shine('M26 54 C27 45 33 39 41 37') +
      `<path d="M50 34 L40 24 L46 34 L32 33 L46 39 L42 48 L50 40 L58 48 L54 39 L68 33 L54 34 L60 24 Z" fill="${LEAF}" ${sw(2.5)}/>` +
      `<path d="M50 34 C50 27 51 22 54 18" fill="none" ${sw(4)}/>`,
    // 青椒（灯笼椒）：方方胖胖，上面肩膀和下面都有几个鼓起来的瓣，深绿色、亮亮的；上面一根粗粗弯弯的梗
    '青椒': (c, d) => {
      if (c === '#8CC63F') { c = '#3E9E45'; d = '#256B2C'; }   // 青椒是深绿色
      return `<path d="M50 30 C46 24 38 22 32 26 C22 26 16 34 17 46 C16 62 20 78 30 88 C35 92 42 90 45 86 C47 90 53 90 55 86 C58 90 65 92 70 88 C80 78 84 62 83 46 C84 34 78 26 68 26 C62 22 54 24 50 30 Z" fill="${c}" ${sw()}/>` +
        `<path d="M35 32 C31 48 33 70 40 86 M65 32 C69 48 67 70 60 86 M50 34 C49 52 49 70 50 86" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/>` +
        shine('M24 50 C24 40 28 33 34 31') +
        `<path d="M38 30 C42 24 58 24 62 30 C58 34 42 34 38 30 Z" fill="#2E7A30" ${sw(2.8)}/>` +
        `<path d="M50 28 C49 20 52 13 60 9" fill="none" stroke="${K}" stroke-width="10" stroke-linecap="round"/><path d="M50 28 C49 20 52 13 60 9" fill="none" stroke="#5E9B2C" stroke-width="5" stroke-linecap="round"/>`;
    },
    // 茄子：长长弯弯的（台湾的茄子），左上角绿色的蒂
    '茄子': (c, d) =>
      `<path d="M24 28 C34 22 44 30 50 40 C61 57 79 65 86 77 C91 88 78 95 67 89 C50 80 34 64 25 48 C21 40 19 32 24 28 Z" fill="${c}" ${sw()}/>` +
      shine('M38 46 C46 58 56 66 66 72', 4) +
      `<path d="M16 34 C20 22 32 18 40 24 C36 28 34 34 36 40 C30 36 24 36 16 34 Z" fill="${LEAF}" ${sw(3)}/>` +
      `<path d="M24 24 C20 18 16 14 10 12" fill="none" stroke="#3F7F2A" stroke-width="6" stroke-linecap="round"/>`,
    // 胡萝卜：橙色的长锥形，上面三把绿色的叶子
    '胡萝卜': (c, d) =>
      `<path d="M40 22 C34 10 30 8 26 6 M50 22 C50 10 50 6 50 2 M60 22 C66 10 70 8 74 6" fill="none" stroke="${LEAF}" stroke-width="9" stroke-linecap="round"/>` +
      `<path d="M40 22 C34 10 30 8 26 6 M50 22 C50 10 50 6 50 2 M60 22 C66 10 70 8 74 6" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round" opacity=".35"/>` +
      `<path d="M33 24 C40 19 60 19 67 24 C67 48 58 76 51 95 C49 97 47 96 46 94 C40 74 33 48 33 24 Z" fill="${c}" ${sw()}/>` +
      `<path d="M38 38 L46 40 M56 50 L63 48 M41 60 L48 62 M53 74 L58 72" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/>`,
    // 玉米：黄色的一根，一格一格的玉米粒，两边绿色的叶子
    '玉米': (c, d) =>
      `<path d="M50 10 C62 10 68 30 68 52 C68 74 60 90 50 90 C40 90 32 74 32 52 C32 30 38 10 50 10 Z" fill="${c}" ${sw()}/>` +
      `<path d="M40 22 L60 22 M36 34 L64 34 M34 46 L66 46 M34 58 L66 58 M36 70 L64 70 M40 82 L60 82 M44 14 L42 88 M56 14 L58 88" fill="none" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M50 96 C30 86 20 66 22 44 C30 60 38 74 50 82 Z" fill="${LEAF}" ${sw(3)}/>` +
      `<path d="M50 96 C70 86 80 66 78 44 C70 60 62 74 50 82 Z" fill="#6DBA4A" ${sw(3)}/>`,
    // 马铃薯：土黄色、不太圆，几个小芽眼
    '马铃薯': () =>
      `<path d="M30 30 C46 18 76 24 84 44 C92 64 78 86 56 86 C34 88 14 76 16 56 C17 44 22 36 30 30 Z" fill="#D9A866" ${sw()}/>` +
      `<g fill="#9C6B35"><ellipse cx="38" cy="44" rx="3" ry="2"/><ellipse cx="62" cy="40" rx="3" ry="2"/><ellipse cx="70" cy="62" rx="3" ry="2"/><ellipse cx="44" cy="70" rx="3" ry="2"/><ellipse cx="28" cy="60" rx="2.5" ry="1.8"/></g>` +
      shine('M28 46 C30 40 35 35 41 33'),
    // 蘑菇：咖啡色的伞，白色的柄
    '蘑菇': () =>
      `<path d="M38 56 L36 86 C36 92 64 92 64 86 L62 56 Z" fill="#F4EBDD" ${sw()}/>` +
      `<path d="M12 58 C10 30 30 16 50 16 C70 16 90 30 88 58 C88 64 12 64 12 58 Z" fill="#B97A45" ${sw()}/>` +
      `<g fill="#F4EBDD"><circle cx="34" cy="38" r="6"/><circle cx="58" cy="30" r="5"/><circle cx="70" cy="46" r="4.5"/><circle cx="46" cy="50" r="3.5"/></g>` +
      shine('M24 46 C26 36 32 28 40 24'),
    // 生菜：一颗圆圆的、边边皱皱的叶子，里面浅一点
    '生菜': (c, d) =>
      `<path d="M50 14 C61 10 73 18 75 28 C87 31 93 45 87 56 C94 68 85 84 72 85 C64 94 36 94 28 85 C15 84 6 68 13 56 C7 45 13 31 25 28 C27 18 39 10 50 14 Z" fill="${c}" ${sw()}/>` +
      `<path d="M50 28 C64 28 73 42 71 57 C69 72 59 80 50 80 C41 80 31 72 29 57 C27 42 36 28 50 28 Z" fill="rgba(255,255,255,.35)" stroke="${d}" stroke-width="3"/>` +
      `<path d="M50 32 L50 78 M50 48 L40 40 M50 48 L60 40 M50 62 L38 54 M50 62 L62 54" fill="none" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>`,
    // 菠菜：一把，几片铲子形的叶子、长长的梗，用红色的绳子绑起来，下面粉红色的根
    '菠菜': (c, d) => {
      const lf = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 C-13 -7 -15 -28 0 -36 C15 -28 13 -7 0 0 Z" fill="${c}" ${sw(3)}/><path d="M0 -4 L0 -30" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/></g>`;
      return `<path d="M50 84 L30 52 M50 84 L42 46 M50 84 L58 46 M50 84 L70 52 M50 84 L50 42" fill="none" stroke="#9BCB6B" stroke-width="5" stroke-linecap="round"/>` +
        lf(30, 54, -30) + lf(70, 54, 30) + lf(41, 47, -12) + lf(59, 47, 12) + lf(50, 43, 0) +
        `<path d="M46 86 L44 96 M50 86 L50 97 M54 86 L56 96" fill="none" stroke="#E58AA0" stroke-width="4" stroke-linecap="round"/>` +
        `<rect x="40" y="72" width="20" height="10" rx="4" fill="#E5483B" ${sw(3)}/>`;
    },
    // 芥兰：一把，粗粗的浅绿色梗、宽宽的深绿叶子，上面小小的花苞
    '芥兰': (c, d) => {
      const lf = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 C-19 -6 -22 -36 -2 -44 C20 -40 20 -8 0 0 Z" fill="${c}" ${sw(3)}/><path d="M0 -3 L-1 -38" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/></g>`;
      return `<path d="M50 88 L32 52 M50 88 L50 30 M50 88 L68 52" fill="none" stroke="#B9DB8F" stroke-width="10" stroke-linecap="round"/>` +
        `<path d="M50 88 L32 52 M50 88 L50 30 M50 88 L68 52" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round" opacity=".3"/>` +
        lf(31, 56, -34) + lf(69, 56, 34) +
        `<g fill="#F2E27A" stroke="${K}" stroke-width="2"><circle cx="45" cy="26" r="4.5"/><circle cx="55" cy="26" r="4.5"/><circle cx="50" cy="18" r="4.5"/></g>` +
        `<rect x="40" y="74" width="20" height="10" rx="4" fill="#E5483B" ${sw(3)}/>`;
    },
    // 芹菜：一把浅绿色的长梗（有直的纹），上面一点叶子
    '芹菜': (c, d) => {
      const stalk = (x, r) => `<g transform="rotate(${r} 50 92)"><path d="M${x - 7} 92 L${x - 6} 34 C${x - 6} 28 ${x + 6} 28 ${x + 6} 34 L${x + 7} 92 Z" fill="#CDE6A8" ${sw(3)}/><path d="M${x - 2} 88 L${x - 2} 36 M${x + 2.5} 88 L${x + 2.5} 36" stroke="#9BC46B" stroke-width="2" stroke-linecap="round"/>` +
        `<g fill="${c}" ${sw(2.5)}><circle cx="${x - 6}" cy="28" r="7"/><circle cx="${x + 6}" cy="26" r="7"/><circle cx="${x}" cy="18" r="7"/></g></g>`;
      return stalk(36, -14) + stalk(64, 14) + stalk(50, 0);
    }
  };
  // 本来的颜色（Level 1 和图书馆用）
  const BASE = { '苹果': '红色', '梨子': '黄色', '橘子': '橙色', '香蕉': '黄色', '葡萄': '紫色', '西瓜': '绿色', '草莓': '红色', '菠萝': '黄色', '蓝莓': '蓝色',
    '芒果': '黄色', '李子': '紫色', '番茄': '红色', '青椒': '绿色', '茄子': '紫色', '胡萝卜': '橙色', '玉米': '黄色', '生菜': '绿色', '菠菜': '绿色', '芥兰': '绿色', '芹菜': '绿色' };

  // 一颗蓝莓（数数用）
  const ONE = {
    // 芒果：只画一颗完整的（数数用）
    '芒果': (c, d) => mangoWhole(c, d),
    // 一根芹菜（数「根」用）
    '芹菜': (c, d) => `<g transform="rotate(12 50 92)"><path d="M41 94 L42 30 C42 22 58 22 58 30 L59 94 Z" fill="#CDE6A8" ${sw()}/><path d="M47 90 L47 32 M53 90 L53 32" stroke="#9BC46B" stroke-width="2.5" stroke-linecap="round"/>` +
      `<g fill="${c}" ${sw(3)}><circle cx="40" cy="22" r="9"/><circle cx="60" cy="20" r="9"/><circle cx="50" cy="10" r="9"/></g></g>`,
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
  const svg = (zh, color, one) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fruit(zh, color, one)}</svg>`;

  const items = {};
  Object.keys(DRAW).forEach(z => { items[z] = svg(z); });
  // 水果：一小堆（苹果、橘子、香蕉）
  items['水果'] = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<g transform="translate(36 2) scale(.6)">${fruit('橘子')}</g><g transform="translate(2 8) scale(.62)">${fruit('苹果')}</g><g transform="translate(18 40) scale(.62)">${fruit('香蕉')}</g></svg>`;

  // 蔬菜：一小堆（胡萝卜、番茄、青椒）
  items['蔬菜'] = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<g transform="translate(2 4) scale(.62)">${fruit('胡萝卜')}</g><g transform="translate(38 6) scale(.6)">${fruit('青椒')}</g><g transform="translate(20 40) scale(.6)">${fruit('番茄')}</g></svg>`;

  // 市场算一算用：一个一个数的图（蓝莓画一颗）
  const pic = zh => DRAW[zh] ? svg(zh, undefined, true) : '';

  window.ART = { fruit, svg, items, HEX, pic };
})();
