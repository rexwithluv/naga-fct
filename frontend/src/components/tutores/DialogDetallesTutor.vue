<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { useToast } from 'primevue'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const toast = useToast()
  const tutorID: ModelRef<number | undefined> = defineModel('tutorID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const tutor: Ref<TutorCentro | null> = ref(null)

  const getTutorData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/tutores-centro/${tutorID.value}`)
      tutor.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la/el tutora/',
        detail: error.message,
        life: 5000,
      })
    }
  }

  // Solo cuando el Dialog es visible intentamos cargar los datos
  watch(visible, async (newValue) => {
    if (newValue === true) {
      await getTutorData()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles de tutora/" modal dismissableMask>
    <ul>
      <li>ID: {{ tutor?.id }}</li>
      <li>Nombre: {{ tutor?.nombre }}</li>
      <li>Apellidos: {{ tutor?.apellidos }}</li>
      <li>Correo electrónico: {{ tutor?.email }}</li>
      <li>Curso: {{ tutor?.curso }}</li>
      <li>Activo: {{ tutor?.activo }}</li>
    </ul>
  </Dialog>
</template>
