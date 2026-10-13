// =====================================================
// Coding Academy - Script
// Semua teks dan komentar berbahasa Indonesia
// Tidak pakai library, tidak pakai localStorage
// =====================================================

// ===== DATA GLOBAL =====
// Array untuk menyimpan data pendaftar (hanya di memori, hilang saat refresh)
let dataPendaftar = [];

// Data galeri untuk fitur pencarian & detail
const dataKegiatan = [
    {
        id: 1,
        judul: "Workshop Web Development",
        deskripsi: "Pelajari dasar-dasar membangun website modern dengan HTML, CSS, dan JavaScript. Workshop ini cocok untuk pemula yang ingin memulai karir di bidang web development.",
        gambar: "images/webdev.svg",
        alt: "Ilustrasi Workshop Web Development",
        badge: "Populer",
        tanggal: "15 Nov 2026",
        lokasi: "Lab Komputer A"
    },
    {
        id: 2,
        judul: "Pelatihan Python untuk Pemula",
        deskripsi: "Kurikulum komprehensif untuk mempelajari bahasa pemrograman Python dari nol. Materi mencakup variabel, kontrol alur, fungsi, dan library populer yang sering digunakan.",
        gambar: "images/python.svg",
        alt: "Ilustrasi Pelatihan Python untuk Pemula",
        badge: "Pemula Friendly",
        tanggal: "20 Nov 2026",
        lokasi: "Lab Komputer B"
    },
    {
        id: 3,
        judul: "Bootcamp JavaScript Advanced",
        deskripsi: "Program intensif untuk menguasai JavaScript tingkat lanjut, termasuk asynchronous programming, DOM manipulation, dan framework populer seperti React dan Vue.",
        gambar: "images/javascript.svg",
        alt: "Ilustrasi Bootcamp JavaScript Advanced",
        badge: "Intensif",
        tanggal: "25 Nov 2026",
        lokasi: "Ruang Bootcamp"
    },
    {
        id: 4,
        judul: "Pelatihan Mobile App Development",
        deskripsi: "Belajar mengembangkan aplikasi mobile untuk iOS dan Android menggunakan Dart dan Flutter. Peserta akan membuat project nyata dan siap untuk pasar kerja.",
        gambar: "images/mobile.svg",
        alt: "Ilustrasi Pelatihan Mobile App Development",
        badge: "Terbaru",
        tanggal: "02 Des 2026",
        lokasi: "Lab Mobile"
    },
    {
        id: 5,
        judul: "Hackathon Mini",
        deskripsi: "Kompetisi coding 24 jam dengan tema inovatif dan hadiah menarik. Kesempatan sempurna untuk mengukur skill, berkolaborasi, dan networking dengan programmer lainnya.",
        gambar: "images/hackathon.svg",
        alt: "Ilustrasi Hackathon Mini",
        badge: "Kompetisi",
        tanggal: "10 Des 2026",
        lokasi: "Aula Utama"
    },
    {
        id: 6,
        judul: "Sesi Mentoring Karier IT",
        deskripsi: "Bimbingan langsung dari profesional berpengalaman di industri teknologi. Topik meliputi persiapan interview, portfolio building, dan strategi pengembangan karir jangka panjang.",
        gambar: "images/mentoring.svg",
        alt: "Ilustrasi Sesi Mentoring Karier IT",
        badge: "Mentoring",
        tanggal: "15 Des 2026",
        lokasi: "Ruang Mentoring"
    }
];

// ===== FUNGSI NAVBAR HAMBURGER =====
/**
 * Buka / tutup menu navigasi di HP
 * Mengubah class .open dan atribut aria-expanded untuk aksesibilitas
 */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const btn = document.getElementById('btnHamburger');
    if (!menu || !btn) return;
    const akanBuka = !menu.classList.contains('open');
    menu.classList.toggle('open', akanBuka);
    btn.setAttribute('aria-expanded', akanBuka ? 'true' : 'false');
    btn.setAttribute('aria-label', akanBuka ? 'Tutup menu navigasi' : 'Buka menu navigasi');
}

/**
 * Tutup menu navigasi (dipanggil setelah klik tautan atau tekan Escape)
 */
function tutupMenu() {
    const menu = document.getElementById('navMenu');
    const btn = document.getElementById('btnHamburger');
    if (!menu || !btn) return;
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Buka menu navigasi');
}

// ===== FUNGSI NAVIGASI HALAMAN =====
/**
 * Menampilkan halaman (section) tertentu dan menyembunyikan yang lain
 * @param {string} sectionId - ID section tujuan (beranda, gallery, jadwal, pendaftaran, tentang)
 */
function tampilkanHalaman(sectionId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Update highlight menu aktif
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-target="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Tutup menu hamburger setelah pindah halaman (khusus HP)
    tutupMenu();

    // Scroll ke atas agar judul tidak tertutup navbar
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Navigasi cepat ke halaman Pendaftaran (tombol di Gallery/Beranda)
 */
function navigasiKePendaftaran() {
    tampilkanHalaman('pendaftaran');
}

// ===== PENCARIAN GALLERY =====
/**
 * Filter card gallery berdasarkan kata kunci (judul / deskripsi)
 */
function cariGallery() {
    const keyword = document.getElementById('inputCari').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.gallery-grid .card');
    let adaHasil = false;

    cards.forEach(card => {
        const judul = card.querySelector('h3').textContent.toLowerCase();
        const deskripsi = card.querySelector('p').textContent.toLowerCase();
        const cocok = !keyword || judul.includes(keyword) || deskripsi.includes(keyword);
        card.style.display = cocok ? '' : 'none';
        if (cocok) adaHasil = true;
    });

    const pesan = document.getElementById('pesanCari');
    if (pesan) pesan.style.display = adaHasil ? 'none' : 'block';
}

// ===== MODE GELAP / TERANG =====
/**
 * Ganti tema gelap/terang
 */
function toggleTema() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('btnTema');
    if (btn) {
        const isDark = document.body.classList.contains('dark-mode');
        btn.textContent = isDark ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    }
}

// ===== DETAIL KEGIATAN =====
/**
 * Tampilkan detail kegiatan (sederhana pakai alert)
 * @param {number} id - ID kegiatan
 */
function tampilkanDetail(id) {
    const item = dataKegiatan.find(k => k.id === id);
    if (!item) return;
    alert(item.judul + "\n\n" + item.deskripsi + "\n\n📅 " + item.tanggal + " | 📍 " + item.lokasi);
}

// ===== VALIDASI FORM =====
/**
 * Validasi NIK: harus tepat 16 digit angka
 */
function validasiNIK(nik) {
    return /^\d{16}$/.test(nik);
}

/**
 * Validasi Nama: tidak boleh kosong (setelah trim)
 */
function validasiNama(nama) {
    return nama.trim().length > 0;
}

/**
 * Validasi No HP: hanya angka, 10-13 digit, diawali 08 atau 62
 */
function validasiNoHP(noHP) {
    const noHPAngka = noHP.replace(/\D/g, '');
    if (!/^\d{10,13}$/.test(noHPAngka)) return false;
    if (!noHPAngka.startsWith('08') && !noHPAngka.startsWith('62')) return false;
    return true;
}

/**
 * Tampilkan pesan error di bawah field
 */
function tampilkanError(fieldId, message) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errEl = formGroup.querySelector('.error-message');
    if (errEl) errEl.textContent = message;
}

/**
 * Hapus pesan error dari field
 */
function hapusError(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const errEl = formGroup.querySelector('.error-message');
    if (errEl) errEl.textContent = '';
}

/**
 * Validasi seluruh form saat klik Simpan
 * @returns {boolean} true jika semua field valid
 */
function validasiForm() {
    let valid = true;

    // NIK
    const nikInput = document.getElementById('nik');
    hapusError('nik');
    if (!validasiNIK(nikInput.value.trim())) {
        tampilkanError('nik', 'NIK harus tepat 16 digit angka');
        valid = false;
    }

    // Nama Lengkap
    const namaInput = document.getElementById('nama');
    hapusError('nama');
    if (!validasiNama(namaInput.value)) {
        tampilkanError('nama', 'Nama Lengkap tidak boleh kosong');
        valid = false;
    }

    // Jenis Kelamin (radio)
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
    const jkWrap = document.getElementById('jenis-kelamin');
    if (jkWrap) {
        const jkGroup = jkWrap.parentElement;
        jkGroup.classList.remove('error');
        const err = jkGroup.querySelector('.error-message');
        if (err) err.textContent = '';
        if (!jenisKelamin) {
            jkGroup.classList.add('error');
            if (err) err.textContent = 'Pilih Jenis Kelamin';
            valid = false;
        }
    }

    // No HP
    const nohpInput = document.getElementById('nohp');
    hapusError('nohp');
    if (!validasiNoHP(nohpInput.value.trim())) {
        tampilkanError('nohp', 'No HP harus 10-13 digit dan diawali 08 atau 62');
        valid = false;
    }

    // Alamat
    const alamatInput = document.getElementById('alamat');
    hapusError('alamat');
    if (!validasiNama(alamatInput.value)) {
        tampilkanError('alamat', 'Alamat tidak boleh kosong');
        valid = false;
    }

    // Bahasa
    const bahasaInput = document.getElementById('bahasa');
    hapusError('bahasa');
    if (bahasaInput.value === '') {
        tampilkanError('bahasa', 'Pilih Bahasa Pemrograman yang Diminati');
        valid = false;
    }

    return valid;
}

/**
 * Validasi live: hanya angka di NIK/No HP, hapus error saat sudah benar
 */
function pasangValidasiLive() {
    const nik = document.getElementById('nik');
    const nohp = document.getElementById('nohp');
    const bahasa = document.getElementById('bahasa');

    if (nik) {
        nik.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 16);
            if (this.value.length === 16) hapusError('nik');
        });
    }
    if (nohp) {
        nohp.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 13);
        });
    }
    if (bahasa) {
        bahasa.addEventListener('change', function() {
            if (this.value !== '') hapusError('bahasa');
        });
    }
    document.querySelectorAll('input[name="jenisKelamin"]').forEach(r => {
        r.addEventListener('change', function() {
            const jkWrap = document.getElementById('jenis-kelamin');
            if (jkWrap) {
                const g = jkWrap.parentElement;
                g.classList.remove('error');
                const err = g.querySelector('.error-message');
                if (err) err.textContent = '';
            }
        });
    });
}

// ===== PENYIMPANAN DATA (simulasi frontend) =====
// Catatan jujur: data hanya disimpan di array JavaScript (dataPendaftar),
// tidak ada database / localStorage. Data hilang saat halaman di-refresh.
/**
 * Simpan data: validasi -> confirm() -> push array -> tampilkanHasil -> reset
 */
function simpanData() {
    if (!validasiForm()) {
        return;
    }

    // Dialog konfirmasi bawaan browser, teks harus persis
    const konfirmasi = confirm('Apakah Anda sudah yakin untuk menyimpan?');

    if (konfirmasi) {
        const pendaftar = {
            nik: document.getElementById('nik').value.trim(),
            nama: document.getElementById('nama').value.trim(),
            jenisKelamin: document.querySelector('input[name="jenisKelamin"]:checked').value,
            nohp: document.getElementById('nohp').value.trim(),
            alamat: document.getElementById('alamat').value.trim(),
            bahasa: document.getElementById('bahasa').value
        };

        dataPendaftar.push(pendaftar);

        const successMsg = document.querySelector('.success-message');
        if (successMsg) {
            successMsg.classList.add('show');
            setTimeout(() => successMsg.classList.remove('show'), 3000);
        }

        resetForm();
        tampilkanHasil(); // alias ke tampilkanDataPendaftar
    }
    // Jika Cancel -> jangan simpan, form tetap apa adanya
}

/**
 * Reset form dan hapus semua pesan error
 */
function resetForm() {
    const form = document.getElementById('formPendaftaran');
    if (form) form.reset();
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.textContent = '';
    });
}

/**
 * Alias sesuai penamaan soal: tampilkanHasil()
 */
function tampilkanHasil() {
    tampilkanDataPendaftar();
}

/**
 * Render tabel data pendaftar (pakai .table-wrapper agar bisa scroll di HP)
 */
function tampilkanDataPendaftar() {
    const container = document.getElementById('data-pendaftar-container');
    if (!container) return;

    if (dataPendaftar.length === 0) {
        container.innerHTML = '<p class="no-data">Belum ada data pendaftar</p>';
        return;
    }

    let html = '<h3>Data Pendaftar</h3>';
    html += '<div class="table-wrapper"><table class="data-table"><thead><tr>';
    html += '<th>No</th><th>NIK</th><th>Nama Lengkap</th><th>Jenis Kelamin</th><th>No HP</th><th>Alamat</th><th>Bahasa</th><th>Aksi</th>';
    html += '</tr></thead><tbody>';

    dataPendaftar.forEach((item, index) => {
        html += '<tr>';
        html += `<td>${index + 1}</td>`;
        html += `<td>${item.nik}</td>`;
        html += `<td>${item.nama}</td>`;
        html += `<td>${item.jenisKelamin}</td>`;
        html += `<td>${item.nohp}</td>`;
        html += `<td>${item.alamat}</td>`;
        html += `<td>${item.bahasa}</td>`;
        html += `<td><button class="btn btn-danger btn-small" onclick="hapusData(${index})">Hapus</button></td>`;
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    html += `<p class="total-pendaftar">Total pendaftar: ${dataPendaftar.length} orang</p>`;
    html += '<p class="total-pendaftar" style="font-size:0.85rem;color:#bbb">Catatan: data disimpan sementara di memori browser dan akan hilang saat halaman di-refresh (tidak ada database).</p>';
    container.innerHTML = html;
}

/**
 * Hapus satu baris data
 * @param {number} index - indeks di array
 */
function hapusData(index) {
    const yakin = confirm('Yakin ingin menghapus data ini?');
    if (!yakin) return;
    dataPendaftar.splice(index, 1);
    tampilkanDataPendaftar();
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan Gallery sebagai halaman default
    tampilkanHalaman('gallery');

    pasangValidasiLive();

    // Tombol Simpan & Reset
    const btnSimpan = document.getElementById('btnSimpan');
    if (btnSimpan) btnSimpan.addEventListener('click', simpanData);

    const btnReset = document.getElementById('btn-reset');
    if (btnReset) btnReset.addEventListener('click', resetForm);

    // Pencarian gallery
    const inputCari = document.getElementById('inputCari');
    if (inputCari) inputCari.addEventListener('input', cariGallery);

    // Toggle tema
    const btnTema = document.getElementById('btnTema');
    if (btnTema) btnTema.addEventListener('click', toggleTema);

    // Hamburger
    const btnHamburger = document.getElementById('btnHamburger');
    if (btnHamburger) {
        btnHamburger.addEventListener('click', toggleMenu);
    }

    // Tutup menu jika klik di luar navbar (khusus HP)
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('nav');
        const menu = document.getElementById('navMenu');
        const hamburger = document.getElementById('btnHamburger');
        if (!nav || !menu || !hamburger) return;
        const isOpen = menu.classList.contains('open');
        if (!isOpen) return;
        // Jika klik di luar nav, tutup
        if (!nav.contains(e.target)) {
            tutupMenu();
        }
    });

    // Tutup menu dengan tombol Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') tutupMenu();
    });

    // Logo bisa diakses via keyboard (Enter)
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tampilkanHalaman('gallery');
            }
        });
    }
});
