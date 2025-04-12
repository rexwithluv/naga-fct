import { ContactoEmpresa } from './ContactoEmpresa'

export interface Empresa {
  id: number
  nombre: string
  concello: string
  direccion: string
  observaciones: string
  especialidad: string
  contacto: ContactoEmpresa
  activa: boolean
  plazas: number
  skills: string[]
}
