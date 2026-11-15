// ui-pustaka.js — SATU-SATUNYA berkas yang memanggil API JS Bootstrap
export function tampilkanModalDetail({ judul, isi }) {
  const modalEl = document.querySelector('#modalDetail');
  if (!modalEl || typeof bootstrap === 'undefined') return;

  modalEl.querySelector('.modal-title').textContent = judul;
  modalEl.querySelector('.modal-body').textContent = isi;

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  modalInstance.show();
}