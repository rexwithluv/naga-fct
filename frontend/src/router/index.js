import { useAuthStore } from '@/stores/authStore'
import AlumnosPage from '@/views/AlumnosPage.vue'
import HomePage from '@/views/HomePage.vue'
import LandingPage from '@/views/LandingPage.vue'
import LoginPage from '@/views/LoginPage.vue'
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
      component: HomePage,
    },
    {
      path: '/tutores',
      name: 'tutores',
      component: HomePage,
    },
    {
      path: '/fcts',
      name: 'fcts',
      component: HomePage,
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: HomePage,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: HomePage,
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
