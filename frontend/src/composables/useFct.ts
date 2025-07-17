import apiClient from '@/apiClient'
import { FCTRequest, FCTResponse } from '@/types/models/FCT'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useFct() {
  const toast = useToast()
  const confirm = useConfirm()

  const createFCTRequest = (): FCTRequest => {
    return {
      alumnoId: 0,
      tutorEmpresaId: 0,
      fechaInicio: null,
      fechaFin: null,
    } as FCTRequest
  }

  const getAllFct = async () => {
    try {
      const response = await apiClient.get('/fct')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los alumnos.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const createFct = async (fctData: FCTRequest): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/fct', fctData)
        toast.add({
          severity: 'success',
          summary: 'FCT creada correctamente.',
          detail: 'Se ha creado la FCT con la información proporcionada',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al guardar la FCT.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteFct = async (fctData: FCTResponse): Promise<boolean> => {
    const id = fctData.id
    const alumnoNombre = fctData.alumno

    return new Promise((resolve) => {
      confirm.require({
        message:
          '¿Estás seguro de que quieres finalizar esta FCT? Se usará la fecha de hoy como fecha de fin.',
        header: 'Finalizar FCT',

        acceptLabel: 'Finalizar FCT',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',

        accept: async () => {
          try {
            await apiClient.delete(`/fct/${id}`)
            toast.add({
              severity: 'success',
              summary: 'FCT finalizada correctamente.',
              detail: `Se ha finalizado la FCT del alumno ${alumnoNombre}.`,
              life: 5000,
            })
            resolve(true)
          } catch (error: any) {
            toast.add({
              severity: 'error',
              summary: 'Error al finalizar la FCT.',
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

  return { createFCTRequest, getAllFct, createFct, deleteFct }
}
