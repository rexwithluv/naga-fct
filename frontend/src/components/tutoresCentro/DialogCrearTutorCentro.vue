<script setup lang="ts">
  import { useCurso } from '@/composables/useCurso'
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import { useUsuario } from '@/composables/useUsuario'
  import { CursoResponse } from '@/types/models/Curso'
  import { TutorCentroRequest } from '@/types/models/TutorCentro'
  import { UsuarioResponse } from '@/types/models/Usuario'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const emit = defineEmits(['tutorCentroCreado'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const { createTutorCentroRequest, createTutorCentro } = useTutorCentro()
  const { getCursos } = useCurso()
  const { getUsuarios } = useUsuario()

  const tutorCentro: Ref<TutorCentroRequest> = ref(createTutorCentroRequest())
  const cursos: Ref<CursoResponse[]> = ref([])
  const usuarios: Ref<UsuarioResponse[]> = ref([])

  const handleCreateTutorCentro = async (): Promise<void> => {
    const success = await createTutorCentro(tutorCentro.value)
    if (success) {
      emit('tutorCentroCreado')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      tutorCentro.value = createTutorCentroRequest()
      cursos.value = await getCursos(false)
      usuarios.value = await getUsuarios(false)
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Crear tutor de centro" modal dismissableMask>
    <div class="flex items-center gap-4 mb-4">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        class="flex-auto"
        autocomplete="off"
        placeholder="Lucía"
        v-model="tutorCentro.nombre"
      />

      <label for="apellidos" class="font-semibold w-24">Apellidos</label>
      <InputText
        id="nombre"
        class="flex-auto"
        autocomplete="off"
        placeholder="Alonso González"
        v-model="tutorCentro.apellidos"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        class="flex-auto"
        autocomplete="off"
        placeholder="example@email.com"
        v-model="tutorCentro.email"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="curso" class="font-semibold w-24">Curso</label>
      <Select
        id="curso"
        name="curso"
        class="flex-auto"
        :options="cursos"
        optionValue="id"
        optionLabel="codigo"
        placeholder="Selecciona un curso..."
        v-model="tutorCentro.cursoId"
      />

      <label for="usuario" class="font-semibold w-24">Usuario</label>
      <Select
        id="usuario"
        name="usuario"
        class="flex-auto"
        :options="usuarios"
        optionValue="id"
        optionLabel="email"
        placeholder="Selecciona un usuario..."
        v-model="tutorCentro.usuarioId"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="handleCreateTutorCentro" />
    </div>
  </Dialog>
</template>
