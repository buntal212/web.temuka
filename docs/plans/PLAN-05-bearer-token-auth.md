# PLAN-05 — Autentikasi Bearer Token web.temuka

**Status: IN_PROGRESS**
**Plan pasangan:** `api.temuka/docs/plans/PLAN-05-bearer-token-auth.md`

## Tujuan dan scope

Mengganti integrasi autentikasi browser dari cookie/CSRF ke personal access token Sanctum. Perubahan mencakup pemanggilan daftar, masuk, pemulihan profil setelah reload, dan logout. UI form dan marketplace tidak diubah.

## File terdampak

- `src/shared/services/api-client.js`
- `src/App.vue`
- `src/modules/auth/services/auth-service.js`
- `src/modules/auth/stores/auth-store.js`
- `src/modules/auth/pages/LoginPage.vue`
- `src/modules/auth/pages/RegisterPage.vue`
- `src/modules/auth/README.md`
- `docs/API-CONTRACT.md`, `docs/CHANGELOG.md`

## Implementasi

1. Hapus pengiriman credential cookie dan permintaan CSRF.
2. Simpan token per tab di `sessionStorage`; akses storage hanya dari aksi yang berjalan di browser.
3. Pasang Bearer header pada request terlindungi dan hapus token saat logout atau token tidak valid.
4. Selaraskan kontrak API dan dokumentasi modul.

## Risiko dan dependensi

- XSS pada halaman dapat membaca token di session storage; gunakan HTTPS dan pertahankan sanitasi serta praktik aman frontend.
- API memberikan `data.user` dan `data.token` saat login sesuai kontrak pasangan; pendaftaran mengembalikan profil akun tanpa token.
- CORS API harus mengizinkan origin web dan header Authorization.

## Verifikasi dan acceptance criteria

- Daftar dan masuk mengirim request tanpa cookie CSRF.
- Token dipakai untuk `/auth/me` dan logout.
- Reload memulihkan profil melalui token; tab baru tidak mewarisi token.
- SSR tidak membaca browser storage atau mengirim token.
- ESLint dan SSR build lulus; uji browser lintas-origin berhasil.

## Catatan verifikasi

Belum diverifikasi setelah perubahan ini.
