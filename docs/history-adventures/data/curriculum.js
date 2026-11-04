/* =========================================================================
 * Mario 的中华五千年 · 系列路线图
 * 故事结构与时代顺序参考狐狸家《中国简史（绘本版）》；
 * 页面文字、插画与互动均为原创儿童改编，非原书内容复制。
 * ========================================================================= */

window.MARIO_HISTORY = {
  title: "Mario 的中华五千年",
  subtitle: "黄铜时空罗盘 · 一段可以走进去的中国历史",
  sourceNote:
    "故事蓝本：狐狸家《中国简史（绘本版）》第一册；本系列为原创儿童互动改编，非官方授权版本，也不替代原书阅读。",
  chapters: [
    {
      id: "01",
      era: "远古",
      years: "很久很久以前",
      title: "传说里的世界",
      emoji: "🥚",
      color: "#b84a38",
      summary: "天地从哪里来？人从哪里来？部落怎样相遇？古人用想象讲出了自己的答案。",
      status: "active",
      badge: "传说小侦探",
      sections: [
        {
          id: "01-01",
          title: "你听过这些传说吗？",
          desc: "盘古开天 · 女娲造人 · 传说与考古线索",
          ready: true,
          url: "chapter-01/section-01.html"
        },
        {
          id: "01-02",
          title: "涿鹿之战",
          desc: "炎帝、黄帝和蚩尤的传说 · 炎黄子孙",
          ready: true,
          url: "episode.html?id=01-02"
        },
        {
          id: "01-03",
          title: "大禹治水",
          desc: "观察水流 · 开渠疏导 · 从洪水到夏朝的传说",
          ready: true,
          url: "episode.html?id=01-03"
        }
      ]
    },
    {
      id: "02",
      era: "夏商西周",
      years: "约前2070—前771",
      title: "青铜与礼乐",
      emoji: "🏺",
      color: "#a97c2f",
      summary: "青铜器、甲骨文、礼乐制度，早期国家慢慢长大。",
      status: "active",
      badge: "青铜小史官",
      sections: [
        {
          id: "02-01",
          title: "青铜与礼乐",
          desc: "甲骨文 · 青铜器 · 夏商西周的先后顺序",
          ready: true,
          url: "episode.html?id=02-01"
        }
      ]
    },
    {
      id: "03",
      era: "春秋战国",
      years: "前770—前221",
      title: "百家争鸣",
      emoji: "📜",
      color: "#507b69",
      summary: "诸侯争霸，思想家辈出，铁器牛耕让社会发生新变化。",
      status: "active",
      badge: "百家小听众",
      sections: [
        {
          id: "03-01",
          title: "百家争鸣",
          desc: "铁器牛耕 · 都江堰 · 孔子、老子和墨子",
          ready: true,
          url: "episode.html?id=03-01"
        }
      ]
    },
    {
      id: "04",
      era: "秦汉",
      years: "前221—220",
      title: "大一统",
      emoji: "🐉",
      color: "#9b3c32",
      summary: "统一文字和度量衡，丝绸之路把中国与世界连在一起。",
      status: "active",
      badge: "丝路小使者",
      sections: [
        {
          id: "04-01",
          title: "大一统",
          desc: "秦的统一 · 丝绸之路 · 造纸术改进",
          ready: true,
          url: "episode.html?id=04-01"
        }
      ]
    },
    {
      id: "05",
      era: "魏晋南北朝",
      years: "220—589",
      title: "分裂与交融",
      emoji: "🪷",
      color: "#6b728d",
      summary: "政权更替、民族交融，石窟、书法和数学仍然闪闪发光。",
      status: "active",
      badge: "交融小画师",
      sections: [
        {
          id: "05-01",
          title: "分裂与交融",
          desc: "石窟艺术 · 胡床与胡饼 · 王羲之与祖冲之",
          ready: true,
          url: "episode.html?id=05-01"
        }
      ]
    },
    {
      id: "06",
      era: "隋唐",
      years: "581—907",
      title: "盛世长安",
      emoji: "🏯",
      color: "#c97d35",
      summary: "大运河、科举、唐诗和长安城，一个开放而自信的时代。",
      status: "active",
      badge: "长安小诗人",
      sections: [
        {
          id: "06-01",
          title: "盛世长安",
          desc: "大运河 · 科举考试 · 李白与杜甫",
          ready: true,
          url: "episode.html?id=06-01"
        }
      ]
    },
    {
      id: "07",
      era: "两宋",
      years: "960—1279",
      title: "风雅与发明",
      emoji: "🍵",
      color: "#3f7d78",
      summary: "城市繁华、夜市热闹，活字印刷、指南针和纸币改变生活。",
      status: "active",
      badge: "宋朝发明家",
      sections: [
        {
          id: "07-01",
          title: "风雅与发明",
          desc: "活字印刷 · 指南针 · 交子与夜市",
          ready: true,
          url: "episode.html?id=07-01"
        }
      ]
    },
    {
      id: "08",
      era: "元",
      years: "1271—1368",
      title: "辽阔的交流",
      emoji: "🐎",
      color: "#587391",
      summary: "疆域辽阔，驿站连接远方，元曲和棉布走进更多人的生活。",
      status: "active",
      badge: "大都旅行家",
      sections: [
        {
          id: "08-01",
          title: "辽阔的交流",
          desc: "大都 · 驿站换马 · 元曲与棉布",
          ready: true,
          url: "episode.html?id=08-01"
        }
      ]
    },
    {
      id: "09",
      era: "明",
      years: "1368—1644",
      title: "远航与市井",
      emoji: "⛵",
      color: "#28706d",
      summary: "郑和下西洋，城市生活丰富，小说、瓷器与科技都很精彩。",
      status: "active",
      badge: "宝船小领航",
      sections: [
        {
          id: "09-01",
          title: "远航与市井",
          desc: "郑和下西洋 · 紫禁城 · 小说、青花瓷与《本草纲目》",
          ready: true,
          url: "episode.html?id=09-01"
        }
      ]
    },
    {
      id: "10",
      era: "清",
      years: "1644—1912",
      title: "最后一个王朝",
      emoji: "🏮",
      color: "#7f4c4a",
      summary: "统一多民族国家进一步发展，也在世界变化中寻找新路。",
      status: "active",
      badge: "近代小观察员",
      sections: [
        {
          id: "10-01",
          title: "最后一个王朝",
          desc: "康乾时期 · 鸦片战争 · 1912 年帝制结束",
          ready: true,
          url: "episode.html?id=10-01"
        }
      ]
    },
    {
      id: "11",
      era: "今天",
      years: "1912—今天",
      title: "历史还在继续",
      emoji: "🚄",
      color: "#306b76",
      summary: "高铁、航天和互联网改变生活，而吃饭、讲故事与家人的爱仍在延续。",
      status: "active",
      badge: "今日小史家",
      sections: [
        {
          id: "11-01",
          title: "历史还在继续",
          desc: "从近代走到今天 · 五千年里什么变了、什么没变",
          ready: true,
          url: "episode.html?id=11-01"
        }
      ]
    }
  ]
};
