<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  import { Alumno } from '@/types/models/Alumno'
  import {
    BookMarked,
    BookUser,
    Car,
    GraduationCap,
    IdCard,
    IdCardLanyard,
    Mail,
    MapPin,
    PenOff,
    Phone,
    Sparkles,
  } from 'lucide-vue-next'
  import { StoreGeneric } from 'pinia'
  import { ModelRef, Ref, ref, watch } from 'vue'

  const authStore: StoreGeneric = useAuthStore()

  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const alumno: ModelRef<Alumno | undefined> = defineModel('selectedAlumno')

  const estado: Ref<string | null> = ref(null)
  watch(isVisible, (newValue) => {
    if (newValue) {
      estado.value = alumno.value?.estado.nombre.toLowerCase() || null
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles del alumno" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <GraduationCap class="text-primary mb-3" :size="36" aria-label="Nombre del alumno" />
      <h3 class="text-xl font-semibold">{{ alumno?.nombre }} {{ alumno?.apellidos }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <IdCard :size="18" aria-label="DNI o NIE del alumno" />
        {{ alumno?.dniNie }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <IdCardLanyard :size="18" aria-label="NUSS del alumno" />
        {{ alumno?.numeroSeguridadSocial }}
      </p>
    </div>
    <div class="field mb-1" v-if="authStore.isAdmin">
      <p class="flex items-center gap-2">
        <BookUser :size="18" aria-label="Tutor de centro del alumno" />
        {{ alumno?.tutorCentro.nombre }} - {{ alumno?.tutorCentro.curso }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <MapPin :size="18" aria-label="Concello del alumno" />
        {{ alumno?.concello?.nombre }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <template v-if="estado === 'cursando'">
          <BookMarked :size="18" aria-label="Estado del alumno" />
        </template>
        <template v-if="estado === 'de baja'">
          <PenOff :size="18" aria-label="Estado del alumno" />
        </template>
        <template v-if="estado === 'graduado'">
          <Sparkles :size="18" aria-label="Estado del alumno" />
        </template>
        <template v-if="estado === 'en prácticas'">
          <Car :size="18" aria-label="Estado del alumno" />
        </template>
        {{ alumno?.estado?.nombre }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Phone :size="18" aria-label="Teléfono de contacto" />
        {{ alumno?.telefono }}
      </p>
    </div>
    <div class="field">
      <p class="flex items-center gap-2">
        <Mail :size="18" aria-label="E-mail de contacto" />
        {{ alumno?.email }}
      </p>
    </div>
  </Dialog>
</template>
