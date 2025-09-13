<script setup lang="ts">
  import DialogDetallesUsuario from '@/components/usuarios/DialogDetallesUsuario.vue'
  import { useUsuario } from '@/composables/useUsuario'
  import booleanToSpanish from '@/helpers/booleanToSpanish'
  import { Usuario } from '@/types/models/Usuario'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearUsuario from './DialogCrearUsuario.vue'
  import DialogUpdateUsuario from './DialogUpdateUsuario.vue'

  const { getUsuarios, deleteUsuario } = useUsuario()

  const selectedUsuario: Ref<Usuario> = ref({} as Usuario)
  const usuarios: Ref<Usuario[]> = ref([])
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)
  const showUpdateDialog: Ref<boolean> = ref(false)

  const openDetailsDialog = (data: Usuario): void => {
    selectedUsuario.value = data
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }
  const openUpdateDialog = (data: Usuario) => {
    selectedUsuario.value = data
    showUpdateDialog.value = true
  }

  const handleGetUsuarios = async () => {
    usuarios.value = await getUsuarios()
  }
  const handleDeleteUsuario = async (data: Usuario) => {
    const success = await deleteUsuario(data)
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
    <DialogUpdateUsuario
      v-model:isVisible="showUpdateDialog"
      v-model:selectedUsuario="selectedUsuario"
      @updatedUsuario="handleGetUsuarios"
    />

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Usuarios</h1>
      <Button label="Crear usuario" @click="openCreateDialog" />
    </div>

    <DataTable :value="usuarios" paginator :rows="10" rowHover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol">
        <template #body="{ data }">
          {{ data.rol.nombre }}
        </template>
      </Column>
      <Column field="tutorCentro" header="Tutor de...">
        <template #body="{ data }">
          <span v-if="data.tutorCentro !== null">
            {{ data?.tutorCentro.nombre }} {{ data?.tutorCentro.apellidos }}
          </span>
          <span v-else> No es tutor/a de ningún curso </span>
        </template>
      </Column>
      <Column field="activo" header="Activo">
        <template #body="{ data }">
          {{ booleanToSpanish(data.activo) }}
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openUpdateDialog(data)" />
          <Button label="Desactivar" @click="handleDeleteUsuario(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
