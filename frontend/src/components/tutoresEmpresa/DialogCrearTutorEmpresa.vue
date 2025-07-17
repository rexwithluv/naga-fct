<script setup lang="ts">
  import { useEmpresa } from '@/composables/useEmpresa'
  import { useTutorEmpresa } from '@/composables/useTutorEmpresa'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['tutorEmpresaCreado'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const { createTutorEmpresaRequest, createTutorEmpresa } = useTutorEmpresa()
  const { getEmpresas } = useEmpresa()

  const tutorEmpresa = ref(createTutorEmpresaRequest())
  const empresas: Ref<any[]> = ref([])

  const handleCreateTutorEmpresa = async (): Promise<void> => {
    const success = await createTutorEmpresa(tutorEmpresa.value)
    if (success) {
      emit('tutorEmpresaCreado')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      empresas.value = await getEmpresas()
      tutorEmpresa.value = createTutorEmpresaRequest()
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Crear tutor de empresa" modal dismissableMask>
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
      <Button type="button" label="Guardar" @click="handleCreateTutorEmpresa" />
    </div>
  </Dialog>
</template>
