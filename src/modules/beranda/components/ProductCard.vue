<template>
  <article class="product-card">
    <div class="product-card__image image-frame">
      <q-img
        v-if="displayImageUrl"
        :src="displayImageUrl"
        :alt="displayName"
        ratio="1.55"
        loading="lazy"
      >
        <template #error>
          <div class="product-card__fallback">
            <q-icon name="image" aria-hidden="true" />
          </div>
        </template>
      </q-img>
      <div v-else class="product-card__fallback" :aria-label="displayName">
        <q-icon name="image" aria-hidden="true" />
      </div>

      <span v-if="displayCategory" class="product-card__category">{{ displayCategory }}</span>
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
          <p v-if="displayProvider" class="product-card__provider">{{ displayProvider }}</p>
        </div>
      </div>
      <div class="product-card__meta">
        <span v-if="displayLocation">
          <q-icon name="place" aria-hidden="true" /> {{ displayLocation }}
        </span>
        <span v-else></span>
        <strong>{{ displayMetaRight }}</strong>
      </div>
      <span class="product-card__demo">{{ displayBadge }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { resolveSourceName } from 'src/shared/utils/source-helpers.js'

const props = defineProps({ item: { type: Object, required: true } })

const displayName = computed(() => props.item.name || props.item.offer?.name || 'Tanpa Nama')

const displayProvider = computed(() => {
  if (props.item.provider && typeof props.item.provider === 'object') {
    return props.item.provider.name || ''
  }
  if (typeof props.item.provider === 'string') {
    return props.item.provider
  }
  return ''
})

const displayLocation = computed(() => {
  if (props.item.provider?.location?.address) {
    return props.item.provider.location.address
  }
  if (typeof props.item.location === 'string') {
    return props.item.location
  }
  return null
})

const displayImageUrl = computed(() => {
  const img = props.item.image
  if (!img) return null
  if (typeof img === 'object' && typeof img.url === 'string' && img.url.trim() !== '') {
    return img.url.trim()
  }
  if (typeof img === 'string' && img.trim() !== '') {
    return img.trim()
  }
  return null
})

const displayCategory = computed(() => {
  if (props.item.category && typeof props.item.category === 'string') {
    return props.item.category.trim()
  }
  return null
})

const displayPrice = computed(() => {
  const price = props.item.price
  if (!price) return null

  // Support demo recommendation string price
  if (typeof price === 'string') {
    return price.trim() || null
  }

  // Canonical Catalog v1: { amount: number, currency: string }
  if (typeof price === 'object' && typeof price.amount === 'number') {
    const currency = price.currency || 'IDR'
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(price.amount)
    }
    return `${currency} ${price.amount.toLocaleString()}`
  }

  return null
})

const displayAvailability = computed(() => {
  if (props.item.availability === 'available') return 'Tersedia'
  if (props.item.availability === 'unavailable') return 'Tidak tersedia'
  return null
})

const displayMetaRight = computed(() => {
  if (displayPrice.value) {
    if (props.item.availability === 'unavailable') {
      return `${displayPrice.value} (Habis)`
    }
    return displayPrice.value
  }
  if (displayAvailability.value) {
    return displayAvailability.value
  }
  return ''
})

const displayBadge = computed(() => {
  if (typeof props.item.source?.name === 'string' && props.item.source.name.trim() !== '') {
    return `Sumber: ${props.item.source.name.trim()}`
  }
  if (props.item.source?.code) {
    const resolvedName = resolveSourceName(props.item.source.code)
    return `Sumber: ${resolvedName}`
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
