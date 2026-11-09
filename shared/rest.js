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
  window.Rest = R;
})();
