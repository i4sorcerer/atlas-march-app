/* =========================================================================
 * Dragon Masters · Interactive series atlas
 * Original educational summaries and activity copy.
 * Story facts are kept to verified titles, publisher-level summaries, and
 * the documented chapter facts used by the Book 1 companion reader.
 * ========================================================================= */

window.DRAGON_MASTERS_SERIES = {
  meta: {
    titleEn: "The Dragon Masters Atlas",
    titleZh: "驯龙大师 · 互动故事图谱",
    author: "Tracey West",
    bookCount: 30,
    editionNoteEn:
      "A connected guide to the 30-book main series, with Book 1 opened as a full interactive sample.",
    editionNoteZh:
      "以已核实的 30 册主线建立连续档案；第一册作为完整互动阅读样板。",
    sources: [
      {
        labelEn: "Tracey West · official series page",
        labelZh: "Tracey West · 官方系列页",
        url: "https://www.traceywest.com/series/dragon-masters-series/"
      },
      {
        labelEn: "Scholastic · Dragon Masters",
        labelZh: "Scholastic · 驯龙大师",
        url: "https://www.scholastic.com/site/branches/dragon-masters.html"
      },
      {
        labelEn: "Rise to Reading · Book 1 chapter guide",
        labelZh: "Rise to Reading · 第一册章节导读",
        url: "https://risetoreading.com/2023/10/29/comprehension-questions-dragon-masters-1-rise-of-the-earth-dragon/"
      },
      {
        labelEn: "Stranger Than SF · Book 1 review notes",
        labelZh: "Stranger Than SF · 第一册书评补注",
        url: "http://strangerthansf.com/reviews/west-riseoftheearthdragon.html"
      }
    ]
  },

  arcs: [
    {
      id: "first-flight",
      number: 1,
      range: "1–4",
      titleEn: "First Flight",
      titleZh: "初次起飞",
      descEn: "A new keeper, four young masters, and the first clash with Maldred.",
      descZh: "新驯龙师入门，四位小伙伴第一次迎战马尔德里德。",
      color: "#2f827a"
    },
    {
      id: "stone-secrets",
      number: 2,
      range: "5–8",
      titleEn: "Secrets of the Stone",
      titleZh: "龙石之谜",
      descEn: "New keepers arrive while the Dragon Stone and its youngest dragons are in danger.",
      descZh: "新伙伴陆续出现，龙石与幼龙接连陷入危险。",
      color: "#bd7b35"
    },
    {
      id: "earth-keys",
      number: 3,
      range: "9–13",
      titleEn: "Keys Beneath the Earth",
      titleZh: "地心钥匙",
      descEn: "Ice, colour, silver, gold, and the earthquake power sleeping below the world.",
      descZh: "冰、彩虹、银与金的力量，最终指向沉睡地心的地震龙。",
      color: "#587b9d"
    },
    {
      id: "new-call",
      number: 4,
      range: "14–21",
      titleEn: "Call of New Dragons",
      titleZh: "新龙召唤",
      descEn: "Spring, time, sound, stone, lava, sea, wind, and flower powers join the map.",
      descZh: "春、时间、声音、岩石、熔岩、海、风与花的力量加入地图。",
      color: "#6f9a54"
    },
    {
      id: "shadow-light",
      number: 5,
      range: "22–25",
      titleEn: "Shadow & Light",
      titleZh: "暗影与光",
      descEn: "Invisible hatchlings, a world-wide shadow, and the search for a star.",
      descZh: "隐形幼龙、笼罩世界的暗影，以及寻找星光的旅程。",
      color: "#696b89"
    },
    {
      id: "dream-chaos",
      number: 6,
      range: "26–30",
      titleEn: "Dreams & Chaos",
      titleZh: "梦境与混沌",
      descEn: "Crystal, ghost, dream, wizard, and chaos magic close the first great cycle.",
      descZh: "水晶、幽灵、梦境、巫师与混沌魔法，收束第一轮大冒险。",
      color: "#a65345"
    }
  ],

  books: [
    {
      id: "dm-01",
      number: 1,
      titleEn: "Rise of the Earth Dragon",
      titleZh: "地龙的崛起",
      illustrator: "Graham Howells",
      arc: "first-flight",
      element: "earth",
      emoji: "🌱",
      accent: "#6f9a54",
      reader: "dragon-masters.html",
      status: "chapter-guide",
      hookEn: "A farmer's child, a royal summons, and a dragon nobody expected.",
      hookZh: "农家的孩子、国王的召唤，还有一条谁也没预料到的龙。",
      summaryEn:
        "Eight-year-old Drake is taken from his family's onion farm to King Roland's castle. The wizard Griffith says the Dragon Stone chose Drake because he has a dragon heart. Drake meets Ana, Rori, and Bo, then receives a quiet Earth Dragon that he names Worm. The others' dragons show dramatic powers while Drake struggles to connect. When the children and dragons enter a forbidden tunnel, a cave-in traps them. Worm turns the rock to dust and saves everyone, revealing the first clue to his extraordinary power.",
      summaryZh:
        "八岁的德雷克从家里的洋葱田被带到罗兰国王的城堡。巫师格里菲斯说，龙石因为德雷克拥有一颗“龙之心”而选中了他。德雷克认识了安娜、罗莉和波，并得到一条安静的土龙，给它取名“虫虫”。其他龙都能展示惊人的力量，德雷克却迟迟无法与自己的龙沟通。孩子们和龙误入禁行隧道后遭遇塌方，虫虫把岩石化为尘土救了大家，也第一次显露出非凡能力的线索。",
      themesEn: ["belonging", "friendship", "hidden strength", "trust"],
      themesZh: ["归属感", "友谊", "隐藏的力量", "信任"],
      dossierIds: [
        "drake", "ana", "rori", "bo", "griffith", "king-roland",
        "worm", "kepri", "shu", "vulcan", "bracken-castle",
        "dragon-stone", "prime-stone"
      ],
      chapterGuide: [
        {
          number: 1,
          titleEn: "To the Castle",
          titleZh: "前往城堡",
          pages: "1–7",
          status: "verified",
          summaryEn:
            "Drake is working on his family's onion farm when one of King Roland's soldiers arrives. The king has chosen Drake, and the child must leave at once. The soldier takes him on his first horse ride to the castle. Inside, dragon paintings and statues lead to a huge stone door. Beyond it waits a giant red dragon that shoots a fireball.",
          summaryZh:
            "德雷克正在家里的洋葱田劳作，罗兰国王的一名士兵突然到来。国王选中了德雷克，要他立刻离开。士兵带着第一次骑马的德雷克前往城堡。城堡里的龙画和龙雕像一直通向一扇巨大石门。门后是一条巨大的红龙，它张口喷出火球。",
          momentEn: "The chapter ends on the fireball cliffhanger.",
          momentZh: "本章在红龙喷出火球的悬念中结束。"
        },
        {
          number: 2,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "At the castle, Griffith gives Drake a Dragon Stone. He explains that the stone found the heart of a dragon in Drake and that King Roland needs Dragon Masters to work with dragons. The stone can help Drake connect with his dragon, but it cannot shield him from a dragon's power.",
          summaryZh:
            "在城堡里，格里菲斯把龙石交给德雷克。他解释说，龙石在德雷克身上发现了龙之心，而罗兰国王需要驯龙师与龙合作。龙石能帮助德雷克与龙建立联系，却不能保护他免受龙的力量伤害。"
        },
        {
          number: 3,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Griffith explains that each dragon and keeper are matched by culture and personality. Drake begins to understand that the pairing is not simply about strength.",
          summaryZh:
            "格里菲斯说明，龙与驯龙师会依照文化背景和性格彼此匹配。德雷克开始明白，这种配对并不只是看谁更强大。"
        },
        {
          number: 4,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Drake receives the Earth Dragon. It is long, brown, snake-like, with dull scales and green eyes. Drake names the dragon Worm.",
          summaryZh:
            "德雷克得到了土龙。它身体长而棕，像蛇一样，鳞片黯淡，眼睛却是绿色的。德雷克给它取名“虫虫”。"
        },
        {
          number: 5,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "During target practice, Vulcan breathes fire, Shu extinguishes the flame, and Kepri creates a rainbow. Drake cannot get Worm to perform and feels like a failure.",
          summaryZh:
            "靶场训练时，火龙的火焰、水龙的水柱和太阳龙的彩虹先后亮相。德雷克却无法让虫虫做出任何动作，觉得自己是个失败者。"
        },
        {
          number: 6,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Bo is friendly, has a Water Dragon named Shu, and becomes Drake's roommate. Rori trains a fire-breathing dragon and is not especially kind to Drake.",
          summaryZh:
            "波很友好，他的水龙叫舒，后来还成了德雷克的室友。罗莉训练一条会喷火的龙，对德雷克并不特别友善。"
        },
        {
          number: 7,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "King Roland puts pressure on Drake not to fail. That night Drake dreams of trapped Earth Dragons and an explosion.",
          summaryZh:
            "罗兰国王给德雷克施压，叫他不要让自己失望。当晚，德雷克梦见被困的土龙群和一场爆炸。"
        },
        {
          number: 8,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Drake notices that only his Dragon Stone is glowing. The unusual sign makes him nervous rather than proud.",
          summaryZh:
            "德雷克发现，只有自己的龙石在发光。这个异常现象没有让他骄傲，反而让他更加紧张。"
        },
        {
          number: 9,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Drake reads a letter from his mother. Missing home makes his eyes burn with tears.",
          summaryZh:
            "德雷克读了母亲寄来的信。思乡之情让他的眼睛被泪水刺得发烫。"
        },
        {
          number: 10,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Worm shares thoughts with Drake. The two discover that they were both taken from their families, creating a bond deeper than words.",
          summaryZh:
            "虫虫开始与德雷克共享思想。两个伙伴发现彼此都曾被迫离开家人，于是建立起比语言更深的联系。"
        },
        {
          number: 11,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Bo teaches Drake how to write. Drake trusts him with what he is learning about Worm.",
          summaryZh:
            "波教德雷克写字。德雷克也把自己逐渐了解虫虫的事告诉了这位值得信任的朋友。"
        },
        {
          number: 12,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Worm warns Drake not to enter the tunnel. The warning becomes important when the children decide to leave the castle grounds.",
          summaryZh:
            "虫虫警告德雷克不要进入隧道。当孩子们决定偷偷离开城堡区域时，这个警告变得格外重要。"
        },
        {
          number: 13,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Drake learns that Worm is trying to protect him from an evil wizard's magic. The danger is larger than the children first understood.",
          summaryZh:
            "德雷克得知，虫虫想保护他免受邪恶巫师的魔法伤害。眼前的危险远比孩子们最初想的更大。"
        },
        {
          number: 14,
          titleEn: "",
          titleZh: "",
          status: "summary-only",
          summaryEn:
            "The children and their dragons enter the tunnel. A strange red magical orb appears. Exact chapter dialogue and page details are still awaiting source verification.",
          summaryZh:
            "孩子们和龙进入隧道，一个奇怪的红色魔法光球出现。该章的具体对白与页码细节仍待原书核对。"
        },
        {
          number: 15,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "The red orb triggers a cave-in. The other dragons cannot free the group, but Worm concentrates on the rock and turns stone into dust, saving everyone.",
          summaryZh:
            "红色光球引发塌方。其他龙都无法救出众人，虫虫却专注于岩石，把石头化为尘土，救下了所有人。"
        },
        {
          number: 16,
          titleEn: "",
          titleZh: "",
          status: "verified",
          summaryEn:
            "Drake and Worm begin to understand the shape of Worm's special ability. Griffith treats the red orb as a serious sign that danger may be coming.",
          summaryZh:
            "德雷克和虫虫开始理解虫虫特殊能力的方向。格里菲斯则把红色光球视为危险正在逼近的严重信号。"
        }
      ]
    },
    {
      id: "dm-02",
      number: 2,
      titleEn: "Saving the Sun Dragon",
      titleZh: "拯救太阳龙",
      illustrator: "Damien Jones",
      arc: "first-flight",
      element: "sun",
      emoji: "☀️",
      accent: "#d19a32",
      status: "summary-only",
      hookEn: "Kepri is sick, and the usual potions are not working.",
      hookZh: "太阳龙凯普莉病了，巫师常用的药水却毫无作用。",
      summaryEn:
        "Ana's Sun Dragon, Kepri, becomes ill and Griffith's potions fail to heal her. Worm uses his developing power to carry the Dragon Masters far from the castle in search of a cure. The journey tests the young keepers and raises urgent questions about what made Kepri sick.",
      summaryZh:
        "安娜的太阳龙凯普莉突然生病，格里菲斯的药水也无法治好她。虫虫运用正在发展的力量，带驯龙师们远行寻找解药。旅程考验着年轻伙伴们，也让“凯普莉为何生病”成为紧迫谜题。",
      themesEn: ["care", "teamwork", "seeking help"],
      themesZh: ["照顾", "合作", "寻求帮助"],
      dossierIds: ["drake", "ana", "rori", "bo", "griffith", "worm", "kepri", "shu", "vulcan"]
    },
    {
      id: "dm-03",
      number: 3,
      titleEn: "Secret of the Water Dragon",
      titleZh: "水龙的秘密",
      illustrator: "Damien Jones",
      arc: "first-flight",
      element: "water",
      emoji: "💧",
      accent: "#4f8fb2",
      status: "summary-only",
      hookEn: "The Dragon Stone is in danger, and the trail points to Bo.",
      hookZh: "龙石面临危险，线索却指向德雷克的朋友波。",
      summaryEn:
        "Someone tries to steal the Dragon Stone, and Drake discovers that his friend Bo is involved. The Dragon Masters must protect the stone and Bo's family while uncovering whether a dark wizard is pulling the strings. Shu, Bo's Water Dragon, may hold the key to the mystery.",
      summaryZh:
        "有人试图偷走龙石，德雷克发现自己的朋友波牵涉其中。驯龙师们既要保护龙石与波的家人，也要查明背后是否有黑暗巫师操控。波的水龙舒可能是破解秘密的关键。",
      themesEn: ["loyalty", "judgement", "family", "trust"],
      themesZh: ["忠诚", "判断", "家人", "信任"],
      dossierIds: ["drake", "ana", "rori", "bo", "griffith", "maldred", "shu", "worm", "dragon-stone"]
    },
    {
      id: "dm-04",
      number: 4,
      titleEn: "Power of the Fire Dragon",
      titleZh: "火龙之力",
      illustrator: "Graham Howells",
      arc: "first-flight",
      element: "fire",
      emoji: "🔥",
      accent: "#d45a43",
      status: "summary-only",
      hookEn: "A four-headed dragon attacks the castle with Maldred riding it.",
      hookZh: "一条四头龙在马尔德里德驾驭下袭击城堡。",
      summaryEn:
        "Most of the Dragon Masters leave for Queen Rose's kingdom, but Rori and Drake remain behind. A four-headed dragon attacks the castle with the dark wizard Maldred riding it. Rori and Drake must discover how Maldred controls the dragon and face him with only their own partners.",
      summaryZh:
        "多数驯龙师前往罗丝女王的王国，罗莉和德雷克却留在城堡。一条四头龙在黑暗巫师马尔德里德的驾驭下发动袭击。罗莉和德雷克必须查明巫师如何控制这条龙，并只靠自己与龙伙伴迎战。",
      themesEn: ["courage", "responsibility", "partnership"],
      themesZh: ["勇气", "责任", "伙伴关系"],
      dossierIds: ["drake", "rori", "bo", "ana", "queen-rose", "maldred", "vulcan", "worm", "bracken-castle"]
    },
    {
      id: "dm-05",
      number: 5,
      titleEn: "Song of the Poison Dragon",
      titleZh: "毒龙之歌",
      illustrator: "Damien Jones",
      arc: "stone-secrets",
      element: "poison",
      emoji: "🎵",
      accent: "#718f5d",
      status: "summary-only",
      hookEn: "A know-it-all new keeper refuses to connect with a four-headed dragon.",
      hookZh: "新来的“万事通”驯龙师拒绝与四头龙建立联系。",
      summaryEn:
        "Petra arrives as the newest Dragon Master but does not fit in. She acts as though she knows everything and avoids connecting with her four-headed Poison Dragon. When the king is poisoned, Petra must work with the others and find the courage to bond with her dragon before it is too late.",
      summaryZh:
        "新驯龙师佩特拉来到城堡，却很难融入大家。她表现得无所不知，也不愿与自己的四头毒龙建立联系。国王中毒后，佩特拉必须与伙伴合作，并鼓起勇气与龙沟通，才能及时挽回局面。",
      themesEn: ["humility", "belonging", "cooperation", "fear"],
      themesZh: ["谦逊", "归属", "合作", "恐惧"],
      dossierIds: ["petra", "drake", "bo", "ana", "rori", "griffith", "king-roland", "poison-dragon", "worm"]
    },
    {
      id: "dm-06",
      number: 6,
      titleEn: "Flight of the Moon Dragon",
      titleZh: "月龙之飞",
      illustrator: "Damien Jones",
      arc: "stone-secrets",
      element: "moon",
      emoji: "🌙",
      accent: "#686ca3",
      status: "summary-only",
      hookEn: "The prime Dragon Stone is fading, and seven dragons must solve a pyramid.",
      hookZh: "主龙石正在失去光芒，七条龙必须解开金字塔谜题。",
      summaryEn:
        "The prime Dragon Stone is losing power, threatening every keeper's connection to a dragon. With Heru and his Moon Dragon, Wati, the Dragon Masters travel to the Land of Pyramids. They seek the secret Pyramid of the Seven Dragons and must solve a chain of puzzles before the stone fails.",
      summaryZh:
        "主龙石逐渐失去力量，所有驯龙师与龙的联系都可能因此断绝。德雷克一行随赫鲁和他的月龙瓦蒂前往金字塔之地，寻找“七龙金字塔”。他们必须接连解开谜题，才能赶在龙石失效前抵达目标。",
      themesEn: ["cooperation", "problem solving", "urgency"],
      themesZh: ["合作", "解决问题", "紧迫感"],
      dossierIds: ["drake", "ana", "rori", "bo", "petra", "griffith", "worm", "wati", "prime-stone", "pyramid-seven"]
    },
    {
      id: "dm-07",
      number: 7,
      titleEn: "Search for the Lightning Dragon",
      titleZh: "寻找闪电龙",
      illustrator: "Damien Jones",
      arc: "stone-secrets",
      element: "lightning",
      emoji: "⚡",
      accent: "#c79a27",
      status: "summary-only",
      hookEn: "A wild young dragon is loose, and only Carlos may be able to reach him.",
      hookZh: "一条失控的幼龙四处放电，也许只有卡洛斯能接近它。",
      summaryEn:
        "A Lightning Dragon is loose and dangerous sparks are flying. The Dragon Masters must track the young dragon while also finding his possible keeper, Carlos. Carlos has to learn whether he can connect with such a wild partner before a darker force claims the dragon.",
      summaryZh:
        "闪电龙失去控制，危险的电流四处飞射。驯龙师们一边追踪这条幼龙，一边寻找可能与之配对的卡洛斯。卡洛斯必须判断自己能否与如此狂野的伙伴建立联系，而黑暗势力也可能抢先一步。",
      themesEn: ["patience", "trust", "self-control", "new friendship"],
      themesZh: ["耐心", "信任", "自我控制", "新友谊"],
      dossierIds: ["drake", "carlos", "lightning-dragon", "worm", "griffith", "maldred"]
    },
    {
      id: "dm-08",
      number: 8,
      titleEn: "Roar of the Thunder Dragon",
      titleZh: "雷龙之吼",
      illustrator: "Damien Jones",
      arc: "stone-secrets",
      element: "thunder",
      emoji: "🌩️",
      accent: "#667789",
      status: "summary-only",
      hookEn: "Eko returns with a Thunder Dragon and takes the baby Lightning Dragon.",
      hookZh: "埃科带着雷龙归来，还抓走了闪电龙宝宝。",
      summaryEn:
        "Lalo, the baby Lightning Dragon, is kidnapped by Eko, Griffith's first Dragon Master. Eko disappeared years earlier with her Thunder Dragon, Neru, and now wants to take every dragon in the kingdom. Drake and the others must rescue Lalo and confront the painful history between Eko and Griffith.",
      summaryZh:
        "闪电龙宝宝拉洛被埃科抓走。埃科曾是格里菲斯的第一位驯龙师，多年前带着雷龙内鲁离开，如今却想夺走王国里的所有龙。德雷克和伙伴们必须救回拉洛，也要面对埃科与格里菲斯之间沉重的往事。",
      themesEn: ["rescue", "old wounds", "freedom", "loyalty"],
      themesZh: ["营救", "旧伤", "自由", "忠诚"],
      dossierIds: ["drake", "griffith", "eko", "neru", "lalo", "carlos", "lightning-dragon", "worm"]
    },
    {
      id: "dm-09",
      number: 9,
      titleEn: "Chill of the Ice Dragon",
      titleZh: "冰龙之寒",
      illustrator: "Nina de Polonia",
      arc: "earth-keys",
      element: "ice",
      emoji: "❄️",
      accent: "#5b98ad",
      status: "summary-only",
      hookEn: "A frozen kingdom needs fire, but Rori and Vulcan are far away.",
      hookZh: "被冰封的王国需要火焰，可罗莉和火龙却不在城堡。",
      summaryEn:
        "Mina reaches the castle after a magical Ice Giant freezes her kingdom in the Far North Lands. A fire dragon is needed to thaw the land and defeat the giant, but Rori and Vulcan are away. Drake and the others must find them in time to help their new friend.",
      summaryZh:
        "魔法冰巨人冰封了北方王国的土地，米娜逃到城堡求援。要融化冰层并击败巨人，需要火龙的帮助，可罗莉与火龙伏尔甘已经离开城堡。德雷克一行必须及时找到他们，才能帮助新朋友。",
      themesEn: ["solidarity", "rescue", "climate", "ingenuity"],
      themesZh: ["团结", "营救", "环境", "巧思"],
      dossierIds: ["drake", "mina", "rori", "vulcan", "ice-dragon", "ice-giant", "far-north", "worm"]
    },
    {
      id: "dm-10",
      number: 10,
      titleEn: "Waking the Rainbow Dragon",
      titleZh: "唤醒彩虹龙",
      illustrator: "Damien Jones",
      arc: "earth-keys",
      element: "rainbow",
      emoji: "🌈",
      accent: "#c97c5c",
      status: "summary-only",
      hookEn: "A trapped dragon calls through Drake's dream.",
      hookZh: "一条被困的龙，通过德雷克的梦发出求救。",
      summaryEn:
        "Drake dreams of a Rainbow Dragon trapped in a cave. Griffith uses the Dragon Stone to search for the truth, revealing a new keeper. Drake and Ana travel to find the keeper and rescue the Rainbow Dragon, Dayo, from a giant spider and its dangerous web.",
      summaryZh:
        "德雷克梦见一条被困在洞穴里的彩虹龙。格里菲斯借龙石寻找真相，并发现了一位新的驯龙师。德雷克和安娜踏上旅程，寻找这位伙伴，并从巨型蜘蛛和危险蛛网中救出彩虹龙达约。",
      themesEn: ["intuition", "listening", "rescue", "trusting dreams"],
      themesZh: ["直觉", "倾听", "营救", "相信梦境"],
      dossierIds: ["drake", "ana", "dayo", "griffith", "dragon-stone", "worm", "kepri"]
    },
    {
      id: "dm-11",
      number: 11,
      titleEn: "Shine of the Silver Dragon",
      titleZh: "银龙之光",
      illustrator: "Nina de Polonia",
      arc: "earth-keys",
      element: "silver",
      emoji: "🥈",
      accent: "#84919a",
      status: "summary-only",
      hookEn: "Maldred returns, Diego is under a spell, and a key must be protected.",
      hookZh: "马尔德里德归来，迭戈中咒，一把钥匙必须被守住。",
      summaryEn:
        "Maldred is back and Diego is under his dark spell. Drake learns that two keys can control the Naga, an enormous dragon deep within the Earth. The first is guarded by the Silver Dragon Argent. Drake, Bo, and Carlos must find Argent and stop Diego, while Argent's keeper Jean may not trust them.",
      summaryZh:
        "马尔德里德再次现身，迭戈被黑暗魔法控制。德雷克得知，两把钥匙能够操控地底深处的巨龙“娜迦”，其中一把由银龙阿根特守护。德雷克、波和卡洛斯必须找到银龙并阻止迭戈，而银龙的驯龙师琼未必愿意相信他们。",
      themesEn: ["suspicion", "proof", "protection", "alliances"],
      themesZh: ["怀疑", "证明", "守护", "结盟"],
      dossierIds: ["drake", "bo", "carlos", "maldred", "argent", "jean", "naga", "silver-key", "worm", "shu"]
    },
    {
      id: "dm-12",
      number: 12,
      titleEn: "Treasure of the Gold Dragon",
      titleZh: "金龙宝藏",
      illustrator: "Sara Foresti",
      arc: "earth-keys",
      element: "gold",
      emoji: "🏅",
      accent: "#bd8b2e",
      status: "summary-only",
      hookEn: "The Gold Key may bring Maldred one step closer to the Earthquake Dragon.",
      hookZh: "金钥匙可能让马尔德里德离地震龙更近一步。",
      summaryEn:
        "Maldred wants the Gold Key. Drake and Rori travel to the Gold Dragon's lair to protect it and meet a new keeper, Darma. If Maldred obtains the key, he will be closer to controlling the powerful Earthquake Dragon, so the race is also a lesson in choosing whom to trust.",
      summaryZh:
        "马尔德里德盯上了金钥匙。德雷克和罗莉前往金龙巢穴保护钥匙，并结识新驯龙师达尔玛。若钥匙落入巫师之手，他就离操控强大的地震龙更近一步，因此这场追逐也考验着大家如何选择信任。",
      themesEn: ["trust", "protection", "teamwork", "greed"],
      themesZh: ["信任", "守护", "合作", "贪婪"],
      dossierIds: ["drake", "rori", "darma", "maldred", "gold-dragon", "gold-key", "naga", "worm", "vulcan"]
    },
    {
      id: "dm-13",
      number: 13,
      titleEn: "Eye of the Earthquake Dragon",
      titleZh: "地震龙之眼",
      illustrator: "Daniel Griffo",
      arc: "earth-keys",
      element: "earthquake",
      emoji: "🌋",
      accent: "#977347",
      status: "summary-only",
      hookEn: "With both keys stolen, Maldred heads for the Naga's hidden temple.",
      hookZh: "两把钥匙都被夺走，马尔德里德正前往娜迦的隐秘神殿。",
      summaryEn:
        "Maldred has stolen the Gold and Silver Keys and can now command the Naga, a dragon whose power causes earthquakes. He travels toward a secret temple at the centre of the Earth. Drake joins Jean and Darma in a final attempt to stop him and decide the fate of the Naga.",
      summaryZh:
        "马尔德里德夺走了金钥匙与银钥匙，如今能够操控会引发地震的巨龙娜迦。他正前往地心深处的秘密神殿。德雷克与琼、达尔玛一起展开最后追击，试图阻止巫师，也决定娜迦的命运。",
      themesEn: ["responsibility", "power", "final stand", "trust"],
      themesZh: ["责任", "力量", "最后防线", "信任"],
      dossierIds: ["drake", "jean", "darma", "maldred", "naga", "gold-key", "silver-key", "pyramid-seven", "worm", "argent"]
    },
    {
      id: "dm-14",
      number: 14,
      titleEn: "Land of the Spring Dragon",
      titleZh: "春龙之地",
      illustrator: "Matt Loveridge",
      arc: "new-call",
      element: "spring",
      emoji: "🌿",
      accent: "#6c9f70",
      status: "summary-only",
      hookEn: "Bracken's crops are ruined, and help grows in a fairy world full of tricks.",
      hookZh: "布莱肯的庄稼被毁，而希望藏在充满诡计的仙灵世界。",
      summaryEn:
        "An earthquake destroys Bracken's crops. The Spring Dragon Fallyn can restore the land, but lives deep inside a fairy world. Guided by keeper Breen, Drake faces tests and riddles where appearances cannot be trusted. The mission is as much about clever thinking as dragon power.",
      summaryZh:
        "一场地震毁掉了布莱肯的庄稼。春龙法琳有能力让土地重新生长，却住在仙灵世界深处。德雷克在驯龙师布琳的引导下接受测试与谜题，那里的一切都不能只看表面。这次任务既依靠龙的力量，也依靠清醒的判断。",
      themesEn: ["riddles", "judgement", "renewal", "food security"],
      themesZh: ["谜题", "判断", "新生", "粮食安全"],
      dossierIds: ["drake", "fallyn", "fairy-world", "worm", "griffith"]
    },
    {
      id: "dm-15",
      number: 15,
      titleEn: "Future of the Time Dragon",
      titleZh: "时间龙的未来",
      illustrator: "Daniel Griffo",
      arc: "new-call",
      element: "time",
      emoji: "⏳",
      accent: "#a78452",
      status: "summary-only",
      hookEn: "To free Eko, Drake must find the Time Dragon, but an imp sends him backwards.",
      hookZh: "为救埃科，德雷克要找到时间龙，却被小恶魔送回过去。",
      summaryEn:
        "Maldred traps Eko and other opponents in a spell. Drake and Rori seek the Time Dragon to free her, but an imp interferes and sends Drake into his own past. He must find a way to help Eko without becoming stranded in history.",
      summaryZh:
        "马尔德里德用咒语困住了埃科和其他反对者。德雷克与罗莉寻找时间龙，希望解除魔法，但一只捣乱的小恶魔把德雷克送回过去。他必须想办法救出埃科，又不能永远被困在历史中。",
      themesEn: ["consequences", "history", "rescue", "time"],
      themesZh: ["后果", "历史", "营救", "时间"],
      dossierIds: ["drake", "rori", "eko", "maldred", "time-dragon", "worm"]
    },
    {
      id: "dm-16",
      number: 16,
      titleEn: "Call of the Sound Dragon",
      titleZh: "音龙的呼唤",
      illustrator: "Matt Loveridge",
      arc: "new-call",
      element: "sound",
      emoji: "🎶",
      accent: "#3f8d90",
      status: "summary-only",
      hookEn: "A wizard duel is tearing Remus apart, and sound may be the only way to stop it.",
      hookZh: "巫师的决斗正在撕裂雷穆斯城，声音也许是唯一的解法。",
      summaryEn:
        "Magic from a wizards' battle is destroying the city of Remus. New keeper Tessa and her Sound Dragon, Sono, need help to end the dangerous duel. Drake, Petra, and Griffith search for a special Power Crystal that may be the key to saving the city.",
      summaryZh:
        "巫师之间的战斗释放出破坏雷穆斯城的魔法。新驯龙师泰莎和她的音龙索诺需要帮助才能终止危险决斗。德雷克、佩特拉与格里菲斯踏上寻找特殊能量水晶的旅程，它可能是拯救城市的关键。",
      themesEn: ["cooperation", "sound", "conflict resolution", "calm"],
      themesZh: ["合作", "声音", "化解冲突", "冷静"],
      dossierIds: ["drake", "petra", "griffith", "tessa", "sono", "remus", "worm"]
    },
    {
      id: "dm-17",
      number: 17,
      titleEn: "Fortress of the Stone Dragon",
      titleZh: "石龙堡垒",
      illustrator: "Matt Loveridge",
      arc: "new-call",
      element: "stone",
      emoji: "🪨",
      accent: "#7d7a70",
      status: "summary-only",
      hookEn: "Astrid is collecting spell ingredients, and Caspar's fortress is next.",
      hookZh: "阿斯特丽德在收集咒语材料，下一站就是卡斯帕的堡垒。",
      summaryEn:
        "The evil wizard Astrid wants to become the most powerful wizard in the world and is gathering ingredients for a dangerous spell. Drake and Mina travel to the Fortress of the Stone Dragon to warn its keeper, Caspar. They must discover whether his stone power can withstand Astrid's dark magic.",
      summaryZh:
        "邪恶巫师阿斯特丽德妄图成为世界上最强的巫师，正为危险咒语收集材料。德雷克和米娜赶往石龙堡垒，提醒石龙驯龙师卡斯帕。大家必须判断，石龙的力量能否抵挡阿斯特丽德的黑魔法。",
      themesEn: ["warning", "fortification", "courage", "preparation"],
      themesZh: ["预警", "防守", "勇气", "准备"],
      dossierIds: ["drake", "mina", "caspar", "astrid", "stone-dragon", "worm"]
    },
    {
      id: "dm-18",
      number: 18,
      titleEn: "Heat of the Lava Dragon",
      titleZh: "熔岩龙之热",
      illustrator: "Graham Howells",
      arc: "new-call",
      element: "lava",
      emoji: "🌋",
      accent: "#c55a3f",
      status: "summary-only",
      hookEn: "Astrid turns friends to stone, and a feared Lava Dragon may be the answer.",
      hookZh: "阿斯特丽德把伙伴变成石头，令人畏惧的熔岩龙也许是答案。",
      summaryEn:
        "Astrid traps Drake's friends in stone and moves closer to casting a more dangerous spell. Drake and Ana search for Ka, a mysterious and feared Lava Dragon. A new keeper, Opeli, may be able to reach the dragon, but the mission demands courage and heat in equal measure.",
      summaryZh:
        "阿斯特丽德把德雷克的朋友们困在石头里，还准备施展更危险的咒语。德雷克和安娜寻找神秘又令人畏惧的熔岩龙卡。新伙伴奥佩莉也许能接近这条龙，但这次任务既需要热量，也需要勇气。",
      themesEn: ["courage", "misunderstood power", "rescue", "heat"],
      themesZh: ["勇气", "被误解的力量", "营救", "热量"],
      dossierIds: ["drake", "ana", "opeli", "astrid", "ka", "worm", "kepri"]
    },
    {
      id: "dm-19",
      number: 19,
      titleEn: "Wave of the Sea Dragon",
      titleZh: "海龙之浪",
      illustrator: "Matt Loveridge",
      arc: "new-call",
      element: "sea",
      emoji: "🌊",
      accent: "#3e7f9a",
      status: "summary-only",
      hookEn: "Undoing the False Life spell requires an enormous, dangerous Sea Dragon.",
      hookZh: "解开“伪生咒”需要一条巨大而危险的海龙。",
      summaryEn:
        "Astrid is ready to cast the False Life spell, and three special dragons are needed to undo it. Drake, Bo, and Opeli travel to the island of Kapua to find a Sea Dragon. Because the keepers took something from Astrid, the sea journey becomes a race against a furious enemy.",
      summaryZh:
        "阿斯特丽德即将施展“伪生咒”，只有三条特殊的龙才能将其解除。德雷克、波和奥佩莉前往卡普阿岛寻找海龙。由于驯龙师们拿走了阿斯特丽德的一件东西，这趟海上旅程也变成与愤怒敌人的追逐。",
      themesEn: ["risk", "ocean", "teamwork", "consequences"],
      themesZh: ["风险", "海洋", "合作", "后果"],
      dossierIds: ["drake", "bo", "opeli", "astrid", "sea-dragon", "shu", "worm"]
    },
    {
      id: "dm-20",
      number: 20,
      titleEn: "Howl of the Wind Dragon",
      titleZh: "风龙之啸",
      illustrator: "Graham Howells",
      arc: "new-call",
      element: "wind",
      emoji: "🌬️",
      accent: "#649d98",
      status: "summary-only",
      hookEn: "The last dragon needed to end Astrid's spell is herself a captive.",
      hookZh: "解除阿斯特丽德咒语的最后一条龙，自己却成了囚徒。",
      summaryEn:
        "Drake and Rori search for the Wind Dragon, the last dragon needed to undo Astrid's False Life spell. They discover that the dragon and her keeper, Quilla, are captives. Meanwhile, Astrid raises the Garden of Beasts, forcing the Dragon Masters toward their biggest battle yet.",
      summaryZh:
        "德雷克和罗莉寻找风龙，它是解除“伪生咒”所需的最后一条龙。他们却发现风龙与驯龙师基拉都被囚禁。与此同时，阿斯特丽德唤醒了“万兽园”，迫使驯龙师们迎来迄今最大的一场战斗。",
      themesEn: ["freedom", "battle", "teamwork", "courage"],
      themesZh: ["自由", "战斗", "合作", "勇气"],
      dossierIds: ["drake", "rori", "astrid", "wind-dragon", "quilla", "vulcan", "worm"]
    },
    {
      id: "dm-21",
      number: 21,
      titleEn: "Bloom of the Flower Dragon",
      titleZh: "花龙盛放",
      illustrator: "Graham Howells",
      arc: "new-call",
      element: "flower",
      emoji: "🌼",
      accent: "#bd7180",
      status: "summary-only",
      hookEn: "A small dragon needs a keeper, and a goblin army threatens its home.",
      hookZh: "一条小小的花龙需要伙伴，而哥布林大军正威胁它的家园。",
      summaryEn:
        "Bloom the Flower Dragon comes to Bracken with news that his homeland is under threat. The Dragon Stone reveals a new keeper, Sem, who is disappointed not to receive a large fire-breathing dragon. Sem must learn to value Bloom's abilities before the goblin army destroys the Flower Dragons' home.",
      summaryZh:
        "花龙布卢姆来到布莱肯，带来家园受威胁的消息。龙石选出新驯龙师塞姆，可塞姆因为没有得到一条会喷火的巨龙而失望。他必须学会看见布卢姆的独特能力，才能赶在哥布林大军毁掉花龙家园前行动。",
      themesEn: ["expectations", "small strengths", "belonging", "defence"],
      themesZh: ["期待", "微小优势", "归属", "守护"],
      dossierIds: ["drake", "sem", "bloom", "dragon-stone", "griffith", "worm"]
    },
    {
      id: "dm-22",
      number: 22,
      titleEn: "Guarding the Invisible Dragons",
      titleZh: "守护隐形龙",
      illustrator: "Matt Loveridge",
      arc: "shadow-light",
      element: "invisible",
      emoji: "🫥",
      accent: "#72a3a4",
      status: "summary-only",
      hookEn: "Invisible hatchlings need a dragon tree, and their parents are missing.",
      hookZh: "隐形的幼龙需要龙树果实，而它们的父母却不见了。",
      summaryEn:
        "A nest of baby Invisible Dragons is found in Aragon, but their parents are missing. The hatchlings need fruit from the magical Dragon Tree on dangerous Dove Island to keep their powers. Drake, Worm, and Carlos's cousin Val travel to find the parents and the fruit, while one hatchling forms a close bond with Val.",
      summaryZh:
        "人们在阿拉贡发现一窝隐形幼龙，却找不到它们的父母。幼龙需要危险鸽岛上魔法龙树的果实，才能维持隐身能力。德雷克、虫虫和卡洛斯的表亲瓦尔出发寻找父母与果实，其中一只幼龙还与瓦尔建立了亲密联系。",
      themesEn: ["family", "care", "belonging", "ecology"],
      themesZh: ["家人", "照护", "归属", "生态"],
      dossierIds: ["drake", "val", "invisible-dragon", "dragon-tree", "worm", "carlos"]
    },
    {
      id: "dm-23",
      number: 23,
      titleEn: "Curse of the Shadow Dragon",
      titleZh: "暗影龙之咒",
      illustrator: "Graham Howells",
      arc: "shadow-light",
      element: "shadow",
      emoji: "🌑",
      accent: "#626b7a",
      status: "summary-only",
      hookEn: "A sky-shadow is swallowing the kingdoms and draining wizards' magic.",
      hookZh: "天空暗影笼罩诸国，还在抽走巫师们的魔法。",
      summaryEn:
        "A huge shadow spreads across every kingdom, and wizards around the world begin losing their magic. Drake and Jean investigate the Shadow Dragon Chaya and her keeper, Aruna. They must learn why Chaya has so much power and whether dark magic is responsible before the world is swallowed by darkness.",
      summaryZh:
        "巨大的暗影蔓延到所有王国，世界各地的巫师开始失去魔法。德雷克与琼调查暗影龙查娅及驯龙师阿鲁娜，必须查明查娅为何拥有如此强大的力量，以及背后是否有黑暗魔法推动。",
      themesEn: ["fear", "investigation", "power", "hope"],
      themesZh: ["恐惧", "调查", "力量", "希望"],
      dossierIds: ["drake", "jean", "aruna", "chaya", "shadow-dragon", "worm", "argent"]
    },
    {
      id: "dm-24",
      number: 24,
      titleEn: "Dawn of the Light Dragon",
      titleZh: "光龙黎明",
      illustrator: "Matt Loveridge",
      arc: "shadow-light",
      element: "light",
      emoji: "🌅",
      accent: "#d1ad57",
      status: "summary-only",
      hookEn: "The Star Flute lies in a labyrinth, and its keeper speaks through signs.",
      hookZh: "星笛藏在迷宫深处，而它的守护者用另一种方式交流。",
      summaryEn:
        "To stop the Shadow Dragon's world-wide sky-shadow, the Dragon Masters seek the Light Dragon Lysa. Lysa's keeper, Rune, is Deaf and explains that a Star Flute can summon a Star Dragon. The flute is hidden in a dangerous labyrinth, and the team must navigate both the maze and the need to listen carefully to one another.",
      summaryZh:
        "为了阻止暗影龙遮蔽世界，驯龙师们寻找光龙莱莎。莱莎的驯龙师鲁恩是一位聋人，他告诉大家：星笛能够召唤星龙。星笛藏在危险迷宫中，伙伴们既要破解路线，也要学会认真倾听彼此。",
      themesEn: ["communication", "accessibility", "cooperation", "light"],
      themesZh: ["沟通", "无障碍", "合作", "光"],
      dossierIds: ["drake", "darma", "lysa", "rune", "star-flute", "star-dragon", "chaya"]
    },
    {
      id: "dm-25",
      number: 25,
      titleEn: "Legend of the Star Dragon",
      titleZh: "星龙传说",
      illustrator: "Graham Howells",
      arc: "shadow-light",
      element: "star",
      emoji: "⭐",
      accent: "#607aa6",
      status: "summary-only",
      hookEn: "The Star Flute is here, but nobody yet knows how to play it.",
      hookZh: "星笛已经到手，却还没有人知道该怎么吹响它。",
      summaryEn:
        "With the Star Flute in hand, the Dragon Masters are close to stopping the Shadow Dragon's sky-shadow. They must first learn how to play the flute and summon the Star Dragon while time runs out. Success depends on combining different talents instead of waiting for one hero.",
      summaryZh:
        "拿到星笛后，驯龙师们离阻止暗影龙遮蔽世界只差一步。他们必须先学会吹奏星笛并召唤星龙，而时间正在流逝。胜负并非依靠某一位英雄，而取决于大家能否把不同才能组合起来。",
      themesEn: ["music", "complementary talents", "urgency", "hope"],
      themesZh: ["音乐", "互补才能", "紧迫感", "希望"],
      dossierIds: ["drake", "star-flute", "star-dragon", "lysa", "rune", "chaya", "worm"]
    },
    {
      id: "dm-26",
      number: 26,
      titleEn: "Cave of the Crystal Dragon",
      titleZh: "水晶龙之洞",
      illustrator: "Graham Howells",
      arc: "dream-chaos",
      element: "crystal",
      emoji: "💎",
      accent: "#758b99",
      status: "summary-only",
      hookEn: "Griffith is missing, and a Crystal Dragon does not trust humans.",
      hookZh: "格里菲斯失踪，而水晶龙不信任人类。",
      summaryEn:
        "Griffith is in trouble, so Drake and Rori travel to Greenshire. They meet Llew, who uses a wheelchair and shows them the Crystal Cave where Griffith was last seen. Inside, the Crystal Dragon Belydor attacks them. Llew may be the only person able to earn the dragon's trust and help find the wizard.",
      summaryZh:
        "格里菲斯遇到危险，德雷克和罗莉赶往绿郡。他们遇到使用轮椅的少年卢，由他带领前往最后一次见到格里菲斯的水晶洞。洞中的水晶龙贝利多攻击众人，而卢也许是最有可能赢得龙信任、帮助找到巫师的人。",
      themesEn: ["trust", "accessibility", "rescue", "first impressions"],
      themesZh: ["信任", "无障碍", "营救", "第一印象"],
      dossierIds: ["drake", "rori", "griffith", "llew", "belydor", "crystal-cave", "worm", "vulcan"]
    },
    {
      id: "dm-27",
      number: 27,
      titleEn: "Haunting of the Ghost Dragon",
      titleZh: "幽灵龙作祟",
      illustrator: "Graham Howells",
      arc: "dream-chaos",
      element: "ghost",
      emoji: "👻",
      accent: "#7d8790",
      status: "summary-only",
      hookEn: "Zoltan steals a Dream Orb, and Gothica's Ghost Dragon guards the way.",
      hookZh: "佐尔坦偷走梦境宝珠，哥提卡的幽灵龙守着去路。",
      summaryEn:
        "The evil wizard Zoltan steals a Dream Orb that gives him access to the forbidden Dream World. Drake and Bo travel to Zoltan's castle in Gothica and meet keeper Sandor and the Ghost Dragon Phantom. They must decide whether Phantom is a ghost or a dragon, and stop Zoltan before he opens the Dream Gate.",
      summaryZh:
        "邪恶巫师佐尔坦偷走梦境宝珠，因而能够进入被禁止的梦境世界。德雷克和波前往哥提卡的巫师城堡，遇见驯龙师桑多尔与幽灵龙幻影。他们必须弄清幻影究竟是幽灵还是龙，并在佐尔坦打开梦境之门前阻止他。",
      themesEn: ["identity", "thresholds", "bravery", "dreams"],
      themesZh: ["身份", "界限", "勇气", "梦"],
      dossierIds: ["drake", "bo", "zoltan", "sandor", "phantom", "dream-orb", "gothica", "worm", "shu"]
    },
    {
      id: "dm-28",
      number: 28,
      titleEn: "Night of the Dream Dragon",
      titleZh: "梦龙之夜",
      illustrator: "Matt Loveridge",
      arc: "dream-chaos",
      element: "dream",
      emoji: "🌌",
      accent: "#6e789b",
      status: "summary-only",
      hookEn: "Zoltan hunts the Dream Fountain, where any dream can become real.",
      hookZh: "佐尔坦寻找梦境泉，那里任何梦都可能成真。",
      summaryEn:
        "Zoltan enters the Dream World without permission and searches for the Dream Fountain. Anyone who drinks from it can make dreams real. With the Dream Dragon Mamu and keeper Kishar, Drake and Worm chase Zoltan through a landscape shaped by imagination, where the wizard's true plan is still hidden.",
      summaryZh:
        "佐尔坦擅自闯入梦境世界，寻找能让梦想成真的梦境泉。德雷克与虫虫在梦龙玛姆和驯龙师基沙的帮助下追赶巫师。梦境风景随想象改变，而佐尔坦真正的计划仍藏在深处。",
      themesEn: ["imagination", "temptation", "self-knowledge", "dreams"],
      themesZh: ["想象", "诱惑", "自我认识", "梦境"],
      dossierIds: ["drake", "zoltan", "mamu", "kishar", "dream-world", "worm"]
    },
    {
      id: "dm-29",
      number: 29,
      titleEn: "Magic of the Wizard Dragon",
      titleZh: "巫师龙魔法",
      illustrator: "Graham Howells",
      arc: "dream-chaos",
      element: "wizard",
      emoji: "🪄",
      accent: "#4d7e7a",
      status: "summary-only",
      hookEn: "Zoltan has become a dragon and wants to free Maldred.",
      hookZh: "佐尔坦变成了龙，还想释放马尔德里德。",
      summaryEn:
        "Zoltan has transformed into a Wizard Dragon and plans to free the evil wizard Maldred. Drake and Worm meet Zoltan's son Wolfgang, who wants to stop his father. They travel to Barga and meet the Earth Dragon Kinguq and keeper Nanu, guardians of a secret door to the Naga, where Maldred is trapped.",
      summaryZh:
        "佐尔坦变成了“巫师龙”，计划释放邪恶巫师马尔德里德。德雷克与虫虫遇见想阻止父亲的沃尔夫冈。他们前往巴尔加，结识土龙金古克和驯龙师娜努；两人守护着通往娜迦的秘密门，而马尔德里德就被困在那里。",
      themesEn: ["family", "choice", "guarding power", "redemption"],
      themesZh: ["家人", "选择", "守护力量", "救赎"],
      dossierIds: ["drake", "zoltan", "wolfgang", "nanu", "kinguq", "naga", "maldred", "worm"]
    },
    {
      id: "dm-30",
      number: 30,
      titleEn: "Vortex of the Chaos Dragon",
      titleZh: "混沌龙旋涡",
      illustrator: "Graham Howells",
      arc: "dream-chaos",
      element: "chaos",
      emoji: "🌀",
      accent: "#a65345",
      status: "summary-only",
      hookEn: "One hundred mini-Maldreds spread chaos across the world.",
      hookZh: "一百个迷你马尔德里德把混乱撒向全世界。",
      summaryEn:
        "Maldred has become one hundred mini-Maldreds, and Dragon Masters everywhere are fighting them. Drake, Worm, Rori, Bo, Ana, and their dragons travel to Goryeo to meet the Chaos Dragon Seong-Min and keeper Ji-Min. Seong-Min may be the only dragon strong enough to stop the chaos, but even Ji-Min says he is difficult to control.",
      summaryZh:
        "马尔德里德分裂成一百个迷你巫师，世界各地的驯龙师都在迎战。德雷克、虫虫、罗莉、波、安娜和他们的龙前往高丽，寻找混沌龙成敏与驯龙师智敏。成敏也许是唯一强大到足以终结混乱的龙，但连智敏都承认它极难控制。",
      themesEn: ["chaos", "control", "trust", "global teamwork"],
      themesZh: ["混乱", "控制", "信任", "全球合作"],
      dossierIds: ["drake", "rori", "bo", "ana", "ji-min", "seong-min", "maldred", "goryeo", "worm", "vulcan", "shu", "kepri"]
    }
  ],

  dossiers: [
    {
      id: "drake",
      type: "person",
      emoji: "🧑‍🌾",
      nameEn: "Drake",
      nameZh: "德雷克",
      roleEn: "Earth Dragon keeper · central narrator",
      roleZh: "土龙驯龙师 · 故事核心视角",
      summaryEn:
        "A farmer's child chosen by the Dragon Stone. Drake's patience and empathy let him connect with the quiet Earth Dragon, Worm.",
      summaryZh:
        "被龙石选中的农家孩子。德雷克用耐心与同理心，与安静的土龙虫虫建立起深厚联系。"
    },
    {
      id: "ana",
      type: "person",
      emoji: "☀️",
      nameEn: "Ana",
      nameZh: "安娜",
      roleEn: "Keeper of the Sun Dragon Kepri",
      roleZh: "太阳龙凯普莉的驯龙师",
      summaryEn:
        "One of Drake's first fellow keepers. Her Sun Dragon can create light and rainbows.",
      summaryZh:
        "德雷克最早认识的伙伴之一，她的太阳龙能够制造光芒与彩虹。"
    },
    {
      id: "rori",
      type: "person",
      emoji: "🔥",
      nameEn: "Rori",
      nameZh: "罗莉",
      roleEn: "Keeper of the Fire Dragon Vulcan",
      roleZh: "火龙伏尔甘的驯龙师",
      summaryEn:
        "A confident keeper whose fire dragon can breathe powerful flame. Rori is often blunt but grows through shared danger.",
      summaryZh:
        "自信直率的驯龙师，伙伴是能喷出强大火焰的伏尔甘。她在共同冒险中不断成长。"
    },
    {
      id: "bo",
      type: "person",
      emoji: "💧",
      nameEn: "Bo",
      nameZh: "波",
      roleEn: "Keeper of the Water Dragon Shu",
      roleZh: "水龙舒的驯龙师",
      summaryEn:
        "Drake's friendly roommate and early writing teacher. Bo's calm Water Dragon can put out fire and shape water.",
      summaryZh:
        "德雷克友好的室友，也是教他写字的人。波的水龙舒能灭火并操控水流。"
    },
    {
      id: "griffith",
      type: "person",
      emoji: "🧙",
      nameEn: "Griffith",
      nameZh: "格里菲斯",
      roleEn: "King Roland's wizard · Dragon Master mentor",
      roleZh: "罗兰国王的巫师 · 驯龙师导师",
      summaryEn:
        "The wizard who gives Drake his Dragon Stone and explains the bond between keepers and dragons.",
      summaryZh:
        "把龙石交给德雷克的巫师，负责解释驯龙师与龙之间的联结。"
    },
    {
      id: "king-roland",
      type: "person",
      emoji: "👑",
      nameEn: "King Roland",
      nameZh: "罗兰国王",
      roleEn: "Ruler who gathers the Dragon Masters",
      roleZh: "召集驯龙师的国王",
      summaryEn:
        "King Roland needs trained dragons and their keepers. His demands create pressure and leave questions about how dragons are treated.",
      summaryZh:
        "罗兰国王需要训练有素的龙与驯龙师。他的要求给孩子们带来压力，也让“龙是否被公平对待”成为问题。"
    },
    {
      id: "queen-rose",
      type: "person",
      emoji: "🌹",
      nameEn: "Queen Rose",
      nameZh: "罗丝女王",
      roleEn: "Queen whose kingdom becomes part of the wider map",
      roleZh: "让故事地图扩展到新王国的女王",
      summaryEn:
        "Queen Rose's kingdom is visited by the Dragon Masters in Book 4, widening the political world of the series.",
      summaryZh:
        "第四册中，驯龙师们前往罗丝女王的王国，也让系列的世界格局进一步扩大。"
    },
    {
      id: "maldred",
      type: "person",
      emoji: "🖤",
      nameEn: "Maldred",
      nameZh: "马尔德里德",
      roleEn: "Dark wizard · recurring antagonist",
      roleZh: "黑暗巫师 · 长期对手",
      summaryEn:
        "A dark wizard who seeks dragons, keys, and magical power. His plans connect Books 4 through 30.",
      summaryZh:
        "追逐龙、钥匙与魔法力量的黑暗巫师，他的阴谋贯穿第四册到第三十册。"
    },
    {
      id: "petra",
      type: "person",
      emoji: "📚",
      nameEn: "Petra",
      nameZh: "佩特拉",
      roleEn: "Keeper of the four-headed Poison Dragon",
      roleZh: "四头毒龙的驯龙师",
      summaryEn:
        "A gifted but defensive new keeper who must trade perfection for connection and teamwork.",
      summaryZh:
        "聪明却把“什么都懂”当护甲的新驯龙师，必须学会放下完美主义，与伙伴建立联结。"
    },
    {
      id: "carlos",
      type: "person",
      emoji: "⚡",
      nameEn: "Carlos",
      nameZh: "卡洛斯",
      roleEn: "Keeper connected to the Lightning Dragon",
      roleZh: "与闪电龙相连的驯龙师",
      summaryEn:
        "A boy whose bond with a wild Lightning Dragon is central to Books 7 and 8.",
      summaryZh:
        "与狂野闪电龙建立联系的孩子，这段关系是第七、八册的重要线索。"
    },
    {
      id: "mina",
      type: "person",
      emoji: "❄️",
      nameEn: "Mina",
      nameZh: "米娜",
      roleEn: "Dragon Master from the Far North Lands",
      roleZh: "来自北方之地的驯龙师",
      summaryEn:
        "Mina escapes the Ice Giant's attack and brings news of a frozen kingdom to Bracken.",
      summaryZh:
        "米娜从冰巨人的袭击中逃出，把北方王国被冰封的消息带到布莱肯。"
    },
    {
      id: "eko",
      type: "person",
      emoji: "🌩️",
      nameEn: "Eko",
      nameZh: "埃科",
      roleEn: "Griffith's first Dragon Master",
      roleZh: "格里菲斯的第一位驯龙师",
      summaryEn:
        "Eko left with Thunder Dragon Neru and returns years later as a complicated threat and, eventually, someone who needs rescue.",
      summaryZh:
        "埃科曾带雷龙内鲁离开，多年后以复杂对手的身份归来，后来也成为需要被营救的人。"
    },
    {
      id: "darma",
      type: "person",
      emoji: "🏅",
      nameEn: "Darma",
      nameZh: "达尔玛",
      roleEn: "Keeper linked to the Gold Dragon",
      roleZh: "与金龙相连的驯龙师",
      summaryEn:
        "A new keeper met in the Gold Dragon story who later joins the mission beneath the Earth.",
      summaryZh:
        "在金龙故事中新登场的驯龙师，后来加入深入地心的任务。"
    },
    {
      id: "jean",
      type: "person",
      emoji: "🥈",
      nameEn: "Jean",
      nameZh: "琼",
      roleEn: "Keeper of the Silver Dragon Argent",
      roleZh: "银龙阿根特的驯龙师",
      summaryEn:
        "A guarded keeper whose trust must be earned before she joins the fight for the keys.",
      summaryZh:
        "谨慎的驯龙师，在加入钥匙争夺战以前，伙伴们必须先赢得她的信任。"
    },
    {
      id: "tessa",
      type: "person",
      emoji: "🎶",
      nameEn: "Tessa",
      nameZh: "泰莎",
      roleEn: "Keeper of the Sound Dragon Sono",
      roleZh: "音龙索诺的驯龙师",
      summaryEn:
        "A new keeper whose partnership with a Sound Dragon may help end a destructive wizard duel.",
      summaryZh:
        "与音龙搭档的新驯龙师，她的力量也许能结束一场破坏城市的巫师决斗。"
    },
    {
      id: "sem",
      type: "person",
      emoji: "🌼",
      nameEn: "Sem",
      nameZh: "塞姆",
      roleEn: "Keeper chosen for Bloom the Flower Dragon",
      roleZh: "花龙布卢姆选中的驯龙师",
      summaryEn:
        "A boy disappointed by a small dragon who learns that usefulness is not the same as size.",
      summaryZh:
        "因伙伴不是巨龙而失望的男孩，最终学会：价值与体型无关。"
    },
    {
      id: "caspar",
      type: "person",
      emoji: "🪨",
      nameEn: "Caspar",
      nameZh: "卡斯帕",
      roleEn: "Keeper of the Stone Dragon",
      roleZh: "石龙的驯龙师",
      summaryEn:
        "The keeper at the Fortress of the Stone Dragon, warned about Astrid's approach.",
      summaryZh:
        "驻守石龙堡垒的驯龙师，在阿斯特丽德逼近前收到警告。"
    },
    {
      id: "opeli",
      type: "person",
      emoji: "🌋",
      nameEn: "Opeli",
      nameZh: "奥佩莉",
      roleEn: "Keeper connected to the Lava Dragon",
      roleZh: "与熔岩龙相连的驯龙师",
      summaryEn:
        "A determined new keeper who helps the Dragon Masters reach the fiery Ka and later searches for the Sea Dragon.",
      summaryZh:
        "坚定勇敢的新驯龙师，帮助伙伴们接近熔岩龙卡，后来也参与寻找海龙。"
    },
    {
      id: "rune",
      type: "person",
      emoji: "🤟",
      nameEn: "Rune",
      nameZh: "鲁恩",
      roleEn: "Deaf keeper of the Light Dragon Lysa",
      roleZh: "光龙莱莎的聋人驯龙师",
      summaryEn:
        "Rune explains the Star Flute mission and shows that communication can take more than one form.",
      summaryZh:
        "鲁恩解释星笛任务，也让大家看见沟通并不只有一种方式。"
    },
    {
      id: "val",
      type: "person",
      emoji: "🫥",
      nameEn: "Val",
      nameZh: "瓦尔",
      roleEn: "Carlos's cousin · friend to an Invisible Dragon",
      roleZh: "卡洛斯的表亲 · 隐形龙的朋友",
      summaryEn:
        "Val travels to Dove Island and forms a bond with a baby Invisible Dragon.",
      summaryZh:
        "瓦尔前往鸽岛，并与一只隐形幼龙建立起特殊联系。"
    },
    {
      id: "llew",
      type: "person",
      emoji: "💎",
      nameEn: "Llew",
      nameZh: "卢",
      roleEn: "Wheelchair user · guide to the Crystal Cave",
      roleZh: "使用轮椅 · 水晶洞的引路人",
      summaryEn:
        "Llew knows the Crystal Cave and may be able to earn Belydor's trust when the Dragon Masters cannot.",
      summaryZh:
        "卢熟悉水晶洞，也许能在驯龙师们失败时赢得水晶龙贝利多的信任。"
    },
    {
      id: "sandor",
      type: "person",
      emoji: "👻",
      nameEn: "Sandor",
      nameZh: "桑多尔",
      roleEn: "Keeper of the Ghost Dragon Phantom",
      roleZh: "幽灵龙幻影的驯龙师",
      summaryEn:
        "A Gothica keeper whose dragon partner blurs the line between ghost and dragon.",
      summaryZh:
        "来自哥提卡的驯龙师，他的龙伙伴让“幽灵”和“龙”的界线变得模糊。"
    },
    {
      id: "kishar",
      type: "person",
      emoji: "🌌",
      nameEn: "Kishar",
      nameZh: "基沙",
      roleEn: "Keeper of the Dream Dragon Mamu",
      roleZh: "梦龙玛姆的驯龙师",
      summaryEn:
        "Kishar guides Drake and Worm through the Dream World in pursuit of Zoltan.",
      summaryZh:
        "基沙带领德雷克与虫虫穿过梦境世界，追赶佐尔坦。"
    },
    {
      id: "nanu",
      type: "person",
      emoji: "🛡️",
      nameEn: "Nanu",
      nameZh: "娜努",
      roleEn: "Keeper of the Earth Dragon Kinguq",
      roleZh: "土龙金古克的驯龙师",
      summaryEn:
        "A guardian of the secret door to the Naga and a key ally against the Wizard Dragon.",
      summaryZh:
        "守护娜迦秘密之门的驯龙师，也是对抗巫师龙的重要盟友。"
    },
    {
      id: "aruna",
      type: "person",
      emoji: "🌑",
      nameEn: "Aruna",
      nameZh: "阿鲁娜",
      roleEn: "Keeper of the Shadow Dragon Chaya",
      roleZh: "暗影龙查娅的驯龙师",
      summaryEn:
        "A keeper tied to the sky-shadow mystery. Her motives and Chaya's power drive Book 23.",
      summaryZh:
        "与天空暗影之谜相连的驯龙师，她与查娅的力量共同推动第二十三册。"
    },
    {
      id: "wolfgang",
      type: "person",
      emoji: "🪄",
      nameEn: "Wolfgang",
      nameZh: "沃尔夫冈",
      roleEn: "Zoltan's son · reluctant ally",
      roleZh: "佐尔坦的儿子 · 选择反抗的盟友",
      summaryEn:
        "Wolfgang wants to stop his father's plan and joins Drake in the mission at Barga.",
      summaryZh:
        "沃尔夫冈想阻止父亲的计划，并与德雷克一起前往巴尔加。"
    },
    {
      id: "ji-min",
      type: "person",
      emoji: "🌀",
      nameEn: "Ji-Min",
      nameZh: "智敏",
      roleEn: "Keeper of the Chaos Dragon Seong-Min",
      roleZh: "混沌龙成敏的驯龙师",
      summaryEn:
        "A keeper from Goryeo who understands both the power and danger of the Chaos Dragon.",
      summaryZh:
        "来自高丽的驯龙师，比任何人都明白混沌龙的力量与风险。"
    },
    {
      id: "quilla",
      type: "person",
      emoji: "🌬️",
      nameEn: "Quilla",
      nameZh: "基拉",
      roleEn: "Keeper of the Wind Dragon",
      roleZh: "风龙的驯龙师",
      summaryEn:
        "The Wind Dragon's keeper is held captive with her dragon when Drake and Rori search for the last dragon needed to undo Astrid's spell.",
      summaryZh:
        "德雷克与罗莉寻找解除阿斯特丽德咒语所需的最后一条龙时，发现基拉和她的风龙一同被囚禁。"
    },
    {
      id: "astrid",
      type: "person",
      emoji: "🧪",
      nameEn: "Astrid",
      nameZh: "阿斯特丽德",
      roleEn: "Power-hungry wizard · Books 17–20 antagonist",
      roleZh: "追逐力量的巫师 · 第 17–20 册对手",
      summaryEn:
        "Astrid gathers spell ingredients and plans the False Life spell, forcing the Dragon Masters to seek rare dragons.",
      summaryZh:
        "阿斯特丽德收集咒语材料并策划“伪生咒”，迫使驯龙师们寻找罕见龙种。"
    },
    {
      id: "zoltan",
      type: "person",
      emoji: "🌑",
      nameEn: "Zoltan",
      nameZh: "佐尔坦",
      roleEn: "Wizard · Dream World antagonist",
      roleZh: "巫师 · 梦境世界对手",
      summaryEn:
        "Zoltan seeks forbidden dream magic and later becomes a Wizard Dragon determined to free Maldred.",
      summaryZh:
        "佐尔坦追逐禁忌的梦境魔法，后来更变成巫师龙，执意释放马尔德里德。"
    },
    {
      id: "agrona",
      type: "person",
      emoji: "🧚",
      nameEn: "Agrona",
      nameZh: "阿格罗娜",
      roleEn: "Evil fairy queen in the continuation books",
      roleZh: "续篇中的邪恶仙灵女王",
      summaryEn:
        "A fairy queen whose return threatens the royal family in the verified continuation summaries.",
      summaryZh:
        "在已核实的续篇简介中，这位仙灵女王归来并威胁王室。"
    },
    {
      id: "worm",
      type: "dragon",
      emoji: "🐍",
      nameEn: "Worm",
      nameZh: "虫虫",
      roleEn: "Earth Dragon · Drake's partner",
      roleZh: "土龙 · 德雷克的伙伴",
      summaryEn:
        "Long, brown, snake-like, and easy to underestimate. Worm can share thoughts and eventually turns solid rock into dust.",
      summaryZh:
        "身体长而棕、像蛇一样，很容易被低估。虫虫能共享思想，最终还展现出把岩石化为尘土的能力。"
    },
    {
      id: "kepri",
      type: "dragon",
      emoji: "☀️",
      nameEn: "Kepri",
      nameZh: "凯普莉",
      roleEn: "Sun Dragon · Ana's partner",
      roleZh: "太阳龙 · 安娜的伙伴",
      summaryEn:
        "A Sun Dragon whose light can form a rainbow. Kepri becomes ill in Book 2, setting the first rescue mission in motion.",
      summaryZh:
        "能制造彩虹的太阳龙。第二册中凯普莉生病，开启了第一次救援任务。"
    },
    {
      id: "shu",
      type: "dragon",
      emoji: "💧",
      nameEn: "Shu",
      nameZh: "舒",
      roleEn: "Water Dragon · Bo's partner",
      roleZh: "水龙 · 波的伙伴",
      summaryEn:
        "A Water Dragon who can direct a stream strong enough to extinguish Vulcan's fire.",
      summaryZh:
        "能够操控水柱、足以熄灭伏尔甘火焰的水龙。"
    },
    {
      id: "vulcan",
      type: "dragon",
      emoji: "🔥",
      nameEn: "Vulcan",
      nameZh: "伏尔甘",
      roleEn: "Fire Dragon · Rori's partner",
      roleZh: "火龙 · 罗莉的伙伴",
      summaryEn:
        "A fire dragon who shoots two streams of flame from his nose.",
      summaryZh:
        "会从鼻孔喷出两道火焰的龙。"
    },
    {
      id: "poison-dragon",
      type: "dragon",
      emoji: "🐲",
      nameEn: "Poison Dragon",
      nameZh: "毒龙",
      roleEn: "Four-headed dragon · Petra's partner",
      roleZh: "四头龙 · 佩特拉的伙伴",
      summaryEn:
        "A four-headed Poison Dragon. Its song can heal the poisoning it causes. Published secondary sources disagree on its name, so the verified summary keeps the title-based description.",
      summaryZh:
        "拥有四个头的毒龙，它的歌声能治愈自己造成的毒伤。二手资料对它的具体名字说法不一，因此这里只保留已核实的“毒龙”描述。"
    },
    {
      id: "wati",
      type: "dragon",
      emoji: "🌙",
      nameEn: "Wati",
      nameZh: "瓦蒂",
      roleEn: "Moon Dragon · Heru's partner",
      roleZh: "月龙 · 赫鲁的伙伴",
      summaryEn:
        "A Moon Dragon from the Land of Pyramids who helps the keepers seek the prime Dragon Stone.",
      summaryZh:
        "来自金字塔之地的月龙，帮助驯龙师们寻找主龙石。"
    },
    {
      id: "lightning-dragon",
      type: "dragon",
      emoji: "⚡",
      nameEn: "Lightning Dragon",
      nameZh: "闪电龙",
      roleEn: "Young and dangerous spark-shooter",
      roleZh: "年轻又危险的放电龙",
      summaryEn:
        "A wild Lightning Dragon whose energy can hurt people. Carlos is the keeper most likely to reach him.",
      summaryZh:
        "力量狂野、电流会伤人的闪电龙。卡洛斯是最有可能与它建立联系的驯龙师。"
    },
    {
      id: "lalo",
      type: "dragon",
      emoji: "🍼",
      nameEn: "Lalo",
      nameZh: "拉洛",
      roleEn: "Baby Lightning Dragon",
      roleZh: "闪电龙宝宝",
      summaryEn:
        "The baby Lightning Dragon kidnapped by Eko in Book 8, creating a rescue mission.",
      summaryZh:
        "第八册中被埃科抓走的闪电龙宝宝，也是营救任务的核心。"
    },
    {
      id: "neru",
      type: "dragon",
      emoji: "🌩️",
      nameEn: "Neru",
      nameZh: "内鲁",
      roleEn: "Thunder Dragon · Eko's partner",
      roleZh: "雷龙 · 埃科的伙伴",
      summaryEn:
        "Eko's Thunder Dragon, absent with her for years before returning in Book 8.",
      summaryZh:
        "埃科的雷龙，曾随她离开多年，后在第八册归来。"
    },
    {
      id: "ice-dragon",
      type: "dragon",
      emoji: "❄️",
      nameEn: "Ice Dragon",
      nameZh: "冰龙",
      roleEn: "Dragon of cold and the Far North",
      roleZh: "寒冷与北方之地的龙",
      summaryEn:
        "An Ice Dragon associated with the frozen Far North and the magical Ice Giant crisis.",
      summaryZh:
        "与冰封的北方之地和魔法冰巨人危机相关的冰龙。"
    },
    {
      id: "ice-giant",
      type: "dragon",
      emoji: "🧊",
      nameEn: "The Ice Giant",
      nameZh: "冰巨人",
      roleEn: "Magical giant · Book 9 threat",
      roleZh: "魔法巨人 · 第九册威胁",
      summaryEn:
        "A magical giant who freezes Mina's kingdom. Only a fire dragon can defeat it.",
      summaryZh:
        "冰封米娜王国的魔法巨人，只有火龙能够击败它。"
    },
    {
      id: "dayo",
      type: "dragon",
      emoji: "🌈",
      nameEn: "Dayo",
      nameZh: "达约",
      roleEn: "Rainbow Dragon trapped by a giant spider",
      roleZh: "被巨蛛困住的彩虹龙",
      summaryEn:
        "A Rainbow Dragon whose dream call sends Drake and Ana toward a new keeper and a rescue.",
      summaryZh:
        "通过梦境向德雷克求救的彩虹龙，引领伙伴们找到新驯龙师并展开营救。"
    },
    {
      id: "argent",
      type: "dragon",
      emoji: "🥈",
      nameEn: "Argent",
      nameZh: "阿根特",
      roleEn: "Silver Dragon · guardian of a key",
      roleZh: "银龙 · 钥匙守护者",
      summaryEn:
        "A Silver Dragon who guards the first key to the Naga.",
      summaryZh:
        "守护娜迦第一把钥匙的银龙。"
    },
    {
      id: "gold-dragon",
      type: "dragon",
      emoji: "🏅",
      nameEn: "The Gold Dragon",
      nameZh: "金龙",
      roleEn: "Guardian of the Gold Key",
      roleZh: "金钥匙守护者",
      summaryEn:
        "The Gold Dragon whose lair holds the second key to the Naga.",
      summaryZh:
        "巢穴中藏着娜迦第二把钥匙的金龙。"
    },
    {
      id: "naga",
      type: "dragon",
      emoji: "🌋",
      nameEn: "Naga",
      nameZh: "娜迦",
      roleEn: "Enormous Earthquake Dragon",
      roleZh: "巨大的地震龙",
      summaryEn:
        "A vast dragon deep within the Earth whose power can cause terrible earthquakes. Two keys can control it.",
      summaryZh:
        "沉睡在地球深处的巨龙，力量会引发可怕地震，需要两把钥匙才能操控。"
    },
    {
      id: "fallyn",
      type: "dragon",
      emoji: "🌿",
      nameEn: "Fallyn",
      nameZh: "法琳",
      roleEn: "Spring Dragon · restorer of growth",
      roleZh: "春龙 · 复苏生长的力量",
      summaryEn:
        "A Spring Dragon who can restore farmland and lives in a trick-filled fairy world.",
      summaryZh:
        "能让农田重新生长的春龙，住在充满谜题与诡计的仙灵世界。"
    },
    {
      id: "time-dragon",
      type: "dragon",
      emoji: "⏳",
      nameEn: "The Time Dragon",
      nameZh: "时间龙",
      roleEn: "Dragon tied to time travel",
      roleZh: "与时间旅行相连的龙",
      summaryEn:
        "The Time Dragon is sought to free Eko. Its story sends Drake into his own past.",
      summaryZh:
        "众人为救埃科而寻找时间龙，它的力量却把德雷克送回自己的过去。"
    },
    {
      id: "sono",
      type: "dragon",
      emoji: "🎶",
      nameEn: "Sono",
      nameZh: "索诺",
      roleEn: "Sound Dragon · Tessa's partner",
      roleZh: "音龙 · 泰莎的伙伴",
      summaryEn:
        "A Sound Dragon whose abilities are tied to ending the wizard duel threatening Remus.",
      summaryZh:
        "以声音为力量来源的龙，能力与终结雷穆斯城的巫师决斗有关。"
    },
    {
      id: "stone-dragon",
      type: "dragon",
      emoji: "🪨",
      nameEn: "The Stone Dragon",
      nameZh: "石龙",
      roleEn: "Dragon of Caspar's fortress",
      roleZh: "卡斯帕堡垒的守护龙",
      summaryEn:
        "A Stone Dragon at the fortress Astrid approaches in Book 17.",
      summaryZh:
        "驻守堡垒的石龙，在第十七册中直面阿斯特丽德的威胁。"
    },
    {
      id: "ka",
      type: "dragon",
      emoji: "🌋",
      nameEn: "Ka",
      nameZh: "卡",
      roleEn: "Feared Lava Dragon · Opeli's partner",
      roleZh: "令人畏惧的熔岩龙 · 奥佩莉的伙伴",
      summaryEn:
        "A Lava Dragon whose heat may help undo Astrid's petrifying magic.",
      summaryZh:
        "以炽热力量对抗阿斯特丽德石化魔法的熔岩龙。"
    },
    {
      id: "sea-dragon",
      type: "dragon",
      emoji: "🌊",
      nameEn: "The Sea Dragon",
      nameZh: "海龙",
      roleEn: "Enormous ocean dragon",
      roleZh: "巨大的海洋龙",
      summaryEn:
        "One of three special dragons needed to undo the False Life spell. Verified summaries describe it as enormous and dangerous.",
      summaryZh:
        "解除“伪生咒”所需的三条特殊龙之一。已核实资料称它巨大且危险。"
    },
    {
      id: "wind-dragon",
      type: "dragon",
      emoji: "🌬️",
      nameEn: "The Wind Dragon",
      nameZh: "风龙",
      roleEn: "Captive dragon · Quilla's partner",
      roleZh: "被囚禁的龙 · 基拉的伙伴",
      summaryEn:
        "The final dragon needed to undo the False Life spell. She and her keeper are held captive.",
      summaryZh:
        "解除“伪生咒”所需的最后一条龙，她与驯龙师都被囚禁。"
    },
    {
      id: "bloom",
      type: "dragon",
      emoji: "🌼",
      nameEn: "Bloom",
      nameZh: "布卢姆",
      roleEn: "Small Flower Dragon · Sem's partner",
      roleZh: "小花龙 · 塞姆的伙伴",
      summaryEn:
        "A Flower Dragon from a threatened kingdom who proves that small size can hide great value.",
      summaryZh:
        "来自受威胁花龙王国的伙伴，证明小小的身体也能拥有巨大价值。"
    },
    {
      id: "invisible-dragon",
      type: "dragon",
      emoji: "🫥",
      nameEn: "Invisible Dragons",
      nameZh: "隐形龙",
      roleEn: "Hatchlings in need of the Dragon Tree",
      roleZh: "需要龙树果实的幼龙",
      summaryEn:
        "A nest of Invisible Dragon hatchlings whose powers depend on fruit from the magical Dragon Tree.",
      summaryZh:
        "一窝隐形幼龙，它们的能力依赖魔法龙树果实来维持。"
    },
    {
      id: "chaya",
      type: "dragon",
      emoji: "🌑",
      nameEn: "Chaya",
      nameZh: "查娅",
      roleEn: "Shadow Dragon · source of the sky-shadow",
      roleZh: "暗影龙 · 天空暗影的源头",
      summaryEn:
        "A Shadow Dragon whose power spreads a sky-shadow and drains magic from wizards.",
      summaryZh:
        "力量制造天空暗影，并让世界各地巫师逐渐失去魔法的暗影龙。"
    },
    {
      id: "shadow-dragon",
      type: "dragon",
      emoji: "🌒",
      nameEn: "The Shadow Dragon",
      nameZh: "暗影龙",
      roleEn: "Dragon behind the spreading sky-shadow",
      roleZh: "制造蔓延天空暗影的龙",
      summaryEn:
        "The Shadow Dragon is the force behind a sky-shadow that spreads across the kingdoms. Drake and Jean investigate the dragon, her keeper, and the source of her unusual power.",
      summaryZh:
        "暗影龙正是让天空暗影蔓延诸国的力量来源。德雷克与琼一起调查这条龙、它的驯龙师以及异常力量的源头。"
    },
    {
      id: "lysa",
      type: "dragon",
      emoji: "🌅",
      nameEn: "Lysa",
      nameZh: "莱莎",
      roleEn: "Light Dragon · Rune's partner",
      roleZh: "光龙 · 鲁恩的伙伴",
      summaryEn:
        "A Light Dragon whose keeper explains the Star Flute mission.",
      summaryZh:
        "由鲁恩搭档的光龙，也是星笛任务的重要线索来源。"
    },
    {
      id: "star-dragon",
      type: "dragon",
      emoji: "⭐",
      nameEn: "The Star Dragon",
      nameZh: "星龙",
      roleEn: "Dragon summoned by the Star Flute",
      roleZh: "由星笛召唤的龙",
      summaryEn:
        "A dragon tied to the Star Flute and the final attempt to end the sky-shadow.",
      summaryZh:
        "与星笛紧密相连，是终结天空暗影的关键龙族。"
    },
    {
      id: "belydor",
      type: "dragon",
      emoji: "💎",
      nameEn: "Belydor",
      nameZh: "贝利多",
      roleEn: "Crystal Dragon who distrusts humans",
      roleZh: "不信任人类的水晶龙",
      summaryEn:
        "A Crystal Dragon who attacks intruders in the Crystal Cave. Earning trust is the true challenge.",
      summaryZh:
        "在水晶洞攻击闯入者的水晶龙，真正的难题是赢得它的信任。"
    },
    {
      id: "phantom",
      type: "dragon",
      emoji: "👻",
      nameEn: "Phantom",
      nameZh: "幻影",
      roleEn: "Ghost Dragon · Sandor's partner",
      roleZh: "幽灵龙 · 桑多尔的伙伴",
      summaryEn:
        "A Ghost Dragon whose nature is deliberately uncertain: is Phantom a ghost or a dragon?",
      summaryZh:
        "身份刻意保持神秘的幽灵龙：幻影究竟是幽灵，还是龙？"
    },
    {
      id: "mamu",
      type: "dragon",
      emoji: "🌌",
      nameEn: "Mamu",
      nameZh: "玛姆",
      roleEn: "Dream Dragon · Kishar's partner",
      roleZh: "梦龙 · 基沙的伙伴",
      summaryEn:
        "A Dream Dragon who helps navigate the forbidden Dream World.",
      summaryZh:
        "帮助伙伴穿越禁忌梦境世界的梦龙。"
    },
    {
      id: "kinguq",
      type: "dragon",
      emoji: "🛡️",
      nameEn: "Kinguq",
      nameZh: "金古克",
      roleEn: "Earth Dragon · Nanu's partner",
      roleZh: "土龙 · 娜努的伙伴",
      summaryEn:
        "An Earth Dragon who guards the secret door to the Naga with Nanu.",
      summaryZh:
        "与娜努一起守护娜迦秘密之门的土龙。"
    },
    {
      id: "seong-min",
      type: "dragon",
      emoji: "🌀",
      nameEn: "Seong-Min",
      nameZh: "成敏",
      roleEn: "Chaos Dragon · Ji-Min's partner",
      roleZh: "混沌龙 · 智敏的伙伴",
      summaryEn:
        "A Chaos Dragon from Goryeo powerful enough to challenge the mini-Maldreds, but hard to control.",
      summaryZh:
        "来自高丽的混沌龙，强大到可能终结迷你马尔德里德，却极难控制。"
    },
    {
      id: "swamp-dragon",
      type: "dragon",
      emoji: "🐊",
      nameEn: "Swamp Dragon",
      nameZh: "沼泽龙",
      roleEn: "Misunderstood dragon in the continuation",
      roleZh: "续篇中被误解的龙",
      summaryEn:
        "In the verified continuation, villagers mistake a captured Swamp Dragon for a threat while it tries to warn them about a monster.",
      summaryZh:
        "在已核实的续篇中，被村民误认为威胁的沼泽龙，其实是在警告沼泽里的怪兽。"
    },
    {
      id: "ruby-dragon",
      type: "dragon",
      emoji: "❤️",
      nameEn: "Ruby Dragon",
      nameZh: "红宝石龙",
      roleEn: "Gem dragon in the Agrona continuation",
      roleZh: "阿格罗娜续篇中的宝石龙",
      summaryEn:
        "A Ruby Dragon in the Land of Peace whose heart gem is needed to repair the enchanted crown.",
      summaryZh:
        "生活在和平之地的红宝石龙，它的心形宝石是修复魔法王冠所需之物。"
    },
    {
      id: "diamond-dragon",
      type: "dragon",
      emoji: "💎",
      nameEn: "Diamond Dragon",
      nameZh: "钻石龙",
      roleEn: "Gem dragon poisoned by Agrona's warrior",
      roleZh: "被阿格罗娜手下毒伤的宝石龙",
      summaryEn:
        "A Diamond Dragon whose claw is needed for the crown, and whose poisoning sends the keepers into the Fairy World.",
      summaryZh:
        "王冠所需的钻石爪属于这条龙；它中毒后，驯龙师们不得不进入仙灵世界寻找解药。"
    },
    {
      id: "bracken-castle",
      type: "place",
      emoji: "🏰",
      nameEn: "King Roland's Castle",
      nameZh: "罗兰国王的城堡",
      roleEn: "Home base of the Dragon Masters",
      roleZh: "驯龙师的主要基地",
      summaryEn:
        "The castle where Drake first sees dragon art, receives Worm, trains with the other keepers, and begins the series.",
      summaryZh:
        "德雷克第一次看见龙的画像、得到虫虫并与其他伙伴训练的地方，也是系列故事的起点。"
    },
    {
      id: "pyramid-seven",
      type: "place",
      emoji: "🔺",
      nameEn: "Pyramid of the Seven Dragons",
      nameZh: "七龙金字塔",
      roleEn: "Puzzle site in the Land of Pyramids",
      roleZh: "金字塔之地的谜题遗址",
      summaryEn:
        "A hidden pyramid reached through a chain of puzzles in the search for the prime Dragon Stone.",
      summaryZh:
        "寻找主龙石时必须连续破解谜题才能到达的隐秘金字塔。"
    },
    {
      id: "far-north",
      type: "place",
      emoji: "🧊",
      nameEn: "The Far North Lands",
      nameZh: "北方之地",
      roleEn: "Frozen kingdom of Mina",
      roleZh: "米娜被冰封的王国",
      summaryEn:
        "Mina's homeland, frozen by a magical Ice Giant in Book 9.",
      summaryZh:
        "米娜的故乡，在第九册中被魔法冰巨人冰封。"
    },
    {
      id: "fairy-world",
      type: "place",
      emoji: "🧚",
      nameEn: "The Fairy World",
      nameZh: "仙灵世界",
      roleEn: "Realm of tests, riddles, and hidden growth",
      roleZh: "充满测试、谜题与生长力量的世界",
      summaryEn:
        "A hidden realm where the Spring Dragon lives and appearances cannot be trusted.",
      summaryZh:
        "春龙居住的隐秘世界，那里的一切都不能只看表面。"
    },
    {
      id: "remus",
      type: "place",
      emoji: "🏛️",
      nameEn: "Remus",
      nameZh: "雷穆斯城",
      roleEn: "City damaged by a wizard duel",
      roleZh: "被巫师决斗破坏的城市",
      summaryEn:
        "A city endangered by uncontrolled magic in Book 16.",
      summaryZh:
        "在第十六册中被失控魔法危及的城市。"
    },
    {
      id: "gothica",
      type: "place",
      emoji: "🦇",
      nameEn: "Gothica",
      nameZh: "哥提卡",
      roleEn: "Zoltan's castle region",
      roleZh: "佐尔坦城堡所在地区",
      summaryEn:
        "The home of Zoltan's castle and the Ghost Dragon story.",
      summaryZh:
        "佐尔坦城堡与幽灵龙故事所在的地方。"
    },
    {
      id: "dove-island",
      type: "place",
      emoji: "🏝️",
      nameEn: "Dove Island",
      nameZh: "鸽岛",
      roleEn: "Dangerous island of the Dragon Tree",
      roleZh: "生长龙树的危险岛屿",
      summaryEn:
        "The dangerous island where the magical Dragon Tree grows.",
      summaryZh:
        "魔法龙树生长的危险岛屿。"
    },
    {
      id: "crystal-cave",
      type: "place",
      emoji: "💎",
      nameEn: "The Crystal Cave",
      nameZh: "水晶洞",
      roleEn: "Belydor's cavern in Greenshire",
      roleZh: "绿郡中贝利多的洞穴",
      summaryEn:
        "The cave where Griffith was last seen and where Belydor guards the crystals.",
      summaryZh:
        "格里菲斯最后一次现身的地方，也是贝利多守护水晶的洞穴。"
    },
    {
      id: "dream-world",
      type: "place",
      emoji: "🌌",
      nameEn: "The Dream World",
      nameZh: "梦境世界",
      roleEn: "Forbidden realm of imagination",
      roleZh: "被禁止进入的想象世界",
      summaryEn:
        "A forbidden realm containing the Dream Fountain, where dreams can be made real.",
      summaryZh:
        "包含梦境泉的禁忌领域，在那里梦想可能化为现实。"
    },
    {
      id: "goryeo",
      type: "place",
      emoji: "🗺️",
      nameEn: "Goryeo",
      nameZh: "高丽",
      roleEn: "Home of the Chaos Dragon",
      roleZh: "混沌龙的故乡",
      summaryEn:
        "The destination where Drake and his friends seek Ji-Min and Seong-Min in Book 30.",
      summaryZh:
        "第三十册中，德雷克与伙伴们寻找智敏和成敏的目的地。"
    },
    {
      id: "dragon-stone",
      type: "artifact",
      emoji: "🔮",
      nameEn: "Dragon Stone",
      nameZh: "龙石",
      roleEn: "Stone that identifies and connects keepers",
      roleZh: "寻找并连接驯龙师的石头",
      summaryEn:
        "A magical stone that chose Drake for his dragon heart and helps keepers connect with their dragons.",
      summaryZh:
        "因德雷克拥有龙之心而选中他的魔法石，也能帮助驯龙师与龙建立联系。"
    },
    {
      id: "prime-stone",
      type: "artifact",
      emoji: "✨",
      nameEn: "The Prime Dragon Stone",
      nameZh: "主龙石",
      roleEn: "Source stone for every keeper bond",
      roleZh: "维系所有驯龙师联结的源头",
      summaryEn:
        "The great stone whose fading power could sever every keeper's connection to a dragon.",
      summaryZh:
        "一块巨大的龙石，一旦失去力量，所有驯龙师与龙的联系都可能断绝。"
    },
    {
      id: "silver-key",
      type: "artifact",
      emoji: "🗝️",
      nameEn: "The Silver Key",
      nameZh: "银钥匙",
      roleEn: "First key to the Naga",
      roleZh: "控制娜迦的第一把钥匙",
      summaryEn:
        "One of two keys guarded by the Silver Dragon Argent.",
      summaryZh:
        "两把关键钥匙之一，由银龙阿根特守护。"
    },
    {
      id: "gold-key",
      type: "artifact",
      emoji: "🔑",
      nameEn: "The Gold Key",
      nameZh: "金钥匙",
      roleEn: "Second key to the Naga",
      roleZh: "控制娜迦的第二把钥匙",
      summaryEn:
        "A key hidden in the Gold Dragon's lair. Together with the Silver Key, it can control the Naga.",
      summaryZh:
        "藏在金龙巢穴中的钥匙，与银钥匙合在一起便能操控娜迦。"
    },
    {
      id: "star-flute",
      type: "artifact",
      emoji: "🎼",
      nameEn: "The Star Flute",
      nameZh: "星笛",
      roleEn: "Instrument that summons the Star Dragon",
      roleZh: "召唤星龙的乐器",
      summaryEn:
        "A flute hidden in a labyrinth that can summon the Star Dragon against the sky-shadow.",
      summaryZh:
        "藏在迷宫中的笛子，能够召唤星龙对抗天空暗影。"
    },
    {
      id: "dream-orb",
      type: "artifact",
      emoji: "🟣",
      nameEn: "The Dream Orb",
      nameZh: "梦境宝珠",
      roleEn: "Key to the forbidden Dream World",
      roleZh: "进入禁忌梦境世界的钥匙",
      summaryEn:
        "An orb stolen by Zoltan that gives a wizard access to the Dream World.",
      summaryZh:
        "被佐尔坦偷走的宝珠，能让巫师进入梦境世界。"
    },
    {
      id: "dragon-tree",
      type: "artifact",
      emoji: "🌳",
      nameEn: "The Dragon Tree",
      nameZh: "龙树",
      roleEn: "Source of fruit that sustains Invisible Dragons",
      roleZh: "维持隐形龙能力的果实来源",
      summaryEn:
        "A magical tree on Dove Island whose fruit keeps the Invisible Dragons' powers alive.",
      summaryZh:
        "生长在鸽岛上的魔法树，它的果实能维持隐形龙的能力。"
    },
    {
      id: "enchanted-crown",
      type: "artifact",
      emoji: "👑",
      nameEn: "The Enchanted Crown",
      nameZh: "魔法王冠",
      roleEn: "Crown used to contain Agrona",
      roleZh: "用于困住阿格罗娜的王冠",
      summaryEn:
        "A crown requiring gems from several dragons to trap the escaped fairy queen Agrona.",
      summaryZh:
        "需要多颗龙宝石修复的王冠，用来重新困住逃出的仙灵女王阿格罗娜。"
    },
    {
      id: "ruby-gem",
      type: "artifact",
      emoji: "❤️",
      nameEn: "The Ruby Heart Gem",
      nameZh: "红宝石心",
      roleEn: "First gem of the enchanted crown",
      roleZh: "魔法王冠的第一颗宝石",
      summaryEn:
        "The Ruby Dragon's heart gem, guarded by a riddle in the Land of Peace.",
      summaryZh:
        "红宝石龙的心形宝石，在和平之地由一道谜题守护。"
    },
    {
      id: "diamond-gem",
      type: "artifact",
      emoji: "💎",
      nameEn: "The Diamond Claw",
      nameZh: "钻石龙爪",
      roleEn: "Gem needed to repair the crown",
      roleZh: "修复王冠所需的龙爪宝石",
      summaryEn:
        "The Diamond Dragon's claw, needed alongside other gems to restore the crown.",
      summaryZh:
        "与其他宝石一起修复王冠所需的钻石龙爪。"
    }
  ],

  vocabulary: [
    {
      word: "heart",
      ipa: "/hɑːrt/",
      emoji: "💚",
      meaningEn: "the part of us that feels courage, kindness, and love",
      meaningZh: "感受勇气、善意与爱的内心",
      contextEn: "The Dragon Stone chose Drake because he had a dragon heart.",
      contextZh: "龙石因德雷克拥有一颗龙之心而选中了他。"
    },
    {
      word: "bond",
      ipa: "/bɑːnd/",
      emoji: "🔗",
      meaningEn: "a close connection between two beings",
      meaningZh: "两个生命之间亲密的联结",
      contextEn: "A Dragon Master and a dragon build a bond through trust.",
      contextZh: "驯龙师与龙通过信任建立联结。"
    },
    {
      word: "power",
      ipa: "/ˈpaʊ.ɚ/",
      emoji: "✨",
      meaningEn: "a special ability",
      meaningZh: "特殊能力",
      contextEn: "Every dragon has a special power to discover.",
      contextZh: "每条龙都有待发现的特殊能力。"
    },
    {
      word: "wizard",
      ipa: "/ˈwɪz.ɚd/",
      emoji: "🧙",
      meaningEn: "a person who uses magic",
      meaningZh: "会使用魔法的人",
      contextEn: "Griffith is the king's wizard.",
      contextZh: "格里菲斯是国王的巫师。"
    },
    {
      word: "guardian",
      ipa: "/ˈɡɑːr.di.ən/",
      emoji: "🛡️",
      meaningEn: "someone who protects a person or place",
      meaningZh: "守护者",
      contextEn: "The Silver Dragon is a guardian of a key.",
      contextZh: "银龙是一把钥匙的守护者。"
    },
    {
      word: "courage",
      ipa: "/ˈkɝː.ɪdʒ/",
      emoji: "🦁",
      meaningEn: "choosing to act even when you feel afraid",
      meaningZh: "即使害怕也选择行动",
      contextEn: "Courage can be one small step with help nearby.",
      contextZh: "勇气可以是在有人陪伴时迈出的一小步。"
    },
    {
      word: "rescue",
      ipa: "/ˈres.kjuː/",
      emoji: "🪢",
      meaningEn: "to save someone from danger",
      meaningZh: "把某人从危险中救出",
      contextEn: "The Dragon Masters rescue a trapped dragon.",
      contextZh: "驯龙师们营救一条被困的龙。"
    },
    {
      word: "riddle",
      ipa: "/ˈrɪd.əl/",
      emoji: "🧩",
      meaningEn: "a puzzle made of words or clues",
      meaningZh: "由文字或线索构成的谜题",
      contextEn: "The keepers solve a riddle to enter the pyramid.",
      contextZh: "驯龙师们解开谜题才能进入金字塔。"
    }
  ],

  pairings: [
    {
      id: "pair-worm",
      dragonId: "worm",
      masterId: "drake",
      clueEn: "A quiet Earth Dragon with green eyes",
      clueZh: "一条眼睛碧绿、安静低调的土龙"
    },
    {
      id: "pair-kepri",
      dragonId: "kepri",
      masterId: "ana",
      clueEn: "A Sun Dragon who can make a rainbow",
      clueZh: "一条能制造彩虹的太阳龙"
    },
    {
      id: "pair-shu",
      dragonId: "shu",
      masterId: "bo",
      clueEn: "A Water Dragon who can put out fire",
      clueZh: "一条能灭火的水龙"
    },
    {
      id: "pair-vulcan",
      dragonId: "vulcan",
      masterId: "rori",
      clueEn: "A Fire Dragon with two streams of flame",
      clueZh: "一条会喷两道火焰的火龙"
    },
    {
      id: "pair-argent",
      dragonId: "argent",
      masterId: "jean",
      clueEn: "A Silver Dragon guarding a key",
      clueZh: "一条守护钥匙的银龙"
    },
    {
      id: "pair-sono",
      dragonId: "sono",
      masterId: "tessa",
      clueEn: "A Sound Dragon in a city of wizard magic",
      clueZh: "一条与巫师之城相关的音龙"
    },
    {
      id: "pair-bloom",
      dragonId: "bloom",
      masterId: "sem",
      clueEn: "A small Flower Dragon with a big task",
      clueZh: "一条肩负大任务的小花龙"
    },
    {
      id: "pair-seong-min",
      dragonId: "seong-min",
      masterId: "ji-min",
      clueEn: "A Chaos Dragon from Goryeo",
      clueZh: "一条来自高丽的混沌龙"
    }
  ],

  timeline: {
    order: ["dm-01", "dm-06", "dm-10", "dm-17", "dm-23", "dm-30"],
    items: [
      {
        id: "dm-01",
        labelEn: "Drake meets Worm and the first four keepers",
        labelZh: "德雷克遇见虫虫与最初的伙伴"
      },
      {
        id: "dm-06",
        labelEn: "The keepers save the prime Dragon Stone",
        labelZh: "驯龙师们拯救主龙石"
      },
      {
        id: "dm-10",
        labelEn: "A dream leads to the Rainbow Dragon",
        labelZh: "一场梦引出彩虹龙"
      },
      {
        id: "dm-17",
        labelEn: "Astrid's dangerous spell begins",
        labelZh: "阿斯特丽德的危险咒语开始"
      },
      {
        id: "dm-23",
        labelEn: "The sky-shadow covers the kingdoms",
        labelZh: "天空暗影笼罩诸国"
      },
      {
        id: "dm-30",
        labelEn: "The Chaos Dragon faces the mini-Maldreds",
        labelZh: "混沌龙迎战迷你马尔德里德"
      }
    ]
  },

  missions: [
    {
      id: "new-group",
      emoji: "🎒",
      titleEn: "A New Group",
      titleZh: "加入新小组",
      promptEn:
        "You join a new class and already know the answer. A classmate gives a different idea. What keeps curiosity and teamwork alive?",
      promptZh:
        "你加入新班级，恰好知道答案，但同学提出了不同想法。怎样做既保持好奇，也能合作？",
      choices: [
        {
          en: "Say, “That's wrong,” and stop listening.",
          zh: "直接说“你错了”，不再听对方。"
        },
        {
          en: "Explain your idea, ask how theirs works, and test both.",
          zh: "说清自己的想法，听听对方怎么做，再一起验证。"
        },
        {
          en: "Stay silent so nobody notices you.",
          zh: "保持沉默，尽量不让别人注意自己。"
        }
      ],
      answer: 1,
      explanationEn:
        "Petra's hardest lesson is that being clever is not the same as being a good partner. Listening makes a team stronger.",
      explanationZh:
        "佩特拉最难的功课，是明白“聪明”不等于“会合作”。认真倾听会让团队更强。"
    },
    {
      id: "animal-trust",
      emoji: "🐕",
      titleEn: "Earn Trust",
      titleZh: "赢得信任",
      promptEn:
        "A nervous animal is watching you from behind a gate. What is the safest and kindest first move?",
      promptZh:
        "一只紧张的动物躲在栅栏后看着你。怎样做最安全，也最友善？",
      choices: [
        {
          en: "Reach over the gate and grab it.",
          zh: "越过栅栏直接去抓它。"
        },
        {
          en: "Stay low and quiet, let it choose, and ask its keeper first.",
          zh: "安静蹲下，让它自己选择是否靠近，并先询问照料者。"
        },
        {
          en: "Shout so it knows you are friendly.",
          zh: "大声喊叫，让它知道你很友好。"
        }
      ],
      answer: 1,
      explanationEn:
        "Trust grows with choice, calm bodies, and adult guidance. A dragon bond is a story idea; real animals need real safety rules.",
      explanationZh:
        "信任来自选择、安静的身体和大人指导。故事里的驭龙很神奇，现实中的动物必须遵守安全规则。"
    },
    {
      id: "team-role",
      emoji: "🧩",
      titleEn: "The Smallest Clue",
      titleZh: "最小的线索",
      promptEn:
        "Your team is solving a puzzle. Your idea seems less exciting than someone else's. What do you do?",
      promptZh:
        "小组正在解谜，你的想法看起来没有别人的那么“厉害”。你会怎么做？",
      choices: [
        {
          en: "Throw the idea away because it is not flashy.",
          zh: "因为不够炫，就把自己的想法丢掉。"
        },
        {
          en: "Share it as one clue, then test it with the whole team.",
          zh: "把它作为一条线索说出来，再和全组一起验证。"
        },
        {
          en: "Let one person decide everything.",
          zh: "让一个人决定所有事情。"
        }
      ],
      answer: 1,
      explanationEn:
        "Bloom and Worm both remind us that quiet abilities can solve the problem everyone else missed.",
      explanationZh:
        "布卢姆和虫虫都提醒我们：安静的能力，也可能解决所有人都忽略的问题。"
    }
  ],

  coreGraph: {
    nodes: [
      { id: "dragon-stone", x: 500, y: 74, r: 38, type: "artifact" },
      { id: "griffith", x: 770, y: 176, r: 43, type: "person" },
      { id: "king-roland", x: 922, y: 80, r: 38, type: "person" },
      { id: "drake", x: 500, y: 302, r: 52, type: "person" },
      { id: "worm", x: 286, y: 398, r: 48, type: "dragon" },
      { id: "ana", x: 150, y: 222, r: 43, type: "person" },
      { id: "kepri", x: 64, y: 398, r: 42, type: "dragon" },
      { id: "bo", x: 672, y: 498, r: 43, type: "person" },
      { id: "shu", x: 785, y: 602, r: 42, type: "dragon" },
      { id: "rori", x: 834, y: 370, r: 43, type: "person" },
      { id: "vulcan", x: 930, y: 505, r: 43, type: "dragon" },
      { id: "maldred", x: 240, y: 96, r: 42, type: "person" },
      { id: "naga", x: 115, y: 556, r: 42, type: "dragon" },
      { id: "astrid", x: 340, y: 560, r: 37, type: "person" }
    ],
    edges: [
      { from: "dragon-stone", to: "drake", labelEn: "chose", labelZh: "选中" },
      { from: "griffith", to: "drake", labelEn: "mentors", labelZh: "引导" },
      { from: "king-roland", to: "griffith", labelEn: "served by", labelZh: "麾下巫师" },
      { from: "king-roland", to: "drake", labelEn: "summoned", labelZh: "召唤" },
      { from: "drake", to: "worm", labelEn: "bonded", labelZh: "建立联结" },
      { from: "ana", to: "kepri", labelEn: "bonded", labelZh: "建立联结" },
      { from: "bo", to: "shu", labelEn: "bonded", labelZh: "建立联结" },
      { from: "rori", to: "vulcan", labelEn: "bonded", labelZh: "建立联结" },
      { from: "drake", to: "ana", labelEn: "fellow keeper", labelZh: "同伴" },
      { from: "drake", to: "bo", labelEn: "friend", labelZh: "朋友" },
      { from: "drake", to: "rori", labelEn: "fellow keeper", labelZh: "同伴" },
      { from: "maldred", to: "naga", labelEn: "seeks to control", labelZh: "企图控制" },
      { from: "maldred", to: "drake", labelEn: "opposes", labelZh: "敌对" },
      { from: "astrid", to: "drake", labelEn: "opposes", labelZh: "敌对" }
    ]
  }
};
