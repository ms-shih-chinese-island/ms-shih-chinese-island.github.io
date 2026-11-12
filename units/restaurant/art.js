/* =====================================================================
   餐厅的图（宽高 100）：餐具、饮料、菜。六个餐厅游戏和图书馆都用这一份
   RART.svg('炒饭')   → 包好 <svg> 的图
   RART.g('炒饭')     → <g>（没有外面的 <svg>）
   RART.items['炒饭'] → 图书馆用
   （名字叫 RART，不是 ART：对话框要同时用小朋友的图 shared/kids.js，它用 window.ART）
   画风：Q 版、平涂、粗黑线
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const shine = (d, w = 5) => `<path d="${d}" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="${w}" stroke-linecap="round"/>`;
  const GREEN = '#5FAE3E', BROC = '#3F8F3A';

  // ---- 底：盘子、碗（侧面看，上面一个椭圆） ----
  const plate = (inside = '') =>
    `<ellipse cx="50" cy="76" rx="47" ry="17" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="74" rx="35" ry="11" fill="#EEF4F8"/>` +
    `<path d="M6 78 C10 88 30 93 50 93" fill="none" stroke="#4A86D0" stroke-width="2.5" stroke-dasharray="5 4"/>` + inside;
  // 碗：surface = 碗里面的颜色（汤、饭），top = 放在上面的东西
  const bowl = (surface, top = '') =>
    `<path d="M10 48 C12 76 30 90 50 90 C70 90 88 76 90 48 Z" fill="#FFFFFF" ${sw()}/>` +
    `<path d="M16 64 C30 70 70 70 84 64" fill="none" stroke="#4A86D0" stroke-width="4"/>` +
    `<path d="M24 74 C36 78 64 78 76 74" fill="none" stroke="#4A86D0" stroke-width="2.5" stroke-dasharray="4 5"/>` +
    `<ellipse cx="50" cy="48" rx="40" ry="11" fill="${surface || '#FFFFFF'}" ${sw()}/>` + top;
  // 汤碗：看得到比较多汤面（ry 17），汤里的东西才看得清楚
  const soupBowl = (surface, top = '') =>
    `<path d="M8 50 C10 78 30 94 50 94 C70 94 90 78 92 50 Z" fill="#FFFFFF" ${sw()}/>` +
    `<path d="M14 68 C30 75 70 75 86 68" fill="none" stroke="#4A86D0" stroke-width="4"/>` +
    `<path d="M24 80 C36 84 64 84 76 80" fill="none" stroke="#4A86D0" stroke-width="2.5" stroke-dasharray="4 5"/>` +
    `<ellipse cx="50" cy="50" rx="42" ry="17" fill="${surface}" ${sw()}/>` + top;
  const steamL = `<path d="M26 26 C20 20 32 16 26 8 M40 26 C34 20 46 16 40 8 M54 26 C48 20 60 16 54 8" fill="none" stroke="#B9C4CC" stroke-width="3.5" stroke-linecap="round"/>`;
  const steam = `<path d="M38 26 C32 20 44 16 38 8 M52 26 C46 20 58 16 52 8 M66 26 C60 20 72 16 66 8" fill="none" stroke="#B9C4CC" stroke-width="3.5" stroke-linecap="round"/>`;
  const dots = (pts, fill, r = 3) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');
  // 芥兰（中式的绿花椰）：一根浅绿的梗，上面一朵深绿的花
  const broccoli = (x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">` +
    `<path d="M-4 2 L-3 16 C-3 19 3 19 3 16 L4 2 Z" fill="#A9D18E" ${sw(2.5)}/>` +
    `<path d="M-12 2 C-18 0 -18 -9 -11 -10 C-12 -18 -2 -21 2 -15 C6 -21 16 -17 13 -9 C20 -8 19 2 12 3 C6 6 -6 6 -12 2 Z" fill="${BROC}" ${sw(2.5)}/>` +
    `<path d="M-6 -6 L-4 -4 M4 -9 L6 -7 M0 -1 L2 1" stroke="#2C6B2A" stroke-width="2.5" stroke-linecap="round"/></g>`;

  const DRAW = {
    // ===== 餐具 =====
    '筷子': () =>
      `<path d="M30 92 L62 8" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M30 92 L62 8" stroke="#D9A866" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M44 94 L76 10" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M44 94 L76 10" stroke="#C98B4E" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M58 20 L64 4 M72 22 L78 6" stroke="#E5483B" stroke-width="5" stroke-linecap="round"/>`,
    '碗': () => bowl('#F4F7FA') + shine('M22 62 C24 70 30 76 36 79'),
    '盘子': () => `<ellipse cx="50" cy="58" rx="46" ry="22" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="56" rx="32" ry="13" fill="#EEF4F8" stroke="#B9C4CC" stroke-width="2.5"/>` +
      `<path d="M8 58 C10 70 26 78 50 80" fill="none" stroke="#4A86D0" stroke-width="3" stroke-dasharray="5 5"/>`,
    '叉子': () =>
      `<path d="M50 96 L50 52" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="M50 96 L50 52" stroke="#C7CDD3" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M34 6 L34 34 C34 46 66 46 66 34 L66 6 M45 6 L45 30 M55 6 L55 30" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M34 6 L34 34 C34 46 66 46 66 34 L66 6 M45 6 L45 30 M55 6 L55 30" fill="none" stroke="#C7CDD3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    '刀子': () =>
      `<path d="M44 4 C62 10 64 34 60 56 L44 56 Z" fill="#DCE3E8" ${sw()}/>` + shine('M50 12 C56 20 57 34 56 48', 3) +
      `<rect x="41" y="54" width="20" height="42" rx="8" fill="#8A5A32" ${sw()}/><circle cx="51" cy="66" r="2.5" fill="#F5C531"/><circle cx="51" cy="84" r="2.5" fill="#F5C531"/>`,
    // 汤匙：银色的汤匙（跟叉子、刀子一样的颜色），椭圆形的匙、长长的柄
    '汤匙': () =>
      `<path d="M50 96 L50 50" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="M50 96 L50 50" stroke="#C7CDD3" stroke-width="7" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="28" rx="20" ry="25" fill="#DCE3E8" ${sw()}/>` +
      `<ellipse cx="50" cy="30" rx="13" ry="17" fill="#C7CDD3"/>` + shine('M42 18 C44 12 48 10 52 10', 4),
    // 杯子：一般喝水、喝果汁的马克杯：矮矮圆圆、有把手、看得到杯口里面是空的
    '杯子': () =>
      `<path d="M70 40 C94 38 94 76 70 74" fill="none" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="M70 40 C94 38 94 76 70 74" fill="none" stroke="#7FC4D8" stroke-width="6.5" stroke-linecap="round"/>` +
      `<path d="M16 30 L74 30 L70 84 C69 92 21 92 20 84 Z" fill="#7FC4D8" ${sw()}/>` +
      dots([[30, 48], [46, 58], [60, 46], [34, 72], [56, 76], [44, 40]], '#FFFFFF', 4) +
      `<ellipse cx="45" cy="30" rx="29" ry="8" fill="#FFFFFF" ${sw(3)}/><ellipse cx="45" cy="31" rx="23" ry="5" fill="#D9EEF5"/>` +
      shine('M25 40 L27 78', 4),
    '茶杯': () =>
      `<ellipse cx="50" cy="80" rx="40" ry="11" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="78" rx="28" ry="6" fill="#EEF4F8"/>` +
      `<path d="M24 46 L30 72 C32 80 68 80 70 72 L76 46 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M27 56 C40 61 60 61 73 56" fill="none" stroke="#4A86D0" stroke-width="4"/>` +
      `<circle cx="50" cy="66" r="4" fill="none" stroke="#4A86D0" stroke-width="2.5"/>` +
      `<ellipse cx="50" cy="46" rx="26" ry="7" fill="#F4F7FA" ${sw(3)}/>`,
    '茶壶': () =>
      `<path d="M24 50 C4 48 4 80 26 76" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M24 50 C4 48 4 80 26 76" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M72 56 C84 54 88 42 91 32 L100 37 C97 52 95 74 74 84 Z" fill="#FFFFFF" ${sw()}/><path d="M86 52 C90 46 92 42 94 38" stroke="#4A86D0" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M50 40 C28 40 18 54 18 66 C18 82 32 90 50 90 C68 90 82 82 82 66 C82 54 72 40 50 40 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M24 62 C36 56 64 56 76 62" fill="none" stroke="#4A86D0" stroke-width="4"/>` +
      `<path d="M34 72 C38 66 44 76 48 70 C52 64 58 76 62 70" fill="none" stroke="#4A86D0" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M30 42 C34 30 66 30 70 42 Z" fill="#FFFFFF" ${sw()}/><path d="M33 40 L67 40" stroke="#4A86D0" stroke-width="3"/>` +
      `<circle cx="50" cy="28" r="6" fill="#4A86D0" ${sw(3)}/>` + shine('M28 70 C28 62 32 56 38 53'),
    // ===== 饮料 =====
    '茶': () =>
      steam +
      `<ellipse cx="50" cy="80" rx="40" ry="11" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="78" rx="28" ry="6" fill="#EEF4F8"/>` +
      `<path d="M24 46 L30 72 C32 80 68 80 70 72 L76 46 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M27 56 C40 61 60 61 73 56" fill="none" stroke="#4A86D0" stroke-width="4"/>` +
      `<ellipse cx="50" cy="46" rx="26" ry="7" fill="#B5832F" ${sw(3)}/>` +
      // 茶包：泡在杯子里，一条线挂在杯边，外面一张小牌子写「茶」
      `<path d="M40 44 L44 52 L56 52 L58 44 Z" fill="#C98B4E" opacity=".7"/>` +
      `<path d="M52 45 C60 34 70 30 78 36 L80 52" fill="none" stroke="${K}" stroke-width="2"/>` +
      `<rect x="72" y="50" width="20" height="20" rx="3" fill="#E5483B" ${sw(2.5)}/><text x="82" y="65.5" text-anchor="middle" font-size="14" font-weight="700" fill="#FFFFFF" font-family="sans-serif">茶</text>`,
    '汽水': () =>
      `<path d="M28 16 L72 16 L72 90 L28 90 Z" fill="#E5483B" ${sw()}/>` +
      `<ellipse cx="50" cy="16" rx="22" ry="5" fill="#C7CDD3" ${sw(3)}/><path d="M28 84 L72 84" stroke="${K}" stroke-width="3"/>` +
      `<path d="M28 40 C40 34 60 46 72 40 L72 58 C60 64 40 52 28 58 Z" fill="#FFFFFF" stroke="${K}" stroke-width="2.5"/>` +
      shine('M34 22 L34 80', 4) + dots([[60, 28], [64, 70], [40, 72]], 'rgba(255,255,255,.7)', 3),
    '水': () =>
      `<path d="M24 16 L76 16 L70 90 L30 90 Z" fill="#DDF1FB" ${sw()}/>` +
      `<path d="M26 36 L74 36 L70 88 L30 88 Z" fill="#9AD3F0"/>` +
      `<rect x="36" y="44" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#7FB8D6" stroke-width="2.5" transform="rotate(12 44 52)"/>` +
      `<rect x="52" y="58" width="14" height="14" rx="3" fill="#FFFFFF" stroke="#7FB8D6" stroke-width="2.5" transform="rotate(-10 59 65)"/>` +
      `<path d="M24 16 L76 16 L70 90 L30 90 Z" fill="none" ${sw()}/>` + shine('M32 24 L36 82', 4),
    '果汁': () =>
      `<path d="M60 4 L52 40" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M60 4 L52 40" stroke="#4FB0D8" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M24 22 L76 22 L70 90 L30 90 Z" fill="#F7A33A" ${sw()}/>` +
      `<path d="M24 22 L76 22 L75 32 L25 32 Z" fill="#FCD37E"/>` + `<path d="M24 22 L76 22 L70 90 L30 90 Z" fill="none" ${sw()}/>` +
      `<path d="M64 26 A16 16 0 0 1 92 30 Z" fill="#F28C28" ${sw(3)}/>` + shine('M32 34 L36 82', 4),
    // ===== 中国菜 =====
    // 春卷：两条胖胖的炸春卷（皮上有小泡泡），一条斜切开，看得到里面的高丽菜和红萝卜；旁边一小碟甜辣酱
    '春卷': () => plate(
      `<ellipse cx="82" cy="72" rx="12" ry="5" fill="#FFFFFF" ${sw(2.5)}/><ellipse cx="82" cy="71" rx="8" ry="3" fill="#E5483B"/>` +
      `<g transform="rotate(-18 40 56)"><path d="M10 48 C10 40 18 38 24 38 L64 38 C70 38 72 46 72 50 C72 56 70 62 64 62 L24 62 C18 62 10 58 10 48 Z" fill="#E9A646" ${sw()}/>` +
      dots([[22, 44], [32, 50], [44, 44], [54, 52], [62, 44], [28, 56], [48, 56]], '#F7CF7A', 2.6) +
      `<path d="M18 40 L16 60 M66 39 L68 61" stroke="#C47B24" stroke-width="2.5" stroke-linecap="round"/></g>` +
      `<g transform="rotate(-10 52 70)"><path d="M26 64 C26 58 32 56 36 56 L64 56 L72 76 L36 76 C32 76 26 72 26 64 Z" fill="#E9A646" ${sw()}/>` +
      dots([[36, 62], [46, 68], [56, 62], [40, 72]], '#F7CF7A', 2.6) +
      `<path d="M64 56 L72 76 C78 74 80 60 72 56 Z" fill="#F7EBC8" ${sw(2.5)}/><path d="M68 62 L72 70" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/><path d="M71 60 L74 66" stroke="#F28C28" stroke-width="3" stroke-linecap="round"/></g>`),
    // 饺子：水饺，白白胖胖、像元宝的形状，上面一排皱皱的褶子；旁边一小碟酱油
    '饺子': () => plate(
      `<ellipse cx="80" cy="74" rx="11" ry="5" fill="#FFFFFF" ${sw(2.5)}/><ellipse cx="80" cy="73" rx="7" ry="3" fill="#5A3A1E"/>` +
      [[36, 62], [58, 62], [24, 71], [47, 74]].map(([x, y]) => `<path d="M${x - 17} ${y + 4} C${x - 16} ${y - 4} ${x - 8} ${y - 14} ${x} ${y - 14} C${x + 8} ${y - 14} ${x + 16} ${y - 4} ${x + 17} ${y + 4} C${x + 8} ${y + 9} ${x - 8} ${y + 9} ${x - 17} ${y + 4} Z" fill="#FFFFFF" ${sw(3)}/>` +
        `<path d="M${x - 10} ${y - 8} Q${x - 7} ${y - 13} ${x - 4} ${y - 9} Q${x - 1} ${y - 15} ${x + 2} ${y - 9} Q${x + 5} ${y - 14} ${x + 8} ${y - 8}" fill="none" stroke="#C9B48A" stroke-width="2.2" stroke-linecap="round"/>` +
        `<path d="M${x - 9} ${y} C${x - 6} ${y - 2} ${x - 3} ${y - 2} ${x - 1} ${y}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2"/>`).join('')),
    '点心': () =>
      `<path d="M12 50 L14 80 C14 88 86 88 86 80 L88 50 Z" fill="#E2B56B" ${sw()}/>` +
      `<path d="M13 62 L87 62 M14 74 L86 74" stroke="#B8893F" stroke-width="3"/>` +
      `<ellipse cx="50" cy="50" rx="38" ry="10" fill="#F3D9A4" ${sw(3)}/>` +
      [[32, 44], [50, 40], [68, 44]].map(([x, y]) => `<path d="M${x - 10} ${y + 6} L${x - 9} ${y - 8} C${x - 4} ${y - 12} ${x + 4} ${y - 12} ${x + 9} ${y - 8} L${x + 10} ${y + 6} Z" fill="#FFF1D2" ${sw(2.5)}/>` +
        `<circle cx="${x}" cy="${y - 9}" r="3.5" fill="#F28C28" ${sw(1.5)}/>`).join(''),
    '白饭': () => bowl('#FFFFFF', `<path d="M16 48 C18 28 40 22 50 22 C60 22 82 28 84 48 Z" fill="#FFFFFF" ${sw()}/>` +
      dots([[34, 36], [44, 30], [56, 32], [64, 40], [42, 42], [54, 42], [28, 44], [70, 46]], '#E3E8EC', 2.5)),
    // 炒饭：盘子上一座圆圆的金黄色饭（像用碗扣出来的），满满细细的米粒，
    //       点缀青豆、红萝卜丁、炒蛋、葱花；一支白色的汤匙插在饭里
    '炒饭': () => {
      const top = 'M12 76 C12 50 28 30 50 30 C72 30 88 50 88 76 C70 84 30 84 12 76 Z';
      const g = [];
      let k = 0;
      for (let y = 34; y <= 78; y += 3.6) {
        for (let x = 12 + ((k % 2) ? 2.2 : 0); x <= 88; x += 4.6) {
          const rot = (k * 53) % 180, c = k % 3 === 0 ? '#FFFFFF' : k % 3 === 1 ? '#FFF2C4' : '#F7DE92'; k++;
          g.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.4" ry="1.3" fill="${c}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
        }
      }
      return plate(`<clipPath id="friedRiceClip"><path d="${top}"/></clipPath><path d="${top}" fill="#E7B550"/>` +
        `<g clip-path="url(#friedRiceClip)">${g.join('')}` +
        // 炒蛋：一块一块黄色
        [[34, 50], [60, 44], [70, 64], [42, 68], [52, 56]].map(([x, y]) => `<path d="M${x - 5} ${y} C${x - 5} ${y - 4} ${x} ${y - 5} ${x + 3} ${y - 3} C${x + 6} ${y - 2} ${x + 5} ${y + 3} ${x + 1} ${y + 3} C${x - 2} ${y + 4} ${x - 5} ${y + 3} ${x - 5} ${y} Z" fill="#FFD43B" stroke="#D99A1E" stroke-width="1"/>`).join('') +
        // 青豆
        [[28, 62], [46, 42], [56, 66], [66, 52], [38, 58], [76, 70], [24, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#5FAE3E" stroke="#2C6B2A" stroke-width="1"/>`).join('') +
        // 红萝卜丁
        [[40, 48], [62, 58], [30, 70], [50, 74], [72, 48]].map(([x, y]) => `<rect x="${x - 2.4}" y="${y - 2.4}" width="4.8" height="4.8" rx=".8" fill="#F28C28" stroke="#B85E14" stroke-width="1"/>`).join('') +
        // 葱花
        [[54, 36], [36, 40], [64, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="none" stroke="#3F8F3A" stroke-width="1.6"/>`).join('') +
        `</g><path d="${top}" fill="none" ${sw()}/>` +
        shine('M24 56 C26 46 32 40 38 37', 4)) +
        // 汤匙
        `<path d="M58 40 L80 10" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M58 40 L80 10" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>` +
        `<path d="M52 44 C48 36 54 30 60 32 C66 34 66 42 60 46 C57 48 54 47 52 44 Z" fill="#FFFFFF" ${sw(2.5)}/>`;
    },
    // 捞面：盘子上一堆黄色的面，筷子夹起一把面条（一看就知道是面），有青菜和红萝卜丝
    '捞面': () => plate(
      `<path d="M12 74 C12 54 30 44 50 44 C70 44 88 54 88 74 C70 82 30 82 12 74 Z" fill="#F2C76B" ${sw()}/>` +
      `<g fill="none" stroke="#C98B2E" stroke-width="2.6" stroke-linecap="round">` +
      `<path d="M18 70 C26 58 34 74 42 60 C48 52 56 70 64 58 C70 50 78 64 84 68"/>` +
      `<path d="M22 62 C30 52 38 64 46 52 C52 46 60 60 68 50 C72 46 78 54 80 58"/>` +
      `<path d="M16 74 C28 68 36 78 48 70 C58 64 66 78 80 70"/></g>` +
      `<path d="M26 58 C30 54 36 56 34 60 C30 62 27 61 26 58 Z M64 66 C68 62 74 64 72 68 C68 70 65 69 64 66 Z" fill="${GREEN}" ${sw(2)}/>` +
      `<path d="M40 70 L48 66 M70 58 L76 60" stroke="#F28C28" stroke-width="3" stroke-linecap="round"/>`) +
      // 夹起来的面条
      `<g fill="none" stroke-linecap="round"><path d="M44 52 C42 40 46 32 44 22 M50 52 C50 40 52 30 50 20 M56 52 C58 42 54 32 56 22 M62 50 C62 40 60 32 61 24" stroke="${K}" stroke-width="6"/>` +
      `<path d="M44 52 C42 40 46 32 44 22 M50 52 C50 40 52 30 50 20 M56 52 C58 42 54 32 56 22 M62 50 C62 40 60 32 61 24" stroke="#F2C76B" stroke-width="3"/></g>` +
      `<path d="M28 18 L84 8" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M28 18 L84 8" stroke="#D9A866" stroke-width="4.5" stroke-linecap="round"/>` +
      `<path d="M30 26 L86 22" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M30 26 L86 22" stroke="#C98B4E" stroke-width="4.5" stroke-linecap="round"/>`,
    // 芥兰鸡肉／芥兰牛肉：炒在一起的一盘，咖啡色亮亮的酱汁；肉在前面、大大块的看得很清楚，芥兰（绿花椰）在后面和旁边
    //   鸡肉：浅黄白色的一块一块（有一点焦边）；牛肉：深咖啡色的薄片（有亮光）
    '芥兰鸡肉': () => plate(`<path d="M10 76 C12 58 30 50 50 50 C70 50 88 58 90 76 C70 84 30 84 10 76 Z" fill="#B87A3A" ${sw(2.5)}/>` +
      broccoli(22, 56, .8, -20) + broccoli(78, 56, .8, 20) + broccoli(50, 48, .85) +
      [[30, 66, -12], [50, 62, 6], [68, 66, 14], [40, 74, 4], [60, 75, -8]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">` +
        `<path d="M${x - 9} ${y - 5} C${x - 3} ${y - 9} ${x + 6} ${y - 8} ${x + 9} ${y - 3} C${x + 11} ${y + 3} ${x + 6} ${y + 7} ${x} ${y + 7} C${x - 7} ${y + 7} ${x - 12} ${y + 2} ${x - 9} ${y - 5} Z" fill="#F6E3B4" ${sw(2.2)}/>` +
        `<path d="M${x - 6} ${y + 4} C${x - 2} ${y + 6} ${x + 4} ${y + 6} ${x + 7} ${y + 2}" fill="none" stroke="#D9A45A" stroke-width="2.2" stroke-linecap="round"/>` +
        `<path d="M${x - 5} ${y - 4} L${x + 3} ${y - 5}" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/></g>`).join('')),
    '芥兰牛肉': () => plate(`<path d="M10 76 C12 58 30 50 50 50 C70 50 88 58 90 76 C70 84 30 84 10 76 Z" fill="#8A5428" ${sw(2.5)}/>` +
      broccoli(22, 56, .8, -20) + broccoli(78, 56, .8, 20) + broccoli(50, 48, .85) +
      [[28, 66, -18], [48, 62, 8], [68, 66, 18], [38, 74, 6], [60, 75, -10]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">` +
        `<path d="M${x - 12} ${y - 2} C${x - 8} ${y - 7} ${x + 8} ${y - 7} ${x + 12} ${y - 3} C${x + 13} ${y + 1} ${x + 8} ${y + 5} ${x} ${y + 5} C${x - 8} ${y + 5} ${x - 14} ${y + 2} ${x - 12} ${y - 2} Z" fill="#6B3418" ${sw(2.2)}/>` +
        `<path d="M${x - 7} ${y - 3} C${x - 2} ${y - 5} ${x + 4} ${y - 5} ${x + 8} ${y - 3}" fill="none" stroke="#B9774A" stroke-width="2" stroke-linecap="round"/></g>`).join('')),
    // 麻婆豆腐：浅盘里满满红红的辣油酱，一块一块白色的豆腐方块（看得到立体的面），咖啡色的绞肉、绿色的葱花
    '麻婆豆腐': () => {
      const cube = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` +
        `<path d="M-8 -3 L0 -7 L8 -3 L0 1 Z" fill="#FFFFFF" ${sw(1.8)}/><path d="M-8 -3 L0 1 L0 10 L-8 6 Z" fill="#F3E9D2" ${sw(1.8)}/><path d="M8 -3 L0 1 L0 10 L8 6 Z" fill="#E6D6B4" ${sw(1.8)}/></g>`;
      return `<path d="M6 54 C8 76 28 88 50 88 C72 88 92 76 94 54 Z" fill="#FFFFFF" ${sw()}/>` +
        `<path d="M12 70 C30 77 70 77 88 70" fill="none" stroke="#4A86D0" stroke-width="3.5"/>` +
        `<ellipse cx="50" cy="54" rx="44" ry="20" fill="#C9301C" ${sw()}/>` +
        `<ellipse cx="34" cy="50" rx="10" ry="3" fill="#F06A2A" opacity=".8"/><ellipse cx="66" cy="62" rx="9" ry="2.6" fill="#F06A2A" opacity=".8"/>` +
        [[28, 52], [46, 46], [64, 48], [38, 62], [58, 60], [76, 56], [50, 70]].map(([x, y]) => cube(x, y)).join('') +
        dots([[36, 46], [56, 54], [70, 64], [24, 60], [44, 56], [62, 42], [80, 50]], '#6B3A1E', 2.2) +
        [[52, 40], [32, 58], [70, 54], [46, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="none" stroke="#5FAE3E" stroke-width="2"/>`).join('');
    },
    // 酸辣汤：深红咖啡色的浓汤，白豆腐条、黑木耳、红辣椒片；碗边一根红辣椒（辣！）
    '酸辣汤': () => steamL + soupBowl('#9A3B1C',
      `<path d="M26 50 L40 46 M46 56 L60 52 M56 42 L70 45 M30 58 L42 58" stroke="#FFF1D2" stroke-width="4.5" stroke-linecap="round"/>` +
      `<path d="M62 54 C66 50 72 52 70 57 C66 60 62 58 62 54 Z M36 44 C40 40 46 42 44 46 C40 49 36 48 36 44 Z" fill="#2E1A10"/>` +
      dots([[48, 46], [74, 52], [34, 52], [56, 60], [66, 46]], '#FF4A2A', 2.2)) +
      // 大大的红辣椒，斜躺在碗的右前方
      `<g transform="translate(86 26) rotate(-14) scale(-0.95 0.95)"><path d="M-6 2 C8 4 24 0 32 -14 C33 -17 30 -19 28 -16 C22 -8 10 -8 -6 -8 C-11 -7 -11 1 -6 2 Z" fill="#E5302A" ${sw(3)}/>` +
      `<path d="M2 -5 C10 -5 18 -6 25 -11" fill="none" stroke="#FF9A8A" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M-8 -6 C-12 -8 -14 -4 -11 -1 C-9 1 -6 0 -6 -3 Z" fill="${GREEN}" ${sw(2)}/><path d="M-11 -4 C-16 -8 -18 -14 -15 -18" fill="none" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path d="M-11 -4 C-16 -8 -18 -14 -15 -18" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/></g>`,
    // 蛋花汤：黄黄的汤里一条一条白黄色的蛋花，碗边放半个打开的蛋壳（看得到蛋黄）
    '蛋花汤': () => steamL + soupBowl('#F5D46A',
      `<path d="M22 50 C30 42 36 56 44 46 C50 40 56 54 64 46 C70 42 74 50 80 48 M30 58 C38 52 46 62 54 56 C60 52 66 60 72 56" fill="none" stroke="#FFFBE6" stroke-width="5" stroke-linecap="round"/>` +
      dots([[40, 52], [60, 52], [52, 42]], GREEN, 2.5)) +
      `<path d="M72 30 C72 18 80 12 86 12 C92 12 98 18 98 30 L94 26 L90 31 L86 25 L82 31 L78 26 Z" fill="#FFFFFF" ${sw(2.5)}/><ellipse cx="85" cy="22" rx="6" ry="5" fill="#F5B921"/>`,
    // 馄饨汤：清汤里三颗大馄饨（中间圆圆的肉馅，外面皱皱的皮、飘飘的尾巴）、葱花、紫菜；碗外一支汤匙舀着一颗馄饨
    '馄饨汤': () => {
      // 馄饨：像护士帽的三角形，白白的皮，上面鼓起来、下面两个角往后折，几条折痕（不画粉红肉馅，免得像蛋）
      const wonton = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` +
        `<path d="M-15 5 L-23 11 L-10 10 Z M15 5 L23 11 L10 10 Z" fill="#EFE6CF" ${sw(1.8)}/>` +
        `<path d="M-16 6 C-17 -4 -9 -12 0 -13 C9 -12 17 -4 16 6 C12 4 8 8 4 6 C0 9 -4 9 -6 6 C-10 8 -13 4 -16 6 Z" fill="#FFFBEF" ${sw(2)}/>` +
        `<path d="M-9 4 C-8 -3 -4 -8 0 -9 M9 4 C8 -3 4 -8 0 -9 M-12 2 C-5 -1 5 -1 12 2" fill="none" stroke="#CDBB92" stroke-width="1.6" stroke-linecap="round"/>` +
        `<path d="M-7 -8 C-4 -11 0 -11 3 -10" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/></g>`;
      return `<path d="M24 26 C18 20 30 16 24 8 M38 26 C32 20 44 16 38 8" fill="none" stroke="#B9C4CC" stroke-width="3.5" stroke-linecap="round"/>` + soupBowl('#E2B86A',
        wonton(30, 52, .8) + wonton(68, 52, .8) + wonton(49, 58, .85) +
        [[50, 44], [22, 60], [80, 50], [46, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="none" stroke="#3F8F3A" stroke-width="2.2"/>`).join('')) +
        // 碗外右上角：一颗大馄饨
        wonton(76, 22, .95);
    },
    '蔬菜汤': () => steamL + soupBowl('#F7E7A6',
      [[30, 50], [54, 58], [70, 48]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="#F28C28" ${sw(2)}/><ellipse cx="${x}" cy="${y}" rx="2.5" ry="1.8" fill="#FFC27A"/>`).join('') +
      broccoli(46, 42, .7, -10) + broccoli(76, 58, .55, 15) +
      dots([[38, 58], [62, 44], [24, 56], [66, 60]], '#F5C531', 3) +
      dots([[42, 52], [58, 50], [34, 44]], '#6BBF4A', 2.6)) +
      // 碗外右上角：一棵青江菜（白梗、绿叶）
      `<g transform="translate(84 20) rotate(18)"><path d="M-5 16 C-6 6 -5 -2 0 -4 C5 -2 6 6 5 16 C2 18 -2 18 -5 16 Z" fill="#E8F4D8" ${sw(2.2)}/>` +
      `<path d="M-2 4 C-14 2 -16 -12 -8 -16 C-3 -12 -2 -4 -2 4 Z" fill="${GREEN}" ${sw(2.2)}/><path d="M2 4 C14 2 16 -12 8 -16 C3 -12 2 -4 2 4 Z" fill="#3F8F3A" ${sw(2.2)}/>` +
      `<path d="M0 2 C-4 -6 -3 -16 0 -20 C3 -16 4 -6 0 2 Z" fill="#7CC456" ${sw(2.2)}/></g>`,
    // ===== 美国食物 =====
    '汉堡包': () =>
      `<path d="M16 50 C16 22 84 22 84 50 Z" fill="#E9A646" ${sw()}/>` + dots([[34, 36], [50, 32], [64, 38], [44, 42]], '#FFF3C2', 2.2) +
      `<path d="M12 52 L88 52 L84 60 L74 54 L64 60 L54 54 L44 60 L34 54 L24 60 L16 54 Z" fill="${GREEN}" ${sw(3)}/>` +
      `<rect x="14" y="58" width="72" height="12" rx="6" fill="#7A4A2A" ${sw()}/>` +
      `<path d="M14 72 L86 72 L82 80 L18 80 Z" fill="#F5C531" ${sw(3)}/>` +
      `<path d="M16 80 L84 80 C84 92 16 92 16 80 Z" fill="#E9A646" ${sw()}/>`,
    '热狗': () =>
      `<path d="M10 56 C10 40 90 40 90 56 C90 74 10 74 10 56 Z" fill="#E9A646" ${sw()}/>` +
      `<rect x="6" y="46" width="88" height="16" rx="8" fill="#C0563B" ${sw()}/>` +
      `<path d="M14 54 C22 46 28 60 36 52 C44 44 50 60 58 52 C66 44 72 60 80 52 L86 54" fill="none" stroke="#F5C531" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M16 64 C30 70 70 70 84 64" fill="none" stroke="#C47B24" stroke-width="3"/>`,
    '薯条': () =>
      [[30, 10], [40, 6], [50, 12], [60, 6], [70, 10], [36, 18], [64, 16]].map(([x, y]) => `<rect x="${x - 4}" y="${y}" width="9" height="46" rx="2" fill="#F5C531" ${sw(2.5)}/>`).join('') +
      `<path d="M18 40 L82 40 L74 92 L26 92 Z" fill="#E5483B" ${sw()}/>` +
      `<path d="M26 40 C36 52 64 52 74 40" fill="#E5483B" ${sw(3)}/><path d="M38 66 L62 66" stroke="#F5C531" stroke-width="5" stroke-linecap="round"/>`,
    '炸鸡': () =>
      [[36, 46, -30], [62, 50, 25]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})"><path d="M${x - 3} ${y + 14} L${x - 3} ${y + 34} M${x + 3} ${y + 14} L${x + 3} ${y + 34}" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M${x - 2} ${y + 14} L${x - 2} ${y + 33} M${x + 2} ${y + 14} L${x + 2} ${y + 33}" stroke="#FFF7E8" stroke-width="4" stroke-linecap="round"/>` +
        `<circle cx="${x - 4}" cy="${y + 36}" r="5" fill="#FFF7E8" ${sw(2.5)}/><circle cx="${x + 4}" cy="${y + 36}" r="5" fill="#FFF7E8" ${sw(2.5)}/>` +
        `<path d="M${x} ${y - 24} C${x + 22} ${y - 24} ${x + 22} ${y + 14} ${x + 6} ${y + 18} L${x - 6} ${y + 18} C${x - 22} ${y + 14} ${x - 22} ${y - 24} ${x} ${y - 24} Z" fill="#C47B24" ${sw()}/>` +
        dots([[x - 6, y - 8], [x + 6, y - 2], [x - 2, y + 8], [x + 8, y - 14]], '#E9A646', 2.5) + `</g>`).join(''),
    '三明治': () =>
      `<path d="M14 80 L50 18 L86 80 Z" fill="#F7E3B5" ${sw()}/>` +
      `<path d="M10 82 L50 30 L90 82" fill="none" stroke="${GREEN}" stroke-width="8" stroke-linejoin="round"/>` +
      `<path d="M14 82 L50 36 L86 82 Z" fill="#F28C9A" ${sw(3)}/>` +
      `<path d="M18 84 L50 44 L82 84 Z" fill="#F5C531" ${sw(3)}/>` +
      `<path d="M20 88 L50 50 L80 88 Z" fill="#F7E3B5" ${sw()}/><path d="M24 86 L50 54 L76 86" fill="none" stroke="#D9A866" stroke-width="3"/>`,
    // 牛排：盘子上一大块牛排，烤的格子纹，切开一角看得到粉红色的里面；旁边一副刀叉
    '牛排': () => plate(
      `<path d="M14 62 C12 46 32 38 52 41 C68 43 76 50 74 62 C72 72 34 76 22 72 C17 70 15 66 14 62 Z" fill="#7A3A1E" ${sw()}/>` +
      `<path d="M24 50 L58 66 M30 46 L66 62 M40 44 L70 56 M22 58 L46 70 M30 66 L42 46 M44 70 L56 44 M58 68 L66 48" stroke="#4A2010" stroke-width="2.6" stroke-linecap="round"/>` +
      // 切开的一角
      `<path d="M58 66 L74 60 C74 66 70 70 64 72 Z" fill="#E86A6A" ${sw(2)}/><path d="M60 67 L72 62" stroke="#F7B0A8" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M18 50 C24 44 30 42 36 42" fill="none" stroke="#FFF3E0" stroke-width="3.5" stroke-linecap="round"/>`) +
      // 刀叉
      `<g transform="rotate(12 86 60)"><rect x="83" y="34" width="6" height="40" rx="3" fill="#C7CDD3" ${sw(2.2)}/><path d="M80 22 L80 34 C80 38 92 38 92 34 L92 22 M86 22 L86 34" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/></g>` +
      `<g transform="rotate(-8 6 62)"><path d="M4 34 C10 36 10 52 9 58 L4 58 Z" fill="#E6EAEE" ${sw(2.2)}/><rect x="3" y="58" width="6" height="22" rx="3" fill="#8A5A2B" ${sw(2.2)}/></g>`,
    '沙拉': () => bowl('#8CC63F', `<path d="M18 48 C20 30 34 26 40 34 C44 24 58 24 62 34 C68 26 82 30 82 48 Z" fill="${GREEN}" ${sw(3)}/>` +
      `<circle cx="36" cy="42" r="6" fill="#E5483B" ${sw(2)}/><circle cx="62" cy="40" r="6" fill="#E5483B" ${sw(2)}/>` +
      `<path d="M48 36 C52 32 56 36 54 40" fill="none" stroke="#F4F1D0" stroke-width="4" stroke-linecap="round"/>` + dots([[46, 44], [70, 46]], '#F28C28', 3)),
    '比萨': () =>
      `<path d="M50 94 L12 20 C34 8 66 8 88 20 Z" fill="#F5C531" ${sw()}/>` +
      `<path d="M12 20 C34 8 66 8 88 20 L84 28 C62 18 38 18 16 28 Z" fill="#D9A04A" ${sw(3)}/>` +
      `<circle cx="40" cy="38" r="7" fill="#D9472B" ${sw(2.5)}/><circle cx="60" cy="40" r="7" fill="#D9472B" ${sw(2.5)}/><circle cx="50" cy="60" r="7" fill="#D9472B" ${sw(2.5)}/>` +
      dots([[46, 48], [56, 74], [32, 30], [68, 30]], GREEN, 2.5)
  };


  // ===== 重画、加记号（放在后面，盖过上面的） =====
  // 茶壶：壶嘴在左边
  { const tp = DRAW['茶壶']; DRAW['茶壶'] = () => `<g transform="translate(100 0) scale(-1 1)">${tp()}</g>`; }
  // 餐巾：一条红白格子的布餐巾，折成方方的，右上角往下翻一个角（露出白色的反面）
  DRAW['餐巾'] = () => {
    const sq = 'M14 50 L54 30 L90 52 L50 76 Z';
    let checks = '';
    for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) if ((a + b) % 2 === 0) {
      const P = (u, v) => [14 + u * (40 / 6) + v * (36 / 6), 50 - u * (20 / 6) + v * (26 / 6)];
      const [x1, y1] = P(a, b), [x2, y2] = P(a + 1, b), [x3, y3] = P(a + 1, b + 1), [x4, y4] = P(a, b + 1);
      checks += `<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} L${x4} ${y4} Z" fill="#E5483B" opacity=".85"/>`;
    }
    return `<path d="M14 56 L50 82 L90 58 L90 52 L50 76 L14 50 Z" fill="#E9E2D4" ${sw(2.5)}/>` +
      `<clipPath id="napClip"><path d="${sq}"/></clipPath><path d="${sq}" fill="#FFFFFF"/><g clip-path="url(#napClip)">${checks}</g>` +
      `<path d="${sq}" fill="none" ${sw()}/>` +
      `<path d="M66 37.5 L90 52 L72 54 Z" fill="#FFFFFF" ${sw(2.5)}/>` +
      `<path d="M20 52 L50 70 L84 52" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="3 3" opacity=".9"/>`;
  };
  // 锅贴：平底锅里四条长长的锅贴并排躺着，中间一条皱皱的折边，底下煎得金黄、连成一片脆皮
  DRAW['锅贴'] = () =>
    `<path d="M86 50 L99 40" stroke="${K}" stroke-width="11" stroke-linecap="round"/><path d="M86 50 L99 40" stroke="#8A5A2B" stroke-width="5.5" stroke-linecap="round"/>` +
    `<ellipse cx="46" cy="60" rx="43" ry="28" fill="#3A3A3A" ${sw()}/><ellipse cx="46" cy="58" rx="36" ry="22" fill="#5A5A5A"/>` +
    `<path d="M14 62 C16 48 30 40 46 40 C62 40 76 48 78 62 C70 74 22 74 14 62 Z" fill="#D9933A"/>` +
    [[24, 0], [38, 0], [52, 0], [66, 0]].map(([x]) => `<g transform="rotate(-12 ${x} 56)">` +
      `<path d="M${x - 6} 40 C${x - 9} 48 ${x - 9} 64 ${x - 6} 72 C${x - 3} 76 ${x + 3} 76 ${x + 6} 72 C${x + 9} 64 ${x + 9} 48 ${x + 6} 40 C${x + 3} 36 ${x - 3} 36 ${x - 6} 40 Z" fill="#F6E2B0" ${sw(2.4)}/>` +
      `<path d="M${x} 40 Q${x + 3} 44 ${x} 48 Q${x - 3} 52 ${x} 56 Q${x + 3} 60 ${x} 64 Q${x - 3} 68 ${x} 72" fill="none" stroke="#C9A060" stroke-width="2"/>` +
      `<path d="M${x - 8} 62 C${x - 8} 70 ${x - 4} 75 ${x} 75 C${x + 4} 75 ${x + 8} 70 ${x + 8} 62 C${x + 4} 66 ${x - 4} 66 ${x - 8} 62 Z" fill="#B5651D" stroke="${K}" stroke-width="1.8"/></g>`).join('') +
    shine('M12 52 C14 42 24 36 34 34', 4);
  // 糖醋排骨：一堆红亮亮、方方的排骨块，每块露出一截白色的骨头，淋着红色的酱、撒白芝麻
  DRAW['糖醋排骨'] = () => plate(
    `<path d="M12 76 C14 62 32 56 50 56 C68 56 86 62 88 76 C70 82 30 82 12 76 Z" fill="#B8321F" opacity=".75"/>` +
    [[26, 62, -15], [46, 56, 10], [66, 60, -8], [36, 72, 6], [58, 72, -14], [76, 70, 12]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">` +
      `<rect x="${x + 6}" y="${y - 3.5}" width="11" height="7" rx="3.5" fill="#FFF7E8" ${sw(2.2)}/>` +
      `<rect x="${x - 10}" y="${y - 8}" width="18" height="15" rx="5" fill="#8E2414" ${sw(2.4)}/>` +
      `<path d="M${x - 7} ${y - 4} L${x + 2} ${y - 5}" stroke="#E0705A" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="${x - 3}" cy="${y + 2}" rx="1.5" ry="1" fill="#FFFFFF"/><ellipse cx="${x + 3}" cy="${y - 1}" rx="1.5" ry="1" fill="#FFFFFF"/></g>`).join(''));
  // 芝麻鸡：一块一块形状不一样的炸鸡块（凹凹凸凸），裹着橘色亮亮的酱，上面满满白芝麻，旁边几段葱
  DRAW['芝麻鸡'] = () => {
    const pieces = [[28, 64, 0], [47, 58, 1], [66, 62, 2], [37, 73, 3], [57, 73, 4], [75, 71, 5], [52, 47, 6]];
    const blob = (x, y, k) => {
      const n = 7, pts = [];
      for (let t = 0; t < n; t++) { const a = t / n * Math.PI * 2, r = 8 + ((k * 7 + t * 5) % 5) * 1.1 - (t % 2) * 1.6; pts.push([x + Math.cos(a) * r * 1.15, y + Math.sin(a) * r * .9]); }
      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let t = 0; t < n; t++) { const p0 = pts[t], p1 = pts[(t + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; d += ` Q${p0[0].toFixed(1)} ${p0[1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`; }
      return d + ' Z';
    };
    return plate(pieces.map(([x, y, k]) =>
      `<path d="${blob(x, y, k)}" fill="#D9792A" ${sw(2.2)}/>` +
      `<path d="M${x - 5} ${y - 5} C${x - 2} ${y - 7} ${x + 2} ${y - 7} ${x + 4} ${y - 4}" fill="none" stroke="#F5B266" stroke-width="2" stroke-linecap="round"/>` +
      [[-4, -1], [2, -3], [5, 2], [-1, 3], [-6, 3], [3, 5]].map(([a, b], q) => `<ellipse cx="${x + a}" cy="${y + b}" rx="1.6" ry="1" fill="#FFFDF0" transform="rotate(${q * 40 + k * 20} ${x + a} ${y + b})"/>`).join('')).join('') +
      `<path d="M18 54 L27 51 M72 50 L81 53" stroke="${GREEN}" stroke-width="3.5" stroke-linecap="round"/>`);
  };
  // 意大利面：一大坨红红的番茄面（面条一条一条弯来弯去，看得很清楚），上面一片罗勒叶、一点起司；一支叉子卷着面
  DRAW['意大利面'] = () => plate(
    `<path d="M14 74 C10 62 22 52 36 52 C42 44 58 44 64 52 C78 52 90 62 86 74 C70 82 30 82 14 74 Z" fill="#D9542E" ${sw(2.8)}/>` +
    `<g fill="none" stroke-linecap="round"><g stroke="#8E2A14" stroke-width="4.2">` +
    `<path d="M18 70 C24 58 30 76 36 62 C40 52 46 72 52 60 C58 48 62 70 70 58 C74 52 80 64 84 70"/>` +
    `<path d="M22 63 C30 54 28 72 38 65 C48 58 44 52 56 55 C66 58 62 70 74 63"/>` +
    `<path d="M26 75 C34 67 42 79 50 70 C56 63 64 77 72 72 C76 70 80 74 83 76"/>` +
    `<path d="M36 56 C44 48 50 60 58 52 C62 49 66 54 68 56"/></g><g stroke="#F07A48" stroke-width="2">` +
    `<path d="M18 70 C24 58 30 76 36 62 C40 52 46 72 52 60 C58 48 62 70 70 58 C74 52 80 64 84 70"/>` +
    `<path d="M22 63 C30 54 28 72 38 65 C48 58 44 52 56 55 C66 58 62 70 74 63"/>` +
    `<path d="M26 75 C34 67 42 79 50 70 C56 63 64 77 72 72 C76 70 80 74 83 76"/>` +
    `<path d="M36 56 C44 48 50 60 58 52 C62 49 66 54 68 56"/></g></g>` +
    `<path d="M44 50 C48 44 56 46 54 51 C51 54 46 53 44 50 Z" fill="${GREEN}" ${sw(1.8)}/>` +
    dots([[34, 60], [60, 64], [48, 68], [70, 66]], '#FFF2B8', 2)) +
    // 叉子从上面插下来，卷起一团面，几条面从叉子垂到盘子里（像捞面的筷子夹面）
    `<g fill="none" stroke-linecap="round"><path d="M48 40 C47 46 49 50 47 56 M54 42 C54 48 52 52 54 58 M60 41 C61 47 59 51 61 57 M66 39 C66 45 68 49 66 55" stroke="#8E2A14" stroke-width="5"/>` +
    `<path d="M48 40 C47 46 49 50 47 56 M54 42 C54 48 52 52 54 58 M60 41 C61 47 59 51 61 57 M66 39 C66 45 68 49 66 55" stroke="#F07A48" stroke-width="2.4"/></g>` +
    `<path d="M76 4 L62 24" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M76 4 L62 24" stroke="#C7CDD3" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M54 22 L70 30 L66 36 L50 28 Z" fill="#C7CDD3" ${sw(2.4)}/>` +
    `<path d="M50 28 L46 36 M54 30 L50 38 M58 32 L54 40 M62 34 L58 42" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<ellipse cx="56" cy="38" rx="14" ry="7" fill="#D9542E" ${sw(2.4)}/>` +
    `<path d="M44 37 C50 33 58 41 66 36 M46 41 C52 38 60 44 68 39" fill="none" stroke="#8E2A14" stroke-width="2.2" stroke-linecap="round"/>`;

  // ===== 节日特餐（units/restaurant/words.js 的 UNIT.SPECIALS）：中秋节、感恩节、春节、端午节，还有万圣节送的糖果 =====
  // 月饼：盘子上两个金黄色的月饼，边是一圈一圈的花边，中间印一个圆框
  const cake = (x, y, r) => {
    let edge = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; edge += `<circle cx="${(x + r * Math.cos(a)).toFixed(1)}" cy="${(y + r * 0.55 * Math.sin(a)).toFixed(1)}" r="${(r * 0.28).toFixed(1)}" fill="#D9963F" ${sw(2.2)}/>`; }
    return edge + `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.55}" fill="#E9B05A" ${sw(2.5)}/>` +
      `<ellipse cx="${x}" cy="${y}" rx="${r * 0.55}" ry="${r * 0.3}" fill="none" stroke="#B9772E" stroke-width="2.5"/>` +
      `<path d="M${x - r * 0.25} ${y} L${x + r * 0.25} ${y} M${x} ${y - r * 0.15} L${x} ${y + r * 0.15}" stroke="#B9772E" stroke-width="2.2" stroke-linecap="round"/>`;
  };
  DRAW['月饼'] = () => plate(cake(36, 62, 18) + cake(62, 66, 20));
  // 火鸡：烤得金黄的火鸡，两只腿套着白色纸花
  DRAW['火鸡'] = () => plate(
    `<path d="M20 70 C14 50 30 34 50 34 C70 34 86 50 80 70 C70 78 30 78 20 70 Z" fill="#C9772E" ${sw()}/>` +
    shine('M32 46 C38 40 46 38 54 39') +
    `<path d="M24 56 C14 50 10 42 14 38" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M24 56 C14 50 10 42 14 38" fill="none" stroke="#B56622" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M76 56 C86 50 90 42 86 38" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M76 56 C86 50 90 42 86 38" fill="none" stroke="#B56622" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M8 36 L14 30 L20 36 L14 42 Z M80 36 L86 30 L92 36 L86 42 Z" fill="#FFFFFF" ${sw(2.2)}/>` +
    `<path d="M40 60 C46 64 54 64 60 60" fill="none" stroke="#9E5418" stroke-width="2.5" stroke-linecap="round"/>`);
  // 南瓜糕：一片南瓜派（橘色的派、咖啡色的派皮），上面一团鲜奶油
  DRAW['南瓜糕'] = () => plate(
    `<path d="M16 70 L74 44 L84 66 Z" fill="#E8A157" ${sw()}/>` +
    `<path d="M16 70 L74 44 L78 52 L22 74 Z" fill="#F28C28" ${sw(2.5)}/>` +
    `<path d="M74 44 Q86 48 84 66" fill="#C98E55" ${sw(3)}/>` +
    `<path d="M56 48 Q50 40 56 36 Q58 30 64 32 Q70 30 70 36 Q76 40 70 46 Z" fill="#FFFFFF" ${sw(2.5)}/>`);
  // 玉米：一根黄色的玉米，一格一格的玉米粒，两边绿色的叶子
  DRAW['玉米'] = () => {
    let k = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) k += `<ellipse cx="${30 + c * 8 + (r % 2) * 4}" cy="${46 + r * 7}" rx="3.4" ry="3" fill="#FFE07A" stroke="#C9961C" stroke-width="1.4"/>`;
    return plate(`<path d="M22 64 C14 54 18 40 30 40 L72 40 C84 40 86 54 78 64 Z" fill="#F5C531" ${sw()}/>` + k +
      `<path d="M78 64 C88 66 96 56 92 46 C88 54 82 56 74 54 Z" fill="#6DAA4F" ${sw(2.5)}/><path d="M76 40 C86 34 94 38 94 46 C88 42 82 44 76 48 Z" fill="#8CC46E" ${sw(2.5)}/>`);
  };
  // 番薯：两个长长的红紫色番薯，切开的那一头是橘色的
  DRAW['番薯'] = () => plate(
    `<path d="M14 62 C14 50 30 46 46 50 C56 52 62 56 62 62 C62 70 50 74 36 72 C22 70 14 68 14 62 Z" fill="#A9446A" ${sw()}/>` +
    `<path d="M40 70 C40 58 54 52 70 54 C80 56 88 60 88 66 C88 72 80 76 70 76 L46 76 Z" fill="#A9446A" ${sw()}/>` +
    `<ellipse cx="70" cy="66" rx="10" ry="8" fill="#F28C28" ${sw(2.5)}/><ellipse cx="70" cy="66" rx="5" ry="4" fill="#F7B267"/>` +
    shine('M22 56 C28 52 36 51 42 52', 4));
  // 鱼：长盘子上一条清蒸鱼，上面放绿色的葱丝（年年有余）
  DRAW['鱼'] = () =>
    `<ellipse cx="50" cy="72" rx="47" ry="20" fill="#FFFFFF" ${sw()}/><ellipse cx="50" cy="70" rx="38" ry="14" fill="#EEF4F8"/>` +
    `<path d="M20 66 C30 50 62 48 76 64 C62 80 30 80 20 66 Z" fill="#BFC8CF" ${sw()}/>` +
    `<path d="M76 64 L92 52 L90 76 Z" fill="#BFC8CF" ${sw()}/>` +
    `<circle cx="30" cy="62" r="3" fill="${K}"/><path d="M38 56 C42 62 42 70 38 74" fill="none" ${sw(2.5)}/>` +
    `<path d="M44 58 L66 62 M46 66 L70 66 M44 72 L64 70" stroke="#5FAE3E" stroke-width="3.2" stroke-linecap="round"/>` +
    `<path d="M50 56 L56 74" stroke="#F28C28" stroke-width="2.4" stroke-linecap="round"/>`;
  // 粽子：盘子上一个绿色的粽子（竹叶包成三角形），中间绑一条绳子
  DRAW['粽子'] = () => plate(
    `<path d="M50 22 Q55 22 58 28 L82 70 Q84 76 76 76 L24 76 Q16 76 18 70 L42 28 Q45 22 50 22 Z" fill="#6DAA4F" ${sw()}/>` +
    `<path d="M50 26 L38 74 M50 26 L62 74" stroke="#4E8A36" stroke-width="2.6" fill="none"/>` +
    `<path d="M24 58 Q50 66 76 58" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M24 58 Q50 66 76 58" fill="none" stroke="#D9B27A" stroke-width="3.5" stroke-linecap="round"/>` +
    shine('M44 36 Q48 32 52 34', 4));
  DRAW['猪肉粽子'] = DRAW['粽子'];   // 后面会加上猪肉、鸡肉的圆章
  DRAW['鸡肉粽子'] = DRAW['粽子'];
  // 糖果：三颗包着糖纸的糖果（两头扭起来）
  const candy = (x, y, c) => `<path d="M${x - 10} ${y} L${x - 20} ${y - 8} L${x - 20} ${y + 8} Z M${x + 10} ${y} L${x + 20} ${y - 8} L${x + 20} ${y + 8} Z" fill="${c}" ${sw(2.2)}/>` +
    `<ellipse cx="${x}" cy="${y}" rx="12" ry="9" fill="${c}" ${sw(2.5)}/><path d="M${x - 5} ${y - 4} Q${x} ${y - 7} ${x + 5} ${y - 4}" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2.5" stroke-linecap="round"/>`;
  DRAW['糖果'] = () => candy(30, 66, '#E5483B') + candy(70, 70, '#8E5CC2') + candy(50, 44, '#F28C28');

  const g = zh => DRAW[zh] ? `<g>${DRAW[zh]()}</g>` : '';
  const svg = zh => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g(zh)}</svg>`;
  const items = {};
  Object.keys(DRAW).forEach(z => { items[z] = svg(z); });
  // 餐厅：一碗饭、一双筷子
  items['餐厅'] = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(4 14) scale(.72)">${g('炒饭')}</g><g transform="translate(52 6) scale(.5)">${g('筷子')}</g></svg>`;
  // ---- 加料的小圆章（点菜算一算 Level 3）：鸡肉、牛肉、蔬菜 ----
  const BADGE = {
    '鸡肉': `<circle cx="0" cy="2" r="9" fill="#FFFFFF" ${sw(2.2)}/><path d="M-6 -6 C-6 -12 -2 -12 -1 -8 C0 -13 4 -13 4 -8 C6 -11 9 -9 7 -5 Z" fill="#E5302A" ${sw(1.8)}/>` +
      `<path d="M7 1 L14 3 L7 6 Z" fill="#F5A623" ${sw(1.8)}/><circle cx="3" cy="0" r="1.6" fill="${K}"/><path d="M5 7 C6 11 3 12 2 9" fill="#E5302A" ${sw(1.5)}/>`,
    '牛肉': `<path d="M-10 -6 C-16 -10 -16 -14 -12 -14 C-10 -10 -8 -9 -6 -8 Z M10 -6 C16 -10 16 -14 12 -14 C10 -10 8 -9 6 -8 Z" fill="#F2E6C8" ${sw(1.8)}/>` +
      `<ellipse cx="0" cy="0" rx="10" ry="9" fill="#8A5A2B" ${sw(2.2)}/><path d="M-4 -8 C-2 -4 2 -4 4 -8" fill="#FFFFFF" stroke="none"/>` +
      `<ellipse cx="0" cy="6" rx="7" ry="5" fill="#F4A9B8" ${sw(2)}/><circle cx="-2.5" cy="6" r="1.2" fill="${K}"/><circle cx="2.5" cy="6" r="1.2" fill="${K}"/>` +
      `<circle cx="-4" cy="-2" r="1.6" fill="${K}"/><circle cx="4" cy="-2" r="1.6" fill="${K}"/>`,
    '猪肉': `<path d="M-9 -6 L-12 -14 L-3 -9 Z M9 -6 L12 -14 L3 -9 Z" fill="#F08FA6" ${sw(1.8)}/>` +
      `<circle cx="0" cy="1" r="10" fill="#F7B3C2" ${sw(2.2)}/><ellipse cx="0" cy="4" rx="5.5" ry="4" fill="#F08FA6" ${sw(1.8)}/>` +
      `<circle cx="-2" cy="4" r="1.2" fill="${K}"/><circle cx="2" cy="4" r="1.2" fill="${K}"/><circle cx="-4" cy="-3" r="1.5" fill="${K}"/><circle cx="4" cy="-3" r="1.5" fill="${K}"/>`,
    '蔬菜': `<path d="M0 12 C-2 6 -2 0 0 -2 C2 0 2 6 0 12 Z" fill="#E8F4D8" ${sw(1.8)}/>` +
      `<path d="M-1 4 C-12 2 -14 -10 -6 -13 C-2 -10 -1 -4 -1 4 Z" fill="${GREEN}" ${sw(1.8)}/><path d="M1 4 C12 2 14 -10 6 -13 C2 -10 1 -4 1 4 Z" fill="#3F8F3A" ${sw(1.8)}/>` +
      `<path d="M0 2 C-3 -4 -2 -12 0 -15 C2 -12 3 -4 0 2 Z" fill="#7CC456" ${sw(1.8)}/>`
  };
  const badge = (zh, x = 80, y = 20, r = 17) => BADGE[zh] ? `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#FFF6D6" ${sw(2.5)}/><g transform="scale(${r / 17})">${BADGE[zh]}</g></g>` : '';
  // 肉的菜加圆章
  [['芥兰鸡肉', '鸡肉'], ['芥兰牛肉', '牛肉'], ['芝麻鸡', '鸡肉'], ['糖醋排骨', '猪肉'], ['猪肉粽子', '猪肉'], ['鸡肉粽子', '鸡肉']].forEach(([dish, meat]) => { const f = DRAW[dish]; if (f) DRAW[dish] = () => f() + badge(meat, 84, 16, 14); });
  // 组合菜：主食的图＋角落一个圆章，例如 combo('鸡肉', '炒饭')
  const combo = (fill, base) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g(base)}${badge(fill)}</svg>`;
  const badgeSvg = zh => `<svg viewBox="-20 -20 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${badge(zh, 0, 0, 17)}</svg>`;

  window.RART = { g, svg, items, has: zh => !!DRAW[zh], combo, badgeSvg };
})();
