import apiClient from '@/apiClient.js'
import { TutorCentro } from '@/types/models/TutorCentro.js'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useTutorCentro() {
  const toast = useToast()
  const confirm = useConfirm()

  const preparePayload = (data: TutorCentro): TutorCentro => {
    return {
      ...data,
      curso: data.curso?.id,
      usuario: data.usuario?.id,
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

  const createTutorCentro = async (data: TutorCentro): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/tutores-centro', data)
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

  const updateTutorCentro = async (data: TutorCentro): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.put(`/tutores-centro/${data.id}`, preparePayload(data))
        toast.add({
          severity: 'success',
          summary: 'Tutor de centro actualizado correctamente.',
          detail: 'Se ha actualizado la información del tutor de centro.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la información del tutor de centro.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteTutorCentro = async (data: TutorCentro): Promise<boolean> => {
    const id = data.id
    const nombreCompleto = `${data.nombre} ${data.apellidos}`

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

  return {
    getTutoresCentro,
    createTutorCentro,
    updateTutorCentro,
    deleteTutorCentro,
  }
}
