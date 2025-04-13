<script setup lang="ts">
  import apiClient from '@/apiClient'
  import formatList from '@/helpers/formatList'
  import { Empresa } from '@/types/models/Empresa'
  import { useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const toast = useToast()
  const empresaID: ModelRef<number | undefined> = defineModel('empresaID')
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const empresa: Ref<Empresa | null> = ref(null)

  const getEmpresaData = async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/empresas/${empresaID.value}`)
      empresa.value = response.data
    } catch (error: any) {
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
          <li>&nbsp;&nbsp;&nbsp;· Nombre: {{ empresa?.contacto?.nombre }}</li>
          <li>&nbsp;&nbsp;&nbsp;· Teléfono: {{ empresa?.contacto?.telefono }}</li>
          <li>&nbsp;&nbsp;&nbsp;· Email: {{ empresa?.contacto?.email }}</li>
        </ul>
      </li>
      <li>Activa: {{ empresa?.activa }}</li>
      <li>Plazas: {{ empresa?.plazas }}</li>
      <li>Skills: {{ formatList(empresa?.skills ?? []) }}</li>
    </ul>
  </Dialog>
</template>
