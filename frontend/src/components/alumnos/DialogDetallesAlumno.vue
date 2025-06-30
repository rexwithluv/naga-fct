<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { StoreGeneric } from 'pinia'
  import { ModelRef } from 'vue'

  const authStore: StoreGeneric = useAuthStore()

  const visible: ModelRef<boolean | undefined> = defineModel('visible')
  const alumno: ModelRef<Alumno | null> = defineModel('selectedAlumno')
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
      <li v-if="authStore.isAdmin">Tutor: {{ alumno?.tutorCentro.nombre }}</li>
    </ul>
  </Dialog>
</template>
