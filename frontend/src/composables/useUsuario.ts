import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useUsuario() {
  const toast = useToast()

  const getUsuarios = async (hasTutorCentro?: boolean) => {
    let url = '/usuarios'

    if (hasTutorCentro !== undefined) {
      url += `?hasTutorCentro=${hasTutorCentro}`
    }

    try {
      const response = await apiClient.get(url)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los usuarios.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getUsuarios }
}
