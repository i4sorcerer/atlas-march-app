// ============ 主入口 ============

document.addEventListener('DOMContentLoaded', async () => {
  // 先加载数据层（fetch data/*.json，内置数据作兜底），再渲染各模块
  if (typeof initDataLoader === 'function') {
    await initDataLoader();
  }
  initHero();
  initTimeline();
  initEras();
  initKings();
  initEvents();
  initQuiz();
  console.log('🐉 中华历史朝代 互动百科已加载');
});
