<script setup lang="js">
const dialogVisible = defineModel("visible");
const datosContacto = defineModel("datosContacto");
</script>

<template>
    <Dialog v-model:visible="dialogVisible" header="Datos de contacto" modal dismissableMask>
        <p>Nombre: {{datosContacto.nombre}}</p>
        <p>Teléfono: {{datosContacto.telefono}}</p>
        <p>Email: {{datosContacto.email}}</p>
    </Dialog>
</template>