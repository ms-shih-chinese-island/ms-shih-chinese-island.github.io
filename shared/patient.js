/* =====================================================================
   小病人：看医生、候诊室共用（240 × 350）
   穿短袖、短裤，手和脚先用圆圈；手指疼、脚趾头疼时旁边画一个放大镜圆圈。
   ShihPatient.svg({ zh, look, face, mark, side })  → 画好的 <svg> 里面的东西
     zh    哪个部位（背：会画成转过身）   look  ShihPatient.look() 随机的小朋友和衣服颜色
     face  'good' 笑、'hurt' 疼（＞＜）、'notgood' 不好
     mark  'arrow' 箭头（这是我的＿＿）、'pain' 疼的记号、不写 = 没有记号
   ShihPatient.tapHits(zh, [x, y], level)  点到的地方算不算那个部位
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const pick = a => a[Math.floor(Math.random() * a.length)];
  // ================= 小病人（240 × 350）：穿短袖、短裤，光着脚（看得到脚趾头） =================
  const SKIN = { light: '#FBDCC8', asian: '#F6D9B5', tan: '#C98E62' };
  const sw = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const limb = (d, c, w = 16) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w - 6}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function hand(x, y, s, dir, fingers) {  // dir = -1 左手、1 右手（大拇指朝外）；fingers：画出手指（只有「手指」的题目才画）
    if (!fingers) return `<circle cx="${x}" cy="${y + 2}" r="11" fill="${s}" ${sw(2.5)}/>`;
    let f = '';
    [-6.9, -2.3, 2.3, 6.9].forEach(dx => { f += `<ellipse cx="${x + dx}" cy="${y + 11}" rx="3.3" ry="5.4" fill="${s}" ${sw(2.2)}/>`; });
    // 先画手掌和大拇指，手指画在前面（下半截露出来），再用皮肤色把手指上半截跟手掌接起来
    return `<ellipse cx="${x + dir * 10}" cy="${y - 1}" rx="3.6" ry="5.6" transform="rotate(${dir * 35} ${x + dir * 10} ${y - 1})" fill="${s}" ${sw(2.2)}/>` +
      `<circle cx="${x}" cy="${y}" r="10.5" fill="${s}" ${sw(2.5)}/>` + f +
      `<ellipse cx="${x}" cy="${y + 2}" rx="9.2" ry="7.4" fill="${s}"/>`;
  }
  // 脚：先用一个圆圆的椭圆代替（脚趾头的题目先不出，之后再决定怎么画）
  function foot(x, s, dir) {
    return `<ellipse cx="${x + dir * 3}" cy="322" rx="15" ry="10" fill="${s}" ${sw(2.5)}/>`;
  }
  // 手指疼：右手举到胸前，手画得大大的、五根手指张开；hurt 时指尖红红的、旁边有疼的闪光
  const spark = (x, y, a) => `<path d="M${x} ${y} l${Math.cos(a) * 5} ${Math.sin(a) * 5} l${Math.cos(a + 1.2) * 4} ${Math.sin(a + 1.2) * 4} l${Math.cos(a) * 6} ${Math.sin(a) * 6}" fill="none" stroke="#E5483B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const FINGERS = [[-82, 22], [-32, 28], [-8, 32], [15, 28], [37, 22]];      // 大拇指、食指、中指、无名指、小指：角度（0 = 朝上）、长度
  // 手指疼：手还是圆圈，旁边一个放大镜圆圈，里面是一只张开的手（手掌朝前），疼的时候指尖红红的
  function fingerZoom(s, hurt) {
    const cx = 204, cy = 178, k = .62;
    let f = '', tips = '';
    FINGERS.forEach(([deg, len], i) => {
      const a = (deg - 90) * Math.PI / 180, r0 = (i ? 18 : 14) * k, L = len * k;
      const x0 = cx + Math.cos(a) * r0, y0 = cy + Math.sin(a) * r0, x1 = cx + Math.cos(a) * (r0 + L), y1 = cy + Math.sin(a) * (r0 + L);
      f += limb(`M${x0} ${y0} L${x1} ${y1}`, s, 11);
      if (hurt) tips += `<circle cx="${x1}" cy="${y1}" r="4" fill="#F26B5B" opacity=".85"/>` + spark(x1 + Math.cos(a) * 5, y1 + Math.sin(a) * 5, a);
    });
    return `<path d="M180 208 L190 202" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 5" stroke-linecap="round"/>` +
      `<circle cx="${cx}" cy="${cy - 6}" r="34" fill="#FFFFFF" ${sw(3)}/>` + f +
      `<ellipse cx="${cx}" cy="${cy + 2}" rx="15" ry="15.5" fill="${s}" ${sw(2.5)}/><ellipse cx="${cx}" cy="${cy + 2}" rx="12.5" ry="13" fill="${s}"/>` + tips +
      `<path d="M168 214 A6 6 0 0 0 178 214" fill="none" stroke="#E5483B" stroke-width="3" stroke-linecap="round"/>`;
  }
  // 脚趾头疼：脚还是圆圈，旁边一个放大镜圆圈，里面是从上面往下看的脚（像脚印），五个脚趾头排在前面；hurt 时脚趾头红红的
  function toeZoom(s, hurt) {
    const toes = [[184, 252, 6.6], [194.5, 246.5, 5.3], [203, 247.5, 4.8], [210, 252, 4.4], [215, 259, 4]];   // 右脚：大脚趾在左边（里面）
    let t = '', red = '';
    toes.forEach(([x, y, r], k) => {
      t += `<circle cx="${x}" cy="${y}" r="${r}" fill="${s}" ${sw(2.2)}/>`;
      if (hurt) red += `<circle cx="${x}" cy="${y}" r="${r - 1}" fill="#F26B5B" opacity=".8"/>` + spark(x + (k - 2) * 2, y - r - 2, -Math.PI / 2 + (k - 2) * .45);
    });
    return `<path d="M140 316 L170 290" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 5" stroke-linecap="round"/>` +
      `<circle cx="198" cy="274" r="40" fill="#FFFFFF" ${sw(3)}/>` +
      `<path d="M196 304 C184 304 180 290 182 278 C184 268 186 262 197 261 C210 260 215 268 214 278 C213 292 207 304 196 304 Z" fill="${s}" ${sw(2.5)}/>` + t + red +
      `<path d="M130 316 A6 6 0 0 1 142 316" fill="none" stroke="#E5483B" stroke-width="3" stroke-linecap="round"/>`;
  }
  // 表情：先用皮肤色盖掉原本的眼睛、嘴巴，再画这一题的表情
  function faceOf(state, s) {
    const e = (x, y) => `<circle cx="${x}" cy="${y}" r="3.3" fill="${INK}"/>`;
    const cheek = c => `<circle cx="103" cy="74" r="4.6" fill="${c}" opacity=".85"/><circle cx="137" cy="74" r="4.6" fill="${c}" opacity=".85"/>`;
    const line = d => `<path d="${d}" fill="none" ${sw(2.5)}/>`;
    let f = `<ellipse cx="120" cy="71" rx="21" ry="15" fill="${s}"/>`;
    switch (state) {
      case 'good': return f + e(110, 64) + e(130, 64) + cheek('#F4A7B9') + line('M112 77 Q120 85 128 77');
      case 'tired':   // 眼睛快闭起来、打哈欠
        return f + line('M105 65 Q110 68 115 65') + line('M125 65 Q130 68 135 65') + cheek('#E9C9D0') +
          `<ellipse cx="120" cy="80" rx="5" ry="6.5" fill="#B23B3B" ${sw(2.3)}/>`;
      case 'hot':     // 脸红红、眉毛皱起来、张嘴喘气（不是笑）
        return f + e(110, 65) + e(130, 65) + cheek('#F26B5B') + line('M104 57 L114 59') + line('M136 57 L126 59') +
          `<path d="M113 82 Q120 74 127 82 Z" fill="#B23B3B" ${sw(2.3)}/>`;
      case 'cold':    // 脸有点蓝、牙齿打颤
        return f + e(110, 64) + e(130, 64) + cheek('#9FC3EA') + line('M111 79 L114 76 L117 79 L120 76 L123 79 L126 76 L129 79');
      case 'thirsty': // 眉毛皱起来、嘴角往下、舌头伸出来（不是笑）
        return f + e(110, 65) + e(130, 65) + cheek('#E9B9C2') + line('M104 57 L114 59') + line('M136 57 L126 59') +
          `<path d="M116 79 Q120 91 124 79 Z" fill="#F28C9B" ${sw(2.2)}/><path d="M111 81 Q120 74 129 81" fill="none" ${sw(2.5)}/>`;
      case 'hurt':    // 疼：痛得眯眼睛（＞＜）、嘴角往下
        return f + line('M105 61 L113 65 L105 69') + line('M135 61 L127 65 L135 69') + cheek('#E9B9C2') + line('M112 82 Q120 75 128 82');
      default:        // 不好：眉毛皱起来、嘴角往下
        return f + e(110, 65) + e(130, 65) + cheek('#E9B9C2') + line('M104 57 L114 59') + line('M136 57 L126 59') + line('M112 82 Q120 75 128 82');
    }
  }
  function front(o) {
    const s = SKIN[o.p.skin] || SKIN.light;
    const head = ART.kid(Object.assign({}, o.p, { shirt: 'none' }), 'good')
      .replace('<svg ', '<svg x="50" y="0" width="140" height="140" ')
      .replace(/<path d="M28 140 Q28 104 70 101 Q112 104 112 140 Z"[^>]*\/>/, '');
    return limb('M106 236 L106 312', s, 18) + limb('M134 236 L134 312', s, 18) +
      `<path d="M101 270 Q106 275 111 270 M129 270 Q134 275 139 270" fill="none" ${sw(2)}/>` +
      foot(106, s, -1) + foot(134, s, 1) +
      `<path d="M88 196 L152 196 L154 242 L124 242 L120 216 L116 242 L86 242 Z" fill="${o.shorts}" ${sw()}/>` +
      limb('M86 126 L74 162 L68 198', s, 17) + hand(67, 206, s, -1) +
      limb('M154 126 L166 162 L172 198', s, 17) + hand(173, 206, s, 1) +
      `<path d="M88 106 Q120 98 152 106 L164 130 L150 138 L150 200 L90 200 L90 138 L76 130 Z" fill="${o.shirt}" ${sw()}/>` +
      `<path d="M108 103 Q120 112 132 103" fill="none" ${sw(2.5)}/>` +
      (o.pose === 'fingers' ? fingerZoom(s, o.hurt) : '') + (o.pose === 'toes' ? toeZoom(s, o.hurt) : '') +
      head + faceOf(o.face || 'good', s) + `<path d="M120 66 Q124 71 119 73" fill="none" ${sw(2.2)}/>`;   // 鼻子
  }
  function back(o) {                       // 背：从后面看
    const s = SKIN[o.p.skin] || SKIN.light, hc = { black: '#2E2A2A', brown: '#7A4B2A', blonde: '#E8C25A', red: '#C0602E', dark: '#4A3424' }[o.p.hairColor] || '#2E2A2A';
    return limb('M106 236 L106 312', s, 18) + limb('M134 236 L134 312', s, 18) +
      foot(106, s, -1) + foot(134, s, 1) +      // 从后面看，脚一样用圆圈
      `<path d="M88 196 L152 196 L154 242 L124 242 L120 216 L116 242 L86 242 Z" fill="${o.shorts}" ${sw()}/>` +
      limb('M86 126 L74 162 L68 198', s, 17) + limb('M154 126 L166 162 L172 198', s, 17) +
      `<circle cx="67" cy="206" r="10" fill="${s}" ${sw(2.5)}/><circle cx="173" cy="206" r="10" fill="${s}" ${sw(2.5)}/>` +
      `<path d="M88 106 Q120 98 152 106 L164 130 L150 138 L150 200 L90 200 L90 138 L76 130 Z" fill="${o.shirt}" ${sw()}/>` +
      `<rect x="113" y="84" width="14" height="22" fill="${s}" ${sw(2.5)}/>` +
      `<circle cx="92" cy="64" r="6" fill="${s}" ${sw(2.5)}/><circle cx="148" cy="64" r="6" fill="${s}" ${sw(2.5)}/>` +
      `<circle cx="120" cy="62" r="28" fill="${hc}" ${sw(2.5)}/>` +
      (o.p.long ? `<path d="M93 66 L92 108 Q120 116 148 108 L147 66 Z" fill="${hc}" ${sw(2.5)}/>` : '');
  }

  // 每个部位：箭头／疼的记号指的点，和点得到的范围（圆：x, y, r）
  //   大的部位包含小的：头包含脸、眼睛…；手包含手指；脚包含脚趾头；腿包含膝盖
  const PARTS = {
    '头':     { at: [[120, 34]], hit: [[120, 58, 32]], arrow: 'up' },
    '脸':     { at: [[102, 76], [138, 76]], hit: [[120, 70, 24]] },
    '眼睛':   { at: [[110, 64], [130, 64]], hit: [[110, 64, 8], [130, 64, 8]], face: true },
    '耳朵':   { at: [[92, 64], [148, 64]], hit: [[92, 64, 8], [148, 64, 8]], face: true, ear: true },
    '鼻子':   { at: [[120, 70]], hit: [[120, 70, 6]], face: true },
    '嘴巴':   { at: [[120, 80]], hit: [[120, 80, 7]], face: true },
    '脖子':   { at: [[120, 96]], hit: [[120, 96, 9]] },
    '肩膀':   { at: [[90, 110], [150, 110]], hit: [[90, 110, 12], [150, 110, 12]] },
    '手臂':   { at: [[76, 158], [164, 158]], hit: [[78, 150, 13], [72, 178, 11], [162, 150, 13], [168, 178, 11]] },
    '手':     { at: [[67, 205], [173, 205]], hit: [[67, 209, 17], [173, 209, 17]] },
    '手指':   { at: [[170, 120]], hit: [], pose: 'fingers' },
    '肚子':   { at: [[120, 168]], hit: [[120, 168, 24]] },
    '腿':     { at: [[106, 296], [134, 296]], hit: [[106, 252, 12], [106, 272, 12], [106, 296, 12], [134, 252, 12], [134, 272, 12], [134, 296, 12]] },
    '膝盖':   { at: [[106, 270], [134, 270]], hit: [[106, 270, 10], [134, 270, 10]] },
    '脚':     { at: [[103, 322], [137, 322]], hit: [[104, 323, 18], [136, 323, 18]], wide: true },
    '脚趾头': { at: [[140, 334]], hit: [], pose: 'toes' },
    '背':     { at: [[120, 160]], hit: [], back: true }
  };
  const CAN_TAP = Object.keys(PARTS).filter(z => !PARTS[z].back && !PARTS[z].pose);   // 背、手指、脚趾头不出「点图」（图会直接告诉答案）
  window.__off = Object.keys(PARTS).filter(z => PARTS[z].off);   // 先不出的部位（脚趾头）
  const inCircle = (pt, c, k = 1.25) => Math.hypot(pt[0] - c[0], pt[1] - c[1]) <= c[2] * k;
  function tapHits(zh, pt, level) {
    const P = PARTS[zh];
    if (zh === '手' && level === 1 && PARTS['手臂'].hit.some(c => inCircle(pt, c))) return true;   // 二年级还没学「手臂」：点手臂也算对
    if (P.face) {
      // 脸上的小地方：看点到的位置离哪一个最近
      const near = ['眼睛', '耳朵', '鼻子', '嘴巴'].map(z => ({ z, d: Math.min(...PARTS[z].hit.map(c => Math.hypot(pt[0] - c[0], pt[1] - c[1]))) })).sort((a, b) => a.d - b.d)[0];
      return near.z === zh && near.d <= 14;
    }
    return P.hit.some(c => inCircle(pt, c));
  }

  // 记号：箭头（Level 1）、疼的地方（红红的、有疼的线条、贴一块 OK 绷）
  function arrowMark(pt, up) {
    const [x, y] = pt, left = x < 120;
    if (up) return `<g><path d="M${x} ${y - 40} L${x} ${y - 10}" stroke="#E5483B" stroke-width="7" stroke-linecap="round"/><path d="M${x - 10} ${y - 18} L${x} ${y - 4} L${x + 10} ${y - 18} Z" fill="#E5483B" ${sw(2)}/></g>`;
    const dx = left ? -1 : 1, x0 = x + dx * 46, y0 = y - 10;
    return `<g><path d="M${x0} ${y0} L${x + dx * 9} ${y}" stroke="#E5483B" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M${x + dx * 4} ${y} L${x + dx * 18} ${y - 11} L${x + dx * 20} ${y + 7} Z" fill="#E5483B" ${sw(2)}/></g>`;
  }
  // 疼的记号：红红的、有疼的线条、贴一块 OK 绷。小地方（手指、脚趾头）记号小一点，整只脚的记号宽一点
  function painMark(pt, P) {
    const [x, y] = pt, k = P && P.small ? .62 : 1;
    if (P && P.ear) {
      // 耳朵疼：整只耳朵变红、变大一点，疼的线条往外，OK 绷贴在耳朵外面，不会挡到脸
      const d = x < 120 ? -1 : 1;
      let l = '';
      for (let n = 0; n < 5; n++) { const a = (n - 2) * .55 + (d < 0 ? Math.PI : 0); l += `<path d="M${x + Math.cos(a) * 13} ${y + Math.sin(a) * 13} L${x + Math.cos(a) * 22} ${y + Math.sin(a) * 22}" stroke="#E5483B" stroke-width="3.5" stroke-linecap="round"/>`; }
      return `<g class="pain"><circle cx="${x}" cy="${y}" r="9.5" fill="#F26B5B" ${sw(2.5)}/>${l}` +
        `<g transform="translate(${x + d * 6} ${y + 9}) rotate(${d * 30}) scale(.7)"><rect x="-11" y="-4.5" width="22" height="9" rx="4" fill="#D99A5E" ${sw(2)}/><rect x="-3.5" y="-3" width="7" height="6" fill="#B87A3F"/><circle cx="-7" cy="0" r=".9" fill="#8A5A2B"/><circle cx="7" cy="0" r=".9" fill="#8A5A2B"/></g></g>`;
    }
    // 疼的线条（粗一点、长一点）＋旁边一闪一闪的红色闪电
    const wide = P && P.wide, r0 = (wide ? 19 : 15) * k, r1 = (wide ? 30 : 26) * k;
    let lines = '';
    for (let n = 0; n < 8; n++) {
      const a = n / 8 * Math.PI * 2 + .2;
      lines += `<path d="M${x + Math.cos(a) * r0} ${y + Math.sin(a) * r0 * (wide ? .8 : 1)} L${x + Math.cos(a) * r1} ${y + Math.sin(a) * r1 * (wide ? .8 : 1)}" stroke="#E5483B" stroke-width="4" stroke-linecap="round"/>`;
    }
    [-2.3, -.8, 2.6].forEach(a => { lines += spark(x + Math.cos(a) * (r1 + 3), y + Math.sin(a) * (r1 + 3) * (wide ? .8 : 1), a); });
    // 疼的地方整块红红的（脚：整只脚变红）
    const glow = wide ? `<ellipse cx="${x}" cy="${y}" rx="15.5" ry="10.5" fill="#F26B5B" opacity=".75" ${sw(2.5)}/>`
      : `<circle cx="${x}" cy="${y}" r="${13 * k}" fill="#F26B5B" opacity=".6"/>`;
    return `<g class="pain">${glow}${lines}` +
      `<g transform="translate(${x} ${y}) rotate(-25) scale(${k})"><rect x="-11" y="-4.5" width="22" height="9" rx="4" fill="#D99A5E" ${sw(2)}/><rect x="-3.5" y="-3" width="7" height="6" fill="#B87A3F"/><circle cx="-7" cy="0" r=".9" fill="#8A5A2B"/><circle cx="7" cy="0" r=".9" fill="#8A5A2B"/></g></g>`;
  }


  // 很像的一对：不会同时出现在选项里
  const PAIR = { '脚': '脚趾头', '脚趾头': '脚', '手': '手指', '手指': '手' };
  function look() {
    return { p: pick(ART.people), shirt: pick(['#5B9BD5', '#8CC7A0', '#F2A65A', '#9B8BC4', '#F5C531', '#EC8FB3']), shorts: pick(['#3B5B8C', '#7A4B2A', '#4A6B3A', '#5E4B8B']) };
  }
  function svg(q) {
    const P = PARTS[q.zh];
    const o = Object.assign({ face: q.face || 'good', pose: P.pose, hurt: q.mark === 'pain' }, q.look);
    let mark = '';
    if (q.mark && !P.pose) {
      if (q.side == null) q.side = Math.floor(Math.random() * P.at.length);
      const pt = P.at[q.side];
      mark = q.mark === 'arrow' ? arrowMark(pt, P.arrow === 'up') : painMark(pt, P);
    }
    // 箭头题的手指、脚趾头：放大镜里不画红色（只是指出来）
    if (q.mark === 'arrow' && P.pose) o.hurt = false, o.point = true;
    return (P.back ? back(o) : front(o)) + mark;
  }
  window.ShihPatient = { svg, look, PARTS, CAN_TAP, tapHits, PAIR, painMark, arrowMark };
})();
