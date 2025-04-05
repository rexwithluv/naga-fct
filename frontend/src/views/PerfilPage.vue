<script setup lang="js">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const usuario = ref(null)

const logout = () => {
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
    usuario.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar la información del usuario',
      detail: error.message,
      life: 5000,
    })
  }
}

onMounted(getUserData)
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-gray-500 p-4 rounded">
      <ul>
        <li>ID: {{ usuario?.id }}</li>
        <li>Email: {{ usuario?.email }}</li>
        <li>Rol: {{ usuario?.rol }}</li>
        <li>Tutor de: {{ usuario?.tutor }}</li>
      </ul>

      <Divider />

      <Button label="Cerrar sesión" @click="logout" />
    </div>
  </div>
</template>
