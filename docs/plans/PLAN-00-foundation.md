# PLAN-00 — Foundation web.temuka

**Status: DONE**  
**Scope:** Scaffold Quasar SSR dengan stack dasar dan perintah pengembangan lokal.  
**Git dan admin.temuka:** di luar scope.

## Tujuan

Menyiapkan project web.temuka agar developer dapat menjalankannya dan melanjutkan implementasi fitur kemudian.

## Kondisi awal

Scaffold Quasar terpasang: quasar 2.35.2, @quasar/app-vite 3.10.3, Vue 3.5.44, Vue Router 5.4.0, dan Pinia 4.1.0. Pengguna telah memasang Axios 1.21.0 dan menambahkan mode SSR Hono; src-ssr beserta dependency SSR sudah tersedia.

@quasar/app-vite mensyaratkan Node 22.22.0 atau lebih baru. Node 22.23.3 digunakan lewat PATH khusus sesi tanpa mengubah versi Node global.

## Hasil

- Scaffold Quasar dipasang pengguna menggunakan npm.
- Mode SSR Hono dan dependency Axios dipasang pengguna.
- Script dev menjalankan mode SSR melalui npm.cmd run dev.
- API client dibuat per instance aplikasi SSR dan tersedia melalui dependency injection.
- VITE_API_BASE_URL disiapkan dalam .env.example dan dibiarkan kosong sampai alamat API disepakati.
- Rules dan dokumentasi dasar tersedia.

## Kriteria selesai

- Scaffold dan dependency Quasar, Axios, serta SSR tersedia.
- Script pengembangan lokal mengarah ke mode SSR.
- npm.cmd run lint berhasil.
- Build SSR berhasil menurut laporan pengguna pada 2026-10-30.
- Tidak ada endpoint, autentikasi, atau fitur marketplace yang dibuat pada foundation ini.

## Status pekerjaan

Foundation awal selesai. Integrasi API dan fitur marketplace dikerjakan dalam plan berikutnya saat scope-nya ditentukan.
