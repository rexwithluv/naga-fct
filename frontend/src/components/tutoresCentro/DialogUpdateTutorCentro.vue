<script setup lang="ts">
  import { useCurso } from '@/composables/useCurso'
  import { useTutorCentro } from '@/composables/useTutorCentro'
  import { useUsuario } from '@/composables/useUsuario'
  import { EmpresaResponse } from '@/types/models/Empresa'
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const emit = defineEmits(['tutorCentroEditado'])
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const tutorCentroSeleccionado: ModelRef<EmpresaResponse | undefined> =
    defineModel('selectedTutorCentro')

  const { updateTutorCentro } = useTutorCentro()
  const { getCursos } = useCurso()
  const { getUsuarios } = useUsuario()

  const cursos = ref([])
  const usuarios = ref([])

  const tutorCentro: Ref<TutorCentro> = ref({ curso: { id: 0 }, usuario: { id: 0 } } as TutorCentro)

  const handleUpdateTutorCentro = async () => {
    const success = await updateTutorCentro(tutorCentro.value)
    if (success) {
      emit('tutorCentroEditado')
      isVisible.value = false
    }
  }

  watch(isVisible, async (newValue) => {
    if (newValue) {
      cursos.value = await getCursos()
      usuarios.value = await getUsuarios()

      tutorCentro.value = JSON.parse(JSON.stringify(tutorCentroSeleccionado.value))
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Editar tutor de centro" modal dismissableMask>
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
        v-model="tutorCentro.curso.id"
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
        v-model="tutorCentro.usuario.id"
      />
    </div>

    <div class="text-center">
      <Button type="button" label="Guardar" @click="handleUpdateTutorCentro" />
    </div>
  </Dialog>
</template>
