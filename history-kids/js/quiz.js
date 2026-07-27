// ============ 小测验 ============

const QUIZ_BANK = [
  { q: "中国第一个王朝是哪个？", options: ["夏朝", "商朝", "周朝", "秦朝"], answer: 0, explain: "大禹的儿子启建立了中国第一个王朝——夏朝。" },
  { q: "兵马俑属于哪个朝代？", options: ["周朝", "秦朝", "汉朝", "唐朝"], answer: 1, explain: "兵马俑是秦始皇陵的一部分，距今 2000 多年。" },
  { q: "中国历史上唯一的女皇帝是谁？", options: ["吕雉", "慈禧", "武则天", "杨贵妃"], answer: 2, explain: "武则天在 690 年称帝，建立武周。" },
  { q: "\"汉族\"的\"汉\"来自哪个朝代？", options: ["秦朝", "汉朝", "唐朝", "明朝"], answer: 1, explain: "刘邦建立的汉朝，让我们这个民族称为汉族。" },
  { q: "下面哪个是四大发明？", options: ["造纸术", "玻璃", "香水", "指南鱼"], answer: 0, explain: "蔡伦改进的造纸术是四大发明之一。" },
  { q: "三国是哪三个国家？", options: ["秦楚汉", "魏蜀吴", "宋齐梁", "唐宋元"], answer: 1, explain: "220-280 年间是魏、蜀、吴三国鼎立。" },
  { q: "万里长城最早是哪个朝代开始修的？", options: ["周朝", "秦朝", "唐朝", "明朝"], answer: 1, explain: "秦始皇把各国长城连起来，是万里长城的雏形。" },
  { q: "郑和下西洋是从哪个朝代开始的？", options: ["宋朝", "元朝", "明朝", "清朝"], answer: 2, explain: "1405 年明成祖派郑和开始下西洋。" },
  { q: "中国最后一个封建王朝是哪个？", options: ["明朝", "清朝", "元朝", "唐朝"], answer: 1, explain: "清朝 1912 年被辛亥革命推翻。" },
  { q: "1949 年 10 月 1 日发生了什么？", options: ["抗战胜利", "新中国成立", "改革开放", "加入 WTO"], answer: 1, explain: "毛泽东在天安门宣告中华人民共和国成立。" },
  { q: "下面哪个人写过《史记》？", options: ["孔子", "老子", "司马迁", "李白"], answer: 2, explain: "司马迁是西汉史学家，写出了《史记》。" },
  { q: "哪个朝代发明了活字印刷术？", options: ["唐朝", "宋朝", "元朝", "明朝"], answer: 1, explain: "毕昇在宋朝发明了活字印刷，比欧洲早 400 年。" },
  { q: "唐朝的首都是哪里？", options: ["洛阳", "长安", "开封", "南京"], answer: 1, explain: "长安是当时世界上最大的城市。" },
  { q: "元朝是哪一族建立的？", options: ["汉族", "满族", "蒙古族", "契丹族"], answer: 2, explain: "成吉思汗的孙子忽必烈建立了元朝。" },
  { q: "孔子的故乡是？", options: ["齐国", "鲁国", "楚国", "秦国"], answer: 1, explain: "孔子是鲁国人（今山东曲阜）。" },
  { q: "京杭大运河是谁在位时开凿的？", options: ["唐太宗", "隋炀帝", "宋太祖", "明太祖"], answer: 1, explain: "隋炀帝在位时开凿了大运河。" }
];

let quizState = {
  questions: [],
  current: 0,
  score: 0,
  answered: false
};

function initQuiz() {
  const retryBtn = document.getElementById('retryQuizBtn');
  retryBtn.addEventListener('click', startQuiz);

  // 按当前地区渲染开始界面（有题库显示"开始挑战"，无题库提示如何加题）
  renderQuizStart();

  // 朝代歌按钮
  const singBtn = document.getElementById('singBtn');
  const copyBtn = document.getElementById('copyBtn');
  if (singBtn) {
    singBtn.addEventListener('click', () => {
      const text = document.querySelector('.song-text').textContent;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
      singBtn.textContent = '🔊 念中...';
      utterance.onend = () => singBtn.textContent = '🎤 跟我念';
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = document.querySelector('.song-text').textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ 已复制';
        setTimeout(() => copyBtn.textContent = '📋 抄下来', 1500);
      });
    });
  }
}

function startQuiz() {
  // 取当前地区的题库（支持按地区扩展，见 loader.js 的 getQuizBank）
  const bank = (typeof getQuizBank === "function") ? getQuizBank() : QUIZ_BANK;

  if (!bank || bank.length === 0) {
    // 该内容包暂无测验题：友好提示，不开始
    const startEl = document.getElementById('quizStart');
    startEl.style.display = 'block';
    startEl.innerHTML = `
      <div class="quiz-icon">📭</div>
      <h3>这个内容包还没有测验题</h3>
      <p>把 <b>data/${STATE_REGION()}-quiz.json</b> 丢进项目，就能在这里出世界史题目啦！<br>先去别的板块逛逛吧～</p>
    `;
    return;
  }

  // 随机抽 5 题（不足 5 题则全部抽取）
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  quizState.questions = shuffled.slice(0, 5);
  quizState.current = 0;
  quizState.score = 0;
  quizState.answered = false;

  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizPlaying').style.display = 'block';

  renderQuestion();
}

// 当前地区名（loader 未加载时回退 china），仅用于提示文案
function STATE_REGION() {
  return (typeof STATE !== "undefined" && STATE.region) ? STATE.region : "china";
}

// 根据当前地区题库渲染"开始界面"：有题显示按钮，无题提示如何加包
function renderQuizStart() {
  const startEl = document.getElementById('quizStart');
  if (!startEl) return;

  const bank = (typeof getQuizBank === "function") ? getQuizBank() : QUIZ_BANK;
  if (!bank || bank.length === 0) {
    const region = STATE_REGION();
    startEl.innerHTML = `
      <div class="quiz-icon">📭</div>
      <h3>这个内容包还没有测验题</h3>
      <p>把 <b>data/${region}-quiz.json</b> 丢进项目，就能在这里出世界史题目啦！<br>先去别的板块逛逛吧～</p>
    `;
    return;
  }

  startEl.innerHTML = `
    <div class="quiz-icon">🧠</div>
    <h3>准备好了吗？</h3>
    <p>5 道选择题，答完看分数</p>
    <button class="btn btn-primary" id="startQuizBtn">开始挑战 →</button>
  `;
  const b = startEl.querySelector('#startQuizBtn');
  if (b) b.addEventListener('click', startQuiz);
}

// 切换地区时重置测验状态，按新地区重新渲染开始界面
function resetQuiz() {
  quizState.questions = [];
  quizState.current = 0;
  quizState.score = 0;
  quizState.answered = false;

  const playingEl = document.getElementById('quizPlaying');
  const resultEl = document.getElementById('quizResult');
  renderQuizStart();
  if (playingEl) playingEl.style.display = 'none';
  if (resultEl) resultEl.style.display = 'none';
}

function renderQuestion() {
  const q = quizState.questions[quizState.current];
  const total = quizState.questions.length;

  document.getElementById('quizCurrent').textContent = quizState.current + 1;
  document.getElementById('quizBar').innerHTML = `<div class="quiz-bar-fill" style="width: ${(quizState.current / total) * 100}%"></div>`;
  document.getElementById('quizQuestion').textContent = q.q;

  const optionsEl = document.getElementById('quizOptions');
  optionsEl.innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
  ).join('');

  document.getElementById('quizFeedback').classList.remove('show');
  quizState.answered = false;

  optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
  });
}

function handleAnswer(choiceIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const isCorrect = choiceIdx === q.answer;

  if (isCorrect) quizState.score++;

  // 标记选项
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === choiceIdx) btn.classList.add('wrong');
  });

  // 反馈
  const feedback = document.getElementById('quizFeedback');
  feedback.innerHTML = `<b>${isCorrect ? '✅ 答对了！' : '❌ 答错了'}</b> ${q.explain}`;
  feedback.classList.add('show');

  // 2 秒后下一题
  setTimeout(() => {
    quizState.current++;
    if (quizState.current >= quizState.questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }, 2500);
}

function showResult() {
  document.getElementById('quizPlaying').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';

  const score = quizState.score;
  const total = quizState.questions.length;
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');

  resultText.textContent = `你答对了 ${score}/${total} 题`;

  if (score === 5) {
    resultIcon.textContent = '🏆';
    resultTitle.textContent = '完美！历史小博士！';
  } else if (score >= 4) {
    resultIcon.textContent = '🌟';
    resultTitle.textContent = '太棒了！';
  } else if (score >= 3) {
    resultIcon.textContent = '👍';
    resultTitle.textContent = '不错哦！';
  } else if (score >= 1) {
    resultIcon.textContent = '💪';
    resultTitle.textContent = '再接再厉！';
  } else {
    resultIcon.textContent = '📚';
    resultTitle.textContent = '继续努力！';
  }
}
