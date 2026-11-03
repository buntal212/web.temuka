# Aturan Frontend web.temuka

## Teknologi dan modul

- Gunakan Vue 3 Composition API, script setup, Quasar, JavaScript ES Modules, Pinia bila diperlukan, Axios, dan SCSS.
- Gunakan satu folder fitur untuk setiap menu atau submenu. Komponen khusus fitur tinggal di modul; komponen bersama berada di shared.
- Jangan membuat file atau folder kosong. Setiap modul yang diimplementasikan memiliki README.md berisi tujuan, route, komponen, API, alur data, state, dan cara menguji.
- Gunakan service API per modul dan konfigurasi Axios terpusat. Base URL berasal dari VITE_API_BASE_URL.
- Nyatakan props dan emits secara eksplisit. Jangan gunakan Pinia untuk state lokal sederhana.

## UI dan customer experience

- Utamakan mobile-first, aksesibilitas, label form, navigasi keyboard, dan feedback tindakan.
- Tangani loading, empty, success, dan error state.
- Halaman detail publik dirancang memiliki URL yang dapat dibagikan dan metadata relevan.
- Jangan membangun fitur marketplace pada foundation awal.

## Quasar SSR dan SEO

- Pastikan kode aman dirender di server dan saat hidrasi.
- Jangan membaca window, document, atau localStorage dalam proses render server.
- Periksa kompatibilitas SSR sebelum menambah dependency browser-only.
- Gunakan metadata unik serta canonical URL bila sesuai.
- Jangan mewajibkan login pada fitur publik tanpa alasan produk.
- Jangan mengekspos data merchant yang belum disetujui untuk publikasi.

## Keamanan dan pengujian

- Jangan hardcode secret, token, server URL, atau endpoint yang belum disepakati.
- Backend tetap pemilik validasi, aturan bisnis, dan otorisasi.
- Plan fitur menentukan lint, build SSR, route, serta skenario UI yang perlu diperiksa. Laporkan hasil aktual.
