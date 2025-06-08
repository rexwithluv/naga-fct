<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearTutorEmpresa from './DialogCrearTutorEmpresa.vue'
  import DialogDetallesTutorEmpresa from './DialogDetallesTutorEmpresa.vue'

  const toast: ToastServiceMethods = useToast()

  const tutores = ref([])
  const tutorID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const getTutoresEmpresa = async () => {
    try {
      const response = await apiClient.get('/tutores-empresa')
      tutores.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los tutores de empresa.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verDetalles = (id: number) => {
    tutorID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    await getTutoresEmpresa()
  })
</script>

<template>
  <div>
    <DialogDetallesTutorEmpresa v-model:tutorID="tutorID" v-model:visible="dialogDetalles" />
    <DialogCrearTutorEmpresa
      v-model:visible="dialogCrear"
      @tutorCreado="getTutoresEmpresa"
    ></DialogCrearTutorEmpresa>

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Tutores de empresa</h1>
      <Button label="Crear tutor de empresa" @click="verCrear" />
    </div>

    <DataTable :value="tutores" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="empresa" header="Empresa" />
      <Column field="email" header="Email" />
      <Column field="Telefono" header="Teléfono" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button label="Detalles" @click="verDetalles(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
