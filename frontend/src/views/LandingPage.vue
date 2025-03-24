<script setup lang="js">
</script>

<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center p-4 text-center">
        <div class="w-95 rounded-lg shadow-md border p-4 space-y-4">
            <p>Bienvenida/o!</p>

            <p>NAGA - FCT (abreviado como simplemente NAGA) es una aplicación que permite a los docentes administrar al
                alumando antes y durante las FCT (Formación en Centros de Trabajo)</p>

            <p>Si eres docente,
                <RouterLink to="/login" class="text-blue-300 underline hover:text-blue-500">
                    inicia sesión
                </RouterLink>
                para acceder a la aplicación.
            </p>

            <hr />

            <div class="flex space-x-4 items-center justify-center">
                <p class="bg-blue-500 text-white px-4 py-2 w-50 rounded">
                    Si no eres docente, no te interesa esta aplicación.
                </p>
                <p class="bg-blue-500 text-white px-4 py-2 w-50 rounded">
                    Si eres docente pero todavía no estás registrado,
                    ponte en contacto con el administrador para que pueda darte de alta.
                </p>
            </div>
        </div>
    </div>
</template>