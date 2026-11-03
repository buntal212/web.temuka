<template>
  <section
    id="jelajahi"
    class="section-shell category-explorer section-space"
    aria-labelledby="explorer-title"
  >
    <div class="category-explorer__heading">
      <div>
        <p class="eyebrow">Jelajahi lebih jauh</p>
        <h2 id="explorer-title" class="section-heading">Ide untuk kebutuhan berikutnya</h2>
        <p class="section-copy">Kenali beragam kategori melalui contoh visual berikut.</p>
      </div>
    </div>

    <p v-if="selectedCategory" class="explorer-filter" role="status">
      Filter contoh aktif: <strong>{{ selectedCategory }}</strong
      >.
      <a href="#rekomendasi">Lihat hasil rekomendasi</a>
    </p>

    <div class="explorer-grid">
      <button
        v-for="category in categories"
        :id="`jelajah-${category.category.toLowerCase()}`"
        :key="category.category"
        class="explorer-card"
        :class="{ 'is-selected': selectedCategory === category.category }"
        type="button"
        :aria-pressed="selectedCategory === category.category"
        @click="$emit('select', category.category)"
      >
        <q-img :src="category.image" :alt="category.imageAlt" ratio="1.12" loading="lazy">
          <template #error
            ><div class="explorer-card__fallback"><q-icon name="image" /></div
          ></template>
        </q-img>
        <span class="explorer-card__shade"></span>
        <span class="explorer-card__content">
          <span class="explorer-card__category">{{ category.category }}</span>
          <strong>{{ category.title }}</strong>
          <span>{{ category.description }}</span>
        </span>
        <q-icon class="explorer-card__arrow" name="arrow_forward" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, default: '' },
})

defineEmits(['select'])
</script>

<style scoped lang="scss">
.explorer-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.explorer-card {
  position: relative;
  overflow: hidden;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: var(--temuka-radius-card);
  background: var(--temuka-background);
  color: white;
  cursor: pointer;
  text-align: left;
}

.explorer-card :deep(.q-img) {
  transition: transform 250ms ease;
}

.explorer-card:hover :deep(.q-img) {
  transform: scale(1.035);
}

.explorer-filter {
  margin: 1rem 0 0;
  color: var(--temuka-on-dark-muted);
  font-size: 0.85rem;
}

.explorer-filter strong,
.explorer-filter a {
  color: var(--temuka-gold);
  font-weight: 750;
}

.explorer-card__shade {
  position: absolute;
  inset: 25% 0 0;
  background: linear-gradient(transparent, rgb(18 37 33 / 88%));
}

.explorer-card__content {
  position: absolute;
  inset: auto 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.explorer-card__category {
  color: var(--temuka-gold);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.explorer-card__content strong {
  font-size: 1.1rem;
  line-height: 1.2;
}

.explorer-card__content > span:last-child {
  color: rgb(255 255 255 / 82%);
  font-size: 0.8rem;
  line-height: 1.45;
}

.explorer-card__arrow {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 50%;
  background: var(--temuka-background-raised);
  color: var(--temuka-gold);
}

.explorer-card__fallback {
  display: grid;
  min-height: 13rem;
  place-items: center;
  background: var(--temuka-primary);
  color: white;
  font-size: 2rem;
}

@media (max-width: 1023.98px) {
  .explorer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599.98px) {
  .category-explorer {
    padding-block: 3.5rem;
  }

  .explorer-grid {
    gap: 0.7rem;
    margin-top: 1.35rem;
  }

  .explorer-card {
    border-radius: 1rem;
  }

  .explorer-card__content {
    inset-inline: 0.75rem;
    bottom: 0.75rem;
  }

  .explorer-card__content strong {
    font-size: 0.95rem;
  }

  .explorer-card__content > span:last-child {
    font-size: 0.72rem;
  }
}

.explorer-card.is-selected {
  outline: 3px solid var(--temuka-primary);
  outline-offset: 3px;
}
</style>
