<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import { Concello } from '@/types/models/Concello'
  import { EstadoAlumno } from '@/types/models/EstadoAlumno'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { StoreGeneric } from 'pinia'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['alumnoCreado'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const auth: StoreGeneric = useAuthStore()
  const toast: ToastServiceMethods = useToast()

  const concellos: Ref<any[]> = ref([])
  const estadosAlumno: Ref<any[]> = ref([])
  const tutoresCentro: Ref<any[]> = ref([])

  const alumno: Ref<Alumno> = ref({
    id: 0,
    dniNie: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    concello: {} as Concello,
    numeroSeguridadSocial: '',
    estado: {} as EstadoAlumno,
    tutorCentro: {} as TutorCentro,
  })

  const crearAlumno = async (): Promise<void> => {
    try {
      await apiClient.post('/alumnos', alumno.value)
      toast.add({
        severity: 'success',
        summary: 'Alumna/o creado correctamente',
        detail: 'Se ha creado el alumno con la información proporcionada',
        life: 5000,
      })
      emit('alumnoCreado')
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar la/el alumna/o',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerConcellos = async (nombreConcello: string = '') => {
    try {
      const response = await apiClient.get(`/concellos?nombre=${nombreConcello}`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los concellos.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerEstadosAlumno = async () => {
    try {
      const response = await apiClient.get('/estados-alumno')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los posibles estados de un alumno.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerTutoresCentro = async (nombreTutor: string = '') => {
    try {
      const response = await apiClient.get(`/tutores-centro/select?nombreTutor=${nombreTutor}`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores del centro.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue === true) {
      concellos.value = await obtenerConcellos()
      estadosAlumno.value = await obtenerEstadosAlumno()

      if (auth.isAdmin) {
        tutoresCentro.value = await obtenerTutoresCentro()
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
        v-model="alumno.estado"
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
        v-model="alumno.concello"
      />

      <template v-if="auth.isAdmin">
        <label for="tutorCentro" class="font-semibold w-24">Tutor</label>
        <Select
          id="tutorCentro"
          name="estado"
          class="flex-auto"
          :options="tutoresCentro"
          optionValue="id"
          optionLabel="nombreCompletoCurso"
          placeholder="Selecciona un tutor..."
          v-model="alumno.tutorCentro"
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
      <Button type="button" label="Guardar" @click="crearAlumno" />
    </div>
  </Dialog>
</template>
