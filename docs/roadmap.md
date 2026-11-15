# Roadmap Pengembangan — TaskMate

- **Nama:** Ahmad Faiz Dwi Putra
- **NRP:** 5125500035
- **Mata Kuliah:** Praktikum Pemrograman Visual

## Status Sprint

- [x] **Sprint 1 — Inisiasi & Perancangan UI (P08–P09)**
  - Penyusunan `charter.md` dan `DEPENDENCIES.md`.
  - Pembuatan antarmuka utama TaskMate menggunakan Bootstrap 5 (Dashboard, Kelola Tugas, Media Belajar).
  - Isolasi komponen modal pustaka eksternal ke dalam `src/js/ui-pustaka.js`.

- [x] **Sprint 2 — Implementasi Fitur MVP & Debugging (P10)**
  - Implementasi tambah tugas dengan validasi form, tandai selesai/batal, dan hapus tugas.
  - Penambahan filter status tugas (`Semua`, `Belum Selesai`, `Selesai`) dan ringkasan progres di Dashboard.
  - Implementasi fitur Pemutar Musik Fokus dengan unggah berkas audio lokal.

- [x] **Sprint 3 — Refactoring ke ES Modules & Dokumentasi Peta Modul (P11)**
  - Pemecahan logika aplikasi ke dalam ES Modules (`storage.js`, `state.js`, `ui.js`, `ui-pustaka.js`, `main.js`) dengan arah dependensi satu jalur.
  - Penghapusan seluruh variabel/fungsi global aplikasi pada `window` serta atribut `onclick` inline pada HTML.
  - Penyusunan dokumentasi peta modul pada `MODULE_MAP.md`.