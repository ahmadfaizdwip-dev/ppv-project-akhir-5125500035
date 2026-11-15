function formatTanggal(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T00:00:00');
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Kontrak: KartuTugas(tugas, opsi) -> HTMLElement
 * @param {Object} tugas - { id, name, course, deadline, priority, completed }
 * @param {Object} opsi - { mode: 'kelola' | 'dashboard' }
 */
export function KartuTugas(tugas, { mode = 'kelola' } = {}) {
  const card = document.createElement('div');

  if (mode === 'dashboard') {
    card.className = `card shadow-sm mb-3 overflow-hidden ${tugas.completed ? 'bg-light border-success' : ''}`;

    const body = document.createElement('div');
    body.className = 'card-body d-flex align-items-center justify-content-between gap-3';

    const formCheck = document.createElement('div');
    formCheck.className = 'form-check d-flex align-items-center gap-2 m-0';

    const checkbox = document.createElement('input');
    checkbox.className = 'form-check-input me-2 dashboard-toggle-check';
    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(tugas.completed);
    checkbox.dataset.id = String(tugas.id);
    checkbox.id = `dash-task-${tugas.id}`;
    checkbox.style.cursor = 'pointer';
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';

    const label = document.createElement('label');
    label.className = 'form-check-label w-100 min-w-0';
    label.htmlFor = `dash-task-${tugas.id}`;
    label.style.cursor = 'pointer';

    const judulEl = document.createElement('h6');
    judulEl.className = `fw-bold mb-1 text-break ${tugas.completed ? 'text-decoration-line-through text-muted' : ''}`;
    judulEl.textContent = tugas.name;

    const mkEl = document.createElement('p');
    mkEl.className = 'text-secondary small mb-1 text-break';
    mkEl.textContent = tugas.course;

    const metaRow = document.createElement('div');
    metaRow.className = 'd-flex align-items-center gap-2';

    const tglEl = document.createElement('small');
    tglEl.className = 'text-muted';
    tglEl.textContent = `🗓️ ${formatTanggal(tugas.deadline)}`;

    const badge = document.createElement('span');
    badge.className = `badge ${tugas.completed ? 'bg-success' : 'bg-warning text-dark'}`;
    badge.textContent = tugas.completed ? 'Selesai' : 'Belum Selesai';

    metaRow.append(tglEl, badge);
    label.append(judulEl, mkEl, metaRow);
    formCheck.append(checkbox, label);

    const btnHapus = document.createElement('button');
    btnHapus.type = 'button';
    btnHapus.dataset.id = String(tugas.id);
    btnHapus.className = 'btn btn-outline-danger btn-sm text-nowrap dashboard-delete-btn';
    btnHapus.textContent = 'Hapus';

    body.append(formCheck, btnHapus);
    card.append(body);
    return card;
  }

  // Mode default: 'kelola'
  card.className = `card task-item border mb-2 p-3 shadow-sm ${tugas.completed ? 'bg-light' : ''}`;

  const wrapper = document.createElement('div');
  wrapper.className = 'd-flex justify-content-between align-items-center task-item-content';

  const infoBox = document.createElement('div');

  const judulEl = document.createElement('h5');
  judulEl.className = `h6 fw-bold mb-1 ${tugas.completed ? 'text-decoration-line-through text-muted' : ''}`;
  judulEl.textContent = tugas.name;

  const mkEl = document.createElement('p');
  mkEl.className = 'small text-secondary mb-1';
  mkEl.textContent = `📚 ${tugas.course}`;

  const metaRow = document.createElement('div');
  metaRow.className = 'd-flex align-items-center gap-2';

  const tglEl = document.createElement('small');
  tglEl.className = 'text-muted';
  tglEl.textContent = `📅 ${formatTanggal(tugas.deadline)}`;

  let badgeColor = 'bg-secondary';
  if (tugas.priority === 'Tinggi') badgeColor = 'bg-danger';
  else if (tugas.priority === 'Sedang') badgeColor = 'bg-warning text-dark';
  else if (tugas.priority === 'Rendah') badgeColor = 'bg-info text-dark';

  const badge = document.createElement('span');
  badge.className = `badge ${badgeColor}`;
  badge.textContent = tugas.priority || 'Sedang';

  metaRow.append(tglEl, badge);
  infoBox.append(judulEl, mkEl, metaRow);

  const aksiBox = document.createElement('div');
  aksiBox.className = 'd-flex gap-2 task-item-actions';

  const btnSelesai = document.createElement('button');
  btnSelesai.type = 'button';
  btnSelesai.className = `btn btn-sm ${tugas.completed ? 'btn-outline-warning' : 'btn-outline-success'} action-btn complete-btn`;
  btnSelesai.dataset.id = String(tugas.id);
  btnSelesai.textContent = tugas.completed ? 'Batal' : 'Selesai';

  const btnHapus = document.createElement('button');
  btnHapus.type = 'button';
  btnHapus.className = 'btn btn-sm btn-outline-danger action-btn delete-btn';
  btnHapus.dataset.id = String(tugas.id);
  btnHapus.textContent = 'Hapus';

  aksiBox.append(btnSelesai, btnHapus);
  wrapper.append(infoBox, aksiBox);
  card.append(wrapper);

  return card;
}

/**
 * Kontrak: ItemLagu(lagu) -> HTMLLIElement
 * @param {Object} lagu - { id, nama, url }
 */
export function ItemLagu(lagu) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center gap-2 px-0';

  const btnPutar = document.createElement('button');
  btnPutar.type = 'button';
  btnPutar.className = 'btn btn-link text-decoration-none text-start text-dark p-0 text-truncate btn-putar-lagu';
  btnPutar.dataset.id = String(lagu.id);
  btnPutar.textContent = `▶️ ${lagu.nama}`;

  const btnHapus = document.createElement('button');
  btnHapus.type = 'button';
  btnHapus.className = 'btn btn-outline-danger btn-sm btn-hapus-lagu';
  btnHapus.dataset.id = String(lagu.id);
  btnHapus.textContent = 'Hapus';

  li.append(btnPutar, btnHapus);
  return li;
}

/**
 * Kontrak: PesanKosong(teks, opsi) -> HTMLElement
 */
export function PesanKosong(teks, { judul = '', ikon = '', kelas = 'text-muted text-center py-3' } = {}) {
  const box = document.createElement('div');
  box.className = kelas;

  if (ikon) {
    const ikonEl = document.createElement('div');
    ikonEl.className = 'fs-1 mb-2';
    ikonEl.textContent = ikon;
    box.append(ikonEl);
  }

  if (judul) {
    const judulEl = document.createElement('h3');
    judulEl.className = 'h5 fw-bold';
    judulEl.textContent = judul;
    box.append(judulEl);
  }

  const p = document.createElement('p');
  p.className = judul ? 'text-secondary small mb-0' : 'mb-0';
  p.textContent = teks;
  box.append(p);

  return box;
}