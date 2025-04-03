<script setup lang="js">
import apiClient from '@/apiClient'
import DialogDetallesTutor from '@/components/usuarios/DialogDetallesUsuario.vue'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const usuarios = ref([])
const usuarioID = ref(null)
const dialogDetalles = ref(false)

const getUsuarios = async () => {
  try {
    const response = await apiClient.get('/usuarios')
    console.log(response.data)
    usuarios.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar los usuarios',
      detail: error.message,
      life: 5000,
    })
  }
}

const verDetalles = (e) => {
  usuarioID.value = e.data.id
  dialogDetalles.value = true
}

onMounted(getUsuarios)
</script>

<template>
  <div>
    <DialogDetallesTutor v-model:usuarioID="usuarioID" v-model:visible="dialogDetalles"  />

    <DataTable :value="usuarios" @row-click="verDetalles" row-hover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column field="tutor" header="Tutor de..." />
      <Column field="activo" header="Activo" />
    </DataTable>
  </div>
</template>
