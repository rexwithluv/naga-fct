<script setup lang="ts">
  import formatList from '@/helpers/formatList'
  import { Empresa } from '@/types/models/Empresa'
  import {
    BriefcaseBusiness,
    CircleCheck,
    CircleX,
    Grip,
    Info,
    MapPin,
    MapPinHouse,
    Star,
    Users,
  } from 'lucide-vue-next'
  import { ModelRef, Ref, ref, watch } from 'vue'
  import { useAuthStore } from '../../stores/authStore'

  const authStore = useAuthStore()

  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const empresa: ModelRef<Empresa | undefined> = defineModel('selectedEmpresa')

  const isActiva: Ref<boolean | null> = ref(null)

  watch(isVisible, (newValue) => {
    if (newValue) {
      isActiva.value = empresa.value?.activa || null
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Detalles de la empresa" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <BriefcaseBusiness class="text-primary mb-3" :size="36" aria-label="Nombre de la empresa" />
      <h3 class="text-xl font-semibold">{{ empresa?.nombre }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <MapPin :size="18" aria-label="Concello de la empresa" />
        {{ empresa?.concello }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <MapPinHouse :size="18" aria-label="Dirección de la empresa" />
        {{ empresa?.direccion }}
      </p>
    </div>
    <div class="field mb-1" v-if="authStore.isAdmin">
      <p class="flex items-center gap-2">
        <Star :size="18" aria-label="Especialidad de la empresa" />
        {{ empresa?.especialidad }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <template v-if="isActiva">
          <CircleCheck :size="18" aria-label="La empresa está activa" />
          La empresa está activa
        </template>
        <template v-if="!isActiva">
          <CircleX :size="18" aria-label="La empresa no está activa" />
          La empresa no está activa
        </template>
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Users :size="18" aria-label="Plazas para alumnado en la empresa" />
        {{ empresa?.plazas }} plazas disponibles
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Grip :size="18" aria-label="Skills de la empresa" />
        {{ formatList(empresa?.skills ?? []) }}
      </p>
    </div>
    <!-- <div class="field mb-1">
      <p class="flex items-center gap-2">
        <BookUser :size="18" aria-label="Nombre de la persona de contact de la empresa" />
        {{ empresa?.contacto?.nombre }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Phone :size="18" aria-label="Teléfono de la persona de contacto de la empresa" />
        {{ empresa?.contacto?.telefono }}
      </p>
    </div>
    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Mail :size="18" aria-label="E-mail de la persona de contacto de la empresa" />
        {{ empresa?.contacto?.email }}
      </p>
    </div> -->
    <div class="field">
      <p class="flex items-center gap-2">
        <Info :size="18" aria-label="Observaciones de la empresa" />
        {{ empresa?.observaciones }}
      </p>
    </div>
  </Dialog>
</template>
