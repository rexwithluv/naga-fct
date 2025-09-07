import { CursoResponse } from './Curso.js'

export interface TutorCentro {
  id: number
  nombre: string
  apellidos: string
  email: string
  curso: CursoResponse | number
  activo?: boolean
  usuario: { id: number; email: string } | number | null
}

export interface TutorCentroResponse {
  id: number
  nombre: string
  apellidos: string
  email: string
  curso: string
  activo: boolean
  usuario: number
}

export interface TutorCentroRequest {
  nombre: string
  apellidos: string
  email: string
  cursoId: number
  usuarioId: number | null
}
