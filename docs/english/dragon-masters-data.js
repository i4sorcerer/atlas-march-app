/* =========================================================================
 *  Dragon Masters · Book 1, Chapter 1
 *  Story facts follow "Rise of the Earth Dragon" Chapter 1: To the Castle.
 *  The retelling and learning activities are original educational material.
 * ========================================================================= */

window.DRAGON_MASTERS = {
  series: {
    titleEn: "Dragon Masters",
    titleZh: "驯龙大师",
    author: "Tracey West"
  },
  book: {
    number: 1,
    titleEn: "Rise of the Earth Dragon",
    titleZh: "第一册 · 地龙的崛起"
  },
  chapter: {
    number: 1,
    titleEn: "To the Castle",
    titleZh: "前往城堡",
    pages: "1–7",
    readingTime: "3 min",
    introEn:
      "A quiet morning in the onion field turns into a journey Drake never expected.",
    introZh: "洋葱田里一个平常的早晨，变成了德雷克从未想过的旅程。"
  },
  scenes: [
    {
      id: "scene-onion-field",
      number: 1,
      artKey: "onion-field",
      placeEn: "The Onion Field",
      placeZh: "洋葱田",
      titleEn: "A Morning Surprise",
      titleZh: "清晨的意外",
      textEn: [
        "Drake lived with his family on a small farm. They grew onions, and Drake helped in the onion field.",
        "One morning, while he was pulling onions from the ground, a soldier rode up on a horse. The soldier said he came from King Roland. The king had chosen Drake, and Drake had to go with him at once.",
        "Drake was shocked. He could hardly believe that the king had sent for him."
      ],
      textZh: [
        "德雷克和家人住在一座小农场里。家里种洋葱，他常到洋葱田里帮忙。",
        "一天早上，他正弯腰从地里拔洋葱，一名士兵骑马来到田边。士兵说，自己是罗兰国王派来的。国王选中了德雷克，德雷克必须马上跟他走。",
        "德雷克惊呆了。他简直不敢相信，国王竟然会派人来找他。"
      ],
      clues: [
        { en: "Setting: onion field", zh: "地点：洋葱田" },
        { en: "Key person: a soldier", zh: "关键人物：一名士兵" },
        { en: "King Roland chose Drake", zh: "罗兰国王选中了德雷克" }
      ],
      hotspots: [
        { id: "hs-onion", x: 27, y: 72, icon: "🧅", labelEn: "Onion field", labelZh: "洋葱田", archiveId: "onion-farm" },
        { id: "hs-soldier", x: 75, y: 38, icon: "🛡️", labelEn: "The soldier", labelZh: "士兵", archiveId: "soldier" },
        { id: "hs-horse", x: 72, y: 58, icon: "🐎", labelEn: "The horse", labelZh: "马", archiveId: "horse" }
      ]
    },
    {
      id: "scene-horse-ride",
      number: 2,
      artKey: "castle-road",
      placeEn: "The Road to the Castle",
      placeZh: "前往城堡的路",
      titleEn: "A First Horse Ride",
      titleZh: "第一次骑马",
      textEn: [
        "Drake had never ridden a horse before. The soldier took him away from the farm and toward King Roland's castle.",
        "They rode and rode. At last, a great castle rose before them. Drake had never been anywhere like it."
      ],
      textZh: [
        "德雷克以前从没骑过马。士兵带着他离开农场，朝罗兰国王的城堡走去。",
        "他们骑了很久很久。终于，一座高大的城堡出现在眼前。德雷克从没去过这样的地方。"
      ],
      clues: [
        { en: "Drake's first horse ride", zh: "德雷克第一次骑马" },
        { en: "Destination: King Roland's castle", zh: "目的地：罗兰国王的城堡" }
      ],
      hotspots: [
        { id: "hs-horse-road", x: 34, y: 62, icon: "🐎", labelEn: "First horse ride", labelZh: "第一次骑马", archiveId: "horse" },
        { id: "hs-castle", x: 77, y: 33, icon: "🏰", labelEn: "King Roland's castle", labelZh: "罗兰国王的城堡", archiveId: "kings-castle" }
      ]
    },
    {
      id: "scene-stone-door",
      number: 3,
      artKey: "castle-hall",
      placeEn: "Inside the Castle",
      placeZh: "城堡内部",
      titleEn: "The Stone Door",
      titleZh: "石门",
      textEn: [
        "Inside, the soldier led Drake through the castle. Drake saw paintings and statues of dragons. He had never seen such strange and wonderful things.",
        "At last, they stopped in front of a huge stone door. Drake was scared. He was curious, too. What could be waiting on the other side?"
      ],
      textZh: [
        "进入城堡后，士兵带着德雷克穿过一条条走廊。德雷克看见了龙的画像和雕像。他从没见过这么奇妙又陌生的东西。",
        "最后，他们在一扇巨大的石门前停下。德雷克很害怕，也很好奇。门后面会是什么呢？"
      ],
      clues: [
        { en: "Dragon paintings and statues", zh: "龙的画像和雕像" },
        { en: "Feeling: scared and curious", zh: "心情：害怕又好奇" }
      ],
      hotspots: [
        { id: "hs-dragon-art", x: 37, y: 32, icon: "🖼️", labelEn: "Dragon paintings and statues", labelZh: "龙的画像和雕像", archiveId: "dragon-art" },
        { id: "hs-stone-door", x: 78, y: 47, icon: "🚪", labelEn: "The huge stone door", labelZh: "巨大的石门", archiveId: "stone-door" }
      ]
    },
    {
      id: "scene-red-dragon",
      number: 4,
      artKey: "dragon-chamber",
      interaction: "door",
      placeEn: "Behind the Stone Door",
      placeZh: "石门之后",
      titleEn: "A Red Dragon!",
      titleZh: "红龙！",
      textEn: [
        "Drake opened the door and looked inside. A giant red dragon stood before him.",
        "Before Drake could move, the dragon opened its mouth. A ball of fire shot out. Chapter 1 ends there."
      ],
      textZh: [
        "德雷克打开门，朝里面望去。一条巨大的红龙就在他面前。",
        "德雷克还没来得及动，红龙就张开了嘴。一团火球喷了出来。第一章到这里结束。"
      ],
      clues: [
        { en: "Dragon color: red", zh: "龙的颜色：红色" },
        { en: "Dragon action: fireball", zh: "红龙的动作：喷火球" }
      ],
      hotspots: [
        { id: "hs-red-dragon", x: 63, y: 39, icon: "🐉", labelEn: "A giant red dragon", labelZh: "巨大的红龙", archiveId: "red-dragon", revealOnDoor: true },
        { id: "hs-fireball", x: 49, y: 55, icon: "🔥", labelEn: "A ball of fire", labelZh: "火球", archiveId: "fireball", revealOnDoor: true },
        { id: "hs-chamber", x: 77, y: 67, icon: "🕳️", labelEn: "The chamber", labelZh: "石门后的空间", archiveId: "dragon-chamber", revealOnDoor: true }
      ]
    }
  ],
  archive: [
    {
      id: "drake",
      type: "person",
      emoji: "🧑‍🌾",
      nameEn: "Drake",
      nameZh: "德雷克",
      roleEn: "Onion farmer's child · chosen by the king",
      roleZh: "洋葱农家的孩子 · 被国王选中",
      statusEn: "Main character",
      statusZh: "主角",
      summaryEn: "A child from a small onion farm whose ordinary morning is interrupted by a royal summons.",
      summaryZh: "一个住在小洋葱农场里的孩子，平常的早晨被国王的命令打断。",
      factsEn: [
        "Lives with his family on a small farm.",
        "Works in the onion field.",
        "Has never ridden a horse before this chapter.",
        "Is shocked when King Roland sends for him.",
        "Feels scared and curious at the stone door.",
        "Opens the door and sees a giant red dragon."
      ],
      factsZh: [
        "和家人住在一座小农场里。",
        "在洋葱田里帮忙。",
        "在本章之前从没骑过马。",
        "国王派人来找他时非常吃惊。",
        "站在石门前时又害怕又好奇。",
        "打开石门后看见了巨大的红龙。"
      ],
      firstSceneId: "scene-onion-field",
      connections: ["king-roland", "soldier", "onion-farm", "horse", "stone-door", "red-dragon"]
    },
    {
      id: "king-roland",
      type: "person",
      emoji: "👑",
      nameEn: "King Roland",
      nameZh: "罗兰国王",
      roleEn: "The king who summons Drake",
      roleZh: "召唤德雷克的国王",
      statusEn: "Mentioned only",
      statusZh: "本章只被提到",
      summaryEn: "The king at the center of the summons. In Chapter 1, he is named but does not appear in person.",
      summaryZh: "这次召唤背后的国王。第一章只提到了他的名字，他本人没有出场。",
      factsEn: [
        "The soldier says he comes from King Roland.",
        "The king has chosen Drake.",
        "Drake is ordered to go to the king's castle at once.",
        "King Roland does not appear on the page in Chapter 1."
      ],
      factsZh: [
        "士兵说自己是罗兰国王派来的。",
        "国王选中了德雷克。",
        "德雷克必须立刻前往国王的城堡。",
        "罗兰国王在本章中没有正面出场。"
      ],
      firstSceneId: "scene-onion-field",
      connections: ["drake", "soldier", "kings-castle"]
    },
    {
      id: "soldier",
      type: "person",
      emoji: "🛡️",
      nameEn: "The Soldier",
      nameZh: "士兵",
      roleEn: "The king's messenger and escort",
      roleZh: "国王的传令者与护送者",
      statusEn: "Seen in Chapter 1",
      statusZh: "第一章登场",
      summaryEn: "The soldier rides to the onion field, brings King Roland's command, and leads Drake into the castle.",
      summaryZh: "士兵骑马来到洋葱田，带来罗兰国王的命令，并带德雷克进入城堡。",
      factsEn: [
        "Rides up on a horse while Drake is pulling onions.",
        "Says the king has chosen Drake.",
        "Takes Drake away from the farm.",
        "Leads Drake through the castle to the stone door."
      ],
      factsZh: [
        "德雷克拔洋葱时，他骑马来到田边。",
        "他说国王选中了德雷克。",
        "带德雷克离开农场。",
        "带德雷克穿过城堡，来到石门前。"
      ],
      firstSceneId: "scene-onion-field",
      connections: ["king-roland", "drake", "horse", "kings-castle", "stone-door"]
    },
    {
      id: "red-dragon",
      type: "dragon",
      emoji: "🐉",
      nameEn: "Red Dragon",
      nameZh: "红龙",
      roleEn: "The dragon behind the stone door",
      roleZh: "石门后的红龙",
      statusEn: "Seen at the cliffhanger",
      statusZh: "章末登场",
      summaryEn: "A giant red dragon waiting behind the stone door. Its fireball ends Chapter 1 before Drake can move.",
      summaryZh: "一条等在石门后的巨大红龙。德雷克还没来得及动，它喷出的火球就让第一章戛然而止。",
      factsEn: [
        "Is huge and red.",
        "Is behind the castle's stone door.",
        "Opens its mouth before Drake can move.",
        "Shoots a ball of fire.",
        "Its deeper story is not revealed in Chapter 1."
      ],
      factsZh: [
        "体型巨大，通体红色。",
        "在城堡的石门后面。",
        "德雷克还没来得及动，它就张开了嘴。",
        "喷出一团火球。",
        "更深层的身份和故事在本章尚未揭晓。"
      ],
      firstSceneId: "scene-red-dragon",
      connections: ["dragon-chamber", "stone-door", "fireball", "drake"]
    },
    {
      id: "earth-dragon",
      type: "dragon",
      emoji: "🌿",
      nameEn: "Earth Dragon",
      nameZh: "地龙",
      roleEn: "A future dossier",
      roleZh: "未来档案",
      statusEn: "Locked · not in Chapter 1",
      statusZh: "未解锁 · 第一章未登场",
      locked: true,
      summaryEn: "The book title names an Earth Dragon, but Chapter 1 does not introduce or show this dragon.",
      summaryZh: "书名提到了地龙，但第一章没有介绍或展示这条龙。",
      factsEn: [
        "The book title is Rise of the Earth Dragon.",
        "Earth Dragon does not appear in Chapter 1.",
        "This dossier will remain locked until a later chapter provides canon details."
      ],
      factsZh: [
        "本书标题是《地龙的崛起》。",
        "地龙没有在第一章登场。",
        "在后续章节提供原书信息前，这份档案会保持锁定。"
      ],
      firstSceneId: "",
      connections: []
    },
    {
      id: "onion-farm",
      type: "place",
      emoji: "🧅",
      nameEn: "Drake's Onion Farm",
      nameZh: "德雷克的洋葱农场",
      roleEn: "Home · first scene",
      roleZh: "家 · 第一幕",
      statusEn: "Visited",
      statusZh: "已到访",
      summaryEn: "A small family farm with an onion field. It is where the king's soldier finds Drake.",
      summaryZh: "一座有小洋葱田的家庭农场，也是国王的士兵找到德雷克的地方。",
      factsEn: [
        "Drake lives there with his family.",
        "The family grows onions.",
        "Drake is working in the field when the soldier arrives."
      ],
      factsZh: [
        "德雷克和家人住在这里。",
        "家里种洋葱。",
        "士兵到来时，德雷克正在田里干活。"
      ],
      firstSceneId: "scene-onion-field",
      connections: ["drake", "soldier"]
    },
    {
      id: "kings-castle",
      type: "place",
      emoji: "🏰",
      nameEn: "King Roland's Castle",
      nameZh: "罗兰国王的城堡",
      roleEn: "Destination · dragon-filled halls",
      roleZh: "目的地 · 满是龙之痕迹的城堡",
      statusEn: "Visited",
      statusZh: "已到访",
      summaryEn: "The huge castle where the soldier takes Drake. Its halls contain paintings and statues of dragons.",
      summaryZh: "士兵带德雷克来到的巨大城堡。城堡走廊里有龙的画像和雕像。",
      factsEn: [
        "Drake has never been anywhere like it.",
        "The castle contains dragon paintings and statues.",
        "The stone door is inside the castle."
      ],
      factsZh: [
        "德雷克从没去过这样的地方。",
        "城堡里有龙的画像和雕像。",
        "石门就在城堡里面。"
      ],
      firstSceneId: "scene-horse-ride",
      connections: ["drake", "soldier", "dragon-art", "stone-door"]
    },
    {
      id: "stone-door",
      type: "place",
      emoji: "🚪",
      nameEn: "The Stone Door",
      nameZh: "石门",
      roleEn: "Threshold · chapter cliffhanger",
      roleZh: "分界线 · 章末悬念",
      statusEn: "Opened",
      statusZh: "已打开",
      summaryEn: "A huge stone door at the end of Drake's walk through the castle. What waits beyond it changes the chapter.",
      summaryZh: "德雷克穿过城堡后遇到的巨大石门。门后的东西改变了这一章。",
      factsEn: [
        "The door is huge and made of stone.",
        "Drake is scared and curious in front of it.",
        "Drake opens it.",
        "The red dragon is on the other side."
      ],
      factsZh: [
        "这是一扇巨大的石门。",
        "德雷克站在门前又害怕又好奇。",
        "德雷克打开了它。",
        "红龙就在门的另一边。"
      ],
      firstSceneId: "scene-stone-door",
      connections: ["drake", "kings-castle", "dragon-chamber", "red-dragon"]
    },
    {
      id: "dragon-chamber",
      type: "place",
      emoji: "🕳️",
      nameEn: "The Dragon Chamber",
      nameZh: "石门后的龙室",
      roleEn: "Unknown room · red dragon",
      roleZh: "未知房间 · 红龙所在",
      statusEn: "Revealed",
      statusZh: "已揭晓",
      summaryEn: "The space behind the stone door. In Chapter 1, it is known only as the place where the red dragon waits.",
      summaryZh: "石门后的空间。第一章中，读者只知道红龙等在那里。",
      factsEn: [
        "Lies behind the stone door.",
        "Contains the giant red dragon.",
        "No other details are revealed in Chapter 1."
      ],
      factsZh: [
        "位于石门后。",
        "里面有巨大的红龙。",
        "第一章没有透露更多细节。"
      ],
      firstSceneId: "scene-red-dragon",
      connections: ["stone-door", "red-dragon"]
    },
    {
      id: "horse",
      type: "clue",
      emoji: "🐎",
      nameEn: "The Horse",
      nameZh: "马",
      roleEn: "First ride · journey clue",
      roleZh: "第一次骑马 · 旅程线索",
      statusEn: "Used",
      statusZh: "已出现",
      summaryEn: "The soldier arrives on a horse, and the journey to the castle becomes Drake's first horse ride.",
      summaryZh: "士兵骑马来到农场，前往城堡的旅程也成为德雷克第一次骑马。",
      factsEn: [
        "The soldier rides up on a horse.",
        "Drake has never ridden a horse before.",
        "The horse carries them toward the castle."
      ],
      factsZh: [
        "士兵骑马来到田边。",
        "德雷克以前从没骑过马。",
        "马载着他们前往城堡。"
      ],
      firstSceneId: "scene-onion-field",
      connections: ["soldier", "drake", "kings-castle"]
    },
    {
      id: "dragon-art",
      type: "clue",
      emoji: "🖼️",
      nameEn: "Dragon Paintings & Statues",
      nameZh: "龙的画像与雕像",
      roleEn: "Castle clue · dragon warning",
      roleZh: "城堡线索 · 龙的暗示",
      statusEn: "Seen",
      statusZh: "已看见",
      summaryEn: "Dragon images fill the castle before Drake reaches the stone door. They hint that dragons are important here.",
      summaryZh: "德雷克到达石门前，城堡里已经充满龙的图像，暗示龙在这里非常重要。",
      factsEn: [
        "Drake sees paintings of dragons.",
        "Drake sees statues of dragons.",
        "He has never seen such strange and wonderful things."
      ],
      factsZh: [
        "德雷克看见了龙的画像。",
        "德雷克看见了龙的雕像。",
        "他从没见过这么奇妙又陌生的东西。"
      ],
      firstSceneId: "scene-stone-door",
      connections: ["kings-castle", "stone-door"]
    },
    {
      id: "fireball",
      type: "clue",
      emoji: "🔥",
      nameEn: "The Fireball",
      nameZh: "火球",
      roleEn: "Chapter-ending event",
      roleZh: "章末事件",
      statusEn: "Cliffhanger",
      statusZh: "悬念",
      summaryEn: "A ball of fire shoots from the red dragon's mouth before Drake can move, ending Chapter 1.",
      summaryZh: "德雷克还没来得及动，一团火球就从红龙嘴里喷出，第一章在这里结束。",
      factsEn: [
        "Comes from the red dragon's mouth.",
        "Shoots out before Drake can move.",
        "Ends Chapter 1 on a cliffhanger."
      ],
      factsZh: [
        "从红龙嘴里喷出。",
        "在德雷克来得及动之前飞出。",
        "第一章在悬念中结束。"
      ],
      firstSceneId: "scene-red-dragon",
      connections: ["red-dragon", "dragon-chamber"]
    }
  ],
  graph: {
    typeLabels: {
      person: { en: "People", zh: "人物" },
      dragon: { en: "Dragons", zh: "龙族" },
      place: { en: "Places", zh: "地点" },
      clue: { en: "Story clues", zh: "故事线索" }
    },
    nodes: [
      { id: "king-roland", x: 135, y: 105, r: 38 },
      { id: "soldier", x: 355, y: 100, r: 40 },
      { id: "drake", x: 360, y: 300, r: 52 },
      { id: "onion-farm", x: 135, y: 365, r: 42 },
      { id: "horse", x: 535, y: 175, r: 36 },
      { id: "kings-castle", x: 755, y: 115, r: 44 },
      { id: "dragon-art", x: 715, y: 295, r: 39 },
      { id: "stone-door", x: 620, y: 455, r: 42 },
      { id: "dragon-chamber", x: 790, y: 510, r: 43 },
      { id: "red-dragon", x: 890, y: 350, r: 49 },
      { id: "fireball", x: 895, y: 170, r: 35 },
      { id: "earth-dragon", x: 900, y: 40, r: 32, locked: true }
    ],
    edges: [
      { from: "king-roland", to: "soldier", labelEn: "sent", labelZh: "派出" },
      { from: "king-roland", to: "drake", labelEn: "chose", labelZh: "选中" },
      { from: "soldier", to: "drake", labelEn: "brought the order", labelZh: "带来命令" },
      { from: "soldier", to: "horse", labelEn: "rode", labelZh: "骑马" },
      { from: "drake", to: "horse", labelEn: "first ride", labelZh: "第一次骑马" },
      { from: "drake", to: "onion-farm", labelEn: "lives and works", labelZh: "生活与劳作" },
      { from: "horse", to: "kings-castle", labelEn: "carried them", labelZh: "载他们前往" },
      { from: "drake", to: "kings-castle", labelEn: "is taken to", labelZh: "被带到" },
      { from: "kings-castle", to: "dragon-art", labelEn: "contains", labelZh: "藏有" },
      { from: "kings-castle", to: "stone-door", labelEn: "contains", labelZh: "藏有" },
      { from: "drake", to: "stone-door", labelEn: "opens", labelZh: "打开" },
      { from: "stone-door", to: "dragon-chamber", labelEn: "opens to", labelZh: "通往" },
      { from: "dragon-chamber", to: "red-dragon", labelEn: "holds", labelZh: "关着" },
      { from: "red-dragon", to: "fireball", labelEn: "breathes", labelZh: "喷出" }
    ],
    tracePath: ["onion-farm", "drake", "soldier", "horse", "kings-castle", "stone-door", "dragon-chamber", "red-dragon", "fireball"]
  },
  vocabulary: [
    {
      word: "onion",
      ipa: "/ˈʌn.jən/",
      emoji: "🧅",
      meaningEn: "a round vegetable with many layers",
      meaningZh: "洋葱",
      contextEn: "Drake pulled onions from the ground.",
      contextZh: "德雷克从地里拔洋葱。"
    },
    {
      word: "soldier",
      ipa: "/ˈsoʊl.dʒɚ/",
      emoji: "🛡️",
      meaningEn: "a person who serves in an army",
      meaningZh: "士兵",
      contextEn: "A soldier rode up on a horse.",
      contextZh: "一名士兵骑马来到田边。"
    },
    {
      word: "castle",
      ipa: "/ˈkæs.əl/",
      emoji: "🏰",
      meaningEn: "a large, strong home for a king or queen",
      meaningZh: "城堡",
      contextEn: "They traveled to King Roland's castle.",
      contextZh: "他们前往罗兰国王的城堡。"
    },
    {
      word: "dragon",
      ipa: "/ˈdræɡ.ən/",
      emoji: "🐉",
      meaningEn: "a giant magical creature in the story",
      meaningZh: "龙",
      contextEn: "Drake saw paintings and statues of dragons.",
      contextZh: "德雷克看见了龙的画像和雕像。"
    },
    {
      word: "curious",
      ipa: "/ˈkjʊr.i.əs/",
      emoji: "🔎",
      meaningEn: "wanting to know or learn more",
      meaningZh: "好奇的",
      contextEn: "Drake was scared and curious at the stone door.",
      contextZh: "站在石门前，德雷克害怕又好奇。"
    },
    {
      word: "fireball",
      ipa: "/ˈfaɪr.bɔːl/",
      emoji: "🔥",
      meaningEn: "a ball of fire",
      meaningZh: "火球",
      contextEn: "A fireball shot from the dragon's mouth.",
      contextZh: "一团火球从红龙嘴里喷了出来。"
    }
  ],
  sequence: {
    order: ["seq-castle", "seq-onion", "seq-dragon", "seq-soldier", "seq-art"],
    items: [
      {
        id: "seq-onion",
        step: 1,
        emoji: "🧅",
        textEn: "Drake pulls onions in the field.",
        textZh: "德雷克在田里拔洋葱。"
      },
      {
        id: "seq-soldier",
        step: 2,
        emoji: "🐎",
        textEn: "A soldier brings a message from King Roland.",
        textZh: "士兵带来罗兰国王的命令。"
      },
      {
        id: "seq-castle",
        step: 3,
        emoji: "🏰",
        textEn: "Drake rides to the castle.",
        textZh: "德雷克骑马前往城堡。"
      },
      {
        id: "seq-art",
        step: 4,
        emoji: "🖼️",
        textEn: "Drake sees dragon paintings and statues.",
        textZh: "德雷克看见龙的画像和雕像。"
      },
      {
        id: "seq-dragon",
        step: 5,
        emoji: "🐉",
        textEn: "Drake opens the stone door and sees a red dragon.",
        textZh: "德雷克打开石门，看见一条红龙。"
      }
    ]
  },
  quiz: [
    {
      id: "q1",
      questionEn: "Where was Drake when the soldier arrived?",
      questionZh: "士兵到来时，德雷克在哪里？",
      options: [
        { en: "In the castle", zh: "在城堡里" },
        { en: "In the onion field", zh: "在洋葱田里" },
        { en: "On a dragon", zh: "在龙背上" },
        { en: "In a tower", zh: "在高塔里" }
      ],
      answer: 1,
      explanationEn: "The soldier found Drake while he was pulling onions.",
      explanationZh: "士兵找到德雷克时，他正在拔洋葱。"
    },
    {
      id: "q2",
      questionEn: "Who sent the soldier?",
      questionZh: "是谁派来了士兵？",
      options: [
        { en: "King Roland", zh: "罗兰国王" },
        { en: "The red dragon", zh: "红龙" },
        { en: "Drake's neighbor", zh: "德雷克的邻居" },
        { en: "A wizard", zh: "一位巫师" }
      ],
      answer: 0,
      explanationEn: "The soldier said King Roland had chosen Drake.",
      explanationZh: "士兵说，是罗兰国王选中了德雷克。"
    },
    {
      id: "q3",
      questionEn: "How did Drake travel to the castle?",
      questionZh: "德雷克怎么去城堡？",
      options: [
        { en: "By boat", zh: "坐船" },
        { en: "On foot", zh: "步行" },
        { en: "On a horse", zh: "骑马" },
        { en: "On a dragon", zh: "骑龙" }
      ],
      answer: 2,
      explanationEn: "It was Drake's first horse ride.",
      explanationZh: "这是德雷克第一次骑马。"
    },
    {
      id: "q4",
      questionEn: "What dragon art did Drake see inside the castle?",
      questionZh: "德雷克在城堡里看见了什么和龙有关的东西？",
      options: [
        { en: "Kites and flags", zh: "风筝和旗帜" },
        { en: "Paintings and statues", zh: "画像和雕像" },
        { en: "Books and maps", zh: "书和地图" },
        { en: "Cups and candles", zh: "杯子和蜡烛" }
      ],
      answer: 1,
      explanationEn: "The castle had paintings and statues of dragons.",
      explanationZh: "城堡里有龙的画像和雕像。"
    },
    {
      id: "q5",
      questionEn: "What happened when Drake opened the stone door?",
      questionZh: "德雷克打开石门后发生了什么？",
      options: [
        { en: "The dragon sang a song", zh: "龙唱起了歌" },
        { en: "The dragon shot a fireball", zh: "龙喷出了火球" },
        { en: "A soldier gave him a crown", zh: "士兵给了他王冠" },
        { en: "The castle disappeared", zh: "城堡消失了" }
      ],
      answer: 1,
      explanationEn: "A ball of fire shot from the red dragon's mouth.",
      explanationZh: "一团火球从红龙嘴里喷了出来。"
    }
  ],
  lifeMissions: [
    {
      id: "animal-park",
      emoji: "🦙",
      titleEn: "The Animal Park",
      titleZh: "动物园里的新朋友",
      promptEn:
        "A big animal is behind a fence. It turns to look at you. What is a safe, brave move?",
      promptZh: "一只大动物站在围栏后面，转头看着你。怎样做既勇敢又安全？",
      choices: [
        {
          en: "Tap the fence and shout to get its attention.",
          zh: "敲围栏、大声喊，引起它的注意。"
        },
        {
          en: "Stay with your adult, watch quietly, and ask the keeper first.",
          zh: "待在大人身边，安静观察，先问问饲养员。"
        },
        {
          en: "Climb over the fence to say hello.",
          zh: "翻过围栏去和它打招呼。"
        }
      ],
      answer: 1,
      explanationEn:
        "Curiosity is great, but safety comes first. Watch calmly and ask an adult before getting closer.",
      explanationZh: "好奇很棒，但安全最重要。先安静观察，靠近前要问大人。"
    },
    {
      id: "new-class",
      emoji: "🎒",
      titleEn: "A New Class",
      titleZh: "走进新班级",
      promptEn:
        "You are new and do not know anyone. Which move shows courage and curiosity?",
      promptZh: "你刚到一个新班级，谁也不认识。哪种做法既勇敢又好奇？",
      choices: [
        {
          en: "Hide by the door and hope nobody talks to you.",
          zh: "躲在门边，希望没人来和你说话。"
        },
        {
          en: "Run out of the room.",
          zh: "跑出教室。"
        },
        {
          en: "Take a breath and ask someone about a book or picture.",
          zh: "深呼吸，问问同学关于一本书或一幅画的事。"
        }
      ],
      answer: 2,
      explanationEn:
        "A small friendly question is a brave first step. You do not have to be bold all at once.",
      explanationZh: "一个友好的小问题就是勇敢的第一步，不需要一下子变得特别大胆。"
    },
    {
      id: "first-try",
      emoji: "🚲",
      titleEn: "A First Try",
      titleZh: "第一次尝试",
      promptEn:
        "You are invited to try something new, such as riding a bike. You feel nervous. What is a brave, safe move?",
      promptZh: "有人邀请你尝试新事物，比如骑自行车。你有点紧张。怎样做既勇敢又安全？",
      choices: [
        {
          en: "Race down the biggest hill before learning how to stop.",
          zh: "还没学会刹车，就冲下最大的坡。"
        },
        {
          en: "Put on a helmet, ask a grown-up to stay close, and try one small step.",
          zh: "戴好头盔，请大人在旁边，先试一个小步骤。"
        },
        {
          en: "Decide you can never try anything new.",
          zh: "认定自己永远不能尝试新事物。"
        }
      ],
      answer: 1,
      explanationEn:
        "Drake's first horse ride was new and probably scary. Bravery can be one small, safe step with help nearby.",
      explanationZh: "德雷克第一次骑马也是新鲜又可能有点害怕的。勇敢可以是在大人陪伴下，先安全地迈出一小步。"
    }
  ],
  discussion: {
    promptEn:
      "Predict: If you were Drake, what would you say to the red dragon?",
    promptZh: "预测一下：如果你是德雷克，你会对红龙说什么？",
    ideasEn: ["Hello?", "Please do not burn me!", "I am here to help."],
    ideasZh: ["你好？", "请不要烧我！", "我是来帮忙的。"]
  }
};
