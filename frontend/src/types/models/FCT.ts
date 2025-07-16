export interface FCTResponse {
  id: number
  alumno: string
  tutorCentro: string | null
  tutorEmpresa: string
  empresa: string
  fechaInicio: string
  fechaFin: string | null
}

export interface FCTRequest {
  alumnoId: number
  tutorEmpresaId: number
  fechaInicio: Date | null
  fechaFin: Date | null
}
