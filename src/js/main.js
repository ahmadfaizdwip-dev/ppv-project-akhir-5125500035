import {
  getSemuaTugas,
  getTugasTersaring,
  setFilterStatus,
  tambahTugas,
  toggleStatusTugas,
  hapusTugas,
  hapusTugasSelesai,
  getRingkasanTugas,
  getPlaylist,
  tambahLagu,
  cariLagu,
  hapusLagu
} from './state.js';

import {
  renderRingkasan,
  renderKelolaTugas,
  renderDashboardTugas,
  renderPlaylist,
  showError,
  clearErrors,
  showLoading,
  showMessage
} from './ui.js';

import { tampilkanModalDetail } from './ui-pustaka.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function perbaruiSemuaTampilan() {
  renderRingkasan(getRingkasanTugas());
  renderKelolaTugas(getSemuaTugas());
  renderDashboardTugas(getTugasTersaring());
}

function animateClick(element) {
  if (!element || prefersReducedMotion) return;
  element.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.93)' }, { transform: 'scale(1)' }],
    { duration: 160, easing: 'ease-in-out' }
  );
}

// ==========================================
// NAVIGASI TAB & KARTU DASHBOARD
// ==========================================
const tabButtons = document.querySelectorAll('#mainNav .nav-link');
const pageViews = document.querySelectorAll('.page-view');

function bukaTab(targetId) {
  tabButtons.forEach((b) => {
    b.classList.toggle('active', b.dataset.target === targetId);
  });

  pageViews.forEach((view) => {
    if (view.id === targetId) {
      view.classList.remove('d-none');
      view.classList.add('active');
      if (!prefersReducedMotion) {
        view.animate(
          [
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0px)' }
          ],
          { duration: 260, easing: 'ease-out' }
        );
      }
    } else {
      view.classList.add('d-none');
      view.classList.remove('active');
    }
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    animateClick(btn);
    bukaTab(btn.dataset.target);
  });
});

const cardStatusTugas = document.getElementById('cardStatusTugas');
if (cardStatusTugas) {
  cardStatusTugas.addEventListener('click', () => bukaTab('view-tugas'));
}

// ==========================================
// FORM TAMBAH TUGAS & VALIDASI
// ==========================================
const taskForm = document.getElementById('taskForm');
const taskName = document.getElementById('taskName');
const courseName = document.getElementById('courseName');
const deadline = document.getElementById('deadline');
const priority = document.getElementById('priority');

function validateForm() {
  let isValid = true;
  clearErrors([taskName, courseName, deadline, priority]);

  if (taskName.value.trim() === '') {
    showError(taskName, 'taskNameError', 'Nama tugas belum diisi.');
    isValid = false;
  } else if (taskName.value.trim().length < 3) {
    showError(taskName, 'taskNameError', 'Nama tugas minimal 3 karakter.');
    isValid = false;
  } else if (taskName.value.trim().length > 30) {
    showError(taskName, 'taskNameError', 'Nama tugas maksimal 30 karakter.');
    isValid = false;
  }

  if (courseName.value.trim() === '') {
    showError(courseName, 'courseNameError', 'Nama mata kuliah belum diisi.');
    isValid = false;
  } else if (courseName.value.trim().length > 25) {
    showError(courseName, 'courseNameError', 'Nama mata kuliah maksimal 25 karakter.');
    isValid = false;
  }

  if (deadline.value === '') {
    showError(deadline, 'deadlineError', 'Silakan pilih tanggal deadline tugas.');
    isValid = false;
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(deadline.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showError(deadline, 'deadlineError', 'Deadline tidak boleh tanggal yang sudah lewat.');
      isValid = false;
    }
  }

  if (priority.value === '') {
    showError(priority, 'priorityError', 'Silakan pilih tingkat prioritas tugas.');
    isValid = false;
  }

  if (!isValid) {
    showMessage('Masih ada data yang perlu diperbaiki.', 'alert-danger');
  }

  return isValid;
}

if (taskName) {
  taskName.addEventListener('input', () => {
    if (taskName.value.trim().length >= 3) {
      taskName.classList.remove('is-invalid');
      document.getElementById('taskNameError').textContent = '';
    }
  });
}

if (priority) {
  priority.addEventListener('change', () => {
    if (priority.value !== '') {
      priority.classList.remove('is-invalid');
      document.getElementById('priorityError').textContent = '';
      showMessage(`Prioritas tugas dipilih: ${priority.value}`, 'alert-info');
    }
  });
}

if (taskForm) {
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    showLoading(true);
    setTimeout(() => {
      tambahTugas({
        name: taskName.value.trim(),
        course: courseName.value.trim(),
        deadline: deadline.value,
        priority: priority.value
      });

      perbaruiSemuaTampilan();
      taskForm.reset();
      clearErrors([taskName, courseName, deadline, priority]);
      showLoading(false);
      showMessage('✓ Tugas berhasil ditambahkan.', 'alert-success');
    }, 400);
  });
}

// ==========================================
// AKSI TUGAS (KELOLA TUGAS & DASHBOARD)
// ==========================================
const taskList = document.getElementById('taskList');
if (taskList) {
  taskList.addEventListener('click', (event) => {
    const button = event.target.closest('.action-btn');
    if (!button) return;

    animateClick(button);
    const taskId = Number(button.dataset.id);

    if (button.classList.contains('complete-btn')) {
      toggleStatusTugas(taskId);
      perbaruiSemuaTampilan();
    } else if (button.classList.contains('delete-btn')) {
      if (confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
        hapusTugas(taskId);
        perbaruiSemuaTampilan();
        showMessage('Tugas berhasil dihapus.', 'alert-success');
      }
    }
  });
}

const clearCompleted = document.getElementById('clearCompleted');
if (clearCompleted) {
  clearCompleted.addEventListener('click', () => {
    animateClick(clearCompleted);
    const berhasil = hapusTugasSelesai();
    if (!berhasil) {
      showMessage('Belum ada tugas yang selesai untuk dihapus.', 'alert-warning');
      return;
    }
    perbaruiSemuaTampilan();
    showMessage('Tugas yang sudah selesai berhasil dihapus.', 'alert-success');
  });
}

const containerDaftarTugas = document.getElementById('containerDaftarTugas');
if (containerDaftarTugas) {
  containerDaftarTugas.addEventListener('change', (event) => {
    const checkbox = event.target.closest('.dashboard-toggle-check');
    if (!checkbox) return;
    toggleStatusTugas(Number(checkbox.dataset.id));
    perbaruiSemuaTampilan();
  });

  containerDaftarTugas.addEventListener('click', (event) => {
    const delBtn = event.target.closest('.dashboard-delete-btn');
    if (!delBtn) return;
    if (confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
      hapusTugas(Number(delBtn.dataset.id));
      perbaruiSemuaTampilan();
    }
  });
}

const filterStatusGroup = document.getElementById('filterStatusGroup');
if (filterStatusGroup) {
  filterStatusGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-filter-status');
    if (!btn) return;

    setFilterStatus(btn.dataset.filter);
    filterStatusGroup.querySelectorAll('.btn-filter-status').forEach((b) => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline-primary');
    });
    btn.classList.add('active', 'btn-primary');
    btn.classList.remove('btn-outline-primary');

    renderDashboardTugas(getTugasTersaring());
  });
}

// ==========================================
// PEMUTAR MUSIK FOKUS & MEDIA
// ==========================================
const cardMusikFokus = document.getElementById('cardMusikFokus');
const panelMusikFokus = document.getElementById('panelMusikFokus');
const btnTutupMusik = document.getElementById('btnTutupMusik');

function togglePanelMusik() {
  if (!panelMusikFokus) return;
  const isHidden = panelMusikFokus.classList.contains('d-none');
  panelMusikFokus.classList.toggle('d-none', !isHidden);
  if (isHidden) {
    panelMusikFokus.scrollIntoView({ behavior: 'smooth' });
  }
}

if (cardMusikFokus) cardMusikFokus.addEventListener('click', togglePanelMusik);
if (btnTutupMusik) btnTutupMusik.addEventListener('click', togglePanelMusik);

function putarLagu(id) {
  const lagu = cariLagu(id);
  if (!lagu) return;

  const player = document.getElementById('audioPlayer');
  const judulEl = document.getElementById('judulLaguAktif');
  if (player) {
    player.src = lagu.url;
    player.play();
  }
  if (judulEl) {
    judulEl.textContent = `Sedang memutar: ${lagu.nama}`;
  }
}

const btnTambahLagu = document.getElementById('btnTambahLagu');
if (btnTambahLagu) {
  btnTambahLagu.addEventListener('click', () => {
    const input = document.getElementById('inputFileLagu');
    if (!input || !input.files || input.files.length === 0) {
      tampilkanModalDetail({
        judul: 'Peringatan',
        isi: 'Silakan pilih berkas lagu terlebih dahulu.'
      });
      return;
    }

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      tambahLagu({
        id: Date.now() + i,
        nama: file.name.replace(/\.[^/.]+$/, ''),
        url: URL.createObjectURL(file)
      });
    }

    input.value = '';
    const playlist = getPlaylist();
    renderPlaylist(playlist);

    const player = document.getElementById('audioPlayer');
    if (player && (!player.src || player.src === window.location.href) && playlist.length > 0) {
      putarLagu(playlist[0].id);
    }
  });
}

const daftarPlaylist = document.getElementById('daftarPlaylist');
if (daftarPlaylist) {
  daftarPlaylist.addEventListener('click', (event) => {
    const btnPutar = event.target.closest('.btn-putar-lagu');
    if (btnPutar) {
      putarLagu(Number(btnPutar.dataset.id));
      return;
    }

    const btnHapus = event.target.closest('.btn-hapus-lagu');
    if (btnHapus) {
      const terhapus = hapusLagu(Number(btnHapus.dataset.id));
      if (terhapus) {
        URL.revokeObjectURL(terhapus.url);
        renderPlaylist(getPlaylist());
      }
    }
  });
}

const studyAudio = document.getElementById('studyAudio');
if (studyAudio) {
  studyAudio.addEventListener('error', () => {
    const errEl = document.getElementById('audioError');
    if (errEl) {
      errEl.textContent = '⚠️ Berkas audio gagal dimuat. Periksa letak file lagu Anda.';
    }
  });
}

// ==========================================
// INISIALISASI AWAL
// ==========================================
perbaruiSemuaTampilan();
renderPlaylist(getPlaylist());