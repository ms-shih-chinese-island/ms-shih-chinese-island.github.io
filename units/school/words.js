/* =====================================================================
   单元：学校 School（主岛 → 学校）：认识同学、自我介绍
   ---------------------------------------------------------------------
   难度（书包 🎒）：1 = 二年级、2 = 三年级、3 = 四年级。
   每个年级都包含前面年级的字，只会多、不会少。

   生词（words）每个一行，栏位：
     zh     中文（简体）
     py     拼音，字和字之间空一格
     en     英文
     level  难度（1 = 二年级、2 = 三年级、3 = 四年级）
     adj    true = 形容词（自我介绍的「我很＿＿。」会用到），icon 是资料卡上的小图示
   加新字：复制一行，改内容就好。注意每行最后的逗号。
   小朋友的名单和图在 shared/kids.js（旅客中心也用同一份）。
   ===================================================================== */
window.UNIT = {};
UNIT.levelIcon = 'bag';
UNIT.matchMode = 'pinyin';     // 认字配对：拼音 + 英文 ↔ 中文字
UNIT.matchTitle = { zh: '认字配对', py: 'rèn zì pèi duì', en: 'Pinyin Match' };
UNIT.matchMax = 12;            // 每次最多配几组；字比较多的时候，每次随机挑

UNIT.levels = [
  { note: '' },
  { note: '' },
  { note: '' }
];

UNIT.words = [
  // ---- 二年级 ----
  { zh: '老师',     py: 'lǎo shī',       en: 'teacher',          side: 'mom', level: 1 },
  { zh: '小朋友',   py: 'xiǎo péng yǒu', en: 'kids, children',   side: 'mom', level: 1 },
  { zh: '你叫',     py: 'nǐ jiào',       en: 'you are called',   side: 'mom', level: 1 },
  { zh: '什么',     py: 'shén me',       en: 'what',             side: 'mom', level: 1 },
  { zh: '名字',     py: 'míng zì',       en: 'name',             side: 'mom', level: 1 },
  { zh: '我叫',     py: 'wǒ jiào',       en: 'my name is',       side: 'mom', level: 1 },
  // ---- 三年级 ----
  { zh: '学习',     py: 'xué xí',        en: 'learn, study',     side: 'mom', level: 2 },
  { zh: '中文',     py: 'zhōng wén',     en: 'Chinese',          side: 'mom', level: 2 },
  { zh: '我们',     py: 'wǒ men',        en: 'we',               side: 'mom', level: 2 },
  { zh: '都是',     py: 'dōu shì',       en: 'all are',          side: 'mom', level: 2 },
  { zh: '好同学',   py: 'hǎo tóng xué',  en: 'good classmates',  side: 'mom', level: 2 },
  { zh: '岁',       py: 'suì',           en: 'years old',        side: 'mom', level: 2 },
  { zh: '年级',     py: 'nián jí',       en: 'grade',            side: 'mom', level: 2 },
  // ---- 四年级 ----
  { zh: '你几岁？', py: 'nǐ jǐ suì?',    en: 'How old are you?', side: 'mom', level: 3 },
  { zh: '我姓',     py: 'wǒ xìng',       en: 'my last name is',  side: 'mom', level: 3 },
  { zh: '好朋友',   py: 'hǎo péng yǒu',  en: 'best friend',      side: 'mom', level: 3 },
  { zh: '家',       py: 'jiā',           en: 'family, home',     side: 'mom', level: 3 },
  { zh: '长发',     py: 'cháng fà',      en: 'long hair',        side: 'mom', level: 3 },
  { zh: '短发',     py: 'duǎn fà',       en: 'short hair',       side: 'mom', level: 3 },
  // 形容词（四年级）
  { zh: '聪明',     py: 'cōng míng',     en: 'smart',            side: 'mom', level: 3, adj: true, icon: '💡' },
  { zh: '勇敢',     py: 'yǒng gǎn',      en: 'brave',            side: 'mom', level: 3, adj: true, icon: '🦸' },
  { zh: '漂亮',     py: 'piào liàng',    en: 'pretty',           side: 'mom', level: 3, adj: true, icon: '🌸', girl: true },
  { zh: '诚实',     py: 'chéng shí',     en: 'honest',           side: 'mom', level: 3, adj: true, icon: '🤝' },
  { zh: '幽默',     py: 'yōu mò',        en: 'humorous',         side: 'mom', level: 3, adj: true, icon: '😂' },
  { zh: '友善',     py: 'yǒu shàn',      en: 'friendly',         side: 'mom', level: 3, adj: true, icon: '🤗' },
  { zh: '可爱',     py: 'kě ài',         en: 'cute',             side: 'mom', level: 3, adj: true, icon: '🧸' },
  { zh: '勤劳',     py: 'qín láo',       en: 'hardworking',      side: 'mom', level: 3, adj: true, icon: '🧹' },
  { zh: '活跃',     py: 'huó yuè',       en: 'active',           side: 'mom', level: 3, adj: true, icon: '🏃' }
];

/* 对话框：一回合几段对话。from = 从第几级开始（1 = 二年级就有） */
UNIT.chat = { title: { zh: '对话框', py: 'duì huà kuàng', en: 'Chat Bubbles' }, from: 1, rounds: 3 };

/* 自我介绍（四年级的 project） */
UNIT.intro = { title: { zh: '自我介绍', py: 'zì wǒ jiè shào', en: 'About Me' } };
