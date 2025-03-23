/* eslint-disable no-undef */
// Usamos process.env porque estamos en el back, pero igualmetne eslint lo marca como error
// En el front (contexto de navegador) se debe usar import.meta.env

import { dirname, resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Cargar variables de entorno desde un directorio superior
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: resolve(__dirname, '../.env'),
})

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,

    // Usamos ?.split(",") para que no falle en producción, pero esta línea
    // solo tiene importancia cuando ejecutamos en desarrollo
    allowedHosts: process.env.VITE_ALLOWED_HOSTS?.split(',') || 'localhost',
  },
})
