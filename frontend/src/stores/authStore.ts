import apiClient from '@/apiClient'
import capitalize from '@/helpers/capitalize'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token: Ref<string> = ref('')
    const nombre: Ref<string> = ref('')
    const rol: Ref<string> = ref('')
    const isAdmin: Ref<boolean> = ref(false)

    const login = async (email: string, password: string) => {
      try {
        const response = await apiClient.post('/login', {
          email: email,
          password: password,
        })

        token.value = response.data.token
        nombre.value = capitalize(response.data.email.split('@')[0])
        rol.value = response.data.rol.replace('ROLE_', '')
        isAdmin.value = rol.value === 'admin'
      } catch {
        throw new Error('Credenciales incorrectas')
      }
    }

    const logout = () => {
      token.value = ''
      nombre.value = ''
      rol.value = ''
      isAdmin.value = false
    }

    return { token, nombre, rol, isAdmin, login, logout }
  },
  {
    persist: {
      key: 'authStore',
      storage: sessionStorage,
      paths: ['token', 'nombre', 'rol', 'isAdmin'],
    },
  },
)
