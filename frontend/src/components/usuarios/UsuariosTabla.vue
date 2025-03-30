<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const usuarios = ref([])

const getUsuarios = async () => {
    try {
        const response = await apiClient.get('/usuarios');
        console.log(response.data)
        usuarios.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar los usuarios',
            detail: error.message,
            life: 5000,
        })
    }
}

onMounted(() => {
    getUsuarios()
})
</script>

<template>
    <DataTable :value="usuarios">
        <Column field="email" header="Email" />
        <Column field="rol" header="Rol" />
        <Column field="tutor" header="Tutor de..." />
        <Column field="activo" header="Activo" />
    </DataTable>
</template>
