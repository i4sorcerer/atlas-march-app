# Repository Guidelines

## Project Structure & Module Organization

This is a static frontend project with no build step or third-party JS libraries. GitHub Pages serves only `docs/`.

- `docs/portal/` — unified portal (app shell, navigation data, server). `data/categories.js` is the single source of truth for the three-level navigation (subject → subcategory → topic).
- `docs/topics/` — shared topic engine. Add lesson content to `topic-data.js`; the page handles stats, cards, tiles, quizzes, and narration.
- `docs/shared/` — Mario design system. Replace only `mario-avatar.svg` to update the avatar everywhere; `mario.css` and `mario.js` provide styling, read-aloud, and interactions.
- `docs/<site>/` — standalone topic sites such as `changzheng/`, `falcon9/`, `zhurong-hao/`, `history-kids/`, `car/`, and `starship/`.
- `docs/insights/` — dated insight dashboards organized by topic under `archive/`.
- `docs/portal/server.js` — zero-dependency Node server using built-in `node:sqlite` (Node 22+).

## Build, Test, and Development Commands

```bash
cd docs/portal
npm start          # or: node server.js
PORT=8080 node server.js  # custom port
```

There is no build, lint, or test tooling. Browse through `http://localhost:4000`; the portal needs the server for cross-directory iframes and the history API.

## Coding Style & Naming Conventions

- Vanilla HTML/CSS/JS; edit data files (`categories.js`, `resources-data.js`, `disney-data.js`, `directory.js`) rather than rendering logic.
- Write child-facing copy in Mario's first-person voice, with short sentences for ages 3–6. Reuse `docs/shared/mario.css` and `mario.js`.
- Use relative paths everywhere. Never prefix with `/` — GitHub Pages serves under `/atlas-march-app/`. Cross-directory iframe URLs use `../<site>/<page>.html`.
- Indent with 2 spaces. Keep single-page sites self-contained; put shared data in a sibling `*-data.js` file.
- Name insight dashboards as `YYYY-MM-DD.html` inside the topic's `archive/` folder.

## Testing Guidelines

No automated tests exist. Manually verify: portal navigation renders, all topic links resolve, read-aloud starts and stops, quiz scores post via `window.parent.postMessage({ type: "quiz-result", ... })`, and pages fit mobile viewports without horizontal scrolling.

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
