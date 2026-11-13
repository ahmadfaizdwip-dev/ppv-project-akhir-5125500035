// ==========================================
// DUKUNGAN REDUCED MOTION
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================
// ELEMEN DOM
// ==========================================
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const courseName = document.getElementById("courseName");
const deadline = document.getElementById("deadline");
const priority = document.getElementById("priority");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");

const submitButton = document.getElementById("submitButton");
const buttonText = document.getElementById("buttonText");
const loadingText = document.getElementById("loadingText");
const formMessage = document.getElementById("formMessage");
const clearCompleted = document.getElementById("clearCompleted");

const tabButtons = document.querySelectorAll("#mainNav .nav-link");
const pageViews = document.querySelectorAll(".page-view");
const dashboardStatus = document.getElementById("dashboardStatus");

let tasks = [];

// ==========================================
// ANIMASI & MANAJEMEN TAB NAVIGASI
// ==========================================
tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    animateClick(btn);

    const targetId = btn.dataset.target;

    tabButtons.forEach(function (b) { 
      b.classList.remove("active"); 
    });
    btn.classList.add("active");

    pageViews.forEach(function (view) {
      if (view.id === targetId) {
        view.classList.remove("d-none");
        view.classList.add("active");

        if (!prefersReducedMotion) {
          view.animate([
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0px)" }
          ], { duration: 260, easing: "ease-out" });
        }
      } else {
        view.classList.add("d-none");
        view.classList.remove("active");
      }
    });
  });
});

function animateClick(element) {
  if (!element || prefersReducedMotion) return;
  element.animate([
    { transform: "scale(1)" },
    { transform: "scale(0.93)" },
    { transform: "scale(1)" }
  ], { duration: 160, easing: "ease-in-out" });
}

// ==========================================
// LOGIKA FORM & VALIDASI
// ==========================================
if (taskName) {
  taskName.addEventListener("input", function () {
    if (taskName.value.trim().length >= 3) {
      taskName.classList.remove("is-invalid");
      document.getElementById("taskNameError").textContent = "";
    }
  });
}

if (priority) {
  priority.addEventListener("change", function () {
    if (priority.value !== "") {
      priority.classList.remove("is-invalid");
      document.getElementById("priorityError").textContent = "";
      showMessage(`Prioritas tugas dipilih: ${priority.value}`, "alert-info");
    }
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    showLoading(true);

    setTimeout(function () {
      const newTask = {
        id: Date.now(),
        name: taskName.value.trim(),
        course: courseName.value.trim(),
        deadline: deadline.value,
        priority: priority.value,
        completed: false
      };

      tasks.push(newTask);
      renderTasks();

      taskForm.reset();
      clearErrors();
      showLoading(false);

      showMessage("✓ Tugas berhasil ditambahkan.", "alert-success");
    }, 800);
  });
}

if (taskList) {
  taskList.addEventListener("click", function (event) {
    const button = event.target.closest(".action-btn");
    if (!button) return;

    animateClick(button);
    const taskId = Number(button.dataset.id);

    if (button.classList.contains("complete-btn")) {
      const task = tasks.find(function (item) { return item.id === taskId; });
      if (task) {
        task.completed = !task.completed;
        renderTasks();
      }
    }

    if (button.classList.contains("delete-btn")) {
      const confirmation = confirm("Apakah kamu yakin ingin menghapus tugas ini?");
      if (confirmation) {
        tasks = tasks.filter(function (task) { return task.id !== taskId; });
        renderTasks();
        showMessage("Tugas berhasil dihapus.", "alert-success");
      }
    }
  });
}

if (clearCompleted) {
  clearCompleted.addEventListener("click", function () {
    animateClick(clearCompleted);
    const completedTasks = tasks.filter(function (task) { return task.completed; });

    if (completedTasks.length === 0) {
      showMessage("Belum ada tugas yang selesai untuk dihapus.", "alert-warning");
      return;
    }

    tasks = tasks.filter(function (task) { return !task.completed; });
    renderTasks();
    showMessage("Tugas yang sudah selesai berhasil dihapus.", "alert-success");
  });
}

// ==========================================
// FUNGSI VALIDASI & INDIKATOR UI
// ==========================================
function validateForm() {
  let isValid = true;
  clearErrors();

  if (taskName.value.trim() === "") {
    showError(taskName, "taskNameError", "Nama tugas belum diisi.");
    isValid = false;
  } else if (taskName.value.trim().length < 3) {
    showError(taskName, "taskNameError", "Nama tugas minimal 3 karakter.");
    isValid = false;
  } else if (taskName.value.trim().length > 30) {
    showError(taskName, "taskNameError", "Nama tugas maksimal 30 karakter.");
    isValid = false;
  }

  if (courseName.value.trim() === "") {
    showError(courseName, "courseNameError", "Nama mata kuliah belum diisi.");
    isValid = false;
  } else if (courseName.value.trim().length > 25) {
    showError(courseName, "courseNameError", "Nama mata kuliah maksimal 25 karakter.");
    isValid = false;
  }

  if (deadline.value === "") {
    showError(deadline, "deadlineError", "Silakan pilih tanggal deadline tugas.");
    isValid = false;
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(deadline.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showError(deadline, "deadlineError", "Deadline tidak boleh tanggal yang sudah lewat.");
      isValid = false;
    }
  }

  if (priority.value === "") {
    showError(priority, "priorityError", "Silakan pilih tingkat prioritas tugas.");
    isValid = false;
  }

  if (!isValid) {
    showMessage("Masih ada data yang perlu diperbaiki.", "alert-danger");
  }

  return isValid;
}

function showError(inputElement, errorId, message) {
  inputElement.classList.add("is-invalid");
  document.getElementById(errorId).textContent = message;
}

function clearErrors() {
  const inputs = [taskName, courseName, deadline, priority];
  inputs.forEach(function (input) {
    if (input) input.classList.remove("is-invalid");
  });

  if (document.getElementById("taskNameError")) document.getElementById("taskNameError").textContent = "";
  if (document.getElementById("courseNameError")) document.getElementById("courseNameError").textContent = "";
  if (document.getElementById("deadlineError")) document.getElementById("deadlineError").textContent = "";
  if (document.getElementById("priorityError")) document.getElementById("priorityError").textContent = "";
}

function showLoading(isLoading) {
  if (isLoading) {
    submitButton.disabled = true;
    buttonText.classList.add("d-none");
    loadingText.classList.remove("d-none");
  } else {
    submitButton.disabled = false;
    buttonText.classList.remove("d-none");
    loadingText.classList.add("d-none");
  }
}

function showMessage(message, alertClass) {
  if (!formMessage) return;
  formMessage.innerHTML = `<div class="alert ${alertClass} py-2 px-3 mb-0" role="alert">${message}</div>`;

  setTimeout(function () {
    formMessage.innerHTML = "";
  }, 3000);
}

// ==========================================
// RENDERING & FORMATTING
// ==========================================
function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.appendChild(emptyState);
    if (taskCount) taskCount.textContent = "0";
    if (dashboardStatus) dashboardStatus.textContent = "Belum ada tugas ditambahkan.";
    return;
  }

  if (taskCount) taskCount.textContent = tasks.length;
  if (dashboardStatus) {
    const completedCount = tasks.filter(t => t.completed).length;
    dashboardStatus.textContent = `${completedCount} dari ${tasks.length} tugas telah selesai dikerjakan.`;
  }

  tasks.forEach(function (task) {
    const taskItem = document.createElement("div");
    taskItem.className = "card task-item border mb-2 p-3 shadow-sm";
    if (task.completed) {
      taskItem.classList.add("bg-light");
    }

    let badgeColor = "bg-secondary";
    if (task.priority === "Tinggi") badgeColor = "bg-danger";
    else if (task.priority === "Sedang") badgeColor = "bg-warning text-dark";
    else if (task.priority === "Rendah") badgeColor = "bg-info text-dark";

    taskItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center task-item-content">
        <div>
          <h5 class="h6 fw-bold mb-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}">${escapeHTML(task.name)}</h5>
          <p class="small text-secondary mb-1">📚 ${escapeHTML(task.course)}</p>
          <div class="d-flex align-items-center gap-2">
            <small class="text-muted">📅 ${formatDate(task.deadline)}</small>
            <span class="badge ${badgeColor}">${task.priority}</span>
          </div>
        </div>
        <div class="d-flex gap-2 task-item-actions">
          <button class="btn btn-sm ${task.completed ? "btn-outline-warning" : "btn-outline-success"} action-btn complete-btn" data-id="${task.id}">
            ${task.completed ? "Batal" : "Selesai"}
          </button>
          <button class="btn btn-sm btn-outline-danger action-btn delete-btn" data-id="${task.id}">
            Hapus
          </button>
        </div>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Render awal
renderTasks();
// Navigasi ke menu Kelola Tugas saat kartu Status Tugas diklik
document.querySelector('#cardStatusTugas').addEventListener('click', () => {
  bukaMenu('kelolaTugas'); // Sesuaikan nama fungsi navigasi di kode Anda
});

// Navigasi ke menu Media Belajar saat kartu Musik diklik
document.querySelector('#cardMusikFokus').addEventListener('click', () => {
  bukaMenu('mediaBelajar'); // Sesuaikan nama fungsi navigasi di kode Anda
});
// Sample Data Tugas (sesuaikan dengan array data di aplikasi Anda)
let daftarTugas = [
  { id: 1, judul: 'Membuat Website Portfolio', matkul: 'Pemrograman Web', deadline: '2026-11-05', prioritas: 'Tinggi', selesai: false },
  { id: 2, judul: 'Laporan Praktikum Network', matkul: 'Jaringan Komputer', deadline: '2026-11-03', prioritas: 'Sedang', selesai: true }
];

// Variable status filter aktif ('semua', 'belum', 'selesai')
let filterStatus = 'semua';

// Fungsi merender daftar tugas ke HTML
function renderDaftarTugas() {
  const container = document.querySelector('#containerDaftarTugas');
  if (!container) return;

  // Filter tugas berdasarkan tab yang dipilih
  const tugasTersaring = daftarTugas.filter(t => {
    if (filterStatus === 'belum') return !t.selesai;
    if (filterStatus === 'selesai') return t.selesai;
    return true; // 'semua'
  });

  if (tugasTersaring.length === 0) {
    container.innerHTML = `<p class="text-muted text-center py-3">Tidak ada tugas dalam kategori ini.</p>`;
    return;
  }

  container.innerHTML = tugasTersaring.map(t => `
    <div class="card shadow-sm mb-3 overflow-hidden ${t.selesai ? 'bg-light border-success' : ''}">
      <div class="card-body d-flex align-items-center justify-content-between gap-3">
        
        <!-- Checkbox / Tombol Status -->
        <div class="form-check d-flex align-items-center gap-2 m-0">
          <input class="form-check-input me-2" type="checkbox" ${t.selesai ? 'checked' : ''} 
            onchange="toggleStatusTugas(${t.id})" id="task-${t.id}" style="cursor: pointer; width: 20px; height: 20px;">
          
          <label class="form-check-label w-100 min-w-0" for="task-${t.id}" style="cursor: pointer;">
            <h6 class="fw-bold mb-1 text-break ${t.selesai ? 'text-decoration-line-through text-muted' : ''}">
              ${t.judul}
            </h6>
            <p class="text-secondary small mb-1 text-break">${t.matkul}</p>
            <div class="d-flex align-items-center gap-2">
              <small class="text-muted">🗓️ ${t.deadline}</small>
              <span class="badge ${t.selesai ? 'bg-success' : 'bg-warning text-dark'}">
                ${t.selesai ? 'Selesai' : 'Belum Selesai'}
              </span>
            </div>
          </label>
        </div>

        <!-- Tombol Aksi Hapus -->
        <button onclick="hapusTugas(${t.id})" class="btn btn-outline-danger btn-sm text-nowrap">
          Hapus
        </button>

      </div>
    </div>
  `).join('');
}

// Fungsi mengubah status Selesai / Belum Selesai saat diklik
function toggleStatusTugas(id) {
  const tugas = daftarTugas.find(t => t.id === id);
  if (tugas) {
    tugas.selesai = !tugas.selesai;
    renderDaftarTugas();
    perbaruiRingkasanStatus(); // Update angka di Dashboard jika ada
  }
}

// Fungsi ganti filter tab (Semua, Belum Selesai, Selesai)
function setFilterStatus(status) {
  filterStatus = status;
  
  // Ubah style tombol aktif
  document.querySelectorAll('.btn-filter-status').forEach(btn => {
    btn.classList.remove('active', 'btn-primary');
    btn.classList.add('btn-outline-primary');
  });
  event.target.classList.add('active', 'btn-primary');
  event.target.classList.remove('btn-outline-primary');

  renderDaftarTugas();
}

// Fungsi update teks ringkasan (misal "1 dari 2 tugas selesai")
function perbaruiRingkasanStatus() {
  const total = daftarTugas.length;
  const selesai = daftarTugas.filter(t => t.selesai).length;
  const elemenRingkasan = document.querySelector('#teksStatusTugas');
  if (elemenRingkasan) {
    elemenRingkasan.textContent = `${selesai} dari ${total} tugas telah selesai dikerjakan.`;
  }
}

// Jalankan render awal saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  renderDaftarTugas();
  perbaruiRingkasanStatus();
});
document.addEventListener('DOMContentLoaded', () => {
  const cardMusik = document.querySelector('#cardMusikFokus');
  const panelMusik = document.querySelector('#panelMusikFokus');

  if (cardMusik && panelMusik) {
    cardMusik.addEventListener('click', () => {
      // Cek kondisi tersembunyi (baik via style inline maupun class d-none)
      const isHidden = panelMusik.style.display === 'none' || panelMusik.classList.contains('d-none');
      
      if (isHidden) {
        panelMusik.classList.remove('d-none');
        panelMusik.style.display = 'block';
        panelMusik.scrollIntoView({ behavior: 'smooth' }); // Gulir otomatis ke pemutar
      } else {
        panelMusik.style.display = 'none';
      }
    });
  }
});
  // Pastikan variabel array berada di luar fungsi
window.playlistLagu = window.playlistLagu || [];

// Daftarkan langsung ke 'window.' agar selalu terbaca oleh onclick HTML
window.tambahLaguDariFile = function() {
  const input = document.querySelector('#panelMusikFokus #inputFileLagu') || document.querySelector('#inputFileLagu');
  
  if (!input || !input.files || input.files.length === 0) {
    alert('Silakan pilih berkas lagu terlebih dahulu.');
    return;
  }

  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    const objectUrl = URL.createObjectURL(file);

    window.playlistLagu.push({
      id: Date.now() + i,
      nama: file.name.replace(/\.[^/.]+$/, ''),
      url: objectUrl
    });
  }

  input.value = '';
  window.renderPlaylist();

  const player = document.querySelector('#panelMusikFokus #audioPlayer') || document.querySelector('#audioPlayer');
  if (player && (!player.src || player.src === window.location.href) && window.playlistLagu.length > 0) {
    window.putarLagu(window.playlistLagu[0].id);
  }
};

window.renderPlaylist = function() {
  const listEl = document.querySelector('#panelMusikFokus #daftarPlaylist') || document.querySelector('#daftarPlaylist');
  if (!listEl) return;

  if (window.playlistLagu.length === 0) {
    listEl.innerHTML = `<li class="list-group-item text-muted small">Belum ada lagu. Silakan tambahkan lagu di atas.</li>`;
    return;
  }

  listEl.innerHTML = window.playlistLagu.map((lagu) => `
    <li class="list-group-item d-flex justify-content-between align-items-center gap-2 px-0">
      <button type="button" class="btn btn-link text-decoration-none text-start text-dark p-0 text-truncate" 
        onclick="putarLagu(${lagu.id})">
        ▶️ ${lagu.nama}
      </button>
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="hapusLagu(${lagu.id})">
        Hapus
      </button>
    </li>
  `).join('');
};

window.putarLagu = function(id) {
  const lagu = window.playlistLagu.find((item) => item.id === id);
  if (!lagu) return;

  const player = document.querySelector('#panelMusikFokus #audioPlayer') || document.querySelector('#audioPlayer');
  const judulEl = document.querySelector('#panelMusikFokus #judulLaguAktif') || document.querySelector('#judulLaguAktif');

  if (player) {
    player.src = lagu.url;
    player.play();
  }
  if (judulEl) {
    judulEl.textContent = `Sedang memutar: ${lagu.nama}`;
  }
};

window.hapusLagu = function(id) {
  const index = window.playlistLagu.findIndex((item) => item.id === id);
  if (index !== -1) {
    URL.revokeObjectURL(window.playlistLagu[index].url);
    window.playlistLagu.splice(index, 1);
    window.renderPlaylist();
  }
}