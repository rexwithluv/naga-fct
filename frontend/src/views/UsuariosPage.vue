<script setup lang="ts">
  import apiClient from '@/apiClient'
  import DialogDetallesUsuario from '@/components/usuarios/DialogDetallesUsuario.vue'
  import { Usuario } from '@/types/models/Usuario'
  import { ToastServiceMethods } from 'primevue'
  import { useToast } from 'primevue/usetoast'
  import { onMounted, Ref, ref } from 'vue'

  const toast: ToastServiceMethods = useToast()

  const usuarios: Ref<Usuario[]> = ref([])
  const usuarioID: Ref<number> = ref(0)
  const dialogDetalles: Ref<boolean> = ref(false)

  const getUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios')
      return response.data
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

  onMounted(async () => {
    usuarios.value = await getUsuarios()
  })
</script>

<template>
  <div>
    <DialogDetallesUsuario v-model:usuarioID="usuarioID" v-model:visible="dialogDetalles" />

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
