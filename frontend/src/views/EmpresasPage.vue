<script setup lang="js">
import apiClient from '@/apiClient'
import ContactoDialog from '@/components/empresas/ContactoDialog.vue'
import EmpresasTabla from '@/components/empresas/EmpresasTabla.vue'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()
const empresas = ref([])
const dialogVisible = ref(false)
const datosContacto = ref({})

const getEmpresas = async () => {
  try {
    const response = await apiClient.get('/empresas')
    empresas.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar las empresas',
      detail: error.message,
      life: 5000,
    })
  }
}

onMounted(() => {
  getEmpresas()
})
</script>

<template>
  <div>
    <EmpresasTabla v-model:empresas="empresas" v-model:dialogVisible="dialogVisible"
      v-model:datosContacto="datosContacto" />
    <ContactoDialog v-model:dialogVisible="dialogVisible" v-model:datosContacto="datosContacto" />
  </div>
</template>
