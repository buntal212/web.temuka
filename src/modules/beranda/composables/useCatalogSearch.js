import { ref, watch } from 'vue'
import { consumeSseStream } from 'src/shared/utils/sse-parser'

export function useCatalogSearch(options = {}) {
  const debounceMs = options.debounceMs ?? 600
  const apiBaseUrl = options.baseUrl ?? (import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8020')

  const searchTerm = ref('')
  const isSearching = ref(false)
  const hasSearched = ref(false)
  const activeSearchId = ref('')
  const searchResults = ref([])
  const sourcesStatus = ref({})
  const searchSummary = ref(null)

  let debounceTimer = null

  function generateSearchId() {
    return 'search_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
  }

  async function executeSearch(query, searchId) {
    // Latest Search Wins: Set this search as active
    activeSearchId.value = searchId
    hasSearched.value = true
    isSearching.value = true
    searchResults.value = []
    sourcesStatus.value = {}
    searchSummary.value = null

    const endpoint = `${apiBaseUrl.replace(/\/+$/, '')}/api/v1/catalog/search`

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          search_id: searchId,
          query: query,
        }),
      })

      if (!response.ok) {
        // If the request was for this active search, update status
        if (searchId === activeSearchId.value) {
          isSearching.value = false
          searchSummary.value = { error: `HTTP ${response.status}: Gagal memuat katalog` }
        }
        return
      }

      if (!response.body) {
        if (searchId === activeSearchId.value) {
          isSearching.value = false
        }
        return
      }

      const reader = response.body.getReader()

      await consumeSseStream(reader, (eventName, data) => {
        // LATEST SEARCH WINS PROTECTION:
        // Silently discard any event belonging to an outdated searchId
        if (data.search_id !== activeSearchId.value) {
          return
        }

        switch (eventName) {
          case 'search_init': {
            const targets = data.targets || []
            const newStatuses = {}
            for (const target of targets) {
              newStatuses[target] = {
                status: 'pending',
                count: 0,
                error: null,
              }
            }
            sourcesStatus.value = newStatuses
            break
          }

          case 'source_result': {
            const sourceCode = data.source
            const items = data.data || []

            sourcesStatus.value[sourceCode] = {
              status: 'completed',
              count: data.items_count ?? items.length,
              error: null,
            }

            // Append progressive items to active search results
            searchResults.value.push(...items)
            break
          }

          case 'source_failed': {
            const sourceCode = data.source
            sourcesStatus.value[sourceCode] = {
              status: 'failed',
              count: 0,
              error: data.message || 'Gagal memuat',
            }
            break
          }

          case 'search_done': {
            isSearching.value = false
            searchSummary.value = data
            break
          }
        }
      })
    } catch (err) {
      // Network error or unexpected exception
      if (searchId === activeSearchId.value) {
        isSearching.value = false
        searchSummary.value = { error: err?.message || 'Koneksi terputus' }
      }
    }
  }

  function handleQueryChange(newQuery) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }

    const trimmed = (newQuery || '').trim()

    if (!trimmed) {
      // Query is cleared
      hasSearched.value = false
      isSearching.value = false
      activeSearchId.value = ''
      searchResults.value = []
      sourcesStatus.value = {}
      searchSummary.value = null
      return
    }

    debounceTimer = setTimeout(() => {
      const searchId = generateSearchId()
      executeSearch(trimmed, searchId)
    }, debounceMs)
  }

  function triggerSearchNow() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }

    const trimmed = (searchTerm.value || '').trim()
    if (!trimmed) return

    const searchId = generateSearchId()
    executeSearch(trimmed, searchId)
  }

  watch(searchTerm, (val) => {
    handleQueryChange(val)
  })

  return {
    searchTerm,
    isSearching,
    hasSearched,
    activeSearchId,
    searchResults,
    sourcesStatus,
    searchSummary,
    triggerSearchNow,
    executeSearch, // Exported for testing
  }
}
