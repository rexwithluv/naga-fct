import apiClient from '@/apiClient'
import { useToast } from 'primevue/usetoast'

export function useSkill() {
  const toast = useToast()

  const getSkills = async () => {
    try {
      const response = await apiClient.get('/skills')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener las skills.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  return { getSkills }
}
