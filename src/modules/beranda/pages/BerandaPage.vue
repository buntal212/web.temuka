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
        :search-error="searchError"
        :is-all-failed="isAllFailed"
        :has-partial-failure="hasPartialFailure"
        @clear-filter="clearFilters"
        @retry="triggerSearchNow"
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
import AppFooter from 'src/modules/beranda/components/AppFooter.vue'
import BenefitSection from 'src/modules/beranda/components/BenefitSection.vue'
import CategoryExplorer from 'src/modules/beranda/components/CategoryExplorer.vue'
import CategoryShortcutGrid from 'src/modules/beranda/components/CategoryShortcutGrid.vue'
import DesktopHeader from 'src/modules/beranda/components/DesktopHeader.vue'
import HeroSection from 'src/modules/beranda/components/HeroSection.vue'
import MobileBottomNav from 'src/modules/beranda/components/MobileBottomNav.vue'
import MobileHeader from 'src/modules/beranda/components/MobileHeader.vue'
import PromoSection from 'src/modules/beranda/components/PromoSection.vue'
import RecommendationSection from 'src/modules/beranda/components/RecommendationSection.vue'
import { useCatalogSearch } from 'src/modules/beranda/composables/useCatalogSearch.js'
import { benefits, categories, exploreCategories, recommendations } from 'src/modules/beranda/data/homepageMockData.js'

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
  searchError,
  isAllFailed,
  hasPartialFailure,
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
