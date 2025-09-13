import { Concello } from './Concello.js'
import { EstadoAlumno } from './EstadoAlumno.js'
import { TutorCentro } from './TutorCentro.js'

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
  tutorCentro: TutorCentro
}
