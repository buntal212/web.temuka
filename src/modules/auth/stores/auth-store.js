import { defineStore } from 'pinia'
import * as authService from 'src/modules/auth/services/auth-service.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, token: null, isReady: false }),
  getters: { isAuthenticated: (state) => Boolean(state.user) },
  actions: {
    async restoreSession(api) {
      const token = readStoredToken()
      if (!token) {
        this.isReady = true
        return
      }

      this.token = token
      setAuthorizationHeader(api, token)
      try {
        this.user = await authService.fetchCurrentUser(api, token)
      } catch (error) {
        if (error.response?.status === 401) this.clearSession(api)
      } finally {
        this.isReady = true
      }
    },
    setSession(api, { user, token }) {
      this.user = user
      this.token = token
      storeToken(token)
      setAuthorizationHeader(api, token)
      this.isReady = true
    },
    async logout(api) {
      try {
        if (this.token) await authService.logout(api, this.token)
        this.clearSession(api)
      } catch (error) {
        if (error.response?.status === 401) {
          this.clearSession(api)
          return
        }

        throw error
      }
    },
    clearSession(api) {
      this.user = null
      this.token = null
      removeStoredToken()
      if (api) delete api.defaults.headers.common.Authorization
    },
  },
})

function readStoredToken() {
  return typeof window === 'undefined' ? null : window.sessionStorage.getItem('temuka_access_token')
}

function storeToken(token) {
  if (typeof window !== 'undefined') window.sessionStorage.setItem('temuka_access_token', token)
}

function removeStoredToken() {
  if (typeof window !== 'undefined') window.sessionStorage.removeItem('temuka_access_token')
}

function setAuthorizationHeader(api, token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
