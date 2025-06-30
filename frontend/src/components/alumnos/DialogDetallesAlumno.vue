<script setup lang="ts">
  import { useAlumno } from '@/composables/useAlumno'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { StoreGeneric } from 'pinia'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const auth: StoreGeneric = useAuthStore()
  const { getAlumno } = useAlumno()

  const alumnoID: ModelRef<number | undefined> = defineModel('alumnoID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')
  const alumno: Ref<Alumno | null> = ref(null)

  // Solo cuando el Dialog es visible intentamos cargar los datos
  watch(visible, async (newValue) => {
    if (newValue === true) {
      if (alumnoID.value !== undefined) {
        alumno.value = await getAlumno(alumnoID.value)
      }
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
      <li>Concello: {{ alumno?.concello.nombre }}</li>
      <li>Correo electrónico: {{ alumno?.email }}</li>
      <li>Teléfono: {{ alumno?.telefono }}</li>
      <li>NUSS: {{ alumno?.numeroSeguridadSocial }}</li>
      <li>Estado: {{ alumno?.estado.nombre }}</li>
      <li v-if="auth.isAdmin">Tutor: {{ alumno?.tutorCentro.nombre }}</li>
    </ul>
  </Dialog>
</template>
