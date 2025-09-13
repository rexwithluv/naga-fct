export interface Usuario {
  id: number
  email: string
  rol: { id: number; nombre: string }
  tutorCentro: { id: number; nombre: string; apellidos: string }
  activo: boolean
}
