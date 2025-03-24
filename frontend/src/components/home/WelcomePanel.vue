<script setup lang="js">
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
    nombre: String,
    tutor: String,
})

const datetime = ref(new Date);
const actualizarFecha = () => {
    datetime.value = ref(new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", " -"));
}

let intervalo;
onMounted(() => {
    actualizarFecha();
    intervalo = setInterval(() => actualizarFecha(), 1000);
})

onUnmounted(() => clearInterval(intervalo));
</script>

<template>
    <div class="bg-gray-500 w-55 text-white p-4 rounded-lg shadow-md text-center">
        <div>
            <p>Bienvenida/o {{ nombre }}</p>
            <p>Eres tutor/a de {{ tutor }} </p>
            <p> {{ datetime }} </p>
        </div>
    </div>
</template>