/* ============================================================
   手搓小车 · 参考资源库 — 渲染逻辑（通用数据驱动版，一般无需改动）
   新增资源 / 新增分类 都只需改 resources-data.js
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.RESOURCE_DATA || {};
  var SECTIONS = DATA.sections || [];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function matches(obj, kw) {
    if (!kw) return true;
    var hay = [
      obj.name, obj.desc, obj.use, obj.note, obj.lang, obj.scenario, obj.pick,
      (obj.tags || []).join(" "), (obj.platforms || []).join(" ")
    ].join(" ").toLowerCase();
    return hay.indexOf(kw) !== -1;
  }

  // ---------- 资源卡片 ----------
  function itemCard(v) {
    var badges = (v.platforms || []).map(function (p) {
      return '<span class="badge blue">' + esc(p) + "</span>";
    }).join("");
    var tags = (v.tags || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");
    var title = v.link
      ? '<a class="card-link" href="' + esc(v.link) + '" target="_blank" rel="noopener">' + esc(v.name) + " ↗</a>"
      : esc(v.name);
    return el(
      '<div class="card">' +
        '<div class="card-top">' +
          '<div class="card-title">' + title + "</div>" +
          (v.lang ? '<div class="card-lang">' + esc(v.lang) + "</div>" : "") +
        "</div>" +
        (badges ? '<div class="badges">' + badges + "</div>" : "") +
        '<div class="card-desc">' + esc(v.desc) + "</div>" +
        (tags ? '<div class="card-tags">' + tags + "</div>" : "") +
        (v.use ? '<div class="card-use">✅ ' + esc(v.use) + "</div>" : "") +
        (v.note ? '<div class="card-note">📌 ' + esc(v.note) + "</div>" : "") +
      "</div>"
    );
  }

  // ---------- 构建 tab 按钮 + 区块骨架（一次性） ----------
  function buildSkeleton() {
    var tabs = document.getElementById("navTabs");
    var main = document.getElementById("mainBox");
    SECTIONS.forEach(function (sec, i) {
      tabs.appendChild(el(
        '<button class="tab-btn' + (i === 0 ? " active" : "") + '" data-tab="' + esc(sec.id) + '">' +
          esc(sec.emoji) + " " + esc(sec.title) + "</button>"
      ));
      var secEl = el(
        '<section class="section' + (i === 0 ? "" : " hidden") + '" data-tab-panel="' + esc(sec.id) + '">' +
          '<div class="section-head"><h2>' + esc(sec.emoji) + " " + esc(sec.title) + "</h2>" +
            '<span class="section-tag">' + esc(sec.tag || "") + "</span></div>" +
          '<p class="section-intro">' + esc(sec.intro || "") + "</p>" +
          '<div class="groups"></div>' +
        "</section>"
      );
      main.insertBefore(secEl, document.getElementById("emptyState"));
    });
    // 指引 tab
    tabs.appendChild(el('<button class="tab-btn" data-tab="guide">🧭 选用指引</button>'));
    var g = el(
      '<section class="section hidden" data-tab-panel="guide">' +
        '<div class="section-head"><h2>🧭 选用指引</h2>' +
          '<span class="section-tag">什么场景先翻哪份资料</span></div>' +
        '<p class="section-intro">卡住的时候先查这张表，少走弯路。</p>' +
        '<div class="guide-list" id="guide-list"></div>' +
      "</section>"
    );
    main.insertBefore(g, document.getElementById("emptyState"));
  }

  // ---------- 渲染各分类 ----------
  function renderSections(kw) {
    var counts = {};
    SECTIONS.forEach(function (sec) {
      var panel = document.querySelector('[data-tab-panel="' + sec.id + '"] .groups');
      panel.innerHTML = "";
      var n = 0;
      (sec.groups || []).forEach(function (gr) {
        var items = (gr.items || []).filter(function (it) { return matches(it, kw); });
        if (!items.length) return;
        n += items.length;
        var wrap = el('<div class="subgroup">' +
          (gr.title ? '<div class="subgroup-title">' + esc(gr.title) + "</div>" : "") +
          '<div class="grid"></div></div>');
        var grid = wrap.querySelector(".grid");
        items.forEach(function (it) { grid.appendChild(itemCard(it)); });
        panel.appendChild(wrap);
      });
      counts[sec.id] = n;
    });
    return counts;
  }

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

  // ---------- 统计 ----------
  function renderStat() {
    var box = document.getElementById("heroStat");
    var items = SECTIONS.map(function (sec) {
      var n = (sec.groups || []).reduce(function (a, g) { return a + (g.items || []).length; }, 0);
      return { n: n, l: sec.title };
    });
    items.push({ n: (DATA.guide || []).length, l: "选用指引" });
    box.innerHTML = items.map(function (it) {
      return '<div class="stat-item"><div class="stat-num">' + it.n + "</div>" +
             '<div class="stat-label">' + esc(it.l) + "</div></div>";
    }).join("");
  }

  // ---------- 总渲染 + 搜索 ----------
  function renderAll() {
    var kw = (document.getElementById("searchBox").value || "").trim().toLowerCase();
    var counts = renderSections(kw);
    counts.guide = renderGuide(kw);
    var total = Object.keys(counts).reduce(function (a, k) { return a + counts[k]; }, 0);
    document.getElementById("emptyState").classList.toggle("hidden", !(kw && total === 0));
    if (kw) {
      Object.keys(counts).forEach(function (tab) {
        var panel = document.querySelector('[data-tab-panel="' + tab + '"]');
        if (panel) panel.classList.toggle("hidden", counts[tab] === 0);
      });
    } else {
      var active = document.querySelector(".tab-btn.active").getAttribute("data-tab");
      document.querySelectorAll("[data-tab-panel]").forEach(function (p) {
        p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== active);
      });
    }
  }

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
    document.getElementById("searchBox").addEventListener("input", renderAll);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildSkeleton();
    renderStat();
    bindEvents();
    renderAll();
  });
})();
