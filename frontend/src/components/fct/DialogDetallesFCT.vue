<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { FCT } from '@/types/models/FCT'
  import { useToast } from 'primevue'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const toast = useToast()
  const FCTID: ModelRef<number | undefined> = defineModel('FCTID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const fct: Ref<FCT | null> = ref(null)

  const getTutorData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/fct/${FCTID.value}`)
      fct.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la FCT',
        detail: error.message,
        life: 5000,
      })
    }
  }

  // Solo cuando el Dialog es visible intentamos cargar los datos
  watch(visible, async (newValue) => {
    if (newValue === true) {
      await getTutorData()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Detalles de FCT" modal dismissableMask>
    <ul>
      <li>ID: {{ fct?.id }}</li>
      <li>Alumno: {{ fct?.alumno }}</li>
      <li>Tutor: {{ fct?.tutorEmpresa }}</li>
      <li>Empresa: {{ fct?.empresa }}</li>
      <li>Fecha de inicio: {{ fct?.fechaInicio }}</li>
      <li>Fecha de fin: {{ fct?.fechaFin }}</li>
    </ul>
  </Dialog>
</template>
