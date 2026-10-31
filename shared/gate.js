/* =====================================================================
   岛的总开关：读一张 Google 试算表里的下拉选单
     选「开」→ 网站照常开放
     选「关」→ 主页和所有游戏都只显示「岛休息中」
   试算表要先「档案 → 共用 → 发布到网络 → 逗号分隔值 (.csv)」，
   再把发布的网址贴到下面的 SWITCH_URL（两个引号中间）。
   SWITCH_URL 空着，或读不到试算表的时候，网站都照常开放。
   ===================================================================== */
(function () {
  // 手机直着拿的时候，请学生把手机横过来（平板和电脑不受影响）
  const st = document.createElement('style');
  st.textContent = '.rotateMe{display:none}' +
    '@media (orientation: portrait) and (max-width: 600px){' +
    '.rotateMe{display:flex;position:fixed;inset:0;z-index:99999;align-items:center;justify-content:center;flex-direction:column;gap:14px;' +
    'background:#BFE3EE;color:#2B2B2B;font-family:Andika,"Trebuchet MS",system-ui,sans-serif;text-align:center;padding:24px}' +
    'html.rotating body{overflow:hidden}}' +
    '.rotateMe .phone{font-size:84px;line-height:1;animation:rotPhone 2s ease-in-out infinite}' +
    '@keyframes rotPhone{0%,25%{transform:rotate(0)}55%,100%{transform:rotate(-90deg)}}' +
    '.rotateMe .r{display:inline-flex;gap:4px}.rotateMe .r>span{display:flex;flex-direction:column;align-items:center}' +
    '.rotateMe .py{font-size:18px;color:#1F5E73}.rotateMe .zh{font:700 36px "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif}' +
    '.rotateMe .en{font-size:20px;font-weight:700}';
  document.head.appendChild(st);
  document.documentElement.classList.add('rotating');
  const add = () => {
    const py = ['qǐng', 'bǎ', 'shǒu', 'jī', 'héng', 'guò', 'lái'], zh = Array.from('请把手机横过来');
    const d = document.createElement('div');
    d.className = 'rotateMe';
    d.innerHTML = '<div class="phone" aria-hidden="true">📱</div><div class="r">' +
      zh.map((c, i) => `<span><span class="py">${py[i]}</span><span class="zh">${c}</span></span>`).join('') +
      '</div><div class="en">Please turn your phone sideways.</div>';
    document.body.appendChild(d);
  };
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();

(function () {
  const SWITCH_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSA0fBLbL9ax5neV6n_Jc7DjfnjbwpDVvAMlU2lt0mwnqymZoqtGtvaNk6B9xphsF-Q8aUfkfB5LLdg/pub?output=csv';

  if (!SWITCH_URL) return;
  // 先把页面藏起来，读到开关再决定（最多等 3 秒，读不到就照常开放）
  const hide = document.createElement('style');
  hide.textContent = 'html.gateWait body { visibility: hidden; }';
  document.head.appendChild(hide);
  document.documentElement.classList.add('gateWait');
  const open = () => document.documentElement.classList.remove('gateWait');
  const timer = setTimeout(open, 3000);

  function closed() {
    // 游戏原本的程式找不到东西会报错，关岛的时候不用理它
    window.addEventListener('error', e => e.preventDefault(), true);
    window.addEventListener('unhandledrejection', e => e.preventDefault());
    const show = () => {
      document.title = '岛休息中 The island is closed';
      const py = ['dǎo', 'xiū', 'xi', 'zhōng'], zh = ['岛', '休', '息', '中'];
      document.body.innerHTML =
        `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#BFE3EE;padding:16px;box-sizing:border-box;font-family:Andika,'Trebuchet MS',system-ui,sans-serif;color:#2B2B2B">` +
        `<div style="background:#fff;border:4px solid #2B2B2B;border-radius:28px;padding:28px 34px;text-align:center;max-width:520px;box-shadow:0 8px 0 #1F5E73">` +
        `<div style="font-size:72px;line-height:1">🏝</div>` +
        `<div style="display:inline-flex;gap:6px;margin-top:12px">` +
        zh.map((c, i) => `<span style="display:flex;flex-direction:column;align-items:center"><span style="font-size:20px;color:#1F5E73">${py[i]}</span><span style="font:700 52px 'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif">${c}</span></span>`).join('') +
        `</div><p style="font-size:22px;font-weight:700;margin:14px 0 0">The island is closed. See you soon!</p></div></div>`;
      document.body.style.margin = '0';
      clearTimeout(timer); open();
    };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  }

  const url = SWITCH_URL + (SWITCH_URL.includes('?') ? '&' : '?') + 't=' + Date.now();
  fetch(url, { cache: 'no-store' })
    .then(r => r.ok ? r.text() : '')
    .then(t => {
      // 找试算表里写着「开」或「关」的那一格（下拉选单那格），其他说明文字不管
      const cells = t.split(/\r?\n/).flatMap(r => r.split(',')).map(c => c.replace(/"/g, '').trim());
      const v = cells.find(c => /^(开|開|关|關|open|close|closed|on|off)$/i.test(c)) || '';
      if (/^(关|關|close|closed|off)$/i.test(v)) closed();
      else { clearTimeout(timer); open(); }
    })
    .catch(() => { clearTimeout(timer); open(); });
})();

/* =====================================================================
   成绩记录：玩完一回合，就在老师的 Google 试算表加一行
     REPORT_URL：试算表程序「部署」后得到的网址（…/exec），贴在两个引号中间
     REPORT_URL 空着 → 不传任何东西，游戏照常玩
   这里只会「送出」，不会读回任何资料。
   同一台电脑：两笔之间至少隔 5 秒，一天最多 200 笔。
   ===================================================================== */
(function () {
  const REPORT_URL = 'https://script.google.com/macros/s/AKfycbx6dYuHysgRjq7enCJSOd8Q79mKm1l4j63_8OkqE9fqO5X7ANk7LyKPPbUjoB0BocO_/exec';

  const get = (k, d) => { try { const v = localStorage.getItem('shih:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem('shih:' + k, JSON.stringify(v)); } catch (e) {} };
  // 这台电脑的代号（随机 8 个字，用来算有几台电脑来玩，不是个人资料）
  function pid() {
    let p = get('pid', '');
    if (!/^[a-z0-9]{8}$/.test(p)) { p = Array.from({ length: 8 }, () => 'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random() * 32)]).join(''); set('pid', p); }
    return p;
  }
  const today = () => new Date().toISOString().slice(0, 10);
  function send(row) {
    if (!REPORT_URL) return false;
    const day = today(), q = get('sent', { day: '', n: 0, last: 0 });
    if (q.day !== day) { q.day = day; q.n = 0; }
    if (q.n >= 200 || Date.now() - (q.last || 0) < 5000) return false;
    q.n++; q.last = Date.now(); set('sent', q);
    const body = JSON.stringify(Object.assign({ pid: pid(), name: get('name', '') }, row));
    try { fetch(REPORT_URL, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' }, body }).catch(() => {}); } catch (e) {}
    return true;
  }
  window.ShihReport = {
    on: !!REPORT_URL,
    round: row => send(Object.assign({ type: 'round' }, row)),
    // 来玩了：一台电脑一天只记一次
    visit() { if (get('visitDay', '') === today()) return; if (send({ type: 'visit' })) set('visitDay', today()); }
  };
})();
