/* =========================================================================
 *  Mario 统一脚本：系统朗读 / 朗读按钮 / 互动小游戏 / 星星动画
 *  用法：
 *    <link rel="stylesheet" href="../shared/mario.css">
 *    <script src="../shared/mario.js"></script>
 *    <button class="tts-btn" data-read-target="#intro">🔊 听 Mario 讲</button>
 *    <button class="tts-btn" data-tts="你好呀，我是 Mario！">🔊 朗读</button>
 * ========================================================================= */
(function () {
  "use strict";

  var synth = window.speechSynthesis;
  var supported = !!synth && typeof window.SpeechSynthesisUtterance === "function";
  var voices = [];
  var current = null;      // 当前朗读的 state
  var activeBtn = null;

  /* ---------------- 音色选择 ---------------- */
  function loadVoices() {
    if (!supported) return;
    voices = synth.getVoices() || [];
  }
  loadVoices();
  if (supported && typeof synth.addEventListener === "function") {
    synth.addEventListener("voiceschanged", loadVoices);
  }
  // Chrome 上 getVoices 首次为空，稍后再取一次
  setTimeout(loadVoices, 300);
  setTimeout(loadVoices, 1200);

  function pickVoice() {
    if (!voices.length) loadVoices();
    var zh = voices.filter(function (v) {
      return /^zh/i.test(v.lang || "") || /chinese|中文|普通话|國語/i.test(v.name || "");
    });
    if (!zh.length) return null;
    // 优先本地语音（离线更快、更稳），再优先常见中文音色
    var prefer = /Ting-?Ting|婷婷|Mei-?Jia|美佳|Xiaoxiao|晓晓|Xiaoyi|晓伊|Yunxi|云希|Google.*(普通话|Chinese)/i;
    zh.sort(function (a, b) {
      var pa = (prefer.test(a.name) ? 2 : 0) + (a.localService ? 1 : 0);
      var pb = (prefer.test(b.name) ? 2 : 0) + (b.localService ? 1 : 0);
      return pb - pa;
    });
    return zh[0];
  }

  /* ---------------- 断句 ---------------- */
  function splitSentences(text) {
    return String(text || "")
      .replace(/\s+/g, " ")
      .split(/(?<=[。！？!?；;])|\n+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .reduce(function (out, s) {
        // 太长的一句再按逗号切，避免一次读太久
        if (s.length <= 90) { out.push(s); return out; }
        return out.concat(s.split(/(?<=[，,、])/).filter(Boolean));
      }, []);
  }

  /* ---------------- 朗读核心 ---------------- */
  function clearHighlight() {
    document.querySelectorAll("[data-sentence].is-current").forEach(function (el) {
      el.classList.remove("is-current");
    });
    document.querySelectorAll(".mario-reading").forEach(function (el) {
      el.classList.remove("mario-reading");
    });
  }

  function setBusy(btn, busy) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", busy ? "true" : "false");
    btn.classList.toggle("is-speaking", busy);
    var icon = btn.querySelector(".tts-icon");
    if (icon) icon.textContent = busy ? "⏹" : "🔊";
  }

  function stop() {
    if (!supported) return;
    try { synth.cancel(); } catch (e) {}
    if (current && current.timer) clearTimeout(current.timer);
    current = null;
    clearHighlight();
    if (activeBtn) setBusy(activeBtn, false);
    activeBtn = null;
    document.querySelectorAll(".mario-figure.is-talking").forEach(function (el) {
      el.classList.remove("is-talking");
    });
  }

  /**
   * 朗读一段文字
   * @param {string|Element} source 文本，或要朗读的元素（会逐句高亮）
   * @param {Object} opts {rate, pitch, button, onEnd}
   */
  function speak(source, opts) {
    opts = opts || {};
    if (!supported) {
      alert("当前浏览器不支持语音朗读，可以请爸爸妈妈读给你听哦～");
      return;
    }
    stop();

    var el = (source && source.nodeType === 1) ? source : null;
    var sentences = el ? collectSentences(el) : splitSentences(source);
    if (!sentences.length) return;

    var voice = pickVoice();
    var rate = typeof opts.rate === "number" ? opts.rate : 0.88;
    var pitch = typeof opts.pitch === "number" ? opts.pitch : 1.04;
    var btn = opts.button || null;

    activeBtn = btn;
    setBusy(btn, true);
    document.querySelectorAll(".mario-figure").forEach(function (f) {
      f.classList.add("is-talking");
    });
    if (el) el.classList.add("mario-reading");

    var state = { i: 0, cancelled: false, timer: null };
    current = state;

    function speakAt(i) {
      if (!current || state.cancelled) return;
      if (i >= sentences.length) { finish(); return; }
      var item = sentences[i];
      var u = new SpeechSynthesisUtterance(item.text);
      u.lang = voice ? (voice.lang || "zh-CN") : "zh-CN";
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = pitch;
      u.volume = 1;

      if (item.node) {
        document.querySelectorAll("[data-sentence].is-current").forEach(function (n) {
          n.classList.remove("is-current");
        });
        item.node.classList.add("is-current");
      }

      u.onend = function () { if (current === state) speakAt(i + 1); };
      u.onerror = function () { if (current === state) speakAt(i + 1); };

      try { synth.speak(u); } catch (e) { speakAt(i + 1); }
    }

    function finish() {
      clearHighlight();
      setBusy(btn, false);
      activeBtn = null;
      document.querySelectorAll(".mario-figure.is-talking").forEach(function (f) {
        f.classList.remove("is-talking");
      });
      if (current === state) current = null;
      if (typeof opts.onEnd === "function") opts.onEnd();
    }

    // Chrome 偶发“第一次点击没声音”：先 resume，再稍等一拍
    try { synth.resume(); } catch (e) {}
    state.timer = setTimeout(function () { speakAt(0); }, 60);
  }

  /** 把元素按句子切片，返回 [{text,node}] */
  function collectSentences(root) {
    var out = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (p && /^(SCRIPT|STYLE|BUTTON)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var parts = text.match(/[^。！？!?；;\n]+[。！？!?；;]?/g) || [text];
      if (parts.length <= 1) {
        out.push({ text: text.trim(), node: textNode.parentElement });
        return;
      }
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        var span = document.createElement("span");
        span.setAttribute("data-sentence", "");
        span.textContent = p;
        frag.appendChild(span);
        out.push({ text: p.trim(), node: span });
      });
      if (textNode.parentNode) textNode.parentNode.replaceChild(frag, textNode);
    });
    return out;
  }

  /* ---------------- 按钮自动绑定 ---------------- */
  function bindButtons(scope) {
    (scope || document).querySelectorAll("[data-tts],[data-read-target]").forEach(function (btn) {
      if (btn.dataset.ttsBound) return;
      btn.dataset.ttsBound = "1";

      if (!btn.querySelector(".tts-icon")) {
        var icon = document.createElement("span");
        icon.className = "tts-icon";
        icon.textContent = "🔊";
        btn.insertBefore(icon, btn.firstChild);
      }
      btn.setAttribute("aria-pressed", "false");

      btn.addEventListener("click", function () {
        if (btn.classList.contains("is-speaking")) { stop(); return; }
        var target = btn.dataset.readTarget;
        if (target) {
          var el = document.querySelector(target);
          if (el) { speak(el, { button: btn }); return; }
        }
        speak(btn.dataset.tts || btn.dataset.readTargetText || "", { button: btn });
      });
    });
  }

  /* ---------------- 星星庆祝 ---------------- */
  function confetti(count) {
    var box = document.createElement("div");
    box.className = "m-confetti";
    var icons = ["⭐", "🌟", "✨", "🎉", "💫"];
    var n = count || 26;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("i");
      s.textContent = icons[i % icons.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
      s.style.animationDelay = (Math.random() * 0.5) + "s";
      s.style.fontSize = (14 + Math.random() * 20) + "px";
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3800);
  }

  /* ---------------- 小游戏：翻开卡片 ---------------- */
  function initTiles(scope) {
    (scope || document).querySelectorAll("[data-tile-group]").forEach(function (group) {
      if (group.dataset.tilesBound) return;
      group.dataset.tilesBound = "1";
      var detail = document.querySelector(group.dataset.tileGroup);
      group.addEventListener("click", function (e) {
        var tile = e.target.closest("[data-tile]");
        if (!tile) return;
        var wasActive = tile.classList.contains("is-active");
        group.querySelectorAll("[data-tile]").forEach(function (t) { t.classList.remove("is-active"); });
        if (wasActive) return;
        tile.classList.add("is-active");
        if (detail) {
          detail.innerHTML = tile.dataset.tile;
          detail.style.display = "block";
        }
        if (window.Mario && tile.dataset.say) {
          speak(tile.dataset.say, { rate: 0.9 });
        }
      });
    });
  }

  /* ---------------- 通用测验 ---------------- */
  function initQuiz(scope) {
    (scope || document).querySelectorAll(".m-quiz").forEach(function (quiz) {
      if (quiz.dataset.quizBound) return;
      quiz.dataset.quizBound = "1";
      var qs = Array.prototype.slice.call(quiz.querySelectorAll(".m-quiz-q"));
      var result = quiz.querySelector(".m-quiz-result");

      qs.forEach(function (q) {
        q.querySelectorAll(".m-opt").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (q.dataset.done) return;
            q.dataset.done = "1";
            var ans = q.dataset.answer;
            q.querySelectorAll(".m-opt").forEach(function (b) {
              b.disabled = true;
              if (b.dataset.v === ans) b.classList.add("is-correct");
            });
            if (btn.dataset.v !== ans) btn.classList.add("is-wrong");

            var right = btn.dataset.v === ans;
            beep(right ? "correct" : "wrong");

            if (qs.every(function (x) { return x.dataset.done; })) {
              var score = qs.filter(function (x) { return !x.querySelector(".is-wrong"); }).length;
              if (result) {
                result.textContent = "🏅 你答对了 " + score + " / " + qs.length + " 题！" +
                  (score === qs.length ? " 太厉害啦！" : " 我们再看看前面的内容吧～");
                result.style.display = "block";
              }
              confetti();
              reportQuiz(quiz.dataset.topicId, quiz.dataset.topicTitle, quiz.dataset.topicEmoji, score, qs.length);
            }
          });
        });
      });
    });
  }

  function reportQuiz(topicId, title, emoji, score, total) {
    if (!topicId) return;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: "quiz-result", topicId: topicId, title: title || "",
        emoji: emoji || "⭐", score: score, total: total
      }, "*");
    }
  }

  /* ---------------- 轻量音效 ---------------- */
  var actx = null;
  function beep(kind) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator();
      var g = actx.createGain();
      o.connect(g); g.connect(actx.destination);
      if (kind === "correct") {
        o.frequency.value = 784; o.type = "sine";
        g.gain.setValueAtTime(0.13, actx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.28);
        o.start(); o.stop(actx.currentTime + 0.28);
      } else {
        o.frequency.value = 196; o.type = "sawtooth";
        g.gain.setValueAtTime(0.07, actx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.22);
        o.start(); o.stop(actx.currentTime + 0.22);
      }
    } catch (e) {}
  }

  /* ---------------- 初始化 ---------------- */
  function init(scope) {
    bindButtons(scope);
    initTiles(scope);
    initQuiz(scope);
  }

  document.addEventListener("DOMContentLoaded", function () { init(document); });
  // 有些页面脚本先跑，容错再绑一次
  if (document.readyState === "interactive" || document.readyState === "complete") {
    init(document);
  }
  window.addEventListener("pagehide", stop);

  window.Mario = {
    speak: speak,
    stop: stop,
    init: init,
    confetti: confetti,
    beep: beep,
    reportQuiz: reportQuiz,
    get voice() { return pickVoice(); },
    get supported() { return supported; }
  };
})();
