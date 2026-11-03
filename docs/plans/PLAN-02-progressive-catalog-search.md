# PLAN-02 — Progressive Catalog Search End-to-End

**Status: DONE**

## Tujuan

Membangun fitur pencarian katalog publik Temuka dengan pengiriman progresif (progressive delivery) menggunakan Server-Sent Events (SSE) secara end-to-end dari frontend ke Temuka Backend dan Udumbara Internal Hub (UIH).

Pengguna dapat mengetik kata kunci, dan hasil katalog ditampilkan secara bertahap setiap kali aplikasi sumber selesai memproses pencarian, tanpa harus menunggu seluruh sumber selesai.

## Scope

- Input kata kunci pencarian dengan debounce ~600 ms.
- Strategi **Latest Search Wins**:
  - Setiap pencarian memiliki `searchId` unik.
  - Pencarian lama yang masih berjalan dibiarkan selesai di latar belakang (tidak menggunakan `AbortController`).
  - Frontend hanya menampilkan dan memperbarui state untuk `searchId` yang paling baru.
  - Event dari `searchId` yang sudah kedaluwarsa diabaikan secara aman.
- Parser SSE berbasis `fetch()` dan `ReadableStream` yang aman untuk Quasar SSR.
- Indikator status pencarian per sumber (memuat, selesai, gagal) dan hasil kosong.
- Integrasi ke endpoint Temuka Backend `POST /api/v1/catalog/search`.

Tidak termasuk: autentikasi pengguna publik (pencarian publik terbuka), transaksi/checkout, paginasi mendalam, dan integrasi API produksi ASU.

## File Terdampak di web.temuka

- `docs/plans/PLAN-02-progressive-catalog-search.md`
- `src/shared/utils/sse-parser.js` (utilitas parser SSE baru)
- `src/modules/beranda/composables/useCatalogSearch.js` (composable pencarian katalog baru)
- `src/modules/beranda/components/HeroSection.vue` (integrasi status pencarian & input)
- `src/modules/beranda/components/RecommendationSection.vue` (tampilan hasil dinamis & status sumber)
- `src/modules/beranda/pages/BerandaPage.vue` (penghubung state pencarian)
- `src/modules/beranda/README.md` (dokumentasi fitur pencarian)

## Risiko dan Dependensi

- Koneksi stream pada lingkungan server Quasar SSR tidak boleh dieksekusi saat server-side render; pemanggilan stream harus dipastikan hanya berjalan pada client (`process.env.CLIENT` atau lifecycle client).
- Penanganan buffer teks SSE yang terpotong di tengah baris JSON harus diakomodasi oleh parser SSE.
