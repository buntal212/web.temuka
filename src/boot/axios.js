import { defineBoot } from '#q-app'
import { createApiClient, apiInjectionKey } from '@/shared/services/api-client'

export default defineBoot(({ app }) => {
  // Buat client per instance aplikasi agar state tidak terbagi antar-request SSR.
  const apiClient = createApiClient()

  app.provide(apiInjectionKey, apiClient)
})
