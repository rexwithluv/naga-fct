<script setup lang="ts">
  import { TutorEmpresa } from '@/types/models/TutorEmpresa'
  import { Building2, Mail, Phone, User } from 'lucide-vue-next'
  import { ModelRef } from 'vue'

  const tutorEmpresa: ModelRef<TutorEmpresa | undefined> = defineModel('selectedTutorEmpresa')
  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles del tutor de empresa" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <div class="flex">
        <User
          class="text-primary mb-3"
          :size="36"
          aria-label="Tutor de empresa del alumno en FCT"
        />
        <Building2
          class="text-primary mb-3"
          :size="36"
          aria-label="Tutor de empresa del alumno en FCT"
        />
      </div>
      <h3 class="text-xl font-semibold text-center">
        {{ tutorEmpresa?.nombre }} {{ tutorEmpresa?.apellidos }} <br />

        {{
          //@ts-ignore
          tutorEmpresa?.empresa.nombre
        }}
      </h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Mail :size="18" aria-label="E-mail de contacto del tutor de empresa" />
        {{ tutorEmpresa?.email }}
      </p>
    </div>
    <div class="field">
      <p class="flex items-center gap-2">
        <Phone :size="18" aria-label="E-mail de contacto del tutor de empresa" />
        {{ tutorEmpresa?.telefono }}
      </p>
    </div>
  </Dialog>
</template>
