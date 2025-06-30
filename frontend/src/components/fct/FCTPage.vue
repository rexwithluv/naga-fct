<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { FCT } from '@/types/models/FCT'
  import { FilterMatchMode } from '@primevue/core/api'
  import { ToastServiceMethods, useConfirm } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()
  const confirm = useConfirm()

  const fct: Ref<FCT[]> = ref([])
  const FCTID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const filters = ref({
    alumno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    empresa: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fechaFin: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  const getFct = async () => {
    try {
      const response = await apiClient.get('/fct')
      fct.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las FCT',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const deleteFct = async (id: number): Promise<void> => {
    confirm.require({
      message: '¿Estás seguro de que quieres finalizar esta FCT?',
      header: 'Finalizar FCT',
      /* icon: 'pipi', */
      rejectProps: {
        label: 'Cancelar',
      },
      acceptProps: {
        label: 'Finalizar',
      },

      accept: async () => {
        try {
          await apiClient.delete(`/fct/${id}`)
          toast.add({
            severity: 'success',
            summary: 'FCT finalizada correctamente.',
            detail: `Se ha finalizado la FCT con id ${id}.`,
            life: 5000,
          })
          getFct()
        } catch (error: any) {
          toast.add({
            severity: 'error',
            summary: 'Error al finalizar la FCT.',
            detail: error.message,
            life: 5000,
          })
        }
      },
    })
  }

  const verDetalles = (id: number) => {
    FCTID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    await getFct()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesFCT v-model:FCTID="FCTID" v-model:visible="dialogDetalles" />
    <DialogCrearFCT v-model:visible="dialogCrear" @fctCreada="getFct"></DialogCrearFCT>

    <div class="mb-5 text-center">
      <div class="mb-5">
        <h1 class="text-2xl font-bold mb-3">FCT</h1>
        <Button label="Crear FCT" @click="verCrear" />
      </div>

      <div class="flex text-center gap-2">
        <div class="flex-grow">
          <label for="filter-alumno" class="font-semibold">Alumno</label>
          <InputText
            id="filter-alumno"
            class="flex-auto"
            placeholder="Carlitos"
            autocomplete="off"
            v-model="filters.alumno.value"
          />
        </div>

        <div class="flex-grow">
          <label for="filter-empresa" class="font-semibold">Empresa</label>
          <InputText
            id="filter-empresa"
            class="flex-auto"
            placeholder="Informática Rueda SL"
            autocomplete="off"
            v-model="filters.empresa.value"
          />
        </div>

        <!-- <div class="flex-grow">
          <label for="filter-fecha-fin" class="font-semibold">Fecha de fin</label>
          <InputText
            id="filter-fecha-fin"
            class="flex-auto"
            placeholder="Informática Rueda SL"
            autocomplete="off"
            v-model="filters.fechaFin.value"
          />
        </div> -->
      </div>
    </div>

    <DataTable
      :value="fct"
      v-model:filters="filters"
      filterDisplay="menu"
      paginator
      :rows="10"
      rowHover
    >
      <Column field="alumno" header="Alumno" />
      <Column field="tutorEmpresa" header="Tutor en la empresa" />
      <Column field="empresa" header="Empresa" />
      <Column field="fechaInicio" header="Fecha de inicio" />
      <Column field="fechaFin" header="Fecha de fin" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="verDetalles(data.id)" />
          <Button class="mr-2" label="Editar" @click="verDetalles(data.id)" />
          <Button label="Finalizar" @click="deleteFct(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
