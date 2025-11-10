import { Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { Rol } from '../common/enums/rol.enum'

@Injectable()
export class UtilsService {
  isAdmin(jwtUser: JwtPayloadDto): boolean {
    return String(jwtUser.rol) === Rol.ADMIN
  }

  getGroups(jwtUser: JwtPayloadDto): string[] {
    return this.isAdmin(jwtUser) ? ['admin'] : []
  }
}
