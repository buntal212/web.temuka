<template>
  <section
    id="rekomendasi"
    class="section-shell recommendation-section section-space"
    aria-labelledby="recommendation-title"
  >
    <div class="recommendation-section__heading">
      <div>
        <p class="eyebrow">Pilihan untuk dijelajahi</p>
        <h2 id="recommendation-title" class="section-heading">
          {{ hasSearched ? 'Hasil Pencarian Katalog' : 'Temukan inspirasi hari ini' }}
        </h2>
        <p class="section-copy">
          {{
            hasSearched
              ? 'Hasil pencarian dihimpun secara bertahap dari berbagai aplikasi sumber Udumbara.'
              : 'Ini adalah data demonstrasi untuk memperlihatkan tampilan Temuka, bukan daftar penawaran nyata.'
          }}
        </p>
      </div>
      <q-btn
        v-if="hasFilter"
        flat
        color="secondary"
        label="Hapus filter"
        icon-right="close"
        @click="$emit('clear-filter')"
      />
    </div>

    <p v-if="hasFilter" class="recommendation-section__filter" aria-live="polite">
      Filter aktif: <strong>{{ filterDescription }}</strong>
    </p>

    <!-- Loading state when searching and no items yet -->
    <div v-if="isSearching && !items.length" class="recommendation-empty" role="status">
      <q-spinner-dots size="2.5rem" color="primary" />
      <p>Sedang mencari dan mengumpulkan penawaran dari sumber-sumber terkait...</p>
    </div>

    <!-- Connection error state (network or backend failure) -->
    <div v-else-if="searchError && !items.length" class="recommendation-error" role="alert">
      <q-icon name="cloud_off" size="2.5rem" color="negative" aria-hidden="true" />
      <h3>Gangguan Koneksi ke Server</h3>
      <p>{{ searchError }}</p>
      <q-btn
        color="primary"
        unelevated
        label="Coba Lagi"
        icon="refresh"
        :disable="isSearching"
        @click="$emit('retry')"
      />
    </div>

    <!-- All sources failed state -->
    <div v-else-if="isAllFailed && !items.length" class="recommendation-error" role="alert">
      <q-icon name="report_problem" size="2.5rem" color="negative" aria-hidden="true" />
      <h3>Layanan Sumber Mengalami Gangguan</h3>
      <p>Seluruh aplikasi sumber saat ini tidak dapat merespon pencarian. Silakan coba beberapa saat lagi.</p>
      <q-btn
        color="primary"
        unelevated
        label="Coba Lagi"
        icon="refresh"
        :disable="isSearching"
        @click="$emit('retry')"
      />
    </div>

    <!-- Items Grid -->
    <div v-else-if="items.length">
      <!-- Partial failure notice -->
      <div v-if="hasPartialFailure" class="recommendation-notice" role="alert">
        <q-icon name="warning_amber" size="1.25rem" />
        <span>Sebagian sumber mengalami gangguan. Menampilkan hasil dari sumber yang berhasil.</span>
      </div>

      <div class="recommendation-grid">
        <ProductCard
          v-for="(item, idx) in items"
          :key="item.id || idx"
          :item="item"
        />
      </div>
    </div>

    <!-- Empty Result State -->
    <div v-else class="recommendation-empty" role="status">
      <q-icon name="search_off" size="2rem" aria-hidden="true" />
      <p>Tidak ada hasil yang cocok dengan kata kunci atau kategori yang dicari.</p>
      <q-btn flat color="secondary" label="Tampilkan semua contoh" @click="$emit('clear-filter')" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  items: { type: Array, required: true },
  hasFilter: { type: Boolean, default: false },
  filterDescription: { type: String, default: '' },
  isSearching: { type: Boolean, default: false },
  hasSearched: { type: Boolean, default: false },
  searchError: { type: String, default: null },
  isAllFailed: { type: Boolean, default: false },
  hasPartialFailure: { type: Boolean, default: false },
})

defineEmits(['clear-filter', 'retry'])
</script>

<style scoped lang="scss">
.recommendation-section {
  position: relative;
}

.recommendation-section__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.recommendation-section__filter {
  margin: 1.25rem 0 0;
  color: var(--temuka-on-dark-muted);
  font-size: 0.9rem;
}

.recommendation-section__filter strong {
  color: var(--temuka-gold);
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(1.75rem, 3.5vw, 2.5rem);
}

.recommendation-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: clamp(2.5rem, 6vw, 4rem) 1.5rem;
  margin-top: 1.5rem;
  border-radius: var(--temuka-radius-card);
  border: 1px dashed rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.05);
  text-align: center;
  color: var(--temuka-on-dark);

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: var(--temuka-on-dark-muted);
    max-width: 32rem;
    line-height: 1.5;
  }
}

.recommendation-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.08);
  color: #fbbf24;
  font-size: 0.9rem;
  line-height: 1.4;
}

.recommendation-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  margin-top: 2rem;
  border: 1px dashed var(--temuka-border);
  border-radius: var(--temuka-radius-card);
  background: var(--temuka-surface);
  text-align: center;
  color: var(--temuka-muted);
  gap: 0.75rem;
}

.recommendation-empty p {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 1023.98px) {
  .recommendation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599.98px) {
  .recommendation-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .recommendation-section__heading {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
