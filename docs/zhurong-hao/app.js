/* =========================================================
 * 祝融号小火星车 · 交互逻辑
 * 纯 Vanilla JS，无外部依赖。所有内容都是数据驱动的，
 * 方便后续扩展（新增时间线、零件、题目只需改下面的数组）。
 * ========================================================= */

/* ---------- 1. 星空背景（Canvas） ---------- */
(function starfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }
  function initStars() {
    const count = Math.floor((canvas.width * canvas.height) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.5 ? '#FFD166' : '#E8F1FF'
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.speed;
      const alpha = 0.4 + Math.abs(Math.sin(s.a)) * 0.6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ---------- 2. Hero 出发按钮 ---------- */
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('who').scrollIntoView({ behavior: 'smooth' });
  celebrateBurst(window.innerWidth / 2, window.innerHeight / 2);
});

/* ---------- 3. 卡片滚动出现（IntersectionObserver） ---------- */
(function revealCards() {
  const cards = document.querySelectorAll('.card.pop');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('show'), d * 150);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => io.observe(c));
})();

/* ---------- 4. 时间线数据 + 渲染 ---------- */
const MILESTONES = [
  { year: '2020', emoji: '🚀', title: '出发啦', desc: '<b>2020年7月23日</b>，祝融号坐著天问一号火箭，从地球上飞起来啦！它要飞好远好远去火星。' },
  { year: '2021.2', emoji: '🪐', title: '到达火星', desc: '飞了<b>差不多7个月</b>，天问一号到了火星旁边，开始绕着火星转圈圈，找好地方降落。' },
  { year: '2021.5', emoji: '🛬', title: '着陆！', desc: '<b>2021年5月15日</b>，祝融号慢慢落到了火星的乌托邦平原，稳稳地停在红红的地上！' },
  { year: '2021.5', emoji: '🚙', title: '开起来', desc: '几天后，祝融号从着陆平台开下来，在火星上留下<b>第一道中国车辙</b>，开始探险！' },
  { year: '100天', emoji: '🔬', title: '努力工作', desc: '它用身上的小眼睛看石头、挖土土，还拍了好多<b>火星照片</b>寄回地球给小朋友看。' },
  { year: '冬眠', emoji: '😴', title: '睡一觉', desc: '火星冬天又冷又黑，太阳也少。祝融号就<b>乖乖睡一觉</b>，等天暖和了再醒来继续玩。' }
];

(function renderTimeline() {
  const wrap = document.getElementById('timeline');
  const detail = document.getElementById('timelineDetail');
  MILESTONES.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'milestone';
    el.innerHTML = `<span class="m-emoji">${m.emoji}</span><span class="m-year">${m.year}</span>`;
    el.addEventListener('click', () => {
      document.querySelectorAll('.milestone').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      detail.innerHTML = `<span class="m-emoji" style="font-size:50px">${m.emoji}</span><p style="margin-top:10px">${m.desc}</p>`;
      celebrateBurst(el.getBoundingClientRect().left + 60, el.getBoundingClientRect().top);
    });
    wrap.appendChild(el);
  });
})();

/* ---------- 5. 拆解图（爆炸视图） ---------- */
const PARTS = [
  { id: 'solar', emoji: '🦋', label: '太阳翅膀', x: 50, y: 18, ex: 18, ey: 12,
    info: '<b>太阳翅膀（太阳能板）</b>：像蝴蝶翅膀一样！它晒太阳就能充电，是小车的"饭饭"。' },
  { id: 'antenna', emoji: '📡', label: '小天线', x: 50, y: 8, ex: 50, ey: 2,
    info: '<b>天线</b>：像打电话一样，把火星看到的东西"嗖"地传给地球的爸爸妈妈。' },
  { id: 'camera', emoji: '👀', label: '大眼睛', x: 50, y: 40, ex: 82, ey: 30,
    info: '<b>导航相机</b>：祝融号的"大眼睛"，帮它看路、看石头，不会撞到东西。' },
  { id: 'body', emoji: '📦', label: '身体', x: 50, y: 50, ex: 50, ey: 50,
    info: '<b>车身</b>：圆圆方方的小肚子，里面装着电脑和电池，是它聪明的小脑袋。' },
  { id: 'wheels', emoji: '🛞', label: '轮子', x: 50, y: 72, ex: 50, ey: 86,
    info: '<b>四个轮子</b>：可以前后左右转，还能原地打转，在火星沙子上也不怕！' },
  { id: 'arm', emoji: '⚙️', label: '探测手', x: 50, y: 60, ex: 14, ey: 64,
    info: '<b>机械手臂</b>：伸出小手摸一摸石头、看看里面是什么做的，像小科学家！' }
];

(function renderRover() {
  const stage = document.getElementById('roverStage');
  const info = document.getElementById('partInfo');
  PARTS.forEach(p => {
    const el = document.createElement('div');
    el.className = 'part assembled';
    el.dataset.id = p.id;
    el.style.left = p.x + '%';
    el.style.top = p.y + '%';
    el.style.transform = 'translate(-50%, -50%)';
    el.innerHTML = `${p.emoji}<span class="part-label">${p.label}</span>`;
    el.addEventListener('click', () => {
      info.innerHTML = p.info;
      celebrateBurst(stage.getBoundingClientRect().left + 160, stage.getBoundingClientRect().top + 160);
    });
    stage.appendChild(el);
  });

  const explodeBtn = document.getElementById('explodeBtn');
  const assembleBtn = document.getElementById('assembleBtn');

  function setMode(exploded) {
    document.querySelectorAll('.part').forEach((el, i) => {
      const p = PARTS[i];
      el.classList.toggle('exploded', exploded);
      el.classList.toggle('assembled', !exploded);
      el.style.left = (exploded ? p.ex : p.x) + '%';
      el.style.top = (exploded ? p.ey : p.y) + '%';
    });
  }
  explodeBtn.addEventListener('click', () => setMode(true));
  assembleBtn.addEventListener('click', () => setMode(false));
})();

/* ---------- 6. 驾驶模拟 ---------- */
(function driveSim() {
  const player = document.getElementById('roverPlayer');
  const flag = document.getElementById('driveFlag');
  const stepCount = document.getElementById('stepCount');
  const findCount = document.getElementById('findCount');
  let pos = 20;          // 百分比位置
  let steps = 0, finds = 0;
  const secrets = ['🌟 发现亮亮的小石头！', '🔥 看到红红的火星土！', '👽 好像有奇怪脚印？（是风吹的啦）', '💎 找到闪亮亮的水冰！'];

  function move(delta) {
    pos = Math.max(5, Math.min(92, pos + delta));
    player.style.left = pos + '%';
    steps++;
    stepCount.textContent = steps;
  }
  document.getElementById('leftBtn').addEventListener('click', () => move(-8));
  document.getElementById('rightBtn').addEventListener('click', () => move(8));
  document.getElementById('digBtn').addEventListener('click', () => {
    finds++;
    findCount.textContent = finds;
    const msg = secrets[Math.floor(Math.random() * secrets.length)];
    const meter = document.querySelector('.drive-meter');
    meter.innerHTML = `<span>${msg} <b>(${finds}个秘密)</b></span>`;
    celebrateBurst(player.getBoundingClientRect().left, player.getBoundingClientRect().top - 20);
  });
})();

/* ---------- 7. 小问答 ---------- */
const QUIZ = [
  { q: '祝融号是去哪个星球的小车车？', opts: ['月亮', '火星', '太阳'], ans: 1 },
  { q: '祝融号靠什么"吃饭"充电？', opts: ['吃饼干', '晒太阳', '喝果汁'], ans: 1 },
  { q: '祝融号是从哪个国家出发的？', opts: ['中国', '美国', '小猫国'], ans: 0 },
  { q: '火星看起来是什么颜色的？', opts: ['蓝蓝的', '绿绿的', '红红的'], ans: 2 }
];

(function renderQuiz() {
  const wrap = document.getElementById('quiz');
  const result = document.getElementById('quizResult');
  let correctTotal = 0;

  QUIZ.forEach((item, qi) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `<div class="quiz-q">${qi + 1}. ${item.q}</div>`;
    const opts = document.createElement('div');
    opts.className = 'quiz-opts';
    item.opts.forEach((opt, oi) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.textContent = opt;
      b.addEventListener('click', () => {
        if (b.disabled) return;
        opts.querySelectorAll('button').forEach(x => x.disabled = true);
        if (oi === item.ans) {
          b.classList.add('correct');
          correctTotal++;
          celebrateBurst(b.getBoundingClientRect().left + 40, b.getBoundingClientRect().top);
        } else {
          b.classList.add('wrong');
          opts.children[item.ans].classList.add('correct');
        }
        if (qi === QUIZ.length - 1) {
          setTimeout(() => {
            const pct = Math.round(correctTotal / QUIZ.length * 100);
            result.innerHTML = `🎉 你答对了 ${correctTotal} / ${QUIZ.length} 题！${pct === 100 ? '你是火星小博士！' : '真棒，再玩一次吧！'}`;
          }, 400);
        }
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);
    wrap.appendChild(card);
  });
})();

/* ---------- 工具：庆祝星星爆发 ---------- */
function celebrateBurst(x, y) {
  const emojis = ['⭐', '🌟', '✨', '💫', '🔥'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('div');
    s.className = 'celebrate';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = (x + (Math.random() * 80 - 40)) + 'px';
    s.style.top = (y + (Math.random() * 40 - 20)) + 'px';
    s.style.animationDelay = (Math.random() * 0.2) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}
