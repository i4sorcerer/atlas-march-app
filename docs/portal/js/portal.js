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
  let hubRAF = null; // 星图公转动画句柄，重建时取消

  /* ---------- 渲染：一级学科总览（引力中枢星图 方案A） ---------- */
  function renderHome() {
    state = { l1: null, l2: null };
    hideViewer();
    setCrumbs([{ label: "🏠 全部学科" }]);
    browse.innerHTML = `
      <div class="hub-stage">
        <div class="hub-head">
          <h1>🧭 探索星图</h1>
          <p>中心是「个人洞察」总览 · 悬停暂停公转 · 拖动卡片松手会慢慢回位 · 点击学科展开分支</p>
        </div>
        <div class="stage">
          <svg id="hub" viewBox="0 0 1000 640" role="img" aria-label="以个人洞察为中心的引力中枢星图">
            <g id="hubContent"></g>
          </svg>
        </div>
      </div>`;
    buildHub();
  }

  /* ---------- 引力中枢星图：公转 + 虚化连线 + 拖拽回弹 ---------- */
  function buildHub() {
    if (hubRAF) { cancelAnimationFrame(hubRAF); hubRAF = null; }
    const svg = document.getElementById("hub");
    const content = document.getElementById("hubContent");
    if (!svg || !content) return;

    const CX = 500, CY = 320, R = 235;
    const center = CATS.filter((c) => c.id === "insights")[0] || CATS[0];
    const branches = CATS.filter((c) => c !== center);
    const N = branches.length;

    const parts = branches.map((c, i) => {
      const ang = (-90 + i * (360 / N)) * Math.PI / 180;
      return { c, baseAng: ang, dx: 0, dy: 0, px: 0, py: 0, dragging: false, grabX: 0, grabY: 0, startX: 0, startY: 0, moved: 0 };
    });

    let orbitAngle = 0;
    function orbitPos(p) {
      const a = p.baseAng + orbitAngle;
      return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
    }

    // 初始按当前公转角定位，避免首帧所有节点堆叠在中心
    let s = "";
    s += '<circle class="ring" cx="' + CX + '" cy="' + CY + '" r="' + R + '"/>';
    s += '<g id="links">';
    parts.forEach((p) => {
      const pos = orbitPos(p);
      s += '<line class="link" x1="' + CX + '" y1="' + CY + '" x2="' + pos.x.toFixed(1) + '" y2="' + pos.y.toFixed(1) + '"/>';
    });
    s += "</g>";
    parts.forEach((p) => {
      const c = p.c, pos = orbitPos(p);
      p.px = pos.x; p.py = pos.y;
      s += '<g class="branch" data-id="' + c.id + '" transform="translate(' + pos.x.toFixed(1) + " " + pos.y.toFixed(1) + ')">';
      s += '<circle class="planet" r="38" fill="' + c.color + '"/>';
      s += '<text class="emo" y="-2">' + c.emoji + "</text>";
      s += '<text class="nm" y="60">' + c.name + "</text>";
      s += "</g>";
    });
    s += '<g class="hub" data-id="' + center.id + '" transform="translate(' + CX + " " + CY + ')">';
    s += '<circle class="core" r="64" fill="' + center.color + '"/>';
    s += '<text class="emo" y="-6" style="font-size:34px">' + center.emoji + "</text>";
    s += '<text class="nm" y="86">' + center.name + "</text>";
    s += "</g>";
    content.innerHTML = s;

    const branchEls = parts.map((p) => content.querySelector('.branch[data-id="' + p.c.id + '"]'));
    const lineEls = Array.prototype.slice.call(content.querySelectorAll("#links .link"));

    const omega = 0.03; // rad/s，约 3.5 分钟一圈，缓慢
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hovering = false, dragging = false;

    function toSvg(evt) {
      const pt = svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      const m = svg.getScreenCTM();
      if (!m) return { x: CX, y: CY };
      const p = pt.matrixTransform(m.inverse());
      return { x: p.x, y: p.y };
    }

    branchEls.forEach((el, i) => {
      const p = parts[i], c = p.c;
      el.addEventListener("mouseenter", () => { hovering = true; el.classList.add("hot"); });
      el.addEventListener("mouseleave", () => { hovering = false; el.classList.remove("hot"); });
      el.addEventListener("click", () => {
        if (el._suppress) { el._suppress = false; return; } // 拖拽后抑制误触
        if (c.url) openShortcut(c);
        else if (c.subs && c.subs.length) renderCategory(c.id);
        // 既无 url 也无子类：敬请期待，无操作
      });
      el.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        const cur = orbitPos(p);
        const curX = cur.x + p.dx, curY = cur.y + p.dy;
        p.px = curX; p.py = curY; p.startX = curX; p.startY = curY;
        const sp = toSvg(e);
        p.grabX = sp.x - curX; p.grabY = sp.y - curY;
        p.dragging = true; dragging = true; p.moved = 0;
        el.classList.add("dragging");
        try { el.setPointerCapture(e.pointerId); } catch (err) {}
      });
      el.addEventListener("pointermove", (e) => {
        if (!p.dragging) return;
        const sp = toSvg(e);
        const nx = sp.x - p.grabX, ny = sp.y - p.grabY;
        p.px = nx; p.py = ny;
        const cur = orbitPos(p);
        p.dx = nx - cur.x; p.dy = ny - cur.y;
        p.moved = Math.hypot(nx - p.startX, ny - p.startY);
      });
      function endDrag(e) {
        if (!p.dragging) return;
        p.dragging = false; dragging = false;
        el.classList.remove("dragging");
        try { el.releasePointerCapture(e.pointerId); } catch (err) {}
        if (p.moved > 5) {
          el._suppress = true; // 视为拖拽，抑制随后的 click
          setTimeout(() => { el._suppress = false; }, 400); // 兜底：即使 click 未触发也自动清除
        }
      }
      el.addEventListener("pointerup", endDrag);
      el.addEventListener("pointercancel", endDrag);
    });

    const hubEl = content.querySelector(".hub");
    if (hubEl) hubEl.addEventListener("click", () => { if (center.url) openShortcut(center); });

    // 动画循环：缓慢公转（悬停/拖拽时暂停）+ 拖拽后缓慢回弹归位
    let lastT = performance.now();
    function frame(now) {
      if (!svg.isConnected || svg.getClientRects().length === 0) { hubRAF = null; return; } // 离开首页/被隐藏则停止
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      const paused = hovering || dragging || reduced;
      if (!paused) orbitAngle += omega * dt;
      for (let i = 0; i < N; i++) {
        const p = parts[i];
        if (!p.dragging) {
          const cur = orbitPos(p);
          if (p.dx !== 0 || p.dy !== 0) {
            const k = 1 - Math.exp(-2.6 * dt); // 指数衰减，缓慢归零
            p.dx += (0 - p.dx) * k;
            p.dy += (0 - p.dy) * k;
            if (Math.abs(p.dx) < 0.4 && Math.abs(p.dy) < 0.4) { p.dx = 0; p.dy = 0; }
            p.px = cur.x + p.dx; p.py = cur.y + p.dy;
          } else {
            p.px = cur.x; p.py = cur.y;
          }
        }
        branchEls[i].setAttribute("transform", "translate(" + p.px.toFixed(2) + " " + p.py.toFixed(2) + ")");
        lineEls[i].setAttribute("x2", p.px.toFixed(2));
        lineEls[i].setAttribute("y2", p.py.toFixed(2));
      }
      hubRAF = requestAnimationFrame(frame);
    }
    hubRAF = requestAnimationFrame(frame);
  }

  function catCard(cat) {
    const hasSubs = Array.isArray(cat.subs) && cat.subs.length;
    const topicCount = hasSubs ? cat.subs.reduce((n, s) => n + s.topics.length, 0) : 0;
    let count;
    if (cat.url) count = "直接打开 →";
    else if (hasSubs) count = `${cat.subs.length} 个分类 · ${topicCount} 个知识点`;
    else count = "敬请期待";
    return `
      <div class="card" data-id="${cat.id}" style="--accent:${cat.color}">
        <span class="card-emoji">${cat.emoji}</span>
        <div class="card-title">${cat.name}</div>
        <div class="card-desc">${cat.desc}</div>
        <span class="card-count">${count}</span>
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
    document.body.classList.add("viewer-mode");
    attachIframeScrollHide();
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
    document.body.classList.remove("viewer-mode", "head-hidden");
  }

  /* ---------- L1 直达入口（带 url 的学科，点卡片直接打开） ---------- */
  function openShortcut(cat) {
    state = { l1: cat.id, l2: null };
    viewerFrame.src = cat.url;
    viewerTitle.textContent = `${cat.emoji} ${cat.name}`;
    openNew.href = cat.url;
    viewer.classList.remove("hidden");
    browse.classList.add("hidden");
    crumbs.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.classList.add("viewer-mode");
    attachIframeScrollHide();
    logVisit({
      topicId: cat.id,
      title: cat.name,
      emoji: cat.emoji,
      path: cat.name
    });
  }

  function backToBrowse() {
    if (state.l2) renderSub(state.l1, state.l2);
    else if (state.l1) {
      const cat = CATS.find((c) => c.id === state.l1);
      if (cat && cat.url) renderHome();
      else renderCategory(state.l1);
    } else renderHome();
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

  /* ---------- 顶栏滚动自动隐藏（内容区最大化） ---------- */
  // 逻辑：向下滚动超过阈值 → 收起品牌顶栏；向上滚动或回到顶部 → 顶栏滑回。
  // 内容查看模式下由 iframe 内部滚动驱动；浏览模式下由页面滚动驱动。
  let lastY = 0;
  function applyHead(y) {
    if (y <= 4) {
      document.body.classList.remove("head-hidden");
      lastY = y;
      return;
    }
    if (y > lastY + 2) document.body.classList.add("head-hidden");
    else if (y < lastY - 2) document.body.classList.remove("head-hidden");
    lastY = y;
  }

  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("viewer-mode")) return; // 查看模式下用 iframe 滚动
    applyHead(window.scrollY || window.pageYOffset || 0);
  }, { passive: true });

  function attachIframeScrollHide() {
    lastY = 0;
    document.body.classList.remove("head-hidden");
    try {
      const fw = viewerFrame.contentWindow;
      if (!fw || !fw.addEventListener) return;
      fw.addEventListener("scroll", () => {
        const doc = fw.document;
        const y = fw.scrollY || fw.pageYOffset ||
          (doc && doc.documentElement && doc.documentElement.scrollTop) || 0;
        applyHead(y);
      }, { passive: true });
    } catch (e) {
      /* 跨域页面无法读取滚动位置，忽略 */
    }
  }
  viewerFrame.addEventListener("load", attachIframeScrollHide);

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
