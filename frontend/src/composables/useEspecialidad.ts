import apiClient from '@/apiClient'
import { useToast } from 'primevue'

export function useEspecialidad() {
  const toast = useToast()

  const getEspecialidades = async () => {
    try {
      const response = await apiClient.get('/especialidades')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener las especialidades.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  return { getEspecialidades }
}
