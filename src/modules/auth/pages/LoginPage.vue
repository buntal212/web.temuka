<template>
  <q-page class="auth-page auth-page--login">
    <div class="auth-page__content">
      <router-link class="auth-page__brand" to="/" aria-label="Kembali ke Temuka">
        <img src="/images/temuka_512px.png" alt="Temuka" />
      </router-link>
      <AuthFormCard title="Masuk ke Temuka" description="Gunakan username dan password akun Anda.">
        <q-form class="auth-form" @submit.prevent="submitLogin">
          <q-input
            v-model.trim="form.username"
            label="Username"
            autocomplete="username"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => Boolean(value) || 'Username wajib diisi.']"
          />
          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            autocomplete="current-password"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => Boolean(value) || 'Password wajib diisi.']"
          />
          <q-banner
            v-if="errorMessage"
            rounded
            class="auth-message auth-message--error"
            role="alert"
            aria-live="polite"
          >
            {{ errorMessage }}
          </q-banner>
          <q-btn
            class="auth-submit"
            type="submit"
            label="Masuk"
            color="secondary"
            text-color="dark"
            unelevated
            :loading="isSubmitting"
          />
        </q-form>
        <template #footer
          >Belum punya akun? <router-link to="/daftar">Daftar</router-link></template
        >
      </AuthFormCard>
    </div>
  </q-page>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthFormCard from 'src/modules/auth/components/AuthFormCard.vue'
import { login } from 'src/modules/auth/services/auth-service.js'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'
import { apiInjectionKey } from 'src/shared/services/api-client.js'

const api = inject(apiInjectionKey)
const router = useRouter()
const authStore = useAuthStore()
const form = reactive({ username: '', password: '' })
const isSubmitting = ref(false)
const errorMessage = ref('')

async function submitLogin() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    authStore.setSession(api, await login(api, form))
    await router.replace('/')
  } catch (error) {
    errorMessage.value =
      error.response?.status === 422
        ? 'Username atau password tidak sesuai.'
        : error.response?.status === 429
          ? 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'
          : 'Tidak dapat masuk. Periksa koneksi lalu coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
@use 'src/css/auth-page';
</style>
