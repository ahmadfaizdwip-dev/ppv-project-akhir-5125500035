import { KartuTugas, ItemLagu, PesanKosong } from './komponen.js';
import { statusPenyimpanan } from './storage.js';

export function renderRingkasan({ total, selesai }) {
  const taskCount = document.getElementById('taskCount');
  const dashboardStatus = document.getElementById('dashboardStatus');
  const teksStatusTugas = document.getElementById('teksStatusTugas');

  const peringatan = statusPenyimpanan()
    ? ''
    : ' (Peringatan: penyimpanan lokal tidak tersedia, data hanya di memori)';

  if (taskCount) taskCount.textContent = total;
  if (dashboardStatus) {
    const dasar =
      total === 0
        ? 'Belum ada tugas ditambahkan.'
        : `${selesai} dari ${total} tugas telah selesai dikerjakan.`;
    dashboardStatus.textContent = dasar + peringatan;
  }
  if (teksStatusTugas) {
    teksStatusTugas.textContent = `${selesai} dari ${total} tugas telah selesai dikerjakan.${peringatan}`;
  }
}

export function renderKelolaTugas(tasks) {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.replaceChildren(
      PesanKosong('Tambahkan tugas kuliah pertama kamu agar lebih mudah mengatur deadline.', {
        ikon: '📋',
        judul: 'Belum ada tugas',
        kelas: 'text-center py-5'
      })
    );
    return;
  }

  taskList.replaceChildren(...tasks.map((task) => KartuTugas(task, { mode: 'kelola' })));
}

export function renderDashboardTugas(tugasTersaring) {
  const container = document.getElementById('containerDaftarTugas');
  if (!container) return;

  if (tugasTersaring.length === 0) {
    container.replaceChildren(PesanKosong('Tidak ada tugas dalam kategori ini.'));
    return;
  }

  container.replaceChildren(
    ...tugasTersaring.map((t) => KartuTugas(t, { mode: 'dashboard' }))
  );
}

export function renderPlaylist(playlist) {
  const listEl = document.getElementById('daftarPlaylist');
  if (!listEl) return;

  if (playlist.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-group-item text-muted small';
    li.textContent = 'Belum ada lagu. Silakan tambahkan lagu di atas.';
    listEl.replaceChildren(li);
    return;
  }

  listEl.replaceChildren(...playlist.map((lagu) => ItemLagu(lagu)));
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

  const alertBox = document.createElement('div');
  alertBox.className = `alert ${alertClass} py-2 px-3 mb-0`;
  alertBox.setAttribute('role', 'alert');
  alertBox.textContent = message;

  formMessage.replaceChildren(alertBox);
  setTimeout(() => {
    formMessage.replaceChildren();
  }, 3000);
}