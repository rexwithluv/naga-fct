<script setup lang="ts">
  import apiClient from '@/apiClient'
  import formatList from '@/helpers/formatList'
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { Empresa } from '@/types/models/Empresa'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const empresas: Ref<Empresa[]> = ref([])
  const empresaID: Ref<number> = ref(0)
  const dialogContacto: Ref<boolean> = ref(false)
  const datosContacto: Ref<ContactoEmpresa | null> = ref(null)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getEmpresas = async () => {
    try {
      const response = await apiClient.get('/empresas')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las empresas',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const verContacto = (datos: ContactoEmpresa) => {
    datosContacto.value = datos
    dialogContacto.value = true
  }

  const verDetalles = (e: { data: Empresa }) => {
    empresaID.value = e.data.id
    dialogDetalles.value = true
  }

  onMounted(async () => {
    empresas.value = await getEmpresas()
  })
</script>

<template>
  <div>
    <DialogContactoEmpresa v-model:visible="dialogContacto" v-model:datosContacto="datosContacto" />
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
