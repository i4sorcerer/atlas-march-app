// ============ Hero 数字滚动 + 区域切换 ============

function initHero() {
  const statNums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          entry.target.textContent = current.toLocaleString();
        }, 30);
      }
    });
  }, { threshold: 0.3 });

  statNums.forEach(num => observer.observe(num));

  // 区域切换：调用 loader 的真正切换逻辑
  const regionBtns = document.querySelectorAll('.region-btn');
  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // setRegion 会按需加载 data/<region>.json，没有就显示占位提示
      if (typeof setRegion === 'function') setRegion(btn.dataset.region);
    });
  });
}
