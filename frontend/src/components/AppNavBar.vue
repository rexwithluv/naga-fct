<script setup lang="js">
import { Calendar1, CircleUserRound } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Alumnos',
    name: 'alumnos',
  },
  {
    label: 'Empresas',
    name: 'empresas',
  },
  {
    label: 'Tutores',
    name: 'tutores',
  },
  {
    label: 'Usuarios',
    name: 'usuarios',
  },
  {
    label: 'FCT',
    name: 'fct',
  },
])

const goTo = (route) => {
  router.push({ name: route })
}
</script>

<template>
  <nav class="p-4 sticky">
    <Menubar :model="items">
      <template #start>
        <RouterLink :to="{ name: 'home' }" class="text-lg font-semibold ms-2 me-5">
          NAGA - FCT
        </RouterLink>
      </template>

      <template #item="{ item }">
        <RouterLink :to="{ name: item.name }" class="text-center me-2 ms-2 p-1">
          {{ item.label }}
        </RouterLink>
      </template>

      <template #end>
        <div class="flex gap-2">
          <Button @click="goTo('calendario')" class="p-button-text">
            <Calendar1 size="32" stroke-width="1.5" />
          </Button>
          <Button @click="goTo('perfil')" class="p-button-text">
            <CircleUserRound size="32" stroke-width="1.5" />
          </Button>
        </div>
      </template>
    </Menubar>
  </nav>
</template>
