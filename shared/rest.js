/* =====================================================================
   餐厅游戏共用的小工具（请给我、小小服务生、爱吃不爱吃、餐厅对话框）
   Rest.modeRow(onChange)   👀 看 ／ 👂 听 一排按钮（听力关多一颗金币），回传 () => 'read' | 'listen'
   Rest.list(words)         「A」「A和B」「A、B和C」 → { zh, py }
   Rest.say(zh, py)         一句有拼音的 HTML
   Rest.alt(w)              另一个说法：（汤勺）（披萨）（义大利面）
   ===================================================================== */
(function () {
  const S = window.Shih;
  const R = {};
  // ---- 👀 看 ／ 👂 听 ----
  R.MODES = [
    { id: 'read',   icon: '👀', zh: '看', py: 'kàn',  en: 'Read' },
    { id: 'listen', icon: '👂', zh: '听', py: 'tīng', en: 'Listen (+1 coin)' }
  ];
  R.modeRow = function (onChange) {
    let mode = S.get('restMode', 'read') === 'listen' ? 'listen' : 'read';
    S.coinBonus = () => (mode === 'listen' ? 1 : 0);
    const paint = S.choiceRow(R.MODES, mode, id => { mode = id; S.set('restMode', id); paint(id); onChange && onChange(id); }, 'Read or listen');
    return () => mode;
  };
  // ---- 「A、B和C」 ----
  R.list = function (ws) {
    if (ws.length === 1) return { zh: ws[0].zh, py: ws[0].py };
    const head = ws.slice(0, -1), last = ws[ws.length - 1];
    return { zh: head.map(w => w.zh).join('、') + '和' + last.zh, py: head.map(w => w.py).join(' ') + ' hé ' + last.py };
  };
  R.say = (zh, py) => `<span class="ruby">${S.rubyText(zh, py)}</span>`;
  R.alt = w => w && w.alt ? `<span class="altName">（<span class="ruby">${S.ruby(w.alt.zh, w.alt.py)}</span>）</span>` : '';
  // 只念中文（英文、符号不念）
  R.speak = zh => S.speak(String(zh).replace(/[A-Za-z$]+/g, ''));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  R.shuffle = shuffle;
  R.pick = a => a[Math.floor(Math.random() * a.length)];
  R.take = (a, n) => shuffle(a).slice(0, n);
  // ---- 节日送的东西（万圣节送糖果）：点菜算一算、餐厅对话框、快手出菜玩完的时候，在「太棒了」下面出现 ----
  //   UNIT.gift 是 units/restaurant/words.js 的特餐设定放的；不用回答，跟金币没有关系
  const GIFT_GAMES = ['pay', 'dine', 'serve'];
  function showGift() {
    const U = window.UNIT, win = document.getElementById('winMsg');
    if (!U || !U.gift || !win || win.hidden || win.querySelector('.giftNote')) return;
    const g = U.gift, art = window.RART && RART.has(g.zh) ? RART.svg(g.zh) : '';
    const d = document.createElement('div');
    d.className = 'giftNote';
    d.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:10px;flex-basis:100%;margin-top:6px;color:#7A3E9D';
    d.innerHTML = `<span style="width:56px;height:56px;display:inline-flex">${art.replace('<svg ', '<svg width="56" height="56" ')}</span>` +
      `<span class="ruby">${S.rubyText(g.say.zh, g.say.py)}</span><span style="font-size:15px;color:#555">${S.esc(g.say.en)}</span>`;
    win.style.flexWrap = 'wrap';
    win.appendChild(d);
    setTimeout(() => R.speak(g.say.zh), 1200);
  }
  function watchGift() {
    const win = document.getElementById('winMsg');
    if (!win || !GIFT_GAMES.includes(S.gameId())) return;
    new MutationObserver(() => { if (win.hidden) { const n = win.querySelector('.giftNote'); if (n) n.remove(); } else showGift(); })
      .observe(win, { attributes: true, attributeFilter: ['hidden'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchGift); else watchGift();
  window.Rest = R;
})();
