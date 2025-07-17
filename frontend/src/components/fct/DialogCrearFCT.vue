<script setup lang="ts">
  import { useAlumno } from '@/composables/useAlumno'
  import { useFct } from '@/composables/useFct'
  import { useTutorEmpresa } from '@/composables/useTutorEmpresa'
  import { Alumno } from '@/types/models/Alumno'
  import { FCTRequest } from '@/types/models/FCT'
  import { TutorEmpresaResponse } from '@/types/models/TutorEmpresa'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['fctCreada'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const { createFCTRequest, createFct } = useFct()
  const { getAlumnos } = useAlumno()
  const { getTutoresEmpresa } = useTutorEmpresa()

  const fct: Ref<FCTRequest> = ref(createFCTRequest())
  const alumnos: Ref<Alumno[]> = ref([])
  const tutoresEmpresa: Ref<TutorEmpresaResponse[]> = ref([])

  const handleCreateFct = async () => {
    const success = await createFct(fct.value)
    if (success) {
      emit('fctCreada')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      fct.value = createFCTRequest()
      alumnos.value = await getAlumnos()
      tutoresEmpresa.value = await getTutoresEmpresa()
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Crear FCT" modal dismissableMask>
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
    </div>

    <div class="flex items-center gap-4 mb-4">
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
        id="fechaInicio"
        name="fechaInicio"
        v-model="fct.fechaInicio"
        dateFormat="dd/mm/yy"
      />

      <label for="fechaFin" class="font-semibold w-24">Fecha de fin</label>
      <DatePicker id="fechaFin" name="fechaFin" v-model="fct.fechaFin" dateFormat="dd/mm/yy" />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="handleCreateFct" />
    </div>
  </Dialog>
</template>
