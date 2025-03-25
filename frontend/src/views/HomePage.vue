<script setup lang="js">
import WelcomePanel from "@/components/home/WelcomePanel.vue";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";

const auth = useAuthStore();

const nombre = ref(auth.nombre);
const tutor = ref("2º DAW");
</script>

<template>
    <div class="flex items-center justify-center">
        <WelcomePanel :nombre="nombre" :tutor="tutor" />
    </div>
</template>