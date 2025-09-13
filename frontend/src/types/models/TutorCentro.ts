export interface TutorCentro {
  id: number
  nombre: string
  apellidos: string
  email: string
  curso: { id: number; codigo: string } | number
  activo?: boolean
  usuario: { id: number; email: string } | number | null
}
