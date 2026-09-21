/* ============ 好奇星球 · 分类目录（网址导航）数据源 ============
 * window.WEB_DIRECTORY：精选的儿童/科普向 + 通用工具 + DIY/可视化教学/免费读书搜书等网站（面向全年龄段，PC 端友好）
 * 每个分类：{ id, name, emoji, color, sites:[{name,url,desc,emoji}] }
 * 站点点开在新标签页打开，不进 iframe。
 * 想增删网站，只改这个文件即可。
 * ======================================================== */
window.WEB_DIRECTORY = [
  {
    id: "science",
    name: "科学探索",
    emoji: "🔬",
    color: "#5b7cfa",
    sites: [
      { name: "NASA Space Place", url: "https://spaceplace.nasa.gov/", desc: "NASA 出品的太空与地球科学小游戏", emoji: "🚀" },
      { name: "科普中国", url: "https://www.kepuchina.cn/", desc: "中国科协官方科普平台", emoji: "🛰️" },
      { name: "Science Buddies", url: "https://www.sciencebuddies.org/", desc: "海量 K12 科学实验与项目", emoji: "🧪" },
      { name: "中国数字科技馆", url: "https://www.cdstm.cn/", desc: "中国科协的数字科技馆", emoji: "🧬" },
      { name: "果壳网", url: "https://www.guokr.com/", desc: "有趣有料的科学八卦", emoji: "💡" },
      { name: "Science Kids", url: "https://www.sciencekids.co.nz/", desc: "新西兰儿童科学乐园", emoji: "🌈" }
    ]
  },
  {
    id: "space",
    name: "太空与航天",
    emoji: "🪐",
    color: "#9b6bff",
    sites: [
      { name: "NASA 官网", url: "https://www.nasa.gov/", desc: "美国宇航局官方网站", emoji: "🛰️" },
      { name: "中国国家航天局", url: "http://www.cnsa.gov.cn/", desc: "中国航天权威发布", emoji: "🌏" },
      { name: "ESA Kids", url: "https://www.esa.int/kids", desc: "欧洲航天局儿童版", emoji: "🪐" },
      { name: "Stellarium 在线星图", url: "https://stellarium-web.org/", desc: "网页版虚拟天文馆", emoji: "🔭" },
      { name: "In-The-Sky", url: "https://in-the-sky.org/", desc: "每晚天空看点早知道", emoji: "✨" },
      { name: "中国天文科普网", url: "http://www.astron.ac.cn/", desc: "中科院天文科普", emoji: "🌌" }
    ]
  },
  {
    id: "nature",
    name: "动物与自然",
    emoji: "🐾",
    color: "#3dbe8b",
    sites: [
      { name: "国家地理儿童", url: "https://kids.nationalgeographic.com/", desc: "国家地理专为小朋友打造", emoji: "🦁" },
      { name: "WWF 中国", url: "https://www.wwf.org.cn/", desc: "世界自然基金会中国站", emoji: "🐼" },
      { name: "物种2000", url: "https://www.sp2000.org.cn/", desc: "中国物种名录数据库", emoji: "🦋" },
      { name: "美国自然史博物馆", url: "https://www.amnh.org/", desc: "纽约自然史博物馆", emoji: "🐘" }
    ]
  },
  {
    id: "coding",
    name: "编程与创客",
    emoji: "💻",
    color: "#ff9f43",
    sites: [
      { name: "Scratch", url: "https://scratch.mit.edu/", desc: "MIT 积木式少儿编程", emoji: "🐱" },
      { name: "Code.org", url: "https://code.org/", desc: "人人都能学的编程课", emoji: "💻" },
      { name: "编程猫", url: "https://www.codemao.cn/", desc: "国产少儿编程平台", emoji: "🐲" },
      { name: "micro:bit", url: "https://microbit.org/", desc: "口袋里的可编程小电脑", emoji: "🤖" },
      { name: "Blockly 游戏", url: "https://blockly.games/", desc: "谷歌积木编程小游戏", emoji: "🧩" },
      { name: "Tynker", url: "https://www.tynker.com/", desc: "趣味编程闯关", emoji: "🚀" }
    ]
  },
  {
    id: "reading",
    name: "绘本与阅读",
    emoji: "📚",
    color: "#ff6f91",
    sites: [
      { name: "凯叔讲故事", url: "https://www.kaishu.com/", desc: "好听的故事陪伴成长", emoji: "📖" },
      { name: "国家少儿数字图书馆", url: "http://kids.nlc.cn/", desc: "国家图书馆少儿版", emoji: "📚" },
      { name: "Storyline Online", url: "https://storylineonline.net/", desc: "演员读绘本给你听", emoji: "🎧" },
      { name: "绘本中国", url: "https://www.huiben.cn/", desc: "原创绘本阅读平台", emoji: "🖍️" },
      { name: "Epic! 儿童图书馆", url: "https://www.getepic.com/", desc: "英文童书海量读", emoji: "📘" },
      { name: "Unite for Literacy", url: "https://www.uniteforliteracy.com/", desc: "免费双语图画书", emoji: "🌍" }
    ]
  },
  {
    id: "museum",
    name: "博物馆与展览",
    emoji: "🏛️",
    color: "#2dd4bf",
    sites: [
      { name: "故宫博物院", url: "https://www.dpm.org.cn/", desc: "穿越百年的紫禁城", emoji: "🏯" },
      { name: "中国国家博物馆", url: "https://www.chnmuseum.cn/", desc: "看遍中华宝藏", emoji: "🏛️" },
      { name: "Google 艺术与文化", url: "https://artsandculture.google.com/", desc: "线上逛遍世界博物馆", emoji: "🎨" },
      { name: "上海科技馆", url: "https://www.sstm.org.cn/", desc: "好玩的科学殿堂", emoji: "🔬" },
      { name: "大英博物馆", url: "https://www.britishmuseum.org/", desc: "世界文明宝库", emoji: "🏺" }
    ]
  },
  {
    id: "math",
    name: "数学思维",
    emoji: "🔢",
    color: "#ffd166",
    sites: [
      { name: "可汗学院", url: "https://www.khanacademy.org/", desc: "免费系统化学数学", emoji: "📐" },
      { name: "洋葱学园", url: "https://www.onion.cn/", desc: "动画微课学数学", emoji: "🧅" },
      { name: "Math Playground", url: "https://www.mathplayground.com/", desc: "边玩边练数学", emoji: "🎮" },
      { name: "GeoGebra", url: "https://www.geogebra.org/", desc: "动态数学与几何", emoji: "📊" },
      { name: "Coolmath4Kids", url: "https://www.coolmath4kids.com/", desc: "给小朋友的数学游戏", emoji: "🔢" },
      { name: "IXL 数学", url: "https://www.ixl.com/", desc: "分年级数学练习", emoji: "➕" }
    ]
  },
  {
    id: "tools",
    name: "实用小工具",
    emoji: "🧰",
    color: "#6366f1",
    sites: [
      { name: "Kiddle 儿童搜索", url: "https://www.kiddle.co/", desc: "安全干净的儿童搜索引擎", emoji: "🔎" },
      { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/", desc: "会算会答的知识引擎", emoji: "🧮" },
      { name: "Calculator.net", url: "https://www.calculator.net/", desc: "各种在线计算器", emoji: "🧮" },
      { name: "Time and Date", url: "https://www.timeanddate.com/", desc: "世界时间与日历", emoji: "⏰" },
      { name: "Emojipedia", url: "https://emojipedia.org/", desc: "查表情符号含义", emoji: "😀" },
      { name: "sssTwitter", url: "https://ssstwitter.com/", desc: "下载 Twitter / X 上的视频和动图", emoji: "📥" }
    ]
  },
  {
    id: "diy",
    name: "动手 DIY · 创客",
    emoji: "🛠️",
    color: "#F2662B",
    sites: [
      { name: "Instructables", url: "https://www.instructables.com/", desc: "全球最大的 DIY 项目社区，图文教程海量", emoji: "🔧" },
      { name: "Make: 创客杂志", url: "https://makezine.com/", desc: "创客文化与动手制作教程", emoji: "🛠️" },
      { name: "Thingiverse", url: "https://www.thingiverse.com/", desc: "免费下载 3D 打印模型", emoji: "🖨️" },
      { name: "Adafruit", url: "https://www.adafruit.com/", desc: "开源硬件与电子制作学习", emoji: "🔌" },
      { name: "嘉立创 EDA", url: "https://lceda.cn/", desc: "免费的在线电路设计工具", emoji: "📐" }
    ]
  },
  {
    id: "visual",
    name: "可视化 · 互动教学",
    emoji: "📊",
    color: "#00B8D9",
    sites: [
      { name: "PhET 互动仿真", url: "https://phet.colorado.edu/zh_CN/", desc: "科罗拉多大学免费互动实验（数理化）", emoji: "🔬" },
      { name: "Desmos", url: "https://www.desmos.com/", desc: "在线函数画图与数学可视化", emoji: "📈" },
      { name: "Observable", url: "https://observablehq.com/", desc: "用代码画数据可视化笔记本", emoji: "📊" },
      { name: "3Blue1Brown", url: "https://www.3blue1brown.com/", desc: "直观易懂的数学动画讲解", emoji: "🎬" }
    ]
  },
  {
    id: "books",
    name: "免费读书 · 搜书",
    emoji: "📚",
    color: "#8E7CC3",
    sites: [
      { name: "Project Gutenberg", url: "https://www.gutenberg.org/", desc: "免费公版英文电子书（古登堡计划）", emoji: "📜" },
      { name: "书格", url: "https://new.shuge.org/", desc: "免费分享的中文古籍与艺术书籍", emoji: "🏯" },
      { name: "Open Library", url: "https://openlibrary.org/", desc: "可在线借阅的免费电子书", emoji: "📖" },
      { name: "Standard Ebooks", url: "https://standardebooks.org/", desc: "排版精良的免费英文名著", emoji: "✨" },
      { name: "鸠摩搜书", url: "https://www.jiumo.com/", desc: "一键搜索全网电子书资源", emoji: "🔎" },
      { name: "PDF Drive", url: "https://www.pdfdrive.com/", desc: "海量免费 PDF 书库与搜索", emoji: "📚" }
    ]
  }
];
