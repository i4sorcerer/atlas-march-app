// ============ 数据加载 ============
// 内置兜底数据（同步嵌入）。真正可扩展的数据层在 data/*.json：
//   - china 由 data/eras.json / kings.json / events.json 提供
//   - 其他地区由 data/<region>.json 提供（如 data/world.json）
// 运行时由 js/loader.js 优先加载 json 并覆盖此处的子集；
// 若 fetch 失败（如直接双击 file:// 打开），则退回使用本内置数据。

let HISTORY_DATA = {
  eras: [
    { "id": "xia", "name": "夏朝", "dynasty": "夏", "start": -2070, "end": -1600, "capital": "安邑", "founder": "禹", "color": "#8BC34A", "icon": "🌿", "tagline": "中国第一个王朝！", "summary": "大约 4000 年前，大禹治水成功，他的儿子启建立了中国历史上第一个王朝——夏朝。", "highlights": ["大禹治水 13 年，三过家门而不入", "世袭制代替了禅让制", "有了最早的城市和青铜器"], "kidsFact": "夏朝的人把一年分成 12 个月，每个月有自己的名字！" },
    { "id": "shang", "name": "商朝", "dynasty": "商", "start": -1600, "end": -1046, "capital": "亳 → 殷", "founder": "汤", "color": "#FF9800", "icon": "🦴", "tagline": "会写甲骨文的神秘王朝", "summary": "商朝人非常特别，他们把字刻在乌龟壳和牛的肩胛骨上——这就是甲骨文。", "highlights": ["世界上最早的系统文字——甲骨文", "青铜器制作技术世界领先", "出现了世界上最早的日食记录"], "kidsFact": "商朝人用乌龟壳占卜，就像今天的算命一样，但会刻下结果！" },
    { "id": "zhou_west", "name": "西周", "dynasty": "周", "start": -1046, "end": -771, "capital": "镐京", "founder": "周武王姬发", "color": "#795548", "icon": "🏺", "tagline": "发明了\"礼\"和\"乐\"", "summary": "周武王打败商朝，建立了周朝。他发明了\"分封制\"，让亲戚和功臣帮忙管理国家。", "highlights": ["分封制：把土地分给亲戚管理", "礼乐制度：什么事情该怎么做都有规矩", "出现了\"周易\"这本古老的书"], "kidsFact": "周朝人吃饭、穿衣、说话都有规定，比如见到国王要行大礼！" },
    { "id": "spring_autumn", "name": "春秋", "dynasty": "东周（春秋）", "start": -770, "end": -476, "capital": "洛邑", "founder": "周平王", "color": "#4CAF50", "icon": "🍃", "tagline": "百家争鸣的时代", "summary": "周朝开始衰弱，全国分裂成很多小国家，大国之间打来打去。", "highlights": ["出现了孔子、老子等伟大思想家", "齐、楚、燕、韩、赵、魏、秦七国最强", "孙子写出了《孙子兵法》"], "kidsFact": "孔子有 3000 个学生，其中 72 个特别厉害！" },
    { "id": "warring_states", "name": "战国", "dynasty": "东周（战国）", "start": -475, "end": -221, "capital": "各国有异", "founder": "—", "color": "#F44336", "icon": "⚔️", "tagline": "七个最强的国家争霸", "summary": "一百多个小国变成了 7 个大国。秦国最厉害，最后把其他 6 个都打败了！", "highlights": ["商鞅变法让秦国变得超强大", "出现了合纵连横的外交策略", "修筑了万里长城的一部分"], "kidsFact": "战国时候的孩子们也要学 6 门课：礼、乐、射、御、书、数！" },
    { "id": "qin", "name": "秦朝", "dynasty": "秦", "start": -221, "end": -206, "capital": "咸阳", "founder": "秦始皇嬴政", "color": "#FFC107", "icon": "🧱", "tagline": "中国第一个大一统帝国！", "summary": "秦始皇用了 10 年时间，把 6 个国家全部打败，统一了中国！他是中国第一个皇帝。", "highlights": ["统一了文字（隶书）、货币、度量衡", "修筑了万里长城", "修建了秦始皇陵兵马俑", "建立了中国第一个中央集权国家"], "kidsFact": "兵马俑里每个士兵的脸都不一样！" },
    { "id": "han_west", "name": "西汉", "dynasty": "汉", "start": -202, "end": 8, "capital": "长安", "founder": "汉高祖刘邦", "color": "#E91E63", "icon": "🐉", "tagline": "汉族、汉字的\"汉\"！", "summary": "刘邦本来是个小官，打败了项羽，建立了汉朝。我们现在叫\"汉族\"，就是从这儿来的！", "highlights": ["张骞出使西域，开辟了丝绸之路", "司马迁写出了《史记》", "造纸术开始出现", "汉武帝时期是鼎盛时代"], "kidsFact": "汉朝小朋友玩陶猪、陶狗、陶鸡，还有会动的木头机器人！" },
    { "id": "han_east", "name": "东汉", "dynasty": "汉（东汉）", "start": 25, "end": 220, "capital": "洛阳", "founder": "汉光武帝刘秀", "color": "#9C27B0", "icon": "📜", "tagline": "蔡伦改进了造纸术！", "summary": "王莽建立了很短的新朝，然后到处打仗。刘秀重新建立了汉朝，定都洛阳。", "highlights": ["蔡伦改进了造纸术，让纸便宜了", "张衡发明了世界上最早的地震仪", "华佗是中国最早的外科医生之一", "出现了第一所国家大学——太学"], "kidsFact": "张衡发明的地震仪上有一只龙，嘴里含着一颗珠子，发生地震珠子会掉下来！" },
    { "id": "three_kingdoms", "name": "三国", "dynasty": "魏蜀吴", "start": 220, "end": 280, "capital": "魏洛阳/蜀成都/吴建业", "founder": "曹丕/刘备/孙权", "color": "#3F51B5", "icon": "🛡️", "tagline": "魏蜀吴三足鼎立", "summary": "东汉末年，天下大乱，分成了魏、蜀、吴三个国家。诸葛亮是蜀国最聪明的人！", "highlights": ["曹操、刘备、孙权是三大英雄", "诸葛亮草船借箭、火烧赤壁", "关羽是忠义的代表", "司马懿的孙子最后统一了三国"], "kidsFact": "三国的故事被写成了《三国演义》！" },
    { "id": "jin_west", "name": "西晋", "dynasty": "晋", "start": 265, "end": 316, "capital": "洛阳", "founder": "晋武帝司马炎", "color": "#009688", "icon": "👑", "tagline": "短暂的大一统", "summary": "司马家族统一了三国，建立了晋朝。但是只持续了 51 年就又乱了。", "highlights": ["结束了三国鼎立的局面", "但是很快就发生了\"八王之乱\"", "北方的少数民族趁机南下"], "kidsFact": "晋朝人喜欢穿着大袖子的衣服！" },
    { "id": "south_north", "name": "南北朝", "dynasty": "南北朝", "start": 420, "end": 589, "capital": "建康/平城", "founder": "刘裕/拓跋珪", "color": "#673AB7", "icon": "🏯", "tagline": "南北分立的时代", "summary": "南方换了 4 个朝代（宋齐梁陈），北方乱成一团。佛教在这个时期非常盛行。", "highlights": ["南方经济文化发达", "北魏孝文帝迁都洛阳，推行汉化", "龙门石窟开始开凿", "《兰亭序》是书法史上的巅峰"], "kidsFact": "这个时期出现了世界上最早的儿童算术课本！" },
    { "id": "sui", "name": "隋朝", "dynasty": "隋", "start": 581, "end": 618, "capital": "大兴（西安）", "founder": "隋文帝杨坚", "color": "#03A9F4", "icon": "🌊", "tagline": "开凿大运河", "summary": "隋文帝杨坚结束了 270 年的分裂，重新统一了中国！", "highlights": ["重新统一了中国", "开凿了 2700 公里的大运河", "开创了科举考试制度", "但是隋炀帝太残暴，丢了天下"], "kidsFact": "大运河从北京一直通到杭州！" },
    { "id": "tang", "name": "唐朝", "dynasty": "唐", "start": 618, "end": 907, "capital": "长安", "founder": "唐高祖李渊", "color": "#FFEB3B", "icon": "🐎", "tagline": "中国古代的黄金时代！", "summary": "唐朝是中国最强盛的朝代之一！长安是当时世界上最大的城市，有 100 多万人！", "highlights": ["出现了中国唯一的女皇——武则天", "李白、杜甫是著名的大诗人", "玄奘去印度取经", "和日本、韩国交流密切", "发明了世界上最早的雕版印刷"], "kidsFact": "唐朝小朋友玩蹴鞠（足球），女孩子也可以踢！" },
    { "id": "song", "name": "宋朝", "dynasty": "宋", "start": 960, "end": 1279, "capital": "开封/临安", "founder": "宋太祖赵匡胤", "color": "#00BCD4", "icon": "🎨", "tagline": "最会做生意的王朝", "summary": "宋朝分成了北宋和南宋两个阶段。经济和文化超级繁荣！", "highlights": ["活字印刷术是中国人发明的", "指南针开始用于航海", "苏东坡、辛弃疾是著名词人", "《清明上河图》画出当时繁华景象"], "kidsFact": "宋朝人已经用纸币了，叫\"交子\"，是世界上最早的纸币！" },
    { "id": "yuan", "name": "元朝", "dynasty": "元", "start": 1271, "end": 1368, "capital": "大都（北京）", "founder": "元世祖忽必烈", "color": "#3F51B5", "icon": "🏇", "tagline": "马背上的王朝", "summary": "成吉思汗的孙子忽必烈建立了元朝，是中国历史上第一个由少数民族建立的大一统王朝。", "highlights": ["中国历史上版图最大的朝代！", "马可·波罗来中国旅行", "关汉卿写出了《窦娥冤》", "黄道婆改进了纺织技术"], "kidsFact": "元朝人喜欢看杂剧，就像现在的电视剧！" },
    { "id": "ming", "name": "明朝", "dynasty": "明", "start": 1368, "end": 1644, "capital": "南京 → 北京", "founder": "明太祖朱元璋", "color": "#E65100", "icon": "🏯", "tagline": "郑和下西洋！", "summary": "朱元璋从一个放牛娃变成了皇帝。他还修了长城，派郑和下西洋。", "highlights": ["郑和七下西洋，到过非洲东海岸", "修建了八达岭长城", "李时珍写出《本草纲目》", "建造了紫禁城（故宫）", "出现了\"四大名著\"中的三部"], "kidsFact": "故宫一共有 8707 间房子！一天住一间要 23 年才能住完！" },
    { "id": "qing", "name": "清朝", "dynasty": "清", "start": 1636, "end": 1912, "capital": "北京", "founder": "清太宗皇太极", "color": "#1A237E", "icon": "🐲", "tagline": "中国古代的最后一个王朝", "summary": "满族建立的清朝是中国最后一个封建王朝。", "highlights": ["康乾盛世是清朝最繁荣的时期", "曹雪芹写出了《红楼梦》", "闭关锁国导致落后于西方", "1911 年辛亥革命推翻了清朝"], "kidsFact": "清朝皇帝能同时说满语、汉语、蒙古语！" },
    { "id": "modern", "name": "近现代", "dynasty": "近现代", "start": 1912, "end": 2024, "capital": "北京", "founder": "—", "color": "#D32F2F", "icon": "🇨🇳", "tagline": "从积贫积弱到中国崛起", "summary": "中华民国 1912 年成立，1949 年中华人民共和国成立。", "highlights": ["1911 年辛亥革命", "1937-1945 年抗日战争胜利", "1949 年中华人民共和国成立", "1978 年改革开放", "2008 年北京奥运会", "2024 年探月工程、空间站建设"], "kidsFact": "现在的中国有高铁、5G、空间站、嫦娥探月！" }
  ],

  kings: [
    { "id": "yu", "name": "大禹", "eraId": "xia", "role": "夏朝奠基者", "birth": -2277, "death": -2070, "temple": "—", "summary": "治水英雄，三过家门而不入", "kidsFact": "大禹治水 13 年，三次路过自己的家门都没进去。", "icon": "👷" },
    { "id": "tang_shang", "name": "商汤", "eraId": "shang", "role": "商朝开国君主", "birth": null, "death": null, "temple": "武王", "summary": "灭夏桀，建立商朝", "kidsFact": "商汤特别勤俭，洗澡的时候看到自己身上的布都打补丁！", "icon": "⚔️" },
    { "id": "wu_wang", "name": "周武王", "eraId": "zhou_west", "role": "西周开国君主", "birth": -1150, "death": -1043, "temple": "武王", "summary": "伐纣灭商，建立周朝", "kidsFact": "在牧野之战中，周武王打败了商纣王！", "icon": "🤴" },
    { "id": "confucius", "name": "孔子", "eraId": "spring_autumn", "role": "伟大的思想家", "birth": -551, "death": -479, "temple": "—", "summary": "儒家学派创始人", "kidsFact": "孔子 72 个学生，每个学生都有自己的特长！", "icon": "📚" },
    { "id": "qin_shi_huang", "name": "秦始皇", "eraId": "qin", "role": "中国第一个皇帝", "birth": -259, "death": -210, "temple": "始皇帝", "summary": "统一六国，统一度量衡", "kidsFact": "他叫自己\"始皇帝\"，希望子子孙孙永远当皇帝！", "icon": "👑" },
    { "id": "liu_bang", "name": "汉高祖刘邦", "eraId": "han_west", "role": "西汉开国皇帝", "birth": -256, "death": -195, "temple": "高祖", "summary": "打败项羽，建立汉朝", "kidsFact": "刘邦原来是个亭长（村长），后来成了皇帝！", "icon": "⚔️" },
    { "id": "wu_di", "name": "汉武帝", "eraId": "han_west", "role": "西汉第七位皇帝", "birth": -156, "death": -87, "temple": "武帝", "summary": "西汉鼎盛时期的皇帝", "kidsFact": "汉武帝在位 54 年，是西汉在位时间最长的皇帝！", "icon": "🌟" },
    { "id": "wu_zetian", "name": "武则天", "eraId": "tang", "role": "中国唯一的女皇", "birth": 624, "death": 705, "temple": "—", "summary": "建立了武周王朝", "kidsFact": "她是中国历史上唯一的女皇帝！还创造了\"曌\"这个字！", "icon": "👸" },
    { "id": "li_bai", "name": "李白", "eraId": "tang", "role": "诗仙", "birth": 701, "death": 762, "temple": "—", "summary": "唐代大诗人", "kidsFact": "李白特别喜欢喝酒，写了好多诗都在说他喝酒！", "icon": "🍶" },
    { "id": "taizong", "name": "唐太宗", "eraId": "tang", "role": "唐朝第二位皇帝", "birth": 598, "death": 649, "temple": "太宗", "summary": "开创了\"贞观之治\"", "kidsFact": "唐太宗把魏征当成镜子，魏征死后他很伤心！", "icon": "👑" },
    { "id": "zhao_kuangyin", "name": "宋太祖赵匡胤", "eraId": "song", "role": "宋朝开国皇帝", "birth": 927, "death": 976, "temple": "太祖", "summary": "陈桥兵变，黄袍加身", "kidsFact": "赵匡胤是士兵们给他披上黄袍才当上皇帝的！", "icon": "👑" },
    { "id": "kangxi", "name": "康熙皇帝", "eraId": "qing", "role": "清朝第四位皇帝", "birth": 1654, "death": 1722, "temple": "圣祖", "summary": "在位 61 年，开创康乾盛世", "kidsFact": "康熙 8 岁就当皇帝，是清朝在位时间最长的皇帝！", "icon": "👶" },
    { "id": "qianlong", "name": "乾隆皇帝", "eraId": "qing", "role": "清朝第六位皇帝", "birth": 1711, "death": 1799, "temple": "高宗", "summary": "写了 4 万多首诗", "kidsFact": "乾隆是中国写诗最多的皇帝，一共写了 4 万多首！", "icon": "🖋️" },
    { "id": "zhu_yuanzhang", "name": "明太祖朱元璋", "eraId": "ming", "role": "明朝开国皇帝", "birth": 1328, "death": 1398, "temple": "太祖", "summary": "从放牛娃到皇帝", "kidsFact": "朱元璋小时候家里穷，给地主放过牛、当过和尚！", "icon": "👑" }
  ],

  events: [
    { "year": -2200, "title": "大禹治水成功", "eraId": "xia", "icon": "🌊", "summary": "大禹用疏导的办法治好了水患。" },
    { "year": -1600, "title": "商汤灭夏", "eraId": "shang", "icon": "⚔️", "summary": "商汤在鸣条之战中击败夏桀，建立商朝。" },
    { "year": -1300, "title": "盘庚迁殷", "eraId": "shang", "icon": "🏛️", "summary": "商朝迁都至殷（今安阳）。" },
    { "year": -1046, "title": "武王伐纣", "eraId": "zhou_west", "icon": "🗡️", "summary": "周武王在牧野之战中打败商纣王。" },
    { "year": -841, "title": "共和元年", "eraId": "zhou_west", "icon": "📜", "summary": "中国历史开始有确切纪年。" },
    { "year": -551, "title": "孔子诞生", "eraId": "spring_autumn", "icon": "👨‍🏫", "summary": "伟大的思想家、教育家孔子出生。" },
    { "year": -221, "title": "秦始皇统一六国", "eraId": "qin", "icon": "🏆", "summary": "中国第一个大一统帝国诞生！" },
    { "year": -215, "title": "蒙恬北击匈奴", "eraId": "qin", "icon": "🐎", "summary": "蒙恬修筑长城，击退匈奴。" },
    { "year": -202, "title": "楚汉之争结束", "eraId": "han_west", "icon": "🗡️", "summary": "刘邦打败项羽，建立西汉王朝。" },
    { "year": -138, "title": "张骞出使西域", "eraId": "han_west", "icon": "🐪", "summary": "丝绸之路开辟，连接中国和中亚、西亚。" },
    { "year": 105, "title": "蔡伦改进造纸术", "eraId": "han_east", "icon": "📄", "summary": "纸变得便宜，普通人也能用上。" },
    { "year": 132, "title": "张衡发明地动仪", "eraId": "han_east", "icon": "🌍", "summary": "世界上最早的地震仪。" },
    { "year": 208, "title": "赤壁之战", "eraId": "three_kingdoms", "icon": "🔥", "summary": "孙刘联军火烧赤壁，奠定三国鼎立。" },
    { "year": 280, "title": "西晋统一三国", "eraId": "jin_west", "icon": "🤝", "summary": "司马炎灭东吴，结束三国鼎立。" },
    { "year": 605, "title": "开凿大运河", "eraId": "sui", "icon": "🛶", "summary": "世界最长的运河，从北京通到杭州。" },
    { "year": 618, "title": "唐朝建立", "eraId": "tang", "icon": "🐉", "summary": "李渊建立唐朝，开启中国黄金时代。" },
    { "year": 690, "title": "武则天称帝", "eraId": "tang", "icon": "👸", "summary": "中国历史上唯一的女皇帝登基。" },
    { "year": 868, "title": "《金刚经》雕版印刷", "eraId": "tang", "icon": "🖨️", "summary": "世界上最早的印刷书籍之一。" },
    { "year": 960, "title": "陈桥兵变", "eraId": "song", "icon": "👑", "summary": "赵匡胤黄袍加身，建立宋朝。" },
    { "year": 1024, "title": "纸币\"交子\"出现", "eraId": "song", "icon": "💴", "summary": "世界上最早的纸币。" },
    { "year": 1088, "title": "毕昇发明活字印刷", "eraId": "song", "icon": "🔤", "summary": "比欧洲早了 400 年！" },
    { "year": 1271, "title": "忽必烈定国号\"元\"", "eraId": "yuan", "icon": "🏇", "summary": "元朝成为中国历史上版图最大的朝代。" },
    { "year": 1405, "title": "郑和首次下西洋", "eraId": "ming", "icon": "⛵", "summary": "郑和率 200 多艘船远航。" },
    { "year": 1421, "title": "明成祖迁都北京", "eraId": "ming", "icon": "🏯", "summary": "紫禁城成为明清两代皇宫。" },
    { "year": 1644, "title": "清军入关", "eraId": "qing", "icon": "🐎", "summary": "清朝开始统治中国全境。" },
    { "year": 1792, "title": "《四库全书》编成", "eraId": "qing", "icon": "📚", "summary": "中国历史上最大规模的丛书整理工程。" },
    { "year": 1839, "title": "虎门销烟", "eraId": "qing", "icon": "🚫", "summary": "林则徐销毁鸦片。" },
    { "year": 1860, "title": "火烧圆明园", "eraId": "qing", "icon": "🔥", "summary": "中国近代史上惨痛的一页。" },
    { "year": 1911, "title": "辛亥革命", "eraId": "modern", "icon": "✊", "summary": "推翻了 2000 多年的封建帝制。" },
    { "year": 1934, "title": "红军长征", "eraId": "modern", "icon": "🚩", "summary": "中国工农红军完成 2.5 万里战略转移。" },
    { "year": 1949, "title": "中华人民共和国成立", "eraId": "modern", "icon": "🇨🇳", "summary": "新中国诞生。" },
    { "year": 1970, "title": "东方红一号卫星", "eraId": "modern", "icon": "🛰️", "summary": "中国成为第五个独立发射卫星的国家。" },
    { "year": 1978, "title": "改革开放", "eraId": "modern", "icon": "📈", "summary": "邓小平开启中国现代化新征程。" },
    { "year": 2003, "title": "神舟五号载人", "eraId": "modern", "icon": "🚀", "summary": "杨利伟成为中国首位航天员。" },
    { "year": 2008, "title": "北京奥运会", "eraId": "modern", "icon": "🏅", "summary": "中国举办了一场无与伦比的奥运会！" },
    { "year": 2019, "title": "嫦娥四号月背着陆", "eraId": "modern", "icon": "🌙", "summary": "人类首次在月球背面软着陆。" },
    { "year": 2021, "title": "天问一号着陆火星", "eraId": "modern", "icon": "🔴", "summary": "中国成为第二个火星软着陆的国家。" },
    { "year": 2024, "title": "嫦娥六号月背采样", "eraId": "modern", "icon": "🪨", "summary": "人类首次从月球背面取样。" }
  ]
};
