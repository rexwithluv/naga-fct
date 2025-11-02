import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../../common/decorators/roles.decorator'
import { Rol } from '../../common/enums/rol.enum'
import { UsuarioPayloadDto } from '../dto/usuario-payload.dto'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    const usuario = user as UsuarioPayloadDto

    if (!usuario) {
      return false
    }

    return requiredRoles.some((rol) => rol === usuario.rolNombre)
  }
}
