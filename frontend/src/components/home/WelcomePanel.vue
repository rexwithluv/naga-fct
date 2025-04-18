<script setup lang="ts">
  import capitalize from '@/helpers/capitalize'
  import { ModelRef, onMounted, onUnmounted, Ref, ref } from 'vue'

  const nombre: ModelRef<string | undefined> = defineModel('nombre')
  const tutor: ModelRef<string | undefined> = defineModel('tutor')
  const datetime: Ref<string> = ref('')

  const actualizarFecha = (): void => {
    datetime.value = new Date()
      .toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(',', ' -')
  }

  let intervalo: NodeJS.Timeout
  onMounted(() => {
    actualizarFecha()
    intervalo = setInterval(() => actualizarFecha(), 1000)
  })

  onUnmounted(() => clearInterval(intervalo))
</script>

<template>
  <div class="bg-gray-500 w-55 p-4 rounded-lg shadow-md text-center">
    <div>
      <p>
        Bienvenida/o <span v-show="nombre"> {{ capitalize(nombre ?? '') }} </span>
      </p>

      <p v-if="tutor">Eres tutor/a de {{ tutor }}</p>
      <p v-else>No eres tutor/a de ningún curso</p>

      <hr />

      <p>{{ datetime }}</p>
    </div>
  </div>
</template>
