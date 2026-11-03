<template>
  <article class="product-card">
    <div class="product-card__image image-frame">
      <q-img :src="displayImage" :alt="displayName" ratio="1.55" loading="lazy">
        <template #error>
          <div class="product-card__fallback"><q-icon name="image" aria-hidden="true" /></div>
        </template>
      </q-img>
      <span class="product-card__category">{{ displayCategory }}</span>
      <q-btn
        class="product-card__favorite"
        round
        unelevated
        icon="favorite_border"
        aria-label="Favorit belum tersedia"
        disable
      >
        <q-tooltip>Fitur favorit belum tersedia.</q-tooltip>
      </q-btn>
    </div>

    <div class="product-card__details">
      <div class="product-card__title-row">
        <div>
          <h3>{{ displayName }}</h3>
          <p class="product-card__provider">{{ displayProvider }}</p>
        </div>
      </div>
      <div class="product-card__meta">
        <span><q-icon name="place" aria-hidden="true" /> {{ displayLocation }}</span>
        <strong>{{ displayMetaRight }}</strong>
      </div>
      <span class="product-card__demo">{{ displayBadge }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ item: { type: Object, required: true } })

const displayName = computed(() => props.item.offer?.name || props.item.name || 'Tanpa Nama')
const displayProvider = computed(() => props.item.provider?.name || props.item.provider || 'Penyedia')
const displayLocation = computed(() => props.item.location?.address || props.item.location || 'Lokasi umum')
const displayImage = computed(() => props.item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80')

const displayCategory = computed(() => {
  if (props.item.source?.code) {
    const code = props.item.source.code
    if (code === 'mock_larissama') return 'Kuliner'
    if (code === 'mock_laundry') return 'Laundry'
    if (code === 'mock_aset') return 'Aset'
    return code
  }
  return props.item.category || 'Katalog'
})

const displayMetaRight = computed(() => {
  if (props.item.price) return props.item.price
  if (props.item.operational_status === 'open') return 'Buka sekarang'
  if (props.item.availability === 'available') return 'Tersedia'
  return props.item.offer?.type || 'Tersedia'
})

const displayBadge = computed(() => {
  if (props.item.source?.code) {
    return `Sumber: ${props.item.source.code}`
  }
  return 'Contoh tampilan'
})
</script>

<style scoped lang="scss">
.product-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--temuka-border);
  border-radius: var(--temuka-radius-card);
  background: var(--temuka-surface);
  box-shadow: 0 0.4rem 1.5rem rgb(32 58 54 / 5%);
}

.product-card__image {
  position: relative;
  overflow: hidden;
  background: var(--temuka-border);
}

.product-card__category,
.product-card__favorite {
  position: absolute;
  z-index: 1;
  top: 0.8rem;
}

.product-card__category {
  left: 0.8rem;
  padding: 0.38rem 0.65rem;
  border-radius: 99px;
  background: var(--temuka-surface);
  color: var(--temuka-primary);
  font-size: 0.72rem;
  font-weight: 800;
}

.product-card__favorite {
  right: 0.8rem;
  background: var(--temuka-surface);
  color: var(--temuka-muted);
}

.product-card__details {
  padding: 1rem 1.05rem 1.1rem;
}

.product-card__title-row,
.product-card__meta,
.product-card__meta span {
  display: flex;
  align-items: center;
}

.product-card__title-row,
.product-card__meta {
  justify-content: space-between;
  gap: 0.75rem;
}

.product-card h3 {
  margin: 0;
  color: var(--temuka-ink);
  font-size: 1rem;
  font-weight: 750;
}

.product-card__provider {
  margin: 0.25rem 0 0;
  color: var(--temuka-muted);
  font-size: 0.82rem;
}

.product-card__meta {
  margin-top: 0.95rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--temuka-border);
  font-size: 0.8rem;
}

.product-card__meta span {
  gap: 0.25rem;
  color: var(--temuka-muted);
}

.product-card__meta strong {
  color: var(--temuka-primary);
  text-align: right;
}

.product-card__demo {
  display: inline-block;
  margin-top: 0.8rem;
  color: var(--temuka-muted);
  font-size: 0.7rem;
}

.product-card__fallback {
  display: grid;
  min-height: 12rem;
  place-items: center;
  background: var(--temuka-primary);
  color: white;
  font-size: 2.5rem;
}
</style>
