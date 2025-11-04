import { Injectable } from '@nestjs/common'
import { Rol } from '../common/enums/rol.enum'
import { Usuario } from '../usuario/usuario.entity'

@Injectable()
export class UtilsService {
  isAdmin(usuario: Usuario): boolean {
    return String(usuario.rol) === Rol.ADMIN
  }
}
