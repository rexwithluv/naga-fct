<script setup lang="ts">
  import { Usuario } from '@/types/models/Usuario'
  import { BookUser, CircleCheck, CircleX, ShieldOff, ShieldUser, User } from 'lucide-vue-next'
  import { ModelRef, ref, Ref, watch } from 'vue'

  const usuario: ModelRef<Usuario | undefined> = defineModel('selectedUsuario')
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const isActivo: Ref<boolean | null> = ref(null)
  const isAdmin: Ref<boolean | null> = ref(null)

  watch(isVisible, (newValue) => {
    if (newValue) {
      isActivo.value = usuario.value?.activo || false
      isAdmin.value = usuario.value?.rol.nombre === 'admin'
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles del usuario" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <User class="text-primary mb-3" :size="36" aria-label="E-mail del usuario" />
      <h3 class="text-xl font-semibold">{{ usuario?.email }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <template v-if="isAdmin">
          <ShieldUser :size="18" aria-label="El usuario es administrador" />
          El usuario es administrador
        </template>
        <template v-if="!isAdmin">
          <ShieldOff :size="18" aria-label="El usuario no es administrador" />
          El usuario no es administrador
        </template>
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <template v-if="isActivo">
          <CircleCheck :size="18" aria-label="El usuario está activo" />
          El usuario está activo
        </template>
        <template v-if="!isActivo">
          <CircleX :size="18" aria-label="El usuario no está activo" />
          El usuario no está activo
        </template>
      </p>
    </div>
    <div class="field">
      <p class="flex items-center gap-2">
        <BookUser :size="18" aria-label="Curso que tutoriza si corresponde" />
        <span v-if="usuario?.tutorCentro === null">No tutoriza ningún curso</span>
        <span v-else>{{ usuario?.tutorCentro.nombre }} {{ usuario?.tutorCentro.apellidos }}</span>
      </p>
    </div>
  </Dialog>
</template>
