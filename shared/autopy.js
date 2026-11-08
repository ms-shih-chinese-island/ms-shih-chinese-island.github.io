/* =====================================================================
   自动拼音：试算表的拼音空着的时候用（快闪抢地盘）。
   1. 先用 pinyin-pro（shared/vendor/pinyin-pro.js，放在自己的网站上）算整句
   2. 轻声改回本调（台湾读法：喜欢 xǐ huān），吗、呢、的、了、子……这些还是轻声；
      叠字的第二个字（妈妈、谢谢）照字典
   3. 网站里学过的词，照 shared/py-tw.js 的读法（老师自己写的最准）
   4. 几个台湾读音：期 qí、垃圾 lè sè……
   只回传汉字的拼音，一个汉字一个音节，用空白隔开。
   ===================================================================== */
(function () {
  const HAN = /[㐀-鿿]/;
  const LIGHT = new Set(Array.from('吗么嘛的地得了呢吧子们啊呀着哦喔啦'));
  const TW = { 谁: 'shéi', 意思: 'yì si', 期: 'qí', 垃圾: 'lè sè', 研究: 'yán jiù', 企: 'qì', 危: 'wéi', 液: 'yì', 携: 'xī', 质: 'zhí', 微: 'wéi', 垃: 'lè', 圾: 'sè' };
  const toned = s => /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(s);
  function base(hans) {
    const P = window.pinyinPro;
    if (!P) return hans.map(() => '');
    const text = hans.join('');
    let all;
    try { all = P.pinyin(text, { type: 'all' }).filter(x => x.isZh); } catch (e) { return hans.map(() => ''); }
    if (all.length !== hans.length) return hans.map(c => { try { return P.pinyin(c); } catch (e) { return ''; } });
    return all.map((x, i) => {
      let p = x.pinyin || '';
      if (p && !toned(p) && !LIGHT.has(hans[i]) && hans[i] !== hans[i - 1]) {
        try { const q = P.pinyin(hans[i]); if (toned(q)) p = q; } catch (e) {}
      }
      return p;
    });
  }
  // minLen = 2：网站字典里的单字（例如图书馆的「还 huán」）不拿来用，只用词
  function overlay(hans, out, dict, minLen) {
    const keys = Object.keys(dict).filter(k => Array.from(k).length >= (minLen || 1));
    let max = 1; keys.forEach(k => { max = Math.max(max, Array.from(k).length); });
    for (let i = 0; i < hans.length;) {
      let hit = 0;
      for (let n = Math.min(max, hans.length - i); n >= 1; n--) {
        const w = hans.slice(i, i + n).join('');
        if (n >= (minLen || 1) && dict[w]) {
          const syl = dict[w].split(' ');
          if (syl.length === n) { syl.forEach((s, j) => { out[i + j] = s; }); hit = n; break; }
        }
      }
      i += hit || 1;
    }
  }
  // 一段文字 → 汉字的拼音（空白隔开）
  function of(text) {
    const hans = Array.from(String(text || '')).filter(c => HAN.test(c));
    if (!hans.length) return '';
    const out = base(hans);
    overlay(hans, out, TW);
    if (window.SHIH_PY) overlay(hans, out, window.SHIH_PY, 2);
    return out.map(s => s || '').join(' ');
  }
  // 老师打的拼音优先；音节数对不上（打错、打一半）也照用老师的
  const pick = (text, typed) => String(typed || '').trim() || of(text);
  window.ShihPY = { of, pick, ready: () => !!window.pinyinPro };
})();
