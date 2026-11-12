# Modul Akun Pelanggan

## Tujuan

Menampilkan ringkasan akun pelanggan yang sedang masuk dan menyediakan akses ke profil dari header serta navigasi bawah mobile.

## Halaman dan route

- `pages/AkunPage.vue` — halaman `/akun`, menampilkan nama, username, dan email dari akun aktif.

## Komponen dan alur

- `components/AccountMenu.vue` dipakai di header desktop dan mobile.
- Menu menampilkan identitas singkat, tautan ke halaman akun, dan aksi keluar.
- Halaman akun menunggu pemulihan token selesai. Jika pengguna tidak masuk, halaman mengarahkannya ke `/masuk`.
- Data profil berasal dari auth store; modul ini tidak memakai data contoh.

## Batas fitur

Halaman saat ini bersifat baca-saja. Pengubahan nama, email, password, preferensi, dan fitur akun lain menunggu kontrak API yang sesuai.

## Cara menguji

1. Masuk menggunakan akun pelanggan.
2. Buka menu nama/avatar pada header dan pilih **Akun saya**.
3. Pastikan profil menampilkan nama, username, dan email akun aktif.
4. Uji tautan Akun pada navigasi bawah layar mobile.
5. Keluar melalui menu akun dan pastikan token dicabut.
