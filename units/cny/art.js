/* =====================================================================
   春节的图（宽高 100）：十二生肖
   ZART.svg('老鼠')  → 包好 <svg> 的图
   ZART.g('老鼠')    → <g>（没有外面的 <svg>）
   ZART.order        → 十二生肖的顺序
   ZART.scarf('兔子', '#E5483B') → 戴领巾的生肖（猜灯谜）
   ZART.svg('红包')  → 春节的东西也一样：红包、饺子、鱼、桔子、鞭炮、舞龙舞狮
   画风：Q 版、平涂、粗黑线（跟餐厅一样）
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const PINK = '#F4A7B9';

  // 眼睛、腮红、嘴巴。y = 眼睛的高度，d = 两眼的距离（一半）
  const face = (y = 50, d = 10, mouth = 'smile', my = y + 12) =>
    `<circle cx="${50 - d}" cy="${y}" r="3.6" fill="${K}"/><circle cx="${50 + d}" cy="${y}" r="3.6" fill="${K}"/>` +
    `<circle cx="${51 - d}" cy="${y - 1.4}" r="1.2" fill="#FFFFFF"/><circle cx="${51 + d}" cy="${y - 1.4}" r="1.2" fill="#FFFFFF"/>` +
    `<ellipse cx="${50 - d - 7}" cy="${y + 7}" rx="5" ry="3.2" fill="${PINK}" opacity=".85"/><ellipse cx="${50 + d + 7}" cy="${y + 7}" rx="5" ry="3.2" fill="${PINK}" opacity=".85"/>` +
    (mouth === 'smile' ? `<path d="M45 ${my} Q50 ${my + 5} 55 ${my}" fill="none" ${sw(2.5)}/>` :
     mouth === 'w' ? `<path d="M43 ${my} Q46.5 ${my + 4} 50 ${my} Q53.5 ${my + 4} 57 ${my}" fill="none" ${sw(2.5)}/>` : '');
  // 小身体（坐着），露在头下面
  const body = (c, belly) =>
    `<ellipse cx="50" cy="84" rx="25" ry="15" fill="${c}" ${sw()}/>` +
    (belly ? `<ellipse cx="50" cy="88" rx="13" ry="9" fill="${belly}"/>` : '') +
    `<ellipse cx="38" cy="96" rx="7" ry="4" fill="${c}" ${sw(3)}/><ellipse cx="62" cy="96" rx="7" ry="4" fill="${c}" ${sw(3)}/>`;

  const DRAW = {
    老鼠: () => {
      const c = '#A9AEBF';
      return `<path d="M72 88 C90 88 94 72 86 64" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M72 88 C90 88 94 72 86 64" fill="none" stroke="#F4A7B9" stroke-width="3" stroke-linecap="round"/>` +
        body(c, '#D9DCE6') +
        `<circle cx="27" cy="28" r="15" fill="${c}" ${sw()}/><circle cx="27" cy="28" r="8" fill="${PINK}"/>` +
        `<circle cx="73" cy="28" r="15" fill="${c}" ${sw()}/><circle cx="73" cy="28" r="8" fill="${PINK}"/>` +
        `<ellipse cx="50" cy="52" rx="25" ry="23" fill="${c}" ${sw()}/>` + face(48, 10, 'w', 61) +
        `<ellipse cx="50" cy="57" rx="4" ry="3" fill="#EC6F8E" ${sw(2)}/>` +
        `<path d="M36 58 L22 55 M36 62 L22 64 M64 58 L78 55 M64 62 L78 64" ${sw(1.8)}/>`;
    },
    牛: () => {
      const c = '#3C3A3F';
      return body(c, '#FFFFFF') +
        `<path d="M28 30 C18 26 14 14 20 8 C22 18 28 22 34 24 Z" fill="#FFF3D6" ${sw(3)}/><path d="M72 30 C82 26 86 14 80 8 C78 18 72 22 66 24 Z" fill="#FFF3D6" ${sw(3)}/>` +
        `<ellipse cx="20" cy="42" rx="11" ry="6" fill="${c}" ${sw(3)} transform="rotate(-20 20 42)"/><ellipse cx="80" cy="42" rx="11" ry="6" fill="${c}" ${sw(3)} transform="rotate(20 80 42)"/>` +
        `<ellipse cx="50" cy="48" rx="25" ry="24" fill="${c}" ${sw()}/>` +
        `<path d="M40 26 Q50 22 60 26 Q58 38 50 38 Q42 38 40 26 Z" fill="#FFFFFF"/>` +
        `<circle cx="40" cy="46" r="6" fill="#FFFFFF" ${sw(2.5)}/><circle cx="60" cy="46" r="6" fill="#FFFFFF" ${sw(2.5)}/><circle cx="41" cy="46" r="3" fill="${K}"/><circle cx="59" cy="46" r="3" fill="${K}"/>` +
        `<ellipse cx="50" cy="62" rx="17" ry="11" fill="#F7C6CF" ${sw(3)}/><ellipse cx="44" cy="62" rx="2.5" ry="3.5" fill="${K}"/><ellipse cx="56" cy="62" rx="2.5" ry="3.5" fill="${K}"/>`;
    },
    老虎: () => {
      const c = '#F28C3A';
      return body(c, '#FFF6E8') +
        `<path d="M36 74 L40 82 M50 72 L50 80 M64 74 L60 82" ${sw(3)}/>` +
        `<circle cx="28" cy="30" r="10" fill="${c}" ${sw()}/><circle cx="28" cy="30" r="4.5" fill="#FFF6E8"/>` +
        `<circle cx="72" cy="30" r="10" fill="${c}" ${sw()}/><circle cx="72" cy="30" r="4.5" fill="#FFF6E8"/>` +
        `<ellipse cx="50" cy="50" rx="27" ry="24" fill="${c}" ${sw()}/>` +
        `<path d="M43 30 L57 30 M44 35 L56 35 M50 30 L50 40 M43 40 L57 40" ${sw(3)}/>` +
        `<path d="M23 46 L31 48 M23 54 L31 54 M77 46 L69 48 M77 54 L69 54" ${sw(3)}/>` +
        `<ellipse cx="50" cy="61" rx="13" ry="9" fill="#FFF6E8"/>` + face(48, 11, 'w', 63) +
        `<path d="M46 58 L54 58 L50 62 Z" fill="${K}"/>`;
    },
    兔子: () => {
      const c = '#FFFFFF';
      return body(c) +
        `<ellipse cx="38" cy="20" rx="8" ry="19" fill="${c}" ${sw()} transform="rotate(-8 38 20)"/><ellipse cx="38" cy="21" rx="3.5" ry="12" fill="${PINK}" transform="rotate(-8 38 21)"/>` +
        `<ellipse cx="62" cy="20" rx="8" ry="19" fill="${c}" ${sw()} transform="rotate(8 62 20)"/><ellipse cx="62" cy="21" rx="3.5" ry="12" fill="${PINK}" transform="rotate(8 62 21)"/>` +
        `<ellipse cx="50" cy="54" rx="25" ry="22" fill="${c}" ${sw()}/>` + face(51, 10, 'w', 62) +
        `<path d="M47 58 L53 58 L50 61 Z" fill="#EC6F8E" ${sw(1.5)}/>`;
    },
    龙: () => {
      const c = '#4FA84A', y = '#F5C531', r = '#E63946', bl = '#F7E39A';
      const tail = 'M70 90 C90 90 96 74 86 66 C80 60 86 50 94 52';
      return `<path d="M78 84 L84 76 L86 86 Z M88 70 L96 66 L92 76 Z M86 58 L92 50 L94 60 Z" fill="${r}" ${sw(2)}/>` +
        `<path d="${tail}" fill="none" stroke="${K}" stroke-width="14" stroke-linecap="round"/>` +
        `<path d="${tail}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>` +
        `<ellipse cx="50" cy="84" rx="25" ry="15" fill="${c}" ${sw()}/><ellipse cx="50" cy="88" rx="13" ry="9" fill="${bl}"/>` + `<path d="M42 82 L58 82 M41 88 L59 88 M44 94 L56 94" stroke="#D9B84A" stroke-width="2" stroke-linecap="round"/>` +
        // 头顶一小撮红毛（像火）
        `<path d="M32 50 C23 51 18 45 22 42 C15 39 18 31 25 34 C24 28 31 27 34 34 Z M68 50 C77 51 82 45 78 42 C85 39 82 31 75 34 C76 28 69 27 66 34 Z" fill="${r}" ${sw(3)}/>` +
        `<path d="M40 32 C36 24 40 18 44 21 C43 12 50 9 52 16 C55 10 63 13 60 21 C64 20 66 27 61 32 Z" fill="${r}" ${sw(3)}/>` +
        // 金色的角
        `<path d="M36 33 C36 25 32 20 24 17 M33 25 C29.5 25 25.6 24 23 26.5 M64 33 C64 25 68 20 76 17 M67 25 C70.5 25 74.4 24 77 26.5" stroke="${K}" stroke-width="7" stroke-linecap="round" fill="none"/>` +
        `<path d="M36 33 C36 25 32 20 24 17 M33 25 C29.5 25 25.6 24 23 26.5 M64 33 C64 25 68 20 76 17 M67 25 C70.5 25 74.4 24 77 26.5" stroke="${y}" stroke-width="3.5" stroke-linecap="round" fill="none"/>` +
        // 头
        `<ellipse cx="50" cy="46" rx="22" ry="19" fill="${c}" ${sw()}/>` +
        // 胡须（从鼻子两边飘出去）
        `<path d="M36 60 C24 60 22 50 14 54 M64 60 C76 60 78 50 86 54" fill="none" stroke="${K}" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M36 60 C24 60 22 50 14 54 M64 60 C76 60 78 50 86 54" fill="none" stroke="${y}" stroke-width="2" stroke-linecap="round"/>` +
        // 大鼻子嘴巴
        `<path d="M32 56 C32 48 68 48 68 56 C68 68 58 72 50 72 C42 72 32 68 32 56 Z" fill="#8FD07A" ${sw(3)}/>` +
        `<ellipse cx="43" cy="55" rx="3" ry="2.4" fill="${K}"/><ellipse cx="57" cy="55" rx="3" ry="2.4" fill="${K}"/>` +
        `<path d="M42 64 Q50 69 58 64" fill="none" ${sw(2.5)}/>` +
        `<circle cx="40" cy="41" r="5.5" fill="#FFFFFF" ${sw(2.5)}/><circle cx="60" cy="41" r="5.5" fill="#FFFFFF" ${sw(2.5)}/>` +
        `<circle cx="41" cy="42" r="3" fill="${K}"/><circle cx="59" cy="42" r="3" fill="${K}"/>` +
        `<ellipse cx="31" cy="50" rx="4" ry="2.6" fill="${PINK}" opacity=".9"/><ellipse cx="69" cy="50" rx="4" ry="2.6" fill="${PINK}" opacity=".9"/>`;
    },
    蛇: () => {
      const c = '#8CC63F', s = '#5E9A2A';
      return `<ellipse cx="50" cy="88" rx="38" ry="10" fill="${c}" ${sw()}/>` +
        `<ellipse cx="50" cy="76" rx="31" ry="9" fill="${c}" ${sw()}/>` +
        `<ellipse cx="50" cy="65" rx="23" ry="8" fill="${c}" ${sw()}/>` +
        `<path d="M24 88 L30 86 M44 92 L50 90 M64 90 L70 88 M30 77 L36 75 M58 78 L64 76" ${sw(2)} stroke="${s}"/>` +
                `<path d="M44 62 Q40 46 46 38 L56 38 Q60 46 56 62 Z" fill="${c}" ${sw()}/>` +
        `<ellipse cx="50" cy="30" rx="20" ry="16" fill="${c}" ${sw()}/>` +
        `<circle cx="42" cy="27" r="3.4" fill="${K}"/><circle cx="58" cy="27" r="3.4" fill="${K}"/><circle cx="43" cy="26" r="1.1" fill="#FFFFFF"/><circle cx="59" cy="26" r="1.1" fill="#FFFFFF"/>` +
        `<ellipse cx="35" cy="34" rx="4" ry="2.6" fill="${PINK}" opacity=".85"/><ellipse cx="65" cy="34" rx="4" ry="2.6" fill="${PINK}" opacity=".85"/>` +
        `<path d="M44 36 Q50 40 56 36" fill="none" ${sw(2.5)}/>` +
        `<path d="M50 39 L50 48 M50 48 L46 52 M50 48 L54 52" stroke="#E63946" stroke-width="2.5" stroke-linecap="round"/>`;
    },
    马: () => {
      const c = '#B8733A', m = '#4A2E1A';
      return body(c, '#E9C79A') +
        `<path d="M34 24 L30 6 L44 20 Z M66 24 L70 6 L56 20 Z" fill="${c}" ${sw(3)}/>` +
        `<ellipse cx="50" cy="46" rx="22" ry="27" fill="${c}" ${sw()}/>` +
        `<path d="M36 26 Q42 14 52 18 Q62 12 66 24 Q58 22 54 30 Q48 22 42 32 Q40 26 36 26 Z" fill="${m}" ${sw(2.5)}/>` +
        `<ellipse cx="50" cy="62" rx="16" ry="11" fill="#E9C79A" ${sw(3)}/><ellipse cx="44" cy="62" rx="2" ry="3" fill="${K}"/><ellipse cx="56" cy="62" rx="2" ry="3" fill="${K}"/>` +
        face(43, 11, '', 0);
    },
    羊: () => {
      const c = '#FFFFFF';
      const wool = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" ${sw()}/>`;
      return body('#FFFFFF') +
        `<path d="M32 36 C16 32 14 54 26 54 C32 54 32 46 28 46" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M32 36 C16 32 14 54 26 54 C32 54 32 46 28 46" fill="none" stroke="#C9A27A" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M68 36 C84 32 86 54 74 54 C68 54 68 46 72 46" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M68 36 C84 32 86 54 74 54 C68 54 68 46 72 46" fill="none" stroke="#C9A27A" stroke-width="5" stroke-linecap="round"/>` +
        `<ellipse cx="50" cy="54" rx="19" ry="21" fill="#FFE9D2" ${sw()}/>` +
        wool(38, 32, 9) + wool(50, 28, 10) + wool(62, 32, 9) +
        `<path d="M34 34 Q50 42 66 34" fill="#FFFFFF" stroke="none"/>` +
        face(52, 8, 'w', 63) + `<path d="M47 59 L53 59 L50 62 Z" fill="#EC6F8E" ${sw(1.5)}/>`;
    },
    猴子: () => {
      const c = '#8A5A2B', f = '#F2D3B0';
      return `<path d="M72 90 C92 90 92 66 80 64 C74 63 74 70 78 70" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M72 90 C92 90 92 66 80 64 C74 63 74 70 78 70" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>` +
        body(c, f) +
        `<circle cx="22" cy="48" r="11" fill="${c}" ${sw()}/><circle cx="22" cy="48" r="6" fill="${f}"/>` +
        `<circle cx="78" cy="48" r="11" fill="${c}" ${sw()}/><circle cx="78" cy="48" r="6" fill="${f}"/>` +
        `<ellipse cx="50" cy="48" rx="27" ry="25" fill="${c}" ${sw()}/>` +
        `<path d="M50 34 C44 26 30 30 32 44 C30 54 34 66 50 70 C66 66 70 54 68 44 C70 30 56 26 50 34 Z" fill="${f}" ${sw(2.5)}/>` +
        face(46, 9, 'smile', 59) + `<circle cx="47" cy="54" r="1.4" fill="${K}"/><circle cx="53" cy="54" r="1.4" fill="${K}"/>`;
    },
    鸡: () => {
      const c = '#FFFFFF';
      return `<path d="M70 76 C82 58 92 62 90 72 C96 70 96 82 86 84 Z" fill="#3F8F3A" ${sw(3)}/><path d="M72 80 C86 70 96 76 92 86 Z" fill="#F28C3A" ${sw(3)}/>` +
        `<ellipse cx="50" cy="80" rx="27" ry="17" fill="${c}" ${sw()}/>` +
        `<path d="M40 78 Q46 88 56 80" fill="none" ${sw(2.5)}/>` +
        `<path d="M40 96 L40 90 M60 96 L60 90 M34 98 L46 98 M54 98 L66 98" stroke="#F5A623" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M38 26 C34 14 44 12 46 20 C46 8 58 8 56 20 C60 12 70 16 64 28 Z" fill="#E63946" ${sw(3)}/>` +
        `<ellipse cx="50" cy="46" rx="21" ry="21" fill="${c}" ${sw()}/>` +
        `<path d="M44 50 L56 50 L50 60 Z" fill="#F5A623" ${sw(2.5)}/>` +
        `<path d="M47 60 C44 68 50 72 52 66 C54 70 58 64 53 59 Z" fill="#E63946" ${sw(2.5)}/>` +
        `<circle cx="40" cy="43" r="3.6" fill="${K}"/><circle cx="60" cy="43" r="3.6" fill="${K}"/><circle cx="41" cy="41.6" r="1.2" fill="#FFFFFF"/><circle cx="61" cy="41.6" r="1.2" fill="#FFFFFF"/>` +
        `<ellipse cx="34" cy="52" rx="4.5" ry="3" fill="${PINK}" opacity=".85"/><ellipse cx="66" cy="52" rx="4.5" ry="3" fill="${PINK}" opacity=".85"/>`;
    },
    狗: () => {
      const c = '#E9C79A', e = '#8A5A2B';
      return body(c, '#FFF3E0') +
        `<ellipse cx="50" cy="48" rx="26" ry="24" fill="${c}" ${sw()}/>` +
        `<path d="M28 30 C14 30 12 52 20 62 C28 62 32 48 32 36 Z" fill="${e}" ${sw()}/><path d="M72 30 C86 30 88 52 80 62 C72 62 68 48 68 36 Z" fill="${e}" ${sw()}/>` +
        `<ellipse cx="62" cy="42" rx="8" ry="7" fill="${e}" opacity=".55"/>` +
        `<ellipse cx="50" cy="60" rx="13" ry="9" fill="#FFF3E0"/>` + face(46, 10, 'w', 63) +
        `<ellipse cx="50" cy="57" rx="5" ry="3.8" fill="${K}"/>` +
        `<path d="M50 64 Q50 72 54 70 Q56 66 53 64" fill="#EC6F8E" ${sw(2)}/>`;
    },
    猪: () => {
      const c = '#F7B6C8';
      return `<path d="M74 84 C82 84 80 76 86 78 C90 80 86 86 90 86" fill="none" ${sw(3)}/>` +
        body(c) +
        `<path d="M30 34 L24 16 L42 26 Z M70 34 L76 16 L58 26 Z" fill="${c}" ${sw(3)}/><path d="M30 30 L28 22 L36 27 Z M70 30 L72 22 L64 27 Z" fill="#EC8FB3"/>` +
        `<ellipse cx="50" cy="50" rx="27" ry="24" fill="${c}" ${sw()}/>` +
        `<ellipse cx="50" cy="57" rx="11" ry="8" fill="#EC8FB3" ${sw(3)}/><ellipse cx="46" cy="57" rx="2" ry="3" fill="${K}"/><ellipse cx="54" cy="57" rx="2" ry="3" fill="${K}"/>` +
        `<circle cx="38" cy="45" r="3.6" fill="${K}"/><circle cx="62" cy="45" r="3.6" fill="${K}"/><circle cx="39" cy="43.6" r="1.2" fill="#FFFFFF"/><circle cx="63" cy="43.6" r="1.2" fill="#FFFFFF"/>` +
        `<ellipse cx="30" cy="56" rx="5" ry="3.2" fill="#EC6F8E" opacity=".6"/><ellipse cx="70" cy="56" rx="5" ry="3.2" fill="#EC6F8E" opacity=".6"/>` +
        `<path d="M46 68 Q50 71 54 68" fill="none" ${sw(2.5)}/>`;
    }
  };


  // ---- 春节的东西（红包大放送 Level 3）----
  const scallop = (cx, cy, r, n, c) => Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n; return `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="${(r * 0.32).toFixed(1)}" fill="${c}" ${sw(3)}/>`; }).join('');
  const ITEMS = {
    红包: () => `<rect x="26" y="12" width="48" height="76" rx="6" fill="#D6453A" ${sw()}/>` +
      `<path d="M26 30 Q50 46 74 30" fill="none" ${sw(3)}/>` +
      `<circle cx="50" cy="56" r="12" fill="#F5C531" ${sw(3)}/><circle cx="50" cy="56" r="6" fill="none" stroke="#D99A1E" stroke-width="2.5"/>` +
      `<path d="M32 78 L68 78" stroke="#F5C531" stroke-width="3" stroke-linecap="round"/>`,
    饺子: () => `<ellipse cx="50" cy="74" rx="44" ry="15" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="72" rx="33" ry="9" fill="#EEF4F8"/>` +
      [[30, 66], [70, 66], [50, 58]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-17 4 Q-18 -14 0 -16 Q18 -14 17 4 Q0 10 -17 4 Z" fill="#FFF8EA" ${sw(3)}/>` +
        `<path d="M-11 -9 l3 4 M-4 -12 l2 5 M4 -12 l-2 5 M11 -9 l-3 4" ${sw(2)}/></g>`).join(''),
    鱼: () => `<path d="M76 50 L94 32 Q90 50 94 68 Z" fill="#F28C3A" ${sw()}/>` +
      `<path d="M12 50 Q30 22 62 28 Q80 34 80 50 Q80 66 62 72 Q30 78 12 50 Z" fill="#E9573F" ${sw()}/>` +
      `<path d="M44 28 Q50 16 60 22 L62 28 Z M44 72 Q50 84 60 78 L62 72 Z" fill="#F28C3A" ${sw(3)}/>` +
      `<path d="M46 40 Q50 44 46 48 M54 38 Q58 42 54 46 M54 52 Q58 56 54 60 M62 44 Q66 48 62 52 M46 54 Q50 58 46 62" fill="none" stroke="#F5C531" stroke-width="2.5" stroke-linecap="round"/>` +
      `<circle cx="26" cy="46" r="4.5" fill="#FFFFFF" ${sw(2)}/><circle cx="26" cy="46" r="2" fill="${K}"/>` +
      `<path d="M14 52 Q18 54 20 52" fill="none" ${sw(2)}/><path d="M34 36 Q30 50 34 64" fill="none" ${sw(2.5)}/>`,
    桔子: () => [[34, 60], [64, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="#F5A623" ${sw()}/>` +
        `<circle cx="${x - 7}" cy="${y - 6}" r="1.6" fill="#E08A10"/><circle cx="${x + 6}" cy="${y + 4}" r="1.6" fill="#E08A10"/><circle cx="${x - 2}" cy="${y + 10}" r="1.6" fill="#E08A10"/>` +
        `<path d="M${x} ${y - 22} L${x + 1} ${y - 27}" ${sw(3)}/><path d="M${x + 1} ${y - 26} Q${x + 14} ${y - 36} ${x + 18} ${y - 26} Q${x + 8} ${y - 20} ${x + 1} ${y - 26} Z" fill="#5FAE3E" ${sw(2.5)}/>`).join(''),
    鞭炮: () => `<path d="M50 6 L50 90" ${sw(3)}/>` +
      [18, 34, 50, 66].map((y, i) => [-1, 1].map(d => `<g transform="translate(${50 + d * 13} ${y + 4}) rotate(${-d * 35})"><rect x="-5" y="-11" width="10" height="22" rx="2" fill="#D6453A" ${sw(2.5)}/><path d="M-5 -6 L5 -6 M-5 6 L5 6" stroke="#F5C531" stroke-width="2"/></g>`).join('')).join('') +
      `<path d="M50 90 L50 96" stroke="#8A5A2B" stroke-width="3"/><path d="M50 97 l-6 -3 M50 97 l6 -3 M50 97 l-4 3 M50 97 l4 3" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"/>`,
    舞龙舞狮: () => {
      // 一只舞狮：前面是狮头，后面是身体（花布 + 流苏），下面四只脚（两个人在里面）
      const leg = x => `<rect x="${x}" y="70" width="9" height="18" rx="3" fill="#F5C531" ${sw(2.5)}/><path d="M${x - 2} 92 Q${x - 2} 86 ${x + 4} 86 Q${x + 12} 86 ${x + 12} 92 Z" fill="${K}"/>`;
      return leg(22) + leg(36) + leg(64) + leg(78) +
        `<path d="M40 40 Q66 26 92 40 Q98 52 92 64 L94 66 Q90 70 86 66 Q82 70 78 66 Q74 70 70 66 Q66 70 62 66 Q58 70 54 66 Q50 70 46 66 Q42 70 40 66 Z" fill="#D6453A" ${sw()}/>` +
        `<path d="M48 44 Q66 34 88 44" fill="none" stroke="#F5C531" stroke-width="4" stroke-linecap="round"/><path d="M50 54 Q68 46 88 54" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 5"/>` +
        `<path d="M92 42 Q100 36 98 28 Q94 36 90 38 Z" fill="#F5C531" ${sw(2.5)}/>` +
        scallop(28, 44, 21, 12, '#F5C531') +
        `<circle cx="28" cy="44" r="20" fill="#D6453A" ${sw()}/>` +
        `<path d="M28 20 L24 28 L32 28 Z" fill="#5FAE3E" ${sw(2)}/>` +
        `<circle cx="21" cy="39" r="5.5" fill="#FFFFFF" ${sw(2)}/><circle cx="35" cy="39" r="5.5" fill="#FFFFFF" ${sw(2)}/><circle cx="21.5" cy="40" r="2.6" fill="${K}"/><circle cx="34.5" cy="40" r="2.6" fill="${K}"/>` +
        `<path d="M15 33 Q21 29 26 33 M30 33 Q35 29 41 33" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>` +
        `<ellipse cx="28" cy="48" rx="4.5" ry="3" fill="#F5C531" ${sw(2)}/>` +
        `<path d="M16 54 Q28 66 40 54 Q28 58 16 54 Z" fill="#FFFFFF" ${sw(2.5)}/>`;
    }
  };

  // ---- 领巾（猜灯谜用）：围在下巴下面；y = 每只动物下巴的高度 ----
  const CHIN = { 老鼠: 73, 牛: 71, 老虎: 72, 兔子: 74, 龙: 70, 蛇: 53, 马: 71, 羊: 73, 猴子: 71, 鸡: 64, 狗: 70, 猪: 72 };
  const scarf = (zh, c) => {
    const y = CHIN[zh] || 72, w = zh === '蛇' ? 9 : 19;
    return `<path d="M${50 + w - 12} ${y + 8} L${50 + w - 1} ${y + 25} L${50 + w - 13} ${y + 26} Z" fill="${c}" ${sw(2.5)}/>` +
      `<path d="M${50 - w - 1} ${y - 1} Q50 ${y + 6} ${50 + w + 1} ${y - 1} L${50 + w + 1} ${y + 9} Q50 ${y + 16} ${50 - w - 1} ${y + 9} Z" fill="${c}" ${sw(3)}/>`;
  };

  const g = zh => DRAW[zh] ? DRAW[zh]() : (ITEMS[zh] ? ITEMS[zh]() : '');
  window.ZART = {
    order: ['老鼠', '牛', '老虎', '兔子', '龙', '蛇', '马', '羊', '猴子', '鸡', '狗', '猪'],
    g,
    svg: zh => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g(zh)}</svg>`,
    // 戴着领巾的生肖：ZART.scarf('兔子', '#E5483B')
    scarf: (zh, c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g(zh)}${scarf(zh, c)}</svg>`
  };
})();
