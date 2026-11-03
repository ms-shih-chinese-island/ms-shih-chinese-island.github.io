/* =====================================================================
   每一页最先读的档：手机直拿的提示、岛的总开关、快闪活动的开关、成绩记录、包场（密码锁）
   ===================================================================== */
/* ---- 手机直着拿的时候，请学生把手机横过来 ---- */
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

/* =====================================================================
   网站的开关，全部在「史老师的中文岛 · 岛主办公室」试算表的「开关」那一页（Apps Script：Code.gs）
     岛的总开关：选「关」→ 主页和所有游戏都只显示「岛休息中」
     快闪活动  ：选「开」→ 广场上冒出帐篷
     包场      ：自动／开／关（见下面「包场」）
   网站用 Apps Script 的网址（…/exec）来问，一次就问完。
   SHIH_URL 空着，或问不到的时候：岛照常开放、快闪活动关、不包场。
   ===================================================================== */
const SHIH_URL = 'https://script.google.com/macros/s/AKfycbx6dYuHysgRjq7enCJSOd8Q79mKm1l4j63_8OkqE9fqO5X7ANk7LyKPPbUjoB0BocO_/exec';
const SHIH_DEMO = false;   // 试玩版用：不连试算表，一直包场，每栋的密码都是 1234

(function () {
  const get = (k, d) => { try { const v = localStorage.getItem('shih:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const keys = () => { const k = get('keys', {}); return k && typeof k === 'object' ? k : {}; };
  const OFF = { open: true, flash: false, on: false, ok: [] };
  function ask(params) {
    const q = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&');
    return Promise.race([
      fetch(SHIH_URL + '?' + q, { cache: 'no-store' }).then(r => r.json()),
      new Promise((_, no) => setTimeout(() => no(new Error('slow')), 5000))
    ]);
  }
  function load() {
    if (SHIH_DEMO) { const k = keys(); return Promise.resolve({ open: true, flash: false, on: true, ok: Object.keys(k).filter(id => k[id] === '1234') }); }
    if (!SHIH_URL) return Promise.resolve(OFF);
    const k = keys(), codes = Object.keys(k).slice(0, 30).map(id => id + ':' + k[id]).join(',');
    // 一分钟内同样的问题不用再问一次（换页的时候比较快）
    try {
      const c = JSON.parse(sessionStorage.getItem('shih:state') || 'null');
      if (c && c.codes === codes && Date.now() - c.t < 60000) return Promise.resolve(c.s);
    } catch (e) {}
    return ask({ a: 'state', codes }).then(r => {
      const s = { open: !(r && r.open === false), flash: !!(r && r.flash), on: !!(r && r.on), ok: (r && r.ok) || [] };
      try { sessionStorage.setItem('shih:state', JSON.stringify({ codes, t: Date.now(), s })); } catch (e) {}
      return s;
    }).catch(() => OFF);
  }
  window.ShihState = {
    ready: load(),
    ask,
    demo: SHIH_DEMO,
    url: SHIH_URL,
    forget() { try { sessionStorage.removeItem('shih:state'); } catch (e) {} }
  };
})();

/* ---- 岛的总开关：先把页面藏起来，问到开关再决定（问不到就照常开放） ---- */
(function () {
  const hide = document.createElement('style');
  hide.textContent = 'html.gateWait body { visibility: hidden; }';
  document.head.appendChild(hide);
  document.documentElement.classList.add('gateWait');
  const open = () => document.documentElement.classList.remove('gateWait');

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
      open();
    };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  }
  ShihState.ready.then(s => { if (s.open === false) closed(); else open(); }).catch(open);
})();

/* =====================================================================
   成绩记录：玩完一回合，就在老师的 Google 试算表加一行
     网址就是上面的 SHIH_URL；空着 → 不传任何东西，游戏照常玩
   这里只会「送出」，不会读回任何资料。
   同一台电脑：两笔之间至少隔 5 秒，一天最多 200 笔。
   ===================================================================== */
(function () {
  const REPORT_URL = SHIH_URL;

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

/* =====================================================================
   包场（密码锁）：岛主办公室试算表「开关」那一页的「包场」
     选「自动」→ 美东时间星期一到五 9:00–15:30 包场，其他时间全部开放
     选「开」→ 一直包场；选「关」→ 一直开放
   包场的时候，每栋建筑都要输入那一栋的 4 位数密码才能进去（密码在试算表上，网站看不到）。
   这台电脑输入过的密码会记住，直到老师按「产生新密码」。
   ===================================================================== */
(function () {
  const get = (k, d) => { try { const v = localStorage.getItem('shih:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem('shih:' + k, JSON.stringify(v)); } catch (e) {} };
  const pid = () => get('pid', '') || 'nopid000';
  const keys = () => { const k = get('keys', {}); return k && typeof k === 'object' ? k : {}; };
  const IN_GAME = /\/games\//.test(location.pathname);
  const base = IN_GAME ? '../' : '';

  // ---- 包场的状态：跟总开关一起问（ShihState） ----
  let state = null;   // { on: true/false, ok: [建筑代号…] }
  const ask = params => {
    if (ShihState.demo) return Promise.resolve({ ok: params.code === '1234', on: true });
    if (!ShihState.url) return Promise.resolve({ ok: true });
    return ShihState.ask(params);
  };
  const locked = id => !!(state && state.on && id && !state.ok.includes(id));

  // ---- 输入密码的框 ----
  const css = document.createElement('style');
  css.textContent =
    '.resvBack{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(43,43,43,.45);padding:16px;font-family:Andika,"Trebuchet MS",system-ui,sans-serif;color:#2B2B2B}' +
    '.resvBack.full{background:#BFE3EE}' +
    '.resvBox{position:relative;background:#fff;border:4px solid #2B2B2B;border-radius:24px;padding:22px 28px 20px;text-align:center;max-width:440px;width:100%;box-shadow:0 8px 0 #1F5E73}' +
    '.resvBox .party{font-size:46px;line-height:1}' +
    '.resvBox .place{display:inline-flex;gap:4px;margin-top:6px}.resvBox .place>span{display:flex;flex-direction:column;align-items:center}' +
    '.resvBox .place .py{font-size:15px;color:#1F5E73}.resvBox .place .zh{font:700 30px "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif}' +
    '.resvBox .en{font-size:14px;font-weight:700;color:#5F6B70}' +
    '.resvBox h2{font-size:21px;margin:12px 0 4px}.resvBox p{margin:4px 0 12px;font-size:17px}' +
    '.resvBox input{font:700 36px/1 Andika,monospace;letter-spacing:18px;text-align:center;width:220px;padding:10px 0 10px 18px;border:3px solid #7A5BC7;border-radius:14px;background:#F4F0FC;color:#2B2B2B;outline:none}' +
    '.resvBox input:focus{box-shadow:0 0 0 4px rgba(122,91,199,.3)}' +
    '.resvBox .go{display:block;margin:14px auto 0;font:700 20px Andika,sans-serif;padding:10px 34px;border:3px solid #2B2B2B;border-radius:14px;background:#45A852;color:#fff;cursor:pointer;box-shadow:0 4px 0 #2B2B2B}' +
    '.resvBox .go:active{transform:translateY(3px);box-shadow:0 1px 0 #2B2B2B}' +
    '.resvBox .msg{min-height:22px;margin-top:10px;font-size:16px;font-weight:700;color:#C0392B}' +
    '.resvBox .x{position:absolute;top:8px;right:12px;border:0;background:none;font-size:26px;cursor:pointer;color:#5F6B70}' +
    '.resvBox .home{display:inline-block;margin-top:8px;font-size:16px;font-weight:700;color:#1F5E73}' +
    '.resvBox.nope{animation:resvNope .4s}@keyframes resvNope{20%{transform:translateX(-10px)}50%{transform:translateX(10px)}80%{transform:translateX(-5px)}}' +
    'html.resvWait body{visibility:hidden}';
  document.head.appendChild(css);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function placeRuby(P) {
    const zh = Array.from(P.zh), py = (P.py || '').split(' ');
    return '<span class="place">' + zh.map((c, i) => `<span><span class="py">${esc(py[i] || '')}</span><span class="zh">${esc(c)}</span></span>`).join('') + '</span>';
  }
  // 跳出框：输入对了 resolve(true)；关掉 resolve(false)。full = 游戏页（整页挡住、不能关，只能回岛上）
  function prompt(P, full) {
    return new Promise(done => {
      const back = document.createElement('div');
      back.className = 'resvBack' + (full ? ' full' : '');
      back.innerHTML = `<div class="resvBox" role="dialog" aria-modal="true" aria-label="Special event">` +
        (full ? '' : '<button class="x" type="button" aria-label="Close">✕</button>') +
        `${P ? placeRuby(P) + `<div class="en">${esc(P.en || '')}</div>` : ''}` +
        `<h2>Special event today!</h2><p>Enter with your invitation code:</p>` +
        `<input type="text" inputmode="numeric" autocomplete="off" maxlength="4" aria-label="4-digit code">` +
        `<button class="go" type="button">Go in</button><div class="msg" aria-live="polite"></div>` +
        (full ? `<a class="home" href="${base}">← Back to the island</a>` : '') + `</div>`;
      document.body.appendChild(back);
      const box = back.querySelector('.resvBox'), inp = back.querySelector('input'), msg = back.querySelector('.msg');
      setTimeout(() => inp.focus(), 50);
      inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 4); msg.textContent = ''; });
      let busy = false;
      const close = ok => { back.remove(); done(ok); };
      const go = () => {
        if (busy) return;
        const code = inp.value;
        if (!/^\d{4}$/.test(code)) { msg.textContent = 'Type 4 numbers.'; return; }
        busy = true; msg.textContent = '';
        ask({ a: 'check', id: P.id, code, pid: pid() }).then(r => {
          busy = false;
          if (r && r.ok) {
            const k = keys(); k[P.id] = code; set('keys', k);
            ShihState.forget();
            if (state && !state.ok.includes(P.id)) state.ok.push(P.id);
            close(true);
          } else {
            box.classList.remove('nope'); void box.offsetWidth; box.classList.add('nope');
            msg.textContent = r && r.wait ? 'Too many tries. Please wait a few minutes.' : "That code doesn't work. Try again!";
            inp.value = ''; inp.focus();
          }
        }).catch(() => { busy = false; close(true); });   // 连不上：放行
      };
      back.querySelector('.go').addEventListener('click', go);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
      const x = back.querySelector('.x');
      if (x) { x.addEventListener('click', () => close(false)); back.addEventListener('click', e => { if (e.target === back) close(false); }); }
    });
  }

  // ---- 找这一页是哪一栋（游戏页）：照 island.js 的游戏网址找；图书馆挑字去配对也算图书馆 ----
  const EXTRA = { 'match.html?unit=library': 'library' };
  function placeOfPage() {
    const u = new URLSearchParams(location.search).get('unit') || '';
    const file = location.pathname.split('/').pop() || '', here = file + '?unit=' + u;
    let found = null, byFile = null;
    Object.values(window.ISLANDS || {}).forEach(I => I.places.forEach(P => {
      if (!P.id) return;
      (P.games || []).forEach(g => {
        const h = g.href.split('/').pop();
        if (h === here) found = P;
        if (h.split('?')[0] === file && !byFile) byFile = P;   // 网址没写 unit：同一个游戏档就算
      });
      if (EXTRA[here] === P.id) found = P;
    }));
    return found || (u ? null : byFile);
  }
  function loadIslands() {
    if (window.ISLANDS) return Promise.resolve();
    return new Promise(res => { const s = document.createElement('script'); s.src = base + 'island.js'; s.onload = s.onerror = () => res(); document.head.appendChild(s); });
  }

  const ready = ShihState.ready.then(s => { state = s; return s; });
  window.ShihReserve = {
    ready, locked,
    // 主页用：要进这一栋。没包场或已经打开就直接 true，不然跳出输入框
    enter: P => ready.then(() => locked(P.id) ? prompt(P, false) : true),
    state: () => state
  };

  if (IN_GAME) {
    // 游戏页：先藏起来，问到包场状态再说（最多等 5 秒，问不到就照常开放）
    document.documentElement.classList.add('resvWait');
    const show = () => document.documentElement.classList.remove('resvWait');
    Promise.all([ready, loadIslands()]).then(() => {
      const P = placeOfPage();
      if (!P || !locked(P.id)) return show();
      const go = () => { show(); prompt(P, true); };
      if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
    }).catch(show);
  }
})();
