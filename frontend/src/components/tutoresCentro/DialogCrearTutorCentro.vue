<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { StoreGeneric } from 'pinia'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['tutorCentroCreado'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const auth: StoreGeneric = useAuthStore()
  const toast: ToastServiceMethods = useToast()

  const cursos: Ref<any[]> = ref([])
  const usuarios = ref([])

  const nuevoTutorCentro = () => ({
    nombre: null,
    apellidos: null,
    email: null,
    cursoId: null,
    usuarioId: null,
  })
  const tutorCentro = ref(nuevoTutorCentro())

  const crearTutorCentro = async (): Promise<void> => {
    try {
      await apiClient.post('/tutores-centro', tutorCentro.value)
      toast.add({
        severity: 'success',
        summary: 'Tutor de centro creado correctamente',
        detail: 'Se ha creado el tutor de centro con la información proporcionada',
        life: 5000,
      })
      emit('tutorCentroCreado')
      visible.value = false
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar el tutor de centro.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerCursos = async () => {
    try {
      const response = await apiClient.get('/cursos')
      cursos.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los cursos.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios')
      usuarios.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los usuarios.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue) {
      await obtenerCursos()
      await obtenerUsuarios()
      tutorCentro.value = nuevoTutorCentro()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear tutor de centro" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        class="flex-auto"
        autocomplete="off"
        placeholder="Lucíaxº"
        v-model="tutorCentro.nombre"
      />

      <label for="apellidos" class="font-semibold w-24">Apellidos</label>
      <InputText
        id="nombre"
        class="flex-auto"
        autocomplete="off"
        placeholder="Alonso González"
        v-model="tutorCentro.apellidos"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        class="flex-auto"
        autocomplete="off"
        placeholder="example@email.com"
        v-model="tutorCentro.email"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="curso" class="font-semibold w-24">Curso</label>
      <Select
        id="curso"
        name="curso"
        class="flex-auto"
        :options="cursos"
        optionValue="id"
        optionLabel="codigo"
        placeholder="Selecciona un curso..."
        v-model="tutorCentro.cursoId"
      />

      <label for="usuario" class="font-semibold w-24">Usuario</label>
      <Select
        id="usuario"
        name="usuario"
        class="flex-auto"
        :options="usuarios"
        optionValue="id"
        optionLabel="email"
        placeholder="Selecciona un usuario..."
        v-model="tutorCentro.usuarioId"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="crearTutorCentro" />
    </div>
  </Dialog>
</template>
