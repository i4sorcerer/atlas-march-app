/* ============================================================
   双语航天科普资源库 — 渲染逻辑（一般无需改动）
   新增资源请改 resources-data.js
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.RESOURCE_DATA || {};

  // ---------- 小工具 ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  // 在一堆文本字段里搜索关键词（小写比较）
  function matches(obj, kw) {
    if (!kw) return true;
    var hay = [
      obj.name, obj.title, obj.desc, obj.topic, obj.use, obj.note,
      (obj.tags || []).join(" "), (obj.platforms || []).join(" "), obj.lang
    ].join(" ").toLowerCase();
    return hay.indexOf(kw) !== -1;
  }

  // ---------- 渲染：视频创作者 ----------
  function renderVideos(kw) {
    var box = document.getElementById("grid-videos");
    box.innerHTML = "";
    (DATA.videos || []).filter(function (v) { return matches(v, kw); }).forEach(function (v) {
      var badges = (v.platforms || []).map(function (p) {
        return '<span class="badge blue">' + esc(p) + "</span>";
      }).join("");
      var tags = (v.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + "</span>";
      }).join("");
      var card = el(
        '<div class="card">' +
          '<div class="card-top">' +
            '<div class="card-title">' + esc(v.name) + "</div>" +
            '<div class="card-lang">' + esc(v.lang || "") + "</div>" +
          "</div>" +
          '<div class="badges">' + badges + "</div>" +
          '<div class="card-desc">' + esc(v.desc) + "</div>" +
          '<div class="card-tags">' + tags + "</div>" +
          (v.use ? '<div class="card-use">✅ ' + esc(v.use) + "</div>" : "") +
        "</div>"
      );
      box.appendChild(card);
    });
    return (DATA.videos || []).filter(function (v) { return matches(v, kw); }).length;
  }

  // ---------- 渲染：纪录片 ----------
  function docCard(d) {
    return el(
      '<div class="card">' +
        '<div class="card-title">' + esc(d.title) + "</div>" +
        (d.topic ? '<div class="badges"><span class="badge purple">' + esc(d.topic) + "</span></div>" : "") +
        '<div class="card-desc">' + esc(d.desc) + "</div>" +
      "</div>"
    );
  }
  function renderDocs(kw) {
    var dn = document.getElementById("grid-docs-domestic");
    var os = document.getElementById("grid-docs-overseas");
    dn.innerHTML = ""; os.innerHTML = "";
    var dom = (DATA.docs && DATA.docs.domestic || []).filter(function (d) { return matches(d, kw); });
    var ove = (DATA.docs && DATA.docs.overseas || []).filter(function (d) { return matches(d, kw); });
    dom.forEach(function (d) { dn.appendChild(docCard(d)); });
    ove.forEach(function (d) { os.appendChild(docCard(d)); });
    return dom.length + ove.length;
  }

  // ---------- 渲染：播客 ----------
  function podCard(p) {
    return el(
      '<div class="card">' +
        '<div class="card-top">' +
          '<div class="card-title">' + esc(p.name) + "</div>" +
        "</div>" +
        '<div class="badges"><span class="badge blue">' + esc(p.platform || "") + "</span></div>" +
        '<div class="card-desc">' + esc(p.desc) + "</div>" +
        (p.note ? '<div class="card-note">📌 ' + esc(p.note) + "</div>" : "") +
      "</div>"
    );
  }
  function renderPodcasts(kw) {
    var cn = document.getElementById("grid-podcasts-cn");
    var en = document.getElementById("grid-podcasts-en");
    cn.innerHTML = ""; en.innerHTML = "";
    var c = (DATA.podcasts && DATA.podcasts.cn || []).filter(function (p) { return matches(p, kw); });
    var e = (DATA.podcasts && DATA.podcasts.en || []).filter(function (p) { return matches(p, kw); });
    c.forEach(function (p) { cn.appendChild(podCard(p)); });
    e.forEach(function (p) { en.appendChild(podCard(p)); });
    return c.length + e.length;
  }

  // ---------- 渲染：选用指引 ----------
  function renderGuide(kw) {
    var box = document.getElementById("guide-list");
    box.innerHTML = "";
    var list = (DATA.guide || []).filter(function (g) { return matches(g, kw); });
    list.forEach(function (g) {
      box.appendChild(el(
        '<div class="guide-item">' +
          '<div class="guide-scenario">🎯 ' + esc(g.scenario) + "</div>" +
          '<div class="guide-arrow">➜</div>' +
          '<div class="guide-pick">' + esc(g.pick) + "</div>" +
        "</div>"
      ));
    });
    return list.length;
  }

  // ---------- 统计数字 ----------
  function renderStat() {
    var box = document.getElementById("heroStat");
    var items = [
      { n: (DATA.videos || []).length, l: "视频创作者" },
      { n: ((DATA.docs && DATA.docs.domestic || []).length) + ((DATA.docs && DATA.docs.overseas || []).length), l: "纪录片" },
      { n: ((DATA.podcasts && DATA.podcasts.cn || []).length) + ((DATA.podcasts && DATA.podcasts.en || []).length), l: "播客" },
      { n: (DATA.guide || []).length, l: "选用指引" },
    ];
    box.innerHTML = items.map(function (it) {
      return '<div class="stat-item"><div class="stat-num">' + it.n + "</div>" +
             '<div class="stat-label">' + it.l + "</div></div>";
    }).join("");
  }

  // ---------- 总渲染 + 搜索 + 空状态 ----------
  function renderAll() {
    var kw = (document.getElementById("searchBox").value || "").trim().toLowerCase();
    var counts = {
      videos: renderVideos(kw),
      docs: renderDocs(kw),
      podcasts: renderPodcasts(kw),
      guide: renderGuide(kw),
    };
    // 搜索时跨分类显示命中数；空状态提示
    var total = counts.videos + counts.docs + counts.podcasts + counts.guide;
    document.getElementById("emptyState").classList.toggle("hidden", !(kw && total === 0));
    // 搜索态下把有结果的分类都展开，无结果则保持当前 tab
    if (kw) {
      Object.keys(counts).forEach(function (tab) {
        var panel = document.querySelector('[data-tab-panel="' + tab + '"]');
        if (panel) panel.classList.toggle("hidden", counts[tab] === 0);
      });
    } else {
      // 恢复：仅显示当前激活 tab
      var active = document.querySelector(".tab-btn.active").getAttribute("data-tab");
      document.querySelectorAll("[data-tab-panel]").forEach(function (p) {
        p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== active);
      });
    }
  }

  // ---------- 事件绑定 ----------
  function bindEvents() {
    document.getElementById("navTabs").addEventListener("click", function (e) {
      var btn = e.target.closest(".tab-btn");
      if (!btn) return;
      document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var tab = btn.getAttribute("data-tab");
      document.querySelectorAll("[data-tab-panel]").forEach(function (p) {
        p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== tab);
      });
      document.getElementById("emptyState").classList.add("hidden");
    });

    var sb = document.getElementById("searchBox");
    sb.addEventListener("input", renderAll);
  }

  // ---------- 启动 ----------
  document.addEventListener("DOMContentLoaded", function () {
    renderStat();
    bindEvents();
    renderAll();
  });
})();
