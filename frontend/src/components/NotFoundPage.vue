<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center p-4 text-center">
    <div>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <p>Lo sentimos, la ruta a la que intentas acceder no existe.</p>
      <RouterLink :to="{ name: 'home' }">Volver al inicio</RouterLink>
    </div>
  </div>
</template>
