import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { CursoService } from './curso.service'
import { CursoResponseDto } from './dto/curso-response.dto'

@Controller('cursos')
@UseGuards(RolesGuard)
@Roles(Rol.ADMIN)
export class CursoController {
  constructor(private readonly service: CursoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const cursos = await this.service.getAll()

    return plainToInstance(CursoResponseDto, cursos, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
