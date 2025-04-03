<script setup lang="js">
import apiClient from '@/apiClient'
import DialogDetallesTutor from '@/components/tutores/DialogDetallesTutor.vue'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const tutores = ref([])
const tutorID = ref(null)
const dialogDetalles = ref(false)

const getTutores = async () => {
  try {
    const response = await apiClient.get('/tutores-centro')
    tutores.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar los tutores',
      detail: error.message,
      life: 5000,
    })
  }
}

const verDetalles = (e) => {
  tutorID.value = e.data.id
  dialogDetalles.value = true
}

onMounted(getTutores)
</script>

<template>
  <div>
    <DialogDetallesTutor v-model:tutorID="tutorID" v-model:visible="dialogDetalles" />

    <DataTable :value="tutores" @row-click="verDetalles" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="apellidos" header="Apellidos" />
      <Column field="email" header="Email" />
      <Column field="curso" header="Curso" />
      <Column field="activo" header="Activo" />
    </DataTable>
  </div>
</template>
