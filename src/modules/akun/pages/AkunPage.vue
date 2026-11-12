<template>
  <q-page class="account-page">
    <DesktopHeader />
    <MobileHeader />

    <main class="account-page__main section-shell" aria-labelledby="account-title">
      <div
        v-if="!authStore.isReady || !authStore.isAuthenticated"
        class="account-page__loading"
        role="status"
      >
        <q-spinner size="1.5rem" color="secondary" aria-hidden="true" />
        <span>Memuat akun...</span>
      </div>

      <template v-else>
        <header class="account-page__heading">
          <h1 id="account-title">Akun saya</h1>
          <p>Informasi akun yang digunakan untuk masuk ke Temuka.</p>
        </header>

        <section class="account-page__details" aria-labelledby="account-details-title">
          <h2 id="account-details-title">Informasi akun</h2>
          <dl>
            <div>
              <dt>Nama</dt>
              <dd>{{ authStore.user.name }}</dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>@{{ authStore.user.username }}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{{ authStore.user.email }}</dd>
            </div>
          </dl>
          <p class="account-page__note">
            Pengaturan dan perubahan data akun akan ditambahkan nanti.
          </p>
        </section>
      </template>
    </main>

    <MobileBottomNav />
  </q-page>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import DesktopHeader from 'src/modules/beranda/components/DesktopHeader.vue'
import MobileBottomNav from 'src/modules/beranda/components/MobileBottomNav.vue'
import MobileHeader from 'src/modules/beranda/components/MobileHeader.vue'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'

const router = useRouter()
const authStore = useAuthStore()

watch(
  () => authStore.isReady,
  (isReady) => {
    if (isReady && !authStore.isAuthenticated) router.replace('/masuk')
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.account-page {
  min-height: 100vh;
  background: var(--temuka-background);
  color: var(--temuka-on-dark);
}

.account-page__main {
  min-height: calc(100vh - 5.5rem);
  padding-block: clamp(2rem, 6vw, 4rem) calc(5rem + env(safe-area-inset-bottom));
}

.account-page__heading {
  margin-bottom: 1.75rem;
}

.account-page__heading h1 {
  margin: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 780;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.account-page__heading p {
  margin: 0.65rem 0 0;
  color: var(--temuka-on-dark-muted);
  line-height: 1.6;
}

.account-page__details {
  max-width: 42rem;
  padding: clamp(1.25rem, 4vw, 2rem);
  border-radius: 1rem;
  background: var(--temuka-ivory);
  color: var(--temuka-ink);
  box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 16%);
}

.account-page__details h2 {
  margin: 0 0 1.25rem;
  font-size: 1.15rem;
  font-weight: 750;
}

.account-page__details dl {
  display: grid;
  margin: 0;
}

.account-page__details dl > div {
  display: grid;
  grid-template-columns: minmax(6rem, 0.35fr) minmax(0, 1fr);
  gap: 1rem;
  padding-block: 0.9rem;
  border-top: 1px solid var(--temuka-border);
}

.account-page__details dt {
  color: var(--temuka-muted);
  font-size: 0.9rem;
}

.account-page__details dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
  font-weight: 680;
}

.account-page__note {
  margin: 1rem 0 0;
  color: var(--temuka-muted);
  font-size: 0.88rem;
  line-height: 1.5;
}

.account-page__loading {
  display: flex;
  min-height: 12rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--temuka-on-dark-muted);
}

@media (max-width: 599.98px) {
  .account-page__main {
    min-height: calc(100vh - 4.5rem);
  }

  .account-page__details dl > div {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
</style>
