/* eslint-disable no-undef */
// Usamos process.env porque estamos en el back, pero igualmetne eslint lo marca como error
// En el front (contexto de navegador) se debe usar import.meta.env

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'
import { resolve, dirname } from "path"

// Cargar variables de entorno desde un directorio superior
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: resolve(__dirname, "../.env"),
})

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,
    allowedHosts: process.env.VITE_ALLOWED_HOSTS.split(",") || "localhost",
  },
})
