// ============ 朝代卡片 + 详情弹层 ============

function renderEras() {
  const grid = document.getElementById('eraGrid');
  const eras = HISTORY_DATA.eras;

  grid.innerHTML = eras.map(era => {
    const duration = era.end - era.start;
    return `
      <div class="era-card" data-era-id="${era.id}" style="--era-color: ${era.color}">
        <div class="era-duration-badge">${duration} 年</div>
        <div class="era-icon">${era.icon}</div>
        <div class="era-name">${era.name}</div>
        <div class="era-tagline">${era.tagline}</div>
        <div class="era-meta">
          <div class="era-meta-item">📅 <b>${formatYear(era.start)} ~ ${formatYear(era.end)}</b></div>
          <div class="era-meta-item">🏛️ 都城: ${era.capital}</div>
          <div class="era-meta-item">👑 开国: ${era.founder}</div>
        </div>
        <div class="era-summary">${era.summary}</div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.era-card').forEach(card => {
    card.addEventListener('click', () => {
      showEraModal(card.dataset.eraId);
    });
  });
}

// 兼容旧调用名（初次渲染）
function initEras() { renderEras(); }

function formatYear(year) {
  if (year < 0) return '公元前 ' + Math.abs(year);
  return '公元 ' + year;
}

function showEraModal(eraId) {
  const era = HISTORY_DATA.eras.find(e => e.id === eraId);
  if (!era) return;

  const modal = document.getElementById('eraModal');
  const content = document.getElementById('modalContent');

  const duration = era.end - era.start;
  const kings = HISTORY_DATA.kings.filter(k => k.eraId === eraId);
  const events = HISTORY_DATA.events.filter(e => e.eraId === eraId);

  content.innerHTML = `
    <button class="modal-close" onclick="closeEraModal()">✕</button>
    <div class="modal-header" style="background: ${era.color}">
      <div class="modal-icon">${era.icon}</div>
      <div class="modal-title">${era.name}</div>
      <div class="modal-tagline">${era.tagline}</div>
    </div>
    <div class="modal-body">
      <div class="modal-stats">
        <div class="modal-stat">
          <div class="modal-stat-label">持续时间</div>
          <div class="modal-stat-value">${duration} 年</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-label">都城</div>
          <div class="modal-stat-value">${era.capital}</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-label">开国</div>
          <div class="modal-stat-value">${era.founder}</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-label">年代</div>
          <div class="modal-stat-value">${formatYear(era.start)}</div>
        </div>
      </div>

      <p class="modal-summary">${era.summary}</p>

      <div class="modal-highlights">
        <h4>🌟 大事件</h4>
        <ul>
          ${era.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      ${kings.length > 0 ? `
        <div class="modal-highlights">
          <h4>👑 著名人物</h4>
          <ul>
            ${kings.map(k => `<li><b>${k.icon} ${k.name}</b> · ${k.role} — ${k.summary}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${events.length > 0 ? `
        <div class="modal-highlights">
          <h4>📅 这个朝代发生的大事</h4>
          <ul>
            ${events.map(e => `<li>${e.icon} <b>${formatYear(e.year)}</b> · ${e.title} — ${e.summary}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="modal-kids">
        <div class="modal-kids-label">🤓 小朋友会喜欢</div>
        <div class="modal-kids-text">${era.kidsFact}</div>
      </div>
    </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeEraModal() {
  const modal = document.getElementById('eraModal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// 点击外部关闭
document.addEventListener('click', (e) => {
  const modal = document.getElementById('eraModal');
  if (e.target === modal) closeEraModal();
});
// ESC 关闭
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeEraModal();
});
