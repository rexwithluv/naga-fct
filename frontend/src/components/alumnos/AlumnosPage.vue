<script setup lang="ts">
  import { useAlumno } from '@/composables/useAlumno'
  import { useConcello } from '@/composables/useConcello'
  import { useEstadoAlumno } from '@/composables/useEstadoAlumno'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { Concello } from '@/types/models/Concello'
  import { EstadoAlumno } from '@/types/models/EstadoAlumno'
  import { FilterMatchMode } from '@primevue/core/api'
  import { StoreGeneric } from 'pinia'
  import { onMounted, Ref, ref } from 'vue'

  const authStore: StoreGeneric = useAuthStore()
  const { getAlumnos, getAlumno, deleteAlumno } = useAlumno()
  const { getConcellos } = useConcello()
  const { getEstadosAlumno } = useEstadoAlumno()

  const alumnos: Ref<Alumno[]> = ref([])
  const concellos: Ref<Concello[]> = ref([])
  const estadosAlumno: Ref<EstadoAlumno[]> = ref([])

  const selectedAlumno: Ref<Alumno> = ref({})
  const showCreateDialog: Ref<boolean> = ref(false)
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showUpdateDialog: Ref<boolean> = ref(false)

  const filters = ref({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    apellidos: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'concello.nombre': { value: null, matchMode: FilterMatchMode.EQUALS },
    'estado.nombre': { value: null, matchMode: FilterMatchMode.EQUALS },
  })

  const openCreateDialog = () => {
    showCreateDialog.value = true
  }
  const openDetailsDialog = (alumnoData: Alumno) => {
    selectedAlumno.value = alumnoData
    showDetailsDialog.value = true
  }
  const openUpdateDialog = (alumnoData: Alumno) => {
    selectedAlumno.value = alumnoData
    showUpdateDialog.value = true
  }

  const handleGetAlumnos = async () => {
    alumnos.value = await getAlumnos()
  }
  const handleDeleteAlumno = async (alumnoData: Alumno) => {
    const success: boolean = await deleteAlumno(alumnoData)
    if (success) {
      alumnos.value = await getAlumnos()
    }
  }

  onMounted(async () => {
    alumnos.value = await getAlumnos()
    estadosAlumno.value = await getEstadosAlumno()
    concellos.value = await getConcellos()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesAlumno
      v-model:selectedAlumno="selectedAlumno"
      v-model:isVisible="showDetailsDialog"
    />
    <DialogCrearAlumno v-model:isVisible="showCreateDialog" @alumnoCreado="handleGetAlumnos" />
    <DialogUpdateAlumno
      v-model:isVisible="showUpdateDialog"
      v-model:selectedAlumno="selectedAlumno"
      @alumnoEditado="handleGetAlumnos"
    />

    <div class="mb-5 text-center">
      <div class="mb-5">
        <h1 class="text-2xl font-bold mb-3">Alumnos</h1>
        <Button label="Crear alumno" @click="openCreateDialog" />
      </div>

      <div class="flex text-center gap-2">
        <div class="flex-grow">
          <label for="filter-nombre" class="font-semibold">Nombre</label>
          <InputText
            id="filter-nombre"
            class="flex-auto"
            placeholder="María Belén"
            autocomplete="off"
            v-model="filters.nombre.value"
          />
        </div>

        <div class="flex-grow">
          <label for="filter-apellidos" class="font-semibold">Apellido/s</label>
          <InputText
            id="filter-apellidos"
            class="flex-auto"
            placeholder="Esteban Menéndez"
            autocomplete="off"
            v-model="filters.apellidos.value"
          />
        </div>

        <div class="flex-grow">
          <label for="filter-conello" class="font-semibold">Concello</label>
          <Select
            id="filter-conello"
            name="filter-conello"
            class="flex-auto"
            :options="concellos"
            optionValue="nombre"
            optionLabel="nombre"
            placeholder="Selecciona un concello..."
            v-model="filters['concello.nombre'].value"
            showClear
          />
        </div>

        <div class="flex-grow">
          <label for="filter-estado" class="font-semibold">Estado</label>
          <Select
            id="filter-estado"
            name="filter-estado"
            class="flex-auto"
            :options="estadosAlumno"
            optionValue="nombre"
            optionLabel="nombre"
            placeholder="El alumno está..."
            v-model="filters['estado.nombre'].value"
            showClear
          />
        </div>
      </div>
    </div>

    <DataTable
      :value="alumnos"
      v-model:filters="filters"
      filterDisplay="menu"
      paginator
      :rows="10"
      rowHover
    >
      <Column field="dniNie" header="DNI/NIE" />
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="telefono" header="Teléfono" />
      <Column field="concello.nombre" header="Concello" />
      <Column field="estado.nombre" header="Estado" />
      <Column field="tutorCentro.nombre" header="Tutor" v-if="authStore.isAdmin" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openUpdateDialog(data)" />
          <Button label="Dar de baja" @click="handleDeleteAlumno(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
