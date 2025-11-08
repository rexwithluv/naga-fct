import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { TutorCentroResponseDto } from './dto/tutor-centro-response.dto'
import { TutorCentroService } from './tutor-centro.service'

@Controller('tutores-centro')
@UseGuards(RolesGuard)
@Roles(Rol.ADMIN)
export class TutorCentroController {
  constructor(private readonly service: TutorCentroService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const tutoresCentro = await this.service.getAll()

    return plainToInstance(TutorCentroResponseDto, tutoresCentro, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
