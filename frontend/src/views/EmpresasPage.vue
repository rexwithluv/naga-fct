<script setup lang="js">
import apiClient from '@/apiClient'
import ContactoDialog from '@/components/empresas/DialogContactoEmpresa.vue'
import DialogDetallesEmpresa from '@/components/empresas/DialogDetallesEmpresa.vue'
import formatList from '@/helpers/formatList'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const toast = useToast()

const empresas = ref([])
const dialogContacto = ref(false)
const datosContacto = ref({})

const empresaID = ref(null)
const dialogDetalles = ref(false)

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

const verContacto = (datos) => {
  datosContacto.value = datos
  dialogContacto.value = true
}

const verDetalles = (e) => {
  empresaID.value = e.data.id
  dialogDetalles.value = true
}

onMounted(() => {
  getEmpresas()
})
</script>

<template>
  <div>
    <ContactoDialog v-model:visible="dialogContacto" v-model:datosContacto="datosContacto" />
    <DialogDetallesEmpresa v-model:empresaID="empresaID" v-model:visible="dialogDetalles" />

    <DataTable :value="empresas" @row-click="verDetalles" rowHover>
      <Column field="nombre" header="Nombre" />
      <Column field="concello" header="Concello" />
      <Column header="Nombre de contacto">
        <template #body="slotProps">
          <Button
            :label="slotProps.data.contacto.nombre"
            @click="verContacto(slotProps.data.contacto)"
          />
        </template>
      </Column>
      <Column field="plazas" header="Plazas" />
      <Column header="Skills">
        <template #body="slotProps">
          {{ formatList(slotProps.data.skills) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
