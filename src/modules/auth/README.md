# Modul Autentikasi Pelanggan

## Tujuan

Menyediakan form daftar dan masuk untuk pelanggan Temuka. API Temuka menerbitkan token Sanctum yang disimpan sementara di `sessionStorage` browser dan dikirim sebagai Bearer token.

## Halaman dan route

- `/masuk` — masuk menggunakan username dan password.
- `/daftar` — daftar menggunakan nama, email, username, password, dan konfirmasi password.

## Komponen dan alur data

- `components/AuthFormCard.vue` menyediakan tampilan kartu bersama.
- `services/auth-service.js` memanggil endpoint autentikasi API.
- `stores/auth-store.js` mengelola profil dan token, memulihkan autentikasi setelah halaman dimuat ulang, lalu menghapus token saat logout.
- Halaman memvalidasi isian sederhana, menampilkan error API, lalu memuat beranda ketika berhasil.

## Tampilan dan aksesibilitas

- Latar halaman memakai hijau gelap Temuka, sedangkan kartu dan field memakai permukaan terang agar teks dan input lebih mudah dibaca.
- Ukuran kartu menyesuaikan desktop dan layar kecil. Halaman daftar tetap dapat digulir pada layar pendek.
- Field memakai label terlihat, urutan tab mengikuti urutan form, dan error diumumkan melalui region alert.

## API

Lihat [kontrak API](../../../docs/API-CONTRACT.md). Integrasi memerlukan API Temuka aktif dan `VITE_API_BASE_URL` yang benar.

## Cara menguji

1. Jalankan web dan API lokal sesuai panduan masing-masing.
2. Buka `/daftar`, buat akun, lalu pastikan kembali ke beranda.
3. Keluar dari header, buka `/masuk`, lalu masuk menggunakan username dan password.
4. Uji username/email duplikat dan kredensial salah untuk memastikan pesan validasi tampil.
5. Setelah daftar, pastikan notifikasi sukses tampil dan halaman masuk terbuka. Masuk untuk menerima token.
6. Muat ulang halaman untuk memastikan token aktif dipulihkan; tutup tab untuk menghapus token lokal.
