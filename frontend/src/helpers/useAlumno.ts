import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useAlumno() {
  const toast = useToast()

  const getAlumno = async (id: number) => {
    try {
      const response = await apiClient.get(`/alumnos/${id}`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la/el alumna/o',
        detail: error.message,
        life: 5000,
      })
    }
  }

  return { getAlumno }
}
