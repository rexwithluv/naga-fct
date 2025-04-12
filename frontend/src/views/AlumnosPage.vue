<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { Alumno } from '@/types/models/Alumno'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast = useToast()
  const alumnos: Ref<Alumno[]> = ref([])
  const alumnoID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getAlumnos = async (): Promise<void> => {
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

  const verDetalles = (e: { data: Alumno }) => {
    alumnoID.value = e.data.id
    dialogDetalles.value = true
  }

  onMounted(getAlumnos)
</script>

<template>
  <div>
    <DialogDetallesAlumno v-model:alumnoID="alumnoID" v-model:visible="dialogDetalles" />
    <DataTable :value="alumnos" @row-click="verDetalles" rowHover>
      <Column field="dniNie" header="DNI/NIE" />
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="telefono" header="Teléfono" />
      <Column field="concello" header="Concello" />
      <Column field="estado" header="Estado" />
      <Column field="tutorCentro" header="Tutor" />
    </DataTable>
  </div>
</template>
