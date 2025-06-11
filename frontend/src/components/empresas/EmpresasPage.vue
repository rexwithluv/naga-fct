<script setup lang="ts">
  import apiClient from '@/apiClient'
  import formatList from '@/helpers/formatList'
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { Empresa } from '@/types/models/Empresa'
  import { ToastServiceMethods, useConfirm } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()
  const confirm = useConfirm()

  const empresas: Ref<Empresa[]> = ref([])
  const empresaID: Ref<number> = ref(0)
  const dialogContacto: Ref<boolean> = ref(false)
  const datosContacto: Ref<ContactoEmpresa | null> = ref(null)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const getEmpresas = async () => {
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

  const deleteEmpresa = async (id: number): Promise<void> => {
    confirm.require({
      message: '¿Estás seguro de que quieres dar de baja a esta empresa?',
      header: 'Dar de baja a una empresa',
      /* icon: 'pipi', */
      rejectProps: {
        label: 'Cancelar',
      },
      acceptProps: {
        label: 'Dar de baja',
      },

      accept: async () => {
        try {
          await apiClient.delete(`/empresas/${id}`)
          toast.add({
            severity: 'success',
            summary: 'Empresa dada de baja correctamente.',
            detail: `Se ha dado de baja la empresa con el id ${id}.`,
            life: 5000,
          })
          getEmpresas()
        } catch (error: any) {
          toast.add({
            severity: 'error',
            summary: 'Error al eliminar la empresa.',
            detail: error.message,
            life: 5000,
          })
        }
      },
    })
  }

  const verContacto = (datos: ContactoEmpresa) => {
    datosContacto.value = datos
    dialogContacto.value = true
  }

  const verDetalles = (id: number) => {
    empresaID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    await getEmpresas()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogContactoEmpresa v-model:visible="dialogContacto" v-model:datosContacto="datosContacto" />
    <DialogDetallesEmpresa v-model:empresaID="empresaID" v-model:visible="dialogDetalles" />
    <DialogCrearEmpresa
      v-model:visible="dialogCrear"
      @empresaCreada="getEmpresas"
    ></DialogCrearEmpresa>

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Empresas</h1>
      <Button label="Crear empresa" @click="verCrear" />
    </div>

    <DataTable :value="empresas" rowHover>
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
      <Column header="Acciones">
        <template #body="{ data }">
          <Button label="Ver detalles" @click="verDetalles(data.id)" />
          <Button label="Marcar como inactiva" @click="deleteEmpresa(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
