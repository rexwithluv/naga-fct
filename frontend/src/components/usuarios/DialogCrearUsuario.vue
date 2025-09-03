<script setup lang="ts">
  import { useRolUsuario } from '@/composables/useRol'
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import { useUsuario } from '@/composables/useUsuario'
  import { RolUsuarioResponse } from '@/types/models/Rol'
  import { TutorCentroResponse } from '@/types/models/TutorCentro'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['usuarioCreado'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const { createUsuarioRequest, createUsuario } = useUsuario()
  const { getRolesUsuario } = useRolUsuario()
  const { getTutoresCentro } = useTutorCentro()

  const usuario = ref(createUsuarioRequest())
  const rolesUsuario: Ref<RolUsuarioResponse[]> = ref([])
  const tutoresCentro: Ref<TutorCentroResponse[]> = ref([])

  const handleCreateUsuario = async () => {
    const success = await createUsuario(usuario.value)
    if (success) {
      emit('usuarioCreado')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      usuario.value = createUsuarioRequest()
      rolesUsuario.value = await getRolesUsuario()
      tutoresCentro.value = await getTutoresCentro()
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Crear usuario" modal dismissableMask>
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
        :options="rolesUsuario"
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
      <Button type="button" label="Guardar" @click="handleCreateUsuario" />
    </div>
  </Dialog>
</template>
