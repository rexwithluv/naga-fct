import apiClient from '@/apiClient'
import capitalize from '@/helpers/capitalize'
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
        const response = await apiClient.post('/login', {
          email: email,
          password: password,
        })

        this.token = response.data.token
        this.nombre = capitalize(response.data.email.split('@')[0])
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
