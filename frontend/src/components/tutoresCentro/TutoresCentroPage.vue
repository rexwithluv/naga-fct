<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearTutorCentro from './DialogCrearTutorCentro.vue'
  import DialogDetallesTutorCentro from './DialogDetallesTutorCentro.vue'

  const toast: ToastServiceMethods = useToast()

  const tutores: Ref<TutorCentro[]> = ref([])
  const tutorID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const getTutoresCentro = async () => {
    try {
      const response = await apiClient.get('/tutores-centro')
      tutores.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los tutores',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verDetalles = (id: number) => {
    tutorID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    await getTutoresCentro()
  })
</script>

<template>
  <div>
    <DialogDetallesTutorCentro v-model:tutorID="tutorID" v-model:visible="dialogDetalles" />
    <DialogCrearTutorCentro v-model:visible="dialogCrear" @tutorCentroCreado="getTutoresCentro" />

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Tutores de centro</h1>
      <Button label="Crear tutor de centro" @click="verCrear" />
    </div>

    <DataTable :value="tutores" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="curso" header="Curso" />
      <Column field="activo" header="Activo" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button label="Detalles" @click="verDetalles(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
