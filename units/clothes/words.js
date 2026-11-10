/* =====================================================================
   单元：衣服 Clothes（四年级）
   ---------------------------------------------------------------------
   服务台（听）games/lost.html?unit=clothes、找朋友（读）games/find.html?unit=clothes 读这一份。
   Level 2（三年级）只看颜色；Level 3（四年级）颜色和衣服都要对。拼音照台湾的念法。

   衣服（clothes）每件一行：
     zh    中文（简体）     py  拼音（T恤 只写 xù）     en  英文（给老师看的）
     kind  哪一个部位：top 上身、bottom 下身、dress 连衣裙（上下一件）、shoes 鞋子、hat 帽子
           题目只出 top／bottom；连衣裙、鞋子、帽子只是穿在人群里的人身上
   颜色（colors）：题目和衣服用到的颜色；level 2 = 三年级就会（Level 2 只用这些），level 3 = 四年级才加
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

UNIT.clothes = [
  { zh: 'T恤',    py: 'xù',           en: 't-shirt',       kind: 'top' },   // T 是英文字母，拼音只标「恤」
  { zh: '毛衣',   py: 'máo yī',       en: 'sweater',       kind: 'top' },
  { zh: '外套',   py: 'wài tào',      en: 'coat',          kind: 'top' },
  { zh: '球衣',   py: 'qiú yī',       en: 'jersey',        kind: 'top' },
  { zh: '牛仔裤', py: 'niú zǎi kù',   en: 'jeans',         kind: 'bottom' },
  { zh: '短裤',   py: 'duǎn kù',      en: 'shorts',        kind: 'bottom' },
  { zh: '裙子',   py: 'qún zi',       en: 'skirt',         kind: 'bottom' },
  { zh: '连衣裙', py: 'lián yī qún',  en: 'dress',         kind: 'dress' },
  { zh: '运动鞋', py: 'yùn dòng xié', en: 'sneakers',      kind: 'shoes' },
  { zh: '皮鞋',   py: 'pí xié',       en: 'leather shoes', kind: 'shoes' },
  { zh: '高跟鞋', py: 'gāo gēn xié',  en: 'heels',         kind: 'shoes' },
  { zh: '帽子',   py: 'mào zi',       en: 'hat',           kind: 'hat' }
];

/* 图书馆读 UNIT.words：衣服的字 */
UNIT.words = UNIT.clothes;

UNIT.colors = [
  { zh: '红色',   py: 'hóng sè',     en: 'red',    hex: '#E5483B', level: 2 },
  { zh: '黄色',   py: 'huáng sè',    en: 'yellow', hex: '#F5C531', level: 2 },
  { zh: '蓝色',   py: 'lán sè',      en: 'blue',   hex: '#3B78D8', level: 2 },
  { zh: '绿色',   py: 'lǜ sè',       en: 'green',  hex: '#45A852', level: 2 },
  { zh: '白色',   py: 'bái sè',      en: 'white',  hex: '#FFFFFF', level: 2 },
  { zh: '黑色',   py: 'hēi sè',      en: 'black',  hex: '#2B2B2B', level: 2 },
  { zh: '橙色',   py: 'chéng sè',    en: 'orange', hex: '#F28C28', level: 2 },
  { zh: '紫色',   py: 'zǐ sè',       en: 'purple', hex: '#8E5CC2', level: 2 },
  { zh: '粉红色', py: 'fěn hóng sè', en: 'pink',   hex: '#F49AC1', level: 3 }
];

/* ---------------- 找人（服务台、找一找共用） ----------------
   一张挤挤的购物中心图。一关要找 count 个人，找到一个就换下一个人的条件（newPicture 决定要不要换新图）。
   条件分两行：Top／Bottom。
   找朋友 Level 2：只写颜色（红色／黑色），找人只看颜色。
   找朋友 Level 3：写颜色和衣服（红色的球衣／黑色的牛仔裤），颜色和衣服都要对；图里会有只差衣服种类的人。
   服务台：只有 Level 3。广播念颜色和衣服（红色的球衣），可是找人只看颜色。
   服务台每行一个 🔊（用听的），找一找每行写出来（用读的）。
   规则：整张图里只有要找的那个人「看得到的上衣和下身都对」，其他人露出来的上衣或下身一定有一件不对。
   点错人不扣分，两行会打 ✅／❌。时间内找到就过关，有金币（Level 2：2 颗、Level 3：3 颗）。每找到一个人就换一张新的图（newPicture）。
   seconds  一关几秒（所有人一起算）
   newPicture  true：每找到一个人，就换一张新的图；false：所有人都在同一张图里找
   count    一关找几个人
   near     每个走失的小朋友，图里放几个「只差一点」的人（上衣或下身颜色不对，或上下颜色对调）
*/
UNIT.crowd = {
  seconds: 90,
  levels: [{ note: '' }, { note: 'Colors' }, { note: 'Colors + clothes' }],
  count: 5,
  newPicture: true,
  near: 3,
  // 服务台：广播找走失的小朋友（用听的）
  lost: {
    title: { zh: '服务台', py: 'fú wù tái', en: 'Lost Kid Announcement' },
    card: { icon: '📢', head: 'Lost kid!', who: 'Lost kid', many: 'lost kids' },
    help: 'Tap 🔊 to hear Top and Bottom. Then tap the lost kid in the crowd.'
  },
  // 找朋友：跟朋友约好见面，朋友传讯息说今天的衣服（用读的）
  find: {
    title: { zh: '找朋友', py: 'zhǎo péng yǒu', en: 'Find My Friends' },
    card: { icon: '📱', head: "My friend's message", who: 'Friend', many: 'friends' },
    help: "Your friend is at the mall. Read the message to see the top and bottom they have on today. Then find that friend in the crowd and tap them!"
  },
  done: { zh: '都找到了！', py: 'dōu zhǎo dào le!' }
};

/* ---------------- 衣服走一走（board game） ----------------
   一个学生自己玩：按「掷骰子」，棋子往前走，停在哪一格就说那一格的衣服（选字卡放进句子）。答对了才能再掷骰子。
   Level 1「这是＿＿。」（只说衣服）
   Level 2「这是＿＿的＿＿。」（颜色＋衣服）
   Level 3 字卡自己排成整句「我想买红色的T恤。」再按 Submit
   特别格（special）：前进两格、后退一格、再掷一次。时间内走到终点（第 21 格）就有金币（1/2/3）
   每一格的衣服和颜色每次都会重新随机 */
UNIT.board = {
  title: { zh: '衣服走一走', py: 'yī fú zǒu yi zǒu', en: 'Clothes Board Game' },
  squares: 21,
  time: [150, 180, 240],
  special: {
    5:  { zh: '前进两格', py: 'qián jìn liǎng gé', en: 'Go forward 2', move: 2 },
    11: { zh: '后退一格', py: 'hòu tuì yì gé', en: 'Go back 1', move: -1 },
    16: { zh: '再掷一次', py: 'zài zhì yí cì', en: 'Roll again', again: true }
  }
};
