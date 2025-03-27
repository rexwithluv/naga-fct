<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const empresas = ref([])

const getEmpresas = async () => {
  try {
    const response = await apiClient.get('/empresas');
    console.log(response.data)
    empresas.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar las empresas',
      detail: error.message,
      life: 5000,
    })
  }
}

onMounted(() => {
  getEmpresas()
})
</script>

<template>
  <DataTable :value="empresas">
    <Column field="nombre" header="Nombre" />
    <Column field="concelloId" header="Concello" />
    <Column field="direccion" header="Dirección" />
    <Column field="observaciones" header="Observaciones" />
    <Column field="contactoNombre" header="Nombre de contacto" />
    <Column field="contactoEmail" header="Email de contacto" />
    <Column field="contactoTelefono" header="Teléfono de contacto" />
    <Column field="plazas" header="Plazas" />
  </DataTable>
</template>
