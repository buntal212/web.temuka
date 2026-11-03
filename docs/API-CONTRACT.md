# Status API Contract web.temuka

Backend Temuka dikelola di repository terpisah dan sudah tersedia. Dokumen ini belum menetapkan endpoint marketplace, payload, autentikasi, atau aturan cache sebagai kontrak final.

## Konfigurasi client

- Base URL dibaca melalui VITE_API_BASE_URL dan dipakai oleh Axios client terpusat.
- Quasar mengizinkan prefix QCLI_ dan VITE_ ke kode client. VITE_API_BASE_URL hanya boleh berisi base URL publik.
- Boot file membuat instance Axios per instance aplikasi SSR dan menyediakan client melalui key dependency injection temukaApi.
- Modul fitur menambahkan service hanya setelah endpoint disepakati.
- Website tidak mengakses database atau API Larisama, AdaAset, dan Londrian secara langsung.

Detail endpoint harus dikoordinasikan dengan pemilik api.temuka sebelum digunakan.

## Status integrasi homepage

Homepage PLAN-01 menggunakan data demonstrasi lokal. Pemeriksaan repository API menunjukkan route health dan route contoh engineering; endpoint produk, kategori, merchant, dan pencarian belum dikonfirmasi sebagai kontrak frontend. Route contoh engineering bukan fitur marketplace. Jangan mengganti mock dengan endpoint sampai kontrak dan otorisasi publiknya disepakati.
