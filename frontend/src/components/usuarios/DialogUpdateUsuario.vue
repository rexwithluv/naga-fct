<script setup lang="ts">
  import { useRolUsuario } from '@/composables/useRol'
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import { useUsuario } from '@/composables/useUsuario'
  import { RolUsuarioResponse } from '@/types/models/Rol'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { Usuario } from '@/types/models/Usuario'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['updatedUsuario'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const selectedUsuario = defineModel('selectedUsuario')

  const { updateUsuario } = useUsuario()
  const { getRolesUsuario } = useRolUsuario()
  const { getTutoresCentro } = useTutorCentro()

  const usuario = ref({ rol: { id: 0 }, tutorCentro: { id: 0 } } as Usuario)
  const rolesUsuario: Ref<RolUsuarioResponse[]> = ref([])
  const tutoresCentro: Ref<TutorCentro[]> = ref([])

  const handleUpdateUsuario = async () => {
    const success = await updateUsuario(usuario.value)
    if (success) {
      emit('updatedUsuario')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      rolesUsuario.value = await getRolesUsuario()
      tutoresCentro.value = await getTutoresCentro()
    }

    usuario.value = JSON.parse(JSON.stringify(selectedUsuario.value))
    if (usuario.value.tutorCentro === null) {
      usuario.value.tutorCentro = { id: 0, nombre: '', apellidos: '' }
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Actualizar usuario" modal dismissableMask>
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
        v-model="usuario.rol.id"
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
        v-model="usuario.tutorCentro.id"
      />

      <label for="activo" class="font-semibold w-24">Está activo?</label>
      <Checkbox id="activo" name="activo" class="flex-auto" v-model="usuario.activo" binary />
    </div>

    <div class="text-center">
      <Button type="button" label="Actualizar" @click="handleUpdateUsuario" />
    </div>
  </Dialog>
</template>
