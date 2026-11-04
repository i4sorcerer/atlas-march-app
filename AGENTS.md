# Repository Guidelines

## Project Structure & Module Organization

This is a pure static frontend project (no build step, no third-party JS libraries). All deployable content lives in `docs/` — GitHub Pages serves only this directory.

- `docs/portal/` — unified portal (app shell, navigation data, server). `data/categories.js` is the single source of truth for the three-level navigation (subject → subcategory → topic).
- `docs/portal/pages/_template.html` — copy this to create new topic content pages.
- `docs/<site>/` — standalone topic sites (`changzheng/`, `falcon9/`, `zhurong-hao/`, `history-kids/`, `balance-car/`, `english/`, `car/`, `starship/`, `dongfeng/`, `zhuque/`, `webnav/`). Each may have its own data files and optional `server.js`.
- `docs/insights/` — daily insight dashboards (`ai/`, `musk/`, `satellites/`, `kidplay/`, `innovators/`), organized by topic with dated HTML archives.
- `docs/portal/server.js` — zero-dependency Node server using built-in `node:sqlite` (Node 22+).

## Build, Test, and Development Commands

```bash
cd docs/portal
npm start          # or: node server.js
PORT=8080 node server.js  # custom port
```

There is no build, lint, or test tooling. Verify changes by running the server and browsing pages at `http://localhost:4000`. Do not open HTML files directly — the portal requires the server for cross-directory iframes and the history API.

## Coding Style & Naming Conventions

- Vanilla HTML/CSS/JS; keep pages data-driven. Edit data files (`categories.js`, `resources-data.js`, `disney-data.js`, `directory.js`) rather than rendering logic.
- Use relative paths everywhere. Never prefix with `/` — GitHub Pages serves under `/atlas-march-app/`. Cross-directory iframe URLs use `../<site>/<page>.html`.
- Indent with 2 spaces. Keep single-page sites self-contained; shared data goes in a sibling `*-data.js` file.
- Name insight dashboards as `YYYY-MM-DD.html` inside the topic's `archive/` folder.

## Testing Guidelines

No automated tests exist. Manually verify: portal navigation renders, topic pages load in iframes, quiz scores post via `window.parent.postMessage({ type: "quiz-result", ... })`, and pages work on mobile viewports.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commits style with Chinese descriptions:

```
feat(portal): 新增「汽车构造与分类」栏目
insights(musk): 2026-10-20 每日马斯克研判看板
refactor(car): 汽车页重做为「纯电动汽车全车拆解」
```

Types observed in history: `feat`, `refactor`, `insights`. Scope with the site or feature name. PRs should describe the change, link related issues, and include screenshots for visual changes.

## Security & Configuration Tips

- No secrets or API keys should be committed.
- `*.db` (SQLite runtime data) and `node_modules/` are gitignored — do not force-add them.
- Keep external dependencies to Google Fonts CDN only; do not add JS libraries.
