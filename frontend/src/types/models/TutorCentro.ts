export interface TutorCentroResponse {
  id: number
  nombre: string
  apellidos: string
  email: string
  curso: string
  activo: boolean
}

export interface TutorCentroRequest {
  nombre: string
  apellidos: string
  email: string
  cursoId: number
  usuarioId: number | null
}
