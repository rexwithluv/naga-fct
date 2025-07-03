<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['fctCreada'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const toast: ToastServiceMethods = useToast()

  const alumnos: Ref<any[]> = ref([])
  const tutoresEmpresa: Ref<any[]> = ref([])

  const nuevaFct = () => ({
    alumnoId: null,
    tutorEmpresaId: null,
    fechaInicio: null,
    fechaFin: null,
  })
  const fct = ref(nuevaFct())

  const crearFct = async (): Promise<void> => {
    try {
      await apiClient.post('/fct', fct.value)
      toast.add({
        severity: 'success',
        summary: 'FCT creada correctamente.',
        detail: 'Se ha creado la FCT con la información proporcionada',
        life: 5000,
      })
      emit('fctCreada')
      visible.value = false
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar la FCT.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerAlumnos = async () => {
    try {
      const response = await apiClient.get('/alumnos')
      alumnos.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los alumnos.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerTutoresEmpresa = async () => {
    try {
      const response = await apiClient.get('/tutores-empresa')
      tutoresEmpresa.value = response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores de empresa.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue) {
      await obtenerAlumnos()
      await obtenerTutoresEmpresa()
      fct.value = nuevaFct()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear FCT" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="alumno" class="font-semibold w-24">Alumno</label>
      <Select
        id="alumno"
        name="alumno"
        class="flex-auto"
        :options="alumnos"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Juan Pérez"
        v-model="fct.alumnoId"
      />

      <label for="tutorEmpresa" class="font-semibold w-24">Tutor de empresa</label>
      <Select
        id="tutorEmpresa"
        name="tutorEmpresa"
        class="flex-auto"
        :options="tutoresEmpresa"
        optionValue="id"
        optionLabel="nombre"
        placeholder="María García"
        v-model="fct.tutorEmpresaId"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="fechaInicio" class="font-semibold w-24">Fecha de inicio</label>
      <DatePicker
        v-model="fct.fechaInicio"
        id="fechaInicio"
        name="fechaInicio"
        inline
        class="w-full sm:w-[30rem]"
      />

      <label for="fechaFin" class="font-semibold w-24">Fecha de fin</label>
      <DatePicker
        v-model="fct.fechaFin"
        id="fechaFin"
        name="fechaFin"
        inline
        class="w-full sm:w-[30rem]"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="crearFct" />
    </div>
  </Dialog>
</template>
