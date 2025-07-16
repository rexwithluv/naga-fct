<script setup lang="ts">
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import booleanToSpanish from '@/helpers/booleanToSpanish'
  import { TutorCentroResponse } from '@/types/models/TutorCentro'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearTutorCentro from './DialogCrearTutorCentro.vue'
  import DialogDetallesTutorCentro from './DialogDetallesTutorCentro.vue'

  const { getTutoresCentro, deleteTutorCentro } = useTutorCentro()

  const tutoresCentro: Ref<TutorCentroResponse[]> = ref([])

  const selectedTutorCentro: Ref<TutorCentroResponse> = ref({} as TutorCentroResponse)
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)

  const openDetailsDialog = (tutorCentroData: TutorCentroResponse) => {
    selectedTutorCentro.value = tutorCentroData
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }

  const handleGetTutoresCentro = async () => {
    tutoresCentro.value = await getTutoresCentro()
  }
  const handleDeleteTutorCentro = async (tutorCentroData: TutorCentroResponse) => {
    const success = await deleteTutorCentro(tutorCentroData)
    if (success) {
      tutoresCentro.value = await getTutoresCentro()
    }
  }

  onMounted(async () => {
    tutoresCentro.value = await getTutoresCentro()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesTutorCentro
      v-model:selectedTutorCentro="selectedTutorCentro"
      v-model:isVisible="showDetailsDialog"
    />
    <DialogCrearTutorCentro
      v-model:isVisible="showCreateDialog"
      @tutorCentroCreado="handleGetTutoresCentro"
    />

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Tutores de centro</h1>
      <Button label="Crear tutor de centro" @click="openCreateDialog" />
    </div>

    <DataTable :value="tutoresCentro" paginator :rows="10" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="curso" header="Curso" />
      <Column field="activo" header="Activo?">
        <template #body="{ data }">
          {{ booleanToSpanish(data.activo) }}
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openDetailsDialog(data)" disabled />
          <Button label="Desactivar" @click="handleDeleteTutorCentro(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
