export const KUNCI = 'taskmate:tugas:v1';
const KUNCI_LAMA = 'taskmate-tasks-v1';

let cadanganMemori = [];
let penyimpananTersedia = true;

function tugasSah(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    typeof item.name === 'string' &&
    item.name.trim() !== '' &&
    typeof item.course === 'string' &&
    item.course.trim() !== ''
  );
}

export function statusPenyimpanan() {
  return penyimpananTersedia;
}

export function muatTugas() {
  try {
    let raw = localStorage.getItem(KUNCI);

    // Migrasi otomatis satu kali dari kunci lama Sprint 3
    if (raw === null) {
      const lama = localStorage.getItem(KUNCI_LAMA);
      if (lama !== null) {
        const parsedLama = JSON.parse(lama);
        if (Array.isArray(parsedLama)) {
          const validLama = parsedLama.filter(tugasSah);
          localStorage.setItem(KUNCI, JSON.stringify(validLama));
          localStorage.removeItem(KUNCI_LAMA);
          penyimpananTersedia = true;
          cadanganMemori = validLama;
          return validLama;
        }
      }
      penyimpananTersedia = true;
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      penyimpananTersedia = true;
      return [];
    }

    const valid = parsed.filter(tugasSah);
    penyimpananTersedia = true;
    cadanganMemori = valid;
    return valid;
  } catch {
    penyimpananTersedia = false;
    return [...cadanganMemori];
  }
}

export function simpanTugas(data) {
  const valid = Array.isArray(data) ? data.filter(tugasSah) : [];
  cadanganMemori = [...valid];
  try {
    localStorage.setItem(KUNCI, JSON.stringify(valid));
    penyimpananTersedia = true;
    return true;
  } catch {
    penyimpananTersedia = false;
    return false;
  }
}