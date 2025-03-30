<script setup lang="js">
const dialogVisible = defineModel("dialogVisible");
const datosContacto = defineModel("datosContacto");
</script>

<template>
    <Dialog v-model:visible="dialogVisible" modal header="Datos de contacto">
        <p>Nombre: {{datosContacto.nombre}}</p>
        <p>Teléfono: {{datosContacto.telefono}}</p>
        <p>Email: {{datosContacto.email}}</p>
    </Dialog>
</template>