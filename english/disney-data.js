/* =========================================================================
 *  英语启蒙 · 迪士尼世界 —— 数据文件（日常只维护这个文件）
 *
 *  结构：window.DISNEY_DATA = { eras:[...], films:[...] }
 *    eras  年代分组（按时间先后排列）：经典时代 / 过渡时期 / 文艺复兴 / 现代CG / 皮克斯
 *    films 每部动画（按年份升序）：
 *      id, era(对应 eras.id), year, emoji
 *      titleZh / titleEn    中文名 / 英文名
 *      descZh  / descEn     一句话简介（中 / 英）
 *      characters[]         该动画的关键角色（每部 ≥2 个）
 *        nameZh / nameEn    角色中英文名
 *        emoji
 *        roleZh  / roleEn   角色身份（中 / 英）
 *        phraseEn / phraseZh  一句可以跟着学说的英语（中英文对照）
 *
 *  规则：
 *    - 动画与角色分离：films 是「动画」，characters 是「角色」，不再混在一起。
 *    - 每部动画至少 2 个关键角色。
 *    - 已尽量覆盖迪士尼动画工作室主要长片 + 皮克斯主要作品，按时间线排列。
 *  新增：往对应 era 的 films 里加一项即可；新增角色往 characters 里加。
 *  页面会自动按年代分组、支持搜索与筛选，无需改 disney.js。
 * ========================================================================= */

window.DISNEY_DATA = {
  eras: [
    { id: "classic",     nameZh: "经典时代", nameEn: "Classic Era",     range: "1937–1967" },
    { id: "bronze",      nameZh: "过渡时期", nameEn: "Bronze Age",      range: "1970–1988" },
    { id: "renaissance", nameZh: "文艺复兴", nameEn: "Renaissance",     range: "1989–1999" },
    { id: "modern",      nameZh: "现代 CG",  nameEn: "Modern CGI",      range: "2000–" },
    { id: "pixar",       nameZh: "皮克斯",   nameEn: "Pixar",           range: "1995–" }
  ],

  films: [
    /* ===================== 经典时代 Classic Era ===================== */
    { id:"snow-white", era:"classic", year:1937, emoji:"🍎",
      titleZh:"白雪公主", titleEn:"Snow White and the Seven Dwarfs",
      descZh:"善良的公主被坏皇后嫉妒，逃进森林遇见七个小矮人。",
      descEn:"A kind princess, envied by an evil queen, flees to the forest and meets seven dwarfs.",
      characters:[
        { nameZh:"白雪公主", nameEn:"Snow White", emoji:"👸", roleZh:"善良的公主", roleEn:"The kind princess", phraseEn:"Someday my prince will come.", phraseZh:"总有一天我的王子会到来。" },
        { nameZh:"邪恶皇后", nameEn:"Evil Queen", emoji:"👑", roleZh:"嫉妒的坏皇后", roleEn:"The jealous queen", phraseEn:"Mirror, mirror on the wall…", phraseZh:"魔镜魔镜，墙上谁最漂亮……" }
      ] },
    { id:"pinocchio", era:"classic", year:1940, emoji:"🪄",
      titleZh:"木偶奇遇记", titleEn:"Pinocchio",
      descZh:"老木匠做的木偶想变成真正的男孩，开启奇妙旅程。",
      descEn:"A wooden puppet made by a kind old man wants to become a real boy.",
      characters:[
        { nameZh:"匹诺曹", nameEn:"Pinocchio", emoji:"🤥", roleZh:"想长大的木偶", roleEn:"The wooden puppet", phraseEn:"I want to be a real boy!", phraseZh:"我想变成一个真正的男孩！" },
        { nameZh:"蟋蟀", nameEn:"Jiminy Cricket", emoji:"🦗", roleZh:"良心小老师", roleEn:"The conscience guide", phraseEn:"Let your conscience be your guide.", phraseZh:"让良心做你的向导。" }
      ] },
    { id:"fantasia", era:"classic", year:1940, emoji:"🎼",
      titleZh:"幻想曲", titleEn:"Fantasia",
      descZh:"音乐与动画结合的魔法大片，米老鼠当起了魔法学徒。",
      descEn:"A magical mix of music and animation; Mickey becomes the Sorcerer's apprentice.",
      characters:[
        { nameZh:"米老鼠", nameEn:"Mickey Mouse", emoji:"🐭", roleZh:"魔法学徒", roleEn:"The apprentice", phraseEn:"Abra-cadabra!", phraseZh:"阿布拉卡达布拉！" },
        { nameZh:"魔法师", nameEn:"Yen Sid", emoji:"🧙", roleZh:"厉害的魔法师", roleEn:"The powerful sorcerer", phraseEn:"Magic flows from my hands.", phraseZh:"魔法从我的手中流出。" }
      ] },
    { id:"dumbo", era:"classic", year:1941, emoji:"🐘",
      titleZh:"小飞象", titleEn:"Dumbo",
      descZh:"大耳朵的小象学会用耳朵飞翔，找到自信。",
      descEn:"A big-eared little elephant learns to fly with his ears and finds confidence.",
      characters:[
        { nameZh:"小飞象", nameEn:"Dumbo", emoji:"🐘", roleZh:"大耳朵的小象", roleEn:"The big-eared elephant", phraseEn:"I can fly!", phraseZh:"我会飞啦！" },
        { nameZh:"提摩西", nameEn:"Timothy Mouse", emoji:"🐭", roleZh:"鼓励他的小鼠", roleEn:"The encouraging mouse", phraseEn:"Believe in yourself!", phraseZh:"要相信你自己！" }
      ] },
    { id:"bambi", era:"classic", year:1942, emoji:"🦌",
      titleZh:"小鹿斑比", titleEn:"Bambi",
      descZh:"小鹿斑比在森林里长大，认识了许多好朋友。",
      descEn:"Little Bambi grows up in the forest and makes many friends.",
      characters:[
        { nameZh:"斑比", nameEn:"Bambi", emoji:"🦌", roleZh:"森林里的小鹿", roleEn:"The young deer", phraseEn:"Bird! Flower! Butterfly!", phraseZh:"小鸟！小花！蝴蝶！" },
        { nameZh:"桑普", nameEn:"Thumper", emoji:"🐰", roleZh:"爱蹦跳的兔子", roleEn:"The thumping rabbit", phraseEn:"If you can't say something nice, don't say nothing at all.", phraseZh:"说不出好话，就什么也别说。" }
      ] },
    { id:"cinderella", era:"classic", year:1950, emoji:"👠",
      titleZh:"仙履奇缘", titleEn:"Cinderella",
      descZh:"受欺负的小女孩在仙女帮助下参加舞会，遇见王子。",
      descEn:"A mistreated girl, helped by a fairy, goes to the ball and meets a prince.",
      characters:[
        { nameZh:"仙杜瑞拉", nameEn:"Cinderella", emoji:"👸", roleZh:"善良的灰姑娘", roleEn:"The kind girl", phraseEn:"A dream is a wish your heart makes.", phraseZh:"梦想是心底许下的愿望。" },
        { nameZh:"仙女教母", nameEn:"Fairy Godmother", emoji:"🧚", roleZh:"会变魔法的教母", roleEn:"The magic godmother", phraseEn:"Bibbidi-bobbidi-boo!", phraseZh:"比卜提，波卜提，布！" }
      ] },
    { id:"alice", era:"classic", year:1951, emoji:"🐰",
      titleZh:"爱丽丝梦游仙境", titleEn:"Alice in Wonderland",
      descZh:"女孩爱丽丝掉进兔子洞，遇见一堆古怪朋友。",
      descEn:"Alice falls down a rabbit hole and meets a host of odd friends.",
      characters:[
        { nameZh:"爱丽丝", nameEn:"Alice", emoji:"👧", roleZh:"好奇的女孩", roleEn:"The curious girl", phraseEn:"Curiouser and curiouser!", phraseZh:"越来越好奇了！" },
        { nameZh:"柴郡猫", nameEn:"Cheshire Cat", emoji:"🐱", roleZh:"会笑的猫", roleEn:"The grinning cat", phraseEn:"We're all mad here.", phraseZh:"我们这儿都疯疯的。" }
      ] },
    { id:"peter-pan", era:"classic", year:1953, emoji:"🪶",
      titleZh:"小飞侠", titleEn:"Peter Pan",
      descZh:"永远不长大的男孩带孩子们飞到梦幻岛冒险。",
      descEn:"A boy who never grows up takes kids to adventure on Never Land.",
      characters:[
        { nameZh:"彼得潘", nameEn:"Peter Pan", emoji:"🧒", roleZh:"不愿长大的男孩", roleEn:"The boy who won't grow up", phraseEn:"I can fly!", phraseZh:"我会飞！" },
        { nameZh:"小叮当", nameEn:"Tinker Bell", emoji:"🧚", roleZh:"会发光的小仙子", roleEn:"The glowing fairy", phraseEn:"I believe in fairies!", phraseZh:"我相信有仙女！" }
      ] },
    { id:"lady-tramp", era:"classic", year:1955, emoji:"🐾",
      titleZh:"小姐与流浪汉", titleEn:"Lady and the Tramp",
      descZh:"乖巧的家犬小姐爱上自由的流浪狗。",
      descEn:"A proper house dog falls for a free-spirited stray.",
      characters:[
        { nameZh:"小姐", nameEn:"Lady", emoji:"🐕", roleZh:"乖巧的家犬", roleEn:"The ladylike dog", phraseEn:"A lady's best friend!", phraseZh:"淑女最好的朋友！" },
        { nameZh:"流浪汉", nameEn:"Tramp", emoji:"🐺", roleZh:"自由的流浪狗", roleEn:"The free stray", phraseEn:"Bella Notte!", phraseZh:"美好的夜晚！" }
      ] },
    { id:"sleeping-beauty", era:"classic", year:1959, emoji:"💤",
      titleZh:"睡美人", titleEn:"Sleeping Beauty",
      descZh:"被诅咒的公主沉睡，直到真爱之吻唤醒她。",
      descEn:"A cursed princess sleeps until true love's kiss wakes her.",
      characters:[
        { nameZh:"奥罗拉", nameEn:"Aurora", emoji:"👸", roleZh:"沉睡的公主", roleEn:"The sleeping princess", phraseEn:"Once upon a dream…", phraseZh:"在梦中，曾有一次……" },
        { nameZh:"玛琳菲森", nameEn:"Maleficent", emoji:"🐉", roleZh:"邪恶的女巫", roleEn:"The evil witch", phraseEn:"I am Maleficent!", phraseZh:"我是玛琳菲森！" }
      ] },
    { id:"dalmatians", era:"classic", year:1961, emoji:"🐶",
      titleZh:"101忠狗", titleEn:"One Hundred and One Dalmatians",
      descZh:"斑点狗爸妈救回被坏女人抓走的一百只小狗。",
      descEn:"Dalmatian parents rescue a hundred puppies stolen by a cruel woman.",
      characters:[
        { nameZh:"庞哥", nameEn:"Pongo", emoji:"🐕", roleZh:"聪明的狗爸爸", roleEn:"The clever dad dog", phraseEn:"Woof! Follow the trail!", phraseZh:"汪！跟着线索走！" },
        { nameZh:"库伊拉", nameEn:"Cruella", emoji:"💃", roleZh:"想要皮毛的坏女人", roleEn:"The fur-obsessed villain", phraseEn:"My spotted darlings!", phraseZh:"我可爱的斑点宝贝们！" }
      ] },
    { id:"sword-stone", era:"classic", year:1963, emoji:"🗡️",
      titleZh:"石中剑", titleEn:"The Sword in the Stone",
      descZh:"小男孩亚瑟拔出石头里的剑，成为未来的国王。",
      descEn:"Boy Arthur pulls a sword from a stone and becomes the future king.",
      characters:[
        { nameZh:"亚瑟", nameEn:"Arthur (Wart)", emoji:"🧒", roleZh:"未来的国王", roleEn:"The future king", phraseEn:"I will be king!", phraseZh:"我会成为国王！" },
        { nameZh:"梅林", nameEn:"Merlin", emoji:"🧙", roleZh:"博学的魔法师", roleEn:"The wise wizard", phraseEn:"Education is the key!", phraseZh:"教育是关键！" }
      ] },
    { id:"jungle-book", era:"classic", year:1967, emoji:"🐻",
      titleZh:"森林王子", titleEn:"The Jungle Book",
      descZh:"狼孩毛克利在森林动物陪伴下学习成长。",
      descEn:"Wolf-boy Mowgli grows up among friendly jungle animals.",
      characters:[
        { nameZh:"毛克利", nameEn:"Mowgli", emoji:"🧒", roleZh:"森林里的男孩", roleEn:"The boy of the jungle", phraseEn:"The bare necessities!", phraseZh:"最基本的需要！" },
        { nameZh:"巴鲁", nameEn:"Baloo", emoji:"🐻", roleZh:"懒洋洋的熊", roleEn:"The easygoing bear", phraseEn:"Look for the bare necessities.", phraseZh:"去寻最基本的需要。" }
      ] },

    /* ===================== 过渡时期 Bronze Age ===================== */
    { id:"aristocats", era:"bronze", year:1970, emoji:"🐱",
      titleZh:"猫儿历险记", titleEn:"The Aristocats",
      descZh:"富裕的猫妈妈和孩子们踏上回巴黎的冒险。",
      descEn:"A wealthy cat mother and her kittens adventure back to Paris.",
      characters:[
        { nameZh:"杜翠丝", nameEn:"Duchess", emoji:"🐱", roleZh:"优雅的猫妈妈", roleEn:"The elegant cat mom", phraseEn:"Aristocrats!", phraseZh:"贵族猫！" },
        { nameZh:"托马斯", nameEn:"Thomas O'Malley", emoji:"🐈", roleZh:"潇洒的流浪猫", roleEn:"The charming stray", phraseEn:"Everybody wants to be a cat.", phraseZh:"谁都想当只猫。" }
      ] },
    { id:"robin-hood", era:"bronze", year:1973, emoji:"🏹",
      titleZh:"罗宾汉", titleEn:"Robin Hood",
      descZh:"狐狸罗宾汉劫富济贫，帮助穷人。",
      descEn:"Fox Robin Hood steals from the rich to help the poor.",
      characters:[
        { nameZh:"罗宾汉", nameEn:"Robin Hood", emoji:"🦊", roleZh:"劫富济贫的英雄", roleEn:"The generous hero", phraseEn:"Tally-ho!", phraseZh:"嗬喂！" },
        { nameZh:"小约翰", nameEn:"Little John", emoji:"🐻", roleZh:"忠厚的伙伴", roleEn:"The loyal friend", phraseEn:"Long live the king!", phraseZh:"国王万岁！" }
      ] },
    { id:"pooh", era:"bronze", year:1977, emoji:"🍯",
      titleZh:"小熊维尼历险记", titleEn:"The Many Adventures of Winnie the Pooh",
      descZh:"维尼和小伙伴在百亩森林里玩耍。",
      descEn:"Pooh and friends play in the Hundred Acre Wood.",
      characters:[
        { nameZh:"小熊维尼", nameEn:"Winnie the Pooh", emoji:"🐻", roleZh:"爱吃蜂蜜的熊", roleEn:"The honey-loving bear", phraseEn:"Oh, bother!", phraseZh:"哎呀，真麻烦！" },
        { nameZh:"跳跳虎", nameEn:"Tigger", emoji:"🐯", roleZh:"爱蹦跳的老虎", roleEn:"The bouncy tiger", phraseEn:"Tiggers bounce!", phraseZh:"跳跳虎就爱蹦！" }
      ] },
    { id:"rescuers", era:"bronze", year:1977, emoji:"🐭",
      titleZh:"救难小英雄", titleEn:"The Rescuers",
      descZh:"老鼠搭档去营救被困的小女孩。",
      descEn:"Two mouse agents rescue a kidnapped little girl.",
      characters:[
        { nameZh:"伯纳德", nameEn:"Bernard", emoji:"🐭", roleZh:"害羞的救援鼠", roleEn:"The shy rescuer", phraseEn:"Courage!", phraseZh:"勇敢点！" },
        { nameZh:"比安卡", nameEn:"Bianca", emoji:"🐭", roleZh:"优雅的女特工", roleEn:"The elegant agent", phraseEn:"We'll rescue her!", phraseZh:"我们会救出她！" }
      ] },
    { id:"fox-hound", era:"bronze", year:1981, emoji:"🦊",
      titleZh:"狐狸与猎狗", titleEn:"The Fox and the Hound",
      descZh:"一只狐狸和一只猎狗的跨物种友谊。",
      descEn:"An unlikely friendship between a fox and a hunting dog.",
      characters:[
        { nameZh:"托德", nameEn:"Tod", emoji:"🦊", roleZh:"活泼的小狐狸", roleEn:"The lively fox", phraseEn:"Best friends!", phraseZh:"最好的朋友！" },
        { nameZh:"小铜", nameEn:"Copper", emoji:"🐶", roleZh:"忠诚的猎狗", roleEn:"The loyal hound", phraseEn:"Forever friends.", phraseZh:"永远的朋友。" }
      ] },
    { id:"great-mouse-detective", era:"bronze", year:1986, emoji:"🔍",
      titleZh:"妙妙探", titleEn:"The Great Mouse Detective",
      descZh:"老鼠神探破案，救出被绑架的发明家。",
      descEn:"A mouse detective solves a case and saves a kidnapped inventor.",
      characters:[
        { nameZh:"巴兹尔", nameEn:"Basil", emoji:"🐭", roleZh:"聪明的老鼠侦探", roleEn:"The clever mouse detective", phraseEn:"The game is afoot!", phraseZh:"游戏开始了！" },
        { nameZh:"道森", nameEn:"Dr. Dawson", emoji:"🐭", roleZh:"可靠的助手", roleEn:"The loyal assistant", phraseEn:"Elementary!", phraseZh:"显而易见！" }
      ] },
    { id:"oliver-company", era:"bronze", year:1988, emoji:"🐈",
      titleZh:"奥丽华历险记", titleEn:"Oliver & Company",
      descZh:"流浪小猫加入狗狗帮，在纽约闯荡。",
      descEn:"A stray kitten joins a dog gang and adventures in New York.",
      characters:[
        { nameZh:"奥利华", nameEn:"Oliver", emoji:"🐈", roleZh:"孤单的小猫", roleEn:"The lonely kitten", phraseEn:"Why should I worry?", phraseZh:"我有什么好担心的？" },
        { nameZh:"道奇", nameEn:"Dodger", emoji:"🐕", roleZh:"机灵的狗老大", roleEn:"The street-smart dog", phraseEn:"Why should I care?", phraseZh:"我有什么好在乎的？" }
      ] },

    /* ===================== 文艺复兴 Renaissance ===================== */
    { id:"little-mermaid", era:"renaissance", year:1989, emoji:"🧜",
      titleZh:"小美人鱼", titleEn:"The Little Mermaid",
      descZh:"小美人鱼爱丽儿想上岸看看人类世界。",
      descEn:"Little mermaid Ariel longs to see the human world above.",
      characters:[
        { nameZh:"爱丽儿", nameEn:"Ariel", emoji:"🧜", roleZh:"好奇的人鱼公主", roleEn:"The curious mermaid", phraseEn:"Part of your world!", phraseZh:"属于你的世界！" },
        { nameZh:"塞巴斯丁", nameEn:"Sebastian", emoji:"🦀", roleZh:"操心的螃蟹大臣", roleEn:"The worried crab", phraseEn:"Under the sea!", phraseZh:"在海底！" }
      ] },
    { id:"beauty-beast", era:"renaissance", year:1991, emoji:"🌹",
      titleZh:"美女与野兽", titleEn:"Beauty and the Beast",
      descZh:"善良的贝儿用爱融化了被诅咒的野兽。",
      descEn:"Kind Belle melts a cursed Beast with her love.",
      characters:[
        { nameZh:"贝儿", nameEn:"Belle", emoji:"👩", roleZh:"爱读书的姑娘", roleEn:"The book-loving girl", phraseEn:"Tale as old as time.", phraseZh:"古老如时光的故事。" },
        { nameZh:"野兽", nameEn:"Beast", emoji:"🐺", roleZh:"被诅咒的王子", roleEn:"The cursed prince", phraseEn:"Who could ever love a beast?", phraseZh:"谁会爱上野兽呢？" }
      ] },
    { id:"aladdin", era:"renaissance", year:1992, emoji:"🕌",
      titleZh:"阿拉丁", titleEn:"Aladdin",
      descZh:"穷小子阿拉丁借助神灯实现愿望、赢得公主。",
      descEn:"Poor Aladdin uses a magic lamp to win a princess.",
      characters:[
        { nameZh:"阿拉丁", nameEn:"Aladdin", emoji:"🧒", roleZh:"善良的穷小子", roleEn:"The kind street boy", phraseEn:"Genie, I wish for…", phraseZh:"精灵，我希望……" },
        { nameZh:"精灵", nameEn:"Genie", emoji:"🔵", roleZh:"搞笑的蓝色精灵", roleEn:"The funny blue genie", phraseEn:"You ain't never had a friend like me!", phraseZh:"你从没见过像我这样的朋友！" }
      ] },
    { id:"lion-king", era:"renaissance", year:1994, emoji:"🦁",
      titleZh:"狮子王", titleEn:"The Lion King",
      descZh:"小狮子辛巴长大成为荣耀国的国王。",
      descEn:"Little Simba grows up to be king of the Pride Lands.",
      characters:[
        { nameZh:"辛巴", nameEn:"Simba", emoji:"🦁", roleZh:"未来的狮王", roleEn:"The future lion king", phraseEn:"Hakuna Matata!", phraseZh:"没问题，别担心！" },
        { nameZh:"彭彭", nameEn:"Pumbaa", emoji:"🐗", roleZh:"乐天的疣猪", roleEn:"The cheerful warthog", phraseEn:"Hakuna Matata!", phraseZh:"没问题，别担心！" }
      ] },
    { id:"pocahontas", era:"renaissance", year:1995, emoji:"🍃",
      titleZh:"风中奇缘", titleEn:"Pocahontas",
      descZh:"印第安公主宝嘉康蒂化解两族误会。",
      descEn:"Native princess Pocahontas bridges two peoples.",
      characters:[
        { nameZh:"宝嘉康蒂", nameEn:"Pocahontas", emoji:"🍃", roleZh:"勇敢的公主", roleEn:"The brave princess", phraseEn:"Colors of the wind.", phraseZh:"风的颜色。" },
        { nameZh:"约翰史密斯", nameEn:"John Smith", emoji:"🧔", roleZh:"远来的探险家", roleEn:"The arriving explorer", phraseEn:"I'm John Smith.", phraseZh:"我是约翰·史密斯。" }
      ] },
    { id:"hunchback", era:"renaissance", year:1996, emoji:"⛪",
      titleZh:"钟楼怪人", titleEn:"The Hunchback of Notre Dame",
      descZh:"敲钟人卡西莫多渴望外面的世界。",
      descEn:"Bell-ringer Quasimodo longs for the world outside.",
      characters:[
        { nameZh:"卡西莫多", nameEn:"Quasimodo", emoji:"🔔", roleZh:"善良的敲钟人", roleEn:"The kind bell-ringer", phraseEn:"Out there!", phraseZh:"外面的世界！" },
        { nameZh:"爱丝梅拉达", nameEn:"Esmeralda", emoji:"💃", roleZh:"勇敢的吉普赛女郎", roleEn:"The brave gypsy", phraseEn:"Sanctuary!", phraseZh:"庇护所！" }
      ] },
    { id:"hercules", era:"renaissance", year:1997, emoji:"💪",
      titleZh:"大力士", titleEn:"Hercules",
      descZh:"半人半神的赫拉克勒斯想成为真正的英雄。",
      descEn:"Half-god Hercules wants to become a true hero.",
      characters:[
        { nameZh:"赫拉克勒斯", nameEn:"Hercules", emoji:"💪", roleZh:"大力小英雄", roleEn:"The mighty hero", phraseEn:"I can go the distance!", phraseZh:"我能坚持到底！" },
        { nameZh:"梅格", nameEn:"Meg", emoji:"💇", roleZh:"嘴硬心软的姑娘", roleEn:"The tough-but-soft girl", phraseEn:"I'm a damsel in distress!", phraseZh:"我是需要救援的姑娘！" }
      ] },
    { id:"mulan", era:"renaissance", year:1998, emoji:"🌸",
      titleZh:"花木兰", titleEn:"Mulan",
      descZh:"女孩花木兰代父从军，展现勇气。",
      descEn:"Girl Mulan takes her father's place in the army with courage.",
      characters:[
        { nameZh:"花木兰", nameEn:"Mulan", emoji:"🌸", roleZh:"勇敢的姑娘", roleEn:"The brave girl", phraseEn:"Reflection… who is that girl?", phraseZh:"倒影里……那个女孩是谁？" },
        { nameZh:"木须", nameEn:"Mushu", emoji:"🐉", roleZh:"话痨小龙", roleEn:"The chatty little dragon", phraseEn:"Dishonor on your whole family!", phraseZh:"你们全家都蒙羞！" }
      ] },
    { id:"tarzan", era:"renaissance", year:1999, emoji:"🌴",
      titleZh:"泰山", titleEn:"Tarzan",
      descZh:"被猩猩养大的人孩泰山寻找自己的来历。",
      descEn:"Tarzan, raised by gorillas, seeks his own origin.",
      characters:[
        { nameZh:"泰山", nameEn:"Tarzan", emoji:"🐵", roleZh:"森林里的男人", roleEn:"The lord of the jungle", phraseEn:"Me Tarzan, you Jane.", phraseZh:"我是泰山，你是简。" },
        { nameZh:"简", nameEn:"Jane", emoji:"👩", roleZh:"爱动物的女孩", roleEn:"The animal-loving girl", phraseEn:"Two worlds, one family.", phraseZh:"两个世界，一个家庭。" }
      ] },

    /* ===================== 现代 CG Modern ===================== */
    { id:"emperors-groove", era:"modern", year:2000, emoji:"👑",
      titleZh:"变身国王", titleEn:"The Emperor's New Groove",
      descZh:"自大的小王子被变成骆驼，踏上回家路。",
      descEn:"A selfish prince is turned into a llama and journeys home.",
      characters:[
        { nameZh:"库斯柯", nameEn:"Kuzco", emoji:"👑", roleZh:"自大的小王子", roleEn:"The spoilt prince", phraseEn:"Boom, baby!", phraseZh:"砰，宝贝！" },
        { nameZh:"帕查", nameEn:"Pacha", emoji:"🧑", roleZh:"善良的村民", roleEn:"The kind villager", phraseEn:"Patience, Kuzco.", phraseZh:"耐心点，库斯柯。" }
      ] },
    { id:"atlantis", era:"modern", year:2001, emoji:"🌊",
      titleZh:"亚特兰蒂斯", titleEn:"Atlantis: The Lost Empire",
      descZh:"少年米尔寻找传说中沉没的亚特兰蒂斯。",
      descEn:"Young Milo seeks the lost city of Atlantis.",
      characters:[
        { nameZh:"米尔", nameEn:"Milo", emoji:"🧑", roleZh:"爱读书的少年", roleEn:"The bookish boy", phraseEn:"I found Atlantis!", phraseZh:"我找到亚特兰蒂斯了！" },
        { nameZh:"基达", nameEn:"Kida", emoji:"👸", roleZh:"亚特兰蒂斯公主", roleEn:"The Atlantean princess", phraseEn:"The crystal glows.", phraseZh:"水晶在发光。" }
      ] },
    { id:"dinosaur", era:"modern", year:2000, emoji:"🦕",
      titleZh:"恐龙", titleEn:"Dinosaur",
      descZh:"小恐龙阿拉达被狐猴养大，寻找新家园。",
      descEn:"Dinosaur Aladar, raised by lemurs, seeks a new home.",
      characters:[
        { nameZh:"阿拉达", nameEn:"Aladar", emoji:"🦕", roleZh:"善良的禽龙", roleEn:"The kind iguanodon", phraseEn:"We survive together!", phraseZh:"我们一起活下去！" },
        { nameZh:"克朗", nameEn:"Kron", emoji:"🦖", roleZh:"严厉的领头恐龙", roleEn:"The strict leader", phraseEn:"Follow me or fall behind!", phraseZh:"跟上我，否则掉队！" }
      ] },
    { id:"lilo-stitch", era:"modern", year:2002, emoji:"👽",
      titleZh:"星际宝贝", titleEn:"Lilo & Stitch",
      descZh:"夏威夷女孩莉罗领养了一只外星小怪物。",
      descEn:"Hawaiian girl Lilo adopts a little alien creature.",
      characters:[
        { nameZh:"莉罗", nameEn:"Lilo", emoji:"👧", roleZh:"夏威夷小女孩", roleEn:"The Hawaiian girl", phraseEn:"Ohana means family.", phraseZh:"Ohana 就是家人。" },
        { nameZh:"史迪奇", nameEn:"Stitch", emoji:"👽", roleZh:"蓝色外星小怪", roleEn:"The blue alien", phraseEn:"Ohana means nobody gets left behind!", phraseZh:"Ohana 就是谁也不落下！" }
      ] },
    { id:"treasure-planet", era:"modern", year:2002, emoji:"🗺️",
      titleZh:"星银岛", titleEn:"Treasure Planet",
      descZh:"少年吉姆跟随海盗寻找太空宝藏。",
      descEn:"Boy Jim sails with pirates to find space treasure.",
      characters:[
        { nameZh:"吉姆", nameEn:"Jim", emoji:"🧑", roleZh:"爱冒险的少年", roleEn:"The adventurous boy", phraseEn:"Aroo?", phraseZh:"嗷呜？" },
        { nameZh:"银船长", nameEn:"John Silver", emoji:"🦾", roleZh:"亦正亦邪的厨师", roleEn:"The tricky cook", phraseEn:"A pirate's life!", phraseZh:"海盗的生活！" }
      ] },
    { id:"brother-bear", era:"modern", year:2003, emoji:"🐻",
      titleZh:"熊的传说", titleEn:"Brother Bear",
      descZh:"少年变成熊，学会用熊的眼睛看世界。",
      descEn:"A boy turned into a bear learns to see the world as one.",
      characters:[
        { nameZh:"肯尼", nameEn:"Kenai", emoji:"🧒", roleZh:"变成熊的少年", roleEn:"The boy turned bear", phraseEn:"Love knows no bounds.", phraseZh:"爱没有边界。" },
        { nameZh:"科达", nameEn:"Koda", emoji:"🐻", roleZh:"爱说话的小熊", roleEn:"The chatty cub", phraseEn:"My brother!", phraseZh:"我的兄弟！" }
      ] },
    { id:"chicken-little", era:"modern", year:2005, emoji:"🐤",
      titleZh:"鸡仔总动员", titleEn:"Chicken Little",
      descZh:"小鸡坚信天塌了，努力证明自己。",
      descEn:"Chicken Little is sure the sky is falling and tries to prove it.",
      characters:[
        { nameZh:"小鸡", nameEn:"Chicken Little", emoji:"🐤", roleZh:"总被嘲笑的小鸡", roleEn:"The laughed-at chicken", phraseEn:"The sky is falling!", phraseZh:"天塌下来啦！" },
        { nameZh:"艾比", nameEn:"Abby", emoji:"🐥", roleZh:"聪明的女同学", roleEn:"The smart girl", phraseEn:"Don't panic!", phraseZh:"别慌！" }
      ] },
    { id:"meet-robinsons", era:"modern", year:2007, emoji:"🚀",
      titleZh:"未来小子", titleEn:"Meet the Robinsons",
      descZh:"孤儿刘易斯坐时光机见到未来的自己。",
      descEn:"Orphan Lewis travels by time machine to meet his future.",
      characters:[
        { nameZh:"刘易斯", nameEn:"Lewis", emoji:"🧒", roleZh:"爱发明的孤儿", roleEn:"The inventing orphan", phraseEn:"Keep moving forward!", phraseZh:"一直向前走！" },
        { nameZh:"威尔伯", nameEn:"Wilbur", emoji:"🚀", roleZh:"来自未来的男孩", roleEn:"The boy from the future", phraseEn:"Live in the future!", phraseZh:"活在未来！" }
      ] },
    { id:"bolt", era:"modern", year:2008, emoji:"⚡",
      titleZh:"闪电狗", titleEn:"Bolt",
      descZh:"电视明星狗以为自己真有超能力，踏上回家路。",
      descEn:"TV-star dog Bolt thinks he has superpowers and journeys home.",
      characters:[
        { nameZh:"波特", nameEn:"Bolt", emoji:"🐕", roleZh:"以为会超能力的狗", roleEn:"The super-dog", phraseEn:"Super Bolt!", phraseZh:"超级波特！" },
        { nameZh:"米滕斯", nameEn:"Mittens", emoji:"🐈", roleZh:"街头聪明的猫", roleEn:"The street-wise cat", phraseEn:"I'm just a cat.", phraseZh:"我只是只猫。" }
      ] },
    { id:"princess-frog", era:"modern", year:2009, emoji:"🐸",
      titleZh:"公主与青蛙", titleEn:"The Princess and the Frog",
      descZh:"蒂安娜亲了青蛙王子，自己变成青蛙。",
      descEn:"Tiana kisses a frog prince and turns into a frog too.",
      characters:[
        { nameZh:"蒂安娜", nameEn:"Tiana", emoji:"🐸", roleZh:"勤劳的女孩", roleEn:"The hardworking girl", phraseEn:"Dig a little deeper.", phraseZh:"再挖深一点。" },
        { nameZh:"纳温", nameEn:"Naveen", emoji:"🤴", roleZh:"变青蛙的王子", roleEn:"The frog prince", phraseEn:"Bonjour, mademoiselle!", phraseZh:"你好，小姐！" }
      ] },
    { id:"tangled", era:"modern", year:2010, emoji:"💇",
      titleZh:"长发公主", titleEn:"Tangled",
      descZh:"长发公主逃离高塔，去看天上的灯。",
      descEn:"Rapunzel escapes her tower to see the floating lights.",
      characters:[
        { nameZh:"乐佩", nameEn:"Rapunzel", emoji:"💇", roleZh:"长发姑娘", roleEn:"The long-haired girl", phraseEn:"I see the light.", phraseZh:"我看见了光。" },
        { nameZh:"弗林", nameEn:"Flynn", emoji:"🤴", roleZh:"帅气的盗贼", roleEn:"The charming thief", phraseEn:"Best day ever!", phraseZh:"最棒的一天！" }
      ] },
    { id:"winnie-pooh-2011", era:"modern", year:2011, emoji:"🍯",
      titleZh:"小熊维尼", titleEn:"Winnie the Pooh",
      descZh:"维尼和小猪去找失踪的尾巴。",
      descEn:"Pooh and Piglet look for a missing tail.",
      characters:[
        { nameZh:"小熊维尼", nameEn:"Winnie the Pooh", emoji:"🐻", roleZh:"爱吃蜂蜜的熊", roleEn:"The honey-loving bear", phraseEn:"Oh, bother!", phraseZh:"哎呀，真麻烦！" },
        { nameZh:"小猪", nameEn:"Piglet", emoji:"🐷", roleZh:"胆小的粉红猪", roleEn:"The timid pig", phraseEn:"Oh, d-d-dear!", phraseZh:"噢，亲、亲爱的！" }
      ] },
    { id:"wreck-ralph", era:"modern", year:2012, emoji:"🕹️",
      titleZh:"无敌破坏王", titleEn:"Wreck-It Ralph",
      descZh:"游戏里的坏蛋想当英雄，闯进别的游戏。",
      descEn:"A game villain wants to be a hero and crashes other games.",
      characters:[
        { nameZh:"拉尔夫", nameEn:"Ralph", emoji:"🧱", roleZh:"想做好人的坏蛋", roleEn:"The want-to-be-good villain", phraseEn:"I'm bad, and that's good!", phraseZh:"我是坏人，这也不错！" },
        { nameZh:"云妮洛普", nameEn:"Vanellope", emoji:"🍬", roleZh:"甜甜的赛车女孩", roleEn:"The candy racer", phraseEn:"I'm a racer!", phraseZh:"我是赛车手！" }
      ] },
    { id:"frozen", oscar:true, era:"modern", year:2013, emoji:"❄️",
      titleZh:"冰雪奇缘", titleEn:"Frozen",
      descZh:"艾莎的魔法冰封王国，妹妹安娜来拯救。",
      descEn:"Elsa's magic freezes the kingdom; sister Anna saves it.",
      characters:[
        { nameZh:"艾莎", nameEn:"Elsa", emoji:"👸", roleZh:"冰雪女王", roleEn:"The Snow Queen", phraseEn:"Let it go!", phraseZh:"随它去吧！" },
        { nameZh:"安娜", nameEn:"Anna", emoji:"🧕", roleZh:"勇敢的妹妹", roleEn:"The brave sister", phraseEn:"Do you want to build a snowman?", phraseZh:"你想堆个雪人吗？" }
      ] },
    { id:"big-hero-6", oscar:true, era:"modern", year:2014, emoji:"🤖",
      titleZh:"超能陆战队", titleEn:"Big Hero 6",
      descZh:"少年宏和充气机器人贝max组成英雄团队。",
      descEn:"Boy Hiro and inflatable robot Baymax form a hero team.",
      characters:[
        { nameZh:"小宏", nameEn:"Hiro", emoji:"🧒", roleZh:"天才少年", roleEn:"The genius boy", phraseEn:"We got this!", phraseZh:"我们能行！" },
        { nameZh:"贝max", nameEn:"Baymax", emoji:"🤖", roleZh:"软软的医疗机器人", roleEn:"The soft healthcare robot", phraseEn:"Hello, I am Baymax, your personal healthcare companion.", phraseZh:"你好，我是贝max，你的私人健康伙伴。" }
      ] },
    { id:"zootopia", oscar:true, era:"modern", year:2016, emoji:"🦊",
      titleZh:"疯狂动物城", titleEn:"Zootopia",
      descZh:"兔子警官朱迪和狐狸尼克联手破案。",
      descEn:"Rabbit officer Judy and fox Nick solve a case together.",
      characters:[
        { nameZh:"朱迪", nameEn:"Judy Hopps", emoji:"🐰", roleZh:"努力的兔子警官", roleEn:"The hardworking rabbit cop", phraseEn:"Anyone can be anything!", phraseZh:"谁都能成为任何样子！" },
        { nameZh:"尼克", nameEn:"Nick Wilde", emoji:"🦊", roleZh:"机灵的狐狸", roleEn:"The sly fox", phraseEn:"Sly as a fox.", phraseZh:"像狐狸一样狡猾。" }
      ] },
    { id:"moana", era:"modern", year:2016, emoji:"🌊",
      titleZh:"海洋奇缘", titleEn:"Moana",
      descZh:"少女莫阿娜出海，帮半神毛伊归还心。",
      descEn:"Girl Moana sails to help demigod Maui return the heart.",
      characters:[
        { nameZh:"莫阿娜", nameEn:"Moana", emoji:"🌺", roleZh:"航海的少女", roleEn:"The voyaging girl", phraseEn:"I am Moana!", phraseZh:"我是莫阿娜！" },
        { nameZh:"毛伊", nameEn:"Maui", emoji:"🪝", roleZh:"自大的半神", roleEn:"The boastful demigod", phraseEn:"You're welcome!", phraseZh:"不用谢！" }
      ] },
    { id:"ralph-breaks-internet", era:"modern", year:2018, emoji:"🌐",
      titleZh:"破坏王大闹互联网", titleEn:"Ralph Breaks the Internet",
      descZh:"拉尔夫和云妮洛普闯进网络世界。",
      descEn:"Ralph and Vanellope crash into the internet world.",
      characters:[
        { nameZh:"拉尔夫", nameEn:"Ralph", emoji:"🧱", roleZh:"想陪朋友的坏蛋", roleEn:"The friend-wanting villain", phraseEn:"How's it going?", phraseZh:"最近咋样？" },
        { nameZh:"云妮洛普", nameEn:"Vanellope", emoji:"🍬", roleZh:"爱赛车的女孩", roleEn:"The racing girl", phraseEn:"Race ready!", phraseZh:"准备好比赛！" }
      ] },
    { id:"frozen-2", era:"modern", year:2019, emoji:"🍂",
      titleZh:"冰雪奇缘2", titleEn:"Frozen II",
      descZh:"艾莎和安娜前往魔法森林寻找真相。",
      descEn:"Elsa and Anna journey to an enchanted forest for the truth.",
      characters:[
        { nameZh:"艾莎", nameEn:"Elsa", emoji:"👸", roleZh:"追寻真相的女王", roleEn:"The truth-seeking queen", phraseEn:"Into the unknown!", phraseZh:"冲向未知！" },
        { nameZh:"安娜", nameEn:"Anna", emoji:"🧕", roleZh:"不离不弃的妹妹", roleEn:"The loyal sister", phraseEn:"All is found.", phraseZh:"一切都会被找到。" }
      ] },
    { id:"raya", era:"modern", year:2021, emoji:"🐉",
      titleZh:"寻龙传说", titleEn:"Raya and the Last Dragon",
      descZh:"战士蕾雅与最后一条龙寻找团圆之水。",
      descEn:"Warrior Raya and the last dragon seek the water of unity.",
      characters:[
        { nameZh:"蕾雅", nameEn:"Raya", emoji:"🗡️", roleZh:"勇敢的战士", roleEn:"The brave warrior", phraseEn:"Trust.", phraseZh:"信任。" },
        { nameZh:"希苏", nameEn:"Sisu", emoji:"🐉", roleZh:"最后的水龙", roleEn:"The last water dragon", phraseEn:"I'm the last dragon!", phraseZh:"我是最后的龙！" }
      ] },
    { id:"encanto", oscar:true, era:"modern", year:2021, emoji:"🏠",
      titleZh:"魔法满屋", titleEn:"Encanto",
      descZh:"米拉贝家每个人有魔法，只有她没有。",
      descEn:"In Mirabel's family everyone has magic — except her.",
      characters:[
        { nameZh:"米拉贝", nameEn:"Mirabel", emoji:"🏠", roleZh:"没有魔法的女孩", roleEn:"The magic-less girl", phraseEn:"The miracle is you!", phraseZh:"奇迹就是你！" },
        { nameZh:"布鲁诺", nameEn:"Bruno", emoji:"🔮", roleZh:"会预知的叔叔", roleEn:"The vision uncle", phraseEn:"We don't talk about Bruno.", phraseZh:"我们不要提布鲁诺。" }
      ] },
    { id:"strange-world", era:"modern", year:2022, emoji:"🌿",
      titleZh:"奇异世界", titleEn:"Strange World",
      descZh:"一家三代探险家深入神秘大地。",
      descEn:"Three generations of explorers dive into a mysterious land.",
      characters:[
        { nameZh:"伊森", nameEn:"Ethan", emoji:"🧒", roleZh:"爱冒险的少年", roleEn:"The adventurous boy", phraseEn:"Adventure!", phraseZh:"冒险！" },
        { nameZh:"辛切尔", nameEn:"Searcher", emoji:"🧔", roleZh:"保护家人的父亲", roleEn:"The protective father", phraseEn:"Family first.", phraseZh:"家人第一。" }
      ] },
    { id:"wish", era:"modern", year:2023, emoji:"⭐",
      titleZh:"星愿", titleEn:"Wish",
      descZh:"少女阿莎向星星许愿，唤醒大家的梦想。",
      descEn:"Girl Asha wishes upon a star and awakens everyone's dreams.",
      characters:[
        { nameZh:"阿莎", nameEn:"Asha", emoji:"⭐", roleZh:"许愿的少女", roleEn:"The wishing girl", phraseEn:"At the start of something new.", phraseZh:"全新开始的地方。" },
        { nameZh:"星星", nameEn:"Star", emoji:"🌟", roleZh:"会魔法的星星", roleEn:"The magic star", phraseEn:"Make a wish!", phraseZh:"许个愿吧！" }
      ] },

    /* ===================== 皮克斯 Pixar ===================== */
    { id:"toy-story", era:"pixar", year:1995, emoji:"🤠",
      titleZh:"玩具总动员", titleEn:"Toy Story",
      descZh:"当小孩不在，玩具们就活了过来。",
      descEn:"When the kid is away, the toys come alive.",
      characters:[
        { nameZh:"胡迪", nameEn:"Woody", emoji:"🤠", roleZh:"忠诚的牛仔", roleEn:"The loyal cowboy", phraseEn:"You've got a friend in me.", phraseZh:"我永远是你的朋友。" },
        { nameZh:"巴斯光年", nameEn:"Buzz Lightyear", emoji:"🚀", roleZh:"太空人战士", roleEn:"The space ranger", phraseEn:"To infinity and beyond!", phraseZh:"飞向宇宙，永无止境！" }
      ] },
    { id:"bugs-life", era:"pixar", year:1998, emoji:"🐜",
      titleZh:"虫虫危机", titleEn:"A Bug's Life",
      descZh:"小蚂蚁弗利克找来虫虫马戏团对抗蝗虫。",
      descEn:"Ant Flik hires circus bugs to fight the grasshoppers.",
      characters:[
        { nameZh:"弗利克", nameEn:"Flik", emoji:"🐜", roleZh:"爱发明的小蚂蚁", roleEn:"The inventing ant", phraseEn:"I can do it!", phraseZh:"我能做到！" },
        { nameZh:"霍珀", nameEn:"Hopper", emoji:"🦗", roleZh:"欺压蚂蚁的蝗虫", roleEn:"The bullying grasshopper", phraseEn:"Ants, follow me!", phraseZh:"蚂蚁们，跟我来！" }
      ] },
    { id:"toy-story-2", era:"pixar", year:1999, emoji:"🤠",
      titleZh:"玩具总动员2", titleEn:"Toy Story 2",
      descZh:"胡迪被发现是古董，面临离开还是留下。",
      descEn:"Woody is found to be an antique, torn between leaving and staying.",
      characters:[
        { nameZh:"胡迪", nameEn:"Woody", emoji:"🤠", roleZh:"被珍藏的牛仔", roleEn:"The treasured cowboy", phraseEn:"You've got a friend in me.", phraseZh:"我永远是你的朋友。" },
        { nameZh:"翠丝", nameEn:"Jessie", emoji:"🤠", roleZh:"开朗的牛仔女孩", roleEn:"The cheerful cowgirl", phraseEn:"Yee-haw!", phraseZh:"呀吼！" }
      ] },
    { id:"monsters-inc", era:"pixar", year:2001, emoji:"👾",
      titleZh:"怪兽电力公司", titleEn:"Monsters, Inc.",
      descZh:"怪兽用小孩的尖叫发电，却爱上了一个小女孩。",
      descEn:"Monsters power their city with screams, but love a little girl.",
      characters:[
        { nameZh:"苏利", nameEn:"Sulley", emoji:"👾", roleZh:"毛茸茸的大怪兽", roleEn:"The furry monster", phraseEn:"Boo!", phraseZh:"布！" },
        { nameZh:"麦克", nameEn:"Mike", emoji:"👁️", roleZh:"独眼小怪兽", roleEn:"The one-eyed monster", phraseEn:"Mike Wazowski!", phraseZh:"麦克·华斯基！" }
      ] },
    { id:"finding-nemo", oscar:true, era:"pixar", year:2003, emoji:"🐠",
      titleZh:"海底总动员", titleEn:"Finding Nemo",
      descZh:"爸爸马林穿越海洋找回走丢的儿子尼莫。",
      descEn:"Dad Marlin crosses the ocean to find lost son Nemo.",
      characters:[
        { nameZh:"尼莫", nameEn:"Nemo", emoji:"🐠", roleZh:"走丢的小丑鱼", roleEn:"The lost clownfish", phraseEn:"Just keep swimming!", phraseZh:"一直游下去！" },
        { nameZh:"多莉", nameEn:"Dory", emoji:"🔵", roleZh:"健忘的蓝鱼", roleEn:"The forgetful blue fish", phraseEn:"Just keep swimming!", phraseZh:"一直游下去！" }
      ] },
    { id:"incredibles", oscar:true, era:"pixar", year:2004, emoji:"🦸",
      titleZh:"超人总动员", titleEn:"The Incredibles",
      descZh:"退休的超人一家重新出击打坏蛋。",
      descEn:"A retired superhero family springs back into action.",
      characters:[
        { nameZh:"超能先生", nameEn:"Mr. Incredible", emoji:"🦸", roleZh:"力大无穷的爸爸", roleEn:"The super-strong dad", phraseEn:"Pow!", phraseZh:"砰！" },
        { nameZh:"弹力女超人", nameEn:"Elastigirl", emoji:"🦸", roleZh:"会伸缩的妈妈", roleEn:"The stretchy mom", phraseEn:"Stretch!", phraseZh:"伸长！" }
      ] },
    { id:"cars", era:"pixar", year:2006, emoji:"🏎️",
      titleZh:"汽车总动员", titleEn:"Cars",
      descZh:"赛车闪电麦坤在小镇学会什么是真正重要的事。",
      descEn:"Racer Lightning McQueen learns what truly matters in a small town.",
      characters:[
        { nameZh:"闪电麦坤", nameEn:"Lightning McQueen", emoji:"🏎️", roleZh:"骄傲的赛车", roleEn:"The proud racer", phraseEn:"Kachow!", phraseZh:"咔嚓！" },
        { nameZh:"板牙", nameEn:"Mater", emoji:"🚚", roleZh:"憨厚的拖车", roleEn:"The simple tow truck", phraseEn:"Git-r-done!", phraseZh:"包在我身上！" }
      ] },
    { id:"ratatouille", oscar:true, era:"pixar", year:2007, emoji:"🐀",
      titleZh:"美食总动员", titleEn:"Ratatouille",
      descZh:"小老鼠雷米梦想当大厨。",
      descEn:"Rat Remy dreams of being a great chef.",
      characters:[
        { nameZh:"雷米", nameEn:"Remy", emoji:"🐀", roleZh:"爱料理的老鼠", roleEn:"The cooking rat", phraseEn:"Anyone can cook!", phraseZh:"谁都能下厨！" },
        { nameZh:"林奎尼", nameEn:"Linguini", emoji:"🍝", roleZh:"笨手笨脚的人类", roleEn:"The clumsy human", phraseEn:"Le food!", phraseZh:"美食！" }
      ] },
    { id:"wall-e", oscar:true, era:"pixar", year:2008, emoji:"🤖",
      titleZh:"机器人总动员", titleEn:"WALL-E",
      descZh:"清理地球的机器人瓦力爱上探测机器人伊芙。",
      descEn:"Trash-robot WALL-E falls for probe-robot EVE.",
      characters:[
        { nameZh:"瓦力", nameEn:"WALL-E", emoji:"🤖", roleZh:"捡垃圾的小机器人", roleEn:"The little trash robot", phraseEn:"Eve.", phraseZh:"伊芙。" },
        { nameZh:"伊芙", nameEn:"EVE", emoji:"🛸", roleZh:"白色探测机器人", roleEn:"The white probe robot", phraseEn:"WALL-E.", phraseZh:"瓦力。" }
      ] },
    { id:"up", oscar:true, era:"pixar", year:2009, emoji:"🎈",
      titleZh:"飞屋环游记", titleEn:"Up",
      descZh:"老卡尔用气球带屋飞向瀑布，带上小男孩小罗。",
      descEn:"Old Carl flies his house to a waterfall with boy Russell.",
      characters:[
        { nameZh:"卡尔", nameEn:"Carl", emoji:"🎈", roleZh:"倔强的老爷爷", roleEn:"The stubborn old man", phraseEn:"Adventure is out there!", phraseZh:"冒险就在远方！" },
        { nameZh:"小罗", nameEn:"Russell", emoji:"🧒", roleZh:"戴勋章的男孩", roleEn:"The badge boy", phraseEn:"Crossing the wilderness!", phraseZh:"穿越荒野！" }
      ] },
    { id:"toy-story-3", oscar:true, era:"pixar", year:2010, emoji:"🤠",
      titleZh:"玩具总动员3", titleEn:"Toy Story 3",
      descZh:"主人长大，玩具们面临被丢掉的命运。",
      descEn:"The owner grows up; the toys face being thrown away.",
      characters:[
        { nameZh:"胡迪", nameEn:"Woody", emoji:"🤠", roleZh:"守护大家的牛仔", roleEn:"The protecting cowboy", phraseEn:"You've got a friend in me.", phraseZh:"我永远是你的朋友。" },
        { nameZh:"巴斯光年", nameEn:"Buzz Lightyear", emoji:"🚀", roleZh:"永远的太空人", roleEn:"The ever space ranger", phraseEn:"To infinity and beyond!", phraseZh:"飞向宇宙，永无止境！" }
      ] },
    { id:"brave", oscar:true, era:"pixar", year:2012, emoji:"🏹",
      titleZh:"勇敢传说", titleEn:"Brave",
      descZh:"公主梅莉达想决定自己的命运。",
      descEn:"Princess Merida wants to choose her own fate.",
      characters:[
        { nameZh:"梅莉达", nameEn:"Merida", emoji:"🏹", roleZh:"爱射箭的公主", roleEn:"The archer princess", phraseEn:"I am Merida!", phraseZh:"我是梅莉达！" },
        { nameZh:"艾莉诺王后", nameEn:"Queen Elinor", emoji:"👑", roleZh:"严格的母亲", roleEn:"The strict mother", phraseEn:"A princess must be...", phraseZh:"公主应当……" }
      ] },
    { id:"monsters-u", era:"pixar", year:2013, emoji:"👾",
      titleZh:"怪兽大学", titleEn:"Monsters University",
      descZh:"苏利和麦克在大学里成为朋友。",
      descEn:"Sulley and Mike become friends at university.",
      characters:[
        { nameZh:"苏利", nameEn:"Sulley", emoji:"👾", roleZh:"大块头怪兽", roleEn:"The big monster", phraseEn:"Boo!", phraseZh:"布！" },
        { nameZh:"麦克", nameEn:"Mike", emoji:"👁️", roleZh:"聪明的小怪兽", roleEn:"The smart monster", phraseEn:"Mike Wazowski!", phraseZh:"麦克·华斯基！" }
      ] },
    { id:"inside-out", oscar:true, era:"pixar", year:2015, emoji:"🎭",
      titleZh:"头脑特工队", titleEn:"Inside Out",
      descZh:"大脑里的五种情绪管理小女孩莱莉。",
      descEn:"Five emotions run inside girl Riley's head.",
      characters:[
        { nameZh:"乐乐", nameEn:"Joy", emoji:"😄", roleZh:"开心的小人", roleEn:"The happy one", phraseEn:"I'm Joy!", phraseZh:"我是乐乐！" },
        { nameZh:"忧忧", nameEn:"Sadness", emoji:"😢", roleZh:"爱哭的小人", roleEn:"The crying one", phraseEn:"Crying helps.", phraseZh:"哭出来会好受。" }
      ] },
    { id:"inside-out-2", era:"pixar", year:2024, oscar:true, emoji:"🎭",
      titleZh:"头脑特工队2", titleEn:"Inside Out 2",
      descZh:"少女莱莉进入青春期，大脑里住进了新的情绪。",
      descEn:"Teen Riley hits puberty; new emotions move into her head.",
      characters:[
        { nameZh:"乐乐", nameEn:"Joy", emoji:"😄", roleZh:"开心的小人", roleEn:"The happy one", phraseEn:"I'm Joy!", phraseZh:"我是乐乐！" },
        { nameZh:"焦焦", nameEn:"Anxiety", emoji:"😰", roleZh:"新来的焦虑", roleEn:"The new anxiety", phraseEn:"We must be prepared!", phraseZh:"我们必须准备好！" }
      ] },
    { id:"coco", oscar:true, era:"pixar", year:2017, emoji:"🎸",
      titleZh:"寻梦环游记", titleEn:"Coco",
      descZh:"男孩米格在亡灵节找回家族记忆。",
      descEn:"Boy Miguel找回 family memory on the Day of the Dead.",
      characters:[
        { nameZh:"米格", nameEn:"Miguel", emoji:"🎸", roleZh:"爱音乐的男孩", roleEn:"The music-loving boy", phraseEn:"Remember me.", phraseZh:"请记得我。" },
        { nameZh:"埃克托", nameEn:"Héctor", emoji:"💀", roleZh:"想念家人的灵魂", roleEn:"The remembering soul", phraseEn:"Remember me.", phraseZh:"请记得我。" }
      ] },
    { id:"toy-story-4", oscar:true, era:"pixar", year:2019, emoji:"🤠",
      titleZh:"玩具总动员4", titleEn:"Toy Story 4",
      descZh:"胡迪遇见自认是玩具的叉叉，重新思考意义。",
      descEn:"Woody meets Forky, a spork who thinks he's trash.",
      characters:[
        { nameZh:"胡迪", nameEn:"Woody", emoji:"🤠", roleZh:"不愿放手的牛仔", roleEn:"The reluctant cowboy", phraseEn:"You've got a friend in me.", phraseZh:"我永远是你的朋友。" },
        { nameZh:"叉叉", nameEn:"Forky", emoji:"🍴", roleZh:"以为自己是垃圾的玩具", roleEn:"The spork who's trash", phraseEn:"I'm trash!", phraseZh:"我是垃圾！" }
      ] },
    { id:"onward", era:"pixar", year:2020, emoji:"🧝",
      titleZh:"二分之一的魔法", titleEn:"Onward",
      descZh:"两兄弟踏上魔法旅程想见爸爸。",
      descEn:"Two brothers quest by magic to see their dad.",
      characters:[
        { nameZh:"伊恩", nameEn:"Ian", emoji:"🧝", roleZh:"害羞的弟弟", roleEn:"The shy younger brother", phraseEn:"I can do magic!", phraseZh:"我会魔法！" },
        { nameZh:"巴力", nameEn:"Barley", emoji:"🧝", roleZh:"爱冒险的哥哥", roleEn:"The adventuring older brother", phraseEn:"Quest time!", phraseZh:"出发探险！" }
      ] },
    { id:"soul", oscar:true, era:"pixar", year:2020, emoji:"🎷",
      titleZh:"心灵奇旅", titleEn:"Soul",
      descZh:"音乐老师乔坠入灵魂世界，找回生活的火花。",
      descEn:"Music teacher Joe falls into the soul world to find his spark.",
      characters:[
        { nameZh:"乔", nameEn:"Joe", emoji:"🎷", roleZh:"爱爵士的老师", roleEn:"The jazz-loving teacher", phraseEn:"My spark!", phraseZh:"我的火花！" },
        { nameZh:"22号", nameEn:"22", emoji:"🌀", roleZh:"不想投胎的灵魂", roleEn:"The reluctant soul", phraseEn:"I found my spark.", phraseZh:"我找到了火花。" }
      ] },
    { id:"luca", era:"pixar", year:2021, emoji:"🌊",
      titleZh:"路卡", titleEn:"Luca",
      descZh:"海怪男孩路卡在小镇度过夏天。",
      descEn:"Sea-monster boy Luca spends a summer on land.",
      characters:[
        { nameZh:"路卡", nameEn:"Luca", emoji:"🌊", roleZh:"好奇的海怪", roleEn:"The curious sea monster", phraseEn:"Silenzio, Bruno!", phraseZh:"闭嘴吧，布鲁诺！" },
        { nameZh:"阿尔贝托", nameEn:"Alberto", emoji:"🐟", roleZh:"海边的小伙伴", roleEn:"The seaside friend", phraseEn:"Pasta!", phraseZh:"意大利面！" }
      ] },
    { id:"turning-red", era:"pixar", year:2022, emoji:"🐼",
      titleZh:"青春变身记", titleEn:"Turning Red",
      descZh:"少女美美一激动就变成小熊猫。",
      descEn:"Teen Mei turns into a red panda when excited.",
      characters:[
        { nameZh:"美美", nameEn:"Mei", emoji:"🐼", roleZh:"13岁的女孩", roleEn:"The 13-year-old girl", phraseEn:"Turning red!", phraseZh:"变身红熊猫！" },
        { nameZh:"明", nameEn:"Ming", emoji:"👩", roleZh:"严格的妈妈", roleEn:"The strict mom", phraseEn:"My baby!", phraseZh:"我的宝贝！" }
      ] },
    { id:"elemental", era:"pixar", year:2023, emoji:"🔥",
      titleZh:"疯狂元素城", titleEn:"Elemental",
      descZh:"火女孩和水男孩在元素城相爱。",
      descEn:"A fire girl and a water boy fall in love in Elemental City.",
      characters:[
        { nameZh:"爱波", nameEn:"Ember", emoji:"🔥", roleZh:"火之家的女孩", roleEn:"The fire girl", phraseEn:"I'm on fire!", phraseZh:"我在燃烧！" },
        { nameZh:"韦德", nameEn:"Wade", emoji:"💧", roleZh:"水之家的男孩", roleEn:"The water boy", phraseEn:"Go with the flow.", phraseZh:"随遇而安。" }
      ] }
  ]
};
