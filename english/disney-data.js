/* =========================================================================
 *  英语启蒙 · 迪士尼世界 —— 数据文件（日常只维护这个文件）
 *
 *  字段说明：
 *    id       唯一标识
 *    emoji    小图标
 *    nameZh / nameEn    中文名 / 英文名
 *    tagZh  / tagEn     一句话标签（中 / 英）
 *    descZh / descEn   一段简介（中 / 英），给小朋友讲的小故事
 *    phraseEn / phraseZh  一句可以跟着学说的英语（中英文对照）
 *    color    卡片主题色
 *
 *  新增一个迪士尼形象/电影：往 DISNEY_DATA 数组里加一项即可。
 *  页面会自动渲染卡片、详情和"学一句"短句，无需改 disney.js。
 * ========================================================================= */

window.DISNEY_DATA = [
  {
    id: "mickey",
    emoji: "🐭",
    nameZh: "米老鼠", nameEn: "Mickey Mouse",
    tagZh: "迪士尼的招牌明星", tagEn: "Disney's flagship star",
    descZh: "米老鼠是迪士尼最出名的卡通明星，从 1928 年起就带着大家又唱又跳去冒险。",
    descEn: "Mickey Mouse is Disney's most famous star. Since 1928 he has sung, danced, and gone on adventures with us.",
    phraseEn: "Hot dog!", phraseZh: "热狗！",
    color: "#FF5C8A"
  },
  {
    id: "donald",
    emoji: "🦆",
    nameZh: "唐老鸭", nameEn: "Donald Duck",
    tagZh: "爱发小脾气的开心果", tagEn: "A grumpy but lovable duck",
    descZh: "唐老鸭说话咕咕囔囔，一着急就跺脚，可他永远是大家的好朋友。",
    descEn: "Donald Duck talks with a quack and stomps his feet when angry, but he is always a good friend.",
    phraseEn: "Aw, phooey!", phraseZh: "哎呀，真气人！",
    color: "#2BB3E0"
  },
  {
    id: "goofy",
    emoji: "🐶",
    nameZh: "高飞", nameEn: "Goofy",
    tagZh: "笨笨的开心果", tagEn: "The clumsy goofball",
    descZh: "高飞高高瘦瘦，常常摔跟头，却总是笑呵呵，让大家开心。",
    descEn: "Goofy is tall and clumsy, often tripping over, yet he always laughs and makes everyone happy.",
    phraseEn: "Gawrsh!", phraseZh: "哎呀天哪！",
    color: "#7A5CFF"
  },
  {
    id: "frozen",
    emoji: "❄️",
    nameZh: "冰雪奇缘", nameEn: "Frozen",
    tagZh: "姐妹的魔法冒险", tagEn: "A sisterly magical adventure",
    descZh: "艾莎和安娜是两姐妹，艾莎会造冰雪魔法。她们的故事告诉我们：真爱能融化一切。",
    descEn: "Elsa and Anna are sisters. Elsa makes ice and snow magic. Their story shows: true love melts everything.",
    phraseEn: "Let it go!", phraseZh: "随它去吧！",
    color: "#4FC3F7"
  },
  {
    id: "lionking",
    emoji: "🦁",
    nameZh: "狮子王", nameEn: "The Lion King",
    tagZh: "小狮子的成长故事", tagEn: "A lion cub's coming-of-age",
    descZh: "小狮子辛巴长大成为荣耀国的国王，学会了勇敢和责任。",
    descEn: "Little Simba grows up to be king of the Pride Lands, learning to be brave and responsible.",
    phraseEn: "Hakuna Matata!", phraseZh: "没问题，别担心！",
    color: "#F2A33C"
  },
  {
    id: "pooh",
    emoji: "🐻",
    nameZh: "小熊维尼", nameEn: "Winnie the Pooh",
    tagZh: "蜂蜜与最好的朋友", tagEn: "Honey and best friends",
    descZh: "维尼小熊最爱吃蜂蜜，和跳跳虎、小猪一起在百亩森林里玩耍。",
    descEn: "Winnie the Pooh loves honey and plays in the Hundred Acre Wood with Tigger and Piglet.",
    phraseEn: "Oh, bother!", phraseZh: "哎呀，真麻烦！",
    color: "#E0922B"
  },
  {
    id: "toystory",
    emoji: "🤠",
    nameZh: "玩具总动员", nameEn: "Toy Story",
    tagZh: "玩具们的秘密生活", tagEn: "Toys' secret life",
    descZh: "当小朋友不在，牛仔胡迪和太空人巴斯光年就会活过来去冒险。",
    descEn: "When the kid is away, cowboy Woody and space ranger Buzz come alive for adventures.",
    phraseEn: "To infinity and beyond!", phraseZh: "飞向宇宙，永无止境！",
    color: "#E8543F"
  },
  {
    id: "nemo",
    emoji: "🐠",
    nameZh: "海底总动员", nameEn: "Finding Nemo",
    tagZh: "爸爸的海洋大搜寻", tagEn: "A dad's ocean quest",
    descZh: "小丑鱼尼莫走丢了，爸爸马林穿过整片大海把他找回来。",
    descEn: "Little clownfish Nemo is lost, so dad Marlin crosses the whole ocean to bring him home.",
    phraseEn: "Just keep swimming!", phraseZh: "一直游下去！",
    color: "#19B5A6"
  },
  {
    id: "beauty",
    emoji: "🌹",
    nameZh: "美女与野兽", nameEn: "Beauty and the Beast",
    tagZh: "真爱打破诅咒", tagEn: "True love breaks the curse",
    descZh: "贝儿用善良和勇气爱上一只野兽，真爱让他变回王子。",
    descEn: "Belle's kindness and courage help a beast, and true love turns him back into a prince.",
    phraseEn: "Tale as old as time.", phraseZh: "古老如时光的故事。",
    color: "#B56BD6"
  },
  {
    id: "disneyland",
    emoji: "🏰",
    nameZh: "迪士尼乐园", nameEn: "Disneyland",
    tagZh: "梦想成真的地方", tagEn: "Where dreams come true",
    descZh: "迪士尼乐园有城堡、烟花和游行，每个孩子都能当一回小公主或小英雄。",
    descEn: "Disneyland has castles, fireworks, and parades — every child can be a little prince or hero.",
    phraseEn: "When you wish upon a star.", phraseZh: "当你向星星许愿。",
    color: "#F2B705"
  }
];
