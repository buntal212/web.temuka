/**
 * Centralized source name resolvers and fallbacks.
 * Bridges upstream source codes to human-readable names when metadata is missing
 * (e.g. during search_init or early source_failed events where backend only sends code).
 */

export const KNOWN_SOURCE_NAMES = {
  larissama: 'Larissama F&B',
  mock_larissama: 'Larissama F&B',
  laundry: 'Laundry',
  mock_laundry: 'Laundry',
  asset: 'Aset & Properti',
  aset: 'Aset & Properti',
  mock_aset: 'Aset & Properti',
}

/**
 * Format a human-readable display name for a source.
 * Priority:
 * 1. Explicit dynamic name (from source_result or object metadata)
 * 2. Centralized known source lookup (supporting both real ASU codes and legacy mock codes)
 * 3. Humanized fallback for unknown codes (e.g. 'catering_box' -> 'Catering Box')
 *
 * @param {string|null|undefined} code
 * @param {string|null|undefined} [explicitName]
 * @returns {string}
 */
export function resolveSourceName(code, explicitName = null) {
  if (typeof explicitName === 'string' && explicitName.trim() !== '') {
    return explicitName.trim()
  }

  if (!code || typeof code !== 'string') {
    return 'Sumber'
  }

  const cleanCode = code.trim().toLowerCase()
  if (KNOWN_SOURCE_NAMES[cleanCode]) {
    return KNOWN_SOURCE_NAMES[cleanCode]
  }

  // Strip 'mock_' prefix if present for clean display
  const stripped = cleanCode.replace(/^mock_/, '')
  if (KNOWN_SOURCE_NAMES[stripped]) {
    return KNOWN_SOURCE_NAMES[stripped]
  }

  // Humanize snake_case or kebab-case: e.g. 'clean_water' -> 'Clean Water'
  const humanized = stripped
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return humanized || code
}
