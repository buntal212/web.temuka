<template>
  <header class="mobile-header">
    <a class="mobile-header__brand" href="#beranda" aria-label="Temuka, ke beranda">
      <img src="/images/temuka_192px.png" alt="" />
    </a>

    <q-btn
      class="mobile-header__notifications"
      flat
      round
      dense
      icon="notifications_none"
      aria-label="Notifikasi belum tersedia"
      disable
    >
      <q-tooltip>Notifikasi belum tersedia.</q-tooltip>
    </q-btn>
  </header>
</template>

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

  .mobile-header__notifications {
    flex: 0 0 auto;
    color: var(--temuka-on-dark-muted);
  }
}
</style>
