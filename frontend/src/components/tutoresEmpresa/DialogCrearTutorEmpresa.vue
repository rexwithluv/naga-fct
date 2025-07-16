<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['tutorCreado'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const toast: ToastServiceMethods = useToast()

  const empresas: Ref<any[]> = ref([])

  const nuevoTutorEmpresa = () => ({
    nombre: null,
    apellidos: null,
    empresaId: null,
    email: null,
    telefono: null,
  })
  const tutorEmpresa = ref(nuevoTutorEmpresa())

  const crearTutorEmpresa = async (): Promise<void> => {
    try {
      await apiClient.post('/tutores-empresa', tutorEmpresa.value)
      toast.add({
        severity: 'success',
        summary: 'Tutor de empresa creado correctamente.',
        detail: 'Se ha creado el tutor de empresa con la información proporcionada',
        life: 5000,
      })
      emit('tutorCreado')
      visible.value = false
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar el tutor de empresa.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const obtenerEmpresas = async () => {
    try {
      const response = await apiClient.get('/empresas')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener las empresas.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue) {
      empresas.value = await obtenerEmpresas()
      tutorEmpresa.value = nuevoTutorEmpresa()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear tutor de empresa" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        class="flex-auto"
        placeholder="María Belén"
        autocomplete="off"
        v-model="tutorEmpresa.nombre"
      />

      <label for="apellidos" class="font-semibold w-24">Apellido/s</label>
      <InputText
        id="apellidos"
        class="flex-auto"
        placeholder="Esteban Menéndez"
        autocomplete="off"
        v-model="tutorEmpresa.apellidos"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="empresa" class="font-semibold w-24">Empresa</label>
      <Select
        id="empresa"
        name="empresa"
        class="flex-auto"
        :options="empresas"
        optionValue="id"
        optionLabel="nombre"
        placeholder='Taller "Todo sobre Ruedas"'
        v-model="tutorEmpresa.empresaId"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        class="flex-auto"
        placeholder="belenestaban@email.com"
        autocomplete="off"
        v-model="tutorEmpresa.email"
      />

      <label for="telefono" class="font-semibold w-24">Teléfono</label>
      <InputText
        id="telefono"
        class="flex-auto"
        placeholder="111111111"
        autocomplete="off"
        v-model="tutorEmpresa.telefono"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="crearTutorEmpresa" />
    </div>
  </Dialog>
</template>
