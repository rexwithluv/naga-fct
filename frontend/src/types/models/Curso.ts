import { EspecialidadResponse } from './Especialidad'
import { TutorCentroResponse } from './TutorCentro'
export interface CursoResponse {
  id: number
  codigo: string
  nombre: string
  especialidad: EspecialidadResponse
  tutor: TutorCentroResponse
}
