# Standar Kode web.temuka

- Gunakan Vue 3 Composition API, script setup, JavaScript ES Modules, Quasar, dan SCSS.
- Ikuti konvensi Quasar yang dihasilkan scaffold; jangan menambah abstraksi atau dependency tanpa kebutuhan.
- Gunakan nama identifier dan komponen bahasa Inggris yang deskriptif. Dokumentasi dan komentar penjelas ditulis dalam bahasa Indonesia.
- Deklarasikan props dan emits secara jelas. Pisahkan UI, akses API, dan logika yang dapat digunakan ulang.
- Letakkan komponen khusus fitur di modul fitur. Gunakan Pinia hanya untuk state lintas bagian aplikasi.
- Jangan memanggil Axios langsung dari komponen; gunakan API client dan service fitur.
- Tangani loading, empty, success, dan error state.
- Gunakan metadata unik dan canonical URL pada halaman publik yang relevan.
- Pastikan aksesibilitas, label form, navigasi keyboard, dan tata letak mobile-first.
- Hindari akses browser global ketika kode berjalan di server.
