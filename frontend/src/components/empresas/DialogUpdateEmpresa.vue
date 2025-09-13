<script setup lang="ts">
  import { useConcello } from '@/composables/useConcello'
  import { useEmpresa } from '@/composables/useEmpresa'
  import { useEspecialidad } from '@/composables/useEspecialidad'
  import { useSkill } from '@/composables/useSkill'
  import { useAuthStore } from '@/stores/authStore'
  import { Empresa } from '@/types/models/Empresa'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const emit = defineEmits(['empresaEditada'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const empresaSeleccionada: ModelRef<Empresa | undefined> = defineModel('selectedEmpresa')

  const authStore = useAuthStore()
  const { updateEmpresa } = useEmpresa()
  const { getConcellos } = useConcello()
  const { getSkills } = useSkill()
  const { getEspecialidades } = useEspecialidad()

  const concellos = ref([])
  const skills = ref([])
  const especialidades = ref([])

  const empresa: Ref<Empresa> = ref({
    concello: { id: 0 },
    especialidad: { id: 0 },
  } as Empresa)

  const handleUpdateEmpresa = async () => {
    const success = await updateEmpresa(empresa.value)
    if (success) {
      emit('empresaEditada')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      concellos.value = await getConcellos()
      skills.value = await getSkills()

      if (authStore.isAdmin) {
        especialidades.value = await getEspecialidades()
      }

      empresa.value = JSON.parse(JSON.stringify(empresaSeleccionada.value))

      // @ts-ignore
      empresa.value.skills = empresa.value.skills.map((skill) => skill.id)
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Editar empresa" modal dismissableMask>
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
        v-model="empresa.concello.id"
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
      <!-- <label for="nombreContacto" class="font-semibold w-24">Nombre de contacto</label>
      <InputText
        id="nombreContacto"
        class="flex-auto"
        placeholder="María Belén"
        autocomplete="off"
        v-model="empresa.contacto.nombre"
      /> -->

      <!-- <label for="telefonoContacto" class="font-semibold w-24">Teléfono de contacto</label>
      <InputText
        id="telefonoContacto"
        class="flex-auto"
        placeholder="Esteban Menéndez"
        autocomplete="off"
        v-model="empresa.contacto.telefono"
      /> -->
    </div>

    <div class="flex items-center gap-4 mb-4">
      <!-- <label for="emailContacto" class="font-semibold w-24">Email de contacto</label>
      <InputText
        id="emailContacto"
        class="flex-auto"
        placeholder="belenestaban@email.com"
        autocomplete="off"
        v-model="empresa.contacto.email"
      /> -->

      <template v-if="authStore.isAdmin">
        <label for="especialidad" class="font-semibold w-24">Especialidad</label>
        <Select
          id="especialidad"
          name="especialidad"
          class="flex-auto"
          :options="especialidades"
          optionValue="id"
          optionLabel="nombre"
          placeholder="Selecciona una especialidad..."
          v-model="empresa.especialidad.id"
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
      <Button type="button" label="Guardar" @click="handleUpdateEmpresa" />
    </div>
  </Dialog>
</template>
