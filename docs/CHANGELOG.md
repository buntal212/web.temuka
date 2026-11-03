# Changelog web.temuka

## 2026-10-30 — PLAN-01 Homepage TEMUKA

- Mengganti scaffold halaman awal Quasar dengan homepage publik responsif dan design tokens TEMUKA.
- Menambahkan kategori, manfaat, rekomendasi demo, pencarian lokal, penjelajah kategori, footer, dan navigasi bawah mobile.
- Mengatur route publik ke history mode, menambahkan metadata beranda, dan memperbarui dokumentasi modul.
- Menandai API marketplace sebagai belum dikonfirmasi; homepage tetap memakai mock lokal.
- Menggunakan aset logo TEMUKA yang tersedia di `public/images` pada header desktop, mobile, dan footer.
- Menyesuaikan ikon shortcut kategori dengan referensi lingkaran pastel berwarna.
- Menghapus pemilih lokasi dan eyebrow hero sesuai arahan, lalu menerapkan tema background gelap `#203A36` dan teks terang di seluruh halaman.
- Mendaftarkan Quasar Meta Plugin setelah ditemukan error setup pada penggunaan `useMeta`.

## 2026-10-30

- Menyiapkan dokumentasi awal dan aturan frontend untuk website publik.
- Mengaktifkan mode SSR Hono dan menambahkan Axios API client yang aman untuk instance aplikasi SSR.
- Menetapkan VITE_API_BASE_URL sebagai konfigurasi publik dan mengecualikan .env.example dari aturan ignore environment.
