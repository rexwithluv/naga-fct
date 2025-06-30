<script setup lang="ts">
  import apiClient from '@/apiClient'
  import DialogDetallesUsuario from '@/components/usuarios/DialogDetallesUsuario.vue'
  import { Usuario } from '@/types/models/Usuario'
  import { ToastServiceMethods } from 'primevue'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearUsuario from './DialogCrearUsuario.vue'

  const toast: ToastServiceMethods = useToast()
  const confirm = useConfirm()

  const usuarios: Ref<Usuario[]> = ref([])
  const usuarioID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)
  const dialogCrear: Ref<boolean> = ref(false)

  const getUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios')
      usuarios.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los usuarios',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const deleteUsuario = async (id: number): Promise<void> => {
    confirm.require({
      message: '¿Estás seguro de que quieres eliminar a este usuario?',
      header: 'Eliminar usuario',
      /* icon: 'pipi', */
      rejectProps: {
        label: 'Cancelar',
      },
      acceptProps: {
        label: 'Eliminar',
      },

      accept: async () => {
        try {
          await apiClient.delete(`/usuarios/${id}`)
          toast.add({
            severity: 'success',
            summary: 'Usuario eliminado correctamente.',
            detail: `Se ha eliminado el usuario con id ${id}`,
            life: 5000,
          })
          getUsuarios()
        } catch (error: any) {
          toast.add({
            severity: 'error',
            summary: 'Error al eliminar el usuario.',
            detail: error.message,
            life: 5000,
          })
        }
      },
    })
  }

  const verDetalles = (id: number): void => {
    usuarioID.value = id
    dialogDetalles.value = true
  }

  const verCrear = () => {
    dialogCrear.value = true
  }

  onMounted(async () => {
    await getUsuarios()
  })
</script>

<template>
  <div>
    <DialogDetallesUsuario v-model:usuarioID="usuarioID" v-model:visible="dialogDetalles" />
    <DialogCrearUsuario v-model:visible="dialogCrear" @usuarioCreado="getUsuarios" />
    <ConfirmDialog></ConfirmDialog>

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Usuarios</h1>
      <Button label="Crear usuario" @click="verCrear" />
    </div>

    <DataTable :value="usuarios" paginator :rows="10" rowHover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column field="tutor" header="Tutor de..." />
      <Column field="activo" header="Activo" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="verDetalles(data.id)" />
          <Button class="mr-2" label="Editar" @click="verDetalles(data.id)" />
          <Button label="Marcar como inactivo" @click="deleteUsuario(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
