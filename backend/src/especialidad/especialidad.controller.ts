import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { EspecialidadResponseDto } from './dto/especialidad-response.dto'
import { EspecialidadService } from './especialidad.service'

@Controller('especialidades')
@UseGuards(RolesGuard)
@Roles(Rol.ADMIN)
export class EspecialidadController {
  constructor(private readonly service: EspecialidadService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const especialidades = await this.service.getAll()

    return plainToInstance(EspecialidadResponseDto, especialidades)
  }
}
