# Arsitektur web.temuka

## Tujuan dan batas

web.temuka adalah website marketplace publik pelanggan dengan Quasar SSR. Fungsi dashboard internal berada di admin.temuka. Aturan bisnis, otorisasi, dan akses database berada di backend Temuka.

## Susunan fitur

Ikuti struktur Quasar untuk entry point, router, layout, boot, stylesheet, dan berkas SSR. Halaman serta logika fitur dikelompokkan pada src/modules. Komponen khusus fitur tinggal di modul tersebut; komponen lintas fitur berada di src/shared. Buat services, stores, composables, atau utils hanya saat dibutuhkan.

## SSR dan API

Kode harus aman untuk render server dan hidrasi client. Metadata halaman publik ditetapkan per halaman. API client mengikuti konfigurasi environment dan kontrak yang disepakati. Data atau header khusus pengguna tidak boleh berbagi state antar-request SSR.

Boot file Axios membuat instance baru untuk setiap instance aplikasi, lalu menyediakannya melalui dependency injection dengan key temukaApi. Base URL berasal dari VITE_API_BASE_URL. Prefix VITE_ ditambahkan sebagai prefix client Quasar; nilainya akan terlihat di browser dan tidak boleh berisi secret.

## Status

Ini rancangan awal. Detail runtime, konfigurasi Quasar, dan deployment dilengkapi setelah scaffold tersedia.
