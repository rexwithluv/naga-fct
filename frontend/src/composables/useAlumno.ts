import apiClient from '@/apiClient'
import { Alumno } from '@/types/models/Alumno'
import { useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'

export function useAlumno() {
  const toast = useToast()
  const confirm = useConfirm()

  const prepareAlumnoPayload = (alumnoData: Alumno) => {
    return {
      ...alumnoData,
      // Usamos el encadenamiento opcional para mayor seguridad en caso de que las propiedades sean null/undefined
      concello: alumnoData.concello?.id || null,
      estado: alumnoData.estado?.id || null,
      tutorCentro: alumnoData.tutorCentro?.id || null,
    }
  }

  const getAlumnos = async () => {
    try {
      const response = await apiClient.get('/alumnos')
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar los alumnos.',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const getAlumno = async (alumnoId: number) => {
    try {
      const response = await apiClient.get(`/alumnos/${alumnoId}`)
      return response.data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error al cargar la/el alumna/o',
        detail: error.message,
        life: 5000,
      })
    }
  }

  const createAlumno = async (alumnoData: Alumno): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.post('/alumnos', prepareAlumnoPayload(alumnoData))
        toast.add({
          severity: 'success',
          summary: 'Alumna/o guardado correctamente.',
          detail: 'Se ha creado el alumno con la información proporcionada.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al guardar la/el alumna/o.',
          detail: error.message,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const updateAlumno = async (alumnoData: Alumno): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await apiClient.put(`/alumnos/${alumnoData.id}`, prepareAlumnoPayload(alumnoData))
        toast.add({
          severity: 'success',
          summary: 'Alumno actualizado correctamente.',
          detail: 'Se ha actualizado la información del alumno.',
          life: 5000,
        })
        resolve(true)
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la información del alumno.',
          detail: error.message,
          life: 5000,
        })
        resolve(false)
      }
    })
  }

  const deleteAlumno = async (alumnoData: Alumno): Promise<boolean> => {
    const id = alumnoData.id
    const nombreCompleto = `${alumnoData.nombre} ${alumnoData.apellidos}`
    const estado = alumnoData.estado.nombre.toLowerCase()

    if (['de baja', 'graduado'].includes(estado)) {
      toast.add({
        severity: 'error',
        summary: `Error al dar de baja al alumno.`,
        detail: 'No se puede dar de baja a un alumno graduado o que ya esté de baja.',
        life: 5000,
      })
      return false
    }

    return new Promise((resolve) => {
      confirm.require({
        message: `¿Estás seguro de que quieres dar de baja a ${nombreCompleto}? Actualmente está ${estado}`,
        header: 'Dar de baja a un alumno',

        acceptLabel: 'Dar de baja',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',

        accept: async () => {
          try {
            await apiClient.delete(`/alumnos/${id}`)
            toast.add({
              severity: 'success',
              summary: 'Alumno dado de baja correctamente.',
              detail: `Se ha dado de baja al alumno ${nombreCompleto}.`,
              life: 5000,
            })
            resolve(true)
          } catch (error: any) {
            toast.add({
              severity: 'error',
              summary: `Error al dar de baja al alumno.`,
              detail: error.message,
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

  return { getAlumnos, getAlumno, createAlumno, updateAlumno, deleteAlumno }
}
