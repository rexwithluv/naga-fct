<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { FCT } from '@/types/models/FCT'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const FCTs: Ref<FCT[]> = ref([])
  const FCTID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const getFCT = async () => {
    try {
      const response = await apiClient.get('/fct')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las FCT',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verDetalles = (id: number) => {
    FCTID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    FCTs.value = await getFCT()
  })
</script>

<template>
  <div>
    <DialogDetallesFCT v-model:FCTID="FCTID" v-model:visible="dialogDetalles" />
    <DialogCrearFCT v-model:visible="dialogCrear" @fctCreada="getFCT"></DialogCrearFCT>

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">FCT</h1>
      <Button label="Crear FCT" @click="verCrear" />
    </div>

    <DataTable :value="FCTs" rowHover>
      <Column field="alumno" header="Alumno" />
      <Column field="tutorEmpresa" header="Tutor en la empresa" />
      <Column field="empresa" header="Empresa" />
      <Column field="fechaInicio" header="Fecha de inicio" />
      <Column field="fechaFin" header="Fecha de fin" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button label="Detalles" @click="verDetalles(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
