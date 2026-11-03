<template>
  <section
    id="rekomendasi"
    class="section-shell recommendation-section section-space"
    aria-labelledby="recommendation-title"
  >
    <div class="recommendation-section__heading">
      <div>
        <p class="eyebrow">Pilihan untuk dijelajahi</p>
        <h2 id="recommendation-title" class="section-heading">Temukan inspirasi hari ini</h2>
        <p class="section-copy">
          Ini adalah data demonstrasi untuk memperlihatkan tampilan Temuka, bukan daftar penawaran
          nyata.
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
      Filter demo: <strong>{{ filterDescription }}</strong>
    </p>

    <div v-if="items.length" class="recommendation-grid">
      <ProductCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <div v-else class="recommendation-empty" role="status">
      <q-icon name="search_off" size="2rem" aria-hidden="true" />
      <p>Tidak ada hasil di data demonstrasi. Coba kata kunci atau kategori lain.</p>
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
})

defineEmits(['clear-filter'])
</script>

<style scoped lang="scss">
.recommendation-section__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
}

.recommendation-section__filter {
  margin: 1.4rem 0 0;
  color: var(--temuka-on-dark-muted);
  font-size: 0.85rem;
}

.recommendation-section__filter strong {
  color: var(--temuka-on-dark);
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.recommendation-empty {
  display: grid;
  min-height: 14rem;
  justify-items: center;
  align-content: center;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px dashed var(--temuka-dark-border);
  border-radius: var(--temuka-radius-card);
  background: var(--temuka-background-raised);
  color: var(--temuka-on-dark-muted);
  text-align: center;
}

.recommendation-empty p {
  max-width: 25rem;
  margin: 0.75rem 0 0;
  line-height: 1.6;
}

@media (max-width: 1023.98px) {
  .recommendation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599.98px) {
  .recommendation-section {
    padding-block: 3.5rem;
  }

  .recommendation-section__heading {
    align-items: start;
  }

  .recommendation-section__heading :deep(.q-btn) {
    flex: 0 0 auto;
    padding-inline: 0.2rem;
    font-size: 0.75rem;
  }

  .recommendation-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin-top: 1.4rem;
  }
}
</style>
