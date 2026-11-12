/* =====================================================================
   单元：餐厅 Restaurant（主岛 → 餐厅）
   ---------------------------------------------------------------------
   六个游戏都读这一份，图在 units/restaurant/art.js：
     （岛上的顺序：由简单到难）
     1 请给我     games/give.html?unit=restaurant    餐具：请给我筷子。／请给我叉子和刀子。
     2 爱吃不爱吃 games/likes.html?unit=restaurant   看图拼句子：我爱吃饺子。
     3 快手出菜   games/serve.html?unit=restaurant   三个客人点菜、要餐具，把厨房的东西拉给他们（🐢 慢慢来／⚡ 90 秒）
     4 菜单填一填 games/menu.html?unit=restaurant    把中文菜名拉到菜单的图下面
     5 点菜算一算 games/pay.html?unit=restaurant     Level 1 看帐单付钱；Level 2 看句子找图；Level 3 看图拼菜名（鸡肉＋炒饭）、加料算钱
     6 餐厅对话框 games/dine.html?unit=restaurant    服务生和顾客的对话
   拼音照台湾的念法。课纲：
     一年级 2 月：请给我＿＿、谢谢你、不客气
     二年级 5 月：餐具、中国菜、饮料；你爱吃／喝＿＿吗？我爱吃／我不爱吃（家人单元学过：你有没有＿＿？）
     三年级 5 月：美国食物、中国菜；我爱吃／我不爱吃／我不知道（感恩节学过「和」）
     四年级 5 月：中餐厅点菜；我要吃＿＿；你要吃什么小菜／主菜／米饭？（12 月学过「多少钱」）

   每个一行：
     zh / py / en   中文、拼音、英文
     kind           'tool' 餐具、'drink' 饮料、'food' 菜
     lv             哪几级会出现（1 = 二年级、2 = 三年级、3 = 四年级）
     menu           菜单的哪一栏（四年级）：小菜、主菜、米饭、汤
     drink: true    要说「喝」（爱喝、不爱喝）
     alt            另一个说法：汤匙（汤勺）、比萨（披萨）、意大利面（义大利面）
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

UNIT.levels = [
  { note: 'Grade 2 words' },
  { note: 'Grade 3 words + 和' },
  { note: 'Grade 4: order a meal' }
];

UNIT.words = [
  { zh: '餐厅', py: 'cān tīng', en: 'restaurant', shelf: false },
  // ---- 餐具（二年级；三、四年级点菜的时候也会用到） ----
  { zh: '筷子', py: 'kuài zi',  en: 'chopsticks', kind: 'tool', lv: [1, 2, 3] },
  { zh: '碗',   py: 'wǎn',      en: 'bowl',       kind: 'tool', lv: [1, 2, 3] },
  { zh: '盘子', py: 'pán zi',   en: 'plate',      kind: 'tool', lv: [1, 2, 3] },
  { zh: '叉子', py: 'chā zi',   en: 'fork',       kind: 'tool', lv: [1, 2, 3] },
  { zh: '刀子', py: 'dāo zi',   en: 'knife',      kind: 'tool', lv: [1, 2, 3] },
  { zh: '汤匙', py: 'tāng chí', en: 'spoon',      kind: 'tool', lv: [1, 2, 3], alt: { zh: '汤勺', py: 'tāng sháo' } },
  { zh: '杯子', py: 'bēi zi',   en: 'cup',        kind: 'tool', lv: [1, 2, 3] },
  { zh: '茶杯', py: 'chá bēi',  en: 'tea cup',    kind: 'tool', lv: [1, 2, 3] },
  { zh: '茶壶', py: 'chá hú',   en: 'teapot',     kind: 'tool', lv: [1, 2, 3] },
  { zh: '餐巾', py: 'cān jīn',  en: 'napkin',     kind: 'tool', lv: [1, 2, 3] },
  // ---- 饮料 ----
  { zh: '茶',   py: 'chá',      en: 'tea',        kind: 'drink', drink: true, lv: [1, 2, 3] },
  { zh: '汽水', py: 'qì shuǐ',  en: 'soda',       kind: 'drink', drink: true, lv: [1, 2, 3] },
  { zh: '水',   py: 'shuǐ',     en: 'water',      kind: 'drink', drink: true, lv: [1, 2, 3] },
  { zh: '果汁', py: 'guǒ zhī',  en: 'juice',      kind: 'drink', drink: true, lv: [1, 2, 3] },
  // ---- 中国菜 ----
  { zh: '春卷',     py: 'chūn juǎn',     en: 'spring roll',       kind: 'food', lv: [1, 2, 3], menu: '小菜' },
  { zh: '锅贴',     py: 'guō tiē',       en: 'potsticker',        kind: 'food', lv: [1, 3],    menu: '小菜' },
  { zh: '饺子',     py: 'jiǎo zi',       en: 'dumpling',          kind: 'food', lv: [2, 3],    menu: '小菜' },
  { zh: '点心',     py: 'diǎn xīn',      en: 'dim sum',           kind: 'food', lv: [2, 3],    menu: '小菜' },
  { zh: '白饭',     py: 'bái fàn',       en: 'white rice',        kind: 'food', lv: [1, 3],    menu: '米饭' },
  { zh: '炒饭',     py: 'chǎo fàn',      en: 'fried rice',        kind: 'food', lv: [1, 2, 3], menu: '米饭' },
  { zh: '捞面',     py: 'lāo miàn',      en: 'lo mein',           kind: 'food', lv: [1, 2, 3] },   // 面不放进小菜／主菜／米饭（免得跟主菜搞混）
  { zh: '芥兰鸡肉', py: 'jiè lán jī ròu', en: 'broccoli chicken', kind: 'food', lv: [1],       menu: '主菜' },
  { zh: '芥兰牛肉', py: 'jiè lán niú ròu', en: 'broccoli beef',   kind: 'food', lv: [3],       menu: '主菜' },
  { zh: '糖醋排骨', py: 'táng cù pái gǔ', en: 'sweet and sour ribs', kind: 'food', lv: [2, 3], menu: '主菜' },
  { zh: '芝麻鸡',   py: 'zhī má jī',     en: 'sesame chicken',    kind: 'food', lv: [2, 3],    menu: '主菜' },
  { zh: '麻婆豆腐', py: 'má pó dòu fǔ',  en: 'mapo tofu',         kind: 'food', lv: [2],       menu: '主菜' },
  { zh: '酸辣汤',   py: 'suān là tāng',  en: 'hot and sour soup', kind: 'food', lv: [2, 3],    menu: '汤' },
  { zh: '蛋花汤',   py: 'dàn huā tāng',  en: 'egg drop soup',     kind: 'food', lv: [2, 3],    menu: '汤' },
  { zh: '蔬菜汤',   py: 'shū cài tāng',  en: 'vegetable soup',    kind: 'food', lv: [2, 3],    menu: '汤' },
  { zh: '馄饨汤',   py: 'hún tún tāng',  en: 'wonton soup',       kind: 'food', lv: [2, 3],    menu: '汤' },
  // ---- 美国食物（三年级） ----
  { zh: '汉堡包',   py: 'hàn bǎo bāo',   en: 'hamburger',    kind: 'food', lv: [2] },
  { zh: '热狗',     py: 'rè gǒu',        en: 'hot dog',      kind: 'food', lv: [2] },
  { zh: '薯条',     py: 'shǔ tiáo',      en: 'french fries', kind: 'food', lv: [2] },
  { zh: '炸鸡',     py: 'zhà jī',        en: 'fried chicken', kind: 'food', lv: [2] },
  { zh: '三明治',   py: 'sān míng zhì',  en: 'sandwich',     kind: 'food', lv: [2] },
  { zh: '意大利面', py: 'yì dà lì miàn', en: 'pasta',        kind: 'food', lv: [2], alt: { zh: '义大利面', py: 'yì dà lì miàn' } },
  { zh: '牛排',     py: 'niú pái',       en: 'steak',        kind: 'food', lv: [2] },
  { zh: '沙拉',     py: 'shā lā',        en: 'salad',        kind: 'food', lv: [2] },
  { zh: '比萨',     py: 'bǐ sà',         en: 'pizza',        kind: 'food', lv: [2], alt: { zh: '披萨', py: 'pī sà' } }
];

/* 这一级可以用的东西：kind = 'tool' 'drink' 'food'（不写就全部） */
UNIT.pool = function (level, kind) {
  return UNIT.words.filter(w => w.kind && (!kind || w.kind === kind) && (w.lv || []).includes(level));
};

/* 四年级的菜单：四栏 */
UNIT.menuCols = [
  { zh: '小菜', py: 'xiǎo cài', en: 'Appetizers' },
  { zh: '主菜', py: 'zhǔ cài',  en: 'Main dishes' },
  { zh: '米饭', py: 'mǐ fàn',   en: 'Rice' },
  { zh: '汤',   py: 'tāng',     en: 'Soup' }
];

/* 点菜算一算 Level 3：看图（主食＋圆章）拼菜名，再加料算钱
   fill：加什么（价钱是「加几块」）；base：主食（价钱是主食本身）
   价钱每一局会在这两个数字中间变一点 */
UNIT.combo = {
  fill: [
    { zh: '蔬菜', py: 'shū cài', en: 'vegetable', add: [1, 2] },
    { zh: '鸡肉', py: 'jī ròu',  en: 'chicken',   add: [2, 3] },
    { zh: '猪肉', py: 'zhū ròu', en: 'pork',      add: [2, 3] },
    { zh: '牛肉', py: 'niú ròu', en: 'beef',      add: [3, 4] }
  ],
  // with：这种主食配哪些（照平常的说法：没有「猪肉比萨」「猪肉汉堡包」）
  base: [
    { zh: '炒饭',     price: [4, 6], with: ['蔬菜', '鸡肉', '猪肉', '牛肉'] },
    { zh: '饺子',     price: [5, 7], with: ['蔬菜', '鸡肉', '猪肉', '牛肉'] },
    { zh: '锅贴',     price: [5, 7], with: ['蔬菜', '鸡肉', '猪肉', '牛肉'] },
    { zh: '捞面',     price: [6, 8], with: ['蔬菜', '鸡肉', '猪肉', '牛肉'] },
    { zh: '意大利面', price: [7, 9], with: ['蔬菜', '鸡肉', '牛肉'] },
    { zh: '汉堡包',   price: [5, 7], with: ['鸡肉', '牛肉'] },
    { zh: '三明治',   price: [4, 6], with: ['蔬菜', '鸡肉'] },
    { zh: '比萨',     price: [6, 8], with: ['蔬菜', '鸡肉'] }
  ]
};

/* 每个游戏的名字和说明 */
UNIT.give  = { title: { zh: '请给我', py: 'qǐng gěi wǒ', en: 'Please Give Me' }, rounds: 6, levelsUsed: 2 };
UNIT.serve = { title: { zh: '快手出菜', py: 'kuài shǒu chū cài', en: 'Speedy Server' }, target: [8, 8, 6] };   // 每一级要送几个客人
UNIT.likes = { title: { zh: '爱吃不爱吃', py: 'ài chī bú ài chī', en: 'Yummy or Yucky?' }, rounds: 6 };
UNIT.menu  = { title: { zh: '菜单填一填', py: 'cài dān tián yi tián', en: 'Fill in the Menu' } };
UNIT.pay   = { title: { zh: '点菜算一算', py: 'diǎn cài suàn yi suàn', en: 'Order & Add Up' }, rounds: 4 };
UNIT.dine  = { title: { zh: '餐厅对话框', py: 'cān tīng duì huà kuàng', en: 'Restaurant Chat' }, rounds: 3 };

/* =====================================================================
   特餐：节日前一个月到节日后两个星期，菜单上自动多一栏「特餐」（六个餐厅游戏都会出现）
   老师也可以在试算表「开关」那一页 B4「特餐」手动打开（加上去，照日期的还是会有）
   试玩、看效果：网址后面加 &special=duanwu（moon、halloween、thanksgiving、cny、duanwu、all）
     dates   节日的日期（农历的节日每年不一样，写到 2035 年；感恩节、万圣节自己算）
     items   这个节日的特餐（kind 'food'，menu 都是「特餐」）
     gift    不用点，餐厅送的（万圣节送糖果：点菜算一算、餐厅对话框、快手出菜玩完的时候）
     combo   点菜算一算 Level 3 的主食（粽子只配猪肉、鸡肉）
   ===================================================================== */
UNIT.SPECIALS = [
  { id: 'moon', zh: '中秋节', dates: ['2026-09-25', '2027-09-15', '2028-10-03', '2029-09-22', '2030-09-12', '2031-10-01', '2032-09-19', '2033-09-08', '2034-09-27', '2035-09-16'],
    items: [{ zh: '月饼', py: 'yuè bǐng', en: 'mooncake' }] },
  { id: 'halloween', zh: '万圣节', date: (y) => `${y}-10-31`,
    gift: { zh: '糖果', py: 'táng guǒ', en: 'candy', say: { zh: '万圣节快乐！这是送你的糖果。', py: 'wàn shèng jié kuài lè! zhè shì sòng nǐ de táng guǒ.', en: 'Happy Halloween! This candy is for you.' } } },
  { id: 'thanksgiving', zh: '感恩节', date: (y) => { const d = new Date(y, 10, 1); const first = (11 - d.getDay()) % 7 + 1; return `${y}-11-${String(first + 21).padStart(2, '0')}`; },   // 十一月第四个星期四
    items: [{ zh: '火鸡', py: 'huǒ jī', en: 'turkey' }, { zh: '南瓜糕', py: 'nán guā gāo', en: 'pumpkin pie' }, { zh: '玉米', py: 'yù mǐ', en: 'corn' }, { zh: '番薯', py: 'fān shǔ', en: 'yam' }] },
  { id: 'cny', zh: '春节', dates: ['2026-02-17', '2027-02-06', '2028-01-26', '2029-02-13', '2030-02-03', '2031-01-23', '2032-02-11', '2033-01-31', '2034-02-19', '2035-02-08'],
    items: [{ zh: '鱼', py: 'yú', en: 'fish' }] },
  { id: 'duanwu', zh: '端午节', dates: ['2026-06-19', '2027-06-09', '2028-05-28', '2029-06-16', '2030-06-05', '2031-06-24', '2032-06-12', '2033-06-01', '2034-06-20', '2035-06-10'],
    items: [{ zh: '猪肉粽子', py: 'zhū ròu zòng zi', en: 'pork zongzi' }, { zh: '鸡肉粽子', py: 'jī ròu zòng zi', en: 'chicken zongzi' }],
    base: { zh: '粽子', py: 'zòng zi', en: 'zongzi' }, combo: { zh: '粽子', price: [4, 6], with: ['猪肉', '鸡肉'] } }
];
UNIT.SPECIAL_BEFORE = 31;   // 节日前几天开始
UNIT.SPECIAL_AFTER = 14;    // 节日后几天结束
// 今天有哪些特餐：照日期，再加上试算表手动打开的（manual：'moon' 'all' …）
UNIT.activeSpecials = function (today, manual) {
  const t = today || new Date(), day = 864e5;
  const ymd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  return UNIT.SPECIALS.filter(sp => {
    if (manual === 'all' || manual === sp.id) return true;
    const days = sp.dates ? sp.dates.map(ymd) : [t.getFullYear() - 1, t.getFullYear(), t.getFullYear() + 1].map(y => ymd(sp.date(y)));
    return days.some(d => t >= new Date(d - UNIT.SPECIAL_BEFORE * day) && t < new Date(+d + (UNIT.SPECIAL_AFTER + 1) * day));
  });
};
// 游戏开始前（Shih.loadUnit 会叫这个）：把今天的特餐放进生词、菜单、点菜算一算
UNIT.prepare = function (state) {
  let manual = (state && state.special) || '';
  try { const q = new URLSearchParams(location.search).get('special'); if (q) manual = q; } catch (e) {}
  const on = UNIT.activeSpecials(new Date(), manual);
  UNIT.specialsOn = on.map(sp => sp.id);
  on.forEach(sp => {
    (sp.items || []).forEach(it => UNIT.words.push(Object.assign({ kind: 'food', lv: [1, 2, 3], menu: '特餐', special: sp.id }, it)));
    if (sp.base) UNIT.words.push(Object.assign({ kind: 'base', special: sp.id }, sp.base));   // 只给点菜算一算查拼音用，不会单独出现
    if (sp.combo) UNIT.combo.base.push(sp.combo);
    if (sp.gift) UNIT.gift = sp.gift;
  });
  if (on.some(sp => sp.items)) UNIT.menuCols.push({ zh: '特餐', py: 'tè cān', en: 'Specials' });
};
