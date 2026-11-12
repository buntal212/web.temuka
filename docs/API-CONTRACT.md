# Status API Contract web.temuka

Backend Temuka dikelola pada repository terpisah. Endpoint marketplace belum ditetapkan di dokumen ini.

## Konfigurasi client

- Base URL dibaca melalui `VITE_API_BASE_URL` oleh Axios client terpusat.
- Boot file membuat Axios client per instance aplikasi SSR.
- Token autentikasi hanya dipasang setelah tindakan browser dan tidak tersedia dalam proses SSR.
- Website tidak mengakses database atau API Larisama, AdaAset, dan Londrian secara langsung.

## Autentikasi pelanggan

Autentikasi memakai personal access token Sanctum. Daftar mengembalikan profil akun tanpa token; pelanggan lalu masuk untuk menerima token. Login mengembalikan `data.user` dan `data.token`. Request terproteksi mengirim `Authorization: Bearer <token>`. Token disimpan di `sessionStorage` untuk tab saat ini, dipulihkan saat halaman dimuat ulang, dan dihapus ketika tab ditutup atau pengguna keluar.

| Method | Endpoint                | Akses                    | Isi request                                                      | Sukses                         |
| ------ | ----------------------- | ------------------------ | ---------------------------------------------------------------- | ------------------------------ |
| POST   | `/api/v1/auth/register` | Publik, maksimal 5/menit | `name`, `email`, `username`, `password`, `password_confirmation` | `201`, profil akun tanpa token |
| POST   | `/api/v1/auth/login`    | Publik, maksimal 5/menit | `username`, `password`                                           | `200`, user dan token          |
| GET    | `/api/v1/auth/me`       | Bearer token             | —                                                                | `200`, profil pengguna         |
| POST   | `/api/v1/auth/logout`   | Bearer token             | —                                                                | `204`, token dicabut           |

Validasi gagal memakai HTTP `422` dengan `message` dan `errors`. Kredensial salah memakai pesan generik. Resource pengguna hanya memuat `id`, `name`, `email`, dan `username`.

Endpoint marketplace harus dikoordinasikan dengan pemilik API sebelum digunakan.

## Status integrasi homepage

Homepage PLAN-01 menggunakan data demonstrasi lokal. Endpoint produk, kategori, merchant, dan pencarian belum dikonfirmasi sebagai kontrak frontend.
