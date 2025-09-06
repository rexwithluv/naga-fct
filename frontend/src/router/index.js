import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/components/LandingPage.vue'),
      meta: {
        requiresAuth: false,
        requireAdmin: false,
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/HomePage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginPage.vue'),
      meta: {
        requiresAuth: false,
        requireAdmin: false,
      },
    },
    {
      path: '/alumnos',
      name: 'alumnos',
      component: () => import('@/components/alumnos/AlumnosPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: () => import('@/components/empresas/EmpresasPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/tutores-centro',
      name: 'tutoresCentro',
      component: () => import('@/components/tutoresCentro/TutoresCentroPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: '/tutores-empresa',
      name: 'tutoresEmpresa',
      component: () => import('@/components/tutoresEmpresa/TutoresEmpresaPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/components/usuarios/UsuariosPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: '/fct',
      name: 'fct',
      component: () => import('@/components/fct/FCTPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: () => import('@/components/HomePage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/components/PerfilPage.vue'),
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFoundPage.vue'),
      meta: {
        requiresAuth: false,
        requireAdmin: false,
      },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   const isAuthenticated = Boolean(authStore.token)
//   const userIsAdmin = authStore.isAdmin

//   if (isAuthenticated && !to.meta.requiresAuth) {
//     next({ name: 'home' })
//   }

//   if (!to.meta.requiresAuth) {
//     next()
//   }

//   if (!isAuthenticated) {
//     next({ name: 'login' })
//   }

//   if (!to.meta.requireAdmin) {
//     next()
//   } else {
//     if (userIsAdmin) {
//       next()
//     } else {
//       next({ name: 'home' })
//     }
//   }
// })

export default router
