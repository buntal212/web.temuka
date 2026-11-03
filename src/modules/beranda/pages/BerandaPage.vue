<template>
  <q-page class="homepage">
    <DesktopHeader />
    <MobileHeader />

    <main>
      <HeroSection
        v-model="searchTerm"
        :has-searched="hasSearched"
        :result-count="visibleRecommendations.length"
        @search="submitSearch"
      />

      <CategoryShortcutGrid
        id="kategori"
        :categories="categories"
        :selected-category="selectedCategory"
        @select="selectCategory"
      />

      <BenefitSection :benefits="benefits" />

      <RecommendationSection
        :items="visibleRecommendations"
        :has-filter="hasFilter"
        :filter-description="filterDescription"
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

const searchTerm = ref('')
const selectedCategory = ref('')
const hasSearched = ref(false)

const hasFilter = computed(() => hasSearched.value || Boolean(selectedCategory.value))

const filterDescription = computed(() => {
  const parts = []
  if (hasSearched.value && searchTerm.value.trim())
    parts.push(`kata kunci “${searchTerm.value.trim()}”`)
  if (selectedCategory.value) parts.push(`kategori ${selectedCategory.value}`)
  return parts.join(' · ') || 'semua contoh'
})

const visibleRecommendations = computed(() => {
  if (!hasFilter.value) return recommendations

  const query = hasSearched.value ? searchTerm.value.trim().toLocaleLowerCase('id-ID') : ''

  return recommendations.filter((item) => {
    const matchesQuery =
      !query ||
      [item.name, item.category, item.provider, item.location]
        .join(' ')
        .toLocaleLowerCase('id-ID')
        .includes(query)
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value

    return matchesQuery && matchesCategory
  })
})

function submitSearch() {
  hasSearched.value = true
  selectedCategory.value = ''
}

function selectCategory(category) {
  selectedCategory.value = selectedCategory.value === category ? '' : category
  searchTerm.value = ''
  hasSearched.value = false
}

function clearFilters() {
  searchTerm.value = ''
  selectedCategory.value = ''
  hasSearched.value = false
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
