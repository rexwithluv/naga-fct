import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useConcello() {
  const toast = useToast()

  const getConcellos = async (nombreConcello: string = '') => {
    try {
      const response = await apiClient.get(`/concellos?nombre=${nombreConcello}`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los concellos.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  return { getConcellos }
}
