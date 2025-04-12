<template>
  <div class="flex flex-col h-screen">
    <Toast />
    <AppNavBar v-if="$route.path !== '/' && $route.path !== '/login'" />

    <RouterView class="flex-1" />
  </div>
</template>
