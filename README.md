 TaskMate — Aplikasi Pencatat Tugas & Fokus Belajar Mahasiswa

- **Nama:** Ahmad Faiz Dwi Putra
- **NRP:** 5125500035
- **Kelas:** 3 D3 MM B
- **Mata Kuliah:** Praktikum Pemrograman Visual (TB033109)

## Cara Menjalankan
1. Buka folder proyek menggunakan Visual Studio Code.
2. Jalankan ekstensi **Live Server** pada berkas index.html.
3. Akses http://127.0.0.1:5501/index.html di peramban.

## Arsitektur Modul & Komponen (Sprint 3–4)
- src/js/storage.js: Penyimpanan localStorage berversi (	askmate:tugas:v1) dengan migrasi otomatis dari 	askmate-tasks-v1, penyaringan item rusak, cadangan memori, dan pengecekan ketersediaan penyimpanan.
- src/js/state.js: Pengelolaan state daftar tugas, status penyaringan, serta daftar putar musik fokus.
- src/js/komponen.js: Komponen DOM reusable (KartuTugas, ItemLagu, PesanKosong) berbasis document.createElement dan 	extContent (bebas risiko XSS).
- src/js/ui.js: Pembaruan antarmuka berbasis DOM (
eplaceChildren) dan peringatan status penyimpanan.
- src/js/ui-pustaka.js: Pembungkus komponen modal detail menggunakan Bootstrap 5.
- src/js/main.js: Titik masuk aplikasi yang mengikat event delegasi dan navigasi antar-tampilan.

## Format Data & Ketangguhan Penyimpanan
- **Kunci Penyimpanan:** 	askmate:tugas:v1 (array objek JSON { id, name, course, deadline, priority, completed }).
- **Uji Ketangguhan:** Telah diuji pada skenario JSON rusak ({rusak) dan array berisi item rusak ([null, 5, {"name": 123}, ...]); aplikasi tetap terbuka normal, menyaring item rusak, dan mencegah eksekusi tag HTML pada input pengguna.

## Catatan Integritas & Penggunaan AI
- Pemecahan modul ES Modules, penyusunan komponen aman berbasis 	extContent, penanganan galat penyimpanan, serta dokumentasi *Keep a Changelog* dibantu oleh asisten AI (Gemini) untuk memverifikasi kesesuaian kontrak antarmuka tanpa mengubah alur fitur utama aplikasi.
