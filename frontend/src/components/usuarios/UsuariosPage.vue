<script setup lang="ts">
  import DialogDetallesUsuario from '@/components/usuarios/DialogDetallesUsuario.vue'
  import { useUsuario } from '@/composables/useUsuario'
  import { UsuarioResponse } from '@/types/models/Usuario'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearUsuario from './DialogCrearUsuario.vue'

  const { getUsuarios, deleteUsuario } = useUsuario()

  const selectedUsuario: Ref<UsuarioResponse> = ref({} as UsuarioResponse)
  const usuarios: Ref<UsuarioResponse[]> = ref([])
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)

  const openDetailsDialog = (usuarioData: UsuarioResponse): void => {
    selectedUsuario.value = usuarioData
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }

  const handleGetUsuarios = async () => {
    usuarios.value = await getUsuarios()
  }
  const handleDeleteUsuario = async (usuarioData: UsuarioResponse) => {
    const success = await deleteUsuario(usuarioData)
    if (success) {
      usuarios.value = await getUsuarios()
    }
  }

  onMounted(async () => {
    usuarios.value = await getUsuarios()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogDetallesUsuario
      v-model:selectedUsuario="selectedUsuario"
      v-model:isVisible="showDetailsDialog"
    />
    <DialogCrearUsuario v-model:isVisible="showCreateDialog" @usuarioCreado="handleGetUsuarios" />

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Usuarios</h1>
      <Button label="Crear usuario" @click="openCreateDialog" />
    </div>

    <DataTable :value="usuarios" paginator :rows="10" rowHover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column field="tutor" header="Tutor de..." />
      <Column field="activo" header="Activo" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openDetailsDialog(data)" disabled />
          <Button label="Desactivar" @click="handleDeleteUsuario(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
