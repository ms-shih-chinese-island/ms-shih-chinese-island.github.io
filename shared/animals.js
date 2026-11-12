/* =====================================================================
   动物的图（Q 版、平涂、粗黑线），宠物店、花园、动物园共用
   ANIMAL_ART.svg('猫', '#F28C28')   → 包好 <svg> 的图（正方形 100 × 100），颜色可以换
   宠物：猫、狗、兔子、小鸟、仓鼠、鱼、龟、蛇、蜥蜴（可以换颜色）
   昆虫：蝴蝶、瓢虫、蜻蜓、蚂蚁（可以换颜色）
   农场（课纲一年级 3 月）：母牛、猪、马、山羊、绵羊、鸭子、公鸡、母鸡、火鸡（颜色固定）
   动物园（课纲四年级 3 月的 12 种）：狮子、老虎、豹、犀牛、大象、鳄鱼、骆驼、熊、熊猫、猴子、长颈鹿、斑马（颜色固定）
   昆虫（颜色固定）：蜜蜂、蚊子、苍蝇、萤火虫、蟋蟀
   水族馆：鲸鱼、海豚、螃蟹、鲨鱼、水母、海龟、海星、章鱼
   size：动物园动物的大小（排大小用，1 最小）
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const eyes = (x1, x2, y, r = 3.5) => `<circle cx="${x1}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x2}" cy="${y}" r="${r}" fill="${INK}"/>` +
    `<circle cx="${x1 + 1}" cy="${y - 1.2}" r="1.1" fill="#FFFFFF"/><circle cx="${x2 + 1}" cy="${y - 1.2}" r="1.1" fill="#FFFFFF"/>`;
  // 深色的动物：线和眼睛用白色才看得到
  const dark = c => /^#(2|3)/.test(c);
  const eyesOn = (c, x1, x2, y) => (dark(c) ? `<circle cx="${x1}" cy="${y}" r="6" fill="#FFFFFF"/><circle cx="${x2}" cy="${y}" r="6" fill="#FFFFFF"/>` : '') + eyes(x1, x2, y);
  const A = {
    // ---- 宠物 ----
    猫: c => `<path d="M70 86 Q92 82 88 60 Q86 52 80 56" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M70 86 Q92 82 88 60 Q86 52 80 56" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="74" rx="24" ry="18" fill="${c}" ${sw()}/>` +
      `<path d="M28 34 L30 12 L44 26 Z M72 34 L70 12 L56 26 Z" fill="${c}" ${sw()}/><circle cx="50" cy="40" r="22" fill="${c}" ${sw()}/>` +
      `<path d="M33 22 L34 15 L40 22 Z M67 22 L66 15 L60 22 Z" fill="#F49AC1"/>` + eyesOn(c, 42, 58, 38) +
      `<path d="M48 45 L52 45 L50 48 Z" fill="#F49AC1" ${sw(1.5)}/><path d="M44 50 Q50 54 56 50" fill="none" stroke="${dark(c) ? '#FFFFFF' : INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M30 44 L18 42 M30 48 L18 50 M70 44 L82 42 M70 48 L82 50" stroke="${dark(c) ? '#FFFFFF' : INK}" stroke-width="1.8" stroke-linecap="round"/>`,
    狗: c => `<ellipse cx="50" cy="76" rx="24" ry="16" fill="${c}" ${sw()}/><path d="M72 72 Q86 66 84 56" fill="none" ${sw(5)}/>` +
      `<circle cx="50" cy="42" r="22" fill="${c}" ${sw()}/>` +
      `<path d="M30 28 Q18 30 20 52 Q24 58 32 50 Z M70 28 Q82 30 80 52 Q76 58 68 50 Z" fill="#8A5A2B" ${sw()}/>` +
      `<ellipse cx="50" cy="52" rx="11" ry="8" fill="#FFF3DF" ${sw(2.5)}/><ellipse cx="50" cy="48" rx="4" ry="3" fill="${INK}"/>` + eyesOn(c, 42, 58, 38) +
      `<path d="M46 56 Q50 59 54 56" fill="none" ${sw(2)}/>`,
    兔子: c => `<ellipse cx="38" cy="18" rx="7" ry="18" fill="${c}" ${sw()}/><ellipse cx="62" cy="18" rx="7" ry="18" fill="${c}" ${sw()}/>` +
      `<ellipse cx="38" cy="18" rx="3" ry="12" fill="#F49AC1"/><ellipse cx="62" cy="18" rx="3" ry="12" fill="#F49AC1"/>` +
      `<ellipse cx="50" cy="76" rx="22" ry="18" fill="${c}" ${sw()}/><circle cx="50" cy="46" r="19" fill="${c}" ${sw()}/>` + eyesOn(c, 43, 57, 44) +
      `<path d="M48 51 L52 51 L50 54 Z" fill="#F49AC1" ${sw(1.5)}/><circle cx="72" cy="80" r="6" fill="#FFFFFF" ${sw(2.5)}/>`,
    小鸟: c => `<path d="M30 84 L30 94 M44 84 L44 94" stroke="#F28C28" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="44" cy="60" rx="30" ry="26" fill="${c}" ${sw()}/><path d="M74 54 L90 60 L74 66 Z" fill="#F28C28" ${sw(2.5)}/>` +
      `<path d="M30 58 Q42 76 58 62 Q46 54 30 58 Z" fill="${c}" ${sw(3)}/><path d="M14 52 L2 46 L8 60 Z" fill="${c}" ${sw(2.5)}/>` +
      `<circle cx="62" cy="50" r="4" fill="${INK}"/><circle cx="63" cy="48.8" r="1.2" fill="#FFFFFF"/><path d="M40 34 Q44 26 50 30" fill="none" ${sw(2.5)}/>`,
    // ---- 宠物（课纲二年级 3 月还有的五种，可以换颜色）----
    // 仓鼠：圆滚滚的身体、白肚子、鼓鼓的脸颊、小圆耳朵
    仓鼠: c => `<ellipse cx="50" cy="64" rx="34" ry="26" fill="${c}" ${sw()}/>` +
      `<circle cx="30" cy="36" r="9" fill="${c}" ${sw()}/><circle cx="70" cy="36" r="9" fill="${c}" ${sw()}/><circle cx="30" cy="36" r="4" fill="#F49AC1"/><circle cx="70" cy="36" r="4" fill="#F49AC1"/>` +
      `<ellipse cx="50" cy="72" rx="20" ry="16" fill="#FFF3DF" ${sw(2.5)}/>` +
      `<circle cx="32" cy="58" r="7" fill="#F7B3C2" opacity=".8"/><circle cx="68" cy="58" r="7" fill="#F7B3C2" opacity=".8"/>` + eyesOn(c, 40, 60, 50) +
      `<path d="M47 57 L53 57 L50 60 Z" fill="#F49AC1" ${sw(1.5)}/><path d="M36 88 L36 92 M64 88 L64 92" stroke="#F49AC1" stroke-width="5" stroke-linecap="round"/>`,
    // 鱼：金鱼的样子，椭圆的身体、大尾巴、背鳍
    鱼: c => `<path d="M70 50 L94 30 Q88 50 94 70 Z" fill="${c}" ${sw()}/>` +
      `<path d="M40 30 Q50 16 62 30 Z" fill="${c}" ${sw(3)}/>` +
      `<ellipse cx="44" cy="50" rx="32" ry="22" fill="${c}" ${sw()}/>` +
      `<path d="M52 34 Q60 50 52 66" fill="none" stroke="${dark(c) ? '#FFFFFF' : INK}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M40 60 Q46 70 54 64" fill="${c}" ${sw(2.5)}/>` +
      (dark(c) ? `<circle cx="26" cy="44" r="7" fill="#FFFFFF"/>` : '') + `<circle cx="26" cy="44" r="4" fill="${INK}"/><circle cx="27" cy="42.8" r="1.3" fill="#FFFFFF"/>` +
      `<circle cx="10" cy="34" r="3" fill="#BFE3F2" ${sw(1.5)}/><circle cx="6" cy="24" r="2" fill="#BFE3F2" ${sw(1.2)}/>`,
    // 龟：圆圆的龟壳（壳的颜色可以换），浅绿色的头和脚
    龟: c => `<ellipse cx="22" cy="78" rx="8" ry="6" fill="#9CCB6E" ${sw(2.5)}/><ellipse cx="78" cy="78" rx="8" ry="6" fill="#9CCB6E" ${sw(2.5)}/>` +
      `<path d="M84 60 Q100 56 96 46 Q90 38 80 48 Z" fill="#9CCB6E" ${sw(3)}/><circle cx="89" cy="47" r="2.6" fill="${INK}"/>` +
      `<path d="M10 70 L4 74 L12 76 Z" fill="#9CCB6E" ${sw(2)}/>` +
      `<path d="M12 72 Q14 30 50 28 Q86 30 88 72 Z" fill="${c}" ${sw()}/>` +
      `<path d="M50 28 L50 72 M30 36 L38 52 L30 70 M70 36 L62 52 L70 70 M38 52 L62 52" fill="none" stroke="${dark(c) ? '#FFFFFF' : 'rgba(43,43,43,.55)'}" stroke-width="2.6" stroke-linejoin="round"/>` +
      `<path d="M10 72 L90 72" ${sw(4)}/>`,
    // 蛇：弯弯的身体（先画黑边、再画颜色）、圆圆的头、红色的舌头
    蛇: c => `<ellipse cx="52" cy="84" rx="36" ry="10" fill="${c}" ${sw()}/>` +
      `<ellipse cx="52" cy="74" rx="28" ry="9" fill="${c}" ${sw()}/>` +
      `<path d="M30 70 Q30 58 46 56 Q62 54 68 64 Q74 72 62 74" fill="${c}" stroke="none"/>` +
      `<path d="M62 74 Q74 72 70 62 Q64 52 48 54 Q34 56 34 44 L34 36" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>` +
      `<path d="M62 74 Q74 72 70 62 Q64 52 48 54 Q34 56 34 44 L34 36" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M30 83 L36 87 M44 85 L50 89 M60 85 L66 89 M72 83 L78 87 M36 74 L42 78 M54 75 L60 79" stroke="${dark(c) ? '#FFFFFF' : 'rgba(43,43,43,.35)'}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<ellipse cx="38" cy="26" rx="17" ry="13" fill="${c}" ${sw()}/>` + eyesOn(c, 32, 46, 22) +
      `<path d="M30 31 Q38 36 46 31" fill="none" stroke="${dark(c) ? '#FFFFFF' : INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M28 31 L18 33 M18 33 L13 29 M18 33 L13 37" fill="none" stroke="#E5302A" stroke-width="2.5" stroke-linecap="round"/>`,
    蜥蜴: c => `<path d="M60 60 Q84 66 88 82 Q90 92 80 90" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M60 60 Q84 66 88 82 Q90 92 80 90" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M30 52 L18 44 M30 66 L16 74 M58 54 L70 44 M58 66 L70 76" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M30 52 L18 44 M30 66 L16 74 M58 54 L70 44 M58 66 L70 76" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>` +
      `<ellipse cx="44" cy="60" rx="20" ry="11" fill="${c}" ${sw()}/>` +
      `<ellipse cx="18" cy="48" rx="14" ry="10" fill="${c}" ${sw()}/>` + eyesOn(c, 14, 24, 45) +
      `<path d="M6 52 Q10 54 14 52" fill="none" stroke="${dark(c) ? '#FFFFFF' : INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<circle cx="38" cy="56" r="3" fill="rgba(255,255,255,.55)"/><circle cx="48" cy="60" r="3" fill="rgba(255,255,255,.55)"/><circle cx="56" cy="56" r="2.5" fill="rgba(255,255,255,.55)"/>`,
    // ---- 农场（课纲一年级 3 月的 9 种，颜色固定）----
    母牛: () => `<path d="M30 74 L30 92 M70 74 L70 92" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M30 74 L30 92 M70 74 L70 92" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="70" rx="30" ry="18" fill="#FFFFFF" ${sw()}/><path d="M28 62 Q36 56 40 66 Q34 72 28 68 Z M62 72 Q70 64 76 72 Q70 80 62 76 Z" fill="${INK}"/>` +
      `<ellipse cx="50" cy="88" rx="7" ry="4" fill="#F49AC1" ${sw(2)}/>` +
      `<path d="M30 22 Q24 14 28 10 M70 22 Q76 14 72 10" fill="none" stroke="#E9D6A8" stroke-width="6" stroke-linecap="round"/><path d="M30 22 Q24 14 28 10 M70 22 Q76 14 72 10" fill="none" ${sw(2)}/>` +
      `<ellipse cx="24" cy="32" rx="9" ry="5" fill="#FFFFFF" ${sw(2.5)} transform="rotate(-20 24 32)"/><ellipse cx="76" cy="32" rx="9" ry="5" fill="#FFFFFF" ${sw(2.5)} transform="rotate(20 76 32)"/>` +
      `<path d="M30 30 Q30 14 50 14 Q70 14 70 30 L68 46 Q50 52 32 46 Z" fill="#FFFFFF" ${sw()}/><path d="M52 16 Q62 18 66 28 Q58 30 54 24 Z" fill="${INK}"/>` +
      `<ellipse cx="50" cy="48" rx="17" ry="11" fill="#F7B3C2" ${sw(2.5)}/><ellipse cx="44" cy="48" rx="2.5" ry="3.5" fill="${INK}"/><ellipse cx="56" cy="48" rx="2.5" ry="3.5" fill="${INK}"/>` + eyes(41, 59, 30),
    猪: () => `<path d="M80 62 Q92 58 88 50 Q84 46 82 52 Q86 54 82 58" fill="none" ${sw(2.8)}/>` +
      `<ellipse cx="50" cy="66" rx="32" ry="22" fill="#F7B3C2" ${sw()}/><path d="M30 84 L30 92 M44 86 L44 92 M58 86 L58 92 M70 84 L70 92" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M30 84 L30 92 M44 86 L44 92 M58 86 L58 92 M70 84 L70 92" stroke="#F7B3C2" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M28 24 L24 8 L40 18 Z M72 24 L76 8 L60 18 Z" fill="#F08FA6" ${sw(3)}/>` +
      `<circle cx="50" cy="36" r="22" fill="#F7B3C2" ${sw()}/>` + eyes(41, 59, 30) +
      `<ellipse cx="50" cy="44" rx="11" ry="8" fill="#F08FA6" ${sw(2.5)}/><ellipse cx="46" cy="44" rx="2" ry="3" fill="${INK}"/><ellipse cx="54" cy="44" rx="2" ry="3" fill="${INK}"/>`,
    马: () => `<path d="M32 70 L30 94 M44 72 L44 94 M64 72 L64 94 M76 70 L78 94" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M32 70 L30 94 M44 72 L44 94 M64 72 L64 94 M76 70 L78 94" stroke="#B9773E" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M84 56 Q98 62 94 82 Q88 72 84 66 Z" fill="#5B3A1E" ${sw(2.5)}/>` +
      `<ellipse cx="56" cy="62" rx="30" ry="15" fill="#B9773E" ${sw()}/>` +
      `<path d="M30 60 L22 30 L38 24 L48 56 Z" fill="#B9773E" ${sw()}/>` +
      `<path d="M26 22 L28 10 L34 20 Z" fill="#B9773E" ${sw(2.5)}/>` +
      `<ellipse cx="22" cy="32" rx="17" ry="9.5" fill="#B9773E" ${sw()} transform="rotate(-55 22 32)"/>` +
      `<ellipse cx="13" cy="44" rx="6" ry="7" fill="#D9A066" ${sw(2.2)} transform="rotate(-55 13 44)"/><circle cx="11" cy="45" r="1.6" fill="${INK}"/>` +
      `<path d="M34 20 Q44 30 44 40 Q48 48 48 56 Q40 46 36 36 Z" fill="#5B3A1E" ${sw(2.5)}/>` +
      `<circle cx="24" cy="27" r="2.8" fill="${INK}"/><circle cx="25" cy="26" r="1" fill="#FFFFFF"/>`,
    山羊: () => `<path d="M34 70 L34 92 M46 72 L46 92 M60 72 L60 92 M72 70 L72 92" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M34 70 L34 92 M46 72 L46 92 M60 72 L60 92 M72 70 L72 92" stroke="#D9D2C5" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M80 58 L90 50 L86 62 Z" fill="#D9D2C5" ${sw(2.5)}/>` +
      `<ellipse cx="54" cy="62" rx="28" ry="14" fill="#D9D2C5" ${sw()}/>` +
      `<path d="M30 30 Q24 12 36 8 Q30 16 34 28" fill="#9C8A6E" ${sw(2.5)}/><path d="M40 28 Q38 10 50 8 Q42 16 44 28" fill="#9C8A6E" ${sw(2.5)}/>` +
      `<path d="M26 34 L14 30 L22 40 Z" fill="#D9D2C5" ${sw(2.5)}/>` +
      `<path d="M24 32 Q30 24 42 28 Q48 34 44 48 L36 58 Q28 56 26 46 Z" fill="#D9D2C5" ${sw()}/>` +
      `<path d="M30 56 L32 70 L38 58 Z" fill="#FFFFFF" ${sw(2.5)}/>` +
      `<circle cx="36" cy="38" r="3" fill="${INK}"/><circle cx="37" cy="37" r="1" fill="#FFFFFF"/><path d="M30 50 Q34 52 38 50" fill="none" ${sw(2)}/>`,
    绵羊: () => `<path d="M32 74 L32 92 M46 76 L46 92 M58 76 L58 92 M70 74 L70 92" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>` +
      [[30, 56], [44, 48], [60, 48], [74, 56], [70, 70], [54, 74], [38, 72], [26, 66], [52, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#FFFFFF" ${sw(3)}/>`).join('') +
      [[30, 56], [44, 48], [60, 48], [74, 56], [70, 70], [54, 74], [38, 72], [26, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#FFFFFF"/>`).join('') + `<ellipse cx="52" cy="62" rx="26" ry="14" fill="#FFFFFF"/>` +
      `<ellipse cx="18" cy="40" rx="8" ry="4" fill="#3A3A3A" ${sw(2)} transform="rotate(-25 18 40)"/>` +
      `<ellipse cx="26" cy="44" rx="11" ry="14" fill="#3A3A3A" ${sw()}/>` +
      `<circle cx="20" cy="30" r="6" fill="#FFFFFF" ${sw(2)}/><circle cx="30" cy="28" r="6" fill="#FFFFFF" ${sw(2)}/>` +
      `<circle cx="22" cy="42" r="3.5" fill="#FFFFFF"/><circle cx="31" cy="42" r="3.5" fill="#FFFFFF"/><circle cx="22.5" cy="42" r="2" fill="${INK}"/><circle cx="31.5" cy="42" r="2" fill="${INK}"/>`,
    鸭子: () => `<path d="M42 82 L38 92 L48 92 Z M56 82 L54 92 L64 92 Z" fill="#F28C28" ${sw(2.5)}/>` +
      `<path d="M20 64 Q20 46 46 48 Q70 50 84 40 Q86 56 78 66 Q66 86 42 84 Q20 82 20 64 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M40 60 Q54 58 64 66 Q52 74 40 68 Z" fill="#EEF0F2" ${sw(2.5)}/>` +
      `<circle cx="30" cy="34" r="16" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M14 36 Q2 36 2 42 Q8 46 18 42 Z" fill="#F28C28" ${sw(2.5)}/>` +
      `<circle cx="26" cy="30" r="3" fill="${INK}"/><circle cx="27" cy="29" r="1" fill="#FFFFFF"/>`,
    公鸡: () => `<path d="M40 76 L38 92 M54 76 L56 92" stroke="#F5C531" stroke-width="4" stroke-linecap="round"/><path d="M32 92 L44 92 M50 92 L62 92" stroke="#F5C531" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M66 54 Q78 20 96 26 Q84 34 88 46 Q94 40 98 50 Q86 52 84 62 Z" fill="#2E7D4F" ${sw(2.5)}/><path d="M68 58 Q86 36 94 58 Q80 56 76 70 Z" fill="#F28C28" ${sw(2.5)}/>` +
      `<ellipse cx="48" cy="62" rx="24" ry="18" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M40 58 Q50 54 58 62 Q48 70 40 64 Z" fill="#EEF0F2" ${sw(2)}/>` +
      `<path d="M28 50 Q24 34 34 26 Q42 30 40 48 Z" fill="#FFFFFF" ${sw()}/>` +
      `<circle cx="32" cy="28" r="12" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M24 18 Q26 6 30 14 Q32 4 36 13 Q40 6 40 18 Z" fill="#E5302A" ${sw(2.5)}/>` +
      `<path d="M20 28 L10 31 L20 34 Z" fill="#F5C531" ${sw(2.2)}/><path d="M22 36 Q18 44 24 44 Q26 40 24 36 Z" fill="#E5302A" ${sw(2)}/>` +
      `<circle cx="29" cy="26" r="2.6" fill="${INK}"/>`,
    母鸡: () => `<path d="M42 78 L40 92 M56 78 L58 92" stroke="#F5C531" stroke-width="4" stroke-linecap="round"/><path d="M34 92 L46 92 M52 92 L64 92" stroke="#F5C531" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M70 56 Q84 40 88 52 Q84 60 76 66 Z" fill="#B9773E" ${sw(2.5)}/>` +
      `<ellipse cx="50" cy="62" rx="26" ry="20" fill="#D9A066" ${sw()}/>` +
      `<path d="M42 58 Q54 54 62 64 Q50 72 42 66 Z" fill="#B9773E" ${sw(2)}/>` +
      `<circle cx="32" cy="40" r="13" fill="#D9A066" ${sw()}/>` +
      `<path d="M28 28 Q30 22 33 27 Q35 22 38 29 Z" fill="#E5302A" ${sw(2)}/>` +
      `<path d="M20 40 L11 43 L20 46 Z" fill="#F5C531" ${sw(2.2)}/><path d="M22 48 Q20 54 25 53 Z" fill="#E5302A" ${sw(1.8)}/>` +
      `<circle cx="29" cy="38" r="2.6" fill="${INK}"/>`,
    火鸡: () => [-60, -36, -12, 12, 36, 60].map((a, i) => `<ellipse cx="50" cy="26" rx="10" ry="24" fill="${['#8A5A2B', '#C9772E', '#F28C28', '#F28C28', '#C9772E', '#8A5A2B'][i]}" ${sw(2.5)} transform="rotate(${a} 50 56)"/>`).join('') +
      `<path d="M42 80 L40 92 M58 80 L60 92" stroke="#F5C531" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="66" rx="22" ry="20" fill="#7A4A26" ${sw()}/>` +
      `<path d="M50 60 Q42 46 46 36 Q50 30 56 36 Q58 46 54 60 Z" fill="#9FC7E8" ${sw(2.5)}/>` +
      `<circle cx="49" cy="40" r="2.4" fill="${INK}"/><path d="M52 44 L58 46 L52 48 Z" fill="#F5C531" ${sw(1.8)}/>` +
      `<path d="M50 48 Q46 56 50 58 Q54 56 50 48 Z" fill="#E5302A" ${sw(2)}/>`,
    // ---- 昆虫 ----
    蝴蝶: c => `<path d="M50 50 Q20 10 12 32 Q8 52 50 52 Z M50 50 Q80 10 88 32 Q92 52 50 52 Z" fill="${c}" ${sw()}/>` +
      `<path d="M50 54 Q24 58 26 80 Q36 90 50 58 Z M50 54 Q76 58 74 80 Q64 90 50 58 Z" fill="${c}" ${sw()}/>` +
      `<circle cx="28" cy="34" r="5" fill="#FFFFFF" opacity=".7"/><circle cx="72" cy="34" r="5" fill="#FFFFFF" opacity=".7"/>` +
      `<ellipse cx="50" cy="56" rx="5" ry="22" fill="${INK}"/><path d="M48 36 Q42 22 38 20 M52 36 Q58 22 62 20" fill="none" ${sw(2)}/>`,
    瓢虫: c => `<path d="M30 48 L16 42 M28 60 L14 62 M32 72 L20 82 M70 48 L84 42 M72 60 L86 62 M68 72 L80 82" ${sw(3)}/>` +
      `<circle cx="50" cy="30" r="12" fill="${INK}"/><circle cx="44" cy="28" r="2.5" fill="#FFFFFF"/><circle cx="56" cy="28" r="2.5" fill="#FFFFFF"/>` +
      `<ellipse cx="50" cy="60" rx="28" ry="26" fill="${c}" ${sw()}/><path d="M50 34 L50 86" ${sw(3)}/>` +
      `<circle cx="38" cy="52" r="5" fill="${INK}"/><circle cx="62" cy="52" r="5" fill="${INK}"/><circle cx="36" cy="70" r="4.5" fill="${INK}"/><circle cx="64" cy="70" r="4.5" fill="${INK}"/>`,
    蜻蜓: c => `<ellipse cx="34" cy="38" rx="22" ry="8" fill="#DDF2FB" ${sw(2.5)} transform="rotate(-12 34 38)"/><ellipse cx="66" cy="38" rx="22" ry="8" fill="#DDF2FB" ${sw(2.5)} transform="rotate(12 66 38)"/>` +
      `<ellipse cx="34" cy="52" rx="20" ry="7" fill="#DDF2FB" ${sw(2.5)} transform="rotate(10 34 52)"/><ellipse cx="66" cy="52" rx="20" ry="7" fill="#DDF2FB" ${sw(2.5)} transform="rotate(-10 66 52)"/>` +
      `<rect x="45" y="36" width="10" height="56" rx="5" fill="${c}" ${sw(3)}/><circle cx="50" cy="28" r="10" fill="${c}" ${sw(3)}/>` +
      `<circle cx="45" cy="26" r="3.5" fill="${INK}"/><circle cx="55" cy="26" r="3.5" fill="${INK}"/>`,
    蚂蚁: c => `<path d="M40 56 L24 44 M44 60 L26 64 M44 64 L30 80 M60 56 L76 44 M56 60 L74 64 M56 64 L70 80" ${sw(3)}/>` +
      `<circle cx="50" cy="28" r="11" fill="${c}" ${sw()}/><ellipse cx="50" cy="52" rx="9" ry="10" fill="${c}" ${sw()}/><ellipse cx="50" cy="78" rx="14" ry="15" fill="${c}" ${sw()}/>` +
      `<path d="M45 18 Q38 6 32 8 M55 18 Q62 6 68 8" fill="none" ${sw(2)}/><circle cx="45" cy="27" r="2.5" fill="#FFFFFF"/><circle cx="55" cy="27" r="2.5" fill="#FFFFFF"/>`,
    // ---- 动物园（颜色固定） ----
    大象: () => `<path d="M34 84 L34 94 M66 84 L66 94" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M34 84 L34 94 M66 84 L66 94" stroke="#A9B4BF" stroke-width="7" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="76" rx="27" ry="17" fill="#A9B4BF" ${sw()}/>` +
      `<ellipse cx="22" cy="40" rx="18" ry="22" fill="#A9B4BF" ${sw()}/><ellipse cx="78" cy="40" rx="18" ry="22" fill="#A9B4BF" ${sw()}/>` +
      `<ellipse cx="24" cy="41" rx="10" ry="14" fill="#E9B8C4"/><ellipse cx="76" cy="41" rx="10" ry="14" fill="#E9B8C4"/>` +
      `<circle cx="50" cy="38" r="22" fill="#A9B4BF" ${sw()}/>` +
      `<path d="M41 54 Q38 62 44 63 Z M59 54 Q62 62 56 63 Z" fill="#FFFFFF" ${sw(2)}/>` +
      `<path d="M50 48 Q50 62 49 70 Q48 80 56 80 Q61 79 59 74" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>` +
      `<path d="M50 48 Q50 62 49 70 Q48 80 56 80 Q61 79 59 74" fill="none" stroke="#A9B4BF" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M47 58 L53 58 M47 64 L52 64" stroke="#8A96A3" stroke-width="2" stroke-linecap="round"/>` +
      eyes(42, 58, 36) + `<circle cx="36" cy="44" r="4" fill="#F29BA6" opacity=".6"/><circle cx="64" cy="44" r="4" fill="#F29BA6" opacity=".6"/>`,
    狮子: () => `<path d="M30 80 L30 94 M70 80 L70 94" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M30 80 L30 94 M70 80 L70 94" stroke="#E9A23B" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M74 80 Q92 80 90 64" fill="none" ${sw(3)}/><circle cx="90" cy="62" r="5" fill="#8A4B1E" ${sw(2.2)}/>` +
      `<ellipse cx="50" cy="78" rx="24" ry="15" fill="#E9A23B" ${sw()}/>` +
      `<path d="M50 6 Q62 4 68 12 Q80 12 82 24 Q92 30 88 42 Q94 52 86 60 Q84 72 72 72 Q64 80 50 78 Q36 80 28 72 Q16 72 14 60 Q6 52 12 42 Q8 30 18 24 Q20 12 32 12 Q38 4 50 6 Z" fill="#B5651D" ${sw()}/>` +
      `<circle cx="32" cy="24" r="6" fill="#E9A23B" ${sw(2.5)}/><circle cx="68" cy="24" r="6" fill="#E9A23B" ${sw(2.5)}/>` +
      `<circle cx="50" cy="42" r="23" fill="#F2B84B" ${sw()}/>` +
      `<ellipse cx="50" cy="53" rx="11" ry="8" fill="#FFF3DF" ${sw(2.2)}/><path d="M45 47 L55 47 L50 52 Z" fill="#8A4B1E" ${sw(1.8)}/>` +
      `<path d="M50 52 L50 56 M50 56 Q46 59 43 56 M50 56 Q54 59 57 56" fill="none" ${sw(2)}/>` + eyes(41, 59, 38),
    熊猫: () => `<ellipse cx="34" cy="90" rx="10" ry="7" fill="${INK}"/><ellipse cx="66" cy="90" rx="10" ry="7" fill="${INK}"/>` +
      `<ellipse cx="50" cy="76" rx="25" ry="18" fill="#FFFFFF" ${sw()}/>` +
      `<ellipse cx="27" cy="74" rx="8" ry="13" fill="${INK}" transform="rotate(25 27 74)"/><ellipse cx="73" cy="74" rx="8" ry="13" fill="${INK}" transform="rotate(-25 73 74)"/>` +
      `<circle cx="27" cy="20" r="10" fill="${INK}"/><circle cx="73" cy="20" r="10" fill="${INK}"/>` +
      `<ellipse cx="50" cy="42" rx="29" ry="25" fill="#FFFFFF" ${sw()}/>` +
      `<ellipse cx="38" cy="43" rx="7.5" ry="10" fill="${INK}" transform="rotate(35 38 43)"/><ellipse cx="62" cy="43" rx="7.5" ry="10" fill="${INK}" transform="rotate(-35 62 43)"/>` +
      `<circle cx="39" cy="41" r="3.4" fill="#FFFFFF"/><circle cx="61" cy="41" r="3.4" fill="#FFFFFF"/><circle cx="39.6" cy="41.6" r="1.8" fill="${INK}"/><circle cx="60.4" cy="41.6" r="1.8" fill="${INK}"/>` +
      `<ellipse cx="50" cy="52" rx="4.5" ry="3" fill="${INK}"/><path d="M45 56 Q50 60 55 56" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<circle cx="29" cy="52" r="4" fill="#F29BA6" opacity=".6"/><circle cx="71" cy="52" r="4" fill="#F29BA6" opacity=".6"/>`,
    猴子: () => `<path d="M72 78 Q94 76 88 54 Q84 46 78 52" fill="none" ${sw(5)}/><ellipse cx="50" cy="76" rx="20" ry="16" fill="#8A5A2B" ${sw()}/>` +
      `<circle cx="24" cy="42" r="10" fill="#E8C49A" ${sw()}/><circle cx="76" cy="42" r="10" fill="#E8C49A" ${sw()}/><circle cx="50" cy="42" r="24" fill="#8A5A2B" ${sw()}/>` +
      `<path d="M34 42 Q34 30 44 32 Q50 36 56 32 Q66 30 66 42 Q66 60 50 60 Q34 60 34 42 Z" fill="#E8C49A" ${sw(2.5)}/>` + eyes(43, 57, 40) + `<path d="M44 52 Q50 56 56 52" fill="none" ${sw(2.5)}/>`,
    长颈鹿: () => `<path d="M46 70 L44 95 M56 72 L56 95 M76 70 L78 95 M86 66 L90 95" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M46 70 L44 95 M56 72 L56 95 M76 70 L78 95 M86 66 L90 95" stroke="#F2C14E" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M92 58 Q99 66 96 78" fill="none" ${sw(2.5)}/>` +
      `<ellipse cx="68" cy="62" rx="26" ry="14" fill="#F2C14E" ${sw()}/>` +
      `<path d="M44 62 L34 22 L46 18 L58 56 Z" fill="#F2C14E" ${sw()}/>` +
      `<path d="M40 22 Q44 32 48 42 Q52 50 56 56" fill="none" stroke="#B5651D" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M30 12 L29 4 M38 10 L39 2" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="29" cy="4" r="3" fill="#B5651D" ${sw(1.8)}/><circle cx="39" cy="2" r="3" fill="#B5651D" ${sw(1.8)}/>` +
      `<path d="M44 14 L52 10 L46 18 Z" fill="#F2C14E" ${sw(2)}/>` +
      `<ellipse cx="30" cy="20" rx="15" ry="10" fill="#F2C14E" ${sw()} transform="rotate(15 30 20)"/>` +
      `<ellipse cx="18" cy="24" rx="6" ry="5" fill="#E8C9A0" ${sw(2)}/><circle cx="16" cy="23" r="1.3" fill="${INK}"/>` +
      `<circle cx="32" cy="16" r="2.8" fill="${INK}"/><circle cx="33" cy="15" r="1" fill="#FFFFFF"/>` +
      [[60, 56], [74, 54], [86, 60], [66, 68], [80, 68], [44, 36], [48, 48]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="3.5" fill="#C9772E"/>`).join(''),
    老虎: () => `<circle cx="28" cy="24" r="9" fill="#F28C28" ${sw()}/><circle cx="72" cy="24" r="9" fill="#F28C28" ${sw()}/><circle cx="50" cy="50" r="30" fill="#F28C28" ${sw()}/>` +
      `<path d="M50 20 L50 32 M40 22 L42 32 M60 22 L58 32 M20 46 L32 48 M20 56 L32 56 M80 46 L68 48 M80 56 L68 56" ${sw(3)}/>` +
      `<ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFFFFF" ${sw(2.5)}/>` + eyes(40, 60, 46) + `<path d="M46 56 L54 56 L50 60 Z" fill="${INK}"/>`    ,
    // 豹：黄色的脸，身上有黑色的斑点
    豹: () => `<path d="M70 84 Q92 84 90 62" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M70 84 Q92 84 90 62" fill="none" stroke="#F2B53A" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="54" cy="76" rx="26" ry="15" fill="#F2B53A" ${sw()}/><circle cx="26" cy="28" r="8" fill="#F2B53A" ${sw()}/><circle cx="58" cy="28" r="8" fill="#F2B53A" ${sw()}/>` +
      `<circle cx="42" cy="46" r="24" fill="#F2B53A" ${sw()}/><ellipse cx="42" cy="56" rx="11" ry="8" fill="#FFF3DF" ${sw(2.5)}/>` + eyes(34, 50, 42) + `<path d="M39 52 L45 52 L42 56 Z" fill="${INK}"/>` +
      [[24, 36], [60, 38], [28, 58], [58, 58], [46, 72], [62, 70], [76, 76], [52, 84], [34, 26], [50, 25]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${INK}"/>`).join(''),
    // 犀牛：灰色，鼻子上有角
    犀牛: () => `<path d="M34 72 L34 90 M48 74 L48 90 M70 74 L70 90 M82 72 L82 90" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M34 72 L34 90 M48 74 L48 90 M70 74 L70 90 M82 72 L82 90" stroke="#9AA5B1" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M92 56 Q98 60 96 68" fill="none" ${sw(2.5)}/>` +
      `<ellipse cx="62" cy="60" rx="32" ry="20" fill="#9AA5B1" ${sw()}/>` +
      `<path d="M36 46 Q24 44 14 52 Q6 58 8 66 Q12 74 24 74 Q34 74 40 68 Z" fill="#9AA5B1" ${sw()}/>` +
      `<path d="M12 56 Q6 40 10 30 Q16 44 20 54 Z" fill="#E9E2D4" ${sw(2.5)}/><path d="M24 50 Q22 42 26 38 Q28 46 30 50 Z" fill="#E9E2D4" ${sw(2.2)}/>` +
      `<path d="M38 44 L40 34 L46 42 Z" fill="#9AA5B1" ${sw(2.5)}/>` +
      `<circle cx="30" cy="56" r="2.8" fill="${INK}"/><circle cx="31" cy="55" r="1" fill="#FFFFFF"/><path d="M10 66 Q14 68 18 66" fill="none" ${sw(2)}/>` +
      `<path d="M50 48 Q52 60 50 72 M76 46 Q78 58 76 72" fill="none" stroke="#7E8A96" stroke-width="2.5" stroke-linecap="round"/>`,
    鳄鱼: () => `<path d="M30 66 L24 82 L36 82 Z M48 68 L46 84 L58 84 Z M66 66 L66 82 L78 82 Z" fill="#3E8E41" ${sw(2.5)}/>` +
      `<path d="M58 52 Q80 48 96 62 Q86 66 74 68 L58 70 Z" fill="#45A852" ${sw()}/>` +
      `<ellipse cx="50" cy="60" rx="26" ry="13" fill="#45A852" ${sw()}/>` +
      `<path d="M30 66 Q50 74 70 66" fill="none" stroke="#B7DC8C" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M34 48 L38 42 L42 48 M46 47 L50 41 L54 47 M58 48 L62 42 L66 48 M72 52 L76 47 L79 53" fill="#3E8E41" ${sw(2.2)}/>` +
      `<path d="M30 54 Q16 50 4 54 Q2 58 6 60 L30 62 Z" fill="#45A852" ${sw()}/>` +
      `<path d="M30 62 L6 62 Q2 66 6 70 Q18 72 30 68 Z" fill="#45A852" ${sw()}/>` +
      `<path d="M8 62 L10 58 L12 62 L14 58 L16 62 L18 58 L20 62 L22 58 L24 62" fill="#FFFFFF" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<path d="M8 62 L10 66 L12 62 L14 66 L16 62 L18 66 L20 62" fill="#FFFFFF" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<circle cx="24" cy="46" r="7" fill="#45A852" ${sw(2.5)}/><circle cx="24" cy="46" r="3.5" fill="#FFFFFF"/><circle cx="23" cy="46" r="2" fill="${INK}"/>` +
      `<circle cx="6" cy="52" r="1.5" fill="${INK}"/>`,
    骆驼: () => `<path d="M34 92 L34 66 M44 92 L44 68 M66 92 L66 68 M76 92 L76 66" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M34 92 L34 66 M44 92 L44 68 M66 92 L66 68 M76 92 L76 66" stroke="#D4A560" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M28 66 Q28 50 40 48 Q46 28 54 46 Q62 28 70 48 Q82 50 82 66 Z" fill="#D4A560" ${sw()}/>` +
      `<path d="M30 58 Q22 50 22 30 L14 26 Q10 18 20 16 L28 18 Q32 30 34 52" fill="#D4A560" ${sw()}/><circle cx="20" cy="21" r="2.5" fill="${INK}"/><path d="M84 60 Q92 66 88 76" fill="none" ${sw(3)}/>`,
    // 熊：咖啡色（不是熊猫）
    熊: () => `<circle cx="27" cy="22" r="11" fill="#8A5A2B" ${sw()}/><circle cx="73" cy="22" r="11" fill="#8A5A2B" ${sw()}/><circle cx="27" cy="22" r="5" fill="#C9956A"/><circle cx="73" cy="22" r="5" fill="#C9956A"/>` +
      `<ellipse cx="50" cy="78" rx="28" ry="18" fill="#8A5A2B" ${sw()}/><ellipse cx="50" cy="80" rx="14" ry="10" fill="#C9956A"/>` +
      `<circle cx="50" cy="44" r="27" fill="#8A5A2B" ${sw()}/><ellipse cx="50" cy="54" rx="12" ry="9" fill="#C9956A" ${sw(2.5)}/><ellipse cx="50" cy="50" rx="5" ry="3.5" fill="${INK}"/>` +
      `<circle cx="40" cy="40" r="6" fill="#FFFFFF"/><circle cx="60" cy="40" r="6" fill="#FFFFFF"/>` + eyes(40, 60, 40) + `<path d="M45 58 Q50 62 55 58" fill="none" ${sw(2)}/>`,
    // 斑马：白色，黑色条纹
    斑马: () => `<path d="M42 70 L40 95 M52 72 L52 95 M74 72 L74 95 M84 68 L86 95" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M42 70 L40 95 M52 72 L52 95 M74 72 L74 95 M84 68 L86 95" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M38 80 L46 80 M48 84 L56 84 M70 82 L78 82 M80 80 L90 80" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M90 56 Q99 62 95 76" fill="none" ${sw(2.5)}/><path d="M93 72 L97 80 L91 78 Z" fill="${INK}"/>` +
      `<ellipse cx="64" cy="60" rx="28" ry="15" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M50 47 Q46 60 52 74 M60 46 Q56 60 60 75 M70 46 Q66 60 70 75 M80 48 Q76 60 80 73" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M42 60 L30 26 L42 20 L56 52 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M34 34 L44 32 M37 42 L48 39 M40 50 L52 47" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>` +
      `<path d="M36 16 Q46 22 48 34 Q52 44 56 52" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M30 20 L30 8 L37 17 Z" fill="#FFFFFF" ${sw(2.2)}/>` +
      `<ellipse cx="26" cy="31" rx="16" ry="9" fill="#FFFFFF" ${sw()} transform="rotate(-55 26 31)"/>` +
      `<path d="M32 26 L38 30 M20 34 L28 38" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="17" cy="42" rx="6" ry="7" fill="#3A3A3A" ${sw(2)} transform="rotate(-55 17 42)"/>` +
      `<circle cx="27" cy="25" r="2.6" fill="${INK}"/><circle cx="28" cy="24" r="0.9" fill="#FFFFFF"/>`,
    蜜蜂: () => `<ellipse cx="38" cy="32" rx="14" ry="20" fill="#DDF1FB" ${sw(3)} transform="rotate(-25 38 32)"/><ellipse cx="60" cy="30" rx="14" ry="20" fill="#DDF1FB" ${sw(3)} transform="rotate(20 60 30)"/>` +
      `<path d="M84 60 L96 62 L84 66 Z" fill="${INK}"/><ellipse cx="56" cy="62" rx="30" ry="22" fill="#F5C531" ${sw()}/>` +
      `<path d="M50 41 Q44 62 50 83 M64 42 Q58 62 64 82 M77 48 Q73 62 77 76" fill="none" stroke="${INK}" stroke-width="7"/>` +
      `<circle cx="26" cy="58" r="16" fill="#F5C531" ${sw()}/>` + eyes(20, 31, 55, 3) + `<path d="M20 64 Q26 68 31 64" fill="none" ${sw(2)}/><path d="M20 44 Q16 32 10 30 M30 43 Q32 32 38 28" fill="none" ${sw(2.5)}/>`,
    蚊子: () => `<path d="M34 58 L18 88 M44 60 L36 92 M56 60 L64 92 M64 58 L82 88" fill="none" ${sw(2.5)}/>` +
      `<ellipse cx="38" cy="34" rx="10" ry="22" fill="#E6F3FA" ${sw(2.5)} transform="rotate(-30 38 34)"/><ellipse cx="62" cy="34" rx="10" ry="22" fill="#E6F3FA" ${sw(2.5)} transform="rotate(30 62 34)"/>` +
      `<path d="M50 52 L90 62 Q96 66 90 68 L50 62 Z" fill="#9A8F86" ${sw(2.5)}/><path d="M60 56 L60 64 M70 58 L70 66 M80 60 L80 67" stroke="#FFFFFF" stroke-width="2.5"/>` +
      `<circle cx="42" cy="56" r="10" fill="#9A8F86" ${sw(2.5)}/><circle cx="28" cy="54" r="8" fill="#9A8F86" ${sw(2.5)}/><path d="M22 56 L4 66" ${sw(2.5)}/>` + eyes(26, 31, 51, 2.4),
    苍蝇: () => `<ellipse cx="34" cy="38" rx="13" ry="20" fill="#E6F3FA" ${sw(2.5)} transform="rotate(-35 34 38)"/><ellipse cx="66" cy="38" rx="13" ry="20" fill="#E6F3FA" ${sw(2.5)} transform="rotate(35 66 38)"/>` +
      `<path d="M38 66 L24 84 M46 70 L42 90 M54 70 L58 90 M62 66 L76 84" fill="none" ${sw(3)}/>` +
      `<ellipse cx="50" cy="64" rx="18" ry="16" fill="#3E4A3F" ${sw()}/><circle cx="50" cy="44" r="14" fill="#3E4A3F" ${sw()}/>` +
      `<circle cx="40" cy="40" r="8" fill="#C8372D" ${sw(2.5)}/><circle cx="60" cy="40" r="8" fill="#C8372D" ${sw(2.5)}/><circle cx="38" cy="37" r="2.2" fill="#FFFFFF"/><circle cx="58" cy="37" r="2.2" fill="#FFFFFF"/>`,
    萤火虫: () => `<circle cx="70" cy="66" r="26" fill="#FFF3A6" opacity=".75"/><circle cx="70" cy="66" r="17" fill="#FFE45C" opacity=".9"/>` +
      `<ellipse cx="42" cy="44" rx="12" ry="20" fill="#E6F3FA" ${sw(2.5)} transform="rotate(-50 42 44)"/>` +
      `<ellipse cx="56" cy="60" rx="26" ry="13" fill="#4A3B2E" ${sw()}/><ellipse cx="72" cy="64" rx="12" ry="10" fill="#FFE45C" ${sw(3)}/>` +
      `<circle cx="28" cy="56" r="12" fill="#E5483B" ${sw()}/>` + eyes(24, 32, 54, 2.6) + `<path d="M24 46 Q20 34 12 32 M30 45 Q34 34 42 30" fill="none" ${sw(2.5)}/><path d="M44 70 L38 84 M56 72 L54 86" ${sw(3)}/>`,
    蟋蟀: () => `<path d="M24 44 Q30 18 60 8 M28 42 Q40 22 74 18" fill="none" ${sw(2.5)}/>` +
      `<path d="M58 62 L80 34 L94 84" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 62 L80 34 L94 84" fill="none" stroke="#7A5A2A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<ellipse cx="54" cy="62" rx="30" ry="15" fill="#7A5A2A" ${sw()}/><path d="M34 54 Q56 46 82 60" fill="none" stroke="#A77D3D" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M38 74 L30 88 M50 76 L48 90 M62 76 L66 88" ${sw(3)}/><circle cx="26" cy="56" r="13" fill="#7A5A2A" ${sw()}/>` + eyes(22, 30, 53, 2.6),
    // ---- 水族馆（四年级 6 月）----
    鲸鱼: () => `<path d="M30 26 Q26 14 20 12 M30 26 Q30 12 34 6 M30 26 Q36 14 44 12" fill="none" stroke="#6FB7E0" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M82 54 L98 36 L96 60 L98 82 Z" fill="#3B78D8" ${sw()}/><path d="M8 58 Q8 32 40 32 Q74 32 86 58 Q74 84 40 84 Q8 84 8 58 Z" fill="#3B78D8" ${sw()}/>` +
      `<path d="M10 64 Q40 82 80 64 Q74 82 40 84 Q12 82 10 64 Z" fill="#CFE6F7" ${sw(2.5)}/><path d="M20 70 L24 80 M32 72 L34 82 M44 72 L44 83" stroke="#9CC4E4" stroke-width="2.5"/>` + eyes(28, 28, 52, 3.5) + `<path d="M48 64 Q56 72 64 66" fill="none" ${sw(2.5)}/>`,
    海豚: () => `<path d="M46 34 L56 16 L62 36 Z" fill="#7FA8C9" ${sw()}/><path d="M80 52 L96 38 L92 56 L98 72 Z" fill="#7FA8C9" ${sw()}/>` +
      `<path d="M4 60 L18 56 Q30 32 58 36 Q82 40 86 56 Q74 76 42 72 Q22 70 18 64 Z" fill="#7FA8C9" ${sw()}/>` +
      `<path d="M18 62 Q40 74 76 62 Q64 74 42 72 Q24 70 18 62 Z" fill="#E7F0F7" ${sw(2)}/><path d="M48 68 L40 84 L56 72 Z" fill="#7FA8C9" ${sw(2.5)}/>` + eyes(30, 30, 50, 3.2) + `<path d="M6 60 Q12 62 18 60" fill="none" ${sw(2)}/>`,
    螃蟹: () => `<ellipse cx="50" cy="60" rx="26" ry="18" fill="#E5483B" ${sw()}/><path d="M28 54 Q14 44 18 30 M72 54 Q86 44 82 30" fill="none" ${sw(4)}/><path d="M12 30 Q18 18 26 28 Q20 30 18 36 Z M88 30 Q82 18 74 28 Q80 30 82 36 Z" fill="#E5483B" ${sw(2.5)}/>` +
      `<path d="M30 70 L18 80 M36 74 L28 86 M70 70 L82 80 M64 74 L72 86" ${sw(3.5)}/><circle cx="42" cy="48" r="4" fill="#FFFFFF" ${sw(2)}/><circle cx="58" cy="48" r="4" fill="#FFFFFF" ${sw(2)}/><path d="M44 64 Q50 68 56 64" fill="none" ${sw(2)}/>`,
    鲨鱼: () => `<path d="M40 36 L54 8 L62 38 Z" fill="#8E99A6" ${sw()}/><path d="M82 52 L98 30 L94 56 L98 80 Z" fill="#8E99A6" ${sw()}/>` +
      `<path d="M4 56 Q14 34 50 36 Q78 38 88 56 Q76 76 46 76 Q14 76 4 56 Z" fill="#8E99A6" ${sw()}/><path d="M6 58 Q40 64 86 58 Q74 76 46 76 Q16 76 6 58 Z" fill="#F3F5F7" ${sw(2)}/>` +
      `<path d="M12 60 L16 66 L20 61 L24 67 L28 62 L32 67 L36 62" fill="#FFFFFF" ${sw(2)}/><path d="M50 68 L44 84 L60 72 Z" fill="#8E99A6" ${sw(2.5)}/><circle cx="24" cy="48" r="3.5" fill="${INK}"/><path d="M38 46 L38 56 M43 46 L43 56" ${sw(2)}/>`,
    水母: () => `<path d="M28 58 Q22 70 30 80 Q36 90 30 98 M42 60 Q38 74 46 84 Q50 92 46 98 M58 60 Q62 74 54 84 Q50 92 54 98 M72 58 Q78 70 70 80 Q64 90 70 98" fill="none" stroke="#C77DBB" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M14 58 Q14 14 50 14 Q86 14 86 58 Q78 64 68 58 Q59 64 50 58 Q41 64 32 58 Q22 64 14 58 Z" fill="#F4A6D7" ${sw()}/>` + eyes(40, 60, 40) + `<path d="M44 48 Q50 53 56 48" fill="none" ${sw(2.5)}/><ellipse cx="34" cy="26" rx="8" ry="4" fill="#FFFFFF" opacity=".7"/>`,
    海龟: () => `<ellipse cx="22" cy="46" rx="13" ry="7" fill="#9CCB6A" ${sw()}/><ellipse cx="80" cy="74" rx="10" ry="6" fill="#9CCB6A" ${sw()}/><ellipse cx="24" cy="76" rx="10" ry="6" fill="#9CCB6A" ${sw()}/><ellipse cx="76" cy="40" rx="12" ry="6" fill="#9CCB6A" ${sw()}/>` +
      `<circle cx="88" cy="58" r="10" fill="#9CCB6A" ${sw()}/><circle cx="91" cy="55" r="2.5" fill="${INK}"/>` +
      `<ellipse cx="50" cy="58" rx="32" ry="24" fill="#4E9A4A" ${sw()}/><path d="M50 40 L62 50 L58 66 L42 66 L38 50 Z" fill="#7DBA5C" ${sw(2.5)}/><path d="M50 40 L50 34 M62 50 L78 46 M58 66 L68 78 M42 66 L32 78 M38 50 L22 46" ${sw(2.5)}/>`,
    海星: () => {
      const P = (r, deg) => { const t = (deg - 90) * Math.PI / 180; return [(50 + Math.cos(t) * r).toFixed(1), (54 + Math.sin(t) * r).toFixed(1)]; };
      let d = 'M' + P(19, -36).join(' ');
      for (let k = 0; k < 5; k++) { const c = P(66, k * 72), e = P(19, k * 72 + 36); d += ` Q${c[0]} ${c[1]} ${e[0]} ${e[1]}`; }
      return `<path d="${d} Z" fill="#F28C28" ${sw()}/>` + eyes(44, 56, 50, 3) + `<path d="M46 58 Q50 61 54 58" fill="none" ${sw(2)}/>`;
    },
    章鱼: () => [18, 30, 42, 58, 70, 82].map((x, i) => `<path d="M${50 + (x - 50) * 0.5} 60 Q${x} 76 ${x + (i % 2 ? 6 : -6)} 92" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M${50 + (x - 50) * 0.5} 60 Q${x} 76 ${x + (i % 2 ? 6 : -6)} 92" fill="none" stroke="#9B6BC9" stroke-width="6" stroke-linecap="round"/>`).join('') +
      `<path d="M18 58 Q16 12 50 12 Q84 12 82 58 Q66 70 50 66 Q34 70 18 58 Z" fill="#9B6BC9" ${sw()}/>` + eyes(40, 60, 42, 4) + `<circle cx="50" cy="54" r="4" fill="#7A4FA8" ${sw(2)}/><circle cx="32" cy="26" r="3" fill="#C9A8E8"/><circle cx="66" cy="24" r="4" fill="#C9A8E8"/>`
  };
  // 动物园动物的大小（排大小用）：1 最小
  // 排大小只会一起出现不同等级的动物（同一级的不会一起出现）。长颈鹿高、大象重，放同一级，不会一起出现，免得学生搞混
  const SIZE = { 猴子: 1, 豹: 2, 熊猫: 2, 狮子: 3, 老虎: 3, 鳄鱼: 3, 熊: 4, 斑马: 4, 骆驼: 5, 犀牛: 6, 大象: 7, 长颈鹿: 7 };
  window.ANIMAL_ART = {
    svg: (k, c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${A[k](c)}</svg>`,
    has: k => !!A[k], size: SIZE
  };
})();
