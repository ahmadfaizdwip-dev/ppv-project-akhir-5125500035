function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function renderRingkasan({ total, selesai }) {
  const taskCount = document.getElementById('taskCount');
  const dashboardStatus = document.getElementById('dashboardStatus');
  const teksStatusTugas = document.getElementById('teksStatusTugas');

  if (taskCount) taskCount.textContent = total;
  if (dashboardStatus) {
    dashboardStatus.textContent =
      total === 0
        ? 'Belum ada tugas ditambahkan.'
        : `${selesai} dari ${total} tugas telah selesai dikerjakan.`;
  }
  if (teksStatusTugas) {
    teksStatusTugas.textContent = `${selesai} dari ${total} tugas telah selesai dikerjakan.`;
  }
}

export function renderKelolaTugas(tasks) {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <div id="emptyState" class="text-center py-5">
        <div class="fs-1 mb-2">📋</div>
        <h3 class="h5 fw-bold">Belum ada tugas</h3>
        <p class="text-secondary small">Tambahkan tugas kuliah pertama kamu agar lebih mudah mengatur deadline.</p>
      </div>
    `;
    return;
  }

  taskList.innerHTML = tasks
    .map((task) => {
      let badgeColor = 'bg-secondary';
      if (task.priority === 'Tinggi') badgeColor = 'bg-danger';
      else if (task.priority === 'Sedang') badgeColor = 'bg-warning text-dark';
      else if (task.priority === 'Rendah') badgeColor = 'bg-info text-dark';

      return `
        <div class="card task-item border mb-2 p-3 shadow-sm ${task.completed ? 'bg-light' : ''}">
          <div class="d-flex justify-content-between align-items-center task-item-content">
            <div>
              <h5 class="h6 fw-bold mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}">
                ${escapeHTML(task.name)}
              </h5>
              <p class="small text-secondary mb-1">📚 ${escapeHTML(task.course)}</p>
              <div class="d-flex align-items-center gap-2">
                <small class="text-muted">📅 ${formatDate(task.deadline)}</small>
                <span class="badge ${badgeColor}">${task.priority}</span>
              </div>
            </div>
            <div class="d-flex gap-2 task-item-actions">
              <button type="button" class="btn btn-sm ${task.completed ? 'btn-outline-warning' : 'btn-outline-success'} action-btn complete-btn" data-id="${task.id}">
                ${task.completed ? 'Batal' : 'Selesai'}
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger action-btn delete-btn" data-id="${task.id}">
                Hapus
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

export function renderDashboardTugas(tugasTersaring) {
  const container = document.getElementById('containerDaftarTugas');
  if (!container) return;

  if (tugasTersaring.length === 0) {
    container.innerHTML = `<p class="text-muted text-center py-3">Tidak ada tugas dalam kategori ini.</p>`;
    return;
  }

  container.innerHTML = tugasTersaring
    .map(
      (t) => `
      <div class="card shadow-sm mb-3 overflow-hidden ${t.completed ? 'bg-light border-success' : ''}">
        <div class="card-body d-flex align-items-center justify-content-between gap-3">
          <div class="form-check d-flex align-items-center gap-2 m-0">
            <input class="form-check-input me-2 dashboard-toggle-check" type="checkbox" ${t.completed ? 'checked' : ''} 
              data-id="${t.id}" id="dash-task-${t.id}" style="cursor: pointer; width: 20px; height: 20px;">
            
            <label class="form-check-label w-100 min-w-0" for="dash-task-${t.id}" style="cursor: pointer;">
              <h6 class="fw-bold mb-1 text-break ${t.completed ? 'text-decoration-line-through text-muted' : ''}">
                ${escapeHTML(t.name)}
              </h6>
              <p class="text-secondary small mb-1 text-break">${escapeHTML(t.course)}</p>
              <div class="d-flex align-items-center gap-2">
                <small class="text-muted">🗓️ ${formatDate(t.deadline)}</small>
                <span class="badge ${t.completed ? 'bg-success' : 'bg-warning text-dark'}">
                  ${t.completed ? 'Selesai' : 'Belum Selesai'}
                </span>
              </div>
            </label>
          </div>

          <button type="button" data-id="${t.id}" class="btn btn-outline-danger btn-sm text-nowrap dashboard-delete-btn">
            Hapus
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

export function renderPlaylist(playlist) {
  const listEl = document.getElementById('daftarPlaylist');
  if (!listEl) return;

  if (playlist.length === 0) {
    listEl.innerHTML = `<li class="list-group-item text-muted small">Belum ada lagu. Silakan tambahkan lagu di atas.</li>`;
    return;
  }

  listEl.innerHTML = playlist
    .map(
      (lagu) => `
      <li class="list-group-item d-flex justify-content-between align-items-center gap-2 px-0">
        <button type="button" class="btn btn-link text-decoration-none text-start text-dark p-0 text-truncate btn-putar-lagu" 
          data-id="${lagu.id}">
          ▶️ ${escapeHTML(lagu.nama)}
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm btn-hapus-lagu" data-id="${lagu.id}">
          Hapus
        </button>
      </li>
    `
    )
    .join('');
}

export function showError(inputElement, errorId, message) {
  if (inputElement) inputElement.classList.add('is-invalid');
  const errEl = document.getElementById(errorId);
  if (errEl) errEl.textContent = message;
}

export function clearErrors(inputs) {
  inputs.forEach((input) => {
    if (input) input.classList.remove('is-invalid');
  });
  ['taskNameError', 'courseNameError', 'deadlineError', 'priorityError'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

export function showLoading(isLoading) {
  const submitButton = document.getElementById('submitButton');
  const buttonText = document.getElementById('buttonText');
  const loadingText = document.getElementById('loadingText');
  if (!submitButton || !buttonText || !loadingText) return;

  submitButton.disabled = isLoading;
  buttonText.classList.toggle('d-none', isLoading);
  loadingText.classList.toggle('d-none', !isLoading);
}

export function showMessage(message, alertClass) {
  const formMessage = document.getElementById('formMessage');
  if (!formMessage) return;
  formMessage.innerHTML = `<div class="alert ${alertClass} py-2 px-3 mb-0" role="alert">${message}</div>`;
  setTimeout(() => {
    formMessage.innerHTML = '';
  }, 3000);
}