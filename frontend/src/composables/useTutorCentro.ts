import apiClient from '@/apiClient'
import { TutorCentroRequest, TutorCentroResponse } from '@/types/models/TutorCentro'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useTutorCentro() {
  const toast = useToast()
  const confirm = useConfirm()

  const createTutorCentroRequest = (): TutorCentroRequest => {
    return {
      nombre: '',
      apellidos: '',
      email: '',
      cursoId: 0,
      usuarioId: null,
    }
  }

  const getTutoresCentro = async () => {
    try {
      const response = await apiClient.get('/tutores-centro')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los tutores del centro.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const createTutorCentro = async (tutorCentroData: TutorCentroRequest): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/tutores-centro', tutorCentroData)
        toast.add({
          severity: 'success',
          summary: 'Tutor de centro creado correctamente.',
          detail: 'Se ha creado el tutor de centro con la información proporcionada.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al guardar el tutor de centro.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteTutorCentro = async (tutorCentroData: TutorCentroResponse): Promise<boolean> => {
    const id = tutorCentroData.id
    const nombreCompleto = `${tutorCentroData.nombre} ${tutorCentroData.apellidos}`

    return new Promise((resolve) => {
      confirm.require({
        message: `¿Estás seguro de que quieres desactivar a ${nombreCompleto}?`,
        header: 'Desactivar tutor de centro',

        acceptLabel: 'Desactivar',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',

        accept: async () => {
          try {
            await apiClient.delete(`/tutores-centro/${id}`)
            toast.add({
              severity: 'success',
              summary: 'Tutor de centro desactivado correctamente.',
              detail: `Se ha desactivado el tutor de centro ${nombreCompleto}.`,
              life: 5000,
            })
            resolve(true)
          } catch (error: any) {
            toast.add({
              severity: 'error',
              summary: 'Error al eliminar el tutor de centro.',
              detail: error.response.data.detail,
              life: 5000,
            })
            resolve(false)
          }
        },
        reject: () => {
          resolve(false)
        },
      })
    })
  }

  return { createTutorCentroRequest, getTutoresCentro, createTutorCentro, deleteTutorCentro }
}
