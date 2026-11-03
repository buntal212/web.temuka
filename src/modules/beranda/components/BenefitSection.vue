<template>
  <section class="benefit-section section-space" aria-labelledby="benefit-title">
    <div class="section-shell">
      <div class="benefit-section__intro">
        <p class="eyebrow">Lebih sederhana sehari-hari</p>
        <h2 id="benefit-title" class="section-heading">Ruang untuk banyak kebutuhan</h2>
        <p class="section-copy">
          Temuka membantu memulai pencarian dengan cara yang lebih teratur dan mudah dijelajahi.
        </p>
      </div>

      <div class="benefit-list">
        <article v-for="benefit in benefits" :key="benefit.number" class="benefit-item">
          <span class="benefit-item__number">{{ benefit.number }}</span>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ benefits: { type: Array, required: true } })
</script>

<style scoped lang="scss">
.benefit-section {
  background: var(--temuka-background);
}

.benefit-section__intro {
  max-width: 42rem;
}

.benefit-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 2.5rem;
  border-top: 1px solid var(--temuka-dark-border);
}

.benefit-item {
  padding: 1.4rem 1.25rem 0 0;
}

.benefit-item + .benefit-item {
  padding-left: 1.25rem;
  border-left: 1px solid var(--temuka-dark-border);
}

.benefit-item__number {
  color: var(--temuka-gold);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.benefit-item h3 {
  margin: 1.3rem 0 0.45rem;
  color: var(--temuka-on-dark);
  font-size: 1.05rem;
}

.benefit-item p {
  margin: 0;
  color: var(--temuka-on-dark-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

@media (max-width: 767.98px) {
  .benefit-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1.2rem;
  }

  .benefit-item:nth-child(3) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (max-width: 599.98px) {
  .benefit-list {
    margin-top: 1.7rem;
  }

  .benefit-item {
    padding: 1rem 0.7rem 0 0;
  }

  .benefit-item + .benefit-item {
    padding-left: 0.7rem;
  }

  .benefit-item:nth-child(3) {
    padding-left: 0;
  }

  .benefit-item h3 {
    margin-top: 0.8rem;
    font-size: 0.95rem;
  }

  .benefit-item p {
    font-size: 0.83rem;
  }
}
</style>
