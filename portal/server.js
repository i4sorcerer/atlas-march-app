/* =========================================================================
 *  好奇星球 · 全科启蒙门户 —— 零依赖服务器 + node:sqlite 记录探索/测验历史
 *
 *  用法：
 *    node server.js               默认 4000 端口
 *    PORT=8080 node server.js     自定义端口
 *  然后打开：http://localhost:4000
 *
 *  说明：
 *    - 服务根目录为「上一级」(整个 atlas-march-app)，
 *      这样门户 iframe 才能加载 ../falcon9、../zhurong-hao、../history-kids 等页面。
 *    - 访问 / 会自动跳到 /portal/index.html
 *    - node:sqlite 为 Node 22+ 内置模块，无需 npm install。
 *      若运行环境不支持，会自动降级为内存存储（重启即清空），不影响前端。
 *
 *  API：
 *    GET  /api/history          返回最近 100 条记录（JSON 数组，按时间倒序）
 *    POST /api/history          写入一条记录，body 为 JSON
 *    DELETE /api/history        清空全部记录
 * ========================================================================= */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4000;
const APP_ROOT = path.join(__dirname, ".."); // 整个项目根目录
const PORTAL_ENTRY = "/portal/index.html";

/* ---------------- 数据库（node:sqlite，带内存降级） ---------------- */
let db = null;
let memStore = []; // 降级用

function initDB() {
  try {
    const { DatabaseSync } = require("node:sqlite");
    const dbPath = path.join(__dirname, "data", "curiosity.db");
    db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS history (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        type    TEXT    NOT NULL DEFAULT 'visit',
        topicId TEXT,
        title   TEXT,
        emoji   TEXT,
        path    TEXT,
        score   INTEGER,
        total   INTEGER,
        ts      INTEGER NOT NULL
      );
    `);
    console.log("🗄  SQLite 已就绪：", dbPath);
  } catch (err) {
    db = null;
    console.warn("⚠️  node:sqlite 不可用，已降级为内存存储：", err.message);
  }
}

function insertRecord(r) {
  const rec = {
    type: r.type || "visit",
    topicId: r.topicId || null,
    title: r.title || null,
    emoji: r.emoji || null,
    path: r.path || null,
    score: r.score != null ? r.score : null,
    total: r.total != null ? r.total : null,
    ts: r.ts || Date.now()
  };
  if (db) {
    const stmt = db.prepare(
      `INSERT INTO history (type, topicId, title, emoji, path, score, total, ts)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.run(rec.type, rec.topicId, rec.title, rec.emoji, rec.path, rec.score, rec.total, rec.ts);
  } else {
    memStore.unshift(rec);
    memStore = memStore.slice(0, 200);
  }
  return rec;
}

function listRecords(limit = 100) {
  if (db) {
    return db.prepare(`SELECT * FROM history ORDER BY ts DESC LIMIT ?`).all(limit);
  }
  return memStore.slice(0, limit);
}

function clearRecords() {
  if (db) db.exec("DELETE FROM history");
  else memStore = [];
}

/* ---------------- 静态资源 ---------------- */
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function serveStatic(req, res, urlPath) {
  if (urlPath === "/") urlPath = PORTAL_ENTRY;

  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(APP_ROOT, safe);

  if (!filePath.startsWith(APP_ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("403 Forbidden");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404 找不到页面啦 🙈</h1>");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-cache" // 开发期避免浏览器缓存旧 JS/CSS，改完即时生效
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

/* ---------------- 请求路由 ---------------- */
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  // ---- API ----
  if (urlPath === "/api/history") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify(listRecords(100)));
    }
    if (req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        try {
          const rec = insertRecord(JSON.parse(body || "{}"));
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ ok: true, record: rec }));
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ ok: false, error: e.message }));
        }
      });
      return;
    }
    if (req.method === "DELETE") {
      clearRecords();
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify({ ok: true }));
    }
    res.writeHead(405).end();
    return;
  }

  // ---- 静态 ----
  serveStatic(req, res, urlPath);
});

initDB();
server.listen(PORT, () => {
  console.log("🌈 好奇星球 · 全科启蒙门户已启动！");
  console.log(`   打开浏览器访问 → http://localhost:${PORT}`);
});
