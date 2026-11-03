# web.temuka

Website publik TEMUKA untuk membantu pelanggan menjelajahi produk dan layanan dari beragam kategori.
Project menggunakan Vue 3, Quasar, dan server-side rendering (SSR).

## Menjalankan project

```bash
npm install
npm run dev
```

Mode pengembangan memakai Quasar SSR. Lihat `docs/DEVELOPMENT.md` untuk prasyarat runtime dan panduan lebih lengkap.

## Status saat ini

Foundation Quasar SSR sudah terpasang. Homepage awal menampilkan design system TEMUKA dan data demonstrasi lokal. Data tersebut bukan penawaran atau daftar merchant nyata. Integrasi produk dan pencarian menunggu kontrak endpoint dari API Temuka.

## Struktur penting

- `src/modules/beranda/`: halaman, komponen, dan data demonstrasi beranda.
- `src/shared/services/`: client Axios bersama untuk integrasi API yang disepakati.
- `src/css/`: token warna dan style global.
- `docs/plans/`: rencana pekerjaan.
- `docs/rules/FRONTEND.md`: aturan frontend.

## Dokumentasi

- `docs/ARCHITECTURE.md`: batas tanggung jawab dan arah struktur.
- `docs/CODING-STANDARDS.md`: standar penulisan kode.
- `docs/DEVELOPMENT.md`: panduan development.
- `docs/API-CONTRACT.md`: status kontrak API.
- `docs/CHANGELOG.md`: catatan perubahan.
- `docs/plans/PLAN-00-foundation.md`: foundation awal.
- `docs/plans/PLAN-01-homepage-design-system.md`: design system dan homepage.
