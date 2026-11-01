/* =====================================================================
   感恩节的图：快手买一买里掉下来的东西（宽高 100）
   ART.items['火鸡'] … 名字要跟 words.js 的 zh 一模一样
   ART.pic('南瓜糕')   市场算一算用：南瓜糕画成一整个派，其他的跟 items 一样
   画风：Q 版、平涂、粗黑线
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const svg = g => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
  const plate = (cy = 80, rx = 42) => `<ellipse cx="50" cy="${cy}" rx="${rx}" ry="${rx * 0.28}" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="${cy - 1}" rx="${rx * 0.72}" ry="${rx * 0.17}" fill="none" stroke="#D6DADF" stroke-width="2.5"/>`;

  const items = {
    // 火鸡：烤好的火鸡放在盘子上，两只腿套着白色纸花
    '火鸡': svg(plate(82) +
      `<path d="M18 66 C14 44 34 30 54 32 C74 34 88 46 84 64 C82 74 70 78 50 78 C30 78 20 74 18 66 Z" fill="#C9772F" ${sw()}/>` +
      `<path d="M30 48 C40 40 56 38 68 44" fill="none" stroke="#E9A15A" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M62 60 C70 52 80 50 84 40" fill="none" stroke="#9A5420" stroke-width="13" stroke-linecap="round"/>` +
      `<path d="M62 60 C70 52 80 50 84 40" fill="none" stroke="#B5652A" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M36 60 C30 52 22 50 16 40" fill="none" stroke="#9A5420" stroke-width="13" stroke-linecap="round"/>` +
      `<path d="M36 60 C30 52 22 50 16 40" fill="none" stroke="#B5652A" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M80 40 L88 32 M84 44 L92 36" ${sw(3)}/><circle cx="88" cy="35" r="6" fill="#FFFFFF" ${sw(3)}/>` +
      `<path d="M20 40 L12 32 M16 44 L8 36" ${sw(3)}/><circle cx="12" cy="35" r="6" fill="#FFFFFF" ${sw(3)}/>`),

    // 南瓜糕：一片南瓜派，上面一团鲜奶油
    '南瓜糕': svg(
      `<path d="M14 72 L86 72 L58 22 Z" fill="#F28C3A" ${sw()}/>` +
      `<path d="M58 22 L86 72 L86 80 L56 30 Z" fill="#E07A28" ${sw(3)}/>` +
      `<path d="M14 72 L86 72 L86 82 L14 82 Z" fill="#E3B26A" ${sw()}/>` +
      `<path d="M18 77 L28 77 M36 77 L46 77 M54 77 L64 77 M72 77 L82 77" stroke="#C98A4A" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M44 56 C38 56 38 48 44 47 C44 40 54 38 56 44 C62 42 66 50 60 54 C62 58 58 60 54 58 C52 62 46 60 44 56 Z" fill="#FFFFFF" ${sw(3)}/>`),

    // 玉米：黄色的玉米，两边绿色的叶子
    '玉米': svg(
      `<path d="M50 90 C30 82 22 60 26 40 C34 56 42 66 50 72 Z" fill="#7CB860" ${sw()}/>` +
      `<path d="M50 90 C70 82 78 60 74 40 C66 56 58 66 50 72 Z" fill="#5E9B4C" ${sw()}/>` +
      `<path d="M50 10 C64 10 66 30 64 50 C62 66 56 76 50 78 C44 76 38 66 36 50 C34 30 36 10 50 10 Z" fill="#F5C531" ${sw()}/>` +
      `<path d="M42 20 L42 70 M50 13 L50 76 M58 20 L58 70" stroke="#D99A1E" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M38 28 L62 28 M37 38 L63 38 M37 48 L63 48 M38 58 L62 58 M41 67 L59 67" stroke="#D99A1E" stroke-width="2.5" stroke-linecap="round"/>`),

    // 马铃薯：圆圆的浅咖啡色，上面有小芽眼
    '马铃薯': svg(
      `<path d="M16 54 C14 34 34 22 54 24 C76 26 88 40 86 58 C84 74 68 82 48 80 C28 78 18 70 16 54 Z" fill="#D9A866" ${sw()}/>` +
      `<path d="M26 50 C28 40 38 34 48 34" fill="none" stroke="#EBC48A" stroke-width="5" stroke-linecap="round"/>` +
      `<g fill="#9A6B34"><circle cx="38" cy="58" r="3"/><circle cx="60" cy="42" r="3"/><circle cx="68" cy="62" r="3"/><circle cx="50" cy="68" r="2.5"/><circle cx="30" cy="44" r="2.5"/></g>`),

    // 苹果：红苹果，一片叶子
    '苹果': svg(
      `<path d="M50 30 C36 20 16 26 16 50 C16 72 32 90 50 84 C68 90 84 72 84 50 C84 26 64 20 50 30 Z" fill="#E63946" ${sw()}/>` +
      `<path d="M30 46 C30 38 36 34 42 34" fill="none" stroke="#F4A0A6" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M50 30 C50 22 52 16 56 10" fill="none" ${sw(4)}/>` +
      `<path d="M54 18 C62 8 76 10 78 16 C70 24 60 24 54 18 Z" fill="#7CB860" ${sw(3)}/>`),

    // 葡萄：一串紫色葡萄
    '葡萄': svg(
      `<path d="M50 20 C50 14 52 10 56 6" fill="none" ${sw(4)}/>` +
      `<path d="M52 16 C60 6 74 8 76 14 C68 22 58 22 52 16 Z" fill="#7CB860" ${sw(3)}/>` +
      [[32, 30], [50, 28], [68, 30], [40, 46], [60, 46], [30, 60], [50, 62], [70, 60], [40, 76], [60, 76], [50, 90]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#8A5BB0" ${sw(3)}/><circle cx="${x - 3}" cy="${y - 3}" r="2.5" fill="#C9A9E3"/>`).join('')),

    // 梨子：黄绿色的梨，一片叶子
    '梨子': svg(
      `<path d="M50 20 C40 20 38 32 38 40 C38 48 22 54 22 70 C22 84 36 90 50 90 C64 90 78 84 78 70 C78 54 62 48 62 40 C62 32 60 20 50 20 Z" fill="#C8D86A" ${sw()}/>` +
      `<path d="M34 66 C34 58 38 54 42 52" fill="none" stroke="#E6EFA8" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M50 20 C50 14 48 10 46 6" fill="none" ${sw(4)}/>` +
      `<path d="M50 14 C58 4 70 6 72 12 C64 20 56 20 50 14 Z" fill="#7CB860" ${sw(3)}/>`),

    // 胡萝卜：橘色的胡萝卜，上面绿色的叶子
    '胡萝卜': svg(
      `<path d="M48 26 C40 14 36 10 30 8 M50 26 C50 14 52 8 56 4 M52 26 C60 16 66 12 74 12" fill="none" stroke="#5E9B4C" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M48 26 C40 14 36 10 30 8 M50 26 C50 14 52 8 56 4 M52 26 C60 16 66 12 74 12" fill="none" stroke="#7CB860" stroke-width="3.5" stroke-linecap="round"/>` +
      `<path d="M34 30 C40 24 60 24 66 30 C68 36 58 66 52 90 C50 94 48 94 46 88 C40 66 30 38 34 30 Z" fill="#F28C3A" ${sw()}/>` +
      `<path d="M40 42 L48 42 M44 56 L54 56 M46 70 L52 70" stroke="#C9601E" stroke-width="3" stroke-linecap="round"/>`),

    // 火腿：粉红色的大火腿，有骨头，表面有格子纹
    '火腿': svg(plate(82) +
      `<path d="M12 62 C10 42 28 30 48 32 C64 34 74 44 74 56 C74 70 60 78 42 78 C24 78 14 72 12 62 Z" fill="#E8848A" ${sw()}/>` +
      `<path d="M24 44 L48 70 M36 38 L60 64 M50 36 L70 56 M18 56 L32 72 M24 70 L52 42 M18 60 L46 36 M36 76 L66 48" stroke="#C25A62" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M72 48 L84 38" stroke="${K}" stroke-width="11" stroke-linecap="round"/><path d="M72 48 L84 38" stroke="#FFF6E5" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="85" cy="31" r="5" fill="#FFF6E5" ${sw(3)}/><circle cx="90" cy="38" r="5" fill="#FFF6E5" ${sw(3)}/>`),

    // 肉汁：长长扁扁的白色酱汁船（左边是尖嘴，右边是把手），里面装满咖啡色的肉汁
    '肉汁': svg(plate(84, 40) +
      `<path d="M4 40 C14 48 30 50 52 50 C70 50 80 48 86 46 C84 62 72 72 50 72 C32 72 24 64 20 56 C14 52 8 48 4 40 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M50 72 L46 80 L62 80 L58 72" fill="#FFFFFF" ${sw(3)}/>` +
      `<path d="M84 50 C98 44 98 64 80 64" fill="none" ${sw(4)}/>` +
      `<path d="M6 41 C16 46 32 48 52 48 C68 48 80 47 85 45 C80 40 66 38 50 38 C32 38 16 38 6 41 Z" fill="#8A4F22" ${sw(3)}/>` +
      `<path d="M30 42 C38 40 46 40 52 41" fill="none" stroke="#B5743E" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M6 42 C4 48 5 54 8 57" fill="none" stroke="#8A4F22" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M66 62 L70 56 M58 66 L60 60" stroke="#D6DADF" stroke-width="3" stroke-linecap="round"/>`),

    // 红莓酱：一碗红色的蔓越莓酱，上面有几颗莓果
    '红莓酱': svg(
      `<path d="M12 50 L88 50 C86 72 70 86 50 86 C30 86 14 72 12 50 Z" fill="#7FC4D8" ${sw()}/>` +
      `<path d="M22 62 C30 70 44 72 52 72" fill="none" stroke="#B9E0EC" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="50" rx="38" ry="10" fill="#B7213A" ${sw()}/>` +
      `<path d="M24 48 C30 38 40 34 50 34 C60 34 70 38 76 48" fill="#C9283F" ${sw(3)}/>` +
      [[36, 38], [50, 32], [64, 38], [44, 44], [58, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#E63946" ${sw(2.5)}/><circle cx="${x - 2}" cy="${y - 2}" r="1.6" fill="#FFFFFF"/>`).join('')),

    // 番薯：长长的红紫色番薯，切开的那一头是橘色的
    '番薯': svg(
      `<path d="M10 62 C8 48 22 34 44 32 C62 30 80 36 86 46 L70 74 C58 80 40 82 26 78 C16 74 12 70 10 62 Z" fill="#A8466A" ${sw()}/>` +
      `<path d="M22 52 C30 42 42 40 52 40" fill="none" stroke="#C96A8C" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M30 62 L36 60 M46 66 L52 64 M56 48 L62 48" stroke="#7A2E4C" stroke-width="2.5" stroke-linecap="round"/>` +
      `<ellipse cx="80" cy="60" rx="10" ry="16" transform="rotate(30 80 60)" fill="#F28C3A" ${sw()}/>` +
      `<ellipse cx="80" cy="60" rx="5" ry="9" transform="rotate(30 80 60)" fill="#F5A04A"/>`)
  };

  // 一整个南瓜糕（市场算一算：数「几个南瓜糕」要用一整个，不是一片）
  const whole = {
    '南瓜糕': svg(
      `<ellipse cx="50" cy="60" rx="42" ry="24" fill="#E3B26A" ${sw()}/>` +
      `<path d="M8 56 L8 62 C8 76 92 76 92 62 L92 56" fill="#E3B26A" ${sw()}/>` +
      `<ellipse cx="50" cy="56" rx="42" ry="24" fill="#E3B26A" ${sw()}/>` +
      `<ellipse cx="50" cy="55" rx="34" ry="18" fill="#F28C3A" ${sw(3)}/>` +
      Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(50 + 38 * Math.cos(a)).toFixed(1)}" cy="${(56 + 21 * Math.sin(a)).toFixed(1)}" r="3" fill="#C98A4A"/>`; }).join('') +
      `<path d="M36 50 C30 50 30 43 36 42 C36 36 46 34 48 40 C54 38 58 46 52 49 C54 53 50 55 46 53 C44 57 38 55 36 50 Z" fill="#FFFFFF" ${sw(2.5)}/>` +
      `<path d="M62 60 L72 58 M58 64 L66 64" stroke="#E07A28" stroke-width="2.5" stroke-linecap="round"/>`)
  };
  // 画「几个」的时候用：有一整个的图就用一整个的，没有就用 items
  const pic = zh => whole[zh] || items[zh];

  window.ART = { items, whole, pic };
})();
