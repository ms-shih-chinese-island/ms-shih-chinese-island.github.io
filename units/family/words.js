/* =====================================================================
   单元：家 Family
   ---------------------------------------------------------------------
   这个资料夹只有资料。三个游戏（家族树、家人配对、家庭大富翁）都读这一份。
   改错字、拼音、英文，只要改这里。

   这个档案有四个部分：
     1. levels  每一级冰淇淋的说明
     2. words   生词库
     3. tree    家族树的形状（家族树游戏用）
     4. board   大富翁棋盘的顺序（大富翁游戏用）
   ---------------------------------------------------------------------
   生词库（words）每个字一行，栏位：

   每个字一行，栏位：
     zh     中文（简体）
     py     拼音，字和字之间空一格，例如 'bà ba'
     en     英文（家人配对、家族树的提示用）
     short  短英文（家庭大富翁的格子用）
     side   颜色：'me' = 绿色（爸妈、兄弟姐妹）
                  'dad' = 橘色（爸爸那边）
                  'mom' = 粉红色（妈妈那边）
     level  难度 1、2、3、4……（冰淇淋几球），每一级都包含前面所有级
     trad   繁体（只有和简体不一样的字才需要写）
     match  写 false 的字不会出现在家人配对（例如「我」）

   加新字：复制一行，改内容就好。注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* ---- 游戏名称（显示在每个游戏的标题） ---- */
UNIT.matchTitle = { zh: '家人配对',   py: 'jiā rén pèi duì',     en: 'Family Matching' };
UNIT.treeTitle  = { zh: '家族树',     py: 'jiā zú shù',          en: 'Family Tree' };
UNIT.boardTitle = { zh: '家庭大富翁', py: 'jiā tíng dà fù wēng', en: 'Family Board Game' };

/* ---- 1. 每一级冰淇淋的说明（按钮上的小字） ---- */
UNIT.levels = [
  { note: 'parents, brothers & sisters' },
  { note: '+ grandparents' },
  { note: "+ parents' brothers & sisters" },
  { note: '+ cousins 堂 / 表' }
];

/* ---- 2. 生词库 ---- */
UNIT.words = [
  // ---- Level 1：爸妈、兄弟姐妹 ----
  { zh: '我',   py: 'wǒ',      en: 'me',              short: 'Me',              side: 'me',  level: 1, match: false },
  { zh: '爸爸', py: 'bà ba',   en: 'father',          short: 'Father',          side: 'me',  level: 1 },
  { zh: '妈妈', py: 'mā ma',   en: 'mother',          short: 'Mother',          side: 'me',  level: 1, trad: '媽媽' },
  { zh: '哥哥', py: 'gē ge',   en: 'older brother',   short: 'Older Brother',   side: 'me',  level: 1 },
  { zh: '姐姐', py: 'jiě jie', en: 'older sister',    short: 'Older Sister',    side: 'me',  level: 1 },
  { zh: '弟弟', py: 'dì di',   en: 'younger brother', short: 'Younger Brother', side: 'me',  level: 1 },
  { zh: '妹妹', py: 'mèi mei', en: 'younger sister',  short: 'Younger Sister',  side: 'me',  level: 1 },

  // ---- Level 2：爷爷奶奶、外公外婆 ----
  { zh: '爷爷', py: 'yé ye',    en: "father's father", short: "Grandpa (Dad's)", side: 'dad', level: 2, trad: '爺爺' },
  { zh: '奶奶', py: 'nǎi nai',  en: "father's mother", short: "Grandma (Dad's)", side: 'dad', level: 2 },
  { zh: '外公', py: 'wài gōng', en: "mother's father", short: "Grandpa (Mom's)", side: 'mom', level: 2 },
  { zh: '外婆', py: 'wài pó',   en: "mother's mother", short: "Grandma (Mom's)", side: 'mom', level: 2 },

  // ---- Level 3：爸爸、妈妈的兄弟姐妹 ----
  { zh: '伯伯', py: 'bó bo',   en: "father's big brother",     short: "Uncle (Dad's older)",   side: 'dad', level: 3 },
  { zh: '叔叔', py: 'shū shu', en: "father's younger brother", short: "Uncle (Dad's younger)", side: 'dad', level: 3 },
  { zh: '姑姑', py: 'gū gu',   en: "father's sister",          short: "Aunt (Dad's)",          side: 'dad', level: 3 },
  { zh: '舅舅', py: 'jiù jiu', en: "mother's brother",         short: "Uncle (Mom's brother)", side: 'mom', level: 3 },
  { zh: '阿姨', py: 'ā yí',    en: "mother's sister",          short: "Aunt (Mom's sister)",   side: 'mom', level: 3 },

  // ---- Level 4：堂、表兄弟姐妹 ----
  { zh: '堂哥', py: 'táng gē',  en: "older boy cousin (dad's side)",    short: 'Older Boy Cousin (Dad)',    side: 'dad', level: 4 },
  { zh: '堂姐', py: 'táng jiě', en: "older girl cousin (dad's side)",   short: 'Older Girl Cousin (Dad)',   side: 'dad', level: 4 },
  { zh: '堂弟', py: 'táng dì',  en: "younger boy cousin (dad's side)",  short: 'Younger Boy Cousin (Dad)',  side: 'dad', level: 4 },
  { zh: '堂妹', py: 'táng mèi', en: "younger girl cousin (dad's side)", short: 'Younger Girl Cousin (Dad)', side: 'dad', level: 4 },
  { zh: '表哥', py: 'biǎo gē',  en: "older boy cousin (mom's side)",    short: 'Older Boy Cousin (Mom)',    side: 'mom', level: 4 },
  { zh: '表姐', py: 'biǎo jiě', en: "older girl cousin (mom's side)",   short: 'Older Girl Cousin (Mom)',   side: 'mom', level: 4 },
  { zh: '表弟', py: 'biǎo dì',  en: "younger boy cousin (mom's side)",  short: 'Younger Boy Cousin (Mom)',  side: 'mom', level: 4 },
  { zh: '表妹', py: 'biǎo mèi', en: "younger girl cousin (mom's side)", short: 'Younger Girl Cousin (Mom)', side: 'mom', level: 4 }

  // 以后可以接着加，例如：
  // { zh: '儿子', py: 'ér zi', en: 'son', short: 'Son', side: 'me', level: 5, trad: '兒子' },
];

/* ---------------------------------------------------------------------
   3. 家族树的形状：谁是谁的爸妈（家族树游戏用）
   每一行：[ '爸妈（一个或两个人）', '孩子们' ]
   - 名字要和上面生词库的中文一模一样，用空格隔开。
   - 树上每个人在哪一级出现，看生词库里的 level。
   - 只写一个人当爸妈也可以，例如 [ '伯伯', '堂哥 堂姐' ]。
   - 孩子的顺序就是树上由左到右的顺序。
     爸爸要放在他兄弟姐妹的最右边、妈妈放在她兄弟姐妹的最左边，
     这样爸爸妈妈才会站在一起。
   - 往上、往下加一代，就多加一行。例如：
       [ '曾祖父 曾祖母', '爷爷' ],
       [ '我 先生', '儿子 女儿' ],
       [ '儿子 媳妇', '孙子 孙女' ],
   --------------------------------------------------------------------- */
// 树的左上角、右上角的标签（可以不写）
UNIT.treeSides = [
  { zh: '爸爸这边', py: 'bà ba zhè biān', en: "Dad's side", side: 'dad' },
  { zh: '妈妈这边', py: 'mā ma zhè biān', en: "Mom's side", side: 'mom' }
];
// 已经放在树上、不用拖的人
UNIT.treeGiven = ['我'];

UNIT.tree = [
  [ '爷爷 奶奶', '伯伯 叔叔 姑姑 爸爸' ],
  [ '外公 外婆', '妈妈 舅舅 阿姨' ],
  [ '爸爸 妈妈', '哥哥 姐姐 我 弟弟 妹妹' ],
  [ '伯伯',      '堂哥 堂姐' ],
  [ '叔叔',      '堂弟 堂妹' ],
  [ '舅舅',      '表哥 表弟' ],
  [ '阿姨',      '表姐 表妹' ]
];

/* ---------------------------------------------------------------------
   4. 家庭大富翁的棋盘：从 GO 开始往左绕一圈的顺序（大富翁用）
   - GO 在右下角，接着沿着底边往左、左边往上、上边往右、右边往下。
   - 棋盘一共 22 格：GO + 21 个字，字数要刚好 21 个。
   --------------------------------------------------------------------- */
UNIT.board =
  'GO 妹妹 弟弟 姐姐 哥哥 妈妈 爸爸 姑姑 ' +
  '叔叔 伯伯 奶奶 ' +
  '爷爷 堂哥 堂姐 堂弟 表哥 表姐 表妹 外公 ' +
  '外婆 舅舅 阿姨';
