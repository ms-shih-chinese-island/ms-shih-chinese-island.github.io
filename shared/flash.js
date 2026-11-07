/* =====================================================================
   快闪活动：开关和题目都在「史老师的中文岛 · 岛主办公室」试算表里（Apps Script：Code.gs）
     「开关」那一页：快闪活动 选「休息中 Closed／抢答／抢地盘／都开放」
     「快闪题目」那一页（快闪抢答）：一行一题，四栏：类别、分数、题目、答案（格子里按 Ctrl + Enter 可以换行）
     「快闪抢地盘」「快闪抢地盘机会卡」两页（快闪抢地盘）
   开关跟岛的总开关一起问（gate.js 的 ShihState）；题目只有快闪活动开着的时候才拿得到。
   问不到的时候，快闪活动就当作「关」。
   ===================================================================== */
(function () {
  const OFF = { on: false, questions: [] };
  // 题目整理：分数一定要是数字，没有类别、没有题目的那一行不要
  function read(rows) {
    const qs = [];
    (rows || []).forEach(r => {
      const pts = +String(r[1] || '').replace(/[^\d]/g, '');
      if (!r[0] || !pts || !r[2] || /^(类别|類別)/.test(r[0])) return;
      qs.push({ cat: String(r[0]).trim(), pts, q: String(r[2]).trim(), a: String(r[3] || '').trim() });
    });
    return qs;
  }
  const state = () => (window.ShihState ? ShihState.ready : Promise.resolve({ flash: false }));
  let cache = null, landCache = null;
  window.ShihFlash = {
    parse: read,
    isOn() { return state().then(s => !!s.flash).catch(() => false); },
    // 哪几个开着：{ quiz, land }
    games() { return state().then(s => ({ quiz: !!s.quiz, land: !!s.land })).catch(() => ({ quiz: false, land: false })); },
    // 开关 + 题目
    load() {
      if (cache) return cache;
      cache = state().then(s => {
        if (!s.quiz || !window.ShihState || !ShihState.url) return OFF;
        return ShihState.ask({ a: 'flash' }).then(r => r && r.on ? { on: true, questions: read(r.rows) } : OFF);
      }).catch(() => OFF);
      return cache;
    },
    // 快闪抢地盘：{ on, rows: [[字, 字的拼音, 字的英文, 问题, 问题的拼音, 问题的英文, 回答的例子, 回答的拼音]], cards: [[卡片, 拼音, 英文, 动作]] }
    // 试玩版（demo）没有试算表：回传 { on: true, demo: true }，由游戏自己放范例
    loadLand() {
      if (landCache) return landCache;
      landCache = state().then(s => {
        if (!s.land) return { on: false };
        if (window.ShihState && ShihState.demo) return { on: true, demo: true };
        if (!window.ShihState || !ShihState.url) return { on: false };
        return ShihState.ask({ a: 'land' }).then(r => r && r.on ? { on: true, rows: r.rows || [], cards: r.cards || [] } : { on: false });
      }).catch(() => ({ on: false }));
      return landCache;
    }
  };
})();
