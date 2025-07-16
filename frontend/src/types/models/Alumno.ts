import { Concello } from './Concello'
import { EstadoAlumno } from './EstadoAlumno'
import { TutorCentroResponse } from './TutorCentro'

export interface Alumno {
  id: number
  dniNie: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  concello: Concello
  numeroSeguridadSocial: string
  estado: EstadoAlumno
  tutorCentro: TutorCentroResponse
}
