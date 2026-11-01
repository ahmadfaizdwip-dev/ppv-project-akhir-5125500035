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
    if (taskName.value.length > 80) {
      taskName.value = taskName.value.substring(0, 80);
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
  }

  if (courseName.value.trim() === "") {
    showError(courseName, "courseNameError", "Nama mata kuliah belum diisi.");
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
    taskItem.className = "card border mb-2 p-3 shadow-sm";
    if (task.completed) {
      taskItem.classList.add("bg-light");
    }

    let badgeColor = "bg-secondary";
    if (task.priority === "Tinggi") badgeColor = "bg-danger";
    else if (task.priority === "Sedang") badgeColor = "bg-warning text-dark";
    else if (task.priority === "Rendah") badgeColor = "bg-info text-dark";

    taskItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="h6 fw-bold mb-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}">${escapeHTML(task.name)}</h5>
          <p class="small text-secondary mb-1">📚 ${escapeHTML(task.course)}</p>
          <div class="d-flex align-items-center gap-2">
            <small class="text-muted">📅 ${formatDate(task.deadline)}</small>
            <span class="badge ${badgeColor}">${task.priority}</span>
          </div>
        </div>
        <div class="d-flex gap-2">
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