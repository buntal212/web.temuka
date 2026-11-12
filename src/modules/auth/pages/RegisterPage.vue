<template>
  <q-page class="auth-page auth-page--register">
    <div class="auth-page__content">
      <router-link class="auth-page__brand" to="/" aria-label="Kembali ke Temuka">
        <img src="/images/temuka_512px.png" alt="Temuka" />
      </router-link>
      <AuthFormCard title="Buat akun Temuka" description="Daftar untuk mulai menjelajahi Temuka.">
        <q-form class="auth-form" @submit.prevent="submitRegistration">
          <q-input
            v-model.trim="form.name"
            label="Nama lengkap"
            autocomplete="name"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => Boolean(value) || 'Nama wajib diisi.']"
          />
          <q-input
            v-model.trim="form.email"
            label="Email"
            type="email"
            autocomplete="email"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => Boolean(value) || 'Email wajib diisi.']"
          />
          <q-input
            v-model.trim="form.username"
            label="Username"
            autocomplete="username"
            outlined
            color="primary"
            bg-color="white"
            hint="3–30 karakter, huruf, angka, atau garis bawah."
            :rules="[(value) => Boolean(value) || 'Username wajib diisi.']"
          />
          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            autocomplete="new-password"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => value.length >= 8 || 'Password minimal 8 karakter.']"
          />
          <q-input
            v-model="form.password_confirmation"
            label="Ulangi password"
            type="password"
            autocomplete="new-password"
            outlined
            color="primary"
            bg-color="white"
            :rules="[(value) => value === form.password || 'Konfirmasi password belum cocok.']"
          />
          <q-banner
            v-if="errorMessage"
            rounded
            class="auth-message auth-message--error"
            role="alert"
            aria-live="polite"
          >
            <div>{{ errorMessage }}</div>
            <ul v-if="validationErrors.length" class="q-mb-none q-pl-md">
              <li v-for="message in validationErrors" :key="message">{{ message }}</li>
            </ul>
          </q-banner>
          <q-btn
            class="auth-submit"
            type="submit"
            label="Daftar"
            color="secondary"
            text-color="dark"
            unelevated
            :loading="isSubmitting"
          />
        </q-form>
        <template #footer>Sudah punya akun? <router-link to="/masuk">Masuk</router-link></template>
      </AuthFormCard>
    </div>
  </q-page>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import AuthFormCard from 'src/modules/auth/components/AuthFormCard.vue'
import { register } from 'src/modules/auth/services/auth-service.js'
import { apiInjectionKey } from 'src/shared/services/api-client.js'

const api = inject(apiInjectionKey)
const $q = useQuasar()
const router = useRouter()
const form = reactive({
  name: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
})
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref([])

async function submitRegistration() {
  errorMessage.value = ''
  validationErrors.value = []
  isSubmitting.value = true
  try {
    await register(api, form)
    await router.replace('/masuk')
    $q.notify({
      type: 'positive',
      message: 'Akun berhasil dibuat. Silakan masuk dengan username dan password Anda.',
      icon: 'check_circle',
      position: 'top',
      timeout: 4500,
    })
  } catch (error) {
    const errors = error.response?.data?.errors || {}
    validationErrors.value = Object.values(errors).flat()
    errorMessage.value =
      error.response?.status === 422
        ? 'Periksa kembali data pendaftaran Anda.'
        : error.response?.status === 429
          ? 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'
          : 'Pendaftaran belum berhasil. Periksa koneksi lalu coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
@use 'src/css/auth-page';
</style>
