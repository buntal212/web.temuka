# PLAN-04 — Poles Halaman Masuk dan Daftar

**Status: BLOCKED — render browser untuk pemeriksaan visual tidak dapat dijalankan di lingkungan ini.**
**Skill:** impeccable (polish), design-taste-frontend.
**Arah visual:** pertahankan tema hijau gelap TEMUKA dan perjelas kartu form.

## Tujuan dan scope

Merapikan hierarki, kontras, jarak, dan aksesibilitas form masuk serta daftar di `web.temuka`. Alur, copy, validasi, routing, dan integrasi API yang sudah ada tetap dipertahankan.

Tidak mencakup perubahan backend, autentikasi cookie/token, homepage, admin, atau API.

## File terdampak

- `src/css/_auth-page.scss`
- `src/modules/auth/components/AuthFormCard.vue`
- `src/modules/auth/pages/LoginPage.vue`
- `src/modules/auth/pages/RegisterPage.vue`
- `src/modules/auth/README.md`
- `docs/CHANGELOG.md`
- `docs/plans/PLAN-04-auth-page-polish.md`

## Penerapan

1. Menjaga identitas latar hijau tua dan logo TEMUKA.
2. Memisahkan visual kartu terang dari latar, memperjelas heading, dan menyelaraskan spacing kedua form.
3. Merapikan tampilan field, focus, tombol, footer, dan pesan error tanpa mengubah alur submit.
4. Mengatur halaman daftar agar tetap nyaman digulir di layar ponsel pendek.
5. Memusatkan logo dan kartu pada satu wrapper dengan lebar maksimum bersama.

## Risiko dan dependensi

- Perubahan kontras field dapat memengaruhi status fokus dan error Quasar.
- Tidak menambah dependency maupun mengubah API.
- Server dev Quasar gagal dijalankan pada pemeriksaan awal karena melaporkan package manager tidak tersedia; build SSR sebelumnya tersedia, tetapi verifikasi visual perlu dicoba kembali.

## Acceptance dan verifikasi

- Login dan daftar konsisten, terbaca, responsif, dan mempertahankan latar hijau gelap.
- Error, loading, focus keyboard, dan link antarform tetap terlihat dan berfungsi.
- Periksa tampilan pada 390, 768, dan 1440px; tidak ada overflow horizontal atau isi form terpotong.
- Jalankan Prettier, ESLint, tes frontend, dan SSR build.
- Jika server/browser tidak dapat dijalankan, catat keterbatasannya; jangan mengklaim pemeriksaan visual lulus.

## Hasil verifikasi

- Prettier: lulus untuk file terdampak.
- ESLint: lulus untuk halaman dan komponen auth.
- `node --test --test-isolation=none test/*.test.js`: 27 tes lulus.
- `npm run build`: Quasar SSR build berhasil.
- Impeccable detector: lulus, tidak menemukan temuan (`[]`).
- Pemeriksaan visual browser dan taste-skill gate: terblokir. Quasar dev tidak dapat memeriksa package manager karena proses `cmd.exe` gagal dengan `EPERM`; SSR bundle juga tidak dapat dijalankan mandiri karena dependency runtime `hono` belum terpasang di folder output.
- Wrapper halaman menggunakan grid terpusat, satu lebar maksimum untuk logo dan kartu, dan alignment item horizontal pada sumbu tengah yang sama. Hasil render tetap belum dikonfirmasi dengan screenshot.
- Tombol submit sebelumnya memakai `full-width` di dalam `q-gutter-md`. Pada Quasar, gutter memberi margin negatif ke form dan margin kiri ke anaknya, sementara utilitas full-width menghapus margin anak; ini membuat tombol bergeser relatif terhadap field. Gutter diganti dengan `gap` dan lebar form controls diseragamkan.
- Jarak antarfield dan tombol sekarang memakai CSS `gap`; setiap field, pesan error, dan tombol dipaksa memiliki lebar 100% tanpa margin gutter, sehingga tepi kiri dan kanan tombol sejajar dengan field.
- Setelah koreksi tombol: Prettier dan ESLint lulus; SSR build berhasil; Impeccable detector tetap kosong (`[]`).
