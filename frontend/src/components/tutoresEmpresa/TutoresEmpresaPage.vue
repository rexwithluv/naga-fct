<script setup lang="ts">
  import { useTutorEmpresa } from '@/composables/useTutorEmpresa'
  import { TutorEmpresaResponse } from '@/types/models/TutorEmpresa'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearTutorEmpresa from './DialogCrearTutorEmpresa.vue'
  import DialogDetallesTutorEmpresa from './DialogDetallesTutorEmpresa.vue'

  const { getTutoresEmpresa } = useTutorEmpresa()

  const tutoresEmpresa: Ref<TutorEmpresaResponse[]> = ref([])

  const selectedTutorEmpresa: Ref<TutorEmpresaResponse> = ref({} as TutorEmpresaResponse)
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)

  const handleGetTutoresEmpresa = async () => {
    tutoresEmpresa.value = await getTutoresEmpresa()
  }

  const openDetailsDialog = (tutorEmpresaData: TutorEmpresaResponse) => {
    selectedTutorEmpresa.value = tutorEmpresaData
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }

  onMounted(async () => {
    tutoresEmpresa.value = await getTutoresEmpresa()
  })
</script>

<template>
  <div>
    <DialogDetallesTutorEmpresa
      v-model:selectedTutorEmpresa="selectedTutorEmpresa"
      v-model:isVisible="showDetailsDialog"
    />
    <DialogCrearTutorEmpresa
      v-model:isVisible="showCreateDialog"
      @tutorEmpresaCreado="handleGetTutoresEmpresa"
    />

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Tutores de empresa</h1>
      <Button label="Crear tutor de empresa" @click="openCreateDialog" />
    </div>

    <DataTable :value="tutoresEmpresa" paginator :rows="10" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="empresa" header="Empresa" />
      <Column field="email" header="Email" />
      <Column field="Telefono" header="Teléfono" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Detalles" @click="openDetailsDialog(data)" />
          <Button label="Editar" @click="openDetailsDialog(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
