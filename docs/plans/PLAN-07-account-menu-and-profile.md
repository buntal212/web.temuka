# PLAN-07 — Menu Akun dan Profil Pelanggan

**Status: IN_PROGRESS**

## Tujuan dan scope

Memberi pelanggan yang sudah masuk menu akun yang konsisten di desktop dan mobile, menyediakan halaman `/akun` berisi ringkasan profil, serta mengaktifkan item Akun pada navigasi bawah mobile. Halaman profil hanya menampilkan data dari sesi API yang sudah tersedia; pengubahan data akun belum termasuk.

## File terdampak

- `src/modules/akun/components/AccountMenu.vue`
- `src/modules/akun/pages/AkunPage.vue`
- `src/modules/akun/README.md`
- `src/modules/beranda/components/DesktopHeader.vue`
- `src/modules/beranda/components/MobileHeader.vue`
- `src/modules/beranda/components/MobileBottomNav.vue`
- Navigasi logo/kategori pada `DesktopHeader.vue` dan logo `MobileHeader.vue`
- `src/modules/beranda/README.md`
- `src/router/routes.js`
- `docs/plans/PLAN-07-account-menu-and-profile.md`
- `docs/CHANGELOG.md`

## Langkah

1. Buat komponen menu akun yang menampilkan ringkasan akun, tautan profil, dan aksi keluar.
2. Gunakan komponen tersebut pada header desktop dan mobile.
3. Buat halaman profil baca-saja dan arahkan pengguna tamu ke `/masuk` setelah pemeriksaan autentikasi selesai.
4. Aktifkan tautan Akun di navigasi bawah mobile dan tandai halaman aktif.
5. Dokumentasikan modul dan perubahan.

## Risiko dan dependensi

- Data profil tersedia setelah pemulihan Bearer token selesai; halaman menampilkan status memuat sebelum menentukan redirect.
- Pengeditan nama, email, password, atau preferensi memerlukan kontrak API tersendiri dan berada di luar scope.
- Halaman akun harus tetap aman untuk SSR dan tidak membaca browser storage secara langsung.

## Pengujian dan acceptance criteria

- Menu akun bekerja dengan mouse, keyboard, dan sentuhan.
- Desktop dan mobile menampilkan menu akun yang sama.
- Tautan profil membuka `/akun`; tamu diarahkan ke `/masuk`.
- Profil menampilkan nama, username, dan email dari user store tanpa mock.
- Keluar mencabut token melalui alur auth yang sudah ada.
- Navigasi bawah menandai Beranda atau Akun sesuai route.
- ESLint dan SSR build berhasil.

## Hasil pemeriksaan

- ESLint pada komponen dan route terdampak: lulus.
- Quasar SSR build: lulus.
- Impeccable detector pada komponen akun dan header: tidak menemukan temuan.
- Interaksi browser nyata pada desktop dan mobile belum diperiksa.
