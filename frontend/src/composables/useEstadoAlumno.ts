import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useEstadoAlumno() {
  const toast = useToast()

  const getEstadosAlumno = async () => {
    try {
      const response = await apiClient.get(`/estados-alumno`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los estados de alumno.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getEstadosAlumno }
}
