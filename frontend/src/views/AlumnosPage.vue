<script setup lang="js">
import apiClient from '@/apiClient'
import DialogDetallesAlumno from '@/components/alumnos/DialogDetallesAlumno.vue'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const alumnos = ref([])
const alumnoID = ref(null)
const verDetallesAlumno = ref(false)

const getAlumnos = async () => {
    try {
        const response = await apiClient.get('/alumnos')
        alumnos.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar los alumnos',
            detail: error.message,
            life: 5000,
        })
    }
}

const obtenerDetalles = (e) => {
    alumnoID.value = e.data.id
    verDetallesAlumno.value = true
}

onMounted(getAlumnos)
</script>

<template>
    <div>
        <DialogDetallesAlumno v-model:alumnoID="alumnoID" v-model:visible="verDetallesAlumno" />
        <DataTable :value="alumnos" @row-click="obtenerDetalles" row-hover>
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
