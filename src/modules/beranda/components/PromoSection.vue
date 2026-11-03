<template>
  <section class="section-shell promo-section" aria-labelledby="promo-title">
    <div class="promo-section__content">
      <p class="eyebrow">Temuka, tempat berawal</p>
      <h2 id="promo-title">Satu Platform, Banyak Kebutuhan</h2>
      <p>
        Temuka membantumu menjelajahi produk dan layanan dari beragam kategori. Mulai dari hal yang
        kamu cari, lalu temukan pilihan yang sesuai.
      </p>
      <q-btn
        unelevated
        color="white"
        text-color="primary"
        label="Jelajahi kategori"
        href="#kategori"
      />
    </div>
    <div class="promo-section__mark" aria-hidden="true"><span>t</span></div>
  </section>
</template>

<style scoped lang="scss">
.promo-section {
  position: relative;
  display: flex;
  overflow: hidden;
  min-height: 20rem;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-block: 1rem 5rem;
  padding: clamp(2rem, 6vw, 4rem);
  border-radius: 1.8rem;
  border: 1px solid var(--temuka-dark-border);
  background: var(--temuka-background);
  color: white;
}

.promo-section__content {
  position: relative;
  z-index: 1;
  max-width: 42rem;
}

.promo-section .eyebrow {
  color: var(--temuka-gold);
}

.promo-section h2 {
  max-width: 38rem;
  margin: 0.8rem 0 0;
  font-size: clamp(2rem, 5vw, 3.7rem);
  font-weight: 760;
  letter-spacing: -0.055em;
  line-height: 1.05;
}

.promo-section p:not(.eyebrow) {
  max-width: 35rem;
  margin: 1rem 0 1.5rem;
  color: rgb(255 255 255 / 84%);
  line-height: 1.7;
}

.promo-section__mark {
  position: absolute;
  top: 50%;
  right: 7%;
  display: grid;
  width: 18rem;
  aspect-ratio: 1;
  place-items: center;
  transform: translateY(-50%) rotate(-13deg);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 42% 58% 58% 42%;
  color: rgb(255 255 255 / 12%);
  font-size: 12rem;
  font-weight: 900;
}

.promo-section__mark::before,
.promo-section__mark::after {
  position: absolute;
  inset: 1.3rem;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 58% 42% 44% 56%;
  content: '';
}

.promo-section__mark::after {
  inset: 2.6rem;
  border-radius: 43% 57% 55% 45%;
}

@media (max-width: 767.98px) {
  .promo-section {
    min-height: 0;
    margin-block: 0.5rem 3.5rem;
    border-radius: 1.2rem;
  }

  .promo-section__mark {
    right: -7rem;
    width: 15rem;
    font-size: 10rem;
  }
}

@media (max-width: 599.98px) {
  .promo-section {
    width: min(100% - 1.5rem, 38rem);
    padding: 1.65rem;
  }

  .promo-section__content {
    max-width: 19rem;
  }

  .promo-section__mark {
    right: -8.5rem;
    opacity: 0.65;
  }
}
</style>
