<script setup lang="ts">
  import { useAlumno } from '@/composables/useAlumno'
  import { useConcello } from '@/composables/useConcello'
  import { useEstadoAlumno } from '@/composables/useEstadoAlumno'
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { StoreGeneric } from 'pinia'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['alumnoCreado'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const authStore: StoreGeneric = useAuthStore()
  const { createAlumno } = useAlumno()
  const { getConcellos } = useConcello()
  const { getEstadosAlumno } = useEstadoAlumno()
  const { getTutoresCentro } = useTutorCentro()

  const concellos: Ref<any[]> = ref([])
  const estadosAlumno: Ref<any[]> = ref([])
  const tutoresCentro: Ref<any[]> = ref([])

  const alumno: Ref<Alumno> = ref({
    concello: { id: 0 },
    estado: { id: 0 },
    tutorCentro: { id: 0 },
  })

  const handleCreateAlumno = async () => {
    const success = await createAlumno(alumno.value)
    if (success) {
      emit('alumnoCreado')
      visible.value = false
    }
  }

  watch(visible, async (newValue) => {
    if (newValue === true) {
      concellos.value = await getConcellos()
      estadosAlumno.value = await getEstadosAlumno()

      if (authStore.isAdmin) {
        tutoresCentro.value = await getTutoresCentro()
      }
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear alumno" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="dniNie" class="font-semibold w-24">DNI/NIE</label>
      <InputText
        id="dniNie"
        class="flex-auto"
        autocomplete="off"
        placeholder="1234567T"
        v-model="alumno.dniNie"
      />

      <label for="estado" class="font-semibold w-24">Estado</label>
      <Select
        id="estado"
        name="estado"
        class="flex-auto"
        :options="estadosAlumno"
        optionValue="id"
        optionLabel="nombre"
        placeholder="El alumno está..."
        v-model="alumno.estado.id"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        class="flex-auto"
        placeholder="María Belén"
        autocomplete="off"
        v-model="alumno.nombre"
      />

      <label for="apellidos" class="font-semibold w-24">Apellido/s</label>
      <InputText
        id="apellidos"
        class="flex-auto"
        placeholder="Esteban Menéndez"
        autocomplete="off"
        v-model="alumno.apellidos"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        class="flex-auto"
        placeholder="belenestaban@email.com"
        autocomplete="off"
        v-model="alumno.email"
      />

      <label for="telefono" class="font-semibold w-24">Teléfono</label>
      <InputText
        id="telefono"
        class="flex-auto"
        placeholder="111111111"
        autocomplete="off"
        v-model="alumno.telefono"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="concello" class="font-semibold w-24">Concello</label>
      <Select
        id="concello"
        name="concello"
        class="flex-auto"
        :options="concellos"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona un concello..."
        v-model="alumno.concello.id"
      />

      <template v-if="authStore.isAdmin">
        <label for="tutorCentro" class="font-semibold w-24">Tutor</label>
        <Select
          id="tutorCentro"
          name="estado"
          class="flex-auto"
          :options="tutoresCentro"
          optionValue="id"
          optionLabel="nombreCompletoCurso"
          placeholder="Selecciona un tutor..."
          v-model="alumno.tutorCentro.id"
        />
      </template>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="numeroSeguridadSocial" class="font-semibold w-24">NUSS</label>
      <InputText
        id="numeroSeguridadSocial"
        class="flex-auto"
        placeholder="331234567857"
        autocomplete="off"
        v-model="alumno.numeroSeguridadSocial"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="handleCreateAlumno" />
    </div>
  </Dialog>
</template>
