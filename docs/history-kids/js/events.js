// ============ 重大事件卡片 ============

function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const events = HISTORY_DATA.events;

  grid.innerHTML = events.map(ev => `
    <div class="event-card" data-event-year="${ev.year}">
      <div class="event-icon">${ev.icon}</div>
      <div class="event-body">
        <div class="event-year">${formatYear(ev.year)}</div>
        <div class="event-title">${ev.title}</div>
        <div class="event-summary">${ev.summary}</div>
      </div>
    </div>
  `).join('');

  // 更新区块副标题数量
  const sub = document.querySelector('#events .module-head p');
  if (sub) sub.textContent = `${events.length} 个关键时刻，点开看细节`;

  // 点击事件 -> 弹层
  grid.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const year = parseInt(card.dataset.eventYear);
      const ev = HISTORY_DATA.events.find(e => e.year === year);
      if (!ev) return;
      const era = HISTORY_DATA.eras.find(e => e.id === ev.eraId);

      const content = document.getElementById('modalContent');
      content.innerHTML = `
        <button class="modal-close" onclick="closeEraModal()">✕</button>
        <div class="modal-header" style="background: ${era?.color || '#888'}">
          <div class="modal-icon">${ev.icon}</div>
          <div class="modal-title">${ev.title}</div>
          <div class="modal-tagline">${formatYear(ev.year)}${era ? ' · ' + era.name : ''}</div>
        </div>
        <div class="modal-body">
          <p class="modal-summary">${ev.summary}</p>
        </div>
      `;

      document.getElementById('eraModal').classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
}

// 兼容旧调用名（初次渲染）
function initEvents() { renderEvents(); }
