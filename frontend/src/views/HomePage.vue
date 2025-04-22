<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
import { StoreGeneric } from 'pinia'
  import { ref, Ref } from 'vue'

  const auth: StoreGeneric = useAuthStore()

  const nombre: Ref<string | null> = ref(auth.nombre)
  const tutor: Ref<string | null> = ref('2º DAW')
</script>

<template>
  <div class="flex items-center justify-center">
    <WelcomePanel v-model:nombre="nombre" v-model:tutor="tutor" />
  </div>
</template>
