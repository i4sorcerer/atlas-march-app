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
      summary: "天地从哪里来？人从哪里来？古人用想象讲出了自己的答案。",
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
        { id: "01-02", title: "涿鹿之战", desc: "炎帝、黄帝和蚩尤的故事", ready: false },
        { id: "01-03", title: "大禹治水", desc: "从洪水到夏朝的传说", ready: false }
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
      status: "locked"
    },
    {
      id: "03",
      era: "春秋战国",
      years: "前770—前221",
      title: "百家争鸣",
      emoji: "📜",
      color: "#507b69",
      summary: "诸侯争霸，思想家辈出，一个热闹又动荡的时代。",
      status: "locked"
    },
    {
      id: "04",
      era: "秦汉",
      years: "前221—220",
      title: "大一统",
      emoji: "🐉",
      color: "#9b3c32",
      summary: "统一文字和度量衡，丝绸之路把中国与世界连在一起。",
      status: "locked"
    },
    {
      id: "05",
      era: "魏晋南北朝",
      years: "220—589",
      title: "分裂与交融",
      emoji: "🪷",
      color: "#6b728d",
      summary: "政权更替、民族交融，文化艺术仍然闪闪发光。",
      status: "locked"
    },
    {
      id: "06",
      era: "隋唐",
      years: "581—907",
      title: "盛世长安",
      emoji: "🏯",
      color: "#c97d35",
      summary: "大运河、唐诗、长安城，一个开放而自信的时代。",
      status: "locked"
    },
    {
      id: "07",
      era: "两宋",
      years: "960—1279",
      title: "风雅与发明",
      emoji: "🍵",
      color: "#3f7d78",
      summary: "城市繁华、词画风流，活字印刷和指南针改变生活。",
      status: "locked"
    },
    {
      id: "08",
      era: "元",
      years: "1271—1368",
      title: "辽阔的交流",
      emoji: "🐎",
      color: "#587391",
      summary: "疆域辽阔，东西方往来频繁，戏曲也热闹起来。",
      status: "locked"
    },
    {
      id: "09",
      era: "明",
      years: "1368—1644",
      title: "远航与市井",
      emoji: "⛵",
      color: "#28706d",
      summary: "郑和下西洋，城市生活丰富，小说和科技都很精彩。",
      status: "locked"
    },
    {
      id: "10",
      era: "清",
      years: "1644—1912",
      title: "最后一个王朝",
      emoji: "🏮",
      color: "#7f4c4a",
      summary: "统一多民族国家进一步发展，也在世界变化中寻找新路。",
      status: "locked"
    }
  ]
};
