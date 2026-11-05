import { computed, ref, watch } from 'vue'
import { consumeSseStream } from 'src/shared/utils/sse-parser.js'
import { resolveSourceName } from 'src/shared/utils/source-helpers.js'

export function useCatalogSearch(options = {}) {
  const debounceMs = options.debounceMs ?? 600
  const apiBaseUrl =
    options.baseUrl ?? (import.meta.env?.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8020')

  const searchTerm = ref('')
  const isSearching = ref(false)
  const hasSearched = ref(false)
  const activeSearchId = ref('')
  const searchResults = ref([])
  const sourcesStatus = ref({})
  const searchSummary = ref(null)

  let debounceTimer = null
  let seenItemKeys = new Set()

  function generateSearchId() {
    return 'search_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
  }

  function getItemKey(item, fallbackSourceCode) {
    const src = item?.source?.code || fallbackSourceCode || 'unknown'
    const id = item?.id != null ? String(item.id) : ''
    return `${src}:${id}`
  }

  async function executeSearch(query, searchId) {
    // If a specific searchId was requested but is no longer the active search identity, ignore it
    if (searchId && activeSearchId.value && searchId !== activeSearchId.value) {
      return
    }

    // Latest Search Wins: Set this search as active
    const currentSearchId = searchId || generateSearchId()
    activeSearchId.value = currentSearchId
    hasSearched.value = true
    isSearching.value = true
    searchResults.value = []
    sourcesStatus.value = {}
    searchSummary.value = null
    seenItemKeys = new Set()

    const endpoint = `${apiBaseUrl.replace(/\/+$/, '')}/api/v1/catalog/search`

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          search_id: currentSearchId,
          query: query,
        }),
      })

      if (!response.ok) {
        // If the request was for this active search, update status
        if (currentSearchId === activeSearchId.value) {
          isSearching.value = false
          searchSummary.value = { error: `HTTP ${response.status}: Gagal memuat katalog` }
        }
        return
      }

      if (!response.body) {
        if (currentSearchId === activeSearchId.value) {
          isSearching.value = false
          searchSummary.value = { error: 'Response stream tidak tersedia' }
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
              const code = typeof target === 'object' && target !== null ? target.code : target
              const explicitName =
                typeof target === 'object' && target !== null ? target.name : null
              const name = resolveSourceName(code, explicitName)
              newStatuses[code] = {
                status: 'pending',
                name: name,
                count: 0,
                error: null,
              }
            }
            sourcesStatus.value = newStatuses
            break
          }

          case 'source_result': {
            const rawSource = data.source
            const sourceCode =
              typeof rawSource === 'object' && rawSource !== null ? rawSource.code : rawSource
            const explicitName =
              typeof rawSource === 'object' && rawSource !== null ? rawSource.name : null
            const sourceName = resolveSourceName(sourceCode, explicitName)
            const items = data.data || []
            // Canonical v1 prefers meta.total, with items_count as fallback alias
            const totalCount = data.meta?.total ?? data.items_count ?? items.length

            sourcesStatus.value[sourceCode] = {
              status: 'completed',
              name: sourceName,
              count: totalCount,
              error: null,
            }

            // Ensure items have source and source.name attached without clobbering existing valid fields
            const normalizedItems = items.map((item) => {
              if (!item || typeof item !== 'object') return item

              let itemSource = item.source
              if (!itemSource || typeof itemSource !== 'object') {
                itemSource = {
                  code: typeof itemSource === 'string' && itemSource.trim() !== '' ? itemSource : sourceCode,
                  ...(sourceName ? { name: sourceName } : {}),
                }
              } else {
                const existingCode = itemSource.code || sourceCode
                const existingName =
                  typeof itemSource.name === 'string' && itemSource.name.trim() !== ''
                    ? itemSource.name.trim()
                    : sourceName

                itemSource = {
                  ...itemSource,
                  code: existingCode,
                  ...(existingName ? { name: existingName } : {}),
                }
              }

              return {
                ...item,
                source: itemSource,
              }
            })

            // Deduplicate items using composite key (source.code:item.id)
            const uniqueItems = []
            for (const item of normalizedItems) {
              if (item && item.id != null) {
                const key = getItemKey(item, sourceCode)
                if (seenItemKeys.has(key)) {
                  continue
                }
                seenItemKeys.add(key)
              }
              uniqueItems.push(item)
            }

            // Append progressive items to active search results
            if (uniqueItems.length > 0) {
              searchResults.value.push(...uniqueItems)
            }
            break
          }

          case 'source_failed': {
            const rawSource = data.source
            const sourceCode =
              typeof rawSource === 'object' && rawSource !== null ? rawSource.code : rawSource
            const explicitName =
              typeof rawSource === 'object' && rawSource !== null ? rawSource.name : null
            const sourceName = resolveSourceName(sourceCode, explicitName)

            sourcesStatus.value[sourceCode] = {
              status: 'failed',
              name: sourceName,
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
      if (currentSearchId === activeSearchId.value) {
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
      // Query is cleared - immediately wipe all previous search state
      hasSearched.value = false
      isSearching.value = false
      activeSearchId.value = ''
      searchResults.value = []
      sourcesStatus.value = {}
      searchSummary.value = null
      seenItemKeys = new Set()
      return
    }

    // Invalidate previous active search immediately by creating new search identity
    const searchId = generateSearchId()
    activeSearchId.value = searchId
    isSearching.value = false

    debounceTimer = setTimeout(() => {
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

    // Avoid accidental duplicate trigger if already actively searching for this exact query
    const searchId = generateSearchId()
    activeSearchId.value = searchId
    executeSearch(trimmed, searchId)
  }

  const searchError = computed(() => searchSummary.value?.error || null)

  const isAllFailed = computed(() => {
    if (isSearching.value || !hasSearched.value || searchError.value) {
      return false
    }
    const list = Object.values(sourcesStatus.value)
    return list.length > 0 && list.every((s) => s.status === 'failed')
  })

  const hasPartialFailure = computed(() => {
    if (isSearching.value || !hasSearched.value) {
      return false
    }
    const list = Object.values(sourcesStatus.value)
    return list.some((s) => s.status === 'failed') && list.some((s) => s.status === 'completed')
  })

  watch(
    searchTerm,
    (val) => {
      handleQueryChange(val)
    },
    { flush: 'sync' },
  )

  return {
    searchTerm,
    isSearching,
    hasSearched,
    activeSearchId,
    searchResults,
    sourcesStatus,
    searchSummary,
    searchError,
    isAllFailed,
    hasPartialFailure,
    triggerSearchNow,
    executeSearch, // Exported for testing
  }
}
