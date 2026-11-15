# Changelog — TaskMate

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan proyek ini mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [0.4.0] - 2026-11-15
### Added
- Membuat modul komponen reusable src/js/komponen.js (KartuTugas, ItemLagu, PesanKosong) berbasis document.createElement dan 	extContent.
- Menambahkan kunci penyimpanan berversi 	askmate:tugas:v1, migrasi otomatis dari kunci lama 	askmate-tasks-v1, penyaringan item rusak, serta cadangan memori di src/js/storage.js.
- Menambahkan indikator peringatan pada ringkasan tugas apabila penyimpanan lokal tidak tersedia.

### Changed
- Memperbarui src/js/ui.js agar merender daftar tugas kelola, ringkasan dashboard, daftar putar lagu, dan pesan notifikasi menggunakan 
eplaceChildren tanpa innerHTML.

### Security
- Menghilangkan penyusunan string HTML dan innerHTML pada ui.js untuk mencegah kerentanan injeksi skrip (XSS) pada nama tugas, mata kuliah, dan nama berkas lagu.

## [0.3.0] - 2026-11-14
### Added
- Memecah kode JavaScript menjadi ES Modules terpisah (storage.js, state.js, ui.js, ui-pustaka.js, main.js).
- Mengintegrasikan komponen modal pustaka eksternal Bootstrap 5 dan pemutar musik fokus.

## [0.2.0] - 2026-11-12
### Added
- Menambahkan fitur penyaringan status tugas pada dashboard, penghapusan tugas selesai massal, dan animasi transisi yang menghormati prefers-reduced-motion.

## [0.1.0] - 2026-11-10
### Added
- Rilis awal aplikasi pencatat tugas mahasiswa TaskMate dengan validasi formulir dan penyimpanan lokal dasar.
