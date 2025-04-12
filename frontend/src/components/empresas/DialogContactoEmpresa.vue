<script setup lang="ts">
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { ModelRef } from 'vue'

  const dialogVisible: ModelRef<boolean | undefined> = defineModel('visible')
  const datosContacto: ModelRef<ContactoEmpresa | undefined> = defineModel('datosContacto')
</script>

<template>
  <Dialog v-model:visible="dialogVisible" header="Datos de contacto" modal dismissableMask>
    <p>Nombre: {{ datosContacto?.nombre }}</p>
    <p>Teléfono: {{ datosContacto?.telefono }}</p>
    <p>Email: {{ datosContacto?.email }}</p>
  </Dialog>
</template>
