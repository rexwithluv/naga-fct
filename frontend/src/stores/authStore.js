import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    nombre: null,
    rol: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:9000/login', {
          email: email,
          password: password,
        })

        this.token = response.data.token
        this.nombre = response.data.nombre
        this.rol = response.data.rol.replace('ROLE_', '')
      } catch {
        throw new Error('Credenciales incorrectas')
      }
    },
    logout() {
      this.token = null
      this.nombre = null
      this.rol = null
    },
  },
})
