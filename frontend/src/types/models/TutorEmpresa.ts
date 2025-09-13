export interface TutorEmpresa {
  id: number
  empresa: { id: string; nombre: string } | number
  nombre: string
  apellidos: string
  email: string
  telefono: string
}
