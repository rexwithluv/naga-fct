<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const tutores = ref([])

const getTutores = async () => {
  try {
    const response = await apiClient.get('/tutores-centro')
    tutores.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar los tutores',
      detail: error.message,
      life: 5000,
    })
  }
}

onMounted(() => {
  getTutores()
})
</script>

<template>
  <DataTable :value="tutores">
    <Column field="nombre" header="Nombre" />
    <Column field="apellidos" header="Apellidos" />
    <Column field="email" header="Email" />
    <Column field="cursoId" header="Curso" />
    <Column field="activo" header="Activo" />
  </DataTable>
</template>
