import apiClient from '@/apiClient'
import { Empresa } from '@/types/models/Empresa'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useEmpresa() {
  const toast = useToast()
  const confirm = useConfirm()

  const getEmpresas = async () => {
    try {
      const response = await apiClient.get('/empresas')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar las empresas',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const createEmpresa = async (empresaData: Empresa): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/empresas', empresaData)
        toast.add({
          severity: 'success',
          summary: 'Empresa guardada correctamente.',
          detail: 'Se ha guardado la empresa con la información proporcionada',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al guardar la empresa.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteEmpresa = async (empresaData: Empresa): Promise<boolean> => {
    const id = empresaData.id
    const nombre = empresaData.nombre

    return new Promise((resolve) => {
      confirm.require({
        message: '¿Estás seguro de que quieres marcar como inactiva esta empresa?',
        header: 'Marcar como inactiva una empresa',

        acceptLabel: 'Marcar como inactiva',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',

        accept: async () => {
          try {
            await apiClient.delete(`/empresas/${id}`)
            toast.add({
              severity: 'success',
              summary: `Empresa dada de baja correctamente.`,
              detail: `Se ha dado de baja a la empresa ${nombre}.`,
              life: 5000,
            })
            resolve(true)
          } catch (error: any) {
            toast.add({
              severity: 'error',
              summary: 'Error al dar de baja a la empresa.',
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

  return { getEmpresas, createEmpresa, deleteEmpresa }
}
