import { Especialidad } from './Especialidad.js'
import { TutorCentro } from './TutorCentro.js'
export interface CursoResponse {
  id: number
  codigo: string
  nombre: string
  especialidad: Especialidad
  tutor: TutorCentro
}
