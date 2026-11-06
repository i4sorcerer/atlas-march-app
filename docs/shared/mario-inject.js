/* =========================================================================
 *  Mario 悬浮小助手（给已有页面一键接入）
 *  用法：在页面 </body> 前加一行
 *      <script src="../shared/mario-inject.js" defer></script>
 *  会自动：
 *    1. 加载 shared/mario.css（若页面还没引）
 *    2. 右下角出现 Mario 头像按钮
 *    3. 点开后可朗读整页正文、随时停止
 *  可选：<body data-mario-greeting="你好呀！我是 Mario，我们一起探索吧！">
 * ========================================================================= */
(function () {
  "use strict";
  if (window.__marioInjectLoaded) return;
  window.__marioInjectLoaded = true;

  var scriptSrc = (document.currentScript && document.currentScript.src) || "";
  var base = scriptSrc ? scriptSrc.replace(/mario-inject\.js.*$/, "") : "../shared/";

  // 1) 样式
  if (!document.querySelector('link[href*="mario.css"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = base + "mario.css";
    document.head.appendChild(link);
  }

  // 2) 朗读脚本
  function boot() {
    if (!window.Mario) {
      var s = document.createElement("script");
      s.src = base + "mario.js";
      s.onload = build;
      document.body.appendChild(s);
    } else {
      build();
    }
  }

  function build() {
    if (document.getElementById("marioHelper")) return;

    var style = document.createElement("style");
    style.textContent = [
      "#marioHelper{position:fixed;right:16px;bottom:16px;z-index:9000;font-family:var(--m-font,system-ui);}",
      "#marioHelperBtn{position:relative;width:64px;height:64px;border-radius:50%;border:3px solid #fff;padding:0;cursor:pointer;background:#ffe3c2 center 62%/78% no-repeat;background-image:var(--mario-avatar);box-shadow:0 8px 22px rgba(50,60,120,.28);transition:transform .18s cubic-bezier(.34,1.56,.64,1);}",
      "#marioHelperBtn:hover{transform:scale(1.08) rotate(-3deg)}",
      "#marioHelperBtn::after{content:'🔊';position:absolute;right:-4px;bottom:-2px;font-size:16px;background:#fff;border-radius:50%;width:24px;height:24px;line-height:24px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.18)}",
      "#marioHelperBtn.is-speaking::after{content:'⏹'}",
      "#marioPanel{position:absolute;right:0;bottom:78px;width:min(320px,86vw);background:#fff;border-radius:20px;padding:16px 18px;box-shadow:0 18px 44px rgba(50,60,120,.3);border:3px solid #2b2d5b;display:none}",
      "#marioPanel.show{display:block;animation:marioIn .22s cubic-bezier(.34,1.56,.64,1)}",
      "@keyframes marioIn{from{transform:translateY(10px) scale(.94);opacity:0}to{transform:none;opacity:1}}",
      "#marioPanel p{margin:0 0 12px;font-size:15px;line-height:1.7;color:#2b2d5b}",
      "#marioPanel .row{display:flex;gap:8px;flex-wrap:wrap}",
      "#marioPanel button{font-family:inherit;font-size:14px;font-weight:700;border:0;cursor:pointer;padding:9px 14px;border-radius:999px}",
      "#marioPanel .go{background:linear-gradient(180deg,#ffe08a,#ffd166);color:#4a3410;box-shadow:0 3px 0 #d8a92f}",
      "#marioPanel .stop{background:#eef1ff;color:#4353a8}",
      "#marioPanel .close{background:transparent;color:#8a8fb5;padding:9px 6px;margin-left:auto}"
    ].join("");
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.id = "marioHelper";
    wrap.innerHTML =
      '<div id="marioPanel" role="dialog" aria-label="Mario 朗读助手">' +
        '<p id="marioSay"></p>' +
        '<div class="row">' +
          '<button class="go" id="marioRead">🔊 读给我听</button>' +
          '<button class="stop" id="marioStop">⏹ 停一下</button>' +
          '<button class="close" id="marioClose" aria-label="关闭">✕</button>' +
        '</div>' +
      '</div>' +
      '<button id="marioHelperBtn" aria-label="打开 Mario 朗读助手"></button>';
    document.body.appendChild(wrap);

    var greeting = (document.body.dataset.marioGreeting ||
      "你好呀！我是 Mario。想听我讲讲这一页吗？点下面的按钮就可以啦～");
    document.getElementById("marioSay").textContent = greeting;

    var panel = document.getElementById("marioPanel");
    var btn = document.getElementById("marioHelperBtn");

    btn.addEventListener("click", function () {
      panel.classList.toggle("show");
    });
    document.getElementById("marioClose").addEventListener("click", function () {
      panel.classList.remove("show");
    });
    document.getElementById("marioStop").addEventListener("click", function () {
      window.Mario.stop();
      btn.classList.remove("is-speaking");
    });
    document.getElementById("marioRead").addEventListener("click", function () {
      if (btn.classList.contains("is-speaking")) { window.Mario.stop(); btn.classList.remove("is-speaking"); return; }
      var text = collectPageText();
      if (!text) return;
      btn.classList.add("is-speaking");
      window.Mario.speak(text, {
        rate: 0.9,
        onEnd: function () { btn.classList.remove("is-speaking"); }
      });
    });

    // 点击外部收起
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) panel.classList.remove("show");
    });
    window.addEventListener("pagehide", function () { window.Mario && window.Mario.stop(); });
  }

  function collectPageText() {
    var prefer = document.querySelector("[data-mario-read]");
    var root = prefer || document.querySelector("main") || document.body;
    var parts = [];
    root.querySelectorAll("h1,h2,h3,p,li,blockquote").forEach(function (el) {
      if (el.closest("nav,header,footer,script,style,#marioHelper,.m-quiz,.quiz-el")) return;
      var t = (el.innerText || "").trim();
      if (!t || t.length < 2) return;
      if (parts.indexOf(t) > -1) return;
      parts.push(t);
    });
    return parts.join("。").slice(0, 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
