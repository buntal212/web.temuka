const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/modules/beranda/pages/BerandaPage.vue') },
      {
        path: 'akun',
        component: () => import('src/modules/akun/pages/AkunPage.vue'),
      },
      { path: 'masuk', component: () => import('src/modules/auth/pages/LoginPage.vue') },
      { path: 'daftar', component: () => import('src/modules/auth/pages/RegisterPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
]

export default routes
