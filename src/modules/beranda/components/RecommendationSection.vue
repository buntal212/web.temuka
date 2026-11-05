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

    <!-- Items Grid -->
    <div v-else-if="items.length" class="recommendation-grid">
      <ProductCard
        v-for="(item, idx) in items"
        :key="item.id || idx"
        :item="item"
      />
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
})

defineEmits(['clear-filter'])
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
