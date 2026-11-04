import test from 'node:test'
import assert from 'node:assert/strict'
import { useCatalogSearch } from '../src/modules/beranda/composables/useCatalogSearch.js'

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

test('Latest Search Wins logic correctly ignores stale search events', () => {
  // Simulate active search state machine
  let activeSearchId = 'search_1'
  let isSearching = true
  const searchResults = []
  const sourcesStatus = {}

  function handleEvent(eventName, data) {
    // Latest Search Wins check
    if (data.search_id !== activeSearchId) {
      return // Stale event discarded
    }

    if (eventName === 'source_result') {
      sourcesStatus[data.source] = 'completed'
      searchResults.push(...(data.data || []))
    } else if (eventName === 'search_done') {
      isSearching = false
    }
  }

  // T0: Search 1 starts
  activeSearchId = 'search_1'

  // T300: User changes query, Search 2 starts before Search 1 completes
  activeSearchId = 'search_2'
  searchResults.length = 0 // Reset for new search

  // T500: Search 1 completes and emits event
  handleEvent('source_result', {
    search_id: 'search_1',
    source: 'mock_larissama',
    data: [{ offer: { name: 'Old Stale Result' } }],
  })

  // Verify stale result was NOT added to searchResults
  assert.equal(searchResults.length, 0, 'Stale search results must not be added')

  // T600: Search 2 completes and emits event
  handleEvent('source_result', {
    search_id: 'search_2',
    source: 'mock_larissama',
    data: [{ offer: { name: 'New Fresh Result' } }],
  })

  // Verify new result WAS added
  assert.equal(searchResults.length, 1)
  assert.equal(searchResults[0].offer.name, 'New Fresh Result')

  // T700: Search 1 emits search_done
  handleEvent('search_done', { search_id: 'search_1' })
  assert.equal(isSearching, true, 'Search 1 done must not turn off isSearching for Search 2')

  // T800: Search 2 emits search_done
  handleEvent('search_done', { search_id: 'search_2' })
  assert.equal(isSearching, false, 'Search 2 done turns off isSearching')
})

test('useCatalogSearch: query change immediately marks previous search as stale during debounce', async () => {
  const originalFetch = globalThis.fetch
  const stream1 = createMockSseStream()
  const stream2 = createMockSseStream()
  const fetchCalls = []

  globalThis.fetch = async (url, options) => {
    const body = JSON.parse(options.body)
    fetchCalls.push(body)
    const stream = fetchCalls.length === 1 ? stream1.stream : stream2.stream
    return {
      ok: true,
      status: 200,
      body: stream,
    }
  }

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 40 })

    // Step 1: User types first query
    search.searchTerm.value = 'laptop'
    const idDuringDebounce1 = search.activeSearchId.value
    assert.ok(
      idDuringDebounce1.startsWith('search_'),
      'activeSearchId must be set immediately on input change',
    )

    // Wait for debounce to fire fetch 1
    await delay(60)
    assert.equal(fetchCalls.length, 1)
    const search1Id = fetchCalls[0].search_id
    assert.equal(search.activeSearchId.value, search1Id)
    assert.equal(search.isSearching.value, true)

    // Stream 1 delivers search_init and initial results
    stream1.pushEvent('search_init', { search_id: search1Id, targets: ['mock_larissama'] })
    stream1.pushEvent('source_result', {
      search_id: search1Id,
      source: 'mock_larissama',
      items_count: 1,
      data: [{ id: 1, title: 'Laptop Lama' }],
    })
    await delay(10)
    assert.equal(search.searchResults.value.length, 1)
    assert.equal(search.sourcesStatus.value.mock_larissama.status, 'completed')

    // Step 2: User changes query to 'sepatu'
    search.searchTerm.value = 'sepatu'
    const search2Id = search.activeSearchId.value
    assert.notEqual(
      search2Id,
      search1Id,
      'activeSearchId must immediately change to a new searchId',
    )
    assert.equal(search.isSearching.value, false, 'isSearching must not be active during debounce')

    // Step 3: DURING the debounce window (40ms), Search 1 emits late events
    stream1.pushEvent('source_result', {
      search_id: search1Id,
      source: 'mock_another',
      items_count: 1,
      data: [{ id: 99, title: 'Late Stale Laptop Item' }],
    })
    stream1.pushEvent('source_failed', {
      search_id: search1Id,
      source: 'mock_failed',
      message: 'Failed on old search',
    })
    stream1.pushEvent('search_done', {
      search_id: search1Id,
      status: 'completed',
    })
    await delay(15)

    // Verify late events from Search 1 did NOT alter state during debounce
    assert.equal(
      search.searchResults.value.length,
      1,
      'Stale events must not add items during debounce',
    )
    assert.equal(search.searchResults.value[0].title, 'Laptop Lama')
    assert.equal(
      search.sourcesStatus.value.mock_another,
      undefined,
      'Stale source chips must not be added',
    )
    assert.equal(
      search.sourcesStatus.value.mock_failed,
      undefined,
      'Stale failure chips must not be added',
    )
    assert.equal(
      search.searchSummary.value,
      null,
      'searchSummary must not be set by stale search_done',
    )

    // Step 4: Debounce expires (40ms) -> Search 2 executes
    await delay(50)
    assert.equal(fetchCalls.length, 2, 'New search must execute after debounce')
    assert.equal(fetchCalls[1].query, 'sepatu')
    assert.equal(fetchCalls[1].search_id, search2Id)
    assert.equal(
      search.isSearching.value,
      true,
      'isSearching must be true once new search executes',
    )
    assert.equal(search.searchResults.value.length, 0, 'New search must clear previous results')

    // Stream 2 emits fresh results
    stream2.pushEvent('search_init', { search_id: search2Id, targets: ['mock_larissama'] })
    stream2.pushEvent('source_result', {
      search_id: search2Id,
      source: 'mock_larissama',
      items_count: 1,
      data: [{ id: 2, title: 'Sepatu Baru' }],
    })
    stream2.pushEvent('search_done', {
      search_id: search2Id,
      status: 'completed',
    })
    await delay(10)

    assert.equal(search.searchResults.value.length, 1)
    assert.equal(search.searchResults.value[0].title, 'Sepatu Baru')
    assert.equal(
      search.isSearching.value,
      false,
      'search_done for active search turns off isSearching',
    )
    assert.equal(search.searchSummary.value.status, 'completed')
  } finally {
    stream1.close()
    stream2.close()
    globalThis.fetch = originalFetch
  }
})

test('useCatalogSearch: clearing query immediately wipes search state and ignores late events', async () => {
  const originalFetch = globalThis.fetch
  const stream1 = createMockSseStream()
  const fetchCalls = []

  globalThis.fetch = async (url, options) => {
    fetchCalls.push(JSON.parse(options.body))
    return {
      ok: true,
      status: 200,
      body: stream1.stream,
    }
  }

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 20 })

    search.searchTerm.value = 'buku'
    await delay(30)
    assert.equal(fetchCalls.length, 1)
    const searchId = fetchCalls[0].search_id

    // Deliver results for 'buku'
    stream1.pushEvent('source_result', {
      search_id: searchId,
      source: 'mock_larissama',
      items_count: 1,
      data: [{ id: 10, title: 'Buku Resep' }],
    })
    await delay(10)
    assert.equal(search.searchResults.value.length, 1)
    assert.equal(search.hasSearched.value, true)

    // User CLEARS the search input
    search.searchTerm.value = ''

    // Verify immediate wipe
    assert.equal(search.searchTerm.value, '')
    assert.equal(search.activeSearchId.value, '', 'activeSearchId must be reset when cleared')
    assert.equal(search.hasSearched.value, false, 'hasSearched must be false when cleared')
    assert.equal(search.isSearching.value, false, 'isSearching must be false when cleared')
    assert.equal(search.searchResults.value.length, 0, 'searchResults must be empty')
    assert.deepEqual(search.sourcesStatus.value, {}, 'sourcesStatus must be empty')
    assert.equal(search.searchSummary.value, null, 'searchSummary must be null')

    // Late arriving events from in-flight request
    stream1.pushEvent('source_result', {
      search_id: searchId,
      source: 'mock_sukses',
      items_count: 1,
      data: [{ id: 20, title: 'Buku Panduan' }],
    })
    stream1.pushEvent('search_done', {
      search_id: searchId,
      status: 'completed',
    })
    await delay(15)

    // Must still remain clean
    assert.equal(search.searchResults.value.length, 0, 'Late events must not restore results')
    assert.deepEqual(search.sourcesStatus.value, {}, 'Late events must not restore chips')
    assert.equal(search.hasSearched.value, false)
    assert.equal(search.isSearching.value, false)
  } finally {
    stream1.close()
    globalThis.fetch = originalFetch
  }
})

test('useCatalogSearch: triggerSearchNow executes immediately and cancels pending debounce', async () => {
  const originalFetch = globalThis.fetch
  const stream1 = createMockSseStream()
  const fetchCalls = []

  globalThis.fetch = async (url, options) => {
    fetchCalls.push(JSON.parse(options.body))
    return {
      ok: true,
      status: 200,
      body: stream1.stream,
    }
  }

  try {
    const search = useCatalogSearch({ baseUrl: 'http://localhost:8020', debounceMs: 500 })

    search.searchTerm.value = 'mobil'
    // Immediately press Enter / triggerSearchNow without waiting 500ms
    search.triggerSearchNow()

    await delay(10)
    assert.equal(fetchCalls.length, 1, 'Search must have executed immediately')
    assert.equal(fetchCalls[0].query, 'mobil')
    assert.equal(search.isSearching.value, true)

    // Wait 600ms to ensure the cancelled debounce does NOT trigger a second fetch
    await delay(550)
    assert.equal(fetchCalls.length, 1, 'Cancelled debounce must not fire an extra fetch')
  } finally {
    stream1.close()
    globalThis.fetch = originalFetch
  }
})
