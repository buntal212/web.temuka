# Fondasi Integrasi UIH — Temuka Frontend

**Dokumen Status:** Approved Technical Reference  
**Target Repository:** `/home/duro/projects/AIPrijects/temuka/web.temuka`  
**Dokumen Acuan Utama:** [UIH Real ASU Integration Foundation Plan](../../../../uih/api.uih/docs/integrations/REAL_ASU_INTEGRATION_FOUNDATION_PLAN.md)  
**Dokumen Arsitektur Lokal:** [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md) & [`docs/API-CONTRACT.md`](../API-CONTRACT.md)

---

## 1. Peran Temuka Frontend dalam Integrasi

Temuka Frontend (`web.temuka`) adalah antarmuka web (Quasar Framework SSR) yang menyajikan pengalaman penemuan katalog publik kepada pengguna akhir. Frontend mengonsumsi agregasi katalog multi-sumber dari Temuka Backend (`api.temuka`) melalui protokol Server-Sent Events (SSE).

Temuka Frontend **tidak pernah** berkomunikasi langsung dengan UIH atau aplikasi sumber (ASU), melainkan berinteraksi secara eksklusif dengan Temuka Backend:

```
[Browser: web.temuka]
         │
         ▲ (SSE Stream: Event-Driven Progressive Catalog)
         │
[Temuka Backend: api.temuka]
         │
[UIH Backend: api.uih]
```

---

## 2. Event SSE & Kontrak Katalog Kanonik v1

Frontend telah dimigrasikan untuk mematuhi **UIH Canonical Catalog Contract v1** melalui siklus event SSE:

| Event SSE | Payload Utama | Peran di Frontend |
| :--- | :--- | :--- |
| `search_init` | `search_id`, `targets: string[]` | Menginisialisasi chip status sumber dengan status *pending*. |
| `source_result` | `source: { code, name }`, `meta: { total }`, `data: CanonicalItem[]` | Menghimpun kartu produk ke hasil pencarian secara progresif dan memperbarui chip sumber menjadi *completed*. |
| `source_failed` | `source: string`, `error_code`, `message` | Menandai chip sumber menjadi *failed* tanpa menghapus hasil yang telah diterima. |
| `search_done` | `search_id`, `total_items`, `summary` | Menandai akhir pencarian dan mematikan indikator pemuatan. |

### Atribut Kanonik Item pada Komponen Kartu Produk (`ProductCard.vue`):
- `item.name`: Judul produk/menu utama.
- `item.category`: Badge kategori (jika bernilai `null`, elemen diabaikan tanpa fallback dummy).
- `item.price`: Diformat sebagai integer mata uang IDR (`item.price.amount` & `item.price.currency`).
- `item.image.url`: Foto item (jika `null`, menampilkan fallback ikon frame SVG bersih tanpa placeholder gambar eksternal palsu).
- `item.provider.name`: Nama warung atau penyedia.
- `item.provider.location.address`: Alamat lokasi penyedia (di-omit jika `null`).
- `item.availability`: Status ketersediaan produk (`'available'` vs `'unavailable'`).
- `source.name` / `source.code`: Badge identitas sumber penyedia.

---

## 3. Fase Integrasi yang Relevan

Berdasarkan dokumen rencana induk di UIH ([`REAL_ASU_INTEGRATION_FOUNDATION_PLAN.md`](../../../../uih/api.uih/docs/integrations/REAL_ASU_INTEGRATION_FOUNDATION_PLAN.md)), fase kerja yang melibatkan Temuka Frontend meliputi:

1. **Fase 0 — Docker Networking Baseline & Preflight:**
   Menjalankan container frontend `temuka-web-dev` pada port 9000 yang terhubung ke jaringan pengembangan.
2. **Fase 5 — Temuka Frontend Source Handling & Robustness:**
   - Menjamin antarmuka siap menerima kode sumber nyata (seperti `'larissama'`) tanpa ketergantungan pada kode mock lama (`'mock_larissama'`).
   - Mempertahankan invarian pencarian: debounce 600 ms, *Latest Search Wins* selama debounce maupun saat request in-flight, dan reset cepat saat input dikosongkan.
3. **Fase 6 — Integrasi Real Adapter Larissama (End-to-End Test):**
   Verifikasi visual di browser desktop dan mobile bahwa data kuliner nyata dari Larissama tertampil rapi dan proporsional.
4. **Fase 7 — Verifikasi Komprehensif & Observabilitas:**
   Pengujian performa render browser saat menerima stream multi-sumber secara simultan.

---

## 4. Pengelolaan Dokumentasi

Dokumentasi spesifik Temuka Frontend (standar kode, panduan Quasar, desain sistem beranda, dan aturan frontend) tetap dikelola di repositori ini:
- Standar Koding: [`docs/CODING-STANDARDS.md`](../CODING-STANDARDS.md)
- Arsitektur Frontend: [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
- Rencana Fitur Beranda: [`docs/plans/PLAN-02-progressive-catalog-search.md`](../plans/PLAN-02-progressive-catalog-search.md)

Rincian menyeluruh mengenai arsitektur agregasi multi-ASU dan rencana teknis UIH dapat dilihat pada:
👉 **[REAL_ASU_INTEGRATION_FOUNDATION_PLAN.md](../../../../uih/api.uih/docs/integrations/REAL_ASU_INTEGRATION_FOUNDATION_PLAN.md)**
