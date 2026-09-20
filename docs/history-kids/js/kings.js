// ============ 皇帝/人物卡片 ============

let _currentKingFilter = 'all';

function initKings() {
  rebuildKingFilters();
  renderKings();
}

// 根据当前地区数据动态（重建）筛选按钮（"全部" + 有对应人物的朝代）
// 每次切换地区都会重建，保证世界史等地区显示自己的朝代筛选
function rebuildKingFilters() {
  const container = document.getElementById('kingFilters');
  if (!container) return;
  _currentKingFilter = 'all';

  const eras = HISTORY_DATA.eras || [];
  const ids = new Set((HISTORY_DATA.kings || []).map(k => k.eraId));
  const buttons = ['<button class="kf-btn active" data-era="all">全部</button>'];
  eras.forEach(era => {
    if (ids.has(era.id)) {
      buttons.push(`<button class="kf-btn" data-era="${era.id}">${era.dynasty || era.name}</button>`);
    }
  });
  container.innerHTML = buttons.join('');

  container.querySelectorAll('.kf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.kf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _currentKingFilter = btn.dataset.era;
      renderKings();
    });
  });
}

// 切换地区时重置为"全部"并重建筛选按钮
function resetKingsFilter() {
  rebuildKingFilters();
}

function renderKings() {
  const grid = document.getElementById('kingGrid');
  const kings = _currentKingFilter === 'all'
    ? HISTORY_DATA.kings
    : HISTORY_DATA.kings.filter(k => k.eraId === _currentKingFilter);

  // 地区切换后，若某个朝代筛选按钮不再存在，回退到"全部"
  if (_currentKingFilter !== 'all' && kings.length === 0) {
    _currentKingFilter = 'all';
    const filtersEl = document.getElementById('kingFilters');
    if (filtersEl) filtersEl.querySelectorAll('.kf-btn').forEach(b => b.classList.toggle('active', b.dataset.era === 'all'));
  }

  grid.innerHTML = kings.map(king => {
    const era = HISTORY_DATA.eras.find(e => e.id === king.eraId);
    return `
      <div class="king-card" data-king-id="${king.id}">
        <div class="king-icon">${king.icon}</div>
        <div class="king-name">${king.name}</div>
        <div class="king-role">${king.role}</div>
        <div class="king-era-tag" style="background: ${era?.color || '#ccc'}22; color: ${era?.color || '#666'}">${era?.name || '?'}</div>
      </div>
    `;
  }).join('');

  // 更新区块副标题数量
  const sub = document.querySelector('#kings .module-head p');
  if (sub) sub.textContent = `${HISTORY_DATA.kings.length} 位影响历史的大人物，点开看他们的故事`;

  // 绑定
  grid.querySelectorAll('.king-card').forEach(card => {
    card.addEventListener('click', () => {
      showKingModal(card.dataset.kingId);
    });
  });
}

function showKingModal(kingId) {
  const king = HISTORY_DATA.kings.find(k => k.id === kingId);
  if (!king) return;
  const era = HISTORY_DATA.eras.find(e => e.id === king.eraId);

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <button class="modal-close" onclick="closeEraModal()">✕</button>
    <div class="modal-header" style="background: ${era?.color || '#888'}">
      <div class="modal-icon">${king.icon}</div>
      <div class="modal-title">${king.name}</div>
      <div class="modal-tagline">${king.role}</div>
    </div>
    <div class="modal-body">
      <div class="modal-stats">
        ${king.birth ? `<div class="modal-stat"><div class="modal-stat-label">生</div><div class="modal-stat-value">${formatYear(king.birth)}</div></div>` : ''}
        ${king.death ? `<div class="modal-stat"><div class="modal-stat-label">卒</div><div class="modal-stat-value">${formatYear(king.death)}</div></div>` : ''}
        ${king.temple && king.temple !== '—' ? `<div class="modal-stat"><div class="modal-stat-label">庙号</div><div class="modal-stat-value">${king.temple}</div></div>` : ''}
        <div class="modal-stat">
          <div class="modal-stat-label">所在朝代</div>
          <div class="modal-stat-value">${era?.name || '?'}</div>
        </div>
      </div>

      <p class="modal-summary">${king.summary}</p>

      <div class="modal-kids">
        <div class="modal-kids-label">🤓 有趣小知识</div>
        <div class="modal-kids-text">${king.kidsFact}</div>
      </div>
    </div>
  `;

  document.getElementById('eraModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}
