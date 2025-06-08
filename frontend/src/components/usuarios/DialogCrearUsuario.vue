<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['usuarioCreado'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const toast: ToastServiceMethods = useToast()

  const roles: Ref<any[]> = ref([])
  const tutoresCentro: Ref<any[]> = ref([])

  const nuevoUsuario = () => ({
    email: null,
    rolId: null,
    tutorId: null,
  })
  const usuario = ref(nuevoUsuario())

  const crearUsuario = async (): Promise<void> => {
    try {
      await apiClient.post('/usuarios', usuario.value)
      toast.add({
        severity: 'success',
        summary: 'Usuario creado correctamente.',
        detail: 'Se ha creado el usuario con la información proporcionada',
        life: 5000,
      })
      emit('usuarioCreado')
      visible.value = false
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar el tutor de empresa.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerRoles = async () => {
    try {
      const response = await apiClient.get('/roles-usuario')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los roles disponibles.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerTutoresCentro = async () => {
    try {
      const response = await apiClient.get('/tutores-centro')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores del centro disponibles.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue === true) {
      roles.value = await obtenerRoles()
      tutoresCentro.value = await obtenerTutoresCentro()
      usuario.value = nuevoUsuario()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear usuario" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        class="flex-auto"
        placeholder="belenestaban@email.com"
        autocomplete="off"
        v-model="usuario.email"
      />

      <label for="rol" class="font-semibold w-24">Rol</label>
      <Select
        id="rol"
        name="rol"
        class="flex-auto"
        :options="roles"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Administrador"
        v-model="usuario.rolId"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="tutorCentro" class="font-semibold w-24">Tutor de centro</label>
      <Select
        id="tutorCentro"
        name="tutorCentro"
        class="flex-auto"
        :options="tutoresCentro"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Perico de los Palotes"
        v-model="usuario.tutorId"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="crearUsuario" />
    </div>
  </Dialog>
</template>
