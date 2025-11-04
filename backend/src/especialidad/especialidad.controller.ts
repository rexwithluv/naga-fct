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
import { EspecialidadResponseDto } from './dto/especialidad-response.dto'
import { EspecialidadService } from './especialidad.service'

@Controller('especialidades')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Rol.ADMIN)
export class EspecialidadController {
  constructor(private readonly service: EspecialidadService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<EspecialidadResponseDto[]> {
    const especialidades = await this.service.getAll()

    return plainToInstance(EspecialidadResponseDto, especialidades, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
