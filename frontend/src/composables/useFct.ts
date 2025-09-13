import apiClient from '@/apiClient.js'
import { Fct } from '@/types/models/Fct.js'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useFct() {
  const toast = useToast()
  const confirm = useConfirm()

  const preparePayload = (data: Fct) => {
    console.log(`Estoy en la función preparePayload: ${data}`)
    console.log(data)
    return {
      ...data,
      alumno: data.alumno.id,
      tutorCentro: data?.tutorCentro?.id,
      tutorEmpresa: data.tutorEmpresa.id,
    }
  }

  const getAllFct = async () => {
    try {
      const response = await apiClient.get('/fct')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las FCT.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const createFct = async (data: Fct): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/fct', data)
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

  const updateFct = async (data: Fct): Promise<boolean> => {
    const id = data.id

    return new Promise(async (resolve) => {
      try {
        await apiClient.put(`/fct/${id}`, preparePayload(data))
        toast.add({
          severity: 'success',
          summary: 'FCT actualizada correctamente.',
          detail: 'Se ha actualizado la información de la FCT.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la información de la FCT.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteFct = async (data: Fct): Promise<boolean> => {
    const id = data.id
    const alumnoNombre = data.alumno.nombre

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

  return { getAllFct, createFct, updateFct, deleteFct }
}
