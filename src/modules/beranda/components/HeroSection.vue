<template>
  <section id="beranda" class="hero-section">
    <div class="section-shell hero-section__grid">
      <div class="hero-section__content">
        <h1>Temukan Apa yang Kamu Butuhkan</h1>
        <p class="hero-section__description">
          Makanan enak, rumah impian, laundry terdekat, kendaraan, hingga berbagai layanan lainnya —
          semua ada di Temuka.
        </p>

        <form id="pencarian" class="search-panel" role="search" @submit.prevent="$emit('search')">
          <div class="search-panel__query">
            <q-input
              :model-value="modelValue"
              borderless
              dense
              class="search-panel__input"
              placeholder="Mau cari apa? makan, minum, laundry atau rumah?"
              aria-label="Cari kebutuhan"
              @update:model-value="$emit('update:modelValue', $event)"
            >
              <template #prepend>
                <q-icon name="search" color="primary" aria-hidden="true" />
              </template>
            </q-input>
          </div>

          <q-btn
            class="search-panel__submit"
            color="primary"
            unelevated
            type="submit"
            icon="search"
          >
            <span>Cari</span>
          </q-btn>
        </form>

        <div class="search-examples" aria-label="Contoh pencarian">
          <span>Coba:</span>
          <button
            v-for="example in examples"
            :key="example"
            type="button"
            @click="chooseExample(example)"
          >
            {{ example }}
          </button>
        </div>
        <div v-if="hasSearched || isSearching" class="search-progressive" role="status" aria-live="polite">
          <div v-if="isSearching" class="search-progressive__loading">
            <q-spinner-dots size="1.2rem" color="secondary" />
            <span>Mencari secara bertahap dari seluruh sumber...</span>
          </div>
          <div v-if="Object.keys(sourcesStatus).length > 0" class="search-progressive__chips">
            <span
              v-for="(info, srcKey) in sourcesStatus"
              :key="srcKey"
              class="source-chip"
              :class="'source-chip--' + info.status"
            >
              <q-spinner-tail v-if="info.status === 'pending'" size="0.75rem" />
              <q-icon v-else-if="info.status === 'completed'" name="check_circle" size="0.85rem" />
              <q-icon v-else-if="info.status === 'failed'" name="error_outline" size="0.85rem" />
              {{ info.name || formatSourceName(srcKey) }}:
              <strong v-if="info.status === 'completed'">{{ info.count }} hasil</strong>
              <strong v-else-if="info.status === 'failed'">Gagal</strong>
              <span v-else>Memuat...</span>
            </span>
          </div>
          <p class="search-status">
            {{ resultCount }} hasil ditemukan.
            <a href="#rekomendasi">Lihat hasil</a>
          </p>
        </div>
      </div>

      <div class="hero-collage" aria-label="Contoh visual kategori Temuka">
        <div class="hero-collage__main image-frame">
          <q-img
            :src="images.food"
            alt="Hidangan makanan sebagai ilustrasi kategori kuliner"
            ratio="1.13"
            fetchpriority="high"
            loading="eager"
          >
            <template #error
              ><div class="image-fallback"><q-icon name="restaurant" /></div
            ></template>
          </q-img>
          <span class="image-caption">Cerita rasa di sekitarmu</span>
        </div>
        <div class="hero-collage__home image-frame">
          <q-img :src="images.home" alt="Rumah sebagai ilustrasi kategori properti" ratio="1.25">
            <template #error
              ><div class="image-fallback"><q-icon name="home_work" /></div
            ></template>
          </q-img>
        </div>
        <div class="hero-collage__laundry image-frame">
          <q-img
            :src="images.laundry"
            alt="Pakaian bersih sebagai ilustrasi layanan laundry"
            ratio="1.1"
          >
            <template #error
              ><div class="image-fallback"><q-icon name="local_laundry_service" /></div
            ></template>
          </q-img>
          <span class="collage-note"><q-icon name="near_me" /> Banyak pilihan dekatmu</span>
        </div>
        <div class="hero-collage__accent" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  hasSearched: { type: Boolean, default: false },
  isSearching: { type: Boolean, default: false },
  resultCount: { type: Number, default: 0 },
  sourcesStatus: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:modelValue', 'search'])

const examples = ['Nasi ayam', 'Rumah dijual', 'Laundry kiloan']
const images = {
  food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=82',
  home: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=82',
  laundry:
    'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=82',
}

function chooseExample(value) {
  emit('update:modelValue', value)
}

function formatSourceName(code) {
  if (code === 'mock_larissama') return 'Kuliner'
  if (code === 'mock_laundry') return 'Laundry'
  if (code === 'mock_aset') return 'Aset'
  return code
}
</script>

<style scoped lang="scss">
.hero-section {
  overflow: hidden;
  background: var(--temuka-background);
  padding-block: clamp(2rem, 5vw, 4.75rem) clamp(3.25rem, 7vw, 6.25rem);
}

.hero-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(21rem, 0.92fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5.25rem);
}

.hero-section__content {
  position: relative;
  z-index: 1;
}

h1 {
  max-width: 40rem;
  margin: 0.9rem 0 0;
  color: white;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 780;
  letter-spacing: -0.07em;
  line-height: 0.98;
}

.hero-section__description {
  max-width: 37rem;
  margin: 1.25rem 0 1.75rem;
  color: rgb(255 255 255 / 82%);
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.7;
}

.search-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem;
  border: 1px solid var(--temuka-border);
  border-radius: 1.15rem;
  background: var(--temuka-surface);
  box-shadow: var(--temuka-shadow-card);
}

.search-panel__query {
  min-width: 0;
  padding-inline: 0.7rem;
}

.search-panel__label {
  display: block;
  margin: 0 0 0.2rem 0.6rem;
  color: var(--temuka-muted);
  font-size: 0.72rem;
  font-weight: 750;
}

.search-panel__submit {
  min-width: 6.25rem;
  min-height: 3.5rem;
}

.search-examples {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1rem;
  color: rgb(255 255 255 / 75%);
  font-size: 0.82rem;
}

.search-examples button {
  padding: 0.4rem 0.7rem;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 99px;
  background: rgb(255 255 255 / 5%);
  color: white;
  cursor: pointer;
}

.search-examples button:hover {
  border-color: var(--temuka-gold);
  color: var(--temuka-gold);
}

.search-status {
  margin: 0.85rem 0 0;
  color: rgb(255 255 255 / 78%);
  font-size: 0.84rem;
}

.search-status a {
  margin-left: 0.35rem;
  color: var(--temuka-gold);
  font-weight: 750;
}

.search-progressive {
  margin-top: 1rem;
}

.search-progressive__loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--temuka-gold);
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.search-progressive__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.source-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  font-size: 0.75rem;
  background: rgb(255 255 255 / 10%);
  color: white;
  border: 1px solid rgb(255 255 255 / 15%);
}

.source-chip--pending {
  border-color: var(--temuka-gold);
  color: var(--temuka-gold);
}

.source-chip--completed {
  border-color: #4caf50;
  color: #a5d6a7;
}

.source-chip--failed {
  border-color: #ef5350;
  color: #ef9a9a;
}

.hero-collage {
  position: relative;
  min-height: 29rem;
}

.image-frame {
  position: absolute;
  overflow: hidden;
  border: 0.45rem solid var(--temuka-ivory);
  border-radius: 1.6rem;
  background: var(--temuka-border);
  box-shadow: var(--temuka-shadow-card);
}

.image-frame :deep(.q-img__image) {
  background-size: cover;
}

.hero-collage__main {
  top: 1rem;
  left: 1rem;
  width: 68%;
  transform: rotate(-2deg);
}

.hero-collage__home {
  top: 0;
  right: 0;
  width: 43%;
  transform: rotate(3deg);
}

.hero-collage__laundry {
  right: 0.6rem;
  bottom: 0.9rem;
  width: 55%;
  transform: rotate(-2deg);
}

.image-caption,
.collage-note {
  position: absolute;
  z-index: 1;
  padding: 0.65rem 0.9rem;
  border-radius: 0.8rem;
  background: var(--temuka-surface);
  color: var(--temuka-ink);
  font-size: 0.78rem;
  font-weight: 750;
  box-shadow: var(--temuka-shadow-card);
}

.image-caption {
  bottom: 1.1rem;
  left: 1.1rem;
}

.collage-note {
  right: 0.8rem;
  bottom: -0.8rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.hero-collage__accent {
  position: absolute;
  z-index: -1;
  top: 18%;
  right: 12%;
  width: 10rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--temuka-gold);
  opacity: 0.55;
}

.image-fallback {
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 8rem;
  place-items: center;
  background: var(--temuka-primary);
  color: white;
  font-size: 2.5rem;
}

@media (max-width: 1023.98px) {
  .hero-section {
    padding-top: 1.25rem;
  }

  .hero-section__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  h1 {
    max-width: 35rem;
    font-size: clamp(2.5rem, 9.5vw, 4.5rem);
  }

  .hero-section__description {
    max-width: 34rem;
    margin-block: 0.9rem 1.25rem;
    font-size: 0.98rem;
  }

  .hero-collage {
    width: min(100%, 31rem);
    min-height: 20rem;
    margin: 0 auto;
  }

  .hero-collage__main {
    top: 0.5rem;
    left: 1rem;
    width: 60%;
  }

  .hero-collage__home {
    right: 0.3rem;
    width: 39%;
  }

  .hero-collage__laundry {
    right: 0.7rem;
    bottom: 0.4rem;
    width: 47%;
  }
}

@media (max-width: 599.98px) {
  .hero-section__grid {
    width: min(100% - 2rem, 38rem);
  }

  h1 {
    font-size: clamp(2.4rem, 11vw, 3.25rem);
    line-height: 1.02;
  }

  .search-panel {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.55rem;
    padding: 0.8rem;
  }

  .search-panel__submit {
    width: auto;
    min-height: 3.25rem;
  }

  .hero-collage {
    min-height: 14.5rem;
    margin-top: 0.4rem;
  }

  .image-frame {
    border-width: 0.3rem;
    border-radius: 1.15rem;
  }

  .hero-collage__main {
    width: 61%;
  }

  .hero-collage__home {
    width: 38%;
  }

  .hero-collage__laundry {
    right: 0.4rem;
    bottom: 0.25rem;
    width: 43%;
  }

  .image-caption,
  .collage-note {
    padding: 0.45rem 0.6rem;
    font-size: 0.66rem;
  }

  .image-caption {
    bottom: 0.65rem;
    left: 0.65rem;
  }

  .collage-note {
    right: 0.15rem;
    bottom: -0.4rem;
  }
}
</style>
