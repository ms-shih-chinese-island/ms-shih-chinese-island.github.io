/* =====================================================================
   共用零件：所有游戏都用这一份
   （拼音排版、岛的横条、读取单元生词、配音、计时器、冰淇淋难度、开始画面）
   一般不需要改这个档案。
   ===================================================================== */
(function () {
  const S = {};

  // ---- 拼音在上、中文在下 ----
  S.ruby = function (zh, py) {
    const p = String(py || '').split(' ');
    return Array.from(zh).map((c, i) => `<span><span class="py">${p[i] || ''}</span><span class="zh">${c}</span></span>`).join('');
  };
  // a whole sentence with pinyin over each character; punctuation gets no pinyin
  S.rubyText = function (zh, py) {
    const syl = String(py || '').replace(/[.,?!;:，。？！、\/／]/g, ' ').trim().split(/\s+/).filter(Boolean);
    let k = 0;
    return Array.from(zh).map(c => {
      const han = /[\u3400-\u9fff]/.test(c);
      const p = han ? (syl[k++] || '') : '';
      return `<span><span class="py">${p || '&nbsp;'}</span><span class="zh">${c}</span></span>`;
    }).join('');
  };
  // fill a sentence pattern like { zh: '我看到{x}。', py: 'wǒ kàn dào {x}.' } with a word
  S.fill = (tpl, w) => ({ zh: tpl.zh.replace('{x}', w ? w.zh : '＿＿'), py: tpl.py.replace('{x}', w ? w.py : ''), en: (tpl.en || '').replace('{x}', w ? S.withArticle(w) : '___') });
  S.withArticle = w => {
    if (w.a) return w.a;
    const e = w.en || '';
    if (/s$/.test(e) || /^(candy)$/i.test(e)) return e;
    return (/^[aeiou]/i.test(e) ? 'an ' : 'a ') + e;
  };
  S.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- 记住设定（声音、计时器、难度）。读不到也没关系 ----
  S.get = (k, d) => { try { const v = localStorage.getItem('shih:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  S.set = (k, v) => { try { localStorage.setItem('shih:' + k, JSON.stringify(v)); } catch (e) {} };

  // ---- 岛的横条：每个游戏的第一行，点了回到岛上 ----
  S.islandBar = function () {
    const a = document.createElement('a');
    a.className = 'islandBar';
    a.href = '../';
    a.innerHTML = `<span aria-hidden="true">🏝</span><span class="ruby">${S.ruby('史老师的中文游戏岛', 'shǐ lǎo shī de zhōng wén yóu xì dǎo')}</span>` +
      `<span class="en">Ms. Shih's Island of Chinese Games</span><span class="back">← Back to the island</span>`;
    const bar = document.createElement('div');
    bar.className = 'islandBarWrap';
    bar.appendChild(a);
    document.body.insertBefore(bar, document.body.firstChild);
    // find which place on the island this game belongs to, and add a "back to that place" button
    const s = document.createElement('script');
    s.src = '../island.js';
    s.onload = () => {
      const here = location.pathname.split('/').pop() + '?unit=' + S.unitId();
      let place = null;
      Object.values(window.ISLANDS || {}).forEach(I => I.places.forEach(P => {
        (P.games || []).forEach(g => { if (P.id && g.href.split('/').pop() === here) place = P; });
      }));
      if (!place) return;
      const b = document.createElement('a');
      b.className = 'placeBtn';
      b.href = '../#' + place.id;
      b.innerHTML = `<span aria-hidden="true">←</span><span class="ruby">${S.ruby(place.zh, place.py)}</span><span class="en">${S.esc(place.en)}</span>`;
      b.setAttribute('aria-label', 'Back to ' + place.en);
      // goes at the end of the game's buttons (right of Start over)
      const controls = document.querySelector('.controls');
      (controls || bar).appendChild(b);
    };
    document.head.appendChild(s);
  };

  // ---- 读取单元：网址 ?unit=family 就读 units/family/words.js ----
  S.unitId = function () {
    const u = new URLSearchParams(location.search).get('unit') || 'family';
    return /^[a-z0-9-]+$/.test(u) ? u : 'family';
  };
  S.loadUnit = function () {
    const id = S.unitId();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `../units/${id}/words.js`;
      s.onload = () => window.UNIT ? resolve(window.UNIT) : reject(new Error('no UNIT in ' + s.src));
      s.onerror = () => reject(new Error('cannot load ' + s.src));
      document.head.appendChild(s);
    }).catch(err => {
      document.body.insertAdjacentHTML('beforeend',
        `<p style="font-size:20px;color:#C2372F">This game can't find its word list (units/${S.esc(id)}/words.js). Check the folder name in the link.</p>`);
      throw err;
    });
  };
  // a word from the unit by its Chinese
  S.wordMap = unit => Object.fromEntries(unit.words.map(w => [w.zh, w]));

  // ---- 配音：用装置内建的中文语音 ----
  S.SPEED = 0.55;          // 念的速度：1 = 正常，越小越慢
  let zhVoice = null;
  function findVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    zhVoice = vs.find(v => /zh[-_]CN/i.test(v.lang)) || vs.find(v => /^zh/i.test(v.lang) && !/HK|yue/i.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) { findVoice(); speechSynthesis.onvoiceschanged = findVoice; }
  S.soundOn = S.get('sound', true);
  S.speak = function (text) {
    if (!S.soundOn || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN'; u.rate = S.SPEED;
    if (zhVoice) u.voice = zhVoice;
    speechSynthesis.speak(u);
  };

  // ---- on / off 按钮（声音、计时器） ----
  S.toggle = function (btn, key, onText, offText, dflt, onChange) {
    let on = S.get(key, dflt);
    const paint = () => { btn.setAttribute('aria-pressed', String(on)); btn.textContent = on ? onText : offText; };
    paint();
    btn.addEventListener('click', () => { on = !on; S.set(key, on); paint(); onChange && onChange(on); });
    onChange && onChange(on);
    return () => on;
  };
  S.soundButton = function (btn) {
    return S.toggle(btn, 'sound', '🔊 Sound on', '🔇 Sound off', true, on => {
      S.soundOn = on;
      if (!on && 'speechSynthesis' in window) speechSynthesis.cancel();
    });
  };

  // ---- 计时器 ----
  S.fmt = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  S.timer = function (el) {
    let start = 0, tick = null;
    const T = {
      start() { start = Date.now(); clearInterval(tick); tick = setInterval(() => el.textContent = S.fmt(Date.now() - start), 250); },
      stop() { clearInterval(tick); tick = null; return start ? Date.now() - start : 0; },
      reset() { clearInterval(tick); tick = null; start = 0; el.textContent = '0:00'; }
    };
    return T;
  };

  // ---- 冰淇淋难度按钮 ----
  const SCOOPS = ['#F7A8C4', '#A8E0C2', '#9B6B4E', '#FBE7A1', '#B9D3F5', '#F2B27A'];
  S.iceCream = function (n) {
    let g = '<path d="M7 34 L23 34 L15 55 Z" fill="#E8B46A" stroke="#8A5A2B" stroke-width="1.5" stroke-linejoin="round"/>' +
            '<path d="M10 38 L19 45 M13 34 L21 41 M9 41 L16 50" stroke="#8A5A2B" stroke-width="1" fill="none"/>';
    for (let k = 0; k < n; k++) g += `<circle cx="15" cy="${30 - k * 8.5}" r="8.5" fill="${SCOOPS[k % SCOOPS.length]}" stroke="#2B2B2B" stroke-width="1.5"/>`;
    return `<svg viewBox="0 ${-6 - Math.max(0, n - 4) * 8.5} 30 ${62 + Math.max(0, n - 4) * 8.5}" aria-hidden="true">${g}</svg>`;
  };
  // 几只鬼（鬼屋的难度）
  S.ghosts = function (n) {
    const one = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 22 L0 9 C0 -3 18 -3 18 9 L18 22 L14 19 L9 23 L4 19 Z" fill="#FFFFFF" stroke="#2B2B2B" stroke-width="1.8" stroke-linejoin="round"/>` +
      `<circle cx="6" cy="9" r="1.6" fill="#2B2B2B"/><circle cx="12" cy="9" r="1.6" fill="#2B2B2B"/><ellipse cx="9" cy="14" rx="1.8" ry="2.2" fill="#2B2B2B"/></g>`;
    let g = '';
    for (let k = 0; k < n; k++) g += one(k * 14, k % 2 ? 6 : 0);
    return `<svg viewBox="-2 -2 ${18 + (n - 1) * 14 + 4} 32" aria-hidden="true" style="width:${22 + (n - 1) * 17}px;height:40px">${g}</svg>`;
  };
  // 几个钱袋（数字的难度）
  S.moneyBags = function (n) {
    const one = x => `<g transform="translate(${x} 0)">` +
      `<path d="M9 11 Q1 17 2 24 Q3 31 14 31 Q25 31 26 24 Q27 17 19 11 Z" fill="#F2C94C" stroke="#2B2B2B" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M8 3 L11 7 L14 3.5 L17 7 L20 3 L19 10 L9 10 Z" fill="#F2C94C" stroke="#2B2B2B" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="M8.5 11 L19.5 11" stroke="#8A5A2B" stroke-width="2.6" stroke-linecap="round"/>` +
      `<text x="14" y="26.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="#8A5A2B">$</text></g>`;
    let g = '';
    for (let k = 0; k < n; k++) g += one(k * 22);
    return `<svg viewBox="0 0 ${28 + (n - 1) * 22 + 2} 34" aria-hidden="true" style="width:${30 + (n - 1) * 24}px;height:40px">${g}</svg>`;
  };
  // 几只挥手（你好吗的难度）
  S.bags = n => `<span aria-hidden="true" style="font-size:22px;letter-spacing:-3px;line-height:40px;white-space:nowrap">${'🎒'.repeat(n)}</span>`;
  S.waves = n => `<span aria-hidden="true" style="font-size:24px;letter-spacing:-4px;line-height:40px;white-space:nowrap">${'👋'.repeat(n)}</span>`;
  // levels: [{ note }, ...]   countOf(level) -> how many items at that level
  // icon: 'icecream' (default), 'ghost', 'money', 'wave' or 'bag'
  // from：这个游戏从第几级开始（例如对话框从第 2 级开始），前面的级不显示
  S.levelButtons = function (box, levels, current, countOf, onPick, icon, from) {
    box.innerHTML = '';
    const btns = levels.map((L, k) => {
      if (from && k + 1 < from) return null;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'level'; b.dataset.level = k + 1;
      const n = countOf ? countOf(k + 1) : null;
      b.innerHTML = (icon === 'ghost' ? S.ghosts(k + 1) : icon === 'money' ? S.moneyBags(k + 1) : icon === 'wave' ? S.waves(k + 1) : icon === 'bag' ? S.bags(k + 1) : S.iceCream(k + 1)) + `<span class="lv-text">Level ${k + 1}<small>${S.esc([L.note, n ? n + ' words' : ''].filter(Boolean).join(' · '))}</small></span>`;
      b.addEventListener('click', () => onPick(k + 1));
      box.appendChild(b);
      return b;
    }).filter(Boolean);
    return lv => btns.forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.level === lv)));
  };
  // level from the link (#3) or from last time
  S.startLevel = function (key, max, min) {
    min = min || 1;
    const h = +(location.hash || '').replace(/\D/g, '');
    if (h >= min && h <= max) return h;
    const saved = +S.get(key, min);
    return saved >= min && saved <= max ? saved : min;
  };

  // ---- 读取单元的图（units/<单元>/art.js），没有也没关系 ----
  S.loadArt = function () {
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = `../units/${S.unitId()}/art.js`;
      s.onload = () => resolve(window.ART || null);
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
  };

  // ---- 拖拉：卡片拖到格子里；也可以「点卡片，再点格子」 ----
  // opts: { slots: () => [slot elements], accept(card, slot) -> true/false, onTapCard(card) (optional) }
  S.dragCards = function (cards, opts) {
    let drag = null, picked = null;
    const slotAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      const s = el && el.closest('.dropSlot');
      return s && opts.slots().includes(s) ? s : null;
    };
    const tryDrop = (card, slot) => {
      if (!slot) return;
      if (!opts.accept(card, slot)) { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 400); }
    };
    function down(e) {
      const card = e.currentTarget;
      if (card.classList.contains('used') || drag) return;
      e.preventDefault();
      const r = card.getBoundingClientRect();
      drag = { card, x0: e.clientX, y0: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, id: e.pointerId, moved: false, over: null, w: r.width };
      addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    }
    function move(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        drag.ph = document.createElement('div');
        drag.ph.className = 'cardPh';
        drag.ph.style.width = drag.w + 'px'; drag.ph.style.height = drag.card.offsetHeight + 'px';
        drag.card.after(drag.ph);
        drag.card.classList.add('dragging'); drag.card.style.width = drag.w + 'px';
      }
      drag.card.style.left = (e.clientX - drag.dx) + 'px'; drag.card.style.top = (e.clientY - drag.dy) + 'px';
      const s = slotAt(e.clientX, e.clientY);
      if (s !== drag.over) { if (drag.over) drag.over.classList.remove('hover'); if (s) s.classList.add('hover'); drag.over = s; }
    }
    function up(e) {
      if (!drag || e.pointerId !== drag.id) return;
      removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
      const d = drag; drag = null;
      if (d.over) d.over.classList.remove('hover');
      if (d.moved) {
        d.card.classList.remove('dragging'); d.card.style.left = d.card.style.top = d.card.style.width = '';
        d.ph.remove();
        tryDrop(d.card, slotAt(e.clientX, e.clientY));
      } else if (opts.onTapCard) {
        opts.onTapCard(d.card);
      } else {                                   // tap: pick this card, then tap a slot
        if (picked) picked.classList.remove('picked');
        picked = picked === d.card ? null : d.card;
        if (picked) picked.classList.add('picked');
      }
    }
    cards.forEach(c => c.addEventListener('pointerdown', down));
    return {
      tapSlot(slot) { if (picked) { const c = picked; picked.classList.remove('picked'); picked = null; tryDrop(c, slot); } }
    };
  };

  // ---- 开始画面：游戏区先模糊，按 Start 才开始 ----
  S.startCover = function (area, onStart) {
    const cover = document.createElement('div');
    cover.className = 'startCover';
    cover.innerHTML = `<button type="button" class="startBtn"><span class="ruby">${S.ruby('开始', 'kāi shǐ')}</span><span>Start</span></button>`;
    area.appendChild(cover);
    cover.querySelector('button').addEventListener('click', () => { area.classList.remove('waiting'); cover.hidden = true; onStart(); });
    return function wait() { area.classList.add('waiting'); cover.hidden = false; };
  };

  window.Shih = S;
})();
