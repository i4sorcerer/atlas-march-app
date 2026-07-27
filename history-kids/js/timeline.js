// ============ 主时间线 (SVG) ============

function initTimeline() {
  const wrap = document.getElementById('timelineWrap');
  const zoomBtns = document.querySelectorAll('.tl-btn');

  let currentZoom = 'all';

  // 估算文字宽度（中文按 1 个字宽，ASCII 按 0.55）
  function estTextWidth(str, fs) {
    let w = 0;
    for (const ch of String(str)) {
      w += /[\x00-\xff]/.test(ch) ? fs * 0.58 : fs * 1.0;
    }
    return w;
  }

  function fmtYear(y) {
    return y < 0 ? '前' + Math.abs(y) : String(y);
  }

  // 暴露给 loader 的全局重绘函数
  window.renderTimeline = function () {
    const eras = (HISTORY_DATA.eras || []);
    const W = 1400;
    const PADDING = { top: 56, right: 90, bottom: 56, left: 80 };
    const innerW = W - PADDING.left - PADDING.right;

    // 时间范围：随当前地区数据动态调整（兼容早于 -2150 的世界古文明）
    const eraStarts = eras.map(e => e.start).filter(n => typeof n === 'number');
    const minYear = eraStarts.length ? Math.min(-2150, Math.min.apply(null, eraStarts)) : -2150;
    const maxYear = 2025;

    // 缩放视窗
    let viewStart = minYear;
    let viewEnd = maxYear;
    if (currentZoom === 'ancient') { viewStart = Math.min(-2200, minYear); viewEnd = 600; }
    if (currentZoom === 'medieval') { viewStart = 500; viewEnd = 1500; }
    if (currentZoom === 'modern') { viewStart = 1300; viewEnd = 2025; }
    if (currentZoom === 'today') { viewStart = 1900; viewEnd = 2025; }
    const viewRange = viewEnd - viewStart;
    const scale = innerW / viewRange;

    function x(year) {
      return PADDING.left + (year - viewStart) * scale;
    }

    // ---- 泳道排布（lane packing）：并存朝代自动排到不同行，彻底避免重叠 ----
    const barH = 30;          // 色块高度
    const lanePitch = 48;     // 每条泳道的垂直间距（>barH，留足间隙放上方标签）
    const MIN_GAP = 8;        // 同一泳道内两个色块之间的最小水平间隙
    const MIN_W = 14;         // 最小可见/可点击宽度（窄块会被撑宽）
    const axisY = PADDING.top; // 时间轴（事件标记）所在高度
    const lanesTop = axisY + 34;

    const visible = [];
    eras.forEach((era, idx) => {
      const startX = x(Math.max(era.start, viewStart));
      const endX = x(Math.min(era.end, viewEnd));
      if (endX < PADDING.left || startX > PADDING.left + innerW) return;
      // 记录「绘制后的真实右端」——泳道边界必须用这个值，否则被 MIN_W 撑宽的块会压到邻居
      const w = Math.max(endX - startX, MIN_W);
      visible.push({ era, startX, endX, w, drawnEnd: startX + w, idx });
    });
    // 按起点排序后贪心分配泳道
    visible.sort((a, b) => a.startX - b.startX || a.drawnEnd - b.drawnEnd);
    const laneEnds = [];
    visible.forEach(it => {
      let lane = 0;
      while (lane < laneEnds.length && it.startX < laneEnds[lane] + MIN_GAP) lane++;
      it.lane = lane;
      it.y = lanesTop + lane * lanePitch;
      laneEnds[lane] = it.drawnEnd;   // 关键：用绘制后的右端，含 MIN_W 撑宽
    });
    const laneCount = Math.max(laneEnds.length, 1);

    const H = lanesTop + laneCount * lanePitch + 30;

    // 时间轴刻度
    let ticks = [];
    if (currentZoom === 'all' || currentZoom === 'ancient') {
      ticks = [-2000, -1500, -1000, -500, 0, 500, 1000, 1500, 2000];
    } else if (currentZoom === 'medieval') {
      ticks = [500, 700, 900, 1100, 1300, 1500];
    } else if (currentZoom === 'modern') {
      ticks = [1300, 1500, 1700, 1900, 2020];
    } else {
      ticks = [1900, 1950, 2000, 2020];
    }
    ticks = ticks.filter(t => t >= viewStart && t <= viewEnd);

    let svg = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">`;

    // 背景竖向网格 + 年份刻度
    ticks.forEach(t => {
      const tx = x(t);
      svg += `<line x1="${tx}" y1="${axisY - 14}" x2="${tx}" y2="${H - 26}" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>`;
      svg += `<text class="tl-year-label" x="${tx}" y="${H - 10}">${fmtYear(t)}年</text>`;
    });

    // 主时间轴线
    svg += `<line x1="${PADDING.left}" y1="${axisY}" x2="${PADDING.left + innerW}" y2="${axisY}" stroke="#2C3E50" stroke-width="2.5" stroke-dasharray="2,5" opacity="0.55"/>`;

    // 朝代条
    visible.forEach(p => {
      const { era, startX, w, y } = p;
      const fs = 13;
      const dur = era.end - era.start;
      const needW = estTextWidth(era.name, fs);
      const insideFits = w >= needW + 12;

      svg += `<g class="tl-bar" data-era-id="${era.id}" tabindex="0" role="button" aria-label="${era.name}">`;
      // 主体矩形
      svg += `<rect class="tl-rect" x="${startX}" y="${y}" width="${w}" height="${barH}" rx="7" fill="${era.color}" stroke="#fff" stroke-width="2"/>`;
      svg += `<title>${era.name}（${fmtYear(era.start)}~${fmtYear(era.end)}年）</title>`;

      if (insideFits) {
        // 文字放得下：白字居中
        const cx = startX + w / 2;
        const cy = y + barH / 2 + fs / 2 - 2;
        svg += `<text class="tl-label tl-in" x="${cx}" y="${cy}" style="font-size:${fs}px">${era.name}</text>`;
      } else {
        // 放不下：标签移到色块正上方（落在上方泳道的间隙里，不会压到邻居块）
        // 白色描边光晕保证在任意底色上都清晰可读
        const lx = startX + w / 2;
        const ly = y - 5;
        svg += `<text class="tl-label tl-out" x="${lx}" y="${ly}" style="font-size:11px; fill:${era.color}">${era.name}</text>`;
      }
      // 时长（仅够宽时在色块下方显示，落在泳道间隙里）
      if (w > 90) {
        svg += `<text class="tl-dur" x="${startX + w / 2}" y="${y + barH + 14}">${dur}年</text>`;
      }
      svg += `</g>`;
    });

    // 关键事件标记：仅中国视图显示（避免世界史时间轴出现"秦统一"等无关标记）
    if (typeof STATE === 'undefined' || STATE.region === 'china') {
      const eventMarkers = [
        { year: -1046, label: '武王伐纣', color: '#795548' },
        { year: -221, label: '秦统一', color: '#F39C12' },
        { year: -202, label: '汉朝建立', color: '#E91E63' },
        { year: 618, label: '唐朝建立', color: '#E6A700' },
        { year: 960, label: '宋朝建立', color: '#0097A7' },
        { year: 1368, label: '明朝建立', color: '#E65100' },
        { year: 1949, label: '新中国', color: '#D32F2F' }
      ];
      eventMarkers.forEach(ev => {
        if (ev.year < viewStart || ev.year > viewEnd) return;
        const ex = x(ev.year);
        svg += `<g class="tl-event">`;
        svg += `<circle cx="${ex}" cy="${axisY}" r="6" fill="${ev.color}" stroke="#fff" stroke-width="2"/>`;
        svg += `<text x="${ex}" y="${axisY - 12}" text-anchor="middle" font-size="11" font-weight="700" fill="${ev.color}">${ev.label}</text>`;
        svg += `</g>`;
      });
    }

    svg += `</svg>`;

    // 悬停信息卡：挂到 body（fixed 定位，脱离 .timeline-wrap 的 overflow 裁切，确保不被截断）
    wrap.innerHTML = svg;
    let tooltip = document.getElementById('tlTooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'tl-tooltip';
      tooltip.id = 'tlTooltip';
      tooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(tooltip);
    }
    tooltip.classList.remove('show');

    // ---- 交互绑定：点击开弹层 + 悬停/聚焦显示 tooltip ----
    const eraById = {};
    eras.forEach(e => { eraById[e.id] = e; });

    function showTip(era, clientX, clientY) {
      if (!era) return;
      const dur = era.end - era.start;
      tooltip.innerHTML =
        `<div class="tl-tt-name" style="color:${era.color}">${era.icon || ''} ${era.name}</div>` +
        `<div class="tl-tt-years">${fmtYear(era.start)} ~ ${fmtYear(era.end)}年 · 约 ${dur} 年</div>` +
        (era.capital ? `<div class="tl-tt-row">🏛️ 都城：${era.capital}</div>` : '') +
        (era.founder && era.founder !== '—' ? `<div class="tl-tt-row">👑 开国：${era.founder}</div>` : '') +
        (era.tagline ? `<div class="tl-tt-tag">${era.tagline}</div>` : '') +
        `<div class="tl-tt-hint">点击查看详情 →</div>`;
      tooltip.classList.add('show');
      moveTip(clientX, clientY);
    }
    function moveTip(clientX, clientY) {
      const tw = tooltip.offsetWidth || 200;
      const th = tooltip.offsetHeight || 90;
      // fixed 定位 → 直接用视口坐标，不受容器 overflow 影响
      let lx = clientX + 16;
      let ty = clientY - th - 12;
      const maxX = window.innerWidth - tw - 8;
      if (lx > maxX) lx = clientX - tw - 16;   // 右侧放不下翻到左侧
      if (lx < 8) lx = 8;
      if (ty < 8) ty = clientY + 18;            // 顶部放不下翻到下方
      tooltip.style.left = lx + 'px';
      tooltip.style.top = ty + 'px';
    }
    function hideTip() { tooltip.classList.remove('show'); }

    wrap.querySelectorAll('.tl-bar').forEach(bar => {
      const era = eraById[bar.dataset.eraId];
      bar.addEventListener('mouseenter', e => showTip(era, e.clientX, e.clientY));
      bar.addEventListener('mousemove', e => moveTip(e.clientX, e.clientY));
      bar.addEventListener('mouseleave', hideTip);
      bar.addEventListener('click', () => showEraModal(bar.dataset.eraId));
      // 键盘可达性
      bar.addEventListener('focus', () => {
        const rect = bar.getBoundingClientRect();
        showTip(era, rect.left + rect.width / 2, rect.top);
      });
      bar.addEventListener('blur', hideTip);
      bar.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showEraModal(bar.dataset.eraId); }
      });
    });
  };

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentZoom = btn.dataset.zoom;
      window.renderTimeline();
    });
  });

  window.renderTimeline();
}
