<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const tutores: Ref<TutorCentro[]> = ref([])
  const tutorID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getTutores = async (): Promise<void> => {
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

  const verDetalles = (e: { data: TutorCentro }) => {
    tutorID.value = e.data.id
    dialogDetalles.value = true
  }

  onMounted(getTutores)
</script>

<template>
  <div>
    <DialogDetallesTutor v-model:tutorID="tutorID" v-model:visible="dialogDetalles" />

    <DataTable :value="tutores" @row-click="verDetalles" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="curso" header="Curso" />
      <Column field="activo" header="Activo" />
    </DataTable>
  </div>
</template>
