/* =====================================================================
   单元：颜色 Colors（主岛 → 游乐场 → 套圈圈）
   ---------------------------------------------------------------------
   套圈圈 games/ringtoss.html?unit=colors 读这一份。
   拼音照台湾的念法。

   颜色（words）每个一行：
     zh     中文（简体），会写在瓶子的牌子上
     py     拼音，字和字之间空一格
     en     英文（游戏里不显示，给老师看的）
     hex    瓶子和圈圈的颜色
     level  1 = 二年级、2 = 三年级、3 = 四年级，每一级都包含前面的颜色
     trad   繁体（只有和简体不一样的字才需要写）
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 每一级的说明（Level 按钮上的小字） */
UNIT.levels = [
  { note: '6 colors · 8 rings' },
  { note: '+ orange, purple, brown · 10 rings' },
  { note: '+ pink, gold, silver · 12 rings' }
];

/* 颜色 */
UNIT.words = [
  // ---- Level 1（二年级） ----
  { zh: '红色',   py: 'hóng sè',     en: 'red',    hex: '#E5483B', level: 1, trad: '紅色' },
  { zh: '黄色',   py: 'huáng sè',    en: 'yellow', hex: '#F5C531', level: 1, trad: '黃色' },
  { zh: '蓝色',   py: 'lán sè',      en: 'blue',   hex: '#3B78D8', level: 1, trad: '藍色' },
  { zh: '绿色',   py: 'lǜ sè',       en: 'green',  hex: '#45A852', level: 1, trad: '綠色' },
  { zh: '白色',   py: 'bái sè',      en: 'white',  hex: '#FFFFFF', level: 1 },
  { zh: '黑色',   py: 'hēi sè',      en: 'black',  hex: '#2B2B2B', level: 1 },
  // ---- Level 2（三年级） ----
  { zh: '橙色',   py: 'chéng sè',    en: 'orange', hex: '#F28C28', level: 2 },
  { zh: '紫色',   py: 'zǐ sè',       en: 'purple', hex: '#8E5CC2', level: 2 },
  { zh: '棕色',   py: 'zōng sè',     en: 'brown',  hex: '#9C6234', level: 2 },   // 课纲二年级 12 月（2026-11 补上）
  // ---- Level 3（四年级） ----
  { zh: '粉红色', py: 'fěn hóng sè', en: 'pink',   hex: '#F49AC1', level: 3, trad: '粉紅色' },
  { zh: '金色',   py: 'jīn sè',      en: 'gold',   hex: '#D9A520', level: 3 },
  { zh: '银色',   py: 'yín sè',      en: 'silver', hex: '#B9C0C8', level: 3, trad: '銀色' }
];

/* ---------------- 套圈圈 ----------------
   10 个瓶子排成保龄球的三角形，每个瓶子挂一个牌子。下面一排彩色圈圈。
   点一个圈圈，再点一个瓶子（或反过来）：牌子上写的颜色跟圈圈一样才算套中。
   瓶子本身的颜色是来骗人的：有时跟牌子一样，有时不一样（随机）。
   套中：瓶子换一个新的，下面补一个新圈圈。套错：圈圈弹开掉下去，也补一个新的（不扣分，只是浪费时间）。
   时间内套中的数量达标，就有金币（Level 1／2／3 给 1／2／3 颗）。
   seconds  一回合几秒
   targets  每一级要套中几个
   rings    下面一次放几个圈圈
   same     瓶子颜色跟牌子一样的机会：0.4 = 10 个里大约 4 个
*/
UNIT.ringtoss = {
  title: { zh: '套圈圈', py: 'tào quān quān', en: 'Ring Toss' },
  help: "Tap a ring and a bottle to match the color of the ring with the color word printed on the bottle. Don't be tricked by the bottle color!",
  seconds: 90,
  targets: [8, 10, 12],
  rings: 4,
  same: 0.4,
  done: { zh: '太棒了！', py: 'tài bàng le!' }
};
