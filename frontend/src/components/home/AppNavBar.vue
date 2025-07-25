<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  import { Calendar1, CircleUserRound } from 'lucide-vue-next'
  import { StoreGeneric } from 'pinia'
  import { Router, useRouter } from 'vue-router'

  const router: Router = useRouter()
  const authStore: StoreGeneric = useAuthStore()

  interface Route {
    label: string
    name: string
    needAdmin: boolean
  }

  const routes: Route[] = [
    {
      label: 'Alumnos',
      name: 'alumnos',
      needAdmin: false,
    },
    {
      label: 'Empresas',
      name: 'empresas',
      needAdmin: false,
    },
    {
      label: 'Tutores del centro',
      name: 'tutoresCentro',
      needAdmin: true,
    },
    {
      label: 'Usuarios',
      name: 'usuarios',
      needAdmin: true,
    },
    {
      label: 'Tutores de empresa',
      name: 'tutoresEmpresa',
      needAdmin: false,
    },
    {
      label: 'FCT',
      name: 'fct',
      needAdmin: false,
    },
  ]
  const filteredRoutes: Route[] = routes.filter((route) => !route.needAdmin || authStore.isAdmin)

  const goTo = (route: string): void => {
    router.push({ name: route })
  }
</script>

<template>
  <nav class="p-4 sticky">
    <Menubar :model="filteredRoutes">
      <template #start>
        <RouterLink :to="{ name: 'home' }" class="text-lg font-semibold ms-2 me-5">
          NAGA - FCT
        </RouterLink>
      </template>

      <template #item="{ item }">
        <Button @click="goTo(item.name)" class="p-button-text">
          {{ item.label }}
        </Button>
      </template>

      <template #end>
        <div class="flex gap-2">
          <Button @click="goTo('calendario')" class="p-button-text">
            <Calendar1 :size="32" :stroke-width="1.5" />
          </Button>
          <Button @click="goTo('perfil')" class="p-button-text">
            <CircleUserRound :size="32" :stroke-width="1.5" />
          </Button>
        </div>
      </template>
    </Menubar>
  </nav>
</template>
