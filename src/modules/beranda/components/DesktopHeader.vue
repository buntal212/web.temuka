<template>
  <header class="desktop-header">
    <div class="section-shell desktop-header__inner">
      <router-link class="brand-mark" to="/" aria-label="Temuka, ke beranda">
        <img src="/images/temuka_512px.png" alt="" />
      </router-link>

      <nav class="desktop-header__links" aria-label="Navigasi utama">
        <router-link to="/" :class="{ 'is-current': route.path === '/' }">Beranda</router-link>
        <a :href="sectionHref('kategori-kuliner')">Kuliner</a>
        <a :href="sectionHref('kategori-properti')">Aset</a>
        <a :href="sectionHref('kategori-laundry')">Laundry</a>
        <a :href="sectionHref('kategori-jasa')">Jasa</a>
        <a :href="sectionHref('kategori-lainnya')">Lainnya</a>
      </nav>

      <div class="desktop-header__actions">
        <AccountMenu v-if="authStore.isAuthenticated" />
        <q-btn v-else to="/masuk" outline color="secondary" label="Masuk / Daftar" />
      </div>
    </div>
  </header>
</template>

<script setup>
import AccountMenu from 'src/modules/akun/components/AccountMenu.vue'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

function sectionHref(sectionId) {
  return route.path === '/' ? `#${sectionId}` : `/#${sectionId}`
}
</script>

<style scoped lang="scss">
.desktop-header {
  position: relative;
  z-index: 2;
  background: var(--temuka-background);
}

.desktop-header__inner,
.desktop-header__links,
.desktop-header__actions,
.brand-mark {
  display: flex;
  align-items: center;
}

.desktop-header__inner {
  min-height: 5.5rem;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand-mark {
  display: inline-flex;
  width: 10.5rem;
  height: 3rem;
  flex: 0 0 auto;
  align-items: center;
  padding: 0.2rem 0.45rem;
  border-radius: 0.9rem;
  text-decoration: none;
}

.brand-mark img {
  display: block;
  width: 100%;
  height: auto;
}

.desktop-header__links {
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.desktop-header__links a {
  color: var(--temuka-on-dark-muted);
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
  transition: color 160ms ease;
}

.desktop-header__links a:hover,
.desktop-header__links a.is-current {
  color: var(--temuka-gold);
}

.desktop-header__actions {
  gap: 1rem;
}

@media (max-width: 1023.98px) {
  .desktop-header {
    display: none;
  }
}
</style>
