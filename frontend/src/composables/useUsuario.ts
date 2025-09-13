import apiClient from '@/apiClient.js'
import { Usuario } from '@/types/models/Usuario.js'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useUsuario() {
  const confirm = useConfirm()
  const toast = useToast()

  const prepareUsuarioPayload = (data: Usuario) => {
    return { ...data, rol: data.rol.id, tutorCentro: data.tutorCentro.id }
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

  const createUsuario = async (data: Usuario): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/usuarios', data)
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

  const updateUsuario = async (data: Usuario): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.put(`/usuarios/${data.id}`, prepareUsuarioPayload(data))
        toast.add({
          severity: 'success',
          summary: 'Usuario actualizado correctamente.',
          detail: 'Se ha actualizado la información del usuario.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la información del usuario.',
          detail: error.response.data.detail,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteUsuario = async (data: Usuario): Promise<boolean> => {
    const id = data.id

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

  return { getUsuarios, createUsuario, updateUsuario, deleteUsuario }
}
