import './assets/main.css'

// Importaciones de PrimeVue
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  //   ripple: true,
})

app.mount('#app')
