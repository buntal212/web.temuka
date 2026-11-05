import { defineBoot } from '#q-app'
import { createApiClient, apiInjectionKey } from 'src/shared/services/api-client.js'

export default defineBoot(({ app }) => {
  // Buat client per instance aplikasi agar state tidak terbagi antar-request SSR.
  const apiClient = createApiClient()

  app.provide(apiInjectionKey, apiClient)
})
