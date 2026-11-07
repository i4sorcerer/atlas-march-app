/* =========================================================================
 *  Dragon Masters · 30-book interactive series atlas
 *  Original educational summaries, archive links, narration, and games.
 * ========================================================================= */

(function () {
  "use strict";

  var DATA = window.DRAGON_MASTERS_SERIES;
  if (!DATA) return;

  var STORAGE_KEY = "dragonMastersSeriesProgress";
  var LANG_KEY = "dragonMastersLang";
  var body = document.body;

  var TYPE_META = {
    person: {
      labelEn: "Person",
      labelZh: "人物",
      accent: "#c54d3b",
      soft: "#ffe8e0",
      graphClass: "person"
    },
    dragon: {
      labelEn: "Dragon",
      labelZh: "龙",
      accent: "#2f827a",
      soft: "#dff3ed",
      graphClass: "dragon"
    },
    place: {
      labelEn: "Place",
      labelZh: "地点",
      accent: "#a47728",
      soft: "#fff0c9",
      graphClass: "place"
    },
    artifact: {
      labelEn: "Object",
      labelZh: "物件",
      accent: "#6f62a3",
      soft: "#eee8fa",
      graphClass: "artifact"
    }
  };

  var ARC_NODE_POSITIONS = [
    { x: "18%", y: "71%" },
    { x: "39%", y: "55%" },
    { x: "46%", y: "37%" },
    { x: "57%", y: "20%" },
    { x: "72%", y: "46%" },
    { x: "85%", y: "73%" }
  ];

  var state = {
    lang: "en",
    arc: "all",
    status: "all",
    search: "",
    archiveType: "all",
    archiveSearch: "",
    explored: {},
    lastBook: "dm-01",
    selectedBook: "",
    selectedDossier: "",
    graphType: "all",
    graphNode: "",
    traceTimers: [],
    pairSelected: "",
    pairWrong: "",
    pairMatched: {},
    pairDragonOrder: [],
    pairMasterOrder: [],
    trailOrder: [],
    trailNext: 0,
    trailDone: {},
    missions: {},
    missionsWrong: {}
  };

  var els = {
    seriesProgress: document.getElementById("seriesProgress"),
    langToggle: document.getElementById("langToggle"),
    voiceDot: document.getElementById("voiceDot"),
    voiceNote: document.getElementById("voiceNote"),
    heroDossierCount: document.getElementById("heroDossierCount"),
    heroArcNodes: document.getElementById("heroArcNodes"),
    continueReading: document.getElementById("continueReading"),
    continueEyebrow: document.getElementById("continueEyebrow"),
    continueLabel: document.getElementById("continueLabel"),
    exploredRing: document.getElementById("exploredRing"),
    exploredCount: document.getElementById("exploredCount"),
    arcRail: document.getElementById("arcRail"),
    arcFocus: document.getElementById("arcFocus"),
    librarySearch: document.getElementById("librarySearch"),
    clearSearch: document.getElementById("clearSearch"),
    arcFilters: document.getElementById("arcFilters"),
    statusFilters: document.getElementById("statusFilters"),
    libraryGrid: document.getElementById("libraryGrid"),
    libraryCount: document.getElementById("libraryCount"),
    shelfEmpty: document.getElementById("shelfEmpty"),
    resetLibrary: document.getElementById("resetLibrary"),
    archiveSearch: document.getElementById("archiveSearch"),
    archiveFilters: document.getElementById("archiveFilters"),
    archiveAllCount: document.getElementById("archiveAllCount"),
    archivePersonCount: document.getElementById("archivePersonCount"),
    archiveDragonCount: document.getElementById("archiveDragonCount"),
    archivePlaceCount: document.getElementById("archivePlaceCount"),
    archiveArtifactCount: document.getElementById("archiveArtifactCount"),
    dossierStampCount: document.getElementById("dossierStampCount"),
    dossierGrid: document.getElementById("dossierGrid"),
    graphFilters: document.getElementById("graphFilters"),
    seriesGraph: document.getElementById("seriesGraph"),
    graphInspector: document.getElementById("graphInspector"),
    traceGraph: document.getElementById("traceGraph"),
    gameTabs: document.getElementById("gameTabs"),
    pairDragons: document.getElementById("pairDragons"),
    pairMasters: document.getElementById("pairMasters"),
    pairScore: document.getElementById("pairScore"),
    pairTotal: document.getElementById("pairTotal"),
    pairFeedback: document.getElementById("pairFeedback"),
    resetPairs: document.getElementById("resetPairs"),
    trailGame: document.getElementById("trailGame"),
    trailScore: document.getElementById("trailScore"),
    trailFeedback: document.getElementById("trailFeedback"),
    resetTrail: document.getElementById("resetTrail"),
    vocabGrid: document.getElementById("vocabGrid"),
    missionGrid: document.getElementById("missionGrid"),
    missionScore: document.getElementById("missionScore"),
    missionTotal: document.getElementById("missionTotal"),
    sourceLinks: document.getElementById("sourceLinks"),
    bookDialog: document.getElementById("bookDialog"),
    bookDialogBody: document.getElementById("bookDialogBody"),
    bookDialogClose: document.getElementById("bookDialogClose"),
    dossierDialog: document.getElementById("dossierDialog"),
    dossierDialogBody: document.getElementById("dossierDialogBody"),
    dossierDialogClose: document.getElementById("dossierDialogClose")
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function bi(en, zh) {
    return '<span class="t-en">' + esc(en) + "</span>" +
      '<span class="t-zh">' + esc(zh) + "</span>";
  }

  function bookById(id) {
    return DATA.books.filter(function (book) { return book.id === id; })[0] || null;
  }

  function dossierById(id) {
    return DATA.dossiers.filter(function (entry) { return entry.id === id; })[0] || null;
  }

  function arcById(id) {
    return DATA.arcs.filter(function (arc) { return arc.id === id; })[0] || null;
  }

  function booksForDossier(id) {
    return DATA.books.filter(function (book) {
      return book.dossierIds.indexOf(id) !== -1;
    });
  }

  function graphNode(id) {
    return DATA.coreGraph.nodes.filter(function (node) { return node.id === id; })[0] || null;
  }

  function typeMeta(type) {
    return TYPE_META[type] || TYPE_META.artifact;
  }

  function shuffle(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function searchText(book) {
    var pieces = [
      book.titleEn,
      book.titleZh,
      book.summaryEn,
      book.summaryZh,
      book.hookEn,
      book.hookZh,
      book.illustrator,
      arcById(book.arc).titleEn,
      arcById(book.arc).titleZh
    ].concat(book.themesEn || [], book.themesZh || []);

    book.dossierIds.forEach(function (id) {
      var entry = dossierById(id);
      if (!entry) return;
      pieces.push(entry.nameEn, entry.nameZh, entry.roleEn, entry.roleZh);
    });

    (book.chapterGuide || []).forEach(function (chapter) {
      pieces.push(
        chapter.titleEn,
        chapter.titleZh,
        chapter.summaryEn,
        chapter.summaryZh,
        "chapter " + chapter.number,
        "第" + chapter.number + "章"
      );
    });
    return pieces.join(" ").toLowerCase();
  }

  function fileLabel(status) {
    if (status === "chapter-guide") {
      return {
        en: "Chapter guide",
        zh: "章节导览",
        cls: "verified"
      };
    }
    return {
      en: "Book summary",
      zh: "书籍简介",
      cls: "summary"
    };
  }

  function setFeedback(el, en, zh, tone) {
    el.innerHTML = bi(en, zh);
    el.className = "play-feedback" + (tone ? " " + tone : "");
  }

  /* -----------------------------------------------------------------------
   *  Local reading progress
   * --------------------------------------------------------------------- */

  function readProgress() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved && typeof saved === "object") {
        (saved.explored || []).forEach(function (id) {
          if (bookById(id)) state.explored[id] = true;
        });
        if (bookById(saved.lastBook)) state.lastBook = saved.lastBook;
      }
    } catch (e) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        explored: Object.keys(state.explored),
        lastBook: state.lastBook
      }));
    } catch (e) {}
  }

  function markExplored(bookId) {
    if (!bookById(bookId)) return;
    state.explored[bookId] = true;
    state.lastBook = bookId;
    saveProgress();
    updateProgressUI();
  }

  function updateProgressUI() {
    var count = Object.keys(state.explored).filter(function (id) {
      return Boolean(bookById(id));
    }).length;
    var progress = Math.min(100, (count / DATA.books.length) * 100);
    var lastBook = bookById(state.lastBook) || DATA.books[0];

    els.exploredCount.textContent = count + " of " + DATA.books.length + " books explored";
    if (state.lang === "zh") {
      els.exploredCount.textContent = "已探索 " + count + " / " + DATA.books.length + " 册";
    } else if (state.lang === "both") {
      els.exploredCount.textContent =
        count + " of " + DATA.books.length + " books explored · 已探索 " + count + "/" + DATA.books.length;
    }
    els.exploredRing.style.setProperty("--progress", progress.toFixed(2) + "%");
    if (state.lang === "zh") {
      els.continueLabel.textContent = "第 " + lastBook.number + " 册 · " + lastBook.titleZh;
    } else if (state.lang === "both") {
      els.continueLabel.textContent =
        "Book " + lastBook.number + " · " + lastBook.titleEn + " / 第 " + lastBook.number + " 册 · " + lastBook.titleZh;
    } else {
      els.continueLabel.textContent = "Book " + lastBook.number + " · " + lastBook.titleEn;
    }

    Array.prototype.forEach.call(els.libraryGrid.querySelectorAll(".shelf-book"), function (card) {
      card.classList.toggle("is-explored", Boolean(state.explored[card.getAttribute("data-book-id")]));
    });
  }

  /* -----------------------------------------------------------------------
   *  Hero and story arc map
   * --------------------------------------------------------------------- */

  function renderHeroArcNodes() {
    els.heroArcNodes.innerHTML = DATA.arcs.map(function (arc, index) {
      var pos = ARC_NODE_POSITIONS[index];
      return '<button class="hero-arc-node' + (state.arc === arc.id ? " active" : "") +
        '" type="button" data-hero-arc="' + esc(arc.id) + '"' +
        ' style="--x:' + pos.x + ';--y:' + pos.y + ';--arc-color:' + esc(arc.color) + '"' +
        ' aria-label="' + esc(arc.titleEn + " · " + arc.titleZh) + '">' +
        '<span>' + arc.number + "</span></button>";
    }).join("");
  }

  function renderArcRail() {
    els.arcRail.innerHTML = DATA.arcs.map(function (arc) {
      var count = DATA.books.filter(function (book) { return book.arc === arc.id; }).length;
      return '<button class="arc-card' + (state.arc === arc.id ? " active" : "") + '"' +
        ' type="button" data-arc="' + esc(arc.id) + '"' +
        ' style="--arc-color:' + esc(arc.color) + '">' +
        '<span class="arc-number">' + arc.number + "</span>" +
        '<span class="arc-range">BOOKS ' + esc(arc.range) + "</span>" +
        "<h3>" + bi(arc.titleEn, arc.titleZh) + "</h3>" +
        "<p>" + bi(arc.descEn, arc.descZh) + "</p>" +
        "<small>" + count + " " + bi("books", "册") + "</small>" +
        "</button>";
    }).join("");

    els.arcFilters.innerHTML =
      '<button class="filter-chip' + (state.arc === "all" ? " active" : "") +
      '" data-arc-filter="all" type="button">' + bi("All arcs", "全部阶段") + "</button>" +
      DATA.arcs.map(function (arc) {
        return '<button class="filter-chip' + (state.arc === arc.id ? " active" : "") +
          '" data-arc-filter="' + esc(arc.id) + '" type="button">' +
          esc(arc.range) + " · " + bi(arc.titleEn, arc.titleZh) + "</button>";
      }).join("");
  }

  function renderArcFocus() {
    var arc = state.arc === "all" ? null : arcById(state.arc);
    var count = state.arc === "all" ?
      DATA.books.length :
      DATA.books.filter(function (book) { return book.arc === state.arc; }).length;

    if (!arc) {
      els.arcFocus.innerHTML =
        '<span class="focus-mark">✦</span>' +
        '<div class="arc-focus-copy"><b>' + bi("The complete 30-book trail", "完整的 30 册旅程") + "</b>" +
        "<p>" + bi(
          "Every verified main-series book, from Drake's first summons to the Chaos Dragon.",
          "从德雷克第一次被召唤，到混沌龙终局，收录全部已核实的主线图书。"
        ) + "</p></div>" +
        '<button class="arc-focus-button" type="button" data-focus-books="all">' +
        bi("See all 30 books", "查看全部 30 册") + "</button>";
      return;
    }

    els.arcFocus.innerHTML =
      '<span class="focus-mark" style="color:' + esc(arc.color) + ';background:' + esc(arc.color) + '18">' + arc.number + "</span>" +
      '<div class="arc-focus-copy"><b>' + bi(arc.titleEn, arc.titleZh) + " · Books " + esc(arc.range) + "</b>" +
      "<p>" + bi(arc.descEn, arc.descZh) + "</p></div>" +
      '<button class="arc-focus-button" type="button" data-focus-books="' + esc(arc.id) + '">' +
      bi("Open these " + count + " books", "查看这 " + count + " 册") + "</button>";
  }

  function selectArc(arcId, shouldScroll) {
    state.arc = arcId;
    renderHeroArcNodes();
    renderArcRail();
    renderArcFocus();
    renderLibrary();
    if (shouldScroll) {
      document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* -----------------------------------------------------------------------
   *  Library
   * --------------------------------------------------------------------- */

  function filteredBooks() {
    var query = state.search.trim().toLowerCase();
    return DATA.books.filter(function (book) {
      if (state.arc !== "all" && book.arc !== state.arc) return false;
      if (state.status !== "all" && book.status !== state.status) return false;
      if (query && searchText(book).indexOf(query) === -1) return false;
      return true;
    });
  }

  function renderLibrary() {
    var books = filteredBooks();
    els.libraryCount.textContent = books.length;
    els.clearSearch.hidden = state.search.length === 0;
    els.shelfEmpty.hidden = books.length > 0;
    els.libraryGrid.hidden = books.length === 0;

    els.libraryGrid.innerHTML = books.map(function (book) {
      var arc = arcById(book.arc);
      var label = fileLabel(book.status);
      var explored = Boolean(state.explored[book.id]);
      var themes = book.themesEn.slice(0, 2);

      return '<button class="shelf-book' + (explored ? " is-explored" : "") + '"' +
        ' type="button" data-book-id="' + esc(book.id) + '"' +
        ' style="--book-accent:' + esc(book.accent) + '"' +
        ' aria-label="' + esc("Book " + book.number + ": " + book.titleEn) + '">' +
        '<span class="book-bookmark" aria-hidden="true"></span>' +
        '<div class="book-card-top">' +
        '<span class="book-number">BOOK ' + String(book.number).padStart(2, "0") + "</span>" +
        '<span class="source-badge ' + label.cls + '">' + bi(label.en, label.zh) + "</span>" +
        "</div>" +
        '<div class="book-card-body">' +
        '<span class="book-emblem" aria-hidden="true">' + esc(book.emoji) + "</span>" +
        '<div class="book-card-title"><h3>' + bi(book.titleEn, book.titleZh) + "</h3>" +
        "<p>" + esc(arc.range) + " · " + bi(arc.titleEn, arc.titleZh) + "</p></div>" +
        "</div>" +
        '<p class="book-hook">' + bi(book.hookEn, book.hookZh) + "</p>" +
        '<div class="book-card-footer">' +
        '<div class="book-tags">' +
        themes.map(function (theme, index) {
          return "<span>" + bi(theme, book.themesZh[index]) + "</span>";
        }).join("") +
        '<span>' + esc(book.element) + "</span>" +
        "</div>" +
        '<span class="book-open">' + bi("Open notes", "打开档案") + " →</span>" +
        "</div>" +
        "</button>";
    }).join("");
  }

  function resetLibrary() {
    state.arc = "all";
    state.status = "all";
    state.search = "";
    els.librarySearch.value = "";
    Array.prototype.forEach.call(els.statusFilters.querySelectorAll(".filter-chip"), function (button) {
      button.classList.toggle("active", button.getAttribute("data-status") === "all");
    });
    renderHeroArcNodes();
    renderArcRail();
    renderArcFocus();
    renderLibrary();
  }

  /* -----------------------------------------------------------------------
   *  Book detail dialog
   * --------------------------------------------------------------------- */

  function renderBookDialog(book) {
    var arc = arcById(book.arc);
    var label = fileLabel(book.status);
    var themes = book.themesEn.map(function (themeEn, index) {
      return '<span class="theme-chip">' + bi(themeEn, book.themesZh[index]) + "</span>";
    }).join("");

    var dossierChips = book.dossierIds.map(function (id) {
      var entry = dossierById(id);
      if (!entry) return "";
      return '<button class="dialog-dossier-chip" type="button" data-dialog-dossier="' + esc(id) + '">' +
        "<span aria-hidden=\"true\">" + esc(entry.emoji) + "</span>" +
        bi(entry.nameEn, entry.nameZh) + "</button>";
    }).join("");

    var chapterSection;
    if (book.chapterGuide) {
      chapterSection =
        '<section class="dialog-section">' +
        '<div class="dialog-section-head"><div><p class="dialog-kicker">CHAPTER GUIDE</p>' +
        "<h3>" + bi("Chapter-by-chapter trail", "逐章故事路线") + "</h3></div>" +
        "<p>" + bi("16 chapters · verified guide status is marked", "16 章 · 每章均标明资料状态") + "</p></div>" +
        '<div class="chapter-list">' +
        book.chapterGuide.map(function (chapter) {
          var titleEn = chapter.titleEn || ("Chapter " + chapter.number);
          var titleZh = chapter.titleZh || ("第 " + chapter.number + " 章");
          var statusLabel = chapter.status === "verified" ?
            bi("Verified", "已核实") :
            bi("Summary only", "仅简介");
          var statusClass = chapter.status === "verified" ? "" : " summary-only";
          var reader = chapter.number === 1 ?
            '<a class="chapter-reader-link" href="dragon-masters.html#storybook">' +
            bi("Read this chapter in the interactive picture book", "在互动绘本中阅读本章") +
            " →</a>" :
            "";
          return '<details class="chapter-item"' + (chapter.number === 1 ? " open" : "") + ">" +
            "<summary>" +
            '<span class="chapter-number">' + String(chapter.number).padStart(2, "0") + "</span>" +
            '<span class="chapter-name"><b>' + bi(titleEn, titleZh) + "</b>" +
            "<small>" +
            (chapter.pages ? bi("Pages " + chapter.pages, "第 " + chapter.pages + " 页") : bi("Chapter summary", "章节摘要")) +
            "</small></span>" +
            '<span class="chapter-status' + statusClass + '">' + statusLabel + "</span>" +
            "</summary>" +
            '<div class="chapter-body"><p>' + bi(chapter.summaryEn, chapter.summaryZh) + "</p>" +
            (chapter.momentEn ? '<p class="chapter-moment">' + bi(chapter.momentEn, chapter.momentZh) + "</p>" : "") +
            reader + "</div>" +
            "</details>";
        }).join("") +
        "</div></section>";
    } else {
      chapterSection =
        '<section class="dialog-section">' +
        '<div class="dialog-section-head"><div><p class="dialog-kicker">CHAPTER BOUNDARY</p>' +
        "<h3>" + bi("What this dossier covers", "这份档案覆盖到哪里") + "</h3></div></div>" +
        '<div class="source-boundary"><span aria-hidden="true">◎</span><div>' +
        bi(
          "This book has a verified publisher-level story dossier. Chapter summaries are not indexed yet, so this atlas does not invent dialogue, page numbers, or missing scenes.",
          "这一册已有经过核对的出版社级故事档案，但章节摘要尚未建立，因此本图谱不会补造对白、页码或缺失情节。"
        ) +
        "</div></div></section>";
    }

    var nextBook = DATA.books[book.number] || DATA.books[0];
    els.bookDialogBody.innerHTML =
      '<div class="book-dialog-hero" style="--book-accent:' + esc(book.accent) + '">' +
      '<div class="book-dialog-emblem" aria-hidden="true">' + esc(book.emoji) + "</div>" +
      '<div class="book-dialog-title">' +
      '<div class="book-dialog-meta">' +
      "<span>BOOK " + String(book.number).padStart(2, "0") + "</span>" +
      "<span>·</span><span>" + bi(arc.titleEn, arc.titleZh) + "</span><span>·</span>" +
      '<span class="source-badge ' + label.cls + '">' + bi(label.en, label.zh) + "</span>" +
      "</div>" +
      '<h2 id="bookDialogTitle">' + bi(book.titleEn, book.titleZh) + "</h2>" +
      "<p>" + bi(book.hookEn, book.hookZh) + "</p>" +
      "</div></div>" +
      '<div class="book-dialog-body">' +
      '<div class="dialog-summary-grid">' +
      '<section class="dialog-summary"><p class="dialog-kicker">STORY DOSSIER</p>' +
      "<h3>" + bi("What happens in this book", "这一册发生了什么") + "</h3>" +
      '<p class="dialog-summary-text"><span class="t-en" lang="en" id="bookSummaryEn">' + esc(book.summaryEn) + "</span>" +
      '<span class="t-zh" lang="zh-CN" id="bookSummaryZh">' + esc(book.summaryZh) + "</span></p>" +
      '<div class="dialog-listen-row">' +
      '<button class="listen-pill english" type="button" data-read-target="#bookSummaryEn" data-tts-lang="en-US">🔊 ' +
      bi("English", "英文朗读") + "</button>" +
      '<button class="listen-pill chinese" type="button" data-read-target="#bookSummaryZh" data-tts-lang="zh-CN">🔊 ' +
      bi("中文", "中文朗读") + "</button>" +
      "</div></section>" +
      '<aside class="dialog-side"><p class="dialog-kicker">FIELD NOTES</p>' +
      '<dl class="dialog-facts">' +
      "<div><dt>" + bi("Story arc", "故事阶段") + "</dt><dd>" + bi(arc.titleEn, arc.titleZh) + " · " + esc(arc.range) + "</dd></div>" +
      "<div><dt>" + bi("Illustrator", "插画师") + "</dt><dd>" + esc(book.illustrator) + "</dd></div>" +
      "<div><dt>" + bi("Dragon power", "龙之力") + "</dt><dd>" + esc(book.emoji + " " + book.element) + "</dd></div>" +
      "<div><dt>" + bi("Archive status", "档案状态") + "</dt><dd>" + bi(label.en, label.zh) + "</dd></div>" +
      "</dl><div class=\"theme-chip-row\">" + themes + "</div></aside>" +
      "</div>" +
      '<section class="dialog-section"><div class="dialog-section-head"><div><p class="dialog-kicker">CAST & CONNECTIONS</p>' +
      "<h3>" + bi("Open a connected archive card", "打开关联档案卡") + "</h3></div>" +
      "<p>" + book.dossierIds.length + " " + bi("linked entries", "个关联条目") + "</p></div>" +
      '<div class="dialog-dossier-chips">' + dossierChips + "</div></section>" +
      chapterSection +
      '<div class="dialog-actions">' +
      (book.reader ?
        '<a class="dialog-action primary" href="' + esc(book.reader) + '#storybook">' +
        bi("Open Book 1 interactive reader", "打开第一册互动绘本") + " →</a>" : "") +
      '<button class="dialog-action" type="button" data-dialog-next="' + esc(nextBook.id) + '">' +
      bi("Next book: #" + nextBook.number, "下一册：第 " + nextBook.number + " 册") + " →</button>" +
      '<a class="dialog-action" href="' + esc(DATA.meta.sources[0].url) + '" target="_blank" rel="noopener">' +
      bi("Official series page", "官方系列页") + " ↗</a>" +
      "</div></div>";

    if (window.Mario) window.Mario.init(els.bookDialogBody);
  }

  function openBook(bookId) {
    var book = bookById(bookId);
    if (!book) return;
    state.selectedBook = bookId;
    markExplored(bookId);
    renderBookDialog(book);
    if (!els.bookDialog.open) els.bookDialog.showModal();
    var shell = els.bookDialog.querySelector(".dms-book-shell");
    if (shell) shell.scrollTop = 0;
  }

  function closeBook() {
    if (els.bookDialog.open) els.bookDialog.close();
  }

  /* -----------------------------------------------------------------------
   *  Archive
   * --------------------------------------------------------------------- */

  function updateArchiveCounts() {
    var counts = { person: 0, dragon: 0, place: 0, artifact: 0 };
    DATA.dossiers.forEach(function (entry) {
      if (counts[entry.type] != null) counts[entry.type] += 1;
    });
    els.heroDossierCount.textContent = DATA.dossiers.length;
    els.archiveAllCount.textContent = DATA.dossiers.length;
    els.archivePersonCount.textContent = counts.person;
    els.archiveDragonCount.textContent = counts.dragon;
    els.archivePlaceCount.textContent = counts.place;
    els.archiveArtifactCount.textContent = counts.artifact;
    els.dossierStampCount.textContent = DATA.dossiers.length + " CARDS";
  }

  function filteredDossiers() {
    var query = state.archiveSearch.trim().toLowerCase();
    return DATA.dossiers.filter(function (entry) {
      if (state.archiveType !== "all" && entry.type !== state.archiveType) return false;
      if (!query) return true;
      var books = booksForDossier(entry.id).map(function (book) {
        return book.titleEn + " " + book.titleZh;
      }).join(" ");
      return [
        entry.nameEn,
        entry.nameZh,
        entry.roleEn,
        entry.roleZh,
        entry.summaryEn,
        entry.summaryZh,
        books
      ].join(" ").toLowerCase().indexOf(query) !== -1;
    });
  }

  function renderDossiers() {
    var entries = filteredDossiers();
    els.dossierGrid.innerHTML = entries.map(function (entry) {
      var meta = typeMeta(entry.type);
      return '<button class="dms-dossier-card" type="button" data-dossier-id="' + esc(entry.id) + '"' +
        ' style="--dossier-accent:' + esc(meta.accent) + ';--dossier-soft:' + esc(meta.soft) + '">' +
        '<span class="dossier-glyph" aria-hidden="true">' + esc(entry.emoji) + "</span>" +
        "<div><span class=\"dossier-kind\">" + bi(meta.labelEn, meta.labelZh) + "</span>" +
        "<h3>" + bi(entry.nameEn, entry.nameZh) + "</h3>" +
        "<p>" + bi(entry.roleEn, entry.roleZh) + "</p></div></button>";
    }).join("");
  }

  function graphConnections(id) {
    var connections = [];
    DATA.coreGraph.edges.forEach(function (edge) {
      if (edge.from !== id && edge.to !== id) return;
      var otherId = edge.from === id ? edge.to : edge.from;
      var other = dossierById(otherId);
      if (!other) return;
      connections.push({
        id: otherId,
        entry: other,
        labelEn: edge.labelEn,
        labelZh: edge.labelZh
      });
    });
    return connections;
  }

  function renderDossierDialog(entry) {
    var meta = typeMeta(entry.type);
    var books = booksForDossier(entry.id);
    var connections = graphConnections(entry.id);

    els.dossierDialogBody.innerHTML =
      '<div class="dossier-head" style="--type:' + esc(meta.accent) + ';--type-soft:' + esc(meta.soft) + '">' +
      '<div class="dossier-portrait">' + esc(entry.emoji) + "</div>" +
      "<div><p class=\"dossier-kicker\">" + bi("SERIES ARCHIVE", "系列档案") + "</p>" +
      '<h2 id="dossierDialogTitle">' + bi(entry.nameEn, entry.nameZh) + "</h2>" +
      '<p class="dossier-role">' + bi(entry.roleEn, entry.roleZh) + "</p></div>" +
      '<span class="dossier-status">' + bi(meta.labelEn, meta.labelZh) + "</span></div>" +
      '<p class="dossier-summary"><span class="t-en" lang="en" id="dossierSummaryEn">' + esc(entry.summaryEn) + "</span>" +
      '<span class="t-zh" lang="zh-CN" id="dossierSummaryZh">' + esc(entry.summaryZh) + "</span></p>" +
      '<div class="dialog-listen-row">' +
      '<button class="listen-pill english" type="button" data-read-target="#dossierSummaryEn" data-tts-lang="en-US">🔊 ' +
      bi("English", "英文朗读") + "</button>" +
      '<button class="listen-pill chinese" type="button" data-read-target="#dossierSummaryZh" data-tts-lang="zh-CN">🔊 ' +
      bi("Chinese", "中文朗读") + "</button></div>";

    if (connections.length) {
      els.dossierDialogBody.innerHTML +=
        '<div class="dossier-section-title">' + bi("Direct story connections", "直接故事关联") + "</div>" +
        '<div class="dossier-links">' +
        connections.map(function (connection) {
          return '<button class="dossier-link" type="button" data-related-dossier="' + esc(connection.id) + '">' +
            "<span>" + esc(connection.entry.emoji) + "</span>" +
            "<b>" + bi(connection.entry.nameEn, connection.entry.nameZh) + "</b>" +
            "<small>" + bi(connection.labelEn, connection.labelZh) + "</small></button>";
        }).join("") + "</div>";
    }

    if (books.length) {
      els.dossierDialogBody.innerHTML +=
        '<div class="dossier-section-title">' + bi("Appears in these dossiers", "出现于这些图书档案") + "</div>" +
        '<div class="dossier-book-links">' +
        books.map(function (book) {
          return '<button class="dossier-book-link" type="button" data-related-book="' + esc(book.id) + '">' +
            "Book " + book.number + " · " + bi(book.titleEn, book.titleZh) + "</button>";
        }).join("") + "</div>";
    }

    els.dossierDialogBody.innerHTML +=
      '<div class="dossier-actions"><button class="dossier-action primary" type="button" data-dossier-close>' +
      bi("Back to the atlas", "返回故事图谱") + "</button></div>";

    if (window.Mario) window.Mario.init(els.dossierDialogBody);
  }

  function openDossier(id) {
    var entry = dossierById(id);
    if (!entry) return;
    state.selectedDossier = id;
    renderDossierDialog(entry);
    if (!els.dossierDialog.open) els.dossierDialog.showModal();
    var shell = els.dossierDialog.querySelector(".dossier-shell");
    if (shell) shell.scrollTop = 0;
  }

  function closeDossier() {
    if (els.dossierDialog.open) els.dossierDialog.close();
  }

  /* -----------------------------------------------------------------------
   *  Series knowledge graph
   * --------------------------------------------------------------------- */

  function renderGraph() {
    var edges = DATA.coreGraph.edges.map(function (edge, index) {
      var from = graphNode(edge.from);
      var to = graphNode(edge.to);
      if (!from || !to) return "";
      var middleX = (from.x + to.x) / 2;
      var middleY = (from.y + to.y) / 2 - 7;
      var key = [edge.from, edge.to].sort().join("::");
      return '<g data-edge-group="' + esc(key) + '">' +
        '<line class="graph-edge" data-edge="' + esc(key) + '" x1="' + from.x + '" y1="' + from.y +
        '" x2="' + to.x + '" y2="' + to.y + '"></line>' +
        '<text class="graph-edge-label" data-edge-label="' + esc(key) + '" x="' + middleX +
        '" y="' + middleY + '" text-anchor="middle">' +
        '<tspan class="graph-edge-label-en">' + esc(edge.labelEn) + "</tspan>" +
        '<tspan class="graph-edge-label-zh" x="' + middleX + '" dy="11">' + esc(edge.labelZh) + "</tspan>" +
        "</text></g>";
    }).join("");

    var nodes = DATA.coreGraph.nodes.map(function (node) {
      var entry = dossierById(node.id);
      if (!entry) return "";
      var meta = typeMeta(entry.type);
      return '<g class="graph-node node-' + esc(meta.graphClass) + '" data-graph-node="' + esc(node.id) + '"' +
        ' transform="translate(' + node.x + " " + node.y + ')" tabindex="0" role="button"' +
        ' aria-label="' + esc(entry.nameEn + " · " + entry.nameZh) + '">' +
        '<circle class="node-shape" r="' + node.r + '"></circle>' +
        '<text class="node-icon" text-anchor="middle" dy="7">' + esc(entry.emoji) + "</text>" +
        '<text class="node-label" y="' + (node.r + 17) + '" text-anchor="middle">' +
        '<tspan class="node-label-en">' + esc(entry.nameEn) + "</tspan>" +
        '<tspan class="node-label-zh" x="0" dy="12">' + esc(entry.nameZh) + "</tspan>" +
        "</text></g>";
    }).join("");

    els.seriesGraph.innerHTML = edges + nodes;
    updateGraphSelection();
  }

  function updateGraphSelection() {
    var activeId = state.graphNode;
    var activeNode = activeId ? graphNode(activeId) : null;

    Array.prototype.forEach.call(els.seriesGraph.querySelectorAll(".graph-node"), function (nodeEl) {
      var id = nodeEl.getAttribute("data-graph-node");
      var entry = dossierById(id);
      var typeMatch = state.graphType === "all" || (entry && entry.type === state.graphType);
      var incident = activeId && DATA.coreGraph.edges.some(function (edge) {
        return (edge.from === activeId && edge.to === id) || (edge.to === activeId && edge.from === id);
      });
      nodeEl.classList.toggle("is-selected", id === activeId);
      nodeEl.classList.toggle("is-neighbor", Boolean(incident));
      nodeEl.classList.toggle("is-dimmed", !typeMatch || Boolean(activeId && id !== activeId && !incident));
    });

    Array.prototype.forEach.call(els.seriesGraph.querySelectorAll(".graph-edge"), function (edgeEl) {
      var key = edgeEl.getAttribute("data-edge");
      var active = Boolean(activeId && key.split("::").indexOf(activeId) !== -1);
      edgeEl.classList.toggle("is-active", active);
    });
    Array.prototype.forEach.call(els.seriesGraph.querySelectorAll(".graph-edge-label"), function (label) {
      var key = label.getAttribute("data-edge-label");
      var active = Boolean(activeId && key.split("::").indexOf(activeId) !== -1);
      label.classList.toggle("is-active", active);
    });

    if (!activeNode || !activeId) return;
    var entry = dossierById(activeId);
    if (!entry) return;
    var meta = typeMeta(entry.type);
    var connections = graphConnections(activeId);

    els.graphInspector.innerHTML =
      '<span class="inspector-icon">' + esc(entry.emoji) + "</span>" +
      '<p class="inspector-type" style="color:' + esc(meta.accent) + '">' +
      bi(meta.labelEn, meta.labelZh) + "</p>" +
      "<h3>" + bi(entry.nameEn, entry.nameZh) + "</h3>" +
      "<p>" + bi(entry.roleEn, entry.roleZh) + "</p>" +
      '<div class="inspector-relations">' +
      connections.slice(0, 6).map(function (connection) {
        return '<button type="button" data-related-dossier="' + esc(connection.id) + '">' +
          "<span>" + esc(connection.entry.emoji) + "</span>" +
          "<b>" + bi(connection.entry.nameEn, connection.entry.nameZh) + "</b>" +
          "<small>" + bi(connection.labelEn, connection.labelZh) + "</small></button>";
      }).join("") + "</div>" +
      '<button class="inspector-open" type="button" data-related-dossier="' + esc(activeId) + '">' +
      bi("Open full archive card", "打开完整档案") + " →</button>";
    if (window.Mario) window.Mario.init(els.graphInspector);
  }

  function selectGraphNode(id) {
    state.graphNode = state.graphNode === id ? "" : id;
    updateGraphSelection();
  }

  function traceGraphPath() {
    state.traceTimers.forEach(function (timer) { clearTimeout(timer); });
    state.traceTimers = [];
    Array.prototype.forEach.call(els.seriesGraph.querySelectorAll(".graph-node"), function (node) {
      node.classList.remove("is-tracing");
    });

    var path = ["dragon-stone", "griffith", "king-roland", "drake", "worm", "maldred", "naga"];
    path.forEach(function (id, index) {
      var timer = setTimeout(function () {
        var node = els.seriesGraph.querySelector('[data-graph-node="' + id + '"]');
        if (!node) return;
        Array.prototype.forEach.call(els.seriesGraph.querySelectorAll(".graph-node"), function (item) {
          item.classList.remove("is-tracing");
        });
        node.classList.add("is-tracing");
        state.graphNode = id;
        updateGraphSelection();
        var traced = els.seriesGraph.querySelector('[data-graph-node="' + id + '"]');
        if (traced) traced.classList.add("is-tracing");
      }, index * 950);
      state.traceTimers.push(timer);
    });
  }

  /* -----------------------------------------------------------------------
   *  Dragon-keeper match game
   * --------------------------------------------------------------------- */

  function resetPairGame() {
    state.pairSelected = "";
    state.pairWrong = "";
    state.pairMatched = {};
    state.pairDragonOrder = shuffle(DATA.pairings.map(function (pair) { return pair.dragonId; }));
    state.pairMasterOrder = shuffle(DATA.pairings.map(function (pair) { return pair.masterId; }));
    els.pairTotal.textContent = DATA.pairings.length;
    setFeedback(els.pairFeedback, "Choose a dragon to begin.", "先选一条龙开始。");
    renderPairGame();
  }

  function pairForDragon(id) {
    return DATA.pairings.filter(function (pair) { return pair.dragonId === id; })[0] || null;
  }

  function pairForMaster(id) {
    return DATA.pairings.filter(function (pair) { return pair.masterId === id; })[0] || null;
  }

  function renderPairGame() {
    els.pairDragons.innerHTML = state.pairDragonOrder.map(function (id) {
      var entry = dossierById(id);
      var matched = Boolean(state.pairMatched[id]);
      var selected = state.pairSelected === id;
      return '<button class="pair-card' + (matched ? " matched" : "") + (selected ? " selected" : "") +
        '" type="button" data-pair-dragon="' + esc(id) + '"' + (matched ? " disabled" : "") + ">" +
        "<span>" + esc(entry.emoji) + "</span><b>" + bi(entry.nameEn, entry.nameZh) + "</b></button>";
    }).join("");

    els.pairMasters.innerHTML = state.pairMasterOrder.map(function (id) {
      var entry = dossierById(id);
      var pair = pairForMaster(id);
      var matched = Boolean(pair && state.pairMatched[pair.dragonId]);
      var wrong = state.pairWrong === id;
      return '<button class="pair-card' + (matched ? " matched" : "") + (wrong ? " wrong" : "") +
        '" type="button" data-pair-master="' + esc(id) + '"' + (matched ? " disabled" : "") + ">" +
        "<span>" + esc(entry.emoji) + "</span><b>" + bi(entry.nameEn, entry.nameZh) + "</b></button>";
    }).join("");

    var score = Object.keys(state.pairMatched).length;
    els.pairScore.textContent = score;
    if (score === DATA.pairings.length) {
      setFeedback(
        els.pairFeedback,
        "All eight bonds restored. You connected the keepers and dragons.",
        "八组联结全部恢复！你把驯龙师和龙重新连在了一起。",
        "success"
      );
      if (window.Mario) window.Mario.confetti();
    }
  }

  function chooseDragon(id) {
    if (state.pairMatched[id]) return;
    state.pairSelected = id;
    state.pairWrong = "";
    var dragon = dossierById(id);
    setFeedback(
      els.pairFeedback,
      "Now choose the keeper who belongs with " + dragon.nameEn + ".",
      "现在选择与" + dragon.nameZh + "相连的驯龙师。"
    );
    renderPairGame();
  }

  function chooseMaster(id) {
    if (!state.pairSelected) {
      setFeedback(els.pairFeedback, "Choose a dragon first.", "请先选择一条龙。", "retry");
      return;
    }
    var pair = pairForMaster(id);
    if (!pair || state.pairMatched[pair.dragonId]) return;

    if (pair.dragonId === state.pairSelected) {
      state.pairMatched[pair.dragonId] = true;
      state.pairSelected = "";
      state.pairWrong = "";
      if (window.Mario) window.Mario.beep("correct");
      setFeedback(
        els.pairFeedback,
        "Bond confirmed. Their story clue connects them.",
        "联结确认，他们的故事线索彼此吻合。",
        "success"
      );
      renderPairGame();
      return;
    }

    state.pairWrong = id;
    if (window.Mario) window.Mario.beep("wrong");
    setFeedback(
      els.pairFeedback,
      "Not this keeper yet. Look at the dragon's clue and try again.",
      "还不是这位驯龙师。再看看龙的线索，试一次。",
      "retry"
    );
    renderPairGame();
    setTimeout(function () {
      state.pairWrong = "";
      renderPairGame();
    }, 450);
  }

  /* -----------------------------------------------------------------------
   *  Timeline trail game
   * --------------------------------------------------------------------- */

  function resetTrailGame() {
    state.trailNext = 0;
    state.trailDone = {};
    state.trailOrder = shuffle(DATA.timeline.items);
    els.trailScore.textContent = "0";
    setFeedback(els.trailFeedback, "Start with the first book.", "从第一册开始。");
    renderTrailGame();
  }

  function renderTrailGame() {
    els.trailGame.innerHTML = state.trailOrder.map(function (item) {
      var book = bookById(item.id);
      return '<button class="trail-stop' + (state.trailDone[item.id] ? " is-done" : "") +
        '" type="button" data-trail-id="' + esc(item.id) + '"' +
        (state.trailDone[item.id] ? " disabled" : "") + ">" +
        "<small>" + bi("MILESTONE", "里程碑") + "</small><b>" + bi(book.titleEn, book.titleZh) + "</b>" +
        '<span class="trail-stop-copy">' + bi(item.labelEn, item.labelZh) + "</span></button>";
    }).join("");
    els.trailScore.textContent = Object.keys(state.trailDone).length;
  }

  function chooseTrail(id) {
    if (state.trailDone[id]) return;
    var expected = DATA.timeline.items[state.trailNext];
    if (!expected) return;

    if (expected.id === id) {
      state.trailDone[id] = true;
      state.trailNext += 1;
      if (window.Mario) window.Mario.beep("correct");
      if (state.trailNext >= DATA.timeline.items.length) {
        setFeedback(
          els.trailFeedback,
          "Trail complete. You rebuilt all six key series milestones.",
          "故事路线完成！你重建了六个关键里程碑。",
          "success"
        );
        if (window.Mario) window.Mario.confetti();
      } else {
        setFeedback(
          els.trailFeedback,
          "Correct stop. What comes next in the series trail?",
          "站点正确。旅程接下来会发生什么？",
          "success"
        );
      }
      renderTrailGame();
      return;
    }

    if (window.Mario) window.Mario.beep("wrong");
    setFeedback(
      els.trailFeedback,
      "That milestone belongs later. Try an earlier part of the trail.",
      "这个里程碑还在后面。先找更早的一段旅程。",
      "retry"
    );
  }

  /* -----------------------------------------------------------------------
   *  Vocabulary
   * --------------------------------------------------------------------- */

  function renderVocabulary() {
    els.vocabGrid.innerHTML = DATA.vocabulary.map(function (word, index) {
      return '<article class="dms-vocab-card">' +
        '<div class="word-card-head"><span aria-hidden="true">' + esc(word.emoji) + "</span>" +
        "<small>" + esc(word.ipa) + "</small></div>" +
        '<h3 lang="en" id="vocabWordEn-' + index + '">' + esc(word.word) + "</h3>" +
        '<p><span class="t-en" lang="en" id="vocabMeaningEn-' + index + '">' + esc(word.meaningEn) + "</span>" +
        '<span class="t-zh" lang="zh-CN" id="vocabMeaningZh-' + index + '">' + esc(word.meaningZh) + "</span></p>" +
        '<p class="word-context"><span class="t-en" lang="en" id="vocabContextEn-' + index + '">' +
        esc(word.contextEn) + "</span><span class=\"t-zh\" lang=\"zh-CN\" id=\"vocabContextZh-" + index + '">' +
        esc(word.contextZh) + "</span></p>" +
        '<div class="word-listen-row">' +
        '<button class="listen-pill english" type="button" data-read-target="#vocabWordEn-' + index + '" data-tts-lang="en-US">EN</button>' +
        '<button class="listen-pill english" type="button" data-read-target="#vocabContextEn-' + index + '" data-tts-lang="en-US">EN ↗</button>' +
        '<button class="listen-pill chinese" type="button" data-read-target="#vocabMeaningZh-' + index + '" data-tts-lang="zh-CN">中</button>' +
        '<button class="listen-pill chinese" type="button" data-read-target="#vocabContextZh-' + index + '" data-tts-lang="zh-CN">中 ↗</button>' +
        "</div></article>";
    }).join("");
    if (window.Mario) window.Mario.init(els.vocabGrid);
  }

  /* -----------------------------------------------------------------------
   *  Real-life missions
   * --------------------------------------------------------------------- */

  function renderMissions() {
    els.missionTotal.textContent = DATA.missions.length;
    els.missionScore.textContent = Object.keys(state.missions).length;

    els.missionGrid.innerHTML = DATA.missions.map(function (mission, missionIndex) {
      var completed = state.missions[mission.id] != null;
      var wrongIndex = state.missionsWrong[mission.id];
      return '<article class="mission-card" data-mission-card="' + esc(mission.id) + '">' +
        '<div class="mission-head"><span aria-hidden="true">' + esc(mission.emoji) + "</span>" +
        "<h3>" + bi(mission.titleEn, mission.titleZh) + "</h3></div>" +
        '<p class="mission-prompt">' + bi(mission.promptEn, mission.promptZh) + "</p>" +
        '<div class="mission-options">' +
        mission.choices.map(function (choice, choiceIndex) {
          var cls = "";
          if (completed && choiceIndex === mission.answer) cls = " is-correct";
          if (wrongIndex === choiceIndex && !completed) cls = " is-wrong";
          return '<button class="mission-option' + cls + '" type="button" data-mission-id="' +
            esc(mission.id) + '" data-option-index="' + choiceIndex + '"' +
            (completed ? " disabled" : "") + ">" +
            bi(choice.en, choice.zh) + "</button>";
        }).join("") +
        "</div>" +
        (completed ?
          '<p class="mission-feedback is-earned">' + bi(mission.explanationEn, mission.explanationZh) + "</p>" :
          '<p class="mission-feedback">' + bi("Choose a safe and curious move.", "选择一个安全又好奇的做法。") + "</p>") +
        "</article>";
    }).join("");
  }

  function chooseMission(missionId, optionIndex) {
    var mission = DATA.missions.filter(function (item) { return item.id === missionId; })[0];
    if (!mission || state.missions[missionId] != null) return;

    if (optionIndex === mission.answer) {
      state.missions[missionId] = true;
      delete state.missionsWrong[missionId];
      if (window.Mario) window.Mario.beep("correct");
      if (Object.keys(state.missions).length === DATA.missions.length && window.Mario) {
        window.Mario.confetti();
      }
    } else {
      state.missionsWrong[missionId] = optionIndex;
      if (window.Mario) window.Mario.beep("wrong");
    }
    renderMissions();
  }

  /* -----------------------------------------------------------------------
   *  Tabs and language
   * --------------------------------------------------------------------- */

  function setGameTab(name) {
    Array.prototype.forEach.call(els.gameTabs.querySelectorAll("[data-game-tab]"), function (tab) {
      var active = tab.getAttribute("data-game-tab") === name;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-game-panel]"), function (panel) {
      var active = panel.getAttribute("data-game-panel") === name;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  }

  function voiceMessage(lang) {
    if (!window.Mario || !window.Mario.supported) {
      return {
        en: "This browser cannot speak yet. A grown-up can read the archive with you.",
        zh: "这个浏览器暂时不能朗读，可以请大人陪你一起读。"
      };
    }
    if (lang === "zh") {
      return {
        en: "Uses the native Chinese voice on this device.",
        zh: "使用设备自带的中文语音朗读，无需下载。"
      };
    }
    if (lang === "both") {
      return {
        en: "Each listen button chooses the matching native language voice.",
        zh: "每个朗读按钮会自动选择对应的本机语言语音。"
      };
    }
    return {
      en: "Uses the native English voice on this device. No download needed.",
      zh: "使用设备自带的英文语音朗读，无需下载。"
    };
  }

  function updateVoiceNote() {
    var message = voiceMessage(state.lang);
    if (state.lang === "zh") {
      els.voiceNote.textContent = message.zh;
    } else if (state.lang === "both") {
      els.voiceNote.textContent = message.en + " · " + message.zh;
    } else {
      els.voiceNote.textContent = message.en;
    }
    els.voiceDot.className = "voice-dot " +
      (window.Mario && window.Mario.supported ? "ready" : "unavailable");
  }

  function setLanguage(lang) {
    if (["en", "zh", "both"].indexOf(lang) === -1) lang = "en";
    state.lang = lang;
    body.classList.remove("lang-en", "lang-zh", "lang-both");
    body.classList.add("lang-" + lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    Array.prototype.forEach.call(els.langToggle.querySelectorAll(".lang-btn"), function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    els.librarySearch.placeholder = lang === "zh" ?
      "搜索书名、人物、龙、地点或主题…" :
      (lang === "both" ? "Search / 搜索书名、人物、龙…" : "Search books, characters, dragons…");
    els.archiveSearch.placeholder = lang === "zh" ?
      "搜索人物、龙、地点或物件…" :
      (lang === "both" ? "Search / 搜索档案…" : "Search the archive…");
    els.continueEyebrow.textContent = lang === "zh" ? "继续探索" : "CONTINUE EXPLORING";

    updateVoiceNote();
    updateProgressUI();
    renderLibrary();
    if (els.bookDialog.open && state.selectedBook) {
      renderBookDialog(bookById(state.selectedBook));
    }
    if (els.dossierDialog.open && state.selectedDossier) {
      renderDossierDialog(dossierById(state.selectedDossier));
    }
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
  }

  /* -----------------------------------------------------------------------
   *  Page progress and source links
   * --------------------------------------------------------------------- */

  function updatePageProgress() {
    var doc = document.documentElement;
    var max = Math.max(0, doc.scrollHeight - window.innerHeight);
    var progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    els.seriesProgress.style.width = progress.toFixed(2) + "%";
  }

  function renderSources() {
    els.sourceLinks.innerHTML = DATA.meta.sources.map(function (source) {
      return '<a href="' + esc(source.url) + '" target="_blank" rel="noopener">' +
        bi(source.labelEn, source.labelZh) + " ↗</a>";
    }).join("");
  }

  /* -----------------------------------------------------------------------
   *  Events
   * --------------------------------------------------------------------- */

  els.langToggle.addEventListener("click", function (event) {
    var button = event.target.closest(".lang-btn");
    if (button) setLanguage(button.getAttribute("data-lang"));
  });

  els.heroArcNodes.addEventListener("click", function (event) {
    var button = event.target.closest("[data-hero-arc]");
    if (!button) return;
    selectArc(button.getAttribute("data-hero-arc"), true);
  });

  els.arcRail.addEventListener("click", function (event) {
    var button = event.target.closest("[data-arc]");
    if (button) selectArc(button.getAttribute("data-arc"), false);
  });

  els.arcFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-arc-filter]");
    if (button) selectArc(button.getAttribute("data-arc-filter"), false);
  });

  els.arcFocus.addEventListener("click", function (event) {
    var button = event.target.closest("[data-focus-books]");
    if (button) {
      document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  els.librarySearch.addEventListener("input", function () {
    state.search = els.librarySearch.value;
    renderLibrary();
  });

  els.clearSearch.addEventListener("click", function () {
    state.search = "";
    els.librarySearch.value = "";
    els.librarySearch.focus();
    renderLibrary();
  });

  els.statusFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-status]");
    if (!button) return;
    state.status = button.getAttribute("data-status");
    Array.prototype.forEach.call(els.statusFilters.querySelectorAll(".filter-chip"), function (item) {
      item.classList.toggle("active", item === button);
    });
    renderLibrary();
  });

  els.resetLibrary.addEventListener("click", resetLibrary);

  els.libraryGrid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-book-id]");
    if (button) openBook(button.getAttribute("data-book-id"));
  });

  els.continueReading.addEventListener("click", function () {
    openBook(state.lastBook || "dm-01");
  });

  els.bookDialogClose.addEventListener("click", closeBook);
  els.bookDialog.addEventListener("click", function (event) {
    if (event.target === els.bookDialog) closeBook();
  });
  els.bookDialogBody.addEventListener("click", function (event) {
    var dossierButton = event.target.closest("[data-dialog-dossier]");
    if (dossierButton) {
      openDossier(dossierButton.getAttribute("data-dialog-dossier"));
      return;
    }
    var nextButton = event.target.closest("[data-dialog-next]");
    if (nextButton) {
      openBook(nextButton.getAttribute("data-dialog-next"));
    }
  });

  els.archiveSearch.addEventListener("input", function () {
    state.archiveSearch = els.archiveSearch.value;
    renderDossiers();
  });

  els.archiveFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-archive-type]");
    if (!button) return;
    state.archiveType = button.getAttribute("data-archive-type");
    Array.prototype.forEach.call(els.archiveFilters.querySelectorAll(".filter-chip"), function (item) {
      item.classList.toggle("active", item === button);
    });
    renderDossiers();
  });

  els.dossierGrid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-dossier-id]");
    if (button) openDossier(button.getAttribute("data-dossier-id"));
  });

  els.dossierDialogClose.addEventListener("click", closeDossier);
  els.dossierDialog.addEventListener("click", function (event) {
    if (event.target === els.dossierDialog) closeDossier();
  });
  els.dossierDialogBody.addEventListener("click", function (event) {
    if (event.target.closest("[data-dossier-close]")) {
      closeDossier();
      return;
    }
    var related = event.target.closest("[data-related-dossier]");
    if (related) {
      openDossier(related.getAttribute("data-related-dossier"));
      return;
    }
    var relatedBook = event.target.closest("[data-related-book]");
    if (relatedBook) {
      closeDossier();
      openBook(relatedBook.getAttribute("data-related-book"));
    }
  });

  els.seriesGraph.addEventListener("click", function (event) {
    var node = event.target.closest("[data-graph-node]");
    if (node) selectGraphNode(node.getAttribute("data-graph-node"));
  });
  els.seriesGraph.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var node = event.target.closest("[data-graph-node]");
    if (!node) return;
    event.preventDefault();
    selectGraphNode(node.getAttribute("data-graph-node"));
  });

  els.graphFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-graph-type]");
    if (!button) return;
    state.graphType = button.getAttribute("data-graph-type");
    Array.prototype.forEach.call(els.graphFilters.querySelectorAll(".filter-chip"), function (item) {
      item.classList.toggle("active", item === button);
    });
    updateGraphSelection();
  });

  els.graphInspector.addEventListener("click", function (event) {
    var button = event.target.closest("[data-related-dossier]");
    if (button) openDossier(button.getAttribute("data-related-dossier"));
  });

  els.traceGraph.addEventListener("click", traceGraphPath);

  els.gameTabs.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-game-tab]");
    if (tab) setGameTab(tab.getAttribute("data-game-tab"));
  });

  document.getElementById("pairGame").addEventListener("click", function (event) {
    var dragon = event.target.closest("[data-pair-dragon]");
    if (dragon) {
      chooseDragon(dragon.getAttribute("data-pair-dragon"));
      return;
    }
    var master = event.target.closest("[data-pair-master]");
    if (master) chooseMaster(master.getAttribute("data-pair-master"));
  });

  els.resetPairs.addEventListener("click", resetPairGame);

  els.trailGame.addEventListener("click", function (event) {
    var stop = event.target.closest("[data-trail-id]");
    if (stop) chooseTrail(stop.getAttribute("data-trail-id"));
  });

  els.resetTrail.addEventListener("click", resetTrailGame);

  els.missionGrid.addEventListener("click", function (event) {
    var option = event.target.closest("[data-mission-id]");
    if (!option) return;
    chooseMission(
      option.getAttribute("data-mission-id"),
      Number(option.getAttribute("data-option-index"))
    );
  });

  window.addEventListener("scroll", updatePageProgress, { passive: true });
  window.addEventListener("resize", updatePageProgress, { passive: true });

  /* -----------------------------------------------------------------------
   *  Boot
   * --------------------------------------------------------------------- */

  function boot() {
    readProgress();
    updateArchiveCounts();
    renderHeroArcNodes();
    renderArcRail();
    renderArcFocus();
    renderLibrary();
    renderDossiers();
    renderGraph();
    resetPairGame();
    resetTrailGame();
    renderVocabulary();
    renderMissions();
    renderSources();
    updateProgressUI();
    updatePageProgress();

    var savedLang = "en";
    try {
      savedLang = localStorage.getItem(LANG_KEY) || "en";
    } catch (e) {}
    setLanguage(savedLang);

    if (window.Mario) window.Mario.init(document);
    setTimeout(updateVoiceNote, 900);
  }

  boot();
})();
