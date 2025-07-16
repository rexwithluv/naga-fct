<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { Usuario } from '@/types/models/Usuario'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const usuarioID: ModelRef<number | undefined> = defineModel('usuarioID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')
  const usuario: Ref<Usuario | null> = ref(null)

  const getUsuarioData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/usuarios/${usuarioID.value}`)
      usuario.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar el usuario.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  // Solo cuando el Dialog es visible intentamos cargar los datos
  watch(visible, async (newValue) => {
    if (newValue) {
      await getUsuarioData()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles del usuario" modal dismissableMask>
    <ul>
      <li>ID: {{ usuario?.id }}</li>
      <li>Email: {{ usuario?.email }}</li>
      <li>Rol: {{ usuario?.rol }}</li>
      <li>Tutor de: {{ usuario?.tutor }}</li>
      <li>Activo: {{ usuario?.activo }}</li>
    </ul>
  </Dialog>
</template>
