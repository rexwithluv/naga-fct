<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { Alumno } from '@/types/models/Alumno'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast = useToast()
  const usuarios: Ref<Alumno[]> = ref([])
  const usuarioID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getUsuarios = async (): Promise<void> => {
    try {
      const response = await apiClient.get('/usuarios')
      usuarios.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los usuarios',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verDetalles = (e: { data: Alumno }): void => {
    usuarioID.value = e.data.id
    dialogDetalles.value = true
  }

  onMounted(getUsuarios)
</script>

<template>
  <div>
    <DialogDetallesTutor v-model:usuarioID="usuarioID" v-model:visible="dialogDetalles" />

    <DataTable :value="usuarios" @row-click="verDetalles" rowHover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column field="tutor" header="Tutor de..." />
      <Column field="activo" header="Activo" />
    </DataTable>
  </div>
</template>
