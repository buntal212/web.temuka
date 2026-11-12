<template>
  <q-card class="auth-card" flat>
    <q-card-section class="auth-card__header">
      <h1 class="auth-card__title">{{ title }}</h1>
      <p class="auth-card__description">{{ description }}</p>
    </q-card-section>
    <q-card-section class="auth-card__body"><slot /></q-card-section>
    <q-card-section class="auth-card__footer">
      <slot name="footer" />
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<style scoped lang="scss">
.auth-card {
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--temuka-ivory);
  color: var(--temuka-ink);
  box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 18%);
}

.auth-card__header {
  padding: 2rem 2rem 0.75rem;
  text-align: center;
}

.auth-card__title {
  margin: 0;
  color: var(--temuka-ink);
  font-size: clamp(1.75rem, 6vw, 2rem);
  font-weight: 760;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.auth-card__description {
  max-width: 34ch;
  margin: 0.65rem 0 0;
  margin-inline: auto;
  color: var(--temuka-muted);
  font-size: 0.98rem;
  line-height: 1.55;
}

.auth-card__body {
  padding: 1rem 2rem 1.5rem;
}

.auth-card__footer {
  padding: 1rem 2rem 1.25rem;
  border-top: 1px solid var(--temuka-border);
  color: var(--temuka-muted);
  font-size: 0.93rem;
  text-align: center;
}

@media (max-width: 599.98px) {
  .auth-card__header {
    padding: 1.5rem 1.25rem 0.5rem;
  }

  .auth-card__body {
    padding: 0.85rem 1.25rem 1.25rem;
  }

  .auth-card__footer {
    padding-inline: 1.25rem;
  }
}
</style>
