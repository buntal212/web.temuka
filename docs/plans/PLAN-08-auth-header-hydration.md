# PLAN-08 — Hindari Kilatan Tombol Login saat Hydration

**Status: DONE**

## Tujuan dan scope

Selama token pelanggan dipulihkan di browser, jangan tampilkan kontrol guest sebelum status autentikasi diketahui. Pertahankan ruang header agar tidak bergeser, lalu tampilkan menu akun atau tombol masuk setelah proses selesai.

## File terdampak

- `src/modules/beranda/components/DesktopHeader.vue`
- `src/modules/beranda/components/MobileHeader.vue`
- `docs/plans/PLAN-08-auth-header-hydration.md`
- `docs/CHANGELOG.md`

## Langkah

1. Tambahkan state placeholder saat `authStore.isReady` bernilai false.
2. Tampilkan menu akun atau tombol masuk setelah state siap.
3. Verifikasi lint dan SSR build.

## Risiko dan acceptance criteria

- Placeholder tidak boleh mengubah tinggi header atau tampil sebagai kontrol yang bisa diklik.
- SSR dan hydration harus merender state awal yang sama.
- Setelah auth siap, akun aktif menampilkan menu akun dan pengunjung menampilkan tombol masuk/daftar.

## Hasil verifikasi

- ESLint pada kedua header: lulus.
- Quasar SSR build: lulus.
- Impeccable detector: tidak menemukan temuan pada kedua header.
