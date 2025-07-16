<script setup lang="ts">
  import { useFct } from '@/composables/useFct'
  import formatDate from '@/helpers/formatDate'
  import { FCTResponse } from '@/types/models/FCT'
  import { FilterMatchMode } from '@primevue/core/api'
  import { onMounted, Ref, ref } from 'vue'

  const { getAllFct, deleteFct } = useFct()

  const fct: Ref<FCTResponse[]> = ref([])

  const selectedFct: Ref<FCTResponse | object> = ref({})
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)

  const filters = ref({
    alumno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    empresa: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fechaFin: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  const openDetailsDialog = (fctData: FCTResponse) => {
    selectedFct.value = fctData
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }

  const handleGetAllFct = async () => {
    fct.value = await getAllFct()
  }
  const handleDeleteFct = async (fctData: FCTResponse) => {
    const success = await deleteFct(fctData)
    if (success) {
      fct.value = await getAllFct()
    }
  }

  onMounted(async () => {
    fct.value = await getAllFct()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesFCT v-model:selectedFct="selectedFct" v-model:isVisible="showDetailsDialog" />
    <DialogCrearFCT v-model:isVisible="showCreateDialog" @fctCreada="handleGetAllFct" />

    <div class="mb-5 text-center">
      <div class="mb-5">
        <h1 class="text-2xl font-bold mb-3">FCT</h1>
        <Button label="Crear FCT" @click="openCreateDialog" />
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
      <Column header="Fecha de inicio">
        <template #body="{ data }">
          {{ formatDate(data.fechaInicio) }}
        </template>
      </Column>
      <Column field="fechaFin" header="Fecha de fin">
        <template #body="{ data }">
          {{ formatDate(data.fechaFin) }}
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openDetailsDialog(data)" disabled />
          <Button label="Finalizar" @click="handleDeleteFct(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
