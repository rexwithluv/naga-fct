export interface TutorEmpresaResponse {
  id: number
  empresa: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

export interface TutorEmpresaRequest {
  empresaId: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
}
