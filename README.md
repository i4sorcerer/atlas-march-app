# 🌈 好奇星球 · 全科启蒙探索乐园

> 🔗 **在线访问地址**：[https://i4sorcerer.github.io/atlas-march-app/portal/](https://i4sorcerer.github.io/atlas-march-app/portal/)

一个面向 **5 岁左右小朋友** 的互动科普启蒙 Web 应用。把多个儿童科普小站聚合到一个统一门户，
按 **「学科 → 子类 → 知识点」** 三级目录浏览，点开知识点用 iframe 嵌入原页面查看，
探索 / 测验记录存入本地数据库。

整个项目是 **纯前端静态站点**，没有构建步骤（no build step），数据驱动渲染，方便持续维护和扩充。

---

## ✨ 特性

- 🧭 **三级导航门户**：学科 → 子类 → 知识点，点卡片即用 iframe 打开内容页
- 📚 **参考资源库**：每个子类可挂一个"参考资源库"入口（如火箭、手搓小车），集中维护精选素材
- 🏅 **探索记录**：记录看过哪些知识点、测题得了多少分（Node 内置 `node:sqlite`，不可用时自动降级）
- 🎨 **儿童趣味风格**：圆润字体 + 星际主题 + 弹性动画，移动端优先、自适应
- 🧩 **数据驱动**：分类、资源、题库都拆成独立数据文件，日常只改数据、不动逻辑
- 🚀 **零外部依赖**：除了 Google Fonts CDN，不引入任何第三方 JS 库

---

## 📂 目录结构

```
atlas-march-app/
│
├── portal/                     # ★ 统一门户（应用外壳 + 服务器 + 导航数据）
│   ├── index.html              #   门户首页（三级导航 + iframe 查看器 + 探索记录）
│   ├── css/portal.css
│   ├── js/portal.js            #   导航渲染 / iframe / 历史记录逻辑
│   ├── data/
│   │   ├── categories.js       #   ★ 分类目录配置（唯一需要维护的导航数据源）
│   │   └── curiosity.db        #   SQLite 数据库（运行后自动生成，已 gitignore）
│   ├── pages/_template.html    #   新知识点内容页模板
│   └── server.js               #   零依赖 HTTP 服务器（Node 22+ 内置 node:sqlite）
│
├── changzheng/                 # 🚀 火箭分类：长征系列 + 双语航天科普参考资源库
│   ├── cz10.html               #   长征十号 内容页
│   ├── resources.html          #   参考资源库（portal「火箭」refs 入口，右上角）
│   ├── resources.css
│   ├── resources.js            #   资源库渲染逻辑
│   └── resources-data.js       #   ★ 资源库数据源（日常只维护这个文件）
│
├── falcon9/                    # 🚀 猎鹰9号 科普互动站
│   └── falcon9.html            #   单文件页面（Canvas 星空 + 火箭爆炸图 + 发射模拟 + 小问答）
│
├── zhurong-hao/                # 🔥 祝融号火星车 科普互动站
│   ├── index.html
│   ├── styles.css
│   ├── app.js                  #   全部交互（星空 / 时间线 / 爆炸图 / 驾驶 / 问答）
│   └── server.js               #   独立轻量服务器（:3000，可选）
│
├── history-kids/               # 🐉 中华历史朝代 科普站
│   ├── index.html
│   ├── css/main.css
│   ├── js/                     #   data.js / eras.js / events.js / kings.js / timeline.js / quiz.js / hero.js / main.js / loader.js
│   ├── data/                   #   eras.json / events.json / kings.json / world.json / world-quiz.json
│   └── server.js
│
├── balance-car/                # ⚖️ 手搓平衡小车（父子车库 DIY 计划）
│   ├── index.html              #   主页：方案 / 路线图 / BOM / 亲子分工
│   ├── resources.html          #   参考资源库（portal「手搓小车」refs 入口）
│   ├── resources.css
│   ├── resources.js
│   ├── resources-data.js       #   ★ 资源库数据源（日常只维护这个文件）
│   └── SPEC.md                 #   详细规划文档（选型 / BOM / 算法路径）
│
├── english/                    # 🔤 英语启蒙（双语）：迪士尼世界（动画大全）等
│   ├── disney.html             #   迪士尼世界内容页（portal「迪士尼世界」入口）
│   ├── disney.css
│   ├── disney.js               #   年代分组 / 搜索筛选 / 详情弹层 / 语言切换逻辑
│   └── disney-data.js          #   ★ 迪士尼/Pixar 动画数据（按年代+角色，中英文对照，日常只维护这个文件）
│
├── .gitignore
├── README.md                   # ← 本文件（中文）
└── README.en.md                #   英文版说明
```

> ⚠️ **目录已整体迁入 `docs/`**：上面列出的 `portal/` 与各内容站（`changzheng/`、`falcon9/`、`zhurong-hao/`、`history-kids/`、`balance-car/`、`english/`）现在都放在仓库的 **`docs/`** 目录下（即 `docs/portal/`、`docs/changzheng/` …）。GitHub Pages 只托管 `docs/`，新增内容目录请直接建在 `docs/` 里。
>
> portal 还内置了 7 个已建好目录的占位学科（动物世界 / 自然科学 / 人体奥秘 / 地球家园 /
> 数学思维 / 科技发明 / 更多），方便后续按模板填充内容。

**🌍 英语启蒙（双语专区）**：已作为正式学科接入门户，初始化内容为 **迪士尼世界**
（`english/disney.html`）——一部**按年代分组的迪士尼 / 皮克斯动画大全**，方便系统启蒙。
- **分类整理**：动画按 5 个年代分组展示 —— 经典时代(1937–1967) / 过渡时期(1970–1988) /
  文艺复兴(1989–1999) / 现代 CG(2000–) / 皮克斯(1995–)，目前共收录 **73 部**长篇动画。
- **动画与角色分离**：每部动画卡下方列出其**关键角色**（每部 ≥2 个），点开动画弹层可看
  每个角色的中英文名、身份与「学一句」英语短句。
- **搜索 / 筛选**：顶部搜索框可按**动画名或角色名**（中英文均可）即时过滤；年代 chips 一键筛选某一时期。
- **奥斯卡标识与筛选**：获得「奥斯卡最佳动画长片」的影片（如《冰雪奇缘》《玩具总动员3》《COCO》《心灵奇旅》等，共 **16 部**）卡片角标带 🏆，并可一键「只看奥斯卡最佳」快速筛选（与年代、搜索可叠加）。
- **中英文对照**：所有关键文案都做中英文两路，并带「中文 / English / 双语」一键切换，
  方便家长陪孩子循序渐进地启蒙。

目前迪士尼世界已就绪，基础词汇 / 自然拼读 / 儿歌童谣 / 日常对话等子类已建好骨架
（显示「敬请期待」），可一步步补充。

---

## 🚀 快速启动

### 方式一：通过门户统一访问（推荐）

本地服务器（`docs/portal/server.js`）把 **整个 `docs/` 目录作为根目录** 提供，
所以门户（`docs/portal/index.html`）里的 iframe 能加载 `../changzheng`、`../english` 等兄弟目录。
请务必通过服务器访问，**不要直接双击 html 文件**（否则跨目录 iframe 和探索记录接口都用不了）。

```bash
# 需要 Node 22+（用了内置 node:sqlite；低版本会自动降级为内存存储，不影响前端）
cd docs/portal
node server.js
# 然后浏览器打开： http://localhost:4000
```

自定义端口：

```bash
PORT=8080 node server.js        # → http://localhost:8080
```

> 访问 `/` 会自动跳转到 `/portal/index.html`（线上 `docs/index.html` 也会跳到 `/portal/`）。

### 方式二：单独启动某个子站点（可选）

部分子站自带独立 `server.js`，可单独预览（端口见各站 README / SPEC）：

```bash
cd zhurong-hao && node server.js     # → http://localhost:3000
cd history-kids  && node server.js
```

> 单独启动仅供本地调试；对外统一入口始终是 portal。

---

## 🧱 如何新增内容

### 1. 新增一个知识点（最常见）

只需编辑 **`portal/data/categories.js`**，往对应的 子类 `topics` 里加一项：

```js
{
  id: "cz5", title: "长征五号", emoji: "🚀",
  desc: "中国的大火箭胖五",
  url: "../changzheng/cz5.html",   // 内容页相对门户根目录
  ready: true                      // false / 留空 url = 显示"敬请期待"占位
}
```

内容页可以复制 `portal/pages/_template.html` 起步，也可以复用某子站的页面结构。

### 2. 新增一个子类 / 学科

往对应学科的 `subs` 加一项（含 `topics`），或直接往 `CATEGORIES` 数组加一项。
同理，`url:""` 的 topic 会显示为占位卡片。

### 3. 给子类挂一个"参考资源库"

在子类里加 `refs` 字段，门户会在该子类右上角渲染入口按钮：

```js
refs: {
  title: "参考资源库", emoji: "📚",
  desc: "双语航天科普素材库（视频 / 纪录片 / 播客）",
  url: "../changzheng/resources.html"
}
```

资源库本身用独立数据文件维护（如 `changzheng/resources-data.js`、
`balance-car/resources-data.js`），改数据即可增删素材，无需改渲染逻辑。

### 4. 新增迪士尼形象 / 英语内容（双语）

英语启蒙的迪士尼页是 **数据驱动** 的，日常只改 `english/disney-data.js`（无需动 `disney.js`）：

```js
{
  id: "moana", era: "modern", year: 2016, emoji: "🌊",
  titleZh: "海洋奇缘", titleEn: "Moana",
  descZh: "少女莫阿娜出海，帮半神毛伊归还心。",
  descEn: "Girl Moana sails to help demigod Maui return the heart.",
  characters: [
    { nameZh: "莫阿娜", nameEn: "Moana", emoji: "🌺", roleZh: "航海的少女", roleEn: "The voyaging girl", phraseEn: "I am Moana!", phraseZh: "我是莫阿娜！" },
    { nameZh: "毛伊", nameEn: "Maui", emoji: "🪝", roleZh: "自大的半神", roleEn: "The boastful demigod", phraseEn: "You're welcome!", phraseZh: "不用谢！" }
  ]
}
```

`era` 取以下之一：`classic`(经典) / `bronze`(过渡) / `renaissance`(文艺复兴) / `modern`(现代) / `pixar`(皮克斯)。
保存后刷新页面，新动画会自动归入对应年代分组，且天然支持搜索 / 年代筛选 / 中·英·双语切换。
要新增其他英语子类（基础词汇 / 自然拼读 / 儿歌 / 对话），按 **第 2 步** 在 `english` 学科下加 `subs` 即可。

---

## 🏅 探索记录 / 测验成绩

- 每次打开知识点，门户会自动写入一条「看过」记录。
- 内容页做完小测验，在 iframe 内调用即可上报成绩：

  ```js
  window.parent.postMessage(
    { type: "quiz-result", topicId: "falcon9", title: "猎鹰9号",
      emoji: "🚀", score: 5, total: 5 }, "*"
  );
  ```

- 点门户右上角 **🏅 我的探索记录** 查看历史。
- 数据存于 `portal/data/curiosity.db`（`node:sqlite`）。`node:sqlite` 不可用时自动降级为内存存储，重启即清空，不影响前端体验。

### 本地 API（调试用）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/history` | 返回最近 100 条记录（JSON 数组，按时间倒序） |
| POST | `/api/history` | 写入一条记录，body 为 JSON |
| DELETE | `/api/history` | 清空全部记录 |

---

## 🌐 部署（GitHub Pages）

项目已配置 **GitHub Pages 源 = `main` 分支 / `docs` 文件夹**，`docs/` 即站点根：
- 线上地址：`https://i4sorcerer.github.io/atlas-march-app/`
- 门户入口：`https://i4sorcerer.github.io/atlas-march-app/portal/`（访问根地址会自动跳到 `/portal/`）
- **纯静态托管，不需要 Node**：`server.js` 仅本地调试用，线上不运行；探索记录接口 `/api/history` 在 Pages 上不存在，门户自动回退到浏览器 `localStorage`。

### ⚠️ 路径规则（改页面的人必读，否则线上样式/资源 404）

GitHub Pages 是**项目站点**，挂在 `/<仓库名>/` 下（本仓库即 `/atlas-march-app/`）。
**以 `/` 开头的绝对路径会解析到域名根，漏掉仓库名，线上全部 404。** 务必遵守：

1. **本地资源用相对路径**，不要写 `/xxx` 绝对路径。门户 `docs/portal/index.html` 引自身资源写 `css/portal.css`、`js/portal.js`、`data/categories.js`（已改好）；内容页引自身资源写 `css/xxx.css` 等相对路径。
2. **跨目录嵌入用相对 `../`**：`docs/portal/data/categories.js` 里 topic 的 `url` 写 `../changzheng/cz10.html` 这种相对门户根的路径（已就位）。
3. 若必须用绝对路径，要带仓库前缀：`/atlas-march-app/portal/css/portal.css`（不推荐，改名仓库即失效）。
4. **所有要上线的内容必须放在 `docs/` 内**——Pages 只托管 `docs/`，仓库根的其他目录不会被托管，iframe 会 404。新增内容目录直接建在 `docs/` 下。

### 其他静态托管

纯静态资源也可部署到 Cloudflare Pages / Nginx 等。若要用门户 API（`/api/history`），需能运行
`docs/portal/server.js` 的 Node 环境；纯静态托管则探索记录不可用，但浏览 / iframe 嵌入照常工作。
任意静态服务器把根目录指向 `docs/` 即可（保持相对路径 `../xxx`）。

---

## 📌 说明

- **`.gitignore`** 已忽略：`.DS_Store`、`.workbuddy/`、`*.db`、`node_modules/`、`.cache/`、`__pycache__/`，
  因此 `curiosity.db` 不会被提交，记录留在本机。
- **字体**：通过 Google Fonts CDN 加载（ZCOOL KuaiLe / Fredoka One / Nunito），离线环境会回退到系统字体。
- **仓库**：`https://github.com/i4sorcerer/atlas-march-app.git`（`main` 分支）。
