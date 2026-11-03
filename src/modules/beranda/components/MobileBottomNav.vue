<template>
  <nav class="mobile-bottom-nav" aria-label="Navigasi bawah">
    <a class="mobile-bottom-nav__item is-active" href="#beranda" aria-current="page">
      <q-icon name="home" aria-hidden="true" />
      <span>Beranda</span>
    </a>
    <a class="mobile-bottom-nav__item" href="#pencarian">
      <q-icon name="search" aria-hidden="true" />
      <span>Cari</span>
    </a>
    <button
      class="mobile-bottom-nav__item"
      type="button"
      disabled
      aria-label="Favorit belum tersedia"
    >
      <q-icon name="favorite_border" aria-hidden="true" />
      <span>Favorit</span>
    </button>
    <button
      class="mobile-bottom-nav__item"
      type="button"
      disabled
      aria-label="Pesan belum tersedia"
    >
      <q-icon name="chat_bubble_outline" aria-hidden="true" />
      <span>Pesan</span>
    </button>
    <button class="mobile-bottom-nav__item" type="button" disabled aria-label="Akun belum tersedia">
      <q-icon name="person_outline" aria-hidden="true" />
      <span>Akun</span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 599.98px) {
  .mobile-bottom-nav {
    position: fixed;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding-top: 0.45rem;
    padding-right: max(0.35rem, env(safe-area-inset-right));
    padding-bottom: calc(0.45rem + env(safe-area-inset-bottom));
    padding-left: max(0.35rem, env(safe-area-inset-left));
    border-top: 1px solid var(--temuka-dark-border);
    background: var(--temuka-background);
    box-shadow: 0 -0.35rem 1.5rem rgb(0 0 0 / 18%);
  }

  .mobile-bottom-nav__item {
    display: flex;
    min-width: 0;
    min-height: 3.25rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.2rem;
    border: 0;
    background: transparent;
    color: var(--temuka-on-dark-muted);
    cursor: pointer;
    font-size: 0.66rem;
    font-weight: 650;
    text-decoration: none;
  }

  .mobile-bottom-nav__item .q-icon {
    font-size: 1.25rem;
  }

  .mobile-bottom-nav__item.is-active {
    color: var(--temuka-gold);
    font-weight: 800;
  }

  .mobile-bottom-nav__item:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
