/* =====================================================================
   数字的共用零件：阿拉伯数字 ↔ 中文数字（含拼音变调）、出题小帮手、中国算盘
   数字（银行）的游戏都用这一份。一般不需要改这个档案。
   ===================================================================== */
(function () {
  const ZH = '零一二三四五六七八九';
  const PY = ['líng', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ'];
  const UZ = ['', '十', '百', '千', '万'], UP = ['', 'shí', 'bǎi', 'qiān', 'wàn'];
  const N = {};

  // 题目只用「不需要念零」的数字：1–10000，非零的数字后面只能接 0（例如 3500 可以，3050 不行）
  N.ok = n => Number.isInteger(n) && n >= 1 && n <= 10000 && /^[1-9]+0*$/.test(String(n));

  // 每个字的中文和拼音：[['三','sān'], ['千','qiān'], ...]
  // 开头的 2 在百、千、万前面念「两」；「一」在百、千前念 yì，在万前念 yí
  N.parts = function (n) {
    if (n === 0) return [['零', 'líng']];
    // 一万以上（自由拨会用到）：先念几万，再念后面的四位
    if (n >= 10000) {
      const hi = Math.floor(n / 10000), lo = n % 10000;
      const out = hi === 2 ? [['两', 'liǎng']] : N.parts(hi);
      const last = out[out.length - 1];
      if (last[0] === '一') last[1] = 'yí';          // 一万、二十一万：一念 yí
      out.push(['万', 'wàn']);
      if (lo) {
        if (lo < 1000) out.push(['零', 'líng']);
        if (lo >= 10 && lo < 20) out.push(['一', 'yī']);   // 一万零一十五
        out.push(...N.parts(lo));
      }
      return out;
    }
    const s = String(n), L = s.length, out = [];
    let zero = false;
    for (let i = 0; i < L; i++) {
      const d = +s[i], p = L - 1 - i;
      if (d === 0) { zero = true; continue; }
      if (zero && out.length) out.push(['零', 'líng']);
      zero = false;
      if (i === 0 && p === 1 && d === 1) { out.push(['十', 'shí']); continue; }
      let z = ZH[d], y = PY[d];
      if (i === 0 && p >= 2 && d === 2) { z = '两'; y = 'liǎng'; }
      if (p >= 2 && d === 1) y = p === 4 ? 'yí' : 'yì';
      out.push([z, y]);
      if (p > 0) out.push([UZ[p], UP[p]]);
    }
    return out;
  };
  N.zh = n => N.parts(n).map(x => x[0]).join('');
  N.py = n => N.parts(n).map(x => x[1]).join(' ');
  N.ruby = n => `<span class="ruby">${Shih.ruby(N.zh(n), N.py(n))}</span>`;

  // ---- 出题小帮手 ----
  N.rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  N.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  N.pick = a => a[Math.floor(Math.random() * a.length)];

  // 一个三位数或四位数（偶尔是一万），不需要念零
  N.big = function (min = 100) {
    for (;;) {
      if (Math.random() < 0.05) return 10000;
      const len = Math.random() < 0.45 ? 3 : 4;
      const nz = N.rnd(1, len);
      let s = String(N.rnd(1, 9));
      for (let i = 1; i < nz; i++) s += N.rnd(1, 9);
      const n = +s.padEnd(len, '0');
      if (n >= min && N.ok(n)) return n;
    }
  };

  // 跟 n 很像、容易搞混的数字（拿来当错的选项）
  N.near = function (n, min = 1, max = 10000, steps) {
    const s = String(n).split('').map(Number), c = new Set();
    s.forEach((d, i) => {
      [1, -1, 5, -5].forEach(k => { const t = s.slice(); t[i] = d + k; if (t[i] >= 0 && t[i] <= 9) c.add(+t.join('')); });
      if (i + 1 < s.length && s[i + 1] !== d) { const t = s.slice(); [t[i], t[i + 1]] = [t[i + 1], t[i]]; c.add(+t.join('')); }
    });
    [1, -1, 2, -2, 10, -10].concat(steps || []).forEach(k => c.add(n + k));
    c.add(n * 10); if (n % 10 === 0) c.add(n / 10);
    if (n >= 11 && n <= 19) c.add((n - 10) * 10);                 // 十三 ↔ 三十
    if (n % 10 === 0 && n >= 20 && n <= 90) c.add(10 + n / 10);
    return N.shuffle([...c].filter(x => x !== n && x >= min && x <= max && N.ok(x)));
  };
  // 正确答案 + 3 个错的，顺序打乱
  N.options = function (ans, cands, min = 1, max = 10000, k = 3) {
    const out = [];
    cands.forEach(x => { if (out.length < k && x !== ans && !out.includes(x) && x >= min && x <= max && N.ok(x)) out.push(x); });
    let guard = 0;
    while (out.length < k && guard++ < 500) {
      const x = max > 100 ? N.big(Math.max(min, 100)) : N.rnd(min, max);
      if (x !== ans && !out.includes(x) && x <= max && N.ok(x)) out.push(x);
    }
    return N.shuffle([ans].concat(out));
  };

  // ---- 钱袋（数字单元的难度） ----
  N.bags = Shih.moneyBags;

  // ---- 中国算盘（上二下五）----
  // box：放算盘的元素；opts：{ cols: 5, interactive: true/false, onChange(value) }
  // 回传 { set(n), get(), digits(), clear() }
  N.abacus = function (box, opts) {
    opts = opts || {};
    const cols = opts.cols || 5, CW = 86, SL = 32, F = 16;
    const W = 2 * F + 14 + cols * CW, TOP = F + 6, UPH = 3 * SL, BEAM = 14;
    const beamY = TOP + UPH, lowTop = beamY + BEAM, frameH = lowTop + 6 * SL + 6 + F;
    const H = frameH + 74;
    const cx = c => F + 7 + CW / 2 + c * CW;
    const m = new Array(cols).fill(0), k = new Array(cols).fill(0);
    const PLACE = [['个', 'gè', '1'], ['十', 'shí', '10'], ['百', 'bǎi', '100'], ['千', 'qiān', '1000'], ['万', 'wàn', '10000'],
                   ['十万', 'shí wàn', '100000'], ['百万', 'bǎi wàn', '1000000']];
    const bead = 'M-33 0 Q-24 -15 0 -15 Q24 -15 33 0 Q24 15 0 15 Q-24 15 -33 0 Z';
    let g = `<rect x="2" y="2" width="${W - 4}" height="${frameH - 4}" rx="14" fill="#8A5A2B" stroke="#2B2B2B" stroke-width="4"/>` +
            `<rect x="${F}" y="${F}" width="${W - 2 * F}" height="${frameH - 2 * F}" rx="6" fill="#FFF8E7" stroke="#5C3A1A" stroke-width="2"/>`;
    for (let c = 0; c < cols; c++) g += `<line x1="${cx(c)}" y1="${F}" x2="${cx(c)}" y2="${frameH - F}" stroke="#6B4A2B" stroke-width="5"/>`;
    g += `<rect x="${F}" y="${beamY}" width="${W - 2 * F}" height="${BEAM}" fill="#8A5A2B" stroke="#5C3A1A" stroke-width="2"/>`;
    for (let c = 0; c < cols; c++) g += `<circle cx="${cx(c)}" cy="${beamY + BEAM / 2}" r="2.6" fill="#FFF8E7"/>`;
    for (let c = 0; c < cols; c++) {
      for (let i = 0; i < 2; i++) g += `<path class="bd" data-c="${c}" data-t="u" data-i="${i}" d="${bead}" fill="#C0533A" stroke="#2B2B2B" stroke-width="2.5"/>`;
      for (let i = 0; i < 5; i++) g += `<path class="bd" data-c="${c}" data-t="l" data-i="${i}" d="${bead}" fill="#C0533A" stroke="#2B2B2B" stroke-width="2.5"/>`;
      const P = PLACE[cols - 1 - c] || ['', '', ''];
      g += `<text x="${cx(c)}" y="${frameH + 18}" text-anchor="middle" class="ab-py">${P[1]}</text>` +
           `<text x="${cx(c)}" y="${frameH + 46}" text-anchor="middle" class="ab-zh">${P[0]}</text>` +
           `<text x="${cx(c)}" y="${frameH + 66}" text-anchor="middle" class="ab-en">${P[2]}</text>`;
    }
    box.innerHTML = `<svg class="abacus${opts.interactive ? ' live' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Chinese abacus">${g}</svg>`;
    const svg = box.querySelector('svg');
    const beads = [...svg.querySelectorAll('.bd')];
    function paint() {
      beads.forEach(b => {
        const c = +b.dataset.c, i = +b.dataset.i;
        let y;
        // 上珠：i = 0 靠近横梁；下珠：i = 0 靠近横梁
        if (b.dataset.t === 'u') { const slot = i < m[c] ? 2 - i : 1 - i; y = TOP + slot * SL + SL / 2; }
        else { const slot = i < k[c] ? i : i + 1; y = lowTop + 3 + slot * SL + SL / 2; }
        b.style.transform = `translate(${cx(c)}px, ${y}px)`;
      });
      svg.setAttribute('aria-label', 'Chinese abacus showing ' + A.get());
    }
    const A = {
      digits: () => m.map((u, c) => 5 * u + k[c]),
      get: () => A.digits().reduce((s, d) => s * 10 + d, 0),
      set(n) {
        const s = String(n).padStart(cols, '0').slice(-cols);
        for (let c = 0; c < cols; c++) { const d = +s[c]; m[c] = d >= 5 ? 1 : 0; k[c] = d % 5; }
        paint();
      },
      clear() { m.fill(0); k.fill(0); paint(); opts.onChange && opts.onChange(0); }
    };
    if (opts.interactive) {
      beads.forEach(b => b.addEventListener('pointerdown', e => {
        e.preventDefault();
        const c = +b.dataset.c, i = +b.dataset.i;
        if (b.dataset.t === 'u') m[c] = i < m[c] ? i : i + 1;
        else k[c] = i < k[c] ? i : i + 1;
        paint();
        opts.onChange && opts.onChange(A.get());
      }));
    }
    paint();
    return A;
  };

  window.ShihNum = N;
})();
