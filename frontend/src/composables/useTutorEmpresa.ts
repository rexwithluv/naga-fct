import apiClient from '@/apiClient'
import { TutorEmpresaRequest } from '@/types/models/TutorEmpresa'
import { useToast } from 'primevue'

export function useTutorEmpresa() {
  const toast = useToast()

  const createTutorEmpresaRequest = (): TutorEmpresaRequest => {
    return {
      empresaId: 0,
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
    }
  }

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

  const createTutorEmpresa = async (tutorEmpresaData: TutorEmpresaRequest): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/tutores-empresa', tutorEmpresaData)
        toast.add({
          severity: 'success',
          summary: 'Tutor de empresa creado correctamente.',
          detail: 'Se ha creado el tutor de empresa con la información proporcionada',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al guardar el tutor de empresa.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  return { createTutorEmpresaRequest, getTutoresEmpresa, createTutorEmpresa }
}
