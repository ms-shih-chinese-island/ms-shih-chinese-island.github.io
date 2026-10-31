/* =====================================================================
   单元：感恩节 Thanksgiving（节日岛 → 感恩节市场）
   ---------------------------------------------------------------------
   快手买一买 games/shop.html?unit=thanksgiving 读这一份。
   图在 units/thanksgiving/art.js（每个字一张图，名字要跟 zh 一模一样）。
   拼音照台湾的念法。

   生词库（words）每个字一行：
     zh     中文（简体）
     py     拼音，字和字之间空一格
     en     英文（游戏里不显示，给老师看的）
     level  1 = 二年级、2 = 三年级、3 = 四年级，每一级都包含前面的字
   加新字：复制一行改内容，再到 art.js 画一张同名的图。注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 每一级的说明（Level 按钮上的小字） */
UNIT.levels = [
  { note: '' },
  { note: '+ fruits & veggies' },
  { note: '+ the big dinner' }
];

/* 生词库 */
UNIT.words = [
  // ---- Level 1（二年级） ----
  { zh: '火鸡',   py: 'huǒ jī',         en: 'turkey',          level: 1, trad: '火雞' },
  { zh: '南瓜糕', py: 'nán guā gāo',    en: 'pumpkin pie',     level: 1 },
  { zh: '玉米',   py: 'yù mǐ',          en: 'corn',            level: 1 },
  { zh: '马铃薯', py: 'mǎ líng shǔ',    en: 'potato',          level: 1, trad: '馬鈴薯' },
  // ---- Level 2（三年级） ----
  { zh: '苹果',   py: 'píng guǒ',       en: 'apple',           level: 2, trad: '蘋果' },
  { zh: '葡萄',   py: 'pú táo',         en: 'grapes',          level: 2 },
  { zh: '梨子',   py: 'lí zi',          en: 'pear',            level: 2 },
  { zh: '胡萝卜', py: 'hú luó bo',      en: 'carrot',          level: 2, trad: '胡蘿蔔' },
  // ---- Level 3（四年级） ----
  { zh: '火腿',   py: 'huǒ tuǐ',        en: 'ham',             level: 3 },
  { zh: '肉汁',   py: 'ròu zhī',        en: 'gravy',           level: 3 },
  { zh: '红莓酱', py: 'hóng méi jiàng', en: 'cranberry sauce', level: 3, trad: '紅莓醬' },
  { zh: '番薯',   py: 'fān shǔ',        en: 'yam',             level: 3 }
];

/* ---------------- 快手买一买（感恩节采买） ----------------
   东西从上面掉下来，下面的输送带从右往左送字卡。先点东西再点字（或反过来），配对成功东西就消失，
   购物清单上那一项 +1。时间内把清单买齐，就有金币（Level 1／2／3 给 1／2／3 颗）。
   字卡和东西各走各的，顺序打乱；可是输送带上的每张字卡，上面一定有一样同名的东西正在掉。
   东西落地或被买走，它的字卡就消失。有些东西等不到字卡就落地了，没关系。
   seconds   一回合几秒
   fall      东西从上面掉到地上要几秒（越大越慢，三级都一样）；字卡走完输送带也是这么久
   every     几秒掉一样东西
   cardEvery 输送带大约几秒送一张字卡（会随机快一点、慢一点）
   noise     掉下来的东西里，不在清单上的（干扰品）大约占多少：0.25 = 4 样里 1 样
             Level 2、3 的干扰品也会有字卡（干扰卡）
   lists     每一级的购物清单：清单上 4 样东西（每回合从这一级的字随机挑），各要买几个
   noiseFrom 这一级的干扰品从哪一级的字来，而且只掉图、不出字卡
             （Level 1 只有 4 个字，清单就用完了，所以借 Level 2 的东西当干扰）
*/
UNIT.shop = {
  title: { zh: '快手买一买', py: 'kuài shǒu mǎi yi mǎi', en: 'Quick Shopper' },
  list:  { zh: '我要买', py: 'wǒ yào mǎi', en: 'I want to buy' },
  done:  { zh: '买齐了！感恩节快乐！', py: 'mǎi qí le! gǎn ēn jié kuài lè!', en: 'All bought! Happy Thanksgiving!' },
  seconds: 45,
  fall: 8,
  every: 1,
  cardEvery: 1,
  noise: 0.25,
  lists: [
    [2, 2, 2, 2],     // Level 1：共 8 个
    [2, 2, 2, 2],     // Level 2：共 8 个
    [2, 2, 2, 2]      // Level 3：共 8 个
  ],
  noiseFrom: { 1: 2 }
};
