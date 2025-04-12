import apiClient from '@/apiClient'
import capitalize from '@/helpers/capitalize'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // null as string | null -> inicializamos en null pero también puede aceptar strings
  state: () => ({
    token: null as string | null,
    nombre: null as string | null,
    rol: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
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
    isAdmin() {
      return this.rol === '1'
    },
  },
})
