<template>
  <section class="section-shell category-shortcuts" aria-labelledby="shortcut-title">
    <div class="category-shortcuts__heading">
      <div>
        <p class="eyebrow">Mulai dari yang kamu cari</p>
        <h2 id="shortcut-title" class="section-heading">Jelajahi kebutuhanmu</h2>
      </div>
      <p class="category-shortcuts__hint">Pilih kategori untuk menyaring contoh pilihan.</p>
    </div>

    <div class="category-grid">
      <button
        v-for="category in categories"
        :id="category.id"
        :key="category.value"
        class="category-shortcut"
        :class="{ 'is-selected': selectedCategory === category.value }"
        type="button"
        :aria-pressed="selectedCategory === category.value"
        @click="$emit('select', category.value)"
      >
        <span :class="['category-shortcut__icon', `category-shortcut__icon--${category.tone}`]">
          <q-icon :name="category.icon" aria-hidden="true" />
        </span>
        <span>{{ category.label }}</span>
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
.category-shortcuts {
  padding-block: 1.5rem 3.75rem;
}

.category-shortcuts__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-shortcuts__hint {
  margin: 0 0 0.3rem;
  color: var(--temuka-on-dark-muted);
  font-size: 0.85rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 0.75rem;
}

.category-shortcut {
  display: flex;
  min-width: 0;
  min-height: 6.7rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.6rem 0.25rem;
  border: 1px solid transparent;
  border-radius: 1rem;
  background: transparent;
  color: var(--temuka-on-dark);
  cursor: pointer;
  font-size: 0.76rem;
  font-weight: 700;
  text-align: center;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
}

.category-shortcut:hover,
.category-shortcut.is-selected {
  border-color: var(--temuka-dark-border);
  background: var(--temuka-background-raised);
  transform: translateY(-2px);
}

.category-shortcut__icon {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border-radius: 50%;
  background: var(--temuka-surface);
  color: var(--temuka-primary);
  font-size: 1.2rem;
  box-shadow: 0 0.2rem 0.9rem rgb(32 58 54 / 6%);
}

.category-shortcut__icon--food {
  background: var(--temuka-icon-food-bg);
  color: var(--temuka-icon-food);
}

.category-shortcut__icon--property {
  background: var(--temuka-icon-property-bg);
  color: var(--temuka-icon-property);
}

.category-shortcut__icon--vehicle {
  background: var(--temuka-icon-vehicle-bg);
  color: var(--temuka-icon-vehicle);
}

.category-shortcut__icon--laundry {
  background: var(--temuka-icon-laundry-bg);
  color: var(--temuka-icon-laundry);
}

.category-shortcut__icon--service {
  background: var(--temuka-icon-service-bg);
  color: var(--temuka-icon-service);
}

.category-shortcut__icon--store {
  background: var(--temuka-icon-store-bg);
  color: var(--temuka-icon-store);
}

.category-shortcut__icon--health {
  background: var(--temuka-icon-health-bg);
  color: var(--temuka-icon-health);
}

.category-shortcut__icon--education {
  background: var(--temuka-icon-education-bg);
  color: var(--temuka-icon-education);
}

.category-shortcut__icon--hobby {
  background: var(--temuka-icon-hobby-bg);
  color: var(--temuka-icon-hobby);
}

.category-shortcut__icon--other {
  background: var(--temuka-icon-other-bg);
  color: var(--temuka-icon-other);
}

.category-shortcut.is-selected .category-shortcut__icon {
  background: var(--temuka-primary);
  color: white;
}

@media (max-width: 1023.98px) {
  .category-shortcuts {
    padding-block: 0.75rem 3.5rem;
  }

  .category-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    row-gap: 0.25rem;
  }
}

@media (max-width: 599.98px) {
  .category-shortcuts {
    width: min(100% - 1.5rem, 38rem);
  }

  .category-shortcuts__heading {
    align-items: start;
    margin-bottom: 0.9rem;
  }

  .category-shortcuts__hint {
    display: none;
  }

  .category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 0.35rem;
    row-gap: 0.2rem;
  }

  .category-shortcut {
    min-height: 5.75rem;
    gap: 0.35rem;
    font-size: 0.68rem;
  }

  .category-shortcut__icon {
    width: 2.65rem;
    height: 2.65rem;
    font-size: 1.2rem;
  }
}
</style>
