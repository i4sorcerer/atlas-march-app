/* =========================================================================
 *  英语启蒙 · 迪士尼世界 —— 渲染逻辑
 *  - 按年代(era)分组展示动画卡片
 *  - 搜索框：匹配动画名 或 角色名（中/英均可）
 *  - 年代筛选 chips：全部 / 经典 / 过渡 / 文艺复兴 / 现代 / 皮克斯
 *  - 点击动画卡片 → 弹层展示该动画的关键角色（中英文名 + 角色 + 学一句）
 *  - 语言切换：中文 / English / 双语（body.lang-* 控制 .t-zh / .t-en 显隐）
 * ========================================================================= */

(function () {
  "use strict";

  var DATA = window.DISNEY_DATA || { eras: [], films: [] };
  var eras = DATA.eras || [];
  var films = DATA.films || [];

  var list = document.getElementById("list");
  var emptyEl = document.getElementById("empty");
  var eraChips = document.getElementById("eraChips");
  var searchInput = document.getElementById("search");
  var oscarToggle = document.getElementById("oscarToggle");
  var langToggle = document.getElementById("langToggle");
  var modal = document.getElementById("modal");
  var modalBody = document.getElementById("modalBody");
  var modalCard = document.getElementById("modalCard");
  var modalClose = document.getElementById("modalClose");
  var modalMask = document.getElementById("modalMask");

  var state = { lang: "both", era: "all", q: "", oscar: false };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function zh(s) { return '<span class="t-zh">' + esc(s) + "</span>"; }
  function en(s) { return '<span class="t-en">' + esc(s) + "</span>"; }

  // 每部动画的可搜索文本（动画名 + 角色名，中英文）
  function searchText(f) {
    var t = (f.titleZh || "") + " " + (f.titleEn || "");
    (f.characters || []).forEach(function (c) {
      t += " " + (c.nameZh || "") + " " + (c.nameEn || "");
    });
    return t.toLowerCase();
  }

  function matchQ(f) {
    if (!state.q) return true;
    return searchText(f).indexOf(state.q) !== -1;
  }

  function filteredFilms() {
    return films.filter(function (f) {
      if (state.era !== "all" && f.era !== state.era) return false;
      if (state.oscar && !f.oscar) return false;
      return matchQ(f);
    });
  }

  function renderChips() {
    var total = films.length;
    var html = chip("all", "全部", total);
    eras.forEach(function (e) {
      var n = films.filter(function (f) { return f.era === e.id; }).length;
      html += chip(e.id, e.nameZh, n);
    });
    eraChips.innerHTML = html;
  }
  function chip(id, label, count) {
    var active = state.era === id ? " active" : "";
    return '<button class="chip' + active + '" data-era="' + esc(id) + '" type="button">' +
      esc(label) + '<span class="chip-count">' + count + "</span></button>";
  }

  function filmCard(f) {
    var chars = (f.characters || []).map(function (c) {
      return '<span class="char-pill"><span class="cp-emoji">' + esc(c.emoji) + "</span>" +
        zh(c.nameZh) + en(c.nameEn) + "</span>";
    }).join("");
    return (
      '<article class="film" data-id="' + esc(f.id) + '" style="--c:' + eraColor(f.era) + '">' +
        '<div class="film-top">' +
          '<div class="film-emoji">' + esc(f.emoji) + "</div>" +
          (f.oscar ? '<span class="oscar-badge" title="奥斯卡最佳动画长片">🏆</span>' : "") +
          '<span class="film-year">' + esc(f.year) + "</span>" +
        "</div>" +
        '<div class="film-title">' + zh(f.titleZh) + en(f.titleEn) + "</div>" +
        '<div class="film-desc">' + zh(f.descZh) + en(f.descEn) + "</div>" +
        '<div class="film-chars">' + chars + "</div>" +
      "</article>"
    );
  }

  function renderList() {
    var fl = filteredFilms();
    if (state.era === "all") {
      var html = "";
      eras.forEach(function (e) {
        var ef = fl.filter(function (f) { return f.era === e.id; })
                  .slice().sort(function (a, b) { return a.year - b.year; });
        if (!ef.length) return;
        html += eraGroup(e, ef);
      });
      list.innerHTML = html;
    } else {
      var ef2 = fl.slice().sort(function (a, b) { return a.year - b.year; });
      var e2 = eras.filter(function (x) { return x.id === state.era; })[0];
      list.innerHTML = e2 ? eraGroup(e2, ef2) : "";
    }
    emptyEl.classList.toggle("hidden", fl.length !== 0);
  }

  function eraGroup(e, filmsOfEra) {
    var cards = filmsOfEra.map(filmCard).join("");
    return (
      '<section class="era-group">' +
        '<div class="era-head">' +
          '<h2>' + esc(e.nameZh) + "</h2>" +
          '<span class="era-en">' + esc(e.nameEn) + "</span>" +
          '<span class="era-range">' + esc(e.range) + "</span>" +
        "</div>" +
        '<div class="grid">' + cards + "</div>" +
      "</section>"
    );
  }

  function eraColor(eraId) {
    var map = {
      classic: "#E8543F", bronze: "#C9913B", renaissance: "#7A5CFF",
      modern: "#19B5A6", pixar: "#F2B705"
    };
    return map[eraId] || "#FFB703";
  }

  function openModal(f) {
    modalCard.style.setProperty("--c", eraColor(f.era));
    var chars = (f.characters || []).map(function (c) {
      return (
        '<div class="char-card">' +
          '<div class="char-card-top">' +
            '<span class="char-card-emoji">' + esc(c.emoji) + "</span>" +
            '<span class="char-name">' + zh(c.nameZh) + en(c.nameEn) + "</span>" +
          "</div>" +
          '<div class="char-role">' + zh(c.roleZh) + en(c.roleEn) + "</div>" +
          '<div class="char-phrase">' +
            '<span class="label">SPEAK &amp; LEARN · 学一句</span>' +
            '<span class="en">' + esc(c.phraseEn) + "</span>" +
            '<span class="zh">' + esc(c.phraseZh) + "</span>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    modalBody.innerHTML =
      '<div class="m-head">' +
        '<span class="m-emoji">' + esc(f.emoji) + "</span>" +
        '<div>' +
          '<div class="m-title">' + zh(f.titleZh) + en(f.titleEn) + "</div>" +
          '<span class="m-year">' + esc(f.year) + " · " + esc(eraName(f.era)) + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="m-desc">' + zh(f.descZh) + en(f.descEn) + "</div>" +
      '<div class="m-section-title">关键角色 · Key Characters</div>' +
      '<div class="char-grid">' + chars + "</div>";

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }
  function eraName(eraId) {
    var e = eras.filter(function (x) { return x.id === eraId; })[0];
    return e ? e.nameZh : "";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  // 事件
  list.addEventListener("click", function (e) {
    var card = e.target.closest(".film");
    if (card) {
      var f = films.filter(function (x) { return x.id === card.getAttribute("data-id"); })[0];
      if (f) openModal(f);
    }
  });
  eraChips.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (chip) { state.era = chip.getAttribute("data-era"); renderChips(); renderList(); }
  });
  searchInput.addEventListener("input", function () {
    state.q = searchInput.value.trim().toLowerCase();
    renderList();
  });
  oscarToggle.addEventListener("click", function () {
    state.oscar = !state.oscar;
    oscarToggle.classList.toggle("active", state.oscar);
    oscarToggle.setAttribute("aria-pressed", state.oscar ? "true" : "false");
    renderList();
  });
  langToggle.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-btn");
    if (btn) setLang(btn.getAttribute("data-lang"));
  });
  modalClose.addEventListener("click", closeModal);
  modalMask.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  function setLang(lang) {
    document.body.className = "lang-" + lang;
    state.lang = lang;
    var btns = langToggle.querySelectorAll(".lang-btn");
    btns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-lang") === lang); });
  }

  renderChips();
  renderList();
})();
