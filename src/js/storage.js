const STORAGE_KEY = 'taskmate-tasks-v1';

export function muatTugas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function simpanTugas(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}