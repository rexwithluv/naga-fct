import { Concello } from './Concello.js'
import { ContactoEmpresa } from './ContactoEmpresa.js'
import { Especialidad } from './Especialidad.js'
import { Skill } from './Skill.js'

export interface Empresa {
  id: number
  nombre: string
  concello: Concello
  direccion: string
  observaciones: string
  contacto: ContactoEmpresa
  activa: boolean
  plazas: number
  skills: Skill[]
  especialidad: Especialidad
}
