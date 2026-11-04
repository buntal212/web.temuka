# Pengembangan web.temuka

## Kondisi saat ini

Project memakai Quasar CLI dengan Vite, Vue 3, Pinia, SCSS, ESLint, Prettier, Axios, dan mode SSR Hono. Quasar CLI memerlukan Node 22.22.0 atau lebih baru; Node 22.23.3 tersedia pada lingkungan pengembangan. Gunakan npm.cmd dari PowerShell.

## Menjalankan project melalui Docker (Direkomendasikan)

Pastikan shared network `temuka-uih-network` sudah dibuat:

```bash
docker network create temuka-uih-network 2>/dev/null || true
```

Jalankan container development web:

```bash
docker compose -p temuka-web-dev up -d --build
```

Container web akan berjalan pada port host `9000` (`http://localhost:9000`). Dependensi Node.js diinstal secara otomatis di dalam container jika belum tersedia.

Hentikan container:

```bash
docker compose -p temuka-web-dev stop
```

## Menjalankan project secara lokal (Host)

```powershell
npm.cmd run dev
```

Script dev project menjalankan Quasar dalam mode SSR.

Build SSR dapat dijalankan saat diperlukan, tetapi bukan syarat menyelesaikan foundation awal.

```powershell
npm.cmd run build
```

Pemeriksaan 2026-10-30:

- npm.cmd run lint lulus. Script ini menjalankan Prettier dan ESLint dengan auto-fix.
- Build SSR berhasil menurut laporan pengguna setelah dijalankan dari terminal lokal.

## Environment API

Salin .env.example menjadi .env.local untuk pengembangan lokal, lalu isi VITE_API_BASE_URL setelah alamat API disepakati. File .env.local diabaikan oleh Git. Nilai VITE_ dimasukkan ke aplikasi browser; jangan isi token atau secret.

## Alur perubahan

1. Baca AGENTS.md dan plan terkait.
2. Periksa branch dan working tree.
3. Dapatkan persetujuan atas plan sebelum mengubah project.
4. Implementasikan hanya scope yang disetujui.
5. Jalankan aplikasi dengan script dev. Jalankan lint/build jika diminta oleh plan fitur terkait.
6. Catat hasil dan perbarui dokumentasi.
