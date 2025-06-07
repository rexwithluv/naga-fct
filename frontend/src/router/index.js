import AlumnosPage from '@/components/alumnos/AlumnosPage.vue'
import EmpresasPage from '@/components/empresas/EmpresasPage.vue'
import FCTPage from '@/components/fct/FCTPage.vue'
import HomePage from '@/components/home/HomePage.vue'
import LandingPage from '@/components/LandingPage.vue'
import LoginPage from '@/components/LoginPage.vue'
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
      component: LandingPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/alumnos',
      name: 'alumnos',
      component: AlumnosPage,
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: EmpresasPage,
    },
    {
      path: '/tutores-centro',
      name: 'tutoresCentro',
      component: TutoresCentroPage,
    },
    {
      path: '/tutores-empresa',
      name: 'tutoresEmpresa',
      component: TutoresEmpresaPage,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosPage,
    },
    {
      path: '/fct',
      name: 'fct',
      component: FCTPage,
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: HomePage,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilPage,
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
  const auth = useAuthStore()

  if (to.name !== 'login' && to.name !== 'inicio' && !auth.token) {
    return next({ name: 'login' })
  }

  next()
})

export default router
