import { muatTugas, simpanTugas } from './storage.js';

let tasks = muatTugas();
let filterStatus = 'semua';
let playlistLagu = [];

// --- Manajemen Tugas ---
export function getSemuaTugas() {
  return tasks;
}

export function getTugasTersaring() {
  if (filterStatus === 'belum') return tasks.filter((t) => !t.completed);
  if (filterStatus === 'selesai') return tasks.filter((t) => t.completed);
  return tasks;
}

export function getFilterStatus() {
  return filterStatus;
}

export function setFilterStatus(status) {
  filterStatus = status;
}

export function tambahTugas({ name, course, deadline, priority }) {
  const newTask = {
    id: Date.now(),
    name,
    course,
    deadline,
    priority,
    completed: false
  };
  tasks.push(newTask);
  simpanTugas(tasks);
  return newTask;
}

export function toggleStatusTugas(id) {
  const task = tasks.find((item) => item.id === id);
  if (task) {
    task.completed = !task.completed;
    simpanTugas(tasks);
  }
}

export function hapusTugas(id) {
  tasks = tasks.filter((task) => task.id !== id);
  simpanTugas(tasks);
}

export function hapusTugasSelesai() {
  const jumlahSelesai = tasks.filter((t) => t.completed).length;
  if (jumlahSelesai === 0) return false;
  tasks = tasks.filter((t) => !t.completed);
  simpanTugas(tasks);
  return true;
}

export function getRingkasanTugas() {
  const total = tasks.length;
  const selesai = tasks.filter((t) => t.completed).length;
  return { total, selesai };
}

// --- Manajemen Playlist Musik Fokus ---
export function getPlaylist() {
  return playlistLagu;
}

export function tambahLagu(itemLagu) {
  playlistLagu.push(itemLagu);
}

export function cariLagu(id) {
  return playlistLagu.find((item) => item.id === id);
}

export function hapusLagu(id) {
  const index = playlistLagu.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [terhapus] = playlistLagu.splice(index, 1);
  return terhapus;
}