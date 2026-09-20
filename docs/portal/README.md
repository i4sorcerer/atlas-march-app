# 🌈 好奇星球 · 全科启蒙统一门户

把多个儿童科普小站聚合成一个入口，按「学科 → 子类 → 知识点」三级目录分类浏览，
点开知识点用 iframe 嵌入原页面查看，探索/测验记录存入本地 SQLite。

## 启动

```bash
cd portal
npm start          # 或 node server.js
# 默认 http://localhost:4000  （PORT=8080 node server.js 可改端口）
```

> 服务器把整个 `atlas-march-app` 作为根目录提供，
> 所以门户里的 iframe 能加载 `../falcon9`、`../zhurong-hao`、`../history-kids` 等页面。
> 请务必通过这个 server 访问，而不是直接双击 html（否则跨目录/接口不可用）。

## 目录结构

```
portal/
├── index.html          门户首页（三级导航 + iframe 查看器 + 探索记录）
├── css/portal.css      儿童趣味风格样式
├── js/portal.js        导航渲染 / iframe / 历史记录逻辑
├── data/
│   ├── categories.js   ★ 分类目录配置（唯一需要维护的数据源）
│   └── curiosity.db    SQLite 数据库（运行后自动生成，已 gitignore）
├── pages/_template.html 新知识点页面模板
└── server.js           零依赖服务器 + node:sqlite（Node 22+ 内置）
```

## 如何补充新内容

编辑 `data/categories.js`：

- **新增一级学科**：往 `CATEGORIES` 加一项（含 subs）
- **新增二级子类**：往对应学科 `subs` 加一项（含 topics）
- **新增知识点**：往对应子类 `topics` 加：
  ```js
  { id: "planets", title: "八大行星", emoji: "🌍", desc: "简介", url: "pages/planets.html", ready: true }
  ```
  - `url` 留空 `""` 或 `ready:false` → 显示为「敬请期待」占位卡片
  - 内容页可复制 `pages/_template.html` 起步

## 探索记录 / 测验成绩

- 每次打开知识点会记录一条「看过」记录。
- 子页面做完小测验，调用（在 iframe 内）：
  ```js
  window.parent.postMessage({ type:"quiz-result", topicId:"falcon9", title:"猎鹰9号", emoji:"🚀", score:5, total:5 }, "*");
  ```
  成绩会写入 SQLite，点门户右上角「🏅 我的探索记录」查看。
- SQLite 不可用时自动降级到浏览器 localStorage，不影响使用。

## 当前已接入内容

| 学科 | 子类 | 知识点 | 状态 |
|------|------|--------|------|
| 航天探索 | 火箭 | 猎鹰9号 | ✅ |
| 航天探索 | 火星探测 | 祝融号火星车 | ✅ |
| 历史人文 | 中华朝代 | 中华历史朝代 | ✅ |
| 创客手工·DIY | 手搓小车 | 手搓平衡小车（含📚参考资源库入口） | ✅ |

其余分类均已建好目录，作为占位待补充。
