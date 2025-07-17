export interface UsuarioResponse {
  id: number
  email: string
  rol: string
  tutor: string | null
  activo: boolean
}

export interface UsuarioRequest {
  email: string
  rolId: number
  tutorId: number | null
}
