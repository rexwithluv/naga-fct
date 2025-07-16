import apiClient from '@/apiClient'
import { useToast } from 'primevue'

export function useTutorEmpresa() {
  const toast = useToast()

  const getTutoresEmpresa = async () => {
    try {
      const response = await apiClient.get('/tutores-empresa')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores de empresas.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getTutoresEmpresa }
}
