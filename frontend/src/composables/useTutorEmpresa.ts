import apiClient from '@/apiClient.js'
import { TutorEmpresa } from '@/types/models/TutorEmpresa.js'
import { useToast } from 'primevue'

export function useTutorEmpresa() {
  const toast = useToast()

  const createTutorEmpresaRequest = (): TutorEmpresa => {
    return {
      id: 0,
      empresa: 0,
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

  const createTutorEmpresa = async (tutorEmpresaData: TutorEmpresa): Promise<boolean> => {
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

  const updateTutorEmpresa = async (tutorEmpresaData: TutorEmpresa): Promise<boolean> => {
    const updatedTutorEmpresa = JSON.parse(JSON.stringify(tutorEmpresaData))

    updatedTutorEmpresa.empresa = tutorEmpresaData.empresa.id

    return new Promise(async (resolve) => {
      try {
        await apiClient.put(`/tutores-empresa/${updatedTutorEmpresa.id}`, updatedTutorEmpresa)
        toast.add({
          severity: 'success',
          summary: 'Tutor de empresa actualizado correctamente.',
          detail: 'Se ha actualizado la información del tutor de empresa.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la información del tutor de empresa.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  return { createTutorEmpresaRequest, getTutoresEmpresa, updateTutorEmpresa, createTutorEmpresa }
}
