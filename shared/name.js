/* =====================================================================
   名字检查：学生打的名字只能是
     简体中文、繁体中文、英文字母、数字，1–12 个字
   不能有空格、符号、表情符号，也不能有脏字、骂人的字（中英文都挡）。
   后台（Google 试算表的程序）也有一份一模一样的检查。
   ShihName.check('Emma')  → ''（可以用）
   ShihName.check('a+b')   → 'chars'（有不能用的字）
   ShihName.check('...')   → 'bad'（请换一个名字）
   ===================================================================== */
(function () {
  // 只收：中文字（含繁体）、英文字母、数字
  const OK = /^[㐀-䶿一-鿿A-Za-z0-9]{1,12}$/;

  // 英文：每个字母可以重复（fuuuck 也挡得到），数字当字母看（sh1t、fvck…）
  const EN = ['fuck', 'fuk', 'fck', 'fvck', 'phuck', 'shit', 'bitch', 'btch', 'biatch', 'cunt', 'dick', 'cock', 'pussy', 'penis', 'vagina', 'boob', 'tits',
    'asshole', 'arsehole', 'dumbass', 'jackass', 'badass', 'bastard', 'whore', 'slut', 'porn', 'sexy', 'nigg', 'nigga', 'fagg', 'faggot', 'retard', 'damn', 'crap',
    'piss', 'wank', 'twat', 'prick', 'douche', 'stfu', 'wtf', 'killyou', 'killme', 'diedie', 'hitler', 'caonima', 'nmsl', 'mlgb', 'shabi', 'tamade'];
  // 这几个只在名字的开头或结尾才挡
  const EN_EDGE = ['sex', 'kill', 'dead', 'hell', 'stupid', 'idiot', 'dumb', 'loser', 'hate', 'ugly', 'poop', 'butt', 'moron', 'noob'];
  // 这几个太短，名字整个就是它才挡，免得 Cassie、Diego、Fatima 被误挡
  const EN_EXACT = ['ass', 'sb', 'fu', 'die', 'fat', 'pig', 'gay', 'tmd', 'cnm', 'nmb', 'kys', 'nazi', 'rape', 'dog', 'cow'];
  // 中文：简体、繁体都放（中间夹数字或英文也挡得到）
  const ZH = ['操', '肏', '干你', '干死', '幹', '他妈', '他媽', '你妈', '你媽', '妈的', '媽的', '尼玛', '尼瑪', '泥马', '泥馬', '傻逼', '傻屄', '傻比', '煞笔', '煞筆', '沙比', '傻B',
    '逼', '屄', '屌', '鸡巴', '雞巴', '贱', '賤', '婊', '滚蛋', '滾蛋', '混蛋', '王八', '笨蛋', '白痴', '白癡', '白吃', '智障', '弱智', '蠢', '废物', '廢物', '垃圾', '去死', '该死', '該死',
    '死人', '死鬼', '屎', '屁', '尿', '猪头', '豬頭', '丑八怪', '醜八怪', '色狼', '人渣', '畜生', '畜牲', '杂种', '雜種', '低能', '脑残', '腦殘', '神经病', '神經病', '变态', '變態',
    '色情', '下流', '贱人', '賤人', '狗屁', '靠北', '靠杯', '干妈', '幹你', '机掰', '機掰', '卖淫', '賣淫', '强奸', '強姦', '杀', '殺', '鸡掰', '雞掰', '娘炮', '你爸', '你娘', '老母'];

  const LEET = { 0: 'o', 1: 'i', 2: 'z', 3: 'e', 4: 'a', 5: 's', 6: 'g', 7: 't', 8: 'b', 9: 'g' };
  const loose = w => new RegExp(Array.from(w).map(c => c + '+').join(''));
  const EN_RE = EN.map(loose);
  const plus = w => Array.from(w).map(c => c + '+').join('');
  const EN_EDGE_RE = EN_EDGE.map(w => new RegExp('^' + plus(w) + '|' + plus(w) + '$'));
  const EN_EXACT_RE = EN_EXACT.map(w => new RegExp('^' + plus(w) + '$'));

  function check(name) {
    const s = String(name == null ? '' : name).normalize('NFKC').trim();
    if (!OK.test(s)) return 'chars';
    const low = s.toLowerCase();
    const letters = low.replace(/[0-9]/g, d => LEET[d]).replace(/[^a-z]/g, '');   // 只看英文部分
    const plain = low.replace(/[^a-z]/g, '');
    for (const t of [letters, plain]) {
      if (!t) continue;
      if (EN_RE.some(r => r.test(t))) return 'bad';
      if (EN_EDGE_RE.some(r => r.test(t))) return 'bad';
      if (EN_EXACT_RE.some(r => r.test(t))) return 'bad';
    }
    const han = s.replace(/[^㐀-䶿一-鿿]/g, '');
    if (ZH.some(w => s.includes(w) || han.includes(w.replace(/[^㐀-鿿]/g, '') || '\u0000'))) return 'bad';
    return '';
  }
  window.ShihName = { check, clean: n => String(n == null ? '' : n).normalize('NFKC').trim() };
})();
