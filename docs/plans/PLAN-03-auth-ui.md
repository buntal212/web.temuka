# PLAN-03 — Form Autentikasi web.temuka

**Status: SELESAI, alur sesi digantikan PLAN-05 Bearer token.**

**Status: IN_PROGRESS**
**Plan induk:** [`../../../../docs/plans/PLAN-03-customer-authentication.md`](../../../../docs/plans/PLAN-03-customer-authentication.md)

## Scope

- Route `/masuk` dan `/daftar` dengan form responsif yang mengikuti tema TEMUKA.
- Login hanya username/password. Pendaftaran memakai nama, email, username, password, dan konfirmasi.
- Implementasi awal memakai cookie dan sesi; alur tersebut telah digantikan PLAN-05.
- Store auth menangani login, pendaftaran, pemulihan profil, dan logout.
- Tombol header masuk/daftar menjadi navigasi nyata; kontrol keluar ditampilkan ketika sesi aktif.

Tidak termasuk halaman profil, verifikasi email, reset password, role, atau autentikasi admin.

## File terdampak

- `src/router/routes.js`
- `src/shared/services/api-client.js`
- `src/modules/auth/pages/LoginPage.vue`
- `src/modules/auth/pages/RegisterPage.vue`
- `src/modules/auth/components/AuthFormCard.vue`
- `src/modules/auth/services/auth-service.js`
- `src/modules/auth/stores/auth-store.js`
- `src/modules/auth/README.md`
- `src/modules/beranda/components/DesktopHeader.vue`
- `src/modules/beranda/components/MobileHeader.vue`
- `docs/API-CONTRACT.md`
- `docs/CHANGELOG.md`
- `docs/plans/PLAN-03-auth-ui.md`

## Verifikasi

- Jalankan Prettier, ESLint, `npm test`, dan SSR build.
- Uji manual validasi, loading, response 422/429, login sukses/gagal, sesi saat halaman dimuat ulang, logout, dan navigasi antarform.
- Pastikan panggilan sesi dilakukan client-side dan tidak membaca `window`, `document`, atau storage saat SSR.

## Hasil sementara

- ESLint: lulus.
- `node --test --test-isolation=none test/*.test.js`: 27 lulus. Mode worker default Windows terkena `spawn EPERM`, sehingga suite dijalankan tanpa isolasi worker.
- `npm run build`: SSR build berhasil.
- Pengujian browser dan API end-to-end belum dilakukan karena API belum dapat dijalankan sampai Docker Engine aktif.
