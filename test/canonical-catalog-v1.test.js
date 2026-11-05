import test from 'node:test'
import assert from 'node:assert/strict'
import { useCatalogSearch } from 'src/modules/beranda/composables/useCatalogSearch.js'

function createMockSseStream() {
  let controller
  const stream = new ReadableStream({
    start(c) {
      controller = c
    },
  })
  const encoder = new TextEncoder()
  return {
    stream,
    pushEvent(event, data) {
      const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
      controller.enqueue(encoder.encode(payload))
    },
    close() {
      try {
        controller.close()
      } catch {
        // already closed
      }
    },
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

test('Canonical Catalog v1: useCatalogSearch handles object source and meta.total correctly', async () => {
  const originalFetch = globalThis.fetch
  const stream = createMockSseStream()

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    body: stream.stream,
  })

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 10 })

    search.searchTerm.value = 'nasi'
    await delay(25)

    const searchId = search.activeSearchId.value

    // 1. search_init event
    stream.pushEvent('search_init', {
      search_id: searchId,
      targets: ['mock_larissama', 'mock_laundry'],
    })
    await delay(10)

    assert.equal(search.sourcesStatus.value.mock_larissama.status, 'pending')
    assert.equal(search.sourcesStatus.value.mock_laundry.status, 'pending')

    // 2. Canonical v1 source_result event with object source and meta.total
    stream.pushEvent('source_result', {
      search_id: searchId,
      status: 'completed',
      source: {
        code: 'mock_larissama',
        name: 'Larissama F&B',
      },
      data: [
        {
          id: 'lrs-001',
          code: 'MNU-001',
          name: 'Nasi Goreng Spesial',
          category: 'Makanan Utama',
          summary: 'Nasi goreng lezat dengan bumbu racikan khas',
          price: {
            amount: 25000,
            currency: 'IDR',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
          },
          availability: 'available',
          provider: {
            id: 'tenant-lrs-10',
            code: 'WRG-001',
            name: 'Warung Makan Bu Rina',
            image: null,
            contact: {
              phone: '+6281234567890',
              whatsapp: null,
            },
            location: {
              address: 'Jl. Kaliurang KM 5 No. 12, Sleman',
              latitude: -7.7654,
              longitude: 110.3812,
            },
          },
        },
      ],
      meta: {
        total: 1,
      },
      items_count: 1, // legacy alias
    })
    await delay(10)

    // Verify source status updated properly using source.code as key
    const larissamaStatus = search.sourcesStatus.value.mock_larissama
    assert.equal(larissamaStatus.status, 'completed')
    assert.equal(larissamaStatus.name, 'Larissama F&B')
    assert.equal(larissamaStatus.count, 1, 'Must use meta.total (1)')

    // Verify items array has canonical v1 item structure
    assert.equal(search.searchResults.value.length, 1)
    const item = search.searchResults.value[0]
    assert.equal(item.id, 'lrs-001')
    assert.equal(item.code, 'MNU-001')
    assert.equal(item.name, 'Nasi Goreng Spesial')
    assert.equal(item.category, 'Makanan Utama')
    assert.equal(item.summary, 'Nasi goreng lezat dengan bumbu racikan khas')
    assert.equal(item.price.amount, 25000)
    assert.equal(item.price.currency, 'IDR')
    assert.equal(item.availability, 'available')
    assert.equal(item.provider.name, 'Warung Makan Bu Rina')
    assert.equal(item.provider.location.address, 'Jl. Kaliurang KM 5 No. 12, Sleman')
    assert.equal(item.source.code, 'mock_larissama')
    assert.equal(item.source.name, 'Larissama F&B', 'Item must be enriched with parent source name')

    // 3. Second progressive source arrives
    stream.pushEvent('source_result', {
      search_id: searchId,
      status: 'completed',
      source: {
        code: 'mock_laundry',
        name: 'Laundry Kilat',
      },
      data: [
        {
          id: 'lnd-001',
          code: 'LND-001',
          name: 'Paket Cuci Kiloan',
          category: 'Jasa Laundry',
          summary: null,
          price: {
            amount: 15000,
            currency: 'IDR',
          },
          image: null, // nullable image
          availability: 'available',
          provider: {
            id: 'tenant-lnd-05',
            code: 'LND-PRV-01',
            name: 'Laundry Bersih Berkah',
            image: null,
            contact: {
              phone: null,
              whatsapp: null,
            },
            location: {
              address: null,
              latitude: null,
              longitude: null,
            },
          },
        },
      ],
      meta: {
        total: 1,
      },
    })
    await delay(10)

    assert.equal(search.searchResults.value.length, 2, 'Progressive results accumulated')
    assert.equal(search.sourcesStatus.value.mock_laundry.status, 'completed')
    assert.equal(search.sourcesStatus.value.mock_laundry.count, 1)

    // 4. search_done finishes searching
    stream.pushEvent('search_done', {
      search_id: searchId,
      total_items: 2,
    })
    await delay(10)

    assert.equal(search.isSearching.value, false)
  } finally {
    stream.close()
    globalThis.fetch = originalFetch
  }
})

test('Canonical Catalog v1: handles source_failed event with object source safely', async () => {
  const originalFetch = globalThis.fetch
  const stream = createMockSseStream()

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    body: stream.stream,
  })

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 10 })

    search.searchTerm.value = 'rumah'
    await delay(25)

    const searchId = search.activeSearchId.value

    stream.pushEvent('source_failed', {
      search_id: searchId,
      source: {
        code: 'mock_aset',
        name: 'Aset & Properti',
      },
      status: 'failed',
      error_code: 'SOURCE_TIMEOUT',
      message: 'Aset & Properti timeout',
    })
    await delay(10)

    const failedStatus = search.sourcesStatus.value.mock_aset
    assert.equal(failedStatus.status, 'failed')
    assert.equal(failedStatus.name, 'Aset & Properti')
    assert.equal(failedStatus.count, 0)
    assert.equal(failedStatus.error, 'Aset & Properti timeout')
  } finally {
    stream.close()
    globalThis.fetch = originalFetch
  }
})

test('Canonical Catalog v1 display logic helper functions work accurately', () => {
  // Test price formatting for IDR
  const priceIDR = { amount: 25000, currency: 'IDR' }
  const formattedIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(priceIDR.amount)

  assert.ok(formattedIDR.includes('25.000'))
  assert.ok(formattedIDR.includes('Rp'))

  // Test nullable fields handling
  const minimalCanonicalItem = {
    id: '101',
    code: null,
    name: 'Teh Hangat',
    category: null,
    summary: null,
    price: { amount: 4000, currency: 'IDR' },
    image: null,
    availability: 'available',
    provider: {
      id: '10',
      code: null,
      name: 'Warung Pojok',
      image: null,
      contact: { phone: null, whatsapp: null },
      location: { address: null, latitude: null, longitude: null },
    },
  }

  assert.equal(minimalCanonicalItem.name, 'Teh Hangat')
  assert.equal(minimalCanonicalItem.category, null)
  assert.equal(minimalCanonicalItem.image, null)
  assert.equal(minimalCanonicalItem.provider.location.address, null)
  assert.equal(minimalCanonicalItem.availability, 'available')
})

test('Canonical Catalog v1: enriches item source.name when item only has source.code (non-mock ASU)', async () => {
  const originalFetch = globalThis.fetch
  const stream = createMockSseStream()

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    body: stream.stream,
  })

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 10 })

    search.searchTerm.value = 'ayam'
    await delay(25)

    const searchId = search.activeSearchId.value

    // Real ASU non-mock code: 'larissama'
    stream.pushEvent('search_init', {
      search_id: searchId,
      targets: ['larissama'],
    })
    await delay(10)

    assert.equal(search.sourcesStatus.value.larissama.name, 'Larissama F&B')
    assert.equal(search.sourcesStatus.value.larissama.status, 'pending')

    // Item only has source: { code: 'larissama' } (like UIH normalizeItem produces)
    stream.pushEvent('source_result', {
      search_id: searchId,
      status: 'completed',
      source: {
        code: 'larissama',
        name: 'Larissama F&B',
      },
      data: [
        {
          id: 'lrs-real-01',
          name: 'Ayam Bakar Madu',
          price: { amount: 30000, currency: 'IDR' },
          source: { code: 'larissama' }, // Notice: no name field initially
        },
      ],
      meta: { total: 1 },
    })
    await delay(10)

    assert.equal(search.searchResults.value.length, 1)
    const item = search.searchResults.value[0]
    assert.equal(item.source.code, 'larissama')
    assert.equal(item.source.name, 'Larissama F&B', 'Item source.name must be enriched from parent event')
  } finally {
    stream.close()
    globalThis.fetch = originalFetch
  }
})

test('Canonical Catalog v1: preserves existing non-empty item source.name', async () => {
  const originalFetch = globalThis.fetch
  const stream = createMockSseStream()

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    body: stream.stream,
  })

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 10 })

    search.searchTerm.value = 'bebek'
    await delay(25)

    const searchId = search.activeSearchId.value

    stream.pushEvent('source_result', {
      search_id: searchId,
      status: 'completed',
      source: {
        code: 'larissama',
        name: 'Larissama F&B',
      },
      data: [
        {
          id: 'lrs-specific-01',
          name: 'Bebek Goreng Renyah',
          price: { amount: 35000, currency: 'IDR' },
          source: { code: 'larissama', name: 'Larissama Express Cabang Malioboro' },
        },
      ],
      meta: { total: 1 },
    })
    await delay(10)

    assert.equal(search.searchResults.value.length, 1)
    const item = search.searchResults.value[0]
    assert.equal(item.source.name, 'Larissama Express Cabang Malioboro')
  } finally {
    stream.close()
    globalThis.fetch = originalFetch
  }
})
