// 形容词的小图示（自我介绍、好朋友游戏共用）：window.ADJ_ICON('聪明') 回传一个 100×100 的图
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const box = (bg, g) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="${bg}"/>${g}</svg>`;
  const face = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${sw()}/><circle cx="${x - r * .35}" cy="${y - r * .1}" r="2.4" fill="${INK}"/><circle cx="${x + r * .35}" cy="${y - r * .1}" r="2.4" fill="${INK}"/>` +
    `<path d="M${x - r * .35} ${y + r * .3} Q${x} ${y + r * .6} ${x + r * .35} ${y + r * .3}" fill="none" ${sw(2.5)}/>`;
  const ICON = {
    // 聪明：亮亮的灯泡
    '聪明': () => box('#FFF6D6', [0, 45, 90, 135, 180, 225, 270].map(a => `<path d="M50 14 L50 6" transform="rotate(${a - 90} 50 40)" stroke="#E9A23B" stroke-width="4" stroke-linecap="round"/>`).join('') +
      `<path d="M50 20 Q72 20 72 42 Q72 54 62 62 L62 70 L38 70 L38 62 Q28 54 28 42 Q28 20 50 20 Z" fill="#F5C531" ${sw()}/>` +
      `<rect x="38" y="70" width="24" height="12" rx="3" fill="#B7BCC4" ${sw()}/><path d="M38 76 L62 76" ${sw(2)}/><path d="M44 86 L56 86" ${sw(4)}/>` +
      `<path d="M44 56 Q50 46 56 56" fill="none" stroke="#E9A23B" stroke-width="3" stroke-linecap="round"/>`),
    // 勇敢：盾牌和星星
    '勇敢': () => box('#E3F0FB', `<path d="M50 14 L78 24 Q78 64 50 86 Q22 64 22 24 Z" fill="#E63946" ${sw()}/>` +
      `<path d="M50 22 L70 29 Q70 60 50 77 Q30 60 30 29 Z" fill="#5B9BD5" ${sw(2.5)}/>` +
      `<path d="M50 34 L54 45 L66 45 L56 52 L60 63 L50 56 L40 63 L44 52 L34 45 L46 45 Z" fill="#F5C531" ${sw(2.5)}/>`),
    // 漂亮：一朵花
    '漂亮': () => box('#FDEEF3', `<path d="M50 60 L50 88" stroke="#5E9B4C" stroke-width="5" stroke-linecap="round"/><path d="M50 78 Q36 70 32 78 Q40 86 50 80 Z" fill="#86BD72" ${sw(2.5)}/>` +
      [0, 72, 144, 216, 288].map(a => `<ellipse cx="50" cy="26" rx="11" ry="15" fill="#F7A8C4" ${sw(2.5)} transform="rotate(${a} 50 42)"/>`).join('') +
      `<circle cx="50" cy="42" r="10" fill="#F5C531" ${sw(2.5)}/>`),
    // 诚实：一颗心，上面打勾
    '诚实': () => box('#EEF7F1', `<path d="M50 84 Q14 60 16 36 Q18 18 34 18 Q46 18 50 30 Q54 18 66 18 Q82 18 84 36 Q86 60 50 84 Z" fill="#E63946" ${sw()}/>` +
      `<path d="M36 46 L46 56 L66 34" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`),
    // 幽默：笑到流眼泪的脸
    '幽默': () => box('#FFF6D6', `<circle cx="50" cy="52" r="32" fill="#F5C531" ${sw()}/>` +
      `<path d="M32 44 Q38 36 44 44 M56 44 Q62 36 68 44" fill="none" ${sw(3)}/>` +
      `<path d="M32 58 Q50 80 68 58 Z" fill="#B23B3B" ${sw(3)}/><path d="M42 68 Q50 74 58 68" fill="none" stroke="#F29BA6" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M24 48 Q16 58 22 64 Q28 62 26 52 Z M76 48 Q84 58 78 64 Q72 62 74 52 Z" fill="#7FC4D8" ${sw(2)}/>`),
    // 友善：两张笑脸，中间一颗小爱心
    '友善': () => box('#EEF7F1', face(32, 58, 18, '#F6D9B5') + face(68, 58, 18, '#FBDCC8') +
      `<path d="M50 34 Q40 26 42 20 Q44 15 50 19 Q56 15 58 20 Q60 26 50 34 Z" fill="#EC8FB3" ${sw(2.5)}/>`),
    // 可爱：熊猫
    '可爱': () => box('#FDEEF3', `<circle cx="27" cy="29" r="12" fill="${INK}"/><circle cx="73" cy="29" r="12" fill="${INK}"/>` +
      `<circle cx="50" cy="54" r="31" fill="#FFFFFF" ${sw()}/>` +
      `<ellipse cx="37" cy="51" rx="8" ry="10" fill="${INK}" transform="rotate(25 37 51)"/><ellipse cx="63" cy="51" rx="8" ry="10" fill="${INK}" transform="rotate(-25 63 51)"/>` +
      `<circle cx="38" cy="49" r="2.6" fill="#FFFFFF"/><circle cx="62" cy="49" r="2.6" fill="#FFFFFF"/>` +
      `<ellipse cx="50" cy="63" rx="5" ry="3.5" fill="${INK}"/><path d="M45 69 Q50 73 55 69" fill="none" ${sw(2)}/>` +
      `<circle cx="29" cy="66" r="4.5" fill="#F29BA6" opacity=".8"/><circle cx="71" cy="66" r="4.5" fill="#F29BA6" opacity=".8"/>`),
    // 勤劳：扫把，扫得亮晶晶
    '勤劳': () => box('#E3F0FB', `<path d="M66 12 L46 58" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M66 12 L46 58" fill="none" stroke="${INK}" stroke-width="1.5"/>` +
      `<path d="M40 54 L56 61 L50 86 L22 74 Z" fill="#F5C531" ${sw()}/><path d="M32 72 L40 62 M38 76 L46 64 M44 80 L50 67" ${sw(2)}/>` +
      `<path d="M72 64 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z M80 42 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z" fill="#F5C531" ${sw(1.8)}/>`),
    // 活跃：跑步的鞋子，后面有速度线
    '活跃': () => box('#FFF1D6', `<path d="M14 40 L30 40 M10 52 L28 52 M16 64 L30 64" stroke="#E9A23B" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M38 34 L52 34 Q56 46 66 50 L82 54 Q90 56 88 66 L36 66 Q32 50 38 34 Z" fill="#E63946" ${sw()}/>` +
      `<path d="M34 66 L90 66 L88 74 L36 74 Z" fill="#FFFFFF" ${sw()}/><path d="M54 42 L60 40 M58 48 L64 46" ${sw(2.5)}/>`)
  };
  // 好朋友：两块拼在一起的拼图（跟操场「好朋友」游戏里的一样）
  window.FRIEND_ICON = () => `<svg viewBox="-30 -20 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<path d="M0 -14 L-22 -14 L-22 14 L0 14 L0 7 Q7 9 7 0 Q7 -9 0 -7 Z" fill="#F5C531" ${sw()}/>` +
    `<g transform="scale(-1 1)"><path d="M0 -14 L-22 -14 L-22 14 L0 14 L0 7 Q-7 9 -7 0 Q-7 -9 0 -7 Z" fill="#7FC4D8" ${sw()}/></g></svg>`;
  window.ADJ_ICON = zh => (ICON[zh] ? ICON[zh]() : '');
  window.ADJ_ICON.list = Object.keys(ICON);
})();
