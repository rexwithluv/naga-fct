<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const fct = ref([])

const getFCT = async () => {
  try {
    const response = await apiClient.get('/fct')
    console.log(response.data)
    fct.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar las FCT',
      detail: error.message,
      life: 5000,
    })
  }
}

onMounted(() => {
  getFCT()
})
</script>

<template>
  <DataTable :value="fct">
    <Column field="alumnoId" header="ID Alumno" />
    <Column field="tutorEmpresaId" header="ID Tutor Empresa" />
    <Column field="fechaInicio" header="Fecha de inicio" />
    <Column field="fechaFin" header="Fecha de fin" />
  </DataTable>
</template>
