<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { FCT } from '@/types/models/FCT'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast = useToast()
  const FCTs: Ref<FCT[]> = ref([])
  const FCTID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getFCT = async (): Promise<void> => {
    try {
      const response = await apiClient.get('/fct')
      FCTs.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las FCT',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verDetalles = (e: { data: FCT }) => {
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
      <Column field="tutorEmpresa" header="Tutor en la empresa" />
      <Column field="empresa" header="Empresa" />
      <Column field="fechaInicio" header="Fecha de inicio" />
      <Column field="fechaFin" header="Fecha de fin" />
    </DataTable>
  </div>
</template>
