<script setup lang="ts">
  import formatDate from '@/helpers/formatDate'
  import { useAuthStore } from '@/stores/authStore'
  import { FCTResponse } from '@/types/models/FCT'
  import { Building, Building2, Calendar, School, User } from 'lucide-vue-next'
  import { ModelRef } from 'vue'

  const fct: ModelRef<FCTResponse | undefined> = defineModel('selectedFct')
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')

  const authStore = useAuthStore()
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles de FCT" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <Building
        class="text-primary mb-3"
        :size="36"
        aria-label="Nombre del alumno y de la empresa"
      />
      <h3 class="text-xl font-semibold text-center">{{ fct?.alumno }} <br />{{ fct?.empresa }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1" v-if="authStore.isAdmin">
      <div class="flex items-center gap-2">
        <div class="flex">
          <User :size="18" aria-label="Tutor de centro del alumno en FCT" />
          <School :size="18" aria-label="Tutor de centro del alumno en FCT" />
        </div>
        {{ fct?.tutorCentro }}
      </div>
    </div>
    <div class="field mb-1">
      <div class="flex items-center gap-2">
        <div class="flex">
          <User :size="18" aria-label="Tutor de empresa del alumno en FCT" />
          <Building2 :size="18" aria-label="Tutor de empresa del alumno en FCT" />
        </div>
        {{ fct?.tutorEmpresa }}
      </div>
    </div>
    <div class="field">
      <div class="flex items-center gap-2">
        <Calendar :size="18" aria-label="Periodo de FCT" />
        {{ formatDate(fct?.fechaInicio || '') }} -
        {{ formatDate(fct?.fechaFin || '') ?? 'Sin finalizar' }}
      </div>
    </div>
  </Dialog>
</template>
