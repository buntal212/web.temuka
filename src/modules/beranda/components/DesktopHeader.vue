<template>
  <header class="desktop-header">
    <div class="section-shell desktop-header__inner">
      <a class="brand-mark" href="#beranda" aria-label="Temuka, ke beranda">
        <img src="/images/temuka_512px.png" alt="" />
      </a>

      <nav class="desktop-header__links" aria-label="Navigasi utama">
        <a class="is-current" href="#beranda" aria-current="page">Beranda</a>
        <a href="#kategori-kuliner">Kuliner</a>
        <a href="#kategori-properti">Aset</a>
        <a href="#kategori-laundry">Laundry</a>
        <a href="#kategori-jasa">Jasa</a>
        <a href="#kategori-lainnya">Lainnya</a>
      </nav>

      <div class="desktop-header__actions">
        <q-btn outline color="secondary" label="Masuk / Daftar" disable>
          <q-tooltip>Fitur akun belum tersedia.</q-tooltip>
        </q-btn>
      </div>
    </div>
  </header>
</template>

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
