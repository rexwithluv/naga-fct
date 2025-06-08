<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { TutorEmpresa } from '@/types/models/TutorEmpresa'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const tutorID: ModelRef<number | undefined> = defineModel('tutorID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')
  const tutor: Ref<TutorEmpresa | null> = ref(null)

  const getTutorEmpresaData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/tutores-empresa/${tutorID.value}`)
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
      await getTutorEmpresaData()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles de tutora/" modal dismissableMask>
    <ul>
      <li>ID: {{ tutor?.id }}</li>
      <li>Nombre: {{ tutor?.nombre }}</li>
      <li>Apellidos: {{ tutor?.apellidos }}</li>
      <li>Empresa: {{ tutor?.empresa }}</li>
      <li>Correo electrónico: {{ tutor?.email }}</li>
      <li>Teléfono: {{ tutor?.telefono }}</li>
    </ul>
  </Dialog>
</template>
