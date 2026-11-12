<template>
  <router-view />
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'
import { apiInjectionKey } from 'src/shared/services/api-client.js'

const api = inject(apiInjectionKey)
const authStore = useAuthStore()

onMounted(() => {
  authStore.restoreSession(api)
})
</script>
