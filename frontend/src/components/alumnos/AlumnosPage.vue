<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { FilterMatchMode } from '@primevue/core/api'
  import { StoreGeneric } from 'pinia'
  import { ToastServiceMethods, useConfirm } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'
  import { useConcello } from '../../composables/useConcello'

  const auth: StoreGeneric = useAuthStore()
  const toast: ToastServiceMethods = useToast()
  const confirm = useConfirm()
  const { getConcellos } = useConcello()

  const concellos = ref([])
  const estadosAlumno = ref([])

  const alumnos: Ref<Alumno[]> = ref([])
  const alumnoID: Ref<number> = ref(0)
  const dialogCrear: Ref<boolean> = ref(false)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogActualizar: Ref<boolean> = ref(false)

  const filters = ref({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    apellidos: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'concello.nombre': { value: null, matchMode: FilterMatchMode.EQUALS },
    'estado.nombre': { value: null, matchMode: FilterMatchMode.EQUALS },
  })

  const getAlumnos = async () => {
    try {
      const response = await apiClient.get('/alumnos')
      alumnos.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los alumnos',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const getEstadosAlumno = async () => {
    try {
      const response = await apiClient.get('/estados-alumno')
      estadosAlumno.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los posibles estados de un alumno.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const deleteAlumno = async (id: number): Promise<void> => {
    confirm.require({
      message: '¿Estás seguro de que quieres eliminar a este alumno?',
      header: 'Eliminar alumno',
      /* icon: 'pipi', */
      rejectProps: {
        label: 'Cancelar',
      },
      acceptProps: {
        label: 'Eliminar',
      },

      accept: async () => {
        try {
          await apiClient.delete(`/alumnos/${id}`)
          toast.add({
            severity: 'success',
            summary: 'Alumno eliminado correctamente.',
            detail: `Se ha eliminado el alumno con id ${id}.`,
            life: 5000,
          })
          getAlumnos()
        } catch (error: any) {
          toast.add({
            severity: 'error',
            summary: 'Error al eliminar el alumno.',
            detail: error.message,
            life: 5000,
          })
        }
      },
    })
  }

  const verCrear = () => {
    dialogCrear.value = true
  }
  const verDetalles = (id: number) => {
    alumnoID.value = id
    dialogDetalles.value = true
  }
  const verActualizar = (id: number) => {
    alumnoID.value = id
    dialogActualizar.value = true
  }

  onMounted(async () => {
    await getAlumnos()
    await getEstadosAlumno()
    concellos.value = await getConcellos()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesAlumno v-model:alumnoID="alumnoID" v-model:visible="dialogDetalles" />
    <DialogCrearAlumno v-model:visible="dialogCrear" @alumnoCreado="getAlumnos" />
    <DialogUpdateAlumno
      v-model:visible="dialogActualizar"
      v-model:alumnoID="alumnoID"
      @alumnoEditado="getAlumnos"
    />

    <div class="mb-5 text-center">
      <div class="mb-5">
        <h1 class="text-2xl font-bold mb-3">Alumnos</h1>
        <Button label="Crear alumno" @click="verCrear" />
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
      <Column field="tutorCentro.nombre" header="Tutor" v-if="auth.isAdmin" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="verDetalles(data.id)" />
          <Button class="mr-2" label="Editar" @click="verActualizar(data.id)" />
          <Button label="Dar de baja" @click="deleteAlumno(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
