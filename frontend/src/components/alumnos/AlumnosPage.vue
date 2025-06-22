<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { StoreGeneric } from 'pinia'
  import { ToastServiceMethods, useConfirm } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const auth: StoreGeneric = useAuthStore()
  const toast: ToastServiceMethods = useToast()
  const confirm = useConfirm()

  const alumnos: Ref<Alumno[]> = ref([])
  const alumnoID: Ref<number> = ref(0)
  const dialogCrear: Ref<boolean> = ref(false)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogActualizar = ref(false)

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
      <h1 class="text-2xl font-bold mb-3">Alumnos</h1>
      <Button label="Crear alumno" @click="verCrear" />
    </div>

    <DataTable :value="alumnos" rowHover>
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
          <Button label="Ver detalles" @click="verDetalles(data.id)" />
          <Button label="Editar" @click="verActualizar(data.id)" />
          <Button label="Dar de baja" @click="deleteAlumno(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
