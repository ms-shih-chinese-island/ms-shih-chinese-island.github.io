/* =====================================================================
   图书馆 Library
   ---------------------------------------------------------------------
   1. LIBRARY.chapters：书里的每一章。
      from: 'family' 这类 → 直接用那个单元的生词（单元改了，书也会跟着变）
      words: [...]      → 这一章自己的字（数字、中秋节）
   2. 学生在图书馆挑好的字，会放进 UNIT.words，给配对游戏用（games/match.html?unit=library）
      不给金币、不记成绩。
   ===================================================================== */
window.LIBRARY = {
  chapters: [
    { id: 'hello', zh: '你好', py: 'nǐ hǎo', en: 'Hello', from: 'hello' },
    { id: 'numbers', zh: '数字', py: 'shù zì', en: 'Numbers', words: [
      { zh: '一', py: 'yī', en: 'one' }, { zh: '二', py: 'èr', en: 'two' }, { zh: '三', py: 'sān', en: 'three' },
      { zh: '四', py: 'sì', en: 'four' }, { zh: '五', py: 'wǔ', en: 'five' }, { zh: '六', py: 'liù', en: 'six' },
      { zh: '七', py: 'qī', en: 'seven' }, { zh: '八', py: 'bā', en: 'eight' }, { zh: '九', py: 'jiǔ', en: 'nine' },
      { zh: '十', py: 'shí', en: 'ten' }, { zh: '两', py: 'liǎng', en: 'two (of something)' }, { zh: '百', py: 'bǎi', en: 'hundred' },
      { zh: '千', py: 'qiān', en: 'thousand' }, { zh: '万', py: 'wàn', en: 'ten thousand' }, { zh: '算盘', py: 'suàn pán', en: 'abacus' }
    ] },
    { id: 'school', zh: '学校', py: 'xué xiào', en: 'School', from: 'school' },
    { id: 'family', zh: '家', py: 'jiā', en: 'Family', from: 'family' },
    { id: 'moon', zh: '中秋节', py: 'zhōng qiū jié', en: 'Moon Festival', words: [
      { zh: '中秋节', py: 'zhōng qiū jié', en: 'Moon Festival' },
      { zh: '中秋节快乐', py: 'zhōng qiū jié kuài lè', en: 'Happy Moon Festival' },
      { zh: '月亮', py: 'yuè liàng', en: 'moon', pic: 'moon' },
      { zh: '月饼', py: 'yuè bǐng', en: 'mooncake', pic: 'mooncake' },
      { zh: '灯笼', py: 'dēng lóng', en: 'lantern', pic: 'lantern' },
      { zh: '兔子', py: 'tù zi', en: 'rabbit', pic: 'rabbit' },
      { zh: '赏月', py: 'shǎng yuè', en: 'look at the moon', pic: 'lookmoon' },
      { zh: '团圆', py: 'tuán yuán', en: 'family reunion', pic: 'reunion' },
      { zh: '太阳', py: 'tài yáng', en: 'sun', pic: 'sun' },
      { zh: '星星', py: 'xīng xīng', en: 'star', pic: 'star' },
      { zh: '嫦娥', py: 'cháng é', en: "Chang'e", who: 'change' },
      { zh: '后羿', py: 'hòu yì', en: 'Hou Yi', who: 'houyi' }
    ] },
    { id: 'halloween', zh: '万圣节', py: 'wàn shèng jié', en: 'Halloween', from: 'halloween' }
  ]
};

/* ---- 配对游戏读这一段：学生在图书馆挑的字 ---- */
window.UNIT = {};
(function () {
  let pick = null;
  try { pick = JSON.parse(sessionStorage.getItem('shih:libPick') || 'null'); } catch (e) {}
  const words = pick && Array.isArray(pick.words) ? pick.words.slice(0, 12) : [];
  UNIT.matchTitle = { zh: '图书馆配对', py: 'tú shū guǎn pèi duì', en: 'Library Match' };
  UNIT.levels = [{ note: '' }];
  UNIT.matchMax = 12;
  UNIT.matchPics = true;
  if (pick && pick.mode === 'pinyin') UNIT.matchMode = 'pinyin';
  UNIT.words = words.map(w => Object.assign({}, w, { level: 1 }));
})();
