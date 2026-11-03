import test from 'node:test'
import assert from 'node:assert/strict'

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
