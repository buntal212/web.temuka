# Aturan Kerja web.temuka

Aturan ini berlaku mandiri di repository website publik TEMUKA.

## Plan dan persetujuan

1. Periksa source, aturan, dokumentasi, dependency, branch, dan working tree sebelum mengubah project.
2. Buat atau perbarui plan bernomor di docs/plans. Jelaskan tujuan, scope, file terdampak, langkah, risiko, dependensi, testing, dan acceptance criteria.
3. Gunakan status DRAFT, APPROVED, IN_PROGRESS, BLOCKED, dan DONE.
4. Jangan mengubah kode, konfigurasi, dependency, database, atau Git sebelum pengguna menyetujui plan secara eksplisit.
5. Kerjakan hanya scope yang disetujui. Perbarui plan jika scope berubah.

## Standar dan batas tanggung jawab

- Gunakan kode sederhana, mudah dibaca, dan identifier berbahasa Inggris yang jelas.
- Satu menu atau submenu memiliki folder fitur sendiri. Komponen lokal berada di modul; komponen bersama berada di shared.
- Jangan membuat folder atau file kosong tanpa kebutuhan.
- Dokumentasi ditulis dalam bahasa Indonesia. Modul yang diimplementasikan memiliki README.md.
- Website ini melayani halaman publik pelanggan; jangan tambahkan fungsi administrasi internal.
- Akses data melalui API Temuka. Jangan mengakses database atau integrasi Larisama, AdaAset, dan Londrian secara langsung.
- Jangan menampilkan data merchant yang belum disetujui untuk publikasi.

## SSR dan keamanan

- Pastikan kode aman dijalankan pada server Quasar SSR.
- Jangan mengakses window, document, atau localStorage pada jalur render server.
- Jangan menyimpan secret, token, atau data privat dalam source.
- Backend tetap menjadi sumber kebenaran untuk validasi dan hak akses.

## Git, testing, dan selesai

- Periksa Git sebelum bekerja. Gunakan develop untuk pengembangan jika repository sudah memiliki branch tersebut.
- Jangan menimpa perubahan pengguna atau mengubah branch yang sudah ada tanpa izin.
- Jangan commit, push, merge, atau deploy tanpa izin.
- Plan mencantumkan pemeriksaan yang relevan. Laporkan hanya lint, build, dan test yang benar-benar dijalankan.
- Pekerjaan selesai jika acceptance criteria terpenuhi, pemeriksaan dilaporkan, dokumentasi diperbarui, scope terjaga, dan hasil disampaikan.
