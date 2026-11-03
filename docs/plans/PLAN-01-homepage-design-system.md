# PLAN-01 — Design System dan Homepage TEMUKA

**Status: BLOCKED**

## Tujuan

Mengganti halaman starter Quasar dengan homepage publik TEMUKA yang mobile-first, responsif, mudah dipahami, dan aman untuk Quasar SSR. Konten katalog menggunakan demonstrasi lokal; tidak ada endpoint marketplace yang diasumsikan tersedia.

## Scope

- Token warna dan styling dasar.
- Header desktop dan mobile, hero dengan pencarian lokal, kategori, keunggulan, rekomendasi, kategori eksplorasi, banner, footer, dan navigasi bawah mobile.
- Background utama seluruh halaman, header, section, banner, footer, dan navigasi memakai `#203A36` dengan teks terang. Kartu input/listing tetap memakai surface terang demi keterbacaan.
- Pemilih lokasi dihilangkan sesuai arahan pengguna; lokasi pada kartu hanya menjadi informasi listing.
- Metadata beranda serta route publik dengan URL history.
- Dokumentasi modul dan status API.

Tidak termasuk integrasi API, halaman detail ber-route, autentikasi, transaksi, pembayaran, fitur favorit, pesan, atau akun.

## File terdampak

- `quasar.config.js`
- `src/layouts/MainLayout.vue`
- `src/router/routes.js`
- `src/pages/ErrorNotFound.vue`
- `src/pages/IndexPage.vue` (dihapus setelah route dipindahkan)
- `src/pages/SecondPage.vue` (dihapus karena merupakan route starter yang tidak digunakan)
- `src/css/app.scss`
- `src/css/quasar.variables.scss`
- `src/modules/beranda/pages/BerandaPage.vue`
- `src/modules/beranda/components/*.vue`
- `src/modules/beranda/data/homepageMockData.js`
- `src/modules/beranda/README.md`
- `README.md`
- `docs/API-CONTRACT.md`
- `docs/CHANGELOG.md`
- `docs/plans/PLAN-01-homepage-design-system.md`

## Strategi implementasi

1. Gunakan warna brand yang disepakati melalui token SCSS dan CSS custom properties.
2. Susun komponen homepage dalam modul `beranda`; state pencarian tetap lokal.
3. Sediakan tampilan desktop dan mobile berbeda melalui breakpoint Quasar, termasuk grid kategori empat kolom dan rekomendasi satu kolom pada ponsel.
4. Gunakan URL history agar URL publik bersih dan anchor section dapat dipakai.
5. Daftarkan Quasar Meta Plugin untuk `useMeta`; pastikan SSR tidak membaca API browser langsung. Gunakan gambar dengan rasio eksplisit, alt text, loading bertahap, serta fallback.
6. Dokumentasikan bahwa foto dari Unsplash dan kartu listing hanyalah ilustrasi demonstrasi sampai aset resmi tersedia.

## Risiko dan dependensi

- Referensi visual homepage lengkap belum tersedia. Referensi strip ikon kategori dari pengguna sudah diterapkan pada shortcut kategori.
- Foto Unsplash memerlukan jaringan dan dapat gagal; komponen menyediakan fallback, tetapi keputusan aset produksi masih terbuka.
- Endpoint marketplace dan domain produksi belum dikonfirmasi; mock tetap digunakan dan canonical produksi belum diatur.

## Verifikasi dan acceptance criteria

- Lint dan build SSR berhasil.
- Route `/` merender homepage dan route tak dikenal menampilkan 404.
- Pencarian, filter kategori, empty state, navigasi anchor, dan tombol nonaktif berperilaku sesuai label.
- Tinjau layout pada 360, 390, 430, 768, 1024, dan 1440 px tanpa horizontal overflow.
- SSR tidak mengakses `window`, `document`, atau `localStorage` saat render; metadata beranda hadir.
- Dokumentasi modul dan status API diperbarui; perubahan tetap di `web.temuka`.

## Hasil verifikasi

- **PASS** — Prettier `--check` pada seluruh file terdampak.
- **PASS** — ESLint pada modul beranda, layout, halaman 404, dan routing.
- **PASS** — Sass compile untuk token global dan 12 blok SCSS komponen Vue.
- **BLOCKED** — `npm.cmd run build` memakai Node 22.23.3 tetapi Quasar tidak dapat mendeteksi package manager. Pemeriksaan proses menunjukkan spawn `C:\WINDOWS\system32\cmd.exe` mendapat `EPERM` dari lingkungan eksekusi. Tidak ada hasil kompilasi SSR.
- **NOT_RUN** — Pemeriksaan visual browser pada lebar 360, 390, 430, 768, 1024, dan 1440 px; browser tidak tersedia di lingkungan ini.
- **NOT_RUN** — Verifikasi hydration/runtime SSR; build SSR belum dapat berjalan.

Status tetap BLOCKED sampai build SSR dan tinjauan visual dapat dijalankan di lingkungan yang mengizinkan proses Quasar.
