/* =====================================================================
   请给我（games/give.html）、小小服务生（games/serve.html）共用的玩法
   window.SERVE_MODE = 'give'  只有餐具：Level 1 请给我筷子。Level 2 请给我叉子和刀子。
                     = 'serve' 点菜＋餐具：
                         Level 1 请给我炒饭。请给我筷子。／你有没有饺子？（按 有／没有）
                         Level 2 请给我汉堡包和薯条。请给我叉子和餐巾。／你有没有热狗？
                         Level 3 你要吃什么主菜？→ 我要吃芝麻鸡、炒饭和酸辣汤。请给我筷子和汤匙。
   点厨房的东西放上托盘（再点一下拿回来），按「上菜」。全部对了绿色的勾；错了红色的叉、托盘摇一摇、东西回到厨房。
   👀 看：顾客的话有字；👂 听：只有 🔊，答对以后才看到字（多一颗金币）
   ===================================================================== */
Shih.islandBar();
Shih.loadUnit().then(UNIT => {
  const MODE = window.SERVE_MODE || 'serve';
  const C = UNIT[MODE];
  const KIDS = window.ART;                // 小朋友（顾客）：shared/kids.js
  const RART = window.RART;
  const $ = id => document.getElementById(id);
  const { list, say, pick, take, shuffle } = Rest;
  const W = Shih.wordMap(UNIT);
  const LEVELS = UNIT.levels.slice(0, C.levelsUsed || UNIT.levels.length);
  if (MODE === 'give') { LEVELS[0] = { note: 'One thing' }; LEVELS[1] = { note: 'Two things + 和' }; }
  document.title = `${C.title.zh} ${C.title.en}`;
  $('titleRuby').innerHTML = Shih.ruby(C.title.zh, C.title.py);
  $('titleEn').textContent = C.title.en;
  $('winRuby').innerHTML = Shih.ruby('太棒了', 'tài bàng le');
  $('kitchenCap').innerHTML = `<span class="ruby">${Shih.ruby(MODE === 'give' ? '餐具' : '厨房', MODE === 'give' ? 'cān jù' : 'chú fáng')}</span> ${MODE === 'give' ? 'Tableware' : 'Kitchen'}`;
  $('serveBtn').innerHTML = `<span class="ruby">${Shih.ruby(MODE === 'give' ? '给你' : '上菜', MODE === 'give' ? 'gěi nǐ' : 'shàng cài')}</span> ${MODE === 'give' ? 'Give' : 'Serve'}`;
  $('yesBtn').innerHTML = `<span class="ruby">${Shih.ruby('有', 'yǒu')}</span> Yes`;
  $('noBtn').innerHTML = `<span class="ruby">${Shih.ruby('没有', 'méi yǒu')}</span> No`;
  const timerEl = $('timer'), timer = Shih.timer(timerEl);
  const timerOn = Shih.toggle($('timerBtn'), 'timer', '⏱ Timer on', '⏱ Timer off', true, on => { timerEl.hidden = !on; });
  Shih.soundButton($('soundBtn'));

  // ---- 👀／👂 和 Level ----
  const mode = Rest.modeRow(() => { buildLevels(); setup(); });
  let level = Shih.startLevel(MODE + 'Level', LEVELS.length);
  let paintLevels = () => {};
  function buildLevels() {
    paintLevels = Shih.levelButtons($('levels'), LEVELS, level, null, lv => { level = lv; Shih.set(MODE + 'Level', lv); setup(); });
  }
  buildLevels();
  const help = () => {
    const ear = mode() === 'listen' ? 'Tap 🔊 and listen to the customer. ' : 'Read what the customer says. ';
    return ear + (MODE === 'give' ? 'Tap the tableware they want, then tap 给你 (give).' : 'Put everything they want on the tray, then tap 上菜 (serve).');
  };

  // ---- 一句话 ----
  const T = (zh, py, en, who) => ({ zh, py, en, who: who || 'guest' });
  const give = ws => { const L = list(ws); return T(`请给我${L.zh}。`, `qǐng gěi wǒ ${L.py}`, `Please give me ${ws.map(w => w.en).join(ws.length > 2 ? ', ' : ' and ')}.`); };
  const pool = k => UNIT.pool(level, k);
  const tools = () => UNIT.pool(1, 'tool');

  // ---- 出一题 ----
  function makeRound(prevRound) {
    const prev = prevRound ? Object.assign(prevRound.need.concat(prevRound.ask ? [prevRound.ask.w.zh] : []), { cat: prevRound.cat }) : null;
    const fresh = a => a.filter(w => !prev || !prev.includes(w.zh));
    if (MODE === 'give') {
      const n = level === 1 ? 1 : 2;
      const need = take(fresh(tools()), n);
      return { lines: [give(need)], need: need.map(w => w.zh), kitchen: kitchenFor(need, 'give') };
    }
    const foods = pool('food'), drinks = pool('drink');
    // Level 1、2：有时候先问「你有没有＿＿？」
    if (level <= 2 && Math.random() < 0.3) {
      const has = Math.random() < 0.5;
      const kitchen = kitchenFor([], 'serve');
      const inK = foods.filter(w => kitchen.includes(w.zh)), outK = foods.concat(drinks).filter(w => !kitchen.includes(w.zh));
      const it = has || !outK.length ? pick(inK) : pick(outK);
      return { lines: [T(`你有没有${it.zh}？`, `nǐ yǒu méi yǒu ${it.py}`, `Do you have ${it.en}?`)], ask: { w: it, has: kitchen.includes(it.zh) }, need: [], kitchen };
    }
    if (level === 1) {
      const f = pick(fresh(Math.random() < 0.25 ? drinks : foods));
      const lines = [give([f])], need = [f];
      if (Math.random() < 0.6) { const u = pick(tools()); lines.push(give([u])); need.push(u); }
      return { lines, need: need.map(w => w.zh), kitchen: kitchenFor(need, 'serve') };
    }
    if (level === 2) {
      const two = take(fresh(foods), Math.random() < 0.7 ? 2 : 1);
      if (Math.random() < 0.35) two.push(pick(drinks));
      const lines = [give(two)], need = two.slice();
      if (Math.random() < 0.7) { const us = take(tools(), 2); lines.push(give(us)); need.push(...us); }
      return { lines, need: need.map(w => w.zh), kitchen: kitchenFor(need, 'serve') };
    }
    // Level 3：服务生先问「你要吃什么＿＿？」
    const cats = UNIT.menuCols.filter(c => foods.filter(w => w.menu === c.zh).length >= 2);
    // 米饭只有两种（白饭、炒饭），少出一点；跟上一题不同一栏
    const prevCat = prev && prev.cat;
    let cands = cats.filter(c => c.zh !== prevCat);
    if (cands.length > 1 && Math.random() < 0.8) cands = cands.filter(c => c.zh !== '米饭') ;
    const cat = pick(cands.length ? cands : cats);
    const inCat = foods.filter(w => w.menu === cat.zh);
    const order = take(inCat, Math.min(inCat.length, Math.random() < 0.6 ? 3 : 2));
    const verb = cat.zh === '汤' ? ['喝', 'hē', 'drink'] : ['吃', 'chī', 'eat'];
    const L = list(order);
    const lines = [
      T(`你要${verb[0]}什么${cat.zh}？`, `nǐ yào ${verb[1]} shén me ${cat.py}`, `What ${cat.en.toLowerCase()} would you like?`, 'waiter'),
      T(`我要${verb[0]}${L.zh}。`, `wǒ yào ${verb[1]} ${L.py}`, `I want ${order.map(w => w.en).join(', ')}.`)
    ];
    const need = order.slice();
    const us = take(tools(), 2); lines.push(give(us)); need.push(...us);
    return { lines, need: need.map(w => w.zh), kitchen: kitchenFor(need, 'serve'), cat: cat.zh };
  }
  // 厨房里放的东西：要的东西＋别的（give：8 样餐具；serve：12 样 = 菜、饮料、餐具）
  function kitchenFor(need, kind) {
    const has = new Set(need.map(w => w.zh));
    const add = (arr, n) => { for (const w of shuffle(arr)) { if (n <= 0) break; if (!has.has(w.zh)) { has.add(w.zh); n--; } } };
    if (kind === 'give') add(tools(), 8 - has.size);
    else {
      const cnt = k => [...has].filter(z => W[z].kind === k).length;
      add(pool('food'), 6 - cnt('food'));
      add(pool('drink'), 2 - cnt('drink'));
      add(tools(), 4 - cnt('tool'));
    }
    return shuffle([...has]);
  }

  // ---- 画面 ----
  let rounds = [], ri = 0, done = 0, busy = false, tray = [], answered = false;
  const kitchenEl = $('kitchen'), trayEl = $('tray'), talk = $('talk');
  const itemHTML = z => RART.svg(z);
  function speakRound() { const r = rounds[ri]; Rest.speak(r.lines.map(l => l.zh).join('，')); }
  function paintTalk(reveal) {
    const r = rounds[ri], listen = mode() === 'listen' && !reveal;
    talk.innerHTML = r.lines.map(l => {
      const tag = l.who === 'waiter' ? `<span class="tag">🙋 You</span>` : '';
      const body = listen ? `<span class="ear" aria-label="Listen">🔊</span>` : say(l.zh, l.py) + (l.zh.length < 14 ? altOf(l) : '');
      return `<div class="line ${l.who}">${tag}<span class="bub">${body}</span>${reveal ? `<span class="en">${Shih.esc(l.en)}</span>` : ''}</div>`;
    }).join('');
    talk.querySelectorAll('.ear').forEach(e => e.parentElement.addEventListener('click', speakRound));
  }
  // 句子里有另一个说法的字（汤匙、比萨、意大利面）：后面加（汤勺）
  const altOf = l => UNIT.words.filter(w => w.alt && l.zh.includes(w.zh)).map(Rest.alt).join('');
  function show() {
    const r = rounds[ri];
    busy = false; answered = false; tray = [];
    const kid = r.kid;
    $('cust').innerHTML = KIDS.kid(kid, ri === 0 ? 'wave' : 'good') + `<span class="nm">${Shih.esc(kid.first)}</span>`;
    paintTalk(false);
    $('yesno').hidden = !r.ask;
    ['yesBtn', 'noBtn'].forEach(id => $(id).classList.remove('right'));
    $('serveBtn').disabled = !!r.ask;
    kitchenEl.querySelectorAll('.item').forEach(x => x.remove());
    r.kitchen.forEach(z => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'item'; b.dataset.zh = z;
      b.setAttribute('aria-label', W[z].en);
      b.innerHTML = itemHTML(z);
      b.addEventListener('click', () => toTray(b));
      kitchenEl.appendChild(b);
    });
    trayEl.innerHTML = '';
    if (playing) speakRound();
  }
  function toTray(b) {
    if (!playing || busy || rounds[ri].ask && !answered) return;
    if (tray.length >= 6) return;
    b.classList.add('out'); tray.push(b.dataset.zh);
    const t = document.createElement('button');
    t.type = 'button'; t.className = 'item'; t.innerHTML = itemHTML(b.dataset.zh); t.setAttribute('aria-label', W[b.dataset.zh].en);
    t.addEventListener('click', () => { if (busy) return; tray.splice(tray.indexOf(b.dataset.zh), 1); t.remove(); b.classList.remove('out'); });
    trayEl.appendChild(t);
    Rest.speak(b.dataset.zh);
  }
  function mark(ok) {
    const m = $('mark');
    m.className = 'mark show ' + (ok ? 'yes' : 'no'); m.textContent = ok ? '✓' : '✗';
    setTimeout(() => { m.className = 'mark'; }, 900);
  }
  function next() {
    done++; update(); busy = true;
    paintTalk(true);
    setTimeout(() => {
      ri++;
      if (ri >= rounds.length) {
        const ms = timer.stop();
        $('winTime').textContent = timerOn() ? 'Time: ' + Shih.fmt(ms) : '';
        $('winMsg').hidden = false; Shih.speak('太棒了');
      } else show();
    }, 1500);
  }
  function serve() {
    if (!playing || busy || !tray.length) return;
    const r = rounds[ri];
    const ok = tray.length === r.need.length && r.need.every(z => tray.includes(z));
    if (ok) { mark(true); next(); return; }
    busy = true; mark(false);
    trayEl.classList.remove('shake'); void trayEl.offsetWidth; trayEl.classList.add('shake');
    setTimeout(() => {
      trayEl.classList.remove('shake');
      tray = []; trayEl.innerHTML = '';
      kitchenEl.querySelectorAll('.item.out').forEach(x => x.classList.remove('out'));
      busy = false;
    }, 1000);
  }
  function answer(yes) {
    const r = rounds[ri];
    if (!playing || busy || !r.ask || answered) return;
    const btn = $(yes ? 'yesBtn' : 'noBtn');
    if (yes !== r.ask.has) {
      btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
      setTimeout(() => btn.classList.remove('shake'), 400);
      return;
    }
    btn.classList.add('right');
    answered = true;
    if (!yes) { Shih.speak('没有'); mark(true); next(); return; }
    // 有：顾客就点这一样
    Shih.speak('有');
    r.lines.push(give([r.ask.w]));
    r.need = [r.ask.w.zh];
    paintTalk(false);
    $('serveBtn').disabled = false;
    setTimeout(speakRound, 600);
  }
  function update() { $('score').textContent = `${done} / ${rounds.length}`; }

  let playing = false;
  const wait = Shih.startCover($('playArea'), () => { playing = true; if (timerOn()) timer.start(); speakRound(); });
  function setup() {
    paintLevels(level);
    playing = false;
    $('help').textContent = help();
    const kids = shuffle(KIDS.people);
    rounds = [];
    for (let i = 0; i < (C.rounds || 6); i++) { const r = makeRound(rounds[rounds.length - 1]); r.kid = kids[i % kids.length]; rounds.push(r); }
    ri = 0; done = 0;
    timer.reset(); $('winMsg').hidden = true; update();
    show();
    window.__serve = { round: () => rounds[ri], rounds: () => rounds, tray: () => tray, level: () => level, mode };
    wait();
  }
  $('serveBtn').addEventListener('click', serve);
  $('yesBtn').addEventListener('click', () => answer(true));
  $('noBtn').addEventListener('click', () => answer(false));
  $('hear').addEventListener('click', speakRound);
  $('resetBtn').addEventListener('click', setup);
  $('againBtn').addEventListener('click', setup);
  setup();
});
