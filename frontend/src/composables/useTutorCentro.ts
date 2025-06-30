import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useTutorCentro() {
  const toast = useToast()

  const getTutoresCentro = async (nombreTutorCentro: string = '') => {
    try {
      const response = await apiClient.get(
        `/tutores-centro/select?nombreTutor=${nombreTutorCentro}`,
      )
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores del centro.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  return { getTutoresCentro }
}
