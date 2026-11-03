# Modul Beranda

## Tujuan

Menjadi halaman publik awal Temuka dan memperkenalkan kategori kebutuhan pelanggan. Menyediakan fitur pencarian katalog progresif (*progressive delivery*) menggunakan SSE melalui Temuka Backend.

## Halaman dan route

- `pages/BerandaPage.vue` — route `/`.
- Route detail, pencarian khusus, favorit, pesan, dan akun belum dibuat.

## Komponen utama

- `DesktopHeader.vue` dan `MobileHeader.vue` — navigasi responsif.
- `HeroSection.vue` — headline, input pencarian dengan debounce ~600 ms, indikator status sumber progresif, dan contoh pencarian.
- `CategoryShortcutGrid.vue` dan `CategoryExplorer.vue` — filter kategori demonstrasi.
- `BenefitSection.vue`, `RecommendationSection.vue`, `ProductCard.vue`, dan `PromoSection.vue` — konten homepage dan rendering katalog hasil pencarian.
- `MobileBottomNav.vue` — navigasi mobile.
- `AppFooter.vue` — identitas serta navigasi kategori.

## Pencarian Katalog Progresif (SSE)

Pencarian menggunakan arsitektur **Latest Search Wins**:
1. Input kata kunci memiliki debounce ~600 ms.
2. Setiap pencarian mengirim request `POST /api/v1/catalog/search` dengan header `Accept: text/event-stream` ke Temuka Backend.
3. Event `search_init`, `source_result`, `source_failed`, dan `search_done` diproses secara incremental melalui utilitas `src/shared/utils/sse-parser.js`.
4. Jika pengguna mengetik kata kunci baru saat pencarian lama masih berjalan, pencarian lama tetap dibiarkan selesai tanpa `AbortController`, namun event dari pencarian lama secara otomatis diabaikan (*stale check via searchId*).
5. Hasil penawaran kanonis dari setiap aplikasi sumber langsung dimunculkan ke `RecommendationSection` segera setelah sumber tersebut selesai.
6. Status pemrosesan tiap sumber (memuat, selesai dengan jumlah item, atau gagal) ditampilkan pada chip status di `HeroSection`.

## State management

- `composables/useCatalogSearch.js` mengelola state pencarian progresif: `searchTerm`, `isSearching`, `hasSearched`, `activeSearchId`, `searchResults`, dan `sourcesStatus`.
- State kategori dan filter demo tetap dikelola secara lokal pada `BerandaPage.vue`.

## Cara menguji

1. Jalankan unit test:
   ```bash
   node --test test/*.test.js
   ```
2. Jalankan aplikasi web:
   ```bash
   npm run dev
   ```
3. Buka browser dan ketik kata kunci (misal: "Nasi", "Cuci", "Rumah") pada kolom pencarian hero section.
4. Perhatikan pembaruan status sumber dan kemunculan kartu hasil secara bertahap.
