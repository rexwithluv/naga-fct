<script setup lang="js">
import apiClient from '@/apiClient'
import formatList from '@/helpers/formatList'
import { useToast } from 'primevue'
import { watch, ref } from 'vue'

const toast = useToast()
const empresaID = defineModel('empresaID')
const visible = defineModel('visible')

const empresa = ref({})

const getEmpresaData = async () => {
  try {
    const response = await apiClient.get(`/empresas/${empresaID.value}`)
    empresa.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar la empresa',
      detail: error.message,
      life: 5000,
    })
  }
}

// Solo cuando el Dialog es visible intentamos cargar los datos
watch(visible, async (newValue) => {
  if (newValue === true) {
    await getEmpresaData()
  }
})
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles de la empresa" modal dismissableMask>
    <ul>
      <li>ID: {{ empresa?.id }}</li>
      <li>Nombre: {{ empresa?.nombre }}</li>
      <li>Concello: {{ empresa?.concello }}</li>
      <li>Dirección: {{ empresa?.direccion }}</li>
      <li>Observaciones: {{ empresa?.observaciones }}</li>
      <li>Especialidad: {{ empresa?.especialidad }}</li>
      <li>
        Contacto:
        <ul>
          <li>Nombre: {{ empresa?.contact?.nombre }}</li>
          <li>Teléfono: {{ empresa?.contacto?.telefono }}</li>
          <li>Email: {{ empresa?.contacto?.email }}</li>
        </ul>
      </li>
      <li>Activa: {{ empresa?.activa }}</li>
      <li>Plazas: {{ empresa?.plazas }}</li>
      <li>Skills: {{ formatList(empresa?.skills) }}</li>
    </ul>
  </Dialog>
</template>
