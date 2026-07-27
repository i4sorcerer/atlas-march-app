/* =========================================================================
 *  全科启蒙 · 分类目录配置（三级结构）
 *  结构：一级学科(category) → 二级子类(sub) → 三级知识点(topic)
 *
 *  后续拓展只需在这里增加数据即可：
 *    - 新增一级学科：往 CATEGORIES 数组里加一项
 *    - 新增二级子类：往对应学科的 subs 里加一项
 *    - 新增知识点：往对应子类的 topics 里加一项，填好 url 即可
 *
 *  topic 字段说明：
 *    id       唯一标识（用于路由/记录测验成绩）
 *    title    知识点名称
 *    emoji    小图标
 *    desc     一句话简介
 *    url      内容页地址（相对门户根目录）；留空 "" 表示"敬请期待"占位
 *    ready    true=已完成可点击   false=占位待补充
 * ========================================================================= */

window.CATEGORIES = [
  {
    id: "space",
    name: "航天探索",
    emoji: "🚀",
    color: "#5B7CFA",
    desc: "冲出地球，飞向星辰大海！",
    subs: [
      {
        id: "rocket",
        name: "火箭",
        emoji: "🚀",
        refs: { title: "参考资源库", emoji: "📚", desc: "双语航天科普素材库（视频 / 纪录片 / 播客）", url: "../changzheng/resources.html" },
        topics: [
          { id: "falcon9", title: "猎鹰9号", emoji: "🚀", desc: "会自己飞回来的可回收火箭", url: "../falcon9/falcon9.html", ready: true },
          { id: "starship", title: "星舰 Starship", emoji: "🚀", desc: "要带人去火星的超级飞船", url: "", ready: false }
        ]
      },
      {
        id: "changzheng",
        name: "长征系列火箭",
        emoji: "🇨🇳",
        topics: [
          { id: "cz10", title: "长征十号", emoji: "🚀", desc: "中国载人登月的大力士火箭", url: "../changzheng/cz10.html", ready: true },
          { id: "cz5", title: "长征五号", emoji: "🚀", desc: "中国的大火箭胖五", url: "", ready: false },
          { id: "cz2f", title: "长征二号F", emoji: "🚀", desc: "送神舟飞船上太空的火箭", url: "", ready: false }
        ]
      },
      {
        id: "mars",
        name: "火星探测",
        emoji: "🔴",
        topics: [
          { id: "zhurong", title: "祝融号火星车", emoji: "🔥", desc: "在火星上开车的中国探测车", url: "../zhurong-hao/index.html", ready: true },
          { id: "perseverance", title: "毅力号火星车", emoji: "🤖", desc: "会自己找生命痕迹的探测车", url: "", ready: false }
        ]
      },
      {
        id: "solar-system",
        name: "太阳系",
        emoji: "🪐",
        topics: [
          { id: "planets", title: "八大行星", emoji: "🌍", desc: "太阳系里的行星兄弟们", url: "", ready: false },
          { id: "sun", title: "太阳", emoji: "☀️", desc: "给我们光和热的大火球", url: "", ready: false },
          { id: "moon", title: "月球", emoji: "🌕", desc: "地球最亲密的小伙伴", url: "", ready: false }
        ]
      },
      {
        id: "station",
        name: "空间站",
        emoji: "🛰️",
        topics: [
          { id: "tiangong", title: "天宫空间站", emoji: "🛰️", desc: "航天员在太空里的家", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "history",
    name: "历史人文",
    emoji: "🏛️",
    color: "#E8A33D",
    desc: "穿越时空，看看古人的故事！",
    subs: [
      {
        id: "china-dynasty",
        name: "中华朝代",
        emoji: "🐉",
        topics: [
          { id: "dynasties", title: "中华历史朝代", emoji: "🐉", desc: "从夏商周到现代的五千年", url: "../history-kids/index.html", ready: true }
        ]
      },
      {
        id: "world-civil",
        name: "世界文明",
        emoji: "🌏",
        topics: [
          { id: "egypt", title: "古埃及", emoji: "🔺", desc: "金字塔与法老的神秘国度", url: "", ready: false },
          { id: "rome", title: "古罗马", emoji: "🏟️", desc: "斗兽场与角斗士的时代", url: "", ready: false }
        ]
      },
      {
        id: "invention-old",
        name: "古代发明",
        emoji: "🧭",
        topics: [
          { id: "four-inventions", title: "四大发明", emoji: "📜", desc: "造纸、印刷、火药、指南针", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "animals",
    name: "动物世界",
    emoji: "🦁",
    color: "#3DBE8B",
    desc: "认识地球上有趣的小伙伴们！",
    subs: [
      {
        id: "land",
        name: "陆地动物",
        emoji: "🐘",
        topics: [
          { id: "lion", title: "狮子", emoji: "🦁", desc: "草原之王", url: "", ready: false },
          { id: "elephant", title: "大象", emoji: "🐘", desc: "陆地上最大的动物", url: "", ready: false }
        ]
      },
      {
        id: "ocean",
        name: "海洋动物",
        emoji: "🐋",
        topics: [
          { id: "whale", title: "鲸鱼", emoji: "🐋", desc: "海里的巨无霸", url: "", ready: false },
          { id: "dolphin", title: "海豚", emoji: "🐬", desc: "聪明的海洋精灵", url: "", ready: false }
        ]
      },
      {
        id: "dinosaur",
        name: "恐龙",
        emoji: "🦖",
        topics: [
          { id: "trex", title: "霸王龙", emoji: "🦖", desc: "远古最凶猛的猎手", url: "", ready: false },
          { id: "triceratops", title: "三角龙", emoji: "🦕", desc: "头上有三只角的恐龙", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "science",
    name: "自然科学",
    emoji: "🔬",
    color: "#C05CE8",
    desc: "做个小小科学家，探索世界的奥秘！",
    subs: [
      {
        id: "physics",
        name: "物理现象",
        emoji: "🔭",
        topics: [
          { id: "magnet", title: "磁铁的秘密", emoji: "🧲", desc: "为什么磁铁能吸东西", url: "", ready: false },
          { id: "light", title: "光和影子", emoji: "🌈", desc: "彩虹是怎么来的", url: "", ready: false }
        ]
      },
      {
        id: "chemistry",
        name: "化学反应",
        emoji: "⚗️",
        topics: [
          { id: "volcano", title: "小苏打火山", emoji: "🌋", desc: "厨房里的化学魔法", url: "", ready: false }
        ]
      },
      {
        id: "weather",
        name: "天气气象",
        emoji: "🌦️",
        topics: [
          { id: "rain", title: "下雨的秘密", emoji: "🌧️", desc: "水的旅行故事", url: "", ready: false },
          { id: "rainbow", title: "彩虹", emoji: "🌈", desc: "天空中的七色桥", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "body",
    name: "人体奥秘",
    emoji: "🧑‍⚕️",
    color: "#EF6F8B",
    desc: "认识我们自己的身体！",
    subs: [
      {
        id: "organs",
        name: "身体器官",
        emoji: "❤️",
        topics: [
          { id: "heart", title: "心脏", emoji: "❤️", desc: "身体里不停工作的小马达", url: "", ready: false },
          { id: "brain", title: "大脑", emoji: "🧠", desc: "指挥全身的总司令", url: "", ready: false }
        ]
      },
      {
        id: "senses",
        name: "五种感觉",
        emoji: "👁️",
        topics: [
          { id: "eyes", title: "眼睛", emoji: "👁️", desc: "我们怎么看见东西", url: "", ready: false }
        ]
      },
      {
        id: "health",
        name: "健康习惯",
        emoji: "🦷",
        topics: [
          { id: "teeth", title: "刷牙的学问", emoji: "🦷", desc: "怎么保护小牙齿", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "earth",
    name: "地球家园",
    emoji: "🌍",
    color: "#4FB6C4",
    desc: "我们生活的蓝色星球！",
    subs: [
      {
        id: "geography",
        name: "地理地貌",
        emoji: "⛰️",
        topics: [
          { id: "mountain", title: "高山", emoji: "⛰️", desc: "世界最高的山在哪里", url: "", ready: false }
        ]
      },
      {
        id: "ocean-earth",
        name: "海洋",
        emoji: "🌊",
        topics: [
          { id: "sea", title: "神奇的大海", emoji: "🌊", desc: "海水为什么是咸的", url: "", ready: false }
        ]
      },
      {
        id: "disaster",
        name: "火山地震",
        emoji: "💥",
        topics: [
          { id: "earthquake", title: "地震", emoji: "🌐", desc: "大地为什么会摇晃", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "math",
    name: "数学思维",
    emoji: "🔢",
    color: "#F2994A",
    desc: "玩转数字，锻炼小脑筋！",
    subs: [
      {
        id: "number-shape",
        name: "数与形",
        emoji: "📐",
        topics: [
          { id: "counting", title: "有趣的数数", emoji: "🔢", desc: "从1数到无穷大", url: "", ready: false },
          { id: "shapes", title: "认识图形", emoji: "🔷", desc: "圆形方形三角形", url: "", ready: false }
        ]
      },
      {
        id: "logic",
        name: "逻辑推理",
        emoji: "🧩",
        topics: [
          { id: "puzzle", title: "找规律", emoji: "🧩", desc: "训练小小侦探脑", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "tech",
    name: "科技发明",
    emoji: "💡",
    color: "#7A7CF0",
    desc: "看看聪明人发明了什么！",
    subs: [
      {
        id: "vehicle",
        name: "交通工具",
        emoji: "🚗",
        topics: [
          { id: "train", title: "高铁", emoji: "🚄", desc: "跑得飞快的地面火箭", url: "", ready: false },
          { id: "plane", title: "飞机", emoji: "✈️", desc: "在天上飞的大铁鸟", url: "", ready: false }
        ]
      },
      {
        id: "robot",
        name: "机器人与AI",
        emoji: "🤖",
        topics: [
          { id: "robot-basic", title: "机器人", emoji: "🤖", desc: "会帮人干活的机器朋友", url: "", ready: false }
        ]
      },
      {
        id: "daily",
        name: "日常发明",
        emoji: "💡",
        topics: [
          { id: "electricity", title: "电从哪里来", emoji: "⚡", desc: "点亮灯泡的神奇力量", url: "", ready: false }
        ]
      }
    ]
  },
  {
    id: "maker",
    name: "创客手工 · DIY",
    emoji: "🛠️",
    color: "#F2662B",
    desc: "动手做起来！自己造一个小发明！",
    subs: [
      {
        id: "diy-car",
        name: "手搓小车",
        emoji: "🚗",
        refs: { title: "参考资源库", emoji: "📚", desc: "手搓小车教程 / 开源项目 / 社群 / 飞控进阶", url: "../balance-car/resources.html" },
        topics: [
          { id: "balance-car", title: "手搓平衡小车", emoji: "⚖️", desc: "父子车库计划：方案 / 路线图 / 采购清单", url: "../balance-car/index.html", ready: true },
          { id: "race-car", title: "手搓竞速小车", emoji: "🏎️", desc: "用纸盒和橡皮筋做的风火轮", url: "", ready: false }
        ]
      },
      {
        id: "diy-robot",
        name: "手搓机器人",
        emoji: "🤖",
        topics: [
          { id: "robot-arm", title: "手搓机械臂", emoji: "🦾", desc: "能抓东西的小机械手", url: "", ready: false },
          { id: "walking-robot", title: "手搓行走机器人", emoji: "🚶", desc: "会自己走路的小机器人", url: "", ready: false }
        ]
      },
      {
        id: "diy-rocket",
        name: "手搓火箭",
        emoji: "🚀",
        topics: [
          { id: "water-rocket", title: "手搓水火箭", emoji: "💦", desc: "用饮料瓶和打气筒做能飞上天的火箭", url: "", ready: false },
          { id: "solid-rocket", title: "手搓模型火箭", emoji: "🎆", desc: "用纸筒和回收材料做的小火箭模型", url: "", ready: false }
        ]
      },
      {
        id: "diy-tools",
        name: "创客工具箱",
        emoji: "🧰",
        topics: [
          { id: "arduino", title: "认识 Arduino", emoji: "🔌", desc: "小创客都爱的迷你电脑板", url: "", ready: false },
          { id: "esp32", title: "认识 ESP32", emoji: "📡", desc: "能连 WiFi 和蓝牙的迷你电脑板", url: "", ready: false },
          { id: "safety", title: "安全小课堂", emoji: "⚠️", desc: "用剪刀、胶枪、电池的安全守则", url: "", ready: false }
        ]
      }
    ]
  }
];
