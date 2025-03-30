<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const alumnos = ref([])

const getAlumnos = async () => {
    try {
        const response = await apiClient.get('/alumnos')
        alumnos.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar los alumnos',
            detail: error.message,
            life: 5000
        })
    }
}

onMounted(() => {
    getAlumnos()
})
</script>

<template>
    <DataTable :value="alumnos">
        <Column field="dniNie" header="DNI/NIE" />
        <Column field="nombre" header="Nombre" />
        <Column field="apellidos" header="Apellidos" />
        <Column field="email" header="Email" />
        <Column field="telefono" header="Teléfono" />
        <Column field="concello" header="Concello" />
        <Column field="estado" header="Estado" />
        <Column field="tutorCentro" header="Tutor" />
    </DataTable>
</template>
