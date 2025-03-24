<script setup lang="js">
import WelcomePanel from "@/components/home/WelcomePanel.vue";
import { ref } from "vue";

const nombre = ref("Marta");
const tutor = ref("2º DAW");
</script>

<template>
    <div class="flex items-center justify-center">
        <WelcomePanel :nombre="nombre" :tutor="tutor" />
    </div>
</template>