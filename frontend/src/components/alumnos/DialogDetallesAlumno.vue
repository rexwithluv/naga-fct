<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { Alumno } from '@/types/models/Alumno'
  import { useToast } from 'primevue'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const toast = useToast()
  const alumnoID: ModelRef<number | undefined> = defineModel('alumnoID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const alumno: Ref<Alumno | null> = ref(null)

  const getAlumnoData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/alumnos/${alumnoID.value}`)
      alumno.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la/el alumna/o',
        detail: error.message,
        life: 5000,
      })
    }
  }

  // Solo cuando el Dialog es visible intentamos cargar los datos
  watch(visible, async (newValue) => {
    if (newValue === true) {
      await getAlumnoData()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles del alumno" modal dismissableMask>
    <ul>
      <li>ID: {{ alumno?.id }}</li>
      <li>DNI/NIE: {{ alumno?.dniNie }}</li>
      <li>Nombre: {{ alumno?.nombre }}</li>
      <li>Apellidos: {{ alumno?.apellidos }}</li>
      <li>Correo electrónico: {{ alumno?.email }}</li>
      <li>Teléfono: {{ alumno?.telefono }}</li>
      <li>NUSS: {{ alumno?.numeroSeguridadSocial }}</li>
      <li>Estado: {{ alumno?.estado }}</li>
      <li>Tutor: {{ alumno?.tutorCentro }}</li>
    </ul>
  </Dialog>
</template>
