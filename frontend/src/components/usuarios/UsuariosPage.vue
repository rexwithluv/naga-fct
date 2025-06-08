<script setup lang="ts">
  import apiClient from '@/apiClient'
  import DialogDetallesUsuario from '@/components/usuarios/DialogDetallesUsuario.vue'
  import { Usuario } from '@/types/models/Usuario'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'
  import DialogCrearUsuario from './DialogCrearUsuario.vue'

  const toast: ToastServiceMethods = useToast()

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

    <div class="mb-5 text-center">
      <h1 class="text-2xl font-bold mb-3">Usuarios</h1>
      <Button label="Crear usuario" @click="verCrear" />
    </div>

    <DataTable :value="usuarios" rowHover>
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column field="tutor" header="Tutor de..." />
      <Column field="activo" header="Activo" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button label="Detalles" @click="verDetalles(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
