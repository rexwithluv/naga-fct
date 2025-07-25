import AlumnosPage from '@/components/alumnos/AlumnosPage.vue'
import EmpresasPage from '@/components/empresas/EmpresasPage.vue'
import FCTPage from '@/components/fct/FCTPage.vue'
import HomePage from '@/components/home/HomePage.vue'
import PerfilPage from '@/components/PerfilPage.vue'
import TutoresCentroPage from '@/components/tutoresCentro/TutoresCentroPage.vue'
import TutoresEmpresaPage from '@/components/tutoresEmpresa/TutoresEmpresaPage.vue'
import UsuariosPage from '@/components/usuarios/UsuariosPage.vue'
import { useAuthStore } from '@/stores/authStore'
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
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/HomePage.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginPage.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/alumnos',
      name: 'alumnos',
      component: AlumnosPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: EmpresasPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/tutores-centro',
      name: 'tutoresCentro',
      component: TutoresCentroPage,
      meta: {
        requiresAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: '/tutores-empresa',
      name: 'tutoresEmpresa',
      component: TutoresEmpresaPage,
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosPage,
      meta: {
        requiresAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: '/fct',
      name: 'fct',
      component: FCTPage,
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: HomePage,
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilPage,
      meta: {
        requiresAuth: true,
        requireAdmin: false,
      },
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "NotFound",
    //   // component: NotFound,
    // },
    // {
    //   // path: '/about',
    //   // name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// Guarda de Vue Router (middleware)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = Boolean(authStore.token)
  const userIsAdmin = authStore.isAdmin

  if (!to.meta.requiresAuth) {
    next()
  }

  if (!isAuthenticated) {
    next({ name: 'login' })
  }

  if (!to.meta.requireAdmin) {
    next()
  } else {
    if (userIsAdmin) {
      next()
    } else {
      next({ name: 'home' })
    }
  }
})

export default router
