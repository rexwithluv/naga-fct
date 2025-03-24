<script setup lang="js">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <Toast />
    <AppHeader v-if="$route.path !== '/' && $route.path !== '/login'" />

    <RouterView class="flex-1" />

  </div>
</template>
