import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useCurso() {
  const toast = useToast()

  const getCursos = async (hasTutorCurso?: boolean) => {
    let url = '/cursos'

    if (hasTutorCurso !== undefined) {
      url += `?hasTutorCurso=${hasTutorCurso}`
    }

    try {
      const response = await apiClient.get(url)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los cursos.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getCursos }
}
