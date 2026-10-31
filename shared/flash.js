/* =====================================================================
   快闪活动：读「史老师的中文岛 · 快闪活动开关」那张试算表
     第一页（开关）：下拉选单选「开」或「关」
     Main 页：一行一题，四栏：类别、分数、题目、答案（格子里按 Ctrl + Enter 可以换行）
   两页都要「档案 → 共用 → 发布到网络」，分别选那一页、选「逗号分隔值 (.csv)」，
   再把两个网址贴到下面（两个引号中间）：
     SWITCH_URL：开关那一页
     FLASH_URL ：Main 那一页
   空着，或读不到试算表的时候，快闪活动就当作「关」。
   ===================================================================== */
(function () {
  const SWITCH_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRl6FX8xAqWMKRE0oFfroVLu9ulSEA3VCceBG8g4hpt5h-EwP4uU8Cd2ty291pPzmnWA1xqES2T-7Mg/pub?gid=1685737675&single=true&output=csv';
  const FLASH_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRl6FX8xAqWMKRE0oFfroVLu9ulSEA3VCceBG8g4hpt5h-EwP4uU8Cd2ty291pPzmnWA1xqES2T-7Mg/pub?gid=910259312&single=true&output=csv';

  // 读 CSV（有逗号、换行、引号的格子也读得对）
  function parseCSV(t) {
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (q) {
        if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && t[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.map(r => r.map(x => x.trim()));
  }

  // 开关页：找写着「开」或「关」的那一格（其他说明文字不管）
  function readSwitch(text) {
    const v = parseCSV(text).flat().find(c => /^(开|開|关|關|open|close|closed|on|off)$/i.test(c)) || '';
    return /^(开|開|open|on)$/i.test(v);
  }
  function read(text) {
    const rows = parseCSV(text);
    const qs = [];
    rows.forEach(r => {
      const pts = +String(r[1] || '').replace(/[^\d]/g, '');
      if (!r[0] || !pts || !r[2] || /^(类别|類別)/.test(r[0])) return;
      qs.push({ cat: r[0], pts, q: r[2], a: r[3] || '' });
    });
    return qs;
  }

  const get = u => fetch(u + (u.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.text() : '');
  let cache = null;
  window.ShihFlash = {
    url: FLASH_URL,
    parse: read,
    isOn() { return this.load().then(F => F.on); },
    // 开关 + 题目。两页读回来以后，有题目的那一页是 Main，没有题目的那一页是开关（就算两个网址放反了也没关系）
    load() {
      if (cache) return cache;
      if (!SWITCH_URL || !FLASH_URL) return (cache = Promise.resolve({ on: false, questions: [] }));
      cache = Promise.all([get(SWITCH_URL).catch(() => ''), get(FLASH_URL).catch(() => '')]).then(([a, b]) => {
        const qa = read(a), qb = read(b);
        const [sw, questions] = qa.length && !qb.length ? [b, qa] : [a, qb];
        return { on: readSwitch(sw), questions };
      }).catch(() => ({ on: false, questions: [] }));
      return cache;
    }
  };
})();
