<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { Usuario } from '@/types/models/Usuario'
  import { StoreGeneric } from 'pinia'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, ref, Ref } from 'vue'
  import { Router, useRouter } from 'vue-router'

  const auth: StoreGeneric = useAuthStore()
  const router: Router = useRouter()
  const toast = useToast()

  const usuario: Ref<Usuario | null> = ref(null)

  const logout = (): void => {
    auth.logout()
    toast.add({
      severity: 'success',
      summary: '¡Hasta pronto!',
      detail: 'Has cerrado sesión correctamente',
      life: 5000,
    })
    router.push({ name: 'inicio' })
  }

  const getUserData = async () => {
    try {
      const response = await apiClient.get('/usuarios/yo')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la información del usuario',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  onMounted(async () => {
    usuario.value = await getUserData()
  })
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-gray-200 p-4 rounded">
      <ul>
        <li>ID: {{ usuario?.id }}</li>
        <li>Email: {{ usuario?.email }}</li>
        <li>Rol: {{ usuario?.rol.id }}</li>
        <li>Tutor de: {{ usuario?.tutorCentro.id }}</li>
      </ul>

      <Divider />

      <Button label="Cerrar sesión" @click="logout" />
    </div>
  </div>
</template>
