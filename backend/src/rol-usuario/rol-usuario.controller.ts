import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { RolUsuarioResponseDto } from './dto/rol-usuario-response.dto'
import { RolUsuarioService } from './rol-usuario.service'

@Controller('roles-usuario')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class RolUsuarioController {
  constructor(private readonly service: RolUsuarioService) {}

  @Get()
  @Roles(Rol.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAll(): Promise<RolUsuarioResponseDto[]> {
    const roles = await this.service.getAll()

    return plainToInstance(RolUsuarioResponseDto, roles)
  }
}
