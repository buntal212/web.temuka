<template>
  <q-page class="homepage">
    <DesktopHeader />
    <MobileHeader />

    <main>
      <HeroSection
        v-model="searchTerm"
        :has-searched="hasSearched"
        :is-searching="isSearching"
        :sources-status="sourcesStatus"
        :result-count="displayItems.length"
        @search="triggerSearchNow"
      />

      <CategoryShortcutGrid
        id="kategori"
        :categories="categories"
        :selected-category="selectedCategory"
        @select="selectCategory"
      />

      <BenefitSection :benefits="benefits" />

      <RecommendationSection
        :items="displayItems"
        :has-filter="hasFilter"
        :filter-description="filterDescription"
        :is-searching="isSearching"
        :has-searched="hasSearched"
        @clear-filter="clearFilters"
      />

      <CategoryExplorer
        :categories="exploreCategories"
        :selected-category="selectedCategory"
        @select="selectCategory"
      />
      <PromoSection />
    </main>

    <AppFooter />
    <MobileBottomNav />
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMeta } from 'quasar'
import AppFooter from '../components/AppFooter.vue'
import BenefitSection from '../components/BenefitSection.vue'
import CategoryExplorer from '../components/CategoryExplorer.vue'
import CategoryShortcutGrid from '../components/CategoryShortcutGrid.vue'
import DesktopHeader from '../components/DesktopHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import MobileBottomNav from '../components/MobileBottomNav.vue'
import MobileHeader from '../components/MobileHeader.vue'
import PromoSection from '../components/PromoSection.vue'
import RecommendationSection from '../components/RecommendationSection.vue'
import { useCatalogSearch } from '../composables/useCatalogSearch'
import { benefits, categories, exploreCategories, recommendations } from '../data/homepageMockData'

useMeta({
  title: 'Temuka — Temukan Apa yang Kamu Butuhkan',
  meta: {
    description: {
      name: 'description',
      content:
        'Temukan makanan, properti, kendaraan, laundry, dan berbagai layanan dalam satu portal Temuka.',
    },
    ogTitle: { property: 'og:title', content: 'Temuka — Temukan Apa yang Kamu Butuhkan' },
    ogDescription: {
      property: 'og:description',
      content: 'Jelajahi berbagai kebutuhan pelanggan dalam satu portal Temuka.',
    },
  },
})

const {
  searchTerm,
  isSearching,
  hasSearched,
  searchResults,
  sourcesStatus,
  triggerSearchNow,
} = useCatalogSearch()

const selectedCategory = ref('')

const hasFilter = computed(() => hasSearched.value || Boolean(selectedCategory.value))

const filterDescription = computed(() => {
  const parts = []
  if (hasSearched.value && searchTerm.value.trim()) {
    parts.push(`kata kunci “${searchTerm.value.trim()}”`)
  }
  if (selectedCategory.value) {
    parts.push(`kategori ${selectedCategory.value}`)
  }
  return parts.join(' · ') || 'semua contoh'
})

const displayItems = computed(() => {
  // If active search with query, show progressive catalog results
  if (hasSearched.value && searchTerm.value.trim()) {
    return searchResults.value
  }

  // If category is filtered
  if (selectedCategory.value) {
    return recommendations.filter((item) => item.category === selectedCategory.value)
  }

  // Default to initial recommendations
  return recommendations
})

function selectCategory(category) {
  selectedCategory.value = selectedCategory.value === category ? '' : category
  searchTerm.value = ''
}

function clearFilters() {
  searchTerm.value = ''
  selectedCategory.value = ''
}
</script>

<style scoped lang="scss">
.homepage {
  min-height: 100vh;
  background: var(--temuka-background);
}

@media (max-width: 599.98px) {
  .homepage {
    padding-bottom: 0;
  }
}
</style>
