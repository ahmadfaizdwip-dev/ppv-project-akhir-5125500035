const KONSEP = {
  nama: 'TaskMate',
  tagline: 'Kelola deadline tugas kuliah dan fokus belajar dalam satu ruang kerja ringan.',
  persona: {
    nama: 'Dimas, 19 tahun',
    siapa: 'Mahasiswa semester 3 D3 Teknologi Multimedia dan Broadcasting yang aktif mengerjakan proyek praktikum mingguan.',
    keseharian: 'Mengikuti kuliah dan praktikum dari pagi hingga sore, lalu mengerjakan revisi tugas dan laporan pada malam hari di kos.',
    masalah: 'Catatan deadline tersebar di grup kelas dan catatan kertas sehingga sering lupa prioritas tugas yang paling mendesak dan mudah terdistraksi saat belajar.',
  },
  masalah: 'Mahasiswa praktikum sering kewalahan melacak banyak deadline tugas dari berbagai mata kuliah sekaligus. Informasi tenggat waktu tercecer di berbagai obrolan sehingga tugas prioritas tinggi kerap terlewat. Selain itu, perpindahan antara daftar tugas dan pemutar audio belajar sering memecah fokus pengerjaan.',
  solusi: 'TaskMate menyediakan dasbor pencatat tugas terpusat dengan filter status, tingkat prioritas, dan tanggal tenggat dalam satu halaman ringan. Pengguna dapat menambah, menandai selesai, serta menyaring tugas mendesak secara instan tanpa login maupun koneksi server. Pemutar musik fokus terintegrasi membantu mahasiswa menjaga konsentrasi selama menyelesaikan tugas.',
  fitur: [
    {
      nama: 'Tambah & validasi tugas kuliah beserta prioritas dan deadline (v0.1.0)',
      prioritas: 'wajib',
      alasan: 'Menjawab masalah inti persona dalam mencatat tenggat waktu dan tingkat urgensi tiap mata kuliah.'
    },
    {
      nama: 'Dasbor ringkasan progres & filter status tugas (v0.2.0)',
      prioritas: 'wajib',
      alasan: 'Memudahkan pengguna melihat sisa tugas yang belum selesai secara cepat sebelum memulai sesi belajar.'
    },
    {
      nama: 'Penyimpanan lokal tahan banting dengan migrasi versi & proteksi XSS (v0.4.0)',
      prioritas: 'wajib',
      alasan: 'Menjamin daftar tugas tetap tersimpan aman di peramban meski tanpa akun dan tidak rusak saat terjadi galat data.'
    },
    {
      nama: 'Pemutar musik fokus belajar dengan daftar putar lokal (v0.3.0)',
      prioritas: 'sebaiknya',
      alasan: 'Membantu menjaga konsentrasi saat mengerjakan tugas tanpa perlu membuka tab hiburan lain.'
    },
    {
      nama: 'Sinkronisasi akun cloud & notifikasi push lintas perangkat',
      prioritas: 'belum',
      alasan: 'Membutuhkan backend server dan autentikasi; ditunda agar aplikasi tetap instan, ringan, dan bebas login.'
    },
  ],
  pembanding: [
    {
      nama: 'Google Keep / Aplikasi Catatan Bawaan',
      kelebihan: 'Cepat dibuka untuk mencatat teks bebas dan tersedia di hampir semua perangkat.',
      kekurangan: 'Tidak memiliki penghitung progres penyelesaian tugas, tingkat prioritas terstruktur, maupun filter status khusus tugas kuliah.'
    },
    {
      nama: 'Notion / Trello',
      kelebihan: 'Fitur manajemen proyek sangat lengkap untuk kolaborasi tim besar.',
      kekurangan: 'Waktu muat berat, memerlukan akun dan koneksi internet stabil, serta terlalu kompleks untuk sekadar mencatat tugas kuliah harian.'
    },
  ],
  pembeda: 'Ringan tanpa login (offline-ready), menggabungkan pelacakan prioritas tugas kuliah dengan pemutar audio fokus dalam satu antarmuka.',
};