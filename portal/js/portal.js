/* ============ 好奇星球 · 门户交互逻辑 ============
 * 三级导航：学科(L1) → 子类(L2) → 知识点卡片
 * 点击知识点 → iframe 嵌入内容页
 * 探索记录：优先读后端 /api/history（SQLite），失败则回退到 localStorage
 * ================================================ */

(function () {
  const CATS = window.CATEGORIES || [];

  // 元素
  const browse = document.getElementById("browse");
  const crumbs = document.getElementById("crumbs");
  const viewer = document.getElementById("viewer");
  const viewerFrame = document.getElementById("viewerFrame");
  const viewerTitle = document.getElementById("viewerTitle");
  const openNew = document.getElementById("openNew");
  const backBtn = document.getElementById("backBtn");
  const homeBtn = document.getElementById("homeBtn");
  const historyBtn = document.getElementById("historyBtn");
  const historyModal = document.getElementById("historyModal");
  const historyClose = document.getElementById("historyClose");
  const historyBody = document.getElementById("historyBody");

  // 当前路径状态
  let state = { l1: null, l2: null };

  /* ---------- 渲染：一级学科总览 ---------- */
  function renderHome() {
    state = { l1: null, l2: null };
    hideViewer();
    setCrumbs([{ label: "🏠 全部学科" }]);
    browse.innerHTML = `
      <h1 class="section-title">🌈 选一个你好奇的领域吧！</h1>
      <p class="section-sub">这里有 ${CATS.length} 大探索主题，点一点开始冒险～</p>
      <div class="grid">${CATS.map(catCard).join("")}</div>`;
    bindCards(browse, (id) => renderCategory(id));
  }

  function catCard(cat) {
    const topicCount = cat.subs.reduce((n, s) => n + s.topics.length, 0);
    return `
      <div class="card" data-id="${cat.id}" style="--accent:${cat.color}">
        <span class="card-emoji">${cat.emoji}</span>
        <div class="card-title">${cat.name}</div>
        <div class="card-desc">${cat.desc}</div>
        <span class="card-count">${cat.subs.length} 个分类 · ${topicCount} 个知识点</span>
      </div>`;
  }

  /* ---------- 渲染：二级子类 ---------- */
  function renderCategory(l1) {
    const cat = CATS.find((c) => c.id === l1);
    if (!cat) return renderHome();
    state = { l1, l2: null };
    hideViewer();
    setCrumbs([
      { label: "🏠 全部学科", go: renderHome },
      { label: `${cat.emoji} ${cat.name}` }
    ]);
    browse.innerHTML = `
      <h1 class="section-title">${cat.emoji} ${cat.name}</h1>
      <p class="section-sub">${cat.desc}　选一个小分类继续探索吧！</p>
      <div class="grid">${cat.subs.map((s) => subCard(s, cat.color)).join("")}</div>`;
    bindCards(browse, (id) => renderSub(l1, id));
  }

  function subCard(sub, color) {
    return `
      <div class="card" data-id="${sub.id}" style="--accent:${color}">
        <span class="card-emoji">${sub.emoji}</span>
        <div class="card-title">${sub.name}</div>
        <div class="card-desc">共 ${sub.topics.length} 个知识点</div>
        <span class="card-count">点我进去看看 →</span>
      </div>`;
  }

  /* ---------- 渲染：三级知识点 ---------- */
  function renderSub(l1, l2) {
    const cat = CATS.find((c) => c.id === l1);
    const sub = cat && cat.subs.find((s) => s.id === l2);
    if (!sub) return renderCategory(l1);
    state = { l1, l2 };
    hideViewer();
    setCrumbs([
      { label: "🏠 全部学科", go: renderHome },
      { label: `${cat.emoji} ${cat.name}`, go: () => renderCategory(l1) },
      { label: `${sub.emoji} ${sub.name}` }
    ]);
    const refHtml = (sub.refs && sub.refs.url)
      ? `<a class="sub-ref" href="${sub.refs.url}" target="_blank" rel="noopener" title="${sub.refs.desc || ""}">${sub.refs.emoji || "📚"} ${sub.refs.title}</a>`
      : "";
    browse.innerHTML = `
      <div class="sub-head">
        <div class="sub-head-text">
          <h1 class="section-title">${sub.emoji} ${sub.name}</h1>
          <p class="section-sub">点开一个知识点，开始你的探索之旅吧！</p>
        </div>
        ${refHtml}
      </div>
      <div class="grid">${sub.topics.map((t) => topicCard(t, cat.color)).join("")}</div>`;

    // 绑定知识点点击
    browse.querySelectorAll(".card[data-topic]").forEach((el) => {
      const t = sub.topics.find((x) => x.id === el.dataset.topic);
      if (!t || !t.ready || !t.url) return;
      el.addEventListener("click", () => openTopic(cat, sub, t));
    });
  }

  function topicCard(t, color) {
    const locked = !t.ready || !t.url;
    return `
      <div class="card ${locked ? "locked" : ""}" data-topic="${t.id}" style="--accent:${color}">
        ${locked ? '<span class="badge-soon">敬请期待</span>' : '<span class="badge-ready">✓ 可探索</span>'}
        <span class="card-emoji">${t.emoji}</span>
        <div class="card-title">${t.title}</div>
        <div class="card-desc">${t.desc}</div>
        ${locked ? "" : '<span class="card-count">开始探索 🚀</span>'}
      </div>`;
  }

  /* ---------- iframe 打开内容 ---------- */
  function openTopic(cat, sub, t) {
    viewerFrame.src = t.url;
    viewerTitle.textContent = `${t.emoji} ${t.title}`;
    openNew.href = t.url;
    viewer.classList.remove("hidden");
    browse.classList.add("hidden");
    crumbs.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // 记录一次访问
    logVisit({
      topicId: t.id,
      title: t.title,
      emoji: t.emoji,
      path: `${cat.name} / ${sub.name} / ${t.title}`
    });
  }

  function hideViewer() {
    viewer.classList.add("hidden");
    viewerFrame.src = "about:blank";
    browse.classList.remove("hidden");
    crumbs.classList.remove("hidden");
  }

  function backToBrowse() {
    if (state.l2) renderSub(state.l1, state.l2);
    else if (state.l1) renderCategory(state.l1);
    else renderHome();
  }

  /* ---------- 面包屑 ---------- */
  function setCrumbs(items) {
    crumbs.innerHTML = items
      .map((it, i) => {
        const last = i === items.length - 1;
        const sep = i > 0 ? '<span class="sep">›</span>' : "";
        if (last) return `${sep}<span class="current">${it.label}</span>`;
        return `${sep}<a data-i="${i}">${it.label}</a>`;
      })
      .join(" ");
    crumbs.querySelectorAll("a[data-i]").forEach((a) => {
      const it = items[+a.dataset.i];
      if (it.go) a.addEventListener("click", it.go);
    });
  }

  function bindCards(container, handler) {
    container.querySelectorAll(".card[data-id]").forEach((el) => {
      el.addEventListener("click", () => handler(el.dataset.id));
    });
  }

  /* ---------- 探索记录（后端 SQLite + localStorage 回退） ---------- */
  const LS_KEY = "curiosity_history";

  function logVisit(item) {
    const record = { ...item, type: "visit", ts: Date.now() };
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    }).catch(() => saveLocal(record));
    saveLocal(record); // 双写：本地也留一份，离线可用
  }

  function saveLocal(record) {
    try {
      const arr = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      arr.unshift(record);
      localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(0, 100)));
    } catch (e) {}
  }

  async function loadHistory() {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) return data;
      }
    } catch (e) {}
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  async function showHistory() {
    historyModal.classList.remove("hidden");
    historyBody.innerHTML = '<p class="history-empty">加载中…</p>';
    const list = await loadHistory();
    if (!list.length) {
      historyBody.innerHTML =
        '<p class="history-empty">还没有探索记录哦～<br>快去点开一个知识点开始冒险吧！🚀</p>';
      return;
    }
    historyBody.innerHTML = list
      .slice(0, 50)
      .map((h) => {
        const time = new Date(h.ts).toLocaleString("zh-CN", {
          month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
        });
        const score =
          h.type === "quiz" && h.score != null
            ? `<span class="h-score">得分 ${h.score}${h.total ? "/" + h.total : ""}</span>`
            : `<span class="h-score" style="background:#5b7cfa">看过啦</span>`;
        return `
          <div class="hist-item">
            <span class="h-emoji">${h.emoji || "📘"}</span>
            <div class="h-main">
              <div class="h-title">${h.title || h.topicId}</div>
              <div class="h-time">${h.path ? h.path + " · " : ""}${time}</div>
            </div>
            ${score}
          </div>`;
      })
      .join("");
  }

  /* ---------- 事件绑定 ---------- */
  backBtn.addEventListener("click", backToBrowse);
  homeBtn.addEventListener("click", (e) => { e.preventDefault(); renderHome(); });
  historyBtn.addEventListener("click", showHistory);
  historyClose.addEventListener("click", () => historyModal.classList.add("hidden"));
  historyModal.addEventListener("click", (e) => {
    if (e.target === historyModal) historyModal.classList.add("hidden");
  });

  // 允许子页面通过 postMessage 上报测验成绩
  window.addEventListener("message", (e) => {
    const d = e.data;
    if (d && d.type === "quiz-result") {
      const record = {
        type: "quiz",
        topicId: d.topicId || "unknown",
        title: d.title || "小测验",
        emoji: d.emoji || "🎯",
        score: d.score,
        total: d.total,
        ts: Date.now()
      };
      fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      }).catch(() => {});
      saveLocal(record);
    }
  });

  // 启动
  renderHome();
})();
