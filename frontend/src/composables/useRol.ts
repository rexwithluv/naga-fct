import apiClient from '@/apiClient'
import { useToast } from 'primevue'

export function useRol() {
  const toast = useToast()

  const getRoles = async () => {
    try {
      const response = await apiClient.get('/roles-usuario')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los roles disponibles.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getRoles }
}
