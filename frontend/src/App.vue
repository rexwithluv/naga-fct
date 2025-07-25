<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const displayNavBar = ref(false)

  const routesWithoutNavBar: string[] = ['inicio', 'login', 'NotFound']

  const shouldDisplayNavBar = (currentRouteName: string | undefined): boolean => {
    return currentRouteName !== undefined && !routesWithoutNavBar.includes(currentRouteName)
  }

  watch(
    () => route.name,
    (newRouteName) => {
      displayNavBar.value = shouldDisplayNavBar(newRouteName?.toString())
    },
    { immediate: true },
  )
</script>

<template>
  <div class="flex flex-col h-screen">
    <Toast />
    <AppNavBar v-if="displayNavBar" />
    <RouterView class="flex-1" />
  </div>
</template>
