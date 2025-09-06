import { Concello } from './Concello'
import { ContactoEmpresa } from './ContactoEmpresa'
import { Especialidad } from './Especialidad'
import { Skill } from './Skill'
export interface EmpresaRequest {
  id?: number
  nombre: string
  concello: number
  direccion: string
  observaciones: string
  contacto: ContactoEmpresa
  activa: boolean
  plazas: number
  skills: number[]
  especialidad?: Especialidad
}
export interface EmpresaResponse {
  id: number
  nombre: string
  concello: Concello
  direccion: string
  observaciones: string
  contacto: ContactoEmpresa
  activa: boolean
  plazas: number
  skills: Skill[]
  especialidad?: Especialidad
}
