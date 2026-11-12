<template>
  <header class="mobile-header">
    <router-link class="mobile-header__brand" to="/" aria-label="Temuka, ke beranda">
      <img src="/images/temuka_192px.png" alt="" />
    </router-link>

    <AccountMenu v-if="authStore.isAuthenticated" />
    <q-btn v-else class="mobile-header__account" flat dense to="/masuk" label="Masuk" />
  </header>
</template>

<script setup>
import AccountMenu from 'src/modules/akun/components/AccountMenu.vue'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'

const authStore = useAuthStore()
</script>

<style scoped lang="scss">
.mobile-header {
  display: none;
}

@media (max-width: 1023.98px) {
  .mobile-header {
    position: relative;
    z-index: 2;
    display: flex;
    min-height: 4.5rem;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.6rem max(1rem, env(safe-area-inset-left));
    background: var(--temuka-background);
  }

  .mobile-header__brand {
    display: inline-flex;
    flex: 0 0 auto;
    width: 7.5rem;
    height: 2.25rem;
    align-items: center;
    padding: 0.18rem 0.3rem;
    border-radius: 0.7rem;
    text-decoration: none;
  }

  .mobile-header__brand img {
    display: block;
    width: 100%;
    height: auto;
  }

  .mobile-header__account {
    flex: 0 0 auto;
    max-width: 9rem;
    color: var(--temuka-gold);
    font-weight: 700;
  }
}
</style>
