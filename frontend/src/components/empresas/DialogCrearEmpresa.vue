<script setup lang="ts">
  import apiClient from '@/apiClient'
  import { useAuthStore } from '@/stores/authStore'
  import { StoreGeneric } from 'pinia'
  import { ToastServiceMethods, useToast } from 'primevue'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['empresaCreada'])
  const visible: ModelRef<boolean | undefined> = defineModel('visible')

  const auth: StoreGeneric = useAuthStore()
  const toast: ToastServiceMethods = useToast()

  const concellos: Ref<any[]> = ref([])
  const especialidades = ref([])
  const skills = ref([])

  const nuevaEmpresa = () => ({
    nombre: null,
    concello: null,
    direccion: null,
    observaciones: null,
    contacto: {
      nombre: null,
      email: null,
      telefono: null,
    },
    activa: null,
    plazas: null,
    skills: [],
    especialidad: null,
  })
  const empresa = ref(nuevaEmpresa())

  const crearEmpresa = async (): Promise<void> => {
    try {
      await apiClient.post('/empresas', empresa.value)
      toast.add({
        severity: 'success',
        summary: 'Empresa creado correctamente',
        detail: 'Se ha creado la empresa con la información proporcionada',
        life: 5000,
      })
      emit('empresaCreada')
      visible.value = false
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al guardar la empresa.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerConcellos = async () => {
    try {
      const response = await apiClient.get('/concellos')
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

  const obtenerEspecialidades = async () => {
    try {
      const response = await apiClient.get('/especialidades')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener las especialidades.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const obtenerSkills = async () => {
    try {
      const response = await apiClient.get('/skills')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener las skills.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  watch(visible, async (newValue) => {
    if (newValue === true) {
      concellos.value = await obtenerConcellos()
      especialidades.value = await obtenerEspecialidades()
      skills.value = await obtenerSkills()
      empresa.value = nuevaEmpresa()
    }
  })
</script>

<template>
  <Dialog v-model:visible="visible" header="Crear empresa" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        class="flex-auto"
        autocomplete="off"
        placeholder="Taller 'Todo sobre Ruedas'"
        v-model="empresa.nombre"
      />

      <label for="concello" class="font-semibold w-24">Concello</label>
      <Select
        id="concello"
        name="concello"
        class="flex-auto"
        :options="concellos"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona un concello..."
        v-model="empresa.concello"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="direccion" class="font-semibold w-24">Dirección</label>
      <InputText
        id="direccion"
        class="flex-auto"
        autocomplete="off"
        placeholder="Av. Coquito 56"
        v-model="empresa.direccion"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="nombreContacto" class="font-semibold w-24">Nombre de contacto</label>
      <InputText
        id="nombreContacto"
        class="flex-auto"
        placeholder="María Belén"
        autocomplete="off"
        v-model="empresa.contacto.nombre"
      />

      <label for="telefonoContacto" class="font-semibold w-24">Teléfono de contacto</label>
      <InputText
        id="telefonoContacto"
        class="flex-auto"
        placeholder="Esteban Menéndez"
        autocomplete="off"
        v-model="empresa.contacto.telefono"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="emailContacto" class="font-semibold w-24">Email de contacto</label>
      <InputText
        id="emailContacto"
        class="flex-auto"
        placeholder="belenestaban@email.com"
        autocomplete="off"
        v-model="empresa.contacto.email"
      />

      <template v-if="auth.isAdmin">
        <label for="especialidad" class="font-semibold w-24">Especialidad</label>
        <Select
          id="especialidad"
          name="especialidad"
          class="flex-auto"
          :options="especialidades"
          optionValue="id"
          optionLabel="nombre"
          placeholder="Selecciona una especialidad..."
          v-model="empresa.especialidad"
        />
      </template>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="activa" class="font-semibold w-24">Activa</label>
      <Checkbox v-model="empresa.activa" id="activa" binary />

      <label for="plazas" class="font-semibold w-24">Plazas</label>
      <InputNumber v-model="empresa.plazas" id="plazas" fluid />

      <label for="skills" class="font-semibold w-24">Skills</label>
      <MultiSelect
        v-model="empresa.skills"
        :options="skills"
        id="skills"
        name="skills"
        class="flex-auto"
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona las skills..."
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="numeroSeguridadSocial" class="font-semibold w-24">Observaciones</label>
      <Textarea v-model="empresa.observaciones" rows="5" cols="75" />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="crearEmpresa" />
    </div>
  </Dialog>
</template>
