<template>
  <main class="not-found">
    <p class="eyebrow">Temuka</p>
    <p class="not-found__code">404</p>
    <h1>Halaman ini belum ditemukan</h1>
    <p class="not-found__description">Periksa kembali alamatnya atau kembali ke beranda Temuka.</p>
    <q-btn color="primary" unelevated label="Kembali ke beranda" to="/" />
  </main>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--temuka-background);
  text-align: center;
}

.not-found__code {
  margin: 0.5rem 0 0;
  color: var(--temuka-gold);
  font-size: clamp(6rem, 24vw, 13rem);
  font-weight: 850;
  letter-spacing: -0.1em;
  line-height: 0.9;
}

.not-found h1 {
  margin: 1rem 0 0;
  color: var(--temuka-on-dark);
  font-size: clamp(1.5rem, 5vw, 2.2rem);
}

.not-found__description {
  max-width: 27rem;
  margin: 0.65rem 0 1.5rem;
  color: var(--temuka-on-dark-muted);
  line-height: 1.6;
}
</style>
