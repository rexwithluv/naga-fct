export interface Fct {
  id: number
  alumno: { id: number; nombre: string; apellidos: string }
  empresa: { id: number; nombre: string }
  tutorCentro?: { id: number; nombre: string; apellidos: string }
  tutorEmpresa: { id: number; nombre: string; apellidos: string }
  fechaInicio: string
  fechaFin: string
}
