<script setup lang="js">
import apiClient from '@/apiClient'
import { useToast } from 'primevue'
import { watch, ref } from 'vue'

const toast = useToast()
const usuarioID = defineModel('usuarioID')
const visible = defineModel('visible')

const usuario = ref(null)

const getUsuarioData = async () => {
    try {
        const response = await apiClient.get(`/usuarios/${usuarioID.value}`)
        usuario.value = response.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al cargar el usuario.',
            detail: error.message,
            life: 5000,
        })
    }
}

// Solo cuando el Dialog es visible intentamos cargar los datos
watch(visible, async (newValue) => {
    if (newValue === true) {
        await getUsuarioData()
    }
})
</script>

<template>
    <Dialog v-model:visible="visible" header="Detalles del usuario" modal dismissableMask>
        <ul>
            <li>ID: {{ usuario?.id }} </li>
            <li>Email: {{ usuario?.email }}</li>
            <li>Rol: {{ usuario?.rol }}</li>
            <li>Tutor de: {{ usuario?.tutor }}</li>
            <li>Activo: {{ usuario?.activo }}</li>
        </ul>
    </Dialog>
</template>
