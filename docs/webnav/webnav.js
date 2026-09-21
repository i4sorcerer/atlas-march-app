/* ============ 网址导航（独立页面，可嵌入门户 iframe） ============
 * 读取 window.WEB_DIRECTORY，提供：搜索框 + 分类星球筛选 + 分组站点卡片
 * 支持 URL ?cat=<id> 预筛选（门户栏目深链用）；站点外链新标签页打开
 * ================================================================ */
(function () {
  const DIR = window.WEB_DIRECTORY || [];
  const searchInput = document.getElementById("wnSearch");
  const filterBar = document.getElementById("wnFilter");
  const results = document.getElementById("wnResults");
  const titleEl = document.getElementById("wnTitle");
  const subEl = document.getElementById("wnSub");

  // 初始分类：来自 URL ?cat=，非法值回退“全部”
  const params = new URLSearchParams(location.search);
  let activeCat = params.get("cat") || "all";
  if (activeCat !== "all" && !DIR.some((c) => c.id === activeCat)) activeCat = "all";

  function siteCard(s) {
    return `
      <a class="card site-card" href="${s.url}" target="_blank" rel="noopener">
        <span class="card-emoji">${s.emoji || "🔗"}</span>
        <div class="card-title">${s.name}</div>
        <div class="card-desc">${s.desc || ""}</div>
        <span class="site-go">↗ 访问</span>
      </a>`;
  }

  function renderFilter() {
    const orbs = [{ id: "all", name: "全部", emoji: "🌐", color: "var(--blue)" }].concat(
      DIR.map((c) => ({ id: c.id, name: c.name, emoji: c.emoji, color: c.color }))
    );
    filterBar.innerHTML = orbs
      .map(
        (o) =>
          `<button class="dir-orb ${activeCat === o.id ? "active" : ""}" data-cat="${o.id}" style="--accent:${o.color}">
            <span class="orb-emoji">${o.emoji}</span><span class="orb-name">${o.name}</span>
          </button>`
      )
      .join("");
  }

  function render(text) {
    text = (text || "").toLowerCase();
    const matchCat = (c) => activeCat === "all" || c.id === activeCat;
    const matchText = (c, s) =>
      !text ||
      c.name.toLowerCase().includes(text) ||
      s.name.toLowerCase().includes(text) ||
      (s.desc || "").toLowerCase().includes(text);

    const html = DIR.filter(matchCat)
      .map((c) => {
        const sites = c.sites.filter((s) => matchText(c, s));
        if (!sites.length) return "";
        return `
          <div class="dir-cat" style="--accent:${c.color}">
            <div class="dir-cat-head">
              <span class="dot"></span>
              <h2>${c.emoji} ${c.name}</h2>
              <span class="count">${sites.length} 个</span>
            </div>
            <div class="grid">${sites.map(siteCard).join("")}</div>
          </div>`;
      })
      .join("");

    results.innerHTML = html || '<p class="empty-tip">没找到匹配的网站 🔍 换个关键词试试？</p>';

    if (activeCat === "all") {
      titleEl.textContent = "🌐 网址导航 · 好玩网站一览";
      subEl.textContent = "挑一个分类星球，或搜一搜，发现更多好玩又安全的网站吧！";
    } else {
      const c = DIR.find((x) => x.id === activeCat);
      titleEl.textContent = `${c.emoji} ${c.name}`;
      subEl.textContent = `「${c.name}」分类下的网站，点开看看吧！`;
    }
  }

  searchInput.addEventListener("input", () => render(searchInput.value.trim()));
  filterBar.addEventListener("click", (e) => {
    const b = e.target.closest(".dir-orb");
    if (!b) return;
    const v = b.dataset.cat;
    activeCat = v === activeCat && v !== "all" ? "all" : v; // 再点一次当前分类则取消
    renderFilter();
    render(searchInput.value.trim());
  });

  renderFilter();
  render("");
})();
