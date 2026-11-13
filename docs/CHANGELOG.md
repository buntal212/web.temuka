# Changelog web.temuka

## 2026-11-13 — Stabilitas tombol akun saat halaman dimuat ulang

- Menahan tombol masuk/daftar hingga pemulihan status token selesai agar akun aktif tidak sempat terlihat sebagai pengunjung.
- Menyediakan placeholder header dengan ukuran tetap selama status auth diperiksa.

## 2026-11-13 — Menu dan halaman akun

- Menambahkan menu akun yang sama pada header desktop dan mobile, termasuk ringkasan identitas dan aksi keluar.
- Menambahkan halaman `/akun` baca-saja serta mengaktifkan navigasi Akun di mobile.
- Halaman akun menunggu pemeriksaan Bearer token dan mengarahkan pengguna tamu ke halaman masuk.

## 2026-11-13 — Feedback setelah pendaftaran

- Menampilkan notifikasi setelah akun berhasil dibuat dan mengarahkan pelanggan ke halaman masuk.
- Pendaftaran tidak lagi otomatis menyimpan token atau membuka sesi login.

## 2026-11-13 — Autentikasi Bearer Token

- Mengganti alur cookie/CSRF menjadi Bearer token Sanctum.
- Menyimpan token per tab di `sessionStorage`, memulihkan profil saat reload, dan menghapus token saat logout.
- Memperbarui kontrak API dan README modul autentikasi.

## 2026-11-12 — PLAN-04 Poles Halaman Autentikasi

- Mempertahankan latar hijau gelap Temuka dan meningkatkan kontras kartu serta field form.
- Merapikan hierarki heading, jarak, tombol, footer, fokus keyboard, dan pesan error pada layar kecil maupun desktop.

## 2026-11-09 — PLAN-03 Autentikasi Pelanggan

- Menambahkan halaman masuk username/password dan pendaftaran nama, email, username, serta password.
- Menghubungkan form ke API sesi Sanctum, menambahkan pemulihan sesi saat aplikasi dimuat, serta tombol keluar.
- Menambahkan kontrak endpoint autentikasi dan dokumentasi modul.

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
