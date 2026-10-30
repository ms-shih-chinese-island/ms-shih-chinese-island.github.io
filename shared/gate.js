/* =====================================================================
   岛的总开关：读一张 Google 试算表里的下拉选单
     选「开」→ 网站照常开放
     选「关」→ 主页和所有游戏都只显示「岛休息中」
   试算表要先「档案 → 共用 → 发布到网络 → 逗号分隔值 (.csv)」，
   再把发布的网址贴到下面的 SWITCH_URL（两个引号中间）。
   SWITCH_URL 空着，或读不到试算表的时候，网站都照常开放。
   ===================================================================== */
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
