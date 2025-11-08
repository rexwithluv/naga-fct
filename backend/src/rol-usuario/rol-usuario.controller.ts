import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { RolUsuarioResponseDto } from './dto/rol-usuario-response.dto'
import { RolUsuarioService } from './rol-usuario.service'

@Controller('roles-usuario')
@UseGuards(RolesGuard)
@Roles(Rol.ADMIN)
export class RolUsuarioController {
  constructor(private readonly service: RolUsuarioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const rolesUsuario = await this.service.getAll()

    return plainToInstance(RolUsuarioResponseDto, rolesUsuario, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
