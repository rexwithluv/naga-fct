<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue'
import { watch, ref } from 'vue'

const toast = useToast()
const alumnoID = defineModel('alumnoID')
const visible = defineModel('visible')

const alumno = ref(null)

const getAlumnoData = async () => {
    try {
        const response = await apiClient.get(`/alumnos/${alumnoID.value}`)
        alumno.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar los alumnos',
            detail: error.message,
            life: 5000,
        })
    }
}

// Solo cuando el Dialog es visible intentamos cargar los datos
watch(visible, async (newValue) => {
    if (newValue === true) {
        await getAlumnoData()
    }
})
</script>

<template>
    <Dialog v-model:visible="visible" header="Detalles del alumno" modal dismissableMask>
        <ul>
            <li>ID: {{ alumno.id }} </li>
            <li>DNI/NIE: {{ alumno.dniNie }}</li>
            <li>Nombre: {{ alumno.nombre }}</li>
            <li>Apellidos: {{ alumno.apellidos }}</li>
            <li>Correo electrónico: {{ alumno.email }}</li>
            <li>Teléfono: {{ alumno.telefono }}</li>
            <li>NUSS: {{ alumno.numeroSeguridadSocial }}</li>
            <li>Estado: {{ alumno.estado }}</li>
            <li>Tutor: {{ alumno.tutorCentro }}</li>
        </ul>
    </Dialog>
</template>
