<script setup lang="ts">
  import apiClient from '@/apiClient'
  import formatList from '@/helpers/formatList'
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { Empresa } from '@/types/models/Empresa'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast = useToast()

  const empresas: Ref<Empresa[]> = ref([])
  const dialogContacto: Ref<boolean> = ref(false)
  const datosContacto: Ref<ContactoEmpresa | null> = ref(null)

  const empresaID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getEmpresas = async (): Promise<void> => {
    try {
      const response = await apiClient.get('/empresas')
      empresas.value = response.data
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

  onMounted(getEmpresas())
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
