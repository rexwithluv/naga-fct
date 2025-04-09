<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const FCTs = ref([])
const FCTID = ref(null)
const dialogDetalles = ref(false)

const getFCT = async () => {
  try {
    const response = await apiClient.get('/fct')
    FCTs.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar las FCT',
      detail: error.message,
      life: 5000,
    })
  }
}

const verDetalles = (e) => {
  FCTID.value = e.data.id
  dialogDetalles.value = true
}

onMounted(getFCT)
</script>

<template>
  <div>
    <DialogDetallesFCT v-model:FCTID="FCTID" v-model:visible="dialogDetalles" />

    <DataTable :value="FCTs" @row-click="verDetalles" rowHover>
      <Column field="alumno" header="Alumno" />
      <Column field="tutor" header="Tutor en la empresa" />
      <Column field="empresa" header="Empresa" />
      <Column field="fechaInicio" header="Fecha de inicio" />
      <Column field="fechaFin" header="Fecha de fin" />
    </DataTable>
  </div>
</template>
