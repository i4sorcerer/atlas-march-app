(function () {
  "use strict";

  const STORAGE_KEY = "mario-history-01-01";
  const TOTAL_TASKS = 7;
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const sceneNames = ["封面", "黑鸡蛋", "盘古开天", "女娲造人", "侦探局", "山洞线索", "回到今天", "通关挑战", "寻史徽章"];

  const state = {
    current: 0,
    tasks: new Set(),
    soundOn: false,
    bestScore: 0,
    quizCompleted: false,
    eggTaps: 0,
    panguTaps: 0,
    clayStage: 0,
    sortIndex: 0,
    sortCorrect: 0,
    sortLocked: false,
    quizIndex: 0,
    quizCorrect: 0,
    quizAnswered: false,
    quizFinished: false,
    caveFound: new Set(),
    homeFound: new Set(),
    reported: false
  };

  const progressBar = document.getElementById("progressBar");
  const starCount = document.getElementById("starCount");
  const soundToggle = document.getElementById("soundToggle");
  const pageNow = document.getElementById("pageNow");
  const pageDots = document.getElementById("pageDots");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const toastEl = document.getElementById("toast");

  scenes.forEach((scene, index) => {
    scene.id = "scene-" + scene.dataset.scene;
    scene.dataset.index = String(index);
    if (pageDots) {
      const dot = document.createElement("i");
      dot.dataset.dot = String(index);
      pageDots.appendChild(dot);
    }
  });

  function readSavedState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (Array.isArray(saved.tasks)) state.tasks = new Set(saved.tasks);
      if (Number.isFinite(saved.bestScore)) state.bestScore = saved.bestScore;
      state.quizCompleted = state.tasks.has("quiz");
    } catch (error) {
      state.tasks = new Set();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        tasks: Array.from(state.tasks),
        bestScore: state.bestScore,
        updatedAt: Date.now()
      }));
    } catch (error) {
      /* localStorage 被禁用时，互动本身仍然可以继续。 */
    }
  }

  function updateStarMeter(bump) {
    if (!starCount) return;
    starCount.textContent = `🌟 ${state.tasks.size} / ${TOTAL_TASKS}`;
    starCount.setAttribute("aria-label", `已获得 ${state.tasks.size} 颗探索星`);
    if (bump) {
      starCount.classList.remove("bump");
      void starCount.offsetWidth;
      starCount.classList.add("bump");
    }
  }

  function updateFinalStats() {
    const finalStars = document.getElementById("finalStars");
    const finalScore = document.getElementById("finalScore");
    if (finalStars) finalStars.textContent = `${state.tasks.size} / ${TOTAL_TASKS}`;
    if (finalScore) {
      const score = state.quizCompleted ? state.bestScore : 0;
      finalScore.textContent = `${score} / 3`;
    }
  }

  function markTask(task) {
    if (!task || state.tasks.has(task)) return;
    state.tasks.add(task);
    const scene = document.querySelector(`.scene[data-task="${task}"]`);
    if (scene) scene.classList.add("done");
    updateStarMeter(true);
    updateFinalStats();
    saveState();
    refreshNav();
  }

  function refreshNav() {
    const scene = scenes[state.current];
    if (!scene) return;

    if (progressBar) {
      progressBar.style.width = `${((state.current + 1) / scenes.length) * 100}%`;
    }
    if (pageNow) {
      pageNow.textContent = `${state.current + 1} / ${scenes.length} · ${sceneNames[state.current]}`;
    }
    if (pageDots) {
      pageDots.querySelectorAll("i").forEach((dot, index) => {
        dot.classList.toggle("active", index === state.current);
        dot.classList.toggle("seen", index < state.current);
      });
    }

    if (prevButton) prevButton.disabled = state.current === 0;
    if (!nextButton) return;

    const task = scene.dataset.task;
    const gateOpen = !task || state.tasks.has(task);
    const isLast = state.current === scenes.length - 1;
    nextButton.hidden = isLast;
    nextButton.disabled = !gateOpen;
    nextButton.textContent = !gateOpen
      ? "先完成互动 →"
      : scene.dataset.scene === "quiz" && state.quizFinished
        ? "领取徽章 →"
        : "下一页 →";
  }

  function goTo(index, options) {
    const opts = options || {};
    if (index < 0 || index >= scenes.length) return;

    stopSpeaking();
    scenes[state.current].classList.remove("active");
    state.current = index;
    const scene = scenes[state.current];
    scene.classList.add("active");

    if (!opts.skipHash) {
      const hash = "#" + scene.id;
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    }

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });

    refreshNav();

    if (state.soundOn) {
      window.setTimeout(() => speakCurrentScene(false), 360);
    }

    if (scene.dataset.scene === "final") {
      updateFinalStats();
      window.setTimeout(createConfetti, 350);
    }
  }

  /* ---------------- 朗读 ---------------- */

  function chooseChineseVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => /^zh|chinese|mandarin|中文|普通话/i.test(voice.lang + " " + voice.name)) || null;
  }

  function speakText(text, force) {
    if (!text) return;
    if (!force && !state.soundOn) return;
    if (!("speechSynthesis" in window)) {
      showToast("这个浏览器暂时不能朗读，可以请爸爸妈妈读给你听。");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = chooseChineseVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = "zh-CN";
    utterance.rate = 0.92;
    utterance.pitch = 1.06;
    window.speechSynthesis.speak(utterance);
  }

  function speakCurrentScene(force) {
    const scene = scenes[state.current];
    if (!scene) return;
    speakText(scene.dataset.narration || "", force);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        showToast("这个浏览器暂时不能朗读，可以请爸爸妈妈读给你听。");
        return;
      }
      state.soundOn = !state.soundOn;
      soundToggle.setAttribute("aria-pressed", String(state.soundOn));
      soundToggle.setAttribute("aria-label", state.soundOn ? "关闭朗读" : "打开朗读");
      soundToggle.textContent = state.soundOn ? "🔊 朗读开" : "🔇 朗读";
      if (state.soundOn) {
        speakCurrentScene(true);
        showToast("朗读已打开。翻页时会自动读这一页。");
      } else {
        stopSpeaking();
        showToast("朗读已关闭。");
      }
    });
  }

  /* ---------------- 提示条 ---------------- */

  let toastTimer = 0;
  function showToast(message) {
    if (!toastEl || !message) return;
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  /* ---------------- 大鸡蛋 ---------------- */

  const cosmicEgg = document.getElementById("cosmicEgg");
  const eggTap = document.getElementById("eggTap");
  const eggHint = document.getElementById("eggHint");
  const eggMeter = Array.from(document.querySelectorAll(".tap-meter i"));

  function tapEgg() {
    if (state.eggTaps >= 3) return;
    state.eggTaps += 1;
    if (cosmicEgg) cosmicEgg.dataset.crack = String(state.eggTaps);
    eggMeter.forEach((dot, index) => dot.classList.toggle("lit", index < state.eggTaps));

    if (state.eggTaps === 1) {
      if (eggHint) eggHint.textContent = "有裂缝了！再敲一下。";
      if (eggTap) eggTap.innerHTML = "<span>🥚</span> 再敲一下（1 / 3）";
      if (state.soundOn) speakText("咚。黑鸡蛋上出现了一条细细的裂缝。", false);
    } else if (state.eggTaps === 2) {
      if (eggHint) eggHint.textContent = "裂缝变长了。最后一下！";
      if (eggTap) eggTap.innerHTML = "<span>🥚</span> 最后敲一下（2 / 3）";
      if (state.soundOn) speakText("咔嚓。裂缝变得更长了。", false);
    } else {
      if (cosmicEgg) cosmicEgg.classList.add("is-open");
      const scene = document.querySelector('.scene[data-task="egg"]');
      if (scene) scene.classList.add("done");
      if (eggTap) {
        eggTap.classList.add("complete");
        eggTap.innerHTML = "<span>🌤️</span> 天地分开啦！";
      }
      if (eggHint) eggHint.textContent = "轻的清，重的沉。天地慢慢分开了。";
      markTask("egg");
      showToast("发现 1 颗探索星：古人怎样想象世界。");
      speakText("咔嚓。轻的东西往上飘，慢慢变成天；重的东西往下沉，慢慢变成地。", false);
    }
  }

  if (eggTap) eggTap.addEventListener("click", tapEgg);
  if (cosmicEgg) cosmicEgg.addEventListener("click", tapEgg);

  /* ---------------- 盘古撑天 ---------------- */

  const liftSky = document.getElementById("liftSky");
  const panguProgress = document.getElementById("panguProgress");
  const panguHint = document.getElementById("panguHint");

  function liftTheSky() {
    if (state.panguTaps >= 5) return;
    state.panguTaps += 1;
    const percent = state.panguTaps * 20;
    if (panguProgress) panguProgress.style.width = percent + "%";

    if (state.panguTaps < 5) {
      const left = 5 - state.panguTaps;
      if (panguHint) panguHint.textContent = `再点 ${left} 下，天会更高，地会更厚。`;
      if (liftSky) liftSky.innerHTML = `<span>🙌</span> 再撑一下（${state.panguTaps} / 5）`;
      if (state.soundOn) speakText(["天升高了一点。", "地变厚了一点。", "盘古还在坚持。", "天和地越来越远了。"][state.panguTaps - 1] || "", false);
    } else {
      const scene = document.querySelector('.scene[data-task="pangu"]');
      if (scene) scene.classList.add("done");
      if (liftSky) {
        liftSky.classList.add("complete");
        liftSky.innerHTML = "<span>🌄</span> 天地终于分开了！";
      }
      if (panguHint) panguHint.textContent = "天很高了，地很厚了。传说里，盘古终于可以休息了。";
      markTask("pangu");
      showToast("发现 1 颗探索星：古人怎样讲天地的来源。");
      speakText("天每天升高，地每天变厚。最后，天和地终于分开了。", false);
    }
  }

  if (liftSky) liftSky.addEventListener("click", liftTheSky);

  /* ---------------- 女娲捏泥人 ---------------- */

  const clayWork = document.getElementById("clayWork");
  const clayTap = document.getElementById("clayTap");
  const nuwaHint = document.getElementById("nuwaHint");
  const clayDots = Array.from(document.querySelectorAll(".clay-dots i"));
  const clayHints = [
    "第 2 步：把黄泥揉成一个大圆团。",
    "第 3 步：捏出圆圆的脑袋。",
    "第 4 步：再捏出手和脚。",
    "第 5 步：轻轻吹一口气。",
    "小泥人活了！传说里，第一批人就是这样来的。"
  ];

  function shapeClay() {
    if (state.clayStage >= 5) return;
    state.clayStage += 1;
    if (clayWork) clayWork.dataset.stage = String(state.clayStage);
    clayDots.forEach((dot, index) => dot.classList.toggle("lit", index < state.clayStage));
    if (nuwaHint) nuwaHint.textContent = clayHints[state.clayStage - 1];

    if (state.clayStage < 5) {
      if (clayTap) clayTap.innerHTML = `<span>🤲</span> 再捏一下（${state.clayStage} / 5）`;
      if (state.soundOn) speakText(clayHints[state.clayStage - 1], false);
    } else {
      const scene = document.querySelector('.scene[data-task="nuwa"]');
      if (scene) scene.classList.add("done");
      if (clayTap) {
        clayTap.classList.add("complete");
        clayTap.innerHTML = "<span>🧡</span> 小泥人活了！";
      }
      markTask("nuwa");
      showToast("发现 1 颗探索星：古人怎样想象人的由来。");
      speakText("小泥人活了。传说里，女娲就这样造出了第一批人。", false);
    }
  }

  if (clayTap) clayTap.addEventListener("click", shapeClay);

  /* ---------------- 传说侦探局 ---------------- */

  const sortItems = [
    {
      icon: "🥚",
      text: "盘古把天地分开，身体变成了山川日月。",
      type: "myth",
      label: "传说",
      why: "这是古人的想象，不是考古学家找到的东西。"
    },
    {
      icon: "🧡",
      text: "女娲用黄泥捏出小人，吹一口气，小人活了。",
      type: "myth",
      label: "传说",
      why: "这是解释“人从哪里来”的神话故事。"
    },
    {
      icon: "🔥",
      text: "山洞的土层里，发现很厚的灰烬和烧过的骨头。",
      type: "evidence",
      label: "考古线索",
      why: "灰烬和烧骨是真实留下的痕迹，说明古人用过火。"
    },
    {
      icon: "🦴",
      text: "一根骨头被磨得又细又尖，上面还有小孔。",
      type: "evidence",
      label: "考古线索",
      why: "这是磨制的骨针，是考古学家从遗址里找到的工具。"
    }
  ];
  const sortCard = document.getElementById("sortCard");
  const sortIcon = document.getElementById("sortIcon");
  const sortText = document.getElementById("sortText");
  const sortCount = document.getElementById("sortCount");
  const sortFeedback = document.getElementById("sortFeedback");
  const sortButtons = Array.from(document.querySelectorAll(".sort-button"));

  function renderSortItem() {
    const item = sortItems[state.sortIndex];
    if (!item) return;
    if (sortIcon) sortIcon.textContent = item.icon;
    if (sortText) sortText.textContent = item.text;
    if (sortCount) sortCount.textContent = `${state.sortIndex + 1} / ${sortItems.length}`;
    if (sortFeedback) {
      sortFeedback.textContent = "选一个抽屉吧。";
      sortFeedback.className = "sort-feedback";
    }
    if (sortCard) sortCard.className = "case-card";
    sortButtons.forEach((button) => { button.disabled = false; });
    state.sortLocked = false;
  }

  function answerSort(choice) {
    if (state.sortLocked || state.sortIndex >= sortItems.length) return;
    state.sortLocked = true;
    const item = sortItems[state.sortIndex];
    const correct = choice === item.type;
    sortButtons.forEach((button) => { button.disabled = true; });

    if (correct) {
      state.sortCorrect += 1;
      if (sortCard) sortCard.classList.add("is-correct");
      if (sortFeedback) {
        sortFeedback.textContent = `分对了！${item.why}`;
        sortFeedback.className = "sort-feedback correct";
      }
      if (state.soundOn) speakText("分对了。" + item.why, false);
    } else {
      if (sortCard) sortCard.classList.add("is-wrong");
      if (sortFeedback) {
        sortFeedback.textContent = `这张其实是「${item.label}」。${item.why}`;
        sortFeedback.className = "sort-feedback wrong";
      }
      if (state.soundOn) speakText(`再想一想。这张其实是${item.label}。${item.why}`, false);
    }

    window.setTimeout(() => {
      state.sortIndex += 1;
      if (state.sortIndex < sortItems.length) {
        if (sortCard) sortCard.classList.add("is-leaving");
        window.setTimeout(renderSortItem, 240);
      } else {
        finishSorting();
      }
    }, correct ? 980 : 1500);
  }

  function finishSorting() {
    if (sortCard) {
      sortCard.className = "case-card";
      sortCard.innerHTML = `
        <span class="case-stamp">结案</span>
        <span class="case-icon">🔎</span>
        <p>四张卡片都分好了。传说回答“古人怎么想”，考古回答“我们找到了什么”。</p>
      `;
    }
    if (sortCount) sortCount.textContent = "4 / 4";
    if (sortFeedback) {
      sortFeedback.textContent = "侦探笔记：喜欢传说，也要记得证据。两句话都重要。";
      sortFeedback.className = "sort-feedback correct";
    }
    sortButtons.forEach((button) => { button.disabled = true; });
    markTask("sort");
    showToast("发现 1 颗探索星：分清传说和考古线索。");
    speakText("四张卡片都分好了。传说回答古人怎么想，考古回答我们真的找到了什么。", false);
  }

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => answerSort(button.dataset.sort));
  });
  renderSortItem();

  /* ---------------- 山洞线索 ---------------- */

  const caveFinds = {
    ash: {
      title: "灰烬和烧骨",
      spoken: "厚厚的灰烬和烧过的骨头。说明古人已经会用火。"
    },
    bone: {
      title: "磨尖的骨针",
      spoken: "一根磨尖的骨针。古人可以缝兽皮做衣服。"
    },
    stone: {
      title: "打制的石器",
      spoken: "一块打制过的石头。锋利的边可以切东西、挖东西。"
    }
  };

  function findCaveItem(id) {
    if (!caveFinds[id] || state.caveFound.has(id)) return;
    state.caveFound.add(id);

    const hotspot = document.querySelector(`.hotspot[data-find="${id}"]`);
    const row = document.querySelector(`[data-find-row="${id}"]`);
    if (hotspot) {
      hotspot.classList.add("found");
      hotspot.disabled = true;
    }
    if (row) row.classList.add("found");

    const caveInstruction = document.getElementById("caveInstruction");
    if (caveInstruction) caveInstruction.textContent = `已找到 ${state.caveFound.size} / 3 个线索`;
    showToast(`找到线索：${caveFinds[id].title}`);
    speakText(caveFinds[id].spoken, false);

    if (state.caveFound.size === 3) {
      markTask("cave");
      if (caveInstruction) caveInstruction.textContent = "三个线索都找到了！";
      showToast("发现 1 颗探索星：考古学家怎样读土地日记。");
    }
  }

  document.querySelectorAll(".hotspot").forEach((button) => {
    button.addEventListener("click", () => findCaveItem(button.dataset.find));
  });

  /* ---------------- 回家：变与不变 ---------------- */

  const homeFinds = {
    fire: {
      title: "灯火",
      spoken: "古人学会用火照明。今天，我们用电灯。"
    },
    tool: {
      title: "勺子",
      spoken: "古人打磨工具。今天，勺子也是手的帮手。"
    },
    story: {
      title: "绘本",
      spoken: "古人围着篝火讲故事。今天，我们翻开绘本听故事。"
    }
  };

  function findHomeItem(id) {
    if (!homeFinds[id] || state.homeFound.has(id)) return;
    state.homeFound.add(id);

    document.querySelectorAll(`[data-home="${id}"]`).forEach((element) => {
      element.classList.add("found");
      if (element.tagName === "BUTTON") element.disabled = true;
    });

    showToast(`找到一条连接：${homeFinds[id].title}`);
    speakText(homeFinds[id].spoken, false);

    if (state.homeFound.size === 3) {
      markTask("home");
      showToast("发现 1 颗探索星：历史一直连到今天。");
    }
  }

  document.querySelectorAll("[data-home]").forEach((element) => {
    element.addEventListener("click", () => findHomeItem(element.dataset.home));
  });

  /* ---------------- 小测验 ---------------- */

  const quizQuestions = [
    {
      question: "盘古开天、女娲造人，它们是什么？",
      options: ["古人讲的传说", "考古学家拍下的照片", "今天发生的新故事"],
      correct: 0,
      right: "对！它们是神话传说，是古人用想象解释世界的故事。",
      wrong: "它们都是传说。传说可以很动人，但不是考古学家找到的历史事实。"
    },
    {
      question: "考古学家在山洞里找到烧过的灰烬，这告诉我们什么？",
      options: ["古人会开汽车", "古人已经会用火", "古人住在高楼里"],
      correct: 1,
      right: "对！灰烬和烧骨能说明古人用过火，这是真实的考古线索。",
      wrong: "灰烬和烧过的骨头，最直接告诉我们：古人已经会用火。"
    },
    {
      question: "从古到今，下面什么一直没有变？",
      options: ["人们都住一样的房子", "人们都用手机", "人们都要吃饭、用工具、讲故事"],
      correct: 2,
      right: "对！房子和工具会变，但吃饭、取暖、做工具、讲故事，一直陪着人类。",
      wrong: "再想一想。房子和手机都会变；吃饭、用工具、讲故事，从古到今都需要。"
    }
  ];
  const questionNumber = document.getElementById("questionNumber");
  const questionText = document.getElementById("questionText");
  const answerList = document.getElementById("answerList");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizNext = document.getElementById("quizNext");
  const quizMain = document.getElementById("quizMain");
  const quizResult = document.getElementById("quizResult");
  const quizScore = document.getElementById("quizScore");
  const quizResultText = document.getElementById("quizResultText");
  const quizDots = Array.from(document.querySelectorAll(".quiz-dots i"));

  function renderQuestion() {
    const item = quizQuestions[state.quizIndex];
    if (!item || !answerList) return;
    state.quizAnswered = false;

    if (questionNumber) questionNumber.textContent = `第 ${state.quizIndex + 1} 题`;
    if (questionText) questionText.textContent = item.question;
    if (quizFeedback) {
      quizFeedback.textContent = "选一个你心里的答案。";
      quizFeedback.className = "quiz-feedback";
    }
    if (quizNext) quizNext.hidden = true;

    answerList.innerHTML = item.options.map((option, index) => `
      <button class="answer-button" type="button" data-answer="${index}">
        <span class="answer-letter">${["A", "B", "C"][index]}</span>
        <span class="answer-text">${option}</span>
        <span class="answer-mark">○</span>
      </button>
    `).join("");

    answerList.querySelectorAll(".answer-button").forEach((button) => {
      button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer)));
    });
    quizDots.forEach((dot, index) => dot.classList.toggle("active", index === state.quizIndex));
  }

  function answerQuestion(choice) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;
    const item = quizQuestions[state.quizIndex];
    const correct = choice === item.correct;
    if (correct) state.quizCorrect += 1;

    answerList.querySelectorAll(".answer-button").forEach((button, index) => {
      button.disabled = true;
      const mark = button.querySelector(".answer-mark");
      if (index === item.correct) {
        button.classList.add("correct");
        if (mark) mark.textContent = "✓";
      } else if (index === choice) {
        button.classList.add("wrong");
        if (mark) mark.textContent = "×";
      } else {
        button.classList.add("dim");
      }
    });

    if (quizFeedback) {
      quizFeedback.textContent = correct ? item.right : item.wrong;
      quizFeedback.className = "quiz-feedback " + (correct ? "correct" : "wrong");
    }
    if (quizNext) {
      quizNext.hidden = false;
      quizNext.textContent = state.quizIndex < quizQuestions.length - 1 ? "下一题 →" : "看看我的成绩 🏅";
    }
    if (state.soundOn) speakText(correct ? item.right : item.wrong, false);
  }

  function finishQuiz() {
    state.quizFinished = true;
    state.quizCompleted = true;
    state.bestScore = Math.max(state.bestScore, state.quizCorrect);

    if (quizMain) quizMain.hidden = true;
    if (quizResult) quizResult.hidden = false;
    if (quizScore) quizScore.textContent = String(state.quizCorrect);
    if (quizResultText) {
      if (state.quizCorrect === 3) {
        quizResultText.textContent = "传说和考古线索，你都分得清！这枚徽章属于你。";
      } else if (state.quizCorrect === 2) {
        quizResultText.textContent = "你已经抓住关键了。再读一次，就能把传说和证据讲得更清楚。";
      } else {
        quizResultText.textContent = "没关系。记住：传说回答古人怎么想；考古回答我们真的找到了什么。";
      }
    }

    markTask("quiz");
    saveState();
    updateFinalStats();
    refreshNav();
    reportQuiz();
    showToast(`挑战完成：答对 ${state.quizCorrect} / 3 题，获得寻史徽章！`);
    speakText(`挑战完成。你答对了${state.quizCorrect}题。传说，是古人想象世界的故事；考古，是我们在土里找证据。火、工具和故事，从很久以前一直陪我们到今天。`, false);
  }

  function reportQuiz() {
    if (state.reported) return;
    state.reported = true;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: "quiz-result",
        topicId: "mario-history-01-01",
        title: "你听过这些传说吗？",
        emoji: "🧭",
        score: state.quizCorrect,
        total: quizQuestions.length
      }, "*");
    }
  }

  if (quizNext) {
    quizNext.addEventListener("click", () => {
      if (state.quizIndex < quizQuestions.length - 1) {
        state.quizIndex += 1;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });
  }
  renderQuestion();

  /* ---------------- 徽章 / 彩纸 ---------------- */

  function createConfetti() {
    const container = document.getElementById("confetti");
    if (!container) return;
    const colors = ["#c69b4a", "#b74534", "#3f766d", "#e8cf8d", "#d9877b"];
    container.innerHTML = "";
    for (let i = 0; i < 30; i += 1) {
      const piece = document.createElement("i");
      const start = 34 + Math.random() * 32;
      piece.style.left = start + "%";
      piece.style.setProperty("--x", `${-170 + Math.random() * 340}px`);
      piece.style.setProperty("--rot", `${-180 + Math.random() * 520}deg`);
      piece.style.setProperty("--delay", `${Math.random() * 0.5}s`);
      piece.style.setProperty("--confetti", colors[i % colors.length]);
      container.appendChild(piece);
    }
    window.setTimeout(() => { container.innerHTML = ""; }, 3300);
  }

  /* ---------------- 家长指南 ---------------- */

  const parentButton = document.getElementById("parentButton");
  const parentModal = document.getElementById("parentModal");
  const parentClose = document.getElementById("parentClose");

  function openParentGuide() {
    if (!parentModal) return;
    stopSpeaking();
    parentModal.hidden = false;
    document.body.classList.add("modal-open");
    if (parentClose) parentClose.focus();
  }

  function closeParentGuide() {
    if (!parentModal) return;
    parentModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (parentButton) parentButton.focus();
  }

  if (parentButton) parentButton.addEventListener("click", openParentGuide);
  if (parentClose) parentClose.addEventListener("click", closeParentGuide);
  if (parentModal) {
    parentModal.addEventListener("click", (event) => {
      if (event.target === parentModal) closeParentGuide();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && parentModal && !parentModal.hidden) closeParentGuide();
  });

  /* ---------------- 翻页和启动 ---------------- */

  if (prevButton) {
    prevButton.addEventListener("click", () => goTo(state.current - 1));
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (nextButton.disabled) return;
      goTo(state.current + 1);
    });
  }

  const startButton = document.getElementById("startButton");
  if (startButton) startButton.addEventListener("click", () => goTo(1));

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      state.soundOn = false;
      if (soundToggle) {
        soundToggle.setAttribute("aria-pressed", "false");
        soundToggle.setAttribute("aria-label", "打开朗读");
        soundToggle.textContent = "🔇 朗读";
      }
      goTo(0);
    });
  }

  const readSummary = document.getElementById("readSummary");
  if (readSummary) {
    readSummary.addEventListener("click", () => {
      speakText("传说，是古人想象世界的故事；考古，是我们在土里找证据。火、工具和故事，从很久以前一直陪我们到今天。", true);
    });
  }

  readSavedState();
  updateStarMeter(false);
  updateFinalStats();

  const hashScene = window.location.hash.replace("#scene-", "");
  const hashIndex = scenes.findIndex((scene) => scene.dataset.scene === hashScene);
  goTo(hashIndex >= 0 ? hashIndex : 0, { skipHash: hashIndex >= 0 });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }
})();
