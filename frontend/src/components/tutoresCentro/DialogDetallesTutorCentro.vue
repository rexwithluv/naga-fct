<script setup lang="ts">
  import { TutorCentro } from '@/types/models/TutorCentro'
  import { Book, BookUser, CircleCheck, CircleX, Mail } from 'lucide-vue-next'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const tutorCentro: ModelRef<TutorCentro | undefined> = defineModel('selectedTutorCentro')

  const isActivo: Ref<boolean | null> = ref(null)

  watch(isVisible, (newValue) => {
    if (newValue) {
      isActivo.value = tutorCentro.value?.activo || null
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles del tutor de centro" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <BookUser class="text-primary mb-3" :size="36" aria-label="Nombre del tutor de centro" />
      <h3 class="text-xl font-semibold">{{ tutorCentro?.nombre }} {{ tutorCentro?.apellidos }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Mail :size="18" aria-label="E-mail de contacto" />
        {{ tutorCentro?.email }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Book :size="18" aria-label="E-mail de contacto" />
        {{ tutorCentro?.curso?.codigo }}
      </p>
    </div>
    <div class="field">
      <p class="flex items-center gap-2">
        <template v-if="isActivo">
          <CircleCheck :size="18" aria-label="El tutor de centro está en activo" />
          El tutor de centro está en activo
        </template>
        <template v-if="!isActivo">
          <CircleX :size="18" aria-label="El tutor de centro no está en activo" />
          El tutor de centro no está en activo
        </template>
      </p>
    </div>
  </Dialog>
</template>
