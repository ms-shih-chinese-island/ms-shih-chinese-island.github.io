/* =====================================================================
   找人（服务台＝听、找一找＝读）共用：画全身小朋友、排人群、检查规则、游戏流程
   服务台（听，找走失的小朋友）、找朋友（读，找约好见面的朋友）
   用法：games/lost.html、games/find.html 先设定 window.CROWD_MODE = 'listen' 或 'read'，再载入这一份。
   颜色、衣服、秒数都在 units/clothes/words.js。
   题目：Top、Bottom 两行，写出颜色和衣服（例如：红色的球衣、黑色的牛仔裤）。
   规则：找人只看颜色。整张图里只有走失的小朋友是「上红、下黑」（看得到的上衣和下身颜色都对）；
         其他每个人，上衣或下身一定有一件看得清楚、而且颜色不对。鞋子不算。
         走失的小朋友上衣和下身都一定看得清楚。
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
  const SKIN = { light: '#FBDCC8', asian: '#F6D9B5', tan: '#C98E62' };
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = c => Math.max(0, Math.min(255, Math.round(c * k))); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(c => f(c).toString(16).padStart(2, '0')).join(''); };
  const onDark = hex => ['#FFFFFF', '#F5C531', '#F49AC1'].includes(hex) ? INK : '#FFFFFF';

  // ================= 全身小朋友（140 × 256；头用岛上原本的 ART.kid） =================
  const hand = (x, y, s) => `<circle cx="${x}" cy="${y}" r="7" fill="${s}" ${sw}/>`;
  function arms(c, s, len) {          // 'short' 短袖、'long' 长袖、'none' 无袖
    const a = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${s}" stroke-width="10" stroke-linecap="round"/>`;
    let sl = '';
    if (len === 'short') sl = `<path d="M44 104 L28 124 L40 132 L50 118 Z" fill="${c}" ${sw}/><path d="M96 104 L112 124 L100 132 L90 118 Z" fill="${c}" ${sw}/>`;
    if (len === 'long') sl = `<path d="M44 104 Q24 130 25 158 L37 159 Q38 136 52 118 Z" fill="${c}" ${sw}/><path d="M96 104 Q116 130 115 158 L103 159 Q102 136 88 118 Z" fill="${c}" ${sw}/>`;
    return a('M40 112 Q28 135 30 160') + a('M100 112 Q112 135 110 160') + sl + hand(31, 164, s) + hand(109, 164, s);
  }
  const legs = (s, top) => `<rect x="52" y="${top}" width="14" height="${232 - top}" fill="${s}" ${sw}/><rect x="74" y="${top}" width="14" height="${232 - top}" fill="${s}" ${sw}/>`;
  const TOPS = {
    'T恤': c => ({ sl: 'short', body: `<path d="M44 102 Q70 96 96 102 L98 178 L42 178 Z" fill="${c}" ${sw}/><path d="M60 102 Q70 112 80 102" fill="none" ${sw}/>` }),
    '毛衣': c => ({ sl: 'long', body: `<path d="M44 102 Q70 96 96 102 L98 178 L42 178 Z" fill="${c}" ${sw}/><path d="M42 168 L98 168" ${sw}/>` +
      [48, 56, 64, 72, 80, 88].map(x => `<path d="M${x} 169 L${x} 177" stroke="${INK}" stroke-width="1.8"/>`).join('') + `<path d="M58 102 Q70 110 82 102" fill="none" ${sw}/>` }),
    '外套': c => ({ sl: 'long', body: `<path d="M64 101 L76 101 L76 178 L64 178 Z" fill="#FFFFFF" ${sw}/><path d="M44 102 Q56 98 66 100 L68 180 L42 180 Z" fill="${c}" ${sw}/><path d="M96 102 Q84 98 74 100 L72 180 L98 180 Z" fill="${c}" ${sw}/>` +
      `<path d="M48 150 L60 150 L60 164 L48 164 Z M80 150 L92 150 L92 164 L80 164 Z" fill="${shade(c, .85)}" ${sw}/><path d="M66 100 L56 118 M74 100 L84 118" ${sw}/>` }),
    '球衣': c => ({ sl: 'none', body: `<path d="M48 102 Q56 100 60 101 Q70 116 80 101 Q84 100 92 102 L96 178 L44 178 Z" fill="${c}" ${sw}/>` +
      `<text x="70" y="160" text-anchor="middle" font-family="Andika, Arial, sans-serif" font-weight="700" font-size="30" fill="${onDark(c)}" stroke="${INK}" stroke-width="1.2">7</text>` })
  };
  const BOTTOMS = {
    '牛仔裤': (c) => `<path d="M42 176 L98 176 L96 234 L74 234 L70 196 L66 234 L44 234 Z" fill="${c}" ${sw}/><path d="M46 186 Q56 188 58 178 M94 186 Q84 188 82 178" fill="none" stroke="${c === '#FFFFFF' ? '#9AA3AD' : shade(c, 1.4)}" stroke-width="2.2"/><path d="M70 178 L70 196" ${sw}/>`,
    '短裤': (c, s) => legs(s, 200) + `<path d="M42 176 L98 176 L98 206 L74 206 L70 192 L66 206 L42 206 Z" fill="${c}" ${sw}/>`,
    '裙子': (c, s) => legs(s, 196) + `<path d="M44 176 L96 176 L108 210 Q70 218 32 210 Z" fill="${c}" ${sw}/><path d="M58 180 L54 212 M70 180 L70 214 M82 180 L86 212" stroke="${c === '#FFFFFF' ? '#C9CCC8' : shade(c, .82)}" stroke-width="2"/>`
  };
  const SHOES = {
    '运动鞋': c => `<path d="M44 226 L66 226 L68 243 L34 243 Q34 230 44 226 Z" fill="${c}" ${sw}/><path d="M74 226 L96 226 Q106 230 106 243 L72 243 Z" fill="${c}" ${sw}/>` +
      `<path d="M33 243 L69 243 L69 251 L33 251 Z M71 243 L107 243 L107 251 L71 251 Z" fill="#FFFFFF" ${sw}/><path d="M49 230 L59 235 M49 235 L59 230 M81 230 L91 235 M81 235 L91 230" stroke="${onDark(c)}" stroke-width="2"/>`,
    '皮鞋': c => `<path d="M48 230 L66 230 L67 247 L34 247 Q32 235 48 230 Z" fill="${c}" ${sw}/><path d="M74 230 L92 230 Q108 235 106 247 L73 247 Z" fill="${c}" ${sw}/>` +
      `<path d="M33 247 L68 247 M72 247 L107 247" stroke="${INK}" stroke-width="4"/><path d="M40 237 Q45 234 51 235 M89 235 Q95 234 100 237" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".85"/>`,
    '高跟鞋': c => `<path d="M53 228 L66 228 L66 240 L36 244 Q34 236 53 228 Z" fill="${c}" ${sw}/><path d="M60 240 L66 240 L65 253 L61 253 Z" fill="${c}" ${sw}/>` +
      `<path d="M74 228 L87 228 Q106 236 104 244 L74 240 Z" fill="${c}" ${sw}/><path d="M74 240 L80 240 L79 253 L75 253 Z" fill="${c}" ${sw}/>`
  };
  const DRESS = (c, s) => legs(s, 200) + `<path d="M46 102 Q70 96 94 102 L96 158 L112 214 Q70 222 28 214 L44 158 Z" fill="${c}" ${sw}/><path d="M44 158 Q70 164 96 158" fill="none" ${sw}/><path d="M60 102 Q70 112 80 102" fill="none" ${sw}/>`;
  const CAP = c => `<path d="M40 52 Q40 28 70 28 Q100 28 100 52 Z" fill="${c}" ${sw}/><path d="M40 52 L22 54 Q22 48 40 47" fill="${c}" ${sw}/><circle cx="70" cy="28" r="3.5" fill="${c}" ${sw}/>`;

  // o: { p: 岛上的小朋友, top, bottom, shoes, dress, hat }；衣服 = { item: 衣服, color: 颜色 }
  function bodyKid(o) {
    const s = SKIN[o.p.skin] || SKIN.light;
    const head = ART.kid(Object.assign({}, o.p, { shirt: 'none' }), 'good')
      .replace('<svg ', '<svg x="0" y="0" width="140" height="140" ')
      .replace(/<path d="M28 140 Q28 104 70 101 Q112 104 112 140 Z"[^>]*\/>/, '');
    let top = '', low, arm;
    if (o.dress) { low = DRESS(o.dress.color.hex, s); arm = arms(o.dress.color.hex, s, 'short'); }
    else {
      const T = TOPS[o.top.item.zh](o.top.color.hex);
      top = T.body; arm = arms(o.top.color.hex, s, T.sl); low = BOTTOMS[o.bottom.item.zh](o.bottom.color.hex, s);
    }
    return SHOES[o.shoes.item.zh](o.shoes.color.hex) + low + arm + top + head + (o.hat ? CAP(o.hat.hex) : '');
  }

  // 一个人挡住别人的范围、自己每一件衣服的范围（140 × 256 里）
  const BLOCK = [[38, 28, 102, 96], [24, 98, 116, 180], [40, 176, 100, 236], [32, 224, 108, 253]];
  const PART = { top: [46, 106, 94, 174], bottom: [46, 182, 94, 230], shoes: [36, 230, 104, 250] };
  const CLEAR = 0.6;           // 露出来 6 成以上才算「看得清楚」

  // ================= 购物中心的背景（1000 × 600） =================
  function background() {
    const s3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
    let bg = `<rect width="1000" height="600" fill="#F4EEE2"/><rect width="1000" height="40" fill="#D8CFC0"/>` +
      [100, 300, 500, 700, 900].map(x => `<circle cx="${x}" cy="22" r="10" fill="#FFF4C2" ${s3}/>`).join('');
    [['#E5483B', '服装店'], ['#45A852', '超市'], ['#3B78D8', '卫生间'], ['#F28C28', '餐厅']].forEach(([c, zh], i) => {
      const x = 20 + i * 245;
      bg += `<rect x="${x}" y="58" width="225" height="172" fill="#FFFFFF" ${s3}/><rect x="${x}" y="58" width="225" height="34" fill="${c}" ${s3}/>` +
        `<text x="${x + 112}" y="83" text-anchor="middle" font-family="Noto Sans SC, sans-serif" font-weight="700" font-size="22" fill="#fff">${zh}</text>`;
      if (zh === '卫生间') {
        // 卫生间：男生、女生的门牌，旁边一台饮水机
        bg += `<rect x="${x + 14}" y="104" width="54" height="126" fill="#B98A5E" ${s3}/><rect x="${x + 80}" y="104" width="54" height="126" fill="#B98A5E" ${s3}/>` +
          `<rect x="${x + 25}" y="114" width="32" height="32" rx="6" fill="#FFFFFF" ${s3}/><circle cx="${x + 41}" cy="122" r="4" fill="#3B78D8"/><rect x="${x + 36}" y="127" width="10" height="14" rx="2" fill="#3B78D8"/>` +
          `<rect x="${x + 91}" y="114" width="32" height="32" rx="6" fill="#FFFFFF" ${s3}/><circle cx="${x + 107}" cy="122" r="4" fill="#E5483B"/><path d="M${x + 107} 126 l7 15 h-14 Z" fill="#E5483B"/>` +
          `<g transform="translate(${x + 172} 0)"><path d="M-14 230 L-12 176 L12 176 L14 230 Z" fill="#CFD2CC" ${s3}/><rect x="-20" y="166" width="40" height="12" rx="6" fill="#E6E8E4" ${s3}/>` +
          `<path d="M6 166 C6 150 20 148 24 160" fill="none" stroke="#3B9BD5" stroke-width="3"/><circle cx="25" cy="165" r="3" fill="#3B9BD5"/></g>`;
      } else {
        bg += `<rect x="${x + 14}" y="104" width="120" height="112" fill="#CFE6F0" ${s3}/><rect x="${x + 150}" y="104" width="60" height="126" fill="#B98A5E" ${s3}/>`;
      }
    });
    bg += `<rect y="230" width="1000" height="370" fill="#E9DFCC"/><path d="M0 230 L1000 230" ${s3}/>`;
    for (let y = 276; y < 600; y += 46) bg += `<path d="M0 ${y} L1000 ${y}" stroke="#DCCFB6" stroke-width="2"/>`;
    return bg;
  }

  // ================= 游戏 =================
  window.ShihCrowd = function (UNIT, mode) {
    const C = UNIT.crowd, G = mode === 'listen' ? C.lost : C.find;
    const $ = id => document.getElementById(id);
    const NS = 'http://www.w3.org/2000/svg';
    document.title = `${G.title.zh} ${G.title.en}`;
    $('titleRuby').innerHTML = Shih.ruby(G.title.zh, G.title.py);
    $('titleEn').textContent = G.title.en;
    $('help').textContent = `${G.help} Find ${C.count} ${G.card.many} in ${C.seconds} seconds.`;
    document.querySelector('.clue .ic').textContent = G.card.icon;
    $('clueHead').textContent = G.card.head;
    $('winRuby').innerHTML = Shih.rubyText(C.done.zh, C.done.py);
    $('endRuby').innerHTML = Shih.ruby('时间到', 'shí jiān dào');
    Shih.soundButton($('soundBtn'));
    $('booth').innerHTML = background() + '<g id="people"></g>';

    const pick = a => a[Math.floor(Math.random() * a.length)];
    const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    // 裙子、连衣裙、高跟鞋只给女生穿（岛上的小朋友有分 boy: true／false）
    const GIRLS_ONLY = ['裙子', '连衣裙', '高跟鞋'];
    const KIND = (k, boy) => UNIT.clothes.filter(c => c.kind === k && !(boy && GIRLS_ONLY.includes(c.zh)));
    // 找朋友：Level 2（三年级）只看颜色，题目只写颜色，用三年级学过的 8 个颜色
    //         Level 3（四年级）颜色和衣服都要对，题目写「红色的球衣」
    // 服务台：只有 Level 3，广播念「红色的球衣」，可是找人只看颜色
    const listen = mode === 'listen';
    let level = listen ? 3 : Shih.startLevel('crowdLevel', 3, 2);
    const strict = () => !listen && level >= 3;         // 衣服的种类也要对
    let COLORS = UNIT.colors;
    const useLevel = () => { COLORS = UNIT.colors.filter(c => (c.level || 1) <= level); };
    const KEYS = ['top', 'bottom'];
    const same = (a, b) => a && b && a.item.zh === b.item.zh && a.color.zh === b.color.zh;
    const phrase = p => (level < 3 && !listen) ? { zh: p.color.zh, py: p.color.py } : { zh: p.color.zh + '的' + p.item.zh, py: p.color.py + ' de ' + p.item.py.replace(/^T /, '') };

    // ---- 位置：一排一排，大家一样大，前面的人会挡住后面的人 ----
    const S = 0.5, W = 140 * S, H = 256 * S;
    const ROWS = [330, 368, 406, 444, 482, 520, 558, 596];
    function layout() {
      const spots = [];
      ROWS.forEach((y, r) => {
        // 左右对称：每排 10 个平均分开，单数排、双数排各往左右错开 1/4 格，每个人只随机挪一点点
        const n = 10, gap = 880 / n, off = (r % 2 ? 1 : -1) * gap / 4;
        for (let i = 0; i < n; i++) {
          const x = 60 + (i + .5) * gap + off + (Math.random() - .5) * 26;
          if (Math.random() < .06) continue;
          spots.push({ x, y: y + (Math.random() - .5) * 14 });
        }
      });
      spots.sort((a, b) => a.y - b.y || a.x - b.x);      // 后面的先画，前面的后画
      return spots;
    }
    const box = (q, r) => [q.x - W / 2 + r[0] * S, q.y - H + r[1] * S, q.x - W / 2 + r[2] * S, q.y - H + r[3] * S];
    // 每个人每一件衣服露出来几成（只算排在他前面、还在图上的人）
    function visibility(spots, alive) {
      return spots.map((q, i) => {
        const front = spots.filter((o, j) => j > i && alive[j]).map(o => BLOCK.map(b => box(o, b))).flat();
        const v = {};
        KEYS.forEach(k => {
          const [x0, y0, x1, y1] = box(q, PART[k]);
          let open = 0, all = 0;
          for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) {
            const x = x0 + (a + .5) * (x1 - x0) / 6, y = y0 + (b + .5) * (y1 - y0) / 6;
            all++;
            if (!front.some(f => x >= f[0] && x <= f[2] && y >= f[1] && y <= f[3])) open++;
          }
          v[k] = open / all;
        });
        return v;
      });
    }
    // 这个人身上，这一件跟条件一样吗？（连衣裙：上身、下身都不一样）
    // Level 2 只比颜色；Level 3 颜色和衣服都要一样（穿连衣裙的人：上衣、下身都是连衣裙，衣服种类一定不一样）
    const colorOf = (o, k) => o.dress ? o.dress.color : o[k].color;
    const itemOf = (o, k) => o.dress ? '连衣裙' : o[k].item.zh;
    const matches = (o, clue, k) => colorOf(o, k).zh === clue[k].color.zh && (!strict() || itemOf(o, k) === clue[k].item.zh);
    // 规则：这个人露出来、看得清楚的上衣或下身，有没有一件颜色跟条件不一样
    const ruledOut = (o, v, clue) => KEYS.some(k => v[k] >= CLEAR && !matches(o, clue, k));

    const randPart = (k, boy, color) => ({ item: pick(KIND(k, boy)), color: color || pick(COLORS) });
    // 挑颜色：看旁边（左右 2 格、前后 2 排以内）的人，尽量挑旁边比较少人穿的颜色，免得同一个颜色挤成一团
    function quietColor(spots, outfits, i, k, allowed) {
      const near = spots.map((q, j) => j).filter(j => j !== i && outfits[j] && Math.abs(spots[j].x - spots[i].x) < 190 && Math.abs(spots[j].y - spots[i].y) < 80);
      const cnt = c => near.reduce((n, j) => { const o = outfits[j]; const cs = o.dress ? [o.dress.color] : [o.top.color, o.bottom.color]; return n + cs.filter(x => x.zh === c.zh).length; }, 0);
      const list = allowed || COLORS;
      const min = Math.min(...list.map(cnt));
      return pick(list.filter(c => cnt(c) === min));
    }
    function randomOutfit(boy, colorFor) {
      const o = { shoes: randPart('shoes', boy), hat: Math.random() < .25 ? pick(COLORS) : null };
      if (!boy && Math.random() < .2) o.dress = { color: colorFor('top') };
      else { o.top = randPart('top', boy, colorFor('top')); o.bottom = randPart('bottom', boy, colorFor('bottom')); }
      return o;
    }
    // 只差一点的人：上衣或下身换一个颜色，或上下颜色对调（衣服的种类随便）
    function nearMiss(clue, k, boy) {
      const o = { top: { item: strict() ? clue.top.item : pick(KIND('top', boy)), color: clue.top.color }, bottom: { item: strict() ? clue.bottom.item : pick(KIND('bottom', boy)), color: clue.bottom.color }, shoes: randPart('shoes', boy), hat: Math.random() < .25 ? pick(COLORS) : null };
      // Level 3：一半的人颜色都对，只差衣服的种类（例如红色的毛衣，不是红色的球衣）
      const other = KIND(k, boy).filter(c => c.zh !== clue[k].item.zh);
      if (strict() && other.length && Math.random() < .5) { o[k].item = pick(other); return o; }
      if (Math.random() < .3) { o.top.color = clue.bottom.color; o.bottom.color = clue.top.color; }
      else o[k].color = pick(COLORS.filter(c => c.zh !== clue[k].color.zh && c.zh !== clue[k === 'top' ? 'bottom' : 'top'].color.zh));
      return o;
    }

    // ---- 排一张图：位置、3 个走失的小朋友、只差一件的人、其他人，再检查规则 ----
    function build(n) {
      for (let tries = 0; tries < 200; tries++) {
        let spots = layout(), vis;
        // 上衣和下身都看不清楚的人：拿掉（不然说不出他是不是）
        for (;;) {
          vis = visibility(spots, spots.map(() => true));
          const keep = spots.filter((q, i) => KEYS.some(k => vis[i][k] >= CLEAR));
          if (keep.length === spots.length) break;
          spots = keep;
        }
        // 走失的小朋友：上衣和下身都要看得清楚
        const canLost = shuffle(spots.map((q, i) => i).filter(i => KEYS.every(k => vis[i][k] >= CLEAR)));
        if (canLost.length < n) continue;
        const lostIdx = canLost.slice(0, n);
        const heads = spots.map(() => pick(ART.people));            // 每个位置是哪一个小朋友（男生、女生）
        const clues = [];
        while (clues.length < n) {
          const boy = heads[lostIdx[clues.length]].boy;
          const c = { top: randPart('top', boy), bottom: randPart('bottom', boy), shoes: randPart('shoes', boy) };
          if (c.top.color.zh === c.bottom.color.zh) continue;          // 上下不同颜色，比较清楚
          if (clues.every(d => d.top.color.zh !== c.top.color.zh || d.bottom.color.zh !== c.bottom.color.zh)) clues.push(c);
        }
        const outfits = spots.map(() => null);
        lostIdx.forEach((i, n) => { outfits[i] = Object.assign({ hat: null }, clues[n]); });
        // 只差一件的人：差的那一件一定要看得清楚
        let ok = true;
        clues.forEach(clue => {
          for (let m = 0; m < C.near; m++) {
            const k = pick(KEYS);
            const cand = shuffle(spots.map((q, i) => i).filter(i => !outfits[i] && vis[i][k] >= CLEAR));
            if (!cand.length) { ok = false; return; }
            outfits[cand[0]] = nearMiss(clue, k, heads[cand[0]].boy);
          }
        });
        if (!ok) continue;
        // 其他人：一个一个（随机顺序）挑旁边比较少的颜色
        shuffle(spots.map((q, i) => i)).forEach(i => {
          if (outfits[i]) return;
          const o = randomOutfit(heads[i].boy, k => quietColor(spots, outfits, i, k));
          if (o.top && o.bottom && o.top.color.zh === o.bottom.color.zh) o.bottom.color = quietColor(spots, outfits, i, 'bottom', COLORS.filter(c => c.zh !== o.top.color.zh));
          outfits[i] = o;
        });
        // 检查：每个条件，除了那个走失的小朋友，每个人都要有一件看得清楚、而且不对
        for (let fix = 0; fix < 30; fix++) {
          let bad = 0;
          spots.forEach((q, i) => {
            clues.forEach((clue, n) => {
              if (lostIdx[n] === i || ruledOut(outfits[i], vis[i], clue)) return;
              bad++;
              if (lostIdx.includes(i)) return;        // 走失的小朋友不改，等一下整张重排
              // 换一件看得清楚的衣服的颜色：9 个颜色都可以挑，只要换完以后，每个条件都不会把他误认成走失的小朋友
              const k = pick(KEYS.filter(k => vis[i][k] >= CLEAR));
              const o = outfits[i];
              const recolor = c => o.dress ? Object.assign({}, o, { dress: { color: c } }) : Object.assign({}, o, { [k]: { item: o[k].item, color: c } });
              const okColors = COLORS.filter(c => clues.every((cl, m) => lostIdx[m] === i || ruledOut(recolor(c), vis[i], cl)));
              const fresh = okColors.length ? quietColor(spots, outfits, i, k, okColors) : pick(COLORS.filter(c => clues.every(cl => cl[k].color.zh !== c.zh)));
              outfits[i] = recolor(fresh);
            });
          });
          if (!bad) return { spots, outfits, lostIdx, clues, heads };
        }
      }
      throw new Error('crowd: could not build a fair picture');
    }

    // ---- 画面 ----
    // newPicture: true → 每找到一个人就换一张新的图（每张图只找一个人）；false → 一张图找全部的人
    let game = null, step = 0, playing = false, startT = 0, raf = 0, found = 0, over = false;
    const at = () => C.newPicture ? 0 : step;          // 这张图里，现在要找的是第几个
    function newPicture() {
      useLevel();
      game = build(C.newPicture ? 1 : C.count);
      game.gone = game.spots.map(() => false);
      draw();
    }
    const peopleG = () => $('people');
    function draw() {
      const g = peopleG(); g.innerHTML = '';
      game.els = game.spots.map((q, i) => {
        const e = document.createElementNS(NS, 'g');
        e.setAttribute('class', 'kid');
        e.setAttribute('transform', `translate(${q.x - W / 2} ${q.y - H}) scale(${S})`);
        e.innerHTML = `<ellipse cx="70" cy="251" rx="44" ry="6" fill="rgba(43,43,43,.15)"/>` + bodyKid(Object.assign({ p: game.heads[i] }, game.outfits[i])) +
          BLOCK.map(b => `<rect class="hit" x="${b[0]}" y="${b[1]}" width="${b[2] - b[0]}" height="${b[3] - b[1]}"/>`).join('');
        e.addEventListener('click', () => tap(i));
        g.appendChild(e);
        return e;
      });
    }
    const ROWLAB = { top: 'Top', bottom: 'Bottom' };
    function showClue() {
      const clue = game.clues[at()];
      $('clueNo').textContent = `${G.card.who} ${step + 1} of ${C.count}`;
      $('rows').innerHTML = KEYS.map(k => {
        const p = phrase(clue[k]);
        const what = mode === 'listen'
          ? `<button type="button" class="say" data-k="${k}" aria-label="Listen: ${ROWLAB[k]}">🔊</button>`
          : `<span class="ruby">${Shih.rubyText(p.zh, p.py)}</span>`;
        return `<div class="row" data-k="${k}"><span class="lab">${ROWLAB[k]}:</span>${what}<span class="mark"></span></div>`;
      }).join('');
      $('rows').querySelectorAll('.say').forEach(b => b.addEventListener('click', () => {
        b.classList.remove('on'); void b.offsetWidth; b.classList.add('on');
        Shih.speak(phrase(clue[b.dataset.k]).zh);
      }));
    }
    function marks(o) {
      const clue = game.clues[at()];
      KEYS.forEach(k => {
        const m = $('rows').querySelector(`.row[data-k="${k}"] .mark`);
        m.textContent = matches(o, clue, k) ? '✅' : '❌';
      });
    }
    function tap(i) {
      if (!playing || game.gone[i]) return;
      const e = game.els[i];
      if (i === game.lostIdx[at()]) {
        playing = false;
        game.gone[i] = true;
        found++; $('score').textContent = `${found} / ${C.count}`;
        marks(game.outfits[i]);
        e.classList.add('found');
        Shih.speak('找到了');
        setTimeout(() => {
          e.classList.add('leave');
          setTimeout(() => {
            e.remove();
            if (found >= C.count) return finish(true);
            step++;
            if (C.newPicture) { newPicture(); const g = peopleG(); g.classList.remove('swap'); void g.getBBox(); g.classList.add('swap'); }
            showClue(); playing = true;
          }, 450);
        }, 700);
      } else {
        marks(game.outfits[i]);
        e.classList.remove('nope'); void e.getBBox(); e.classList.add('nope');
        setTimeout(() => e.classList.remove('nope'), 450);
      }
    }
    function frame(now) {
      // 找到一个、换下一个的时候，时间照走
      if (over) return;
      const left = Math.max(0, C.seconds - (now - startT) / 1000);
      const s = Math.ceil(left);
      $('clock').textContent = fmt(s);
      $('clock').classList.toggle('low', s <= 10);
      if (left <= 0) return finish(false);
      raf = requestAnimationFrame(frame);
    }
    const paintLevels = Shih.levelButtons($('levels'), listen ? [{}, {}, { note: '' }] : C.levels, level, null, lv => { level = lv; Shih.set('crowdLevel', lv); setup(); }, null, listen ? 3 : 2);
    $('levels').hidden = false;          // 服务台只有一个 Level 3，也显示出来
    function setup() {
      cancelAnimationFrame(raf);
      paintLevels(level);
      step = 0; found = 0; playing = false; over = false;
      newPicture(); showClue();
      $('score').textContent = `0 / ${C.count}`;
      $('clock').textContent = fmt(C.seconds); $('clock').classList.remove('low');
      $('winMsg').hidden = true; $('endMsg').hidden = true;
      wait();
    }
    function start() { playing = true; startT = performance.now(); raf = requestAnimationFrame(frame); }
    function finish(ok) {
      if (over) return;
      over = true; playing = false; cancelAnimationFrame(raf);
      const sec = Math.round((performance.now() - startT) / 1000);
      if (ok) { $('winEn').textContent = `You found ${C.count} ${G.card.many} in ${sec} seconds!`; $('winMsg').hidden = false; Shih.speak(C.done.zh); }
      else {
        // 时间到：把答案圈出来
        const e = game.els[game.lostIdx[at()]];
        if (e) e.classList.add('answer');
        $('endEn').textContent = `Time's up! You found ${found} of ${C.count}. Try again!`; $('endMsg').hidden = false;
      }
    }
    const wait = Shih.startCover($('playArea'), start);
    $('resetBtn').addEventListener('click', setup);
    $('againBtn').addEventListener('click', setup);
    $('again2Btn').addEventListener('click', setup);
    setup();
    // 给测试用：看得到答案和规则检查
    window.__crowd = { get game() { return game; }, get step() { return at(); }, visibility, ruledOut, matches, KEYS, CLEAR };
  };
})();
