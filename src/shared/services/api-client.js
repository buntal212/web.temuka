import axios from 'axios'

export const apiInjectionKey = 'temukaApi'

export function createApiClient() {
  const baseURL = import.meta.env.VITE_API_BASE_URL?.trim()

  return axios.create(baseURL ? { baseURL } : {})
}
