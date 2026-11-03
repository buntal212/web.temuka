# Modul Beranda

## Tujuan

Menjadi halaman publik awal Temuka dan memperkenalkan kategori kebutuhan pelanggan. Konten rekomendasi dan gambar pada tahap ini hanya untuk demonstrasi.

## Halaman dan route

- `pages/BerandaPage.vue` — route `/`.
- Route detail, pencarian khusus, favorit, pesan, dan akun belum dibuat.
- Preview visual detail akan direncanakan bersama halaman detail di plan berikutnya; PLAN-01 tidak menambahkan route detail.

## Komponen utama

- `DesktopHeader.vue` dan `MobileHeader.vue` — navigasi responsif.
- `HeroSection.vue` — headline, pencarian lokal, dan contoh kata pencarian.
- `CategoryShortcutGrid.vue` dan `CategoryExplorer.vue` — filter kategori demonstrasi.
- Shortcut kategori memakai ikon Material dengan warna pastel yang mengikuti referensi pengguna.
- `BenefitSection.vue`, `RecommendationSection.vue`, `ProductCard.vue`, dan `PromoSection.vue` — konten homepage.
- `MobileBottomNav.vue` — navigasi mobile; menu yang belum didukung dinonaktifkan.
- `AppFooter.vue` — identitas serta navigasi kategori.

## API dan alur data

Belum ada endpoint produk atau kategori yang disepakati. `data/homepageMockData.js` menyimpan kategori, manfaat, gambar, dan kartu rekomendasi untuk tampilan demo. `BerandaPage.vue` mengelola kata kunci, kategori terpilih, dan hasil filter dengan state lokal. Lokasi hanya tampil sebagai informasi pada kartu demo; tidak ada pemilih atau filter lokasi. Tidak ada request API dari modul ini.

Gambar saat ini dimuat dari URL Unsplash sebagai ilustrasi. Kartu memuat fallback visual jika gambar gagal dimuat. Ganti dengan aset yang disetujui atau media API Temuka saat sumber final tersedia.

Logo TEMUKA menggunakan aset `public/images/temuka_512px.png` dan `public/images/temuka_192px.png`. Karena wordmark berwarna terang, tampilkan di atas surface hijau agar tetap terbaca.

## State management

Menggunakan `ref` dan `computed` lokal pada halaman. Pinia belum diperlukan.

## Cara menguji

1. Jalankan `npm run dev` dan buka `/`.
2. Coba pencarian “Nasi ayam”, “Rumah dijual”, atau “Laundry kiloan”.
3. Pilih kategori atau cari kata kunci, lalu lihat hasil demo atau empty state.
4. Periksa route tak dikenal dan ukuran layar sesuai plan.
