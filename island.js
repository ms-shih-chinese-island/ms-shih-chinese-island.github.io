/* =====================================================================
   岛和岛上的东西
   以后新增单元，通常只要改这个档案：
   - 在地点（places）里加一个 { zh, py, en, x, y, color, games: [...] }
   - games 里每个游戏是：{ zh, py, en, note, href }
     href 写「玩法 + 单元资料夹」，例如：
       'games/match.html?unit=family'   家人找一找
       'games/tree.html?unit=family'    家族树
       'games/board.html?unit=family'   家人走一走
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
      { id: 'family', zh: '家', py: 'jiā', en: 'Family', x: 763, y: 92, color: 'dad',
        games: [
          { zh: '家人找一找', py: 'jiā rén zhǎo yi zhǎo', en: 'Family Find', note: 'Tap a Chinese word, then tap its English match. Match all the pairs.', href: 'games/match.html?unit=family' },
          { zh: '家族树', py: 'jiā zú shù', en: 'Family Tree', note: 'Drag each word to the right place on the family tree. You can also tap a word, then tap a box.', href: 'games/tree.html?unit=family' },
          { zh: '家人走一走', py: 'jiā rén zǒu yi zǒu', en: 'Family Board Game', note: 'Take turns rolling the dice and follow instructions on the board to get moving.', href: 'games/board.html?unit=family' },
          { zh: '唱一唱', py: 'chàng yi chàng', en: 'Sing Along', note: 'Watch the video and sing along!', href: 'games/sing.html?unit=family' }
        ] },
      { id: 'school', zh: '学校', py: 'xué xiào', en: 'School', x: 265, y: 60, color: 'mom',
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
      { id: 'library', zh: '图书馆', py: 'tú shū guǎn', en: 'Library', x: 525, y: 138, color: 'night',
        games: [
          { zh: '图书馆', py: 'tú shū guǎn', en: 'Library', note: 'Read the book. Pick 2 to 12 words you want to practice, then start matching!', href: 'games/library.html?unit=library' }
        ] },
      { id: 'supermarket', zh: '超市', py: 'chāo shì', en: 'Supermarket', x: 352, y: 492, color: 'me',
        games: [
          { zh: '快手摆一摆', py: 'kuài shǒu bǎi yi bǎi', en: 'Stock the Shelves', note: 'Pick a zone: fruit, vegetables or mix. Read the signs and fill the shelves in 90 seconds!', href: 'games/stock.html?unit=fruits' },
          { zh: '超市买一买', py: 'chāo shì mǎi yi mǎi', en: 'Shopping List', note: "Fill the cart with what's on the shopping list. Tap 1 or more bags, then check out!", href: 'games/buy.html?unit=fruits' },
          { zh: '超市算一算', py: 'chāo shì suàn yi suàn', en: 'Supermarket Math', note: 'Read the fruit and vegetable words and do the math. Pick the right answer.', href: 'games/calc.html?unit=fruits' }
        ] },
      { id: 'hospital', zh: '医院', py: 'yī yuàn', en: 'Hospital', x: 158, y: 548, color: 'mom',
        games: [
          { zh: '看医生', py: 'kàn yī shēng', en: 'See the Doctor', note: 'Pick the word, or read or listen and tap the body part (Level 2: put on the bandage).', href: 'games/doctor.html?unit=body' },
          { zh: '候诊室', py: 'hòu zhěn shì', en: 'Waiting Room', note: 'Drag the right sentence into each speech bubble.', href: 'games/waiting.html?unit=body' },
          { zh: '西门说', py: 'xī mén shuō', en: 'Simon Says', note: 'Only tap when Simon says! 西门说，摸摸你的＿＿。', href: 'games/simon.html?unit=body' },
          { zh: '转盘', py: 'zhuàn pán', en: 'Wheel of Body Parts', note: 'Spin the wheel. Point to that body part on the kid. 指一指你的＿＿。', href: 'games/wheel.html?unit=body' }
        ] },
      // ---- 往右滑：城镇区 ----
      { id: 'mall', zh: '购物中心', py: 'gòu wù zhōng xīn', en: 'Shopping Mall', x: 1016, y: 84, color: 'night',
        games: [
          { zh: '服务台', py: 'fú wù tái', en: 'Lost Kid Announcement', note: 'Tap 🔊 to hear what the lost kid has on (top, bottom, dress, shoes, hat). Then find the lost kid in the crowd.', href: 'games/lost.html?unit=clothes' },
          { zh: '找朋友', py: 'zhǎo péng yǒu', en: 'Find My Friends', note: "Read your friend's message to see what they have on. Then find your friend in the crowd.", href: 'games/find.html?unit=clothes' },
          { zh: '衣服走一走', py: 'yī fú zǒu yi zǒu', en: 'Clothes Board Game', note: 'Roll the dice and say the clothes on your square. Get to the end in time!', href: 'games/clothesboard.html?unit=clothes' },
          { zh: '我想买', py: 'wǒ xiǎng mǎi', en: 'I Want to Buy', note: 'Find the clothes the kid wants. How much is it? Shop with your budget!', href: 'games/wantbuy.html?unit=clothes' }
        ] },
      { id: 'petshop', zh: '宠物店', py: 'chǒng wù diàn', en: 'Pet Shop', x: 1268, y: 132, color: 'mom', games: [
          { zh: '找宠物', py: 'zhǎo chǒng wù', en: 'Find the Pets', note: 'Read the sentence. Find the cat, dog, rabbit or bird in the right color!', href: 'games/animals.html?unit=petshop' }
        ] },
      { id: 'fire', zh: '消防局', py: 'xiāo fáng jú', en: 'Fire Station', x: 1918, y: 88, color: 'dad',
        games: [
          { zh: '找装备', py: 'zhǎo zhuāng bèi', en: 'Find the Gear', note: 'Fire! Help the firefighter put on the gear. (Extra practice: more coins!)', href: 'games/gear.html?unit=fire' },
          { zh: '去灭火', py: 'qù miè huǒ', en: 'Put Out the Fire', note: 'Which floor is on fire? How many buckets? Left or right? (Extra practice: more coins!)', href: 'games/douse.html?unit=fire' }
        ] },
      { id: 'zoo', zh: '动物园', py: 'dòng wù yuán', en: 'Zoo & Farm', x: 1454, y: 46, color: 'me', games: [
          { zh: '动物园点名', py: 'dòng wù yuán diǎn míng', en: 'Zoo Roll Call', note: 'Read the sentence. Find the right zoo animals — how many?', href: 'games/animals.html?unit=zoo' },
          { zh: '我喜欢动物', py: 'wǒ xǐ huān dòng wù', en: 'My Favorite Animal', note: 'Which animal do you like? Why? 我喜欢＿＿，因为＿＿很＿＿。', href: 'games/zoolike.html?unit=zoo' },
          { zh: '排大小', py: 'pái dà xiǎo', en: 'Small to Big', note: 'Put the animals in order from small to big. Which is the biggest?', href: 'games/zoosize.html?unit=zoo' }
        ] },
      { id: 'sports', zh: '运动场', py: 'yùn dòng chǎng', en: 'Sports Field', x: 1758, y: 166, color: 'sun', games: [
          { zh: '我喜欢打球', py: 'wǒ xǐ huān dǎ qiú', en: 'Sports I Like', note: 'Read the sports card: 我喜欢／我最棒的是／我不会／我想学＿＿。', href: 'games/sportstalk.html?unit=sports' },
          { zh: '谁在打什么球？', py: 'shéi zài dǎ shén me qiú?', en: 'Who Plays What?', note: 'Who plays which ball? Read names, shirt colors and count!', href: 'games/whoball.html?unit=sports' }
        ] },
      { id: 'aquarium', zh: '水族馆', py: 'shuǐ zú guǎn', en: 'Aquarium', x: 2194, y: 148, color: 'sea', games: [
          { zh: '在水族馆', py: 'zài shuǐ zú guǎn', en: 'At the Aquarium', note: 'Read the sentence. Find the sea animals — how many?', href: 'games/animals.html?unit=aquarium' },
          { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: 'Afraid or Not?', note: 'Look at the face. Are you afraid of the sea animal? 我怕／我不怕，大／小', href: 'games/pa.html?unit=aquarium' }
        ] },
      { id: 'airport', zh: '机场', py: 'jī chǎng', en: 'Airport', x: 1566, y: 412, color: 'night',
        games: [
          { zh: '涂国旗', py: 'tú guó qí', en: 'Color the Flag', note: 'Read the color words and color the flags of the world!', href: 'games/flags.html?unit=airport' },
          { zh: '天气怎么样？', py: 'tiān qì zěn me yàng', en: "How's the Weather?", note: 'The pilot asks about the weather. Look out the window (or at the weather board) and answer!', href: 'games/weather.html?unit=airport' },
          { zh: '几点起飞？', py: 'jǐ diǎn qǐ fēi', en: 'What Time Does It Leave?', note: 'Read the clock and the departure board. What time does the plane take off?', href: 'games/clock.html?unit=airport' },
          { zh: '我想去', py: 'wǒ xiǎng qù', en: 'Where Do You Want to Go?', note: 'A traveler wants to go somewhere. Find the flag, the date and the price on the flight board!', href: 'games/trip.html?unit=airport' }
        ] },
      { id: 'beach', zh: '海滩', py: 'hǎi tān', en: 'Beach', x: 2110, y: 594, color: 'sun',
        games: [
          { zh: '能去海滩吗？', py: 'néng qù hǎi tān ma', en: 'Beach Day?', note: 'Listen to the weather report on the radio. Can we go to the beach today? (Listening: more coins!)', href: 'games/forecast.html?unit=beach' },
          { zh: '我是谁？', py: 'wǒ shì shéi', en: 'Who Am I?', note: 'Listen: what does the kid have? Find the right kid on the beach! (Listening: more coins!)', href: 'games/whoami.html?unit=beach' },
          { zh: '海滩找一找', py: 'hǎi tān zhǎo yi zhǎo', en: 'Beach Hunt', note: 'Read the sentence and find the things on the beach!', href: 'games/beachfind.html?unit=beach' }
        ] },
      { id: 'garden', zh: '花园', py: 'huā yuán', en: 'Garden', x: 1250, y: 520, color: 'me', games: [
          { zh: '花园里的虫', py: 'huā yuán lǐ de chóng', en: 'Garden Bugs', note: 'Read the sentence. Find the bugs in the right color!', href: 'games/animals.html?unit=garden' },
          { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: 'Afraid or Not?', note: 'Look at the face. Are you afraid of the bug? 我怕／我不怕，大／小', href: 'games/pa.html?unit=garden' }
        ] },
      { id: 'restaurant', zh: '餐厅', py: 'cān tīng', en: 'Restaurant', x: 1076, y: 546, color: 'dad',
        games: [
          { zh: '请给我', py: 'qǐng gěi wǒ', en: 'Please Give Me', note: 'A customer asks for tableware. Read or listen, then give the right things.', href: 'games/give.html?unit=restaurant' },
          { zh: '爱吃不爱吃', py: 'ài chī bú ài chī', en: 'Yummy or Yucky?', note: 'Look at 👍 👎 and build the sentence: 我爱吃饺子。', href: 'games/likes.html?unit=restaurant' },
          { zh: '快手出菜', py: 'kuài shǒu chū cài', en: 'Speedy Server', note: 'Customers line up! Drag the food or tableware each one asks for. Try ⚡ 90 seconds or 🐢 practice.', href: 'games/serve.html?unit=restaurant' },
          { zh: '菜单填一填', py: 'cài dān tián yi tián', en: 'Fill in the Menu', note: 'Drag each Chinese name under the right picture on the menu.', href: 'games/menu.html?unit=restaurant' },
          { zh: '点菜算一算', py: 'diǎn cài suàn yi suàn', en: 'Order & Add Up', note: 'See (or hear) what friends want, type it into the order machine, and add up the bill.', href: 'games/pay.html?unit=restaurant' },
          { zh: '餐厅对话框', py: 'cān tīng duì huà kuàng', en: 'Restaurant Chat', note: 'Fill in the chat between the server and the customer.', href: 'games/dine.html?unit=restaurant' }
        ] },
      { id: 'police', zh: '公安局', py: 'gōng ān jú', en: 'Police Station', x: 1752, y: 540, color: 'sea',
        games: [
          { zh: '找家人', py: 'zhǎo jiā rén', en: 'Find My Family', note: 'A lost kid is looking for a family member. Find the right person!', href: 'games/seek.html?unit=police' },
          { zh: '失物招领', py: 'shī wù zhāo lǐng', en: 'Lost and Found', note: 'A kid lost something. Find it in the lost-and-found box!', href: 'games/lostfound.html?unit=police' },
          { zh: '在哪里？', py: 'zài nǎ lǐ', en: 'Where Is It?', note: 'A lost kid asks the way. Tap the place and answer!', href: 'games/where.html?unit=police' }
        ] },
      { id: 'post-office', zh: '邮政局', py: 'yóu zhèng jú', en: 'Post Office', x: 1920, y: 510, color: 'me',
        games: [
          { zh: '送信', py: 'sòng xìn', en: 'Mail Delivery', note: 'Read where the letter goes. Tap the right place on the map!', href: 'games/post.html?unit=community' },
          { zh: '邮局柜台', py: 'yóu jú guì tái', en: 'Post Office Counter', note: 'Count the letters and stamps. Drag the number and the color into the sentence.', href: 'games/counter.html?unit=community' },
          { zh: '快手分信', py: 'kuài shǒu fēn xìn', en: 'Quick Mail Sort', note: 'Letters are falling! Tap the mailbox with the right color word.', href: 'games/sort.html?unit=community' }
        ] },
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
    zh: '史老师的节日岛', py: 'shǐ lǎo shī de jié rì dǎo', en: "Ms. Shih's Holiday Island", width: 1240,
    places: [
      { id: 'haunted-house', zh: '鬼屋', py: 'guǐ wū', en: 'Haunted House', x: 540, y: 110, color: 'night',
        games: [
          { zh: '鬼屋窗户', py: 'guǐ wū chuāng hù', en: 'Haunted House Windows', note: 'Tap a window to open it. Answer the question about what you see.', href: 'games/windows.html?unit=halloween' },
          { zh: '我看到', py: 'wǒ kàn dào', en: 'I See', note: 'Tap a circle to see what is there. Drag the word into the sentence.', href: 'games/spy.html?unit=halloween' },
          { zh: '化妆舞会', py: 'huà zhuāng wǔ huì', en: 'Costume Party', note: 'Look at each costume. Drag each name under the right kid.', href: 'games/dressup.html?unit=halloween' },
          { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: "I'm afraid / I'm not afraid", note: 'Look at the picture. Put the word cards in order to make the sentence.', href: 'games/afraid.html?unit=halloween' }
        ] },
      { id: 'moon', zh: '中秋节', py: 'zhōng qiū jié', en: 'Moon Festival', x: 800, y: 532, color: 'sun',
        games: [
          { zh: '四格故事', py: 'sì gé gù shì', en: 'Story Panels', note: 'First put the 4 pictures in order. Then drag the words into the speech bubbles.', href: 'games/story.html?unit=moon' },
          { zh: '中秋小知识', py: 'zhōng qiū xiǎo zhī shì', en: 'Moon Festival Quiz', note: 'Read the question. Tap the right answer.', href: 'games/quiz.html?unit=moon' }
        ] },
      { id: 'cny', zh: '春节', py: 'chūn jié', en: 'Chinese New Year', x: 1030, y: 548, color: 'dad',
        games: [
          { zh: '生肖排一排', py: 'shēng xiào pái yì pái', en: 'Zodiac Line-Up', note: 'Drag the names or animals to the right place. Finish in time to get coins!', href: 'games/zodiac.html?unit=cny' },
          { zh: '你属什么？', py: 'nǐ shǔ shén me?', en: 'What Is Your Zodiac Animal?', note: 'Look at the birthday card. Answer: 我属＿＿。', href: 'games/ask.html?unit=cny' },
          { zh: '红包大放送', py: 'hóng bāo dà fàng sòng', en: 'Red Envelope Time', note: 'Your relatives come to say Happy New Year. Answer them to get red envelopes!', href: 'games/hongbao.html?unit=cny' },
          { zh: '猜灯谜', py: 'cāi dēng mí', en: 'Lantern Riddles', note: 'Read the riddle on the lantern. Tap the right animal to throw a ring!', href: 'games/riddle.html?unit=cny' },
          { zh: '年夜饭找一找', py: 'nián yè fàn zhǎo yì zhǎo', en: 'New Year Feast Hunt', note: 'Tap a circle to see what is there. Drag the word into the sentence.', href: 'games/feast.html?unit=cny' }
        ] },
      { id: 'qixi', zh: '七夕情人节', py: 'qī xī qíng rén jié', en: "Chinese Valentine's Day", x: 510, y: 578, color: 'mom', games: [
          { zh: '送爱心', py: 'sòng ài xīn', en: 'Send Hearts', note: 'Read the numbers and send hearts to your family and friends. 我爱你！情人节快乐！', href: 'games/hearts.html?unit=qixi' },
          { zh: '送礼物', py: 'sòng lǐ wù', en: 'Give a Gift', note: 'Read the gift card and find the gift. 祝你节日快乐！这是我送你的＿＿。', href: 'games/gift.html?unit=qixi' }
        ] },
      { id: 'duanwu', zh: '端午节', py: 'duān wǔ jié', en: 'Dragon Boat Festival', x: 1060, y: 52, color: 'sea', games: [
          { zh: '划龙舟', py: 'huá lóng zhōu', en: 'Dragon Boat Race', note: 'Answer the numbers to row your dragon boat. Win the race! 我爱吃粽子！', href: 'games/dragonboat.html?unit=duanwu' },
          { zh: '找龙舟', py: 'zhǎo lóng zhōu', en: 'Dragon Boat Crew', note: 'Read the colors. Put the right crew on the dragon boat and send it off!', href: 'games/findboat.html?unit=duanwu' },
          { zh: '包粽子', py: 'bāo zòng zi', en: 'Wrap the Zongzi', note: 'Match each rope to the right zongzi tag. Tie it up and count your zongzi!', href: 'games/zongzi.html?unit=duanwu' }
        ] },
      { id: 'market', zh: '感恩节', py: 'gǎn ēn jié', en: 'Thanksgiving', x: 950, y: 170, color: 'dad',
        games: [
          { zh: '快手买一买', py: 'kuài shǒu mǎi yi mǎi', en: 'Quick Shopper', note: 'Tap a falling food, then its word on the belt. Buy everything on your list!', href: 'games/shop.html?unit=thanksgiving' },
          { zh: '市场算一算', py: 'shì chǎng suàn yi suàn', en: 'Market Math', note: 'Read the food words and do the math. Pick the right answer.', href: 'games/calc.html?unit=thanksgiving' }
        ] }
    ]
  }
};
