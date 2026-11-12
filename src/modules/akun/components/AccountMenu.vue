<template>
  <q-btn
    class="account-menu__trigger"
    flat
    no-caps
    :aria-label="`Menu akun ${authStore.user?.name || ''}`"
    aria-haspopup="menu"
    :aria-expanded="isMenuOpen"
  >
    <q-avatar class="account-menu__avatar" size="2rem">
      {{ userInitial }}
    </q-avatar>
    <span class="account-menu__name">{{ authStore.user?.name }}</span>
    <q-icon name="expand_more" aria-hidden="true" />

    <q-menu v-model="isMenuOpen" anchor="bottom right" self="top right" :offset="[0, 10]">
      <q-card class="account-menu__panel">
        <q-card-section class="account-menu__identity">
          <q-avatar color="primary" text-color="white" size="2.75rem">
            {{ userInitial }}
          </q-avatar>
          <div class="account-menu__identity-copy">
            <strong>{{ authStore.user?.name }}</strong>
            <span>{{ authStore.user?.email }}</span>
            <span>@{{ authStore.user?.username }}</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-list padding>
          <q-item clickable v-close-popup to="/akun">
            <q-item-section avatar>
              <q-icon name="person_outline" />
            </q-item-section>
            <q-item-section>Akun saya</q-item-section>
          </q-item>
          <q-item clickable v-close-popup :disable="isLoggingOut" @click="signOut">
            <q-item-section avatar>
              <q-icon :name="isLoggingOut ? 'hourglass_top' : 'logout'" />
            </q-item-section>
            <q-item-section>{{ isLoggingOut ? 'Sedang keluar...' : 'Keluar' }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/modules/auth/stores/auth-store.js'
import { apiInjectionKey } from 'src/shared/services/api-client.js'

const api = inject(apiInjectionKey)
const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const isLoggingOut = ref(false)

const userInitial = computed(() => authStore.user?.name?.trim().charAt(0).toUpperCase() || 'T')

async function signOut() {
  isLoggingOut.value = true
  try {
    await authStore.logout(api)
    await router.replace('/')
    $q.notify({ type: 'positive', message: 'Anda telah keluar dari akun Temuka.' })
  } catch {
    $q.notify({ type: 'negative', message: 'Belum dapat keluar. Periksa koneksi lalu coba lagi.' })
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<style scoped lang="scss">
.account-menu__trigger {
  max-width: 15rem;
  gap: 0.55rem;
  color: var(--temuka-on-dark);
  font-weight: 700;
}

.account-menu__avatar {
  flex: 0 0 auto;
  background: var(--temuka-gold);
  color: var(--temuka-ink);
  font-size: 0.9rem;
  font-weight: 800;
}

.account-menu__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu__panel {
  width: min(19rem, calc(100vw - 2rem));
  overflow: hidden;
  border-radius: 1rem;
  background: var(--temuka-ivory);
  color: var(--temuka-ink);
  box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 18%);
}

.account-menu__identity {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
}

.account-menu__identity-copy {
  display: grid;
  min-width: 0;
  gap: 0.18rem;
}

.account-menu__identity-copy strong,
.account-menu__identity-copy span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu__identity-copy span {
  color: var(--temuka-muted);
  font-size: 0.82rem;
}

.account-menu__panel :deep(.q-item) {
  min-height: 2.9rem;
  border-radius: 0.6rem;
}

.account-menu__panel :deep(.q-item:focus-visible) {
  outline: 3px solid var(--temuka-focus);
  outline-offset: 1px;
}

@media (max-width: 599.98px) {
  .account-menu__trigger {
    max-width: 11rem;
    padding-inline: 0.35rem;
  }
}
</style>
