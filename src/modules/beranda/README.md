# Modul Beranda

## Tujuan

Menjadi halaman publik awal Temuka dan memperkenalkan kategori kebutuhan pelanggan. Menyediakan fitur pencarian katalog progresif (_progressive delivery_) menggunakan SSE melalui Temuka Backend.

## Halaman dan route

- `pages/BerandaPage.vue` — route `/`.
- Route detail, pencarian khusus, favorit, dan pesan belum dibuat. Halaman akun tersedia pada modul `akun`.

## Komponen utama

- `DesktopHeader.vue` dan `MobileHeader.vue` — navigasi responsif.
- `HeroSection.vue` — headline, input pencarian dengan debounce sekitar 600 ms, indikator status sumber progresif, dan contoh pencarian.
- `CategoryShortcutGrid.vue` dan `CategoryExplorer.vue` — filter kategori demonstrasi.
- `BenefitSection.vue`, `RecommendationSection.vue`, `ProductCard.vue`, dan `PromoSection.vue` — konten homepage dan rendering katalog hasil pencarian.
- `MobileBottomNav.vue` — navigasi mobile dengan tautan aktif Beranda dan Akun.
- `AppFooter.vue` — identitas serta navigasi kategori.

## Pencarian Katalog Progresif (SSE)

Pencarian menggunakan arsitektur **Latest Search Wins**:

1. Input kata kunci memiliki debounce sekitar 600 ms.
2. Setiap pencarian mengirim request `POST /api/v1/catalog/search` dengan header `Accept: text/event-stream` ke Temuka Backend.
3. Event `search_init`, `source_result`, `source_failed`, dan `search_done` diproses secara incremental melalui utilitas `src/shared/utils/sse-parser.js`.
4. Hasil dari pencarian lama diabaikan melalui pemeriksaan `searchId` saat kata kunci baru dikirim.
5. Hasil penawaran kanonis muncul setelah setiap sumber selesai.
6. Status pemrosesan tiap sumber ditampilkan pada chip status di `HeroSection`.

## State management

- `composables/useCatalogSearch.js` mengelola state pencarian progresif.
- State kategori dan filter demo dikelola secara lokal pada `BerandaPage.vue`.

## Cara menguji

1. Jalankan unit test dengan `node --test test/*.test.js`.
2. Jalankan aplikasi dengan `npm run dev`.
3. Cari kata seperti “Nasi”, “Cuci”, atau “Rumah” pada kolom pencarian hero.
4. Perhatikan status sumber dan kemunculan kartu hasil secara bertahap.
