# PLAN-06 — Feedback Pendaftaran Pelanggan

**Status: IN_PROGRESS**
**Sub-plan API:** [`../../../api.temuka/docs/plans/PLAN-06-registration-response.md`](../../../api.temuka/docs/plans/PLAN-06-registration-response.md)

## Tujuan dan scope

Setelah API berhasil membuat akun, tampilkan notifikasi sukses dan arahkan pelanggan ke halaman masuk agar ia masuk menggunakan akun yang baru dibuat. Endpoint daftar hanya membuat akun; token baru diterbitkan setelah login. Jika daftar gagal, pertahankan form dan tampilkan error yang sudah ada.

## File terdampak

- `src/modules/auth/pages/RegisterPage.vue`
- `quasar.config.js`
- `src/modules/auth/README.md`
- `docs/CHANGELOG.md`
- `api.temuka/app/Http/Controllers/Api/V1/Auth/RegisterController.php`
- `api.temuka/tests/Feature/CustomerAuthenticationTest.php`
- `api.temuka/docs/API-CONTRACT.md`
- `api.temuka/docs/architecture/CUSTOMER_AUTHENTICATION.md`
- `api.temuka/docs/CHANGELOG.md`
- Dokumen PLAN ini.

## Implementasi

1. Ubah response daftar menjadi profil akun tanpa menerbitkan token.
2. Aktifkan plugin Quasar Notify.
3. Jangan otomatis menetapkan token/sesi setelah pendaftaran.
4. Tampilkan notifikasi sukses singkat menggunakan Quasar Notify.
5. Arahkan ke `/masuk` setelah akun berhasil dibuat.
6. Pertahankan penanganan error validasi dan jaringan yang ada.

## Risiko dan pengujian

- Notifikasi harus tampil sebelum route berpindah dan tidak boleh menyatakan berhasil jika API gagal.
- Periksa ESLint dan SSR build; verifikasi alur daftar sukses/gagal secara manual bila API aktif.

## Acceptance criteria

- Sukses daftar menampilkan konfirmasi akun berhasil dibuat lalu membuka halaman masuk.
- Token tidak disimpan dan pengguna tidak langsung dianggap login.
- Gagal daftar tetap di halaman daftar dengan pesan error.

## Hasil verifikasi

- ESLint pada `RegisterPage.vue`: lulus.
- Quasar SSR build: lulus.
- Impeccable detector: tidak menemukan temuan pada halaman daftar.
- Verifikasi browser/API register sukses dan gagal: belum dijalankan.
