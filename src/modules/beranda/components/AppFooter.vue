<template>
  <footer class="app-footer">
    <div class="section-shell app-footer__grid">
      <div class="app-footer__brand">
        <a class="brand-mark" href="#beranda" aria-label="Temuka, kembali ke atas">
          <img src="/images/temuka_512px.png" alt="" />
        </a>
        <p>Temukan berbagai kebutuhan dalam satu tempat.</p>
        <span class="app-footer__demo">Portal dalam tahap pengembangan</span>
      </div>

      <div>
        <h2>Kategori</h2>
        <ul>
          <li><a href="#kategori-kuliner">Kuliner</a></li>
          <li><a href="#kategori-properti">Properti & aset</a></li>
          <li><a href="#kategori-laundry">Laundry</a></li>
          <li><a href="#kategori-jasa">Jasa</a></li>
        </ul>
      </div>

      <div>
        <h2>Tentang Temuka</h2>
        <p class="app-footer__note">
          Informasi bantuan dan kontak akan tersedia pada tahap berikutnya.
        </p>
      </div>
    </div>

    <div class="section-shell app-footer__bottom">
      <span>© Temuka</span>
      <span>Contoh tampilan — informasi belum merupakan penawaran nyata.</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  padding-block: 3.5rem 1.25rem;
  background: var(--temuka-background);
  color: white;
}

.app-footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr;
  gap: 3rem;
  padding-bottom: 2.7rem;
}

.brand-mark {
  display: inline-flex;
  width: 9.5rem;
  height: 2.8rem;
  align-items: center;
  padding: 0.18rem 0.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
}

.brand-mark img {
  display: block;
  width: 100%;
  height: auto;
}

.app-footer__brand > p,
.app-footer__note {
  max-width: 21rem;
  color: rgb(255 255 255 / 70%);
  font-size: 0.9rem;
  line-height: 1.65;
}

.app-footer__demo {
  color: var(--temuka-gold);
  font-size: 0.75rem;
  font-weight: 700;
}

.app-footer h2 {
  margin: 0 0 0.9rem;
  color: white;
  font-size: 0.9rem;
}

.app-footer ul {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer li a {
  color: rgb(255 255 255 / 73%);
  font-size: 0.86rem;
  text-decoration: none;
}

.app-footer li a:hover {
  color: var(--temuka-gold);
}

.app-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(255 255 255 / 18%);
  color: rgb(255 255 255 / 65%);
  font-size: 0.75rem;
}

@media (max-width: 767.98px) {
  .app-footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1rem;
  }

  .app-footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 599.98px) {
  .app-footer {
    padding-bottom: calc(5rem + env(safe-area-inset-bottom));
  }

  .app-footer__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .app-footer__brand {
    grid-column: auto;
  }

  .app-footer__bottom {
    flex-direction: column;
  }
}
</style>
