# 🌈 Curiosity Planet · Whole-Subject Enlightenment Playground

An interactive science-education web app for kids around **age 5**. It gathers several
children's science mini-sites into one unified portal, browsed by a three-level
**「subject → subcategory → topic」** navigation. Clicking a topic opens the content page
inside an iframe, and exploration / quiz records are stored in a local database.

The whole project is a **pure front-end static site with no build step**. It is data-driven
so it is easy to maintain and keep extending.

---

## ✨ Features

- 🧭 **Three-level portal navigation**: subject → subcategory → topic; click a card to open the content in an iframe
- 📚 **Reference library**: a subcategory can link a "reference library" entry (e.g. Rockets, DIY Car) to collect curated materials
- 🏅 **Exploration history**: records which topics were visited and quiz scores (Node built-in `node:sqlite`, auto-degrades when unavailable)
- 🎨 **Kid-friendly style**: rounded fonts + space theme + bouncy animations; mobile-first and responsive
- 🧩 **Data-driven**: categories, resources, and quizzes are split into separate data files — maintain data, not logic
- 🚀 **Zero third-party deps**: apart from the Google Fonts CDN, no external JS libraries are used

---

## 📂 Directory Structure

```
atlas-march-app/
│
├── portal/                     # ★ Unified portal (app shell + server + navigation data)
│   ├── index.html              #   Portal home (3-level nav + iframe viewer + history)
│   ├── css/portal.css
│   ├── js/portal.js            #   Nav rendering / iframe / history logic
│   ├── data/
│   │   ├── categories.js       #   ★ Category config (the only nav data source to maintain)
│   │   └── curiosity.db        #   SQLite DB (auto-generated at runtime, gitignored)
│   ├── pages/_template.html    #   Template for new topic content pages
│   └── server.js               #   Zero-dependency HTTP server (Node 22+ built-in node:sqlite)
│
├── changzheng/                 # 🚀 Rockets: Long March series + bilingual space reference library
│   ├── cz10.html               #   Long March 10 content page
│   ├── resources.html          #   Reference library (portal "Rockets" refs entry, top-right)
│   ├── resources.css
│   ├── resources.js            #   Reference library render logic
│   └── resources-data.js       #   ★ Reference library data (maintain this file day-to-day)
│
├── falcon9/                    # 🚀 Falcon 9 science mini-site
│   └── falcon9.html            #   Single-file page (Canvas starfield + rocket exploded view + launch sim + quiz)
│
├── zhurong-hao/                # 🔥 Zhurong Mars rover science mini-site
│   ├── index.html
│   ├── styles.css
│   ├── app.js                  #   All interactions (starfield / timeline / exploded view / driving / quiz)
│   └── server.js               #   Standalone light server (:3000, optional)
│
├── history-kids/               # 🐉 Chinese dynasties science mini-site
│   ├── index.html
│   ├── css/main.css
│   ├── js/                     #   data.js / eras.js / events.js / kings.js / timeline.js / quiz.js / hero.js / main.js / loader.js
│   ├── data/                   #   eras.json / events.json / kings.json / world.json / world-quiz.json
│   └── server.js
│
├── balance-car/                # ⚖️ DIY balancing robot car (parent-child garage project)
│   ├── index.html              #   Home: plan / roadmap / BOM / parent-child分工
│   ├── resources.html          #   Reference library (portal "DIY Car" refs entry)
│   ├── resources.css
│   ├── resources.js
│   ├── resources-data.js       #   ★ Reference library data (maintain this file day-to-day)
│   └── SPEC.md                 #   Detailed planning doc (selection / BOM / algorithm path)
│
├── english/                    # 🔤 English enlightenment (bilingual): Disney World etc.
│   ├── disney.html             #   Disney World content page (portal "迪士尼世界" entry)
│   ├── disney.css
│   ├── disney.js               #   Card rendering / detail modal / language-switch logic
│   └── disney-data.js          #   ★ Disney character data (zh/en pairs; maintain this file day-to-day)
│
├── .gitignore
├── README.md                   # Chinese version (this file's sibling)
└── README.en.md                # ← This file (English version)
```

> The portal also has 7 pre-built placeholder subjects (Animals / Natural Science / Human Body /
> Earth / Math / Tech / more) ready to be filled in following the templates.

**🌍 English Enlightenment (bilingual zone)**: wired in as a real subject, initialized with
**Disney World** (`english/disney.html`) — kids learn English through familiar friends like Mickey
and Elsa. Every key label is **bilingual (zh/en)** with a one-tap **中文 / English / 双语** switch,
so parents can guide step-by-step enlightenment. Disney World is ready now; the subcategories
Basic Words / Phonics / Nursery Rhymes / Daily Talk are scaffolded as "coming soon" placeholders
to be filled in over time.

---

## 🚀 Quick Start

### Option 1: Unified access via the portal (recommended)

The portal serves **the whole `atlas-march-app` as the root directory**, so the iframe can load
`../falcon9`, `../zhurong-hao`, `../history-kids`, etc. Always access it through the server —
**do not double-click the html files** (cross-directory iframes and the history API would break).

```bash
# Requires Node 22+ (uses built-in node:sqlite; older versions auto-degrade to in-memory storage)
cd portal
node server.js
# Then open in your browser: http://localhost:4000
```

Custom port:

```bash
PORT=8080 node server.js        # → http://localhost:8080
```

> Visiting `/` auto-redirects to `/portal/index.html`.

### Option 2: Run a sub-site standalone (optional)

Some sub-sites ship their own `server.js` for isolated preview (see each site's README / SPEC for the port):

```bash
cd zhurong-hao && node server.js     # → http://localhost:3000
cd history-kids  && node server.js
```

> Standalone runs are for local debugging only; the unified entry point is always the portal.

---

## 🧱 How to Add Content

### 1. Add a topic (most common)

Just edit **`portal/data/categories.js`** and add an item to the target subcategory's `topics`:

```js
{
  id: "cz5", title: "Long March 5", emoji: "🚀",
  desc: "China's big fat rocket",
  url: "../changzheng/cz5.html",   // content page path relative to portal root
  ready: true                      // false / empty url = "coming soon" placeholder card
}
```

A content page can start from `portal/pages/_template.html`, or reuse a sub-site's page structure.

### 2. Add a subcategory / subject

Add an item with `topics` to the subject's `subs`, or add a top-level item to `CATEGORIES`.
Likewise, a topic with `url:""` renders as a placeholder card.

### 3. Attach a "reference library" to a subcategory

Add a `refs` field to the subcategory; the portal renders an entry button at the top-right of that subcategory:

```js
refs: {
  title: "Reference Library", emoji: "📚",
  desc: "Bilingual space science materials (videos / documentaries / podcasts)",
  url: "../changzheng/resources.html"
}
```

The library itself is maintained via a standalone data file (e.g. `changzheng/resources-data.js`,
`balance-car/resources-data.js`) — edit data to add/remove materials, no need to touch render logic.

### 4. Add a Disney character / English content (bilingual)

The English Disney page is **data-driven** — just edit `english/disney-data.js` (no need to touch `disney.js`):

```js
{
  id: "moana", emoji: "🌊",
  nameZh: "海洋奇缘", nameEn: "Moana",
  tagZh: "勇敢的航海少女", tagEn: "A brave voyaging girl",
  descZh: "莫阿娜出海寻找传说，唤醒大地之神。",
  descEn: "Moana sails to find a legend and awakens the earth goddess.",
  phraseEn: "I am Moana!", phraseZh: "我是莫阿娜！",
  color: "#19B5A6"
}
```

On save + refresh, the new character appears in the grid automatically and supports the
中文 / English / 双语 switch out of the box. To add other English subcategories (Basic Words /
Phonics / Nursery Rhymes / Daily Talk), follow **Step 2** and add `subs` under the `english` subject.

---

## 🏅 Exploration History / Quiz Scores

- Every time a topic is opened, the portal auto-writes a "visited" record.
- When a content page finishes a quiz, call this inside the iframe to report the score:

  ```js
  window.parent.postMessage(
    { type: "quiz-result", topicId: "falcon9", title: "Falcon 9",
      emoji: "🚀", score: 5, total: 5 }, "*"
  );
  ```

- Click **🏅 My Exploration History** at the top-right of the portal to view past records.
- Data is stored in `portal/data/curiosity.db` (`node:sqlite`). When `node:sqlite` is unavailable
  it auto-degrades to in-memory storage (cleared on restart) without affecting the front-end.

### Local API (for debugging)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/history` | Return the latest 100 records (JSON array, newest first) |
| POST | `/api/history` | Write one record, body is JSON |
| DELETE | `/api/history` | Clear all records |

---

## 🌐 Deployment

Pure static assets — deploy to any static host (GitHub Pages / Cloudflare Pages / Nginx, etc.).

- If you use the portal API (`/api/history`), you need a Node environment that can run `portal/server.js`.
  On pure static hosting the history is unavailable, but browsing / iframe embedding still works.
- Any static server pointing its root at `atlas-march-app` also works (keep the relative paths `../xxx`).

---

## 📌 Notes

- **`.gitignore`** already ignores: `.DS_Store`, `.workbuddy/`, `*.db`, `node_modules/`, `.cache/`, `__pycache__/`,
  so `curiosity.db` is not committed and history stays local.
- **Fonts**: loaded via Google Fonts CDN (ZCOOL KuaiLe / Fredoka One / Nunito); offline falls back to system fonts.
- **Repo**: `https://github.com/i4sorcerer/atlas-march-app.git` (`main` branch).
