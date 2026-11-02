/* =====================================================================
   岛和岛上的东西
   以后新增单元，通常只要改这个档案：
   - 在地点（places）里加一个 { zh, py, en, x, y, color, games: [...] }
   - games 里每个游戏是：{ zh, py, en, note, href }
     href 写「玩法 + 单元资料夹」，例如：
       'games/match.html?unit=family'   家人找一找
       'games/tree.html?unit=family'    家族树
       'games/board.html?unit=family'   大富翁
   - 每座岛有自己的地图。每个地点有一块牌子，x / y 是牌子在地图上的位置
     （主岛的地图宽 2480、高 620，可以左右滑动：左半边是原本的社区，右半边是城镇区；节日岛宽 1240）。
   - 点牌子会跳出这个地点的游戏选单（games）。
     还没有游戏的地点，牌子是虚线、写 Coming soon，点了不会有反应。
   - id：有游戏的地点要有一个英文 id（小写、用 - 连接），游戏里的「回到地点」按钮会用到。
   - labelOnly: true 的地点只是岛上的名牌，不会有游戏。
   - color：'me' 绿、'dad' 橘、'mom' 粉红、'sea' 蓝、'sun' 黄、'night' 紫
   ===================================================================== */
window.ISLANDS = {
  main: {
    zh: '史老师的中文岛', py: 'shǐ lǎo shī de zhōng wén dǎo', en: "Ms. Shih's Chinese Island", width: 2480,
    places: [
      { id: 'family', zh: '家', py: 'jiā', en: 'Family', x: 875, y: 132, color: 'dad',
        games: [
          { zh: '家人找一找', py: 'jiā rén zhǎo yi zhǎo', en: 'Family Find', note: 'Tap a Chinese word, then tap its English match. Match all the pairs.', href: 'games/match.html?unit=family' },
          { zh: '家族树', py: 'jiā zú shù', en: 'Family Tree', note: 'Drag each word to the right place on the family tree. You can also tap a word, then tap a box.', href: 'games/tree.html?unit=family' },
          { zh: '家庭大富翁', py: 'jiā tíng dà fù wēng', en: 'Family Board Game', note: 'Take turns rolling the dice and follow instructions on the board to get moving.', href: 'games/board.html?unit=family' },
          { zh: '唱一唱', py: 'chàng yi chàng', en: 'Sing Along', note: 'Watch the video and sing along!', href: 'games/sing.html?unit=family' }
        ] },
      { id: 'school', zh: '学校', py: 'xué xiào', en: 'School', x: 410, y: 112, color: 'mom',
        games: [
          { zh: '认字对对碰', py: 'rèn zì duì duì pèng', en: 'Word Pairs', note: 'Tap a Chinese word, then tap its English match. Match all the pairs.', href: 'games/match.html?unit=school' },
          { zh: '对话框', py: 'duì huà kuàng', en: 'Chat Bubbles', note: 'Read the chat. Drag the cards into the empty bubbles. You can also tap a card, then tap a bubble.', href: 'games/chat.html?unit=school' },
          { zh: '自我介绍', py: 'zì wǒ jiè shào', en: 'About Me', note: 'Read the All About Me card. Drag the words into the sentences.', href: 'games/intro.html?unit=school' }
        ] },
      { id: 'playground', zh: '公园', py: 'gōng yuán', en: 'Park', x: 535, y: 590, color: 'me',
        games: [
          { zh: '好朋友', py: 'hǎo péng yǒu', en: 'Best Friends', note: 'Look at the picture. Drag the names and words into the sentences.', href: 'games/friends.html?unit=school' },
          { zh: '套圈圈', py: 'tào quān quān', en: 'Ring Toss', note: "Match the color of the ring with the color word printed on the bottle. Don't be tricked by the bottle color!", href: 'games/ringtoss.html?unit=colors' }
        ] },
      { id: 'library', zh: '图书馆', py: 'tú shū guǎn', en: 'Library', x: 615, y: 112, color: 'night',
        games: [
          { zh: '图书馆', py: 'tú shū guǎn', en: 'Library', note: 'Read the book. Pick 2 to 12 words you want to practice, then start matching!', href: 'games/library.html?unit=library' }
        ] },
      { zh: '超市', py: 'chāo shì', en: 'Supermarket', x: 352, y: 492, color: 'me', games: [] },
      { id: 'hospital', zh: '医院', py: 'yī yuàn', en: 'Hospital', x: 158, y: 548, color: 'mom',
        games: [
          { zh: '看医生', py: 'kàn yī shēng', en: 'See the Doctor', note: 'Pick the word, or read or listen and tap the body part (Level 2: put on the bandage).', href: 'games/doctor.html?unit=body' },
          { zh: '候诊室', py: 'hòu zhěn shì', en: 'Waiting Room', note: 'Drag the right sentence into each speech bubble.', href: 'games/waiting.html?unit=body' }
        ] },
      // ---- 往右滑：城镇区 ----
      { id: 'mall', zh: '购物中心', py: 'gòu wù zhōng xīn', en: 'Shopping Mall', x: 1470, y: 84, color: 'night',
        games: [
          { zh: '服务台', py: 'fú wù tái', en: 'Lost Kid Announcement', note: 'Tap 🔊 to hear the top and bottom of the lost kid. Then find the lost kid in the crowd.', href: 'games/lost.html?unit=clothes' },
          { zh: '找朋友', py: 'zhǎo péng yǒu', en: 'Find My Friends', note: "Read your friend's message to see their top and bottom. Then find your friend in the crowd.", href: 'games/find.html?unit=clothes' }
        ] },
      { zh: '宠物店', py: 'chǒng wù diàn', en: 'Pet Shop', x: 1200, y: 132, color: 'mom', games: [] },
      { zh: '消防局', py: 'xiāo fáng jú', en: 'Fire Station', x: 1760, y: 132, color: 'dad', games: [] },
      { zh: '餐厅', py: 'cān tīng', en: 'Restaurant', x: 1330, y: 526, color: 'dad', games: [] },
      { zh: '公安局', py: 'gōng ān jú', en: 'Police Station', x: 1620, y: 564, color: 'sea', games: [] },
      { zh: '邮政局', py: 'yóu zhèng jú', en: 'Post Office', x: 1910, y: 510, color: 'me', games: [] },
      // 旅客中心：在码头旁边，坐船来的人先到这里
      { id: 'hello', zh: '你好', py: 'nǐ hǎo', en: 'Hello', x: 2060, y: 88, color: 'sea',
        games: [
          { zh: '认字手牵手', py: 'rèn zì shǒu qiān shǒu', en: 'Hand in Hand', note: 'Tap a Chinese word, then tap its English match. Match all the pairs.', href: 'games/match.html?unit=hello' },
          { zh: '你好吗？', py: 'nǐ hǎo ma?', en: 'How Are You?', note: 'Look at the kid. Tap what he or she would say.', href: 'games/feel.html?unit=hello' },
          { zh: '顺风耳', py: 'shùn fēng ěr', en: 'Super Ears', note: 'Listen first (tap 🔊 to hear it again). Then tap the right answer.', href: 'games/ears.html?unit=hello' }
        ] },
      { id: 'numbers', zh: '数字', py: 'shù zì', en: 'Numbers', x: 872, y: 520, color: 'sun',
        games: [
          { zh: '数字挑战', py: 'shù zì tiǎo zhàn', en: 'Number Challenge', note: 'Answer one question at a time: read numbers, find the missing number, put numbers in order, and do math.', href: 'games/numbers.html?unit=numbers' },
          { zh: '看算盘', py: 'kàn suàn pán', en: 'Read the Abacus', note: 'Look at the abacus. Pick the right number, or tell if it is right or wrong.', href: 'games/abacus-read.html?unit=numbers' },
          { zh: '拨一拨', py: 'bō yi bō', en: 'Make the Number', note: 'Read the number. Move the beads to show it on the abacus, then check your answer.', href: 'games/abacus-set.html?unit=numbers' },
          { zh: '自由拨', py: 'zì yóu bō', en: 'Free Play', note: 'Tap the beads to move them. Play with the abacus!', href: 'games/abacus-free.html?unit=numbers' }
        ] }
    ]
  },
  holiday: {
    zh: '节日岛', py: 'jié rì dǎo', en: 'Holiday Island', width: 1240,
    places: [
      { id: 'haunted-house', zh: '鬼屋', py: 'guǐ wū', en: 'Haunted House', x: 540, y: 110, color: 'night',
        games: [
          { zh: '鬼屋窗户', py: 'guǐ wū chuāng hù', en: 'Haunted House Windows', note: 'Tap a window to open it. Answer the question about what you see.', href: 'games/windows.html?unit=halloween' },
          { zh: '我看到', py: 'wǒ kàn dào', en: 'I See', note: 'Tap a circle to see what is there. Drag the word into the sentence.', href: 'games/spy.html?unit=halloween' },
          { zh: '化妆舞会', py: 'huà zhuāng wǔ huì', en: 'Costume Party', note: 'Look at each costume. Drag each name under the right kid.', href: 'games/dressup.html?unit=halloween' },
          { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: "I'm afraid / I'm not afraid", note: 'Look at the picture. Put the word cards in order to make the sentence.', href: 'games/afraid.html?unit=halloween' }
        ] },
      { id: 'moon', zh: '中秋节', py: 'zhōng qiū jié', en: 'Moon Festival', x: 950, y: 480, color: 'sun',
        games: [
          { zh: '四格故事', py: 'sì gé gù shì', en: 'Story Panels', note: 'First put the 4 pictures in order. Then drag the words into the speech bubbles.', href: 'games/story.html?unit=moon' },
          { zh: '中秋小知识', py: 'zhōng qiū xiǎo zhī shì', en: 'Moon Festival Quiz', note: 'Read the question. Tap the right answer.', href: 'games/quiz.html?unit=moon' }
        ] },
      { id: 'market', zh: '感恩节市场', py: 'gǎn ēn jié shì chǎng', en: 'Thanksgiving Market', x: 950, y: 170, color: 'dad',
        games: [
          { zh: '快手买一买', py: 'kuài shǒu mǎi yi mǎi', en: 'Quick Shopper', note: 'Tap a falling food, then its word on the belt. Buy everything on your list!', href: 'games/shop.html?unit=thanksgiving' },
          { zh: '市场算一算', py: 'shì chǎng suàn yi suàn', en: 'Market Math', note: 'Read the food words and do the math. Pick the right answer.', href: 'games/calc.html?unit=thanksgiving' }
        ] }
    ]
  }
};
