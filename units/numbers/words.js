/* =====================================================================
   单元：数字 Numbers（主岛 → 银行）
   ---------------------------------------------------------------------
   这个单元的题目是电脑自己出的，所以这里只放设定和常识题。
   难度（钱袋）：1 = 二年级 1–30、2 = 三年级 1–100、3 = 四年级 三位数、四位数，到一万。
   高的级也会出前面几级的题，只是比例比较少（比例写在 games/numbers.html 的 MIX）。
   题目不会出现需要念「零」的数字。「两百、两千、两万」只会在四年级出现。
   ===================================================================== */
window.UNIT = {};
UNIT.levelIcon = 'money';
UNIT.words = [];

/* 每一级钱袋：min / max 是数字的范围 */
UNIT.levels = [
  { note: '1–30',      min: 1,   max: 30 },
  { note: '1–100',     min: 1,   max: 100 },
  { note: '100–10000', min: 100, max: 10000 }
];

/* 数字挑战：一回合几题、每种题型几题 */
UNIT.challenge = {
  title: { zh: '数字挑战', py: 'shù zì tiǎo zhàn', en: 'Number Challenge' },
  mix: {
    read: 2,      // 看中文选数字
    between: 1,   // 填中间：六十七、六十八、＿、七十
    order: 1,     // 排排看：4 个中文数字排大小
    math: 1,      // 数字加减法：7 + 5 = ?
    mathZh: 1,    // 中文加减法：七 + 五 = ?
    facts: 2      // 常识题（下面的 UNIT.facts）
  }
};

/* 常识题：英文问题 + 答案（阿拉伯数字）。
   每一级都会出现。
   wrong 可以不写；写了就用这些当错的选项。
   加新题：复制一行，改内容就好。注意每行最后的逗号。 */
UNIT.facts = [
  { en: 'How many days are in a week?',               answer: 7 },
  { en: 'How many legs does a spider have?',          answer: 8 },
  { en: 'How many seasons are in a year?',            answer: 4 },
  { en: 'How many months are in a year?',             answer: 12 },
  { en: 'How many hours are in a day?',               answer: 24 },
  { en: 'How many letters are in the English alphabet?', answer: 26 },
  { en: 'How many days are in February 2026?',        answer: 28, wrong: [29, 30, 31] },
  { en: 'How many days are in February 2028?',        answer: 29, wrong: [28, 30, 31] },
  { en: 'How many days are in January?',              answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in March?',                answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in April?',                answer: 30, wrong: [28, 29, 31] },
  { en: 'How many days are in May?',                  answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in June?',                 answer: 30, wrong: [28, 29, 31] },
  { en: 'How many days are in July?',                 answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in August?',               answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in September?',            answer: 30, wrong: [28, 29, 31] },
  { en: 'How many days are in October?',              answer: 31, wrong: [28, 29, 30] },
  { en: 'How many days are in November?',             answer: 30, wrong: [28, 29, 31] },
  { en: 'How many days are in December?',             answer: 31, wrong: [28, 29, 30] },
  { en: 'How many minutes are in an hour?',           answer: 60 },
  { en: 'How many weeks are in a year?',              answer: 52 },
  { en: 'How many years are in a century?',           answer: 100 },
  { en: 'How many days are in the year 2026?',        answer: 365, wrong: [366, 356, 355] },
  { en: 'How many days are in the year 2027?',        answer: 365, wrong: [366, 356, 355] }
];

/* 算盘的游戏（四年级，不分难度） */
UNIT.abacusRead = { title: { zh: '看算盘', py: 'kàn suàn pán', en: 'Read the Abacus' }, count: 8 };
UNIT.abacusSet  = { title: { zh: '拨一拨', py: 'bō yi bō', en: 'Make the Number' }, count: 6 };
UNIT.abacusFree = { title: { zh: '自由拨', py: 'zì yóu bō', en: 'Free Play' } };
