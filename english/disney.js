/* =========================================================================
 *  英语启蒙 · 迪士尼世界 —— 渲染逻辑
 *  - 从 window.DISNEY_DATA 渲染卡片网格
 *  - 语言切换：中文 / English / 双语（通过 body.lang-* 控制 .t-zh / .t-en 显隐）
 *  - 点击卡片弹出详情，含简介与"学一句"英语短句
 * ========================================================================= */

(function () {
  "use strict";

  var data = window.DISNEY_DATA || [];
  var grid = document.getElementById("grid");
  var modal = document.getElementById("modal");
  var modalBody = document.getElementById("modalBody");
  var modalCard = document.getElementById("modalCard");
  var modalClose = document.getElementById("modalClose");
  var modalMask = document.getElementById("modalMask");
  var langToggle = document.getElementById("langToggle");

  // 同时输出中文 + 英文两路 span，由 CSS 按 body.lang-* 决定显隐
  function zh(s) { return '<span class="t-zh">' + esc(s) + "</span>"; }
  function en(s) { return '<span class="t-en">' + esc(s) + "</span>"; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderGrid() {
    grid.innerHTML = data.map(function (d) {
      return (
        '<article class="card" data-id="' + esc(d.id) + '" style="--c:' + esc(d.color) + '">' +
          '<div class="card-emoji">' + esc(d.emoji) + "</div>" +
          '<div class="card-name">' + zh(d.nameZh) + en(d.nameEn) + "</div>" +
          '<div class="card-tag">' + zh(d.tagZh) + en(d.tagEn) + "</div>" +
        "</article>"
      );
    }).join("");
  }

  function openDetail(id) {
    var d = data.filter(function (x) { return x.id === id; })[0];
    if (!d) return;
    modalCard.style.setProperty("--c", d.color);
    modalBody.innerHTML =
      '<div class="m-emoji">' + esc(d.emoji) + "</div>" +
      '<div class="m-name">' + zh(d.nameZh) + en(d.nameEn) + "</div>" +
      '<div class="m-tag">' + zh(d.tagZh) + en(d.tagEn) + "</div>" +
      '<div class="m-desc">' + zh(d.descZh) + en(d.descEn) + "</div>" +
      '<div class="m-phrase">' +
        '<span class="label">SPEAK &amp; LEARN · 学一句</span>' +
        '<span class="en">' + esc(d.phraseEn) + "</span>" +
        '<span class="zh">' + esc(d.phraseZh) + "</span>" +
      "</div>";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeDetail() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  // 卡片点击（事件委托）
  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (card) openDetail(card.getAttribute("data-id"));
  });

  modalClose.addEventListener("click", closeDetail);
  modalMask.addEventListener("click", closeDetail);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeDetail();
  });

  // 语言切换
  function setLang(lang) {
    document.body.className = "lang-" + lang;
    var btns = langToggle.querySelectorAll(".lang-btn");
    btns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }
  langToggle.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-btn");
    if (btn) setLang(btn.getAttribute("data-lang"));
  });

  renderGrid();
})();
