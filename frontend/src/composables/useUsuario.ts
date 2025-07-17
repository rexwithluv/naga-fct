import apiClient from '@/apiClient'
import { UsuarioRequest, UsuarioResponse } from '@/types/models/Usuario'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useUsuario() {
  const confirm = useConfirm()
  const toast = useToast()

  const createUsuarioRequest = (): UsuarioRequest => {
    return {
      email: '',
      rolId: 0,
      tutorId: null,
    }
  }

  const getUsuarios = async (hasTutorCentro?: boolean) => {
    let url = '/usuarios'

    if (hasTutorCentro !== undefined) {
      url += `?hasTutorCentro=${hasTutorCentro}`
    }

    try {
      const response = await apiClient.get(url)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al obtener los usuarios.',
        detail: error.response.data.detail,
        life: 5000,
      })
    }
  }

  const createUsuario = async (usuarioData: UsuarioRequest): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/usuarios', usuarioData)
        toast.add({
          severity: 'success',
          summary: 'Usuario creado correctamente.',
          detail: 'Se ha creado el usuario con la información proporcionada',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al crear el usuario.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteUsuario = async (usuarioData: UsuarioResponse): Promise<boolean> => {
    const id = usuarioData.id

    return new Promise((resolve) => {
      confirm.require({
        message: '¿Estás seguro de que quieres desactivar a este usuario?',
        header: 'Desactivar usuario',

        acceptLabel: 'Desactivar',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',

        accept: async () => {
          try {
            await apiClient.delete(`/usuarios/${id}`)
            toast.add({
              severity: 'success',
              summary: 'Usuario desactiado correctamente.',
              detail: 'Se ha desactivado el usuario.',
              life: 5000,
            })
            resolve(true)
          } catch (error: any) {
            toast.add({
              severity: 'error',
              summary: 'Error al desactivar el usuario.',
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

  return { createUsuarioRequest, getUsuarios, createUsuario, deleteUsuario }
}
