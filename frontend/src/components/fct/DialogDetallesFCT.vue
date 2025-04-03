<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue'
import { watch, ref } from 'vue'

const toast = useToast()
const FCTID = defineModel('FCTID')
const visible = defineModel('visible')

const fct = ref(null)

const getTutorData = async () => {
    try {
        const response = await apiClient.get(`/fct/${FCTID.value}`)
        fct.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar la FCT',
            detail: error.message,
            life: 5000,
        })
    }
}

// Solo cuando el Dialog es visible intentamos cargar los datos
watch(visible, async (newValue) => {
    if (newValue === true) {
        await getTutorData()
    }
})
</script>

<template>
    <Dialog v-model:visible="visible" header="Detalles de FCT" modal dismissableMask>
        <ul>
            <li>ID: {{ fct?.id }} </li>
            <li>Alumno: {{ fct?.alumno }}</li>
            <li>Tutor: {{ fct?.tutor }}</li>
            <li>Empresa: {{ fct?.empresa }}</li>
            <li>Fecha de inicio: {{ fct?.fechaInicio }}</li>
            <li>Fecha de fin: {{ fct?.fechaFin }}</li>
        </ul>
    </Dialog>
</template>
