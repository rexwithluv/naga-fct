<script setup lang="js">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div>
    <AppHeader v-if="$route.path !== '/login' || $route.path !== '/home'" />
    <RouterView />
  </div>
</template>
